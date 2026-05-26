import { BookOpen, Coffee, Moon, Sun, Timer } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "../lib/i18n";

type NavbarProps = {
  activeTab: "home" | "timer" | "science";
  setActiveTab: (tab: "home" | "timer" | "science") => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
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
    function handleClickOutside(event: MouseEvent) {
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

export function Navbar({ activeTab, setActiveTab, theme, toggleTheme }: NavbarProps): React.ReactElement {
  const { t, locale, setLocale } = useI18n();

  const tabs = [
    { id: "home" as const, label: t("nav.home"), icon: Coffee },
    { id: "timer" as const, label: t("nav.timer"), icon: Timer },
    { id: "science" as const, label: t("nav.science"), icon: BookOpen },
  ];

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-5xl">
      <div className="flex flex-col h-auto gap-3 bg-card px-4 py-3 md:flex-row md:h-16 md:py-0 md:px-6 md:justify-between md:items-center md:gap-0 border border-border/30 transition-all duration-500 ease-out rounded-2xl shadow-sm md:rounded-full">
        {/* Mobile top-row container / Desktop side-by-side logo */}
        <div className="flex w-full items-center justify-between md:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab("home")}
            aria-label={t("nav.home")}
            className="flex items-center gap-3 transition-all duration-500 ease-out hover:opacity-85 hover:scale-105 group"
          >
            <div className="relative flex h-10 w-10 items-center justify-center border border-border text-primary overflow-hidden rounded-xl bg-secondary text-white">
              <div className="absolute top-1.5 flex gap-0.5 justify-center w-full">
                <span className="w-0.5 h-2 bg-primary/60 rounded-full" style={{ animationDelay: "0.2s" }} />
                <span className="w-0.5 h-2 bg-primary/60 rounded-full" style={{ animationDelay: "0.8s" }} />
                <span className="w-0.5 h-2 bg-primary/60 rounded-full" style={{ animationDelay: "0.5s" }} />
              </div>
              <Coffee className="h-5 w-5 mt-1.5" />
            </div>
            <div className="text-left">
              <span className="block text-xl font-black tracking-tight text-accent font-serif">{t("nav.brand")}</span>
              <span className="block text-xs font-bold text-muted-foreground -mt-1 tracking-wider uppercase">
                {t("nav.sub")}
              </span>
            </div>
          </button>

          {/* Controls (Mobile Only) */}
          <div className="flex items-center gap-2 md:hidden">
            <LocaleDropdown id="mobile-lang-popover" locale={locale} setLocale={setLocale} />

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="flex h-10 w-10 items-center justify-center border border-border bg-card text-foreground transition-all duration-500 ease-out hover:bg-secondary hover:scale-105 active:scale-95 rounded-xl"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-accent animate-spin" style={{ animationDuration: "12s" }} />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Centered navigation tabs */}
        <nav className="flex items-center justify-around w-full md:w-auto gap-1 rounded-xl bg-secondary/80 p-0.5 border border-border/30">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center justify-center flex-grow md:flex-grow-0 gap-2 rounded-lg px-2 sm:px-4 py-1.5 text-xs sm:text-sm font-extrabold transition-all duration-500 ease-out text-muted-foreground hover:text-foreground ${isActive ? "text-primary bg-primary/15 border border-primary/10 rounded-lg shadow-xs dark:bg-accent/15 dark:border-accent/10 dark:text-accent" : ""}`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Controls (Desktop Only) */}
        <div className="hidden md:flex items-center gap-3">
          <LocaleDropdown id="desktop-lang-popover" locale={locale} setLocale={setLocale} />

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-10 w-10 items-center justify-center border border-border bg-card text-foreground transition-all duration-500 ease-out hover:bg-secondary hover:scale-105 active:scale-95 rounded-xl"
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
