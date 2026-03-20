# .server Modules

Files suffixed with `.server` (e.g., `db.server.ts`) are excluded from the client bundle entirely. The build will fail if `.server` code is accidentally imported by client code.

## Signature / Usage

```typescript
// app/utils/db.server.ts
import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});
```

```typescript
// app/routes/dashboard.tsx  (loader runs server-side only)
import { db } from "../utils/db.server";

export async function loader() {
  return { items: await db.item.findMany() };
}
```

## Naming Conventions

| Pattern | Example | Effect |
|---------|---------|--------|
| File suffix | `auth.server.ts` | Single file excluded from client bundle |
| Directory name | `.server/` or `utils.server/` | Entire directory excluded from client bundle |

```
app/
├── .server/            # all files inside are server-only
│   ├── auth.ts
│   ├── db.ts
│   └── email.ts
├── auth.server.ts      # single server-only file
└── root.tsx
```

## Notes

- The build **fails** if a `.server` module is transitively imported by any client code path — this acts as a safety net for secrets.
- Suitable for: database clients, secret environment variables, server SDKs, email/SMS utilities.
- Do **not** mark route modules as `.server` — route files must participate in both server and client module graphs.
- For more fine-grained control, use the [`vite-env-only`](https://github.com/pcattori/vite-env-only) plugin.

## Related

- [.client modules](./client-modules.md)
- [entry.server.tsx](./entry-server-tsx.md)
- [react-router.config.ts](./react-router-config-ts.md)
