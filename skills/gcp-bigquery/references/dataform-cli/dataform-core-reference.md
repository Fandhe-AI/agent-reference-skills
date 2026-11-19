---
source: https://docs.cloud.google.com/dataform/docs/reference/dataform-core-reference
---

# Dataform core reference

## Signature / Usage

This document describes the methods, properties, and configuration options of
Dataform core. You can use Dataform core in SQLX
and JavaScript files.

### assert()

|---|---|
| `assert` | `(name: string, query?: AContextable<string>)` |
| `assert` | Adds a Dataform assertion to the compiled graph. Available only in the `/definitions` directory. |

Example:

```javascript
// definitions/file.js

assert("name").query(ctx => "select 1");
```

### CommonContext

Context methods are available when evaluating contextable SQL code,
such as within SQLX files, or when using a
[`Contextable`](#contextable) argument with Dataform core.

|---|---|
| `database` | `() => string` |
| `database` | Returns the database of this dataset, if applicable. |
| `name` | `() => string` |
| `name` | Returns the name of this table. |
| `ref` | `(ref: Resolvable | string[], rest: string[]) => string` |
| `ref` | References another action, adding it as a dependency to this action, returning valid SQL to be used in a `from` expression. This function can be called with a `Resolvable` object, for example: `${ref({ name: "name", schema: "schema", database: "database" })}` This function can also be called using individual arguments for the `"database"`, `"schema"`, and `"name"` values. When only two values are provided, the default database is used and the values are interpreted as `"schema"` and `"name"`. When only one value is provided, the default database and schema are used, with the provided value interpreted as \`"name"\`. `${ref("database", "schema", "name")} ${ref("schema", "name")} ${ref("name")}` |
| `resolve` | `(ref: Resolvable | string[], rest: string[]) => string` |
| `resolve` | Similar to `ref`, but it does not add the referenced action as a dependency to this action. |
| `self` | `() => string` |
| `self` | Equivalent to `resolve(name())`. Returns a valid SQL string that can be used to reference the table produced by this action. |
| `schema` | `() => string` |
| `schema` | Returns the schema of this dataset. |

### Contextable

Contextable arguments can either pass a plain value for their generic type
`T` or a function that is called with the context object for this
type of operation.

```text
T | (ctx: Context) => T
```

### Dataform

Global variable that contains the [IProjectConfig](#iprojectconfig) object.
Required for getting `IProjectConfig` properties, for example:

```text
dataform.projectConfig.vars.myVariableName === "myVariableValue"
```

### declare()

|---|---|
| `declare` | `(dataset: dataform.ITarget)` |
| `declare` | Declares the dataset as a Dataform data source. Available only in the `/definitions` directory. |

Example:

```javascript
// definitions/file.js

declare({name: "a-declaration"})
```

### defaultLocation

The `defaultLocation` property specifies your default BigQuery
dataset location. Dataform uses this location to process your
code and store the results. This processing location must match the location of
your BigQuery datasets. However, it doesn't need to match the
Dataform repository location.

If you don't set the `defaultLocation` property, Dataform
determines the location based on the datasets your SQL query references. This
works as follows:

- If your query references datasets from the same location, Dataform uses that location.
- If your query references datasets from two or more different locations, an error occurs. For details about this limitation, see [Cross-region dataset replication](https://docs.cloud.google.com/bigquery/docs/data-replication).
- If your query doesn't reference any datasets, the default location for Dataform is the `US` multi-region. To choose a different location, set the `defaultLocation` property. Alternatively, use the [`@@location` system variable](https://docs.cloud.google.com/bigquery/docs/reference/system-variables) in your query.

For more information, see
[Specify locations](https://docs.cloud.google.com/bigquery/docs/locations#specify_locations).

### IActionConfig

Defines [Dataform tags](https://docs.cloud.google.com/dataform/docs/configure-additional-actions#add-execution-tags)
and dependencies applied to a workflow action.

|---|---|
| `tags` | `string[]` |
| `tags` | A list of user-defined tags with which the action should be labeled. |
| `dependencies` | [`Resolvable| Resolvable[]`](#resolvable) |
| `dependencies` | Dependencies of the action. |
| `disabled` | `boolean` |
| `disabled` | If set to true, this action won't be run. However, the action can still be depended upon. Useful for temporarily turning off broken actions. |

### IAssertionConfig

Configuration options for `assertion` action types.

|---|---|
| `database` | `string` |
| `database` | The database (Google Cloud project ID) in which to create the corresponding view for this assertion. |
| `description` | `string` |
| `description` | A description of this assertion. |
| `disabled` | `boolean` |
| `disabled` | If set to `true`, this action is not run. The action can still be depended upon. Useful for temporarily turning off broken actions. |
| `hermetic` | `boolean` |
| `hermetic` | Declares whether this action is hermetic. An action is hermetic if all of its dependencies are explicitly declared. If this action depends on data from a source which is not declared as a dependency, then set `hermetic` to `false`. Otherwise, set to `true`. |
| `schema` | `string` |
| `schema` | The schema (BigQuery dataset) in which to create the corresponding view for this assertion. |
| `tags` | `string[]` |
| `tags` | A list of user-defined tags applied to this action. |

### IBigQueryOptions

BigQuery-specific warehouse options.

|---|---|
| `additionalOptions` |   |
| `additionalOptions` | Key-value pairs for the [table](../googlesql-syntax/data-definition-language-1.md#table_option_list), [view](../googlesql-syntax/data-definition-language-1.md#view_option_list), and [materialized view](../googlesql-syntax/data-definition-language-2.md#materialized_view_option_list) options. Some options, for example, `partitionExpirationDays`, have dedicated type/validity checked fields. For such options, use the dedicated fields. String values must be encapsulated in double-quotes, for example: `additionalOptions: {numeric_option: "5", string_option: '"string-value"'}` If the option name contains special characters, encapsulate the name in quotes, for example: `additionalOptions: { "option-name": "value" }`. |
| `clusterBy` | `string[]` |
| `clusterBy` | The keys by which to [cluster partitions by](https://docs.cloud.google.com/dataform/docs/create-tables#create-table-partitions-clusters). |
| `labels` |   |
| `labels` | Key-value pairs for BigQuery labels. If the label name contains special characters, for example, hyphens, then quote its name, for example, `labels: { "label-name": "value" }.` |
| `partitionBy` | `string` |
| `partitionBy` | The key by which to [partition the table](https://docs.cloud.google.com/dataform/docs/create-tables#create-table-partitions-clusters). Typically the name of a timestamp or the date column. |
| `partitionExpirationDays` | `number` |
| `partitionExpirationDays` | The number of days for which BigQuery stores data in each partition. The setting applies to all partitions in a table, but is calculated independently for each partition based on the partition time. |
| `requirePartitionFilter` | `boolean` |
| `requirePartitionFilter` | Declares whether the partitioned table requires a `WHERE` clause predicate filter that filters the partitioning column. |
| `updatePartitionFilter` | `string` |
| `updatePartitionFilter` | SQL-based filter for when [incremental updates](https://docs.cloud.google.com/dataform/docs/create-tables#configure-incremental-table) are applied. |
| `iceberg` | [`IIcebergOptions`](#iicebergoptions) |
| `iceberg` | Apache Iceberg-specific options for Iceberg managed tables. |

### IIcebergOptions

Apache Iceberg-specific options for Iceberg managed tables.

|---|---|
| `connection` | `string` |
| `connection` | Optional. The resource name of your Cloud Storage connection, which provides credentials for reading from and writing to external storage. It can be formatted in the following ways: - `PROJECT_ID.LOCATION.CONNECTION_ID` Replace the following values: - <var translate="no">PROJECT_ID</var>: the Google Cloud project ID - <var translate="no">LOCATION</var>: the location name of the connection - <var translate="no">CONNECTION_ID</var>: the name or ID of the connection - `projects/PROJECT_ID/locations/LOCATION/connections/CONNECTION_ID` - `DEFAULT` Defaults to `DEFAULT`. For more information, see the [Default connection overview](https://docs.cloud.google.com/bigquery/docs/default-connections). |
| `file_format` | `string` |
| `file_format` | Optional. The file format for the table data. Only `PARQUET` is supported. Defaults to `PARQUET`. |
| `bucket_name` | `string` |
| `bucket_name` | Required at either the table or workflow level. The name of the Cloud Storage bucket where the table data is stored. You must provide `bucket_name` in the `config` block of the table definition file, or set a workflow-level default in the `workflow_settings.yaml` file. If neither is provided, compilation fails. For more information, see [Configure workflow-level defaults for Iceberg tables](https://docs.cloud.google.com/dataform/docs/manage-repository#configure-iceberg-defaults). |
| `table_folder_root` | `string` |
| `table_folder_root` | Optional. The name of the first-level folder inside the Cloud Storage bucket where table data is stored. If you don't set this property, Dataform uses the workflow-level default from `workflow_settings.yaml` if it is set. Otherwise, it defaults to `_dataform`. |
| `table_folder_subpath` | `string` |
| `table_folder_subpath` | Optional. A sub-folder within the `table_folder_root`. If you don't set this property, Dataform uses the workflow-level default from `workflow_settings.yaml` if one is set. If neither the property nor a workflow-level default is set, the subpath defaults to `DATASET_NAME/TABLE_NAME`. |

These values construct the Cloud Storage URI in the following format:
`gs://BUCKET_NAME/TABLE_FOLDER_ROOT/TABLE_FOLDER_SUBPATH`.

### IColumnsDescriptor

Describes columns in a table.

```text
{ [name]: string | IRecordDescriptor }
```

`IColumnsDescriptor` configures column and record descriptions and
BigQuery policy tags, and doesn't configure column data types or
`REQUIRED` (`NOT NULL`) schema modes. For more information about column modes,
see [Mitigate column schema limitations](https://docs.cloud.google.com/dataform/docs/create-tables#column-schema-limitations).

### IDeclarationConfig

Configuration options for `declaration` action types.

|---|---|
| `columns` | [`IColumnsDescriptor`](#icolumnsdescriptor) |
| `columns` | A description of columns within the table. |
| `database` | `string` |
| `database` | The database (Google Cloud project ID) in which the source table exists. |
| `description` | `string` |
| `description` | A description of the table. |
| `schema` | `string` |
| `schema` | The schema (BigQuery dataset) in which the source table exists. |

### IDependenciesConfig

Defines dependencies of a workflow action.

|---|---|
| `dependencies` | [`Resolvable| Resolvable[]`](#resolvable) |
| `dependencies` | One or more explicit dependencies for this action. Dependency actions will run before dependent actions. Typically this would remain unset, because most dependencies are declared as a by-product of using the `ref` function. |
| `hermetic` | `boolean` |
| `hermetic` | Declares whether or not this action is hermetic. An action is hermetic if all of its dependencies are explicitly declared. If this action depends on data from a source which has not been declared as a dependency, then `hermetic` should be explicitly set to `false`. Otherwise, if this action only depends on data from explicitly-declared dependencies, then it should be set to `true`. |

### IDocumentableConfig

Defines descriptions of a dataset and its columns.

|---|---|
| `columns` | [`IColumnsDescriptor`](#icolumnsdescriptor) |
| `columns` | A description of columns within the dataset. |
| `description` | `string` |
| `description` | A description of the dataset. |

### INamedConfig

Defines the type and name of a workflow action.

|---|---|
| `type` | `string` |
| `type` | The type of the action. |
| `name` | `string` |
| `name` | The name of the action. |

### IOperationConfig

Configuration options for `operations` action types.

|---|---|
| `columns` | [`IColumnsDescriptor`](#icolumnsdescriptor) |
| `columns` | A description of columns within the table. |
| `database` | `string` |
| `database` | The database (Google Cloud project ID) in which to create the output of this action. |
| `description` | `string` |
| `description` | A description of the table. |
| `disabled` | `boolean` |
| `disabled` | If set to `true`, this action is not run. The action can still be depended upon. Useful for temporarily turning off broken actions. |
| `hasOutput` | `boolean` |
| `hasOutput` | Declares that this `operations` action creates a table that is referenceable using the `ref` function. If set to `true`, this action creates a table with its configured name, using the `self()` context function. For example: `create or replace table ${self()} as select ...` |
| `hermetic` | `boolean` |
| `hermetic` | Declares whether this action is hermetic. An action is hermetic if all of its dependencies are explicitly declared. If this action depends on data from a source which is not declared as a dependency, then set `hermetic` to `false`. Otherwise, set to `true`. |
| `schema` | `string` |
| `schema` | The schema (BigQuery dataset) in which to create the output of this action. |
| `tags` | `string[]` |
| `tags` | A list of user-defined tags applied to this action. |

### IProjectConfig

Contains compilation settings of a Dataform repository.

|---|---|
| `defaultDatabase` | `string` |
| `defaultDatabase` | Optional. The default database (Google Cloud project ID). If unset, Dataform uses the Google Cloud project in which the Dataform repository is located. |
| `defaultSchema` | `string` |
| `defaultSchema` | Required. The default schema (BigQuery dataset ID). |
| [`defaultLocation`](#defaultlocation) | `string` |
| [`defaultLocation`](#defaultlocation) | Optional. The default BigQuery location where Dataform creates tables. |
| `assertionSchema` | `string` |
| `assertionSchema` | Required. The default schema (BigQuery dataset ID) for assertions. |
| `vars` | `map (key: string, value: string)` |
| `vars` | Optional. User-defined variables that are made available to project code during compilation. An object containing a list of `"key": value` pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`. |
| `databaseSuffix` | `string` |
| `databaseSuffix` | Optional. The suffix that should be appended to all database (Google Cloud project ID) names. |
| `schemaSuffix` | `string` |
| `schemaSuffix` | Optional. The suffix that should be appended to all schema (BigQuery dataset ID) names. |
| `tablePrefix` | `string` |
| `tablePrefix` | Optional. The prefix that should be prepended to all table names. |
| `defaultIcebergConfig` | `object` |
| `defaultIcebergConfig` | Optional. Workflow-level defaults for Apache Iceberg managed tables. Contains the following fields: - `bucketName`: Optional. The default name for the Cloud Storage bucket. - `tableFolderRoot`: Optional. The default name for the first-level folder inside the Cloud Storage bucket. - `tableFolderSubpath`: Optional. The default name for a sub-folder within the `tableFolderRoot`. For more information, see [Configure workflow-level defaults for Iceberg tables](https://docs.cloud.google.com/dataform/docs/manage-repository#configure-iceberg-defaults). |
| `lineageEnabled` | `boolean` |
| `lineageEnabled` | Optional. Specifies whether Dataform reports data lineage to Knowledge Catalog for actions that run from the repository. Set through the `lineage.enabled` setting in `workflow_settings.yaml`. For more information about tracking data lineage, see [Track data lineage in Knowledge Catalog](https://docs.cloud.google.com/dataform/docs/use-dataplex#data-lineage). |
| `preserveGovernanceControls` | `boolean` |
| `preserveGovernanceControls` | Optional. If set to `true`, Dataform automatically preserves existing BigQuery data policies and data governance tags (Preview) across workflow runs for all tables in the repository. |
| `warehouse` | `string` |
| `warehouse` | Required. Must be set to `bigquery`. |

You can
[set `IProjectConfig` properties in workflow settings](https://docs.cloud.google.com/dataform/docs/manage-repository#configure-workflow-settings)
at the repository level.

You can
[override the `defaultSchema` and `defaultDatabase` properties for individual tables](https://docs.cloud.google.com/dataform/docs/create-tables#override-table-settings).

You can access all `IProjectConfig` properties in a SQL `SELECT` statement
in a SQLX or JavaScript file.

The following code sample shows the `myVariableName` custom compilation variable
set in
[workflow settings](https://docs.cloud.google.com/dataform/docs/manage-repository#configure-workflow-settings)
with the `projectConfig.vars` property, accessed in a `SELECT` statement in a
SQLX file:

```text
  config { type: "view" }
  SELECT ${when(
    dataform.projectConfig.vars.myVariableName === "myVariableValue",
    "myVariableName is set to myVariableValue!",
    "myVariableName is not set to myVariableValue!"
  )}
```

For more information about overriding project configuration settings
for individual compilation results, see the
[`CodeCompilationConfig` REST resource](https://docs.cloud.google.com/dataform/reference/rest/v1beta1/CodeCompilationConfig)
in [Dataform API](https://docs.cloud.google.com/dataform/reference/rest).

### IRecordDescriptor

Describes a struct, object or record in a table that has nested columns.

|---|---|
| `bigqueryPolicyTags` | `string | string[]` |
| `bigqueryPolicyTags` | Full identifiers of BigQuery policy tags applied to this column. A full identifier of a BigQuery policy tag includes the project name, location, and taxonomy, For example: `"projects/1/locations/eu/taxonomies/2/policyTags/3"` BigQuery supports one tag per column. |
| `columns` | [`IColumnsDescriptor`](#icolumnsdescriptor) |
| `columns` | A description of columns within the struct, object, or record. |
| `description` | `string` |
| `description` | A description of the struct, object, or record. |

### ITableAssertions

Options for creating assertions as part of a table definition.

|---|---|
| `nonNull` | `string | string[]` |
| `nonNull` | Column(s) which can never be `NULL`. If set, the corresponding assertion fails if any row contains `NULL` values for these column(s). |
| `rowConditions` | `string[]` |
| `rowConditions` | General condition(s) which should hold true for all rows in the table. If set, the corresponding assertion fails if any row violates any of these condition(s). |
| `uniqueKey` | `string | string[]` |
| `uniqueKey` | Column(s) which constitute the unique key index of the table. If set, the resulting assertion fails if there is more than one row in the table with the same values for all of these column(s). |
| `uniqueKeys` | `[]` |
| `uniqueKeys` | Combinations of column(s), each of which constitutes a unique key index of the table. If set, the resulting assertion fails if there is more than one row in the table with the same values for all of the column(s) in the unique key(s). |

### ITableConfig

Configuration options for `table` actions, including
`table`, `view`, and `incremental` table types.

Extends [IActionConfig](#iactionconfig),
[IDependenciesConfig](#idependenciesconfig),
[IDocumentableConfig](#idocumentableconfig),
[INamedConfig](#inamedconfig), and
[ITargetableConfig](#itargetableconfig).

|---|---|
| `assertions` | [`ITableAssertions`](#itableassertions) |
| `assertions` | Assertions to be run on the table. If configured, relevant assertions are automatically created and run as a dependency of this table. |
| `bigquery` | [`IBigQueryOptions`](#ibigqueryoptions) |
| `bigquery` | BigQuery-specific warehouse options. |
| `columns` | [`IColumnsDescriptor`](#icolumnsdescriptor) |
| `columns` | A description of columns within the table. |
| `database` | `string` |
| `database` | The database (Google Cloud project ID) in which to create the output of this action. |
| `description` | `string` |
| `description` | A description of the table. |
| `disabled` | `boolean` |
| `disabled` | If set to `true`, this action is not run. The action can still be depended upon. Useful for temporarily turning off broken actions. |
| `hermetic` | `boolean` |
| `hermetic` | Declares whether this action is hermetic. An action is hermetic if all of its dependencies are explicitly declared. If this action depends on data from a source which is not declared as a dependency, then set `hermetic` to `false`. Otherwise, set to `true`. |
| `materialized` | `boolean` |
| `materialized` | Only valid when the table type is `view`. If set to true, a materialized view will be created. |
| `onSchemaChange` | [`onSchemaChange`](#onschemachange) |
| `onSchemaChange` | Only valid when the table type is `incremental`. The action performed after Dataform checks the `SELECT` query to determine if columns were added or removed. This feature is in [Preview](https://cloud.google.com/products#product-launch-stages). |
| `preserveGovernanceControls` | `boolean` |
| `preserveGovernanceControls` | Optional. If set to `true`, Dataform backs up and re-applies existing BigQuery data policies and data governance tags (Preview) when recreating a table, view, or incremental table during a full refresh. Overrides workflow-level defaults set in `workflow_settings.yaml`. |
| `protected` | `boolean` |
| `protected` | Only allowed for the `incremental `table type. If set to true, running this action ignores the `full-refresh` option. This is useful for tables which are built from transient data, to verify that historical data is never lost. |
| `schema` | `string` |
| `schema` | The schema (BigQuery dataset) in which to create the output of this action. |
| `tags` | `string[]` |
| `tags` | A list of user-defined tags applied to this action. |
| `type` | [`TableType`](#tabletype) |
| `type` | The type of the table. |
| `uniqueKey` | `string[]` |
| `uniqueKey` | Unique keys for merge criteria for incremental tables. If configured, records with matching unique key(s) are updated instead of new rows being inserted. |

### ITableContext

Context methods are available when evaluating contextable SQL code,
such as within SQLX files, or when using a [`Contextable`](#contextable)
argument with Dataform core.

|---|---|
| `incremental` | `() => boolean` |
| `incremental` | Returns true when the current context indicates that the table will be built incrementally. |
| `name` | `() => string` |
| `name` | Returns the fully qualified name of this table. |
| `ref` | `(ref: Resolvable | string[], rest: string[]) => string` |
| `ref` | References another action, adding it as a dependency to this action, returning valid SQL to be used in a from expression. This function can be called with a `Resolvable` object, for example: `${ref({ name: "name", schema: "schema", database: "database" })}` This function can also be called using individual arguments for the `"database"`, `"schema"`, and `"name"` values. When only two values are provided, the default database is used and the values are interpreted as `"schema"` and `"name"`. When only one value is provided, the default database schema is used, with the provided value interpreted as \`"name"\`. `${ref("database", "schema", "name")} ${ref("schema", "name")} ${ref("name")}` |
| `resolve` | `(ref: Resolvable | string[], rest: string[]) => string` |
| `resolve` | Similar to `ref`, but instead of adding a dependency, it resolves the provided reference so that it can be used in SQL, for example, in a \`from\` expression. |
| `self` | `() => string` |
| `self` | Equivalent to `resolve(name())`. Returns a valid SQL string that can be used to reference the table produced by this action. |
| `when` | `(cond: boolean, trueCase: string, falseCase: string) => string` |
| `when` | Shorthand for an `if ` condition. Equivalent to `cond ? trueCase : falseCase`. `falseCase` is optional, and defaults to an empty string. |

### ITarget

A reference to a table within BigQuery.

|---|---|
| `database` | `string` |
| `name` | `string` |
| `schema` | `string` |

### ITargetableConfig

Defines the target database and schema of a workflow action.

|---|---|
| `database` | `string` |
| `database` | The database in which the output of this action should be created. Must be set to BigQuery. |
| `schema` | `string` |
| `schema` | The schema in which the output of this action should be created. |

### onSchemaChange

> [!WARNING]
>
> **Preview**
>
>
> This product or feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section
> of the [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA products and features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

> [!NOTE]
> **Note:** To provide feedback or request support, contact [dataform-preview-support@google.com](mailto:dataform-preview-support@google.com).

After you set the `onSchemaChange` property, Dataform
checks the `SELECT` query to determine if columns were added or removed.
Dataform then performs the action specified by the
`onSchemaChange` property's value. You can set the action to one of the
following:

- `IGNORE` (default): ignores added columns and shows an error for missing columns. If `onSchemaChange` is unset, this is the default behavior when the schema changes.
- `FAIL`: stops the action if Dataform detects any schema change, which helps to keep the schema consistent.
- `EXTEND`: adds new columns from the query to the incremental table, and adds `NULL` values for previous records. Shows an error if a column is removed or missing from the original schema in the query. You can use this setting to add new columns to your incremental tables during runtime.
- `SYNCHRONIZE`: adds new columns from the query to the incremental table,
  and adds `NULL` values for previous records. Removes columns that were in
  the original schema but that are now missing from the current query.

  > [!CAUTION]
  > **Caution:** The `SYNCHRONIZE` action cannot be undone, and you might lose data when you remove columns with this option.

  > [!NOTE]
  > **Note:** Deleting partitioned and clustered columns isn't supported, as deleting these columns can have negative consequences. If a partitioned or clustered column is still deleted, it's handled with the [`ALTER TABLE DROP COLUMN` statement](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_table_drop_column_statement). Dataform doesn't perform checks or validations to prevent the running of `ALTER TABLE DROP COLUMN` statements on partitioned or clustered columns. Therefore, if you drop such columns, proceed cautiously and be aware of potential negative consequences.

### operate()

|---|---|
| `operate` | `(name: string, queries?: Contextable<ICommonContext, string \| string[]>)` |
| `operate` | Defines a SQL operation. Available only in the `/definitions` directory. |

Example:

```javascript
// definitions/file.js

operate("an-operation", ["SELECT 1", "SELECT 2"])
```

### publish()

|---|---|
| `publish` | `(name: string, queryOrConfig?: Contextable<ITableContext, string> \| ITableConfig)` |
| `publish` | Creates a table or view. Available only in the `/definitions` directory. |

Example:

```javascript
// definitions/file.js

publish("published-table", {
    type: "table",
    dependencies: ["a-declaration"],
  }).query(ctx => "SELECT 1 AS test");
```

### Resolvable

A resolvable can be either the name of a table as `string`,
or the object that describes the full path to the relation.

```text
string | ITarget
```

### TableType

Supported types of table actions.

Tables of type `view` will be created as views.

Tables of type `table` will be created as tables.

Tables of type `incremental` must include a `where` clause.
For more information, see
[Configure an incremental table](https://docs.cloud.google.com/dataform/docs/create-tables#configure-incremental-table).

## Notes

- Source: https://docs.cloud.google.com/dataform/docs/reference/dataform-core-reference (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs (rendering): the page's HTML writes `(name: string, query?: AContextable<string>)` unescaped inside `<code>`, so the rendered page and its Markdown twin show `(name: string, query?: AContextable)`; the type is restored from the HTML source.
- Corrected from the official docs (rendering): the page's HTML writes `(name: string, queries?: Contextable<ICommonContext, string | string[]>)` unescaped inside `<code>`, so the rendered page and its Markdown twin show `(name: string, queries?: Contextable)`; the type is restored from the HTML source.
- Corrected from the official docs (rendering): the page's HTML writes `(name: string, queryOrConfig?: Contextable<ITableContext, string> | ITableConfig)` unescaped inside `<code>`, so the rendered page and its Markdown twin show `(name: string, queryOrConfig?: Contextable | ITableConfig)`; the type is restored from the HTML source.
- Corrected from the official docs: the `additionalOptions` example is split into two code spans, ` additionalOptions: {numeric_option: "5"` and `string_option: '"string-value"'}`, so the braces are unbalanced. The two spans are joined into one.
- Corrected from the official docs: the `table_folder_subpath` row refers to `tableFolderRoot`, but the property defined in the row above it on this page is `table_folder_root`. The reference is changed to `table_folder_root`.
- Caution: the section heading is `CommonContext`, while the `operate` signature refers to `ICommonContext` (the other context types on this page use the `I` prefix, and `ICommonContext` is not defined here). The official text is kept as published.
- Caution: the `when` method is listed as `(cond: boolean, trueCase: string, falseCase: string) => string`, but its description says `falseCase` is optional and defaults to an empty string. The official text is kept as published.

## Related

- [Index of this directory](./README.md)
