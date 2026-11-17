---
source: https://docs.cloud.google.com/security-command-center/docs/compliance-manager-apply-framework
---

# Manage frameworks

Frameworks consist of cloud controls that help you meet security and regulatory requirements. Applying a framework is a two-step process: identify the cloud controls that match your obligations, then deploy a framework containing them to an organization, folder, or project. Standard, Premium, and Enterprise (Deprecated) service tiers; the Standard tier supports only the Security Essentials framework, and other built-in frameworks, custom cloud controls, and preventive or audit controls need Premium or Enterprise. Folders configured for application management are supported.

## Signature / Usage

### Use service account impersonation (optional)

```bash
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
```

### View a framework

```bash
gcloud compliance-manager frameworks describe \
   builtin-security-essentials \
   --organization=3589215982 \
   --location=global \
   --major-revision-id=12
```

### List frameworks

```bash
gcloud compliance-manager frameworks list \
   --organization=3589215982 \
   --location=global
```

### Create a custom framework

Adapted (not in the official docs): the `parameters` entry with `parameterValue` is replaced by `"parameters":[]`, because gcloud 593.0.0 accepts only the `name` key inside `parameters`.

```bash
gcloud compliance-manager frameworks create \
   my-custom-framework \
   --organization=3589215982 \
   --location=global \
   --description="This framework is my custom framework" \
   --display-name="My framework name" \
   --cloud-control-details='[{"name":"organizations/3589215982/locations/global/cloudControls/restrict-bucket-region","majorRevisionId":1,"parameters":[]},{"name":"organizations/3589215982/locations/global/cloudControls/enable-binary-authorization","majorRevisionId":2}]'
```

### Deploy a framework to an existing folder

```bash
gcloud compliance-manager framework-deployments create \
   example-framework-deployment \
   --organization=3589215982 \
   --location=global \
   --cloud-control-metadata='[{"cloudControlDetails": {"name": "organizations/3589215982/locations/global/cloudControls/restrict-bucket-region", "majorRevisionId": "1", "parameters": []}, "enforcementMode": "DETECTIVE"}, {"cloudControlDetails": {"name": "organizations/3589215982/locations/global/cloudControls/enable-binary-authorization", "majorRevisionId": 2}, "enforcementMode": "DETECTIVE"}]' \
   --framework="organizations/3589215982/locations/global/frameworks/builtin-aipp" \
   --framework-major-revision-id=6 \
   --target-resource-config-existing="folders/example-folder" \
   --description="Deployment for AI Platform into example-folder"
```

### Deploy a framework and create a new project

`deploy-controls.yaml` is a YAML list of `cloudControlDetails` and `enforcementMode` entries, the same schema as the inline `--cloud-control-metadata` JSON of the previous example.

```bash
gcloud compliance-manager framework-deployments create \
  example-framework-deployment \
   --organization=3589215982 \
   --location=global \
   --cloud-control-metadata=deploy-controls.yaml \
   --framework="organizations/3589215982/locations/global/frameworks/builtin-aipp" \
   --framework-major-revision-id=6 \
   --target-resource-creation-config-project-billing-account-id=012345-567890-ABCDEF \
   --target-resource-creation-config-project-display-name=example-new-project \
   --target-resource-creation-config-project-parent=folders/example-folder \
   --description="Deployment for AI Platform into a new example-new-project in example-folder"
```

### Update a framework deployment in place

```bash
gcloud compliance-manager framework-deployments update \
   example-deployment \
   --organization=3589215982 \
   --location=global \
   --framework-major-revision-id=7 \
   --cloud-control-metadata=cloud-control-metadata.yaml \
   --etag=MTc3NDU4MjM4OTY0MzU5MjQ5OTI=
```

### Remove a framework deployment

```bash
gcloud compliance-manager framework-deployments delete \
   example-deployment \
   --organization=3589215982 \
   --location=global \
   --etag=MTc3NDU4MjM4OTY0MzU5MjQ5OTI=
```

### Delete a custom framework

```bash
gcloud compliance-manager frameworks delete \
   example-framework \
   --organization=3589215982 \
   --location=global
```

## Options / Props

### IAM roles

| Purpose | Role (ID) |
|---------|-----------|
| Apply frameworks (organization or project) | Compliance Manager Admin (`roles/cloudsecuritycompliance.admin`) |
| View findings dashboards | Compliance Manager Viewer (`roles/cloudsecuritycompliance.viewer`) |
| Deploy frameworks with organization-policy-based cloud controls (one of) | `roles/orgpolicy.policyAdmin`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor` (include `orgpolicy.policies.create`, `orgpolicy.policies.update`, `orgpolicy.policies.get`) |
| Create a folder while deploying (organization level only; one of) | `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.folderCreator` (include `resourcemanager.folders.get`, `.create`, `.delete`) |
| Create a project while deploying (organization level only; all of) | `roles/billing.projectManager`, `roles/resourcemanager.projectCreator`, `roles/resourcemanager.projectDeleter` (include `resourcemanager.projects.get`, `.create`, `.delete`, `.createBillingAssignment`) |
| Assign DSPM frameworks to an App Hub application | `roles/apphub.viewer` (includes `apphub.locations.list`, `apphub.applications.list`, `apphub.applications.get`) |

### Common flag values

| Name | Description |
|------|-------------|
| `FRAMEWORK` | Framework name; for `frameworks create`, the unique alphanumeric identifier. In `framework-deployments create`, the format `organizations/ORGANIZATION_ID/locations/LOCATION/frameworks/FRAMEWORK_NAME`. |
| `ORGANIZATION` | Your organization ID. |
| `LOCATION` | The region the framework or deployment is stored in (the examples use `global`). |
| `--major-revision-id` | Optional; version of the framework to view. Latest if omitted. |
| `--display-name` | Human-readable name for a custom framework. |
| `--description` | Optional description. |
| `--category` | Optional categories; the recommended value for a customized framework is `custom-framework`. |
| `--cloud-control-details` | Optional list of cloud controls (`majorRevisionId`, `name`, `parameters`) or a JSON/YAML file path. `name` format: `organizations/ORGANIZATION_ID/locations/LOCATION/cloudControls/NAME`; find IDs with `gcloud compliance-manager cloud-controls list`. If omitted, add controls later in the Console. |
| `--cloud-control-metadata` | List of `cloudControlDetails` plus `enforcementMode`, or a JSON/YAML file path. |
| `enforcementMode` | `AUDIT`, `DETECTIVE`, or `PREVENTIVE`. |
| `--framework-major-revision-id` | Version number of the framework to deploy. For updates, defaults to the latest major revision; you can't downgrade to an earlier major revision ID. |
| `--target-resource-config-existing` | Existing target: `organizations/ORGANIZATION_ID`, `folders/FOLDER_ID`, or `projects/PROJECT_ID`. |
| `--target-resource-creation-config-folder-display-name` / `-folder-parent` | Create a folder and deploy to it; parent is `organizations/ORGANIZATION_ID` or `folders/FOLDER_ID`. |
| `--target-resource-creation-config-project-billing-account-id` / `-project-display-name` / `-project-parent` | Create a project and deploy to it; parent is `organizations/ORGANIZATION_ID` or `folders/FOLDER_ID`. |
| `--add-cloud-control-metadata` / `--remove-cloud-control-metadata` | On `update`, add or remove individual controls; repeat the flag, use a JSON list, or a JSON/YAML file. May be combined. |
| `--cloud-control-metadata` (update) | If used, you must specify all cloud controls and enforcement modes that apply to the framework. |
| `--etag` | Version identifier; if it doesn't match the current version the request fails. If omitted, the update or delete is unconditional. |
| `--async` | On `update`, return immediately without waiting for the long-running operation. |

## Notes

- Enterprise tier: the Security Command Center Enterprise service tier will shut down on May 21, 2027; Enterprise organizations automatically move to Premium on or after that date.
- You can edit or delete only custom frameworks (not built-in), and edit only frameworks that aren't deployed. Deleting a custom framework can't be undone. Deleting is irreversible; try it on a disposable framework first.
- Framework deployments inherit through the resource hierarchy. If frameworks are deployed at both organization and project level, all cloud controls in both apply; where definitions differ, the lower-level cloud control wins (for example Allow at organization and Deny at project gives Deny). Recommended: deploy an organization-wide framework, then more stringent frameworks to folders and projects.
- `PREVENTIVE` controls enforce rather than only monitor (the Console's "Monitor and prevent" option ends with an Enforce step); the examples above use `DETECTIVE`. Start with detective mode to observe drift before enforcing, and deploy to a non-production folder first.
- Frameworks that include audit-only controls can't be deployed. Don't include audit-only controls in a framework meant to detect violations.
- If a deployed folder or project has Security Health Analytics enabled you might receive duplicate findings, because Compliance Manager uses a different evaluation engine.
- After deployment, findings related to cloud controls take about six hours to appear. Removing a framework makes most related findings `Inactive` after seven days; if it includes the Restrict Flow of Sensitive Data Across Geographic Jurisdictions control, after 90 days. Findings for that control and for Restrict Access to Sensitive Data to Permitted Users aren't automatically changed. Removing a deployment is disruptive: Compliance Manager stops generating findings for that node. Omitting `--etag` on delete or update is unconditional; use the current etag to avoid removing or overwriting the wrong version.
- Updating via the Console means removing and redeploying (findings stop in between); the gcloud CLI and REST API update in place without affecting the findings dashboard.
- Copying a framework includes the latest releases of built-in cloud controls. In the Console, "Monitor" monitors drift only.
- Corrected from the official docs: the `frameworks create` example passed `"parameters":[{"name":"location","parameterValue":{"stringValue":"us-west"}}]`; gcloud 593.0.0 rejects it (`argument --cloud-control-details: valid keys are [name]; received: parameterValue`). The source's own deployment example passes `"parameters": []` for the same cloud control.
- The source's YAML files for `--cloud-control-metadata` set `parameterValue` the same way and are rejected by gcloud 593.0.0 for the same reason; they are omitted here.
- The help EXAMPLES of `gcloud compliance-manager frameworks create` use a `--controls` flag that the command does not accept; the flag is `--cloud-control-details`.
- REST `frameworkDeployments.patch` (an in-place update returning a long-running operation; `updateMask` optional, all fields overwritten if omitted), Console steps, Terraform, PowerShell, and the command synopses are omitted; see the source page.
- Source: https://docs.cloud.google.com/security-command-center/docs/compliance-manager-apply-framework (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [compliance-manager-overview.md](./compliance-manager-overview.md)
- [compliance-manager-enable.md](./compliance-manager-enable.md)
- [compliance-manager-monitor-framework.md](./compliance-manager-monitor-framework.md)
- [compliance-manager-audit.md](./compliance-manager-audit.md)
- [compliance-manager-write-cel-expressions.md](./compliance-manager-write-cel-expressions.md)
