# vercel curl

Make HTTP requests to Vercel deployments with automatic deployment protection bypass. Beta command.

## Signature / Usage

```bash
vercel curl /api/hello
vercel curl /api/users -- --request POST --header "Content-Type: application/json" --data '{"name":"John"}'
vercel curl /api/status --deployment https://my-app-abc123.vercel.app
vercel curl --trace /api/hello
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--deployment` | | Specific deployment ID or URL to target (default: production deployment) |
| `--protection-bypass` | | Manual bypass secret; alternatively set `VERCEL_AUTOMATION_BYPASS_SECRET` env var |
| `--yes` | `-y` | Skip link confirmation prompt in non-interactive environments |
| `--trace` | | Capture a request trace and print trace request ID |
| `--json` | | With `--trace`: emit JSON envelope `{response, requestId}` instead of streaming |

## Notes

- Requires `curl` to be installed on the system
- Place `--` before passing flags to the underlying `curl` command
- Available in Vercel CLI v48.8.0+
- Automatically adds `x-vercel-protection-bypass` header

## Related

- [httpstat.md](./httpstat.md)
- [traces.md](./traces.md)
- [api.md](./api.md)
