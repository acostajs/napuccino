import React from "react";
import { Volume2, VolumeX, Sparkles, Square } from "lucide-react";
import { SoundSelector } from "./SoundSelector";
import { MODES, type NapMode } from "../lib/modes";
import type { AmbientSound, AlarmSound } from "../hooks/useAudioEngine";

type SleepViewProps = {
  activeMode: NapMode;
  sleepTimeLeft: number;
  formatTime: (seconds: number) => string;
  progressPercent: number;
  ambientSound: AmbientSound;
  setAmbientSound: (sound: AmbientSound) => void;
  alarmSound: AlarmSound;
  setAlarmSound: (sound: AlarmSound) => void;
  previewAlarmSound: (sound: AlarmSound) => void;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  handleStop: () => void;
};

export function SleepView({
  activeMode,
  sleepTimeLeft,
  formatTime,
  progressPercent,
  ambientSound,
  setAmbientSound,
  alarmSound,
  setAlarmSound,
  previewAlarmSound,
  isMuted,
  setIsMuted,
  handleStop,
}: SleepViewProps): React.ReactElement {
  const currentConfig = MODES[activeMode];

  const transitionOptions = [
    { id: "silence" as const, label: "Silence" },
    { id: "cafe" as const, label: "Cozy Cafe" },
    { id: "rain" as const, label: "Gentle Rain" },
    { id: "white" as const, label: "Pink Noise" },
  ];

  const alarmOptions = [
    { id: "silence" as const, label: "Silence" },
    { id: "harp" as const, label: "Harp Arp" },
    { id: "bells" as const, label: "Cozy Bells" },
    { id: "forest" as const, label: "Forest Birds" },
  ];

  return (
    <section className="sleep-view">
      <div className="sleep-header">
        <h2 className="sleep-title">{currentConfig.title} Active</h2>
        <p className="sleep-desc">
          Adenosine clearance cycle currently in progress. Rest comfortably.
        </p>
      </div>

      <figure className="sleep-circular-progress">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle cx="112" cy="112" r="100" className="svg-progress-track" strokeWidth="8" />
          <circle
            cx="112"
            cy="112"
            r="100"
            className="svg-progress-bar"
            strokeWidth="8"
            strokeDasharray="628"
            strokeDashoffset={628 - (628 * progressPercent) / 100}
            strokeLinecap="round"
          />
        </svg>

        <div className="timer-time-display">
          <time className="text-4xl font-extrabold tracking-tight text-foreground">
            {formatTime(sleepTimeLeft)}
          </time>
          <figcaption className="time-label-accent">Napping...</figcaption>
        </div>
      </figure>

      <div className="sleep-sound-section">
        <div className="sound-header">
          <span className="sound-title-box">
            <Volume2 className="h-4 w-4" />
            Sleep Sound Machine
          </span>

          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className={`p-1.5 rounded-lg border transition-all ${
              isMuted ? "sound-mute-btn-active" : "sound-mute-btn"
            }`}
            title={isMuted ? "Unmute sounds" : "Mute sounds"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>

        <SoundSelector
          title="Ambient Sound"
          icon={null}
          activeId={ambientSound}
          options={transitionOptions}
          onSelect={setAmbientSound}
        />
      </div>

      {/* Wake-Up Alarm Selector inside Sleep View */}
      <div className="w-full space-y-2.5 pt-2">
        <SoundSelector
          title="Wake-Up Alarm (Audition on tap)"
          icon={<Sparkles className="h-4 w-4 text-accent animate-pulse" />}
          activeId={alarmSound}
          options={alarmOptions}
          onSelect={setAlarmSound}
          onPreview={previewAlarmSound}
        />
      </div>

      <button onClick={handleStop} className="cancel-nap-btn">
        <Square className="h-4.5 w-4.5 fill-current" />
        Cancel Nap Loop
      </button>
    </section>
  );
}
