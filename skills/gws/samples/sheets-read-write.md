# Sheets Read and Write

Read data from and append rows to Google Sheets using `gws sheets` helpers.

```bash
# Prerequisites: authenticate with sheets scope
gws auth login -s sheets

# Read a range from a spreadsheet
gws sheets +read --spreadsheet SPREADSHEET_ID --range "Sheet1!A1:C10"

# Append a row of comma-separated values
gws sheets +append --spreadsheet SPREADSHEET_ID --values "Alice,95,2024-06-10"

# Read via the raw Discovery method
gws sheets spreadsheets values get \
  --params '{"spreadsheetId": "SPREADSHEET_ID", "range": "Sheet1!A1:C10"}'

# Append via the raw Discovery method (supports multiple rows)
gws sheets spreadsheets values append \
  --params '{"spreadsheetId": "SPREADSHEET_ID", "range": "Sheet1!A1", "valueInputOption": "USER_ENTERED"}' \
  --json '{"values": [["Name", "Score", "Date"], ["Alice", 95, "2024-06-10"]]}'

# Preview an append without writing (dry-run)
gws sheets +append --spreadsheet SPREADSHEET_ID --values "Bob,88,2024-06-10" --dry-run

# Create a new spreadsheet
gws sheets spreadsheets create --json '{"properties": {"title": "Q1 Budget"}}'
```

## Notes

- `SPREADSHEET_ID` is the long alphanumeric ID from the Google Sheets URL (`/spreadsheets/d/<ID>/`).
- `+read` and `+append` are helper shorthands; the raw Discovery methods (`spreadsheets values get` / `values append`) offer full parameter control.
- `valueInputOption: "USER_ENTERED"` in the raw append call lets Sheets parse values (e.g., numbers, dates) the same way a user would type them; use `"RAW"` to store the literal string.
- `--dry-run` prints the HTTP request without executing it — safe for verifying spreadsheet ID and range before writing.
