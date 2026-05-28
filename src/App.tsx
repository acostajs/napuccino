import type React from "react";
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { type AlarmSound, type AmbientSound, useAudioEngine } from "./hooks/useAudioEngine";
import { useNapTimer } from "./hooks/useNapTimer";
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
      try {
        const savedTheme = localStorage.getItem("napuccino-theme");
        return savedTheme === "light" ? "light" : "dark";
      } catch (_e) {
        // Silent fallback
      }
    }
    return "dark";
  });

  // Coordinator: Lift state so Navbar and background effects sync
  const {
    timerState,
    activeMode,
    preTimeLeft,
    sleepTimeLeft,
    testMode,
    setTestMode,
    setActiveMode,
    handleStart,
    handleStop,
    handleSkipPre,
  } = useNapTimer();

  const [ambientSound, setAmbientSound] = useState<AmbientSound>("silence");
  const [alarmSound, setAlarmSound] = useState<AlarmSound>("harp");

  const audioEngine = useAudioEngine({
    ambientSound,
    alarmSound,
    timerState,
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("napuccino-theme", theme);
    } catch (_e) {
      // Silent fallback
    }
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

  const stateBgClasses = {
    idle: "bg-background",
    pre: {
      napuccino: "bg-[var(--mode-napuccino-start)]/10",
      powernap: "bg-[var(--mode-powernap-start)]/10",
      consolidation: "bg-[var(--mode-consolidation-start)]/10",
    }[activeMode],
    sleep: "bg-[#0c0806] text-stone-300",
    alarm: {
      napuccino: "bg-[var(--mode-napuccino-start)]/20 animate-pulse",
      powernap: "bg-[var(--mode-powernap-start)]/20 animate-pulse",
      consolidation: "bg-[var(--mode-consolidation-start)]/20 animate-pulse",
    }[activeMode],
  }[timerState];

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-between overflow-x-hidden pb-12 transition-colors duration-1000 ease-out text-foreground relative ${stateBgClasses}`}
    >
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 w-full flex flex-col gap-6 pt-4 px-4 sm:px-6">
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          theme={theme}
          toggleTheme={toggleTheme}
          timerState={timerState}
        />

        <main className="w-full flex-grow">
          {activeTab === "home" && <HomePage setActiveTab={handleTabChange} setActiveMode={setActiveMode} />}
          {activeTab === "timer" && (
            <TimerPage
              timerState={timerState}
              activeMode={activeMode}
              preTimeLeft={preTimeLeft}
              sleepTimeLeft={sleepTimeLeft}
              testMode={testMode}
              setTestMode={setTestMode}
              setActiveMode={setActiveMode}
              handleStart={handleStart}
              handleStop={handleStop}
              handleSkipPre={handleSkipPre}
              ambientSound={ambientSound}
              setAmbientSound={setAmbientSound}
              alarmSound={alarmSound}
              setAlarmSound={setAlarmSound}
              previewAlarmSound={audioEngine.previewAlarmSound}
              initAudio={audioEngine.initAudio}
              stopAlarm={audioEngine.stopAlarm}
            />
          )}
          {activeTab === "science" && <SciencePage setActiveTab={handleTabChange} />}
        </main>
      </div>

      <footer
        className={`relative z-10 w-full max-w-5xl mx-auto px-6 mt-16 text-center transition-all duration-1000 ease-out ${
          timerState === "sleep" ? "opacity-0 pointer-events-none translate-y-4 scale-95" : "opacity-100"
        }`}
      >
        <div className="border-t-2 border-primary/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-bold tracking-wide uppercase">
            {t("footer.copyright", { year: new Date().getFullYear().toString() })}
          </p>
          <div className="flex gap-4 text-xs font-extrabold text-muted-foreground">
            <button
              type="button"
              className="hover:text-accent transition-colors cursor-pointer underline decoration-primary/30 underline-offset-4"
              onClick={() => handleTabChange("science")}
            >
              {t("footer.science")}
            </button>
            <span>•</span>
            <button
              type="button"
              className="hover:text-accent transition-colors cursor-pointer underline decoration-primary/30 underline-offset-4"
              onClick={() => handleTabChange("timer")}
            >
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
