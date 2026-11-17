---
source: https://docs.cloud.google.com/distributed-cloud/connected/latest/docs/quotas
---

# Quotas and limits (Distributed Cloud connected)

Distributed Cloud connected uses quotas and system limits. Quotas have default values and can typically be adjusted on request; system limits are fixed. Quotas generally apply per Google Cloud project, and when you exceed one the task you attempt usually fails.

## Signature / Usage

### List clusters in a region

```bash
gcloud edge-cloud container clusters list --location=us-central1
```

## Options / Props

### Rate quotas

| Quota | Default limit | Description |
|---|---|---|
| API requests | 1200 per minute | All requests to the Distributed Cloud Edge Container API across all Google Cloud regions |
| API requests | 600 per minute | All requests to the Distributed Cloud Edge Container API for a specific Google Cloud region |

### Resource quotas

| Quota | Default limit | Description |
|---|---|---|
| Clusters | 20 per Google Cloud project per Google Cloud region | Number of Distributed Cloud connected clusters per Google Cloud project in a Google Cloud region |
| Networks | 100 per Distributed Cloud connected zone | Number of Distributed Cloud networks per Distributed Cloud connected zone |
| Subnetworks | 138 per Distributed Cloud connected zone | Number of Distributed Cloud subnetworks configured per Distributed Cloud connected zone |
| Routes | 50,000 per Distributed Cloud network | Number of routes that can be advertised to a Distributed Cloud network |

### Virtual machine scaling limits

- Scaling limits for VMs using VM Runtime on GDC are dictated by the hardware configuration (available capacity on G1 or G2 hardware).
- The maximum number of concurrent VMs depends on the CPU, memory and storage resources of your configuration.
- To scale up VM deployments, ensure the cluster has enough CPU, memory and storage for both VMs and the control plane components.

## Notes

- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/clusters/list (gcloud 593.0.0 help); the source page has no code block.
- Rate quotas apply to the Edge Container API; the networks and subnetworks quotas match the limits stated on the networks and subnetworks pages.
- Source: https://docs.cloud.google.com/distributed-cloud/connected/latest/docs/quotas (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [clusters.md](./clusters.md)
- [networks.md](./networks.md)
- [subnetworks.md](./subnetworks.md)
