---
source: https://docs.cloud.google.com/sdk/gcloud/reference/biglake/iceberg/tables
---

# gcloud biglake iceberg tables

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud biglake iceberg tables create

```text
NAME
    gcloud biglake iceberg tables create - create a BigLake Iceberg table

SYNOPSIS
    gcloud biglake iceberg tables create --create-from-file=CREATE_FROM_FILE
        (--namespace=NAMESPACE : --catalog=CATALOG) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a BigLake Iceberg table.

EXAMPLES
    To create a table my_table in parent catalog my-catalog and namespace
    my-namespace using a creation request from table_creation.json, run:

        $ gcloud biglake iceberg tables create --namespace=my-namespace \
            --catalog=my-catalog --create-from-file=table_creation.json

    The table name and schema fields are required and must be specified in
    table_creation.json.

    Example table_creation.json:

        {
          "name": "my_table",
          "location": "gs://my-catalog/my-namespace/my_table",
          "schema": {
            "type": "struct",
            "schema-id": 0,
            "fields": [
              {
                "id": 1,
                "name": "user_id",
                "required": true,
                "type": "long",
                "doc": "Unique identifier for the user"
              },
              {
                "id": 2,
                "name": "username",
                "required": false,
                "type": "string"
              }
            ]
          },
          "partition-spec": {
            "spec-id": 0,
            "fields": [
              {
                "name": "user_id_bucket",
                "transform": "bucket[5]",
                "source-id": 1,
                "partition-id": 1001
              }
            ]
          },
          "write-order": {
            "order-id": 0,
            "fields": [
              {
                "transform": "identity",
                "source-id": 1,
                "direction": "asc",
                "null-order": "nulls-last"
              }
            ]
          },
          "stage-create": false,
          "properties": {
            "owner": "owner",
            "environment": "test",
            "write.format.default": "parquet",
            "comment": "Creating a new table"
          }
        }

REQUIRED FLAGS
     --create-from-file=CREATE_FROM_FILE
        Path to a JSON file containing the table creation request. The format
        must follow the Apache Iceberg REST Catalog Open API specification for
        CreateTableRequest. The fields name and schema must be specified.

     Namespace resource - The Iceberg Namespace to create. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument --namespace on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --namespace=NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument --namespace on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --catalog=CATALOG
          The Iceberg Catalog for the resource.

          To set the catalog attribute:
          + provide the argument --namespace on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg tables create

        $ gcloud beta biglake iceberg tables create
```

### gcloud biglake iceberg tables delete

```text
NAME
    gcloud biglake iceberg tables delete - delete a BigLake Iceberg table

SYNOPSIS
    gcloud biglake iceberg tables delete
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a BigLake Iceberg table.

EXAMPLES
    To delete a table in parent catalog my-catalog and namespace my-namespace,
    run:

        $ gcloud biglake iceberg tables delete my-table \
            --namespace=my-namespace --catalog=my-catalog

POSITIONAL ARGUMENTS
     Table resource - The Iceberg Table to delete. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

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
          The Iceberg Catalog for the resource.

          To set the catalog attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --namespace=NAMESPACE
          The Iceberg Namespace for the resource.

          To set the namespace attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg tables delete

        $ gcloud beta biglake iceberg tables delete
```

### gcloud biglake iceberg tables describe

```text
NAME
    gcloud biglake iceberg tables describe - describe a BigLake Iceberg table

SYNOPSIS
    gcloud biglake iceberg tables describe
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE)
        [--snapshots=SNAPSHOTS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a BigLake Iceberg table.

EXAMPLES
    To describe table my-table in parent catalog my-catalog and namespace
    my-namespace, run:

        $ gcloud biglake iceberg tables describe my-table \
            --namespace=my-namespace --catalog=my-catalog

POSITIONAL ARGUMENTS
     Table resource - The Iceberg Table to describe. The arguments in this
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
          ID of the table or fully qualified identifier for the table.

          To set the table attribute:
          + provide the argument table on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The Iceberg Catalog for the resource.

          To set the catalog attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --namespace=NAMESPACE
          The Iceberg Namespace for the resource.

          To set the namespace attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

FLAGS
     --snapshots=SNAPSHOTS
        Snapshot to get.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg tables describe

        $ gcloud beta biglake iceberg tables describe
```

### gcloud biglake iceberg tables get-iam-policy

```text
NAME
    gcloud biglake iceberg tables get-iam-policy - get the IAM policy for a
        BigLake Iceberg REST catalog table

SYNOPSIS
    gcloud biglake iceberg tables get-iam-policy
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets the IAM policy for a BigLake Iceberg REST catalog table.

EXAMPLES
    To get the IAM policy for the catalog my-catalog, namespace my-namespace,
    and table my-table run:

        $ gcloud biglake iceberg tables get-iam-policy my-table \
            --catalog=my-catalog --namespace=my-namespace

POSITIONAL ARGUMENTS
     Table resource - The Iceberg Table to get the IAM policy for. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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
          The Iceberg Catalog for the resource.

          To set the catalog attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --namespace=NAMESPACE
          The Iceberg Namespace for the resource.

          To set the namespace attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

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

        $ gcloud alpha biglake iceberg tables get-iam-policy

        $ gcloud beta biglake iceberg tables get-iam-policy
```

### gcloud biglake iceberg tables list

```text
NAME
    gcloud biglake iceberg tables list - list BigLake Iceberg REST tables

SYNOPSIS
    gcloud biglake iceberg tables list
        (--namespace=NAMESPACE : --catalog=CATALOG) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List BigLake Iceberg REST tables.

EXAMPLES
    To list tables in parent catalog my-catalog and namespace my-namespace,
    run:

        $ gcloud biglake iceberg tables list --namespace=my-namespace \
            --catalog=my-catalog

REQUIRED FLAGS
     Namespace resource - The Iceberg Namespace to list tables from. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --namespace on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --namespace=NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument --namespace on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --catalog=CATALOG
          The Iceberg Catalog for the resource.

          To set the catalog attribute:
          + provide the argument --namespace on the command line with a fully
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

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg tables list

        $ gcloud beta biglake iceberg tables list
```

### gcloud biglake iceberg tables register

```text
NAME
    gcloud biglake iceberg tables register - register a BigLake Iceberg table

SYNOPSIS
    gcloud biglake iceberg tables register
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE)
        --metadata-location=METADATA_LOCATION [--overwrite]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Register a BigLake Iceberg table.

EXAMPLES
    To register table my-table in parent catalog my-catalog and namespace
    my-namespace, run:

        $ gcloud biglake iceberg tables register my-table \
            --namespace=my-namespace --catalog=my-catalog \
            --metadata-location=gs://my-bucket/metadata.json

    To overwrite table my-table in parent catalog my-catalog and namespace
    my-namespace, run:

        $ gcloud biglake iceberg tables register my-table \
            --namespace=my-namespace --catalog=my-catalog \
            --metadata-location=gs://my-bucket/metadata.json --overwrite

POSITIONAL ARGUMENTS
     Table resource - The Iceberg Table to register. The arguments in this
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
          ID of the table or fully qualified identifier for the table.

          To set the table attribute:
          + provide the argument table on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The Iceberg Catalog for the resource.

          To set the catalog attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --namespace=NAMESPACE
          The Iceberg Namespace for the resource.

          To set the namespace attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

REQUIRED FLAGS
     --metadata-location=METADATA_LOCATION
        Metadata location of the table.

OPTIONAL FLAGS
     --overwrite
        Overwrite the table if it already exists.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg tables register

        $ gcloud beta biglake iceberg tables register
```

### gcloud biglake iceberg tables set-iam-policy

```text
NAME
    gcloud biglake iceberg tables set-iam-policy - set the IAM policy for a
        BigLake Iceberg REST catalog table

SYNOPSIS
    gcloud biglake iceberg tables set-iam-policy
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for a BigLake Iceberg REST catalog table.

EXAMPLES
    To set the IAM policy for the catalog my-catalog, namespace my-namespace,
    and table my-table with the policy in policy.json run:

        $ gcloud biglake iceberg tables set-iam-policy my-table \
            policy.json --catalog=my-catalog --namespace=my-namespace

POSITIONAL ARGUMENTS
     Table resource - The Iceberg Table to set the IAM policy for. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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
          The Iceberg Catalog for the resource.

          To set the catalog attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --namespace=NAMESPACE
          The Iceberg Namespace for the resource.

          To set the namespace attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

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

        $ gcloud alpha biglake iceberg tables set-iam-policy

        $ gcloud beta biglake iceberg tables set-iam-policy
```

### gcloud biglake iceberg tables update

```text
NAME
    gcloud biglake iceberg tables update - update a BigLake Iceberg table

SYNOPSIS
    gcloud biglake iceberg tables update
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE) [--clear-properties]
        [--remove-properties=[KEY,...]] [--update-properties=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a BigLake Iceberg table.

EXAMPLES
    To add or update properties in a table my-table in parent catalog
    my-catalog and namespace my-namespace, with properties
    key1=value1,key2=value2, run:

        $ gcloud biglake iceberg tables update my-table \
            --namespace=my-namespace --catalog=my-catalog \
            --update-properties=key1=value1,key2=value2

    To remove properties key1,key2 from a table, run:

        $ gcloud biglake iceberg tables update my-table \
            --namespace=my-namespace --catalog=my-catalog \
            --remove-properties=key1,key2

    To clear all properties from a table, run:

        $ gcloud biglake iceberg tables update my-table \
            --namespace=my-namespace --catalog=my-catalog --clear-properties

POSITIONAL ARGUMENTS
     Table resource - The Iceberg Table to update. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

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
          The Iceberg Catalog for the resource.

          To set the catalog attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --namespace=NAMESPACE
          The Iceberg Namespace for the resource.

          To set the namespace attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

FLAGS
     --clear-properties
        Clear all properties from the namespace.

     --remove-properties=[KEY,...]
        List of properties to remove.

     --update-properties=[KEY=VALUE,...]
        List of properties to update or add.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg tables update

        $ gcloud beta biglake iceberg tables update
```

### gcloud beta biglake iceberg tables create

```text
NAME
    gcloud beta biglake iceberg tables create - create a BigLake Iceberg table

SYNOPSIS
    gcloud beta biglake iceberg tables create
        --create-from-file=CREATE_FROM_FILE
        (--namespace=NAMESPACE : --catalog=CATALOG) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg tables delete

```text
NAME
    gcloud beta biglake iceberg tables delete - delete a BigLake Iceberg table

SYNOPSIS
    gcloud beta biglake iceberg tables delete
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg tables describe

```text
NAME
    gcloud beta biglake iceberg tables describe - describe a BigLake Iceberg
        table

SYNOPSIS
    gcloud beta biglake iceberg tables describe
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE)
        [--snapshots=SNAPSHOTS] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg tables get-iam-policy

```text
NAME
    gcloud beta biglake iceberg tables get-iam-policy - get the IAM policy for
        a BigLake Iceberg REST catalog table

SYNOPSIS
    gcloud beta biglake iceberg tables get-iam-policy
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg tables list

```text
NAME
    gcloud beta biglake iceberg tables list - list BigLake Iceberg REST tables

SYNOPSIS
    gcloud beta biglake iceberg tables list
        (--namespace=NAMESPACE : --catalog=CATALOG) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg tables register

```text
NAME
    gcloud beta biglake iceberg tables register - register a BigLake Iceberg
        table

SYNOPSIS
    gcloud beta biglake iceberg tables register
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE)
        --metadata-location=METADATA_LOCATION [--overwrite]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg tables set-iam-policy

```text
NAME
    gcloud beta biglake iceberg tables set-iam-policy - set the IAM policy for
        a BigLake Iceberg REST catalog table

SYNOPSIS
    gcloud beta biglake iceberg tables set-iam-policy
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg tables update

```text
NAME
    gcloud beta biglake iceberg tables update - update a BigLake Iceberg table

SYNOPSIS
    gcloud beta biglake iceberg tables update
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE) [--clear-properties]
        [--remove-properties=[KEY,...]] [--update-properties=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg tables create

```text
NAME
    gcloud alpha biglake iceberg tables create - create a BigLake Iceberg table

SYNOPSIS
    gcloud alpha biglake iceberg tables create
        --create-from-file=CREATE_FROM_FILE
        (--namespace=NAMESPACE : --catalog=CATALOG) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg tables delete

```text
NAME
    gcloud alpha biglake iceberg tables delete - delete a BigLake Iceberg table

SYNOPSIS
    gcloud alpha biglake iceberg tables delete
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg tables describe

```text
NAME
    gcloud alpha biglake iceberg tables describe - describe a BigLake Iceberg
        table

SYNOPSIS
    gcloud alpha biglake iceberg tables describe
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE)
        [--snapshots=SNAPSHOTS] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg tables get-iam-policy

```text
NAME
    gcloud alpha biglake iceberg tables get-iam-policy - get the IAM policy for
        a BigLake Iceberg REST catalog table

SYNOPSIS
    gcloud alpha biglake iceberg tables get-iam-policy
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg tables list

```text
NAME
    gcloud alpha biglake iceberg tables list - list BigLake Iceberg REST tables

SYNOPSIS
    gcloud alpha biglake iceberg tables list
        (--namespace=NAMESPACE : --catalog=CATALOG) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg tables register

```text
NAME
    gcloud alpha biglake iceberg tables register - register a BigLake Iceberg
        table

SYNOPSIS
    gcloud alpha biglake iceberg tables register
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE)
        --metadata-location=METADATA_LOCATION [--overwrite]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg tables set-iam-policy

```text
NAME
    gcloud alpha biglake iceberg tables set-iam-policy - set the IAM policy for
        a BigLake Iceberg REST catalog table

SYNOPSIS
    gcloud alpha biglake iceberg tables set-iam-policy
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg tables update

```text
NAME
    gcloud alpha biglake iceberg tables update - update a BigLake Iceberg table

SYNOPSIS
    gcloud alpha biglake iceberg tables update
        (TABLE : --catalog=CATALOG --namespace=NAMESPACE) [--clear-properties]
        [--remove-properties=[KEY,...]] [--update-properties=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/biglake/iceberg/tables (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
