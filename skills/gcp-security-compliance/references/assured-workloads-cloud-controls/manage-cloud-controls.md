---
source: https://docs.cloud.google.com/assured-workloads/docs/manage-cloud-controls
---

# Manage cloud controls in Assured Workloads and Audit Manager

Preview. Applies only to Assured Workloads frameworks. Frameworks include built-in cloud controls that you can add to custom frameworks; you can also create and manage custom cloud controls (CEL detection logic over Cloud Asset Inventory resources) and update built-in controls to newer releases.

## Signature / Usage

The source documents these tasks in the Google Cloud console (Compliance > Configure > Frameworks > Cloud Controls tab): view, create (with Gemini or manually), edit, update to a newer release, and delete. The detection logic is a CEL expression that must resolve to `false` to trigger a finding.

### Example detection expression

Example detection logic for resource type `cloudkms.googleapis.com/CryptoKey` (check the Cloud KMS key rotation period):

```text
has(resource.data.rotationPeriod) && resource.data.rotationPeriod < duration('60h')
```

## Options / Props

### Required IAM roles (on the folder or project)

| Role | ID | When needed |
|------|----|-------------|
| Compliance Manager Admin | `roles/cloudsecuritycompliance.admin` | Manage cloud controls |
| Organization Policy Administrator | `roles/orgpolicy.policyAdmin` | One of these three, to create or modify controls based on organization policies |
| Assured Workloads Administrator | `roles/assuredworkloads.admin` | Same |
| Assured Workloads Editor | `roles/assuredworkloads.editor` | Same |
| Project IAM Admin | `roles/resourcemanager.projectIamAdmin` | Create or modify controls based on project policies |

### Custom cloud control fields (manual creation)

| Field | Detail |
|-------|--------|
| Cloud control ID | Unique identifier |
| Name, description | Help users understand the purpose |
| Categories | Optional; cannot be changed after creation |
| Resource type | One resource type per custom control; the only supported data type is Cloud Asset Inventory resources; all resource types are supported |
| Detection logic | CEL expression; invalid rules show an error |
| Findings severity | Select an appropriate severity |
| Remediation instructions | For incident responders and administrators |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms"; available "as is" with limited support.
- A custom cloud control applies to only one resource type, and custom cloud controls don't support parameters.
- Editing or deleting requires that the control is not included in a framework. Editable: name, description, rules, remediation steps, severity (not category). Only custom controls you created can be deleted; built-in controls cannot be.
- Deleting a custom cloud control is confirmed by typing `Delete`; try it on a disposable control first. The source marks the delete task with the Security Command Center Premium and Enterprise (Deprecated) service tiers.
- Built-in controls are updated by Google; the release notes announce changes to the control name, finding category, detective or preventive logic, or underlying rule logic. To update after a notification, unassign and redeploy the frameworks that include the control.
- The source shows Console steps only; no gcloud, REST, or Terraform examples.
- Snippet taken from https://docs.cloud.google.com/assured-workloads/docs/write-rules-cloud-controls
- Source: https://docs.cloud.google.com/assured-workloads/docs/manage-cloud-controls (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [write-rules-cloud-controls.md](./write-rules-cloud-controls.md)
- [manage-frameworks.md](./manage-frameworks.md)
- [monitor-frameworks.md](./monitor-frameworks.md)
