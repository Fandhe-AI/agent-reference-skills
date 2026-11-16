---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/azure/node-pools
---

# gcloud container azure node-pools

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container azure node-pools create

```text
NAME
    gcloud container azure node-pools create - create a node pool in an Anthos
        cluster on Azure

SYNOPSIS
    gcloud container azure node-pools create
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        --max-pods-per-node=MAX_PODS_PER_NODE --node-version=NODE_VERSION
        --ssh-public-key=SSH_PUBLIC_KEY --subnet-id=SUBNET_ID
        (--max-nodes=MAX_NODES --min-nodes=MIN_NODES)
        [--annotations=ANNOTATION,[ANNOTATION,...]] [--async]
        [--azure-availability-zone=AZURE_AVAILABILITY_ZONE]
        [--config-encryption-key-id=CONFIG_ENCRYPTION_KEY_ID]
        [--config-encryption-public-key=CONFIG_ENCRYPTION_PUBLIC_KEY]
        [--enable-autorepair] [--node-labels=NODE_LABEL,[NODE_LABEL,...]]
        [--node-taints=NODE_TAINT,[NODE_TAINT,...]]
        [--root-volume-size=ROOT_VOLUME_SIZE] [--tags=TAG,[TAG,...]]
        [--validate-only] [--vm-size=VM_SIZE]
        [--proxy-resource-group-id=PROXY_RESOURCE_GROUP_ID
          --proxy-secret-id=PROXY_SECRET_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Create a node pool in an Anthos cluster on Azure.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To create a node pool named my-node-pool in a cluster named my-cluster
    managed in location us-west1, run:

        $ gcloud container azure node-pools create my-node-pool \
            --cluster=my-cluster --location=us-west1 \
            --node-version=NODE_VERSION --ssh-public-key=SSH_PUBLIC_KEY \
            --subnet-id=SUBNET_ID

POSITIONAL ARGUMENTS
     Nodepool resource - node pool to create. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument node_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_POOL
          ID of the nodepool or fully qualified identifier for the nodepool.

          To set the nodepool attribute:
          + provide the argument node_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          cluster of the nodepool.

          To set the cluster attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          Google Cloud location for the nodepool.

          To set the location attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_azure/location.

REQUIRED FLAGS
     --max-pods-per-node=MAX_PODS_PER_NODE
        Maximum number of pods per node.

     --node-version=NODE_VERSION
        Kubernetes version to use for the node pool.

     --ssh-public-key=SSH_PUBLIC_KEY
        SSH public key to use for authentication.

     --subnet-id=SUBNET_ID
        Subnet ID of an existing VNET to use for the node pool.

     Node pool autoscaling

     This must be specified.

       --max-nodes=MAX_NODES
          Maximum number of nodes in the node pool.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --min-nodes=MIN_NODES
          Minimum number of nodes in the node pool.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

OPTIONAL FLAGS
     --annotations=ANNOTATION,[ANNOTATION,...]
        Annotations for the node pool.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --azure-availability-zone=AZURE_AVAILABILITY_ZONE
        Azure availability zone where the node pool will be created.

     --config-encryption-key-id=CONFIG_ENCRYPTION_KEY_ID
        URL the of the Azure Key Vault key (with its version) to use to encrypt
        / decrypt config data.

     --config-encryption-public-key=CONFIG_ENCRYPTION_PUBLIC_KEY
        RSA key of the Azure Key Vault public key to use for encrypting config
        data.

     --enable-autorepair
        Enable node autorepair feature for a node pool. Use
        --no-enable-autorepair to disable.

            $ gcloud container azure node-pools create --enable-autorepair

        Node autorepair is disabled by default.

     --node-labels=NODE_LABEL,[NODE_LABEL,...]
        Labels assigned to the node pool's nodes.

     --node-taints=NODE_TAINT,[NODE_TAINT,...]
        Taints assigned to nodes of the node pool. Node taint is of format
        key=value:effect. Effect must be one of: NoExecute, NoSchedule,
        PreferNoSchedule.

     --root-volume-size=ROOT_VOLUME_SIZE
        Size of the root volume. The value must be a whole number followed by a
        size unit of GB for gigabyte, or TB for terabyte. If no size unit is
        specified, GB is assumed.

     --tags=TAG,[TAG,...]
        Applies the given tags (comma separated) on the node pool. Example:

            $ gcloud container azure node-pools create EXAMPLE_NODE_POOL \
                --tags=tag1=one,tag2=two

     --validate-only
        Validate the creation of the node pool, but don't actually perform it.

     --vm-size=VM_SIZE
        Azure Virtual Machine Size (e.g. Standard_DS1_v).

     Proxy config

     --proxy-resource-group-id=PROXY_RESOURCE_GROUP_ID
        The ARM ID the of the resource group containing proxy keyvault.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --proxy-secret-id=PROXY_SECRET_ID
        The URL the of the proxy setting secret with its version.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container azure node-pools create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud container azure node-pools create my-node-pool \
    --cluster=my-cluster \
    --location=us-west1 \
    --node-version=NODE_VERSION \
    --ssh-public-key=SSH_PUBLIC_KEY \
    --subnet-id=SUBNET_ID \
    --max-pods-per-node=110 \
    --min-nodes=1 \
    --max-nodes=3
```

### gcloud container azure node-pools delete

```text
NAME
    gcloud container azure node-pools delete - delete a node pool in an Anthos
        cluster on Azure

SYNOPSIS
    gcloud container azure node-pools delete
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--allow-missing]
        [--async] [--ignore-errors] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Delete a node pool in an Anthos cluster on Azure.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To delete a node pool named my-node-pool in a cluster named my-cluster
    managed in location us-west1, run:

        $ gcloud container azure node-pools delete my-node-pool \
            --cluster=my-cluster --location=us-west1

POSITIONAL ARGUMENTS
     Nodepool resource - node pool to delete. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument node_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_POOL
          ID of the nodepool or fully qualified identifier for the nodepool.

          To set the nodepool attribute:
          + provide the argument node_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          cluster of the nodepool.

          To set the cluster attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          Google Cloud location for the nodepool.

          To set the location attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_azure/location.

FLAGS
     --allow-missing
        Allow idempotent deletion of node pool. The request will still succeed
        in case the node pool does not exist.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --ignore-errors
        Force delete an Azure node pool. Deletion of the Azure node pool will
        succeed even if errors occur during deleting in-node pool resources.
        Using this parameter may result in orphaned resources in the node pool.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container azure node-pools delete
```

### gcloud container azure node-pools describe

```text
NAME
    gcloud container azure node-pools describe - describe a node pool in an
        Anthos cluster on Azure

SYNOPSIS
    gcloud container azure node-pools describe
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Describe a node pool in an Anthos cluster on Azure.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To describe a node pool named my-node-pool in a cluster named my-cluster
    managed in location us-west1, run:

        $ gcloud container azure node-pools describe my-node-pool \
            --cluster=my-cluster --location=us-west1

POSITIONAL ARGUMENTS
     Nodepool resource - node pool to describe. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument node_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_POOL
          ID of the nodepool or fully qualified identifier for the nodepool.

          To set the nodepool attribute:
          + provide the argument node_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          cluster of the nodepool.

          To set the cluster attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          Google Cloud location for the nodepool.

          To set the location attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_azure/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container azure node-pools describe
```

### gcloud container azure node-pools list

```text
NAME
    gcloud container azure node-pools list - list node pools in an Anthos
        cluster on Azure

SYNOPSIS
    gcloud container azure node-pools list
        (--cluster=CLUSTER : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) List node pools in an Anthos cluster on Azure.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To list all node pools in a cluster named my-cluster managed in location
    us-west1, run:

        $ gcloud container azure node-pools list --cluster=my-cluster \
            --location=us-west1

REQUIRED FLAGS
     Cluster resource - cluster to list Azure node pools. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

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
          + set the property container_azure/location.

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

        $ gcloud alpha container azure node-pools list
```

### gcloud container azure node-pools update

```text
NAME
    gcloud container azure node-pools update - update a node pool in an Anthos
        cluster on Azure

SYNOPSIS
    gcloud container azure node-pools update
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--async]
        [--enable-autorepair] [--node-version=NODE_VERSION]
        [--ssh-public-key=SSH_PUBLIC_KEY] [--validate-only]
        [--annotations=ANNOTATION,[ANNOTATION,...] | --clear-annotations]
        [--max-nodes=MAX_NODES --min-nodes=MIN_NODES] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Update a node pool in an Anthos cluster on Azure.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To update a node pool named my-node-pool in a cluster named my-cluster
    managed in location us-west1, run:

        $ gcloud container azure node-pools update my-node-pool \
            --cluster=my-cluster --location=us-west1 \
            --node-version=NODE_VERSION

POSITIONAL ARGUMENTS
     Nodepool resource - node pool to update. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument node_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_POOL
          ID of the nodepool or fully qualified identifier for the nodepool.

          To set the nodepool attribute:
          + provide the argument node_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          cluster of the nodepool.

          To set the cluster attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          Google Cloud location for the nodepool.

          To set the location attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_azure/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --enable-autorepair
        Enable node autorepair feature for a node pool. Use
        --no-enable-autorepair to disable.

            $ gcloud container azure node-pools update --enable-autorepair

     --node-version=NODE_VERSION
        Kubernetes version to use for the node pool.

     --ssh-public-key=SSH_PUBLIC_KEY
        SSH public key to use for authentication.

     --validate-only
        Validate the update of the node pool, but don't actually perform it.

     Annotations

     At most one of these can be specified:

       --annotations=ANNOTATION,[ANNOTATION,...]
          Annotations for the node pool.

       --clear-annotations
          Clear the annotations for the node pool.

     Node pool autoscaling

     --max-nodes=MAX_NODES
        Maximum number of nodes in the node pool.

     --min-nodes=MIN_NODES
        Minimum number of nodes in the node pool.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container azure node-pools update
```

### gcloud alpha container azure node-pools create

```text
NAME
    gcloud alpha container azure node-pools create - create a node pool in an
        Anthos cluster on Azure

SYNOPSIS
    gcloud alpha container azure node-pools create
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        --max-pods-per-node=MAX_PODS_PER_NODE --node-version=NODE_VERSION
        --ssh-public-key=SSH_PUBLIC_KEY --subnet-id=SUBNET_ID
        (--max-nodes=MAX_NODES --min-nodes=MIN_NODES)
        [--annotations=ANNOTATION,[ANNOTATION,...]] [--async]
        [--azure-availability-zone=AZURE_AVAILABILITY_ZONE]
        [--config-encryption-key-id=CONFIG_ENCRYPTION_KEY_ID]
        [--config-encryption-public-key=CONFIG_ENCRYPTION_PUBLIC_KEY]
        [--enable-autorepair] [--image-type=IMAGE_TYPE]
        [--node-labels=NODE_LABEL,[NODE_LABEL,...]]
        [--node-taints=NODE_TAINT,[NODE_TAINT,...]]
        [--root-volume-size=ROOT_VOLUME_SIZE] [--tags=TAG,[TAG,...]]
        [--validate-only] [--vm-size=VM_SIZE]
        [--proxy-resource-group-id=PROXY_RESOURCE_GROUP_ID
          --proxy-secret-id=PROXY_SECRET_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container azure node-pools delete

```text
NAME
    gcloud alpha container azure node-pools delete - delete a node pool in an
        Anthos cluster on Azure

SYNOPSIS
    gcloud alpha container azure node-pools delete
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--allow-missing]
        [--async] [--ignore-errors] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container azure node-pools describe

```text
NAME
    gcloud alpha container azure node-pools describe - describe a node pool in
        an Anthos cluster on Azure

SYNOPSIS
    gcloud alpha container azure node-pools describe
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container azure node-pools list

```text
NAME
    gcloud alpha container azure node-pools list - list node pools in an Anthos
        cluster on Azure

SYNOPSIS
    gcloud alpha container azure node-pools list
        (--cluster=CLUSTER : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container azure node-pools update

```text
NAME
    gcloud alpha container azure node-pools update - update a node pool in an
        Anthos cluster on Azure

SYNOPSIS
    gcloud alpha container azure node-pools update
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--async]
        [--enable-autorepair] [--node-version=NODE_VERSION]
        [--ssh-public-key=SSH_PUBLIC_KEY] [--validate-only]
        [--annotations=ANNOTATION,[ANNOTATION,...] | --clear-annotations]
        [--max-nodes=MAX_NODES --min-nodes=MIN_NODES] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud container azure node-pools create`: "Create a node pool in an Anthos cluster on Azure. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details."; `gcloud container azure node-pools delete`: "Delete a node pool in an Anthos cluster on Azure. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details."; `gcloud container azure node-pools describe`: "Describe a node pool in an Anthos cluster on Azure. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details."; `gcloud container azure node-pools list`: "List node pools in an Anthos cluster on Azure. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details."; `gcloud container azure node-pools update`: "Update a node pool in an Anthos cluster on Azure. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example omits `--max-pods-per-node` and the `--min-nodes` / `--max-nodes` pair, which the SYNOPSIS requires (gcloud 593.0.0: "Must be specified"); the runnable form adds sample values `--max-pods-per-node=110 --min-nodes=1 --max-nodes=3` (integers; choose your own).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/azure/node-pools (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
