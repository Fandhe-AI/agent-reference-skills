# pct.conf — Container Configuration File

Configuration file for LXC containers managed by Proxmox VE.

**Path:** `/etc/pve/lxc/<CTID>.conf`

## Signature / Usage

```
OPTION: value
```

Each line is a colon-separated key-value pair. Blank lines and lines starting with `#` are treated as comments. Low-level LXC directives can also be placed directly using `lxc.<key> = <value>` syntax.

```ini
# Example container config
hostname: mycontainer
arch: amd64
ostype: ubuntu
memory: 1024
swap: 512
cores: 2
unprivileged: 1
onboot: 1
rootfs: local-lvm:vm-200-disk-0,size=8G
net0: name=eth0,bridge=vmbr0,ip=dhcp,firewall=1
```

## Options / Props

### Identity & OS

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `hostname` | string | — | Container hostname |
| `ostype` | enum | — | OS type for setup scripts: `debian`, `ubuntu`, `centos`, `fedora`, `opensuse`, `archlinux`, `alpine`, `gentoo`, `nixos`, `devuan`, `unmanaged` |
| `arch` | enum | amd64 | Container architecture: `amd64`, `arm64`, `armhf`, `i386`, `riscv32`, `riscv64` |
| `description` | string | — | Free-text description shown in the web UI |
| `tags` | string | — | Semicolon-separated metadata tags |
| `timezone` | string | — | Timezone inside the container; `host` to inherit from node, or a zoneinfo path (e.g., `Europe/Berlin`) |

### CPU

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `cores` | integer (1–8192) | unlimited | Number of CPU cores assigned to the container |
| `cpulimit` | float (0–8192) | 0 | Hard CPU usage cap in CPU units; 0 = unlimited |
| `cpuunits` | integer (0–500000) | 1024 (cgv1) / 100 (cgv2) | Relative CPU scheduling weight |

### Memory

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `memory` | integer (MB) | 512 | Maximum RAM for the container |
| `swap` | integer (MB) | 512 | Swap space; 0 to disable |

### Storage

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `rootfs` | complex | — | Root filesystem volume; required |
| `mp[n]` | complex | — | Additional mount points (n: 0–255) |
| `unused[n]` | volume | — | Detached/unused volumes; managed internally |

`rootfs` format: `[volume=]<volume>[,acl=1][,idmap=<mapping>][,mountoptions=<opt;...>][,quota=1][,replicate=1][,ro=1][,shared=1][,size=<DiskSize>]`

`mp[n]` format adds `mp=<Path>` and `backup=0|1` to the same sub-options as `rootfs`.

Mount sub-options:

| Sub-option | Values | Description |
|------------|--------|-------------|
| `size` | DiskSize | Volume size (e.g., `8G`) |
| `acl` | `0\|1` | Enable POSIX ACL support |
| `ro` | `0\|1` | Mount read-only |
| `quota` | `0\|1` | Enable user/group quotas |
| `backup` | `0\|1` | Include in vzdump backups |
| `replicate` | `0\|1` | Include in storage replication |
| `shared` | `0\|1` | Mark as pre-shared across nodes |
| `idmap` | mapping | UID/GID mapping for unprivileged containers |
| `mountoptions` | string | Semicolon-separated extra mount options |

### Network

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `net[n]` | complex | — | Network interface definition (n: 0–N) |

`net[n]` format: `name=<ifname>,bridge=<bridge>,hwaddr=<MAC>,firewall=1,ip=dhcp|<CIDR>|manual,gw=<IPv4>,ip6=auto|dhcp|<CIDR>|manual,gw6=<IPv6>,tag=<1-4094>,rate=<Mbps>,mtu=<int>,type=veth`

| Sub-option | Description |
|------------|-------------|
| `name` | Interface name inside the container (required) |
| `bridge` | Host bridge device (e.g., `vmbr0`) |
| `hwaddr` | MAC address |
| `ip` / `ip6` | IPv4/IPv6 address or `dhcp`/`auto`/`manual` |
| `gw` / `gw6` | Default gateway |
| `firewall` | Enable Proxmox firewall rules |
| `rate` | Bandwidth limit in Mbps |
| `tag` | VLAN tag (1–4094) |

### DNS

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `nameserver` | string | — | DNS server IP address(es) |
| `searchdomain` | string | — | DNS search domain(s) |

### Console & TTY

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `console` | boolean | 1 | Attach `/dev/console` device to the container |
| `cmode` | `console\|shell\|tty` | tty | Default `pct console` mode |
| `tty` | integer (0–6) | 2 | Number of TTY devices available |

### Boot & Lifecycle

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onboot` | boolean | 0 | Start container automatically at node boot |
| `startup` | complex | — | Startup/shutdown ordering: `order=<n>,up=<sec>,down=<sec>` |
| `protection` | boolean | 0 | Prevent accidental CT deletion or disk modification |
| `template` | boolean | 0 | Mark as a template (disables start) |
| `lock` | enum | — | Internal lock state: `backup`, `create`, `migrate`, `snapshot`, etc. |
| `hookscript` | string | — | Script path (`<storage>:snippets/<file>`) run at CT lifecycle events |

### Security & Features

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `unprivileged` | boolean | 0 | Run as an unprivileged container (uid/gid mapping, no root on host) |
| `features` | complex | — | Advanced feature grants |

`features` sub-options:

| Sub-option | Values | Description |
|------------|--------|-------------|
| `nesting` | `0\|1` | Allow nested virtualisation / container-in-container |
| `fuse` | `0\|1` | Allow FUSE mounts inside the container |
| `keyctl` | `0\|1` | Allow `keyctl()` syscall (needed for some apps) |
| `mknod` | `0\|1` | Allow `mknod()` for privileged devices |
| `mount` | fstype list | Allow mounting specific filesystem types (e.g., `nfs;cifs`) |
| `force_rw_sys` | `0\|1` | Mount `/sys` read-write instead of read-only |

### Device Passthrough

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dev[n]` | complex | — | Pass a host device into the container |

`dev[n]` format: `[path=]<Path>[,deny-write=1][,gid=<gid>][,mode=<octal>][,uid=<uid>]`

### Init & Runtime

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `entrypoint` | string | `/sbin/init` | Init command with optional arguments |
| `debug` | boolean | 0 | Verbose debug logging on container start |

### Low-Level LXC

| Name | Type | Description |
|------|------|-------------|
| `lxc[n]` | key=value | Raw LXC configuration lines passed through directly (advanced use) |

## Notes

- Container IDs below 100 are reserved for internal Proxmox use.
- `unprivileged: 1` is strongly recommended for untrusted workloads; it maps container root (uid 0) to an unprivileged host uid.
- Mount points must not contain symlinks for security reasons.
- `shared: 1` on a mount point only marks it as already shared — it does not automatically share the storage across nodes.
- Most options take effect on next container start; running containers can be modified live for some options via `pct set`.
- Use `pct set <ctid> --<option> <value>` rather than editing the file directly while the container is running.

## Related

- [qm-conf.md](./qm-conf.md) — QEMU VM configuration file format
- [datacenter-cfg.md](./datacenter-cfg.md) — Datacenter-wide configuration
