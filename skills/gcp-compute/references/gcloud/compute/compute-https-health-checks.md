---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/https-health-checks
---

# gcloud compute https-health-checks

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute https-health-checks create

```text
NAME
    gcloud compute https-health-checks create - create a legacy HTTPS health
        check

SYNOPSIS
    gcloud compute https-health-checks create NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2] [--host=HOST]
        [--port=PORT; default=443] [--request-path=REQUEST_PATH; default="/"]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Though you can use legacy HTTPS health checks in certain Google Cloud
    Platform load balancing configurations and for managed instance group
    autohealing, you should consider a non-legacy HTTPS health check created
    with health-checks create https instead.

    For more information about the differences between legacy and non-legacy
    health checks see:
    https://cloud.google.com/load-balancing/docs/health-check-concepts#category_and_protocol

    For information about what type of health check to use for a particular
    load balancer, see:
    https://cloud.google.com/load-balancing/docs/health-check-concepts#lb_guide

POSITIONAL ARGUMENTS
     NAME
        Name of the HTTPS health check to create.

FLAGS
     --check-interval=CHECK_INTERVAL; default="5s"
        How often to perform a health check for an instance. For example,
        specifying 10s will run the check every 10 seconds. The default value
        is 5s. See $ gcloud topic datetimes for information on duration
        formats.

     --description=DESCRIPTION
        An optional, textual description for the HTTPS health check.

     --healthy-threshold=HEALTHY_THRESHOLD; default=2
        The number of consecutive successful health checks before an unhealthy
        instance is marked as healthy. The default is 2.

     --host=HOST
        The value of the host header used in this HTTPS health check request.
        By default, this is empty and Compute Engine automatically sets the
        host header in health requests to the same external IP address as the
        forwarding rule associated with the target pool.

     --port=PORT; default=443
        The TCP port number that this health check monitors. The default value
        is 443.

     --request-path=REQUEST_PATH; default="/"
        The request path that this health check monitors. For example,
        /healthcheck. The default value is ``/''.

     --timeout=TIMEOUT; default="5s"
        If Compute Engine doesn't receive an HTTPS 200 response from the
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

        $ gcloud alpha compute https-health-checks create

        $ gcloud beta compute https-health-checks create
```

### gcloud compute https-health-checks delete

```text
NAME
    gcloud compute https-health-checks delete - delete HTTPS health checks

SYNOPSIS
    gcloud compute https-health-checks delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute https-health-checks delete deletes one or more Compute
    Engine HTTPS health checks.

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the HTTPS health checks to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute https-health-checks delete

        $ gcloud beta compute https-health-checks delete
```

### gcloud compute https-health-checks describe

```text
NAME
    gcloud compute https-health-checks describe - display detailed information
        about an HTTPS health check

SYNOPSIS
    gcloud compute https-health-checks describe NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute https-health-checks describe displays all data associated
    with a Google Compute Engine HTTPS health check in a project.

POSITIONAL ARGUMENTS
     NAME
        Name of the HTTPS health check to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute https-health-checks describe

        $ gcloud beta compute https-health-checks describe
```

### gcloud compute https-health-checks list

```text
NAME
    gcloud compute https-health-checks list - list Google Compute Engine HTTPS
        health checks

SYNOPSIS
    gcloud compute https-health-checks list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute https-health-checks list displays all Google Compute Engine
    HTTPS health checks in a project.

EXAMPLES
    To list all HTTPS health checks in a project in table form, run:

        $ gcloud compute https-health-checks list

    To list the URIs of all HTTPS health checks in a project, run:

        $ gcloud compute https-health-checks list --uri

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

        $ gcloud alpha compute https-health-checks list

        $ gcloud beta compute https-health-checks list
```

### gcloud compute https-health-checks update

```text
NAME
    gcloud compute https-health-checks update - update a legacy HTTPS health
        check

SYNOPSIS
    gcloud compute https-health-checks update NAME
        [--check-interval=CHECK_INTERVAL] [--description=DESCRIPTION]
        [--healthy-threshold=HEALTHY_THRESHOLD] [--host=HOST] [--port=PORT]
        [--request-path=REQUEST_PATH] [--timeout=TIMEOUT]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute https-health-checks update is used to update an existing
    legacy HTTPS health check. Only arguments passed in will be updated on the
    health check. Other attributes will remain unaffected.

POSITIONAL ARGUMENTS
     NAME
        Name of the HTTPS health check to update.

FLAGS
     --check-interval=CHECK_INTERVAL
        How often to perform a health check for an instance. For example,
        specifying 10s will run the check every 10 seconds. See $ gcloud topic
        datetimes for information on duration formats.

     --description=DESCRIPTION
        A textual description for the HTTPS health check. Pass in an empty
        string to unset.

     --healthy-threshold=HEALTHY_THRESHOLD
        The number of consecutive successful health checks before an unhealthy
        instance is marked as healthy.

     --host=HOST
        The value of the host header used in this HTTPS health check request.
        By default, this is empty and Compute Engine automatically sets the
        host header in health requests to the same external IP address as the
        forwarding rule associated with the target pool. Setting this to an
        empty string will clear any existing host value.

     --port=PORT
        The TCP port number that this health check monitors.

     --request-path=REQUEST_PATH
        The request path that this health check monitors. For example,
        /healthcheck.

     --timeout=TIMEOUT
        If Compute Engine doesn't receive an HTTPS 200 response from the
        instance by the time specified by the value of this flag, the health
        check request is considered a failure. For example, specifying 10s will
        cause the check to wait for 10 seconds before considering the request a
        failure. See $ gcloud topic datetimes for information on duration
        formats.

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

        $ gcloud alpha compute https-health-checks update

        $ gcloud beta compute https-health-checks update
```

### gcloud beta compute https-health-checks create

```text
NAME
    gcloud beta compute https-health-checks create - create a legacy HTTPS
        health check

SYNOPSIS
    gcloud beta compute https-health-checks create NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2] [--host=HOST]
        [--port=PORT; default=443] [--request-path=REQUEST_PATH; default="/"]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute https-health-checks delete

```text
NAME
    gcloud beta compute https-health-checks delete - delete HTTPS health checks

SYNOPSIS
    gcloud beta compute https-health-checks delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute https-health-checks describe

```text
NAME
    gcloud beta compute https-health-checks describe - display detailed
        information about an HTTPS health check

SYNOPSIS
    gcloud beta compute https-health-checks describe NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute https-health-checks list

```text
NAME
    gcloud beta compute https-health-checks list - list Google Compute Engine
        HTTPS health checks

SYNOPSIS
    gcloud beta compute https-health-checks list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute https-health-checks update

```text
NAME
    gcloud beta compute https-health-checks update - update a legacy HTTPS
        health check

SYNOPSIS
    gcloud beta compute https-health-checks update NAME
        [--check-interval=CHECK_INTERVAL] [--description=DESCRIPTION]
        [--healthy-threshold=HEALTHY_THRESHOLD] [--host=HOST] [--port=PORT]
        [--request-path=REQUEST_PATH] [--timeout=TIMEOUT]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute https-health-checks create

```text
NAME
    gcloud alpha compute https-health-checks create - create a legacy HTTPS
        health check

SYNOPSIS
    gcloud alpha compute https-health-checks create NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2] [--host=HOST]
        [--port=PORT; default=443] [--request-path=REQUEST_PATH; default="/"]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute https-health-checks delete

```text
NAME
    gcloud alpha compute https-health-checks delete - delete HTTPS health
        checks

SYNOPSIS
    gcloud alpha compute https-health-checks delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute https-health-checks describe

```text
NAME
    gcloud alpha compute https-health-checks describe - display detailed
        information about an HTTPS health check

SYNOPSIS
    gcloud alpha compute https-health-checks describe NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute https-health-checks list

```text
NAME
    gcloud alpha compute https-health-checks list - list Google Compute Engine
        HTTPS health checks

SYNOPSIS
    gcloud alpha compute https-health-checks list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute https-health-checks test-iam-permissions

```text
NAME
    gcloud alpha compute https-health-checks test-iam-permissions - test IAM
        permissions for a Compute Engine legacy HTTPS health check

SYNOPSIS
    gcloud alpha compute https-health-checks test-iam-permissions
        HTTPS_HEALTH_CHECK --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute https-health-checks update

```text
NAME
    gcloud alpha compute https-health-checks update - update a legacy HTTPS
        health check

SYNOPSIS
    gcloud alpha compute https-health-checks update NAME
        [--check-interval=CHECK_INTERVAL] [--description=DESCRIPTION]
        [--healthy-threshold=HEALTHY_THRESHOLD] [--host=HOST] [--port=PORT]
        [--request-path=REQUEST_PATH] [--timeout=TIMEOUT]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute https-health-checks list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute https-health-checks list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/https-health-checks (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
