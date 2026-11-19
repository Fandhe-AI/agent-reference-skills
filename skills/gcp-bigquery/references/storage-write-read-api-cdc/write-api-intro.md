---
source: https://docs.cloud.google.com/bigquery/docs/write-api-intro
---

# Introduction to the Storage Write API

The BigQuery Storage Write API is a unified data-ingestion API that streams records into BigQuery in real time. It is available through both gRPC and REST endpoints. gRPC streaming is ideal for long-lived connections and continuous streaming; the REST endpoint is best for ephemeral, stateless, or constrained environments. For new workloads, the source recommends gRPC streaming.

## Signature / Usage

### REST endpoint example (Python)

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

# TODO(developer): Set table_id to the ID of table to append to.
# table_id = "your-project.your_dataset.your_table"

rows_to_insert = [
    {"full_name": "Phred Phlyntstone", "age": 32},
    {"full_name": "Wylma Phlyntstone", "age": 29},
]

errors = client.insert_rows_json(table_id, rows_to_insert)  # Make an API request.
if errors == []:
    print("New rows have been added.")
else:
    print("Encountered errors while inserting rows: {}".format(errors))
```

## Options / Props

### gRPC streaming vs REST

| Aspect | Storage Write API (gRPC) | Storage Write API (REST) |
|---|---|---|
| Best for | Long-lived connections and continuous streaming | Ephemeral, stateless, or constrained environments |
| Protocol | gRPC; more efficient than REST over HTTP; protocol buffer binary and Apache Arrow columnar formats; asynchronous write requests with guaranteed ordering | REST over HTTP; JSON is a less efficient wire format than protocol buffers or Arrow |
| Cost | Significantly lower than REST; up to 2 TiB per month ingested for free | Not stated in the source (the gRPC cost is described as significantly lower) |
| Delivery semantics | Exactly-once through stream offsets (never writes two messages with the same offset within a stream, if the client provides offsets) | Not stated in the source |
| Transactions | Stream-level transactions (commit a stream as a single transaction; safe retry if commit fails); transactions across streams (multiple workers, commit all streams together) | Not stated in the source |
| Schema update detection | The API notifies the client if the table schema changes while streaming; the client chooses whether to reconnect with the updated schema or keep the existing connection | Not stated in the source |

## Notes

- The gRPC column is the source's list of gRPC advantages; the source gives no separate REST feature list on this page.
- The Python block above is not from this page. Snippet taken from https://docs.cloud.google.com/bigquery/docs/write-api-rest (Storage Write API (REST), formerly the legacy `tabledata.insertAll` method).
- The source page also shows a decision diagram and links only to the two detail pages.
- Source: https://docs.cloud.google.com/bigquery/docs/write-api-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [write-api-grpc.md](./write-api-grpc.md)
- [write-api-rest.md](./write-api-rest.md)
- [change-data-capture.md](./change-data-capture.md)
