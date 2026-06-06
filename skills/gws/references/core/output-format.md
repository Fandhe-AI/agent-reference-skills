# Output Format

All `gws` output — successful responses, errors, and download metadata — is structured JSON. When paginating with `--page-all`, output is NDJSON (newline-delimited JSON), with one JSON object per line per page. Errors are written to stderr.

## Signature / Usage

```bash
# Single response — JSON object
gws drive files list --params '{"pageSize": 3}'

# Paginated — NDJSON (one JSON object per page to stdout)
gws drive files list --page-all

# Limit pages and set inter-page delay
gws gmail users messages list --page-all --page-limit 5 --page-delay 200

# Dry-run — prints the HTTP request JSON without executing
gws drive files list --params '{"pageSize": 5}' --dry-run
```

## Options / Props

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--page-all` | bool | false | Auto-paginate and stream results as NDJSON |
| `--page-limit <N>` | integer | 10 | Maximum number of pages to fetch when `--page-all` is set |
| `--page-delay <MS>` | integer | 100 | Milliseconds to wait between page requests |
| `--dry-run` | bool | false | Print the HTTP request as JSON without executing it |
| `--sanitize` | bool | false | Apply Model Armor sanitization to the response |

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | API error (4xx / 5xx response) |
| 2 | Authentication error |
| 3 | Validation error (bad arguments) |
| 4 | Discovery document fetch failure |
| 5 | Internal error |

## Notes

- Standard (non-paginated) responses are a single JSON object on stdout.
- NDJSON format (one JSON object per line) is only used when `--page-all` is active, enabling streaming processing with tools like `jq` line by line.
- Errors and diagnostic output are written to stderr as structured JSON, keeping stdout clean for piping.
- Download metadata (e.g., from `drive files get` with binary content) is also represented as structured JSON.
- This project is not an officially supported Google product. Breaking changes are expected before v1.0.

## Related

- [command-structure.md](./command-structure.md)
- [two-phase-parsing.md](./two-phase-parsing.md)
