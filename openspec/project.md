# Project Context — 바이브 코딩 워크숍

## 개요

ROBOCO 바이브 코딩 워크숍 커리큘럼 프로젝트. 개발자 워크숍(15명 규모)과 비개발자 워크숍(12명 규모) 두 트랙을 운영하며, 특정 기업에 종속되지 않은 일반화된 워크숍 자산을 만든다.

- **프로젝트 유형**: 워크숍 커리큘럼 (마크다운 문서 + MARP 프레젠테이션)
- **문서 언어**: 한국어 (기술 용어만 영문 병기)
- **배포**: GitHub Pages (Jekyll + MARP)

## 기술 스택

| 도구 | 용도 |
|------|------|
| MARP (`@marp-team/marp-cli`) | 마크다운 → PDF/PPTX/HTML 슬라이드 변환 |
| Jekyll (`jekyll-theme-cayman`) | GitHub Pages 정적 사이트 생성 |
| GitHub Actions | 자동 빌드·배포 파이프라인 |
| Make | 빌드 자동화 (`common/Makefile`) |
| SVG + PNG | 다이어그램·이미지 |

## 아키텍처

```
.
├── common/                        ← 공통 강의 자료 (MARP 프레젠테이션)
│   ├── presentation.md            ← MARP 슬라이드 소스 (Part 1 + Part 2)
│   ├── narrative.md               ← 스토리라인 산문 문서 (GitHub Pages 발행)
│   ├── ideation.md                ← 발표 기획 메모
│   ├── images/                    ← SVG 다이어그램 + PNG 이미지
│   ├── ModernSoftwareEngineering/ ← David Farley 원칙 참고 자료
│   └── Makefile                   ← 빌드 스크립트
├── vibecoding-for-developer/      ← 개발자 워크숍 (15명, 시니어)
│   ├── PRD.md                     ← 제품 요구 사항 문서 (소스 오브 트루스)
│   ├── student-guide.md           ← 학생용 실습 가이드 (GitHub Pages 발행)
│   ├── workshop-flow.md           ← 강사 관점 워크숍 흐름
│   ├── interview-summary.md       ← 기획 심층 인터뷰 결과
│   └── developer_survey_analysis.md ← 설문 분석
├── vibecoding-for-nondeveloper/   ← 비개발자 워크숍 (12명, 기획 중)
│   └── nondeveloper_servey_analysis.md
├── index.md                       ← GitHub Pages 홈
├── _config.yml                    ← Jekyll 설정
└── .github/workflows/             ← CI/CD 파이프라인
```

## 빌드 명령어

```bash
# MARP 프레젠테이션 빌드 (common/ 디렉토리에서)
cd common
make all          # SVG 검증 + PDF/PPTX/HTML 빌드
make validate-svg # SVG 유효성 검증
make clean        # 빌드 산출물 삭제

# Jekyll 로컬 미리보기 (루트에서)
bundle install && bundle exec jekyll serve
```

## GitHub Pages 배포

- `main` 브랜치 push 시 자동 배포 (GitHub Actions)
- 파이프라인: MARP 빌드 → Jekyll 빌드 → Pages 배포
- `_config.yml`의 `exclude` 목록으로 내부 문서 노출 제어
- 발행 페이지: `index.md`, `common/narrative.md`, `vibecoding-for-developer/student-guide.md`, `common/presentation.html`

## 문서 관계 및 컨벤션

- `PRD.md`가 개발자 워크숍 설계의 **소스 오브 트루스**
- `student-guide.md`, `workshop-flow.md` 수정 시 PRD와의 정합성 확인 필수
- `reference/` 하위 파일은 외부 원본 — 직접 수정 금지
- 설계 결정은 각 워크숍 디렉토리의 설문 분석 데이터를 근거로 함
