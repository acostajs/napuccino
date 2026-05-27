import { Activity, ArrowRight, Moon, Play, Zap } from "lucide-react";
import type React from "react";
import { useI18n } from "../../lib/i18n";
import { MODES, type NapMode } from "../../lib/modes";

type HomePageProps = {
  setActiveTab: (tab: "home" | "timer" | "science") => void;
  setActiveMode: (mode: NapMode) => void;
};

const modeCardGradients = {
  napuccino: "from-[var(--mode-napuccino-start)] to-[var(--mode-napuccino-end)]",
  powernap: "from-[var(--mode-powernap-start)] to-[var(--mode-powernap-end)]",
  consolidation: "from-[var(--mode-consolidation-start)] to-[var(--mode-consolidation-end)]",
};

export function HomePage({ setActiveTab, setActiveMode }: HomePageProps): React.ReactElement {
  const { t } = useI18n();
  const modes = Object.values(MODES);

  return (
    <div className="flex flex-col gap-16 max-w-5xl mx-auto py-6 relative">
      <section className="relative overflow-hidden bg-card border border-border/30 p-8 md:p-12 transition-all duration-500 ease-out rounded-3xl shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex-1 text-left space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent/5 px-3 py-1 text-xs font-bold text-accent">
              <Zap className="h-3 w-3" />
              {t("home.hero.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground font-serif leading-none">
              {t("home.hero.title_line1")} <br />
              <span className="text-accent underline decoration-2 decoration-accent/40 underline-offset-8">
                {t("home.hero.title_accent")}
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-semibold max-w-lg leading-relaxed">
              {t("home.hero.desc")}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab("timer")}
                className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 transition-all duration-500 ease-out active:scale-95 border border-transparent rounded-2xl shadow-sm hover:-translate-y-0.5 hover:shadow-md group"
              >
                <Play className="h-4 w-4 fill-current group-hover:translate-x-0.5 transition-transform" />
                {t("home.cta.start")}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("science")}
                className="flex items-center gap-2 border border-border bg-card font-bold px-6 py-3 transition-all duration-500 ease-out active:scale-95 text-foreground rounded-2xl shadow-xs hover:-translate-y-0.5 hover:shadow-md"
              >
                {t("home.cta.explore")}
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="flex-grow lg:flex-1 flex justify-center relative w-full max-w-md lg:max-w-none">
            <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
              <div className="absolute -top-4 flex gap-3 justify-center w-full">
                <span
                  className="w-1.5 h-12 bg-accent/25 rounded-full animate-steam"
                  style={{ animationDelay: "0.1s" }}
                />
                <span className="w-2 h-16 bg-accent/25 rounded-full animate-steam" style={{ animationDelay: "0.5s" }} />
                <span
                  className="w-1.5 h-10 bg-accent/25 rounded-full animate-steam"
                  style={{ animationDelay: "0.9s" }}
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-accent/5 blur-3xl animate-pulse" />

              <div
                className="relative w-64 h-64 md:w-72 md:h-72 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center animate-spin"
                style={{ animationDuration: "60s" }}
              >
                <div className="absolute top-3 w-4 h-4 rounded-full bg-accent/70 shadow-sm" />
                <div className="absolute bottom-3 w-3 h-3 rounded-full bg-primary/50" />
                <div className="absolute right-6 w-2 h-2 rounded-full bg-muted-foreground/40" />
              </div>
              <div className="absolute w-44 h-44 md:w-52 md:h-52 bg-card border border-border flex flex-col items-center justify-center transition-all duration-500 hover:rotate-3 rounded-3xl shadow-sm hover:-translate-y-0.5 hover:shadow-md">
                {/* Playful sketchy sleeping coffee mug illustration */}
                <svg
                  className="h-20 w-20 md:h-24 md:w-24 text-primary animate-pulse"
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
                <div className="absolute bottom-5 flex items-center gap-2 text-xs md:text-sm font-extrabold text-accent">
                  <Moon className="h-4 w-4" />
                  {t("home.hero.nap_state_locked")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl text-foreground font-serif">
            {t("home.modes.title")}
          </h2>
          <p className="text-muted-foreground font-bold text-sm sm:text-base">{t("home.modes.desc")}</p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <li key={mode.id}>
                <article
                  className={`relative h-full flex flex-col justify-between bg-gradient-to-br ${modeCardGradients[mode.id]} text-primary p-8 rounded-3xl shadow-md transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg group`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 border border-border/10 rounded-xl bg-card/85 text-primary shadow-xs">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-card/85 text-primary border border-border/20">
                        {t(`modes.${mode.id}.range`)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-primary">{t(`modes.${mode.id}.title`)}</h3>
                      <div className="text-2xl font-black text-primary">{t(mode.durationDisplay)}</div>
                      <p className="text-sm text-primary/85 font-semibold leading-relaxed">
                        {t(`modes.${mode.id}.description`)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t-2 border-primary/20 space-y-4">
                    <div className="flex items-start gap-2.5">
                      <Activity className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-xs font-extrabold text-primary">
                        <strong className="text-accent font-semibold">{t("home.modes.benefit_label")}</strong>{" "}
                        {t(`modes.${mode.id}.benefit`)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMode(mode.id);
                        setActiveTab("timer");
                      }}
                      aria-label={`${t("home.modes.select_mode")} ${t(`modes.${mode.id}.title`)}`}
                      className="w-full inline-flex items-center justify-center gap-2 border border-transparent bg-card text-primary font-bold text-sm px-4 py-2.5 hover:bg-card/90 transition-all duration-500 ease-out rounded-xl shadow-sm"
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

      <section className="bg-card border border-border/30 p-8 md:p-12 space-y-8 transition-all duration-500 ease-out rounded-3xl shadow-sm hover:shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
              {t("home.science.title")}
            </h2>
            <p className="text-muted-foreground font-semibold text-sm">{t("home.science.subtitle")}</p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab("science")}
            className="text-sm font-bold text-primary hover:text-accent flex items-center gap-1.5 transition-colors underline decoration-primary/30 underline-offset-4 group"
          >
            {t("home.science.read_deep")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <li className="flex flex-col gap-3 relative">
            <div className="flex h-12 w-12 items-center justify-center border border-border bg-secondary shadow-xs text-lg font-black text-accent rounded-xl">
              1
            </div>
            <h3 className="text-lg font-black text-foreground">{t("home.science.step1_title")}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-semibold leading-relaxed">
              {t("home.science.step1_desc")}
            </p>
          </li>

          <li className="flex flex-col gap-3 relative">
            <div className="flex h-12 w-12 items-center justify-center border border-border bg-secondary shadow-xs text-lg font-black text-accent rounded-xl">
              2
            </div>
            <h3 className="text-lg font-black text-foreground">{t("home.science.step2_title")}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-semibold leading-relaxed">
              {t("home.science.step2_desc")}
            </p>
          </li>

          <li className="flex flex-col gap-3 relative">
            <div className="flex h-12 w-12 items-center justify-center border border-border bg-secondary shadow-xs text-lg font-black text-accent rounded-xl">
              3
            </div>
            <h3 className="text-lg font-black text-foreground">{t("home.science.step3_title")}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-semibold leading-relaxed">
              {t("home.science.step3_desc")}
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
}
