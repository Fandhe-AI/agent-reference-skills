---
source: https://docs.cloud.google.com/docs/terraform/best-practices/security
---

# Terraform on Google Cloud: Security Best Practices

Guidelines for securely using Terraform for Google Cloud. Terraform requires sensitive access to your cloud infrastructure, so these practices reduce the associated risk.

## Signature / Usage

### Remote state in a Cloud Storage bucket

```hcl
terraform {
  backend "gcs" {
    bucket = "PROJECT_ID-tfstate"
    prefix = "env/dev"
  }
}
```

## Options / Props

| Practice | Detail |
|----------|--------|
| Use remote state | Cloud Storage state backend locks state for team collaboration and separates state (which may hold sensitive data) from version control; only the build system and highly privileged administrators should access the bucket; gitignore Terraform state files |
| Encrypt state | Buckets are encrypted at rest; customer-supplied encryption keys add a layer via the `GOOGLE_ENCRYPTION_KEY` environment variable; encrypt state even though no secrets should be in it |
| Do not store secrets in state | Examples that store secrets in plaintext: `vault_generic_secret`, `tls_private_key`, `google_service_account_key`, `google_client_config` |
| Mark sensitive outputs | Rely on Terraform's built-in sensitive state support; mark sensitive outputs as sensitive |
| Separation of duties | If you cannot run Terraform from an automated system no user can access, separate permissions and directories (for example a network project maps to a network Terraform service account or user limited to that project) |
| Pre-apply checks | In automated pipelines use a tool like `gcloud terraform vet` to check plan output against policies before apply |
| Continuous audits | After `terraform apply`, run automated checks: Security Health Analytics, InSpec, Serverspec |

## Notes

- The security page has no code. Snippet taken from https://docs.cloud.google.com/secure-source-manager/docs/configure-cicd-terraform-config-as-code
- The source names `gcloud terraform vet`; the gcloud 593.0.0 help has this command on the `beta` and `alpha` tracks only (`gcloud beta terraform vet`).
- Source: https://docs.cloud.google.com/docs/terraform/best-practices/security (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [operations.md](./operations.md)
- [version-control.md](./version-control.md)
- [root-modules.md](./root-modules.md)
