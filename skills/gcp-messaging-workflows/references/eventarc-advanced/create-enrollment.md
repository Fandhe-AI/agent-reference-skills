---
source: https://docs.cloud.google.com/eventarc/advanced/docs/receive-events/create-enrollment
---

# Create an enrollment and pipeline to receive events (Eventarc Advanced)

An enrollment is a subscription to a bus: it holds a CEL match expression that decides which messages are routed, and names the pipeline they go through. A pipeline defines one target destination and can optionally transform matched events before delivery. With gcloud and REST, create the pipeline first, then the enrollment.

## Signature / Usage

### Create a pipeline (gcloud)

```bash
gcloud eventarc pipelines create PIPELINE_NAME \
    --destinations=DESTINATION_KEY \
    --location=LOCATION
```

Alternatively set the default location:

```bash
gcloud config set eventarc/location LOCATION
```

Adapted (not in the official docs): the service account domain `gserviceaccount.iam.com` in the source example is corrected to `iam.gserviceaccount.com`; the rest is unchanged. The `--destinations` value is a dict; the example authenticates with an OAuth token against a non-Google URL, which the source says is generally for `*.googleapis.com` only (use `google_oidc_authentication_service_account` for other endpoints).

```bash
gcloud eventarc pipelines create my-pipeline \
    --destinations=http_endpoint_uri='https://example-endpoint.com',oauth_token_authentication_service_account=example-service-account@example-project.iam.gserviceaccount.com,oauth_token_authentication_scope='https://www.googleapis.com/auth/cloud-platform',output_payload_format_avro_schema_definition='{"type": "record","name": "my_record", "fields": [{"name": "my_field", "type":"string"}]}' \
    --input-payload-format-avro-schema-definition='{"type":"record", "name": "my_record", "fields": [{"name": "my_field","type": "string"}]}' \
    --location=us-central1 \
    --async
```

Transformation (`--mediations`; one mediation per pipeline, `transformation_template` is the only template; an input format flag is required):

Adapted (not in the official docs): the gcloud help example wraps its lines in the middle of tokens (`'https://example-endpoint.com'-\` followed by `-mediations`, and a split `"data.cre` / `dit_card_number"` literal); the lines are joined, and `--input-payload-format-json=` is added because a transformation requires an input format.

```bash
gcloud eventarc pipelines create my-pipeline \
    --location=us-central1 \
    --destinations=http_endpoint_uri='https://example-endpoint.com' \
    --mediations=transformation_template='message.removeFields(["data.credit_card_number","data.ssn"])' \
    --input-payload-format-json=
```

To use another delimiter than `#` in `--destinations` / `--mediations` values:

```text
--destinations=^;^DESTINATION_KEY
```

### Create an enrollment (gcloud)

```bash
gcloud eventarc enrollments create ENROLLMENT_NAME \
    --cel-match=MATCH_EXPRESSION \
    --destination-pipeline=PIPELINE_NAME \
    --message-bus=BUS_NAME \
    --message-bus-project=PROJECT_ID \
    --location=LOCATION
```

```bash
gcloud eventarc enrollments create my-enrollment \
    --cel-match="message.type == 'google.cloud.dataflow.job.v1beta3.statusChanged'" \
    --destination-pipeline=my-pipeline \
    --message-bus=my-message-bus \
    --message-bus-project=another-google-cloud-project \
    --location=us-central1 \
    --async
```

### Create a pipeline (REST)

Method: `projects.locations.pipelines.create`; one destination only.

Adapted (not in the official docs): `regions` in the `name` is corrected to `locations` (the resource name format and the request URL use `locations`); the query parameter is `pipelineId` as in the Discovery document (source: `pipeline_id`).

```bash
cat > request.json << 'EOF'
{
  "name": "projects/PROJECT_ID/locations/LOCATION/pipelines/PIPELINE_NAME",
  "labels": {"LABEL_KEY":"LABEL_VALUE"},
  "annotations": {"ANNOTATION_KEY":"ANNOTATION_VALUE"},
  "loggingConfig": {"logSeverity":"LOG_SEVERITY"},
  "destinations": [{"httpEndpoint": {"uri": "HTTP_URI"},
  "authenticationConfig": {"googleOidc": {"serviceAccount": "SERVICE_ACCOUNT_EMAIL"}}}]
}
EOF
```

Adapted (not in the official docs): the query parameter is `pipelineId` as in the Discovery document (source: `pipeline_id`).

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://eventarc.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/pipelines?pipelineId=PIPELINE_NAME"
```

### Create an enrollment (REST)

Method: `projects.locations.enrollments.create`.

Adapted (not in the official docs): body fields use the Discovery names `displayName`, `celMatch`, `messageBus` (source: `display_name`, `cel_match`, `message_bus`); the query parameter is `enrollmentId` (source: `enrollment_id`).

```bash
cat > request.json << 'EOF'
{
  "displayName": "ENROLLMENT_NAME",
  "celMatch": "MATCH_EXPRESSION",
  "messageBus": "projects/BUS_PROJECT_ID/locations/BUS_LOCATION/messageBuses/BUS_NAME",
  "destination": "projects/PROJECT_ID/locations/LOCATION/pipelines/PIPELINE_NAME"
}
EOF
```

Adapted (not in the official docs): the query parameter is `enrollmentId` as in the Discovery document (source: `enrollment_id`).

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://eventarc.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/enrollments?enrollmentId=ENROLLMENT_NAME"
```

### List and delete

```bash
gcloud eventarc enrollments list \
    --location=LOCATION
```

```bash
gcloud eventarc pipelines list \
    --location=LOCATION
```

```bash
gcloud eventarc enrollments delete ENROLLMENT_NAME \
      --location=LOCATION
```

```bash
gcloud eventarc pipelines delete PIPELINE_NAME \
      --location=LOCATION
```

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://eventarc.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/enrollments"
```

```bash
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://eventarc.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/pipelines/PIPELINE_NAME"
```

## Options / Props

### Required roles

| Action | Role (on the named project) | Permission |
|---|---|---|
| Create a pipeline | `roles/eventarc.developer` on the pipeline project | `eventarc.pipelines.create` |
| Create an enrollment | `roles/eventarc.developer` on the enrollment project | `eventarc.enrollments.create` |
| Use a bus | `roles/eventarc.messageBusUser` on the bus project | `eventarc.buses.use` |

### Constraints

| Item | Detail |
|---|---|
| Pipeline and enrollment | Must be in the same project; the subscribed bus may be in another project. |
| Pipeline reuse | One pipeline can serve multiple enrollments. |
| Destinations per pipeline | Only one. |
| Pipeline region | Same region as the bus (Console); a bus destination must be in the same project and region as the pipeline. |
| Create / delete duration | Creating or deleting a pipeline might take more than 10 minutes. |
| Default match expression | Console default `true` routes all messages unfiltered. |
| Transformation | Requires an input format (`--input-payload-format-*`); an output format can't be set without an input format; one mediation per pipeline. |

### `--destinations` keys (set exactly one destination key)

| Key | Description |
|---|---|
| `http_endpoint_uri` | Destination URI; host is a static IP reachable from a VPC network or an internal Cloud DNS hostname (Cloud Run URLs, BigQuery tables, Cloud Run jobs, Cloud Run functions). Optional `http_endpoint_message_binding_template`; required for Cloud Run jobs. |
| `message_bus` | Bus ID; same project and region as the pipeline. |
| `pubsub_topic` | Topic ID; must exist first, same project as the pipeline; transform the message if the topic has a schema. |
| `workflow` | Workflow ID; deployed in the same project as the pipeline. |
| `google_oidc_authentication_service_account` | Service account email for an OIDC token; optional `google_oidc_authentication_audience` (generally the target URL; if unset the entire URL including request parameters is used). Set one authentication key. |
| `oauth_token_authentication_service_account` | Service account email for an OAuth token (generally only for `*.googleapis.com`); optional `oauth_token_authentication_scope` (default `https://www.googleapis.com/auth/cloud-platform`). Requests to another Eventarc Advanced bus, Pub/Sub or Workflows need an OAuth token. |
| `output_payload_format_avro_schema_definition`, `output_payload_format_json`, `output_payload_format_protobuf_schema_definition` | Optional, at most one; requires an input format. |
| `project`, `location` | Optional, only when `http_endpoint_uri` is not used; default to the pipeline's project and location. |

### Other `gcloud eventarc pipelines create` flags

| Flag | Description |
|---|---|
| `--async` | Return without waiting. |
| `--crypto-key` | Customer-managed key; default Google-managed. |
| `--logging-config` | `NONE`, `DEBUG`, `INFO`, `NOTICE`, `WARNING`, `ERROR`, `CRITICAL`, `ALERT`, `EMERGENCY`. |
| `--mediations` | `transformation_template` only; one per pipeline. |
| `--input-payload-format-avro-schema-definition`, `--input-payload-format-json`, `--input-payload-format-protobuf-schema-definition` | Input format (one of). |
| `--max-retry-attempts`, `--max-retry-delay`, `--min-retry-delay` | Retry policy (help defaults: 5 attempts, delays 1 s to 60 s, exponential backoff). |

## Notes

- Authorization: Cloud Run checks IAM on every request; `run.routes.invoke` can be granted to selected service accounts or groups, or to `allUsers` for public access (the source lists both; the second opens the service publicly).
- Per the Discovery document for the OIDC / OAuth fields, the Eventarc service agent must have `roles/iam.serviceAccountTokenCreator` for the pipeline to create tokens, and the caller needs `iam.serviceAccounts.actAs` on the service account.
- Irreversible: deleting enrollments or pipelines stops routing for them. Try it on a disposable project first.
- Corrected from the official docs: `gserviceaccount.iam.com` -> `iam.gserviceaccount.com`; REST `projects/PROJECT_ID/regions/LOCATION/pipelines/...` -> `locations`; `display_name` / `cel_match` / `message_bus` -> `displayName` / `celMatch` / `messageBus`; `pipeline_id` / `enrollment_id` -> `pipelineId` / `enrollmentId`.
- Adapted from the official docs: the `--mediations` example is the gcloud help example for a transformation mediation, joined where the help text wraps mid-token (`-\` / `-mediations`, `"data.cre\` / `dit_card_number"`), plus the required input format flag. Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/eventarc/pipelines/create (gcloud 593.0.0 help). The source page's own inline example is wrapped the same way (`message.removeFields(["id\` / `","credit_card_number","age"])`).
- The source also shows Console, PowerShell and APIs Explorer forms and the response bodies of list / create operations.
- Source: https://docs.cloud.google.com/eventarc/advanced/docs/receive-events/create-enrollment (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-bus.md](./create-bus.md)
- [use-cel.md](./use-cel.md)
- [publish-events-google-sources.md](./publish-events-google-sources.md)
