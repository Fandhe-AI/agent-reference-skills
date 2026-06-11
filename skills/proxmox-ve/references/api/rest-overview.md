# REST API Overview

Proxmox VE exposes its full management functionality through a RESTful HTTP API on port 8006. Every action available in the web UI is accessible via the API.

## Signature / Usage

```
Base URL: https://<host>:8006/api2/json/
```

Response format is specified in the URL path: `json` (default), `extjs`, `html`, `text`.

## Authentication

### Ticket Cookie (Session-based)

1. POST credentials to `/access/ticket` to obtain a signed ticket.
2. Pass the ticket via `PVEAuthCookie` cookie on subsequent requests.
3. For write operations (POST/PUT/DELETE), include the `CSRFPreventionToken` header.
4. Tickets expire after 2 hours.

```bash
# Obtain ticket
curl -k -d "username=root@pam&password=secret" \
  https://<host>:8006/api2/json/access/ticket
```

### API Token (Stateless)

Tokens are created per user and do not require CSRF tokens. Suitable for automation.

```bash
# Create token
pveum user token add root@pam mytoken --privsep=0

# Use token
curl -k -H "Authorization: PVEAPIToken=root@pam!mytoken=<uuid>" \
  https://<host>:8006/api2/json/nodes
```

## Endpoint Groups

| Group | Path Prefix | Purpose |
|-------|-------------|---------|
| Nodes | `/nodes/{node}` | Per-node resources: VMs, containers, storage, tasks |
| Cluster | `/cluster` | Cluster-wide config, HA, replication, metrics |
| Access | `/access` | Users, groups, roles, ACLs, tickets |
| Storage | `/storage` | Storage pool definitions |
| Pools | `/pools` | Resource pool management |
| Version | `/version` | Cluster API version |

## pvesh — CLI Access to the API

`pvesh` provides direct API access from the command line on any Proxmox node (requires root). Calls are automatically proxied to the correct cluster member via SSH.

```bash
# Explore available paths
pvesh ls /nodes
pvesh ls /nodes/<node>/qemu

# Read operations
pvesh get /nodes/<node>/qemu
pvesh get /nodes/<node>/status

# Write operations
pvesh create /nodes/<node>/qemu --vmid 100 --memory 2048 --net0 virtio,bridge=vmbr0
pvesh set /cluster/options --console html5
pvesh delete /nodes/<node>/qemu/100

# Inspect API documentation for a path
pvesh usage /nodes/{node}/qemu -v

# Output formatting
pvesh get /nodes --output-format json-pretty
pvesh get /nodes --human-readable
```

### pvesh Commands

| Command | HTTP Method | Description |
|---------|-------------|-------------|
| `ls` | — | List child paths at an API endpoint |
| `get` | GET | Retrieve data |
| `create` | POST | Create or trigger an action |
| `set` | PUT | Update a resource |
| `delete` | DELETE | Remove a resource |
| `usage` | — | Show API docs for a path |

## Response Format

All JSON responses follow this envelope:

```json
{
  "data": { ... }
}
```

Errors return an HTTP status code ≥ 400 with a `errors` key.

## Notes

- The API is versioned per major release. An API call working in 6.0 works in 6.4 without changes; breaking changes only occur across major versions.
- `pveproxy` (port 8006, external) forwards privileged operations to `pvedaemon` (port 85, localhost-only). Never expose port 85 externally.
- The interactive API viewer is available at `https://<host>:8006/api2/` (JavaScript SPA); offline exploration is possible via `pvesh ls` and `pvesh usage`.

## Related

- [QEMU VM Endpoints](./endpoints-qemu.md)
- [LXC Container Endpoints](./endpoints-lxc.md)
- [Cluster & Node Endpoints](./endpoints-cluster.md)
- [Access & Storage Endpoints](./endpoints-access-storage.md)
