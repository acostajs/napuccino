import { BookOpen, Moon, Sun, Timer } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { TimerState } from "../hooks/useAudioEngine";
import { useI18n } from "../lib/i18n";

type NavbarProps = {
  activeTab: "home" | "timer" | "science";
  setActiveTab: (tab: "home" | "timer" | "science") => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  timerState?: TimerState;
};

type LocaleDropdownProps = {
  id: string;
  locale: "en" | "es" | "fr";
  setLocale: (code: "en" | "es" | "fr") => void;
};

function LocaleDropdown({ id, locale, setLocale }: LocaleDropdownProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const languages = [{ code: "en" as const }, { code: "es" as const }, { code: "fr" as const }];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        id={`${id}-trigger`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center border border-border bg-card text-foreground transition-all duration-500 ease-out hover:bg-secondary hover:scale-105 active:scale-95 rounded-xl text-xs font-black tracking-tight uppercase cursor-pointer"
      >
        {locale}
      </button>

      {isOpen && (
        <ul
          id={id}
          className="absolute right-0 mt-2 w-10 border border-border bg-card text-foreground z-50 overflow-hidden flex flex-col gap-1 p-1 shadow-sm rounded-xl outline-none"
        >
          {languages.map((lang) => {
            const isSelected = lang.code === locale;
            return (
              <li key={lang.code} className="w-full">
                <button
                  type="button"
                  onClick={() => {
                    setLocale(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full h-8 flex items-center justify-center text-xs font-extrabold transition-all duration-500 ease-out uppercase border-2 border-transparent rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground ${isSelected ? "bg-primary text-primary-foreground font-black hover:bg-primary" : ""}`}
                >
                  {lang.code}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function Navbar({ activeTab, setActiveTab, theme, toggleTheme, timerState }: NavbarProps): React.ReactElement {
  const { t, locale, setLocale } = useI18n();

  const tabs = [
    { id: "timer" as const, label: t("nav.timer"), icon: Timer },
    { id: "science" as const, label: t("nav.science"), icon: BookOpen },
  ];

  const renderStateBadge = () => {
    if (!timerState || timerState === "idle") return null;

    const activeLabel = {
      pre: t("timer.pre.badge") || "Breathing",
      sleep: t("timer.sleep.napping") || "Napping",
      alarm: t("timer.alarm.title") || "Wake Up!",
    }[timerState];

    const activeColorClasses = {
      pre: "bg-accent/10 text-accent border-accent/20",
      sleep: "bg-primary/10 text-primary border-primary/20",
      alarm: "bg-destructive/10 text-destructive border-destructive/20 animate-pulse",
    }[timerState];

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-500 ease-out ${activeColorClasses}`}
      >
        {timerState === "pre" && <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />}
        {timerState === "sleep" && <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
        {timerState === "alarm" && <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-ping" />}
        {activeLabel}
      </span>
    );
  };

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-5xl">
      <div className="flex h-16 w-full items-center justify-between bg-card/85 backdrop-blur-md px-6 transition-all duration-500 ease-out rounded-full border border-transparent">
        {/* Left: Wordmark Logo */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("home")}
            aria-label={t("nav.brand")}
            className={`font-serif text-xl font-medium tracking-tight transition-all duration-500 ease-out cursor-pointer ${activeTab === "home" ? "text-accent scale-105" : "text-primary hover:opacity-85"}`}
          >
            {t("nav.brand")}
          </button>
        </div>

        {/* Center: Tabs or State Badge */}
        <div className="flex items-center justify-center flex-grow mx-4">
          {timerState && timerState !== "idle" ? (
            renderStateBadge()
          ) : (
            <nav className="flex items-center gap-1 rounded-full bg-secondary/80 p-0.5 border border-border/10">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center justify-center gap-1.5 rounded-full px-4 py-1 text-xs font-semibold tracking-wider transition-all duration-500 ease-out text-muted-foreground hover:text-foreground cursor-pointer ${isActive ? "text-primary bg-primary/10 border border-primary/5 rounded-full shadow-xs" : "border border-transparent"}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <LocaleDropdown id="navbar-lang-popover" locale={locale} setLocale={setLocale} />

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-10 w-10 items-center justify-center border border-border bg-card text-foreground transition-all duration-500 ease-out hover:bg-secondary hover:scale-105 active:scale-95 rounded-xl cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-accent animate-spin" style={{ animationDuration: "12s" }} />
            ) : (
              <Moon className="h-5 w-5 text-primary" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
