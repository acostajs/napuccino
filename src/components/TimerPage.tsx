import React, { useState } from "react";
import { FastForward, Sparkles } from "lucide-react";
import { CoffeeRing, CrescentMoon, ZZzCloud } from "./Doodles";
import { useAudioEngine, type AmbientSound, type AlarmSound } from "../hooks/useAudioEngine";
import { useNapTimer } from "../hooks/useNapTimer";
import { IdleView } from "./IdleView";
import { PreView } from "./PreView";
import { SleepView } from "./SleepView";
import { AlarmView } from "./AlarmView";

export function TimerPage(): React.ReactElement {
  const [ambientSound, setAmbientSound] = useState<AmbientSound>("silence");
  const [alarmSound, setAlarmSound] = useState<AlarmSound>("harp");
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const {
    timerState,
    activeMode,
    preTimeLeft,
    sleepTimeLeft,
    testMode,
    setTestMode,
    setActiveMode,
    handleStart,
    handleStop,
    handleSkipPre,
    progressPercent,
  } = useNapTimer();

  const audioEngine = useAudioEngine({
    isMuted,
    ambientSound,
    alarmSound,
    timerState,
  });

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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
          <IdleView
            activeMode={activeMode}
            setActiveMode={setActiveMode}
            handleStart={() => handleStart(audioEngine.initAudio)}
          />
        )}

        {timerState === "pre" && (
          <PreView
            preTimeLeft={preTimeLeft}
            formatTime={formatTime}
            ambientSound={ambientSound}
            setAmbientSound={setAmbientSound}
            alarmSound={alarmSound}
            setAlarmSound={setAlarmSound}
            previewAlarmSound={audioEngine.previewAlarmSound}
            handleSkipPre={handleSkipPre}
            handleStop={() => handleStop(audioEngine.stopAlarm)}
          />
        )}

        {timerState === "sleep" && (
          <SleepView
            activeMode={activeMode}
            sleepTimeLeft={sleepTimeLeft}
            formatTime={formatTime}
            progressPercent={progressPercent}
            ambientSound={ambientSound}
            setAmbientSound={setAmbientSound}
            alarmSound={alarmSound}
            setAlarmSound={setAlarmSound}
            previewAlarmSound={audioEngine.previewAlarmSound}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            handleStop={() => handleStop(audioEngine.stopAlarm)}
          />
        )}

        {timerState === "alarm" && (
          <AlarmView handleStop={() => handleStop(audioEngine.stopAlarm)} />
        )}
      </div>
    </div>
  );
}
