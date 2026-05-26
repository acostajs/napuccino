import { BatteryCharging, Brain, Coffee } from "lucide-react";

export type NapMode = "napuccino" | "powernap" | "consolidation";

export type ModeConfig = {
  id: NapMode;
  title: string;
  duration: number; // in seconds
  durationDisplay: string; // e.g. "20 min"
  range: string;
  icon: typeof Coffee;
  color: string;
  darkColor: string;
  glowColor: string;
  description: string;
  benefit: string;
};

export const MODES: Record<NapMode, ModeConfig> = {
  napuccino: {
    id: "napuccino",
    title: "modes.napuccino.title",
    duration: 1200,
    durationDisplay: "modes.napuccino.durationDisplay",
    range: "modes.napuccino.range",
    icon: Coffee,
    color: "from-amber-600 to-orange-500",
    darkColor: "dark:from-amber-950/40 dark:to-orange-950/40",
    glowColor: "shadow-orange-500/10",
    description: "modes.napuccino.description",
    benefit: "modes.napuccino.benefit",
  },
  powernap: {
    id: "powernap",
    title: "modes.powernap.title",
    duration: 900,
    durationDisplay: "modes.powernap.durationDisplay",
    range: "modes.powernap.range",
    icon: BatteryCharging,
    color: "from-blue-600 to-cyan-500",
    darkColor: "dark:from-blue-950/40 dark:to-cyan-950/40",
    glowColor: "shadow-cyan-500/10",
    description: "modes.powernap.description",
    benefit: "modes.powernap.benefit",
  },
  consolidation: {
    id: "consolidation",
    title: "Consolidation Block",
    duration: 2700,
    durationDisplay: "45 min",
    range: "30-60 mins",
    icon: Brain,
    color: "from-purple-600 to-indigo-500",
    darkColor: "dark:from-purple-950/40 dark:to-indigo-950/40",
    glowColor: "shadow-purple-500/10",
    description: "Locked strictly to 45 minutes. Extended rest for deep sleep cognitive and motor cleanup.",
    benefit: "Dramatically improves memory retention and logical reasoning.",
  },
};
