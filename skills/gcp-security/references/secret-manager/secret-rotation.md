---
source: https://docs.cloud.google.com/secret-manager/docs/secret-rotation
---

# Create rotation schedules in Secret Manager

Secret Manager schedules rotations by sending a `SECRET_ROTATE` message to the Pub/Sub topics configured on a secret at its `next_rotation_time`. You must run a Pub/Sub subscriber that acts on the message (for example by creating a new secret version and deploying it). Secret Manager does not rotate the value itself.

## Signature / Usage

### Create a secret with a rotation schedule (gcloud)

```bash
gcloud secrets create SECRET_ID \
  --replication-policy "automatic" \
  --next-rotation-time="NEXT_ROTATION_TIME" \
  --rotation-period="ROTATION_PERIOD" \
  --topics="FULL_TOPIC_NAME"
```

### Create a secret with a rotation schedule (REST)

```text
POST https://secretmanager.googleapis.com/v1/projects/PROJECT_ID/secrets?secretId=SECRET_ID
```

Adapted (not in the official docs): the source body is not valid JSON (single-quoted value, trailing comma) and uses `$PROJECT_ID` / `$TOPIC_NAME`, which are not expanded inside `request.json`; `topics` is a list in the REST API.

```json
{
  "replication": {
    "automatic": {}
  },
  "topics": [
    {"name": "projects/PROJECT_ID/topics/TOPIC_NAME"}
  ],
  "rotation": {
    "nextRotationTime": "2021-06-01T09:00:00Z",
    "rotationPeriod": "2592000s"
  }
}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://secretmanager.googleapis.com/v1/projects/PROJECT_ID/secrets?secretId=SECRET_ID"
```

### Update rotation settings (gcloud)

```bash
gcloud secrets update SECRET_ID \
  --next-rotation-time="NEXT_ROTATION_TIME"
```

### Update rotation settings (REST)

```text
PATCH https://secretmanager.googleapis.com/v1/projects/$PROJECT_ID/secrets/$SECRET_ID?updateMask=rotation.next_rotation_time
```

Adapted (not in the official docs): the body field `next_rotation_time` became `nextRotationTime` as named in the Discovery document, matching the create body above.

```json
{
  "rotation": {"nextRotationTime": "NEXT_ROTATION_TIME"}
}
```

```bash
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://secretmanager.googleapis.com/v1/projects/$PROJECT_ID/secrets/$SECRET_ID?updateMask=rotation.next_rotation_time"
```

### Disable rotation (gcloud)

Remove only `next_rotation_time`:

```bash
gcloud secrets update SECRET_ID \
    --remove-next-rotation-time
```

Remove the whole schedule (both `next_rotation_time` and `rotation_period`):

```bash
gcloud secrets update SECRET_ID \
    --remove-rotation-schedule
```

### Disable rotation (REST)

Send an empty body `{}` with `updateMask=rotation.next_rotation_time` (removes the next rotation time) or `updateMask=rotation` (removes the schedule):

```text
PATCH https://secretmanager.googleapis.com/v1/projects/$PROJECT_ID/secrets/$SECRET_ID?updateMask=rotation
```

```json
{}
```

## Options / Props

| Name | Description | Constraint |
|---|---|---|
| `SECRET_ID` | ID of the secret. | |
| `NEXT_ROTATION_TIME` | Timestamp of the first rotation, ISO 8601, for example `2021-06-01T09:00:00Z`. | Can't be less than five minutes in the future. Must be set if `rotation_period` is specified. |
| `ROTATION_PERIOD` | Interval in seconds, for example `2592000s`. | Can't be less than one hour. |
| `FULL_TOPIC_NAME` | Pub/Sub topic, `projects/your-project-id/topics/your-topic-name`. | Topics must be configured on the secret. |
| Updatable fields | `rotation`, `rotation.next_rotation_time`, `rotation.rotation_period`. | |

## Notes

- `next_rotation_time` is either user-defined (set on create or update) or, when `rotation_period` is set, calculated by Secret Manager: it sends `SECRET_ROTATE` after the period elapses and then advances `next_rotation_time`.
- Secret Manager retries failed delivery automatically but cannot guarantee delivery with misconfigured secret, topic, permissions or quotas. In-flight rotations (while Secret Manager is trying to send the message to Pub/Sub) must finish before another starts; scheduled rotations are skipped while one is in flight. Failed sends are retried for up to seven days, after which the rotation is canceled.
- The `$PROJECT_ID` / `$SECRET_ID` in the PATCH URLs and curl commands are shell variables you must set first; the original PATCH examples use them as written. For the create request the source uses `PROJECT_ID` placeholders.
- Corrected from the official docs: the REST create body showed `"topics": {"name" : "projects/$PROJECT_ID/topics/$TOPIC_NAME"}`, `"rotation_period" : '2592000s'` and a trailing comma; replaced by the valid JSON above (field names `nextRotationTime` / `rotationPeriod` as in the Discovery document). The update body `"rotation": {"next_rotation_time": "NEXT_ROTATION_TIME"}` was changed to `nextRotationTime` the same way.
- The example timestamp `2021-06-01T09:00:00Z` in the create body is in the past; `next_rotation_time` can't be less than five minutes in the future, so set a future time.
- The source also shows Console and Windows PowerShell / cmd.exe variants (omitted).
- Source: https://docs.cloud.google.com/secret-manager/docs/secret-rotation (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [rotation-recommendations.md](./rotation-recommendations.md)
- [creating-and-accessing-secrets.md](./creating-and-accessing-secrets.md)
