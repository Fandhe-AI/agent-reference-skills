# VM Commands

Commands for managing QEMU/KVM virtual machines via the `qm` CLI.

## List all VMs on current node

```sh
qm list
```

## Show VM status

```sh
qm status <vmid>
```

## Show VM configuration

```sh
qm config <vmid>
```

## Show configuration including pending changes

```sh
qm pending <vmid>
```

## Create a new VM

```sh
qm create <vmid> [OPTIONS]
```

Common options: `--name <name>`, `--memory <mb>`, `--cores <n>`, `--sockets <n>`, `--net0 virtio,bridge=vmbr0`, `--scsi0 <storage>:<size>`, `--cdrom <iso-path>`, `--ostype <type>`.

## Start a VM

```sh
qm start <vmid>
```

## Shutdown a VM gracefully (ACPI)

```sh
qm shutdown <vmid>
```

Optional: `--timeout <seconds>` to set max wait time.

## Stop a VM immediately

> **警告**: Force-stops the QEMU process without clean shutdown. May cause data loss or filesystem corruption inside the guest.

```sh
qm stop <vmid>
```

## Reboot a VM

```sh
qm reboot <vmid>
```

## Reset a VM (hard reset)

> **警告**: Equivalent to a physical reset button press. May cause data loss or filesystem corruption inside the guest.

```sh
qm reset <vmid>
```

## Suspend a VM

```sh
qm suspend <vmid>
```

## Resume a suspended VM

```sh
qm resume <vmid>
```

## Set VM options

```sh
qm set <vmid> [OPTIONS]
```

Example: `qm set <vmid> --memory 4096 --cores 4`

## Delete a VM

> **警告**: Removes the VM and all associated volumes permanently. This operation is irreversible.

```sh
qm destroy <vmid>
```

Optional: `--destroy-unreferenced-disks 1` to also remove unreferenced disk images.

## Clone a VM

```sh
qm clone <vmid> <newid> --name <new-name>
```

Optional: `--full 1` for full clone (default is linked clone), `--storage <storage>` to specify target storage.

## Convert VM to template

```sh
qm template <vmid>
```

## Migrate VM to another node

```sh
qm migrate <vmid> <target-node>
```

Optional: `--online 1` for live migration, `--with-local-disks 1` to migrate local disks.

## Migrate VM to a remote cluster (experimental)

```sh
qm remote-migrate <vmid> [<target-vmid>] <target-endpoint> \
  --target-bridge <bridge> \
  --target-storage <storage>
```

## Create a VM snapshot

```sh
qm snapshot <vmid> <snapname>
```

Optional: `--description <text>`, `--vmstate 1` to include RAM state.

## List VM snapshots

```sh
qm listsnapshot <vmid>
```

## Roll back to a snapshot

> **警告**: Reverts the VM to the snapshot state. All changes made after the snapshot are lost.

```sh
qm rollback <vmid> <snapname>
```

## Delete a snapshot

```sh
qm delsnapshot <vmid> <snapname>
```

## Resize a disk

```sh
qm disk resize <vmid> <disk> <size>
```

Example: `qm disk resize 100 scsi0 +10G` (adds 10 GiB to scsi0).

## Import a disk image

```sh
qm disk import <vmid> <source-image> <storage>
```

Optional: `--format <qcow2|raw|vmdk>`.

## Move a disk to different storage

```sh
qm disk move <vmid> <disk> <storage>
```

Optional: `--delete 1` to remove the source disk after move.

## Unlink (detach/delete) a disk

> **警告**: With `--purge 1`, the disk image is permanently deleted from storage.

```sh
qm disk unlink <vmid> --idlist <disk>[,<disk>]
```

## Rescan storage for disk changes

```sh
qm disk rescan
```

## Import a VM from OVF

```sh
qm importovf <vmid> <manifest.ovf> <storage>
```

## Import a VM from a foreign hypervisor format

```sh
qm import <vmid> <source> --storage <storage>
```

## Dump cloud-init configuration

```sh
qm cloudinit dump <vmid> <type>
```

`<type>` is one of: `user`, `network`, `meta`.

## Show pending cloud-init values

```sh
qm cloudinit pending <vmid>
```

## Regenerate cloud-init drive

```sh
qm cloudinit update <vmid>
```

## Execute a command in the guest via QEMU Guest Agent

```sh
qm guest exec <vmid> -- <command> [args...]
```

## Change a guest user password via QEMU Guest Agent

```sh
qm guest passwd <vmid> <username>
```

## Show the QEMU command-line invocation for a VM

```sh
qm showcmd <vmid>
```

## Open the QEMU Monitor for a VM

```sh
qm monitor <vmid>
```

## Send a keystroke to a VM

```sh
qm sendkey <vmid> <key>
```

## Restore a VM from vzdump backup

```sh
qmrestore <archive> <vmid>
```

Common options: `--storage <storage>`, `--force 1` (overwrite existing), `--start 1` (start after restore), `--unique 1` (randomize MAC addresses).

> **警告**: Using `--force 1` overwrites an existing VM with the same `<vmid>`.
