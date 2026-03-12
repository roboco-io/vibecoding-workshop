# 바이브코딩 튜토리얼: Claude Code로 Go 프로젝트 문서화 & 스킬 구축

> 이 튜토리얼은 실제 프로젝트([golang-gin-realworld-example-app](https://github.com/roboco-io/golang-gin-realworld-example-app))에서 Claude Code를 사용한 작업 과정을 **프롬프트 중심**으로 기록한 것입니다. 각 단계에서 어떤 의도로 프롬프트를 작성했고, Claude Code가 어떤 작업을 수행했는지 설명합니다.

## 사전 준비

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) 설치 완료
- Go 1.21+ 프로젝트가 있는 git 저장소

---

## 1단계: 프로젝트 초기 설정

### 프롬프트 1 — Git Remote 변경

```
git remote 를 git@github.com:roboco-io/golang-gin-realworld-example-app.git 로 바꿔줘
```

**의도**: Fork한 프로젝트의 remote URL을 새 조직 저장소로 변경.

**작업 내용**: Claude Code가 `git remote set-url origin` 명령을 실행하여 remote를 변경하고, `git remote -v`로 결과를 확인했습니다.

**포인트**: 한줄짜리 단순 작업은 자연어로 직접 요청하면 됩니다. 명령어를 몰라도 의도만 전달하면 Claude Code가 적절한 git 명령을 실행합니다.

---

### 프롬프트 2 — CLAUDE.md 생성 (`/init`)

```
/init
```

**의도**: 프로젝트를 분석하여 향후 Claude Code 세션에서 사용할 컨텍스트 파일(`CLAUDE.md`)을 생성.

**작업 내용**: Claude Code가 코드베이스 전체를 탐색한 후 아래 내용이 담긴 `CLAUDE.md`를 생성했습니다:

- 빌드/테스트 명령어 (`go run`, `go test`, 커버리지, 린트)
- 환경 변수 (PORT, GIN_MODE, DB_PATH)
- 패키지 구조 및 요청 처리 흐름
- 인증 미들웨어 레이어 구조
- 테스트 컨벤션 (TestMain 패턴, mock 헬퍼)
- CI 파이프라인 구성
- 주요 의존성 테이블

**포인트**: `/init`은 Claude Code의 내장 명령으로, **프로젝트 온보딩을 자동화**합니다. 생성된 `CLAUDE.md`는 이후 모든 세션에서 자동으로 로드되어 Claude Code가 프로젝트 컨텍스트를 이해한 상태로 작업할 수 있게 합니다.

---

## 2단계: 기존 문서 정리

### 프롬프트 3 — 프로젝트 문서화

```
프로젝트 문서화 작업을 진행해줘
```

**의도**: README 및 기존 문서 파일들의 문제점을 찾아 정리.

**작업 내용**: Claude Code가 모든 문서 파일을 읽고 분석한 후 아래 문제를 발견하고 수정했습니다:

| 작업 | 파일 | 내용 |
|------|------|------|
| 수정 | `README.md` | Badge URL 4개 `gothinkster` → `roboco-io` 변경, 실제 커버리지 수치 반영, 오래된 Todo 섹션 제거 |
| 이름변경 | `readme.md` → `README.md` | 표준 대문자 컨벤션 |
| 삭제 | `BACKEND_INSTRUCTIONS.md` | RealWorld 템플릿 파일 ("Delete this file before publishing") |
| 삭제 | `FRONTEND_INSTRUCTIONS.md` | Go 프로젝트에 불필요한 프론트엔드 템플릿 |
| 삭제 | `MOBILE_INSTRUCTIONS.md` | Go 프로젝트에 불필요한 모바일 템플릿 |

**포인트**: "문서화 작업을 진행해줘"처럼 **추상적인 프롬프트**도 유효합니다. Claude Code가 스스로 문제를 발견하고 수정안을 제안합니다. 단, 범위가 넓은 작업은 결과를 확인하며 단계별로 진행하는 것이 좋습니다.

---

## 3단계: OpenSpec으로 체계적 문서 생성

### 프롬프트 4 — OpenSpec 문서화 제안

```
OpenSpec을 사용해서 현재 프로젝트를 문서화 해줘
```

이 프롬프트가 `/opsx:propose` 스킬을 트리거하여 OpenSpec 워크플로우가 시작되었습니다.

**의도**: 코드 분석 결과를 바탕으로 체계적인 기술 문서를 생성하기 위한 변경 제안(proposal) 작성.

**작업 내용**: Claude Code가 `project-documentation` 이라는 이름의 OpenSpec change를 생성하고, 3개의 artifact를 순서대로 작성했습니다:

```
openspec/changes/project-documentation/
├── proposal.md     ← 왜 문서화가 필요한지 (동기, 범위, 5개 capability)
├── design.md       ← 어떻게 구조화할지 (파일 위치, 다이어그램 형식)
├── specs/          ← 각 문서의 요구사항 정의
│   ├── architecture/spec.md
│   ├── api-reference/spec.md
│   ├── data-models/spec.md
│   ├── auth-flow/spec.md
│   └── developer-guide/spec.md
└── tasks.md        ← 33개 구현 태스크 (체크박스)
```

**포인트**: OpenSpec은 **"제안 → 설계 → 명세 → 구현"** 단계를 거치는 구조화된 워크플로우입니다. 대규모 변경 작업을 체계적으로 관리할 때 유용합니다.

---

### 프롬프트 5 — OpenSpec 구현

```
/opsx:apply
```

**의도**: 생성된 tasks.md의 33개 태스크를 실제로 구현.

**작업 내용**: Claude Code가 코드베이스를 분석하고 5개의 한국어 기술 문서를 생성했습니다:

| 문서 | 크기 | 주요 내용 |
|------|------|----------|
| `docs/architecture.md` | 5.1KB | 패키지 구조, 요청 흐름 시퀀스 다이어그램, 3계층 미들웨어 |
| `docs/api-reference.md` | 7.8KB | 19개 엔드포인트, 요청/응답 JSON 스키마, 오류 형식 |
| `docs/data-models.md` | 8.5KB | 7개 GORM 엔티티, ER 다이어그램, N+1 최적화 |
| `docs/auth-flow.md` | 4.7KB | JWT 생명주기, AuthMiddleware 플로우차트, bcrypt |
| `docs/developer-guide.md` | 6.1KB | 환경 설정, 테스트 패턴, 코드 규칙, CI |

또한 `README.md`에 Documentation 링크 테이블을 추가하고, tasks.md의 33개 체크박스를 모두 완료 처리했습니다.

---

### 프롬프트 6 — OpenSpec 아카이브

```
/opsx:archive
```

**의도**: 완료된 change를 아카이브하고, spec을 프로젝트 레벨로 동기화.

**작업 내용**:
- 33/33 태스크 완료 확인
- 5개 delta spec을 `openspec/specs/`로 동기화
- change를 `openspec/changes/archive/2026-03-11-project-documentation/`로 이동

**포인트**: `/opsx:propose` → `/opsx:apply` → `/opsx:archive`는 OpenSpec의 전체 라이프사이클입니다. 아카이브된 spec은 향후 문서 수정 시 요구사항 추적에 사용됩니다.

---

## 4단계: 한국어 번역

### 프롬프트 7 — 문서 번역

```
만들어진 문서들 모두 한국어로 바꿔줘
```

**의도**: 영문으로 생성된 5개 기술 문서를 한국어로 번역.

**작업 내용**: Claude Code가 5개 문서를 병렬로 번역하고, README.md의 Documentation 테이블 설명도 한국어로 업데이트했습니다.

**번역 원칙**:
- 전문 용어는 영문 유지: GORM, JWT, Gin, middleware, AuthMiddleware, Serializer, bcrypt 등
- 코드 블록/JSON은 원문 유지
- Mermaid 다이어그램의 라벨은 한국어로 번역

**포인트**: 번역 작업도 "한국어로 바꿔줘"만으로 충분합니다. Claude Code가 전문 용어 보존, 코드 블록 유지 등 번역 컨벤션을 자동으로 적용합니다.

---

### 프롬프트 8 — OpenSpec 폴더 질문

```
openspec 여기 아래 파일들은 번역 안해도 되는거야?
```

**의도**: OpenSpec 내부 spec 파일(`openspec/specs/`)의 번역 필요 여부 확인.

**답변 요약**: `openspec/specs/`는 내부 관리용 메타데이터로, 실제 독자가 읽는 문서가 아니므로 번역 불필요.

**포인트**: 작업 중 궁금한 점이 생기면 바로 질문할 수 있습니다. Claude Code는 프로젝트 구조를 이해하고 있으므로 맥락에 맞는 답변을 제공합니다.

---

## 5단계: 문서 구조화 및 개발 스킬 생성

### 프롬프트 9 — 스킬 생성 요청

```
향후 작업시에 사용할 스킬들을 공식문서의 지침에 따라 만들어줘.
스킬에서 참고할 수 있도록 docs 아래 문서들을 나눠서 구조화 해줘.
docs 아래 리드미도 추가해줘.
```

**의도**: (1) 5개 단일 문서를 주제별 파일로 분리하여 스킬에서 정확한 섹션을 참조 가능하게 하고, (2) 프로젝트 전용 개발 스킬을 생성.

**작업 내용**: Claude Code가 계획을 수립하여 Plan 모드로 진입했습니다. 이 프롬프트 하나에서 세 가지 작업이 도출되었습니다:

1. **docs 구조화**: 5개 파일 → 18개 주제별 파일
2. **스킬 생성**: 9개 개발 스킬 (`.claude/commands/dev/`)
3. **README**: `docs/README.md` 인덱스 + 루트 README 업데이트

이 세션에서는 컨텍스트 한계로 중단되었고, 다음 세션에서 정제된 계획으로 실행되었습니다.

**포인트**: 복잡한 요청은 Claude Code가 **Plan 모드**로 전환하여 실행 계획을 먼저 세웁니다. 계획을 검토하고 승인한 후 실행하는 2단계 워크플로우로, 대규모 변경의 실수를 줄입니다.

---

### 프롬프트 10 — 계획 실행 (최종 세션)

```
Implement the following plan:

# 계획: 개발 스킬 생성 및 문서 구조화

## 실행 전략
TeamCreate로 팀을 구성하여 5개 병렬 에이전트가 각 문서 도메인을 처리.
완료 후 리더가 스킬 9개, docs/README.md, 루트 README.md 업데이트, 기존 파일 삭제를 수행.

## 1단계: docs/ 디렉토리 구조화 (5개 에이전트 병렬)
...
## 2단계: 개발 스킬 생성 (9개)
...
## 3단계: docs/README.md + 루트 README.md 업데이트
...
## 4단계: 기존 파일 삭제
...
```

**의도**: 이전 세션에서 수립한 계획을 **구체적인 실행 지침**과 함께 전달하여 구현.

**작업 내용**:

#### 문서 분리 (5개 병렬 에이전트)

| 에이전트 | 원본 | 결과 |
|----------|------|------|
| A | `architecture.md` | `docs/architecture/` (4파일) |
| B | `api-reference.md` | `docs/api/` (3파일) |
| C | `data-models.md` | `docs/data/` (4파일) |
| D | `auth-flow.md` | `docs/auth/` (3파일) |
| E | `developer-guide.md` | `docs/guide/` (4파일) |

5개 에이전트가 **동시에** 각 문서를 분리했습니다. 에이전트들이 작업하는 동안 리더(메인 에이전트)는 9개 스킬 파일을 순차 생성했습니다.

#### 생성된 스킬 (9개)

| 스킬 | 용도 |
|------|------|
| `/dev:add-endpoint` | 새 엔드포인트 추가 (Validator→Handler→Serializer 패턴) |
| `/dev:add-model` | GORM 모델 + 마이그레이션 + 관계 설정 |
| `/dev:add-test` | table-driven 테스트 생성 |
| `/dev:check-coverage` | 커버리지 분석 + 기준선 비교 |
| `/dev:review` | 코드 리뷰 (프로젝트 규칙 기반) |
| `/dev:run-checks` | fmt→vet→test→lint 실행 |
| `/dev:debug-endpoint` | 엔드포인트 실행 경로 추적 |
| `/dev:debug-query` | GORM 쿼리 N+1 분석 |
| `/dev:pre-pr` | PR 전 전체 검증 + 설명 생성 |

#### 최종 정리
- `docs/README.md` — 5개 카테고리 × 18개 문서 인덱스 생성
- `README.md` — Documentation 테이블 교체 + Available Commands 섹션 추가
- 기존 5개 단일 문서 파일 삭제

#### 검증
```bash
# 18개 문서, 9개 스킬, 5개 삭제, 참조 경로 유효 — 모두 PASS
```

**포인트**: 계획에 **실행 전략**(병렬 에이전트 구성)까지 명시하면 Claude Code가 그대로 따릅니다. 5개 에이전트 병렬 + 리더 순차 작업으로 전체 소요 시간이 크게 단축되었습니다.

---

## 전체 프롬프트 흐름 요약

```
1. git remote 변경                    ← 단순 명령
2. /init                              ← CLAUDE.md 자동 생성
3. 프로젝트 문서화 작업을 진행해줘       ← 기존 문서 정리
4. OpenSpec으로 문서화 해줘             ← /opsx:propose → 구조화된 문서 생성
5. /opsx:apply                        ← 33개 태스크 구현
6. /opsx:archive                      ← 완료 후 아카이브
7. 한국어로 바꿔줘                     ← 5개 문서 번역
8. 번역 안해도 되는거야?                ← 질문으로 이해 확인
9. 스킬 만들어줘 + docs 구조화 해줘     ← 계획 수립 (Plan 모드)
10. Implement the following plan: ...  ← 계획 실행 (병렬 에이전트)
```

---

## 배운 점

### 프롬프트 작성 팁

1. **단순 작업**: 자연어로 직접 요청 ("git remote 바꿔줘")
2. **탐색적 작업**: 추상적 요청도 가능 ("문서화 작업을 진행해줘") — Claude Code가 문제를 발견하고 제안
3. **구조화된 작업**: 스킬/워크플로우 활용 (`/opsx:propose`, `/opsx:apply`)
4. **대규모 작업**: 구체적 계획 + 실행 전략을 포함한 프롬프트 작성
5. **질문**: 작업 중 궁금한 점은 바로 질문 ("이거 번역 안해도 돼?")

### Claude Code 활용 패턴

| 패턴 | 언제 사용 | 예시 |
|------|----------|------|
| **직접 요청** | 단순, 명확한 작업 | "git remote 변경해줘" |
| **탐색 요청** | 문제 발견이 필요할 때 | "문서화 작업을 진행해줘" |
| **스킬 실행** | 반복적/구조화된 워크플로우 | `/opsx:propose`, `/dev:add-endpoint` |
| **Plan 모드** | 복잡한 다단계 작업 | "스킬 만들고 docs 구조화 해줘" |
| **병렬 에이전트** | 독립적인 작업의 동시 실행 | 5개 문서 동시 분리 |

### 스킬의 가치

프로젝트 전용 스킬(`/dev:*`)을 만들면:
- 프로젝트 규칙과 패턴이 **코드화**됨
- 새 팀원이나 향후 세션에서 바로 활용 가능
- `/dev:add-endpoint` 하나로 Validator→Handler→Serializer 패턴 + 테스트까지 생성
- 사람이 기억할 필요 없이 Claude Code가 규칙을 참조하여 일관된 코드 생성
