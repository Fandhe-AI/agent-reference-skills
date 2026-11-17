---
source: https://docs.cloud.google.com/secure-web-proxy/docs/cel-matcher-language-reference
---

# CEL matcher language reference

Secure Web Proxy uses a subset of Common Expression Language (CEL), an open source non-Turing complete language, to make boolean decisions from attribute data. An expression is one or more statements joined by `&&`, `||` or `!`. `SessionMatcher` uses session attributes (source IP, hosts, IP range); `ApplicationMatcher` uses application attributes (request headers, method, path).

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/secure-web-proxy/docs/configure-rules (the page has no code block): a rule using both matchers.

```yaml
name: projects/PROJECT_ID/locations/REGION/gatewaySecurityPolicies/policy1/rules/RULE_NAME
description: Allow wikipedia.org
enabled: true
priority: 1
basicProfile: ALLOW
sessionMatcher: host() == 'www.wikipedia.org'
applicationMatcher: request.path.contains('index.html')
tlsInspectionEnabled: true
```

The source's logical-operator example: `request.method == 'GET' && host().matches('.*\.example.com')` requires both statements to be `True`.

## Options / Props

### Attributes available to `SessionMatcher` and `ApplicationMatcher`

| Attribute | Type | Description |
|-----------|------|-------------|
| `source.ip` | string | IP address of the client that sent the request |
| `source.port` | integer | Client port that sent the request |
| `destination.port` | integer | Upstream port to which the instance sends the traffic |
| `host()` | string | Host value used for DNS resolution and upstream connections, without the port. Raw HTTP requests: Host header. Proxy tunnel HTTP CONNECT requests: CONNECT target |
| `source.matchTag(SECURE_TAG)` | boolean | `True` if the source is associated with the tag; argument is the permanent ID, e.g. `source.matchTag('tagValues/123456')` |
| `source.matchServiceAccount(SERVICE_ACCOUNT)` | boolean | `True` if the source is associated with the service account, e.g. `source.matchServiceAccount('x@my-project.iam.gserviceaccount.com')` |
| `inUrlList(HOST_OR_URL, NAMED_LIST)` | boolean | `True` if present in the named list, e.g. `inUrlList(host(), 'projects/1234/locations/us-east1/urlLists/allowed-repos')` or `inUrlList(request.url(), 'projects/1234/locations/us-east1/urlLists/allowed-repos')`. Against values without `/` (such as `host()`), only the domain portion of the pattern is matched |
| `inIpRange(IP_ADDRESS, IP_RANGE)` | boolean | `True` if the address is within the range, e.g. `inIpRange(source.ip, '1.2.3.0/24')`; IPv6 subnet masks can't be larger than /64 |

### Attributes available only to `ApplicationMatcher`

| Attribute | Type | Description |
|-----------|------|-------------|
| `request.headers` | map | String-to-string map of request headers; multiple values are a comma-separated string; all keys are lowercase |
| `request.method` | string | Request method, such as GET or POST |
| `request.host` | string | Equivalent to `request.headers['host']`; `host()` is recommended in most cases |
| `request.path` | string | Requested URL path |
| `request.query` | string | URL query as `name1=value&name2=value2`, as in the first line of the request; no decoding |
| `request.scheme` | string | URL scheme such as HTTP or HTTPS; always lowercase |
| `request.url()` | string | Convenience for `host() + request.path`; excludes the port and uses a host value that might differ from the host header |
| `request.useragent()` | string | Equivalent to `request.headers['user-agent']` |

### Logical operators

| Expression | Description |
|------------|-------------|
| `x == "foo"` | `True` if `x` equals the constant string literal |
| `x == R"fo'o"` | `True` if `x` equals the raw string literal (escape sequences not interpreted) |
| `x == y` | `True` if `x` equals `y` |
| `x != y` | `True` if `x` is not equal to `y` |
| `x && y` | `True` if both are `True` |
| `x \|\| y` | `True` if `x`, `y`, or both are `True` |
| `!x` | `True` if boolean `x` is `False` |
| `m['k']` | Value at key `k` in string-to-string map `m`; if absent, returns an error that causes the rule under evaluation to not match |

### String manipulation operators

| Expression | Description |
|------------|-------------|
| `x.contains(y)` | `True` if `x` contains substring `y` |
| `x.startsWith(y)` | `True` if `x` begins with `y` |
| `x.endsWith(y)` | `True` if `x` ends with `y` |
| `x.matches(y)` | `True` if `x` matches the RE2 pattern `y`, compiled with the RE2::Latin1 option that disables Unicode features |
| `x.lower()` | Lowercase value of `x` |
| `x.upper()` | Uppercase value of `x` |
| `x + y` | Concatenated string `xy` |
| `int(x)` | Converts string `x` to `int` for comparisons with `>` and `<=`; integer values only |

## Notes

- Regular expression limits (5 CEL regular expression matchers per policy, 100 characters per expression) are in [quotas.md](./quotas.md).
- Source inconsistency: this page lists `source.port` and `destination.port` as `integer`, but the configure rules page (https://docs.cloud.google.com/secure-web-proxy/docs/configure-rules, retrieved 2026-11-17) lists both as `string`; the examples compare them with integer literals.
- Source inconsistency: the `inIpRange` description covers IPv6 subnet masks ("can't be larger than /64"), while the Secure Web Proxy overview (https://docs.cloud.google.com/secure-web-proxy/docs/overview, retrieved 2026-11-17) says it "supports only IPv4; IPv6 isn't supported".
- Source: https://docs.cloud.google.com/secure-web-proxy/docs/cel-matcher-language-reference (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/secure-web-proxy/docs/configure-rules.

## Related

- [configure-rules.md](./configure-rules.md)
- [url-list-syntax-reference.md](./url-list-syntax-reference.md)
- [policies-and-rules-overview.md](./policies-and-rules-overview.md)
