---
source: https://docs.cloud.google.com/armor/docs/create-security-policy-rules
---

# Create and view Cloud Armor security policy rules

Each security policy rule has a priority, a match condition, and an action; Cloud Armor performs the action of the highest priority rule that matches a request. A basic match condition lists IP addresses or ranges (gcloud `--src-ip-ranges`); an advanced match condition is an expression with up to five subexpressions (gcloud `--expression`) written in the Cloud Armor custom rules language, a subset of the Common Expression Language (CEL). An expression has an attribute (the data to inspect) and an operation (how to use the data). This page also covers listing rules and preconfigured rules.

## Signature / Usage

### Create rules

Add a rule with priority 1000 that blocks traffic from two IP address ranges:

```bash
gcloud compute security-policies rules create 1000 \
    --security-policy my-policy \
    --description "block traffic from 192.0.2.0/24 and 198.51.100.0/24" \
    --src-ip-ranges "192.0.2.0/24","198.51.100.0/24" \
    --action "deny-403"
```

Block requests from the region `AU` with an expression:

```bash
gcloud compute security-policies rules create 1000 \
    --security-policy my-policy \
    --expression "origin.region_code == 'AU'" \
    --action deny-403 \
    --description "AU block"
```

Use a preconfigured expression set from the OWASP Core Rule Set (CRS) 4.22 to mitigate SQL injection (SQLi):

```bash
gcloud compute security-policies rules create 1000 \
    --security-policy my-policy \
    --expression "evaluatePreconfiguredWaf('sqli-v422-stable')" \
    --action deny-403
```

### View rules

```bash
gcloud compute security-policies rules describe 1000 \
    --security-policy my-policy
```

Output:

```text
action: deny(403)
description: block traffic from 192.0.2.0/24 and 198.51.100.0/24
kind: compute#securityPolicyRule
match:
  srcIpRanges:
  - '192.0.2.0/24'
  - '198.51.100.0/24'
preview: false
priority: 1000
```

List the preconfigured WAF rules (expression sets) and their rule IDs and sensitivities:

```bash
gcloud compute security-policies list-preconfigured-expression-sets
```

### Path traversal and normalization

When you use `startsWith`, `endsWith`, or `contains` on `request.path`, normalize with `lower` and `urlDecode`. This blocks `/admin`, `/Admin`, `/a%64min`, and other variations:

```text
request.path.lower().urlDecode().startsWith('/admin')
```

When you use `matches` on `request.path`, account for the backslash character:

```text
request.path.matches(r'^/\\*admin')
```

Combine with `urlDecode` to handle both URL-encoding and backslash bypasses:

```text
request.path.urlDecode().matches(r'^/\\*admin')
```

### Preconfigured WAF rule with exclusions

Use all expressions of `xss-v422-stable` except member IDs `941100` and `941110`:

```text
evaluatePreconfiguredWaf('xss-v422-stable', {'opt_out_rule_ids': ['owasp-crs-v042200-id941100-xss',
'owasp-crs-v042200-id941110-xss']})
```

## Options / Props

### gcloud `rules create` actions in the source

| `--action` | Meaning (gcloud 593.0.0 help) |
|---|---|
| `allow` | Allows the request |
| `deny-403`, `deny-404`, `deny-502` | Denies the request with HTTP status 403, 404, or 502 |

### Example expressions

| Match | Expression |
|---|---|
| IPv4 range | `inIpRange(origin.ip, '198.51.100.0/24')` |
| IPv6 range | `inIpRange(origin.ip, '2001:db8::/32')` |
| Custom client IP header (needs `userIpRequestHeaders[]`) | `inIpRange(origin.user_ip, '192.0.2.0/24')` |
| IP plus `User-Agent` | `inIpRange(origin.ip, '1.2.3.4/32') && has(request.headers['user-agent']) && request.headers['user-agent'].contains('example')` |
| Cookie value | `has(request.headers['cookie']) && request.headers['cookie'].contains('cookie_name=cookie_value')` |
| Non-empty `referer` | `has(request.headers['referer']) && request.headers['referer'] != ""` |
| Exact host | `request.headers['host'].lower() == 'test.example.com'` |
| Host suffix | `request.headers['host'].lower().endsWith('.example.com')` |
| Domain and subdomain | `request.headers['host'].matches('(?i:(?:sub\\.)?test\\.example\\.com)')` |
| All regions except `AU` (in a deny rule) | `origin.region_code != 'AU'` |
| ASN | `origin.asn == 123` |
| Region and IP range | `origin.region_code == "AU" && inIpRange(origin.ip, '1.2.3.0/24')` |
| Numbered path by regex | `request.path.matches('/path/[0-9]+/target_file.html')` |
| Case-insensitive `User-Agent` | `request.headers['user-agent'].matches('(?i:wordpress)')` |
| Base64-decoded header | `has(request.headers['user-id']) && request.headers['user-id'].base64Decode().contains('myValue')` |
| URL length | `size(request.path) > 10` |
| Zero `content-length` | `int(request.headers["content-length"]) == 0` |
| URL-encoded cookie value | `has(request.headers['cookie']) && request.headers['cookie'].urlDecode().contains('<')` |
| JA4 fingerprint | `origin.tls_ja4_fingerprint == 't13d1516h2_8daaf6152771_b186095e22b6'` |
| Request body | `request.method == 'POST' && request.body.contains('malicious-value')` |
| Missing parameter | `!has(request.params.category)` |
| Any parameter value | `request.params.exists(k, request.params[k].contains('admin'))` |
| Nested JSON field | `has(request.params.preferences) && has(request.params.preferences.newsletter) && request.params.preferences.newsletter == true` |
| Preconfigured WAF on host, excluding a path | `request.headers['host'].lower() == 'example.com' && !request.path.startsWith('/login/api/') && evaluatePreconfiguredWaf('xss-v422-stable')` |
| Managed rules | `evaluateManagedRules('google:sqli:stable')` |
| Threat intelligence with exclusion | `evaluateThreatIntelligence('iplist-known-malicious-ips', ['203.0.113.0/24'])` |
| Address group on user IP | `evaluateAddressGroup('my-own-list-of-bad-ips', origin.user_ip)` |

### Operations

| Operation | Expression | Description |
|---|---|---|
| Equality | `x == y` | `true` if x equals y |
| Equality, string literal | `x == "foo"` | `true` if x equals the constant string |
| Equality, raw string literal | `x == R"fo'o"` | Raw string literal that does not interpret escape sequences |
| Logical NOT | `!x` | Negates a Boolean |
| Inequality | `x != y` | `true` if x is not equal to y |
| Concatenation | `x + y` | Concatenated string |
| Logical AND / OR | `x && y`, `x \|\| y` | Precedence is NOT, AND, OR; use parentheses to override |
| Contains / starts / ends | `x.contains(y)`, `x.startsWith(y)`, `x.endsWith(y)` | Substring tests |
| Regular expression match | `x.matches(y)` | Partial match by an RE2 pattern, compiled with the RE2::Latin1 option (Unicode features disabled) |
| IP address within range | `inIpRange(x, y)` | `true` if IP x is in range y |
| Lowercase / uppercase | `x.lower()`, `x.upper()` | Case conversion |
| Base64 decoded value | `x.base64Decode()` | Replaces `_` and `-` with `/` and `+` first; returns `""` if not valid base64 |
| Key-map value | `m['k']` | Value at key k; error if k is unavailable. Check with `has(m['k'])==true` first |
| Check key availability | `has(m['k'])` | `true` if key k is in map m |
| Convert to integer | `int(x)` | Converts a string to `int`; works only for values that are integers |
| Length | `size(x)` | Length of string x |
| Decode URL | `x.urlDecode()` | `%##` sequences and `+` (to space) decoded; invalid encodings returned as-is |
| Decode URL (Unicode) | `x.urlDecodeUni()` | Like `urlDecode()` plus `%u###` sequences |
| Convert UTF-8 to Unicode | `x.utf8ToUnicode()` | Lowercase Unicode representation of UTF-8 encoded x |
| Map iteration | `m.exists(k, expr)`, `m.exists_one(k, expr)`, `m.all(k, expr)`, `m.filter(k, expr)`, `m.map(k, expr)` | Work only when `request.body` or `request.params` exists in the rule expression |

### Attributes

| Field | Type | Description |
|---|---|---|
| `origin.ip` | string | IP address of the client that initiated the request |
| `origin.user_ip` | string | Originating client IP from the `HTTP-HEADER` set by an upstream proxy. Requires `userIpRequestHeaders[]` in the policy's `advancedOptionsConfig` (for example `True-Client-IP`, `X-Forwarded-For`, `X-Real-IP`); defaults to `origin.ip` if unset, invalid, or the header is absent |
| `origin.tls_ja4_fingerprint` | string | JA4 fingerprint for `HTTPS`, `HTTP/2`, or `HTTP/3`; empty string if unavailable |
| `origin.tls_ja3_fingerprint` | string | JA3 fingerprint for `HTTPS`, `HTTP/2`, or `HTTP/3`; empty string if unavailable |
| `request.headers` | map | String-to-string map of headers; keys are all lowercase; multiple values are one comma-separated string. Use `has()` to check. Map-iteration operators only work with `request.body` or `request.params` in the same expression |
| `request.body` | string | Raw request body of any `Content-Type`, no automatic parsing |
| `request.params` | map | Key-value pairs from the URL or body (URI query, `application/json`, `application/graphql`, `application/x-www-form-urlencoded`) |
| `request.method` | string | HTTP request method |
| `request.path` | string | Requested URL path; normalize the path before matching |
| `request.scheme` | string | `http` or `https`, lowercase |
| `request.query` | string | URL query as in the first request line, no decoding |
| `origin.region_code` | string | Unicode country code for the client IP, such as `US` (ISO 3166-1 alpha-2) |
| `origin.asn` | integer | Autonomous system number for the client IP |

### reCAPTCHA attributes

| Field | Type | Description |
|---|---|---|
| `token.recaptcha_exemption.valid` | `bool` | Valid reCAPTCHA exemption cookie present |
| `token.recaptcha_action.score` | `float` | Action-token score from `0.0` (likely illegitimate) to `1.0` (likely legitimate) |
| `token.recaptcha_action.captcha_status` | `string` | `NONE`, `PASS`, or `FAIL` |
| `token.recaptcha_action.action` | `string` | Action name, up to 100 characters |
| `token.recaptcha_action.valid` | `bool` | Valid action-token present |
| `token.recaptcha_session.score` | `float` | Session-token score from `0.0` to `1.0` |
| `token.recaptcha_session.valid` | `bool` | Valid session-token present |

### WAF, managed rules, and other operators

| Expression | Description |
|---|---|
| `evaluatePreconfiguredWaf(string, MAP<string, dyn>)` | `true` if any signature in the named rule set matches (first argument such as `xss-v422-stable`). Optional map keys: `sensitivity` (integer 0-4; paranoia level; evaluates signatures with sensitivity 1 to x; defaults to 4 when omitted; 0 is valid only with `opt_in_rule_ids`), `opt_out_rule_ids` (list of rule IDs to skip, maximum 128), `opt_in_rule_ids` (list of rule IDs to evaluate from an empty base, maximum 128, requires `sensitivity` 0). `opt_out_rule_ids` and `opt_in_rule_ids` are mutually exclusive |
| `evaluateManagedRules(string, MAP<string, dyn>)` | `true` if any signature in the managed rule category matches (first argument is the fully qualified name, such as `google:xss:stable` or `google:sqli:canary`). Optional keys: `opt_in_rule_ids`, `opt_out_rule_ids` |
| `evaluatePreconfiguredWaf(string, LIST)` | Deprecated form (the source states that `evaluatePreconfiguredExpr()` is deprecated and recommends `evaluatePreconfiguredWaf()`); second argument is a comma-separated string list of IDs to exclude |
| `evaluateThreatIntelligence(string)`, `(string, LIST)`, `(string, string, LIST)` | `true` if the client IP matches an IP range in the Google Threat Intelligence feed (for example `iplist-known-malicious-ips`). Optional string argument selects the IP source: `origin.ip`, `origin.user_ip`, or a header name. Optional list holds IPs / CIDRs excluded from evaluation |
| `evaluateAddressGroup(string, string)`, `(string, string, LIST)`, `evaluateOrganizationAddressGroup(...)` | `true` if the client IP matches the address group. Second argument selects `origin.ip`, `origin.user_ip`, or a header name; optional third argument is an exclusion list |
| `evaluateAdaptiveProtection(string)` | `true` if the request matches the attack signature of the Adaptive Protection alert with the given ID |
| `evaluateAdaptiveProtectionAutoDeploy()` | `true` if the request is from a heavy hitter IP matching an ongoing attack signature detected by Adaptive Protection |

## Notes

- Attributes: Edge security policies support only `origin.asn`, `origin.ip`, `origin.region_code`, `request.headers`, `request.method`, `request.path`, `request.query`, and `request.scheme`.
- reCAPTCHA attributes: A subexpression using these returns `false` if the token or cookie is unavailable, malformed, carries invalid attributes (for example a non-matching reCAPTCHA key), or is expired.
- Rules with lower priority than the highest matching rule are not evaluated, even with the same match conditions. A rule whose expression only matches the client IP still counts as a rule with advanced match conditions for quota purposes.
- Rule priorities are integers from 0 to 2,147,483,646; rules are evaluated from 0 (highest) to 2,147,483,647 (lowest), and the default rule has priority 2,147,483,647. Basic mode in the console accepts 1 to 10 IP address ranges.
- Each expression's effect depends on whether it is in an allow rule or a deny rule. `origin.region_code != 'AU'` in a deny rule blocks every region except `AU`; deploy new rules in preview mode (`--preview`) and check request logs before enforcing.
- Use `==` to match a host exactly; `contains` on host values can cause unintended matches.
- ISO 3166-1 alpha-2 country or region codes are treated independently; a region does not always correspond to a country (for example `US` includes all states, one district, and six outlying areas).
- Preconfigured WAF rule names follow `<attack category>-<OWASP CRS version>-<version field>` (for example `xss-v422-stable`). Version fields are `stable` and `canary`; changes go to `canary` first and are promoted to `stable`. Member IDs (for example `owasp-crs-v042200-id941100-xss` for `id941100`) let you exclude signatures that cause false positives. Rules are based on OWASP Core Rule Set 4.22; the source recommends using the latest CRS rule version whenever possible.
- Managed rules are powered by Thales Imperva and are automatically updated.
- Using `origin.user_ip`, or `evaluateThreatIntelligence` / `evaluateAddressGroup` with `origin.user_ip`, requires `userIpRequestHeaders[]` in `advancedOptionsConfig`.
- Match condition builder (Preview, console only): a visual builder for expressions with `AND` / `OR` grouping and nesting up to five expressions, string transformations, and bidirectional parsing with the match condition editor. It is disabled for expressions with unsupported logic (such as unknown macros); availability of some expressions depends on the Cloud Armor Enterprise tier and the policy type.
- The source also has a generic `rules create` template, more host, cookie, Unicode, JA4-list, body, and parameter examples, and Console steps; they are omitted here. The single-line expressions are shown without a language tag in the source and are tabled as inline code here.
- The full flag list for `gcloud compute security-policies rules` is in the `gcp-compute` skill (https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/rules/create). Updating, atomically updating, and deleting rules are on https://docs.cloud.google.com/armor/docs/manage-security-policy-rules.
- Corrected from the official docs: the excluded-path example used `startswith`, which is not a CEL method; the CEL method listed in the Operations table is `startsWith`.
- Corrected from the official docs: the domain-and-subdomain regular expression used `\.` inside an ordinary CEL string literal, which is not a valid CEL escape sequence; the backslashes are doubled (`\\.`) so the expression matches a literal dot.
- Source: https://docs.cloud.google.com/armor/docs/create-security-policy-rules (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-security-policies.md](./configure-security-policies.md)
- [security-policy-overview.md](./security-policy-overview.md)
- [best-practices.md](./best-practices.md)
