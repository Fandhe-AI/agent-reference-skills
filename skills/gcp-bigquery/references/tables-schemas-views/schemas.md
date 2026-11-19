---
source: https://docs.cloud.google.com/bigquery/docs/schemas
---

# Specify a schema

A schema defines the column names, data types, and other properties of a BigQuery table. You can specify it when you load data or create an empty table, or use schema auto-detection. For self-describing formats (Avro, Parquet, ORC, Firestore export files, Datastore export files) BigQuery retrieves the schema from the source data. You can modify the schema afterwards.

## Signature / Usage

### Create a table with a schema (SQL)

```sql
CREATE TABLE IF NOT EXISTS mydataset.newtable (x INT64, y STRING, z BOOL)
  OPTIONS(
    description = 'My example table');
```

### Rounding mode for NUMERIC / BIGNUMERIC

```sql
CREATE TABLE mydataset.mytable (
  x NUMERIC(5,2) OPTIONS (rounding_mode='ROUND_HALF_EVEN'),
  y NUMERIC(5,2) OPTIONS (rounding_mode='ROUND_HALF_AWAY_FROM_ZERO')
);
INSERT mydataset.mytable (x, y)
VALUES (NUMERIC "1.025", NUMERIC "1.025"),
       (NUMERIC "1.0251", NUMERIC "1.0251"),
       (NUMERIC "1.035", NUMERIC "1.035"),
       (NUMERIC "-1.025", NUMERIC "-1.025");
```

The resulting table:

```text
+-------+-------+
| x     | y     |
+-------+-------+
| 1.02  | 1.03  |
| 1.03  | 1.03  |
| 1.04  | 1.04  |
| -1.02 | -1.03 |
+-------+-------+
```

### Inline schema with bq (`field:data_type,field:data_type`)

Inline schemas can't include `RECORD` (`STRUCT`) or `RANGE` types, column descriptions, or modes (all modes default to `NULLABLE`); use a JSON schema file for those. `project_id:dataset.table_name` is needed for a non-default project; `--location` is optional.

```bash
bq --location=location load \
--source_format=format \
project_id:dataset.table_name \
path_to_source \
schema
```

```bash
bq load \
--source_format=CSV \
mydataset.mytable \
./myfile.csv \
qtr:STRING,sales:FLOAT,year:STRING
```

```bash
bq mk --table project_id:dataset.table schema
```

```bash
bq mk --table mydataset.mytable qtr:STRING,sales:FLOAT,year:STRING
```

### JSON schema file

A JSON schema file is an array of `TableFieldSchema` objects; `name` and `type` are required, everything else is optional. The `...` below marks the repeated entry shape in the source.

```text
[
  {
    "name": string,
    "type": string,
    "mode": string,
    "fields": [
      {
        object (TableFieldSchema)
      }
    ],
    "description": string,
    "policyTags": {
      "names": [
        string
      ]
    },
    "maxLength": string,
    "precision": string,
    "scale": string,
    "collation": string,
    "defaultValueExpression": string,
    "roundingMode": string
  },
  {
    "name": string,
    "type": string,
    ...
  }
]
```

For a `RANGE<T>` column, describe `T` (`DATE`, `DATETIME`, or `TIMESTAMP`) with `rangeElementType`:

```json
[
  {
    "name": "duration",
    "type": "RANGE",
    "mode": "NULLABLE",
    "rangeElementType": {
      "type": "DATE"
    }
  }
]
```

A basic schema with `qtr` (`REQUIRED` `STRING`), `rep` (`NULLABLE` `STRING`) and `sales` (`NULLABLE` `FLOAT`):

```json
[
  {
    "name": "qtr",
    "type": "STRING",
    "mode": "REQUIRED",
    "description": "quarter"
  },
  {
    "name": "rep",
    "type": "STRING",
    "mode": "NULLABLE",
    "description": "sales representative"
  },
  {
    "name": "sales",
    "type": "FLOAT",
    "mode": "NULLABLE",
    "defaultValueExpression": "2.55"
  }
]
```

Write an existing table's schema to a local file:

```bash
bq show \
--schema \
--format=prettyjson \
project_id:dataset.table > path_to_file
```

Use a schema file when loading or creating a table. The file must be locally readable (not in Cloud Storage or Google Drive) and can be used only with bq, not with the console or API.

```bash
bq load --source_format=CSV mydataset.mytable ./myfile.csv ./myschema.json
```

```bash
bq mk --table mydataset.mytable ./myschema.json
```

### Python: schema on a load job

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

# TODO(developer): Set table_id to the ID of the table to create.
# table_id = "your-project.your_dataset.your_table_name"

job_config = bigquery.LoadJobConfig(
    schema=[
        bigquery.SchemaField("name", "STRING"),
        bigquery.SchemaField("post_abbr", "STRING"),
    ],
    source_format=bigquery.SourceFormat.NEWLINE_DELIMITED_JSON,
)
uri = "gs://cloud-samples-data/bigquery/us-states/us-states.json"

load_job = client.load_table_from_uri(
    uri,
    table_id,
    location="US",  # Must match the destination dataset location.
    job_config=job_config,
)  # Make an API request.

load_job.result()  # Waits for the job to complete.

destination_table = client.get_table(table_id)
print("Loaded {} rows.".format(destination_table.num_rows))
```

### Python: schema on an empty table

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

# TODO(developer): Set table_id to the ID of the table to create.
# table_id = "your-project.your_dataset.your_table_name"

schema = [
    bigquery.SchemaField("full_name", "STRING", mode="REQUIRED"),
    bigquery.SchemaField("age", "INTEGER", mode="REQUIRED"),
]

table = bigquery.Table(table_id, schema=schema)
table = client.create_table(table)  # Make an API request.
print(
    "Created table {}.{}.{}".format(table.project, table.dataset_id, table.table_id)
)
```

### Python: schema JSON file helpers

`Client.schema_to_json` writes a table schema to a file and `Client.schema_from_json` reads one back.

```python
from google.cloud import bigquery

client = bigquery.Client()

# TODO(dev): Change the table_id variable to the full name of the
# table you want to get schema from.
table_id = "your-project.your_dataset.your_table_name"

# TODO(dev): Change schema_path variable to the path
# of your schema file.
schema_path = "path/to/schema.json"
table = client.get_table(table_id)  # Make an API request.

# Write a schema file to schema_path with the schema_to_json method.
client.schema_to_json(table.schema, schema_path)

with open(schema_path, "r", encoding="utf-8") as schema_file:
    schema_contents = schema_file.read()

# View table properties
print(f"Got table '{table.project}.{table.dataset_id}.{table.table_id}'.")
print(f"Table schema: {schema_contents}")
```

### Flexible column names with the Storage APIs

To use the expanded character set with the Storage Read API, set the Avro serialization flag (retrieve the real name from the `displayName` attribute):

```python
from google.cloud.bigquery_storage import types
requested_session = types.ReadSession()

#set avro serialization options for flexible column.
options = types.AvroSerializationOptions()
options.enable_display_name_attribute = True
requested_session.read_options.avro_serialization_options = options
```

With the Storage Write API (gRPC), provide the schema with `column_name` notation unless you use `JsonStreamWriter`. `item_name_column` / `item_description_column` are placeholder names that must follow protocol buffer naming; `column_name` annotations always take precedence.

```text
syntax = "proto2";
package mypackage;
// Source protos located in github.com/googleapis/googleapis
import "google/cloud/bigquery/storage/v1/annotations.proto";

message FlexibleSchema {
  optional string item_name_column = 1
  [(.google.cloud.bigquery.storage.v1.column_name) = "name-列"];
  optional string item_description_column = 2
  [(.google.cloud.bigquery.storage.v1.column_name) = "description-列"];
}
```

## Options / Props

### Column naming rules

| Rule | Detail |
|---|---|
| Characters | Letters (a-z, A-Z), numbers (0-9), or underscores (`_`); must start with a letter or underscore. With flexible column names, a name may start with a number. |
| Maximum length | 300 characters. |
| Reserved prefixes | `_TABLE_`, `_FILE_`, `_PARTITION`, `_ROW_TIMESTAMP`, `__ROOT__`, `_COLIDENTIFIER`, `_CHANGE_SEQUENCE_NUMBER`, `_CHANGE_TYPE`, `_CHANGE_TIMESTAMP`. |
| Case | Duplicate names are not allowed even if the case differs (`Column1` equals `column1`). |
| Table and column share a name | `SELECT test` is interpreted as a `STRUCT` of all other columns. Avoid the same name, avoid a `_field_` prefix (system-reserved prefixes are renamed, for example `_field_1`), give the table an alias (`SELECT test FROM project1.dataset.test AS t;`), or qualify the column (`SELECT test.test FROM project1.dataset.test;`). |

### Flexible column names

Enclose names that are quoted identifiers in backticks.

| Supported | Not supported |
|---|---|
| Any letter (`\p{L}`), numeric (`\p{N}`), connector punctuation incl. underscore (`\p{Pc}`), dash (`\p{Pd}`), and mark (`\p{M}`) characters; `&`, `%`, `=`, `+`, `:`, `'`, `<`, `>`, `#`, `\|`, and whitespace | `!`, `"`, `$`, `(`, `)`, `*`, `,`, `.`, `/`, `;`, `?`, `@`, `[`, `\`, `]`, `^`, grave accent, `{`, `}`, `~` |

| Limitation | Detail |
|---|---|
| Support by table type | Enabled by default for Iceberg managed tables, Iceberg external tables, and Apache Iceberg tables managed by the Lakehouse runtime catalog. Not enabled by default for other external tables (Parquet, ORC, Avro, CSV, Delta Lake); request project-level enablement through Cloud Customer Care. Delta Lake tables also need column mapping in `id` or `name` mode. |
| Export | Exporting external tables with flexible names to open formats (Parquet, Avro via `EXPORT DATA` or extract jobs) maps unsupported names to generated `col_...` hash names. |
| Dialect | Not supported in legacy SQL; use GoogleSQL. |
| Parquet periods | Periods are not replaced by underscores in Parquet column names when a column name character map is used. |

### Other column properties

| Property | Detail |
|---|---|
| Description | Optional string, maximum 1,024 characters. |
| Default value | A literal or one of `CURRENT_DATE`, `CURRENT_DATETIME`, `CURRENT_TIME`, `CURRENT_TIMESTAMP`, `GENERATE_UUID`, `RAND`, `SESSION_USER`, `ST_GEOGPOINT`. |
| Mode | `NULLABLE` (default; allows `NULL`), `REQUIRED` (no `NULL`), `REPEATED` (array of the type). |
| Rounding mode | `rounding_mode` option for `NUMERIC` / `BIGNUMERIC` on a top-level column or `STRUCT` field: `"ROUND_HALF_AWAY_FROM_ZERO"` (default) or `"ROUND_HALF_EVEN"`. Not allowed on other types. |

### GoogleSQL data types

| Name | Data type | Description |
|---|---|---|
| Integer | `INT64` | Numeric values without fractional components |
| Floating point | `FLOAT64` | Approximate numeric values with fractional components |
| Numeric | `NUMERIC` | Exact numeric values with fractional components |
| BigNumeric | `BIGNUMERIC` | Exact numeric values with fractional components |
| Boolean | `BOOL` | TRUE or FALSE (case-insensitive) |
| String | `STRING` | Variable-length character (Unicode) data |
| Bytes | `BYTES` | Variable-length binary data |
| Date | `DATE` | A logical calendar date |
| Date/Time | `DATETIME` | A year, month, day, hour, minute, second, and subsecond |
| Time | `TIME` | A time, independent of a specific date |
| Timestamp | `TIMESTAMP` | An absolute point in time, with microsecond precision |
| Struct (Record) | `STRUCT` | Container of ordered fields each with a type (required) and field name (optional) |
| Geography | `GEOGRAPHY` | A pointset on the Earth's surface (points, lines and polygons on the WGS84 reference spheroid, with geodesic edges) |
| JSON | `JSON` | Represents JSON, a lightweight data-interchange format |
| RANGE | `RANGE` | A range of `DATE`, `DATETIME`, or `TIMESTAMP` values |

### JSON schema file fields

| Field | Detail |
|---|---|
| `name`, `type` | Required. |
| `mode` | Optional; defaults to `NULLABLE`. |
| `fields` | Optional; the fields of a `STRUCT` column. |
| `description` | Optional. |
| `maxLength` | Optional; maximum length of `STRING` or `BYTES` values. |
| `precision`, `scale` | Optional; for `NUMERIC` or `BIGNUMERIC`. |
| `collation` | Optional; for `STRING`. |
| `defaultValueExpression` | Optional default value. |
| `roundingMode` | Optional; for `NUMERIC` or `BIGNUMERIC`. |
| `rangeElementType` | For `RANGE<T>`; `T` is `DATE`, `DATETIME`, or `TIMESTAMP`. |

## Notes

- Ways to specify a schema: console, `CREATE TABLE`, inline with bq, a JSON schema file, the `schema` property of a load job configuration (`jobs.insert`), or the `schema` property of the table resource (`tables.insert`). Specifying a schema is supported when you load CSV and newline-delimited JSON; Avro, Parquet, ORC, Firestore and Datastore exports are read from the source data.
- Using flexible column names with the Storage Read API or Storage Write API (gRPC) requires the special handling shown above.
- The source also shows Console, C#, Go and Java.
- The `bq load` / `bq mk` templates use lowercase placeholders (`location`, `format`, `project_id`, `dataset.table_name`, `path_to_source`, `schema`); replace them with real values. `bq mk --table` and `bq show --schema` exist in the bq CLI reference.
- The JSON field template is shown as `text` because it is a pseudo-JSON template (`string`, `object (TableFieldSchema)`, `...`), not valid JSON.
- Source: https://docs.cloud.google.com/bigquery/docs/schemas (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [nested-repeated.md](./nested-repeated.md)
- [tables-intro.md](./tables-intro.md)
