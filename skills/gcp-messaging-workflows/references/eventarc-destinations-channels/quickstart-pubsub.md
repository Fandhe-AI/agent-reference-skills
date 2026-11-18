---
source: https://docs.cloud.google.com/eventarc/standard/docs/gke/quickstart-pubsub
---

# Receive Pub/Sub events at a GKE service (gcloud CLI quickstart)

Preview. Sets up a GKE service as an Eventarc Standard destination for Pub/Sub topic events: enable APIs, create an Autopilot cluster, run `gcloud eventarc gke-destinations init`, deploy a service, create a trigger, publish a message and read the pod log. GKE destinations include the public endpoints of private and public services running in a GKE cluster. For each trigger that targets a GKE service, Eventarc creates an event forwarder component that pulls events from Pub/Sub and forwards them to the target.

## Signature / Usage

### Prepare

```bash
gcloud components update
```

```bash
gcloud services enable eventarc.googleapis.com \
   cloudresourcemanager.googleapis.com \
   container.googleapis.com
```

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
PROJECT_ID="$(gcloud config get-value project)"
CLUSTER_NAME=events-cluster
SERVICE_NAME=hello-gke
LOCATION=us-central1
```

Find the project number (used in the Compute Engine default service account email `PROJECT_NUMBER-compute@developer.gserviceaccount.com`):

```bash
gcloud projects describe PROJECT_ID --format='value(projectNumber)'
```

Grant the Pub/Sub Subscriber role on the project to the service account that the trigger will use, so the trigger can pull events from Pub/Sub:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com \
    --role=roles/pubsub.subscriber
```

If you enabled the Cloud Pub/Sub service agent on or before April 8, 2021, grant it Service Account Token Creator (otherwise this role is granted by default):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com \
    --role=roles/iam.serviceAccountTokenCreator
```

### Create a GKE cluster

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud container clusters create-auto "${CLUSTER_NAME}" \
    --region "${LOCATION}"
```

### Enable GKE destinations

Answer `y` at the prompt to bind the required roles to the Eventarc service agent (`compute.viewer`, `container.developer`, `iam.serviceAccountAdmin`).

```bash
gcloud eventarc gke-destinations init
```

### Deploy the GKE service

Prebuilt image `us-docker.pkg.dev/cloudrun/container/hello`:

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud container clusters get-credentials "${CLUSTER_NAME}" \
    --region "${LOCATION}"
```

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
kubectl create deployment "${SERVICE_NAME}" \
    --image=us-docker.pkg.dev/cloudrun/container/hello
```

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
kubectl expose deployment "${SERVICE_NAME}" \
    --type ClusterIP \
    --port 80 \
    --target-port 8080
```

### Create the trigger (new Pub/Sub topic)

Creates a new Pub/Sub topic and a trigger named `gke-trigger-pubsub`.

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud eventarc triggers create gke-trigger-pubsub \
    --location="$LOCATION" \
    --destination-gke-cluster="${CLUSTER_NAME}" \
    --destination-gke-location="${LOCATION}" \
    --destination-gke-namespace=default \
    --destination-gke-service="${SERVICE_NAME}" \
    --destination-gke-path=/ \
    --event-filters="type=google.cloud.pubsub.topic.v1.messagePublished" \
    --service-account="PROJECT_NUMBER-compute@developer.gserviceaccount.com"
```

### Create the trigger (existing Pub/Sub topic)

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud eventarc triggers create gke-trigger-pubsub \
    --location="$LOCATION" \
    --destination-gke-cluster="${CLUSTER_NAME}" \
    --destination-gke-location="${LOCATION}" \
    --destination-gke-namespace=default \
    --destination-gke-service="${SERVICE_NAME}" \
    --destination-gke-path=/ \
    --event-filters="type=google.cloud.pubsub.topic.v1.messagePublished" \
    --service-account="PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
    --transport-topic=projects/PROJECT_ID/topics/TOPIC_ID
```

### Confirm the trigger

It can take up to two minutes for the trigger to be fully functional.

```bash
gcloud eventarc triggers list
```

```text
NAME: gke-trigger-pubsub
TYPE: google.cloud.pubsub.topic.v1.messagePublished
DESTINATION: GKE: hello-gke
ACTIVE: Yes
LOCATION: us-central1
```

### Generate and view an event

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
TOPIC="$(gcloud eventarc triggers describe gke-trigger-pubsub \
    --location=us-central1 \
    --format='value(transport.pubsub.topic)')"
```

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud pubsub topics publish "${TOPIC}" --message="Hello World"
```

```bash
kubectl get pods
```

```bash
kubectl logs NAME
```

```text
2022/02/24 22:23:49 Hello from Cloud Run! The container started successfully and is listening for HTTP requests on $PORT
{"severity":"INFO","eventType":"google.cloud.pubsub.topic.v1.messagePublished","message":"Received event of type google.cloud.pubsub.topic.v1.messagePublished. Event data: Hello World"[...]}
```

### Clean up

Deleting the trigger also deletes the associated Pub/Sub topic. Deleting the project deletes everything in it.

```bash
gcloud projects delete PROJECT_ID
```

## Options / Props

### Required roles (on the project, for the person running the quickstart)

| Role | ID |
|------|----|
| Eventarc Admin | `roles/eventarc.admin` |
| Kubernetes Engine Admin | `roles/container.admin` |
| Logs View Accessor | `roles/logging.viewAccessor` |
| Project IAM Admin | `roles/resourcemanager.projectIamAdmin` |
| Pub/Sub Publisher | `roles/pubsub.publisher` |
| Service Account Admin | `roles/iam.serviceAccountAdmin` |
| Service Account User | `roles/iam.serviceAccountUser` |
| Service Usage Admin | `roles/serviceusage.serviceUsageAdmin` |

### GKE destination flags on `gcloud eventarc triggers create`

| Flag | Value in the quickstart |
|------|-------------------------|
| `--destination-gke-cluster` | `$CLUSTER_NAME` (`events-cluster`) |
| `--destination-gke-location` | `$LOCATION` (`us-central1`) |
| `--destination-gke-namespace` | `default` |
| `--destination-gke-service` | `$SERVICE_NAME` (`hello-gke`) |
| `--destination-gke-path` | `/` |
| `--transport-topic` | Only for an existing topic: `projects/PROJECT_ID/topics/TOPIC_ID` |

## Notes

- Adapted from the official docs: unquoted shell variable expansions in the commands are double-quoted (`"${VAR}"`).
- Preview: subject to the "Pre-GA Offerings Terms"; Pre-GA products are available "as is" and might have limited support.
- The source uses the Compute Engine default service account as the trigger identity "for testing purposes" and says: "For production environments, we strongly recommend creating a new service account and granting it one or more IAM roles that contain the minimum permissions required" (least privilege). The `roles/pubsub.subscriber` and Token Creator grants above are project-level, as in the source.
- The source recommends enforcing the `iam.automaticIamGrantsForDefaultServiceAccounts` organization policy constraint (enforced by default for organizations created after May 3, 2024) so default service accounts do not get the Editor role automatically; a default service account that already has Editor should be moved to less permissive roles (check with Policy Simulator first).
- `gcloud eventarc gke-destinations init` binds roles to the Eventarc service agent; this page keeps only what the source shows. Cluster creation flags are covered by `gcp-gke`.
- Deleting the project or cluster is irreversible; try this quickstart in a disposable project first.
- The source shows only gcloud and kubectl commands (no Console, Terraform or client-library forms).
- Source: https://docs.cloud.google.com/eventarc/standard/docs/gke/quickstart-pubsub (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-trigger-thirdparty.md](./create-trigger-thirdparty.md)
- [retry-events.md](./retry-events.md)
- [route-vpc-internal-endpoint-events.md](./route-vpc-internal-endpoint-events.md)
