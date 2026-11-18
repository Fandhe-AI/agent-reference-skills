---
source: https://docs.cloud.google.com/deploy/docs/automation
---

# Cloud Deploy automation

Cloud Deploy can automatically perform release-related and rollout-related tasks for a delivery pipeline: promote a release, promote on a schedule, advance a rollout phase, and repair (retry and roll back) a failed rollout. Each automation belongs to exactly one delivery pipeline and is defined as a `kind: Automation` resource registered with `gcloud deploy apply`.

## Signature / Usage

### Create or update an automation

Write an `Automation` configuration (see `automation-resource.md` and `automation-rules.md`), then register it. Running the same command against a changed file updates the resource.

Snippet taken from https://docs.cloud.google.com/deploy/docs/deploy-policy (the same `gcloud deploy apply` form registers any Cloud Deploy resource kind).

```bash
gcloud deploy apply --file=FILENAME \
                     --region=REGION \
                     --project=PROJECT_ID
```

### Suspend an automation

Set `suspended: true` in the `Automation` configuration and run `gcloud deploy apply` against that file again. A suspended automation does not run, but platform logs are still generated when it is instantiated, so you can test and debug it without affecting the delivery pipeline.

The `suspended` property appears in this example Automation (here `false`; change it to `true` to suspend).

Adapted (not in the official docs): the source's example shows `serviceAccount: (REDACTED)`; it is replaced by a placeholder.

```yaml
apiVersion: deploy.cloud.google.com/v1
kind: Automation
metadata:
  name: regular-repair/regular
description: repair regular rollouts
suspended: false
serviceAccount: AUTOMATION_SERVICE_ACCOUNT_EMAIL
selector:
  targets:
  - id: t1
rules:
- repairRolloutRule:
    id: "repair-rollout"
    repairPhases:
    - retry:
        attempts: 3
        wait: 1m
        backoffMode: LINEAR
    - rollback:
        destinationPhase: "stable"
```

## Options / Props

### Actions you can automate

| Rule | Action | Condition |
|------|--------|-----------|
| `promoteReleaseRule` | Promote the release after a successful rollout to the source target, optionally after a `wait` delay | Source target is `selector.targets` of the automation |
| `timedPromoteReleaseRule` | Promote the release on a cron schedule | None stated |
| `advanceRolloutRule` | Advance a rollout from one phase to the next | Only targets that use a canary deployment strategy |
| `repairRolloutRule` | Retry a failed rollout a number of times and roll back if all retries fail | Rollout failed |

### Limits

| Limit | Value |
|-------|-------|
| Automation rules per delivery pipeline | 250 maximum |
| Delivery pipelines per automation | 1 (an automation cannot be shared across pipelines) |

### Permissions on the Automation and AutomationRun resources

| Permission |
|------------|
| `clouddeploy.automations.create` |
| `clouddeploy.automations.delete` |
| `clouddeploy.automations.get` |
| `clouddeploy.automations.list` |
| `clouddeploy.automations.update` |
| `clouddeploy.automationRuns.cancel` |
| `clouddeploy.automationRuns.get` |
| `clouddeploy.automationRuns.list` |

## Notes

- Execution order for `promoteReleaseRule`: wait for the rollout to succeed into the source target (`selector.targets` of the automation, not of the rule), wait for `wait` if set, then promote to the next target or the specified target.
- Execution order for `advanceRolloutRule` (canary targets): wait for the `sourcePhase` if any (if none are specified, each phase is advanced automatically while the source phase is `IN_PROGRESS`, subject to `wait`), wait for `wait` (use it to set the duration of each canary phase), then advance to the next phase.
- Execution order for `repairRolloutRule`: retry after the configured `wait`; if specific phases or jobs are configured only those are retried (default is all phases and jobs); retries repeat until `attempts` is exhausted; during retries the rollout state is `IN_PROGRESS` and the phase state is `IN_PROGRESS` during retries but `FAILED` after each failure; if all retries fail (or none are configured), a new rollout is created that rolls back to the most recent successful release on the target.
- Two resources exist for automation: `Automation` (child of the delivery pipeline; points at targets and rules) and `AutomationRun` (an instance created when an automation is triggered; points at its Automation plus the rollout that spawned it).
- In addition to the permissions above, the automation service account and each rule need further permissions; see `automation-rules.md` and `automation-resource.md`.
- The `Automation` is deleted with its delivery pipeline.
- Snippet taken from https://docs.cloud.google.com/deploy/docs/deploy-policy (the `gcloud deploy apply` block); the source page has no code block of its own.
- The source also links a quickstart (https://docs.cloud.google.com/deploy/docs/deploy-app-automation).
- Cloud Deploy is Google Cloud's continuous delivery service for GKE / Cloud Run; it is not Vercel or Cloudflare deployment (`vercel`, `cloudflare-wrangler`).
- Snippet taken from https://docs.cloud.google.com/deploy/docs/automation-rules (the Automation YAML block).
- Adapted from the official docs: the original `serviceAccount: (REDACTED)` in that example is replaced by `serviceAccount: AUTOMATION_SERVICE_ACCOUNT_EMAIL`.
- Source: https://docs.cloud.google.com/deploy/docs/automation (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [automation-rules.md](./automation-rules.md)
- [automation-resource.md](./automation-resource.md)
- [deploy-analysis.md](./deploy-analysis.md)
- [cloud-deploy-service-account.md](./cloud-deploy-service-account.md)
