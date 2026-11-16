---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/kube-dns
---

# kube-dns

`kube-dns` is the default in-cluster DNS provider for GKE Standard clusters (Autopilot uses Cloud DNS instead). This page covers architecture, Pod DNS configuration, stub domains, upstream name servers, custom deployments, scaling and metrics.

## Signature / Usage

### Configure stub domains and upstream name servers

```bash
kubectl edit configmap kube-dns -n kube-system
```

Adapted (not in the official docs): the source puts `#` comments inside the JSON string values, which is not valid JSON; the comments are removed (the `internal` stub domain with the metadata server `169.254.169.254` is needed if upstream servers cannot resolve GKE internal domains).

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  labels:
    addonmanager.kubernetes.io/mode: EnsureExists
  name: kube-dns
  namespace: kube-system
data:
  stubDomains: |
    {
      "example.com": [
        "8.8.8.8",
        "8.8.4.4"
      ],
      "internal": [
        "169.254.169.254"
      ]
    }
  upstreamNameservers: |
    [
      "8.8.8.8",
      "8.8.4.4"
    ]
```

`kube-dns` reloads the ConfigMap automatically.

### Default Pod `/etc/resolv.conf`

```text
nameserver 10.0.0.10
search default.svc.cluster.local svc.cluster.local cluster.local c.my-project-id.internal google.internal
options ndots:5
```

### Scale kube-dns

```bash
kubectl edit configmap kube-dns-autoscaler --namespace=kube-system
```

Default value: `linear: '{"coresPerReplica":256, "nodesPerReplica":16,"preventSinglePointFailure":true}'`. Formula:

```text
replicas = max( ceil( cores * 1/coresPerReplica ) , ceil( nodes * 1/nodesPerReplica ) )
```

```yaml
linear: '{"coresPerReplica":256, "nodesPerReplica":8,"max": 15,"preventSinglePointFailure":true}'
```

One Pod per eight nodes, capped at 15. With a minimum:

```yaml
linear: '{"coresPerReplica":256, "nodesPerReplica":8,"max": 15,"min": 5,"preventSinglePointFailure":true}'
```

### View metrics

GKE 1.36 and later (port 9153):

```bash
kubectl get pods -n kube-system --selector=k8s-app=kube-dns
kubectl port-forward pod/POD_NAME -n kube-system 9153:9153
curl http://127.0.0.1:9153/metrics
```

GKE 1.35 and earlier (run port-forwards in separate terminals; ports 10055 for `kube-dns`, 10054 for `dnsmasq`):

```bash
kubectl port-forward pod/POD_NAME -n kube-system 10055:10055
kubectl port-forward pod/POD_NAME -n kube-system 10054:10054
curl http://127.0.0.1:10055/metrics
curl http://127.0.0.1:10054/metrics
```

Replace `POD_NAME` with a `kube-dns` Pod name. In 1.36+ you can also use the **GKE DNS Observability - Cluster View** dashboard.

## Options / Props

| Feature | Legacy (kube-dns 1.35 and earlier) | kube-dns on CoreDNS (1.36 and later) |
| --- | --- | --- |
| Endpoint awareness | Up to 1,000 endpoints per Service | All endpoints (EndpointSlices) |
| Upstream name servers | 3 | Up to 15 |
| Concurrent outbound TCP connections | 200 | Up to 1,500 |

## Notes

- Pods with `hostNetwork: true` inherit host DNS unless `dnsPolicy` is `ClusterFirstWithHostNet`. Kubernetes limits `dnsConfig` search domains to 32.
- Legacy kube-dns ignores `upstreamNameservers` with more than three entries (logged to Cloud Logging).
- `kube-dns` cannot discover headless Service endpoints across VPC networks; use Cloud DNS for GKE. It only creates records for Services that have Endpoints.
- Set an explicit `max` in the autoscaler (at most 500 for clusters over 500 nodes) so many `kube-dns` Pods do not overload the control plane.
- To improve lookups: avoid Spot/preemptible VMs for `kube-dns`, enable NodeLocal DNSCache (with default-deny policies, permit queries to `node-local-dns`), scale up, use `dns.resolve*` rather than `dns.lookup`, use FQDNs with a trailing dot.
- GKE 1.21.14-gke.9100 / 1.22.15-gke.2100 and later cap DNS response TTL at 30 seconds.
- A custom `kube-dns` Deployment is not managed by the built-in autoscaler; you must run and update your own. See https://docs.cloud.google.com/kubernetes-engine/docs/how-to/custom-kube-dns.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/kube-dns (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: inline `# ...` comments within the `stubDomains` / `upstreamNameservers` JSON were removed.

## Related

- [network-policy.md](./network-policy.md)
- [alias-ips.md](./alias-ips.md)
