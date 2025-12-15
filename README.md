# Boxflow

링크 기반 드랍인 신청과 운영자 결제확정(승인) 흐름을 다루는 Next.js(App Router) MVP입니다. DM/메시지로 반복 안내하던 작업을 줄이고, 운영자가 링크로 신청을 받고 결제확정만 하면 명단이 최신화되도록 만드는 것이 목표입니다.

## 무엇을 하나요
- Public(`example.com`): 슬롯 선택 → 이름/전화번호(필수), 이메일(선택)로 신청 생성 → 상태 `PENDING_PAYMENT` 저장 후 조회 토큰 발급(1회, TTL 30일).
- 상태 조회: `/status/[token]`에서 로그인 없이 `PENDING_PAYMENT/CONFIRMED/WAITLISTED/CANCELED` 확인, 만료 시 만료 안내만 노출.
- Admin(`admin.example.com`): 슬롯/정원 관리, 신청 목록 확인, 결제확정 시 정원 평가 후 `CONFIRMED` 또는 `WAITLISTED`, 운영자만 취소 가능.
- 운영자 알림: 신청 생성 시 슬롯/신청자 정보가 이메일로 즉시 전달, 실패는 서버 로그로 확인.
- 개인정보/세션 원칙: 전화번호·이메일 같은 개인정보는 admin에서만 조회하고 public에서는 미노출/마스킹합니다. 운영자 세션은 `admin.example.com` host-only 쿠키로 유지합니다.

## 실행 방법
1) 의존성 설치: `pnpm install`
2) 개발 서버: `pnpm dev` → http://localhost:3000
3) 프로덕션 빌드/실행: `pnpm build` → `pnpm start`
4) 린트: `pnpm lint`

## 참고 문서
- 요구사항/범위: `docs/spec-baseline-v0.3.2.md`
- 완료 기준: `docs/acceptance-criteria.md`
- 추가 맥락: `docs/project-mvp1.md`
