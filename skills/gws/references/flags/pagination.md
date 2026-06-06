# Pagination Flags

Flags for controlling automatic pagination of list responses.

## Signature / Usage

```bash
gws <service> <method> [--page-all] [--page-limit <N>] [--page-delay <MS>]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--page-all` | boolean | Fetch all pages automatically. Output is NDJSON — one JSON object per line, one line per page. Off by default. |
| `--page-limit <N>` | integer | Maximum number of pages to fetch. Default: `10`. |
| `--page-delay <MS>` | integer | Delay in milliseconds between page requests. Default: `100`. |

## Notes

- Without `--page-all`, only the first page is returned.
- `--page-all` outputs NDJSON — one full page response JSON object per line (e.g., `{"files":[...],"nextPageToken":"..."}`). Each line is an independent JSON value, not part of a JSON array, so pass it to `jq` without `-s`/`--slurp`: `gws drive files list --page-all | jq -c '.files[]'` processes each page's items across all pages.
- `--page-limit` caps the total pages even when `--page-all` is set, preventing runaway requests on large datasets.
- `--page-delay` throttles requests to avoid hitting rate limits.

## Related

- [global-flags.md](./global-flags.md)
