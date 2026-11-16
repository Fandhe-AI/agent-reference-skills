---
source: https://docs.cloud.google.com/oracle/database/docs/quotas
---

# Oracle Database@Google Cloud quotas and limits

Quotas are applied at the project level; limits apply to the instance or the project depending on the limit. Quotas and limits enforced by OCI are described in Oracle's OCI quotas and service limits documentation.

## Signature / Usage

The page has no code. To list the quota information of the Oracle Database@Google Cloud service (`--service` names the service whose quotas to list; the metric names on this page use `oracledatabase.googleapis.com`), based on the first example in the gcloud `quotas info list` help:

Adapted (not in the official docs): the help example's placeholder service `example.googleapis.com` (not a real service) is replaced by `oracledatabase.googleapis.com`, and the project number `12321` by `PROJECT_ID`.

```bash
gcloud quotas info list --service=oracledatabase.googleapis.com \
    --project=PROJECT_ID
```

## Options / Props

### Required permissions

| Permission | Purpose |
|------------|---------|
| `serviceusage.quotas.get` | View quotas |
| `serviceusage.quotas.update` | Change quotas |

Both are included in the basic Owner and Editor roles and in the predefined Quota Administrator role.

### Rate quotas

Enforced and refilled over 60-second intervals. Exceeding a limit returns HTTP `429` with reason `rateLimitExceeded`. Requests from the gcloud CLI, the console and service accounts all count.

| Quota | Metric name | Default (queries per minute) |
|-------|-------------|------------------------------|
| Read requests per minute (`ReadRequestsPerMinutePerProjectPerRegion`), `get` and `list` methods | `oracledatabase.googleapis.com/read_requests` | 300 |
| Mutation requests (`MutateRequestsPerMinutePerProjectPerRegion`), mutation methods | `oracledatabase.googleapis.com/mutate_requests` | 120 |

### Resource quotas: minimum requirements

| Service | Value | Minimum requirement |
|---------|-------|---------------------|
| ODB Subnet | Internal CIDR range | 1 per ODB Subnet per region |
| Exadata Database Service (VM Cluster) | Interconnect attachments | 4 per ODB Network per region |
| Exadata Database Service (VM Cluster) | Cloud Router | 1 per ODB Network per region |
| Autonomous AI Database Service | Interconnect attachments | 4 per ODB Network per region |
| Autonomous AI Database Service | Cloud Router | 1 per ODB Network per region |
| Autonomous AI Database Service | DNS zone | 2 per Autonomous AI Database |
| Exadata Database Service on Exascale Infrastructure (VM Cluster) | Interconnect attachments | 4 per ODB Network per region |
| Exadata Database Service on Exascale Infrastructure (VM Cluster) | Cloud Router | 1 per ODB Network per region |
| Base Database Service (DB system) | Interconnect attachments | 4 per ODB Network per region |
| Base Database Service (DB system) | Cloud Router | 1 per ODB Network per region |
| Goldengate (deployment) | Interconnect attachments | 4 per ODB Network per region |
| Goldengate (deployment) | Cloud Router | 1 per ODB Network per region |

### Default quotas for provisioning resources

| Value | Default limit |
|-------|---------------|
| `interconnect_attachments_per_region` (Interconnect attachments per project, per VPC, per region) | 16 |
| `routers-per-project` (Cloud Routers per project, per VPC, per region) | 10 |
| `PerProjectInternalRanges` (internal CIDR range per project, per VPC, per region) | 1500 |
| `managed-zones-per-project` (DNS zones per project) | 10000 |
| `managed-zones-per-network` (DNS zones per VPC) | 10000 |
| `target-nameservers-per-managed-zones` (servers per project, per VPC, per region) | 50 |

## Notes

- Check quotas in the Google Cloud console Quotas page by filtering on the product name "Oracle AI Database"; the shown quotas only apply to API calls.
- To increase quotas, select them, click Edit quotas, enter the New limit, then Done and Submit Request. Requesting an increase has no charge; request a few days ahead of a notable usage increase.
- Resource quotas do not reset over time; release unused resources (for example by deleting an unneeded cluster). Deleting resources is destructive; try it on a disposable resource first.
- Adapted from the official docs: the example in https://docs.cloud.google.com/sdk/gcloud/reference/quotas/info/list (gcloud 593.0.0 help) reads `gcloud quotas info list --service=example.googleapis.com --project=12321`; the service name and project were substituted as described above.
- Source: https://docs.cloud.google.com/oracle/database/docs/quotas (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-odb-network.md](./create-odb-network.md)
- [iam-overview.md](./iam-overview.md)
- [overview.md](./overview.md)
