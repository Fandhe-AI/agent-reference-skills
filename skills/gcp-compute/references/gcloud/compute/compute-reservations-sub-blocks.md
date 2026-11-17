---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/reservations/sub-blocks
---

# gcloud compute reservations sub-blocks

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute reservations sub-blocks describe

```text
NAME
    gcloud compute reservations sub-blocks describe - describe a Compute Engine
        reservation sub-block

SYNOPSIS
    gcloud compute reservations sub-blocks describe RESERVATION
        --block-name=BLOCK_NAME --sub-block-name=SUB_BLOCK_NAME
        [--full-view=FULL_VIEW; default="SUB_BLOCK_VIEW_UNSPECIFIED"]
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Compute Engine reservation sub-block.

EXAMPLES
    To describe a reservation sub-block in reservation exr1 in my-zone with
    block name my-block and sub-block name my-sub-block, run:

        $ gcloud compute reservations sub-blocks describe exr1 \
            --zone=my-zone --block-name=my-block \
            --sub-block-name=my-sub-block

POSITIONAL ARGUMENTS
     RESERVATION
        Name of the reservation to describe.

REQUIRED FLAGS
     --block-name=BLOCK_NAME
        The name of the reservation block.

     --sub-block-name=SUB_BLOCK_NAME
        The name of the reservation sub block.

OPTIONAL FLAGS
     --full-view=FULL_VIEW; default="SUB_BLOCK_VIEW_UNSPECIFIED"
        The view type for the reservation sub-block. FULL_VIEW must be one of:

         SUB_BLOCK_VIEW_BASIC
            Basic default view of the reservation sub-block.
         SUB_BLOCK_VIEW_FULL
            Full detailed view of the reservation sub-block.

     --zone=ZONE
        Zone of the reservation to describe. If not specified and the
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute reservations sub-blocks describe

        $ gcloud beta compute reservations sub-blocks describe
```

### gcloud compute reservations sub-blocks get-version

```text
NAME
    gcloud compute reservations sub-blocks get-version - get the version of a
        reservation sub-block

SYNOPSIS
    gcloud compute reservations sub-blocks get-version RESERVATION
        --block-name=BLOCK_NAME --sub-block-name=SUB_BLOCK_NAME [--current]
        [--target] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the version of a reservation sub-block.

EXAMPLES
    To get the current version of a reservation sub-block in reservation exr-1
    in ZONE with block name block-1 and sub-block name sub-block-1, run:

        $ gcloud compute reservations sub-blocks get-version exr-1 \
            --zone=ZONE --block-name=block-1 --sub-block-name=sub-block-1 \
            --current

POSITIONAL ARGUMENTS
     RESERVATION
        Name of the reservation to get-version.

REQUIRED FLAGS
     --block-name=BLOCK_NAME
        The name of the reservation block.

     --sub-block-name=SUB_BLOCK_NAME
        The name of the reservation sub block.

OPTIONAL FLAGS
     --current
        Whether to get the current version.

     --target
        Whether to get the target version.

     --zone=ZONE
        Zone of the reservation to get-version. If not specified and the
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute reservations sub-blocks get-version

        $ gcloud beta compute reservations sub-blocks get-version
```

### gcloud compute reservations sub-blocks list

```text
NAME
    gcloud compute reservations sub-blocks list - list Compute Engine
        reservation sub-blocks

SYNOPSIS
    gcloud compute reservations sub-blocks list RESERVATION
        --block-name=BLOCK_NAME [--zone=ZONE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute reservations sub-blocks list displays all Compute Engine
    reservation sub-blocks in an extended reservation's block.

EXAMPLES
    To list all reservation sub-blocks in an extended reservation's block
    my-block in table form, run:

        $ gcloud compute reservations sub-blocks list extended-reservation \
            --block-name=my-block --zone=us-central1-a --project=my-project

    To list the URIs of all reservation blocks in an extended reservation, run:

        $ gcloud compute reservations sub-blocks list extended-reservation \
            --block-name=my-block --zone=us-central1-a \
            --project=my-project --uri

POSITIONAL ARGUMENTS
     RESERVATION
        Name of the reservation to list.

REQUIRED FLAGS
     --block-name=BLOCK_NAME
        The name of the reservation block.

FLAGS
     --zone=ZONE
        Zone of the reservation to list. If not specified and the compute/zone
        property isn't set, you might be prompted to select a zone (interactive
        mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

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

        $ gcloud alpha compute reservations sub-blocks list

        $ gcloud beta compute reservations sub-blocks list
```

### gcloud compute reservations sub-blocks perform-maintenance

```text
NAME
    gcloud compute reservations sub-blocks perform-maintenance - perform
        maintenance on a reservation sub-block

SYNOPSIS
    gcloud compute reservations sub-blocks perform-maintenance RESERVATION
        --block-name=BLOCK_NAME --sub-block-name=SUB_BLOCK_NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Perform maintenance on a reservation sub-block.

EXAMPLES
    To perform maintenance on a reservation sub-block in reservation exr-1 in
    ZONE with block name block-1 and sub-block name sub-block-1, run:

        $ gcloud compute reservations sub-blocks perform-maintenance exr-1 \
            --zone=ZONE --block-name=block-1 --sub-block-name=sub-block-1

POSITIONAL ARGUMENTS
     RESERVATION
        Name of the reservation to perform-maintenance.

REQUIRED FLAGS
     --block-name=BLOCK_NAME
        The name of the reservation block.

     --sub-block-name=SUB_BLOCK_NAME
        The name of the reservation sub block.

OPTIONAL FLAGS
     --zone=ZONE
        Zone of the reservation to perform-maintenance. If not specified and
        the compute/zone property isn't set, you might be prompted to select a
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute reservations sub-blocks perform-maintenance

        $ gcloud beta compute reservations sub-blocks perform-maintenance
```

### gcloud compute reservations sub-blocks report-subblock-as-faulty

```text
NAME
    gcloud compute reservations sub-blocks report-subblock-as-faulty - report a
        sub-block within a reservation as faulty

SYNOPSIS
    gcloud compute reservations sub-blocks report-subblock-as-faulty
        RESERVATION --block-name=BLOCK_NAME
        --disruption-schedule=DISRUPTION_SCHEDULE
        --failure-component=FAILURE_COMPONENT
        --fault-reasons=[behavior=BEHAVIOR],[description=DESCRIPTION]
        --sub-block-name=SUB_BLOCK_NAME [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Report a sub-block within a reservation as faulty.

EXAMPLES
    To report reservation exr-1 in ZONE with block name block-1 and sub block
    name sub-block-1 as faulty, run:

        $ gcloud compute reservations sub-blocks report-subblock-as-faulty \
            exr-1 --zone=ZONE --block-name=block-1 \
            --sub-block-name=sub-block-1 --disruption-schedule=IMMEDIATE \
            --fault-reasons=behavior=PERFORMANCE,description="performance \
        issues" --failure-component=NVLINK_SWITCH

POSITIONAL ARGUMENTS
     RESERVATION
        The name of the reservation containing the sub-block to report as
        faulty

REQUIRED FLAGS
     --block-name=BLOCK_NAME
        The name of the reservation block.

     --disruption-schedule=DISRUPTION_SCHEDULE
        The disruption schedule for the sub-block. DISRUPTION_SCHEDULE must be
        (only one value is supported):

         IMMEDIATE
            All VMs are immediately disrupted.

     --failure-component=FAILURE_COMPONENT
        The component that experienced the fault. FAILURE_COMPONENT must be one
        of:

         MULTIPLE_FAULTY_HOSTS
            Multiple hosts experienced the fault.
         NVLINK_SWITCH
            The NVLink switch experienced the fault.

     --fault-reasons=[behavior=BEHAVIOR],[description=DESCRIPTION]
        The reasons for reporting the sub-block as faulty. You can repeat this
        flag. Each flag must specify a "behavior" attribute and can optionally
        include a "description" attribute. The possible values for "behavior"
        are: PERFORMANCE, SWITCH_FAILURE, GPU_ERROR.

     --sub-block-name=SUB_BLOCK_NAME
        The name of the reservation sub block.

OPTIONAL FLAGS
     --zone=ZONE
        Zone of the reservation to report-subblock-as-faulty. If not specified
        and the compute/zone property isn't set, you might be prompted to
        select a zone (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute reservations sub-blocks \
            report-subblock-as-faulty

        $ gcloud beta compute reservations sub-blocks \
            report-subblock-as-faulty
```

### gcloud compute reservations sub-blocks set-iam-policy

```text
NAME
    gcloud compute reservations sub-blocks set-iam-policy - set the IAM policy
        binding for a Compute Engine reservation sub-block

SYNOPSIS
    gcloud compute reservations sub-blocks set-iam-policy RESERVATION
        POLICY_FILE --block-name=BLOCK_NAME --sub-block-name=SUB_BLOCK_NAME
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given reservation sub-block as defined in a
    JSON or YAML file.

EXAMPLES
    To set the IAM policy on a reservation sub-block in reservation
    my-reservation in zone us-central1-a with block name my-block and sub-block
    name my-sub-block using a policy file policy.json, run:

        $ gcloud compute reservations sub-blocks set-iam-policy \
            my-reservation policy.json --zone=us-central1-a \
            --block-name=my-block --sub-block-name=my-sub-block

POSITIONAL ARGUMENTS
     RESERVATION
        Name of the reservation to set-iam-policy.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

REQUIRED FLAGS
     --block-name=BLOCK_NAME
        The name of the reservation block.

     --sub-block-name=SUB_BLOCK_NAME
        The name of the reservation sub block.

OPTIONAL FLAGS
     --zone=ZONE
        Zone of the reservation to set-iam-policy. If not specified and the
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta compute reservations sub-blocks set-iam-policy
```

### gcloud compute reservations sub-blocks test-iam-permissions

```text
NAME
    gcloud compute reservations sub-blocks test-iam-permissions - test IAM
        permissions on a Compute Engine reservation sub-block

SYNOPSIS
    gcloud compute reservations sub-blocks test-iam-permissions RESERVATION
        --block-name=BLOCK_NAME --permissions=[PERMISSION,...]
        --sub-block-name=SUB_BLOCK_NAME [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns the subset of permissions that the caller has on the specified
    Compute Engine reservation sub-block.

EXAMPLES
    To test the 'compute.reservations.get' and 'compute.reservations.update'
    permissions on a reservation sub-block named 'my-sub-block', which is part
    of block 'my-block' under reservation 'my-reservation' in zone
    'us-central1-a', run:

        $ gcloud compute reservations sub-blocks test-iam-permissions \
            my-reservation --zone=us-central1-a --block-name=my-block \
            --sub-block-name=my-sub-block \
            --permissions=compute.reservations.get,\
        compute.reservations.update

POSITIONAL ARGUMENTS
     RESERVATION
        Name of the reservation to test-iam-permissions.

REQUIRED FLAGS
     --block-name=BLOCK_NAME
        The name of the reservation block.

     --permissions=[PERMISSION,...]
        Set of permissions to check for the resource.

     --sub-block-name=SUB_BLOCK_NAME
        The name of the reservation sub block.

OPTIONAL FLAGS
     --zone=ZONE
        Zone of the reservation to test-iam-permissions. If not specified and
        the compute/zone property isn't set, you might be prompted to select a
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta compute reservations sub-blocks test-iam-permissions
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute reservations sub-blocks test-iam-permissions my-reservation \
    --zone=us-central1-a \
    --block-name=my-block \
    --sub-block-name=my-sub-block \
    --permissions=compute.reservations.get,compute.reservations.update
```

### gcloud beta compute reservations sub-blocks describe

```text
NAME
    gcloud beta compute reservations sub-blocks describe - describe a Compute
        Engine reservation sub-block

SYNOPSIS
    gcloud beta compute reservations sub-blocks describe RESERVATION
        --block-name=BLOCK_NAME --sub-block-name=SUB_BLOCK_NAME
        [--full-view=FULL_VIEW; default="SUB_BLOCK_VIEW_UNSPECIFIED"]
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute reservations sub-blocks get-version

```text
NAME
    gcloud beta compute reservations sub-blocks get-version - get the version
        of a reservation sub-block

SYNOPSIS
    gcloud beta compute reservations sub-blocks get-version RESERVATION
        --block-name=BLOCK_NAME --sub-block-name=SUB_BLOCK_NAME [--current]
        [--target] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute reservations sub-blocks list

```text
NAME
    gcloud beta compute reservations sub-blocks list - list Compute Engine
        reservation sub-blocks

SYNOPSIS
    gcloud beta compute reservations sub-blocks list RESERVATION
        --block-name=BLOCK_NAME [--zone=ZONE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute reservations sub-blocks perform-maintenance

```text
NAME
    gcloud beta compute reservations sub-blocks perform-maintenance - perform
        maintenance on a reservation sub-block

SYNOPSIS
    gcloud beta compute reservations sub-blocks perform-maintenance RESERVATION
        --block-name=BLOCK_NAME --sub-block-name=SUB_BLOCK_NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute reservations sub-blocks report-subblock-as-faulty

```text
NAME
    gcloud beta compute reservations sub-blocks report-subblock-as-faulty -
        report a sub-block within a reservation as faulty

SYNOPSIS
    gcloud beta compute reservations sub-blocks report-subblock-as-faulty
        RESERVATION --block-name=BLOCK_NAME
        --disruption-schedule=DISRUPTION_SCHEDULE
        --failure-component=FAILURE_COMPONENT
        --fault-reasons=[behavior=BEHAVIOR],[description=DESCRIPTION]
        --sub-block-name=SUB_BLOCK_NAME [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute reservations sub-blocks set-iam-policy

```text
NAME
    gcloud beta compute reservations sub-blocks set-iam-policy - set the IAM
        policy binding for a Compute Engine reservation sub-block

SYNOPSIS
    gcloud beta compute reservations sub-blocks set-iam-policy RESERVATION
        POLICY_FILE --block-name=BLOCK_NAME --sub-block-name=SUB_BLOCK_NAME
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute reservations sub-blocks test-iam-permissions

```text
NAME
    gcloud beta compute reservations sub-blocks test-iam-permissions - test IAM
        permissions on a Compute Engine reservation sub-block

SYNOPSIS
    gcloud beta compute reservations sub-blocks test-iam-permissions
        RESERVATION --block-name=BLOCK_NAME --permissions=[PERMISSION,...]
        --sub-block-name=SUB_BLOCK_NAME [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations sub-blocks describe

```text
NAME
    gcloud alpha compute reservations sub-blocks describe - describe a Compute
        Engine reservation sub-block

SYNOPSIS
    gcloud alpha compute reservations sub-blocks describe RESERVATION
        --block-name=BLOCK_NAME --sub-block-name=SUB_BLOCK_NAME
        [--full-view=FULL_VIEW; default="SUB_BLOCK_VIEW_UNSPECIFIED"]
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations sub-blocks get-version

```text
NAME
    gcloud alpha compute reservations sub-blocks get-version - get the version
        of a reservation sub-block

SYNOPSIS
    gcloud alpha compute reservations sub-blocks get-version RESERVATION
        --block-name=BLOCK_NAME --sub-block-name=SUB_BLOCK_NAME [--current]
        [--target] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations sub-blocks list

```text
NAME
    gcloud alpha compute reservations sub-blocks list - list Compute Engine
        reservation sub-blocks

SYNOPSIS
    gcloud alpha compute reservations sub-blocks list RESERVATION
        --block-name=BLOCK_NAME [--zone=ZONE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations sub-blocks perform-maintenance

```text
NAME
    gcloud alpha compute reservations sub-blocks perform-maintenance - perform
        maintenance on a reservation sub-block

SYNOPSIS
    gcloud alpha compute reservations sub-blocks perform-maintenance
        RESERVATION --block-name=BLOCK_NAME --sub-block-name=SUB_BLOCK_NAME
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations sub-blocks report-subblock-as-faulty

```text
NAME
    gcloud alpha compute reservations sub-blocks report-subblock-as-faulty -
        report a sub-block within a reservation as faulty

SYNOPSIS
    gcloud alpha compute reservations sub-blocks report-subblock-as-faulty
        RESERVATION --block-name=BLOCK_NAME
        --disruption-schedule=DISRUPTION_SCHEDULE
        --failure-component=FAILURE_COMPONENT
        --fault-reasons=[behavior=BEHAVIOR],[description=DESCRIPTION]
        --sub-block-name=SUB_BLOCK_NAME [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/reservations/sub-blocks (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
