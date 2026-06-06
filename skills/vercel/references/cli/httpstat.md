# vercel httpstat

Visualize HTTP request timing statistics for Vercel deployments with automatic deployment protection bypass. Beta command.

## Signature / Usage

```bash
vercel httpstat /api/hello
vercel httpstat /api/users -- -X POST -H "Content-Type: application/json" -d '{}'
vercel httpstat /api/status --deployment https://my-app-abc123.vercel.app
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--deployment` | | Specific deployment ID or URL (default: production deployment) |
| `--protection-bypass` | | Manual bypass secret; alternatively set `VERCEL_AUTOMATION_BYPASS_SECRET` |
| `--yes` | `-y` | Skip link confirmation prompt |

## Notes

- Requires `httpstat` to be installed (`pip install httpstat` or `brew install httpstat`)
- Place `--` before flags intended for the underlying `httpstat` command
- Available in Vercel CLI v48.9.0+
- Output shows: DNS Lookup, TCP Connection, TLS Handshake, Server Processing, Content Transfer timings

## Related

- [curl.md](./curl.md)
- [traces.md](./traces.md)
