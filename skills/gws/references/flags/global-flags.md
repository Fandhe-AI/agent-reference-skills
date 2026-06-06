# Global Flags

Core flags available on every `gws` command for controlling request behavior.

## Signature / Usage

```bash
gws <service> <method> [--dry-run] [--params '<JSON>'] [--json '<JSON>'] [--upload <FILE>]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--dry-run` | boolean | Preview the HTTP request without executing it. Prints the request details to stdout. |
| `--params '<JSON>'` | string (JSON object) | Query or path parameters to include in the request. |
| `--json '<JSON>'` | string (JSON object) | Request body to send as JSON. |
| `--upload <FILE>` | string (file path) | File to attach as a multipart upload. Use together with `--json` to include metadata. |

## Notes

- `--dry-run` is safe to use before any mutating operation; it prints the full request without making the API call.
- `--params` and `--json` expect valid JSON objects (e.g., `'{"key":"value"}'`).
- `--upload` triggers multipart upload encoding. When combined with `--json`, the JSON becomes the metadata part of the multipart request.

## Related

- [pagination.md](./pagination.md)
- [sanitize-flag.md](./sanitize-flag.md)
