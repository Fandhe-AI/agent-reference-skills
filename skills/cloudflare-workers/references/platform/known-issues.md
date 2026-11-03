---
source: https://developers.cloudflare.com/workers/platform/known-issues/
---

# Known issues

Known bugs and gotchas: route specificity, `wrangler dev --remote`, partial (CNAME) DNS setups, and fetching IP addresses.

## Signature / Usage

Workaround for `wrangler dev --remote` dropping requests to other Cloudflare zones:

```js
const request = new Request(url, incomingRequest);
request.headers.delete('cf-workers-preview-token');
return await fetch(request);
```

## Notes

- Route specificity: a trailing `/*` may not act as expected. With Worker A on `example.com/images/*` and Worker B on `example.com/images*`, the URLs `example.com/images`, `example.com/images123`, and `example.com/images/hello` all resolve to B. With `*.example.com/a` (A) and `a.example.com/*` (B), `a.example.com/a` resolves to B.
- `wrangler dev --remote`: all outgoing requests get the `cf-workers-preview-token` header, so HTTP requests to other Cloudflare zones are discarded for security reasons; use the workaround above.
- Fetch in a Partial (CNAME) setup: `fetch()` uses the Cloudflare DNS resolver, so every hostname the Worker must resolve needs a dedicated DNS entry in Cloudflare DNS; otherwise the call fails with status 530 (error 1016). Example: `sub1.example.com` in Cloudflare DNS resolves; `sub2.example.com` only at the authoritative DNS does not, until added.
- Fetch to IP addresses: subrequests can only target URLs, not IP addresses. Add an A or AAAA record to your zone (e.g. `server.example.com` -> `192.0.2.1`) and use `await fetch('http://server.example.com')`; do not use `await fetch('http://192.0.2.1')`.

## Related

- [changelog.md](./changelog.md)
- [limits.md](./limits.md)
- [../web-apis/README.md](../web-apis/README.md)
