# Install

Commands for installing, configuring repositories, and upgrading Proxmox VE.

## Create bootable USB installer (Linux)

```sh
dd bs=1M conv=fdatasync if=./proxmox-ve_*.iso of=/dev/<device>
```

Replace `<device>` with the target USB device (e.g., `sdb`). Use `lsblk` to identify the correct device.

## Create bootable USB installer (macOS)

```sh
hdiutil convert proxmox-ve_*.iso -format UDRW -o proxmox-ve_*.dmg
diskutil list
diskutil unmountDisk /dev/disk<N>
sudo dd if=proxmox-ve_*.dmg bs=1M of=/dev/rdisk<N>
```

Replace `<N>` with the disk number shown by `diskutil list`.

## Install Proxmox VE on existing Debian system

```sh
apt-get update
apt-get install proxmox-ve
```

Recommended only for advanced users. The ISO installer is the preferred method.

## Configure enterprise repository (PVE 9 / Trixie)

```sh
cat > /etc/apt/sources.list.d/pve-enterprise.sources << EOF
Types: deb
URIs: https://enterprise.proxmox.com/debian/pve
Suites: trixie
Components: pve-enterprise
Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
EOF
```

Requires a valid Proxmox VE subscription.

## Configure no-subscription repository (PVE 9 / Trixie)

```sh
cat > /etc/apt/sources.list.d/proxmox.sources << EOF
Types: deb
URIs: http://download.proxmox.com/debian/pve
Suites: trixie
Components: pve-no-subscription
Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
EOF
```

Not recommended for production environments.

## Configure Ceph enterprise repository (Trixie)

```sh
cat > /etc/apt/sources.list.d/ceph.sources << EOF
Types: deb
URIs: https://enterprise.proxmox.com/debian/ceph-tentacle
Suites: trixie
Components: enterprise
Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
EOF
```

## Configure Ceph no-subscription repository (Trixie)

```sh
cat > /etc/apt/sources.list.d/ceph.sources << EOF
Types: deb
URIs: http://download.proxmox.com/debian/ceph-tentacle
Suites: trixie
Components: no-subscription
Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
EOF
```

## Download and verify repository keyring

```sh
wget https://enterprise.proxmox.com/debian/proxmox-archive-keyring-trixie.gpg \
  -O /usr/share/keyrings/proxmox-archive-keyring.gpg
sha256sum /usr/share/keyrings/proxmox-archive-keyring.gpg
```

## Modernize repository sources format

```sh
apt modernize-sources
```

Converts legacy `.list` format entries to the modern `.sources` DEB822 format.

## Update and upgrade packages

```sh
apt-get update
apt-get dist-upgrade
```

## Check Proxmox VE version

```sh
pveversion
```

## Upgrade from Proxmox VE 8 to 9

> **Warning**: Major version upgrades are disruptive. Run the compatibility checker first and ensure all nodes are healthy before proceeding. Upgrade one node at a time in a cluster.

```sh
# 1. Run pre-upgrade compatibility checker
pve8to9

# 2. Run full check with detailed output
pve8to9 --full

# 3. Update Debian base repositories to Trixie
sed -i 's/bookworm/trixie/g' /etc/apt/sources.list

# 4. Update PVE repository to Trixie (see repository configuration commands above)

# 5. Update package lists and perform upgrade
apt update
apt dist-upgrade

# 6. Reboot
reboot
```

## Post-upgrade: fix GRUB on EFI systems with LVM root

```sh
[ -d /sys/firmware/efi ] && apt install grub-efi-amd64
```

## Post-upgrade: disable audit logging (if enabled)

```sh
systemctl disable --now systemd-journald-audit.socket
```

## Post-upgrade: migrate LVM autoactivation settings

```sh
/usr/share/pve-manager/migrations/pve-lvm-disable-autoactivation
```

## Install CPU microcode (Intel)

```sh
apt install intel-microcode
```

## Install CPU microcode (AMD)

```sh
apt install amd64-microcode
```

## Rebuild initramfs

```sh
update-initramfs -u -k all
```

## Apply network configuration changes without reboot

```sh
ifreload -a
```

Requires the `ifupdown2` package (`apt install ifupdown2`).

## Generate network interface pinning rules

```sh
pve-network-interface-pinning generate
```

Optional flags: `--prefix <prefix>`, `--interface <name>`, `--target-name <name>`.
