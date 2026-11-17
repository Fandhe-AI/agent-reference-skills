---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/rollouts
---

# gcloud compute rollouts

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute rollouts cancel

```text
NAME
    gcloud compute rollouts cancel - cancel a Google Compute Engine rollout

SYNOPSIS
    gcloud compute rollouts cancel NAME [--rollback] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel a Google Compute Engine rollout.

EXAMPLES
    To cancel a rollout named 'my-rollout', run:

        $ gcloud compute rollouts cancel my-rollout

POSITIONAL ARGUMENTS
     Rollout resource - Name of the rollout to cancel. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument name on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the rollout or fully qualified identifier for the rollout.

          To set the name attribute:
          + provide the argument name on the command line.

FLAGS
     --rollback
        If true, then the ongoing rollout must be rolled back. Else, just
        cancel the rollout without taking any further actions.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute rollouts cancel

        $ gcloud beta compute rollouts cancel
```

### gcloud compute rollouts delete

```text
NAME
    gcloud compute rollouts delete - delete a Google Compute Engine rollout

SYNOPSIS
    gcloud compute rollouts delete NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Google Compute Engine rollout.

EXAMPLES
    To delete a rollout named 'my-rollout', run:

        $ gcloud compute rollouts delete my-rollout

POSITIONAL ARGUMENTS
     Rollout resource - Name of the rollout to delete. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument name on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the rollout or fully qualified identifier for the rollout.

          To set the name attribute:
          + provide the argument name on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute rollouts delete

        $ gcloud beta compute rollouts delete
```

### gcloud compute rollouts describe

```text
NAME
    gcloud compute rollouts describe - describe a rollout

SYNOPSIS
    gcloud compute rollouts describe ROLLOUT [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a rollout.

EXAMPLES
    To retrieve a single rollout and print its properties, run the following
    command:

        $ gcloud compute rollouts describe my-rollout

POSITIONAL ARGUMENTS
     Rollout resource - Name of the rollout you want to inspect. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROLLOUT
          ID of the Rollout or fully qualified identifier for the Rollout.

          To set the rollout attribute:
          + provide the argument rollout on the command line.

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

        $ gcloud alpha compute rollouts describe

        $ gcloud beta compute rollouts describe
```

### gcloud compute rollouts list

```text
NAME
    gcloud compute rollouts list - list Google Compute Engine Rollouts

SYNOPSIS
    gcloud compute rollouts list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Google Compute Engine Rollouts in a project.

EXAMPLES
    To list all rollouts in your project, run:

        $ gcloud compute rollouts list

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

        $ gcloud alpha compute rollouts list

        $ gcloud beta compute rollouts list
```

### gcloud beta compute rollouts cancel

```text
NAME
    gcloud beta compute rollouts cancel - cancel a Google Compute Engine
        rollout

SYNOPSIS
    gcloud beta compute rollouts cancel NAME [--rollback]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute rollouts delete

```text
NAME
    gcloud beta compute rollouts delete - delete a Google Compute Engine
        rollout

SYNOPSIS
    gcloud beta compute rollouts delete NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute rollouts describe

```text
NAME
    gcloud beta compute rollouts describe - describe a rollout

SYNOPSIS
    gcloud beta compute rollouts describe ROLLOUT [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute rollouts list

```text
NAME
    gcloud beta compute rollouts list - list Google Compute Engine Rollouts

SYNOPSIS
    gcloud beta compute rollouts list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute rollouts advance

```text
NAME
    gcloud alpha compute rollouts advance - advance a Google Compute Engine
        rollout

SYNOPSIS
    gcloud alpha compute rollouts advance NAME
        --current-wave-number=CURRENT_WAVE_NUMBER [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute rollouts cancel

```text
NAME
    gcloud alpha compute rollouts cancel - cancel a Google Compute Engine
        rollout

SYNOPSIS
    gcloud alpha compute rollouts cancel NAME [--rollback]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute rollouts delete

```text
NAME
    gcloud alpha compute rollouts delete - delete a Google Compute Engine
        rollout

SYNOPSIS
    gcloud alpha compute rollouts delete NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute rollouts describe

```text
NAME
    gcloud alpha compute rollouts describe - describe a rollout

SYNOPSIS
    gcloud alpha compute rollouts describe ROLLOUT [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute rollouts list

```text
NAME
    gcloud alpha compute rollouts list - list Google Compute Engine Rollouts

SYNOPSIS
    gcloud alpha compute rollouts list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/rollouts (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
