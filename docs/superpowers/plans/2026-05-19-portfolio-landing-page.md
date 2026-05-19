# Portfolio Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static HTML landing page at `vibecoding-for-nondeveloper/portfolio/` that introduces the ROBOCO non-developer vibe coding workshop to HR/L&D buyers, with 5 hi-fi SaaS UI mockups as the visual centerpiece.

**Architecture:** Single-page vertical-scroll landing page with 6 sections. No build step — pure HTML/CSS/JS/SVG. Design tokens via CSS custom properties enable consistent styling and dark mode. Mockups are inline SVG referenced from `assets/mockups/`. Deployed via GitHub Pages and as a standalone ZIP.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), SVG, Vanilla JS (IntersectionObserver). System font stack with Pretendard fallback. No external dependencies.

**Reference Spec:** [docs/superpowers/specs/2026-05-19-portfolio-slides-design.md](../specs/2026-05-19-portfolio-slides-design.md)

**Important — Placeholder:** The spec defers the actual contact email. This plan uses `hello@roboco.io` as a placeholder in code. A grep-able `<!-- TODO-EMAIL -->` marker is placed next to each occurrence. Replace before final deployment.

---

## File Structure

```
vibecoding-for-nondeveloper/portfolio/
├── index.html                 ← Main landing page (single file, ~350 lines)
├── styles.css                 ← Design tokens + component styles (~400 lines)
├── scripts.js                 ← IntersectionObserver fade-in (~30 lines)
├── README.md                  ← Maintenance guide (~50 lines)
└── assets/
    ├── favicon.svg            ← ROBOCO mark (10 lines)
    ├── og-image.svg           ← Open Graph card source (will be rasterized)
    └── mockups/
        ├── 01-cs-agent.svg
        ├── 02-research.svg
        ├── 03-document.svg
        ├── 04-budget.svg
        └── 05-qa.svg
```

**File responsibilities**

| File | Responsibility |
|------|----------------|
| `index.html` | Page structure, all 6 sections, meta tags, inline SVG references |
| `styles.css` | Design tokens (CSS variables), component styles, responsive grid |
| `scripts.js` | Scroll-triggered fade-in via IntersectionObserver |
| `assets/mockups/*.svg` | One SaaS UI mockup per workshop project |
| `assets/favicon.svg` | Browser tab icon — ROBOCO mark |
| `assets/og-image.svg` | Source for og-image.png; rasterized via script |
| `README.md` | How to edit, build, deploy |

**Edits to existing files**

| File | Change |
|------|--------|
| `_config.yml` | Remove `vibecoding-for-nondeveloper/portfolio/` from `exclude` list (it's included by default if not excluded) |

---

## Task 1: Scaffold directory and base HTML/CSS skeleton

**Files:**
- Create: `vibecoding-for-nondeveloper/portfolio/index.html`
- Create: `vibecoding-for-nondeveloper/portfolio/styles.css`
- Create: `vibecoding-for-nondeveloper/portfolio/scripts.js`
- Create: `vibecoding-for-nondeveloper/portfolio/assets/favicon.svg`
- Create: `vibecoding-for-nondeveloper/portfolio/assets/mockups/.gitkeep`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p vibecoding-for-nondeveloper/portfolio/assets/mockups
touch vibecoding-for-nondeveloper/portfolio/assets/mockups/.gitkeep
```

- [ ] **Step 2: Create minimum viable index.html**

Write to `vibecoding-for-nondeveloper/portfolio/index.html`:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>비개발자 바이브 코딩 워크숍 | ROBOCO</title>
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main>
    <h1>비개발자 바이브 코딩 워크숍</h1>
    <p>Loading content...</p>
  </main>
  <script src="scripts.js" defer></script>
</body>
</html>
```

- [ ] **Step 3: Create empty styles.css and scripts.js**

Write to `vibecoding-for-nondeveloper/portfolio/styles.css`:

```css
/* Design tokens and styles — see Task 2 onwards */
```

Write to `vibecoding-for-nondeveloper/portfolio/scripts.js`:

```javascript
// IntersectionObserver fade-in — see Task 13
```

- [ ] **Step 4: Create favicon.svg**

Write to `vibecoding-for-nondeveloper/portfolio/assets/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#5B5BD6"/>
  <text x="16" y="22" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="white">R</text>
</svg>
```

- [ ] **Step 5: Verify file structure and open in browser**

```bash
ls -la vibecoding-for-nondeveloper/portfolio/
open vibecoding-for-nondeveloper/portfolio/index.html
```

Expected: Browser opens showing "비개발자 바이브 코딩 워크숍" heading and favicon. No console errors.

- [ ] **Step 6: Commit**

```bash
git add vibecoding-for-nondeveloper/portfolio/
git commit -m "Scaffold portfolio landing page directory"
```

---

## Task 2: Design tokens — CSS custom properties

**Files:**
- Modify: `vibecoding-for-nondeveloper/portfolio/styles.css` (full overwrite)

- [ ] **Step 1: Write design token CSS**

Overwrite `vibecoding-for-nondeveloper/portfolio/styles.css`:

```css
/* ============================================================
   Design Tokens
   ============================================================ */

:root {
  /* Base */
  --bg: #FFFFFF;
  --bg-elevated: #FAFAFA;
  --bg-subtle: #F5F5F5;

  /* Text */
  --text-primary: #0A0A0A;
  --text-secondary: #525252;
  --text-tertiary: #A3A3A3;

  /* Borders */
  --border: #E5E7EB;
  --border-strong: #D4D4D8;

  /* Accent */
  --accent: #5B5BD6;
  --accent-hover: #4747B8;
  --accent-subtle: #EEF0FF;

  /* Status */
  --status-info: #2563EB;
  --status-error: #DC2626;
  --status-warn: #D97706;
  --status-success: #059669;
  --status-neutral: #71717A;

  /* Typography scale */
  --text-display: 56px;
  --text-h1: 40px;
  --text-h2: 28px;
  --text-h3: 20px;
  --text-body: 16px;
  --text-sm: 14px;
  --text-meta: 12px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  /* Radius */
  --radius-sm: 4px;
  --radius: 8px;
  --radius-lg: 16px;

  /* Container */
  --container: 1200px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0A0A0A;
    --bg-elevated: #171717;
    --bg-subtle: #262626;
    --text-primary: #FAFAFA;
    --text-secondary: #A3A3A3;
    --text-tertiary: #525252;
    --border: #262626;
    --border-strong: #404040;
    --accent: #818CF8;
    --accent-hover: #A5B4FC;
    --accent-subtle: #1E1B4B;
  }
}

/* ============================================================
   Reset + Base
   ============================================================ */

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family:
    Pretendard,
    -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto,
    "Helvetica Neue", Arial,
    sans-serif;
  font-size: var(--text-body);
  line-height: 1.6;
  color: var(--text-primary);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6, p {
  margin: 0;
}

a {
  color: var(--accent);
  text-decoration: none;
  transition: color 120ms ease;
}

a:hover {
  color: var(--accent-hover);
}

img, svg {
  display: block;
  max-width: 100%;
  height: auto;
}

/* ============================================================
   Layout container
   ============================================================ */

.container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* Component styles continue in Task 3 */
```

- [ ] **Step 2: Reload browser and verify**

```bash
open vibecoding-for-nondeveloper/portfolio/index.html
```

Expected: Page background is white in light mode / near-black in dark mode. Text color follows. No layout yet — H1 uses base styles.

- [ ] **Step 3: Validate CSS for syntax**

```bash
node -e "const css = require('fs').readFileSync('vibecoding-for-nondeveloper/portfolio/styles.css', 'utf8'); const m = css.match(/{[^}]*$/); if (m) { console.error('Unclosed brace near:', m[0].slice(0,80)); process.exit(1); } else { console.log('Brace check OK'); }"
```

Expected: `Brace check OK`

- [ ] **Step 4: Commit**

```bash
git add vibecoding-for-nondeveloper/portfolio/styles.css
git commit -m "Add design tokens and base styles"
```

---

## Task 3: Component base styles

**Files:**
- Modify: `vibecoding-for-nondeveloper/portfolio/styles.css` (append)

- [ ] **Step 1: Append component styles to styles.css**

Append to `vibecoding-for-nondeveloper/portfolio/styles.css`:

```css
/* ============================================================
   Buttons
   ============================================================ */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-sm);
  font-weight: 500;
  line-height: 1;
  border-radius: var(--radius);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease, border-color 120ms ease;
  text-decoration: none;
  white-space: nowrap;
}

.btn-primary {
  height: 40px;
  background: var(--accent);
  color: white;
}

.btn-primary:hover {
  background: var(--accent-hover);
  color: white;
}

.btn-secondary {
  height: 36px;
  background: transparent;
  color: var(--text-primary);
  border-color: var(--border);
}

.btn-secondary:hover {
  border-color: var(--border-strong);
  color: var(--text-primary);
}

/* ============================================================
   Card
   ============================================================ */

.card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--space-6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: border-color 120ms ease;
}

.card:hover {
  border-color: var(--border-strong);
}

/* ============================================================
   Badge
   ============================================================ */

.badge {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 var(--space-2);
  font-size: var(--text-meta);
  font-weight: 500;
  border-radius: var(--radius-sm);
  background: var(--bg-subtle);
  color: var(--text-secondary);
}

.badge-info    { background: rgba(37, 99, 235, 0.1);  color: var(--status-info); }
.badge-error   { background: rgba(220, 38, 38, 0.1);  color: var(--status-error); }
.badge-warn    { background: rgba(217, 119, 6, 0.1);  color: var(--status-warn); }
.badge-success { background: rgba(5, 150, 105, 0.1);  color: var(--status-success); }

/* ============================================================
   Typography utilities
   ============================================================ */

.display { font-size: var(--text-display); line-height: 1.05; letter-spacing: -0.02em; font-weight: 700; }
.h1      { font-size: var(--text-h1);      line-height: 1.1;  letter-spacing: -0.015em; font-weight: 700; }
.h2      { font-size: var(--text-h2);      line-height: 1.2;  letter-spacing: -0.01em;  font-weight: 600; }
.h3      { font-size: var(--text-h3);      line-height: 1.3;  font-weight: 600; }
.body    { font-size: var(--text-body);    line-height: 1.6; }
.sm      { font-size: var(--text-sm);      line-height: 1.5; }
.meta    { font-size: var(--text-meta);    line-height: 1.4; letter-spacing: 0.02em; color: var(--text-secondary); }

.text-secondary { color: var(--text-secondary); }
.text-tertiary  { color: var(--text-tertiary); }

/* ============================================================
   Scroll fade-in (used by scripts.js in Task 13)
   ============================================================ */

.fade-in {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 400ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .fade-in {
    transform: none;
    transition: opacity 200ms ease;
  }
}

/* ============================================================
   Focus ring (accessibility)
   ============================================================ */

a:focus-visible,
.btn:focus-visible,
button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: var(--radius);
}

/* ============================================================
   Section base
   ============================================================ */

.section {
  padding: var(--space-24) 0;
  border-bottom: 1px solid var(--border);
}

.section:last-of-type {
  border-bottom: none;
}

@media (max-width: 640px) {
  .section { padding: var(--space-16) 0; }
}
```

- [ ] **Step 2: Update index.html to use new utilities (smoke test)**

Modify `vibecoding-for-nondeveloper/portfolio/index.html` body content:

```html
<main class="container">
  <h1 class="display">비개발자 바이브 코딩 워크숍</h1>
  <p class="body text-secondary">Component smoke test</p>
  <div style="display: flex; gap: 12px; margin-top: 24px;">
    <a href="#" class="btn btn-primary">Primary Button</a>
    <a href="#" class="btn btn-secondary">Secondary Button</a>
    <span class="badge badge-info">사양</span>
    <span class="badge badge-error">버그</span>
  </div>
</main>
```

- [ ] **Step 3: Open in browser and verify components render**

```bash
open vibecoding-for-nondeveloper/portfolio/index.html
```

Expected: Large display heading visible, primary button (indigo bg + white text), secondary button (transparent + border), two badges with info/error colors. No console errors.

- [ ] **Step 4: Commit**

```bash
git add vibecoding-for-nondeveloper/portfolio/styles.css vibecoding-for-nondeveloper/portfolio/index.html
git commit -m "Add component base styles (button, card, badge, typography)"
```

---

## Task 4: SVG Mockup 01 — CS Inquiry Agent

**Files:**
- Create: `vibecoding-for-nondeveloper/portfolio/assets/mockups/01-cs-agent.svg`

- [ ] **Step 1: Write the SVG**

Write to `vibecoding-for-nondeveloper/portfolio/assets/mockups/01-cs-agent.svg`:

```svg
<svg viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="CS 문의 자동 분류 에이전트 UI 콘셉트">
  <title>CS 문의 자동 분류 에이전트</title>
  <desc>좌측 문의 리스트, 우측 분류 결과·근거·응답 초안</desc>
  <defs>
    <style>
      .bg          { fill: #FFFFFF; }
      .bg-elev     { fill: #FAFAFA; }
      .border      { stroke: #E5E7EB; stroke-width: 1; fill: none; }
      .text-primary   { fill: #0A0A0A; font-family: Pretendard, system-ui, sans-serif; }
      .text-secondary { fill: #525252; font-family: Pretendard, system-ui, sans-serif; }
      .text-tertiary  { fill: #A3A3A3; font-family: Pretendard, system-ui, sans-serif; }
      .accent      { fill: #5B5BD6; }
      .accent-soft { fill: #EEF0FF; }
      .badge-bug   { fill: #DC2626; }
      .badge-soft  { fill: rgba(220, 38, 38, 0.1); }
      .dot-on      { fill: #5B5BD6; }
      .dot-off     { fill: #E5E7EB; }
    </style>
  </defs>

  <!-- Outer frame -->
  <rect class="bg" x="0" y="0" width="1600" height="1000" rx="12"/>
  <rect class="border" x="0.5" y="0.5" width="1599" height="999" rx="12"/>

  <!-- Top header -->
  <rect class="bg-elev" x="0" y="0" width="1600" height="64"/>
  <line x1="0" y1="64" x2="1600" y2="64" stroke="#E5E7EB"/>
  <circle class="accent" cx="32" cy="32" r="6"/>
  <text class="text-primary" x="48" y="36" font-size="16" font-weight="600">CS Inbox</text>
  <text class="text-tertiary" x="1480" y="36" font-size="14">serithemage@…</text>

  <!-- Split: left list 480, right panel 1120 -->
  <line x1="480" y1="64" x2="480" y2="1000" stroke="#E5E7EB"/>

  <!-- Left list header -->
  <text class="text-primary" x="32" y="108" font-size="14" font-weight="600">신규</text>
  <text class="text-secondary" x="80" y="108" font-size="14">12</text>
  <line x1="32" y1="124" x2="448" y2="124" stroke="#E5E7EB"/>

  <!-- Left list items -->
  <g font-family="Pretendard, system-ui, sans-serif">
    <!-- item 1 (active) -->
    <rect class="accent-soft" x="16" y="140" width="448" height="56" rx="8"/>
    <circle class="accent" cx="36" cy="168" r="4"/>
    <text class="text-primary" x="56" y="164" font-size="14" font-weight="500">#0341  4분</text>
    <text class="text-secondary" x="56" y="184" font-size="13">"로그인이 자꾸 풀려요…"</text>
    <!-- item 2 -->
    <circle class="accent" cx="36" cy="228" r="4"/>
    <text class="text-primary" x="56" y="224" font-size="14" font-weight="500">#0340  12분</text>
    <text class="text-secondary" x="56" y="244" font-size="13">"엑셀 다운로드가…"</text>
    <!-- item 3 -->
    <text class="text-secondary" x="56" y="284" font-size="14">#0338  1시간</text>
    <!-- item 4 -->
    <text class="text-secondary" x="56" y="324" font-size="14">#0337  2시간</text>
    <!-- item 5 -->
    <text class="text-secondary" x="56" y="364" font-size="14">#0336  3시간</text>
    <!-- item 6 -->
    <text class="text-secondary" x="56" y="404" font-size="14">#0335  3시간</text>
  </g>
  <line x1="32" y1="440" x2="448" y2="440" stroke="#E5E7EB"/>
  <text class="text-primary" x="32" y="468" font-size="14" font-weight="600">처리 중</text>
  <text class="text-secondary" x="96" y="468" font-size="14">5</text>
  <text class="text-primary" x="32" y="496" font-size="14" font-weight="600">완료</text>
  <text class="text-secondary" x="80" y="496" font-size="14">187</text>

  <!-- Right panel -->
  <text class="text-primary" x="520" y="108" font-size="20" font-weight="700">#2026-0341</text>
  <line x1="520" y1="128" x2="1568" y2="128" stroke="#E5E7EB"/>

  <!-- Classification result -->
  <text class="text-secondary" x="520" y="170" font-size="13" letter-spacing="0.5">분류 결과</text>
  <rect class="badge-soft" x="660" y="154" width="84" height="22" rx="4"/>
  <text class="badge-bug" x="668" y="170" font-size="12" font-weight="500">버그 의심</text>
  <text class="text-secondary" x="760" y="170" font-size="13">확신도</text>
  <g transform="translate(820, 164)">
    <circle class="dot-on"  cx="0"  cy="0" r="4"/>
    <circle class="dot-on"  cx="12" cy="0" r="4"/>
    <circle class="dot-on"  cx="24" cy="0" r="4"/>
    <circle class="dot-off" cx="36" cy="0" r="4"/>
    <circle class="dot-off" cx="48" cy="0" r="4"/>
  </g>

  <!-- Grounds -->
  <text class="text-secondary" x="520" y="220" font-size="13" letter-spacing="0.5">근거</text>
  <text class="text-primary" x="520" y="248" font-size="14">매뉴얼 v2.3 / 3.1.2절 "세션 관리"</text>
  <text class="text-primary" x="520" y="272" font-size="14">관련 이슈 3건 누적 (#0298, #0312, #0334)</text>

  <!-- Draft -->
  <text class="text-secondary" x="520" y="324" font-size="13" letter-spacing="0.5">응답 초안</text>
  <rect class="bg-elev" x="520" y="340" width="1048" height="200" rx="8"/>
  <rect class="border" x="520.5" y="340.5" width="1047" height="199" rx="8"/>
  <text class="text-primary" x="544" y="372" font-size="14">안녕하세요, OOO 고객님.</text>
  <text class="text-primary" x="544" y="396" font-size="14">알려주신 증상은 알려진 이슈로 보입니다.</text>
  <text class="text-primary" x="544" y="420" font-size="14">아래 단계를 따라 다시 시도해 주시고, 동일 증상이 지속되면</text>
  <text class="text-primary" x="544" y="444" font-size="14">재현 단계를 회신 부탁드립니다.</text>
  <text class="text-tertiary" x="544" y="500" font-size="13">— ROBOCO 솔루션 CS팀</text>

  <!-- Action buttons -->
  <g transform="translate(520, 568)">
    <rect class="bg-elev" x="0" y="0" width="64" height="36" rx="8"/>
    <rect class="border" x="0.5" y="0.5" width="63" height="35" rx="8"/>
    <text class="text-primary" x="32" y="22" font-size="13" text-anchor="middle">복사</text>
    <rect class="bg-elev" x="76" y="0" width="64" height="36" rx="8"/>
    <rect class="border" x="76.5" y="0.5" width="63" height="35" rx="8"/>
    <text class="text-primary" x="108" y="22" font-size="13" text-anchor="middle">수정</text>
    <rect class="accent" x="152" y="0" width="88" height="36" rx="8"/>
    <text x="196" y="22" font-size="13" fill="white" font-weight="500" text-anchor="middle">발송 →</text>
  </g>

  <!-- Watermark -->
  <text class="text-tertiary" x="1568" y="980" font-size="11" text-anchor="end" letter-spacing="0.5">ROBOCO ✕ Vibe Coding Workshop</text>
</svg>
```

- [ ] **Step 2: Validate SVG XML**

```bash
xmllint --noout vibecoding-for-nondeveloper/portfolio/assets/mockups/01-cs-agent.svg && echo "OK"
```

Expected: `OK`

- [ ] **Step 3: Embed in index.html for visual check**

Temporarily replace `<main>` content in index.html with:

```html
<main class="container">
  <img src="assets/mockups/01-cs-agent.svg" alt="CS Inquiry Agent mockup" style="border: 1px solid var(--border); border-radius: 8px;">
</main>
```

- [ ] **Step 4: Open in browser and verify visual**

```bash
open vibecoding-for-nondeveloper/portfolio/index.html
```

Expected: Mockup renders with header, left inquiry list (with one item highlighted in accent-soft background), right panel showing #2026-0341 with classification badge, confidence dots, response draft box, and action buttons. ROBOCO watermark at bottom right.

- [ ] **Step 5: Commit**

```bash
git add vibecoding-for-nondeveloper/portfolio/assets/mockups/01-cs-agent.svg
git commit -m "Add SVG mockup 01: CS inquiry classification agent"
```

---

## Task 5: SVG Mockup 02 — Competitor Research

**Files:**
- Create: `vibecoding-for-nondeveloper/portfolio/assets/mockups/02-research.svg`

- [ ] **Step 1: Write the SVG**

Write to `vibecoding-for-nondeveloper/portfolio/assets/mockups/02-research.svg`:

```svg
<svg viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="경쟁사·시장 리서치 자동 취합 UI 콘셉트">
  <title>경쟁사·시장 리서치 자동 취합</title>
  <desc>상단 자료 메타 + 중앙 비교표 + 우측 인사이트 패널</desc>
  <defs>
    <style>
      .bg       { fill: #FFFFFF; }
      .bg-elev  { fill: #FAFAFA; }
      .bg-row   { fill: #FAFAFA; }
      .border   { stroke: #E5E7EB; stroke-width: 1; fill: none; }
      .text-primary   { fill: #0A0A0A; font-family: Pretendard, system-ui, sans-serif; }
      .text-secondary { fill: #525252; font-family: Pretendard, system-ui, sans-serif; }
      .text-tertiary  { fill: #A3A3A3; font-family: Pretendard, system-ui, sans-serif; }
      .accent   { fill: #5B5BD6; }
      .warn     { fill: #D97706; }
      .dot-on   { fill: #5B5BD6; }
      .dot-off  { fill: #E5E7EB; }
      .insight  { fill: #EEF0FF; }
    </style>
  </defs>

  <rect class="bg" x="0" y="0" width="1600" height="1000" rx="12"/>
  <rect class="border" x="0.5" y="0.5" width="1599" height="999" rx="12"/>

  <!-- Header -->
  <rect class="bg-elev" x="0" y="0" width="1600" height="64"/>
  <line x1="0" y1="64" x2="1600" y2="64" stroke="#E5E7EB"/>
  <circle class="accent" cx="32" cy="32" r="6"/>
  <text class="text-primary" x="48" y="36" font-size="16" font-weight="600">Research</text>
  <rect class="accent" x="1432" y="16" width="136" height="32" rx="8"/>
  <text fill="white" x="1500" y="36" font-size="13" font-weight="500" text-anchor="middle">새 리서치 +</text>

  <!-- Input meta bar -->
  <text class="text-secondary" x="32" y="104" font-size="13">투입 자료:</text>
  <text class="text-primary" x="128" y="104" font-size="14">📎 URL 3</text>
  <text class="text-primary" x="220" y="104" font-size="14">📄 PDF 2</text>
  <text class="text-primary" x="316" y="104" font-size="14">📝 메모 5</text>

  <text class="text-secondary" x="32" y="132" font-size="13">비교 차원:</text>
  <text class="text-primary" x="128" y="132" font-size="14">타겟 / 가격 / 핵심기능 / 차별점 / UX / 시장지위</text>

  <line x1="0" y1="160" x2="1600" y2="160" stroke="#E5E7EB"/>

  <!-- Split: comparison 1120 + insights 480 -->
  <line x1="1120" y1="160" x2="1120" y2="1000" stroke="#E5E7EB"/>

  <!-- Comparison table header -->
  <g font-family="Pretendard, system-ui, sans-serif">
    <text class="text-tertiary" x="32" y="208" font-size="12" letter-spacing="0.5">차원</text>
    <text class="text-primary"  x="220" y="208" font-size="14" font-weight="600" text-anchor="middle">Acme</text>
    <text class="text-primary"  x="380" y="208" font-size="14" font-weight="600" text-anchor="middle">Beta</text>
    <text class="text-primary"  x="540" y="208" font-size="14" font-weight="600" text-anchor="middle">Gamma</text>
    <text class="text-primary"  x="700" y="208" font-size="14" font-weight="600" text-anchor="middle">Delta</text>
    <text class="text-primary"  x="860" y="208" font-size="14" font-weight="600" text-anchor="middle">Epsilon</text>
  </g>
  <line x1="16" y1="224" x2="1088" y2="224" stroke="#E5E7EB"/>

  <!-- Rows -->
  <g font-size="14" font-family="Pretendard, system-ui, sans-serif">
    <text class="text-secondary" x="32"  y="256">타겟</text>
    <text class="text-primary"   x="220" y="256" text-anchor="middle">엔터프</text>
    <text class="text-primary"   x="380" y="256" text-anchor="middle">중소</text>
    <text class="text-primary"   x="540" y="256" text-anchor="middle">스타트업</text>
    <text class="text-primary"   x="700" y="256" text-anchor="middle">엔터프</text>
    <text class="text-primary"   x="860" y="256" text-anchor="middle">중소</text>

    <text class="text-secondary" x="32"  y="296">가격</text>
    <text class="text-primary"   x="220" y="296" text-anchor="middle">$$$$</text>
    <text class="text-primary"   x="380" y="296" text-anchor="middle">$$$</text>
    <text class="text-primary"   x="540" y="296" text-anchor="middle">$</text>
    <text class="text-primary"   x="700" y="296" text-anchor="middle">$$$$</text>
    <text class="text-primary"   x="860" y="296" text-anchor="middle">$$</text>
  </g>

  <!-- 핵심기능 row with dots -->
  <text class="text-secondary" x="32" y="336" font-size="14">핵심기능</text>
  <g transform="translate(220, 332)">
    <circle class="dot-on"  cx="-24" cy="0" r="4"/><circle class="dot-on"  cx="-12" cy="0" r="4"/>
    <circle class="dot-on"  cx="0"   cy="0" r="4"/><circle class="dot-off" cx="12"  cy="0" r="4"/>
    <circle class="dot-off" cx="24"  cy="0" r="4"/>
  </g>
  <g transform="translate(380, 332)">
    <circle class="dot-on"  cx="-24" cy="0" r="4"/><circle class="dot-on"  cx="-12" cy="0" r="4"/>
    <circle class="dot-on"  cx="0"   cy="0" r="4"/><circle class="dot-on"  cx="12"  cy="0" r="4"/>
    <circle class="dot-off" cx="24"  cy="0" r="4"/>
  </g>
  <g transform="translate(540, 332)">
    <circle class="dot-on"  cx="-24" cy="0" r="4"/><circle class="dot-on"  cx="-12" cy="0" r="4"/>
    <circle class="dot-off" cx="0"   cy="0" r="4"/><circle class="dot-off" cx="12"  cy="0" r="4"/>
    <circle class="dot-off" cx="24"  cy="0" r="4"/>
  </g>
  <g transform="translate(700, 332)">
    <circle class="dot-on"  cx="-24" cy="0" r="4"/><circle class="dot-on"  cx="-12" cy="0" r="4"/>
    <circle class="dot-on"  cx="0"   cy="0" r="4"/><circle class="dot-off" cx="12"  cy="0" r="4"/>
    <circle class="dot-off" cx="24"  cy="0" r="4"/>
  </g>
  <g transform="translate(860, 332)">
    <circle class="dot-on"  cx="-24" cy="0" r="4"/><circle class="dot-on"  cx="-12" cy="0" r="4"/>
    <circle class="dot-on"  cx="0"   cy="0" r="4"/><circle class="dot-on"  cx="12"  cy="0" r="4"/>
    <circle class="dot-on"  cx="24"  cy="0" r="4"/>
  </g>

  <g font-size="14" font-family="Pretendard, system-ui, sans-serif">
    <text class="text-secondary" x="32"  y="376">차별점</text>
    <text class="text-primary"   x="220" y="376" text-anchor="middle">보안</text>
    <text class="text-primary"   x="380" y="376" text-anchor="middle">UX</text>
    <text class="text-primary"   x="540" y="376" text-anchor="middle">속도</text>
    <text class="text-primary"   x="700" y="376" text-anchor="middle">SI</text>
    <text class="text-primary"   x="860" y="376" text-anchor="middle">가격</text>

    <text class="text-secondary" x="32"  y="416">UX</text>
    <text class="warn"           x="220" y="416" text-anchor="middle">⚠ 확인</text>
    <text class="text-primary"   x="380" y="416" text-anchor="middle">●●●●○</text>
    <text class="text-primary"   x="540" y="416" text-anchor="middle">●●●○○</text>
    <text class="warn"           x="700" y="416" text-anchor="middle">⚠ 확인</text>
    <text class="text-primary"   x="860" y="416" text-anchor="middle">●●●○○</text>

    <text class="text-secondary" x="32"  y="456">시장지위</text>
    <text class="text-primary"   x="220" y="456" text-anchor="middle">1위</text>
    <text class="text-primary"   x="380" y="456" text-anchor="middle">3위</text>
    <text class="text-primary"   x="540" y="456" text-anchor="middle">신규</text>
    <text class="text-primary"   x="700" y="456" text-anchor="middle">2위</text>
    <text class="text-primary"   x="860" y="456" text-anchor="middle">4위</text>
  </g>

  <!-- Footer note below table -->
  <line x1="16" y1="500" x2="1088" y2="500" stroke="#E5E7EB"/>
  <text class="warn" x="32" y="540" font-size="13">⚠ 추가 리서치 필요: Acme·Delta UX 분석 / Beta 가격 정책 세부</text>

  <!-- Insights panel -->
  <text class="text-secondary" x="1152" y="200" font-size="14" font-weight="600">💡 인사이트</text>
  <line x1="1152" y1="216" x2="1568" y2="216" stroke="#E5E7EB"/>
  <g font-family="Pretendard, system-ui, sans-serif" font-size="14">
    <rect class="insight" x="1152" y="240" width="416" height="80" rx="8"/>
    <text class="text-primary" x="1168" y="264" font-weight="500">• Acme·Delta는 공통 엔터프 타겟</text>
    <text class="text-secondary" x="1184" y="288" font-size="13">→ 가격 경쟁이 발생할 가능성</text>

    <rect class="insight" x="1152" y="336" width="416" height="80" rx="8"/>
    <text class="text-primary" x="1168" y="360" font-weight="500">• Epsilon UX 공백 발견</text>
    <text class="text-secondary" x="1184" y="384" font-size="13">→ UI 패턴 5종 공통 식별</text>

    <rect class="insight" x="1152" y="432" width="416" height="80" rx="8"/>
    <text class="text-primary" x="1168" y="456" font-weight="500">• Gamma 신규 진입</text>
    <text class="text-secondary" x="1184" y="480" font-size="13">→ 속도 차별점 모니터링 권장</text>
  </g>

  <!-- Watermark -->
  <text class="text-tertiary" x="1568" y="980" font-size="11" text-anchor="end" letter-spacing="0.5">ROBOCO ✕ Vibe Coding Workshop</text>
</svg>
```

- [ ] **Step 2: Validate SVG XML**

```bash
xmllint --noout vibecoding-for-nondeveloper/portfolio/assets/mockups/02-research.svg && echo "OK"
```

Expected: `OK`

- [ ] **Step 3: Visual check in browser**

Update index.html `<main>` to:

```html
<main class="container">
  <img src="assets/mockups/02-research.svg" alt="Research mockup" style="border: 1px solid var(--border); border-radius: 8px;">
</main>
```

```bash
open vibecoding-for-nondeveloper/portfolio/index.html
```

Expected: Comparison table with 5 competitors × 6 dimensions, ⚠ markers on UX missing cells, 3 insight cards on the right.

- [ ] **Step 4: Commit**

```bash
git add vibecoding-for-nondeveloper/portfolio/assets/mockups/02-research.svg
git commit -m "Add SVG mockup 02: competitor research aggregator"
```

---

## Task 6: SVG Mockup 03 — Document Draft Generator

**Files:**
- Create: `vibecoding-for-nondeveloper/portfolio/assets/mockups/03-document.svg`

- [ ] **Step 1: Write the SVG**

Write to `vibecoding-for-nondeveloper/portfolio/assets/mockups/03-document.svg`:

```svg
<svg viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="문서·보고서 초안 생성기 UI 콘셉트">
  <title>문서·보고서 초안 생성기</title>
  <desc>좌측 인터뷰 답변, 중앙 초안, 우측 자가 비판 결과</desc>
  <defs>
    <style>
      .bg          { fill: #FFFFFF; }
      .bg-elev     { fill: #FAFAFA; }
      .border      { stroke: #E5E7EB; stroke-width: 1; fill: none; }
      .text-primary   { fill: #0A0A0A; font-family: Pretendard, system-ui, sans-serif; }
      .text-secondary { fill: #525252; font-family: Pretendard, system-ui, sans-serif; }
      .text-tertiary  { fill: #A3A3A3; font-family: Pretendard, system-ui, sans-serif; }
      .accent      { fill: #5B5BD6; }
      .accent-soft { fill: #EEF0FF; }
      .check       { fill: #059669; }
      .warn        { fill: #D97706; }
      .warn-soft   { fill: rgba(217, 119, 6, 0.1); }
      .tab-active  { fill: #EEF0FF; }
    </style>
  </defs>

  <rect class="bg" x="0" y="0" width="1600" height="1000" rx="12"/>
  <rect class="border" x="0.5" y="0.5" width="1599" height="999" rx="12"/>

  <!-- Header -->
  <rect class="bg-elev" x="0" y="0" width="1600" height="64"/>
  <line x1="0" y1="64" x2="1600" y2="64" stroke="#E5E7EB"/>
  <circle class="accent" cx="32" cy="32" r="6"/>
  <text class="text-primary" x="48" y="36" font-size="16" font-weight="600">Draft Generator</text>
  <text class="text-secondary" x="220" y="36" font-size="13">|</text>
  <text class="text-secondary" x="240" y="36" font-size="13">PRD · 제안서 · 주간보고 · 기획서 · 회의록</text>

  <!-- Three columns: 400 / 800 / 400 -->
  <line x1="400"  y1="64" x2="400"  y2="1000" stroke="#E5E7EB"/>
  <line x1="1200" y1="64" x2="1200" y2="1000" stroke="#E5E7EB"/>

  <!-- LEFT: Interview answers -->
  <text class="text-primary" x="32" y="108" font-size="14" font-weight="600">인터뷰 답변</text>
  <text class="text-secondary" x="160" y="108" font-size="13">(8/8)</text>
  <line x1="32" y1="124" x2="368" y2="124" stroke="#E5E7EB"/>
  <g font-family="Pretendard, system-ui, sans-serif" font-size="14">
    <text class="check" x="32" y="160">✓</text><text class="text-primary" x="56" y="160">핵심 사용자</text>
    <text class="check" x="32" y="192">✓</text><text class="text-primary" x="56" y="192">풀어낼 문제</text>
    <text class="check" x="32" y="224">✓</text><text class="text-primary" x="56" y="224">성공 기준</text>
    <text class="check" x="32" y="256">✓</text><text class="text-primary" x="56" y="256">비목표</text>
    <text class="check" x="32" y="288">✓</text><text class="text-primary" x="56" y="288">핵심 기능</text>
    <text class="check" x="32" y="320">✓</text><text class="text-primary" x="56" y="320">제약</text>
    <text class="check" x="32" y="352">✓</text><text class="text-primary" x="56" y="352">일정·인원</text>
    <text class="check" x="32" y="384">✓</text><text class="text-primary" x="56" y="384">위험 요소</text>
  </g>
  <rect class="bg-elev" x="32" y="420" width="120" height="36" rx="8"/>
  <rect class="border" x="32.5" y="420.5" width="119" height="35" rx="8"/>
  <text class="text-primary" x="92" y="442" font-size="13" text-anchor="middle">재인터뷰</text>

  <!-- CENTER: Draft -->
  <text class="text-primary" x="432" y="108" font-size="16" font-weight="600">PRD: 사내 결재 모바일 화면</text>
  <line x1="432" y1="128" x2="1168" y2="128" stroke="#E5E7EB"/>

  <g font-family="Pretendard, system-ui, sans-serif">
    <text class="text-primary" x="432" y="168" font-size="15" font-weight="600">1. 배경</text>
    <text class="text-secondary" x="432" y="196" font-size="14">결재 라인이 평균 6단계로 길어 평균 처리</text>
    <text class="text-secondary" x="432" y="218" font-size="14">시간이 3.4일에 달함.</text>

    <text class="text-primary" x="432" y="262" font-size="15" font-weight="600">2. 목표</text>
    <text class="text-secondary" x="432" y="290" font-size="14">결재 단계 6 → 3으로 단축, 모바일</text>
    <text class="text-secondary" x="432" y="312" font-size="14">전용 결재 화면 출시.</text>

    <text class="text-primary" x="432" y="356" font-size="15" font-weight="600">3. 핵심 기능</text>
    <text class="warn" x="540" y="356" font-size="14">⚠</text>
    <text class="text-secondary" x="456" y="384" font-size="14">3.1 푸시 알림</text>
    <text class="text-secondary" x="456" y="406" font-size="14">3.2 위임 결재</text>
    <text class="text-secondary" x="456" y="428" font-size="14">3.3 결재 라인 단축 정책</text>
    <text class="text-tertiary" x="456" y="450" font-size="14">…</text>
  </g>

  <!-- Download buttons -->
  <g transform="translate(432, 540)">
    <rect class="bg-elev" x="0" y="0" width="160" height="36" rx="8"/>
    <rect class="border" x="0.5" y="0.5" width="159" height="35" rx="8"/>
    <text class="text-primary" x="80" y="22" font-size="13" text-anchor="middle">Markdown 다운</text>
    <rect class="bg-elev" x="172" y="0" width="100" height="36" rx="8"/>
    <rect class="border" x="172.5" y="0.5" width="99" height="35" rx="8"/>
    <text class="text-primary" x="222" y="22" font-size="13" text-anchor="middle">.docx</text>
  </g>

  <!-- RIGHT: Self-critique -->
  <text class="text-primary" x="1232" y="108" font-size="14" font-weight="600">자가 비판</text>
  <text class="warn" x="1320" y="108" font-size="13">(4건)</text>
  <line x1="1232" y1="124" x2="1568" y2="124" stroke="#E5E7EB"/>

  <g font-family="Pretendard, system-ui, sans-serif">
    <rect class="warn-soft" x="1232" y="148" width="336" height="76" rx="8"/>
    <text class="warn" x="1248" y="172" font-size="13" font-weight="500">⚠ 논리 결함</text>
    <text class="text-secondary" x="1248" y="196" font-size="13">"근거 없이 효율이 50% 증가한다고…"</text>

    <rect class="warn-soft" x="1232" y="240" width="336" height="76" rx="8"/>
    <text class="warn" x="1248" y="264" font-size="13" font-weight="500">⚠ 누락 섹션</text>
    <text class="text-secondary" x="1248" y="288" font-size="13">"보안 고려사항"이 명시되지 않음</text>

    <rect class="warn-soft" x="1232" y="332" width="336" height="76" rx="8"/>
    <text class="warn" x="1248" y="356" font-size="13" font-weight="500">⚠ 사실 단정</text>
    <text class="text-secondary" x="1248" y="380" font-size="13">"전 사용자가 모바일을 선호한다"</text>

    <rect class="warn-soft" x="1232" y="424" width="336" height="76" rx="8"/>
    <text class="warn" x="1248" y="448" font-size="13" font-weight="500">⚠ 톤 위반</text>
    <text class="text-secondary" x="1248" y="472" font-size="13">"ASAP 처리" 비공식 표현</text>
  </g>

  <rect class="accent" x="1232" y="540" width="336" height="40" rx="8"/>
  <text fill="white" x="1400" y="566" font-size="14" font-weight="500" text-anchor="middle">모두 보강하기</text>

  <!-- Watermark -->
  <text class="text-tertiary" x="1568" y="980" font-size="11" text-anchor="end" letter-spacing="0.5">ROBOCO ✕ Vibe Coding Workshop</text>
</svg>
```

- [ ] **Step 2: Validate SVG**

```bash
xmllint --noout vibecoding-for-nondeveloper/portfolio/assets/mockups/03-document.svg && echo "OK"
```

Expected: `OK`

- [ ] **Step 3: Visual check**

Update index.html `<main>` to reference `assets/mockups/03-document.svg`. Open in browser.

Expected: 3-column layout with checked interview answers (left), PRD draft (center) with ⚠ on section 3, four warning cards on right.

- [ ] **Step 4: Commit**

```bash
git add vibecoding-for-nondeveloper/portfolio/assets/mockups/03-document.svg
git commit -m "Add SVG mockup 03: document draft generator"
```

---

## Task 7: SVG Mockup 04 — Budget Spreadsheet Automation

**Files:**
- Create: `vibecoding-for-nondeveloper/portfolio/assets/mockups/04-budget.svg`

- [ ] **Step 1: Write the SVG**

Write to `vibecoding-for-nondeveloper/portfolio/assets/mockups/04-budget.svg`:

```svg
<svg viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="동적 예산·실적 시트 자동화 UI 콘셉트">
  <title>동적 예산·실적 시트 자동화</title>
  <desc>상단 시나리오 슬라이더, 중앙 시트, 하단 차이 분석</desc>
  <defs>
    <style>
      .bg       { fill: #FFFFFF; }
      .bg-elev  { fill: #FAFAFA; }
      .bg-row-alt { fill: #FAFAFA; }
      .border   { stroke: #E5E7EB; stroke-width: 1; fill: none; }
      .text-primary   { fill: #0A0A0A; font-family: Pretendard, system-ui, sans-serif; }
      .text-secondary { fill: #525252; font-family: Pretendard, system-ui, sans-serif; }
      .text-tertiary  { fill: #A3A3A3; font-family: Pretendard, system-ui, sans-serif; }
      .accent   { fill: #5B5BD6; }
      .accent-soft { fill: #EEF0FF; }
      .check    { fill: #059669; }
      .warn     { fill: #D97706; }
      .slider-track { fill: #E5E7EB; }
      .insight { fill: rgba(91, 91, 214, 0.06); }
    </style>
  </defs>

  <rect class="bg" x="0" y="0" width="1600" height="1000" rx="12"/>
  <rect class="border" x="0.5" y="0.5" width="1599" height="999" rx="12"/>

  <!-- Header -->
  <rect class="bg-elev" x="0" y="0" width="1600" height="64"/>
  <line x1="0" y1="64" x2="1600" y2="64" stroke="#E5E7EB"/>
  <circle class="accent" cx="32" cy="32" r="6"/>
  <text class="text-primary" x="48" y="36" font-size="16" font-weight="600">Budget Studio</text>
  <rect class="bg-elev" x="1284" y="16" width="120" height="32" rx="8"/>
  <rect class="border" x="1284.5" y="16.5" width="119" height="31" rx="8"/>
  <text class="text-primary" x="1344" y="36" font-size="13" text-anchor="middle">시나리오 비교</text>
  <rect class="accent" x="1416" y="16" width="152" height="32" rx="8"/>
  <text fill="white" x="1492" y="36" font-size="13" font-weight="500" text-anchor="middle">Excel 다운 ↓</text>

  <!-- Scenario sliders -->
  <text class="text-secondary" x="32" y="104" font-size="13" letter-spacing="0.5">시나리오 변수</text>

  <g font-family="Pretendard, system-ui, sans-serif" font-size="13">
    <!-- row 1 -->
    <text class="text-primary" x="32" y="148">인건비</text>
    <rect class="slider-track" x="120" y="142" width="200" height="6" rx="3"/>
    <circle class="accent" cx="260" cy="145" r="8"/>
    <text class="text-secondary" x="340" y="148">1.10x</text>

    <text class="text-primary" x="440" y="148">외주비</text>
    <rect class="slider-track" x="528" y="142" width="200" height="6" rx="3"/>
    <circle class="accent" cx="556" cy="145" r="8"/>
    <text class="text-secondary" x="748" y="148">0.80x</text>

    <text class="text-primary" x="840" y="148">마케팅</text>
    <rect class="slider-track" x="928" y="142" width="200" height="6" rx="3"/>
    <circle class="accent" cx="1068" cy="145" r="8"/>
    <text class="text-secondary" x="1148" y="148">1.20x</text>

    <!-- row 2 -->
    <text class="text-primary" x="32" y="196">운영비</text>
    <rect class="slider-track" x="120" y="190" width="200" height="6" rx="3"/>
    <circle class="accent" cx="200" cy="193" r="8"/>
    <text class="text-secondary" x="340" y="196">0.95x</text>

    <text class="text-primary" x="440" y="196">매출</text>
    <rect class="slider-track" x="528" y="190" width="200" height="6" rx="3"/>
    <circle class="accent" cx="620" cy="193" r="8"/>
    <text class="text-secondary" x="748" y="196">1.05x</text>

    <text class="text-primary" x="840" y="196">환율</text>
    <rect class="slider-track" x="928" y="190" width="200" height="6" rx="3"/>
    <circle class="accent" cx="1060" cy="193" r="8"/>
    <text class="text-secondary" x="1148" y="196">1,340</text>
  </g>

  <line x1="0" y1="240" x2="1600" y2="240" stroke="#E5E7EB"/>

  <!-- Spreadsheet -->
  <g font-family="ui-monospace, SFMono-Regular, monospace" font-size="13">
    <!-- column headers -->
    <text class="text-tertiary" x="48"  y="280">A</text>
    <text class="text-tertiary" x="248" y="280">B</text>
    <text class="text-tertiary" x="528" y="280">C</text>
    <text class="text-tertiary" x="808" y="280">D</text>
    <text class="text-tertiary" x="1088" y="280">E</text>

    <!-- header row -->
    <text class="text-tertiary" x="32"   y="316">1</text>
    <text class="text-primary"  x="80"   y="316" font-weight="600">항목</text>
    <text class="text-primary"  x="250"  y="316" font-weight="600">기본</text>
    <text class="text-primary"  x="530"  y="316" font-weight="600">보수</text>
    <text class="text-primary"  x="810"  y="316" font-weight="600">낙관</text>
    <text class="text-primary"  x="1090" y="316" font-weight="600">실적</text>

    <!-- Rows -->
    <rect class="bg-row-alt" x="16" y="328" width="1568" height="40"/>
    <text class="text-tertiary" x="32"   y="356">2</text>
    <text class="text-primary"  x="80"   y="356">인건비</text>
    <text class="text-primary"  x="250"  y="356">580,000,000</text>
    <text class="text-primary"  x="530"  y="356">620,000,000</text>
    <text class="text-primary"  x="810"  y="356">540,000,000</text>
    <text class="text-primary"  x="1090" y="356">592,000,000</text>

    <text class="text-tertiary" x="32"   y="396">3</text>
    <text class="text-primary"  x="80"   y="396">외주비</text>
    <text class="text-primary"  x="250"  y="396">120,000,000</text>
    <text class="text-primary"  x="530"  y="396">150,000,000</text>
    <text class="text-primary"  x="810"  y="396">100,000,000</text>
    <text class="text-primary"  x="1090" y="396">118,000,000</text>

    <rect class="bg-row-alt" x="16" y="408" width="1568" height="40"/>
    <text class="text-tertiary" x="32"   y="436">4</text>
    <text class="text-primary"  x="80"   y="436">마케팅</text>
    <text class="text-primary"  x="250"  y="436">200,000,000</text>
    <text class="text-primary"  x="530"  y="436">240,000,000</text>
    <text class="text-primary"  x="810"  y="436">170,000,000</text>
    <text class="text-primary"  x="1090" y="436">187,000,000</text>
    <text class="warn"          x="1280" y="436">▼</text>

    <text class="text-tertiary" x="32"   y="476">5</text>
    <text class="text-primary"  x="80"   y="476">운영비</text>
    <text class="text-primary"  x="250"  y="476"> 80,000,000</text>
    <text class="text-primary"  x="530"  y="476"> 90,000,000</text>
    <text class="text-primary"  x="810"  y="476"> 70,000,000</text>
    <text class="text-primary"  x="1090" y="476"> 82,000,000</text>

    <line x1="16" y1="496" x2="1584" y2="496" stroke="#E5E7EB" stroke-width="2"/>

    <rect class="accent-soft" x="16" y="500" width="1568" height="40"/>
    <text class="text-tertiary" x="32"   y="528">7</text>
    <text class="text-primary"  x="80"   y="528" font-weight="700">합계</text>
    <text class="text-primary"  x="250"  y="528" font-weight="700">980,000,000</text>
    <text class="text-primary"  x="530"  y="528" font-weight="700">1,100,000,000</text>
    <text class="text-primary"  x="810"  y="528" font-weight="700">880,000,000</text>
    <text class="text-primary"  x="1090" y="528" font-weight="700">979,000,000</text>
    <text class="check"         x="1280" y="528">✓</text>
  </g>

  <line x1="0" y1="580" x2="1600" y2="580" stroke="#E5E7EB"/>

  <!-- Diff analysis -->
  <text class="text-secondary" x="32" y="624" font-size="14" font-weight="600">📊 차이 분석</text>
  <g font-family="Pretendard, system-ui, sans-serif" font-size="14">
    <rect class="insight" x="32" y="644" width="1536" height="48" rx="8"/>
    <text class="text-primary" x="48" y="676">• 마케팅 -6.5% (계획 200M → 실적 187M)</text>
    <text class="text-secondary" x="520" y="676">사유 후보: 캠페인 1건 이월</text>

    <rect class="insight" x="32" y="708" width="1536" height="48" rx="8"/>
    <text class="text-primary" x="48" y="740">• 합계 -0.1%</text>
    <text class="text-secondary" x="520" y="740">기본 시나리오와 거의 일치</text>
  </g>

  <!-- Watermark -->
  <text class="text-tertiary" x="1568" y="980" font-size="11" text-anchor="end" letter-spacing="0.5">ROBOCO ✕ Vibe Coding Workshop</text>
</svg>
```

- [ ] **Step 2: Validate SVG**

```bash
xmllint --noout vibecoding-for-nondeveloper/portfolio/assets/mockups/04-budget.svg && echo "OK"
```

Expected: `OK`

- [ ] **Step 3: Visual check**

Update index.html to reference `assets/mockups/04-budget.svg`. Open browser.

Expected: Top sliders (6 variables), spreadsheet (4 row items + total highlighted), diff analysis panel at bottom.

- [ ] **Step 4: Commit**

```bash
git add vibecoding-for-nondeveloper/portfolio/assets/mockups/04-budget.svg
git commit -m "Add SVG mockup 04: dynamic budget spreadsheet automation"
```

---

## Task 8: SVG Mockup 05 — QA Test Case Studio

**Files:**
- Create: `vibecoding-for-nondeveloper/portfolio/assets/mockups/05-qa.svg`

- [ ] **Step 1: Write the SVG**

Write to `vibecoding-for-nondeveloper/portfolio/assets/mockups/05-qa.svg`:

```svg
<svg viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="QA 테스트 케이스·이슈 정리 UI 콘셉트">
  <title>QA Studio — 테스트 케이스·이슈 정리</title>
  <desc>좌측 기능 명세, 중앙 테스트 케이스 탭+그리드, 우측 위험 영역</desc>
  <defs>
    <style>
      .bg          { fill: #FFFFFF; }
      .bg-elev     { fill: #FAFAFA; }
      .bg-row-alt  { fill: #FAFAFA; }
      .border      { stroke: #E5E7EB; stroke-width: 1; fill: none; }
      .text-primary   { fill: #0A0A0A; font-family: Pretendard, system-ui, sans-serif; }
      .text-secondary { fill: #525252; font-family: Pretendard, system-ui, sans-serif; }
      .text-tertiary  { fill: #A3A3A3; font-family: Pretendard, system-ui, sans-serif; }
      .accent      { fill: #5B5BD6; }
      .accent-soft { fill: #EEF0FF; }
      .check       { fill: #059669; }
      .warn        { fill: #D97706; }
      .dot-on      { fill: #5B5BD6; }
      .dot-half    { fill: #818CF8; }
      .dot-off     { fill: #E5E7EB; }
      .risk-soft   { fill: rgba(217, 119, 6, 0.06); }
    </style>
  </defs>

  <rect class="bg" x="0" y="0" width="1600" height="1000" rx="12"/>
  <rect class="border" x="0.5" y="0.5" width="1599" height="999" rx="12"/>

  <!-- Header -->
  <rect class="bg-elev" x="0" y="0" width="1600" height="64"/>
  <line x1="0" y1="64" x2="1600" y2="64" stroke="#E5E7EB"/>
  <circle class="accent" cx="32" cy="32" r="6"/>
  <text class="text-primary" x="48" y="36" font-size="16" font-weight="600">QA Studio</text>
  <text class="text-secondary" x="220" y="36" font-size="13">기능:</text>
  <text class="text-primary" x="260" y="36" font-size="14" font-weight="500">결재 위임</text>
  <rect class="accent" x="1408" y="16" width="160" height="32" rx="8"/>
  <text fill="white" x="1488" y="36" font-size="13" font-weight="500" text-anchor="middle">PDF Plan 다운 ↓</text>

  <!-- Three columns: 400 / 800 / 400 -->
  <line x1="400"  y1="64" x2="400"  y2="1000" stroke="#E5E7EB"/>
  <line x1="1200" y1="64" x2="1200" y2="1000" stroke="#E5E7EB"/>

  <!-- LEFT: feature spec -->
  <text class="text-primary" x="32" y="108" font-size="14" font-weight="600">기능 명세</text>
  <line x1="32" y1="124" x2="368" y2="124" stroke="#E5E7EB"/>

  <g font-family="Pretendard, system-ui, sans-serif" font-size="14">
    <text class="text-primary" x="32" y="160">• 위임 설정</text>
    <text class="text-primary" x="32" y="188">• 위임 기간</text>
    <text class="text-primary" x="32" y="216">• 위임 알림</text>
    <text class="text-primary" x="32" y="244">• 위임 해제</text>

    <text class="text-primary" x="32" y="304" font-weight="600">변경 영향</text>
  </g>
  <line x1="32" y1="320" x2="368" y2="320" stroke="#E5E7EB"/>
  <g font-family="Pretendard, system-ui, sans-serif" font-size="14">
    <text class="text-primary" x="32" y="356">→ 결재 라인</text>
    <text class="text-primary" x="32" y="384">→ 알림 큐</text>
    <text class="text-primary" x="32" y="412">→ 통계 집계</text>

    <text class="check" x="32" y="468">✓</text>
    <text class="text-secondary" x="56" y="468">인터뷰 미답 0</text>
  </g>

  <!-- CENTER: tabs + test cases -->
  <g transform="translate(432, 96)" font-family="Pretendard, system-ui, sans-serif">
    <rect class="accent-soft" x="0" y="0" width="84" height="32" rx="8"/>
    <text class="accent" x="42" y="22" font-size="13" font-weight="600" text-anchor="middle">정상 6</text>
    <text class="text-secondary" x="118" y="22" font-size="13" text-anchor="middle">경계 4</text>
    <text class="text-secondary" x="196" y="22" font-size="13" text-anchor="middle">예외 7</text>
    <text class="text-secondary" x="274" y="22" font-size="13" text-anchor="middle">회귀 3</text>
  </g>
  <line x1="432" y1="156" x2="1168" y2="156" stroke="#E5E7EB"/>

  <!-- Table header -->
  <g font-family="Pretendard, system-ui, sans-serif" font-size="13">
    <text class="text-tertiary" x="448"  y="188" letter-spacing="0.5">ID</text>
    <text class="text-tertiary" x="528"  y="188" letter-spacing="0.5">조건</text>
    <text class="text-tertiary" x="880"  y="188" letter-spacing="0.5">기대 결과</text>
    <text class="text-tertiary" x="1136" y="188" letter-spacing="0.5">P</text>
  </g>
  <line x1="432" y1="200" x2="1168" y2="200" stroke="#E5E7EB"/>

  <!-- Rows -->
  <g font-family="Pretendard, system-ui, sans-serif" font-size="14">
    <rect class="bg-row-alt" x="432" y="208" width="736" height="44"/>
    <text class="text-primary" x="448" y="236">T-01</text>
    <text class="text-secondary" x="528" y="236">본인 결재 위임</text>
    <text class="text-secondary" x="880" y="236">정상 처리</text>
    <circle class="dot-on" cx="1140" cy="232" r="5"/>

    <text class="text-primary" x="448" y="280">T-02</text>
    <text class="text-secondary" x="528" y="280">위임자 로그아웃</text>
    <text class="text-secondary" x="880" y="280">자동 해제</text>
    <circle class="dot-on" cx="1140" cy="276" r="5"/>

    <rect class="bg-row-alt" x="432" y="296" width="736" height="44"/>
    <text class="text-primary" x="448" y="324">T-03</text>
    <text class="text-secondary" x="528" y="324">기간 만료</text>
    <text class="text-secondary" x="880" y="324">자동 해제</text>
    <circle class="dot-half" cx="1140" cy="320" r="5"/>

    <text class="text-primary" x="448" y="368">T-04</text>
    <text class="text-secondary" x="528" y="368">중첩 위임 시도</text>
    <text class="text-secondary" x="880" y="368">차단</text>
    <circle class="dot-on" cx="1140" cy="364" r="5"/>

    <rect class="bg-row-alt" x="432" y="384" width="736" height="44"/>
    <text class="text-primary" x="448" y="412">T-05</text>
    <text class="text-secondary" x="528" y="412">결재선 변경</text>
    <text class="text-secondary" x="880" y="412">재계산</text>
    <circle class="dot-on" cx="1140" cy="408" r="5"/>

    <text class="text-primary" x="448" y="456">T-06</text>
    <text class="text-secondary" x="528" y="456">통계 반영</text>
    <text class="text-secondary" x="880" y="456">익일 반영</text>
    <circle class="dot-off" cx="1140" cy="452" r="5"/>
  </g>

  <!-- Bottom actions -->
  <g transform="translate(432, 500)">
    <rect class="bg-elev" x="0" y="0" width="140" height="36" rx="8"/>
    <rect class="border" x="0.5" y="0.5" width="139" height="35" rx="8"/>
    <text class="text-primary" x="70" y="22" font-size="13" text-anchor="middle">+ 케이스 추가</text>
    <rect class="bg-elev" x="156" y="0" width="160" height="36" rx="8"/>
    <rect class="border" x="156.5" y="0.5" width="159" height="35" rx="8"/>
    <text class="text-primary" x="236" y="22" font-size="13" text-anchor="middle">회귀 후보 보기</text>
  </g>

  <!-- RIGHT: risk areas -->
  <text class="text-primary" x="1232" y="108" font-size="14" font-weight="600">⚠ 위험 영역</text>
  <line x1="1232" y1="124" x2="1568" y2="124" stroke="#E5E7EB"/>

  <g font-family="Pretendard, system-ui, sans-serif">
    <rect class="risk-soft" x="1232" y="148" width="336" height="76" rx="8"/>
    <text class="warn" x="1248" y="172" font-size="13" font-weight="500">• 동시성</text>
    <text class="text-secondary" x="1248" y="196" font-size="13">다중 결재 동시 발생</text>

    <rect class="risk-soft" x="1232" y="240" width="336" height="76" rx="8"/>
    <text class="warn" x="1248" y="264" font-size="13" font-weight="500">• 권한</text>
    <text class="text-secondary" x="1248" y="288" font-size="13">상위 위임 — 권한 상승 위험</text>

    <rect class="risk-soft" x="1232" y="332" width="336" height="76" rx="8"/>
    <text class="warn" x="1248" y="356" font-size="13" font-weight="500">• 데이터 마이그레이션</text>
    <text class="text-secondary" x="1248" y="380" font-size="13">진행 중 결재 처리 방안</text>

    <rect class="bg-elev" x="1232" y="424" width="336" height="60" rx="8"/>
    <rect class="border" x="1232.5" y="424.5" width="335" height="59" rx="8"/>
    <text class="check" x="1248" y="448" font-size="13">✓ 보안</text>
    <text class="text-secondary" x="1248" y="468" font-size="13">결제 — 해당 없음</text>
  </g>

  <!-- Watermark -->
  <text class="text-tertiary" x="1568" y="980" font-size="11" text-anchor="end" letter-spacing="0.5">ROBOCO ✕ Vibe Coding Workshop</text>
</svg>
```

- [ ] **Step 2: Validate SVG**

```bash
xmllint --noout vibecoding-for-nondeveloper/portfolio/assets/mockups/05-qa.svg && echo "OK"
```

Expected: `OK`

- [ ] **Step 3: Visual check**

Update index.html to reference `assets/mockups/05-qa.svg`. Open browser.

Expected: Three-column layout — feature spec (left), 6-row test case table with priority dots (center), four risk area cards (right).

- [ ] **Step 4: Commit**

```bash
git add vibecoding-for-nondeveloper/portfolio/assets/mockups/05-qa.svg
git commit -m "Add SVG mockup 05: QA test case studio"
```

---

## Task 9: HTML Hero section (§1)

**Files:**
- Modify: `vibecoding-for-nondeveloper/portfolio/index.html`
- Modify: `vibecoding-for-nondeveloper/portfolio/styles.css` (append)

- [ ] **Step 1: Append hero styles**

Append to `vibecoding-for-nondeveloper/portfolio/styles.css`:

```css
/* ============================================================
   Hero
   ============================================================ */

.hero {
  padding: var(--space-24) 0 var(--space-16);
  text-align: center;
  border-bottom: 1px solid var(--border);
}

.hero-eyebrow {
  display: inline-block;
  margin-bottom: var(--space-6);
  padding: 6px 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: var(--text-meta);
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.hero h1 {
  max-width: 920px;
  margin: 0 auto var(--space-6);
}

.hero-sub {
  max-width: 640px;
  margin: 0 auto var(--space-8);
  color: var(--text-secondary);
  font-size: var(--text-body);
}

.hero-ctas {
  display: flex;
  gap: var(--space-3);
  justify-content: center;
  margin-bottom: var(--space-16);
}

.hero-brand {
  font-size: var(--text-meta);
  color: var(--text-tertiary);
  letter-spacing: 0.1em;
}

@media (max-width: 640px) {
  .hero { padding: var(--space-16) 0 var(--space-12); }
  .display { font-size: 36px; }
  .hero-ctas { flex-direction: column; align-items: stretch; }
  .hero-ctas .btn { width: 100%; }
}
```

- [ ] **Step 2: Replace index.html body**

Overwrite `index.html` (keep head from Task 1 with title/favicon/stylesheet links):

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>비개발자 바이브 코딩 워크숍 | ROBOCO</title>
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- ====== §1 Hero ====== -->
  <section class="hero">
    <div class="container">
      <span class="hero-eyebrow">비개발자 바이브 코딩 워크숍</span>
      <h1 class="display">
        영업·CS·기획·경영지원이<br>
        4시간 만에 AI 자동화 도구 5종을 만든다
      </h1>
      <p class="hero-sub">
        코드 없이, 자연어만으로.<br>
        Claude 기반 워크숍 — 12명 단위, 4시간.
      </p>
      <div class="hero-ctas">
        <!-- TODO-EMAIL: replace hello@roboco.io with actual contact -->
        <a class="btn btn-primary"
           href="mailto:hello@roboco.io?subject=%5B%EC%9B%8C%ED%81%AC%EC%88%8D%20%EB%AC%B8%EC%9D%98%20%2F%20web-2026-05%5D%20%EB%B9%84%EA%B0%9C%EB%B0%9C%EC%9E%90%20%EB%B0%94%EC%9D%B4%EB%B8%8C%20%EC%BD%94%EB%94%A9">
          도입 문의하기 →
        </a>
        <a class="btn btn-secondary" href="#showcase">결과물 보기 ↓</a>
      </div>
      <div class="hero-brand">ROBOCO</div>
    </div>
  </section>

  <script src="scripts.js" defer></script>
</body>
</html>
```

- [ ] **Step 3: Open browser and verify**

```bash
open vibecoding-for-nondeveloper/portfolio/index.html
```

Expected: Centered hero with eyebrow pill, large display H1 (2 lines), gray subtitle (2 lines), 2 CTAs (primary indigo + secondary outline), small "ROBOCO" wordmark. Clicking primary CTA opens mail client with prefilled subject.

- [ ] **Step 4: Test mailto link in browser**

Hover the "도입 문의하기" button — status bar should show:
`mailto:hello@roboco.io?subject=[워크숍 문의 / web-2026-05] 비개발자 바이브 코딩`

- [ ] **Step 5: Commit**

```bash
git add vibecoding-for-nondeveloper/portfolio/index.html vibecoding-for-nondeveloper/portfolio/styles.css
git commit -m "Add hero section with primary CTA and brand mark"
```

---

## Task 10: HTML Showcase section (§2 — 5 mockup cards)

**Files:**
- Modify: `vibecoding-for-nondeveloper/portfolio/index.html` (append before script tag)
- Modify: `vibecoding-for-nondeveloper/portfolio/styles.css` (append)

- [ ] **Step 1: Append showcase styles**

Append to `vibecoding-for-nondeveloper/portfolio/styles.css`:

```css
/* ============================================================
   Showcase (§2)
   ============================================================ */

.showcase {
  padding: var(--space-24) 0;
}

.showcase-header {
  text-align: center;
  margin-bottom: var(--space-16);
}

.showcase-header h2 {
  margin-bottom: var(--space-3);
}

.showcase-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}

.showcase-item {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: var(--space-12);
  align-items: start;
}

.showcase-meta {
  position: sticky;
  top: var(--space-8);
}

.showcase-meta-num {
  font-size: var(--text-meta);
  color: var(--text-tertiary);
  letter-spacing: 0.1em;
  margin-bottom: var(--space-2);
}

.showcase-meta-title {
  font-size: var(--text-h2);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.2;
  margin-bottom: var(--space-6);
}

.showcase-meta-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  font-size: var(--text-sm);
  margin-bottom: var(--space-3);
}

.showcase-meta-label {
  color: var(--text-tertiary);
  font-size: var(--text-meta);
  letter-spacing: 0.05em;
}

.showcase-meta-value {
  color: var(--text-primary);
}

.showcase-mockup {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-elevated);
}

.showcase-mockup img {
  width: 100%;
  display: block;
}

.showcase-caption {
  margin-top: var(--space-3);
  font-size: var(--text-meta);
  color: var(--text-tertiary);
}

@media (max-width: 1024px) {
  .showcase-item {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  .showcase-meta { position: static; }
}
```

- [ ] **Step 2: Add showcase section to index.html**

Insert before `<script src="scripts.js" defer></script>` in `index.html`:

```html
  <!-- ====== §2 Showcase ====== -->
  <section class="showcase" id="showcase">
    <div class="container">
      <header class="showcase-header">
        <h2 class="h1">워크숍에서 만드는 5가지 도구</h2>
        <p class="text-secondary">각 도구는 직군별 반복 업무를 직접 해결합니다</p>
      </header>

      <div class="showcase-list">

        <article class="showcase-item">
          <div class="showcase-meta">
            <div class="showcase-meta-num">01 / 05</div>
            <h3 class="showcase-meta-title">CS 문의 자동 분류 에이전트</h3>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">대상 직군</span>
              <span class="showcase-meta-value">CS · 영업 · 운영</span>
            </div>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">시간 단축</span>
              <span class="showcase-meta-value">문의 1건당 15분 → 5분 (66% ↓)</span>
            </div>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">핵심 기능</span>
              <span class="showcase-meta-value">사양/버그 자동 분류 · 응답 초안 · 인사이트 리포트</span>
            </div>
          </div>
          <div>
            <div class="showcase-mockup">
              <img src="assets/mockups/01-cs-agent.svg" alt="CS 문의 자동 분류 에이전트 UI 콘셉트" loading="lazy">
            </div>
            <p class="showcase-caption">💡 워크숍에서 만든 Claude Project 패턴을 시각화한 콘셉트입니다</p>
          </div>
        </article>

        <article class="showcase-item">
          <div class="showcase-meta">
            <div class="showcase-meta-num">02 / 05</div>
            <h3 class="showcase-meta-title">경쟁사·시장 리서치 자동 취합</h3>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">대상 직군</span>
              <span class="showcase-meta-value">기획 · PM · 마케팅</span>
            </div>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">시간 단축</span>
              <span class="showcase-meta-value">5개 경쟁사 비교표 4시간 → 1시간 (75% ↓)</span>
            </div>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">핵심 기능</span>
              <span class="showcase-meta-value">자료 일괄 투입 · 6차원 비교표 · 인사이트 자동 도출</span>
            </div>
          </div>
          <div>
            <div class="showcase-mockup">
              <img src="assets/mockups/02-research.svg" alt="경쟁사 리서치 자동 취합 UI 콘셉트" loading="lazy">
            </div>
            <p class="showcase-caption">💡 워크숍에서 만든 Claude Project 패턴을 시각화한 콘셉트입니다</p>
          </div>
        </article>

        <article class="showcase-item">
          <div class="showcase-meta">
            <div class="showcase-meta-num">03 / 05</div>
            <h3 class="showcase-meta-title">문서·보고서 초안 생성기</h3>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">대상 직군</span>
              <span class="showcase-meta-value">전 직군 공통</span>
            </div>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">시간 단축</span>
              <span class="showcase-meta-value">문서 초안 2시간 → 30분 (75% ↓)</span>
            </div>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">핵심 기능</span>
              <span class="showcase-meta-value">인터뷰 퍼스트 · 구조화된 초안 · 자가 비판 검수</span>
            </div>
          </div>
          <div>
            <div class="showcase-mockup">
              <img src="assets/mockups/03-document.svg" alt="문서 초안 생성기 UI 콘셉트" loading="lazy">
            </div>
            <p class="showcase-caption">💡 워크숍에서 만든 Claude Project 패턴을 시각화한 콘셉트입니다</p>
          </div>
        </article>

        <article class="showcase-item">
          <div class="showcase-meta">
            <div class="showcase-meta-num">04 / 05</div>
            <h3 class="showcase-meta-title">동적 예산·실적 시트 자동화</h3>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">대상 직군</span>
              <span class="showcase-meta-value">경영지원 · 재무</span>
            </div>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">시간 단축</span>
              <span class="showcase-meta-value">시나리오 시트 2시간 → 30분 (75% ↓)</span>
            </div>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">핵심 기능</span>
              <span class="showcase-meta-value">시나리오 변수 슬라이더 · 자동 수식 · 실적 차이 분석</span>
            </div>
          </div>
          <div>
            <div class="showcase-mockup">
              <img src="assets/mockups/04-budget.svg" alt="예산 시트 자동화 UI 콘셉트" loading="lazy">
            </div>
            <p class="showcase-caption">💡 워크숍에서 만든 Claude Project 패턴을 시각화한 콘셉트입니다</p>
          </div>
        </article>

        <article class="showcase-item">
          <div class="showcase-meta">
            <div class="showcase-meta-num">05 / 05</div>
            <h3 class="showcase-meta-title">QA 테스트 케이스·이슈 정리</h3>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">대상 직군</span>
              <span class="showcase-meta-value">QA · 운영</span>
            </div>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">시간 단축</span>
              <span class="showcase-meta-value">QA Plan 3시간 → 1시간 (66% ↓)</span>
            </div>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">핵심 기능</span>
              <span class="showcase-meta-value">정상/경계/예외/회귀 자동 분류 · 위험 영역 식별</span>
            </div>
          </div>
          <div>
            <div class="showcase-mockup">
              <img src="assets/mockups/05-qa.svg" alt="QA Studio UI 콘셉트" loading="lazy">
            </div>
            <p class="showcase-caption">💡 워크숍에서 만든 Claude Project 패턴을 시각화한 콘셉트입니다</p>
          </div>
        </article>

      </div>
    </div>
  </section>
```

- [ ] **Step 3: Open browser, scroll through showcase**

```bash
open vibecoding-for-nondeveloper/portfolio/index.html
```

Expected: 5 showcase items stacked vertically. Each item has meta column (left, sticky during scroll on desktop) + mockup column (right, full SVG render). Caption "💡 워크숍에서 만든 Claude Project 패턴…" under each mockup. Clicking "결과물 보기 ↓" from hero scrolls smoothly to showcase.

- [ ] **Step 4: Test responsive layout**

In browser DevTools, toggle device toolbar to iPhone 14 (390×844). Verify:
- Meta column stacks above mockup column
- SVG scales to 100% width
- Mockup text remains legible (no text smaller than ~12px effective)

- [ ] **Step 5: Commit**

```bash
git add vibecoding-for-nondeveloper/portfolio/index.html vibecoding-for-nondeveloper/portfolio/styles.css
git commit -m "Add showcase section with 5 mockup cards"
```

---

## Task 11: HTML Methodology + Matrix sections (§3 + §4)

**Files:**
- Modify: `vibecoding-for-nondeveloper/portfolio/index.html` (append)
- Modify: `vibecoding-for-nondeveloper/portfolio/styles.css` (append)

- [ ] **Step 1: Append styles**

Append to `vibecoding-for-nondeveloper/portfolio/styles.css`:

```css
/* ============================================================
   Methodology (§3)
   ============================================================ */

.methodology {
  padding: var(--space-24) 0;
  background: var(--bg-subtle);
  border-block: 1px solid var(--border);
}

.methodology-header {
  text-align: center;
  margin-bottom: var(--space-16);
  max-width: 760px;
  margin-inline: auto;
}

.methodology-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  margin-bottom: var(--space-12);
}

.methodology-card {
  padding: var(--space-12);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.methodology-card h3 {
  margin-bottom: var(--space-4);
}

.methodology-quote {
  margin-bottom: var(--space-6);
  padding: var(--space-4);
  background: var(--accent-subtle);
  border-radius: var(--radius);
  font-size: var(--text-h3);
  color: var(--text-primary);
  font-weight: 500;
}

.methodology-arrow {
  margin-block: var(--space-3);
  text-align: center;
  color: var(--text-tertiary);
}

.methodology-outcome {
  color: var(--text-secondary);
}

.methodology-footnote {
  max-width: 760px;
  margin-inline: auto;
  text-align: center;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .methodology-grid { grid-template-columns: 1fr; }
}

/* ============================================================
   Matrix (§4)
   ============================================================ */

.matrix {
  padding: var(--space-24) 0;
}

.matrix-header {
  text-align: center;
  margin-bottom: var(--space-12);
  max-width: 760px;
  margin-inline: auto;
}

.matrix-table-wrap {
  overflow-x: auto;
  margin-bottom: var(--space-6);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.matrix-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.matrix-table th,
.matrix-table td {
  padding: var(--space-3) var(--space-4);
  text-align: center;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

.matrix-table th {
  font-weight: 600;
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.matrix-table tbody tr:last-child td {
  border-bottom: none;
}

.matrix-table td:first-child,
.matrix-table th:first-child {
  text-align: left;
  font-weight: 500;
  background: var(--bg-elevated);
  position: sticky;
  left: 0;
  z-index: 1;
}

.matrix-cell-full { color: var(--accent); font-weight: 600; }
.matrix-cell-half { color: var(--text-secondary); }
.matrix-cell-low  { color: var(--text-tertiary); }

.matrix-legend {
  display: flex;
  gap: var(--space-6);
  justify-content: center;
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
}

.matrix-footnote {
  max-width: 760px;
  margin-inline: auto;
  text-align: center;
  color: var(--text-secondary);
}
```

- [ ] **Step 2: Add methodology + matrix sections to index.html**

Insert before `<script>`:

```html
  <!-- ====== §3 Methodology ====== -->
  <section class="methodology">
    <div class="container">
      <header class="methodology-header">
        <h2 class="h1">AI를 믿을 수 있게 만드는 두 가지 패턴</h2>
        <p class="text-secondary">"결과 품질이 들쑥날쑥하다" 문제를 워크숍이 직접 해결합니다.</p>
      </header>

      <div class="methodology-grid">
        <div class="methodology-card">
          <h3 class="h2">인터뷰 퍼스트 패턴</h3>
          <div class="methodology-quote">"써줘"가 아니라<br>"나에게 질문해줘"</div>
          <div class="methodology-arrow">↓</div>
          <p class="methodology-outcome">컨텍스트 누락 방지, 환각 가능성 감소.</p>
        </div>
        <div class="methodology-card">
          <h3 class="h2">검수 루프 패턴</h3>
          <div class="methodology-quote">AI 생성 →<br>같은 AI에게 자기 비판 의뢰</div>
          <div class="methodology-arrow">↓</div>
          <p class="methodology-outcome">논리 결함·누락·단정 자동 검출, 품질 변동 최소화.</p>
        </div>
      </div>

      <p class="methodology-footnote">
        83%의 비개발자가 'AI 결과 품질이 들쑥날쑥하다'고 답했습니다.
      </p>
    </div>
  </section>

  <!-- ====== §4 Matrix ====== -->
  <section class="matrix">
    <div class="container">
      <header class="matrix-header">
        <h2 class="h1">코딩 경험이 0인 직원도 즉시 적용 가능</h2>
        <p class="text-secondary">5종 도구를 8개 직군이 어떻게 활용하는가</p>
      </header>

      <div class="matrix-table-wrap">
        <table class="matrix-table">
          <thead>
            <tr>
              <th>도구</th>
              <th>CS</th>
              <th>영업</th>
              <th>기획</th>
              <th>PM</th>
              <th>디자인</th>
              <th>경영지원</th>
              <th>QA</th>
              <th>운영</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>01 CS봇</td>      <td class="matrix-cell-full">●</td><td class="matrix-cell-full">●</td><td class="matrix-cell-half">◐</td><td class="matrix-cell-half">◐</td><td class="matrix-cell-low">◯</td><td class="matrix-cell-low">◯</td><td class="matrix-cell-full">●</td><td class="matrix-cell-full">●</td></tr>
            <tr><td>02 리서치</td>    <td class="matrix-cell-low">◯</td><td class="matrix-cell-half">◐</td><td class="matrix-cell-full">●</td><td class="matrix-cell-full">●</td><td class="matrix-cell-half">◐</td><td class="matrix-cell-half">◐</td><td class="matrix-cell-low">◯</td><td class="matrix-cell-low">◯</td></tr>
            <tr><td>03 문서</td>      <td class="matrix-cell-full">●</td><td class="matrix-cell-full">●</td><td class="matrix-cell-full">●</td><td class="matrix-cell-full">●</td><td class="matrix-cell-full">●</td><td class="matrix-cell-full">●</td><td class="matrix-cell-full">●</td><td class="matrix-cell-full">●</td></tr>
            <tr><td>04 예산</td>      <td class="matrix-cell-low">◯</td><td class="matrix-cell-low">◯</td><td class="matrix-cell-full">●</td><td class="matrix-cell-half">◐</td><td class="matrix-cell-low">◯</td><td class="matrix-cell-full">●</td><td class="matrix-cell-low">◯</td><td class="matrix-cell-half">◐</td></tr>
            <tr><td>05 QA</td>        <td class="matrix-cell-low">◯</td><td class="matrix-cell-low">◯</td><td class="matrix-cell-half">◐</td><td class="matrix-cell-full">●</td><td class="matrix-cell-low">◯</td><td class="matrix-cell-low">◯</td><td class="matrix-cell-full">●</td><td class="matrix-cell-full">●</td></tr>
          </tbody>
        </table>
      </div>

      <div class="matrix-legend">
        <span><span class="matrix-cell-full">●</span> 직접 적용</span>
        <span><span class="matrix-cell-half">◐</span> 응용 가능</span>
        <span><span class="matrix-cell-low">◯</span> 보조 도구로 사용</span>
      </div>

      <p class="matrix-footnote">
        설문 응답자 중 코딩 경험 없음 42%, 노코드 경험 17%.
        모든 학습자가 4시간 안에 본인 업무 패턴으로 변환합니다.
      </p>
    </div>
  </section>
```

- [ ] **Step 3: Open browser and verify**

```bash
open vibecoding-for-nondeveloper/portfolio/index.html
```

Expected: Methodology section with gray-subtle background and two cards side by side. Matrix section with 9-column table (1 label + 8 jobs) and 5 rows. Legend below table. On mobile, methodology stacks 1-column and matrix table scrolls horizontally.

- [ ] **Step 4: Commit**

```bash
git add vibecoding-for-nondeveloper/portfolio/index.html vibecoding-for-nondeveloper/portfolio/styles.css
git commit -m "Add methodology and matrix sections (§3, §4)"
```

---

## Task 12: HTML Operations + Final CTA sections (§5 + §6)

**Files:**
- Modify: `vibecoding-for-nondeveloper/portfolio/index.html` (append)
- Modify: `vibecoding-for-nondeveloper/portfolio/styles.css` (append)

- [ ] **Step 1: Append styles**

Append to `vibecoding-for-nondeveloper/portfolio/styles.css`:

```css
/* ============================================================
   Operations (§5)
   ============================================================ */

.operations {
  padding: var(--space-24) 0;
  background: var(--bg-subtle);
  border-block: 1px solid var(--border);
}

.operations-header {
  text-align: center;
  margin-bottom: var(--space-16);
  max-width: 760px;
  margin-inline: auto;
}

.operations-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.operations-col {
  padding: var(--space-8);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.operations-col h3 {
  margin-bottom: var(--space-4);
  font-size: var(--text-h3);
  font-weight: 600;
}

.operations-row {
  display: flex;
  justify-content: space-between;
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--border);
  font-size: var(--text-sm);
}

.operations-row:last-child { border-bottom: none; }

.operations-row span:first-child { color: var(--text-secondary); }
.operations-row span:last-child  { color: var(--text-primary); font-weight: 500; }

@media (max-width: 1024px) {
  .operations-grid { grid-template-columns: 1fr; }
}

/* ============================================================
   Final CTA (§6) + Footer
   ============================================================ */

.cta {
  padding: var(--space-24) 0;
  text-align: center;
}

.cta h2 {
  margin-bottom: var(--space-4);
}

.cta p {
  max-width: 540px;
  margin: 0 auto var(--space-8);
  color: var(--text-secondary);
}

.cta .btn-primary {
  height: 48px;
  padding: 0 var(--space-8);
  font-size: var(--text-body);
}

.footer {
  padding: var(--space-12) 0;
  border-top: 1px solid var(--border);
  text-align: center;
  color: var(--text-tertiary);
  font-size: var(--text-meta);
}

.footer-brand {
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
  margin-bottom: var(--space-2);
}
```

- [ ] **Step 2: Add operations + CTA + footer sections**

Insert before `<script>`:

```html
  <!-- ====== §5 Operations ====== -->
  <section class="operations">
    <div class="container">
      <header class="operations-header">
        <h2 class="h1">이미 검증된 설계 — 12명 직군 설문 기반</h2>
        <p class="text-secondary">현장 데이터로 설계된 운영 표준</p>
      </header>

      <div class="operations-grid">
        <div class="operations-col">
          <h3>워크숍 운영</h3>
          <div class="operations-row"><span>인원</span><span>12명 단위</span></div>
          <div class="operations-row"><span>시간</span><span>4시간</span></div>
          <div class="operations-row"><span>형식</span><span>온라인 / 오프라인</span></div>
          <div class="operations-row"><span>사전 준비</span><span>1주 전 안내</span></div>
        </div>
        <div class="operations-col">
          <h3>사전 설문 근거</h3>
          <div class="operations-row"><span>매일 AI 사용</span><span>75%</span></div>
          <div class="operations-row"><span>품질 불안정</span><span>83%</span></div>
          <div class="operations-row"><span>직접 재작업</span><span>58%</span></div>
          <div class="operations-row"><span>로컬 설치 가능</span><span>92%</span></div>
        </div>
        <div class="operations-col">
          <h3>사전 준비</h3>
          <div class="operations-row"><span>Claude 계정</span><span>필수</span></div>
          <div class="operations-row"><span>노트북</span><span>회사 지급분</span></div>
          <div class="operations-row"><span>데이터 정책</span><span>사전 확인</span></div>
          <div class="operations-row"><span>샘플 자료</span><span>제공</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ====== §6 Final CTA ====== -->
  <section class="cta">
    <div class="container">
      <h2 class="h1">팀에 워크숍 도입을 검토하시나요?</h2>
      <p>12명 단위로 운영합니다. 인원·일정·맞춤 사례는 메일로 회신드립니다.</p>
      <!-- TODO-EMAIL: replace hello@roboco.io with actual contact -->
      <a class="btn btn-primary"
         href="mailto:hello@roboco.io?subject=%5B%EC%9B%8C%ED%81%AC%EC%88%8D%20%EB%AC%B8%EC%9D%98%20%2F%20web-2026-05%5D%20%EB%B9%84%EA%B0%9C%EB%B0%9C%EC%9E%90%20%EB%B0%94%EC%9D%B4%EB%B8%8C%20%EC%BD%94%EB%94%A9&body=%ED%9A%8C%EC%82%AC%EB%AA%85%3A%20%0A%EC%9D%B8%EC%9B%90%3A%20%0A%ED%9D%AC%EB%A7%9D%20%EC%9D%BC%EC%A0%95%3A%20%0A%ED%95%B5%EC%8B%AC%20%EC%A0%81%EC%9A%A9%20%EC%A7%81%EA%B5%B0%3A%20">
        hello@roboco.io 로 문의하기 →
      </a>
    </div>
  </section>

  <!-- ====== Footer ====== -->
  <footer class="footer">
    <div class="container">
      <div class="footer-brand">ROBOCO</div>
      <div>© 2026 ROBOCO. 비개발자 바이브 코딩 워크숍.</div>
    </div>
  </footer>
```

- [ ] **Step 3: Open browser and verify full page**

```bash
open vibecoding-for-nondeveloper/portfolio/index.html
```

Expected: Scrolling from top sees Hero → Showcase (5 cards) → Methodology (2 cards) → Matrix (9-column table) → Operations (3 columns) → CTA (centered) → Footer. Total page height roughly 4500-5500px on desktop.

- [ ] **Step 4: Verify mailto body prefill**

Click the final CTA button. Mail client should open with subject `[워크숍 문의 / web-2026-05] 비개발자 바이브 코딩` and body containing prefilled labels: `회사명:`, `인원:`, `희망 일정:`, `핵심 적용 직군:`.

- [ ] **Step 5: Commit**

```bash
git add vibecoding-for-nondeveloper/portfolio/index.html vibecoding-for-nondeveloper/portfolio/styles.css
git commit -m "Add operations, final CTA, and footer sections (§5, §6)"
```

---

## Task 13: scripts.js — IntersectionObserver fade-in

**Files:**
- Modify: `vibecoding-for-nondeveloper/portfolio/scripts.js` (overwrite)
- Modify: `vibecoding-for-nondeveloper/portfolio/index.html` (add `fade-in` class to sections)

- [ ] **Step 1: Write IntersectionObserver script**

Overwrite `vibecoding-for-nondeveloper/portfolio/scripts.js`:

```javascript
// Scroll-triggered fade-in.
// Applies to all elements with .fade-in class.
// Uses IntersectionObserver; gracefully degrades to immediate visibility.

(function () {
  'use strict';

  const elements = document.querySelectorAll('.fade-in');
  if (elements.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.05,
    }
  );

  elements.forEach((el) => observer.observe(el));
})();
```

- [ ] **Step 2: Add fade-in class to all sections**

In `index.html`, add `fade-in` class to each section element. The hero stays without fade-in (it's above the fold). Modify each subsequent section opening tag:

```
<section class="showcase fade-in" id="showcase">
<section class="methodology fade-in">
<section class="matrix fade-in">
<section class="operations fade-in">
<section class="cta fade-in">
```

Also add to each showcase-item to stagger:

```
<article class="showcase-item fade-in">
```

(Apply to all 5 showcase-item elements.)

- [ ] **Step 3: Reload browser and verify scroll animation**

```bash
open vibecoding-for-nondeveloper/portfolio/index.html
```

Scroll from top to bottom. Expected:
- Hero appears immediately
- Sections fade in with slight upward translation as they enter viewport
- Each showcase card fades in independently as you scroll

- [ ] **Step 4: Test reduced motion**

In browser DevTools → Rendering tab → enable "Emulate CSS prefers-reduced-motion: reduce". Reload.

Expected: Sections fade in (opacity only) without translation. Faster transition.

- [ ] **Step 5: Commit**

```bash
git add vibecoding-for-nondeveloper/portfolio/scripts.js vibecoding-for-nondeveloper/portfolio/index.html
git commit -m "Add scroll-triggered fade-in via IntersectionObserver"
```

---

## Task 14: Meta tags, SEO, and OG image source

**Files:**
- Modify: `vibecoding-for-nondeveloper/portfolio/index.html` (head)
- Create: `vibecoding-for-nondeveloper/portfolio/assets/og-image.svg`

- [ ] **Step 1: Expand head with meta tags**

Replace `<head>` content in `index.html`:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>비개발자 바이브 코딩 워크숍 | ROBOCO</title>
  <meta name="description" content="4시간 워크숍 한 번이면 비개발자도 AI 자동화 도구 5종을 직접 만든다. Claude 기반, 12명 단위.">

  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <link rel="canonical" href="https://roboco-io.github.io/vibecoding-workshop/vibecoding-for-nondeveloper/portfolio/">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="비개발자 바이브 코딩 워크숍 | ROBOCO">
  <meta property="og:description" content="4시간 워크숍 한 번이면 비개발자도 AI 자동화 도구 5종을 직접 만든다.">
  <meta property="og:image" content="https://roboco-io.github.io/vibecoding-workshop/vibecoding-for-nondeveloper/portfolio/assets/og-image.png">
  <meta property="og:url" content="https://roboco-io.github.io/vibecoding-workshop/vibecoding-for-nondeveloper/portfolio/">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="비개발자 바이브 코딩 워크숍 | ROBOCO">
  <meta name="twitter:description" content="4시간 워크숍 한 번이면 비개발자도 AI 자동화 도구 5종을 직접 만든다.">
  <meta name="twitter:image" content="https://roboco-io.github.io/vibecoding-workshop/vibecoding-for-nondeveloper/portfolio/assets/og-image.png">

  <!-- Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "비개발자 바이브 코딩 워크숍",
    "description": "비개발자가 4시간 워크숍에서 AI 기반 업무 자동화 도구 5종을 만드는 실습 워크숍.",
    "provider": {
      "@type": "Organization",
      "name": "ROBOCO",
      "sameAs": "https://github.com/roboco-io"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "비개발자 직군 (영업·CS·기획·운영·디자인·경영지원·QA)"
    }
  }
  </script>

  <link rel="stylesheet" href="styles.css">
</head>
```

- [ ] **Step 2: Create og-image.svg source**

Write to `vibecoding-for-nondeveloper/portfolio/assets/og-image.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0A0A0A"/>
      <stop offset="100%" stop-color="#1E1B4B"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Brand mark -->
  <circle cx="80" cy="80" r="20" fill="#818CF8"/>
  <text x="120" y="92" font-family="Pretendard, system-ui, sans-serif"
        font-size="24" font-weight="700" fill="#FAFAFA" letter-spacing="0.1em">ROBOCO</text>

  <!-- Eyebrow -->
  <text x="80" y="240" font-family="Pretendard, system-ui, sans-serif"
        font-size="20" font-weight="500" fill="#818CF8" letter-spacing="0.1em">비개발자 바이브 코딩 워크숍</text>

  <!-- Main -->
  <text x="80" y="320" font-family="Pretendard, system-ui, sans-serif"
        font-size="60" font-weight="700" fill="#FAFAFA" letter-spacing="-0.02em">영업·CS·기획·경영지원이</text>
  <text x="80" y="396" font-family="Pretendard, system-ui, sans-serif"
        font-size="60" font-weight="700" fill="#FAFAFA" letter-spacing="-0.02em">4시간 만에 도구 5종을 만든다</text>

  <!-- Sub -->
  <text x="80" y="476" font-family="Pretendard, system-ui, sans-serif"
        font-size="24" font-weight="400" fill="#A3A3A3">코드 없이, 자연어만으로 · Claude 기반 · 12명 단위</text>

  <!-- Accent line -->
  <rect x="80" y="540" width="80" height="4" fill="#818CF8" rx="2"/>
</svg>
```

- [ ] **Step 3: Convert og-image.svg to og-image.png**

The PNG version is needed for OG sharing. Use one of these methods:

**Method A — macOS (built-in)**
```bash
qlmanage -t -s 1200 -o vibecoding-for-nondeveloper/portfolio/assets/ vibecoding-for-nondeveloper/portfolio/assets/og-image.svg
mv vibecoding-for-nondeveloper/portfolio/assets/og-image.svg.png vibecoding-for-nondeveloper/portfolio/assets/og-image.png
```

**Method B — rsvg-convert (if installed via brew)**
```bash
rsvg-convert -w 1200 -h 630 vibecoding-for-nondeveloper/portfolio/assets/og-image.svg -o vibecoding-for-nondeveloper/portfolio/assets/og-image.png
```

**Method C — Headless Chrome**
```bash
google-chrome --headless --window-size=1200,630 --screenshot=vibecoding-for-nondeveloper/portfolio/assets/og-image.png "file://$(pwd)/vibecoding-for-nondeveloper/portfolio/assets/og-image.svg"
```

If none of these tools are available, document this as a manual step in README.md (Task 15).

- [ ] **Step 4: Verify og-image.png exists and is reasonable size**

```bash
ls -la vibecoding-for-nondeveloper/portfolio/assets/og-image.png && file vibecoding-for-nondeveloper/portfolio/assets/og-image.png
```

Expected: File exists, ~50-300 KB, identified as PNG with 1200×630 dimensions.

- [ ] **Step 5: Verify head meta tags in browser**

```bash
open vibecoding-for-nondeveloper/portfolio/index.html
```

In DevTools → Elements, inspect `<head>`. Confirm all meta tags present. Tab title shows "비개발자 바이브 코딩 워크숍 | ROBOCO".

- [ ] **Step 6: Commit**

```bash
git add vibecoding-for-nondeveloper/portfolio/index.html vibecoding-for-nondeveloper/portfolio/assets/og-image.svg vibecoding-for-nondeveloper/portfolio/assets/og-image.png
git commit -m "Add meta tags, Schema.org, and OG image"
```

---

## Task 15: GitHub Pages config + README

**Files:**
- Modify: `_config.yml` (root, ensure portfolio dir not excluded)
- Create: `vibecoding-for-nondeveloper/portfolio/README.md`

- [ ] **Step 1: Verify _config.yml does not exclude portfolio**

Run:

```bash
grep -n "portfolio" _config.yml
```

Expected: No match (portfolio is not in exclude list, so it will be published by default).

- [ ] **Step 2: Add portfolio to navigation links in main index.md (optional)**

Open root `index.md`. If there is a section listing non-developer pages, add a link to the portfolio. Otherwise skip.

Locate the non-developer section (search for "비개발자 트랙") and append a new card if not present:

```html
<div class="workshop-card">
<span class="card-badge badge-nondev">비개발자</span>
<h3>포트폴리오 페이지</h3>
<p>고객 소개용 랜딩페이지 — 5개 결과물 콘셉트 + 운영 정보.</p>
<div class="card-links">
<a href="vibecoding-for-nondeveloper/portfolio/" class="card-link">페이지 열기</a>
</div>
</div>
```

If unsure, skip this step. The portfolio is reachable via direct URL.

- [ ] **Step 3: Write portfolio README**

Write to `vibecoding-for-nondeveloper/portfolio/README.md`:

```markdown
# 비개발자 바이브 코딩 워크숍 포트폴리오 랜딩페이지

ROBOCO가 제공하는 비개발자 바이브 코딩 워크숍을 기업 HR/L&D 고객에게 소개하기 위한 단일 페이지 HTML 랜딩페이지.

## 발행 URL

https://roboco-io.github.io/vibecoding-workshop/vibecoding-for-nondeveloper/portfolio/

## 파일 구조

```
portfolio/
├── index.html              메인 페이지
├── styles.css              디자인 토큰 + 컴포넌트 스타일
├── scripts.js              IntersectionObserver 페이드 인
├── README.md               이 파일
└── assets/
    ├── favicon.svg
    ├── og-image.svg        Open Graph 카드 (원본 SVG)
    ├── og-image.png        Open Graph 카드 (래스터 — 공유용)
    └── mockups/            5개 SaaS UI 콘셉트 목업
        ├── 01-cs-agent.svg
        ├── 02-research.svg
        ├── 03-document.svg
        ├── 04-budget.svg
        └── 05-qa.svg
```

## 무엇을 만지면 무엇이 바뀌나

| 변경하고 싶은 것 | 만지는 파일 |
|----------------|------------|
| 색·간격·폰트 | `styles.css` 상단 `:root` 토큰 |
| 섹션 카피 | `index.html` 해당 섹션 |
| 목업 디자인 | `assets/mockups/*.svg` |
| Hero/CTA 문구 | `index.html` `.hero`, `.cta` |
| 문의 이메일 | `index.html`에서 `TODO-EMAIL` 마커 검색 (2곳: hero CTA, final CTA) |
| OG 카드 | `assets/og-image.svg` → 재래스터화 (Task 14의 변환 명령 참조) |
| 페이지 메타·SEO | `index.html` `<head>` |

## 빌드 (없음)

빌드 단계 없음. 브라우저에서 `index.html` 더블 클릭으로 동작.

## 배포

**채널 A — GitHub Pages**

`main` 브랜치 push 시 자동 발행. 발행 URL은 위 참조.

**채널 B — 정적 ZIP**

메일 첨부 또는 폐쇄 환경 공유용:

```bash
zip -r portfolio.zip vibecoding-for-nondeveloper/portfolio/ -x "*.DS_Store"
```

수신자는 압축 해제 후 `index.html` 더블 클릭.

## 변경 후 체크리스트

- [ ] 브라우저에서 6개 섹션 모두 정상 렌더링
- [ ] 모바일 폭(390px)에서 깨짐 없음
- [ ] DevTools Console 에러 0건
- [ ] CTA mailto 링크가 메일 클라이언트를 정상 호출
- [ ] 다크 모드(시스템 설정) 에서 콘트라스트 OK
- [ ] `TODO-EMAIL` 마커가 모두 실제 이메일로 치환됨
```

- [ ] **Step 4: Verify README and run final smoke test**

```bash
cat vibecoding-for-nondeveloper/portfolio/README.md | head -20
open vibecoding-for-nondeveloper/portfolio/index.html
```

Expected: README rendered as markdown, page opens and displays correctly.

- [ ] **Step 5: Commit**

```bash
git add vibecoding-for-nondeveloper/portfolio/README.md
git commit -m "Add portfolio README with maintenance guide"
```

---

## Task 16: Final QA — spec checklist run

**Files:**
- No new files. Verification only.
- If QA finds issues, fix in respective file and add additional commits.

This task runs the QA checklist from the design spec section 7-3 verbatim.

- [ ] **Step 1: Content QA**

Open page in browser and visually verify:

- [ ] All 6 sections present in order (Hero → Showcase → Methodology → Matrix → Operations → CTA → Footer)
- [ ] Each section has ONE primary message
- [ ] Caption "💡 워크숍에서 만든 Claude Project 패턴…" appears below each of 5 mockups
- [ ] No client-specific names visible (DCL, 다이렉트 등)
- [ ] Survey numbers (75%, 83%, 58%, 92%) match the source survey report

```bash
grep -rE "다이렉트|다이랙트|Direct.?Cloud" vibecoding-for-nondeveloper/portfolio/ ; echo "EXIT=$?"
```

Expected: EXIT=1 (no matches)

- [ ] **Step 2: Visual QA**

In browser DevTools, verify:
- [ ] Mockup headers all use same row spacing and `◉` accent dot
- [ ] All cards share same `padding`, `border-radius`, `border` color
- [ ] Mockup SVGs have text ≥ 12px at intended viewing size (zoom in DevTools)
- [ ] Dark mode (prefers-color-scheme) renders with correct contrast — toggle in DevTools

- [ ] **Step 3: Interaction QA**

- [ ] Click Hero "결과물 보기 ↓" → smooth scroll to showcase section
- [ ] Hover both CTA buttons → status bar shows `mailto:` URL with prefilled subject
- [ ] Tab key navigates through all CTAs and links — focus outline visible (2px accent)
- [ ] DevTools → Rendering → enable "Emulate prefers-reduced-motion: reduce" → reload → sections fade in without Y translation

- [ ] **Step 4: SEO/meta QA**

In DevTools → Elements → `<head>`:
- [ ] `<title>` reads "비개발자 바이브 코딩 워크숍 | ROBOCO"
- [ ] `<meta name="description">` non-empty, under 160 characters
- [ ] OG `og:image` URL absolute, points to og-image.png
- [ ] Schema.org JSON-LD parses (paste into https://validator.schema.org for confirmation if needed)

- [ ] **Step 5: Deployment QA — local ZIP**

```bash
cd vibecoding-for-nondeveloper && zip -r /tmp/portfolio-test.zip portfolio/ -x "*.DS_Store" && cd -
cd /tmp && unzip portfolio-test.zip -d portfolio-test/ && open portfolio-test/portfolio/index.html
```

Expected: Page renders identically when opened from the unzipped copy. No broken links.

```bash
rm -rf /tmp/portfolio-test /tmp/portfolio-test.zip
```

- [ ] **Step 6: Deployment QA — GitHub Pages**

```bash
# Inspect _config.yml include/exclude to ensure portfolio is published
grep -A 2 "exclude:" _config.yml | grep -i portfolio
```

Expected: No portfolio entries in `exclude` list. (Empty output is good.)

After commit and push, manually verify deployment at:
`https://roboco-io.github.io/vibecoding-workshop/vibecoding-for-nondeveloper/portfolio/`

Allow ~2 minutes for GitHub Actions to build.

- [ ] **Step 7: Final TODO scan**

```bash
grep -n "TODO-EMAIL\|TODO\|FIXME" vibecoding-for-nondeveloper/portfolio/
```

Expected: Two `TODO-EMAIL` markers (Hero CTA + Final CTA). These are intentional placeholders. Replace with real email when ready.

- [ ] **Step 8: Final commit (if any fixes were applied)**

If Steps 1-7 surfaced issues that were fixed, commit:

```bash
git add vibecoding-for-nondeveloper/portfolio/
git commit -m "Fix QA findings on portfolio landing page"
```

If no fixes needed, skip this step.

- [ ] **Step 9: Final summary**

The plan is complete. The portfolio landing page is ready for deployment.

Remaining manual actions (outside plan scope):
- Replace `TODO-EMAIL` markers with real contact email
- Push to GitHub and verify Pages deployment
- Test in additional browsers (Safari, Edge, mobile)
- Optionally add Plausible/Umami if measurement beyond mailto-attribution is desired

---

## Plan Self-Review

**Spec coverage:** Every section from the design spec (2026-05-19-portfolio-slides-design.md) maps to plan tasks:
- Spec §2 (File Structure) → Task 1 + ongoing
- Spec §3 (6 sections content) → Tasks 9-12
- Spec §4 (5 mockup specs) → Tasks 4-8
- Spec §5 (Visual system) → Tasks 2-3
- Spec §6 (SVG规约) → Tasks 4-8 conform
- Spec §7 (Build/deploy/QA) → Tasks 14-16
- Spec §8 (Non-Goals) → not built (correct)
- Spec §9 (Maintenance) → Task 15 README

**Placeholder scan:** Two intentional `TODO-EMAIL` markers documented in Task 9 and Task 12 and called out in Task 16 Step 7. No other TBDs.

**Type consistency:** CSS class names (.btn-primary, .badge-info, .matrix-cell-full, .fade-in, etc.) are used consistently across all tasks. SVG class names (.text-primary, .accent, .border) match across all 5 mockups.

**Scope:** Single subsystem (one static landing page). Appropriate for a single plan.
