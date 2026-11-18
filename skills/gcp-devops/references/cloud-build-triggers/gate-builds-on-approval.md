---
source: https://docs.cloud.google.com/build/docs/securing-builds/gate-builds-on-approval
---

# Gate builds on approval

A trigger configured to require approval does not run its build immediately: the build stays pending until a user with the Cloud Build Approver role approves it. If the approval is rejected, the build never starts. This page covers granting the approver role, approving and rejecting builds, and notifications for pending builds.

## Signature / Usage

### Prerequisites

- Cloud Build API enabled (`serviceusage.services.enable`, for example via `roles/owner` or `roles/serviceusage.serviceUsageAdmin`).
- gcloud installed and up to date (`gcloud components update`).
- A build trigger configured to require approval (the Approval option, or `--require-approval` on `gcloud builds triggers create`).

### Grant the approver role

A user with the Cloud Build Editor role can update a trigger to require or not require approval. To let a user approve builds, grant them **Cloud Build Approver** (IAM page, Grant access, Cloud Build, Cloud Build Approver). If you add yourself you must still approve pending builds manually.

### Approve a pending build

Adapted (not in the official docs): the source writes `gcloud builds approve`, but gcloud 593.0.0 has `approve` only on the `beta` and `alpha` tracks; the track is changed to `beta`.

```bash
gcloud beta builds approve BUILD_ID \
  --project=PROJECT_ID \
  --url=URL \
  --comment=COMMENT
```

### Reject a pending build

Adapted (not in the official docs): the track is changed to `beta`, as above.

```bash
gcloud beta builds reject BUILD_ID \
  --project=PROJECT_ID \
  --url=URL \
  --comment=COMMENT
```

### Notifications for pending builds

Configure a Cloud Build notifier (BigQuery, HTTP, Slack, SMTP, or your own) and filter on the `PENDING` status using CEL. Example SMTP notifier configuration:

```yaml
apiVersion: cloud-build-notifiers/v1
kind: SMTPNotifier
metadata:
  name: example-smtp-notifier
spec:
  notification:
    filter: build.status == Build.Status.PENDING
    delivery:
      server: example.gmail.com
      port: 0000
      sender: sender@example.com
```

## Options / Props

| Argument | Description |
|----------|-------------|
| `BUILD_ID` | ID of the build to approve or reject |
| `--project` | Project ID |
| `--url` | Optional URL with information about the decision, such as a link to a JIRA ticket |
| `--comment` | Optional message shown with the approval or rejection |

## Notes

- Pending builds older than 2 months can no longer be approved or rejected.
- In the console, approve from the Cloud Build Dashboard: select pending builds (several at once), click Approve, optionally add a message and URL in the Approve build dialog. Reject with the Reject button. The build starts immediately after approval.
- If the organization policy `constraints/cloudbuild.allowedIntegrations` denies access to the connected repository, the policy overrides the approval and the build does not run.
- Approval is the source's recommended control for pull request builds from public repositories, because those builds run with the trigger's service account and secrets; keep it enabled alongside comment control (`/gcbrun`).
- A rejected build can be resubmitted from the Cloud Build History page with Rebuild, which sends it for approval again.
- `approve` and `reject` have no GA command in gcloud 593.0.0; the `beta` track is used here.
- The SMTP notifier example in the source ends with an elided `...` line and a second command that deploys the notifier with `gcloud run deploy` (image `us-east1-docker.pkg.dev/gcb-release/cloud-build-notifiers/smtp:latest`, env vars `CONFIG_PATH=smtp.yaml, PROJECT_ID=my-project`); that command is omitted (its `--update-env-vars` value has a space after the comma, so it would not run as written). See the full example in the `cloud-build-notifiers` repository (`smtp/smtp.yaml.example`).
- The source also shows Console steps for approving and rejecting. Cloud Run deployment is covered by `gcp-run`.
- Source: https://docs.cloud.google.com/build/docs/securing-builds/gate-builds-on-approval (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-manage-triggers.md](./create-manage-triggers.md)
- [triggers.md](./triggers.md)
