---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/vmware/node-pools
---

# gcloud container vmware node-pools

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container vmware node-pools create

```text
NAME
    gcloud container vmware node-pools create - create a node pool in an Anthos
        cluster on VMware

SYNOPSIS
    gcloud container vmware node-pools create
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        (--image-type=IMAGE_TYPE : --boot-disk-size=BOOT_DISK_SIZE --cpus=CPUS
          --enable-load-balancer --image=IMAGE --memory=MEMORY
          --node-labels=[KEY=VALUE,...]
          --node-taints=[KEY=VALUE:EFFECT,...] --replicas=REPLICAS)
        [--annotations=[KEY=VALUE,...]] [--async] [--display-name=DISPLAY_NAME]
        [--validate-only]
        [--max-replicas=MAX_REPLICAS --min-replicas=MIN_REPLICAS]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a node pool in an Anthos cluster on VMware.

EXAMPLES
    To create a node pool named my-node-pool in a cluster named my-cluster
    managed in location us-west1, run:

        $ gcloud container vmware node-pools create my-node-pool \
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
          + set the property container_vmware/location.

REQUIRED FLAGS
     Configuration of the node pool

     This must be specified.

       --image-type=IMAGE_TYPE
          OS image type to use on node pool instances.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --boot-disk-size=BOOT_DISK_SIZE
          Size of VMware disk to be used during creation in GB.

       --cpus=CPUS
          Number of CPUs for each node in the node pool.

       --enable-load-balancer
          If set, enable the use of load balancer on the node pool instances.

       --image=IMAGE
          OS image name in vCenter.

       --memory=MEMORY
          Size of memory for each node in the node pool in MB.

       --node-labels=[KEY=VALUE,...]
          Kubernetes labels (key/value pairs) to be applied to each node.

       --node-taints=[KEY=VALUE:EFFECT,...]
          Applies the given kubernetes taints on all nodes in the new node
          pool, which can be used with tolerations for pod scheduling.

          Taint effect must be one of the following: NoSchedule,
          PreferNoSchedule, or NoExecute.

          Examples:

              $ gcloud container vmware node-pools create node-pool-1 \
                  --cluster=example-cluster \
                  --node-taints=key1=val1:NoSchedule,key2=val2:PreferNoSchedule

       --replicas=REPLICAS
          Number of replicas to use on node pool instances.

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

     Node pool autoscaling

     --max-replicas=MAX_REPLICAS
        Maximum number of replicas in the node pool.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --min-replicas=MIN_REPLICAS
        Minimum number of replicas in the node pool.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container vmware node-pools create

        $ gcloud beta container vmware node-pools create
```

### gcloud container vmware node-pools delete

```text
NAME
    gcloud container vmware node-pools delete - delete a node pool in an Anthos
        cluster on VMware

SYNOPSIS
    gcloud container vmware node-pools delete
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--allow-missing]
        [--async] [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a node pool in an Anthos cluster on VMware.

EXAMPLES
    To delete a node pool named my-node-pool in a cluster named my-cluster
    managed in location us-west1, run:

        $ gcloud container vmware node-pools delete my-node-pool \
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
          + set the property container_vmware/location.

FLAGS
     --allow-missing
        If set, and the Vmware Node Pool is not found, the request will succeed
        but no action will be taken.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --ignore-errors
        If set, the deletion of a VMware node pool resource will succeed even
        if errors occur during deletion.

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

        $ gcloud alpha container vmware node-pools delete

        $ gcloud beta container vmware node-pools delete
```

### gcloud container vmware node-pools describe

```text
NAME
    gcloud container vmware node-pools describe - describe a node pool in an
        Anthos cluster on VMware

SYNOPSIS
    gcloud container vmware node-pools describe
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a node pool in an Anthos cluster on VMware.

EXAMPLES
    To describe a node pool named my-node-pool in a cluster named my-cluster
    managed in location us-west1, run:

        $ gcloud container vmware node-pools describe my-node-pool \
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
          + set the property container_vmware/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container vmware node-pools describe

        $ gcloud beta container vmware node-pools describe
```

### gcloud container vmware node-pools enroll

```text
NAME
    gcloud container vmware node-pools enroll - enroll a node pool in an Anthos
        cluster on VMware

SYNOPSIS
    gcloud container vmware node-pools enroll
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enroll a node pool in an Anthos cluster on VMware.

EXAMPLES
    To enroll a node pool named my-node-pool in a cluster named my-cluster
    managed in location us-west1, run:

        $ gcloud container vmware node-pools enroll my-node-pool \
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
          + set the property container_vmware/location.

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

NOTES
    These variants are also available:

        $ gcloud alpha container vmware node-pools enroll

        $ gcloud beta container vmware node-pools enroll
```

### gcloud container vmware node-pools list

```text
NAME
    gcloud container vmware node-pools list - list node pools in an Anthos
        cluster on VMware

SYNOPSIS
    gcloud container vmware node-pools list
        (--cluster=CLUSTER : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List node pools in an Anthos cluster on VMware.

EXAMPLES
    To list all node pools in a cluster named my-cluster managed in location
    us-west1, run:

        $ gcloud container vmware node-pools list --cluster=my-cluster \
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
          + set the property container_vmware/location.

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

        $ gcloud alpha container vmware node-pools list

        $ gcloud beta container vmware node-pools list
```

### gcloud container vmware node-pools update

```text
NAME
    gcloud container vmware node-pools update - update a node pool in an Anthos
        cluster on VMware

SYNOPSIS
    gcloud container vmware node-pools update
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--async]
        [--display-name=DISPLAY_NAME] [--validate-only]
        [--boot-disk-size=BOOT_DISK_SIZE --cpus=CPUS --image=IMAGE
          --image-type=IMAGE_TYPE --memory=MEMORY --node-labels=[KEY=VALUE,...]
          --node-taints=[KEY=VALUE:EFFECT,...]
          --replicas=REPLICAS --disable-load-balancer | --enable-load-balancer]
        [--max-replicas=MAX_REPLICAS --min-replicas=MIN_REPLICAS]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a node pool in an Anthos cluster on VMware.

EXAMPLES
    To update a node pool named my-node-pool in a cluster named my-cluster
    managed in location us-west1, run:

        $ gcloud container vmware node-pools update my-node-pool \
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
          + set the property container_vmware/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        Display name for the resource.

     --validate-only
        If set, only validate the request, but do not actually perform the
        operation.

     Configuration of the node pool

     --boot-disk-size=BOOT_DISK_SIZE
        Size of VMware disk to be used during creation in GB.

     --cpus=CPUS
        Number of CPUs for each node in the node pool.

     --image=IMAGE
        OS image name in vCenter.

     --image-type=IMAGE_TYPE
        OS image type to use on node pool instances.

     --memory=MEMORY
        Size of memory for each node in the node pool in MB.

     --node-labels=[KEY=VALUE,...]
        Kubernetes labels (key/value pairs) to be applied to each node.

     --node-taints=[KEY=VALUE:EFFECT,...]
        Applies the given kubernetes taints on all nodes in the new node pool,
        which can be used with tolerations for pod scheduling.

        Taint effect must be one of the following: NoSchedule,
        PreferNoSchedule, or NoExecute.

        Examples:

            $ gcloud container vmware node-pools update node-pool-1 \
                --cluster=example-cluster \
                --node-taints=key1=val1:NoSchedule,key2=val2:PreferNoSchedule

     --replicas=REPLICAS
        Number of replicas to use on node pool instances.

     At most one of these can be specified:

       --disable-load-balancer
          If set, disable the use of load balancer on the node pool instances.

       --enable-load-balancer
          If set, enable the use of load balancer on the node pool instances.

     Node pool autoscaling

     --max-replicas=MAX_REPLICAS
        Maximum number of replicas in the node pool.

     --min-replicas=MIN_REPLICAS
        Minimum number of replicas in the node pool.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container vmware node-pools update

        $ gcloud beta container vmware node-pools update
```

### gcloud beta container vmware node-pools create

```text
NAME
    gcloud beta container vmware node-pools create - create a node pool in an
        Anthos cluster on VMware

SYNOPSIS
    gcloud beta container vmware node-pools create
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        (--image-type=IMAGE_TYPE : --boot-disk-size=BOOT_DISK_SIZE --cpus=CPUS
          --enable-load-balancer --image=IMAGE --memory=MEMORY
          --node-labels=[KEY=VALUE,...]
          --node-taints=[KEY=VALUE:EFFECT,...] --replicas=REPLICAS)
        [--annotations=[KEY=VALUE,...]] [--async] [--display-name=DISPLAY_NAME]
        [--validate-only]
        [--max-replicas=MAX_REPLICAS --min-replicas=MIN_REPLICAS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware node-pools delete

```text
NAME
    gcloud beta container vmware node-pools delete - delete a node pool in an
        Anthos cluster on VMware

SYNOPSIS
    gcloud beta container vmware node-pools delete
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--allow-missing]
        [--async] [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware node-pools describe

```text
NAME
    gcloud beta container vmware node-pools describe - describe a node pool in
        an Anthos cluster on VMware

SYNOPSIS
    gcloud beta container vmware node-pools describe
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware node-pools enroll

```text
NAME
    gcloud beta container vmware node-pools enroll - enroll a node pool in an
        Anthos cluster on VMware

SYNOPSIS
    gcloud beta container vmware node-pools enroll
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware node-pools list

```text
NAME
    gcloud beta container vmware node-pools list - list node pools in an Anthos
        cluster on VMware

SYNOPSIS
    gcloud beta container vmware node-pools list
        (--cluster=CLUSTER : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware node-pools update

```text
NAME
    gcloud beta container vmware node-pools update - update a node pool in an
        Anthos cluster on VMware

SYNOPSIS
    gcloud beta container vmware node-pools update
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--async]
        [--display-name=DISPLAY_NAME] [--validate-only]
        [--boot-disk-size=BOOT_DISK_SIZE --cpus=CPUS --image=IMAGE
          --image-type=IMAGE_TYPE --memory=MEMORY --node-labels=[KEY=VALUE,...]
          --node-taints=[KEY=VALUE:EFFECT,...]
          --replicas=REPLICAS --disable-load-balancer | --enable-load-balancer]
        [--max-replicas=MAX_REPLICAS --min-replicas=MIN_REPLICAS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware node-pools create

```text
NAME
    gcloud alpha container vmware node-pools create - create a node pool in an
        Anthos cluster on VMware

SYNOPSIS
    gcloud alpha container vmware node-pools create
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        (--image-type=IMAGE_TYPE : --boot-disk-size=BOOT_DISK_SIZE --cpus=CPUS
          --enable-load-balancer --image=IMAGE --memory=MEMORY
          --node-labels=[KEY=VALUE,...]
          --node-taints=[KEY=VALUE:EFFECT,...] --replicas=REPLICAS)
        [--annotations=[KEY=VALUE,...]] [--async] [--display-name=DISPLAY_NAME]
        [--validate-only]
        [--max-replicas=MAX_REPLICAS --min-replicas=MIN_REPLICAS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware node-pools delete

```text
NAME
    gcloud alpha container vmware node-pools delete - delete a node pool in an
        Anthos cluster on VMware

SYNOPSIS
    gcloud alpha container vmware node-pools delete
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--allow-missing]
        [--async] [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware node-pools describe

```text
NAME
    gcloud alpha container vmware node-pools describe - describe a node pool in
        an Anthos cluster on VMware

SYNOPSIS
    gcloud alpha container vmware node-pools describe
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware node-pools enroll

```text
NAME
    gcloud alpha container vmware node-pools enroll - enroll a node pool in an
        Anthos cluster on VMware

SYNOPSIS
    gcloud alpha container vmware node-pools enroll
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware node-pools list

```text
NAME
    gcloud alpha container vmware node-pools list - list node pools in an
        Anthos cluster on VMware

SYNOPSIS
    gcloud alpha container vmware node-pools list
        (--cluster=CLUSTER : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware node-pools update

```text
NAME
    gcloud alpha container vmware node-pools update - update a node pool in an
        Anthos cluster on VMware

SYNOPSIS
    gcloud alpha container vmware node-pools update
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--async]
        [--display-name=DISPLAY_NAME] [--validate-only]
        [--boot-disk-size=BOOT_DISK_SIZE --cpus=CPUS --image=IMAGE
          --image-type=IMAGE_TYPE --memory=MEMORY --node-labels=[KEY=VALUE,...]
          --node-taints=[KEY=VALUE:EFFECT,...]
          --replicas=REPLICAS --disable-load-balancer | --enable-load-balancer]
        [--max-replicas=MAX_REPLICAS --min-replicas=MIN_REPLICAS]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Incomplete example: the `create` example gives only the node pool name, `--cluster` and `--location`; gcloud 593.0.0 rejects it ("argument (--image-type : ...): Must be specified"), because the SYNOPSIS requires the node configuration (`--image-type`, optionally with `--boot-disk-size`, `--cpus`, `--memory`, `--replicas` and the other flags of that group). Use the SYNOPSIS and flags on this page to complete the command.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/vmware/node-pools (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
