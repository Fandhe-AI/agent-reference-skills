---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bms/networks
---

# gcloud bms networks

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bms networks describe

```text
NAME
    gcloud bms networks describe - describe a Bare Metal solution network

SYNOPSIS
    gcloud bms networks describe (NETWORK : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Bare Metal Solution network.

EXAMPLES
    To get a description of a network called my-network in project my-project
    and region us-central1, run:

        $ gcloud bms networks describe my-network --project=my-project \
            --region=us-central1

POSITIONAL ARGUMENTS
     Network resource - network. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NETWORK
          ID of the network or fully qualified identifier for the network.

          To set the network attribute:
          + provide the argument network on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument network on the command line with a fully
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

        $ gcloud alpha bms networks describe
```

### gcloud bms networks list

```text
NAME
    gcloud bms networks list - list Bare Metal Solution networks in a project

SYNOPSIS
    gcloud bms networks list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Bare Metal Solution networks in a project.

EXAMPLES
    To list networks in the region us-central1, run:

        $ gcloud bms networks list --region=us-central1

    Or:

    To list all networks in the project, run:

        $ gcloud bms networks list

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
        --flatten, --sort-by, --filter, --limit.

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

        $ gcloud alpha bms networks list
```

### gcloud bms networks list-ip-reservations

```text
NAME
    gcloud bms networks list-ip-reservations - list IP range reservations for
        Bare Metal Solution networks in a project

SYNOPSIS
    gcloud bms networks list-ip-reservations [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List IP range reservations for Bare Metal Solution networks in a project.

EXAMPLES
    To list IP range reservations for networks in the region us-central1, run:

        $ gcloud bms networks list-ip-reservations --region=us-central1

    Or:

    To list all IP range reservations in the project, run:

        $ gcloud bms networks list-ip-reservations

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
        --flatten, --sort-by, --filter, --limit.

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

        $ gcloud alpha bms networks list-ip-reservations
```

### gcloud bms networks rename

```text
NAME
    gcloud bms networks rename - rename a Bare Metal Solution network

SYNOPSIS
    gcloud bms networks rename (NETWORK : --region=REGION) --new-name=NEW_NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Rename a Bare Metal Solution network.

EXAMPLES
    To rename a network my-network to my-new-network-name in region
    us-central1, run:

        $ gcloud bms networks rename my-network \
            --new-name=my-new-network-name --region=us-central1 \
            --project=bms-example-project

POSITIONAL ARGUMENTS
     Network resource - network. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NETWORK
          ID of the network or fully qualified identifier for the network.

          To set the network attribute:
          + provide the argument network on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument network on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

REQUIRED FLAGS
     --new-name=NEW_NAME
        New network name for renaming an already existing network.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms networks rename
```

### gcloud bms networks update

```text
NAME
    gcloud bms networks update - update a Bare Metal Solution network

SYNOPSIS
    gcloud bms networks update (NETWORK : --region=REGION) [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--add-ip-range-reservation=[PROPERTY=VALUE,...]
          | --clear-ip-range-reservations
          | --remove-ip-range-reservation=[PROPERTY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Bare Metal Solution network.

    This call returns immediately, but the update operation may take several
    minutes to complete. To check if the operation is complete, use the
    describe command for the network.

EXAMPLES
    To update an network called my-network in region us-central1 with a new
    label key1=value1, run:

        $ gcloud bms networks update my-network --region=us-central1 \
            --update-labels=key1=value1

    To clear all labels, run:

        $ gcloud bms networks update my-network --region=us-central1 \
            --clear-labels

POSITIONAL ARGUMENTS
     Network resource - network. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NETWORK
          ID of the network or fully qualified identifier for the network.

          To set the network attribute:
          + provide the argument network on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument network on the command line with a fully
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

       --add-ip-range-reservation=[PROPERTY=VALUE,...]
          Add a reservation of a range of IP addresses in the network.

           start_address
              The first address of this reservation block. Must be specified as
              a single IPv4 address, e.g. 10.1.2.2.

           end_address
              The last address of this reservation block, inclusive. I.e., for
              cases when reservations are only single addresses, end_address
              and start_address will be the same. Must be specified as a single
              IPv4 address, e.g. 10.1.2.2.

           note
              A note about this reservation, intended for human consumption.

       --clear-ip-range-reservations
          Removes all IP range reservations in the network.

       --remove-ip-range-reservation=[PROPERTY=VALUE,...]
          Remove a reservation of a range of IP addresses in the network.

           start_address
              The first address of the reservation block to remove.

           end_address
              The last address of the reservation block to remove.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud bms networks update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud bms networks update --clear-labels \
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

        $ gcloud alpha bms networks update
```

### gcloud alpha bms networks describe

```text
NAME
    gcloud alpha bms networks describe - describe a Bare Metal solution network

SYNOPSIS
    gcloud alpha bms networks describe (NETWORK : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms networks list

```text
NAME
    gcloud alpha bms networks list - list Bare Metal Solution networks in a
        project

SYNOPSIS
    gcloud alpha bms networks list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms networks list-ip-reservations

```text
NAME
    gcloud alpha bms networks list-ip-reservations - list IP range reservations
        for Bare Metal Solution networks in a project

SYNOPSIS
    gcloud alpha bms networks list-ip-reservations [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms networks rename

```text
NAME
    gcloud alpha bms networks rename - rename a Bare Metal Solution network

SYNOPSIS
    gcloud alpha bms networks rename (NETWORK : --region=REGION)
        --new-name=NEW_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms networks update

```text
NAME
    gcloud alpha bms networks update - update a Bare Metal Solution network

SYNOPSIS
    gcloud alpha bms networks update (NETWORK : --region=REGION) [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--add-ip-range-reservation=[PROPERTY=VALUE,...]
          | --clear-ip-range-reservations
          | --remove-ip-range-reservation=[PROPERTY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bms/networks (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
