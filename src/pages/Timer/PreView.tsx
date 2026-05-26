import { AlertCircle, FastForward, Sparkles, Square, Volume2 } from "lucide-react";
import type React from "react";
import type { AlarmSound, AmbientSound } from "../../hooks/useAudioEngine";
import { useI18n } from "../../lib/i18n";
import type { NapMode } from "../../lib/modes";
import { SoundSelector } from "./SoundSelector";

type PreViewProps = {
  activeMode: NapMode;
  preTimeLeft: number;
  formatTime: (seconds: number) => string;
  ambientSound: AmbientSound;
  setAmbientSound: (sound: AmbientSound) => void;
  alarmSound: AlarmSound;
  setAlarmSound: (sound: AlarmSound) => void;
  previewAlarmSound: (sound: AlarmSound) => void;
  handleSkipPre: () => void;
  handleStop: () => void;
};

const breathingRingColors = {
  napuccino: {
    bg: "bg-[var(--mode-napuccino-start)]/15",
    border: "border-[var(--mode-napuccino-start)]/45",
  },
  powernap: {
    bg: "bg-[var(--mode-powernap-start)]/15",
    border: "border-[var(--mode-powernap-start)]/45",
  },
  consolidation: {
    bg: "bg-[var(--mode-consolidation-start)]/15",
    border: "border-[var(--mode-consolidation-start)]/45",
  },
};

export function PreView({
  activeMode,
  preTimeLeft,
  formatTime,
  ambientSound,
  setAmbientSound,
  alarmSound,
  setAlarmSound,
  previewAlarmSound,
  handleSkipPre,
  handleStop,
}: PreViewProps): React.ReactElement {
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
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/25 px-3 py-1 text-xs font-extrabold text-accent animate-pulse">
          <AlertCircle className="h-3 w-3" />
          {t("timer.pre.badge")}
        </span>
        <h2 className="text-xl font-black text-foreground">{t("timer.pre.title")}</h2>
        <p className="text-xs text-muted-foreground font-bold max-w-xs leading-relaxed">{t("timer.pre.desc")}</p>
      </div>

      <figure className="relative w-48 h-48 flex items-center justify-center">
        <div className={`absolute inset-0 rounded-full animate-breathe ${breathingRingColors[activeMode].bg}`} />
        <div
          className={`absolute w-36 h-36 rounded-full border border-dashed animate-spin ${breathingRingColors[activeMode].border}`}
          style={{ animationDuration: "16s" }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center">
          <time className="font-serif font-bold text-foreground tracking-normal text-5xl sm:text-6xl md:text-7xl leading-none">
            {formatTime(preTimeLeft)}
          </time>
          <figcaption className="text-xs uppercase font-extrabold text-accent tracking-wider mt-1">
            {t("timer.pre.breathe_rest")}
          </figcaption>
        </div>
      </figure>

      {/* Transition Sound & Alarm Selector Panel */}
      <div className="w-full space-y-5 py-4 border-t border-dashed border-border/80">
        <SoundSelector
          title={t("timer.sounds.transition_title")}
          icon={<Volume2 className="h-4 w-4" />}
          activeId={ambientSound}
          options={transitionOptions}
          onSelect={setAmbientSound}
        />

        <SoundSelector
          title={t("timer.sounds.alarm_title")}
          icon={<Sparkles className="h-4 w-4 text-accent animate-pulse" />}
          activeId={alarmSound}
          options={alarmOptions}
          onSelect={setAlarmSound}
          onPreview={previewAlarmSound}
        />
      </div>

      <div className="flex gap-4 w-full">
        <button
          type="button"
          onClick={handleSkipPre}
          className="flex-grow flex items-center justify-center gap-1.5 border border-border bg-secondary/80 font-bold text-sm px-4 py-3 hover:bg-secondary transition-all duration-500 ease-out rounded-xl shadow-xs hover:-translate-y-0.5 hover:shadow-md"
        >
          {t("timer.pre.skip")}
          <FastForward className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleStop}
          className="rounded-xl border border-transparent bg-destructive/10 text-destructive font-bold text-sm px-4 py-3 hover:bg-destructive/20 transition-all duration-500 ease-out flex items-center justify-center"
          aria-label="Stop Timer"
        >
          <Square className="h-4 w-4 fill-current" />
        </button>
      </div>
    </section>
  );
}
