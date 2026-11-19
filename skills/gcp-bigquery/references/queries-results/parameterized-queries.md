---
source: https://docs.cloud.google.com/bigquery/docs/parameterized-queries
---

# Run parameterized queries

Parameterized queries substitute values into GoogleSQL statements using named (`@param_name`) or positional (`?`) parameters, including arrays, timestamps, structs and ranges. Passing user input as parameters helps protect against SQL injection.

## Signature / Usage

### Console query using named parameters

Configure `corpus` (`STRING`, `romeoandjuliet`) and `min_word_count` (`INT64`, `250`) in **Query settings**, then run:

```sql
SELECT
    word,
    word_count
  FROM
    `bigquery-public-data.samples.shakespeare`
  WHERE
    corpus = @corpus
  AND
    word_count >= @min_word_count
  ORDER BY
    word_count DESC;
```

### bq: named parameters

```bash
bq query \
   --use_legacy_sql=false \
   --parameter=corpus::romeoandjuliet \
   --parameter=min_word_count:INT64:250 \
   'SELECT
     word,
     word_count
   FROM
     `bigquery-public-data.samples.shakespeare`
   WHERE
     corpus = @corpus
   AND
     word_count >= @min_word_count
   ORDER BY
     word_count DESC;'
```

### bq: array, timestamp, struct and range parameters

```bash
bq query \
   --use_legacy_sql=false \
   --parameter='gender::M' \
   --parameter='states:ARRAY<STRING>:["WA", "WI", "WV", "WY"]' \
   'SELECT
     name,
     SUM(number) AS count
   FROM
     `bigquery-public-data.usa_names.usa_1910_2013`
   WHERE
     gender = @gender
     AND state IN UNNEST(@states)
   GROUP BY
     name
   ORDER BY
     count DESC
   LIMIT
     10;'
```

```bash
bq query \
   --use_legacy_sql=false \
   --parameter='ts_value:TIMESTAMP:2016-12-07 08:00:00' \
   'SELECT
     TIMESTAMP_ADD(@ts_value, INTERVAL 1 HOUR);'
```

```bash
bq query \
   --use_legacy_sql=false \
   --parameter='struct_value:STRUCT<x INT64, y STRING>:{"x": 1, "y": "foo"}' \
   'SELECT
     @struct_value AS s;'
```

```bash
bq query \
   --use_legacy_sql=false \
   --parameter='my_param:RANGE<DATE>:[2020-01-01, 2020-12-31)' \
   'SELECT @my_param AS foo;'
```

### REST: named parameters (`jobs.query` request body)

```json
{
  "query": "SELECT word, word_count FROM `bigquery-public-data.samples.shakespeare` WHERE corpus = @corpus AND word_count >= @min_word_count ORDER BY word_count DESC;",
  "queryParameters": [
    {
      "parameterType": {
        "type": "STRING"
      },
      "parameterValue": {
        "value": "romeoandjuliet"
      },
      "name": "corpus"
    },
    {
      "parameterType": {
        "type": "INT64"
      },
      "parameterValue": {
        "value": "250"
      },
      "name": "min_word_count"
    }
  ],
  "useLegacySql": false,
  "parameterMode": "NAMED"
}
```

### REST: timestamp parameter

```json
{
  "query": "SELECT TIMESTAMP_ADD(@ts_value, INTERVAL 1 HOUR);",
  "queryParameters": [
    {
      "name": "ts_value",
      "parameterType": {
        "type": "TIMESTAMP"
      },
      "parameterValue": {
        "value": "2016-12-07 08:00:00"
      }
    }
  ],
  "useLegacySql": false,
  "parameterMode": "NAMED"
}
```

### REST: range parameter

Adapted (not in the official docs): the source misspelled `rangeElementTYpe` and named the parameter `range_param` while the query references `@my_param`; corrected to the Discovery field `rangeElementType` and the name `my_param`.

```json
{
  "query": "SELECT @my_param AS value_of_range_parameter;",
  "queryParameters": [
    {
      "name": "my_param",
      "parameterType": {
        "type": "RANGE",
        "rangeElementType": {
          "type": "DATE"
        }
      },
      "parameterValue": {
        "rangeValue": {
          "start": {
            "value": "2020-01-01"
          },
          "end": {
            "value": "2020-12-31"
          }
        }
      }
    }
  ],
  "useLegacySql": false,
  "parameterMode": "NAMED"
}
```

### Python: named parameters

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

query = """
    SELECT word, word_count
    FROM `bigquery-public-data.samples.shakespeare`
    WHERE corpus = @corpus
    AND word_count >= @min_word_count
    ORDER BY word_count DESC;
"""
job_config = bigquery.QueryJobConfig(
    query_parameters=[
        bigquery.ScalarQueryParameter("corpus", "STRING", "romeoandjuliet"),
        bigquery.ScalarQueryParameter("min_word_count", "INT64", 250),
    ]
)
results = client.query_and_wait(
    query, job_config=job_config
)  # Make an API request.

for row in results:
    print("{}: \t{}".format(row.word, row.word_count))
```

### Python: positional parameters

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

query = """
    SELECT word, word_count
    FROM `bigquery-public-data.samples.shakespeare`
    WHERE corpus = ?
    AND word_count >= ?
    ORDER BY word_count DESC;
"""
# Set the name to None to use positional parameters.
# Note that you cannot mix named and positional parameters.
job_config = bigquery.QueryJobConfig(
    query_parameters=[
        bigquery.ScalarQueryParameter(None, "STRING", "romeoandjuliet"),
        bigquery.ScalarQueryParameter(None, "INT64", 250),
    ]
)
results = client.query_and_wait(
    query, job_config=job_config
)  # Make an API request.

for row in results:
    print("{}: \t{}".format(row.word, row.word_count))
```

### Python: array parameter

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

query = """
    SELECT name, sum(number) as count
    FROM `bigquery-public-data.usa_names.usa_1910_2013`
    WHERE gender = @gender
    AND state IN UNNEST(@states)
    GROUP BY name
    ORDER BY count DESC
    LIMIT 10;
"""
job_config = bigquery.QueryJobConfig(
    query_parameters=[
        bigquery.ScalarQueryParameter("gender", "STRING", "M"),
        bigquery.ArrayQueryParameter("states", "STRING", ["WA", "WI", "WV", "WY"]),
    ]
)
rows = client.query_and_wait(query, job_config=job_config)  # Make an API request.

for row in rows:
    print("{}: \t{}".format(row.name, row.count))
```

### Python: struct parameter

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

query = "SELECT @struct_value AS s;"
job_config = bigquery.QueryJobConfig(
    query_parameters=[
        bigquery.StructQueryParameter(
            "struct_value",
            bigquery.ScalarQueryParameter("x", "INT64", 1),
            bigquery.ScalarQueryParameter("y", "STRING", "foo"),
        )
    ]
)
results = client.query_and_wait(
    query, job_config=job_config
)  # Make an API request and waits for results.

for row in results:
    print(row.s)
```

### Node.js: named parameters

```javascript
// Run a query using named query parameters

// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

async function queryParamsNamed() {
  // The SQL query to run
  const sqlQuery = `SELECT word, word_count
        FROM \`bigquery-public-data.samples.shakespeare\`
        WHERE corpus = @corpus
        AND word_count >= @min_word_count
        ORDER BY word_count DESC`;

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
    params: {corpus: 'romeoandjuliet', min_word_count: 250},
  };

  // Run the query
  const [rows] = await bigquery.query(options);

  console.log('Rows:');
  rows.forEach(row => console.log(row));
}
```

## Options / Props

### Limitations

| Limitation |
|------------|
| Query parameters are only supported in GoogleSQL syntax |
| Parameters can't substitute identifiers, column names, table names, or other parts of the query |
| A query parameter value can't be `NULL` |
| A query can use positional (`?`) or named (`@param_name`) parameters, but not both |

### `--parameter` format (bq)

| Form | Meaning |
|------|---------|
| `name:type:value` | Named parameter |
| `name:type:value` with an empty name | Positional parameter |
| `name:type:value` with the type omitted | Assumes `STRING` |

Use `--parameter` together with `--use_legacy_sql=false`; optionally set `--location`. Enclose array type declarations such as `ARRAY<STRING>` in single quotes so the `>` character doesn't redirect output to a file.

### REST fields (job configuration `query`)

| Field | Description |
|-------|-------------|
| `parameterMode` | `NAMED` or `POSITIONAL` |
| `queryParameters` | List of parameters; set `name` to the `@param_name` used in the query |
| `useLegacySql` | Set to `false` for GoogleSQL |
| `parameterType` | Type; for `ARRAY` set `arrayType`; for `STRUCT` add field definitions to `structTypes`; for `RANGE` set `rangeElementType` |
| `parameterValue` | `value`, `arrayValues`, `structValues`, or `rangeValue` (`start` / `end`) |

### Google Cloud console support

| Type | Supported |
|------|-----------|
| `BIGNUMERIC`, `BOOL`, `BYTES`, `DATE`, `DATETIME`, `FLOAT64`, `GEOGRAPHY`, `INT64`, `INTERVAL`, `NUMERIC`, `STRING`, `TIME`, `TIMESTAMP` | Yes |
| `ARRAY`, `STRUCT`, `RANGE` | No |

### Type value formats

| Type | Format |
|------|--------|
| `ARRAY<T>` | Comma-separated list in square brackets, such as `[1, 2, 3]` |
| `STRUCT<T>` | Fields as `field_name TF`, for example `STRUCT<x INT64, y STRING>` |
| `TIMESTAMP` (REST) | `YYYY-MM-DD HH:MM:SS.DDDDDD time_zone` |

## Notes

- The parameter value isn't logged in the BigQuery logs when you run a query with a parameter.
- Adapted from the official docs: the REST range example had `"rangeElementTYpe"` and a parameter `"name": "range_param"` while the query used `@my_param`; they were corrected to `"rangeElementType"` and `"name": "my_param"`.
- The .NET client library does not support struct parameters. Client libraries convert built-in date objects to the TIMESTAMP REST format.
- Related feature: verified parameterized queries in BigQuery conversational analytics (data agents).
- The source also shows Console steps, REST array and struct bodies, and C#, Go, Java and Node.js (positional, array, timestamp, struct) forms.
- Source: https://docs.cloud.google.com/bigquery/docs/parameterized-queries (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [running-queries.md](./running-queries.md)
- [cached-results.md](./cached-results.md)
