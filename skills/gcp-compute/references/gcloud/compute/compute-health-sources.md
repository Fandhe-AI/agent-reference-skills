---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/health-sources
---

# gcloud compute health-sources

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute health-sources create

```text
NAME
    gcloud compute health-sources create - create a health source

SYNOPSIS
    gcloud compute health-sources create (HEALTH_SOURCE : --region=REGION)
        --health-aggregation-policy=HEALTH_AGGREGATION_POLICY
        --sources=SOURCES,[SOURCES,...] [--async] [--description=DESCRIPTION]
        [--source-type=SOURCE_TYPE; default="backend-service"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a health source.

EXAMPLES
    The following command creates a new health source:

        $ gcloud compute health-sources create <HEALTH_SOURCE_NAME> \
            --region=<REGION> --source-type=BACKEND_SERVICE \
            --sources=my-backend-service \
            --health-aggregation-policy=my-health-aggregation-policy

POSITIONAL ARGUMENTS
     Health source resource - The name of the health source you want to create.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument health_source on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HEALTH_SOURCE
          ID of the health source or fully qualified identifier for the health
          source.

          To set the health_source attribute:
          + provide the argument health_source on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument health_source on the command line with a
            fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

REQUIRED FLAGS
     --health-aggregation-policy=HEALTH_AGGREGATION_POLICY
        URL to the health aggregation policy resource. Must be set. Must be
        regional and in the same region as the HealthSource. Can be mutated.

     --sources=SOURCES,[SOURCES,...]
        URLs to the source resources. Must be size 1. Must be a BackendService
        if the sourceType is BACKEND_SERVICE. The BackendService must have load
        balancing scheme INTERNAL or INTERNAL_MANAGED and must be regional and
        in the same region as the HealthSource (cross-region deployment for
        INTERNAL_MANAGED is not supported). The BackendService may use only
        IGs, MIGs, or NEGs of type GCE_VM_IP or GCE_VM_IP_PORT. The
        BackendService may not use haPolicy. Can be mutated.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A textual description of the HealthSource.

     --source-type=SOURCE_TYPE; default="backend-service"
        Specifies the type of the HealthSource. The only allowed value is
        BACKEND_SERVICE. Must be specified when the HealthSource is created,
        and cannot be mutated. SOURCE_TYPE must be (only one value is
        supported): backend-service.

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

        $ gcloud alpha compute health-sources create

        $ gcloud beta compute health-sources create
```

### gcloud compute health-sources delete

```text
NAME
    gcloud compute health-sources delete - delete a health source

SYNOPSIS
    gcloud compute health-sources delete (HEALTH_SOURCE : --region=REGION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a health source.

EXAMPLES
    To delete a single health source, run the following command:

        $ gcloud compute health-sources delete <HEALTH_SOURCE_NAME> \
            --region=<REGION>

POSITIONAL ARGUMENTS
     Health source resource - Name of the health source you want to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument health_source on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HEALTH_SOURCE
          ID of the health source or fully qualified identifier for the health
          source.

          To set the health_source attribute:
          + provide the argument health_source on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument health_source on the command line with a
            fully specified name;
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

        $ gcloud alpha compute health-sources delete

        $ gcloud beta compute health-sources delete
```

### gcloud compute health-sources describe

```text
NAME
    gcloud compute health-sources describe - describe a health source

SYNOPSIS
    gcloud compute health-sources describe (HEALTH_SOURCE : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a health source.

EXAMPLES
    To retrieve a single health source and print its properties, run the
    following command:

        $ gcloud compute health-sources describe <HEALTH_SOURCE_NAME> \
            --region=<REGION>

POSITIONAL ARGUMENTS
     Health source resource - Name of the health source you want to inspect.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument health_source on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HEALTH_SOURCE
          ID of the health source or fully qualified identifier for the health
          source.

          To set the health_source attribute:
          + provide the argument health_source on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument health_source on the command line with a
            fully specified name;
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

        $ gcloud alpha compute health-sources describe

        $ gcloud beta compute health-sources describe
```

### gcloud compute health-sources get-health

```text
NAME
    gcloud compute health-sources get-health - get health status of a health
        source

SYNOPSIS
    gcloud compute health-sources get-health HEALTH_SOURCE [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get health status of a health source.

EXAMPLES
    To get health status of a single health source, run:

        $ gcloud compute health-sources get-health HEALTH_SOURCE \
            --region=REGION

POSITIONAL ARGUMENTS
     HEALTH_SOURCE
        Name of the health source to operate on.

FLAGS
     --region=REGION
        Region of the health source to operate on. Overrides the default
        compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute health-sources get-health

        $ gcloud beta compute health-sources get-health
```

### gcloud compute health-sources list

```text
NAME
    gcloud compute health-sources list - list health sources

SYNOPSIS
    gcloud compute health-sources list [NAME ...] [--regexp=REGEXP, -r REGEXP]
        [--regions=REGION,[REGION,...]] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List health sources.

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

        $ gcloud alpha compute health-sources list

        $ gcloud beta compute health-sources list
```

### gcloud compute health-sources test-iam-permissions

```text
NAME
    gcloud compute health-sources test-iam-permissions - test IAM permissions
        for a health source

SYNOPSIS
    gcloud compute health-sources test-iam-permissions
        (HEALTH_SOURCE : --region=REGION) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns permissions that a caller has on the specified health source.

EXAMPLES
    To test if the caller has 'compute.regionHealthSources.getIamPolicy'
    permission on a health source, run:

        $ gcloud compute health-sources test-iam-permissions \
            my-health-source --region=us-east1 \
            --permissions=compute.regionHealthSources.getIamPolicy

POSITIONAL ARGUMENTS
     Health source resource - Health source you want to test the IAM
     permissions of. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument health_source on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HEALTH_SOURCE
          ID of the health source or fully qualified identifier for the health
          source.

          To set the health_source attribute:
          + provide the argument health_source on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument health_source on the command line with a
            fully specified name;
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

        $ gcloud alpha compute health-sources test-iam-permissions

        $ gcloud beta compute health-sources test-iam-permissions
```

### gcloud compute health-sources update

```text
NAME
    gcloud compute health-sources update - update a health source

SYNOPSIS
    gcloud compute health-sources update (HEALTH_SOURCE : --region=REGION)
        (--description=DESCRIPTION
          --health-aggregation-policy=HEALTH_AGGREGATION_POLICY
          --sources=SOURCES,[SOURCES,...]) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a health source.

EXAMPLES
    The following command updates a new health source named "my-health-source":

        $ gcloud compute health-sources update <HEALTH_SOURCE_NAME> \
            --region=<REGION> --sources=my-backend-service \
            --health-aggregation-policy=my-health-aggregation-policy

POSITIONAL ARGUMENTS
     Health source resource - The name of the health source you want to create.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument health_source on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HEALTH_SOURCE
          ID of the health source or fully qualified identifier for the health
          source.

          To set the health_source attribute:
          + provide the argument health_source on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument health_source on the command line with a
            fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

REQUIRED FLAGS
     At least one of these must be specified:

       --description=DESCRIPTION
          A textual description of the health source.

       --health-aggregation-policy=HEALTH_AGGREGATION_POLICY
          URL to the health aggregation policy resource. Must be set. Must be
          regional and in the same region as the HealthSource. Can be mutated.

       --sources=SOURCES,[SOURCES,...]
          URLs to the source resources. Must be size 1. Must be a
          BackendService if the sourceType is BACKEND_SERVICE. The
          BackendService must have load balancing scheme INTERNAL or
          INTERNAL_MANAGED and must be regional and in the same region as the
          HealthSource (cross-region deployment for INTERNAL_MANAGED is not
          supported). The BackendService may use only IGs, MIGs, or NEGs of
          type GCE_VM_IP or GCE_VM_IP_PORT. The BackendService may not use
          haPolicy. Can be mutated.

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

        $ gcloud alpha compute health-sources update

        $ gcloud beta compute health-sources update
```

### gcloud beta compute health-sources create

```text
NAME
    gcloud beta compute health-sources create - create a health source

SYNOPSIS
    gcloud beta compute health-sources create (HEALTH_SOURCE : --region=REGION)
        --health-aggregation-policy=HEALTH_AGGREGATION_POLICY
        --sources=SOURCES,[SOURCES,...] [--async] [--description=DESCRIPTION]
        [--source-type=SOURCE_TYPE; default="backend-service"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute health-sources delete

```text
NAME
    gcloud beta compute health-sources delete - delete a health source

SYNOPSIS
    gcloud beta compute health-sources delete (HEALTH_SOURCE : --region=REGION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute health-sources describe

```text
NAME
    gcloud beta compute health-sources describe - describe a health source

SYNOPSIS
    gcloud beta compute health-sources describe
        (HEALTH_SOURCE : --region=REGION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute health-sources get-health

```text
NAME
    gcloud beta compute health-sources get-health - get health status of a
        health source

SYNOPSIS
    gcloud beta compute health-sources get-health HEALTH_SOURCE
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute health-sources list

```text
NAME
    gcloud beta compute health-sources list - list health sources

SYNOPSIS
    gcloud beta compute health-sources list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute health-sources test-iam-permissions

```text
NAME
    gcloud beta compute health-sources test-iam-permissions - test IAM
        permissions for a health source

SYNOPSIS
    gcloud beta compute health-sources test-iam-permissions
        (HEALTH_SOURCE : --region=REGION) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute health-sources update

```text
NAME
    gcloud beta compute health-sources update - update a health source

SYNOPSIS
    gcloud beta compute health-sources update (HEALTH_SOURCE : --region=REGION)
        (--description=DESCRIPTION
          --health-aggregation-policy=HEALTH_AGGREGATION_POLICY
          --sources=SOURCES,[SOURCES,...]) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-sources create

```text
NAME
    gcloud alpha compute health-sources create - create a health source

SYNOPSIS
    gcloud alpha compute health-sources create
        (HEALTH_SOURCE : --region=REGION)
        --health-aggregation-policy=HEALTH_AGGREGATION_POLICY
        --sources=SOURCES,[SOURCES,...] [--async] [--description=DESCRIPTION]
        [--source-type=SOURCE_TYPE; default="backend-service"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-sources delete

```text
NAME
    gcloud alpha compute health-sources delete - delete a health source

SYNOPSIS
    gcloud alpha compute health-sources delete
        (HEALTH_SOURCE : --region=REGION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-sources describe

```text
NAME
    gcloud alpha compute health-sources describe - describe a health source

SYNOPSIS
    gcloud alpha compute health-sources describe
        (HEALTH_SOURCE : --region=REGION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-sources get-health

```text
NAME
    gcloud alpha compute health-sources get-health - get health status of a
        health source

SYNOPSIS
    gcloud alpha compute health-sources get-health HEALTH_SOURCE
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-sources list

```text
NAME
    gcloud alpha compute health-sources list - list health sources

SYNOPSIS
    gcloud alpha compute health-sources list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-sources test-iam-permissions

```text
NAME
    gcloud alpha compute health-sources test-iam-permissions - test IAM
        permissions for a health source

SYNOPSIS
    gcloud alpha compute health-sources test-iam-permissions
        (HEALTH_SOURCE : --region=REGION) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-sources update

```text
NAME
    gcloud alpha compute health-sources update - update a health source

SYNOPSIS
    gcloud alpha compute health-sources update
        (HEALTH_SOURCE : --region=REGION)
        (--description=DESCRIPTION
          --health-aggregation-policy=HEALTH_AGGREGATION_POLICY
          --sources=SOURCES,[SOURCES,...]) [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute health-sources list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute health-sources list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/health-sources (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
