---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions
---

# JSON functions (part 2 of 2)

## Signature / Usage

### `JSON_QUERY_ARRAY`

```googlesql
JSON_QUERY_ARRAY(json_string_expr[, json_path])
```

```googlesql
JSON_QUERY_ARRAY(json_expr[, json_path])
```

**Description**

Extracts a JSON array and converts it to
a SQL `ARRAY<JSON-formatted STRING>` or
`ARRAY<JSON>` value.
In addition, this function uses double quotes to escape invalid
[JSONPath](#jsonpath-format) characters in JSON keys. For example: `"a.b"`.

Arguments:

- `json_string_expr`: A JSON-formatted string. For example:

  ```googlesql
  '["a", "b", {"key": "c"}]'
  ```
- `json_expr`: JSON. For example:

  ```googlesql
  JSON '["a", "b", {"key": "c"}]'
  ```
- `json_path`: The [JSONPath](#jsonpath-format). This identifies the data that
  you want to obtain from the input. If this optional parameter isn't
  provided, then the JSONPath `$` symbol is applied, which means that all of
  the data is analyzed.

There are differences between the JSON-formatted string and JSON input types.
For details, see [Differences between the JSON and JSON-formatted STRING types](#differences-between-the-json-and-json-formatted-string-types).

**Return type**

- `json_string_expr`: `ARRAY<JSON-formatted STRING>`
- `json_expr`: `ARRAY<JSON>`

**Examples**

This extracts items in JSON to an array of `JSON` values:

```googlesql
SELECT JSON_QUERY_ARRAY(
  JSON '{"fruits": ["apples", "oranges", "grapes"]}', '$.fruits'
  ) AS json_array;

/*---------------------------------+
 | json_array                      |
 +---------------------------------+
 | ["apples", "oranges", "grapes"] |
 +---------------------------------*/
```

This extracts the items in a JSON-formatted string to a string array:

```googlesql
SELECT JSON_QUERY_ARRAY('[1, 2, 3]') AS string_array;

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
    JSON_QUERY_ARRAY('[1, 2, 3]','$')
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
SELECT JSON_QUERY_ARRAY('["apples", "oranges", "grapes"]', '$') AS string_array;

/*---------------------------------+
 | string_array                    |
 +---------------------------------+
 | ["apples", "oranges", "grapes"] |
 +---------------------------------*/
```

```googlesql
-- Strips the double quotes
SELECT ARRAY(
  SELECT JSON_VALUE(string_element, '$')
  FROM UNNEST(JSON_QUERY_ARRAY('["apples", "oranges", "grapes"]', '$')) AS string_element
) AS string_array;

/*---------------------------+
 | string_array              |
 +---------------------------+
 | [apples, oranges, grapes] |
 +---------------------------*/
```

This extracts only the items in the `fruit` property to an array:

```googlesql
SELECT JSON_QUERY_ARRAY(
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
SELECT JSON_QUERY_ARRAY('{"fruits": ["apples", "oranges", "grapes"]}', '$.fruits') AS string_array;

SELECT JSON_QUERY_ARRAY('{"fruits": ["apples", "oranges", "grapes"]}', '$."fruits"') AS string_array;

-- The queries above produce the following result:
/*---------------------------------+
 | string_array                    |
 +---------------------------------+
 | ["apples", "oranges", "grapes"] |
 +---------------------------------*/
```

In cases where a JSON key uses invalid JSONPath characters, you can escape those
characters using double quotes: `" "`. For example:

```googlesql
SELECT JSON_QUERY_ARRAY('{"a.b": {"c": ["world"]}}', '$."a.b".c') AS hello;

/*-----------+
 | hello     |
 +-----------+
 | ["world"] |
 +-----------*/
```

The following examples show how invalid requests and empty arrays are handled:

```googlesql
-- An error is returned if you provide an invalid JSONPath.
SELECT JSON_QUERY_ARRAY('["foo", "bar", "baz"]', 'INVALID_JSONPath') AS result;

-- If the JSONPath doesn't refer to an array, then NULL is returned.
SELECT JSON_QUERY_ARRAY('{"a": "foo"}', '$.a') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/

-- If a key that doesn't exist is specified, then the result is NULL.
SELECT JSON_QUERY_ARRAY('{"a": "foo"}', '$.b') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/

-- Empty arrays in JSON-formatted strings are supported.
SELECT JSON_QUERY_ARRAY('{"a": "foo", "b": []}', '$.b') AS result;

/*--------+
 | result |
 +--------+
 | []     |
 +--------*/
```

### `JSON_REMOVE`

```googlesql
JSON_REMOVE(json_expr, json_path[, ...])
```

Produces a new SQL `JSON` value with the specified JSON data removed.

Arguments:

- `json_expr`: JSON. For example:

  ```googlesql
  JSON '{"class": {"students": [{"name": "Jane"}]}}'
  ```
- `json_path`: Remove data at this [JSONPath](#jsonpath-format) in `json_expr`.

Details:

- Paths are evaluated left to right. The JSON produced by evaluating the first path is the JSON for the next path.
- The operation ignores non-existent paths and continue processing the rest of the paths.
- For each path, the entire matched JSON subtree is deleted.
- If the path matches a JSON object key, this function deletes the key-value pair.
- If the path matches an array element, this function deletes the specific element from the matched array.
- If removing the path results in an empty JSON object or empty JSON array, the empty structure is preserved.
- If `json_path` is `$` or an invalid [JSONPath](#jsonpath-format), an error is produced.
- If `json_path` is SQL `NULL`, the path operation is ignored.

**Return type**

`JSON`

**Examples**

In the following example, the path `$[1]` is matched and removes
`["b", "c"]`.

```googlesql
SELECT JSON_REMOVE(JSON '["a", ["b", "c"], "d"]', '$[1]') AS json_data

/*-----------+
 | json_data |
 +-----------+
 | ["a","d"] |
 +-----------*/
```

You can use the field access operator to pass JSON data into this function.
For example:

```googlesql
WITH T AS (SELECT JSON '{"a": {"b": 10, "c": 20}}' AS data)
SELECT JSON_REMOVE(data.a, '$.b') AS json_data FROM T

/*-----------+
 | json_data |
 +-----------+
 | {"c":20}  |
 +-----------*/
```

In the following example, the first path `$[1]` is matched and removes
`["b", "c"]`. Then, the second path `$[1]` is matched and removes `"d"`.

```googlesql
SELECT JSON_REMOVE(JSON '["a", ["b", "c"], "d"]', '$[1]', '$[1]') AS json_data

/*-----------+
 | json_data |
 +-----------+
 | ["a"]     |
 +-----------*/
```

The structure of an empty array is preserved when all elements are deleted
from it. For example:

```googlesql
SELECT JSON_REMOVE(JSON '["a", ["b", "c"], "d"]', '$[1]', '$[1]', '$[0]') AS json_data

/*-----------+
 | json_data |
 +-----------+
 | []        |
 +-----------*/
```

In the following example, the path `$.a.b.c` is matched and removes the
`"c":"d"` key-value pair from the JSON object.

```googlesql
SELECT JSON_REMOVE(JSON '{"a": {"b": {"c": "d"}}}', '$.a.b.c') AS json_data

/*----------------+
 | json_data      |
 +----------------+
 | {"a":{"b":{}}} |
 +----------------*/
```

In the following example, the path `$.a.b` is matched and removes the
`"b": {"c":"d"}` key-value pair from the JSON object.

```googlesql
SELECT JSON_REMOVE(JSON '{"a": {"b": {"c": "d"}}}', '$.a.b') AS json_data

/*-----------+
 | json_data |
 +-----------+
 | {"a":{}}  |
 +-----------*/
```

In the following example, the path `$.b` isn't valid, so the operation makes
no changes.

```googlesql
SELECT JSON_REMOVE(JSON '{"a": 1}', '$.b') AS json_data

/*-----------+
 | json_data |
 +-----------+
 | {"a":1}   |
 +-----------*/
```

In the following example, path `$.a.b` and `$.b` don't exist, so those
operations are ignored, but the others are processed.

```googlesql
SELECT JSON_REMOVE(JSON '{"a": [1, 2, 3]}', '$.a[0]', '$.a.b', '$.b', '$.a[0]') AS json_data

/*-----------+
 | json_data |
 +-----------+
 | {"a":[3]} |
 +-----------*/
```

If you pass in `$` as the path, an error is produced. For example:

```googlesql
-- Error: The JSONPath can't be '$'
SELECT JSON_REMOVE(JSON '{}', '$') AS json_data
```

In the following example, the operation is ignored because you can't remove
data from a JSON null.

```googlesql
SELECT JSON_REMOVE(JSON 'null', '$.a.b') AS json_data

/*-----------+
 | json_data |
 +-----------+
 | null      |
 +-----------*/
```

### `JSON_SET`

```googlesql
JSON_SET(
  json_expr,
  json_path_value_pair[, ...]
  [, create_if_missing => { TRUE | FALSE } ]
)

json_path_value_pair:
  json_path, value
```

Produces a new SQL `JSON` value with the specified JSON data inserted
or replaced.

Arguments:

- `json_expr`: JSON. For example:

  ```googlesql
  JSON '{"class": {"students": [{"name": "Jane"}]}}'
  ```
- `json_path_value_pair`: A value and the [JSONPath](#jsonpath-format) for
  that value. This includes:

  - `json_path`: Insert or replace `value` at this [JSONPath](#jsonpath-format)
    in `json_expr`.

  - `value`: A [JSON encoding-supported](#json-encodings) value to
    insert.

- `create_if_missing`: A named argument that takes a `BOOL` value.

  - If `TRUE` (default), replaces or inserts data if the path doesn't exist.

  - If `FALSE`, only existing JSONPath values are replaced. If the path
    doesn't exist, the set operation is ignored.

Details:

- Path value pairs are evaluated left to right. The JSON produced by evaluating one pair becomes the JSON against which the next pair is evaluated.
- If a matched path has an existing value, it overwrites the existing data with `value`.
- If `create_if_missing` is `TRUE`:

  - If a path doesn't exist, the remainder of the path is recursively created.
  - If the matched path prefix points to a JSON null, the remainder of the path is recursively created, and `value` is inserted.
  - If a path token points to a JSON array and the specified index is *larger* than the size of the array, pads the JSON array with JSON nulls, recursively creates the remainder of the path at the specified index, and inserts the path value pair.
- This function applies all path value pair set operations even if an
  individual path value pair operation is invalid. For invalid operations,
  the operation is ignored and the function continues to process the rest
  of the path value pairs.

- If the path exists but has an incompatible type at any given path
  token, no update happens for that specific path value pair.

- If any `json_path` is an invalid [JSONPath](#jsonpath-format), an error is
  produced.

- If `json_expr` is SQL `NULL`, the function returns SQL `NULL`.

- If `json_path` is SQL `NULL`, the `json_path_value_pair` operation is
  ignored.

- If `create_if_missing` is SQL `NULL`, the set operation is ignored.

**Return type**

`JSON`

**Examples**

In the following example, the path `$` matches the entire `JSON` value
and replaces it with `{"b": 2, "c": 3}`.

```googlesql
SELECT JSON_SET(JSON '{"a": 1}', '$', JSON '{"b": 2, "c": 3}') AS json_data

/*---------------+
 | json_data     |
 +---------------+
 | {"b":2,"c":3} |
 +---------------*/
```

In the following example, `create_if_missing` is `FALSE` and the path `$.b`
doesn't exist, so the set operation is ignored.

```googlesql
SELECT JSON_SET(
  JSON '{"a": 1}',
  "$.b", 999,
  create_if_missing => false) AS json_data

/*------------+
 | json_data  |
 +------------+
 | '{"a": 1}' |
 +------------*/
```

In the following example, `create_if_missing` is `TRUE` and the path `$.a`
exists, so the value is replaced.

Adapted (not in the official docs): changed `create_if_missing => false` to `true` to match the description.

```googlesql
SELECT JSON_SET(
  JSON '{"a": 1}',
  "$.a", 999,
  create_if_missing => true) AS json_data

/*--------------+
 | json_data    |
 +--------------+
 | '{"a": 999}' |
 +--------------*/
```

In the following example, the path `$.a` is matched, but `$.a.b` doesn't
exist, so the new path and the value are inserted.

```googlesql
SELECT JSON_SET(JSON '{"a": {}}', '$.a.b', 100) AS json_data

/*-----------------+
 | json_data       |
 +-----------------+
 | {"a":{"b":100}} |
 +-----------------*/
```

In the following example, the path prefix `$` points to a JSON null, so the
remainder of the path is created for the value `100`.

```googlesql
SELECT JSON_SET(JSON 'null', '$.a.b', 100) AS json_data

/*-----------------+
 | json_data       |
 +-----------------+
 | {"a":{"b":100}} |
 +-----------------*/
```

In the following example, the path `$.a.c` implies that the value at `$.a` is
a JSON object but it's not. This part of the operation is ignored, but the other
parts of the operation are completed successfully.

```googlesql
SELECT JSON_SET(
  JSON '{"a": 1}',
  '$.b', 2,
  '$.a.c', 100,
  '$.d', 3) AS json_data

/*---------------------+
 | json_data           |
 +---------------------+
 | {"a":1,"b":2,"d":3} |
 +---------------------*/
```

In the following example, the path `$.a[2]` implies that the value for `$.a` is
an array, but it's not, so the operation is ignored for that value.

```googlesql
SELECT JSON_SET(
  JSON '{"a": 1}',
  '$.a[2]', 100,
  '$.b', 2) AS json_data

/*---------------+
 | json_data     |
 +---------------+
 | {"a":1,"b":2} |
 +---------------*/
```

In the following example, the path `$[1]` is matched and replaces the
array element value with `foo`.

```googlesql
SELECT JSON_SET(JSON '["a", ["b", "c"], "d"]', '$[1]', "foo") AS json_data

/*-----------------+
 | json_data       |
 +-----------------+
 | ["a","foo","d"] |
 +-----------------*/
```

In the following example, the path `$[1][0]` is matched and replaces the
array element value with `foo`.

```googlesql
SELECT JSON_SET(JSON '["a", ["b", "c"], "d"]', '$[1][0]', "foo") AS json_data

/*-----------------------+
 | json_data             |
 +-----------------------+
 | ["a",["foo","c"],"d"] |
 +-----------------------*/
```

In the following example, the path prefix `$` points to a JSON null, so the
remainder of the path is created. The resulting array is padded with
JSON nulls and appended with `foo`.

Adapted (not in the official docs): added the missing `AS json_data` alias so the query matches the column shown.

```googlesql
SELECT JSON_SET(JSON 'null', '$[0][3]', "foo") AS json_data

/*--------------------------+
 | json_data                |
 +--------------------------+
 | [[null,null,null,"foo"]] |
 +--------------------------*/
```

In the following example, the path `$[1]` is matched, the matched array is
extended since `$[1][4]` is larger than the existing array, and then `foo` is
inserted in the array.

```googlesql
SELECT JSON_SET(JSON '["a", ["b", "c"], "d"]', '$[1][4]', "foo") AS json_data

/*-------------------------------------+
 | json_data                           |
 +-------------------------------------+
 | ["a",["b","c",null,null,"foo"],"d"] |
 +-------------------------------------*/
```

In the following example, the path `$[1][0][0]` implies that the value of
`$[1][0]` is an array, but it isn't, so the operation is ignored.

```googlesql
SELECT JSON_SET(JSON '["a", ["b", "c"], "d"]', '$[1][0][0]', "foo") AS json_data

/*---------------------+
 | json_data           |
 +---------------------+
 | ["a",["b","c"],"d"] |
 +---------------------*/
```

In the following example, the path `$[1][2]` is larger than the length of
the matched array. The array length is extended and the remainder of the path
is recursively created. The operation continues to the path `$[1][2][1]`
and inserts `foo`.

```googlesql
SELECT JSON_SET(JSON '["a", ["b", "c"], "d"]', '$[1][2][1]', "foo") AS json_data

/*----------------------------------+
 | json_data                        |
 +----------------------------------+
 | ["a",["b","c",[null,"foo"]],"d"] |
 +----------------------------------*/
```

In the following example, because the `JSON` object is empty, key `b` is
inserted, and the remainder of the path is recursively created.

```googlesql
SELECT JSON_SET(JSON '{}', '$.b[2].d', 100) AS json_data

/*-----------------------------+
 | json_data                   |
 +-----------------------------+
 | {"b":[null,null,{"d":100}]} |
 +-----------------------------*/
```

In the following example, multiple values are set.

```googlesql
SELECT JSON_SET(
  JSON '{"a": 1, "b": {"c":3}, "d": [4]}',
  '$.a', 'v1',
  '$.b.e', 'v2',
  '$.d[2]', 'v3') AS json_data

/*---------------------------------------------------+
 | json_data                                         |
 +---------------------------------------------------+
 | {"a":"v1","b":{"c":3,"e":"v2"},"d":[4,null,"v3"]} |
 +---------------------------------------------------*/
```

### `JSON_STRIP_NULLS`

```googlesql
JSON_STRIP_NULLS(
  json_expr
  [, json_path ]
  [, include_arrays => { TRUE | FALSE } ]
  [, remove_empty => { TRUE | FALSE } ]
)
```

Recursively removes JSON nulls from JSON objects and JSON arrays.

Arguments:

- `json_expr`: JSON. For example:

  ```googlesql
  JSON '{"a": null, "b": "c"}'
  ```
- `json_path`: Remove JSON nulls at this [JSONPath](#jsonpath-format) for
  `json_expr`.

- `include_arrays`: A named argument that's either
  `TRUE` (default) or `FALSE`. If `TRUE` or omitted, the function removes
  JSON nulls from JSON arrays. If `FALSE`, doesn't.

- `remove_empty`: A named argument that's either
  `TRUE` or `FALSE` (default). If `TRUE`, the function removes empty
  JSON objects after JSON nulls are removed. If `FALSE` or omitted, doesn't.

  If `remove_empty` is `TRUE` and `include_arrays` is `TRUE` or omitted,
  the function additionally removes empty JSON arrays.

Details:

- If a value is a JSON null, the associated key-value pair is removed.
- If `remove_empty` is set to `TRUE`, the function recursively removes empty containers after JSON nulls are removed.
- If the function generates JSON with nothing in it, the function returns a JSON null.
- If `json_path` is an invalid [JSONPath](#jsonpath-format), an error is produced.
- If `json_expr` is SQL `NULL`, the function returns SQL `NULL`.
- If `json_path`, `include_arrays`, or `remove_empty` is SQL `NULL`, the function returns `json_expr`.

**Return type**

`JSON`

**Examples**

In the following example, all JSON nulls are removed.

```googlesql
SELECT JSON_STRIP_NULLS(JSON '{"a": null, "b": "c"}') AS json_data

/*-----------+
 | json_data |
 +-----------+
 | {"b":"c"} |
 +-----------*/
```

In the following example, all JSON nulls are removed from a JSON array.

```googlesql
SELECT JSON_STRIP_NULLS(JSON '[1, null, 2, null]') AS json_data

/*-----------+
 | json_data |
 +-----------+
 | [1,2]     |
 +-----------*/
```

In the following example, `include_arrays` is set as `FALSE` so that JSON nulls
aren't removed from JSON arrays.

```googlesql
SELECT JSON_STRIP_NULLS(JSON '[1, null, 2, null]', include_arrays=>FALSE) AS json_data

/*-----------------+
 | json_data       |
 +-----------------+
 | [1,null,2,null] |
 +-----------------*/
```

In the following example, `remove_empty` is omitted and defaults to
`FALSE`, and the empty structures are retained.

```googlesql
SELECT JSON_STRIP_NULLS(JSON '[1, null, 2, null, [null]]') AS json_data

/*-----------+
 | json_data |
 +-----------+
 | [1,2,[]]  |
 +-----------*/
```

In the following example, `remove_empty` is set as `TRUE`, and the
empty structures are removed.

```googlesql
SELECT JSON_STRIP_NULLS(
  JSON '[1, null, 2, null, [null]]',
  remove_empty=>TRUE) AS json_data

/*-----------+
 | json_data |
 +-----------+
 | [1,2]     |
 +-----------*/
```

In the following examples, `remove_empty` is set as `TRUE`, and the
empty structures are removed. Because no JSON data is left the function
returns JSON null.

```googlesql
SELECT JSON_STRIP_NULLS(JSON '{"a": null}', remove_empty=>TRUE) AS json_data

/*-----------+
 | json_data |
 +-----------+
 | null      |
 +-----------*/
```

```googlesql
SELECT JSON_STRIP_NULLS(JSON '{"a": [null]}', remove_empty=>TRUE) AS json_data

/*-----------+
 | json_data |
 +-----------+
 | null      |
 +-----------*/
```

In the following example, empty structures are removed for JSON objects,
but not JSON arrays.

```googlesql
SELECT JSON_STRIP_NULLS(
  JSON '{"a": {"b": {"c": null}}, "d": [null], "e": [], "f": 1}',
  include_arrays=>FALSE,
  remove_empty=>TRUE) AS json_data

/*---------------------------+
 | json_data                 |
 +---------------------------+
 | {"d":[null],"e":[],"f":1} |
 +---------------------------*/
```

In the following example, empty structures are removed for both JSON objects,
and JSON arrays.

```googlesql
SELECT JSON_STRIP_NULLS(
  JSON '{"a": {"b": {"c": null}}, "d": [null], "e": [], "f": 1}',
  remove_empty=>TRUE) AS json_data

/*-----------+
 | json_data |
 +-----------+
 | {"f":1}   |
 +-----------*/
```

In the following example, because no JSON data is left, the function returns a
JSON null.

```googlesql
SELECT JSON_STRIP_NULLS(JSON 'null') AS json_data

/*-----------+
 | json_data |
 +-----------+
 | null      |
 +-----------*/
```

### `JSON_TYPE`

```googlesql
JSON_TYPE(json_expr)
```

**Description**

Gets the JSON type of the outermost JSON value and converts the name of
this type to a SQL `STRING` value. The names of these JSON types can be
returned: `object`, `array`, `string`, `number`, `boolean`, `null`

Arguments:

- `json_expr`: JSON. For example:

  ```googlesql
  JSON '{"name": "sky", "color": "blue"}'
  ```

  If this expression is SQL `NULL`, the function returns SQL `NULL`. If the
  extracted JSON value isn't a valid JSON type, an error is produced.

**Return type**

`STRING`

**Examples**

```googlesql
SELECT json_val, JSON_TYPE(json_val) AS type
FROM
  UNNEST(
    [
      JSON '"apple"',
      JSON '10',
      JSON '3.14',
      JSON 'null',
      JSON '{"city": "New York", "State": "NY"}',
      JSON '["apple", "banana"]',
      JSON 'false'
    ]
  ) AS json_val;

/*----------------------------------+---------+
 | json_val                         | type    |
 +----------------------------------+---------+
 | "apple"                          | string  |
 | 10                               | number  |
 | 3.14                             | number  |
 | null                             | null    |
 | {"State":"NY","city":"New York"} | object  |
 | ["apple","banana"]               | array   |
 | false                            | boolean |
 +----------------------------------+---------*/
```

### `JSON_VALUE`

```googlesql
JSON_VALUE(json_string_expr[, json_path])
```

```googlesql
JSON_VALUE(json_expr[, json_path])
```

**Description**

Extracts a JSON scalar value and converts it to a SQL `STRING` value.
In addition, this function:

- Removes the outermost quotes and unescapes the values.
- Returns a SQL `NULL` if a non-scalar value is selected.
- Uses double quotes to escape invalid [JSONPath](#jsonpath-format) characters in JSON keys. For example: `"a.b"`.

Arguments:

- `json_string_expr`: A JSON-formatted string. For example:

  ```googlesql
  '{"name": "Jakob", "age": "6"}'
  ```
- `json_expr`: JSON. For example:

  ```googlesql
  JSON '{"name": "Jane", "age": "6"}'
  ```
- `json_path`: The [JSONPath](#jsonpath-format). This identifies the data that
  you want to obtain from the input. If this optional parameter isn't
  provided, then the JSONPath `$` symbol is applied, which means that all of
  the data is analyzed.

  If `json_path` returns a JSON `null` or a non-scalar value (in other words,
  if `json_path` refers to an object or an array), then a SQL `NULL` is
  returned.

There are differences between the JSON-formatted string and JSON input types.
For details, see [Differences between the JSON and JSON-formatted STRING types](#differences-between-the-json-and-json-formatted-string-types).

**Return type**

`STRING`

**Examples**

In the following example, JSON data is extracted and returned as a scalar value.

```googlesql
SELECT JSON_VALUE(JSON '{"name": "Jakob", "age": "6" }', '$.age') AS scalar_age;

/*------------+
 | scalar_age |
 +------------+
 | 6          |
 +------------*/
```

The following example compares how results are returned for the `JSON_QUERY`
and `JSON_VALUE` functions.

```googlesql
SELECT JSON_QUERY('{"name": "Jakob", "age": "6"}', '$.name') AS json_name,
  JSON_VALUE('{"name": "Jakob", "age": "6"}', '$.name') AS scalar_name,
  JSON_QUERY('{"name": "Jakob", "age": "6"}', '$.age') AS json_age,
  JSON_VALUE('{"name": "Jakob", "age": "6"}', '$.age') AS scalar_age;

/*-----------+-------------+----------+------------+
 | json_name | scalar_name | json_age | scalar_age |
 +-----------+-------------+----------+------------+
 | "Jakob"   | Jakob       | "6"      | 6          |
 +-----------+-------------+----------+------------*/
```

```googlesql
SELECT JSON_QUERY('{"fruits": ["apple", "banana"]}', '$.fruits') AS json_query,
  JSON_VALUE('{"fruits": ["apple", "banana"]}', '$.fruits') AS json_value;

/*--------------------+------------+
 | json_query         | json_value |
 +--------------------+------------+
 | ["apple","banana"] | NULL       |
 +--------------------+------------*/
```

In cases where a JSON key uses invalid JSONPath characters, you can escape those
characters using double quotes. For example:

```googlesql
SELECT JSON_VALUE('{"a.b": {"c": "world"}}', '$."a.b".c') AS hello;

/*-------+
 | hello |
 +-------+
 | world |
 +-------*/
```

### `JSON_VALUE_ARRAY`

```googlesql
JSON_VALUE_ARRAY(json_string_expr[, json_path])
```

```googlesql
JSON_VALUE_ARRAY(json_expr[, json_path])
```

**Description**

Extracts a JSON array of scalar values and converts it to a SQL
`ARRAY<STRING>` value.
In addition, this function:

- Removes the outermost quotes and unescapes the values.
- Returns a SQL `NULL` if the selected value isn't an array or not an array containing only scalar values.
- Uses double quotes to escape invalid [JSONPath](#jsonpath-format) characters in JSON keys. For example: `"a.b"`.

Arguments:

- `json_string_expr`: A JSON-formatted string. For example:

  ```googlesql
  '["apples", "oranges", "grapes"]'
  ```
- `json_expr`: JSON. For example:

  ```googlesql
  JSON '["apples", "oranges", "grapes"]'
  ```
- `json_path`: The [JSONPath](#jsonpath-format). This identifies the data that
  you want to obtain from the input. If this optional parameter isn't
  provided, then the JSONPath `$` symbol is applied, which means that all of
  the data is analyzed.

There are differences between the JSON-formatted string and JSON input types.
For details, see [Differences between the JSON and JSON-formatted STRING types](#differences-between-the-json-and-json-formatted-string-types).

Caveats:

- A JSON `null` in the input array produces a SQL `NULL` as the output for JSON `null`. If the output contains a `NULL` array element, an error is produced because the final output can't be an array with `NULL` values.
- If a JSONPath matches an array that contains scalar objects and a JSON `null`, then the output of the function must be transformed because the final output can't be an array with `NULL` values.

**Return type**

`ARRAY<STRING>`

**Examples**

This extracts items in JSON to a string array:

```googlesql
SELECT JSON_VALUE_ARRAY(
  JSON '{"fruits": ["apples", "oranges", "grapes"]}', '$.fruits'
  ) AS string_array;

/*---------------------------+
 | string_array              |
 +---------------------------+
 | [apples, oranges, grapes] |
 +---------------------------*/
```

The following example compares how results are returned for the
`JSON_QUERY_ARRAY` and `JSON_VALUE_ARRAY` functions.

```googlesql
SELECT JSON_QUERY_ARRAY('["apples", "oranges"]') AS json_array,
       JSON_VALUE_ARRAY('["apples", "oranges"]') AS string_array;

/*-----------------------+-------------------+
 | json_array            | string_array      |
 +-----------------------+-------------------+
 | ["apples", "oranges"] | [apples, oranges] |
 +-----------------------+-------------------*/
```

This extracts the items in a JSON-formatted string to a string array:

```googlesql
-- Strips the double quotes
SELECT JSON_VALUE_ARRAY('["foo", "bar", "baz"]', '$') AS string_array;

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
    JSON_VALUE_ARRAY('[1, 2, 3]', '$')
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
SELECT JSON_VALUE_ARRAY('{"fruits": ["apples", "oranges", "grapes"]}', '$.fruits') AS string_array;
SELECT JSON_VALUE_ARRAY('{"fruits": ["apples", "oranges", "grapes"]}', '$."fruits"') AS string_array;

-- The queries above produce the following result:
/*---------------------------+
 | string_array              |
 +---------------------------+
 | [apples, oranges, grapes] |
 +---------------------------*/
```

In cases where a JSON key uses invalid JSONPath characters, you can escape those
characters using double quotes: `" "`. For example:

```googlesql
SELECT JSON_VALUE_ARRAY('{"a.b": {"c": ["world"]}}', '$."a.b".c') AS hello;

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
SELECT JSON_VALUE_ARRAY('["foo", "bar", "baz"]', 'INVALID_JSONPath') AS result;

-- If the JSON-formatted string is invalid, then NULL is returned.
SELECT JSON_VALUE_ARRAY('}}', '$') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/

-- If the JSON document is NULL, then NULL is returned.
SELECT JSON_VALUE_ARRAY(NULL, '$') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/

-- If a JSONPath doesn't match anything, then the output is NULL.
SELECT JSON_VALUE_ARRAY('{"a": ["foo", "bar", "baz"]}', '$.b') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/

-- If a JSONPath matches an object that isn't an array, then the output is NULL.
SELECT JSON_VALUE_ARRAY('{"a": "foo"}', '$') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/

-- If a JSONPath matches an array of non-scalar objects, then the output is NULL.
SELECT JSON_VALUE_ARRAY('{"a": [{"b": "foo", "c": 1}, {"b": "bar", "c": 2}], "d": "baz"}', '$.a') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/

-- If a JSONPath matches an array of mixed scalar and non-scalar objects,
-- then the output is NULL.
SELECT JSON_VALUE_ARRAY('{"a": [10, {"b": 20}]}', '$.a') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/

-- If a JSONPath matches an empty JSON array, then the output is an empty array instead of NULL.
SELECT JSON_VALUE_ARRAY('{"a": "foo", "b": []}', '$.b') AS result;

/*--------+
 | result |
 +--------+
 | []     |
 +--------*/

-- The following query produces and error because the final output can't be an
-- array with NULLs.
SELECT JSON_VALUE_ARRAY('["world", 1, null]') AS result;
```

### `LAX_BOOL`

```googlesql
LAX_BOOL(json_expr)
```

**Description**

Attempts to convert a JSON value to a SQL `BOOL` value.

Arguments:

- `json_expr`: JSON. For example:

  ```googlesql
  JSON 'true'
  ```

Details:

- If `json_expr` is SQL `NULL`, the function returns SQL `NULL`.
- See the conversion rules in the next section for additional `NULL` handling.

**Conversion rules**

| From JSON type | To SQL `BOOL` |
|---|---|
| boolean | If the JSON boolean is `true`, returns `TRUE`. Otherwise, returns `FALSE`. |
| string | If the JSON string is `'true'`, returns `TRUE`. If the JSON string is `'false'`, returns `FALSE`. If the JSON string is any other value or has whitespace in it, returns `NULL`. This conversion is case-insensitive. |
| number | If the JSON number is a representation of `0`, returns `FALSE`. Otherwise, returns `TRUE`. |
| other type or null | `NULL` |

**Return type**

`BOOL`

**Examples**

Example with input that's a JSON boolean:

```googlesql
SELECT LAX_BOOL(JSON 'true') AS result;

/*--------+
 | result |
 +--------+
 | true   |
 +--------*/
```

Examples with inputs that are JSON strings:

```googlesql
SELECT LAX_BOOL(JSON '"true"') AS result;

/*--------+
 | result |
 +--------+
 | TRUE   |
 +--------*/
```

```googlesql
SELECT LAX_BOOL(JSON '"true "') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/
```

```googlesql
SELECT LAX_BOOL(JSON '"foo"') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/
```

Examples with inputs that are JSON numbers:

```googlesql
SELECT LAX_BOOL(JSON '10') AS result;

/*--------+
 | result |
 +--------+
 | TRUE   |
 +--------*/
```

```googlesql
SELECT LAX_BOOL(JSON '0') AS result;

/*--------+
 | result |
 +--------+
 | FALSE  |
 +--------*/
```

```googlesql
SELECT LAX_BOOL(JSON '0.0') AS result;

/*--------+
 | result |
 +--------+
 | FALSE  |
 +--------*/
```

```googlesql
SELECT LAX_BOOL(JSON '-1.1') AS result;

/*--------+
 | result |
 +--------+
 | TRUE   |
 +--------*/
```

### `LAX_FLOAT64`

```googlesql
LAX_FLOAT64(json_expr)
```

**Description**

Attempts to convert a JSON value to a
SQL `FLOAT64` value.

Arguments:

- `json_expr`: JSON. For example:

  ```googlesql
  JSON '9.8'
  ```

Details:

- If `json_expr` is SQL `NULL`, the function returns SQL `NULL`.
- See the conversion rules in the next section for additional `NULL` handling.

**Conversion rules**

| From JSON type | To SQL `FLOAT64` |
|---|---|
| boolean | `NULL` |
| string | If the JSON string represents a JSON number, parses it as a `BIGNUMERIC` value, and then safe casts the result as a `FLOAT64` value. If the JSON string can't be converted, returns `NULL`. |
| number | Casts the JSON number as a `FLOAT64` value. Large JSON numbers are rounded. |
| other type or null | `NULL` |

**Return type**

`FLOAT64`

**Examples**

Examples with inputs that are JSON numbers:

```googlesql
SELECT LAX_FLOAT64(JSON '9.8') AS result;

/*--------+
 | result |
 +--------+
 | 9.8    |
 +--------*/
```

```googlesql
SELECT LAX_FLOAT64(JSON '9') AS result;

/*--------+
 | result |
 +--------+
 | 9.0    |
 +--------*/
```

```googlesql
SELECT LAX_FLOAT64(JSON '9007199254740993') AS result;

/*--------------------+
 | result             |
 +--------------------+
 | 9007199254740992.0 |
 +--------------------*/
```

```googlesql
SELECT LAX_FLOAT64(JSON '1e100') AS result;

/*--------+
 | result |
 +--------+
 | 1e+100 |
 +--------*/
```

Examples with inputs that are JSON booleans:

```googlesql
SELECT LAX_FLOAT64(JSON 'true') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/
```

```googlesql
SELECT LAX_FLOAT64(JSON 'false') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/
```

Examples with inputs that are JSON strings:

```googlesql
SELECT LAX_FLOAT64(JSON '"10"') AS result;

/*--------+
 | result |
 +--------+
 | 10.0   |
 +--------*/
```

```googlesql
SELECT LAX_FLOAT64(JSON '"1.1"') AS result;

/*--------+
 | result |
 +--------+
 | 1.1    |
 +--------*/
```

```googlesql
SELECT LAX_FLOAT64(JSON '"1.1e2"') AS result;

/*--------+
 | result |
 +--------+
 | 110.0  |
 +--------*/
```

```googlesql
SELECT LAX_FLOAT64(JSON '"9007199254740993"') AS result;

/*--------------------+
 | result             |
 +--------------------+
 | 9007199254740992.0 |
 +--------------------*/
```

```googlesql
SELECT LAX_FLOAT64(JSON '"+1.5"') AS result;

/*--------+
 | result |
 +--------+
 | 1.5    |
 +--------*/
```

```googlesql
SELECT LAX_FLOAT64(JSON '"NaN"') AS result;

/*--------+
 | result |
 +--------+
 | NaN    |
 +--------*/
```

```googlesql
SELECT LAX_FLOAT64(JSON '"Inf"') AS result;

/*----------+
 | result   |
 +----------+
 | Infinity |
 +----------*/
```

```googlesql
SELECT LAX_FLOAT64(JSON '"-InfiNiTY"') AS result;

/*-----------+
 | result    |
 +-----------+
 | -Infinity |
 +-----------*/
```

```googlesql
SELECT LAX_FLOAT64(JSON '"foo"') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/
```

### `LAX_INT64`

```googlesql
LAX_INT64(json_expr)
```

**Description**

Attempts to convert a JSON value to a SQL `INT64` value.

Arguments:

- `json_expr`: JSON. For example:

  ```googlesql
  JSON '999'
  ```

Details:

- If `json_expr` is SQL `NULL`, the function returns SQL `NULL`.
- See the conversion rules in the next section for additional `NULL` handling.

**Conversion rules**

| From JSON type | To SQL `INT64` |
|---|---|
| boolean | If the JSON boolean is `true`, returns `1`. If `false`, returns `0`. |
| string | If the JSON string represents a JSON number, parses it as a `BIGNUMERIC` value, and then safe casts the results as an `INT64` value. If the JSON string can't be converted, returns `NULL`. |
| number | Casts the JSON number as an `INT64` value. If the JSON number can't be converted, returns `NULL`. |
| other type or null | `NULL` |

**Return type**

`INT64`

**Examples**

Examples with inputs that are JSON numbers:

```googlesql
SELECT LAX_INT64(JSON '10') AS result;

/*--------+
 | result |
 +--------+
 | 10     |
 +--------*/
```

```googlesql
SELECT LAX_INT64(JSON '10.0') AS result;

/*--------+
 | result |
 +--------+
 | 10     |
 +--------*/
```

```googlesql
SELECT LAX_INT64(JSON '1.1') AS result;

/*--------+
 | result |
 +--------+
 | 1      |
 +--------*/
```

```googlesql
SELECT LAX_INT64(JSON '3.5') AS result;

/*--------+
 | result |
 +--------+
 | 4      |
 +--------*/
```

```googlesql
SELECT LAX_INT64(JSON '1.1e2') AS result;

/*--------+
 | result |
 +--------+
 | 110    |
 +--------*/
```

```googlesql
SELECT LAX_INT64(JSON '1e100') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/
```

Examples with inputs that are JSON booleans:

```googlesql
SELECT LAX_INT64(JSON 'true') AS result;

/*--------+
 | result |
 +--------+
 | 1      |
 +--------*/
```

```googlesql
SELECT LAX_INT64(JSON 'false') AS result;

/*--------+
 | result |
 +--------+
 | 0      |
 +--------*/
```

Examples with inputs that are JSON strings:

```googlesql
SELECT LAX_INT64(JSON '"10"') AS result;

/*--------+
 | result |
 +--------+
 | 10     |
 +--------*/
```

```googlesql
SELECT LAX_INT64(JSON '"1.1"') AS result;

/*--------+
 | result |
 +--------+
 | 1      |
 +--------*/
```

```googlesql
SELECT LAX_INT64(JSON '"1.1e2"') AS result;

/*--------+
 | result |
 +--------+
 | 110    |
 +--------*/
```

```googlesql
SELECT LAX_INT64(JSON '"+1.5"') AS result;

/*--------+
 | result |
 +--------+
 | 2      |
 +--------*/
```

```googlesql
SELECT LAX_INT64(JSON '"1e100"') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/
```

```googlesql
SELECT LAX_INT64(JSON '"foo"') AS result;

/*--------+
 | result |
 +--------+
 | NULL   |
 +--------*/
```

### `LAX_STRING`

```googlesql
LAX_STRING(json_expr)
```

**Description**

Attempts to convert a JSON value to a SQL `STRING` value.

Arguments:

- `json_expr`: JSON. For example:

  ```googlesql
  JSON '"name"'
  ```

Details:

- If `json_expr` is SQL `NULL`, the function returns SQL `NULL`.
- See the conversion rules in the next section for additional `NULL` handling.

**Conversion rules**

| From JSON type | To SQL `STRING` |
|---|---|
| boolean | If the JSON boolean is `true`, returns `'true'`. If `false`, returns `'false'`. |
| string | Returns the JSON string as a `STRING` value. |
| number | Returns the JSON number as a `STRING` value. |
| other type or null | `NULL` |

**Return type**

`STRING`

**Examples**

Examples with inputs that are JSON strings:

```googlesql
SELECT LAX_STRING(JSON '"purple"') AS result;

/*--------+
 | result |
 +--------+
 | purple |
 +--------*/
```

```googlesql
SELECT LAX_STRING(JSON '"10"') AS result;

/*--------+
 | result |
 +--------+
 | 10     |
 +--------*/
```

Examples with inputs that are JSON booleans:

```googlesql
SELECT LAX_STRING(JSON 'true') AS result;

/*--------+
 | result |
 +--------+
 | true   |
 +--------*/
```

```googlesql
SELECT LAX_STRING(JSON 'false') AS result;

/*--------+
 | result |
 +--------+
 | false  |
 +--------*/
```

Examples with inputs that are JSON numbers:

```googlesql
SELECT LAX_STRING(JSON '10.0') AS result;

/*--------+
 | result |
 +--------+
 | 10     |
 +--------*/
```

```googlesql
SELECT LAX_STRING(JSON '10') AS result;

/*--------+
 | result |
 +--------+
 | 10     |
 +--------*/
```

```googlesql
SELECT LAX_STRING(JSON '1e100') AS result;

/*--------+
 | result |
 +--------+
 | 1e+100 |
 +--------*/
```

### `PARSE_JSON`

```googlesql
PARSE_JSON(
  json_string_expr
  [, wide_number_mode => { 'exact' | 'round' } ]
)
```

**Description**

Converts a JSON-formatted `STRING` value to a [`JSON` value](https://www.json.org/json-en.html).

Arguments:

- `json_string_expr`: A JSON-formatted string. For example:

  ```googlesql
  '{"class": {"students": [{"name": "Jane"}]}}'
  ```
- `wide_number_mode`: A named argument with a `STRING` value. Determines
  how to handle numbers that can't be stored in a `JSON` value without the
  loss of precision. If used, `wide_number_mode` must include one of the
  following values:

  - `exact` (default): Only accept numbers that can be stored without loss of precision. If a number that can't be stored without loss of precision is encountered, the function throws an error.
  - `round`: If a number that can't be stored without loss of precision is encountered, attempt to round it to a number that can be stored without loss of precision. If the number can't be rounded, the function throws an error.

  If a number appears in a JSON object or array, the `wide_number_mode`
  argument is applied to the number in the object or array.

Numbers from the following domains can be stored in JSON without loss of
precision:

- 64-bit signed/unsigned integers, such as `INT64`
- `FLOAT64`

**Return type**

`JSON`

**Examples**

In the following example, a JSON-formatted string is converted to `JSON`.

```googlesql
SELECT PARSE_JSON('{"coordinates": [10, 20], "id": 1}') AS json_data;

/*--------------------------------+
 | json_data                      |
 +--------------------------------+
 | {"coordinates":[10,20],"id":1} |
 +--------------------------------*/
```

The following queries fail because:

- The number that was passed in can't be stored without loss of precision.
- `wide_number_mode=>'exact'` is used implicitly in the first query and explicitly in the second query.

```googlesql
SELECT PARSE_JSON('{"id": 922337203685477580701}') AS json_data; -- fails
SELECT PARSE_JSON('{"id": 922337203685477580701}', wide_number_mode=>'exact') AS json_data; -- fails
```

The following query rounds the number to a number that can be stored in JSON.

```googlesql
SELECT PARSE_JSON('{"id": 922337203685477580701}', wide_number_mode=>'round') AS json_data;

/*------------------------------+
 | json_data                    |
 +------------------------------+
 | {"id":9.223372036854776e+20} |
 +------------------------------*/
```

You can also use valid JSON-formatted strings that don't represent name/value pairs. For example:

```googlesql
SELECT PARSE_JSON('6') AS json_data;

/*------------------------------+
 | json_data                    |
 +------------------------------+
 | 6                            |
 +------------------------------*/
```

```googlesql
SELECT PARSE_JSON('"red"') AS json_data;

/*------------------------------+
 | json_data                    |
 +------------------------------+
 | "red"                        |
 +------------------------------*/
```

### `STRING`

```googlesql
STRING(json_expr)
```

**Description**

Converts a JSON string to a SQL `STRING` value.

Arguments:

- `json_expr`: JSON. For example:

  ```googlesql
  JSON '"purple"'
  ```

  If the JSON value isn't a string, an error is produced. If the expression
  is SQL `NULL`, the function returns SQL `NULL`.

**Return type**

`STRING`

**Examples**

```googlesql
SELECT STRING(JSON '"purple"') AS color;

/*--------+
 | color  |
 +--------+
 | purple |
 +--------*/
```

```googlesql
SELECT STRING(JSON_QUERY(JSON '{"name": "sky", "color": "blue"}', "$.color")) AS color;

/*-------+
 | color |
 +-------+
 | blue  |
 +-------*/
```

The following examples show how invalid requests are handled:

```googlesql
-- An error is thrown if the JSON isn't of type string.
SELECT STRING(JSON '123') AS result; -- Throws an error
SELECT STRING(JSON 'null') AS result; -- Throws an error
SELECT SAFE.STRING(JSON '123') AS result; -- Returns a SQL NULL
```

### `TO_JSON`

```googlesql
TO_JSON(
  sql_value
  [, stringify_wide_numbers => { TRUE | FALSE } ]
)
```

**Description**

Converts a SQL value to a JSON value.

Arguments:

- `sql_value`: The SQL value to convert to a JSON value. You can review the GoogleSQL data types that this function supports and their JSON encodings [here](#json-encodings).
- `stringify_wide_numbers`: A named argument that's either
  `TRUE` or `FALSE` (default).

  - If `TRUE`, numeric values outside of the `FLOAT64` type domain are encoded as strings.
  - If `FALSE` (default), numeric values outside of the `FLOAT64` type domain aren't encoded as strings, but are stored as JSON numbers. If a numerical value can't be stored in JSON without loss of precision, an error is thrown.

  The following numerical data types are affected by the
  `stringify_wide_numbers` argument:
- `INT64`

- `NUMERIC`

- `BIGNUMERIC`

  If one of these numerical data types appears in a container data type
  such as an `ARRAY` or `STRUCT`, the `stringify_wide_numbers` argument is
  applied to the numerical data types in the container data type.

**Return type**

`JSON`

**Examples**

In the following example, the query converts rows in a table to JSON values.

```googlesql
With CoordinatesTable AS (
    (SELECT 1 AS id, [10, 20] AS coordinates) UNION ALL
    (SELECT 2 AS id, [30, 40] AS coordinates) UNION ALL
    (SELECT 3 AS id, [50, 60] AS coordinates))
SELECT TO_JSON(t) AS json_objects
FROM CoordinatesTable AS t;

/*--------------------------------+
 | json_objects                   |
 +--------------------------------+
 | {"coordinates":[10,20],"id":1} |
 | {"coordinates":[30,40],"id":2} |
 | {"coordinates":[50,60],"id":3} |
 +--------------------------------*/
```

In the following example, the query returns a large numerical value as a
JSON string.

```googlesql
SELECT TO_JSON(9007199254740993, stringify_wide_numbers=>TRUE) as stringify_on;

/*--------------------+
 | stringify_on       |
 +--------------------+
 | "9007199254740993" |
 +--------------------*/
```

In the following example, both queries return a large numerical value as a
JSON number.

```googlesql
SELECT TO_JSON(9007199254740993, stringify_wide_numbers=>FALSE) as stringify_off;
SELECT TO_JSON(9007199254740993) as stringify_off;

/*------------------+
 | stringify_off    |
 +------------------+
 | 9007199254740993 |
 +------------------*/
```

In the following example, only large numeric values are converted to
JSON strings.

```googlesql
With T1 AS (
  (SELECT 9007199254740993 AS id) UNION ALL
  (SELECT 2 AS id))
SELECT TO_JSON(t, stringify_wide_numbers=>TRUE) AS json_objects
FROM T1 AS t;

/*---------------------------+
 | json_objects              |
 +---------------------------+
 | {"id":"9007199254740993"} |
 | {"id":2}                  |
 +---------------------------*/
```

In this example, the values `9007199254740993` (`INT64`)
and `2.1` (`FLOAT64`) are converted
to the common supertype `FLOAT64`, which isn't
affected by the `stringify_wide_numbers` argument.

```googlesql
With T1 AS (
  (SELECT 9007199254740993 AS id) UNION ALL
  (SELECT 2.1 AS id))
SELECT TO_JSON(t, stringify_wide_numbers=>TRUE) AS json_objects
FROM T1 AS t;

/*------------------------------+
 | json_objects                 |
 +------------------------------+
 | {"id":9.007199254740992e+15} |
 | {"id":2.1}                   |
 +------------------------------*/
```

In the following example, a graph path is converted into a JSON array.

Adapted (not in the official docs): closed the result comment with `*/`.

```googlesql
GRAPH graph_db.FinGraph
MATCH p=(src:Account)-[t1:Transfers]->(dst:Account)
RETURN TO_JSON(p) AS json_array

/*--------------------------------------------------------------------+
 | json_array                                                         |
 +--------------------------------------------------------------------+
 | [{                                                                 |
 |    "identifier":"mUZpbkdyYXBoLkFjY291bnQAeJEg",                    |
 |    "kind":"node",                                                  |
 |    "labels":["Account"],                                           |
 |    "properties":{                                                  |
 |      "create_time":"2020-01-28T01:55:09.206Z",                     |
 |      "id":16,                                                      |
 |      "is_blocked":true,                                            |
 |      "nick_name":"Vacation Fund"                                   |
 |    }                                                               |
 |  },                                                                |
 |  {                                                                 |
 |    "destination_node_identifier":"mUZpbkdyYXBoLkFjY291bnQAeJEo",   |
 |    "identifier":"mUZpbkdyYXBoLkFjY291...",                         |
 |    "kind":"edge",                                                  |
 |    "labels":["Transfers"],                                         |
 |    "properties":{                                                  |
 |      "amount":300.0,                                               |
 |      "create_time":"2020-09-25T09:36:14.926Z",                     |
 |      "id":16,                                                      |
 |      "order_number":"103650009791820",                             |
 |      "to_id":20                                                    |
 |    },                                                              |
 |    "source_node_identifier":"mUZpbkdyYXBoLkFjY291bnQAeJEg"         |
 |  },                                                                |
 |  {                                                                 |
 |    "identifier":"mUZpbkdyYXBoLkFjY291bnQAeJEo",                    |
 |    "kind":"node",                                                  |
 |    "labels":["Account"],                                           |
 |    "properties":{                                                  |
 |      "create_time":"2020-02-18T13:44:20.655Z",                     |
 |      "id":20,                                                      |
 |      "is_blocked":false,                                           |
 |      "nick_name":"Vacation Fund"                                   |
 |    }                                                               |
 |  }                                                                 |
 |  ...                                                               |
 | ]                                                                  |
 +--------------------------------------------------------------------*/
```

In the following example, each graph node called `src` is converted into a
JSON object:

```googlesql
GRAPH graph_db.FinGraph
MATCH (src:Account {id: 7})-[t1:Transfers]->(dst:Account)
RETURN TO_JSON(src) AS json_array

/*--------------------------------------------------------------------+
 | json_array                                                         |
 +--------------------------------------------------------------------+
 | {                                                                  |
 |   "identifier":"rhYAAAANAAAApgAAAAAAAAAApgcAAAAAAAAA",             |
 |   "kind":"node",                                                   |
 |   "labels":["Account"],                                            |
 |   "properties":{                                                   |
 |     "create_time":"2020-01-10T06:22:20.222Z",                      |
 |     "id":7,                                                        |
 |     "is_blocked":false,                                            |
 |     "nick_name":"Vacation Fund"                                    |
 |   }                                                                |
 | }                                                                  |
 | {                                                                  |
 |   "identifier":"rhYAAAANAAAApgAAAAAAAAAApgcAAAAAAAAA",             |
 |   "kind":"node",                                                   |
 |   "labels":["Account"],                                            |
 |   "properties":{                                                   |
 |     "create_time":"2020-01-10T06:22:20.222Z",                      |
 |     "id":7,                                                        |
 |     "is_blocked":false,                                            |
 |     "nick_name":"Vacation Fund"                                    |
 |   }                                                                |
 | }                                                                  |
 +--------------------------------------------------------------------*/
```

### `TO_JSON_STRING`

```googlesql
TO_JSON_STRING(value[, pretty_print])
```

**Description**

Converts a SQL value to a JSON-formatted `STRING` value.

Arguments:

- `value`: A SQL value. You can review the GoogleSQL data types that this function supports and their JSON encodings in the [JSON encodings](#json-encodings) section. If the value is `NULL`, a `null` string is returned.
- `pretty_print`: Optional boolean parameter. If `pretty_print` is `true`, the returned value is formatted for easy readability. If `pretty_print` is `NULL`, the function returns `NULL`, regardless of the `value` argument.

**Return type**

A JSON-formatted `STRING`

**Examples**

The following query converts a `STRUCT` value to a JSON-formatted string:

```googlesql
SELECT TO_JSON_STRING(STRUCT(1 AS id, [10,20] AS coordinates)) AS json_data

/*--------------------------------+
 | json_data                      |
 +--------------------------------+
 | {"id":1,"coordinates":[10,20]} |
 +--------------------------------*/
```

The following query converts a `STRUCT` value to a JSON-formatted string that is
easy to read:

```googlesql
SELECT TO_JSON_STRING(STRUCT(1 AS id, [10,20] AS coordinates), true) AS json_data

/*--------------------+
 | json_data          |
 +--------------------+
 | {                  |
 |   "id": 1,         |
 |   "coordinates": [ |
 |     10,            |
 |     20             |
 |   ]                |
 | }                  |
 +--------------------*/
```

### Supplemental materials

#### Differences between the JSON and JSON-formatted STRING types

Many JSON functions accept two input types:

- [`JSON`](../googlesql-syntax/data-types.md#json-type) type
- `STRING` type

The `STRING` version of the extraction functions behaves differently than the
`JSON` version, mainly because `JSON` type values are always validated whereas
JSON-formatted `STRING` type values aren't.

##### Non-validation of `STRING` inputs

The following `STRING` is invalid JSON because it's missing a trailing `}`:

```googlesql
{"hello": "world"
```

The JSON function reads the input from the beginning and stops as soon as the
field to extract is found, without reading the remainder of the input. A parsing
error isn't produced.

With the `JSON` type, however, `JSON '{"hello": "world"'` returns a parsing
error.

For example:

```googlesql
SELECT JSON_VALUE('{"hello": "world"', "$.hello") AS hello;

/*-------+
 | hello |
 +-------+
 | world |
 +-------*/
```

```googlesql
SELECT JSON_VALUE(JSON '{"hello": "world"', "$.hello") AS hello;
-- An error is returned: Invalid JSON literal: syntax error while parsing
-- object - unexpected end of input; expected '}'
```

##### No strict validation of extracted values

In the following examples, duplicated keys aren't removed when using a
JSON-formatted string. Similarly, keys order is preserved. For the `JSON`
type, `JSON '{"key": 1, "key": 2}'` will result in `JSON '{"key":1}'` during
parsing.

```googlesql
SELECT JSON_QUERY('{"key": 1, "key": 2}', "$") AS string;

/*-------------------+
 | string            |
 +-------------------+
 | {"key":1,"key":2} |
 +-------------------*/
```

```googlesql
SELECT JSON_QUERY(JSON '{"key": 1, "key": 2}', "$") AS json;

/*-----------+
 | json      |
 +-----------+
 | {"key":1} |
 +-----------*/
```

##### JSON `null`

When using a JSON-formatted `STRING` type in a JSON function, a JSON `null`
value is extracted as a SQL `NULL` value.

When using a JSON type in a JSON function, a JSON `null` value returns a JSON
`null` value.

```googlesql
WITH t AS (
  SELECT '{"name": null}' AS json_string, JSON '{"name": null}' AS json)
SELECT JSON_QUERY(json_string, "$.name") AS name_string,
  JSON_QUERY(json_string, "$.name") IS NULL AS name_string_is_null,
  JSON_QUERY(json, "$.name") AS name_json,
  JSON_QUERY(json, "$.name") IS NULL AS name_json_is_null
FROM t;

/*-------------+---------------------+-----------+-------------------+
 | name_string | name_string_is_null | name_json | name_json_is_null |
 +-------------+---------------------+-----------+-------------------+
 | NULL        | true                | null      | false             |
 +-------------+---------------------+-----------+-------------------*/
```

#### JSON encodings

You can encode a SQL value as a JSON value with the following functions:

- `TO_JSON_STRING`
- `TO_JSON`
- `JSON_SET` (uses `TO_JSON` encoding)
- `JSON_ARRAY` (uses `TO_JSON` encoding)
- `JSON_ARRAY_APPEND` (uses `TO_JSON` encoding)
- `JSON_ARRAY_INSERT` (uses `TO_JSON` encoding)
- `JSON_OBJECT` (uses `TO_JSON` encoding)

The following SQL to JSON encodings are supported:

| From SQL | To JSON | Examples |
|---|---|---|
| NULL | null | SQL input: `NULL` JSON output: `null` |
| BOOL | boolean | SQL input: `TRUE` JSON output: `true` <hr> SQL input: `FALSE` JSON output: `false` |
| INT64 | (TO_JSON_STRING only) number or string Encoded as a number when the value is in the range of \[-2^53^, 2^53^\], which is the range of integers that can be represented losslessly as IEEE 754 double-precision floating point numbers. A value outside of this range is encoded as a string. | SQL input: `9007199254740992` JSON output: `9007199254740992` <hr> SQL input: `9007199254740993` JSON output: `"9007199254740993"` |
| INT64 | (TO_JSON only) number or string If the `stringify_wide_numbers` argument is `TRUE` and the value is outside of the FLOAT64 type domain, the value is encoded as a string. If the value can't be stored in JSON without loss of precision, the function fails. Otherwise, the value is encoded as a number. If the `stringify_wide_numbers` isn't used or is `FALSE`, numeric values outside of the \`FLOAT64\` type domain aren't encoded as strings, but are stored as JSON numbers. If a numerical value can't be stored in JSON without loss of precision, an error is thrown. | SQL input: `9007199254740992` JSON output: `9007199254740992` <hr> SQL input: `9007199254740993` JSON output: `9007199254740993` <hr> SQL input with stringify_wide_numbers=\>TRUE: `9007199254740992` JSON output: `9007199254740992` <hr> SQL input with stringify_wide_numbers=\>TRUE: `9007199254740993` JSON output: `"9007199254740993"` |
| INTERVAL | string | SQL input: `INTERVAL '10:20:30.52' HOUR TO SECOND` JSON output: `"PT10H20M30.52S"` <hr> SQL input: `INTERVAL 1 SECOND` JSON output: `"PT1S"` <hr> `INTERVAL -25 MONTH` JSON output: `"P-2Y-1M"` <hr> `INTERVAL '1 5:30' DAY TO MINUTE` JSON output: `"P1DT5H30M"` |
| NUMERIC BIGNUMERIC | (TO_JSON_STRING only) number or string Encoded as a number when the value is in the range of \[-2^53^, 2^53^\] and has no fractional part. A value outside of this range is encoded as a string. | SQL input: `-1` JSON output: `-1` <hr> SQL input: `0` JSON output: `0` <hr> SQL input: `9007199254740993` JSON output: `"9007199254740993"` <hr> SQL input: `123.56` JSON output: `"123.56"` |
| NUMERIC BIGNUMERIC | (TO_JSON only) number or string If the `stringify_wide_numbers` argument is `TRUE` and the value is outside of the FLOAT64 type domain, it's encoded as a string. Otherwise, it's encoded as a number. | SQL input: `-1` JSON output: `-1` <hr> SQL input: `0` JSON output: `0` <hr> SQL input: `9007199254740993` JSON output: `9007199254740993` <hr> SQL input: `123.56` JSON output: `123.56` <hr> SQL input with stringify_wide_numbers=\>TRUE: `9007199254740993` JSON output: `"9007199254740993"` <hr> SQL input with stringify_wide_numbers=\>TRUE: `123.56` JSON output: `123.56` |
| FLOAT64 | number or string `+/-inf` and `NaN` are encoded as `Infinity`, `-Infinity`, and `NaN`. Otherwise, this value is encoded as a number. | SQL input: `1.0` JSON output: `1` <hr> SQL input: `9007199254740993` JSON output: `9007199254740993` <hr> SQL input: `"+inf"` JSON output: `"Infinity"` <hr> SQL input: `"-inf"` JSON output: `"-Infinity"` <hr> SQL input: `"NaN"` JSON output: `"NaN"` |
| STRING | string Encoded as a string, escaped according to the JSON standard. Specifically, `"`, `\,` and the control characters from `U+0000` to `U+001F` are escaped. | SQL input: `"abc"` JSON output: `"abc"` <hr> SQL input: `"\"abc\""` JSON output: `"\"abc\""` |
| BYTES | string Uses RFC 4648 Base64 data encoding. | SQL input: `b"Google"` JSON output: `"R29vZ2xl"` |
| DATE | string | SQL input: `DATE '2017-03-06'` JSON output: `"2017-03-06"` |
| TIMESTAMP | string Encoded as ISO 8601 date and time, where T separates the date and time and Z (Zulu/UTC) represents the time zone. | SQL input: `TIMESTAMP '2017-03-06 12:34:56.789012'` JSON output: `"2017-03-06T12:34:56.789012Z"` |
| DATETIME | string Encoded as ISO 8601 date and time, where T separates the date and time. | SQL input: `DATETIME '2017-03-06 12:34:56.789012'` JSON output: `"2017-03-06T12:34:56.789012"` |
| TIME | string Encoded as ISO 8601 time. | SQL input: `TIME '12:34:56.789012'` JSON output: `"12:34:56.789012"` |
| JSON | data of the input JSON | SQL input: `JSON '{"item": "pen", "price": 10}'` JSON output: `{"item":"pen", "price":10}` <hr> SQL input:`[1, 2, 3]` JSON output:`[1, 2, 3]` |
| ARRAY | array Can contain zero or more elements. | SQL input: `["red", "blue", "green"]` JSON output: `["red","blue","green"]` <hr> SQL input:`[1, 2, 3]` JSON output:`[1,2,3]` |
| STRUCT | object The object can contain zero or more key-value pairs. Each value is formatted according to its type. For `TO_JSON`, a field is included in the output string and any duplicates of this field are omitted. For `TO_JSON_STRING`, a field and any duplicates of this field are included in the output string. Anonymous fields are represented with `""`. Invalid UTF-8 field names might result in unparsable JSON. String values are escaped according to the JSON standard. Specifically, `"`, `\,` and the control characters from `U+0000` to `U+001F` are escaped. | SQL input: `STRUCT(12 AS purchases, TRUE AS inStock)` JSON output: `{"inStock": true,"purchases":12}` |
| GRAPH_ELEMENT | (`TO_JSON` only) object The object can contain zero or more key-value pairs. Each value is formatted according to its type. For `TO_JSON`, graph element (node or edge) objects are supported. - The graph element identifier is only valid within the scope of the same query response and can't be used to correlate entities across different queries. - Field names that aren't valid UTF-8 might result in unparsable JSON. - The result may include internal key-value pairs that aren't defined by the users. - The conversion can fail if the object contains values of unsupported types. | SQL: ``` GRAPH graph_db.FinGraph MATCH (p:Person WHERE p.name = 'Dana') RETURN TO_JSON(p) AS dana_json; ``` <br /> JSON output (truncated): ``` {"identifier":"ZGFuYQ==","kind":"node","labels":["Person"],"properties":{"id":2,"name":"Dana"}} ``` |
| GRAPH_PATH | (`TO_JSON` only) array The array can contain one or more objects that represent graph elements in a graph path. | SQL: ``` GRAPH graph_db.FinGraph MATCH account_ownership = (p:Person)-[o:Owns]->(a:Account) RETURN TO_JSON(account_ownership) AS results ``` <br /> JSON output for `account_ownership` (truncated): ``` [ {"identifier":"ZGFuYQ==","kind":"node","labels":["Person"], ...}, {"identifier":"TPZuYM==","kind":"edge","labels":["Owns"], ...}, {"identifier":"PRTuMI==","kind":"node","labels":["Account"], ...} ] ``` |
| RANGE | range Encoded as an object with a `start` and `end` value. Any unbounded part of the range is represented as `null`. | SQL input: `RANGE<DATE> '[2024-07-24, 2024-07-25)'` JSON output: `{"start":"2024-07-24","end":"2024-07-25"}` <hr> SQL input: `RANGE<DATETIME> '[2024-07-24 10:00:00, UNBOUNDED)'` JSON output: `{"start":"2024-07-24T10:00:00","end":null}` |

#### JSONPath format

With the JSONPath format, you can identify the values you want to
obtain from a JSON-formatted string.

If a key in a JSON functions contains a JSON format operator, refer to each
JSON function for how to escape them.

A JSON function returns `NULL` if the JSONPath format doesn't match a value in
a JSON-formatted string. If the selected value for a scalar function isn't
scalar, such as an object or an array, the function returns `NULL`. If the
JSONPath format is invalid, an error is produced.

##### Operators for JSONPath

The JSONPath format supports these operators:

| Operator | Description | Examples |
|---|---|---|
| `$` | Root object or element. The JSONPath format must start with this operator, which refers to the outermost level of the JSON-formatted string. | JSON-formatted string: `'{"class" : {"students" : [{"name" : "Jane"}]}}'` JSON path: `"$"` JSON result: `{"class":{"students":[{"name":"Jane"}]}}` |
| `.` | Child operator. You can identify child values using dot-notation. | JSON-formatted string: `'{"class" : {"students" : [{"name" : "Jane"}]}}'` JSON path: `"$.class.students"` JSON result: `[{"name":"Jane"}]` |
| `[]` | Subscript operator. If the object is a JSON array, you can use brackets to specify the array index. | JSON-formatted string: `'{"class" : {"students" : [{"name" : "Jane"}]}}'` JSON path: `"$.class.students[0]"` JSON result: `{"name":"Jane"}` |
| `[][]` `[][][]...` | Child subscript operator. If the object is a JSON array within an array, you can use as many additional brackets as you need to specify the child array index. | JSON-formatted string: `'{"a": [["b", "c"], "d"], "e":"f"}'` JSON path: `"$.a[0][1]"` JSON result: `"c"` |

##### Modes for JSONPath

Some JSON functions that take a JSONPath let you specify a mode that indicates
how the JSONPath matches the JSON data structure. For example, the JSONPath
could be `lax $.class.students`. The following modes are supported:

| Mode | Description | Example JSONPath |
|---|---|---|
| `strict` (default) | The JSONPath must structurally match the JSON data | `"$.class.students"` |
| `lax` | Implicitly adapts the path to the structure of the JSON data. If the JSONPath doesn't exactly match the JSON data, then the following rules apply: - If the JSONPath operator is an object, then it unwraps a single level of array. - If the JSONPath operator is an array and the JSON value isn't, then it wraps JSON values in an array of size 1 . A single value is equivalent to an array of size 1 containing the value. | `"lax $.class.students"` |
| `lax recursive` | In addition to `lax` behavior, JSONPath unwraps consecutive arrays until a non-array type is encountered. | `"lax recursive $.class.students"` |

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders; and horizontal rules inside table cells are written as `<hr>`. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 2 files at section boundaries; this is part 2.
- Corrected from the official docs: the input string `'{"a": [10, {"b": 20}]'` was missing the closing `}` of the outer object; it is changed to `'{"a": [10, {"b": 20}]}'`, a valid JSON object as in the neighboring examples.
- Corrected from the official docs: the query had no alias although the result shows a column named `json_data`; `AS json_data` is added.
- Corrected from the official docs: the example is described as the `create_if_missing` is `TRUE` case, but the code passed `false`; it is changed to `true`. The result shown, `{"a": 999}`, is the replaced value.
- Caution: in the `TO_JSON` / `TO_JSON_STRING` encoding table, the `FLOAT64` row lists the SQL input `9007199254740993` with JSON output `9007199254740993`, but this value is an `INT64` literal that `FLOAT64` cannot hold exactly (the `TO_JSON` supertype example on the same page converts it to `9.007199254740992e+15`). The intended input is not stated, so the row is kept as published.
- Corrected from the official docs: the result comment of the graph path `TO_JSON` example ends with `/*` instead of `*/`, which leaves the comment unterminated; it is closed with `*/`.

## Related

- [Index of this directory](./README.md)
- [JSON functions (part 1 of 2)](./json_functions-1.md)
