---
source: https://docs.cloud.google.com/service-usage/docs/access-control
---

# Service Usage Access Control and Rate Quotas

IAM permissions and roles for the Service Usage API, plus its own rate quotas.

## Signature / Usage

Get quota metric names for Service Usage (needs a quota project; see Cloud Quotas):

```bash
gcloud beta quotas info list --project=PROJECT_ID_OR_NUMBER \
    --service=serviceusage.googleapis.com --format="value(metric)"
```

## Options / Props

Required permissions per method:

| Method | Required permissions |
|--------|----------------------|
| `services.batchEnable`, `services.enable` | On the project `serviceusage.services.enable`; on the service(s) `servicemanagement.services.bind` |
| `services.disable` | On the project `serviceusage.services.disable` |
| `services.get` | `serviceusage.services.get` |
| `services.list` | `serviceusage.services.list` |
| `consumerQuotaMetrics` list / get (v1beta1), limits get, consumerOverrides / adminOverrides list | On the project `serviceusage.quotas.get`; on the service `servicemanagement.services.bind` |
| consumerOverrides / adminOverrides create / patch / delete | On the project `serviceusage.quotas.update`; on the service `servicemanagement.services.bind` |
| Use a project for quota and billing | On the project `serviceusage.services.use` |

Roles:

| Role | Capability |
|------|-----------|
| `roles/viewer` | `serviceusage.services.get`, `.list`, `serviceusage.quotas.get` |
| `roles/editor`, `roles/owner` | Viewer permissions plus `serviceusage.services.disable`, `.enable`, `.use`, `serviceusage.quotas.update` |
| Service Usage Admin `roles/serviceusage.serviceUsageAdmin` | Enable / disable / inspect services, operations, consumer policies, quota update, use quota and billing of a consumer project |
| Service Usage Consumer `roles/serviceusage.serviceUsageConsumer` | Inspect services and operations; consume quota and billing for a consumer project |
| Service Usage Viewer `roles/serviceusage.serviceUsageViewer` | Inspect service states and operations |
| API Keys Admin `roles/serviceusage.apiKeysAdmin` | Create, delete, update, get, list API keys; regenerate / revert |
| API Keys Viewer `roles/serviceusage.apiKeysViewer` | Get and list API keys |

Service Usage rate quotas:

| Quota | Default |
|-------|---------|
| List available / disabled services requests per minute | 60 |
| List enabled services requests per minute | 600 |
| List public services requests per minute | 60 |
| Default requests per minute (other read-only operations) | 600 |
| Mutate requests per minute (state-changing operations) | 120 |

## Notes

- Adapted from the official docs: the method table writes `serviceusage.quota.get` / `serviceusage.quota.update`; the permission names are `serviceusage.quotas.get` / `serviceusage.quotas.update` (as in the role table of the same official page).
- Three relevant resources: the service, the project, and the long-running operation.
- Quotas have adjustable defaults; system limits are fixed. Quotas apply per project and are shared across all applications and IP addresses in the project. Adjust through the Quotas & System Limits page (see `../quotas/` pages).
- API key lifecycle belongs to the API Keys product; handle key values as secrets (see gcp-security).
- Source: https://docs.cloud.google.com/service-usage/docs/access-control
- Source: https://docs.cloud.google.com/service-usage/docs/quotas
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [enable-disable-services.md](./enable-disable-services.md)
- [../quotas/cloud-quotas-overview.md](../quotas/cloud-quotas-overview.md)
