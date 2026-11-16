---
source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/how-to/upgrade-overview
---

# Upgrade overview (Google Distributed Cloud software only for VMware)

Planning a cluster upgrade: required order, compatible tools, and how advanced versus non-advanced clusters change the process.

## Signature / Usage

### Check if a cluster is advanced

Version 1.30 and earlier are non-advanced; 1.33 are advanced unless you explicitly opted out; 1.34 and later are advanced. For 1.31 and 1.32, check with `kubectl` using the admin cluster kubeconfig:

```bash
kubectl get onpremadminclusters -A \
    -o custom-columns=NAME:.metadata.name,VERSION:.spec.gkeOnPremVersion,ADVANCED:.spec.enableAdvancedCluster \
    --kubeconfig ADMIN_CLUSTER_KUBECONFIG
```

```bash
kubectl get onpremuserclusters -A \
    -o custom-columns=NAME:.metadata.name,VERSION:.spec.gkeOnPremVersion,ADVANCED:.spec.enableAdvancedCluster \
    --kubeconfig ADMIN_CLUSTER_KUBECONFIG
```

Replace `ADMIN_CLUSTER_KUBECONFIG` with the path to your admin cluster kubeconfig file. Output when enabled:

```text
NAME              VERSION           ADVANCED
gke-admin-abc12   1.32.0-gke.1085   true
```

If `ADVANCED` is `true` it is an advanced cluster. For version 1.32 or earlier, `ADVANCED` might display as `<none>`.

### Upgrade order

Advanced to advanced (1.32 and later: patch and sequential minor upgrades; 1.31 Preview: patch upgrades within 1.31 only): upgrade the admin workstation, verify the admin cluster with `gkectl diagnose cluster`, upgrade the admin cluster, verify again, upgrade user clusters one at a time (control plane and node pools together or separately), verify with `gkectl diagnose cluster`.

Non-advanced to advanced (1.31, 1.32, 1.33, 1.34 only): use `gkectl` with the same version as the target (for 1.32.0 use `gkectl` 1.32.0); order: admin workstation and artifacts, diagnose, admin cluster, diagnose, user cluster, diagnose.

Non-advanced to non-advanced (1.33 and earlier):

- Target 1.31, 1.32, 1.33: admin workstation and bundle artifacts, diagnose, admin cluster, diagnose, user clusters one at a time, diagnose.
- Target 1.30 and earlier: admin workstation and bundle artifacts, diagnose user clusters, all user clusters one at a time, diagnose the admin cluster, upgrade the admin cluster, diagnose.

## Options / Props

### Tool support

| Upgrade use case | `gkectl` | gcloud CLI | console | Terraform | Notes |
|------------------|----------|------------|---------|-----------|-------|
| Upgrade admin clusters (any path) | Yes | No | No | No | Admin clusters always require `gkectl` |
| Non-advanced to advanced (conversion) | Yes | No | No | No | `gkectl` version must match target version; zero version skew between control plane and node pools |
| Non-advanced to non-advanced (legacy) | Yes | No | No | No | Only 1.33 and earlier (opt-out path); API clients not supported |
| Advanced to advanced (user clusters) | Yes | Yes | Yes | Yes (1) | Standard version skew rules apply |
| Whole user cluster (control plane + node pools) | Yes | Yes | Yes | Yes (1) | All tools for advanced user clusters |
| User cluster control plane only | Yes | Yes | No | Yes (1) | Console cannot upgrade only the control plane |
| Selectively upgrade node pools after control plane | Yes | Yes | No | Yes (1) | Console does not support individual node pool upgrades |
| Control plane and one or more node pools at once | Yes | No | No | No | Only `gkectl` |

(1) Terraform can be used for user cluster upgrades only if the user cluster was created and managed with Terraform.

## Notes

- Admin clusters are always upgraded one at a time. Choose whole-cluster or control-plane-only user cluster upgrades by environment, maintenance window and version; with an HA control plane, a control plane upgrade should not disrupt workloads.
- A user cluster upgrade is complete when all node pools are at the same version as the user cluster control plane.
- To see information about `gkectl`-created clusters in the console or gcloud CLI, enroll the cluster in the GKE On-Prem API.
- Advanced clusters use Google Distributed Cloud for bare metal as the underlying framework; "bare metal" may appear in node labels and API resources.
- Version rules and best practices: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/how-to/upgrade-version-rules and https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/how-to/upgrade-best-practices
- Former names: Google Distributed Cloud Virtual, Anthos clusters on VMware.
- Source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/how-to/upgrade-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [vmware-advanced-clusters.md](./vmware-advanced-clusters.md)
- [vmware-install-overview.md](./vmware-install-overview.md)
- [vmware-scalability.md](./vmware-scalability.md)
