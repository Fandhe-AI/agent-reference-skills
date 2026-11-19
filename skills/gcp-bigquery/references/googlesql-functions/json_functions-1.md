---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions
---

# JSON functions (part 1 of 2)

## Signature / Usage

GoogleSQL for BigQuery supports the following functions, which can retrieve and
transform JSON data.

### Categories

The JSON functions are grouped into the following categories based on their
behavior:

| Category | Functions | Description |
|---|---|---|
| Standard extractors | [`JSON_QUERY`](#json_query) [`JSON_VALUE`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_value) [`JSON_QUERY_ARRAY`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_query_array) [`JSON_VALUE_ARRAY`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_value_array) | Functions that extract JSON data. |
| Legacy extractors | [`JSON_EXTRACT`](#json_extract) [`JSON_EXTRACT_SCALAR`](#json_extract_scalar) [`JSON_EXTRACT_ARRAY`](#json_extract_array) [`JSON_EXTRACT_STRING_ARRAY`](#json_extract_string_array) | Functions that extract JSON data. While these functions are supported by GoogleSQL, we recommend using the [standard extractor functions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#extractors). |
| Lax converters | [`LAX_BOOL`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#lax_bool) [`LAX_FLOAT64`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#lax_double) [`LAX_INT64`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#lax_int64) [`LAX_STRING`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#lax_string) | Functions that flexibly convert a JSON value to a SQL value without returning errors. |
| Converters | [`BOOL`](#bool) [`FLOAT64`](#float64) [`INT64`](#int64) [`STRING`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#string_for_json) | Functions that convert a JSON value to a SQL value. |
| Other converters | [`PARSE_JSON`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#parse_json) [`TO_JSON`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#to_json) [`TO_JSON_STRING`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#to_json_string) | Other conversion functions from or to JSON. |
| Constructors | [`JSON_ARRAY`](#json_array) [`JSON_OBJECT`](#json_object) | Functions that create JSON. |
| Mutators | [`JSON_ARRAY_APPEND`](#json_array_append) [`JSON_ARRAY_INSERT`](#json_array_insert) [`JSON_REMOVE`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_remove) [`JSON_SET`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_set) [`JSON_STRIP_NULLS`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_strip_nulls) | Functions that mutate existing JSON. |
| Accessors | [`JSON_KEYS`](#json_keys) [`JSON_TYPE`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_type) | Functions that provide access to JSON properties. |
| Transformers | [`JSON_FLATTEN`](#json_flatten) | Functions that apply a transformation to a JSON value. |

### Function list

| Name | Summary |
|---|---|
| [`BOOL`](#bool) | Converts a JSON boolean to a SQL `BOOL` value. |
| [`FLOAT64`](#float64) | Converts a JSON number to a SQL `FLOAT64` value. |
| [`INT64`](#int64) | Converts a JSON number to a SQL `INT64` value. |
| [`JSON_ARRAY`](#json_array) | Creates a JSON array. |
| [`JSON_ARRAY_APPEND`](#json_array_append) | Appends JSON data to the end of a JSON array. |
| [`JSON_ARRAY_INSERT`](#json_array_insert) | Inserts JSON data into a JSON array. |
| [`JSON_EXTRACT`](#json_extract) | (Deprecated) Extracts a JSON value and converts it to a SQL JSON-formatted `STRING` or `JSON` value. |
| [`JSON_EXTRACT_ARRAY`](#json_extract_array) | (Deprecated) Extracts a JSON array and converts it to a SQL `ARRAY<JSON-formatted STRING>` or `ARRAY<JSON>` value. |
| [`JSON_EXTRACT_SCALAR`](#json_extract_scalar) | (Deprecated) Extracts a JSON scalar value and converts it to a SQL `STRING` value. |
| [`JSON_EXTRACT_STRING_ARRAY`](#json_extract_string_array) | (Deprecated) Extracts a JSON array of scalar values and converts it to a SQL `ARRAY<STRING>` value. |
| [`JSON_FLATTEN`](#json_flatten) | Produces a new SQL `ARRAY<JSON>` value containing all non-array values that are either directly in the input JSON value or children of one or more consecutively nested arrays in the input JSON value. |
| [`JSON_KEYS`](#json_keys) | Extracts unique JSON keys from a JSON expression. |
| [`JSON_OBJECT`](#json_object) | Creates a JSON object. |
| [`JSON_QUERY`](#json_query) | Extracts a JSON value and converts it to a SQL JSON-formatted `STRING` or `JSON` value. |
| [`JSON_QUERY_ARRAY`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_query_array) | Extracts a JSON array and converts it to a SQL `ARRAY<JSON-formatted STRING>` or `ARRAY<JSON>` value. |
| [`JSON_REMOVE`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_remove) | Produces JSON with the specified JSON data removed. |
| [`JSON_SET`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_set) | Inserts or replaces JSON data. |
| [`JSON_STRIP_NULLS`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_strip_nulls) | Removes JSON nulls from JSON objects and JSON arrays. |
| [`JSON_TYPE`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_type) | Gets the JSON type of the outermost JSON value and converts the name of this type to a SQL `STRING` value. |
| [`JSON_VALUE`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_value) | Extracts a JSON scalar value and converts it to a SQL `STRING` value. |
| [`JSON_VALUE_ARRAY`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_value_array) | Extracts a JSON array of scalar values and converts it to a SQL `ARRAY<STRING>` value. |
| [`LAX_BOOL`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#lax_bool) | Attempts to convert a JSON value to a SQL `BOOL` value. |
| [`LAX_FLOAT64`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#lax_double) | Attempts to convert a JSON value to a SQL `FLOAT64` value. |
| [`LAX_INT64`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#lax_int64) | Attempts to convert a JSON value to a SQL `INT64` value. |
| [`LAX_STRING`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#lax_string) | Attempts to convert a JSON value to a SQL `STRING` value. |
| [`PARSE_JSON`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#parse_json) | Converts a JSON-formatted `STRING` value to a `JSON` value. |
| [`STRING` (JSON)](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#string_for_json) | Converts a JSON string to a SQL `STRING` value. |
| [`TO_JSON`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#to_json) | Converts a SQL value to a JSON value. |
| [`TO_JSON_STRING`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#to_json_string) | Converts a SQL value to a JSON-formatted `STRING` value. |

### `BOOL`

```googlesql
BOOL(json_expr)
```

**Description**

Converts a JSON boolean to a SQL `BOOL` value.

Arguments:

- `json_expr`: JSON. For example:

  ```googlesql
  JSON 'true'
  ```

  If the JSON value isn't a boolean, an error is produced. If the expression
  is SQL `NULL`, the function returns SQL `NULL`.

**Return type**

`BOOL`

**Examples**

```googlesql
SELECT BOOL(JSON 'true') AS vacancy;

/*---------+
 | vacancy |
 +---------+
 | true    |
 +---------*/
```

```googlesql
SELECT BOOL(JSON_QUERY(JSON '{"hotel class": "5-star", "vacancy": true}', "$.vacancy")) AS vacancy;

/*---------+
 | vacancy |
 +---------+
 | true    |
 +---------*/
```

The following examples show how invalid requests are handled:

```googlesql
-- An error is thrown if JSON isn't of type bool.
SELECT BOOL(JSON '123') AS result; -- Throws an error
SELECT BOOL(JSON 'null') AS result; -- Throws an error
SELECT SAFE.BOOL(JSON '123') AS result; -- Returns a SQL NULL
```

### `FLOAT64`

```googlesql
FLOAT64(
  json_expr
  [, wide_number_mode => { 'exact' | 'round' } ]
)
```

**Description**

Converts a JSON number to a SQL `FLOAT64` value.

Arguments:

- `json_expr`: JSON. For example:

  ```googlesql
  JSON '9.8'
  ```

  If the JSON value isn't a number, an error is produced. If the expression
  is a SQL `NULL`, the function returns SQL `NULL`.
- `wide_number_mode`: A named argument with a `STRING` value.
  Defines what happens with a number that can't be
  represented as a `FLOAT64` without loss of
  precision. This argument accepts one of the two case-sensitive values:

  - `exact`: The function fails if the result can't be represented as a `FLOAT64` without loss of precision.
  - `round` (default): The numeric value stored in JSON will be rounded to `FLOAT64`. If such rounding isn't possible, the function fails.

**Return type**

`FLOAT64`

**Examples**

```googlesql
SELECT FLOAT64(JSON '9.8') AS velocity;

/*----------+
 | velocity |
 +----------+
 | 9.8      |
 +----------*/
```

```googlesql
SELECT FLOAT64(JSON_QUERY(JSON '{"vo2_max": 39.1, "age": 18}', "$.vo2_max")) AS vo2_max;

/*---------+
 | vo2_max |
 +---------+
 | 39.1    |
 +---------*/
```

```googlesql
SELECT FLOAT64(JSON '18446744073709551615', wide_number_mode=>'round') as result;

/*------------------------+
 | result                 |
 +------------------------+
 | 1.8446744073709552e+19 |
 +------------------------*/
```

```googlesql
SELECT FLOAT64(JSON '18446744073709551615') as result;

/*------------------------+
 | result                 |
 +------------------------+
 | 1.8446744073709552e+19 |
 +------------------------*/
```

The following examples show how invalid requests are handled:

```googlesql
-- An error is thrown if JSON isn't of type FLOAT64.
SELECT FLOAT64(JSON '"strawberry"') AS result;
SELECT FLOAT64(JSON 'null') AS result;

-- An error is thrown because `wide_number_mode` is case-sensitive and not "exact" or "round".
SELECT FLOAT64(JSON '123.4', wide_number_mode=>'EXACT') as result;
SELECT FLOAT64(JSON '123.4', wide_number_mode=>'exac') as result;

-- An error is thrown because the number can't be converted to DOUBLE without loss of precision
SELECT FLOAT64(JSON '18446744073709551615', wide_number_mode=>'exact') as result;

-- Returns a SQL NULL
SELECT SAFE.FLOAT64(JSON '"strawberry"') AS result;
```

### `INT64`

```googlesql
INT64(json_expr)
```

**Description**

Converts a JSON number to a SQL `INT64` value.

Arguments:

- `json_expr`: JSON. For example:

  ```googlesql
  JSON '999'
  ```

  If the JSON value isn't a number, or the JSON number isn't in the SQL
  `INT64` domain, an error is produced. If the expression is SQL `NULL`, the
  function returns SQL `NULL`.

**Return type**

`INT64`

**Examples**

```googlesql
SELECT INT64(JSON '2005') AS flight_number;

/*---------------+
 | flight_number |
 +---------------+
 | 2005          |
 +---------------*/
```

```googlesql
SELECT INT64(JSON_QUERY(JSON '{"gate": "A4", "flight_number": 2005}', "$.flight_number")) AS flight_number;

/*---------------+
 | flight_number |
 +---------------+
 | 2005          |
 +---------------*/
```

```googlesql
SELECT INT64(JSON '10.0') AS score;

/*-------+
 | score |
 +-------+
 | 10    |
 +-------*/
```

The following examples show how invalid requests are handled:

```googlesql
-- An error is thrown if JSON isn't a number or can't be converted to a 64-bit integer.
SELECT INT64(JSON '10.1') AS result;  -- Throws an error
SELECT INT64(JSON '"strawberry"') AS result; -- Throws an error
SELECT INT64(JSON 'null') AS result; -- Throws an error
SELECT SAFE.INT64(JSON '"strawberry"') AS result;  -- Returns a SQL NULL
```

### `JSON_ARRAY`

```googlesql
JSON_ARRAY([value][, ...])
```

**Description**

Creates a JSON array from zero or more SQL values.

Arguments:

- `value`: A [JSON encoding-supported](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_encodings) value to add to a JSON array.

**Return type**

`JSON`

**Examples**

The following query creates a JSON array with one value in it:

```googlesql
SELECT JSON_ARRAY(10) AS json_data

/*-----------+
 | json_data |
 +-----------+
 | [10]      |
 +-----------*/
```

You can create a JSON array with an empty JSON array in it. For example:

```googlesql
SELECT JSON_ARRAY([]) AS json_data

/*-----------+
 | json_data |
 +-----------+
 | [[]]      |
 +-----------*/
```

```googlesql
SELECT JSON_ARRAY(10, 'foo', NULL) AS json_data

/*-----------------+
 | json_data       |
 +-----------------+
 | [10,"foo",null] |
 +-----------------*/
```

```googlesql
SELECT JSON_ARRAY(STRUCT(10 AS a, 'foo' AS b)) AS json_data

/*----------------------+
 | json_data            |
 +----------------------+
 | [{"a":10,"b":"foo"}] |
 +----------------------*/
```

```googlesql
SELECT JSON_ARRAY(10, ['foo', 'bar'], [20, 30]) AS json_data

/*----------------------------+
 | json_data                  |
 +----------------------------+
 | [10,["foo","bar"],[20,30]] |
 +----------------------------*/
```

```googlesql
SELECT JSON_ARRAY(10, [JSON '20', JSON '"foo"']) AS json_data

/*-----------------+
 | json_data       |
 +-----------------+
 | [10,[20,"foo"]] |
 +-----------------*/
```

You can create an empty JSON array. For example:

```googlesql
SELECT JSON_ARRAY() AS json_data

/*-----------+
 | json_data |
 +-----------+
 | []        |
 +-----------*/
```

### `JSON_ARRAY_APPEND`

```googlesql
JSON_ARRAY_APPEND(
  json_expr,
  json_path_value_pair[, ...]
  [, append_each_element => { TRUE | FALSE } ]
)

json_path_value_pair:
  json_path, value
```

Appends JSON data to the end of a JSON array.

Arguments:

- `json_expr`: JSON. For example:

  ```googlesql
  JSON '["a", "b", "c"]'
  ```
- `json_path_value_pair`: A value and the [JSONPath](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_format) for
  that value. This includes:

  - `json_path`: Append `value` at this [JSONPath](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_format)
    in `json_expr`.

  - `value`: A [JSON encoding-supported](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_encodings) value to
    append.

- `append_each_element`: A named argument with a `BOOL` value.

  - If `TRUE` (default), and `value` is a SQL array,
    appends each element individually.

  - If `FALSE,` and `value` is a SQL array, appends
    the array as one element.

Details:

- Path value pairs are evaluated left to right. The JSON produced by evaluating one pair becomes the JSON against which the next pair is evaluated.
- The operation is ignored if the path points to a JSON non-array value that isn't a JSON null.
- If `json_path` points to a JSON null, the JSON null is replaced by a JSON array that contains `value`.
- If the path exists but has an incompatible type at any given path token, the path value pair operation is ignored.
- The function applies all path value pair append operations even if an individual path value pair operation is invalid. For invalid operations, the operation is ignored and the function continues to process the rest of the path value pairs.
- If any `json_path` is an invalid [JSONPath](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_format), an error is produced.
- If `json_expr` is SQL `NULL`, the function returns SQL `NULL`.
- If `append_each_element` is SQL `NULL`, the function returns `json_expr`.
- If `json_path` is SQL `NULL`, the `json_path_value_pair` operation is ignored.

**Return type**

`JSON`

**Examples**

In the following example, path `$` is matched and appends `1`.

```googlesql
SELECT JSON_ARRAY_APPEND(JSON '["a", "b", "c"]', '$', 1) AS json_data

/*-----------------+
 | json_data       |
 +-----------------+
 | ["a","b","c",1] |
 +-----------------*/
```

In the following example, `append_each_element` defaults to `TRUE`, so
`[1, 2]` is appended as individual elements.

```googlesql
SELECT JSON_ARRAY_APPEND(JSON '["a", "b", "c"]', '$', [1, 2]) AS json_data

/*-------------------+
 | json_data         |
 +-------------------+
 | ["a","b","c",1,2] |
 +-------------------*/
```

In the following example, `append_each_element` is `FALSE`, so
`[1, 2]` is appended as one element.

```googlesql
SELECT JSON_ARRAY_APPEND(
  JSON '["a", "b", "c"]',
  '$', [1, 2],
  append_each_element=>FALSE) AS json_data

/*---------------------+
 | json_data           |
 +---------------------+
 | ["a","b","c",[1,2]] |
 +---------------------*/
```

In the following example, `append_each_element` is `FALSE`, so
`[1, 2]` and `[3, 4]` are each appended as one element.

```googlesql
SELECT JSON_ARRAY_APPEND(
  JSON '["a", ["b"], "c"]',
  '$[1]', [1, 2],
  '$[1][1]', [3, 4],
  append_each_element=>FALSE) AS json_data

/*-----------------------------+
 | json_data                   |
 +-----------------------------+
 | ["a",["b",[1,2,[3,4]]],"c"] |
 +-----------------------------*/
```

In the following example, the first path `$[1]` appends `[1, 2]` as single
elements, and then the second path `$[1][1]` isn't a valid path to an array,
so the second operation is ignored.

```googlesql
SELECT JSON_ARRAY_APPEND(
  JSON '["a", ["b"], "c"]',
  '$[1]', [1, 2],
  '$[1][1]', [3, 4]) AS json_data

/*---------------------+
 | json_data           |
 +---------------------+
 | ["a",["b",1,2],"c"] |
 +---------------------*/
```

In the following example, path `$.a` is matched and appends `2`.

```googlesql
SELECT JSON_ARRAY_APPEND(JSON '{"a": [1]}', '$.a', 2) AS json_data

/*-------------+
 | json_data   |
 +-------------+
 | {"a":[1,2]} |
 +-------------*/
```

In the following example, a value is appended into a JSON null.

Adapted (not in the official docs): added the missing `AS json_data` alias so the query matches the column shown.

```googlesql
SELECT JSON_ARRAY_APPEND(JSON '{"a": null}', '$.a', 10) AS json_data

/*------------+
 | json_data  |
 +------------+
 | {"a":[10]} |
 +------------*/
```

In the following example, path `$.a` isn't an array, so the operation is
ignored.

```googlesql
SELECT JSON_ARRAY_APPEND(JSON '{"a": 1}', '$.a', 2) AS json_data

/*-----------+
 | json_data |
 +-----------+
 | {"a":1}   |
 +-----------*/
```

In the following example, path `$.b` doesn't exist, so the operation is
ignored.

```googlesql
SELECT JSON_ARRAY_APPEND(JSON '{"a": 1}', '$.b', 2) AS json_data

/*-----------+
 | json_data |
 +-----------+
 | {"a":1}   |
 +-----------*/
```

### `JSON_ARRAY_INSERT`

```googlesql
JSON_ARRAY_INSERT(
  json_expr,
  json_path_value_pair[, ...]
  [, insert_each_element => { TRUE | FALSE } ]
)

json_path_value_pair:
  json_path, value
```

Produces a new JSON value that's created by inserting JSON data into
a JSON array.

Arguments:

- `json_expr`: JSON. For example:

  ```googlesql
  JSON '["a", "b", "c"]'
  ```
- `json_path_value_pair`: A value and the [JSONPath](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_format) for
  that value. This includes:

  - `json_path`: Insert `value` at this [JSONPath](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_format)
    in `json_expr`.

  - `value`: A [JSON encoding-supported](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_encodings) value to
    insert.

- `insert_each_element`: A named argument with a `BOOL` value.

  - If `TRUE` (default), and `value` is a SQL array,
    inserts each element individually.

  - If `FALSE,` and `value` is a SQL array, inserts
    the array as one element.

Details:

- Path value pairs are evaluated left to right. The JSON produced by evaluating one pair becomes the JSON against which the next pair is evaluated.
- The operation is ignored if the path points to a JSON non-array value that isn't a JSON null.
- If `json_path` points to a JSON null, the JSON null is replaced by a JSON array of the appropriate size and padded on the left with JSON nulls.
- If the path exists but has an incompatible type at any given path token, the path value pair operator is ignored.
- The function applies all path value pair append operations even if an individual path value pair operation is invalid. For invalid operations, the operation is ignored and the function continues to process the rest of the path value pairs.
- If the array index in `json_path` is larger than the size of the array, the function extends the length of the array to the index, fills in the array with JSON nulls, then adds `value` at the index.
- If any `json_path` is an invalid [JSONPath](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_format), an error is produced.
- If `json_expr` is SQL `NULL`, the function returns SQL `NULL`.
- If `insert_each_element` is SQL `NULL`, the function returns `json_expr`.
- If `json_path` is SQL `NULL`, the `json_path_value_pair` operation is ignored.

**Return type**

`JSON`

**Examples**

In the following example, path `$[1]` is matched and inserts `1`.

```googlesql
SELECT JSON_ARRAY_INSERT(JSON '["a", ["b", "c"], "d"]', '$[1]', 1) AS json_data

/*-----------------------+
 | json_data             |
 +-----------------------+
 | ["a",1,["b","c"],"d"] |
 +-----------------------*/
```

In the following example, path `$[1][0]` is matched and inserts `1`.

```googlesql
SELECT JSON_ARRAY_INSERT(JSON '["a", ["b", "c"], "d"]', '$[1][0]', 1) AS json_data

/*-----------------------+
 | json_data             |
 +-----------------------+
 | ["a",[1,"b","c"],"d"] |
 +-----------------------*/
```

In the following example, `insert_each_element` defaults to `TRUE`, so
`[1, 2]` is inserted as individual elements.

```googlesql
SELECT JSON_ARRAY_INSERT(JSON '["a", "b", "c"]', '$[1]', [1, 2]) AS json_data

/*-------------------+
 | json_data         |
 +-------------------+
 | ["a",1,2,"b","c"] |
 +-------------------*/
```

In the following example, `insert_each_element` is `FALSE`, so `[1, 2]` is
inserted as one element.

```googlesql
SELECT JSON_ARRAY_INSERT(
  JSON '["a", "b", "c"]',
  '$[1]', [1, 2],
  insert_each_element=>FALSE) AS json_data

/*---------------------+
 | json_data           |
 +---------------------+
 | ["a",[1,2],"b","c"] |
 +---------------------*/
```

In the following example, path `$[7]` is larger than the length of the
matched array, so the array is extended with JSON nulls and `"e"` is inserted at
the end of the array.

```googlesql
SELECT JSON_ARRAY_INSERT(JSON '["a", "b", "c", "d"]', '$[7]', "e") AS json_data

/*--------------------------------------+
 | json_data                            |
 +--------------------------------------+
 | ["a","b","c","d",null,null,null,"e"] |
 +--------------------------------------*/
```

In the following example, path `$.a` is an object, so the operation is ignored.

```googlesql
SELECT JSON_ARRAY_INSERT(JSON '{"a": {}}', '$.a[0]', 2) AS json_data

/*-----------+
 | json_data |
 +-----------+
 | {"a":{}}  |
 +-----------*/
```

In the following example, path `$` doesn't specify a valid array position,
so the operation is ignored.

```googlesql
SELECT JSON_ARRAY_INSERT(JSON '[1, 2]', '$', 3) AS json_data

/*-----------+
 | json_data |
 +-----------+
 | [1,2]     |
 +-----------*/
```

In the following example, a value is inserted into a JSON null.

```googlesql
SELECT JSON_ARRAY_INSERT(JSON '{"a": null}', '$.a[2]', 10) AS json_data

/*----------------------+
 | json_data            |
 +----------------------+
 | {"a":[null,null,10]} |
 +----------------------*/
```

In the following example, the operation is ignored because you can't insert
data into a JSON number.

```googlesql
SELECT JSON_ARRAY_INSERT(JSON '1', '$[0]', 'r1') AS json_data

/*-----------+
 | json_data |
 +-----------+
 | 1         |
 +-----------*/
```

### `JSON_EXTRACT`

> [!NOTE]
> **Note:** This function is deprecated. Consider using [JSON_QUERY](#json_query).

```googlesql
JSON_EXTRACT(json_string_expr, json_path)
```

```googlesql
JSON_EXTRACT(json_expr, json_path)
```

**Description**

Extracts a JSON value and converts it to a
SQL JSON-formatted `STRING` or `JSON` value.
This function uses single quotes and brackets to escape invalid
[JSONPath](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_format) characters in JSON keys. For example: `['a.b']`.

Arguments:

- `json_string_expr`: A JSON-formatted string. For example:

  ```googlesql
  '{"class": {"students": [{"name": "Jane"}]}}'
  ```

  Extracts a SQL `NULL` when a JSON-formatted string `null` is encountered.
  For example:

  ```googlesql
  SELECT JSON_EXTRACT("null", "$") -- Returns a SQL NULL
  ```
- `json_expr`: JSON. For example:

  ```googlesql
  JSON '{"class": {"students": [{"name": "Jane"}]}}'
  ```

  Extracts a JSON `null` when a JSON `null` is encountered.

  ```googlesql
  SELECT JSON_EXTRACT(JSON 'null', "$") -- Returns a JSON 'null'
  ```
- `json_path`: The [JSONPath](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_format). This identifies the data that
  you want to obtain from the input.

There are differences between the JSON-formatted string and JSON input types.
For details, see [Differences between the JSON and JSON-formatted STRING types](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#differences_json_and_string).

**Return type**

- `json_string_expr`: A JSON-formatted `STRING`
- `json_expr`: `JSON`

**Examples**

In the following example, JSON data is extracted and returned as JSON.

```googlesql
SELECT
  JSON_EXTRACT(JSON '{"class": {"students": [{"id": 5}, {"id": 12}]}}', '$.class')
  AS json_data;

/*-----------------------------------+
 | json_data                         |
 +-----------------------------------+
 | {"students":[{"id":5},{"id":12}]} |
 +-----------------------------------*/
```

In the following examples, JSON data is extracted and returned as
JSON-formatted strings.

```googlesql
SELECT JSON_EXTRACT(
  '{"class": {"students": [{"name": "Jane"}]}}',
  '$') AS json_text_string;

/*-----------------------------------------------------------+
 | json_text_string                                          |
 +-----------------------------------------------------------+
 | {"class":{"students":[{"name":"Jane"}]}}                  |
 +-----------------------------------------------------------*/
```

```googlesql
SELECT JSON_EXTRACT(
  '{"class": {"students": []}}',
  '$') AS json_text_string;

/*-----------------------------------------------------------+
 | json_text_string                                          |
 +-----------------------------------------------------------+
 | {"class":{"students":[]}}                                 |
 +-----------------------------------------------------------*/
```

```googlesql
SELECT JSON_EXTRACT(
  '{"class": {"students": [{"name": "John"}, {"name": "Jamie"}]}}',
  '$') AS json_text_string;

/*-----------------------------------------------------------+
 | json_text_string                                          |
 +-----------------------------------------------------------+
 | {"class":{"students":[{"name":"John"},{"name":"Jamie"}]}} |
 +-----------------------------------------------------------*/
```

```googlesql
SELECT JSON_EXTRACT(
  '{"class": {"students": [{"name": "Jane"}]}}',
  '$.class.students[0]') AS first_student;

/*-----------------+
 | first_student   |
 +-----------------+
 | {"name":"Jane"} |
 +-----------------*/
```

```googlesql
SELECT JSON_EXTRACT(
  '{"class": {"students": []}}',
  '$.class.students[0]') AS first_student;

/*-----------------+
 | first_student   |
 +-----------------+
 | NULL            |
 +-----------------*/
```

```googlesql
SELECT JSON_EXTRACT(
  '{"class": {"students": [{"name": "John"}, {"name": "Jamie"}]}}',
  '$.class.students[0]') AS first_student;

/*-----------------+
 | first_student   |
 +-----------------+
 | {"name":"John"} |
 +-----------------*/
```

```googlesql
SELECT JSON_EXTRACT(
  '{"class": {"students": [{"name": "Jane"}]}}',
  '$.class.students[1].name') AS second_student;

/*----------------+
 | second_student |
 +----------------+
 | NULL           |
 +----------------*/
```

```googlesql
SELECT JSON_EXTRACT(
  '{"class": {"students": []}}',
  '$.class.students[1].name') AS second_student;

/*----------------+
 | second_student |
 +----------------+
 | NULL           |
 +----------------*/
```

```googlesql
SELECT JSON_EXTRACT(
  '{"class": {"students": [{"name": "John"}, {"name": null}]}}',
  '$.class.students[1].name') AS second_student;

/*----------------+
 | second_student |
 +----------------+
 | NULL           |
 +----------------*/
```

```googlesql
SELECT JSON_EXTRACT(
  '{"class": {"students": [{"name": "John"}, {"name": "Jamie"}]}}',
  '$.class.students[1].name') AS second_student;

/*----------------+
 | second_student |
 +----------------+
 | "Jamie"        |
 +----------------*/
```

```googlesql
SELECT JSON_EXTRACT(
  '{"class": {"students": [{"name": "Jane"}]}}',
  "$.class['students']") AS student_names;

/*------------------------------------+
 | student_names                      |
 +------------------------------------+
 | [{"name":"Jane"}]                  |
 +------------------------------------*/
```

```googlesql
SELECT JSON_EXTRACT(
  '{"class": {"students": []}}',
  "$.class['students']") AS student_names;

/*------------------------------------+
 | student_names                      |
 +------------------------------------+
 | []                                 |
 +------------------------------------*/
```

```googlesql
SELECT JSON_EXTRACT(
  '{"class": {"students": [{"name": "John"}, {"name": "Jamie"}]}}',
  "$.class['students']") AS student_names;

/*------------------------------------+
 | student_names                      |
 +------------------------------------+
 | [{"name":"John"},{"name":"Jamie"}] |
 +------------------------------------*/
```

```googlesql
SELECT JSON_EXTRACT('{"a": null}', "$.a"); -- Returns a SQL NULL
SELECT JSON_EXTRACT('{"a": null}', "$.b"); -- Returns a SQL NULL
```

```googlesql
SELECT JSON_EXTRACT(JSON '{"a": null}', "$.a"); -- Returns a JSON 'null'
SELECT JSON_EXTRACT(JSON '{"a": null}', "$.b"); -- Returns a SQL NULL
```

### `JSON_EXTRACT_ARRAY`

> [!NOTE]
> **Note:** This function is deprecated. Consider using [JSON_QUERY_ARRAY](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_query_array).

```googlesql
JSON_EXTRACT_ARRAY(json_string_expr[, json_path])
```

```googlesql
JSON_EXTRACT_ARRAY(json_expr[, json_path])
```

**Description**

Extracts a JSON array and converts it to
a SQL `ARRAY<JSON-formatted STRING>` or
`ARRAY<JSON>` value.
This function uses single quotes and brackets to escape invalid
[JSONPath](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_format) characters in JSON keys. For example: `['a.b']`.

Arguments:

- `json_string_expr`: A JSON-formatted string. For example:

  ```googlesql
  '["a", "b", {"key": "c"}]'
  ```
- `json_expr`: JSON. For example:

  ```googlesql
  JSON '["a", "b", {"key": "c"}]'
  ```
- `json_path`: The [JSONPath](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_format). This identifies the data that
  you want to obtain from the input. If this optional parameter isn't
  provided, then the JSONPath `$` symbol is applied, which means that all of
  the data is analyzed.

There are differences between the JSON-formatted string and JSON input types.
For details, see [Differences between the JSON and JSON-formatted STRING types](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#differences_json_and_string).

**Return type**

- `json_string_expr`: `ARRAY<JSON-formatted STRING>`
- `json_expr`: `ARRAY<JSON>`

**Examples**

This extracts items in JSON to an array of `JSON` values:

```googlesql
SELECT JSON_EXTRACT_ARRAY(
  JSON '{"fruits":["apples","oranges","grapes"]}','$.fruits'
  ) AS json_array;

/*---------------------------------+
 | json_array                      |
 +---------------------------------+
 | ["apples", "oranges", "grapes"] |
 +---------------------------------*/
```

This extracts the items in a JSON-formatted string to a string array:

```googlesql
SELECT JSON_EXTRACT_ARRAY('[1,2,3]') AS string_array;

/*--------------+
 | string_array |
 +--------------+
 | [1, 2, 3]    |
 +--------------*/
```

This extracts a string array and converts it to an integer array:

```googlesql
SELECT ARRAY(
  SELECT CAST(integer_element AS INT64)
  FROM UNNEST(
    JSON_EXTRACT_ARRAY('[1,2,3]','$')
  ) AS integer_element
) AS integer_array;

/*---------------+
 | integer_array |
 +---------------+
 | [1, 2, 3]     |
 +---------------*/
```

This extracts string values in a JSON-formatted string to an array:

```googlesql
-- Doesn't strip the double quotes
SELECT JSON_EXTRACT_ARRAY('["apples", "oranges", "grapes"]', '$') AS string_array;

/*---------------------------------+
 | string_array                    |
 +---------------------------------+
 | ["apples", "oranges", "grapes"] |
 +---------------------------------*/

-- Strips the double quotes
SELECT ARRAY(
  SELECT JSON_EXTRACT_SCALAR(string_element, '$')
  FROM UNNEST(JSON_EXTRACT_ARRAY('["apples","oranges","grapes"]','$')) AS string_element
) AS string_array;

/*---------------------------+
 | string_array              |
 +---------------------------+
 | [apples, oranges, grapes] |
 +---------------------------*/
```

This extracts only the items in the `fruit` property to an array:

```googlesql
SELECT JSON_EXTRACT_ARRAY(
  '{"fruit": [{"apples": 5, "oranges": 10}, {"apples": 2, "oranges": 4}], "vegetables": [{"lettuce": 7, "kale": 8}]}',
  '$.fruit'
) AS string_array;

/*-------------------------------------------------------+
 | string_array                                          |
 +-------------------------------------------------------+
 | [{"apples":5,"oranges":10}, {"apples":2,"oranges":4}] |
 +-------------------------------------------------------*/
```

These are equivalent:

```googlesql
SELECT JSON_EXTRACT_ARRAY('{"fruits": ["apples", "oranges", "grapes"]}', '$[fruits]') AS string_array;

SELECT JSON_EXTRACT_ARRAY('{"fruits": ["apples", "oranges", "grapes"]}', '$.fruits') AS string_array;

-- The queries above produce the following result:
/*---------------------------------+
 | string_array                    |
 +---------------------------------+
 | ["apples", "oranges", "grapes"] |
 +---------------------------------*/
```

In cases where a JSON key uses invalid JSONPath characters, you can escape those
characters using single quotes and brackets, `[' ']`. For example:

```googlesql
SELECT JSON_EXTRACT_ARRAY('{"a.b": {"c": ["world"]}}', "$['a.b'].c") AS hello;

/*-----------+
 | hello     |
 +-----------+
 | ["world"] |
 +-----------*/
```

The following examples explore how invalid requests and empty arrays are
handled:

- If a JSONPath is invalid, an error is thrown.
- If a JSON-formatted string is invalid, the output is NULL.
- It's okay to have empty arrays in the JSON-formatted string.

```googlesql
-- An error is thrown if you provide an invalid JSONPath.
SELECT JSON_EXTRACT_ARRAY('["foo", "bar", "baz"]', 'INVALID_JSONPath') AS result;

-- If the JSONPath doesn't refer to an array, then NULL is returned.
SELECT JSON_EXTRACT_ARRAY('{"a": "foo"}', '$.a') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/

-- If a key that doesn't exist is specified, then the result is NULL.
SELECT JSON_EXTRACT_ARRAY('{"a": "foo"}', '$.b') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/

-- Empty arrays in JSON-formatted strings are supported.
SELECT JSON_EXTRACT_ARRAY('{"a": "foo", "b": []}', '$.b') AS result;

/*--------+
 | result |
 +--------+
 | []     |
 +--------*/
```

### `JSON_EXTRACT_SCALAR`

> [!NOTE]
> **Note:** This function is deprecated. Consider using [JSON_VALUE](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_value).

```googlesql
JSON_EXTRACT_SCALAR(json_string_expr[, json_path])
```

```googlesql
JSON_EXTRACT_SCALAR(json_expr[, json_path])
```

**Description**

Extracts a JSON scalar value and converts it to a SQL `STRING` value.
In addition, this function:

- Removes the outermost quotes and unescapes the return values.
- Returns a SQL `NULL` if a non-scalar value is selected.
- Uses single quotes and brackets to escape invalid [JSONPath](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_format) characters in JSON keys. For example: `['a.b']`.

Arguments:

- `json_string_expr`: A JSON-formatted string. For example:

  ```googlesql
  '{"name": "Jane", "age": "6"}'
  ```
- `json_expr`: JSON. For example:

  ```googlesql
  JSON '{"name": "Jane", "age": "6"}'
  ```
- `json_path`: The [JSONPath](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_format). This identifies the data that
  you want to obtain from the input. If this optional parameter isn't
  provided, then the JSONPath `$` symbol is applied, which means that all of
  the data is analyzed.

  If `json_path` returns a JSON `null` or a non-scalar value (in other words,
  if `json_path` refers to an object or an array), then a SQL `NULL` is
  returned.

There are differences between the JSON-formatted string and JSON input types.
For details, see [Differences between the JSON and JSON-formatted STRING types](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#differences_json_and_string).

**Return type**

`STRING`

**Examples**

In the following example, `age` is extracted.

```googlesql
SELECT JSON_EXTRACT_SCALAR(JSON '{"name": "Jakob", "age": "6" }', '$.age') AS scalar_age;

/*------------+
 | scalar_age |
 +------------+
 | 6          |
 +------------*/
```

The following example compares how results are returned for the `JSON_EXTRACT`
and `JSON_EXTRACT_SCALAR` functions.

```googlesql
SELECT JSON_EXTRACT('{"name": "Jakob", "age": "6" }', '$.name') AS json_name,
  JSON_EXTRACT_SCALAR('{"name": "Jakob", "age": "6" }', '$.name') AS scalar_name,
  JSON_EXTRACT('{"name": "Jakob", "age": "6" }', '$.age') AS json_age,
  JSON_EXTRACT_SCALAR('{"name": "Jakob", "age": "6" }', '$.age') AS scalar_age;

/*-----------+-------------+----------+------------+
 | json_name | scalar_name | json_age | scalar_age |
 +-----------+-------------+----------+------------+
 | "Jakob"   | Jakob       | "6"      | 6          |
 +-----------+-------------+----------+------------*/
```

```googlesql
SELECT JSON_EXTRACT('{"fruits": ["apple", "banana"]}', '$.fruits') AS json_extract,
  JSON_EXTRACT_SCALAR('{"fruits": ["apple", "banana"]}', '$.fruits') AS json_extract_scalar;

/*--------------------+---------------------+
 | json_extract       | json_extract_scalar |
 +--------------------+---------------------+
 | ["apple","banana"] | NULL                |
 +--------------------+---------------------*/
```

In cases where a JSON key uses invalid JSONPath characters, you can escape those
characters using single quotes and brackets, `[' ']`. For example:

```googlesql
SELECT JSON_EXTRACT_SCALAR('{"a.b": {"c": "world"}}', "$['a.b'].c") AS hello;

/*-------+
 | hello |
 +-------+
 | world |
 +-------*/
```

### `JSON_EXTRACT_STRING_ARRAY`

> [!NOTE]
> **Note:** This function is deprecated. Consider using [JSON_VALUE_ARRAY](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_value_array).

```googlesql
JSON_EXTRACT_STRING_ARRAY(json_string_expr[, json_path])
```

```googlesql
JSON_EXTRACT_STRING_ARRAY(json_expr[, json_path])
```

**Description**

Extracts a JSON array of scalar values and converts it to a SQL `ARRAY<STRING>`
value. In addition, this function:

- Removes the outermost quotes and unescapes the values.
- Returns a SQL `NULL` if the selected value isn't an array or not an array containing only scalar values.
- Uses single quotes and brackets to escape invalid [JSONPath](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_format) characters in JSON keys. For example: `['a.b']`.

Arguments:

- `json_string_expr`: A JSON-formatted string. For example:

  ```googlesql
  '["apples", "oranges", "grapes"]'
  ```
- `json_expr`: JSON. For example:

  ```googlesql
  JSON '["apples", "oranges", "grapes"]'
  ```
- `json_path`: The [JSONPath](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_format). This identifies the data that
  you want to obtain from the input. If this optional parameter isn't
  provided, then the JSONPath `$` symbol is applied, which means that all of
  the data is analyzed.

There are differences between the JSON-formatted string and JSON input types.
For details, see [Differences between the JSON and JSON-formatted STRING types](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#differences_json_and_string).

Caveats:

- A JSON `null` in the input array produces a SQL `NULL` as the output for that JSON `null`. If the output contains a `NULL` array element, an error is produced because the final output can't be an array with `NULL` values.
- If a JSONPath matches an array that contains scalar objects and a JSON `null`, then the output of the function must be transformed because the final output can't be an array with `NULL` values.

**Return type**

`ARRAY<STRING>`

**Examples**

This extracts items in JSON to a string array:

```googlesql
SELECT JSON_EXTRACT_STRING_ARRAY(
  JSON '{"fruits": ["apples", "oranges", "grapes"]}', '$.fruits'
  ) AS string_array;

/*---------------------------+
 | string_array              |
 +---------------------------+
 | [apples, oranges, grapes] |
 +---------------------------*/
```

The following example compares how results are returned for the
`JSON_EXTRACT_ARRAY` and `JSON_EXTRACT_STRING_ARRAY` functions.

```googlesql
SELECT JSON_EXTRACT_ARRAY('["apples", "oranges"]') AS json_array,
JSON_EXTRACT_STRING_ARRAY('["apples", "oranges"]') AS string_array;

/*-----------------------+-------------------+
 | json_array            | string_array      |
 +-----------------------+-------------------+
 | ["apples", "oranges"] | [apples, oranges] |
 +-----------------------+-------------------*/
```

This extracts the items in a JSON-formatted string to a string array:

```googlesql
-- Strips the double quotes
SELECT JSON_EXTRACT_STRING_ARRAY('["foo", "bar", "baz"]', '$') AS string_array;

/*-----------------+
 | string_array    |
 +-----------------+
 | [foo, bar, baz] |
 +-----------------*/
```

This extracts a string array and converts it to an integer array:

```googlesql
SELECT ARRAY(
  SELECT CAST(integer_element AS INT64)
  FROM UNNEST(
    JSON_EXTRACT_STRING_ARRAY('[1, 2, 3]', '$')
  ) AS integer_element
) AS integer_array;

/*---------------+
 | integer_array |
 +---------------+
 | [1, 2, 3]     |
 +---------------*/
```

These are equivalent:

```googlesql
SELECT JSON_EXTRACT_STRING_ARRAY('{"fruits": ["apples", "oranges", "grapes"]}', '$[fruits]') AS string_array;

SELECT JSON_EXTRACT_STRING_ARRAY('{"fruits": ["apples", "oranges", "grapes"]}', '$.fruits') AS string_array;

-- The queries above produce the following result:
/*---------------------------+
 | string_array              |
 +---------------------------+
 | [apples, oranges, grapes] |
 +---------------------------*/
```

In cases where a JSON key uses invalid JSONPath characters, you can escape those
characters using single quotes and brackets: `[' ']`. For example:

```googlesql
SELECT JSON_EXTRACT_STRING_ARRAY('{"a.b": {"c": ["world"]}}', "$['a.b'].c") AS hello;

/*---------+
 | hello   |
 +---------+
 | [world] |
 +---------*/
```

The following examples explore how invalid requests and empty arrays are
handled:

Adapted (not in the official docs): added the missing closing `}` of the JSON object in the input string.

```googlesql
-- An error is thrown if you provide an invalid JSONPath.
SELECT JSON_EXTRACT_STRING_ARRAY('["foo", "bar", "baz"]', 'INVALID_JSONPath') AS result;

-- If the JSON formatted string is invalid, then NULL is returned.
SELECT JSON_EXTRACT_STRING_ARRAY('}}', '$') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/

-- If the JSON document is NULL, then NULL is returned.
SELECT JSON_EXTRACT_STRING_ARRAY(NULL, '$') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/

-- If a JSONPath doesn't match anything, then the output is NULL.
SELECT JSON_EXTRACT_STRING_ARRAY('{"a": ["foo", "bar", "baz"]}', '$.b') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/

-- If a JSONPath matches an object that isn't an array, then the output is NULL.
SELECT JSON_EXTRACT_STRING_ARRAY('{"a": "foo"}', '$') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/

-- If a JSONPath matches an array of non-scalar objects, then the output is NULL.
SELECT JSON_EXTRACT_STRING_ARRAY('{"a": [{"b": "foo", "c": 1}, {"b": "bar", "c":2}], "d": "baz"}', '$.a') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/

-- If a JSONPath matches an array of mixed scalar and non-scalar objects, then the output is NULL.
SELECT JSON_EXTRACT_STRING_ARRAY('{"a": [10, {"b": 20}]}', '$.a') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/

-- If a JSONPath matches an empty JSON array, then the output is an empty array instead of NULL.
SELECT JSON_EXTRACT_STRING_ARRAY('{"a": "foo", "b": []}', '$.b') AS result;

/*--------+
 | result |
 +--------+
 | []     |
 +--------*/

-- The following query produces and error because the final output can't be an
-- array with NULLs.
SELECT JSON_EXTRACT_STRING_ARRAY('["world", 1, null]') AS result;
```

### `JSON_FLATTEN`

```googlesql
JSON_FLATTEN(json_expr)
```

**Description**

Produces a new SQL `ARRAY<JSON>` value containing all non-array values that are
either directly in the input JSON value or children of one or more consecutively
nested arrays in the input JSON value.

Arguments:

- `json_expr`: `JSON`. For example:

  ```googlesql
  JSON '["Jane", ["John", "Jamie"]]'
  ```

Details:

- If `json_expr` is SQL `NULL`, the function returns SQL `NULL`.

**Return type**

`ARRAY<JSON>`

**Examples**

In the following example, there is a single non-array value that is returned.

```googlesql
SELECT JSON_FLATTEN(JSON '1') AS json_flatten

/*--------------+
 | json_flatten |
 +--------------+
 | [1]          |
 +--------------*/
```

In the following example, an input array of values is flattened.

```googlesql
SELECT JSON_FLATTEN(JSON '[1, 2, null]') AS json_flatten

/*--------------+
 | json_flatten |
 +--------------+
 | [1, 2, null] |
 +--------------*/
```

In the following example, an input array which includes nested array elements is
flattened.

```googlesql
SELECT JSON_FLATTEN(JSON '[[[1]], 2, [3]]') AS json_flatten

/*--------------+
 | json_flatten |
 +--------------+
 | [1, 2, 3]    |
 +--------------*/
```

In the following example, the nested-array value in a key-value pair is not
flattened because it is enclosed within a JSON object.

```googlesql
SELECT JSON_FLATTEN(JSON '{"a": [[1]]}') AS json_flatten

/*---------------+
 | json_flatten  |
 +---------------+
 | [{"a":[[1]]}] |
 +---------------*/
```

In the following example, the output contains both the flattened array elements
from the input and the non-array elements from the input.

```googlesql
SELECT JSON_FLATTEN(JSON '[[[1, 2], 3], {"a": 4}, true]') AS json_flatten

/*---------------------------+
 | json_flatten              |
 +---------------------------+
 | [1, 2, 3, {"a": 4}, true] |
 +---------------------------*/
```

### `JSON_KEYS`

```googlesql
JSON_KEYS(
  json_expr
  [, max_depth ]
  [, mode => { 'strict' | 'lax' | 'lax recursive' } ]
)
```

**Description**

Extracts unique JSON keys from a JSON expression.

Arguments:

- `json_expr`: `JSON`. For example:

  ```googlesql
  JSON '{"class": {"students": [{"name": "Jane"}]}}'
  ```
- `max_depth`: An `INT64` value that represents the maximum depth of nested
  fields to search in `json_expr`. If not
  set, the function searches the entire JSON document.

- `mode`: A named argument with a `STRING` value that can be one of the
  following:

  - `strict` (default): Ignore any key that appears in an array.
  - `lax`: Also include keys contained in non-consecutively nested arrays.
  - `lax recursive`: Return all keys.

Details:

- Keys are de-duplicated and returned in alphabetical order.
- Keys don't include array indices.
- Keys containing special characters are escaped using double quotes.
- Keys are case sensitive and not normalized.
- If `json_expr` or `mode` is SQL `NULL`, the function returns SQL `NULL`.
- If `max_depth` is SQL `NULL`, the function ignores the argument.
- If `max_depth` is less than or equal to 0, then an error is returned.

**Return type**

`ARRAY<STRING>`

**Examples**

In the following example, there are no arrays, so all keys are returned.

```googlesql
SELECT JSON_KEYS(JSON '{"a": {"b":1}}') AS json_keys

/*-----------+
 | json_keys |
 +-----------+
 | [a, a.b]  |
 +-----------*/
```

In the following example, `max_depth` is set to 1 so "a.b" isn't included.

```googlesql
SELECT JSON_KEYS(JSON '{"a": {"b":1}}', 1) AS json_keys

/*-----------+
 | json_keys |
 +-----------+
 | [a]       |
 +-----------*/
```

In the following example, the `json_expr` argument contains an array. Because
the mode is `strict`, keys inside the array are excluded.

```googlesql
SELECT JSON_KEYS(JSON '{"a":[{"b":1}, {"c":2}], "d":3}') AS json_keys

/*-----------+
 | json_keys |
 +-----------+
 | [a, d]    |
 +-----------*/
```

In the following example, the `json_expr` argument contains an array. Because
the mode is `lax`, keys inside the array are included.

```googlesql
SELECT JSON_KEYS(
  JSON '{"a":[{"b":1}, {"c":2}], "d":3}',
  mode => "lax") as json_keys

/*------------------+
 | json_keys        |
 +------------------+
 | [a, a.b, a.c, d] |
 +------------------*/
```

In the following example, the `json_expr` argument contains consecutively nested
arrays. Because the mode is `lax`, keys inside the consecutively nested arrays
aren't included.

```googlesql
SELECT JSON_KEYS(JSON '{"a":[[{"b":1}]]}', mode => "lax") as json_keys

/*-----------+
 | json_keys |
 +-----------+
 | [a]       |
 +-----------*/
```

In the following example, the `json_expr` argument contains consecutively nested
arrays. Because the mode is `lax recursive`, every key is returned.

```googlesql
SELECT JSON_KEYS(JSON '{"a":[[{"b":1}]]}', mode => "lax recursive") as json_keys

/*-----------+
 | json_keys |
 +-----------+
 | [a, a.b]  |
 +-----------*/
```

In the following example, the `json_expr` argument contains multiple arrays.
Because the arrays aren't consecutively nested and the mode is `lax`, keys
inside the arrays are included.

```googlesql
SELECT JSON_KEYS(JSON '{"a":[{"b":[{"c":1}]}]}', mode => "lax") as json_keys

/*-----------------+
 | json_keys       |
 +-----------------+
 | [a, a.b, a.b.c] |
 +-----------------*/
```

In the following example, the `json_expr` argument contains both consecutively
nested and single arrays. Because the mode is `lax`, keys inside the
consecutively nested arrays are excluded.

```googlesql
SELECT JSON_KEYS(JSON '{"a":[{"b":[[{"c":1}]]}]}', mode => "lax") as json_keys

/*-----------+
 | json_keys |
 +-----------+
 | [a, a.b]  |
 +-----------*/
```

In the following example, the `json_expr` argument contains both consecutively
nested and single arrays. Because the mode is `lax recursive`, all keys are
included.

```googlesql
SELECT JSON_KEYS(
  JSON '{"a":[{"b":[[{"c":1}]]}]}', mode => "lax recursive") as json_keys

/*-----------------+
 | json_keys       |
 +-----------------+
 | [a, a.b, a.b.c] |
 +-----------------*/
```

### `JSON_OBJECT`

- [Signature 1](#signature-1): `JSON_OBJECT([json_key, json_value][, ...])`
- [Signature 2](#signature-2): `JSON_OBJECT(json_key_array, json_value_array)`

##### Signature 1

```googlesql
JSON_OBJECT([json_key, json_value][, ...])
```

**Description**

Creates a JSON object, using key-value pairs.

Arguments:

- `json_key`: A `STRING` value that represents a key.
- `json_value`: A [JSON encoding-supported](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_encodings) value.

Details:

- If two keys are passed in with the same name, only the first key-value pair is preserved.
- The order of key-value pairs isn't preserved.
- If `json_key` is `NULL`, an error is produced.

**Return type**

`JSON`

**Examples**

You can create an empty JSON object by passing in no JSON keys and values.
For example:

```googlesql
SELECT JSON_OBJECT() AS json_data

/*-----------+
 | json_data |
 +-----------+
 | {}        |
 +-----------*/
```

You can create a JSON object by passing in key-value pairs. For example:

```googlesql
SELECT JSON_OBJECT('foo', 10, 'bar', TRUE) AS json_data

/*-----------------------+
 | json_data             |
 +-----------------------+
 | {"bar":true,"foo":10} |
 +-----------------------*/
```

```googlesql
SELECT JSON_OBJECT('foo', 10, 'bar', ['a', 'b']) AS json_data

/*----------------------------+
 | json_data                  |
 +----------------------------+
 | {"bar":["a","b"],"foo":10} |
 +----------------------------*/
```

```googlesql
SELECT JSON_OBJECT('a', NULL, 'b', JSON 'null') AS json_data

/*---------------------+
 | json_data           |
 +---------------------+
 | {"a":null,"b":null} |
 +---------------------*/
```

```googlesql
SELECT JSON_OBJECT('a', 10, 'a', 'foo') AS json_data

/*-----------+
 | json_data |
 +-----------+
 | {"a":10}  |
 +-----------*/
```

```googlesql
WITH Items AS (SELECT 'hello' AS key, 'world' AS value)
SELECT JSON_OBJECT(key, value) AS json_data FROM Items

/*-------------------+
 | json_data         |
 +-------------------+
 | {"hello":"world"} |
 +-------------------*/
```

An error is produced if a SQL `NULL` is passed in for a JSON key.

```googlesql
-- Error: A key can't be NULL.
SELECT JSON_OBJECT(NULL, 1) AS json_data
```

An error is produced if the number of JSON keys and JSON values don't match:

```googlesql
-- Error: No matching signature for function JSON_OBJECT for argument types:
-- STRING, INT64, STRING
SELECT JSON_OBJECT('a', 1, 'b') AS json_data
```

##### Signature 2

```googlesql
JSON_OBJECT(json_key_array, json_value_array)
```

Creates a JSON object, using an array of keys and values.

Arguments:

- `json_key_array`: An array of zero or more `STRING` keys.
- `json_value_array`: An array of zero or more [JSON encoding-supported](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_encodings) values.

Details:

- If two keys are passed in with the same name, only the first key-value pair is preserved.
- The order of key-value pairs isn't preserved.
- The number of keys must match the number of values, otherwise an error is produced.
- If any argument is `NULL`, an error is produced.
- If a key in `json_key_array` is `NULL`, an error is produced.

**Return type**

`JSON`

**Examples**

You can create an empty JSON object by passing in an empty array of
keys and values. For example:

```googlesql
SELECT JSON_OBJECT(CAST([] AS ARRAY<STRING>), []) AS json_data

/*-----------+
 | json_data |
 +-----------+
 | {}        |
 +-----------*/
```

You can create a JSON object by passing in an array of keys and an array of
values. For example:

```googlesql
SELECT JSON_OBJECT(['a', 'b'], [10, NULL]) AS json_data

/*-------------------+
 | json_data         |
 +-------------------+
 | {"a":10,"b":null} |
 +-------------------*/
```

```googlesql
SELECT JSON_OBJECT(['a', 'b'], [JSON '10', JSON '"foo"']) AS json_data

/*--------------------+
 | json_data          |
 +--------------------+
 | {"a":10,"b":"foo"} |
 +--------------------*/
```

```googlesql
SELECT
  JSON_OBJECT(
    ['a', 'b'],
    [STRUCT(10 AS id, 'Red' AS color), STRUCT(20 AS id, 'Blue' AS color)])
    AS json_data

/*------------------------------------------------------------+
 | json_data                                                  |
 +------------------------------------------------------------+
 | {"a":{"color":"Red","id":10},"b":{"color":"Blue","id":20}} |
 +------------------------------------------------------------*/
```

```googlesql
SELECT
  JSON_OBJECT(
    ['a', 'b'],
    [TO_JSON(10), TO_JSON(['foo', 'bar'])])
    AS json_data

/*----------------------------+
 | json_data                  |
 +----------------------------+
 | {"a":10,"b":["foo","bar"]} |
 +----------------------------*/
```

The following query groups by `id` and then creates an array of keys and
values from the rows with the same `id`:

```googlesql
WITH
  Fruits AS (
    SELECT 0 AS id, 'color' AS json_key, 'red' AS json_value UNION ALL
    SELECT 0, 'fruit', 'apple' UNION ALL
    SELECT 1, 'fruit', 'banana' UNION ALL
    SELECT 1, 'ripe', 'true'
  )
SELECT JSON_OBJECT(ARRAY_AGG(json_key), ARRAY_AGG(json_value)) AS json_data
FROM Fruits
GROUP BY id

/*----------------------------------+
 | json_data                        |
 +----------------------------------+
 | {"color":"red","fruit":"apple"}  |
 | {"fruit":"banana","ripe":"true"} |
 +----------------------------------*/
```

An error is produced if the size of the JSON keys and values arrays don't
match:

```googlesql
-- Error: The number of keys and values must match.
SELECT JSON_OBJECT(['a', 'b'], [10]) AS json_data
```

An error is produced if the array of JSON keys or JSON values is a SQL `NULL`.

```googlesql
-- Error: The keys array can't be NULL.
SELECT JSON_OBJECT(CAST(NULL AS ARRAY<STRING>), [10, 20]) AS json_data
```

```googlesql
-- Error: The values array can't be NULL.
SELECT JSON_OBJECT(['a', 'b'], CAST(NULL AS ARRAY<INT64>)) AS json_data
```

### `JSON_QUERY`

```googlesql
JSON_QUERY(json_string_expr, json_path)
```

```googlesql
JSON_QUERY(json_expr, json_path)
```

**Description**

Extracts a JSON value and converts it to a SQL
JSON-formatted `STRING` or
`JSON` value.
This function uses double quotes to escape invalid
[JSONPath](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_format) characters in JSON keys. For example: `"a.b"`.

Arguments:

- `json_string_expr`: A JSON-formatted string. For example:

  ```googlesql
  '{"class": {"students": [{"name": "Jane"}]}}'
  ```

  Extracts a SQL `NULL` when a JSON-formatted string `null` is encountered.
  For example:

  ```googlesql
  SELECT JSON_QUERY("null", "$") -- Returns a SQL NULL
  ```
- `json_expr`: JSON. For example:

  ```googlesql
  JSON '{"class": {"students": [{"name": "Jane"}]}}'
  ```

  Extracts a JSON `null` when a JSON `null` is encountered.

  ```googlesql
  SELECT JSON_QUERY(JSON 'null', "$") -- Returns a JSON 'null'
  ```
- `json_path`: The [JSONPath](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_format). This identifies the data that
  you want to obtain from the input. This function
  lets you [specify a mode](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_mode) for the JSONPath.

There are differences between the JSON-formatted string and JSON input types.
For details, see [Differences between the JSON and JSON-formatted STRING types](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#differences_json_and_string).

**Return type**

- `json_string_expr`: A JSON-formatted `STRING`
- `json_expr`: `JSON`

**Examples**

In the following example, JSON data is extracted and returned as JSON.

```googlesql
SELECT
  JSON_QUERY(
    JSON '{"class": {"students": [{"id": 5}, {"id": 12}]}}',
    '$.class') AS json_data;

/*-----------------------------------+
 | json_data                         |
 +-----------------------------------+
 | {"students":[{"id":5},{"id":12}]} |
 +-----------------------------------*/
```

In the following examples, JSON data is extracted and returned as
JSON-formatted strings.

```googlesql
SELECT
  JSON_QUERY('{"class": {"students": [{"name": "Jane"}]}}', '$') AS json_text_string;

/*-----------------------------------------------------------+
 | json_text_string                                          |
 +-----------------------------------------------------------+
 | {"class":{"students":[{"name":"Jane"}]}}                  |
 +-----------------------------------------------------------*/
```

```googlesql
SELECT JSON_QUERY('{"class": {"students": []}}', '$') AS json_text_string;

/*-----------------------------------------------------------+
 | json_text_string                                          |
 +-----------------------------------------------------------+
 | {"class":{"students":[]}}                                 |
 +-----------------------------------------------------------*/
```

```googlesql
SELECT
  JSON_QUERY(
    '{"class": {"students": [{"name": "John"},{"name": "Jamie"}]}}',
    '$') AS json_text_string;

/*-----------------------------------------------------------+
 | json_text_string                                          |
 +-----------------------------------------------------------+
 | {"class":{"students":[{"name":"John"},{"name":"Jamie"}]}} |
 +-----------------------------------------------------------*/
```

```googlesql
SELECT
  JSON_QUERY(
    '{"class": {"students": [{"name": "Jane"}]}}',
    '$.class.students[0]') AS first_student;

/*-----------------+
 | first_student   |
 +-----------------+
 | {"name":"Jane"} |
 +-----------------*/
```

```googlesql
SELECT
  JSON_QUERY('{"class": {"students": []}}', '$.class.students[0]') AS first_student;

/*-----------------+
 | first_student   |
 +-----------------+
 | NULL            |
 +-----------------*/
```

```googlesql
SELECT
  JSON_QUERY(
    '{"class": {"students": [{"name": "John"}, {"name": "Jamie"}]}}',
    '$.class.students[0]') AS first_student;

/*-----------------+
 | first_student   |
 +-----------------+
 | {"name":"John"} |
 +-----------------*/
```

```googlesql
SELECT
  JSON_QUERY(
    '{"class": {"students": [{"name": "Jane"}]}}',
    '$.class.students[1].name') AS second_student;

/*----------------+
 | second_student |
 +----------------+
 | NULL           |
 +----------------*/
```

```googlesql
SELECT
  JSON_QUERY(
    '{"class": {"students": []}}',
    '$.class.students[1].name') AS second_student;

/*----------------+
 | second_student |
 +----------------+
 | NULL           |
 +----------------*/
```

```googlesql
SELECT
  JSON_QUERY(
    '{"class": {"students": [{"name": "John"}, {"name": null}]}}',
    '$.class.students[1].name') AS second_student;

/*----------------+
 | second_student |
 +----------------+
 | NULL           |
 +----------------*/
```

```googlesql
SELECT
  JSON_QUERY(
    '{"class": {"students": [{"name": "John"}, {"name": "Jamie"}]}}',
    '$.class.students[1].name') AS second_student;

/*----------------+
 | second_student |
 +----------------+
 | "Jamie"        |
 +----------------*/
```

```googlesql
SELECT
  JSON_QUERY(
    '{"class": {"students": [{"name": "Jane"}]}}',
    '$.class."students"') AS student_names;

/*------------------------------------+
 | student_names                      |
 +------------------------------------+
 | [{"name":"Jane"}]                  |
 +------------------------------------*/
```

```googlesql
SELECT
  JSON_QUERY(
    '{"class": {"students": []}}',
    '$.class."students"') AS student_names;

/*------------------------------------+
 | student_names                      |
 +------------------------------------+
 | []                                 |
 +------------------------------------*/
```

```googlesql
SELECT
  JSON_QUERY(
    '{"class": {"students": [{"name": "John"}, {"name": "Jamie"}]}}',
    '$.class."students"') AS student_names;

/*------------------------------------+
 | student_names                      |
 +------------------------------------+
 | [{"name":"John"},{"name":"Jamie"}] |
 +------------------------------------*/
```

In the following examples, the JSON data is extracted in [lax mode](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_mode).
Because the keyword `lax` is included in the `JSONPath`, JSON arrays are
automatically unwrapped.

```googlesql
SELECT
  JSON_QUERY(
    JSON '{"class": {"students": [{"name": "Jane"}]}}',
    'lax $.class.students.name') AS student_names_lax;

/*-------------------+
 | student_names_lax |
 +-------------------+
 | ["Jane"]          |
 +-------------------*/
```

```googlesql
SELECT
  JSON_QUERY(
    JSON '[{"class": {"students": [{"name": "Joe"}, {"name": "Jamie"}]}}]',
    'lax $.class.students.name') AS student_names_lax;

/*-------------------+
 | student_names_lax |
 +-------------------+
 | ["Joe","Jamie"]   |
 +-------------------*/
```

```googlesql
SELECT
  JSON_QUERY(
    JSON '{"class": {"students": [[{"name": "John"}], {"name": "Jamie"}]}}',
    'lax $.class.students.name') AS student_names_lax;

/*-------------------+
 | student_names_lax |
 +-------------------+
 | ["Jamie"]         |
 +-------------------*/
```

In the following examples, the JSON data is extracted in [lax recursive mode](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#JSONPath_mode).
Because the keyword `lax recursive` is included in the `JSONPath`, JSON arrays
are unwrapped until a non-array type is found.

```googlesql
SELECT
  JSON_QUERY(
    JSON '{"class": {"students": [{"name": "Jane"}]}}',
    'lax recursive $.class.students.name') AS student_names_lax_recursive;

/*-----------------------------+
 | student_names_lax_recursive |
 +-----------------------------+
 | ["Jane"]                    |
 +-----------------------------*/
```

```googlesql
SELECT
  JSON_QUERY(
    JSON '[[{"class": {"students": [{"name": "Joe"}, {"name": "Jamie"}]}}]]',
    'lax recursive $.class.students.name') AS student_names_lax_recursive;

/*-----------------------------+
 | student_names_lax_recursive |
 +-----------------------------+
 | ["Joe","Jamie"]             |
 +-----------------------------*/
```

```googlesql
SELECT
  JSON_QUERY(
    JSON '{"class": {"students": [[{"name": "John"}], {"name": "Jamie"}]}}',
    'lax recursive $.class.students.name') AS student_names_lax_recursive;

/*-----------------------------+
 | student_names_lax_recursive |
 +-----------------------------+
 | ["John","Jamie"]            |
 +-----------------------------*/
```

In the following examples, the keywords `lax` and `lax recursive` indicate that
non-array types should be wrapped into arrays of size 1 before matching. The
modes `lax` and `lax recursive` behave identically for wrapping arrays.

```googlesql
SELECT
  JSON_QUERY(
    JSON '{"class": {"students": {"name": "Jane"}}}',
    'lax $.class[0].students[0].name') AS student_names_lax,
  JSON_QUERY(
    JSON '{"class": {"students": {"name": "Jane"}}}',
    'lax recursive $.class[0].students[0].name') AS student_names_lax_recursive;

/*-------------------*-----------------------------+
 | student_names_lax | student_names_lax_recursive |
 +-------------------*-----------------------------+
 | ["Jane"]          | ["Jane"]                    |
 +-------------------*-----------------------------*/
```

```googlesql
SELECT
  JSON_QUERY(
    JSON '[{"class": {"students": [{"name": "Joe"}, {"name": "Jamie"}]}}]',
    'lax $.class[0].students[0].name') AS student_names_lax,
  JSON_QUERY(
    JSON '[{"class": {"students": [{"name": "Joe"}, {"name": "Jamie"}]}}]',
    'lax recursive $.class[0].students[0].name') AS student_names_lax_recursive;

/*-------------------*-----------------------------+
 | student_names_lax | student_names_lax_recursive |
 +-------------------*-----------------------------+
 | ["Joe"]           | ["Joe"]                     |
 +-------------------*-----------------------------*/
```

```googlesql
SELECT
  JSON_QUERY(
    JSON '{"class": {"students": [[{"name": "John"}], {"name": "Jamie"}]}}',
    'lax $.class[0].students[0].name') AS student_names_lax,
  JSON_QUERY(
    JSON '{"class": {"students": [[{"name": "John"}], {"name": "Jamie"}]}}',
    'lax recursive $.class[0].students[0].name') AS student_names_lax_recursive;

/*-------------------*-----------------------------+
 | student_names_lax | student_names_lax_recursive |
 +-------------------*-----------------------------+
 | ["John"]          | ["John"]                    |
 +-------------------*-----------------------------*/
```

```googlesql
SELECT JSON_QUERY('{"a": null}', "$.a"); -- Returns a SQL NULL
SELECT JSON_QUERY('{"a": null}', "$.b"); -- Returns a SQL NULL
```

```googlesql
SELECT JSON_QUERY(JSON '{"a": null}', "$.a"); -- Returns a JSON 'null'
SELECT JSON_QUERY(JSON '{"a": null}', "$.b"); -- Returns a SQL NULL
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders; and horizontal rules inside table cells are written as `<hr>`. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 2 files at section boundaries; this is part 1.
- Corrected from the official docs: the input string `'{"a": [10, {"b": 20}]'` was missing the closing `}` of the outer object; it is changed to `'{"a": [10, {"b": 20}]}'`, a valid JSON object as in the neighboring examples.
- Corrected from the official docs: the query had no alias although the result shows a column named `json_data`; `AS json_data` is added.

## Related

- [Index of this directory](./README.md)
