---
source: https://docs.cloud.google.com/web-risk/docs/lookup-api
---

# Using the Lookup API

The Lookup API checks whether a URL is on any Web Risk list by sending an HTTP `GET` to `uris.search`. The response returns matching threat types, if any, with the cache expiration.

## Signature / Usage

### uris.search

```bash
curl -X GET \
     "https://webrisk.googleapis.com/v1/uris:search?threatTypes=MALWARE&uri=http%3A%2F%2Ftestsafebrowsing.appspot.com%2Fs%2Fmalware.html&key=API_KEY"
```

A match returns a JSON response similar to the following:

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

If no results match, the response is an empty JSON `{}`, meaning the URL isn't on any threat list.

### Several threat types in one request

Repeat the `threatTypes` field:

```text
&threatTypes=SOCIAL_ENGINEERING&threatTypes=MALWARE
```

## Options / Props

### Request rules

| Item | Rule |
|---|---|
| URLs per request | One; send a separate request for each URL. |
| `threatTypes` | May be repeated to check several threat types. |
| `uri` | Must be valid (RFC 2396); doesn't need to be canonicalized. |
| Encoding | With the REST API, encode `GET` parameters, like the URI. |
| `expireTime` | Timestamp at which the match should be considered expired; see caching. |

## Notes

- Authentication here is an API key (`key=API_KEY`) in the query string; it lands in shell history and request logs, so restrict the key and keep it out of shared terminals and CI logs.
- The source also shows PowerShell, Java and Python forms (client library `WebRiskServiceClient.searchUris` / `search_uris`); they are omitted here.
- Cache matches until `expireTime` and consult the cache before the next `uris.search` request.
- Source: https://docs.cloud.google.com/web-risk/docs/lookup-api (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [caching.md](./caching.md)
- [update-api.md](./update-api.md)
- [lists.md](./lists.md)
- [overview.md](./overview.md)
