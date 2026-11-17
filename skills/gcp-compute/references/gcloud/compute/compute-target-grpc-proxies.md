---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-grpc-proxies
---

# gcloud compute target-grpc-proxies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute target-grpc-proxies create

```text
NAME
    gcloud compute target-grpc-proxies create - create a target gRPC proxy

SYNOPSIS
    gcloud compute target-grpc-proxies create NAME --url-map=URL_MAP
        [--description=DESCRIPTION] [--validate-for-proxyless]
        [--global-url-map | --url-map-region=URL_MAP_REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-grpc-proxies create is used to create target gRPC
    proxies. A target gRPC proxy is a component of load balancers intended for
    load balancing gRPC traffic. Global forwarding rules reference a target
    gRPC proxy. The Target gRPC proxy references a URL map which specifies how
    traffic routes to gRPC backend services.

EXAMPLES
    If there is an already-created URL map with the name URL_MAP, create a
    global target gRPC proxy pointing to this map by running:

        $ gcloud compute target-grpc-proxies create PROXY_NAME \
            --url-map=URL_MAP

    To create a proxy with a textual description, run:

        $ gcloud compute target-grpc-proxies create PROXY_NAME \
            --url-map=URL_MAP --description="default proxy"

POSITIONAL ARGUMENTS
     NAME
        Name of the target gRPC proxy to create.

REQUIRED FLAGS
     --url-map=URL_MAP
        A reference to a URL map resource. A URL map defines the mapping of
        URLs to backend services. Before you can refer to a URL map, you must
        create the URL map. To delete a URL map that a target proxy is
        referring to, you must first delete the target gRPC proxy.

OPTIONAL FLAGS
     --description=DESCRIPTION
        An optional, textual description for the target gRPC proxy.

     --validate-for-proxyless
        If specified, configuration in the associated urlMap and the
        BackendServices is checked to allow only the features that are
        supported in the latest release of gRPC.

        If unspecified, no such configuration checks are performed. This may
        cause unexpected behavior in gRPC applications if unsupported features
        are configured.

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

        $ gcloud alpha compute target-grpc-proxies create

        $ gcloud beta compute target-grpc-proxies create
```

### gcloud compute target-grpc-proxies delete

```text
NAME
    gcloud compute target-grpc-proxies delete - delete one or more target gRPC
        proxy

SYNOPSIS
    gcloud compute target-grpc-proxies delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-grpc-proxies delete deletes one or more target gRPC
    proxies.

EXAMPLES
    Delete a global target gRPC proxy by running:

        $ gcloud compute target-grpc-proxies delete PROXY_NAME

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the target gRPC proxies to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-grpc-proxies delete

        $ gcloud beta compute target-grpc-proxies delete
```

### gcloud compute target-grpc-proxies describe

```text
NAME
    gcloud compute target-grpc-proxies describe - display detailed information
        about a target gRPC proxy

SYNOPSIS
    gcloud compute target-grpc-proxies describe NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-grpc-proxies describe displays all data associated
    with a Compute Engine target gRPC proxy.

EXAMPLES
    To describe a global target gRPC proxy, run:

        $ gcloud compute target-grpc-proxies describe PROXY_NAME

POSITIONAL ARGUMENTS
     NAME
        Name of the target gRPC proxy to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-grpc-proxies describe

        $ gcloud beta compute target-grpc-proxies describe
```

### gcloud compute target-grpc-proxies list

```text
NAME
    gcloud compute target-grpc-proxies list - list Google Compute Engine target
        gRPC proxies

SYNOPSIS
    gcloud compute target-grpc-proxies list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-grpc-proxies list displays all Google Compute Engine
    target gRPC proxies in a project.

EXAMPLES
    To list all target gRPC proxies in a project in table form, run:

        $ gcloud compute target-grpc-proxies list

    To list the URIs of all target gRPC proxies in a project, run:

        $ gcloud compute target-grpc-proxies list --uri

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

        $ gcloud alpha compute target-grpc-proxies list

        $ gcloud beta compute target-grpc-proxies list
```

### gcloud beta compute target-grpc-proxies create

```text
NAME
    gcloud beta compute target-grpc-proxies create - create a target gRPC proxy

SYNOPSIS
    gcloud beta compute target-grpc-proxies create NAME --url-map=URL_MAP
        [--description=DESCRIPTION] [--validate-for-proxyless]
        [--global-url-map | --url-map-region=URL_MAP_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-grpc-proxies delete

```text
NAME
    gcloud beta compute target-grpc-proxies delete - delete one or more target
        gRPC proxy

SYNOPSIS
    gcloud beta compute target-grpc-proxies delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-grpc-proxies describe

```text
NAME
    gcloud beta compute target-grpc-proxies describe - display detailed
        information about a target gRPC proxy

SYNOPSIS
    gcloud beta compute target-grpc-proxies describe NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-grpc-proxies list

```text
NAME
    gcloud beta compute target-grpc-proxies list - list Google Compute Engine
        target gRPC proxies

SYNOPSIS
    gcloud beta compute target-grpc-proxies list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-grpc-proxies config export

```text
NAME
    gcloud alpha compute target-grpc-proxies config export - export the
        configuration for a Compute Engine target grpc proxy

SYNOPSIS
    gcloud alpha compute target-grpc-proxies config export
        ([TARGET_GRPC_PROXY]] --all) [--path=PATH; default="-"]
        [--resource-format=RESOURCE_FORMAT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-grpc-proxies create

```text
NAME
    gcloud alpha compute target-grpc-proxies create - create a target gRPC
        proxy

SYNOPSIS
    gcloud alpha compute target-grpc-proxies create NAME --url-map=URL_MAP
        [--description=DESCRIPTION] [--validate-for-proxyless]
        [--global-url-map | --url-map-region=URL_MAP_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-grpc-proxies delete

```text
NAME
    gcloud alpha compute target-grpc-proxies delete - delete one or more target
        gRPC proxy

SYNOPSIS
    gcloud alpha compute target-grpc-proxies delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-grpc-proxies describe

```text
NAME
    gcloud alpha compute target-grpc-proxies describe - display detailed
        information about a target gRPC proxy

SYNOPSIS
    gcloud alpha compute target-grpc-proxies describe NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-grpc-proxies export

```text
NAME
    gcloud alpha compute target-grpc-proxies export - export a target gRPC
        proxy

SYNOPSIS
    gcloud alpha compute target-grpc-proxies export NAME
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-grpc-proxies import

```text
NAME
    gcloud alpha compute target-grpc-proxies import - import a target gRPC
        proxy

SYNOPSIS
    gcloud alpha compute target-grpc-proxies import NAME [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-grpc-proxies list

```text
NAME
    gcloud alpha compute target-grpc-proxies list - list Google Compute Engine
        target gRPC proxies

SYNOPSIS
    gcloud alpha compute target-grpc-proxies list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-grpc-proxies test-iam-permissions

```text
NAME
    gcloud alpha compute target-grpc-proxies test-iam-permissions - test IAM
        permissions for a Compute Engine target gRPC proxy

SYNOPSIS
    gcloud alpha compute target-grpc-proxies test-iam-permissions
        TARGET_GRPC_PROXY --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute target-grpc-proxies list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute target-grpc-proxies list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-grpc-proxies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
