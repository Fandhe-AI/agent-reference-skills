---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bq/migration-workflows
---

# gcloud bq migration-workflows

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bq migration-workflows create

```text
NAME
    gcloud bq migration-workflows create - create migration workflows

SYNOPSIS
    gcloud bq migration-workflows create --config-file=CONFIG_FILE
        --location=LOCATION [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a migration workflow

EXAMPLES
    To create a migration workflow in EU synchronously based on a config file,
    run:

        $ gcloud bq migration-workflows create --location=EU \
            --config-file=config_file.yaml --no-async

REQUIRED FLAGS
     --config-file=CONFIG_FILE
        Path to the migration workflows config file.

     --location=LOCATION
        Location of the migration workflow.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha bq migration-workflows create

        $ gcloud beta bq migration-workflows create
```

### gcloud bq migration-workflows delete

```text
NAME
    gcloud bq migration-workflows delete - delete migration workflows

SYNOPSIS
    gcloud bq migration-workflows delete (WORKFLOW : --location=LOCATION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a migration workflow

EXAMPLES
    To delete a migration workflow projects/123/locations/eu/workflows/1234,
    run:

        $ gcloud bq migration-workflows delete \
            projects/123/locations/eu/workflows/1234

POSITIONAL ARGUMENTS
     Workflow resource - The unique identifier for the migration workflow.
     Example: projects/123/locations/us/workflows/1234 The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument workflow on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WORKFLOW
          ID of the workflow or fully qualified identifier for the workflow.

          To set the workflow attribute:
          + provide the argument workflow on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the workflow resource.

          To set the location attribute:
          + provide the argument workflow on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the bigquerymigration/v2 API. The full documentation for
    this API can be found at:
    https://cloud.google.com/solutions/migration/dw2bq/dw-bq-migration-overview

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha bq migration-workflows delete

        $ gcloud beta bq migration-workflows delete
```

### gcloud bq migration-workflows describe

```text
NAME
    gcloud bq migration-workflows describe - describe migration workflows

SYNOPSIS
    gcloud bq migration-workflows describe (WORKFLOW : --location=LOCATION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a migration workflow

EXAMPLES
    To describe a migration workflow projects/123/locations/eu/workflows/1234,
    run:

        $ gcloud bq migration-workflows describe \
            projects/123/locations/eu/workflows/1234

POSITIONAL ARGUMENTS
     Workflow resource - The unique identifier for the migration workflow.
     Example: projects/123/locations/us/workflows/1234 The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument workflow on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WORKFLOW
          ID of the workflow or fully qualified identifier for the workflow.

          To set the workflow attribute:
          + provide the argument workflow on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the workflow resource.

          To set the location attribute:
          + provide the argument workflow on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the bigquerymigration/v2 API. The full documentation for
    this API can be found at:
    https://cloud.google.com/solutions/migration/dw2bq/dw-bq-migration-overview

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha bq migration-workflows describe

        $ gcloud beta bq migration-workflows describe
```

### gcloud bq migration-workflows list

```text
NAME
    gcloud bq migration-workflows list - list migration workflows

SYNOPSIS
    gcloud bq migration-workflows list --location=LOCATION
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List migration workflows

EXAMPLES
    To list all migration workflows in location EU, run:

        $ gcloud bq migration-workflows list --location=eu

REQUIRED FLAGS
     Location resource - The project and location of the migration workflows to
     list. Example: projects/123/locations/us This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

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

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

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
    This command uses the bigquerymigration/v2 API. The full documentation for
    this API can be found at:
    https://cloud.google.com/solutions/migration/dw2bq/dw-bq-migration-overview

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha bq migration-workflows list

        $ gcloud beta bq migration-workflows list
```

### gcloud beta bq migration-workflows create

```text
NAME
    gcloud beta bq migration-workflows create - create migration workflows

SYNOPSIS
    gcloud beta bq migration-workflows create --config-file=CONFIG_FILE
        --location=LOCATION [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bq migration-workflows delete

```text
NAME
    gcloud beta bq migration-workflows delete - delete migration workflows

SYNOPSIS
    gcloud beta bq migration-workflows delete (WORKFLOW : --location=LOCATION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bq migration-workflows describe

```text
NAME
    gcloud beta bq migration-workflows describe - describe migration workflows

SYNOPSIS
    gcloud beta bq migration-workflows describe
        (WORKFLOW : --location=LOCATION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bq migration-workflows list

```text
NAME
    gcloud beta bq migration-workflows list - list migration workflows

SYNOPSIS
    gcloud beta bq migration-workflows list --location=LOCATION
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq migration-workflows create

```text
NAME
    gcloud alpha bq migration-workflows create - create migration workflows

SYNOPSIS
    gcloud alpha bq migration-workflows create --config-file=CONFIG_FILE
        --location=LOCATION [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq migration-workflows delete

```text
NAME
    gcloud alpha bq migration-workflows delete - delete migration workflows

SYNOPSIS
    gcloud alpha bq migration-workflows delete (WORKFLOW : --location=LOCATION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq migration-workflows describe

```text
NAME
    gcloud alpha bq migration-workflows describe - describe migration workflows

SYNOPSIS
    gcloud alpha bq migration-workflows describe
        (WORKFLOW : --location=LOCATION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq migration-workflows list

```text
NAME
    gcloud alpha bq migration-workflows list - list migration workflows

SYNOPSIS
    gcloud alpha bq migration-workflows list --location=LOCATION
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bq/migration-workflows (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
