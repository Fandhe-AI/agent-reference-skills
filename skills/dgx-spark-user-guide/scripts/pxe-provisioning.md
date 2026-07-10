# pxe-provisioning

PXE boot server setup (TFTP / HTTP / DHCP), GRUB netboot configuration, and cloud-init based custom install (mirror repos, ISO repack, OEMDATA USB provisioning) for DGX Spark. Source: pxe.html, enterprise-custom-install.html

## Mount and extract the BaseOS ISO

```sh
sudo mount -o loop /local/http/base_os_7.0.0/base_os_7.0.0.iso /mnt
```

## Copy kernel and initrd from ISO to TFTP root

```sh
cp /mnt/casper/vmlinuz /local/tftp/baseos/vmlinuz
cp /mnt/casper/initrd /local/tftp/baseos/initrd
```

## Unmount the ISO

```sh
umount /mnt
```

## Download GRUB netboot binary

```sh
cd /tmp
wget -q http://ports.ubuntu.com/ubuntu-ports/dists/jammy/main/uefi/grub2-arm64/current/grubnetaa64.efi.signed
cp grubnetaa64.efi.signed /local/tftp/
```

## Extract recovery media (FastOS) to TFTP root

```sh
tar xpfv /tmp/usb.customer.tar.gz
cp /tmp/usbimg.customer/usb/vmlinuz /local/tftp/fastos/
cp /tmp/usbimg.customer/usb/initrd /local/tftp/fastos/
```

## Verify TFTP server is serving GRUB config

```sh
cd /tmp
tftp <TFTP_Server_IP>
get grub/grub.cfg
quit
```

## Verify HTTP server is serving recovery media

```sh
cd /tmp
wget http://<HTTP_Server_IP>/fastos/usb.customer.tar.gz
```

## GRUB config for BaseOS install (/local/tftp/grub/grub.cfg)

```text
set default=0
set timeout=5

menuentry 'Install BaseOS 7.0.0' {
   linux /baseos/vmlinuz fsck.mode=skip autoinstall ip=dhcp url=http://<Server IP>/base_os_7.0.0/base_os_7.0.0.iso nvme-core.multipath=n nouveau.modeset=0
   initrd /baseos/initrd
}
```

## GRUB config for FastOS recovery media (/local/tftp/grub/grub.cfg)

```text
set default=0
set timeout=5

menuentry "Install DGX Spark FastOS" {
    linux /fastos/vmlinuz nouveau.modeset=0 console=tty0 console=ttyS0,921600 sbsa_gwdt.action=1 noui pxeinstall=true fastos_usbimg_url=http://<Server IP>/fastos/usb.customer.tar.gz ip=dhcp static_ip=<static ip>:<gateway ip>
    initrd /fastos/initrd
}
```

## DHCP server config example (dhcpd.conf)

> **Note**: This example is transcribed as-is from the official NVIDIA documentation. It nests `class` inside the `pool` block, whereas the common ISC DHCP convention is to declare `class` at subnet or global scope and reference it from `pool` with `allow members of "pxeclients";`. Depending on your dhcpd version, the structure as written may fail to parse, or the PXE options may not be applied to clients — if so, move the `class` declaration to subnet scope.

```text
authoritative;
default-lease-time 120;
max-lease-time 120;
ddns-update-style none;

subnet 192.168.99.0 netmask 255.255.255.0 {
pool {
   range 192.168.99.2;

# Required for PXE Boot
class "pxeclients" {
   match if substring (option vendor-class-identifier, 0, 9) = "PXEClient";
      filename "grubnetaa64.efi.signed";
      # TFTP Server IP address
      next-server 192.168.99.1;
      option root-path "/local/tftp/";
}

}
}
```

## Write repacked ISO to a USB drive

> **警告**: `dd` は `$USB` に指定したデバイス上の全データを上書きする破壊的操作。デバイス指定を必ず確認してから実行すること。

```sh
sudo dd if=/path/to/repacked.iso of="$USB" bs=4M status=progress conv=fsync
```

## Create and format an OEMDATA partition on USB

> **警告**: `parted` によるパーティション作成、`mkfs.ext4` によるフォーマットは対象デバイス上のデータを消去する。`$USB` の指定を必ず確認すること。

```sh
USB=/dev/sdX
sudo parted "$USB" print
sudo parted -s "$USB" mkpart primary 14GiB 100%
sudo mkfs.ext4 -L OEMDATA "${USB}3"
```

## Populate OEMDATA partition (debs, firmware, hook script)

```sh
sudo mkdir -p /tmp/usb-data
sudo mount "${USB}3" /tmp/usb-data
sudo mkdir -p /tmp/usb-data/debs /tmp/usb-data/firmware
sudo cp /path/to/*.deb /tmp/usb-data/debs/
sudo cp /path/to/*.cab /path/to/*.cap /tmp/usb-data/firmware/
sudo cp /path/to/repo/os/oemdata/hook.sh /tmp/usb-data/
sudo umount /tmp/usb-data
```

## Build a local apt package repository

```sh
sudo apt-get install -y dpkg-dev
cd "$REPO_DIR"
dpkg-scanpackages . /dev/null | gzip -9c > Packages.gz
zcat Packages.gz > Packages 2>/dev/null || gzip -dc Packages.gz > Packages
```

## Generate Release / InRelease for the local apt repository

Whenever `Packages.gz` is regenerated, recreate the uncompressed `Packages`, rewrite `Release` with fresh checksums, then copy it to `InRelease`. This avoids 404 responses from apt clients that request `InRelease` first.

```sh
cd "$REPO_DIR"
{
  echo "Origin: OEM Local Repo"
  echo "Label: oem-local"
  echo "Suite: ."
  echo "Codename: ."
  echo "Architectures: arm64 amd64"
  echo "Components: ."
  echo "Description: OEM local package repository"
  echo "Date: $(date -u -R)"
  echo "MD5Sum:"
  printf ' %s %s Packages.gz\n' "$(md5sum Packages.gz | awk '{print $1}')" "$(stat -c%s Packages.gz)"
  printf ' %s %s Packages\n' "$(md5sum Packages | awk '{print $1}')" "$(stat -c%s Packages)"
  echo "SHA256:"
  printf ' %s %s Packages.gz\n' "$(sha256sum Packages.gz | awk '{print $1}')" "$(stat -c%s Packages.gz)"
  printf ' %s %s Packages\n' "$(sha256sum Packages | awk '{print $1}')" "$(stat -c%s Packages)"
} > Release
cp Release InRelease
```

## Serve a local repository / mirror over HTTP

```sh
cd "$WEB_ROOT"
python3 -m http.server 8000 --bind 0.0.0.0
```

## Set up an LVFS firmware mirror

```sh
mkdir -p ~/mirror/apt ~/mirror/lvfs
cd ~/mirror
wget -O sync-pulp.py https://gitlab.com/fwupd/lvfs-website/raw/master/contrib/sync-pulp.py
chmod +x sync-pulp.py
```

## Install apt-mirror

```sh
sudo apt install -y perl wget
sudo wget -O /usr/local/bin/apt-mirror \
  https://raw.githubusercontent.com/apt-mirror/apt-mirror/master/apt-mirror
sudo chmod +x /usr/local/bin/apt-mirror
```

## Run apt-mirror to sync the local apt mirror

Always run synchronization with `/usr/local/bin/apt-mirror` rather than the distro-packaged `apt-mirror`, which is often too old for certain DEP-11 metadata paths.

```sh
sudo /usr/local/bin/apt-mirror /etc/apt/mirror.spark.list
```

## Sync LVFS mirror (full)

```sh
cd ~/mirror
./sync-pulp.py https://fwupd.org/downloads ~/mirror/lvfs \
  --username='your-email@example.com' \
  --token='YOUR_USER_TOKEN'
```

## Sync LVFS mirror (partial, by GUID list)

```sh
./sync-pulp.py https://fwupd.org/downloads ~/mirror/lvfs \
  --username='your-email@example.com' \
  --token='YOUR_USER_TOKEN' \
  --guid-file=guids.txt
```

## Serve the unified apt + LVFS mirror

```sh
cd ~/mirror
python3 -m http.server 8080 --bind 0.0.0.0
```

## Repack a BaseOS ISO with cloud-init / custom debs

```sh
cd $work_dir
./repack_baseos.sh -iso <ISO_FILE|URL> -iso-root <ISO_ROOT_DIR>
```

```sh
./repack_baseos.sh -iso ~/Downloads/tmp/BaseOS/7.4.0/DGXOS-7.4.0-*.iso \
  -iso-root ~/Downloads/tmp/BaseOS/Repack
```

## Open firewall ports for local mirror/repo HTTP servers

```sh
sudo ufw allow 80/tcp
sudo ufw allow 8000/tcp
sudo ufw reload
```

## Client: disable the public LVFS remote in favor of a local mirror

```sh
sudo fwupdmgr disable-remote lvfs
```

Alternatively, disable by moving the remote config file:

```sh
sudo mv /etc/fwupd/remotes.d/lvfs.conf /etc/fwupd/remotes.d/lvfs.conf.disabled
```

## Client: refresh and apply firmware updates from mirror

```sh
sudo fwupdmgr refresh
fwupdmgr get-updates
sudo fwupdmgr update
```

## Client: allow untrusted firmware (when required)

```sh
sudo sed -i '/\[fwupd\]/a OnlyTrusted=false' /etc/fwupd/fwupd.conf
```

## Client apt sources config (DEB822, local mirror)

File: `/etc/apt/sources.list.d/local-mirror.sources`

```text
# Ubuntu from local mirror (under web root .../apt/mirror/)
Types: deb deb-src
URIs: http://10.111.54.206:8080/apt/mirror/ports.ubuntu.com/ubuntu-ports/
Suites: noble-proposed
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

## fwupd local LVFS mirror remote config

File: `/etc/fwupd/remotes.d/local-lvfs-mirror.conf`

```text
[fwupd Remote]
Enabled=true
Type=download
Title=Local LVFS Mirror
MetadataURI=http://10.111.54.206:8080/lvfs/firmware.xml.xz
FirmwareBaseURI=http://10.111.54.206:8080/lvfs
```

## OEMDATA USB provisioning files

File: `apt-repo.url` (on USB)

```text
http://10.111.55.241:8000/deb-repo/
```

File: `lvfs-mirror.url` (on USB)

```text
http://10.111.55.241:8000/lvfs-mirror/signbinpack-2.152.4-release
```

File: `apt-packages.txt` (on USB)

```text
nvidia-spark-ota-check
```

File: `oemdata/cloud-init/seed/meta-data`

```text
instance-id: oem-spark-01
```

## cloud-init user-data: auto-mount OEMDATA and run hook.sh on first boot

The repacked-ISO install path embeds this `runcmd` block in cloud-init `user-data`. On first boot it mounts the partition labeled `OEMDATA`, copies `hook.sh` from it to `/tmp` for execution, then disables cloud-init and unmounts the partition once done (whether or not `hook.sh` was found).

```yaml
runcmd:
  - |
    OEM_MNT=/mnt/oemdata
    mkdir -p "$OEM_MNT"
    _oemdata_exit() {
      echo "OEMDATA exit trap: disabling cloud-init and unmounting OEMDATA"
      umount "$OEM_MNT" 2>/dev/null || true
      rmdir "$OEM_MNT" 2>/dev/null || true
      mkdir -p /etc/cloud
      touch /etc/cloud/cloud-init.disabled
    }
    trap '_oemdata_exit' EXIT
    if mount -L OEMDATA "$OEM_MNT" 2>/dev/null; then
      echo "OEMDATA partition found, checking for hook.sh"
      if [ -f "$OEM_MNT/hook.sh" ]; then
        HOOK_RUN=/tmp/oemdata-hook.sh
        cp -f "$OEM_MNT/hook.sh" "$HOOK_RUN"
        chmod 700 "$HOOK_RUN"
        export OEM_MNT
        sh "$HOOK_RUN"
      fi
    fi
```

> **Note**: This `runcmd` block is transcribed verbatim from the official NVIDIA documentation (`enterprise-custom-install.html`); the code above is not modified from the source. Because `trap '_oemdata_exit' EXIT` is registered before the `mount -L OEMDATA` attempt, the trap fires unconditionally on script exit — including when the `mount -L OEMDATA` step fails — and always writes `/etc/cloud/cloud-init.disabled`. Consequently, the OEMDATA partition must be attached and mountable on the very first boot; if it is missing or fails to mount on that first boot, cloud-init is disabled anyway and will not retry the mount/hook sequence on any subsequent boot.

## Run the OEMDATA hook with mirror server variables

```sh
export MIRROR_SERVER_IP=10.111.54.206
export MIRROR_SERVER_PORT=8080
export LVFS_METADATA_NAME=firmware.xml.xz
export LVFS_WEB_SUBDIR=lvfs
sudo -E /path/to/oemdata/hook.sh
```

## Run the mirror sync script with LVFS credentials (first run)

```sh
export LVFS_USERNAME='you@example.com'
export LVFS_TOKEN='your-lvfs-token'
sudo -E ./spark-mirror-sync.sh --install-deps --install-apt-mirror
```

## Re-run the mirror sync script for subsequent syncs

After the initial run with `--install-deps --install-apt-mirror`, later synchronizations only need to invoke the script without arguments. The default `MIRROR_ROOT` when running with `sudo` (without `-H`) is `/root/mirror`.

```sh
sudo -E ./spark-mirror-sync.sh
```

Cloud-init invokes `hook.sh` on first boot while the applicable installation media remains connected. The repacked ISO approach embeds cloud-init configuration directly, whereas the OEMDATA partition method keeps provisioning artifacts on separate USB storage. Commands assume ARM64 Ubuntu Noble-based DGX Spark targets.

**Notes**:
- ISO repack (`repack_baseos.sh`) references `xorriso` (via `xorriso -as mkisofs`) and the `cd-boot-images-arm64` package (for `.../usr/share/cd-boot-images-arm64/images/boot/grub/efi.img`) as prerequisites. The official documentation does not provide a single unified `apt install` command covering all repack prerequisites, so none is listed here; install `xorriso` and `cd-boot-images-arm64` at minimum, and add any additional packages the script reports missing.
- LVFS mirror sync (`sync-pulp.py`) requires: `sudo apt install -y python3 python3-requests python3-lxml`.
