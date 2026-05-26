import { useState } from "react";
import { Brain, Coffee, Zap, Award, Activity, Heart, ShieldAlert, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { CoffeeRing, SleepingSloth, CoffeeBeans } from "./Doodles";

export function SciencePage() {
  const [openSection, setOpenSection] = useState<string | null>("adenosine");

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const scienceTopics = [
    {
      id: "adenosine",
      title: "1. Adenosine & Sleep Pressure",
      icon: Brain,
      summary: "Understanding the organic biological battery that triggers sleepiness.",
      details: (
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            Throughout the day, as your brain burns energy, a chemical compound called **adenosine** steadily accumulates. Adenosine binds to specific receptors in your central nervous system, gradually dampening neural activity and creating what scientists call **sleep pressure**.
          </p>
          <p>
            The higher the concentration of adenosine, the sleepier and more fatigued you feel. When you sleep, your brain naturally clears this accumulation, reset-ing your biological battery.
          </p>
          <div className="nap-secret-box">
            <Sparkles className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <p className="nap-secret-text">
              <strong>The Nap Secret:</strong> Even a tiny 15-20 minute nap clears a substantial amount of adenosine from your receptors, freeing them up for caffeine to block!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "caffeine-lag",
      title: "2. The 20-Minute Caffeine Lag",
      icon: Coffee,
      summary: "Why drinking coffee *right before* a sleep produces a mathematical superpower.",
      details: (
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            When you drink a cup of coffee, the caffeine doesn't instantly hit your brain. It must pass through your stomach, enter your small intestine, absorb into the bloodstream, and finally cross the blood-brain barrier.
          </p>
          <p>
            This metabolic journey takes exactly **20 to 30 minutes**. 
          </p>
          <p>
            Therefore, if you drink coffee and lie down immediately, the caffeine is completely inactive for the next 20 minutes. It operates as a silent timer. The moment you are waking up, the caffeine reaches its peak concentration in the brain, creating an double-amplified alertness shockwave.
          </p>
        </div>
      ),
    },
    {
      id: "sleep-inertia",
      title: "3. Preventing Sleep Inertia (The Grogginess Trap)",
      icon: ShieldAlert,
      summary: "Why sleeping for exactly 20 minutes is structurally superior to a 45-minute nap.",
      details: (
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            A standard human sleep cycle consists of multiple stages: Light sleep (Stages 1 and 2), Slow-Wave Deep Sleep (Stage 3), and REM sleep.
          </p>
          <p>
            It takes approximately **30 minutes** to transition from light sleep into slow-wave deep sleep. If you wake up *during* deep sleep, your brain experiences severe **sleep inertia**—the heavy, disoriented, and groggy feeling that can ruin the rest of your day.
          </p>
          <p>
            By locking our Napuccino to **20 minutes** and Power Nap to **15 minutes**, we guarantee you stay strictly within light sleep, allowing you to wake up immediately refreshed and alert, with zero post-nap fatigue.
          </p>
        </div>
      ),
    },
  ];

  const benefits = [
    {
      title: "Accelerated Learning",
      description: "Studies show coffee naps improve working memory, facilitating the processing and categorization of complex information.",
      icon: Award,
    },
    {
      title: "Sensory Reset",
      description: "Clears sensory overload and stress, resetting eye fatigue and mental processing speeds.",
      icon: Heart,
    },
    {
      title: "Motor Coordination",
      description: "Improves motor skill accuracy and rapid reaction times, critical for athletes, musicians, and coders.",
      icon: Activity,
    },
  ];

  return (
    <div className="science-container">
      {/* Sketchbook Background Doodles */}
      <CoffeeRing className="absolute -left-20 -top-16 w-64 h-64 opacity-70 pointer-events-none z-0" />
      <CoffeeBeans className="absolute hidden lg:block -left-28 top-[360px] w-28 h-28 pointer-events-none z-0 rotate-[-12deg] opacity-75" />
      <SleepingSloth className="absolute hidden lg:block -right-28 top-[500px] w-24 h-24 pointer-events-none z-0 rotate-[6deg] opacity-75" />
      
      <section className="science-header">
        <h1 className="science-title">
          The Science of <br />
          <span className="text-accent underline decoration-2 underline-offset-8 decoration-accent/50">
            High-Performance Naps
          </span>
        </h1>
        <p className="science-subtitle">
          Napping is not laziness; it is a bio-hack. Discover the neurochemical dynamics behind adenosine clearance, caffeine absorption, and optimal sleep cycles.
        </p>
      </section>

      <section className="science-grid">
        
        <div className="pillars-col">
          <h2 className="section-heading">
            <Zap className="h-5 w-5 text-accent" />
            Biological Pillars
          </h2>

          <ul className="accordion-list">
            {scienceTopics.map((topic) => {
              const Icon = topic.icon;
              const isOpen = openSection === topic.id;
              return (
                <li key={topic.id} className="accordion-item">
                  <button onClick={() => toggleSection(topic.id)} className="accordion-trigger">
                    <div className="accordion-title-box">
                      <div className="accordion-icon-box">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="accordion-title">{topic.title}</h3>
                        <p className="accordion-summary">{topic.summary}</p>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <article className="accordion-content">
                      {topic.details}
                    </article>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="aside-col">
          <h2 className="section-heading">
            <Sparkles className="h-5 w-5 text-accent" />
            Proven Benefits
          </h2>

          <ul className="benefits-list">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <li key={idx} className="benefit-card">
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
            <p className="quote-text">
              "We found that combining caffeine intake with a brief sleep session leads to massive improvements in visual task accuracy, motor skills, and working memory compared to caffeine or sleep alone."
            </p>
            <cite className="quote-source">
              — Loughborough University Sleep Research Study
            </cite>
          </blockquote>
        </aside>

      </section>

      <section className="synergy-section">
        <h2 className="synergy-title font-sans">
          The Molecular Synergy: Coffee vs Sleep vs Napuccino
        </h2>

        <ul className="synergy-grid">
          
          <li className="synergy-card">
            <h3 className="synergy-card-title">A. Coffee Alone</h3>
            <div className="synergy-progress-track">
              <div className="synergy-progress-bar" />
            </div>
            <p className="synergy-desc">
              Caffeine molecules compete with massive blocks of existing adenosine. Receptors are already saturated, leading to a muted spike and severe jitters.
            </p>
          </li>

          <li className="synergy-card">
            <h3 className="synergy-card-title">B. Sleep Alone</h3>
            <div className="synergy-progress-track">
              <div className="h-full bg-blue-500 w-1/2" />
            </div>
            <p className="synergy-desc">
              Clears adenosine successfully, but does not add stimulant molecules. Alertness increases slowly, sometimes accompanied by initial sleep inertia.
            </p>
          </li>

          <li className="synergy-card-active">
            <h3 className="synergy-card-title text-accent">C. The Napuccino</h3>
            <div className="synergy-progress-track bg-accent/20">
              <div className="synergy-progress-bar-active" />
            </div>
            <p className="synergy-desc-active">
              Sleep completely sweeps adenosine from brain receptors. Caffeine arrives immediately after, binding perfectly to empty receptors. Alertness is maximized!
            </p>
          </li>

        </ul>
      </section>

    </div>
  );
}
