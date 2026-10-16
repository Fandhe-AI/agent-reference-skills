# ZFS on Linux

ZFS (combined file system and volume manager) is available as an optional file system and as a root file system choice in the Proxmox VE installer. All packages are included; no manual module build is needed. Main commands are `zpool` and `zfs` (see `man zpool`, `man zfs`).

## Signature / Usage

```bash
# Create a pool (ashift should match the disk sector size 2^ashift or larger)
zpool create -f -o ashift=12 <pool> mirror <device1> <device2>
zfs set compression=lz4 <pool>

# Pool status and file systems
zpool status
zfs list

# Replace a failed device
zpool replace -f <pool> <old-device> <new-device>
```

## Options / Props

### Installer RAID types for root on ZFS

| Type | Description |
|------|-------------|
| RAID0 | Striping; capacity is the sum of all disks; no redundancy |
| RAID1 | Mirroring; at least 2 disks of equal size; capacity of a single disk |
| RAID10 | RAID0 + RAID1; at least 4 disks |
| RAIDZ-1 | Single parity; at least 3 disks |
| RAIDZ-2 | Double parity; at least 4 disks |
| RAIDZ-3 | Triple parity; at least 5 disks |

The installer creates pool `rpool`, root on `rpool/ROOT/pve-1`, `rpool/data` for VM images, and this entry in `/etc/pve/storage.cfg`:

```
zfspool: local-zfs
        pool rpool/data
        sparse
        content images,rootdir
```

### Pool creation layouts

| Layout | Minimum disks | Command |
|--------|---------------|---------|
| RAID-0 | 1 | `zpool create -f -o ashift=12 <pool> <device1> <device2>` |
| RAID-1 | 2 | `zpool create -f -o ashift=12 <pool> mirror <device1> <device2>` |
| RAID-10 | 4 | `zpool create -f -o ashift=12 <pool> mirror <device1> <device2> mirror <device3> <device4>` |
| RAIDZ-1 | 3 | `zpool create -f -o ashift=12 <pool> raidz1 <device1> <device2> <device3>` |
| RAIDZ-2 | 4 | `zpool create -f -o ashift=12 <pool> raidz2 <device1> <device2> <device3> <device4>` |
| Extend RAIDZ-N | - | `zpool attach <pool> <raidzN-M> <device>` (Proxmox VE 9 / ZFS 2.3.3 and later) |
| Cache (L2ARC) | - | `zpool create -f -o ashift=12 <pool> <device> cache <cache-device>` |
| Log (ZIL) | - | `zpool create -f -o ashift=12 <pool> <device> log <log-device>` |
| Add log + cache | - | `zpool add -f <pool> log <device-part1> cache <device-part2>` |
| Special device | - | `zpool create -f -o ashift=12 <pool> mirror <device1> <device2> special mirror <device3> <device4>`; existing pool: `zpool add <pool> special mirror <device1> <device2>` |

### dRAID

| Type | Minimum disks | Tolerated failures |
|------|---------------|--------------------|
| `dRAID1` or `dRAID` | 2 | 1 |
| `dRAID2` | 3 | 2 |
| `dRAID3` | 4 | 3 |

`spares` (default 0) is the number of disks kept ready; without spares rebuilding gets no speed benefit. `data` (default 8) is the number of devices in a redundancy group (the lower number is used if `disks - parity - spares` is less than 8); fewer data devices give higher IOPS, better compression ratios and faster resilvering but less capacity.

### Replace a failed bootable device

```bash
sgdisk <healthy bootable device> -R <new device>
sgdisk -G <new device>
zpool replace -f <pool> <old zfs partition> <new zfs partition>
# with proxmox-boot-tool:
proxmox-boot-tool format <new disk's ESP>
proxmox-boot-tool init <new disk's ESP> [grub]
# with plain GRUB:
grub-install <new disk>
```

### ARC memory limit

```bash
# for the current boot only
echo "$[10 * 1024*1024*1024]" >/sys/module/zfs/parameters/zfs_arc_max
```

Permanent, in `/etc/modprobe.d/zfs.conf` (8 GiB example):

```
options zfs zfs_arc_max=8589934592
```

If the value is at most `zfs_arc_min` (default 1/32 of system memory), also set `zfs_arc_min` to at most `zfs_arc_max - 1`:

```bash
echo "$[8 * 1024*1024*1024 - 1]" >/sys/module/zfs/parameters/zfs_arc_min
echo "$[8 * 1024*1024*1024]" >/sys/module/zfs/parameters/zfs_arc_max
```

### Swap, encryption, compression, special blocks, features

```bash
# swappiness (persist in /etc/sysctl.d/99-swappiness.conf as: vm.swappiness = 10)
sysctl -w vm.swappiness=10

# encrypted dataset as Proxmox VE storage
zfs create -o encryption=on -o keyformat=passphrase tank/encrypted_data
pvesm add zfspool encrypted_zfs -pool tank/encrypted_data
zfs mount -l tank/encrypted_data
zfs change-key -o keyformat=raw -o keylocation=file:///path/to/keyfile tank/encrypted_data

# compression
zfs set compression=<algorithm> <dataset>
zfs set compression=off <dataset>

# special device small blocks
zfs set special_small_blocks=4K <pool>
zfs set special_small_blocks=0 <pool>/<filesystem>

# enable new pool features
zpool upgrade <pool>
```

| `vm.swappiness` | Strategy |
|-----------------|----------|
| 0 | Swap only to avoid an out of memory condition |
| 1 | Minimum swapping without disabling it entirely |
| 10 | Sometimes recommended for performance when sufficient memory exists |
| 60 | Default |
| 100 | Swap aggressively |

## Notes

- Hardware: at least 8 GB RAM to start (more is better); ECC RAM recommended; enterprise class SSDs for cache / log devices. Do not use ZFS on a hardware RAID controller with its own cache management; use an HBA or an LSI controller flashed in IT mode. In nested virtualization do not use `virtio` disks for ZFS (use IDE or SCSI, also virtio SCSI controller).
- Pool names: begin with a letter, only alphanumeric, `-`, `_`, `.`, `:` or space; must not begin with `mirror`, `raidz`, `draid` or `spare`; must not be `log`.
- Performance: all vdevs are striped (RAID0). A mirror vdev writes like a single disk and reads scale linearly with disks; 2 mirror vdevs (RAID10) write like two disks and read like four. RAIDZ behaves like a single disk for IOPS with high bandwidth; dRAID matches an equivalent RAIDZ. For running VMs IOPS is usually more important; prefer mirror vdevs unless RAIDZ characteristics are acceptable.
- RAIDZ space: usable space of a RAIDZ vdev of N disks is roughly N-P (P = RAIDZ level). ZVOLs (VM disks) need parity per block at least `ashift` block size: ashift 12 (4k) with default ZVOL 8k blocks in RAIDZ2 writes 8k + 4k + 4k = 16k. Check with `zfs get volsize,refreservation,used <pool>/vm-<vmid>-disk-X`. Counter-measures: increase `volblocksize` (only settable at ZVOL creation; default changeable in storage config), use mirror vdevs, or `ashift=9` (can hurt performance and cannot be changed later).
- dRAID is intended for more than 10-15 disks; RAIDZ is usually better for fewer. The GUI requires one more disk than the minimum (dRAID1 needs 3) because it expects a spare.
- Cache devices accumulate (no mirror/raid modes); read errors on a cache device are transparently diverted to the storage. A log device is for synchronous transactions (databases, `fsync`); use fast SSDs with power-loss protection, a few GB (more than half of installed memory gives no advantage); if all log devices fail the main pool is used again.
- Use `zpool status -v` to monitor resilvering. The ESP is partition #2 on bootable disks since installer 5.4. Pass `grub` to `proxmox-boot-tool init` if `proxmox-boot-tool status` shows GRUB, especially with Secure Boot. Plain GRUB is only used on systems installed with 6.3 or earlier that were not migrated to `proxmox-boot-tool`.
- ZED sends e-mail on ZFS events; set `ZED_EMAIL_ADDR="root"` (default) in `/etc/zfs/zed.d/zed.rc`; mails to root are forwarded to the root user's address.
- ARC defaults to 10% of host memory clamped to 16 GiB, written to `/etc/modprobe.d/zfs.conf` at installation (since Proxmox VE 8.1; before it matched ZFS' default: 62.5% from ZFS 2.3.0, 50% older). Rule of thumb: at least 2 GiB base + 1 GiB per TiB storage; minimum 64 MiB. With ZFS root run `update-initramfs -u -k all` after changing and reboot.
- Swap on a zvol can block the server or cause high IO load (often when starting a backup to external storage); prefer enough memory or a swap partition on a physical disk.
- Native ZFS encryption in Proxmox VE is experimental (replication with encrypted datasets and checksum errors with snapshots or ZVOLs are known problems). No GRUB boot from pools with encrypted datasets; unlock manually after boot or use a custom unit calling `zfs load-key`. Back up and test before enabling encryption; lost keys mean lost data. Encryption is set at dataset / zvol creation and inherited; enable the feature per pool with `zpool set feature@encryption=enabled <pool>` (check with `zpool get feature@encryption <pool>`). Enabling the feature only makes encryption available on the pool; it does not encrypt existing datasets, because encryption is set when a dataset or zvol is created.
- The official example (`# zpool set feature@encryption=enabled`) omits the pool name, which `zpool set` requires (the surrounding example uses `tank`).
- Compression applies to new blocks only; `lz4` is recommended (others: `lzjb`, `gzip-N` with N 1-9).
- A special device stores metadata, dedup tables and optionally small file blocks; its redundancy should match the pool (it is a point of failure) and adding one cannot be undone. `special_small_blocks` is `0` or a power of two from 512B to 1M; if greater than or equal to the dataset `recordsize` (default 128K) all data goes to the special device. Setting it on a pool changes the default for all child datasets.
- Pool features: enabling new features can make a pool unimportable by older ZFS. Do not upgrade the rpool if the system still boots with GRUB (including systems installed before 5.4 and legacy BIOS boot); older kernels and older Proxmox VE ISOs cannot import upgraded pools.

## Related

- [host-bootloader.md](./host-bootloader.md)
- [storage.md](./storage.md)
- [storage-replication.md](./storage-replication.md)
- Official docs: https://pve.proxmox.com/pve-docs/chapter-sysadmin.html#chapter_zfs
