---
source: https://docs.cloud.google.com/docs/terraform/best-practices/cross-config-communication
---

# Terraform on Google Cloud: Cross-Configuration Communication

How to share information across different Terraform configurations (possibly maintained by different teams) without storing them in one directory or repository.

## Signature / Usage

### Reference another root module's outputs through remote state

```hcl
data "terraform_remote_state" "network_project" {
  backend = "gcs"

  config = {
    bucket = "BUCKET"
  }
}
```

## Options / Props

| Need | Recommended approach |
|------|----------------------|
| Share information between Terraform configurations | Remote state referencing other root modules; Cloud Storage or Terraform Enterprise are the preferred state backends |
| Query resources not managed by Terraform | Data sources from the Google provider (for example, the default Compute Engine service account via a data source) |
| Query resources managed by another Terraform configuration | Do not use data sources; they create implicit dependencies on resource names and structures that normal Terraform operations might unintentionally break |

## Notes

- The cross-configuration communication page has no code. Snippet taken from https://docs.cloud.google.com/docs/terraform/best-practices/root-modules
- Only root module-level outputs can be referenced through remote state; see the root modules page.
- Source: https://docs.cloud.google.com/docs/terraform/best-practices/cross-config-communication (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [root-modules.md](./root-modules.md)
- [version-control.md](./version-control.md)
- [working-with-resources.md](./working-with-resources.md)
