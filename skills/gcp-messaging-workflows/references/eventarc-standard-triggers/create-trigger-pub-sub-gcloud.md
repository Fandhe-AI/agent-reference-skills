---
source: https://docs.cloud.google.com/eventarc/standard/docs/run/create-trigger-pub-sub-gcloud
---

# Receive Events Using Pub/Sub Messages (gcloud CLI)

Quickstart: deploy an unauthenticated Cloud Run service as an event receiver, create an Eventarc Standard trigger for `google.cloud.pubsub.topic.v1.messagePublished`, publish a Pub/Sub message and read the event in the Cloud Run logs. Cloud Run itself is covered by the `gcp-run` skill.

## Signature / Usage

### Before you begin

```bash
gcloud components update
```

```bash
gcloud auth login
```

```bash
gcloud config set run/region us-central1
gcloud config set run/platform managed
gcloud config set eventarc/location us-central1
```

If you enabled the Cloud Pub/Sub service agent on or before April 8, 2021, to support authenticated Pub/Sub push requests, grant the Service Account Token Creator role to the service agent. Otherwise, this role is granted by default:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com \
    --role=roles/iam.serviceAccountTokenCreator
```

Find the project number:

```bash
gcloud projects describe PROJECT_ID --format='value(projectNumber)'
```

### Deploy an event receiver to Cloud Run

Deploy with a prebuilt image, `us-docker.pkg.dev/cloudrun/container/hello`:

```bash
gcloud run deploy helloworld-events-pubsub-quickstart \
    --image=us-docker.pkg.dev/cloudrun/container/hello \
    --allow-unauthenticated
```

### Create an Eventarc trigger (new Pub/Sub topic)

```bash
gcloud eventarc triggers create events-pubsub-trigger \
    --destination-run-service=helloworld-events-pubsub-quickstart \
    --destination-run-region=us-central1 \
    --event-filters="type=google.cloud.pubsub.topic.v1.messagePublished"
```

This creates a new Pub/Sub topic and a trigger called `events-pubsub-trigger`.

### Create an Eventarc trigger (existing Pub/Sub topic)

```bash
gcloud eventarc triggers create events-pubsub-trigger \
    --destination-run-service=helloworld-events-pubsub-quickstart \
    --destination-run-region=us-central1 \
    --event-filters="type=google.cloud.pubsub.topic.v1.messagePublished" \
    --transport-topic=projects/PROJECT_ID/topics/TOPIC_ID
```

Confirm the trigger:

```bash
gcloud eventarc triggers list --location=us-central1
```

### Generate and view an event

Find and set the Pub/Sub topic as an environment variable:

```bash
export RUN_TOPIC=$(gcloud eventarc triggers describe events-pubsub-trigger \
    --format='value(transport.pubsub.topic)')
```

```bash
gcloud pubsub topics publish $RUN_TOPIC --message "Hello World!"
```

```bash
gcloud logging read 'jsonPayload.message: "Received event of type google.cloud.pubsub.topic.v1.messagePublished"'
```

Expected log entry:

```text
jsonPayload:
...
message: 'Received event of type google.cloud.pubsub.topic.v1.messagePublished.
    Event data: Hello World!'
```

### Clean up

```bash
gcloud projects delete PROJECT_ID
```

## Options / Props

| Name | Description |
|---|---|
| `run/region`, `run/platform`, `eventarc/location` | gcloud properties set in the quickstart (`us-central1`, `managed`, `us-central1`). `eventarc/location` supplies the `--location` that trigger commands otherwise require. |
| `--event-filters="type=google.cloud.pubsub.topic.v1.messagePublished"` | Required filter for direct Pub/Sub events. |
| `--transport-topic` | Optional. Use an existing topic instead of letting Eventarc create one. |

### Required roles for the quickstart (on the project)

| Role | Role ID |
|---|---|
| Cloud Run Admin | `roles/run.admin` |
| Eventarc Admin | `roles/eventarc.admin` |
| Logs View Accessor | `roles/logging.viewAccessor` |
| Project IAM Admin | `roles/resourcemanager.projectIamAdmin` |
| Pub/Sub Publisher | `roles/pubsub.publisher` |
| Service Account Admin | `roles/iam.serviceAccountAdmin` |
| Service Account User | `roles/iam.serviceAccountUser` |
| Service Usage Admin | `roles/serviceusage.serviceUsageAdmin` |

## Notes

- `--allow-unauthenticated` makes the Cloud Run service callable by anyone with its URL; the quickstart uses it for simplicity. For projects with domain restricted sharing organization policies, the source says to use an authenticated Cloud Run target service instead. For an authenticated service, grant `roles/run.invoker` to the trigger service account (see `roles-permissions.md`).
- The trigger above sets no `--service-account`; see `roles-permissions.md` for the trigger service account and its roles.
- Creating an Eventarc trigger for the first time in a project can fail while the Eventarc service agent is provisioned; retrying usually resolves it (see the Eventarc troubleshooting page, "Permission denied errors").
- A trigger is created immediately but can take up to two minutes to be fully functional; wait and retry `gcloud logging read` if no entry appears.
- The Event Receiver role is not needed for direct Pub/Sub events (see `roles-permissions.md`).
- Deleting the Eventarc trigger also deletes the Pub/Sub topic that Eventarc created. The source cautions that deleting a project means "Everything in the project is deleted." and "Custom project IDs are lost." Try the cleanup on a disposable project first.
- The Service Account Token Creator grant on the Pub/Sub service agent is a project-level binding in the source (the source gives no resource-level form); it applies only to service agents enabled on or before April 8, 2021.
- The source also shows the Console form for the prerequisites.
- Source: https://docs.cloud.google.com/eventarc/standard/docs/run/create-trigger-pub-sub-gcloud (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [roles-permissions.md](./roles-permissions.md)
- [event-receivers.md](./event-receivers.md)
- [managing-triggers.md](./managing-triggers.md)
