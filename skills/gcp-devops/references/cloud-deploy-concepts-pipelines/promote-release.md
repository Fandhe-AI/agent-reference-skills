---
source: https://docs.cloud.google.com/deploy/docs/promote-release
---

# Promote a release and manage approvals

Promoting deploys an existing release to the next target in the pipeline progression; each promotion creates a `rollout` for the destination target. Targets with `requireApproval: true` hold the rollout until a user or service account with `roles/clouddeploy.approver` approves or rejects it.

## Signature / Usage

### Promote the release

Assumes a release already exists.

```bash
gcloud deploy releases promote --release=RELEASE_NAME \
                               --delivery-pipeline=PIPELINE_NAME \
                               --region=REGION
```

`RELEASE_NAME` is the release; `PIPELINE_NAME` the pipeline managing it; `REGION` (required) the region where the release was created, for example `us-central1`.

### Require approval on a target

```text
apiVersion: deploy.cloud.google.com/v1
kind: Target
metadata:
 name:
description:
requireApproval: true
```

### Approve or reject with gcloud

Requires `roles/clouddeploy.approver`. Approve:

```bash
gcloud deploy rollouts approve rollout-name --delivery-pipeline=pipeline-name \
                                                                   --region=region \
                                                                   --release=release-name
```

Reject:

```bash
gcloud deploy rollouts reject rollout-name --delivery-pipeline=pipeline-name \
                                                                  --region=region \
                                                                  --release=release-name
```

## Options / Props

| Item | Detail |
|---|---|
| `--to-target=TARGET_NAME` | Optional on `releases promote`; destination target. If omitted the release goes to the next target in the promotion sequence. |
| `clouddeploy-approvals` topic | Pub/Sub topic that notifies subscribers (users or systems) when a rollout is pending approval. |
| `roles/clouddeploy.approver` | Role allowing a user or service account to approve a rollout to a target that requires approval. |
| `APPROVAL_REJECTED` | State of a controller rollout when promotion to a multi-target is rejected in parallel deployment; child rollouts are not created. |

## Notes

- Mismatch: if the pipeline or target changed since the release was created, Cloud Deploy warns of a possible mismatch and prompts. Answer `n` to compare pipeline versions first; if you promote anyway, the release deploys according to the pipeline as defined at release creation.
- If you reject a rollout, the application is not deployed and the rollout can't be approved later unless re-promoted.
- In the Console, the **Manifest diff** tab shows rendered manifest changes versus the currently deployed version before you approve or reject.
- In parallel deployment, require approval on the multi-target only.
- Approvals can be handled programmatically (for example ServiceNow) via Pub/Sub notifications and the Cloud Deploy API.
- The source also shows Console steps. The approve / reject gcloud examples use lower-case placeholders as in the source; per gcloud 593.0.0 help the rollout is a positional argument with `--delivery-pipeline`, `--region` and `--release`.
- Source: https://docs.cloud.google.com/deploy/docs/promote-release (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-pipeline-targets.md](./create-pipeline-targets.md)
- [config-files.md](./config-files.md)
- [architecture.md](./architecture.md)
