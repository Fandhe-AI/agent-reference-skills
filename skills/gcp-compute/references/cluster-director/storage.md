---
source: https://docs.cloud.google.com/cluster-director/docs/storage
---

# Storage in Cluster Director

Overview of storage services usable in Cluster Director: shared network storage (cluster-wide file systems and object stores for datasets, checkpoints and `/home`) and node boot disk storage (block storage per node for the OS, GPU/TPU drivers and Slurm daemons).

## Signature / Usage

### Create a cluster with new and existing Filestore, Cloud Storage and Managed Lustre resources

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/clusters/create (gcloud 593.0.0 help, granular-flags example).

Replace `FILESTORE_SIZE`, `FILESHARE`, `LUSTRE_SIZE`, `FILESYSTEM`, `RESERVATION` and `MACHINE_TYPE` with your values.

Adapted (not in the official docs): the help text wraps long values (for example `name=locations/us-central1-a/instances/\` then `filestore0,...`) which breaks the arguments when pasted, uses `{filestoreSize}`-style placeholders, leaves `nodesetIds=[nodeset0]` unquoted (zsh treats it as a glob), omits the required `id` key from the `--create-*` / `--filestores` / `--lustres` / `--buckets` values and spells the partition key `nodesetIds` instead of `nodeSetIds` (gcloud 593.0.0 rejects both); values are joined, `id` keys added, the key renamed, placeholders upper-cased and the bracketed value quoted.

```bash
gcloud cluster-director clusters create my-cluster \
    --location=us-central1 --description="My cluster description" \
    --labels=env=prod,client=gcloud-cli \
    --create-network=name=network0 \
    --create-filestores=id=filestore0,name=locations/us-central1-a/instances/filestore0,tier=ZONAL,capacityGb=FILESTORE_SIZE,fileshare=FILESHARE \
    --filestores=id=filestore1,name=locations/us-central1-a/instances/filestore1 \
    --create-buckets=id=bucket0,name=bucket0 --buckets=id=bucket1,name=bucket1 \
    --create-lustres=id=lustre0,name=locations/us-central1-a/instances/lustre0,capacityGb=LUSTRE_SIZE,filesystem=FILESYSTEM \
    --lustres=id=lustre1,name=locations/us-central1-a/instances/lustre1 \
    --reserved-instances=id=compute0,reservation=zones/us-central1-a/reservations/RESERVATION \
    --slurm-login-node=machineType=MACHINE_TYPE,zone=us-central1-a \
    --slurm-node-sets=id=nodeset0,computeId=compute0 \
    --slurm-partitions='id=partition0,nodeSetIds=[nodeset0]' \
    --slurm-default-partition=partition0 --format=json
```

## Options / Props

### Shared network storage

| Service | Features | Recommended for |
|---|---|---|
| Filestore | Managed NFS file storage; default for home directories | Home directories, general-purpose file storage, NFS workloads |
| Managed Lustre | Managed parallel file system optimized for AI/HPC; low latency, full POSIX. Dynamic tier supported (new or existing instances); the cluster must then use an existing VPC with `dynamic_tier_capacity` quota | Home directories, migrating AI/ML workloads, model simulations, frequent small reads/writes, high-throughput burst |
| Cloud Storage | Object store; at cluster creation choose Rapid, Standard or Autoclass; mount via Cloud Storage FUSE | Rapid-class data access, cost-effective storage, data prep, training data and checkpoints |

### By orchestrator

| Orchestrator | Requirement |
|---|---|
| Slurm | Shared file system for `/home` on all compute and login nodes: new or existing Filestore or Managed Lustre instance. |
| Managed compute | Optional per MIG. Adding or removing mounts updates `/etc/fstab.d/ce.fstab` and mounts or unmounts within 30 seconds, without restarting instances. |

New and existing storage resources can be mixed. An existing Filestore or Managed Lustre instance must be on the cluster's VPC network. Each storage resource defines either a new or an existing configuration, not both.

### Node boot disks

| Option | Features | Recommended for |
|---|---|---|
| Standalone boot disks | Dedicated Persistent Disk or Hyperdisk volume per node; default | Standard deployments, static clusters, constant node usage |
| Hyperdisk storage pools | Share capacity and performance across boot disks in a zone. Existing Hyperdisk pools or Hyperdisk Exapools, Slurm clusters only. Boot disks need Hyperdisk Balanced volumes, so pools using Hyperdisk Throughput cannot be used. | Compute and login boot disks in Slurm clusters, on-demand scaling, shared capacity/IOPS |

Only machine series that support Hyperdisk Balanced can use storage pools; with an unsupported series the create or modify operation fails.

### Non-boot disks for managed compute clusters

Per-instance read-write disks created from a blank volume, source image or snapshot in the same project. On MIGs with GPU or CPU instances using any consumption option except Flex-start, each is a stateful disk, so replacement instances reattach the same disk across rolling updates or preemptions. On MIGs with TPU VMs or Flex-start VMs, new non-boot disks persist for the lifetime of the MIG.

## Notes

- Storage products as such (Filestore, Managed Lustre, Cloud Storage, Backup and DR) are in `gcp-storage`; Compute Engine disks and Hyperdisk are in this skill.
- A Rapid Cloud Storage bucket's class cannot be changed after creation (see [process-overview.md](./process-overview.md)).
- Adapted from the official gcloud help text: wrapped values joined into single arguments, `{filestoreSize}` / `{fileshare}` / `{lustreSize}` / `{filesystem}` / `{reservation}` / `{machineType}` replaced with upper-case placeholders, `--slurm-partitions=id=partition0,nodesetIds=[nodeset0]` corrected to `nodeSetIds` and single-quoted, and the required `id` key added to the bucket, Filestore and Lustre flags (gcloud 593.0.0 reports `Key [id] required in dict arg` and `valid keys are [id, nodeSetIds]` for the original).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/clusters/create (gcloud 593.0.0 help). The source page shows no commands. The command creates billable cluster resources; try it in a disposable project first.
- Source: https://docs.cloud.google.com/cluster-director/docs/storage (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [process-overview.md](./process-overview.md)
- [orchestration.md](./orchestration.md)
- [quotas.md](./quotas.md)
- [networking.md](./networking.md)
