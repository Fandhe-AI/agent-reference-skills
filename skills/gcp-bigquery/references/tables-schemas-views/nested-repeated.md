---
source: https://docs.cloud.google.com/bigquery/docs/nested-repeated
---

# Specify nested and repeated columns in table schemas

Nested and repeated columns store related data (for example a book and its authors) in a single table instead of joined tables. BigQuery performs best with denormalized data. A `RECORD` column is accessed as a `STRUCT` in GoogleSQL; a `REPEATED` mode column is accessed as an `ARRAY`.

## Signature / Usage

### Create a table with a nested and repeated column

The example schema holds `id`, `first_name`, `last_name`, `dob`, and a nested and repeated `addresses` field. Sample newline-delimited JSON data:

```text
{"id":"1","first_name":"John","last_name":"Doe","dob":"1968-01-22","addresses":[{"status":"current","address":"123 First Avenue","city":"Seattle","state":"WA","zip":"11111","numberOfYears":"1"},{"status":"previous","address":"456 Main Street","city":"Portland","state":"OR","zip":"22222","numberOfYears":"5"}]}
{"id":"2","first_name":"Jane","last_name":"Doe","dob":"1980-10-16","addresses":[{"status":"current","address":"789 Any Avenue","city":"New York","state":"NY","zip":"33333","numberOfYears":"2"},{"status":"previous","address":"321 Main Street","city":"Hoboken","state":"NJ","zip":"44444","numberOfYears":"3"}]}
```

JSON schema file (usable with bq):

```json
[
    {
        "name": "id",
        "type": "STRING",
        "mode": "NULLABLE"
    },
    {
        "name": "first_name",
        "type": "STRING",
        "mode": "NULLABLE"
    },
    {
        "name": "last_name",
        "type": "STRING",
        "mode": "NULLABLE"
    },
    {
        "name": "dob",
        "type": "DATE",
        "mode": "NULLABLE"
    },
    {
        "name": "addresses",
        "type": "RECORD",
        "mode": "REPEATED",
        "fields": [
            {
                "name": "status",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "address",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "city",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "state",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "zip",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "numberOfYears",
                "type": "STRING",
                "mode": "NULLABLE"
            }
        ]
    }
]
```

Equivalent `CREATE TABLE`:

```sql
CREATE TABLE IF NOT EXISTS mydataset.mytable (
  id STRING,
  first_name STRING,
  last_name STRING,
  dob DATE,
  addresses
    ARRAY<
      STRUCT<
        status STRING,
        address STRING,
        city STRING,
        state STRING,
        zip STRING,
        numberOfYears STRING>>
) OPTIONS (
    description = 'Example name and addresses table');
```

### Python

```python
from google.cloud import bigquery

client = bigquery.Client()

# TODO(dev): Change table_id to the full name of the table you want to create.
table_id = "your-project.your_dataset.your_table_name"

schema = [
    bigquery.SchemaField("id", "STRING", mode="NULLABLE"),
    bigquery.SchemaField("first_name", "STRING", mode="NULLABLE"),
    bigquery.SchemaField("last_name", "STRING", mode="NULLABLE"),
    bigquery.SchemaField("dob", "DATE", mode="NULLABLE"),
    bigquery.SchemaField(
        "addresses",
        "RECORD",
        mode="REPEATED",
        fields=[
            bigquery.SchemaField("status", "STRING", mode="NULLABLE"),
            bigquery.SchemaField("address", "STRING", mode="NULLABLE"),
            bigquery.SchemaField("city", "STRING", mode="NULLABLE"),
            bigquery.SchemaField("state", "STRING", mode="NULLABLE"),
            bigquery.SchemaField("zip", "STRING", mode="NULLABLE"),
            bigquery.SchemaField("numberOfYears", "STRING", mode="NULLABLE"),
        ],
    ),
]
table = bigquery.Table(table_id, schema=schema)
table = client.create_table(table)  # API request

print(f"Created table {table.project}.{table.dataset_id}.{table.table_id}.")
```

### Insert data

```sql
INSERT INTO mydataset.mytable (id,
first_name,
last_name,
dob,
addresses) values ("1","Johnny","Dawn","1969-01-22",
    ARRAY<
      STRUCT<
        status STRING,
        address STRING,
        city STRING,
        state STRING,
        zip STRING,
        numberOfYears STRING>>
      [("current","123 First Avenue","Seattle","WA","11111","1")])
```

```sql
INSERT INTO mydataset.mytable (id,
first_name,
last_name,
dob,
addresses) values ("1","Johnny","Dawn","1969-01-22",[("current","123 First Avenue","Seattle","WA","11111","1")])
```

### Query nested and repeated columns

Select the value at a position with the array subscript operator and access `STRUCT` elements with the dot operator:

```sql
SELECT
  first_name,
  last_name,
  addresses[offset(0)].address
FROM
  mydataset.mytable;
```

Extract all elements with `UNNEST` and a `CROSS JOIN`:

```sql
SELECT
  first_name,
  last_name,
  a.address,
  a.state
FROM
  mydataset.mytable CROSS JOIN UNNEST(addresses) AS a
WHERE
  a.state != 'NY';
```

### Denormalize two tables into one

Replace a `books` / `authors` join with a single table that nests the authors:

```sql
CREATE TABLE mydataset.denormalized_books(
  title STRING,
  authors ARRAY<STRUCT<id INT64, name STRING, date_of_birth STRING>>,
  num_pages INT64)
AS (
  SELECT
    title,
    ARRAY_AGG(STRUCT(author_id, author_name, date_of_birth)) AS authors,
    ANY_VALUE(num_pages)
  FROM
    mydataset.books,
    UNNEST(author_ids) id
  JOIN
    mydataset.authors
    ON
      id = author_id
  GROUP BY
    title
);
```

### Deduplicate records

Identify duplicates by `last_name` and `first_name`, ordered by `dob`, and keep the first row. This replaces the table contents.

```sql
CREATE OR REPLACE TABLE mydataset.mytable AS (
  SELECT * except(row_num) FROM (
    SELECT *,
    row_number() over (partition by last_name, first_name order by dob) row_num
    FROM
    mydataset.mytable) temp_table
  WHERE row_num=1
)
```

## Options / Props

### Limitations

| Limitation | Detail |
|---|---|
| Nesting depth | A schema cannot contain more than 15 levels of nested `RECORD` types (independent of whether the `RECORD`s are scalar or repeated). |
| Set operations | `RECORD` type is incompatible with `UNION`, `INTERSECT`, `EXCEPT DISTINCT`, and `SELECT DISTINCT`. |
| Arrays | An array cannot contain another array directly. |

## Notes

- A `RECORD` column can have `REPEATED` mode (an array of `STRUCT`), and a field within a record can be repeated (a `STRUCT` that contains an `ARRAY`).
- After you add nested columns you can modify them like any other column; BigQuery natively supports adding a new nested field to a record or relaxing a nested field's mode.
- Loading nested and repeated data is supported from source formats with object-based schemas: JSON, Avro, Firestore export files, and Datastore export files.
- Try the `CREATE OR REPLACE TABLE` deduplication example on a disposable dataset first; it overwrites `mydataset.mytable`.
- The source also shows Console, Go, Java and Node.js.
- Table access is controlled with IAM ("Control access to resources with IAM").
- Source: https://docs.cloud.google.com/bigquery/docs/nested-repeated (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [schemas.md](./schemas.md)
- [tables-intro.md](./tables-intro.md)
