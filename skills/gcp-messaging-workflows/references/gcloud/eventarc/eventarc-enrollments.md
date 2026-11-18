---
source: https://docs.cloud.google.com/sdk/gcloud/reference/eventarc/enrollments
---

# gcloud eventarc enrollments

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud eventarc enrollments create

```text
NAME
    gcloud eventarc enrollments create - create an Eventarc enrollment

SYNOPSIS
    gcloud eventarc enrollments create (ENROLLMENT : --location=LOCATION)
        --cel-match=CEL_MATCH --destination-pipeline=DESTINATION_PIPELINE
        (--message-bus=MESSAGE_BUS : --message-bus-project=MESSAGE_BUS_PROJECT)
        [--async] [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an Eventarc enrollment.

EXAMPLES
    To create a new enrollment my-enrollment in location us-central1 for
    message-bus my-message-bus with cel matching expression message.type ==
    "google.cloud.pubsub.topic.v1.messagePublished" and destination pipeline
    my-pipeline, run:

        $ gcloud eventarc enrollments create my-enrollment \
             --location=us-central1 --message-bus=my-message-bus \
             --cel-match="message.type == \
         'google.cloud.pubsub.topic.v1.messagePublished'" \
             --destination-pipeline=my-pipeline

POSITIONAL ARGUMENTS
     Enrollment resource - The enrollment to create. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument enrollment on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENROLLMENT
          ID of the enrollment or fully qualified identifier for the
          enrollment.

          To set the enrollment attribute:
          + provide the argument enrollment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc enrollment, which should be one of the
          supported regions. Alternatively, set the [eventarc/location]
          property.

          To set the location attribute:
          + provide the argument enrollment on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

REQUIRED FLAGS
     --cel-match=CEL_MATCH
        The cel match expression for the enrollment.

     --destination-pipeline=DESTINATION_PIPELINE
        ID of the destination pipeline or fully qualified identifier for the
        destination pipeline.

        To set the pipeline attribute:
        * provide the argument --destination-pipeline on the command line.

     Message bus resource - The message bus to which the enrollment attaches.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the location attribute:
      * provide the argument --message-bus on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property eventarc/location.

     This must be specified.

       --message-bus=MESSAGE_BUS
          ID of the message bus or fully qualified identifier for the message
          bus.

          To set the message-bus attribute:
          + provide the argument --message-bus on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --message-bus-project=MESSAGE_BUS_PROJECT
          Project ID of the Google Cloud project for the message bus.

          To set the project attribute:
          + provide the argument --message-bus on the command line with a
            fully specified name;
          + provide the argument --message-bus-project on the command line;
          + provide the argument --project on the command line;
          + set the property core/project.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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
    This variant is also available:

        $ gcloud beta eventarc enrollments create
```

### gcloud eventarc enrollments delete

```text
NAME
    gcloud eventarc enrollments delete - delete an Eventarc enrollment

SYNOPSIS
    gcloud eventarc enrollments delete (ENROLLMENT : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Eventarc enrollment.

EXAMPLES
    To delete the enrollment my-enrollment in location us-central1, run:

        $ gcloud eventarc enrollments delete my-enrollment \
             --location=us-central1

POSITIONAL ARGUMENTS
     Enrollment resource - Enrollment to delete. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument enrollment on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENROLLMENT
          ID of the enrollment or fully qualified identifier for the
          enrollment.

          To set the enrollment attribute:
          + provide the argument enrollment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc enrollment, which should be one of the
          supported regions. Alternatively, set the [eventarc/location]
          property.

          To set the location attribute:
          + provide the argument enrollment on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

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
    This variant is also available:

        $ gcloud beta eventarc enrollments delete
```

### gcloud eventarc enrollments describe

```text
NAME
    gcloud eventarc enrollments describe - describe an Eventarc enrollment

SYNOPSIS
    gcloud eventarc enrollments describe (ENROLLMENT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Eventarc enrollment.

EXAMPLES
    To describe the enrollment my-enrollment in location us-central1, run:

        $ gcloud eventarc enrollments describe my-enrollment \
             --location=us-central1

POSITIONAL ARGUMENTS
     Enrollment resource - Enrollment to describe. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument enrollment on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENROLLMENT
          ID of the enrollment or fully qualified identifier for the
          enrollment.

          To set the enrollment attribute:
          + provide the argument enrollment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc enrollment, which should be one of the
          supported regions. Alternatively, set the [eventarc/location]
          property.

          To set the location attribute:
          + provide the argument enrollment on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta eventarc enrollments describe
```

### gcloud eventarc enrollments list

```text
NAME
    gcloud eventarc enrollments list - list Eventarc enrollments

SYNOPSIS
    gcloud eventarc enrollments list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Eventarc enrollments.

EXAMPLES
    To list all enrollments in location us-central1, run:

        $ gcloud eventarc enrollments list --location=us-central1

    To list all enrollments in all locations, run:

        $ gcloud eventarc enrollments list --location=-

    or

        $ gcloud eventarc enrollments list

FLAGS
     Location resource - The location for which to list enrollments. This
     should be one of the supported regions. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property eventarc/location with a fully specified name;
      * use '-' location to aggregate results for all Eventarc locations with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property eventarc/location;
        * use '-' location to aggregate results for all Eventarc locations.

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
    This variant is also available:

        $ gcloud beta eventarc enrollments list
```

### gcloud eventarc enrollments update

```text
NAME
    gcloud eventarc enrollments update - update an Eventarc enrollment

SYNOPSIS
    gcloud eventarc enrollments update (ENROLLMENT : --location=LOCATION)
        [--async] [--cel-match=CEL_MATCH]
        [--destination-pipeline=DESTINATION_PIPELINE]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Eventarc enrollment.

EXAMPLES
    To update the enrollment my-enrollment with a new CEL expression
    message.type == 'google.cloud.pubsub.topic.v1.messagePublished', run:

        $ gcloud eventarc enrollments update my-enrollment \
             --location=us-central1 \
             --cel-match="message.type == \
         'google.cloud.pubsub.topic.v1.messagePublished'"

POSITIONAL ARGUMENTS
     Enrollment resource - The enrollment to update. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument enrollment on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENROLLMENT
          ID of the enrollment or fully qualified identifier for the
          enrollment.

          To set the enrollment attribute:
          + provide the argument enrollment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc enrollment, which should be one of the
          supported regions. Alternatively, set the [eventarc/location]
          property.

          To set the location attribute:
          + provide the argument enrollment on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --cel-match=CEL_MATCH
        The cel match expression for the enrollment.

     --destination-pipeline=DESTINATION_PIPELINE
        ID of the pipeline or fully qualified identifier for the pipeline.

        To set the pipeline attribute:
        * provide the argument --destination-pipeline on the command line.

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

              $ gcloud eventarc enrollments update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud eventarc enrollments update --clear-labels \
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

        $ gcloud beta eventarc enrollments update
```

### gcloud beta eventarc enrollments create

```text
NAME
    gcloud beta eventarc enrollments create - create an Eventarc enrollment

SYNOPSIS
    gcloud beta eventarc enrollments create (ENROLLMENT : --location=LOCATION)
        --cel-match=CEL_MATCH --destination-pipeline=DESTINATION_PIPELINE
        (--message-bus=MESSAGE_BUS : --message-bus-project=MESSAGE_BUS_PROJECT)
        [--async] [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta eventarc enrollments delete

```text
NAME
    gcloud beta eventarc enrollments delete - delete an Eventarc enrollment

SYNOPSIS
    gcloud beta eventarc enrollments delete (ENROLLMENT : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta eventarc enrollments describe

```text
NAME
    gcloud beta eventarc enrollments describe - describe an Eventarc enrollment

SYNOPSIS
    gcloud beta eventarc enrollments describe
        (ENROLLMENT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta eventarc enrollments list

```text
NAME
    gcloud beta eventarc enrollments list - list Eventarc enrollments

SYNOPSIS
    gcloud beta eventarc enrollments list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta eventarc enrollments update

```text
NAME
    gcloud beta eventarc enrollments update - update an Eventarc enrollment

SYNOPSIS
    gcloud beta eventarc enrollments update (ENROLLMENT : --location=LOCATION)
        [--async] [--cel-match=CEL_MATCH]
        [--destination-pipeline=DESTINATION_PIPELINE]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Corrected from the official docs (the help text above is verbatim): the `create` and `update` examples match `message.type == 'google.cloud.pubsub.topic.v1.messagePublished'`, but Eventarc Advanced does not support direct events from Cloud Pub/Sub (https://docs.cloud.google.com/eventarc/docs/event-types, retrieved 2026-11-18), so an enrollment with this expression matches no Google-sourced Pub/Sub events; use an event type that Eventarc Advanced supports, for example `google.cloud.dataflow.job.v1beta3.statusChanged` (the example of https://docs.cloud.google.com/eventarc/advanced/docs/receive-events/create-enrollment), or a type that your own publisher sends to the bus.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/eventarc/enrollments (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
