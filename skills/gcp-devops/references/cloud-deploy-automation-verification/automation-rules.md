---
source: https://docs.cloud.google.com/deploy/docs/automation-rules
---

# Cloud Deploy automation rules

Automation rules are the built-in actions an `Automation` can take on a delivery pipeline: `timedPromoteReleaseRule`, `promoteReleaseRule`, `advanceRolloutRule` and `repairRolloutRule`. Only built-in rules can be used. Each rule is configured under `rules:` in the `Automation` configuration (in `clouddeploy.yaml` or any file). Maximum 250 automation rules per delivery pipeline.

## Signature / Usage

Rule stanzas below are templates from the source; replace the bracketed values. `[RULE_ID]` is any name, unique within the automation resource.

### timedPromoteReleaseRule

```text
rules:
- timedPromoteReleaseRule:
    id: "[RULE_ID]"
    schedule: "[CRON]"
    timeZone: "[TIME_ZONE]"
    destinationTargetId: "[TO_TARGET]"
    destinationPhase: "[TO_PHASE]"
```

### promoteReleaseRule

The `rules` stanza goes inside the automation definition.

```text
rules:
- promoteReleaseRule:
    id: "[RULE_ID]"
    wait: [WAIT_TIME]
    destinationTargetId: "[TO_TARGET]"
    destinationPhase: "[TO_PHASE]"
```

### advanceRolloutRule

```text
rules:
- advanceRolloutRule:
    id: "[RULE_ID]"
    sourcePhases: ["[START_PHASE]", "[START_PHASE]"...]
    wait: [WAIT_TIME]
```

### repairRolloutRule

```text
rules:
- repairRolloutRule:
    id: "[RULE_ID]"
    phases: [PHASES_TO_REPAIR]
    jobs: [JOBS_TO_REPAIR]
    repairPhases:
    - retry:
        attempts: [NUMBER_OF_ATTEMPTS]
        wait: [WAIT_TIME]
        backoffMode: [LINEAR | EXPONENTIAL]
    - rollback:
        destinationPhase: [PHASE_NAME]
        disableRollbackIfRolloutPending: [true | false]
```

### Example: Automation with a repairRolloutRule

Adapted (not in the official docs): the source's `serviceAccount: (REDACTED)` is replaced by a placeholder.

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

If a rollout fails on the identified target, it is retried up to 3 times with a one-minute wait between attempts. If all retries fail, a new rollout deploys the target's most recent successful release to that target.

## Options / Props

### Available rules

| Rule | Description |
|------|-------------|
| `timedPromoteReleaseRule` | Automatically promote from one target to the next based on a cron schedule. |
| `promoteReleaseRule` | Automatically promotes a release into the indicated target after successful rollout in the previous target in the progression. |
| `advanceRolloutRule` | Automatically advances a rollout from the indicated phase to the next phase. |
| `repairRolloutRule` | Automatically retry the failed job or jobs in the rollout a specified number of times, and roll back if all retries fail. |

### timedPromoteReleaseRule fields

| Field | Description |
|-------|-------------|
| `id` | Rule name, unique within the automation resource. |
| `schedule` | Standard 5-field cron: minute (`0`-`59`), hour (`0`-`23`), day of month (`1`-`31`), month (`1`-`12`), day of week (`0`-`6`, Sunday to Saturday). `0 9 * * 1` promotes every Monday at 9am. Ranges (`0`-`5`), lists (`1`,`3`,`5`) and steps (`*/3`) are supported. |
| `timeZone` | Time zone in IANA format. |
| `destinationTargetId` | `targetId` to promote to, or `@next` (the target after `selector.targets`). Optional; default `@next`. |
| `destinationPhase` | Phase to promote to, for example `canary-25` or `stable`. Optional; default is the first phase in the target. |

### promoteReleaseRule fields

| Field | Description |
|-------|-------------|
| `id` | Rule name, unique within the automation resource. |
| `wait` | Time to wait after the release is ready for promotion, in minutes, for example `1m` (the `m` is required). Default `0`; maximum `20160m` (14 days). |
| `destinationTargetId` | `targetId` to promote to, or `@next`. Default `@next`. |
| `destinationPhase` | Phase to promote to, for example `canary-25` or `stable`. Optional; default is the first phase in the target. |

### advanceRolloutRule fields

| Field | Description |
|-------|-------------|
| `id` | Rule name, unique within the automation resource. |
| `sourcePhases` | Phase or phases from which the rollout is advanced when they finish successfully. Phase names are case sensitive. Optional; if omitted, all phases in the rollout are advanced. |
| `wait` | Time to wait to advance the rollout after it is ready, for example `1m` (the `m` is required). Default `0`; maximum `20160m` (14 days). |

### repairRolloutRule fields

| Field | Description |
|-------|-------------|
| `id` | Rule name, unique within the automation resource. |
| `phases` | Rollout phases to retry. Optional; default is all phases. |
| `jobs` | Jobs to retry. Optional; default is all jobs. |
| `repairPhases[].retry.attempts` | Number of retries before the rollout is considered failed. |
| `repairPhases[].retry.wait` | Wait between retries, for example `1m` (the time unit is required). |
| `repairPhases[].retry.backoffMode` | `LINEAR` (constant interval, the default) or `EXPONENTIAL` (the interval doubles; with `wait: 1m`, the retries come after 1, 2 and 4 minutes). |
| `repairPhases[].rollback` | Roll back the failed rollout after all retries are exhausted. Optional. |
| `repairPhases[].rollback.destinationPhase` | Phase to roll back to; default is the `stable` phase. |
| `repairPhases[].rollback.disableRollbackIfRolloutPending` | `true` aborts the rollback if a rollout is pending on the target. |

### Commands that abort a repairRolloutRule run

| Command |
|---------|
| Retry job |
| Cancel rollout |
| Ignore job |
| Terminate job run |

## Notes

- You need either some number of retries or a rollback, or both. If each retry fails the rollout fails; if any retry succeeds the automation stops and the rollout succeeds.
- Required permissions: the automation service account must have `clouddeploy.rollouts.create` (for `promoteReleaseRule`) or `clouddeploy.rollouts.advance` (for `advanceRolloutRule`), and `iam.serviceAccounts.actAs` on the Cloud Deploy execution service account. The source states no extra permission note for `timedPromoteReleaseRule` or `repairRolloutRule`.
- Corrected from the official docs: the source writes `iam.serviceAccount.actAs` (singular) in these notes; the IAM permission name is `iam.serviceAccounts.actAs` (as in the Cloud Deploy service accounts page and in `gcp-foundation`).
- The source's prose for `repairRolloutRule` refers to `mode` and `toPhase`; the field names in the templates and the example are `backoffMode` and `destinationPhase`, which this page follows.
- Cloud Deploy REST API enum names are `BACKOFF_MODE_LINEAR` / `BACKOFF_MODE_EXPONENTIAL`; the REST API also documents `attempts` as 1 to 10 and `wait` (retry) as at most 14d (source: Cloud Deploy `clouddeploy` v1 Discovery document). The YAML in the source uses `LINEAR` / `EXPONENTIAL`.
- The REST API names rule `id` format as `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`, and phase / job names as `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$` (Discovery document).
- Template stanzas use `text` fences because they contain placeholders and `...`.
- Adapted from the official docs: the example's `serviceAccount: (REDACTED)` is replaced by a placeholder.
- Source: https://docs.cloud.google.com/deploy/docs/automation-rules (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [automation.md](./automation.md)
- [automation-resource.md](./automation-resource.md)
- [cloud-deploy-service-account.md](./cloud-deploy-service-account.md)
- [deploy-analysis.md](./deploy-analysis.md)
