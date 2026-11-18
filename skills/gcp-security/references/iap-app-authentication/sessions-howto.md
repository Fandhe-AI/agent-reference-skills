---
source: https://docs.cloud.google.com/iap/docs/sessions-howto
---

# Managing IAP sessions

How Identity-Aware Proxy (IAP) sessions work, how it responds to expired sessions, and how to make AJAX and WebSocket requests succeed. After a standard login flow the user receives a session cookie that references their Google login session. IAP requires sign-in before access to an IAP-secured app and re-checks IAM authorization on every request during a valid session.

## Signature / Usage

### Refresh an expired session from AJAX code

For AJAX requests IAP returns HTTP `401 Unauthorized`. If you get `302` instead, add the header `X-Requested-With: XMLHttpRequest` to tell IAP the request comes from JavaScript. On `401`, open a window at `target_domain` + `?gcp-iap-mode=DO_SESSION_REFRESH`, a handler that only establishes the IAP session on `target_domain`.

Step 1: handle the `401` and offer a refresh link:

```javascript
if (response.status === 401) {
  statusElm.innerHTML = 'Login stale. <input type="button" value="Refresh" onclick="sessionRefreshClicked();"/>';
}
```

Step 2: install an onclick handler that closes the window after the session is refreshed. Replace `SESSION_CHECK_PATH` with a path of your app that is behind IAP and returns a `2xx` response for an authenticated request (the source uses `/favicon.ico`, which works only if the app serves a favicon).

Adapted (not in the official docs): the source passes `.then(...)` inside the `fetch` options object (a syntax error); the options object is closed first so `.then` chains on `fetch(...)`. Only a successful response (`response.ok`) closes the window; other statuses and network errors retry. The check path is the placeholder `SESSION_CHECK_PATH` instead of the source's `/favicon.ico`.

```javascript
var iapSessionRefreshWindow = null;

function sessionRefreshClicked() {
  if (iapSessionRefreshWindow == null) {
    iapSessionRefreshWindow = window.open("/?gcp-iap-mode=DO_SESSION_REFRESH");
    window.setTimeout(checkSessionRefresh, 500);
  }
  return false;
}

function checkSessionRefresh() {
  if (iapSessionRefreshWindow != null && !iapSessionRefreshWindow.closed) {
    // Attempting to start a new session.
    // XMLHttpRequests is used by the server to identify AJAX requests
    fetch('SESSION_CHECK_PATH', {
          method: "GET",
          credentials: 'include',
          headers: {
              'X-Requested-With': 'XMLHttpRequest'
          }
    })
    .then((response) => {
      // Checking if browser has a session for the requested app
      if (response.status === 401) {
        // No new session detected. Try to get a session again
        window.setTimeout(checkSessionRefresh, 500);
      } else if (response.ok) {
        // Session retrieved.
        iapSessionRefreshWindow.close();
        iapSessionRefreshWindow = null;
      } else {
        // Other errors (403, 429, 5xx): retry later without closing the window
        window.setTimeout(checkSessionRefresh, 2000);
      }
    })
    .catch(() => {
      // Network error: retry later
      window.setTimeout(checkSessionRefresh, 2000);
    });
  } else {
    iapSessionRefreshWindow = null;
  }
}
```

## Options / Props

### Session behavior

| Topic | Behavior |
|---|---|
| Google Account sign-in | Sessions refresh periodically and are tied to the Google login session. Re-login is required only if the user signed out, the account was suspended, or it requires a password reset. IAP detects a Google account state change within a couple of minutes, then invalidates the session. |
| IAM policy changes | IAP re-checks IAM for all requests; updates to the app's IAM access policy might take a few minutes to take effect. |
| Session expiry (Google login) | Expires only when the Google login session expires, irrespective of the JWT `exp` claim in the authorization header. |
| Session expiry (programmatic authentication) | IAP honors the `exp` claim of the JWT in the `Authorization` header. |
| Session expiry (Identity Platform) | Session stays valid for up to one hour after the user logs out. |
| `loginHint` | The `loginHint` in IapSettings must match the domain of the login user; otherwise the login prompt is shown if the IAP cookie is cleared or expired. |
| WebSocket | IAP supports WebSocket only for the initial request (an HTTP `Upgrade` evaluated as a standard `GET`); after authorization it does not monitor the connection or refresh the session. |

### Expired-session responses

| Request type | Response |
|---|---|
| Non-AJAX | Redirect to the login flow (transparent if the user is still signed in) |
| AJAX | HTTP `401`; `302` if the request is not detected as AJAX (add `X-Requested-With: XMLHttpRequest`) |

## Notes

- AJAX cross-origin (CORS) requests need a session established out-of-band on `target_domain`; cookies cannot be shared between `source_domain` and `target_domain`. Send credentials: `withCredentials = true` for `XMLHttpRequest`, or `credentials` set to `include` or `same-origin` for the Fetch API.
- The recommended AJAX pattern does not work when third-party cookies are disabled (Chrome and other browsers are phasing them out); it keeps working if the source and target of the AJAX request are the same site.
- Corrected from the official docs: the original sample placed `.then((response) => { ... })` inside the `fetch` options object (`headers: {...}` followed directly by `.then(`), which does not parse.
- Adapted from the official docs: the source treats every status other than `401` as a refreshed session and closes the login window; the sample closes it only on a successful response and retries on other statuses (for example `403`, `429`, `5xx`) and on network errors.
- Adapted from the official docs: the source checks the session with `fetch('/favicon.ico')`. Because the sample closes the window only on a `2xx` response, an app that does not serve `/favicon.ico` would return `404` after a successful login and the window would never close, so the sample uses a `SESSION_CHECK_PATH` placeholder for an IAP-protected path that returns `2xx`.
- Source: https://docs.cloud.google.com/iap/docs/sessions-howto (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication-howto.md](./authentication-howto.md)
- [signed-headers-howto.md](./signed-headers-howto.md)
- [query-parameters-and-headers-howto.md](./query-parameters-and-headers-howto.md)
