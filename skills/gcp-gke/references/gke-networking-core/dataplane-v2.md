---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/dataplane-v2
---

# About GKE Dataplane V2

GKE Dataplane V2 is an eBPF/Cilium-based dataplane optimized for Kubernetes networking. It is enabled by default for all new Autopilot clusters. The `anetd` DaemonSet in `kube-system` programs eBPF; it replaces `kube-proxy`/`iptables` for Service routing and always enforces NetworkPolicy.

## Signature / Usage

### Apply the Maglev algorithm (GKE 1.36.0-gke.2882000 and later)

Add the annotation to a `NodePort` or `LoadBalancer` Service at creation:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: maglev-service
  annotations:
    gke.networking.io/lb-algorithm: "maglev"
spec:
  type: LoadBalancer
  selector:
    app: application
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
```

## Options / Props

### Technical specifications

| Specification | GKE | Google Distributed Cloud Edge | Google Distributed Cloud Hosted |
| --- | --- | --- | --- |
| Nodes per cluster | 15,000 | 500 | 500 |
| Pods per cluster | 400,000 | 15,000 | 27,500 |
| Pods behind one Service | 10,000 | 1,000 | 1,000 |
| ClusterIP Services | 10,000 | 1,000 | 1,000 |
| LoadBalancer Services per cluster | 750 | 500 | 1,000 |

- Service map: up to 260,000 entries (backends summed across all Services); exceeding it may break the cluster.
- Node limits: regional clusters up to 5,000, 15,000 or 65,000 (infrastructure requirements; may need Cloud Customer Care; 65,000 requires scale-optimized mode, which disables network policy enforcement); zonal clusters up to 1,000. Beyond 5,000 nodes requires Private Service Connect; `CiliumNetworkPolicy` CRD limits to 1,000 nodes, use `CiliumClusterwideNetworkPolicy` for up to 5,000.
- Google Distributed Cloud LoadBalancer Services: 500 with bundled (Seesaw), 250 with integrated F5.

### Maglev memory

Lookup table of 16,381 entries x 4 bytes = 65.5 KB per Service per node.

| Services with Maglev | Extra memory |
| --- | --- |
| 100 | 6.5 MB |
| 1,000 | 65 MB |
| 10,000 | 650 MB |

Maglev may raise `anetd` CPU up to three times during backend changes.

## Notes

- Limitations: enabled only at cluster creation (existing clusters cannot be upgraded to it); manually created internal passthrough Network Load Balancers for NodePort Services unsupported; fragmented ICMP packets are dropped; `anetd` can use up to two or three vCPUs under heavy TCP connection churn (use keep-alives and connection pooling); reported `anetd` memory includes eBPF map reservation (0.25% of node memory for the largest maps).
- Custom or third-party eBPF programs (for example Retina) are unsupported and can break Service connectivity; GKE emits a Recommendation when it detects one.
- The `gke.networking.io/lb-algorithm` annotation only takes effect at Service creation; to change it, delete and re-create the Service (destructive; try on a disposable Service first).
- Network policy logging is built in (configure the logging CRD). SCTP workloads are supported. For policy enforcement without Dataplane V2 see network-policy.md.
- Source inconsistency: the technical specifications table lists "Pods per cluster | 400,000", while quotas.md says Pods per cluster is "200,000 (includes system Pods)". The source does not reconcile the two figures.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/dataplane-v2 (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [network-policy.md](./network-policy.md)
- [alias-ips.md](./alias-ips.md)
- [kube-dns.md](./kube-dns.md)
