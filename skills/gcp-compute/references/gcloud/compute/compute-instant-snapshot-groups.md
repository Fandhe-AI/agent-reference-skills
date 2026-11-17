---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instant-snapshot-groups
---

# gcloud compute instant-snapshot-groups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instant-snapshot-groups create

```text
NAME
    gcloud compute instant-snapshot-groups create - create a Compute Engine
        consistency group of instant snapshots

SYNOPSIS
    gcloud compute instant-snapshot-groups create INSTANT_SNAPSHOT_GROUP_NAME
        --source-consistency-group=SOURCE_CONSISTENCY_GROUP
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instant-snapshot-groups create creates an instant snapshot
    group of the consistency group. An Instant Snapshot Group is a Point In
    Time view of the constituent disks of a Consistency Group, they are stored
    in-place as Instant Snapshots on the corresponding disks.

EXAMPLES
    To create an instant snapshot group 'my-instant-snapshot-group' in zone
    'us-east1-a' from a consistency group 'my-consistency-group' in region
    'us-east1', run:        $ gcloud compute instant-snapshot-groups create \
          my-instant-snapshot-group --zone us-east1-a \
          --source-consistency-group=regions/us-east1/resourcePolicies/\
        policy1

POSITIONAL ARGUMENTS
     INSTANT_SNAPSHOT_GROUP_NAME
        Name of the instant snapshot group to create.

REQUIRED FLAGS
     --source-consistency-group=SOURCE_CONSISTENCY_GROUP
        Specifies the source consistency group resource policy. The value
        should be the relative name of the resource policy, in the format
        ``regions/REGION/resourcePolicies/POLICY_NAME``. The resource policy is
        always in the same region as the source disks.

OPTIONAL FLAGS
     At most one of these can be specified:

       --region=REGION
          Region of the instant snapshot group to create. If not specified, you
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
          Zone of the instant snapshot group to create. If not specified and
          the compute/zone property isn't set, you might be prompted to select
          a zone (interactive mode only).

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

        $ gcloud alpha compute instant-snapshot-groups create

        $ gcloud beta compute instant-snapshot-groups create
```

### gcloud compute instant-snapshot-groups delete

```text
NAME
    gcloud compute instant-snapshot-groups delete - delete a Compute Engine
        consistency group of instant snapshots

SYNOPSIS
    gcloud compute instant-snapshot-groups delete INSTANT_SNAPSHOT_GROUP_NAME
        [INSTANT_SNAPSHOT_GROUP_NAME ...] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Compute Engine consistency group of instant snapshots.

POSITIONAL ARGUMENTS
     INSTANT_SNAPSHOT_GROUP_NAME [INSTANT_SNAPSHOT_GROUP_NAME ...]
        Names of the instant snapshot groups to delete.

FLAGS
     At most one of these can be specified:

       --region=REGION
          Region of the instant snapshot groups to delete. If not specified,
          you might be prompted to select a region (interactive mode only).

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
          Zone of the instant snapshot groups to delete. If not specified and
          the compute/zone property isn't set, you might be prompted to select
          a zone (interactive mode only).

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

        $ gcloud alpha compute instant-snapshot-groups delete

        $ gcloud beta compute instant-snapshot-groups delete
```

### gcloud compute instant-snapshot-groups describe

```text
NAME
    gcloud compute instant-snapshot-groups describe - describe a Compute Engine
        consistency group of instant snapshots

SYNOPSIS
    gcloud compute instant-snapshot-groups describe INSTANT_SNAPSHOT_GROUP_NAME
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instant-snapshot-groups describe displays all data
    associated with a Compute Engine consistency group of instant snapshots in
    a project.

EXAMPLES
    To describe the consistency group of instant snapshots
    'instant-snapshot-group-1' in zone 'us-east1-a', run:

        $ gcloud compute instant-snapshot-groups describe \
          instant-snapshot-group-1 --zone=us-east1-a

POSITIONAL ARGUMENTS
     INSTANT_SNAPSHOT_GROUP_NAME
        Name of the instant snapshot group to describe.

FLAGS
     At most one of these can be specified:

       --region=REGION
          Region of the instant snapshot group to describe. If not specified,
          you might be prompted to select a region (interactive mode only).

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
          Zone of the instant snapshot group to describe. If not specified and
          the compute/zone property isn't set, you might be prompted to select
          a zone (interactive mode only).

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

        $ gcloud alpha compute instant-snapshot-groups describe

        $ gcloud beta compute instant-snapshot-groups describe
```

### gcloud compute instant-snapshot-groups list

```text
NAME
    gcloud compute instant-snapshot-groups list - list Google Compute Engine
        instant snapshot groups

SYNOPSIS
    gcloud compute instant-snapshot-groups list
        [--regions=[REGION,...] | --zones=[ZONE,...]] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instant-snapshot-groups list displays all Google Compute
    Engine instant snapshot groups in a project.

    By default, instant snapshot groups from all regions and instant snapshot
    groups from all zones are listed. The results can be narrowed down by
    providing the --regions or --zones flag.

EXAMPLES
    To list all instant snapshot groups in a project in table form, run:

        $ gcloud compute instant-snapshot-groups list

    To list the URIs of all instant snapshot groups in a project, run:

        $ gcloud compute instant-snapshot-groups list --uri

    To list all instant snapshot groups in the us-central1 and europe-west1
    regions, given they are regional resources, run:

        $ gcloud compute instant-snapshot-groups list \
            --filter="region:( europe-west1 us-central1 )"

    To list all instant snapshot groups in zones us-central1-b and
    europe-west1-d, given they are zonal resources, run:

        $ gcloud compute instant-snapshot-groups list \
            --filter="zone:( europe-west1-d us-central1-b )"

FLAGS
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

        $ gcloud alpha compute instant-snapshot-groups list

        $ gcloud beta compute instant-snapshot-groups list
```

### gcloud compute instant-snapshot-groups set-iam-policy

```text
NAME
    gcloud compute instant-snapshot-groups set-iam-policy - set the IAM policy
        binding for a Compute Engine instant snapshot group

SYNOPSIS
    gcloud compute instant-snapshot-groups set-iam-policy
        INSTANT_SNAPSHOT_GROUP_NAME POLICY_FILE [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instant-snapshot-groups set-iam-policy sets the IAM policy
    for a Compute Engine instant snapshot group as defined in a JSON or YAML
    file.

EXAMPLES
    To set the IAM policy for the instant snapshot group
    'instant-snapshot-group-1' in zone 'us-east1-a' from 'policy.json', run:

        $ gcloud compute instant-snapshot-groups set-iam-policy \
          instant-snapshot-group-1 policy.json --zone=us-east1-a

POSITIONAL ARGUMENTS
     INSTANT_SNAPSHOT_GROUP_NAME
        Name of the instant snapshot group to set IAM policy.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

FLAGS
     At most one of these can be specified:

       --region=REGION
          Region of the instant snapshot group to set IAM policy. If not
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
          Zone of the instant snapshot group to set IAM policy. If not
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

        $ gcloud alpha compute instant-snapshot-groups set-iam-policy

        $ gcloud beta compute instant-snapshot-groups set-iam-policy
```

### gcloud compute instant-snapshot-groups test-iam-permissions

```text
NAME
    gcloud compute instant-snapshot-groups test-iam-permissions - test IAM
        permissions for a Compute Engine instant snapshot group

SYNOPSIS
    gcloud compute instant-snapshot-groups test-iam-permissions
        INSTANT_SNAPSHOT_GROUP_NAME --permissions=[PERMISSION,...]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instant-snapshot-groups test-iam-permissions tests the IAM
    permissions that a caller has on a Compute Engine instant snapshot group.

EXAMPLES
    To test if the caller has the 'compute.instantSnapshotGroups.get'
    permission on the instant snapshot group 'instant-snapshot-group-1' in zone
    'us-east1-a', run:

        $ gcloud compute instant-snapshot-groups test-iam-permissions \
          instant-snapshot-group-1 --zone=us-east1-a \
          --permissions=compute.instantSnapshotGroups.get

POSITIONAL ARGUMENTS
     INSTANT_SNAPSHOT_GROUP_NAME
        Name of the instant snapshot group to test IAM permissions.

REQUIRED FLAGS
     --permissions=[PERMISSION,...]
        Set of permissions to check for the resource.

OPTIONAL FLAGS
     At most one of these can be specified:

       --region=REGION
          Region of the instant snapshot group to test IAM permissions. If not
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
          Zone of the instant snapshot group to test IAM permissions. If not
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

        $ gcloud alpha compute instant-snapshot-groups test-iam-permissions

        $ gcloud beta compute instant-snapshot-groups test-iam-permissions
```

### gcloud beta compute instant-snapshot-groups create

```text
NAME
    gcloud beta compute instant-snapshot-groups create - create a Compute
        Engine consistency group of instant snapshots

SYNOPSIS
    gcloud beta compute instant-snapshot-groups create
        INSTANT_SNAPSHOT_GROUP_NAME
        --source-consistency-group=SOURCE_CONSISTENCY_GROUP
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instant-snapshot-groups delete

```text
NAME
    gcloud beta compute instant-snapshot-groups delete - delete a Compute
        Engine consistency group of instant snapshots

SYNOPSIS
    gcloud beta compute instant-snapshot-groups delete
        INSTANT_SNAPSHOT_GROUP_NAME [INSTANT_SNAPSHOT_GROUP_NAME ...]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instant-snapshot-groups describe

```text
NAME
    gcloud beta compute instant-snapshot-groups describe - describe a Compute
        Engine consistency group of instant snapshots

SYNOPSIS
    gcloud beta compute instant-snapshot-groups describe
        INSTANT_SNAPSHOT_GROUP_NAME [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instant-snapshot-groups list

```text
NAME
    gcloud beta compute instant-snapshot-groups list - list Google Compute
        Engine instant snapshot groups

SYNOPSIS
    gcloud beta compute instant-snapshot-groups list
        [--regions=[REGION,...] | --zones=[ZONE,...]] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instant-snapshot-groups set-iam-policy

```text
NAME
    gcloud beta compute instant-snapshot-groups set-iam-policy - set the IAM
        policy binding for a Compute Engine instant snapshot group

SYNOPSIS
    gcloud beta compute instant-snapshot-groups set-iam-policy
        INSTANT_SNAPSHOT_GROUP_NAME POLICY_FILE [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instant-snapshot-groups test-iam-permissions

```text
NAME
    gcloud beta compute instant-snapshot-groups test-iam-permissions - test IAM
        permissions for a Compute Engine instant snapshot group

SYNOPSIS
    gcloud beta compute instant-snapshot-groups test-iam-permissions
        INSTANT_SNAPSHOT_GROUP_NAME --permissions=[PERMISSION,...]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instant-snapshot-groups create

```text
NAME
    gcloud alpha compute instant-snapshot-groups create - create a Compute
        Engine consistency group of instant snapshots

SYNOPSIS
    gcloud alpha compute instant-snapshot-groups create
        INSTANT_SNAPSHOT_GROUP_NAME
        --source-consistency-group=SOURCE_CONSISTENCY_GROUP
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instant-snapshot-groups delete

```text
NAME
    gcloud alpha compute instant-snapshot-groups delete - delete a Compute
        Engine consistency group of instant snapshots

SYNOPSIS
    gcloud alpha compute instant-snapshot-groups delete
        INSTANT_SNAPSHOT_GROUP_NAME [INSTANT_SNAPSHOT_GROUP_NAME ...]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instant-snapshot-groups describe

```text
NAME
    gcloud alpha compute instant-snapshot-groups describe - describe a Compute
        Engine consistency group of instant snapshots

SYNOPSIS
    gcloud alpha compute instant-snapshot-groups describe
        INSTANT_SNAPSHOT_GROUP_NAME [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instant-snapshot-groups list

```text
NAME
    gcloud alpha compute instant-snapshot-groups list - list Google Compute
        Engine instant snapshot groups

SYNOPSIS
    gcloud alpha compute instant-snapshot-groups list
        [--regions=[REGION,...] | --zones=[ZONE,...]] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instant-snapshot-groups set-iam-policy

```text
NAME
    gcloud alpha compute instant-snapshot-groups set-iam-policy - set the IAM
        policy binding for a Compute Engine instant snapshot group

SYNOPSIS
    gcloud alpha compute instant-snapshot-groups set-iam-policy
        INSTANT_SNAPSHOT_GROUP_NAME POLICY_FILE [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instant-snapshot-groups test-iam-permissions

```text
NAME
    gcloud alpha compute instant-snapshot-groups test-iam-permissions - test
        IAM permissions for a Compute Engine instant snapshot group

SYNOPSIS
    gcloud alpha compute instant-snapshot-groups test-iam-permissions
        INSTANT_SNAPSHOT_GROUP_NAME --permissions=[PERMISSION,...]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instant-snapshot-groups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
