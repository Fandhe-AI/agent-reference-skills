---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/clusters
---

# gcloud bigtable clusters

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bigtable clusters create

```text
NAME
    gcloud bigtable clusters create - create a bigtable cluster

SYNOPSIS
    gcloud bigtable clusters create (CLUSTER : --instance=INSTANCE) --zone=ZONE
        [--async]
        [--node-scaling-factor=NODE_SCALING_FACTOR;
          default="node-scaling-factor-1x"]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [--num-nodes=NUM_NODES; default=3
          | [--autoscaling-cpu-target=AUTOSCALING_CPU_TARGET
          --autoscaling-max-nodes=AUTOSCALING_MAX_NODES
          --autoscaling-min-nodes=AUTOSCALING_MIN_NODES
          : --autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a bigtable cluster.

EXAMPLES
    To add a cluster in zone us-east1-c to the instance with id my-instance-id,
    run:

        $ gcloud bigtable clusters create my-cluster-id \
            --instance=my-instance-id --zone=us-east1-c

    To add a cluster with 10 nodes, run:

        $ gcloud bigtable clusters create my-cluster-id \
            --instance=my-instance-id --zone=us-east1-c --num-nodes=10

POSITIONAL ARGUMENTS
     Cluster resource - The cluster to describe. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Bigtable instance for the cluster.

          To set the instance attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

REQUIRED FLAGS
     --zone=ZONE
        ID of the zone where the cluster is located. Supported zones are listed
        at https://cloud.google.com/bigtable/docs/locations.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --node-scaling-factor=NODE_SCALING_FACTOR; default="node-scaling-factor-1x"
        Node scaling factor for the cluster. NODE_SCALING_FACTOR must be one
        of: node-scaling-factor-1x, node-scaling-factor-2x.

     Key resource - The Cloud KMS (Key Management Service) cryptokey that will
     be used to protect the cluster. The arguments in this group can be used to
     specify the attributes of this resource.

     --kms-key=KMS_KEY
        ID of the key or fully qualified identifier for the key.

        To set the kms-key attribute:
        * provide the argument --kms-key on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --kms-keyring=KMS_KEYRING
        The KMS keyring id of the key.

        To set the kms-keyring attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-keyring on the command line.

     --kms-location=KMS_LOCATION
        The Cloud location for the key.

        To set the kms-location attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-location on the command line.

     --kms-project=KMS_PROJECT
        The Cloud project id for the key.

        To set the kms-project attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-project on the command line.

     At most one of these can be specified:

       Manual Scaling

       --num-nodes=NUM_NODES; default=3
          Number of nodes to serve.

       Autoscaling

       --autoscaling-cpu-target=AUTOSCALING_CPU_TARGET
          The target CPU utilization percentage for autoscaling. Accepted
          values are from 10 to 80.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --autoscaling-max-nodes=AUTOSCALING_MAX_NODES
          The maximum number of nodes for autoscaling.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --autoscaling-min-nodes=AUTOSCALING_MIN_NODES
          The minimum number of nodes for autoscaling.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET
          The target storage utilization gibibytes per node for autoscaling.
          Accepted values are from 2560 to 5120 for SSD clusters and 8192 to
          16384 for HDD clusters.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha bigtable clusters create

        $ gcloud beta bigtable clusters create
```

### gcloud bigtable clusters delete

```text
NAME
    gcloud bigtable clusters delete - delete a bigtable cluster

SYNOPSIS
    gcloud bigtable clusters delete (CLUSTER : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a bigtable cluster.

EXAMPLES
    To delete a cluster, run:

        $ gcloud bigtable clusters delete my-cluster-id \
            --instance=my-instance-id

POSITIONAL ARGUMENTS
     Cluster resource - The cluster to delete. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Bigtable instance for the cluster.

          To set the instance attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha bigtable clusters delete

        $ gcloud beta bigtable clusters delete
```

### gcloud bigtable clusters describe

```text
NAME
    gcloud bigtable clusters describe - describe an existing Bigtable cluster

SYNOPSIS
    gcloud bigtable clusters describe (CLUSTER : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an existing Bigtable cluster.

EXAMPLES
    To view a cluster's description, run:

        $ gcloud bigtable clusters describe my-cluster-id \
            --instance=my-instance-id

POSITIONAL ARGUMENTS
     Cluster resource - The cluster to describe. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Bigtable instance for the cluster.

          To set the instance attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha bigtable clusters describe

        $ gcloud beta bigtable clusters describe
```

### gcloud bigtable clusters list

```text
NAME
    gcloud bigtable clusters list - list existing Bigtable clusters

SYNOPSIS
    gcloud bigtable clusters list [--instances=[INSTANCES,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List existing Bigtable clusters.

EXAMPLES
    To list all clusters in an instance, run:

        $ gcloud bigtable clusters list --instances=my-instance-id

    To list all clusters in multiple instances, run:

        $ gcloud bigtable clusters list \
            --instances=my-instance-id,my-other-instance-id

FLAGS
     Instance resource - The instances to list clusters for. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --instances on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --instances=[INSTANCES,...]
        IDs of the instances or fully qualified identifiers for the instances.

        To set the instance attribute:
        * provide the argument --instances on the command line.

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

        $ gcloud alpha bigtable clusters list

        $ gcloud beta bigtable clusters list
```

### gcloud bigtable clusters update

```text
NAME
    gcloud bigtable clusters update - update a Bigtable cluster's number of
        nodes

SYNOPSIS
    gcloud bigtable clusters update (CLUSTER : --instance=INSTANCE)
        (--autoscaling-cpu-target=AUTOSCALING_CPU_TARGET
          --autoscaling-max-nodes=AUTOSCALING_MAX_NODES
          --autoscaling-min-nodes=AUTOSCALING_MIN_NODES
          --autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET
          | [--num-nodes=NUM_NODES : --disable-autoscaling]) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Bigtable cluster's number of nodes.

EXAMPLES
    To update a cluster to 10 nodes, run:

        $ gcloud bigtable clusters update my-cluster-id \
            --instance=my-instance-id --num-nodes=10

POSITIONAL ARGUMENTS
     Cluster resource - The cluster to update. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Bigtable instance for the cluster.

          To set the instance attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

REQUIRED FLAGS
     Exactly one of these must be specified:

       Autoscaling

       --autoscaling-cpu-target=AUTOSCALING_CPU_TARGET
          The target CPU utilization percentage for autoscaling. Accepted
          values are from 10 to 80.

       --autoscaling-max-nodes=AUTOSCALING_MAX_NODES
          The maximum number of nodes for autoscaling.

       --autoscaling-min-nodes=AUTOSCALING_MIN_NODES
          The minimum number of nodes for autoscaling.

       --autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET
          The target storage utilization gibibytes per node for autoscaling.
          Accepted values are from 2560 to 5120 for SSD clusters and 8192 to
          16384 for HDD clusters.

       Manual Scaling

       --num-nodes=NUM_NODES
          Number of nodes to serve.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --disable-autoscaling
          Set this flag and --num-nodes to disable autoscaling. If autoscaling
          is currently not enabled, setting this flag does nothing.

OPTIONAL FLAGS
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

        $ gcloud alpha bigtable clusters update

        $ gcloud beta bigtable clusters update
```

### gcloud beta bigtable clusters create

```text
NAME
    gcloud beta bigtable clusters create - create a bigtable cluster

SYNOPSIS
    gcloud beta bigtable clusters create (CLUSTER : --instance=INSTANCE)
        --zone=ZONE [--async]
        [--node-scaling-factor=NODE_SCALING_FACTOR;
          default="node-scaling-factor-1x"]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [--num-nodes=NUM_NODES; default=3
          | [--autoscaling-cpu-target=AUTOSCALING_CPU_TARGET
          --autoscaling-max-nodes=AUTOSCALING_MAX_NODES
          --autoscaling-min-nodes=AUTOSCALING_MIN_NODES
          : --autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable clusters delete

```text
NAME
    gcloud beta bigtable clusters delete - delete a bigtable cluster

SYNOPSIS
    gcloud beta bigtable clusters delete (CLUSTER : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable clusters describe

```text
NAME
    gcloud beta bigtable clusters describe - describe an existing Bigtable
        cluster

SYNOPSIS
    gcloud beta bigtable clusters describe (CLUSTER : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable clusters list

```text
NAME
    gcloud beta bigtable clusters list - list existing Bigtable clusters

SYNOPSIS
    gcloud beta bigtable clusters list [--instances=[INSTANCES,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable clusters update

```text
NAME
    gcloud beta bigtable clusters update - update a Bigtable cluster's number
        of nodes

SYNOPSIS
    gcloud beta bigtable clusters update (CLUSTER : --instance=INSTANCE)
        (--autoscaling-cpu-target=AUTOSCALING_CPU_TARGET
          --autoscaling-max-nodes=AUTOSCALING_MAX_NODES
          --autoscaling-min-nodes=AUTOSCALING_MIN_NODES
          --autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET
          | [--num-nodes=NUM_NODES : --disable-autoscaling]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable clusters create

```text
NAME
    gcloud alpha bigtable clusters create - create a bigtable cluster

SYNOPSIS
    gcloud alpha bigtable clusters create (CLUSTER : --instance=INSTANCE)
        --zone=ZONE [--async]
        [--node-scaling-factor=NODE_SCALING_FACTOR;
          default="node-scaling-factor-1x"]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [--num-nodes=NUM_NODES; default=3
          | [--autoscaling-cpu-target=AUTOSCALING_CPU_TARGET
          --autoscaling-max-nodes=AUTOSCALING_MAX_NODES
          --autoscaling-min-nodes=AUTOSCALING_MIN_NODES
          : --autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable clusters delete

```text
NAME
    gcloud alpha bigtable clusters delete - delete a bigtable cluster

SYNOPSIS
    gcloud alpha bigtable clusters delete (CLUSTER : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable clusters describe

```text
NAME
    gcloud alpha bigtable clusters describe - describe an existing Bigtable
        cluster

SYNOPSIS
    gcloud alpha bigtable clusters describe (CLUSTER : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable clusters list

```text
NAME
    gcloud alpha bigtable clusters list - list existing Bigtable clusters

SYNOPSIS
    gcloud alpha bigtable clusters list [--instances=[INSTANCES,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable clusters update

```text
NAME
    gcloud alpha bigtable clusters update - update a Cloud Bigtable cluster's
        node count or scaling settings

SYNOPSIS
    gcloud alpha bigtable clusters update (CLUSTER : --instance=INSTANCE)
        (--autoscaling-cpu-target=AUTOSCALING_CPU_TARGET
          --autoscaling-max-nodes=AUTOSCALING_MAX_NODES
          --autoscaling-min-nodes=AUTOSCALING_MIN_NODES
          --autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET
          | [--num-nodes=NUM_NODES : --disable-autoscaling]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
