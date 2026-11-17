---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/http-health-checks
---

# gcloud compute http-health-checks

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute http-health-checks create

```text
NAME
    gcloud compute http-health-checks create - create a legacy HTTP health
        check

SYNOPSIS
    gcloud compute http-health-checks create NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2] [--host=HOST]
        [--port=PORT; default=80] [--request-path=REQUEST_PATH; default="/"]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Legacy HTTP health checks are required if you want to implement health
    checking for a target pool backend of an external passthrough Network Load
    Balancer. Though you can use legacy HTTP health checks in certain other
    Google Cloud Platform load balancing configurations and for managed
    instance group autohealing, you should consider a non-legacy HTTP health
    check created with health-checks create http instead.

    For more information about the differences between legacy and non-legacy
    health checks see:
    https://cloud.google.com/load-balancing/docs/health-check-concepts#category_and_protocol

    For information about what type of health check to use for a particular
    load balancer, see:
    https://cloud.google.com/load-balancing/docs/health-check-concepts#lb_guide

POSITIONAL ARGUMENTS
     NAME
        Name of the HTTP health check to create.

FLAGS
     --check-interval=CHECK_INTERVAL; default="5s"
        How often to perform a health check for an instance. For example,
        specifying 10s will run the check every 10 seconds. The default value
        is 5s. See $ gcloud topic datetimes for information on duration
        formats.

     --description=DESCRIPTION
        An optional, textual description for the HTTP health check.

     --healthy-threshold=HEALTHY_THRESHOLD; default=2
        The number of consecutive successful health checks before an unhealthy
        instance is marked as healthy. The default is 2.

     --host=HOST
        The value of the host header used in this HTTP health check request. By
        default, this is empty and Compute Engine automatically sets the host
        header in health requests to the same external IP address as the
        forwarding rule associated with the target pool.

     --port=PORT; default=80
        The TCP port number that this health check monitors. The default value
        is 80.

     --request-path=REQUEST_PATH; default="/"
        The request path that this health check monitors. For example,
        /healthcheck. The default value is ``/''.

     --timeout=TIMEOUT; default="5s"
        If Compute Engine doesn't receive an HTTP 200 response from the
        instance by the time specified by the value of this flag, the health
        check request is considered a failure. For example, specifying 10s will
        cause the check to wait for 10 seconds before considering the request a
        failure. The default value is 5s. See $ gcloud topic datetimes for
        information on duration formats.

     --unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2
        The number of consecutive health check failures before a healthy
        instance is marked as unhealthy. The default is 2.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute http-health-checks create

        $ gcloud beta compute http-health-checks create
```

### gcloud compute http-health-checks delete

```text
NAME
    gcloud compute http-health-checks delete - delete HTTP health checks

SYNOPSIS
    gcloud compute http-health-checks delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute http-health-checks delete deletes one or more Compute Engine
    HTTP health checks.

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the HTTP health checks to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute http-health-checks delete

        $ gcloud beta compute http-health-checks delete
```

### gcloud compute http-health-checks describe

```text
NAME
    gcloud compute http-health-checks describe - display detailed information
        about an HTTP health check

SYNOPSIS
    gcloud compute http-health-checks describe NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute http-health-checks describe displays all data associated
    with a Google Compute Engine HTTP health check in a project.

POSITIONAL ARGUMENTS
     NAME
        Name of the HTTP health check to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute http-health-checks describe

        $ gcloud beta compute http-health-checks describe
```

### gcloud compute http-health-checks list

```text
NAME
    gcloud compute http-health-checks list - list Google Compute Engine health
        checks

SYNOPSIS
    gcloud compute http-health-checks list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute http-health-checks list displays all Google Compute Engine
    health checks in a project.

EXAMPLES
    To list all health checks in a project in table form, run:

        $ gcloud compute http-health-checks list

    To list the URIs of all health checks in a project, run:

        $ gcloud compute http-health-checks list --uri

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

        $ gcloud alpha compute http-health-checks list

        $ gcloud beta compute http-health-checks list
```

### gcloud compute http-health-checks test-iam-permissions

```text
NAME
    gcloud compute http-health-checks test-iam-permissions - test IAM
        permissions for a Compute Engine HTTP health check

SYNOPSIS
    gcloud compute http-health-checks test-iam-permissions HTTP_HEALTH_CHECK
        --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns permissions that a caller has on the specified HTTP health check.

EXAMPLES
    To test whether the caller has the 'compute.httpHealthChecks.list'
    permission on an HTTP health check, run:

        $ gcloud compute http-health-checks test-iam-permissions \
            my-http-health-check --permissions=compute.httpHealthChecks.list

POSITIONAL ARGUMENTS
     Http health check resource - The name of the HTTP health check to test
     permissions for. This represents a Cloud resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument http_health_check on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HTTP_HEALTH_CHECK
          ID of the http health check or fully qualified identifier for the
          http health check.

          To set the http_health_check attribute:
          + provide the argument http_health_check on the command line.

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

        $ gcloud alpha compute http-health-checks test-iam-permissions

        $ gcloud beta compute http-health-checks test-iam-permissions
```

### gcloud compute http-health-checks update

```text
NAME
    gcloud compute http-health-checks update - update a legacy HTTP health
        check

SYNOPSIS
    gcloud compute http-health-checks update NAME
        [--check-interval=CHECK_INTERVAL] [--description=DESCRIPTION]
        [--healthy-threshold=HEALTHY_THRESHOLD] [--host=HOST] [--port=PORT]
        [--request-path=REQUEST_PATH] [--timeout=TIMEOUT]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute http-health-checks update is used to update an existing
    legacy HTTP health check. Only arguments passed in will be updated on the
    health check. Other attributes will remain unaffected.

POSITIONAL ARGUMENTS
     NAME
        Name of the HTTP health check to update.

FLAGS
     --check-interval=CHECK_INTERVAL
        How often to perform a health check for an instance. For example,
        specifying 10s will run the check every 10 seconds. See $ gcloud topic
        datetimes for information on duration formats.

     --description=DESCRIPTION
        A textual description for the HTTP health check. Pass in an empty
        string to unset.

     --healthy-threshold=HEALTHY_THRESHOLD
        The number of consecutive successful health checks before an unhealthy
        instance is marked as healthy.

     --host=HOST
        The value of the host header used in this HTTP health check request. By
        default, this is empty and Compute Engine automatically sets the host
        header in health requests to the same external IP address as the
        forwarding rule associated with the target pool. Setting this to an
        empty string will clear any existing host value.

     --port=PORT
        The TCP port number that this health check monitors.

     --request-path=REQUEST_PATH
        The request path that this health check monitors. For example,
        /healthcheck.

     --timeout=TIMEOUT
        If Compute Engine doesn't receive an HTTP 200 response from the
        instance by the time specified by the value of this flag, the health
        check request is considered a failure. For example, specifying 10s will
        cause the check to wait for 10 seconds before considering the request a
        failure. Valid units for this flag are ``s'' for seconds and ``m'' for
        minutes.

     --unhealthy-threshold=UNHEALTHY_THRESHOLD
        The number of consecutive health check failures before a healthy
        instance is marked as unhealthy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute http-health-checks update

        $ gcloud beta compute http-health-checks update
```

### gcloud beta compute http-health-checks create

```text
NAME
    gcloud beta compute http-health-checks create - create a legacy HTTP health
        check

SYNOPSIS
    gcloud beta compute http-health-checks create NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2] [--host=HOST]
        [--port=PORT; default=80] [--request-path=REQUEST_PATH; default="/"]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute http-health-checks delete

```text
NAME
    gcloud beta compute http-health-checks delete - delete HTTP health checks

SYNOPSIS
    gcloud beta compute http-health-checks delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute http-health-checks describe

```text
NAME
    gcloud beta compute http-health-checks describe - display detailed
        information about an HTTP health check

SYNOPSIS
    gcloud beta compute http-health-checks describe NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute http-health-checks list

```text
NAME
    gcloud beta compute http-health-checks list - list Google Compute Engine
        health checks

SYNOPSIS
    gcloud beta compute http-health-checks list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute http-health-checks test-iam-permissions

```text
NAME
    gcloud beta compute http-health-checks test-iam-permissions - test IAM
        permissions for a Compute Engine HTTP health check

SYNOPSIS
    gcloud beta compute http-health-checks test-iam-permissions
        HTTP_HEALTH_CHECK --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute http-health-checks update

```text
NAME
    gcloud beta compute http-health-checks update - update a legacy HTTP health
        check

SYNOPSIS
    gcloud beta compute http-health-checks update NAME
        [--check-interval=CHECK_INTERVAL] [--description=DESCRIPTION]
        [--healthy-threshold=HEALTHY_THRESHOLD] [--host=HOST] [--port=PORT]
        [--request-path=REQUEST_PATH] [--timeout=TIMEOUT]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute http-health-checks create

```text
NAME
    gcloud alpha compute http-health-checks create - create a legacy HTTP
        health check

SYNOPSIS
    gcloud alpha compute http-health-checks create NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2] [--host=HOST]
        [--port=PORT; default=80] [--request-path=REQUEST_PATH; default="/"]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute http-health-checks delete

```text
NAME
    gcloud alpha compute http-health-checks delete - delete HTTP health checks

SYNOPSIS
    gcloud alpha compute http-health-checks delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute http-health-checks describe

```text
NAME
    gcloud alpha compute http-health-checks describe - display detailed
        information about an HTTP health check

SYNOPSIS
    gcloud alpha compute http-health-checks describe NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute http-health-checks list

```text
NAME
    gcloud alpha compute http-health-checks list - list Google Compute Engine
        health checks

SYNOPSIS
    gcloud alpha compute http-health-checks list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute http-health-checks test-iam-permissions

```text
NAME
    gcloud alpha compute http-health-checks test-iam-permissions - test IAM
        permissions for a Compute Engine HTTP health check

SYNOPSIS
    gcloud alpha compute http-health-checks test-iam-permissions
        HTTP_HEALTH_CHECK --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute http-health-checks update

```text
NAME
    gcloud alpha compute http-health-checks update - update a legacy HTTP
        health check

SYNOPSIS
    gcloud alpha compute http-health-checks update NAME
        [--check-interval=CHECK_INTERVAL] [--description=DESCRIPTION]
        [--healthy-threshold=HEALTHY_THRESHOLD] [--host=HOST] [--port=PORT]
        [--request-path=REQUEST_PATH] [--timeout=TIMEOUT]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute http-health-checks list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute http-health-checks list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/http-health-checks (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
