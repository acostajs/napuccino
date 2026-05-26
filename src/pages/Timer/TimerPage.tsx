import { FastForward, Sparkles } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { CoffeeRing, CrescentMoon, ZZzCloud } from "../../components/Doodles";
import { type AlarmSound, type AmbientSound, useAudioEngine } from "../../hooks/useAudioEngine";
import { useNapTimer } from "../../hooks/useNapTimer";
import { useI18n } from "../../lib/i18n";
import { AlarmView } from "./AlarmView";
import { IdleView } from "./IdleView";
import { PreView } from "./PreView";
import { SleepView } from "./SleepView";

export function TimerPage(): React.ReactElement {
  const { t } = useI18n();
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
    <section className="timer-container" aria-label="Nap Timer">
      {/* Sketchbook Background Doodles */}
      <CoffeeRing className="absolute left-1/2 -translate-x-1/2 top-[120px] w-96 h-96 opacity-60 pointer-events-none z-0" />
      <CrescentMoon className="absolute hidden md:block -right-28 top-[60px] w-24 h-24 pointer-events-none z-0 rotate-[10deg] opacity-75" />
      <ZZzCloud className="absolute hidden md:block -left-28 top-[240px] w-28 h-28 pointer-events-none z-0 rotate-[-8deg] opacity-70" />

      <section className="sandbox-banner">
        <div className="sandbox-content">
          <Sparkles className="h-4 w-4 text-accent animate-pulse" />
          <div>
            <span className="sandbox-title">{t("sandbox.title")}</span>
            <span className="sandbox-desc">{t("sandbox.desc")}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setTestMode((prev) => !prev)}
          aria-pressed={testMode}
          aria-label={t("sandbox.toggle_label")}
          className={`sandbox-toggle-btn ${testMode ? "sandbox-toggle-btn-active" : ""}`}
        >
          <FastForward className="h-3 w-3" />
          {testMode ? t("sandbox.speed_on") : t("sandbox.speed_off")}
        </button>
      </section>

      <article className="timer-card" aria-label="Timer Card">
        {timerState === "idle" && (
          <IdleView
            activeMode={activeMode}
            setActiveMode={setActiveMode}
            handleStart={() => handleStart(audioEngine.initAudio)}
          />
        )}

        {timerState === "pre" && (
          <PreView
            activeMode={activeMode}
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
          <AlarmView activeMode={activeMode} handleStop={() => handleStop(audioEngine.stopAlarm)} />
        )}
      </article>
    </section>
  );
}
