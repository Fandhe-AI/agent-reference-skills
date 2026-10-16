---
source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-release-candidate
---

# Migrate from the Release Candidate

`@tanstack/react-start` 1.169 is the first stable release of TanStack Start. Upgrading from a release candidate means replacing the removed APIs below and checking the behavior changes that apply to your app.

## Signature / Usage

Replace removed APIs (Vite 8 is required when building with Vite):

| Removed | Use instead |
| --- | --- |
| `@tanstack/nitro-v2-vite-plugin` | `nitro()` from `nitro/vite` (see Nitro hosting in the hosting guide) |
| `useSession` | A session library such as iron-session (see Session Management in the authentication guide) |
| `.inputValidator()` on server functions and middleware | `.validator()`, which takes the same validator |

```ts
// vite.config.ts
import { nitro } from 'nitro/vite'
```

## Notes

- Vite 8 is required when you build with Vite. Upgrade with Vite's migration guide (https://vite.dev/guide/migration).
- `useSession`: the new session library cannot read existing Start session cookies. Use a new cookie name and sign users in again, or test a migration that reads the old cookies first.

### Errors

- A handler returned by `createStartHandler(...)` now rethrows the original error. `createServerEntry` converts errors to responses, and the built-in entry already uses it. In a custom entry, catch inside the `createServerEntry` callback and `return handleStartError(error)` or rethrow (see Error Handling in the server entry point guide).
- Uncaught errors produce a generic JSON body with a status from `400` to `599` (`500` by default), even if a success status was set before the error. Return a `Response` when an endpoint needs a specific error payload.
- A server-function call rejects with whatever was thrown, including a `Response` and falsy values such as `undefined`. Return a `Response` to resolve the call with it (see Raw Responses in the server functions guide).
- Errors thrown by request middleware during a server-function call are sent to the client with their message, and their status is no longer always `500`.

### Responses

- Response helpers override the response you return or throw. `setResponseStatus(401)` followed by returning a `200` response sends `401`.
- `setResponseHeader('set-cookie', cookie)` replaces all outgoing cookies. Use `setCookie` or `appendResponseHeader('set-cookie', cookie)` to add one.
- `setResponseStatus` ignores codes outside `200`-`599` and warns outside production.
- Serialized server-function replies never carry `Location`, `Content-Encoding`, or `Content-Length` from helpers, and ignore a helper `204`, `205`, or `304`. Use `redirect()` to redirect.

### Requests and middleware

- `getRequestHeader(name)` returns `''` for a header that is present but empty, and `undefined` only when it is missing.
- A path with invalid percent-encoding, such as `/%E0%A4%A`, gets `400 Bad Request` before your server entry or middleware runs.
- When no function middleware sends context, `sendContext` is `undefined` instead of `{}`.
