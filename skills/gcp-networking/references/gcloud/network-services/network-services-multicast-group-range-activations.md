---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-services/multicast-group-range-activations
---

# gcloud network-services multicast-group-range-activations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-services multicast-group-range-activations create

```text
NAME
    gcloud network-services multicast-group-range-activations create - create a
        multicast group range activation

SYNOPSIS
    gcloud network-services multicast-group-range-activations create
        (MULTICAST_GROUP_RANGE_ACTIVATION : --location=LOCATION)
        --multicast-domain-activation=MULTICAST_DOMAIN_ACTIVATION
        --multicast-group-range=MULTICAST_GROUP_RANGE [--async]
        [--description=DESCRIPTION] [--[no-]enable-logging]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a multicast group range activation in the specified location of the
    current project.

EXAMPLES
    Create a multicast group range activation with the name
    'my-mg-range-activation', multicast-group-range 'path-to-mgr',
    multicast-domain-activation 'path-to-mda', and location 'zone'.

        $ gcloud network-services multicast-group-range-activations create \
            my-mg-range-activation --multicast-group-range=path-to-mgr \
            --multicast-domain-activation=path-to-mda --location=zone

POSITIONAL ARGUMENTS
     Multicast group range activation resource - Name of the multicast group
     range activation to be created. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument multicast_group_range_activation on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICAST_GROUP_RANGE_ACTIVATION
          ID of the multicast group range activation or fully qualified
          identifier for the multicast group range activation.

          To set the multicast_group_range_activation attribute:
          + provide the argument multicast_group_range_activation on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument multicast_group_range_activation on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --multicast-domain-activation=MULTICAST_DOMAIN_ACTIVATION
        The multicast domain activation to be used.

     --multicast-group-range=MULTICAST_GROUP_RANGE
        The multicast group range to be used.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        The description for the multicast group.

     --[no-]enable-logging
        Whether to enable logging for this multicast group range activation.
        Use --enable-logging to enable and --no-enable-logging to disable.

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

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services multicast-group-range-activations \
            create

        $ gcloud beta network-services multicast-group-range-activations \
            create
```

### gcloud network-services multicast-group-range-activations delete

```text
NAME
    gcloud network-services multicast-group-range-activations delete - delete a
        multicast group range activation

SYNOPSIS
    gcloud network-services multicast-group-range-activations delete
        (MULTICAST_GROUP_RANGE_ACTIVATION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a multicast group range activation in the specified location of the
    current project.

EXAMPLES
    To delete a multicast group range activation in the current project, run:

        $ gcloud network-services multicast-group-range-activations delete \
            my-mg-range-activation --location=zone

POSITIONAL ARGUMENTS
     Multicast group range activation resource - The multicast group range
     activation to delete. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument multicast_group_range_activation on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICAST_GROUP_RANGE_ACTIVATION
          ID of the multicast group range activation or fully qualified
          identifier for the multicast group range activation.

          To set the multicast_group_range_activation attribute:
          + provide the argument multicast_group_range_activation on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument multicast_group_range_activation on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

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
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services multicast-group-range-activations \
            delete

        $ gcloud beta network-services multicast-group-range-activations \
            delete
```

### gcloud network-services multicast-group-range-activations describe

```text
NAME
    gcloud network-services multicast-group-range-activations describe -
        describe a multicast group range activations

SYNOPSIS
    gcloud network-services multicast-group-range-activations describe
        (MULTICAST_GROUP_RANGE_ACTIVATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of a multicast group range activation in the specified
    location of the current project.

EXAMPLES
    To describe details of a multicast group range activation in the current
    project and location, run:

        $ gcloud network-services multicast-group-range-activations \
            describe my-mg-range-activation --location=zone

POSITIONAL ARGUMENTS
     Multicast group range activation resource - The multicast group range
     activation to display. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument multicast_group_range_activation on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICAST_GROUP_RANGE_ACTIVATION
          ID of the multicast group range activation or fully qualified
          identifier for the multicast group range activation.

          To set the multicast_group_range_activation attribute:
          + provide the argument multicast_group_range_activation on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument multicast_group_range_activation on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services multicast-group-range-activations \
            describe

        $ gcloud beta network-services multicast-group-range-activations \
            describe
```

### gcloud network-services multicast-group-range-activations list

```text
NAME
    gcloud network-services multicast-group-range-activations list - list
        multicast group range activations

SYNOPSIS
    gcloud network-services multicast-group-range-activations list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all multicast group range activations in the specified location of the
    current project.

EXAMPLES
    To list multicast group range activations in the current project and
    location, run:

        $ gcloud network-services multicast-group-range-activations list \
            --location=zone

REQUIRED FLAGS
     Location resource - The location of the multicast groups to display. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

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

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services multicast-group-range-activations \
            list

        $ gcloud beta network-services multicast-group-range-activations list
```

### gcloud network-services multicast-group-range-activations update

```text
NAME
    gcloud network-services multicast-group-range-activations update - update a
        multicast group range activation

SYNOPSIS
    gcloud network-services multicast-group-range-activations update
        (MULTICAST_GROUP_RANGE_ACTIVATION : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--[no-]enable-logging]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a multicast group range activation in the specified location of the
    current project.

EXAMPLES
    Update a multicast group range activation with the name
    'my-multicast-group-range-activation' and location 'zone'.

        $ gcloud network-services multicast-group-range-activations update \
            my-multicast-group-range-activation --enable-logging \
            --location=zone

POSITIONAL ARGUMENTS
     Multicast group range activation resource - Name of the multicast group
     range to be updated. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument multicast_group_range_activation on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICAST_GROUP_RANGE_ACTIVATION
          ID of the multicast group range activation or fully qualified
          identifier for the multicast group range activation.

          To set the multicast_group_range_activation attribute:
          + provide the argument multicast_group_range_activation on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument multicast_group_range_activation on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        The description for the multicast group range activation.

     --[no-]enable-logging
        Whether to enable logging for this multicast group range activation.
        Use --enable-logging to enable and --no-enable-logging to disable.

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

              $ gcloud network-services multicast-group-range-activations update \
                --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-services multicast-group-range-activations update \
                --clear-labels --update-labels foo=bar,baz=qux

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

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services multicast-group-range-activations \
            update

        $ gcloud beta network-services multicast-group-range-activations \
            update
```

### gcloud beta network-services multicast-group-range-activations create

```text
NAME
    gcloud beta network-services multicast-group-range-activations create -
        create a multicast group range activation

SYNOPSIS
    gcloud beta network-services multicast-group-range-activations create
        (MULTICAST_GROUP_RANGE_ACTIVATION : --location=LOCATION)
        --multicast-domain-activation=MULTICAST_DOMAIN_ACTIVATION
        --multicast-group-range=MULTICAST_GROUP_RANGE [--async]
        [--description=DESCRIPTION] [--[no-]enable-logging]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services multicast-group-range-activations delete

```text
NAME
    gcloud beta network-services multicast-group-range-activations delete -
        delete a multicast group range activation

SYNOPSIS
    gcloud beta network-services multicast-group-range-activations delete
        (MULTICAST_GROUP_RANGE_ACTIVATION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services multicast-group-range-activations describe

```text
NAME
    gcloud beta network-services multicast-group-range-activations describe -
        describe a multicast group range activations

SYNOPSIS
    gcloud beta network-services multicast-group-range-activations describe
        (MULTICAST_GROUP_RANGE_ACTIVATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services multicast-group-range-activations list

```text
NAME
    gcloud beta network-services multicast-group-range-activations list - list
        multicast group range activations

SYNOPSIS
    gcloud beta network-services multicast-group-range-activations list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services multicast-group-range-activations update

```text
NAME
    gcloud beta network-services multicast-group-range-activations update -
        update a multicast group range activation

SYNOPSIS
    gcloud beta network-services multicast-group-range-activations update
        (MULTICAST_GROUP_RANGE_ACTIVATION : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--[no-]enable-logging]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-group-range-activations create

```text
NAME
    gcloud alpha network-services multicast-group-range-activations create -
        create a multicast group range activation

SYNOPSIS
    gcloud alpha network-services multicast-group-range-activations create
        (MULTICAST_GROUP_RANGE_ACTIVATION : --location=LOCATION)
        --multicast-domain-activation=MULTICAST_DOMAIN_ACTIVATION
        --multicast-group-range=MULTICAST_GROUP_RANGE [--async]
        [--description=DESCRIPTION] [--[no-]enable-logging]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-group-range-activations delete

```text
NAME
    gcloud alpha network-services multicast-group-range-activations delete -
        delete a multicast group range activation

SYNOPSIS
    gcloud alpha network-services multicast-group-range-activations delete
        (MULTICAST_GROUP_RANGE_ACTIVATION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-group-range-activations describe

```text
NAME
    gcloud alpha network-services multicast-group-range-activations describe -
        describe a multicast group range activations

SYNOPSIS
    gcloud alpha network-services multicast-group-range-activations describe
        (MULTICAST_GROUP_RANGE_ACTIVATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-group-range-activations list

```text
NAME
    gcloud alpha network-services multicast-group-range-activations list - list
        multicast group range activations

SYNOPSIS
    gcloud alpha network-services multicast-group-range-activations list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-group-range-activations update

```text
NAME
    gcloud alpha network-services multicast-group-range-activations update -
        update a multicast group range activation

SYNOPSIS
    gcloud alpha network-services multicast-group-range-activations update
        (MULTICAST_GROUP_RANGE_ACTIVATION : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--[no-]enable-logging]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-services/multicast-group-range-activations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
