---
source: https://docs.cloud.google.com/cluster-director/docs/orchestration
---

# Choose an orchestrator (Slurm and managed compute)

An orchestrator coordinates Compute Engine instances so they act as one cluster. In Cluster Director you choose Slurm orchestration or managed compute orchestration (zonal MIGs). This page also covers the architecture of the managed Slurm environment (`cluster-director/docs/slurm-orchestration`).

## Signature / Usage

### Change static and dynamic node counts of a nodeset

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/clusters/update (gcloud 593.0.0 help, first line-wrapped value joined and `nodesetIds=[...]` quoted so a shell does not treat the brackets as a glob).

Adapted (not in the official docs): the help text wraps `staticNodeCount=2,` and `maxDynamicNodeCount=10` across two lines, which breaks the argument when pasted, and leaves `nodesetIds=[nodeset0]` unquoted (zsh treats it as a glob) with a key spelled `nodesetIds` that gcloud 593.0.0 rejects (`valid keys are [id, nodeSetIds]`); the value is joined, the key renamed to `nodeSetIds` and the value quoted.

```bash
gcloud cluster-director clusters update my-cluster \
    --location=us-central1-a \
    --update-slurm-node-sets=id=nodeset1,staticNodeCount=2,maxDynamicNodeCount=10 \
    --update-slurm-partitions='id=partition1,nodeSetIds=[nodeset0]'
```

## Options / Props

### Slurm vs managed compute

| Feature | Slurm orchestration | Managed compute orchestration |
|---|---|---|
| Audience | AI researchers, HPC engineers, IT administrators supporting multiple users on a shared cluster | ML platform engineers running their own orchestrator; researchers running dedicated distributed workloads |
| Primary use | Multi-user clusters: managed job queue, priority-based placement, dynamic scaling of idle nodes | Custom scheduler (Ray, HTCondor) or distributed workloads (JAX, MaxText, MPI) launched via SSH |
| Control plane | Managed Slurm controller node plus one or more login nodes | No Slurm controller or login nodes; SSH to MIG instances |
| Node organization | Partitions and nodesets with `staticNodeCount` and `maxDynamicNodeCount`; one machine type per nodeset | Zonal MIGs with `targetSize`; one machine type per MIG |
| Machine series | GPU: A4X Max, A4X, A4, A3 Ultra, A3 Mega; TPU: TPU7x, TPU v6e, TPU v5p; CPU: C4A (login nodes only), N2 | Same GPU and TPU; CPU: N2 |
| Scaling | Between `staticNodeCount` and `maxDynamicNodeCount` based on pending jobs; dynamic nodes deleted after five minutes `idle` | Maintains `targetSize` per MIG, or queues a MIG resize request |
| Shared storage | Requires Filestore or Managed Lustre mounted at `/home` across all nodesets and login nodes | Optional; any mix of Filestore, Managed Lustre, Cloud Storage per MIG; mount updates within 30 seconds without restarting instances |
| Block storage | Standalone boot disks and Hyperdisk storage pools for boot disks | Standalone boot disks and read-write additional disks per instance |
| OS images | Slurm images (`-slurm-`) with Slurm daemons, Enroot, Pyxis, Open MPI | Non-Slurm images (`-ce-`) or custom images |
| AI templates | Yes | Yes |

### Slurm architecture

| Node | Role |
|---|---|
| Controller | Control plane that monitors resources, manages state and processes jobs; fault-tolerant. You cannot connect to, modify or delete it. |
| Login | Entry points for SSH, job submission and status; Slurm commands pre-configured, shared file systems mounted. |
| Compute | Run jobs, grouped in partitions (same machine type). Static nodes: minimum always-running instances (TPU static nodes form persistent slices with fixed topology; Slurm restarts failed static nodes). Dynamic nodes: up to a maximum of extra instances created on demand; idle GPU/CPU nodes powered down after five minutes; dynamic TPU nodesets provision a slice matching the job's topology and delete it afterwards. |

### Slurm capabilities

- Job scheduling and queuing by priority, policy and resource availability; resource tracking of vCPUs, memory, GPUs, Local SSD and TPU chips.
- Topology-aware placement colocates a job's tasks; for TPUs Slurm provisions or selects interconnected 2D or 3D torus slices and coordinates single-slice and multi-slice heterogeneous jobs.
- GPU health: prolog script `990_chs_gpu_health_check_hcs.sh` runs before each job and drains a failing node; `health_check_program.sh` runs every two minutes and logs errors (for example unresponsive GPUs or corrupted firmware) to the node's system logs without draining.
- Custom Slurm settings at cluster, partition and nodeset levels (see `https://docs.cloud.google.com/cluster-director/docs/slurm-settings`).

### Decision questions

1. Built-in scheduler, login nodes and central queue for multiple users? Yes: Slurm.
2. Run your own scheduler (Ray, HTCondor) or launch jobs by SSH on infrastructure Cluster Director sets up? Yes: managed compute.
3. Scale nodes from a job queue (Slurm) or maintain a fixed MIG size you resize on demand (managed compute).

## Notes

- Managed compute orchestration details: https://docs.cloud.google.com/cluster-director/docs/managed-compute-orchestration ; Slurm controller versions: https://docs.cloud.google.com/cluster-director/docs/slurm-controller-versions .
- Slurm here is the Cluster Director managed Slurm environment on Compute Engine; Kubernetes-based orchestration is in `gcp-gke`.
- Adapted from the official gcloud help text: `--update-slurm-node-sets=id=nodeset1,staticNodeCount=2,\` followed by `maxDynamicNodeCount=10` on the next line was joined into one argument, and `--update-slurm-partitions=id=partition1,nodesetIds=[nodeset0]` was corrected to `nodeSetIds` and single-quoted.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/clusters/update (gcloud 593.0.0 help). The command changes a cluster; try it on a disposable cluster first. The source page shows no commands.
- Source inconsistency: the gcloud 593.0.0 `clusters create` examples (and compute.md, networking.md, storage.md) use `--location=us-central1`, while the `clusters list`, `describe`, `update` and `delete` examples use `--location=us-central1-a` ("To list all clusters in particular location us-central1-a"). The help gives the cluster resource format `projects/{project}/locations/{locations}/clusters/{cluster}`, so pass the location the cluster was created in.
- Source (`--location` in the cluster examples): `gcloud cluster-director clusters create --help`, `gcloud cluster-director clusters list --help`, `gcloud cluster-director clusters describe --help`, `gcloud cluster-director clusters update --help`, `gcloud cluster-director clusters delete --help` (gcloud 593.0.0, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/cluster-director/docs/orchestration (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/cluster-director/docs/slurm-orchestration (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [process-overview.md](./process-overview.md)
- [os-images.md](./os-images.md)
- [storage.md](./storage.md)
- [quickstart.md](./quickstart.md)
