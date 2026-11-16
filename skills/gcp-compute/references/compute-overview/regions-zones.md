---
source: https://docs.cloud.google.com/compute/docs/regions-zones
---

# Regions and zones

Compute Engine resources are hosted in regions (independent geographic areas) made of zones (deployment areas within a region). Resource scope, quotas, maintenance behavior and zone choice all follow from this layout.

## Signature / Usage

### List the zones where a machine type is available

```bash
gcloud compute machine-types list --filter="name=c4d-standard-4"
```

### Zone naming

- Standard zone: `REGION-ZONE_LETTER`, for example `us-central1-a`.
- AI zone: the zone part has three pieces: the string `ai`, a number (deployment group) and a letter (shared software update schedule), for example `us-west4-ai2b`. That AI zone shares its deployment rollout wave with the standard `us-west4-b` zone.

## Options / Props

### Maintenance behavior

| Option | Behavior |
|--------|----------|
| Live migrate | Default for most VMs. Compute Engine migrates the running instance; guest performance is impacted to some degree but the instance stays online. |
| Stop and reboot | Compute Engine signals shutdown, waits a short time for a clean shutdown, then restarts the instance away from the maintenance event. Some machine series support only stop and reboot. |

Set it with "Set VM host maintenance policy" (https://docs.cloud.google.com/compute/docs/instances/setting-vm-host-options).

### Availability considerations

| Resource | Availability |
|----------|--------------|
| Local SSD and Titanium SSD | All regions and zones, for supported machine series and types. |
| GPUs and TPUs | Only in specific zones. |
| Sole-tenancy | Regions and zones where machine series with sole-tenant node types are available. |
| Confidential VM | Only certain machine series in specific zones. |
| Bare metal machine types | See "Regional availability of bare metal instances". |

### Quotas

Some resources (static IPs, images, firewall rules, VPC networks) have project-wide and per-region quota limits. Example from the source: with a global target pools quota of 50, 25 in each of two regions reaches the project-wide quota; with a per-region quota of 7 reserved IP addresses, at most 7 can be reserved in one region.

### Location selection tips

- Bulk instance creation API can choose the zone automatically.
- A regional MIG with a target distribution shape creates instances in zones where resources are available.
- In the console, select **Any** for the zone to let Google pick based on machine type and availability.
- Communication within a region is generally cheaper and faster than across regions.
- Duplicate important systems across zones and regions (example: `europe-west1-b` and `europe-west1-c`; consider backups in `europe-west3`).

## Notes

- Each zone offers various processors; an instance uses the zone's default processor unless you specify a minimum CPU platform (source example: `us-central1-a` defaults to Intel Haswell).
- AI zones provide high-capacity GPUs and TPUs for AI/ML workloads, with specific network latency requirements and shared fate with a parent zone; see the AI zones page.
- The source includes a long table of every region and zone (location, machine series, CPUs, Confidential VM/GPU options, CO2 emissions). It is omitted here; see the official page. One footnote from it: for `me-west1-b` and `me-west1-c` (`N1` series), an `N1` machine type requires at least one NVIDIA T4 GPU attached.
- GPU and TPU availability here is for Compute Engine; GPUs and TPUs on GKE nodes are in `gcp-gke`.
- Source: https://docs.cloud.google.com/compute/docs/regions-zones (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [global-regional-zonal-resources.md](./global-regional-zonal-resources.md)
- [resource-usage.md](./resource-usage.md)
- [overview.md](./overview.md)
