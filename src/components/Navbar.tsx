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
        className="theme-toggle-btn text-[13px] font-black tracking-tight text-foreground uppercase cursor-pointer"
      >
        {locale}
      </button>

      {isOpen && (
        <ul id={id} className="locale-dropdown outline-none">
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
                  className={`locale-option-btn ${isSelected ? "locale-option-btn-active" : ""}`}
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
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Mobile top-row container / Desktop side-by-side logo */}
        <div className="navbar-mobile-row">
          <button
            type="button"
            onClick={() => setActiveTab("home")}
            aria-label={t("nav.home")}
            className="navbar-logo-btn group"
          >
            <div className="logo-badge">
              <div className="absolute top-1.5 flex gap-0.5 justify-center w-full">
                <span className="logo-steam-line" style={{ animationDelay: "0.2s" }} />
                <span className="logo-steam-line" style={{ animationDelay: "0.8s" }} />
                <span className="logo-steam-line" style={{ animationDelay: "0.5s" }} />
              </div>
              <Coffee className="h-5 w-5 mt-1.5" />
            </div>
            <div className="text-left">
              <span className="logo-brand-name">{t("nav.brand")}</span>
              <span className="logo-sub-tag">{t("nav.sub")}</span>
            </div>
          </button>

          {/* Controls (Mobile Only) */}
          <div className="navbar-controls-mobile">
            <LocaleDropdown id="mobile-lang-popover" locale={locale} setLocale={setLocale} />

            <button type="button" onClick={toggleTheme} aria-label="Toggle Theme" className="theme-toggle-btn">
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-accent animate-spin" style={{ animationDuration: "12s" }} />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Centered navigation tabs */}
        <nav className="navbar-nav">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`navbar-tab-btn ${isActive ? "navbar-tab-btn-active" : ""}`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Controls (Desktop Only) */}
        <div className="navbar-controls-desktop">
          <LocaleDropdown id="desktop-lang-popover" locale={locale} setLocale={setLocale} />

          <button type="button" onClick={toggleTheme} aria-label="Toggle Theme" className="theme-toggle-btn">
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
