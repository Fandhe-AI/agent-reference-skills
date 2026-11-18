---
source: https://docs.cloud.google.com/application-integration/docs/configure-data-mapping-task
---

# Data Mapping task

The Data Mapping task assigns variables (integration variables or task variables), gets and sets properties of JSON objects, and applies nested transform functions to values. This page covers configuring the task, the supported data types and functions per type, base functions, best practices and JSON-schema considerations.

## Signature / Usage

### Configure the task

In the integration editor, open **Tasks**, place the **Data Mapping** element, select it, and click **Open Data Mapping Editor**. When creating an integration you pick a region (only regions provisioned in the project are listed; **Enable Region** provisions another) and, if integration governance is enabled for that region, a service account. Edits in the editor are autosaved.

### Add a mapping

- **Input** row: drag a variable or subfield from the **Variables** list, or click **Variable or Value** and choose **Variable**, **Value** (literal `string`, `integer`, `double` or `Boolean`) or **Function** (a base function). Click **+ (Add a function)** to chain mapping functions; each function parameter can hold a value, a variable, or a base function followed by mapping functions.
- **Output** row: drag a variable or create a new one; optionally mark it as an output of the integration or an input to another integration.

### Convert JSON-typed child properties

For JSON variables with a JSON schema, a child property is interpreted as a JSON type when its `type` includes null or lists several data types, for example:

```json
{
  "properties": {
    "PersonID": {
      "type": [
        "double",
        "null"
      ],
      "readOnly": false
    }
  }
}
```

```json
{
  "properties": {
    "PersonID": {
      "type": [
        "integer",
        "string",
        "number"
      ],
      "readOnly": false
    }
  }
}
```

Convert such children explicitly with mapping functions. Example 1: `dbIntegers` is interpreted as JSON and `dbBooleans` as `BOOLEAN_ARRAY`:

```json
{
  "type": "object",
  "properties": {
    "dbIntegers": {
      "type": "array",
      "items": {
        "type": [
          "integer",
          "null"
        ]
      }
    },
    "dbBooleans": {
      "type": [
        "array"
      ],
      "items": {
        "type": "boolean"
      }
    }
  }
}
```

```text
dbIntegers.TO_INT_ARRAY()
```

Example 2: `dbId` and `dbStatus` are both interpreted as JSON (a single double or null, a single boolean or null):

```json
{
  "type": "object",
  "properties": {
    "dbId": {
      "type": [
        "number",
        "null"
      ],
      "readOnly": false
    },
    "dbStatus": {
      "type": [
        "boolean",
        "null"
      ],
      "readOnly": false
    }
  }
}
```

```text
dbId.TO_DOUBLE()
```

```text
dbStatus.TO_BOOLEAN()
```

Example 3: `dbString` (`"type": ["string"]`) is recognized as a string type.

## Options / Props

### Mapping functions per data type

| Data type | Supported mapping functions |
|---|---|
| Boolean | AND, EQUALS, NAND, NOR, NOT, OR, TO_JSON, TO_STRING, XNOR, XOR |
| Boolean array | APPEND, APPEND_ALL, CONTAINS, FILTER, FOR_EACH, GET, REMOVE, REMOVE_AT, SET, SIZE, TO_JSON, TO_SET |
| Double | ADD, DIVIDE, CEIL, EQUALS, EXPONENT, GREATER_THAN, GREATER_THAN_EQUAL_TO, FLOOR, LESS_THAN, LESS_THAN_EQUAL_TO, MOD, MULTIPLY, ROUND, SUBTRACT, TO_JSON, TO_STRING |
| Double array | APPEND, APPEND_ALL, AVG, CONTAINS, FILTER, FOR_EACH, GET, MAX, MIN, REMOVE, REMOVE_AT, SET, SIZE, SUM, TO_JSON, TO_SET |
| Integer | ADD, DIVIDE, EPOCH_TO_HUMAN_READABLE_TIME, EQUALS, EXPONENT, GREATER_THAN, GREATER_THAN_EQUAL_TO, LESS_THAN, LESS_THAN_EQUAL_TO, MOD, MULTIPLY, SUBTRACT, TO_DOUBLE, TO_JSON, TO_STRING |
| Integer array | APPEND, APPEND_ALL, AVG, CONTAINS, FILTER, FOR_EACH, GET, MAX, MIN, REMOVE, REMOVE_AT, SET, SIZE, SUM, TO_JSON, TO_SET |
| JSON | APPEND_ELEMENT, FLATTEN, FILTER, FOR_EACH, GET_ELEMENT, GET_PROPERTY, MERGE, REMOVE_PROPERTY, RESOLVE_TEMPLATE, SET_PROPERTY, SIZE, TO_BOOLEAN, TO_BOOLEAN_ARRAY, TO_DOUBLE, TO_DOUBLE_ARRAY, TO_INT, TO_INT_ARRAY, TO_STRING, TO_STRING_ARRAY |
| String | CONCAT, CONTAINS, DECODE_BASE64_STRING, EQUALS, EQUALS_IGNORE_CASE, LENGTH, REPLACE_ALL, RESOLVE_TEMPLATE, SPLIT, SUBSTRING, TO_BASE_64, TO_BOOLEAN, TO_DOUBLE, TO_INT, TO_JSON, TO_LOWERCASE, TO_UPPERCASE |
| String array | APPEND, APPEND_ALL, CONTAINS, FILTER, FOR_EACH, GET, REMOVE, REMOVE_AT, SET, SIZE, TO_JSON, TO_SET |

### Supported base functions

| Data type | Supported base functions |
|---|---|
| Integer | NOW_IN_MILLIS |
| Integer array | INT_LIST |
| String | GENERATE_UUID, GET_EXECUTION_ID, GET_INTEGRATION_NAME, GET_INTEGRATION_REGION, GET_PROJECT_ID |

## Notes

- Supported variable data types: String and String array; Integer and Integer array; Double and Double array; Boolean and Boolean array; JSON.
- Mappings run in sequence from top to bottom; an output of row 1 is available to later rows.
- In each row the data type of the Input must match the data type of the Output; cast with functions such as `TO_STRING` and `TO_INT`.
- There is no limit on transformation chain length, but large chains are hard to debug; split complex transformations into several mappings.
- If a mapping needs a fallback value, set one; without it the mapping returns an error when the input value or transformation returns `null`.
- When deleting a variable, delete every mapping that contains it.
- Usage limits for the task: https://docs.cloud.google.com/application-integration/docs/quotas#usage-limits. Error handling strategies: https://docs.cloud.google.com/application-integration/docs/error-handling-strategy.
- Omitted: Console click-path images and the links on each function name (per-function pages are under `https://docs.cloud.google.com/application-integration/docs/data-mapping-functions-reference`).
- Source: https://docs.cloud.google.com/application-integration/docs/configure-data-mapping-task (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [data-mapping-overview.md](./data-mapping-overview.md)
- [data-mapping-functions-reference.md](./data-mapping-functions-reference.md)
- [configure-data-transformer-script-task.md](./configure-data-transformer-script-task.md)
