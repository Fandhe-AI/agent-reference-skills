---
source: https://docs.cloud.google.com/cluster-director/docs/networking
---

# Networking in Cluster Director

Conceptual overview of the network architecture and the mandatory VPC requirements for Cluster Director clusters. For tightly coupled distributed workloads even minor latency increases cause significant downtime, so the network design minimizes it.

## Signature / Usage

### Create a cluster with a new network

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/clusters/create (gcloud 593.0.0 help; `--create-network` makes Cluster Director create the VPC network, see "VPC choices" below):

```bash
gcloud cluster-director clusters create my-cluster \
    --location=us-central1 --reference-architecture=quickstart \
    --create-network=name=network0
```

## Options / Props

### Hierarchy

| Level | Description |
|---|---|
| Node or host | One physical server with its accelerators; Compute Engine provisions instances on top. |
| Sub-block | Hosts on a single rack connected by a top-of-rack (ToR) switch; single-hop between any two GPUs. |
| Block | Multiple sub-blocks on a non-blocking fabric; any GPU reachable in at most two hops. |
| Cluster | Multiple interconnected blocks; scales to thousands of GPUs. |

### Traffic separation

- GPU-to-GPU: dedicated high-speed interfaces; for accelerator-optimized series, NVIDIA NICs with RoCE (RDMA over Converged Ethernet).
- Host and storage data plane (Cloud Storage, host management, storage access): Titanium NICs on a separate path.

### VPC choices

| Option | Behavior |
|---|---|
| New network | Cluster Director creates the VPC network and configures the firewall rules. |
| Existing VPC or Shared VPC | You configure: Private Google Access on the subnetwork; a firewall rule allowing ingress TCP 22 from the IAP IP range (SSH to login nodes); a firewall rule allowing all ingress (TCP, UDP, ICMP) from the cluster's own subnetwork range (internal communication). |

### Multi-VPC

Some high-performance machine types such as A4 and A3 Ultra must separate traffic across multiple VPCs (specialized hardware separates GPU traffic from general-purpose traffic). Cluster Director manages the default VPC for general traffic and additional VPCs for GPU-to-GPU traffic.

## Notes

- The VM-side setting is here; VPC networks, firewall policies and Cloud Load Balancing themselves are in the planned `gcp-networking`. Do not open port 22 to `0.0.0.0/0`; use the IAP range as the source states.
- Additional existing-network constraints (health check on TCP 8319, reserved non-overlapping IPv4 ranges, Shared VPC IAM) are in [process-overview.md](./process-overview.md).
- The restricted services for a VPC Service Controls perimeter (`compute.googleapis.com`, `file.googleapis.com`, `hypercomputecluster.googleapis.com`, `logging.googleapis.com`, `lustre.googleapis.com`, `monitoring.googleapis.com`) are listed in [process-overview.md](./process-overview.md). VPC Service Controls creates a perimeter that by default blocks cross-boundary communication; see https://docs.cloud.google.com/vpc-service-controls/docs/overview.
- The source page shows no commands; the snippet is borrowed from https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/clusters/create (gcloud 593.0.0 help). It creates billable cluster resources; try it in a disposable project first.
- Cost: per the gcloud 593.0.0 help, `--reference-architecture=quickstart` provisions "Compute: 2x a3-megagpu-8g nodes (Flex Start, max duration 7 days)", "Login Node: 1x n2-standard-16 node" and "Storage: 36TB Lustre storage (scratch disk)". This is not the three `n2-standard-2` VM cluster of the Console quickstart in [quickstart.md](./quickstart.md); delete the cluster after testing.
- Source (Create a Slurm cluster, cited above as `quickstart.md`): https://docs.cloud.google.com/cluster-director/docs/create/quickstart (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/cluster-director/docs/networking (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [process-overview.md](./process-overview.md)
- [storage.md](./storage.md)
- [compute.md](./compute.md)
