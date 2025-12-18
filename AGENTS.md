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

## Hard Rules (절대 위반 금지)

- docs/spec-baseline-v0.3.2.md의 Non-goals는 구현하지 않습니다. (Do NOT implement Non-goals)

### PII (개인 식별 정보) 정책 — Public에서 절대 노출 금지

- PII의 예시(이에 한정되지 않음)
  - 전화번호, 이메일, 주소(상세/우편), 생년월일, 실명+연락처 조합, 결제/거래 관련 식별자, 메신저 ID, 기타 개인을 특정할 수 있는 값
- Public surface(아래 도메인들)에서는 PII를 절대 “직접” 노출하지 않습니다.
  - **example.com**
  - **apply.example.com**
- “노출 금지”의 의미(반드시 지킴)
  - 화면(UI)에 평문으로 표시 금지
  - URL(query/path)에 포함 금지
  - 클라이언트 로깅(console.log), analytics 이벤트 payload, 에러 리포팅(Sentry 등)에 포함 금지
  - API 응답 JSON에 평문 포함 금지(클라이언트로 전달 금지)
- Public에서 PII가 필요한 경우의 허용 범위(가능하면 최소화)
  - 입력 폼에서 사용자가 직접 입력하는 것은 허용(전송/저장 시 보안 고려)
  - Public 화면에서 사용자를 식별/확인시켜야 한다면 **마스킹**으로만 표현
    - 예: 010-\***_-1234, g_**@example.com
- Admin surface(**admin.example.com**)에서만 PII(전화번호/이메일 등) 조회/관리 기능을 제공합니다.

### 토큰 정책 (Booking Access Token)

- **토큰 = Booking 조회/접근 링크 토큰(신청자가 자신의 Booking을 확인/조회하는 용도)**
- Booking 생성 시 1회 발급, 상태 변경 시 재발급 없음(링크 불변), TTL 30일

### 정원(capacity) 정책

- 정원(capacity)은 **CONFIRMED만 카운트**합니다.
- 승인(결제확정) 시점에 정원 평가합니다.
- 동시 승인 등 경쟁 상태에서 **초과 승인 방지를 위해 capacity 평가는 원자적으로 처리**합니다.

### 운영자 세션 정책

- 운영자 세션은 admin.example.com **host-only 쿠키**로 유지합니다(도메인 공유 금지).
- Public surface(example.com, apply.example.com)와 세션/쿠키를 공유하지 않습니다.

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

### Surface 정의 (용어 고정)

- **Public surface**: `example.com`, `apply.example.com`
  - PII 평문 노출 금지(마스킹/미노출만 허용)
- **Admin surface**: `admin.example.com`
  - 운영자 기능 및 PII 조회/관리 가능

### 역할 분리

- 역할 분리만 사용합니다.
  - admin.example.com: 운영자(관리) UI
  - apply.example.com: 신청자 UI
  - example.com: 최소 안내/랜딩(필요 시 확장)

### Host 기반 라우팅

- Next.js 16 환경에서 Host 기반 라우팅이 필요할 경우 `proxy.ts` 사용을 우선합니다.
- 단, **Host 기반 분기가 필요한 로컬/단일 앱 환경에서 proxy.ts를 사용**하고,
  **배포 환경에서는 플랫폼 라우팅/리버스 프록시 등 인프라 라우팅을 우선**합니다.

### 범위 제한

- 멀티테넌트(테넌트별 subdomain 동적 라우팅)는 현재 범위에 포함하지 않습니다.
- 현재는 **단일 박스/단일 테넌트 가정**으로만 진행합니다.

---

## 작업 마무리 규칙 (매 작업 종료 시 반드시 수행)

1. lint/build(또는 가능한 최소 테스트)를 실행하고 결과를 보고합니다.
2. 변경 사항을 acceptance-criteria 체크박스에 매핑하여, 이번 작업으로 “충족된 항목”을 명시합니다.
3. 코드 수정이나 특정 작업이 끝나면, 사용자가 변경분을 스테이징 영역에 전부 추가합니다(사용자 수행).
4. 사용자가 “커밋 메시지 달라”고 요청하면, **커밋 메시지 컨벤션에 맞춰 한국어로 작성**해 제공합니다.
   - 메시지가 길어지면 **제목/본문을 줄바꿈**하여 가독성 있게 제공합니다(제목 1줄 + 빈 줄 + 본문 여러 줄).

---

## 명령어 (레포에 맞게 수정 가능)

- Install: pnpm install
- Dev: pnpm dev
- Lint: pnpm lint
- Test: pnpm test
- Build: pnpm build
