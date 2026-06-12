# Spec: 개발자 워크숍 (vibecoding-for-developer/)

## 개요

AI를 개발 파이프라인에 안전하게 통합하는 전체 프로세스를 실습하는 워크숍.

| 항목 | 내용 |
|------|------|
| 대상 | 시니어 개발자 15명 (3년+ 경력, Claude 100% 사용 중) |
| 시간 | 4시간 (14:00~18:00) |
| 도구 | Claude Code (YOLO 모드) + OMC + OpenSpec + GitHub CLI |
| 실습 프로젝트 | RealWorld 오픈소스 Fork |

## 3단계 구조

### 1단계: 문서화 (80분)

| Step | 활동 | 산출물 |
|------|------|--------|
| 1-1 | RealWorld 구현체 선택 & Fork, OpenSpec init | Fork된 프로젝트, OpenSpec 구조 |
| 1-2 | `/init`으로 CLAUDE.md 생성 | CLAUDE.md |
| 1-3 | 작업 계획 수립 & GitHub 이슈 등록 | GitHub Issues |
| 1-4 | OpenSpec 문서화 | specs/ 디렉토리 |
| 1-5 | 문서 → 스킬 전환 | `.claude/skills/` |

### 2단계: 테스트 구현 (70분)

| Step | 활동 | 산출물 |
|------|------|--------|
| 2-1 | 단위 테스트 생성 | 테스트 코드 |
| 2-2 | E2E 테스트 생성 | E2E 테스트 코드 |
| 2-3 | 린트 설정 | 린트 설정 파일 |
| 2-4 | Makefile 통합 | Makefile |

- 테스트 커버리지 목표: **80%**
- Human-in-the-loop 검증 패턴 적용

### 3단계: CI/CD 구축 (50분)

| Hook | 실행 시점 | 체크 항목 |
|------|-----------|-----------|
| pre-commit | `git commit` | 린트 체크 + 단위 테스트 |
| pre-push | `git push` | E2E 테스트 + 커버리지 80%+ |

### 마무리 (20분)

- 클로드 코드 세션 로그 → 튜토리얼 문서 작성
- generate-plan 스킬 → `migration-plan.md` 생성

## 핵심 방법론

### 인터뷰 퍼스트 패턴

모든 단계에서 AI에게 "해줘"가 아니라 **"나에게 질문해줘"**로 시작.
- 근거: 컨텍스트 부족이 AI 도입 장애물 1위 (60%)

### Human-in-the-loop 검증

AI 출력을 맹신하지 않고 검토 단계를 프로세스에 내장.
- 근거: AI 환각 우려 1위 (87%)

## 설문 기반 설계 결정

| 설문 인사이트 | 수치 | 워크숍 반영 |
|--------------|------|-----------|
| 테스트가 최대 병목 | 47% | 2단계 테스트 구현 |
| AI 환각 우려 | 87% | Human-in-the-loop 검증 패턴 |
| 컨텍스트 부족이 장애물 | 60% | 인터뷰 퍼스트 패턴 + CLAUDE.md |
| Claude 100% 사용 중 | 100% | 기초 설명 생략, 실전 중심 |
| CI 자동화 없음 | 33% | Git Hooks 로컬 품질 게이트 |

## 문서 관계

- `PRD.md` — 워크숍 전체 기획의 **소스 오브 트루스**
- `student-guide.md` — PRD 기반 학생용 실습 가이드 (GitHub Pages 발행)
- `workshop-flow.md` — 강사 관점 워크숍 흐름
- `interview-summary.md` — PRD 작성의 근거가 된 인터뷰 원본
- `developer_survey_analysis.md` — 설문 분석 데이터
