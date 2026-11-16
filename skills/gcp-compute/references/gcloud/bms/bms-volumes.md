---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bms/volumes
---

# gcloud bms volumes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bms volumes describe

```text
NAME
    gcloud bms volumes describe - describe a Bare Metal Solution volume

SYNOPSIS
    gcloud bms volumes describe (VOLUME : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Bare Metal Solution volume.

EXAMPLES
    To get a description of an volume called my-volume in project my-project
    and region us-central1, run:

        $ gcloud bms volumes describe my-volume --project=my-project \
            --region=us-central1

POSITIONAL ARGUMENTS
     Volume resource - volume. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VOLUME
          ID of the volume or fully qualified identifier for the volume.

          To set the volume attribute:
          + provide the argument volume on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument volume on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms volumes describe
```

### gcloud bms volumes list

```text
NAME
    gcloud bms volumes list - list Bare Metal Solution volumes in a project

SYNOPSIS
    gcloud bms volumes list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Bare Metal Solution volumes in a project.

EXAMPLES
    To list volumes within the project in the region us-central1, run:

        $ gcloud bms volumes list --region=us-central1

    Or:

    To list all volumes in the project, run:

        $ gcloud bms volumes list

FLAGS
     Region resource - region. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --region=REGION
        ID of the region or fully qualified identifier for the region.

        To set the region attribute:
        * provide the argument --region on the command line.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms volumes list
```

### gcloud bms volumes luns describe

```text
NAME
    gcloud bms volumes luns describe - describe a Bare Metal Solution LUN

SYNOPSIS
    gcloud bms volumes luns describe (LUN : --region=REGION --volume=VOLUME)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Bare Metal Solution logical unit number (LUN).

EXAMPLES
    To get details about a LUN called my-lun on volume my-volume in region
    us-central1, run:

        $ gcloud bms volumes luns describe my-lun --region=us-central1 \
            --volume=my-volume

POSITIONAL ARGUMENTS
     Lun resource - lun. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument lun on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LUN
          ID of the lun or fully qualified identifier for the lun.

          To set the lun attribute:
          + provide the argument lun on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument lun on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

       --volume=VOLUME
          Bare Metal Solution volume.

          To set the volume attribute:
          + provide the argument lun on the command line with a fully
            specified name;
          + provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms volumes luns describe
```

### gcloud bms volumes luns list

```text
NAME
    gcloud bms volumes luns list - list Bare Metal Solution LUNs in a project

SYNOPSIS
    gcloud bms volumes luns list (--volume=VOLUME : --region=REGION)
        [--filter=EXPRESSION] [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Bare Metal Solution logical unit numbers (LUNs) for a volume.

EXAMPLES
    To list all LUNs on volume my-volume in region us-central1, run:

        $ gcloud bms volumes luns list --region=us-central1 \
            --volume=my-volume

REQUIRED FLAGS
     Volume resource - volume. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --volume=VOLUME
          ID of the volume or fully qualified identifier for the volume.

          To set the volume attribute:
          + provide the argument --volume on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument --volume on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms volumes luns list
```

### gcloud bms volumes rename

```text
NAME
    gcloud bms volumes rename - rename a Bare Metal Solution volume

SYNOPSIS
    gcloud bms volumes rename (VOLUME : --region=REGION) --new-name=NEW_NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Rename a Bare Metal Solution volume.

EXAMPLES
    To rename a volume my-volume to my-new-volume-name in region us-central1,
    run:

        $ gcloud bms volumes rename my-volume \
            --new-name=my-new-volume-name --region=us-central1 \
            --project=bms-example-project

POSITIONAL ARGUMENTS
     Volume resource - volume. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VOLUME
          ID of the volume or fully qualified identifier for the volume.

          To set the volume attribute:
          + provide the argument volume on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument volume on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

REQUIRED FLAGS
     --new-name=NEW_NAME
        New volume name for renaming an already existing volume.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms volumes rename
```

### gcloud bms volumes restore

```text
NAME
    gcloud bms volumes restore - restore a Bare Metal Solution boot volume from
        an existing snapshot

SYNOPSIS
    gcloud bms volumes restore (VOLUME : --region=REGION) --snapshot=SNAPSHOT
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Restore a Bare Metal Solution boot volume from an existing snapshot.

EXAMPLES
    To restore a boot volume named my-boot-volume in region us-central1 from
    snapshot named my-snapshot, run:

        $ gcloud bms volumes restore my-boot-volume --region=us-central1 \
            --snapshot=my-snapshot

POSITIONAL ARGUMENTS
     Volume resource - volume. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VOLUME
          ID of the volume or fully qualified identifier for the volume.

          To set the volume attribute:
          + provide the argument volume on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument volume on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

REQUIRED FLAGS
     --snapshot=SNAPSHOT
        Name of the snapshot to restore.

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
    This variant is also available:

        $ gcloud alpha bms volumes restore
```

### gcloud bms volumes snapshot

```text
NAME
    gcloud bms volumes snapshot - create a snapshot of a Bare Metal Solution
        boot volume

SYNOPSIS
    gcloud bms volumes snapshot (VOLUME : --region=REGION)
        --description=DESCRIPTION --snapshot-name=SNAPSHOT_NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a snapshot of a Bare Metal Solution boot volume.

EXAMPLES
    To create a snapshot of a boot volume named my-boot-volume in region
    us-central1 with the name my-snapshot and description my-description, run:

        $ gcloud bms volumes snapshot my-boot-volume --region=us-central1 \
            --snapshot-name=my-snapshot --description=my-description

POSITIONAL ARGUMENTS
     Volume resource - volume. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VOLUME
          ID of the volume or fully qualified identifier for the volume.

          To set the volume attribute:
          + provide the argument volume on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument volume on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

REQUIRED FLAGS
     --description=DESCRIPTION
        Textual description of the created snapshot.

     --snapshot-name=SNAPSHOT_NAME
        Name to assign to the created snapshot.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms volumes snapshot
```

### gcloud bms volumes snapshots delete

```text
NAME
    gcloud bms volumes snapshots delete - delete a Bare Metal Solution boot
        volume snapshot

SYNOPSIS
    gcloud bms volumes snapshots delete
        (SNAPSHOT : --region=REGION --volume=VOLUME) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Bare Metal Solution boot volume snapshot.

EXAMPLES
    To delete a snapshot called my-snapshot on boot volume my-boot-volume in
    region us-central1, run:

        $ gcloud bms volumes snapshots delete my-snapshot \
            --region=us-central1 --volume=my-boot-volume

POSITIONAL ARGUMENTS
     Snapshot resource - snapshot. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument snapshot on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SNAPSHOT
          ID of the snapshot or fully qualified identifier for the snapshot.

          To set the snapshot attribute:
          + provide the argument snapshot on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument snapshot on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

       --volume=VOLUME
          Bare Metal Solution volume.

          To set the volume attribute:
          + provide the argument snapshot on the command line with a fully
            specified name;
          + provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms volumes snapshots delete
```

### gcloud bms volumes snapshots describe

```text
NAME
    gcloud bms volumes snapshots describe - describe a Bare Metal Solution boot
        volume snapshot

SYNOPSIS
    gcloud bms volumes snapshots describe
        (SNAPSHOT : --region=REGION --volume=VOLUME) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Bare Metal Solution boot volume snapshot.

EXAMPLES
    To get a description of a snapshot called my-snapshot on boot volume
    my-boot-volume in region us-central1, run:

        $ gcloud bms volumes snapshots describe my-snapshot \
            --region=us-central1 --volume=my-boot-volume

POSITIONAL ARGUMENTS
     Snapshot resource - snapshot. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument snapshot on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SNAPSHOT
          ID of the snapshot or fully qualified identifier for the snapshot.

          To set the snapshot attribute:
          + provide the argument snapshot on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument snapshot on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

       --volume=VOLUME
          Bare Metal Solution volume.

          To set the volume attribute:
          + provide the argument snapshot on the command line with a fully
            specified name;
          + provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms volumes snapshots describe
```

### gcloud bms volumes snapshots list

```text
NAME
    gcloud bms volumes snapshots list - list snapshots for a Bare Metal
        Solution boot volume

SYNOPSIS
    gcloud bms volumes snapshots list (--volume=VOLUME : --region=REGION)
        [--filter=EXPRESSION] [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List snapshots for a Bare Metal Solution boot volume.

EXAMPLES
    To list snapshots on boot volume my-boot-volume in region us-central1, run:

        $ gcloud bms volumes snapshots list --region=us-central1 \
            --volume=my-boot-volume

REQUIRED FLAGS
     Volume resource - The Bare Metal Solution volume to list snapshots of. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --volume=VOLUME
          ID of the volume or fully qualified identifier for the volume.

          To set the volume attribute:
          + provide the argument --volume on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument --volume on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms volumes snapshots list
```

### gcloud bms volumes update

```text
NAME
    gcloud bms volumes update - update a Bare Metal Solution volume

SYNOPSIS
    gcloud bms volumes update (VOLUME : --region=REGION) [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Bare Metal Solution volume.

    This call returns immediately, but the update operation may take several
    minutes to complete. To check if the operation is complete, use the
    describe command for the volume.

EXAMPLES
    To add the label 'key1=value1' to a policy, run:

        $ gcloud bms volumes update my-volume --update-labels=key1=value1

    To clear all labels, run:

        $ gcloud bms volumes update my-volume --clear-labels

POSITIONAL ARGUMENTS
     Volume resource - volume. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VOLUME
          ID of the volume or fully qualified identifier for the volume.

          To set the volume attribute:
          + provide the argument volume on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument volume on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud bms volumes update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud bms volumes update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms volumes update
```

### gcloud alpha bms volumes describe

```text
NAME
    gcloud alpha bms volumes describe - describe a Bare Metal Solution volume

SYNOPSIS
    gcloud alpha bms volumes describe (VOLUME : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms volumes list

```text
NAME
    gcloud alpha bms volumes list - list Bare Metal Solution volumes in a
        project

SYNOPSIS
    gcloud alpha bms volumes list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms volumes luns describe

```text
NAME
    gcloud alpha bms volumes luns describe - describe a Bare Metal Solution LUN

SYNOPSIS
    gcloud alpha bms volumes luns describe
        (LUN : --region=REGION --volume=VOLUME) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms volumes luns list

```text
NAME
    gcloud alpha bms volumes luns list - list Bare Metal Solution LUNs in a
        project

SYNOPSIS
    gcloud alpha bms volumes luns list (--volume=VOLUME : --region=REGION)
        [--filter=EXPRESSION] [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms volumes rename

```text
NAME
    gcloud alpha bms volumes rename - rename a Bare Metal Solution volume

SYNOPSIS
    gcloud alpha bms volumes rename (VOLUME : --region=REGION)
        --new-name=NEW_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms volumes restore

```text
NAME
    gcloud alpha bms volumes restore - restore a Bare Metal Solution boot
        volume from an existing snapshot

SYNOPSIS
    gcloud alpha bms volumes restore (VOLUME : --region=REGION)
        --snapshot=SNAPSHOT [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms volumes snapshot

```text
NAME
    gcloud alpha bms volumes snapshot - create a snapshot of a Bare Metal
        Solution boot volume

SYNOPSIS
    gcloud alpha bms volumes snapshot (VOLUME : --region=REGION)
        --description=DESCRIPTION --snapshot-name=SNAPSHOT_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms volumes snapshots delete

```text
NAME
    gcloud alpha bms volumes snapshots delete - delete a Bare Metal Solution
        boot volume snapshot

SYNOPSIS
    gcloud alpha bms volumes snapshots delete
        (SNAPSHOT : --region=REGION --volume=VOLUME) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms volumes snapshots describe

```text
NAME
    gcloud alpha bms volumes snapshots describe - describe a Bare Metal
        Solution boot volume snapshot

SYNOPSIS
    gcloud alpha bms volumes snapshots describe
        (SNAPSHOT : --region=REGION --volume=VOLUME) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms volumes snapshots list

```text
NAME
    gcloud alpha bms volumes snapshots list - list snapshots for a Bare Metal
        Solution boot volume

SYNOPSIS
    gcloud alpha bms volumes snapshots list (--volume=VOLUME : --region=REGION)
        [--filter=EXPRESSION] [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms volumes update

```text
NAME
    gcloud alpha bms volumes update - update a Bare Metal Solution volume

SYNOPSIS
    gcloud alpha bms volumes update (VOLUME : --region=REGION) [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bms/volumes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
