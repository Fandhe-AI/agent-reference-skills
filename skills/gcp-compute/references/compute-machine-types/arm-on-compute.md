---
source: https://docs.cloud.google.com/compute/docs/instances/arm-on-compute
---

# Arm VMs on Compute Engine

Compute Engine offers Arm-powered machines in the N4A, C4A, A5X, A4X Max, and A4X machine series (plus the older Tau T2A). N4A and C4A are general-purpose Arm instances built on Google Axion; A5X, A4X Max, and A4X pair NVIDIA Arm CPUs with GPUs.

## Signature / Usage

The source has no code; the machine types it names (`a5x-highgpu-4g-metal`, `a4x-maxgpu-4g-metal`, `a4x-highgpu-4g`, `c4a-highmem-96-metal`, `c4a-standard-96-metal`) are in the table under Options / Props. To describe one machine type in a zone that offers it, use:

```bash
gcloud compute machine-types describe MACHINE-TYPE \
    --zone=us-central1-f
```

## Options / Props

| Series | Processor | vCPUs / memory | Notes |
|---|---|---|---|
| N4A | Google Axion, Arm Neoverse N3 | Up to 64 vCPUs, 512 GB DDR5 | `standard`, `highmem`, `highcpu`; custom machine types and extended memory; Titanium IPU; dynamic resource management; gVNIC up to 50 Gbps; NVMe with Hyperdisk Balanced, Hyperdisk Balanced High Availability, Hyperdisk Throughput |
| C4A | Google Axion, Arm Neoverse V2 (Armv9) | Up to 72 vCPUs, 576 GB DDR5 | `standard`, `highmem`, `highcpu`; Titanium; per VM Tier_1 networking up to 100 Gbps with gVNIC; NVMe and IDPF disk interfaces with Hyperdisk; each vCPU is a single core, no SMT |
| C4A bare metal | Same | 96 vCPUs | `c4a-highmem-96-metal` (768 GB), `c4a-standard-96-metal` (384 GB) |
| Tau T2A | Ampere Altra, 64 cores at 3.0 GHz all-core | Up to 48 physical cores, 4 GB per vCPU | Single NUMA node; NVMe storage and gVNIC only (Virtio-Net and SCSI not supported); no SMT |
| A5X | NVIDIA Vera Rubin superchips: two 88-core Vera Armv9.2 CPUs (176 cores) and four Rubin GPUs, 288 GB HBM4 per GPU (1,152 GB GPU memory) | 176 vCPUs, 1,440 GB | Machine type `a5x-highgpu-4g-metal` (bare metal only); 48,000 GiB Local SSD included |
| A4X Max | NVIDIA GB300 superchips, B300 GPUs with 279 GB per GPU | Up to 144 vCPUs, 960 GB | Machine type `a4x-maxgpu-4g-metal` (bare metal only); 12,000 GiB Local SSD included |
| A4X | NVIDIA GB200 superchips, B200 GPUs with 186 GB per GPU | Up to 140 vCPUs, 884 GB | Machine type `a4x-highgpu-4g`; 12,000 GiB Local SSD included |

- A5X / A4X Max / A4X: two sockets with NVIDIA Arm CPUs connected to four GPUs with NVLink-C2C; Hyperdisk supported; Compute Engine attaches Local SSD automatically at creation; public Arm-based OS images supported, and custom images can be built from them.
- N4A and C4A support public Arm-based OS images; custom images can be created from a public Arm-based image.

## Notes

- The Compute Engine SLA doesn't apply to the A5X, A4X Max, and A4X machine series.
- Use N4A / C4A for compute-intensive scale-out workloads, Arm price-performance, open source stacks, and development/testing of mobile or embedded systems on Arm. C4A suggestions in the source include ML data processing/inference, app/web/game serving, CI/CD on Arm, transcoding, ad serving, cache servers, Android and automotive software development.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/machine-types/describe (gcloud 593.0.0 help); the Arm page itself has no code. Replace `MACHINE-TYPE` with a machine type name from the table, and `us-central1-f` (the help example's zone, not a zone the Arm page names) with a zone that offers that machine type.
- Compute Engine GPUs / Arm machines only; GPUs and TPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- The source's C4A bare metal list says "96 GB vCPUs" for both types; read it as 96 vCPUs (the machine-families page gives 96 vCPUs).
- Source: https://docs.cloud.google.com/compute/docs/instances/arm-on-compute (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [machine-resource.md](./machine-resource.md)
- [compute-optimized-machines.md](./compute-optimized-machines.md)
- Create a VM with an Arm OS image: https://docs.cloud.google.com/compute/docs/instances/create-vm-from-public-image
- CPU platforms: https://docs.cloud.google.com/compute/docs/cpu-platforms
