---
source: https://docs.cloud.google.com/eventarc/standard/docs/vpc-endpoints/route-vpc-internal-endpoint-events
---

# Route events to an internal HTTP endpoint in a VPC network

Preview. Eventarc Standard can deliver events as CloudEvents over HTTP to an internal HTTP endpoint (an internal IP address or an FQDN) in a VPC network, such as a Compute Engine VM or an internal Application Load Balancer, without exposing the workload to the public internet. A network attachment in the same network and region as the destination lets Eventarc connect to the endpoint. Triggers can capture direct events, Cloud Audit Logs events or third-party events.

## Signature / Usage

### Prepare

```bash
gcloud services enable logging.googleapis.com \
  eventarc.googleapis.com \
  eventarcpublishing.googleapis.com
```

If applicable, also enable the API related to the events (for example `cloudfunctions.googleapis.com` for Cloud Run functions events). Create a user-managed service account:

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME
```

If the endpoint URI uses an internal DNS name resolvable by Cloud DNS, grant `roles/dns.peer` on the VPC host project to the Eventarc service agent (the host project might also be the trigger project):

```bash
gcloud projects add-iam-policy-binding VPC_HOST_PROJECT_ID \
    --member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-eventarc.iam.gserviceaccount.com \
    --role=roles/dns.peer
```

For direct events from Cloud Storage, grant `roles/pubsub.publisher` on the project to the Cloud Storage service agent:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:service-PROJECT_NUMBER@gs-project-accounts.iam.gserviceaccount.com \
    --role=roles/pubsub.publisher
```

Find the project number:

```bash
gcloud projects describe PROJECT_ID --format='value(projectNumber)'
```

### Create a trigger: direct events

Adapted (not in the official docs): removed the stray closing `"` after `.iam.gserviceaccount.com` in the last line of the source template, which left an unbalanced quote.

```bash
gcloud eventarc triggers create TRIGGER \
    --location=LOCATION \
    --destination-http-endpoint-uri=ENDPOINT_URI \
    --network-attachment=NETWORK_ATTACHMENT_ID \
    --event-filters="type=EVENT_FILTER_TYPE" \
    --event-filters="COLLECTION_ID=RESOURCE_ID" \
    --event-filters-path-pattern="COLLECTION_ID=PATH_PATTERN" \
    --service-account=SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com
```

Example:

```sh
gcloud eventarc triggers create helloworld-trigger \
    --location=us-central1 \
    --destination-http-endpoint-uri=http://my-vm.us-central1-a.c.my-project.internal \
    --network-attachment="projects/my-project/regions/us-central1/networkAttachments/my-attachment-name" \
    --event-filters="type=google.cloud.pubsub.topic.v1.messagePublished" \
    --service-account=my-service-account@my-project.iam.gserviceaccount.com
```

### Create a trigger: Cloud Audit Logs events

Adapted (not in the official docs): removed the stray closing `"` after `.iam.gserviceaccount.com`, as above.

```bash
gcloud eventarc triggers create TRIGGER \
    --location=LOCATION \
    --destination-http-endpoint-uri=ENDPOINT_URI \
    --network-attachment=NETWORK_ATTACHMENT_ID \
    --event-filters="type=google.cloud.audit.log.v1.written" \
    --event-filters="serviceName=SERVICE_NAME" \
    --event-filters="methodName=METHOD_NAME" \
    --service-account=SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com
```

Example:

```sh
gcloud eventarc triggers create helloworld-trigger \
    --location=us-central1 \
    --destination-http-endpoint-uri=http://10.10.10.2 \
    --network-attachment="projects/my-project/regions/us-central1/networkAttachments/my-attachment" \
    --event-filters="type=google.cloud.audit.log.v1.written" \
    --event-filters="serviceName=eventarc.googleapis.com" \
    --event-filters="methodName=google.cloud.eventarc.v1.Eventarc.GetTrigger" \
    --event-filters="resourceName=projects/my-project/locations/us-central1/triggers/my-trigger" \
    --service-account=my-service-account@my-project.iam.gserviceaccount.com
```

### Create a trigger: third-party events

Adapted (not in the official docs): removed the stray closing `"` after `.iam.gserviceaccount.com`, as above.

```bash
gcloud eventarc triggers create TRIGGER \
    --location=LOCATION \
    --destination-http-endpoint-uri=ENDPOINT_URI \
    --network-attachment=NETWORK_ATTACHMENT_ID \
    --event-filters="type=EVENT_FILTER_TYPE" \
    --channel=CHANNEL_NAME \
    --project=PROJECT_ID \
    --service-account=SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com
```

Example:

```sh
gcloud eventarc triggers create helloworld-trigger \
    --location=us-central1 \
    --destination-http-endpoint-uri=http://my-vm.us-central1-a.c.my-project.internal \
    --network-attachment="projects/my-project/regions/us-central1/networkAttachments/my-attachment-name" \
    --event-filters="type=third-party-event-type" \
    --channel=my-channel \
    --project=my-project-ID \
    --service-account=my-service-account@my-project.iam.gserviceaccount.com
```

### List triggers

```bash
gcloud eventarc triggers list --location=-
```

## Options / Props

### Limits and supported locations

| Item | Value |
|------|-------|
| Triggers per DNS name | At most one Eventarc trigger for the same DNS name |
| Triggers for internal HTTP endpoints | 100 per project |
| Reserved subnet range | Eventarc reserves `240.0.0.0/20`; the network attachment subnet must not overlap it |
| Trigger locations (supported list in the limits section and in the gcloud steps) | `asia-east1`, `europe-north1`, `europe-west1`, `us-central1`, `us-east1` |
| Trigger locations (Console steps text) | `asia-east1`, `europe-north1`, `europe-west1`, `us-east1` (the source's Console steps omit `us-central1`, which its other lists include) |

### Supported event types

| Type | Description |
|------|-------------|
| Direct events | Unmediated events, such as an object update in a Cloud Storage bucket or a message published to a Pub/Sub topic |
| Cloud Audit Logs events | Triggered when a log is produced through Cloud Audit Logs |
| Third-party events | Events of a non-Google provider that offers an Eventarc source |

### Flag placeholders

| Placeholder | Meaning |
|-------------|---------|
| `LOCATION` | Trigger location; alternatively set the `eventarc/location` property (for example `gcloud config set eventarc/location us-central1`). Should match the location of the service generating events |
| `ENDPOINT_URI` | Static internal IP address in the VPC network addressed by the network attachment, or an internal DNS name resolvable by Cloud DNS |
| `NETWORK_ATTACHMENT_ID` | Identifier generated after you create a network attachment |
| `EVENT_FILTER_TYPE` | Event identifier; required via `--event-filters="type=..."`; cannot be changed after creation |
| `COLLECTION_ID` (optional) | Resource component that can act as a filter (for Cloud Run functions, `function`) |
| `RESOURCE_ID` / `PATH_PATTERN` | Filter value, or a path pattern used with `--event-filters-path-pattern` |
| `SERVICE_NAME` / `METHOD_NAME` | Audit log `serviceName` and `methodName`; both required with `type=google.cloud.audit.log.v1.written` |
| `CHANNEL_NAME` | Channel for third-party events |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms"; Pre-GA features are available "as is" and might have limited support.
- A network attachment (regional resource, created in the same network and region as the destination service; networking is covered by `gcp-networking`) is required before creating the trigger. Eventarc can update the attachment's accept list with the project ID without intervention.
- If the endpoint uses an internal DNS name, Eventarc automatically creates DNS peering zones and forwards DNS requests to the DNS zones in the target VPC network.
- The source examples use plain `http://` URIs to internal endpoints inside the VPC; this is the source's form, so check the transport requirements of your own workload.
- Filters are exact matches; wildcards and regular expressions are not supported (except `--event-filters-path-pattern`, used for direct and audit log events). Multiple filters are ANDed: only events matching all filters are sent.
- For audit log triggers, `--event-filters="resourceName=VALUE"` (full resource path) or `--event-filters-path-pattern="resourceName=VALUE"` is optional; omit it for dynamically created resources. After creation the event filter type cannot be changed; create a new trigger and delete the earlier one.
- A trigger is created immediately but can take up to two minutes to propagate and filter events.
- Trigger name (Console): starts with a letter, up to 63 lowercase letters, numbers or hyphens. Service account name: 6 to 30 characters, lowercase alphanumerics and dashes; it cannot be renamed.
- Event data content type (Console, where applicable): `application/json` or `application/protobuf`; JSON payloads are larger than Protobuf, which can affect reliability against destination size limits.
- Permissive: as in the source, `roles/dns.peer` is granted on the VPC host project and `roles/pubsub.publisher` on the project to the service agents named above (project-level grants); the source offers no narrower form. Create the trigger service account as a dedicated user-managed account (the source creates one) and grant it only what the endpoint needs.
- The source also shows Console steps; no Terraform or client-library forms.
- Source: https://docs.cloud.google.com/eventarc/standard/docs/vpc-endpoints/route-vpc-internal-endpoint-events (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the source template ended with `--service-account=SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com"` (unbalanced closing quote); the quote was removed.

## Related

- [third-parties-overview.md](./third-parties-overview.md)
- [create-channels.md](./create-channels.md)
- [create-trigger-thirdparty.md](./create-trigger-thirdparty.md)
- [retry-events.md](./retry-events.md)
