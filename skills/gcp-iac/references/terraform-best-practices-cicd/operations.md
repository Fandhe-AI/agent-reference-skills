---
source: https://docs.cloud.google.com/docs/terraform/best-practices/operations
---

# Terraform on Google Cloud: Operations Best Practices

Guidelines for Terraform operations: always plan first, run through an automated pipeline, use service account credentials in CI (or workload identity federation outside Google Cloud), avoid importing, and do not edit state by hand.

## Signature / Usage

### Use application default credentials when running locally

```bash
gcloud auth application-default login
```

## Options / Props

| Topic | Recommendation |
|-------|----------------|
| Plan first | Always generate a plan and save it to an output file; execute it after an infrastructure owner approves; even local prototyping should review resources to be added, modified and destroyed |
| Automated pipeline | Run `terraform plan` and `terraform apply` through existing build tooling (for example Jenkins); otherwise adopt Cloud Build or Terraform Cloud |
| CI credentials | Inherit the service account credentials of the service running the pipeline; run CI on Google Cloud where possible (Cloud Build, Google Kubernetes Engine and Compute Engine inject credentials without downloaded keys) |
| CI outside Google Cloud | Prefer workload identity federation to obtain credentials without downloading service account keys |
| Importing | Avoid `terraform import`; create new resources through Terraform and delete the old ones. If deleting causes significant toil, import with explicit approval, then manage the resource exclusively with Terraform |
| State | Do not modify manually; when necessary, use the `terraform state` command |
| Version pins | Regularly review pins for Terraform, providers and modules; automate with a tool such as Dependabot |
| Local development | Authenticate with `gcloud auth application-default login`; do not download service account keys |
| Shell aliases | Optional: `alias tf="terraform"` and `alias terrafrom="terraform"` |

## Notes

- Service account keys are a security risk if not managed correctly; choose a more secure alternative whenever possible. If you must use a key, you are responsible for its security and for the operations in the best practices for managing service account keys. Organizations may have key creation disabled. A key from an external source must be validated before use.
- Google provides a tool to import Google Cloud resources into Terraform state (see the import page of Terraform on Google Cloud).
- Corruption of the state file, which maps configuration to Google Cloud resources, can lead to major infrastructure problems.
- Workload identity federation and service accounts are in `gcp-foundation`; Cloud Build is in `gcp-devops`.
- Source: https://docs.cloud.google.com/docs/terraform/best-practices/operations (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [security.md](./security.md)
- [testing.md](./testing.md)
- [configure-cicd-terraform-config-as-code.md](./configure-cicd-terraform-config-as-code.md)
