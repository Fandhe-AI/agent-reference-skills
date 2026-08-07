# SolidStart Integration

Integrates Better Auth with SolidStart via a dedicated handler adapter.

## Signature / Usage

```typescript
// routes/api/auth/[...auth].ts
import { auth } from "~/lib/auth";
import { toSolidStartHandler } from "better-auth/solid-start";

export const { GET, POST } = toSolidStartHandler(auth);
```

## Notes

- Requires a Better Auth instance configured beforehand (see installation)
- The exported `GET` / `POST` handlers process all authentication requests routed through Better Auth's SolidStart adapter

## Related

- [svelte-kit](./svelte-kit.md)
- [astro](./astro.md)
