# Design Decisions — All Solutions Electric LLC

## Tech Stack
**Static HTML + Custom CSS + Vanilla JS**

### Reasoning
- 1 page total → No need for a framework
- Zero dependencies = maximum performance and reliability
- Instant deployment (drag-and-drop or GitHub Pages)
- No build step required
- Full control over every pixel and interaction

---

## Aesthetic Direction

### The Brief
The old website had essentially no content (just "BESbswy" — a Google Fonts test string). This gave full creative latitude to define a strong, premium brand identity for an electrical contractor.

### Visual Concept: **Industrial Bold**
Electrical work = precision, strength, reliability. The aesthetic should communicate:
- Professionalism and trustworthiness
- Physical confidence (not a soft tech startup)
- Premium quality without corporate coldness

### Color Palette
| Role | Color | Reasoning |
|---|---|---|
| Primary / Background | `#1c1c1c` | Near-black. Industrial, serious, premium |
| Accent | `#f0a500` | Amber/gold. Electricity, energy, warmth — avoids generic "danger red" |
| Light Background | `#f8f8f5` | Warm off-white — not stark white, more tactile |
| Alt Background | `#f2f1ec` | Slightly darker warm tone for section variation |

The amber-black combination is distinctive, energetic, and avoids every cliché in the contractor/home services space (generic blue-white).

### Typography
**Bebas Neue** (display) + **Source Sans 3** (body)

- Bebas Neue: Strong, condensed, industrial character. Communicates precision and confidence. Tracks beautifully at large sizes.
- Source Sans 3: Highly legible at small sizes, neutral enough to complement Bebas without competing. Variable weight (300–700) for flexibility.
- Avoided: Inter, Roboto, Arial (explicitly listed as fonts to avoid per brief)

---

## Layout Architecture

### Hero
- Full-viewport-height dark hero with bolt-lightning SVG background element
- Grid overlay (subtle, reinforces "precision/technical")
- Asymmetric 1.2fr / 1fr split on desktop
- Stat cards floating outside the image frame (overlapping)
- Staggered entrance animations: eyebrow → headline → body → CTA → trust items

### Marquee Band
- Separates hero from services
- Uses amber background as strong visual break
- Scrolling service names reinforce offering breadth without adding cognitive load

### Services Grid
- 3-column on desktop, 2-column tablet, 1-column mobile
- Featured card (Panel Upgrades) uses inverted dark treatment for visual hierarchy
- Top-bar accent animation on hover (scale from left)

### Stats
- Dark band with same grid texture as hero — creates visual coherence
- Counter animation triggers on scroll entry

### Why Us
- Asymmetric: tight text block left, numbered list right
- Numbered items with amber numbers add editorial structure
- Avoids generic "icon grid" pattern

### Projects
- Large card spans full width (emphasis), 2 smaller below
- Dark-tinted placeholder backgrounds give depth without needing actual photos

### Contact
- Dark section (same as hero) with form panel on white card
- Creates strong contrast — the form "floats" above the dark background
- Reduces visual noise at point of conversion

---

## Animation Principles

All animations follow the Emil Design Engineering constraints:
- Custom easing only (`cubic-bezier` values, never CSS defaults)
- Hero stagger: 100ms intervals (eyebrow → headline → body → CTA)
- Scroll animations: `IntersectionObserver` with 450ms transitions
- Card hover: `translateY(-4px)` + shadow lift
- Button hover: `translateY(-2px)` + shadow glow
- Button active: `scale(0.97)` at 80ms
- `prefers-reduced-motion` respected globally

---

## Accessibility

- Skip navigation link
- All SVG icons: `aria-hidden="true"` (decorative) or `aria-label` (functional)
- Form fields: associated labels, `aria-required`, `aria-invalid`
- Error messages: `role="alert"` + `aria-live="polite"`
- Success message: `role="alert"`
- Focus styles: 2px solid amber outline, 3px offset
- Hamburger: `aria-expanded`, `aria-controls`, `aria-label` (updates on toggle)
- Touch targets: minimum 44×44px on all interactive elements
- Contrast: amber `#f0a500` on dark `#1c1c1c` = >7:1; text on white backgrounds = >7:1

---

## Content Strategy

No content existed on the old site, so industry-standard electrical contractor content was authored:
- 6 service categories (residential, commercial, panel, EV, emergency, industrial)
- 4 differentiators (licensed, honest pricing, code compliance, reliability)
- 4 project case studies (office fit-out, historic rewire, EV network, industrial)
- 3 testimonials (homeowner, business owner, property manager)
- Complete contact form with service selector

### Contact Form
- Collects: name, phone (required), email (optional), service type, project details
- Client-side validation with accessible error display
- Simulated async submission (1.5s) — replace `setTimeout` with real `fetch()` in production
- Success state with `aria-live` announcement

---

## Production Notes

### To Replace Before Launch
1. Phone number: `(000) 000-0000` → actual business number
2. Email: `info@allsolutionselectric.com` → actual email
3. Hero image placeholder → real team/work photo
4. Project photos → actual completed project images
5. Stats (15+ years, 500+ projects) → verify with client
6. License number → add to footer if required by state
7. Service area → add city/state to hero eyebrow and footer
8. Form backend → connect to Formspree, Netlify Forms, or custom API
9. Google Analytics / tracking → add if desired
10. Address → add to footer if public-facing business

---

## Files

```
website/
├── index.html          ← Single page, complete
├── assets/
│   ├── css/
│   │   └── main.css    ← All styles (no dependencies)
│   └── js/
│       └── main.js     ← All interactions
├── design_decisions.md ← This file
└── README.md           ← Deployment guide
```