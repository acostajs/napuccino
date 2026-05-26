import { AlertCircle, FastForward, Sparkles, Square, Volume2 } from "lucide-react";
import type React from "react";
import type { AlarmSound, AmbientSound } from "../hooks/useAudioEngine";
import { t } from "../lib/i18n";
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
    { id: "silence" as const, label: t("sounds.silence") },
    { id: "cafe" as const, label: t("sounds.cafe") },
    { id: "rain" as const, label: t("sounds.rain") },
    { id: "white" as const, label: t("sounds.white") },
  ];

  const alarmOptions = [
    { id: "silence" as const, label: t("sounds.silence") },
    { id: "harp" as const, label: t("sounds.harp") },
    { id: "bells" as const, label: t("sounds.bells") },
    { id: "forest" as const, label: t("sounds.forest") },
  ];

  return (
    <section className="pre-view">
      <div className="pre-header">
        <span className="pre-badge">
          <AlertCircle className="h-3 w-3" />
          {t("timer.pre.badge")}
        </span>
        <h2 className="pre-title">{t("timer.pre.title")}</h2>
        <p className="pre-desc">{t("timer.pre.desc")}</p>
      </div>

      <figure className="breathing-circle-wrapper">
        <div className="breathing-bg-ring" />
        <div className="breathing-dashed-ring" />

        <div className="timer-time-display">
          <time className="text-3xl font-extrabold text-foreground">{formatTime(preTimeLeft)}</time>
          <figcaption className="time-label">{t("timer.pre.breathe_rest")}</figcaption>
        </div>
      </figure>

      {/* Transition Sound & Alarm Selector Panel */}
      <div className="sound-selector-panel">
        <SoundSelector
          title={t("timer.sounds.transition_title")}
          icon={<Volume2 className="h-4 w-4" />}
          activeId={ambientSound}
          options={transitionOptions}
          onSelect={setAmbientSound}
        />

        <SoundSelector
          title={t("timer.sounds.alarm_title")}
          icon={<Sparkles className="h-4 w-4 text-accent animate-pulse" />}
          activeId={alarmSound}
          options={alarmOptions}
          onSelect={setAlarmSound}
          onPreview={previewAlarmSound}
        />
      </div>

      <div className="timer-controls">
        <button type="button" onClick={handleSkipPre} className="skip-pre-btn">
          {t("timer.pre.skip")}
          <FastForward className="h-4 w-4" />
        </button>
        <button type="button" onClick={handleStop} className="stop-timer-btn" aria-label="Stop Timer">
          <Square className="h-4 w-4 fill-current" />
        </button>
      </div>
    </section>
  );
}
