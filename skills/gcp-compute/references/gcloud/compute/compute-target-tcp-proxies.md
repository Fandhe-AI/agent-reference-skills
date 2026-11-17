---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-tcp-proxies
---

# gcloud compute target-tcp-proxies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute target-tcp-proxies create

```text
NAME
    gcloud compute target-tcp-proxies create - create a target TCP proxy

SYNOPSIS
    gcloud compute target-tcp-proxies create NAME
        [--backend-service=BACKEND_SERVICE] [--description=DESCRIPTION]
        [--load-balancing-scheme=LOAD_BALANCING_SCHEME] [--[no-]proxy-bind]
        [--proxy-header=PROXY_HEADER; default="NONE"]
        [--backend-service-region=BACKEND_SERVICE_REGION
          | --global-backend-service] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-tcp-proxies create is used to create target TCP
    proxies. A target TCP proxy is referenced by one or more forwarding rules
    which define which packets the proxy is responsible for routing. The target
    TCP proxy points to a backend service which handle the actual requests.

POSITIONAL ARGUMENTS
     NAME
        Name of the target TCP proxy to create.

FLAGS
     --backend-service=BACKEND_SERVICE
        A backend service that will be used for connections to the target TCP
        proxy.

     --description=DESCRIPTION
        An optional, textual description for the target TCP proxy.

     --load-balancing-scheme=LOAD_BALANCING_SCHEME
        Specifies the load balancing scheme for the target TCP proxy.
        LOAD_BALANCING_SCHEME must be one of:

         EXTERNAL
            Classic Proxy Network Load Balancers.
         EXTERNAL_MANAGED
            Envoy-based global and regional external Proxy Network Load
            Balancer.
         INTERNAL_MANAGED
            Envoy-based cross-region and regional internal Proxy Network Load
            Balancer.

     --[no-]proxy-bind
        This field only applies when the forwarding rule that references this
        target proxy has a --load-balancing-scheme set to
        INTERNAL_SELF_MANAGED.

        When this field is set to true, Envoy proxies set up inbound traffic
        interception and bind to the IP address and port specified in the
        forwarding rule. This is generally useful when using Traffic Director
        to configure Envoy as a gateway or middle proxy (in other words, not a
        sidecar proxy). The Envoy proxy listens for inbound requests and
        handles requests when it receives them.

        Use --proxy-bind to enable and --no-proxy-bind to disable.

     --proxy-header=PROXY_HEADER; default="NONE"
        The type of proxy protocol header to be sent to the backend.
        PROXY_HEADER must be one of:

         NONE
            No proxy header is added.
         PROXY_V1
            Enables PROXY protocol (version 1) for passing client connection
            information.

     At most one of these can be specified:

       --backend-service-region=BACKEND_SERVICE_REGION
          Region of the backend service to operate on. If not specified it will
          be set to the region of the TCP Proxy. Overrides the default
          compute/region property value for this command invocation.

       --global-backend-service
          If set, the backend service is global.

     At most one of these can be specified:

       --global
          If set, the target TCP proxy is global.

       --region=REGION
          Region of the target TCP proxy to create. If not specified, you might
          be prompted to select a region (interactive mode only).

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

        $ gcloud alpha compute target-tcp-proxies create

        $ gcloud beta compute target-tcp-proxies create
```

### gcloud compute target-tcp-proxies delete

```text
NAME
    gcloud compute target-tcp-proxies delete - delete target TCP proxies

SYNOPSIS
    gcloud compute target-tcp-proxies delete NAME [NAME ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-tcp-proxies delete deletes one or more target TCP
    proxies.

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the target TCP proxies to delete.

FLAGS
     At most one of these can be specified:

       --global
          If set, the target TCP proxies are global.

       --region=REGION
          Region of the target TCP proxies to delete. If not specified, you
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

        $ gcloud alpha compute target-tcp-proxies delete

        $ gcloud beta compute target-tcp-proxies delete
```

### gcloud compute target-tcp-proxies describe

```text
NAME
    gcloud compute target-tcp-proxies describe - display detailed information
        about a target TCP proxy

SYNOPSIS
    gcloud compute target-tcp-proxies describe NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-tcp-proxies describe displays all data associated
    with a target TCP proxy in a project.

POSITIONAL ARGUMENTS
     NAME
        Name of the target TCP proxy to describe.

FLAGS
     At most one of these can be specified:

       --global
          If set, the target TCP proxy is global.

       --region=REGION
          Region of the target TCP proxy to describe. If not specified, you
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

        $ gcloud alpha compute target-tcp-proxies describe

        $ gcloud beta compute target-tcp-proxies describe
```

### gcloud compute target-tcp-proxies list

```text
NAME
    gcloud compute target-tcp-proxies list - list Google Compute Engine target
        TCP proxies

SYNOPSIS
    gcloud compute target-tcp-proxies list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--global | --regions=[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-tcp-proxies list displays all Google Compute Engine
    target TCP proxies in a project.

    By default, global target TCP proxies and target TCP proxies from all
    regions are listed. The results can be narrowed down by providing the
    --global or --regions flag.

EXAMPLES
    To list all target TCP proxies in a project in table form, run:

        $ gcloud compute target-tcp-proxies list

    To list the URIs of all target TCP proxies in a project, run:

        $ gcloud compute target-tcp-proxies list --uri

    To list all global target TCP proxies in a project, run:

        $ gcloud compute target-tcp-proxies list --global

    To list all target TCP proxies in the us-central1 and europe-west1 regions,
    given they are regional resources, run:

        $ gcloud compute target-tcp-proxies list \
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

        $ gcloud alpha compute target-tcp-proxies list

        $ gcloud beta compute target-tcp-proxies list
```

### gcloud compute target-tcp-proxies test-iam-permissions

```text
NAME
    gcloud compute target-tcp-proxies test-iam-permissions - test IAM
        permissions for a target TCP proxy

SYNOPSIS
    gcloud compute target-tcp-proxies test-iam-permissions NAME
        --permissions=[PERMISSION,...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-tcp-proxies test-iam-permissions tests the IAM
    permissions that a caller has on a target TCP proxy.

    Note: This operation is designed to be used for building permission-aware
    UIs and command-line tools, not for authorization checking. This operation
    may "fail open" without warning.

EXAMPLES
    To test if the caller has 'compute.targetTcpProxies.get' permission on a
    global target TCP proxy 'my-proxy', run:

        $ gcloud compute target-tcp-proxies test-iam-permissions my-proxy \
            --permissions=compute.targetTcpProxies.get

POSITIONAL ARGUMENTS
     NAME
        Name of the target TCP proxy to test IAM permissions for.

REQUIRED FLAGS
     --permissions=[PERMISSION,...]
        Set of permissions to check for the resource.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-tcp-proxies test-iam-permissions

        $ gcloud beta compute target-tcp-proxies test-iam-permissions
```

### gcloud compute target-tcp-proxies update

```text
NAME
    gcloud compute target-tcp-proxies update - update a target TCP proxy

SYNOPSIS
    gcloud compute target-tcp-proxies update NAME
        [--backend-service=BACKEND_SERVICE] [--proxy-header=PROXY_HEADER]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-tcp-proxies update is used to change the backend
    service or proxy header of existing target TCP proxies. A target TCP proxy
    is referenced by one or more forwarding rules which define which packets
    the proxy is responsible for routing. The target TCP proxy in turn points
    to a backend service which will handle the requests.

POSITIONAL ARGUMENTS
     NAME
        Name of the target TCP proxy to update.

FLAGS
     --backend-service=BACKEND_SERVICE
        A backend service that will be used for connections to the target TCP
        proxy.

     --proxy-header=PROXY_HEADER
        The type of proxy protocol header to be sent to the backend.
        PROXY_HEADER must be one of:

         NONE
            No proxy header is added.
         PROXY_V1
            Enables PROXY protocol (version 1) for passing client connection
            information.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-tcp-proxies update

        $ gcloud beta compute target-tcp-proxies update
```

### gcloud beta compute target-tcp-proxies create

```text
NAME
    gcloud beta compute target-tcp-proxies create - create a target TCP proxy

SYNOPSIS
    gcloud beta compute target-tcp-proxies create NAME
        [--backend-service=BACKEND_SERVICE] [--description=DESCRIPTION]
        [--load-balancing-scheme=LOAD_BALANCING_SCHEME] [--[no-]proxy-bind]
        [--proxy-header=PROXY_HEADER; default="NONE"]
        [--backend-service-region=BACKEND_SERVICE_REGION
          | --global-backend-service] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-tcp-proxies delete

```text
NAME
    gcloud beta compute target-tcp-proxies delete - delete target TCP proxies

SYNOPSIS
    gcloud beta compute target-tcp-proxies delete NAME [NAME ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-tcp-proxies describe

```text
NAME
    gcloud beta compute target-tcp-proxies describe - display detailed
        information about a target TCP proxy

SYNOPSIS
    gcloud beta compute target-tcp-proxies describe NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-tcp-proxies list

```text
NAME
    gcloud beta compute target-tcp-proxies list - list Google Compute Engine
        target TCP proxies

SYNOPSIS
    gcloud beta compute target-tcp-proxies list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--global | --regions=[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-tcp-proxies test-iam-permissions

```text
NAME
    gcloud beta compute target-tcp-proxies test-iam-permissions - test IAM
        permissions for a target TCP proxy

SYNOPSIS
    gcloud beta compute target-tcp-proxies test-iam-permissions NAME
        --permissions=[PERMISSION,...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-tcp-proxies update

```text
NAME
    gcloud beta compute target-tcp-proxies update - update a target TCP proxy

SYNOPSIS
    gcloud beta compute target-tcp-proxies update NAME
        [--backend-service=BACKEND_SERVICE] [--proxy-header=PROXY_HEADER]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-tcp-proxies config export

```text
NAME
    gcloud alpha compute target-tcp-proxies config export - export the
        configuration for a Compute Engine target tcp proxy

SYNOPSIS
    gcloud alpha compute target-tcp-proxies config export ([TARGET_TCP_PROXY]]
        --all) [--path=PATH; default="-"] [--resource-format=RESOURCE_FORMAT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-tcp-proxies create

```text
NAME
    gcloud alpha compute target-tcp-proxies create - create a target TCP proxy

SYNOPSIS
    gcloud alpha compute target-tcp-proxies create NAME
        [--backend-service=BACKEND_SERVICE] [--description=DESCRIPTION]
        [--load-balancing-scheme=LOAD_BALANCING_SCHEME] [--[no-]proxy-bind]
        [--proxy-header=PROXY_HEADER; default="NONE"]
        [--backend-service-region=BACKEND_SERVICE_REGION
          | --global-backend-service] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-tcp-proxies delete

```text
NAME
    gcloud alpha compute target-tcp-proxies delete - delete target TCP proxies

SYNOPSIS
    gcloud alpha compute target-tcp-proxies delete NAME [NAME ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-tcp-proxies describe

```text
NAME
    gcloud alpha compute target-tcp-proxies describe - display detailed
        information about a target TCP proxy

SYNOPSIS
    gcloud alpha compute target-tcp-proxies describe NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-tcp-proxies list

```text
NAME
    gcloud alpha compute target-tcp-proxies list - list Google Compute Engine
        target TCP proxies

SYNOPSIS
    gcloud alpha compute target-tcp-proxies list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--global | --regions=[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-tcp-proxies test-iam-permissions

```text
NAME
    gcloud alpha compute target-tcp-proxies test-iam-permissions - test IAM
        permissions for a target TCP proxy

SYNOPSIS
    gcloud alpha compute target-tcp-proxies test-iam-permissions NAME
        --permissions=[PERMISSION,...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-tcp-proxies update

```text
NAME
    gcloud alpha compute target-tcp-proxies update - update a target TCP proxy

SYNOPSIS
    gcloud alpha compute target-tcp-proxies update NAME
        [--backend-service=BACKEND_SERVICE] [--proxy-header=PROXY_HEADER]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute target-tcp-proxies list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute target-tcp-proxies list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-tcp-proxies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
