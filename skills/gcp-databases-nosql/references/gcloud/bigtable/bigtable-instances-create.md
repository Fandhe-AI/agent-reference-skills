---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/create
---

# gcloud bigtable instances create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bigtable instances create

```text
NAME
    gcloud bigtable instances create - create a new Bigtable instance

SYNOPSIS
    gcloud bigtable instances create INSTANCE --display-name=DISPLAY_NAME
        [--async] [--cluster=CLUSTER]
        [--cluster-config=[id=ID,zone=ZONE,[nodes=NODES],
          [node-scaling-factor=NODE_SCALING_FACTOR],[kms-key=KMS_KEY],
          [autoscaling-min-nodes=AUTOSCALING_MIN_NODES,
          autoscaling-max-nodes=AUTOSCALING_MAX_NODES,
          autoscaling-cpu-target=AUTOSCALING_CPU_TARGET,
          autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET],...]]
        [--cluster-num-nodes=CLUSTER_NUM_NODES]
        [--cluster-storage-type=CLUSTER_STORAGE_TYPE; default="ssd"]
        [--cluster-zone=CLUSTER_ZONE] [--edition=EDITION]
        [--instance-type=INSTANCE_TYPE; default="PRODUCTION"]
        [--tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Bigtable instance.

EXAMPLES
    To create an instance with id my-instance-id with a cluster located in
    us-east1-c, run:

        $ gcloud bigtable instances create my-instance-id \
            --display-name="My Instance" \
            --cluster-config=id=my-cluster-id,zone=us-east1-c

    To create an instance with multiple clusters, run:

        $ gcloud bigtable instances create my-instance-id \
            --display-name="My Instance" \
            --cluster-config=id=my-cluster-id-1,zone=us-east1-c \
            --cluster-config=id=my-cluster-id-2,zone=us-west1-c,nodes=3

    To create an instance with HDD storage and 10 nodes, run:

        $ gcloud bigtable instances create my-hdd-instance \
            --display-name="HDD Instance" --cluster-storage-type=HDD \
            --cluster-config=id=my-cluster-id,zone=us-east1-c,nodes=10

    To create an instance with edition ENTERPRISE_PLUS, run:

        $ gcloud bigtable instances create my-enterprise-plus-instance \
            --display-name="Enterprise Plus Instance" \
            --edition=ENTERPRISE_PLUS \
            --cluster-config=id=my-cluster-id,zone=us-east1-c,nodes=1

POSITIONAL ARGUMENTS
     Instance resource - The instance to create. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

REQUIRED FLAGS
     --display-name=DISPLAY_NAME
        Friendly name of the instance.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --cluster=CLUSTER
        (DEPRECATED) ID of the cluster

        The --cluster argument is deprecated; use --cluster-config instead.

     --cluster-config=[id=ID,zone=ZONE,[nodes=NODES],[node-scaling-factor=NODE_SCALING_FACTOR],[kms-key=KMS_KEY],[autoscaling-min-nodes=AUTOSCALING_MIN_NODES,autoscaling-max-nodes=AUTOSCALING_MAX_NODES,autoscaling-cpu-target=AUTOSCALING_CPU_TARGET,autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET],...]
        Repeatable. Specify cluster config as a key-value dictionary.

        This is the recommended argument for specifying cluster configurations.

        Keys can be:

            *id*: Required. The ID of the cluster.

            *zone*: Required. ID of the zone where the cluster is located. Supported zones are listed at https://cloud.google.com/bigtable/docs/locations.

            *nodes*: The number of nodes in the cluster. Default=1.

            *node-scaling-factor*: The node scaling factor for the cluster. Default=node-scaling-factor-1x. NODE_SCALING_FACTOR must be one of: node-scaling-factor-1x, node-scaling-factor-2x.

            *kms-key*: The Cloud KMS (Key Management Service) cryptokey that will be used to protect the cluster.

            *autoscaling-min-nodes*: The minimum number of nodes for autoscaling.

            *autoscaling-max-nodes*: The maximum number of nodes for autoscaling.

            *autoscaling-cpu-target*: The target CPU utilization percentage for autoscaling. Accepted values are from 10 to 80.

            *autoscaling-storage-target*: The target storage utilization gibibytes per node for autoscaling. Accepted values are from 2560 to 5120 for SSD clusters and 8192 to 16384 for HDD clusters.

        If this argument is specified, the deprecated arguments for configuring
        a single cluster will be ignored, including --cluster, --cluster-zone,
        --cluster-num-nodes.

        See EXAMPLES section.

     --cluster-num-nodes=CLUSTER_NUM_NODES
        (DEPRECATED) Number of nodes to serve.

        The --cluster-num-nodes argument is deprecated; use --cluster-config
        instead.

     --cluster-storage-type=CLUSTER_STORAGE_TYPE; default="ssd"
        Storage class for the cluster. CLUSTER_STORAGE_TYPE must be one of:
        hdd, ssd.

     --cluster-zone=CLUSTER_ZONE
        (DEPRECATED) ID of the zone where the cluster is located. Supported
        zones are listed at https://cloud.google.com/bigtable/docs/locations.

        The --cluster-zone argument is deprecated; use --cluster-config
        instead.

     --edition=EDITION
        The edition of the instance. EDITION must be one of: ENTERPRISE,
        ENTERPRISE_PLUS.

     --instance-type=INSTANCE_TYPE; default="PRODUCTION"
        (DEPRECATED) The type of instance to create.

        The --instance-type argument is deprecated. DEVELOPMENT instances are
        no longer offered. All instances are of type PRODUCTION. INSTANCE_TYPE
        must be one of:

         DEVELOPMENT
            Development instances are low-cost instances meant for development
            and testing only. They do not provide high availability and no
            service level agreement applies.
         PRODUCTION
            Production instances provide high availability and are suitable for
            applications in production. Production instances created with the
            --instance-type argument have 3 nodes if a value is not provided
            for --cluster-num-nodes.

     --tags=[KEY=VALUE,...]
        List of tags KEY=VALUE pairs to bind. Each item must be specified in
        either ID <tag_key_id>=<tag_value_id> or namespace format
        <tag-key-namespaced-name>=<tag-value-short-name>. Example:
        123/environment=production,123/costCenter=marketing

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha bigtable instances create

        $ gcloud beta bigtable instances create
```

### gcloud beta bigtable instances create

```text
NAME
    gcloud beta bigtable instances create - create a new Bigtable instance

SYNOPSIS
    gcloud beta bigtable instances create INSTANCE --display-name=DISPLAY_NAME
        [--async] [--cluster=CLUSTER]
        [--cluster-config=[id=ID,zone=ZONE,[nodes=NODES],
          [node-scaling-factor=NODE_SCALING_FACTOR],[kms-key=KMS_KEY],
          [autoscaling-min-nodes=AUTOSCALING_MIN_NODES,
          autoscaling-max-nodes=AUTOSCALING_MAX_NODES,
          autoscaling-cpu-target=AUTOSCALING_CPU_TARGET,
          autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET],...]]
        [--cluster-num-nodes=CLUSTER_NUM_NODES]
        [--cluster-storage-type=CLUSTER_STORAGE_TYPE; default="ssd"]
        [--cluster-zone=CLUSTER_ZONE] [--edition=EDITION]
        [--instance-type=INSTANCE_TYPE; default="PRODUCTION"]
        [--tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable instances create

```text
NAME
    gcloud alpha bigtable instances create - create a new Bigtable instance

SYNOPSIS
    gcloud alpha bigtable instances create INSTANCE --display-name=DISPLAY_NAME
        [--async] [--cluster=CLUSTER]
        [--cluster-config=[id=ID,zone=ZONE,[nodes=NODES],
          [node-scaling-factor=NODE_SCALING_FACTOR],[kms-key=KMS_KEY],
          [autoscaling-min-nodes=AUTOSCALING_MIN_NODES,
          autoscaling-max-nodes=AUTOSCALING_MAX_NODES,
          autoscaling-cpu-target=AUTOSCALING_CPU_TARGET,
          autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET],...]]
        [--cluster-num-nodes=CLUSTER_NUM_NODES]
        [--cluster-storage-type=CLUSTER_STORAGE_TYPE; default="ssd"]
        [--cluster-zone=CLUSTER_ZONE] [--edition=EDITION]
        [--instance-type=INSTANCE_TYPE; default="PRODUCTION"]
        [--tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
