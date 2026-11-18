---
source: https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/violations
---

# gcloud assured workloads violations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud assured workloads violations acknowledge

```text
NAME
    gcloud assured workloads violations acknowledge - acknowledge an existing
        Assured Workloads compliance violation

SYNOPSIS
    gcloud assured workloads violations acknowledge
        (VIOLATION : --location=LOCATION
          --organization=ORGANIZATION --workload=WORKLOAD) --comment=COMMENT
        [--acknowledge-type=ACKNOWLEDGE_TYPE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Acknowledge an existing Assured Workloads compliance violation.

EXAMPLES
    To acknowledge an Assured Workloads Violation in the us-central1 region,
    belonging to an organization with ID 123, with workload ID 456, with
    violation ID 789 and comment as test ack, run:

        $ gcloud assured workloads violations acknowledge \
             organizations/123/locations/us-central1/workloads/456/\
         violations/789 --comment="test ack"

POSITIONAL ARGUMENTS
     Violation resource - The Assured Workloads violation resource to
     acknowledge. The arguments in this group can be used to specify the
     attributes of this resource.

     This must be specified.

       VIOLATION
          ID of the violation or fully qualified identifier for the violation.

          To set the violation attribute:
          + provide the argument violation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the violation.

          To set the location attribute:
          + provide the argument violation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The parent organization for the violation.

          To set the organization attribute:
          + provide the argument violation on the command line with a fully
            specified name;
          + provide the argument --organization on the command line.

       --workload=WORKLOAD
          The workload for the violation.

          To set the workload attribute:
          + provide the argument violation on the command line with a fully
            specified name;
          + provide the argument --workload on the command line.

REQUIRED FLAGS
     --comment=COMMENT
        Business justification used added to acknowledge a violation.

OPTIONAL FLAGS
     --acknowledge-type=ACKNOWLEDGE_TYPE
        the acknowledge type for specified violation, which is one of:
        SINGLE_VIOLATION - to acknowledge specified violation,
        EXISTING_CHILD_RESOURCE_VIOLATIONS - to acknowledge specified org
        policy violation and all associated child resource violations.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha assured workloads violations acknowledge

        $ gcloud beta assured workloads violations acknowledge
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud assured workloads violations acknowledge organizations/123/locations/us-central1/workloads/456/violations/789 \
    --comment="test ack"
```

### gcloud assured workloads violations describe

```text
NAME
    gcloud assured workloads violations describe - describe an Assured
        Workloads compliance violation

SYNOPSIS
    gcloud assured workloads violations describe
        (VIOLATION : --location=LOCATION
          --organization=ORGANIZATION --workload=WORKLOAD)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Obtain details about a given compliance violation.

EXAMPLES
    To describe an Assured Workloads Violation in the us-central1 region,
    belonging to an organization with ID 123, with workload ID 456, with
    violation ID 789, run:

        $ gcloud assured workloads violations describe \
            organizations/123/locations/us-central1/workloads/456/\
        violations/789

POSITIONAL ARGUMENTS
     Violation resource - The Assured Workloads violation resource to describe.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       VIOLATION
          ID of the violation or fully qualified identifier for the violation.

          To set the violation attribute:
          + provide the argument violation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the violation.

          To set the location attribute:
          + provide the argument violation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The parent organization for the violation.

          To set the organization attribute:
          + provide the argument violation on the command line with a fully
            specified name;
          + provide the argument --organization on the command line.

       --workload=WORKLOAD
          The workload for the violation.

          To set the workload attribute:
          + provide the argument violation on the command line with a fully
            specified name;
          + provide the argument --workload on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha assured workloads violations describe

        $ gcloud beta assured workloads violations describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud assured workloads violations describe organizations/123/locations/us-central1/workloads/456/violations/789
```

### gcloud assured workloads violations list

```text
NAME
    gcloud assured workloads violations list - list all Assured Workloads
        violations that belong to a assured workloads environment

SYNOPSIS
    gcloud assured workloads violations list --location=LOCATION
        --organization=ORGANIZATION --workload=WORKLOAD [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Violations that belong to the given Assured Workloads environment.

EXAMPLES
    The following example command lists all violations with these properties:

      o belonging to an organization with ID 123
      o belonging to the assured workload with ID w123
      o located in the us-central1 region
      o returning no more than 30 results
      o requesting 10 results at a time from the backend

        $ gcloud assured workloads violations list --organization=123 \
            --location=us-central1 --workload=w123 --limit=30 --page-size=10

REQUIRED FLAGS
     --location=LOCATION
        The location of the Assured Workloads environments. For a current list
        of supported LOCATION values, see Assured Workloads locations
        (https://cloud.google.com/assured-workloads/docs/locations).

     --organization=ORGANIZATION
        The parent organization of the Assured Workloads environments, provided
        as an organization ID.

     --workload=WORKLOAD
        The parent workload of the Assured Workloads violations, provided as
        workload ID.

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

        $ gcloud alpha assured workloads violations list

        $ gcloud beta assured workloads violations list
```

### gcloud beta assured workloads violations acknowledge

```text
NAME
    gcloud beta assured workloads violations acknowledge - acknowledge an
        existing Assured Workloads compliance violation

SYNOPSIS
    gcloud beta assured workloads violations acknowledge
        (VIOLATION : --location=LOCATION
          --organization=ORGANIZATION --workload=WORKLOAD) --comment=COMMENT
        [--acknowledge-type=ACKNOWLEDGE_TYPE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta assured workloads violations describe

```text
NAME
    gcloud beta assured workloads violations describe - describe an Assured
        Workloads compliance violation

SYNOPSIS
    gcloud beta assured workloads violations describe
        (VIOLATION : --location=LOCATION
          --organization=ORGANIZATION --workload=WORKLOAD)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta assured workloads violations list

```text
NAME
    gcloud beta assured workloads violations list - list all Assured Workloads
        violations that belong to a assured workloads environment

SYNOPSIS
    gcloud beta assured workloads violations list --location=LOCATION
        --organization=ORGANIZATION --workload=WORKLOAD [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha assured workloads violations acknowledge

```text
NAME
    gcloud alpha assured workloads violations acknowledge - acknowledge an
        existing Assured Workloads compliance violation

SYNOPSIS
    gcloud alpha assured workloads violations acknowledge
        (VIOLATION : --location=LOCATION
          --organization=ORGANIZATION --workload=WORKLOAD) --comment=COMMENT
        [--acknowledge-type=ACKNOWLEDGE_TYPE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha assured workloads violations describe

```text
NAME
    gcloud alpha assured workloads violations describe - describe an Assured
        Workloads compliance violation

SYNOPSIS
    gcloud alpha assured workloads violations describe
        (VIOLATION : --location=LOCATION
          --organization=ORGANIZATION --workload=WORKLOAD)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha assured workloads violations list

```text
NAME
    gcloud alpha assured workloads violations list - list all Assured Workloads
        violations that belong to a assured workloads environment

SYNOPSIS
    gcloud alpha assured workloads violations list --location=LOCATION
        --organization=ORGANIZATION --workload=WORKLOAD [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/violations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
