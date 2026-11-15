---
source: https://docs.cloud.google.com/storage/docs/storage-intelligence/overview
---

# Storage Intelligence overview

Storage Intelligence gives centralized visibility and control over Cloud Storage data across your resource hierarchy: cost savings, usage trends, security and compliance monitoring, and bulk operations. It is a subscription (30-day introductory trial available); Storage Insights datasets and storage batch operations require it; a subscription also includes inventory reports and covers their object scan fees.

## Signature / Usage

The twin for this page contains no code. The edition values below are the settings you choose when you configure Storage Intelligence for an organization, folder, or project. The snippet is borrowed from the dataset configuration guide and shows enabling the API used by the Storage Insights datasets part.

```bash
gcloud services enable storageinsights.googleapis.com
```

Snippet taken from https://docs.cloud.google.com/storage/docs/insights/configure-datasets

## Options / Props

### Edition configuration

| Value | Meaning |
|-------|---------|
| `INHERIT` | Inherits the parent resource's edition configuration |
| `STANDARD` | Enables Storage Intelligence; the default when you configure a resource |
| `DISABLED` | Disables it for the resource; children inherit the disabled state unless set to `STANDARD` or `INHERIT` |
| `TRIAL` | Activates the 30-day introductory trial |

### Example hierarchy

| Resource | Edition | Status | Description |
|----------|---------|--------|-------------|
| Organization A | `STANDARD` | Enabled | All folders and projects inherit by default |
| Folder C | `DISABLED` | Disabled | Overrides the inherited `STANDARD` for the folder and its child projects |
| Project E | `DISABLED` | Disabled | Overrides the inherited configuration |

### Resource level and bucket filters

| Level | Applies to |
|-------|-----------|
| Organization | Entire organization; current and new folders and projects inherit unless overridden |
| Folder | All current and new projects in the folder unless overridden |
| Project | All current and new buckets in the project |

Bucket filters include or exclude buckets by location, or by a name regular expression (such as environment prefixes).

## Notes

- Analyze and optimize: Storage Intelligence advisor (capacity trends, anomalies, cost savings, encryption policy compliance in Preview), Storage Insights datasets (SQL in BigQuery), Gemini Cloud Assist natural-language questions, and inventory reports (a subscription includes inventory reports and covers all object scan fees).
- Manage at scale: bucket relocation between regions with minimal downtime (preserves bucket names, object metadata, and storage classes), and storage batch operations across billions of objects.
- Pricing depends on the capabilities used and the volume of data; see Storage Intelligence pricing on the Cloud Storage pricing page.
- Distance: Cloud Storage is Google Cloud's object storage; distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/storage-intelligence/overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/insights/configure-datasets (snippet)

## Related

- [datasets.md](./datasets.md)
- [configure-datasets.md](./configure-datasets.md)
- [inventory-reports.md](./inventory-reports.md)
- [batch-operations-overview.md](./batch-operations-overview.md)
