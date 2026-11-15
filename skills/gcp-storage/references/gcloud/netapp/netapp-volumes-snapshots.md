---
source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes/snapshots
---

# gcloud netapp volumes snapshots

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud netapp volumes snapshots create

```text
NAME
    gcloud netapp volumes snapshots create - create a Cloud NetApp Volume
        Snapshot

SYNOPSIS
    gcloud netapp volumes snapshots create (SNAPSHOT : --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--volume=VOLUME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud NetApp Volume Snapshot.

EXAMPLES
    The following command creates a Snapshot named NAME using the required
    arguments:

        $ gcloud netapp volumes snapshots create NAME \
          --location=us-central1 --volume=vol1

POSITIONAL ARGUMENTS
     Snapshot resource - The Snapshot to create. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument snapshot on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument snapshot on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       SNAPSHOT
          ID of the snapshot or fully qualified identifier for the snapshot.

          To set the snapshot attribute:
          + provide the argument snapshot on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the snapshot.

          To set the location attribute:
          + provide the argument snapshot on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A description of the Cloud NetApp Snapshot

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     Volume resource - The Volume to take a Snapshot of. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp volumes snapshots create

        $ gcloud beta netapp volumes snapshots create
```

### gcloud netapp volumes snapshots delete

```text
NAME
    gcloud netapp volumes snapshots delete - delete a Cloud NetApp Volume
        Snapshot

SYNOPSIS
    gcloud netapp volumes snapshots delete (SNAPSHOT : --location=LOCATION)
        [--async] [--volume=VOLUME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Cloud NetApp Volume Snapshot.

EXAMPLES
    The following command deletes a Snapshot named NAME in the given location
    and volume:

        $ gcloud netapp volumes snapshots delete NAME \
          --location=us-central1 --volume=vol1

    To delete a Snapshot named NAME asynchronously, run the following command:

        $ gcloud netapp volumes snapshots delete NAME \
          --location=us-central1 --volume=vol1 --async

POSITIONAL ARGUMENTS
     Snapshot resource - The Snapshot to delete. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument snapshot on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument snapshot on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       SNAPSHOT
          ID of the snapshot or fully qualified identifier for the snapshot.

          To set the snapshot attribute:
          + provide the argument snapshot on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the snapshot.

          To set the location attribute:
          + provide the argument snapshot on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Volume resource - The Volume to take a Snapshot of. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp volumes snapshots delete

        $ gcloud beta netapp volumes snapshots delete
```

### gcloud netapp volumes snapshots describe

```text
NAME
    gcloud netapp volumes snapshots describe - describe a Cloud NetApp Volume
        Snapshot

SYNOPSIS
    gcloud netapp volumes snapshots describe (SNAPSHOT : --location=LOCATION)
        [--volume=VOLUME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud NetApp Volume Snapshot.

EXAMPLES
    The following command describes a Snapshot named NAME in the given location
    and volume:

        $ gcloud netapp volumes snapshots describe NAME \
          --location=us-central1 --volume=vol1

POSITIONAL ARGUMENTS
     Snapshot resource - The Snapshot to describe. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument snapshot on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument snapshot on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       SNAPSHOT
          ID of the snapshot or fully qualified identifier for the snapshot.

          To set the snapshot attribute:
          + provide the argument snapshot on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the snapshot.

          To set the location attribute:
          + provide the argument snapshot on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     Volume resource - The Volume to take a Snapshot of. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp volumes snapshots describe

        $ gcloud beta netapp volumes snapshots describe
```

### gcloud netapp volumes snapshots list

```text
NAME
    gcloud netapp volumes snapshots list - list Cloud NetApp Volume Snapshots

SYNOPSIS
    gcloud netapp volumes snapshots list [--location=LOCATION]
        [--volume=VOLUME] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists Cloud NetApp Volume Snapshots.

EXAMPLES
    The following command lists all Snapshots in the given location and volume:

        $ gcloud netapp volumes snapshots list --location=us-central1 \
          --volume=vol1

FLAGS
     Location resource - The location in which to list Volume Snapshots. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * uses all locations by default. with a fully specified name;
      * set the property netapp/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * uses all locations by default.;
        * set the property netapp/location.

     Volume resource - The Volume to take a Snapshot of. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

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

        $ gcloud alpha netapp volumes snapshots list

        $ gcloud beta netapp volumes snapshots list
```

### gcloud netapp volumes snapshots update

```text
NAME
    gcloud netapp volumes snapshots update - update a Cloud NetApp Volume
        Snapshot

SYNOPSIS
    gcloud netapp volumes snapshots update (SNAPSHOT : --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--volume=VOLUME] [--clear-labels | --remove-labels=[KEY,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Cloud NetApp Volume Snapshot and its specified parameters.

EXAMPLES
    The following command updates a Snapshot named NAME and its specified
    parameters:

        $ gcloud netapp volumes snapshots update NAME \
          --location=us-central1 --description="new" \
          --update-labels=key2=val2 --volume=vol1

POSITIONAL ARGUMENTS
     Snapshot resource - The Snapshot to update. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument snapshot on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument snapshot on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       SNAPSHOT
          ID of the snapshot or fully qualified identifier for the snapshot.

          To set the snapshot attribute:
          + provide the argument snapshot on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the snapshot.

          To set the location attribute:
          + provide the argument snapshot on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A description of the Cloud NetApp Snapshot

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     Volume resource - The Volume to take a Snapshot of. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud netapp volumes snapshots update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud netapp volumes snapshots update --clear-labels \
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
    These variants are also available:

        $ gcloud alpha netapp volumes snapshots update

        $ gcloud beta netapp volumes snapshots update
```

### gcloud beta netapp volumes snapshots create

```text
NAME
    gcloud beta netapp volumes snapshots create - create a Cloud NetApp Volume
        Snapshot

SYNOPSIS
    gcloud beta netapp volumes snapshots create
        (SNAPSHOT : --location=LOCATION) [--async] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [--volume=VOLUME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes snapshots delete

```text
NAME
    gcloud beta netapp volumes snapshots delete - delete a Cloud NetApp Volume
        Snapshot

SYNOPSIS
    gcloud beta netapp volumes snapshots delete
        (SNAPSHOT : --location=LOCATION) [--async] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes snapshots describe

```text
NAME
    gcloud beta netapp volumes snapshots describe - describe a Cloud NetApp
        Volume Snapshot

SYNOPSIS
    gcloud beta netapp volumes snapshots describe
        (SNAPSHOT : --location=LOCATION) [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes snapshots list

```text
NAME
    gcloud beta netapp volumes snapshots list - list Cloud NetApp Volume
        Snapshots

SYNOPSIS
    gcloud beta netapp volumes snapshots list [--location=LOCATION]
        [--volume=VOLUME] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes snapshots update

```text
NAME
    gcloud beta netapp volumes snapshots update - update a Cloud NetApp Volume
        Snapshot

SYNOPSIS
    gcloud beta netapp volumes snapshots update
        (SNAPSHOT : --location=LOCATION) [--async] [--description=DESCRIPTION]
        [--update-labels=[KEY=VALUE,...]] [--volume=VOLUME]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes snapshots create

```text
NAME
    gcloud alpha netapp volumes snapshots create - creates a Cloud NetApp
        Volume Snapshot

SYNOPSIS
    gcloud alpha netapp volumes snapshots create
        (SNAPSHOT : --location=LOCATION) [--async] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [--volume=VOLUME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes snapshots delete

```text
NAME
    gcloud alpha netapp volumes snapshots delete - delete a Cloud NetApp Volume
        Snapshot

SYNOPSIS
    gcloud alpha netapp volumes snapshots delete
        (SNAPSHOT : --location=LOCATION) [--async] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes snapshots describe

```text
NAME
    gcloud alpha netapp volumes snapshots describe - describe a Cloud NetApp
        Volume Snapshot

SYNOPSIS
    gcloud alpha netapp volumes snapshots describe
        (SNAPSHOT : --location=LOCATION) [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes snapshots list

```text
NAME
    gcloud alpha netapp volumes snapshots list - list Cloud NetApp Volume
        Snapshots

SYNOPSIS
    gcloud alpha netapp volumes snapshots list [--location=LOCATION]
        [--volume=VOLUME] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes snapshots update

```text
NAME
    gcloud alpha netapp volumes snapshots update - update a Cloud NetApp Volume
        Snapshot

SYNOPSIS
    gcloud alpha netapp volumes snapshots update
        (SNAPSHOT : --location=LOCATION) [--async] [--description=DESCRIPTION]
        [--update-labels=[KEY=VALUE,...]] [--volume=VOLUME]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes/snapshots (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
