import { Sparkles, Square, Volume2, VolumeX } from "lucide-react";
import type React from "react";
import type { AlarmSound, AmbientSound } from "../../hooks/useAudioEngine";
import { useI18n } from "../../lib/i18n";
import type { NapMode } from "../../lib/modes";
import { SoundSelector } from "./SoundSelector";

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
  const { t } = useI18n();
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
    <section className="sleep-view">
      <div className="sleep-header">
        <h2 className="sleep-title">{t("timer.sleep.active", { mode: t(`modes.${activeMode}.title`) })}</h2>
        <p className="sleep-desc">{t("timer.sleep.desc")}</p>
      </div>

      <figure className="sleep-circular-progress">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <title>Nap progress indicator</title>
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
          <time className="timer-digits">{formatTime(sleepTimeLeft)}</time>
          <figcaption className="time-label-accent">{t("timer.sleep.napping")}</figcaption>
        </div>
      </figure>

      <div className="sleep-sound-section">
        <div className="sound-header">
          <span className="sound-title-box">
            <Volume2 className="h-4 w-4" />
            {t("timer.sleep.sound_machine")}
          </span>

          <button
            type="button"
            onClick={() => setIsMuted((prev) => !prev)}
            className={isMuted ? "sound-mute-btn-active" : "sound-mute-btn"}
            aria-label={isMuted ? t("timer.sleep.unmute") : t("timer.sleep.mute")}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>

        <SoundSelector
          title={t("timer.sounds.ambient_title")}
          icon={null}
          activeId={ambientSound}
          options={transitionOptions}
          onSelect={setAmbientSound}
        />
      </div>

      {/* Wake-Up Alarm Selector inside Sleep View */}
      <div className="sleep-alarm-box">
        <SoundSelector
          title={t("timer.sounds.alarm_title")}
          icon={<Sparkles className="h-4 w-4 text-accent animate-pulse" />}
          activeId={alarmSound}
          options={alarmOptions}
          onSelect={setAlarmSound}
          onPreview={previewAlarmSound}
        />
      </div>

      <button type="button" onClick={handleStop} className="cancel-nap-btn">
        <Square className="h-4.5 w-4.5 fill-current" />
        {t("timer.sleep.cancel")}
      </button>
    </section>
  );
}
