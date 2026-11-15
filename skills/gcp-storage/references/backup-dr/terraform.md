---
source: https://docs.cloud.google.com/backup-disaster-recovery/docs/terraform
---

# Terraform for Backup and DR

Use the Terraform provider for Google Cloud to provision Backup and DR backup vaults, backup plans and plan associations.

## Signature / Usage

```terraform
resource "google_backup_dr_backup_vault" "default" {
  provider                                   = google-beta
  location                                   = "us-central1"
  backup_vault_id                            = "my-vault"
  description                                = "This vault is created usingTerraform."
  backup_minimum_enforced_retention_duration = "100000s"
  force_update                               = "true"
  ignore_inactive_datasources                = "true"
  allow_missing                              = "true"
}
```

Snippet taken from https://docs.cloud.google.com/backup-disaster-recovery/docs/cloud-console/backup-vault-create (the Terraform twin has no code).

## Options / Props

| Terraform resource | Data source |
|---|---|
| `google_backup_dr_backup_plan_association` | `google_backup_dr_backup_plan_association` |
| `google_backup_dr_backup_vault` | none listed |
| `google_backup_dr_backup_plan` | none listed |

Module: `backup-dr` (https://github.com/GoogleCloudPlatform/terraform-google-backup-dr) deploys backup/recovery appliances.

## Notes

- Workflow: describe configuration, run `terraform plan`, then `terraform apply`, which calls Backup and DR APIs and updates the state file.
- The example sets `force_update`, `ignore_inactive_datasources` and `allow_missing` to "true" as published; review them before use because a retention duration set on a vault is subject to the irreversible enforced-retention rules (see `backup-vault-create.md`).
- Terraform guides listed: create and manage a backup vault, create and manage a backup plan, back up Compute Engine instances. Registry docs: https://registry.terraform.io/providers/hashicorp/google/latest/docs.
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/terraform (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/cloud-console/backup-vault-create (borrowed snippet)

## Related

- [backup-vault-create.md](./backup-vault-create.md)
- [backup-plan-create.md](./backup-plan-create.md)
