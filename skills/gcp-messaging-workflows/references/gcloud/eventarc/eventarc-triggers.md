---
source: https://docs.cloud.google.com/sdk/gcloud/reference/eventarc/triggers
---

# gcloud eventarc triggers

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud eventarc triggers create

```text
NAME
    gcloud eventarc triggers create - create an Eventarc trigger

SYNOPSIS
    gcloud eventarc triggers create (TRIGGER : --location=LOCATION)
        --event-filters=[ATTRIBUTE=VALUE,...]
        ([--destination-gke-cluster=DESTINATION_GKE_CLUSTER
          --destination-gke-service=DESTINATION_GKE_SERVICE
          : --destination-gke-location=DESTINATION_GKE_LOCATION
          --destination-gke-namespace=DESTINATION_GKE_NAMESPACE
          --destination-gke-path=DESTINATION_GKE_PATH]
          | [--destination-http-endpoint-uri=DESTINATION_HTTP_ENDPOINT_URI
          : --network-attachment=NETWORK_ATTACHMENT]
          | [--destination-run-service=DESTINATION_RUN_SERVICE
          : --destination-run-path=DESTINATION_RUN_PATH
          --destination-run-region=DESTINATION_RUN_REGION]
          | [--destination-workflow=DESTINATION_WORKFLOW
          : --destination-workflow-location=DESTINATION_WORKFLOW_LOCATION])
        [--async] [--channel=CHANNEL]
        [--event-data-content-type=EVENT_DATA_CONTENT_TYPE]
        [--event-filters-path-pattern=[ATTRIBUTE=PATH_PATTERN,...]]
        [--labels=[KEY=VALUE,...]] [--max-retry-attempts=MAX_RETRY_ATTEMPTS]
        [--service-account=SERVICE_ACCOUNT] [--transport-topic=TRANSPORT_TOPIC]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an Eventarc trigger.

EXAMPLES
    To create a new trigger my-trigger for events of type
    google.cloud.pubsub.topic.v1.messagePublished with destination Cloud Run
    service my-service, run:

        $ gcloud eventarc triggers create my-trigger \
             --event-filters="type=google.cloud.pubsub.topic.v1.messagePublis\
         hed" --destination-run-service=my-service

POSITIONAL ARGUMENTS
     Trigger resource - The trigger to create. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument trigger on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRIGGER
          ID of the trigger or fully qualified identifier for the trigger.

          To set the trigger attribute:
          + provide the argument trigger on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc trigger, which should be either global
          or one of the supported regions. Alternatively, set the
          [eventarc/location] property.

          To set the location attribute:
          + provide the argument trigger on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

REQUIRED FLAGS
     --event-filters=[ATTRIBUTE=VALUE,...]
        The trigger's list of filters that apply to CloudEvents attributes.
        This flag can be repeated to add more filters to the list. Only events
        that match all these filters will be sent to the destination. The
        filters must include the type attribute, as well as any other
        attributes that are expected for the chosen type.

     Flags for specifying the destination to which events should be sent.

     Exactly one of these must be specified:

       Flags for specifying a GKE service destination.

       --destination-gke-cluster=DESTINATION_GKE_CLUSTER
          Name of the GKE cluster that the destination GKE service is running
          in. The cluster must be in the same project as the trigger.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --destination-gke-service=DESTINATION_GKE_SERVICE
          Name of the destination GKE service that receives the events for the
          trigger.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --destination-gke-location=DESTINATION_GKE_LOCATION
          Location of the GKE cluster that the destination GKE service is
          running in. If not specified, it is assumed that the cluster is a
          regional cluster and is in the same region as the trigger.

       --destination-gke-namespace=DESTINATION_GKE_NAMESPACE
          Namespace that the destination GKE service is running in. If not
          specified, the default namespace is used.

       --destination-gke-path=DESTINATION_GKE_PATH
          Relative path on the destination GKE service to which the events for
          the trigger should be sent. Examples: /route, route, route/subroute.

       Flags for specifying a HTTP Endpoint destination.

       --destination-http-endpoint-uri=DESTINATION_HTTP_ENDPOINT_URI
          URI that the destination HTTP Endpoint is connecting to.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       Flags for specifying a Network Config for the destination.

       --network-attachment=NETWORK_ATTACHMENT
          The network attachment associated with the trigger that allows access
          to the destination VPC.

       Flags for specifying a Cloud Run fully-managed resource destination.

       --destination-run-service=DESTINATION_RUN_SERVICE
          Name of the Cloud Run fully-managed service that receives the events
          for the trigger. The service must be in the same project as the
          trigger.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --destination-run-path=DESTINATION_RUN_PATH
          Relative path on the destination Cloud Run service to which the
          events for the trigger should be sent. Examples: /route, route,
          route/subroute.

       --destination-run-region=DESTINATION_RUN_REGION
          Region in which the destination Cloud Run service can be found. If
          not specified, it is assumed that the service is in the same region
          as the trigger.

       Flags for specifying a Cloud Workflows destination.

       --destination-workflow=DESTINATION_WORKFLOW
          ID of the workflow that receives the events for the trigger. The
          workflow must be in the same project as the trigger.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --destination-workflow-location=DESTINATION_WORKFLOW_LOCATION
          Location that the destination workflow is running in. If not
          specified, it is assumed that the workflow is in the same location as
          the trigger.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Channel resource - The channel to use in the trigger. The channel is
     needed only if trigger is created for a third-party provider. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --channel on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --channel on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property eventarc/location.

     --channel=CHANNEL
        ID of the channel or fully qualified identifier for the channel.

        To set the channel attribute:
        * provide the argument --channel on the command line.

     --event-data-content-type=EVENT_DATA_CONTENT_TYPE
        Depending on the event provider, you can specify the encoding of the
        event data payload that will be delivered to your destination, to
        either be encoded in application/json or application/protobuf. The
        default encoding is application/json. Note that for custom sources or
        third-party providers, or for direct events from Cloud Pub/Sub, this
        formatting option is not supported.

     --event-filters-path-pattern=[ATTRIBUTE=PATH_PATTERN,...]
        The trigger's list of filters in path pattern format that apply to
        CloudEvent attributes. This flag can be repeated to add more filters to
        the list. Only events that match all these filters will be sent to the
        destination. Currently, path pattern format is only available for the
        resourceName attribute for Cloud Audit Log events.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     The retry policy configuration for the trigger. Can only be set for Cloud
     Run destinations.

     --max-retry-attempts=MAX_RETRY_ATTEMPTS
        The maximum number of delivery attempts. The only valid value is 1.

     --service-account=SERVICE_ACCOUNT
        The IAM service account email associated with the trigger.

     Pub/Sub topic resource - The Cloud Pub/Sub topic to use for the trigger's
     transport intermediary. This feature is currently only available for
     triggers of event type google.cloud.pubsub.topic.v1.messagePublished. The
     topic must be in the same project as the trigger. If not specified, a
     transport topic will be created. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument --transport-topic on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --transport-topic=TRANSPORT_TOPIC
        ID of the Pub/Sub topic or fully qualified identifier for the Pub/Sub
        topic.

        To set the transport-topic attribute:
        * provide the argument --transport-topic on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud eventarc triggers create my-trigger \
    --event-filters="type=google.cloud.pubsub.topic.v1.messagePublished" \
    --destination-run-service=my-service
```

### gcloud eventarc triggers delete

```text
NAME
    gcloud eventarc triggers delete - delete an Eventarc trigger

SYNOPSIS
    gcloud eventarc triggers delete (TRIGGER : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Eventarc trigger.

EXAMPLES
    To delete the trigger my-trigger, run:

        $ gcloud eventarc triggers delete my-trigger

POSITIONAL ARGUMENTS
     Trigger resource - The trigger to delete. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument trigger on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRIGGER
          ID of the trigger or fully qualified identifier for the trigger.

          To set the trigger attribute:
          + provide the argument trigger on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc trigger, which should be either global
          or one of the supported regions. Alternatively, set the
          [eventarc/location] property.

          To set the location attribute:
          + provide the argument trigger on the command line with a fully
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
```

### gcloud eventarc triggers describe

```text
NAME
    gcloud eventarc triggers describe - describe an Eventarc trigger

SYNOPSIS
    gcloud eventarc triggers describe (TRIGGER : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Eventarc trigger.

EXAMPLES
    To describe the trigger my-trigger, run:

        $ gcloud eventarc triggers describe my-trigger

POSITIONAL ARGUMENTS
     Trigger resource - The trigger to describe. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument trigger on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRIGGER
          ID of the trigger or fully qualified identifier for the trigger.

          To set the trigger attribute:
          + provide the argument trigger on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc trigger, which should be either global
          or one of the supported regions. Alternatively, set the
          [eventarc/location] property.

          To set the location attribute:
          + provide the argument trigger on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud eventarc triggers list

```text
NAME
    gcloud eventarc triggers list - list Eventarc triggers

SYNOPSIS
    gcloud eventarc triggers list [--location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Eventarc triggers.

EXAMPLES
    To list all triggers in location us-central1, run:

        $ gcloud eventarc triggers list --location=us-central1

    To list all triggers in all locations, run:

        $ gcloud eventarc triggers list --location=-

    or

        $ gcloud eventarc triggers list

FLAGS
     Location resource - The location for which to list triggers. This should
     be either global or one of the supported regions. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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
```

### gcloud eventarc triggers update

```text
NAME
    gcloud eventarc triggers update - update an Eventarc trigger

SYNOPSIS
    gcloud eventarc triggers update (TRIGGER : --location=LOCATION) [--async]
        [--event-data-content-type=EVENT_DATA_CONTENT_TYPE]
        [--event-filters=[ATTRIBUTE=VALUE,...]]
        [--event-filters-path-pattern=[ATTRIBUTE=PATH_PATTERN,...]]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--clear-max-retry-attempts | --max-retry-attempts=MAX_RETRY_ATTEMPTS]
        [--clear-service-account | --service-account=SERVICE_ACCOUNT]
        [--destination-gke-namespace=DESTINATION_GKE_NAMESPACE
          --destination-gke-service=DESTINATION_GKE_SERVICE
          --clear-destination-gke-path
          | --destination-gke-path=DESTINATION_GKE_PATH
          | --destination-run-region=DESTINATION_RUN_REGION
          --destination-run-service=DESTINATION_RUN_SERVICE
          --clear-destination-run-path
          | --destination-run-path=DESTINATION_RUN_PATH
          | --destination-workflow=DESTINATION_WORKFLOW
          --destination-workflow-location=DESTINATION_WORKFLOW_LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Eventarc trigger.

EXAMPLES
    To update the trigger my-trigger by setting its destination Cloud Run
    service to my-service, run:

        $ gcloud eventarc triggers update my-trigger \
             --destination-run-service=my-service

POSITIONAL ARGUMENTS
     Trigger resource - The trigger to update. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument trigger on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRIGGER
          ID of the trigger or fully qualified identifier for the trigger.

          To set the trigger attribute:
          + provide the argument trigger on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc trigger, which should be either global
          or one of the supported regions. Alternatively, set the
          [eventarc/location] property.

          To set the location attribute:
          + provide the argument trigger on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --event-data-content-type=EVENT_DATA_CONTENT_TYPE
        Depending on the event provider, you can specify the encoding of the
        event data payload that will be delivered to your destination, to
        either be encoded in application/json or application/protobuf. The
        default encoding is application/json. Note that for custom sources or
        third-party providers, or for direct events from Cloud Pub/Sub, this
        formatting option is not supported.

     --event-filters=[ATTRIBUTE=VALUE,...]
        The trigger's list of filters that apply to CloudEvents attributes.
        This flag can be repeated to add more filters to the list. Only events
        that match all these filters will be sent to the destination. The
        filters must include the type attribute, as well as any other
        attributes that are expected for the chosen type.

     --event-filters-path-pattern=[ATTRIBUTE=PATH_PATTERN,...]
        The trigger's list of filters in path pattern format that apply to
        CloudEvent attributes. This flag can be repeated to add more filters to
        the list. Only events that match all these filters will be sent to the
        destination. Currently, path pattern format is only available for the
        resourceName attribute for Cloud Audit Log events.

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

              $ gcloud eventarc triggers update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud eventarc triggers update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

     The retry policy configuration for the trigger. Can only be set for Cloud
     Run destinations.

     At most one of these can be specified:

       --clear-max-retry-attempts
          Clear the maximum number of delivery attempts for the trigger.

       --max-retry-attempts=MAX_RETRY_ATTEMPTS
          The maximum number of delivery attempts. The only valid value is 1.

     At most one of these can be specified:

       --clear-service-account
          Clear the IAM service account associated with the trigger.

       --service-account=SERVICE_ACCOUNT
          The IAM service account email associated with the trigger.

     Flags for updating the destination to which events should be sent.

     At most one of these can be specified:

       Flags for updating a GKE service destination.

       --destination-gke-namespace=DESTINATION_GKE_NAMESPACE
          Namespace that the destination GKE service is running in. If not
          specified, the default namespace is used.

       --destination-gke-service=DESTINATION_GKE_SERVICE
          Name of the destination GKE service that receives the events for the
          trigger.

       At most one of these can be specified:

         --clear-destination-gke-path
            Clear the relative path on the destination GKE service to which the
            events for the trigger should be sent.

         --destination-gke-path=DESTINATION_GKE_PATH
            Relative path on the destination GKE service to which the events
            for the trigger should be sent. Examples: /route, route,
            route/subroute.

       Flags for updating a Cloud Run fully-managed resource destination.

       --destination-run-region=DESTINATION_RUN_REGION
          Region in which the destination Cloud Run service can be found. If
          not specified, it is assumed that the service is in the same region
          as the trigger.

       --destination-run-service=DESTINATION_RUN_SERVICE
          Name of the Cloud Run fully-managed service that receives the events
          for the trigger. The service must be in the same project as the
          trigger.

       At most one of these can be specified:

         --clear-destination-run-path
            Clear the relative path on the destination Cloud Run service to
            which the events for the trigger should be sent.

         --destination-run-path=DESTINATION_RUN_PATH
            Relative path on the destination Cloud Run service to which the
            events for the trigger should be sent. Examples: /route, route,
            route/subroute.

       Flags for updating a Cloud Workflows destination.

       --destination-workflow=DESTINATION_WORKFLOW
          ID of the workflow that receives the events for the trigger. The
          workflow must be in the same project as the trigger.

       --destination-workflow-location=DESTINATION_WORKFLOW_LOCATION
          Location that the destination workflow is running in. If not
          specified, it is assumed that the workflow is in the same location as
          the trigger.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/eventarc/triggers (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
