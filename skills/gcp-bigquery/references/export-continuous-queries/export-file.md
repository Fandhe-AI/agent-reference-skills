---
source: https://docs.cloud.google.com/bigquery/docs/export-file
---

# Export query results to a file

To share or analyze query results in other tools, you can save BigQuery query results from the Google Cloud console to a local file, Google Drive, Google Sheets, or Cloud Storage. For local files you can choose CSV or newline-delimited JSON. The bq command-line tool and the BigQuery API don't support saving query results directly to a local file, Google Drive, or Google Sheets; use the Google Cloud console.

## Signature / Usage

### Flatten nested data for CSV

Nested or repeated data (`RECORD` / `STRUCT` or `ARRAY`) can't be exported to CSV. Flatten with dot notation or `UNNEST`, or export to a format that supports nested schemas such as newline-delimited JSON. The flattening query below is the source's pattern from the table export page.

```sql
SELECT
    id,
    user_details.name AS user_name,
    user_details.email AS user_email,
    created_at
FROM
    my_dataset.my_table;
```

### Console paths

- Local download: run a query, click **Save results**, then under **Local download** select **CSV** or **JSON**.
- Google Drive (Beta): **Save results** > **Google Drive** > **CSV** or **JSONL (newline delimited)**. No destination subfolder; the file goes to the root of `My Drive` as `bq-results-TIMESTAMP-RANDOM_CHARACTERS.csv` or `bq-results-TIMESTAMP-RANDOM_CHARACTERS.json`, and saving can take several minutes.
- Google Sheets: **Save results** > **Google Drive** > **Google Sheets**; a message `Saved to Sheets as "results-YYYYMMDD-HHMMSS"` appears.
- Cloud Storage: **Save results** > **Cloud Storage**, then choose location, format (CSV, JSON (Newline Delimited), Avro, Parquet) and compression (or `None`); progress appears as an `EXTRACT` job in Job history.

## Options / Props

| Destination | Formats | Notes |
|---|---|---|
| Local file | CSV, JSON | Console only |
| Google Drive | CSV, JSONL (newline delimited) | Beta; Pre-GA terms apply |
| Google Sheets | Google Sheets | Cells appear blank if data exceeds the Sheets limit of 50,000 characters per cell |
| Cloud Storage | CSV, JSON (Newline Delimited), Avro, Parquet | Compression selectable |

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/export-file (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/exporting-data (the page itself has no code block).
- Google Drive save is Beta ("subject to the Pre-GA Offerings Terms"; "available as is and might have limited support").
- If saving to Drive or Sheets fails, the Drive SDK API might be unable to access the Google Workspace account; the administrator must enable the account to access Google Drive with the Drive SDK API.
- Sheets cell limit: use a string function in the query (for example `SPLIT`) to split long text into multiple columns. For larger datasets or refreshing results, the source points to Connected Sheets.
- To restrict downloading query results: configure a VPC Service Controls perimeter around BigQuery resources, or contact Cloud Customer Care to be added to a restricted list that disables download and export options in the console. VPC Service Controls itself is in `gcp-security`.
- The source also shows only Console steps (no CLI, API, or client-library code).

## Related

- [export-intro.md](./export-intro.md)
- [exporting-data.md](./exporting-data.md)
