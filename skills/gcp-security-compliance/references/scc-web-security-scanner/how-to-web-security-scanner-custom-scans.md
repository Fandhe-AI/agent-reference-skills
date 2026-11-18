---
source: https://docs.cloud.google.com/security-command-center/docs/how-to-web-security-scanner-custom-scans
---

# Set up custom scans using Web Security Scanner

Schedule and run custom scans of a deployed application with Web Security Scanner in the Google Cloud console (Standard-legacy, Premium, and Enterprise (Deprecated) service tiers). Custom scans are separate from, and more thorough than, the managed scans included with Premium. Only public URLs and IPs not behind a firewall are supported.

## Signature / Usage

### Prerequisites

- A deployed application on a public URL or IP (IPv4 only; IPv6 sites are not scanned).
- Security Command Center enabled; enable Web Security Scanner on the Security Command Center **Settings** page.
- IAM role on the project to scan: Editor or Owner.
- Audit the application first: the scanner populates fields, pushes buttons, and clicks links, and can change data (for example post test comments or generate many test emails).

### Create and run a scan

1. Open the **Web Security Scanner** page, select the project, and click **New scan** or **Create scan**.
2. Fill in the form (see the fields table), then **Save**.
3. Click the scan name, then **Run** (the scan is queued; it may take several hours to start).

For a first scan, enter a starting URL, set **Schedule** to **Weekly**, choose **Next run on**, and keep defaults (**Export to Security Command Center** is checked automatically). Use a test account that cannot reach sensitive data or harmful operations; it must be able to sign in to your app. View results on the scan details page (**Results**, **URLs crawled**, **Details** tabs) and in project logs.

### Scan from static IPs (Preview)

Supported only for public Compute Engine or GKE applications (not App Engine) with no authentication or Google Account authentication. Create a firewall rule allowing the scanner ranges, then tick **Run scans from a pre-defined set of source IPs** and save. Firewall rule values:

- Name: `web-security-scanner` (or similar)
- Direction: ingress (the scanner's requests enter your network)
- Priority: higher priority (lower number) than any ingress rule denying traffic to your application
- Source IP ranges: `34.66.18.0/26` and `34.66.114.64/26`
- Protocols and ports: Allow all, or usually tcp `80` and `443`

### Excluded URL pattern syntax

```text
<exclude-pattern> := <scheme>://<host><path><query><fragment>
<scheme> := '*' | 'http' | 'https'
<host> := '*' | '*.' <any char except '/' and '*'>+
<path> := '/' <any chars except '?' or '#'>
<query> := '?' <any chars except '#'>
<fragment> := '#' <any chars>
```

## Options / Props

### Scan form fields

| Field | Description |
|-------|-------------|
| Starting URLs | One URL (home / landing page) is usually enough. Add more for sites with many pages, unconnected islands of pages, or complex JavaScript navigation (for example mouseover multilevel menus). |
| Excluded URLs | Up to 100 patterns using `*` wildcards (not regular expressions). |
| Authentication > Google Account | Test Gmail or Google Workspace account (for example `test-account@yourdomain.com`). Two-factor authentication is not supported. A test account name that does not look real may be blocked. |
| Authentication > Identity-Aware Proxy (alpha) | Grant `service-project-number@gcp-sa-websecurityscanner.iam.gserviceaccount.com` the **Cloud IAP > IAP Secured Web App User** role on the app resource, then paste the app's OAuth client ID into **OAuth2 Client ID**. Only apps protected by a single OAuth Client ID can be scanned. Recommended for the most consistent authenticated scanning. |
| Authentication > Non-Google account | Login form URL, username, password. Heuristics look for a two-field form (`username`, `password`); the login must produce an authentication cookie. Fails with non-standard fields, complicated forms, no cookie saved, or bot / DDoS countermeasures. |
| Schedule | Daily, weekly, every two weeks, or every four weeks. Scheduled scans also pick up newly released scanners. |
| Run scans from a predefined set of source IPs (Preview) | Restricts scan traffic to a predefined IP set so the scanner can reach apps behind a firewall; may limit scope. |
| Export options | Export scan configurations and results to Security Command Center. |
| Ignore HTTP status errors | If selected, status errors (for example 400 Bad Request) are ignored; otherwise a scan is reported as failed when the percentage of status errors exceeds a threshold. |

### Limits

| Item | Value |
|------|-------|
| Saved scans | Up to 10 different scans before deleting or cleaning up previous saved results |
| Excluded URL patterns | 100 maximum; more than 100 can cause custom scans to fail, and many patterns slow scans |

### Pattern segments and defaults

| Segment | Examples / behavior |
|---------|---------------------|
| `scheme` | `http` or `*` (`*` matches HTTP or HTTPS); default `*://` |
| `host` | `www.google.com`, `*.google.com`, `*`; always required; `*.hostname` matches the host and its subdomains |
| `path` | `/*`, `/foo*`; `*` matches 0 or more characters; default `/*` (if no query / fragment) or `/` (if query or fragment given) |
| `query` | `?*`, `?*foo=bar*`; default `?*` (no fragment) or `?` (fragment given) |
| `fragment` | `#*`, `#access`; default `#*` |

### Valid patterns

| Pattern | Behavior | Sample matching URLs |
|---------|----------|----------------------|
| `http://*/*` | Any URL using HTTP | `http://www.google.com/`, `http://example.org/foo/bar.html` |
| `http://*/foo*` | HTTP, any host, path starts with `/foo` | `http://example.com/foo/bar.html`, `http://www.google.com/foo` |
| `https://*.google.com/foo*bar` | HTTPS on a `google.com` host, path starts with `/foo` and ends with `bar` | `https://www.google.com/foo/baz/bar`, `https://docs.google.com/foobar` |
| `http://example.org/foo/bar.html` | The specified URL | `http://example.org/foo/bar.html` |
| `http://127.0.0.1/*` | HTTP on host `127.0.0.1` | `http://127.0.0.1/`, `http://127.0.0.1/foo/bar.html` |
| `*://mail.google.com/*` | HTTP or HTTPS on `mail.google.com` | `http://mail.google.com/foo/baz/bar`, `https://mail.google.com/foobar` |
| `*://*/foo*?*bar=baz*` | Path starts with `/foo` and has query `bar=baz` | `https://www.google.com/foo/example?bar=baz` |
| `google.com/app#*open*` | `google.com` host, path `/app`, fragment containing `open` | `https://google.com/app#open` |

### Invalid patterns

| Pattern | Reason |
|---------|--------|
| `http://www.google.com` | No path |
| `http://*foo/bar` | `*` in the host must be followed by `.` or `/` |
| `http://foo.*.bar/baz` | `*` in the host must be the first character |
| `http:/bar` | Scheme separator malformed; should be `//` |
| `foo://*` | Invalid scheme |

## Notes

- Static IP scanning is Preview ("Pre-GA Offerings Terms"; available as is, limited support); the scanner IP addresses might change in a future release.
- By default the scanner uses randomly assigned IP addresses on each run.
- A scan is queued and may start hours later; run time depends on site complexity, actionable elements per page, number of links, and JavaScript.
- Scanning executes with the test account's permissions: any state-changing action it can perform is likely to be activated. Use a least-privilege test account in a test environment where possible.
- Clean-up caution from the source: deleting a project deletes everything in it and loses custom project IDs (for example `appspot.com` URLs); this is irreversible, so only delete a disposable test project, or delete selected resources instead. Deleting scans from the scan list removes the selected scans.
- IAP-protected scanning grants an IAP role to the Web Security Scanner service agent only on the scanned application resource.
- The Security Command Center Enterprise service tier shuts down on May 21, 2027; Enterprise organizations move to Premium on or after that date.
- Console click-paths for IAM role assignment, running, viewing, editing, and deleting scans are omitted; see the source page.
- Corrected from the official docs: in the valid-patterns table, the sample URLs for `https://*.google.com/foo*bar` use `http://` and the sample for `google.com/app#*open*` uses host `www.google.com`. A pattern with `https` matches only HTTPS, and a host without `*.` matches only that host (`*.hostname` is the form that also matches subdomains), so the samples use `https://` and host `google.com`.
- Corrected from the official docs: the source says to give the rule a higher priority than all rules that deny egress traffic to your application. The scanner's requests are ingress traffic, and ingress and egress rules are evaluated separately, so the allow rule must be an ingress rule with a higher priority than the ingress rules that deny traffic to the application.
- Source inconsistency: for `google.com/app#*open*` the source says the path "starts with `/app`" and gives `https://www.google.com/app/example#open` as a match, but the pattern's path `/app` has no `*` (the other prefix examples, such as `http://*/foo*`, end the path with `*`), so the row describes the path as `/app` and uses `https://google.com/app#open`. For a prefix match on `/app`, use `google.com/app*#*open*`.
- Source: https://docs.cloud.google.com/security-command-center/docs/how-to-web-security-scanner-custom-scans (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-web-security-scanner-overview.md](./concepts-web-security-scanner-overview.md)
- [how-to-use-web-security-scanner.md](./how-to-use-web-security-scanner.md)
- [how-to-remediate-web-security-scanner-findings.md](./how-to-remediate-web-security-scanner-findings.md)
