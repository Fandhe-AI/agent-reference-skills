---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-http-proxies
---

# gcloud compute target-http-proxies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute target-http-proxies create

```text
NAME
    gcloud compute target-http-proxies create - create a target HTTP proxy

SYNOPSIS
    gcloud compute target-http-proxies create NAME --url-map=URL_MAP
        [--description=DESCRIPTION]
        [--http-keep-alive-timeout-sec=HTTP_KEEP_ALIVE_TIMEOUT_SEC]
        [--global | --region=REGION]
        [--global-url-map | --url-map-region=URL_MAP_REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-http-proxies create is used to create target HTTP
    proxies. A target HTTP proxy is referenced by one or more forwarding rules
    which specify the network traffic that the proxy is responsible for
    routing. The target HTTP proxy points to a URL map that defines the rules
    for routing the requests. The URL map's job is to map URLs to backend
    services which handle the actual requests.

EXAMPLES
    If there is an already-created URL map with the name URL_MAP, create a
    global target HTTP proxy pointing to this map by running:

        $ gcloud compute target-http-proxies create PROXY_NAME \
            --url-map=URL_MAP

    Create a regional target HTTP proxy by running:

        $ gcloud compute target-http-proxies create PROXY_NAME \
            --url-map=URL_MAP --region=REGION_NAME

    To create a proxy with a textual description, run:

        $ gcloud compute target-http-proxies create PROXY_NAME \
            --url-map=URL_MAP --description="default proxy"

POSITIONAL ARGUMENTS
     NAME
        Name of the target HTTP proxy to create.

REQUIRED FLAGS
     --url-map=URL_MAP
        A reference to a URL map resource. A URL map defines the mapping of
        URLs to backend services. Before you can refer to a URL map, you must
        create the URL map. To delete a URL map that a target proxy is
        referring to, you must first delete the target HTTP proxy.

OPTIONAL FLAGS
     --description=DESCRIPTION
        An optional, textual description for the target HTTP proxy.

     --http-keep-alive-timeout-sec=HTTP_KEEP_ALIVE_TIMEOUT_SEC
        Represents the maximum amount of time that a TCP connection can be idle
        between the (downstream) client and the target HTTP proxy. If an HTTP
        keepalive timeout is not specified, the default value is 610 seconds.
        For global external Application Load Balancers, the minimum allowed
        value is 5 seconds and the maximum allowed value is 1200 seconds.

     At most one of these can be specified:

       --global
          If set, the target HTTP proxy is global.

       --region=REGION
          Region of the target HTTP proxy to create. If not specified, you
          might be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

     At most one of these can be specified:

       --global-url-map
          If set, the URL map is global.

       --url-map-region=URL_MAP_REGION
          Region of the URL map to operate on. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-http-proxies create

        $ gcloud beta compute target-http-proxies create
```

### gcloud compute target-http-proxies delete

```text
NAME
    gcloud compute target-http-proxies delete - delete target HTTP proxies

SYNOPSIS
    gcloud compute target-http-proxies delete NAME [NAME ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-http-proxies delete deletes one or more target HTTP
    proxies.

EXAMPLES
    Delete a global target HTTP proxy by running:

        $ gcloud compute target-http-proxies delete PROXY_NAME

    Delete a regional target HTTP proxy by running:

        $ gcloud compute target-http-proxies delete PROXY_NAME \
            --region=REGION_NAME

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the target HTTP proxies to delete.

FLAGS
     At most one of these can be specified:

       --global
          If set, the target HTTP proxies are global.

       --region=REGION
          Region of the target HTTP proxies to delete. If not specified, you
          might be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-http-proxies delete

        $ gcloud beta compute target-http-proxies delete
```

### gcloud compute target-http-proxies describe

```text
NAME
    gcloud compute target-http-proxies describe - display detailed information
        about a target HTTP proxy

SYNOPSIS
    gcloud compute target-http-proxies describe NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-http-proxies describe displays all data associated
    with a target HTTP proxy in a project.

EXAMPLES
    To describe a global target HTTP proxy, run:

        $ gcloud compute target-http-proxies describe PROXY_NAME

    To describe a regional target HTTP proxy, run:

        $ gcloud compute target-http-proxies describe PROXY_NAME \
            --region=REGION_NAME

POSITIONAL ARGUMENTS
     NAME
        Name of the target HTTP proxy to describe.

FLAGS
     At most one of these can be specified:

       --global
          If set, the target HTTP proxy is global.

       --region=REGION
          Region of the target HTTP proxy to describe. If not specified, you
          might be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-http-proxies describe

        $ gcloud beta compute target-http-proxies describe
```

### gcloud compute target-http-proxies export

```text
NAME
    gcloud compute target-http-proxies export - export a target HTTP proxy

SYNOPSIS
    gcloud compute target-http-proxies export NAME [--destination=DESTINATION]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Exports a target HTTP proxy's configuration to a file. This configuration
    can be imported at a later time.

EXAMPLES
    A target HTTP proxy can be exported by running:

        $ gcloud compute target-http-proxies export NAME \
            --destination=<path-to-file>

POSITIONAL ARGUMENTS
     NAME
        Name of the target HTTP proxy to export.

FLAGS
     --destination=DESTINATION
        Path to a YAML file where the configuration will be exported.
        Alternatively, you may omit this flag to write to standard output. For
        a schema describing the export/import format, see:
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/compute/v1/TargetHttpProxy.yaml.

     At most one of these can be specified:

       --global
          If set, the target HTTP proxy is global.

       --region=REGION
          Region of the target HTTP proxy to export. If not specified, you
          might be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-http-proxies export

        $ gcloud beta compute target-http-proxies export
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute target-http-proxies export NAME \
    --destination=PATH_TO_FILE
```

### gcloud compute target-http-proxies import

```text
NAME
    gcloud compute target-http-proxies import - import a target HTTP proxy

SYNOPSIS
    gcloud compute target-http-proxies import NAME [--source=SOURCE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Imports a target HTTP proxy's configuration from a file.

EXAMPLES
    A target HTTP proxy can be imported by running:

        $ gcloud compute target-http-proxies import NAME \
            --source=<path-to-file>

POSITIONAL ARGUMENTS
     NAME
        Name of the target HTTP proxy to import.

FLAGS
     --source=SOURCE
        Path to a YAML file containing configuration export data.
        Alternatively, you may omit this flag to read from standard input. For
        a schema describing the export/import format, see:
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/compute/v1/TargetHttpProxy.yaml.

            Note: $CLOUDSDKROOT represents the Google Cloud CLI's installation directory.

     At most one of these can be specified:

       --global
          If set, the target HTTP proxy is global.

       --region=REGION
          Region of the target HTTP proxy to import. If not specified, you
          might be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-http-proxies import

        $ gcloud beta compute target-http-proxies import
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute target-http-proxies import NAME \
    --source=PATH_TO_FILE
```

### gcloud compute target-http-proxies list

```text
NAME
    gcloud compute target-http-proxies list - list Google Compute Engine target
        HTTP proxies

SYNOPSIS
    gcloud compute target-http-proxies list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--global | --regions=[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-http-proxies list displays all Google Compute Engine
    target HTTP proxies in a project.

    By default, global target HTTP proxies and target HTTP proxies from all
    regions are listed. The results can be narrowed down by providing the
    --global or --regions flag.

EXAMPLES
    To list all target HTTP proxies in a project in table form, run:

        $ gcloud compute target-http-proxies list

    To list the URIs of all target HTTP proxies in a project, run:

        $ gcloud compute target-http-proxies list --uri

    To list all global target HTTP proxies in a project, run:

        $ gcloud compute target-http-proxies list --global

    To list all target HTTP proxies in the us-central1 and europe-west1
    regions, given they are regional resources, run:

        $ gcloud compute target-http-proxies list \
            --filter="region:( europe-west1 us-central1 )"

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

     At most one of these can be specified:

       --global
          If provided, only global resources are shown.

       --regions=[REGION,...]
          If provided, only regional resources are shown. If arguments are
          provided, only resources from the given regions are shown.

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

        $ gcloud alpha compute target-http-proxies list

        $ gcloud beta compute target-http-proxies list
```

### gcloud compute target-http-proxies update

```text
NAME
    gcloud compute target-http-proxies update - update a target HTTP proxy

SYNOPSIS
    gcloud compute target-http-proxies update NAME --url-map=URL_MAP
        [--clear-http-keep-alive-timeout-sec
          | --http-keep-alive-timeout-sec=HTTP_KEEP_ALIVE_TIMEOUT_SEC]
        [--global | --region=REGION]
        [--global-url-map | --url-map-region=URL_MAP_REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-http-proxies update is used to change the URL map of
    existing target HTTP proxies. A target HTTP proxy is referenced by one or
    more forwarding rules which specify the network traffic that the proxy is
    responsible for routing. The target HTTP proxy points to a URL map that
    defines the rules for routing the requests. The URL map's job is to map
    URLs to backend services which handle the actual requests.

EXAMPLES
    If there is an already-created URL map with the name URL_MAP, update a
    global target HTTP proxy pointing to this map by running:

        $ gcloud compute target-http-proxies update PROXY_NAME \
            --url-map=URL_MAP

    Update a regional target HTTP proxy by running:

        $ gcloud compute target-http-proxies update PROXY_NAME \
            --url-map=URL_MAP --region=REGION_NAME

POSITIONAL ARGUMENTS
     NAME
        Name of the target HTTP proxy to update.

REQUIRED FLAGS
     --url-map=URL_MAP
        A reference to a URL map resource. A URL map defines the mapping of
        URLs to backend services. Before you can refer to a URL map, you must
        create the URL map. To delete a URL map that a target proxy is
        referring to, you must first delete the target HTTP proxy.

OPTIONAL FLAGS
     At most one of these can be specified:

       --clear-http-keep-alive-timeout-sec
          Clears the previously configured HTTP keepalive timeout.

       --http-keep-alive-timeout-sec=HTTP_KEEP_ALIVE_TIMEOUT_SEC
          Represents the maximum amount of time that a TCP connection can be
          idle between the (downstream) client and the target HTTP proxy. If an
          HTTP keepalive timeout is not specified, the default value is 610
          seconds. For global external Application Load Balancers, the minimum
          allowed value is 5 seconds and the maximum allowed value is 1200
          seconds.

     At most one of these can be specified:

       --global
          If set, the target HTTP proxy is global.

       --region=REGION
          Region of the target HTTP proxy to update. If not specified, you
          might be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

     At most one of these can be specified:

       --global-url-map
          If set, the URL map is global.

       --url-map-region=URL_MAP_REGION
          Region of the URL map to operate on. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-http-proxies update

        $ gcloud beta compute target-http-proxies update
```

### gcloud beta compute target-http-proxies create

```text
NAME
    gcloud beta compute target-http-proxies create - create a target HTTP proxy

SYNOPSIS
    gcloud beta compute target-http-proxies create NAME --url-map=URL_MAP
        [--description=DESCRIPTION]
        [--http-keep-alive-timeout-sec=HTTP_KEEP_ALIVE_TIMEOUT_SEC]
        [--global | --region=REGION]
        [--global-url-map | --url-map-region=URL_MAP_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-http-proxies delete

```text
NAME
    gcloud beta compute target-http-proxies delete - delete target HTTP proxies

SYNOPSIS
    gcloud beta compute target-http-proxies delete NAME [NAME ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-http-proxies describe

```text
NAME
    gcloud beta compute target-http-proxies describe - display detailed
        information about a target HTTP proxy

SYNOPSIS
    gcloud beta compute target-http-proxies describe NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-http-proxies export

```text
NAME
    gcloud beta compute target-http-proxies export - export a target HTTP proxy

SYNOPSIS
    gcloud beta compute target-http-proxies export NAME
        [--destination=DESTINATION] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-http-proxies import

```text
NAME
    gcloud beta compute target-http-proxies import - import a target HTTP proxy

SYNOPSIS
    gcloud beta compute target-http-proxies import NAME [--source=SOURCE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-http-proxies list

```text
NAME
    gcloud beta compute target-http-proxies list - list Google Compute Engine
        target HTTP proxies

SYNOPSIS
    gcloud beta compute target-http-proxies list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--global | --regions=[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-http-proxies update

```text
NAME
    gcloud beta compute target-http-proxies update - update a target HTTP proxy

SYNOPSIS
    gcloud beta compute target-http-proxies update NAME --url-map=URL_MAP
        [--clear-http-keep-alive-timeout-sec
          | --http-keep-alive-timeout-sec=HTTP_KEEP_ALIVE_TIMEOUT_SEC]
        [--global | --region=REGION]
        [--global-url-map | --url-map-region=URL_MAP_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-http-proxies config export

```text
NAME
    gcloud alpha compute target-http-proxies config export - export the
        configuration for a Compute Engine target http proxy

SYNOPSIS
    gcloud alpha compute target-http-proxies config export
        ([TARGET_HTTP_PROXY]] --all) [--path=PATH; default="-"]
        [--resource-format=RESOURCE_FORMAT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-http-proxies create

```text
NAME
    gcloud alpha compute target-http-proxies create - create a target HTTP
        proxy

SYNOPSIS
    gcloud alpha compute target-http-proxies create NAME --url-map=URL_MAP
        [--description=DESCRIPTION] [--http-filters=[HTTP_FILTERS,...]]
        [--http-keep-alive-timeout-sec=HTTP_KEEP_ALIVE_TIMEOUT_SEC]
        [--proxy-bind] [--global | --region=REGION]
        [--global-url-map | --url-map-region=URL_MAP_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-http-proxies delete

```text
NAME
    gcloud alpha compute target-http-proxies delete - delete target HTTP
        proxies

SYNOPSIS
    gcloud alpha compute target-http-proxies delete NAME [NAME ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-http-proxies describe

```text
NAME
    gcloud alpha compute target-http-proxies describe - display detailed
        information about a target HTTP proxy

SYNOPSIS
    gcloud alpha compute target-http-proxies describe NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-http-proxies export

```text
NAME
    gcloud alpha compute target-http-proxies export - export a target HTTP
        proxy

SYNOPSIS
    gcloud alpha compute target-http-proxies export NAME
        [--destination=DESTINATION] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-http-proxies import

```text
NAME
    gcloud alpha compute target-http-proxies import - import a target HTTP
        proxy

SYNOPSIS
    gcloud alpha compute target-http-proxies import NAME [--source=SOURCE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-http-proxies list

```text
NAME
    gcloud alpha compute target-http-proxies list - list Google Compute Engine
        target HTTP proxies

SYNOPSIS
    gcloud alpha compute target-http-proxies list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--global | --regions=[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-http-proxies test-iam-permissions

```text
NAME
    gcloud alpha compute target-http-proxies test-iam-permissions - test IAM
        permissions for a Compute Engine target HTTP proxy

SYNOPSIS
    gcloud alpha compute target-http-proxies test-iam-permissions
        TARGET_HTTP_PROXY --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-http-proxies update

```text
NAME
    gcloud alpha compute target-http-proxies update - update a target HTTP
        proxy

SYNOPSIS
    gcloud alpha compute target-http-proxies update NAME [--url-map=URL_MAP]
        [--clear-http-filters | --http-filters=[HTTP_FILTERS,...]]
        [--clear-http-keep-alive-timeout-sec
          | --http-keep-alive-timeout-sec=HTTP_KEEP_ALIVE_TIMEOUT_SEC]
        [--global | --region=REGION]
        [--global-url-map | --url-map-region=URL_MAP_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute target-http-proxies list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute target-http-proxies list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-http-proxies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
