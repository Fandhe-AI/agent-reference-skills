---
source: https://docs.cloud.google.com/sdk/gcloud/reference/biglake/hive/tables
---

# gcloud biglake hive tables

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud biglake hive tables create

```text
NAME
    gcloud biglake hive tables create - create a BigLake Hive table

SYNOPSIS
    gcloud biglake hive tables create
        (TABLE : --catalog=CATALOG --database=DATABASE) --file=FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a BigLake Hive table.

EXAMPLES
    To create a table my_table in parent catalog my-catalog and database
    my-database using a creation request from table_creation.json, run:

        $ gcloud biglake hive tables create my_table \
            --database=my-database --catalog=my-catalog \
            --file=table_creation.json

    The storageDescriptor field is required and must be specified in the file.

    Example table_creation.json:

        {
          "name": "my_table",
          "storageDescriptor": {
            "locationUri": "gs://my-bucket/my-database/my_table",
            "inputFormat": "org.apache.hadoop.mapred.TextInputFormat",
            "outputFormat": "org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat",
            "serdeInfo": {
              "name": "my_table",
              "serializationLib": "org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe"
            },
            "columns": [
              {"name": "id", "type": "int"},
              {"name": "name", "type": "string"}
            ]
          },
          "parameters": {
            "EXTERNAL": "TRUE"
          }
        }

POSITIONAL ARGUMENTS
     Table resource - The Hive Table to create. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument table on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TABLE
          ID of the table or fully qualified identifier for the table.

          To set the table attribute:
          + provide the argument table on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The Hive Catalog for the resource.

          To set the catalog attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --database=DATABASE
          The Hive Database for the resource.

          To set the database attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --database on the command line.

REQUIRED FLAGS
     --file=FILE
        Path to a JSON or YAML file containing the Hive table definition. The
        format must follow the Hive Metastore API specification for HiveTable.
        The field storageDescriptor must be specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake hive tables create

        $ gcloud beta biglake hive tables create
```

### gcloud biglake hive tables delete

```text
NAME
    gcloud biglake hive tables delete - deletes a BigLake Hive table

SYNOPSIS
    gcloud biglake hive tables delete
        (TABLE : --catalog=CATALOG --database=DATABASE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a BigLake Hive table.

EXAMPLES
    To delete a BigLake Hive table named 'my-table' in database 'my-database'
    and catalog 'my-catalog', run:

        $ gcloud biglake hive tables delete my-table \
            --database=my-database --catalog=my-catalog

POSITIONAL ARGUMENTS
     Hive table resource - The Hive Table to delete. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument table on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TABLE
          ID of the hive_table or fully qualified identifier for the
          hive_table.

          To set the table attribute:
          + provide the argument table on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          Name of the Hive catalog to use.

          To set the catalog attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --database=DATABASE
          Name of the Hive database to use.

          To set the database attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --database on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the biglake/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/bigquery/

NOTES
    These variants are also available:

        $ gcloud alpha biglake hive tables delete

        $ gcloud beta biglake hive tables delete
```

### gcloud biglake hive tables describe

```text
NAME
    gcloud biglake hive tables describe - describes a BigLake Hive table

SYNOPSIS
    gcloud biglake hive tables describe
        (TABLE : --catalog=CATALOG --database=DATABASE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes a BigLake Hive table.

EXAMPLES
    To describe a BigLake Hive table, run:

        $ gcloud biglake hive tables describe my-table \
            --database=my-database --catalog=my-catalog

POSITIONAL ARGUMENTS
     Hive table resource - The Hive Table to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument table on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TABLE
          ID of the hive_table or fully qualified identifier for the
          hive_table.

          To set the table attribute:
          + provide the argument table on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          Name of the Hive catalog to use.

          To set the catalog attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --database=DATABASE
          Name of the Hive database to use.

          To set the database attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --database on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the biglake/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/bigquery/

NOTES
    These variants are also available:

        $ gcloud alpha biglake hive tables describe

        $ gcloud beta biglake hive tables describe
```

### gcloud biglake hive tables get-iam-policy

```text
NAME
    gcloud biglake hive tables get-iam-policy - get the IAM policy for a
        BigLake Hive catalog table

SYNOPSIS
    gcloud biglake hive tables get-iam-policy
        (TABLE : --catalog=CATALOG --database=DATABASE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets the IAM policy for a BigLake Hive catalog table.

EXAMPLES
    To get the IAM policy for the catalog my-catalog, database my-database, and
    table my-table run:

        $ gcloud biglake hive tables get-iam-policy my-table \
            --catalog=my-catalog --database=my-database

POSITIONAL ARGUMENTS
     Table resource - The Hive Table to get the IAM policy for. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument table on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TABLE
          ID of the table or fully qualified identifier for the table.

          To set the table attribute:
          + provide the argument table on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The Hive Catalog for the resource.

          To set the catalog attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --database=DATABASE
          The Hive Database for the resource.

          To set the database attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --database on the command line.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake hive tables get-iam-policy

        $ gcloud beta biglake hive tables get-iam-policy
```

### gcloud biglake hive tables list

```text
NAME
    gcloud biglake hive tables list - list BigLake Hive tables in a database

SYNOPSIS
    gcloud biglake hive tables list (--database=DATABASE : --catalog=CATALOG)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List BigLake Hive tables in a database.

EXAMPLES
    To list all BigLake Hive tables in database my-database and catalog
    my-catalog, run:

        $ gcloud biglake hive tables list --database=my-database \
            --catalog=my-catalog

REQUIRED FLAGS
     Hive database resource - Arguments and flags that specify the Hive
     database to list tables from. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --database on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --database=DATABASE
          ID of the hive_database or fully qualified identifier for the
          hive_database.

          To set the database attribute:
          + provide the argument --database on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --catalog=CATALOG
          Name of the Hive catalog to use.

          To set the catalog attribute:
          + provide the argument --database on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the biglake/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/bigquery/

NOTES
    These variants are also available:

        $ gcloud alpha biglake hive tables list

        $ gcloud beta biglake hive tables list
```

### gcloud biglake hive tables set-iam-policy

```text
NAME
    gcloud biglake hive tables set-iam-policy - set the IAM policy for a
        BigLake Hive catalog table

SYNOPSIS
    gcloud biglake hive tables set-iam-policy
        (TABLE : --catalog=CATALOG --database=DATABASE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for a BigLake Hive catalog table.

EXAMPLES
    To set the IAM policy for the catalog my-catalog, database my-database, and
    table my-table with the policy in policy.json run:

        $ gcloud biglake hive tables set-iam-policy my-table policy.json \
            --catalog=my-catalog --database=my-database

POSITIONAL ARGUMENTS
     Table resource - The Hive Table to set the IAM policy for. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument table on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TABLE
          ID of the table or fully qualified identifier for the table.

          To set the table attribute:
          + provide the argument table on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The Hive Catalog for the resource.

          To set the catalog attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --database=DATABASE
          The Hive Database for the resource.

          To set the database attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --database on the command line.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake hive tables set-iam-policy

        $ gcloud beta biglake hive tables set-iam-policy
```

### gcloud biglake hive tables update

```text
NAME
    gcloud biglake hive tables update - update a BigLake Hive table

SYNOPSIS
    gcloud biglake hive tables update
        (TABLE : --catalog=CATALOG --database=DATABASE)
        [--columns-from-file=COLUMNS_FROM_FILE] [--description=DESCRIPTION]
        [--location-uri=LOCATION_URI] [--parameters=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a BigLake Hive table.

EXAMPLES
    To update a table my_table in parent catalog my-catalog and database
    my-database with a new description and location URI, run:

        $ gcloud biglake hive tables update my_table \
            --database=my-database --catalog=my-catalog \
            --description="New description" \
            --location-uri="gs://my-bucket/my-database/my_table_new_location\
        "

    To update columns from a file, run:

        $ gcloud biglake hive tables update my_table \
            --database=my-database --catalog=my-catalog \
            --columns-from-file=columns.yaml

    Example columns.yaml:

          - name: id
            type: int
            comment: "identifier column"
          - name: name
            type: string

POSITIONAL ARGUMENTS
     Table resource - The Hive Table to update. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument table on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TABLE
          ID of the table or fully qualified identifier for the table.

          To set the table attribute:
          + provide the argument table on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The Hive Catalog for the resource.

          To set the catalog attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --database=DATABASE
          The Hive Database for the resource.

          To set the database attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --database on the command line.

FLAGS
     --columns-from-file=COLUMNS_FROM_FILE
        Path to a JSON or YAML file containing the new columns list. The format
        must follow the Hive Metastore specification for FieldSchema list. The
        list will replace the existing columns.

     --description=DESCRIPTION
        Description of the Hive table.

     --location-uri=LOCATION_URI
        The Cloud Storage location path where the table's data will be stored.
        Format: gs://bucket/path/to/table

     --parameters=[KEY=VALUE,...]
        Additional parameters associated with the table. Will replace existing
        parameters.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake hive tables update

        $ gcloud beta biglake hive tables update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud biglake hive tables update my_table \
    --database=my-database \
    --catalog=my-catalog \
    --description="New description" \
    --location-uri="gs://my-bucket/my-database/my_table_new_location"
```

### gcloud beta biglake hive tables create

```text
NAME
    gcloud beta biglake hive tables create - create a BigLake Hive table

SYNOPSIS
    gcloud beta biglake hive tables create
        (TABLE : --catalog=CATALOG --database=DATABASE) --file=FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive tables delete

```text
NAME
    gcloud beta biglake hive tables delete - deletes a BigLake Hive table

SYNOPSIS
    gcloud beta biglake hive tables delete
        (TABLE : --catalog=CATALOG --database=DATABASE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive tables describe

```text
NAME
    gcloud beta biglake hive tables describe - describes a BigLake Hive table

SYNOPSIS
    gcloud beta biglake hive tables describe
        (TABLE : --catalog=CATALOG --database=DATABASE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive tables get-iam-policy

```text
NAME
    gcloud beta biglake hive tables get-iam-policy - get the IAM policy for a
        BigLake Hive catalog table

SYNOPSIS
    gcloud beta biglake hive tables get-iam-policy
        (TABLE : --catalog=CATALOG --database=DATABASE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive tables list

```text
NAME
    gcloud beta biglake hive tables list - list BigLake Hive tables in a
        database

SYNOPSIS
    gcloud beta biglake hive tables list
        (--database=DATABASE : --catalog=CATALOG) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive tables set-iam-policy

```text
NAME
    gcloud beta biglake hive tables set-iam-policy - set the IAM policy for a
        BigLake Hive catalog table

SYNOPSIS
    gcloud beta biglake hive tables set-iam-policy
        (TABLE : --catalog=CATALOG --database=DATABASE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive tables update

```text
NAME
    gcloud beta biglake hive tables update - update a BigLake Hive table

SYNOPSIS
    gcloud beta biglake hive tables update
        (TABLE : --catalog=CATALOG --database=DATABASE)
        [--columns-from-file=COLUMNS_FROM_FILE] [--description=DESCRIPTION]
        [--location-uri=LOCATION_URI] [--parameters=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive tables create

```text
NAME
    gcloud alpha biglake hive tables create - create a BigLake Hive table

SYNOPSIS
    gcloud alpha biglake hive tables create
        (TABLE : --catalog=CATALOG --database=DATABASE) --file=FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive tables delete

```text
NAME
    gcloud alpha biglake hive tables delete - deletes a BigLake Hive table

SYNOPSIS
    gcloud alpha biglake hive tables delete
        (TABLE : --catalog=CATALOG --database=DATABASE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive tables describe

```text
NAME
    gcloud alpha biglake hive tables describe - describes a BigLake Hive table

SYNOPSIS
    gcloud alpha biglake hive tables describe
        (TABLE : --catalog=CATALOG --database=DATABASE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive tables get-iam-policy

```text
NAME
    gcloud alpha biglake hive tables get-iam-policy - get the IAM policy for a
        BigLake Hive catalog table

SYNOPSIS
    gcloud alpha biglake hive tables get-iam-policy
        (TABLE : --catalog=CATALOG --database=DATABASE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive tables list

```text
NAME
    gcloud alpha biglake hive tables list - list BigLake Hive tables in a
        database

SYNOPSIS
    gcloud alpha biglake hive tables list
        (--database=DATABASE : --catalog=CATALOG) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive tables set-iam-policy

```text
NAME
    gcloud alpha biglake hive tables set-iam-policy - set the IAM policy for a
        BigLake Hive catalog table

SYNOPSIS
    gcloud alpha biglake hive tables set-iam-policy
        (TABLE : --catalog=CATALOG --database=DATABASE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive tables update

```text
NAME
    gcloud alpha biglake hive tables update - update a BigLake Hive table

SYNOPSIS
    gcloud alpha biglake hive tables update
        (TABLE : --catalog=CATALOG --database=DATABASE)
        [--columns-from-file=COLUMNS_FROM_FILE] [--description=DESCRIPTION]
        [--location-uri=LOCATION_URI] [--parameters=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/biglake/hive/tables (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
