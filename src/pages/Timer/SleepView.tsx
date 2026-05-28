import { CloudRain, Coffee, VolumeX, Wind } from "lucide-react";
import type React from "react";
import type { AmbientSound } from "../../hooks/useAudioEngine";
import { useI18n } from "../../lib/i18n";
import type { NapMode } from "../../lib/modes";

type SleepViewProps = {
  activeMode: NapMode;
  sleepTimeLeft: number;
  formatTime: (seconds: number) => string;
  handleStop: () => void;
  ambientSound: AmbientSound;
  setAmbientSound: (sound: AmbientSound) => void;
};

export function SleepView({
  activeMode,
  sleepTimeLeft,
  formatTime,
  handleStop,
  ambientSound,
  setAmbientSound,
}: SleepViewProps): React.ReactElement {
  const { t } = useI18n();

  const presetNames = t(`timer.sleep.mode_label.${activeMode}`);

  const ambientOptions = [
    { id: "silence" as const, label: t("sounds.silence") || "Silence", icon: VolumeX },
    { id: "cafe" as const, label: t("sounds.cafe") || "Cafe", icon: Coffee },
    { id: "rain" as const, label: t("sounds.rain") || "Rain", icon: CloudRain },
    { id: "white" as const, label: t("sounds.white") || "Wind", icon: Wind },
  ];

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center select-none text-center">
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

      <nav
        aria-label="Ambient sound controls"
        className="mt-12 flex items-center justify-center gap-4 opacity-15 hover:opacity-75 focus-within:opacity-75 transition-opacity duration-700"
      >
        {ambientOptions.map((option) => {
          const Icon = option.icon;
          const isActive = ambientSound === option.id;
          return (
            <button
              type="button"
              key={option.id}
              onClick={() => setAmbientSound(option.id)}
              aria-label={option.label}
              aria-pressed={isActive}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-border/10 bg-secondary/20 transition-all duration-500 cursor-pointer ${
                isActive
                  ? "text-accent border-accent/40 bg-accent/5 font-black scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">{option.label}</span>
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={handleStop}
        className="mt-12 text-muted-foreground opacity-15 hover:opacity-60 focus:opacity-60 transition-opacity duration-500 text-[10px] font-bold uppercase tracking-widest cursor-pointer border border-border/10 rounded-full px-4 py-1.5 bg-secondary/10"
      >
        {t("timer.sleep.cancel") || "Cancel Rest"}
      </button>
    </section>
  );
}
