---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/compression-functions
---

# Compression functions

## Signature / Usage

> [!WARNING]
> **Preview**
>
>
> This product or feature is subject to the "Pre-GA Offerings Terms"
> in the General Service Terms section of the
> [Service Specific Terms](https://cloud.google.com/terms/service-terms).
> Pre-GA products and features are available "as is" and might have
> limited support. For more information, see the
> [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

> [!NOTE]
> **Note:** To provide feedback or request support for this feature, send an email to [bigquery-sql-preview-support@googlegroups.com](mailto:bigquery-sql-preview-support@googlegroups.com).

GoogleSQL for BigQuery supports compression functions.

Compression functions compress or decompress bytes or string values using the
Zstandard (Zstd) lossless data compression algorithm.

### Function list

| Name | Summary |
|---|---|
| [`ZSTD_COMPRESS`](#zstd_compress) | Compresses `STRING` or `BYTES` input into `BYTES` output using the [Zstandard (Zstd)](https://en.wikipedia.org/wiki/Zstd) lossless data compression algorithm. |
| [`ZSTD_DECOMPRESS_TO_BYTES`](#zstd_decompress_to_bytes) | Decompresses `BYTES` input into `BYTES` output using the [Zstandard (Zstd)](https://en.wikipedia.org/wiki/Zstd) lossless data compression algorithm. |
| [`ZSTD_DECOMPRESS_TO_STRING`](#zstd_decompress_to_string) | Decompress `BYTES` input into `STRING` output using the [Zstandard (Zstd)](https://en.wikipedia.org/wiki/Zstd) lossless data compression algorithm. |

### `ZSTD_COMPRESS`

```sql
ZSTD_COMPRESS(string_or_bytes_value [, [ level => ] 3])
```

**Description**

Compresses `STRING` or `BYTES` input into
`BYTES` output using the Zstandard (Zstd) lossless
data compression algorithm.

Arguments:

- `string_or_bytes_value`: The SQL value to compress.
- `level`: The Zstd compression level. The default is 3. You can set `level` to an integer value between -5 and 22. A higher value results in a better compression ratio at the cost of slower performance. If `level` is `NULL`, this function returns `NULL`.

**Return type**

`BYTES`: Base64-encoded bytes.

**Example**

```sql
SELECT ZSTD_COMPRESS('string_value') AS result;

/*------------------------------+
 | result                       |
 +------------------------------+
 | KLUv/SAMYQAAc3RyaW5nX3ZhbHVl |
 +------------------------------*/
```

Adapted (not in the official docs): added the missing `AS result` alias so the query matches the `result` column shown.

```sql
SELECT ZSTD_COMPRESS(b'bytes_value', level => 1) AS result;

/*------------------------------+
 | result                       |
 +------------------------------+
 | KLUv/SALWQAAYnl0ZXNfdmFsdWU= |
 +------------------------------*/
```

This function returns `NULL` if the input is `NULL`:

```sql
SELECT ZSTD_COMPRESS(NULL) AS result;

/*------------+
 | result     |
 +------------+
 | NULL       |
 +------------*/
```

### `ZSTD_DECOMPRESS_TO_BYTES`

```sql
ZSTD_DECOMPRESS_TO_BYTES(bytes_value [, size_limit => 128 * 1024 * 1024])
```

**Description**

Decompresses `BYTES` input into `BYTES` using the
Zstandard (Zstd) lossless data compression algorithm.

Arguments:

- `bytes_value`: The bytes to decompress. Must be a valid Zstd frame whose header includes the uncompressed content size (which `ZSTD_COMPRESS` always writes).
- `size_limit`: The size limit of returned decompressed bytes. The default and maximum supported value is 128 MiB. You can set this limit to a lower value to minimize the risk of `ZSTD_DECOMPRESS_TO_BYTES` causing server memory issues. If `size_limit` is `NULL`, this function returns `NULL`.

**Return type**

`BYTES`: Base64-encoded bytes.

**Example**

```sql
SELECT ZSTD_DECOMPRESS_TO_BYTES(ZSTD_COMPRESS(b'bytes')) AS result;

/*------------+
 | result     |
 +------------+
 | Ynl0ZXM=   |
 +------------*/
```

If compressed bytes exceed the `size_limit` value, `ZSTD_DECOMPRESS_TO_BYTES`
returns an error:

```sql
SELECT ZSTD_DECOMPRESS_TO_BYTES(ZSTD_COMPRESS(b'bytes'), size_limit => 1) AS result;

Statement failed: ZSTD output is too large: (5 bytes) > limit (1 bytes)
```

This function returns `NULL` if the input is `NULL`:

```sql
SELECT ZSTD_DECOMPRESS_TO_BYTES(NULL) AS result;

/*------------+
 | result     |
 +------------+
 | NULL       |
 +------------*/
```

### `ZSTD_DECOMPRESS_TO_STRING`

```sql
ZSTD_DECOMPRESS_TO_STRING(bytes_value [, size_limit => 128 * 1024 * 1024])
```

**Description**

Decompress `BYTES` input into `STRING` output using the
Zstandard (Zstd) lossless data compression algorithm.

Arguments:

- `bytes_value`: The bytes to decompress. Must be a valid Zstd frame whose header includes the uncompressed content size (which `ZSTD_COMPRESS` always writes).
- `size_limit`: The size limit of returned decompressed string. The default and maximum supported value is 128 MiB. You can set this limit to a lower value to minimize the risk of `ZSTD_DECOMPRESS_TO_STRING` causing server memory issues. If `size_limit` is `NULL`, this function returns `NULL`.

**Return type**

`STRING`

**Example**

```sql
SELECT ZSTD_DECOMPRESS_TO_STRING(ZSTD_COMPRESS('zstd')) AS result;

/*----------+
 | result   |
 +----------+
 | "zstd"   |
 +----------*/
```

If compressed bytes exceed the `size_limit` value, `ZSTD_DECOMPRESS_TO_STRING`
returns an error:

```sql
SELECT ZSTD_DECOMPRESS_TO_STRING(ZSTD_COMPRESS('zstd'), size_limit => 1) AS result;

Statement failed: ZSTD output is too large: (4 bytes) > limit (1 bytes)
```

This function returns `NULL` if the input is `NULL`:

```sql
SELECT ZSTD_DECOMPRESS_TO_STRING(NULL) AS result;

/*------------+
 | result     |
 +------------+
 | NULL       |
 +------------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/compression-functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the query had no alias although the result shows a column named `result` (the other examples use `AS result`); `AS result` is added.

## Related

- [Index of this directory](./README.md)
