# 워크숍의 흐름
> 이 문서는 바이브 코딩 워크숍의 흐름에 대한 문서입니다. 이 문서에 기반해서 참가자 가이드 및 강사용 슬라이드가 작성됩니다.


- 바이브 코딩에 대한 소개
  - /Users/dohyunjung/Workspace/roboco-io/jiran-ai-transformation/01_State_of_Vibe_Coding/presentation.md 를 참고해서 핵심만 요약
  - 학습 도구로서의 AI의 유용성
    - 나의 의도와 맥락을 이해해서 내 수준에 맞는 답변을 해 주는 개인 튜터
    - 개발자의 능력을 극대화 시켜준다
      - 박사과정에 준하는 지식을 몇 주 또는 몇 일 만에 습득 가능하게 해준다
- 워크숍의 목표와 구조 설명
  - 사전설문 결과 분석 내용(survey/vibe_coding_workshop_analysis.md) 간략히 소개
- 워크숍의 전체 흐름 소개
  - 문서화
    - 생성된 문서로 스킬 생성
  - 테스트 구현
    - lint
    - UT
    - E2E
  - CI/CD 구축
    - pre-commit hook
      - 린트 체크
      - 단위 테스트 실행
    - pre-push hook
      - 통합/E2E 테스트 실행
      - 커버리지 체크

- 환경 설정
  - 클로드 코드 YOLO 모드로 설정 안내
  - OMC 설치 안내 (깃헙 프로젝트에서 설치법 확인)
  - OpenSpec 설치 안내 (깃헙 프로젝트에서 설치법 확인)
  - github cli(gh) 설치 및 로그인 안내 (퍼플렉시티로 설치 및 로그인법 확인)

- 1단계: 문서화
  - 리얼월드 앱 소개
  - 실습에 사용할 구현제 선별
  - 선택한 구현체를 자신의 개인 리포지토리에 포크하여 사용
  - 깃헙 이슈 기능을 활성화해야함을 안내
  - `/init` 명령어로 CLAUDE.md 생성
  - openspec init으로 OpenSpec 초기화
  - openspec 으로 문서화 수행
  - 생성된 문서로 스킬 생성

- 2단계: 테스트 구현
  - UT, E2E 테스트 생성
  - 테스트 커버리지 목표는 80%
  - 린트 설정
  - Makefile로 테스트와 린트 명령어 통합

- 3단계: CI/CD 구축
  - pre-commit hook으로 린트와 UT 실행
  - pre-push hook으로 E2E 테스트와 커버리지 체크 실행

- 마무리
  - 클로드 코드 로그를 분석하여 튜토리얼 문서 작성
  - 기존 프로젝트에 바이브 코딩 도입하기 위한 계획 수립
    - /Users/dohyunjung/Workspace/roboco-io/jiran-ai-transformation/.claude/skills/generate-plan 참고