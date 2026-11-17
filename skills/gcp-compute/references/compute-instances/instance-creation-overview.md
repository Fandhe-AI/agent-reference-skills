---
source: https://docs.cloud.google.com/compute/docs/instances/instance-creation-overview
---

# Instance creation overview

Overview of the ways to create a Compute Engine instance and of the configuration parameters available at creation time. Instance, compute instance and VM instance are synonyms. A machine type whose name ends in `-metal` yields a bare metal instance (no hypervisor); any other machine type yields a VM instance. After creation, Compute Engine starts the instance automatically.

## Signature / Usage

### Prepare the gcloud CLI

```bash
gcloud init
```

If you installed the gcloud CLI previously, run `gcloud components update`. If you use an external identity provider (IdP), sign in to the gcloud CLI with your federated identity first. Then set a default region and zone. For REST samples, the credentials given to the gcloud CLI are used. The Google Cloud console needs no authentication setup.

### Ways to create an instance

- Manually specify a custom configuration (https://docs.cloud.google.com/compute/docs/instances/create-start-instance): use when you know the exact configuration, need a complicated configuration, or use the gcloud CLI or REST.
- Workload-optimized instance (https://docs.cloud.google.com/compute/docs/instances/create-workload-optimized-instance): you pick a workload type and a preset configuration is populated. Available only in the Google Cloud console.
- Instance template (https://docs.cloud.google.com/compute/docs/instances/create-vm-from-instance-template): use when many VMs share a defined configuration.
- Machine image copies (https://docs.cloud.google.com/compute/docs/machine-images/create-instance-from-machine-image): use to make multiple copies of an existing source instance.

## Options / Props

| Parameter | What you can configure |
|---|---|
| Machine configuration | Machine family, series and type (vCPUs, memory, CPU platform); predefined or (for some series) custom machine type; earliest CPU platform when the type is available on several; region and zone; instance name (unique within project and zone); simultaneous multi-threading (SMT); number of visible cores; for C4 instances only: all-core-max turbo mode |
| OS and storage | Boot disk (name, size, disk type) and OS image (public, custom, shared image, snapshot or existing disk); additional disks (blank, from image or disk, or existing); Local SSD (automatically attached for some machine types, optional for a few others; Local SSD recovery timeout; NVMe or SCSI interface); per-disk name and device name, size, encryption, IOPS and throughput (Hyperdisk and Extreme Persistent Disk only), Hyperdisk Storage Pool (Hyperdisk Balanced and Hyperdisk Throughput only), attachment mode (Read-only or Read-write), label or tag, and a setting that prevents the disk from being deleted with the instance; container (Linux or Windows Server public images, or Container-Optimized OS) |
| Data protection | Backup and DR Service backup plans (whole instance); snapshot schedules (disk data); cross-zone synchronous replication or cross-region asynchronous replication; option to apply snapshot schedules and replication only to non-boot disks (does not apply to backup plans); project-wide default backup setting preselected in the console |
| Networking | Firewall rules and network tags; custom hostname (you must configure the internal DNS record manually); IP forwarding; per VM Tier_1 networking performance (additional cost); network interfaces (default: one interface on the default auto mode VPC network; or a custom mode VPC network and subnet; additional interfaces and Dynamic NICs), with per-interface network interface type, IP stack type (IPv4 only, IPv6 only, dual-stack), internal and external IP type (ephemeral or reserved static), alias IP range, Network Service Tier, public DNS PTR record |
| Observability | Ops Agent (logs and metrics); virtual displays |
| Security | Service account and API access; Confidential Computing; Shielded VM features; VM access (IAM roles and permissions, SSH keys) |
| Advanced configuration | Tags and labels; deletion protection; placement policy; reservations (consume any reserved zonal capacity); startup script; custom metadata; encryption of disk data, memory contents and metadata when the instance is suspended (including behavior if a Cloud KMS key is revoked); provisioning model (standard, spot, flex-start (Preview), or reservation-bound); sole-tenancy (sole-tenant node or node group; for general-purpose N series machine types, optional CPU overcommit on sole-tenant nodes) |

## Notes

- The container startup agent (konlet) that deploys containers during VM creation is deprecated. Use `docker run` commands in a startup script or `cloud-init` to run containers on VMs and MIGs; see the official "Migrate containers that were deployed on VMs during VM creation" page (https://docs.cloud.google.com/compute/docs/containers/migrate-containers).
- Flex-start provisioning is labeled Preview in the source.
- The VM-side network settings are covered here; VPC networks and firewall policies themselves belong to `gcp-networking`, and Cloud Load Balancing to `gcp-load-balancing`.
- The source also shows Gemini-assisted design in the console (Compute Advisor); no gcloud or REST samples are on this page. The code block above is the only command in the source (authentication setup).
- Source: https://docs.cloud.google.com/compute/docs/instances/instance-creation-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-instance-templates.md](./create-instance-templates.md)
