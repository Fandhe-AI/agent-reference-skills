---
source: https://docs.cloud.google.com/deploy/docs/deploy-policy
---

# Cloud Deploy deploy policies

A deploy policy is a Cloud Deploy resource that restricts manual or automated actions against selected delivery pipelines or targets (or all of them), for example to block rollout creation during a time window such as a seasonal freeze. Policies are written as `kind: DeployPolicy` YAML and registered with `gcloud deploy apply`.

## Signature / Usage

### Create or update a policy

Header of the `DeployPolicy` file (`name` is required):

```text
apiVersion: deploy.cloud.google.com/v1
kind: DeployPolicy
metadata:
  name: 
description: 
```

Add `selectors` and `rules`, then apply (the same command updates an existing policy):

```bash
gcloud deploy apply --file=FILENAME \
                     --region=REGION \
                     --project=PROJECT_ID
```

### Selectors

```text
selectors:
- deliveryPipeline:
    id:
    labels:
  target:
    id:
    labels:
```

### Time windows

Annual freeze with `oneTimeWindows` (December 22, 2024 at 5pm through January 2, 2025 at 9am):

```text
timeWindows:
  timeZone: "America/New_York"
  oneTimeWindows:
  - start: "2024-12-22 17:00"
    end: "2025-01-02 09:00"
```

Repeating weekend freeze with `weeklyWindows` (Friday 5pm through Monday 9am):

```text
timeWindows:
  timeZone: "America/New_York"
  weeklyWindows:
  - daysOfWeek: [FRIDAY]
    startTime: "17:00"
    endTime: "24:00"
  - daysOfWeek: [SATURDAY, SUNDAY]
    startTime: "00:00"
    endTime: "24:00"
  - daysOfWeek: [MONDAY]
    startTime: "00:00"
    endTime: "09:00"
```

A Sunday-only freeze can be written either with `startTime: "00:00"` and `endTime: "24:00"`, or with just `daysOfWeek: [SUNDAY]`; `startTime` without `endTime` (or the reverse) is not allowed.

### Override a policy from the gcloud CLI

```bash
gcloud deploy releases promote --release=my-release-001 \
  --project=my-policy-testing-project \
  --region=us-central1 \
  --delivery-pipeline=my-pipeline \
  --to-target=prod-target \
  --override-deploy-policies=my-deploy-policy
```

### Delete a policy

Adapted (not in the official docs): the source's square-bracket placeholders (`[PROJECT]`, `[REGION]`, `[POLICY_NAME]`) are replaced by upper-case placeholders because square brackets are glob characters in a shell.

```bash
gcloud deploy deploy-policies delete \
   --project=PROJECT_ID \
   --region=REGION \
   POLICY_NAME
```

## Options / Props

### Requirements and limits

| Item | Value |
|------|-------|
| Selectors | At least one per policy. |
| Rules | At least one per policy; rule IDs unique within a policy. |
| Time windows | Each rule needs at least one `timeWindows`, containing a `oneTimeWindows` or a `weeklyWindows`. |
| Policies | No more than 1000 deploy policies per project/location. |

### Selector semantics

| Item | Behavior |
|------|----------|
| `deliveryPipeline.id` / `target.id` | `metadata.name` of the pipeline / target. `id: *` selects all; arbitrary wildcarding is not supported. |
| `labels` | Match pipelines or targets by labels. |
| Combination | Items within one selector are ANDed; multiple selectors are ORed. |

### rolloutRestriction actions

| Action | Restricts |
|--------|-----------|
| `ADVANCE` | Advancing rollout phases. |
| `APPROVE` | Approving rollout promotion. |
| `CANCEL` | Canceling rollouts. |
| `CREATE` | Creating rollouts. A release can still be created but spawns no rollout. |
| `IGNORE_JOB` | Ignoring jobs. |
| `RETRY_JOB` | Retrying jobs. |
| `ROLLBACK` | Rolling back rollouts. |
| `TERMINATE_JOBRUN` | Terminating job runs. |

### Date and time rules

| Rule | Detail |
|------|--------|
| Dates | `yyyy-mm-dd`. |
| Time of day | Start of day `00:00`, end of day `24:00`. |
| `oneTimeWindows` | Dates must include the time. |
| `weeklyWindows` | Time of day may be omitted; if `startTime` is given `endTime` must be too, and the reverse. |
| `timeZone` | Required in the `timeWindows` stanza, for example `America/New_York`. |

### IAM permissions

| Permission | Role |
|------------|------|
| `clouddeploy.deployPolicies.create` | `roles/clouddeploy.policyAdmin` |
| `clouddeploy.deployPolicies.delete` | `roles/clouddeploy.policyAdmin` |
| `clouddeploy.deployPolicies.get` | `roles/clouddeploy.policyAdmin` |
| `clouddeploy.deployPolicies.list` | `roles/clouddeploy.policyAdmin` |
| `clouddeploy.deployPolicies.update` | `roles/clouddeploy.policyAdmin` |
| `clouddeploy.deployPolicies.override` | `roles/clouddeploy.policyAdmin`; also in `roles/clouddeploy.policyOverrider` |

## Notes

- Evaluation: IAM permissions are checked first (no policy evaluation if IAM denies). Then Cloud Deploy checks for an applicable policy: the action type and invoker must match, and the policy's date and time ranges must be in effect; if so the action is blocked.
- Updating a policy applies immediately to all later actions; there is no remnant of previous restrictions (shortening a December freeze on December 14 to end December 15 unblocks rollouts after December 15).
- Overriding opens a restricted action (for example a rollback during a freeze); it needs `clouddeploy.deployPolicies.override`. In the console you type the policy name and select Attempt to override policies; in gcloud add `--override-deploy-policies=POLICY` to the blocked command. Overridden violations are still written to platform logs.
- Deleting a policy immediately removes the restriction from the affected pipelines and targets; try policy changes on a disposable project first.
- Platform log entries are written when a request violates the policy, including when the violating request is allowed because the policy is suspended or overridden; none is written when no violation occurs. A log is also written for Pub/Sub notification failures when a deploy policy resource changes.
- The source's prose mentions a `restrictRollouts` block; the rule name in the source is `rolloutRestriction`. Its YAML structure is in the configuration file schema (https://docs.cloud.google.com/deploy/docs/config-files#deploy_policy_definitions). The REST `RolloutRestriction` object has `id` (required, unique in the policy), `actions` (empty means all actions are restricted) and `invokers` (`USER`, `DEPLOY_AUTOMATION`; empty means all invoker types) (Discovery document, `clouddeploy` v1).
- Fences with empty values or fragments use `text`.
- Adapted from the official docs: the original `--project=[PROJECT] --region=[REGION] [POLICY_NAME]` is written as `--project=PROJECT_ID --region=REGION POLICY_NAME`.
- Discovery (`clouddeploy` v1) `WeeklyWindow`: empty `daysOfWeek` means all days; `endTime` is exclusive and `startTime` inclusive; empty times block the entire day. `TimeWindows` has `oneTimeWindows`, `weeklyWindows` and a required IANA `timeZone`.
- The source also shows Console steps for override and delete.
- Source: https://docs.cloud.google.com/deploy/docs/deploy-policy (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [automation.md](./automation.md)
- [automation-rules.md](./automation-rules.md)
