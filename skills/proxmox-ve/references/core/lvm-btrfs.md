# Host LVM & BTRFS Administration

Host-level administration of Logical Volume Manager (LVM, the installer default) and BTRFS (technology preview as root file system since Proxmox VE 7.0): volume groups, thin pools, extra LVs, BTRFS creation, mounting, subvolumes, snapshots, compression.

## Signature / Usage

```bash
# LVM: new volume group "vmdata" on an empty /dev/sdb (destroys all data on /dev/sdb)
sgdisk -N 1 /dev/sdb
pvcreate --metadatasize 250k -y -ff /dev/sdb1
vgcreate vmdata /dev/sdb1

# LVM-thin pool on top of a volume group
lvcreate -L 80G -T -n vmstore vmdata
```

Alternative (separate from the LVM example above): BTRFS on a different unused disk. Do not run it on a disk already used as LVM PV.

```bash
# BTRFS: create, mount, add to Proxmox VE (destroys all data on /dev/sdc)
mkfs.btrfs -m single -d single -L My-Storage /dev/sdc
mkdir /my-storage
mount /dev/sdc /my-storage
pvesm add btrfs my-storage --path /my-storage
```

## Options / Props

### Default LVM layout (installer)

The installer uses one disk as physical volume of VG `pve` with three LVs:

| LV | Description |
|----|-------------|
| `root` | Formatted `ext4`, contains the operating system |
| `swap` | Swap partition |
| `data` | LVM-thin pool for VM images (efficient snapshots and clones) |

### LVM tasks

| Task | Command |
|------|---------|
| Extra LV for `/var/lib/vz` | `lvcreate -n <Name> -V <Size[M,G,T]> <VG>/<LVThin_pool>`, e.g. `lvcreate -n vz -V 10G pve/data`, then `mkfs.ext4 /dev/pve/vz`, then `echo '/dev/pve/vz /var/lib/vz ext4 defaults 0 2' >> /etc/fstab` |
| Resize thin pool | `lvresize --size +<size[\M,G,T]> --poolmetadatasize +<size[\M,G]> <VG>/<LVThin_pool>` |

### BTRFS tasks

| Task | Command |
|------|---------|
| RAID1 file system | `mkfs.btrfs -m raid1 -d raid1 -L My-Storage /dev/sdb1 /dev/sdc1` (`-m` metadata / `-d` data profile; modes `single`, `raid0`, `raid1`, `raid10`; `-L` label) |
| Create subvolume | `btrfs subvolume create /some/path` |
| Delete subvolume | `btrfs subvolume delete /some/path` (need not be empty) |
| Read-only snapshot | `btrfs subvolume snapshot -r /some/path /a/new/path` (without `-r` both are writable) |
| List subvolumes | `btrfs subvolume list /` |
| Space usage | `btrfs fi usage /my-storage` |
| Compression | Append `compress=zstd`, `compress=lzo` or `compress=zlib` to the mount options |

`/etc/fstab` entries:

```
UUID=e2c0c3ff-2114-4f54-b767-3a203e49f6f3 /my-storage btrfs defaults 0 0
UUID=<uuid of your root file system> / btrfs defaults,compress=zstd 0 1
```

Installer storage configuration for a BTRFS root (`/etc/pve/storage.cfg`):

```
dir: local
        path /var/lib/vz
        content iso,vztmpl,backup
        disable

btrfs: local-btrfs
        path /var/lib/pve/local-btrfs
        content iso,vztmpl,backup,images,rootdir
```

## Notes

- LVM: a hardware RAID controller (with BBU) is highly recommended; LVM itself needs no special hardware and has low memory requirements. Up to Proxmox VE 4.1 `data` was a standard LV mounted at `/var/lib/vz`; from 4.2 it is an LVM-thin pool and `/var/lib/vz` is a directory on the root file system.
- The installer installs two bootloaders by default: the first partition has the standard GRUB, the second is an ESP (EFI boot and persistent firmware updates from user space).
- Before mounting a new LV on `/var/lib/vz`, make sure `/var/lib/vz` is empty (it is not on a default installation). When extending the data pool, the metadata pool must also be extended.
- BTRFS integration is a technology preview. RAID levels 5/6 are experimental and dangerous. Installer RAID choices: RAID0 (striping, no redundancy), RAID1 (mirroring, at least 2 equal disks), RAID10 (at least 4 disks). The installer also creates the subvolume `/var/lib/pve/local-btrfs` and disables the default `local` storage in favor of it.
- The official BTRFS example uses `/dev/sdb`; the snippet above uses `/dev/sdc` as a placeholder so it does not collide with the LVM example on `/dev/sdb`.
- Use the `UUID` printed by `mkfs.btrfs` (or `blkid`) in `/etc/fstab` instead of block-device paths, especially for multi-disk setups.
- BTRFS does not distinguish snapshots from normal subvolumes; Proxmox VE uses the read-only flag by convention for snapshots of guest disks or subvolumes (changeable later).
- BTRFS does not compress by default; data written before enabling `compress` stays uncompressed; the fstab change takes effect after reboot. `df` may output confusing values; prefer `btrfs filesystem usage`.

## Related

- [storage.md](./storage.md)
- [zfs.md](./zfs.md)
- [host-bootloader.md](./host-bootloader.md)
- Official docs: https://pve.proxmox.com/pve-docs/chapter-sysadmin.html#chapter_lvm , https://pve.proxmox.com/pve-docs/chapter-sysadmin.html#chapter_btrfs
