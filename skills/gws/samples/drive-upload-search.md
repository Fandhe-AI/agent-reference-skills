# Drive File Upload and Search

Upload files to Google Drive and search or list files using `gws drive` helpers and pagination flags.

```bash
# Prerequisites: authenticate with drive scope
gws auth login -s drive

# Upload a file with a display name
gws drive +upload ./report.pdf --name "Q1 Report"

# Upload via the raw Discovery method (equivalent)
gws drive files create \
  --json '{"name": "report.pdf"}' \
  --upload ./report.pdf

# List files (first page, up to 10 results)
gws drive files list --params '{"pageSize": 10}'

# Search files by name using the Drive query syntax
gws drive files list --params '{"q": "name contains '\''report'\''", "pageSize": 20}'

# Search for files in a specific folder
gws drive files list --params '{"q": "'\''FOLDER_ID'\'' in parents", "pageSize": 50}'

# Fetch all pages automatically as NDJSON (pipe to jq for processing)
gws drive files list --params '{"pageSize": 100}' --page-all | jq -r '.files[].name'

# Limit pagination to 3 pages with a 200 ms delay between requests
gws drive files list --params '{"pageSize": 100}' --page-all --page-limit 3 --page-delay 200

# Preview a file creation request without executing
gws drive files create --json '{"name": "draft.txt"}' --dry-run
```

## Notes

- `+upload` is the recommended shorthand; the raw `files create --upload` form gives full control over metadata via `--json`.
- `--params` accepts a JSON string; the `q` field uses the [Drive Files.list query syntax](https://developers.google.com/drive/api/guides/search-files) (e.g., `name contains 'foo'`, `mimeType = 'application/pdf'`).
- `--page-all` outputs one JSON object per page as NDJSON, suitable for streaming with `jq`.
- `--page-limit` (default: 10) caps total pages; `--page-delay` (default: 100 ms) throttles to avoid rate-limit errors on large datasets.
- Exit code `1` indicates a Google API error (e.g., quota exceeded or file not found); exit code `2` means authentication failed.
