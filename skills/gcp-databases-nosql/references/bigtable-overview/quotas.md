---
source: https://docs.cloud.google.com/bigtable/quotas
---

# Quotas and limits

Bigtable uses quotas (default values, adjustments can usually be requested) and system limits (fixed, can't be changed). Quotas apply per Google Cloud project and are shared across all applications and IP addresses; daily quotas reset at midnight Pacific Time. When sending multiple operations in a batch, each operation counts toward the quota or limit.

## Signature / Usage

### Check node quota usage

In the Google Cloud console: IAM & admin > Quotas, pick the Bigtable Admin API service, and look at rows subtitled **SSD nodes per zone** or **HDD nodes per zone** (Limit and Current usage columns).

### Request a node quota increase

Requires at least editor-level permissions on the project. Plan ahead (a few days); increases are not guaranteed and are free.

```text
1. Go to the **Quotas** page.

   [Go to the Quotas page](https://console.cloud.google.com/iam-admin/quotas)
2. On the **Quotas** page, select the quotas you want to change.
3. Click the **Edit Quotas** button on the top of the page.
4. In the right pane, type your name, email, and phone number, then click **Next**.
5. Enter the requested new quota limit, then click **Next**.
6. Submit your request.
```

## Options / Props

### Admin operation quotas

| Name | Default quota |
|------|---------------|
| Instance and cluster read requests | Per day per project: 864,000 ops; per minute per user: 1,000 ops |
| Instance and cluster write requests | Per day per project: 500 ops; per minute per user: 100 ops |
| App profile read requests | Per minute per project: 5,000 ops; per minute per user: 1,000 ops |
| App profile write requests | Per minute per project: 500 ops; per minute per user: 100 ops |
| Table admin read requests | Per day per project: 864,000 ops; per minute per user: 1,000 ops |
| Table admin write requests | Per day per project: 5,000 ops; per minute per user: 100 ops |
| `DropRowRange` method | Per day per project: 5,000 ops; per minute per user: 100 ops |
| Backup operations (create, update, delete) | Per day per project: 1,000 ops; per minute per user: 10 ops |
| Backup retrieval requests | Per day per project: 864,000 ops |
| `RestoreTable` method | Per day per project: 5,000 ops; per minute per user: 100 ops |
| Fine-grained ACL get requests | Per day per project: 864,000 ops; per minute per user: 1,000 ops |
| Fine-grained ACL set requests | Per day per project: 864,000 ops; per minute per user: 1,000 ops |

Admin operation quota increases are generally not granted (exceptions with strong justification).

### Node quotas (per zone per project) and Data Boost quotas (SPUs per project per region)

| Region | SSD nodes | HDD nodes | Data Boost SPUs |
|--------|-----------|-----------|-----------------|
| asia-east1 | 100 | 100 | 100,000 |
| europe-west1 | 200 | 200 | 200,000 |
| us-central1 | 200 | 200 | 200,000 |
| us-east1 | 50 | 50 | 100,000 |
| us-east4 | 50 | 50 | 100,000 |
| us-west1 | 100 | 100 | 100,000 |
| All other locations | 30 | 30 | 30,000 |

With autoscaling, the configured maximum nodes counts toward the limit. Quota doesn't guarantee node availability if a zone is out of nodes; provisioned nodes are always guaranteed.

### Limits

| Area | Limit |
|------|-------|
| App profiles per instance | 2,000 |
| Authorized views per instance / column qualifier prefixes per view | 10,000 / 10 |
| Standard backups per table per cluster | 150 |
| Hot backups per table per cluster | 10 |
| Cluster SSD usage to enable hot automated backups | 400 TB per cluster |
| Backup retention | min 6 hours; max 90 days (Enterprise) or 365 days (Enterprise Plus) |
| Change stream retention | 7 days |
| Continuous materialized views | 50 per instance, 5 per table |
| Data Boost read requests | 1,000 per second per cluster |
| Recommended: column families per table | 100 |
| Recommended: column qualifier / cell value / values in a row | 16 KB / 10 MB / 100 MB |
| Hard: row key / cell value / values in a row / single mutation | 4 KB / 100 MB / 256 MB / 200 MB |
| In-memory tier (Preview) | base 40,000 QPS per node, up to 120,000; rows larger than 1 MiB not served |
| Logical views per instance | 1,000 |
| Mutations per batch | 100,000 (`CheckAndMutate`: 100,000 true and 100,000 false mutations) |
| Regions per instance | 8 (one cluster per zone) |
| Row filter size | 20 KB |
| Saved queries (Preview) | 10,000 per project; 1 MiB per query |
| Schema bundles (Preview) | 10 per table; 4 MB serialized size |
| Tables per instance | 1,000 (materialized views count as tables) |

### ID length limits (characters)

| Resource | Length |
|----------|--------|
| App profile, authorized view, backup, schema bundle, table | 1-50 |
| Cluster | 6-40 |
| Column family | 1-64 |
| Instance | 6-33 |
| View | 1-128 |

### Storage per node

| Configuration | Enterprise | Enterprise Plus |
|---------------|------------|-----------------|
| SSD without tiered storage | 5 TB per node | 5 TB per node |
| SSD with tiered storage | 32 TB per node (max 5 TB SSD) | 64 TB per node (max 5 TB SSD) |
| HDD | 16 TB per node | 16 TB per node |

## Notes

- Size limits use binary units (1 KB = 2^10 bytes, 1 MB = 2^20 bytes, 1 TB = 2^40 bytes).
- If any cluster in an instance exceeds the hard storage-per-node limit, writes to all clusters in that instance fail until nodes are added to each over-limit cluster; removing nodes that would exceed the limit is denied. Best practice: use only 70% of the limit (for example 50 TB on SSD needs at least 15 nodes, handling up to 75 TB); with little data growth you may use up to 100%.
- The "Backup operations" per-minute figure carries footnote 1 in the source (footnote text not included in the twin).
- Admin write quotas should not grow with usage; growth suggests unnecessary admin API calls in the application.
- The source contains no code samples; the fenced block quotes the quota-increase steps verbatim.
- Source: https://docs.cloud.google.com/bigtable/quotas (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [performance.md](./performance.md)
- [scaling.md](./scaling.md)
- [tiered-storage.md](./tiered-storage.md)
- [instances-clusters-nodes.md](./instances-clusters-nodes.md)
- [locations.md](./locations.md)
