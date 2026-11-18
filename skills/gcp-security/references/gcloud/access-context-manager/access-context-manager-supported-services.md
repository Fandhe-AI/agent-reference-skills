---
source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/supported-services
---

# gcloud access-context-manager supported-services

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud access-context-manager supported-services describe

```text
NAME
    gcloud access-context-manager supported-services describe - gets
        information about a VPC Service Controls Supported Service

SYNOPSIS
    gcloud access-context-manager supported-services describe SERVICE_NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get service information allowed in an access policy object.

EXAMPLES
    To get VPC Service Controls support information for
    bigquery.googleapis.com, run:

        $ gcloud access-context-manager supported-services describe \
            bigquery.googleapis.com

POSITIONAL ARGUMENTS
     Supported service resource - VPC Service Controls supported service. This
     represents a Cloud resource.

     This must be specified.

       SERVICE_NAME
          ID of the supported-service or fully qualified identifier for the
          supported-service.

          To set the service_name attribute:
          + provide the argument service_name on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager supported-services describe

        $ gcloud beta access-context-manager supported-services describe
```

### gcloud access-context-manager supported-services list

```text
NAME
    gcloud access-context-manager supported-services list - lists all VPC
        Service Controls supported services

SYNOPSIS
    gcloud access-context-manager supported-services list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists the services that VPC Service Controls supports. The services that
    are in this list fully support VPC Service Controls or the integration of
    this service with VPC Service Controls is in Preview stage
    (https://cloud.google.com/products#product-launch-stages), or the service
    integration is scheduled to be shut down and removed which is in
    [Deprecation stage]
    (https://cloud.google.com/products#product-launch-stages). Services that
    aren't in this list don't support VPC Service Controls and aren't
    guaranteed to function properly in a VPC Service Controls environment.

EXAMPLES
    To list VPC Service Controls supported services, run:

        $ gcloud access-context-manager supported-services list

    This command prints out a list of all supported services in a tabular form:

        NAME                    TITLE                SERVICE_SUPPORT_STAGE  AVAILABLE_ON_RESTRICTED_VIP KNOWN_LIMITATIONS
        vpcsc_supported_service VPC-SC Supported API GA                     True                        False

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

        $ gcloud alpha access-context-manager supported-services list

        $ gcloud beta access-context-manager supported-services list
```

### gcloud beta access-context-manager supported-services describe

```text
NAME
    gcloud beta access-context-manager supported-services describe - gets
        information about a VPC Service Controls Supported Service

SYNOPSIS
    gcloud beta access-context-manager supported-services describe SERVICE_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager supported-services list

```text
NAME
    gcloud beta access-context-manager supported-services list - lists all VPC
        Service Controls supported services

SYNOPSIS
    gcloud beta access-context-manager supported-services list
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager supported-services describe

```text
NAME
    gcloud alpha access-context-manager supported-services describe - gets
        information about a VPC Service Controls Supported Service

SYNOPSIS
    gcloud alpha access-context-manager supported-services describe
        SERVICE_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager supported-services list

```text
NAME
    gcloud alpha access-context-manager supported-services list - lists all VPC
        Service Controls supported services

SYNOPSIS
    gcloud alpha access-context-manager supported-services list
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/supported-services (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
