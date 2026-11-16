---
source: https://docs.cloud.google.com/compute/docs/overview
---

# Compute Engine overview

Compute Engine is an infrastructure as a service (IaaS) product offering self-managed virtual machine (VM) instances and bare metal instances. It provides VMs with a KVM hypervisor, Linux and Windows operating systems, and durable storage options, managed through the Google Cloud console, the Google Cloud CLI, a REST-based API, or Cloud Client Libraries.

## Signature / Usage

### Find where a machine type is available

Snippet taken from https://docs.cloud.google.com/compute/docs/regions-zones (the overview page itself has no code). The command lists all regions and zones where `c4d-standard-4` machine types can be used:

```bash
gcloud compute machine-types list --filter="name=c4d-standard-4"
```

## Options / Props

| Topic | Summary |
|-------|---------|
| Extensibility | Integrates with Cloud Storage, Google Kubernetes Engine and BigQuery. |
| Scalability | Add or remove instances as traffic changes, without managing your own infrastructure. |
| Reliability | Minimum uptime SLO is 99.5%; it varies with the regions, Network Service Tiers and deployment configuration you choose. See the Compute Engine SLA. |
| Cost | Several pricing options; you pay only for resources used, no up-front costs. |
| Machine families | General-purpose, compute-optimized, network-optimized, storage-optimized, memory-optimized and accelerator-optimized. Each family has machine series and predefined machine types; custom machine types are available for some series. |
| Operating systems | Preconfigured public Linux and Windows images. Most are free; some premium images are billed. Importing custom images is free, but you pay image storage while the custom image is kept in your project. |
| Block storage | Local SSD, Hyperdisk, Persistent Disk (see below). |

### Block storage options

| Option | Durability | Notes |
|--------|------------|-------|
| Local SSD | Not durable | Physical drives attached to the same server; best performance. Data is lost if you stop the instance. |
| Hyperdisk | Durable | Fastest durable storage; preserved when the instance stops; configurable performance; can be resized dynamically; Hyperdisk Storage Pools let you buy capacity and performance in advance. |
| Persistent Disk | Durable | For machine series that don't support Hyperdisk; preserved when the instance stops. |

## Notes

- Location selection criteria named by the source: region-specific restrictions, user latency by region, application latency requirements, amount of control over latency, and balance between low latency and simplicity.
- The source also points to CPU platforms, GPUs, networking overview and deployment-strategy pages as next steps; they are not reproduced here.
- Source inconsistency: this page says "If you stop the instance, the data on the Local SSD disks that are attached to the instance is lost.", while local-ssd.md (compute-disks) says "Compute Engine preserves the data on Local SSD disks only in certain scenarios", including "You reboot the guest operating system (OS).", live migration during host maintenance, and "You opt to preserve the Local SSD data when you stop or suspend the instance (Preview)." The loss on stop is the default; the preserve option is Preview.
- Source (Local SSD data persistence): https://docs.cloud.google.com/compute/docs/disks/local-ssd (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/compute/docs/regions-zones (snippet only)

## Related

- [instances.md](./instances.md)
- [regions-zones.md](./regions-zones.md)
- [provisioning-models.md](./provisioning-models.md)
