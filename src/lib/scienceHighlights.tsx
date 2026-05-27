import type React from "react";

export function highlightText(text: string, terms: { word: string; element: React.ReactNode }[]): React.ReactNode[] {
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

export function getScienceTerms(locale: string) {
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

  return {
    adenosineTerms: [
      {
        word: adenosineWord,
        element: <span className="text-[var(--mode-napuccino-start)] font-semibold">{adenosineWord}</span>,
      },
      {
        word: debtWord,
        element: <span className="text-[var(--mode-consolidation-start)] font-semibold">{debtWord}</span>,
      },
    ],
    adenosineTerms2: [
      {
        word: accidentalSleepWord,
        element: <span className="text-accent font-semibold">{accidentalSleepWord}</span>,
      },
    ],
    grogginessTerms1: [
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
    ],
    grogginessTerms2: [
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
    ],
    grogginessTerms3: [
      {
        word: deltaCyclesWord,
        element: <span className="text-[var(--mode-powernap-start)] font-semibold">{deltaCyclesWord}</span>,
      },
    ],
  };
}
