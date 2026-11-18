---
source: https://docs.cloud.google.com/web-risk/docs/caching
---

# Caching

Clients of both the Lookup API and the Update API are required to create and maintain a local cache of threat data, to reduce client bandwidth and protect Google from traffic spikes. The Lookup API cache cuts `uris.search` requests; the Update API cache cuts `hashes.search` requests.

## Signature / Usage

### Cacheable response (Lookup API)

A Lookup API match response; cache the match until `expireTime`.

```json
{
  "threat": {
    "threatTypes": [
      "MALWARE"
    ],
    "expireTime": "2019-07-17T15:01:23.045123456Z"
  }
}
```

## Options / Props

### Cache types

| API | Cache | Field | Meaning |
|---|---|---|---|
| Lookup | Per `ThreatUrl` | `expireTime` | Until then assume the item is still unsafe; consult the cache before a new `uris.search` request. |
| Update | Positive | `expireTime` on each `ThreatHash` | The full hash is unsafe until this time. |
| Update | Negative | `negativeExpireTime` on the response | All full hashes with the requested prefix are safe for the requested threat types until this time, except those returned as unsafe. |

### Consulting the cache (Update API)

| Order | Check | Result |
|---|---|---|
| 1 | Local database contains the prefix of the URL's full hash | If not, safe. If yes, consult the cache. |
| 2 | Unexpired positive entry for the full hash | Unsafe. |
| 3 | Positive entry expired | Send `hashes.search` for the local prefix; unsafe only if the server returns the full hash. |
| 4 | Unexpired negative entry for the prefix | Safe. |
| 5 | Negative entry expired or absent | Send `hashes.search` and interpret normally. |

## Notes

- Update the cache on every `hashes.search` response: create or update the positive entry per `expireTime` and the prefix negative duration per `negativeExpireTime`. A positive entry not returned again need not be removed; positive durations are typically a few minutes, allowing quick correction of false positives.
- Example in the source: positive cache 5 minutes and negative cache 1 hour. During the hour, every URL whose prefix equals `h(example.com/)` is safe (unless its full hash equals `H(example.com/)`) and causes no `hashes.search`. If the response has zero matches and a negative expire time is set, send no `hashes.search` for any requested prefix during that time. If it has matches, the negative duration still applies to full hashes not present in the response, but not to a full hash that is already cached and expired.
- Negative caching prevents traffic overload caused by a hash prefix collision with a safe URL that receives a lot of traffic.
- Snippet taken from https://docs.cloud.google.com/web-risk/docs/lookup-api
- Source: https://docs.cloud.google.com/web-risk/docs/caching (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [lookup-api.md](./lookup-api.md)
- [update-api.md](./update-api.md)
- [local-databases.md](./local-databases.md)
