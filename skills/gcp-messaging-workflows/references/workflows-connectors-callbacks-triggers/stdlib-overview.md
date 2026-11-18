---
source: https://docs.cloud.google.com/workflows/docs/reference/stdlib/overview
---

# Workflows standard library overview

The Workflows standard library modules help construct arguments for services and process responses. No import or load is needed: library functions work out of the box. All functions can be called with `call` steps, but only non-blocking functions can be used inside an expression.

## Signature / Usage

Adapted (not in the official docs): the log and return steps drop `headers` from `callback_request.http_request` with `map.delete`, because `headers` holds the callback request's headers, callers must authenticate with an `Authorization: Bearer` access token, and the source does not say that header is removed; without this, the headers are written to Cloud Logging and the execution result.

```yaml
    - create_callback:
        call: events.create_callback_endpoint
        args:
            http_callback_method: "GET"
        result: callback_details
    - print_callback_details:
        call: sys.log
        args:
            severity: "INFO"
            text: ${"Listening for callbacks on " + callback_details.url}
    - await_callback:
        call: events.await_callback
        args:
            callback: ${callback_details}
            timeout: 3600
        result: callback_request
    - print_callback_request:
        call: sys.log
        args:
            severity: "INFO"
            text: ${"Received " + json.encode_to_string(map.delete(callback_request.http_request, "headers"))}
    - return_callback_result:
        return: ${map.delete(callback_request.http_request, "headers")}
```

## Options / Props

### Modules and functions

| Module | Function / object | Description |
|--------|-------------------|-------------|
| base64 | `base64.decode` | Decodes given Base64-encoded string to bytes. |
| base64 | `base64.encode` | Encodes given bytes to Base64 text. |
| events | `events.await_callback` | Waits for a callback to be received at the given endpoint. |
| events | `events.create_callback_endpoint` | Creates a callback endpoint expecting the specified HTTP method. |
| experimental.executions | `experimental.executions.execution_error` | Raised when a workflow execution finishes with an error or is cancelled. |
| experimental.executions | `experimental.executions.map` | Starts workflow executions and waits for all of them to finish. |
| experimental.executions | `experimental.executions.run` | Starts a workflow execution and waits for it to finish. |
| hash | `hash.compute_checksum` | Computes checksum using a given hashing algorithm. |
| hash | `hash.compute_hmac` | Computes the hash-based message authentication code (HMAC) for data given a secret key and hashing algorithm. |
| http | `http.default_retry_predicate` | Simple default retry predicate for idempotent targets. |
| http | `http.default_retry_predicate_non_idempotent` | Simple default retry predicate for non-idempotent targets. |
| http | `http.delete` | Sends an HTTP `DELETE` request to the specified URL. |
| http | `http.get` | Sends an HTTP `GET` request to the specified URL. |
| http | `http.patch` | Sends an HTTP `PATCH` request to the specified URL. |
| http | `http.post` | Sends an HTTP `POST` request to the specified URL. |
| http | `http.put` | Sends an HTTP `PUT` request to the specified URL. |
| http | `http.request` | Sends an HTTP request. |
| http (objects) | `http.default_retry` | Simple default retry policy for idempotent targets. |
| http (objects) | `http.default_retry_non_idempotent` | Simple default retry policy for non-idempotent targets. |
| json | `json.decode` | Decodes given JSON bytes (assuming UTF-8), or a string, into an object. |
| json | `json.encode` | Encodes given input object to JSON bytes, using UTF-8 charset. |
| json | `json.encode_to_string` | Encodes given object to a JSON string. |
| list | `list.concat` | Creates a copy of a list with a new element concatenated at the end. |
| list | `list.prepend` | Creates a copy of a list with a new element added to the beginning. |
| map | `map.delete` | Takes a map, creates a copy of the map, and removes the item with the specified key. |
| map | `map.get` | Performs a safe lookup on a map, returning `null` if the key is not found. |
| map | `map.merge` | Takes two maps, creates a copy of the first map, and adds the items from the second map to the copy. |
| map | `map.merge_nested` | Takes two maps, creates a copy of the first map, and recursively adds items from the second map to the copy. |
| math | `math.abs` | Returns the absolute value of a number. |
| math | `math.floor` | Returns the floor of a number. |
| math | `math.max` | Returns the maximum of two numbers. |
| math | `math.min` | Returns the minimum of two numbers. |
| retry | `retry.always` | Convenience retry condition that retries on any error. |
| retry | `retry.never` | Convenience retry condition that retries on no error at all. |
| retry (objects) | `retry.default_backoff` | Simple default truncated exponential backoff policy. |
| sys | `sys.get_env` | Retrieves the value of the specified environment variable. |
| sys | `sys.log` | Writes one of `data`, `text`, or `json` to the log at specified severity. |
| sys | `sys.now` | Returns Unix time, as a floating-point number. |
| sys | `sys.sleep` | Suspends execution for the given number of seconds. |
| sys | `sys.sleep_until` | Suspends execution until the given time. |
| text | `text.decode` | Decodes given data to string, assuming the specified character set. |
| text | `text.encode` | Encodes given text to bytes, using the specified character set. |
| text | `text.find_all` | Finds the index of all instances of a substring in a string. |
| text | `text.find_all_regex` | Finds all matches of a regular expression in a string. |
| text | `text.match_regex` | Reports whether a string contains a match of a regular expression. |
| text | `text.replace_all` | Replaces all instances of a substring with a new string. |
| text | `text.replace_all_regex` | Replaces all matches of a regular expression with a new string. |
| text | `text.split` | Splits the source string into a list of all substrings between each instance of the separator. |
| text | `text.substring` | Extracts the substring between two zero-based indexes of a source string. |
| text | `text.to_lower` | Returns a string with all Unicode letters mapped to their lowercase. |
| text | `text.to_upper` | Returns a string with all Unicode letters mapped to their uppercase. |
| text | `text.url_decode` | Returns a string with pluses and percent-escaped characters converted to UTF-8. |
| text | `text.url_encode` | Returns a string with percent-encoded reserved characters, including spaces. |
| text | `text.url_encode_plus` | Returns a string with percent-encoded reserved characters, and spaces replaced by pluses (`+`). |
| time | `time.format` | Formats the given timestamp as a human-readable string. |
| time | `time.parse` | Parses the given RFC 3339-compatible string into a timestamp. |
| uuid | `uuid.generate` | Returns a random universally unique identifier (UUID). |

### Expression helpers (built in, usable in expressions)

| Group | Behavior |
|-------|----------|
| Conversion functions | Accept a string or integer and return a double; accept a string or double and return an integer; accept an integer, double, or boolean and return a string. |
| Data type functions | Check whether a given key is present in a list or map; return a list of the key elements of a map; compute the length of a value according to its type. |
| Conditional functions | Return a value if it is not null, otherwise a default value; evaluate a condition and return one of two arguments. |
| Type functions | Return a string indicating the data type of the argument. |

## Notes

- Blocking calls (HTTP calls, `sys.sleep`, `sys.log`) cannot be used inside an expression; see the Workflows expressions page, section "Blocking calls".
- Function names of the expression helpers are listed on https://docs.cloud.google.com/workflows/docs/reference/stdlib/expression-helpers; the overview page shows only their descriptions.
- Know which functions count as a step toward the maximum steps limit: https://docs.cloud.google.com/workflows/docs/best-practice#optimize-usage.
- Random values: `uuid.generate` returns a random 128-bit UUID string. `sys.now` returns a floating point number with nanosecond precision. For a single number, use `sys.get_env` to read the execution identifier. For a unique ID, convert the `sys.now` number with `string()` and combine it with the execution ID (for example `some_execution_id1635892223.4459958`).
- `experimental.executions`: "The behavior of routines in this module might change, and they might not be supported in the future." Instead of `experimental.executions.map`, run steps in parallel (https://docs.cloud.google.com/workflows/docs/execute-parallel-steps); migration: https://docs.cloud.google.com/workflows/docs/migrate-function-to-parallel.
- To concatenate strings, see the Workflows Strings syntax page.
- Snippet taken from https://docs.cloud.google.com/workflows/docs/creating-callback-endpoints (uses `sys.log`, `json.encode_to_string`, `map.delete` and the `events` module); it is a list of steps without a `main` wrapper, as in the source.
- Adapted from the official docs: the source logged `${"Received " + json.encode_to_string(callback_request.http_request)}` and returned `${callback_request.http_request}`, including the request `headers`; `map.delete` (https://docs.cloud.google.com/workflows/docs/reference/stdlib/map/delete) returns a copy of the map without the given key.
- Source: https://docs.cloud.google.com/workflows/docs/reference/stdlib/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [connectors.md](./connectors.md)
- [http-requests.md](./http-requests.md)
- [creating-callback-endpoints.md](./creating-callback-endpoints.md)
