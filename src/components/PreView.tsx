import { AlertCircle, FastForward, Sparkles, Square, Volume2 } from "lucide-react";
import type React from "react";
import type { AlarmSound, AmbientSound } from "../hooks/useAudioEngine";
import { SoundSelector } from "./SoundSelector";

type PreViewProps = {
  preTimeLeft: number;
  formatTime: (seconds: number) => string;
  ambientSound: AmbientSound;
  setAmbientSound: (sound: AmbientSound) => void;
  alarmSound: AlarmSound;
  setAlarmSound: (sound: AlarmSound) => void;
  previewAlarmSound: (sound: AlarmSound) => void;
  handleSkipPre: () => void;
  handleStop: () => void;
};

export function PreView({
  preTimeLeft,
  formatTime,
  ambientSound,
  setAmbientSound,
  alarmSound,
  setAlarmSound,
  previewAlarmSound,
  handleSkipPre,
  handleStop,
}: PreViewProps): React.ReactElement {
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
    <section className="pre-view">
      <div className="pre-header">
        <span className="pre-badge">
          <AlertCircle className="h-3 w-3" />
          Transition Wave
        </span>
        <h2 className="pre-title">Prepare to Fall Asleep</h2>
        <p className="pre-desc">
          Drink your coffee now if you haven't! Follow the breathing guide below to calm your mind.
        </p>
      </div>

      <figure className="breathing-circle-wrapper">
        <div className="breathing-bg-ring" />
        <div className="breathing-dashed-ring" />

        <div className="timer-time-display">
          <time className="text-3xl font-extrabold text-foreground">{formatTime(preTimeLeft)}</time>
          <figcaption className="time-label">Breathe & Rest</figcaption>
        </div>
      </figure>

      {/* Transition Sound & Alarm Selector Panel */}
      <div className="sound-selector-panel">
        <SoundSelector
          title="Transition Sound (Active Now)"
          icon={<Volume2 className="h-4 w-4" />}
          activeId={ambientSound}
          options={transitionOptions}
          onSelect={setAmbientSound}
        />

        <SoundSelector
          title="Wake-Up Alarm (Audition on tap)"
          icon={<Sparkles className="h-4 w-4 text-accent animate-pulse" />}
          activeId={alarmSound}
          options={alarmOptions}
          onSelect={setAlarmSound}
          onPreview={previewAlarmSound}
        />
      </div>

      <div className="timer-controls">
        <button type="button" onClick={handleSkipPre} className="skip-pre-btn">
          Skip Pre-Countdown
          <FastForward className="h-4 w-4" />
        </button>
        <button type="button" onClick={handleStop} className="stop-timer-btn" aria-label="Stop Timer">
          <Square className="h-4 w-4 fill-current" />
        </button>
      </div>
    </section>
  );
}
