# AGENTS.md (boxflow)

## 문서 우선순위 (Single Source of Truth)

- WHAT/SCOPE: docs/spec-baseline-v0.3.2.md
- WHY/HOW: docs/project-mvp1.md
- DONE CHECK: docs/acceptance-criteria.md

충돌이 발생하면 아래 우선순위를 따릅니다.

1. spec-baseline > 2) acceptance-criteria > 3) project-mvp1

---

## 시작 규칙 (매 작업 시작 시 반드시 수행)

작업을 시작하기 전에 반드시 아래를 수행합니다.

1. docs/spec-baseline-v0.3.2.md 와 docs/acceptance-criteria.md 를 먼저 읽고 핵심을 5~10줄로 요약합니다.
2. 이번 작업에서 충족할 acceptance-criteria 체크박스를 항목 ID(A/B/C… 섹션 + 체크 항목)로 나열합니다.
3. 위 2)에서 나열한 항목만을 목표로 구현합니다. 범위가 커지면 작업을 쪼개서 다음 커밋/다음 작업으로 넘깁니다.

---

## 응답/출력 규칙 (토큰 절약: 절대 위반 금지)

- 모든 설명 텍스트는 **한국어 존댓말**로만 작성합니다. (영어 설명 금지)
- **전체 파일 내용 출력 금지**, **diff/patch 출력 금지**:
  - 사용자가 “diff 보여줘 / 파일 내용 보여줘”라고 **명시적으로 요청한 경우에만** 출력합니다.
- 기본 응답은 아래 4가지만 포함합니다.
  1. 무엇을 변경했는지 요약(짧게)
  2. 변경/추가된 파일 목록
  3. 로컬 실행/검증 명령어(pnpm 기준)
  4. acceptance-criteria 매핑(충족된 항목 ID)
- 코드가 꼭 필요하면 **전체 응답 합계 10줄 이하**로만 발췌합니다.
- 불필요한 장황한 설명, 장문의 로그/스택트레이스 재출력은 피합니다.

---

## Hard Rules (절대 위반 금지)

- docs/spec-baseline-v0.3.2.md의 Non-goals는 구현하지 않습니다. (Do NOT implement Non-goals)
- 공개 도메인(example.com)에서 PII(전화번호/이메일)를 노출하지 않습니다. PII는 admin에서만 조회합니다.
- 토큰 정책: Booking 생성 시 1회 발급, 상태 변경 시 재발급 없음(링크 불변), TTL 30일
- 정원(capacity)은 CONFIRMED만 카운트하며, 승인(결제확정) 시점에 정원 평가합니다.
- 운영자 세션은 admin.example.com host-only 쿠키로 유지합니다(도메인 공유 금지).

---

## UI/프론트엔드 규칙 (일관성)

- UI는 **shadcn/ui 컴포넌트로 통일**합니다. (Button/Card/Input/Label/Dialog 등)
- 불필요한 UI 라이브러리 추가 금지(특별한 요구사항이 없으면 shadcn/ui + Tailwind + radix 기반만 사용).
- 새 UI를 만들 때는 우선 `components/ui/*`에 shadcn 컴포넌트를 두고 사용합니다.
- className 결합은 shadcn 표준(`cn`) 유틸을 사용합니다(예: `lib/utils.ts`).
- 페이지 레이아웃은 과도하게 화려하게 꾸미지 말고, 카드/그리드 기반의 깔끔한 구성으로 유지합니다.

---

## 도메인/라우팅 가이드 (역할 분리 기준)

> 본 섹션은 **문서 우선순위에 종속**됩니다. (spec/acceptance와 충돌 시 해당 문서를 따릅니다.)

- 역할 분리만 사용합니다.
  - admin.example.com: 운영자(관리) UI
  - apply.example.com: 신청자 UI
  - example.com: 최소 안내/랜딩(필요 시 확장)
- Next.js 16 환경에서는 Host 기반 라우팅이 필요할 경우 `proxy.ts` 사용을 우선합니다.
- 멀티테넌트(테넌트별 subdomain 동적 라우팅)는 현재 범위에 포함하지 않습니다.

---

## 작업 마무리 규칙 (매 작업 종료 시 반드시 수행)

1. lint/build(또는 가능한 최소 테스트)를 실행하고 결과를 보고합니다.
2. 변경 사항을 acceptance-criteria 체크박스에 매핑하여, 이번 작업으로 “충족된 항목”을 명시합니다.

---

## 명령어 (레포에 맞게 수정 가능)

- Install: pnpm install
- Dev: pnpm dev
- Lint: pnpm lint
- Test: pnpm test
- Build: pnpm build
