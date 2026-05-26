import { Play } from "lucide-react";
import type React from "react";
import { MODES, type NapMode } from "../lib/modes";

type IdleViewProps = {
  activeMode: NapMode;
  setActiveMode: (mode: NapMode) => void;
  handleStart: () => void;
};

export function IdleView({ activeMode, setActiveMode, handleStart }: IdleViewProps): React.ReactElement {
  return (
    <section className="idle-view">
      <div className="idle-header">
        <h2 className="idle-title">Set Your Sleep Wave</h2>
        <p className="idle-desc">Select your locked scientific target block. Make sure to prepare your coffee.</p>
      </div>

      <ul className="idle-modes-list">
        {(Object.keys(MODES) as NapMode[]).map((mId) => {
          const config = MODES[mId];
          const Icon = config.icon;
          const isSelected = activeMode === mId;
          return (
            <li key={mId}>
              <button
                type="button"
                onClick={() => setActiveMode(mId)}
                className={`idle-mode-option ${isSelected ? "idle-mode-option-active" : ""}`}
              >
                <div className={`idle-mode-icon-box bg-gradient-to-r ${config.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="idle-mode-info">
                  <div className="idle-mode-header">
                    <span className="idle-mode-title">{config.title}</span>
                    <span className="idle-mode-duration">{config.duration / 60}m</span>
                  </div>
                  <span className="idle-mode-desc">{config.description}</span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <button type="button" onClick={handleStart} className="primary-btn w-full justify-center py-4">
        <Play className="h-5 w-5 fill-current" />
        Initiate Countdown
      </button>
    </section>
  );
}
