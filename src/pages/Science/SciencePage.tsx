import { Coffee } from "lucide-react";
import type React from "react";
import { useI18n } from "../../lib/i18n";
import { getScienceTerms, highlightText } from "../../lib/scienceHighlights";

type SciencePageProps = {
  setActiveTab?: (tab: "home" | "timer" | "science") => void;
};

export function SciencePage({ setActiveTab }: SciencePageProps): React.ReactElement {
  const { t, locale } = useI18n();

  const { adenosineTerms, adenosineTerms2, grogginessTerms1, grogginessTerms2, grogginessTerms3 } =
    getScienceTerms(locale);

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
            {t("science.methodology_label_01")}
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
            {t("science.methodology_label_02")}
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

        {/* Chronological Metabolic Flowchart */}
        <div className="max-w-4xl mx-auto pt-16 border-t border-dashed border-border/40 relative">
          <div className="text-center mb-12 select-none">
            <span className="typography-utility uppercase text-xs tracking-widest text-accent block mb-2">
              {t("science.metabolic_flow_title")}
            </span>
            <h4 className="typography-title uppercase tracking-wider font-bold text-foreground">
              {t("science.metabolic_flow_subtitle")}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[1px] border-t border-dashed border-accent/20 z-0" />

            {/* Step 1: Metabolic Entry */}
            <div className="space-y-4 text-center md:text-left relative z-10">
              <span className="font-serif text-4xl md:text-5xl font-extrabold italic text-accent opacity-80 block md:inline-block bg-background px-4">
                01
              </span>
              <div className="space-y-2">
                <h5 className="text-xs uppercase font-black tracking-widest text-foreground font-sans">
                  {t("science.metabolic_flow.step1_title")}
                </h5>
                <p className="text-xs text-muted-foreground font-semibold leading-relaxed select-text">
                  {t("science.topics.caffeine.p1")}
                </p>
              </div>
            </div>

            {/* Step 2: The Sleep Window */}
            <div className="space-y-4 text-center md:text-left relative z-10">
              <span className="font-serif text-4xl md:text-5xl font-extrabold italic text-accent opacity-80 block md:inline-block bg-background px-4">
                02
              </span>
              <div className="space-y-2">
                <h5 className="text-xs uppercase font-black tracking-widest text-foreground font-sans">
                  {t("science.metabolic_flow.step2_title")}
                </h5>
                <p className="text-xs text-muted-foreground font-semibold leading-relaxed select-text">
                  {t("science.topics.caffeine.p2")}
                </p>
              </div>
            </div>

            {/* Step 3: Receptor Synchronization */}
            <div className="space-y-4 text-center md:text-left relative z-10">
              <span className="font-serif text-4xl md:text-5xl font-extrabold italic text-accent opacity-80 block md:inline-block bg-background px-4">
                03
              </span>
              <div className="space-y-2">
                <h5 className="text-xs uppercase font-black tracking-widest text-foreground font-sans">
                  {t("science.metabolic_flow.step3_title")}
                </h5>
                <p className="text-xs text-muted-foreground font-semibold leading-relaxed select-text">
                  {t("science.topics.caffeine.p3")}
                </p>
              </div>
            </div>
          </div>
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
