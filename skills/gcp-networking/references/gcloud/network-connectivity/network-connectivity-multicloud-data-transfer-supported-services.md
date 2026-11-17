---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/multicloud-data-transfer-supported-services
---

# gcloud network-connectivity multicloud-data-transfer-supported-services

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity multicloud-data-transfer-supported-services describe

```text
NAME
    gcloud network-connectivity multicloud-data-transfer-supported-services
        describe - describe multicloudDataTransferSupportedService

SYNOPSIS
    gcloud network-connectivity multicloud-data-transfer-supported-services
        describe
        (MULTICLOUD_DATA_TRANSFER_SUPPORTED_SERVICE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe multicloudDataTransferSupportedService

EXAMPLES
    To describe the multicloudDataTransferSupportedService, run:

    $ gcloud network-connectivity \        multicloud-data-transfer-supported-services describe \
        compute-engine --location=europe-west1

POSITIONAL ARGUMENTS
     MulticloudDataTransferSupportedService resource - The name of the service.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument multicloud_data_transfer_supported_service on
        the command line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICLOUD_DATA_TRANSFER_SUPPORTED_SERVICE
          ID of the multicloudDataTransferSupportedService or fully qualified
          identifier for the multicloudDataTransferSupportedService.

          To set the multicloud_data_transfer_supported_service attribute:
          + provide the argument multicloud_data_transfer_supported_service
            on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the multicloudDataTransferSupportedService
          resource.

          To set the location attribute:
          + provide the argument multicloud_data_transfer_supported_service
            on the command line with a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity \
            multicloud-data-transfer-supported-services describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-connectivity multicloud-data-transfer-supported-services describe compute-engine \
    --location=europe-west1
```

### gcloud network-connectivity multicloud-data-transfer-supported-services list

```text
NAME
    gcloud network-connectivity multicloud-data-transfer-supported-services
        list - list multicloudDataTransferSupportedServices

SYNOPSIS
    gcloud network-connectivity multicloud-data-transfer-supported-services
        list --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List multicloudDataTransferSupportedServices

EXAMPLES
    To list all multicloudDataTransferSupportedServices, run:

    $ gcloud network-connectivity \        multicloud-data-transfer-supported-services list \
        --location=europe-west1

REQUIRED FLAGS
     Location resource - The name of the parent resource. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
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
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity \
            multicloud-data-transfer-supported-services list
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-connectivity multicloud-data-transfer-supported-services list \
    --location=europe-west1
```

### gcloud beta network-connectivity multicloud-data-transfer-supported-services describe

```text
NAME
    gcloud beta network-connectivity
        multicloud-data-transfer-supported-services describe - describe
        multicloudDataTransferSupportedServices

SYNOPSIS
    gcloud beta network-connectivity
        multicloud-data-transfer-supported-services describe
        (MULTICLOUD_DATA_TRANSFER_SUPPORTED_SERVICE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity multicloud-data-transfer-supported-services list

```text
NAME
    gcloud beta network-connectivity
        multicloud-data-transfer-supported-services list - list
        multicloudDataTransferSupportedServices

SYNOPSIS
    gcloud beta network-connectivity
        multicloud-data-transfer-supported-services list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/multicloud-data-transfer-supported-services (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
