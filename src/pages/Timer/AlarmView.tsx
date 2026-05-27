import { Coffee } from "lucide-react";
import type React from "react";
import { useI18n } from "../../lib/i18n";
import type { NapMode } from "../../lib/modes";

type AlarmViewProps = {
  activeMode: NapMode;
  handleStop: () => void;
};

export function AlarmView({ activeMode, handleStop }: AlarmViewProps): React.ReactElement {
  const { t } = useI18n();

  const presetNames = t(`timer.alarm.mode_label.${activeMode}`);

  return (
    <section className="min-h-[50vh] flex flex-col items-center justify-center select-none text-center max-w-md mx-auto space-y-12">
      <figure className="flex flex-col items-center gap-4">
        <span className="h-20 w-20 rounded-full border border-accent/30 bg-accent/10 text-accent flex items-center justify-center shadow-lg shadow-accent/15 animate-bounce">
          <Coffee className="h-10 w-10 stroke-[1.2]" />
        </span>
        <span className="typography-utility uppercase text-xs tracking-widest text-accent font-bold mt-2">
          {presetNames}
        </span>
      </figure>

      <header className="space-y-3">
        <h2 className="typography-display text-primary">{t("timer.alarm.title")}</h2>
        <p className="typography-body text-muted-foreground font-semibold max-w-sm mx-auto">{t("timer.alarm.desc")}</p>
      </header>

      <button
        type="button"
        onClick={handleStop}
        className="w-full py-5 px-8 bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest transition-all duration-500 ease-out active:scale-95 rounded-full shadow-lg hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
      >
        {`(( ${t("timer.alarm.action").toUpperCase()} ))`}
      </button>
    </section>
  );
}
