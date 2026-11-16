---
source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/concepts/about-locations
---

# About resource locations

Backup for GKE is a regional service: `BackupPlan` and `RestorePlan` resources live under a project ID and a Google Cloud region, and the region determines where artifacts are stored and restored.

## Signature / Usage

```bash
gcloud beta container backup-restore locations list \
    --project=PROJECT_ID
```

Replace `PROJECT_ID` with the ID of your Google Cloud project.

## Options / Props

| Resource | What the region defines |
| --- | --- |
| `BackupPlan` | Region where all backup artifacts (config backups and volume backups) are stored; the allowed region for CMEK keys (a CMEK key must be in the same region as the `BackupPlan`) |
| `RestorePlan` | Region where backup artifacts are restored; the target cluster must be a zonal or regional cluster in the same region as the `RestorePlan` |

Supported regions:

| Area | Regions |
| --- | --- |
| Northern America | northamerica-northeast1 (Montréal), northamerica-northeast2 (Toronto), northamerica-south1 (Queretaro), us-central1 (Iowa), us-east1 (South Carolina), us-east4 (Northern Virginia), us-east5 (Columbus), us-south1 (Dallas), us-west1 (Oregon), us-west2 (Los Angeles), us-west3 (Salt Lake City), us-west4 (Las Vegas), us-west8 (Phoenix) |
| Europe | europe-central2 (Warsaw), europe-north1 (Finland), europe-north2 (Stockholm), europe-southwest1 (Madrid), europe-west1 (Belgium), europe-west10 (Berlin), europe-west12 (Turin), europe-west2 (London), europe-west3 (Frankfurt), europe-west4 (Netherlands), europe-west6 (Zurich), europe-west8 (Milan), europe-west9 (Paris) |
| Asia | asia-east1 (Taiwan), asia-east2 (Hong Kong), asia-northeast1 (Tokyo), asia-northeast2 (Osaka), asia-northeast3 (Seoul), asia-south1 (Mumbai), asia-south2 (Delhi), asia-southeast1 (Singapore), asia-southeast3 (Bangkok) |
| Indonesia | asia-southeast2 (Jakarta) |
| Oceania | australia-southeast1 (Sydney), australia-southeast2 (Melbourne) |
| Middle East | me-central1 (Doha), me-central2 (Dammam), me-west1 (Tel Aviv) |
| Latin America | southamerica-east1 (São Paulo), southamerica-west1 (Santiago) |
| Africa | africa-south1 (Johannesburg) |

## Notes

- If the cluster being backed up is in a different region than the `BackupPlan`, inter-region data transfer fees can apply; the same applies when the `RestorePlan` region differs from the `BackupPlan` region.
- `VolumeBackup` resources may reference a global snapshot resource, but the snapshot data is restricted to the `BackupPlan` region.
- The list above reflects the page at retrieval time; use the `locations list` command for the current list.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/concepts/about-locations (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [backup-for-gke.md](./backup-for-gke.md)
- [backup-plan.md](./backup-plan.md)
- [restore-plan.md](./restore-plan.md)
