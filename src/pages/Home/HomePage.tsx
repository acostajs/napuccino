import { Activity, ArrowRight, Moon, Play, Zap } from "lucide-react";
import type React from "react";
import { useI18n } from "../../lib/i18n";
import { MODES } from "../../lib/modes";

type HomePageProps = {
  setActiveTab: (tab: "home" | "timer" | "science") => void;
};

export function HomePage({ setActiveTab }: HomePageProps): React.ReactElement {
  const { t } = useI18n();
  const modes = Object.values(MODES);

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-gradient-overlay" />
        <div className="hero-content">
          <div className="hero-text-block">
            <div className="hero-badge">
              <Zap className="h-3 w-3" />
              {t("home.hero.badge")}
            </div>
            <h1 className="hero-title">
              {t("home.hero.title_line1")} <br />
              <span className="hero-accent-text">{t("home.hero.title_accent")}</span>
            </h1>
            <p className="hero-desc">{t("home.hero.desc")}</p>
            <div className="hero-button-group">
              <button type="button" onClick={() => setActiveTab("timer")} className="primary-btn group">
                <Play className="h-4 w-4 fill-current group-hover:translate-x-0.5 transition-transform" />
                {t("home.cta.start")}
              </button>
              <button type="button" onClick={() => setActiveTab("science")} className="secondary-btn">
                {t("home.cta.explore")}
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
                  <title>{t("home.hero.illustration_title")}</title>
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
                  {t("home.hero.nap_state_locked")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="modes-section">
        <div className="modes-header">
          <h2 className="modes-title">{t("home.modes.title")}</h2>
          <p className="modes-desc">{t("home.modes.desc")}</p>
        </div>

        <ul className="modes-grid">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <li key={mode.id}>
                <article className={`mode-card preset-card-${mode.id} group ${mode.glowColor}`}>
                  <div className="mode-body">
                    <div className="mode-header">
                      <div className={`mode-icon-wrapper ${mode.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="mode-range-badge">{t(`modes.${mode.id}.range`)}</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="mode-card-title">{t(`modes.${mode.id}.title`)}</h3>
                      <div className="mode-duration">{t(mode.durationDisplay)}</div>
                      <p className="mode-desc">{t(`modes.${mode.id}.description`)}</p>
                    </div>
                  </div>

                  <div className="mode-footer">
                    <div className="mode-benefit-row">
                      <Activity className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="mode-benefit-text">
                        <strong className="text-accent font-semibold">{t("home.modes.benefit_label")}</strong>{" "}
                        {t(`modes.${mode.id}.benefit`)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("timer")}
                      aria-label={`${t("home.modes.select_mode")} ${t(`modes.${mode.id}.title`)}`}
                      className="mode-action-btn"
                    >
                      {t("home.modes.select_mode")}
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
            <h2 className="science-intro-title">{t("home.science.title")}</h2>
            <p className="science-intro-subtitle">{t("home.science.subtitle")}</p>
          </div>
          <button type="button" onClick={() => setActiveTab("science")} className="science-intro-link group">
            {t("home.science.read_deep")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <ol className="science-intro-steps">
          <li className="science-step">
            <div className="step-number">1</div>
            <h3 className="step-title">{t("home.science.step1_title")}</h3>
            <p className="step-desc">{t("home.science.step1_desc")}</p>
          </li>

          <li className="science-step">
            <div className="step-number">2</div>
            <h3 className="step-title">{t("home.science.step2_title")}</h3>
            <p className="step-desc">{t("home.science.step2_desc")}</p>
          </li>

          <li className="science-step">
            <div className="step-number">3</div>
            <h3 className="step-title">{t("home.science.step3_title")}</h3>
            <p className="step-desc">{t("home.science.step3_desc")}</p>
          </li>
        </ol>
      </section>
    </div>
  );
}
