# state_mismatch

## 説明

This error occurs when "the state parameter in the request doesn't match the state parameter in the cookie." During OAuth flows, Better Auth generates a unique `state` value, stores it in a cookie, and validates it matches when the OAuth provider redirects back to your callback endpoint.

## 原因

The state mismatch typically happens due to:

- **Cookie issues**: The cookie wasn't set or readable during the callback (common with `.vercel.app` preview domains or cross-domain scenarios)
- **Cookie domain/path mismatch**: Settings differ between your app and callback route
- **Browser privacy settings**: Third-party cookies blocked (Safari/iOS particularly affected)
- **Multi-tab authentication**: Starting the OAuth flow in one tab but completing it in another
- **Domain mismatches**: Preview vs production domain differences (e.g., `preview.myapp.com` vs `myapp.com`)

## 対処法

### 1. Use a Constant Domain

The recommended solution is using a consistent domain for both your app and callback route. "Avoid `.vercel.app` subdomains - browsers treat them as public suffixes, so cookies can't be shared across subdomains."

### 2. Verify Cookie Configuration

- Check custom cookie attributes in your auth config
- Ensure cookies aren't blocked by browser settings or privacy modes
- Confirm the OAuth flow starts and completes in the same browser session

### 3. Skip State Cookie Check (Last Resort)

If you understand the security implications, you can disable the check:

```javascript
auth({
  account: {
    skipStateCookieCheck: true
  }
})
```

**Warning**: This introduces security risks and should only be used if you fully understand the implications.

### 4. Production Debug

Use your browser's DevTools to verify:
- The state cookie is set before redirect
- It still exists when the OAuth provider redirects back (DevTools -> Application -> Cookies)
