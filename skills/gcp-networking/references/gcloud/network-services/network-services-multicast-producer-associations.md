---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-services/multicast-producer-associations
---

# gcloud network-services multicast-producer-associations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-services multicast-producer-associations create

```text
NAME
    gcloud network-services multicast-producer-associations create - create a
        multicast producer association

SYNOPSIS
    gcloud network-services multicast-producer-associations create
        (MULTICAST_PRODUCER_ASSOCIATION : --location=LOCATION)
        --multicast-domain-activation=MULTICAST_DOMAIN_ACTIVATION
        --network=NETWORK [--async] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a multicast producer association in the specified location of the
    current project.

EXAMPLES
    Create a multicast producer association with the name
    'my-multicast-producer-association', multicast-domain-activation
    'path-to-mda', network 'path-to-network', and location 'zone'.

        $ gcloud network-services multicast-producer-associations create \
            my-multicast-producer-association \
            --multicast-domain-activation=path-to-mda \
            --network=path-to-network --location=zone

POSITIONAL ARGUMENTS
     Multicast producer association resource - Name of the multicast producer
     association to be created. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument multicast_producer_association on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICAST_PRODUCER_ASSOCIATION
          ID of the multicast producer association or fully qualified
          identifier for the multicast producer association.

          To set the multicast_producer_association attribute:
          + provide the argument multicast_producer_association on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument multicast_producer_association on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --multicast-domain-activation=MULTICAST_DOMAIN_ACTIVATION
        The multicast domain activation to be used.

     --network=NETWORK
        The path of the multicast producer VPC network.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        The description for the multicast producer association.

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

        $ gcloud alpha network-services multicast-producer-associations \
            create

        $ gcloud beta network-services multicast-producer-associations create
```

### gcloud network-services multicast-producer-associations delete

```text
NAME
    gcloud network-services multicast-producer-associations delete - delete a
        multicast producer association

SYNOPSIS
    gcloud network-services multicast-producer-associations delete
        (MULTICAST_PRODUCER_ASSOCIATION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a multicast producer association in the specified location of the
    current project.

EXAMPLES
    To delete a multicast producer association in the current project, run:

        $ gcloud network-services multicast-producer-associations delete \
            my-multicast-producer-association --location=zone

POSITIONAL ARGUMENTS
     Multicast producer association resource - The multicast producer
     association to delete. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument multicast_producer_association on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICAST_PRODUCER_ASSOCIATION
          ID of the multicast producer association or fully qualified
          identifier for the multicast producer association.

          To set the multicast_producer_association attribute:
          + provide the argument multicast_producer_association on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument multicast_producer_association on the
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

        $ gcloud alpha network-services multicast-producer-associations \
            delete

        $ gcloud beta network-services multicast-producer-associations delete
```

### gcloud network-services multicast-producer-associations describe

```text
NAME
    gcloud network-services multicast-producer-associations describe - describe
        a multicast producer associations

SYNOPSIS
    gcloud network-services multicast-producer-associations describe
        (MULTICAST_PRODUCER_ASSOCIATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of a multicast producer association in the specified location
    of the current project.

EXAMPLES
    To describe details of a multicast producer association in the current
    project and location, run:

        $ gcloud network-services multicast-producer-associations describe \
            my-multicast-producer-association --location=zone

POSITIONAL ARGUMENTS
     Multicast producer association resource - The multicast producer
     association to display. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument multicast_producer_association on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICAST_PRODUCER_ASSOCIATION
          ID of the multicast producer association or fully qualified
          identifier for the multicast producer association.

          To set the multicast_producer_association attribute:
          + provide the argument multicast_producer_association on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument multicast_producer_association on the
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

        $ gcloud alpha network-services multicast-producer-associations \
            describe

        $ gcloud beta network-services multicast-producer-associations \
            describe
```

### gcloud network-services multicast-producer-associations list

```text
NAME
    gcloud network-services multicast-producer-associations list - list
        multicast producer associations

SYNOPSIS
    gcloud network-services multicast-producer-associations list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all multicast producer associations in the specified location of the
    current project.

EXAMPLES
    To list multicast producer associations in the current project and
    location, run:

        $ gcloud network-services multicast-producer-associations list \
            --location=zone

REQUIRED FLAGS
     Location resource - The location of the multicast producer associations to
     display. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

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

        $ gcloud alpha network-services multicast-producer-associations list

        $ gcloud beta network-services multicast-producer-associations list
```

### gcloud network-services multicast-producer-associations update

```text
NAME
    gcloud network-services multicast-producer-associations update - update a
        multicast producer association

SYNOPSIS
    gcloud network-services multicast-producer-associations update
        (MULTICAST_PRODUCER_ASSOCIATION : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a multicast producer association in the specified location of the
    current project.

EXAMPLES
    Update a multicast producer association with the name
    my-multicast-producer-association and location zone.

        $ gcloud network-services multicast-producer-associations update \
            my-multicast-producer-association \
            --description="new description" --location=zone

POSITIONAL ARGUMENTS
     Multicast producer association resource - Name of the multicast producer
     association to be updated. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument multicast_producer_association on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICAST_PRODUCER_ASSOCIATION
          ID of the multicast producer association or fully qualified
          identifier for the multicast producer association.

          To set the multicast_producer_association attribute:
          + provide the argument multicast_producer_association on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument multicast_producer_association on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        The description for the multicast producer association.

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

              $ gcloud network-services multicast-producer-associations update \
                --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-services multicast-producer-associations update \
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

        $ gcloud alpha network-services multicast-producer-associations \
            update

        $ gcloud beta network-services multicast-producer-associations update
```

### gcloud beta network-services multicast-producer-associations create

```text
NAME
    gcloud beta network-services multicast-producer-associations create -
        create a multicast producer association

SYNOPSIS
    gcloud beta network-services multicast-producer-associations create
        (MULTICAST_PRODUCER_ASSOCIATION : --location=LOCATION)
        --multicast-domain-activation=MULTICAST_DOMAIN_ACTIVATION
        --network=NETWORK [--async] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services multicast-producer-associations delete

```text
NAME
    gcloud beta network-services multicast-producer-associations delete -
        delete a multicast producer association

SYNOPSIS
    gcloud beta network-services multicast-producer-associations delete
        (MULTICAST_PRODUCER_ASSOCIATION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services multicast-producer-associations describe

```text
NAME
    gcloud beta network-services multicast-producer-associations describe -
        describe a multicast producer associations

SYNOPSIS
    gcloud beta network-services multicast-producer-associations describe
        (MULTICAST_PRODUCER_ASSOCIATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services multicast-producer-associations list

```text
NAME
    gcloud beta network-services multicast-producer-associations list - list
        multicast producer associations

SYNOPSIS
    gcloud beta network-services multicast-producer-associations list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services multicast-producer-associations update

```text
NAME
    gcloud beta network-services multicast-producer-associations update -
        update a multicast producer association

SYNOPSIS
    gcloud beta network-services multicast-producer-associations update
        (MULTICAST_PRODUCER_ASSOCIATION : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-producer-associations create

```text
NAME
    gcloud alpha network-services multicast-producer-associations create -
        create a multicast producer association

SYNOPSIS
    gcloud alpha network-services multicast-producer-associations create
        (MULTICAST_PRODUCER_ASSOCIATION : --location=LOCATION)
        --multicast-domain-activation=MULTICAST_DOMAIN_ACTIVATION
        --network=NETWORK [--async] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-producer-associations delete

```text
NAME
    gcloud alpha network-services multicast-producer-associations delete -
        delete a multicast producer association

SYNOPSIS
    gcloud alpha network-services multicast-producer-associations delete
        (MULTICAST_PRODUCER_ASSOCIATION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-producer-associations describe

```text
NAME
    gcloud alpha network-services multicast-producer-associations describe -
        describe a multicast producer associations

SYNOPSIS
    gcloud alpha network-services multicast-producer-associations describe
        (MULTICAST_PRODUCER_ASSOCIATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-producer-associations list

```text
NAME
    gcloud alpha network-services multicast-producer-associations list - list
        multicast producer associations

SYNOPSIS
    gcloud alpha network-services multicast-producer-associations list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-producer-associations update

```text
NAME
    gcloud alpha network-services multicast-producer-associations update -
        update a multicast producer association

SYNOPSIS
    gcloud alpha network-services multicast-producer-associations update
        (MULTICAST_PRODUCER_ASSOCIATION : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-services/multicast-producer-associations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
