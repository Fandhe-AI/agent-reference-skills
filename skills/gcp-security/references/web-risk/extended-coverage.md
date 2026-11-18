---
source: https://docs.cloud.google.com/web-risk/docs/extended-coverage
---

# Using the Extended Coverage list

The Social Engineering Extended Coverage list improves coverage of malicious URLs (phishing and deceptive sites by up to 90% in some cases) at the cost of a small amount (<10%) of potential false positives. Query it like the Malware, Social Engineering or Unwanted Software lists by including `SOCIAL_ENGINEERING_EXTENDED_COVERAGE` in `threatTypes`. It applies to `uris.search`, `hashes.search` and `threatLists:computeDiff`.

## Signature / Usage

Replace `API_KEY` with your own key.

### uris.search

```bash
curl -X GET \
     "https://webrisk.googleapis.com/v1/uris:search?threatTypes=SOCIAL_ENGINEERING_EXTENDED_COVERAGE&uri=http%3A%2F%2Ftestsafebrowsing.appspot.com%2Fs%2Fsocial_engineering_extended_coverage.html&key=API_KEY"
```

```json
{
  "threat": {
    "threatTypes": [
      "SOCIAL_ENGINEERING_EXTENDED_COVERAGE"
    ],
    "expireTime": "2019-07-17T15:01:23.045123456Z"
  }
}
```

### threatLists.computeDiff

```bash
curl -X GET \
     "https://webrisk.googleapis.com/v1/threatLists:computeDiff?threatType=SOCIAL_ENGINEERING_EXTENDED_COVERAGE&versionToken=Gg4IBBADIgYQgBAiAQEoAQ%3D%3D&constraints.maxDiffEntries=2048&constraints.maxDatabaseEntries=4096&constraints.supportedCompressions=RAW&key=API_KEY"
```

### hashes.search

```bash
curl -X GET \
     "https://webrisk.googleapis.com/v1/hashes:search?threatTypes=SOCIAL_ENGINEERING_EXTENDED_COVERAGE&hashPrefix=WwuJdQ%3D%3D&key=API_KEY"
```

Adapted (not in the official docs): added the missing comma after `"hash"` and removed the trailing comma, the `}` before `]` and the final extra `}` so the response is valid JSON.

```json
{
  "threats": [{
      "threatTypes": ["SOCIAL_ENGINEERING_EXTENDED_COVERAGE"],
      "hash": "WwuJdQxaCSH453-uytERC456gf45rFExcE23F7-hnfD=",
      "expireTime": "2019-07-17T15:01:23.045123456Z"
    }
  ],
  "negativeExpireTime": "2019-07-17T15:01:23.045123456Z"
}
```

## Options / Props

| Item | Detail |
|---|---|
| `threatTypes` / `threatType` value | `SOCIAL_ENGINEERING_EXTENDED_COVERAGE` (in the Discovery enum for `webrisk` v1). |
| Confidence | Slightly lower than the other list types, so a slightly higher chance of false positives. |
| Browser behavior | Matches might not trigger a red warning screen in Chrome, Firefox, Safari or other Safe Browsing compliant browsers. |

## Notes

- The source also shows PowerShell forms and the `computeDiff` response (a `RESET` response with elided hash data, same shape as in the Update API page); they are omitted here.
- Corrected from the official docs: the `hashes.search` response had `"hash": "..."` with no trailing comma, `},` then `}],` and a final extra `}`; only those characters were fixed.
- Keep `API_KEY` out of shared terminals and CI logs.
- Source: https://docs.cloud.google.com/web-risk/docs/extended-coverage (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [lists.md](./lists.md)
- [lookup-api.md](./lookup-api.md)
- [update-api.md](./update-api.md)
