# datacenter.cfg — Datacenter Configuration File

Cluster-wide default settings for a Proxmox VE datacenter.

**Path:** `/etc/pve/datacenter.cfg`

## Signature / Usage

```
OPTION: value
```

Each line is a colon-separated key-value pair. Blank lines and lines starting with `#` are treated as comments. This file applies to all nodes in the cluster.

```ini
# Example datacenter.cfg
keyboard: en-us
language: en
email_from: admin@example.com
migration: type=secure
fencing: watchdog
mac_prefix: BC:24:11
```

## Options / Props

### UI & Localisation

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `language` | enum | — | Web GUI language: `en`, `de`, `fr`, `zh-cn`, `ja`, and others |
| `keyboard` | enum | — | VNC server keyboard layout (e.g., `en-us`, `de`, `fr`, `ja`) |
| `console` | enum | — | Default console viewer: `applet`, `html5`, `vv` (Virt-Viewer), `xtermjs` |
| `description` | string | — | Datacenter description shown in the web UI summary |
| `consent-text` | string | — | Text displayed to users before login |

### Networking

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `mac_prefix` | string | `BC:24:11` | MAC address prefix applied to all auto-generated virtual NIC addresses |
| `http_proxy` | URL | — | External HTTP proxy for package downloads and APT updates |

### Migration & Replication

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `migration` | complex | `type=secure` | Default live migration settings |
| `replication` | complex | `type=secure` | Default storage replication settings |

`migration` sub-options:

| Sub-option | Values | Description |
|------------|--------|-------------|
| `type` | `secure\|insecure` | Use encrypted (SSH tunnel) or plain migration channel |
| `network` | CIDR | Restrict migration traffic to a specific network |

`replication` sub-options mirror `migration` (`type`, `network`).

### High Availability

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ha` | complex | — | HA manager behaviour |
| `fencing` | enum | `watchdog` | HA fencing mode: `watchdog`, `hardware`, `both` |

`ha` sub-options:

| Sub-option | Values | Description |
|------------|--------|-------------|
| `shutdown_policy` | `conditional\|failover\|freeze\|migrate` | What HA does when a node is shut down |

Fencing modes:
- `watchdog` — software watchdog only (default, supported everywhere)
- `hardware` — external IPMI/BMC fencing (requires hardware setup)
- `both` — watchdog + hardware (experimental)

### Cluster Resource Scheduling

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `crs` | complex | — | Cluster Resource Scheduler settings |

`crs` sub-options:

| Sub-option | Values | Description |
|------------|--------|-------------|
| `ha` | `basic\|static\|dynamic` (default `basic`) | How the HA Manager selects nodes to start or recover services: `basic` uses only the number of services, `static` considers static CPU and memory configuration, `dynamic` considers static and dynamic CPU and memory usage |
| `ha-auto-rebalance` | boolean (default `0`) | Use CRS to balance HA resources automatically depending on the current node imbalance |
| `ha-auto-rebalance-hold-duration` | number 0-N (default `3`) | Number of HA rounds the node imbalance threshold must be exceeded before triggering an automatic balancing migration. Requires `ha-auto-rebalance` |
| `ha-auto-rebalance-margin` | number 0-100 (default `10`) | Minimum relative improvement in node imbalance, in percent, to commit to a balancing migration. Requires `ha-auto-rebalance` |
| `ha-auto-rebalance-method` | `bruteforce\|topsis` (default `bruteforce`) | Method used to score balancing migrations. Requires `ha-auto-rebalance` |
| `ha-auto-rebalance-threshold` | number 0-100 (default `30`) | Node imbalance, in percent, which triggers automatic balancing if exceeded. Requires `ha-auto-rebalance` |
| `ha-rebalance-on-start` | boolean (default `0`) | Use CRS to select a suited node when an HA service's request-state changes from stop to start |

Format (man page): `crs: [ha=<basic|static|dynamic>] [,ha-auto-rebalance=<1|0>] [,ha-auto-rebalance-hold-duration=<number>] [,ha-auto-rebalance-margin=<number>] [,ha-auto-rebalance-method=<bruteforce|topsis>] [,ha-auto-rebalance-threshold=<number>] [,ha-rebalance-on-start=<1|0>]`

### Bandwidth Limits

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `bwlimit` | complex | — | I/O bandwidth limits in KiB/s for various operations |

`bwlimit` sub-options:

| Sub-option | Description |
|------------|-------------|
| `default` | Default limit applied to all operations not specifically set |
| `clone` | Limit for storage clone operations |
| `migration` | Limit for VM live migration data transfer |
| `move` | Limit for storage move operations |
| `restore` | Limit for backup restore operations |

Example: `bwlimit: default=10240,migration=51200`

### VMID Allocation

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `next-id` | complex | `lower=100,upper=1000000` | Auto-selected VMID range boundaries |

`next-id` sub-options: `lower=<int>,upper=<int>`

### Notifications & Email

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `email_from` | string | `root@<hostname>` | Sender address for system notification emails |
| `notify` | complex | — | Notification targets and conditions |

`notify` sub-options:

| Sub-option | Values | Description |
|------------|--------|-------------|
| `fencing` | `always\|never` | Notify when a node is fenced |
| `package-updates` | `always\|auto\|never` | Notify about available package updates |
| `replication` | `always\|error\|never` | Notify on replication job events |
| `target-fencing` | string | Notification channel name for fencing alerts |
| `target-package-updates` | string | Notification channel name for update alerts |
| `target-replication` | string | Notification channel name for replication alerts |

### Tag Management

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `registered-tags` | string | — | Space-separated list of tags that require `Sys.Modify` privilege to assign |
| `user-tag-access` | complex | `free` | Controls which users can create/assign tags |
| `tag-style` | complex | — | Tag appearance settings |

`user-tag-access` sub-options: `user-allow=free|existing|list|none`, `user-allow-list=<tag;...>`

`tag-style` sub-options: `case-sensitive=0|1`, `color-map=<tag:color:fg-color;...>`, `ordering=config|alphabetical`, `shape=full|circle|dense|none`

### Geographic Location

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `location` | complex | — | Geographic coordinates for the datacenter: `lat=<float>,lon=<float>,name=<string>` |

### Authentication

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `u2f` | complex | — | U2F two-factor authentication settings: `appid=<URL>,origin=<URL>` |
| `webauthn` | complex | — | WebAuthn/FIDO2 settings: `id=<domain>,origin=<URL>,rp=<name>` |

### Performance

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `max_workers` | integer | — | Maximum number of parallel workers per node for bulk operations |

## Notes

- `datacenter.cfg` is cluster-replicated via `pmxcfs`; edits on any node propagate automatically.
- `fencing: hardware` and `fencing: both` are marked experimental and require IPMI/BMC hardware.
- Several deprecated options exist (e.g., `migration_unsecure`); use `migration: type=insecure` instead.
- Some options have prerequisites noted in the full man page (e.g., `webauthn` requires a configured realm).
- Editing via the web UI (Datacenter > Options) is recommended to avoid syntax errors.

## Related

- [qm-conf.md](./qm-conf.md) — VM configuration file format
- [pct-conf.md](./pct-conf.md) — Container configuration file format
