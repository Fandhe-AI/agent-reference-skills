---
source: https://docs.cloud.google.com/infrastructure-manager/docs/infra-manager-terraform
---

# Terraform and Infrastructure Manager

Infra Manager deploys Terraform configurations (called blueprints) whose entrypoint is a Terraform root module. This page lists supported Terraform versions and their pricing tier, constraints on configurations, sensitive-data guidance and how to choose the Google Cloud provider.

## Signature / Usage

### Check supported provider versions

View `manifest.json` in the Infra Manager maintained Cloud Storage bucket for the region of your deployment:

```text
https://storage.googleapis.com/LOCATION-im-providers/hashicorp/PROVIDER_VERSION/manifest.json
```

The `versions` field of `manifest.json` lists the supported versions. Example from the source: for a deployment in `africa-south1` using `google-beta`, open https://storage.googleapis.com/africa-south1-im-providers/hashicorp/google-beta/manifest.json.

Select a Terraform version with the `--tf-version-constraint` flag (see deploy-resources.md). The source says the gcloud CLI can configure deployments and previews to use the Infra Manager maintained providers; see deploy-resources.md for the provider source setting.

## Options / Props

### Supported Terraform versions

| Terraform version | Pricing tier | Date available | Deprecation date | End of support date | Auto-migrate to version |
|---|---|---|---|---|---|
| `1.2.3` | Free tier | 8/21/2023 | 1/8/2026 | 2/8/2026 | `1.5.7` |
| `1.3.10` | Free tier | 3/14/2024 | TBD | TBD | TBD |
| `1.4.7` | Free tier | 3/14/2024 | TBD | TBD | TBD |
| `1.5.7` | Free tier | 3/14/2024 | TBD | TBD | TBD |
| `1.16.5` | Paid | 11/2/2026 | TBD | TBD | TBD |

### Constraints on Terraform configurations

| Constraint |
|---|
| Don't include personally identifiable or sensitive information in configuration values. |
| A valid Terraform root module must be provided. Templating or generation of Terraform is not supported. |
| The configuration should be actuatable by a supported Terraform version. |
| Backend blocks shouldn't be defined. |
| Provisioners are not recommended ("Provisioners are a Last Resort"); the Infra Manager runtime environment can change at any time. |

### Providers

| Provider | Notes |
|---|---|
| `google` | Infra Manager maintained |
| `google-beta` | Infra Manager maintained |
| (omit the field) | HashiCorp-maintained Terraform provider for Google Cloud |

## Notes

- Specify the Terraform version when you create, update or preview a deployment (Console or `--tf-version-constraint`). If unspecified for a new deployment or preview, the latest supported free tier version (`1.5.7`) is used; to use a paid version (such as `1.16.5`) you must specify the constraint explicitly.
- When updating a deployment you can upgrade to a later Terraform version but cannot downgrade to an earlier supported version.
- Deprecated: version `1.2.3` has a deprecation date of 1/8/2026 and end of support 2/8/2026 in the table above; after the end of support date the version is obsolete and creating a new deployment with it fails. Deployments move to `1.5.7` (the auto-migrate-to version) only if you opted in to auto-migration. See terraform-version-deprecation.md.
- Licensing and pricing: versions `1.5.7` and earlier are MPL 2.0 open source, in the Free tier with no Infra Manager management fee. `1.16.5` is under the Business Source License (BUSL) and is offered as Paid: each billing account gets a free allowance of up to 500 resources per month; beyond that, resources managed by deployments using a paid version are metered hourly per resource. Previews are not charged. Pricing is on https://cloud.google.com/infrastructure-manager/pricing.
- The `google_storage_bucket_object` argument `content` is labeled sensitive in the provider documentation; use such labels to review configurations. Don't put sensitive values in configuration values.
- Terraform CLI and HCL behave as HashiCorp documents them; this skill covers using them with Google Cloud.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/terraform-version-deprecation (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/infra-manager-terraform (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [terraform-version-deprecation.md](./terraform-version-deprecation.md)
- [deploy-resources.md](./deploy-resources.md)
- [state-file.md](./state-file.md)
