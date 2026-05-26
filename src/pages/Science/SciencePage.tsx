import { Activity, Award, Brain, ChevronDown, Coffee, Heart, ShieldAlert, Sparkles, Zap } from "lucide-react";
import type React from "react";
import { useI18n } from "../../lib/i18n";

export function SciencePage(): React.ReactElement {
  const { t } = useI18n();

  const scienceTopics = [
    {
      id: "adenosine",
      title: t("science.topics.adenosine.title"),
      icon: Brain,
      summary: t("science.topics.adenosine.summary"),
      details: (
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>{t("science.topics.adenosine.p1")}</p>
          <p>{t("science.topics.adenosine.p2")}</p>
          <div className="p-4 border border-accent/25 bg-accent/5 flex gap-3 text-foreground rounded-2xl">
            <Sparkles className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <p className="text-xs font-extrabold">
              <strong>{t("science.topics.adenosine.secret_title")}</strong>
              {t("science.topics.adenosine.secret_desc")}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "caffeine-lag",
      title: t("science.topics.caffeine.title"),
      icon: Coffee,
      summary: t("science.topics.caffeine.summary"),
      details: (
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>{t("science.topics.caffeine.p1")}</p>
          <p>{t("science.topics.caffeine.p2")}</p>
          <p>{t("science.topics.caffeine.p3")}</p>
        </div>
      ),
    },
    {
      id: "sleep-inertia",
      title: t("science.topics.grogginess.title"),
      icon: ShieldAlert,
      summary: t("science.topics.grogginess.summary"),
      details: (
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>{t("science.topics.grogginess.p1")}</p>
          <p>{t("science.topics.grogginess.p2")}</p>
          <p>{t("science.topics.grogginess.p3")}</p>
        </div>
      ),
    },
  ];

  const benefits = [
    {
      title: t("science.benefits.learning.title"),
      description: t("science.benefits.learning.desc"),
      icon: Award,
    },
    {
      title: t("science.benefits.sensory.title"),
      description: t("science.benefits.sensory.desc"),
      icon: Heart,
    },
    {
      title: t("science.benefits.motor.title"),
      description: t("science.benefits.motor.desc"),
      icon: Activity,
    },
  ];

  return (
    <div className="flex flex-col gap-16 max-w-5xl mx-auto py-6 text-left">
      <section className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground font-serif leading-none">
          {t("science.title")} <br />
          <span className="text-accent underline decoration-2 underline-offset-8 decoration-accent/50">
            {t("science.title_accent")}
          </span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground font-semibold max-w-2xl leading-relaxed">
          {t("science.subtitle")}
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            {t("science.pillars_heading")}
          </h2>

          <ul className="space-y-4">
            {scienceTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <li
                  key={topic.id}
                  className="bg-card border border-border/30 overflow-hidden transition-all duration-500 ease-out rounded-2xl shadow-sm hover:shadow-md"
                >
                  <details name="science-pillars" open={topic.id === "adenosine"} className="group outline-none">
                    <summary className="w-full flex items-center justify-between p-6 text-left outline-none cursor-pointer list-none">
                      <div className="flex gap-4 items-center">
                        <div className="p-2.5 border border-border/30 rounded-xl bg-secondary text-primary shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-black text-foreground sm:text-lg">{topic.title}</h3>
                          <p className="text-xs text-muted-foreground font-bold mt-0.5 uppercase tracking-wide">
                            {topic.summary}
                          </p>
                        </div>
                      </div>
                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <article className="px-6 pb-6 pt-2 border-t-2 border-primary/20">{topic.details}</article>
                  </details>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="space-y-6 flex flex-col justify-start">
          <h2 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            {t("science.benefits_heading")}
          </h2>

          <ul className="space-y-4 flex-grow">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <li
                  key={benefit.title}
                  className="bg-card border border-border/30 p-6 flex gap-4 transition-all duration-500 ease-out rounded-2xl shadow-sm hover:shadow-md"
                >
                  <div className="h-10 w-10 rounded-xl border border-accent/25 bg-accent/5 text-accent flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-foreground uppercase tracking-wider">{benefit.title}</h3>
                    <p className="text-xs text-muted-foreground font-semibold leading-relaxed">{benefit.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <blockquote className="rounded-2xl border border-dashed border-border p-6 bg-secondary/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Coffee className="h-24 w-24 text-foreground" />
            </div>
            <p className="text-xs font-bold text-muted-foreground italic leading-relaxed">{t("science.quote.text")}</p>
            <cite className="block text-xs font-extrabold tracking-wide uppercase text-accent mt-3 text-right not-italic">
              {t("science.quote.source")}
            </cite>
          </blockquote>
        </aside>
      </section>

      <section className="bg-card border border-border/30 p-8 md:p-12 space-y-8 transition-all duration-500 ease-out rounded-3xl shadow-sm hover:shadow-md">
        <h2 className="text-2xl font-black text-foreground text-center font-sans">{t("science.synergy_title")}</h2>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <li className="border border-border/30 bg-secondary/40 p-6 space-y-3 transition-all duration-500 ease-out rounded-2xl">
            <h3 className="text-base font-black text-foreground">{t("science.synergy.coffee_title")}</h3>
            <div className="h-3.5 w-full rounded-full border border-border/30 bg-card overflow-hidden p-0.5">
              <div className="h-full bg-amber-500 rounded-full w-1/3" />
            </div>
            <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
              {t("science.synergy.coffee_desc")}
            </p>
          </li>

          <li className="border border-border/30 bg-secondary/40 p-6 space-y-3 transition-all duration-500 ease-out rounded-2xl">
            <h3 className="text-base font-black text-foreground">{t("science.synergy.sleep_title")}</h3>
            <div className="h-3.5 w-full rounded-full border border-border/30 bg-card overflow-hidden p-0.5">
              <div className="h-full bg-blue-500 rounded-full w-1/2" />
            </div>
            <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
              {t("science.synergy.sleep_desc")}
            </p>
          </li>

          <li className="border border-accent/25 bg-accent/5 p-6 space-y-3 transition-all duration-500 ease-out rounded-2xl">
            <h3 className="text-base font-black text-foreground text-accent">{t("science.synergy.napuccino_title")}</h3>
            <div className="h-3.5 w-full rounded-full border border-border/30 bg-card overflow-hidden p-0.5 bg-accent/20">
              <div className="h-full bg-accent rounded-full w-full animate-pulse" />
            </div>
            <p className="text-xs text-foreground leading-relaxed font-bold">{t("science.synergy.napuccino_desc")}</p>
          </li>
        </ul>
      </section>
    </div>
  );
}
