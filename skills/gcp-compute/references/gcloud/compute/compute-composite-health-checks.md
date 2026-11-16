---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/composite-health-checks
---

# gcloud compute composite-health-checks

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute composite-health-checks create

```text
NAME
    gcloud compute composite-health-checks create - create a composite health
        check

SYNOPSIS
    gcloud compute composite-health-checks create
        (COMPOSITE_HEALTH_CHECK : --region=REGION)
        --health-destination=HEALTH_DESTINATION
        --health-sources=HEALTH_SOURCES,[...] [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a composite health check.

EXAMPLES
    The following command creates a new composite health check:

        $ gcloud compute composite-health-checks create \
            <COMPOSITE_HEALTH_CHECK_NAME> --region=<REGION> \
            --health-sources=my-hs --health-destination=my-fr

POSITIONAL ARGUMENTS
     Composite health check resource - The name of the composite health check
     you want to create. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument composite_health_check on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       COMPOSITE_HEALTH_CHECK
          ID of the composite health check or fully qualified identifier for
          the composite health check.

          To set the composite_health_check attribute:
          + provide the argument composite_health_check on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument composite_health_check on the command line
            with a fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

REQUIRED FLAGS
     --health-destination=HEALTH_DESTINATION
        URL to the destination resource. Must be set. Must be a ForwardingRule.
        The ForwardingRule must have load balancing scheme INTERNAL or
        INTERNAL_MANAGED and must be regional and in the same region as the
        CompositeHealthCheck (cross-region deployment for INTERNAL_MANAGED is
        not supported). Can be mutated.

     --health-sources=HEALTH_SOURCES,[...]
        URLs to the HealthSource resources whose results are AND'ed. I.e. the
        aggregated result is HEALTHY only if all sources are HEALTHY. Must have
        at least 1. Must not have more than 10. Must be regional and in the
        same region as the CompositeHealthCheck. Can be mutated.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A textual description of this resource.

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

        $ gcloud alpha compute composite-health-checks create

        $ gcloud beta compute composite-health-checks create
```

### gcloud compute composite-health-checks delete

```text
NAME
    gcloud compute composite-health-checks delete - delete a composite health
        check

SYNOPSIS
    gcloud compute composite-health-checks delete
        (COMPOSITE_HEALTH_CHECK : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a composite health check.

EXAMPLES
    To delete a single composite health check, run the following command:

        $ gcloud compute composite-health-checks delete \
            <COMPOSITE_HEALTH_CHECK_NAME> --region=<REGION>

POSITIONAL ARGUMENTS
     Composite health check resource - Name of the composite health check you
     want to delete. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument composite_health_check on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       COMPOSITE_HEALTH_CHECK
          ID of the composite health check or fully qualified identifier for
          the composite health check.

          To set the composite_health_check attribute:
          + provide the argument composite_health_check on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument composite_health_check on the command line
            with a fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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

        $ gcloud alpha compute composite-health-checks delete

        $ gcloud beta compute composite-health-checks delete
```

### gcloud compute composite-health-checks describe

```text
NAME
    gcloud compute composite-health-checks describe - describe a composite
        health check

SYNOPSIS
    gcloud compute composite-health-checks describe
        (COMPOSITE_HEALTH_CHECK : --region=REGION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a composite health check.

EXAMPLES
    To retrieve a single composite health check and print its properties, run
    the following command:

        $ gcloud compute composite-health-checks describe \
            <COMPOSITE_HEALTH_CHECK_NAME> --region=<REGION>

POSITIONAL ARGUMENTS
     Composite health check resource - Name of the composite health check you
     want to inspect. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument composite_health_check on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       COMPOSITE_HEALTH_CHECK
          ID of the composite health check or fully qualified identifier for
          the composite health check.

          To set the composite_health_check attribute:
          + provide the argument composite_health_check on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument composite_health_check on the command line
            with a fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

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

        $ gcloud alpha compute composite-health-checks describe

        $ gcloud beta compute composite-health-checks describe
```

### gcloud compute composite-health-checks get-health

```text
NAME
    gcloud compute composite-health-checks get-health - get health status of a
        composite health check

SYNOPSIS
    gcloud compute composite-health-checks get-health COMPOSITE_HEALTH_CHECK
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get health status of a composite health check.

EXAMPLES
    To get health of a composite health check, run:

        $ gcloud compute composite-health-checks get-health \
            COMPOSITE_HEALTH_CHECK --region=REGION

POSITIONAL ARGUMENTS
     COMPOSITE_HEALTH_CHECK
        Name of the composite health check to operate on.

FLAGS
     --region=REGION
        Region of the composite health check to operate on. Overrides the
        default compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute composite-health-checks get-health

        $ gcloud beta compute composite-health-checks get-health
```

### gcloud compute composite-health-checks list

```text
NAME
    gcloud compute composite-health-checks list - list composite health checks

SYNOPSIS
    gcloud compute composite-health-checks list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List composite health checks.

POSITIONAL ARGUMENTS
     [NAME ...]
        (DEPRECATED) If provided, show details for the specified names and/or
        URIs of resources.

        Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )"
        instead.

FLAGS
     --regexp=REGEXP, -r REGEXP
        (DEPRECATED) Regular expression to filter the names of the results on.
        Any names that do not match the entire regular expression will be
        filtered out.

        Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.

     --regions=REGION,[REGION,...]
        If provided, only resources from the given regions are queried.

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

        $ gcloud alpha compute composite-health-checks list

        $ gcloud beta compute composite-health-checks list
```

### gcloud compute composite-health-checks test-iam-permissions

```text
NAME
    gcloud compute composite-health-checks test-iam-permissions - test IAM
        permissions for a Compute Engine composite health check

SYNOPSIS
    gcloud compute composite-health-checks test-iam-permissions
        (COMPOSITE_HEALTH_CHECK : --region=REGION)
        --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns permissions that a caller has on the specified composite health
    check.

EXAMPLES
    To test if the caller has 'compute.regionCompositeHealthChecks.get'
    permission on a composite health check my-composite-health-check in region
    us-central1, run:

        $ gcloud compute composite-health-checks test-iam-permissions \
            my-composite-health-check --region=us-central1 \
            --permissions=compute.regionCompositeHealthChecks.get

POSITIONAL ARGUMENTS
     Composite health check resource - The composite health check for which to
     test permissions. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument composite_health_check on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       COMPOSITE_HEALTH_CHECK
          ID of the composite health check or fully qualified identifier for
          the composite health check.

          To set the composite_health_check attribute:
          + provide the argument composite_health_check on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument composite_health_check on the command line
            with a fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

REQUIRED FLAGS
     --permissions=[PERMISSIONS,...]
        Permissions to be tested.

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

        $ gcloud alpha compute composite-health-checks test-iam-permissions

        $ gcloud beta compute composite-health-checks test-iam-permissions
```

### gcloud compute composite-health-checks update

```text
NAME
    gcloud compute composite-health-checks update - update a composite health
        check

SYNOPSIS
    gcloud compute composite-health-checks update
        (COMPOSITE_HEALTH_CHECK : --region=REGION)
        (--description=DESCRIPTION --health-destination=HEALTH_DESTINATION
          --health-sources=HEALTH_SOURCES,[...]) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a composite health check.

EXAMPLES
    The following command updates an existing composite health check:

        $ gcloud compute composite-health-checks update \
            <COMPOSITE_HEALTH_CHECK_NAME> --region=<REGION> \
            --health-destination=my-new-fr

POSITIONAL ARGUMENTS
     Composite health check resource - The name of the composite health check
     you want to update. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument composite_health_check on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       COMPOSITE_HEALTH_CHECK
          ID of the composite health check or fully qualified identifier for
          the composite health check.

          To set the composite_health_check attribute:
          + provide the argument composite_health_check on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument composite_health_check on the command line
            with a fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

REQUIRED FLAGS
     At least one of these must be specified:

       --description=DESCRIPTION
          A textual description of this resource.

       --health-destination=HEALTH_DESTINATION
          URL to the destination resource. Must be set. Must be a
          ForwardingRule. The ForwardingRule must have load balancing scheme
          INTERNAL or INTERNAL_MANAGED and must be regional and in the same
          region as the CompositeHealthCheck (cross-region deployment for
          INTERNAL_MANAGED is not supported). Can be mutated.

       --health-sources=HEALTH_SOURCES,[...]
          URLs to the HealthSource resources whose results are AND'ed. I.e. the
          aggregated result is HEALTHY only if all sources are HEALTHY. Must
          have at least 1. Must not have more than 10. Must be regional and in
          the same region as the CompositeHealthCheck. Can be mutated.

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

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute composite-health-checks update

        $ gcloud beta compute composite-health-checks update
```

### gcloud beta compute composite-health-checks create

```text
NAME
    gcloud beta compute composite-health-checks create - create a composite
        health check

SYNOPSIS
    gcloud beta compute composite-health-checks create
        (COMPOSITE_HEALTH_CHECK : --region=REGION)
        --health-destination=HEALTH_DESTINATION
        --health-sources=HEALTH_SOURCES,[...] [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute composite-health-checks delete

```text
NAME
    gcloud beta compute composite-health-checks delete - delete a composite
        health check

SYNOPSIS
    gcloud beta compute composite-health-checks delete
        (COMPOSITE_HEALTH_CHECK : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute composite-health-checks describe

```text
NAME
    gcloud beta compute composite-health-checks describe - describe a composite
        health check

SYNOPSIS
    gcloud beta compute composite-health-checks describe
        (COMPOSITE_HEALTH_CHECK : --region=REGION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute composite-health-checks get-health

```text
NAME
    gcloud beta compute composite-health-checks get-health - get health status
        of a composite health check

SYNOPSIS
    gcloud beta compute composite-health-checks get-health
        COMPOSITE_HEALTH_CHECK [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute composite-health-checks list

```text
NAME
    gcloud beta compute composite-health-checks list - list composite health
        checks

SYNOPSIS
    gcloud beta compute composite-health-checks list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute composite-health-checks test-iam-permissions

```text
NAME
    gcloud beta compute composite-health-checks test-iam-permissions - test IAM
        permissions for a Compute Engine composite health check

SYNOPSIS
    gcloud beta compute composite-health-checks test-iam-permissions
        (COMPOSITE_HEALTH_CHECK : --region=REGION)
        --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute composite-health-checks update

```text
NAME
    gcloud beta compute composite-health-checks update - update a composite
        health check

SYNOPSIS
    gcloud beta compute composite-health-checks update
        (COMPOSITE_HEALTH_CHECK : --region=REGION)
        (--description=DESCRIPTION --health-destination=HEALTH_DESTINATION
          --health-sources=HEALTH_SOURCES,[...]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute composite-health-checks create

```text
NAME
    gcloud alpha compute composite-health-checks create - create a composite
        health check

SYNOPSIS
    gcloud alpha compute composite-health-checks create
        (COMPOSITE_HEALTH_CHECK : --region=REGION)
        --health-destination=HEALTH_DESTINATION
        --health-sources=HEALTH_SOURCES,[...] [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute composite-health-checks delete

```text
NAME
    gcloud alpha compute composite-health-checks delete - delete a composite
        health check

SYNOPSIS
    gcloud alpha compute composite-health-checks delete
        (COMPOSITE_HEALTH_CHECK : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute composite-health-checks describe

```text
NAME
    gcloud alpha compute composite-health-checks describe - describe a
        composite health check

SYNOPSIS
    gcloud alpha compute composite-health-checks describe
        (COMPOSITE_HEALTH_CHECK : --region=REGION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute composite-health-checks get-health

```text
NAME
    gcloud alpha compute composite-health-checks get-health - get health status
        of a composite health check

SYNOPSIS
    gcloud alpha compute composite-health-checks get-health
        COMPOSITE_HEALTH_CHECK [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute composite-health-checks list

```text
NAME
    gcloud alpha compute composite-health-checks list - list composite health
        checks

SYNOPSIS
    gcloud alpha compute composite-health-checks list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute composite-health-checks test-iam-permissions

```text
NAME
    gcloud alpha compute composite-health-checks test-iam-permissions - test
        IAM permissions for a Compute Engine composite health check

SYNOPSIS
    gcloud alpha compute composite-health-checks test-iam-permissions
        (COMPOSITE_HEALTH_CHECK : --region=REGION)
        --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute composite-health-checks update

```text
NAME
    gcloud alpha compute composite-health-checks update - update a composite
        health check

SYNOPSIS
    gcloud alpha compute composite-health-checks update
        (COMPOSITE_HEALTH_CHECK : --region=REGION)
        (--description=DESCRIPTION --health-destination=HEALTH_DESTINATION
          --health-sources=HEALTH_SOURCES,[...]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute composite-health-checks list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute composite-health-checks list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/composite-health-checks (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
