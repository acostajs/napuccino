import { Sparkles, Square, Volume2, VolumeX } from "lucide-react";
import type React from "react";
import type { AlarmSound, AmbientSound } from "../../hooks/useAudioEngine";
import { useI18n } from "../../lib/i18n";
import type { NapMode } from "../../lib/modes";
import { SoundSelector } from "./SoundSelector";

type SleepViewProps = {
  activeMode: NapMode;
  sleepTimeLeft: number;
  formatTime: (seconds: number) => string;
  progressPercent: number;
  ambientSound: AmbientSound;
  setAmbientSound: (sound: AmbientSound) => void;
  alarmSound: AlarmSound;
  setAlarmSound: (sound: AlarmSound) => void;
  previewAlarmSound: (sound: AlarmSound) => void;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  handleStop: () => void;
};

const activeProgressColors = {
  napuccino: "stroke-[var(--mode-napuccino-start)]",
  powernap: "stroke-[var(--mode-powernap-start)]",
  consolidation: "stroke-[var(--mode-consolidation-start)]",
};

export function SleepView({
  activeMode,
  sleepTimeLeft,
  formatTime,
  progressPercent,
  ambientSound,
  setAmbientSound,
  alarmSound,
  setAlarmSound,
  previewAlarmSound,
  isMuted,
  setIsMuted,
  handleStop,
}: SleepViewProps): React.ReactElement {
  const { t } = useI18n();
  const transitionOptions = [
    { id: "silence" as const, label: t("sounds.silence") },
    { id: "cafe" as const, label: t("sounds.cafe") },
    { id: "rain" as const, label: t("sounds.rain") },
    { id: "white" as const, label: t("sounds.white") },
  ];

  const alarmOptions = [
    { id: "silence" as const, label: t("sounds.silence") },
    { id: "harp" as const, label: t("sounds.harp") },
    { id: "bells" as const, label: t("sounds.bells") },
    { id: "forest" as const, label: t("sounds.forest") },
  ];

  return (
    <section className="space-y-8 flex flex-col items-center">
      <div className="space-y-2">
        <h2 className="text-xl font-black text-foreground">
          {t("timer.sleep.active", { mode: t(`modes.${activeMode}.title`) })}
        </h2>
        <p className="text-xs text-muted-foreground font-bold">{t("timer.sleep.desc")}</p>
      </div>

      <figure className="relative w-56 h-56 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <title>Nap progress indicator</title>
          <circle cx="112" cy="112" r="100" className="stroke-secondary fill-none" strokeWidth="8" />
          <circle
            cx="112"
            cy="112"
            r="100"
            className={`fill-none transition-all duration-1000 ${activeProgressColors[activeMode]}`}
            strokeWidth="8"
            strokeDasharray="628"
            strokeDashoffset={628 - (628 * progressPercent) / 100}
            strokeLinecap="round"
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center justify-center">
          <time className="font-serif font-bold text-foreground tracking-normal text-5xl sm:text-6xl md:text-7xl leading-none">
            {formatTime(sleepTimeLeft)}
          </time>
          <figcaption className="text-xs font-extrabold uppercase text-accent tracking-widest mt-1.5 animate-pulse">
            {t("timer.sleep.napping")}
          </figcaption>
        </div>
      </figure>

      <div className="w-full space-y-4">
        <div className="flex items-center justify-between border-t-2 border-primary/20 pt-4">
          <span className="text-xs font-black text-foreground flex items-center gap-1.5 uppercase tracking-wide">
            <Volume2 className="h-4 w-4" />
            {t("timer.sleep.sound_machine")}
          </span>

          <button
            type="button"
            onClick={() => setIsMuted((prev) => !prev)}
            className={
              isMuted
                ? "p-1.5 border border-destructive/20 transition-all duration-500 ease-out bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-xl"
                : "p-1.5 border border-border transition-all duration-500 ease-out bg-card text-muted-foreground hover:text-foreground rounded-xl"
            }
            aria-label={isMuted ? t("timer.sleep.unmute") : t("timer.sleep.mute")}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>

        <SoundSelector
          title={t("timer.sounds.ambient_title")}
          icon={null}
          activeId={ambientSound}
          options={transitionOptions}
          onSelect={setAmbientSound}
        />
      </div>

      {/* Wake-Up Alarm Selector inside Sleep View */}
      <div className="w-full space-y-2.5 pt-2">
        <SoundSelector
          title={t("timer.sounds.alarm_title")}
          icon={<Sparkles className="h-4 w-4 text-accent animate-pulse" />}
          activeId={alarmSound}
          options={alarmOptions}
          onSelect={setAlarmSound}
          onPreview={previewAlarmSound}
        />
      </div>

      <button
        type="button"
        onClick={handleStop}
        className="w-full flex items-center justify-center gap-2 border border-transparent bg-destructive/10 text-destructive font-bold text-sm px-6 py-3.5 hover:bg-destructive/15 transition-all duration-500 ease-out rounded-2xl"
      >
        <Square className="h-4.5 w-4.5 fill-current" />
        {t("timer.sleep.cancel")}
      </button>
    </section>
  );
}
