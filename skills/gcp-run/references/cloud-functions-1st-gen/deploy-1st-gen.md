---
source: https://docs.cloud.google.com/functions/1stgendocs/deploy
---

# Deploy a Cloud Run function (1st gen)

Deploy a legacy 1st gen Cloud Run function (formerly Cloud Functions 1st gen) from source with `gcloud functions deploy --no-gen2`. For new functions use Cloud Run (https://docs.cloud.google.com/run/docs/quickstarts/functions/deploy-functions-console).

## Signature / Usage

Adapted (not in the official docs): the source's optional `[--gen2]` placeholder is replaced with `--no-gen2`; a bracketed token is passed to gcloud as a literal argument, and a 1st gen deployment needs `--no-gen2`.

```sh
gcloud functions deploy YOUR_FUNCTION_NAME \
  --no-gen2 \
  --region=YOUR_REGION \
  --runtime=YOUR_RUNTIME \
  --source=YOUR_SOURCE_LOCATION \
  --entry-point=YOUR_CODE_ENTRYPOINT \
  TRIGGER_FLAGS
```

### HTTP function from local source

```bash
gcloud functions deploy my-http-function \
  --no-gen2 \
  --region=us-central1 \
  --runtime=nodejs22 \
  --source=. \
  --entry-point=myHttpFunction \
  --trigger-http
```

### Pub/Sub function from source in Cloud Storage

```bash
gcloud functions deploy my-pubsub-function \
  --no-gen2 \
  --region=europe-west1 \
  --runtime=python312 \
  --source=gs://my-bucket/my_function_source.zip \
  --entry-point=pubsub_handler \
  --trigger-topic=my-topic
```

### Cloud Storage function from local source

```bash
gcloud functions deploy my-storage-function \
  --no-gen2 \
  --region=asia-northeast1 \
  --runtime=java17 \
  --source=./functions/storage-function \
  --entry-point=myproject.StorageFunction \
  --trigger-resource=gs://my-bucket \
  --trigger-event=google.storage.object.delete
```

## Options / Props

| Flag | Description |
| --- | --- |
| `YOUR_FUNCTION_NAME` | Starts with a letter, followed by up to 62 letters, numbers, hyphens, or underscores; ends with a letter or number |
| `--gen2` / `--no-gen2` | `--gen2` deploys to Cloud Run functions; it became the default as of September 2024. Use `--no-gen2` to deploy to 1st gen |
| `--region` | Region to deploy to (1st gen locations: https://docs.cloud.google.com/functions/1stgendocs/locations) |
| `--runtime` | Language runtime ID |
| `--source` | Local path to the source root (current directory if omitted), or a `gs://` path to a ZIP file with sources at its root |
| `--stage-bucket` | Optional Cloud Storage bucket to upload local sources to during deployment |
| `--entry-point` | Function name or fully-qualified class name in your source |

| Trigger flags | Trigger |
| --- | --- |
| `--trigger-http` | HTTP(S) request |
| `--trigger-topic=YOUR_PUBSUB_TOPIC` | Message published to the Pub/Sub topic |
| `--trigger-bucket=YOUR_STORAGE_BUCKET` | Object created or overwritten in the Cloud Storage bucket |
| `--trigger-event=EVENT_TYPE [--trigger-resource=RESOURCE]` | Specified event; a resource is required for some event types |

## Notes

- Deploying users need the Cloud Run functions Developer IAM role (`roles/cloudfunctions.developer`) or a role with the same permissions.
- Deploying from Cloud Storage needs `storage.objects.get` for the deploying account; the object must be a ZIP with source files at its root. Local uploads exclude files through `.gcloudignore`.
- Runtimes in the examples (`nodejs22`, `python312`, `java17`) are the 1st gen runtimes in the support table; check decommission dates in runtime-support.md before reusing others (e.g. `nodejs20` and older are decommissioned).
- The source includes Cloud Shell activation steps; omitted. Builds: https://docs.cloud.google.com/functions/1stgendocs/building; triggers: https://docs.cloud.google.com/functions/1stgendocs/calling.
- Adapted from the official docs: the generic command's `[--gen2] \` line is written as `--no-gen2 \`. Per the `gcloud functions deploy` help, `--no-gen2` selects 1st gen; when neither flag is given, the `functions/gen2` configuration property decides, and if that is unset gcloud looks up the existing function and uses its generation.
- To move to Cloud Run functions see upgrade-gen1-functions.md.
- Source: https://docs.cloud.google.com/functions/1stgendocs/deploy (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [gcloud-functions-deploy.md](./gcloud-functions-deploy.md)
- [runtime-support.md](./runtime-support.md)
- [quotas-1st-gen.md](./quotas-1st-gen.md)
- [upgrade-gen1-functions.md](./upgrade-gen1-functions.md)
