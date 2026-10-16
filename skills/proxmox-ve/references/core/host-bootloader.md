# Host Bootloader (proxmox-boot-tool, GRUB, systemd-boot, Secure Boot)

Proxmox VE uses GRUB or systemd-boot depending on the installer disk setup. EFI systems installed with ZFS as root filesystem use `systemd-boot` unless Secure Boot is enabled; all other deployments use GRUB. `proxmox-boot-tool` keeps the EFI System Partitions (ESPs) synchronized.

## Signature / Usage

```bash
# Show configured ESPs and state
proxmox-boot-tool status

# Format / initialize a partition as synced ESP
proxmox-boot-tool format /dev/sda2
proxmox-boot-tool init /dev/sda2
proxmox-boot-tool init /dev/sda2 grub   # force GRUB (e.g. Secure Boot)

# Sync all kernels / configuration to all ESPs
proxmox-boot-tool refresh
```

## Options / Props

### Installer partitions

| Partition | Description |
|-----------|-------------|
| BIOS Boot Partition | 1 MB (gdisk type EF02) |
| EFI System Partition | 512 MB (gdisk type EF00) |
| Third partition | Spans the `hdsize` parameter or remaining space, used for the chosen storage type |

### proxmox-boot-tool kernel commands

| Command | Description |
|---------|-------------|
| `kernel add <ver>` | Add a kernel to the manually selected list kept bootable and synced to all ESPs |
| `kernel list` | List manually and automatically selected kernels |
| `kernel remove <ver>` | Remove a kernel from the manual list |
| `kernel pin <ver>` | Pin boot to a kernel version permanently (until unpinned) |
| `kernel pin <ver> --next-boot` | Boot that version on the next boot only |
| `kernel unpin` | Remove the pin (its `--next-boot` form only clears a `--next-boot` pin, which already happens automatically on boot) |

Kernel versions configured by default: the currently running kernel, the version newly installed on package updates, the two latest installed kernels, the latest version of the second-to-last kernel series, and any manually selected kernels.

### Edit the kernel command line

| Bootloader | Where |
|------------|-------|
| GRUB | `GRUB_CMDLINE_LINUX_DEFAULT` in `/etc/default/grub` (or snippets in `/etc/default/grub.d`), then `update-grub` |
| systemd-boot | One line in `/etc/kernel/cmdline`, then `proxmox-boot-tool refresh` (sets the `option` line of `loader/entries/proxmox-*.conf`) |

### Determine the bootloader

```bash
efibootmgr -v
```

| Output | Meaning |
|--------|---------|
| EFI variables not supported | GRUB in BIOS/Legacy mode |
| `File(\EFI\proxmox\grubx64.efi)` | GRUB in UEFI mode |
| `File(\EFI\proxmox\shimx64.efi)` | GRUB in UEFI mode with Secure Boot |
| `File(\EFI\systemd\systemd-bootx64.efi)` | systemd-boot |

### systemd-boot entry example (`loader/entries/*.conf` on the ESP)

```
title    Proxmox
version  5.0.15-1-pve
options   root=ZFS=rpool/ROOT/pve-1 boot=zfs
linux    /EFI/proxmox/5.0.15-1-pve/vmlinuz-5.0.15-1-pve
initrd   /EFI/proxmox/5.0.15-1-pve/initrd.img-5.0.15-1-pve
```

### Secure Boot packages (`proxmox-secure-boot-support` meta-package)

| Package | Description |
|---------|-------------|
| `shim-signed` | shim bootloader signed by Microsoft |
| `shim-helpers-amd64-signed` | Fallback bootloader and MOKManager, signed by Proxmox |
| `grub-efi-amd64-signed` | GRUB EFI bootloader, signed by Proxmox |
| `proxmox-kernel-6.X.Y-Z-pve-signed` | Kernel image, signed by Proxmox |

### Switch an existing UEFI install to Secure Boot

```bash
apt install proxmox-secure-boot-support
# only if systemd-boot is used (ZFS-on-root): check root FS and find ESPs
findmnt /
lsblk -o +FSTYPE
proxmox-boot-tool init /dev/sda2 grub   # run once per ESP
efibootmgr -v
```

### DKMS / third-party modules with Secure Boot

```bash
openssl x509 -in /var/lib/dkms/mok.pub -noout -text
mokutil --import /var/lib/dkms/mok.pub
```

## Notes

- GRUB in BIOS mode (`--target i386-pc`) is installed onto the BIOS Boot Partition of all selected disks on all GRUB systems (ext4 / xfs root, and ZFS root on non-EFI systems). On arm64 Proxmox VE boots through UEFI only: no BIOS Boot Partition, no `i386-pc` target; GRUB uses `arm64-efi`, binaries are `grubaa64.efi`, `shimaa64.efi`, `systemd-bootaa64.efi`, and Secure Boot packages are `shim-helpers-arm64-signed` / `grub-efi-arm64-signed`.
- ESPs are not kept mounted during regular operation (avoids vfat corruption after a crash and manual `/etc/fstab` edits). When the ESPs are managed by proxmox-boot-tool, the bootloader reads the kernel and initrd from the vfat ESP, so the root pool can use all optional ZFS features instead of only the subset GRUB implements. A ZFS root system that still boots with GRUB reading the pool (installed before Proxmox VE 5.4 and not migrated to proxmox-boot-tool, or booting with legacy BIOS boot) becomes unbootable if a new feature is active on the rpool: do not run `zpool upgrade` on the rpool there (see [zfs.md](./zfs.md)).
- `proxmox-boot-tool init` adds the UUID to `/etc/kernel/proxmox-boot-uuids` and triggers a refresh of all configured ESPs. `refresh` is the equivalent of `update-grub` on ext4 / xfs root systems; `update-initramfs` and `apt` trigger it automatically. A refresh is required after manual kernel add / remove or pin / unpin.
- `format` formats the given partition; make sure to pass the right device.
- On proxmox-boot-tool managed systems `update-grub` calls `proxmox-boot-tool refresh`.
- Pinning works for all Proxmox VE systems, not only those using `proxmox-boot-tool` for ESP sync (then the final `refresh` can be skipped). Remove pins as soon as possible so the latest kernel security patches apply.
- Secure Boot is supported out of the box since Proxmox VE 8.1; only GRUB is supported as bootloader. New installs include all required packages. Switching an existing install can lead to an unbootable system if done incorrectly; keep a tested backup.
- When switching a systemd-boot host to Secure Boot, the old `systemd-boot` stays installed but GRUB is preferred, so the system can still boot with `systemd-boot` and Secure Boot off if needed. Then reboot and enable Secure Boot in the UEFI setup; a `proxmox` entry boots via the pre-signed shim (add `\EFI\proxmox\shimx64.efi` manually if missing; some firmwares drop the entry if the disk is not itself a boot option).
- With Secure Boot the kernel refuses unsigned modules; DKMS generates `/var/lib/dkms/mok.key` and `/var/lib/dkms/mok.pub`; `mokutil --import` asks for a temporary password that must be re-entered in MOKManager on reboot.

## Related

- [zfs.md](./zfs.md)
- [lvm-btrfs.md](./lvm-btrfs.md)
- [installation.md](./installation.md)
- Official docs: https://pve.proxmox.com/pve-docs/chapter-sysadmin.html#sysboot
