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
    color: "bg-gradient-mode-napuccino",
    darkColor: "",
    glowColor: "shadow-mode-napuccino",
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
    color: "bg-gradient-mode-powernap",
    darkColor: "",
    glowColor: "shadow-mode-powernap",
    description: "modes.powernap.description",
    benefit: "modes.powernap.benefit",
  },
  consolidation: {
    id: "consolidation",
    title: "modes.consolidation.title",
    duration: 2700,
    durationDisplay: "modes.consolidation.durationDisplay",
    range: "modes.consolidation.range",
    icon: Brain,
    color: "bg-gradient-mode-consolidation",
    darkColor: "",
    glowColor: "shadow-mode-consolidation",
    description: "modes.consolidation.description",
    benefit: "modes.consolidation.benefit",
  },
};
