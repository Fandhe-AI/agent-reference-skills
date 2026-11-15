---
source: https://docs.cloud.google.com/firestore/native/docs/regional-endpoints
---

# Firestore regional endpoints (client side)

How to point a Firestore server client library at a regional or multi-regional endpoint by passing the endpoint string when the client is created.

## Signature / Usage

### Python: set the endpoint with ClientOptions

```python
ENDPOINT = "firestore.africa-south1.rep.googleapis.com"
client_options = ClientOptions(api_endpoint=ENDPOINT)
db = firestore.Client(client_options=client_options)

cities_query = db.collection("cities").limit(2).get()
for r in cities_query:
    print(r)
```

### Endpoint string formats

Regional (replace `REGION_NAME`, for example `firestore.us-central1.rep.googleapis.com`, `firestore.europe-west1.rep.googleapis.com`):

```text
firestore.REGION_NAME.rep.googleapis.com
```

Multi-regional: `us` for locations `nam5` and `nam7`, `eu` for `eur3`.

```text
firestore.us.rep.googleapis.com
firestore.eu.rep.googleapis.com
```

Deprecated locational endpoint (Python form; use regional or multi-regional instead):

```text
REGION_NAME-firestore.googleapis.com
```

## Notes

- The global endpoint `firestore.googleapis.com` is the default.
- Supported in the server client libraries (C#, Go, Java, Node.js, PHP, Python, Ruby). Mobile and web SDKs (Android, iOS, Web) are not supported.
- Setting an endpoint for a location other than where your data resides might result in a `PermissionDeniedError`.
- Regional and multi-regional endpoints don't support real-time listeners.
- The Python block is a fragment: imports are not shown in the source (`ClientOptions` is from `google.api_core.client_options`; `firestore` from `google.cloud`). No Node.js or Rust example is given in the source. Java / Go tabs are omitted.
- Java examples include a `:443` port suffix; the Python form has none.
- To block use of the global endpoint, the organization policy constraint `constraints/gcp.restrictEndpointUsage` can be used.
- This is the Google Cloud client library, distinct from the Firebase client SDKs. Out of scope: the Firestore API itself belongs to a product skill, not `gcp-client-libraries`.
- Source: https://docs.cloud.google.com/firestore/native/docs/regional-endpoints (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [datastore-regional-endpoints.md](./datastore-regional-endpoints.md)
- [firestore-emulator.md](./firestore-emulator.md)
