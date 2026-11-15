---
source: https://docs.cloud.google.com/run/docs/triggering/pubsub-triggers
---

# Invoke Cloud Run from Pub/Sub (Push Subscription and Eventarc)

Deploy a private receiving service, then deliver Pub/Sub messages to it, either with a direct authenticated push subscription (recommended) or with an Eventarc trigger that delivers CloudEvents.

## Signature / Usage

Enable the Artifact Registry, Cloud Build, Cloud Run Admin, Cloud Logging and Pub/Sub APIs (plus Eventarc for the Eventarc path).

### 1. Deploy the receiving service

If you do not pass an authentication flag you are prompted; answer no to keep the service private. Note the HTTPS URL it prints (`SERVICE_URL` below). The handler must accept the Pub/Sub push request (or the CloudEvent, for Eventarc).

```bash
gcloud run deploy SERVICE --image IMAGE_URL
```

### 2. Create the topic

```bash
gcloud pubsub topics create TOPIC_NAME
```

### 3. Create a dedicated invoker service account and allow it to invoke the service

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME \
   --display-name "Cloud Run Pub/Sub Invoker"
```

`SERVICE_NAME` here is the service from step 1.

```bash
gcloud run services add-iam-policy-binding SERVICE_NAME \
   --member=serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
   --role=roles/run.invoker
```

IAM changes can take several minutes to propagate; meanwhile you might see `HTTP 403` in the service logs.

### 4. Only for projects created on or before April 8, 2021

The source lists this grant for the direct push path; do it before creating the push subscription in step 5a. Allow Pub/Sub to create authentication tokens. `PROJECT_NUMBER` is the project number, not the project ID.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
   --member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com \
   --role=roles/iam.serviceAccountTokenCreator
```

### 5a. Direct push subscription

```bash
gcloud pubsub subscriptions create SUBSCRIPTION_NAME \
  --topic TOPIC_NAME \
  --ack-deadline=600 \
  --push-endpoint=SERVICE_URL/ \
  --push-auth-service-account=SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com
```

### 5b. Eventarc trigger (CloudEvents)

`DESTINATION_RUN_SERVICE` is the service deployed in step 1 (`SERVICE`); `DESTINATION_RUN_REGION` is its region (optional; if not specified, the service is assumed to be in the same region as the trigger); `LOCATION` is the location of the Eventarc trigger, which must match the location of the Google Cloud service that is generating events.

```bash
gcloud eventarc triggers create TRIGGER_NAME  \
   --location=LOCATION \
   --destination-run-service=DESTINATION_RUN_SERVICE  \
   --destination-run-region=DESTINATION_RUN_REGION \
   --event-filters="type=google.cloud.pubsub.topic.v1.messagePublished" \
   --transport-topic=projects/PROJECT_ID/topics/TOPIC_NAME \
   --service-account=SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com
```

## Options / Props

| Item | Detail |
|---|---|
| Direct trigger | Pub/Sub pushes the standard push request to the service; you manage the subscription |
| Eventarc trigger | Events arrive as CloudEvents; the event type filter is required and cannot be changed |
| `--ack-deadline=600` | The 10-minute maximum acknowledgment deadline |
| `--push-auth-service-account` | Activates authenticated push; Cloud Run checks the token and that the account may invoke the service |
| `--max-retry-attempts` | Eventarc only; the only valid value is `1` (single delivery attempt) |
| Eventarc topic | Must be in the same project as the trigger |

## Notes

- Use a dedicated user-managed service account as the trigger identity. The Console and Eventarc default to the Compute Engine default service account if you do not choose one.
- The step 4 grant is project-wide: it lets the Pub/Sub service agent create tokens for every service account in the project. Skip it for newer projects and remove it when no longer needed. To limit the scope (not in the source), grant the role to the Pub/Sub service agent on the push service account `SERVICE_ACCOUNT_NAME` only (a service-account-level IAM policy binding) instead of on the project; Pub/Sub needs to create tokens only for the account set in `--push-auth-service-account`.
- Eventarc trigger location should match the location of the resource being monitored: https://docs.cloud.google.com/eventarc/docs/understand-locations
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that only run inside the container.
- The `gcloud run` commands that omit `--region` follow the source; pass `--region=REGION` or set the `run/region` property (for example `gcloud config set run/region REGION`), otherwise gcloud prompts for a region or, in non-interactive runs, fails.
- Source: https://docs.cloud.google.com/run/docs/triggering/pubsub-triggers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/deploying (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [function-http-and-event.md](./function-http-and-event.md)
- [tasks-http-target-oidc.md](./tasks-http-target-oidc.md)
- Cloud Storage triggers: https://docs.cloud.google.com/run/docs/triggering/storage-triggers
