---
source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/concepts/advanced-clusters
---

# Advanced clusters (Google Distributed Cloud software only for VMware)

Advanced clusters give Google Distributed Cloud for VMware a cluster architecture aligned with the other Google Distributed Cloud products (shared controllers and agents, faster cluster operations, access to new features such as topology domains). Preview in 1.31, GA in 1.32 and later, standard for all new clusters from 1.33.

## Signature / Usage

### Check whether clusters are advanced (versions 1.31 and 1.32)

Snippet taken from https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/how-to/upgrade-overview (twin `vmware-upgrade-overview`): with the admin cluster kubeconfig, check the `enableAdvancedCluster` spec field.

```bash
kubectl get onpremadminclusters -A \
    -o custom-columns=NAME:.metadata.name,VERSION:.spec.gkeOnPremVersion,ADVANCED:.spec.enableAdvancedCluster \
    --kubeconfig ADMIN_CLUSTER_KUBECONFIG
```

Replace `ADMIN_CLUSTER_KUBECONFIG` with the path to your admin cluster kubeconfig file. Use `onpremuserclusters` for user clusters.

## Options / Props

### Version behaviour

| Version | Behaviour |
|---------|-----------|
| 1.31 | Preview. Enable only at creation time of new 1.31 clusters. After enabling, you cannot upgrade the cluster to 1.32; use only in a test environment. |
| 1.32 | GA. Clusters are created as advanced clusters by default; set `enableAdvancedCluster` to `false` to create a non-advanced cluster. Upgrades of advanced clusters are supported. |
| 1.33 and later | Advanced clusters are the standard for new clusters; setting `enableAdvancedCluster` to `false` makes creation fail. Upgrading an existing non-advanced cluster to 1.33 converts it to advanced by default, with an option to keep it non-advanced. |
| 1.33 to 1.34 | Keeping a cluster non-advanced is supported only for 1.32 to 1.33 upgrades; a non-advanced cluster upgraded from 1.33 to 1.34 is always converted to advanced. |

### Selected feature differences (columns: 1.31 Preview / 1.32 not enabled / 1.32 GA / 1.33 GA)

| Feature | 1.31 adv. | 1.32 not enabled | 1.32 adv. | 1.33 adv. | Difference |
|---------|-----------|------------------|-----------|-----------|------------|
| Topology domains | Preview | No | Preview | Preview | Changes apply |
| Version skew n+2 admin cluster / node pool - user cluster | No | Yes | Yes | Yes | Not recommended on advanced clusters |
| Max surge for node pool updates | Preview | Preview | Preview | Preview | No differences |
| Node auto repair | Yes | Yes | Yes | Yes | Periodic health checks are not run as part of auto repair |
| VM host affinity | No | Yes | Yes | Yes | Supported on advanced clusters in 1.32.200 and 1.33 and later; with topology domains configure `topologyDomains[i].compute.hostGroups` in the vSphere infrastructure configuration file |
| Generate configuration files from an existing cluster | Yes | Yes | Yes | Yes | Clusters that use topology domains are not supported |
| Admin cluster backup and restore with `gkectl` | No | Preview | Preview | Yes | Changes apply; also backs up and restores user clusters |
| Cluster automatic node resizing | No | Yes | No | Yes | No differences |
| User cluster lifecycle in the Google Cloud console | No | Yes | Partial support | Yes | See advanced cluster limitations |
| `gkectl update credentials` for component access service account key | Partial | Yes | Partial | Partial | See advanced cluster differences for rotating service account keys |
| Windows node pool support / `containerd` for Windows / Windows Dataplane V2 | No | Yes | No | No | Not supported |
| Non-HA user cluster control plane | No | Yes | No | No | Not supported |
| vSphere tags and VM tracking, vSphere host group | No | Yes | No | Yes | No differences |
| Dry run upgrade of admin cluster | No | No | Yes | Yes | No differences |
| Vol. snapshot with vSphere CSI driver | Preview | Preview | Preview | Preview | No differences |
| Load balancer | Partial | Yes | Yes | Yes | Changes apply |
| Preflight checks | Partial | Yes | Yes | Yes | No differences |
| Private registry | Yes | Yes | Yes | Yes | Changes apply (limitations with the full bundle) |
| Diagnose | No | Yes | Yes | Yes | vCenter-related checks are unavailable; in 1.32 `gkectl diagnose cluster` runs health checks for the cluster |
| `gkectl check-config` | No | Yes | Yes | Yes | On advanced user clusters from 1.32.700+, 1.33.300+ and 1.34.0 and higher |
| Hardware requirements | Yes | Yes | Yes | Yes | Changes apply (CPU, RAM and storage requirements) |

## Notes

- Upgrading non-advanced clusters to 1.33 or later requires the `gkectl` tool; GKE On-Prem API clients, Terraform, the console and the gcloud CLI are not supported for that path.
- `cert-manager` is installed automatically on advanced clusters. When migrating from a non-advanced cluster, the integrated `cert-manager` overrides any customer-installed version; make sure there are no critical custom configurations on your existing `cert-manager` first.
- Advanced clusters use Google Distributed Cloud for bare metal as the underlying framework, so you may see "bare metal" in node labels, API resources and system tags.
- In future minor releases, features such as topology domains are available for advanced clusters only.
- The source table lists about 70 features; only rows with a status difference or an explicit change are reproduced above. Features marked "No differences" in all columns are omitted.
- Preview features (1.31 advanced clusters, topology domains, max surge, volume snapshots) have no production support guarantee; try them in a test environment.
- Former names: Google Distributed Cloud Virtual, Anthos clusters on VMware.
- Source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/concepts/advanced-clusters (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/how-to/upgrade-overview (snippet only; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [vmware-upgrade-overview.md](./vmware-upgrade-overview.md)
- [vmware-overview.md](./vmware-overview.md)
- [vmware-scalability.md](./vmware-scalability.md)
