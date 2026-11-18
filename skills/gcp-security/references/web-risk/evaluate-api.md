---
source: https://docs.cloud.google.com/web-risk/docs/evaluate-api
---

# Using the Evaluate API

The Evaluate API (Preview, private preview for a limited set of customers) returns a per-threat-type confidence score that a URL is malicious, computed from Safe Browsing blocklists, generative AI models, machine learning models and heuristic rules. For a binary result use the Lookup API.

## Signature / Usage

### evaluateUri

Replace `URL` with the URL to evaluate and `API_KEY` with your own key. Save the request body in `request.json`.

```json
{
  "uri": "URL",
  "threatTypes": ["SOCIAL_ENGINEERING", "MALWARE", "UNWANTED_SOFTWARE"]
}
```

```bash
curl -X POST \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://webrisk.googleapis.com/v1eap1:evaluateUri?key=API_KEY"
```

Response similar to the following:

```json
{
  "scores": [
    {
      "threatType": "MALWARE",
      "confidenceLevel": "EXTREMELY_HIGH"
    },
    {
      "threatType": "SOCIAL_ENGINEERING",
      "confidenceLevel": "SAFE"
    },
    {
      "threatType": "UNWANTED_SOFTWARE",
      "confidenceLevel": "SAFE"
    }
  ]
}
```

## Options / Props

### Request rules

| Item | Rule |
|---|---|
| URLs per request | One; send a separate request for each URL. |
| `uri` | Must be valid (RFC 2396); doesn't need to be canonicalized. |
| `threatTypes` | `SOCIAL_ENGINEERING`, `MALWARE`, `UNWANTED_SOFTWARE`. |
| `allow_scan` | Deprecated; it determined whether Web Risk may scan the URL, and this can no longer be disabled. |
| Response | A confidence score per requested threat type. |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms" of the Service Specific Terms; Pre-GA features are available "as is" and might have limited support. Available in private preview to a limited set of customers whose use case aligns with its capabilities; contact the sales team to request a review.
- Any URL submitted to the Evaluate API may undergo additional processing, including crawls. For crawl-free options see the Lookup and Update APIs.
- The endpoint is `v1eap1`, not `v1`; it is not in the public `webrisk` v1 Discovery document.
- The source also shows a PowerShell form; omitted here. Keep `API_KEY` out of shared terminals and CI logs.
- Source: https://docs.cloud.google.com/web-risk/docs/evaluate-api (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [lookup-api.md](./lookup-api.md)
- [update-api.md](./update-api.md)
- [overview.md](./overview.md)
