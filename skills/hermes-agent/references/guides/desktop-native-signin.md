# Desktop Native Sign-In (RFC 8252)

How the Hermes Desktop app signs in to a gated gateway using the system browser and PKCE, with no embedded webview and no session cookies.

## Signature / Usage

Flow (the gateway brokers between the desktop app and Nous Portal):

```
Desktop app                Gateway (/auth/native/*)          Nous Portal (IDP)
   │ 1. open loopback 127.0.0.1:<random port>
   │ 2. system browser ─►  /auth/native/authorize
   │    (PKCE challenge)    (starts the normal PKCE login) ─► /oauth/authorize
   │                        ◄──── code ──── /auth/callback ◄──┘
   │                        3. mint one-time gateway code
   │ ◄─ 302 127.0.0.1/cb?code=… ─┘
   │ 4. POST /auth/native/token (code + PKCE verifier)
   │ ◄─ 5. { access_token, refresh_token, expires_at } ───────┘
   │ 6. store in local token store; use Bearer for REST + WS tickets
```

## Options / Props

Capability detection via public `/api/status` `auth_flows`:

| `auth_flows` value | Meaning |
|--------------------|---------|
| `["cookie", "native_pkce"]` | Native sign-in supported; app uses it |
| `["cookie"]` | Legacy only; embedded webview |
| (field absent) | Older gateway; embedded webview |

Endpoints (public, pre-auth bootstrap):

| Name | Description |
|------|-------------|
| `GET /auth/native/authorize` | Starts the brokered PKCE login |
| `POST /auth/native/token` | Exchanges loopback code + verifier for tokens |
| `POST /auth/native/refresh` | Rotates tokens from the refresh token |

## Notes

- Native sign-in is the default when the gateway supports it; embedded sign-in (captures the gateway session cookie) is the legacy fallback, also used automatically if native fails locally (e.g. loopback listener blocked).
- Tokens are stored as owner-only files in the app's user-data directory, optionally encrypted with the OS keychain (Electron `safeStorage`; Settings -> Gateway toggle). REST calls and WebSocket tickets use `Authorization: Bearer`.
- PKCE (RFC 7636) protects the loopback hop; the one-time gateway code is single-use, short-lived, and useless without the verifier.
- Token lifecycle: short-lived access token; rotating refresh token via `/auth/native/refresh`; terminal expiry (expired / revoked / reuse-detected) clears tokens and prompts sign-in; sign out clears native tokens and any legacy cookie.
- Operators: available automatically on any gated gateway with an interactive session provider; no configuration. OAuth providers (bundled Nous) broker the upstream redirect; password providers (bundled basic-auth) land the browser on the gateway `/login` form (OS password managers can autofill). Token-only credentials (e.g. drain) do not advertise `native_pkce`.

## Related

- [oauth-over-ssh](./oauth-over-ssh.md)
- [run-hermes-with-nous-portal](./run-hermes-with-nous-portal.md)
