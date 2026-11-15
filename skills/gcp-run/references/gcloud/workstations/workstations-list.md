---
source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/list
---

# gcloud workstations list

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud workstations list

```text
NAME
    gcloud workstations list - list workstations

SYNOPSIS
    gcloud workstations list [--endpoint-mode=ENDPOINT_MODE]
        [--cluster=CLUSTER --config=CONFIG --region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all workstations under the specified configuration.

EXAMPLES
    To list workstations, run:

        $ gcloud workstations list

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     Config resource - The configuration of the workstations to display. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --config on the command line with a fully
        specified name;
      * set the property workstations/config with a fully specified name;
      * default is all configs with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --cluster=CLUSTER
        The name of the cluster containing the config.

        To set the cluster attribute:
        * provide the argument --config on the command line with a fully
          specified name;
        * set the property workstations/config with a fully specified name;
        * default is all configs with a fully specified name;
        * provide the argument --cluster on the command line;
        * set the property workstations/cluster;
        * default is all clusters .

     --config=CONFIG
        ID of the config or fully qualified identifier for the config.

        To set the config attribute:
        * provide the argument --config on the command line;
        * set the property workstations/config;
        * default is all configs .

     --region=REGION
        The name of the region of the config.

        To set the region attribute:
        * provide the argument --config on the command line with a fully
          specified name;
        * set the property workstations/config with a fully specified name;
        * default is all configs with a fully specified name;
        * provide the argument --region on the command line;
        * set the property workstations/region;
        * default is all regions .

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
    This command uses the workstations/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/workstations

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha workstations list

        $ gcloud beta workstations list
```

### gcloud beta workstations list

```text
NAME
    gcloud beta workstations list - list workstations

SYNOPSIS
    gcloud beta workstations list [--endpoint-mode=ENDPOINT_MODE]
        [--cluster=CLUSTER --config=CONFIG --region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha workstations list

```text
NAME
    gcloud alpha workstations list - list workstations

SYNOPSIS
    gcloud alpha workstations list [--endpoint-mode=ENDPOINT_MODE]
        [--cluster=CLUSTER --config=CONFIG --region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/list (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
