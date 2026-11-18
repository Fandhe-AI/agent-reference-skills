---
source: https://docs.cloud.google.com/web-risk/docs/lists
---

# Web Risk Lists

Web Risk lists (also called threat lists) are Google's constantly updated lists of unsafe web resources. Each list is identified by a `threatType`. The page applies to `uris.search` (Lookup API), `hashes.search` and `threatLists:computeDiff` (Update API).

## Signature / Usage

### Check a URL against a list

Replace `API_KEY` with your own key.

```bash
curl -X GET \
     "https://webrisk.googleapis.com/v1/uris:search?threatTypes=MALWARE&uri=http%3A%2F%2Ftestsafebrowsing.appspot.com%2Fs%2Fmalware.html&key=API_KEY"
```

## Options / Props

### List contents

| Item | Detail |
|---|---|
| Entry format | Variable-length SHA256 hashes between 4 and 32 bytes, based on the suffix/prefix expressions of URLs of unsafe web resources. |
| URLs stored | No; the URLs themselves are not stored in the lists. |
| Lookup API | The client sends the actual URL; the server converts it to a hash before checking. |
| Update API | The client converts the URL to a hash and sends the hash prefix. |

### `threatType` values (Discovery document, `webrisk.v1`)

| Value |
|---|
| `MALWARE` |
| `SOCIAL_ENGINEERING` |
| `UNWANTED_SOFTWARE` |
| `SOCIAL_ENGINEERING_EXTENDED_COVERAGE` |

## Notes

- The source page links to the `threatType` reference instead of listing the values; the table above comes from the `webrisk` v1 Discovery document (which also has `THREAT_TYPE_UNSPECIFIED`).
- Snippet taken from https://docs.cloud.google.com/web-risk/docs/lookup-api
- The `API_KEY` in the query string lands in shell history and request logs; restrict the key and keep it out of shared terminals and CI logs.
- Source: https://docs.cloud.google.com/web-risk/docs/lists (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [urls-hashing.md](./urls-hashing.md)
- [lookup-api.md](./lookup-api.md)
- [update-api.md](./update-api.md)
- [extended-coverage.md](./extended-coverage.md)
