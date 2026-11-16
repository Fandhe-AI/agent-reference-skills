---
source: https://docs.cloud.google.com/bare-metal/docs/bms-planning
---

# Plan for Bare Metal Solution

Key components to decide on before deploying Bare Metal Solution servers, networking and storage: regions, server sizes, firmware, OS images, hypervisors, storage, networking, and backup/DR. For SAP HANA see https://docs.cloud.google.com/sap/docs/sap-hana-planning-guide#bare-metal-machines-for-hana.

## Signature / Usage

### Identify firmware version

```bash
sudo dmidecode -s bios-version
```

### Rescan SCSI hosts (RHEL / Oracle Linux) after adding storage, e.g. for Oracle ASM

```bash
sudo rescan-scsi-bus.sh -a
```

### Configure MTU on Linux

Run on all server interfaces:

```bash
ip link set INTERFACE_NAME mtu 1500
```

Verify the current MTU settings:

```bash
ip link show | grep mtu
```

## Options / Props

### Regions

`asia-northeast1` (Tokyo), `asia-northeast3` (Seoul), `asia-southeast1` (Jurong West, Singapore), `europe-west2` (London), `europe-west3` (Frankfurt), `europe-west4` (Eemshaven), `northamerica-northeast1` (Montréal), `northamerica-northeast2` (Toronto), `southamerica-east1` (Osasco, São Paulo), `us-central1` (Council Bluffs, Iowa), `us-east4` (Ashburn, Virginia), `us-west2` (Los Angeles). For other regions contact Google Cloud Sales.

### Server configurations

Each server comes with 200 GB of network attached storage for the boot disk. CPU hyper-threading is disabled by default (ask your sales representative, or open a service request if already a customer).

| Server name | CPU cores | vCPUs | Sockets | Memory | CPU platform | Ethernet ports |
|---|---|---|---|---|---|---|
| `o2-standard-16-metal` (general-purpose) | 8 | 16 | 2 | 192 GB | Intel Xeon Gold, 5200 series, 3.8 GHz | 4 port 25GbE NIC |
| `o2-standard-32-metal` (general-purpose) | 16 | 32 | 2 | 384 GB | Intel Xeon Gold, 6200 series, 3.2 GHz | 4 port 25GbE NIC |
| `o2-standard-48-metal` (general-purpose) | 24 | 48 | 2 | 768 GB | Intel Xeon Gold, 6200 series, 3.0 GHz | 4 port 25GbE NIC |
| `o2-standard-112-metal` (general-purpose) | 56 | 112 | 2 | 1.5 TB | Intel Xeon Platinum, 8200 series, 2.2 GHz | 4 port 25GbE NIC |
| `o2-highmem-224-metal` (high-memory general-purpose) | 112 | 224 | 4 | 3 TB | Intel Xeon Platinum, 8200 series, 2.7 GHz | 4 port 25GbE NIC |
| `o2-ultramem-672-metal` (memory-optimized) | 336 | 672 | 12 | 18 TB | Intel Xeon Platinum, 8200 series, 2.7 GHz | 6 port 25GbE NIC |
| `o2-ultramem-896-metal` (memory-optimized) | 448 | 896 | 16 | 24 TB | Intel Xeon Platinum, 8200 series, 2.7 GHz | 8 port 25GbE NIC |

### Firmware

Latest recommended: `TS54`. Outdated firmware can cause delayed and limited support, loss of critical features, and security, compliance and performance issues.

| Firmware version | Machine types | Lifecycle | EOL / deprecation |
|---|---|---|---|
| BIOS_PUR043.45.00.002 (TS54) | all `o2-standard-*-metal`, `o2-highmem-224-metal` | GA | To be determined |
| BIOS_PUR043.37.14.021 (TS24.02) | same general-purpose set | End of Life | April 2024 |
| BIOS_PUR043.37.16.023 (TS24.05) | same general-purpose set | End of Life | April 2024 |
| 3.50.58 | `o2-ultramem-672-metal`, `o2-ultramem-896-metal` | GA | March 2024 |
| 3.80.24 | `o2-ultramem-672-metal`, `o2-ultramem-896-metal` | GA | To be determined |

TS54 features: interactive serial console support; RAS features (Adaptive Double Device Data Correction, Post Package Repair); better reliability at shutdown/startup; fixes for a UEFI security issue, initial RAM disk reboot issues, BMC IPMI client issues, and false fan/CPU-voltage alarms.

Upgrade: contact Customer Care (https://cloud.google.com/support-hub). 5 days notice is needed; the upgrade takes about 10 hours; three servers can be upgraded concurrently in a 10 hour window. OVM users need configuration changes after the TS54 upgrade (see known issue "OVM server can't connect to OVM Manager after TS54 firmware upgrade").

### Operating systems

OS minor versions in available images are bumped by the monthly patch process (e.g. `RHEL 8.9` becomes `RHEL 8.10`). For consistency across dev/staging/prod use an image marked `Minor version locked`, which is excluded from patch updates. You obtain OS licenses from the vendor (BYOL).

| OS version | Image code | Machine series | Lifecycle | EOL / deprecation |
|---|---|---|---|---|
| RHEL 7.7 for SAP | `LAMBRHEL77SAP` | ultramem | End of Life | August 2023 |
| RHEL 7.9 | `RHEL7x` | general-purpose | GA | June 2024 |
| RHEL 8.4 (Minor version locked) | `RHEL84` | general-purpose | End of Life | May 2023 |
| RHEL 8 (Latest minor release) | `RHEL8x` | general-purpose | GA | May 2029 |
| RHEL 8.0 for SAP | `RHEL80SAP` | general-purpose | End of Life | December 2020 |
| RHEL 8.1 for SAP | `RHEL81SAP` | general-purpose | End of Life | November 2023 |
| RHEL 9.4 (Minor version locked) | `RHEL94` | general-purpose | End of Life | May 2023 |
| RHEL 9 (Latest minor release) | `RHEL9x` | general-purpose | GA | May 2032 |
| OEL 7.9 | `OEL7x` | general-purpose | GA | July 2024 |
| OEL 8 (Latest minor release) | `OEL8x` | general-purpose | GA | July 2029 |
| OEL 8.8 (Minor version locked) | `OEL88` | general-purpose | GA | July 2029 |
| OEL 9 | `OEL9x` | general-purpose | GA | June 2032 |
| SLES 15 SP1 | `SLES15SPx` | general-purpose | End of Life | January 2024 |
| SLES 12 SP4 for SAP | `SLES12SP4SAP` | general-purpose + `o2-ultramem-896-metal` | End of Life | June 2023 |
| SLES 12 SP5 for SAP | `SLES12SP5SAP` | general-purpose + `o2-ultramem-896-metal` | End of Support | October 2027 |
| SLES 15 for SAP | `SLES15SAP` | general-purpose | End of Life | December 2022 |
| SLES 15 SP1 for SAP | `SLES15SPxSAP` | general-purpose + `o2-ultramem-896-metal` | End of Support | January 2024 |
| SLES 15 SP2 for SAP | `LAMBSLES15SP2SAP` | ultramem (672, 896) | GA | December 2024 |

General-purpose = `o2-standard-16/32/48/112-metal` and `o2-highmem-224-metal`; ultramem = `o2-ultramem-672-metal` and `o2-ultramem-896-metal`.

### Bring Your Own Image (BYOI)

Only RHEL, Oracle Linux and SLES are certified; others are untested. Remove PII from the image, then open a support case with a secure download link. Image specifications:

- Supports UEFI boot; contains an EFI partition and GPT partition type.
- Size equal to or smaller than 200 GiB; disk format `raw`.
- Multipath package installed and multipath daemon enabled at boot; `initramfs` contains the multipath module.
- LVM filter in `/etc/lvm/lvm.conf` scans only multipath device nodes, not `/dev/sd*`.
- `fstab` mounts by UUID or label, not device files.
- GRUB sends console output to serial port `ttyS0` at baud rate `115200` and to `tty0`.

### Hypervisors

Oracle VM 3.4.6 can be requested (you then install guest OSes yourself). For Oracle Linux Virtualization Manager (KVM-based) request a compatible Linux OS such as Oracle Linux 7. Hypervisor licensing is BYOL.

### Storage

| Item | Limit / value |
|---|---|
| Fibre Channel block (LUNs) | 1 TiB increments; max 16 TiB for regular SSD and HDD, max 8 TiB for Performance SSD |
| NFS | min 100 GiB, max 16 TiB |
| LUNs per server (including boot LUN) | 200 |
| Volume size after provisioning | Fixed; cannot expand; type and performance tier cannot change |
| Snapshot reserve | 20% of the volume (80% usable) |
| Boot volume snapshot | Daily at 12:10 AM in the server's region, retained 7 days, schedule not modifiable |
| Removing a storage volume | Server reboots; outage 20 minutes to an hour |

Storage types: single-server FC LUNs, multipath LUNs shared across servers (e.g. Oracle RAC), and NFS. SSD and HDD both support snapshots. HDD is not recommended for mission-critical Oracle production (no performance guidance).

Performance, Standard SSD (FC and NFS, 8 KiB blocks): `Calculated IOPS = 7200 * Volume Size in TiB`; `Maximum Throughput (MiBps) = Calculated IOPS * 8 / 1024`.

| Volume size | IOPS | Throughput (MiBps) | Latency |
|---|---|---|---|
| 200 GiB | 1400 | 10.9 | < 1 ms |
| 1 TiB | 7200 | 56 | < 1 ms |
| 4 TiB | 28800 | 225 | < 1 ms |
| 8 TiB | 57600 | 450 | < 1 ms |
| 12 TiB | 86400 | 675 | < 1 ms |
| 16 TiB | 115200 | 900 | < 1 ms |

Performance SSD (FC only, 32 KiB blocks, max 8 TiB): `Calculated IOPS = 8192 * Volume Size in TiB`; `Maximum Throughput (MiBps) = Calculated IOPS * 32 / 1024`.

| Volume size | IOPS | Throughput (MiBps) | Latency |
|---|---|---|---|
| 1 TiB | 8192 | 256 | < 1 ms |
| 2 TiB | 16384 | 512 | < 1 ms |
| 4 TiB | 32768 | 1024 | < 1 ms |
| 8 TiB | 65536 | 2048 | < 1 ms |

### Networking

| Item | Value |
|---|---|
| Standard config | 4 physical 25 Gbps interfaces per server bundled in 2 bonds: `bond0` = client network (to Google Cloud), `bond1` = private network |
| Advanced: networks per bonded interface / per server | up to 10 / 20 (request quota from Customer Care first) |
| Connection | Partner Interconnect VLAN attachment pairs; Cloud Router created before the pair |
| Recommended MTU | 1500 on every segment; jumbo frames not supported on VLAN attachments |
| Reserved IPs per requested subnet | 5 (network address, broadcast, last three usable addresses) |
| Minimum subnet | /27 (/29 to /32 lack enough addresses) |
| Unsupported addresses | Class E (240.0.0.0 to 255.255.255.254); avoid 10.128.0.0/9 when connecting to an auto mode VPC network |
| VLANs | at least 2 per Partner Interconnect |

Active-Standby: set a higher base route priority on the secondary BGP session. Active-Active is the default (base route priority 100 on all BGP sessions); do not carry more traffic than a single VLAN attachment's bandwidth, or a maintenance event on one attachment causes congestion and packet loss. Order information to supply: project ID, client and private IP ranges, number of VLANs, bandwidth in 1 Gbps increments.

## Notes

- Reimaging a server (used to apply a multi-VLAN network configuration) can take several hours and erases the boot LUN. It is destructive: try it on a disposable server first.
- Snapshot reserve fill behavior: the volume grows 20% when the reserve fills; at 100% reserve, snapshots spill into the data area; if both are full the volume goes offline and writes are suspended. Choose the full-reserve action at order time: delete oldest snapshot first (recommended), delete newest first, or take the volume offline. Deleting snapshots and restoring a boot snapshot go through Customer Care.
- Do not take snapshots of volumes holding Oracle database files; use RMAN or a solution such as Actifio.
- Cloud Router recommendations: advertise a default route (0.0.0.0/0) in custom advertisement mode, applied at the BGP session level so it affects only Bare Metal Solution; use a VPC with global dynamic routing for cross-region access. You cannot use the environment as a transit path between VPC networks.
- Advanced networking may show incorrect network status in the console and in `gcloud bms networks`.
- VPC firewalls do not apply to traffic that transits Google Cloud between Bare Metal Solution and other environments; create VPC firewall rules that allow incoming connections from the Bare Metal Solution environment. East-west control inside the environment: ask sales.
- Optional NATVM / JumpVM Compute Engine VMs provide internet access and remote access; regional instance groups with internal passthrough load balancers give redundancy.
- Distance line: VPC networks, firewall policies and Cloud Load Balancing themselves are in the planned `gcp-networking`; VM-side settings are in this skill.
- The page also shows diagrams (omitted).
- Source: https://docs.cloud.google.com/bare-metal/docs/bms-planning (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [bms-setup.md](./bms-setup.md)
- [bms-security.md](./bms-security.md)
- [bms-overview.md](./bms-overview.md)
