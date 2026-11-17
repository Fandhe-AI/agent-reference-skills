---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/rollout-plans
---

# gcloud compute rollout-plans

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute rollout-plans create

```text
NAME
    gcloud compute rollout-plans create - create a Google Compute Engine
        rollout plan

SYNOPSIS
    gcloud compute rollout-plans create NAME --waves-from-file=WAVES_FROM_FILE
        [--description=DESCRIPTION]
        [--location-scope=LOCATION_SCOPE; default="ZONAL"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Google Compute Engine rollout plan.

EXAMPLES
    To create a rollout plan named my-rollout-plan from a wave definition file
    named waves.json, run:

        $ gcloud compute rollout-plans create my-rollout-plan \
            --description="rollout plan description" \
            --location-scope=ZONAL --waves-from-file=waves.json

POSITIONAL ARGUMENTS
     Rollout plan resource - Name of the rollout plan to create. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument name on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the rollout plan or fully qualified identifier for the rollout
          plan.

          To set the name attribute:
          + provide the argument name on the command line.

REQUIRED FLAGS
     --waves-from-file=WAVES_FROM_FILE
        Path to a YAML or JSON file containing the wave definitions for the
        rollout plan.

OPTIONAL FLAGS
     --description=DESCRIPTION
        An optional description of this rollout plan.

     --location-scope=LOCATION_SCOPE; default="ZONAL"
        The location scope of the rollout plan. LOCATION_SCOPE must be one of:
        ZONAL, REGIONAL.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute rollout-plans create

        $ gcloud beta compute rollout-plans create
```

### gcloud compute rollout-plans delete

```text
NAME
    gcloud compute rollout-plans delete - delete a Google Compute Engine
        rollout plan

SYNOPSIS
    gcloud compute rollout-plans delete NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Google Compute Engine rollout plan.

EXAMPLES
    To delete a rollout plan named 'my-rollout-plan', run:

        $ gcloud compute rollout-plans delete my-rollout-plan

POSITIONAL ARGUMENTS
     Rollout plan resource - Name of the rollout plan to delete. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument name on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the rollout plan or fully qualified identifier for the rollout
          plan.

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

        $ gcloud alpha compute rollout-plans delete

        $ gcloud beta compute rollout-plans delete
```

### gcloud compute rollout-plans describe

```text
NAME
    gcloud compute rollout-plans describe - describe a rollout plan

SYNOPSIS
    gcloud compute rollout-plans describe ROLLOUT_PLAN [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a rollout plan.

EXAMPLES
    To retrieve a single rollout plan and print its properties, run the
    following command:

        $ gcloud compute rollout-plans describe my-rollout-plan

POSITIONAL ARGUMENTS
     Rollout Plan resource - Name of the rollout plan you want to inspect. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument rollout_plan on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROLLOUT_PLAN
          ID of the Rollout Plan or fully qualified identifier for the Rollout
          Plan.

          To set the rollout_plan attribute:
          + provide the argument rollout_plan on the command line.

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

        $ gcloud alpha compute rollout-plans describe

        $ gcloud beta compute rollout-plans describe
```

### gcloud compute rollout-plans list

```text
NAME
    gcloud compute rollout-plans list - list Google Compute Engine Rollout
        Plans

SYNOPSIS
    gcloud compute rollout-plans list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Google Compute Engine Rollout Plans in a project.

EXAMPLES
    To list all rollout plans in your project, run:

        $ gcloud compute rollout-plans list

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

        $ gcloud alpha compute rollout-plans list

        $ gcloud beta compute rollout-plans list
```

### gcloud beta compute rollout-plans create

```text
NAME
    gcloud beta compute rollout-plans create - create a Google Compute Engine
        rollout plan

SYNOPSIS
    gcloud beta compute rollout-plans create NAME
        --waves-from-file=WAVES_FROM_FILE [--description=DESCRIPTION]
        [--location-scope=LOCATION_SCOPE; default="ZONAL"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute rollout-plans delete

```text
NAME
    gcloud beta compute rollout-plans delete - delete a Google Compute Engine
        rollout plan

SYNOPSIS
    gcloud beta compute rollout-plans delete NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute rollout-plans describe

```text
NAME
    gcloud beta compute rollout-plans describe - describe a rollout plan

SYNOPSIS
    gcloud beta compute rollout-plans describe ROLLOUT_PLAN
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute rollout-plans list

```text
NAME
    gcloud beta compute rollout-plans list - list Google Compute Engine Rollout
        Plans

SYNOPSIS
    gcloud beta compute rollout-plans list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute rollout-plans create

```text
NAME
    gcloud alpha compute rollout-plans create - create a Google Compute Engine
        rollout plan

SYNOPSIS
    gcloud alpha compute rollout-plans create NAME
        --waves-from-file=WAVES_FROM_FILE [--description=DESCRIPTION]
        [--location-scope=LOCATION_SCOPE; default="ZONAL"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute rollout-plans delete

```text
NAME
    gcloud alpha compute rollout-plans delete - delete a Google Compute Engine
        rollout plan

SYNOPSIS
    gcloud alpha compute rollout-plans delete NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute rollout-plans describe

```text
NAME
    gcloud alpha compute rollout-plans describe - describe a rollout plan

SYNOPSIS
    gcloud alpha compute rollout-plans describe ROLLOUT_PLAN
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute rollout-plans list

```text
NAME
    gcloud alpha compute rollout-plans list - list Google Compute Engine
        Rollout Plans

SYNOPSIS
    gcloud alpha compute rollout-plans list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/rollout-plans (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
