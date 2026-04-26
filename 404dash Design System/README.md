# 404dash Design System

**404dash** is a modern data analytics dashboard product with dark-first UI, indigo accent palette, and bilingual (Korean + English) support. Inspired by leading dashboard products such as Linear, Vercel, Grafana, and Retool.

---

## Sources

No external codebase or Figma link was provided. This design system was generated from scratch, referencing best-in-class dashboard UI patterns and the user's brand direction.

---

## Products / Surfaces

| Surface | Description |
|---|---|
| `ui_kits/dashboard/` | Main web dashboard application |

---

## CONTENT FUNDAMENTALS

- **Language:** Bilingual — Korean primary, English secondary (labels, tooltips, section headers may use either)
- **Tone:** Clean, professional, data-forward. Not playful. Minimal copy; let numbers speak.
- **Casing:** Sentence case for UI labels (`Total revenue`, not `Total Revenue`). Title case for nav items.
- **Voice:** Second person ("당신의 데이터" → "Your data"). Avoid first-person system messages.
- **Emoji:** Not used in UI. Reserved for status indicators only (e.g. ✅ success states in toasts).
- **Numbers:** Use compact notation (`1.2M`, `34K`, `₩2.4B`) with locale-aware formatting.
- **Vibe:** Precise, trustworthy, minimal. Every element earns its place.

---

## VISUAL FOUNDATIONS

### Colors
- **Background:** `#0F1117` — near-black, slightly blue-tinted
- **Surface 1:** `#1A1D27` — card/panel backgrounds
- **Surface 2:** `#22263A` — elevated modals, popovers
- **Border:** `#2A2D3E` — subtle separators
- **Accent (Indigo):** `#6366F1` — primary actions, selected states, highlights
- **Accent Hover:** `#818CF8` — lighter indigo for hover
- **Success:** `#10B981` (emerald)
- **Warning:** `#F59E0B` (amber)
- **Danger:** `#EF4444` (red)
- **Text Primary:** `#F1F5F9`
- **Text Secondary:** `#94A3B8`
- **Text Muted:** `#475569`

### Typography
- **Display / Headings:** `Geist` (or nearest: `DM Sans`) — weight 500–700, tight tracking
- **Body / UI:** `Geist` — weight 400–500, 14px base
- **Monospace / Data:** `Geist Mono` — for numbers, code, IDs

### Spacing
- Base unit: **4px**. Scale: 4, 8, 12, 16, 24, 32, 48, 64
- Layout gutter: 24px
- Card padding: 20px
- Sidebar width: 220px

### Backgrounds
- No images. No patterns. Pure dark solid backgrounds.
- Subtle grid lines in chart areas only.
- Occasional very faint radial gradient on hero sections (1–2% opacity max).

### Animation
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (spring-like, snappy)
- Duration: 150ms for micro, 250ms for transitions, 400ms for page loads
- No bouncy animations; smooth and controlled
- Chart data: animated draw-in on first load only

### Hover / Press States
- Hover: lighten surface by ~8% or show `#6366F1` at 10% opacity tint
- Active/Press: scale down to `scale(0.97)` + slight darken
- Destructive: red tint overlay on hover

### Borders
- Default: `1px solid #2A2D3E`
- Focus ring: `2px solid #6366F1` with `0 0 0 3px rgba(99,102,241,0.15)` outer glow
- No thick borders; thin lines only

### Shadow System
- **sm:** `0 1px 3px rgba(0,0,0,0.3)`
- **md:** `0 4px 16px rgba(0,0,0,0.4)`
- **lg:** `0 12px 40px rgba(0,0,0,0.5)`
- No white/colored shadows

### Cards
- Background: `#1A1D27`
- Border: `1px solid #2A2D3E`
- Radius: `12px`
- Padding: `20px`
- Shadow: `md`

### Corner Radii
- `xs`: 4px — tags, badges
- `sm`: 6px — buttons, inputs
- `md`: 12px — cards, panels
- `lg`: 16px — modals
- `full`: 9999px — avatars, pills

### Imagery
- No decorative imagery in the UI
- Chart/graph visuals use brand accent colors
- Avatar placeholders: indigo-tinted monogram circles

### Blur / Transparency
- Sidebar uses `backdrop-filter: blur(12px)` with semi-transparent background
- Modal overlays: `rgba(0,0,0,0.6)` backdrop

---

## ICONOGRAPHY

- **Icon system:** Lucide Icons (CDN) — `https://unpkg.com/lucide@latest`
- **Style:** Stroke-based, 1.5px weight, 16×16 or 20×20
- **Usage:** Navigation icons 20px, inline/button icons 16px
- **Color:** Inherit from text color; accent color for active states
- **No emoji icons** in UI chrome

Assets:
- `assets/logo.svg` — 404dash logotype

---

## File Index

| Path | Description |
|---|---|
| `README.md` | This file — brand overview |
| `colors_and_type.css` | CSS custom properties for all design tokens |
| `preview/` | Design system card previews |
| `ui_kits/dashboard/` | Dashboard UI kit (index.html + JSX components) |
| `assets/` | Logos, icons |
| `SKILL.md` | Agent skill definition |
