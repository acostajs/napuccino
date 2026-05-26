import { BookOpen, Coffee, Moon, Sun, Timer } from "lucide-react";
import type React from "react";

type NavbarProps = {
  activeTab: "home" | "timer" | "science";
  setActiveTab: (tab: "home" | "timer" | "science") => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export function Navbar({ activeTab, setActiveTab, theme, toggleTheme }: NavbarProps): React.ReactElement {
  const tabs = [
    { id: "home" as const, label: "Home", icon: Coffee },
    { id: "timer" as const, label: "Nap Timer", icon: Timer },
    { id: "science" as const, label: "Science", icon: BookOpen },
  ];

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
              <span className="logo-brand-name">Napuccino</span>
              <span className="logo-sub-tag">Coffee Nap Optimizer</span>
            </div>
          </button>

          {/* Theme Toggle (Mobile Only) */}
          <div className="md:hidden flex items-center">
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

        {/* Theme Toggle (Desktop Only) */}
        <div className="hidden md:flex items-center gap-2">
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
