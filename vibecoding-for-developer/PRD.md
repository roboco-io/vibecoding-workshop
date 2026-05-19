# PRD: 개발자를 위한 바이브 코딩 워크숍

> 시니어 개발자 15명 단위 | 4시간 (예: 14:00~18:00)

## 1. 배경

시니어 개발자 15명 규모를 가정한 사전 설문 결과, 다음 현실이 확인되었다:

- **테스트가 최대 병목**(47%) — CI 자동화 없는 팀이 33%
- **AI 환각 우려**(87%) — AI 결과물을 신뢰할 수 있는 검증 프로세스 부재
- **컨텍스트 부족이 AI 도입 장애물 1위**(60%) — 코드베이스 정보를 AI에게 효과적으로 전달하지 못함
- **Claude 100% 사용 중** — AI 도구 자체는 이미 팀 단위 도입 완료

AI 도구를 쓰고 있지만, **안전하게 개발 파이프라인에 통합하는 방법**을 모르는 상태다. 이 워크숍은 그 갭을 메운다.

## 2. 목표

### 핵심 목표

참가자가 자기 스택의 오픈소스 프로젝트에 AI 기반 개발 파이프라인을 직접 구축하고, 그 경험을 바탕으로 실무 전환 계획서를 작성한다.

### 성공 기준

| 기준 | 목표 |
|------|------|
| 3단계 실습 완수 (문서화 → 테스트 → CI/CD) | 참가자 80%+ |
| 핵심 스킬 3개 이상 체험 | 참가자 100% |
| AI 협업 프로세스 체화 (인터뷰 퍼스트 패턴) | 참가자 100% |
| 전환 계획서(migration-plan.md) 완성 | 참가자 80%+ |
| 사후 만족도 | 80%+ |

### 실패 방지 (Non-Negotiable)

- **환경 세팅에 시간 낭비하지 않는다** — 사전 준비로 해결, 당일 10분 내 해결 안 되면 페어링
- **강의 비중이 과다하지 않는다** — 강사 발표 30분 미만, 나머지 전부 실습

## 3. 대상 참가자

| 항목 | 현황 |
|------|------|
| 인원 | 15명 |
| 경력 | 전원 3년+ (6~10년 40%, 11~15년 20%) |
| 역할 | FE 40%, BE 20%, ML/AI 20%, FS/Mobile/DevOps 각 7% |
| 주 언어 | Python 53%, Go 47%, React/Next.js 33% |
| 서비스 | 전원 B2B |
| 인프라 | GitHub Actions 73%, AWS ECS/EKS 80% |
| AI 도구 | Claude 100%, 팀 정책 운영 80% |

**시사점**: 기초 설명 불필요. 실무 적용 중심 설계. 스택 다양하므로 범용 프롬프트 위주.

## 4. 실습 프로젝트

[RealWorld](https://github.com/gothinkster/realworld) 오픈소스 구현체를 사용한다. 참가자가 자기 스택에 맞는 구현체를 자유 선택하여 Fork한다.

**이유**: 실무 코드 외부 반출 제약(27%) 대응 + 표준화된 API 스펙으로 교차 검증 가능

## 5. 워크숍 구조

```
14:00  오프닝 & 환경 확인 (20분)
14:20  1단계: 문서화 (80분)
15:40  2단계: 테스트 구현 (70분)
16:50  3단계: CI/CD 구축 (50분)
17:40  마무리: 튜토리얼 작성 & 전환 계획서 생성 (20분)
18:00  종료
```

> 휴식은 자유 — 참가자 자율에 맡김

### 오프닝 & 환경 확인 (20분)

- 바이브 코딩 소개 및 학습 도구로서의 AI 유용성 설명
- 사전설문 결과 분석 내용 간략 소개
- 워크숍 3단계 구조와 전체 흐름 소개
- 환경 확인: Claude Code, OMC, OpenSpec, GitHub CLI 설치 상태 확인
- Claude Code YOLO 모드(`--dangerously-skip-permissions`) 설정

### 1단계: 문서화 (80분)

RealWorld 프로젝트를 분석하고, AI가 활용할 수 있는 문서와 스킬을 생성한다.

| Step | 활동 | 산출물 |
|------|------|--------|
| 1-1 | 리얼월드 앱 소개 및 구현체 선별 | Fork된 프로젝트 |
| 1-2 | GitHub 이슈 기능 활성화 | — |
| 1-3 | `/init`으로 CLAUDE.md 생성 | CLAUDE.md |
| 1-4 | `openspec init` + OpenSpec 문서화 | OpenSpec 스펙 문서 |
| 1-5 | 생성된 문서로 Claude 스킬 생성 | `.claude/skills/` |

### 2단계: 테스트 구현 (70분)

AI와 협업하여 테스트를 작성하고, 린트를 설정하고, Makefile로 통합한다.

| Step | 활동 | 산출물 |
|------|------|--------|
| 2-1 | 단위 테스트(UT) 생성 | 테스트 코드 |
| 2-2 | E2E 테스트 생성 | E2E 테스트 코드 |
| 2-3 | 린트 설정 | 린트 설정 파일 |
| 2-4 | Makefile로 테스트·린트 명령어 통합 | Makefile |

- 테스트 커버리지 목표: **80%**
- AI 생성 테스트는 반드시 사람이 검토 후 실행 (Human-in-the-loop)

### 3단계: CI/CD 구축 (50분)

Git Hooks로 로컬 품질 게이트를 구축한다.

| Hook | 실행 시점 | 체크 항목 |
|------|-----------|-----------|
| pre-commit | `git commit` | 린트 체크 + 단위 테스트 실행 |
| pre-push | `git push` | E2E 테스트 + 커버리지 체크 |

### 마무리 (20분)

| 활동 | 산출물 |
|------|--------|
| 클로드 코드 로그 분석 → 튜토리얼 문서 작성 | 튜토리얼 문서 |
| generate-plan 스킬로 전환 계획서 생성 | `migration-plan.md` |

## 6. 사용 도구

| 도구 | 역할 | 비고 |
|------|------|------|
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | AI 코딩 에이전트 | YOLO 모드 (실습 전용) |
| [oh-my-claudecode (OMC)](https://github.com/anthropics/claude-plugins) | 멀티 에이전트 오케스트레이션 | `/plan`, `/code-review`, `/tdd` |
| [OpenSpec](https://github.com/Fission-AI/OpenSpec) | 스펙 문서 작성 표준 | `openspec init` |
| [GitHub CLI (gh)](https://cli.github.com/) | GitHub 이슈·PR 관리 | 이슈 활성화, PR 생성 |
| [generate-plan 스킬](../reference/generate-plan/SKILL.md) | 전환 계획서 자동 생성 | 필수 10개 섹션 |

## 7. 핵심 방법론

### 인터뷰 퍼스트 패턴

모든 단계에서 AI에게 "해줘"가 아니라 **"나에게 질문해줘"** 로 시작한다.

- AI가 질문을 통해 프로젝트 맥락을 파악 → 컨텍스트 구축
- 내 답변이 분석 범위를 제한 → 범위 한정
- 정확한 정보를 전달 → 환각 가능성 감소

**근거**: 설문에서 컨텍스트 부족이 AI 도입 장애물 1위(60%)

### Human-in-the-loop 검증

AI 출력을 맹신하지 않고, 검토 단계를 프로세스에 내장한다.

```
AI가 코드 생성 → 사람이 검토 → 승인 후 실행 → 결과 확인 → 수정 요청
```

**근거**: 설문에서 AI 환각 우려 1위(87%)

## 8. 사전 준비 요구사항

### 참가자 (워크숍 1주 전)

- [ ] Claude Code CLI + API 키 설치
- [ ] oh-my-claudecode (OMC) 설치
- [ ] OpenSpec 설치 (`npm install -g @fission-ai/openspec@latest`)
- [ ] GitHub CLI (gh) 설치 및 로그인
- [ ] RealWorld 구현체 Fork 및 로컬 빌드 확인
- [ ] (보안팀 승인 필요 시) 도구 설치 승인 사전 확보

### 강사

- [ ] 추천 RealWorld 구현체 빌드·테스트 검증
- [ ] Wi-Fi 환경 테스트 (15명 동시 API 호출)
- [ ] Claude API 예비 계정 준비
- [ ] generate-plan 스킬 파일 배포 준비
- [ ] TA 역할 분담 및 스택별 그룹 사전 배정

## 9. 보안 고려사항

| 제약 유형 | 비율 | 대응 |
|----------|------|------|
| 코드/민감정보 외부 반출 불가 | 27% | RealWorld 오픈소스로 실습 |
| 승인된 SaaS만 허용 | 27% | Claude Code는 로컬 CLI |
| 보안팀 승인 필요 | 33% | 설치 목록 워크숍 2주 전 공유 |

## 10. 제외 범위 (Non-Goals)

| 항목 | 이유 |
|------|------|
| AI 기초 개념 교육 | 전원 Claude 사용 중, 기초 불필요 |
| 실무 프로젝트 직접 적용 | 보안 제약 대응 — RealWorld로 실습 후 계획서로 연결 |
| 운영 환경 배포 | 워크숍 범위 초과, Git Hooks 로컬 CI까지만 |
| 비개발자 대상 내용 | 별도 워크숍 트랙으로 분리 |

## 11. 산출물 목록

| # | 산출물 | 생성 시점 |
|---|--------|----------|
| 1 | CLAUDE.md | 1단계 |
| 2 | OpenSpec 스펙 문서 | 1단계 |
| 3 | Claude 스킬 (`.claude/skills/`) | 1단계 |
| 4 | 단위 테스트 + E2E 테스트 | 2단계 |
| 5 | 린트 설정 + Makefile | 2단계 |
| 6 | Git Hooks (pre-commit, pre-push) | 3단계 |
| 7 | 튜토리얼 문서 | 마무리 |
| 8 | `migration-plan.md` (전환 계획서) | 마무리 |

## 12. 참조 자료

| 자료 | 경로 |
|------|------|
| 기획 심층 인터뷰 결과 | [interview-summary.md](interview-summary.md) |
| 개발자 설문 분석 | [survey/vibe_coding_workshop_analysis.md](../survey/vibe_coding_workshop_analysis.md) |
| 지란지교 워크숍 프레젠테이션 | [reference/presentation.md](../reference/presentation.md) |
| 바이브코딩 튜토리얼 (Go) | [reference/vibe-coding-tutorial.md](../reference/vibe-coding-tutorial.md) |
| 전환 계획서 생성 스킬 | [reference/generate-plan/](../reference/generate-plan/) |
