---
layout: default
title: "바이브 코딩 워크숍 — 학생 가이드"
---

# 바이브 코딩 워크숍 — 학생 가이드

> 시간: 4시간 (14:00~18:00) | 도구: Claude Code + OMC + OpenSpec + GitHub CLI

---

## 워크숍 목표

AI를 개발 파이프라인에 안전하게 통합하는 전체 프로세스를 직접 체험한다.

| # | 단계 | 산출물 |
|---|------|--------|
| 1 | 문서화 | CLAUDE.md, OpenSpec 스펙, Claude 스킬 |
| 2 | 테스트 구현 | UT, E2E 테스트, 린트, Makefile |
| 3 | CI/CD 구축 | pre-commit hook, pre-push hook |
| 마무리 | 튜토리얼 & 전환 계획서 | 튜토리얼 문서, `migration-plan.md` |

## 워크숍 타임라인

1. State of Vibe Coding - 바이브코딩의 현주소
1. 환경 확인
1. 1단계: 문서화
1. 2단계: 테스트 구현
1. 3단계: CI/CD 구축
1. 마무리: 튜토리얼 작성 & 전환 계획서 생성
1. 종료

> 휴식은 자유 — 각 단계 사이에 자율로 쉬어가세요

---

## 사전 준비 (워크숍 1주 전)

### 필수 설치

- **Claude Code CLI** 설치
- **[oh-my-claudecode (OMC)](https://github.com/Yeachan-Heo/oh-my-claudecode)** 설치

  OMC는 Claude Code 위에서 동작하는 **멀티 에이전트 오케스트레이션 레이어**다. 32개의 전문 에이전트(아키텍처, 테스트, 코드 리뷰, 보안 등)를 자동으로 조합하여 복잡한 작업을 처리한다. 워크숍에서는 주로 다음 명령어를 사용한다:

  | 명령어 | 역할 |
  |--------|------|
  | `/plan` | 전략적 계획 수립 — 작업을 분석하고 단계별 계획 생성 |
  | `/code-review` | 코드 리뷰 — 버그, 보안, 성능 관점에서 포괄적 검토 |
  | `/tdd` | 테스트 주도 개발 — 테스트를 먼저 작성하고 구현 |
  | `/autopilot` | 완전 자율 실행 — 계획부터 구현까지 자동 수행 |

  ```bash
  /plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode
  /plugin install oh-my-claudecode
  /omc-setup
  ```

- **[OpenSpec](https://github.com/Fission-AI/OpenSpec)** 설치

  ```bash
  npm install -g @fission-ai/openspec@latest
  ```
  OpenSpec은 AI 코딩 어시스턴트를 위한 **스펙 기반 개발(Spec-Driven Development)** 프레임워크다. 코드를 작성하기 전에 "무엇을 만들 것인지"를 스펙 문서로 합의하여, AI가 요구사항에 맞게 정확히 구현하도록 안내한다.

  **핵심 워크플로우 (Propose → Apply → Archive):**
  
  | 단계 | 명령어 | 역할 |
  |------|--------|------|
  | Propose | `/opsx:propose` | 변경 제안 — 요구사항, 설계, 태스크 체크리스트 생성 |
  | Apply | `/opsx:apply` | 구현 — 태스크를 순서대로 실행하고 체크 |
  | Archive | `/opsx:archive` | 완료 — 완성된 변경을 아카이브하고 스펙 업데이트 |

  스펙 문서가 코드와 함께 살아있는 문서(living documentation)로 유지되므로, "코드가 무엇을 해야 하는지"를 항상 알 수 있다.

- **GitHub CLI (gh)** 설치 및 로그인
- **Git** + GitHub 계정 준비
- 주력 개발 환경 (IDE, 런타임)

### 프로젝트 준비

- 아래 추천 목록에서 자기 스택에 맞는 RealWorld 구현체 **Fork**
- Fork한 프로젝트 클론 및 **로컬 빌드 확인**
- Fork한 리포지토리의 **GitHub Issues 기능 활성화** (Settings → Features → Issues 체크)

[RealWorld](https://github.com/gothinkster/realworld)에서 자기 스택에 맞는 구현체를 선택하세요.

---

## 환경 확인 (14:00~14:20)

### Claude Code YOLO 모드 시작

- YOLO 모드로 Claude Code 실행

```bash
claude --dangerously-skip-permissions
```

> YOLO 모드는 모든 권한 확인을 비활성화합니다.

### GitHub CLI 로그인 확인

- GitHub CLI 로그인 상태 확인

```bash
gh auth status
```

---

## 1단계: 문서화 (14:20~15:40, 80분)

프로젝트를 분석하고, AI가 활용할 수 있는 문서와 스킬을 생성한다.

### Step 1-1: RealWorld 프로젝트 선택 & Fork (10분)

[RealWorld](https://github.com/gothinkster/realworld)는 동일한 API 스펙을 다양한 기술 스택으로 구현한 오픈소스 프로젝트다. 자기 스택에 맞는 구현체를 선택한다.

**구현체 선택 → Fork → 클론 → 빌드 확인:**

- GitHub에서 선택한 구현체를 Fork
- Fork한 리포지토리 클론

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

- 클로드 코드에게 로컬 빌드 요청

**Fork 후 설정:**

- Fork한 리포지토리의 **GitHub Issues 기능 활성화** (Settings → Features → Issues 체크)
- 로컬 빌드가 정상 동작하는지 확인

- 프로젝트 폴더에서 OpenSpec 초기화

```bash
openspec init
```

`openspec init`을 실행하면 프로젝트 루트에 다음 구조가 생성된다:

```
openspec/
├── AGENTS.md            ← AI 에이전트 행동 규칙 (OpenSpec 모드 진입 지침)
├── project.md           ← 프로젝트 컨텍스트 (기술 스택, 아키텍처, 컨벤션)
├── specs/               ← 현재 시스템의 Source of Truth
│   └── {기능별}/spec.md  ← 기능별 상세 명세 (예: user-auth/spec.md)
└── changes/             ← 변경 제안 저장소 (Propose 단계에서 생성)
    └── {change-id}/     ← proposal.md + tasks.md + spec delta
```

| 문서 | 역할 |
|------|------|
| `AGENTS.md` | AI 에이전트가 specs/를 먼저 읽도록 유도하는 행동 규칙 |
| `project.md` | 프로젝트 전반 컨텍스트 (아키텍처, 컨벤션, 스택) |
| `specs/` | 기능별 상세 명세 — 구현 전 합의 기준이 되는 진실의 원천 |
| `changes/` | 새 기능 제안 시 AI가 생성하는 proposal·tasks·spec delta |

> `specs/`는 시스템의 현재 상태를, `changes/`는 제안된 변경사항을 담는다. `openspec apply` → `openspec archive` 과정에서 changes가 specs로 병합된다.

### Step 1-2: CLAUDE.md 생성 (10분)

- Claude Code에서 `/init` 명령어를 실행

```text
/init
```

`/init`은 프로젝트를 자동 분석하여 `CLAUDE.md`를 생성한다. 이 파일은 이후 모든 세션에서 자동 로드되어 AI가 프로젝트 컨텍스트를 이해한 상태로 작업한다.

**생성 후 확인할 것:**

- 빌드/테스트 명령어가 정확한지
- 프로젝트 구조 설명이 맞는지
- 누락된 컨텍스트가 있는지 → 직접 보완

### Step 1-3: 작업 계획 수립 & GitHub 이슈 등록 (15분)

CLAUDE.md로 프로젝트 컨텍스트가 구축되었으므로, 앞으로 진행할 작업의 전체 계획을 깃헙 이슈로 등록한다.

- 작업 계획 수립 프롬프트 실행

> **프롬프트:**
>
> 이 프로젝트에 바이브 코딩을 도입하기 위한 작업 계획을 세워줘.
> 다음 4가지 영역을 에픽으로 하여 각각의 에픽에 대해 AskUserQuestionTool로 심층 인터뷰를 진행하고 그 결과에 따라 세부 계획을 작성해줘.
> 1. 문서화 — OpenSpec으로 프로젝트 스펙 문서화 + 스킬 생성
> 2. 테스트 구현 — 단위 테스트, E2E 테스트, 린트, Makefile 통합
> 3. CI/CD 파이프라인 — pre-commit hook, pre-push hook
> 4. 전환 계획서 — generate-plan 스킬로 migration-plan.md 생성
>

- 작성된 계획 리뷰 후 GitHub 이슈 등록

> **프롬프트:**
>
> 계획 문서의 각 작업들을 gh cli를 사용해서 깃헙 이슈로 등록해줘. 각 이슈에는 작업 설명과 인수 조건이 포함되어야 해. 이슈 간 의존성이 있으면 본문에 명시해줘.

AI가 작업 계획을 제안하면 검토한 뒤, GitHub CLI로 이슈를 등록한다.

> 이슈를 먼저 등록해두면 이후 단계에서 커밋할 때 이슈 번호를 커밋 메세지에 넣어 코드와 관련된 맥락을 추적할 수 있다. AI와 협업할 때도 "이슈 #3을 해결해줘"처럼 구체적으로 지시할 수 있다.

### Step 1-4: OpenSpec 문서화 (40분)

- OpenSpec 문서화 프롬프트 실행

> **프롬프트:**
>
> OpenSpec을 사용해서 현재 프로젝트를 문서화 해줘. 각각의 파일은 클로드 스킬에서 참조하기 쉽게 200라인을 넘지 않도록 나눠서 작성해줘.

OpenSpec 워크플로우가 트리거되어 다음 구조가 생성된다:

```text
openspec/changes/<change-name>/
├── proposal.md     ← 왜 문서화가 필요한지
├── design.md       ← 어떻게 구조화할지
├── specs/          ← 각 기능의 요구사항 정의
│   ├── authentication/spec.md
│   ├── articles/spec.md
│   └── ...
└── tasks.md        ← 구현 태스크 체크리스트
```

생성된 스펙은 이후 테스트 작성과 전환 계획서의 **단일 진실 공급원(Source of Truth)** 이 된다.

### Step 1-5: 문서 → 스킬 전환 (25분)

- 스킬 생성 프롬프트 실행

> **프롬프트:**
>
> 이 문서들을 활용해서 프로젝트에 유용한 스킬을 만들어줘.
> 스킬 작성은 Claude Code 공식 스킬 가이드를 따르고, 스킬이 참조하는 문서들은
> 먼저 어떤 스킬이 이 프로젝트에 유용할지 제안해줘.

| 문서 | 목적 | 스킬 전환 |
|------|------|-----------|
| **CLAUDE.md** | AI 협업 컨텍스트 | 항상 로드 (스킬 불필요) |
| **OpenSpec** (`specs/*.spec.md`) | 기능 스펙 | 스킬이 참조 |
| **Architecture Doc** | 설계 결정과 구조 | 스킬이 참조 |

> 문서는 AI가 **읽는** 것, 스킬은 AI가 **활용하는** 것 — 문서화 후 반드시 스킬로 전환

---

## 2단계: 테스트 구현 (70분)

AI와 협업하여 테스트를 작성하고, 린트를 설정하고, Makefile로 통합한다.

### Step 2-1: 단위 테스트 생성 (25분)

- 단위 테스트 생성 프롬프트 실행

> **프롬프트:**
>
> 이 프로젝트에 단위 테스트를 작성해줘.
> 단위테스트는 OpenSpec 으로 생성된 핵심 요구사항을 커버해야 해.
> 단위 테스트 구현을 위한 심층 인터뷰를 진행하고 인터뷰 내용에 기반해서 테스트 코드를 작성해줘.

**Human-in-the-loop 검증 패턴:**

```text
AI가 테스트 작성 → 사람이 검토 → 승인 후 실행 → 결과 확인 → 수정 요청
```

> 사양서에 기반한 테스트 코드는 AI 작업 신뢰성의 근간이 된다.

### Step 2-2: E2E 테스트 생성 (20분)

- E2E 테스트 생성 프롬프트 실행

> **프롬프트:**
>
> 핵심 사용자 시나리오에 대한 E2E 테스트를 작성해줘.
> 심층 인터뷰를 통해 테스트 사양을 정의해줘.
> 테스트 구현 후에는 테스트가 실제로 시나리오를 검증하는지 함께 검토해줘.

### Step 2-3: 린트 설정 (10분)

- 린트 설정 프롬프트 실행

> **프롬프트:**
>
> 이 프로젝트에 맞는 린트를 설정해줘.
> 프로젝트의 기존 코드 스타일을 분석해서 규칙을 결정해줘.

### Step 2-4: Makefile 통합 (15분)

- Makefile 통합 프롬프트 실행

> **프롬프트:**
>
> 테스트와 린트 명령어를 Makefile로 통합해줘.


---

## 3단계: CI/CD 구축 (16:50~17:40, 50분)

Git Hooks로 로컬 품질 게이트를 구축한다.

### Step 3-1: pre-commit hook (20분)

- pre-commit hook 설정 프롬프트 실행

> **프롬프트:**
>
> pre-commit hook을 설정해줘.
> 커밋할 때마다 린트 체크와 단위 테스트가 자동 실행되도록 해줘.
> Makefile의 `make check` 타겟을 활용해줘.

| Hook | 실행 시점 | 체크 항목 |
|------|-----------|-----------|
| **pre-commit** | `git commit` | 린트 체크 + 단위 테스트 |

### Step 3-2: pre-push hook (20분)

- pre-push hook 설정 프롬프트 실행

> **프롬프트:**
>
> pre-push hook을 설정해줘.
> 푸시할 때 E2E 테스트와 커버리지 체크(80% 이상)가 실행되도록 해줘.

| Hook | 실행 시점 | 체크 항목 |
|------|-----------|-----------|
| **pre-push** | `git push` | E2E 테스트 + 커버리지 80%+ |

### Step 3-3: 동작 확인 (10분)

Git Hooks가 정상 동작하는지 테스트 커밋과 푸시로 확인한다.

- pre-commit hook 동작 확인

```bash
git add -A && git commit -m "test: verify pre-commit hook"
```

- pre-push hook 동작 확인

```bash
git push
```

> Git Hooks가 커밋을 막으면 `--no-verify`로 우회하지 말고 **테스트를 수정**하세요. 그것이 품질 게이트의 의미입니다.

---

## 마무리 (17:40~18:00, 20분)

### Step 4-1: 튜토리얼 문서 작성 (10분)

Claude Code는 프로젝트별 세션 로그를 `~/.claude/projects/<프로젝트 이름>/` 디렉토리에 자동 저장한다. 이 로그에는 사용한 프롬프트, AI의 응답, 실행된 명령어, 파일 변경 이력이 모두 기록되어 있다.

이 로그를 기반으로 오늘 워크숍 과정을 재현 가능한 튜토리얼로 변환한다.

- 튜토리얼 작성 프롬프트 실행

> **프롬프트:**
>
> `~/.claude/projects/` 에서 이 프로젝트의 세션 로그를 찾아서 분석해줘.
> 오늘 워크숍에서 진행한 전체 과정을 바이브 코딩 마이그레이션 튜토리얼로 작성해줘.
> 튜토리얼에는 다음 내용이 포함되어야 해:
> - 각 단계에서 사용한 프롬프트 원문
> - AI의 주요 응답과 생성된 산출물
> - 문제가 발생했을 때 어떻게 해결했는지
> - 다른 프로젝트에 적용할 때의 팁

### Step 4-2: 전환 계획서 생성 (10분)

- generate-plan 스킬 설치

```bash
mkdir -p .claude/skills/generate-plan
# 강사 안내에 따라 3개 파일을 복사:
# SKILL.md, output-template.md, project-guidelines.md
```

- 전환 계획서 생성 프롬프트 실행

> **프롬프트:**
>
> 이 프로젝트에 대한 바이브 코딩 전환 계획서를 만들어줘.
> generate-plan 스킬을 사용해서 진행해줘.

스킬이 자동으로 진행하는 과정:

| Phase | 활동 | 내 역할 |
|-------|------|---------|
| **Phase 0** | 코드베이스 자동 스캔 | 결과 확인 |
| **Phase 1** | 심층 인터뷰 3~5라운드 | **인터뷰 응답** |
| **Phase 2** | 분석 요약 제시 | **승인 또는 수정 요청** |
| **Phase 3** | `migration-plan.md` 생성 | 결과 검토 |

> 시간이 부족하면 Phase 1 인터뷰까지만이라도 완료하세요. 인터뷰 응답이 계획서 품질을 결정합니다.

### 작업 저장

- 워크숍 결과물 커밋 프롬프트 실행

```bash
git add -A && git commit -m "workshop: vibe coding adoption pilot"
```

---

## 워크숍 이후 액션 아이템

1. 오늘 생성한 `migration-plan.md`를 자기 팀 프로젝트에 맞게 수정
2. 팀 프로젝트에 `/init`으로 CLAUDE.md 생성
3. 핵심 기능 1개에 대해 테스트 자동화 적용
4. 팀 내 바이브 코딩 도입 파일럿 시작

---

## 도구 레퍼런스

### Claude Code

| 명령어 | 용도 |
|--------|------|
| `/init` | CLAUDE.md 자동 생성 |
| `/compact` | 컨텍스트 압축 (세션이 길어질 때) |
| `/clear` | 대화 초기화 (단계 전환 시) |
| `claude --dangerously-skip-permissions` | YOLO 모드 (실습 전용) |

### oh-my-claudecode (OMC)

| 명령어 | 용도 |
|--------|------|
| `/plan` | 전략적 계획 수립 |
| `/code-review` | 포괄적 코드 리뷰 |
| `/tdd` | 테스트 주도 개발 |
| `/autopilot` | 완전 자율 실행 |

### OpenSpec

| 명령어 | 용도 |
|--------|------|
| `openspec init` | 프로젝트 초기화 |
| `/opsx:propose` | 변경 제안 생성 |
| `/opsx:apply` | 태스크 구현 |
| `/opsx:archive` | 완료 아카이브 |

### GitHub CLI

| 명령어 | 용도 |
|--------|------|
| `gh auth login` | GitHub 로그인 |
| `gh issue create` | 이슈 생성 |
| `gh pr create` | PR 생성 |

---

## 트러블슈팅

| 문제 | 해결 |
|------|------|
| `/init`이 너무 오래 걸림 | `/compact` 후 재시도, 또는 수동으로 CLAUDE.md 초안 작성 |
| 컨텍스트 창 소진 | `/compact` 또는 `/clear` 후 CLAUDE.md 참조하여 재시작 |
| OpenSpec 명령어 안 됨 | `npm install -g @fission-ai/openspec@latest` 재실행 |
| 테스트가 실행 안 됨 | 의존성 설치 확인, 테스트 DB 설정 확인 |
| AI가 환각 응답 | **이것이 학습 포인트** — 검증 패턴으로 대응, 정확한 정보를 알려주기 |
| Git Hooks가 커밋을 막음 | `--no-verify`로 우회하지 말고 테스트를 수정 |
| 빌드가 안 됨 | TA에게 도움 요청 |
| 진도가 느림 | **완주보다 깊이** — 현재 단계에 집중 |
