# pvesh

Proxmox VE API Shell. Directly invokes Proxmox REST API endpoints from the command line without going through the HTTPS server.

## Signature / Usage

```bash
pvesh <COMMAND> <api-path> [OPTIONS]
pvesh help [<COMMAND>]
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `get <path>` | Execute GET request (read/list resource) |
| `create <path>` | Execute POST request (create resource) |
| `set <path>` | Execute PUT request (update resource) |
| `delete <path>` | Execute DELETE request (remove resource) |
| `ls <path>` | List child endpoints at a given API path |
| `usage <path>` | Show API usage/schema for a path |

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--output-format` | enum | Output style: `json`, `json-pretty`, `text`, `yaml` (default: `text`) |
| `--human-readable` | boolean | Format dates and byte sizes for readability |
| `--noproxy` | boolean | Disable automatic request proxying |
| `--quiet` | boolean | Suppress output |
| `--noborder` | boolean | Remove borders from text table output |
| `--noheader` | boolean | Remove header row from text table output |
| `--verbose` | boolean | Detailed output (for `usage` subcommand) |

## Notes

- Most operations require root privileges on the local node.
- `pvesh` bypasses the HTTPS REST API and calls the API handlers directly; useful for scripting and automation.
- API paths mirror the web UI structure (e.g. `/nodes/pve1/qemu/100/status/start`).
- Use `pvesh ls /` to explore the available API tree.
- Use `pvesh usage <path> --verbose` to see all parameters for a given endpoint.

## Related

- [pveum.md](./pveum.md)
- [pvenode.md](./pvenode.md)
