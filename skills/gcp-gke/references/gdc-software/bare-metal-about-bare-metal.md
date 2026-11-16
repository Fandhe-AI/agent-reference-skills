---
source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/bare-metal/docs/concepts/about-bare-metal
---

# Google Distributed Cloud software only for bare metal overview

Google Distributed Cloud software only for bare metal runs GKE-based clusters directly on your physical Linux servers, managed alongside cloud clusters in a fleet. Admin clusters manage the lifecycle of user clusters using Kubernetes Resource Management (KRM).

## Signature / Usage

### Key components

- **Admin cluster**: one or more physical Linux machines as control plane nodes; manages user clusters.
- **User cluster**: at least one control plane node and one worker node; runs workloads.
- **Admin workstation**: hosts configuration files and tools: `bmctl` (creates, updates and manages clusters) and `kubectl`.
- **GKE On-Prem API** (clients: console, Google Cloud CLI, Terraform), **Google Cloud console**, and **VIPs** (control plane VIPs for `kubectl`; Service and Ingress VIPs for applications).
- Operational features: HA with multiple control plane nodes, automated preflight checks, integrated Layer 4 and Layer 7 load balancing deployed at cluster creation, automated `etcd` defragmentation (`etcddefrag`).

### Archived documentation (version 1.16 and earlier)

```text
https://cloud.google.com/anthos/clusters/docs/bare-metal/VERSION/
```

Replace `VERSION` with a minor version from 1.0 to 1.16 and copy the URL to the address bar in your browser.

## Options / Props

### Data sent to Google Cloud

| Data | What is sent | Default |
|------|--------------|---------|
| Connection and fleet registration (`gkehub.googleapis.com`, `gkeconnect.googleapis.com`) | Project, membership name, cluster UID, public keys, Kubernetes version, cluster size, identity provider configuration, Kubernetes data requested via console / connect gateway, encrypted Kubernetes token until sign-out | Required |
| Cluster settings and status (`gkeonprem.googleapis.com`) | Name, UID, description, annotations, version, lifecycle state, control plane VIP and port, node pool names, node IPs, Pod / Service CIDRs, load balancer VIPs and address pools, BGP peer IPs and ASNs, proxy URLs, local storage paths, administrator emails. Stored in the region set in `gkeOnPremAPI.location` (defaults to `clusterOperations.location`) | On in 1.16 and later if the GKE On-Prem API is enabled; off with `gkeOnPremAPI.enabled: false` |
| Billing usage (`anthos.googleapis.com`) | vCPU capacity, node count, license entitlement status | Required; buffered during outage |
| System health data (`logging.googleapis.com`, `monitoring.googleapis.com`, `opsconfigmonitoring.googleapis.com`) | Metrics; logs and health checks of admin components and the `kube-system`, `gke-system`, `gke-connect`, `istio-system`, `config-management-system`, `knative-serving`, `monitoring-system`, `gatekeeper-system`, `cnrm-system` user cluster namespaces; names and labels. Project in `clusterOperations.projectID`, metrics region `clusterOperations.location` | On for system logs and metrics (required for full Customer Care and SLA); off for application logs / metrics unless `enableCloudLoggingForApplications` or `enableGMPForApplications` is `true` in the `Stackdriver` resource |
| Audit logs (`anthosaudit.googleapis.com`) | Admin Activity audit logs (`audit-proxy`); reads not recorded. Cloud Audit Logs `_Required` bucket, 400 days | On; turn off with `clusterOperations.disableCloudAuditLogging: true` (then kept only on control plane node disks) |

### Data that stays in your data center

- Containers, Pods, PersistentVolumes, local storage backends and application data; the control plane and `etcd`.
- CA private keys (cluster CA, `etcd` CA, front-proxy CA; user cluster CAs in the admin cluster's user cluster namespace).
- Application secrets, OAuth tokens, SSH keys, registry credentials, service account key files; the default diagnostic snapshot does not include cluster credentials.
- The cluster configuration file on the admin workstation. Audit logs are written to disk only if Cloud Audit Logs is turned off. A diagnostic snapshot goes to Cloud Storage only if you set up a service account for uploads.

## Notes

- Former names: Google Distributed Cloud software only for bare metal was formerly Google Distributed Cloud Virtual, previously Anthos clusters on bare metal.
- Billing is per vCPU; enable the Anthos API (`anthos.googleapis.com`) in the project. Fleet membership determines billing; the Connect Agent is deployed automatically.
- Starting with 1.29 no numbered directory exists for the previous minor release; version support policy: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/bare-metal/docs/getting-support#version-support
- Getting started: demo clusters on Compute Engine VMs (`try/admin-user-gce-vms`), minimal infrastructure plan, quickstart for basic clusters on your hardware.
- GDC hosted / edge (`distributed-cloud/` hardware) is out of scope; see `vmware-overview.md` for the VMware flavour.
- The source page has no commands; the fenced block is the archived-documentation URL pattern quoted verbatim from the source.
- Source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/bare-metal/docs/concepts/about-bare-metal (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [bare-metal-install-prep.md](./bare-metal-install-prep.md)
- [bare-metal-limits.md](./bare-metal-limits.md)
- [vmware-overview.md](./vmware-overview.md)
