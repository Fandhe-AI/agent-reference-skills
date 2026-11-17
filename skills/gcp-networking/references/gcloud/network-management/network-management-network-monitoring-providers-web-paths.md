---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-management/network-monitoring-providers/web-paths
---

# gcloud network-management network-monitoring-providers web-paths

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-management network-monitoring-providers web-paths describe

```text
NAME
    gcloud network-management network-monitoring-providers web-paths describe -
        describe a Web Path

SYNOPSIS
    gcloud network-management network-monitoring-providers web-paths describe
        (WEB_PATH : --location=LOCATION
          --network-monitoring-provider=NETWORK_MONITORING_PROVIDER)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details about a specific Web Path.

    Note: The only supported location for these resources is global.

EXAMPLES
    To describe the Web Path my-web-path-id under provider my-provider-id, run:

        $ gcloud network-management network-monitoring-providers web-paths \
            describe my-web-path-id \
            --network-monitoring-provider=my-provider-id --location=global

POSITIONAL ARGUMENTS
     WebPath resource - Name of the resource.. Format:
     projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider}/webPaths/{web_path}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument web_path on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WEB_PATH
          ID of the webPath or fully qualified identifier for the webPath.

          To set the web_path attribute:
          + provide the argument web_path on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the webPath resource.

          To set the location attribute:
          + provide the argument web_path on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --network-monitoring-provider=NETWORK_MONITORING_PROVIDER
          The networkMonitoringProvider id of the webPath resource.

          To set the network-monitoring-provider attribute:
          + provide the argument web_path on the command line with a fully
            specified name;
          + provide the argument --network-monitoring-provider on the command
            line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkmanagement/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud alpha network-management network-monitoring-providers \
            web-paths describe
```

### gcloud network-management network-monitoring-providers web-paths list

```text
NAME
    gcloud network-management network-monitoring-providers web-paths list -
        list Web Paths

SYNOPSIS
    gcloud network-management network-monitoring-providers web-paths list
        (--network-monitoring-provider=NETWORK_MONITORING_PROVIDER
          : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Web Paths for a given Network Monitoring Provider.

    Note: The only supported location for these resources is global.

EXAMPLES
    To list all Web Paths for the provider my-provider-id, run:

        $ gcloud network-management network-monitoring-providers web-paths \
            list --network-monitoring-provider=my-provider-id \
            --location=global

REQUIRED FLAGS
     NetworkMonitoringProvider resource - Parent value for ListWebPathsRequest.
     Format:
     projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --network-monitoring-provider on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --network-monitoring-provider=NETWORK_MONITORING_PROVIDER
          ID of the networkMonitoringProvider or fully qualified identifier for
          the networkMonitoringProvider.

          To set the network-monitoring-provider attribute:
          + provide the argument --network-monitoring-provider on the command
            line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location id of the networkMonitoringProvider resource.

          To set the location attribute:
          + provide the argument --network-monitoring-provider on the command
            line with a fully specified name;
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
    This command uses the networkmanagement/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud alpha network-management network-monitoring-providers \
            web-paths list
```

### gcloud alpha network-management network-monitoring-providers web-paths describe

```text
NAME
    gcloud alpha network-management network-monitoring-providers web-paths
        describe - describe a Web Path

SYNOPSIS
    gcloud alpha network-management network-monitoring-providers web-paths
        describe
        (WEB_PATH : --location=LOCATION
          --network-monitoring-provider=NETWORK_MONITORING_PROVIDER)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-management network-monitoring-providers web-paths list

```text
NAME
    gcloud alpha network-management network-monitoring-providers web-paths list
        - list Web Paths

SYNOPSIS
    gcloud alpha network-management network-monitoring-providers web-paths list
        (--network-monitoring-provider=NETWORK_MONITORING_PROVIDER
          : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-management/network-monitoring-providers/web-paths (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
