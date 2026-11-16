---
source: https://docs.cloud.google.com/bare-metal/docs/bms-overview
---

# Bare Metal Solution overview

Bare Metal Solution provides a secure environment in which you can run specialized workloads on high-performance bare-metal servers. Use it to run third-party virtualization software and applications that require direct, low-level access to the server. Servers live in regional extensions connected to Google Cloud by a managed, high-performance, low-latency connection.

## Signature / Usage

The page has no commands. To list your Bare Metal Solution servers in a region of the project (command example from the gcloud help):

```bash
gcloud bms instances list --region=us-central1
```

## Options / Props

Shared responsibility.

| Area | Google Cloud | You |
|------|--------------|-----|
| Facilities, power, physical and network security, hardware monitoring | Provides and manages | — |
| Provisioning and maintenance of sole-tenancy servers with local SAN, smart hands support | Provides | — |
| Partner Interconnect into the environment, private API access, management tools, support, billing | Provides | — |
| Data (security, encryption, backups) | — | Yes |
| Software and applications (install, configure, upgrade, patch) | — | Yes |
| OS and any hypervisor (configuration changes, upgrades, patching) | Installs the initial OS or hypervisor | Yes, after delivery |
| Server clusters, databases (install, configure, migrate, administer, patch) | — | Yes |
| Licensing (BYOL for all software) | — | Yes |
| Application security, OS patching, network transport encryption if needed between Google Cloud and the environment | — | Yes |
| Application and OS logging and monitoring | — | Yes |
| Interactive serial console on your server | — | Configure it |
| Incident, change, IAM, backup and recovery, HA and DR design | — | Yes |
| Application support per your ISV agreements | — | Yes |

## Notes

- Bare metal compute instances in Compute Engine are a different product: see https://docs.cloud.google.com/compute/docs/instances/bare-metal-instances.
- Technical support focuses on infrastructure issues; OS, driver and compatibility issues are not supported, contact the OS vendor.
- You must apply the latest security patches and software updates yourself.
- SLA: https://cloud.google.com/bare-metal/sla
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bms/instances/list (gcloud 593.0.0 help; the source page has no code).
- Distance line: Oracle workloads here run on servers you manage; Oracle Exadata / Autonomous Database managed through Google Cloud (Oracle Database@Google Cloud, also in this skill) is a different product. Cloud SQL / AlloyDB are in `gcp-databases-relational`.
- Source: https://docs.cloud.google.com/bare-metal/docs/bms-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [bms-planning.md](./bms-planning.md)
- [bms-setup.md](./bms-setup.md)
- [bms-security.md](./bms-security.md)
