---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/operations
---

# gcloud dns operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dns operations describe

```text
NAME
    gcloud dns operations describe - describe an operation

SYNOPSIS
    gcloud dns operations describe OPERATION_ID --zone=ZONE, -z ZONE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command displays the details of a single managed-zone operation.

EXAMPLES
    To describe a managed-zone operation:

        $ gcloud dns operations describe 1234 --zone=my_zone

POSITIONAL ARGUMENTS
     OPERATION_ID
        The id of the operation to display.

REQUIRED FLAGS
     --zone=ZONE, -z ZONE
        Name of zone to get operations from.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns operations describe

        $ gcloud beta dns operations describe
```

### gcloud dns operations list

```text
NAME
    gcloud dns operations list - list Cloud DNS operations

SYNOPSIS
    gcloud dns operations list --zones=[ZONES,...] [--filter=EXPRESSION]
        [--limit=LIMIT] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command displays Cloud DNS operations for one or more Cloud DNS
    managed-zones (see $ gcloud dns managed-zones --help).

EXAMPLES
    To see the list of all operations for two managed-zones, run:

        $ gcloud dns operations list --zones=zone1,zone2

    To see the last 5 operations for two managed-zones, run:

        $ gcloud dns operations list --zones=zone1,zone2 \
            --sort-by=~start_time --limit=5

REQUIRED FLAGS
     Zone resource - Name of one or more zones to read. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --zones on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --zones=[ZONES,...]
          IDs of the zones or fully qualified identifiers for the zones.

          To set the zone attribute:
          + provide the argument --zones on the command line.

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

NOTES
    These variants are also available:

        $ gcloud alpha dns operations list

        $ gcloud beta dns operations list
```

### gcloud beta dns operations describe

```text
NAME
    gcloud beta dns operations describe - describe an operation

SYNOPSIS
    gcloud beta dns operations describe OPERATION_ID --zone=ZONE, -z ZONE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns operations list

```text
NAME
    gcloud beta dns operations list - list Cloud DNS operations

SYNOPSIS
    gcloud beta dns operations list --zones=[ZONES,...] [--filter=EXPRESSION]
        [--limit=LIMIT] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns operations describe

```text
NAME
    gcloud alpha dns operations describe - describe an operation

SYNOPSIS
    gcloud alpha dns operations describe OPERATION_ID --zone=ZONE, -z ZONE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns operations list

```text
NAME
    gcloud alpha dns operations list - list Cloud DNS operations

SYNOPSIS
    gcloud alpha dns operations list --zones=[ZONES,...] [--filter=EXPRESSION]
        [--limit=LIMIT] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
