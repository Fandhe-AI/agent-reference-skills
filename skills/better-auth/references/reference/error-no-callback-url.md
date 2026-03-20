# no_callback_url

## 説明

This error occurs when the OAuth flow reaches your `/api/auth/callback` endpoint but the `state` parameter lacks a callback URL. Better Auth stores metadata in the state parameter during OAuth initialization, including the redirect destination after successful authentication. Without this URL, the system cannot safely proceed.

## 原因

1. **Incorrect OAuth Initiation**: The OAuth flow wasn't started through Better Auth's official APIs, so the state payload never included a callback URL.

2. **Middleware Interference**: A reverse proxy, CDN, or middleware layer altered the flow, causing your application to read a different or empty state value.

## 対処法

### Start the flow through Better Auth

Always initiate OAuth using Better Auth's built-in methods so `state` is generated with the needed fields. Ensure you're using Better Auth's provided OAuth initiation functions rather than manually constructing OAuth requests.

## コード例

Use Better Auth's client-side methods to initiate OAuth:

```typescript
import { authClient } from "@/lib/auth-client"

// Correct approach
authClient.signIn.social({
  provider: "github",
  // Callback URL is automatically included in state
})
```

Avoid manually constructing OAuth requests without Better Auth's state management.
