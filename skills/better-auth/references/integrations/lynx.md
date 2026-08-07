# Lynx Integration

Integrates Better Auth with Lynx, a cross-platform rendering framework targeting Android, iOS, and Web with native performance.

## Signature / Usage

```bash
npm install better-auth @lynx-js/react
```

```typescript
import { createAuthClient } from "better-auth/lynx"

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000"
})
```

## Notes

- Client supports standard operations: email/password sign-in, sign-up, sign-out
- `useSession` hook exposes loading state, error, and session data, integrated with Lynx's component system
- Built on nanostores; `useStore` provides direct store access with optional selective key watching to limit re-renders
- All Better Auth plugins (e.g. magic links) work without modification

## Related

- [expo](./expo.md)
- [electron](./electron.md)
