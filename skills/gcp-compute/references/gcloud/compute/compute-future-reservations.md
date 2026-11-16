---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/future-reservations
---

# gcloud compute future-reservations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute future-reservations cancel

```text
NAME
    gcloud compute future-reservations cancel - cancel a Compute Engine future
        reservation

SYNOPSIS
    gcloud compute future-reservations cancel
        (FUTURE_RESERVATION : --zone=ZONE) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel a Compute Engine future reservation.

EXAMPLES
    To cancel a given Compute Engine future reservation, run:

        $ gcloud compute future-reservations cancel my-reservation \
            --zone=ZONE

POSITIONAL ARGUMENTS
     Future reservation resource - The name of the future reservation to
     cancel. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument future_reservation on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       FUTURE_RESERVATION
          ID of the future reservation or fully qualified identifier for the
          future reservation.

          To set the future_reservation attribute:
          + provide the argument future_reservation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument future_reservation on the command line with
            a fully specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

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
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute future-reservations cancel

        $ gcloud beta compute future-reservations cancel
```

### gcloud compute future-reservations create

```text
NAME
    gcloud compute future-reservations create - create a Compute Engine
        reservation

SYNOPSIS
    gcloud compute future-reservations create FUTURE_RESERVATION
        --[no-]auto-delete-auto-created-reservations
        (--source-instance-template=SOURCE_INSTANCE_TEMPLATE
          | [--machine-type=MACHINE_TYPE
          : --accelerator=[count=COUNT],[type=TYPE]
          --local-ssd=[count=COUNT],[interface=INTERFACE],[size=SIZE]
          --min-cpu-platform=MIN_CPU_PLATFORM] | [--tpu-version=TPU_VERSION
          : --chip-count=CHIP_COUNT --workload-type=WORKLOAD_TYPE])
        (--start-time=START_TIME (--duration=DURATION | --end-time=END_TIME))
        [--deployment-type=DEPLOYMENT_TYPE] [--description=DESCRIPTION]
        [--name-prefix=NAME_PREFIX] [--planning-status=PLANNING_STATUS]
        [--[no-]require-specific-reservation]
        [--reservation-mode=RESERVATION_MODE]
        [--reservation-name=RESERVATION_NAME]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--scheduling-type=SCHEDULING_TYPE] [--total-count=TOTAL_COUNT]
        [--zone=ZONE]
        [--auto-created-reservations-delete-time=AUTO_CREATED_RESERVATIONS_DELETE_TIME | --auto-created-reservations-duration=AUTO_CREATED_RESERVATIONS_DURATION]
        [--commitment-name=COMMITMENT_NAME --commitment-plan=COMMITMENT_PLAN
          --previous-commitment-terms=PREVIOUS_COMMITMENT_TERMS]
        [--share-setting=SHARE_SETTING --share-with=PROJECT,[PROJECT,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Compute Engine reservation.

POSITIONAL ARGUMENTS
     FUTURE_RESERVATION
        Name of the future reservation to create.

REQUIRED FLAGS
     --[no-]auto-delete-auto-created-reservations
        If specified, the auto-created reservations for a future reservation
        are deleted at the end time (default) or at a specified delete time.
        Use --auto-delete-auto-created-reservations to enable and
        --no-auto-delete-auto-created-reservations to disable.

     To create a future reservation request, specify the properties of the
     resources that you want to reserve and when you want to start using them.
     After the request is approved, Compute Engine automatically creates
     reservations for your requested resources at your specified start time.

     Exactly one of these must be specified:

       --source-instance-template=SOURCE_INSTANCE_TEMPLATE
          The url of the instance template that will be used to populate the
          fields of the reservation. Instance properties can not be defined in
          addition to source instance template.

       Or at least one of these can be specified:

         Define individual instance properties for the specific SKU
         reservation.

         --machine-type=MACHINE_TYPE
            The predefined or custom machine type that you want to reserve. To
            supply a custom machine type, the string must be formatted
            precisely with the word custom, a hyphen, the integer number of
            vCPUs, a hyphen, and the integer amount of memory in megabytes. For
            example, custom-32-29440 configures 32 vCPUs and 29440 MB of
            memory. Only future reservations support custom machine types.
            Future reservations in calendar mode only support predefined
            machine types.

            Different reservation types restrict the available machine series.
            To review the machine series and types that each reservation type
            supports, see
            https://docs.cloud.google.com/compute/docs/instances/choose-reservation-type#comparison

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --accelerator=[count=COUNT],[type=TYPE]
            Manage the configuration of the type and number of accelerator
            cards attached.
             count
                The number of accelerators to attach to each instance in the
                reservation.
             type
                The specific type (e.g. nvidia-tesla-k80 for nVidia Tesla K80)
                of accelerator to attach to instances in the reservation. Use
                gcloud compute accelerator-types list to learn about all
                available accelerator types.

         --local-ssd=[count=COUNT],[interface=INTERFACE],[size=SIZE]
            Manage the size and the interface of local SSD to use. See
            https://cloud.google.com/compute/docs/disks/local-ssd for more
            information.
             interface
                The kind of disk interface exposed to the VM for this SSD.
                Valid values are scsi and nvme. SCSI is the default and is
                supported by more guest operating systems. NVME may provide
                higher performance.
             size
                The size of the local SSD in base-2 GB.
             count
                The number of local SSD to use per VM. If you don't specify
                this argument, then the default value is 1.

         --min-cpu-platform=MIN_CPU_PLATFORM
            Optional minimum CPU platform of the reservation to create.

       Or at least one of these can be specified:

         You must define the version and number of TPUs to reserve.

         --tpu-version=TPU_VERSION
            The version of Cloud TPU to reserve. TPU_VERSION must be one of:

             TPU7X
                Cloud TPU v7x
             V5E
                Cloud TPU v5e Lite
             V5P
                Cloud TPU v5p
             V6E
                Cloud TPU v6e

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --chip-count=CHIP_COUNT
            The number of chips to reserve.

         --workload-type=WORKLOAD_TYPE
            The workload type of the TPU reservation. WORKLOAD_TYPE must be one
            of:

             BATCH
                Reserved resources will be optimized for BATCH workloads, such
                as ML training.
             SERVING
                Reserved resources will be optimized for SERVING workloads,
                such as ML inference

     Manage the time specific properties for requesting future capacity

     This must be specified.

       --start-time=START_TIME
          Start time of the Future Reservation. The start time must be an
          RFC3339 valid string formatted by date, time, and timezone or
          "YYYY-MM-DDTHH:MM:SSZ"; where YYYY = year, MM = month, DD = day, HH =
          hours, MM = minutes, SS = seconds, and Z = timezone (i.e.
          2021-11-20T07:00:00Z).

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       Exactly one of these must be specified:

         --duration=DURATION
            Alternate way of specifying time in the number of seconds to
            terminate capacity request relative to the start time of a request.

         --end-time=END_TIME
            End time of the Future Reservation. The end time must be an RFC3339
            valid string formatted by date, time, and timezone or
            "YYYY-MM-DDTHH:MM:SSZ"; where YYYY = year, MM = month, DD = day, HH
            = hours, MM = minutes, SS = seconds, and Z = timezone (i.e.
            2021-11-20T07:00:00Z).

OPTIONAL FLAGS
     --deployment-type=DEPLOYMENT_TYPE
        The deployment type for the reserved capacity. DEPLOYMENT_TYPE must be
        one of:

         DENSE
            DENSE mode is for densely deployed reservation blocks.
         FLEXIBLE
            FLEXIBLE mode is for highly flexible, logical reservation blocks.

     --description=DESCRIPTION
        An optional description of the future reservation to create.

     --name-prefix=NAME_PREFIX
        A name prefix for the auto-created reservations when capacity is
        delivered at the start time. Each auto-created reservation name starts
        with the name prefix.

     --planning-status=PLANNING_STATUS
        The planning status of the future reservation. The default value is
        DRAFT. While in DRAFT, any changes to the future reservation's
        properties will be allowed. If set to SUBMITTED, the future reservation
        will submit and its procurementStatus will change to PENDING_APPROVAL.
        Once the future reservation is pending approval, changes to the future
        reservation's properties will not be allowed. PLANNING_STATUS must be
        one of:

         DRAFT
            Default planning status value.
         SUBMITTED
            Planning status value to immediately submit the future reservation.

     --[no-]require-specific-reservation
        Indicate whether the auto-created reservations can be consumed by VMs
        with "any reservation" defined. If enabled, then only VMs that target
        the auto-created reservation by name using
        --reservation-affinity=specific can consume from this reservation.
        Auto-created reservations delivered with this flag enabled will inherit
        the name of the future reservation. Use --require-specific-reservation
        to enable and --no-require-specific-reservation to disable.

     --reservation-mode=RESERVATION_MODE
        The mode of the reservation. RESERVATION_MODE must be one of:

         CALENDAR
            This indicates to create a future reservation in calendar mode,
            which is ideal for reserving GPU VMs. The auto-created reservations
            for the future reservation are automatically deleted at the end of
            the reservation period.
         DEFAULT
            This indicates to create a standard future reservation. If you want
            to automatically delete the auto-created reservations, then you
            must use the --auto-delete-auto-created-reservations flag.

     --reservation-name=RESERVATION_NAME
        Name of reservations where the capacity is provisioned at the time of
        delivery of future reservations. If the reservation with the given name
        does not exist already, it is created automatically at the time of
        Approval with INACTIVE state till specified start-time. Either provide
        the reservation_name or a name_prefix.

     --resource-manager-tags=[KEY=VALUE,...]
        Resource manager tags to be bound to the future reservation.

     --scheduling-type=SCHEDULING_TYPE
        Maintenance for the reserved capacity. SCHEDULING_TYPE must be one of:

         GROUPED
            In GROUPED mode, maintenance on all reserved instances is
            synchronized.
         INDEPENDENT
            In INDEPENDENT mode, maintenance is not synchronized for this
            reservation, and each instance has its own maintenance window.

     --total-count=TOTAL_COUNT
        The total number of instances for which capacity assurance is requested
        at a future time period.

     --zone=ZONE
        Zone of the future reservation to create. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

     Manage the auto-delete time properties.

     At most one of these can be specified:

       --auto-created-reservations-delete-time=AUTO_CREATED_RESERVATIONS_DELETE_TIME
          Automatically deletes an auto-created reservations at a specific
          time. The specified time must be an RFC3339 timestamp, which must be
          formatted as "YYYY-MM-DDTHH:MM:SSZ" where YYYY = year, MM = month, DD
          = day, HH = hours, MM = minutes, SS = seconds, and Z = time zone in
          Coordinated Universal Time (UTC). For example, specify
          2021-11-20T07:00:00Z.

       --auto-created-reservations-duration=AUTO_CREATED_RESERVATIONS_DURATION
          Automatically deletes an auto-created reservations after a specified
          number of days, hours, minutes, or seconds. For example, specify 30m
          for 30 minutes, or 1d2h3m4s for 1 day, 2 hours, 3 minutes, and 4
          seconds. For more information, see $ gcloud topic datetimes.

     Manage the commitment info properties

     --commitment-name=COMMITMENT_NAME
        Name of commitment covering the delivered reservation at the time of
        delivery of future reservations. If not specified, it takes the name of
        the future reservation.

     --commitment-plan=COMMITMENT_PLAN
        The plan for this commitment to be created, which determines duration
        and discount rate. The currently supported plans are TWELVE_MONTH (1
        year), and THIRTY_SIX_MONTH (3 years). COMMITMENT_PLAN must be one of:
        TWELVE_MONTH, THIRTY_SIX_MONTH.

     --previous-commitment-terms=PREVIOUS_COMMITMENT_TERMS
        Applicable only if future reservation will deliver to an existing
        reservation with a ramp plan. When set to EXTEND, all associated parent
        Committed Used Discount's end-date/term will be extended to the
        end-time of this future reservation. Default is to extend previous
        commitment's time to the end_time of the reservation.
        PREVIOUS_COMMITMENT_TERMS must be (only one value is supported):
        EXTEND.

     Manage the properties of a shared reservation.

     --share-setting=SHARE_SETTING
        Specify if this future reservation is shared, and if so, the type of
        sharing. If you omit this flag, this value is local by default.
        SHARE_SETTING must be one of: local, projects.

     --share-with=PROJECT,[PROJECT,...]
        If this future reservation is shared, provide a comma-separated list of
        projects that this future reservation is shared with. The list must
        contain project IDs or project numbers.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute future-reservations create

        $ gcloud beta compute future-reservations create
```

### gcloud compute future-reservations delete

```text
NAME
    gcloud compute future-reservations delete - delete a Compute Engine future
        reservation

SYNOPSIS
    gcloud compute future-reservations delete
        (FUTURE_RESERVATION : --zone=ZONE) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Compute Engine future reservation.

EXAMPLES
    To delete a given Compute Engine future reservation, run:

        $ gcloud compute future-reservations delete my-reservation \
            --zone=ZONE

POSITIONAL ARGUMENTS
     Future reservation resource - The name of the future reservation to
     delete. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument future_reservation on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       FUTURE_RESERVATION
          ID of the future reservation or fully qualified identifier for the
          future reservation.

          To set the future_reservation attribute:
          + provide the argument future_reservation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument future_reservation on the command line with
            a fully specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

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
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute future-reservations delete

        $ gcloud beta compute future-reservations delete
```

### gcloud compute future-reservations describe

```text
NAME
    gcloud compute future-reservations describe - show details about a Compute
        Engine future reservation

SYNOPSIS
    gcloud compute future-reservations describe
        (FUTURE_RESERVATION : --zone=ZONE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about a Compute Engine future reservation.

EXAMPLES
    To describe a given Compute Engine future reservation, run:

        $ gcloud compute future-reservations describe my-reservation \
            --zone=ZONE

POSITIONAL ARGUMENTS
     Future reservation resource - The name of the future reservation to
     describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument future_reservation on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       FUTURE_RESERVATION
          ID of the future reservation or fully qualified identifier for the
          future reservation.

          To set the future_reservation attribute:
          + provide the argument future_reservation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument future_reservation on the command line with
            a fully specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute future-reservations describe

        $ gcloud beta compute future-reservations describe
```

### gcloud compute future-reservations list

```text
NAME
    gcloud compute future-reservations list - list Compute Engine future
        reservations

SYNOPSIS
    gcloud compute future-reservations list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Compute Engine future reservations.

EXAMPLES
    To list all Compute Engine future reservations, run:

        $ gcloud compute future-reservations list my-future-reservation

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

        $ gcloud alpha compute future-reservations list

        $ gcloud beta compute future-reservations list
```

### gcloud compute future-reservations update

```text
NAME
    gcloud compute future-reservations update - update Compute Engine future
        reservations

SYNOPSIS
    gcloud compute future-reservations update FUTURE_RESERVATION
        [--[no-]auto-delete-auto-created-reservations]
        [--deployment-type=DEPLOYMENT_TYPE] [--description=DESCRIPTION]
        [--[no-]enable-emergent-maintenance]
        [--planning-status=PLANNING_STATUS]
        [--[no-]require-specific-reservation]
        [--reservation-name=RESERVATION_NAME]
        [--scheduling-type=SCHEDULING_TYPE] [--total-count=TOTAL_COUNT]
        [--zone=ZONE]
        [--auto-created-reservations-delete-time=AUTO_CREATED_RESERVATIONS_DELETE_TIME | --auto-created-reservations-duration=AUTO_CREATED_RESERVATIONS_DURATION]
        [--clear-name-prefix | --name-prefix=NAME_PREFIX]
        [--clear-share-settings
          | --share-setting=SHARE_SETTING --share-with=PROJECT,[PROJECT,...]]
        [--commitment-name=COMMITMENT_NAME --commitment-plan=COMMITMENT_PLAN
          --previous-commitment-terms=PREVIOUS_COMMITMENT_TERMS]
        [--machine-type=MACHINE_TYPE --min-cpu-platform=MIN_CPU_PLATFORM
          --accelerator=[count=COUNT],[type=TYPE]
          | --clear-accelerator --clear-local-ssd
          | --local-ssd=[count=COUNT],[interface=INTERFACE],[size=SIZE]]
        [--start-time=START_TIME --duration=DURATION | --end-time=END_TIME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update Compute Engine future reservations.

EXAMPLES
    To update total count, start and end time of a Compute Engine future
    reservation in us-central1-a, run:

        $ gcloud compute future-reservations update my-future-reservation \
          --total-count=1000 --start-time=2021-11-10T07:00:00Z \
          --end-time=2021-12-10T07:00:00Z --zone=us-central1-a

POSITIONAL ARGUMENTS
     FUTURE_RESERVATION
        Name of the future reservation to update.

FLAGS
     --[no-]auto-delete-auto-created-reservations
        If specified, the auto-created reservations for a future reservation
        are deleted at the end time (default) or at a specified delete time.
        Use --auto-delete-auto-created-reservations to enable and
        --no-auto-delete-auto-created-reservations to disable.

     --deployment-type=DEPLOYMENT_TYPE
        The deployment type for the reserved capacity. DEPLOYMENT_TYPE must be
        one of:

         DENSE
            DENSE mode is for densely deployed reservation blocks.
         FLEXIBLE
            FLEXIBLE mode is for highly flexible, logical reservation blocks.

     --description=DESCRIPTION
        An optional description of the future reservation to create.

     --[no-]enable-emergent-maintenance
        Emergent maintenance flag for the reservation, which enrolls all the
        underlying vms, hosts and SB infrastructure to receive emergent
        maintenance notifications in advance. Use --enable-emergent-maintenance
        to enable and --no-enable-emergent-maintenance to disable.

     --planning-status=PLANNING_STATUS
        The planning status of the future reservation. The default value is
        DRAFT. While in DRAFT, any changes to the future reservation's
        properties will be allowed. If set to SUBMITTED, the future reservation
        will submit and its procurementStatus will change to PENDING_APPROVAL.
        Once the future reservation is pending approval, changes to the future
        reservation's properties will not be allowed. PLANNING_STATUS must be
        one of:

         DRAFT
            Default planning status value.
         SUBMITTED
            Planning status value to immediately submit the future reservation.

     --[no-]require-specific-reservation
        Indicate whether the auto-created reservations can be consumed by VMs
        with "any reservation" defined. If enabled, then only VMs that target
        the auto-created reservation by name using
        --reservation-affinity=specific can consume from this reservation.
        Auto-created reservations delivered with this flag enabled will inherit
        the name of the future reservation. Use --require-specific-reservation
        to enable and --no-require-specific-reservation to disable.

     --reservation-name=RESERVATION_NAME
        Name of reservations where the capacity is provisioned at the time of
        delivery of future reservations. If the reservation with the given name
        does not exist already, it is created automatically at the time of
        Approval with INACTIVE state till specified start-time. Either provide
        the reservation_name or a name_prefix.

     --scheduling-type=SCHEDULING_TYPE
        Maintenance for the reserved capacity. SCHEDULING_TYPE must be one of:

         GROUPED
            In GROUPED mode, maintenance on all reserved instances is
            synchronized.
         INDEPENDENT
            In INDEPENDENT mode, maintenance is not synchronized for this
            reservation, and each instance has its own maintenance window.

     --total-count=TOTAL_COUNT
        The total number of instances for which capacity assurance is requested
        at a future time period.

     --zone=ZONE
        Zone of the future reservation to update. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

     Manage the auto-delete time properties.

     At most one of these can be specified:

       --auto-created-reservations-delete-time=AUTO_CREATED_RESERVATIONS_DELETE_TIME
          Automatically deletes an auto-created reservations at a specific
          time. The specified time must be an RFC3339 timestamp, which must be
          formatted as "YYYY-MM-DDTHH:MM:SSZ" where YYYY = year, MM = month, DD
          = day, HH = hours, MM = minutes, SS = seconds, and Z = time zone in
          Coordinated Universal Time (UTC). For example, specify
          2021-11-20T07:00:00Z.

       --auto-created-reservations-duration=AUTO_CREATED_RESERVATIONS_DURATION
          Automatically deletes an auto-created reservations after a specified
          number of days, hours, minutes, or seconds. For example, specify 30m
          for 30 minutes, or 1d2h3m4s for 1 day, 2 hours, 3 minutes, and 4
          seconds. For more information, see $ gcloud topic datetimes.

     Manage the name-prefix of a future reservation.

     At most one of these can be specified:

       --clear-name-prefix
          Clears the name prefix for the system generated reservations.

       --name-prefix=NAME_PREFIX
          A name prefix for the auto-created reservations when capacity is
          delivered at the start time. Each auto-created reservation name
          starts with the name prefix.

     Manage the properties of a shared future reservation.

     At most one of these can be specified:

       --clear-share-settings
          Clear share settings on future reservation. This will result in
          non-shared future reservation.

       Or at least one of these can be specified:

         Manage the share settings of a future reservation.

         --share-setting=SHARE_SETTING
            Specify if this future reservation is shared, and if so, the type
            of sharing. If you omit this flag, this value is local by default.
            SHARE_SETTING must be one of: local, projects.

         --share-with=PROJECT,[PROJECT,...]
            If this future reservation is shared, provide a comma-separated
            list of projects that this future reservation is shared with. The
            list must contain project IDs or project numbers.

     Manage the commitment info properties

     --commitment-name=COMMITMENT_NAME
        Name of commitment covering the delivered reservation at the time of
        delivery of future reservations. If not specified, it takes the name of
        the future reservation.

     --commitment-plan=COMMITMENT_PLAN
        The plan for this commitment to be created, which determines duration
        and discount rate. The currently supported plans are TWELVE_MONTH (1
        year), and THIRTY_SIX_MONTH (3 years). COMMITMENT_PLAN must be one of:
        TWELVE_MONTH, THIRTY_SIX_MONTH.

     --previous-commitment-terms=PREVIOUS_COMMITMENT_TERMS
        Applicable only if future reservation will deliver to an existing
        reservation with a ramp plan. When set to EXTEND, all associated parent
        Committed Used Discount's end-date/term will be extended to the
        end-time of this future reservation. Default is to extend previous
        commitment's time to the end_time of the reservation.
        PREVIOUS_COMMITMENT_TERMS must be (only one value is supported):
        EXTEND.

     Manage the specific SKU reservation properties.

     --machine-type=MACHINE_TYPE
        The predefined or custom machine type that you want to reserve. To
        supply a custom machine type, the string must be formatted precisely
        with the word custom, a hyphen, the integer number of vCPUs, a hyphen,
        and the integer amount of memory in megabytes. For example,
        custom-32-29440 configures 32 vCPUs and 29440 MB of memory. Only future
        reservations support custom machine types. Future reservations in
        calendar mode only support predefined machine types.

        Different reservation types restrict the available machine series. To
        review the machine series and types that each reservation type
        supports, see
        https://docs.cloud.google.com/compute/docs/instances/choose-reservation-type#comparison

     --min-cpu-platform=MIN_CPU_PLATFORM
        Optional minimum CPU platform of the reservation to create.

     Manage the accelerators of a future reservation.

     At most one of these can be specified:

       --accelerator=[count=COUNT],[type=TYPE]
          Manage the configuration of the type and number of accelerator cards
          attached.
           count
              The number of accelerators to attach to each instance in the
              reservation.
           type
              The specific type (e.g. nvidia-tesla-k80 for nVidia Tesla K80) of
              accelerator to attach to instances in the reservation. Use gcloud
              compute accelerator-types list to learn about all available
              accelerator types.

       --clear-accelerator
          Remove all accelerators from the future reservation.

     Manage the local ssd of a future reservation.

     At most one of these can be specified:

       --clear-local-ssd
          Remove all local ssd information on the future reservation.

       --local-ssd=[count=COUNT],[interface=INTERFACE],[size=SIZE]
          Manage the size and the interface of local SSD to use. See
          https://cloud.google.com/compute/docs/disks/local-ssd for more
          information.
           interface
              The kind of disk interface exposed to the VM for this SSD. Valid
              values are scsi and nvme. SCSI is the default and is supported by
              more guest operating systems. NVME may provide higher
              performance.
           size
              The size of the local SSD in base-2 GB.
           count
              The number of local SSD to use per VM. If you don't specify this
              argument, then the default value is 1.

     Manage the time specific properties for requesting future capacity

     --start-time=START_TIME
        Start time of the Future Reservation. The start time must be an RFC3339
        valid string formatted by date, time, and timezone or
        "YYYY-MM-DDTHH:MM:SSZ"; where YYYY = year, MM = month, DD = day, HH =
        hours, MM = minutes, SS = seconds, and Z = timezone (i.e.
        2021-11-20T07:00:00Z).

     At most one of these can be specified:

       --duration=DURATION
          Alternate way of specifying time in the number of seconds to
          terminate capacity request relative to the start time of a request.

       --end-time=END_TIME
          End time of the Future Reservation. The end time must be an RFC3339
          valid string formatted by date, time, and timezone or
          "YYYY-MM-DDTHH:MM:SSZ"; where YYYY = year, MM = month, DD = day, HH =
          hours, MM = minutes, SS = seconds, and Z = timezone (i.e.
          2021-11-20T07:00:00Z).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute future-reservations update

        $ gcloud beta compute future-reservations update
```

### gcloud beta compute future-reservations cancel

```text
NAME
    gcloud beta compute future-reservations cancel - cancel a Compute Engine
        future reservation

SYNOPSIS
    gcloud beta compute future-reservations cancel
        (FUTURE_RESERVATION : --zone=ZONE) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute future-reservations create

```text
NAME
    gcloud beta compute future-reservations create - create a Compute Engine
        future reservation

SYNOPSIS
    gcloud beta compute future-reservations create FUTURE_RESERVATION
        --[no-]auto-delete-auto-created-reservations
        (--source-instance-template=SOURCE_INSTANCE_TEMPLATE
          | [--machine-type=MACHINE_TYPE
          : --accelerator=[count=COUNT],[type=TYPE]
          --local-ssd=[count=COUNT],[interface=INTERFACE],[size=SIZE]
          --min-cpu-platform=MIN_CPU_PLATFORM] | [--tpu-version=TPU_VERSION
          : --chip-count=CHIP_COUNT --workload-type=WORKLOAD_TYPE])
        (--start-time=START_TIME (--duration=DURATION | --end-time=END_TIME))
        [--deployment-type=DEPLOYMENT_TYPE] [--description=DESCRIPTION]
        [--name-prefix=NAME_PREFIX] [--planning-status=PLANNING_STATUS]
        [--[no-]require-specific-reservation]
        [--reservation-mode=RESERVATION_MODE]
        [--reservation-name=RESERVATION_NAME]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--scheduling-type=SCHEDULING_TYPE] [--total-count=TOTAL_COUNT]
        [--zone=ZONE]
        [--auto-created-reservations-delete-time=AUTO_CREATED_RESERVATIONS_DELETE_TIME | --auto-created-reservations-duration=AUTO_CREATED_RESERVATIONS_DURATION]
        [--commitment-name=COMMITMENT_NAME --commitment-plan=COMMITMENT_PLAN
          --previous-commitment-terms=PREVIOUS_COMMITMENT_TERMS]
        [--share-setting=SHARE_SETTING --share-with=PROJECT,[PROJECT,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute future-reservations delete

```text
NAME
    gcloud beta compute future-reservations delete - delete a Compute Engine
        future reservation

SYNOPSIS
    gcloud beta compute future-reservations delete
        (FUTURE_RESERVATION : --zone=ZONE) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute future-reservations describe

```text
NAME
    gcloud beta compute future-reservations describe - show details about a
        Compute Engine future reservation

SYNOPSIS
    gcloud beta compute future-reservations describe
        (FUTURE_RESERVATION : --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute future-reservations list

```text
NAME
    gcloud beta compute future-reservations list - list Compute Engine future
        reservations

SYNOPSIS
    gcloud beta compute future-reservations list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute future-reservations update

```text
NAME
    gcloud beta compute future-reservations update - update Compute Engine
        future reservations

SYNOPSIS
    gcloud beta compute future-reservations update FUTURE_RESERVATION
        [--[no-]auto-delete-auto-created-reservations]
        [--deployment-type=DEPLOYMENT_TYPE] [--description=DESCRIPTION]
        [--[no-]enable-emergent-maintenance]
        [--planning-status=PLANNING_STATUS]
        [--[no-]require-specific-reservation]
        [--reservation-name=RESERVATION_NAME]
        [--scheduling-type=SCHEDULING_TYPE] [--total-count=TOTAL_COUNT]
        [--zone=ZONE]
        [--auto-created-reservations-delete-time=AUTO_CREATED_RESERVATIONS_DELETE_TIME | --auto-created-reservations-duration=AUTO_CREATED_RESERVATIONS_DURATION]
        [--clear-name-prefix | --name-prefix=NAME_PREFIX]
        [--clear-share-settings
          | --share-setting=SHARE_SETTING --share-with=PROJECT,[PROJECT,...]]
        [--commitment-name=COMMITMENT_NAME --commitment-plan=COMMITMENT_PLAN
          --previous-commitment-terms=PREVIOUS_COMMITMENT_TERMS]
        [--machine-type=MACHINE_TYPE --min-cpu-platform=MIN_CPU_PLATFORM
          --accelerator=[count=COUNT],[type=TYPE]
          | --clear-accelerator --clear-local-ssd
          | --local-ssd=[count=COUNT],[interface=INTERFACE],[size=SIZE]]
        [--start-time=START_TIME --duration=DURATION | --end-time=END_TIME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute future-reservations cancel

```text
NAME
    gcloud alpha compute future-reservations cancel - cancel a Compute Engine
        future reservation

SYNOPSIS
    gcloud alpha compute future-reservations cancel
        (FUTURE_RESERVATION : --zone=ZONE) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute future-reservations create

```text
NAME
    gcloud alpha compute future-reservations create - create a Compute Engine
        future reservation

SYNOPSIS
    gcloud alpha compute future-reservations create FUTURE_RESERVATION
        --[no-]auto-delete-auto-created-reservations
        (--source-instance-template=SOURCE_INSTANCE_TEMPLATE
          | [--machine-type=MACHINE_TYPE
          : --accelerator=[count=COUNT],[type=TYPE]
          --local-ssd=[count=COUNT],[interface=INTERFACE],[size=SIZE]
          --maintenance-freeze-duration=MAINTENANCE_FREEZE_DURATION
          --maintenance-interval=MAINTENANCE_INTERVAL
          --min-cpu-platform=MIN_CPU_PLATFORM] | [--tpu-version=TPU_VERSION
          : --chip-count=CHIP_COUNT --workload-type=WORKLOAD_TYPE])
        (--start-time=START_TIME (--duration=DURATION | --end-time=END_TIME))
        [--deployment-type=DEPLOYMENT_TYPE] [--description=DESCRIPTION]
        [--name-prefix=NAME_PREFIX] [--planning-status=PLANNING_STATUS]
        [--[no-]require-specific-reservation]
        [--reservation-mode=RESERVATION_MODE]
        [--reservation-name=RESERVATION_NAME]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--scheduling-type=SCHEDULING_TYPE] [--total-count=TOTAL_COUNT]
        [--zone=ZONE]
        [--auto-created-reservations-delete-time=AUTO_CREATED_RESERVATIONS_DELETE_TIME | --auto-created-reservations-duration=AUTO_CREATED_RESERVATIONS_DURATION]
        [--commitment-name=COMMITMENT_NAME --commitment-plan=COMMITMENT_PLAN
          --previous-commitment-terms=PREVIOUS_COMMITMENT_TERMS]
        [--share-setting=SHARE_SETTING --share-with=PROJECT,[PROJECT,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute future-reservations delete

```text
NAME
    gcloud alpha compute future-reservations delete - delete a Compute Engine
        future reservation

SYNOPSIS
    gcloud alpha compute future-reservations delete
        (FUTURE_RESERVATION : --zone=ZONE) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute future-reservations describe

```text
NAME
    gcloud alpha compute future-reservations describe - show details about a
        Compute Engine future reservation

SYNOPSIS
    gcloud alpha compute future-reservations describe
        (FUTURE_RESERVATION : --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute future-reservations list

```text
NAME
    gcloud alpha compute future-reservations list - list Compute Engine future
        reservations

SYNOPSIS
    gcloud alpha compute future-reservations list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute future-reservations update

```text
NAME
    gcloud alpha compute future-reservations update - update Compute Engine
        future reservations

SYNOPSIS
    gcloud alpha compute future-reservations update FUTURE_RESERVATION
        [--[no-]auto-delete-auto-created-reservations]
        [--deployment-type=DEPLOYMENT_TYPE] [--description=DESCRIPTION]
        [--[no-]enable-emergent-maintenance]
        [--planning-status=PLANNING_STATUS]
        [--[no-]require-specific-reservation]
        [--reservation-name=RESERVATION_NAME]
        [--scheduling-type=SCHEDULING_TYPE] [--total-count=TOTAL_COUNT]
        [--zone=ZONE]
        [--auto-created-reservations-delete-time=AUTO_CREATED_RESERVATIONS_DELETE_TIME | --auto-created-reservations-duration=AUTO_CREATED_RESERVATIONS_DURATION]
        [--clear-name-prefix | --name-prefix=NAME_PREFIX]
        [--clear-share-settings
          | --share-setting=SHARE_SETTING --share-with=PROJECT,[PROJECT,...]]
        [--commitment-name=COMMITMENT_NAME --commitment-plan=COMMITMENT_PLAN
          --previous-commitment-terms=PREVIOUS_COMMITMENT_TERMS]
        [--machine-type=MACHINE_TYPE
          --maintenance-interval=MAINTENANCE_INTERVAL
          --min-cpu-platform=MIN_CPU_PLATFORM
          --accelerator=[count=COUNT],[type=TYPE]
          | --clear-accelerator --clear-local-ssd
          | --local-ssd=[count=COUNT],[interface=INTERFACE],[size=SIZE]]
        [--start-time=START_TIME --duration=DURATION | --end-time=END_TIME]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/future-reservations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
