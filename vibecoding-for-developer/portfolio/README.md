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
