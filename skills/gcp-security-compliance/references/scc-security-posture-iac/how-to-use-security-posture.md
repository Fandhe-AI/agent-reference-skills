---
source: https://docs.cloud.google.com/security-command-center/docs/how-to-use-security-posture
---

# Manage a security posture

How to create a posture YAML file (from a predefined template or by extracting existing policies), create the posture, deploy it with a posture deployment, update it, monitor drift and delete it. Requires SCC Premium or Enterprise (Deprecated) with organization-level activation; security posture management does not work with project-level activations. The Enterprise tier shuts down on May 21, 2027 (see Notes).

## Signature / Usage

### Prerequisites

Enable the APIs:

```bash
gcloud services enable orgpolicy.googleapis.com  securityposture.googleapis.com
```

Optional: authenticate the gcloud CLI by service account impersonation.

```bash
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
```

To use Security Health Analytics detectors as policies, select the Security Health Analytics service when activating SCC. Built-in AWS detectors need the AWS connection (Enterprise (Deprecated) tier, Preview).

### Create a posture file from a predefined template

```bash
gcloud scc posture-templates describe \
    organizations/ORGANIZATION_ID/locations/global/postureTemplates/POSTURE_TEMPLATE \
    --revision-id=REVISION_ID
```

### Create a posture file by extracting existing policies

Extracts organization policies (including custom ones) and Security Health Analytics detectors (including custom ones) configured directly on a project, folder or organization. You cannot extract from a resource that already has a posture applied, and parent policies are not extracted.

```bash
gcloud scc postures extract POSTURE_NAME \
    --workload=WORKLOAD
```

### Modify the posture YAML

Adapted (not in the official docs): the resource path segment is `postures` (plural), the `Posture.name` format of the Security Posture API; the source showed `posture`.

```yaml
name: organizations/ORGANIZATION_ID/locations/global/postures/POSTURE_ID
description: DESCRIPTION
state: STATE
```

Add a Security Health Analytics built-in detector:

```yaml
- policyId: API Key Exists
  constraint:
    securityHealthAnalyticsModule:
      moduleEnablementState: ENABLED
      moduleName: API_KEY_EXISTS
```

Add a custom module (detect Vertex AI datasets not encrypted with CMEK):

```yaml
- policyId: CMEK key is used for Vertex AI DataSet
  complianceStandards:
  - standard: NIST SP 800-53
    control: SC-12
  - standard: NIST SP 800-53
    control: SC-13
  constraint:
    securityHealthAnalyticsCustomModule:
      displayName: "vertexAIDatasetCMEKDisabled"
      config:
        customOutput: {}
        predicate:
          expression: "!has(resource.encryptionSpec)"
        resourceSelector:
          resourceTypes:
          - aiplatform.googleapis.com/Dataset
        severity: CRITICAL
        description: "When enforced, this detector finds whether a dataset is not encrypted using CMEK."
        recommendation: "Restore the SHA module. See https://cloud.google.com/security-command-center/docs/custom-modules-sha-overview."
      moduleEnablementState: ENABLED
```

### Create, view, update, delete a posture

```bash
gcloud scc postures create POSTURE_NAME \
    --posture-from-file=POSTURE_FROM_FILE
```

```bash
gcloud scc postures describe POSTURE_NAME \
    --revision-id=REVISION_ID
```

```bash
gcloud scc postures update POSTURE_NAME \
    --posture-from-file=POSTURE_FROM_FILE \
    --revision-id=POSTURE_REVISION_ID \
    --update-mask=UPDATE_MASK
```

```bash
gcloud scc postures delete POSTURE_NAME
```

### Deploy and manage a posture deployment

```bash
gcloud scc posture-deployments create POSTURE_DEPLOYMENT_NAME \
    --posture-name=POSTURE_NAME \
    --posture-revision-id=POSTURE_REVISION_ID \
    --target-resource=TARGET_RESOURCE
```

```bash
gcloud scc posture-deployments create \
  organizations/3589215982/locations/global/postureDeployments/postureDeployment123 \
  --posture-name=organizations/3589215982/locations/global/postures/StagingAIPosture \
  --posture-revision-id=version1 \
  --target-resource=projects/4589215982
```

```bash
gcloud scc posture-deployments describe POSTURE_DEPLOYMENT_NAME
```

```bash
gcloud scc posture-operations describe OPERATION_NAME
```

```bash
gcloud scc posture-deployments update POSTURE_DEPLOYMENT_NAME \
    --description=DESCRIPTION \
    --update-mask=UPDATE_MASK \
    --posture-id=POSTURE_ID \
    --posture-revision-id=POSTURE_REVISION_ID
```

```bash
gcloud scc posture-deployments delete POSTURE_DEPLOYMENT_NAME
```

### Monitor drift

```bash
gcloud scc findings list ORGANIZATION_ID \
    --filter="category=\"SECURITY_POSTURE_DRIFT\""
```

```sql
state="ACTIVE" AND NOT mute="MUTED" AND finding_class="POSTURE_VIOLATION"
```

## Options / Props

### Roles and permissions

| Role / permission | Purpose |
|---|---|
| `roles/securityposture.admin` | Manage postures. |
| `securitycentermanagement.securityCenterServices.update` | Enable or disable the Security Health Analytics service (organization, folder or project). Included in `roles/securityposture.admin`, `roles/securityposture.postureDeployer`, `roles/securitycentermanagement.admin`, `roles/securitycentermanagement.securityCenterServicesEditor`, `roles/securitycentermanagement.settingsEditor`. |

### `--update-mask` values (`gcloud scc postures update`)

| Value | Effect |
|---|---|
| `*` or unspecified | Apply changes to policy sets and posture description. |
| `policy_sets` | Policy sets only. |
| `description` | Description only. |
| `policy_sets, description` | Both. |
| `state` | State change only (you can't update the state at the same time as other fields). |

### Posture states

| State | Meaning |
|---|---|
| `DRAFT` | Not ready for deployment; cannot be deployed. |
| `ACTIVE` | Available for deployment. Can change to `DRAFT` or `DEPRECATED`. |
| `DEPRECATED` | Cannot be deployed. Delete all deployments of the posture before deprecating. Set back to `ACTIVE` to redeploy. |

### Other values

| Item | Value |
|---|---|
| `POSTURE_ID` | Alphanumeric, unique to the organization, max 63 characters. |
| `POSTURE_NAME` | Full posture name `organizations/ORGANIZATION_ID/locations/global/postures/POSTURE_ID` (the only form `--posture-name` accepts). As the positional argument of `scc postures` commands, the posture ID with `--organization` and `--location` also works (gcloud help). |
| `POSTURE_DEPLOYMENT_NAME` | Full name `organizations/ORGANIZATION_ID/locations/global/postureDeployments/POSTURE_DEPLOYMENT_ID`, or the ID with `--organization` and `--location` (gcloud help of `scc posture-deployments`). |
| `WORKLOAD` (`postures extract`) | `projects/PROJECT_NUMBER`, `folder/FOLDER_ID`, `organizations/ORGANIZATION_ID` (as listed in the source; see Notes). |
| Deletable deployment states | `ACTIVE`, `CREATE_FAILED`, `UPDATE_FAILED`, `DELETE_FAILED`. |

## Notes

- The SCC Enterprise tier shuts down on May 21, 2027; organizations move to Premium on or after that date.
- Deploying a posture applies org policy and detector definitions. Each custom org policy and each custom Security Health Analytics detector in the posture creates a new custom constraint (the constraint ID carries the posture revision ID suffix; if all deployments are deleted the suffix becomes a random UUID). Custom modules default to Enabled.
- Updating an already deployed revision creates a new revision. A custom constraint deleted in the console blocks updating the deployment with the same posture ID (Organization Policy forbids same-name constraints); create a new version or use a different posture ID. Findings for policy deployments deleted during an update are deactivated.
- Deleting a posture deployment removes the posture from the resource and deactivates its findings; custom org policies are deleted but the custom constraint remains; built-in detectors inherit from the parent (folder/project deployment) or revert to defaults (organization deployment). Deleting a posture deletes all revisions and is blocked while any revision is deployed. These operations are disruptive and not undoable; try them on a disposable project first.
- A posture deployment that includes organization policy constraints enforces them on real resources and can block production changes. Review the YAML and test in a non-production folder first.
- Extracting policies: custom constraints created by other methods (for example the console) cannot be used; the YAML must include the custom constraint definition.
- Drift is a policy change made outside the posture. The console query for drift from Gemini Enterprise Agent Platform organization policies in a posture uses the categories `SECURITY_POSTURE_POLICY_DRIFT`, `SECURITY_POSTURE_POLICY_DELETE`, `SECURITY_POSTURE_DETECTOR_DRIFT`, `SECURITY_POSTURE_DETECTOR_DELETE`; a finding for a test change appears within five minutes. For AI workloads, filter `state="ACTIVE" AND NOT mute="MUTED" AND resource.type:"aiplatform"`.
- The source's example for the `secure_ai_essential` template uses `--revision-id=v.1.0`; the gcloud 593.0.0 help example for `posture-templates describe` uses `v1.0.0`. Omit `--revision-id` to get the latest revision.
- Corrected from the official docs: the posture YAML header read `name: organizations/ORGANIZATION_ID/locations/global/posture/POSTURE_ID` (and `.../posture/stagingAIPosture` in the example); the `Posture.name` description in the Security Posture API v1 Discovery document gives the format `organizations/{organization}/locations/global/postures/{posture_id}`.
- Source inconsistency: the source's workload list mixes plural and singular (`projects/PROJECT_NUMBER`, `folder/FOLDER_ID`, `organizations/ORGANIZATION_ID`); the `--workload` help of `gcloud scc postures extract` (gcloud 593.0.0) lists `projects/projectNumber`, `folders/folderNumber`, `organizations/organizationNumber`; the `ExtractPostureRequest.workload` description in the Security Posture API v1 Discovery document lists `organization/{organization_number}`, `folder/{folder_number}`, `project/{project_number}`. gcloud passes the value through without validating it. The source's list is kept.
- The source's extract example (`workload=folder/3589215982`, without `--`) and update example (`organizations/3589215982/locations/global/posture-example-1`, without the `postures/` segment) are omitted because gcloud 593.0.0 rejects both (`unrecognized arguments: workload=folder/3589215982`, and the posture path cannot be parsed); the help examples use `--workload=projects/456` and `organizations/123/locations/global/postures/foo-posture`.
- Source inconsistency: the gcloud example filters drift findings on `category=\"SECURITY_POSTURE_DRIFT\"`, while the console query in the same source lists the categories `SECURITY_POSTURE_POLICY_DRIFT`, `SECURITY_POSTURE_POLICY_DELETE`, `SECURITY_POSTURE_DETECTOR_DRIFT` and `SECURITY_POSTURE_DETECTOR_DELETE`. The command is kept as written.
- Store the posture file in a version-controlled repository.
- The source also shows Console and Terraform (`google_securityposture_posture`, `google_securityposture_posture_deployment`) forms and the AWS and `ainotebooks.accessMode` / `compute.trustedImageProjects` YAML examples, omitted here.
- Source: https://docs.cloud.google.com/security-command-center/docs/how-to-use-security-posture (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [security-posture-overview.md](./security-posture-overview.md)
- [security-posture-essentials-secure-default-template.md](./security-posture-essentials-secure-default-template.md)
- [validate-iac.md](./validate-iac.md)
