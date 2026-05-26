import { useEffect, useRef } from "react";

export type TimerState = "idle" | "pre" | "sleep" | "alarm";
export type AmbientSound = "silence" | "cafe" | "rain" | "white";
export type AlarmSound = "silence" | "harp" | "bells" | "forest";

type StoppableNode = { stop: () => void };

type AudioEngineProps = {
  isMuted: boolean;
  ambientSound: AmbientSound;
  alarmSound: AlarmSound;
  timerState: TimerState;
};

type AudioEngineResult = {
  initAudio: () => Promise<void>;
  previewAlarmSound: (sound: AlarmSound) => Promise<void>;
  startAlarm: () => Promise<void>;
  stopAlarm: () => void;
  stopAmbient: () => void;
};

export function useAudioEngine({ isMuted, ambientSound, alarmSound, timerState }: AudioEngineProps): AudioEngineResult {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientNodeRef = useRef<StoppableNode | null>(null);
  const alarmNodeRef = useRef<AudioScheduledSourceNode[]>([]);
  const alarmGainRef = useRef<GainNode | null>(null);

  const isAlarmPlayingRef = useRef<boolean>(false);
  const alarmTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync props to refs to avoid stale closures in audio threads
  const isMutedRef = useRef<boolean>(isMuted);
  const alarmSoundRef = useRef<AlarmSound>(alarmSound);

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (alarmGainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      const targetGain = isMuted ? 0 : 0.4;
      // Smooth out mute transitions to avoid clicks/pops
      alarmGainRef.current.gain.setValueAtTime(alarmGainRef.current.gain.value, ctx.currentTime);
      alarmGainRef.current.gain.linearRampToValueAtTime(targetGain, ctx.currentTime + 0.08);
    }
  }, [isMuted]);

  useEffect(() => {
    alarmSoundRef.current = alarmSound;
  }, [alarmSound]);

  const initAudio = async (): Promise<void> => {
    if (!audioCtxRef.current) {
      const AudioContextCtor = window.AudioContext ?? window.webkitAudioContext;
      audioCtxRef.current = new AudioContextCtor();
    }
    if (audioCtxRef.current.state === "suspended") {
      await audioCtxRef.current.resume();
    }
  };

  const playWhiteNoise = (ctx: AudioContext): void => {
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 400;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(isMutedRef.current ? 0 : 0.15, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start(0);
    ambientNodeRef.current = whiteNoise;
  };

  const playRainNoise = (ctx: AudioContext): void => {
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const rainSource = ctx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1000;
    filter.Q.value = 0.5;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(isMutedRef.current ? 0 : 0.08, ctx.currentTime);

    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.2;
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.03, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(gainNode.gain);
    lfo.start();

    rainSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    rainSource.start(0);

    ambientNodeRef.current = {
      stop: () => {
        try {
          rainSource.stop();
        } catch (_e) {}
        try {
          lfo.stop();
        } catch (_e) {}
      },
    };
  };

  const playCafeNoise = (ctx: AudioContext): void => {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();

    osc1.type = "sine";
    osc1.frequency.value = 90;
    osc2.type = "triangle";
    osc2.frequency.value = 135;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 180;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(isMutedRef.current ? 0 : 0.05, ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();

    ambientNodeRef.current = {
      stop: () => {
        try {
          osc1.stop();
        } catch (_e) {}
        try {
          osc2.stop();
        } catch (_e) {}
      },
    };
  };

  const stopAmbient = (): void => {
    if (ambientNodeRef.current) {
      try {
        ambientNodeRef.current.stop();
      } catch (_e) {}
      ambientNodeRef.current = null;
    }
  };

  const previewAlarmSound = async (sound: AlarmSound): Promise<void> => {
    if (sound === "silence") return;
    await initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(isMutedRef.current ? 0 : 0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);
    gainNode.connect(ctx.destination);

    const osc = ctx.createOscillator();
    osc.type = "sine";
    switch (sound) {
      case "harp":
        osc.frequency.setValueAtTime(440.0, ctx.currentTime);
        break;
      case "bells":
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        break;
      case "forest":
        osc.frequency.setValueAtTime(880.0, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320.0, ctx.currentTime + 0.12);
        break;
      default: {
        const _exhaustiveCheck: never = sound;
        return _exhaustiveCheck;
      }
    }

    osc.connect(gainNode);
    osc.start();
    osc.stop(ctx.currentTime + 1.8);
  };

  const startAlarm = async (): Promise<void> => {
    if (alarmSoundRef.current === "silence") return;

    isAlarmPlayingRef.current = true;
    await initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    stopAmbient();

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(isMutedRef.current ? 0 : 0.4, ctx.currentTime + 8);
    gainNode.connect(ctx.destination);
    alarmGainRef.current = gainNode;

    const playChime = (freq: number, delay: number): void => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      oscGain.gain.setValueAtTime(0, ctx.currentTime + delay);
      oscGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + delay + 0.05);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 1.5);
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 1.6);
      alarmNodeRef.current.push(osc);
    };

    const playBell = (freq: number, delay: number): void => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      oscGain.gain.setValueAtTime(0, ctx.currentTime + delay);
      oscGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + delay + 0.02);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 2.5);
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 2.6);
      alarmNodeRef.current.push(osc);
    };

    const playForestChirp = (freq: number, delay: number): void => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + delay + 0.15);

      oscGain.gain.setValueAtTime(0, ctx.currentTime + delay);
      oscGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + delay + 0.03);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.25);

      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.3);
      alarmNodeRef.current.push(osc);
    };

    let count = 0;
    const playLoop = (): void => {
      if (!isAlarmPlayingRef.current) return;
      if (audioCtxRef.current?.state === "suspended") return;

      const currentSound = alarmSoundRef.current;
      const baseDelay = 0;

      switch (currentSound) {
        case "harp":
          playChime(329.63, baseDelay);
          playChime(392.0, baseDelay + 0.2);
          playChime(440.0, baseDelay + 0.4);
          playChime(523.25, baseDelay + 0.6);
          playChime(659.25, baseDelay + 0.8);
          break;
        case "bells":
          playBell(523.25, baseDelay);
          playBell(587.33, baseDelay + 0.4);
          playBell(659.25, baseDelay + 0.8);
          playBell(783.99, baseDelay + 1.2);
          break;
        case "forest":
          playForestChirp(880.0, baseDelay);
          playForestChirp(1200.0, baseDelay + 0.15);
          playForestChirp(880.0, baseDelay + 0.4);
          playForestChirp(987.77, baseDelay + 0.55);
          break;
        case "silence":
          break;
        default: {
          ((_: never) => {})(currentSound);
        }
      }

      count++;
      if (count < 25) {
        alarmTimeoutRef.current = setTimeout(playLoop, currentSound === "forest" ? 1800 : 2500);
      }
    };

    playLoop();
  };

  const stopAlarm = (): void => {
    isAlarmPlayingRef.current = false;
    if (alarmTimeoutRef.current) {
      clearTimeout(alarmTimeoutRef.current);
      alarmTimeoutRef.current = null;
    }
    alarmNodeRef.current.forEach((node) => {
      try {
        node.stop();
      } catch (_e) {}
    });
    alarmNodeRef.current = [];
    if (alarmGainRef.current) {
      try {
        alarmGainRef.current.disconnect();
      } catch (_e) {}
      alarmGainRef.current = null;
    }
  };

  // Handle ambient loops based on timerState, ambientSound and isMuted
  useEffect(() => {
    if (timerState !== "sleep" && timerState !== "pre") {
      stopAmbient();
      return;
    }

    if (ambientSound === "silence" || isMuted) {
      stopAmbient();
      return;
    }

    const startAmbient = async (): Promise<void> => {
      await initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      stopAmbient();

      switch (ambientSound) {
        case "white":
          playWhiteNoise(ctx);
          break;
        case "rain":
          playRainNoise(ctx);
          break;
        case "cafe":
          playCafeNoise(ctx);
          break;
        default: {
          ((_: never) => {})(ambientSound);
        }
      }
    };

    startAmbient();

    return () => stopAmbient();
    // biome-ignore lint/correctness/useExhaustiveDependencies: audio nodes do not need to trigger re-renders
  }, [ambientSound, timerState, isMuted, playCafeNoise, stopAmbient, playRainNoise, playWhiteNoise, initAudio]);

  // Handle alarm when timerState becomes "alarm"
  useEffect(() => {
    if (timerState === "alarm") {
      startAlarm();
    } else {
      stopAlarm();
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: startAlarm and stopAlarm are stable audio controllers
  }, [timerState, startAlarm, stopAlarm]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopAmbient();
      stopAlarm();
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (_e) {}
        audioCtxRef.current = null;
      }
    };
    // biome-ignore lint/correctness/useExhaustiveDependencies: run once on cleanup
  }, [stopAmbient, stopAlarm]);

  return {
    initAudio,
    previewAlarmSound,
    startAlarm,
    stopAlarm,
    stopAmbient,
  };
}
