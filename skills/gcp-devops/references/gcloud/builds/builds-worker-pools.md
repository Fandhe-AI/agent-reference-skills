---
source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/worker-pools
---

# gcloud builds worker-pools

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud builds worker-pools create

```text
NAME
    gcloud builds worker-pools create - create a worker pool for use by Google
        Cloud Build

SYNOPSIS
    gcloud builds worker-pools create WORKER_POOL [--region=REGION]
        [--config-from-file=CONFIG_FROM_FILE
          | --worker-disk-size=WORKER_DISK_SIZE
          --worker-machine-type=WORKER_MACHINE_TYPE
          --worker-release=WORKER_RELEASE --peered-network=PEERED_NETWORK
          --peered-network-ip-range=PEERED_NETWORK_IP_RANGE --no-public-egress]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a worker pool for use by Google Cloud Build.

EXAMPLES
    To create a worker pool named wp1 in region us-central1, run:

        $ gcloud builds worker-pools create wp1 --region=us-central1

    To create a worker pool in project p1 in region us-central1 where workers
    are of machine type e2-standard-2 and are peered to the VPC network
    projects/123/global/networks/default within the IP range 192.168.0.0/28 and
    have a disk size of 64GB, run:

        $ gcloud builds worker-pools create wp1 --project=p1 \
            --region=us-central1 \
            --peered-network=projects/123/global/networks/default \
            --peered-network-ip-range=192.168.0.0/28 \
            --worker-machine-type=e2-standard-2 --worker-disk-size=64GB

POSITIONAL ARGUMENTS
     WORKER_POOL
        Unique identifier for the worker pool to create. This value should be
        1-63 characters, and valid characters are [a-z][0-9]-

FLAGS
     --region=REGION
        Cloud region where the worker pool is created. See
        https://cloud.google.com/build/docs/locations for available locations.

     At most one of these can be specified:

       --config-from-file=CONFIG_FROM_FILE
          File that contains the configuration for the worker pool to be
          created. See
          https://cloud.google.com/build/docs/private-pools/worker-pool-config-file-schema
          for options.

       Or at least one of these can be specified:

         Command-line flags to configure the private pool:

         Configuration to be used for creating workers in the worker pool:

         --worker-disk-size=WORKER_DISK_SIZE
            Size of the disk attached to the worker.

            If unspecified, Cloud Build uses a standard disk size.

         --worker-machine-type=WORKER_MACHINE_TYPE
            Compute Engine machine type for a worker pool.

            If unspecified, Cloud Build uses a standard machine type.

         --worker-release=WORKER_RELEASE
            Specifies the release channel or version to use for builds in this
            worker pool. Accepts release channel names (rapid, regular, stable)
            or specific release versions (for example, 2026.09, legacy). See
            https://docs.cloud.google.com/build/docs/release-channels.

         Network configuration for Service Networking:

         --peered-network=PEERED_NETWORK
            Existing network to which workers are peered. The network is
            specified in resource URL format
            projects/{network_project}/global/networks/{network_name}.

            If not specified, the workers are not peered to any network.

         --peered-network-ip-range=PEERED_NETWORK_IP_RANGE
            An IP range for your peered network. Specify the IP range using
            Classless Inter-Domain Routing (CIDR) notation with a slash and the
            subnet prefix size, such as /29.

            Your subnet prefix size must be between 1 and 29. Optional: you can
            specify an IP address before the subnet prefix value - for example
            192.168.0.0/24.

            If no IP address is specified, your VPC automatically determines
            the starting IP for the range. If no IP range is specified, Cloud
            Build uses /24 as the default network IP range.

         --no-public-egress
            If set, workers in the worker pool are created without an external
            IP address.

            If the worker pool is within a VPC Service Control perimeter, use
            this flag.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds worker-pools create

        $ gcloud beta builds worker-pools create
```

### gcloud builds worker-pools delete

```text
NAME
    gcloud builds worker-pools delete - delete a worker pool from Cloud Build

SYNOPSIS
    gcloud builds worker-pools delete WORKER_POOL [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a worker pool from Cloud Build.

EXAMPLES
    To delete a worker pool named wp1 in region us-central1, run:

        $ gcloud builds worker-pools delete wp1 --region=us-central1

POSITIONAL ARGUMENTS
     WORKER_POOL
        The ID of the worker pool to delete.

FLAGS
     --region=REGION
        The Cloud region where the worker pool is.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds worker-pools delete

        $ gcloud beta builds worker-pools delete
```

### gcloud builds worker-pools describe

```text
NAME
    gcloud builds worker-pools describe - describe a worker pool used by Cloud
        Build

SYNOPSIS
    gcloud builds worker-pools describe WORKER_POOL [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a worker pool used by Cloud Build.

EXAMPLES
    To get information about a worker pool named wp1 in region us-central1,
    run:

        $ gcloud builds worker-pools describe wp1 --region=us-central1

POSITIONAL ARGUMENTS
     WORKER_POOL
        The ID of the worker pool to describe.

FLAGS
     --region=REGION
        The Cloud region where the worker pool is.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds worker-pools describe

        $ gcloud beta builds worker-pools describe
```

### gcloud builds worker-pools list

```text
NAME
    gcloud builds worker-pools list - list all worker pools in a Google Cloud
        project

SYNOPSIS
    gcloud builds worker-pools list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all worker pools in a Google Cloud project.

EXAMPLES
    To fetch a list of worker pools running in region us-central1, run:

        $ gcloud builds worker-pools list --region=us-central1

FLAGS
     --region=REGION
        The Cloud region to list worker pools in.

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

        $ gcloud alpha builds worker-pools list

        $ gcloud beta builds worker-pools list
```

### gcloud builds worker-pools update

```text
NAME
    gcloud builds worker-pools update - update a worker pool used by Cloud
        Build

SYNOPSIS
    gcloud builds worker-pools update WORKER_POOL
        (--config-from-file=CONFIG_FROM_FILE | --[no-]public-egress
          --worker-disk-size=WORKER_DISK_SIZE
          --worker-machine-type=WORKER_MACHINE_TYPE
          --worker-release=WORKER_RELEASE) [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a worker pool used by Cloud Build.

EXAMPLES
    To change the machine type and disk size of workers in a worker pool named
    wp1, run:

        $ gcloud builds worker-pools update wp1 --region=us-central1 \
            --worker-machine-type=e2-standard-2 --worker-disk-size=64GB

POSITIONAL ARGUMENTS
     WORKER_POOL
        Unique identifier for the worker pool to update. This value should be
        1-63 characters, and valid characters are [a-z][0-9]-

REQUIRED FLAGS
     Exactly one of these must be specified:

       --config-from-file=CONFIG_FROM_FILE
          File that contains updates to the configuration for the worker pool.
          See
          https://cloud.google.com/build/docs/private-pools/worker-pool-config-file-schema
          for options.

       Or at least one of these can be specified:

         Command-line flags to configure the private pool:

         --[no-]public-egress
            If set to true, workers in the worker pool are created with an
            external IP address.

            If set to false, workers in the worker pool are created without an
            external IP address. If the worker pool is within a VPC Service
            Control perimeter, use this flag.

            Use --public-egress to enable and --no-public-egress to disable.

         Configuration to be used for creating workers in the worker pool:

         --worker-disk-size=WORKER_DISK_SIZE
            Size of the disk attached to the worker.

            If unspecified, Cloud Build uses a standard disk size.

         --worker-machine-type=WORKER_MACHINE_TYPE
            Compute Engine machine type for a worker pool.

            If unspecified, Cloud Build uses a standard machine type.

         --worker-release=WORKER_RELEASE
            Specifies the release channel or version to use for builds in this
            worker pool. Accepts release channel names (rapid, regular, stable)
            or specific release versions (for example, 2026.09, legacy). See
            https://docs.cloud.google.com/build/docs/release-channels.

OPTIONAL FLAGS
     --region=REGION
        Cloud region where the worker pool is updated. See
        https://cloud.google.com/build/docs/locations for available locations.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds worker-pools update

        $ gcloud beta builds worker-pools update
```

### gcloud beta builds worker-pools create

```text
NAME
    gcloud beta builds worker-pools create - create a worker pool for use by
        Cloud Build

SYNOPSIS
    gcloud beta builds worker-pools create WORKER_POOL
        [--generation=GENERATION; default=1] [--region=REGION]
        [--config-from-file=CONFIG_FROM_FILE | --peered-network=PEERED_NETWORK
          --peered-network-ip-range=PEERED_NETWORK_IP_RANGE --no-public-egress
          --worker-disk-size=WORKER_DISK_SIZE
          --worker-machine-type=WORKER_MACHINE_TYPE
          --worker-release=WORKER_RELEASE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds worker-pools delete

```text
NAME
    gcloud beta builds worker-pools delete - delete a worker pool from Google
        Cloud Build

SYNOPSIS
    gcloud beta builds worker-pools delete WORKER_POOL
        [--generation=GENERATION; default=1] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds worker-pools describe

```text
NAME
    gcloud beta builds worker-pools describe - describe a worker pool used by
        Cloud Build

SYNOPSIS
    gcloud beta builds worker-pools describe WORKER_POOL
        [--generation=GENERATION; default=1] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds worker-pools list

```text
NAME
    gcloud beta builds worker-pools list - list all worker pools in a Google
        Cloud project

SYNOPSIS
    gcloud beta builds worker-pools list [--generation=GENERATION; default=1]
        [--region=REGION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds worker-pools update

```text
NAME
    gcloud beta builds worker-pools update - update a worker pool used by Cloud
        Build

SYNOPSIS
    gcloud beta builds worker-pools update WORKER_POOL
        (--config-from-file=CONFIG_FROM_FILE | --[no-]public-egress
          --worker-disk-size=WORKER_DISK_SIZE
          --worker-machine-type=WORKER_MACHINE_TYPE
          --worker-release=WORKER_RELEASE) [--generation=GENERATION; default=1]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds worker-pools create

```text
NAME
    gcloud alpha builds worker-pools create - create a private pool for use by
        Cloud Build

SYNOPSIS
    gcloud alpha builds worker-pools create WORKER_POOL
        [--generation=GENERATION; default=1] [--region=REGION]
        [--config-from-file=CONFIG_FROM_FILE | --peered-network=PEERED_NETWORK
          --peered-network-ip-range=PEERED_NETWORK_IP_RANGE --no-public-egress
          --worker-disk-size=WORKER_DISK_SIZE
          --worker-machine-type=WORKER_MACHINE_TYPE
          --worker-release=WORKER_RELEASE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds worker-pools delete

```text
NAME
    gcloud alpha builds worker-pools delete - delete a private worker pool from
        Google Cloud Build

SYNOPSIS
    gcloud alpha builds worker-pools delete WORKER_POOL
        [--generation=GENERATION; default=1] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds worker-pools describe

```text
NAME
    gcloud alpha builds worker-pools describe - describe a worker pool used by
        Cloud Build

SYNOPSIS
    gcloud alpha builds worker-pools describe WORKER_POOL
        [--generation=GENERATION; default=1] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds worker-pools list

```text
NAME
    gcloud alpha builds worker-pools list - list all worker pools in a Google
        Cloud project

SYNOPSIS
    gcloud alpha builds worker-pools list [--generation=GENERATION; default=1]
        [--region=REGION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds worker-pools update

```text
NAME
    gcloud alpha builds worker-pools update - update a private pool used by
        Cloud Build

SYNOPSIS
    gcloud alpha builds worker-pools update WORKER_POOL
        (--config-from-file=CONFIG_FROM_FILE | --[no-]public-egress
          --worker-disk-size=WORKER_DISK_SIZE
          --worker-machine-type=WORKER_MACHINE_TYPE
          --worker-release=WORKER_RELEASE) [--generation=GENERATION; default=1]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Incomplete example: the `--worker-disk-size=64GB` example is rejected by gcloud 593.0.0 ("argument --worker-disk-size: value must be greater than or equal to 100GB; received: 64GB"); the minimum is not stated in the help text, so the examples are kept as written. Use a size of at least 100GB.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/worker-pools (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
