# AGENTS.md (boxflow)

## 문서 우선순위 (Single Source of Truth)

- WHAT/SCOPE: docs/spec-baseline-v0.3.2.md
- WHY/HOW: docs/project-mvp1.md
- DONE CHECK: docs/acceptance-criteria.md

충돌이 발생하면 아래 우선순위를 따릅니다.

1. spec-baseline > 2) acceptance-criteria > 3) project-mvp1

## 시작 규칙 (매 작업 시작 시 반드시 수행)

작업을 시작하기 전에 반드시 아래를 수행합니다.

1. docs/spec-baseline-v0.3.2.md 와 docs/acceptance-criteria.md 를 먼저 읽고 핵심을 5~10줄로 요약합니다.
2. 이번 작업에서 충족할 acceptance-criteria 체크박스를 항목 ID(A/B/C… 섹션 + 체크 항목)로 나열합니다.
3. 위 2)에서 나열한 항목만을 목표로 구현합니다. 범위가 커지면 작업을 쪼개서 다음 커밋/다음 작업으로 넘깁니다.

## Hard Rules (절대 위반 금지)

- docs/spec-baseline-v0.3.2.md의 Non-goals는 구현하지 않습니다. (Do NOT implement Non-goals)
- 공개 도메인(example.com)에서 PII(전화번호/이메일)를 노출하지 않습니다. PII는 admin에서만 조회합니다.
- 토큰 정책: Booking 생성 시 1회 발급, 상태 변경 시 재발급 없음(링크 불변), TTL 30일
- 정원(capacity)은 CONFIRMED만 카운트하며, 승인(결제확정) 시점에 정원 평가합니다.
- 운영자 세션은 admin.example.com host-only 쿠키로 유지합니다(도메인 공유 금지).

## 작업 마무리 규칙 (매 작업 종료 시 반드시 수행)

1. lint/build(또는 가능한 최소 테스트)를 실행하고 결과를 보고합니다.
2. 변경 사항을 acceptance-criteria 체크박스에 매핑하여, 이번 작업으로 “충족된 항목”을 명시합니다.

## 명령어 (레포에 맞게 수정 가능)

- Install: pnpm install
- Dev: pnpm dev
- Lint: pnpm lint
- Test: pnpm test
- Build: pnpm build
