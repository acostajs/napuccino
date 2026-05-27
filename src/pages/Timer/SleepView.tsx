import type React from "react";
import { useI18n } from "../../lib/i18n";
import type { NapMode } from "../../lib/modes";

type SleepViewProps = {
  activeMode: NapMode;
  sleepTimeLeft: number;
  formatTime: (seconds: number) => string;
  handleStop: () => void;
};

export function SleepView({ activeMode, sleepTimeLeft, formatTime, handleStop }: SleepViewProps): React.ReactElement {
  const { t } = useI18n();

  // Mapping active modes to their visual meta subtitles
  const presetNames = {
    napuccino: "Caramel Rest",
    powernap: "Matcha Rest",
    consolidation: "Terracotta Rest",
  }[activeMode];

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center select-none text-center">
      {/* 
        Radical Reduction Phase: 
        All headers, footers, sound matrices, and control boards have dissolved. 
        Only the dimmed countdown remains to respect resting eyes.
      */}
      <button
        type="button"
        onClick={handleStop}
        title={t("timer.sleep.cancel") || "Tap to cancel rest"}
        className="group flex flex-col items-center justify-center gap-4 bg-transparent border-0 outline-none cursor-pointer focus:scale-105 active:scale-95 transition-transform"
      >
        <time className="typography-timer font-serif text-[100px] sm:text-[120px] text-primary opacity-30 group-hover:opacity-70 group-focus:opacity-70 transition-opacity duration-700 tracking-tighter leading-none">
          {formatTime(sleepTimeLeft)}
        </time>
        <span className="typography-utility uppercase text-xs tracking-widest text-accent opacity-25 group-hover:opacity-65 group-focus:opacity-65 transition-opacity duration-700 -mt-2">
          {presetNames}
        </span>
      </button>

      {/* Faint, subtle escape anchor below to ensure easy exiting */}
      <button
        type="button"
        onClick={handleStop}
        className="mt-16 text-muted-foreground opacity-15 hover:opacity-60 focus:opacity-60 transition-opacity duration-500 text-[10px] font-bold uppercase tracking-widest cursor-pointer border border-border/10 rounded-full px-4 py-1.5 bg-secondary/10"
      >
        {t("timer.sleep.cancel") || "Cancel Rest"}
      </button>
    </section>
  );
}
