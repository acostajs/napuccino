import { Coffee } from "lucide-react";
import type React from "react";

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
        <h2 className="alarm-title">Time to Conquer!</h2>
        <p className="alarm-desc">
          Your 20 minutes is up. The caffeine has successfully crossed into your brain receptors. Rise and shine!
        </p>
      </div>

      <button type="button" onClick={handleStop} className="alarm-action-btn">
        Rise and Grind
      </button>
    </section>
  );
}
