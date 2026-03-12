# 다이렉트 클라우드클럽 바이브 코딩 워크숍

다이렉트 클라우드클럽의 바이브 코딩 워크숍을 준비하기 위한 프로젝트.

개발자와 비개발자를 위한 두 가지 워크숍 트랙을 설계·운영한다.

## 워크숍 트랙

| 트랙 | 대상 | 상태 |
|------|------|------|------|
| [개발자 워크숍](vibecoding-for-developer/) | 시니어 개발자 | 기획 중 |
| [비개발자 워크숍](vibecoding-for-nondeveloper/) | 비개발 직군 | 기획 중 |

## 프로젝트 구조

```
.
├── README.md                          ← 이 파일
├── CLAUDE.md                          ← AI 협업 컨텍스트
├── vibecoding-for-developer/          ← 개발자 워크숍
│   ├── workshop-flow.md               ← 워크숍 흐름 (슬라이드·가이드 기준)
│   └── interview-summary.md           ← 기획 심층 인터뷰 결과
├── vibecoding-for-nondeveloper/       ← 비개발자 워크숍 (기획 중)
├── survey/                            ← 설문 데이터 (공유)
│   ├── vibe_coding_workshop_analysis.md       ← 개발자 설문 분석 (15명)
│   ├── vibe_coding_nondeveloper_analysis.md   ← 비개발자 설문 분석 (12명)
│   ├── 개발자용_바이브코딩_워크숍_사전설문_응답.csv
│   └── 비개발자_바이브코딩_워크숍_사전설문_응답.csv
└── reference/                         ← 참조 자료
    ├── presentation.md                ← 지란지교 워크숍 프레젠테이션
    ├── vibe-coding-tutorial.md        ← 바이브코딩 튜토리얼 (Go)
    └── generate-plan/                 ← 전환 계획서 생성 스킬
        ├── SKILL.md
        ├── output-template.md
        └── project-guidelines.md
```

## 개발자 워크숍 개요

AI를 팀의 개발 파이프라인에 안전하게 통합하는 방법을 실습한다.

### 구조

| 단계 | 내용 | 산출물 |
|------|------|--------|
| 1단계 | 문서화 | CLAUDE.md, OpenSpec 스펙, 스킬 |
| 2단계 | 테스트 구현 | UT, E2E 테스트, 린트, Makefile |
| 3단계 | CI/CD 구축 | pre-commit hook, pre-push hook |
| 마무리 | 튜토리얼 작성 + 전환 계획서 | 튜토리얼 문서, migration-plan.md |

### 사용 도구

| 도구 | 역할 |
|------|------|
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | AI 코딩 에이전트 (YOLO 모드) |
| [oh-my-claudecode (OMC)](https://github.com/anthropics/claude-plugins) | 멀티 에이전트 오케스트레이션 |
| [OpenSpec](https://github.com/Fission-AI/OpenSpec) | 스펙 문서 작성 표준 |
| [GitHub CLI (gh)](https://cli.github.com/) | GitHub 이슈·PR 관리 |

### 실습 프로젝트

[RealWorld](https://github.com/gothinkster/realworld) 추천 구현체에서 자기 스택에 맞는 프로젝트를 Fork하여 사용.

### 설문 기반 설계

이 워크숍은 사전 설문(개발자 15명) 데이터에 기반하여 설계되었다.

| 설문 인사이트 | 수치 | 워크숍 반영 |
|--------------|------|-----------|
| 테스트가 최대 병목 | 47% | 2단계 테스트 구현 |
| AI 환각 우려 | 87% | Human-in-the-loop 검증 패턴 |
| 컨텍스트 부족이 장애물 | 60% | 인터뷰 퍼스트 패턴 + CLAUDE.md |
| Claude 100% 사용 중 | 100% | 기초 설명 생략, 실전 중심 |

상세: [`survey/vibe_coding_workshop_analysis.md`](survey/vibe_coding_workshop_analysis.md)

## 관련 문서

- [개발자 워크숍 흐름](vibecoding-for-developer/workshop-flow.md) — 워크숍 전체 흐름
- [기획 인터뷰 결과](vibecoding-for-developer/interview-summary.md) — 심층 인터뷰 4라운드 기록
- [개발자 설문 분석](survey/vibe_coding_workshop_analysis.md) — 개발자 15명 설문 결과
- [비개발자 설문 분석](survey/vibe_coding_nondeveloper_analysis.md) — 비개발자 12명 설문 결과
