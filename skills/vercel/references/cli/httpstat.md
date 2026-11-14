# vercel httpstat

Visualize HTTP request timing statistics for Vercel deployments with automatic deployment protection bypass. Beta command.

## Signature / Usage

```bash
vercel httpstat /api/hello
vercel httpstat /api/users -- -X POST -H "Content-Type: application/json" -d '{}'
vercel httpstat /api/status --deployment https://my-app-abc123.vercel.app
vercel httpstat /api/hello --protection-bypass your-secret-here
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--deployment` | | Specific deployment ID or URL (default: production deployment) |
| `--protection-bypass` | | Manual bypass secret; alternatively set `VERCEL_AUTOMATION_BYPASS_SECRET` |
| `--yes` | `-y` | Skip link confirmation prompt; use in non-interactive environments like CI |

## Notes

- Requires `httpstat` to be installed (`pip install httpstat` or `brew install httpstat`)
- Place `--` before flags intended for the underlying `httpstat` command
- Available in Vercel CLI v48.9.0+
- `--deployment` needs no linked project and the deployment can belong to any accessible team (with `--scope`, it must belong to that team); the CLI creates a new bypass token only when the deployment belongs to the linked project, otherwise it uses the existing token of the deployment's project (create one manually in Settings > Deployment Protection > Protection Bypass for Automation if none exists)
- Each run times one request; run the command repeatedly to compare timings
- Errors: `httpstat` not found (install it), no deployment URL found (run `vercel link` and `vercel deploy`), failed to get bypass token (create a secret manually), no deployment found for ID (check ID/URL, team access, not deleted)
- Output shows: DNS Lookup, TCP Connection, TLS Handshake, Server Processing, Content Transfer timings
- Source: https://vercel.com/docs/cli/httpstat (fetched 2026-11-14)

## Related

- [curl.md](./curl.md)
- [traces.md](./traces.md)
