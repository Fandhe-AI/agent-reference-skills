---
source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/concepts/scalability
---

# Scalability (Google Distributed Cloud software only for VMware)

Best practices for creating, configuring and operating VMware clusters that approach Kubernetes scalability limits: supported limits, CIDR sizing, control plane and observability sizing, load balancer limits, auto-scaled system components.

## Signature / Usage

### Dedicated node pool for Cloud Logging and Cloud Monitoring components

To keep a node pool just big enough for logging and monitoring components and prevent other Pods being scheduled there, add this taint to the node pool:

```yaml
taints:
  - effect: NoSchedule
    key: node-role.gke.io/observability
```

## Options / Props

### Limits

| Dimension | Without advanced cluster | With advanced cluster |
|-----------|--------------------------|-----------------------|
| User clusters per admin cluster | 100 (HA and non-HA; MetalLB or manual load balancer) | 100 (user clusters must be HA) |
| Nodes per user cluster (MetalLB) | 500 | 500 |
| Pods per user cluster | 15,000 | 15,000 |
| LoadBalancer Services per user cluster (MetalLB) | 500 | 500 |
| Pods per node | 110 (including add-on system Pods) | 110 |
| Total nodes (admin control plane + all user control plane + workers) | - | must not exceed 500 |
| Clusters per fleet with global memberships | 250 default; request a `gkehub.googleapis.com` quota increase for more | same |

Each user cluster name must be unique across all admin clusters in a single Google Cloud project.

### Pod CIDR (`network.podCIDR`) size to nodes

| Pod CIDR | Max nodes |
|----------|-----------|
| /18 | 64 |
| /17 | 128 |
| /16 | 256 |
| /15 | 512 |

Default 192.168.0.0/16 supports 256 nodes (a /24 per node). Each HA kubeception user cluster adds three admin nodes, a non-HA one adds one; 100 HA kubeception user clusters = 303 nodes, so use /15.

### Service CIDR (`network.serviceCIDR`) size

| Admin cluster | Max Services | User cluster | Max Services |
|---------------|--------------|--------------|--------------|
| /24 (default 10.96.232.0/24) | 256 | /21 | 2,048 |
| /23 | 512 | /20 | 4,096 |
| /22 | 1,024 | /19 | 8,192 |
| | | /18 | 16,384 |

Each kubeception user cluster uses 6 Services and the admin control plane 14, so 100 kubeception user clusters need a /22.

### Admin cluster node sizing

| Kubeception user clusters | CPU | Memory |
|---------------------------|-----|--------|
| 0 to 10 | 4 | 16GB |
| 11 to 20 | 4 | 32GB |
| 20 to 100 | 4 | 90GB |

| Advanced clusters: total nodes | CPU | Memory |
|--------------------------------|-----|--------|
| 0 to 20 | 4 | 16GB |
| 21 to 100 | 8 | 16GB |
| 101 to 500 | 16 | 32GB |

### User cluster control plane node sizing (`masterNode` in `user-cluster.yaml`)

| User cluster nodes | CPU | Memory |
|--------------------|-----|--------|
| 0 to 20 | 3 | 5GB |
| 21 to 75 | 3 | 6GB |
| 76 to 250 | 4 | 8GB |
| 251 to 500 | 4 | 16GB |

For 500-node user clusters using Dataplane V2: 120 GB memory and 32 CPU cores recommended.

### Logging and monitoring component usage (CPU / memory at 0 and 30 Pods per node)

| Nodes | Container | CPU 0 | CPU 30 | Memory 0 | Memory 30 |
|-------|-----------|-------|--------|----------|-----------|
| 3 to 50 | prometheus-server | 100m | 390m | 650M | 1.3G |
| 3 to 50 | stackdriver-prometheus-sidecar | 100m | 340m | 1.5G | 1.6G |
| 51 to 100 | prometheus-server | 160m | 500m | 1.8G | 5.5G |
| 51 to 100 | stackdriver-prometheus-sidecar | 200m | 500m | 1.9G | 5.7G |
| 101 to 250 | prometheus-server | 400m | 2500m | 6.5G | 16G |
| 101 to 250 | stackdriver-prometheus-sidecar | 400m | 1300m | 7.5G | 12G |
| 250 to 500 | prometheus-server | 1200m | 2600m | 22G | 25G |
| 250 to 500 | stackdriver-prometheus-sidecar | 400m | 2250m | 65G | 78G |

### Load balancer limits

| | Bundled (Seesaw) | Integrated (F5) |
|--|------------------|-----------------|
| Max Services | 500 | 250 |
| Max nodes | 500 | 250 |
| Max health checks | N + (L * N) <= 10K (N nodes, L traffic-local Services) | N/A |

F5 numbers depend on hardware model, virtual instance CPU / memory and licenses; consult F5.

### Auto-scaled system components

| Component | Scaling |
|-----------|---------|
| kube-state-metrics | 3 to 5 nodes: ~105m CPU / ~110Mi; 6 to 500 nodes: 100 + num_nodes (m) CPU, 100 + 2 * num_nodes (Mi) memory (+-5% margin) |
| core-dns | `max(N/16, C/256)` replicas |
| calico-typha | N = 1: 1; 1 < N < 200: 2; N >= 200: 3 or more |
| Istio ingress-gateway | HPA, min 2 max 5 replicas |
| konnectivity agent | 1 <= N <= 6: N; 6 < N < 10: 6; 10 <= N < 100: 8; N >= 100: 12 or more |

## Notes

- Node IPs: each node needs one DHCP or static IP; for example 307 IPs for one non-HA user cluster of 50 nodes plus one HA cluster of 250 nodes, plus admin 3 control plane VMs.
- Limits are verified in a different environment from yours; vSphere configuration and hardware may limit lower. Stretching several dimensions at once (110 Pods x 500 nodes) can cause problems.
- Disk and network: about 500 sequential IOPS typically needed for etcd with dozens of nodes and thousands of Pods; use SSD / all flash; monitor `etcd_disk_backend_commit_duration_seconds` and `etcd_disk_wal_fsync_duration_seconds` (latencies of a few hundred ms indicate a bottleneck).
- Scale in stages (for example 3 to 150 to 350 to 500 nodes): node creation clones the OS image, which is I/O intensive on vSphere and is not I/O isolated from workloads.
- Watch vCPU:pCPU ratio and memory overcommitment at host level.
- The auto-scaling formulas may change in a future release. Page contains unrendered `[Controlplane V2]()` / `[kubeception]()` links in the source.
- Former names: Google Distributed Cloud Virtual, Anthos clusters on VMware.
- Source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/concepts/scalability (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [vmware-advanced-clusters.md](./vmware-advanced-clusters.md)
- [vmware-install-overview.md](./vmware-install-overview.md)
- [bare-metal-limits.md](./bare-metal-limits.md)
