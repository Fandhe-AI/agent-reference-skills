---
source: https://docs.cloud.google.com/infrastructure-manager/docs/custom-constraints
---

# Custom constraints for Infrastructure Manager

Use Organization Policy Service custom constraints to restrict operations on `config.googleapis.com/Deployment` and `config.googleapis.com/Preview`. A constraint is a YAML file with a CEL condition; an organization policy then enforces it.

## Signature / Usage

### Constraint file format

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/CONSTRAINT_NAME
resourceTypes: RESOURCE_NAME
methodTypes:
  - CREATE
  - UPDATE 
condition: "CONDITION"
actionType: ACTION
displayName: DISPLAY_NAME
description: DESCRIPTION
```

```bash
gcloud org-policies set-custom-constraint CONSTRAINT_PATH
```

```bash
gcloud org-policies list-custom-constraints --organization=ORGANIZATION_ID
```

### Policy that enforces the constraint

```yaml
name: projects/PROJECT_ID/policies/CONSTRAINT_NAME
spec:
  rules:
  - enforce: true
```

```bash
gcloud org-policies set-policy POLICY_PATH
```

### Example: forbid new deployments from importing existing resources

Save as `constraint-import-resources.yaml`:

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/custom.disallowImportExistingResources
resourceTypes:
- config.googleapis.com/Deployment
methodTypes:
- CREATE
condition: "resource.importExistingResources == true"
actionType: DENY
displayName: Reject existing resources
description: New deployments disallow the import of existing resources.
```

Adapted (not in the official docs): the source applies `~/constraint-import-resources` (no extension) although the file is saved as `constraint-import-resources.yaml`.

```bash
gcloud org-policies set-custom-constraint ~/constraint-import-resources.yaml
```

```bash
gcloud org-policies list-custom-constraints --organization=ORGANIZATION_ID
```

Save as `policy-enforce-import-constraint.yaml`, then apply and verify:

```yaml
name: projects/PROJECT_ID/policies/custom.disallowImportExistingResources
spec:
  rules:
  - enforce: true
```

```bash
gcloud org-policies set-policy ~/policy-enforce-import-constraint.yaml
```

```bash
gcloud org-policies list --project=PROJECT_ID
```

Test (wait about two minutes after applying the policy):

Adapted (not in the official docs): added `--import-existing-resources`, without which the deployment does not import existing resources and the `resource.importExistingResources == true` condition does not match.

```bash
gcloud infra-manager deployments apply projects/PROJECT_ID/locations/us-central1/deployments/quickstart-deployment \
    --service-account=projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
    --git-source-repo=https://github.com/terraform-google-modules/terraform-google-network \
    --git-source-directory=modules/vpc \
    --git-source-ref=main \
    --input-values=project_id=PROJECT_ID,network_name=quickstart-vpc \
    --import-existing-resources
```

```text
Operation denied by custom org policies: ["customConstraints/custom.disallowImportExistingResources": "New deployments disallow the import of existing resources."]
```

## Options / Props

### Supported resources and fields

| Resource | Field |
|---|---|
| config.googleapis.com/Deployment | `resource.artifactsGcsBucket` |
| config.googleapis.com/Deployment | `resource.importExistingResources` |
| config.googleapis.com/Deployment | `resource.name` |
| config.googleapis.com/Deployment | `resource.quotaValidation` |
| config.googleapis.com/Deployment | `resource.serviceAccount` |
| config.googleapis.com/Deployment | `resource.terraformBlueprint.gcsSource` |
| config.googleapis.com/Deployment | `resource.terraformBlueprint.gitSource.directory` |
| config.googleapis.com/Deployment | `resource.terraformBlueprint.gitSource.ref` |
| config.googleapis.com/Deployment | `resource.terraformBlueprint.gitSource.repo` |
| config.googleapis.com/Deployment | `resource.terraformBlueprint.inputValues[*].inputValue` |
| config.googleapis.com/Deployment | `resource.tfVersionConstraint` |
| config.googleapis.com/Deployment | `resource.workerPool` |
| config.googleapis.com/Preview | `resource.artifactsGcsBucket` |
| config.googleapis.com/Preview | `resource.deployment` |
| config.googleapis.com/Preview | `resource.name` |
| config.googleapis.com/Preview | `resource.previewMode` |
| config.googleapis.com/Preview | `resource.serviceAccount` |
| config.googleapis.com/Preview | `resource.terraformBlueprint.gcsSource` |
| config.googleapis.com/Preview | `resource.terraformBlueprint.gitSource.directory` |
| config.googleapis.com/Preview | `resource.terraformBlueprint.gitSource.ref` |
| config.googleapis.com/Preview | `resource.terraformBlueprint.gitSource.repo` |
| config.googleapis.com/Preview | `resource.terraformBlueprint.inputValues[*].inputValue` |
| config.googleapis.com/Preview | `resource.tfVersionConstraint` |
| config.googleapis.com/Preview | `resource.workerPool` |

### Constraint fields and limits

| Field | Description |
|---|---|
| `name` | `organizations/ORGANIZATION_ID/customConstraints/custom.NAME`; letters and numbers only, up to 70 characters not counting the `custom.` prefix. No PII or sensitive data (may appear in error messages). |
| `resourceTypes` | Fully qualified resource name, for example `config.googleapis.com/Deployment`. Most resource types support up to 20 custom constraints; creating more fails. |
| `methodTypes` | `CREATE`, or both `CREATE` and `UPDATE`. With `UPDATE` on a resource that violates the constraint, changes are blocked unless the change resolves the violation. |
| `condition` | CEL condition, up to 1,500 characters, for example `resource.importExistingResources == true`. |
| `actionType` | `ALLOW` (permitted only if the condition is true; every other case is blocked) or `DENY` (blocked if the condition is true). |
| `displayName` | Up to 200 characters; used in error messages. |
| `description` | Up to 2000 characters; shown as the error message on violation. |

### Required roles and permissions

| Role / permission | Needed for |
|---|---|
| `roles/orgpolicy.policyAdmin` (Organization Policy Administrator) on the organization | Managing organization policies (`orgpolicy.*`) |
| `roles/config.admin` (Infra Manager Admin) on the project | Creating or updating a deployment or preview |
| `config.deployments.create`, `config.deployments.update`, `config.previews.create` on the project | Creating or updating a deployment or preview |

## Notes

- A policy requires up to 15 minutes to take effect (the source test says to wait about two minutes). By default policies are inherited by descendants of the resource they are enforced on; enforce at organization, folder, or project level.
- If you add a conditional rule to an organization policy you must add at least one unconditional rule or the policy cannot be saved.
- Console steps for creating a constraint and policy are not reproduced here. General custom constraints and Organization Policy are covered by `gcp-foundation`.
- Corrected from the official docs: `set-custom-constraint ~/constraint-import-resources` did not include the `.yaml` extension of the file the source asks you to create.
- Corrected from the official docs: the source test command, introduced as creating "a Infra Manager deployment that imports existing resources", does not pass `--import-existing-resources`, so `importExistingResources` is not set to `true` and the constraint condition is not met; the flag (in gcloud 593.0.0 help for `deployments apply`) was added. The command still uses `--git-source-ref=main` (a moving ref) as written; the denial output is the one the source page gives.
- The source table of example policies for common use cases repeats the import-existing-resources constraint above and is not reproduced here.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/custom-constraints (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [preview-deployment.md](./preview-deployment.md)
- [import-resources.md](./import-resources.md)
- [deployment-groups.md](./deployment-groups.md)
