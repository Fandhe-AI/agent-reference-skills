---
source: https://docs.cloud.google.com/eventarc/advanced/docs/publish-events/publish-events-google-sources
---

# Publish events from Google sources (GoogleApiSource)

Creating a `GoogleApiSource` resource enables collecting and publishing events from Google sources (for example the creation of a Cloud Run function or a status change of a Dataflow job) to a specific Eventarc Advanced bus. Events produced when a log is written through Cloud Audit Logs are not included.

## Signature / Usage

### Enable events from Google sources (gcloud)

Adapted (not in the official docs): `--location=REGION` is added because `gcloud eventarc google-api-sources create` needs a location (argument or `eventarc/location` property) and the source example omits it.

```bash
gcloud eventarc google-api-sources create GOOGLE_API_SOURCE_NAME \
    --location=REGION \
    --destination-message-bus=BUS_NAME \
    --destination-message-bus-project=BUS_PROJECT_ID
```

### Enable events from Google sources (REST)

Method: `projects.locations.googleApiSources.create`; `DESTINATION` has the format `projects/PROJECT_NAME/locations/LOCATION/messageBuses/BUS_NAME`.

```bash
cat > request.json << 'EOF'
{
  "displayName": "GOOGLE_API_SOURCE_NAME",
  "labels": {"LABEL_KEY":"LABEL_VALUE"},
  "annotations": {"ANNOTATION_KEY":"ANNOTATION_VALUE"},
  "destination": "DESTINATION",
  "cryptoKeyName": "ENCRYPT_KEY",
  "loggingConfig": {"logSeverity":"LOG_SEVERITY"}
}
EOF
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://eventarc.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/googleApiSources?googleApiSourceId=GOOGLE_API_SOURCE_NAME"
```

### Disable events from Google sources

```bash
gcloud eventarc google-api-sources delete GOOGLE_API_SOURCE_NAME \
    --location=REGION
```

```bash
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://eventarc.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/googleApiSources/GOOGLE_API_SOURCE_NAME"
```

### Publish events from multiple projects (Preview)

Step 1: grant the Eventarc service agent the collector role at the organization level.

Adapted (not in the official docs): `--member` gets the `serviceAccount:` prefix that `add-iam-policy-binding` requires for a service account email.

```bash
gcloud organizations add-iam-policy-binding ORGANIZATION_ID \
    --member="serviceAccount:SERVICE_AGENT_EMAIL" \
    --role="roles/eventarc.multiProjectEventCollector"
```

`SERVICE_AGENT_EMAIL` is the Eventarc primary service agent of the project where you create the `GoogleApiSource`:

```bash
service-PROJECT_NUMBER@gcp-sa-eventarc.iam.gserviceaccount.com
```

```bash
gcloud projects describe PROJECT_ID --format='value(projectNumber)'
```

Step 2a: publish from all projects in the same organization:

```bash
gcloud eventarc google-api-sources create GOOGLE_API_SOURCE_NAME \
    --location=REGION \
    --destination-message-bus=BUS_NAME \
    --destination-message-bus-project=BUS_PROJECT_ID \
    --organization-subscription
```

Step 2b: publish from a list of projects in the same organization:

```bash
gcloud eventarc google-api-sources create GOOGLE_API_SOURCE_NAME \
    --location=REGION \
    --destination-message-bus=BUS_NAME \
    --destination-message-bus-project=BUS_PROJECT_ID \
    --project-subscriptions=LIST_OF_PROJECTS
```

## Options / Props

### Limits and conditions

| Item | Detail |
|---|---|
| Quota | One `GoogleApiSource` resource per Google Cloud project per region. |
| Default collection scope | Events from the project where the `GoogleApiSource` exists. |
| Bus in another project | Supported via gcloud CLI or the Eventarc API, not the Console. |
| Multiple projects | Preview; projects must be in the same organization as the `GoogleApiSource`; configure via gcloud only (not shown in the Console). |
| `LIST_OF_PROJECTS` | Comma-delimited project IDs or numbers (may be mixed). The project containing the `GoogleApiSource` must be included explicitly to publish its events. |

### `gcloud eventarc google-api-sources create` flags

| Flag | Description |
|---|---|
| `--destination-message-bus`, `--destination-message-bus-project` | Required: bus ID and the bus project ID. |
| `--location` | Location of the `GoogleApiSource` (or `eventarc/location` property). |
| `--async` | Return without waiting for the operation. |
| `--crypto-key` | Customer-managed encryption key; default is Google-managed keys. |
| `--logging-config` | One of `NONE`, `DEBUG`, `INFO`, `NOTICE`, `WARNING`, `ERROR`, `CRITICAL`, `ALERT`, `EMERGENCY`. |
| `--organization-subscription` / `--no-organization-subscription` | At most one of this or `--project-subscriptions`. |
| `--project-subscriptions` | List of projects to collect from. |

## Notes

- Preview: publishing events from multiple projects is subject to the "Pre-GA Offerings Terms" and may have limited support.
- If the project containing the `GoogleApiSource` moves to a different organization, multi-project publishing stops working as expected; update or re-create the `GoogleApiSource`.
- Permissive: the multi-project grant is made on the organization (`roles/eventarc.multiProjectEventCollector` to the Eventarc service agent), as the source does; it lets the service agent collect events across the organization.
- Irreversible: deleting the `GoogleApiSource` stops collection and publishing of Google source events for that project. Try it on a disposable project first.
- Corrected from the official docs: the first gcloud example had no `--location`; the multi-project `--member` was the bare email without `serviceAccount:`.
- The source also shows Console, PowerShell and APIs Explorer forms.
- Source: https://docs.cloud.google.com/eventarc/advanced/docs/publish-events/publish-events-google-sources (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/eventarc/google-api-sources/create (gcloud 593.0.0 help, for `--location`, `--labels` and the flag group)

## Related

- [create-bus.md](./create-bus.md)
- [create-enrollment.md](./create-enrollment.md)
