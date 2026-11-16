---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/commitments
---

# gcloud compute commitments

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute commitments create

```text
NAME
    gcloud compute commitments create - create Compute Engine commitments

SYNOPSIS
    gcloud compute commitments create COMMITMENT --plan=PLAN
        (--resources=[local-ssd=LOCAL-SSD],[memory=MEMORY],[vcpu=VCPU]
          --resources-accelerator=[count=COUNT],[type=TYPE]) [--auto-renew]
        [--custom-end-time=CUSTOM_END_TIME]
        [--merge-source-commitments=MERGE_SOURCE_COMMITMENTS] [--region=REGION]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--split-source-commitment=SPLIT_SOURCE_COMMITMENT]
        [--type=TYPE; default="general-purpose"]
        [--existing-reservation=[name=NAME],[zone=ZONE]
          | --reservations-from-file=PATH_TO_FILE | [--reservation=RESERVATION
          : --reservation-zone=RESERVATION_ZONE
          --accelerator=[count=COUNT],[type=TYPE]
          --local-ssd=[interface=INTERFACE],[size=SIZE]
          --machine-type=MACHINE_TYPE --min-cpu-platform=MIN_CPU_PLATFORM
          --require-specific-reservation --resource-policies=[KEY=VALUE,...]
          --vm-count=VM_COUNT --share-setting=SHARE_SETTING
          --share-with=SHARE_WITH,[SHARE_WITH,...]]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create Compute Engine commitments.

EXAMPLES
    To create a commitment called commitment-1 in the us-central1 region, with
    a 12-month plan, 9GB of memory and 4 vcpu cores, run:

        $ gcloud compute commitments create commitment-1 --plan=12-month \
            --resources=memory=9GB,vcpu=4 --region=us-central1

POSITIONAL ARGUMENTS
     COMMITMENT
        Name of the commitment to create.

REQUIRED FLAGS
     --plan=PLAN
        Duration of the commitment. PLAN must be one of: 12-month, 36-month.

     Manage the commitment for particular resources.

     At least one of these must be specified:

       --resources=[local-ssd=LOCAL-SSD],[memory=MEMORY],[vcpu=VCPU]
          Resources to be included in the commitment. For details and examples
          of valid specifications, refer to the custom machine type guide
          (https://cloud.google.com/compute/docs/instances/creating-instance-with-custom-machine-type#specifications).
           memory
              The size of the memory, should include units (e.g. 3072MB or
              9GB). If no units are specified, GB is assumed.
           vcpu
              The number of the vCPU cores.
           local-ssd
              The size of local SSD.

       --resources-accelerator=[count=COUNT],[type=TYPE]
          Manage the configuration of the type and number of accelerator cards
          to include in the commitment.
           count
              The number of accelerators to include.
           type
              The specific type (e.g. nvidia-tesla-k80 for NVIDIA Tesla K80) of
              the accelerator. Use gcloud compute accelerator-types list to
              learn about all available accelerator types.

OPTIONAL FLAGS
     --auto-renew
        Enable auto renewal for the commitment.

     --custom-end-time=CUSTOM_END_TIME
        Specifies a custom future end date and extends the commitment's ongoing
        term.

     --merge-source-commitments=MERGE_SOURCE_COMMITMENTS
        Creates the new commitment by merging the specified source commitments
        and combining their resources.

     --region=REGION
        Region of the commitment to create. If not specified, you might be
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

     --resource-manager-tags=[KEY=VALUE,...]
        Resource manager tags to be bound to the commitment.

     --split-source-commitment=SPLIT_SOURCE_COMMITMENT
        Creates the new commitment by splitting the specified source commitment
        and redistributing the specified resources.

     --type=TYPE; default="general-purpose"
        Type of commitment. memory-optimized indicates that the commitment is
        for memory-optimized VMs. TYPE must be one of: accelerator-optimized,
        accelerator-optimized-a3, accelerator-optimized-a3-mega,
        accelerator-optimized-a3-ultra, accelerator-optimized-a4,
        compute-optimized, compute-optimized-c2d, compute-optimized-c3,
        compute-optimized-c3d, compute-optimized-h3, compute-optimized-h4d,
        compute-optimized-h4d-3tb, general-purpose, general-purpose-c4,
        general-purpose-c4a, general-purpose-c4d, general-purpose-e2,
        general-purpose-n2, general-purpose-n2d, general-purpose-n4,
        general-purpose-n4a, general-purpose-n4d, general-purpose-t2d,
        graphics-optimized, graphics-optimized-g4, graphics-optimized-g4-vgpu,
        memory-optimized, memory-optimized-m3, memory-optimized-m4,
        memory-optimized-m4-6tb, memory-optimized-m4n,
        memory-optimized-m4n-6tb, memory-optimized-x4-1440-24t,
        memory-optimized-x4-16tb, memory-optimized-x4-1920-32t,
        memory-optimized-x4-24tb, memory-optimized-x4-32tb,
        memory-optimized-x4-480-6t, memory-optimized-x4-480-8t,
        memory-optimized-x4-960-12t, memory-optimized-x4-960-16t,
        memory-optimized-x5-1376-24t, memory-optimized-x5-1376-32t,
        memory-optimized-x5-2064-48t, memory-optimized-x5-688-12t,
        memory-optimized-x5-688-16t, network-optimized-c4n,
        network-optimized-u4c, network-optimized-u4p, network-optimized-u4s,
        storage-optimized-z3, storage-optimized-z4d4t, storage-optimized-z4dh,
        storage-optimized-z4ds, storage-optimized-z4m.

     Manage the reservations to be created with the commitment.

     At most one of these can be specified:

       --existing-reservation=[name=NAME],[zone=ZONE]
          Details of the existing on-demand reservation or auto-created future
          reservation that you want to attach to your commitment. Specify a new
          instance of this flag for every existing reservation that you want to
          attach. The reservations must be in the same region as the
          commitment.
           name
              The name of the reservation.
           zone
              The zone of the reservation. For example, to attach an existing
              reservation named reservation-name in the zone reservation-zone,
              use the following text:
              --existing-reservation=name=reservation-name,zone=reservation-zone

       --reservations-from-file=PATH_TO_FILE
          Path to a YAML file of multiple reservations' configuration. Use a
          full or relative path to a local file containing the value of
          reservations.

       Or at least one of these can be specified:

         Manage the reservation to be created with the commitment.

         --reservation=RESERVATION
            Name of the reservation to operate on.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --reservation-zone=RESERVATION_ZONE
            Zone of the reservation to operate on. If not specified and the
            compute/zone property isn't set, you might be prompted to select a
            zone (interactive mode only).

            To avoid prompting when this flag is omitted, you can set the
            compute/zone property:

                $ gcloud config set compute/zone ZONE

            A list of zones can be fetched by running:

                $ gcloud compute zones list

            To unset the property, run:

                $ gcloud config unset compute/zone

            Alternatively, the zone can be stored in the environment variable
            CLOUDSDK_COMPUTE_ZONE.

         Manage the specific SKU reservation properties to create.

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

         --local-ssd=[interface=INTERFACE],[size=SIZE]
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

         --machine-type=MACHINE_TYPE
            The predefined or custom machine type that you want to reserve. To
            supply a custom machine type, the string must be formatted
            precisely with the word custom, a hyphen, the integer number of
            vCPUs, a hyphen, and the integer amount of memory in megabytes. For
            example, custom-32-29440 configures 32 vCPUs and 29440 MB of
            memory.

            Different reservation types restrict the available machine series.
            To review the machine series and types that each reservation type
            supports, see
            https://docs.cloud.google.com/compute/docs/instances/choose-reservation-type#comparison

         --min-cpu-platform=MIN_CPU_PLATFORM
            Optional minimum CPU platform of the reservation to create.

         --require-specific-reservation
            Indicates whether the reservation can be consumed by VMs with "any
            reservation" defined. If enabled, then only VMs that target this
            reservation by name using --reservation-affinity=specific can
            consume from this reservation.

         --resource-policies=[KEY=VALUE,...]
            The resource policies to include in this reservation. If you omit
            this flag, no resource policies are added. You can specify any
            string as the key, and specify the name of a resource policy as the
            value.

         --vm-count=VM_COUNT
            The number of VM instances that are allocated to this reservation.
            The value of this field must be an int in the range [1, 1000].

         Manage the properties of a shared reservation to create

         --share-setting=SHARE_SETTING
            The projects that can use the reservation. SHARE_SETTING must be
            one of:

             local
                Only your project can use the reservation. This is the default
                value.
             projects
                Your project and up to 100 other projects within your project's
                organization can use the reservation. If you specify this
                value, then you must also include the --share-with flag in the
                command.

         --share-with=SHARE_WITH,[SHARE_WITH,...]
            If this reservation is shared (--share-setting=projects), then
            specify a comma-separated list of projects to share the reservation
            with. List projects using project IDs or project numbers.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute commitments create

        $ gcloud beta compute commitments create
```

### gcloud compute commitments create-license

```text
NAME
    gcloud compute commitments create-license - create Compute Engine
        license-based commitments

SYNOPSIS
    gcloud compute commitments create-license COMMITMENT --amount=AMOUNT
        --license=LICENSE --plan=PLAN [--cores-per-license=CORES_PER_LICENSE]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create Compute Engine license-based commitments.

EXAMPLES
    To create a commitment called commitment-1 in the us-central1 region with
    36-month plan, sles-sap-12 license, 1-2 cores, run:

        $ gcloud compute commitments create-license commitment-1 \
            --plan=36-month \
            --license=https://www.googleapis.com/compute/v1/projects/\
        suse-sap-cloud/global/licenses/sles-sap-12 --region=us-central1 \
            --amount=1 --cores-per-license=1-2

POSITIONAL ARGUMENTS
     COMMITMENT
        Name of the commitment to create.

REQUIRED FLAGS
     --amount=AMOUNT
        Number of licenses purchased.

     --license=LICENSE
        Applicable license URI. For example:
        https://www.googleapis.com/compute/v1/projects/suse-sap-cloud/global/licenses/sles-sap-12

     --plan=PLAN
        Duration of the commitment. PLAN must be one of: 12-month, 36-month.

OPTIONAL FLAGS
     --cores-per-license=CORES_PER_LICENSE
        Core range of the instance. Must be one of: 1-2, 3-4, 5+. Required for
        SAP licenses.

     --region=REGION
        Region of the commitment to create. If not specified, you might be
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute commitments create-license

        $ gcloud beta compute commitments create-license
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute commitments create-license commitment-1 \
    --plan=36-month \
    --license=https://www.googleapis.com/compute/v1/projects/suse-sap-cloud/global/licenses/sles-sap-12 \
    --region=us-central1 \
    --amount=1 \
    --cores-per-license=1-2
```

### gcloud compute commitments describe

```text
NAME
    gcloud compute commitments describe - describe a Compute Engine commitment

SYNOPSIS
    gcloud compute commitments describe COMMITMENT [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute commitments describe displays all data associated with a
    Compute Engine resource-based commitment.

    Note that the memory capacity returned by this command is in MB (where 1 MB
    = 2^20 bytes, equivalent to MiB).

    In contrast, the gcloud compute commitments create command and the Web
    Console default to GB (where 1 GB = 2^30 bytes, equivalent to GiB). If you
    plan to repurchase commitments for your resources by using the Google Cloud
    console or the gcloud compute commitments create command, then don't reuse
    the memory numbers directly from the output of the describe command. Make
    sure to convert the memory amount to GB first. Otherwise, you end up
    purchasing a commitment for 1024 times the intended amount.

    Local SSD capacity, however, is consistently measured in GB across both
    describe and create commands.

EXAMPLES
    To describe the commitment called commitment-1 in the us-central1 region,
    run:

        $ gcloud compute commitments describe commitment-1 \
            --region=us-central1

POSITIONAL ARGUMENTS
     COMMITMENT
        Name of the commitment to describe.

FLAGS
     --region=REGION
        Region of the commitment to describe. If not specified, you might be
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute commitments describe

        $ gcloud beta compute commitments describe
```

### gcloud compute commitments list

```text
NAME
    gcloud compute commitments list - list Compute Engine commitments

SYNOPSIS
    gcloud compute commitments list [NAME ...] [--regexp=REGEXP, -r REGEXP]
        [--regions=REGION,[REGION,...]] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Compute Engine commitments.

EXAMPLES
    To list commitments, run:

        $ gcloud compute commitments list

POSITIONAL ARGUMENTS
     [NAME ...]
        (DEPRECATED) If provided, show details for the specified names and/or
        URIs of resources.

        Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )"
        instead.

FLAGS
     --regexp=REGEXP, -r REGEXP
        (DEPRECATED) Regular expression to filter the names of the results on.
        Any names that do not match the entire regular expression will be
        filtered out.

        Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.

     --regions=REGION,[REGION,...]
        If provided, only resources from the given regions are queried.

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

        $ gcloud alpha compute commitments list

        $ gcloud beta compute commitments list
```

### gcloud compute commitments update

```text
NAME
    gcloud compute commitments update - update Compute Engine commitments

SYNOPSIS
    gcloud compute commitments update COMMITMENT [--auto-renew]
        [--custom-end-time=CUSTOM_END_TIME] [--plan=PLAN] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update Compute Engine commitments.

EXAMPLES
    To enable auto renewal on a commitment called commitment-1 in the
    us-central1 region, run:

        $ gcloud compute commitments update commitment-1 --auto-renew \
            --region=us-central1

    To disable auto renewal on a commitment called commitment-1 in the
    us-central1 region, run:

        $ gcloud compute commitments update commitment-1 --no-auto-renew \
            --region=us-central1

    To upgrade the term of a commitment called commitment-1 from 12-month to
    36-month, in the us-central1 region, run:

        $ gcloud compute commitments update commitment-1 --plan=36-month \
            --region=us-central1

POSITIONAL ARGUMENTS
     COMMITMENT
        Name of the commitment to update.

FLAGS
     --auto-renew
        Enable auto renewal for the commitment.

     --custom-end-time=CUSTOM_END_TIME
        Specifies a custom future end date and extends the commitment's ongoing
        term.

     --plan=PLAN
        Duration of the commitment. PLAN must be (only one value is supported):
        36-month.

     --region=REGION
        Region of the commitment to update. If not specified, you might be
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute commitments update

        $ gcloud beta compute commitments update
```

### gcloud beta compute commitments create

```text
NAME
    gcloud beta compute commitments create - create Compute Engine commitments

SYNOPSIS
    gcloud beta compute commitments create COMMITMENT --plan=PLAN
        (--resources=[local-ssd=LOCAL-SSD],[memory=MEMORY],[vcpu=VCPU]
          --resources-accelerator=[count=COUNT],[type=TYPE]) [--auto-renew]
        [--custom-end-time=CUSTOM_END_TIME]
        [--merge-source-commitments=MERGE_SOURCE_COMMITMENTS] [--region=REGION]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--split-source-commitment=SPLIT_SOURCE_COMMITMENT]
        [--type=TYPE; default="general-purpose"]
        [--existing-reservation=[name=NAME],[zone=ZONE]
          | --reservations-from-file=PATH_TO_FILE | [--reservation=RESERVATION
          : --reservation-sharing-policy=RESERVATION_SHARING_POLICY
          --reservation-zone=RESERVATION_ZONE
          --accelerator=[count=COUNT],[type=TYPE]
          --local-ssd=[interface=INTERFACE],[size=SIZE]
          --machine-type=MACHINE_TYPE
          --maintenance-interval=MAINTENANCE_INTERVAL
          --min-cpu-platform=MIN_CPU_PLATFORM --require-specific-reservation
          --resource-policies=[KEY=VALUE,...] --vm-count=VM_COUNT
          --share-setting=SHARE_SETTING
          --share-with=SHARE_WITH,[SHARE_WITH,...]]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute commitments create-license

```text
NAME
    gcloud beta compute commitments create-license - create Compute Engine
        license-based commitments

SYNOPSIS
    gcloud beta compute commitments create-license COMMITMENT --amount=AMOUNT
        --license=LICENSE --plan=PLAN [--cores-per-license=CORES_PER_LICENSE]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute commitments describe

```text
NAME
    gcloud beta compute commitments describe - describe a Compute Engine
        commitment

SYNOPSIS
    gcloud beta compute commitments describe COMMITMENT [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute commitments list

```text
NAME
    gcloud beta compute commitments list - list Compute Engine commitments

SYNOPSIS
    gcloud beta compute commitments list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute commitments update

```text
NAME
    gcloud beta compute commitments update - update Compute Engine commitments

SYNOPSIS
    gcloud beta compute commitments update COMMITMENT [--auto-renew]
        [--custom-end-time=CUSTOM_END_TIME] [--plan=PLAN] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute commitments update-reservations

```text
NAME
    gcloud beta compute commitments update-reservations - update the resource
        shape of reservations within the commitment

SYNOPSIS
    gcloud beta compute commitments update-reservations COMMITMENT
        [--region=REGION]
        [--reservations-from-file=PATH_TO_FILE
          | [--dest-reservation=[machine-type=MACHINE-TYPE],
          [min-cpu-platform=MIN-CPU-PLATFORM],
          [require-specific-reservation=REQUIRE-SPECIFIC-RESERVATION],
          [reservation=RESERVATION],
          [reservation-zone=RESERVATION-ZONE],[vm-count=VM-COUNT]
          --source-reservation=[machine-type=MACHINE-TYPE],
          [min-cpu-platform=MIN-CPU-PLATFORM],
          [require-specific-reservation=REQUIRE-SPECIFIC-RESERVATION],
          [reservation=RESERVATION],
          [reservation-zone=RESERVATION-ZONE],[vm-count=VM-COUNT]
          : --dest-accelerator=[count=COUNT],[type=TYPE]
          --dest-local-ssd=[interface=INTERFACE],[size=SIZE]
          --dest-share-setting=DEST_SHARE_SETTING
          --dest-share-with=SHARE_WITH,[SHARE_WITH,...]
          --source-accelerator=[count=COUNT],[type=TYPE]
          --source-local-ssd=[interface=INTERFACE],[size=SIZE]
          --source-share-setting=SOURCE_SHARE_SETTING
          --source-share-with=SHARE_WITH,[SHARE_WITH,...]]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute commitments calculate-cancellation-fee

```text
NAME
    gcloud alpha compute commitments calculate-cancellation-fee - calculate the
        cancellation fee for a Compute Engine commitment

SYNOPSIS
    gcloud alpha compute commitments calculate-cancellation-fee COMMITMENT
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute commitments create

```text
NAME
    gcloud alpha compute commitments create - create Compute Engine commitments

SYNOPSIS
    gcloud alpha compute commitments create COMMITMENT --plan=PLAN
        (--resources=[local-ssd=LOCAL-SSD],[memory=MEMORY],[vcpu=VCPU]
          --resources-accelerator=[count=COUNT],[type=TYPE]) [--auto-renew]
        [--custom-end-time=CUSTOM_END_TIME]
        [--merge-source-commitments=MERGE_SOURCE_COMMITMENTS] [--region=REGION]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--split-source-commitment=SPLIT_SOURCE_COMMITMENT]
        [--type=TYPE; default="general-purpose"]
        [--existing-reservation=[name=NAME],[zone=ZONE]
          | --reservations-from-file=PATH_TO_FILE | [--reservation=RESERVATION
          : --reservation-sharing-policy=RESERVATION_SHARING_POLICY
          --reservation-zone=RESERVATION_ZONE
          --accelerator=[count=COUNT],[type=TYPE]
          --local-ssd=[interface=INTERFACE],[size=SIZE]
          --machine-type=MACHINE_TYPE
          --maintenance-interval=MAINTENANCE_INTERVAL
          --min-cpu-platform=MIN_CPU_PLATFORM --require-specific-reservation
          --resource-policies=[KEY=VALUE,...] --vm-count=VM_COUNT
          --share-setting=SHARE_SETTING
          --share-with=SHARE_WITH,[SHARE_WITH,...]]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute commitments create-license

```text
NAME
    gcloud alpha compute commitments create-license - create Compute Engine
        license-based commitments

SYNOPSIS
    gcloud alpha compute commitments create-license COMMITMENT --amount=AMOUNT
        --license=LICENSE --plan=PLAN [--cores-per-license=CORES_PER_LICENSE]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute commitments describe

```text
NAME
    gcloud alpha compute commitments describe - describe a Compute Engine
        commitment

SYNOPSIS
    gcloud alpha compute commitments describe COMMITMENT [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute commitments list

```text
NAME
    gcloud alpha compute commitments list - list Compute Engine commitments

SYNOPSIS
    gcloud alpha compute commitments list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute commitments test-iam-permissions

```text
NAME
    gcloud alpha compute commitments test-iam-permissions - test IAM
        permissions for a Compute Engine commitment

SYNOPSIS
    gcloud alpha compute commitments test-iam-permissions
        (COMMITMENT : --region=REGION) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute commitments update

```text
NAME
    gcloud alpha compute commitments update - update Compute Engine commitments

SYNOPSIS
    gcloud alpha compute commitments update COMMITMENT [--auto-renew]
        [--custom-end-time=CUSTOM_END_TIME] [--plan=PLAN] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute commitments update-reservations

```text
NAME
    gcloud alpha compute commitments update-reservations - update the resource
        shape of reservations within the commitment

SYNOPSIS
    gcloud alpha compute commitments update-reservations COMMITMENT
        [--region=REGION]
        [--reservations-from-file=PATH_TO_FILE
          | [--dest-reservation=[machine-type=MACHINE-TYPE],
          [min-cpu-platform=MIN-CPU-PLATFORM],
          [require-specific-reservation=REQUIRE-SPECIFIC-RESERVATION],
          [reservation=RESERVATION],
          [reservation-zone=RESERVATION-ZONE],[vm-count=VM-COUNT]
          --source-reservation=[machine-type=MACHINE-TYPE],
          [min-cpu-platform=MIN-CPU-PLATFORM],
          [require-specific-reservation=REQUIRE-SPECIFIC-RESERVATION],
          [reservation=RESERVATION],
          [reservation-zone=RESERVATION-ZONE],[vm-count=VM-COUNT]
          : --dest-accelerator=[count=COUNT],[type=TYPE]
          --dest-local-ssd=[interface=INTERFACE],[size=SIZE]
          --dest-share-setting=DEST_SHARE_SETTING
          --dest-share-with=SHARE_WITH,[SHARE_WITH,...]
          --source-accelerator=[count=COUNT],[type=TYPE]
          --source-local-ssd=[interface=INTERFACE],[size=SIZE]
          --source-share-setting=SOURCE_SHARE_SETTING
          --source-share-with=SHARE_WITH,[SHARE_WITH,...]]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute commitments list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute commitments list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/commitments (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
