import { BatteryCharging, Brain, Coffee } from "lucide-react";

export type NapMode = "napuccino" | "powernap" | "consolidation";

export type ModeConfig = {
  id: NapMode;
  duration: number; // in seconds
  durationDisplay: string; // e.g. "modes.napuccino.durationDisplay"
  icon: typeof Coffee;
};

export const MODES: Record<NapMode, ModeConfig> = {
  napuccino: {
    id: "napuccino",
    duration: 1200,
    durationDisplay: "modes.napuccino.durationDisplay",
    icon: Coffee,
  },
  powernap: {
    id: "powernap",
    duration: 900,
    durationDisplay: "modes.powernap.durationDisplay",
    icon: BatteryCharging,
  },
  consolidation: {
    id: "consolidation",
    duration: 2700,
    durationDisplay: "modes.consolidation.durationDisplay",
    icon: Brain,
  },
};
