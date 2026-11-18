---
source: https://docs.cloud.google.com/sovereign-controls-by-partners/docs/regional-endpoints
---

# Accessing regional API endpoints

Regional endpoints (`SERVICE_NAME.REGION.rep.googleapis.com`) provide in-transit data residency by routing and serving traffic in the same Google Cloud region as the client; the client's TLS session terminates in the region named in the endpoint. They are available for the `me-central2` (Dammam, KSA) region and should be used only for workloads with no dependencies outside a single region or jurisdiction.

## Signature / Usage

### Endpoint format

```text
SERVICE_NAME.REGION.rep.googleapis.com
```

Complete example for BigQuery:

```text
bigquery.me-central2.rep.googleapis.com
```

### Configure the gcloud CLI

By default gcloud uses global endpoints such as `bigquery.googleapis.com`. Enable the service if needed:

```bash
gcloud services enable SERVICE_NAME
```

```bash
gcloud services enable cloudkms
```

Then override the endpoint with `gcloud config set api_endpoint_overrides`:

```bash
gcloud config set api_endpoint_overrides/SERVICE_NAME REGIONAL_API_URL
```

`REGIONAL_API_URL` has this form (`API_VERSION` such as `v1`; some services may not require it):

```text
https://SERVICE_NAME.REGION_NAME.rep.googleapis.com/SERVICE_NAME/API_VERSION
```

Cloud KMS example:

Adapted (not in the official docs): the gcloud override is the host with a trailing `/` (gcloud 593.0.0 rejects the source value `https://cloudkms.me-central2.rep.googleapis.com/cloudkms/v1`).

```bash
gcloud config set api_endpoint_overrides/cloudkms https://cloudkms.me-central2.rep.googleapis.com/
```

### Configure client libraries

Python: set `api_endpoint` in `ClientOptions` of the `google-api-core` package.

The first lines of the source block (the source does not show the import of `pubsub_v1`):

```python
from google.api_core.client_options import ClientOptions

options = ClientOptions(api_endpoint = "pubsub.me-central2.rep.googleapis.com")
client = pubsub_v1.PublisherClient(client_options=options)
```

Go: use `WithEndpoint` from the `option` package.

Adapted (not in the official docs): the source block is missing the closing parenthesis of `NewClient`.

```go
client, err := pubsub.NewClient(ctx, projID,
    option.WithEndpoint("pubsub.me-central2.rep.googleapis.com")) // Override endpoint
```

## Options / Props

### Supported region

| Region name | Location |
|---|---|
| `me-central2` | Dammam, Kingdom of Saudi Arabia (KSA) |

### Supported services and regional endpoints

| Service | Regional endpoints |
|---|---|
| App Hub | `apphub.me-central2.rep.googleapis.com` |
| Artifact Registry | `artifactregistry.me-central2.rep.googleapis.com`, `apt.me-central2.rep.pkg.dev`, `docker.me-central2.rep.pkg.dev`, `go.me-central2.rep.pkg.dev`, `googet.me-central2.rep.pkg.dev`, `kfp.me-central2.rep.pkg.dev`, `maven.me-central2.rep.pkg.dev`, `npm.me-central2.rep.pkg.dev`, `python.me-central2.rep.pkg.dev`, `yum.me-central2.rep.pkg.dev` |
| BigQuery | `bigquery.me-central2.rep.googleapis.com`, `bigquerydatatransfer.me-central2.rep.googleapis.com`, `bigquerymigration.me-central2.rep.googleapis.com`, `bigqueryreservation.me-central2.rep.googleapis.com`, `bigquerystorage.me-central2.rep.googleapis.com` |
| Bigtable | `bigtable.me-central2.rep.googleapis.com` |
| Cloud Key Management Service (Cloud KMS) | `cloudkms.me-central2.rep.googleapis.com` |
| Cloud Logging | `logging.me-central2.rep.googleapis.com` |
| Spanner | `spanner.me-central2.rep.googleapis.com` |
| Cloud Storage | `storage.me-central2.rep.googleapis.com` |
| Dataflow | `dataflow.me-central2.rep.googleapis.com` |
| Managed Service for Apache Spark | `dataproc.me-central2.rep.googleapis.com` |
| Pub/Sub | `pubsub.me-central2.rep.googleapis.com` |

### Placeholders

| Placeholder | Meaning |
|---|---|
| `SERVICE_NAME` | A supported service endpoint name, such as `bigquery` (for gcloud: such as `cloudkms`) |
| `REGION` / `REGION_NAME` | A supported Google Cloud region, such as `me-central2` |
| `API_VERSION` | API version of the service, such as `v1` |

## Notes

- Source inconsistency: the source's example `gcloud services enable cloudkms` passes the short name `cloudkms`, while the supported products page lists the API service as `cloudkms.googleapis.com`; the gcloud help only says SERVICE is "the name of the service(s) to enable" and its examples do not settle which form is required.
- Regional endpoints are only available for the supported services above that provide region-specific endpoints and their configuration options.
- Public regional endpoints are reachable over the internet. For internet ingress they use best-effort routing to keep in-transit traffic local to the region (or jurisdiction) because they don't use the global Google Front End (GFE); they resolve to IP addresses announced only at the peering points closest to the selected region. Example: a client in KSA using `bigquery.me-central2.rep.googleapis.com` is routed on Standard Tier and the TLS session terminates in `me-central2`.
- To enforce regional endpoint use, set the `constraints/gcp.restrictEndpointUsage` organization policy constraint to block requests to the global API endpoint (see Restrict endpoint usage in the Google Cloud security compliance docs). Test the constraint on a non-production folder first because it blocks global-endpoint calls.
- Corrected from the official docs: the Go sample ends with `option.WithEndpoint("pubsub.me-central2.rep.googleapis.com"), // Override endpoint`, so the `pubsub.NewClient(` call is never closed; the closing parenthesis was added.
- The source's Python block continues with `// Alternatively` and `client = pubsub_v1.PublisherClient(client_options={"api_endpoint": "pubsub.me-central2.rep.googleapis.com")`, which is not valid Python (a `//` comment and an unclosed brace); only the valid first lines are shown above.
- Omitted: the source also shows Java (`ImageAnnotatorSettings` from the Vision library with a Pub/Sub endpoint string) and .NET (`DatasetServiceClientBuilder` with a Pub/Sub endpoint) samples whose client classes don't match the endpoint they set; use each library's `Endpoint` / `setEndpoint` option with the matching client class.
- Corrected from the official docs: gcloud 593.0.0 rejects `gcloud config set api_endpoint_overrides/cloudkms https://cloudkms.me-central2.rep.googleapis.com/cloudkms/v1` with "must be an absolute URI beginning with http:// or https:// and ending with a trailing '/'". For apitools-based command groups such as `gcloud kms` (base URL `https://cloudkms.googleapis.com/`, request paths `v1/...`), an override whose path is not `/` is used as the base URL as-is (`_BuildEndpointOverride` in `googlecloudsdk/api_lib/util/apis_internal.py` of the gcloud 593.0.0 SDK), so the override is the host only. The `REGIONAL_API_URL` form with `/SERVICE_NAME/API_VERSION` above is kept verbatim; for `gcloud config set` use `https://SERVICE_NAME.REGION_NAME.rep.googleapis.com/`, as the Parameter Manager and Model Armor docs do.
- `SERVICE_NAME` in `api_endpoint_overrides/SERVICE_NAME` must be an existing property of the `api_endpoint_overrides` section (for example `cloudkms`); list them with `gcloud config list api_endpoint_overrides/ --all`, and get a service's default (the format to follow) with `gcloud config get api_endpoint_overrides/SERVICE_NAME` (`gcloud topic endpoint-override`; the `cloudkms` default is `https://cloudkms.googleapis.com/` per `gcloud config set --help`).
- Source: https://docs.cloud.google.com/sovereign-controls-by-partners/docs/regional-endpoints (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [supported-products.md](./supported-products.md)
- [create-folder.md](./create-folder.md)
