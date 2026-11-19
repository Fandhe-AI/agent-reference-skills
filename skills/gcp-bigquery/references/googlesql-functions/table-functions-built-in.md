---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/table-functions-built-in
---

# Table functions (built in)

## Signature / Usage

GoogleSQL for BigQuery supports built-in table functions.

This topic includes functions that produce columns of a table.
You can only use these functions in the `FROM` clause.

### Function list

| Name | Summary |
|---|---|
| [`APPENDS`](time-series-functions.md#appends) | Returns all rows appended to a table for a given time range. For more information, see [Time series functions](time-series-functions.md). |
| [`CHANGES`](time-series-functions.md#changes) | Returns all rows that have changed in a table for a given time range. For more information, see [Time series functions](time-series-functions.md). |
| [`EXTERNAL_OBJECT_TRANSFORM`](#external_object_transform) | Produces an object table with the original columns plus one or more additional columns. |
| [`GAP_FILL`](time-series-functions.md#gap_fill) | Finds and fills gaps in a time series. For more information, see [Time series functions](time-series-functions.md). |
| [`RANGE_SESSIONIZE`](range-functions.md#range_sessionize) | Produces a table of sessionized ranges. For more information, see [Range functions](range-functions.md). |

### `EXTERNAL_OBJECT_TRANSFORM`

```sql
EXTERNAL_OBJECT_TRANSFORM(TABLE object_table_name, transform_types_array)
```

**Description**

This function returns a transformed object table with the original columns plus
one or more additional columns, depending on the `transform_types` values
specified.

This function only supports
[object tables](https://cloud.google.com/bigquery/docs/object-table-introduction)
as inputs. Subqueries or any other types of tables aren't supported.

`object_table_name` is the name of the object table to be transformed, in
the format `dataset_name.object_table_name`.

`transform_types_array` is an array of `STRING` literals. Currently, the only
supported `transform_types_array` value is `SIGNED_URL`. Specifying `SIGNED_URL`
creates read-only signed URLs for the objects in the identified object table,
which are returned in a `signed_url` column. Generated signed URLs are
valid for 6 hours.

**Return Type**

TABLE

**Example**

Run the following query to return URIs and signed URLs for the objects in the
`mydataset.myobjecttable` object table.

```sql
SELECT uri, signed_url
FROM EXTERNAL_OBJECT_TRANSFORM(TABLE mydataset.myobjecttable, ['SIGNED_URL']);

--The preceding statement returns results similar to the following:
/*-----------------------------------------------------------------------------------------------------------------------------+
 |  uri                                 | signed_url                                                                           |
 +-----------------------------------------------------------------------------------------------------------------------------+
 | gs://myobjecttable/1234_Main_St.jpeg | https://storage.googleapis.com/mybucket/1234_Main_St.jpeg?X-Goog-Algorithm=1234abcd… |
 +-----------------------------------------------------------------------------------------------------------------------------+
 | gs://myobjecttable/345_River_Rd.jpeg | https://storage.googleapis.com/mybucket/345_River_Rd.jpeg?X-Goog-Algorithm=2345bcde… |
 +-----------------------------------------------------------------------------------------------------------------------------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/table-functions-built-in (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
