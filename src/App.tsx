import type React from "react";
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { I18nProvider, useI18n } from "./lib/i18n";
import { HomePage } from "./pages/Home/HomePage";
import { SciencePage } from "./pages/Science/SciencePage";
import { TimerPage } from "./pages/Timer/TimerPage";
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

  const handleTabChange = (tab: "home" | "timer" | "science"): void => {
    if (!("startViewTransition" in document)) {
      setActiveTab(tab);
      return;
    }
    const doc = document as unknown as {
      startViewTransition: (cb: () => void) => void;
    };
    doc.startViewTransition(() => {
      setActiveTab(tab);
    });
  };

  return (
    <div className="app-container">
      <div className="bg-radial-highlight" />

      <div className="app-content-wrapper">
        <Navbar activeTab={activeTab} setActiveTab={handleTabChange} theme={theme} toggleTheme={toggleTheme} />

        <main className="app-main">
          {activeTab === "home" && <HomePage setActiveTab={handleTabChange} />}
          {activeTab === "timer" && <TimerPage />}
          {activeTab === "science" && <SciencePage />}
        </main>
      </div>

      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-text">{t("footer.copyright", { year: new Date().getFullYear().toString() })}</p>
          <div className="footer-links">
            <button type="button" className="footer-link" onClick={() => handleTabChange("science")}>
              {t("footer.science")}
            </button>
            <span>•</span>
            <button type="button" className="footer-link" onClick={() => handleTabChange("timer")}>
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
