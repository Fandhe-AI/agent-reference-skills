# misc-cli

Miscellaneous Proxmox VE CLI tools: `pveperf`, `pvesubscription`, and `qmrestore`.

---

## pveperf

Proxmox VE performance benchmark script. Measures CPU and disk performance on the specified path.

### Signature / Usage

```bash
pveperf [PATH]
```

`PATH` defaults to `/` if not specified.

### Metrics Reported

| Metric | Description |
|--------|-------------|
| CPU BOGOMIPS | Combined CPU processing power |
| REGEX/SECOND | Perl regex throughput (target: >300,000) |
| HD SIZE | Storage capacity |
| BUFFERED READS | Disk read speed in MB/s (target: ≥40 MB/s) |
| AVERAGE SEEK TIME | Disk seek latency in ms |
| FSYNCS/SECOND | Write sync rate (target: >200) |
| DNS EXT | External DNS resolution latency |
| DNS INT | Internal/local DNS resolution latency |

---

## pvesubscription

Proxmox VE Subscription Manager. Manages the Proxmox VE support subscription key on a node.

### Signature / Usage

```bash
pvesubscription <COMMAND> [OPTIONS]
```

### Subcommands

| Subcommand | Description |
|------------|-------------|
| `get` | Show current subscription status and details |
| `set <key>` | Install a subscription key |
| `delete` | Remove the subscription key |
| `update` | Refresh subscription data from the server |

### Options / Props

| Name | Type | Description |
|------|------|-------------|
| `<key>` | string | Subscription key (format: `pve[1248][cbsp]-[0-9a-f]{10}`) |
| `--force` | boolean | Force server refresh even if local cache is valid (default: 0) |

### Notes

- Run `pvesubscription update` after setting a key to activate the enterprise repository.
- `pvesubscription get` returns `NotFound` if no key is installed.

---

## qmrestore

Restore a QEMU/KVM VM from a vzdump backup archive. Volumes are allocated on the original storage unless overridden.

### Signature / Usage

```bash
qmrestore <archive> <vmid> [OPTIONS]
qmrestore help
```

| Argument | Description |
|----------|-------------|
| `<archive>` | Path to backup file, or `-` to read from stdin |
| `<vmid>` | Target VM ID (100–999999999) |

### Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--storage` | string | Default storage for restored volumes |
| `--force` | boolean | Overwrite existing VM with same ID |
| `--unique` | boolean | Generate new random MAC addresses |
| `--start` | boolean | Start VM immediately after restore |
| `--live-restore` | boolean | Start VM while restore runs in background (PBS only) |
| `--ha-managed` | boolean | Register restored VM as an HA resource |
| `--pool` | string | Assign to a resource pool |
| `--bwlimit` | integer | I/O bandwidth limit in KiB/s |

### Notes

- `qmrestore` is functionally equivalent to `qm create --archive <file>`.
- `--live-restore` is only supported with Proxmox Backup Server (PBS) sources.
- For LXC container restore, use `pct restore` (alias for `pct create` with an archive).

---

## Related

- [vzdump.md](./vzdump.md)
- [qm.md](./qm.md)
- [pct.md](./pct.md)
- [pvesm.md](./pvesm.md)
