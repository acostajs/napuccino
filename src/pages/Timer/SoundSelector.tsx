import type React from "react";

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
      <span className="flex items-center justify-center gap-1.5 text-xs font-black text-foreground uppercase tracking-wider">
        {icon}
        {title}
      </span>
      <ul className="grid grid-cols-4 gap-2">
        {options.map((sound) => {
          const isActive = activeId === sound.id;
          return (
            <li key={sound.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(sound.id);
                  if (onPreview) {
                    onPreview(sound.id);
                  }
                }}
                aria-pressed={isActive}
                className={`w-full border border-border py-2.5 text-xs font-bold transition-all duration-500 ease-out bg-card/60 text-muted-foreground hover:bg-secondary/50 rounded-xl ${isActive ? "bg-primary text-primary-foreground border border-transparent shadow-xs hover:bg-primary" : ""}`}
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
