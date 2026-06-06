# Logging

gws supports two independent logging channels: stderr output and JSON file logs.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `GOOGLE_WORKSPACE_CLI_LOG` | off | stderr log level filter. Uses Rust's `RUST_LOG` directive syntax. |
| `GOOGLE_WORKSPACE_CLI_LOG_FILE` | off | Directory path for JSON log files. Logs rotate daily. |

## Stderr Logging

```sh
# Enable debug-level logs for gws on stderr
GOOGLE_WORKSPACE_CLI_LOG=gws=debug gws drive list
```

The value follows standard Rust tracing filter syntax: `target=level` (e.g. `gws=debug`, `gws=info`, `gws=trace`).

## JSON File Logging

```sh
# Write JSON logs to /var/log/gws/
GOOGLE_WORKSPACE_CLI_LOG_FILE=/var/log/gws gws drive list
```

Log files are created in the specified directory with automatic daily rotation.

## Notes

- Both variables are off by default; setting either one activates that channel independently.
- `GOOGLE_WORKSPACE_CLI_LOG` writes human-readable output to stderr.
- `GOOGLE_WORKSPACE_CLI_LOG_FILE` writes structured JSON to files, suited for log aggregation systems.

## Related

- [env-vars.md](./env-vars.md)
