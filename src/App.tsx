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
      const savedTheme = localStorage.getItem("napuccino-theme");
      return savedTheme === "light" ? "light" : "dark";
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
    progressPercent,
  } = useNapTimer();

  const [ambientSound, setAmbientSound] = useState<AmbientSound>("silence");
  const [alarmSound, setAlarmSound] = useState<AlarmSound>("harp");
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioEngine = useAudioEngine({
    isMuted,
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
    <div className="min-h-screen w-full flex flex-col justify-between overflow-x-hidden pb-12 transition-colors duration-500 bg-transparent text-foreground relative">
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
          {activeTab === "home" && <HomePage setActiveTab={handleTabChange} />}
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
              progressPercent={progressPercent}
              ambientSound={ambientSound}
              setAmbientSound={setAmbientSound}
              alarmSound={alarmSound}
              setAlarmSound={setAlarmSound}
              previewAlarmSound={audioEngine.previewAlarmSound}
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              initAudio={audioEngine.initAudio}
              stopAlarm={audioEngine.stopAlarm}
            />
          )}
          {activeTab === "science" && <SciencePage />}
        </main>
      </div>

      <footer className="relative z-10 w-full max-w-5xl mx-auto px-6 mt-16 text-center">
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
