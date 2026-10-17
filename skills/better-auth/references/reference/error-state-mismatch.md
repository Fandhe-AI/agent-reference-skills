# state_mismatch

State verification failed during the OAuth callback. When an OAuth or SSO flow begins, Better Auth generates a unique `state` value and stores it so it can be verified when the provider redirects back (prevents CSRF and replay). Two state storage strategies exist, database (default) and cookie, each with its own failure modes. This page covers every state-related error code.

## Signature / Usage

```javascript
auth({
  account: {
    skipStateCookieCheck: true
  }
})
```

`skipStateCookieCheck` disables the signed state cookie check (last resort). Error codes at a glance:

| Code | Message | Strategy | Meaning |
|------|---------|----------|---------|
| `state_mismatch` | verification not found | Database | The verification record for this state does not exist in the database (or secondary storage) |
| `state_mismatch` | auth state cookie not found | Cookie | The encrypted state cookie was not sent back with the callback request |
| `state_mismatch` | request expired | Both | The state data was found but its `expiresAt` is in the past (10 minutes) |
| `state_invalid` | Failed to decrypt or parse auth state | Cookie | The state cookie exists but cannot be decrypted or parsed (e.g. secret changed) |
| `state_security_mismatch` | State not persisted correctly | Database | The signed state cookie is missing or does not match the state from the callback URL |
| `state_generation_error` | Unable to create verification | Database | The verification record could not be written when starting the flow |

## Notes

- `state_mismatch` - verification not found (database strategy; most commonly reported). Causes: the user took too long on the provider page (record expires after 10 minutes and background cleanup deletes expired records); the callback URL was loaded twice (the record is deleted after a successful lookup); secondary storage (Redis / KV) without database fallback when the key is evicted and `verification.storeInDatabase` is not `true`; multi-instance deployment without shared state (e.g. in-memory SQLite per container); identifier storage settings changed mid-flow (changing `verification.storeIdentifier` or a custom hasher between creation and callback can make the stored record unreachable; the built-in `"hashed"` strategy uses SHA-256 without a secret, so changing `BETTER_AUTH_SECRET` does not change the identifier hash); the provider altered the `state` parameter; missing `verification` table. Fixes: share the database (or Redis) across instances, set `verification.storeInDatabase: true` as a fallback, keep identifier storage settings and custom hashers consistent across instances and active flows, or switch to the `"cookie"` strategy.
- `state_mismatch` - auth state cookie not found (`storeStateStrategy: "cookie"`). Causes: browser blocked or stripped the cookie (third-party cookie restrictions, Safari ITP, incognito); cookie domain/path mismatch (`.vercel.app` preview domains are public suffixes); a proxy or CDN dropped the `Cookie` header; flow started in one tab and completed in another. Fix: use a stable custom domain, verify `SameSite` / `Secure` attributes, check DevTools -> Application -> Cookies.
- `state_mismatch` - request expired: the state payload is valid for 10 minutes (not configurable). Causes: slow user, clock skew. Fix: enable NTP on all servers.
- `state_invalid` - failed to decrypt or parse (cookie strategy): `BETTER_AUTH_SECRET` rotated between start and callback, or the cookie was corrupted in transit. Avoid rotating secrets during active flows; check that proxies do not modify cookie values.
- `state_security_mismatch` - state not persisted correctly (database strategy): after the verification record is found, Better Auth also checks that a signed state cookie was sent back and matches the state in the callback URL (second CSRF layer). Causes: the signed cookie expired (5-minute `maxAge`, shorter than the 10-minute record); third-party cookie or `SameSite` restrictions; cross-origin POST callbacks (common with SAML IdPs); preview vs production domain mismatch; multiple sign-in tabs (each overwrites the state cookie, only the last is valid); **OAuth Proxy with mismatched secrets**: different `BETTER_AUTH_SECRET` values on the production callback server and the development or preview deployment require a shared proxy `secret`, otherwise the proxy's before hook fails to decrypt the state package and the regular callback handler fails. Share the proxy secret only with code and environments trusted to authenticate users in every participating deployment, including production. For SAML flows Better Auth already sets `skipStateCookieCheck` internally.
- Skipping the state cookie check removes a CSRF protection layer; only enable it if you understand the implications and have other mitigations (e.g. guaranteed same-origin callbacks).
- `state_generation_error` is thrown at the start of the flow: run `npx auth migrate`, check the database connection, review `databaseHooks` on `verification`.
- Debugging: the `error` query parameter gives the exact code; check the state cookie (`better-auth.state` or `better-auth.oauth_state`) in DevTools; for database-backed state the verification identifier is `auth-state:${state}` before applying `verification.storeIdentifier`; the built-in `"hashed"` strategy stores the SHA-256 digest of the full prefixed identifier as base64url without padding. Ensure all instances share the same database and secret.
- Likelihood ranking of root causes (very high to very low): cookie blocked or missing; OAuth Proxy secrets differing between production and preview (configure a shared proxy `secret` across trusted participating deployments only); callback replayed; user took too long; multiple tabs; secondary storage eviction; multi-instance without shared database; signed cookie expiry (5 min vs 10 min); secret changed mid-flow; provider altered `state`; missing verification table; clock skew.

## Related

- [state_invalid](./error-state-invalid.md)
- [state_not_found](./error-state-not-found.md)
