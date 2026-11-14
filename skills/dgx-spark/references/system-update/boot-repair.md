# System Repair

Recover a DGX Spark that cannot boot without erasing the internal SSD: boot an earlier installed kernel from GRUB, or boot a live Ubuntu USB drive to repair the installed system or recover files.

## Signature / Usage

Choose a method based on whether the system can reach the GRUB boot menu and boot an earlier kernel:

- Previously installed kernel: GRUB is reachable and an earlier kernel is installed (for example, a recent kernel update prevents normal boot but an earlier kernel works).
- Bootable USB: GRUB or every installed kernel is unreachable. Create a bootable USB drive on another computer, boot the affected device from it, then mount the drive, repair the installed system, or recover files.

Power off the device, then reboot while holding Shift and Insert at the same time to reach the GRUB menu. Select "Advanced options for DGX OS GNU/Linux" and choose the kernel version to boot. Each installed kernel has a normal entry and a recovery mode entry (a limited maintenance environment that offers a root shell).

### Previously Installed Kernel

When booted using a recovery kernel, run commands directly with root privileges; no mount, chroot, or unmount steps are needed.

Scenario 1: complete a package upgrade (for example, after running `apt upgrade` instead of `apt dist-upgrade`, or to update a faulty kernel):

```bash
dpkg --configure -a
# Fix apt upgrade error
apt update
apt -f install
apt dist-upgrade
reboot
```

Scenario 2: rebuild initramfs after an incomplete or missing initramfs:

```bash
dpkg --configure -a
# Run the following command if you have an interrupted initramfs upgrade
update-initramfs -u -k all
# If you are missing your initramfs entirely, run 'update-initramfs -c -k all' instead
update-grub
reboot
```

Scenario 3: install signed NVIDIA driver packages when the driver is missing or Secure Boot prevents its kernel modules from loading. Set `KVER` to the installed kernel version you want to repair and boot:

```bash
KVER=<kernel version>
```

If you previously installed the NVIDIA driver with a `.run` installer, run `nvidia-uninstall` (skip it if you installed the driver only through APT). Then remove module files that are not owned by a Debian package, after confirming `KVER` is set to the kernel you intend to repair:

```bash
find "/lib/modules/${KVER:?Set KVER first}" \
-name 'nvidia*.ko*' \
-exec sh -c 'dpkg -S "$1" >/dev/null 2>&1 || rm -v "$1"' _ {} \;
depmod -a "$KVER"
```

Find and install the signed packages, then rebuild, verify, and reboot:

```bash
apt update
apt-cache search linux-modules-nvidia | grep -F -- "$KVER"
apt-cache search nvidia-driver | grep -i open
# Set the corresponding modules and drivers to be the ones for your selected kernel version
apt install <signed linux-modules-nvidia package> <nvidia-driver package>
update-initramfs -u -k $KVER
modinfo -k $KVER -F signer nvidia # must be non-empty
reboot
```

### Bootable USB

1. Download the ARM 64-bit architecture version of the Ubuntu Desktop installer (the official page names Ubuntu 26.04.1 LTS "ARM 64-bit architecture") and create a bootable USB flash drive with an image writer.
2. Insert the USB drive into the DGX Spark, hold Esc while it boots, and select the new USB entry in the UEFI menu. In the Ubuntu boot menu select Try Ubuntu (not install) to boot a live environment without modifying the disk.
3. Mount the root file system on the NVMe drive to access or back up files:

```bash
# Find your NVMe drive name.
lsblk
# Create a directory to access your nvme. The example uses "nvme_mount_dir" under /mnt/
sudo mkdir -p /mnt/nvme_mount_dir
# Mount your nvme drive to the directory you just created
sudo mount /dev/nvme0n1p2 /mnt/nvme_mount_dir
```

User files are typically under `/mnt/nvme_mount_dir/home/`. Verify the backup before proceeding.

The scenarios below assume root partition `/dev/nvme0n1p2`, EFI partition `/dev/nvme0n1p1`, and mount location `/mnt`. For scenarios 1 to 3, mount the system and chroot first:

```bash
sudo mount /dev/nvme0n1p2 /mnt # root partition
sudo mount /dev/nvme0n1p1 /mnt/boot/efi # EFI partition (mount a separate /boot first if you have one)
for d in dev dev/pts proc sys run; do sudo mount --bind /$d /mnt/$d; done
sudo mount --bind /sys/firmware/efi/efivars /mnt/sys/firmware/efi/efivars 2>/dev/null
sudo chroot /mnt /bin/bash
```

Then run the same commands as the "Previously Installed Kernel" Scenarios 1 to 3 inside the chroot (the final reboot is replaced by the following unmount and reboot):

```bash
exit
sync
sudo umount -R /mnt
sudo reboot
```

Scenario 4: repair a corrupted filesystem from a healthy operating system (an Ubuntu live USB with Try Ubuntu selected). Identify the root partition and unmount it; if it reports "target is busy", stop and close anything using the partition:

```bash
lsblk -f
sudo umount /dev/nvme0n1p2
sudo e2fsck -f /dev/nvme0n1p2
sudo reboot
```

Review and answer the e2fsck repair prompts, and reboot with the USB removed once the check completes without unresolved errors.

## Notes

- This procedure applies to the DGX Spark Founders Edition and to OEM DGX Spark systems. It does not erase the internal SSD (unlike [System Recovery](./system-recovery.md), which restores factory state and erases it).
- Never run `e2fsck` on a mounted filesystem. It applies to ext2, ext3, and ext4; use the appropriate repair tool for other filesystem types.
- Do not install `nvidia-dkms-*` modules: they are unsigned, and DGX Spark has Secure Boot enabled, so they fail to load unless signed with a trusted key.
- The `find ... rm -v` step deletes module files not owned by a Debian package; confirm `KVER` before running it.
- The live USB screen resolution may be lower than expected; this is a known issue and does not affect the procedure.
- Source: https://docs.nvidia.com/dgx/dgx-spark/boot-repair.html (retrieved 2026-11-14)

## Related

- [System Recovery](./system-recovery.md)
- [OS and Component Update](./os-and-component-update.md)
- [UEFI Settings](../system-config/uefi-settings.md)
