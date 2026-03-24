# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

다이렉트 클라우드클럽 바이브 코딩 워크숍 준비 프로젝트. **개발자 워크숍**과 **비개발자 워크숍** 두 트랙을 운영한다.

## Language & Writing Conventions

- **문서 언어**: 한국어 (기술 용어만 영문 병기)
- 마크다운 파일만으로 구성 — 코드 프로젝트가 아닌 **워크숍 커리큘럼 프로젝트**
- 설문 데이터 기반 설계: 설계 결정은 각 워크숍 디렉토리의 설문 분석 데이터를 근거로 함

## Architecture

```
.
├── common/                            ← 공통 강의 자료 (MARP 프레젠테이션)
│   ├── presentation.md                ← MARP 슬라이드 소스
│   ├── narrative.md                   ← 스토리라인 산문 문서 (GitHub Pages 발행)
│   ├── ideation.md                    ← 발표 기획 및 키 아이디어
│   ├── images/                        ← SVG 다이어그램 + PNG 이미지
│   ├── ModernSoftwareEngineering/     ← 참고 자료 (David Farley 원칙)
│   └── Makefile                       ← 빌드 스크립트
├── vibecoding-for-developer/          ← 개발자 워크숍 (15명, 시니어)
│   ├── PRD.md                         ← 제품 요구 사항 문서
│   ├── student-guide.md               ← 학생용 워크숍 가이드 (GitHub Pages 발행)
│   ├── workshop-flow.md               ← 워크숍 흐름 (슬라이드·가이드 작성 기준)
│   ├── interview-summary.md           ← 기획자 심층 인터뷰 4라운드 결과
│   └── developer_survey_analysis.md   ← 개발자 설문 분석 (15명)
├── vibecoding-for-nondeveloper/       ← 비개발자 워크숍 (12명)
│   ├── student-guide.md               ← 학생용 워크숍 가이드
│   ├── ideation.md                    ← 워크숍 기획 및 흐름 설계
│   └── nondeveloper_servey_analysis.md ← 비개발자 설문 분석 (12명)
├── openspec/                          ← OpenSpec 변경 관리 (스펙 기반 워크플로우)
│   ├── project.md                     ← OpenSpec 프로젝트 컨텍스트
│   └── specs/                         ← 기능별 스펙 문서
└── reference/                         ← 참조 자료 (읽기 전용)
    ├── presentation.md                ← 워크숍 프레젠테이션 원본
    ├── vibe-coding-tutorial.md        ← Go RealWorld 바이브코딩 튜토리얼
    └── generate-plan/                 ← 전환 계획서 생성 스킬
```

## 공통 강의 자료 (common/)

다이렉트 클라우드클럽 시니어 개발자 15명 대상 강의 자료. MARP 기반 프레젠테이션으로 구성.

- **Part 1**: 바이브 코딩의 현 주소 — 정의, Anthropic 사례, OpenClaw 케이스 스터디, 도입 방법
- **Part 2**: 모던 소프트웨어 엔지니어링 — David Farley 원칙, Claude Code 심화, OMC 소개

### 빌드 (common/ 디렉토리에서 실행)

```bash
cd common
make all          # SVG 검증 + PDF/PPTX/HTML 빌드 (npx @marp-team/marp-cli 사용)
make validate-svg # SVG XML 유효성 검증만 실행 (xmllint 필요)
make clean        # 빌드 산출물 삭제
```

## GitHub Pages 배포

- **자동 배포**: `main` 브랜치 push 시 GitHub Actions가 Jekyll + MARP 빌드 후 GitHub Pages에 배포
- **Jekyll 테마**: `jekyll-theme-cayman` — `_config.yml`의 `exclude` 목록으로 내부 문서 노출 제어
- **발행 대상 페이지**: `index.md` (홈), `common/narrative.md`, `vibecoding-for-developer/student-guide.md`, `common/presentation.html` (MARP 슬라이드)
- **로컬 미리보기**: `bundle install && bundle exec jekyll serve`

## 개발자 워크숍 (vibecoding-for-developer/)

- **대상**: 개발자 15명 (전원 시니어, Claude 100% 사용 중)
- **시간**: 4시간 (14:00~18:00)
- **3단계 구조**: 문서화 → 테스트 구현 → CI/CD 구축
- **마무리**: 클로드 코드 로그로 튜토리얼 작성 + generate-plan 스킬로 전환 계획서 생성
- **실습 프로젝트**: [RealWorld](https://github.com/gothinkster/realworld) 오픈소스 (참가자 자유 선택 Fork)
- **도구**: Claude Code (YOLO 모드) + OMC + OpenSpec + GitHub CLI

### 문서 관계

- `PRD.md` ← 워크숍 전체 기획의 소스 오브 트루스
- `student-guide.md` ← PRD 기반으로 작성된 학생용 실습 가이드
- `workshop-flow.md` ← 강사 관점 워크숍 흐름 (슬라이드 구성 기준)
- `interview-summary.md` ← PRD 작성의 근거가 된 기획 인터뷰 원본

### 핵심 설계 결정 (설문 기반)

| 설문 인사이트 | 수치 | 워크숍 반영 |
|--------------|------|-----------|
| 테스트가 최대 병목 | 47% | 2단계 테스트 구현 |
| AI 환각 우려 | 87% | Human-in-the-loop 검증 패턴 |
| 컨텍스트 부족이 장애물 | 60% | 인터뷰 퍼스트 패턴 + CLAUDE.md |
| Claude 100% 사용 중 | 100% | 기초 설명 생략, 실전 중심 |
| CI 자동화 없음 | 33% | Git Hooks 로컬 품질 게이트 |

## 비개발자 워크숍 (vibecoding-for-nondeveloper/)

- **대상**: 비개발자 12명 (영업·CS·운영 42%, 기획/PM 17%, 디자인 8%)
- **4단계 구조**: 문제 정의(채팅 브레인스토밍) → PRD 작성(심층 인터뷰) → 목업 제작(아티팩트+코드) → 개발 계획(GitHub 이슈 등록)
- **도구**: 클로드 앱(채팅·코드·코워크·아티팩트 모드) + 코드 CLI + GitHub CLI
- **핵심 차이**: 코딩 없이 자연어만으로 진행, 클로드 코워크로 환경설정 대행
- 설문 분석은 `nondeveloper_servey_analysis.md`, 워크숍 기획은 `ideation.md` 참조

## OpenSpec 워크플로우

이 프로젝트는 OpenSpec을 사용하여 변경 관리를 수행한다. `openspec/` 디렉토리에 프로젝트 컨텍스트와 기능별 스펙이 관리되며, `.github/skills/` 및 `common/.claude/skills/`에 OpenSpec 관련 스킬이 정의되어 있다.

- 새로운 변경 제안: `openspec-propose` 스킬 사용
- 변경 구현: `openspec-apply-change` 스킬 사용
- 아이디어 탐색: `openspec-explore` 스킬 사용

## Editing Guidelines

- `reference/` 하위 파일은 외부 프로젝트에서 복사한 원본 — 직접 수정하지 말 것
- `PRD.md`가 개발자 워크숍 설계의 기준 — `student-guide.md`나 `workshop-flow.md` 수정 시 PRD와의 정합성 확인
- 비개발자 워크숍의 `ideation.md`가 해당 트랙의 설계 기준 — `student-guide.md` 수정 시 정합성 확인
- 각 워크숍 디렉토리는 독립적으로 관리 — 공유 자료는 `reference/`에 위치
- GitHub Pages 발행 대상 문서 수정 시 `_config.yml`의 `exclude` 목록과 충돌하지 않는지 확인
- `openspec/project.md`는 CLAUDE.md와 동기화 유지 — 프로젝트 구조 변경 시 양쪽 모두 업데이트
