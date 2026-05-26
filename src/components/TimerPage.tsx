import React, { useState, useEffect, useRef } from "react";
import { Coffee, BatteryCharging, Brain, Play, Square, FastForward, Volume2, VolumeX, Sparkles, AlertCircle } from "lucide-react";
import { CoffeeRing, CrescentMoon, ZZzCloud } from "./Doodles";

type TimerState = "idle" | "pre" | "sleep" | "alarm";
type NapMode = "napuccino" | "powernap" | "consolidation";
type AmbientSound = "silence" | "cafe" | "rain" | "white";

/** Minimal interface satisfied by AudioBufferSourceNode, OscillatorNode, and the synthetic cafe stop-object. */
type StoppableNode = { stop: () => void };

type ModeConfig = {
  id: NapMode;
  title: string;
  duration: number;
  icon: typeof Coffee;
  description: string;
  color: string;
};

export function TimerPage(): React.ReactElement {
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [activeMode, setActiveMode] = useState<NapMode>("napuccino");
  const [preTimeLeft, setPreTimeLeft] = useState<number>(150);
  const [sleepTimeLeft, setSleepTimeLeft] = useState<number>(1200);
  const [ambientSound, setAmbientSound] = useState<AmbientSound>("silence");
  const [testMode, setTestMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [alarmSound, setAlarmSound] = useState<"silence" | "harp" | "bells" | "forest">("harp");

  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientNodeRef = useRef<StoppableNode | null>(null);
  const alarmNodeRef = useRef<AudioScheduledSourceNode[]>([]);
  const alarmGainRef = useRef<GainNode | null>(null);

  const timerStateRef = useRef<TimerState>("idle");
  const alarmSoundRef = useRef<"silence" | "harp" | "bells" | "forest">("harp");
  const isAlarmPlayingRef = useRef<boolean>(false);
  const alarmTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerStateRef.current = timerState;
  }, [timerState]);

  useEffect(() => {
    alarmSoundRef.current = alarmSound;
  }, [alarmSound]);

  const modes: Record<NapMode, ModeConfig> = {
    napuccino: {
      id: "napuccino",
      title: "The Napuccino",
      duration: 1200,
      icon: Coffee,
      description: "Locked strictly to 20 minutes. Drink your espresso, close your eyes, and wake up supercharged.",
      color: "from-amber-600 to-orange-500",
    },
    powernap: {
      id: "powernap",
      title: "Power Nap",
      duration: 900,
      icon: BatteryCharging,
      description: "Locked strictly to 15 minutes. Pure light sleep to prevent grogginess and restore focus.",
      color: "from-blue-600 to-cyan-500",
    },
    consolidation: {
      id: "consolidation",
      title: "Consolidation Block",
      duration: 2700,
      icon: Brain,
      description: "Locked strictly to 45 minutes. Extended rest for deep sleep cognitive and motor cleanup.",
      color: "from-purple-600 to-indigo-500",
    },
  };

  useEffect(() => {
    if (timerState === "idle") {
      setSleepTimeLeft(modes[activeMode].duration);
      setPreTimeLeft(testMode ? 10 : 150);
    }
  }, [activeMode, timerState, testMode]);

  const initAudio = (): void => {
    if (!audioCtxRef.current) {
      const AudioContextCtor = window.AudioContext ?? window.webkitAudioContext;
      audioCtxRef.current = new AudioContextCtor();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
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
    gainNode.gain.value = isMuted ? 0 : 0.15;

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
    gainNode.gain.value = isMuted ? 0 : 0.08;

    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.2;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.03;

    lfo.connect(lfoGain);
    lfoGain.connect(gainNode.gain);
    lfo.start();

    rainSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    rainSource.start(0);
    ambientNodeRef.current = rainSource;
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
    gainNode.gain.value = isMuted ? 0 : 0.05;

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();

    ambientNodeRef.current = {
      stop: () => {
        try { osc1.stop(); } catch (e) { }
        try { osc2.stop(); } catch (e) { }
      },
    };
  };

  useEffect(() => {
    if (timerState !== "sleep" && timerState !== "pre") {
      stopAmbient();
      return;
    }

    if (ambientSound === "silence" || isMuted) {
      stopAmbient();
      return;
    }

    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    stopAmbient();

    if (ambientSound === "white") playWhiteNoise(ctx);
    if (ambientSound === "rain") playRainNoise(ctx);
    if (ambientSound === "cafe") playCafeNoise(ctx);

    return () => stopAmbient();
  }, [ambientSound, timerState, isMuted]);

  const stopAmbient = (): void => {
    if (ambientNodeRef.current) {
      try {
        ambientNodeRef.current.stop();
      } catch (e) { }
      ambientNodeRef.current = null;
    }
  };

  const previewAlarmSound = (sound: "silence" | "harp" | "bells" | "forest"): void => {
    if (sound === "silence") return;
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(isMuted ? 0 : 0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);
    gainNode.connect(ctx.destination);

    const osc = ctx.createOscillator();
    osc.type = "sine";
    if (sound === "harp") {
      osc.frequency.setValueAtTime(440.00, ctx.currentTime);
    } else if (sound === "bells") {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    } else if (sound === "forest") {
      osc.frequency.setValueAtTime(880.00, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320.00, ctx.currentTime + 0.12);
    }

    osc.connect(gainNode);
    osc.start();
    osc.stop(ctx.currentTime + 1.8);
  };

  const startAlarm = (): void => {
    if (alarmSoundRef.current === "silence") return;

    isAlarmPlayingRef.current = true;
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    stopAmbient();

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(isMuted ? 0 : 0.4, ctx.currentTime + 8);
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

      if (currentSound === "harp") {
        playChime(329.63, baseDelay);
        playChime(392.00, baseDelay + 0.2);
        playChime(440.00, baseDelay + 0.4);
        playChime(523.25, baseDelay + 0.6);
        playChime(659.25, baseDelay + 0.8);
      } else if (currentSound === "bells") {
        playBell(523.25, baseDelay);
        playBell(587.33, baseDelay + 0.4);
        playBell(659.25, baseDelay + 0.8);
        playBell(783.99, baseDelay + 1.2);
      } else if (currentSound === "forest") {
        playForestChirp(880.00, baseDelay);
        playForestChirp(1200.00, baseDelay + 0.15);
        playForestChirp(880.00, baseDelay + 0.4);
        playForestChirp(987.77, baseDelay + 0.55);
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
      try { node.stop(); } catch (e) { }
    });
    alarmNodeRef.current = [];
    if (alarmGainRef.current) {
      try { alarmGainRef.current.disconnect(); } catch (e) { }
      alarmGainRef.current = null;
    }
  };

  useEffect(() => {
    let timer: Timer | null = null;

    if (timerState === "pre") {
      timer = setInterval(() => {
        setPreTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer!);
            setTimerState("sleep");
            return 0;
          }
          return prev - 1;
        });
      }, testMode ? 50 : 1000);
    } else if (timerState === "sleep") {
      timer = setInterval(() => {
        setSleepTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer!);
            setTimerState("alarm");
            startAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, testMode ? 10 : 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerState, testMode]);

  useEffect(() => {
    return () => {
      stopAmbient();
      stopAlarm();
    };
  }, []);

  const handleStart = (): void => {
    initAudio();
    setPreTimeLeft(testMode ? 10 : 150);
    setSleepTimeLeft(modes[activeMode].duration);
    setTimerState("pre");
  };

  const handleStop = (): void => {
    stopAmbient();
    stopAlarm();
    setTimerState("idle");
    setPreTimeLeft(testMode ? 10 : 150);
    setSleepTimeLeft(modes[activeMode].duration);
  };

  const handleSkipPre = (): void => {
    setTimerState("sleep");
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const totalDuration = modes[activeMode].duration;
  const progressPercent = timerState === "sleep"
    ? ((totalDuration - sleepTimeLeft) / totalDuration) * 100
    : 0;

  const currentConfig = modes[activeMode];

  return (
    <div className="timer-container">
      {/* Sketchbook Background Doodles */}
      <CoffeeRing className="absolute left-1/2 -translate-x-1/2 top-[120px] w-96 h-96 opacity-60 pointer-events-none z-0" />
      <CrescentMoon className="absolute hidden md:block -right-28 top-[60px] w-24 h-24 pointer-events-none z-0 rotate-[10deg] opacity-75" />
      <ZZzCloud className="absolute hidden md:block -left-28 top-[240px] w-28 h-28 pointer-events-none z-0 rotate-[-8deg] opacity-70" />

      <section className="sandbox-banner">
        <div className="sandbox-content">
          <Sparkles className="h-4 w-4 text-accent animate-pulse" />
          <div>
            <span className="sandbox-title">Developer Sandbox Tools</span>
            <span className="sandbox-desc">Fast-forward timer speed for testing and code validation.</span>
          </div>
        </div>
        <button
          onClick={() => setTestMode((prev) => !prev)}
          className={`sandbox-toggle-btn ${testMode ? "sandbox-toggle-btn-active" : ""}`}
        >
          <FastForward className="h-3 w-3" />
          {testMode ? "Fast Speed (On)" : "Test Speed"}
        </button>
      </section>

      <div className="timer-card">

        {timerState === "idle" && (
          <section className="idle-view">
            <div className="idle-header">
              <h2 className="idle-title">Set Your Sleep Wave</h2>
              <p className="idle-desc">Select your locked scientific target block. Make sure to prepare your coffee.</p>
            </div>

            <ul className="idle-modes-list">
              {(Object.keys(modes) as NapMode[]).map((mId) => {
                const config = modes[mId];
                const Icon = config.icon;
                const isSelected = activeMode === mId;
                return (
                  <li key={mId}>
                    <button
                      onClick={() => setActiveMode(mId)}
                      className={`idle-mode-option ${isSelected ? "idle-mode-option-active" : ""}`}
                    >
                      <div className={`idle-mode-icon-box bg-gradient-to-r ${config.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="idle-mode-info">
                        <div className="idle-mode-header">
                          <span className="idle-mode-title">{config.title}</span>
                          <span className="idle-mode-duration">{config.duration / 60}m</span>
                        </div>
                        <span className="idle-mode-desc">{config.description}</span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            <button onClick={handleStart} className="primary-btn w-full justify-center py-4">
              <Play className="h-5 w-5 fill-current" />
              Initiate Countdown
            </button>
          </section>
        )}

        {timerState === "pre" && (
          <section className="pre-view">
            <div className="pre-header">
              <span className="pre-badge">
                <AlertCircle className="h-3 w-3" />
                Transition Wave
              </span>
              <h2 className="pre-title">Prepare to Fall Asleep</h2>
              <p className="pre-desc">Drink your coffee now if you haven't! Follow the breathing guide below to calm your mind.</p>
            </div>

            <figure className="breathing-circle-wrapper">
              <div className="breathing-bg-ring" />
              <div className="breathing-dashed-ring" />

              <div className="timer-time-display">
                <time className="text-3xl font-extrabold text-foreground">{formatTime(preTimeLeft)}</time>
                <figcaption className="time-label">Breathe & Rest</figcaption>
              </div>
            </figure>

            {/* Transition Sound & Alarm Selector Panel */}
            <div className="w-full space-y-5 py-4 border-t-2 border-dashed border-primary/20">

              {/* Transit Sound Machine Selector */}
              <div className="space-y-2.5">
                <span className="flex items-center justify-center gap-1.5 text-xs font-black text-foreground uppercase tracking-wider">
                  <Volume2 className="h-4 w-4" />
                  Transition Sound (Active Now)
                </span>
                <ul className="grid grid-cols-4 gap-2">
                  {[
                    { id: "silence" as const, label: "Silence" },
                    { id: "cafe" as const, label: "Cozy Cafe" },
                    { id: "rain" as const, label: "Gentle Rain" },
                    { id: "white" as const, label: "Pink Noise" },
                  ].map((sound) => {
                    const isActive = ambientSound === sound.id;
                    return (
                      <li key={sound.id}>
                        <button
                          onClick={() => setAmbientSound(sound.id)}
                          className={`sound-option-btn ${isActive ? "sound-option-btn-active" : ""}`}
                        >
                          {sound.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Wake-up Alarm Sound Selector */}
              <div className="space-y-2.5 pt-2">
                <span className="flex items-center justify-center gap-1.5 text-xs font-black text-foreground uppercase tracking-wider">
                  <Sparkles className="h-4 w-4 text-accent animate-pulse" />
                  Wake-Up Alarm (Audition on tap)
                </span>
                <ul className="grid grid-cols-4 gap-2">
                  {[
                    { id: "silence" as const, label: "Silence" },
                    { id: "harp" as const, label: "Harp Arp" },
                    { id: "bells" as const, label: "Cozy Bells" },
                    { id: "forest" as const, label: "Forest Birds" },
                  ].map((sound) => {
                    const isActive = alarmSound === sound.id;
                    return (
                      <li key={sound.id}>
                        <button
                          onClick={() => {
                            setAlarmSound(sound.id);
                            previewAlarmSound(sound.id);
                          }}
                          className={`sound-option-btn ${isActive ? "sound-option-btn-active" : ""}`}
                        >
                          {sound.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

            </div>

            <div className="timer-controls">
              <button onClick={handleSkipPre} className="skip-pre-btn">
                Skip Pre-Countdown
                <FastForward className="h-4 w-4" />
              </button>
              <button onClick={handleStop} className="stop-timer-btn" aria-label="Stop Timer">
                <Square className="h-4 w-4 fill-current" />
              </button>
            </div>
          </section>
        )}

        {timerState === "sleep" && (
          <section className="sleep-view">

            <div className="sleep-header">
              <h2 className="sleep-title">{currentConfig.title} Active</h2>
              <p className="sleep-desc">Adenosine clearance cycle currently in progress. Rest comfortably.</p>
            </div>

            <figure className="sleep-circular-progress">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="112" cy="112" r="100" className="svg-progress-track" strokeWidth="8" />
                <circle
                  cx="112"
                  cy="112"
                  r="100"
                  className="svg-progress-bar"
                  strokeWidth="8"
                  strokeDasharray="628"
                  strokeDashoffset={628 - (628 * progressPercent) / 100}
                  strokeLinecap="round"
                />
              </svg>

              <div className="timer-time-display">
                <time className="text-4xl font-extrabold tracking-tight text-foreground">{formatTime(sleepTimeLeft)}</time>
                <figcaption className="time-label-accent">Napping...</figcaption>
              </div>
            </figure>

            <div className="sleep-sound-section">
              <div className="sound-header">
                <span className="sound-title-box">
                  <Volume2 className="h-4 w-4" />
                  Sleep Sound Machine
                </span>

                <button
                  onClick={() => setIsMuted((prev) => !prev)}
                  className={`p-1.5 rounded-lg border transition-all ${isMuted ? "sound-mute-btn-active" : "sound-mute-btn"
                    }`}
                  title={isMuted ? "Unmute sounds" : "Mute sounds"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
              </div>

              <ul className="sounds-grid">
                {[
                  { id: "silence" as const, label: "Silence" },
                  { id: "cafe" as const, label: "Cozy Cafe" },
                  { id: "rain" as const, label: "Gentle Rain" },
                  { id: "white" as const, label: "Pink Noise" },
                ].map((sound) => {
                  const isActive = ambientSound === sound.id;
                  return (
                    <li key={sound.id}>
                      <button
                        onClick={() => setAmbientSound(sound.id)}
                        className={`sound-option-btn ${isActive ? "sound-option-btn-active" : ""}`}
                      >
                        {sound.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Wake-Up Alarm Selector inside Sleep View */}
            <div className="w-full space-y-2.5 pt-2">
              <span className="flex items-center justify-center gap-1.5 text-xs font-black text-foreground uppercase tracking-wider">
                <Sparkles className="h-4 w-4 text-accent animate-pulse" />
                Wake-Up Alarm (Audition on tap)
              </span>
              <ul className="grid grid-cols-4 gap-2">
                {[
                  { id: "silence" as const, label: "Silence" },
                  { id: "harp" as const, label: "Harp Arp" },
                  { id: "bells" as const, label: "Cozy Bells" },
                  { id: "forest" as const, label: "Forest Birds" },
                ].map((sound) => {
                  const isActive = alarmSound === sound.id;
                  return (
                    <li key={sound.id}>
                      <button
                        onClick={() => {
                          setAlarmSound(sound.id);
                          previewAlarmSound(sound.id);
                        }}
                        className={`sound-option-btn ${isActive ? "sound-option-btn-active" : ""}`}
                      >
                        {sound.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button onClick={handleStop} className="cancel-nap-btn">
              <Square className="h-4.5 w-4.5 fill-current" />
              Cancel Nap Loop
            </button>

          </section>
        )}

        {timerState === "alarm" && (
          <section className="alarm-view">
            <div className="alarm-alert-icon">
              <Coffee className="h-10 w-10 animate-pulse" />
            </div>

            <div className="pre-header">
              <h2 className="alarm-title">Time to Conquer!</h2>
              <p className="alarm-desc">Your 20 minutes is up. The caffeine has successfully crossed into your brain receptors. Rise and shine!</p>
            </div>

            <button onClick={handleStop} className="alarm-action-btn">
              Rise and Grind
            </button>
          </section>
        )}

      </div>
    </div>
  );
}
