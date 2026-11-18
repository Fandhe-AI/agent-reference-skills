---
source: https://docs.cloud.google.com/web-risk/docs/update-api
---

# Using the Update API

The Update API downloads hashed versions of the Web Risk lists into a local or in-memory database (`threatLists.computeDiff`), checks URLs locally, and verifies local hash-prefix matches on the server (`hashes.search`). Web Risk maintains an open-source Update API client at https://github.com/google/webrisk (HTTP microserver, Dockerfile, command-line lookup); it can also serve as a reference implementation.

## Signature / Usage

### threatLists.computeDiff

Requests the diffs for the `MALWARE` list. Replace `API_KEY` with your own key.

```bash
curl -X GET \
     "https://webrisk.googleapis.com/v1/threatLists:computeDiff?threatType=MALWARE&versionToken=Gg4IBBADIgYQgBAiAQEoAQ%3D%3D&constraints.maxDiffEntries=2048&constraints.maxDatabaseEntries=4096&constraints.supportedCompressions=RAW&key=API_KEY"
```

Response similar to the following (a full update, `RESET`; the source's `...` elides the rest of the hash data):

```text
{
  "recommendedNextDiff": "2020-01-08T19:41:45.436722194Z",
  "responseType": "RESET",
  "additions": {
    "rawHashes": [
      {
        "prefixSize": 4,
        "rawHashes": "AArQMQAMoUgAPn8lAE..."
      }
    ]
  },
  "newVersionToken": "ChAIARAGGAEiAzAwMSiAEDABEPDyBhoCGAlTcIVL",
  "checksum": {
    "sha256": "wy6jh0+MAg/V/+VdErFhZIpOW+L8ulrVwhlV61XkROI="
  }
}
```

### hashes.search

Sends the hash prefix of a URL that matched locally, with two list names.

```bash
curl \
  -H "Content-Type: application/json" \
  "https://webrisk.googleapis.com/v1/hashes:search?key=YOUR_API_KEY&threatTypes=MALWARE&threatTypes=SOCIAL_ENGINEERING&hashPrefix=WwuJdQ%3D%3D"
```

Adapted (not in the official docs): added the missing commas after the `"hash"` values and removed the trailing comma and the extra `}` before `]` so the response is valid JSON.

```json
{
  "threats": [{
      "threatTypes": ["MALWARE"],
      "hash": "WwuJdQx48jP-4lxr4y2Sj82AWoxUVcIRDSk1PC9Rf-4=",
      "expireTime": "2019-07-17T15:01:23.045123456Z"
    }, {
      "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING"],
      "hash": "WwuJdQxaCSH453-uytERC456gf45rFExcE23F7-hnfD=",
      "expireTime": "2019-07-17T15:01:23.045123456Z"
    }
  ],
  "negativeExpireTime": "2019-07-17T15:01:23.045123456Z"
}
```

## Options / Props

### computeDiff request fields

| Field | Description |
|---|---|
| `threatType` | The Web Risk list to update (one per request). |
| `versionToken` | Current client state of the list; returned in `newVersionToken`. Leave empty for the initial update (or to force a full update). |
| `constraints.maxDiffEntries` | Total number of updates the client can manage (example: 2048). Java / Python samples: a power of 2 between 2^10 and 2^20; zero means no limit. |
| `constraints.maxDatabaseEntries` | Total entries the local database can manage (example: 4096). Same power-of-2 range; zero means no limit. |
| `constraints.supportedCompressions` | Compression types the client supports; the example supports only `RAW`. Discovery enum: `RAW`, `RICE`. |

### computeDiff response fields

| Field | Description |
|---|---|
| `responseType` | `DIFF` (partial update) or `RESET` (full update). |
| `additions` / `removals` | Changes for the local database; there can be several sets of additions but only one set of removals. |
| `newVersionToken` | Save it as the `versionToken` for the next request. |
| `checksum` | SHA256 used to verify the local database; on mismatch, clear the database and reissue the update with an empty `versionToken` while still following the update time intervals. |
| `recommendedNextDiff` | Timestamp until which the client should wait before the next update request; may be absent. |

### hashes.search fields

| Field | Description |
|---|---|
| `threatTypes` | Lists to check (here `MALWARE` and `SOCIAL_ENGINEERING`). |
| `hashPrefix` | Exact hash prefix present in the local database (a 4-byte local prefix means a 4-byte `hashPrefix`; a 7-byte one means 7 bytes). JSON requests are base64-encoded; in a URI use the web-safe variant (RFC 4648). |
| `threats` | Matching full-length hashes; those URLs are unsafe. Nothing returned means the URL is safe. |
| `expireTime` / `negativeExpireTime` | Until when the hashes must be considered unsafe / safe respectively. |

## Notes

- Checking flow: compute the hash and hash prefix of the URL, query the local database; if the prefix is absent the URL is safe; if present, send the prefix to `hashes.search`; unsafe only if one returned full-length hash matches the URL's full-length hash. Google learns hash prefixes, not the URLs.
- Web Risk provides no option to save or update the local database; you apply additions and removals yourself.
- Use a size constraint to protect memory and bandwidth and to guard against list growth.
- The source also shows PowerShell, Java and Python forms; they are omitted here. The source's `computeDiff` partial-update (`DIFF`) response example repeats `recommendedNextDiff` and is omitted.
- Keep `API_KEY` out of shared terminals and CI logs; it lands in shell history and request logs. The `hashes.search` example writes the same key as `YOUR_API_KEY`.
- Source: https://docs.cloud.google.com/web-risk/docs/update-api (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the `hashes.search` response example had `"hash": "..."` lines with no trailing comma and ended with `},` then `}],` (a trailing comma and an unmatched `}`); only those characters were fixed.

## Related

- [local-databases.md](./local-databases.md)
- [urls-hashing.md](./urls-hashing.md)
- [caching.md](./caching.md)
- [lookup-api.md](./lookup-api.md)
