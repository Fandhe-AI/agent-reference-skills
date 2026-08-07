# state_mismatch

## Signature / Usage

```javascript
auth({
  account: {
    skipStateCookieCheck: true
  }
})
```

This error occurs when the `state` parameter in the request doesn't match the `state` parameter in the cookie. During OAuth flows, Better Auth generates a unique `state` value, stores it in a cookie, and validates it matches when the OAuth provider redirects back to your callback endpoint.

## Notes

- Causes:
  - Cookie issues: the cookie wasn't set or readable during the callback (common with `.vercel.app` preview domains or cross-domain scenarios)
  - Cookie domain/path mismatch: settings differ between your app and callback route
  - Browser privacy settings: third-party cookies blocked (Safari/iOS particularly affected)
  - Multi-tab authentication: starting the OAuth flow in one tab but completing it in another
  - Domain mismatches: preview vs production domain differences (e.g., `preview.myapp.com` vs `myapp.com`)
- Use a constant domain: the recommended solution is using a consistent domain for both your app and callback route. Avoid `.vercel.app` subdomains — browsers treat them as public suffixes, so cookies can't be shared across subdomains
- Verify cookie configuration: check custom cookie attributes in your auth config, ensure cookies aren't blocked by browser settings or privacy modes, and confirm the OAuth flow starts and completes in the same browser session
- Skip state cookie check (last resort): the snippet above disables the check if you understand the security implications
- **Warning**: disabling the state cookie check introduces security risks and should only be used if you fully understand the implications
- Production debug: use your browser's DevTools to verify the state cookie is set before redirect and still exists when the OAuth provider redirects back (DevTools -> Application -> Cookies)

## Related

- [state_invalid](./error-state-invalid.md)
- [state_not_found](./error-state-not-found.md)
