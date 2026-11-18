---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/subscriptions/modify-message-ack-deadline
---

# gcloud pubsub subscriptions modify-message-ack-deadline

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub subscriptions modify-message-ack-deadline

```text
NAME
    gcloud pubsub subscriptions modify-message-ack-deadline - modifies the ACK
        deadline for a specific Cloud Pub/Sub message

SYNOPSIS
    gcloud pubsub subscriptions modify-message-ack-deadline SUBSCRIPTION
        --ack-deadline=ACK_DEADLINE --ack-ids=[ACK_ID,...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This method is useful to indicate that more time is needed to process a
    message by the subscriber, or to make the message available for redelivery
    if the processing was interrupted.

POSITIONAL ARGUMENTS
     Subscription resource - Name of the subscription messages belong to. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument subscription on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SUBSCRIPTION
          ID of the subscription or fully qualified identifier for the
          subscription.

          To set the subscription attribute:
          + provide the argument subscription on the command line.

REQUIRED FLAGS
     --ack-deadline=ACK_DEADLINE
        The number of seconds the system will wait for a subscriber to
        acknowledge receiving a message before re-attempting delivery.

     --ack-ids=[ACK_ID,...]
        One or more ACK_IDs to modify the deadline for. An ACK_ID is a string
        that is returned to subscribers
        (https://cloud.google.com/pubsub/docs/reference/rpc/google.pubsub.v1#google.pubsub.v1.ReceivedMessage).
        along with the message. The ACK_ID is different from the message ID
        (https://cloud.google.com/pubsub/docs/reference/rpc/google.pubsub.v1#google.pubsub.v1.PubsubMessage).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub subscriptions modify-message-ack-deadline

        $ gcloud beta pubsub subscriptions modify-message-ack-deadline
```

### gcloud beta pubsub subscriptions modify-message-ack-deadline

```text
NAME
    gcloud beta pubsub subscriptions modify-message-ack-deadline - modifies the
        ACK deadline for a specific Cloud Pub/Sub message

SYNOPSIS
    gcloud beta pubsub subscriptions modify-message-ack-deadline SUBSCRIPTION
        ([ACK_ID ...] --ack-ids=[ACK_ID,...]) --ack-deadline=ACK_DEADLINE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub subscriptions modify-message-ack-deadline

```text
NAME
    gcloud alpha pubsub subscriptions modify-message-ack-deadline - modifies
        the ACK deadline for a specific Cloud Pub/Sub message

SYNOPSIS
    gcloud alpha pubsub subscriptions modify-message-ack-deadline SUBSCRIPTION
        ([ACK_ID ...] --ack-ids=[ACK_ID,...]) --ack-deadline=ACK_DEADLINE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/subscriptions/modify-message-ack-deadline (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
