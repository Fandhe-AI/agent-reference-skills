# Script Helpers

Hand-crafted helper command for pushing local files to a Google Apps Script project.

## +push

Replace all files in an Apps Script project with local files. Supports `.gs`, `.js`, `.html`, and `appsscript.json` files.

### Usage

```bash
gws script +push --script SCRIPT_PROJECT_ID
gws script +push --script SCRIPT_PROJECT_ID --dir ./my-script-dir
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--script` | Yes | Script Project ID |
| `--dir` | No | Directory containing script files (defaults to current directory) |

## Notes

- Replaces **all** files in the target project — this is a destructive operation.
- Hidden files and the `node_modules` directory are automatically excluded.
- Supported file types: `.gs`, `.js`, `.html`, `appsscript.json`.

## Related

- [helpers-overview.md](./helpers-overview.md)
