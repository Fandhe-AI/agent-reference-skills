---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/network-policy
---

# Control communication between Pods and Services using network policies

GKE network policy enforcement lets you create Kubernetes NetworkPolicies as Pod-level firewall rules. By default all Pods communicate freely. Enforcement needs a network plugin: GKE Dataplane V2 (Cilium, recommended, default for Autopilot) or Calico (Standard only); the two are mutually exclusive. Without a plugin, policies are not enforced.

## Signature / Usage

### Enable enforcement (Standard, Calico; recreates nodes)

Enabling recreates nodes and can disrupt workloads. Skip this for Dataplane V2 clusters. Enable the add-on, then enforcement on nodes; both are required.

```bash
gcloud container clusters update CLUSTER_NAME --update-addons=NetworkPolicy=ENABLED
```

```bash
gcloud container clusters update CLUSTER_NAME --enable-network-policy
```

Replace `CLUSTER_NAME` with the name of the cluster.

### Disable enforcement (Standard; not possible on Autopilot or Dataplane V2)

```bash
gcloud container clusters update CLUSTER_NAME --no-enable-network-policy
```

Verify nodes were re-created (`No resources found` means done):

```bash
kubectl get nodes -l projectcalico.org/ds-ready=true
```

After all nodes are re-created, disable the add-on:

```bash
gcloud container clusters update CLUSTER_NAME --update-addons=NetworkPolicy=DISABLED
```

### Keep container-native load balancing with policies

Enabling network policy prevents NEGs from being enabled by default; annotate Services manually:

```yaml
kind: Service
...
  annotations:
    cloud.google.com/neg: '{"ingress": true}'
...
```

### Calico: broad ipBlock without Pod traffic

Adapted (not in the official docs): the source indents `cidr` / `except` at the same level as `ipBlock`, which is invalid; they are nested under `ipBlock`, and the required `spec.podSelector` is added (an empty selector selects all Pods in the namespace).

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-non-pod-traffic
spec:
  podSelector: {}
  ingress:
  - from:
    - ipBlock:
        cidr: '0.0.0.0/0'
        except: ['POD_IP_RANGE']
```

`POD_IP_RANGE` is your cluster Pod IPv4 range, for example `10.95.0.0/17`; multiple ranges go in the array, for example `['10.95.0.0/17', '10.108.128.0/17']`.

### Troubleshoot: policy not taking effect

```bash
kubectl -n kube-system get pods -l k8s-app=cilium
```

(Dataplane V2; empty output means enforcement is off.) Without Dataplane V2 use `kubectl get nodes -l projectcalico.org/ds-ready=true`. Then compare labels:

```bash
kubectl describe pod POD_NAME
kubectl describe networkpolicy
kubectl get networkpolicy
```

### Find the control plane internal IP (Private Service Connect)

```bash
gcloud container clusters describe CLUSTER_NAME
```

Read `privateEndpoint` and allow egress to it.

### Calico vertical autoscaler (503 readiness failures in large clusters)

Set `base` and `max` equal to stop fluctuating CPU requests. GKE does not reconcile ConfigMap changes in `kube-system`.

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: calico-node-vertical-autoscaler
  namespace: kube-system
  labels:
    kubernetes.io/cluster-service: "true"
    addonmanager.kubernetes.io/mode: EnsureExists
data:
  node-autoscaler: |-
    {
      "calico-node": {
        "requests": {
          "cpu": {
            "base": "200m",
            "step": "100m",
            "nodesPerStep": 50,
            "max": "200m"
          }
        }
      }
    }
```

## Options / Props

### Requirements and limitations

| Item | Detail |
| --- | --- |
| All clusters | Allow egress to the metadata server |
| Standard | About +128 MB memory in `kube-system` and about 300 millicores CPU; nodes must be re-created (respects maintenance windows) |
| Minimum size (Standard) | Three `e2-medium` instances or one machine type with more than 1 allocatable vCPU; unsupported on `f1-micro` / `g1-small` |
| `hostNetwork: true` Pods | Empty `podSelector` excludes them. Dataplane V2: cannot match them via `podSelector`, `namespaceSelector` or `ipBlock`. Legacy dataplane: only `ipBlock` works |
| Calico to Dataplane V2 | No Pod/Service IPs in `ipBlock.cidr`; `ports.port` cannot be empty when a protocol is set |

### Egress to the GKE metadata server (Workload Identity Federation for GKE)

| Cluster | Allow egress to |
| --- | --- |
| GKE 1.21.0-gke.1000 and later | `169.254.169.252/32`, ports `988` and `987` |
| Earlier than 1.21.0-gke.1000 | `127.0.0.1/32`, ports `988` and `987` |
| Dataplane V2 | `169.254.169.254/32`, ports `80` and `8080` |

### `externalTrafficPolicy` (LoadBalancer / NodePort only)

| Value | Source IP seen by Pod |
| --- | --- |
| `Cluster` | Node IP; policies denying by client IP may block clients unless node IPs are allowed |
| `Local` | Original client IP; allows client-based rules |

## Notes

- Enabling enforcement and disabling enforcement both recreate nodes and are disruptive; try on a disposable cluster first. `--no-enable-network-policy` also removes managed `ip-masquerade-agent` Pods, which may change Pod-to-external traffic. Nodes upgrade manually with `gcloud container clusters upgrade` and `--cluster-version` set to the running version.
- GKE deploys Pods with elevated RBAC permissions (for example patching all Deployments, updating node status) to enforce policies.
- The `cidr: '0.0.0.0/0'` ipBlock example allows ingress from every non-Pod source address except `POD_IP_RANGE`; use a narrower CIDR where possible, and try it on a disposable cluster first.
- ipBlock: use `namespaceSelector` / `podSelector` to select Pods. On Dataplane V2, ipBlock never covers Pod traffic (even `0.0.0.0/0`); on Calico it does.
- Allow Application Load Balancer health check ranges for Ingress. On Dataplane V2 `ipBlock.cidr` may still be used for non-Pod CIDRs. If network policy is enabled on an existing cluster, GKE may keep auto-applying the NEG annotation to new Services.
- Manually deployed `ip-masquerade-agent` or Calico node Pods are unscheduled when enforcement is enabled on the control plane; label nodes `node.kubernetes.io/masq-agent-ds-ready=true` and `projectcalico.org/ds-ready=true` to shorten disruption.
- Known issue: Calico Pods stuck in `containerCreating` with `ipAddrs is not compatible with configured IPAM: host-local`; use host-local ipam for Calico instead of calico-ipam.
- Control plane egress from Pods under Private Service Connect must be allowed; with `master-ipv4-cidr` GKE assigns the internal IP from it, otherwise from the node subnet.
- Console and REST API (`networkPolicy` object, `setNetworkPolicy`, `desiredAddonsConfig.NetworkPolicyConfig.disabled`) forms exist in the source and are omitted. FQDN policies: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/fqdn-network-policies.
- The "Calico: broad ipBlock without Pod traffic" example is not Calico-specific in effect: the same `0.0.0.0/0` manifest on Dataplane V2 also admits every non-Pod source address (Pod traffic is not covered on Dataplane V2 in either case, see the ipBlock note above), so apply it only to Pods that are meant to accept such ingress.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/network-policy (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the Calico `ipBlock` example was shown with `cidr: '0.0.0.0/0'` and `except` at the same indentation as `ipBlock:`, with no `podSelector`; corrected as above.

## Related

- [dataplane-v2.md](./dataplane-v2.md)
- [network-isolation.md](./network-isolation.md)
- [kube-dns.md](./kube-dns.md)
