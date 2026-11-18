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
- Regional endpoints: the Discovery document (`trafficdirector` v3, revision 20260810) also lists 47 endpoints of the form `https://trafficdirector.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west15`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://trafficdirector.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://trafficdirector.africa-south1.rep.googleapis.com/`) and keep the path.
- Source: https://trafficdirector.googleapis.com/$discovery/rest?version=v3, https://trafficdirector.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
