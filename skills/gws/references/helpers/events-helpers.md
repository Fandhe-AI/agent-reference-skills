# Events Helpers

Hand-crafted helpers for subscribing to Google Workspace Events and renewing existing subscriptions. Events are streamed as NDJSON.

## +subscribe

Subscribe to Workspace events and stream them as NDJSON. Creates Pub/Sub topics, subscriptions, and Workspace event bindings (multi-step orchestration).

### Usage

```bash
gws events +subscribe --target //drive.googleapis.com/drives/DRIVE_ID \
  --event-types google.workspace.drive.file.v1.created \
  --project MY_PROJECT_ID

# Use an existing Pub/Sub subscription
gws events +subscribe --subscription projects/MY_PROJECT/subscriptions/MY_SUB
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--target` | Yes (without `--subscription`) | Resource to subscribe to |
| `--event-types` | Yes (without `--subscription`) | Comma-separated event types to listen for |
| `--project` | Yes (without `--subscription`) | GCP project ID; or set `GOOGLE_WORKSPACE_PROJECT_ID` env var |
| `--subscription` | No | Existing Pub/Sub subscription name; skips resource creation |
| `--max-messages` | No | Maximum messages per pull request (default: 10) |
| `--poll-interval` | No | Seconds between polls (default: 2) |
| `--once` | No | Pull messages once and exit |
| `--cleanup` | No | Delete created Pub/Sub resources on exit |
| `--no-ack` | No | Skip acknowledging messages after processing |
| `--output-dir` | No | Directory for writing received events as JSON files |
| `--dry-run` | No | Preview actions without making changes |

## Notes

- When `--subscription` is omitted, all three of `--target`, `--event-types`, and `--project` are required.
- GCP project ID can also be provided via the `GOOGLE_WORKSPACE_PROJECT_ID` environment variable.
- `--once` is useful for single-shot polling in scripts; default mode is continuous.

---

## +renew

Renew or reactivate existing Workspace Events subscriptions.

### Usage

```bash
# Renew a single subscription
gws events +renew --name projects/MY_PROJECT/subscriptions/MY_SUB

# Renew all subscriptions expiring within 2 hours
gws events +renew --all --within 2h

# Preview without executing
gws events +renew --all --dry-run
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--name` | Yes (without `--all`) | Single subscription resource name to reactivate |
| `--all` | Yes (without `--name`) | Renew all subscriptions expiring within the threshold |
| `--within` | No | Duration threshold for identifying expiring subscriptions (default: `1h`) |
| `--dry-run` | No | Preview actions without making changes |

## Notes

- Either `--name` or `--all` must be provided; omitting both returns a validation error.
- `--within` duration supports units: `s` (seconds), `m` (minutes), `h` (hours), `d` (days).
- With `--all`, lists all subscriptions and filters those expiring within the specified duration, then reactivates matches.

## Related

- [helpers-overview.md](./helpers-overview.md)
