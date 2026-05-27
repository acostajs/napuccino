import { Coffee } from "lucide-react";
import type React from "react";
import { useI18n } from "../../lib/i18n";

type SciencePageProps = {
  setActiveTab?: (tab: "home" | "timer" | "science") => void;
};

export function SciencePage({ setActiveTab }: SciencePageProps): React.ReactElement {
  const { t, locale } = useI18n();

  // Helper to dynamically highlight terms in localized strings case-insensitively
  function highlightText(text: string, terms: { word: string; element: React.ReactNode }[]) {
    let result: React.ReactNode[] = [text];
    for (const term of terms) {
      const nextResult: React.ReactNode[] = [];
      for (const item of result) {
        if (typeof item === "string") {
          const parts = item.split(new RegExp(`(${term.word})`, "gi"));
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (part && part.toLowerCase() === term.word.toLowerCase()) {
              nextResult.push(<span key={`${term.word}-${i}`}>{term.element}</span>);
            } else {
              nextResult.push(part || "");
            }
          }
        } else {
          nextResult.push(item);
        }
      }
      result = nextResult;
    }
    return result;
  }

  // Define localized terms for dynamic highlights
  const adenosineWord =
    {
      en: "adenosine",
      es: "adenosina",
      fr: "adénosine",
    }[locale] || "adenosine";

  const debtWord =
    {
      en: "chemical debt",
      es: "deuda química",
      fr: "dette chimique",
    }[locale] || "chemical debt";

  const accidentalSleepWord =
    {
      en: "accidental sleep",
      es: "sueño accidental",
      fr: "sommeil accidentel",
    }[locale] || "accidental sleep";

  const sleepInertiaWord =
    {
      en: "sleep inertia",
      es: "inercia del sueño",
      fr: "inertie du sommeil",
    }[locale] || "sleep inertia";

  const deltaCyclesWord =
    {
      en: "slow-wave delta cycles",
      es: "ciclos delta de ondas lentas",
      fr: "cycles delta à ondes lentes",
    }[locale] || "slow-wave delta cycles";

  const min30Word =
    {
      en: "30 minutes",
      es: "30 minutos",
      fr: "30 minutes",
    }[locale] || "30 minutes";

  const min20Word =
    {
      en: "20 minutes",
      es: "20 minutos",
      fr: "20 minutes",
    }[locale] || "20 minutes";

  const min15Word =
    {
      en: "15 minutes",
      es: "15 minutos",
      fr: "15 minutes",
    }[locale] || "15 minutes";

  // Build term objects for highlighting
  const adenosineTerms = [
    {
      word: adenosineWord,
      element: <span className="text-[var(--mode-napuccino-start)] font-semibold">{adenosineWord}</span>,
    },
    {
      word: debtWord,
      element: <span className="text-[var(--mode-consolidation-start)] font-semibold">{debtWord}</span>,
    },
  ];

  const adenosineTerms2 = [
    {
      word: accidentalSleepWord,
      element: <span className="text-accent font-semibold">{accidentalSleepWord}</span>,
    },
  ];

  const grogginessTerms1 = [
    {
      word: min30Word,
      element: (
        <span className="border border-primary/20 px-3 py-0.5 rounded-full inline-block text-xs font-extrabold text-accent">
          {min30Word.toUpperCase()}
        </span>
      ),
    },
    {
      word: sleepInertiaWord,
      element: <span className="text-[var(--mode-consolidation-start)] font-semibold">{sleepInertiaWord}</span>,
    },
  ];

  const grogginessTerms2 = [
    {
      word: min20Word,
      element: (
        <span className="border border-primary/20 px-3 py-0.5 rounded-full inline-block text-xs font-extrabold text-accent">
          {min20Word.toUpperCase()}
        </span>
      ),
    },
    {
      word: min15Word,
      element: (
        <span className="border border-primary/20 px-3 py-0.5 rounded-full inline-block text-xs font-extrabold text-accent">
          {min15Word.toUpperCase()}
        </span>
      ),
    },
  ];

  const grogginessTerms3 = [
    {
      word: deltaCyclesWord,
      element: <span className="text-[var(--mode-powernap-start)] font-semibold">{deltaCyclesWord}</span>,
    },
  ];

  // Two-tone layout headings splitting
  const phase01Part1 = t("science.phase01_title_part1");
  const phase01Part2 = t("science.phase01_title_part2");
  const phase02Part1 = t("science.phase02_title_part1");
  const phase02Part2 = t("science.phase02_title_part2");

  // Split synergy header on colon
  const synergyTitle = t("science.synergy_title");
  const colonIndex = synergyTitle.indexOf(":");
  const synergyPart1 = colonIndex !== -1 ? synergyTitle.substring(0, colonIndex + 1) : synergyTitle;
  const synergyPart2 = colonIndex !== -1 ? synergyTitle.substring(colonIndex + 1) : "";

  return (
    <div className="flex flex-col gap-24 max-w-4xl mx-auto py-24 text-left relative z-10">
      {/* 
        Zine-Inspired Editorial Science Page Redesign 
        Completely borderless, pure typography-focused layout inspired by high-end print design.
      */}

      {/* Editorial Title */}
      <section className="text-center select-none">
        <h1 className="typography-display text-primary leading-tight lowercase font-serif">
          {t("science.editorial_title")}
        </h1>
        <p className="typography-body text-muted-foreground italic tracking-wider mt-4 select-text">
          {t("science.editorial_subtitle")}
        </p>
      </section>

      {/* Two-Column Grid: Phase 01 & Phase 02 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative items-start">
        {/* Left Column: Phase 01: Adenosine */}
        <article className="space-y-8 relative">
          {/* Micro-graphic editorial label */}
          <div className="typography-utility text-[10px] text-muted-foreground/60 select-none tracking-widest font-mono">
            {t("science.methodology_label")}
          </div>

          <h3 className="typography-title uppercase tracking-widest font-sans font-bold">
            <span className="text-primary">{phase01Part1} </span>
            <span className="text-accent">{phase01Part2}</span>
          </h3>

          <div className="space-y-6">
            <p className="typography-body text-muted-foreground select-text">
              {highlightText(t("science.topics.adenosine.p1"), adenosineTerms)}
            </p>
            <p className="typography-body text-muted-foreground select-text">
              {highlightText(t("science.topics.adenosine.p2"), adenosineTerms2)}
            </p>

            {/* Elegant, borderless blockquote callout */}
            <div className="border-l-2 border-accent pl-6 py-2 bg-transparent rounded-none my-4">
              <p className="text-base md:text-lg italic text-foreground/90 font-bold leading-relaxed select-text">
                <strong className="text-accent uppercase tracking-wider block mb-2 text-xs font-sans font-black select-none">
                  {t("science.topics.adenosine.secret_title").toUpperCase()}
                </strong>
                {t("science.topics.adenosine.secret_desc")}
              </p>
            </div>
          </div>
        </article>

        {/* Vertical Separation Divider Line (Visible only on desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border/25 -translate-x-1/2" />

        {/* Right Column: Phase 02: Sleep Inertia */}
        <article className="space-y-8 relative md:pl-6">
          {/* Micro-graphic editorial label */}
          <div className="typography-utility text-[10px] text-muted-foreground/60 select-none tracking-widest font-mono">
            {t("science.methodology_label").replace("01", "02")}
          </div>

          <h3 className="typography-title uppercase tracking-widest font-sans font-bold">
            <span className="text-primary">{phase02Part1} </span>
            <span className="text-accent">{phase02Part2}</span>
          </h3>

          <div className="space-y-6">
            <p className="typography-body text-muted-foreground select-text">
              {highlightText(t("science.topics.grogginess.p1"), grogginessTerms1)}
            </p>
            <p className="typography-body text-muted-foreground select-text">
              {highlightText(t("science.topics.grogginess.p2"), grogginessTerms2)}
            </p>
            <p className="typography-body text-muted-foreground select-text">
              {highlightText(t("science.topics.grogginess.p3"), grogginessTerms3)}
            </p>
          </div>
        </article>
      </section>

      {/* Full-width Synergy Block: The Caffeine Co-Factor (Napuccino) */}
      <section className="space-y-12 border-t border-dashed border-border/40 pt-16">
        <div className="text-center select-none">
          <h3 className="typography-title uppercase tracking-widest font-bold">
            <span className="text-primary">{synergyPart1}</span>
            {synergyPart2 && <span className="text-accent">{synergyPart2}</span>}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-stretch">
          {/* A. Coffee Alone - Neutral Typographic Breakdown */}
          <div className="p-6 bg-transparent border-none space-y-4 flex flex-col justify-start">
            <h4 className="text-sm font-black text-foreground uppercase tracking-wider select-none">
              {t("science.synergy.coffee_title") || "A. Coffee Alone"}
            </h4>
            <p className="text-xs text-muted-foreground font-semibold leading-relaxed select-text">
              {t("science.synergy.coffee_desc")}
            </p>
          </div>

          {/* B. Sleep Alone - Neutral Typographic Breakdown */}
          <div className="p-6 bg-transparent border-none space-y-4 flex flex-col justify-start">
            <h4 className="text-sm font-black text-foreground uppercase tracking-wider select-none">
              {t("science.synergy.sleep_title") || "B. Sleep Alone"}
            </h4>
            <p className="text-xs text-muted-foreground font-semibold leading-relaxed select-text">
              {t("science.synergy.sleep_desc")}
            </p>
          </div>

          {/* C. The Napuccino - Accented Soft Blush Organic Card */}
          <div className="p-8 bg-accent/5 border border-accent/20 rounded-organic space-y-4 flex flex-col justify-center relative overflow-hidden group shadow-xs">
            {/* Visual Micro-Graphic: Soundwave crossing a Coffee Cup */}
            <div className="relative h-16 w-full flex items-center justify-center mb-2 select-none pointer-events-none">
              <div className="absolute inset-0 flex items-center justify-center opacity-25 text-accent">
                <svg
                  className="w-28 h-12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 100 40"
                  role="img"
                  aria-label="Soundwave"
                >
                  <title>Soundwave</title>
                  <path d="M0,20 Q10,5 20,20 T40,20 T60,20 T80,20 T100,20" strokeLinecap="round" />
                  <path d="M0,20 Q10,35 20,20 T40,20 T60,20 T80,20 T100,20" strokeLinecap="round" />
                </svg>
              </div>
              <div className="relative z-10 text-accent bg-background/60 backdrop-blur-xs p-3 rounded-full border border-accent/20 shadow-2xs transition-transform duration-500 group-hover:scale-110">
                <Coffee className="w-6 h-6 stroke-[1.5]" />
              </div>
            </div>

            <h4 className="text-sm font-black text-accent uppercase tracking-wider select-none">
              {t("science.synergy.napuccino_title") || "C. The Napuccino"}
            </h4>
            <p className="text-xs text-foreground font-extrabold leading-relaxed select-text">
              {t("science.synergy.napuccino_desc")}
            </p>
          </div>
        </div>

        {/* Explanatory Metabolic Block */}
        <div className="max-w-2xl mx-auto space-y-6 pt-12 text-center select-none">
          <p className="typography-body text-muted-foreground select-text">{t("science.topics.caffeine.p1")}</p>
          <p className="typography-body text-muted-foreground select-text">{t("science.topics.caffeine.p2")}</p>
          <p className="typography-body text-muted-foreground select-text">{t("science.topics.caffeine.p3")}</p>
        </div>
      </section>

      {/* Back to Workspace CTA Pill */}
      <div className="flex justify-center select-none">
        <button
          type="button"
          onClick={() => setActiveTab?.("timer")}
          className="py-4.5 px-10 bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest transition-all duration-500 ease-out active:scale-95 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
        >
          {`(( ${t("nav.timer").toUpperCase()} ))`}
        </button>
      </div>
    </div>
  );
}
