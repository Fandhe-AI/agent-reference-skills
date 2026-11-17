---
source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/exascale-db-storage-vaults
---

# gcloud oracle-database exascale-db-storage-vaults

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud oracle-database exascale-db-storage-vaults create

```text
NAME
    gcloud oracle-database exascale-db-storage-vaults create - create a new
        ExascaleDbStorageVault

SYNOPSIS
    gcloud oracle-database exascale-db-storage-vaults create
        EXASCALE_DB_STORAGE_VAULT --display-name=DISPLAY_NAME
        (--exascale-db-storage-details-total-size-gbs=EXASCALE_DB_STORAGE_DETAILS_TOTAL_SIZE_GBS : --properties-additional-flash-cache-percent=PROPERTIES_ADDITIONAL_FLASH_CACHE_PERCENT --properties-description=PROPERTIES_DESCRIPTION)
        [--async] [--exadata-infrastructure=EXADATA_INFRASTRUCTURE]
        [--gcp-oracle-zone=GCP_ORACLE_ZONE] [--labels=[LABELS,...]]
        [--location=LOCATION] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new ExascaleDbStorageVault.

EXAMPLES
    To create an ExascaleDbStorageVault with id my-vault in the location
    us-east4 with display-name my vault and total storage 1000 GB, run:

        $ gcloud oracle-database exascale-db-storage-vaults create \
            my-vault --location=us-east4 --display-name="my vault" \
            --total-size-gbs=1000

POSITIONAL ARGUMENTS
     ExascaleDbStorageVault resource - Identifier. The resource name of the
     ExascaleDbStorageVault. Format:
     projects/{project}/locations/{location}/exascaleDbStorageVaults/{exascale_db_storage_vault}
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument exascale_db_storage_vault on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument exascale_db_storage_vault on the command line
        with a fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       EXASCALE_DB_STORAGE_VAULT
          ID of the exascaleDbStorageVault or fully qualified identifier for
          the exascaleDbStorageVault.

          To set the exascale_db_storage_vault attribute:
          + provide the argument exascale_db_storage_vault on the command
            line.

REQUIRED FLAGS
     --display-name=DISPLAY_NAME
        The display name for the ExascaleDbStorageVault. The name does not have
        to be unique within your project. The name must be 1-255 characters
        long and can only contain alphanumeric characters.

     The properties of the ExascaleDbStorageVault.

     next ID: 12

     This must be specified.

       The storage details of the ExascaleDbStorageVault.

       This must be specified.

         --exascale-db-storage-details-total-size-gbs=EXASCALE_DB_STORAGE_DETAILS_TOTAL_SIZE_GBS
            The total storage allocation for the ExascaleDbStorageVault, in
            gigabytes (GB).

       --properties-additional-flash-cache-percent=PROPERTIES_ADDITIONAL_FLASH_CACHE_PERCENT
          The size of additional flash cache in percentage of high capacity
          database storage.

       --properties-description=PROPERTIES_DESCRIPTION
          The description of the ExascaleDbStorageVault.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     CloudExadataInfrastructure resource - The Exadata Infrastructure resource
     on which ExascaleDbStorageVault resource is created, in the following
     format:
     projects/{project}/locations/{region}/cloudExadataInfrastuctures/{cloud_extradata_infrastructure}
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --exadata-infrastructure on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --exadata-infrastructure on the command line
        with a fully specified name;
      * provide the argument --location on the command line.

     --exadata-infrastructure=EXADATA_INFRASTRUCTURE
        ID of the cloudExadataInfrastructure or fully qualified identifier for
        the cloudExadataInfrastructure.

        To set the cloud-exadata-infrastructure attribute:
        * provide the argument --exadata-infrastructure on the command line.

     --gcp-oracle-zone=GCP_ORACLE_ZONE
        The GCP Oracle zone where Oracle ExascaleDbStorageVault is hosted.
        Example: us-east4-b-r2. If not specified, the system will pick a zone
        based on availability.

     --labels=[LABELS,...]
        The labels or tags associated with the ExascaleDbStorageVault.

         KEY
            Keys must start with a lowercase character and contain only hyphens
            (-), underscores (_), lowercase characters, and numbers.

         VALUE
            Values must contain only hyphens (-), underscores (_), lowercase
            characters, and numbers.

        Shorthand Example:

            --labels=string=string

        JSON Example:

            --labels='{"string": "string"}'

        File Example:

            --labels=path_to_file.(yaml|json)

     --location=LOCATION
        For resources [exadata-infrastructure, exascale_db_storage_vault],
        provides fallback value for resource location attribute. When the
        resource's full URI path is not provided, location will fallback to
        this flag value.

     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server will
        guarantee that for at least 60 minutes since the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud oracle-database exascale-db-storage-vaults create my-vault \
    --location=us-east4 \
    --display-name="my vault" \
    --exascale-db-storage-details-total-size-gbs=1000
```

### gcloud oracle-database exascale-db-storage-vaults delete

```text
NAME
    gcloud oracle-database exascale-db-storage-vaults delete - delete an
        ExascaleDbStorageVault

SYNOPSIS
    gcloud oracle-database exascale-db-storage-vaults delete
        (EXASCALE_DB_STORAGE_VAULT : --location=LOCATION) [--async]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an ExascaleDbStorageVault.

EXAMPLES
    To delete an ExascaleDbStorageVault with id my-vault in the location
    us-east4, run:

        $ gcloud oracle-database exascale-db-storage-vaults delete \
            my-vault --location=us-east4

POSITIONAL ARGUMENTS
     ExascaleDbStorageVault resource - The name of the ExascaleDbStorageVault
     in the following format:
     projects/{project}/locations/{location}/exascaleDbStorageVaults/{exascale_db_storage_vault}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument exascale_db_storage_vault on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EXASCALE_DB_STORAGE_VAULT
          ID of the exascaleDbStorageVault or fully qualified identifier for
          the exascaleDbStorageVault.

          To set the exascale_db_storage_vault attribute:
          + provide the argument exascale_db_storage_vault on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the exascaleDbStorageVault resource.

          To set the location attribute:
          + provide the argument exascale_db_storage_vault on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database exascale-db-storage-vaults describe

```text
NAME
    gcloud oracle-database exascale-db-storage-vaults describe - get details of
        a ExascaleDbStorageVault

SYNOPSIS
    gcloud oracle-database exascale-db-storage-vaults describe
        (EXASCALE_DB_STORAGE_VAULT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details of a ExascaleDbStorageVault.

EXAMPLES
    To get a ExascaleDbStorageVault with id my-vault in the location us-east4,
    run:

        $ gcloud oracle-database exascale-db-storage-vaults describe \
            my-vault --location=us-east4

POSITIONAL ARGUMENTS
     ExascaleDbStorageVault resource - The name of the ExascaleDbStorageVault
     in the following format:
     projects/{project}/locations/{location}/exascaleDbStorageVaults/{exascale_db_storage_vault}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument exascale_db_storage_vault on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EXASCALE_DB_STORAGE_VAULT
          ID of the exascaleDbStorageVault or fully qualified identifier for
          the exascaleDbStorageVault.

          To set the exascale_db_storage_vault attribute:
          + provide the argument exascale_db_storage_vault on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the exascaleDbStorageVault resource.

          To set the location attribute:
          + provide the argument exascale_db_storage_vault on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database exascale-db-storage-vaults list

```text
NAME
    gcloud oracle-database exascale-db-storage-vaults list - list all
        ExascaleDbStorageVaults

SYNOPSIS
    gcloud oracle-database exascale-db-storage-vaults list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all ExascaleDbStorageVaults.

EXAMPLES
    To list all ExascaleDbStorageVaults in the location us-east4, run:

        $ gcloud oracle-database exascale-db-storage-vaults list \
            --location=us-east4

REQUIRED FLAGS
     Location resource - The parent value for ExascaleDbStorageVault in the
     following format: projects/{project}/locations/{location}. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database exascale-db-storage-vaults update

```text
NAME
    gcloud oracle-database exascale-db-storage-vaults update - update labels of
        an ExascaleDbStorageVault

SYNOPSIS
    gcloud oracle-database exascale-db-storage-vaults update
        (EXASCALE_DB_STORAGE_VAULT : --location=LOCATION) [--async]
        [--request-id=REQUEST_ID]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update labels of an ExascaleDbStorageVault. Only labels can be updated on
    this resource; use --update-labels, --remove-labels or --clear-labels to
    manage them.

EXAMPLES
    To add or update labels on an ExascaleDbStorageVault with id my-vault in
    the location us-east4, run:

        $ gcloud oracle-database exascale-db-storage-vaults update \
            my-vault --location=us-east4 --update-labels=env=prod,team=oasis

    To remove the label team from the ExascaleDbStorageVault, run:

        $ gcloud oracle-database exascale-db-storage-vaults update \
            my-vault --location=us-east4 --remove-labels=team

    To clear all labels from the ExascaleDbStorageVault, run:

        $ gcloud oracle-database exascale-db-storage-vaults update \
            my-vault --location=us-east4 --clear-labels

POSITIONAL ARGUMENTS
     ExascaleDbStorageVault resource - Identifier. The resource name of the
     ExascaleDbStorageVault. Format:
     projects/{project}/locations/{location}/exascaleDbStorageVaults/{exascale_db_storage_vault}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument exascale_db_storage_vault on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EXASCALE_DB_STORAGE_VAULT
          ID of the exascaleDbStorageVault or fully qualified identifier for
          the exascaleDbStorageVault.

          To set the exascale_db_storage_vault attribute:
          + provide the argument exascale_db_storage_vault on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the exascaleDbStorageVault resource.

          To set the location attribute:
          + provide the argument exascale_db_storage_vault on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. The labels or tags associated with the
          ExascaleDbStorageVault.

           KEY
              Keys must start with a lowercase character and contain only
              hyphens (-), underscores (_), lowercase characters, and numbers.

           VALUE
              Values must contain only hyphens (-), underscores (_), lowercase
              characters, and numbers.

          Shorthand Example:

              --labels=string=string

          JSON Example:

              --labels='{"string": "string"}'

          File Example:

              --labels=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --update-labels=[UPDATE_LABELS,...]
            Update labels value or add key value pair. The labels or tags
            associated with the ExascaleDbStorageVault.

             KEY
                Keys must start with a lowercase character and contain only
                hyphens (-), underscores (_), lowercase characters, and
                numbers.

             VALUE
                Values must contain only hyphens (-), underscores (_),
                lowercase characters, and numbers.

            Shorthand Example:

                --update-labels=string=string

            JSON Example:

                --update-labels='{"string": "string"}'

            File Example:

                --update-labels=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-labels
              Clear labels value and set to empty map.

           --remove-labels=REMOVE_LABELS
              Remove existing value from map labels. Sets remove_labels value.

              Shorthand Example:

                  --remove-labels=string,string

              JSON Example:

                  --remove-labels=["string"]

              File Example:

                  --remove-labels=path_to_file.(yaml|json)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create` example passes `--total-size-gbs=1000`, which is not a flag of this command (gcloud 593.0.0: "unrecognized arguments: --total-size-gbs=1000"); the SYNOPSIS flag for "The total storage allocation for the ExascaleDbStorageVault, in gigabytes (GB)" is `--exascale-db-storage-details-total-size-gbs`, which the runnable form uses.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/exascale-db-storage-vaults (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
