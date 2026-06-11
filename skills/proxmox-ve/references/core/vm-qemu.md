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
| `--efidisk0` | EFI disk (use `efitype=4m` for Secure Boot support) |

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

## Related

- [storage.md](./storage.md)
- [ha.md](./ha.md)
- [backup-restore.md](./backup-restore.md)
