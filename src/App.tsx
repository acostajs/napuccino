import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { TimerPage } from "./components/TimerPage";
import { SciencePage } from "./components/SciencePage";
import "./index.css";

export function App() {
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="app-container">
      <div className="bg-radial-highlight" />
      
      <div className="app-content-wrapper">
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />

        <main className="app-main">
          {activeTab === "home" && <HomePage setActiveTab={setActiveTab} />}
          {activeTab === "timer" && <TimerPage />}
          {activeTab === "science" && <SciencePage />}
        </main>
      </div>

      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-text">
            © {new Date().getFullYear()} Napuccino. Engineered for peak cognitive performance.
          </p>
          <div className="footer-links">
            <span className="footer-link" onClick={() => setActiveTab("science")}>
              Science
            </span>
            <span>•</span>
            <span className="footer-link" onClick={() => setActiveTab("timer")}>
              Naps
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
