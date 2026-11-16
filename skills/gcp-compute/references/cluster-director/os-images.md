---
source: https://docs.cloud.google.com/cluster-director/docs/os-images
---

# Supported OS images in Cluster Director

OS images with pre-configured accelerator drivers, runtime libraries and cluster software, published in the `clusterdirector-public-images` project. Slurm images are extensions of Ubuntu LTS images; managed compute images (`-ce-`) contain no Slurm.

## Signature / Usage

### Reference an image family (default for A4X Max Slurm nodesets)

```text
projects/clusterdirector-public-images/global/images/family/a4x-max-ubuntu-2404-arm64-nvidia-580-slurm-2505-v20260731
```

If you do not specify an OS image when creating a nodeset (or a MIG), Cluster Director uses the default image for the machine series. Custom Compute Engine images are also allowed for MIGs.

## Options / Props

### Slurm OS images (families under `projects/clusterdirector-public-images/global/images/family/`)

| Machine series | OS | NVIDIA driver / CUDA | Slurm | Family |
|---|---|---|---|---|
| A4X Max | Ubuntu 24.04 LTS | 580 / CUDA 13 | 25.05 | `a4x-max-ubuntu-2404-arm64-nvidia-580-slurm-2505-v20260731` (default) |
| A4X or C4A | Ubuntu 24.04 LTS | 595 / CUDA 13 | 26.05 | `a4x-ubuntu-2404-arm64-nvidia-595-slurm-2605-v20260903` |
| A4X or C4A | Ubuntu 24.04 LTS | 580 / CUDA 13 | 25.05 | `a4x-ubuntu-2404-arm64-nvidia-580-slurm-2505-v20251118` (default) |
| A4, A3 Ultra, or N2 | Ubuntu 24.04 LTS | 595 / CUDA 13 | 26.05 | `common-ubuntu-2404-amd64-nvidia-595-slurm-2605-v20260903` |
| A4, A3 Ultra, or N2 | Ubuntu 22.04 LTS | 580 / CUDA 13 | 25.05 | `common-ubuntu-2204-amd64-nvidia-580-slurm-2505-v20251113` (default) |
| A4, A3 Ultra, or N2 | Ubuntu 22.04 LTS | 570 / CUDA 12 | 25.05 | `common-ubuntu-2204-amd64-nvidia-570-slurm-2505-v20250918` |
| A3 Mega | Ubuntu 24.04 LTS | 595 / CUDA 13 | 26.05 | `a3-h100-ubuntu-2404-amd64-nvidia-595-slurm-2605-v20260903` |
| A3 Mega | Ubuntu 22.04 LTS | 580 / CUDA 13 | 25.05 | `a3-h100-ubuntu-2204-amd64-nvidia-580-slurm-2505-v20260805` (default) |
| A3 Mega | Ubuntu 22.04 LTS | 580 / CUDA 13 | 25.05 | `a3m-ubuntu-2204-amd64-nvidia-580-slurm-2505-v20260714` |
| A3 Mega | Ubuntu 22.04 LTS | 570 / CUDA 12 | 25.05 | `a3m-ubuntu-2204-amd64-nvidia-570-slurm-2505-v20251114` |
| A3 Mega | Ubuntu 22.04 LTS | 570 / CUDA 12 | 25.05 | `a3m-ubuntu-2204-amd64-nvidia-570-slurm-2505-v20250918` |
| TPU7x (Preview) or N2 | Ubuntu 24.04 LTS | N/A | 26.05 | `tpu-v7x-ubuntu2404-slurm2605-v20260902` (default for TPU7x) |
| TPU v6e (Preview), TPU v5p (Preview), or N2 | Ubuntu 22.04 LTS | N/A | 26.05 | `tpu-v6e-v5p-ubuntu2204-slurm2605-v20260902` (default for TPU v6e and TPU v5p) |

Included software: Slurm 25.05 or 26.05 with dependencies such as MariaDB; for GPU images NVIDIA enroot and pyxis, NVIDIA driver 595 or 580 with CUDA Toolkit 13, or 570 with CUDA Toolkit 12, GPUDirect RDMA libraries (`ibverbs-utils`, `rdma-core`); for TPU images Cloud TPU runtime libraries (`libtpu`); Open MPI and PMIx; Ops Agent and Cloud Storage FUSE. Compute nodes cannot use a newer Slurm than the controller (https://docs.cloud.google.com/cluster-director/docs/slurm-controller-versions).

### Managed compute OS images (Preview)

Default `-ce-` families in `clusterdirector-public-images` (Pre-GA terms apply, "as is", limited support).

| Machine series | OS | Accelerator drivers | Default family |
|---|---|---|---|
| A4X Max | Ubuntu 24.04 LTS (Arm64) | NVIDIA 580, CUDA 13 | `a4x-max-ubuntu-2404-arm64-nvidia-580-ce-v20260806` |
| A4X | Ubuntu 24.04 LTS (Arm64) | NVIDIA 580, CUDA 13 | `a4x-ubuntu-2404-arm64-nvidia-580-ce-v20260729` |
| A4, A3 Ultra, or N2 | Ubuntu 22.04 LTS | NVIDIA 580, CUDA 13 | `common-ubuntu-2204-amd64-ce-v20260729` |
| A3 Mega | Ubuntu 22.04 LTS | NVIDIA 580, CUDA 13 | `a3m-ubuntu-2204-amd64-nvidia-580-ce-v20260729` |
| TPU7x | Ubuntu 24.04 LTS | Cloud TPU runtime libraries | `tpu-v7x-ubuntu-2404-amd64-ce-v20260729` |
| TPU v6e or TPU v5p | Ubuntu 22.04 LTS | Cloud TPU runtime libraries | `tpu-v6e-ubuntu-2204-amd64-ce-v20260729` |

Includes `nfs-common` (Filestore), `lustre-client-modules` (Managed Lustre), Cloud Storage FUSE, the `ce-storage-refresh.timer` daemon (30-second dynamic storage mount updates) and the Ops Agent (with NVIDIA DCGM and NVML metrics on GPU VMs). Omitted: `slurmctld`, `slurmd`, `srun`, `sbatch`, `enroot` and any pre-installed MPI library; install Open MPI or MPICH per https://docs.cloud.google.com/cluster-director/docs/workloads/configure-mig#install-software.

### Image family lifecycle

New families are released about every six months.

| Phase | Duration | Meaning |
|---|---|---|
| Supported | 12 months after release | Critical security and bug fixes; recommended for new deployments. |
| Deprecated | About 6 months after supported | Still usable but no security patches; not recommended. |
| Obsolete | After deprecated | Cannot create new nodes with it; existing nodes keep running but may be incompatible with the controller. |
| Deleted | 3 months after obsolete | Image resource deleted; running nodes unaffected. |

## Notes

- Exact end-of-support dates: https://docs.cloud.google.com/cluster-director/docs/image-family-release-notes.
- If the organization has a trusted image policy (`constraints/compute.trustedImageProjects`), allow `clusterdirector-public-images` (see [quickstart.md](./quickstart.md)).
- Deleted images: running nodes are unaffected, but do not plan new deployments on deprecated or obsolete families.
- Compute Engine / Cluster Director images; CUDA programming is in `nvidia-cuda`; GPU/TPU nodes on GKE are in `gcp-gke`.
- Source: https://docs.cloud.google.com/cluster-director/docs/os-images (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [compute.md](./compute.md)
- [orchestration.md](./orchestration.md)
- [process-overview.md](./process-overview.md)
