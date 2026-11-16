---
source: https://docs.cloud.google.com/compute/docs/nodes/sole-tenant-nodes
---

# Sole-tenancy overview

Sole-tenancy provides exclusive access to a sole-tenant node, a physical Compute Engine server dedicated to hosting only your project's VMs. A node group can optionally be shared with other projects or the whole organization. Each sole-tenant node maps one-to-one to its physical server; VMs on it use the same Compute Engine features as other VMs with added hardware isolation. Sole-tenant nodes support per-core / per-processor BYOL scenarios, and Compute Engine reports the physical server ID of each VM so server usage can be viewed in Cloud Logging.

## Signature / Usage

Provisioning order: create a node template, create a node group, then provision VMs on the nodes.

List the node types available to your project (REST: `nodeTypes.list`):

```bash
gcloud compute sole-tenancy node-types list
```

Create a node template (a node type is required; node affinity labels are optional and only settable on the template):

```bash
gcloud compute sole-tenancy node-templates create \
    my-node-template --node-type=n1-node-96-624
```

Create a node group from a template:

```bash
gcloud compute sole-tenancy node-groups create my-node-group \
    --node-template=example-template --target-size=4
```

## Options / Props

### Concepts

| Concept | Description |
|---|---|
| Node template | Regional resource defining the properties of each node in a node group; properties are immutably copied to each node. Requires a node type; optional node affinity labels (templates only, not groups). |
| Node type | Fixes total vCPU and memory per node (for example `n2-node-80-640` = 80 vCPUs, 640 GB). VMs on a node must use the same machine series as the node type (an `n2` node type only takes `n2` VMs) until vCPUs or memory are exhausted. The type applies to each node individually. |
| Node group | Homogeneous set of sole-tenant nodes in one zone; inherits the template; holds VMs of the same machine series with any size of 2 or more vCPUs. Specify host maintenance policy, sharing settings and size (zero or more nodes; manual or autoscaling). |

### Node types (selected rows; vCPU / GB / max VMs)

The source table lists every node type. Run `gcloud compute sole-tenancy node-types list` for the types available to your project.

| Node type | Processor | vCPU | GB | Sockets x cores | Max VMs |
|---|---|---|---|---|---|
| `a2-highgpu-node-96-680` | Cascade Lake | 96 | 680 | 2 x 24 | 8 |
| `a3-highgpu-node-208-1872-lssd` | Sapphire Rapids | 208 | 1,872 | 2 x 56 | 8 |
| `c3-node-176-704` | Sapphire Rapids | 176 | 704 | 2 x 56 | 40 |
| `c4-node-288-1080` | Granite Rapids | 288 | 1,080 | 2 x 78 | 20 |
| `c4a-node-72-288` | Google Axion | 72 | 288 | 1 x 80 | 16 |
| `g2-node-96-384` | Cascade Lake | 96 | 384 | 2 x 28 | 8 |
| `h4d-node-192-720` | AMD EPYC Turin | 192 | 720 | 2 x 128 | 1 |
| `m3-node-128-1952` | Ice Lake | 128 | 1,952 | 2 x 36 | 2 |
| `n1-node-96-624` | Skylake | 96 | 624 | 2 x 28 | 96 |
| `n2-node-80-640` | Cascade Lake | 80 | 640 | 2 x 24 | 80 |
| `n2-node-128-864` | Ice Lake | 128 | 864 | 2 x 36 | 128 |
| `n2d-node-224-896` | AMD EPYC Milan | 224 | 896 | 2 x 64 | 108 |
| `n4-node-224-1372` | Emerald Rapids | 224 | 1,372 | 2 x 60 | 90 |

Series with node types in the source: A3, A2, C4, C4A, C4D, C4N, C3, C3D, C2, G4, G2, H4D, H3, M4, M3, M2, M1, N4A, N4, N2, N2D, N1.

`-lssd` suffix: Local SSD disks are attached to the node. For A3 High, A3 Mega and A2 Ultra node types Local SSD is also attached by default when no suffix is given; use the `-nolssd` suffix (for example `a3-megagpu-node-208-1872-nolssd`, `a2-ultragpu-node-96-1360-nolssd`) to provision without Local SSD.

### Host maintenance policies (set on the node group; cannot be updated on a live node group)

Host events occur approximately every 4 to 6 weeks. All policies keep VMs on dedicated hardware.

| Policy | Behavior | Best for |
|---|---|---|
| Default | Traditional maintenance behavior: depending on the VM's on-host-maintenance setting, VMs live migrate to a new sole-tenant node in the group that runs only your VMs. No fixed pool of physical servers. | Per-user / per-device licenses, general workloads without physical server requirements. Not suitable for minimizing physical core use. |
| Restart in place | Compute Engine stops VMs during the host event and restarts them on the same physical server afterwards. VM on-host-maintenance must be `TERMINATE`. Instance can be assigned using `node-name`, `node-group-name` or a node affinity label. About one hour of downtime. | Fault-tolerant workloads, same-physical-server requirement, per-core / per-processor licenses. |
| Migrate within node group | Live migrates VMs within a fixed-size group of physical servers (each node pinned to a fixed set), limiting unique servers used. Cannot assign or manually live migrate a VM by `node-name` affinity; custom labels need `node-group-name` and not `node-name`. Needs at least 2 nodes and one empty holdback node at all times; deleting the only empty node fails with `insufficient holdback`. Unsupported for VMs that cannot live migrate; no maintenance windows. | High-availability workloads with per-core / per-processor licenses (for example Windows Server BYOL). |

VMs that do not support live migration (such as some Confidential VMs) on the Default policy: Compute Engine allocates a fresh sole-tenant node, terminates the VMs on the old node and restarts them on the new one. To minimize downtime set the node group policy to Default and the VMs to `onHostMaintenance=TERMINATE` with `automaticRestart=true`.

Holdback nodes for Migrate within node group (1 reserved per 20 nodes):

| Total nodes in group | Holdback nodes reserved |
|---|---|
| 1 | Not applicable. Must reserve at least 2 nodes. |
| 2 to 20 | 1 |
| 21 to 40 | 2 |
| 41 to 60 | 3 |
| 61 to 80 | 4 |
| 81 to 100 | 5 |

Pinning an instance to multiple node groups with the `node-group-name` affinity label requires the instance to use the default policy (Migrate VM instance) and all node groups to use Migrate within node group; mixed policies fail. A Terminate instance can be pinned to only one node group.

### Maintenance windows

4-hour blocks specified when creating the node group; cannot be modified afterwards. The window only defines when node maintenance may begin (triggering live migration or terminate-and-restart at VM level); it does not guarantee completion or frequency. Not supported with Migrate within node group.

### Default affinity labels

| Key | Value |
|---|---|
| `compute.googleapis.com/node-group-name` | Name of the node group |
| `compute.googleapis.com/node-name` | Name of the individual node |
| `compute.googleapis.com/project` | Project ID of the project containing the node group |

Default labels are system-managed and not shown in the console's custom affinity labels list. Custom labels are defined on the node template and inherited by all nodes; none can be added to a node group afterwards. Specify affinity or anti-affinity on a VM to co-locate or separate VMs.

### GPU and Local SSD availability

| GPU type | GPU quantity | Sole-tenant node type |
|---|---|---|
| NVIDIA A100 40GB | 8 | `a2-highgpu` |
| NVIDIA A100 40GB | 16 | `a2-megagpu` |
| NVIDIA A100 80GB | 8 | `a2-ultragpu` |
| NVIDIA H100 | 8 | `a3-highgpu` |
| NVIDIA H100 | 8 | `a3-megagpu` |
| NVIDIA L4 | 8 | `g2` |
| NVIDIA RTX PRO 6000 | 8 | `g4` |
| NVIDIA P4 | 4 | `n1` |
| NVIDIA T4 | 4 | `n1` |
| NVIDIA V100 | 8 | `n1` |

GPUs are supported on `n1`, `g2`, `g4`, `a2-highgpu`, `a2-megagpu`, `a2-ultragpu`, `a3-highgpu` and `a3-megagpu` node types in zones with GPU support. Local SSD is supported on `n1`, `n2`, `n2d`, `g2`, `g4`, `a2-ultragpu`, `a3-highgpu` and `a3-megagpu` node types. Check GPU / Local SSD quota in the zone first.

### Restrictions

- No sole-tenant VMs with T2D, T2A, E2, C2D, A3 Ultra, A3 Edge, A4, A4X, or bare metal instances.
- Sole-tenant VMs cannot specify a minimum CPU platform; a VM that does cannot be migrated to a sole-tenant node until it is set back to automatic.
- Preemptible VM instances are not supported on sole-tenant nodes.
- Nodes with GPUs do not support VMs without GPUs.
- Only N1, N2, N2D and N4 sole-tenant nodes support overcommitting CPUs.
- C3, C3D, C4, C4A, C4D, G4, N4 and M4 VMs are scheduled aligned to the node's NUMA architecture; mixing full and sub-NUMA shapes can fragment the node.
- C3 and C4 nodes require VMs with the same vCPU-to-memory ratio as the node type (for example no `c3-standard` VM on a `-highmem` node type).
- The maintenance policy cannot be updated on a live node group.
- Confidential VMs that cannot live migrate behave differently under each of the three policies.
- Availability: only in select zones; schedule VMs on nodes in different zones for high availability.

## Notes

- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/sole-tenancy/node-types/list, https://docs.cloud.google.com/sdk/gcloud/reference/compute/sole-tenancy/node-templates/create and https://docs.cloud.google.com/sdk/gcloud/reference/compute/sole-tenancy/node-groups/create (gcloud 593.0.0 help, EXAMPLES); the twin contains no code block.
- Pricing: committed use discounts and sustained use discounts apply, but for the sole-tenancy premium only flexible CUDs and SUDs (not resource-based CUDs). You are billed for all GPUs or Local SSD disks on each provisioned node; the premium is based only on vCPU and memory. VMs created on the node add no extra charge. See the sole-tenant node pricing page (prices not copied).
- A host critical hardware failure (sole-tenant or multi-tenant) retires the physical server and its identifier, revokes your project's access, replaces it with a new server with a new identifier, moves the VMs, and restarts them if configured for automatic restart.
- The source table has two out-of-order rows (`g4-node-384-1440` between the two `g2` rows); the full table is in the source.
- The source also links to separate pages for provisioning, overcommitting CPUs, sharing node groups, manual live migration, autoscaling node groups, BYOL and best practices; they are not in this category.
- GPU pages: Compute Engine sole-tenant nodes; GPUs and TPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`. Confidential VM: Google Cloud Confidential VM, not Apple Private Cloud Compute (`apple-intelligence`).
- Source inconsistency: this page says "You can't use sole-tenant VMs with the following machine series and types: T2D, T2A, E2, C2D, A3 Ultra, A3 Edge, A4, A4X, or bare metal instances", and its node-type table has no X4 node type, while the machine series comparison table in machine-resource.md gives X4 (instance type "Bare metal") Sole tenancy "Yes" and "A3 (H100)", which includes the H100-based A3 Edge, Sole tenancy "Yes". Create sole-tenant nodes only with a node type listed on this page.
- Source (Compute Engine machine families, series, and machine types, cited above as `machine-resource.md`): https://docs.cloud.google.com/compute/docs/machine-resource (retrieved 2026-11-17)
- Source inconsistency: the official sole-tenant node type table lists both `m2-node-416-8832` (416 vCPUs, 8,832 GB) and `m2-node-416-11776` (416 vCPUs, 11,776 GB), while memory-optimized-machines.md (compute-machine-types) says "Sole tenant nodes are available for only the `m2-ultramem-416` shape."
- Source (memory-optimized machine family, cited above as `memory-optimized-machines.md`): https://docs.cloud.google.com/compute/docs/memory-optimized-machines (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/nodes/sole-tenant-nodes (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-vm-tenancy.md](./about-vm-tenancy.md)
- [host-maintenance-overview.md](./host-maintenance-overview.md)
- [live-migration-process.md](./live-migration-process.md)
- [setting-vm-host-options.md](./setting-vm-host-options.md)
