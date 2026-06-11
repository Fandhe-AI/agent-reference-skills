# Installation

Install Proxmox VE from a hybrid ISO image (recommended) or on top of an existing Debian system. The installer handles partitioning, timezone/network configuration, and package setup.

## Signature / Usage

```bash
# Access web UI after installation
https://<IP>:8006
```

## Options / Props

### Installer disk layout options (LVM)

| Parameter | Description |
|-----------|-------------|
| `hdsize` | Total disk space to use |
| `swapsize` | Swap volume size (default: 4–8 GB) |
| `maxroot` | Maximum size for OS root volume |
| `maxvz` | Maximum size for VM data volume |

### ZFS options

| Parameter | Description |
|-----------|-------------|
| `ashift` | Sector size exponent (12 = 4 KB sectors) |
| `compress` | Compression algorithm (lz4, gzip, zstd) |
| `checksum` | Data integrity verification level |
| `copies` | Number of data copies across vdevs |

### BTRFS options

| Parameter | Description |
|-----------|-------------|
| Compression | zlib, lzo, or zstd |
| Reserved space | Allows future manual partition additions |

## Notes

- All existing data on target disk is erased during installation
- ZFS on hardware RAID is unsupported and risks data loss; use ZFS directly on raw disks
- Secure Boot must be disabled for installer versions before 8.1
- ZFS works best with plenty of RAM: ~4 GB base + 1 GB per TB of raw storage
- Advanced users can install on existing Debian, but this requires detailed knowledge of PVE internals
- After installation, log in to the web interface at `https://<IP>:8006` with root credentials set during setup

## Related

- [cluster.md](./cluster.md)
- [storage.md](./storage.md)
