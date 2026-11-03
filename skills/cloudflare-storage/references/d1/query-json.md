---
source: https://developers.cloudflare.com/d1/sql-api/query-json/
---

# Query JSON

D1 has built-in support for querying and parsing JSON stored in a `TEXT` column: query paths, insert/replace values, expand arrays into rows, and create generated columns from JSON.

## Signature / Usage

```sql
-- Extract the temperature value
json_extract(sensor_reading, '$.measurement.temp_f')-- returns "77.4" as TEXT
```

Append to an array:

```sql
UPDATE users
SET login_history = json_insert(login_history, '$.history[#]', '2023-05-15T20:33:06+00:00')
WHERE user_id = 'aba0e360-1e04-41b3-91a0-1f2263e1e0fb'
```

Expand an array for `IN` queries from a Worker:

```ts
const stmt = context.env.DB
    .prepare("UPDATE users SET last_audited = ?1 WHERE id IN (SELECT value FROM json_each(?2))")
const resp = await stmt.bind(
    "2023-05-16T11:24:08+00:00",
    JSON.stringify([183183, 13913, 94944])
    ).run()
```

Generated column from JSON:

```sql
CREATE TABLE some_table (
    -- other columns omitted
    raw_data TEXT, -- JSON: {"measurement":{"aqi":[21,42,58],"wind_mph":"13","location":"US-NY"}}
    location AS (json_extract(raw_data, '$.measurement.location')) STORED
)
```

## Options / Props

| Function | Description |
| --- | --- |
| `json(json)` | Validates the string is JSON and returns a minified version. e.g. `json('{"hello":["world" ,"there"] }')` returns `{"hello":["world","there"]}` |
| `json_array(value1, value2, value3, ...)` | Return a JSON array from the values. `json_array(1, 2, 3)` returns `[1, 2, 3]` |
| `json_array_length(json)` / `json_array_length(json, path)` | Length of the JSON array. `json_array_length('{"data":["x", "y", "z"]}', '$.data')` returns `3` |
| `json_extract(json, path)` | Extract value(s) at the path. `json_extract('{"temp":"78.3", "sunset":"20:44"}', '$.temp')` returns `"78.3"` |
| `json -> path` | Extract value(s) at the path and return as JSON. |
| `json ->> path` | Extract value(s) at the path and return as a SQL type. |
| `json_insert(json, path, value)` | Insert a value at the path. Does not overwrite an existing value. |
| `json_object(label1, value1, ...)` | Pairs of (keys, values) to a JSON object. `json_object('temp', 45, 'wind_speed_mph', 13)` returns `{"temp":45,"wind_speed_mph":13}` |
| `json_patch(target, patch)` | JSON MergePatch (RFC 7396) of patch into target. |
| `json_remove(json, path, ...)` | Remove the key and value at the path. `json_remove('[60,70,80,90]', '$[0]')` returns `70,80,90]` (as printed in the source) |
| `json_replace(json, path, value)` | Overwrites an existing value; does not create a new key if it doesn't exist. |
| `json_set(json, path, value)` | Insert a value at the path, overwriting an existing value. |
| `json_type(json)` / `json_type(json, path)` | One of `null`, `true`, `false`, `integer`, `real`, `text`, `array`, `object`. |
| `json_valid(json)` | 0 for invalid JSON, 1 for valid. |
| `json_quote(value)` | Converts the SQL value into its JSON representation. `json_quote('[1, 2, 3]')` returns the JSON string `"[1, 2, 3]"` (quoted, not converted to an array); use `json('[1, 2, 3]')` to get the minified array `[1,2,3]` |
| `json_group_array(value)` | Returns the provided value(s) as a JSON array. |
| `json_each(value)` / `json_each(value, path)` | Each element as a row; traverses only the top-level object. Columns: `key`, `value`, `type`, `fullkey`, `path`. |
| `json_tree(value)` / `json_tree(value, path)` | Each element as a row; traverses the full object. |

## Notes

- Placeholders: `json` can be a JSON object, array, string, number or null. `value` accepts string literals only and treats input as a string, even if well-formed JSON (except when nesting `json_*` functions, where the outer function interprets the inner return value as JSON). `path` uses path syntax: `$` top level, `$.key1.key2` nested, `$.key[2]` array index.
- JSON is stored as `TEXT`. A JSON null is D1 `NULL`; a number is `INTEGER` or `REAL`; `true`/`false` are `1`/`0`; objects and arrays are `TEXT`.
- Non-JSON or invalid input (RFC 7159) returns a `malformed JSON` error, e.g. `SELECT json_extract('not valid JSON: just a string', '$')` fails with `ERROR 9015: SQL engine error: query error: Error code 1: SQL error or missing database (malformed JSON)`.
- Parsing JSON in D1 reduces round-trips (no read, parse, write back).
- Generated columns over JSON can be indexed; index frequently filtered JSON paths for performance.
- `json_replace` overwrites an existing key; `json_set` sets regardless of existence; `[#]` in a path appends to an array.
- Corrected from the official docs: the official Worker example uses `SET last_audited = ?` together with `json_each(?1)`, so both placeholders refer to parameter 1 while two values are bound; it is written as `?1` / `?2`. The official generated-column `CREATE TABLE` omits the comma after `raw_data TEXT`, which is a syntax error; a comma is added. The official table says `json_quote('[1, 2, 3]')` returns `[1,2,3]`; SQLite's `json_quote` on a text value returns a quoted JSON string, and `json()` is what minifies a JSON array.
- The source's example `sensor_reading -\-> '$.measurement.o3'` is rendering-escaped `->>`; the `aqi[3]` example comment ("maximum PM2.5") does not match a 3-element array in the sample data.

## Related

- [Generated columns](./generated-columns.md)
- [Use indexes](./use-indexes.md)
- [Workers Binding API](./worker-binding-api.md)
- [SQL statements](./sql-statements.md)
