import React from "react";

type SoundItem<T> = {
  id: T;
  label: string;
};

type SoundSelectorProps<T extends string> = {
  title: string;
  icon: React.ReactNode;
  activeId: T;
  options: SoundItem<T>[];
  onSelect: (id: T) => void;
  onPreview?: (id: T) => void;
};

export function SoundSelector<T extends string>({
  title,
  icon,
  activeId,
  options,
  onSelect,
  onPreview,
}: SoundSelectorProps<T>): React.ReactElement {
  return (
    <div className="space-y-2.5">
      <span className="sound-section-label">
        {icon}
        {title}
      </span>
      <ul className="grid grid-cols-4 gap-2">
        {options.map((sound) => {
          const isActive = activeId === sound.id;
          return (
            <li key={sound.id}>
              <button
                onClick={() => {
                  onSelect(sound.id);
                  if (onPreview) {
                    onPreview(sound.id);
                  }
                }}
                className={`sound-option-btn ${isActive ? "sound-option-btn-active" : ""}`}
              >
                {sound.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
