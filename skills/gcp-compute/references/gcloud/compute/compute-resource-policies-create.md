---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/resource-policies/create
---

# gcloud compute resource-policies create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute resource-policies create disk-consistency-group

```text
NAME
    gcloud compute resource-policies create disk-consistency-group - create a
        Compute Engine Disk Consistency Group resource policy

SYNOPSIS
    gcloud compute resource-policies create disk-consistency-group NAME
        [--description=DESCRIPTION] [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Compute Engine disk consistency group resource policy.

EXAMPLES
    Create a disk consistency group policy:

        $ gcloud compute resource-policies create disk-consistency-group \
            my-resource-policy --region=REGION

POSITIONAL ARGUMENTS
     NAME
        Name of the resource policy to operate on.

FLAGS
     --description=DESCRIPTION
        An optional, textual description for the backend.

     --region=REGION
        Region of the resource policy to operate on. If not specified, you
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

        $ gcloud alpha compute resource-policies create \
            disk-consistency-group

        $ gcloud beta compute resource-policies create disk-consistency-group
```

### gcloud compute resource-policies create group-placement

```text
NAME
    gcloud compute resource-policies create group-placement - create a Compute
        Engine group placement resource policy

SYNOPSIS
    gcloud compute resource-policies create group-placement NAME
        [--accelerator-topology-mode=ACCELERATOR_TOPOLOGY_MODE]
        [--availability-domain-count=AVAILABILITY_DOMAIN_COUNT]
        [--collocation=COLLOCATION] [--description=DESCRIPTION]
        [--gpu-topology=GPU_TOPOLOGY] [--region=REGION] [--vm-count=VM_COUNT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Compute Engine Group Placement Resource Policy.

EXAMPLES
    To create a Compute Engine group placement policy with two availability
    domains, run:        $ gcloud compute resource-policies create group-placement \
            my-resource-policy --region=REGION --availability-domain-count=2

POSITIONAL ARGUMENTS
     NAME
        Name of the resource policy to operate on.

FLAGS
     --accelerator-topology-mode=ACCELERATOR_TOPOLOGY_MODE
        Defines the accelerator connection strategy for accelerator machine
        types like TPUs. ACCELERATOR_TOPOLOGY_MODE must be one of:

         AUTO_CONNECT
            This creates a static, pre-formed accelerator topology.
         PROVISION_ONLY
            The interconnected chips are connected on demand. At the time of VM
            creation, the chips are not connected.

     --availability-domain-count=AVAILABILITY_DOMAIN_COUNT
        Number of availability domain in the group placement policy.

     --collocation=COLLOCATION
        Collocation specifies whether to place VMs inside the sameavailability
        domain on the same low-latency network. COLLOCATION must be one of:

         collocated
            Low network latency between more VMs placed on the same
            availability domain.
         unspecified-collocation
            Unspecified network latency between VMs placed on the same
            availability domain. This is the default behavior.

     --description=DESCRIPTION
        An optional, textual description for the backend.

     --gpu-topology=GPU_TOPOLOGY
        Specifies the shape of the GPU slice, in slice based GPU families eg.
        A4X.

     --region=REGION
        Region of the resource policy to operate on. If not specified, you
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

     --vm-count=VM_COUNT
        Number of instances targeted by the group placement policy. Google does
        not recommend that you use this flag unless you use a compact policy
        and you want your policy to work only if it contains this exact number
        of VMs.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute resource-policies create group-placement

        $ gcloud beta compute resource-policies create group-placement
```

### gcloud compute resource-policies create instance-schedule

```text
NAME
    gcloud compute resource-policies create instance-schedule - create a
        Compute Engine instance schedule resource policy

SYNOPSIS
    gcloud compute resource-policies create instance-schedule NAME
        [--description=DESCRIPTION] [--end-date=END_DATE]
        [--initiation-date=INITIATION_DATE] [--region=REGION]
        [--timezone=TIMEZONE] [--vm-start-schedule=VM_START_SCHEDULE]
        [--vm-stop-schedule=VM_STOP_SCHEDULE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Compute Engine instance schedule resource policy.

EXAMPLES
    To create an instance schedule resource policy that has a daily start
    operation at 8 AM and a daily stop operation at 5 PM for the UTC timezone,
    run:

        $ gcloud compute resource-policies create instance-schedule \
            my-resource-policy --description="daily policy" \
            --vm-start-schedule="0 8 * * *" \
            --vm-stop-schedule="0 17 * * *" --timezone="UTC" --region=REGION

    Use the initiation date and end date to limit when the policy is active. To
    create an instance schedule resource policy with initiation and end dates,
    run:

        $ gcloud compute resource-policies create instance-schedule \
            my-resource-policy --description="limited daily policy" \
            --vm-start-schedule="0 8 * * *" \
            --vm-stop-schedule="0 17 * * *" --timezone="UTC" \
            --region=REGION --initiation-date="2021-01-01T00:00:00.000Z" \
            --end-date="2021-02-01T00:00:00.000Z"

POSITIONAL ARGUMENTS
     NAME
        Name of the resource policy to operate on.

FLAGS
     --description=DESCRIPTION
        An optional, textual description for the backend.

     --end-date=END_DATE
        The expiration time of the schedule policy. The timestamp must be an
        RFC3339 valid string.

     --initiation-date=INITIATION_DATE
        The start time of the schedule policy. The timestamp must be an RFC3339
        valid string.

     --region=REGION
        Region of the resource policy to operate on. If not specified, you
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

     --timezone=TIMEZONE
        Timezone used in interpreting schedule. The value of this field must be
        a time zone name from the tz database
        http://en.wikipedia.org/wiki/Tz_database

     --vm-start-schedule=VM_START_SCHEDULE
        Schedule for starting the instance, specified using standard CRON
        format.

     --vm-stop-schedule=VM_STOP_SCHEDULE
        Schedule for stopping the instance, specified using standard CRON
        format.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute resource-policies create instance-schedule

        $ gcloud beta compute resource-policies create instance-schedule
```

### gcloud compute resource-policies create snapshot-schedule

```text
NAME
    gcloud compute resource-policies create snapshot-schedule - create a
        Compute Engine Snapshot Schedule Resource Policy

SYNOPSIS
    gcloud compute resource-policies create snapshot-schedule NAME
        --max-retention-days=MAX_RETENTION_DAYS
        (--weekly-schedule-from-file=PATH_TO_FILE
          | --start-time=START_TIME (--daily-schedule | --hourly-schedule=HOURS
          | --weekly-schedule=WEEKLY_CYCLE)) [--description=DESCRIPTION]
        [--on-source-disk-delete=ON_SOURCE_DISK_DELETE] [--region=REGION]
        [--guest-flush
          --snapshot-labels=[KEY=VALUE,...] --storage-location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Compute Engine Snapshot Schedule Resource Policy.

EXAMPLES
    The following command creates a Compute Engine Snapshot Schedule Resource
    Policy with a daily snapshot taken at 13:00Z and a one day snapshot
    retention policy.

        $ gcloud compute resource-policies create snapshot-schedule \
            my-resource-policy --region=REGION --start-time=13:00 \
            --daily-schedule --max-retention-days=1

POSITIONAL ARGUMENTS
     NAME
        Name of the resource policy to operate on.

REQUIRED FLAGS
     --max-retention-days=MAX_RETENTION_DAYS
        Maximum number of days snapshot can be retained.

     Cycle Frequency Group.

     Exactly one of these must be specified:

       Using a file:

       --weekly-schedule-from-file=PATH_TO_FILE
          A JSON/YAML file which specifies a weekly schedule. The file should
          contain the following fields:

          day: Day of the week with the same choices as --weekly-schedule.
          startTime: Start time of the snapshot schedule with the same format
          as --start-time.

          For more information about using a file, see
          https://cloud.google.com/compute/docs/disks/scheduled-snapshots#create_snapshot_schedule.

          Use a full or relative path to a local file containing the value of
          weekly_schedule.

       Using command flags:

       --start-time=START_TIME
          Start time for the disk snapshot schedule in UTC. For example,
          --start-time="15:00".

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       Exactly one of these must be specified:

         --daily-schedule
            Snapshot schedule starts daily at START_TIME.

         --hourly-schedule=HOURS
            Snapshot schedule occurs every n hours starting at START_TIME.

         --weekly-schedule=WEEKLY_CYCLE
            Snapshot schedule occurs weekly on WEEKLY_SCHEDULE at START_TIME.
            WEEKLY_CYCLE must be one of: monday, tuesday, wednesday, thursday,
            friday, saturday, sunday.

OPTIONAL FLAGS
     --description=DESCRIPTION
        An optional, textual description for the backend.

     --on-source-disk-delete=ON_SOURCE_DISK_DELETE
        Retention behavior of automatic snapshots in the event of source disk
        deletion. ON_SOURCE_DISK_DELETE must be one of:

         apply-retention-policy
            Continue to apply the retention window to automatically-created
            snapshots when the source disk is deleted.
         keep-auto-snapshots
            Keep automatically-created snapshots when the source disk is
            deleted. This is the default behavior.

     --region=REGION
        Region of the resource policy to operate on. If not specified, you
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

     Snapshot properties

     --guest-flush
        Create an application consistent snapshot by informing the OS to
        prepare for the snapshot process.

     --snapshot-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

        The label is added to each snapshot created by the schedule.

     --storage-location=LOCATION
        Google Cloud Storage location, either regional or multi-regional, where
        snapshot content is to be stored. If absent, a nearby regional or
        multi-regional location is chosen automatically.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute resource-policies create snapshot-schedule

        $ gcloud beta compute resource-policies create snapshot-schedule
```

### gcloud compute resource-policies create workload-policy

```text
NAME
    gcloud compute resource-policies create workload-policy - create a Compute
        Engine workload resource policy

SYNOPSIS
    gcloud compute resource-policies create workload-policy NAME --type=TYPE
        [--accelerator-topology-mode=ACCELERATOR_TOPOLOGY_MODE]
        [--description=DESCRIPTION] [--region=REGION]
        [--accelerator-topology=ACCELERATOR_TOPOLOGY
          | --max-topology-distance=MAX_TOPOLOGY_DISTANCE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Compute Engine workload resource policy.

EXAMPLES
    To create a workload policy:

        $ gcloud compute resource-policies create workload-policy NAME \
            --type=TYPE

POSITIONAL ARGUMENTS
     NAME
        Name of the resource policy to operate on.

REQUIRED FLAGS
     --type=TYPE
        Type of the workload policy defining the high-level intent of the
        cluster. TYPE must be one of:

         HIGH_AVAILABILITY
            For workloads that aim to be highly available. Common examples are
            web / ML serving, or distributed database clusters. Compute Engine
            spreads VMs at best-effort to improve reliability of the
            distributed infrastructure.
         HIGH_THROUGHPUT
            For high throughput distributed workloads eg. HPC or ML training.
            Compute Engine collocates VMs at best-effort to reduce network
            latency between VMs.

OPTIONAL FLAGS
     --accelerator-topology-mode=ACCELERATOR_TOPOLOGY_MODE
        Defines the accelerator connection strategy for accelerator machine
        types like TPUs. ACCELERATOR_TOPOLOGY_MODE must be one of:

         AUTO_CONNECT
            This creates a static, pre-formed accelerator topology.
         PROVISION_ONLY
            The interconnected chips are connected on demand. At the time of VM
            creation, the chips are not connected.

     --description=DESCRIPTION
        An optional, textual description for the backend.

     --region=REGION
        Region of the resource policy to operate on. If not specified, you
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

     At most one of these can be specified:

       --accelerator-topology=ACCELERATOR_TOPOLOGY
          Specifies the topology of placement and interconnection performance
          required to create a slice of VMs with interconnected accelerators.

       --max-topology-distance=MAX_TOPOLOGY_DISTANCE
          Specifies the topology of placement and interconnection network
          performance of the group of VMs (MIG / Multi-MIGs).
          MAX_TOPOLOGY_DISTANCE must be one of:

           BLOCK
              VMs are placed within the same block of capacity with improved
              latency compared to Cluster.
           CLUSTER
              VMs are placed within the same cluster of capacity with improved
              latency between them.
           SUBBLOCK
              Tightest collocation of VMs that provides minimized network
              latency. VMs are placed within the same rack of capacity with
              improved latency compared to Block.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute resource-policies create workload-policy

        $ gcloud beta compute resource-policies create workload-policy
```

### gcloud beta compute resource-policies create disk-consistency-group

```text
NAME
    gcloud beta compute resource-policies create disk-consistency-group -
        create a Compute Engine Disk Consistency Group resource policy

SYNOPSIS
    gcloud beta compute resource-policies create disk-consistency-group NAME
        [--description=DESCRIPTION] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute resource-policies create group-placement

```text
NAME
    gcloud beta compute resource-policies create group-placement - create a
        Compute Engine group placement resource policy

SYNOPSIS
    gcloud beta compute resource-policies create group-placement NAME
        [--accelerator-topology-mode=ACCELERATOR_TOPOLOGY_MODE]
        [--availability-domain-count=AVAILABILITY_DOMAIN_COUNT]
        [--collocation=COLLOCATION] [--description=DESCRIPTION]
        [--gpu-topology=GPU_TOPOLOGY] [--max-distance=MAX_DISTANCE]
        [--region=REGION] [--vm-count=VM_COUNT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute resource-policies create instance-schedule

```text
NAME
    gcloud beta compute resource-policies create instance-schedule - create a
        Compute Engine instance schedule resource policy

SYNOPSIS
    gcloud beta compute resource-policies create instance-schedule NAME
        [--description=DESCRIPTION] [--end-date=END_DATE]
        [--initiation-date=INITIATION_DATE] [--region=REGION]
        [--timezone=TIMEZONE] [--vm-start-schedule=VM_START_SCHEDULE]
        [--vm-stop-schedule=VM_STOP_SCHEDULE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute resource-policies create snapshot-schedule

```text
NAME
    gcloud beta compute resource-policies create snapshot-schedule - create a
        Compute Engine Snapshot Schedule Resource Policy

SYNOPSIS
    gcloud beta compute resource-policies create snapshot-schedule NAME
        --max-retention-days=MAX_RETENTION_DAYS
        (--weekly-schedule-from-file=PATH_TO_FILE
          | --start-time=START_TIME (--daily-schedule | --hourly-schedule=HOURS
          | --weekly-schedule=WEEKLY_CYCLE)) [--description=DESCRIPTION]
        [--on-source-disk-delete=ON_SOURCE_DISK_DELETE] [--region=REGION]
        [--guest-flush
          --snapshot-labels=[KEY=VALUE,...] --snapshot-region=SNAPSHOT_REGION
          | --storage-location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute resource-policies create workload-policy

```text
NAME
    gcloud beta compute resource-policies create workload-policy - create a
        Compute Engine workload resource policy

SYNOPSIS
    gcloud beta compute resource-policies create workload-policy NAME
        --type=TYPE [--accelerator-topology-mode=ACCELERATOR_TOPOLOGY_MODE]
        [--description=DESCRIPTION] [--region=REGION]
        [--accelerator-topology=ACCELERATOR_TOPOLOGY
          | --max-topology-distance=MAX_TOPOLOGY_DISTANCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute resource-policies create disk-consistency-group

```text
NAME
    gcloud alpha compute resource-policies create disk-consistency-group -
        create a Compute Engine Disk Consistency Group resource policy

SYNOPSIS
    gcloud alpha compute resource-policies create disk-consistency-group NAME
        [--description=DESCRIPTION] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute resource-policies create group-placement

```text
NAME
    gcloud alpha compute resource-policies create group-placement - create a
        Compute Engine group placement resource policy

SYNOPSIS
    gcloud alpha compute resource-policies create group-placement NAME
        [--accelerator-topology-mode=ACCELERATOR_TOPOLOGY_MODE]
        [--availability-domain-count=AVAILABILITY_DOMAIN_COUNT]
        [--collocation=COLLOCATION] [--description=DESCRIPTION]
        [--gpu-topology=GPU_TOPOLOGY] [--max-distance=MAX_DISTANCE]
        [--region=REGION] [--scope=SCOPE] [--tpu-topology=TPU_TOPOLOGY]
        [--vm-count=VM_COUNT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute resource-policies create instance-schedule

```text
NAME
    gcloud alpha compute resource-policies create instance-schedule - create a
        Compute Engine instance schedule resource policy

SYNOPSIS
    gcloud alpha compute resource-policies create instance-schedule NAME
        [--description=DESCRIPTION] [--end-date=END_DATE]
        [--initiation-date=INITIATION_DATE] [--region=REGION]
        [--timezone=TIMEZONE] [--vm-start-schedule=VM_START_SCHEDULE]
        [--vm-stop-schedule=VM_STOP_SCHEDULE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute resource-policies create snapshot-schedule

```text
NAME
    gcloud alpha compute resource-policies create snapshot-schedule - create a
        Compute Engine Snapshot Schedule Resource Policy

SYNOPSIS
    gcloud alpha compute resource-policies create snapshot-schedule NAME
        --max-retention-days=MAX_RETENTION_DAYS
        (--weekly-schedule-from-file=PATH_TO_FILE
          | --start-time=START_TIME (--daily-schedule | --hourly-schedule=HOURS
          | --weekly-schedule=WEEKLY_CYCLE)) [--description=DESCRIPTION]
        [--on-source-disk-delete=ON_SOURCE_DISK_DELETE] [--region=REGION]
        [--guest-flush
          --snapshot-labels=[KEY=VALUE,...] --snapshot-region=SNAPSHOT_REGION
          | --storage-location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute resource-policies create vm-maintenance concurrency-limit

```text
NAME
    gcloud alpha compute resource-policies create vm-maintenance
        concurrency-limit - create a Compute Engine VM Maintenance Resource
        Policy

SYNOPSIS
    gcloud alpha compute resource-policies create vm-maintenance
        concurrency-limit NAME [--description=DESCRIPTION]
        [--max-percent=MAX_PERCENT; default=1] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute resource-policies create vm-maintenance maintenance-window

```text
NAME
    gcloud alpha compute resource-policies create vm-maintenance
        maintenance-window - create a Compute Engine VM Maintenance Resource
        Policy

SYNOPSIS
    gcloud alpha compute resource-policies create vm-maintenance
        maintenance-window NAME (--daily-window --start-time=START_TIME)
        [--description=DESCRIPTION] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute resource-policies create workload-policy

```text
NAME
    gcloud alpha compute resource-policies create workload-policy - create a
        Compute Engine workload resource policy

SYNOPSIS
    gcloud alpha compute resource-policies create workload-policy NAME
        --type=TYPE [--accelerator-topology-mode=ACCELERATOR_TOPOLOGY_MODE]
        [--description=DESCRIPTION] [--region=REGION]
        [--accelerator-topology=ACCELERATOR_TOPOLOGY
          | --max-topology-distance=MAX_TOPOLOGY_DISTANCE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/resource-policies/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
