import { FastForward, Sparkles } from "lucide-react";
import type React from "react";
import type { AlarmSound, AmbientSound, TimerState } from "../../hooks/useAudioEngine";
import { useI18n } from "../../lib/i18n";
import type { NapMode } from "../../lib/modes";
import { AlarmView } from "./AlarmView";
import { IdleView } from "./IdleView";
import { PreView } from "./PreView";
import { SleepView } from "./SleepView";

type TimerPageProps = {
  timerState: TimerState;
  activeMode: NapMode;
  preTimeLeft: number;
  sleepTimeLeft: number;
  testMode: boolean;
  setTestMode: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveMode: React.Dispatch<React.SetStateAction<NapMode>>;
  handleStart: (initAudio: () => void) => void;
  handleStop: (stopAudio: () => void) => void;
  handleSkipPre: () => void;
  progressPercent: number;
  ambientSound: AmbientSound;
  setAmbientSound: (sound: AmbientSound) => void;
  alarmSound: AlarmSound;
  setAlarmSound: (sound: AlarmSound) => void;
  previewAlarmSound: (sound: AlarmSound) => Promise<void>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  initAudio: () => Promise<void>;
  stopAlarm: () => void;
};

export function TimerPage({
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
  ambientSound,
  setAmbientSound,
  alarmSound,
  setAlarmSound,
  previewAlarmSound,
  isMuted,
  setIsMuted,
  initAudio,
  stopAlarm,
}: TimerPageProps): React.ReactElement {
  const { t } = useI18n();

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section className="flex flex-col gap-10 max-w-2xl mx-auto py-6 text-center relative z-10" aria-label="Nap Timer">
      <section className="flex justify-between items-center bg-secondary/45 border border-dashed border-border/80 p-4 rounded-2xl">
        <div className="flex items-center gap-2 text-left">
          <Sparkles className="h-4 w-4 text-accent animate-pulse" />
          <div>
            <span className="block text-xs font-black text-foreground uppercase tracking-wide">
              {t("sandbox.title")}
            </span>
            <span className="block text-xs text-muted-foreground font-bold">{t("sandbox.desc")}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setTestMode((prev) => !prev)}
          aria-pressed={testMode}
          aria-label={t("sandbox.toggle_label")}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold transition-all border border-border bg-card text-muted-foreground ${testMode ? "bg-accent/10 border-accent text-accent shadow-sm" : ""}`}
        >
          <FastForward className="h-3 w-3" />
          {testMode ? t("sandbox.speed_on") : t("sandbox.speed_off")}
        </button>
      </section>

      <article
        className="bg-card border border-border/30 p-8 md:p-12 transition-all duration-500 rounded-3xl shadow-sm"
        aria-label="Timer Card"
      >
        {timerState === "idle" && (
          <IdleView activeMode={activeMode} setActiveMode={setActiveMode} handleStart={() => handleStart(initAudio)} />
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
            previewAlarmSound={previewAlarmSound}
            handleSkipPre={handleSkipPre}
            handleStop={() => handleStop(stopAlarm)}
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
            previewAlarmSound={previewAlarmSound}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            handleStop={() => handleStop(stopAlarm)}
          />
        )}

        {timerState === "alarm" && <AlarmView activeMode={activeMode} handleStop={() => handleStop(stopAlarm)} />}
      </article>
    </section>
  );
}
