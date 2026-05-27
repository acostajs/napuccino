import { FastForward, Sparkles } from "lucide-react";
import type React from "react";
import type { AlarmSound, AmbientSound, TimerState } from "../../hooks/useAudioEngine";
import { useFormatTime } from "../../hooks/useFormatTime";
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
  ambientSound: AmbientSound;
  setAmbientSound: (sound: AmbientSound) => void;
  alarmSound: AlarmSound;
  setAlarmSound: (sound: AlarmSound) => void;
  previewAlarmSound: (sound: AlarmSound) => Promise<void>;
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
  ambientSound,
  setAmbientSound,
  alarmSound,
  setAlarmSound,
  previewAlarmSound,
  initAudio,
  stopAlarm,
}: TimerPageProps): React.ReactElement {
  const { t } = useI18n();

  const formatTime = useFormatTime();

  return (
    <section className="flex flex-col gap-10 max-w-2xl mx-auto py-6 text-center relative z-10" aria-label="Nap Timer">
      <header className="flex justify-between items-center bg-secondary/45 py-4 px-6 rounded-full transition-all">
        <div className="flex items-center gap-2 text-left">
          <Sparkles className="h-4 w-4 text-accent animate-pulse shrink-0" />
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
          className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-extrabold transition-all border border-border/20 bg-card text-muted-foreground cursor-pointer ${
            testMode ? "bg-accent/10 border-accent/40 text-accent shadow-xs" : "hover:text-foreground"
          }`}
        >
          <FastForward className="h-3 w-3" />
          {testMode ? t("sandbox.speed_on") : t("sandbox.speed_off")}
        </button>
      </header>

      <div className="w-full transition-all duration-500 ease-out">
        {timerState === "idle" && (
          <IdleView
            activeMode={activeMode}
            setActiveMode={setActiveMode}
            handleStart={() => handleStart(initAudio)}
            ambientSound={ambientSound}
            setAmbientSound={setAmbientSound}
            alarmSound={alarmSound}
            setAlarmSound={setAlarmSound}
            previewAlarmSound={previewAlarmSound}
          />
        )}

        {timerState === "pre" && (
          <PreView
            activeMode={activeMode}
            preTimeLeft={preTimeLeft}
            formatTime={formatTime}
            handleSkipPre={handleSkipPre}
            handleStop={() => handleStop(stopAlarm)}
          />
        )}

        {timerState === "sleep" && (
          <SleepView
            activeMode={activeMode}
            sleepTimeLeft={sleepTimeLeft}
            formatTime={formatTime}
            handleStop={() => handleStop(stopAlarm)}
            ambientSound={ambientSound}
            setAmbientSound={setAmbientSound}
          />
        )}

        {timerState === "alarm" && <AlarmView activeMode={activeMode} handleStop={() => handleStop(stopAlarm)} />}
      </div>
    </section>
  );
}
