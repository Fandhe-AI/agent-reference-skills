# Custom Installation with Cloud-Init

Reference material for customizing DGX Spark deployments using Cloud-Init, USB installation media, and local hosting of Debian packages and firmware. Implements the initial provisioning stage of enterprise lifecycle integration for air-gapped and on-premises-mirror scenarios.

## Signature / Usage

```bash
# 1. Repack BaseOS ISO with OEM Cloud-Init seed
#    (the script does not download the ISO; obtain it beforehand)
./repack_baseos.sh -iso <ISO_FILE> -iso-root <ISO_ROOT_DIR>

# 1b. Repack a FastOS recovery tarball with a cloud-init tree
sudo ./repack_fastos.sh -f ~/Downloads/tmp/usb.customer-1.135.33.tar.gz -c ./oemdata/cloud-init

# 2. Write ISO to USB, then add an OEMDATA partition in free space
sudo parted "$USB" print
sudo parted -s "$USB" mkpart primary 14GiB 100%
# format new partition as ext4 labeled OEMDATA

# 3. Host a local package repository (minimal desktop example)
dpkg-scanpackages . /dev/null | gzip -9c > Packages.gz
python3 -m http.server 8080 --bind 0.0.0.0

# 4. Full mirror sync (Ubuntu Ports + LVFS)
export LVFS_USERNAME='you@example.com'
export LVFS_TOKEN='your-lvfs-token'
sudo -E ./spark-mirror-sync.sh --install-deps --install-apt-mirror   # first run only
sudo -E ./spark-mirror-sync.sh
```

## Key Concepts

- **BaseOS vs FastOS**: BaseOS is the DGX OS installer image (ISO), customized with `repack_baseos.sh` and flashed to USB (or booted over PXE). FastOS is the DGX Spark recovery image (tar.gz), customized with `repack_fastos.sh` and used to create recovery USB media; FastOS repack does not use the USB OEMDATA partition layout.

| Goal | Start From | Repack Script |
| --- | --- | --- |
| Custom installation or initial provisioning with cloud-init | BaseOS ISO (DGX OS installer) | repack_baseos.sh |
| Factory recovery or re-image to baseline | FastOS recovery tarball | repack_fastos.sh |
| OEM variant hardware | Image from your OEM | Per OEM delivery |

- **IT administrator workflows** (by device state):

| Device State | Typical First Step |
| --- | --- |
| OEM cloud-init already active on shipped devices | Prepare a USB stick with content that works with the update sources you provide (no re-image) |
| OEM cloud-init not active or unknown baseline | Re-image to a known baseline (FastOS recovery or BaseOS ISO per your OEM); full repack, USB, and OEMDATA procedures |
| Factory baseline only | Re-image with FastOS (optionally repacked with cloud-init) |
| Site-specific installation from scratch | Repack BaseOS ISO with cloud-init and required packages or firmware |

- **Installation media architecture**: a repacked BaseOS ISO written to USB, plus an optional additional `OEMDATA` partition containing Debian packages, firmware, and configuration scripts. Cloud-Init runs `hook.sh` on first boot while the installation media remains connected.
- **OEMDATA partition structure**: `hook.sh` (OEM installation script), `debs/` (Debian packages), `firmware/` (`.cab`/`.cap` files), optional URL configuration files.
- **Deployment patterns**: ISO-only customization, USB-hosted packages/firmware, or local server mirrors (minimal or full Ubuntu Ports + LVFS content).

## Options / Props

| Script | Purpose |
| --- | --- |
| repack_baseos.sh | Repacks BaseOS ISO with OEM Cloud-Init configuration |
| repack_fastos.sh | Repacks a FastOS recovery tarball with a cloud-init tree: `-f <fastos_tarball> -c <cloud_init_directory>` (optional `-o <output_tarball>`, `-l <xz_level>` 0-9, default 3) |
| oem-iso-cfg.sh | Runs during installation (ISO mounted at `/cdrom`) to apply customizations |
| hook.sh | Executes on first boot to install packages and firmware from OEMDATA |
| spark-mirror-sync.sh | Synchronizes Ubuntu Ports and LVFS content to a local mirror server |

### repack_baseos.sh options

| Option | Description |
| --- | --- |
| -iso | Path to the local DGX OS ISO file |
| -iso-root <DIR> | Directory where the ISO is extracted and repacked (default: ./iso-root) |
| -volume-id <ID> | Volume ID for the repacked ISO (maximum 32 characters) |
| -clean | Remove extraction directories after repacking (default: keep them) |
| -debug | Verbose output |

### OEMDATA URL and list files

`hook.sh` reads these optional files from the OEMDATA partition root.

| File | Format and behavior |
| --- | --- |
| apt-repo.url | One line with the base URL of the APT repository (the parent of `Packages.gz`), full path e.g. `http://192.168.1.1:8080/deb-repo/`; not the bare host root. hook.sh records it in `/etc/apt/sources.list.d/oem-local.list`. If omitted, no OEM APT source is configured. |
| apt-packages.txt | One package name or `.deb` file name per line, e.g. `nvidia-spark-ota-check`. If omitted but `apt-repo.url` is present, hook.sh adds the source and runs a single-source apt upgrade against that repository only. |
| lvfs-mirror.url | One line with the base URL of a directory of `.cab`/`.cap` files, e.g. `http://192.168.1.1:8080/lvfs-mirror/signbinpack-2.152.3-release/`. hook.sh reads the directory listing and runs `fwupdmgr install` for each file. If omitted, LVFS mirror configuration is skipped. |

## Example Constants

Example Constants for the Repository Server (Port 8080 or 80). Replace these values with settings that match your environment.

| Item | Example Value |
| --- | --- |
| Desktop or server IP | 192.168.1.1 |
| Python HTTP server port | 8080 |
| Web root | /var/www or for example $HOME/oem-server |
| APT subdirectory | deb-repo under WEB_ROOT |
| LVFS subdirectory | lvfs-mirror under WEB_ROOT |

## Validation Scenarios

1. **Customized BaseOS ISO** — repack image with Cloud-Init OEM seed, verify customizations present post-install.
2. **Air-gapped USB installation** — prepare USB with OEMDATA partition, host local packages/firmware, configure client with `hook.sh`, install and verify.
3. **Local repository + OTA updates** — host curated APT repository, point Cloud-Init configuration to local mirror, verify device receives expected package updates.

## Notes

- Warning (official): do not use the default username and password in production deployments. Remove the default credentials or replace them with credentials approved by your organization.
- Re-flashing with a FastOS recovery image is destructive: it erases local storage on the target system (user data, installed software, configuration files, logs). Back up first and confirm the image and target.
- Known issue: when cloud-init runs on a customer-specific FastOS image, it can take approximately 400 seconds while waiting for dashboard-admin to release the APT lock at `/var/lib/apt/lists/lock`.
- Release notes (July 2026): cloud-init now supports DHCP, HTTP, and TFTP in addition to direct USB connections, and FastOS recovery image customization was added for the DGX Spark Founders Edition (per https://docs.nvidia.com/dgx/dgx-spark/release-notes.html).
- Source: https://docs.nvidia.com/dgx/dgx-spark/enterprise-custom-install.html
- USB drive physical access allows content replacement; treat as a supply-chain risk.
- Local APT repository uses `[trusted=yes]` (no signature verification); firmware installation with `OnlyTrusted=false` accepts unverified binaries.
- URLs stored on USB drives identify network servers and are a MITM attack vector; harden mirror-host network exposure.

## Related

- [Enterprise Manageability](./enterprise-manageability.md)
- [Enterprise Lifecycle Integration](./enterprise-fleet-lifecycle.md)
