---
source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/instance-partitions
---

# gcloud spanner instance-partitions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud spanner instance-partitions create

```text
NAME
    gcloud spanner instance-partitions create - create a Spanner instance
        partition

SYNOPSIS
    gcloud spanner instance-partitions create
        (INSTANCE_PARTITION : --instance=INSTANCE) --config=CONFIG
        --description=DESCRIPTION [--async]
        [--nodes=NODES | --processing-units=PROCESSING_UNITS
          | --autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET
          (--autoscaling-high-priority-cpu-target=AUTOSCALING_HIGH_PRIORITY_CPU_TARGET --autoscaling-total-cpu-target=AUTOSCALING_TOTAL_CPU_TARGET) (--autoscaling-max-nodes=AUTOSCALING_MAX_NODES --autoscaling-min-nodes=AUTOSCALING_MIN_NODES | --autoscaling-max-processing-units=AUTOSCALING_MAX_PROCESSING_UNITS --autoscaling-min-processing-units=AUTOSCALING_MIN_PROCESSING_UNITS)]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Spanner instance partition.

EXAMPLES
    To create a Spanner instance partition, run:

        $ gcloud spanner instance-partitions create \
            my-instance-partition-id --instance=my-instance-id \
            --config=regional-us-east1 \
            --description=my-instance-display-name --nodes=3

POSITIONAL ARGUMENTS
     Instance partition resource - The Spanner instance partition to create.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument instance_partition on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE_PARTITION
          ID of the instance partition or fully qualified identifier for the
          instance partition.

          To set the instance partition attribute:
          + provide the argument instance_partition on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The Cloud Spanner instance for the instance partition.

          To set the instance attribute:
          + provide the argument instance_partition on the command line with
            a fully specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

REQUIRED FLAGS
     --config=CONFIG
        Instance configuration defines the geographic placement and replication
        used by the instance partition. Available configurations can be found
        by running "gcloud spanner instance-configs list"

     --description=DESCRIPTION
        Description of the instance partition.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     At most one of these can be specified:

       --nodes=NODES
          Number of nodes for the instance partition.

       --processing-units=PROCESSING_UNITS
          Number of processing units for the instance partition.

       Or at least one of these can be specified:

         Autoscaling

         --autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET
            Specifies the target percentage of storage the autoscaled instance
            can utilize.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         Autoscaling CPU targets.

         At least one of these must be specified:

           --autoscaling-high-priority-cpu-target=AUTOSCALING_HIGH_PRIORITY_CPU_TARGET
              Specifies the target percentage of high-priority CPU the
              autoscaled instance can utilize.

           --autoscaling-total-cpu-target=AUTOSCALING_TOTAL_CPU_TARGET
              Specifies the target percentage of total CPU the autoscaled
              instance can utilize.

         Autoscaling limits can be defined in either nodes or processing units.

         Exactly one of these must be specified:

           Autoscaling limits in nodes:

           --autoscaling-max-nodes=AUTOSCALING_MAX_NODES
              Maximum number of nodes for the autoscaled instance.

              This flag argument must be specified if any of the other
              arguments in this group are specified.

           --autoscaling-min-nodes=AUTOSCALING_MIN_NODES
              Minimum number of nodes for the autoscaled instance.

              This flag argument must be specified if any of the other
              arguments in this group are specified.

           Autoscaling limits in processing units:

           --autoscaling-max-processing-units=AUTOSCALING_MAX_PROCESSING_UNITS
              Maximum number of processing units for the autoscaled instance.

              This flag argument must be specified if any of the other
              arguments in this group are specified.

           --autoscaling-min-processing-units=AUTOSCALING_MIN_PROCESSING_UNITS
              Minimum number of processing units for the autoscaled instance.

              This flag argument must be specified if any of the other
              arguments in this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner instance-partitions create

        $ gcloud beta spanner instance-partitions create
```

### gcloud spanner instance-partitions delete

```text
NAME
    gcloud spanner instance-partitions delete - delete a Spanner instance
        partition. You can't delete the default instance partition using this
        command

SYNOPSIS
    gcloud spanner instance-partitions delete
        (INSTANCE_PARTITION : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Spanner instance partition. You can't delete the default instance
    partition using this command.

EXAMPLES
    To delete a Spanner instance partition, run:

        $ gcloud spanner instance-partitions delete \
            my-instance-partition-id --instance=my-instance-id

POSITIONAL ARGUMENTS
     Instance partition resource - The Spanner instance partition to delete.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument instance_partition on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE_PARTITION
          ID of the instance partition or fully qualified identifier for the
          instance partition.

          To set the instance partition attribute:
          + provide the argument instance_partition on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The Cloud Spanner instance for the instance partition.

          To set the instance attribute:
          + provide the argument instance_partition on the command line with
            a fully specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner instance-partitions delete

        $ gcloud beta spanner instance-partitions delete
```

### gcloud spanner instance-partitions describe

```text
NAME
    gcloud spanner instance-partitions describe - describe a Spanner instance
        partition

SYNOPSIS
    gcloud spanner instance-partitions describe
        (INSTANCE_PARTITION : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Spanner instance partition.

EXAMPLES
    To describe a Spanner instance partition, run:

        $ gcloud spanner instance-partitions describe \
            my-instance-partition-id --instance=my-instance-id

POSITIONAL ARGUMENTS
     Instance partition resource - The Spanner instance partition to describe.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument instance_partition on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE_PARTITION
          ID of the instance partition or fully qualified identifier for the
          instance partition.

          To set the instance partition attribute:
          + provide the argument instance_partition on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The Cloud Spanner instance for the instance partition.

          To set the instance attribute:
          + provide the argument instance_partition on the command line with
            a fully specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner instance-partitions describe

        $ gcloud beta spanner instance-partitions describe
```

### gcloud spanner instance-partitions list

```text
NAME
    gcloud spanner instance-partitions list - list the Spanner instance
        partitions contained within the given instance

SYNOPSIS
    gcloud spanner instance-partitions list [--instance=INSTANCE]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the Spanner instance partitions contained within the given instance.

EXAMPLES
    To list all Spanner instances partitions in an instance, run:

        $ gcloud spanner instance-partitions list --instance=my-instance-id

FLAGS
     Instance resource - The Cloud Spanner instance in which to list instance
     partitions. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --instance on the command line with a fully
        specified name;
      * set the property spanner/instance with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --instance=INSTANCE
        ID of the instance or fully qualified identifier for the instance.

        To set the instance attribute:
        * provide the argument --instance on the command line;
        * set the property spanner/instance.

LIST COMMAND FLAGS
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

        $ gcloud alpha spanner instance-partitions list

        $ gcloud beta spanner instance-partitions list
```

### gcloud spanner instance-partitions update

```text
NAME
    gcloud spanner instance-partitions update - update a Spanner instance
        partition. You can't update the default instance partition using this
        command

SYNOPSIS
    gcloud spanner instance-partitions update
        (INSTANCE_PARTITION : --instance=INSTANCE) [--async]
        [--description=DESCRIPTION]
        [--nodes=NODES | --processing-units=PROCESSING_UNITS
          | --autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET
          --autoscaling-high-priority-cpu-target=AUTOSCALING_HIGH_PRIORITY_CPU_TARGET --autoscaling-total-cpu-target=AUTOSCALING_TOTAL_CPU_TARGET --autoscaling-max-nodes=AUTOSCALING_MAX_NODES --autoscaling-min-nodes=AUTOSCALING_MIN_NODES | --autoscaling-max-processing-units=AUTOSCALING_MAX_PROCESSING_UNITS --autoscaling-min-processing-units=AUTOSCALING_MIN_PROCESSING_UNITS]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Spanner instance partition. You can't update the default instance
    partition using this command.

EXAMPLES
    To update the display name of a Spanner instance partition, run:

        $ gcloud spanner instance-partitions update \
            my-instance-partition-id --instance=my-instance-id \
            --description=my-new-display-name

    To update the node count of a Spanner instance partition, run:

        $ gcloud spanner instance-partitions update \
            my-instance-partition-id --instance=my-instance-id --nodes=1

POSITIONAL ARGUMENTS
     Instance partition resource - The Spanner instance partition to update.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument instance_partition on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE_PARTITION
          ID of the instance partition or fully qualified identifier for the
          instance partition.

          To set the instance partition attribute:
          + provide the argument instance_partition on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The Cloud Spanner instance for the instance partition.

          To set the instance attribute:
          + provide the argument instance_partition on the command line with
            a fully specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the instance partition.

     At most one of these can be specified:

       --nodes=NODES
          Number of nodes for the instance partition.

       --processing-units=PROCESSING_UNITS
          Number of processing units for the instance partition.

       Or at least one of these can be specified:

         Autoscaling

         --autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET
            Specifies the target percentage of storage the autoscaled instance
            can utilize.

         Autoscaling CPU targets.

         --autoscaling-high-priority-cpu-target=AUTOSCALING_HIGH_PRIORITY_CPU_TARGET
            Specifies the target percentage of high-priority CPU the autoscaled
            instance can utilize.

         --autoscaling-total-cpu-target=AUTOSCALING_TOTAL_CPU_TARGET
            Specifies the target percentage of total CPU the autoscaled
            instance can utilize.

         Autoscaling limits can be defined in either nodes or processing units.

         At most one of these can be specified:

           Autoscaling limits in nodes:

           --autoscaling-max-nodes=AUTOSCALING_MAX_NODES
              Maximum number of nodes for the autoscaled instance.

           --autoscaling-min-nodes=AUTOSCALING_MIN_NODES
              Minimum number of nodes for the autoscaled instance.

           Autoscaling limits in processing units:

           --autoscaling-max-processing-units=AUTOSCALING_MAX_PROCESSING_UNITS
              Maximum number of processing units for the autoscaled instance.

           --autoscaling-min-processing-units=AUTOSCALING_MIN_PROCESSING_UNITS
              Minimum number of processing units for the autoscaled instance.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner instance-partitions update

        $ gcloud beta spanner instance-partitions update
```

### gcloud beta spanner instance-partitions create

```text
NAME
    gcloud beta spanner instance-partitions create - create a Spanner instance
        partition

SYNOPSIS
    gcloud beta spanner instance-partitions create
        (INSTANCE_PARTITION : --instance=INSTANCE) --config=CONFIG
        --description=DESCRIPTION [--async]
        [--nodes=NODES | --processing-units=PROCESSING_UNITS
          | --autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET
          (--autoscaling-high-priority-cpu-target=AUTOSCALING_HIGH_PRIORITY_CPU_TARGET --autoscaling-total-cpu-target=AUTOSCALING_TOTAL_CPU_TARGET) (--autoscaling-max-nodes=AUTOSCALING_MAX_NODES --autoscaling-min-nodes=AUTOSCALING_MIN_NODES | --autoscaling-max-processing-units=AUTOSCALING_MAX_PROCESSING_UNITS --autoscaling-min-processing-units=AUTOSCALING_MIN_PROCESSING_UNITS)]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner instance-partitions delete

```text
NAME
    gcloud beta spanner instance-partitions delete - delete a Spanner instance
        partition. You can't delete the default instance partition using this
        command

SYNOPSIS
    gcloud beta spanner instance-partitions delete
        (INSTANCE_PARTITION : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner instance-partitions describe

```text
NAME
    gcloud beta spanner instance-partitions describe - describe a Spanner
        instance partition

SYNOPSIS
    gcloud beta spanner instance-partitions describe
        (INSTANCE_PARTITION : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner instance-partitions list

```text
NAME
    gcloud beta spanner instance-partitions list - list the Spanner instance
        partitions contained within the given instance

SYNOPSIS
    gcloud beta spanner instance-partitions list [--instance=INSTANCE]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner instance-partitions update

```text
NAME
    gcloud beta spanner instance-partitions update - update a Spanner instance
        partition. You can't update the default instance partition using this
        command

SYNOPSIS
    gcloud beta spanner instance-partitions update
        (INSTANCE_PARTITION : --instance=INSTANCE) [--async]
        [--description=DESCRIPTION]
        [--nodes=NODES | --processing-units=PROCESSING_UNITS
          | --autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET
          --autoscaling-high-priority-cpu-target=AUTOSCALING_HIGH_PRIORITY_CPU_TARGET --autoscaling-total-cpu-target=AUTOSCALING_TOTAL_CPU_TARGET --autoscaling-max-nodes=AUTOSCALING_MAX_NODES --autoscaling-min-nodes=AUTOSCALING_MIN_NODES | --autoscaling-max-processing-units=AUTOSCALING_MAX_PROCESSING_UNITS --autoscaling-min-processing-units=AUTOSCALING_MIN_PROCESSING_UNITS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner instance-partitions create

```text
NAME
    gcloud alpha spanner instance-partitions create - create a Spanner instance
        partition

SYNOPSIS
    gcloud alpha spanner instance-partitions create
        (INSTANCE_PARTITION : --instance=INSTANCE) --config=CONFIG
        --description=DESCRIPTION [--async]
        [--nodes=NODES | --processing-units=PROCESSING_UNITS
          | --autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET
          (--autoscaling-high-priority-cpu-target=AUTOSCALING_HIGH_PRIORITY_CPU_TARGET --autoscaling-total-cpu-target=AUTOSCALING_TOTAL_CPU_TARGET) (--autoscaling-max-nodes=AUTOSCALING_MAX_NODES --autoscaling-min-nodes=AUTOSCALING_MIN_NODES | --autoscaling-max-processing-units=AUTOSCALING_MAX_PROCESSING_UNITS --autoscaling-min-processing-units=AUTOSCALING_MIN_PROCESSING_UNITS)]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner instance-partitions delete

```text
NAME
    gcloud alpha spanner instance-partitions delete - delete a Spanner instance
        partition. You can't delete the default instance partition using this
        command

SYNOPSIS
    gcloud alpha spanner instance-partitions delete
        (INSTANCE_PARTITION : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner instance-partitions describe

```text
NAME
    gcloud alpha spanner instance-partitions describe - describe a Spanner
        instance partition

SYNOPSIS
    gcloud alpha spanner instance-partitions describe
        (INSTANCE_PARTITION : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner instance-partitions list

```text
NAME
    gcloud alpha spanner instance-partitions list - list the Spanner instance
        partitions contained within the given instance

SYNOPSIS
    gcloud alpha spanner instance-partitions list [--instance=INSTANCE]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner instance-partitions update

```text
NAME
    gcloud alpha spanner instance-partitions update - update a Spanner instance
        partition. You can't update the default instance partition using this
        command

SYNOPSIS
    gcloud alpha spanner instance-partitions update
        (INSTANCE_PARTITION : --instance=INSTANCE) [--async]
        [--description=DESCRIPTION]
        [--nodes=NODES | --processing-units=PROCESSING_UNITS
          | --autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET
          --autoscaling-high-priority-cpu-target=AUTOSCALING_HIGH_PRIORITY_CPU_TARGET --autoscaling-total-cpu-target=AUTOSCALING_TOTAL_CPU_TARGET --autoscaling-max-nodes=AUTOSCALING_MAX_NODES --autoscaling-min-nodes=AUTOSCALING_MIN_NODES | --autoscaling-max-processing-units=AUTOSCALING_MAX_PROCESSING_UNITS --autoscaling-min-processing-units=AUTOSCALING_MIN_PROCESSING_UNITS]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/instance-partitions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
