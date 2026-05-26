import type React from "react";
import { useEffect, useState } from "react";
import { HomePage } from "./components/HomePage";
import { Navbar } from "./components/Navbar";
import { SciencePage } from "./components/SciencePage";
import { TimerPage } from "./components/TimerPage";
import { I18nProvider, useI18n } from "./lib/i18n";
import "./index.css";

function AppContent(): React.ReactElement {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<"home" | "timer" | "science">("home");

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("napuccino-theme");
      return savedTheme === "light" ? "light" : "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("napuccino-theme", theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="app-container">
      <div className="bg-radial-highlight" />

      <div className="app-content-wrapper">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} toggleTheme={toggleTheme} />

        <main className="app-main">
          {activeTab === "home" && <HomePage setActiveTab={setActiveTab} />}
          {activeTab === "timer" && <TimerPage />}
          {activeTab === "science" && <SciencePage />}
        </main>
      </div>

      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-text">{t("footer.copyright", { year: new Date().getFullYear().toString() })}</p>
          <div className="footer-links">
            <button type="button" className="footer-link" onClick={() => setActiveTab("science")}>
              {t("footer.science")}
            </button>
            <span>•</span>
            <button type="button" className="footer-link" onClick={() => setActiveTab("timer")}>
              {t("footer.naps")}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function App(): React.ReactElement {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

export default App;
