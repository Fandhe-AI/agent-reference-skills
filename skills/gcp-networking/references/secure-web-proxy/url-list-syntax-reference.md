---
source: https://docs.cloud.google.com/secure-web-proxy/docs/url-list-syntax-reference
---

# UrlList syntax reference

A `UrlList` holds many match entries reusable across multiple rules. It matches domains in full or by suffix, and URLs with a full path without parameters or a prefix path.

## Signature / Usage

The source page has no code block. Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/url-lists/import (gcloud 593.0.0 help).

```bash
gcloud network-security url-lists import my-url-list \
    --source=my-url-list.yaml --location=global
```

In a rule, a list is referenced with `inUrlList(host(), 'projects/1234/locations/us-east1/urlLists/allowed-repos')` (see [cel-matcher-language-reference.md](./cel-matcher-language-reference.md)).

## Options / Props

### How entries are interpreted

| Entry form | Interpretation |
|------------|----------------|
| Contains `.` and `/` | Must be a well-formed URL; subdomain and path wildcards allowed; the token left of the first `/` is the top-level domain (such as `.com` in `google.com/news`) |
| Contains `.` and no `/` | Interpreted as a domain; subdomain wildcard allowed; the rightmost token is the top-level domain (such as `.xyz` in `abc.xyz`) |
| Anything else | Invalid |

### Wildcards

| Rule | Behavior |
|------|----------|
| `*` | Supported as a prefix to match partial subdomains or partial paths |
| Partial domains | Only complete subdomain tokens are matched |
| No path separator given | Any path matches; `example.com` matches `example.com/*` |
| Matched against values containing `/` (such as `request.url()`) | Entries interpreted as above |
| Matched against values without `/` (such as `host()`) | Only the domain portion of the pattern is matched |

### Pattern matching examples

| Pattern | Matches | Does not match |
|---------|---------|----------------|
| `*example.com` | example.com/ server.example.com/ sample.server.example.com/ example.com/path example.com/path?q=query example.com/path/subpath sample.server.example.com/path/ | myexample.com/ example.com.bad.com/ us13.altostrat.com/go/example.com/path www.google.com/search?q=example.com |
| `*.example.com` | server.example.com/ sample.server.example.com/ sample.server.example.com/path/ | myexample.com/ example.com.bad.com/ us13.altostrat.com/go/example.com/path www.google.com/search?q=example.com example.com/ example.com/path example.com/path/subpath |
| `example.com` | example.com/ example.com/path example.com/path/subpath | myexample.com/ example.com.bad.com/ us13.altostrat.com/go/example.com/path www.google.com/search?q=example.com server.example.com/ sample.server.example.com/ sample.server.example.com/path/ |
| `*server.example.com` | server.example.com/ sample.server.example.com/path sample.server.example.com/path/ | myexample.com/ example.com.bad.com/ us13.altostrat.com/go/example.com/path www.google.com/search?q=example.com example.com/ example.com/path example.com/path/subpath |
| `*example.com/` | example.com/ server.example.com/ sample.server.example.com/ | myexample.com/ example.com.bad.com/ us13.altostrat.com/go/example.com/path www.google.com/search?q=example.com example.com/path/ example.com/path/subpath sample.server.example.com/path/ |
| `*example.com/path*` | example.com/path example.com/path/subpath sample.server.example.com/path/ | myexample.com/ example.com.bad.com/ us13.altostrat.com/go/example.com/path www.google.com/search?q=example.com example.com/ server.example.com/ sample.server.com/ |
| `*example.com/path/*` | example.com/path/subpath sample.server.example.com/path/ | myexample.com/ example.com.bad.com/ us13.altostrat.com/go/example.com/path www.google.com/search?q=example.com example.com/ server.example.com/ sample.server.example.com/ example.com/path |
| `*example.com/path/` | sample.server.example.com/path/ | myexample.com/ example.com.bad.com/ us13.altostrat.com/go/example.com/path www.google.com/search?q=example.com example.com/ sample.example.com/ sample.server.example.com/ example.com/path example.com/path/subpath |
| `example.com/` | example.com/ | myexample.com/ example.com.bad.com/ us13.altostrat.com/go/example.com/path www.google.com/search?q=example.com server.example.com/ sample.server.example.com/ example.com/path example.com/path/subpath sample.server.example.com/path/ |

## Notes

- URL lists are usable in gateway security policy rules; authorization policies don't support URL lists (see [policies-and-rules-overview.md](./policies-and-rules-overview.md)). Limits (10 URL lists per project per region, 2,500 entries per list) are in [quotas.md](./quotas.md).
- Source: https://docs.cloud.google.com/secure-web-proxy/docs/url-list-syntax-reference (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/url-lists/import (gcloud 593.0.0 help).

## Related

- [cel-matcher-language-reference.md](./cel-matcher-language-reference.md)
- [configure-rules.md](./configure-rules.md)
- [quotas.md](./quotas.md)
