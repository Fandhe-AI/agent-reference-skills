---
source: https://docs.cloud.google.com/sdk/gcloud/reference/biglake/delta-sharing
---

# gcloud biglake delta-sharing

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud biglake delta-sharing catalogs create

```text
NAME
    gcloud biglake delta-sharing catalogs create - create a BigLake Delta
        Sharing catalog

SYNOPSIS
    gcloud biglake delta-sharing catalogs create CATALOG --location=LOCATION
        [--cross-cloud-cache=MODE] [--kms-key=KMS_KEY]
        [--refresh-interval=REFRESH_INTERVAL]
        [--service-directory-name=SERVICE_DIRECTORY_NAME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a BigLake Delta Sharing catalog.

EXAMPLES
    To create a BigLake Delta Sharing catalog named my-catalog with CMEK
    encryption, run:

        $ gcloud biglake delta-sharing catalogs create my-catalog \
            --location=us-central1 \
            --kms-key=projects/my-project/locations/us-central1/keyRings/\
        my-ring/cryptoKeys/my-key

POSITIONAL ARGUMENTS
     Catalog resource - The Delta Sharing catalog to create. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

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

REQUIRED FLAGS
     --location=LOCATION
        The location of the catalog.

OPTIONAL FLAGS
     --cross-cloud-cache=MODE
        Whether to enable caching of remote data on Google Cloud. This may
        result in data being temporarily persisted on Google Cloud. MODE must
        be one of: disabled, enabled.

     --kms-key=KMS_KEY
        Cloud KMS key name for encryption of resources in the catalog.

     --refresh-interval=REFRESH_INTERVAL
        The interval for refreshing metadata from the remote catalog (e.g. 300s
        or 5m).

     --service-directory-name=SERVICE_DIRECTORY_NAME
        The service directory resource name for private networking.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the biglake/delta_v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigquery/

NOTES
    This variant is also available:

        $ gcloud alpha biglake delta-sharing catalogs create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud biglake delta-sharing catalogs create my-catalog \
    --location=us-central1 \
    --kms-key=projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key
```

### gcloud biglake delta-sharing catalogs delete

```text
NAME
    gcloud biglake delta-sharing catalogs delete - delete a BigLake Delta
        Sharing catalog

SYNOPSIS
    gcloud biglake delta-sharing catalogs delete CATALOG [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a BigLake Delta Sharing catalog.

POSITIONAL ARGUMENTS
     Catalog resource - The Delta Sharing catalog to delete. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the biglake/delta_v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigquery/

NOTES
    This variant is also available:

        $ gcloud alpha biglake delta-sharing catalogs delete
```

### gcloud biglake delta-sharing catalogs describe

```text
NAME
    gcloud biglake delta-sharing catalogs describe - describe a BigLake Delta
        Sharing catalog

SYNOPSIS
    gcloud biglake delta-sharing catalogs describe CATALOG
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a BigLake Delta Sharing catalog.

POSITIONAL ARGUMENTS
     Catalog resource - The Delta Sharing catalog to describe. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the biglake/delta_v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigquery/

NOTES
    This variant is also available:

        $ gcloud alpha biglake delta-sharing catalogs describe
```

### gcloud biglake delta-sharing catalogs list

```text
NAME
    gcloud biglake delta-sharing catalogs list - list BigLake Delta Sharing
        catalogs

SYNOPSIS
    gcloud biglake delta-sharing catalogs list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List BigLake Delta Sharing catalogs.

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

API REFERENCE
    This command uses the biglake/delta_v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigquery/

NOTES
    This variant is also available:

        $ gcloud alpha biglake delta-sharing catalogs list
```

### gcloud biglake delta-sharing catalogs update

```text
NAME
    gcloud biglake delta-sharing catalogs update - update a BigLake Delta
        Sharing catalog

SYNOPSIS
    gcloud biglake delta-sharing catalogs update CATALOG
        [--connector-endpoint=CONNECTOR_ENDPOINT] [--cross-cloud-cache=MODE]
        [--invitation-code=INVITATION_CODE] [--invitation-url=INVITATION_URL]
        [--refresh-interval=REFRESH_INTERVAL]
        [--service-directory-name=SERVICE_DIRECTORY_NAME]
        [--clear-kms-key | --kms-key=KMS_KEY] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a BigLake Delta Sharing catalog.

EXAMPLES
    To update the Cloud KMS key of a BigLake Delta Sharing catalog named
    my-catalog, run:

        $ gcloud biglake delta-sharing catalogs update my-catalog \
            --kms-key=projects/my-project/locations/us-central1/keyRings/\
        my-ring/cryptoKeys/my-new-key

POSITIONAL ARGUMENTS
     Catalog resource - The Delta Sharing catalog to update. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

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

FLAGS
     --connector-endpoint=CONNECTOR_ENDPOINT
        The SAP BDC Connector Endpoint.

     --cross-cloud-cache=MODE
        Whether to enable caching of remote data on Google Cloud. This may
        result in data being temporarily persisted on Google Cloud. MODE must
        be one of: disabled, enabled.

     --invitation-code=INVITATION_CODE
        The SAP BDC Invitation Code.

     --invitation-url=INVITATION_URL
        The combined invitation URL containing both endpoint and code.

     --refresh-interval=REFRESH_INTERVAL
        The interval for refreshing metadata from the remote catalog (e.g. 300s
        or 5m).

     --service-directory-name=SERVICE_DIRECTORY_NAME
        The service directory resource name for private networking.

     At most one of these can be specified:

       --clear-kms-key
          Clear the Cloud KMS key for the catalog and revert to Google-managed
          encryption.

       --kms-key=KMS_KEY
          Cloud KMS key name for encryption of resources in the catalog.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the biglake/delta_v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigquery/

NOTES
    This variant is also available:

        $ gcloud alpha biglake delta-sharing catalogs update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud biglake delta-sharing catalogs update my-catalog \
    --kms-key=projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-new-key
```

### gcloud biglake delta-sharing schemas list

```text
NAME
    gcloud biglake delta-sharing schemas list - list BigLake Delta Sharing
        schemas

SYNOPSIS
    gcloud biglake delta-sharing schemas list
        (--share=SHARE : --catalog=CATALOG) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List BigLake Delta Sharing schemas.

REQUIRED FLAGS
     Share resource - The share to list schemas from. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --share on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --share=SHARE
          ID of the share or fully qualified identifier for the share.

          To set the share attribute:
          + provide the argument --share on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --catalog=CATALOG
          The BigQuery catalog ID.

          To set the catalog attribute:
          + provide the argument --share on the command line with a fully
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

API REFERENCE
    This command uses the biglake/delta_v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigquery/

NOTES
    This variant is also available:

        $ gcloud alpha biglake delta-sharing schemas list
```

### gcloud biglake delta-sharing shares list

```text
NAME
    gcloud biglake delta-sharing shares list - list BigLake Delta Sharing
        shares

SYNOPSIS
    gcloud biglake delta-sharing shares list --catalog=CATALOG
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List BigLake Delta Sharing shares.

REQUIRED FLAGS
     Catalog resource - The catalog to list shares from. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --catalog=CATALOG
          ID of the catalog or fully qualified identifier for the catalog.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the biglake/delta_v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigquery/

NOTES
    This variant is also available:

        $ gcloud alpha biglake delta-sharing shares list
```

### gcloud biglake delta-sharing tables list

```text
NAME
    gcloud biglake delta-sharing tables list - list BigLake Delta Sharing
        tables

SYNOPSIS
    gcloud biglake delta-sharing tables list
        (--schema=SCHEMA : --catalog=CATALOG --share=SHARE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List BigLake Delta Sharing tables.

REQUIRED FLAGS
     Schema resource - The schema to list tables from. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --schema on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --schema=SCHEMA
          ID of the schema or fully qualified identifier for the schema.

          To set the schema attribute:
          + provide the argument --schema on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --catalog=CATALOG
          The BigQuery catalog ID.

          To set the catalog attribute:
          + provide the argument --schema on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --share=SHARE
          The share ID.

          To set the share attribute:
          + provide the argument --schema on the command line with a fully
            specified name;
          + provide the argument --share on the command line.

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

API REFERENCE
    This command uses the biglake/delta_v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigquery/

NOTES
    This variant is also available:

        $ gcloud alpha biglake delta-sharing tables list
```

### gcloud alpha biglake delta-sharing catalogs create

```text
NAME
    gcloud alpha biglake delta-sharing catalogs create - create a BigLake Delta
        Sharing catalog

SYNOPSIS
    gcloud alpha biglake delta-sharing catalogs create CATALOG
        --location=LOCATION [--cross-cloud-cache=MODE] [--kms-key=KMS_KEY]
        [--refresh-interval=REFRESH_INTERVAL]
        [--service-directory-name=SERVICE_DIRECTORY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake delta-sharing catalogs delete

```text
NAME
    gcloud alpha biglake delta-sharing catalogs delete - delete a BigLake Delta
        Sharing catalog

SYNOPSIS
    gcloud alpha biglake delta-sharing catalogs delete CATALOG
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake delta-sharing catalogs describe

```text
NAME
    gcloud alpha biglake delta-sharing catalogs describe - describe a BigLake
        Delta Sharing catalog

SYNOPSIS
    gcloud alpha biglake delta-sharing catalogs describe CATALOG
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake delta-sharing catalogs list

```text
NAME
    gcloud alpha biglake delta-sharing catalogs list - list BigLake Delta
        Sharing catalogs

SYNOPSIS
    gcloud alpha biglake delta-sharing catalogs list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake delta-sharing catalogs update

```text
NAME
    gcloud alpha biglake delta-sharing catalogs update - update a BigLake Delta
        Sharing catalog

SYNOPSIS
    gcloud alpha biglake delta-sharing catalogs update CATALOG
        [--connector-endpoint=CONNECTOR_ENDPOINT] [--cross-cloud-cache=MODE]
        [--invitation-code=INVITATION_CODE] [--invitation-url=INVITATION_URL]
        [--refresh-interval=REFRESH_INTERVAL]
        [--service-directory-name=SERVICE_DIRECTORY_NAME]
        [--clear-kms-key | --kms-key=KMS_KEY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake delta-sharing schemas list

```text
NAME
    gcloud alpha biglake delta-sharing schemas list - list BigLake Delta
        Sharing schemas

SYNOPSIS
    gcloud alpha biglake delta-sharing schemas list
        (--share=SHARE : --catalog=CATALOG) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake delta-sharing shares list

```text
NAME
    gcloud alpha biglake delta-sharing shares list - list BigLake Delta Sharing
        shares

SYNOPSIS
    gcloud alpha biglake delta-sharing shares list --catalog=CATALOG
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake delta-sharing tables list

```text
NAME
    gcloud alpha biglake delta-sharing tables list - list BigLake Delta Sharing
        tables

SYNOPSIS
    gcloud alpha biglake delta-sharing tables list
        (--schema=SCHEMA : --catalog=CATALOG --share=SHARE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/biglake/delta-sharing (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
