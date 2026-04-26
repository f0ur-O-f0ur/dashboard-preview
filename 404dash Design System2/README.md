# Pulse Design System

**Pulse** is a data-forward dashboard product designed for teams who need high-density analytics at a glance. The design language is warm-minimal — clean and spacious but packed with information when needed.

> No external codebase or Figma was provided. This design system was built from scratch based on user direction: bright, uncommon dashboard design with responsive content views, warm neutral + orange palette, dark sidebar, card-based high-density layout with rich motion.

---

## Product Context

**Pulse** is a SaaS analytics/monitoring dashboard. Core use case: visualizing data streams, KPIs, and operational metrics for internal teams or B2B operators.

- **Primary surface:** Web dashboard (desktop-first, responsive)
- **Target users:** Data analysts, product managers, operations teams
- **Design ethos:** Unusual yet professional — avoid common dashboard tropes

---

## Files in This Project

| Path | Description |
|------|-------------|
| `README.md` | This file — brand overview and system index |
| `colors_and_type.css` | All design tokens as CSS custom properties |
| `SKILL.md` | Agent skill file for AI design use |
| `preview/` | Visual card files for Design System tab |
| `ui_kits/dashboard/` | Full hi-fi dashboard UI kit |
| `assets/` | Icons, logos, and visual assets |

---

## Content Fundamentals

- **Tone:** Confident, data-precise, zero fluff. No exclamation marks. No filler copy.
- **Casing:** Sentence case for labels and descriptions. Title Case for navigation items and page headers only.
- **Voice:** Second person ("your metrics", "your team"). Never first person.
- **Numbers:** Always formatted with locale separators (1,240 not 1240). Use K/M/B abbreviations for large numbers.
- **Emoji:** Never used in UI. Only in documentation or informal contexts.
- **Error messages:** Direct and actionable. "No data for this range" not "Oops, something went wrong!"
- **Empty states:** Describe what will appear here, not generic "Nothing here yet."

### Example copy patterns
- ✅ "Revenue this week — $24,800"
- ✅ "3 alerts need your attention"
- ❌ "Wow! Your dashboard is ready 🎉"
- ❌ "Hmm, we couldn't find anything"

---

## Visual Foundations

### Colors
- **Background:** Warm off-white `#FAFAF8` — not pure white; slightly warm
- **Sidebar:** Near-black `#1C1C1E` — rich dark, slightly warm undertone
- **Accent (primary):** Vivid orange `#FF6B35` — energy, alerts, CTAs
- **Accent (secondary):** Amber `#F5A623` — warnings, highlights
- **Success:** Muted green `#22C55E`
- **Danger:** Clean red `#EF4444`
- **Text primary:** `#1A1A1A`
- **Text secondary:** `#6B6B6B`
- **Border:** `#E8E4DF` — warm-tinted dividers

### Typography
- **Display / Headers:** "DM Sans" (Google Fonts) — geometric, modern, slightly warm
- **Data / Mono:** "DM Mono" — tabular numbers, code, metrics
- **Body:** "DM Sans" Regular/Medium
- **Scale:** 11 / 13 / 15 / 18 / 24 / 32 / 48 / 64px

> ⚠️ Font substitution: No font files were provided. Using DM Sans + DM Mono from Google Fonts as closest match to a warm geometric sans. Please provide `.ttf` or `.woff2` files if you have a specific brand typeface.

### Spacing
- Base unit: **8px**
- Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px
- Card padding: 20px (comfortable) / 16px (dense)
- Sidebar width: 220px collapsed content, 64px icon-only

### Cards
- Background: `#FFFFFF`
- Border: `1px solid #E8E4DF`
- Corner radius: 12px (cards) / 8px (inner elements) / 6px (badges)
- Shadow: `0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)`
- Hover: shadow lifts slightly, `translateY(-1px)`

### Animation & Motion
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` — snappy, expo out
- **Duration:** 150ms (micro), 250ms (transitions), 400ms (reveals), 600ms (charts)
- **Chart entry:** bars/lines animate in from baseline on mount
- **Card hover:** subtle lift + shadow deepen
- **Number counters:** count-up animation on data values
- **Sidebar:** smooth collapse/expand with icon morph
- **No spin loaders** — use skeleton screens instead

### Backgrounds & Texture
- Main canvas: flat warm off-white, no texture
- Sidebar: flat dark, no gradient
- Charts use very subtle `#F5F2EE` grid lines
- Accent areas use very light orange tint `rgba(255, 107, 53, 0.06)`

### Iconography
- **System:** Lucide Icons (CDN) — 1.5px stroke, 20×20 default
- Sidebar icons: 20px
- Inline icons: 16px
- Never filled icons in the main UI — stroke-only
- No emoji substitutes

### Layout
- **Sidebar:** Fixed 220px left, dark `#1C1C1E`
- **Content area:** Fluid, `min-width: 0`, scrollable
- **Top bar:** 56px fixed, white, subtle border-bottom
- **Card grid:** CSS Grid, `repeat(auto-fill, minmax(280px, 1fr))`
- **Responsive:** Sidebar collapses to icon-only at 1024px, hidden at 768px with hamburger

---

## Iconography

Lucide Icons is the primary icon library, loaded from CDN:
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```
Usage: `<i data-lucide="activity" class="icon"></i>` then `lucide.createIcons()`

- Stroke weight: 1.5px default
- Size: 20px for navigation, 16px for inline
- Color: inherits from parent text color
- No filled variants in navigation or data contexts
