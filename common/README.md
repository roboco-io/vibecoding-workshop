# 다이렉트 클라우드클럽 — 공통 강의 자료

> 바이브 코딩의 현 주소 + 모던 소프트웨어 엔지니어링

## 개요

| 항목 | 내용 |
|------|------|
| 대상 | 다이렉트 클라우드클럽 시니어 개발자 15명 |
| 형식 | 강의 (각 1시간) |
| 역할 | **Why** (바이브 코딩 도입 이유) → **What** (모던 SW 엔지니어링 원칙 + Claude Code) |

## 핵심 내용

### Part 1: State of Vibe Coding
- 바이브 코딩의 정의: AI를 팀원으로 두고 SDLC 전반에서 협업하는 방식
- 도입 필요성: Anthropic 사례 기반 생산성 향상, AI 능력의 기하급수적 성장
- 케이스 스터디: OpenClaw — 1인 + AI로 200K+ 스타 달성
- 우려 대응: AI 코드 품질, 리뷰 프로세스, 보안 문제
- 도입 방법: OpenClaw 방식 + AI-DLC 프레임워크

### Part 2: Modern Software Engineering
- 소프트웨어 개발자 = 과학자 + 학습자
- AI의 진정한 가치: 능력 증폭, 톱다운 학습 가속화
- David Farley의 모던 소프트웨어 엔지니어링 원칙
  - 프로세스 원칙: 반복, 피드백, 점진주의, 경험주의
  - 설계 원칙: 모듈성, 응집도, 관심사 분리, 정보 은닉, 결합도 관리
- Claude Code 심화: 동작 원리, 핵심 기능(심층 인터뷰, 스킬, 커맨드, 훅, 플러그인)
- oh-my-claudecode(OMC) 소개

## 파일 구조

```
common/
├── ideation.md              # 발표 기획 및 키 아이디어
├── narrative.md             # 스토리라인 산문 문서
├── presentation.md          # MARP 프레젠테이션 소스
├── images/                  # SVG 다이어그램 + PNG 이미지
├── ModernSoftwareEngineering/ # 참고 자료 (David Farley 원칙 정리)
└── Makefile                 # 빌드 스크립트
```

## 빌드

```bash
make all          # SVG 검증 + PDF/PPTX/HTML 빌드
make validate-svg # SVG XML 유효성 검증만 실행
make clean        # 빌드 산출물 삭제
```
