---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instant-snapshots
---

# gcloud compute instant-snapshots

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instant-snapshots add-labels

```text
NAME
    gcloud compute instant-snapshots add-labels - add labels to Google Compute
        Engine instant-snapshotss

SYNOPSIS
    gcloud compute instant-snapshots add-labels INSTANT_SNAPSHOT_NAME
        --labels=[KEY=VALUE,...] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instant-snapshots add-labels adds labels to a Google Compute
    Engine instant-snapshots.

EXAMPLES
    To add key-value pairs k0=v0 and k1=v1 to 'example-instant-snapshots'

        $ gcloud compute instant-snapshots add-labels \
            example-instant-snapshots --labels=k0=v0,k1=v1

    Labels can be used to identify the instant-snapshots and to filter them. To
    find a instant-snapshots labeled with key-value pair k1, v2

        $ gcloud compute instant-snapshots list --filter='labels.k1:v2'

    To list only the labels when describing a resource, use --format

        $ gcloud compute instant-snapshots describe \
            example-instant-snapshots --format='default(labels)'

POSITIONAL ARGUMENTS
     INSTANT_SNAPSHOT_NAME
        Name of the instant snapshot to operate on.

REQUIRED FLAGS
     --labels=[KEY=VALUE,...]
        A list of labels to add.

OPTIONAL FLAGS
     At most one of these can be specified:

       --region=REGION
          Region of the instant snapshot to operate on. If not specified, you
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

       --zone=ZONE
          Zone of the instant snapshot to operate on. If not specified and the
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instant-snapshots add-labels

        $ gcloud beta compute instant-snapshots add-labels
```

### gcloud compute instant-snapshots create

```text
NAME
    gcloud compute instant-snapshots create - create a Compute Engine instant
        snapshot

SYNOPSIS
    gcloud compute instant-snapshots create INSTANT_SNAPSHOT_NAME
        --source-disk=SOURCE_DISK [--labels=[KEY=VALUE,...]]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instant-snapshots create creates an instant snapshot of a
    disk. Instant snapshots are useful for backing up the disk data.

EXAMPLES
    To create an instant snapshot 'my-instant-snap' from a disk 'my-disk' in
    zone 'us-east1-a', run:

        $ gcloud compute instant-snapshots create my-instant-snap \
          --source-disk=my-disk --zone=us-east1-a

POSITIONAL ARGUMENTS
     INSTANT_SNAPSHOT_NAME
        Name of the instant snapshot to create.

REQUIRED FLAGS
     Source disk options

     This must be specified.

       --source-disk=SOURCE_DISK
          Source disk used to create the instant snapshot.

OPTIONAL FLAGS
     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --resource-manager-tags=[KEY=VALUE,...]
        A comma-separated list of Resource Manager tags to apply to the
        snapshot.

     At most one of these can be specified:

       --region=REGION
          Region of the instant snapshot to create. If not specified, you might
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

       --zone=ZONE
          Zone of the instant snapshot to create. If not specified and the
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instant-snapshots create

        $ gcloud beta compute instant-snapshots create
```

### gcloud compute instant-snapshots delete

```text
NAME
    gcloud compute instant-snapshots delete - delete a Compute Engine instant
        snapshot

SYNOPSIS
    gcloud compute instant-snapshots delete INSTANT_SNAPSHOT_NAME
        [INSTANT_SNAPSHOT_NAME ...] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instant-snapshots delete deletes a Compute Engine instant
    snapshot. A disk can be deleted only if it is not attached to any virtual
    machine instances.

EXAMPLES
    To delete Compute Engine instant snapshots with the names
    'instant-snapshot-1' and 'instant-snapshot-2', run:

        $ gcloud compute instant-snapshots delete instant-snapshot-1 \
            instant-snapshot-2

    To list all instant snapshots that were created before a specific date, use
    the --filter flag with the gcloud compute instant-snapshots list command.

        $ gcloud compute instant-snapshots list \
            --filter="creationTimestamp<'2017-01-01'"

    For more information on how to use --filter with the list command, run $
    gcloud topic filters.

POSITIONAL ARGUMENTS
     INSTANT_SNAPSHOT_NAME [INSTANT_SNAPSHOT_NAME ...]
        Names of the instant snapshots to delete.

FLAGS
     At most one of these can be specified:

       --region=REGION
          Region of the instant snapshots to delete. If not specified, you
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

       --zone=ZONE
          Zone of the instant snapshots to delete. If not specified and the
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instant-snapshots delete

        $ gcloud beta compute instant-snapshots delete
```

### gcloud compute instant-snapshots describe

```text
NAME
    gcloud compute instant-snapshots describe - describe a Compute Engine
        instant snapshot

SYNOPSIS
    gcloud compute instant-snapshots describe INSTANT_SNAPSHOT_NAME
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instant-snapshots describe displays all data associated with
    a Compute Engine instant snapshot in a project.

EXAMPLES
    To describe the instant snapshot 'instant-snapshot-1' in zone 'us-east1-a',
    run:

        $ gcloud compute instant-snapshots describe instant-snapshot-1 \
          --zone=us-east1-a

POSITIONAL ARGUMENTS
     INSTANT_SNAPSHOT_NAME
        Name of the instant snapshot to describe.

FLAGS
     At most one of these can be specified:

       --region=REGION
          Region of the instant snapshot to describe. If not specified, you
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

       --zone=ZONE
          Zone of the instant snapshot to describe. If not specified and the
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instant-snapshots describe

        $ gcloud beta compute instant-snapshots describe
```

### gcloud compute instant-snapshots list

```text
NAME
    gcloud compute instant-snapshots list - list Google Compute Engine instant
        snapshots

SYNOPSIS
    gcloud compute instant-snapshots list [NAME ...]
        [--regexp=REGEXP, -r REGEXP]
        [--regions=[REGION,...] | --zones=[ZONE,...]] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instant-snapshots list displays all Google Compute Engine
    instant snapshots in a project.

    By default, instant snapshots from all regions and instant snapshots from
    all zones are listed. The results can be narrowed down by providing the
    --regions or --zones flag.

EXAMPLES
    To list all instant snapshots in a project in table form, run:

        $ gcloud compute instant-snapshots list

    To list the URIs of all instant snapshots in a project, run:

        $ gcloud compute instant-snapshots list --uri

    To list all instant snapshots in the us-central1 and europe-west1 regions,
    given they are regional resources, run:

        $ gcloud compute instant-snapshots list \
            --filter="region:( europe-west1 us-central1 )"

    To list all instant snapshots in zones us-central1-b and europe-west1-d,
    given they are zonal resources, run:

        $ gcloud compute instant-snapshots list \
            --filter="zone:( europe-west1-d us-central1-b )"

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

     At most one of these can be specified:

       --regions=[REGION,...]
          If provided, only regional resources are shown. If arguments are
          provided, only resources from the given regions are shown.

       --zones=[ZONE,...]
          If provided, only zonal resources are shown. If arguments are
          provided, only resources from the given zones are shown.

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

        $ gcloud alpha compute instant-snapshots list

        $ gcloud beta compute instant-snapshots list
```

### gcloud compute instant-snapshots set-iam-policy

```text
NAME
    gcloud compute instant-snapshots set-iam-policy - set the IAM policy
        binding for a Compute Engine instant snapshot

SYNOPSIS
    gcloud compute instant-snapshots set-iam-policy INSTANT_SNAPSHOT_NAME
        POLICY_FILE [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instant-snapshots set-iam-policy sets the IAM policy for a
    Compute Engine instant snapshot as defined in a JSON or YAML file.

EXAMPLES
    To set the IAM policy for the zonal instant snapshot 'my-instant-snapshot'
    in zone 'ZONE' from a file 'policy.json', run:

        $ gcloud compute instant-snapshots set-iam-policy \
          my-instant-snapshot policy.json --zone=ZONE

    To set the IAM policy for the regional instant snapshot
    'my-instant-snapshot' in region 'REGION' from a file 'policy.json', run:

        $ gcloud compute instant-snapshots set-iam-policy \
          my-instant-snapshot policy.json --region=REGION

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     INSTANT_SNAPSHOT_NAME
        Name of the instant snapshot to set the IAM policy on.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

FLAGS
     At most one of these can be specified:

       --region=REGION
          Region of the instant snapshot to set the IAM policy on. If not
          specified, you might be prompted to select a region (interactive mode
          only).

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
          Zone of the instant snapshot to set the IAM policy on. If not
          specified and the compute/zone property isn't set, you might be
          prompted to select a zone (interactive mode only).

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

        $ gcloud alpha compute instant-snapshots set-iam-policy

        $ gcloud beta compute instant-snapshots set-iam-policy
```

### gcloud beta compute instant-snapshots add-labels

```text
NAME
    gcloud beta compute instant-snapshots add-labels - add labels to Google
        Compute Engine instant-snapshotss

SYNOPSIS
    gcloud beta compute instant-snapshots add-labels INSTANT_SNAPSHOT_NAME
        --labels=[KEY=VALUE,...] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instant-snapshots create

```text
NAME
    gcloud beta compute instant-snapshots create - create a Compute Engine
        instant snapshot

SYNOPSIS
    gcloud beta compute instant-snapshots create INSTANT_SNAPSHOT_NAME
        --source-disk=SOURCE_DISK [--labels=[KEY=VALUE,...]]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instant-snapshots delete

```text
NAME
    gcloud beta compute instant-snapshots delete - delete a Compute Engine
        instant snapshot

SYNOPSIS
    gcloud beta compute instant-snapshots delete INSTANT_SNAPSHOT_NAME
        [INSTANT_SNAPSHOT_NAME ...] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instant-snapshots describe

```text
NAME
    gcloud beta compute instant-snapshots describe - describe a Compute Engine
        instant snapshot

SYNOPSIS
    gcloud beta compute instant-snapshots describe INSTANT_SNAPSHOT_NAME
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instant-snapshots list

```text
NAME
    gcloud beta compute instant-snapshots list - list Google Compute Engine
        instant snapshots

SYNOPSIS
    gcloud beta compute instant-snapshots list [NAME ...]
        [--regexp=REGEXP, -r REGEXP]
        [--regions=[REGION,...] | --zones=[ZONE,...]] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instant-snapshots set-iam-policy

```text
NAME
    gcloud beta compute instant-snapshots set-iam-policy - set the IAM policy
        binding for a Compute Engine instant snapshot

SYNOPSIS
    gcloud beta compute instant-snapshots set-iam-policy INSTANT_SNAPSHOT_NAME
        POLICY_FILE [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instant-snapshots test-iam-permissions

```text
NAME
    gcloud beta compute instant-snapshots test-iam-permissions - test IAM
        permissions for a Compute Engine instant snapshot

SYNOPSIS
    gcloud beta compute instant-snapshots test-iam-permissions
        INSTANT_SNAPSHOT_NAME --permissions=[PERMISSION,...]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instant-snapshots add-labels

```text
NAME
    gcloud alpha compute instant-snapshots add-labels - add labels to Google
        Compute Engine instant-snapshotss

SYNOPSIS
    gcloud alpha compute instant-snapshots add-labels INSTANT_SNAPSHOT_NAME
        --labels=[KEY=VALUE,...] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instant-snapshots create

```text
NAME
    gcloud alpha compute instant-snapshots create - create a Compute Engine
        instant snapshot

SYNOPSIS
    gcloud alpha compute instant-snapshots create INSTANT_SNAPSHOT_NAME
        --source-disk=SOURCE_DISK [--labels=[KEY=VALUE,...]]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instant-snapshots delete

```text
NAME
    gcloud alpha compute instant-snapshots delete - delete a Compute Engine
        instant snapshot

SYNOPSIS
    gcloud alpha compute instant-snapshots delete INSTANT_SNAPSHOT_NAME
        [INSTANT_SNAPSHOT_NAME ...] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instant-snapshots describe

```text
NAME
    gcloud alpha compute instant-snapshots describe - describe a Compute Engine
        instant snapshot

SYNOPSIS
    gcloud alpha compute instant-snapshots describe INSTANT_SNAPSHOT_NAME
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instant-snapshots list

```text
NAME
    gcloud alpha compute instant-snapshots list - list Google Compute Engine
        instant snapshots

SYNOPSIS
    gcloud alpha compute instant-snapshots list [NAME ...]
        [--regexp=REGEXP, -r REGEXP]
        [--regions=[REGION,...] | --zones=[ZONE,...]] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instant-snapshots set-iam-policy

```text
NAME
    gcloud alpha compute instant-snapshots set-iam-policy - set the IAM policy
        binding for a Compute Engine instant snapshot

SYNOPSIS
    gcloud alpha compute instant-snapshots set-iam-policy INSTANT_SNAPSHOT_NAME
        POLICY_FILE [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instant-snapshots test-iam-permissions

```text
NAME
    gcloud alpha compute instant-snapshots test-iam-permissions - test IAM
        permissions for a Compute Engine instant snapshot

SYNOPSIS
    gcloud alpha compute instant-snapshots test-iam-permissions
        INSTANT_SNAPSHOT_NAME --permissions=[PERMISSION,...]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute instant-snapshots list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute instant-snapshots list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instant-snapshots (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
