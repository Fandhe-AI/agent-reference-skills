# vercel api

Make authenticated HTTP requests to the Vercel API from the terminal. Beta command.

## Signature / Usage

```bash
vercel api /v2/user
vercel api /v9/projects -X POST -F name=my-project
vercel api /v6/deployments --paginate
vercel api   # interactive endpoint discovery
vercel api ls  # list all available endpoints
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--method` | `-X` | HTTP method (default: GET, or POST if body provided) |
| `--field` | `-F` | Typed request body field as `KEY=VALUE`; parsed as number/bool/string; use `@file` for file content (repeatable) |
| `--raw-field` | `-f` | String field without type parsing (repeatable) |
| `--header` | `-H` | Custom HTTP header (repeatable) |
| `--input` | | Read request body from file; use `-` for stdin |
| `--paginate` | | Fetch all pages and combine into single output |
| `--include` | `-i` | Include response headers in output |
| `--silent` | | Suppress response output; exit code indicates success |
| `--verbose` | | Show full request/response debug info |
| `--raw` | | Output JSON without pretty-printing |
| `--refresh` | | Refresh cached OpenAPI spec used for interactive mode |
| `--generate` | | Output request in another format instead of executing; supports `curl` |
| `--dangerously-skip-permissions` | | Skip confirmation for DELETE operations |

## Notes

- Running without an endpoint enters interactive mode with OpenAPI-based discovery
- `vercel api ls` lists all available API endpoints
- Authentication uses the current CLI session automatically

## Related

- [global-options.md](./global-options.md)
- [curl.md](./curl.md)
