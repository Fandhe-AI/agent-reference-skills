# pvecm

Proxmox VE Cluster Manager. Creates and manages clusters of Proxmox VE nodes using the Corosync Cluster Engine for reliable group communication.

## Signature / Usage

```bash
pvecm <COMMAND> [OPTIONS]
pvecm help [<COMMAND>]
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `create <clustername>` | Create a new cluster |
| `add <hostname>` | Join this node to an existing cluster |
| `nodes` | Display local view of cluster nodes |
| `status` | Display local view of cluster status |
| `delnode <node>` | Remove a node from cluster configuration |
| `addnode <node>` | Add a node to cluster config (internal use) |
| `keygen <filename>` | Generate a new cryptographic key for Corosync |
| `updatecerts` | Update node certificates and generate required files |
| `expected <votes>` | Set expected vote count for Corosync |
| `qdevice setup <address>` | Set up external Corosync QDevice |
| `qdevice remove` | Remove a configured QDevice |
| `apiver` | Show cluster join API version on this node |
| `mtunnel` | VM/CT migration tunnel (internal use) |

## Options / Props

Key options for `pvecm create`:

| Name | Type | Description |
|------|------|-------------|
| `--link[n]` | string | Corosync link address and priority (up to 8 links) |
| `--nodeid` | integer | Node ID number |
| `--votes` | integer | Number of votes for this node |
| `--token-coefficient` | integer | Corosync token timeout coefficient (default: 125) |

Key options for `pvecm add`:

| Name | Type | Description |
|------|------|-------------|
| `--link[n]` | string | Corosync link address for this node |
| `--nodeid` | integer | Node ID number |
| `--votes` | integer | Number of votes for this node |
| `--fingerprint` | string | Certificate SHA-256 fingerprint for verification |
| `--force` | boolean | Bypass error checks for existing nodes |

## Notes

- All nodes must be able to connect via UDP ports 5405–5412 for Corosync.
- SSH (TCP 22) must be open between all nodes for cluster operations.
- Date/time must be synchronized across all nodes (use NTP).
- A minimum of 3 nodes is recommended for reliable quorum in HA setups.
- Latency between cluster nodes must be under 5 ms.
- `pvecm delnode` requires quorum; use `pvecm expected` if quorum is lost.

## Related

- [pvenode.md](./pvenode.md)
- [ha-manager.md](./ha-manager.md)
- [pveum.md](./pveum.md)
