# Firmware & CPU Microcode Updates

Firmware updates apply when running Proxmox VE on a bare-metal server (guests with device pass-through are out of scope). Firmware is divided into microcode (CPUs) and firmware (other devices). Three methods are combined: persistent firmware, runtime firmware files, and early OS microcode updates.

## Signature / Usage

```bash
# Early OS microcode updates (x86): enable the Debian Firmware Repository first
apt update
apt install intel-microcode      # Intel CPUs
apt install amd64-microcode      # AMD CPUs
# then reboot the Proxmox VE host

# Show running microcode revision
grep microcode /proc/cpuinfo | uniq
dmesg | grep microcode
```

## Options / Props

| Method | Description |
|--------|-------------|
| Persistent firmware | BIOS/UEFI and device firmware updates stored on the motherboard / device. Recommended; the CPU loads updated microcode earliest at boot. Use vendor tools (Dell Lifecycle Manager, HPE Service Packs, `mlxup` for NVIDIA ConnectX, `bnxtnvm`/`niccli` for Broadcom) or LVFS (`fwupd`; system manufactured after 2014 and booted via UEFI) |
| Runtime firmware files | Stored on the Proxmox VE OS and passed to a device if its persisted firmware is older (network / graphics cards; not motherboard or disks). Package `pve-firmware` is installed by default; Debian Firmware Repository (`non-free-firmware`) gives additional packages |
| Early OS microcode updates | `intel-microcode` / `amd64-microcode`, applied early on boot by the Linux kernel. Useful when the vendor no longer provides BIOS/UEFI updates |

### Troubleshooting: disable early microcode once

1. Make sure the host can be rebooted safely.
2. Reboot to the GRUB menu (hold `SHIFT` if hidden).
3. At the desired Proxmox VE boot entry press `E`.
4. On the line starting with `linux`, append ` dis_ucode_ldr` (space separated).
5. Press `CTRL-X` to boot without an Early OS Microcode Update.

### Downgrade a microcode package

```bash
apt list -a intel-microcode
apt install intel-microcode=3.202305*
apt-mark hold intel-microcode
# later
apt-mark unhold intel-microcode
apt update
apt full-upgrade
```

## Notes

- Some updates (BIOS/UEFI, storage controller) can reset device configuration; follow vendor instructions and back up the current configuration. If a reboot is required, make sure it is safe (see Node Maintenance in the HA chapter).
- Proxmox VE ships its own `fwupd` package to enable Secure Boot support with the Proxmox signing key; it intentionally dropped the `udisks2` recommendation because of issues on hypervisors.
- CPU microcode updates described here are x86 only; there is no equivalent operating-system-level microcode package for arm64.
- `lscpu` shows present CPU vulnerabilities and mitigations; real-world results only show if the host is up to date, not end of life, and rebooted since the last kernel update. A reboot is always needed to apply a microcode update.
- If a recent microcode is suspected, prefer a package downgrade over `apt purge <intel-microcode|amd64-microcode>`; removal may cause an older persisted microcode to load. A downgrade requires an earlier version in the Debian repository.
- When early microcode is newer than both the CPU's built-in and the motherboard firmware's, the log shows "microcode updated early".
- If an additional firmware package conflicts with `pve-firmware`, APT aborts the installation.

## Related

- [package-repositories.md](./package-repositories.md)
- [ha.md](./ha.md)
- Official docs: https://pve.proxmox.com/pve-docs/chapter-sysadmin.html#chapter_firmware_updates
