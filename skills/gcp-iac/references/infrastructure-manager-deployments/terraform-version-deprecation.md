---
source: https://docs.cloud.google.com/infrastructure-manager/docs/terraform-version-deprecation
---

# Terraform version management policy

Each Terraform version in Infra Manager goes through availability, deprecation and end of support. Auto-migration is opt-in per location through the `automigrationconfig` gcloud group.

## Signature / Usage

### Configure the auto-migration policy

Apply the policy for each location in your project.

Enable:

```bash
gcloud infra-manager automigrationconfig enable-auto-migration --project=PROJECT_ID --location=LOCATION
```

Describe:

```bash
gcloud infra-manager automigrationconfig describe --project=PROJECT_ID --location=LOCATION
```

## Options / Props

### Version table

| Terraform version | Pricing tier | Date available | Deprecation date | End of support date | Auto-migrate to version |
|---|---|---|---|---|---|
| `1.2.3` | Free tier | 8/21/2023 | 1/8/2026 | 2/8/2026 | `1.5.7` |
| `1.3.10` | Free tier | 3/14/2024 | TBD | TBD | TBD |
| `1.4.7` | Free tier | 3/14/2024 | TBD | TBD | TBD |
| `1.5.7` | Free tier | 3/14/2024 | TBD | TBD | TBD |
| `1.16.5` | Paid | 11/2/2026 | TBD | TBD | TBD |

### Columns

| Column | Meaning |
|---|---|
| Pricing tier | Free tier (no Infra Manager management fee) or Paid (deployment and management charges) |
| Date available | When the version becomes available in Infra Manager |
| Deprecation date | After this date, creating or updating deployments with the version generates a warning |
| End of support date | Ends 180 days (or longer) after deprecation; for `1.2.3` it ends one month after deprecation |
| Auto-migrate to version | Version deployments move to after end of support, if opted in |

## Notes

- Deprecated: Terraform `1.2.3` has deprecation date 1/8/2026 and end of support date 2/8/2026 in the table above.
- When a version is deprecated, the documentation is updated with both dates and creating or updating a deployment or preview with it returns a warning that includes the end of support date.
- After the end of support date the version is obsolete: creating a new deployment with it fails with an error. Updating an existing deployment that references an obsolete version depends on auto-migration.
- The source calls auto-migration "an opt-in process that you configure through an organization policy"; the commands above configure it for one location of a project at a time. If you have not opted in, any update to a deployment using an unsupported version fails; edit the deployment to specify a supported version and retry.
- New stable Terraform versions are added to the supported list, appear in the Console, gcloud and API, and an Infra Manager release note is created.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/terraform-version-deprecation (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [infra-manager-terraform.md](./infra-manager-terraform.md)
- [update-deployment.md](./update-deployment.md)
