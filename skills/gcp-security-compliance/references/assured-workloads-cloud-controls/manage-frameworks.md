---
source: https://docs.cloud.google.com/assured-workloads/docs/manage-frameworks
---

# Manage frameworks in Assured Workloads

Preview. Applies only to Assured Workloads frameworks. A framework is a set of cloud controls that helps a folder or project meet security and regulatory requirements. Built-in frameworks (for example data boundaries) can be copied and modified, or you can create your own custom framework, then deploy it to a folder or project in Monitor mode or Monitor and prevent mode.

## Signature / Usage

The source documents these tasks in the Google Cloud console (Compliance > Configure > Frameworks) only: view, create (Create custom framework > Start from an existing framework or Start new), deploy (More Actions > Apply to resources), edit, remove resource assignments, update to a newer release, and delete.

### List frameworks from the command line

To list all frameworks in organization `my-organization-id` and location `global`:

```bash
gcloud compliance-manager frameworks list \
    --organization=my-organization-id --location=global
```

## Options / Props

### Required IAM roles

| Role | ID | When needed |
|------|----|-------------|
| Compliance Manager Admin | `roles/cloudsecuritycompliance.admin` | Apply frameworks (on the organization or project) |
| Organization Policy Administrator | `roles/orgpolicy.policyAdmin` | One of these three, to deploy frameworks that include cloud controls based on organization policies |
| Assured Workloads Administrator | `roles/assuredworkloads.admin` | Same; also required at organization level to set the OLPC mode when deploying Data Boundary for IL5 in Monitor and prevent mode and no organization-level personnel control (OLPC) mode is configured |
| Assured Workloads Editor | `roles/assuredworkloads.editor` | One of the three roles for organization-policy-based controls |

### Deployment rules

| Rule | Detail |
|------|--------|
| Built-in preventative framework per resource | A single folder or project can have only one built-in preventative framework (such as a data boundary) deployed |
| Detective frameworks per resource | A single folder or project can have multiple detective frameworks |
| Same framework on several resources | Multiple resources can have the same preventative or detective framework (for example a parent folder and its child projects) |
| Inheritance | Folders and projects inherit frameworks through the resource hierarchy. If definitions differ, the lower-level cloud control wins (a rule Allow at folder level and Deny at project level resolves to Deny for the project) |

### Deploy modes

| Mode | Behavior |
|------|----------|
| Monitor | Monitor for drift only |
| Monitor and prevent | Monitor for drift and actively prevent violations; can create a new folder or project to deploy to; shows an OLPC banner when the OLPC mode is Not set for Data Boundary for IL5 or when Strict IL5 blocks non-IL5 frameworks; final step is Enforce |

### Edit and delete limits

| Action | Limit |
|--------|-------|
| Edit | Only custom frameworks you created; built-in frameworks cannot be edited; the framework must not be assigned to a resource |
| Delete | Only custom frameworks you created; built-in frameworks cannot be deleted; the framework must not be assigned to a resource; type `Delete` to confirm |
| Copy | A copied framework includes the latest releases of built-in cloud controls |
| Audit-only controls | Frameworks that include audit-only controls cannot be deployed; do not add them to a framework used for monitoring |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms"; available "as is" with limited support.
- Before deploying frameworks you must be added to an allowlist (the source links a sign-up form).
- Best practice: deploy at folder level a framework whose cloud controls can apply to all its projects, then deploy more stringent frameworks to individual projects. With nested deployments, resolving violations on parent and child resources is your responsibility.
- Choosing Monitor and prevent on existing resources (created before the framework was deployed) may cause unintended violations; the source recommends Monitor for existing resources, or applying frameworks to new folders or projects.
- After deployment, violations can take approximately six hours to appear.
- Updating to a newer release: remove the resource assignment (existing violations are deactivated and no new violations are created while unassigned), then redeploy. The Update status column shows "Update available".
- Deleting a custom framework is irreversible ("You can't recover a framework after you delete it"); Monitor and prevent can block production changes. Try both on a disposable folder first.
- The source shows only Console steps for these tasks; no gcloud, REST or Terraform examples.
- Source: https://docs.cloud.google.com/assured-workloads/docs/manage-frameworks (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compliance-manager/frameworks/list (gcloud 593.0.0 help); the other `gcloud compliance-manager frameworks` and `framework-deployments` commands are in this skill's machine-generated gcloud reference.

## Related

- [monitor-frameworks.md](./monitor-frameworks.md)
- [manage-cloud-controls.md](./manage-cloud-controls.md)
- [write-rules-cloud-controls.md](./write-rules-cloud-controls.md)
