# PulseHQ — Git Analytics SaaS Landing Page

> **See your code the way data does.**

A fully animated, production-grade SaaS landing page for a Git analytics product — built with React, Vite, and Tailwind CSS. Every section is interactive, every visual is live-animated, and the entire codebase is optimized for performance and security out of the box.

🔗 **Live Demo:** [pulsehq-swart.vercel.app](https://pulsehq-swart.vercel.app)

---

## Preview

![PulseHQ Hero](https://pulsehq-swart.vercel.app)

---

## What is PulseHQ?

PulseHQ is a concept SaaS product that turns raw GitHub commit history into a living intelligence dashboard. The landing page is designed to communicate that value instantly — with an animated dashboard mockup right in the hero, interactive feature cards, and a step-by-step how-it-works section that auto-cycles through live mockups.

This project was built as a **portfolio piece** demonstrating:
- High-quality frontend engineering with React + Vite
- Complex animation systems without any animation libraries
- Production-level code architecture (code splitting, lazy loading, security headers)
- UI/UX design sensibility for B2B SaaS products

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 8 (OXC minifier) |
| Styling | Tailwind CSS v3 + inline styles |
| Icons | Lucide React |
| Fonts | DM Mono + Syne (Google Fonts) |
| Deployment | Vercel |

---

## Features

### Animated Hero Dashboard
A fully coded dashboard mockup — not a screenshot, not a Figma export. Built entirely in React with:
- **Live commit heatmap** — 24×7 grid with cells randomly updating every 400ms
- **Velocity sparkline** — SVG line chart that adds a new data point every 2 seconds
- **Daily bar chart** — bars animate height transitions on data refresh
- **Recent commits list** — rows cycle through active highlight states
- **Live ping dot** — pulses on every data update

### Interactive Feature Cards (6 total)
Each feature card contains a unique mini-visual that demonstrates the feature it describes:
- **Commit Heatmap** → live mini heatmap with updating cells
- **Focus Hours** → animated SVG radial arc showing peak coding window
- **Repo Health Score** → circular progress ring counting up to a score
- **Team Velocity** → multi-line sparkline with 3 team members
- **Weekly Digest** → fake email preview with embedded bar chart
- **Read-only Access** → GitHub OAuth scope list with visual permission indicators

### Interactive How It Works
Three-step section with auto-cycling (every 4 seconds) and click-to-jump navigation:
- **Step 01** → GitHub OAuth popup mockup
- **Step 02** → Animated repository processing with live progress bar
- **Step 03** → Dashboard "lighting up" on load animation

### Full Page Sections
- Sticky glass navbar with scroll detection and mobile menu
- Animated stats + marquee logo bar
- Testimonials section
- 3-tier pricing (Free / Pro / Team)
- CTA footer with gradient glow

---

## Performance & Optimization

This project ships with optimization baked in at every layer — not added as an afterthought.

**Code Splitting**
Every below-fold section is lazy-loaded via `React.lazy()` + `Suspense`. Only the Hero loads eagerly. Sections arrive as separate chunks:

```
react-core      57 KB gzip   (React + ReactDOM)
icons            4 KB gzip   (Lucide, tree-shaken)
Features         3.6 KB gzip
HowItWorks       3.3 KB gzip
Pricing          1.6 KB gzip
Testimonials     1.1 KB gzip
LogoBar          0.9 KB gzip
Footer           1.2 KB gzip
```

**Rendering**
- `React.memo()` on every component — zero unnecessary re-renders
- Refs over state for animation loops — no render cycles from RAF
- Single unified `requestAnimationFrame` loop in the dashboard — not multiple intervals competing
- Visibility-safe: animations use CSS `will-change` only where needed

**Security Headers** (via `vite.config.js` + `index.html`)
```
Content-Security-Policy
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

**Other**
- Self-hosted font preconnect hints
- OXC minifier (Vite 8 native — faster than esbuild)
- CSS purging via Tailwind content scanning
- Grain overlay via inline SVG data URI — zero external requests
- No exposed API keys (no APIs used)

---

## Project Structure

```
pulsehq/
├── index.html                  # CSP meta, OG tags, favicon SVG
├── vite.config.js              # Build config, security headers, manual chunks
├── tailwind.config.js          # Custom design tokens
└── src/
    ├── main.jsx                # Entry point
    ├── App.jsx                 # Root with lazy section loading
    ├── index.css               # Global styles, keyframes, utilities
    ├── components/
    │   ├── Navbar.jsx          # Sticky glass nav, scroll detection
    │   └── DashboardMockup.jsx # Animated hero dashboard (RAF loop)
    └── sections/
        ├── Hero.jsx            # Two-column hero with dashboard
        ├── LogoBar.jsx         # Stats + marquee logos
        ├── Features.jsx        # 6 cards with live mini visuals
        ├── HowItWorks.jsx      # Interactive 3-step with mockups
        ├── Testimonials.jsx    # 3 developer quotes
        ├── Pricing.jsx         # Free / Pro / Team tiers
        └── Footer.jsx          # CTA band + footer bar
```

---

## Design System

**Colors**
```css
--void:       #050810   /* page background */
--deep:       #080d1a   /* section backgrounds */
--surface:    #0d1526   /* card backgrounds */
--border:     #1a2a45   /* all borders */
--pulse:      #00e5a0   /* primary accent — green */
--cyan:       #00c8ff   /* secondary accent */
--amber:      #f5a623   /* tertiary accent */
--text:       #e2eaf7   /* primary text */
--text-muted: #6b82a8   /* secondary text */
```

**Typography**
- `DM Mono` — all labels, tags, code-like UI, monospace data
- `Syne` — all headings, body copy, CTAs

**Motion Principles**
- Entrance animations are CSS keyframes with staggered `animation-delay`
- Data animations run in a single unified RAF loop
- All intervals return cleanup functions — no memory leaks
- Hover states use CSS `transition` only — no JS on hover

---

## Getting Started

```bash
# Clone
git clone https://github.com/yourusername/pulsehq.git
cd pulsehq

# Install
npm install

# Dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Runs on `http://localhost:5173` by default.

---

## Deployment

This project is deployed on Vercel. To deploy your own:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or drag and drop the `dist/` folder into [vercel.com/new](https://vercel.com/new).

---

## Built With AI Assistance

This project was vibe coded using **Claude (Anthropic)** as a development partner — handling architecture decisions, component design, animation logic, and performance optimization in an iterative, conversational workflow.

The human → AI collaboration covered:
- Concept definition and product narrative
- Design system and aesthetic direction
- Component architecture and code splitting strategy
- Animation system design (RAF loop, CSS keyframes)
- Debugging and iterative refinement

> This is what modern AI-assisted frontend development looks like — not generated slop, but a genuine collaborative build with intentional decisions at every layer.

---

## License

MIT — use it, learn from it, build on it.

---

<div align="center">
  <p>Built by <strong>Devvrat Sharma</strong></p>
  <p>
    <a href="https://pulsehq-swart.vercel.app">Live Demo</a> ·
    <a href="https://contra.com">Contra Profile</a> ·
    <a href="https://linkedin.com">LinkedIn</a>
  </p>
</div>