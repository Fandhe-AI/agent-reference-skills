# Sheets Helpers

Hand-crafted helper commands for reading and writing Google Sheets data.

## +append

Append a row to a spreadsheet.

### Usage

```bash
gws sheets +append --spreadsheet SPREADSHEET_ID --values "Alice,95"
gws sheets +append --spreadsheet SPREADSHEET_ID --json-values '[["Alice","95"],["Bob","88"]]' --range "Sheet2!A1"
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--spreadsheet` | Yes | Spreadsheet ID |
| `--values` | No | Comma-separated values (simple strings; single row) |
| `--json-values` | No | JSON array of rows, e.g. `[["a","b"],["c","d"]]` (supports multi-row bulk inserts) |
| `--range` | No | Target range in A1 notation (e.g. `Sheet2!A1`); defaults to `A1` |

## Notes

- Use `--values` for a single-row append; use `--json-values` for bulk multi-row inserts.
- `--range` targets a specific sheet tab when the spreadsheet has multiple sheets.

---

## +read

Read values from a spreadsheet.

### Usage

```bash
gws sheets +read --spreadsheet SPREADSHEET_ID --range "Sheet1!A1:B10"
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--spreadsheet` | Yes | Spreadsheet ID |
| `--range` | Yes | Range to read in A1 notation (e.g. `Sheet1!A1:B2`) |

## Notes

- Read-only; never modifies spreadsheet data.
- For advanced options (e.g. `valueRenderOption`, `dateTimeRenderOption`), use the raw `gws sheets values get --params '{...}'` API.

## Related

- [helpers-overview.md](./helpers-overview.md)
