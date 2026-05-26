import { Coffee } from "lucide-react";
import type React from "react";
import { useI18n } from "../../lib/i18n";
import type { NapMode } from "../../lib/modes";

type AlarmViewProps = {
  activeMode: NapMode;
  handleStop: () => void;
};

const alarmViewBgColors = {
  napuccino: "bg-[var(--mode-napuccino-start)]/5",
  powernap: "bg-[var(--mode-powernap-start)]/5",
  consolidation: "bg-[var(--mode-consolidation-start)]/5",
};

export function AlarmView({ activeMode, handleStop }: AlarmViewProps): React.ReactElement {
  const { t } = useI18n();
  return (
    <section
      className={`space-y-8 flex flex-col items-center p-8 rounded-3xl transition-colors duration-500 ${alarmViewBgColors[activeMode]}`}
    >
      <div className="h-20 w-20 rounded-full border border-accent/25 bg-accent/15 text-accent flex items-center justify-center shadow-lg shadow-accent/20">
        <Coffee className="h-10 w-10 animate-pulse" />
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight text-foreground font-sans">{t("timer.alarm.title")}</h2>
        <p className="text-xs text-muted-foreground font-bold max-w-xs leading-relaxed">{t("timer.alarm.desc")}</p>
      </div>

      <button
        type="button"
        onClick={handleStop}
        className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground font-black text-base px-6 py-4 transition-all duration-500 ease-out border border-transparent rounded-2xl shadow-md hover:-translate-y-0.5 hover:shadow-lg"
      >
        {t("timer.alarm.action")}
      </button>
    </section>
  );
}
