---
source: https://docs.cloud.google.com/sdk/gcloud/reference/support/support-event-subscriptions
---

# gcloud support support-event-subscriptions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud support support-event-subscriptions create

```text
NAME
    gcloud support support-event-subscriptions create - create a support event
        subscription

SYNOPSIS
    gcloud support support-event-subscriptions create
        --organization=ORGANIZATION --pub-sub-topic=PUB_SUB_TOPIC
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud support support-event-subscriptions create creates a support event
    subscription for an organization.

EXAMPLES
    To create a support event subscription for organization 123456789:

        $ gcloud support support-event-subscriptions create \
            --organization=123456789 \
            --pub-sub-topic=projects/my-project/topics/my-topic

REQUIRED FLAGS
     --organization=ORGANIZATION
        Organization ID for the support event subscription.

     --pub-sub-topic=PUB_SUB_TOPIC
        The name of the Pub/Sub topic to publish notifications to. Format:
        projects/{project}/topics/{topic}

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta support support-event-subscriptions create
```

### gcloud support support-event-subscriptions delete

```text
NAME
    gcloud support support-event-subscriptions delete - delete
        supportEventSubscriptions

SYNOPSIS
    gcloud support support-event-subscriptions delete
        (SUPPORT_EVENT_SUBSCRIPTION : --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a supportEventSubscription

EXAMPLES
    To delete the supportEventSubscription, run:

        $ gcloud support support-event-subscriptions delete

POSITIONAL ARGUMENTS
     SupportEventSubscription resource - The name of the support event
     subscription to delete. Format:
     organizations/{organization_id}/supportEventSubscriptions/{subscription_id}
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       SUPPORT_EVENT_SUBSCRIPTION
          ID of the supportEventSubscription or fully qualified identifier for
          the supportEventSubscription.

          To set the support_event_subscription attribute:
          + provide the argument support_event_subscription on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --organization=ORGANIZATION
          The organization id of the supportEventSubscription resource.

          To set the organization attribute:
          + provide the argument support_event_subscription on the command
            line with a fully specified name;
          + provide the argument --organization on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudsupport/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/support/docs/apis

NOTES
    This variant is also available:

        $ gcloud beta support support-event-subscriptions delete
```

### gcloud support support-event-subscriptions describe

```text
NAME
    gcloud support support-event-subscriptions describe - describe
        supportEventSubscriptions

SYNOPSIS
    gcloud support support-event-subscriptions describe
        (SUPPORT_EVENT_SUBSCRIPTION : --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a supportEventSubscription

EXAMPLES
    To describe the supportEventSubscription, run:

        $ gcloud support support-event-subscriptions describe

POSITIONAL ARGUMENTS
     SupportEventSubscription resource - The name of the support event
     subscription to retrieve. Format:
     organizations/{organization_id}/supportEventSubscriptions/{subscription_id}
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       SUPPORT_EVENT_SUBSCRIPTION
          ID of the supportEventSubscription or fully qualified identifier for
          the supportEventSubscription.

          To set the support_event_subscription attribute:
          + provide the argument support_event_subscription on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --organization=ORGANIZATION
          The organization id of the supportEventSubscription resource.

          To set the organization attribute:
          + provide the argument support_event_subscription on the command
            line with a fully specified name;
          + provide the argument --organization on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudsupport/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/support/docs/apis

NOTES
    This variant is also available:

        $ gcloud beta support support-event-subscriptions describe
```

### gcloud support support-event-subscriptions expunge

```text
NAME
    gcloud support support-event-subscriptions expunge - expunge
        supportEventSubscriptions

SYNOPSIS
    gcloud support support-event-subscriptions expunge
        (SUPPORT_EVENT_SUBSCRIPTION : --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    expunge supportEventSubscriptions

EXAMPLES
    To expunge all supportEventSubscriptions, run:

        $ gcloud support support-event-subscriptions expunge

POSITIONAL ARGUMENTS
     SupportEventSubscription resource - The name of the support event
     subscription to expunge. Format:
     organizations/{organization_id}/supportEventSubscriptions/{subscription_id}
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       SUPPORT_EVENT_SUBSCRIPTION
          ID of the supportEventSubscription or fully qualified identifier for
          the supportEventSubscription.

          To set the support_event_subscription attribute:
          + provide the argument support_event_subscription on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --organization=ORGANIZATION
          The organization id of the supportEventSubscription resource.

          To set the organization attribute:
          + provide the argument support_event_subscription on the command
            line with a fully specified name;
          + provide the argument --organization on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudsupport/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/support/docs/apis

NOTES
    This variant is also available:

        $ gcloud beta support support-event-subscriptions expunge
```

### gcloud support support-event-subscriptions list

```text
NAME
    gcloud support support-event-subscriptions list - list
        supportEventSubscriptions

SYNOPSIS
    gcloud support support-event-subscriptions list --organization=ORGANIZATION
        [--show-deleted] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List supportEventSubscriptions

EXAMPLES
    To list all supportEventSubscriptions, run:

        $ gcloud support support-event-subscriptions list

REQUIRED FLAGS
     Organization resource - The fully qualified name of the Cloud resource to
     list support event subscriptions under. Format:
     organizations/{organization_id} This represents a Cloud resource.

     This must be specified.

       --organization=ORGANIZATION
          ID of the organization or fully qualified identifier for the
          organization.

          To set the organization attribute:
          + provide the argument --organization on the command line.

FLAGS
     --show-deleted
        Whether to show deleted subscriptions. By default, deleted
        subscriptions are not returned.

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
    This command uses the cloudsupport/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/support/docs/apis

NOTES
    This variant is also available:

        $ gcloud beta support support-event-subscriptions list
```

### gcloud support support-event-subscriptions undelete

```text
NAME
    gcloud support support-event-subscriptions undelete - undelete
        supportEventSubscriptions

SYNOPSIS
    gcloud support support-event-subscriptions undelete
        (SUPPORT_EVENT_SUBSCRIPTION : --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    undelete supportEventSubscriptions

EXAMPLES
    To undelete all supportEventSubscriptions, run:

        $ gcloud support support-event-subscriptions undelete

POSITIONAL ARGUMENTS
     SupportEventSubscription resource - The name of the support event
     subscription to undelete. Format:
     organizations/{organization_id}/supportEventSubscriptions/{subscription_id}
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       SUPPORT_EVENT_SUBSCRIPTION
          ID of the supportEventSubscription or fully qualified identifier for
          the supportEventSubscription.

          To set the support_event_subscription attribute:
          + provide the argument support_event_subscription on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --organization=ORGANIZATION
          The organization id of the supportEventSubscription resource.

          To set the organization attribute:
          + provide the argument support_event_subscription on the command
            line with a fully specified name;
          + provide the argument --organization on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudsupport/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/support/docs/apis

NOTES
    This variant is also available:

        $ gcloud beta support support-event-subscriptions undelete
```

### gcloud support support-event-subscriptions update

```text
NAME
    gcloud support support-event-subscriptions update - update
        supportEventSubscriptions

SYNOPSIS
    gcloud support support-event-subscriptions update
        (SUPPORT_EVENT_SUBSCRIPTION : --organization=ORGANIZATION)
        [--pub-sub-topic=PUB_SUB_TOPIC] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a supportEventSubscription

EXAMPLES
    To update the supportEventSubscription, run:

        $ gcloud support support-event-subscriptions update

POSITIONAL ARGUMENTS
     SupportEventSubscription resource - Identifier. The resource name of the
     support event subscription. The arguments in this group can be used to
     specify the attributes of this resource.

     This must be specified.

       SUPPORT_EVENT_SUBSCRIPTION
          ID of the supportEventSubscription or fully qualified identifier for
          the supportEventSubscription.

          To set the support_event_subscription attribute:
          + provide the argument support_event_subscription on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --organization=ORGANIZATION
          The organization id of the supportEventSubscription resource.

          To set the organization attribute:
          + provide the argument support_event_subscription on the command
            line with a fully specified name;
          + provide the argument --organization on the command line.

FLAGS
     --pub-sub-topic=PUB_SUB_TOPIC
        The name of the Pub/Sub topic to publish notifications to. Format:
        projects/{project}/topics/{topic}

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudsupport/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/support/docs/apis

NOTES
    This variant is also available:

        $ gcloud beta support support-event-subscriptions update
```

### gcloud beta support support-event-subscriptions create

```text
NAME
    gcloud beta support support-event-subscriptions create - create a support
        event subscription

SYNOPSIS
    gcloud beta support support-event-subscriptions create
        --organization=ORGANIZATION --pub-sub-topic=PUB_SUB_TOPIC
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta support support-event-subscriptions delete

```text
NAME
    gcloud beta support support-event-subscriptions delete - delete
        supportEventSubscriptions

SYNOPSIS
    gcloud beta support support-event-subscriptions delete
        (SUPPORT_EVENT_SUBSCRIPTION : --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta support support-event-subscriptions describe

```text
NAME
    gcloud beta support support-event-subscriptions describe - describe
        supportEventSubscriptions

SYNOPSIS
    gcloud beta support support-event-subscriptions describe
        (SUPPORT_EVENT_SUBSCRIPTION : --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta support support-event-subscriptions expunge

```text
NAME
    gcloud beta support support-event-subscriptions expunge - expunge
        supportEventSubscriptions

SYNOPSIS
    gcloud beta support support-event-subscriptions expunge
        (SUPPORT_EVENT_SUBSCRIPTION : --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta support support-event-subscriptions list

```text
NAME
    gcloud beta support support-event-subscriptions list - list
        supportEventSubscriptions

SYNOPSIS
    gcloud beta support support-event-subscriptions list
        --organization=ORGANIZATION [--show-deleted] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta support support-event-subscriptions undelete

```text
NAME
    gcloud beta support support-event-subscriptions undelete - undelete
        supportEventSubscriptions

SYNOPSIS
    gcloud beta support support-event-subscriptions undelete
        (SUPPORT_EVENT_SUBSCRIPTION : --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta support support-event-subscriptions update

```text
NAME
    gcloud beta support support-event-subscriptions update - update
        supportEventSubscriptions

SYNOPSIS
    gcloud beta support support-event-subscriptions update
        (SUPPORT_EVENT_SUBSCRIPTION : --organization=ORGANIZATION)
        [--pub-sub-topic=PUB_SUB_TOPIC] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/support/support-event-subscriptions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
