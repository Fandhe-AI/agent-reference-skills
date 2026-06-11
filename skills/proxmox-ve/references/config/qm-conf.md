# qm.conf — VM Configuration File

Configuration file for QEMU/KVM virtual machines managed by Proxmox VE.

**Path:** `/etc/pve/qemu-server/<VMID>.conf`

## Signature / Usage

```
OPTION: value
```

Each line is a colon-separated key-value pair. Blank lines and lines starting with `#` are treated as comments. Snapshot sections are appended at the end of the file with a `[<snapshot-name>]` header.

```ini
# Example VM config
name: myvm
memory: 2048
cores: 2
sockets: 1
ostype: l26
bios: seabios
boot: order=scsi0;ide2;net0
scsi0: local-lvm:vm-100-disk-0,size=32G
ide2: none,media=cdrom
net0: virtio,bridge=vmbr0,firewall=1
onboot: 1
```

## Options / Props

### System & CPU

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | — | VM name displayed in the web interface |
| `ostype` | enum | other | Guest OS type: `l24`, `l26`, `win10`, `win11`, `w2k8`, `wvista`, `wxp`, `other`, etc. |
| `bios` | `ovmf\|seabios` | seabios | BIOS implementation; use `ovmf` for UEFI |
| `machine` | string | — | QEMU machine type (e.g., `q35`, `pc`); can include `viommu=intel\|virtio` |
| `arch` | `x86_64\|aarch64` | host | Virtual processor architecture |
| `cores` | integer (1-N) | 1 | CPU cores per socket |
| `sockets` | integer (1-N) | 1 | Number of CPU sockets |
| `vcpus` | integer | — | Number of hotplugged vCPUs (subset of total cores×sockets) |
| `cpu` | complex | `cputype=kvm64` | Emulated CPU type and flags; e.g., `cputype=host,flags=+aes` |
| `cpulimit` | float (0–128) | 0 | Hard CPU usage cap in CPU units; 0 = unlimited |
| `cpuunits` | integer (1–262144) | 1024 | Relative CPU weight for fair scheduling |
| `kvm` | boolean | 1 | Enable KVM hardware virtualisation |
| `numa` | boolean | 0 | Enable NUMA topology |
| `numa[n]` | complex | — | NUMA node definition: `cpus=<id[-id]>,hostnodes=<...>,memory=<MiB>,policy=<preferred\|bind\|interleave>` |
| `hugepages` | `2\|1024\|any` | — | Enable hugepages memory backing |
| `keephugepages` | boolean | 0 | Retain hugepages allocation after VM shutdown |

### Memory

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `memory` | integer (MiB) | 512 | Maximum RAM; also accepts `current=<MiB>` form |
| `balloon` | integer | — | Target RAM for balloon driver in MiB; enables memory ballooning |
| `shares` | integer (0–50000) | 1000 | Memory share weight for auto-ballooning across VMs |

### Boot

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `boot` | complex | `cdn` | Boot order; preferred form: `order=scsi0;ide2;net0` |
| `onboot` | boolean | 0 | Start VM automatically at node boot |
| `startup` | complex | — | Startup/shutdown ordering: `order=<n>,up=<sec>,down=<sec>` |
| `startdate` | string | now | Initial RTC date: `now`, `YYYY-MM-DD`, or `YYYY-MM-DDTHH:MM:SS` |
| `freeze` | boolean | — | Freeze CPU at start (use `c` in QEMU monitor to continue) |

### Storage Devices

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ide[n]` | complex | media=disk | IDE hard disk or CD-ROM (n: 0–3) |
| `sata[n]` | complex | media=disk | SATA hard disk or CD-ROM (n: 0–5) |
| `scsi[n]` | complex | media=disk | SCSI hard disk or CD-ROM (n: 0–30); supports `iothread`, `ro`, `ssd`, `discard` |
| `virtio[n]` | complex | — | VirtIO paravirtualised block device (n: 0–15) |
| `scsihw` | enum | lsi | SCSI controller model: `lsi`, `lsi53c810`, `virtio-scsi-pci`, `virtio-scsi-single`, `megasas`, `pvscsi` |
| `efidisk0` | complex | efitype=2m | EFI variables disk; `efitype=2m\|4m`, `pre-enrolled-keys=1\|0` |
| `tpmstate0` | complex | version=v1.2 | TPM 2.0 state disk; `version=v1.2\|v2.0` |
| `cdrom` | volume | — | Alias for `ide2`; specify ISO image or `none,media=cdrom` |
| `unused[n]` | volume | — | References to detached/unused volumes; managed internally |
| `vmstatestorage` | string | — | Storage ID for VM state (suspend/resume) |

Disk sub-options (common across `ide`, `sata`, `scsi`, `virtio`):

| Sub-option | Values | Description |
|------------|--------|-------------|
| `cache` | `none\|directsync\|writeback\|writethrough\|unsafe` | Disk cache mode |
| `aio` | `io_uring\|native\|threads` | Async I/O backend |
| `discard` | `ignore\|on` | Pass discard/trim hints to storage |
| `backup` | `0\|1` | Include in vzdump backups |
| `snapshot` | `0\|1` | Enable copy-on-write snapshot |
| `ssd` | `0\|1` | Advertise SSD to guest |

### Network

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `net[n]` | complex | — | Network device (n: 0–31); model, bridge, MAC, VLAN, rate, firewall |

`net[n]` format: `model=virtio,bridge=vmbr0,macaddr=BC:24:11:xx:xx:xx,firewall=1,tag=<1-4094>,rate=<Mbps>,queues=<n>,mtu=<int>`

Common models: `virtio`, `e1000`, `e1000e`, `rtl8139`, `vmxnet3`.

### Display & Console

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `vga` | complex | — | Graphics adapter: `std`, `cirrus`, `vmware`, `qxl`, `virtio`, `none`; supports `memory=<MiB>` |
| `tablet` | boolean | 1 | Enable USB tablet (absolute pointer; needed for correct mouse in VNC/Spice) |
| `serial[n]` | string | — | Serial device: `/dev/ttyS0` or `socket` (n: 0–3) |
| `parallel[n]` | string | — | Parallel device passthrough: `/dev/parport0` (n: 0–2) |
| `audio0` | complex | — | Audio device; `device=intel-hda,driver=spice` |
| `keyboard` | enum | — | VNC keyboard layout (e.g., `en-us`, `de`, `fr`) |
| `spice_enhancements` | complex | — | `foldersharing=1,videostreaming=all\|filter\|off` |

### PCI / USB Passthrough

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `hostpci[n]` | complex | driver=vfio | PCI passthrough: `host=<BDF>[;BDF2],pcie=1,x-vga=1,rombar=1,mdev=<type>` |
| `usb[n]` | complex | — | USB passthrough: `host=<vendorid>:<productid>\|spice,usb3=1` |
| `ivshmem` | complex | — | Inter-VM shared memory: `size=<MiB>,name=<string>` |
| `rng0` | complex | source=/dev/urandom | VirtIO RNG: `source=/dev/urandom\|/dev/random\|/dev/hwrng,max_bytes=<n>,period=<ms>` |

### Cloud-Init

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `citype` | enum | (OS-dependent) | Cloud-init format: `nocloud`, `configdrive2`, `opennebula` |
| `ciuser` | string | — | Override cloud-init default user name |
| `cipassword` | string | — | Cloud-init user password (stored hashed) |
| `ciupgrade` | boolean | 1 | Run package upgrade on first boot |
| `sshkeys` | string | — | URL-encoded public SSH key(s) for cloud-init user |
| `ipconfig[n]` | complex | — | Per-NIC IP config: `ip=dhcp\|<CIDR>,gw=<IPv4>,ip6=auto\|dhcp\|<CIDR>,gw6=<IPv6>` |
| `nameserver` | string | — | Cloud-init DNS server IP |
| `searchdomain` | string | — | Cloud-init DNS search domain |
| `cicustom` | complex | — | Override cloud-init data volumes: `user=<vol>,network=<vol>,meta=<vol>,vendor=<vol>` |

### SMBIOS / Identity

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `smbios1` | complex | — | SMBIOS type 1 data: `manufacturer=<str>,product=<str>,serial=<str>,uuid=<UUID>` |
| `vmgenid` | UUID | auto | VM Generation ID; changes on clone/restore to signal guest |
| `hookscript` | string | — | Script path (`<storage>:snippets/<file>`) run at VM lifecycle events |

### Lifecycle & Protection

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `protection` | boolean | 0 | Prevent accidental VM deletion or disk modification |
| `template` | boolean | 0 | Mark VM as a template (disables start) |
| `lock` | enum | — | Internal lock state: `backup`, `clone`, `migrate`, `snapshot`, etc. |
| `reboot` | boolean | 1 | Allow guest-initiated reboot |
| `watchdog` | complex | — | Watchdog device: `model=i6300esb\|ib700,action=reset\|shutdown\|poweroff\|pause\|debug\|none` |
| `acpi` | boolean | 1 | Enable ACPI support |
| `localtime` | boolean | — | Set guest RTC to local time (recommended for Windows) |
| `tdf` | boolean | 0 | Time drift fix for Windows guests |
| `hotplug` | string | `network,disk,usb` | Comma-separated list of hotpluggable features |
| `migrate_downtime` | float (s) | 0.1 | Maximum tolerated downtime during live migration |
| `migrate_speed` | integer (MB/s) | 0 | Migration bandwidth cap; 0 = unlimited |

### QEMU Guest Agent

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `agent` | complex | enabled=0 | Enable QEMU Guest Agent: `enabled=1,type=virtio\|isa,fstrim_cloned_disks=1,freeze-fs=1` |

### Metadata

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `description` | string | — | Free-text VM description shown in the web UI |
| `tags` | string | — | Semicolon-separated metadata tags |

## Notes

- VM IDs below 100 are reserved for internal Proxmox use.
- Options `hostpci[n]` and `pcie=1` generally prevent live migration unless the host supports SR-IOV or mdev.
- For UEFI boot, set `bios: ovmf` and add an `efidisk0`.
- Snapshot state is appended inline; do not edit the `[<snapshot>]` sections manually.
- Changes to most options require a VM restart; some (network, disk) support hotplug.
- Use `qm set <vmid> --<option> <value>` rather than editing the file directly while the VM is running.

## Related

- [pct-conf.md](./pct-conf.md) — LXC container configuration file format
- [datacenter-cfg.md](./datacenter-cfg.md) — Datacenter-wide configuration
