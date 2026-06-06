# Drive Helpers

Hand-crafted helper command for uploading files to Google Drive with automatic metadata assignment.

## +upload

Upload a file to Drive. MIME type is auto-detected from the file; filename defaults to the source filename.

### Usage

```bash
gws drive +upload ./report.pdf
gws drive +upload ./report.pdf --parent FOLDER_ID
gws drive +upload ./data.csv --name "Sales Data.csv"
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `file` | Yes | Path to the file to upload (positional argument) |
| `--parent` | No | Parent folder ID |
| `--name` | No | Target filename (defaults to the source filename) |

## Notes

- MIME type is automatically detected from the file content/extension.
- Without `--parent`, the file is uploaded to the root of My Drive.
- Uses resumable upload protocol internally for reliable transfer of large files.

## Related

- [helpers-overview.md](./helpers-overview.md)
- [workflow-helpers.md](./workflow-helpers.md)
