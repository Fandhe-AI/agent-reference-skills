---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/topics/publish
---

# gcloud pubsub topics publish

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub topics publish

```text
NAME
    gcloud pubsub topics publish - publishes a message to the specified topic

SYNOPSIS
    gcloud pubsub topics publish TOPIC [--attribute=[ATTRIBUTE,...]]
        [--message=MESSAGE] [--ordering-key=ORDERING_KEY]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Publishes a message to the specified topic name for testing and
    troubleshooting. Use with caution: all associated subscribers must be able
    to consume and acknowledge any message you publish, otherwise the system
    will continuously re-attempt delivery of the bad message for 7 days.

EXAMPLES
    To publish messages in a batch to a specific Cloud Pub/Sub topic, run:

        $ gcloud pubsub topics publish mytopic --message="Hello World!" \
            --attribute=KEY1=VAL1,KEY2=VAL2

POSITIONAL ARGUMENTS
     Topic resource - Name of the topic to publish messages to. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument topic on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TOPIC
          ID of the topic or fully qualified identifier for the topic.

          To set the topic attribute:
          + provide the argument topic on the command line.

FLAGS
     --attribute=[ATTRIBUTE,...]
        Comma-separated list of attributes. Each ATTRIBUTE has the form
        name="value". You can specify up to 100 attributes.

     --message=MESSAGE
        The body of the message to publish to the given topic name. Information
        on message formatting and size limits can be found at:
        https://cloud.google.com/pubsub/docs/publisher#publish

     --ordering-key=ORDERING_KEY
        The key for ordering delivery to subscribers. All messages with the
        same ordering key are sent to subscribers in the order that Pub/Sub
        receives them.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub topics publish

        $ gcloud beta pubsub topics publish
```

### gcloud beta pubsub topics publish

```text
NAME
    gcloud beta pubsub topics publish - publishes a message to the specified
        topic

SYNOPSIS
    gcloud beta pubsub topics publish TOPIC [MESSAGE_BODY]
        [--attribute=[ATTRIBUTE,...]] [--message=MESSAGE]
        [--ordering-key=ORDERING_KEY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub topics publish

```text
NAME
    gcloud alpha pubsub topics publish - publishes a message to the specified
        topic

SYNOPSIS
    gcloud alpha pubsub topics publish TOPIC [MESSAGE_BODY]
        [--attribute=[ATTRIBUTE,...]] [--message=MESSAGE]
        [--ordering-key=ORDERING_KEY] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/topics/publish (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
