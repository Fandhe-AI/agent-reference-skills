---
source: https://docs.cloud.google.com/security-command-center/docs/how-to-remediate-web-security-scanner-findings
---

# Remediate Web Security Scanner findings

How to interpret, reproduce, and remediate each Web Security Scanner finding category. For OWASP Top 10 defense strategies see "Mitigate OWASP Top 10:2025 on Google Cloud" on docs.cloud.google.com.

## Signature / Usage

### Strict nonce-only Content-Security-Policy

Recommended for `CSP_MISSING` and `CSP_MISCONFIGURATION` (the scanner checks that a strict, nonce-only header is sent with every HTTP response):

```text
  Content-Security-Policy:
    script-src 'nonce-{random}' 'report-sample';
    object-src 'none';
    base-uri 'none';
    report-uri https://link-to-report-endpoint
```

### HSTS rollout (`HSTS_MISCONFIGURATION`)

1. Start with a small `max-age` and only `includeSubDomains` inclusion (no `preload`). Example: `max-age`=3600; `includeSubDomains`.
2. After a short cool-down period of about a week with no reported issues, raise the max-age. Example: `max-age`=604800; `includeSubDomains` or `max-age`=2592000; `includeSubDomains`.
3. After about three months with no reported issues, add your website and its subdomains to hstspreload.org and specify the preload directive. Preload directive: `max-age=63072000; includeSubDomains; preload`

### Verify an issue

Open the scan's **Results** tab, expand a category, select the finding, and use a test browser. If you disable browser protections for testing, use that browser only for testing your own security issues. CSP enforcement may still prevent the script from running; check the browser console for CSP violations.

- Cross-site scripting: the **Reproduction URL** produces an empty popup.
- Outdated library: the **Vulnerable URL** returns a page with the text "Exploited".
- Mixed content: the **URL of the HTTPS page** shows a mixed content warning; the resource is under **URL of the resource served over HTTP**.
- Flash injection: most modern browsers are protected; findings are unlikely to be exploitable.
- Prototype pollution: follow the **Reproduction URL** and check `({}).__secret_injected_property`, `({}).__defineGetter__.__secret_injected_property`, `({}).hasOwnProperty.__secret_injected_property`.

## Options / Props

### Classes detected

| Kind | Classes |
|------|---------|
| Vulnerability | Cross-site scripting (XSS), server-side request forgery, flash injection, mixed content, outdated or vulnerable libraries, clear text passwords, insecure origin validation, invalid headers, misspelled headers, accessible repositories, SQL injection, XML injection, prototype pollution |
| Misconfiguration | HTTP Strict Transport Security header misconfigured, Content Security Policy header missing / misconfigured, Cross-Origin-Opener-Policy header missing, clickjacking protection missing |

### Remediation by category

| API category | Meaning | Fix |
|--------------|---------|-----|
| `XSS` | Benign test string injected into user-editable fields; custom detectors observe the browser and DOM. If the JavaScript executes, it starts the Chrome debugger. A modified string that breaks with a JS error may indicate an injection that is not exploitable. | Verify manually whether string modifications can be evaded. Escape all output and use a templating system with contextual auto-escaping. |
| `XSS_ANGULAR_CALLBACK` | AngularJS interpolates a user-provided string; attacker can inject code and act on behalf of the victim in the page origin. Reproduction URL opens an alert or injects `XSSDETECTED` (search for it in developer tools). | Validate and escape untrusted data handled by Angular. |
| `XSS_ERROR` | Potential XSS from JavaScript breakage of a modified test string. | Confirm manually whether an XSS exists. |
| `SERVER_SIDE_REQUEST_FORGERY` | Server can be forced to request restricted endpoints (for example the Google Cloud metadata service). | Use an allowlist for domains and IP addresses the app can request. |
| `ROSETTA_FLASH` | Request parameter value reflected at the start of a response (for example JSONP), also known as flash injection. | Do not include user-controllable data at the start of an HTTP response. |
| `MIXED_CONTENT` | JavaScript or CSS requested over HTTP in an HTTPS page; observed passively. | Use relative HTTP links, for example replace `http://` with `//`. |
| `OUTDATED_LIBRARY` | Signature-based version check against known vulnerable libraries; false positives possible if detection fails or the library was manually patched. | Update to a known secure version. |
| `STRUTS_INSECURE_DESERIALIZATION` | Apache Struts 2.3.x earlier than 2.3.32, or 2.5.x earlier than 2.5.10.1, vulnerable to remote command injection (CVE-2017-5638). | Upgrade to the latest Struts. |
| `CACHEABLE_PASSWORD_INPUT` | Password `<input>` without `type="password"`; browser may cache the value. | Set `type` to `password`. |
| `CLEAR_TEXT_PASSWORD` | Password field transmitted in clear text. | Use TLS/SSL certificates, HTTPS on pages with password fields, and HTTPS form `action` URLs. |
| `INSECURE_ALLOW_ORIGIN_ENDS_WITH_VALIDATION` | Only an `Origin` suffix is validated (for example `*google.com` allows `maliciousdomaingoogle.com`). | Validate that the expected root domain is part of `Origin`; for subdomain wildcards prepend the dot, for example `.endsWith(".google.com")`. |
| `INSECURE_ALLOW_ORIGIN_STARTS_WITH_VALIDATION` | Only an `Origin` prefix is validated (for example `google.com.maliciousdomain.com` passes). | Validate that the expected domain fully matches `Origin`: compare the whole `Origin` value, including scheme and host (and port, if any), for example `.equals("https://www.google.com")`. To allow subdomains, parse `Origin` as a URL and check the scheme and hostname instead. |
| `SESSION_ID_LEAK` | Session identifier appears in the `Referer` header of cross-domain requests. | Store session IDs in cookies, not the URL; set `HTTPOnly` and `Secure` attributes. |
| `INVALID_CONTENT_TYPE` | Resource does not match the response Content-Type, or sensitive content lacks `X-Content-Type-Options: nosniff`. | Serve JSON as `application/json`, use appropriate MIME types for other sensitive responses, and send `X-Content-Type-Options: nosniff`. |
| `INVALID_HEADER` | Security header has a syntax error and is ignored by the browser. | Use valid values (see the valid header values table). |
| `MISSPELLED_SECURITY_HEADER_NAME` | Misspelled header name makes it ineffective; reproduce by checking the browser network tab. | Fix the header name. |
| `MISMATCHING_SECURITY_HEADER_VALUES` | Duplicated security headers with conflicting values have undefined behavior. | Keep only one of the mismatching headers. |
| `ACCESSIBLE_GIT_REPOSITORY` / `ACCESSIBLE_SVN_REPOSITORY` | Accessible Git or SVN repository can leak configuration and source code. Reproduce with the reproduction URL in the finding. | Remove unintentional public access. |
| `XXE_REFLECTED_FILE_LEAKAGE` | Attacker-supplied XML with an external entity can leak host files. | Configure XML parsers to disallow external entities. |
| `SQL_INJECTION` | Inputs manipulate the structure of the server's SQL query. | Use parameterized queries. |
| `PROTOTYPE_POLLUTION` | `Object.prototype` properties assignable by attacker input; can lead to XSS or other client-side issues. | Delete the deprecated `__proto__` property (`delete Object.prototype.__proto__`) and make `Object.prototype` immutable (`Object.freeze(Object.prototype)`); if incompatible, copy only expected values from attacker-controllable inputs. |
| `HSTS_MISCONFIGURATION` | HSTS header must be sent with every HTTP response and be correct. | Follow the HSTS rollout above. |
| `CSP_MISSING` / `CSP_MISCONFIGURATION` | Strict nonce-only CSP header must be sent with every response. | Use the CSP header above. |
| `COOP_MISSING` | Cross-Origin-Opener-Policy header must be sent with every response. | Include a valid directive: `unsafe-none`, `same-origin-allow-popups`, or `same-origin`. |
| `CLICKJACKING_PROTECTION_MISSING` | `X-Frame-Options` or CSP header must be sent with every response. | With `X-Frame-Options` use `DENY` or `SAMEORIGIN`; with CSP configure `frame-ancestors`. |

### Valid security header values

| Header | Valid values |
|--------|--------------|
| `Referrer-Policy` | Empty string, `no-referrer`, `no-referrer-when-downgrade`, `same-origin`, `origin`, `strict-origin`, `origin-when-cross-origin`, `strict-origin-when-cross-origin`, `unsafe-url` |
| `X-Frame-Options` | `DENY`, `SAMEORIGIN`, `ALLOW-FROM URL` (Chrome does not support `ALLOW-FROM URL`; multiple `X-Frame-Options` are not allowed) |
| `X-Content-Type-Options` | `nosniff` only |
| `X-XSS-Protection` | Starts with `0` (disable) or `1` (enable); only when enabled, up to two options: `mode=block` (blank page instead of filtering) and `report=URL`; separate with semicolons, no trailing semicolon, for example `1; mode=block; report=URI` |

## Notes

- Impact on logs: scans leave traces, for example requests for unusual strings such as `~sfi9876` and `/sfi9876` used to examine error pages.
- Deactivation: after you remediate, Web Security Scanner does not automatically set the Security Command Center finding state to `INACTIVE`; findings stay `ACTIVE` unless you change the state manually. With the standalone version, a remediated issue is simply absent from subsequent reports (past reports keep the record). Managed scans run weekly.
- IAM roles for Security Command Center can be granted at organization, folder, or project level; what you can view or change depends on the level granted.
- With the preload directive, the HSTS requirement is built into the browser and bad actors can't downgrade the connection; the staged rollout exists to limit the impact on the stability of your website, so add `preload` only at the last step.
- Source inconsistency: the source writes the step 1 example as `max-age`=3600; followed by `includeSubDomains` in a code span with a leading space (the space is dropped here); the value is kept as written. Corrected from the official docs: the source writes the preload directive with a trailing period inside the code span (`preload.`), which is not the `preload` directive that step 1 names and that HSTS preloading requires; the period is removed.
- The remediation text for "Accessible repository" is a single entry in the source covering `ACCESSIBLE_GIT_REPOSITORY` and `ACCESSIBLE_SVN_REPOSITORY`; `ACCESSIBLE_ENV_FILE` is listed in the overview page but has no separate entry here.
- The Security Command Center Enterprise service tier shuts down on May 21, 2027; Enterprise organizations move to Premium on or after that date.
- Corrected from the official docs: the remediation for `INSECURE_ALLOW_ORIGIN_STARTS_WITH_VALIDATION` shows `.equals(".google.com")`. An `Origin` header value includes the scheme (for example `https://www.google.com`), so that comparison never matches a real origin; the example compares a full origin instead.
- Corrected from the official docs: the rendered source reads "delete the deprecated `proto` property"; the deprecated accessor is `Object.prototype.__proto__` (the Markdown rendering appears to have consumed the underscores). The minimal forms `delete Object.prototype.__proto__` and `Object.freeze(Object.prototype)` are standard JavaScript, not from the source.
- Source: https://docs.cloud.google.com/security-command-center/docs/how-to-remediate-web-security-scanner-findings (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-web-security-scanner-overview.md](./concepts-web-security-scanner-overview.md)
- [how-to-use-web-security-scanner.md](./how-to-use-web-security-scanner.md)
- [how-to-web-security-scanner-custom-scans.md](./how-to-web-security-scanner-custom-scans.md)
