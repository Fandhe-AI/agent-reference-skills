---
source: https://docs.cloud.google.com/sdk/gcloud/reference/components/repositories
---

# gcloud components repositories

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud components repositories add

```text
NAME
    gcloud components repositories add - add a new Trusted Tester component
        repository

SYNOPSIS
    gcloud components repositories add URL [URL ...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add a new Trusted Tester component repository to the list of repositories
    used by the component manager. This will allow you to install and update
    components found in this repository.

    If you are participating in a Trusted Tester program, you will be
    instructed on the location of repositories with additional versions of one
    or more Google Cloud CLI components.

EXAMPLES
    To add the Trusted Tester component repository http://repo.location.com
    run:

        $ gcloud components repositories add http://repo.location.com

POSITIONAL ARGUMENTS
     URL [URL ...]
        One or more URLs for the component repositories you want to add.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud components repositories list

```text
NAME
    gcloud components repositories list - list any Trusted Tester component
        repositories you have registered

SYNOPSIS
    gcloud components repositories list [--filter=EXPRESSION] [--limit=LIMIT]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Trusted Tester component repositories that are registered with the
    component manager. If you have additional repositories, the component
    manager will look at them to discover additional components to install, or
    different versions of existing components that are available.

EXAMPLES
    To list all Trusted Tester component repositories that are registered with
    the component manager, run:

        $ gcloud components repositories list

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

### gcloud components repositories remove

```text
NAME
    gcloud components repositories remove - remove a registered Trusted Test
        component repository

SYNOPSIS
    gcloud components repositories remove [URL ...] [--all]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove a registered Trusted Tester component repository from the list of
    repositories used by the component manager. After removing a repository,
    you can run: $ gcloud components update to revert back to the standard
    version of any components that were installed from that repository.

EXAMPLES
    To be prompted for registered Trusted Tester component repositories to
    remove run:

        $ gcloud components repositories remove

POSITIONAL ARGUMENTS
     [URL ...]
        Zero or more URLs for the component repositories you want to remove. If
        none are given, you will be prompted to choose which existing
        repository you want to remove.

FLAGS
     --all
        Remove all registered repositories.

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
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/components/repositories (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
