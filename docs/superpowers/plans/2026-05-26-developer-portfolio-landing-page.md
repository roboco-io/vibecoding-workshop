# Developer Portfolio Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static HTML landing page at `vibecoding-for-developer/portfolio/` that introduces the ROBOCO developer vibe coding workshop to engineering managers and CTOs, with 5 best-practice cards and 5 SVG terminal/code mockups as the visual centerpiece.

**Architecture:** Single-page vertical-scroll landing page with 6 sections (Hero / Showcase / Methodology / DORA Matrix / Operations / CTA). No build step — pure HTML/CSS/JS/SVG. Reuses the design tokens established for the non-developer portfolio (`vibecoding-for-nondeveloper/portfolio/styles.css`) and adds a code/terminal token set on top. Mockups are inline SVG referenced from `assets/mockups/`. Deployed via GitHub Pages by the existing `deploy-pages.yml` workflow.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), SVG, Vanilla JS (IntersectionObserver). System font stack with Pretendard fallback plus SF Mono/Menlo for code. No external dependencies, no build step.

**Reference Spec:** [docs/superpowers/specs/2026-05-26-developer-portfolio-design.md](../specs/2026-05-26-developer-portfolio-design.md)

**Reference Implementation:** [vibecoding-for-nondeveloper/portfolio/](../../../vibecoding-for-nondeveloper/portfolio/) — the sibling page. Many style tokens, the IntersectionObserver script, and the favicon are reused verbatim.

**Contact email:** `contact@roboco.io` (same address used on the non-developer page). All mailto links use this address.

---

## File Structure

```
vibecoding-for-developer/portfolio/
├── index.html                 ← Main landing page (single file, ~370 lines)
├── styles.css                 ← Design tokens + component styles + code area (~430 lines)
├── scripts.js                 ← IntersectionObserver fade-in (~30 lines)
├── README.md                  ← Maintenance guide (~60 lines)
└── assets/
    ├── favicon.svg            ← ROBOCO mark (10 lines, copy from sibling page)
    ├── og-image.svg           ← Open Graph card source SVG
    └── mockups/
        ├── 01-context.svg     ← CLAUDE.md + project tree + Claude interview
        ├── 02-spec.svg        ← OpenSpec tree + change diff + skill call
        ├── 03-test.svg        ← Makefile + `make test` terminal + coverage bar
        ├── 04-gate.svg        ← Git hook file + fail/success scenarios
        └── 05-playbook.svg    ← Tutorial preview + migration-plan.md
```

**File responsibilities**

| File | Responsibility |
|------|----------------|
| `index.html` | Page structure, all 6 sections, meta tags, inline SVG references |
| `styles.css` | Design tokens (CSS variables), component styles, responsive grid, code/terminal area |
| `scripts.js` | Scroll-triggered fade-in via IntersectionObserver |
| `assets/mockups/*.svg` | One terminal/code/document mockup per of the 5 best-practice areas |
| `assets/favicon.svg` | Browser tab icon — ROBOCO mark (identical to non-developer page) |
| `assets/og-image.svg` | Source for og-image card |
| `README.md` | How to edit, build, deploy |

**Edits to existing files**

| File | Change |
|------|--------|
| `_config.yml` | Ensure `vibecoding-for-developer/portfolio` is not in the `exclude` list (Jekyll-publish it) |

---

## Task 1: Scaffold directory and copy reusable assets from non-developer page

**Files:**
- Create: `vibecoding-for-developer/portfolio/index.html`
- Create: `vibecoding-for-developer/portfolio/styles.css`
- Create: `vibecoding-for-developer/portfolio/scripts.js`
- Create: `vibecoding-for-developer/portfolio/assets/favicon.svg`
- Create: `vibecoding-for-developer/portfolio/assets/mockups/.gitkeep`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p vibecoding-for-developer/portfolio/assets/mockups
touch vibecoding-for-developer/portfolio/assets/mockups/.gitkeep
```

- [ ] **Step 2: Copy styles.css from non-developer page**

```bash
cp vibecoding-for-nondeveloper/portfolio/styles.css vibecoding-for-developer/portfolio/styles.css
```

This brings over every design token, layout, and component class that the sibling page uses. Task 2 will append the code/terminal additions on top.

- [ ] **Step 3: Copy scripts.js from non-developer page**

```bash
cp vibecoding-for-nondeveloper/portfolio/scripts.js vibecoding-for-developer/portfolio/scripts.js
```

The IntersectionObserver fade-in script is identical across both pages.

- [ ] **Step 4: Copy favicon.svg from non-developer page**

```bash
cp vibecoding-for-nondeveloper/portfolio/assets/favicon.svg vibecoding-for-developer/portfolio/assets/favicon.svg
```

Same ROBOCO mark.

- [ ] **Step 5: Create a minimum viable index.html**

Write to `vibecoding-for-developer/portfolio/index.html`:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>개발자 바이브 코딩 워크숍 | ROBOCO</title>
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main>
    <h1>개발자 바이브 코딩 워크숍</h1>
    <p>Loading content...</p>
  </main>
  <script src="scripts.js" defer></script>
</body>
</html>
```

- [ ] **Step 6: Verify the page opens locally**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Expected: the placeholder heading renders. No styling errors in the browser console.

- [ ] **Step 7: Commit**

```bash
git add vibecoding-for-developer/portfolio/
git commit -m "Scaffold developer portfolio directory and copy reusable assets"
```

---

## Task 2: Extend styles.css with code/terminal tokens (spec §5-1)

**Files:**
- Modify: `vibecoding-for-developer/portfolio/styles.css` (append at end of `:root` block and add new component classes)

- [ ] **Step 1: Locate the `:root` block in styles.css**

The first `:root { ... }` block (root tokens) is around the top of the file. Find its closing `}` to know where the existing tokens end.

- [ ] **Step 2: Add code/terminal tokens inside the `:root` block**

Within the existing `:root { ... }` block, before the closing brace, append:

```css
  /* Code / terminal — added for developer track */
  --code-bg: #0D0D10;
  --code-text: #E4E4E7;
  --code-prompt: #7FB069;
  --code-output-dim: rgba(228, 228, 231, 0.7);
  --code-success: #4ADE80;
  --code-error: #F87171;
  --code-border: #2D2D35;
```

- [ ] **Step 3: Add dark-mode overrides inside the `prefers-color-scheme: dark` block**

Find the existing `@media (prefers-color-scheme: dark) :root { ... }` block. Inside, before the closing brace, append:

```css
  --code-bg: #050507;
  --code-text: #FAFAFA;
  --code-border: #1F1F25;
```

- [ ] **Step 4: Add `.code-block` and related component classes**

At the end of the file, append:

```css
/* ====== Code / terminal blocks (developer track) ====== */

.code-block {
  font-family: "SF Mono", Menlo, "Cascadia Code", Consolas, monospace;
  font-size: 13px;
  line-height: 1.6;
  background: var(--code-bg);
  color: var(--code-text);
  padding: var(--space-4);
  border-radius: var(--radius);
  border: 1px solid var(--code-border);
  overflow-x: auto;
}

.code-block .code-prompt { color: var(--code-prompt); }
.code-block .code-output-dim { color: var(--code-output-dim); }
.code-block .code-success { color: var(--code-success); }
.code-block .code-error { color: var(--code-error); }

/* Color-independent encoding: success/fail labels next to the symbol */
.code-block .code-label {
  font-size: 11px;
  margin-left: var(--space-2);
  padding: 0 6px;
  border-radius: 4px;
  border: 1px solid currentColor;
  font-weight: 600;
  letter-spacing: 0.02em;
}

/* Dark-mode shadow boost for the code block outline */
@media (prefers-color-scheme: dark) {
  .code-block {
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  }
}

/* ====== DORA matrix cells (developer track) ====== */

.matrix-dora td .dora-label {
  display: inline-block;
  font-size: 11px;
  margin-left: 6px;
  opacity: 0.65;
  letter-spacing: 0.02em;
}
```

- [ ] **Step 5: Verify locally**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Expected: the page still renders (placeholder heading). No new errors in the browser console. CSS additions don't break anything because no markup yet uses them.

- [ ] **Step 6: Commit**

```bash
git add vibecoding-for-developer/portfolio/styles.css
git commit -m "Extend portfolio styles with code/terminal tokens"
```

---

## Task 3: Build index.html `<head>` with meta tags and Schema.org

**Files:**
- Modify: `vibecoding-for-developer/portfolio/index.html`

- [ ] **Step 1: Replace the entire `<head>` block**

Replace the `<head>` contents (between `<head>` and `</head>`) in `vibecoding-for-developer/portfolio/index.html` with:

```html
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>개발자 바이브 코딩 워크숍 | ROBOCO</title>
  <meta name="description" content="AI로 모든 스택의 소프트웨어 엔지니어링 수준을 적은 비용·짧은 기간에 끌어올리고, 개발자 학습까지 가속합니다. Claude 기반, 시니어 개발자 10~20명.">

  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <link rel="canonical" href="https://roboco.io/vibecoding-workshop/vibecoding-for-developer/portfolio/">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="개발자 바이브 코딩 워크숍 | ROBOCO">
  <meta property="og:description" content="AI로 모든 스택의 소프트웨어 엔지니어링 수준을 적은 비용·짧은 기간에 끌어올리고, 개발자 학습까지 가속합니다.">
  <meta property="og:image" content="https://roboco.io/vibecoding-workshop/vibecoding-for-developer/portfolio/assets/og-image.png">
  <meta property="og:url" content="https://roboco.io/vibecoding-workshop/vibecoding-for-developer/portfolio/">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="개발자 바이브 코딩 워크숍 | ROBOCO">
  <meta name="twitter:description" content="AI로 모든 스택의 소프트웨어 엔지니어링 수준을 적은 비용·짧은 기간에 끌어올리고, 개발자 학습까지 가속합니다.">
  <meta name="twitter:image" content="https://roboco.io/vibecoding-workshop/vibecoding-for-developer/portfolio/assets/og-image.png">

  <!-- Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "개발자 바이브 코딩 워크숍",
    "description": "AI를 활용해 모던 소프트웨어 엔지니어링 모범사례를 적은 비용·짧은 기간에 도입하고 개발자 학습을 가속하는 4시간 실습 워크숍.",
    "provider": {
      "@type": "Organization",
      "name": "ROBOCO",
      "sameAs": "https://github.com/roboco-io"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "개발팀 (시니어 엔지니어 3년+)"
    }
  }
  </script>

  <link rel="stylesheet" href="styles.css">
```

- [ ] **Step 2: Verify locally**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Expected: page renders, tab title shows "개발자 바이브 코딩 워크숍 | ROBOCO", favicon shows the ROBOCO mark.

- [ ] **Step 3: Verify meta tags in DevTools**

In the browser, View Page Source. Confirm all 4 OG/Twitter URLs use `roboco.io` (not `roboco-io.github.io`). This is the lesson learned from the sibling page.

Expected: 4 occurrences of `roboco.io/vibecoding-workshop/vibecoding-for-developer/portfolio/`. Zero occurrences of `roboco-io.github.io`.

- [ ] **Step 4: Commit**

```bash
git add vibecoding-for-developer/portfolio/index.html
git commit -m "Add meta tags and Schema.org markup to developer portfolio"
```

---

## Task 4: Build §1 Hero section

**Files:**
- Modify: `vibecoding-for-developer/portfolio/index.html`

- [ ] **Step 1: Replace `<body>` contents with the Hero section**

Replace everything between `<body>` and `</body>` in `vibecoding-for-developer/portfolio/index.html` with:

```html
  <!-- ====== §1 Hero ====== -->
  <section class="hero">
    <div class="container">
      <span class="hero-eyebrow">개발자 바이브 코딩 워크숍</span>
      <h1 class="display">
        AI가 소프트웨어 엔지니어링 수준을<br>
        적은 비용·짧은 기간에 끌어올립니다
      </h1>
      <p class="hero-sub">
        스택 무관 — Python·Go·TypeScript·React 무엇이든.<br>
        4시간 안에 자기 코드에서 직접 체득하고, AI를 학습 도구로 활용해 지속 개선하는 패턴까지 가져갑니다.<br>
        Claude 기반 — 시니어 개발자 10~20명.
      </p>
      <div class="hero-ctas">
        <a class="btn btn-primary"
           href="mailto:contact@roboco.io?subject=%5B%EC%9B%8C%ED%81%AC%EC%88%8D%20%EB%AC%B8%EC%9D%98%20%2F%20web-2026-05%5D%20%EA%B0%9C%EB%B0%9C%EC%9E%90%20%EB%B0%94%EC%9D%B4%EB%B8%8C%20%EC%BD%94%EB%94%A9&body=%ED%9A%8C%EC%82%AC%EB%AA%85%3A%20%0A%EC%9D%B8%EC%9B%90%3A%20%0A%ED%9D%AC%EB%A7%9D%20%EC%9D%BC%EC%A0%95%3A%20%0A%EC%A3%BC%EB%A0%A5%20%EC%8A%A4%ED%83%9D%3A%20%0A%ED%98%84%EC%9E%AC%20CI%2FCD%20%EC%84%B1%EC%88%99%EB%8F%84%20%EC%9E%90%ED%8F%89%3A%20">
          도입 문의하기 →
        </a>
        <a class="btn btn-secondary" href="#showcase">모범사례 5종 보기 ↓</a>
      </div>
      <div class="hero-brand">ROBOCO</div>
    </div>
  </section>

  <script src="scripts.js" defer></script>
```

The mailto subject is `[워크숍 문의 / web-2026-05] 개발자 바이브 코딩` (URL-encoded). The body is `회사명: \n인원: \n희망 일정: \n주력 스택: \n현재 CI/CD 성숙도 자평: ` (URL-encoded).

- [ ] **Step 2: Verify the Hero renders correctly**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Expected: large H1 display heading, two CTA buttons, ROBOCO brand mark. Visual style identical to the sibling page's Hero (because styles.css is reused).

- [ ] **Step 3: Verify the primary CTA mailto link**

Click the "도입 문의하기 →" button. Expected: the OS mail client opens a new message with:
- To: `contact@roboco.io`
- Subject: `[워크숍 문의 / web-2026-05] 개발자 바이브 코딩`
- Body: prefilled with `회사명: / 인원: / 희망 일정: / 주력 스택: / 현재 CI/CD 성숙도 자평: `

- [ ] **Step 4: Commit**

```bash
git add vibecoding-for-developer/portfolio/index.html
git commit -m "Build §1 Hero section with Level Boost framing"
```

---

## Task 5: Build §2 Showcase scaffold + card 01 (컨텍스트 엔지니어링)

**Files:**
- Modify: `vibecoding-for-developer/portfolio/index.html`

- [ ] **Step 1: Insert the Showcase wrapper and card 01 before `<script src="scripts.js" defer></script>`**

Insert just before the `<script>` tag at the end of `<body>`:

```html
  <!-- ====== §2 Showcase ====== -->
  <section class="showcase fade-in" id="showcase">
    <div class="container">
      <header class="showcase-header">
        <h2 class="h1">AI가 활성화하는 5개 영역의 SE 수준 향상</h2>
        <p class="text-secondary">4시간 안에 자기 코드에 적용 — 각 영역이 비용·기간을 줄이고 학습을 가속하는 방법</p>
      </header>

      <div class="showcase-notice">
        <strong>ⓘ 이 페이지에 표시된 결과물은 실제 진행된 워크숍에서 만들어진 패턴을 공개 가능한 범위 내에서 일반화·재구성한 것입니다.</strong><br>
        구체적인 회사명·코드·내부 자료는 모두 비공개 처리되었으며, 모범사례별 워크플로우와 산출물 형식만 추출하여 표현했습니다.
      </div>

      <div class="showcase-list">

        <article class="showcase-item fade-in">
          <div class="showcase-meta">
            <div class="showcase-meta-num">01 / 05</div>
            <h3 class="showcase-meta-title">컨텍스트 엔지니어링</h3>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">정의</span>
              <span class="showcase-meta-value">AI가 프로젝트를 이해할 수 있도록 컨텍스트를 코드처럼 관리한다 (CLAUDE.md, /init)</span>
            </div>

            <div class="showcase-block">
              <div class="showcase-block-label">현재의 마찰</div>
              <p class="showcase-problem">설문 60%가 'AI에게 코드베이스를 효과적으로 전달하지 못함'을 도입 1위 장애물로 꼽았다. 컨텍스트는 사람이 매번 채팅에 다시 붙여넣고, 신입은 코드를 읽어 추측한다.</p>
            </div>

            <div class="showcase-block">
              <div class="showcase-block-label">AI Level Boost</div>
              <ol class="showcase-flow">
                <li><strong>Friction 제거:</strong> /init이 프로젝트 구조를 자동 스캔해 CLAUDE.md 초안 생성</li>
                <li>인터뷰 퍼스트 패턴이 빠진 맥락을 AI가 질문해 채운다</li>
                <li>CLAUDE.md가 모든 후속 세션의 자동 컨텍스트</li>
                <li><strong>🎓 학습 가속:</strong> AI의 질문이 학생의 모호한 이해를 명시화 → "무엇을 모르는지" 자체를 알게 된다</li>
              </ol>
            </div>

            <div class="showcase-block">
              <div class="showcase-block-label">산출물 + 지속 효과</div>
              <ul class="showcase-outputs">
                <li>CLAUDE.md (프로젝트 루트)</li>
                <li>인터뷰 퍼스트 프롬프트 키트</li>
                <li>새 모듈·도메인 추가 시 동일 패턴 반복 → 신입 온보딩 시간 단축</li>
              </ul>
            </div>
          </div>
          <div>
            <div class="showcase-mockup">
              <img src="assets/mockups/01-context.svg" alt="컨텍스트 엔지니어링 — CLAUDE.md 생성 콘셉트" loading="lazy">
            </div>
            <p class="showcase-caption">💡 워크숍에서 만든 CLAUDE.md + /init 패턴의 결과 콘셉트입니다</p>
          </div>
        </article>

      </div>
    </div>
  </section>
```

(The `</div></div></section>` will close the showcase list, container, and section. Cards 02–05 will be inserted between `<article>` and `</div>` in later tasks. Note: the closing `</div>` for `showcase-list` and `</div>` for `container` and `</section>` are intentionally included now so the page renders valid HTML.)

- [ ] **Step 2: Verify the showcase scaffold and card 01 render**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Expected:
- §2 header "AI가 활성화하는 5개 영역의 SE 수준 향상"
- A note box explaining generalization
- Card 01 with "01 / 05", "컨텍스트 엔지니어링", and the three blocks (현재의 마찰 / AI Level Boost / 산출물)
- The mockup image is broken (alt text shown) because `01-context.svg` doesn't exist yet — that's expected; mockup tasks come later.

- [ ] **Step 3: Commit**

```bash
git add vibecoding-for-developer/portfolio/index.html
git commit -m "Build §2 Showcase scaffold and card 01 (Context Engineering)"
```

---

## Task 6: Build §2 card 02 (스펙 우선 개발)

**Files:**
- Modify: `vibecoding-for-developer/portfolio/index.html`

- [ ] **Step 1: Insert card 02 inside `<div class="showcase-list">`**

Find the closing `</article>` of card 01 inside `<div class="showcase-list">`. Insert immediately after it:

```html
        <article class="showcase-item fade-in">
          <div class="showcase-meta">
            <div class="showcase-meta-num">02 / 05</div>
            <h3 class="showcase-meta-title">스펙 우선 개발</h3>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">정의</span>
              <span class="showcase-meta-value">변경 전에 OpenSpec으로 명세를 만들고, AI가 명세를 컨텍스트로 코드를 생성한다</span>
            </div>

            <div class="showcase-block">
              <div class="showcase-block-label">현재의 마찰</div>
              <p class="showcase-problem">스펙은 항상 outdated. 작성 시간 부족, 결국 코드가 진실의 원천이 되고, 합류한 팀원은 코드를 읽어 추측한다.</p>
            </div>

            <div class="showcase-block">
              <div class="showcase-block-label">AI Level Boost</div>
              <ol class="showcase-flow">
                <li><strong>Friction 제거:</strong> openspec init이 기존 코드에서 스펙을 역추출</li>
                <li>openspec propose로 변경 제안을 생성 → 같은 스펙이 테스트·문서·코드리뷰의 공통 컨텍스트</li>
                <li>스펙↔코드 드리프트를 AI가 자동 감지</li>
                <li><strong>🎓 학습 가속:</strong> 시니어도 처음 보는 OpenSpec 도구를 AI 페어와 4시간 안에 실전 사용</li>
              </ol>
            </div>

            <div class="showcase-block">
              <div class="showcase-block-label">산출물 + 지속 효과</div>
              <ul class="showcase-outputs">
                <li>OpenSpec 스펙 디렉토리 (openspec/specs/)</li>
                <li>Claude 스킬 (.claude/skills/) — 팀이 호출 가능</li>
                <li>문서 노후화 비용 자체가 사라진다</li>
              </ul>
            </div>
          </div>
          <div>
            <div class="showcase-mockup">
              <img src="assets/mockups/02-spec.svg" alt="스펙 우선 개발 — OpenSpec 변경 제안 콘셉트" loading="lazy">
            </div>
            <p class="showcase-caption">💡 워크숍에서 만든 OpenSpec + Claude 스킬 패턴의 결과 콘셉트입니다</p>
          </div>
        </article>
```

- [ ] **Step 2: Verify card 02 renders**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Expected: card 02 appears below card 01 with "02 / 05" and "스펙 우선 개발" title.

- [ ] **Step 3: Commit**

```bash
git add vibecoding-for-developer/portfolio/index.html
git commit -m "Build §2 card 02 (Spec-First Development)"
```

---

## Task 7: Build §2 card 03 (자동화 테스트 + 코드 품질)

**Files:**
- Modify: `vibecoding-for-developer/portfolio/index.html`

- [ ] **Step 1: Insert card 03 after card 02**

Find the closing `</article>` of card 02. Insert immediately after it:

```html
        <article class="showcase-item fade-in">
          <div class="showcase-meta">
            <div class="showcase-meta-num">03 / 05</div>
            <h3 class="showcase-meta-title">자동화 테스트 + 코드 품질</h3>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">정의</span>
              <span class="showcase-meta-value">AI가 사양 기반 테스트와 린트 설정을 작성, 사람이 검수, Makefile로 한 줄 실행</span>
            </div>

            <div class="showcase-block">
              <div class="showcase-block-label">현재의 마찰</div>
              <p class="showcase-problem">설문 47%가 테스트를 최대 병목으로 답했다. 시간 부족으로 작성을 미루고, 작성된 테스트도 사양과 동기화 안 됨. 린트 설정도 프로젝트 초기에 잡고 끝나면 진화하지 않는다.</p>
            </div>

            <div class="showcase-block">
              <div class="showcase-block-label">AI Level Boost</div>
              <ol class="showcase-flow">
                <li><strong>Friction 제거:</strong> OpenSpec 스펙을 컨텍스트로 → AI가 '사양 기반' 테스트 생성</li>
                <li>Human-in-the-loop 검수가 환각 우려(87%)에 직접 대응</li>
                <li>린트 룰도 AI가 코드를 보고 적합한 셋업을 제안</li>
                <li><strong>🎓 학습 가속:</strong> 검토 과정에서 AI의 추론을 따라가며 학생이 테스트 설계 감각을 빠르게 체화</li>
              </ol>
            </div>

            <div class="showcase-block">
              <div class="showcase-block-label">산출물 + 지속 효과</div>
              <ul class="showcase-outputs">
                <li>단위 테스트 · E2E 테스트 · 린트 설정 · Makefile</li>
                <li>커버리지 ≥80%</li>
                <li>새 기능마다 동일 패턴 반복 → 팀 전원이 같은 출발선</li>
              </ul>
            </div>
          </div>
          <div>
            <div class="showcase-mockup">
              <img src="assets/mockups/03-test.svg" alt="자동화 테스트 — make test 실행 콘셉트" loading="lazy">
            </div>
            <p class="showcase-caption">💡 워크숍에서 만든 OpenSpec + Makefile 패턴의 실행 결과 콘셉트입니다</p>
          </div>
        </article>
```

- [ ] **Step 2: Verify card 03 renders**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Expected: card 03 with "03 / 05" and "자동화 테스트 + 코드 품질" title appears below card 02.

- [ ] **Step 3: Commit**

```bash
git add vibecoding-for-developer/portfolio/index.html
git commit -m "Build §2 card 03 (Automated Testing + Code Quality)"
```

---

## Task 8: Build §2 card 04 (품질 게이트)

**Files:**
- Modify: `vibecoding-for-developer/portfolio/index.html`

- [ ] **Step 1: Insert card 04 after card 03**

Find the closing `</article>` of card 03. Insert immediately after it:

```html
        <article class="showcase-item fade-in">
          <div class="showcase-meta">
            <div class="showcase-meta-num">04 / 05</div>
            <h3 class="showcase-meta-title">품질 게이트</h3>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">정의</span>
              <span class="showcase-meta-value">pre-commit / pre-push hook이 로컬에서 즉시 품질 검증을 강제한다</span>
            </div>

            <div class="showcase-block">
              <div class="showcase-block-label">현재의 마찰</div>
              <p class="showcase-problem">설문 33%가 CI 자동화 검사가 거의 없다고 답했다. 검사가 PR 머지 후나 배포 직전에 처음 발견되고, 33% 팀은 PR 자동 품질 게이트도 활용하지 않는다.</p>
            </div>

            <div class="showcase-block">
              <div class="showcase-block-label">AI Level Boost</div>
              <ol class="showcase-flow">
                <li><strong>Friction 제거:</strong> AI가 03에서 만든 린트·테스트를 hook 스크립트로 묶어준다</li>
                <li>pre-commit이 커밋마다 린트+단위 테스트, pre-push가 푸시 시 E2E+커버리지</li>
                <li>복잡한 CI 파이프라인 없이 워크숍 직후 적용</li>
                <li><strong>🎓 학습 가속:</strong> hook 동작을 통과/차단 양방향으로 시연해 학생이 게이트의 의미를 실전 체득</li>
              </ol>
            </div>

            <div class="showcase-block">
              <div class="showcase-block-label">산출물 + 지속 효과</div>
              <ul class="showcase-outputs">
                <li>.git/hooks/pre-commit · .git/hooks/pre-push</li>
                <li>훅 공유 스크립트 (팀 배포용)</li>
                <li>코드 품질이 사람에 의존하지 않고 프로세스에 의존</li>
              </ul>
            </div>
          </div>
          <div>
            <div class="showcase-mockup">
              <img src="assets/mockups/04-gate.svg" alt="품질 게이트 — git hook 통과·실패 시나리오 콘셉트" loading="lazy">
            </div>
            <p class="showcase-caption">💡 워크숍에서 만든 Git Hooks 패턴의 결과 콘셉트입니다</p>
          </div>
        </article>
```

- [ ] **Step 2: Verify card 04 renders**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Expected: card 04 with "04 / 05" and "품질 게이트" title appears below card 03.

- [ ] **Step 3: Commit**

```bash
git add vibecoding-for-developer/portfolio/index.html
git commit -m "Build §2 card 04 (Quality Gate)"
```

---

## Task 9: Build §2 card 05 (팀 확산 플레이북)

**Files:**
- Modify: `vibecoding-for-developer/portfolio/index.html`

- [ ] **Step 1: Insert card 05 after card 04**

Find the closing `</article>` of card 04. Insert immediately after it:

```html
        <article class="showcase-item fade-in">
          <div class="showcase-meta">
            <div class="showcase-meta-num">05 / 05</div>
            <h3 class="showcase-meta-title">팀 확산 플레이북</h3>
            <div class="showcase-meta-row">
              <span class="showcase-meta-label">정의</span>
              <span class="showcase-meta-value">워크숍 경험을 튜토리얼·전환 계획서로 패키징해 팀 전체로 확장하는 활동</span>
            </div>

            <div class="showcase-block">
              <div class="showcase-block-label">현재의 마찰</div>
              <p class="showcase-problem">한 명이 워크숍을 다녀와도 팀 전체가 같은 패턴을 따르기까지는 별개. 보통 다시 잊혀지고, 도입은 한 사람의 영웅적 노력에 의존한다.</p>
            </div>

            <div class="showcase-block">
              <div class="showcase-block-label">AI Level Boost</div>
              <ol class="showcase-flow">
                <li><strong>Friction 제거:</strong> Claude Code 세션 로그를 분석해 튜토리얼 자동 생성</li>
                <li>generate-plan 스킬이 팀 실무 환경에 맞춤 전환 계획서 생성</li>
                <li>Claude 스킬로 패키징해 누구나 같은 패턴 호출</li>
                <li><strong>🎓 학습 가속:</strong> 팀원 각자가 미니 워크숍 형식으로 AI와 따라하며 학습 가속</li>
              </ol>
            </div>

            <div class="showcase-block">
              <div class="showcase-block-label">산출물 + 지속 효과</div>
              <ul class="showcase-outputs">
                <li>튜토리얼 문서 · migration-plan.md</li>
                <li>팀용 Claude 스킬</li>
                <li>4주 안에 팀 전원이 동일 워크플로우로 수렴</li>
              </ul>
            </div>
          </div>
          <div>
            <div class="showcase-mockup">
              <img src="assets/mockups/05-playbook.svg" alt="팀 확산 플레이북 — 튜토리얼 + migration-plan 콘셉트" loading="lazy">
            </div>
            <p class="showcase-caption">💡 워크숍 마무리 활동에서 만든 튜토리얼 + migration-plan 패턴의 결과 콘셉트입니다</p>
          </div>
        </article>
```

- [ ] **Step 2: Verify card 05 renders**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Expected: card 05 with "05 / 05" and "팀 확산 플레이북" title appears below card 04. All 5 cards now visible in sequence.

- [ ] **Step 3: Commit**

```bash
git add vibecoding-for-developer/portfolio/index.html
git commit -m "Build §2 card 05 (Team Spread Playbook)"
```

---

## Task 10: Build §3 Methodology section

**Files:**
- Modify: `vibecoding-for-developer/portfolio/index.html`

- [ ] **Step 1: Insert §3 after the §2 closing `</section>`**

Find the closing `</section>` of the §2 Showcase block. Insert immediately after it:

```html
  <!-- ====== §3 Methodology ====== -->
  <section class="methodology fade-in">
    <div class="container">
      <header class="methodology-header">
        <h2 class="h1">AI를 믿을 수 있게 만드는 두 가지 패턴</h2>
        <p class="text-secondary">컨텍스트 부족과 환각 우려를 구조적으로 해결하면서, 동시에 개발자 학습을 가속한다</p>
      </header>

      <div class="methodology-grid">
        <div class="methodology-card">
          <h3 class="h2">인터뷰 퍼스트 패턴</h3>
          <div class="methodology-quote">"써줘"가 아니라<br>"나에게 질문해줘"</div>
          <div class="methodology-arrow">↓</div>
          <p class="methodology-outcome">컨텍스트 부족(60%) 구조적 해결.</p>
          <p class="methodology-outcome" style="margin-top: var(--space-3);">🎓 <strong>학습 가속:</strong> AI의 질문이 학생의 모호한 이해를 명시화 → "무엇을 모르는지" 자체를 알게 된다.</p>
        </div>
        <div class="methodology-card">
          <h3 class="h2">Human-in-the-loop 검증</h3>
          <div class="methodology-quote">AI 생성 →<br>사람 검토 → 실행 → 피드백</div>
          <div class="methodology-arrow">↓</div>
          <p class="methodology-outcome">환각 우려(87%) 직접 대응.</p>
          <p class="methodology-outcome" style="margin-top: var(--space-3);">🎓 <strong>학습 가속:</strong> 검토 과정에서 AI의 추론을 학습 → 다음에는 더 빠르게 판단한다.</p>
        </div>
      </div>

      <p class="methodology-footnote">
        87%의 개발자가 'AI 환각'을 우려한다. 답은 '더 똑똑한 AI'가 아니라 '환각을 잡아내는 프로세스'다 — 그리고 그 프로세스는 학습도 가속한다.
      </p>
      <p class="methodology-footnote" style="margin-top: var(--space-4);">
        <strong>이 두 패턴은 워크숍에서 단순히 설명되는 게 아니라 시연됩니다.</strong> 시니어 개발자가 처음 보는 OpenSpec·Claude Skill·Git Hooks를 AI와 함께 4시간 안에 자기 코드에 적용 — 워크숍 자체가 라이브 데모입니다.
      </p>
    </div>
  </section>
```

- [ ] **Step 2: Verify §3 renders**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Expected:
- Section heading "AI를 믿을 수 있게 만드는 두 가지 패턴"
- Two cards side by side, each with a quote, arrow, outcome, and 🎓 학습 가속 line
- Two footnotes below (statistics + live-demo)

- [ ] **Step 3: Commit**

```bash
git add vibecoding-for-developer/portfolio/index.html
git commit -m "Build §3 Methodology with learning-acceleration lines"
```

---

## Task 11: Build §4 DORA Matrix section

**Files:**
- Modify: `vibecoding-for-developer/portfolio/index.html`

- [ ] **Step 1: Insert §4 after the §3 closing `</section>`**

Find the closing `</section>` of §3 Methodology. Insert immediately after it:

```html
  <!-- ====== §4 DORA Matrix ====== -->
  <section class="matrix fade-in">
    <div class="container">
      <header class="matrix-header">
        <h2 class="h1">자가 도입 팀이 무엇을 측정할 수 있게 되는가</h2>
        <p class="text-secondary">5개 영역이 4개 DORA 지표에 어떻게 작용하는가</p>
      </header>

      <div class="matrix-table-wrap">
        <table class="matrix-table matrix-dora">
          <thead>
            <tr>
              <th>영역</th>
              <th>배포 빈도</th>
              <th>변경 리드타임</th>
              <th>변경 실패율</th>
              <th>MTTR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01 컨텍스트 엔지니어링</td>
              <td class="matrix-cell-low">◯<span class="dora-label">Side</span></td>
              <td class="matrix-cell-half">◐<span class="dora-label">Indirect</span></td>
              <td class="matrix-cell-half">◐<span class="dora-label">Indirect</span></td>
              <td class="matrix-cell-half">◐<span class="dora-label">Indirect</span></td>
            </tr>
            <tr>
              <td>02 스펙 우선 개발</td>
              <td class="matrix-cell-low">◯<span class="dora-label">Side</span></td>
              <td class="matrix-cell-full">●<span class="dora-label">Direct</span></td>
              <td class="matrix-cell-full">●<span class="dora-label">Direct</span></td>
              <td class="matrix-cell-half">◐<span class="dora-label">Indirect</span></td>
            </tr>
            <tr>
              <td>03 자동화 테스트 + 코드 품질</td>
              <td class="matrix-cell-half">◐<span class="dora-label">Indirect</span></td>
              <td class="matrix-cell-half">◐<span class="dora-label">Indirect</span></td>
              <td class="matrix-cell-full">●<span class="dora-label">Direct</span></td>
              <td class="matrix-cell-low">◯<span class="dora-label">Side</span></td>
            </tr>
            <tr>
              <td>04 품질 게이트</td>
              <td class="matrix-cell-half">◐<span class="dora-label">Indirect</span></td>
              <td class="matrix-cell-half">◐<span class="dora-label">Indirect</span></td>
              <td class="matrix-cell-full">●<span class="dora-label">Direct</span></td>
              <td class="matrix-cell-half">◐<span class="dora-label">Indirect</span></td>
            </tr>
            <tr>
              <td>05 팀 확산 플레이북</td>
              <td class="matrix-cell-half">◐<span class="dora-label">Indirect</span></td>
              <td class="matrix-cell-half">◐<span class="dora-label">Indirect</span></td>
              <td class="matrix-cell-half">◐<span class="dora-label">Indirect</span></td>
              <td class="matrix-cell-low">◯<span class="dora-label">Side</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="matrix-legend">
        <span><span class="matrix-cell-full">●</span> Direct (직접)</span>
        <span><span class="matrix-cell-half">◐</span> Indirect (간접)</span>
        <span><span class="matrix-cell-low">◯</span> Side (부수)</span>
      </div>

      <p class="matrix-footnote">
        DORA 4지표는 'AI 도입 효과'를 정량화하는 보편적 언어다. 워크숍은 측정 도구를 제공하지 않지만, 5개 영역이 각 지표에 어떻게 작용하는지를 명확히 한다. 측정 기반 구축이 필요한 팀에는 도입 후 후속 컨설팅으로 별도 지원한다.
      </p>
    </div>
  </section>
```

- [ ] **Step 2: Verify §4 renders**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Expected:
- Section heading "자가 도입 팀이 무엇을 측정할 수 있게 되는가"
- 5×4 matrix with row headers (5 areas) and column headers (4 DORA metrics)
- Each cell shows both a symbol (●/◐/◯) and a text label (Direct/Indirect/Side) — color-independent encoding
- Legend below with three score meanings

- [ ] **Step 3: Verify text labels appear next to symbols**

In the rendered page, every cell should show the symbol immediately followed by the text label. The text label is small (~11px) and dimmed (~65% opacity) but readable.

- [ ] **Step 4: Commit**

```bash
git add vibecoding-for-developer/portfolio/index.html
git commit -m "Build §4 DORA Matrix with color-independent text labels"
```

---

## Task 12: Build §5 Operations and §6 Final CTA + Footer

**Files:**
- Modify: `vibecoding-for-developer/portfolio/index.html`

- [ ] **Step 1: Insert §5 after the §4 closing `</section>`**

Find the closing `</section>` of §4 DORA Matrix. Insert immediately after it:

```html
  <!-- ====== §5 Operations ====== -->
  <section class="operations fade-in">
    <div class="container">
      <header class="operations-header">
        <h2 class="h1">검증된 개발자용 바이브 코딩 프로세스</h2>
        <p class="text-secondary">일회성 이벤트가 아닌, 반복 운영되는 정규 프로세스</p>
      </header>

      <div class="operations-grid">
        <div class="operations-col">
          <h3>워크숍 운영</h3>
          <div class="operations-row"><span>인원</span><span>10~20명 (시니어 3년+)</span></div>
          <div class="operations-row"><span>시간</span><span>4시간</span></div>
          <div class="operations-row"><span>형식</span><span>온라인 / 오프라인</span></div>
          <div class="operations-row"><span>사전 준비</span><span>1주 전 안내</span></div>
        </div>
        <div class="operations-col">
          <h3>검증 이력</h3>
          <div class="operations-row"><span>운영 이력</span><span>반복 운영</span></div>
          <div class="operations-row"><span>보안 검토</span><span>완료</span></div>
          <div class="operations-row"><span>적용 가능 스택</span><span>Python · Go · TS · React · Java</span></div>
          <div class="operations-row"><span>실제 업무 사용</span><span>적용 중</span></div>
        </div>
        <div class="operations-col">
          <h3>사전 준비</h3>
          <div class="operations-row"><span>Claude Code CLI</span><span>필수</span></div>
          <div class="operations-row"><span>OMC · OpenSpec</span><span>필수</span></div>
          <div class="operations-row"><span>GitHub CLI</span><span>필수</span></div>
          <div class="operations-row"><span>실습 자료</span><span>RealWorld Fork</span></div>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Insert §6 CTA and Footer after §5**

After the closing `</section>` of §5, insert:

```html
  <!-- ====== §6 Final CTA ====== -->
  <section class="cta fade-in">
    <div class="container">
      <h2 class="h1">팀에 워크숍 도입을 검토하시나요?</h2>
      <p>10~20명 규모, 시니어 개발자 대상. 인원·일정·맞춤 사례는 메일로 회신드립니다.</p>
      <a class="btn btn-primary"
         href="mailto:contact@roboco.io?subject=%5B%EC%9B%8C%ED%81%AC%EC%88%8D%20%EB%AC%B8%EC%9D%98%20%2F%20web-2026-05%5D%20%EA%B0%9C%EB%B0%9C%EC%9E%90%20%EB%B0%94%EC%9D%B4%EB%B8%8C%20%EC%BD%94%EB%94%A9&body=%ED%9A%8C%EC%82%AC%EB%AA%85%3A%20%0A%EC%9D%B8%EC%9B%90%3A%20%0A%ED%9D%AC%EB%A7%9D%20%EC%9D%BC%EC%A0%95%3A%20%0A%EC%A3%BC%EB%A0%A5%20%EC%8A%A4%ED%83%9D%3A%20%0A%ED%98%84%EC%9E%AC%20CI%2FCD%20%EC%84%B1%EC%88%99%EB%8F%84%20%EC%9E%90%ED%8F%89%3A%20">
        contact@roboco.io 로 문의하기 →
      </a>
    </div>
  </section>

  <!-- ====== Footer ====== -->
  <footer class="footer">
    <div class="container">
      <div class="footer-brand">ROBOCO</div>
      <div>© 2026 ROBOCO. 개발자 바이브 코딩 워크숍.</div>
      <div style="margin-top: var(--space-3);">
        본 페이지는 실제 진행된 워크숍 결과물을 공개 가능한 범위에서 일반화하여 작성되었습니다.
      </div>
    </div>
  </footer>
```

- [ ] **Step 3: Verify §5 and §6 render**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Expected:
- §5: 3 columns (운영 / 검증 이력 / 사전 준비) with the rows above
- §6: large heading, sub-copy, primary CTA button "contact@roboco.io 로 문의하기 →"
- Footer: ROBOCO mark, copyright, generalization notice

- [ ] **Step 4: Click the final CTA mailto link**

Click "contact@roboco.io 로 문의하기 →". Expected: same prefilled mail draft as Hero CTA.

- [ ] **Step 5: Commit**

```bash
git add vibecoding-for-developer/portfolio/index.html
git commit -m "Build §5 Operations and §6 Final CTA + Footer"
```

---

## Task 13: Add IntersectionObserver fade-in script

**Files:**
- Modify: `vibecoding-for-developer/portfolio/scripts.js` (this file was copied from the sibling page in Task 1)

- [ ] **Step 1: Inspect scripts.js**

The file was copied from `vibecoding-for-nondeveloper/portfolio/scripts.js` in Task 1. Inspect it:

```bash
cat vibecoding-for-developer/portfolio/scripts.js
```

Expected: a small IntersectionObserver script that adds a `.visible` class to elements with `.fade-in` as they scroll into view. If the file is empty or missing, copy it again:

```bash
cp vibecoding-for-nondeveloper/portfolio/scripts.js vibecoding-for-developer/portfolio/scripts.js
```

- [ ] **Step 2: Verify fade-in works on the developer page**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Scroll from top to bottom. Expected: each `.fade-in` section (Showcase, Methodology, Matrix, Operations, CTA) animates in from `opacity:0; translateY(12px)` to `opacity:1; translateY(0)` as it enters the viewport. The Hero section does not fade in (it's visible on load).

- [ ] **Step 3: Verify the reduced-motion guard**

Open browser DevTools → Rendering → emulate `prefers-reduced-motion: reduce`. Reload the page. Expected: sections appear instantly without animation.

- [ ] **Step 4: Commit (if the file needed re-copying)**

If scripts.js was empty or missing and you copied it in Step 1:

```bash
git add vibecoding-for-developer/portfolio/scripts.js
git commit -m "Add IntersectionObserver fade-in script to developer portfolio"
```

If the file was already correct from Task 1, skip this step (no changes to commit).

---

## Task 14: Build Mockup 01 — 컨텍스트 엔지니어링 (CLAUDE.md)

**Files:**
- Create: `vibecoding-for-developer/portfolio/assets/mockups/01-context.svg`

- [ ] **Step 1: Write the SVG**

Write to `vibecoding-for-developer/portfolio/assets/mockups/01-context.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" font-family="-apple-system, system-ui, sans-serif">
  <!-- Background -->
  <rect width="1600" height="1000" fill="#FAFAFA"/>

  <!-- Header bar -->
  <rect x="40" y="40" width="1520" height="60" rx="8" fill="#FFFFFF" stroke="#E5E7EB"/>
  <circle cx="68" cy="70" r="8" fill="#5B5BD6"/>
  <text x="86" y="75" font-size="20" font-weight="600" fill="#0A0A0A">Claude Code · realworld-app</text>
  <text x="1500" y="75" font-size="18" fill="#71717A" text-anchor="end">/init · 12초 전</text>

  <!-- Left panel: project tree (1/3) -->
  <rect x="40" y="120" width="480" height="840" rx="8" fill="#FFFFFF" stroke="#E5E7EB"/>
  <text x="68" y="160" font-size="22" font-weight="600" fill="#0A0A0A">📁 Project</text>

  <g font-size="22" fill="#0A0A0A">
    <text x="68" y="220">📁 realworld-app/</text>
    <text x="90" y="260">📁 src/</text>
    <text x="90" y="300">📁 tests/</text>
    <text x="90" y="340">📁 docs/</text>
    <text x="90" y="380">📁 .claude/</text>
  </g>

  <!-- Active CLAUDE.md highlight -->
  <rect x="80" y="400" width="440" height="44" rx="6" fill="#EEF0FF"/>
  <text x="90" y="430" font-size="22" font-weight="600" fill="#5B5BD6">📄 CLAUDE.md  ⬅ auto-generated</text>

  <text x="90" y="480" font-size="22" fill="#0A0A0A">📄 README.md</text>
  <text x="90" y="520" font-size="22" fill="#0A0A0A">📄 package.json</text>

  <!-- Meta -->
  <text x="68" y="900" font-size="18" fill="#71717A">스캔된 파일: 247개</text>
  <text x="68" y="930" font-size="18" fill="#71717A">언어 감지: TS · React · Node.js</text>

  <!-- Right top: CLAUDE.md preview (2/3) -->
  <rect x="540" y="120" width="1020" height="420" rx="8" fill="#FFFFFF" stroke="#E5E7EB"/>
  <text x="568" y="160" font-size="22" font-weight="600" fill="#0A0A0A">📄 CLAUDE.md</text>

  <g font-family="SF Mono, Menlo, monospace" font-size="20" fill="#0A0A0A">
    <text x="568" y="210"># CLAUDE.md</text>
    <text x="568" y="250" fill="#525252">## Project Overview</text>
    <text x="568" y="290">RealWorld 구현체. 백엔드 Node/Express, 프론트 React.</text>
    <text x="568" y="340" fill="#525252">## Architecture</text>
    <text x="568" y="380">- API: REST /api/* (articles, users, comments)</text>
    <text x="568" y="410">- Auth: JWT, bcrypt</text>
    <text x="568" y="460" fill="#525252">## Commands</text>
    <text x="568" y="500">- `npm test` · `npm run lint` · `npm run dev`</text>
  </g>

  <!-- Right bottom: Claude Code interview (2/3) -->
  <rect x="540" y="560" width="1020" height="400" rx="8" fill="#FFFFFF" stroke="#E5E7EB"/>
  <text x="568" y="600" font-size="22" font-weight="600" fill="#0A0A0A">💬 Claude Code</text>

  <!-- User msg -->
  <rect x="568" y="620" width="120" height="36" rx="4" fill="#EEF0FF"/>
  <text x="580" y="644" font-size="20" font-weight="600" fill="#5B5BD6">User: /init</text>

  <!-- Claude msg -->
  <text x="568" y="700" font-size="22" fill="#0A0A0A">Claude: 프로젝트를 분석했습니다. 다음 3가지를 확인해주시면 CLAUDE.md가 정확해집니다:</text>
  <text x="588" y="750" font-size="22" fill="#0A0A0A">• 주력 데이터베이스(PostgreSQL? SQLite?)는 무엇인가요?</text>
  <text x="588" y="790" font-size="22" fill="#0A0A0A">• 인증 토큰 만료 정책이 있나요?</text>
  <text x="588" y="830" font-size="22" fill="#0A0A0A">• 배포 환경(staging/prod) 분리 정도는?</text>

  <!-- Answer box hint -->
  <rect x="568" y="880" width="964" height="50" rx="6" fill="#F5F5F5" stroke="#E5E7EB"/>
  <text x="588" y="912" font-size="20" fill="#71717A">답변을 입력하세요...</text>

  <!-- Watermark -->
  <text x="1560" y="990" font-size="14" fill="#A3A3A3" text-anchor="end">ROBOCO ✕ Vibe Coding Workshop</text>
</svg>
```

- [ ] **Step 2: Verify the mockup renders**

```bash
open vibecoding-for-developer/portfolio/assets/mockups/01-context.svg
```

Expected: the SVG opens in the browser, fills the viewport, shows the 3-panel layout. All text legible at full size.

- [ ] **Step 3: Verify the mockup appears in the page**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Scroll to §2 card 01. Expected: the mockup is now visible (previously broken alt text).

- [ ] **Step 4: Commit**

```bash
git add vibecoding-for-developer/portfolio/assets/mockups/01-context.svg
git commit -m "Add mockup 01: context engineering (CLAUDE.md + project tree)"
```

---

## Task 15: Build Mockup 02 — 스펙 우선 개발 (OpenSpec)

**Files:**
- Create: `vibecoding-for-developer/portfolio/assets/mockups/02-spec.svg`

- [ ] **Step 1: Write the SVG**

Write to `vibecoding-for-developer/portfolio/assets/mockups/02-spec.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" font-family="-apple-system, system-ui, sans-serif">
  <rect width="1600" height="1000" fill="#FAFAFA"/>

  <!-- Header -->
  <rect x="40" y="40" width="1520" height="60" rx="8" fill="#FFFFFF" stroke="#E5E7EB"/>
  <circle cx="68" cy="70" r="8" fill="#5B5BD6"/>
  <text x="86" y="75" font-size="20" font-weight="600" fill="#0A0A0A">OpenSpec · realworld-app</text>
  <text x="1500" y="75" font-size="18" fill="#71717A" text-anchor="end">openspec propose · 8초 전</text>

  <!-- Left: spec tree (1/3) -->
  <rect x="40" y="120" width="480" height="840" rx="8" fill="#FFFFFF" stroke="#E5E7EB"/>
  <text x="68" y="160" font-size="22" font-weight="600" fill="#0A0A0A">📁 openspec/specs/</text>

  <g font-size="22" fill="#0A0A0A">
    <text x="88" y="220">📁 auth/</text>
    <text x="88" y="260">📁 articles/  ⬅</text>
    <text x="110" y="300" fill="#5B5BD6">📄 tasks.md</text>
    <text x="110" y="340" fill="#5B5BD6">📄 proposal.md (변경)</text>
    <text x="110" y="380" fill="#5B5BD6">📄 design.md</text>
    <text x="88" y="430">📁 comments/</text>
    <text x="88" y="470">📁 users/</text>
  </g>

  <text x="68" y="900" font-size="18" fill="#71717A">총 스펙: 4개 도메인</text>
  <text x="68" y="930" font-size="18" fill="#71717A">변경 대기: 1건</text>

  <!-- Center: diff panel (1/3) -->
  <rect x="540" y="120" width="500" height="840" rx="8" fill="#FFFFFF" stroke="#E5E7EB"/>
  <text x="568" y="160" font-size="22" font-weight="600" fill="#0A0A0A">articles/proposal.md</text>
  <text x="1020" y="160" font-size="14" fill="#71717A" text-anchor="end">+5 / -2</text>

  <g font-family="SF Mono, Menlo, monospace" font-size="18" fill="#0A0A0A">
    <text x="568" y="210" fill="#525252">## 변경 제안: 태그 필터</text>
    <text x="568" y="260" fill="#525252">@@ -42,3 +42,6 @@</text>
    <text x="568" y="300" fill="#0A0A0A">GET /api/articles 응답에 다음을</text>
    <text x="568" y="330" fill="#0A0A0A">포함한다:</text>

    <rect x="555" y="350" width="470" height="32" fill="#DCFCE7"/>
    <text x="568" y="372" fill="#15803D">+ - tag: string[] (소문자, 50자)</text>

    <rect x="555" y="390" width="470" height="32" fill="#DCFCE7"/>
    <text x="568" y="412" fill="#15803D">+ - tagFilter: string (query)</text>

    <rect x="555" y="430" width="470" height="32" fill="#FEE2E2"/>
    <text x="568" y="452" fill="#B91C1C">- - tag: string (단일 값)</text>

    <text x="568" y="510" fill="#525252">## 영향</text>
    <text x="568" y="550" fill="#0A0A0A">- 단위 테스트 2개 추가</text>
    <text x="568" y="580" fill="#0A0A0A">- E2E 시나리오 1개 갱신</text>
    <text x="568" y="610" fill="#0A0A0A">- API 문서 갱신 필요</text>

    <text x="568" y="680" fill="#525252">## 검토</text>
  </g>

  <rect x="568" y="700" width="450" height="48" rx="6" fill="#EEF0FF"/>
  <text x="588" y="730" font-size="20" fill="#5B5BD6">검토자: AI 자동 분석 ✓</text>
  <rect x="568" y="760" width="450" height="48" rx="6" fill="#FEF3C7"/>
  <text x="588" y="790" font-size="20" fill="#92400E">사용자 검토 대기</text>

  <!-- Right: Claude skill call (1/3) -->
  <rect x="1060" y="120" width="500" height="840" rx="8" fill="#FFFFFF" stroke="#E5E7EB"/>
  <text x="1088" y="160" font-size="22" font-weight="600" fill="#0A0A0A">.claude/skills/openspec-propose</text>

  <g font-size="22" fill="#0A0A0A">
    <text x="1088" y="220" font-weight="600" fill="#525252">호출 트리</text>

    <text x="1088" y="280">👤 사용자</text>
    <text x="1098" y="320" fill="#71717A">↓ "변경 제안 생성"</text>

    <text x="1088" y="370">⚙ openspec-propose 스킬</text>
    <text x="1098" y="410" fill="#71717A">↓</text>

    <text x="1088" y="460">🔧 OpenSpec CLI</text>
    <text x="1098" y="500" fill="#71717A">↓ scans articles/ spec</text>

    <text x="1088" y="550">🧠 Claude 분석</text>
    <text x="1098" y="590" fill="#71717A">↓ proposal.md diff</text>

    <text x="1088" y="640">📄 proposal.md 갱신</text>
  </g>

  <rect x="1088" y="700" width="440" height="50" rx="6" fill="#DCFCE7"/>
  <text x="1108" y="732" font-size="20" font-weight="600" fill="#15803D">✓ 통과 (3.2s)</text>

  <text x="1088" y="800" font-size="18" fill="#525252" font-weight="600">메타</text>
  <text x="1088" y="830" font-size="18" fill="#0A0A0A">변경 행: 7</text>
  <text x="1088" y="860" font-size="18" fill="#0A0A0A">스펙 일치율: 96%</text>

  <text x="1560" y="990" font-size="14" fill="#A3A3A3" text-anchor="end">ROBOCO ✕ Vibe Coding Workshop</text>
</svg>
```

- [ ] **Step 2: Verify the mockup renders**

```bash
open vibecoding-for-developer/portfolio/assets/mockups/02-spec.svg
```

Expected: SVG opens, 3-panel layout (spec tree / diff / skill call) all legible.

- [ ] **Step 3: Verify the mockup appears in the page**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Scroll to §2 card 02. Expected: the mockup is now visible.

- [ ] **Step 4: Commit**

```bash
git add vibecoding-for-developer/portfolio/assets/mockups/02-spec.svg
git commit -m "Add mockup 02: spec-first development (OpenSpec proposal)"
```

---

## Task 16: Build Mockup 03 — 자동화 테스트 + 코드 품질 (Makefile / terminal)

**Files:**
- Create: `vibecoding-for-developer/portfolio/assets/mockups/03-test.svg`

- [ ] **Step 1: Write the SVG**

Write to `vibecoding-for-developer/portfolio/assets/mockups/03-test.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" font-family="-apple-system, system-ui, sans-serif">
  <rect width="1600" height="1000" fill="#FAFAFA"/>

  <!-- Header -->
  <rect x="40" y="40" width="1520" height="60" rx="8" fill="#FFFFFF" stroke="#E5E7EB"/>
  <circle cx="68" cy="70" r="8" fill="#5B5BD6"/>
  <text x="86" y="75" font-size="20" font-weight="600" fill="#0A0A0A">make test · realworld-app</text>
  <text x="1500" y="75" font-size="18" fill="#71717A" text-anchor="end">done in 4m 32s</text>

  <!-- Top: Makefile preview (top 1/3) -->
  <rect x="40" y="120" width="1520" height="260" rx="8" fill="#FFFFFF" stroke="#E5E7EB"/>
  <text x="68" y="160" font-size="22" font-weight="600" fill="#0A0A0A">📄 Makefile</text>

  <g font-family="SF Mono, Menlo, monospace" font-size="22" fill="#0A0A0A">
    <text x="68" y="210"><tspan fill="#5B5BD6">test:</tspan> lint test-unit test-e2e</text>
    <text x="68" y="250">    @echo "✓ all checks passed"</text>
    <text x="68" y="290"><tspan fill="#5B5BD6">test-unit:</tspan></text>
    <text x="68" y="330">    npm run test:unit -- --coverage</text>
    <text x="68" y="360"><tspan fill="#5B5BD6">test-e2e:</tspan>   npx playwright test</text>
  </g>

  <!-- Middle: terminal output (1/2) -->
  <rect x="40" y="400" width="1520" height="440" rx="8" fill="#0D0D10" stroke="#2D2D35"/>
  <text x="68" y="440" font-size="22" font-weight="600" fill="#E4E4E7">Terminal</text>

  <g font-family="SF Mono, Menlo, monospace" font-size="22">
    <text x="68" y="490"><tspan fill="#7FB069">$</tspan> <tspan fill="#E4E4E7">make test</tspan></text>

    <text x="68" y="540" fill="#E4E4E7">▶ lint</text>
    <text x="88" y="575" fill="#4ADE80">✓ OK · 0 warnings (eslint)</text>

    <text x="68" y="620" fill="#E4E4E7">▶ unit (124 tests)</text>
    <text x="88" y="655" fill="#4ADE80">✓ OK · 124 passed, coverage 82%</text>

    <text x="68" y="700" fill="#E4E4E7">▶ e2e (18 tests)</text>
    <text x="88" y="735" fill="#4ADE80">✓ OK · 18 passed</text>

    <text x="68" y="790" fill="#4ADE80">✓ all checks passed</text>
    <text x="68" y="820" fill="rgba(228,228,231,0.7)">done in 4m 32s</text>
  </g>

  <!-- Bottom: coverage mini bars (1/6) -->
  <rect x="40" y="860" width="1520" height="100" rx="8" fill="#FFFFFF" stroke="#E5E7EB"/>
  <text x="68" y="895" font-size="20" font-weight="600" fill="#0A0A0A">모듈별 커버리지</text>

  <g font-size="18">
    <!-- auth -->
    <text x="68" y="930" fill="#0A0A0A">auth</text>
    <rect x="160" y="918" width="280" height="14" rx="4" fill="#E5E7EB"/>
    <rect x="160" y="918" width="252" height="14" rx="4" fill="#15803D"/>
    <text x="450" y="930" fill="#0A0A0A">90%</text>

    <!-- articles -->
    <text x="520" y="930" fill="#0A0A0A">articles</text>
    <rect x="630" y="918" width="280" height="14" rx="4" fill="#E5E7EB"/>
    <rect x="630" y="918" width="226" height="14" rx="4" fill="#15803D"/>
    <text x="920" y="930" fill="#0A0A0A">81%</text>

    <!-- comments -->
    <text x="1000" y="930" fill="#0A0A0A">comments</text>
    <rect x="1140" y="918" width="280" height="14" rx="4" fill="#E5E7EB"/>
    <rect x="1140" y="918" width="190" height="14" rx="4" fill="#D97706"/>
    <text x="1430" y="930" fill="#0A0A0A">68%</text>
  </g>

  <text x="1560" y="990" font-size="14" fill="#A3A3A3" text-anchor="end">ROBOCO ✕ Vibe Coding Workshop</text>
</svg>
```

- [ ] **Step 2: Verify the mockup renders**

```bash
open vibecoding-for-developer/portfolio/assets/mockups/03-test.svg
```

Expected: Makefile section (top), dark terminal (middle), coverage bars (bottom). All text and bars legible.

- [ ] **Step 3: Verify the mockup appears in the page**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Scroll to §2 card 03. Expected: the mockup is now visible.

- [ ] **Step 4: Commit**

```bash
git add vibecoding-for-developer/portfolio/assets/mockups/03-test.svg
git commit -m "Add mockup 03: automated test + code quality (make test terminal)"
```

---

## Task 17: Build Mockup 04 — 품질 게이트 (Git Hooks)

**Files:**
- Create: `vibecoding-for-developer/portfolio/assets/mockups/04-gate.svg`

- [ ] **Step 1: Write the SVG**

Write to `vibecoding-for-developer/portfolio/assets/mockups/04-gate.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" font-family="-apple-system, system-ui, sans-serif">
  <rect width="1600" height="1000" fill="#FAFAFA"/>

  <!-- Header -->
  <rect x="40" y="40" width="1520" height="60" rx="8" fill="#FFFFFF" stroke="#E5E7EB"/>
  <circle cx="68" cy="70" r="8" fill="#5B5BD6"/>
  <text x="86" y="75" font-size="20" font-weight="600" fill="#0A0A0A">Git Hooks · realworld-app</text>
  <text x="1500" y="75" font-size="18" fill="#71717A" text-anchor="end">pre-commit / pre-push</text>

  <!-- Left: hook file (1/3) -->
  <rect x="40" y="120" width="480" height="840" rx="8" fill="#FFFFFF" stroke="#E5E7EB"/>
  <text x="68" y="160" font-size="22" font-weight="600" fill="#0A0A0A">.git/hooks/pre-commit</text>
  <text x="68" y="190" font-size="16" fill="#15803D">실행 권한 ✓</text>

  <g font-family="SF Mono, Menlo, monospace" font-size="20" fill="#0A0A0A">
    <text x="68" y="240" fill="#525252">#!/bin/bash</text>
    <text x="68" y="280" fill="#525252"># Auto-generated · workshop</text>
    <text x="68" y="320" fill="#525252">set -e</text>
    <text x="68" y="370">echo "▶ lint"</text>
    <text x="68" y="400">make lint || exit 1</text>
    <text x="68" y="450">echo "▶ unit"</text>
    <text x="68" y="480">make test-unit || exit 1</text>
    <text x="68" y="530">echo "✓ pre-commit OK"</text>
  </g>

  <!-- Tab toggle -->
  <rect x="68" y="850" width="200" height="40" rx="6" fill="#EEF0FF"/>
  <text x="168" y="877" font-size="18" font-weight="600" fill="#5B5BD6" text-anchor="middle">pre-commit ✓</text>
  <rect x="278" y="850" width="200" height="40" rx="6" fill="#F5F5F5"/>
  <text x="378" y="877" font-size="18" fill="#525252" text-anchor="middle">pre-push</text>

  <text x="68" y="930" font-size="18" fill="#71717A">팀 전체 공유: ✓</text>

  <!-- Right top: FAIL scenario (1/2 of right) -->
  <rect x="540" y="120" width="1020" height="400" rx="8" fill="#0D0D10" stroke="#2D2D35"/>
  <text x="568" y="160" font-size="22" font-weight="600" fill="#E4E4E7">실패 시나리오</text>
  <rect x="800" y="135" width="60" height="28" rx="4" fill="none" stroke="#F87171"/>
  <text x="830" y="155" font-size="16" font-weight="600" fill="#F87171" text-anchor="middle">FAIL</text>

  <g font-family="SF Mono, Menlo, monospace" font-size="22">
    <text x="568" y="220"><tspan fill="#7FB069">$</tspan> <tspan fill="#E4E4E7">git commit -m "fix: typo"</tspan></text>

    <text x="568" y="270" fill="#E4E4E7">▶ lint</text>
    <text x="588" y="305" fill="#F87171">✗ FAIL · 3 errors found in 2 files</text>
    <text x="588" y="340" fill="rgba(228,228,231,0.7)">  src/api/article.ts:42  unused import</text>
    <text x="588" y="370" fill="rgba(228,228,231,0.7)">  src/api/article.ts:88  no-console</text>
    <text x="588" y="400" fill="rgba(228,228,231,0.7)">  src/utils/date.ts:12   prefer-const</text>

    <text x="568" y="460" fill="#F87171">commit aborted — fix lint errors first</text>
  </g>

  <!-- Right bottom: OK scenario (1/2 of right) -->
  <rect x="540" y="540" width="1020" height="420" rx="8" fill="#0D0D10" stroke="#2D2D35"/>
  <text x="568" y="580" font-size="22" font-weight="600" fill="#E4E4E7">통과 시나리오</text>
  <rect x="800" y="555" width="50" height="28" rx="4" fill="none" stroke="#4ADE80"/>
  <text x="825" y="575" font-size="16" font-weight="600" fill="#4ADE80" text-anchor="middle">OK</text>

  <g font-family="SF Mono, Menlo, monospace" font-size="22">
    <text x="568" y="640"><tspan fill="#7FB069">$</tspan> <tspan fill="#E4E4E7">git commit -m "feat: tag filter"</tspan></text>

    <text x="568" y="700" fill="#E4E4E7">▶ lint</text>
    <text x="588" y="735" fill="#4ADE80">✓ OK · 0 warnings</text>

    <text x="568" y="790" fill="#E4E4E7">▶ unit (124 tests)</text>
    <text x="588" y="825" fill="#4ADE80">✓ OK · 124 passed</text>

    <text x="568" y="890" fill="#4ADE80">✓ pre-commit OK</text>
    <text x="568" y="925" fill="rgba(228,228,231,0.7)">[main 4d24539] feat: tag filter</text>
  </g>

  <text x="1560" y="990" font-size="14" fill="#A3A3A3" text-anchor="end">ROBOCO ✕ Vibe Coding Workshop</text>
</svg>
```

- [ ] **Step 2: Verify the mockup renders**

```bash
open vibecoding-for-developer/portfolio/assets/mockups/04-gate.svg
```

Expected: 3 panels — hook file (left), FAIL terminal with red text + "FAIL" label badge (top right), OK terminal with green text + "OK" label badge (bottom right). Color-independent encoding via text labels visible.

- [ ] **Step 3: Verify the mockup appears in the page**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Scroll to §2 card 04. Expected: the mockup is now visible.

- [ ] **Step 4: Commit**

```bash
git add vibecoding-for-developer/portfolio/assets/mockups/04-gate.svg
git commit -m "Add mockup 04: quality gate (git hook fail/success scenarios)"
```

---

## Task 18: Build Mockup 05 — 팀 확산 플레이북

**Files:**
- Create: `vibecoding-for-developer/portfolio/assets/mockups/05-playbook.svg`

- [ ] **Step 1: Write the SVG**

Write to `vibecoding-for-developer/portfolio/assets/mockups/05-playbook.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" font-family="-apple-system, system-ui, sans-serif">
  <rect width="1600" height="1000" fill="#FAFAFA"/>

  <!-- Header -->
  <rect x="40" y="40" width="1520" height="60" rx="8" fill="#FFFFFF" stroke="#E5E7EB"/>
  <circle cx="68" cy="70" r="8" fill="#5B5BD6"/>
  <text x="86" y="75" font-size="20" font-weight="600" fill="#0A0A0A">팀 확산 플레이북</text>
  <text x="1500" y="75" font-size="18" fill="#71717A" text-anchor="end">auto-generated · 워크숍 종료 직후</text>

  <!-- Left: tutorial preview (1/2) -->
  <rect x="40" y="120" width="740" height="840" rx="8" fill="#FFFFFF" stroke="#E5E7EB"/>
  <text x="68" y="160" font-size="22" font-weight="600" fill="#0A0A0A">📄 4시간 워크숍 재현 가이드</text>
  <text x="68" y="190" font-size="16" fill="#71717A">Claude Code 세션 로그 → 튜토리얼 자동 변환</text>

  <text x="68" y="240" font-size="20" font-weight="600" fill="#525252">목차</text>
  <g font-size="22" fill="#0A0A0A">
    <text x="68" y="280">1. 오프닝 &amp; 환경 확인 (20분)</text>
    <text x="68" y="320">2. 문서화 (80분)</text>
  </g>
  <rect x="60" y="335" width="720" height="50" rx="6" fill="#EEF0FF"/>
  <text x="68" y="367" font-size="22" font-weight="600" fill="#5B5BD6">3. 자동화 테스트 (70분) ⬅ 현재</text>
  <g font-size="22" fill="#0A0A0A">
    <text x="68" y="420">4. CI/CD 구축 (50분)</text>
    <text x="68" y="460">5. 마무리: 튜토리얼 &amp; migration-plan (20분)</text>
  </g>

  <line x1="68" y1="500" x2="752" y2="500" stroke="#E5E7EB"/>

  <text x="68" y="540" font-size="20" font-weight="600" fill="#525252">3. 자동화 테스트 — 본문 발췌</text>
  <g font-family="SF Mono, Menlo, monospace" font-size="20" fill="#0A0A0A">
    <text x="68" y="580">$ openspec propose articles/tags</text>
    <text x="68" y="620">$ /skill openspec-to-tests articles</text>
  </g>

  <text x="68" y="680" font-size="20" fill="#0A0A0A">→ AI가 사양 기반 테스트 12개 생성</text>
  <text x="68" y="710" font-size="20" fill="#0A0A0A">→ 사람 검수 후 `make test-unit`</text>

  <rect x="68" y="740" width="680" height="160" rx="6" fill="#F5F5F5"/>
  <text x="88" y="775" font-size="18" fill="#525252" font-style="italic">[스크린샷]</text>
  <text x="88" y="810" font-size="18" fill="#71717A">make test 실행 결과</text>
  <text x="88" y="850" font-size="18" fill="#71717A">✓ 124 passed, coverage 82%</text>

  <!-- Right: migration-plan.md (1/2) -->
  <rect x="800" y="120" width="760" height="840" rx="8" fill="#FFFFFF" stroke="#E5E7EB"/>
  <text x="828" y="160" font-size="22" font-weight="600" fill="#0A0A0A">📄 migration-plan.md</text>
  <text x="828" y="190" font-size="16" fill="#71717A">우리 팀 전환 계획서 · generate-plan 스킬 출력</text>

  <text x="828" y="240" font-size="20" font-weight="600" fill="#525252">4주 로드맵</text>

  <!-- W1 -->
  <rect x="828" y="260" width="700" height="140" rx="6" fill="#EEF0FF"/>
  <text x="848" y="295" font-size="22" font-weight="600" fill="#5B5BD6">W1 · 컨텍스트 + 스펙 도입</text>
  <text x="848" y="330" font-size="18" fill="#0A0A0A">담당: TL · 산출물: CLAUDE.md, OpenSpec init</text>
  <text x="848" y="360" font-size="18" fill="#0A0A0A">위험: 기존 docs/와 중복 → 정리 필요</text>
  <text x="848" y="388" font-size="18" fill="#71717A">예상 시간: 4시간 / 팀원 한 명</text>

  <!-- W2 -->
  <rect x="828" y="420" width="700" height="140" rx="6" fill="#FFFFFF" stroke="#E5E7EB"/>
  <text x="848" y="455" font-size="22" font-weight="600" fill="#0A0A0A">W2 · 테스트 자동화 (1개 모듈 시범)</text>
  <text x="848" y="490" font-size="18" fill="#0A0A0A">담당: 백엔드 1명 · 산출물: UT + E2E + Makefile</text>
  <text x="848" y="520" font-size="18" fill="#0A0A0A">위험: 기존 테스트와 패턴 충돌</text>
  <text x="848" y="548" font-size="18" fill="#71717A">예상 시간: 8시간</text>

  <!-- W3 -->
  <rect x="828" y="580" width="700" height="140" rx="6" fill="#FFFFFF" stroke="#E5E7EB"/>
  <text x="848" y="615" font-size="22" font-weight="600" fill="#0A0A0A">W3 · Git Hooks 팀 전체 배포</text>
  <text x="848" y="650" font-size="18" fill="#0A0A0A">담당: TL · 산출물: pre-commit / pre-push 공유</text>
  <text x="848" y="680" font-size="18" fill="#0A0A0A">위험: 로컬 환경 차이 → 검증 절차 필요</text>
  <text x="848" y="708" font-size="18" fill="#71717A">예상 시간: 4시간 + 팀원 적용 시간</text>

  <!-- W4 -->
  <rect x="828" y="740" width="700" height="140" rx="6" fill="#FFFFFF" stroke="#E5E7EB"/>
  <text x="848" y="775" font-size="22" font-weight="600" fill="#0A0A0A">W4 · 효과 측정 + 회고</text>
  <text x="848" y="810" font-size="18" fill="#0A0A0A">담당: 전원 · 산출물: 측정 리포트, 회고록</text>
  <text x="848" y="840" font-size="18" fill="#0A0A0A">베이스라인: PR 리드타임, 결함 유입률</text>
  <text x="848" y="868" font-size="18" fill="#71717A">예상 시간: 2시간 회의 + 집계</text>

  <text x="828" y="920" font-size="18" fill="#71717A">총 4주 — 팀별 환경에 따라 ±1주 조정</text>

  <text x="1560" y="990" font-size="14" fill="#A3A3A3" text-anchor="end">ROBOCO ✕ Vibe Coding Workshop</text>
</svg>
```

- [ ] **Step 2: Verify the mockup renders**

```bash
open vibecoding-for-developer/portfolio/assets/mockups/05-playbook.svg
```

Expected: 2 panels — tutorial (left) with toc and section preview, migration-plan (right) with 4 weekly cards.

- [ ] **Step 3: Verify the mockup appears in the page**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Scroll to §2 card 05. Expected: the mockup is now visible. All 5 cards in §2 now have their mockups.

- [ ] **Step 4: Commit**

```bash
git add vibecoding-for-developer/portfolio/assets/mockups/05-playbook.svg
git commit -m "Add mockup 05: team spread playbook (tutorial + migration-plan)"
```

---

## Task 19: Add og-image.svg, README.md, and update _config.yml

**Files:**
- Create: `vibecoding-for-developer/portfolio/assets/og-image.svg`
- Create: `vibecoding-for-developer/portfolio/README.md`
- Modify: `_config.yml` (project root)

- [ ] **Step 1: Write og-image.svg**

Write to `vibecoding-for-developer/portfolio/assets/og-image.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" font-family="-apple-system, system-ui, sans-serif">
  <!-- Dark background -->
  <rect width="1200" height="630" fill="#0A0A0A"/>

  <!-- Indigo accent bar -->
  <rect x="0" y="0" width="8" height="630" fill="#5B5BD6"/>

  <!-- Eyebrow -->
  <text x="80" y="180" font-size="22" font-weight="500" fill="#818CF8" letter-spacing="0.05em">개발자 바이브 코딩 워크숍</text>

  <!-- Headline -->
  <text x="80" y="270" font-size="56" font-weight="700" fill="#FAFAFA">AI가 소프트웨어 엔지니어링 수준을</text>
  <text x="80" y="340" font-size="56" font-weight="700" fill="#FAFAFA">적은 비용·짧은 기간에 끌어올립니다</text>

  <!-- Sub -->
  <text x="80" y="420" font-size="24" fill="#A3A3A3">스택 무관 · 4시간 · 시니어 개발자 10~20명 · Claude 기반</text>

  <!-- Brand -->
  <text x="80" y="540" font-size="32" font-weight="700" fill="#5B5BD6" letter-spacing="0.05em">ROBOCO</text>
  <text x="240" y="540" font-size="18" fill="#525252">✕ Vibe Coding Workshop</text>
</svg>
```

> **Note:** The deployment uses `og-image.png` per the `<meta property="og:image">` URL. Convert this SVG to PNG either by opening in a browser and exporting, or by running a CLI like `rsvg-convert`. The PNG must live at `vibecoding-for-developer/portfolio/assets/og-image.png`. The SVG is kept as the editable source.

- [ ] **Step 2: Generate og-image.png (manual or via tool)**

Option A (manual, recommended): open the SVG in a browser, take a screenshot exactly at 1200×630, save as `assets/og-image.png`.

Option B (if `rsvg-convert` is available):

```bash
rsvg-convert -w 1200 -h 630 \
  vibecoding-for-developer/portfolio/assets/og-image.svg \
  -o vibecoding-for-developer/portfolio/assets/og-image.png
```

- [ ] **Step 3: Write README.md**

Write to `vibecoding-for-developer/portfolio/README.md`:

```markdown
# 개발자 바이브 코딩 워크숍 — 포트폴리오 랜딩페이지

ROBOCO 개발자 바이브 코딩 워크숍을 외부 고객(엔지니어링 매니저·CTO)에게 소개하는 단일 페이지 랜딩.

- 라이브: https://roboco.io/vibecoding-workshop/vibecoding-for-developer/portfolio/
- 디자인 스펙: [`docs/superpowers/specs/2026-05-26-developer-portfolio-design.md`](../../docs/superpowers/specs/2026-05-26-developer-portfolio-design.md)

## 구조

- `index.html` — 6섹션 본문 (Hero / Showcase / Methodology / DORA Matrix / Operations / CTA)
- `styles.css` — 디자인 토큰 + 코드/터미널 영역
- `scripts.js` — IntersectionObserver 페이드 인
- `assets/mockups/01~05.svg` — 5개 모범사례 영역 미니 목업
- `assets/og-image.svg` — Open Graph 카드 소스 (PNG로 변환해 `og-image.png`로 배포)

## 로컬 미리보기

```bash
open vibecoding-for-developer/portfolio/index.html
```

## 수정 시 체크리스트

- 5개 카드 영역명이 §2와 §4 매트릭스에서 일관되는지 확인
- mailto subject·body 프리필 URL 인코딩 유지 (한국어는 `encodeURIComponent`)
- canonical, og:url, twitter:image 4곳 모두 `roboco.io` 도메인 유지
- §4 DORA 셀에 ●/◐/◯ 기호 + Direct/Indirect/Side 텍스트 라벨 병기 (색상 비의존)

## 배포

`main` 브랜치 push 시 `.github/workflows/deploy-pages.yml`이 자동 빌드·배포.

```bash
gh run watch <run-id>
```
```

- [ ] **Step 4: Update `_config.yml` to include the developer portfolio path**

Inspect the existing `_config.yml`:

```bash
grep -n "vibecoding-for-developer\|exclude\|include" _config.yml
```

If `vibecoding-for-developer/portfolio` is excluded, remove it from the `exclude` list. If `_config.yml` uses an explicit `include` list, add `vibecoding-for-developer/portfolio` to it.

Typical edit example — if the file contains:

```yaml
exclude:
  - vibecoding-for-developer/
```

Replace with:

```yaml
exclude:
  - vibecoding-for-developer/PRD.md
  - vibecoding-for-developer/6-pager.md
  - vibecoding-for-developer/workshop-flow.md
  - vibecoding-for-developer/interview-summary.md
  - vibecoding-for-developer/developer_survey_analysis.md
```

(Excluding the markdown files individually keeps the `portfolio/` subdirectory published.)

If you're unsure of the exact change, mirror what was done for `vibecoding-for-nondeveloper/portfolio` — search git log:

```bash
git log --oneline _config.yml | head -5
git show <commit-hash> -- _config.yml
```

- [ ] **Step 5: Verify locally with Jekyll**

If Bundler is installed:

```bash
bundle exec jekyll build
ls _site/vibecoding-for-developer/portfolio/
```

Expected: `index.html`, `styles.css`, `scripts.js`, `assets/` are all present under `_site/vibecoding-for-developer/portfolio/`.

If Bundler is not set up, skip Jekyll verification — the GitHub Actions deploy will run it.

- [ ] **Step 6: Commit**

```bash
git add vibecoding-for-developer/portfolio/assets/og-image.svg \
        vibecoding-for-developer/portfolio/assets/og-image.png \
        vibecoding-for-developer/portfolio/README.md \
        _config.yml
git commit -m "Add og-image, README, and _config.yml publish entry for developer portfolio"
```

(If `og-image.png` wasn't generated, exclude it from the git add — it can be added in a follow-up commit.)

---

## Task 20: Local verification — full page, accessibility, mobile

**Files:**
- No file changes; verification only.

- [ ] **Step 1: Open the full page**

```bash
open vibecoding-for-developer/portfolio/index.html
```

Expected: page loads cleanly. No 404s in the browser console (Network tab → all 200). All 5 mockups visible.

- [ ] **Step 2: Scroll through all 6 sections**

Confirm each section animates in (fade + 12px translateY) as it enters the viewport:

1. §1 Hero — visible on load
2. §2 Showcase — 5 cards
3. §3 Methodology — 2 patterns
4. §4 DORA Matrix — 5×4 grid
5. §5 Operations — 3 columns
6. §6 CTA + Footer

- [ ] **Step 3: Test both mailto CTAs**

Click "도입 문의하기 →" in §1, then "contact@roboco.io 로 문의하기 →" in §6. Expected: both open the mail client with the same prefilled subject and body template.

- [ ] **Step 4: Verify color-independent encoding**

In §4, every cell should show both a symbol (●/◐/◯) and a text label (Direct/Indirect/Side). In Mockup 04, the FAIL terminal shows a "FAIL" badge and the OK terminal shows an "OK" badge.

Optional accessibility check — install or use the browser DevTools color filter to simulate deuteranopia/protanopia. The matrix and mockups should still be parseable purely from text content.

- [ ] **Step 5: Test mobile responsive (DevTools)**

Open browser DevTools → device emulation → iPhone SE (375×667). Reload. Verify:
- §1 Hero CTA stack vertically
- §2 cards: meta panel and mockup stack vertically
- §3 Methodology 2-card grid collapses to single column
- §4 DORA matrix: horizontal scroll OR collapses gracefully (whatever the existing `.matrix-table-wrap` styles do)
- §5 Operations 3-column collapses to single column
- §6 CTA button doesn't overflow

If any section breaks badly, note it for follow-up. The sibling page passes these checks with the same styles, so it should mostly work.

- [ ] **Step 6: Verify WCAG contrast on code blocks**

Use DevTools → element inspector on a code block (e.g., the §2 card 03 mockup terminal). Expected:
- Light mode: code-text on code-bg ≥ 14:1 (AAA)
- Code block border visible against background

Switch to dark mode (System Preferences or DevTools → Rendering → emulate dark). Verify the code block remains visually distinct (the `box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06)` from Task 2 should provide the outline).

- [ ] **Step 7: Verify the meta tags in DevTools**

DevTools → Elements → `<head>`. Confirm all 4 URLs (canonical, og:url, og:image, twitter:image) use `roboco.io` domain. No `roboco-io.github.io` references.

- [ ] **Step 8: Optional — run the HTML through W3C validator**

If you have internet access and want belt-and-suspenders verification:

```bash
curl -s -F "uploaded_file=@vibecoding-for-developer/portfolio/index.html" \
     -F "output=json" \
     https://validator.w3.org/nu/ | python3 -m json.tool | head -50
```

Expected: zero errors. Warnings are acceptable.

- [ ] **Step 9: Commit any final fixes**

If you spotted and fixed any issues during Steps 1–8:

```bash
git add vibecoding-for-developer/portfolio/
git commit -m "Polish developer portfolio after local verification"
```

If no fixes were needed, no commit required.

---

## Task 21: Deploy and verify live

**Files:**
- No file changes; deployment and post-deploy verification.

- [ ] **Step 1: Push to main**

```bash
git push origin main
```

Expected: push succeeds. GitHub Actions triggers the `deploy-pages.yml` workflow.

- [ ] **Step 2: Watch the deploy**

```bash
gh run list --workflow=deploy-pages.yml --limit 1
```

Note the run ID, then:

```bash
gh run watch <run-id> --exit-status
```

Expected: all steps pass (Checkout, Setup Node, Build MARP, Setup Ruby, Build Jekyll, Copy MARP output, Upload artifact, Deploy to GitHub Pages).

- [ ] **Step 3: Verify the live URL responds**

```bash
curl -sI https://roboco.io/vibecoding-workshop/vibecoding-for-developer/portfolio/ | head -5
```

Expected: `HTTP/2 200`.

- [ ] **Step 4: Verify meta tags on live page**

```bash
curl -sL https://roboco.io/vibecoding-workshop/vibecoding-for-developer/portfolio/ | grep -iE 'canonical|og:url|og:image|twitter:image'
```

Expected: 4 lines, all using `https://roboco.io/vibecoding-workshop/vibecoding-for-developer/portfolio/...` (no `roboco-io.github.io`).

- [ ] **Step 5: Open the live page in a browser**

```bash
open "https://roboco.io/vibecoding-workshop/vibecoding-for-developer/portfolio/"
```

Walk through the 6 sections. Expected: identical to local verification. Both mailto CTAs work in the real browser.

- [ ] **Step 6: Verify OG card preview (optional)**

Test the Open Graph card in a tool that doesn't follow redirects (some SNS scrapers don't):

- Paste the URL into Slack or LinkedIn share dialog. Expected: title, description, and the og-image render correctly.
- If og-image.png is missing or wrong, regenerate it (Task 19 Step 2) and push again.

- [ ] **Step 7: Sanity-check by sharing with one teammate**

Ask one engineer who hasn't seen the design spec to read the live page and report:
- "What does this workshop do?" — should match the Level Boost + Learning Acceleration framing
- "Who is this for?" — should match engineering manager / CTO
- "What would you do next?" — should be "send the mailto"

If the answers diverge significantly from the design intent, file a follow-up task to adjust the copy. Don't block on this — the page is live and the deploy is complete.

- [ ] **Step 8: Final commit if any tweaks were made**

If small post-deploy tweaks were needed:

```bash
git add vibecoding-for-developer/portfolio/
git commit -m "Tweak developer portfolio copy after live verification"
git push origin main
```

Otherwise the plan is complete.

---

## Self-Review Notes

This plan covers every section of the spec:

- Spec §1 (개요, 청중, 프레이밍) → Tasks 3–4 (meta + Hero)
- Spec §2 (파일 구조) → Tasks 1–2 (scaffold + tokens)
- Spec §3 §1 Hero → Task 4
- Spec §3 §2 Showcase → Tasks 5–9 (5 cards)
- Spec §3 §3 Methodology → Task 10
- Spec §3 §4 DORA Matrix → Task 11
- Spec §3 §5 Operations + §6 CTA → Task 12
- Spec §4 (5 mockups) → Tasks 14–18
- Spec §5 (시각 디자인 시스템, 코드 영역 토큰, 색상 비의존 인코딩) → Tasks 2, 11, 17, 20
- Spec §6 (빌드·배포) → Tasks 19, 21
- Spec §7 (구현 체크리스트) → Tasks 20, 21
- Spec §9 (비범위) → respected by what is not built

All identifiers are consistent across tasks (e.g., card 03 is `자동화 테스트 + 코드 품질` in Tasks 7, 11, 16; mockup files are `01-context.svg`, `02-spec.svg`, `03-test.svg`, `04-gate.svg`, `05-playbook.svg` everywhere). The mailto URL prefill matches between Task 4 (Hero) and Task 12 (final CTA). The `contact@roboco.io` address is the same on both pages.
