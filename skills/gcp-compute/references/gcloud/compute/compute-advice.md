---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/advice
---

# gcloud compute advice

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute advice calendar-mode

```text
NAME
    gcloud compute advice calendar-mode - recommends the optimal time window
        and zone for Future Reservations

SYNOPSIS
    gcloud compute advice calendar-mode
        ([--chip-count=CHIP_COUNT --tpu-version=TPU_VERSION
          : --workload-type=WORKLOAD_TYPE]
          | [--machine-type=MACHINE_TYPE --vm-count=VM_COUNT
          : --local-ssd=[interface=INTERFACE],[size=SIZE]])
        [--duration-range=[max=MAX],[min=MIN]]
        [--location-policy=[ZONE=POLICY,...]] [--region=REGION]
        [--start-time-range=[from=FROM],[to=TO]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Recommends the optimal time window and zone for Future Reservations.

EXAMPLES
    To request an advice for a future reservation of 8 a3-highgpu-8g VMs, run:

        $ gcloud compute advice calendar-mode --region=fake-region \
            --machine-type=a3-megagpu-8g --vm-count=8 \
            --duration-range=min=7d,max=14d \
            --start-time-range=from=2025-02-20,to=2025-03-25

    To request advice for a future reservation of 512 v5e TPUs, run:

        $ gcloud compute advice calendar-mode --region=fake-region \
            --location-policy=fake-zone-1=DENY,fake-zone-2=ALLOW \
            --tpu-version=V5E --chip-count=16 --workload-type=BATCH \
            --duration-range=min=30d,max=90d \
            --start-time-range=from=2025-02-25,to=2025-06-25

REQUIRED FLAGS
        Specify the properties of the resources that you want to view the availability of.

    Exactly one of these must be specified:

        You must define the version and number of TPUs to reserve.

      --chip-count=CHIP_COUNT
         The number of chips to check for availability.

         This flag argument must be specified if any of the other arguments in
         this group are specified.

      --tpu-version=TPU_VERSION
         The version of Cloud TPU to reserve. TPU_VERSION must be one of:

          V5E
             Cloud TPU v5e Lite
          V5P
             Cloud TPU v5p
          V6E
             Cloud TPU v6e

         This flag argument must be specified if any of the other arguments in
         this group are specified.

      --workload-type=WORKLOAD_TYPE
         Type of the workload that will be running on the reserved TPUs.
         WORKLOAD_TYPE must be one of:

          BATCH
             Reserved resources will be optimized for BATCH workloads that
             handle large amounts of data in single or multiple operations,
             such as ML training workloads.
          SERVING
             Reserved resources will be optimized for SERVING workloads that
             handle concurrent requests and require minimal network latency,
             such as ML inference.

        Define individual instance properties for the specific SKU reservation.

      --machine-type=MACHINE_TYPE
         The predefined machine type for which you want to view the future
         availability. Custom machine types aren't supported.

         Different reservation types restrict the available machine series. To
         review the machine series and types that each reservation type
         supports, see
         https://docs.cloud.google.com/compute/docs/instances/choose-reservation-type#comparison

         This flag argument must be specified if any of the other arguments in
         this group are specified.

      --vm-count=VM_COUNT
         The number of instances to check for availability.

         This flag argument must be specified if any of the other arguments in
         this group are specified.

      --local-ssd=[interface=INTERFACE],[size=SIZE]
         Manage the size and the interface of local SSD to use. See
         https://cloud.google.com/compute/docs/disks/local-ssd for more
         information.
          interface
             The kind of disk interface exposed to the VM for this SSD. The
             only valid value is nvme.
          size
             The size of the local SSD in base-2 GB.

OPTIONAL FLAGS
     --duration-range=[max=MAX],[min=MIN]
        A duration range for the duration of the Future Reservation. Defined as
        a list of key-value pairs.

        The key is either "min" or "max", and the value is a duration in
        seconds. For example, specify 30m for a duration of 30 minutes or
        specify 1d2h3m4s for a duration of 1 day, 2 hours, 3 minutes, and 4
        seconds.

        See $ gcloud topic datetimes for information on duration formats.

         min
            The minimum duration of the Future Reservation.
         max
            The maximum duration of the Future Reservation.

            Example:

                gcloud compute advice calendar-mode --duration-range=min=24h,max=72h

     --location-policy=[ZONE=POLICY,...]
        Policy for which zones to include or exclude when looking for the
        optimal time window and zone for Future Reservations within a region.
        Policy is defined as a list of key-value pairs, with the key being the
        zone name, and value being the applied policy. Available policies are
        allow and deny. Default for zones if left unspecified is allow.

        Example:

            gcloud compute advice calendar-mode --location-policy=us-central1-a=allow,us-central1-b=deny

     --region=REGION
        Region of the resources to get advice on. If not specified, you might
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

     --start-time-range=[from=FROM],[to=TO]
        A time range for the start time of the Future Reservation. Defined as a
        list of key-value pairs.

        The key is either "from" or "to", and the value is a datetime. See $
        gcloud topic datetimes for information on time formats.

         from
            The earliest possible start time for the reservation.
         to
            The latest possible start time for the reservation.

            Example:

                gcloud compute advice calendar-mode --start-time-range=from=2024-08-01T00:00:00Z,to=2024-08-02T00:00:00Z

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute advice calendar-mode

        $ gcloud beta compute advice calendar-mode
```

### gcloud compute advice capacity

```text
NAME
    gcloud compute advice capacity - get capacity advice for Compute Engine
        resources

SYNOPSIS
    gcloud compute advice capacity --provisioning-model=PROVISIONING_MODEL
        --size=SIZE --target-distribution-shape=TARGET_DISTRIBUTION_SHAPE
        (--instance-flexibility-policy=[INSTANCE_FLEXIBILITY_POLICY,...]
          | --instance-selection=INSTANCE_SELECTION
          --instance-selection-machine-types=[MACHINE_TYPE,...])
        [--accelerator-topology=ACCELERATOR_TOPOLOGY]
        [--max-run-duration=MAX_RUN_DURATION] [--region=REGION]
        [--zones=[ZONE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get capacity advice for Compute Engine resources.

    This command helps you view future resource availability for a specific
    number of VM instances, machine type, provisioning model, and zone. After
    you confirm resource availability, you can specify those configurations
    when you create VM instances. This action improves the success rate of your
    VM instance creation request.

EXAMPLES
    To check the availability of 100 n2-standard-32 Spot VMs in any single zone
    in the us-central1 region, run the following command:

        $ gcloud compute advice capacity --region="us-central1" \
            --provisioning-model="SPOT" --size=100 \
            --instance-selection-machine-types="n2-standard-32" \
            --target-distribution-shape="any-single-zone"

    To check the availability of 50 Spot VMs, allowing either e2-standard-8 or
    e2-standard-16 machine types, distributed across us-central1-a and
    us-central1-b, run the following command:

        $ gcloud compute advice capacity --region="us-central1" \
            --provisioning-model="SPOT" --size=50 \
            --instance-selection="name=my-selection,machine-type=e2-standard\
        -8,machine-type=e2-standard-16" --target-distribution-shape="any" \
            --zones="us-central1-a,us-central1-b"

    To check the availability of 10 ct5lp-hightpu-4t Flex-start VMs that will
    run for 1 day in any single zone in the us-central1 region, run the
    following command:

        $ gcloud compute advice capacity --region="us-central1" \
            --provisioning-model="FLEX_START" --max-run-duration=1d \
            --size=10 \
            --instance-selection-machine-types="ct5lp-hightpu-4t" \
            --target-distribution-shape="any-single-zone" \
            --accelerator-topology="2x2"

REQUIRED FLAGS
     --provisioning-model=PROVISIONING_MODEL
        Specifies the provisioning model. PROVISIONING_MODEL must be one of:

         FLEX_START
            Compute Engine will attempt to allocate the requested capacity
            within a specific time frame. If it succeeds, the VMs will start
            running and keep running for a maximum of 7 days.
         SPOT
            Compute Engine may preempt a Spot VM whenever it needs capacity.
            Because Spot VMs don't have a guaranteed runtime, they come at a
            discounted price.

     --size=SIZE
        The total number of VMs being requested in the capacity query.

     --target-distribution-shape=TARGET_DISTRIBUTION_SHAPE
        Defines the distribution requirement for the requested VMs.
        TARGET_DISTRIBUTION_SHAPE must be one of:

         ANY
            When you specify ANY for VM instance creation across multiple
            zones, you specify that you want to create your VM instances in one
            or more zones based on resource availability.
         ANY_SINGLE_ZONE
            When you specify ANY_SINGLE_ZONE for VM instance creation, you
            specify that you want to create all VM instances in a single
            available zone. Compute Engine selects this zone based on resource
            availability and on any unused, matching reservation in your
            project. However, zonal resource availability constraints might
            prevent Compute Engine from creating all your requested VM
            instances. Use ANY_SINGLE_ZONE when the VM instances in your
            workloads need to frequently communicate among each other.
         BALANCED
            Prioritizes provisioning VMs in zones where resources are
            available. Compute Engine then distributes VMs as evenly as
            possible across zones. If resources are unavailable in one or more
            zones, then the actual distribution might be uneven. Use BALANCED
            to minimize the impact of zonal failures.

     Specifies the machine types for which advice is being sought.

     Exactly one of these must be specified:

       --instance-flexibility-policy=[INSTANCE_FLEXIBILITY_POLICY,...]
          Specifies the instance flexibility policy. This policy lets you
          define one or more named selections of machine types for which
          capacity advice is sought. Within each selection, you can list your
          preferred machine types, assign an optional rank to indicate priority
          (lower rank values are considered higher priority), and specify
          additional instance properties, such as minimum CPU platform and disk
          configurations.

       Or at least one of these can be specified:

         --instance-selection=INSTANCE_SELECTION
            Named selection of machine types. For example,
            --instance-selection="name=instance-selection-1,machine-type=e2-standard-8,machine-type=t2d-standard-8".

         --instance-selection-machine-types=[MACHINE_TYPE,...]
            Specifies a comma-separated list of preferred machine types for
            creating virtual machines.

OPTIONAL FLAGS
     --accelerator-topology=ACCELERATOR_TOPOLOGY
        Topology required to create a partition for VMs that have
        interconnected GPUs or TPUs. For example, 2x2 for ct5l-hightpu-4t.

     --max-run-duration=MAX_RUN_DURATION
        Maximum duration for which the requested VMs can run. This flag must be
        used when the requested provisioning model is FLEX_START.

        The duration is formatted as the number of days, hours, minutes, and
        seconds followed by d, h, m, and s respectively. For example, specify
        30m for a duration of 30 minutes or specify 1d2h3m4s for a duration of
        1 day, 2 hours, 3 minutes, and 4 seconds.

     --region=REGION
        Region of the resources to get advice on. If not specified, you might
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

     --zones=[ZONE,...]
        A comma-separated list of zones to query within the specified region,
        for example, us-central1-a,us-central1-b. If you omit this flag, then
        you view availability for your requested capacity across all zones in
        the region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute advice capacity

        $ gcloud beta compute advice capacity
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute advice capacity \
    --region="us-central1" \
    --provisioning-model="SPOT" \
    --size=50 \
    --instance-selection="name=my-selection,machine-type=e2-standard-8,machine-type=e2-standard-16" \
    --target-distribution-shape="any" \
    --zones="us-central1-a,us-central1-b"
```

### gcloud compute advice capacity-history

```text
NAME
    gcloud compute advice capacity-history - show historical data on Spot VMs
        preemption and price

SYNOPSIS
    gcloud compute advice capacity-history --machine-type=MACHINE_TYPE
        --provisioning-model=PROVISIONING_MODEL --types=HISTORY_TYPE,[...]
        (--region=REGION | --zone=ZONE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show historical data on Spot VMs preemption and price.

    Use this command to retrieve historical data on Spot VM preemption and
    price for a specific machine type and location. By analyzing historical
    trends, you can choose configurations for creating new VM instances that
    increase stability or lower your costs.

EXAMPLES
    To check recent price history for n2-standard-32 Spot VMs in us-central1,
    run the following command:

        $ gcloud compute advice capacity-history --provisioning-model=SPOT \
            --machine-type=n2-standard-32 --types=PRICE --region=us-central1

    To check recent preemption and price history for n2-standard-32 Spot VMs in
    us-central1-a, run the following command:

        $ gcloud compute advice capacity-history --provisioning-model=SPOT \
            --machine-type=n2-standard-32 --types=PREEMPTION,PRICE \
            --zone=us-central1-a

REQUIRED FLAGS
     --machine-type=MACHINE_TYPE
        The machine type for the VM, such as n2-standard-4.

     --provisioning-model=PROVISIONING_MODEL
        Specifies the provisioning model. PROVISIONING_MODEL must be (only one
        value is supported):

         SPOT
            Compute Engine may preempt a Spot VM whenever it needs capacity.
            Because Spot VMs don't have a guaranteed runtime, they come at a
            discounted price.

     --types=HISTORY_TYPE,[...]
        Specifies types of the request query. HISTORY_TYPE must be one of:

         PREEMPTION
            Historical preemption rates for Spot VMs, calculated as the number
            of Spot VMs preempted by Compute Engine divided by the total number
            of Spot VMs suspended, stopped, or deleted by users, or stopped or
            deleted resulting from preemption. The rate is expressed in decimal
            numbers. For more information about the preemption process, see:
            https://docs.cloud.google.com/compute/docs/instances/spot#preemption
         PRICE
            Historical Spot VMs prices in USD. For more information about Spot
            VMs pricing, see:
            https://docs.cloud.google.com/compute/docs/instances/spot#pricing

     Exactly one of these must be specified:

       --region=REGION
          Region of the advice to get history. If not specified, you might be
          prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

       --zone=ZONE
          The zone to query within the specified region, for example,
          us-central1-a. If omitted, you will view history across all zones in
          the region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute advice capacity-history

        $ gcloud beta compute advice capacity-history
```

### gcloud beta compute advice calendar-mode

```text
NAME
    gcloud beta compute advice calendar-mode - recommends the optimal time
        window and zone for Future Reservations

SYNOPSIS
    gcloud beta compute advice calendar-mode
        ([--chip-count=CHIP_COUNT --tpu-version=TPU_VERSION
          : --workload-type=WORKLOAD_TYPE]
          | [--machine-type=MACHINE_TYPE --vm-count=VM_COUNT
          : --local-ssd=[interface=INTERFACE],[size=SIZE]])
        [--duration-range=[max=MAX],[min=MIN]]
        [--end-time-range=[from=FROM],[to=TO]]
        [--location-policy=[ZONE=POLICY,...]] [--region=REGION]
        [--start-time-range=[from=FROM],[to=TO]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute advice capacity

```text
NAME
    gcloud beta compute advice capacity - get capacity advice for Compute
        Engine resources

SYNOPSIS
    gcloud beta compute advice capacity --provisioning-model=PROVISIONING_MODEL
        --size=SIZE --target-distribution-shape=TARGET_DISTRIBUTION_SHAPE
        (--instance-flexibility-policy=[INSTANCE_FLEXIBILITY_POLICY,...]
          | --instance-selection=INSTANCE_SELECTION
          --instance-selection-machine-types=[MACHINE_TYPE,...])
        [--accelerator-topology=ACCELERATOR_TOPOLOGY]
        [--max-run-duration=MAX_RUN_DURATION] [--region=REGION]
        [--zones=[ZONE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute advice capacity-history

```text
NAME
    gcloud beta compute advice capacity-history - show historical data on Spot
        VMs preemption and price

SYNOPSIS
    gcloud beta compute advice capacity-history --machine-type=MACHINE_TYPE
        --provisioning-model=PROVISIONING_MODEL --types=HISTORY_TYPE,[...]
        (--region=REGION | --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute advice calendar-mode

```text
NAME
    gcloud alpha compute advice calendar-mode - recommends the optimal time
        window and zone for Future Reservations

SYNOPSIS
    gcloud alpha compute advice calendar-mode
        ([--chip-count=CHIP_COUNT --tpu-version=TPU_VERSION
          : --workload-type=WORKLOAD_TYPE]
          | [--machine-type=MACHINE_TYPE --vm-count=VM_COUNT
          : --local-ssd=[interface=INTERFACE],[size=SIZE]])
        [--duration-range=[max=MAX],[min=MIN]]
        [--end-time-range=[from=FROM],[to=TO]]
        [--location-policy=[ZONE=POLICY,...]] [--region=REGION]
        [--start-time-range=[from=FROM],[to=TO]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute advice capacity

```text
NAME
    gcloud alpha compute advice capacity - get capacity advice for Compute
        Engine resources

SYNOPSIS
    gcloud alpha compute advice capacity
        --provisioning-model=PROVISIONING_MODEL --size=SIZE
        --target-distribution-shape=TARGET_DISTRIBUTION_SHAPE
        (--instance-flexibility-policy=[INSTANCE_FLEXIBILITY_POLICY,...]
          | --instance-selection=INSTANCE_SELECTION
          --instance-selection-machine-types=[MACHINE_TYPE,...])
        [--accelerator-topology=ACCELERATOR_TOPOLOGY]
        [--max-run-duration=MAX_RUN_DURATION] [--region=REGION]
        [--zones=[ZONE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute advice capacity-history

```text
NAME
    gcloud alpha compute advice capacity-history - show historical data on Spot
        VMs preemption and price

SYNOPSIS
    gcloud alpha compute advice capacity-history --machine-type=MACHINE_TYPE
        --provisioning-model=PROVISIONING_MODEL --types=HISTORY_TYPE,[...]
        (--region=REGION | --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/advice (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
