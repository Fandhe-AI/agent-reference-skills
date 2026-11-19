---
source: https://docs.cloud.google.com/docs/terraform/policy-validation/migrate-from-terraform-validator
---

# Migrate from terraform-validator

`gcloud beta terraform vet` replaces the open-source `terraform-validator` project with a few minor differences. Migrating a CI/CD pipeline means changing the command and arguments, and optionally upgrading constraint templates to the newer format (Preview feature).

## Signature / Usage

### 1. Update the command and args

Replace `terraform-validator validate` with `gcloud beta terraform vet`, and `--policy-path` with `--policy-library`.

```bash
# Old
terraform-validator validate ./tfplan.json --policy-path=/path/to/policy-library

# New
gcloud beta terraform vet ./tfplan.json --policy-library=/path/to/policy-library
```

With service account impersonation:

```bash
# Old
GOOGLE_IMPERSONATE_SERVICE_ACCOUNT=account@project.iam.gserviceaccount.com
terraform-validator validate ./tfplan.json --policy-path=/path/to/policy-library

# New
gcloud beta terraform vet ./tfplan.json --policy-library=/path/to/policy-library \
  --impersonate-service-account=account@project.iam.gserviceaccount.com
```

## Options / Props

### Argument mapping

| terraform-validator | gcloud beta terraform vet |
|---------------------|---------------------------|
| `terraform-validator validate` | `gcloud beta terraform vet` |
| `--policy-path` | `--policy-library` |
| `GOOGLE_IMPERSONATE_SERVICE_ACCOUNT` environment variable | `--impersonate-service-account` (gcloud-wide flag) |

## Notes

- Preview feature (Pre-GA Offerings Terms apply).
- Optional upgrade of constraint templates: `terraform-validator` documentation historically described `v1alpha1` Constraint Framework policies; a newer format is recommended for writing new policies (https://github.com/GoogleCloudPlatform/policy-library/blob/main/docs/constraint_template_authoring.md), and existing policies can be upgraded (same document, section "updating-from-v1alpha1-templates"). For policies sourced from https://github.com/GoogleCloudPlatform/policy-library, stay in sync with the remote repository.
- Source: https://docs.cloud.google.com/docs/terraform/policy-validation/migrate-from-terraform-validator (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [policy-validation-overview.md](./policy-validation-overview.md)
- [validate-policies.md](./validate-policies.md)
- [create-terraform-constraints.md](./create-terraform-constraints.md)
