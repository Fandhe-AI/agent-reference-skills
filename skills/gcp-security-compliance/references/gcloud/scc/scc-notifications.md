---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/notifications
---

# gcloud scc notifications

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scc notifications create

```text
NAME
    gcloud scc notifications create - create a Security Command Center
        notification config

SYNOPSIS
    gcloud scc notifications create NOTIFICATION_CONFIG_ID
        --pubsub-topic=PUBSUB_TOPIC [--[no-]deletion-notifications-enabled]
        [--description=DESCRIPTION] [--filter=FILTER]
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Security Command Center notification config.

    Notification configs that are created with Security Command Center API V2
    and later include a location attribute. If a location is not specified, the
    default global location is used. For example, the following Notification
    config name has location=global attribute:
    organizations/123/locations/global/notificationConfigs/my-config.

EXAMPLES
    Create a notification config test-config under organization 123 for
    findings for pubsub-topic projects/test-project/topics/notification-test
    with a filter on resource name:

        $ gcloud scc notifications create test-config --organization=123 \
            --pubsub-topic=projects/test-project/topics/notification-test \
            --filter="resource_name: \"a\""

    Create a notification config test-config under folder 456 for findings for
    pubsub-topic projects/test-project/topics/notification-test with a filter
    on resource name:

        $ gcloud scc notifications create test-config --folder=456 \
            --pubsub-topic=projects/test-project/topics/notification-test \
            --filter="resource_name: \"a\""

    Create a notification config test-config under project 789 for findings for
    pubsub-topic projects/test-project/topics/notification-test with a filter
    on resource name:

        $ gcloud scc notifications create test-config --project=789 \
            --pubsub-topic=projects/test-project/topics/notification-test \
            --filter="resource_name: \"a\""

    Create a notification config test-config under organization 123 for
    findings for pubsub-topic projects/test-project/topics/notification-test
    with a filter on resource name and location=eu

        $ gcloud scc notifications create test-config --project=789 \
            --pubsub-topic=projects/test-project/topics/notification-test \
            --filter="resource_name: \"a\"" --location=eu

POSITIONAL ARGUMENTS
     NOTIFICATION_CONFIG_ID
        The ID of the notification config. Formatted as
        "organizations/123/notificationConfigs/456" or just "456".

REQUIRED FLAGS
     --pubsub-topic=PUBSUB_TOPIC
        The Pub/Sub topic which will receive notifications. Its format is
        "projects/[project_id]/topics/[topic]".

OPTIONAL FLAGS
     --[no-]deletion-notifications-enabled
        Indicates whether the notifications will be sent for deleted findings.
        Use --deletion-notifications-enabled to enable and
        --no-deletion-notifications-enabled to disable.

     --description=DESCRIPTION
        The text that will be used to describe a notification configuration.

     --filter=FILTER
        Filter to be used for notification config.

     --location=LOCATION; default="global"
        If data residency is enabled, specify the Security Command Center
        location in which to create the notification. The resulting
        notificationConfig resource is stored only in this location. Only
        findings that are issued in this location are sent to Pub/Sub.

        If data residency is not enabled, specifying the --location flag
        creates the notification by using Security Command Center API v2, and
        the only valid value for the flag is global.

     At most one of these can be specified:

       --folder=FOLDER
          Folder where the notification config resides. Formatted as
          folders/456 or just 456.

       --organization=ORGANIZATION
          Organization where the notification config resides. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (ID or number) where the notification config resides.
          Formatted as projects/789 or just 789.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the Security Command Center API. For more information,
    see Security Command Center API.
    (https://cloud.google.com/security-command-center/docs/reference/rest)

NOTES
    These variants are also available:

        $ gcloud alpha scc notifications create

        $ gcloud beta scc notifications create
```

### gcloud scc notifications delete

```text
NAME
    gcloud scc notifications delete - delete a Security Command Center
        notification config

SYNOPSIS
    gcloud scc notifications delete NOTIFICATION_CONFIG_ID
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Security Command Center notification config.

    Notification configs that are created with Security Command Center API V2
    and later include a location attribute. If the location attribute is
    included in the resource name of a Notification configs, you must specify
    it when referencing the Notification config. For example, the following
    Notification configs name has location=eu:
    organizations/123/locations/eu/notificationConfigs/test-config.

EXAMPLES
    Delete notification config 'test-config' from organization 123

        $ gcloud scc notifications delete test-config --organization=123

    Delete notification config 'test-config' from folder 456

        $ gcloud scc notifications delete test-config --folder=456

    Delete notification config 'test-config' from project 789

        $ gcloud scc notifications delete test-config --project=789

    Delete notification config 'test-config' with location global from
    organization 123

        $ gcloud scc notifications delete test-config --organization=123 \
            --location=global

    Delete notification config 'test-config' with location=eu from organization
    123

        $ gcloud scc notifications delete test-config --organization=123 \
            --location=eu

POSITIONAL ARGUMENTS
     NOTIFICATION_CONFIG_ID
        The ID of the notification config. Formatted as
        "organizations/123/notificationConfigs/456" or just "456".

FLAGS
     --location=LOCATION; default="global"
        Required if either data residency is enabled or the notificationConfig
        was created by using the API v2.

        If data residency is enabled, specify the Security Command Center
        location in which the notification is stored.

        If data residency is not enabled, include /locations/``LOCATION'' in
        the full name or specify the --location flag only if the
        notificationConfig was created by using the Security Command Center API
        v2, in which case, the only valid location is global.

     At most one of these can be specified:

       --folder=FOLDER
          Folder where the notification config resides. Formatted as
          folders/456 or just 456.

       --organization=ORGANIZATION
          Organization where the notification config resides. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (ID or number) where the notification config resides.
          Formatted as projects/789 or just 789.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the Security Command Center API. For more information,
    see Security Command Center API.
    (https://cloud.google.com/security-command-center/docs/reference/rest)

NOTES
    These variants are also available:

        $ gcloud alpha scc notifications delete

        $ gcloud beta scc notifications delete
```

### gcloud scc notifications describe

```text
NAME
    gcloud scc notifications describe - describe a Security Command Center
        notification config

SYNOPSIS
    gcloud scc notifications describe NOTIFICATION_CONFIG_ID
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Security Command Center notification config.

    Notification configs that are created with Security Command Center API V2
    and later include a location attribute. If the location attribute is
    included in the resource name of a Notification configs, you must specify
    it when referencing the Notification config. For example, the following
    Notification configs name has location=eu:
    organizations/123/locations/eu/notificationConfigs/test-config.

EXAMPLES
    Describe notification config 'test-config' from organization 123

        $ gcloud scc notifications describe test-config --organization=123

    Describe notification config 'test-config' from folder 456

        $ gcloud scc notifications describe test-config --folder=456

    Describe notification config 'test-config' from project 789

        $ gcloud scc notifications describe test-config --project=789

    Describe notification config 'test-config' from organization 123 and
    location=global

        $ gcloud scc notifications describe test-config --organization=123 \
          --location=global

POSITIONAL ARGUMENTS
     NOTIFICATION_CONFIG_ID
        The ID of the notification config. Formatted as
        "organizations/123/notificationConfigs/456" or just "456".

FLAGS
     --location=LOCATION; default="global"
        Required if either data residency is enabled or the notificationConfig
        resources were created by using the API v2.

        If data residency is enabled, specify the Security Command Center
        location in which the notifications are stored.

        If data residency is not enabled, include /locations/``LOCATION'' only
        if the notificationConfig resource was created by using the Security
        Command Center API v2, in which case, the only valid location is
        global.

     At most one of these can be specified:

       --folder=FOLDER
          Folder where the notification config resides. Formatted as
          folders/456 or just 456.

       --organization=ORGANIZATION
          Organization where the notification config resides. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (ID or number) where the notification config resides.
          Formatted as projects/789 or just 789.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the Security Command Center API. For more information,
    see Security Command Center API.
    (https://cloud.google.com/security-command-center/docs/reference/rest)

NOTES
    These variants are also available:

        $ gcloud alpha scc notifications describe

        $ gcloud beta scc notifications describe
```

### gcloud scc notifications list

```text
NAME
    gcloud scc notifications list - list Security Command Center notification
        configs

SYNOPSIS
    gcloud scc notifications list [PARENT]
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Security Command Center notification configs.

        Notification Configs that are created with Security Command Center API V2
        and later include a `location` attribute. Include the `--location` flag to
        list Notification Configs with `location` attribute other than `global`.

EXAMPLES
    List notification configs from organization 123

        $ gcloud scc notifications list 123
        $ gcloud scc notifications list organizations/123

    List notification configs from folder 456

        $ gcloud scc notifications list folders/456

    List notification configs from project 789

        $ gcloud scc notifications list projects/789

    List notification configs from organization 123 and location=eu

        $ gcloud scc notifications list 123 --location=eu
        $ gcloud scc notifications list organizations/123 \
            --location=locations/eu

POSITIONAL ARGUMENTS
     Parent resource - parent organization, folder, or project in the Google
     Cloud resource hierarchy to be used for the gcloud scc command. Specify
     the argument as either [RESOURCE_TYPE/RESOURCE_ID] or [RESOURCE_ID], as
     shown in the preceding examples. This represents a Cloud resource.

     [PARENT]
        ID of the parent or fully qualified identifier for the parent.

        To set the parent attribute:
        * provide the argument parent on the command line;
        * Set the parent property in configuration using gcloud config set
          scc/parent if it is not specified in command line.

FLAGS
     --location=LOCATION; default="global"
        Required if either data residency is enabled or the notificationConfig
        resources were created by using the API v2.

        If data residency is enabled, specify the Security Command Center
        location in which the notifications are stored.

        If data residency is not enabled, including /locations/``LOCATION'' in
        the name or the --location flag in the command lists only the
        notificationConfig resources that were created by using the Security
        Command Center API v2 and the only valid location is global.

     At most one of these can be specified:

       --folder=FOLDER
          Folder where the notification config resides. Formatted as
          folders/456 or just 456.

       --organization=ORGANIZATION
          Organization where the notification config resides. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (ID or number) where the notification config resides.
          Formatted as projects/789 or just 789.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the Security Command Center API. For more information,
    see Security Command Center API.
    (https://cloud.google.com/security-command-center/docs/reference/rest)

NOTES
    These variants are also available:

        $ gcloud alpha scc notifications list

        $ gcloud beta scc notifications list
```

### gcloud scc notifications update

```text
NAME
    gcloud scc notifications update - update a Security Command Center
        notification config

SYNOPSIS
    gcloud scc notifications update NOTIFICATION_CONFIG_ID
        [--[no-]deletion-notifications-enabled] [--description=DESCRIPTION]
        [--filter=FILTER] [--location=LOCATION; default="global"]
        [--pubsub-topic=PUBSUB_TOPIC]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Security Command Center notification config.

    Notification configs that are created with Security Command Center API V2
    and later include a location attribute. If the location attribute is
    included in the resource name of a Notification configs, you must specify
    it when referencing the Notification config. For example, the following
    Notification configs name has location=eu:
    organizations/123/locations/eu/notificationConfigs/test-config.

EXAMPLES
    Update all mutable fields under an organization parent test-config
    (description + pubsub topic + filter):

        $ gcloud scc notifications update scc notifications update \
            test-config --organization=123 --description="New description" \
            --pubsub-topic="projects/22222/topics/newtopic"

    Update all mutable fields under a folder parent test-config (description +
    pubsub topic + filter):

        $ gcloud scc notifications update scc notifications update \
            test-config --folder=456 --description="New description" \
            --pubsub-topic="projects/22222/topics/newtopic"

    Update all mutable fields under a project parent test-config (description +
    pubsub topic + filter):

        $ gcloud scc notifications update scc notifications update \
            test-config --project=789 --description="New description" \
            --pubsub-topic="projects/22222/topics/newtopic"

    Update test-config's description

        $ gcloud scc notifications update test-config --organization=123 \
            --description="New description"

    Update test-config's pubsub-topic

        $ gcloud scc notifications update test-config --organization=123 \
            --pubsub-topic="projects/22222/topics/newtopic"

    Update test-config's filter

        $ gcloud scc notifications update test-config --organization=123 \
            --filter='state = \"ACTIVE\"'

    Update all mutable fields for test-config with location=global under an
    organization parent (description + pubsub topic + filter):

        $ gcloud scc notifications update scc notifications update \
            test-config --organization=123 --description="New description" \
            --pubsub-topic="projects/22222/topics/newtopic" \
            --location=global

POSITIONAL ARGUMENTS
     NOTIFICATION_CONFIG_ID
        The ID of the notification config. Formatted as
        "organizations/123/notificationConfigs/456" or just "456".

FLAGS
     --[no-]deletion-notifications-enabled
        Indicates whether the notifications will be sent for deleted findings.
        Use --deletion-notifications-enabled to enable and
        --no-deletion-notifications-enabled to disable.

     --description=DESCRIPTION
        The text that will be used to describe a notification configuration.

     --filter=FILTER
        The filter string which will applied to events of findings of a
        notification configuration.

     --location=LOCATION; default="global"
        Required if either data residency is enabled or the notificationConfig
        was created by using the API v2.

        If data residency is enabled, specify the Security Command Center
        location in which the notification is stored.

        If data residency is not enabled, include /locations/``LOCATION'' in
        the full name or specify the --location flag only if the
        notificationConfig resource was created by using the Security Command
        Center API v2, in which case, the only valid location is global.

     --pubsub-topic=PUBSUB_TOPIC
        The Pub/Sub topic which will receive notifications. Its format is
        "projects/[project_id]/topics/[topic]".

     At most one of these can be specified:

       --folder=FOLDER
          Folder where the notification config resides. Formatted as
          folders/456 or just 456.

       --organization=ORGANIZATION
          Organization where the notification config resides. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (ID or number) where the notification config resides.
          Formatted as projects/789 or just 789.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the Security Command Center API. For more information,
    see Security Command Center API.
    (https://cloud.google.com/security-command-center/docs/reference/rest)

NOTES
    These variants are also available:

        $ gcloud alpha scc notifications update

        $ gcloud beta scc notifications update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud scc notifications update test-config \
    --organization=123 \
    --description="New description" \
    --pubsub-topic="projects/22222/topics/newtopic"

gcloud scc notifications update test-config \
    --folder=456 \
    --description="New description" \
    --pubsub-topic="projects/22222/topics/newtopic"

gcloud scc notifications update test-config \
    --project=789 \
    --description="New description" \
    --pubsub-topic="projects/22222/topics/newtopic"

gcloud scc notifications update test-config \
    --organization=123 \
    --description="New description" \
    --pubsub-topic="projects/22222/topics/newtopic" \
    --location=global
```

### gcloud beta scc notifications create

```text
NAME
    gcloud beta scc notifications create - create a Security Command Center
        notification config

SYNOPSIS
    gcloud beta scc notifications create NOTIFICATION_CONFIG_ID
        --pubsub-topic=PUBSUB_TOPIC [--[no-]deletion-notifications-enabled]
        [--description=DESCRIPTION] [--filter=FILTER]
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scc notifications delete

```text
NAME
    gcloud beta scc notifications delete - delete a Security Command Center
        notification config

SYNOPSIS
    gcloud beta scc notifications delete NOTIFICATION_CONFIG_ID
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scc notifications describe

```text
NAME
    gcloud beta scc notifications describe - describe a Security Command Center
        notification config

SYNOPSIS
    gcloud beta scc notifications describe NOTIFICATION_CONFIG_ID
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scc notifications list

```text
NAME
    gcloud beta scc notifications list - list Security Command Center
        notification configs

SYNOPSIS
    gcloud beta scc notifications list [PARENT]
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scc notifications update

```text
NAME
    gcloud beta scc notifications update - update a Security Command Center
        notification config

SYNOPSIS
    gcloud beta scc notifications update NOTIFICATION_CONFIG_ID
        [--[no-]deletion-notifications-enabled] [--description=DESCRIPTION]
        [--filter=FILTER] [--location=LOCATION; default="global"]
        [--pubsub-topic=PUBSUB_TOPIC]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc notifications create

```text
NAME
    gcloud alpha scc notifications create - create a Security Command Center
        notification config

SYNOPSIS
    gcloud alpha scc notifications create NOTIFICATION_CONFIG_ID
        --pubsub-topic=PUBSUB_TOPIC [--[no-]deletion-notifications-enabled]
        [--description=DESCRIPTION] [--filter=FILTER]
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc notifications delete

```text
NAME
    gcloud alpha scc notifications delete - delete a Security Command Center
        notification config

SYNOPSIS
    gcloud alpha scc notifications delete NOTIFICATION_CONFIG_ID
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc notifications describe

```text
NAME
    gcloud alpha scc notifications describe - describe a Security Command
        Center notification config

SYNOPSIS
    gcloud alpha scc notifications describe NOTIFICATION_CONFIG_ID
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc notifications list

```text
NAME
    gcloud alpha scc notifications list - list Security Command Center
        notification configs

SYNOPSIS
    gcloud alpha scc notifications list [PARENT]
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc notifications update

```text
NAME
    gcloud alpha scc notifications update - update a Security Command Center
        notification config

SYNOPSIS
    gcloud alpha scc notifications update NOTIFICATION_CONFIG_ID
        [--[no-]deletion-notifications-enabled] [--description=DESCRIPTION]
        [--filter=FILTER] [--location=LOCATION; default="global"]
        [--pubsub-topic=PUBSUB_TOPIC]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `update` examples repeat the command (`gcloud scc notifications update scc notifications update test-config ...`); gcloud 593.0.0 fails with "unrecognized arguments: notifications update test-config", so the runnable form gives the command once.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/notifications (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
