---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app/versions
---

# gcloud app versions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app versions browse

```text
NAME
    gcloud app versions browse - open the specified versions in a browser

SYNOPSIS
    gcloud app versions browse VERSIONS [VERSIONS ...] [--no-launch-browser]
        [--service=SERVICE, -s SERVICE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Open the specified versions in a browser.

EXAMPLES
    To show version v1 for the default service in the browser, run:

        $ gcloud app versions browse v1

    To show version v1 of a specific service in the browser, run:

        $ gcloud app versions browse v1 --service="myService"

    To show multiple versions side-by-side, run:

        $ gcloud app versions browse v1 v2 --service="myService"

POSITIONAL ARGUMENTS
     VERSIONS [VERSIONS ...]
        The versions to open (optionally filtered by the --service flag).

FLAGS
     --launch-browser
        Launch a browser if possible. When disabled, only displays the URL.
        Enabled by default, use --no-launch-browser to disable.

     --service=SERVICE, -s SERVICE
        If specified, only open versions from the given service. If not
        specified, use the default service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app versions browse
```

### gcloud app versions delete

```text
NAME
    gcloud app versions delete - delete a specified version

SYNOPSIS
    gcloud app versions delete VERSIONS [VERSIONS ...]
        [--service=SERVICE, -s SERVICE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    You cannot delete a version of a service that is currently receiving
    traffic.

EXAMPLES
    To delete a specific version of a specific service, run:

        $ gcloud app versions delete --service=myService v1

    To delete a named version across all services, run:

        $ gcloud app versions delete v1

    To delete multiple versions of a specific service, run:

        $ gcloud app versions delete --service=myService v1 v2

    To delete multiple named versions across all services, run:

        $ gcloud app versions delete v1 v2

POSITIONAL ARGUMENTS
     VERSIONS [VERSIONS ...]
        The versions to delete (optionally filtered by the --service flag).

FLAGS
     --service=SERVICE, -s SERVICE
        If specified, only delete versions from the given service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app versions delete
```

### gcloud app versions describe

```text
NAME
    gcloud app versions describe - display all data about an existing version

SYNOPSIS
    gcloud app versions describe VERSION --service=SERVICE, -s SERVICE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display all data about an existing version.

POSITIONAL ARGUMENTS
     VERSION
        The ID of the version to show.

REQUIRED FLAGS
     --service=SERVICE, -s SERVICE
        The service corresponding to the version to show.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app versions describe
```

### gcloud app versions list

```text
NAME
    gcloud app versions list - list your existing versions

SYNOPSIS
    gcloud app versions list [--hide-no-traffic]
        [--service=SERVICE, -s SERVICE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command lists all the versions of all services that are currently
    deployed to the App Engine server.

EXAMPLES
    To list all services and versions, run:

        $ gcloud app versions list

    To list all versions for a specific service, run:

        $ gcloud app versions list --service=service1

    To list only versions that are receiving traffic, run:

        $ gcloud app versions list --hide-no-traffic

    To list all version information in JSON, run:

        $ gcloud app versions list --format="json"

    To list versions created after a specific date, run:

        $ gcloud app versions list \
            --filter="version.createTime.date('%Y-%m-%d', Z)>'2017-11-03'"

FLAGS
     --hide-no-traffic
        Only show versions that are receiving traffic.

     --service=SERVICE, -s SERVICE
        Only show versions from this service.

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

        $ gcloud beta app versions list
```

### gcloud app versions migrate

```text
NAME
    gcloud app versions migrate - migrate traffic from one version to another
        for a set of services

SYNOPSIS
    gcloud app versions migrate VERSION [--service=SERVICE, -s SERVICE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Migrate traffic from one version to another for a set of services.

EXAMPLES
    This only works for automatically scaled Standard versions. To migrate from
    one version to another for all services where there is a version v2 and
    shut down the previous version, run:

        $ gcloud app versions migrate v2

    To migrate from one version to another for a specific service, run:

        $ gcloud app versions migrate v2 --service="s1"

POSITIONAL ARGUMENTS
     VERSION
        The version to migrate to.

FLAGS
     --service=SERVICE, -s SERVICE
        If specified, only migrate versions from the given service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app versions migrate
```

### gcloud app versions start

```text
NAME
    gcloud app versions start - start serving specified versions

SYNOPSIS
    gcloud app versions start VERSIONS [VERSIONS ...]
        [--service=SERVICE, -s SERVICE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command starts serving the specified versions. It may only be used if
    the scaling module for your service has been set to manual.

EXAMPLES
    To start a specific version across all services, run:

        $ gcloud app versions start v1

    To start multiple named versions across all services, run:

        $ gcloud app versions start v1 v2

    To start a single version on a single service, run:

        $ gcloud app versions start --service=servicename v1

    To start multiple versions in a single service, run:

        $ gcloud app versions start --service=servicename v1 v2

POSITIONAL ARGUMENTS
     VERSIONS [VERSIONS ...]
        The versions to start. (optionally filtered by the --service flag).

FLAGS
     --service=SERVICE, -s SERVICE
        If specified, only start versions from the given service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app versions start
```

### gcloud app versions stop

```text
NAME
    gcloud app versions stop - stop serving specified versions

SYNOPSIS
    gcloud app versions stop VERSIONS [VERSIONS ...]
        [--service=SERVICE, -s SERVICE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command stops serving the specified versions. It may only be used if
    the scaling module for your service has been set to manual.

EXAMPLES
    To stop a specific version across all services, run:

        $ gcloud app versions stop v1

    To stop multiple named versions across all services, run:

        $ gcloud app versions stop v1 v2

    To stop a single version on a single service, run:

        $ gcloud app versions stop --service=servicename v1

    To stop multiple versions in a single service, run:

        $ gcloud app versions stop --service=servicename v1 v2

    Note that that last example may be more simply written using the services
    stop command (see its documentation for details).

POSITIONAL ARGUMENTS
     VERSIONS [VERSIONS ...]
        The versions to stop (optionally filtered by the --service flag).

FLAGS
     --service=SERVICE, -s SERVICE
        If specified, only stop versions from the given service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app versions stop
```

### gcloud beta app versions browse

```text
NAME
    gcloud beta app versions browse - open the specified versions in a browser

SYNOPSIS
    gcloud beta app versions browse VERSIONS [VERSIONS ...]
        [--no-launch-browser] [--service=SERVICE, -s SERVICE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app versions delete

```text
NAME
    gcloud beta app versions delete - delete a specified version

SYNOPSIS
    gcloud beta app versions delete VERSIONS [VERSIONS ...]
        [--service=SERVICE, -s SERVICE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app versions describe

```text
NAME
    gcloud beta app versions describe - display all data about an existing
        version

SYNOPSIS
    gcloud beta app versions describe VERSION --service=SERVICE, -s SERVICE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app versions list

```text
NAME
    gcloud beta app versions list - list your existing versions

SYNOPSIS
    gcloud beta app versions list [--hide-no-traffic]
        [--service=SERVICE, -s SERVICE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app versions migrate

```text
NAME
    gcloud beta app versions migrate - migrate traffic from one version to
        another for a set of services

SYNOPSIS
    gcloud beta app versions migrate VERSION [--service=SERVICE, -s SERVICE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app versions start

```text
NAME
    gcloud beta app versions start - start serving specified versions

SYNOPSIS
    gcloud beta app versions start VERSIONS [VERSIONS ...]
        [--service=SERVICE, -s SERVICE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app versions stop

```text
NAME
    gcloud beta app versions stop - stop serving specified versions

SYNOPSIS
    gcloud beta app versions stop VERSIONS [VERSIONS ...]
        [--service=SERVICE, -s SERVICE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app/versions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
