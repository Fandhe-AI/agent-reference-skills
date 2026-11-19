---
source: https://docs.cloud.google.com/sdk/gcloud/reference/biglake/hive/catalogs
---

# gcloud biglake hive catalogs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud biglake hive catalogs create

```text
NAME
    gcloud biglake hive catalogs create - create a BigLake Hive catalog

SYNOPSIS
    gcloud biglake hive catalogs create CATALOG --location-uri=LOCATION_URI
        --primary-location=PRIMARY_LOCATION [--description=DESCRIPTION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a BigLake Hive catalog.

EXAMPLES
    To create a BigLake Hive catalog named my-catalog in Cloud Storage bucket
    gs://my-bucket which is in region us-central1, run:

        $ gcloud biglake hive catalogs create my-catalog \
            --location-uri=gs://my-bucket --primary-location=us-central1

    To create a BigLake Hive catalog named my-catalog in Cloud Storage bucket
    gs://my-bucket which is in region us-central1 and has description My new
    catalog, run:

        $ gcloud biglake hive catalogs create my-catalog \
            --location-uri=gs://my-bucket --primary-location=us-central1 \
            --description="My new catalog"

POSITIONAL ARGUMENTS
     Hive catalog resource - The Hive Catalog to create. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CATALOG
          ID of the hive_catalog or fully qualified identifier for the
          hive_catalog.

          To set the catalog attribute:
          + provide the argument catalog on the command line.

REQUIRED FLAGS
     --location-uri=LOCATION_URI
        The Cloud Storage location path where the catalog data will be stored.
        Format: gs://bucket/path/to/catalog

     --primary-location=PRIMARY_LOCATION
        Google Cloud region that specifies where the catalog metadata is
        stored, e.g. us-central1.

OPTIONAL FLAGS
     --description=DESCRIPTION
        Description of the Hive catalog.

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

        $ gcloud alpha biglake hive catalogs create

        $ gcloud beta biglake hive catalogs create
```

### gcloud biglake hive catalogs delete

```text
NAME
    gcloud biglake hive catalogs delete - delete a BigLake Hive catalog

SYNOPSIS
    gcloud biglake hive catalogs delete CATALOG [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a BigLake Hive catalog.

EXAMPLES
    To delete a BigLake Hive catalog named 'my-catalog', run:

        $ gcloud biglake hive catalogs delete my-catalog

POSITIONAL ARGUMENTS
     Hive catalog resource - The Hive Catalog to delete. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CATALOG
          ID of the hive_catalog or fully qualified identifier for the
          hive_catalog.

          To set the catalog attribute:
          + provide the argument catalog on the command line.

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

        $ gcloud alpha biglake hive catalogs delete

        $ gcloud beta biglake hive catalogs delete
```

### gcloud biglake hive catalogs describe

```text
NAME
    gcloud biglake hive catalogs describe - describe a BigLake Hive catalog

SYNOPSIS
    gcloud biglake hive catalogs describe CATALOG [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes a BigLake Hive catalog.

EXAMPLES
    To describe a BigLake Hive catalog named 'my-catalog', run:

        $ gcloud biglake hive catalogs describe my-catalog

POSITIONAL ARGUMENTS
     Hive catalog resource - The Hive Catalog to describe. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CATALOG
          ID of the hive_catalog or fully qualified identifier for the
          hive_catalog.

          To set the catalog attribute:
          + provide the argument catalog on the command line.

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

        $ gcloud alpha biglake hive catalogs describe

        $ gcloud beta biglake hive catalogs describe
```

### gcloud biglake hive catalogs get-iam-policy

```text
NAME
    gcloud biglake hive catalogs get-iam-policy - get the IAM policy for a
        BigLake Hive catalog

SYNOPSIS
    gcloud biglake hive catalogs get-iam-policy CATALOG [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets the IAM policy for a BigLake Hive catalog.

EXAMPLES
    To get the IAM policy for the catalog my-catalog run:

        $ gcloud biglake hive catalogs get-iam-policy my-catalog

POSITIONAL ARGUMENTS
     Catalog resource - The Hive Catalog to get the IAM policy for. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CATALOG
          ID of the catalog or fully qualified identifier for the catalog.

          To set the catalog attribute:
          + provide the argument catalog on the command line.

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

        $ gcloud alpha biglake hive catalogs get-iam-policy

        $ gcloud beta biglake hive catalogs get-iam-policy
```

### gcloud biglake hive catalogs list

```text
NAME
    gcloud biglake hive catalogs list - list BigLake Hive catalogs

SYNOPSIS
    gcloud biglake hive catalogs list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists BigLake Hive catalogs.

EXAMPLES
    To list BigLake Hive catalogs in a project, run:

        $ gcloud biglake hive catalogs list

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

        $ gcloud alpha biglake hive catalogs list

        $ gcloud beta biglake hive catalogs list
```

### gcloud biglake hive catalogs set-iam-policy

```text
NAME
    gcloud biglake hive catalogs set-iam-policy - set the IAM policy for a
        BigLake Hive catalog

SYNOPSIS
    gcloud biglake hive catalogs set-iam-policy CATALOG POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for a BigLake Hive catalog.

EXAMPLES
    To set the IAM policy for the catalog my-catalog with the policy in
    policy.json run:

        $ gcloud biglake hive catalogs set-iam-policy my-catalog policy.json

POSITIONAL ARGUMENTS
     Catalog resource - The Hive Catalog to set the IAM policy for. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CATALOG
          ID of the catalog or fully qualified identifier for the catalog.

          To set the catalog attribute:
          + provide the argument catalog on the command line.

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

        $ gcloud alpha biglake hive catalogs set-iam-policy

        $ gcloud beta biglake hive catalogs set-iam-policy
```

### gcloud biglake hive catalogs update

```text
NAME
    gcloud biglake hive catalogs update - update a BigLake Hive catalog

SYNOPSIS
    gcloud biglake hive catalogs update CATALOG [--description=DESCRIPTION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates a BigLake Hive catalog.

EXAMPLES
    To update a BigLake Hive catalog named 'my-catalog' with the following
    arguments, run:

        $ gcloud biglake hive catalogs update my-catalog \
            --description="My updated catalog"

POSITIONAL ARGUMENTS
     Hive catalog resource - The Hive Catalog to update. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CATALOG
          ID of the hive_catalog or fully qualified identifier for the
          hive_catalog.

          To set the catalog attribute:
          + provide the argument catalog on the command line.

FLAGS
     --description=DESCRIPTION
        Description of the Hive catalog.

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

        $ gcloud alpha biglake hive catalogs update

        $ gcloud beta biglake hive catalogs update
```

### gcloud beta biglake hive catalogs create

```text
NAME
    gcloud beta biglake hive catalogs create - create a BigLake Hive catalog

SYNOPSIS
    gcloud beta biglake hive catalogs create CATALOG
        --location-uri=LOCATION_URI --primary-location=PRIMARY_LOCATION
        [--description=DESCRIPTION] [--kms-key=KMS_KEY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive catalogs delete

```text
NAME
    gcloud beta biglake hive catalogs delete - delete a BigLake Hive catalog

SYNOPSIS
    gcloud beta biglake hive catalogs delete CATALOG [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive catalogs describe

```text
NAME
    gcloud beta biglake hive catalogs describe - describe a BigLake Hive
        catalog

SYNOPSIS
    gcloud beta biglake hive catalogs describe CATALOG [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive catalogs get-iam-policy

```text
NAME
    gcloud beta biglake hive catalogs get-iam-policy - get the IAM policy for a
        BigLake Hive catalog

SYNOPSIS
    gcloud beta biglake hive catalogs get-iam-policy CATALOG
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive catalogs list

```text
NAME
    gcloud beta biglake hive catalogs list - list BigLake Hive catalogs

SYNOPSIS
    gcloud beta biglake hive catalogs list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive catalogs set-iam-policy

```text
NAME
    gcloud beta biglake hive catalogs set-iam-policy - set the IAM policy for a
        BigLake Hive catalog

SYNOPSIS
    gcloud beta biglake hive catalogs set-iam-policy CATALOG POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake hive catalogs update

```text
NAME
    gcloud beta biglake hive catalogs update - update a BigLake Hive catalog

SYNOPSIS
    gcloud beta biglake hive catalogs update CATALOG
        [--description=DESCRIPTION] [--clear-kms-key | --kms-key=KMS_KEY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive catalogs create

```text
NAME
    gcloud alpha biglake hive catalogs create - create a BigLake Hive catalog

SYNOPSIS
    gcloud alpha biglake hive catalogs create CATALOG
        --location-uri=LOCATION_URI --primary-location=PRIMARY_LOCATION
        [--description=DESCRIPTION] [--kms-key=KMS_KEY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive catalogs delete

```text
NAME
    gcloud alpha biglake hive catalogs delete - delete a BigLake Hive catalog

SYNOPSIS
    gcloud alpha biglake hive catalogs delete CATALOG [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive catalogs describe

```text
NAME
    gcloud alpha biglake hive catalogs describe - describe a BigLake Hive
        catalog

SYNOPSIS
    gcloud alpha biglake hive catalogs describe CATALOG [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive catalogs get-iam-policy

```text
NAME
    gcloud alpha biglake hive catalogs get-iam-policy - get the IAM policy for
        a BigLake Hive catalog

SYNOPSIS
    gcloud alpha biglake hive catalogs get-iam-policy CATALOG
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive catalogs list

```text
NAME
    gcloud alpha biglake hive catalogs list - list BigLake Hive catalogs

SYNOPSIS
    gcloud alpha biglake hive catalogs list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive catalogs set-iam-policy

```text
NAME
    gcloud alpha biglake hive catalogs set-iam-policy - set the IAM policy for
        a BigLake Hive catalog

SYNOPSIS
    gcloud alpha biglake hive catalogs set-iam-policy CATALOG POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake hive catalogs update

```text
NAME
    gcloud alpha biglake hive catalogs update - update a BigLake Hive catalog

SYNOPSIS
    gcloud alpha biglake hive catalogs update CATALOG
        [--description=DESCRIPTION] [--clear-kms-key | --kms-key=KMS_KEY]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/biglake/hive/catalogs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
