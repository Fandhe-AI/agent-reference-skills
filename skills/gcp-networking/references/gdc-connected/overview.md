---
source: https://docs.cloud.google.com/distributed-cloud/connected/latest/docs/overview
---

# Overview of connected deployments of Google Distributed Cloud

Distributed Cloud connected lets you run Google Kubernetes Engine (GKE) clusters on dedicated Google-certified hardware installed on your premises, connected to your local network and managed centrally through Google Cloud. It supports workloads in Kubernetes containers and in virtual machines.

## Signature / Usage

### List zones where Edge Container node pools can be created

```bash
gcloud edge-cloud container zones list
```

## Options / Props

### When to use Distributed Cloud connected

Designed for scenarios in which conventional Google Cloud deployments might not be sufficient:

- Applications that require a very stable network connection between client and server and cannot tolerate the traffic disruptions that commonly occur over the internet.
- Applications that require the lowest attainable network latency and are sensitive to latency spikes or jitter. High-performance networking is supported through the Network function operator.
- Applications that generate large amounts of data that would be performance-prohibitive or cost-prohibitive to transfer to and from Google Cloud.
- Local laws or regulations that dictate that data must remain on-premises or within a specific geographic jurisdiction.

### Limitations compared to a cloud-based GKE zone

| Limitation | Description |
|---|---|
| Processing capacity | A connected deployment has limited processing capacity; plan workloads accordingly. |
| Workload restrictions | Distributed Cloud connected places several restrictions on workloads (see the Deploy page, section "workload-limitations"). |

### Deployment model

- Deployed as three standalone Distributed Cloud connected server machines that connect directly to your local network through your own network hardware; the three-machine configuration provides redundancy if one machine is down.
- Google remotely monitors and maintains the software (including the Kubernetes control plane), software updates and security mitigations. You are responsible for procuring, maintaining, troubleshooting and repairing the Google-certified hardware, directly or through your Systems Integrator (SI).
- Access to Google Cloud services, your applications in Google Cloud and your VPC network uses a secure Cloud VPN connection.

## Notes

- Distance: this page covers Distributed Cloud connected (`gcloud edge-cloud ...`) from the networking side. GKE itself (clusters, node pools, Fleet, Gateway / Ingress) is in the `gcp-gke` skill.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/zones/list (gcloud 593.0.0 help); the source page has no code block.
- Source: https://docs.cloud.google.com/distributed-cloud/connected/latest/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [how-it-works.md](./how-it-works.md)
- [networking.md](./networking.md)
- [clusters.md](./clusters.md)
- [quotas.md](./quotas.md)
