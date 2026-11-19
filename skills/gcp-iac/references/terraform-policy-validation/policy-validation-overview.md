---
source: https://docs.cloud.google.com/docs/terraform/policy-validation
---

# Policy validation with gcloud beta terraform vet

`gcloud beta terraform vet` enforces policy compliance in an infrastructure-as-code CI/CD pipeline. It validates a Terraform plan against constraints (guardrails) kept in a policy library, retrieving project data with Google Cloud APIs so the validation reflects the accurate plan. The same constraints can be used with any other tool that supports the same framework. This feature is in Preview.

## Signature / Usage

### Validate a Terraform plan

```bash
terraform plan -out=tfplan.tfplan
terraform show -json ./tfplan.tfplan > ./tfplan.json
```

```bash
git clone POLICY_LIBRARY_REPO POLICY_LIBRARY_DIR
gcloud beta terraform vet tfplan.json --policy-library=POLICY_LIBRARY_DIR
```

## Options / Props

### What you can do with the tool

| Capability |
|------------|
| Enforce your organization's policy at any stage of application development |
| Remove manual errors by automating policy validation |
| Reduce learning time by using a single paradigm for all policy management |

### Documentation set

| Page | Topic |
|------|-------|
| Quickstart | Implement a constraint that throws an error, then modify it so the validation check passes |
| Create a policy library | Create a centralized policy repository |
| Create Terraform constraints | Add Terraform-based constraints |
| Create CAI constraints | Add CAI-based constraints |
| Validate policies | Validate policy compliance with `gcloud beta terraform vet` |
| Troubleshooting | Potential problems and solutions |
| Migrate from terraform-validator | Migrate to `gcloud beta terraform vet` from terraform-validator |

## Notes

- Preview: this product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms. Pre-GA products and features are available "as is" and might have limited support.
- Support: until `gcloud beta terraform vet` is generally available (GA), regular support channels might not be available. Open a ticket on the `terraform-google-conversion` GitHub repository (https://github.com/GoogleCloudPlatform/terraform-google-conversion/issues/new/choose).
- The overview page has no code. Snippet taken from https://docs.cloud.google.com/docs/terraform/policy-validation/validate-policies
- `gcloud beta terraform vet` checks Terraform plans against a policy library before apply; Security Command Center IaC validation is in `gcp-security-compliance`, and Organization Policy custom constraints are in `gcp-foundation`. gcloud installation is in `gcp-cli`.
- Source: https://docs.cloud.google.com/docs/terraform/policy-validation (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [quickstart.md](./quickstart.md)
- [create-policy-library.md](./create-policy-library.md)
- [create-terraform-constraints.md](./create-terraform-constraints.md)
- [create-cai-constraints.md](./create-cai-constraints.md)
- [validate-policies.md](./validate-policies.md)
- [policy-validation-troubleshooting.md](./policy-validation-troubleshooting.md)
- [migrate-from-terraform-validator.md](./migrate-from-terraform-validator.md)
