---
source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/gi-versions
---

# gcloud oracle-database gi-versions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud oracle-database gi-versions list

```text
NAME
    gcloud oracle-database gi-versions list - list Grid Infrastructure versions

SYNOPSIS
    gcloud oracle-database gi-versions list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all Grid Infrastructure versions for the specified location.

EXAMPLES
    To list all Grid Infrastructure versions in the location us-east4, run:

        $ gcloud oracle-database gi-versions list --location=us-east4

    To list a specific Grid Infrastructure version in the location us-east4,
    run:

        $ gcloud oracle-database gi-versions list --location=us-east4 \
          --filter='gi_version="19.0.0.0"'

REQUIRED FLAGS
     Location resource - The location you want to list the Grid Infrastructure
     versions for. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

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
        Apply a filter in the format : --filter='gi_version="19.0.0.0"'

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
```

### gcloud oracle-database gi-versions minor-versions list

```text
NAME
    gcloud oracle-database gi-versions minor-versions list - list minor
        versions

SYNOPSIS
    gcloud oracle-database gi-versions minor-versions list
        (--gi-version=GI_VERSION : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all minor versions for the specified Grid Infrastructure version and
    location.

EXAMPLES
    To list all minor versions for a Grid Infrastructure version with ID
    19.0.0.0 in the location us-east4, run:

        $ gcloud oracle-database gi-versions minor-versions list \
          --gi-version=19.0.0.0 --location=us-east4

    To list all minor versions for a given shape family with ID EXADATA.X9M in
    the location us-east4 and Grid Infrastructure version with ID 19.0.0.0,
    run:

        $ gcloud oracle-database gi-versions minor-versions list \
          --gi-version=19.0.0.0 --location=us-east4 \
          --filter='shape_family="EXADATA.X9M"'

REQUIRED FLAGS
     Gi version resource - The GI version you want to list the minor versions
     for. The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --gi-version on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --gi-version=GI_VERSION
          ID of the gi-version or fully qualified identifier for the
          gi-version.

          To set the gi-version attribute:
          + provide the argument --gi-version on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The Cloud location for the gi-version.

          To set the location attribute:
          + provide the argument --gi-version on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a filter in the format: --filter='shape_family="EXADATA.X9M"'

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
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/gi-versions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
