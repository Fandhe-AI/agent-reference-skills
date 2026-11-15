---
source: https://docs.cloud.google.com/functions/docs/deploy
---

# Deploy a function with gcloud functions deploy (Cloud Run functions)

Deploy a Cloud Run function (formerly Cloud Functions 2nd gen) from source with the `gcloud functions` command, for backward compatibility with the Cloud Functions v2 API. For the `gcloud run` path see https://docs.cloud.google.com/run/docs/quickstarts/functions/deploy-functions-gcloud.

## Signature / Usage

```sh
gcloud functions deploy YOUR_FUNCTION_NAME \
   --region=YOUR_REGION \
   --runtime=YOUR_RUNTIME \
   --source=YOUR_SOURCE_LOCATION \
   --entry-point=YOUR_CODE_ENTRYPOINT \
   TRIGGER_FLAGS
```

Set all future first-time deployments to this generation:

```sh
gcloud config set functions/gen2 true
```

## Options / Props

| Flag | Description |
| --- | --- |
| `YOUR_FUNCTION_NAME` | Starts with a letter, followed by up to 62 letters, numbers, hyphens, or underscores; ends with a letter or number. The Cloud Run service name replaces underscores with hyphens and lowercases (`Function_1` becomes `function-1`) |
| `--region` | Region; see Cloud Run locations (https://docs.cloud.google.com/run/docs/locations) |
| `--runtime` | Runtime ID (https://docs.cloud.google.com/functions/docs/runtime-support) |
| `--source` | Location of the function source code |
| `--entry-point` | Function name or fully-qualified class name in your source |

| Trigger flags | Trigger |
| --- | --- |
| `--trigger-http` | HTTP(S) request |
| `--trigger-topic=YOUR_PUBSUB_TOPIC` | Message published to the Pub/Sub topic |
| `--trigger-bucket=YOUR_STORAGE_BUCKET` | Object created or overwritten in the Cloud Storage bucket |
| `--trigger-event-filters=EVENTARC_EVENT_FILTERS` | Eventarc event matching the filters |

## Notes

- Deploying users need `roles/cloudfunctions.developer` or equivalent permissions.
- The first deployment may take several minutes; redeploys are faster and traffic migrates automatically. Instances of the previous version may keep serving for several minutes after a deployment finishes, and when a deployment fails the previous version generally stays available.
- URLs: functions created with `gcloud functions` or the v2 API get a `cloudfunctions.net` URL by default; deployed on Cloud Run they also get a `run.app` URL. Functions created in Cloud Run have no `cloudfunctions.net` URL. The two URLs behave identically.
- Functions created with the v2 API can be managed by both the Cloud Run Admin API and the Cloud Functions v2 API; functions created with `gcloud run` or the Cloud Run Admin API cannot be managed with `gcloud functions` or the v2 API.
- Deploying on Cloud Run adds minimum instances, concurrency, container config, CPU/memory limits, request timeout, secrets, env vars, execution environment, HTTP/2, service accounts, Cloud SQL, session affinity and traffic splitting, tags and networking options; triggers are specified differently (see the comparison guide in the `cloud-run-functions` category).
- Terraform examples: https://docs.cloud.google.com/functions/docs/tutorials/terraform and https://docs.cloud.google.com/functions/docs/tutorials/terraform-pubsub.
- Source: https://docs.cloud.google.com/functions/docs/deploy (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-1st-gen.md](./deploy-1st-gen.md)
- [concepts-overview.md](./concepts-overview.md)
- [runtime-support.md](./runtime-support.md)
