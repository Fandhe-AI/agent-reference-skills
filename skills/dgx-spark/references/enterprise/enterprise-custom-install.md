# Custom Installation with Cloud-Init

Reference material for customizing DGX Spark deployments with native cloud-init (October 2026 Release and later): a FAT32 `OEMDATA` USB volume carrying the cloud-init seed, optional Debian packages, firmware, and repository URL files, plus optional locally hosted APT / LVFS mirrors. Implements the initial provisioning stage of enterprise lifecycle integration for air-gapped and on-premises-mirror scenarios.

## Signature / Usage

Create an OEMDATA-only USB drive (verify the device and partition names with `lsblk` first; `wipefs` and `mkfs.vfat` erase data on the selected partition):

```bash
sudo wipefs -a /dev/<partition>
sudo mkfs.vfat -F 32 -n OEMDATA /dev/<partition>
sudo mkdir -p /mnt/oemdata
sudo mount /dev/<partition> /mnt/oemdata
sudo install -m 0644 <seed-directory>/meta-data /mnt/oemdata/meta-data
sudo install -m 0644 <seed-directory>/user-data /mnt/oemdata/user-data
sync
sudo umount /mnt/oemdata
lsblk -o NAME,SIZE,FSTYPE,LABEL,PARTLABEL /dev/<USB-device>
```

Minimal `meta-data` (sets the cloud-init instance identifier):

```yaml
# instance-id is used by cloud-init as a unique instance identifier.
instance-id: oem-spark-01
```

Supported OEMDATA layout (only `meta-data` and `user-data` are mandatory):

```text
.
├── apt-packages.txt    # Optional package list.
├── apt-repo.url        # Optional APT repository URL for hook.sh.
├── debs/               # Optional .deb files.
├── firmware/           # Optional .cab/.cap files.
├── hook.sh             # Optional extended script.
├── lvfs-mirror.url     # Optional firmware repository URL for hook.sh.
├── meta-data           # Required cloud-init meta-data.
└── user-data           # Required cloud-init user-data.
```

Host a minimal APT repository and firmware tree on a desktop or server (`WEB_ROOT` with `deb-repo` and `lvfs-mirror` subdirectories):

```bash
WEB_ROOT=/var/www   # or for example $HOME/oem-server
REPO_DIR="$WEB_ROOT/deb-repo"
LVFS_DIR="$WEB_ROOT/lvfs-mirror"
sudo mkdir -p "$REPO_DIR" "$LVFS_DIR"
sudo chown "$USER" "$REPO_DIR" "$LVFS_DIR"
sudo apt-get install -y dpkg-dev
cd "$REPO_DIR"
dpkg-scanpackages . /dev/null | gzip -9c > Packages.gz
cd "$WEB_ROOT"
python3 -m http.server 8080 --bind 0.0.0.0
```

Full Ubuntu ports + LVFS mirror (run on the mirror server as root; the script does not invoke sudo internally):

```bash
export LVFS_USERNAME='you@example.com'
export LVFS_TOKEN='your-lvfs-token'
sudo -E ./spark-mirror-sync.sh --install-deps --install-apt-mirror   # first run only
sudo -E ./spark-mirror-sync.sh
```

## Options / Props

### Cloud-init support and device state

Cloud-init on DGX Spark Founders Edition is provided by the `nvidia-spark-cloud-init` package, included in the October 2026 Release and later. For an OEM system, cloud-init is enabled unless the OEM removes it during the image build; follow the OEM release documentation.

| Device state | Typical first step |
| --- | --- |
| Founders Edition with the October 2026 Release or later | Prepare an OEMDATA volume |
| Founders Edition earlier than the October 2026 Release | Create recovery media for the October 2026 Release or later, add an OEMDATA partition, and reflash (reflashing erases local storage) |
| OEM system | Follow the OEM release and recovery documentation |

### Setup and package options

| Setup option | Behavior |
| --- | --- |
| Skip OOBE | `user-data` creates a user and runs provisioning; the initial setup screens (OOBE) are skipped. Create `/etc/cloud/cloud-init.disabled` so cloud-init does not run on later boots (the official example does this). |
| Keep OOBE, provision without creating a user | `user-data` runs provisioning from `bootcmd` while OOBE remains available for the user to create an account (`runcmd` does not run when OOBE runs). The example sets `preserve_hostname: true`. |

| Package or firmware option | Where |
| --- | --- |
| Deliver packages or firmware from USB | `debs/` and `firmware/` on the OEMDATA partition |
| Curated APT and firmware tree | Minimal repository hosted over HTTP, referenced by `apt-repo.url` / `lvfs-mirror.url` |
| Mirror Ubuntu ports and LVFS | `spark-mirror-sync.sh` on a mirror server, wired to the client by `hook.sh` |

### First boot conditions

All of the following must hold, otherwise the system boots normally and ignores the volume without reporting or logging an error:

- Attach the volume before power-on (the systemd generator decides early in boot; a volume attached later is not detected).
- Format the partition as FAT32 or ISO 9660 (cloud-init accepts the label only on `vfat` or `iso9660`).
- Use the uppercase label `OEMDATA` (case sensitive).
- Place both `meta-data` and `user-data` in the partition root (both are required even if `meta-data` only sets an instance ID).

### Where content belongs

| Content | USB OEMDATA partition | Network server |
| --- | --- | --- |
| `meta-data` and `user-data` | Required, partition root | No, USB only |
| `hook.sh` | Optional, partition root | Optional, keep-OOBE network fallback |
| `.deb` packages | Optional, `debs/` | Yes, served APT tree |
| Firmware (`.cab`/`.cap`) | Optional, `firmware/` | Yes, LVFS mirror or signbinpack directory |
| `apt-repo.url`, `apt-packages.txt`, `lvfs-mirror.url` | Optional | N/A |

### OEMDATA URL and list files

`hook.sh` reads these optional files from the OEMDATA partition root.

| File | Format and behavior |
| --- | --- |
| `apt-repo.url` | One line with the full base URL of the APT repository (the parent of `Packages.gz`), for example `http://192.168.1.1:8080/deb-repo/`; not the bare host root. `hook.sh` records it in `/etc/apt/sources.list.d/oem-local.list`. If omitted, no additional OEM APT source is configured (the example full mirror from `MIRROR_SERVER_IP` / `MIRROR_SERVER_PORT` is still configured). |
| `apt-packages.txt` | One package name or `.deb` file name per line, for example `nvidia-spark-ota-check`. If omitted but `apt-repo.url` is present, `hook.sh` adds the source and runs a single-source apt upgrade against that repository only. |
| `lvfs-mirror.url` | One line with the base URL of a directory of `.cab`/`.cap` files, for example `http://192.168.1.1:8080/lvfs-mirror/signbinpack-2.152.3-release/`. `hook.sh` reads the directory listing and runs `fwupdmgr install` for each file. If omitted, this additional firmware directory is skipped. |

### Example constants

Replace these with settings that match your environment (`192.168.1.1:8080` is the example local server address in `user-data` and `hook.sh`).

| Item | Example value |
| --- | --- |
| Desktop or server IP | 192.168.1.1 |
| Python HTTP server port | 8080 |
| Web root | `/var/www` or for example `$HOME/oem-server` |
| APT subdirectory | `deb-repo` under `WEB_ROOT` |
| LVFS subdirectory | `lvfs-mirror` under `WEB_ROOT` |

### Host tools

- USB OEMDATA partition: `gdisk` (for `sgdisk`), `dosfstools` (for `mkfs.vfat`), `util-linux` (for `lsblk` and `wipefs`).
- Minimal APT repository: `dpkg-dev` (`dpkg-scanpackages`). HTTP server: `python3`. Download and URL checks: `wget` or `curl`. Optional `guids.txt` workflow and the final firmware check in `hook.sh`: `jq`. On DGX Spark: `fwupdtool` and `fwupdmgr`. Full mirror: `apt-mirror` and the Python packages listed in the procedure.

### Reference scripts and the mirror layout

| Script | Purpose |
| --- | --- |
| `hook.sh` | Runs from the OEMDATA partition (or a network URL) at first boot: switches to the local APT and LVFS mirror endpoints, installs `debs/` and `firmware/` content and URL-file sources, refreshes fwupd, applies remaining APT and firmware upgrades, then restores stock APT sources and re-enables the public LVFS remote. Exit code 0 = success with no updates in the final pass, 1 = success with at least one applied, 255 = failure. |
| `spark-mirror-sync.sh` | Mirrors Ubuntu ports (noble-proposed by default, via `apt-mirror`) and LVFS content (via `sync-pulp.py`) under `MIRROR_ROOT` (default `/root/mirror` with sudo and without `-H`); options `--install-deps`, `--install-apt-mirror`, `--skip-apt`, `--skip-lvfs`, `LVFS_CLEANUP=1`; passes `--guid-file` automatically when `$MIRROR_ROOT/guids.txt` exists. |

Client URL patterns must match the server layout: apt `http://SERVER_IP:8080/apt/mirror/ports.ubuntu.com/ubuntu-ports/`; fwupd `MetadataURI=http://SERVER_IP:8080/lvfs/<metadata-file>` and `FirmwareBaseURI=http://SERVER_IP:8080/lvfs`.

## Notes

- Warning (official): do not use the default username and password in production deployments. Remove the default credentials or replace them with credentials approved by your organization. The user-creation `user-data` example stores the `chpasswd` password as cleartext on the FAT32 volume; anyone with physical access can read it.
- Keep the OEMDATA volume and any required local mirror reachable during first boot. Provisioning can take several minutes (packages, firmware, APT / fwupd metadata, `hook.sh`); do not power off or disconnect required media until it completes.
- Re-flashing with a recovery image is destructive: it erases local storage on the target system. Back up first and confirm the image and target.
- Known issue (from the previous revision of this page): when cloud-init runs on a customer-specific FastOS image, it can take approximately 400 seconds while waiting for dashboard-admin to release the APT lock at `/var/lib/apt/lists/lock`. The October 2026 revision of the official page no longer states this; treat it as unconfirmed for the current release.
- Verify: installation of `nvidia-spark-cloud-init` is logged in `/var/log/oem-iso-cfg.log`; cloud-init writes `user-data` and executor output to `/var/log/cloud-init-output.log`.
- Security: the `hook.sh` runs with elevated privileges and executes OEMDATA content (treat the USB drive as trusted input); the local APT repository is added with `[trusted=yes]` (no signature verification); firmware installed with `OnlyTrusted=false` accepts unverified binaries; URLs on the USB drive identify servers and are a man-in-the-middle risk; harden the mirror host and consider an isolated installation network. The keep-OOBE network fallback downloads `hook.sh` over HTTP and runs it as root, so use it only on a trusted installation network.
- The `sync-pulp.py` download in the official mirror procedure uses the upstream `master` branch URL (`https://gitlab.com/fwupd/lvfs-website/raw/master/contrib/sync-pulp.py`); inspect it before running.
- Revision difference: the previous revision of this page (July 2026) described `repack_baseos.sh` / `repack_fastos.sh` repacking of a BaseOS ISO or FastOS tarball with a cloud-init seed. The October 2026 revision of this page no longer mentions those scripts and uses native cloud-init with an OEMDATA volume instead, while the [Enterprise Lifecycle Integration](./enterprise-fleet-lifecycle.md) page still says "repacked BaseOS media". Both are kept as published; follow the October 2026 procedure above for the October 2026 Release or later.
- Release notes: October 2026 Release added native cloud-init support; July 2026 added DHCP, HTTP, and TFTP network protocol support and FastOS recovery image customization (per https://docs.nvidia.com/dgx/dgx-spark/release-notes.html).
- Source: https://docs.nvidia.com/dgx/dgx-spark/enterprise-custom-install.html (retrieved 2026-11-14). This page is a distilled summary; the official page also carries the complete `hook.sh`, both `user-data` examples, the `guids.txt` partial LVFS sync procedure, and an OEMDATA-on-recovery-media script.

## Related

- [Enterprise Manageability](./enterprise-manageability.md)
- [Enterprise Lifecycle Integration](./enterprise-fleet-lifecycle.md)
- [System Recovery](../system-update/system-recovery.md)
- [PXE Boot Setup](../provisioning/pxe.md)
