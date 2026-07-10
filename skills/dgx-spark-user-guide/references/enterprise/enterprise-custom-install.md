# Custom Installation with Cloud-Init

Reference material for customizing DGX Spark deployments using Cloud-Init, USB installation media, and local hosting of Debian packages and firmware. Implements the initial provisioning stage of enterprise lifecycle integration for air-gapped and on-premises-mirror scenarios.

## Signature / Usage

```bash
# 1. Repack BaseOS ISO with OEM Cloud-Init seed
./repack_baseos.sh

# 2. Write ISO to USB, then add an OEMDATA partition in free space
sudo parted "$USB" print
sudo parted -s "$USB" mkpart primary 14GiB 100%
# format new partition as ext4 labeled OEMDATA

# 3. Host a local package repository (minimal desktop example)
dpkg-scanpackages . /dev/null | gzip -9c > Packages.gz
python3 -m http.server 8000

# 4. Full mirror sync (Ubuntu Ports + LVFS)
./spark-mirror-sync.sh
```

## Key Concepts

- **Installation media architecture**: a repacked BaseOS ISO written to USB, plus an optional additional `OEMDATA` partition containing Debian packages, firmware, and configuration scripts. Cloud-Init runs `hook.sh` on first boot while the installation media remains connected.
- **OEMDATA partition structure**: `hook.sh` (OEM installation script), `debs/` (Debian packages), `firmware/` (`.cab`/`.cap` files), optional URL configuration files.
- **Deployment patterns**: ISO-only customization, USB-hosted packages/firmware, or local server mirrors (minimal or full Ubuntu Ports + LVFS content).

## Options / Props

| Script | Purpose |
| --- | --- |
| repack_baseos.sh | Repacks BaseOS ISO with OEM Cloud-Init configuration |
| oem-iso-cfg.sh | Runs during installation (ISO mounted at `/cdrom`) to apply customizations |
| hook.sh | Executes on first boot to install packages and firmware from OEMDATA |
| spark-mirror-sync.sh | Synchronizes Ubuntu Ports and LVFS content to a local mirror server |

## Example Configuration Constants

| Setup | Values |
| --- | --- |
| Full mirror server | host `spark-3ef8`, IP `10.111.54.206`, port `8080`, credentials `nvidia`/`nvidia` |
| Minimal desktop repository | IP `10.111.55.241`, port `8000`, subdirectories `deb-repo` and `lvfs-mirror` |

## Validation Scenarios

1. **Customized BaseOS ISO** — repack image with Cloud-Init OEM seed, verify customizations present post-install.
2. **Air-gapped USB installation** — prepare USB with OEMDATA partition, host local packages/firmware, configure client with `hook.sh`, install and verify.
3. **Local repository + OTA updates** — host curated APT repository, point Cloud-Init configuration to local mirror, verify device receives expected package updates.

## Notes

- USB drive physical access allows content replacement; treat as a supply-chain risk.
- Local APT repository uses `[trusted=yes]` (no signature verification); firmware installation with `OnlyTrusted=false` accepts unverified binaries.
- URLs stored on USB drives identify network servers and are a MITM attack vector; harden mirror-host network exposure.

## Related

- [Enterprise Manageability](./enterprise-manageability.md)
- [Enterprise Lifecycle Integration](./enterprise-fleet-lifecycle.md)
