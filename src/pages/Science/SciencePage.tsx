import type React from "react";
import { useI18n } from "../../lib/i18n";

type SciencePageProps = {
  setActiveTab?: (tab: "home" | "timer" | "science") => void;
};

export function SciencePage({ setActiveTab }: SciencePageProps): React.ReactElement {
  const { t, locale } = useI18n();

  // Localized editorial titles mapped specifically to support multilinguality without breaking keys
  const editorialTitle =
    {
      en: "The Neurobiology of Nap.",
      es: "La neurobiología de la siesta.",
      fr: "La neurobiologie de la sieste.",
    }[locale] || "The Neurobiology of Nap.";

  const phase01Title =
    {
      en: "Phase 01: Adenosine",
      es: "Fase 01: Adenosina",
      fr: "Phase 01 : L'adénosine",
    }[locale] || "Phase 01: Adenosine";

  const phase02Title =
    {
      en: "Phase 02: Sleep Inertia",
      es: "Fase 02: Inercia del Sueño",
      fr: "Phase 02 : L'inertie du sommeil",
    }[locale] || "Phase 02: Sleep Inertia";

  return (
    <div className="flex flex-col gap-12 max-w-4xl mx-auto py-12 text-left relative z-10">
      {/* 
        Zine-Inspired Editorial Science Page Redesign 
        Completely borderless, pure typography-focused layout inspired by high-end print design.
      */}

      {/* Editorial Title */}
      <section className="text-center py-6 select-none">
        <h1 className="typography-display text-primary leading-tight lowercase">{editorialTitle}</h1>
      </section>

      {/* Section Rhythm Gap 96px */}
      <div className="h-section my-4" />

      {/* Two-Column Grid: Phase 01 & Phase 02 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative items-start">
        {/* Left Column: Phase 01: Adenosine */}
        <article className="space-y-6">
          <h3 className="typography-title text-accent uppercase tracking-widest border-b border-border/20 pb-2">
            {phase01Title}
          </h3>
          <div className="space-y-4">
            <p className="typography-body text-muted-foreground">{t("science.topics.adenosine.p1")}</p>
            <p className="typography-body text-muted-foreground">{t("science.topics.adenosine.p2")}</p>
            <div className="p-5 border border-dashed border-accent/20 bg-accent/5 rounded-2xl">
              <p className="text-xs font-bold leading-relaxed text-foreground">
                <strong className="text-accent uppercase tracking-wider block mb-1">
                  {t("science.topics.adenosine.secret_title")}
                </strong>
                {t("science.topics.adenosine.secret_desc")}
              </p>
            </div>
          </div>
        </article>

        {/* Vertical Separation Divider Line (Visible only on desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border/20 -translate-x-1/2" />

        {/* Right Column: Phase 02: Sleep Inertia */}
        <article className="space-y-6">
          <h3 className="typography-title text-accent uppercase tracking-widest border-b border-border/20 pb-2">
            {phase02Title}
          </h3>
          <div className="space-y-4">
            <p className="typography-body text-muted-foreground">{t("science.topics.grogginess.p1")}</p>
            <p className="typography-body text-muted-foreground">{t("science.topics.grogginess.p2")}</p>
            <p className="typography-body text-muted-foreground">{t("science.topics.grogginess.p3")}</p>
          </div>
        </article>
      </section>

      {/* Section Rhythm Gap 96px */}
      <div className="h-section my-4" />

      {/* Full-width Synergy Block: The Caffeine Co-Factor (Napuccino) */}
      <section className="space-y-8 pt-8 border-t border-dashed border-border/30">
        <div className="text-center">
          <h3 className="typography-title text-accent uppercase tracking-widest">
            {t("science.synergy_title") || "The Caffeine Co-Factor (Napuccino)"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-4">
          <div className="p-6 border border-border/10 bg-secondary/20 rounded-[32px] space-y-3 hover:scale-[1.01] transition-transform duration-300">
            <h4 className="text-sm font-black text-foreground uppercase tracking-wider">
              {t("science.synergy.coffee_title") || "A. Coffee Alone"}
            </h4>
            <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
              {t("science.synergy.coffee_desc")}
            </p>
          </div>

          <div className="p-6 border border-border/10 bg-secondary/20 rounded-[32px] space-y-3 hover:scale-[1.01] transition-transform duration-300">
            <h4 className="text-sm font-black text-foreground uppercase tracking-wider">
              {t("science.synergy.sleep_title") || "B. Sleep Alone"}
            </h4>
            <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
              {t("science.synergy.sleep_desc")}
            </p>
          </div>

          <div className="p-6 border border-accent/25 bg-accent/5 rounded-[32px] space-y-3 hover:scale-[1.02] transition-transform duration-300 shadow-xs">
            <h4 className="text-sm font-black text-accent uppercase tracking-wider">
              {t("science.synergy.napuccino_title") || "C. The Napuccino"}
            </h4>
            <p className="text-xs text-foreground font-bold leading-relaxed">{t("science.synergy.napuccino_desc")}</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-4 pt-6 text-center md:text-left select-none">
          <p className="typography-body text-muted-foreground">{t("science.topics.caffeine.p1")}</p>
          <p className="typography-body text-muted-foreground">{t("science.topics.caffeine.p2")}</p>
          <p className="typography-body text-muted-foreground">{t("science.topics.caffeine.p3")}</p>
        </div>
      </section>

      {/* Back to Workspace CTA Pill */}
      <div className="flex justify-center mt-12 pb-8">
        <button
          type="button"
          onClick={() => setActiveTab?.("timer")}
          className="py-4.5 px-10 bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest transition-all duration-500 ease-out active:scale-95 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
        >
          {`(( ${t("nav.timer") || "Back to Workspace"} ))`}
        </button>
      </div>
    </div>
  );
}
