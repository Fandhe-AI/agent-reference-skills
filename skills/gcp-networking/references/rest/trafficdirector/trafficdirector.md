---
source: https://trafficdirector.googleapis.com/$discovery/rest?version=v3
---

# Traffic Director API REST API (trafficdirector)

## Signature / Usage

Base URL: `https://trafficdirector.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v3).

### `trafficdirector.discovery.client_status`

- Versions: v3, v2
- `POST https://trafficdirector.googleapis.com/v3/discovery:client_status`
-
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ClientStatusRequest`; Response: `ClientStatusResponse`

### Example request skeleton

Generated from the Discovery entry of `trafficdirector.discovery.client_status` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://trafficdirector.googleapis.com/v3/discovery:client_status"
```

## Notes

- Generated from the Discovery document(s) v3, v2 of `trafficdirector` (retrieved 2026-11-14). Resources on this page: discovery.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/trafficdirector/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://trafficdirector.googleapis.com/$discovery/rest?version=v3, https://trafficdirector.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
