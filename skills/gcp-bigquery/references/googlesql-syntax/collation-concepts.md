---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/collation-concepts
---

# Collation

## Signature / Usage

GoogleSQL for BigQuery supports collation. Collation
defines rules to sort and compare strings in certain
[operations](#operations-affected-by-collation), such as conditional expressions, joins, and
groupings.

By default, GoogleSQL sorts strings case-sensitively. This means that `a` and
`A` are treated as different letters, and `Z` would come before `a`.

**Example default sorting:** Apple, Zebra, apple

By contrast, collation lets you sort and compare strings case-insensitively or
according to specific language rules.

**Example case-insensitive collation:** Apple, apple, Zebra

To customize collation for a
collation-supported operation, you typically [assign a collation
specification](#where-you-can-assign-a-collation-specification) to at least one string in the operation inputs.
Some operations can't use collation, but can [propagate collation through
them](#operations-that-propagate-collation).

Collation is useful when you need fine-tuned control over how values are sorted,
joined, or grouped in tables.

### Operations affected by collation

The following example query operations are affected by collation when
sorting and comparing strings:

| Operations |
|---|
| Collation-supported [comparison operations](#functions-operators-and-conditional-expressions) |
| [Join operations](query-syntax-2.md#join-operation) |
| [`ORDER BY`](query-syntax-2.md#order-by-clause) |
| [`GROUP BY`](query-syntax-2.md#group-by-clause) |
| [`WINDOW`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#window_clause) for window functions |
| Collation-supported [scalar functions](#functions-operators-and-conditional-expressions) |
| Collation-supported [aggregate functions](#functions-operators-and-conditional-expressions) |
| [Set operations](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#set_operators) |
| [`NULLIF` conditional expression](../googlesql-functions/conditional_expressions.md#nullif) |

### Operations that propagate collation

Collation can pass through some query operations to other parts
of a query. When collation passes through an operation in a
query, this is known as *propagation*. During propagation:

- If an input contains no collation specification or an empty collation specification and another input contains an explicitly defined collation, the explicitly defined collation is used for all of the inputs.
- All inputs with a non-empty explicitly defined collation specification must have the same type of collation specification, otherwise an error is thrown.

GoogleSQL has several [functions](#functions),
[operators](#operators), and [expressions](#expressions)
that can propagate collation.

In the following example, the `'und:ci'` collation specification is propagated
from the `character` column to the `ORDER BY` operation.

```sql
-- With collation
SELECT *
FROM UNNEST([
  COLLATE('B', 'und:ci'),
  'b',
  'a'
]) AS character
ORDER BY character

/*-----------+
 | character |
 +-----------+
 | a         |
 | B         |
 | b         |
 +-----------*/
```

```sql
-- Without collation
SELECT *
FROM UNNEST([
  'B',
  'b',
  'a'
]) AS character
ORDER BY character

/*-----------+
 | character |
 +-----------+
 | B         |
 | a         |
 | b         |
 +-----------*/
```

#### Functions

The following example functions propagate collation.

| Function | Notes |
|---|---|
| [`AEAD.DECRYPT_STRING`](../googlesql-functions/aead_encryption_functions.md#aeaddecrypt_string) |   |
| [`ANY_VALUE`](../googlesql-functions/aggregate_functions.md#any_value) |   |
| [`ARRAY_AGG`](../googlesql-functions/aggregate_functions.md#array_agg) | Collation on input arguments are propagated as collation on the array element. |
| [`ARRAY_FIRST`](../googlesql-functions/array_functions.md#array_first) |   |
| [`ARRAY_LAST`](../googlesql-functions/array_functions.md#array_last) |   |
| [`ARRAY_SLICE`](../googlesql-functions/array_functions.md#array_slice) |   |
| [`ARRAY_TO_STRING`](../googlesql-functions/array_functions.md#array_to_string) | Collation on array elements are propagated to output. |
| [`COLLATE`](../googlesql-functions/string_functions-1.md#collate) |   |
| [`CONCAT`](../googlesql-functions/string_functions-1.md#concat) |   |
| [`FORMAT`](../googlesql-functions/string_functions-1.md#format) | Collation from `format_string` to the returned string is propagated. |
| [`FORMAT_DATE`](../googlesql-functions/date_functions.md#format_date) | Collation from `format_string` to the returned string is propagated. |
| [`FORMAT_DATETIME`](../googlesql-functions/datetime_functions.md#format_datetime) | Collation from `format_string` to the returned string is propagated. |
| [`FORMAT_TIME`](../googlesql-functions/time_functions.md#format_time) | Collation from `format_string` to the returned string is propagated. |
| [`FORMAT_TIMESTAMP`](../googlesql-functions/timestamp_functions.md#format_timestamp) | Collation from `format_string` to the returned string is propagated. |
| [`GREATEST`](../googlesql-functions/mathematical_functions.md#greatest) |   |
| [`LAG`](../googlesql-functions/navigation_functions.md#lag) |   |
| [`LEAD`](../googlesql-functions/navigation_functions.md#lead) |   |
| [`LEAST`](../googlesql-functions/mathematical_functions.md#least) |   |
| [`LEFT`](../googlesql-functions/string_functions-1.md#left) |   |
| [`LOWER`](../googlesql-functions/string_functions-1.md#lower) |   |
| [`LPAD`](../googlesql-functions/string_functions-1.md#lpad) |   |
| [`MAX`](../googlesql-functions/aggregate_functions.md#max) |   |
| [`MIN`](../googlesql-functions/aggregate_functions.md#min) |   |
| [`NET.HOST`](../googlesql-functions/net_functions.md#nethost) |   |
| [`NET.PUBLIC_SUFFIX`](../googlesql-functions/net_functions.md#netpublic_suffix) |   |
| [`NET.REG_DOMAIN`](../googlesql-functions/net_functions.md#netreg_domain) |   |
| [`NTH_VALUE`](../googlesql-functions/navigation_functions.md#nth_value) |   |
| [`NORMALIZE`](../googlesql-functions/string_functions-1.md#normalize) |   |
| [`NORMALIZE_AND_CASEFOLD`](../googlesql-functions/string_functions-1.md#normalize_and_casefold) |   |
| [`REPEAT`](../googlesql-functions/string_functions-2.md#repeat) |   |
| [`REPLACE`](../googlesql-functions/string_functions-2.md#replace) |   |
| [`REVERSE`](../googlesql-functions/string_functions-2.md#reverse) |   |
| [`RIGHT`](../googlesql-functions/string_functions-2.md#right) |   |
| [`RPAD`](../googlesql-functions/string_functions-2.md#rpad) |   |
| [`SOUNDEX`](../googlesql-functions/string_functions-2.md#soundex) |   |
| [`SPLIT`](../googlesql-functions/string_functions-2.md#split) | Collation on input arguments are propagated as collation on the array element. |
| [`STRING_AGG`](../googlesql-functions/aggregate_functions.md#string_agg) |   |
| [`SUBSTR`](../googlesql-functions/string_functions-2.md#substr) |   |
| [`UPPER`](../googlesql-functions/string_functions-2.md#upper) |   |

#### Operators

The following example operators propagate collation.

| Operator | Notes |
|---|---|
| [`\|\|` concatenation operator](operators.md#concatenation-operator) |   |
| [Array subscript operator](operators.md#array-subscript-operator) | Propagated to output. |
| [Set operators](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#set_operators) | Collation of an output column is decided by the collations of input columns at the same position. |
| [`STRUCT` field access operator](operators.md#field-access-operator) | When getting a `STRUCT`, collation on the `STRUCT` field is propagated as the output collation. |
| [`UNNEST`](query-syntax-1.md#unnest-operator) | Collation on the input array element is propagated to output. |

#### Expressions

The following example expressions propagate collation.

| Expression | Notes |
|---|---|
| [`ARRAY`](data-types.md#array-type) | When you construct an `ARRAY`, collation on input arguments is propagated on the elements in the `ARRAY`. |
| [`CASE`](../googlesql-functions/conditional_expressions.md#case) |   |
| [`CASE` expr](../googlesql-functions/conditional_expressions.md#case-expr) |   |
| [`COALESCE`](../googlesql-functions/conditional_expressions.md#coalesce) |   |
| [`IF`](../googlesql-functions/conditional_expressions.md#if) |   |
| [`IFNULL`](../googlesql-functions/conditional_expressions.md#ifnull) |   |
| [`NULLIF`](../googlesql-functions/conditional_expressions.md#nullif) |   |
| [`STRUCT`](data-types.md#struct-type) | When you construct a `STRUCT`, collation on input arguments is propagated on the fields in the `STRUCT`. |

### Additional features that support collation

These features in BigQuery generally support collation:

| Feature | Notes |
|---|---|
| [Views](https://docs.cloud.google.com/bigquery/docs/views-intro) |   |
| [Materialized views](https://docs.cloud.google.com/bigquery/docs/materialized-views-intro) | This feature supports collation, but [limitations apply](#limitations) |
| [Table functions](https://docs.cloud.google.com/bigquery/docs/table-functions) | This feature supports collation, but [limitations apply](#limitations) |
| [BI engine](https://docs.cloud.google.com/bigquery/docs/bi-engine-intro) |   |

### Where you can assign a collation specification

You can assign a [collation specification](#collation-specification-details) to these
collation-supported types:

- A `STRING`
- A `STRING` field in a `STRUCT`
- A `STRING` element in an `ARRAY`

In addition:

- You can assign a default collation specification to a dataset when you create or alter it. This assigns a default collation specification to all future tables that are added to the dataset if the tables don't have their own default collation specifications.
- You can assign a default collation specification to a table when you create or alter it. This assigns a collation specification to all future collation-supported columns that are added to the table if the columns don't have collation specifications. This overrides a default collation specification on a dataset.
- You can assign a collation specification to a collation-supported type in a column. A column that contains a collation-supported type in its column dataset is a collation-supported column. This overrides a default collation specification on a table.
- You can assign a collation specification to a collation-supported query operation.
- You can assign a collation specification to a collation-supported expression with the `COLLATE` function. This overrides any collation specifications set previously.

In summary:

You can define a default collation specification for a dataset. For example:

```sql
CREATE SCHEMA (...)
DEFAULT COLLATE 'und:ci'
```

You can define a default collation specification for a table. For example:

```sql
CREATE TABLE (...)
DEFAULT COLLATE 'und:ci'
```

You can define a collation specification for a collation-supported column.
For example:

```sql
CREATE TABLE (
  case_insensitive_column STRING COLLATE 'und:ci'
)
```

You can specify a collation specification for a collation-supported expression
with the `COLLATE` function. For example:

```sql
SELECT COLLATE('a', 'und:ci') AS character
```

#### DDL statements

You can assign a collation specification to the following DDL statements.

| Location | Support | Notes |
|---|---|---|
| Dataset | [`CREATE SCHEMA`](data-definition-language-1.md#create-schema-statement) | Create a dataset and optionally add a default collation specification to the dataset. |
| Dataset | [`ALTER SCHEMA`](data-definition-language-3.md#alter-schema-set-default-collate-statement) | Updates the default collation specification for a dataset. |
| Table | [`CREATE TABLE`](data-definition-language-1.md#create-table-statement) | Create a table and optionally add a default collation specification to a table or a collation specification to a collation-supported type in a column. <br /> You can't have collation on a column used with `CLUSTERING`. |
| Table | [`ALTER TABLE`](data-definition-language-3.md#alter-table-set-default-collate-statement) | Update the default collation specification for collation-supported type in a table. |
| Column | [`ADD COLUMN`](data-definition-language-3.md#alter-table-add-column-statement) | Add a collation specification to a collation-supported type in a new column in an existing table. |

#### Data types

You can assign a collation specification to the following data types.

| Type | Notes |
|---|---|
| [`STRING`](data-types.md#string-type) | You can apply a collation specification directly to this data type. |
| [`STRUCT`](data-types.md#struct-type) | You can apply a collation specification to a `STRING` field in a `STRUCT`. A `STRUCT` can have `STRING` fields with different collation specifications. A `STRUCT` can only be used in comparisons with the following operators and conditional expressions: `=`, `!=`, `IN`, `NULLIF`, and `CASE`. |
| [`ARRAY`](data-types.md#array-type) | You can apply a collation specification to a `STRING` element in an `ARRAY`. An `ARRAY` can have `STRING` elements with different collation specifications. |

> [!NOTE]
> **Note:** Use the [`COLLATE`](../googlesql-functions/string_functions-1.md#collate) function to apply a collation specification to collation-supported expressions.

#### Functions, operators, and conditional expressions

You can assign a collation specification to the following functions, operators,
and conditional expressions.

##### Functions

| Type | Support | Notes |
|---|---|---|
| Scalar | [`COLLATE`](../googlesql-functions/string_functions-1.md#collate) |   |
| Scalar | [`ENDS_WITH`](../googlesql-functions/string_functions-1.md#ends_with) |   |
| Scalar | [`GREATEST`](../googlesql-functions/mathematical_functions.md#greatest) |   |
| Scalar | [`INSTR`](../googlesql-functions/string_functions-1.md#instr) |   |
| Scalar | [`LEAST`](../googlesql-functions/mathematical_functions.md#least) |   |
| Scalar | [`REPLACE`](../googlesql-functions/string_functions-2.md#replace) |   |
| Scalar | [`SPLIT`](../googlesql-functions/string_functions-2.md#split) |   |
| Scalar | [`STARTS_WITH`](../googlesql-functions/string_functions-2.md#starts_with) |   |
| Scalar | [`STRPOS`](../googlesql-functions/string_functions-2.md#strpos) |   |
| Aggregate | [`COUNT`](../googlesql-functions/aggregate_functions.md#count) | This operator is only affected by collation when the input includes the `DISTINCT` argument. |
| Aggregate | [`MAX`](../googlesql-functions/aggregate_functions.md#max) |   |
| Aggregate | [`MIN`](../googlesql-functions/aggregate_functions.md#min) |   |

##### Operators

| Support | Notes |
|---|---|
| [`<`](operators.md#comparison-operators) |   |
| [`<=`](operators.md#comparison-operators) |   |
| [`>`](operators.md#comparison-operators) |   |
| [`>=`](operators.md#comparison-operators) |   |
| [`=`](operators.md#comparison-operators) |   |
| [`!=`](operators.md#comparison-operators) |   |
| [`[NOT] BETWEEN`](operators.md#comparison-operators) |   |
| [`[NOT] IN`](operators.md#in-operator) | [Limitations apply](operators.md#in-operator). |
| [`[NOT] LIKE`](operators.md#like-operator) | [Limitations apply](operators.md#like-operator). |
| [Quantified `[NOT] LIKE`](operators.md#quantified-like-operator) | [Limitations apply](operators.md#quantified-like-operator). |

##### Conditional expressions

| Support |   |
|---|---|
| [`CASE`](../googlesql-functions/conditional_expressions.md#case) |   |
| [`CASE` expr](../googlesql-functions/conditional_expressions.md#case-expr) |   |
| [`NULLIF`](../googlesql-functions/conditional_expressions.md#nullif) |   |

The preceding collation-supported operations
(functions, operators, and conditional expressions)
can include input with explicitly defined collation specifications for
collation-supported types. In a collation-supported operation:

- All inputs with a non-empty, explicitly defined collation specification must be the same, otherwise an error is thrown.
- If an input doesn't contain an explicitly defined collation and another input contains an explicitly defined collation, the explicitly defined collation is used for both.

For example:

Adapted (not in the official docs): replaced the `col_a_expression` to `col_d_expression` placeholders with the column names `col_a` to `col_d` defined by the `CREATE TABLE` statement.

```sql
-- Assume there's a table with this column declaration:
CREATE TABLE table_a
(
    col_a STRING COLLATE 'und:ci',
    col_b STRING COLLATE '',
    col_c STRING,
    col_d STRING COLLATE 'und:ci'
);

-- This runs. Column 'b' has a collation specification and the
-- column 'c' doesn't.
SELECT STARTS_WITH(col_b, col_c)
FROM table_a;

-- This runs. Column 'a' and 'd' have the same collation specification.
SELECT STARTS_WITH(col_a, col_d)
FROM table_a;

-- This runs. Even though column 'a' and 'b' have different
-- collation specifications, column 'b' is considered the default collation
-- because it's assigned to an empty collation specification.
SELECT STARTS_WITH(col_a, col_b)
FROM table_a;

-- This works. Even though column 'a' and 'b' have different
-- collation specifications, column 'b' is updated to use the same
-- collation specification as column 'a'.
SELECT STARTS_WITH(col_a, COLLATE(col_b, 'und:ci'))
FROM table_a;

-- This runs. Column 'c' doesn't have a collation specification, so it uses the
-- collation specification of column 'd'.
SELECT STARTS_WITH(col_c, col_d)
FROM table_a;
```

### Collation specification details

A collation specification determines how strings are sorted and compared in
[collation-supported operations](#operations-affected-by-collation). You can define the
[Unicode collation specification](#unicode-collation-specification), `und:ci`, for
[collation-supported types](#where-you-can-assign-a-collation-specification).

If a collation specification isn't defined, the default collation specification
is used. To learn more, see the next section.

#### Default collation specification

When a collation specification isn't assigned or is empty,
`'binary'` collation is used. Binary collation indicates that the
operation should return data in [Unicode code point order](https://en.wikipedia.org/wiki/List_of_Unicode_characters).
You can't set binary collation explicitly.

In general, the following behavior occurs when an empty string is included in
collation:

- If a string has `und:ci` collation, the string comparison is case-insensitive.
- If a string has empty collation, the string comparison is case-sensitive.
- If string not assigned collation, the string comparison is case-sensitive.
- A column with unassigned collation inherit the table's default collation.
- A column with empty collation doesn't inherit the table's default collation.

#### Unicode collation specification

```sql
collation_specification:
  'language_tag:collation_attribute'
```

A unicode collation specification indicates that the operation should use the
[Unicode Collation Algorithm](http://www.unicode.org/reports/tr10/) to sort and compare
strings. The collation specification can be a `STRING` literal or a
query parameter.

##### The language tag

The language tag determines how strings are generally sorted and compared.
Allowed values for `language_tag` are:

- `und`: A locale string representing the *undetermined* locale. `und` is a special language tag defined in the [IANA language subtag registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) and used to indicate an undetermined locale. This is also known as the *root* locale and can be considered the *default* Unicode collation. It defines a reasonable, locale agnostic collation.

##### The collation attribute

In addition to the language tag, the unicode collation specification must
have a `collation_attribute`, which enables additional rules for sorting
and comparing strings. Allowed values are:

- `ci`: Collation is case-insensitive.

##### Collation specification example

This is what the `ci` collation attribute looks like when used with the
`und` language tag in the `COLLATE` function:

```sql
COLLATE('orange1', 'und:ci')
```

##### Caveats

- Differing strings can be considered equal.
  For instance, `ẞ` (LATIN CAPITAL LETTER SHARP S) is considered equal to `'SS'`
  in some contexts. The following expressions both evaluate to `TRUE`:

  - `COLLATE('ẞ', 'und:ci') > COLLATE('SS', 'und:ci')`
  - `COLLATE('ẞ1', 'und:ci') < COLLATE('SS2', 'und:ci')`

  This is similar to how case insensitivity works.
- In search operations, strings with different lengths could be considered
  equal. To ensure consistency, collation should be used without
  search tailoring.

- There are a wide range of unicode code points (punctuation, symbols, etc),
  that are treated as if they aren't there. So strings with
  and without them are sorted identically. For example, the format control
  code point `U+2060` is ignored when the following strings are sorted:

  ```sql
  SELECT *
  FROM UNNEST([
    COLLATE('oran\u2060ge1', 'und:ci'),
    COLLATE('\u2060orange2', 'und:ci'),
    COLLATE('orange3', 'und:ci')
  ]) AS fruit
  ORDER BY fruit

  /*---------+
  | fruit   |
  +---------+
  | orange1 |
  | orange2 |
  | orange3 |
  +---------*/
  ```

- Ordering *may* change. The Unicode specification of the `und` collation can
  change occasionally, which can affect sorting
  order.

### Limitations

Limitations for supported features are captured in the previous
sections, but here are a few general limitations to keep in mind:

- `und:ci` and empty collation are supported, but not other collation specifications.
- Operations and functions that don't support collation produce an error if they encounter collated values.
- You can't set non-empty collation on a clustering field.

  ```sql
  CREATE TABLE my_dataset.my_table
  (
    word STRING COLLATE 'und:ci',
    number INT64
  )
  CLUSTER BY word;

  -- User error:
  -- "CLUSTER BY STRING column word with
  -- collation und:ci isn't supported"
  ```

- You can't create a materialized view with collated sort keys in an
  aggregate function.

  ```sql
  CREATE MATERIALIZED VIEW my_dataset.my_view
  AS SELECT
    -- Assume collated_table.col_ci is a string column with 'und:ci' collation.
    ARRAY_AGG(col_int64 ORDER BY col_ci) AS col_int64_arr
  FROM my_dataset.collated_table;

  -- User error:
  -- "Sort key with collation in aggregate function array_agg isn't
  -- supported in materialized view"
  ```

- If a materialized view has joined on collated columns and not all of the
  collated columns were produced by the materialized view, it's possible that
  a query with the materialized view will use data from base tables rather than
  the materialized view.

  ```sql
  CREATE MATERIALIZED VIEW my_dataset.my_mv
  AS SELECT
    t1.col_ci AS t1_col_ci,
    t2.col_int64 AS t2_col_int64
  FROM my_dataset.collated_table1 AS t1
  JOIN my_dataset.collated_table2 AS t2
  ON t1.col_ci = t2.col_ci

  SELECT * FROM my_dataset.my_mv
  WHERE t1_col_ci = 'abc'

  -- Assuming collated_table1.col_ci and collated_table2.col_ci are columns
  -- with 'und:ci' collation, the query to my_mv may use data from
  -- collated_table1 and collated_table2, rather than data from my_mv.
  ```

- Table functions can't take collated arguments.

  ```sql
  CREATE TABLE FUNCTION my_dataset.my_tvf(x STRING) AS (
    SELECT x
  );

  SELECT * FROM my_dataset.my_tvf(COLLATE('abc', 'und:ci'));

  -- User error:
  -- "Collation 'und:ci' on argument of TVF call isn't allowed"
  ```

- A table function with collated output columns isn't supported if an explicit
  result schema is present.

  ```sql
  CREATE TABLE FUNCTION my_dataset.my_tvf(x STRING)
  RETURNS TABLE<output_str STRING>
  AS (SELECT COLLATE(x, 'und:ci') AS output_str);

  -- User error:
  -- "Collation 'und:ci' on output column output_str isn't allowed when an
  -- explicit result schema is present"
  ```

- User-defined functions (UDFs) can't take collated arguments.

  ```sql
  CREATE FUNCTION tmp_dataset.my_udf(x STRING) AS (x);

  SELECT tmp_dataset.my_udf(col_ci)
  FROM shared_dataset.table_collation_simple;

  -- User error:
  -- "Collation isn't allowed on argument x ('und:ci').
  -- Use COLLATE(arg, '') to remove collation at [1:8]"
  ```

- Collation in the return type of a user-defined function body isn't allowed.

  ```sql
  CREATE FUNCTION my_dataset.my_udf(x STRING) AS (COLLATE(x, 'und:ci'));

  -- User error:
  -- "Collation ['und:ci'] in return type of user-defined function body is
  -- not allowed"
  ```

- [External tables](https://docs.cloud.google.com/bigquery/docs/external-data-sources) don't support collation.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/collation-concepts (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: The Caveats say `ẞ` is considered equal to `'SS'` and that `COLLATE('ẞ', 'und:ci') > COLLATE('SS', 'und:ci')` evaluates to `TRUE`, but for values that compare equal `>` is `FALSE`; the second expression (`<` with the suffixes `1` and `2`) fits equality. The intended operator is not stated.
- Corrected from the official docs: the collation example defines `table_a` with the columns `col_a`, `col_b`, `col_c` and `col_d`, but its five `STARTS_WITH` queries, each described as running, refer to `col_a_expression`, `col_b_expression`, `col_c_expression` and `col_d_expression`, which the table doesn't have. They are replaced with the defined column names.

## Related

- [Index of this directory](./README.md)
