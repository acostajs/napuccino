import { Coffee, BatteryCharging, Brain, Zap, Moon, Play, ArrowRight, Activity } from "lucide-react";

interface HomePageProps {
  setActiveTab: (tab: "home" | "timer" | "science") => void;
}

export function HomePage({ setActiveTab }: HomePageProps) {
  const modes = [
    {
      id: "napuccino",
      title: "The Napuccino",
      duration: "20 min",
      range: "Recommended",
      icon: Coffee,
      color: "from-amber-600 to-orange-500",
      darkColor: "dark:from-amber-950/40 dark:to-orange-950/40",
      glowColor: "shadow-orange-500/10",
      description: "The gold standard of productivity. Drink a cup of espresso or coffee, and immediately sleep. Caffeine matches your wake-up exactly.",
      benefit: "Double boost: Clears fatigue + triggers high-alertness receptors.",
    },
    {
      id: "powernap",
      title: "Power Nap",
      duration: "15 min",
      range: "10-20 mins",
      icon: BatteryCharging,
      color: "from-blue-600 to-cyan-500",
      darkColor: "dark:from-blue-950/40 dark:to-cyan-950/40",
      glowColor: "shadow-cyan-500/10",
      description: "A fast, hyper-efficient reset. Stays strictly within Stage 1 & 2 sleep to prevent sleep grogginess.",
      benefit: "Instant motor skill recovery and sensory reset.",
    },
    {
      id: "consolidation",
      title: "Consolidation Block",
      duration: "45 min",
      range: "30-60 mins",
      icon: Brain,
      color: "from-purple-600 to-indigo-500",
      darkColor: "dark:from-purple-950/40 dark:to-indigo-950/40",
      glowColor: "shadow-purple-500/10",
      description: "A deeper cognitive reboot. Accesses slow-wave deep sleep to process information and clean neural pathways.",
      benefit: "Dramatically improves memory retention and logical reasoning.",
    },
  ];

  return (
    <div className="home-container">
      
      <section className="hero-section">
        <div className="hero-gradient-overlay" />
        <div className="hero-content">
          
          <div className="hero-text-block">
            <div className="hero-badge">
              <Zap className="h-3 w-3" />
              Revolutionize Your Naps
            </div>
            <h1 className="hero-title">
              Brew. Sleep. <br />
              <span className="hero-accent-text">Conquer.</span>
            </h1>
            <p className="hero-desc">
              Meet Napuccino: the scientific intersection of rich caffeine absorption and optimized sleep states. Beat afternoon fatigue with mathematical precision.
            </p>
            <div className="hero-button-group">
              <button onClick={() => setActiveTab("timer")} className="primary-btn group">
                <Play className="h-4 w-4 fill-current group-hover:translate-x-0.5 transition-transform" />
                Start Optimized Nap
              </button>
              <button onClick={() => setActiveTab("science")} className="secondary-btn">
                Explore the Science
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="hero-visual-block">
            <div className="hero-visual-container">
              <div className="visual-steams">
                <span className="w-1.5 h-12 visual-steam" style={{ animationDelay: "0.1s" }} />
                <span className="w-2 h-16 visual-steam" style={{ animationDelay: "0.5s" }} />
                <span className="w-1.5 h-10 visual-steam" style={{ animationDelay: "0.9s" }} />
              </div>
              <div className="visual-glow" />
              
              <div className="visual-dial">
                <div className="absolute top-3 w-4 h-4 rounded-full bg-accent/70 shadow-sm" />
                <div className="absolute bottom-3 w-3 h-3 rounded-full bg-primary/50" />
                <div className="absolute right-6 w-2 h-2 rounded-full bg-muted-foreground/40" />
              </div>
              <div className="visual-card">
                <Coffee className="visual-cup-icon" />
                <div className="visual-state-label">
                  <Moon className="h-4 w-4" />
                  Nap State: Locked
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      <section className="modes-section">
        <div className="modes-header">
          <h2 className="modes-title">Choose Your Rhythm</h2>
          <p className="modes-desc">
            Select one of three scientifically backed nap structures optimized to clear brain fatigue without causing grogginess.
          </p>
        </div>

        <ul className="modes-grid">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <li key={mode.id}>
                <article className={`mode-card group ${mode.glowColor}`}>
                  <div className="mode-body">
                    <div className="mode-header">
                      <div className={`mode-icon-wrapper bg-gradient-to-r ${mode.color} ${mode.darkColor}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="mode-range-badge">
                        {mode.range}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="mode-card-title">{mode.title}</h3>
                      <div className="mode-duration">{mode.duration}</div>
                      <p className="mode-desc">{mode.description}</p>
                    </div>
                  </div>

                  <div className="mode-footer">
                    <div className="mode-benefit-row">
                      <Activity className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="mode-benefit-text">
                        <strong className="text-accent font-semibold">Benefit:</strong> {mode.benefit}
                      </span>
                    </div>
                    <button onClick={() => setActiveTab("timer")} className="mode-action-btn">
                      Select Mode
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="science-intro-section">
        <div className="science-intro-header">
          <div className="space-y-2">
            <h2 className="science-intro-title">The 30-Second Napuccino Science</h2>
            <p className="science-intro-subtitle">
              How drinking caffeine before a nap creates a productivity superpower.
            </p>
          </div>
          <button onClick={() => setActiveTab("science")} className="science-intro-link group">
            Read deep science dive
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <ol className="science-intro-steps">
          
          <li className="science-step">
            <div className="step-number">1</div>
            <h3 className="step-title">Brew & Ingest</h3>
            <p className="step-desc">
              Drink a cup of coffee or shot of espresso *rapidly*. You want the caffeine entering your bloodstream all at once.
            </p>
          </li>

          <li className="science-step">
            <div className="step-number">2</div>
            <h3 className="step-title">Immediate Snooze</h3>
            <p className="step-desc">
              Lie down immediately and set the locked 20-minute timer. As you sleep, your brain clears sleep-inducing **adenosine**.
            </p>
          </li>

          <li className="science-step">
            <div className="step-number">3</div>
            <h3 className="step-title">Supercharged Wake</h3>
            <p className="step-desc">
              At minute 20, you wake up. The caffeine has just reached your brain. Since adenosine is cleared, the caffeine binds flawlessly.
            </p>
          </li>

        </ol>
      </section>

    </div>
  );
}
