# Virtual Machines (QEMU/KVM)

Proxmox VE manages KVM virtual machines via the `qm` CLI and the web UI. Sensible defaults are applied automatically; key settings affect performance, portability, and storage behavior.

## Signature / Usage

```bash
# Create a VM
qm create <vmid> --name myvm --memory 2048 --cores 2 --net0 virtio,bridge=vmbr0

# Start / stop / status
qm start <vmid>
qm stop <vmid>
qm status <vmid>

# Convert VM to template
qm template <vmid>

# Live migrate to another node
qm migrate <vmid> <target-node> --online
```

## Options / Props

### CPU

| Option | Description |
|--------|-------------|
| `--sockets` | Number of CPU sockets |
| `--cores` | Cores per socket |
| `--cpu` | CPU model: `host` (max perf, no migration) or portable types like `x86-64-v2-AES` |
| `--cpulimit` | Max CPU bandwidth (1.0 = 100% of one core) |
| `--cpuunits` | Relative CPU priority among VMs |

### Memory

| Option | Description |
|--------|-------------|
| `--memory` | Maximum memory in MiB |
| `--balloon` | Minimum memory for dynamic allocation (0 = fixed) |

### Disk

| Option | Description |
|--------|-------------|
| `--scsi0` | SCSI disk (VirtIO SCSI controller recommended) |
| `--ide2` | CD-ROM / ISO attachment |
| `--scsihw` | Controller type: `virtio-scsi-pci`, `virtio-scsi-single` (with iothread) |
| `--discard` | Enable TRIM/discard pass-through (requires thin-provisioned storage) |

### Network

| Option | Description |
|--------|-------------|
| `--net0` | NIC config: `virtio,bridge=vmbr0` (VirtIO delivers ~3× E1000 throughput) |
| `--queues` | Multiqueue count — set to vCPU count for high packet-rate workloads |

### Firmware

| Option | Description |
|--------|-------------|
| `--bios` | `seabios` (default) or `ovmf` (UEFI; required for Windows 11) |
| `--efidisk0` | EFI disk (use `efitype=4m` for Secure Boot support; `ms-cert=2023k` marks enrolled Microsoft 2023 certificates) |

### Cloud-Init

| Option | Description |
|--------|-------------|
| `--cicustom` | Custom cloud-init snippet path |
| `--ciuser` | Default user to create |
| `--sshkeys` | SSH public keys to inject |
| `--ipconfig0` | Network config: `ip=dhcp` or `ip=x.x.x.x/24,gw=x.x.x.x` |

## Notes

- Use **VirtIO SCSI single** with `iothread=1` as the modern default disk controller for Linux VMs
- Setting `--cpu host` provides maximum performance but prevents live migration across different CPU families
- Dynamic memory (balloon) adds memory when host usage is below 80%; leave enabled unless debugging
- `qm migrate --online` requires shared storage or storage migration support
- Memory encryption (SEV) on AMD EPYC prevents snapshots and live migration
- Secure Boot Certificate Expiration: the Microsoft 2011 certificates used by Windows and common Linux distributions for Secure Boot expire in June 2026; replacement certificates were created in 2023.
  - The firmware only accepts bootloaders signed with certificates present on the EFI disk, so an EFI disk with only the 2011 certificates rejects bootloaders signed with the 2023 certificates only.
  - With `pve-edk2-firmware` >= `4.2025.05-1`, newly created EFI disks contain both and carry `ms-cert=2023k`.
  - For older EFI disks, enroll via the GUI: Hardware -> select EFI disk -> Disk Action > Enroll Updated Certificates.
  - Or via the `/nodes/{node}/qemu/{vmid}/config` API (takes effect at next VM start).
  - Or via `qm enroll-efi-keys <vmid>` (VM must be shut down).
  - Windows with BitLocker: first run `manage-bde -protectors -disable <drive>` in PowerShell for each BitLocker drive, otherwise the recovery key is requested on next boot.
  - `ms-cert=2023` / `2023w` markers may indicate partial enrollment.
- Virtio-fs shares a host directory with a VM without the network stack: create a directory mapping, then add `virtiofs0` (e.g. `qm set <vmid> -virtiofs0 dirid=<dirid>,cache=always,direct-io=1`); `virtiofsd` runs automatically on VM start (install with `apt install virtiofsd`). Linux guests mount with `mount -t virtiofs <dirid> <mount point>`. Known limitations: a crashing virtiofsd leaves the mount hanging until the VM is fully stopped; memory hotplug does not work with virtiofs; do not expose ACLs for Windows VMs (the device would not be visible)

## Related

- [storage.md](./storage.md)
- [ha.md](./ha.md)
- [backup-restore.md](./backup-restore.md)
