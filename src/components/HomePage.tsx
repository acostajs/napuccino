import { Activity, ArrowRight, Moon, Play, Zap } from "lucide-react";
import type React from "react";
import { MODES } from "../lib/modes";
import { CoffeeBeans, CoffeeRing, SleepingSloth, ZZzCloud } from "./Doodles";

type HomePageProps = {
  setActiveTab: (tab: "home" | "timer" | "science") => void;
};

export function HomePage({ setActiveTab }: HomePageProps): React.ReactElement {
  const modes = Object.values(MODES);

  return (
    <div className="home-container">
      {/* Sketchbook Background Doodles */}
      <CoffeeRing className="absolute -left-20 -top-16 w-64 h-64 opacity-70 pointer-events-none z-0" />
      <SleepingSloth className="absolute hidden lg:block lg:-left-28 lg:top-[420px] w-24 h-24 pointer-events-none z-0 rotate-[-8deg]" />
      <ZZzCloud className="absolute hidden lg:block lg:-right-28 lg:top-[280px] w-28 h-28 pointer-events-none z-0 rotate-[6deg]" />
      <CoffeeBeans className="absolute hidden xl:block -right-16 -bottom-10 w-36 h-36 pointer-events-none z-0 rotate-[12deg] opacity-75" />

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
              Meet Napuccino: the scientific intersection of rich caffeine absorption and optimized sleep states. Beat
              afternoon fatigue with mathematical precision.
            </p>
            <div className="hero-button-group">
              <button type="button" onClick={() => setActiveTab("timer")} className="primary-btn group">
                <Play className="h-4 w-4 fill-current group-hover:translate-x-0.5 transition-transform" />
                Start Optimized Nap
              </button>
              <button type="button" onClick={() => setActiveTab("science")} className="secondary-btn">
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
                <div className="dial-dot-accent" />
                <div className="dial-dot-primary" />
                <div className="dial-dot-muted" />
              </div>
              <div className="visual-card">
                {/* Playful sketchy sleeping coffee mug illustration */}
                <svg
                  className="visual-cup-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Sleeping coffee mug illustration</title>
                  {/* Steaming waves */}
                  <path d="M42 22 Q45 15 40 8" />
                  <path d="M50 20 Q53 12 48 6" />
                  <path d="M58 22 Q61 15 56 8" />

                  {/* Mug Body with organic hand-drawn wobble */}
                  <path d="M30 35 C30 35 30 75 50 75 C70 75 70 35 70 35 Z" fill="none" strokeWidth="3.5" />

                  {/* Mug Handle */}
                  <path d="M70 43 C80 43 83 57 70 61" strokeWidth="3.5" />

                  {/* Sleepy Eyelids on the mug */}
                  <path d="M41 52 C43 56 46 56 48 52" strokeWidth="2.5" />
                  <path d="M52 52 C54 56 57 56 59 52" strokeWidth="2.5" />
                  {/* Cute tiny mouth */}
                  <path d="M48 60 Q50 63 52 60" strokeWidth="2" />
                </svg>
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
            Select one of three scientifically backed nap structures optimized to clear brain fatigue without causing
            grogginess.
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
                      <span className="mode-range-badge">{mode.range}</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="mode-card-title">{mode.title}</h3>
                      <div className="mode-duration">{mode.durationDisplay}</div>
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
                    <button type="button" onClick={() => setActiveTab("timer")} className="mode-action-btn">
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
          <button type="button" onClick={() => setActiveTab("science")} className="science-intro-link group">
            Read deep science dive
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <ol className="science-intro-steps">
          <li className="science-step">
            <div className="step-number">1</div>
            <h3 className="step-title">Brew & Ingest</h3>
            <p className="step-desc">
              Drink a cup of coffee or shot of espresso *rapidly*. You want the caffeine entering your bloodstream all
              at once.
            </p>
          </li>

          <li className="science-step">
            <div className="step-number">2</div>
            <h3 className="step-title">Immediate Snooze</h3>
            <p className="step-desc">
              Lie down immediately and set the locked 20-minute timer. As you sleep, your brain clears sleep-inducing
              **adenosine**.
            </p>
          </li>

          <li className="science-step">
            <div className="step-number">3</div>
            <h3 className="step-title">Supercharged Wake</h3>
            <p className="step-desc">
              At minute 20, you wake up. The caffeine has just reached your brain. Since adenosine is cleared, the
              caffeine binds flawlessly.
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
}
