# ☕ Napuccino — The Ultimate Coffee Nap Optimizer

Napuccino is a premium, scientifically calibrated React web application powered by **Bun** and styled with **Tailwind CSS**. It is designed to help professionals, athletes, and students optimize their nap routines by matching caffeine metabolic absorption curves with specific neural sleep pressure stages.

---

## 🧬 The Napuccino Science

A **coffee nap** is the synergistic combination of drinking caffeine and taking a short sleep session:
1. **Sleep Pressure Clearance**: Throughout the day, **adenosine** builds up in your brain, causing tiredness. Sleeping for 15-20 minutes sweeps this adenosine away.
2. **The Caffeine Lag**: Ingested caffeine takes exactly **20 to 30 minutes** to absorb through your digestive tract and enter your brain.
3. **Flawless Binding**: When you wake up at minute 20, the caffeine arrives at your brain receptors. Because the nap cleared out the competing adenosine, the caffeine binds with maximum efficacy, producing a double-boost of cognitive energy and alertness with zero sleep inertia.

---

## 🌌 Features & Pages

The application is structured as a fluid, state-retaining Single Page Application (SPA) with three dedicated modules:

### 1. The Cafe Bar (Home)
- An inviting banner introducing the coffee nap methodology.
- Deep comparative overview of our three mathematically locked nap styles.
- A quick, visual 3-step guide detailing the "30-Second Science".

### 2. The Brew Chamber (Timer)
- Toggle between **Napuccino** (20m), **Power Nap** (15m), and **Consolidation Block** (45m).
- **Calming Pre-Countdown (2.5 mins)**: A beautiful pulsing breathing visual guide to assist you in falling asleep.
- **Synthesized Ambient Loops**: Self-contained audio engines built on the browser **Web Audio API** (Cozy Cafe, Gentle Rain, Pink Noise, or Silence).
- **Gradual harp wake-up chime**: Smoothly fades in over 10 seconds to ensure a non-jarring alert.
- **Developer Sandbox**: Fast-forward timers for instant manual code validation.

### 3. The Science Center (Education)
- Interactive, rich accordion cards explaining adenosine buildup, deep sleep stages, and caffeine absorption paths.
- Infographic tables contrasting Coffee-alone, Sleep-alone, and Napuccino effects.

---

## ⚡ Technical Architecture & Debloating

This repository has been audited and fully optimized to eliminate all boilerplate bloat:
- **Clean Dependency Tree**: Removed unused layout packages (`@radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge`) from `package.json` to keep bundling ultra-light.
- **Zero Asset Overhead**: Boils down asset requests to a single bespoke, custom-designed `logo.svg` representing a steaming coffee cup and golden crescent moon.
- **Dynamic Theming**: Support for **Café au Lait (Light Mode)** and **Dark Espresso (Dark Mode)**, persisting states via `localStorage`.

---

## ⚙️ Running Locally

### Install Dependencies
```bash
bun install
```

### Start Development Server (with HMR)
```bash
bun dev
```

### Build for Production
```bash
bun run build
```

### Run Production Server
```bash
bun start
```
