---
source: https://docs.cloud.google.com/filestore/docs/mounting-fileshares
---

# Mount file shares on Compute Engine VMs

Mount a Filestore file share on a Compute Engine VM in the same project and VPC network, on Linux (`mount`, `/etc/fstab`, `autofs`) or Windows. A `n1-standard-8` VM or greater is recommended for optimal performance.

## Signature / Usage

Before you begin, configure firewall rules (https://docs.cloud.google.com/filestore/docs/configuring-firewall).

### Install the NFS client

```bash
sudo apt-get -y update &&
sudo apt-get install nfs-common
```

```bash
sudo yum update &&
sudo yum install nfs-utils
```

```bash
sudo zypper update &&
sudo zypper -n install nfs-client
```

### Linux: mount

The share is unmounted when the VM reboots; use `fstab` or `autofs` to persist.

```bash
sudo mkdir -p mount-point-directory
sudo mount -o rw ip-address:/file-share mount-point-directory
```

Example for instance IP `10.0.1.2`, share `share1`, mount point `/mnt/render`:

```bash
sudo mount 10.0.1.2:/share1 /mnt/render
```

Confirm:

```bash
df -h --type=nfs
```

Mount through a secondary NIC (not `nic0`):

```bash
sudo ip route \
    add filestore-reserved-address-range \
    via default-gateway-of-nic-to-filestore
```

### Linux: /etc/fstab

Add this line (example: IP `10.0.0.2`, share `vol1`, mount point `/mnt`), then mount everything:

```text
ip-address:/file-share mount-point-directory nfs options,_netdev 0 0
10.0.0.2:/vol1 /mnt nfs defaults,_netdev 0 0
```

```bash
sudo mount -a
```

### Linux: autofs

```bash
sudo apt-get install autofs
sudo systemctl enable --now autofs
sudo mkdir -p mount-point-directory
```

In `/etc/auto.master` (timeout default `300`; `0` disables unmounting) and `/etc/auto.nfs` (example):

```text
/nfs /etc/auto.nfs --timeout seconds
file-shares -rw 10.0.0.2:/vol1
```

```bash
sudo service autofs reload
ls /nfs/file-shares
```

### Windows

In an administrator PowerShell install the client, set anonymous UID/GID registry values, restart the NFS client, then map the share from a standard session:

```powershell
Install-WindowsFeature -Name NFS-Client
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\ClientForNFS\CurrentVersion\Default" `
    -Name "AnonymousUid" -Value "0" -PropertyType DWORD
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\ClientForNFS\CurrentVersion\Default" `
    -Name "AnonymousGid" -Value "0" -PropertyType DWORD
nfsadmin client stop
nfsadmin client start
```

```bat
net use Z: \\10.0.0.2\vol1
```

### Subdirectories

```bash
sudo mkdir -p mount-point-directory/file-share-sub-dir
sudo umount mount-point-directory
sudo mount 10.0.0.2:/vol1/nfs /mnt/nfs
```

## Options / Props

Recommended NFS `mount` options:

| Option | Description |
|---|---|
| `hard` | Retry NFS requests indefinitely; recommended for Linux and Windows clients to reduce I/O disruption on instance reboot |
| `timeo=600` | Wait 600 deciseconds (60 seconds) before retrying |
| `retrans=3` | Three attempts before further recovery |
| `rsize=524288` | Max bytes per `READ`; set `1048576` for basic-tier instances |
| `wsize=524288` | Max bytes per `WRITE` |
| `resvport` | Privileged source port |
| `async` | Delay sending writes; `sync` significantly reduces performance |
| `-o tcp` | Reduces mounting latency (recommended for automounting) |

`nconnect` (Linux kernel 5.3+; regional, zonal, enterprise):

| Tier | Capacity | Connections |
|---|---|---|
| Regional, zonal | 1-9.75 TiB | `nconnect=2` |
| Regional, zonal | 10-100 TiB | `nconnect=7` |
| Basic SSD | - | `nconnect=7` |
| Enterprise | - | `nconnect=2` |
| High scale SSD | - | `nconnect=7` |

## Notes

- The IP address and share name come from the Filestore instances page, the `IP_ADDRESS` field of `filestore instances list`, or the `ipAddresses` section of `filestore instances describe`.
- NFS file locking may require setting `statd` / `nlockmgr` ports and firewall rules (https://docs.cloud.google.com/filestore/docs/setting-nfs-ports). On Windows, locking needs `nfsadmin client config protocol=tcp UseReservedPorts=yes` and matching firewall rules.
- Setting Windows `AnonymousUid` / `AnonymousGid` to `0` maps anonymous access to root; combine with IP-based access rules and root squash as appropriate.
- Optimize read throughput with `read_ahead_kb`: https://docs.cloud.google.com/filestore/docs/performance#read-ahead-kb
- The source also covers Windows multi-NIC routing (`route -p add`) and the `/etc/fstab` multi-NIC network configuration. For GKE use the Filestore CSI driver; for remote clients see https://docs.cloud.google.com/filestore/docs/remote-mounting
- Source inconsistency: the `nconnect` recommendation is scoped to regional, zonal and enterprise instances, but its table also lists Basic SSD and the former High scale SSD tier.
- Filestore is NFS file storage, not an object API; distinct from Cloud Storage and Cloud Storage FUSE.
- Source: https://docs.cloud.google.com/filestore/docs/mounting-fileshares (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [creating-instances.md](./creating-instances.md)
- [limits.md](./limits.md)
