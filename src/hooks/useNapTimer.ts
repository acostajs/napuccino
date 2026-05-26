import { useEffect, useState } from "react";
import { MODES, type NapMode } from "../lib/modes";
import type { TimerState } from "./useAudioEngine";

type UseNapTimerProps = Record<string, never>;

type UseNapTimerResult = {
  timerState: TimerState;
  activeMode: NapMode;
  preTimeLeft: number;
  sleepTimeLeft: number;
  testMode: boolean;
  setTimerState: (state: TimerState) => void;
  setTestMode: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveMode: React.Dispatch<React.SetStateAction<NapMode>>;
  handleStart: (initAudio: () => void) => void;
  handleStop: (stopAudio: () => void) => void;
  handleSkipPre: () => void;
  progressPercent: number;
};

export function useNapTimer(_props: UseNapTimerProps = {}): UseNapTimerResult {
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [activeMode, setActiveMode] = useState<NapMode>("napuccino");
  const [preTimeLeft, setPreTimeLeft] = useState<number>(150);
  const [sleepTimeLeft, setSleepTimeLeft] = useState<number>(1200);
  const [testMode, setTestMode] = useState<boolean>(false);

  // Sync mode duration and initial values
  useEffect(() => {
    if (timerState === "idle") {
      setSleepTimeLeft(MODES[activeMode].duration);
      setPreTimeLeft(testMode ? 10 : 150);
    }
  }, [activeMode, timerState, testMode]);

  // Sync countdown loops
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (timerState === "pre") {
      timer = setInterval(
        () => {
          setPreTimeLeft((prev) => {
            if (prev <= 1) {
              if (timer) clearInterval(timer);
              setTimerState("sleep");
              return 0;
            }
            return prev - 1;
          });
        },
        testMode ? 50 : 1000,
      );
    } else if (timerState === "sleep") {
      timer = setInterval(
        () => {
          setSleepTimeLeft((prev) => {
            if (prev <= 1) {
              if (timer) clearInterval(timer);
              setTimerState("alarm");
              return 0;
            }
            return prev - 1;
          });
        },
        testMode ? 10 : 1000,
      );
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerState, testMode]);

  const handleStart = (initAudio: () => void): void => {
    initAudio();
    setPreTimeLeft(testMode ? 10 : 150);
    setSleepTimeLeft(MODES[activeMode].duration);
    setTimerState("pre");
  };

  const handleStop = (stopAudio: () => void): void => {
    stopAudio();
    setTimerState("idle");
    setPreTimeLeft(testMode ? 10 : 150);
    setSleepTimeLeft(MODES[activeMode].duration);
  };

  const handleSkipPre = (): void => {
    setTimerState("sleep");
  };

  const totalDuration = MODES[activeMode].duration;
  const progressPercent = timerState === "sleep" ? ((totalDuration - sleepTimeLeft) / totalDuration) * 100 : 0;

  return {
    timerState,
    activeMode,
    preTimeLeft,
    sleepTimeLeft,
    testMode,
    setTimerState,
    setTestMode,
    setActiveMode,
    handleStart,
    handleStop,
    handleSkipPre,
    progressPercent,
  };
}
