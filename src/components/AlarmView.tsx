import { Coffee } from "lucide-react";
import type React from "react";
import { t } from "../lib/i18n";

type AlarmViewProps = {
  handleStop: () => void;
};

export function AlarmView({ handleStop }: AlarmViewProps): React.ReactElement {
  return (
    <section className="alarm-view">
      <div className="alarm-alert-icon">
        <Coffee className="h-10 w-10 animate-pulse" />
      </div>

      <div className="pre-header">
        <h2 className="alarm-title">{t("timer.alarm.title")}</h2>
        <p className="alarm-desc">{t("timer.alarm.desc")}</p>
      </div>

      <button type="button" onClick={handleStop} className="alarm-action-btn">
        {t("timer.alarm.action")}
      </button>
    </section>
  );
}
