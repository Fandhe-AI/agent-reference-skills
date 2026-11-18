---
source: https://docs.cloud.google.com/eventarc/advanced/docs/publish-events/create-bus
---

# Create a bus to route messages (Eventarc Advanced)

An Eventarc Advanced bus centralizes, monitors and traces the flow of messages and acts as a router. It receives events from a message source or from a provider and evaluates them against enrollments (subscriptions that define matching criteria). A bus can be used by event providers and destinations in your project or in other projects. You can create one bus per Google Cloud project per supported region.

## Signature / Usage

### Create a bus (gcloud)

```bash
gcloud eventarc message-buses create BUS_NAME \
    --location=REGION
```

Optionally set the default location instead of passing `--location`:

```bash
gcloud config set eventarc/location REGION
```

### Create a bus (REST)

Method: `projects.locations.messageBuses.create`. The request returns a long-running `Operation` (`"done": false` at first); poll it before relying on the bus.

Adapted (not in the official docs): the body uses the Discovery field name `displayName` instead of `display_name`; `BUS_NAME`, `LABEL_KEY` and similar are placeholders to replace.

```bash
cat > request.json << 'EOF'
{
  "displayName": "BUS_NAME",
  "labels": {"LABEL_KEY":"LABEL_VALUE"},
  "annotations": {"ANNOTATION_KEY":"ANNOTATION_VALUE"},
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
     "https://eventarc.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/messageBuses?messageBusId=BUS_NAME"
```

### Delete a bus

```bash
gcloud eventarc message-buses delete BUS_NAME \
    --location=REGION
```

```bash
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://eventarc.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/messageBuses/BUS_NAME"
```

## Options / Props

### Required roles

| Action | Role | Permission |
|---|---|---|
| Create a bus (on the bus project) | `roles/eventarc.admin` (Eventarc Admin) or `roles/eventarc.messageBusAdmin` (Eventarc Message Bus Admin) | `eventarc.messageBuses.create` |
| Use a bus (on the bus project) | `roles/eventarc.messageBusUser` (Eventarc Message Bus User) | `eventarc.messageBuses.use` |

### `gcloud eventarc message-buses create` optional flags

| Flag | Description |
|---|---|
| `--async` | Return immediately without waiting for the operation to complete. |
| `--crypto-key` | Fully qualified name of a customer-managed encryption key; if unspecified, Google-owned and managed keys are used. |
| `--logging-config` | Minimum severity of events described in log entries: `NONE`, `DEBUG`, `INFO`, `NOTICE`, `WARNING`, `ERROR`, `CRITICAL`, `ALERT`, `EMERGENCY`. Default `NONE`. |
| `--labels` | Label `KEY=VALUE` pairs (present in gcloud 593.0.0 help). |

### REST request fields

| Field | Description |
|---|---|
| `displayName` | Optional display name. |
| `labels` | Optional map of label key/value pairs. |
| `annotations` | Optional map of free-form annotations. |
| `cryptoKeyName` | Optional Cloud KMS key, format `projects/PROJECT_ID/locations/LOCATION/keyRings/RING_NAME/cryptoKeys/KEY_NAME`. |
| `loggingConfig.logSeverity` | Same enum as `--logging-config`; default `NONE`. |
| `messageBusId` (query) | ID of the bus to create. |

## Notes

- Corrected from the official docs: the source writes the `cryptoKeyName` format with `PROJECT_NAME`; resource names contain the project ID (the Discovery pattern is `projects/{project}/...`), so the page uses `PROJECT_ID`.
- Corrected from the official docs: the source names the permission for using a bus `eventarc.buses.use`; the IAM roles and permissions reference for Eventarc lists `eventarc.messageBuses.use` in `roles/eventarc.messageBusUser` (https://docs.cloud.google.com/iam/docs/roles-permissions/eventarc).
- Required roles: Creating a pipeline and an enrollment needs additional permissions (see create-enrollment).
- Deleting a bus is irreversible: delete all associated enrollments first; message sources configured to use the deleted bus can no longer publish to it. Try it on a disposable project first.
- Corrected from the official docs: the REST body said `"display_name": "BUS_NAME"`; the Discovery document field is `displayName`.
- With the Console option **Cloud KMS key**, the Eventarc Service Agent may need `roles/cloudkms.cryptoKeyEncrypterDecrypter` on the key (the Console prompts to grant it); see the CMEK page for details.
- Adding a Google API message source in the Console (default name `google-api-source`) enables automatic collection of events from Google sources, but only for resources in the same project as the bus.
- The source also shows Console, PowerShell and APIs Explorer forms.
- Source: https://docs.cloud.google.com/eventarc/advanced/docs/publish-events/create-bus (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/eventarc/message-buses/create (gcloud 593.0.0 help, for the `--labels` flag)

## Related

- [publish-events-google-sources.md](./publish-events-google-sources.md)
- [create-enrollment.md](./create-enrollment.md)
- [use-cel.md](./use-cel.md)
