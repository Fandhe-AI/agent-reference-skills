---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/query-status
---

# gcloud network-connectivity hubs query-status

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity hubs query-status

```text
NAME
    gcloud network-connectivity hubs query-status - query the status of Private
        Service Connect propagation for a hub

SYNOPSIS
    gcloud network-connectivity hubs query-status HUB [--group-by=GROUP_BY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Query the status of Private Service Connect propagation for a hub.

EXAMPLES
    To query the Private Service Connect propagation status of a hub, run:

        $ gcloud network-connectivity hubs query-status HUB

    To query the Private Service Connect propagation status of a hub grouped by
    source spoke and code, run:

        $ gcloud network-connectivity hubs query-status HUB \
        --group-by="psc_propagation_status.source_spoke,psc_propagation_\
        status.code"

    To query the Private Service Connect propagation status of a hub sorted by
    the source forwarding rule, run:

        $ gcloud network-connectivity hubs query-status HUB \
        --sort-by="psc_propagation_status.source_forwarding_rule"

POSITIONAL ARGUMENTS
     Hub resource - Name of the hub to query Private Service Connect
     propagation for. This represents a Cloud resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument hub on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HUB
          ID of the hub or fully qualified identifier for the hub.

          To set the hub attribute:
          + provide the argument hub on the command line.

FLAGS
     --group-by=GROUP_BY
        Comma-separated list of resource field key names to group by.
        Aggregated values will be displayed for each group. If --group-by is
        set, the value of the --sort-by flag must be the same as or a subset of
        the --group-by flag.

        Accepted values are:
        * 'psc_propagation_status.source_spoke'
        * 'psc_propagation_status.source_group'
        * 'psc_propagation_status.source_forwarding_rule'
        * 'psc_propagation_status.target_spoke'
        * 'psc_propagation_status.target_group'
        * 'psc_propagation_status.code'

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
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-connectivity hubs query-status HUB \
    --group-by="psc_propagation_status.source_spoke,psc_propagation_status.code"
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/query-status (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
