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
        <div className="accordion-detail-text">
          <p>{t("science.topics.adenosine.p1")}</p>
          <p>{t("science.topics.adenosine.p2")}</p>
          <div className="nap-secret-box">
            <Sparkles className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <p className="nap-secret-text">
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
        <div className="accordion-detail-text">
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
        <div className="accordion-detail-text">
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
    <div className="science-container">
      <section className="science-header">
        <h1 className="science-title">
          {t("science.title")} <br />
          <span className="accent-underline">{t("science.title_accent")}</span>
        </h1>
        <p className="science-subtitle">{t("science.subtitle")}</p>
      </section>

      <section className="science-grid">
        <div className="pillars-col">
          <h2 className="section-heading">
            <Zap className="h-5 w-5 text-accent" />
            {t("science.pillars_heading")}
          </h2>

          <ul className="accordion-list">
            {scienceTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <li key={topic.id} className="accordion-item">
                  <details name="science-pillars" open={topic.id === "adenosine"} className="group outline-none">
                    <summary className="accordion-trigger cursor-pointer list-none outline-none">
                      <div className="accordion-title-box">
                        <div className="accordion-icon-box">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="accordion-title">{topic.title}</h3>
                          <p className="accordion-summary">{topic.summary}</p>
                        </div>
                      </div>
                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <article className="accordion-content">{topic.details}</article>
                  </details>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="aside-col">
          <h2 className="section-heading">
            <Sparkles className="h-5 w-5 text-accent" />
            {t("science.benefits_heading")}
          </h2>

          <ul className="benefits-list">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <li key={benefit.title} className="benefit-card">
                  <div className="benefit-icon-box">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="benefit-title">{benefit.title}</h3>
                    <p className="benefit-desc">{benefit.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <blockquote className="quote-box">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Coffee className="h-24 w-24 text-foreground" />
            </div>
            <p className="quote-text">{t("science.quote.text")}</p>
            <cite className="quote-source">{t("science.quote.source")}</cite>
          </blockquote>
        </aside>
      </section>

      <section className="synergy-section">
        <h2 className="synergy-title font-sans">{t("science.synergy_title")}</h2>

        <ul className="synergy-grid">
          <li className="synergy-card">
            <h3 className="synergy-card-title">{t("science.synergy.coffee_title")}</h3>
            <div className="synergy-progress-track">
              <div className="synergy-progress-bar" />
            </div>
            <p className="synergy-desc">{t("science.synergy.coffee_desc")}</p>
          </li>

          <li className="synergy-card">
            <h3 className="synergy-card-title">{t("science.synergy.sleep_title")}</h3>
            <div className="synergy-progress-track">
              <div className="synergy-progress-bar-partial" />
            </div>
            <p className="synergy-desc">{t("science.synergy.sleep_desc")}</p>
          </li>

          <li className="synergy-card-active">
            <h3 className="synergy-card-title text-accent">{t("science.synergy.napuccino_title")}</h3>
            <div className="synergy-progress-track bg-accent/20">
              <div className="synergy-progress-bar-active" />
            </div>
            <p className="synergy-desc-active">{t("science.synergy.napuccino_desc")}</p>
          </li>
        </ul>
      </section>
    </div>
  );
}
