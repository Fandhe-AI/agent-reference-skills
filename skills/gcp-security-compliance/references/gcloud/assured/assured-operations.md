---
source: https://docs.cloud.google.com/sdk/gcloud/reference/assured/operations
---

# gcloud assured operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud assured operations describe

```text
NAME
    gcloud assured operations describe - describe Assured Workloads operations

SYNOPSIS
    gcloud assured operations describe
        (OPERATION : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Obtain details about a given Assured Workloads operation.

EXAMPLES
    To describe an Assured Workloads operation in the us-central1 region,
    belonging to an organization with ID 123, with workload ID 456, run:

        $ gcloud assured operations describe \
            organizations/123/locations/us-central1/operations/456

POSITIONAL ARGUMENTS
     Operation resource - The Assured Workloads operation resource to describe.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the operation.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The parent organization for the operation.

          To set the organization attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --organization on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha assured operations describe

        $ gcloud beta assured operations describe
```

### gcloud assured operations list

```text
NAME
    gcloud assured operations list - list all Assured Workloads operations that
        belong to a given parent organization

SYNOPSIS
    gcloud assured operations list --location=LOCATION
        --organization=ORGANIZATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Assured Workloads operations that belong to a given parent
    organization.

EXAMPLES
    The following example command lists all Assured Workloads operations with
    these properties:

      o belonging to an organization with ID 123
      o located in the us-central1 region
      o return no more than 30 results
      o requesting 10 results at a time from the backend

        $ gcloud assured operations list \
            organizations/123/locations/us-central1 --limit=30 \
            --page-size=10

REQUIRED FLAGS
     --location=LOCATION
        The location of the Assured Workloads operations. For a current list of
        supported LOCATION values, see Assured Workloads locations
        (https://cloud.google.com/assured-workloads/docs/locations).

     --organization=ORGANIZATION
        The parent organization of the Assured Workloads operations, provided
        as an organization ID.

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

        $ gcloud alpha assured operations list

        $ gcloud beta assured operations list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud assured operations list \
    --organization=123 \
    --location=us-central1 \
    --limit=30 \
    --page-size=10
```

### gcloud beta assured operations describe

```text
NAME
    gcloud beta assured operations describe - describe Assured Workloads
        operations

SYNOPSIS
    gcloud beta assured operations describe
        (OPERATION : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta assured operations list

```text
NAME
    gcloud beta assured operations list - list all Assured Workloads operations
        that belong to a given parent organization

SYNOPSIS
    gcloud beta assured operations list --location=LOCATION
        --organization=ORGANIZATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha assured operations describe

```text
NAME
    gcloud alpha assured operations describe - describe Assured Workloads
        operations

SYNOPSIS
    gcloud alpha assured operations describe
        (OPERATION : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha assured operations list

```text
NAME
    gcloud alpha assured operations list - list all Assured Workloads
        operations that belong to a given parent organization

SYNOPSIS
    gcloud alpha assured operations list --location=LOCATION
        --organization=ORGANIZATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` example passes `organizations/123/locations/us-central1` as a positional argument, but the SYNOPSIS (`gcloud assured operations list --location=LOCATION --organization=ORGANIZATION`) takes no positional arguments (gcloud 593.0.0: "unrecognized arguments: organizations/123/locations/us-central1"); the runnable form passes the organization (ID 123) and region (us-central1) the example describes as `--organization=123 --location=us-central1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/assured/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
