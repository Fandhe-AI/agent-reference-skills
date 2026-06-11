# qm

QEMU/KVM Virtual Machine Manager. Manages the full lifecycle of VMs on a Proxmox VE node.

## Signature / Usage

```bash
qm <COMMAND> [OPTIONS]
qm help [<COMMAND>]
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `start <vmid>` | Start a virtual machine |
| `stop <vmid>` | Force stop a VM (unsafe) |
| `shutdown <vmid>` | Graceful shutdown via ACPI |
| `reboot <vmid>` | Reboot VM (applies pending changes) |
| `reset <vmid>` | Hardware reset |
| `suspend <vmid>` | Suspend VM to disk or memory |
| `resume <vmid>` | Resume a suspended VM |
| `create <vmid>` | Create or restore a VM |
| `destroy <vmid>` | Remove VM and its volumes |
| `set <vmid>` | Modify VM options |
| `config <vmid>` | Show VM config (with pending changes) |
| `pending <vmid>` | Show current and pending config values |
| `status <vmid>` | Show VM operational state |
| `list` | List VMs on this node |
| `clone <vmid> <newid>` | Clone a VM or template |
| `migrate <vmid> <target>` | Migrate VM to another node |
| `snapshot <vmid> <snapname>` | Create a snapshot |
| `delsnapshot <vmid> <snapname>` | Delete a snapshot |
| `listsnapshot <vmid>` | List snapshots |
| `rollback <vmid> <snapname>` | Restore VM to a snapshot |
| `disk import <vmid> <source> <storage>` | Import external disk image |
| `disk move <vmid> <disk>` | Move disk to different storage |
| `disk resize <vmid> <disk> <size>` | Resize a disk |
| `disk rescan` | Rescan storages and update disk sizes |
| `disk unlink <vmid>` | Remove disk image reference |
| `template <vmid>` | Convert VM to a template |
| `cloudinit dump <vmid> <type>` | Show generated cloud-init config |
| `cloudinit update <vmid>` | Regenerate cloud-init drive |
| `guest cmd <vmid> <command>` | Run QEMU Guest Agent command |
| `guest exec <vmid>` | Execute command via guest agent |
| `guest passwd <vmid> <username>` | Change guest user password |
| `import <vmid> <source>` | Import foreign VM (ESXi/OVF) |
| `importovf <vmid> <manifest>` | Create VM from OVF manifest |
| `monitor <vmid>` | Access QEMU Monitor interface |
| `showcmd <vmid>` | Show QEMU command line (debug) |
| `sendkey <vmid> <key>` | Send keyboard event to VM |
| `waitlock <vmid>` | Wait for VM config lock release |
| `vncproxy <vmid>` | Start VNC proxy |

## Options / Props

Key options for `qm create` / `qm set`:

| Name | Type | Description |
|------|------|-------------|
| `--name` | string | Display name for the VM |
| `--memory` | integer | RAM in MiB |
| `--cores` | integer | CPU cores per socket (default: 1) |
| `--sockets` | integer | Number of CPU sockets (default: 1) |
| `--cpulimit` | number | CPU usage limit (0 = unlimited) |
| `--cpu` | string | Emulated CPU type (e.g. `x86-64-v2-AES`) |
| `--bios` | enum | Firmware: `seabios` or `ovmf` |
| `--ostype` | enum | Guest OS type (e.g. `l26`, `win11`) |
| `--scsi[n]` | string | SCSI disk config (volume, size, cache) |
| `--ide[n]` | string | IDE disk / CDROM config |
| `--sata[n]` | string | SATA disk config |
| `--virtio[n]` | string | VirtIO disk config |
| `--net[n]` | string | Network interface (model, bridge, VLAN) |
| `--ipconfig[n]` | string | Cloud-init IP config for interface n |
| `--boot` | string | Boot order (e.g. `order=scsi0;net0`) |
| `--onboot` | boolean | Start VM on host boot |
| `--hotplug` | string | Hotplug features (cpu, memory, disk, usb) |
| `--balloon` | integer | Dynamic memory target in MiB (0 = off) |
| `--ciuser` | string | Cloud-init default user |
| `--cipassword` | string | Cloud-init password |
| `--sshkeys` | string | Cloud-init SSH public keys |
| `--storage` | string | Default storage for disk allocation |
| `--force` | boolean | Overwrite existing VM |
| `--skiplock` | boolean | Skip lock check (use with caution) |
| `--timeout` | integer | Timeout in seconds for operations |

## Notes

- `qm stop` is a hard power-off; prefer `qm shutdown` for graceful stops.
- Cloud-init options (`--ciuser`, `--sshkeys`, etc.) require a cloud-init drive (`--ide[n]` or `--scsi[n]` with `media=cdrom,format=raw`).
- `--skiplock` should only be used when the lock is stale; misuse can corrupt VM state.
- Snapshots require storage that supports them (e.g. qcow2, ZFS, Ceph).

## Related

- [pct.md](./pct.md)
- [vzdump.md](./vzdump.md)
- [pvesm.md](./pvesm.md)
