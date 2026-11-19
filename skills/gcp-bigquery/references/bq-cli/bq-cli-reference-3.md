---
source: https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference
---

# bq command-line tool reference (part 3 of 3)

## Signature / Usage

#### `bq rm`

Use the `bq rm` command to delete a BigQuery resource.

##### Synopsis

```text
bq rm [FLAGS] RESOURCE
```

##### Flags and arguments

The `bq rm` command uses the following flags and arguments:

**`--capacity_commitment={false|true}`**
:   To delete a capacity commitment, set to `true`, specify the location of the
commitment you want to remove by using the `--location` flag, and replace
`RESOURCE` with the ID of the commitment you want to
remove.

**`--dataset={true|false}` or `-d={true|false}`**
:   To delete a dataset, set to `true`. The default value is `false`.

**`--force={true|false}` or `-f={true|false}`**
:   To delete a resource
without prompting, set to `true`. When deleting a dataset, table, job, model,
routine, connection, or transfer configuration, setting this flag to `true`
also ignores `Not found` errors if the resource doesn't exist. The default
value is `false`.

**`--job={true|false}` or `-j={true|false}`**
:   To delete a job, set to true. The default value is false.

**`--model={true|false}` or `-m={true|false}`**
:   To delete a BigQuery ML model, set to `true`. The default is `false`.

**`--recursive={true|false}` or `-r={true|false}`**
:   To delete a dataset and any tables, table data, or models
in it, set to `true`. The default value is `false`.

**`--reservation={true|false}`**
:   To delete a reservation, set to `true`. The default value is `false`.

**`--reservation_assignment={true|false}`**
:   To delete a reservation assignment, set to `true`. The default value is
`false`.

**`--routine={true|false}`**
:   To delete a routine, set to `true`. The default value is `false`. A routine
can be a [persistent user-defined function](https://docs.cloud.google.com/bigquery/docs/user-defined-functions),
a [table function](https://docs.cloud.google.com/bigquery/docs/table-functions)
([Preview](https://cloud.google.com/products/#product-launch-stages)), or
a [stored procedure](https://docs.cloud.google.com/bigquery/docs/procedures).

**`--table={true|false}` or `-t={true|false}`**
:   To delete a table or view, set to `true`. The default value is
`false`.

**`--transfer_config={true|false}`**
:   To delete a transfer configuration, set to `true`. The
default value is `false`.

**`RESOURCE`**
:   The resource that you want to remove.

For more information about using the `bq rm` command, see the following:

- [Managing datasets](https://docs.cloud.google.com/bigquery/docs/managing-datasets)
- [Managing jobs](https://docs.cloud.google.com/bigquery/docs/managing-jobs)
- [Managing tables](https://docs.cloud.google.com/bigquery/docs/managing-tables)
- [Managing views](https://docs.cloud.google.com/bigquery/docs/managing-views)
- [Working with transfers](https://docs.cloud.google.com/bigquery/docs/working-with-transfers)
- [Deleting table snapshots](https://docs.cloud.google.com/bigquery/docs/table-snapshots-delete)

#### `bq set-iam-policy`

Use the `bq set-iam-policy` command to specify or update the
[IAM policy](https://docs.cloud.google.com/iam/docs/reference/rest/v1/Policy#binding)
for a resource. The resource can be a table, a view, or a
[slot reservation](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#slot_reservations).
After setting the policy, the new policy is
printed to `stdout`. The policy is in JSON format.

The `etag` field in the updated policy must match the `etag` value of the
current policy, otherwise the update fails. This feature prevents concurrent
updates.

You can obtain the current policy and `etag` value for a resource by using the
[`bq get-iam-policy`](bq-cli-reference-2.md#bq-get-iam-policy) command.

> [!NOTE]
> **Note:** `bq set-iam-policy` does not support datasets. To modify access to a dataset, see [Grant access to a dataset](https://docs.cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset) or [Revoke access to a dataset](https://docs.cloud.google.com/bigquery/docs/control-access-to-resources-iam#revoke_access_to_a_dataset).

##### Synopsis

```text
bq set-iam-policy [FLAGS] RESOURCE FILE_NAME
```

##### Examples

```text
bq set-iam-policy myDataset.myTable policy.json
```

```text
bq set-iam-policy --reservation myReservation policy.json
```

##### Flags and arguments

The `bq set-iam-policy` command uses the following flags and
arguments.

**`--table={true|false}` or `-t={true|false}`**
:   Optional. To set the IAM policy
of a table or view, set to `true`. The default
value is `false`.

**`--reservation={true|false}`**
:   To set the IAM policy of a reservation, set to `true`
([Preview](https://cloud.google.com/products/#product-launch-stages)). The
default value is `false`. When this flag is used, `RESOURCE`
is treated as a reservation identifier. The reservation can have optional
project and location prefixes: `myProject:myLocation.myReservation`.

<var translate="no">RESOURCE</var> is the table or view whose policy you want to
update.

<var translate="no">FILE_NAME</var> is the name of a file containing the policy in JSON format.

For more information about the `bq set-iam-policy` command, see
[Control access to resources with IAM](https://docs.cloud.google.com/bigquery/docs/control-access-to-resources-iam#bq).

#### `bq show`

Use the `bq show` command to display information about a resource.

##### Synopsis

```text
bq show [FLAGS] [RESOURCE]
```

##### Flags and arguments

The `bq show` command uses the following flags and arguments:

**`--assignee_id=ASSIGNEE`**
:   When used with the `--reservation_assignment` flag, specifies the ID of a
folder, organization, or project. Use the `--assignee_type` flag to specify
which type of assignee to show.

**`--assignee_type=TYPE`**
:   When used with the `--reservation_assignment` flag, specifies the type of
entity to show. Use one of the following values:

- `FOLDER`
- `ORGANIZATION`
- `PROJECT`

**`--connection={true|false}`**
:   To show information about a connection, set to `true`. The default value is
`false`. For more information, see
[Viewing a connection resource](https://docs.cloud.google.com/bigquery/docs/working-with-connections#view-connections).

**`--dataset={true|false}` or `-d={true|false}`**
:   To show information about a dataset, set to `true`.
The default value is `false`.

**`--encryption_service_account={true|false}`**
:   To show the encryption service account for a project, if it exists, or create
one if it doesn't exist, set to `true`. The default value is `false`. Use with
the [`--project_id`](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#project_id_flag) flag.

**`--job={true|false}` or `-j={true|false}`**
:   To show information about a job, set to `true`. The default
value is `false`.

**`--job_type=JOB_TYPE`**
:   When used with the `--reservation_assignment` flag,
specifies the job type of the reservation assignments you want to show. Use
one of the following values:

- `QUERY`
- `PIPELINE`
- `ML_EXTERNAL`

**`--model={true|false}` or `-m={true|false}`**
:   To show information about a BigQuery ML model, set to `true`. The
default value is `false`.

**`--reservation={true|false}`**
:   To show information about a reservation, set to `true`. The default value is
`false`.

**`--reservation_assignment={true|false}`**
:   When set to `true`, the command displays reservation assignments for a
specified
folder, organization, or project. The command displays the target resource's
explicit assignments, if any; otherwise, displays assignments
inherited from parent resources. For example, a project might inherit
assignments from its parent folder. When using this flag, the `--job_type`,
`--assignee_type`, and `--assignee_id` flags apply. The default value is
`false`.

**`--routine={true|false}`**
:   To show information about a routine, set to `true`. The default value is
`false`. A routine can be a
[persistent user-defined function](https://docs.cloud.google.com/bigquery/docs/user-defined-functions),
a [table function](https://docs.cloud.google.com/bigquery/docs/table-functions)
([Preview](https://cloud.google.com/products/#product-launch-stages)), or
a [stored procedure](https://docs.cloud.google.com/bigquery/docs/procedures).

**`--schema={true|false}`**
:   To display only the table's schema, set to `true`. The default
value is `false`.

**`--transfer_config={true|false}`**
:   To display information about a transfer configuration, set to `true`. The
default value is `false`.

**`--transfer_run={true|false}`**
:   To display information about a transfer run, set to `true`. The default value
is `false`.

**`--view={true|false}`**
:   To display information about a view, set to `true`. The default
value is `false`.

**`RESOURCE`**
:   The resource whose information you want to show.

For more information about using the `bq show` command, see the following:

- [Getting information about datasets](https://docs.cloud.google.com/bigquery/docs/dataset-metadata)
- [Creating and using tables](https://docs.cloud.google.com/bigquery/docs/tables)
- [Getting information about views](https://docs.cloud.google.com/bigquery/docs/view-metadata)
- [Working with transfers](https://docs.cloud.google.com/bigquery/docs/working-with-transfers)
- [Managing jobs](https://docs.cloud.google.com/bigquery/docs/managing-jobs)
- [Getting information about a table snapshot](https://docs.cloud.google.com/bigquery/docs/table-snapshots-metadata)

#### `bq update`

Use the `bq update` command to change a resource.

##### Synopsis

```text
bq update [FLAGS] [RESOURCE]
```

##### Flags and arguments

The `bq update` command uses the following flags and arguments:

**`--add_tags=TAGS`**
:   Only available on datasets and tables. Specifies the
[tags](https://docs.cloud.google.com/bigquery/docs/tags) that you
are attaching to the resource, separated by commas. For example,
`556741164180/env:prod,myProject/department:sales`. Each tag must have the
[namespaced key name and value short name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions).

**`--autoscale_max_slots=NUMBER_OF_AUTOSCALING_SLOTS`**
:   the number of autoscaling slots assigned to the reservation. This is equal to
the value of the max reservation size minus the number of baseline slots. Only
available with the `--reservation` flag and if the reservation was created
with an [edition](https://docs.cloud.google.com/bigquery/docs/editions-intro).

**`--capacity_commitment={true|false}`**
:   To update a capacity commitment, set to `true`.
Use this flag with the `--merge`, `--plan`, `--renewal_plan`, `--split`, and
`--slots` flags.

**`--clear_all_tags={true|false}`**
:   Only available on datasets and tables. To clear all
[tags](https://docs.cloud.google.com/bigquery/docs/tags) from a
resource, set to `true`. The default value is `false`.

**`--clear_label=KEY:VALUE`**
:   Removes a label from the resource. Use the format
`KEY:VALUE` to specify the label to remove.
Repeat this flag to remove multiple labels.

**`--clustering_fields=COLUMNS`**
:   Updates a table's [clustering](https://docs.cloud.google.com/bigquery/docs/clustered-tables) specification. The
<var translate="no">COLUMNS</var> value is a comma-separated
list of column names to use for clustering. To remove the clustering, set
<var translate="no">COLUMNS</var> to `""` (the empty string). For more information, see
[Modify the clustering specification](https://docs.cloud.google.com/bigquery/docs/manage-clustered-tables#modifying-cluster-spec).

**`--target_job_concurrency=CONCURRENCY`**
:   When used with the
`--reservation` flag, specifies the target number of
queries that execute simultaneously. The default value is 0, which means
that the concurrency is automatically set based on the reservation size.
For more information, see [Use query queues](https://docs.cloud.google.com/bigquery/docs/query-queues).

**`--dataset={true|false}` or `-d={true|false}`**
:   To update a dataset, set to `true`. The default value is `false`.

**`--default_kms_key=KEY`**
:   Specifies the default Cloud KMS
[key resource ID](https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption#key_resource_id)
for encrypting table data in a dataset. The default key is used if no explicit
key is provided for a table creation or a query.

**`--default_partition_expiration=SECONDS`**

:   An integer that specifies the default expiration time, in seconds, for all
partitions in newly created partitioned tables in the dataset. This flag has
no minimum value.

A partition's expiration time is set to the partition's UTC date plus the
integer value. If this property is set, then it overrides the dataset-level
default
table expiration if it exists. If you supply the
`--time_partitioning_expiration` flag when you create or update a partitioned
table, then the table-level partition expiration takes precedence over the
dataset-level default partition expiration. Specify `0` to remove an existing
expiration.

**`--default_table_expiration=SECONDS`**

:   An integer that updates the default lifetime,
in seconds, for newly created tables in a dataset. The expiration time is set
to the current UTC time plus this value. Specify `0` to remove the existing
expiration.

**`--description=DESCRIPTION`**

:   Updates the description of a dataset, table,
table snapshot,
model, or view.

**`--destination_reservation_id=RESERVATION_ID`**

:   When used with the `--reservation_assignment` flag, moves an existing
reservation assignment to the specified reservation. The value is the ID of
the destination reservation. For more information, see
[Move an assignment to a different reservation](https://docs.cloud.google.com/bigquery/docs/reservations-assignments#move_an_assignment_to_a_different_reservation).

**`--display_name=DISPLAY_NAME`**

:   Updates the display name for a transfer configuration.

**`--etag=ETAG`**

:   Acts as a filter; updates the resource only if the resource has an
[ETag](https://docs.cloud.google.com/storage/docs/xml-api/reference-headers#etag) that
matches the string specified in the `ETAG` argument.

`--expiration SECONDS`

:   To update the expiration for the table, model,
table snapshot,
or view, include this flag.
Replace `SECONDS` with the number of seconds from the
update time to the expiration time. To remove the expiration for a table,
model,
table snapshot,
or view, set the `SECONDS` argument to 0.

**`--external_table_definition={TABLE::PATH_TO_FILE|TABLE::DEFINITION}`**

:   Updates an external table with the specified
[table definition](https://docs.cloud.google.com/bigquery/external-table-definition). The table definition
can be a path to a local JSON table definition
file or an inline table definition in the format
`SCHEMA@SOURCE_FORMAT=CLOUD_STORAGE_URI`.
The `SCHEMA` value is
a comma-separated list of column definitions in the form
`FIELD:DATA_TYPE,
FIELD:DATA_TYPE`.
If you use a table definition file, don't add an extension to the filename.

For example:

```text
--external_table_definition=myTable::/tmp/tabledef
```

```text
--external_table_definition=myTable::Region:STRING,Quarter:STRING,Total_sales:INTEGER@CSV=gs://mybucket/sales.csv
```

<br />

**`--ignore_idle_slots={true|false}`**

:   Use with the `--reservation` flag. To restrict jobs running in the specified
reservation to only use slots allocated to that reservation, set to `true`.
The default value is `false`; jobs in the specified reservation can use idle
slots from other reservations, or slots that are not
allocated to any reservation. For more information, see
[Idle slots](https://docs.cloud.google.com/bigquery/docs/slots#idle_slots).

**`--max_staleness=INTERVAL`**

:   Specifies an [INTERVAL](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#interval_type)
value that determines the maximum staleness allowed when querying a
materialized view or an external table. The default value is `0-0 0 0:0:0`.

For example:

- 1 day: `0-0 1 0:0:0`
- 1 hour: `0-0 0 1:0:0`

To use this flag, you must specify a table definition with the
`--external_table_definition` flag.

**`--max_time_travel_hours=HOURS`**

:   Specifies the duration in
hours of the
[time travel window](https://docs.cloud.google.com/bigquery/docs/time-travel#configure_the_time_travel_window)
for the dataset. The `--max_time_travel_hours` value must
be an integer expressed in multiples of 24 (48, 72, 96, 120, 144, 168)
between 48 (2 days) and 168 (7 days).

**`--merge={true|false}`**

:   To merge two capacity commitments, set `--merge` to `true`. Set the
`--capacity_commitment` flag to `true`, specify the location of the
commitments you want to merge by using the `--location` flag, and replace
`RESOURCE` with the IDs of the two commitments you want
to merge, separated by a comma. For more information, see
[Merge two commitments](https://docs.cloud.google.com/bigquery/docs/reservations-commitments#merging-commitments).

**`--metadata_cache_mode=METADATA_CACHE_MODE`**

:   Enables metadata cache for an external table with a connection. Use one of the
following values:

- `AUTOMATIC`
- `MANUAL`

Specify `AUTOMATIC` to automatically refresh the cached metadata. Specify
`MANUAL` to stop the automatic refresh. To use this flag, you must specify a
table definition with the `--external_table_definition` flag.

**`--model={true|false}` or `-m={true|false}`**

:   To update metadata for a BigQuery ML model, set to `true`. The
default value is `false`.

**`--params={"PARAMETER":"VALUE"} or -p={"PARAMETER":"VALUE"}`**

:   Updates parameters for a transfer configuration. The
parameters vary depending on the data source. For more information, see
[Introduction to BigQuery Data Transfer Service](https://docs.cloud.google.com/bigquery/docs/dts-introduction).

**`--plan=PLAN`**

:   When used with the `--capacity_commitment` flag, converts a capacity
commitment to the specified longer-duration commitment plan.
Replace `PLAN` with one of the following:

- `ANNUAL`
- `THREE_YEAR`

**`--refresh_window_days=DAYS`**

:   An integer that specifies an updated refresh window
(in days) for a transfer configuration.

**`--remove_tags=TAG_KEYS`**

:   Only available on datasets and tables. Specifies the [tags](https://docs.cloud.google.com/bigquery/docs/tags) that you
are removing from the resource, separated by commas---for example,
`556741164180/env,myProject/department`. Each tag key must have the
[namespaced key name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions).

**`--renewal_plan=PLAN`**

:   When used with the `--capacity_commitment` flag, updates the renewal plan
for an annual capacity commitment.
Replace `PLAN` with one of the following:

- `ANNUAL`
- `THREE_YEAR`
- `NONE`

Customers using legacy flat-rate pricing also may use one of the following
values:

- `FLEX`
- `MONTHLY`
- `ANNUAL`

**`--reservation={true|false}`**

:   Specifies whether to update a reservation. The default value is
`false`.

**`--reservation_assignment={true|false}`**

:   Specifies whether to update a reservation assignment. The default
value is `false`.

**`--schema={SCHEMA_FILE|SCHEMA`}**

:   Specifies either the path to a local JSON schema file or a comma-separated
list of column definitions in the form
`FIELD:DATA_TYPE,
FIELD:DATA_TYPE`.
If you use a schema file, don't add an extension to the filename.

For example:

```text
--schema=/tmp/tabledef
```

```text
--schema=Region:STRING,Quarter:STRING,Total_sales:INTEGER
```

<br />

**`--service_account_name=SERVICE_ACCOUNT`**

:   Specifies a service account to be used as the credential for a transfer
configuration.

**`--set_label=KEY:VALUE`**

:   Specifies a label to update. To update multiple labels, repeat this flag.

**`--slots=NUMBER_OF_BASELINE_SLOTS`**

:   When used with the `--capacity_commitment` and `--split` flags, specifies the
number of baseline slots to split from an existing capacity commitment into a new
commitment. Replace `RESOURCE` with the ID of the
commitment you want to split from.

When used with the `--reservation` flag, updates the number of
slots in a reservation.

**`--source=FILE`**

:   The path to a local JSON file containing a payload used to update a
resource. For example, you can use this flag to specify a JSON file that
contains a [dataset](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/datasets)
resource with an updated `access` property. The file is used to overwrite
the dataset's access controls. The JSON file must not include a byte order
mark (BOM).

**`--split={true|false}`**

:   When set to `true` and used with the `--capacity_commitment` flag, specifies
that you want to split an existing capacity commitment. Use the `--location`
flag to specify the location of the
commitment you want to split from, and use the `--slots` flag to specify the
number of slots you want to split off. Replace
`RESOURCE` with the ID of the commitment you want to
split from. For more information, see
[Split a commitment](https://docs.cloud.google.com/bigquery/docs/reservations-commitments#splitting-commitments).

**`--storage_billing_model=BILLING_MODEL`**

:   Specifies the
[storage billing model](https://docs.cloud.google.com/bigquery/docs/datasets-intro#dataset_storage_billing_models)
for a dataset. Set the `--storage_billing_model` value to `PHYSICAL` to use
physical bytes when calculating storage charges, or to `LOGICAL` to use
logical bytes.

When you change a dataset's billing model, it takes 24 hours for the
change to take effect.

Once you change a dataset's storage billing model, you must wait 14 days
before you can change the storage billing model again.

**`--table={true|false}` or `-t={true|false}`**

:   Specifies whether to update a table. The default value is
`false`.

**`--target_dataset=DATASET`**

:   When specified, updates the target dataset for a transfer
configuration.

**`--time_partitioning_expiration=SECONDS`**

:   An integer that updates (in seconds) when
a time-based partition should be deleted. The expiration time evaluates to the
partition's UTC date plus the integer value. A negative number indicates no
expiration.

**`--time_partitioning_field=COLUMN_NAME`**

:   Updates the field used to determine how to create
a time-based partition. If time-based partitioning is enabled without this
value, then the table is partitioned based on the load time.

**`--time_partitioning_type=INTERVAL`**

:   Specifies the partitioning type. Use one of the following values:

- `DAY`
- `HOUR`
- `MONTH`
- `YEAR`

You can't change the partitioning type of an existing table.

**`--transfer_config={true|false}`**

:   Specifies whether to update a transfer configuration.
The default value is `false`.

**`--update_credentials={true|false}`**

:   Specifies whether to update the transfer configuration
credentials. The default value is `false`.

**`--use_legacy_sql={true|false}`**

:   Set to `false` to update the SQL query for a view
from legacy SQL to GoogleSQL. The default value is determined by your [configuration settings](https://docs.cloud.google.com/bigquery/docs/default-configuration). If the configuration setting is not specified, the default value is `true`; the query uses
legacy SQL.

**`--vertex_ai_model_id=VERTEX_AI_MODEL_ID`**

:   When specified, updates the model ID for a BigQuery ML model
that is registered in the Vertex AI Model Registry.

**`--view=QUERY`**

:   When specified, updates the SQL query for a view.

**`--view_udf_resource=FILE`**

:   Updates the Cloud Storage URI or the path to a local code
file that is loaded and evaluated immediately as a user-defined function
resource in a view's SQL query. Repeat this flag to specify multiple files.

**`RESOURCE`**

:   The resource that you want to update.

For more information about using the `bq update` command, see the following:

- [Updating dataset properties](https://docs.cloud.google.com/bigquery/docs/updating-datasets)
- [Managing tables](https://docs.cloud.google.com/bigquery/docs/managing-tables)
- [Updating views](https://docs.cloud.google.com/bigquery/docs/managing-views#update_a_view)
- [Updating labels](https://docs.cloud.google.com/bigquery/docs/updating-labels)
- [Working with transfers](https://docs.cloud.google.com/bigquery/docs/working-with-transfers)
- [Updating table snapshot metadata](https://docs.cloud.google.com/bigquery/docs/table-snapshots-update)

#### `bq version`

Use the `bq version` command to display the version number of your bq command-line tool.

##### Synopsis

```text
bq version
```

> [!NOTE]
> **Note:** You can see the version number of all components in your Google Cloud CLI installation by using the [`gcloud version`](https://docs.cloud.google.com/sdk/gcloud/reference/version) command.

#### `bq wait`

Use the `bq wait` command to wait a specified number of seconds for a job
to finish. If a job isn't specified, then the command waits for the current
job to finish.

##### Synopsis

```text
bq wait [FLAGS] [JOB] [SECONDS]
```

##### Examples

```text
bq wait
```

```text
bq wait --wait_for_status=RUNNING 12345 100
```

##### Flags and arguments

The `bq wait` command uses the following flags and arguments:

**`--fail_on_error={true|false}`**
:   To return success if the job completed during the wait time, even if the job
failed, set to `false`.
The default value is `true`; after the wait time elapses, the command exits
with an error if the job is still running, or if the job completed but
failed.

**`--wait_for_status=STATUS`**

:   When specified, waits for a particular job status before
exiting. Use one of the following values:

- `PENDING`
- `RUNNING`
- `DONE`

The default value is `DONE`.

**`JOB`**

:   Specifies the job to wait for. You can use the `bq ls --jobs myProject`
command to find a job identifier.

**`SECONDS`**

:   Specifies the maximum number of seconds to wait until the job is finished. If
you enter `0`, then the command polls for job completion and returns
immediately. If you don't specify an integer value, then the command waits
until the job is finished.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; definition-list bodies are un-indented by four spaces so that they are not read as code; the `:` markers of the twin are kept (GitHub Markdown has no definition lists); indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 3 files at section boundaries; this is part 3.
- Source inconsistency (the text above is verbatim): this page says "don't add an extension to the filename" for schema and table definition files, but the `bq load` example of the bq command-line tool reference uses `./info_schema.json`, and the Specifying a schema page (https://docs.cloud.google.com/bigquery/docs/schemas) uses `./myschema.json`.
- Corrected from the official docs: the short form of `--recursive` is written `-r{true|false}`, without the `=` that every other `-x={true|false}` short form on this page has. It is changed to `-r={true|false}`.

## Related

- [Index of this directory](./README.md)
- [bq command-line tool reference (part 1 of 3)](./bq-cli-reference-1.md)
- [bq command-line tool reference (part 2 of 3)](./bq-cli-reference-2.md)
