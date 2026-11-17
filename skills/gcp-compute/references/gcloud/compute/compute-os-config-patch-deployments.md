---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/os-config/patch-deployments
---

# gcloud compute os-config patch-deployments

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute os-config patch-deployments create

```text
NAME
    gcloud compute os-config patch-deployments create - create a patch
        deployment for a project

SYNOPSIS
    gcloud compute os-config patch-deployments create PATCH_DEPLOYMENT_ID
        --file=FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute os-config patch-deployments create creates a patch
    deployment in a project from a specified file. A patch deployment triggers
    a patch job to run at specific time(s) according to a schedule, and applies
    instance filters and other patch configurations to the patch job at run
    time. Alternatively, to run a patch job on-demand, see $ gcloud compute
    os-config patch-jobs execute.

EXAMPLES
    To create a patch deployment patch-deployment-1 in the current project,
    run:

        $ gcloud compute os-config patch-deployments create \
          patch-deployment-1 --file=path_to_config_file

POSITIONAL ARGUMENTS
     PATCH_DEPLOYMENT_ID
        Name of the patch deployment to create.

        This name must contain only lowercase letters, numbers, and hyphens,
        start with a letter, end with a number or a letter, be between 1-63
        characters, and unique within the project.

REQUIRED FLAGS
     --file=FILE
        The JSON or YAML file with the patch deployment to create. For
        information about the patch deployment format, see
        https://cloud.google.com/compute/docs/osconfig/rest/v1/projects.patchDeployments.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta compute os-config patch-deployments create
```

### gcloud compute os-config patch-deployments delete

```text
NAME
    gcloud compute os-config patch-deployments delete - delete the specified
        patch deployment

SYNOPSIS
    gcloud compute os-config patch-deployments delete PATCH_DEPLOYMENT
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified patch deployment.

EXAMPLES
    To delete the patch deployment patch-deployment-1 in the current project,
    run:

        $ gcloud compute os-config patch-deployments delete \
          patch-deployment-1

POSITIONAL ARGUMENTS
     Patch deployment resource - Patch deployment to delete. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument patch_deployment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PATCH_DEPLOYMENT
          ID of the patch_deployment or fully qualified identifier for the
          patch_deployment.

          To set the patch_deployment attribute:
          + provide the argument patch_deployment on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta compute os-config patch-deployments delete
```

### gcloud compute os-config patch-deployments describe

```text
NAME
    gcloud compute os-config patch-deployments describe - describe the
        specified patch deployment

SYNOPSIS
    gcloud compute os-config patch-deployments describe PATCH_DEPLOYMENT
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe the specified patch deployment.

EXAMPLES
    To check the status of the patch deployment patch-deployment-1 in the
    current project, run:

        $ gcloud compute os-config patch-deployments describe \
          patch-deployment-1

POSITIONAL ARGUMENTS
     Patch deployment resource - Patch deployment to describe. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument patch_deployment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PATCH_DEPLOYMENT
          ID of the patch_deployment or fully qualified identifier for the
          patch_deployment.

          To set the patch_deployment attribute:
          + provide the argument patch_deployment on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta compute os-config patch-deployments describe
```

### gcloud compute os-config patch-deployments list

```text
NAME
    gcloud compute os-config patch-deployments list - list patch deployments in
        a project

SYNOPSIS
    gcloud compute os-config patch-deployments list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List patch deployments in a project.

EXAMPLES
    To list all patch deployments in the current project, run:

        $ gcloud compute os-config patch-deployments list

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
    This variant is also available:

        $ gcloud beta compute os-config patch-deployments list
```

### gcloud compute os-config patch-deployments pause

```text
NAME
    gcloud compute os-config patch-deployments pause - pause patch deployment
        in a project

SYNOPSIS
    gcloud compute os-config patch-deployments pause PATCH_DEPLOYMENT
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Pause patch deployment in a project.

EXAMPLES
    To pause the patch deployment patch-deployment-1 in the current project,
    run:

        $ gcloud compute os-config patch-deployments pause patch-deployment-1

POSITIONAL ARGUMENTS
     Patch deployment resource - Patch deployment to pause. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument patch_deployment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PATCH_DEPLOYMENT
          ID of the patch_deployment or fully qualified identifier for the
          patch_deployment.

          To set the patch_deployment attribute:
          + provide the argument patch_deployment on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta compute os-config patch-deployments pause
```

### gcloud compute os-config patch-deployments resume

```text
NAME
    gcloud compute os-config patch-deployments resume - resume patch deployment
        in a project

SYNOPSIS
    gcloud compute os-config patch-deployments resume PATCH_DEPLOYMENT
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Resume patch deployment in a project.

EXAMPLES
    To resume the patch deployment patch-deployment-1 in the current project,
    run:

        $ gcloud compute os-config patch-deployments resume \
          patch-deployment-1

POSITIONAL ARGUMENTS
     Patch deployment resource - Patch deployment to resume. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument patch_deployment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PATCH_DEPLOYMENT
          ID of the patch_deployment or fully qualified identifier for the
          patch_deployment.

          To set the patch_deployment attribute:
          + provide the argument patch_deployment on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta compute os-config patch-deployments resume
```

### gcloud compute os-config patch-deployments update

```text
NAME
    gcloud compute os-config patch-deployments update - update patch deployment
        in a project

SYNOPSIS
    gcloud compute os-config patch-deployments update PATCH_DEPLOYMENT_ID
        --file=FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates a patch deployment in a project. To update the patch deployment,
    you must specify a configuration file.

EXAMPLES
    To update a patch deployment patch-deployment-1 in the current project,
    run:

        $ gcloud compute os-config patch-deployments update \
          patch-deployment-1 --file=path_to_config_file

POSITIONAL ARGUMENTS
     PATCH_DEPLOYMENT_ID
        Name of the patch deployment to update.

        To get a list of patch deployments that are available for update, run
        the gcloud compute os-config patch-deployments list command.

REQUIRED FLAGS
     --file=FILE
        The JSON or YAML file with the patch deployment to update. For
        information about the patch deployment format, see
        https://cloud.google.com/compute/docs/osconfig/rest/v1/projects.patchDeployments.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta compute os-config patch-deployments update
```

### gcloud beta compute os-config patch-deployments create

```text
NAME
    gcloud beta compute os-config patch-deployments create - create a patch
        deployment for a project

SYNOPSIS
    gcloud beta compute os-config patch-deployments create PATCH_DEPLOYMENT_ID
        --file=FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-config patch-deployments delete

```text
NAME
    gcloud beta compute os-config patch-deployments delete - delete the
        specified patch deployment

SYNOPSIS
    gcloud beta compute os-config patch-deployments delete PATCH_DEPLOYMENT
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-config patch-deployments describe

```text
NAME
    gcloud beta compute os-config patch-deployments describe - describe the
        specified patch deployment

SYNOPSIS
    gcloud beta compute os-config patch-deployments describe PATCH_DEPLOYMENT
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-config patch-deployments list

```text
NAME
    gcloud beta compute os-config patch-deployments list - list patch
        deployments in a project

SYNOPSIS
    gcloud beta compute os-config patch-deployments list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-config patch-deployments pause

```text
NAME
    gcloud beta compute os-config patch-deployments pause - pause patch
        deployment in a project

SYNOPSIS
    gcloud beta compute os-config patch-deployments pause PATCH_DEPLOYMENT
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-config patch-deployments resume

```text
NAME
    gcloud beta compute os-config patch-deployments resume - resume patch
        deployment in a project

SYNOPSIS
    gcloud beta compute os-config patch-deployments resume PATCH_DEPLOYMENT
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-config patch-deployments update

```text
NAME
    gcloud beta compute os-config patch-deployments update - update a patch
        deployment in a project

SYNOPSIS
    gcloud beta compute os-config patch-deployments update PATCH_DEPLOYMENT_ID
        --file=FILE [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/os-config/patch-deployments (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
