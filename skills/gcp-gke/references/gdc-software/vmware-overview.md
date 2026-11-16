---
source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/overview
---

# Google Distributed Cloud software only for VMware overview

Google Distributed Cloud software only for VMware lets you deploy and manage GKE clusters in a VMware vSphere environment, so you can run and upgrade containerized applications in your data center while using Google Cloud features. Clusters are managed in a fleet; cluster nodes run as VMs in your vCenter.

## Signature / Usage

### Key components

- **Admin cluster**: manages one or more user clusters; one or more control plane nodes on dedicated VMs.
- **User cluster**: runs your containerized workloads; at least one control plane node and one or more worker nodes.
- **Admin workstation**: dedicated VM with cluster configuration files and tools: `gkectl` (creates, updates and manages cluster deployments) and `kubectl`.
- **Google Cloud console**: view cluster health and run lifecycle operations without logging in to the admin workstation (uses the GKE On-Prem API; also the Google Cloud CLI or Terraform).
- **Virtual IP addresses (VIPs)**: control plane VIPs for `kubectl` access to admin and user cluster control planes; Service and Ingress VIPs for application users.

### Operational features

- High availability: HA admin clusters and user cluster control planes use three control plane nodes.
- Node auto repair: periodic health checks, enabled by default.
- Cluster autoscaler: adds or removes nodes in a node pool based on workload resource requests.
- Load balancing: bundled MetalLB (runs on cluster nodes) or third-party F5 BIG-IP / Citrix.
- Storage: vSphere datastores backed by vSAN, VMFS or NFS (different datastores per node pool); vSphere CSI driver provisions persistent volumes.

### Archived documentation (version 1.16 and earlier)

```text
https://cloud.google.com/anthos/clusters/docs/on-prem/VERSION/
```

Replace `VERSION` with a minor version from 1.0 to 1.16 and copy the URL to the address bar in your browser.

## Options / Props

### Data sent to Google Cloud

| Data | What is sent | Default |
|------|--------------|---------|
| Connection and fleet registration (`gkehub.googleapis.com`, `gkeconnect.googleapis.com`) | Cluster identity (project, membership name, cluster UID, public keys, Kubernetes version, cluster size, identity provider configuration), Kubernetes data requested from the console or connect gateway, your encrypted Kubernetes token until you sign out | Required |
| Cluster settings and status (`gkeonprem.googleapis.com`) | Name, UID, description, annotations, version, lifecycle state, control plane VIP, node pool names, node IP / DHCP settings, Pod and Service CIDRs, load balancer VIPs and settings, vCenter address / datacenter / cluster / resource pool / datastore / folder / storage policy name (not vCenter credentials), cluster administrator emails. Stored in the region set in `gkeOnPremAPI.location` | On in version 1.16 and later if the GKE On-Prem API is enabled in the project; turn off with `gkeOnPremAPI.enabled: false` |
| Billing usage (`anthos.googleapis.com`) | vCPU capacity, node count, license entitlement status | Required; records buffered during an outage |
| System health data (`logging.googleapis.com`, `monitoring.googleapis.com`, `opsconfigmonitoring.googleapis.com`) | Metrics, container logs and health checks of admin cluster components and the `kube-system`, `gke-system`, `gke-connect`, `istio-system`, `config-management-system` user cluster namespaces, names and labels of nodes, Pods, Deployments, Services. Stored in `stackdriver.projectID`; metrics in `stackdriver.clusterLocation` | On for system logs and metrics (required for full Customer Care support and SLA); off for application logs and metrics unless `enableCloudLoggingForApplications` or `enableGMPForApplications` is `true` in the `Stackdriver` resource |
| Audit logs (`anthosaudit.googleapis.com`) | Admin Activity audit logs (who changed what through `kube-apiserver`, when); read requests are not recorded. Stored in Cloud Audit Logs `_Required` bucket in `cloudAuditLogging.projectID`, kept 400 days | Optional; fill in the `cloudAuditLogging` section. For admin clusters, only at creation. To turn off for a user cluster, delete the section and update the cluster |

### Data that stays in your data center

- Containers, Pods, PersistentVolumes and the data your applications process; all Kubernetes objects (control plane and `etcd`).
- Admin cluster control plane keys: self-signed `etcd` private keys, user cluster keys, cluster CAs.
- Application secrets, OAuth tokens, SSH private keys, registry credentials, vCenter and F5 BIG-IP credentials, service account key files (not sent to the GKE On-Prem API; removed from diagnostic snapshots).
- Cluster and credentials configuration files on the admin workstation; audit logs on disk of control plane nodes; diagnostic snapshots go to Cloud Storage only if you choose to upload them.

## Notes

- Former names: Google Distributed Cloud software only (VMware) was formerly Google Distributed Cloud Virtual, previously Anthos clusters on VMware.
- Billing is per vCPU; to enable billing, enable the Anthos API (`anthos.googleapis.com`) in your project. Fleet membership determines billing. Each cluster connects through the Connect Agent, deployed automatically during installation.
- Starting with the 1.29 release no directory is created for the previous minor release; the supported version for a feature is documented per feature.
- Version Support Policy: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/getting-support#version-support ; versioning: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/version-history
- Official docs for the bare metal flavour are in `bare-metal-about-bare-metal.md`. GDC hosted / edge (`distributed-cloud/` hardware offerings) is out of scope.
- The source page contains no commands; the fenced block is the archived-documentation URL pattern quoted verbatim from the source.
- Source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [vmware-advanced-clusters.md](./vmware-advanced-clusters.md)
- [vmware-install-overview.md](./vmware-install-overview.md)
- [vmware-upgrade-overview.md](./vmware-upgrade-overview.md)
- [vmware-scalability.md](./vmware-scalability.md)
- [vmware-connect-on-prem-gcp.md](./vmware-connect-on-prem-gcp.md)
- [bare-metal-about-bare-metal.md](./bare-metal-about-bare-metal.md)
