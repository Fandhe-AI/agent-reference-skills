---
source: https://docs.cloud.google.com/eventarc/standard/docs/run/create-trigger-cloud-audit-logs-gcloud
---

# Receive Events Using Cloud Audit Logs (gcloud CLI)

Quickstart: receive Cloud Storage events (`google.cloud.audit.log.v1.written`, `serviceName=storage.googleapis.com`, `methodName=storage.objects.create`) in an unauthenticated Cloud Run service through an Eventarc Standard trigger. Cloud Run itself is covered by the `gcp-run` skill.

## Signature / Usage

### Before you begin

```bash
gcloud components update
```

```bash
gcloud auth login
```

```bash
export REGION=us-central1
gcloud config set run/region ${REGION}
gcloud config set run/platform managed
gcloud config set eventarc/location ${REGION}
```

Enable Cloud Audit Logs Admin Read, Data Read, and Data Write log types in Google Cloud Storage. At the project level you need `roles/owner` to configure Data Access audit logs. Read the project's IAM policy and store it in a file:

```bash
gcloud projects get-iam-policy PROJECT_ID > /tmp/policy.yaml
```

Edit `/tmp/policy.yaml`, adding or changing only the Data Access audit logs configuration. Preserve the `bindings:` and `etag:` sections without changes; failure to do so might cause your project to become unusable.

Adapted (not in the official docs): the source's rendered snippet lost the YAML indentation (`logType` entries were not nested under `auditLogConfigs`); the nesting is restored.

```yaml
auditConfigs:
- auditLogConfigs:
  - logType: ADMIN_READ
  - logType: DATA_WRITE
  - logType: DATA_READ
  service: storage.googleapis.com
```

```bash
gcloud projects set-iam-policy PROJECT_ID /tmp/policy.yaml
```

If the command reports a conflict with another change, repeat the steps starting with reading the policy.

The quickstart attaches the Compute Engine default service account (`PROJECT_NUMBER-compute@developer.gserviceaccount.com`) to the trigger for testing. Find the project number:

```bash
gcloud projects describe PROJECT_ID --format='value(projectNumber)'
```

Grant Eventarc Event Receiver on the project to that service account:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com \
    --role=roles/eventarc.eventReceiver
```

If you enabled the Cloud Pub/Sub service agent on or before April 8, 2021:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com \
    --role=roles/iam.serviceAccountTokenCreator
```

### Create an Artifact Registry repository and a bucket

```bash
gcloud artifacts repositories create REPOSITORY \
    --repository-format=docker \
    --location=$REGION
```

```bash
gcloud storage buckets create gs://events-quickstart-PROJECT_ID/ --location=${REGION}
```

### Deploy the event receiver to Cloud Run

Clone the sample (Node.js or Python):

```bash
git clone https://github.com/GoogleCloudPlatform/nodejs-docs-samples.git
cd nodejs-docs-samples/eventarc/audit-storage
```

```bash
git clone https://github.com/GoogleCloudPlatform/python-docs-samples.git
cd python-docs-samples/eventarc/audit-storage
```

```bash
gcloud builds submit --tag $REGION-docker.pkg.dev/PROJECT_ID/REPOSITORY/helloworld-events:v1
```

```bash
gcloud run deploy helloworld-events \
    --image $REGION-docker.pkg.dev/PROJECT_ID/REPOSITORY/helloworld-events:v1 \
    --allow-unauthenticated
```

### Create the Eventarc trigger

```bash
gcloud eventarc triggers create events-quickstart-trigger \
    --destination-run-service=helloworld-events \
    --destination-run-region=${REGION} \
    --event-filters="type=google.cloud.audit.log.v1.written" \
    --event-filters="serviceName=storage.googleapis.com" \
    --event-filters="methodName=storage.objects.create" \
    --service-account=PROJECT_NUMBER-compute@developer.gserviceaccount.com
```

```bash
gcloud eventarc triggers list --location=${REGION}
```

### Generate and view an event

```bash
echo "Hello World" > random.txt
gcloud storage cp random.txt gs://events-quickstart-PROJECT_ID/random.txt
```

```bash
gcloud logging read 'textPayload: "Detected change in Cloud Storage bucket"'
```

Expected log line:

```text
Detected change in Cloud Storage bucket: storage.googleapis.com/projects/_/buckets/BUCKET_NAME/objects/random.txt
```

### Clean up

```bash
gcloud projects delete PROJECT_ID
```

## Options / Props

### Required roles for the quickstart (on the project)

| Role | Role ID |
|---|---|
| Cloud Build Editor | `roles/cloudbuild.builds.editor` |
| Cloud Run Admin | `roles/run.admin` |
| Eventarc Admin | `roles/eventarc.admin` |
| Logs View Accessor | `roles/logging.viewAccessor` |
| Project IAM Admin | `roles/resourcemanager.projectIamAdmin` |
| Service Account Admin | `roles/iam.serviceAccountAdmin` |
| Service Account User | `roles/iam.serviceAccountUser` |
| Service Usage Admin | `roles/serviceusage.serviceUsageAdmin` |
| Storage Admin | `roles/storage.admin` |

### Trigger event filters

| Filter | Value |
|---|---|
| `type` | `google.cloud.audit.log.v1.written` |
| `serviceName` | `storage.googleapis.com` |
| `methodName` | `storage.objects.create` |

## Notes

- Data Access audit logs must be enabled for the service (here Cloud Storage: Admin Read, Data Read and Data Write) or the audit-log event is never generated. Editing the project IAM policy is a read-modify-write: keep `bindings:` and `etag:` unchanged, and repeat from the read step on a conflict.
- Adapted from the official docs: the `auditConfigs` snippet had lost its YAML nesting in the source (`- auditLogConfigs:` followed by `- logType:` entries at the same indentation); the `logType` entries are nested under `auditLogConfigs`.
- The quickstart uses the Compute Engine default service account for testing. The source says: "For production environments, we strongly recommend creating a new service account and granting it one or more IAM roles that contain the minimum permissions required and follow the principle of least privilege." It also recommends enforcing the `iam.automaticIamGrantsForDefaultServiceAccounts` organization policy constraint and replacing the Editor role on the default service account with less permissive roles.
- `--allow-unauthenticated` makes the Cloud Run service callable by anyone with its URL. The source notes that for projects with domain restricted sharing organization policies you should use an authenticated Cloud Run target service; for an authenticated service grant `roles/run.invoker` to the trigger service account (see `roles-permissions.md`).
- The Token Creator and Event Receiver grants are project-level bindings in the source. The Token Creator grant applies only to Pub/Sub service agents enabled on or before April 8, 2021.
- Creating the first trigger in a project may fail while the Eventarc service agent is provisioned; retry. A trigger can take up to two minutes to become functional.
- Cleanup deletes the project or the individual resources (image, bucket, trigger). The source cautions: "Everything in the project is deleted." and "Custom project IDs are lost." Try this on a disposable project first.
- The source also shows Console steps and the Go, Java and .NET receiver clones.
- Source: https://docs.cloud.google.com/eventarc/standard/docs/run/create-trigger-cloud-audit-logs-gcloud (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [determining-filters-cal.md](./determining-filters-cal.md)
- [roles-permissions.md](./roles-permissions.md)
- [event-receivers.md](./event-receivers.md)
- [managing-triggers.md](./managing-triggers.md)
