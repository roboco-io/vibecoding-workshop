# Design Spec: 비개발자 바이브 코딩 워크숍 포트폴리오 랜딩페이지

> 작성일: 2026-05-19 | 작성자: ROBOCO | 상태: 디자인 확정, 구현 대기

## 1. 개요

### 1-1. 목적

비개발자 바이브 코딩 워크숍을 외부 고객(기업 HR/L&D·교육담당자)에게 소개하고 **도입 문의를 유도**하는 HTML 포트폴리오 랜딩페이지를 제작한다. 5개 워크숍 결과물의 고충실 SaaS UI 목업이 페이지의 시각적 중심이며, 자가 읽기 맥락(메일·링크 공유)에 최적화한다.

### 1-2. 청중과 목표 행동

| 항목 | 정의 |
|------|------|
| 1차 청중 | 기업 HR/L&D·교육담당자 |
| 2차 청중 | HR이 임원에게 전달하는 의사결정자 |
| 목표 행동 | 페이지 종료 후 **mailto: CTA 클릭** → 도입 문의 메일 발송 |
| 전환 신호 | 메일 도착 (별도 분석 도구 없이 측정) |

### 1-3. 인터뷰 결정 사항

브레인스토밍 인터뷰(2026-05-19)에서 확정한 9개 결정:

| # | 결정 항목 | 값 |
|---|----------|---|
| 1 | 청중 | 기업 HR/L&D·교육담당자 |
| 2 | 목표 행동 | 워크숍 도입 문의 |
| 3 | 전달 맥락 | 메일·링크 자가 읽기 |
| 4 | 목업 성격 | 가상 SaaS 제품 페이지 스타일 (고충실 UI) |
| 5 | HTML 형식 | 세로 스크롤 랜딩페이지 |
| 6 | 분량 | 압축형 5~7섹션, 3~5분 읽기 |
| 7 | 시각 톤 | Linear/Vercel 미니멈·테크 |
| 8 | 브랜드 | ROBOCO 워크숍 제품 소개 (특정 고객사 비식별) |
| 9 | CTA | 이메일 링크 (mailto: 프리필) |

### 1-4. 정직성 원칙

5개 프로젝트는 모두 **Claude Project 기반 자연어 워크플로우**이며 자체 UI를 가진 SaaS가 아니다. 따라서 모든 목업 하단에 **"워크숍에서 만든 Claude Project 패턴을 시각화한 콘셉트"** 캡션을 명시하여 과장 없이 시각적 임팩트만 가져간다.

---

## 2. 파일 구조

### 2-1. 디렉토리

```
vibecoding-for-nondeveloper/portfolio/
├── index.html                 ← 메인 랜딩페이지 (단일 파일)
├── styles.css                 ← 공통 스타일 시스템
├── scripts.js                 ← 인터랙션 (IntersectionObserver)
├── assets/
│   ├── og-image.png           ← Open Graph 카드 (1200×630)
│   ├── favicon.svg            ← ROBOCO 마크
│   └── mockups/               ← 5개 SVG 목업
│       ├── 01-cs-agent.svg
│       ├── 02-research.svg
│       ├── 03-document.svg
│       ├── 04-budget.svg
│       └── 05-qa.svg
└── README.md                  ← 수정·배포 가이드
```

### 2-2. 아키텍처 원칙

- **빌드 단계 없음** — HTML/CSS/JS/SVG만 사용. 브라우저에서 `index.html` 더블 클릭으로 동작
- **단일 페이지** — 모든 콘텐츠 인라인. 외부 의존 0
- **SVG 인라인 가능** — 무한 확대, 다크모드 대응, 텍스트 검색 가능
- **시스템 폰트 스택** — Pretendard 로컬 fallback
- **GitHub Pages 자동 발행** — `_config.yml` 발행 대상에 추가

### 2-3. 파일 산출 책임

| # | 파일 | 책임 | 분량 추정 |
|---|------|------|----------|
| 1 | `styles.css` | 디자인 토큰 시스템 구현 | ~400줄 |
| 2 | `assets/mockups/01~05.svg` | 5개 SVG 목업 | 각 ~150줄 |
| 3 | `index.html` | 6섹션 + 메타 + 인라인 SVG 참조 | ~350줄 |
| 4 | `scripts.js` | IntersectionObserver 페이드 인 | ~30줄 |
| 5 | `assets/og-image.png` | Open Graph 카드 — Hero 문구 + ROBOCO 워드마크, 다크 배경 + 인디고 액센트 | 1200×630 |
| 6 | `assets/favicon.svg` | ROBOCO 마크 | ~10줄 |
| 7 | `README.md` | 수정·배포 가이드 | ~50줄 |

작성 순서: 토큰 CSS → SVG 목업 5종 → HTML 골격 → scripts.js → 메타 자산.

---

## 3. 콘텐츠 설계 — 6개 섹션

압축형 6섹션 구조. 각 섹션은 하나의 핵심 메시지만 갖는다.

### § 1. Hero

**핵심 메시지**: "비개발자도 4시간 워크숍 한 번이면, 자기 업무 자동화 도구를 직접 만든다"

**구성요소**
- H1 (display 56px): "영업·CS·기획·경영지원이 4시간 만에 AI 자동화 도구 5종을 만든다"
- 보조 카피: "코드 없이, 자연어만으로. Claude 기반 워크숍 — 최대 20명, 4시간."
- 1차 CTA(메일): "도입 문의하기 →"
- 2차 CTA(스크롤): "결과물 보기 ↓"
- ROBOCO 워드마크

### § 2. 결과물 쇼케이스 (페이지의 시각적 중심)

**핵심 메시지**: "이런 도구 5종을 워크숍 안에서 직접 만듭니다"

**레이아웃**: 5개 카드를 종단 배치. 각 카드 약 80vh 높이. 스크롤하며 1개씩 등장.

**카드 구성**
- 번호 (`01 / 05`)
- 제품명
- 메타 정보 3행: 대상 직군 / 시간 단축 수치 / 핵심 기능 한 줄
- 고충실 SaaS UI 목업 (인라인 SVG, 16:10 비율)
- 정직성 캡션: "💡 워크숍에서 만든 Claude Project 패턴을 시각화한 콘셉트입니다"

**5개 카드 카피**

| # | 제품명 | 직군 | 시간 단축 |
|---|--------|------|-----------|
| 01 | CS 문의 자동 분류 에이전트 | CS · 영업 · 운영 | 15분 → 5분 |
| 02 | 경쟁사·시장 리서치 자동 취합 | 기획 · PM · 마케팅 | 4시간 → 1시간 |
| 03 | 문서·보고서 초안 생성기 | 전 직군 공통 | 2시간 → 30분 |
| 04 | 동적 예산·실적 시트 자동화 | 경영지원 · 재무 | 2시간 → 30분 |
| 05 | QA 테스트 케이스·이슈 정리 | QA · 운영 | 3시간 → 1시간 |

### § 3. 어떻게 가능한가 — 워크숍 방법론

**핵심 메시지**: "AI를 믿을 수 있게 만드는 두 가지 패턴"

**레이아웃**: 2단 분할

| 좌 | 우 |
|---|---|
| **인터뷰 퍼스트 패턴** | **검수 루프 패턴** |
| "써줘"가 아니라 "나에게 질문해줘" | AI 생성 → 같은 AI에게 자기 비판 의뢰 |
| ↓ 컨텍스트 누락 방지, 환각 가능성 감소 | ↓ 논리 결함·누락·단정 자동 검출, 품질 변동 최소화 |

**보조 카피**: "83%의 비개발자가 'AI 결과 품질이 들쑥날쑥하다'고 답했습니다 — 워크숍은 이 문제를 두 패턴으로 직접 해결합니다."

### § 4. 누가 만드는가 — 직군 적용 매트릭스

**핵심 메시지**: "코딩 경험이 0인 직원도 즉시 적용 가능합니다"

**레이아웃**: 5종 결과물 × 8개 직군 그리드

| | CS | 영업 | 기획 | PM | 디자인 | 경영지원 | QA | 운영 |
|---|---|---|---|---|---|---|---|---|
| 01 CS봇 | ● | ● | ◐ | ◐ | ◯ | ◯ | ● | ● |
| 02 리서치 | ◯ | ◐ | ● | ● | ◐ | ◐ | ◯ | ◯ |
| 03 문서 | ● | ● | ● | ● | ● | ● | ● | ● |
| 04 예산 | ◯ | ◯ | ● | ◐ | ◯ | ● | ◯ | ◐ |
| 05 QA | ◯ | ◯ | ◐ | ● | ◯ | ◯ | ● | ● |

**범례**: ● 직접 적용 · ◐ 응용 가능 · ◯ 보조 도구로 사용

**보조 카피**: "코딩 경험 없음 42%, 노코드 경험 17% — 모든 학습자가 4시간 안에 본인 업무 패턴으로 변환합니다."

### § 5. 운영 정보 + 근거

**핵심 메시지**: "이미 검증된 설계 — 12명 직군 설문 기반"

**레이아웃**: 3단 그리드

| 워크숍 운영 | 사전 설문 근거 | 사전 준비 |
|------------|--------------|----------|
| 인원: 최대 20명 | 75% 매일 AI 사용 | Claude 계정 |
| 시간: 4시간 | 83% 품질 불안정 | 노트북 |
| 형식: 온라인/오프라인 | 58% 직접 재작업 | 사내 데이터 정책 확인 |
| 사전 준비: 1주 전 | 92% 로컬 설치 가능 | |

### § 6. 최종 CTA

**핵심 메시지**: "팀에 도입을 검토하시나요?"

**구성요소**
- 헤드: "팀에 워크숍 도입을 검토하시나요?"
- 보조: "최대 20명 규모로 운영합니다. 인원·일정·맞춤 사례는 메일로 회신드립니다."
- CTA: "{문의 이메일} 로 문의하기 →" ⚠ **사용자 확인 필요** — 실제 ROBOCO 문의 이메일 주소로 치환
- 푸터: "© 2026 ROBOCO. 비개발자 바이브 코딩 워크숍."

**mailto 프리필**
- subject: `[워크숍 문의 / web-2026-05] 비개발자 바이브 코딩`
- body 템플릿: 회사명 / 인원 / 희망 일정 / 핵심 적용 직군

---

## 4. 5개 목업 상세 사양

### 4-1. 공통 규약

| 항목 | 사양 |
|------|------|
| 캔버스 | 16:10 비율 (1600×1000 SVG viewBox) |
| 색 | 화이트 베이스 + 단일 액센트 인디고 #5B5BD6 + 그레이 스케일 5단계 |
| 타이포 | 시스템 폰트, 본문 14px, 헤더 18~24px |
| 컴포넌트 | 라운드 8px, 보더 1px (#E5E7EB) |
| 상태 뱃지 | 사양=blue, 버그=red, 사용자실수=amber, 확인필요=gray, 완료=green |
| 헤더 | 좌측 `◉ <서비스명>` + 우측 액션 |
| 워터마크 | 우측 하단 그레이 "ROBOCO ✕ Vibe Coding Workshop" |

### 4-2. 목업 01 — CS 문의 자동 분류 에이전트

**레이아웃**: 좌측 문의 리스트 (1/3) + 우측 분류 결과 (2/3)

**좌측 (문의 리스트)**
- 카테고리: 신규 12, 처리 중 5, 완료 187
- 신규 문의 5건: ID, 첫 줄, 경과 시간
- 활성 문의 강조: 좌측 액센트 도트

**우측 (분류 결과 패널)**
- 문의 ID 헤더
- 분류 결과: `[버그 의심]` 뱃지 + 확신도 점 5개
- 근거: 매뉴얼 인용 + 관련 이슈 누적
- 응답 초안 박스 (4행)
- 액션: 복사 / 수정 / 발송 →

### 4-3. 목업 02 — 경쟁사·시장 리서치 자동 취합

**레이아웃**: 상단 자료 카드 + 중앙 비교표 (2/3) + 우측 인사이트 (1/3)

**상단 메타바**
- 투입 자료: 📎 URL 3 · 📄 PDF 2 · 📝 메모 5
- 비교 차원: 타겟 / 가격 / 핵심기능 / 차별점 / UX / 시장지위

**중앙 비교표**
- 5개 경쟁사 × 6개 차원
- 셀 값: 텍스트 / 5점 척도 도트 / ⚠확인 마커

**우측 인사이트 패널**
- 3~4개 자동 도출 인사이트 불릿
- 하단: "⚠ 추가 리서치 필요" 항목

### 4-4. 목업 03 — 문서·보고서 초안 생성기

**레이아웃**: 좌측 인터뷰 답변 (1/4) + 중앙 초안 (2/4) + 우측 자가 비판 (1/4)

**좌측 (인터뷰 답변)**
- 진행도: "8/8"
- 체크된 8개 질문 항목
- 재인터뷰 버튼

**중앙 (초안)**
- 헤더: PRD 종류 탭 (PRD · 제안서 · 주간보고 · 기획서 · 회의록)
- 본문: 1. 배경 / 2. 목표 / 3. 핵심 기능 ⚠ 구조
- 하단: Markdown 다운 / .docx 다운

**우측 (자가 비판)**
- 카운트: "자가 비판 (4건)"
- 4개 분류: 논리 결함 / 누락 섹션 / 사실 단정 / 톤 위반
- 각 항목에 인용 발췌
- 모두 보강하기 버튼

### 4-5. 목업 04 — 동적 예산·실적 시트 자동화

**레이아웃**: 상단 시나리오 슬라이더 (1행) + 중앙 시트 (50%) + 하단 차이 분석 (1행)

**상단 (시나리오 변수)**
- 6개 슬라이더: 인건비, 외주비, 마케팅, 운영비, 매출, 환율
- 슬라이더 값 표기: x.xx 또는 절대값

**중앙 (시트 미리보기)**
- A~E 5컬럼 × 7행
- 컬럼: 항목 / 기본 / 보수 / 낙관 / 실적
- 합계 행 하이라이트 (✓)
- 변동 항목 마커 (▼)

**하단 (차이 분석)**
- 자동 도출 차이: -6.5%, -0.1% 등
- 변동 사유 후보 텍스트

### 4-6. 목업 05 — QA 테스트 케이스·이슈 정리

**레이아웃**: 좌측 기능 명세 (1/4) + 중앙 테스트 케이스 그리드 (2/4) + 우측 위험 영역 (1/4)

**좌측 (기능 명세)**
- 기능명: "결재 위임"
- 4개 하위 기능 불릿
- 변경 영향 받는 3개 영역
- "인터뷰 미답 0"

**중앙 (테스트 케이스)**
- 탭: 정상 6 / 경계 4 / 예외 7 / 회귀 3
- 6행 테이블: ID / 조건 / 기대 결과 / 우선순위(●◐◯)
- 액션: + 케이스 추가 / 회귀 후보 보기

**우측 (위험 영역)**
- 4개 카테고리: 동시성 / 권한 / 데이터 마이그레이션 / 보안
- 각 카테고리에 위험 요소 텍스트
- ✓ 표시: 해당 없음

---

## 5. 시각 디자인 시스템

### 5-1. 컬러 토큰

```css
:root {
  /* 베이스 */
  --bg: #FFFFFF;
  --bg-elevated: #FAFAFA;
  --bg-subtle: #F5F5F5;

  /* 텍스트 */
  --text-primary: #0A0A0A;
  --text-secondary: #525252;
  --text-tertiary: #A3A3A3;

  /* 보더 */
  --border: #E5E7EB;
  --border-strong: #D4D4D8;

  /* 액센트 */
  --accent: #5B5BD6;
  --accent-hover: #4747B8;
  --accent-subtle: #EEF0FF;

  /* 상태 */
  --status-info: #2563EB;
  --status-error: #DC2626;
  --status-warn: #D97706;
  --status-success: #059669;
  --status-neutral: #71717A;
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
```

### 5-2. 타이포그래피

```css
font-family:
  Pretendard,
  -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto,
  "Helvetica Neue", Arial,
  sans-serif;
```

| 토큰 | 크기 / 행간 / 자간 | 용도 |
|------|------------------|------|
| `--text-display` | 56px / 1.05 / -0.02em | Hero H1 |
| `--text-h1` | 40px / 1.1 / -0.015em | 섹션 헤드 |
| `--text-h2` | 28px / 1.2 / -0.01em | 카드·서브헤드 |
| `--text-h3` | 20px / 1.3 | 목업 헤더 |
| `--text-body` | 16px / 1.6 | 본문 |
| `--text-sm` | 14px / 1.5 | 목업 본문 |
| `--text-meta` | 12px / 1.4 / 0.02em | 메타·라벨 |

Weight: 400 / 500 / 600 / 700.

### 5-3. 간격·레이아웃

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;

--radius-sm: 4px;
--radius: 8px;
--radius-lg: 16px;

--container: 1200px;
```

### 5-4. 컴포넌트 토큰

**Button**
- Primary: 40px 높이, bg `--accent`, text white
- Secondary: 36px 높이, transparent bg, `--border` 보더
- Hover: 5% 어두워짐, transform 없음 (Linear 스타일)

**Card**
- 배경 `--bg-elevated`, 보더 1px `--border`, 라운드 8px, 패딩 24px
- 그림자: `0 1px 3px rgba(0,0,0,0.04)` (매우 미세)
- Hover: 보더 색상 `--border-strong`

**Badge**
- 높이 20px, 패딩 0 8px, 라운드 4px, 폰트 12px / 500

### 5-5. 인터랙션·모션

원칙: 최소한의 모션. Linear/Vercel 스타일은 정적 임팩트.

```css
.section-fade-in {
  opacity: 0;
  transform: translateY(12px);
  transition: 
    opacity 400ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.section-fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .section-fade-in {
    transform: none;
    transition: opacity 200ms ease;
  }
}
```

링크·버튼: 120ms color/background 트랜지션만. 회전·스케일·parallax 금지.

### 5-6. 반응형

| 브레이크포인트 | 너비 | 레이아웃 |
|--------------|------|---------|
| 모바일 | ~640px | 1열, 카드 풀폭, 목업 SVG 100% width |
| 태블릿 | 640~1024px | 2열, 목업 SVG 100% width 유지 |
| 데스크탑 | 1024px+ | §4·§5 다열 그리드 |

모바일에서 SVG 내부 폰트는 14px 이상 유지 (가독성).

### 5-7. 접근성

- 본문 텍스트 콘트라스트 AA (4.5:1) 이상
- CTA 버튼 AAA (7:1) 이상
- 모든 CTA·링크 Tab 이동 가능, focus 2px 액센트 outline + offset 2px
- 목업 SVG: `<title>`·`<desc>` 필수, `role="img"` + `aria-label`

### 5-8. SEO·공유

```html
<title>비개발자 바이브 코딩 워크숍 | ROBOCO</title>
<meta name="description" content="4시간 워크숍 한 번이면 비개발자도 AI 자동화 도구 5종을 직접 만든다. Claude 기반, 최대 20명.">
<meta property="og:image" content="assets/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://roboco-io.github.io/vibecoding-workshop/vibecoding-for-nondeveloper/portfolio/">
```

Schema.org: `"@type": "Course"`, `provider: ROBOCO`, `audience: "비개발자 직군"`.

---

## 6. SVG 목업 작성 규약

```xml
<svg viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg" 
     role="img" aria-label="CS 문의 자동 분류 에이전트 UI 콘셉트">
  <title>CS 문의 자동 분류 에이전트</title>
  <desc>좌측 문의 리스트, 우측 분류 결과·근거·응답 초안</desc>
  
  <defs>
    <style>
      .text-primary { fill: #0A0A0A; font: 14px Pretendard, system-ui; }
      .badge-bug    { fill: #DC2626; }
      /* ... */
    </style>
  </defs>
  
  <g class="header">...</g>
  <g class="content">...</g>
</svg>
```

규약:
- 클래스 기반 스타일링 (인라인 hex 금지) → 토큰 일관성
- 모든 텍스트는 `<text>` 요소 (path 변환 금지) → 검색·접근성·다크모드 대응
- `<title>`·`<desc>` 필수

---

## 7. 빌드·배포·QA

### 7-1. 빌드

빌드 단계 없음. 브라우저에서 `index.html` 더블 클릭으로 동작.

### 7-2. 배포 — 두 채널

**채널 A: GitHub Pages**

`_config.yml`의 `include` 또는 `exclude`에 `vibecoding-for-nondeveloper/portfolio/` 처리.

발행 URL: `https://roboco-io.github.io/vibecoding-workshop/vibecoding-for-nondeveloper/portfolio/`

**채널 B: 정적 ZIP**

```
portfolio.zip
├── index.html
├── styles.css
├── scripts.js
└── assets/
```

압축 해제 후 `index.html` 더블 클릭으로 즉시 표시.

### 7-3. QA 체크리스트

```
─ 콘텐츠 ─────────────────────────────────────
□ 6개 섹션 핵심 메시지가 각 1개로 명확한가
□ 정직성 캡션이 5개 목업 모두에 있는가
□ 모든 식별 가능한 고객사 정보가 제거되었는가
□ 설문 수치는 분석 보고서와 일치하는가

─ 비주얼 ─────────────────────────────────────
□ 5개 목업 헤더·뱃지·여백 토큰이 일치하는가
□ 모바일에서 SVG 텍스트가 14px 미만으로 작아지지 않는가
□ 다크 모드에서 콘트라스트 4.5:1 이상인가
□ 모든 카드의 padding·radius·border 통일됐는가

─ 인터랙션 ──────────────────────────────────
□ 모든 CTA가 mailto: 프리필을 갖는가
□ Tab 이동 시 focus outline 표시되는가
□ prefers-reduced-motion 시 모션 제거되는가

─ 메타·SEO ──────────────────────────────────
□ <title>·meta description 정확한가
□ og-image 1200×630인가
□ favicon 표시되는가

─ 배포 ───────────────────────────────────────
□ index.html 더블 클릭으로 로컬에서 정상 동작
□ ZIP 압축 후 메일 첨부 시뮬레이션 OK
□ GitHub Pages 빌드 통과
□ 발행 URL에서 OG 카드 미리보기 정상
```

**브라우저 테스트**: Chrome / Safari / Edge 최신, iOS Safari, Android Chrome.

### 7-4. 측정

mailto: subject에 트래킹 식별자 부여: `[워크숍 문의 / web-2026-05]` — 메일 도착 시 어느 링크에서 왔는지 추적. 별도 분석 도구 도입 없이 source attribution 가능.

---

## 8. Non-Goals

| 항목 | 이유 |
|------|------|
| 실제 SaaS 제품 개발 | 워크숍 결과물은 Claude Project 패턴. 목업은 시각 콘셉트 |
| 다국어 (영문) 버전 | 1차 한국 시장 타깃, 영문은 별도 작업 |
| 동영상·애니메이션 데모 | 자가 읽기 + 미니멈 톤에 부적합 |
| 백엔드·폼 처리 | mailto: 사용으로 백엔드 불필요 |
| 상세 직군 페이지 (분기) | 압축형 1페이지에 통합 |
| 가격 정보 | 맞춤 견적 — 메일 회신 시 안내 |

---

## 9. 유지보수 원칙

1. **토큰 우선** — 색·간격·폰트 변경은 `styles.css` 토큰 수정만으로
2. **SVG 목업은 클래스 기반** — 인라인 hex 금지
3. **콘텐츠 변경**은 `index.html`만 수정 (구조 변경 없으면)
4. **신규 섹션 추가** 시 IntersectionObserver 자동 적용 → JS 수정 불필요
5. **README.md**에 "어디를 만지면 무엇이 바뀌는지" 인덱스 유지

---

## 10. 향후 확장 (선택)

| 항목 | 우선순위 |
|------|---------|
| 영문 버전 추가 | 중 |
| 개발자 워크숍용 자매 페이지 | 중 |
| 회사 로고 임프린트 옵션 | 저 |
| 더 많은 직군별 사례 추가 | 저 |
| Plausible/Umami 익명 분석 도입 | 저 |

---

## 11. 참조 자료

| 자료 | 경로 |
|------|------|
| 비개발자 설문 분석 | [../../../vibecoding-for-nondeveloper/nondeveloper_servey_analysis.md](../../../vibecoding-for-nondeveloper/nondeveloper_servey_analysis.md) |
| 5개 프로젝트 PRD | [../../../vibecoding-for-nondeveloper/projects/](../../../vibecoding-for-nondeveloper/projects/) |
| 비개발자 워크숍 기획 | [../../../vibecoding-for-nondeveloper/ideation.md](../../../vibecoding-for-nondeveloper/ideation.md) |
| 메인 README | [../../../README.md](../../../README.md) |
