# vercel curl

Make HTTP requests to Vercel deployments with automatic deployment protection bypass.

## Signature / Usage

```bash
vercel curl [url|path]
vercel curl /api/hello
vercel curl https://my-app-abc123.vercel.app/api/hello
vercel curl /api/users -X POST -H "Content-Type: application/json" --data '{"name":"John"}'
vercel curl /api/users -- --json '{"name":"John"}'
vercel curl /api/status --deployment https://my-app-abc123.vercel.app
vercel curl --trace /api/hello
vercel curl --trace --json /api/hello
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--deployment` | | Specific deployment ID or URL to target (default: production deployment) |
| `--protection-bypass` | | Manual bypass secret; alternatively set `VERCEL_AUTOMATION_BYPASS_SECRET` env var |
| `--yes` | | Skip link confirmation prompt in non-interactive environments |
| `--trace` | | Capture a request trace and print trace request ID |
| `--json` | | With `--trace`: emit JSON envelope `{response, requestId}` instead of streaming |
| `--url` | | Listed as a `vercel curl` option name that collides with curl; its own description is not given on the official page |

## Notes

- Requires `curl` to be installed on the system
- The argument can be a full URL, a bare hostname (`https://` is added), or an API path with or without a leading slash (relative paths target the linked project's latest production deployment). With a full URL, bare hostname, or `--deployment`, the owning project is resolved from the deployment, so no linked project is required
- Flags that are not `vercel curl` options are passed through to `curl`. Place a curl flag after `--` when it collides with a `vercel curl` option (`--deployment`, `--protection-bypass`, `--yes`, `--trace`, `--json`, `--help`, `--url`) or with the short form of a global option (`-d`, `-h`, `-A`, `-Q`, `-S`, `-t`, `-T`); e.g. Vercel CLI reads `-d` as `--debug`, so use `--data`
- Bypass token priority: `--protection-bypass`, then `VERCEL_AUTOMATION_BYPASS_SECRET`, then an existing or newly created automation bypass token from project settings. With `--deployment`, a new token is created only when the deployment belongs to the linked project
- In Vercel CLI 65.12.0 and later, when a bypass token is sent curl does not follow redirects (even with `-L`) and curl's `--next`, `--config`, and `-K` flags are not supported
- `--trace` prompts for confirmation on a production deployment unless `--yes` is set; afterwards a `vercel traces inspect` command is printed
- Available in Vercel CLI v48.8.0 and later
- Automatically adds `x-vercel-protection-bypass` header
- Not confirmed in the current official page: the `-y` shorthand for `--yes`, and the "Beta" label. The earlier example `-- --request POST --header ...` is replaced by official examples that pass curl flags directly
- Source: https://vercel.com/docs/cli/curl (fetched 2026-11-14)

## Related

- [httpstat.md](./httpstat.md)
- [traces.md](./traces.md)
- [api.md](./api.md)
