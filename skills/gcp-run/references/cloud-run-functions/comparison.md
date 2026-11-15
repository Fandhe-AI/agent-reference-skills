---
source: https://docs.cloud.google.com/run/docs/functions/comparison
---

# Cloud Run functions comparison guide

Compares Cloud Run functions (deployed via the Cloud Run Admin API or Cloud Functions v2 API) with Cloud Run functions (1st gen), to help move workloads from the Cloud Functions API to the Cloud Run Admin API.

## Signature / Usage

### Rename history

- **Cloud Run functions** is the latest version of functions, deployed as a service on Cloud Run. Former product name: Cloud Functions (2nd gen).
- **Cloud Run functions (1st gen)**, formerly known as Cloud Functions (1st gen), is the original version of functions with limited event triggers, runtimes, and configurability.

Cloud Run functions can be created with: the Cloud Run Admin API (Recommended; console, `gcloud run`, REST, Terraform; managed exclusively with the Cloud Run Admin API), or the Cloud Functions v2 API (`gcloud functions`, REST, Terraform; manageable via both APIs; trigger is specified at deploy time).

### Deploy through the Cloud Functions v2 API

Requires the Cloud Functions Developer role (`roles/cloudfunctions.developer`) or equivalent permissions.

```sh
gcloud functions deploy YOUR_FUNCTION_NAME \
   --region=YOUR_REGION \
   --runtime=YOUR_RUNTIME \
   --source=YOUR_SOURCE_LOCATION \
   --entry-point=YOUR_CODE_ENTRYPOINT \
   TRIGGER_FLAGS...
```

## Options / Props

### Concepts

| | Cloud Run functions | Cloud Run functions (1st gen) |
| --- | --- | --- |
| Former product name | Cloud Functions (2nd gen) | Cloud Functions (1st gen) |
| Resource model | A function is a Cloud Run service deployed from source code | A function is deployed from source code |
| Function types | HTTP functions; CloudEvents (event-driven) functions in all language runtimes | HTTP functions; only Ruby, .NET, and PHP runtimes support CloudEvents. Node.js, Go, Python, Java use Background functions for events |
| HTTPS URL | `run.app` (v2 API functions also have a `cloudfunctions.net` endpoint) | `cloudfunctions.net` |
| Image registry | Artifact Registry only | Artifact Registry or Container Registry (deprecated) |
| IAM roles for deployment | `roles/run.sourceDeveloper`, `roles/serviceusage.serviceUsageConsumer`, `roles/iam.serviceAccountUser` | `roles/cloudfunctions.developer` |
| Internal infrastructure | Cloud Run | Google internal |
| Pricing | Cloud Run pricing | Cloud Run functions (1st gen) pricing |

### Configuration

| | Cloud Run functions | Cloud Run functions (1st gen) |
| --- | --- | --- |
| Request timeout | Up to 60 minutes for HTTP-triggered; up to 9 minutes for event-driven functions created with the Cloud Functions v2 API | Up to 9 minutes |
| Instance size | Up to 16 GiB RAM with 4 vCPU | Up to 8 GB RAM with 2 vCPU |
| Concurrency | Up to 1000 concurrent requests per instance | 1 concurrent request per instance |
| Traffic splitting | Supported | Not supported |

### Deployment tools

| | Cloud Run functions | Cloud Run functions (1st gen) |
| --- | --- | --- |
| Console | Cloud Run | Cloud Run functions (1st gen) |
| gcloud | `gcloud run deploy` (Run Admin API or Functions API functions); `gcloud functions deploy` (Functions API functions) | `gcloud functions deploy --no-gen2` |
| REST | `run.googleapis.com` (v1 and v2); `cloudfunctions.googleapis.com` (v2 only) for Functions API functions | `cloudfunctions.googleapis.com` (v1 and v2) |
| Terraform | `google_cloud_run_v2_service`; `google_cloudfunctions2_function` for Functions API functions | `cloudfunctions_function` |

### Triggers and retries

| | Cloud Run functions | Cloud Run functions (1st gen) |
| --- | --- | --- |
| Trigger | Run Admin API functions: specified in the console at deploy time, or after deploy with gcloud. v2 API functions: at deployment | At deployment |
| Event types | Any event type supported by Eventarc, including 90+ event sources through Cloud Audit Logs | Direct support for events from 7 sources |
| Retries | Run Admin API: update the Eventarc retry policy and configure a Pub/Sub dead-letter topic. v2 API: `--retry` flag at deployment | `--retry` flag at deployment |

## Notes

- Function name rules (`YOUR_FUNCTION_NAME`): starts with a letter, followed by up to 62 letters, numbers, hyphens, or underscores, ends with a letter or number. The Cloud Run service name replaces underscores with hyphens and lowercases (`Function_1` becomes `function-1`).
- Since August 2024, Cloud Run can deploy and manage functions created with the Cloud Functions v2 API: metadata such as runtime ID and build configs is stored in the Cloud Run service definition, which is the source of truth. Functions created with the Cloud Run Admin API cannot be modified with the Cloud Functions API.
- Detach: v2 API functions can be detached so they are managed only through the Cloud Run Admin API (e.g. to stay within the `run.googleapis.com` boundary for Assured Workloads, or to use the Cloud Run SKU). See https://docs.cloud.google.com/functions/docs/managing.
- Source inconsistency (corrected in the table above): the source's IAM cell lists the Service Usage Consumer role as `roles/run.serviceusage.serviceUsageConsumer`, which does not exist; the linked role page (https://docs.cloud.google.com/iam/docs/roles-permissions/serviceusage#serviceusage.serviceUsageConsumer) names it `roles/serviceusage.serviceUsageConsumer`, which the table above uses.
- Source inconsistency: this page gives the Cloud Run functions instance size as up to 16 GiB RAM with 4 vCPU; the Cloud Run functions quotas page (https://docs.cloud.google.com/functions/quotas) gives max function memory of 32GiB for Cloud Run functions (2nd gen).
- The source's Terraform cell shows the 1st gen resource as `cloudfunctions_function` (link text without the provider prefix); the Terraform resource type is `google_cloudfunctions_function`.
- Container Registry is deprecated; effective March 18, 2025, it is shut down and writing images to it is unavailable (App Engine standard quotas page, https://docs.cloud.google.com/appengine/docs/standard/quotas); use Artifact Registry.
- Upgrade path for 1st gen: https://docs.cloud.google.com/functions/1stgendocs/migrating/upgrade-gen1-functions.
- Source: https://docs.cloud.google.com/run/docs/functions/comparison (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [functions-with-run.md](./functions-with-run.md)
- [overview.md](./overview.md)
- [deploy-functions.md](./deploy-functions.md)
