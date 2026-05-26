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

export function Navbar({ activeTab, setActiveTab, theme, toggleTheme }: NavbarProps): React.ReactElement {
  const { t, locale, setLocale } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "home" as const, label: t("nav.home"), icon: Coffee },
    { id: "timer" as const, label: t("nav.timer"), icon: Timer },
    { id: "science" as const, label: t("nav.science"), icon: BookOpen },
  ];

  const languages = [{ code: "en" as const }, { code: "es" as const }, { code: "fr" as const }];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
      if (desktopRef.current && !desktopRef.current.contains(event.target as Node)) {
        setDesktopOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Mobile top-row container / Desktop side-by-side logo */}
        <div className="flex w-full items-center justify-between md:w-auto">
          <button type="button" onClick={() => setActiveTab("home")} className="navbar-logo-btn group">
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
          <div className="md:hidden flex items-center gap-2">
            <div className="relative" ref={mobileRef}>
              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                className="theme-toggle-btn text-[13px] font-black tracking-tight text-foreground uppercase"
              >
                {locale}
              </button>

              {mobileOpen && (
                <ul
                  className="absolute right-0 mt-2 w-10 border-2 border-primary bg-card text-foreground shadow-[3px_3px_0px_0px_var(--primary)] z-50 overflow-hidden flex flex-col gap-1 p-1"
                  style={{ borderRadius: "12px 6px 10px 8px / 8px 10px 7px 11px" }}
                >
                  {languages.map((lang) => {
                    const isSelected = lang.code === locale;
                    return (
                      <li key={lang.code} className="w-full">
                        <button
                          type="button"
                          onClick={() => {
                            setLocale(lang.code);
                            setMobileOpen(false);
                          }}
                          className={`w-full h-8 flex items-center justify-center text-[11px] font-extrabold transition-all duration-150 uppercase border-2 border-transparent rounded-md ${
                            isSelected
                              ? "bg-primary text-primary-foreground font-black"
                              : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {lang.code}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

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
        <div className="hidden md:flex items-center gap-3">
          <div className="relative" ref={desktopRef}>
            <button
              type="button"
              onClick={() => setDesktopOpen((prev) => !prev)}
              className="theme-toggle-btn text-[13px] font-black tracking-tight text-foreground uppercase"
            >
              {locale}
            </button>

            {desktopOpen && (
              <ul
                className="absolute right-0 mt-2 w-10 border-2 border-primary bg-card text-foreground shadow-[3px_3px_0px_0px_var(--primary)] z-50 overflow-hidden flex flex-col gap-1 p-1"
                style={{ borderRadius: "12px 6px 10px 8px / 8px 10px 7px 11px" }}
              >
                {languages.map((lang) => {
                  const isSelected = lang.code === locale;
                  return (
                    <li key={lang.code} className="w-full">
                      <button
                        type="button"
                        onClick={() => {
                          setLocale(lang.code);
                          setDesktopOpen(false);
                        }}
                        className={`w-full h-8 flex items-center justify-center text-[11px] font-extrabold transition-all duration-150 uppercase border-2 border-transparent rounded-md ${
                          isSelected
                            ? "bg-primary text-primary-foreground font-black"
                            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {lang.code}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

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
