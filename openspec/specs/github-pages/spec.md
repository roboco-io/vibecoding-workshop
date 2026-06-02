# Spec: GitHub Pages 배포

## 개요

워크숍 자료와 외부 소개용 포트폴리오를 공개하기 위한 GitHub Pages 정적 사이트.

- 운영 도메인: `https://roboco.io/vibecoding-workshop/`
- 원본 호스트: `https://roboco-io.github.io/vibecoding-workshop/`

## 배포 파이프라인

```
main push → GitHub Actions → MARP 빌드 → Jekyll 빌드 → Pages 배포
```

### GitHub Actions 워크플로우 (`.github/workflows/deploy-pages.yml`)

| 단계 | 동작 |
|------|------|
| MARP 빌드 (개발자) | `common/presentation.md` → `common/presentation.html` |
| MARP 빌드 (비개발자) | `vibecoding-for-nondeveloper/presentation.md` → `vibecoding-for-nondeveloper/presentation.html` |
| Jekyll 빌드 | 마크다운 → `_site/` |
| 에셋 복사 | `common/presentation.html`을 `_site/presentation.html`과 `_site/common/presentation.html` 양쪽에 배치, `common/images/*` 복사, `vibecoding-for-nondeveloper/presentation.html` 복사 |
| 배포 | `_site/` → GitHub Pages |

### 환경

| 항목 | 버전 |
|------|------|
| Node.js | 24 |
| Ruby | 3.3 |
| Jekyll 테마 | `jekyll-theme-cayman` |

## 발행 대상 페이지

### 홈

| 페이지 | 소스 파일 | 용도 |
|--------|----------|------|
| 홈 | `index.md` | 트랙별 자료 목차 (랜딩·가이드·슬라이드·내러티브 카드 그리드) |

### 개발자 트랙

| 페이지 | 소스 파일 | 용도 |
|--------|----------|------|
| 개발자 워크숍 랜딩 | `vibecoding-for-developer/portfolio/index.html` | 엔지니어링 매니저·CTO 대상 단일 페이지 |
| 학생 가이드 | `vibecoding-for-developer/student-guide.md` | 실습 가이드 |
| 슬라이드 | `common/presentation.html` (MARP 빌드 산출물) | State of Vibe Coding + 모던 소프트웨어 엔지니어링 |
| 내러티브 | `common/narrative.md` | 스토리라인 산문 |

### 비개발자 트랙

| 페이지 | 소스 파일 | 용도 |
|--------|----------|------|
| 비개발자 워크숍 랜딩 | `vibecoding-for-nondeveloper/portfolio/index.html` | 비개발자·실무 리더 대상 단일 페이지 |
| 학생 가이드 | `vibecoding-for-nondeveloper/student-guide.md` | 실습 가이드 |
| 슬라이드 | `vibecoding-for-nondeveloper/presentation.html` (MARP 빌드 산출물) | 비개발자 발표 자료 |

## 노출 제어 (`_config.yml` exclude)

다음 파일은 Jekyll 빌드에서 제외되어 GitHub Pages에 노출되지 않음:

- 내부 기획 문서: `PRD.md`, `workshop-flow.md`, `interview-summary.md`, `developer_survey_analysis.md`, `nondeveloper_servey_analysis.md`, `ideation.md`, `6-pager.md`
- 포트폴리오 내부 README: `vibecoding-for-developer/portfolio/README.md`, `vibecoding-for-nondeveloper/portfolio/README.md`
- 비개발자 실습 프로젝트 스타터: `vibecoding-for-nondeveloper/projects/`
- 내부 참고 자료: `reference/`, `common/ModernSoftwareEngineering/`, `common/ideation.md`, `common/README.md`
- 빌드 관련: `Gemfile`, `Gemfile.lock`, `Makefile`, `common/Makefile`
- 에이전트/스킬 설정: `CLAUDE.md`, `AGENTS.md`, `.superpowers/`, `.omc/`
- 변경 관리/내부 문서: `openspec/`, `docs/`
- 빌드 산출물: `*.pdf`, `*.pptx`

## 메타데이터 정책

- 사이트 언어: `lang: ko-KR` (`_config.yml`) — 한국어 페이지에 맞춰 `og:locale` 보정
- 사이트 기본 OG 이미지: 개발자 포트폴리오의 `og-image.png` 사용 (`index.md` frontmatter `image:`)
- 페이지별 `title:` frontmatter를 명시해 `<header>`와 `<title>`, `og:title`이 일관되게 노출되도록 한다
- 포트폴리오 페이지(`vibecoding-for-developer/portfolio/`, `vibecoding-for-nondeveloper/portfolio/`)는 자체 OG 카드(`assets/og-image.png`)와 canonical URL을 별도 관리한다
