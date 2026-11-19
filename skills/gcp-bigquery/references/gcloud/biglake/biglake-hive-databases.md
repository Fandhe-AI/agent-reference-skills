---
source: https://docs.cloud.google.com/sdk/gcloud/reference/biglake/hive/databases
---

# gcloud biglake hive databases

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud biglake hive databases create

```text
NAME
    gcloud biglake hive databases create - creates a BigLake Hive database

SYNOPSIS
    gcloud biglake hive databases create (DATABASE : --catalog=CATALOG)
        [--description=DESCRIPTION] [--location-uri=LOCATION_URI]
        [--parameters=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a BigLake Hive database.

EXAMPLES
    To create a BigLake Hive database named my-database in catalog my-catalog,
    run:

        $ gcloud biglake hive databases create my-database \
            --catalog=my-catalog

    To create a BigLake Hive database named my-database in catalog my-catalog,
    with bucket gs://my-bucket, parameters key1=value1,key2=value2 and
    description My new database, run:

        $ gcloud biglake hive databases create my-database \
            --catalog=my-catalog --location-uri=gs://my-bucket \
            --description="My new database" \
            --parameters=key1=value1,key2=value2

POSITIONAL ARGUMENTS
     Hive database resource - The Hive Database to create. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument database on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATABASE
          ID of the hive_database or fully qualified identifier for the
          hive_database.

          To set the database attribute:
          + provide the argument database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          Name of the Hive catalog to use.

          To set the catalog attribute:
          + provide the argument database on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

FLAGS
     --description=DESCRIPTION
        Description of the Hive database.

     --location-uri=LOCATION_URI
        The Cloud Storage location path where the database data will be stored.
        Format: gs://bucket/path/to/database

     --parameters=[KEY=VALUE,...]
        Additional parameters associated with the database.

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

        $ gcloud alpha biglake hive databases create

        $ gcloud beta biglake hive databases create
```

### gcloud biglake hive databases delete

```text
NAME
    gcloud biglake hive databases delete - deletes a BigLake Hive database

SYNOPSIS
    gcloud biglake hive databases delete (DATABASE : --catalog=CATALOG)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a BigLake Hive database.

EXAMPLES
    To delete a BigLake Hive database named my-database in catalog my-catalog,
    run:

        $ gcloud biglake hive databases delete my-database \
            --catalog=my-catalog

POSITIONAL ARGUMENTS
     Hive database resource - The Hive Database to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument database on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATABASE
          ID of the hive_database or fully qualified identifier for the
          hive_database.

          To set the database attribute:
          + provide the argument database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          Name of the Hive catalog to use.

          To set the catalog attribute:
          + provide the argument database on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

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

        $ gcloud alpha biglake hive databases delete

        $ gcloud beta biglake hive databases delete
```

### gcloud biglake hive databases describe

```text
NAME
    gcloud biglake hive databases describe - describes a BigLake Hive database

SYNOPSIS
    gcloud biglake hive databases describe (DATABASE : --catalog=CATALOG)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes a BigLake Hive database.

EXAMPLES
    To describe a BigLake Hive database, run:

        $ gcloud biglake hive databases describe my-database \
            --catalog=my-catalog

POSITIONAL ARGUMENTS
     Hive database resource - The Hive Database to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument database on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATABASE
          ID of the hive_database or fully qualified identifier for the
          hive_database.

          To set the database attribute:
          + provide the argument database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          Name of the Hive catalog to use.

          To set the catalog attribute:
          + provide the argument database on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

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

        $ gcloud alpha biglake hive databases describe

        $ gcloud beta biglake hive databases describe
```

### gcloud biglake hive databases get-iam-policy

```text
NAME
    gcloud biglake hive databases get-iam-policy - get the IAM policy for a
        BigLake Hive catalog database

SYNOPSIS
    gcloud biglake hive databases get-iam-policy (DATABASE : --catalog=CATALOG)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets the IAM policy for a BigLake Hive catalog database.

EXAMPLES
    To get the IAM policy for the catalog my-catalog and database my-database
    run:

        $ gcloud biglake hive databases get-iam-policy my-database \
            --catalog=my-catalog

POSITIONAL ARGUMENTS
     Database resource - The Hive Database to get the IAM policy for. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument database on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATABASE
          ID of the database or fully qualified identifier for the database.

          To set the database attribute:
          + provide the argument database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The Hive Catalog for the resource.

          To set the catalog attribute:
          + provide the argument database on the command line with a fully
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake hive databases get-iam-policy

        $ gcloud beta biglake hive databases get-iam-policy
```

### gcloud biglake hive databases list

```text
NAME
    gcloud biglake hive databases list - list BigLake Hive databases in a
        catalog

SYNOPSIS
    gcloud biglake hive databases list --catalog=CATALOG [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List BigLake Hive databases in a catalog.

EXAMPLES
    To list all BigLake Hive databases in catalog my-catalog, run:

        $ gcloud biglake hive databases list --catalog=my-catalog

REQUIRED FLAGS
     Hive catalog resource - Arguments and flags that specify the Hive catalog
     to list databases from. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --catalog=CATALOG
          ID of the hive_catalog or fully qualified identifier for the
          hive_catalog.

          To set the catalog attribute:
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

        $ gcloud alpha biglake hive databases list

        $ gcloud beta biglake hive databases list
```

### gcloud biglake hive databases set-iam-policy

```text
NAME
    gcloud biglake hive databases set-iam-policy - set the IAM policy for a
        BigLake Hive catalog database

SYNOPSIS
    gcloud biglake hive databases set-iam-policy (DATABASE : --catalog=CATALOG)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for a BigLake Hive catalog database.

EXAMPLES
    To set the IAM policy for the catalog my-catalog and database my-database
    with the policy in policy.json run:

        $ gcloud biglake hive databases set-iam-policy my-database \
            policy.json --catalog=my-catalog

POSITIONAL ARGUMENTS
     Database resource - The Hive Database to set the IAM policy for. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument database on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATABASE
          ID of the database or fully qualified identifier for the database.

          To set the database attribute:
          + provide the argument database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The Hive Catalog for the resource.

          To set the catalog attribute:
          + provide the argument database on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

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

        $ gcloud alpha biglake hive databases set-iam-policy

        $ gcloud beta biglake hive databases set-iam-policy
```

### gcloud biglake hive databases update

```text
NAME
    gcloud biglake hive databases update - updates a BigLake Hive database

SYNOPSIS
    gcloud biglake hive databases update (DATABASE : --catalog=CATALOG)
        [--description=DESCRIPTION] [--location-uri=LOCATION_URI]
        [--parameters=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates a BigLake Hive database.

EXAMPLES
    To update a BigLake Hive database named my-database in catalog my-catalog
    with a new location, description, and parameters, run:

        $ gcloud biglake hive databases update my-database \
            --catalog=my-catalog \
            --location-uri=gs://my-bucket/new-location \
            --description="Updated description" \
            --parameters=key1=value1,key2=value2

POSITIONAL ARGUMENTS
     Hive database resource - The Hive Database to update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument database on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATABASE
          ID of the hive_database or fully qualified identifier for the
          hive_database.

          To set the database attribute:
          + provide the argument database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          Name of the Hive catalog to use.

          To set the catalog attribute:
          + provide the argument database on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

FLAGS
     --description=DESCRIPTION
        The description of the Hive database.

     --location-uri=LOCATION_URI
        The Cloud Storage location path where the database exists. Format:
        gs://bucket/path/to/database

     --parameters=[KEY=VALUE,...]
        Additional parameters associated with the Hive database.

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

        $ gcloud alpha biglake hive databases update

        $ gcloud beta biglake hive databases update
```

### gcloud beta biglake hive databases create

```text
NAME
    gcloud beta biglake hive databases create - creates a BigLake Hive database

SYNOPSIS
    gcloud beta biglake hive databases create (DATABASE : --catalog=CATALOG)
        [--description=DESCRIPTION] [--location-uri=LOCATION_URI]
        [--parameters=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive databases delete

```text
NAME
    gcloud beta biglake hive databases delete - deletes a BigLake Hive database

SYNOPSIS
    gcloud beta biglake hive databases delete (DATABASE : --catalog=CATALOG)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive databases describe

```text
NAME
    gcloud beta biglake hive databases describe - describes a BigLake Hive
        database

SYNOPSIS
    gcloud beta biglake hive databases describe (DATABASE : --catalog=CATALOG)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive databases get-iam-policy

```text
NAME
    gcloud beta biglake hive databases get-iam-policy - get the IAM policy for
        a BigLake Hive catalog database

SYNOPSIS
    gcloud beta biglake hive databases get-iam-policy
        (DATABASE : --catalog=CATALOG) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive databases list

```text
NAME
    gcloud beta biglake hive databases list - list BigLake Hive databases in a
        catalog

SYNOPSIS
    gcloud beta biglake hive databases list --catalog=CATALOG
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive databases set-iam-policy

```text
NAME
    gcloud beta biglake hive databases set-iam-policy - set the IAM policy for
        a BigLake Hive catalog database

SYNOPSIS
    gcloud beta biglake hive databases set-iam-policy
        (DATABASE : --catalog=CATALOG) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive databases update

```text
NAME
    gcloud beta biglake hive databases update - updates a BigLake Hive database

SYNOPSIS
    gcloud beta biglake hive databases update (DATABASE : --catalog=CATALOG)
        [--description=DESCRIPTION] [--location-uri=LOCATION_URI]
        [--parameters=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive databases create

```text
NAME
    gcloud alpha biglake hive databases create - creates a BigLake Hive
        database

SYNOPSIS
    gcloud alpha biglake hive databases create (DATABASE : --catalog=CATALOG)
        [--description=DESCRIPTION] [--location-uri=LOCATION_URI]
        [--parameters=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive databases delete

```text
NAME
    gcloud alpha biglake hive databases delete - deletes a BigLake Hive
        database

SYNOPSIS
    gcloud alpha biglake hive databases delete (DATABASE : --catalog=CATALOG)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive databases describe

```text
NAME
    gcloud alpha biglake hive databases describe - describes a BigLake Hive
        database

SYNOPSIS
    gcloud alpha biglake hive databases describe (DATABASE : --catalog=CATALOG)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive databases get-iam-policy

```text
NAME
    gcloud alpha biglake hive databases get-iam-policy - get the IAM policy for
        a BigLake Hive catalog database

SYNOPSIS
    gcloud alpha biglake hive databases get-iam-policy
        (DATABASE : --catalog=CATALOG) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive databases list

```text
NAME
    gcloud alpha biglake hive databases list - list BigLake Hive databases in a
        catalog

SYNOPSIS
    gcloud alpha biglake hive databases list --catalog=CATALOG
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive databases set-iam-policy

```text
NAME
    gcloud alpha biglake hive databases set-iam-policy - set the IAM policy for
        a BigLake Hive catalog database

SYNOPSIS
    gcloud alpha biglake hive databases set-iam-policy
        (DATABASE : --catalog=CATALOG) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive databases update

```text
NAME
    gcloud alpha biglake hive databases update - updates a BigLake Hive
        database

SYNOPSIS
    gcloud alpha biglake hive databases update (DATABASE : --catalog=CATALOG)
        [--description=DESCRIPTION] [--location-uri=LOCATION_URI]
        [--parameters=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/biglake/hive/databases (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
