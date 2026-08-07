# no_callback_url

## Signature / Usage

```typescript
import { authClient } from "@/lib/auth-client"

// Correct approach
authClient.signIn.social({
  provider: "github",
  // Callback URL is automatically included in state
})
```

This error occurs when the OAuth flow reaches your `/api/auth/callback` endpoint but the `state` parameter lacks a callback URL. Better Auth stores metadata in the state parameter during OAuth initialization, including the redirect destination after successful authentication. Without this URL, the system cannot safely proceed.

## Notes

- Causes:
  - Incorrect OAuth initiation: the OAuth flow wasn't started through Better Auth's official APIs, so the state payload never included a callback URL
  - Middleware interference: a reverse proxy, CDN, or middleware layer altered the flow, causing your application to read a different or empty state value
- Start the flow through Better Auth: always initiate OAuth using Better Auth's built-in methods so `state` is generated with the needed fields, rather than manually constructing OAuth requests

## Related

- [errors](./errors.md)
- [state_not_found](./error-state-not-found.md)
