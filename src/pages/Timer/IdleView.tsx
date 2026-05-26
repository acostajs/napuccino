import { Play } from "lucide-react";
import type React from "react";
import { useI18n } from "../../lib/i18n";
import { MODES, type NapMode } from "../../lib/modes";

type IdleViewProps = {
  activeMode: NapMode;
  setActiveMode: (mode: NapMode) => void;
  handleStart: () => void;
};

const activeOptionGradients = {
  napuccino:
    "bg-gradient-to-r from-[var(--mode-napuccino-start)] to-[var(--mode-napuccino-end)] text-primary border-transparent",
  powernap:
    "bg-gradient-to-r from-[var(--mode-powernap-start)] to-[var(--mode-powernap-end)] text-primary border-transparent",
  consolidation:
    "bg-gradient-to-r from-[var(--mode-consolidation-start)] to-[var(--mode-consolidation-end)] text-primary border-transparent",
};

export function IdleView({ activeMode, setActiveMode, handleStart }: IdleViewProps): React.ReactElement {
  const { t } = useI18n();
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-black tracking-tight text-foreground font-serif">{t("timer.idle.title")}</h2>
        <p className="text-xs text-muted-foreground font-bold max-w-sm mx-auto">{t("timer.idle.desc")}</p>
      </div>

      <ul className="flex flex-col gap-4">
        {(Object.keys(MODES) as NapMode[]).map((mId) => {
          const config = MODES[mId];
          const Icon = config.icon;
          const isSelected = activeMode === mId;
          return (
            <li key={mId}>
              <button
                type="button"
                onClick={() => setActiveMode(mId)}
                aria-pressed={isSelected}
                className={`w-full flex items-center gap-4 border border-border/30 p-4 text-left transition-all duration-500 ease-out bg-card hover:bg-secondary/40 hover:scale-[1.01] rounded-2xl shadow-sm ${isSelected ? `${activeOptionGradients[mId]} shadow-md` : ""}`}
              >
                <div
                  className={`p-3 border border-border/30 rounded-xl shadow-xs transition-colors duration-300 ${isSelected ? "bg-primary text-white border-transparent" : "bg-secondary text-primary"}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-black text-foreground">{t(`modes.${mId}.title`)}</span>
                    <span className="text-sm font-black text-primary">
                      {config.duration / 60}
                      {t("timer.idle.minute_short")}
                    </span>
                  </div>
                  <span
                    className={`block text-xs mt-0.5 leading-relaxed font-semibold ${isSelected ? "text-inherit opacity-85" : "text-muted-foreground"}`}
                  >
                    {t(`modes.${mId}.description`)}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={handleStart}
        className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 transition-all duration-500 ease-out active:scale-95 border border-transparent rounded-2xl shadow-sm hover:-translate-y-0.5 hover:shadow-md w-full justify-center py-4"
      >
        <Play className="h-5 w-5 fill-current" />
        {t("timer.idle.initiate")}
      </button>
    </section>
  );
}
