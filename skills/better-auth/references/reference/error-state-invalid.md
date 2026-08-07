# state_invalid

## Signature / Usage

```typescript
export const auth = betterAuth({
    account: {
        storeStateStrategy: "database"
    }
})
```

This error occurs when using cookie-based state storage (`account.storeStateStrategy: "cookie"`) and Better Auth fails to decrypt or parse the OAuth state cookie between the start of the OAuth flow and the callback phase.

## Notes

- Causes:
  - `BETTER_AUTH_SECRET` was rotated between OAuth flow initiation and callback
  - Cookie corruption or truncation by a proxy or CDN
  - The cookie value was manually altered or conflicts with another cookie
- Time secret rotation carefully: rotate secrets during low-traffic periods, or keep both old and new secrets valid in parallel during a migration window
- Verify proxy/CDN behavior: confirm proxies and CDNs are not modifying, truncating, or re-encoding the cookie value
- Verify the cookie: use browser DevTools to confirm the `better-auth.oauth_state` cookie doesn't change between the redirect and the callback
- Consider switching storage strategy: move to the `database` strategy (shown above) to avoid relying on cookie decryption

## Related

- [state_mismatch](./error-state-mismatch.md)
- [state_not_found](./error-state-not-found.md)
