---
source: https://docs.cloud.google.com/security-command-center/docs/validate-iac
---

# Validate your IaC against your Google Cloud organization's policies

IaC validation checks Terraform plan files against the organization policies and Security Health Analytics detectors defined in postures deployed on your Google Cloud organization, so developers can fix violations before resources are created. It supports organization policies and Security Health Analytics detectors only, and Terraform plan files only. Available on SCC Standard-legacy, Premium and Enterprise (Deprecated) tiers with organization-level activation; the source's setup step asks you to verify the Premium or Enterprise tier is activated at the organization level.

## Signature / Usage

### Prerequisites

Enable the Security Posture and Security Center Management APIs (`securityposture.googleapis.com`, `securitycentermanagement.googleapis.com`). Optional impersonation:

```bash
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
```

Define your organization policies and Security Health Analytics detectors, for example through a security posture (see the posture how-to page).

### Create an IaC validation report with gcloud

Initialize Terraform and make sure the Google provider is v5.5 or later; upgrade if needed:

```bash
terraform init -upgrade
```

Convert the Terraform plan to JSON:

```bash
terraform plan -out TF_PLAN_FILENAME
terraform show -json TF_PLAN_FILENAME > TF_PLAN_JSON_FILENAME.json
```

Create the report:

```bash
gcloud scc iac-validation-reports create PARENT \
  --tf-plan-file=TF_PLAN_JSON_FILENAME.json
```

```bash
gcloud scc iac-validation-reports create organizations/3589215982/locations/global --tf-plan-file=planFile.json
```

The command returns the operation details of the report creation; look it up with `gcloud scc posture-operations describe`.

## Options / Props

| Item | Value |
|---|---|
| Role (on the organization) | Security Posture Shift-Left Validator |
| `PARENT` | `organizations/ORGANIZATION_ID/locations/LOCATION`; `LOCATION` is `global`. |
| `--tf-plan-file` | Path to the JSON file containing the Terraform plan to validate. |
| Terraform Google provider | v5.5 or later. |
| `serviceusage.services.enable` | Needed to enable the APIs (for example via Owner or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`). |

## Notes

- Terraform code requirements: populate the parent attribute (project, folder or organization) of every resource; modify assets and policies separately (a plan that changes both at the same time is not supported); use only supported asset types and policies; review the IaC validation limitations on the SCC quotas page.
- Do not put passwords or other sensitive or personally identifiable data in the plan file. Fields marked sensitive in resource changes are removed by the validation feature.
- Integrations with Cloud Build, Jenkins and GitHub Actions are described on separate pages, not in this category.
- The SCC Enterprise tier shuts down on May 21, 2027; organizations move to Premium on or after that date.
- The source also shows Console IAM role steps and Cloud Shell setup.
- Source: https://docs.cloud.google.com/security-command-center/docs/validate-iac (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [supported-iac-assets-policies.md](./supported-iac-assets-policies.md)
- [iac-validation-tutorial.md](./iac-validation-tutorial.md)
- [how-to-use-security-posture.md](./how-to-use-security-posture.md)
