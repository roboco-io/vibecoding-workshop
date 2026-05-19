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
| OG 카드 | `assets/og-image.svg` → 재래스터화 (`rsvg-convert -w 1200 -h 630 ...`) |
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
