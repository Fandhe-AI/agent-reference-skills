---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/repositories/list
---

# gcloud artifacts repositories list

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts repositories list

```text
NAME
    gcloud artifacts repositories list - list repositories in the specified
        project

SYNOPSIS
    gcloud artifacts repositories list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Artifact Registry repositories in the specified project.

    To specify the maximum number of repositories to list, use the --limit
    flag.

EXAMPLES
    The following command lists a maximum of five repositories:

        $ gcloud artifacts repositories list --limit=5

    To list repositories with name as my_repo:

        $ gcloud artifacts repositories list \
          --filter='name="projects/my-project/locations/us/repositories/my\
        _repo"'

    To list repositories with a given partial name, use * to match any
    character in name:

        $ gcloud artifacts repositories list \
          --filter='name="projects/my-project/locations/us/repositories/*r\
        epo"'

        $ gcloud artifacts repositories list \
          --filter='name="projects/my-project/locations/us/repositories/my\
        _*"'

    To list files that have annotations:

        $ gcloud artifacts repositories list --filter=annotations:*

    To list repositories with annotations pair as [annotation_key:
    annotation_value]

        $ gcloud artifacts repositories list \
          --filter='annotations.annotation_key:annotation_value'

    To list repositories with annotations containing key as my_key:

        $ gcloud artifacts repositories list --filter='annotations.my_key'

    If the key or value contains special characters, such as my.key or
    my.value, backtick("") is required:

        $ gcloud artifacts repositories list --filter='annotations.`my.key`'

        $ gcloud artifacts repositories list \
          --filter='annotations.`my.key`:`my.value`'

    To list repositories with given partial annotation key or value, use * to
    match any character:

        $ gcloud artifacts repositories list \
          --filter='annotations.*key:`*.value`'

    To list repositories ordered by create_time:

        $ gcloud artifacts repositories list --sort-by=create_time

    To list repositories ordered by update_time reversely:

        $ gcloud artifacts repositories list--sort-by=~update_time

FLAGS
     Location resource - The Artifact Registry repository location. You can
     also set --location=all to list repositories across all locations. If you
     omit this flag, the default location is used if you set the
     artifacts/location property. Otherwise, omitting this flag lists
     repositories across all locations. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property artifacts/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property artifacts/location.

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

        $ gcloud alpha artifacts repositories list

        $ gcloud beta artifacts repositories list
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud artifacts repositories list \
    --filter='name="projects/my-project/locations/us/repositories/my_repo"'

gcloud artifacts repositories list \
    --filter='name="projects/my-project/locations/us/repositories/*repo"'

gcloud artifacts repositories list \
    --filter='name="projects/my-project/locations/us/repositories/my_*"'

gcloud artifacts repositories list \
    --sort-by=~update_time
```

### gcloud beta artifacts repositories list

```text
NAME
    gcloud beta artifacts repositories list - list repositories in the
        specified project

SYNOPSIS
    gcloud beta artifacts repositories list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts repositories list

```text
NAME
    gcloud alpha artifacts repositories list - list repositories in the
        specified project

SYNOPSIS
    gcloud alpha artifacts repositories list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the help wraps a line between a flag value and the next flag with a bare backslash, which drops the space; the runnable form restores the space before the next flag.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/repositories/list (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
