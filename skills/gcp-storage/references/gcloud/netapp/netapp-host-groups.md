---
source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/host-groups
---

# gcloud netapp host-groups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud netapp host-groups create

```text
NAME
    gcloud netapp host-groups create - create a Cloud NetApp Host Group

SYNOPSIS
    gcloud netapp host-groups create (HOST_GROUP : --location=LOCATION)
        --hosts=HOST,[HOST,...] --os-type=OS_TYPE --type=TYPE [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud NetApp Host Group.

EXAMPLES
    The following command creates a Host Group named NAME using the required
    arguments:

        $ gcloud netapp host-groups create NAME --location=us-central1 \
          --type=ISCSI_INITIATOR --hosts=host1,host2 --os-type=LINUX

POSITIONAL ARGUMENTS
     Host group resource - The Host Group to create. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument host_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HOST_GROUP
          ID of the host_group or fully qualified identifier for the
          host_group.

          To set the host_group attribute:
          + provide the argument host_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the host_group.

          To set the location attribute:
          + provide the argument host_group on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

REQUIRED FLAGS
     --hosts=HOST,[HOST,...]
        List of hosts in the host group.

     --os-type=OS_TYPE
        String indicating the OS type of the hosts in the host group. The
        supported values are: 'LINUX', 'WINDOWS', 'ESXI'. OS_TYPE must be one
        of: LINUX, WINDOWS, ESXI.

     --type=TYPE
        String indicating the type of host group. The supported values are:
        'ISCSI_INITIATOR'. TYPE must be (only one value is supported):
        ISCSI_INITIATOR.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A description of the Cloud NetApp Host Group

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp host-groups create

        $ gcloud beta netapp host-groups create
```

### gcloud netapp host-groups delete

```text
NAME
    gcloud netapp host-groups delete - delete a Cloud NetApp Host Group

SYNOPSIS
    gcloud netapp host-groups delete (HOST_GROUP : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Cloud NetApp Host Group.

EXAMPLES
    The following command deletes a Host Group named NAME:

        $ gcloud netapp host-groups delete NAME --location=us-central1

    To delete a Host Group named NAME asynchronously, run the following
    command:

        $ gcloud netapp host-groups delete NAME --location=us-central1 \
          --async

POSITIONAL ARGUMENTS
     Host group resource - The Host Group to delete. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument host_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HOST_GROUP
          ID of the host_group or fully qualified identifier for the
          host_group.

          To set the host_group attribute:
          + provide the argument host_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the host_group.

          To set the location attribute:
          + provide the argument host_group on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

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

NOTES
    These variants are also available:

        $ gcloud alpha netapp host-groups delete

        $ gcloud beta netapp host-groups delete
```

### gcloud netapp host-groups describe

```text
NAME
    gcloud netapp host-groups describe - describe a Cloud NetApp Host Group

SYNOPSIS
    gcloud netapp host-groups describe (HOST_GROUP : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud NetApp Host Group.

EXAMPLES
    The following command describes a Host Group named NAME in the given
    location:

        $ gcloud netapp host-groups describe NAME --location=us-central1

POSITIONAL ARGUMENTS
     Host group resource - The Host Group to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument host_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HOST_GROUP
          ID of the host_group or fully qualified identifier for the
          host_group.

          To set the host_group attribute:
          + provide the argument host_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the host_group.

          To set the location attribute:
          + provide the argument host_group on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp host-groups describe

        $ gcloud beta netapp host-groups describe
```

### gcloud netapp host-groups list

```text
NAME
    gcloud netapp host-groups list - list Cloud NetApp Host Groups

SYNOPSIS
    gcloud netapp host-groups list [--location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists Cloud NetApp Host Groups.

EXAMPLES
    The following command lists all Host Groups in the given location:

        $ gcloud netapp host-groups list --location=us-central1

FLAGS
     Location resource - The location in which to list Host Groups. This
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

        $ gcloud alpha netapp host-groups list

        $ gcloud beta netapp host-groups list
```

### gcloud netapp host-groups update

```text
NAME
    gcloud netapp host-groups update - update a Cloud NetApp Host Group

SYNOPSIS
    gcloud netapp host-groups update (HOST_GROUP : --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--hosts=HOST,[HOST,...]]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Cloud NetApp Host Group and its specified parameters.

EXAMPLES
    The following command updates a Host Group named NAME and its specified
    parameters:

        $ gcloud netapp host-groups update NAME --location=us-central1 \
          --description="new description" --hosts="host3,host4" \
          --update-labels=key2=val2

POSITIONAL ARGUMENTS
     Host group resource - The Host Group to update. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument host_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HOST_GROUP
          ID of the host_group or fully qualified identifier for the
          host_group.

          To set the host_group attribute:
          + provide the argument host_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the host_group.

          To set the location attribute:
          + provide the argument host_group on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A description of the Cloud NetApp Host Group

     --hosts=HOST,[HOST,...]
        List of hosts in the host group.

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

              $ gcloud netapp host-groups update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud netapp host-groups update --clear-labels \
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

        $ gcloud alpha netapp host-groups update

        $ gcloud beta netapp host-groups update
```

### gcloud beta netapp host-groups create

```text
NAME
    gcloud beta netapp host-groups create - create a Cloud NetApp Host Group

SYNOPSIS
    gcloud beta netapp host-groups create (HOST_GROUP : --location=LOCATION)
        --hosts=HOST,[HOST,...] --os-type=OS_TYPE --type=TYPE [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp host-groups delete

```text
NAME
    gcloud beta netapp host-groups delete - delete a Cloud NetApp Host Group

SYNOPSIS
    gcloud beta netapp host-groups delete (HOST_GROUP : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp host-groups describe

```text
NAME
    gcloud beta netapp host-groups describe - describe a Cloud NetApp Host
        Group

SYNOPSIS
    gcloud beta netapp host-groups describe (HOST_GROUP : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp host-groups list

```text
NAME
    gcloud beta netapp host-groups list - list Cloud NetApp Host Groups

SYNOPSIS
    gcloud beta netapp host-groups list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp host-groups update

```text
NAME
    gcloud beta netapp host-groups update - update a Cloud NetApp Host Group

SYNOPSIS
    gcloud beta netapp host-groups update (HOST_GROUP : --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--hosts=HOST,[HOST,...]]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp host-groups create

```text
NAME
    gcloud alpha netapp host-groups create - create a Cloud NetApp Host Group

SYNOPSIS
    gcloud alpha netapp host-groups create (HOST_GROUP : --location=LOCATION)
        --hosts=HOST,[HOST,...] --os-type=OS_TYPE --type=TYPE [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp host-groups delete

```text
NAME
    gcloud alpha netapp host-groups delete - delete a Cloud NetApp Host Group

SYNOPSIS
    gcloud alpha netapp host-groups delete (HOST_GROUP : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp host-groups describe

```text
NAME
    gcloud alpha netapp host-groups describe - describe a Cloud NetApp Host
        Group

SYNOPSIS
    gcloud alpha netapp host-groups describe (HOST_GROUP : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp host-groups list

```text
NAME
    gcloud alpha netapp host-groups list - list Cloud NetApp Host Groups

SYNOPSIS
    gcloud alpha netapp host-groups list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp host-groups update

```text
NAME
    gcloud alpha netapp host-groups update - update a Cloud NetApp Host Group

SYNOPSIS
    gcloud alpha netapp host-groups update (HOST_GROUP : --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--hosts=HOST,[HOST,...]]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/host-groups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
