# GoogleSQL functions

| Name | Description | Path |
| --- | --- | --- |
| `ABS` | Computes the absolute value of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#abs) |
| `ACOS` | Computes the inverse cosine of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#acos) |
| `ACOSH` | Computes the inverse hyperbolic cosine of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#acosh) |
| `AEAD.DECRYPT_BYTES` | Uses the matching key from a keyset to decrypt a `BYTES` ciphertext. | [aead_encryption_functions.md](./aead_encryption_functions.md#aeaddecrypt_bytes) |
| `AEAD.DECRYPT_STRING` | Uses the matching key from a keyset to decrypt a `BYTES` ciphertext into a `STRING` plaintext. | [aead_encryption_functions.md](./aead_encryption_functions.md#aeaddecrypt_string) |
| `AEAD.ENCRYPT` | Encrypts `STRING` plaintext, using the primary cryptographic key in a keyset. | [aead_encryption_functions.md](./aead_encryption_functions.md#aeadencrypt) |
| `AGG` | Aggregates a measure type. | [aggregate_functions.md](./aggregate_functions.md#agg) |
| `ANY_VALUE` | Gets an expression for some row. | [aggregate_functions.md](./aggregate_functions.md#any_value) |
| `APPENDS` | Returns all rows appended to a table for a given time range. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time-series-functions#appends) |
| `APPROX_COUNT_DISTINCT` | Gets the approximate result for `COUNT(DISTINCT expression)`. | [approximate_aggregate_functions.md](./approximate_aggregate_functions.md#approx_count_distinct) |
| `APPROX_QUANTILES` | Gets the approximate quantile boundaries. | [approximate_aggregate_functions.md](./approximate_aggregate_functions.md#approx_quantiles) |
| `APPROX_TOP_COUNT` | Gets the approximate top elements and their approximate count. | [approximate_aggregate_functions.md](./approximate_aggregate_functions.md#approx_top_count) |
| `APPROX_TOP_SUM` | Gets the approximate top elements and sum, based on the approximate sum of an assigned weight. | [approximate_aggregate_functions.md](./approximate_aggregate_functions.md#approx_top_sum) |
| `ARRAY` | Produces an array with one element for each row in a subquery. | [array_functions.md](./array_functions.md#array) |
| `ARRAY_AGG` | Gets an array of values. | [aggregate_functions.md](./aggregate_functions.md#array_agg) |
| `ARRAY_CONCAT` | Concatenates one or more arrays with the same element type into a single array. | [array_functions.md](./array_functions.md#array_concat) |
| `ARRAY_CONCAT_AGG` | Concatenates arrays and returns a single array as a result. | [aggregate_functions.md](./aggregate_functions.md#array_concat_agg) |
| `ARRAY_FIRST` | Gets the first element in an array. | [array_functions.md](./array_functions.md#array_first) |
| `ARRAY_LAST` | Gets the last element in an array. | [array_functions.md](./array_functions.md#array_last) |
| `ARRAY_LENGTH` | Gets the number of elements in an array. | [array_functions.md](./array_functions.md#array_length) |
| `ARRAY_REVERSE` | Reverses the order of elements in an array. | [array_functions.md](./array_functions.md#array_reverse) |
| `ARRAY_SLICE` | Produces an array containing zero or more consecutive elements from an input array. | [array_functions.md](./array_functions.md#array_slice) |
| `ARRAY_TO_STRING` | Produces a concatenation of the elements in an array as a `STRING` value. | [array_functions.md](./array_functions.md#array_to_string) |
| `ASCII` | Gets the ASCII code for the first character or byte in a `STRING` or `BYTES` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#ascii) |
| `ASIN` | Computes the inverse sine of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#asin) |
| `ASINH` | Computes the inverse hyperbolic sine of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#asinh) |
| `ATAN` | Computes the inverse tangent of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#atan) |
| `ATAN2` | Computes the inverse tangent of `X/Y`, using the signs of `X` and `Y` to determine the quadrant. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#atan2) |
| `ATANH` | Computes the inverse hyperbolic tangent of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#atanh) |
| `AVG` | Gets the average of non-`NULL` values. | [aggregate_functions.md](./aggregate_functions.md#avg) |
| `BAG_OF_WORDS` | Gets the frequency of each term (token) in a tokenized document. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis-functions#bag_of_words) |
| `BIT_AND` | Performs a bitwise AND operation on an expression. | [aggregate_functions.md](./aggregate_functions.md#bit_and) |
| `BIT_COUNT` | Gets the number of bits that are set in an input expression. | [bit_functions.md](./bit_functions.md#bit_count) |
| `BIT_OR` | Performs a bitwise OR operation on an expression. | [aggregate_functions.md](./aggregate_functions.md#bit_or) |
| `BIT_XOR` | Performs a bitwise XOR operation on an expression. | [aggregate_functions.md](./aggregate_functions.md#bit_xor) |
| `BOOL` | Converts a JSON boolean to a SQL `BOOL` value. | [json_functions-1.md](./json_functions-1.md#bool) |
| `BYTE_LENGTH` | Gets the number of `BYTES` in a `STRING` or `BYTES` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#byte_length) |
| `CAST` | Convert the results of an expression to the given type. | [conversion_functions.md](./conversion_functions.md#cast) |
| `CBRT` | Computes the cube root of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#cbrt) |
| `CEIL` | Gets the smallest integral value that isn't less than `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#ceil) |
| `CEILING` | Synonym of `CEIL`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#ceiling) |
| `CHANGES` | Returns all rows that have changed in a table for a given time range. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time-series-functions#changes) |
| `CHAR_LENGTH` | Gets the number of characters in a `STRING` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#char_length) |
| `CHARACTER_LENGTH` | Synonym for `CHAR_LENGTH`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#character_length) |
| `CHR` | Converts a Unicode code point to a character. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#chr) |
| `CODE_POINTS_TO_BYTES` | Converts an array of extended ASCII code points to a `BYTES` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#code_points_to_bytes) |
| `CODE_POINTS_TO_STRING` | Converts an array of extended ASCII code points to a `STRING` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#code_points_to_string) |
| `COLLATE` | Combines a `STRING` value and a collation specification into a collation specification-supported `STRING` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#collate) |
| `CONCAT` | Concatenates one or more `STRING` or `BYTES` values into a single result. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#concat) |
| `CONTAINS_SUBSTR` | Performs a normalized, case-insensitive search to see if a value exists as a substring in an expression. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#contains_substr) |
| `CORR` | Computes the Pearson coefficient of correlation of a set of number pairs. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#corr) |
| `COS` | Computes the cosine of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#cos) |
| `COSH` | Computes the hyperbolic cosine of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#cosh) |
| `COSINE_DISTANCE` | Computes the cosine distance between two vectors. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#cosine_distance) |
| `COT` | Computes the cotangent of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#cot) |
| `COTH` | Computes the hyperbolic cotangent of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#coth) |
| `COUNT` | Gets the number of rows in the input, or the number of rows with an expression evaluated to any value other than `NULL`. | [aggregate_functions.md](./aggregate_functions.md#count) |
| `COUNTIF` | Gets the number of `TRUE` values for an expression. | [aggregate_functions.md](./aggregate_functions.md#countif) |
| `COVAR_POP` | Computes the population covariance of a set of number pairs. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#covar_pop) |
| `COVAR_SAMP` | Computes the sample covariance of a set of number pairs. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#covar_samp) |
| `CSC` | Computes the cosecant of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#csc) |
| `CSCH` | Computes the hyperbolic cosecant of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#csch) |
| `CUME_DIST` | Gets the cumulative distribution (relative position (0,1\]) of each row within a window. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/numbering_functions#cume_dist) |
| `CURRENT_DATE` | Returns the current date as a `DATE` value. | [date_functions.md](./date_functions.md#current_date) |
| `CURRENT_DATETIME` | Returns the current date and time as a `DATETIME` value. | [datetime_functions.md](./datetime_functions.md#current_datetime) |
| `CURRENT_TIME` | Returns the current time as a `TIME` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#current_time) |
| `CURRENT_TIMESTAMP` | Returns the current date and time as a `TIMESTAMP` object. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#current_timestamp) |
| `DATE` | Constructs a `DATE` value. | [date_functions.md](./date_functions.md#date) |
| `DATE_ADD` | Adds a specified time interval to a `DATE` value. | [date_functions.md](./date_functions.md#date_add) |
| `DATE_BUCKET` | Gets the lower bound of the date bucket that contains a date. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time-series-functions#date_bucket) |
| `DATE_DIFF` | Gets the number of unit boundaries between two `DATE` values at a particular time granularity. | [date_functions.md](./date_functions.md#date_diff) |
| `DATE_FROM_UNIX_DATE` | Interprets an `INT64` expression as the number of days since 1970-01-01. | [date_functions.md](./date_functions.md#date_from_unix_date) |
| `DATE_SUB` | Subtracts a specified time interval from a `DATE` value. | [date_functions.md](./date_functions.md#date_sub) |
| `DATE_TRUNC` | Truncates a `DATE`, `DATETIME`, or `TIMESTAMP` value at a particular granularity. | [date_functions.md](./date_functions.md#date_trunc) |
| `DATETIME` | Constructs a `DATETIME` value. | [datetime_functions.md](./datetime_functions.md#datetime) |
| `DATETIME_ADD` | Adds a specified time interval to a `DATETIME` value. | [datetime_functions.md](./datetime_functions.md#datetime_add) |
| `DATETIME_BUCKET` | Gets the lower bound of the datetime bucket that contains a datetime. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time-series-functions#datetime_bucket) |
| `DATETIME_DIFF` | Gets the number of unit boundaries between two `DATETIME` values at a particular time granularity. | [datetime_functions.md](./datetime_functions.md#datetime_diff) |
| `DATETIME_SUB` | Subtracts a specified time interval from a `DATETIME` value. | [datetime_functions.md](./datetime_functions.md#datetime_sub) |
| `DATETIME_TRUNC` | Truncates a `DATETIME` or `TIMESTAMP` value at a particular granularity. | [datetime_functions.md](./datetime_functions.md#datetime_trunc) |
| `DENSE_RANK` | Gets the dense rank (1-based, no gaps) of each row within a window. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/numbering_functions#dense_rank) |
| `DESTINATION_NODE_ID` | Gets a unique identifier of a graph edge's destination node. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-functions#destination_node_id) |
| `DETERMINISTIC_DECRYPT_BYTES` | Uses the matching key from a keyset to decrypt a `BYTES` ciphertext, using deterministic AEAD. | [aead_encryption_functions.md](./aead_encryption_functions.md#deterministic_decrypt_bytes) |
| `DETERMINISTIC_DECRYPT_STRING` | Uses the matching key from a keyset to decrypt a `BYTES` ciphertext into a `STRING` plaintext, using deterministic AEAD. | [aead_encryption_functions.md](./aead_encryption_functions.md#deterministic_decrypt_string) |
| `DETERMINISTIC_ENCRYPT` | Encrypts `STRING` plaintext, using the primary cryptographic key in a keyset, using deterministic AEAD encryption. | [aead_encryption_functions.md](./aead_encryption_functions.md#deterministic_encrypt) |
| `DIV` | Divides integer `X` by integer `Y`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#div) |
| `DLP_DETERMINISTIC_ENCRYPT` | Encrypts data with a DLP compatible algorithm. | [dlp_functions.md](./dlp_functions.md#dlp_deterministic_encrypt) |
| `DLP_DETERMINISTIC_DECRYPT` | Decrypts DLP-encrypted data. | [dlp_functions.md](./dlp_functions.md#dlp_deterministic_decrypt) |
| `DLP_KEY_CHAIN` | Gets a data encryption key that's wrapped by Cloud Key Management Service. | [dlp_functions.md](./dlp_functions.md#dlp_key_chain) |
| `FLOAT64` | Converts a JSON number to a SQL `FLOAT64` value. | [json_functions-1.md](./json_functions-1.md#float64) |
| `EDGES` | Gets the edges in a graph path. The resulting array retains the original order in the graph path. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-functions#edges) |
| `EDIT_DISTANCE` | Computes the Levenshtein distance between two `STRING` or `BYTES` values. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#edit_distance) |
| `ELEMENT_ID` | Gets a graph element's unique identifier. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-functions#element_id) |
| `ENDS_WITH` | Checks if a `STRING` or `BYTES` value is the suffix of another value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#ends_with) |
| `ERROR` | Produces an error with a custom error message. | [debugging_functions.md](./debugging_functions.md#error) |
| `EXP` | Computes `e` to the power of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#exp) |
| `EXTERNAL_OBJECT_TRANSFORM` | Produces an object table with the original columns plus one or more additional columns. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/table-functions-built-in#external_object_transform) |
| `EXTERNAL_QUERY` | Executes a query on an external database and returns the results as a temporary table. | [federated_query_functions.md](./federated_query_functions.md#external_query) |
| `EXTRACT` | Extracts part of a date from a `DATE` value. | [date_functions.md](./date_functions.md#extract) |
| `EXTRACT` | Extracts part of a date and time from a `DATETIME` value. | [datetime_functions.md](./datetime_functions.md#extract) |
| `EXTRACT` | Extracts part of an `INTERVAL` value. | [interval_functions.md](./interval_functions.md#extract) |
| `EXTRACT` | Extracts part of a `TIME` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#extract) |
| `EXTRACT` | Extracts part of a `TIMESTAMP` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#extract) |
| `EUCLIDEAN_DISTANCE` | Computes the Euclidean distance between two vectors. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#euclidean_distance) |
| `FARM_FINGERPRINT` | Computes the fingerprint of a `STRING` or `BYTES` value using the FarmHash Fingerprint64 algorithm. | [hash_functions.md](./hash_functions.md#farm_fingerprint) |
| `FIRST_VALUE` | Gets a value for the first row in the current window frame. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions#first_value) |
| `FLOOR` | Gets the largest integral value that isn't greater than `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#floor) |
| `FORMAT_DATE` | Formats a `DATE` value according to a specified format string. | [date_functions.md](./date_functions.md#format_date) |
| `FORMAT_DATETIME` | Formats a `DATETIME` value according to a specified format string. | [datetime_functions.md](./datetime_functions.md#format_datetime) |
| `FORMAT_TIME` | Formats a `TIME` value according to the specified format string. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#format_time) |
| `FORMAT_TIMESTAMP` | Formats a `TIMESTAMP` value according to the specified format string. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#format_timestamp) |
| `FORMAT` | Formats data and produces the results as a `STRING` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#format_string) |
| `FROM_BASE32` | Converts a base32-encoded `STRING` value into a `BYTES` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#from_base32) |
| `FROM_BASE64` | Converts a base64-encoded `STRING` value into a `BYTES` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#from_base64) |
| `FROM_HEX` | Converts a hexadecimal-encoded `STRING` value into a `BYTES` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#from_hex) |
| `GAP_FILL` | Finds and fills gaps in a time series. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time-series-functions#gap_fill) |
| `GENERATE_ARRAY` | Generates an array of values in a range. | [array_functions.md](./array_functions.md#generate_array) |
| `GENERATE_DATE_ARRAY` | Generates an array of dates in a range. | [array_functions.md](./array_functions.md#generate_date_array) |
| `GENERATE_RANGE_ARRAY` | Splits a range into an array of subranges. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/range-functions#generate_range_array) |
| `GENERATE_TIMESTAMP_ARRAY` | Generates an array of timestamps in a range. | [array_functions.md](./array_functions.md#generate_timestamp_array) |
| `GENERATE_UUID` | Produces a random universally unique identifier (UUID) as a `STRING` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/utility-functions#generate_uuid) |
| `GREATEST` | Gets the greatest value among `X1,...,XN`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#greatest) |
| `GROUPING` | Checks if a groupable value in the `GROUP BY` clause is aggregated. | [aggregate_functions.md](./aggregate_functions.md#grouping) |
| `HLL_COUNT.EXTRACT` | Extracts a cardinality estimate of an HLL++ sketch. | [hll_functions.md](./hll_functions.md#hll_countextract) |
| `HLL_COUNT.INIT` | Aggregates values of the same underlying type into a new HLL++ sketch. | [hll_functions.md](./hll_functions.md#hll_countinit) |
| `HLL_COUNT.MERGE` | Merges HLL++ sketches of the same underlying type into a new sketch, and then gets the cardinality of the new sketch. | [hll_functions.md](./hll_functions.md#hll_countmerge) |
| `HLL_COUNT.MERGE_PARTIAL` | Merges HLL++ sketches of the same underlying type into a new sketch. | [hll_functions.md](./hll_functions.md#hll_countmerge_partial) |
| `IEEE_DIVIDE` | Divides `X` by `Y`, but doesn't generate errors for division by zero or overflow. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#ieee_divide) |
| `INITCAP` | Formats a `STRING` as proper case, which means that the first character in each word is uppercase and all other characters are lowercase. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#initcap) |
| `INSTR` | Finds the position of a subvalue inside another value, optionally starting the search at a given offset or occurrence. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#instr) |
| `INT64` | Converts a JSON number to a SQL `INT64` value. | [json_functions-1.md](./json_functions-1.md#int64) |
| `IS_ACYCLIC` | Checks if a graph path has a repeating node. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-functions#is_acyclic) |
| `IS_INF` | Checks if `X` is positive or negative infinity. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#is_inf) |
| `IS_NAN` | Checks if `X` is a `NaN` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#is_nan) |
| `IS_SIMPLE` | Checks if a graph path is simple. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-functions#is_simple) |
| `IS_TRAIL` | Checks if a graph path has a repeating edge. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-functions#is_trail) |
| `JSON_ARRAY` | Creates a JSON array. | [json_functions-1.md](./json_functions-1.md#json_array) |
| `JSON_ARRAY_APPEND` | Appends JSON data to the end of a JSON array. | [json_functions-1.md](./json_functions-1.md#json_array_append) |
| `JSON_ARRAY_INSERT` | Inserts JSON data into a JSON array. | [json_functions-1.md](./json_functions-1.md#json_array_insert) |
| `JSON_EXTRACT` | (Deprecated) Extracts a JSON value and converts it to a SQL JSON-formatted `STRING` or `JSON` value. | [json_functions-1.md](./json_functions-1.md#json_extract) |
| `JSON_EXTRACT_ARRAY` | (Deprecated) Extracts a JSON array and converts it to a SQL `ARRAY<JSON-formatted STRING>` or `ARRAY<JSON>` value. | [json_functions-1.md](./json_functions-1.md#json_extract_array) |
| `JSON_EXTRACT_SCALAR` | (Deprecated) Extracts a JSON scalar value and converts it to a SQL `STRING` value. | [json_functions-1.md](./json_functions-1.md#json_extract_scalar) |
| `JSON_EXTRACT_STRING_ARRAY` | (Deprecated) Extracts a JSON array of scalar values and converts it to a SQL `ARRAY<STRING>` value. | [json_functions-1.md](./json_functions-1.md#json_extract_string_array) |
| `JSON_FLATTEN` | Produces a new SQL `ARRAY<JSON>` value containing all non-array values that are either directly in the input JSON value or children of one or more consecutively nested arrays in the input JSON value. | [json_functions-1.md](./json_functions-1.md#json_flatten) |
| `JSON_KEYS` | Extracts unique JSON keys from a JSON expression. | [json_functions-1.md](./json_functions-1.md#json_keys) |
| `JSON_OBJECT` | Creates a JSON object. | [json_functions-1.md](./json_functions-1.md#json_object) |
| `JSON_QUERY` | Extracts a JSON value and converts it to a SQL JSON-formatted `STRING` or `JSON` value. | [json_functions-1.md](./json_functions-1.md#json_query) |
| `JSON_QUERY_ARRAY` | Extracts a JSON array and converts it to a SQL `ARRAY<JSON-formatted STRING>` or `ARRAY<JSON>` value. | [json_functions-2.md](./json_functions-2.md#json_query_array) |
| `JSON_REMOVE` | Produces JSON with the specified JSON data removed. | [json_functions-2.md](./json_functions-2.md#json_remove) |
| `JSON_SET` | Inserts or replaces JSON data. | [json_functions-2.md](./json_functions-2.md#json_set) |
| `JSON_STRIP_NULLS` | Removes JSON nulls from JSON objects and JSON arrays. | [json_functions-2.md](./json_functions-2.md#json_strip_nulls) |
| `JSON_TYPE` | Gets the JSON type of the outermost JSON value and converts the name of this type to a SQL `STRING` value. | [json_functions-2.md](./json_functions-2.md#json_type) |
| `JSON_VALUE` | Extracts a JSON scalar value and converts it to a SQL `STRING` value. | [json_functions-2.md](./json_functions-2.md#json_value) |
| `JSON_VALUE_ARRAY` | Extracts a JSON array of scalar values and converts it to a SQL `ARRAY<STRING>` value. | [json_functions-2.md](./json_functions-2.md#json_value_array) |
| `JUSTIFY_DAYS` | Normalizes the day part of an `INTERVAL` value. | [interval_functions.md](./interval_functions.md#justify_days) |
| `JUSTIFY_HOURS` | Normalizes the time part of an `INTERVAL` value. | [interval_functions.md](./interval_functions.md#justify_hours) |
| `JUSTIFY_INTERVAL` | Normalizes the day and time parts of an `INTERVAL` value. | [interval_functions.md](./interval_functions.md#justify_interval) |
| `KEYS.ADD_KEY_FROM_RAW_BYTES` | Adds a key to a keyset, and return the new keyset as a serialized `BYTES` value. | [aead_encryption_functions.md](./aead_encryption_functions.md#keysadd_key_from_raw_bytes) |
| `KEYS.KEYSET_CHAIN` | Produces a Tink keyset that's encrypted with a Cloud KMS key. | [aead_encryption_functions.md](./aead_encryption_functions.md#keyskeyset_chain) |
| `KEYS.KEYSET_FROM_JSON` | Converts a `STRING` JSON keyset to a serialized `BYTES` value. | [aead_encryption_functions.md](./aead_encryption_functions.md#keyskeyset_from_json) |
| `KEYS.KEYSET_LENGTH` | Gets the number of keys in the provided keyset. | [aead_encryption_functions.md](./aead_encryption_functions.md#keyskeyset_length) |
| `KEYS.KEYSET_TO_JSON` | Gets a JSON `STRING` representation of a keyset. | [aead_encryption_functions.md](./aead_encryption_functions.md#keyskeyset_to_json) |
| `KEYS.NEW_KEYSET` | Gets a serialized keyset containing a new key based on the key type. | [aead_encryption_functions.md](./aead_encryption_functions.md#keysnew_keyset) |
| `KEYS.NEW_WRAPPED_KEYSET` | Creates a new keyset and encrypts it with a Cloud KMS key. | [aead_encryption_functions.md](./aead_encryption_functions.md#keysnew_wrapped_keyset) |
| `KEYS.REWRAP_KEYSET` | Re-encrypts a wrapped keyset with a new Cloud KMS key. | [aead_encryption_functions.md](./aead_encryption_functions.md#keysrewrap_keyset) |
| `KEYS.ROTATE_KEYSET` | Adds a new primary cryptographic key to a keyset, based on the key type. | [aead_encryption_functions.md](./aead_encryption_functions.md#keysrotate_keyset) |
| `KEYS.ROTATE_WRAPPED_KEYSET` | Rewraps a keyset and rotates it. | [aead_encryption_functions.md](./aead_encryption_functions.md#keysrotate_wrapped_keyset) |
| `KLL_QUANTILES.EXTRACT_INT64` | Gets a selected number of quantiles from an `INT64`-initialized KLL sketch. | [kll_functions.md](./kll_functions.md#kll_quantilesextract_int64) |
| `KLL_QUANTILES.EXTRACT_FLOAT64` | Gets a selected number of quantiles from a `FLOAT64`-initialized KLL sketch. | [kll_functions.md](./kll_functions.md#kll_quantilesextract_float64) |
| `KLL_QUANTILES.EXTRACT_POINT_INT64` | Gets a specific quantile from an `INT64`-initialized KLL sketch. | [kll_functions.md](./kll_functions.md#kll_quantilesextract_point_int64) |
| `KLL_QUANTILES.EXTRACT_POINT_FLOAT64` | Gets a specific quantile from a `FLOAT64`-initialized KLL sketch. | [kll_functions.md](./kll_functions.md#kll_quantilesextract_point_float64) |
| `KLL_QUANTILES.INIT_INT64` | Aggregates values into an `INT64`-initialized KLL sketch. | [kll_functions.md](./kll_functions.md#kll_quantilesinit_int64) |
| `KLL_QUANTILES.INIT_FLOAT64` | Aggregates values into a `FLOAT64`-initialized KLL sketch. | [kll_functions.md](./kll_functions.md#kll_quantilesinit_float64) |
| `KLL_QUANTILES.MERGE_INT64` | Merges `INT64`-initialized KLL sketches into a new sketch, and then gets the quantiles from the new sketch. | [kll_functions.md](./kll_functions.md#kll_quantilesmerge_int64) |
| `KLL_QUANTILES.MERGE_FLOAT64` | Merges `FLOAT64`-initialized KLL sketches into a new sketch, and then gets the quantiles from the new sketch. | [kll_functions.md](./kll_functions.md#kll_quantilesmerge_float64) |
| `KLL_QUANTILES.MERGE_PARTIAL` | Merges KLL sketches of the same underlying type into a new sketch. | [kll_functions.md](./kll_functions.md#kll_quantilesmerge_partial) |
| `KLL_QUANTILES.MERGE_POINT_INT64` | Merges `INT64`-initialized KLL sketches into a new sketch, and then gets a specific quantile from the new sketch. | [kll_functions.md](./kll_functions.md#kll_quantilesmerge_point_int64) |
| `KLL_QUANTILES.MERGE_POINT_FLOAT64` | Merges `FLOAT64`-initialized KLL sketches into a new sketch, and then gets a specific quantile from the new sketch. | [kll_functions.md](./kll_functions.md#kll_quantilesmerge_point_float64) |
| `LABELS` | Gets the labels associated with a graph element. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-functions#labels) |
| `LAG` | Gets a value for a preceding row. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions#lag) |
| `LAST_DAY` | Gets the last day in a specified time period that contains a `DATE` value. | [date_functions.md](./date_functions.md#last_day) |
| `LAST_DAY` | Gets the last day in a specified time period that contains a `DATETIME` value. | [datetime_functions.md](./datetime_functions.md#last_day) |
| `LAST_VALUE` | Gets a value for the last row in the current window frame. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions#last_value) |
| `LAX_BOOL` | Attempts to convert a JSON value to a SQL `BOOL` value. | [json_functions-2.md](./json_functions-2.md#lax_bool) |
| `LAX_FLOAT64` | Attempts to convert a JSON value to a SQL `FLOAT64` value. | [json_functions-2.md](./json_functions-2.md#lax_float64) |
| `LAX_INT64` | Attempts to convert a JSON value to a SQL `INT64` value. | [json_functions-2.md](./json_functions-2.md#lax_int64) |
| `LAX_STRING` | Attempts to convert a JSON value to a SQL `STRING` value. | [json_functions-2.md](./json_functions-2.md#lax_string) |
| `LEAD` | Gets a value for a subsequent row. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions#lead) |
| `LEAST` | Gets the least value among `X1,...,XN`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#least) |
| `LEFT` | Gets the specified leftmost portion from a `STRING` or `BYTES` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#left) |
| `LENGTH` | Gets the length of a `STRING` or `BYTES` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#length) |
| `LN` | Computes the natural logarithm of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#ln) |
| `LOG` | Computes the natural logarithm of `X` or the logarithm of `X` to base `Y`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#log) |
| `LOG10` | Computes the natural logarithm of `X` to base 10. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#log10) |
| `LOGICAL_AND` | Gets the logical AND of all non-`NULL` expressions. | [aggregate_functions.md](./aggregate_functions.md#logical_and) |
| `LOGICAL_OR` | Gets the logical OR of all non-`NULL` expressions. | [aggregate_functions.md](./aggregate_functions.md#logical_or) |
| `LOWER` | Formats alphabetic characters in a `STRING` value as lowercase. <br /> Formats ASCII characters in a `BYTES` value as lowercase. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#lower) |
| `LPAD` | Prepends a `STRING` or `BYTES` value with a pattern. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#lpad) |
| `LTRIM` | Identical to the `TRIM` function, but only removes leading characters. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#ltrim) |
| `MAKE_INTERVAL` | Constructs an `INTERVAL` value. | [interval_functions.md](./interval_functions.md#make_interval) |
| `MAX` | Gets the maximum non-`NULL` value. | [aggregate_functions.md](./aggregate_functions.md#max) |
| `MAX_BY` | Synonym for `ANY_VALUE(x HAVING MAX y)`. | [aggregate_functions.md](./aggregate_functions.md#max_by) |
| `MD5` | Computes the hash of a `STRING` or `BYTES` value using the MD5 algorithm. | [hash_functions.md](./hash_functions.md#md5) |
| `MIN` | Gets the minimum non-`NULL` value. | [aggregate_functions.md](./aggregate_functions.md#min) |
| `MIN_BY` | Synonym for `ANY_VALUE(x HAVING MIN y)`. | [aggregate_functions.md](./aggregate_functions.md#min_by) |
| `MOD` | Gets the remainder of the division of `X` by `Y`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#mod) |
| `NET.HOST` | Gets the hostname from a URL. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#nethost) |
| `NET.IP_FROM_STRING` | Converts an IPv4 or IPv6 address from a `STRING` value to a `BYTES` value in network byte order. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#netip_from_string) |
| `NET.IP_NET_MASK` | Gets a network mask. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#netip_net_mask) |
| `NET.IP_TO_STRING` | Converts an IPv4 or IPv6 address from a `BYTES` value in network byte order to a `STRING` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#netip_to_string) |
| `NET.IP_TRUNC` | Converts a `BYTES` IPv4 or IPv6 address in network byte order to a `BYTES` subnet address. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#netip_trunc) |
| `NET.IPV4_FROM_INT64` | Converts an IPv4 address from an `INT64` value to a `BYTES` value in network byte order. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#netipv4_from_int64) |
| `NET.IPV4_TO_INT64` | Converts an IPv4 address from a `BYTES` value in network byte order to an `INT64` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#netipv4_to_int64) |
| `NET.PUBLIC_SUFFIX` | Gets the public suffix from a URL. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#netpublic_suffix) |
| `NET.REG_DOMAIN` | Gets the registered or registrable domain from a URL. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#netreg_domain) |
| `NET.SAFE_IP_FROM_STRING` | Similar to the `NET.IP_FROM_STRING`, but returns `NULL` instead of producing an error if the input is invalid. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/net_functions#netsafe_ip_from_string) |
| `NODES` | Gets the nodes in a graph path. The resulting array retains the original order in the graph path. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-functions#nodes) |
| `NORMALIZE` | Case-sensitively normalizes the characters in a `STRING` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#normalize) |
| `NORMALIZE_AND_CASEFOLD` | Case-insensitively normalizes the characters in a `STRING` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#normalize_and_casefold) |
| `NTH_VALUE` | Gets a value for the Nth row of the current window frame. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions#nth_value) |
| `NTILE` | Gets the quantile bucket number (1-based) of each row within a window. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/numbering_functions#ntile) |
| `OBJ.FETCH_METADATA` | Fetches Cloud Storage metadata for a partially populated `ObjectRef` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objfetch_metadata) |
| `OBJ.GET_ACCESS_URL` | Returns access URLs for a Cloud Storage object. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objget_access_url) |
| `OBJ.GET_READ_URL` | Returns a read URL and status for a Cloud Storage object. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objget_read_url) |
| `OBJ.LIST` | Returns a table of metadata and `ObjectRef` values for files stored in Cloud Storage. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objlist) |
| `OBJ.MAKE_REF` | Creates an `ObjectRef` value that contains reference information for a Cloud Storage object. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objmake_ref) |
| `OCTET_LENGTH` | Alias for `BYTE_LENGTH`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#octet_length) |
| `PARSE_BIGNUMERIC` | Converts a `STRING` value to a `BIGNUMERIC` value. | [conversion_functions.md](./conversion_functions.md#parse_bignumeric) |
| `PARSE_DATE` | Converts a `STRING` value to a `DATE` value. | [date_functions.md](./date_functions.md#parse_date) |
| `PARSE_DATETIME` | Converts a `STRING` value to a `DATETIME` value. | [datetime_functions.md](./datetime_functions.md#parse_datetime) |
| `PARSE_JSON` | Converts a JSON-formatted `STRING` value to a `JSON` value. | [json_functions-2.md](./json_functions-2.md#parse_json) |
| `PARSE_NUMERIC` | Converts a `STRING` value to a `NUMERIC` value. | [conversion_functions.md](./conversion_functions.md#parse_numeric) |
| `PARSE_TIME` | Converts a `STRING` value to a `TIME` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#parse_time) |
| `PARSE_TIMESTAMP` | Converts a `STRING` value to a `TIMESTAMP` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#parse_timestamp) |
| `PATH_FIRST` | Gets the first node in a graph path. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-functions#path_first) |
| `PATH_LAST` | Gets the last node in a graph path. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-functions#path_last) |
| `PATH_LENGTH` | Gets the number of edges in a graph path. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-functions#path_length) |
| `PERCENT_RANK` | Gets the percentile rank (from 0 to 1) of each row within a window. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/numbering_functions#percent_rank) |
| `PERCENTILE_CONT` | Computes the specified percentile for a value, using linear interpolation. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions#percentile_cont) |
| `PERCENTILE_DISC` | Computes the specified percentile for a discrete value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions#percentile_disc) |
| `POW` | Produces the value of `X` raised to the power of `Y`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#pow) |
| `POWER` | Synonym of `POW`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#power) |
| `RAND` | Generates a pseudo-random value of type `FLOAT64` in the range of `[0, 1)`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#rand) |
| `RANGE` | Constructs a range of `DATE`, `DATETIME`, or `TIMESTAMP` values. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/range-functions#range) |
| `RANGE_BUCKET` | Scans through a sorted array and returns the 0-based position of a point's upper bound. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#range_bucket) |
| `RANGE_CONTAINS` | Signature 1: Checks if one range is in another range. <br /> Signature 2: Checks if a value is in a range. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/range-functions#range_contains) |
| `RANGE_END` | Gets the upper bound of a range. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/range-functions#range_end) |
| `RANGE_INTERSECT` | Gets a segment of two ranges that intersect. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/range-functions#range_intersect) |
| `RANGE_OVERLAPS` | Checks if two ranges overlap. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/range-functions#range_overlaps) |
| `RANGE_SESSIONIZE` | Produces a table of sessionized ranges. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/range-functions#range_sessionize) |
| `RANGE_START` | Gets the lower bound of a range. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/range-functions#range_start) |
| `RANK` | Gets the rank (1-based) of each row within a window. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/numbering_functions#rank) |
| `REGEXP_CONTAINS` | Checks if a value is a partial match for a regular expression. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#regexp_contains) |
| `REGEXP_EXTRACT` | Produces a substring that matches a regular expression. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#regexp_extract) |
| `REGEXP_EXTRACT_GROUPS` | Produces substrings that match multiple capturing groups in a regular expression. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#regexp_extract_groups) |
| `REGEXP_EXTRACT_ALL` | Produces an array of all substrings that match a regular expression. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#regexp_extract_all) |
| `REGEXP_INSTR` | Finds the position of a regular expression match in a value, optionally starting the search at a given offset or occurrence. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#regexp_instr) |
| `REGEXP_REPLACE` | Produces a `STRING` value where all substrings that match a regular expression are replaced with a specified value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#regexp_replace) |
| `REGEXP_SUBSTR` | Synonym for `REGEXP_EXTRACT`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#regexp_substr) |
| `REPEAT` | Produces a `STRING` or `BYTES` value that consists of an original value, repeated. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#repeat) |
| `REPLACE` | Replaces all occurrences of a pattern with another pattern in a `STRING` or `BYTES` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#replace) |
| `REVERSE` | Reverses a `STRING` or `BYTES` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#reverse) |
| `RIGHT` | Gets the specified rightmost portion from a `STRING` or `BYTES` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#right) |
| `ROUND` | Rounds `X` to the nearest integer or rounds `X` to `N` decimal places after the decimal point. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#round) |
| `ROW_NUMBER` | Gets the sequential row number (1-based) of each row within a window. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/numbering_functions#row_number) |
| `RPAD` | Appends a `STRING` or `BYTES` value with a pattern. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#rpad) |
| `RTRIM` | Identical to the `TRIM` function, but only removes trailing characters. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#rtrim) |
| `S2_CELLIDFROMPOINT` | Gets the S2 cell ID covering a point `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#s2_cellidfrompoint) |
| `S2_COVERINGCELLIDS` | Gets an array of S2 cell IDs that cover a `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#s2_coveringcellids) |
| `SAFE_ADD` | Equivalent to the addition operator (`X + Y`), but returns `NULL` if overflow occurs. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#safe_add) |
| `SAFE_CAST` | Similar to the `CAST` function, but returns `NULL` when a runtime error is produced. | [conversion_functions.md](./conversion_functions.md#safe_cast) |
| `SAFE_CONVERT_BYTES_TO_STRING` | Converts a `BYTES` value to a `STRING` value and replace any invalid UTF-8 characters with the Unicode replacement character, `U+FFFD`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#safe_convert_bytes_to_string) |
| `SAFE_DIVIDE` | Equivalent to the division operator (`X / Y`), but returns `NULL` if an error occurs. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#safe_divide) |
| `SAFE_MULTIPLY` | Equivalent to the multiplication operator (`X * Y`), but returns `NULL` if overflow occurs. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#safe_multiply) |
| `SAFE_NEGATE` | Equivalent to the unary minus operator (`-X`), but returns `NULL` if overflow occurs. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#safe_negate) |
| `SAFE_SUBTRACT` | Equivalent to the subtraction operator (`X - Y`), but returns `NULL` if overflow occurs. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#safe_subtract) |
| `SEARCH` | Checks to see whether a table or other search data contains a set of search terms. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#search) |
| `SEC` | Computes the secant of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#sec) |
| `SECH` | Computes the hyperbolic secant of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#sech) |
| `SECURE_CONTEXT` | Returns the value of a request-scoped secure context parameter provided at query run time. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/security_functions#secure_context) |
| `SESSION_USER` | Get the email address or principal identifier of the user that's running the query. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/security_functions#session_user) |
| `SHA1` | Computes the hash of a `STRING` or `BYTES` value using the SHA-1 algorithm. | [hash_functions.md](./hash_functions.md#sha1) |
| `SHA256` | Computes the hash of a `STRING` or `BYTES` value using the SHA-256 algorithm. | [hash_functions.md](./hash_functions.md#sha256) |
| `SHA512` | Computes the hash of a `STRING` or `BYTES` value using the SHA-512 algorithm. | [hash_functions.md](./hash_functions.md#sha512) |
| `SIGN` | Produces -1 , 0, or +1 for negative, zero, and positive arguments respectively. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#sign) |
| `SIN` | Computes the sine of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#sin) |
| `SINH` | Computes the hyperbolic sine of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#sinh) |
| `SOURCE_NODE_ID` | Gets a unique identifier of a graph edge's source node. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-functions#source_node_id) |
| `SOUNDEX` | Gets the Soundex codes for words in a `STRING` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#soundex) |
| `SPLIT` | Splits a `STRING` or `BYTES` value, using a delimiter. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#split) |
| `SQRT` | Computes the square root of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#sqrt) |
| `ST_ANGLE` | Takes three point `GEOGRAPHY` values, which represent two intersecting lines, and returns the angle between these lines. | [geography_functions-1.md](./geography_functions-1.md#st_angle) |
| `ST_AREA` | Gets the area covered by the polygons in a `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_area) |
| `ST_ASBINARY` | Converts a `GEOGRAPHY` value to a `BYTES` WKB geography value. | [geography_functions-1.md](./geography_functions-1.md#st_asbinary) |
| `ST_ASGEOJSON` | Converts a `GEOGRAPHY` value to a `STRING` GeoJSON geography value. | [geography_functions-1.md](./geography_functions-1.md#st_asgeojson) |
| `ST_ASTEXT` | Converts a `GEOGRAPHY` value to a `STRING` WKT geography value. | [geography_functions-1.md](./geography_functions-1.md#st_astext) |
| `ST_AZIMUTH` | Gets the azimuth of a line segment formed by two point `GEOGRAPHY` values. | [geography_functions-1.md](./geography_functions-1.md#st_azimuth) |
| `ST_BOUNDARY` | Gets the union of component boundaries in a `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_boundary) |
| `ST_BOUNDINGBOX` | Gets the bounding box for a `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_boundingbox) |
| `ST_BUFFER` | Gets the buffer around a `GEOGRAPHY` value, using a specific number of segments. | [geography_functions-1.md](./geography_functions-1.md#st_buffer) |
| `ST_BUFFERWITHTOLERANCE` | Gets the buffer around a `GEOGRAPHY` value, using tolerance. | [geography_functions-1.md](./geography_functions-1.md#st_bufferwithtolerance) |
| `ST_CENTROID` | Gets the centroid of a `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_centroid) |
| `ST_CENTROID_AGG` | Gets the centroid of a set of `GEOGRAPHY` values. | [geography_functions-1.md](./geography_functions-1.md#st_centroid_agg) |
| `ST_CLOSESTPOINT` | Gets the point on a `GEOGRAPHY` value which is closest to any point in a second `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_closestpoint) |
| `ST_CLUSTERDBSCAN` | Performs DBSCAN clustering on a group of `GEOGRAPHY` values and produces a 0-based cluster number for this row. | [geography_functions-1.md](./geography_functions-1.md#st_clusterdbscan) |
| `ST_CONTAINS` | Checks if one `GEOGRAPHY` value contains another `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_contains) |
| `ST_CONVEXHULL` | Returns the convex hull for a `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_convexhull) |
| `ST_COVEREDBY` | Checks if all points of a `GEOGRAPHY` value are on the boundary or interior of another `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_coveredby) |
| `ST_COVERS` | Checks if all points of a `GEOGRAPHY` value are on the boundary or interior of another `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_covers) |
| `ST_DIFFERENCE` | Gets the point set difference between two `GEOGRAPHY` values. | [geography_functions-1.md](./geography_functions-1.md#st_difference) |
| `ST_DIMENSION` | Gets the dimension of the highest-dimensional element in a `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_dimension) |
| `ST_DISJOINT` | Checks if two `GEOGRAPHY` values are disjoint (don't intersect). | [geography_functions-1.md](./geography_functions-1.md#st_disjoint) |
| `ST_DISTANCE` | Gets the shortest distance in meters between two `GEOGRAPHY` values. | [geography_functions-1.md](./geography_functions-1.md#st_distance) |
| `ST_DUMP` | Returns an array of simple `GEOGRAPHY` components in a `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_dump) |
| `ST_DWITHIN` | Checks if any points in two `GEOGRAPHY` values are within a given distance. | [geography_functions-1.md](./geography_functions-1.md#st_dwithin) |
| `ST_ENDPOINT` | Gets the last point of a linestring `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_endpoint) |
| `ST_EQUALS` | Checks if two `GEOGRAPHY` values represent the same `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_equals) |
| `ST_EXTENT` | Gets the bounding box for a group of `GEOGRAPHY` values. | [geography_functions-1.md](./geography_functions-1.md#st_extent) |
| `ST_EXTERIORRING` | Returns a linestring `GEOGRAPHY` value that corresponds to the outermost ring of a polygon `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_exteriorring) |
| `ST_GEOGFROM` | Converts a `STRING` or `BYTES` value into a `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_geogfrom) |
| `ST_GEOGFROMGEOJSON` | Converts a `STRING` GeoJSON geometry value into a `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_geogfromgeojson) |
| `ST_GEOGFROMTEXT` | Converts a `STRING` WKT geometry value into a `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_geogfromtext) |
| `ST_GEOGFROMWKB` | Converts a `BYTES` or hexadecimal-text `STRING` WKT geometry value into a `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_geogfromwkb) |
| `ST_GEOGPOINT` | Creates a point `GEOGRAPHY` value for a given longitude and latitude. | [geography_functions-1.md](./geography_functions-1.md#st_geogpoint) |
| `ST_GEOGPOINTFROMGEOHASH` | Gets a point `GEOGRAPHY` value that's in the middle of a bounding box defined in a `STRING` GeoHash value. | [geography_functions-1.md](./geography_functions-1.md#st_geogpointfromgeohash) |
| `ST_GEOHASH` | Converts a point `GEOGRAPHY` value to a `STRING` GeoHash value. | [geography_functions-1.md](./geography_functions-1.md#st_geohash) |
| `ST_GEOMETRYTYPE` | Gets the Open Geospatial Consortium (OGC) geometry type for a `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_geometrytype) |
| `ST_HAUSDORFFDISTANCE` | Gets the discrete Hausdorff distance between two geometries. | [geography_functions-1.md](./geography_functions-1.md#st_hausdorffdistance) |
| `ST_HAUSDORFFDWITHIN` | Checks if the Hausdorff distance between two `GEOGRAPHY` values is within a given distance. | [geography_functions-1.md](./geography_functions-1.md#st_hausdorffdwithin) |
| `ST_INTERIORRINGS` | Gets the interior rings of a polygon `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_interiorrings) |
| `ST_INTERSECTION` | Gets the point set intersection of two `GEOGRAPHY` values. | [geography_functions-1.md](./geography_functions-1.md#st_intersection) |
| `ST_INTERSECTS` | Checks if at least one point appears in two `GEOGRAPHY` values. | [geography_functions-1.md](./geography_functions-1.md#st_intersects) |
| `ST_INTERSECTSBOX` | Checks if a `GEOGRAPHY` value intersects a rectangle. | [geography_functions-1.md](./geography_functions-1.md#st_intersectsbox) |
| `ST_ISCLOSED` | Checks if all components in a `GEOGRAPHY` value are closed. | [geography_functions-1.md](./geography_functions-1.md#st_isclosed) |
| `ST_ISCOLLECTION` | Checks if the total number of points, linestrings, and polygons is greater than one in a `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_iscollection) |
| `ST_ISEMPTY` | Checks if a `GEOGRAPHY` value is empty. | [geography_functions-1.md](./geography_functions-1.md#st_isempty) |
| `ST_ISRING` | Checks if a `GEOGRAPHY` value is a closed, simple linestring. | [geography_functions-1.md](./geography_functions-1.md#st_isring) |
| `ST_LENGTH` | Gets the total length of lines in a `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_length) |
| `ST_LINEINTERPOLATEPOINT` | Gets a point at a specific fraction in a linestring `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_lineinterpolatepoint) |
| `ST_LINELOCATEPOINT` | Gets a section of a linestring `GEOGRAPHY` value between the start point and a point `GEOGRAPHY` value. | [geography_functions-1.md](./geography_functions-1.md#st_linelocatepoint) |
| `ST_LINESUBSTRING` | Gets a segment of a single linestring at a specific starting and ending fraction. | [geography_functions-1.md](./geography_functions-1.md#st_linesubstring) |
| `ST_MAKELINE` | Creates a linestring `GEOGRAPHY` value by concatenating the point and linestring vertices of `GEOGRAPHY` values. | [geography_functions-1.md](./geography_functions-1.md#st_makeline) |
| `ST_MAKEPOLYGON` | Constructs a polygon `GEOGRAPHY` value by combining a polygon shell with polygon holes. | [geography_functions-1.md](./geography_functions-1.md#st_makepolygon) |
| `ST_MAKEPOLYGONORIENTED` | Constructs a polygon `GEOGRAPHY` value, using an array of linestring `GEOGRAPHY` values. The vertex ordering of each linestring determines the orientation of each polygon ring. | [geography_functions-2.md](./geography_functions-2.md#st_makepolygonoriented) |
| `ST_MAXDISTANCE` | Gets the longest distance between two non-empty `GEOGRAPHY` values. | [geography_functions-2.md](./geography_functions-2.md#st_maxdistance) |
| `ST_NPOINTS` | An alias of `ST_NUMPOINTS`. | [geography_functions-2.md](./geography_functions-2.md#st_npoints) |
| `ST_NUMGEOMETRIES` | Gets the number of geometries in a `GEOGRAPHY` value. | [geography_functions-2.md](./geography_functions-2.md#st_numgeometries) |
| `ST_NUMPOINTS` | Gets the number of vertices in the a `GEOGRAPHY` value. | [geography_functions-2.md](./geography_functions-2.md#st_numpoints) |
| `ST_PERIMETER` | Gets the length of the boundary of the polygons in a `GEOGRAPHY` value. | [geography_functions-2.md](./geography_functions-2.md#st_perimeter) |
| `ST_POINTN` | Gets the point at a specific index of a linestring `GEOGRAPHY` value. | [geography_functions-2.md](./geography_functions-2.md#st_pointn) |
| `ST_REGIONSTATS` | Computes statistics describing the pixels in a geospatial raster image that intersect a `GEOGRAPHY` value. | [geography_functions-2.md](./geography_functions-2.md#st_regionstats) |
| `ST_SIMPLIFY` | Converts a `GEOGRAPHY` value into a simplified `GEOGRAPHY` value, using tolerance. | [geography_functions-2.md](./geography_functions-2.md#st_simplify) |
| `ST_SNAPTOGRID` | Produces a `GEOGRAPHY` value, where each vertex has been snapped to a longitude/latitude grid. | [geography_functions-2.md](./geography_functions-2.md#st_snaptogrid) |
| `ST_STARTPOINT` | Gets the first point of a linestring `GEOGRAPHY` value. | [geography_functions-2.md](./geography_functions-2.md#st_startpoint) |
| `ST_TOUCHES` | Checks if two `GEOGRAPHY` values intersect and their interiors have no elements in common. | [geography_functions-2.md](./geography_functions-2.md#st_touches) |
| `ST_UNION` | Gets the point set union of multiple `GEOGRAPHY` values. | [geography_functions-2.md](./geography_functions-2.md#st_union) |
| `ST_UNION_AGG` | Aggregates over `GEOGRAPHY` values and gets their point set union. | [geography_functions-2.md](./geography_functions-2.md#st_union_agg) |
| `ST_WITHIN` | Checks if one `GEOGRAPHY` value contains another `GEOGRAPHY` value. | [geography_functions-2.md](./geography_functions-2.md#st_within) |
| `ST_X` | Gets the longitude from a point `GEOGRAPHY` value. | [geography_functions-2.md](./geography_functions-2.md#st_x) |
| `ST_Y` | Gets the latitude from a point `GEOGRAPHY` value. | [geography_functions-2.md](./geography_functions-2.md#st_y) |
| `STARTS_WITH` | Checks if a `STRING` or `BYTES` value is a prefix of another value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#starts_with) |
| `STDDEV` | An alias of the `STDDEV_SAMP` function. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#stddev) |
| `STDDEV_POP` | Computes the population (biased) standard deviation of the values. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#stddev_pop) |
| `STDDEV_SAMP` | Computes the sample (unbiased) standard deviation of the values. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#stddev_samp) |
| `STRING_AGG` | Concatenates non-`NULL` `STRING` or `BYTES` values. | [aggregate_functions.md](./aggregate_functions.md#string_agg) |
| `STRPOS` | Finds the position of the first occurrence of a subvalue inside another value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#strpos) |
| `SUBSTR` | Gets a portion of a `STRING` or `BYTES` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#substr) |
| `SUBSTRING` | Alias for `SUBSTR` | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#substring) |
| `SUM` | Gets the sum of non-`NULL` values. | [aggregate_functions.md](./aggregate_functions.md#sum) |
| `TAN` | Computes the tangent of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#tan) |
| `TANH` | Computes the hyperbolic tangent of `X`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#tanh) |
| `TEXT_ANALYZE` | Extracts terms (tokens) from text and converts them into a tokenized document. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis-functions#text_analyze) |
| `TF_IDF` | Evaluates how relevant a term (token) is to a tokenized document in a set of tokenized documents. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis-functions#tf_idf) |
| `TIME` | Constructs a `TIME` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#time) |
| `TIME_ADD` | Adds a specified time interval to a `TIME` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#time_add) |
| `TIME_DIFF` | Gets the number of unit boundaries between two `TIME` values at a particular time granularity. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#time_diff) |
| `TIME_SUB` | Subtracts a specified time interval from a `TIME` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#time_sub) |
| `TIME_TRUNC` | Truncates a `TIME` value at a particular granularity. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time_functions#time_trunc) |
| `TIMESTAMP` | Constructs a `TIMESTAMP` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp) |
| `TIMESTAMP_ADD` | Adds a specified time interval to a `TIMESTAMP` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_add) |
| `TIMESTAMP_BUCKET` | Gets the lower bound of the timestamp bucket that contains a timestamp. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time-series-functions#timestamp_bucket) |
| `TIMESTAMP_DIFF` | Gets the number of unit boundaries between two `TIMESTAMP` values at a particular time granularity. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_diff) |
| `TIMESTAMP_MICROS` | Converts the number of microseconds since 1970-01-01 00:00:00 UTC to a `TIMESTAMP`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_micros) |
| `TIMESTAMP_MILLIS` | Converts the number of milliseconds since 1970-01-01 00:00:00 UTC to a `TIMESTAMP`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_millis) |
| `TIMESTAMP_SECONDS` | Converts the number of seconds since 1970-01-01 00:00:00 UTC to a `TIMESTAMP`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_seconds) |
| `TIMESTAMP_SUB` | Subtracts a specified time interval from a `TIMESTAMP` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_sub) |
| `TIMESTAMP_TRUNC` | Truncates a `TIMESTAMP` or `DATETIME` value at a particular granularity. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_trunc) |
| `TO_BASE32` | Converts a `BYTES` value to a base32-encoded `STRING` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#to_base32) |
| `TO_BASE64` | Converts a `BYTES` value to a base64-encoded `STRING` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#to_base64) |
| `TO_CODE_POINTS` | Converts a `STRING` or `BYTES` value into an array of extended ASCII code points. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#to_code_points) |
| `TO_HEX` | Converts a `BYTES` value to a hexadecimal `STRING` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#to_hex) |
| `TO_JSON` | Converts a SQL value to a JSON value. | [json_functions-2.md](./json_functions-2.md#to_json) |
| `TO_JSON_STRING` | Converts a SQL value to a JSON-formatted `STRING` value. | [json_functions-2.md](./json_functions-2.md#to_json_string) |
| `TRANSLATE` | Within a value, replaces each source character with the corresponding target character. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#translate) |
| `TRIM` | Removes the specified leading and trailing Unicode code points or bytes from a `STRING` or `BYTES` value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#trim) |
| `TRUNC` | Rounds a number like `ROUND(X)` or `ROUND(X, N)`, but always rounds towards zero and never overflows. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#trunc) |
| `TYPEOF` | Gets the name of the data type for an expression. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/utility-functions#typeof) |
| `UNICODE` | Gets the Unicode code point for the first character in a value. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#unicode) |
| `UNIX_DATE` | Converts a `DATE` value to the number of days since 1970-01-01. | [date_functions.md](./date_functions.md#unix_date) |
| `UNIX_MICROS` | Converts a `TIMESTAMP` value to the number of microseconds since 1970-01-01 00:00:00 UTC. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#unix_micros) |
| `UNIX_MILLIS` | Converts a `TIMESTAMP` value to the number of milliseconds since 1970-01-01 00:00:00 UTC. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#unix_millis) |
| `UNIX_SECONDS` | Converts a `TIMESTAMP` value to the number of seconds since 1970-01-01 00:00:00 UTC. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#unix_seconds) |
| `UPPER` | Formats alphabetic characters in a `STRING` value as uppercase. <br /> Formats ASCII characters in a `BYTES` value as uppercase. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#upper) |
| `VAR_POP` | Computes the population (biased) variance of the values. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#var_pop) |
| `VAR_SAMP` | Computes the sample (unbiased) variance of the values. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#var_samp) |
| `VARIANCE` | An alias of `VAR_SAMP`. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#variance) |
| `VECTOR_SEARCH` | Performs a semantic search or a hybrid search on embeddings to find similar entities. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#vector_search) |
| `VECTOR_INDEX.STATISTICS` | Calculate how much an indexed table's data has drifted between when a vector index was trained and the present. | [official](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/vectorindex_functions#vector_indexstatistics) |
| `ZSTD_COMPRESS` | Compresses `STRING` or `BYTES` input into `BYTES` output using the Zstandard (Zstd) lossless data compression algorithm. | [compression-functions.md](./compression-functions.md#zstd_compress) |
| `ZSTD_DECOMPRESS_TO_BYTES` | Decompresses `BYTES` input into `BYTES` output using the Zstandard (Zstd) lossless data compression algorithm. | [compression-functions.md](./compression-functions.md#zstd_decompress_to_bytes) |
| `ZSTD_DECOMPRESS_TO_STRING` | Decompress `BYTES` input into `STRING` output using the Zstandard (Zstd) lossless data compression algorithm. | [compression-functions.md](./compression-functions.md#zstd_decompress_to_string) |
| AEAD encryption functions | Function list, AEAD.DECRYPT_BYTES, AEAD.DECRYPT_STRING, AEAD.ENCRYPT, DETERMINISTIC_DECRYPT_BYTES, DETERMINISTIC_DECRYPT_STRING, DETERMINISTIC_ENCRYPT, KEYS.ADD_KEY_FROM_RAW_BYTES, KEYS.KEYSET_CHAIN, KEYS.KEYSET_FROM_JSON, KEYS.KEYSET_LENGTH, KEYS.KEYSET_TO_JSON, KEYS.NEW_KEYSET, KEYS.NEW_WRAPPED_KEYSET, KEYS.REWRAP_KEYSET, KEYS.ROTATE_KEYSET, KEYS.ROTATE_WRAPPED_KEYSET | [aead_encryption_functions.md](./aead_encryption_functions.md) |
| Differentially private aggregate functions | Function list, AVG (DIFFERENTIAL_PRIVACY), COUNT (DIFFERENTIAL_PRIVACY), PERCENTILE_CONT (DIFFERENTIAL_PRIVACY), SUM (DIFFERENTIAL_PRIVACY), Supplemental materials | [aggregate-dp-functions.md](./aggregate-dp-functions.md) |
| Aggregate function calls | Aggregate function call syntax, Restrict aggregation by a maximum or minimum value, Handle NULL values before aggregation, Aggregate function examples, Multi-level aggregation | [aggregate-function-calls.md](./aggregate-function-calls.md) |
| Aggregate functions | Function list, AGG, ANY_VALUE, ARRAY_AGG, ARRAY_CONCAT_AGG, AVG, BIT_AND, BIT_OR, BIT_XOR, COUNT, COUNTIF, GROUPING, LOGICAL_AND, LOGICAL_OR, MAX, MAX_BY, MIN, MIN_BY, STRING_AGG, SUM | [aggregate_functions.md](./aggregate_functions.md) |
| Approximate aggregate functions | Function list, APPROX_COUNT_DISTINCT, APPROX_QUANTILES, APPROX_TOP_COUNT, APPROX_TOP_SUM | [approximate_aggregate_functions.md](./approximate_aggregate_functions.md) |
| Array functions | Function list, ARRAY, ARRAY_CONCAT, ARRAY_FIRST, ARRAY_LAST, ARRAY_LENGTH, ARRAY_REVERSE, ARRAY_SLICE, ARRAY_TO_STRING, GENERATE_ARRAY, GENERATE_DATE_ARRAY, GENERATE_TIMESTAMP_ARRAY, Supplemental materials | [array_functions.md](./array_functions.md) |
| Bit functions | Function list, BIT_COUNT | [bit_functions.md](./bit_functions.md) |
| Compression functions | Function list, ZSTD_COMPRESS, ZSTD_DECOMPRESS_TO_BYTES, ZSTD_DECOMPRESS_TO_STRING | [compression-functions.md](./compression-functions.md) |
| Conditional expressions | — | [conditional_expressions.md](./conditional_expressions.md) |
| Conversion functions | Function list, CAST, PARSE_BIGNUMERIC, PARSE_NUMERIC, SAFE_CAST | [conversion_functions.md](./conversion_functions.md) |
| Date functions | Function list, CURRENT_DATE, DATE, DATE_ADD, DATE_DIFF, DATE_FROM_UNIX_DATE, DATE_SUB, DATE_TRUNC, EXTRACT, FORMAT_DATE, LAST_DAY, PARSE_DATE, UNIX_DATE | [date_functions.md](./date_functions.md) |
| Datetime functions | Function list, CURRENT_DATETIME, DATETIME, DATETIME_ADD, DATETIME_DIFF, DATETIME_SUB, DATETIME_TRUNC, EXTRACT, FORMAT_DATETIME, LAST_DAY, PARSE_DATETIME | [datetime_functions.md](./datetime_functions.md) |
| Debugging functions | Function list, ERROR | [debugging_functions.md](./debugging_functions.md) |
| DLP encryption functions | Function list, DLP_DETERMINISTIC_ENCRYPT, DLP_DETERMINISTIC_DECRYPT, DLP_KEY_CHAIN | [dlp_functions.md](./dlp_functions.md) |
| Federated query functions | Function list, EXTERNAL_QUERY | [federated_query_functions.md](./federated_query_functions.md) |
| Function calls | Function call rules, Named arguments, Chained function calls, SAFE. prefix, Calling persistent user-defined functions (UDFs) | [functions-reference.md](./functions-reference.md) |
| Geography functions (part 1 of 2) | Categories, Function list, S2_CELLIDFROMPOINT, S2_COVERINGCELLIDS, ST_ANGLE, ST_AREA, ST_ASBINARY, ST_ASGEOJSON, ST_ASTEXT, ST_AZIMUTH, ST_BOUNDARY, ST_BOUNDINGBOX, ST_BUFFER, ST_BUFFERWITHTOLERANCE, ST_CENTROID, ST_CENTROID_AGG, ST_CLOSESTPOINT, ST_CLUSTERDBSCAN, ST_CONTAINS, ST_CONVEXHULL, ST_COVEREDBY, ST_COVERS, ST_DIFFERENCE, ST_DIMENSION, ST_DISJOINT, ST_DISTANCE, ST_DUMP, ST_DWITHIN, ST_ENDPOINT, ST_EQUALS, ST_EXTENT, ST_EXTERIORRING, ST_GEOGFROM, ST_GEOGFROMGEOJSON, ST_GEOGFROMTEXT, ST_GEOGFROMWKB, ST_GEOGPOINT, ST_GEOGPOINTFROMGEOHASH, ST_GEOHASH, ST_GEOMETRYTYPE, ... | [geography_functions-1.md](./geography_functions-1.md) |
| Geography functions (part 2 of 2) | ST_MAKEPOLYGONORIENTED, ST_MAXDISTANCE, ST_NPOINTS, ST_NUMGEOMETRIES, ST_NUMPOINTS, ST_PERIMETER, ST_POINTN, ST_REGIONSTATS, ST_SIMPLIFY, ST_SNAPTOGRID, ST_STARTPOINT, ST_TOUCHES, ST_UNION, ST_UNION_AGG, ST_WITHIN, ST_X, ST_Y | [geography_functions-2.md](./geography_functions-2.md) |
| Hash functions | Function list, FARM_FINGERPRINT, MD5, SHA1, SHA256, SHA512 | [hash_functions.md](./hash_functions.md) |
| HyperLogLog++ functions | Function list, HLL_COUNT.EXTRACT, HLL_COUNT.INIT, HLL_COUNT.MERGE, HLL_COUNT.MERGE_PARTIAL | [hll_functions.md](./hll_functions.md) |
| Interval functions | Function list, EXTRACT, JUSTIFY_DAYS, JUSTIFY_HOURS, JUSTIFY_INTERVAL, MAKE_INTERVAL | [interval_functions.md](./interval_functions.md) |
| JSON functions (part 1 of 2) | Categories, Function list, BOOL, FLOAT64, INT64, JSON_ARRAY, JSON_ARRAY_APPEND, JSON_ARRAY_INSERT, JSON_EXTRACT, JSON_EXTRACT_ARRAY, JSON_EXTRACT_SCALAR, JSON_EXTRACT_STRING_ARRAY, JSON_FLATTEN, JSON_KEYS, JSON_OBJECT, JSON_QUERY | [json_functions-1.md](./json_functions-1.md) |
| JSON functions (part 2 of 2) | JSON_QUERY_ARRAY, JSON_REMOVE, JSON_SET, JSON_STRIP_NULLS, JSON_TYPE, JSON_VALUE, JSON_VALUE_ARRAY, LAX_BOOL, LAX_FLOAT64, LAX_INT64, LAX_STRING, PARSE_JSON, STRING, TO_JSON, TO_JSON_STRING, Supplemental materials | [json_functions-2.md](./json_functions-2.md) |
| KLL quantile functions | Function list, KLL_QUANTILES.EXTRACT_INT64, KLL_QUANTILES.EXTRACT_FLOAT64, KLL_QUANTILES.EXTRACT_POINT_INT64, KLL_QUANTILES.EXTRACT_POINT_FLOAT64, KLL_QUANTILES.INIT_INT64, KLL_QUANTILES.INIT_FLOAT64, KLL_QUANTILES.MERGE_INT64, KLL_QUANTILES.MERGE_FLOAT64, KLL_QUANTILES.MERGE_PARTIAL, KLL_QUANTILES.MERGE_POINT_INT64, KLL_QUANTILES.MERGE_POINT_FLOAT64 | [kll_functions.md](./kll_functions.md) |
