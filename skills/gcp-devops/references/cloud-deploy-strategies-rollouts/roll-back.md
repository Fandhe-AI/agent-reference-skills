---
source: https://docs.cloud.google.com/deploy/docs/roll-back
---

# Roll back a Cloud Deploy target

Rolling back a target to an earlier release creates a new `rollout` resource based on a previous release and deploys it to the same target. All deployment strategies (standard and canary) support rolling back.

## Signature / Usage

### Roll back with gcloud

By default the rollback uses the last release with a successful rollout to the target; choose a different one with `--release`. Run the command from the directory containing your delivery pipeline.

Adapted (not in the official docs): `--region=REGION` is added; gcloud 593.0.0 needs the region from `--region` or the `deploy/region` property.

```bash
gcloud deploy targets rollback TARGET_NAME \
   --delivery-pipeline=PIPELINE_NAME \
   --region=REGION \
   --release=RELEASE_NAME \
   --rollout-id=ROLLOUT_ID
```

### Roll back further manually

You can roll back manually to a release earlier than the last successfully deployed one by running `gcloud deploy releases promote` with the earlier release and `--to-target` set to the target you want to roll back.

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/deploy/releases/promote (gcloud 593.0.0 help).

```bash
gcloud deploy releases promote --release=test-release \
    --delivery-pipeline=test-pipeline --region=us-central1 \
    --to-target=prod
```

## Options / Props

| Flag | Required | Description |
|---|---|---|
| `TARGET_NAME` (positional) | Yes | The target to roll back |
| `--delivery-pipeline` | Yes | The delivery pipeline |
| `--release` | No | The release to roll back to; if omitted, Cloud Deploy uses the last known good release to the target |
| `--rollout-id` | No | Identifier for the generated `rollout`; if omitted, Cloud Deploy generates one |
| `--to-target` (`releases promote`) | For manual earlier rollback | The target in which to roll back the release |

## Notes

- Adapted from the official docs: the source's rollback command has no `--region`; the command above adds `--region=REGION`, which gcloud 593.0.0 needs unless the `deploy/region` property is set.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/deploy/releases/promote (gcloud 593.0.0 help). The source describes the manual rollback only in prose; the example is the help example for `releases promote`, where `--release`, `--delivery-pipeline` and `--region` are needed.
- A rollback deploys to the target and replaces what is running; try it on a disposable project first. The source also shows Console steps (**Roll back release**, then select the release, optional rollout name and description).
- Source: https://docs.cloud.google.com/deploy/docs/roll-back (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [manage-rollout.md](./manage-rollout.md)
- [deployment-strategies.md](./deployment-strategies.md)
