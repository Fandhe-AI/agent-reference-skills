---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/notifications
---

# gcloud storage buckets notifications

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage buckets notifications create

```text
NAME
    gcloud storage buckets notifications create - create a notification
        configuration on a bucket

SYNOPSIS
    gcloud storage buckets notifications create URL
        [--custom-attributes=[KEY=VALUE,...], -m [KEY=VALUE,...]]
        [--event-types=[NOTIFICATION_EVENT_TYPE,...],
          -e [NOTIFICATION_EVENT_TYPE,...]]
        [--object-prefix=OBJECT_PREFIX, -p OBJECT_PREFIX]
        [--payload-format=PAYLOAD_FORMAT, -f PAYLOAD_FORMAT; default="json"]
        [--skip-topic-setup, -s] [--topic=TOPIC, -t TOPIC]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud storage buckets notifications create creates a notification
    configuration on a bucket, establishing a flow of event notifications from
    Cloud Storage to a Cloud Pub/Sub topic. As part of creating this flow, it
    also verifies that the destination Cloud Pub/Sub topic exists, creating it
    if necessary, and verifies that the Cloud Storage bucket has permission to
    publish events to that topic, granting the permission if necessary.

    If a destination Cloud Pub/Sub topic is not specified with the -t flag,
    Cloud Storage chooses a topic name in the default project whose ID is the
    same as the bucket name. For example, if the default project ID specified
    is default-project and the bucket being configured is gs://example-bucket,
    the create command uses the Cloud Pub/Sub topic
    projects/default-project/topics/example-bucket.

    In order to enable notifications, your project's Cloud Storage service
    agent (https://cloud.google.com/storage/docs/projects#service-accounts)
    must have the IAM permission "pubsub.topics.publish". This command checks
    to see if the destination Cloud Pub/Sub topic grants the service agent this
    permission. If not, the create command attempts to grant it.

    A bucket can have up to 100 total notification configurations and up to 10
    notification configurations set to trigger for a specific event.

EXAMPLES
    Send notifications of all changes to the bucket example-bucket to the Cloud
    Pub/Sub topic projects/default-project/topics/example-bucket:

        $ gcloud storage buckets notifications create gs://example-bucket

    The same as the above but sends no notification payload:

        $ gcloud storage buckets notifications create \
            --payload-format=none gs://example-bucket

    Include custom metadata in notification payloads:

        $ gcloud storage buckets notifications create \
            --custom-attributes=key1:value1,key2:value2 gs://example-bucket

    Create a notification configuration that only sends an event when a new
    object has been created or an object is deleted:

        $ gcloud storage buckets notifications create \
            --event-types=OBJECT_FINALIZE,OBJECT_DELETE gs://example-bucket

    Create a topic and notification configuration that sends events only when
    they affect objects with the prefix photos/:

        $ gcloud storage buckets notifications create \
            --object-prefix=photos/ gs://example-bucket

    Specifies the destination topic ID files-to-process in the default project:

        $ gcloud storage buckets notifications create \
            --topic=files-to-process gs://example-bucket

    The same as above but specifies a Cloud Pub/Sub topic belonging to the
    specific cloud project example-project:

        $ gcloud storage buckets notifications create \
            --topic=projects/example-project/topics/files-to-process \
            gs://example-bucket

    Skip creating a topic when creating the notification configuraiton:

        $ gcloud storage buckets notifications create \
            --skip-topic-setup gs://example-bucket

POSITIONAL ARGUMENTS
     URL
        URL of the bucket to create the notification configuration on.

FLAGS
     --custom-attributes=[KEY=VALUE,...], -m [KEY=VALUE,...]
        Specifies key:value attributes that are appended to the set of
        attributes sent to Cloud Pub/Sub for all events associated with this
        notification configuration.

     --event-types=[NOTIFICATION_EVENT_TYPE,...], -e [NOTIFICATION_EVENT_TYPE,...]
        Specify event type filters for this notification configuration. Cloud
        Storage will send notifications of only these types. By default, Cloud
        Storage sends notifications for all event types. * OBJECT_FINALIZE: An
        object has been created. * OBJECT_METADATA_UPDATE: The metadata of an
        object has changed. * OBJECT_DELETE: An object has been permanently
        deleted. * OBJECT_ARCHIVE: A live version of an object has become a
        noncurrent version. NOTIFICATION_EVENT_TYPE must be one of:
        OBJECT_ARCHIVE, OBJECT_DELETE, OBJECT_FINALIZE, OBJECT_METADATA_UPDATE.

     --object-prefix=OBJECT_PREFIX, -p OBJECT_PREFIX
        Specifies a prefix path for this notification configuration. Cloud
        Storage will send notifications for only objects in the bucket whose
        names begin with the prefix.

     --payload-format=PAYLOAD_FORMAT, -f PAYLOAD_FORMAT; default="json"
        Specifies the payload format of notification messages. Notification
        details are available in the message attributes. 'none' sends no
        payload. PAYLOAD_FORMAT must be one of: json, none.

     --skip-topic-setup, -s
        Skips creation and permission assignment of the Cloud Pub/Sub topic.
        This is useful if the caller does not have permission to access the
        topic in question, or if the topic already exists and has the
        appropriate publish permission assigned.

     --topic=TOPIC, -t TOPIC
        Specifies the Cloud Pub/Sub topic to send notifications to. If not
        specified, this command chooses a topic whose project is your default
        project and whose ID is the same as the Cloud Storage bucket name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage buckets notifications create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud storage buckets notifications create \
    --custom-attributes=key1=value1,key2=value2 gs://example-bucket
```

### gcloud storage buckets notifications delete

```text
NAME
    gcloud storage buckets notifications delete - delete notification
        configurations from a bucket

SYNOPSIS
    gcloud storage buckets notifications delete URLS [URLS ...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud storage buckets notifications delete deletes notification
    configurations from a bucket. If a notification configuration name is
    passed as a parameter, that configuration alone is deleted. If a bucket
    name is passed, all notification configurations associated with the bucket
    are deleted.

    Cloud Pub/Sub topics associated with this notification configuration are
    not deleted by this command. Those must be deleted separately, for example
    with the command "gcloud pubsub topics delete".

EXAMPLES
    Delete a single notification configuration (with ID 3) in the bucket
    example-bucket:

        $ gcloud storage buckets notifications delete \
            projects/_/buckets/example-bucket/notificationConfigs/3

    Delete all notification configurations in the bucket example-bucket:

        $ gcloud storage buckets notifications delete gs://example-bucket

POSITIONAL ARGUMENTS
     URLS [URLS ...]
        Specifies notification configuration names or buckets.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage buckets notifications delete
```

### gcloud storage buckets notifications describe

```text
NAME
    gcloud storage buckets notifications describe - show metadata for a
        notification configuration

SYNOPSIS
    gcloud storage buckets notifications describe URL [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud storage buckets notifications describe prints populated metadata for
    a notification configuration.

EXAMPLES
    Describe a single notification configuration (with ID 3) in the bucket
    example-bucket:

        $ gcloud storage buckets notifications describe \
            projects/_/buckets/example-bucket/notificationConfigs/3

POSITIONAL ARGUMENTS
     URL
        The url of the notification configuration

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage buckets notifications describe
```

### gcloud storage buckets notifications list

```text
NAME
    gcloud storage buckets notifications list - list the notification
        configurations belonging to a given bucket

SYNOPSIS
    gcloud storage buckets notifications list [URLS ...] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud storage buckets notifications list provides a list of notification
    configurations belonging to a given bucket. The listed name of each
    configuration can be used with the delete sub-command to delete that
    specific notification config.

EXAMPLES
    Fetch the list of notification configs for the bucket example-bucket:

        $ gcloud storage buckets notifications list gs://example-bucket

    Fetch the notification configs in all buckets matching a wildcard:

        $ gcloud storage buckets notifications list gs://example-*

    Fetch all of the notification configs for buckets in the default project:

        $ gcloud storage buckets notifications list

POSITIONAL ARGUMENTS
     [URLS ...]
        Google Cloud Storage bucket paths. The path must begin with gs:// and
        may contain wildcard characters.

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

        $ gcloud alpha storage buckets notifications list
```

### gcloud alpha storage buckets notifications create

```text
NAME
    gcloud alpha storage buckets notifications create - create a notification
        configuration on a bucket

SYNOPSIS
    gcloud alpha storage buckets notifications create URL
        [--custom-attributes=[KEY=VALUE,...], -m [KEY=VALUE,...]]
        [--event-types=[NOTIFICATION_EVENT_TYPE,...],
          -e [NOTIFICATION_EVENT_TYPE,...]]
        [--object-prefix=OBJECT_PREFIX, -p OBJECT_PREFIX]
        [--payload-format=PAYLOAD_FORMAT, -f PAYLOAD_FORMAT; default="json"]
        [--skip-topic-setup, -s] [--topic=TOPIC, -t TOPIC]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage buckets notifications delete

```text
NAME
    gcloud alpha storage buckets notifications delete - delete notification
        configurations from a bucket

SYNOPSIS
    gcloud alpha storage buckets notifications delete URLS [URLS ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage buckets notifications describe

```text
NAME
    gcloud alpha storage buckets notifications describe - show metadata for a
        notification configuration

SYNOPSIS
    gcloud alpha storage buckets notifications describe URL
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage buckets notifications list

```text
NAME
    gcloud alpha storage buckets notifications list - list the notification
        configurations belonging to a given bucket

SYNOPSIS
    gcloud alpha storage buckets notifications list [URLS ...]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example passes `--custom-attributes=key1:value1,key2:value2`, but the flag takes `KEY=VALUE` pairs (SYNOPSIS) and gcloud 593.0.0 rejects the colon form ("Bad syntax for dict arg: [key1:value1]"); the runnable form uses `key1=value1,key2=value2`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/notifications (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
