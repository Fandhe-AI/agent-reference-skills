---
source: https://docs.cloud.google.com/run/docs/functions-with-run
---

# Cloud Run functions

Cloud Run functions let you build event-driven services, lightweight APIs, and background processing tasks on fully managed infrastructure. Google manages runtime configuration and OS patching, automatically scaling resources to match incoming traffic or events. Cloud Functions has been renamed to Cloud Run functions.

## Signature / Usage

### Rename

> **Note:** Cloud Functions has been renamed to Cloud Run functions.

Deploying a function, source code, or container image to Cloud Run provides all benefits described in the Container runtime contract (https://docs.cloud.google.com/run/docs/container-contract).

### Deploy a function (gcloud)

Snippet taken from https://docs.cloud.google.com/run/docs/functions/comparison (Cloud Functions v2 API deploy form):

```sh
gcloud functions deploy YOUR_FUNCTION_NAME \
   --region=YOUR_REGION \
   --runtime=YOUR_RUNTIME \
   --source=YOUR_SOURCE_LOCATION \
   --entry-point=YOUR_CODE_ENTRYPOINT \
   TRIGGER_FLAGS...
```

## Options / Props

Use cases for deploying functions:

| Use case | Description |
| --- | --- |
| Streaming data processing / ETL | Listen and respond to Cloud Storage events such as when a file is created, changed, or removed. Process images, perform video transcoding, validate and transform data, and invoke any service on the internet from Cloud Run. |
| Webhooks | Using an HTTP trigger, respond to events originating from 3rd party systems like GitHub, Slack, Stripe, or from anywhere that can send HTTP requests. |
| Mobile backend | Use Firebase and write your mobile backend in Cloud Run functions. Listen and respond to events from Firebase Analytics, Realtime Database, Authentication, and Storage. |
| IoT | Tens or hundreds of thousands of devices streaming data into Pub/Sub, launching Cloud Run functions to process, transform and store data. |
| AI/ML | Create a scalable image processing service with the Cloud Vision API, or post process output data from a Vertex AI custom-trained model. |

## Notes

- Functions are a connective layer of logic: listen and respond to a file upload to Cloud Storage, a log change, or an incoming Pub/Sub message. Functions have access to the Google Service Account credential and are seamlessly authenticated with most Google Cloud services; Cloud Client Libraries simplify the integrations; for client library code see the `gcp-client-libraries` skill.
- Automatic provisioning of an HTTPS endpoint makes functions a good candidate for webhooks.
- If you need `gcloud functions deploy`, the Cloud Functions v2 API, or the `google_cloudfunctions2_function` Terraform configuration for backward compatibility, see https://docs.cloud.google.com/functions/docs/deploy.
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`) and Vercel Functions (`vercel`); HTTP frameworks (`hono`, `fastify`) only run inside the container.
- Source: https://docs.cloud.google.com/run/docs/functions-with-run (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/functions/comparison (snippet)

## Related

- [overview.md](./overview.md)
- [comparison.md](./comparison.md)
- [write-functions.md](./write-functions.md)
- [deploy-functions.md](./deploy-functions.md)
- [function-triggers.md](./function-triggers.md)
