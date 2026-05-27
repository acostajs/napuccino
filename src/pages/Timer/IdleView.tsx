import { CloudRain, Coffee, VolumeX, Wind } from "lucide-react";
import type React from "react";
import type { AlarmSound, AmbientSound } from "../../hooks/useAudioEngine";
import { useI18n } from "../../lib/i18n";
import { MODES, type NapMode } from "../../lib/modes";

type IdleViewProps = {
  activeMode: NapMode;
  setActiveMode: (mode: NapMode) => void;
  handleStart: () => void;
  ambientSound: AmbientSound;
  setAmbientSound: (sound: AmbientSound) => void;
  alarmSound: AlarmSound;
  setAlarmSound: (sound: AlarmSound) => void;
  previewAlarmSound: (sound: AlarmSound) => Promise<void>;
};

export function IdleView({
  activeMode,
  setActiveMode,
  handleStart,
  ambientSound,
  setAmbientSound,
  alarmSound,
  setAlarmSound,
  previewAlarmSound,
}: IdleViewProps): React.ReactElement {
  const { t } = useI18n();

  // Mapping modes to zine preset labels and description headers
  const presetDetails = {
    napuccino: {
      name: "Caramel",
      meta: "20m Espresso Shot",
      desc: t("modes.napuccino.description"),
    },
    powernap: {
      name: "Matcha",
      meta: "15m Clearing Wave",
      desc: t("modes.powernap.description"),
    },
    consolidation: {
      name: "Terracotta",
      meta: "45m Memory Lock",
      desc: t("modes.consolidation.description"),
    },
  };

  const ambientOptions = [
    { id: "silence" as const, label: t("sounds.silence") || "Silence", icon: VolumeX },
    { id: "cafe" as const, label: t("sounds.cafe") || "Cafe", icon: Coffee },
    { id: "rain" as const, label: t("sounds.rain") || "Rain", icon: CloudRain },
    { id: "white" as const, label: t("sounds.white") || "Wind", icon: Wind },
  ];

  const alarmOptions = [
    { id: "silence" as const, label: t("sounds.silence") || "None" },
    { id: "harp" as const, label: t("sounds.harp") || "Harp" },
    { id: "bells" as const, label: t("sounds.bells") || "Bells" },
    { id: "forest" as const, label: t("sounds.forest") || "Forest" },
  ];

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    return `${mins.toString().padStart(2, "0")}:00`;
  };

  return (
    <section className="space-y-12 max-w-xl mx-auto flex flex-col items-center">
      {/* Editorial Header */}
      <div className="space-y-3 text-center">
        <h2 className="typography-display text-primary">{t("timer.idle.title")}</h2>
        <p className="typography-body text-muted-foreground font-semibold max-w-sm mx-auto">
          {presetDetails[activeMode].desc}
        </p>
      </div>

      {/* 1. Flat, borderless edge-to-edge preset pill tabs switcher */}
      <div className="w-full flex justify-center py-2">
        <nav className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-secondary/60 border border-border/10 shadow-inner">
          {(Object.keys(MODES) as NapMode[]).map((mId) => {
            const isSelected = activeMode === mId;
            const details = presetDetails[mId];

            const activeColorStyles = {
              napuccino: "bg-[var(--mode-napuccino-start)] text-primary-foreground font-black scale-105",
              powernap: "bg-[var(--mode-powernap-start)] text-primary-foreground font-black scale-105",
              consolidation: "bg-[var(--mode-consolidation-start)] text-primary-foreground font-black scale-105",
            }[mId];

            return (
              <button
                type="button"
                key={mId}
                onClick={() => setActiveMode(mId)}
                aria-pressed={isSelected}
                className={`relative flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-500 ease-out cursor-pointer ${
                  isSelected ? `${activeColorStyles} shadow-sm` : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {details.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 2. Oversized timer display (Stripped bare of boxes) */}
      <div className="flex flex-col items-center justify-center py-4 my-2 select-none">
        <time className="typography-timer font-serif text-[84px] sm:text-[96px] text-primary tracking-tighter leading-none animate-fade-in transition-all">
          {formatDuration(MODES[activeMode].duration)}
        </time>
        <span className="typography-utility uppercase text-xs tracking-widest text-accent mt-2 animate-pulse">
          {presetDetails[activeMode].meta}
        </span>
      </div>

      {/* 3. Evolve the Ambient Soundscape Matrix (Borderless line art grid) */}
      <div className="w-full space-y-4 pt-4 border-t border-dashed border-border/40">
        <span className="typography-utility uppercase text-xs tracking-widest text-muted-foreground block text-center">
          {t("timer.sounds.ambient_title") || "Ambient Soundscape"}
        </span>
        <div className="flex justify-center gap-8 items-center max-w-sm mx-auto">
          {ambientOptions.map((option) => {
            const Icon = option.icon;
            const isActive = ambientSound === option.id;

            // Brand soft color glow matching active preset
            const glowColors = {
              napuccino:
                "text-[var(--mode-napuccino-start)] drop-shadow-[0_0_8px_var(--mode-napuccino-glow)] font-extrabold opacity-100",
              powernap:
                "text-[var(--mode-powernap-start)] drop-shadow-[0_0_8px_var(--mode-powernap-glow)] font-extrabold opacity-100",
              consolidation:
                "text-[var(--mode-consolidation-start)] drop-shadow-[0_0_8px_var(--mode-consolidation-glow)] font-extrabold opacity-100",
            }[activeMode];

            return (
              <button
                type="button"
                key={option.id}
                onClick={() => setAmbientSound(option.id)}
                className={`flex flex-col items-center gap-2 cursor-pointer transition-all duration-500 ease-out border-0 bg-transparent p-2 hover:scale-110 ${
                  isActive ? glowColors : "text-muted-foreground hover:text-foreground opacity-50"
                }`}
              >
                <Icon className="h-6 w-6 stroke-[1.2]" />
                <span className="text-[10px] font-semibold tracking-wider uppercase">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Elegant, borderless wake-up signal switcher */}
      <div className="w-full space-y-3 pb-4">
        <span className="typography-utility uppercase text-xs tracking-widest text-muted-foreground block text-center">
          {t("timer.sounds.alarm_title") || "Wake-up Signal"}
        </span>
        <div className="flex justify-center gap-4 flex-wrap items-center">
          {alarmOptions.map((option) => {
            const isActive = alarmSound === option.id;

            const activeStyles = {
              napuccino:
                "text-[var(--mode-napuccino-start)] font-black decoration-2 underline underline-offset-4 decoration-[var(--mode-napuccino-start)]/40",
              powernap:
                "text-[var(--mode-powernap-start)] font-black decoration-2 underline underline-offset-4 decoration-[var(--mode-powernap-start)]/40",
              consolidation:
                "text-[var(--mode-consolidation-start)] font-black decoration-2 underline underline-offset-4 decoration-[var(--mode-consolidation-start)]/40",
            }[activeMode];

            return (
              <button
                type="button"
                key={option.id}
                onClick={() => {
                  setAlarmSound(option.id);
                  previewAlarmSound(option.id);
                }}
                className={`text-[11px] font-semibold uppercase tracking-wider cursor-pointer border-0 bg-transparent py-1 px-2.5 transition-all duration-300 ${
                  isActive ? activeStyles : "text-muted-foreground hover:text-foreground opacity-60"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Primary CTA Trigger - Large, rounded-full, high-comfort pill */}
      <button
        type="button"
        onClick={handleStart}
        className="w-full py-4.5 px-8 bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest transition-all duration-500 ease-out active:scale-95 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg cursor-pointer mt-4"
      >
        {`(( ${t("timer.idle.initiate") || "Begin Drift"} ))`}
      </button>
    </section>
  );
}
