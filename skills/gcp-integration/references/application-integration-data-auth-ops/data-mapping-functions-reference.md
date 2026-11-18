---
source: https://docs.cloud.google.com/application-integration/docs/data-mapping-functions-reference
---

# Data Mapping functions reference

The Data Mapping task provides predefined mapping functions to transform and standardize data. A function can have one or more parameters; each parameter holds a literal value, a variable, or a base function with mapping functions applied, and several functions on one input form a transform expression.

## Signature / Usage

A mapping function applied to a variable, as shown on the Data Mapping task page (it converts the JSON-typed variable `dbId` to a double):

```text
dbId.TO_DOUBLE()
```

## Options / Props

### Mapping functions

| Function | Description |
|---|---|
| `ADD` | Adds the specified number to an existing number. |
| `AND` | Performs the logical AND operation on the specified boolean values. |
| `APPEND` | Appends the specified value to an array. |
| `APPEND_ALL` | Appends all the specified values to an array. |
| `APPEND_ELEMENT` | Appends an element to a JSON array. |
| `AVG` | Calculates the numerical average of all the values in an array. |
| `CEIL` | Computes the smallest integer that is greater than or equal to the given input. |
| `CONCAT` | Concatenates the specified characters to an existing string. |
| `CONTAINS` | Checks the occurrence of the specified value in a given string or string array. |
| `DECODE_BASE64_STRING` | Decodes a base64 string to UTF-8 charset. |
| `DIVIDE` | Divides an existing number by the specified number. |
| `EQUALS` | Compares the specified value with the existing value. |
| `EQUALS_IGNORE_CASE` | Compares the specified value with the existing value. |
| `EPOCH_TO_HUMAN_READABLE_TIME` | Converts Unix epoch time (in milliseconds) to human-readable time format. |
| `EXPONENT` | Calculates the value of an existing number raised to the specified power. |
| `FILTER` | Filters the array elements that satisfy a given filter condition. Note that a filter condition must evaluate to TRUE or FALSE. |
| `FLATTEN` | Flattens a JSON array recursively to create a new one-dimensional array. |
| `FLOOR` | Computes the greatest integer that is less than or equal to the provided input. |
| `FOR_EACH` | Applies one or more transformation functions for each element in an array. |
| `GET` | Returns the value in an array at a specified index. In an array, the first value is available at index 0 and the last value is available at index n-1 where n is the size of the array. |
| `GET_ELEMENT` | Returns the element at the specified index in a JSON array. In the array, the first value is available at index 0 and the last value is available at index n-1 where n is the size of the array. |
| `GET_PROPERTY` | Returns the value of the specified property in a JSON object. |
| `GREATER_THAN` | Checks if an existing number is greater than the specified number. |
| `GREATER_THAN_EQUAL_TO` | Checks if an integer is greater than or equal to the specified value. |
| `LENGTH` | Calculates the length of a string. The length of a string is the number of characters in the string. |
| `LESS_THAN_EQUAL_TO` | Checks if an integer is less than or equal to the specified value. |
| `LESS_THAN` | Checks if an existing number is less than the specified number. |
| `MAX` | Finds the highest value in an array. |
| `MERGE` | Merges two JSON variables (objects or arrays). If same value is present in both the variables, the function removes the duplicate value. |
| `MIN` | Finds the lowest value in an array. |
| `MOD` | Divides two values and returns the remainder of the division operation. |
| `MULTIPLY` | Multiplies an existing number by the specified number. |
| `NAND` | Performs the logical NAND operation on the specified boolean values. |
| `NOR` | Performs the logical NOR operation on the specified boolean values. |
| `NOT` | Returns the opposite value of a boolean. |
| `OR` | Performs the logical OR operation on the specified boolean values. |
| `REMOVE` | Removes the specified value from an array. |
| `REMOVE_AT` | Removes an element from an array at the specified index. |
| `REMOVE_PROPERTY` | Removes a property from a JSON object. |
| `REPLACE_ALL` | Replaces all the occurrences of a substring in a string. |
| `RESOLVE_TEMPLATE` | Resolves references in a template string that contains $variable$ references. |
| `ROUND` | Rounds a number to the nearest integer. |
| `SET` | Updates the value of a string array at the specified index. |
| `SET_PROPERTY` | Adds or updates a property in a JSON object. |
| `SIZE` | Counts the number of elements in an array. |
| `SPLIT` | Splits a string based on the specified delimiter. |
| `SUBSTRING` | Returns the substring of the current string from the start index inclusive to the end index exclusive. |
| `SUBTRACT` | Subtracts the specified number from an existing number. |
| `SUM` | Adds all the values in an array. |
| `TO_BASE_64` | Encodes a string to base64 format using the UTF-8 charset. |
| `TO_BOOLEAN_ARRAY` | Converts a JSON array to a boolean array. |
| `TO_BOOLEAN` | Converts a string to a boolean data type. |
| `TO_DOUBLE_ARRAY` | Converts a JSON array to a double array. |
| `TO_DOUBLE` | Converts a string or an integer to a double. |
| `TO_INT_ARRAY` | Converts a JSON array to an integer array. |
| `TO_INT` | Converts a string to an integer. |
| `TO_JSON` | Converts the current value to a JSON object. |
| `TO_LOWERCASE` | Converts all the characters in a string to lowercase. |
| `TO_SET` | Removes duplicate values in an array. |
| `TO_STRING_ARRAY` | Converts a JSON array to a string array. |
| `TO_UPPERCASE` | Converts all the characters in a string to uppercase. |
| `XNOR` | Performs the logical XNOR operation on the specified boolean values. |
| `XOR` | Performs the logical XOR operation on the specified boolean values. |

### Base functions

| Function | Description |
|---|---|
| `GENERATE_UUID` | Generates a random UUID. |
| `GET_EXECUTION_ID` | Returns the execution ID of the current integration. |
| `GET_INTEGRATION_NAME` | Returns the name of the current integration. |
| `GET_INTEGRATION_REGION` | Returns the region of the current integration. |
| `GET_PROJECT_ID` | Returns the Google Cloud project ID of the current integration. |
| `INT_LIST` | Returns an integer list between the specified values. The returned list is inclusive of the starting value and exclusive of the ending value. |
| `NOW_IN_MILLIS` | Returns the current Unix epoch time of the integration in milliseconds. |

## Notes

- Which functions apply to which data type is listed on the Data Mapping task page; each function has its own detail page under `https://docs.cloud.google.com/application-integration/docs/reference/data-mapping-reference/` (for example `add-function-reference`).
- Base functions retrieve or generate values while the integration runs. The functions reference page lists them in the same table as the mapping functions; the Data Mapping task page lists them separately as base functions.
- Source inconsistency: the Data Mapping task page lists `TO_STRING` for the Boolean, Double, Integer and JSON data types, but the functions reference page has no `TO_STRING` row.
- This page covers the Data Mapping task only; Data Transformer (Jsonnet) functions are a separate library.
- Snippet taken from https://docs.cloud.google.com/application-integration/docs/configure-data-mapping-task
- Source: https://docs.cloud.google.com/application-integration/docs/configure-data-mapping-task (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/application-integration/docs/data-mapping-functions-reference (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-data-mapping-task.md](./configure-data-mapping-task.md)
- [data-mapping-overview.md](./data-mapping-overview.md)
- [data-transformer-functions-reference.md](./data-transformer-functions-reference.md)
