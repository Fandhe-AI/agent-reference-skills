---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/clusters/node-pools
---

# gcloud edge-cloud container clusters node-pools

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cloud container clusters node-pools create

```text
NAME
    gcloud edge-cloud container clusters node-pools create - create an Edge
        Container node pool

SYNOPSIS
    gcloud edge-cloud container clusters node-pools create
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        --node-count=NODE_COUNT --node-location=NODE_LOCATION [--async]
        [--labels=[KEY=VALUE,...]] [--local-disk-kms-key=LOCAL_DISK_KMS_KEY]
        [--lro-timeout=LRO_TIMEOUT] [--machine-filter=MACHINE_FILTER]
        [--node-labels=[KEY=VALUE,...]]
        [--node-storage-schema=NODE_STORAGE_SCHEMA] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an Edge Container node pool.

EXAMPLES
    To create a node pool called my-nodePool, containing 3 nodes in region
    us-central1, run:

        $ gcloud edge-cloud container clusters node-pools create \
            my-nodePool --cluster=<my-cluster> --location=us-central1 \
            --node-location=<my-node-location> --node-count=3

    To create a node pool called my-nodePool, containing 3 nodes in region
    us-central1, using only machine names matching a specific pattern, run:

        $ gcloud edge-cloud container clusters node-pools create \
            my-nodePool --cluster=<my-cluster> --location=us-central1 \
            --node-location=<my-node-location> --node-count=3 \
            --machine-filter="name:<name>"

    To create a node pool called my-nodePool, containing 3 nodes in region
    us-central1, using only machine names NOT matching a specific pattern, run:

        $ gcloud edge-cloud container clusters node-pools create \
            my-nodePool --cluster=<my-cluster> --location=us-central1 \
            --node-location=<my-node-location> --node-count=3 \
            --machine-filter="NOT name:<name>"

POSITIONAL ARGUMENTS
     Node pool resource - Edge Container node pool to create. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument node_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_POOL
          ID of the node pool or fully qualified identifier for the node pool.

          To set the nodePool attribute:
          + provide the argument node_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          Cluster of the node pool.

          To set the cluster attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          Google Cloud location for the node pool.

          To set the location attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --node-count=NODE_COUNT
        Default nodeCount used by this node pool.

     --node-location=NODE_LOCATION
        Google Edge Cloud zone where nodes in this node pool will be created.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --local-disk-kms-key=LOCAL_DISK_KMS_KEY
        Google Cloud KMS key that will be used to secure local disks on nodes
        in this node pool. The Edge Container service account for this project
        must have roles/cloudkms.cryptoKeyEncrypterDecrypter on the key.

        If not provided, a Google-managed key will be used instead.

     --lro-timeout=LRO_TIMEOUT
        Overwrite the default LRO maximum timeout.

     --machine-filter=MACHINE_FILTER
        Only machines matching this filter will be allowed to join the node
        pool. The filtering language accepts strings like "name=<name>", and is
        documented in more detail at https://google.aip.dev/160.

     --node-labels=[KEY=VALUE,...]
        Comma-delimited list of key-value pairs that comprise labels for the
        individual nodes in the node pool. This flag sets the Kubernetes
        labels, unlike --labels which sets the cloud resource labels.

     --node-storage-schema=NODE_STORAGE_SCHEMA
        Name for the storage schema of worker nodes.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud container clusters node-pools create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud edge-cloud container clusters node-pools create my-nodePool \
    --cluster=MY_CLUSTER \
    --location=us-central1 \
    --node-location=MY_NODE_LOCATION \
    --node-count=3

gcloud edge-cloud container clusters node-pools create my-nodePool \
    --cluster=MY_CLUSTER \
    --location=us-central1 \
    --node-location=MY_NODE_LOCATION \
    --node-count=3 \
    --machine-filter="name:NAME"

gcloud edge-cloud container clusters node-pools create my-nodePool \
    --cluster=MY_CLUSTER \
    --location=us-central1 \
    --node-location=MY_NODE_LOCATION \
    --node-count=3 \
    --machine-filter="NOT name:NAME"
```

### gcloud edge-cloud container clusters node-pools delete

```text
NAME
    gcloud edge-cloud container clusters node-pools delete - delete an Edge
        Container nodePool

SYNOPSIS
    gcloud edge-cloud container clusters node-pools delete
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Edge Container nodePool.

EXAMPLES
    To delete a nodePool called 'my-nodePool' in region us-central1, run:

        $ gcloud edge-cloud container clusters node-pools delete \
            my-nodePool --cluster=<my-cluster> --location=us-central1

POSITIONAL ARGUMENTS
     Node pool resource - Edge Container nodePool to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument node_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_POOL
          ID of the node pool or fully qualified identifier for the node pool.

          To set the node_pool attribute:
          + provide the argument node_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          Kubernetes cluster.

          To set the cluster attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property edge_container/location.

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

API REFERENCE
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud container clusters node-pools delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud edge-cloud container clusters node-pools delete my-nodePool \
    --cluster=MY_CLUSTER \
    --location=us-central1
```

### gcloud edge-cloud container clusters node-pools describe

```text
NAME
    gcloud edge-cloud container clusters node-pools describe - show details
        about the nodePool

SYNOPSIS
    gcloud edge-cloud container clusters node-pools describe
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about the nodePool.

EXAMPLES
    To show details about a node pool called 'my-nodePool' in region
    us-central1, run:

        $ gcloud edge-cloud container clusters node-pools describe \
            my-nodePool --location=us-central1 --cluster=<my-cluster>

POSITIONAL ARGUMENTS
     Node pool resource - The nodePool you want to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument node_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_POOL
          ID of the node pool or fully qualified identifier for the node pool.

          To set the node_pool attribute:
          + provide the argument node_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          Kubernetes cluster.

          To set the cluster attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property edge_container/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud container clusters node-pools describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud edge-cloud container clusters node-pools describe my-nodePool \
    --location=us-central1 \
    --cluster=MY_CLUSTER
```

### gcloud edge-cloud container clusters node-pools list

```text
NAME
    gcloud edge-cloud container clusters node-pools list - list Edge Container
        nodePools

SYNOPSIS
    gcloud edge-cloud container clusters node-pools list
        [--cluster=CLUSTER --location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Edge Container nodePools.

EXAMPLES
    To list the nodePools in region us-central1, run:

        $ gcloud edge-cloud container clusters node-pools list \
            --location=us-central1 --cluster=<my-cluster>

FLAGS
     Cluster resource - Parent Edge Container location to list all contained
     Edge Container nodePools. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --cluster on the command line with a fully
        specified name;
      * provide the argument --cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --cluster=CLUSTER
        ID of the cluster or fully qualified identifier for the cluster.

        To set the cluster attribute:
        * provide the argument --cluster on the command line;
        * provide the argument --cluster on the command line.

     --location=LOCATION
        The global location name.

        To set the location attribute:
        * provide the argument --cluster on the command line with a fully
          specified name;
        * provide the argument --cluster on the command line with a fully
          specified name;
        * provide the argument --location on the command line;
        * set the property edge_container/location.

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

API REFERENCE
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud container clusters node-pools list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud edge-cloud container clusters node-pools list \
    --location=us-central1 \
    --cluster=MY_CLUSTER
```

### gcloud edge-cloud container clusters node-pools update

```text
NAME
    gcloud edge-cloud container clusters node-pools update - updates an Edge
        Container node pool

SYNOPSIS
    gcloud edge-cloud container clusters node-pools update
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--async]
        [--local-disk-kms-key=LOCAL_DISK_KMS_KEY] [--lro-timeout=LRO_TIMEOUT]
        [--machine-filter=MACHINE_FILTER] [--node-count=NODE_COUNT]
        [--node-labels=[KEY=VALUE,...]] [--update-labels=[KEY=VALUE,...]]
        [--use-google-managed-key] [--clear-labels | --remove-labels=[KEY,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates an Edge Container node pool.

EXAMPLES
    To update the number of nodes in a node pool called my-node-pool in region
    us-central1, run:

        $ gcloud edge-cloud container clusters node-pools update \
            my-node-pool --location=us-central1 --cluster=<my-cluster> \
            --node-count=<new-count>

POSITIONAL ARGUMENTS
     Node pool resource - Edge Container node pool to update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument node_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NODE_POOL
          ID of the node pool or fully qualified identifier for the node pool.

          To set the nodePool attribute:
          + provide the argument node_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          Cluster of the node pool.

          To set the cluster attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          Google Cloud location for the node pool.

          To set the location attribute:
          + provide the argument node_pool on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --local-disk-kms-key=LOCAL_DISK_KMS_KEY
        Google Cloud KMS key that will be used to secure local disks on nodes
        in this node pool. The Edge Container service account for this project
        must have roles/cloudkms.cryptoKeyEncrypterDecrypter on the key.

        If not provided, a Google-managed key will be used instead.

     --lro-timeout=LRO_TIMEOUT
        Overwrite the default LRO maximum timeout.

     --machine-filter=MACHINE_FILTER
        Only machines matching this filter will be allowed to join the node
        pool. The filtering language accepts strings like "name=<name>", and is
        documented in more detail at https://google.aip.dev/160.

     --node-count=NODE_COUNT
        Default nodeCount used by this node pool.

     --node-labels=[KEY=VALUE,...]
        Comma-delimited list of key-value pairs that comprise labels for the
        individual nodes in the node pool. This flag updates the Kubernetes
        labels, unlike --update-labels, --remove-labels, and --clear-labels
        which update the cloud resource labels.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --use-google-managed-key
        Once specified, a Google-managed key will be used for the control plane
        disk encryption.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud edge-cloud container clusters node-pools update \
                --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud edge-cloud container clusters node-pools update \
                --clear-labels --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud container clusters node-pools update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud edge-cloud container clusters node-pools update my-node-pool \
    --location=us-central1 \
    --cluster=MY_CLUSTER \
    --node-count=NEW_COUNT
```

### gcloud alpha edge-cloud container clusters node-pools create

```text
NAME
    gcloud alpha edge-cloud container clusters node-pools create - create an
        Edge Container node pool

SYNOPSIS
    gcloud alpha edge-cloud container clusters node-pools create
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        --node-count=NODE_COUNT --node-location=NODE_LOCATION [--async]
        [--labels=[KEY=VALUE,...]] [--local-disk-kms-key=LOCAL_DISK_KMS_KEY]
        [--lro-timeout=LRO_TIMEOUT] [--machine-filter=MACHINE_FILTER]
        [--node-labels=[KEY=VALUE,...]]
        [--node-storage-schema=NODE_STORAGE_SCHEMA] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud container clusters node-pools delete

```text
NAME
    gcloud alpha edge-cloud container clusters node-pools delete - delete an
        Edge Container nodePool

SYNOPSIS
    gcloud alpha edge-cloud container clusters node-pools delete
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud container clusters node-pools describe

```text
NAME
    gcloud alpha edge-cloud container clusters node-pools describe - show
        details about the nodePool

SYNOPSIS
    gcloud alpha edge-cloud container clusters node-pools describe
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud container clusters node-pools list

```text
NAME
    gcloud alpha edge-cloud container clusters node-pools list - list Edge
        Container nodePools

SYNOPSIS
    gcloud alpha edge-cloud container clusters node-pools list
        [--cluster=CLUSTER --location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud container clusters node-pools update

```text
NAME
    gcloud alpha edge-cloud container clusters node-pools update - updates an
        Edge Container node pool

SYNOPSIS
    gcloud alpha edge-cloud container clusters node-pools update
        (NODE_POOL : --cluster=CLUSTER --location=LOCATION) [--async]
        [--local-disk-kms-key=LOCAL_DISK_KMS_KEY] [--lro-timeout=LRO_TIMEOUT]
        [--machine-filter=MACHINE_FILTER] [--node-count=NODE_COUNT]
        [--node-labels=[KEY=VALUE,...]] [--update-labels=[KEY=VALUE,...]]
        [--use-google-managed-key] [--clear-labels | --remove-labels=[KEY,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/clusters/node-pools (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
