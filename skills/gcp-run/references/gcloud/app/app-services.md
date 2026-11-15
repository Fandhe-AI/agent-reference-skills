---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app/services
---

# gcloud app services

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app services browse

```text
NAME
    gcloud app services browse - open the specified service(s) in a browser

SYNOPSIS
    gcloud app services browse SERVICES [SERVICES ...] [--no-launch-browser]
        [--version=VERSION, -v VERSION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Open the specified service(s) in a browser.

EXAMPLES
    To show the url for the default service in the browser, run:

        $ gcloud app services browse default

    To show version v1 of service myService in the browser, run:

        $ gcloud app services browse myService --version="v1"

    To show multiple services side-by-side, run:

        $ gcloud app services browse default otherService

    To show multiple services side-by-side with a specific version, run:

        $ gcloud app services browse s1 s2 --version=v1

POSITIONAL ARGUMENTS
     SERVICES [SERVICES ...]
        The services to open (optionally filtered by the --version flag).

FLAGS
     --launch-browser
        Launch a browser if possible. When disabled, only displays the URL.
        Enabled by default, use --no-launch-browser to disable.

     --version=VERSION, -v VERSION
        If specified, open services with a given version. If not specified, use
        a version based on the service's traffic split .

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app services browse
```

### gcloud app services delete

```text
NAME
    gcloud app services delete - delete services in the current project

SYNOPSIS
    gcloud app services delete SERVICES [SERVICES ...] [--version=VERSION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete services in the current project.

EXAMPLES
    To delete a service (and all of its accompanying versions) in the current
    project, run:

        $ gcloud app services delete service1

    To delete multiple services (and all of their accompanying versions) in the
    current project, run:

        $ gcloud app services delete service1 service2

POSITIONAL ARGUMENTS
     SERVICES [SERVICES ...]
        The service(s) to delete.

FLAGS
     --version=VERSION
        Delete a specific version of the given service(s).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app services delete
```

### gcloud app services describe

```text
NAME
    gcloud app services describe - display all data about an existing service

SYNOPSIS
    gcloud app services describe SERVICE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display all data about an existing service.

EXAMPLES
    To show all the data about service s1, run

        $ gcloud app services describe s1

POSITIONAL ARGUMENTS
     SERVICE
        The service to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app services describe
```

### gcloud app services list

```text
NAME
    gcloud app services list - list your existing services

SYNOPSIS
    gcloud app services list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command lists all services that are currently deployed to the App
    Engine server.

EXAMPLES
    To list all services in the current project, run:

        $ gcloud app services list

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

        $ gcloud beta app services list
```

### gcloud app services set-traffic

```text
NAME
    gcloud app services set-traffic - set traffic splitting settings

SYNOPSIS
    gcloud app services set-traffic [SERVICES ...] --splits=SPLITS,[SPLITS,...]
        [--migrate] [--split-by=SPLIT_BY; default="ip"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command sets the traffic split of versions across a service or a
    project.

EXAMPLES
    To send all traffic to 'v2' of service 's1', run:

        $ gcloud app services set-traffic s1 --splits=v2=1

    To split traffic evenly between 'v1' and 'v2' of service 's1', run:

        $ gcloud app services set-traffic s1 --splits=v2=.5,v1=.5

    To split traffic across all services:

        $ gcloud app services set-traffic --splits=v2=.5,v1=.5

POSITIONAL ARGUMENTS
     [SERVICES ...]
        The services to modify.

REQUIRED FLAGS
     --splits=SPLITS,[SPLITS,...]
        Key-value pairs describing what proportion of traffic should go to each
        version. The split values are added together and used as weights. The
        exact values do not matter, only their relation to each other. For
        example, v1=2,v2=2 is equivalent to v1=.5,v2=.5

OPTIONAL FLAGS
     --migrate
        The migrate flag determines whether or not to use traffic migration
        during the operation. Traffic migration will attempt to automatically
        migrate traffic from the previous version to the new version, giving
        the autoscaler time to respond. See the documentation here:
        https://cloud.google.com/appengine/docs/python/console/trafficmigration
        for more information.

     --split-by=SPLIT_BY; default="ip"
        Whether to split traffic based on cookie, IP address or random.
        SPLIT_BY must be one of: cookie, ip, random.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app services set-traffic
```

### gcloud app services update

```text
NAME
    gcloud app services update - update service-level settings

SYNOPSIS
    gcloud app services update [SERVICES ...] --ingress=INGRESS
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update ingress traffic settings for an app.

EXAMPLES
    To update ingress traffic settings for the default service, run:

        $ gcloud app services update default --ingress=internal-only

POSITIONAL ARGUMENTS
     [SERVICES ...]
        The services to modify.

REQUIRED FLAGS
     --ingress=INGRESS
        Control what traffic can reach the app. INGRESS must be one of: all,
        internal-only, internal-and-cloud-load-balancing.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app services update
```

### gcloud beta app services browse

```text
NAME
    gcloud beta app services browse - open the specified service(s) in a
        browser

SYNOPSIS
    gcloud beta app services browse SERVICES [SERVICES ...]
        [--no-launch-browser] [--version=VERSION, -v VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app services delete

```text
NAME
    gcloud beta app services delete - delete services in the current project

SYNOPSIS
    gcloud beta app services delete SERVICES [SERVICES ...] [--version=VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app services describe

```text
NAME
    gcloud beta app services describe - display all data about an existing
        service

SYNOPSIS
    gcloud beta app services describe SERVICE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app services list

```text
NAME
    gcloud beta app services list - list your existing services

SYNOPSIS
    gcloud beta app services list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app services set-traffic

```text
NAME
    gcloud beta app services set-traffic - set traffic splitting settings

SYNOPSIS
    gcloud beta app services set-traffic [SERVICES ...]
        --splits=SPLITS,[SPLITS,...] [--migrate]
        [--split-by=SPLIT_BY; default="ip"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app services update

```text
NAME
    gcloud beta app services update - update service-level settings

SYNOPSIS
    gcloud beta app services update [SERVICES ...] --ingress=INGRESS
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app/services (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
