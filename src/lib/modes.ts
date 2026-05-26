import { Coffee, BatteryCharging, Brain } from "lucide-react";

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
    title: "The Napuccino",
    duration: 1200,
    durationDisplay: "20 min",
    range: "Recommended",
    icon: Coffee,
    color: "from-amber-600 to-orange-500",
    darkColor: "dark:from-amber-950/40 dark:to-orange-950/40",
    glowColor: "shadow-orange-500/10",
    description: "Locked strictly to 20 minutes. Drink your espresso, close your eyes, and wake up supercharged.",
    benefit: "Double boost: Clears fatigue + triggers high-alertness receptors.",
  },
  powernap: {
    id: "powernap",
    title: "Power Nap",
    duration: 900,
    durationDisplay: "15 min",
    range: "10-20 mins",
    icon: BatteryCharging,
    color: "from-blue-600 to-cyan-500",
    darkColor: "dark:from-blue-950/40 dark:to-cyan-950/40",
    glowColor: "shadow-cyan-500/10",
    description: "Locked strictly to 15 minutes. Pure light sleep to prevent grogginess and restore focus.",
    benefit: "Instant motor skill recovery and sensory reset.",
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
