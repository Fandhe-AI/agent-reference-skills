---
source: https://docs.cloud.google.com/deploy/docs/automation-resource
---

# Cloud Deploy Automation and AutomationRun resources

The `Automation` resource defines how to automate one or more delivery pipeline tasks by associating target resources with automation rules. An `AutomationRun` represents one execution of an automation rule. Automation always needs an explicit service account.

## Signature / Usage

The `Automation` kind, with the properties the source lists (`selector`, `rules`, metadata, `suspended`, `serviceAccount`):

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

## Options / Props

### Contents of the Automation resource

| Property | Description |
|----------|-------------|
| `selector` | Reference to the target or targets against which to perform the automation. |
| `rules` | One or more automation rules that determine how to do the automation. |
| `description`, `annotations`, `labels` | Metadata. |
| `suspended` | Whether the automation is suspended. |
| `serviceAccount` | Required. Service account used to perform the automation; Automation does not assume a default service account. |

### Permissions the automation service account needs

| Requirement | Detail |
|-------------|--------|
| `iam.serviceAccounts.actAs` | On the applicable Cloud Deploy execution service account. |
| Operation permissions | Permissions to perform the operations being automated; see the automation rule for specifics. |
| Cross-project | If the automation service account is not in the same project as the delivery pipeline, the Cloud Deploy service agent must have `iam.serviceAccounts.actAs` on the automation service account. |

## Notes

- The `Automation` resource is a child of the delivery pipeline. Deleting a delivery pipeline also deletes all automations that are its children.
- The automation service account can be the default execution service account or another service account, but even the default must be specified in the `serviceAccount` property. The default execution service account is the default Compute Engine service account; see `cloud-deploy-service-account.md` for why a dedicated service account is the better practice.
- Snippet taken from https://docs.cloud.google.com/deploy/docs/automation-rules; the source page for the resource has no code block of its own.
- Adapted from the official docs: the original `serviceAccount: (REDACTED)` is replaced by `serviceAccount: AUTOMATION_SERVICE_ACCOUNT_EMAIL`.
- Corrected from the official docs: the source writes `iam.serviceAccount.actAs` (singular) on this page; the IAM permission name is `iam.serviceAccounts.actAs`.
- Source: https://docs.cloud.google.com/deploy/docs/automation-resource (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [automation.md](./automation.md)
- [automation-rules.md](./automation-rules.md)
- [cloud-deploy-service-account.md](./cloud-deploy-service-account.md)
