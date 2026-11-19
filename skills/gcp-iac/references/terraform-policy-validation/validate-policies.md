---
source: https://docs.cloud.google.com/docs/terraform/policy-validation/validate-policies
---

# Validate Terraform plans with gcloud beta terraform vet

Install the terraform-tools component, grant the validating account the required permissions, export a Terraform plan as JSON and run `gcloud beta terraform vet` against a policy library. The command exits 0 with no violations, or 2 with a list of violations. Preview feature; compatible with Terraform 0.12+.

## Signature / Usage

### Install the terraform-tools component

Install Google Cloud CLI but skip `gcloud init`, then:

```bash
gcloud components update
gcloud components install terraform-tools
```

Verify that the gcloud CLI is installed:

```bash
gcloud beta terraform vet --help
```

### 1. Generate a Terraform plan

Run in your Terraform directory. `gcloud beta terraform vet` takes `terraform plan` JSON as input.

```bash
terraform plan -out=tfplan.tfplan
terraform show -json ./tfplan.tfplan > ./tfplan.json
```

### 2. Run gcloud beta terraform vet

```bash
git clone POLICY_LIBRARY_REPO POLICY_LIBRARY_DIR
gcloud beta terraform vet tfplan.json --policy-library=POLICY_LIBRARY_DIR
```

The command retrieves project data with Google Cloud APIs needed for an accurate validation of your plan. If violations are found, JSON output (`--format=json`) looks like this:

```json
[
  {
    "constraint": "GCPIAMAllowedPolicyMemberDomainsConstraintV2.service_accounts_only",
    "constraint_config": {
      "api_version": "constraints.gatekeeper.sh/v1alpha1",
      "kind": "GCPIAMAllowedPolicyMemberDomainsConstraintV2",
      "metadata": {
        "annotations": {
          "description": "Checks that members that have been granted IAM roles belong to allowlisted domains.",
          "validation.gcp.forsetisecurity.org/originalName": "service_accounts_only",
          "validation.gcp.forsetisecurity.org/yamlpath": "policies/constraints/iam_service_accounts_only.yaml"
        },
        "name": "service-accounts-only"
      },
      "spec": {
        "match": {
          "target": [
            "organizations/**"
          ]
        },
        "parameters": {
          "domains": [
            "gserviceaccount.com"
          ]
        },
        "severity": "high"
      }
    },
    "message": "IAM policy for //cloudresourcemanager.googleapis.com/projects/PROJECT_ID contains member from unexpected domain: user:me@example.com",
    "metadata": {
      "ancestry_path": "organizations/ORG_ID/projects/PROJECT_ID",
      "constraint": {
        "annotations": {
          "description": "Checks that members that have been granted IAM roles belong to allowlisted domains.",
          "validation.gcp.forsetisecurity.org/originalName": "service_accounts_only",
          "validation.gcp.forsetisecurity.org/yamlpath": "policies/constraints/iam_service_accounts_only.yaml"
        },
        "labels": {},
        "parameters": {
          "domains": [
            "gserviceaccount.com"
          ]
        }
      },
      "details": {
        "member": "user:me@example.com",
        "resource": "//cloudresourcemanager.googleapis.com/projects/PROJECT_ID"
      }
    },
    "resource": "//cloudresourcemanager.googleapis.com/projects/PROJECT_ID",
    "severity": "high"
  }
]
```

### CI/CD example

Adapted (not in the official docs): `[ $retVal -ne 0]` is written as `[ "$retVal" -ne 0 ]`, so an error from `gcloud beta terraform vet` stops the script before `terraform apply`; `$retVal` is quoted in both tests; the last line applies the vetted saved plan (`terraform apply tfplan.tfplan`).

```bash
terraform plan -out=tfplan.tfplan
terraform show -json ./tfplan.tfplan > ./tfplan.json
git clone POLICY_LIBRARY_REPO POLICY_LIBRARY_DIR
VIOLATIONS=$(gcloud beta terraform vet tfplan.json --policy-library=POLICY_LIBRARY_DIR --format=json)
retVal=$?
if [ "$retVal" -eq 2 ]; then
  # Optional: parse the VIOLATIONS variable as json and check the severity level
  echo "$VIOLATIONS"
  echo "Violations found; not proceeding with terraform apply"
  exit 1
fi
if [ "$retVal" -ne 0 ]; then
  echo "Error during gcloud beta terraform vet; not proceeding with terraform apply"
  exit 1
fi

echo "No policy violations detected; proceeding with terraform apply"

terraform apply tfplan.tfplan
```

## Options / Props

### Required permissions

| Permission | Why |
|------------|-----|
| `getIamPolicy` | Gets full IAM policies and merges them with members and bindings to get an accurate end state |
| `resourcemanager.projects.get` | Gets project ancestry to construct a full CAI Asset Name for related projects |
| `resourcemanager.folders.get` | Gets folder ancestry to construct a full CAI Asset Name when folder-related resources are validated |

### Flags

| Flag | Description |
|------|-------------|
| `--policy-library=POLICY_LIBRARY_DIR` | Directory that contains a policy library (required) |
| `--project=PROJECT_ID` | Optional; default project used when building the ancestry for any resource without an explicit project |
| `--format=FORMAT` | Default is yaml. Supported: `default`, `json`, `none`, `text`, `yaml` |
| `--region=REGION` | Default region for resources that do not have one set (listed in gcloud 593.0.0 help, not on the source page) |
| `--zone=ZONE` | Default zone for resources that do not have one set (listed in gcloud 593.0.0 help, not on the source page) |

### Exit codes

| Code | Meaning |
|------|---------|
| 0 | All constraints validated; no violations displayed |
| 2 | Violations found; a list of violations is displayed |

## Notes

- Preview feature (Pre-GA Offerings Terms apply). The command is `gcloud beta terraform vet`; `gcloud alpha terraform vet` also exists (gcloud 593.0.0 help).
- Compatible with Terraform 0.12+.
- Source inconsistency: this page lists the permission as `getIamPolicy` without a service prefix; for projects, the quickstart page names `resourcemanager.projects.getIamPolicy`.
- A policy library is required; see the create-policy-library page.
- Corrected from the official docs: the source CI script has `if [ $retVal -ne 0]`; without a space before `]`, `[` fails with a missing `]` error, the condition is false and the script continues to `terraform apply` after an error.
- The CI example ends with `terraform apply`; try it on a disposable project first.
- Corrected from the official docs: the source ends the CI script with `terraform apply`, which creates a new plan instead of applying the plan that `gcloud beta terraform vet` checked; if the configuration, variables or remote resources change in between, unchecked changes are applied. The script applies the saved plan `tfplan.tfplan`, so what is applied is what was vetted.
- Developers can also run `gcloud beta terraform vet` locally to test Terraform changes before the CI/CD pipeline runs.
- `--format` and `--project` are gcloud-wide flags; the gcloud 593.0.0 help lists `--region` and `--zone` as the command's optional flags.
- `gcloud beta terraform vet` checks Terraform plans against a policy library before apply; Security Command Center IaC validation is in `gcp-security-compliance`, and Organization Policy custom constraints are in `gcp-foundation`.
- Source: https://docs.cloud.google.com/docs/terraform/policy-validation/validate-policies (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/terraform/vet (gcloud 593.0.0 help)

## Related

- [policy-validation-overview.md](./policy-validation-overview.md)
- [create-policy-library.md](./create-policy-library.md)
- [policy-validation-troubleshooting.md](./policy-validation-troubleshooting.md)
- [migrate-from-terraform-validator.md](./migrate-from-terraform-validator.md)
