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
| Mathematical functions | Categories, Function list, ABS, ACOS, ACOSH, ASIN, ASINH, ATAN, ATAN2, ATANH, CBRT, CEIL, CEILING, COS, COSH, COSINE_DISTANCE, COT, COTH, CSC, CSCH, DIV, EXP, EUCLIDEAN_DISTANCE, FLOOR, GREATEST, IEEE_DIVIDE, IS_INF, IS_NAN, LEAST, LN, LOG, LOG10, MOD, POW, POWER, RAND, RANGE_BUCKET, ROUND, SAFE_ADD, SAFE_DIVIDE, SAFE_MULTIPLY, SAFE_NEGATE, SAFE_SUBTRACT, SEC, SECH, SIGN, SIN, SINH, SQRT, TAN, TANH, TRUNC | [mathematical_functions.md](./mathematical_functions.md) |
| Navigation functions | Function list, FIRST_VALUE, LAG, LAST_VALUE, LEAD, NTH_VALUE, PERCENTILE_CONT, PERCENTILE_DISC | [navigation_functions.md](./navigation_functions.md) |
| Net functions | Function list, NET.HOST, NET.IP_FROM_STRING, NET.IP_NET_MASK, NET.IP_TO_STRING, NET.IP_TRUNC, NET.IPV4_FROM_INT64, NET.IPV4_TO_INT64, NET.PUBLIC_SUFFIX, NET.REG_DOMAIN, NET.SAFE_IP_FROM_STRING | [net_functions.md](./net_functions.md) |
| Numbering functions | Function list, CUME_DIST, DENSE_RANK, NTILE, PERCENT_RANK, RANK, ROW_NUMBER | [numbering_functions.md](./numbering_functions.md) |
| ObjectRef functions | Function list, OBJ.FETCH_METADATA, OBJ.GET_ACCESS_URL, OBJ.GET_READ_URL, OBJ.LIST, OBJ.MAKE_REF | [objectref_functions.md](./objectref_functions.md) |
| Range functions | Function list, GENERATE_RANGE_ARRAY, RANGE, RANGE_CONTAINS, RANGE_END, RANGE_INTERSECT, RANGE_OVERLAPS, RANGE_SESSIONIZE, RANGE_START | [range-functions.md](./range-functions.md) |
| Search functions | Function list, SEARCH, VECTOR_SEARCH | [search_functions.md](./search_functions.md) |
| Security functions | Function list, SECURE_CONTEXT, SESSION_USER | [security_functions.md](./security_functions.md) |
| Statistical aggregate functions | Function list, CORR, COVAR_POP, COVAR_SAMP, STDDEV, STDDEV_POP, STDDEV_SAMP, VAR_POP, VAR_SAMP, VARIANCE | [statistical_aggregate_functions.md](./statistical_aggregate_functions.md) |
