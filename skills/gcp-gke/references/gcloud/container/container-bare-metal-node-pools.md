---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/bare-metal/node-pools
---

# gcloud container bare-metal node-pools

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container bare-metal node-pools create

```text
NAME
    gcloud container bare-metal node-pools create - create a node pool in an
        Anthos cluster on bare metal

SYNOPSIS
    gcloud container bare-metal node-pools create
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        (--node-configs=[labels=LABELS],[node-ip=NODE-IP]
          : --node-labels=[KEY=VALUE,...] --node-taints=[KEY=VALUE:EFFECT,...]
          --disable-serialize-image-pulls --registry-burst=REGISTRY_BURST
          --registry-pull-qps=REGISTRY_PULL_QPS)
        [--annotations=[KEY=VALUE,...]] [--async] [--display-name=DISPLAY_NAME]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a node pool in an Anthos cluster on bare metal.

EXAMPLES
    To create a node pool named my-node-pool in a cluster named my-cluster
    managed in location us-west1, run:

        $ gcloud container bare-metal node-pools create my-node-pool \
            --cluster=my-cluster --location=us-west1

POSITIONAL ARGUMENTS
     Node pool resource - node pool to create The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument node_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_POOL
          ID of the node_pool or fully qualified identifier for the node_pool.

          To set the node_pool attribute:
          + provide the argument node_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          cluster of the node_pool.

          To set the cluster attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          Google Cloud location for the node_pool.

          To set the location attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_bare_metal/location.

REQUIRED FLAGS
     Anthos on bare metal node pool configuration.

     This must be specified.

       Populate Bare Metal Node Pool node config.

       Exactly one of these must be specified:

         --node-configs=[labels=LABELS],[node-ip=NODE-IP]
            Bare Metal Node Pool node configuration.

       --node-labels=[KEY=VALUE,...]
          Labels assigned to nodes of a node pool.

       --node-taints=[KEY=VALUE:EFFECT,...]
          Node taint applied to every Kubernetes node in a node pool.

       Modifiable kubelet configurations for bare metal machines.

       --disable-serialize-image-pulls
          If set, prevent the Kubelet from pulling multiple images at a time.

       --registry-burst=REGISTRY_BURST
          Maximum size of bursty pulls, temporarily allow pulls to burst to
          this number, while still not exceeding registry_pull_qps.

       --registry-pull-qps=REGISTRY_PULL_QPS
          Limit of registry pulls per second.

OPTIONAL FLAGS
     --annotations=[KEY=VALUE,...]
        Annotations on the node pool.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        Display name for the resource.

     --validate-only
        If set, only validate the request, but do not actually perform the
        operation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container bare-metal node-pools create

        $ gcloud beta container bare-metal node-pools create
```

### gcloud container bare-metal node-pools delete

```text
NAME
    gcloud container bare-metal node-pools delete - delete a node pool in an
        Anthos cluster on bare metal

SYNOPSIS
    gcloud container bare-metal node-pools delete
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--allow-missing]
        [--async] [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a node pool in an Anthos cluster on bare metal.

EXAMPLES
    To delete a node pool named my-node-pool in a cluster named my-cluster
    managed in location us-west1, run:

        $ gcloud container bare-metal node-pools delete my-node-pool \
            --cluster=my-cluster --location=us-west1

POSITIONAL ARGUMENTS
     Node pool resource - node pool to delete The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument node_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_POOL
          ID of the node_pool or fully qualified identifier for the node_pool.

          To set the node_pool attribute:
          + provide the argument node_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          cluster of the node_pool.

          To set the cluster attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          Google Cloud location for the node_pool.

          To set the location attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_bare_metal/location.

FLAGS
     --allow-missing
        If set, and the Bare Metal Node Pool is not found, the request will
        succeed but no action will be taken.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --ignore-errors
        If set, the deletion of a Bare Metal Node Pool resource will succeed
        even if errors occur during deletion.

     --validate-only
        If set, only validate the request, but do not actually perform the
        operation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container bare-metal node-pools delete

        $ gcloud beta container bare-metal node-pools delete
```

### gcloud container bare-metal node-pools describe

```text
NAME
    gcloud container bare-metal node-pools describe - describe a node pool in
        an Anthos cluster on bare metal

SYNOPSIS
    gcloud container bare-metal node-pools describe
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a node pool in an Anthos cluster on bare metal.

EXAMPLES
    To describe a node pool named my-node-pool in a cluster named my-cluster
    managed in location us-west1, run:

        $ gcloud container bare-metal node-pools describe my-node-pool \
            --cluster=my-cluster --location=us-west1

POSITIONAL ARGUMENTS
     Node pool resource - node pool to describe The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument node_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_POOL
          ID of the node_pool or fully qualified identifier for the node_pool.

          To set the node_pool attribute:
          + provide the argument node_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          cluster of the node_pool.

          To set the cluster attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          Google Cloud location for the node_pool.

          To set the location attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_bare_metal/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container bare-metal node-pools describe

        $ gcloud beta container bare-metal node-pools describe
```

### gcloud container bare-metal node-pools enroll

```text
NAME
    gcloud container bare-metal node-pools enroll - enroll a node pool of a
        user cluster in Anthos on bare metal

SYNOPSIS
    gcloud container bare-metal node-pools enroll
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--async]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enroll a node pool of a user cluster in Anthos on bare metal.

EXAMPLES
    To enroll a node pool named my-node-pool in a cluster named my-cluster
    managed in location us-west1, run:

        $ gcloud container bare-metal node-pools enroll my-node-pool \
            --cluster=my-cluster --location=us-west1

POSITIONAL ARGUMENTS
     Node pool resource - node pool to enroll The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument node_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_POOL
          ID of the node_pool or fully qualified identifier for the node_pool.

          To set the node_pool attribute:
          + provide the argument node_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          cluster of the node_pool.

          To set the cluster attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          Google Cloud location for the node_pool.

          To set the location attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_bare_metal/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --validate-only
        If set, only validate the request, but do not actually perform the
        operation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container bare-metal node-pools enroll

        $ gcloud beta container bare-metal node-pools enroll
```

### gcloud container bare-metal node-pools list

```text
NAME
    gcloud container bare-metal node-pools list - list node pools in an Anthos
        cluster on bare metal

SYNOPSIS
    gcloud container bare-metal node-pools list
        (--cluster=CLUSTER : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List node pools in an Anthos cluster on bare metal.

EXAMPLES
    To list all node pools in a cluster named my-cluster managed in location
    us-west1, run:

        $ gcloud container bare-metal node-pools list --cluster=my-cluster \
            --location=us-west1

REQUIRED FLAGS
     Cluster resource - cluster to list The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --cluster=CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument --cluster on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          Google Cloud location for the cluster.

          To set the location attribute:
          + provide the argument --cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_bare_metal/location.

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

        $ gcloud alpha container bare-metal node-pools list

        $ gcloud beta container bare-metal node-pools list
```

### gcloud container bare-metal node-pools update

```text
NAME
    gcloud container bare-metal node-pools update - update a node pool in an
        Anthos cluster on bare metal

SYNOPSIS
    gcloud container bare-metal node-pools update
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--allow-missing]
        [--async] [--display-name=DISPLAY_NAME] [--validate-only]
        [--node-configs=[labels=LABELS],[node-ip=NODE-IP]
          --node-labels=[KEY=VALUE,...] --node-taints=[KEY=VALUE:EFFECT,...]
          --registry-burst=REGISTRY_BURST
          --registry-pull-qps=REGISTRY_PULL_QPS --disable-serialize-image-pulls
          | --enable-serialize-image-pulls] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a node pool in an Anthos cluster on bare metal.

EXAMPLES
    To update a node pool named my-node-pool in a cluster named my-cluster
    managed in location us-west1, run:

        $ gcloud container bare-metal node-pools update my-node-pool \
            --cluster=my-cluster --location=us-west1

POSITIONAL ARGUMENTS
     Node pool resource - node pool to update The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument node_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_POOL
          ID of the node_pool or fully qualified identifier for the node_pool.

          To set the node_pool attribute:
          + provide the argument node_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          cluster of the node_pool.

          To set the cluster attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          Google Cloud location for the node_pool.

          To set the location attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_bare_metal/location.

FLAGS
     --allow-missing
        If set, and the Anthos cluster on bare metal is not found, the update
        request will try to create a new cluster with the provided
        configuration.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        Display name for the resource.

     --validate-only
        If set, only validate the request, but do not actually perform the
        operation.

     Anthos on bare metal node pool configuration.

     Populate Bare Metal Node Pool node config.

     At most one of these can be specified:

       --node-configs=[labels=LABELS],[node-ip=NODE-IP]
          Bare Metal Node Pool node configuration.

     --node-labels=[KEY=VALUE,...]
        Labels assigned to nodes of a node pool.

     --node-taints=[KEY=VALUE:EFFECT,...]
        Node taint applied to every Kubernetes node in a node pool.

     Modifiable kubelet configurations for bare metal machines.

     --registry-burst=REGISTRY_BURST
        Maximum size of bursty pulls, temporarily allow pulls to burst to this
        number, while still not exceeding registry_pull_qps.

     --registry-pull-qps=REGISTRY_PULL_QPS
        Limit of registry pulls per second.

     At most one of these can be specified:

       --disable-serialize-image-pulls
          If set, prevent the Kubelet from pulling multiple images at a time.

       --enable-serialize-image-pulls
          If set, enable the Kubelet to pull multiple images at a time.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container bare-metal node-pools update

        $ gcloud beta container bare-metal node-pools update
```

### gcloud beta container bare-metal node-pools create

```text
NAME
    gcloud beta container bare-metal node-pools create - create a node pool in
        an Anthos cluster on bare metal

SYNOPSIS
    gcloud beta container bare-metal node-pools create
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        (--node-configs=[labels=LABELS],[node-ip=NODE-IP]
          : --node-labels=[KEY=VALUE,...] --node-taints=[KEY=VALUE:EFFECT,...]
          --disable-serialize-image-pulls --registry-burst=REGISTRY_BURST
          --registry-pull-qps=REGISTRY_PULL_QPS)
        [--annotations=[KEY=VALUE,...]] [--async] [--display-name=DISPLAY_NAME]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container bare-metal node-pools delete

```text
NAME
    gcloud beta container bare-metal node-pools delete - delete a node pool in
        an Anthos cluster on bare metal

SYNOPSIS
    gcloud beta container bare-metal node-pools delete
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--allow-missing]
        [--async] [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container bare-metal node-pools describe

```text
NAME
    gcloud beta container bare-metal node-pools describe - describe a node pool
        in an Anthos cluster on bare metal

SYNOPSIS
    gcloud beta container bare-metal node-pools describe
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container bare-metal node-pools enroll

```text
NAME
    gcloud beta container bare-metal node-pools enroll - enroll a node pool of
        a user cluster in Anthos on bare metal

SYNOPSIS
    gcloud beta container bare-metal node-pools enroll
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--async]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container bare-metal node-pools list

```text
NAME
    gcloud beta container bare-metal node-pools list - list node pools in an
        Anthos cluster on bare metal

SYNOPSIS
    gcloud beta container bare-metal node-pools list
        (--cluster=CLUSTER : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container bare-metal node-pools update

```text
NAME
    gcloud beta container bare-metal node-pools update - update a node pool in
        an Anthos cluster on bare metal

SYNOPSIS
    gcloud beta container bare-metal node-pools update
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--allow-missing]
        [--async] [--display-name=DISPLAY_NAME] [--validate-only]
        [--node-configs=[labels=LABELS],[node-ip=NODE-IP]
          --node-labels=[KEY=VALUE,...] --node-taints=[KEY=VALUE:EFFECT,...]
          --registry-burst=REGISTRY_BURST
          --registry-pull-qps=REGISTRY_PULL_QPS --disable-serialize-image-pulls
          | --enable-serialize-image-pulls] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal node-pools create

```text
NAME
    gcloud alpha container bare-metal node-pools create - create a node pool in
        an Anthos cluster on bare metal

SYNOPSIS
    gcloud alpha container bare-metal node-pools create
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        (--node-configs=[labels=LABELS],[node-ip=NODE-IP]
          : --node-labels=[KEY=VALUE,...] --node-taints=[KEY=VALUE:EFFECT,...]
          --disable-serialize-image-pulls --registry-burst=REGISTRY_BURST
          --registry-pull-qps=REGISTRY_PULL_QPS)
        [--annotations=[KEY=VALUE,...]] [--async] [--display-name=DISPLAY_NAME]
        [--validate-only] [--version=VERSION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal node-pools delete

```text
NAME
    gcloud alpha container bare-metal node-pools delete - delete a node pool in
        an Anthos cluster on bare metal

SYNOPSIS
    gcloud alpha container bare-metal node-pools delete
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--allow-missing]
        [--async] [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal node-pools describe

```text
NAME
    gcloud alpha container bare-metal node-pools describe - describe a node
        pool in an Anthos cluster on bare metal

SYNOPSIS
    gcloud alpha container bare-metal node-pools describe
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal node-pools enroll

```text
NAME
    gcloud alpha container bare-metal node-pools enroll - enroll a node pool of
        a user cluster in Anthos on bare metal

SYNOPSIS
    gcloud alpha container bare-metal node-pools enroll
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--async]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal node-pools list

```text
NAME
    gcloud alpha container bare-metal node-pools list - list node pools in an
        Anthos cluster on bare metal

SYNOPSIS
    gcloud alpha container bare-metal node-pools list
        (--cluster=CLUSTER : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal node-pools update

```text
NAME
    gcloud alpha container bare-metal node-pools update - update a node pool in
        an Anthos cluster on bare metal

SYNOPSIS
    gcloud alpha container bare-metal node-pools update
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--allow-missing]
        [--async] [--display-name=DISPLAY_NAME] [--validate-only]
        [--version=VERSION]
        [--node-configs=[labels=LABELS],[node-ip=NODE-IP]
          --node-labels=[KEY=VALUE,...] --node-taints=[KEY=VALUE:EFFECT,...]
          --registry-burst=REGISTRY_BURST
          --registry-pull-qps=REGISTRY_PULL_QPS --disable-serialize-image-pulls
          | --enable-serialize-image-pulls] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Incomplete example: the `create` example gives only the node pool name, `--cluster` and `--location`; gcloud 593.0.0 rejects it ("Exactly one of --node-configs must be specified"), because the SYNOPSIS requires the node configuration (`--node-configs`, for example `--node-configs=node-ip=NODE_IP`). Use the SYNOPSIS and flags on this page to complete the command.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/bare-metal/node-pools (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
