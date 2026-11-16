---
source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/bare-metal/docs/limits
---

# Quotas and limits (Google Distributed Cloud software only for bare metal)

Limits across Google Cloud projects, clusters and nodes for bare metal deployments.

## Signature / Usage

### Check Dataplane V2 BPF lbmap entries

```bash
kubectl get po -n kube-system -l k8s-app=cilium | cut -d " " -f1 | grep anetd | head -n1 | \
    xargs -I % kubectl -n kube-system exec % -- cilium bpf lb list | wc -l
```

Monitor the `anetd` DaemonSet metrics for failures:

```text
cilium_bpf_map_ops_total{map_name="lb4_services_v2",operation="update",outcome="fail" } > 0
```

```text
cilium_bpf_map_ops_total{map_name="lb4_backends_v2",operation="update",outcome="fail" } > 0
```

### Count allocated node ports

```bash
kubectl get svc -A | grep : | tr -s ' ' | cut -d ' '  -f6 | tr ',' '\n' | wc -l
```

## Options / Props

| Limit | Value |
|-------|-------|
| User clusters per admin cluster | Reliably 100 user clusters of 10 nodes each (1,000 nodes) |
| Pods per user cluster | Recommended 15,000 or fewer (takes precedence over per-node and per-cluster node recommendations) |
| Nodes per user, standalone or hybrid cluster | Minimum 1, recommended maximum 200, absolute maximum 500 (tested) |
| `nodeConfig.PodDensity.MaxPodsPerNode`, all HA and non-HA user clusters | min 32, recommended max 110, max allowed 250 |
| `MaxPodsPerNode`, all other non-HA clusters | min 64, recommended max 110, max allowed 250 |
| Endpoints on RHEL | 100,000 cluster-level (sum of Pods referenced by Services; nftables limit) |
| `LoadBalancer` and `NodePort` Service ports | 2,768 (default range 30000-32767) |
| Bundled load balancer (MetalLB) connections per node | 28,000 (default ephemeral range 32768-60999) |
| Dataplane V2 BPF lbmap entries | 65,536 |
| Clusters with global memberships per fleet | 250 (request `gkehub.googleapis.com` quota increase) |

### Pods per node vs nodes (15,000 Pods guidance)

| Pods per node | Nodes per cluster | Pods per cluster | Recommended |
|---------------|-------------------|------------------|-------------|
| 110 | 200 | 22,000 | No |
| 110 | 136 | 14,960 | Yes |
| 100 | 150 | 15,000 | Yes |
| 75 | 200 | 15,000 | Yes |

### Dataplane V2 `NetworkPolicy` limits (Cilium)

| Dimension | Supported limit |
|-----------|-----------------|
| Change rate for namespace labels | At most one change per hour per namespace (and Cilium identities not near 16,000 label sets with allow-all policies, or 65,535 per cluster) |
| Service endpoints per cluster | 100,000 tested and recommended; hardcoded limit 262,000 |
| Network policies and rules | At most 40,000 policies and 80,000 rules |
| Change rate for network policies | At most 20 changes (creations or deletions) per second |
| Unique Pod label sets | 65,535 (Cilium security identity limit) |
| Unique Pod label sets selected by policy selectors | 16,000 (fixed eBPF map size) |

## Notes

- Single-node clusters must remove the `node-role.kubernetes.io/master:NoSchedule` taint to run workloads on the node.
- RHEL endpoint limit has no mitigation; for Ubuntu and Debian, switching from default `nftables` to legacy `iptables` is recommended on large-scale clusters.
- To save node ports, set `allocateLoadBalancerNodePorts` to `false` in the `LoadBalancer` Service spec. If the port limit is exceeded you cannot create new `LoadBalancer` / `NodePort` Services or add node ports to existing ones.
- Consider an alternate load balancing method if you need MetalLB to expose a Service handling many connections (for example Ingress).
- Each user cluster must have a unique name across all admin clusters in a single Google Cloud project.
- Scaling guidance: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/bare-metal/docs/how-to/scale
- Former names: Google Distributed Cloud Virtual, Anthos clusters on bare metal.
- Source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/bare-metal/docs/limits (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [bare-metal-about-bare-metal.md](./bare-metal-about-bare-metal.md)
- [bare-metal-install-prep.md](./bare-metal-install-prep.md)
- [vmware-scalability.md](./vmware-scalability.md)
