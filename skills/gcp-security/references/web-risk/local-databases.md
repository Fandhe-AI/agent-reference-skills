---
source: https://docs.cloud.google.com/web-risk/docs/local-databases
---

# Local Databases

Clients of the Update API set up a local database, download the Web Risk lists they work with, and regularly update them with `threatLists.computeDiff`. The response returns a full or partial update, followed by a validation check.

## Signature / Usage

### Request an update (`threatLists.computeDiff`)

Replace `API_KEY` with your own key. This request sends a non-empty `versionToken`; leaving `versionToken` empty forces a full update.

```bash
curl -X GET \
     "https://webrisk.googleapis.com/v1/threatLists:computeDiff?threatType=MALWARE&versionToken=Gg4IBBADIgYQgBAiAQEoAQ%3D%3D&constraints.maxDiffEntries=2048&constraints.maxDatabaseEntries=4096&constraints.supportedCompressions=RAW&key=API_KEY"
```

## Options / Props

### Update types

| Type | When | Contents | Client action |
|---|---|---|---|
| Full update (`RESET`) | `versionToken` empty (initial request or deliberately empty) or the server decides a full update is required (for example the client moved from a small to a larger list version, or hasn't downloaded data in a long time). | Additions only. | Clear the local database first, apply, then run the validation check. |
| Partial update (`DIFF`) | `versionToken` supplied. | Additions and removals. | Apply removals before additions, then run the validation check. |

### Additions and removals

| Item | Detail |
|---|---|
| Additions | SHA256 hash prefixes to add. Most are 4 bytes; others can be 4 to 32 bytes, so several sets of additions can be returned (for example one of 4-byte and one of 5-byte prefixes). |
| Compression | With compression support, additions can be Rice-compressed, but only 4-byte prefixes are compressed; longer prefixes are always raw. |
| Removals | Zero-based indices into the lexicographically sorted client database; only one set of removals is returned. |
| Raw vs rice | With compression support, "rice hashes" / "rice indices"; otherwise "raw hashes" / "raw indices". |

## Notes

- Validation check: after applying removals then additions, compute the SHA256 of the lexicographically sorted local list and compare it with the response checksum. If they differ the list is "corrupt": clear it and reissue the update with an empty `versionToken`, which forces a full update.
- Clients are strongly encouraged to update regularly; memory or bandwidth limits can be expressed as update constraints in the request.
- Compression and update constraints have their own official pages: https://docs.cloud.google.com/web-risk/docs/compression and https://docs.cloud.google.com/web-risk/docs/update-constraints.
- Source: https://docs.cloud.google.com/web-risk/docs/local-databases (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/web-risk/docs/update-api
- The `API_KEY` in the query string lands in shell history and request logs; restrict the key and keep it out of shared terminals and CI logs.

## Related

- [update-api.md](./update-api.md)
- [urls-hashing.md](./urls-hashing.md)
- [caching.md](./caching.md)
