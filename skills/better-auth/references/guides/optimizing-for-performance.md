# Optimizing for Performance

Better Auth のパフォーマンス最適化ガイド。

## 概要

Better Auth アプリケーションのパフォーマンスを向上させるための戦略と設定方法を解説します。

## Caching Strategies

### Cookie Cache

Enable session caching to reduce database queries:

```typescript
auth.config({
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
});
```

**Benefit**: "Storing session data in a short-lived, signed cookie" minimizes repeated database hits when sessions remain static.

### Framework-Specific Caching

**Next.js (v15+)**: Implement the `"use cache"` directive in server functions to automatically cache responses.

**React Router v7**: Use HTTP `Cache-Control` headers in loader functions with explicit header exports (example: `max-age=3600` for 1-hour caching).

**SolidStart**: Apply the `query()` function wrapper for automatic data persistence.

**TanStack Query**: Configure `useQuery` hook with `staleTime` parameters (e.g., `15 minutes`) to manage client-side cache duration.

## Background Task Processing

For serverless environments, defer non-critical operations:

```typescript
auth.config({
  advanced: {
    backgroundTasks: { handler: waitUntil },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      ctx.context.runInBackground(logSignUp(userId));
    }),
  },
});
```

**Operations to defer**: cleanup tasks, analytics, rate limit updates, email sending.

## Server-Side Rendering (SSR)

Pre-fetch user sessions on the server and pass to client as fallback data to eliminate client-side session requests.

## Database Performance

### Recommended Indexes

| Table | Fields | Plugin |
|-------|--------|--------|
| users | email | Core |
| accounts | userId | Core |
| sessions | userId, token | Core |
| verifications | identifier | Core |
| invitations | email, organizationId | Organization |
| organization_members | userId, organizationId | Organization |
| organizations | slug | Organization |
| passkey | userId | Passkey |
| twoFactor | secret | 2FA |

Index these fields to optimize query performance across authentication flows.

## Bundle Size Reduction

Use the minimal build variant for custom adapters:

```typescript
import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
```

**Limitation**: Direct database connections unsupported; migrations require external tools.

## 注意点

- **Session caching** reduces database pressure for unchanged sessions
- **Background task deferral** improves response times on serverless platforms
- **SSR pre-fetching** eliminates redundant client requests
- **Database indexing** accelerates query execution across all auth tables
- **Selective imports** minimize JavaScript bundle footprint
