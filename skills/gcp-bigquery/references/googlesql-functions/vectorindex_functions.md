---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/vectorindex_functions
---

# Vector index functions

## Signature / Usage

GoogleSQL for BigQuery supports the following vector index functions.

### Function list

| Name | Summary |
|---|---|
| [`VECTOR_INDEX.STATISTICS`](#vector_indexstatistics) | Calculate how much an indexed table's data has drifted between when a vector index was trained and the present. |

### `VECTOR_INDEX.STATISTICS`

```sql
VECTOR_INDEX.STATISTICS(
  TABLE table_name
)
```

**Description**

The `VECTOR_INDEX.STATISTICS` function calculates how much an indexed table's
data has drifted between when a [vector index](https://docs.cloud.google.com/bigquery/docs/vector-index) was trained and the
present. Use this function to determine if table data has changed enough to
require a vector index rebuild. If necessary, you can use the
[`ALTER VECTOR INDEX REBUILD` statement](../googlesql-syntax/data-definition-language-3.md#alter-vector-index-rebuild-statement) to rebuild the vector index.

To alter vector indexes, you must have the BigQuery Data Editor
(`roles/bigquery.dataEditor`) or BigQuery Data Owner
(`roles/bigquery.dataOwner`) IAM role on the table that contains the
vector index.

**Definitions**

- `table_name`: The name of the table that contains the vector index,
  in the format `dataset_name.table_name`.

  If there is no active vector index on the table, the function returns empty
  results. If there is an active vector index on the table, but the index
  training isn't complete, the function returns a `NULL` drift score.

**Output**

A `FLOAT64` value in the range `[0,1)`. A lower value indicates less drift.
Typically, a change of `0.3` or greater is considered significant.

**Example**

This example returns the drift for the table `mytable`.

```sql
SELECT * FROM VECTOR_INDEX.STATISTICS(TABLE mydataset.mytable);
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/vectorindex_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
