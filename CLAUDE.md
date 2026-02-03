# Hiphadi Frontend

React 프론트엔드. 상세 아키텍처는 [루트 문서](../CLAUDE.md) 및 [프론트엔드 가이드](../.claude/frontend.md) 참조.

## 명령어

```bash
npm start          # 개발 서버 (localhost:3000)
npm run build      # 프로덕션 빌드
npm run lint       # ESLint 검사
```

## 환경 설정

- `npm start` → `.env.development` (localhost:8080)
- `npm run build` → `.env.production` (api.hiphadi.store)

## 핵심 규칙

- 서버 상태는 React Query 사용 (queryKey 일관성 유지)
- API 호출은 `src/api/` 하위에 정의
- 경로 별칭 사용: `@components`, `@pages`, `@api`, `@lib`, `@context`
- 관리자 페이지는 `ProtectedRoute`로 감싸기
- Tailwind lounge 테마 색상 사용 (lounge-gold, lounge-card 등)
