---
source: https://docs.cloud.google.com/security-command-center/docs/concepts-web-security-scanner-overview
---

# Overview of Web Security Scanner

Web Security Scanner identifies security vulnerabilities and misconfigurations in public App Engine, Google Kubernetes Engine (GKE), and Compute Engine web applications. It crawls the application from your starting URLs and tries to exercise as many user inputs and event handlers as possible. It supports only public URLs and IPs that are not behind a firewall, and it errs on the side of under-reporting (low confidence alerts are not shown). It does not replace a manual security review and does not guarantee the application is free of flaws. Availability: managed scans on Premium (and Enterprise, deprecated) tiers; custom scans on Standard-legacy, Premium, and Enterprise (deprecated) tiers.

## Signature / Usage

### Excluding URLs (target scoping)

Excluded URL patterns keep scans away from sensitive locations. A custom scan's excluded URLs follow this syntax:

```text
<exclude-pattern> := <scheme>://<host><path><query><fragment>
<scheme> := '*' | 'http' | 'https'
<host> := '*' | '*.' <any char except '/' and '*'>+
<path> := '/' <any chars except '?' or '#'>
<query> := '?' <any chars except '#'>
<fragment> := '#' <any chars>
```

## Options / Props

### Scan types

| Type | Tier | Behavior |
|------|------|----------|
| Managed scans | Premium, Enterprise (Deprecated) | Configured and managed by Security Command Center; run automatically once each week against public web endpoints. No authentication, GET-only requests (no forms submitted). Run separately from custom scans. Only default ports (80 for HTTP, 443 for HTTPS); use a custom scan for non-default ports. |
| Custom scans | Standard-legacy, Premium, Enterprise (Deprecated) | Defined at the project level; granular findings such as outdated libraries, XSS, mixed content. |

### Finding types

| Finding / API category | Tier | Type | OWASP 2017 | OWASP 2021 | Summary |
|------------------------|------|------|------------|------------|---------|
| `ACCESSIBLE_GIT_REPOSITORY` | Premium or Standard | Vulnerability | A5 | A01 | Git repository exposed publicly |
| `ACCESSIBLE_SVN_REPOSITORY` | Premium or Standard | Vulnerability | A5 | A01 | SVN repository exposed publicly |
| `ACCESSIBLE_ENV_FILE` | Premium or Standard | Vulnerability | A5 | A01 | ENV file exposed publicly |
| `CACHEABLE_PASSWORD_INPUT` | Premium | Vulnerability | A3 | A04 | Passwords can be cached in the regular browser cache |
| `CLEAR_TEXT_PASSWORD` | Premium or Standard | Vulnerability | A3 | A02 | Passwords transmitted in clear text |
| `INSECURE_ALLOW_ORIGIN_ENDS_WITH_VALIDATION` | Premium | Vulnerability | A5 | A01 | Only a suffix of `Origin` is validated before reflecting it in `Access-Control-Allow-Origin` |
| `INSECURE_ALLOW_ORIGIN_STARTS_WITH_VALIDATION` | Premium | Vulnerability | A5 | A01 | Only a prefix of `Origin` is validated before reflecting it |
| `INVALID_CONTENT_TYPE` | Premium or Standard | Vulnerability | A6 | A05 | Resource loaded does not match the Content-Type header |
| `INVALID_HEADER` | Premium or Standard | Vulnerability | A6 | A05 | Security header has a syntax error and is ignored |
| `MISMATCHING_SECURITY_HEADER_VALUES` | Premium or Standard | Vulnerability | A6 | A05 | Security header duplicated with mismatching values |
| `MISSPELLED_SECURITY_HEADER_NAME` | Premium or Standard | Vulnerability | A6 | A05 | Security header misspelled and ignored |
| `MIXED_CONTENT` | Premium or Standard | Vulnerability | A6 | A05 | HTTP resources served on an HTTPS page |
| `OUTDATED_LIBRARY` | Premium or Standard | Vulnerability | A9 | A06 | Library with known vulnerabilities detected |
| `SERVER_SIDE_REQUEST_FORGERY` | Premium or Standard | Vulnerability | Not applicable | A10 | SSRF vulnerability detected |
| `SESSION_ID_LEAK` | Premium | Vulnerability | A2 | A07 | Session identifier included in the `Referer` header of cross-domain requests |
| `SQL_INJECTION` | Premium | Vulnerability | A1 | A03 | Potential SQL injection |
| `STRUTS_INSECURE_DESERIALIZATION` | Premium | Vulnerability | A8 | A08 | Vulnerable Apache Struts version |
| `XSS` | Premium or Standard | Vulnerability | A7 | A03 | Field vulnerable to cross-site scripting |
| `XSS_ANGULAR_CALLBACK` | Premium or Standard | Vulnerability | A7 | A03 | User string not escaped and interpolated by AngularJS |
| `XSS_ERROR` | Premium or Standard | Vulnerability | A7 | A03 | Potential XSS due to JavaScript breakage |
| `XXE_REFLECTED_FILE_LEAKAGE` | Premium | Vulnerability | A4 | A05 | XML External Entity vulnerability that can leak a host file |
| `PROTOTYPE_POLLUTION` | Premium or Standard | Vulnerability | A1 | A03 | `Object.prototype` properties assignable with attacker-controlled values |
| `HSTS_MISCONFIGURATION` | Premium | Misconfiguration | Not applicable | Not applicable | Misconfigured HTTP Strict Transport Security header |
| `CSP_MISSING` | Premium | Misconfiguration | Not applicable | Not applicable | Content Security Policy header missing |
| `CSP_MISCONFIGURATION` | Premium | Misconfiguration | Not applicable | Not applicable | Content Security Policy header misconfigured |
| `COOP_MISSING` | Premium | Misconfiguration | Not applicable | Not applicable | Cross-Origin-Opener-Policy header missing |
| `CLICKJACKING_PROTECTION_MISSING` | Premium | Misconfiguration | Not applicable | Not applicable | Neither `X-Frame-Options` nor CSP clickjacking protection present |

### Usage caveats and limits

| Item | Value |
|------|-------|
| Scans per project | Limit of 15. Scans run concurrently; add multiple starting URLs per scan or use other projects. |
| IP version | IPv4 only; IPv6 sites are not scanned |
| Scan queueing | Queued, may start hours later; large apps can take hours or days |
| Maximum scan duration | A scan not completed within 20 days is stopped; crawl results and findings found so far are shown |
| OWASP coverage | A09:2021 Security Logging and Monitoring Failures (A10:2017 Insufficient Logging & Monitoring) is not supported |
| Attack exposure | Attack path simulations do not support these findings (no attack exposure scores or attack paths) |

## Notes

- With organization-level activation of Security Command Center, managed scans give central basic web vulnerability detection for all projects without involving project teams. Managed scan findings appear on the **Vulnerabilities** page once the service is enabled.
- Finding types: categories are detected by both custom and managed scans. In the Tier column, "Premium or Standard" = Security Command Center Premium or Standard tier; "Premium" = Premium tier only. Each finding has a remediation entry on the remediation page in this category.
- Misconfiguration findings can be fixed by changing configuration and are distinct from vulnerabilities (actively exploitable weaknesses); both appear on the Security Command Center **Findings** page.
- Web Security Scanner can adversely affect the reliability of some applications and might not be suitable for production. It attempts to activate every control and input it finds, including state-changing actions allowed for the test account (for example posting test comments or generating many test emails).
- Best practices from the source: run scans in a test environment (separate project with the app and data), use a test account without access to sensitive data, block UI elements with the CSS class `inq-no-click` (event handlers on the element are not activated, however attached), back up data before scanning, and use excluded URLs. Audit features that affect data, users, or systems beyond the scan scope first.
- Target restrictions: scans are limited to the App Engine instance of the scan's project; other projects or outside domains produce an error. Compute Engine and GKE scans are limited to domains mapping to static external IP addresses reserved for (and belonging to) the same project. App Engine cannot map static IPs directly; use Cloud Load Balancing with serverless NEGs to reserve one. Directing traffic to out-of-scope URLs violates the acceptable use policy.
- The scanner automatically attempts to avoid logout URLs and similar locations; use excluded URLs to be sure.
- Validation: configurations (Security Command Center settings, credentials, maximum scan speed range) are validated at creation and before each scan; errors must be resolved before a scan is created or updated. A domain that no longer points to a project-owned IP is not scanned and an error is reported.
- IAM roles for Security Command Center can be granted at organization, folder, or project level; what you can view or change depends on the level granted (see the Security Command Center access control page).
- The Security Command Center Enterprise service tier shuts down on May 21, 2027; Enterprise organizations move to Premium on or after that date.
- The OWASP compliance mapping is for reference only, is not reviewed by the OWASP Foundation, and is not a basis for audits or certification. Google may use aggregated, anonymized data to improve the scanner and does not share information about specific scanned sites.
- Snippet taken from https://docs.cloud.google.com/security-command-center/docs/how-to-web-security-scanner-custom-scans (excluded URL pattern syntax).
- Source: https://docs.cloud.google.com/security-command-center/docs/concepts-web-security-scanner-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [how-to-use-web-security-scanner.md](./how-to-use-web-security-scanner.md)
- [how-to-web-security-scanner-custom-scans.md](./how-to-web-security-scanner-custom-scans.md)
- [how-to-remediate-web-security-scanner-findings.md](./how-to-remediate-web-security-scanner-findings.md)
