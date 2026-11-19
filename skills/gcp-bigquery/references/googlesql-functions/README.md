# GoogleSQL functions

| Name | Description | Path |
| --- | --- | --- |
| `DESTINATION_NODE_ID` | Gets a unique identifier of a graph edge's destination node. | [sql-functions.md](../graph-gql/sql-functions.md#destination_node_id) |
| `EDGES` | Gets the edges in a graph path. The resulting array retains the original order in the graph path. | [sql-functions.md](../graph-gql/sql-functions.md#edges) |
| `ELEMENT_ID` | Gets a graph element's unique identifier. | [sql-functions.md](../graph-gql/sql-functions.md#element_id) |
| `IS_ACYCLIC` | Checks if a graph path has a repeating node. | [sql-functions.md](../graph-gql/sql-functions.md#is_acyclic) |
| `IS_SIMPLE` | Checks if a graph path is simple. | [sql-functions.md](../graph-gql/sql-functions.md#is_simple) |
| `IS_TRAIL` | Checks if a graph path has a repeating edge. | [sql-functions.md](../graph-gql/sql-functions.md#is_trail) |
| `LABELS` | Gets the labels associated with a graph element. | [sql-functions.md](../graph-gql/sql-functions.md#labels) |
| `NODES` | Gets the nodes in a graph path. The resulting array retains the original order in the graph path. | [sql-functions.md](../graph-gql/sql-functions.md#nodes) |
| `PATH_FIRST` | Gets the first node in a graph path. | [sql-functions.md](../graph-gql/sql-functions.md#path_first) |
| `PATH_LAST` | Gets the last node in a graph path. | [sql-functions.md](../graph-gql/sql-functions.md#path_last) |
| `PATH_LENGTH` | Gets the number of edges in a graph path. | [sql-functions.md](../graph-gql/sql-functions.md#path_length) |
| `SOURCE_NODE_ID` | Gets a unique identifier of a graph edge's source node. | [sql-functions.md](../graph-gql/sql-functions.md#source_node_id) |
| AEAD encryption functions | Function list, AEAD.DECRYPT_BYTES, AEAD.DECRYPT_STRING, AEAD.ENCRYPT, DETERMINISTIC_DECRYPT_BYTES, DETERMINISTIC_DECRYPT_STRING, DETERMINISTIC_ENCRYPT, KEYS.ADD_KEY_FROM_RAW_BYTES, KEYS.KEYSET_CHAIN, KEYS.KEYSET_FROM_JSON, KEYS.KEYSET_LENGTH, KEYS.KEYSET_TO_JSON, KEYS.NEW_KEYSET, KEYS.NEW_WRAPPED_KEYSET, KEYS.REWRAP_KEYSET, KEYS.ROTATE_KEYSET, KEYS.ROTATE_WRAPPED_KEYSET | [aead_encryption_functions.md](./aead_encryption_functions.md) |
| Differentially private aggregate functions | Function list, AVG (DIFFERENTIAL_PRIVACY), COUNT (DIFFERENTIAL_PRIVACY), PERCENTILE_CONT (DIFFERENTIAL_PRIVACY), SUM (DIFFERENTIAL_PRIVACY), Supplemental materials | [aggregate-dp-functions.md](./aggregate-dp-functions.md) |
| Aggregate function calls | Aggregate function call syntax, Restrict aggregation by a maximum or minimum value, Handle NULL values before aggregation, Aggregate function examples, Multi-level aggregation | [aggregate-function-calls.md](./aggregate-function-calls.md) |
| Aggregate functions | Function list, AGG, ANY_VALUE, ARRAY_AGG, ARRAY_CONCAT_AGG, AVG, BIT_AND, BIT_OR, BIT_XOR, COUNT, COUNTIF, GROUPING, LOGICAL_AND, LOGICAL_OR, MAX, MAX_BY, MIN, MIN_BY, STRING_AGG, SUM | [aggregate_functions.md](./aggregate_functions.md) |
| Approximate aggregate functions | Function list, APPROX_COUNT_DISTINCT, APPROX_QUANTILES, APPROX_TOP_COUNT, APPROX_TOP_SUM | [approximate_aggregate_functions.md](./approximate_aggregate_functions.md) |
| Array functions | Function list, ARRAY, ARRAY_CONCAT, ARRAY_FIRST, ARRAY_LAST, ARRAY_LENGTH, ARRAY_REVERSE, ARRAY_SLICE, ARRAY_TO_STRING, GENERATE_ARRAY, GENERATE_DATE_ARRAY, GENERATE_TIMESTAMP_ARRAY, Supplemental materials | [array_functions.md](./array_functions.md) |
| Bit functions | Function list, BIT_COUNT | [bit_functions.md](./bit_functions.md) |
| Compression functions | Function list, ZSTD_COMPRESS, ZSTD_DECOMPRESS_TO_BYTES, ZSTD_DECOMPRESS_TO_STRING | [compression-functions.md](./compression-functions.md) |
| Conditional expressions | — | [conditional_expressions.md](./conditional_expressions.md) |
