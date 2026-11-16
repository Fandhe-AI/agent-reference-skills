---
source: https://docs.cloud.google.com/cluster-director/docs/create/process-overview
---

# Cluster creation process overview

Before creating a cluster you choose an orchestrator (Slurm or managed compute) and a creation method (pre-configured template for common GPU/TPU workloads, or custom step-by-step). You then define reusable compute, network and storage resource configurations and group them in the orchestrator.

## Signature / Usage

Steps: 1) compute resources, 2) networking resources, 3) storage resources, 4) orchestrator, 5) optional data protection.

### Interactive planning prompt (Compute Advisor)

The source offers this prompt for Compute Advisor (reproduced verbatim, including its numbering).

```text
Act as a cloud architect. Help me design a cluster in Cluster Director based on my project quotas, existing reservations, and available regions.

Start by asking me about my workload type (such as foundation model training, fine-tuning, or inference), my target scale, and whether I want to use the built-in Slurm scheduler or my own orchestrator on Compute Engine managed instance groups (MIGs). After I provide my workload details, walk me through the five setup steps in this guide:

1. Configure compute resources: Recommend machine series for compute nodes (A4X Max, A4X, A4, A3 Ultra, A3 Mega, TPU7x, TPU v6e, TPU v5p, or N2) and, for Slurm clusters, controller nodes (N2) and login nodes (C4A or N2), a deployment region and zone, and a consumption option (reservations, Flex-start, Spot, or on-demand).

2. Configure networking resources: Recommend whether to let Cluster Director create a new VPC network or to use an existing VPC or Shared VPC network with the required subnet, Private Google Access, health check (TCP port 8319), and IAP (TCP port 22) firewall rules.

3. Configure storage resources: Recommend new or existing Filestore instances, Google Cloud Managed Lustre instances, or Cloud Storage buckets (noting that Slurm clusters require a Filestore or Managed Lustre instance for the shared /home directory).

4. Configure the orchestrator:

7. Configure data protection (optional): Identify whether I need a VPC Service Controls service perimeter and list the required restricted APIs.

Format the recommendations as a Markdown summary table for each step, followed by recommended Google Cloud console settings and next steps.
```

## Options / Props

### Compute resources

| Item | Rule |
|---|---|
| Resource configurations | Each Slurm nodeset or MIG uses a single compute resource configuration and machine type; a cluster can have several. |
| Compute nodes: foundational model training and inference | A4X Max or A4X |
| Compute nodes: large model training, fine-tuning, inference | A4, A3 Ultra, TPU7x, TPU v6e, or TPU v5p |
| Compute nodes: mainstream inference and fine-tuning | A3 Mega |
| Compute nodes: general-purpose HPC | N2 |
| Controller nodes (Slurm only) | N2 |
| Login nodes (Slurm only) | C4A or N2 |
| Location | All compute, storage and subnetwork resources must be in the same zone. AI zones (zone names containing `-ai` after the region name) are not supported. |
| Consumption option | Reservation, Flex-start VMs, Spot VMs or on-demand; see [choose-consumption-option.md](./choose-consumption-option.md). |

### Existing VPC or Shared VPC requirements

- Enable Private Google Access.
- Firewall rules allowing SSH to VMs and internal ingress among VMs.
- Subnetwork must allow health checks over TCP port `8319`, must have a firewall rule allowing Identity-Aware Proxy (IAP) access to the VMs on TCP port `22`, and must not overlap `10.20.1.0/28`, `10.0.0.0/17`, `192.168.64.0/18`, `192.168.128.0/18`.
- New VPC network: Cluster Director creates the network, subnetwork and the required firewall rules.

### Shared VPC extra steps

Configure private services access, enable the Cloud DNS API in the host project, and grant IAM roles at host-project level or subnetwork level. `PROJECT_NUMBER` is the project number of the project that holds the cluster.

| Scope | Role / permissions | Principal |
|---|---|---|
| All subnets in host project | Compute Network User (`roles/compute.networkUser`) | Google APIs Service Agent |
| All subnets in host project | Hypercompute Shared VPC Service Agent (`roles/hypercomputecluster.sharedVpcServiceAgent`) | `service-PROJECT_NUMBER@gcp-sa-hypercomputecluster.iam.gserviceaccount.com` |
| Specific subnets | Compute Network User (`roles/compute.networkUser`) on the subnetwork | Google APIs Service Agent and the Cluster Director service agent above |
| Specific subnets | Compute Network Viewer (`roles/compute.networkViewer`) on the host project | Cluster Director service agent |
| Specific subnets | Custom role with `dns.managedZones.get`, `dns.managedZones.list`, `dns.networks.bindPrivateDNSZone`, `dns.networks.targetWithPeeringZone` on the host project | Cluster Director service agent |

### Storage

| Orchestrator | Shared storage |
|---|---|
| Slurm | Required: a Filestore or Managed Lustre instance for the shared `/home` on all login and compute nodes; optionally more Filestore / Managed Lustre / Cloud Storage buckets. |
| Managed compute | Optional: any combination of Filestore, Managed Lustre, Cloud Storage buckets on MIGs. |

- Each storage resource is either new (created by Cluster Director) or existing, not both. Existing Filestore and Managed Lustre instances must use the cluster's VPC network.
- Managed Lustre Dynamic tier: the cluster must use an existing VPC network that allocates the `dynamic_tier_capacity` quota.
- New Cloud Storage buckets at cluster creation: only Rapid, Standard or Autoclass storage class; change other classes after creation. A Rapid bucket's storage class cannot be changed after creation (zonal, always Rapid).

### Slurm orchestrator

| Setting | Rule |
|---|---|
| Slurm controller version | Settable only with gcloud CLI or REST API at creation; cannot be changed afterwards. Compute nodes cannot run a newer Slurm than the controller (for example, controller 25.05 cannot use an image requiring Slurm 26.05). |
| Boot disks | Controller: standalone boot disks only. Login and compute nodes: standalone disks or Hyperdisk pools if the machine series supports Hyperdisk; pools must be existing storage pools or Hyperdisk Exapools using Hyperdisk Balanced, in the same project and zone as the nodes. |
| Nodeset | One compute resource configuration per nodeset; set `staticNodeCount`, `maxDynamicNodeCount` and boot disk settings. |
| A4X | Total A4X VMs in a nodeset (static + dynamic) must be a multiple of 18 (capacity is provisioned in indivisible sub-blocks of 18 VMs). |
| TPU nodesets | Either static or dynamic node count, not both; a static TPU nodeset needs an accelerator topology and a static count that is a multiple of the VMs per slice. |
| TPU partitions | A partition with a TPU nodeset cannot contain GPU or CPU nodesets, and cannot mix static and dynamic TPU nodesets. |
| Optional | Custom `slurm.conf` parameters, startup `prologBashScripts`, shutdown `epilogBashScripts`. |

### Managed compute (MIGs)

Each zonal MIG references one compute resource configuration and a `targetSize`; a TPU MIG represents one TPU slice with a topology, and total TPU chips must equal the slice's chip count. Choose a managed compute OS image or a custom image, configure the boot disk, attach per-instance read-write additional disks; customize service account and scopes, OS Login, external IPs, startup scripts, metadata and labels per MIG.

### Data protection (VPC Service Controls, optional)

Perimeter resources (`perimeterResources`): the cluster's project, plus the Shared VPC host project if used. Restricted services (`restrictedServices`): `compute.googleapis.com`, `file.googleapis.com`, `hypercomputecluster.googleapis.com`, `logging.googleapis.com`, `lustre.googleapis.com` and `monitoring.googleapis.com`.

## Notes

- Perimeter changes can take up to 30 minutes to take effect and then apply to any cluster created in the project.
- The source's Compute Advisor prompt contains an empty step 4 and a step numbered 7; it is reproduced verbatim.
- VPC networks, firewall rules and Shared VPC themselves are in the planned `gcp-networking`; IAM in general is in `gcp-foundation`.
- Source: https://docs.cloud.google.com/cluster-director/docs/create/process-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [compute.md](./compute.md)
- [choose-consumption-option.md](./choose-consumption-option.md)
- [orchestration.md](./orchestration.md)
- [networking.md](./networking.md)
- [storage.md](./storage.md)
- [os-images.md](./os-images.md)
