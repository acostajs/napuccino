import { AlertCircle, FastForward, Square } from "lucide-react";
import type React from "react";
import { useI18n } from "../../lib/i18n";
import type { NapMode } from "../../lib/modes";

type PreViewProps = {
  activeMode: NapMode;
  preTimeLeft: number;
  formatTime: (seconds: number) => string;
  handleSkipPre: () => void;
  handleStop: () => void;
};

const breathingRingColors = {
  napuccino: {
    bg: "bg-[var(--mode-napuccino-start)]/20",
    border: "border-[var(--mode-napuccino-start)]/40",
    text: "text-[var(--mode-napuccino-start)]",
  },
  powernap: {
    bg: "bg-[var(--mode-powernap-start)]/20",
    border: "border-[var(--mode-powernap-start)]/40",
    text: "text-[var(--mode-powernap-start)]",
  },
  consolidation: {
    bg: "bg-[var(--mode-consolidation-start)]/20",
    border: "border-[var(--mode-consolidation-start)]/40",
    text: "text-[var(--mode-consolidation-start)]",
  },
};

export function PreView({
  activeMode,
  preTimeLeft,
  formatTime,
  handleSkipPre,
  handleStop,
}: PreViewProps): React.ReactElement {
  const { t } = useI18n();

  // Structured breathing guide synchronized with a 15-second breathing buffer
  const getBreathingGuide = (): { instruction: string; subtext: string } => {
    if (preTimeLeft > 11) {
      return {
        instruction: t("timer.pre.breathe_in") || "Inhale deeply",
        subtext: "Fill your lungs with warm, calming air.",
      };
    }
    if (preTimeLeft > 7) {
      return {
        instruction: t("timer.pre.breathe_hold") || "Hold your breath",
        subtext: "Rest in the quiet stillness.",
      };
    }
    if (preTimeLeft > 3) {
      return {
        instruction: t("timer.pre.breathe_out") || "Exhale slowly",
        subtext: "Release all remaining tension.",
      };
    }
    return {
      instruction: t("timer.pre.breathe_rest") || "Prepare to drift",
      subtext: "Let go and relax completely.",
    };
  };

  const guide = getBreathingGuide();

  return (
    <section className="space-y-12 flex flex-col items-center max-w-md mx-auto py-8">
      {/* Editorial Header */}
      <div className="space-y-3 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-accent animate-pulse">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {t("timer.pre.badge") || "Breathing Buffer"}
        </span>
        <h2 className="typography-display text-primary">{t("timer.pre.title") || "Drifting Transition"}</h2>
        <p className="typography-body text-muted-foreground font-semibold max-w-xs leading-relaxed">
          {t("timer.pre.desc") || "Take a moment to align your breathing before the timer starts."}
        </p>
      </div>

      {/* Animated Breathing Ring (Centered) */}
      <figure className="relative w-52 h-52 flex items-center justify-center select-none">
        <div className={`absolute inset-0 rounded-full animate-breathe ${breathingRingColors[activeMode].bg}`} />
        <div
          className={`absolute w-40 h-40 rounded-full border border-dashed animate-spin ${breathingRingColors[activeMode].border}`}
          style={{ animationDuration: "12s" }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center">
          <time className="typography-timer font-serif text-5xl sm:text-6xl tracking-tight text-primary leading-none">
            {formatTime(preTimeLeft)}
          </time>
        </div>
      </figure>

      {/* Breathing Instruction Typography */}
      <div className="text-center space-y-2 h-14 select-none">
        <p
          className={`text-xl font-bold tracking-tight transition-all duration-500 ${breathingRingColors[activeMode].text}`}
        >
          {guide.instruction}
        </p>
        <p className="text-xs text-muted-foreground font-bold transition-all duration-500">{guide.subtext}</p>
      </div>

      {/* Flat, borderless pill actions */}
      <div className="flex gap-4 w-full pt-4">
        <button
          type="button"
          onClick={handleSkipPre}
          className="flex-grow flex items-center justify-center gap-2 border border-border/20 bg-secondary/80 font-bold text-xs uppercase tracking-wider px-6 py-3.5 hover:bg-secondary transition-all duration-500 ease-out rounded-full shadow-xs hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
        >
          {t("timer.pre.skip") || "Skip Buffer"}
          <FastForward className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleStop}
          className="rounded-full border border-transparent bg-destructive/10 text-destructive font-bold text-xs uppercase tracking-wider px-6 py-3.5 hover:bg-destructive/20 transition-all duration-500 ease-out flex items-center justify-center cursor-pointer"
          aria-label="Stop Timer"
        >
          <Square className="h-4 w-4 fill-current" />
        </button>
      </div>
    </section>
  );
}
