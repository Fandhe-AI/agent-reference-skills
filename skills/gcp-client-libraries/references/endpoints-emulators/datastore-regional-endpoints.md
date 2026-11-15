---
source: https://docs.cloud.google.com/datastore/docs/regional-endpoints
---

# Datastore mode regional endpoints (client side)

How to point a Firestore in Datastore mode client library at a regional or multi-regional endpoint by passing the endpoint string when the client is created. Only the client-side endpoint setting is covered here.

## Signature / Usage

### Python: set the endpoint with ClientOptions

Adapted (not in the official docs): the twin replaced the identifiers `datastore` (module), `datastore.Client` and `client.query` with documentation URLs; they are restored here from the link targets (`google.cloud.datastore`, `google.cloud.datastore.client.Client`, `Client.query`).

```python
from google.cloud import datastore
from google.api_core.client_options import ClientOptions

ENDPOINT = "https://datastore.africa-south1.rep.googleapis.com"
client_options = ClientOptions(api_endpoint=ENDPOINT)
client = datastore.Client(client_options=client_options)

query = client.query(kind="Task")
results = list(query.fetch())
for r in results:
    print(r)
```

### Endpoint string formats

Regional (replace `REGION_NAME`, for example `datastore.us-central1.rep.googleapis.com`, `datastore.europe-west1.rep.googleapis.com`):

```text
datastore.REGION_NAME.rep.googleapis.com
```

Multi-regional: `us` for locations `nam5` and `nam7`, `eu` for `eur3`.

```text
datastore.us.rep.googleapis.com
datastore.eu.rep.googleapis.com
```

Deprecated locational endpoint (Python form; use regional or multi-regional instead):

```text
https://REGION_NAME-datastore.googleapis.com
```

## Notes

- The global endpoint `datastore.googleapis.com` is the default. A regional or multi-regional endpoint enforces that data is transmitted, stored and processed in the specified region or multi-region.
- Setting an endpoint for a location other than where your data resides might result in a `PermissionDeniedError`.
- The same mechanism (an endpoint string at client creation) applies to every language. The twin shows only Java and Python code for this; Node.js and Rust examples are not given. Java / Go tabs are omitted here.
- Source inconsistency: the Python example uses `https://datastore.africa-south1.rep.googleapis.com` (with scheme) while the Python format line is `datastore.REGION_NAME.rep.googleapis.com` (no scheme). Both are kept verbatim.
- Corrected from the official docs: the twin's Python block reads `from google.cloud import https://docs.cloud.google.com/python/docs/reference/datastore/latest`, `client = https://docs.cloud.google.com/python/docs/reference/datastore/latest.https://docs.cloud.google.com/python/docs/reference/datastore/latest/google.cloud.datastore.client.Client.html(client_options=client_options)` and `query = client.https://docs.cloud.google.com/python/docs/reference/datastore/latest/google.cloud.datastore.client.Client.html#google_cloud_datastore_client_Client_query(kind="Task")`; the identifiers were restored from the link targets.
- To block use of the global endpoint, the organization policy constraint `constraints/gcp.restrictEndpointUsage` can be used.
- Out of scope: the Datastore mode API itself (entities, keys, queries) belongs to a product skill, not `gcp-client-libraries`.
- Source: https://docs.cloud.google.com/datastore/docs/regional-endpoints (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [firestore-regional-endpoints.md](./firestore-regional-endpoints.md)
- [datastore-emulator.md](./datastore-emulator.md)
