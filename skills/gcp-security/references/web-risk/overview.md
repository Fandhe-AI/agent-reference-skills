---
source: https://docs.cloud.google.com/web-risk/docs/overview
---

# Overview of Web Risk

Web Risk lets client applications check URLs against Google's constantly updated lists of unsafe web resources (social engineering sites such as phishing and deceptive sites, and sites that host malware or unwanted software). Clients check URLs with either the Lookup API or the Update API.

## Signature / Usage

### Check a URL with the Lookup API

Replace `API_KEY` with your own key.

```bash
curl -X GET \
     "https://webrisk.googleapis.com/v1/uris:search?threatTypes=MALWARE&uri=http%3A%2F%2Ftestsafebrowsing.appspot.com%2Fs%2Fmalware.html&key=API_KEY"
```

## Options / Props

### Lookup API vs Update API

| Aspect | Lookup API | Update API |
|---|---|---|
| How it works | HTTP GET with the actual URL; the server answers safe or unsafe. | Download hashed lists into a local database and check locally; contact the server only after a local hash prefix match. |
| Privacy | URLs aren't hashed, so the server knows which URLs you look up. | Only hash prefixes are exchanged, so the server never knows the actual URLs. |
| Response time | Every lookup is processed by the server; no guarantee on lookup response time. | Local lookups in most cases, so faster. |
| Implementation | Simple. | You must run a local database, download and periodically update the lists (variable-length SHA256 hashes), canonicalize URLs, create suffix/prefix expressions and compute SHA256 hashes. |

## Notes

- Google cannot guarantee that the lists are comprehensive and error-free: some risky sites may not be identified, and some safe sites may be classified in error.
- The information returned by Web Risk must not be redistributed.
- Use the Lookup API if you aren't too concerned about the privacy of queried URLs and can tolerate network latency; use the Update API if you are concerned about privacy or latency.
- The `API_KEY` placed in the query string lands in shell history and request logs; restrict the key and avoid pasting it into shared terminals or CI logs.
- Snippet taken from https://docs.cloud.google.com/web-risk/docs/lookup-api
- Source: https://docs.cloud.google.com/web-risk/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [lookup-api.md](./lookup-api.md)
- [update-api.md](./update-api.md)
- [detect-malicious-urls.md](./detect-malicious-urls.md)
- [lists.md](./lists.md)
