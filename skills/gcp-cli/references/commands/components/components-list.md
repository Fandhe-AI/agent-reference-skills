---
source: https://docs.cloud.google.com/sdk/gcloud/reference/components/list
---

# gcloud components list

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud components list

```text
NAME
    gcloud components list - list the status of all Google Cloud CLI components

SYNOPSIS
    gcloud components list [--only-local-state] [--show-platform]
        [--show-versions] [--filter=EXPRESSION] [--limit=LIMIT]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command lists all the available components in the Google Cloud CLI.
    For each component, the command lists the following information:

      o Status on your local workstation: not installed, installed (and up to
        date), and update available (installed, but not up to date)
      o Name of the component (a description)
      o ID of the component (used to refer to the component in other [gcloud
        components] commands)
      o Size of the component

EXAMPLES
    To list the status of all Google Cloud CLI components, run:

        $ gcloud components list

    To show the currently installed version (if any) and the latest available
    version of each component, run:

        $ gcloud components list --show-versions

FLAGS
     --only-local-state
        Only show locally installed components.

     --show-platform
        Show operating system and architecture of all components

     --show-versions
        Show installed and available versions of all components.

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
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/components/list (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
