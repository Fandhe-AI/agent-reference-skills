---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/sole-tenancy/node-types
---

# gcloud compute sole-tenancy node-types

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute sole-tenancy node-types describe

```text
NAME
    gcloud compute sole-tenancy node-types describe - describe a Compute Engine
        node type

SYNOPSIS
    gcloud compute sole-tenancy node-types describe NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Compute Engine node type.

EXAMPLES
    To describe a node type, run:

        $ gcloud compute sole-tenancy node-types describe example-node-type

POSITIONAL ARGUMENTS
     NAME
        Name of the node types to operate on.

FLAGS
     --zone=ZONE
        Zone of the node types to operate on. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute sole-tenancy node-types describe

        $ gcloud beta compute sole-tenancy node-types describe
```

### gcloud compute sole-tenancy node-types list

```text
NAME
    gcloud compute sole-tenancy node-types list - list Google Compute Engine
        node types

SYNOPSIS
    gcloud compute sole-tenancy node-types list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute sole-tenancy node-types list displays all Google Compute
    Engine node types in a project.

    By default, node types from all zones are listed. The results can be
    narrowed down using a filter: --filter="zone:( ZONE ... )".

EXAMPLES
    To list all node types in a project in table form, run:

        $ gcloud compute sole-tenancy node-types list

    To list the URIs of all node types in a project, run:

        $ gcloud compute sole-tenancy node-types list --uri

    To list all node types in the us-central1-b and europe-west1-d zones, run:

        $ gcloud compute sole-tenancy node-types list \
            --filter="zone:( us-central1-b europe-west1-d )"

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

        $ gcloud alpha compute sole-tenancy node-types list

        $ gcloud beta compute sole-tenancy node-types list
```

### gcloud beta compute sole-tenancy node-types describe

```text
NAME
    gcloud beta compute sole-tenancy node-types describe - describe a Compute
        Engine node type

SYNOPSIS
    gcloud beta compute sole-tenancy node-types describe NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute sole-tenancy node-types list

```text
NAME
    gcloud beta compute sole-tenancy node-types list - list Google Compute
        Engine node types

SYNOPSIS
    gcloud beta compute sole-tenancy node-types list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-types describe

```text
NAME
    gcloud alpha compute sole-tenancy node-types describe - describe a Compute
        Engine node type

SYNOPSIS
    gcloud alpha compute sole-tenancy node-types describe NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute sole-tenancy node-types list

```text
NAME
    gcloud alpha compute sole-tenancy node-types list - list Google Compute
        Engine node types

SYNOPSIS
    gcloud alpha compute sole-tenancy node-types list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/sole-tenancy/node-types (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
