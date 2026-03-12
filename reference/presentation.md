---
marp: true
theme: default
paginate: true
style: |
  section {
    font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
    font-size: 20px;
    color: #1a1a1a;
  }
  section.lead {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  section.lead h1 {
    border-bottom: none;
    font-size: 2.4em;
    color: #ccc;
  }
  section.lead h2 {
    font-size: 1.3em;
    font-weight: 400;
    color: #ccc;
  }
  h1 {
    color: #1a1a1a;
    border-bottom: 2px solid #333;
    padding-bottom: 0.2em;
  }
  h2 { color: #333; }
  blockquote {
    border-left: 4px solid #555;
    color: #555;
    font-style: italic;
  }
  table { font-size: 0.88em; }
  strong { color: #000; }
  .source {
    font-size: 0.6em;
    color: #999;
    position: absolute;
    bottom: 30px;
    right: 40px;
  }
  code {
    font-size: 0.85em;
  }
  pre {
    font-size: 0.78em;
    line-height: 1.5;
  }
  .prompt-box {
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 0.8em 1em;
    font-size: 0.82em;
    line-height: 1.6;
  }
---

<!-- _class: lead invert -->
<!-- _paginate: false -->

# 바이브 코딩 도입 워크숍

## 지란지교소프트 AI Transformation — Day 1 & 2

---

# 워크숍 전체 흐름

| 시간 | 세션 | 핵심 활동 |
|:-----|:-----|:----------|
| **Day 1 오전** 09:30~12:30 | 바이브 코딩 전환 파일럿 | 오픈소스(RealWorld) 프로젝트로 도구·프로세스 체험 |
| | 1단계 — 코드베이스 분석 & 도입 계획 | AI 인터뷰 → 분석 → 문서화 → 스킬 전환 |
| | 2단계 — 테스트 자동화 도입 | TDD 체험, UT/IT/E2E 구축 |
| | 3단계 — CI/CD 도입 (Git Hooks) | pre-commit · pre-push 품질 게이트 |
| **Day 1 오후** 13:30~17:00 | 실제 프로젝트 도입 계획 | 자기 팀 프로젝트(포크)에 오전 프로세스 적용 |
| | 보안 컨설팅 | AI 노출 리스크 분석, 안전 영역 구분 |
| | 코드베이스 분석 & 도입 계획 | 팀·조직 관점의 전략 수립 |
| | 문서화 & 팀 도입 로드맵 | 도입 계획서 완성 |
| **Day 2** 2시간 | 발표 & 토론 | 4명×5그룹, 1인 5분 발표 + 그룹 토론 |

---

# Why → What → **How**

| 세션 | 역할 | 핵심 질문 |
|:----:|:----:|-----------|
| 1강: State of Vibe Coding | **Why** | 바이브 코딩이란 무엇이고, 왜 지금 전환해야 하는가 |
| 2강: Modern SW Engineering | **What** | 모던 소프트웨어 엔지니어링 원칙과 Claude Code 활용법 |
| **3강: 이 워크숍** | **How** | **실제 프로젝트에 어떻게 도입하는가** |

> 오늘은 슬라이드를 보는 시간을 최소화하고, 나머지는 전부 자기 손으로 AI와 대화하며 실제 코드베이스를 다룬다

---

# 오늘의 목표

워크숍을 마치고 가져가는 세 가지:

**1. 바이브 코딩 도입 프로세스 체험**
오픈소스 프로젝트에서 분석 → 계획 → 문서화 전 과정을 AI와 협업

**2. 자기 팀 프로젝트 바코 도입 계획서**
실제 업무 프로젝트에 대한 구체적인 도입 전략

**3. AI 협업 프로세스 설계 역량**
2강의 이론을 실전으로 체화

---

<!-- _class: lead invert -->

# 워크숍 설계 철학

---

# 의도적으로 하지 않는 세 가지

**템플릿을 제공하지 않는다**
AI에게 "우리 프로젝트에 맞는 체크리스트를 만들어줘"라고 요청하는 것부터 시작한다
범용 템플릿은 AI 협업 역량을 연습할 기회를 빼앗는다

**강의를 최소화한다**
하루 중 강사가 앞에서 이야기하는 시간은 1시간 미만
막히는 곳에서 1:1 코칭을 받는 것이 시니어 개발자에게 훨씬 효과적이다

**완주를 강요하지 않는다**
프로세스의 **깊이** 를 체험하는 것이 단계를 많이 거치는 것보다 중요하다

---

# 하루의 구조

![w:920](images/day-structure.svg)

> 오전에 낯선 코드로 연습하고, 오후에 익숙한 코드에 적용한다 — **점진주의**

---

# 실습 환경: YOLO 모드

오늘 실습에서는 Claude Code를 **YOLO 모드** (권한 자동 승인)로 사용한다

**설정 방법** — 터미널에서 아래 플래그로 실행:

```bash
claude --dangerously-skip-permissions
```

**왜 YOLO 모드인가?**
- 실습 중 파일 수정, 명령 실행마다 권한 확인 팝업이 뜨면 흐름이 끊긴다
- YOLO 모드는 모든 도구(Bash, Edit, Write, MCP 등)를 **자동 승인** 한다
- 실습이 끝난 뒤 실무에서는 `default` 또는 `acceptEdits` 모드 권장

> ⚠️ YOLO 모드는 모든 권한 확인을 비활성화합니다. 실습용 격리 환경에서만 사용하세요.

---

<!-- _class: lead invert -->

# 오전: 바이브 코딩 전환 파일럿
## 09:30 ~ 12:30 (3시간, 휴식 포함)

---

# 워크숍 도구 3종

이 워크숍에서는 Claude Code에 세 가지 도구를 설치하여 사용한다

| 도구 | 역할 | 핵심 가치 |
|------|------|-----------|
| **oh-my-claudecode** | 멀티 에이전트 오케스트레이션 | 전문 에이전트 자동 위임 + 병렬 실행 |
| **OpenSpec** | 스펙 문서 작성 표준 | 스펙 먼저, 코드는 그 다음 (Source of Truth) |
| **AI-DLC** | 개발 생명주기 워크플로우 | 3단계 적응형 워크플로우 + Human Approval |

```
[개발자 의도 / Prompt]
       ↓
  oh-my-claudecode ── 전문 에이전트에게 작업 위임 (오케스트레이션)
       ↓
  AI-DLC ── 어떤 단계를 따를지 결정 (프로세스 규칙)
       ↓
  OpenSpec ── 스펙 문서를 어떻게 작성할지 결정 (문서 포맷)
       ↓
  Claude Code (AI 에이전트 실행)
```

---

# oh-my-claudecode (OMC)

Claude Code를 **팀 기반 멀티 에이전트 시스템** 으로 확장하는 플러그인

**전문 에이전트 카탈로그**

| 카테고리 | 에이전트 | 역할 |
|----------|----------|------|
| 분석 | `architect`, `planner`, `analyst` | 설계, 계획, 요구사항 분석 |
| 구현 | `executor`, `deep-executor` | 코드 구현, 복잡한 자율 작업 |
| 검증 | `code-reviewer`, `security-reviewer` | 코드 품질, 보안 취약점 검출 |
| 도메인 | `tdd-guide`, `build-fixer`, `writer` | TDD, 빌드 오류, 문서화 |

**핵심 장점**
- 작업에 맞는 전문 에이전트 **자동 위임** — 사람이 직접 분류할 필요 없음
- 여러 에이전트 **병렬 실행** 으로 처리 속도 향상
- haiku(빠른 조회) / sonnet(구현) / opus(설계·분석) **모델 자동 라우팅**

<span class="source">https://github.com/anthropics/claude-plugins — Community Plugin</span>

---

# OMC 주요 명령어

워크숍에서 자주 사용할 명령어

| 명령어 | 기능 | 워크숍 활용 |
|--------|------|-------------|
| `/plan` | 전략적 계획 수립 | 도입 계획, 아키텍처 설계 |
| `/code-review` | 포괄적 코드 리뷰 | 코드베이스 품질 분석 |
| `/security-review` | 보안 취약점 분석 | 오후 보안 컨설팅 |
| `/tdd` | 테스트 주도 개발 | 4단계 테스트 구축 |
| `/analyze` | 심층 분석·디버깅 | 코드베이스 분석 |
| `/autopilot` | 완전 자율 실행 | 문서 자동 생성 |

---

# OMC 설치

```bash
# Claude Code CLI에서 플러그인 설치
claude plugin add oh-my-claudecode

# 초기 설정
/oh-my-claudecode:omc-setup
```

설치 후 확인할 것:
- `claude` 명령어에서 `/plan`, `/code-review` 등 사용 가능 여부
- 에이전트 위임 동작 테스트: 간단한 코드 리뷰 요청

---

# OpenSpec 설치

```bash
# npm으로 설치
npm install -g @fission-ai/openspec@latest

# 프로젝트 디렉토리에서 초기화
cd your-project
openspec init
```

설치 후 확인할 것:
- `specs/` 디렉토리가 생성되었는지
- `.openspec/` 설정 파일이 생성되었는지

<span class="source">https://github.com/Fission-AI/OpenSpec</span>

---

# AI-DLC 설치

프로젝트 폴더에서 아래 명령어를 실행하면 설치 완료

**macOS / Linux:**

```bash
curl -sL https://github.com/awslabs/aidlc-workflows/releases/download/v0.1.6/ai-dlc-rules-v0.1.6.zip -o /tmp/aidlc.zip \
  && unzip -qo /tmp/aidlc.zip -d /tmp \
  && mkdir -p .claude \
  && cp /tmp/aidlc-rules/aws-aidlc-rules/core-workflow.md .claude/CLAUDE.md \
  && mkdir -p .aidlc-rule-details \
  && cp -R /tmp/aidlc-rules/aws-aidlc-rule-details/* .aidlc-rule-details/ \
  && rm -rf /tmp/aidlc.zip /tmp/aidlc-rules
# 산출물 경로를 docs/로 통일
sed -i '' 's/aidlc-docs/docs/g' .claude/CLAUDE.md
```

**Windows PowerShell:**

```powershell
Invoke-WebRequest -Uri "https://github.com/awslabs/aidlc-workflows/releases/download/v0.1.6/ai-dlc-rules-v0.1.6.zip" -OutFile "$env:TEMP\aidlc.zip"; Expand-Archive "$env:TEMP\aidlc.zip" "$env:TEMP\aidlc" -Force; mkdir -Force .claude | Out-Null; cp "$env:TEMP\aidlc\aidlc-rules\aws-aidlc-rules\core-workflow.md" ".claude\CLAUDE.md"; mkdir -Force .aidlc-rule-details | Out-Null; cp -Recurse -Force "$env:TEMP\aidlc\aidlc-rules\aws-aidlc-rule-details\*" ".aidlc-rule-details\"; rm -Recurse -Force "$env:TEMP\aidlc.zip","$env:TEMP\aidlc"
```

> 설치 후 Claude Code를 재시작해야 `.claude/CLAUDE.md` 규칙이 로드됩니다.
> 실행 중이면 `/exit`로 종료 후 `claude`로 다시 시작하세요.

<span class="source">https://github.com/awslabs/aidlc-workflows</span>

---

# OpenSpec — 스펙 먼저, 코드는 그 다음

AI 코딩 어시스턴트를 위한 **Spec-Driven Development(SDD)** 표준

**핵심 철학**: AI가 코드를 작성하기 전에 구조화된 스펙 문서를 먼저 작성 → 스펙이 **단일 진실 공급원**

**장점**

| 문제 | OpenSpec 해결 |
|------|---------------|
| AI가 맥락을 잃고 코드를 반복 재작성 | 스펙 파일이 코드와 함께 버전 관리되어 **맥락 보존** |
| 요구사항과 구현이 불일치 | 스펙 변경 → 코드 변경 순서 강제 |
| "무엇을 만들어야 하는지" 합의 부족 | 스펙 문서로 사람-AI 간 **명시적 합의** |
| 코드 리뷰 시 의도 파악 어려움 | PR/커밋에 참조 스펙 섹션 명시 |

**스펙 문서 구조** (`specs/feature-name.spec.md`)
Overview → Goals → Non-Goals → User Stories → Technical Design → API Contracts → Testing Strategy → Open Questions

<span class="source">https://github.com/Fission-AI/OpenSpec</span>

---

# OpenSpec 사용 예시

**기존 코드를 역분석하여 스펙 문서 생성**

<div class="prompt-box">

이 RealWorld 프로젝트의 기존 코드를 분석해서 인증(Authentication) 기능의 스펙 문서를 OpenSpec 포맷으로 작성해줘. 현재 구현되어 있는 코드를 기반으로 역분석해서 `specs/authentication.spec.md`로 저장해줘.

</div>

**생성되는 스펙 문서 예시** (`specs/authentication.spec.md`)

```markdown
# Authentication (기존 구현 역분석)
## Overview
JWT 기반 사용자 인증 시스템. 회원가입, 로그인, 토큰 갱신을 처리한다.
## Goals
- RealWorld API 스펙에 정의된 인증 엔드포인트 구현 (구현 완료)
## Non-Goals
- OAuth 소셜 로그인, 2FA (현재 미구현)
## Technical Design
- 현재 사용 중인 JWT 라이브러리, 토큰 만료 정책, 미들웨어 구조
## Testing Strategy
- 인증 플로우 통합 테스트: 회원가입 → 로그인 → 토큰 검증 → 보호된 API 접근
```

> 기존 코드에서 역분석한 스펙은 **향후 코드 수정의 기준선** 이 된다

---

# AI-DLC — 적응형 개발 생명주기

AI 코딩 에이전트를 위한 **3단계 적응형 라이프사이클 워크플로우**

**핵심 철학**: 에이전트는 제안하고, **인간이 승인** 하는 구조

| 단계 | 핵심 질문 | 활동 | 산출물 위치 |
|------|-----------|------|-------------|
| **INCEPTION** | WHAT, WHY | 요구사항 수집, 아키텍처 설계, 스펙 작성 | `docs/inception/` |
| **CONSTRUCTION** | HOW | 코드 구현, 테스트, QA, 코드 리뷰 | `src/`, `tests/` |
| **OPERATIONS** | RUN | 배포, 모니터링, 운영 최적화, 장애 대응 | `docs/operations/` |

**장점**
- 각 단계 완료 시 **Human Approval 필수** — AI의 독단적 진행 방지
- `.claude/rules/`에 마크다운 규칙 파일로 로드 — 설정이 간단
- Claude Code, Cursor, Cline 등 **다양한 AI 에이전트와 호환**

<span class="source">https://github.com/awslabs/aidlc-workflows</span>

---

# AI-DLC 사용 예시

**INCEPTION Phase — 코드베이스 분석 & 문서화**

<div class="prompt-box">

이 RealWorld 프로젝트에 AI-DLC 워크플로우를 적용하자. INCEPTION Phase를 시작해서 기존 코드를 분석하고, 아키텍처 문서와 스펙 문서를 OpenSpec 포맷으로 정리해줘.

</div>

**CONSTRUCTION Phase — 테스트 & CI/CD 구축** (INCEPTION 승인 후)

<div class="prompt-box">

INCEPTION Phase 승인. CONSTRUCTION Phase를 시작해서 이 프로젝트에 테스트 코드를 작성하고, GitHub Actions CI/CD 파이프라인을 구축해줘. specs/에 정리한 스펙을 기반으로 테스트 범위를 결정해.

</div>

**단계별 산출물 구조**

```
docs/
  inception/
    requirements.md       # 기존 기능 역분석 결과
    architecture.md       # 아키텍처 분석 문서
  operations/
    deployment.md         # 배포 절차
specs/
  authentication.spec.md  # 인증 기능 스펙 (역분석)
  articles.spec.md        # 글 CRUD 스펙 (역분석)
```

> 오전 파일럿 3단계(분석 → 계획 → 문서화) = AI-DLC **INCEPTION Phase**

---

# 통합 워크플로우 예시: OMC + OpenSpec + AI-DLC

**RealWorld 앱 대상 — 분석 → 문서화 → 테스트 → CI/CD**

```
Step 1  [AI-DLC]    INCEPTION Phase 시작
Step 2  [OpenSpec]  기존 코드 역분석 → 스펙 문서 작성
Step 3  [Human]     INCEPTION Phase 검토 및 승인 ✅
Step 4  [AI-DLC]    CONSTRUCTION Phase 전환
Step 5  [OMC]       /tdd로 테스트 코드 작성
Step 6  [OMC]       /autopilot으로 CI/CD 파이프라인 구축
Step 7  [OMC]       /code-review + /security-review로 검증
Step 8 [Human]     CONSTRUCTION Phase 승인 ✅
```

| 도구 | 오전 파일럿 활용 | 오후 실전 활용 |
|------|-----------------|----------------|
| **OMC** | `/analyze` 코드 분석, `/plan` 문서화 계획 | `/security-review` 보안, `/code-review` 검증 |
| **OpenSpec** | 기존 기능 역분석 → `specs/` 스펙 문서화 | 팀 프로젝트 핵심 기능 스펙 정리 |
| **AI-DLC** | INCEPTION(분석·문서화) + CONSTRUCTION(테스트·CI) | 전체 라이프사이클 적용 |

---

# 문서화 → 스킬 전환

문서화가 끝나면, 그 문서를 **Claude 스킬** 로 만들어 반복 작업을 자동화한다

```
3단계 산출물 (문서)              스킬로 전환
─────────────────────        ─────────────────────
CLAUDE.md                  → 항상 로드 (프로젝트 컨텍스트)
specs/*.spec.md            → 스킬이 참조하는 스펙 문서
docs/architecture.md → 스킬이 참조하는 설계 문서
Runbook                    → /deploy, /troubleshoot 스킬
```

**문서 구조화 원칙** — Claude 공식 가이드 기준:
- 하나의 큰 문서 대신 **작고 집중된 파일** 로 분리
- `CLAUDE.md`: 항상 로드되는 핵심 컨텍스트 (빌드 명령, 코딩 규칙)
- `.claude/rules/`: 주제별 모듈형 규칙 (경로 조건부 로드 가능)
- `.claude/skills/`: 반복 가능한 워크플로우 (필요 시에만 로드)

---

# Claude 스킬 만들기

`.claude/skills/<스킬명>/SKILL.md` 파일을 작성하면 슬래시 명령어로 호출 가능

**SKILL.md 기본 구조:**

```markdown
---
name: review-spec
description: OpenSpec 스펙 문서를 검토하고 누락된 항목을 찾는다
---

specs/ 디렉토리의 스펙 문서를 검토해줘.
각 스펙이 다음 섹션을 포함하는지 확인:
Overview, Goals, Non-Goals, User Stories,
Technical Design, API Contracts, Testing Strategy

누락된 섹션이 있으면 기존 코드를 분석하여 초안을 작성해줘.
```

**스킬 작성 시 공식 문서를 참조:**
- 스킬 가이드: https://docs.anthropic.com/en/docs/claude-code/skills
- 프론트매터 옵션: `name`, `description`, `allowed-tools`, `context`, `model`
- 문서 참조: 스킬 내에서 `[파일](상대경로)` 링크로 보조 문서 연결

> 스킬은 "문서를 읽는 AI"를 "문서를 **활용하는** AI"로 전환한다

---

# RealWorld 프로젝트

동일한 스펙(Medium.com 클론)을 다양한 기술 스택으로 구현한 오픈소스 프로젝트 모음

**왜 RealWorld인가?**

- **실전적 복잡성** — CRUD, 인증, 페이지네이션, 팔로우 등 실무 수준의 기능
- **표준 API 스펙** — Hurl 기반 자동화 테스트로 구현 정확성 검증 가능
- **다양한 스택** — 참가자 각자의 전문 분야에서 실습 가능

<span class="source">https://github.com/gothinkster/realworld (★ 82,930)</span>

---

# 추천 구현체 목록

강사가 **사전에 클론 → 빌드 → 표준 API 테스트 통과** 를 검증한 것만 사용

| 구현체 | 스택 | Stars | 최종 Push | 비고 |
|--------|------|------:|:---------:|------|
| **golang-gin** | Go + Gin + GORM | 2,668 | 2026-01 | CI 활성 |
| **aspnetcore** | C# + ASP.NET Core | 2,067 | 2026-01 | CI 활성 |
| spring-boot | Java + Spring Boot + MyBatis | 1,507 | 2024-07 | 수동 검증 필요 |
| node-express | Node.js + Express + Mongoose | 3,782 | 2024-05 | 수동 검증 필요 |
| node-express-prisma | Node.js + Express + Prisma + TS | 177 | 2023-01 | 공식 구현 |
| kotlin-spring | Kotlin + Spring Boot | 477 | 2023-05 | 수동 검증 필요 |

> django, laravel, flask는 archived — Python/PHP 스택은 강사가 별도 검증한 대안 사용

---

# 검증 방법: Hurl 표준 API 테스트

```bash
# 1. 구현체를 클론하고 로컬에서 실행
# 2. RealWorld 표준 API 테스트 실행
git clone https://github.com/gothinkster/realworld.git
cd realworld
HOST=http://localhost:PORT/api ./specs/api/run-api-tests-hurl.sh
```

모든 테스트가 통과하면 해당 구현체는 RealWorld API 스펙을 준수하는 것으로 검증

---

# 프로젝트 초기 설정

```bash
# 1. 선택한 RealWorld 구현체를 GitHub에서 Fork한 뒤 내 포크를 클론
git clone <내-포크-url>
cd <project>

# 2. OpenSpec 설치
npm install -g @fission-ai/openspec@latest
openspec init

# 4. AI-DLC 설치 (원클릭)
curl -sL https://github.com/awslabs/aidlc-workflows/releases/download/v0.1.6/ai-dlc-rules-v0.1.6.zip -o /tmp/aidlc.zip \
  && unzip -qo /tmp/aidlc.zip -d /tmp \
  && mkdir -p .claude \
  && cp /tmp/aidlc-rules/aws-aidlc-rules/core-workflow.md .claude/CLAUDE.md \
  && mkdir -p .aidlc-rule-details \
  && cp -R /tmp/aidlc-rules/aws-aidlc-rule-details/* .aidlc-rule-details/ \
  && rm -rf /tmp/aidlc.zip /tmp/aidlc-rules
# 산출물 경로를 docs/로 통일
sed -i '' 's/aidlc-docs/docs/g' .claude/CLAUDE.md
```

> Windows는 AI-DLC 설치 슬라이드의 PowerShell 명령어 참조

> Fork → 클론 → 도구 설치 → 실습 시작. 내 포크이므로 자유롭게 push 가능

---

# 핵심 3단계

![w:900](images/morning-3steps.svg)

분석·문서화 → 테스트 자동화 → CI/CD 구축까지, 바이브 코딩으로 프로젝트 기반을 완성한다

---

# 인터뷰 퍼스트 패턴

모든 단계에서 공통으로 사용하는 프롬프팅 기법

![w:860](images/interview-first.svg)

> AI에게 바로 "해줘"가 아니라, 먼저 "나에게 질문해줘"

---

# 1단계: 코드베이스 분석 & 도입 계획 (약 60분)

- AI에게 프로젝트 구조 분석 → 아키텍처, 모듈, 의존성 파악
- 분석 결과 기반으로 바이브 코딩 도입 전략 설계
- 우선순위 결정, 리스크 분석, AI 활용 영역 구분
- 프로젝트 문서화 (CLAUDE.md, README, OpenSpec 스펙, AI-DLC 산출물)

<div class="prompt-box">

이 RealWorld 프로젝트에 바이브 코딩을 도입하는 연습을 하려고 해.
코드베이스를 분석하고 도입 계획을 세운 다음, 프로젝트 문서화까지 진행할 거야.
**시작하기 전에 나에게 심층 인터뷰를 해줘:**
 · 이 프로젝트 구조에서 내가 이미 파악한 것과 아직 모르는 것
 · 바이브 코딩 도입에서 특히 집중하고 싶은 영역
 · AI가 잘 다룰 수 있는 영역과 사람이 해야 하는 영역의 구분

</div>

---

# 1단계 (계속): 문서화 & 스킬 전환

문서화가 끝나면, 문서를 **Claude 스킬** 로 전환하여 반복 작업을 자동화

| 문서 | 목적 | 스킬 전환 |
|------|------|-----------|
| **CLAUDE.md** | AI 협업 컨텍스트 | 항상 로드 (스킬 불필요) |
| **OpenSpec** (`specs/*.spec.md`) | 기능 스펙 — 단일 진실 공급원 | `/review-spec` 스킬이 참조 |
| **Architecture Doc** | 설계 결정과 구조 | `/analyze` 스킬이 참조 |
| **Runbook** | 빌드, 배포, 장애 대응 | `/deploy`, `/troubleshoot` 스킬 |

<div class="prompt-box">

프로젝트 문서화가 끝났어. 이제 이 문서들을 활용하는 Claude 스킬을 만들자.
`.claude/skills/` 디렉토리에 SKILL.md를 작성해줘.
**스킬 작성은 Claude Code 공식 스킬 가이드를 따라줘.**
먼저 어떤 스킬이 이 프로젝트에 유용할지 제안해줘.

</div>

> 문서는 AI가 **읽는** 것, 스킬은 AI가 **활용하는** 것 — 문서화 후 반드시 스킬로 전환

---

# ☕ 10분 휴식

---

# 2단계: 테스트 자동화 도입 (약 40분)

- 기존 테스트 분석, AI와 협업하여 핵심 경로 테스트 작성
- 단위 테스트(UT), 통합 테스트(IT), E2E 테스트 구축
- TDD 체험: AI에게 테스트 먼저 작성하도록 요청

<div class="prompt-box">

이 프로젝트에 테스트 자동화를 도입하려고 해.
**먼저 심층 인터뷰를 해줘:**
 · 현재 테스트가 있는지, 있다면 어떤 수준인지
 · 가장 먼저 테스트해야 하는 핵심 경로 (인증, CRUD 등)
 · 단위 테스트, 통합 테스트, E2E 테스트 중 우선순위

</div>

---

# 3단계: CI/CD 도입 — Git Hooks (약 30분)

Git Hooks를 활용한 로컬 CI/CD 파이프라인 구축

| Hook | 실행 시점 | 체크 항목 |
|------|-----------|-----------|
| **pre-commit** | `git commit` 실행 시 | 단위 테스트(UT) + 린트(Lint) 체크 |
| **pre-push** | `git push` 실행 시 | 통합 테스트(IT) + E2E + 테스트 커버리지 체크 |

<div class="prompt-box">

이 프로젝트에 Git Hooks 기반 CI/CD를 도입하려고 해.
pre-commit에서는 단위 테스트와 린트 체크를, pre-push에서는 통합/E2E 테스트와 커버리지 체크를 수행하도록 구축해줘.
**먼저 인터뷰해줘:**
 · 이 프로젝트에서 사용하는 테스트 프레임워크와 린터
 · 커버리지 임계값 (예: 80%)
 · pre-commit이 너무 오래 걸리지 않도록 UT 실행 시간 확인

</div>

> 클라우드 CI/CD 없이 **로컬 Git Hooks만으로** 코드 품질 게이트를 구축한다

---

# 🍽️ 점심 (12:30 ~ 13:30)

---

<!-- _class: lead invert -->

# 오후: 실제 프로젝트 도입 계획
## 13:30 ~ 17:00 (3.5시간, 휴식 포함)

---

# 오전 vs 오후

| | 오전 — 파일럿 | 오후 — 실전 |
|---|---|---|
| **대상** | 오픈소스 (RealWorld) | 자기 팀 실제 프로젝트 (포크) |
| **관점** | "이 프로젝트" — 개인 실습 | "우리 팀" — 리더의 전략 수립 |
| **프롬프트** | 오픈소스 맥락 | 실무 맥락 + 팀/조직 관점 |
| **추가 단계** | — | 보안 컨설팅, 팀 도입 로드맵 |
| **목표** | 도구와 프로세스에 익숙해지기 | 팀 도입 계획서 완성 |

---

# 오후 프로젝트 초기 설정

```bash
# 1. 포크한 프로젝트 클론
git clone <내-포크-url>
cd <project>

# 2. 원본 리포지토리 리모트 삭제 (실수로 원본에 푸시 방지)
git remote -v                  # 리모트 목록 확인
git remote remove upstream     # 포크 시 자동 생성된 upstream 제거

# 3. OpenSpec + AI-DLC 설치 (오전과 동일)
npm install -g @fission-ai/openspec@latest
openspec init

# 4. AI-DLC 설치 (원클릭)
curl -sL https://github.com/awslabs/aidlc-workflows/releases/download/v0.1.6/ai-dlc-rules-v0.1.6.zip -o /tmp/aidlc.zip \
  && unzip -qo /tmp/aidlc.zip -d /tmp \
  && mkdir -p .claude \
  && cp /tmp/aidlc-rules/aws-aidlc-rules/core-workflow.md .claude/CLAUDE.md \
  && mkdir -p .aidlc-rule-details \
  && cp -R /tmp/aidlc-rules/aws-aidlc-rule-details/* .aidlc-rule-details/ \
  && rm -rf /tmp/aidlc.zip /tmp/aidlc-rules
# 산출물 경로를 docs/로 통일
sed -i '' 's/aidlc-docs/docs/g' .claude/CLAUDE.md
```

> Windows는 AI-DLC 설치 슬라이드의 PowerShell 명령어 참조

> 실제 업무 코드를 다루기 전에 **리모트 정리** 부터 — 원본에 실수로 푸시하는 사고 방지

---

# 13:30 ~ 14:00 | 보안 컨설팅 (30분)

실제 업무 코드를 AI에 노출하는 것에 대한 우려 — **회피하지 않고 정면으로 다룬다**

- AI에게 직접 보안 우려사항 상담
- 리스크 매트릭스 작성
- AI에 노출해도 안전한 영역 vs 제외할 영역 구분

<div class="prompt-box">

우리 팀 프로젝트에 바이브 코딩을 도입하려고 하는데, 보안 측면에서 상담해줘.
**먼저 우리 상황을 파악하기 위해 인터뷰해줘:**
 · 프로젝트에서 다루는 데이터의 민감도
 · 시크릿/API 키 관리 현황
 · 조직의 보안 정책이나 컴플라이언스 요구사항

</div>

> 보안 문제를 AI 도입의 장벽이 아니라, **AI와 함께 해결하는 문제** 로 전환

---

# 14:00 ~ 15:30 | 코드베이스 분석 & 도입 계획 (1.5시간)

오전과 동일한 프로세스, **다른 관점**

<div class="prompt-box">

우리 팀 프로젝트에 바이브 코딩을 도입하려고 해.
먼저 코드베이스를 분석해야 하는데, **분석 전에 심층 인터뷰를 해줘.**
 · 이 프로젝트의 목적과 도메인 맥락
 · 현재 개발 프로세스와 팀 구성
 · 가장 자주 변경되는 영역과 고통 포인트
 · 레거시 부채가 가장 심한 영역

</div>

<div class="prompt-box">

도입 계획을 세우려고 해. **먼저 심층 인터뷰를 통해 우리 팀 상황을 파악해줘.**
 · 팀원들의 AI 도구 경험 수준과 수용도
 · 빠른 성과를 보여줄 수 있는 영역 (quick win)
 · 절대 리스크를 감수할 수 없는 영역 (no-go zone)

</div>

---

# ☕ 10분 휴식

---

# 15:40 ~ 16:30 | 문서화 & 팀 도입 로드맵 (50분)

CLAUDE.md를 넘어 **팀에 실제 필요한 문서 전체** + OpenSpec/AI-DLC 산출물 + 팀 도입 로드맵 수립

<div class="prompt-box">

우리 팀 프로젝트의 문서화를 체계적으로 하려고 해.
CLAUDE.md, README.md, Design Doc, Architecture Doc, Runbook 등
AI 협업과 팀 운영에 필요한 문서를 만들려고 하는데,
스펙 문서는 OpenSpec 포맷(specs/*.spec.md)으로, 단계별 산출물은 AI-DLC 구조(docs/)에 따라 정리하자.
**먼저 나에게 인터뷰해줘:**
 · 현재 문서화가 부족하여 팀에 고통을 주는 영역
 · 새 팀원이 합류할 때 항상 설명해야 하는 것들
 · AI가 절대 건드리면 안 되는 파일이나 설정

</div>

<div class="prompt-box">

바코 도입 계획을 팀에 실제 적용하기 위한 로드맵을 만들려고 해.
**먼저 인터뷰해줘:**
 · 팀에서 가장 먼저 시도해볼 파일럿 태스크 후보
 · 도입 성과를 측정할 수 있는 지표
 · 도입 후 3개월 내 달성하고 싶은 목표

</div>

---

# 16:30 ~ 17:00 | Day 1 마무리 (30분)

- 오늘 작업 정리 및 저장 (`git commit`)
- Day 2 발표 안내
- AI에게 발표 자료 초안 작성 요청하는 시간

---

<!-- _class: lead invert -->

# Day 2: 발표 세션
## 2시간

---

# 발표 형식

**4명씩 5개 그룹**, 그룹당 약 24분

### 1인 5분 발표

| 시간 | 내용 |
|:----:|------|
| 1분 | 자기 팀 프로젝트 소개 |
| 2분 | 바코 도입 계획 핵심 내용 |
| 1분 | 인사이트 & 예상 도전 과제 |
| 1분 | AI 협업 과정에서의 발견 |

- 형식 자유: 슬라이드, CLAUDE.md 화면 공유, 계획서 등
- 그룹 토론 4분 + 그룹 간 전환 휴식

> 평가가 아니라, 20명의 리더가 서로의 접근법에서 **배우는 시간**

---

<!-- _class: lead invert -->

# 사전 준비

---

# 참가자 준비 사항 (워크숍 1주 전)

### 필수 설치
- [ ] Claude Code CLI 설치 및 API 키 설정
- [ ] Hurl 설치 (RealWorld 표준 API 테스트용)
- [ ] Git + GitHub 계정 준비
- [ ] 주력 개발 환경 (IDE, 런타임 등)
- [ ] [OpenSpec](https://github.com/Fission-AI/OpenSpec) / [AI-DLC](https://github.com/awslabs/aidlc-workflows) 사전 확인

### 사전 학습
- [ ] 1강, 2강 내용 복습
- [ ] Claude Code 기본 사용법 숙지 (`/init`, `/compact`, `/clear`)
- [ ] 추천 목록에서 자기 스택 RealWorld 프로젝트 **사전 Fork 및 빌드 확인**

### 오후 세션 준비
- [ ] 자기 팀 프로젝트 **포크** 완료 및 로컬 빌드 확인
- [ ] (필요 시) 보안 관련 사전 승인 확보

---

# 강사 준비 사항

### 프로젝트 검증
- [ ] 추천 RealWorld 구현체 각각 **클론 → 빌드 → API 테스트** 실행 검증
- [ ] 각 구현체에 OpenSpec + AI-DLC 설치 및 동작 사전 검증
- [ ] Python/PHP 스택 참가자용 대안 구현체 조사 및 검증

### 보조 강사 역할 분담
- [ ] 참가자를 4~5명 그룹으로 나눠 각 보조 강사가 담당
- [ ] 담당 그룹의 기술 스택 사전 파악

### 트러블슈팅 대비
- [ ] 스택별 빈출 빌드 에러 및 해결책 목록
- [ ] Claude Code API 속도 저하 시 대안
- [ ] Claude Code 토큰 리밋 도달 시 **예비 계정 전환** 안내 준비
- [ ] 네트워크 환경 사전 테스트

---

<!-- _class: lead invert -->

# 원칙에서 실천으로

---

# 오늘이 끝나면

각자의 노트북에 **자기 팀 프로젝트에 대한 바이브 코딩 도입 계획서** 가 있다

AI가 만들어준 것이 아니라, **AI와 대화하며 자기가 만든 것** 이다

그 과정에서 체화한 AI 협업 설계 역량이 오늘의 진짜 산출물이다

> 바이브 코딩 도입은 도구 설치가 아니라 **프로세스 설계** 다
> 오늘 그 첫 번째 설계를 함께 한다
