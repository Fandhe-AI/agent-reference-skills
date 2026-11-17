---
source: https://docs.cloud.google.com/intrusion-detection-system/quotas
---

# Quotas

Cloud IDS enforces quotas (adjustable defaults) and system limits (fixed). Quotas generally apply per Google Cloud project.

## Signature / Usage

### Check quotas

Adapted (not in the official docs): the source shows `gcloud compute project-info describe` (and `gcloud compute regions describe`), which return Compute Engine project and region quotas, not Cloud IDS quotas; this lists the quotas of `ids.googleapis.com` with Cloud Quotas instead.

```bash
gcloud quotas info list --service=ids.googleapis.com --project=PROJECT_ID
```

## Options / Props

### Quotas

| Item | Description | Quota |
|------|-------------|-------|
| IDS endpoints per zone | Maximum IDS endpoints that can be created per project in each zone | 10 |
| API requests per minute | Maximum IDS API requests per minute per project | 1200 (or 20 per second) |

### Roles to manage quotas

| Task | Required role |
|------|---------------|
| Check quotas | Project Owner (`roles/owner`), Editor (`roles/editor`) or Quota Viewer (`roles/servicemanagement.quotaViewer`) |
| Modify / request quota | Owner, Editor, Quota Administrator (`roles/servicemanagement.quotaAdmin`), or a custom role with `serviceusage.quotas.update` |

## Notes

- Exceeding a quota with `gcloud` prints a `quota exceeded` error and exits with code `1`; an API request returns `413 Request Entity Too Large`.
- Quotas don't guarantee resource availability.
- The source also shows Console steps.
- Corrected from the official docs: the source checks quotas with `gcloud compute project-info describe --project PROJECT_ID` and `gcloud compute regions describe example-region`; those commands describe the Compute Engine project and region, so they don't show Cloud IDS quotas. The example uses `gcloud quotas info list --service=ids.googleapis.com` instead (gcloud 593.0.0 help: "list QuotaInfos of all quotas for a given project, folder or organization", `--service` is "Name of the service in which the quota is defined"). Snippet adapted from https://docs.cloud.google.com/sdk/gcloud/reference/quotas/info/list.
- Source: https://docs.cloud.google.com/intrusion-detection-system/quotas (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [ids-overview.md](./ids-overview.md)
- [configuring-ids.md](./configuring-ids.md)
- [nsi-quotas.md](./nsi-quotas.md)
