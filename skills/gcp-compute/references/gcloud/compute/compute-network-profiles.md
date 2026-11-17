---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-profiles
---

# gcloud compute network-profiles

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute network-profiles describe

```text
NAME
    gcloud compute network-profiles describe - describe a network profile

SYNOPSIS
    gcloud compute network-profiles describe NETWORK_PROFILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a network profile.

EXAMPLES
    To retrieve a single network profile and print its properties, run the
    following command:        $ gcloud compute network-profiles describe my-network-profile

POSITIONAL ARGUMENTS
     Network profile resource - Name of the network profile you want to
     inspect. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument network_profile on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NETWORK_PROFILE
          ID of the network_profile or fully qualified identifier for the
          network_profile.

          To set the network_profile attribute:
          + provide the argument network_profile on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute network-profiles describe

        $ gcloud beta compute network-profiles describe
```

### gcloud compute network-profiles list

```text
NAME
    gcloud compute network-profiles list - list network profiles

SYNOPSIS
    gcloud compute network-profiles list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List network profiles.

EXAMPLES
    The following command lists all network profiles:

        $ gcloud compute network-profiles list

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
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute network-profiles list

        $ gcloud beta compute network-profiles list
```

### gcloud beta compute network-profiles describe

```text
NAME
    gcloud beta compute network-profiles describe - describe a network profile

SYNOPSIS
    gcloud beta compute network-profiles describe NETWORK_PROFILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-profiles list

```text
NAME
    gcloud beta compute network-profiles list - list network profiles

SYNOPSIS
    gcloud beta compute network-profiles list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-profiles describe

```text
NAME
    gcloud alpha compute network-profiles describe - describe a network profile

SYNOPSIS
    gcloud alpha compute network-profiles describe NETWORK_PROFILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-profiles list

```text
NAME
    gcloud alpha compute network-profiles list - list network profiles

SYNOPSIS
    gcloud alpha compute network-profiles list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-profiles (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
