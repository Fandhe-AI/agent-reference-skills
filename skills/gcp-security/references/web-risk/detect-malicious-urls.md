---
source: https://docs.cloud.google.com/web-risk/docs/detect-malicious-urls
---

# Detect malicious URLs with Web Risk

How to start with Web Risk and choose between the Lookup API and the Update API, and between Update API client variants. Prerequisites are a Google Cloud project with billing enabled, authentication set up and the Web Risk API enabled.

## Signature / Usage

### Lowest-complexity check (Lookup API)

Replace `API_KEY` with your own key.

```bash
curl -X GET \
     "https://webrisk.googleapis.com/v1/uris:search?threatTypes=MALWARE&uri=http%3A%2F%2Ftestsafebrowsing.appspot.com%2Fs%2Fmalware.html&key=API_KEY"
```

## Options / Props

### Integration options, in order of complexity

| # | Option | When it fits |
|---|---|---|
| 1 | Lookup API | Valid for most clients unless average latency exceeds requirements. The server handles canonicalization and formatting. |
| 2 | Basic Update API client | Ignore diffs and request a full new database every cycle by leaving `versionToken` empty (kept in memory for queries). Valid unless bandwidth or database synchronization latency exceeds requirements. |
| 3 | Update API client using diffs | Reduces bandwidth at the expense of complexity; a full database update may be on the order of a few megabytes. Sufficient for most enterprise clients. |
| 4 | Update API client using RICE compressed diffs | Most efficient; for the most bandwidth-constrained customers (for example Web Risk queries built into a phone app whose users update the database over phone data). |

## Notes

- Both APIs provide the same information: whether a URL has been identified as malicious. Use the Lookup API to get set up quickly; use the Update API for lower latency URL checking.
- The Update API local database acts as a bloom filter: there may be false positives but there should not be false negatives. Servers are contacted only to update the database and to confirm a match.
- Familiarize yourself with Web Risk's Service Level Agreement and usage limits (quotas) before use.
- Steps to set up authentication and enable the Web Risk API are omitted; see the source page.
- Features designed for widely distributed clients such as web browsers are over-optimizations in many enterprise cases and may be ignored.
- Snippet taken from https://docs.cloud.google.com/web-risk/docs/lookup-api
- The `API_KEY` in the query string lands in shell history and request logs; restrict the key and keep it out of shared terminals and CI logs.
- Source: https://docs.cloud.google.com/web-risk/docs/detect-malicious-urls (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [lookup-api.md](./lookup-api.md)
- [update-api.md](./update-api.md)
- [local-databases.md](./local-databases.md)
- [overview.md](./overview.md)
