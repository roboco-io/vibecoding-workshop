# Spec: 공통 강의 자료 (common/)

## 개요

시니어 개발자 15명 규모 워크숍의 강의 자료. MARP 기반 프레젠테이션으로 구성.

## 구성

### Part 1: State of Vibe Coding — 바이브 코딩의 현 주소

| 섹션 | 핵심 내용 |
|------|----------|
| 바이브 코딩 정의 | AI를 팀원으로 두고 SDLC 전반에서 협업하는 방식 |
| 도입 필요성 | Anthropic 사례 (생산성 50% 향상, PR 머지 67% 증가) |
| AI 능력 성장 | METR 시간 지평선 — 7개월마다 2배 성장 |
| 생산성 방정식 | P = A × D + R (AI가 곱셈으로 작용) |
| 케이스 스터디 | OpenClaw — 1인 + AI로 200K+ 스타, 8주 만에 프로덕션 |
| 우려와 해소 | 완벽함이 아닌 신뢰할 수 있는 프로세스가 핵심 |
| 도입 방법 | OpenClaw 속도 + AI-DLC 프로세스 결합 |

### Part 2: Modern Software Engineering

| 섹션 | 핵심 내용 |
|------|----------|
| 도입 | 소프트웨어 개발자 = 과학자 + 학습자 |
| AI의 진정한 가치 | 능력 증폭 도구, 톱다운 학습 가속화 |
| 프로세스 원칙 | 반복, 피드백, 점진주의, 경험주의 (David Farley) |
| 설계 원칙 | 모듈성, 응집도, 관심사 분리, 정보 은닉, 결합도 관리 |
| Claude Code 심화 | 4단계 파이프라인, 계층적 에이전트, 핵심 기능 |
| OMC 소개 | 32개 전문 에이전트, 자동 모델 라우팅 |
| OpenSpec 소개 | 스펙 기반 개발 프레임워크, Propose → Apply → Archive |

## 파일 구조

| 파일 | 역할 | 발행 여부 |
|------|------|----------|
| `presentation.md` | MARP 슬라이드 소스 | HTML로 빌드 후 발행 |
| `narrative.md` | 스토리라인 산문 | GitHub Pages 발행 |
| `ideation.md` | 발표 기획 메모 | 내부 전용 |
| `images/*.svg` | 다이어그램 | 슬라이드에서 참조 |
| `ModernSoftwareEngineering/` | David Farley 원칙 정리 | 내부 전용 |

## 빌드

```bash
cd common && make all
```

- `npx @marp-team/marp-cli`로 PDF/PPTX/HTML 생성
- `xmllint`로 SVG 유효성 검증
- 빌드 산출물: `presentation.pdf`, `presentation.pptx`, `presentation.html`

## 품질 기준

- SVG 파일은 `xmllint --noout`으로 XML 유효성 통과해야 함
- 슬라이드 폰트: Pretendard, Apple SD Gothic Neo, Noto Sans KR
- 출처 표기: `<span class="source">` 태그 사용
