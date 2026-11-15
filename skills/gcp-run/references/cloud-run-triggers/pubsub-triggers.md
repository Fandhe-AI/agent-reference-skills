---
source: https://docs.cloud.google.com/run/docs/triggering/pubsub-triggers
---

# Invoke with Pub/Sub triggers

Invoke Cloud Run services and functions whenever a message is published to a Pub/Sub topic, using either a direct Pub/Sub push subscription (recommended) or an Eventarc-based trigger.

## Signature / Usage

### Create the topic

```bash
gcloud pubsub topics create TOPIC_NAME
```

### Direct trigger: create the invoker service account and bindings

Required when creating the trigger with the gcloud CLI (skip if you use the Console).

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME \
   --display-name "Cloud Run Pub/Sub Invoker"
```

Give the invoker service account permission to invoke your service:

```bash
gcloud run services add-iam-policy-binding SERVICE_NAME \
   --member=serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
   --role=roles/run.invoker
```

IAM changes can take several minutes to propagate; in the meantime you might see `HTTP 403` errors in the service logs.

Only if your project was created on or before April 8, 2021, allow Pub/Sub to create authentication tokens (projects created after that date already have `roles/pubsub.serviceAgent` with identical permissions):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
   --member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com \
   --role=roles/iam.serviceAccountTokenCreator
```

`PROJECT_ID` is the project ID; `PROJECT_NUMBER` is the project number (both appear in the Project info panel of the Console).

### Direct trigger: create the subscription

```bash
gcloud pubsub subscriptions create SUBSCRIPTION_NAME \
  --topic TOPIC_NAME \
  --ack-deadline=600 \
  --push-endpoint=SERVICE_URL/ \
  --push-auth-service-account=SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com
```

### Eventarc-based trigger

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
| Direct trigger (recommended) | Pub/Sub pushes the standard Pub/Sub push request to your service; you manage the subscription |
| Eventarc-based trigger | Events arrive as CloudEvents; use for Eventarc filtering and routing |
| APIs to enable | Artifact Registry, Cloud Build, Cloud Run Admin, Cloud Logging, Pub/Sub; plus Eventarc for Eventarc-based triggers |
| Deployer roles | `roles/run.admin`, `roles/pubsub.editor`, `roles/logging.viewAccessor`, `roles/resourcemanager.projectIamAdmin`, `roles/iam.serviceAccountAdmin`, `roles/iam.serviceAccountUser`, `roles/serviceusage.serviceUsageAdmin` |
| `--ack-deadline=600` | Sets the acknowledgment deadline to the 10-minute maximum |
| `--push-auth-service-account` | Activates authenticated Pub/Sub push; Cloud Run has a built-in check that the token is valid and that the service account may invoke the service |
| `--event-filters="type=google.cloud.pubsub.topic.v1.messagePublished"` | Required for Eventarc and cannot be changed; a different event type needs a new trigger |
| `--max-retry-attempts` | Eventarc only: the only valid value is `1` (single delivery attempt, no retries); omit for standard retry behavior |
| `TOPIC_NAME` (Eventarc) | Topic must be in the same project as the trigger |
| `SERVICE_URL` | The HTTPS URL provided on deploying the service; works even with a domain mapping |

## Notes

- Use a dedicated user-managed service account for the trigger identity (`SERVICE_ACCOUNT_NAME`, the source describes it as "your user-managed service account" for Eventarc). The Console and Eventarc default to the Compute Engine default service account if you do not choose one.
- The Pub/Sub service agent is `service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com`; this is a Google-managed service agent, not a workload identity. Use the project number there, not the project ID.
- The project-level `roles/iam.serviceAccountTokenCreator` grant to the Pub/Sub service agent is a broad scope: it lets the agent create tokens for every service account in the project. The source requires it "on the project" only for projects created on or before April 8, 2021; skip it for newer projects, and remove it if the project no longer needs it.
- To limit the scope (not in the source), grant `roles/iam.serviceAccountTokenCreator` to the Pub/Sub service agent on the push service account `SERVICE_ACCOUNT_NAME` only (a service-account-level IAM policy binding), instead of on the project; Pub/Sub needs to create tokens only for the account set in `--push-auth-service-account`.
- Eventarc trigger location should match the location of the resource being monitored; see https://docs.cloud.google.com/eventarc/docs/understand-locations
- The source also shows Console steps and refers to Terraform at https://docs.cloud.google.com/eventarc/docs/creating-triggers-terraform (not reproduced).
- Source: https://docs.cloud.google.com/run/docs/triggering/pubsub-triggers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Distance: Cloud Run is Google Cloud's serverless container platform, distinct from Cloudflare Workers (`cloudflare-workers`) and Vercel Functions (`vercel`).

## Related

- [trigger-with-events.md](./trigger-with-events.md)
- [storage-triggers.md](./storage-triggers.md)
- [using-tasks.md](./using-tasks.md)
