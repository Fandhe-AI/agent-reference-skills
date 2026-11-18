---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/message-transforms
---

# gcloud pubsub message-transforms

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub message-transforms test

```text
NAME
    gcloud pubsub message-transforms test - tests message transforms against a
        given message

SYNOPSIS
    gcloud pubsub message-transforms test
        (--attribute=[ATTRIBUTE,...] --message=MESSAGE)
        (--message-transforms-file=MESSAGE_TRANSFORMS_FILE
          | --subscription=SUBSCRIPTION
          | [--topic=TOPIC : --topic-project=TOPIC_PROJECT])
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Tests message transforms against a given message.

REQUIRED FLAGS
     Message to test the message transforms against.

     At least one of these must be specified:

       --attribute=[ATTRIBUTE,...]
          Comma-separated list of attributes to attach to the message. Each
          ATTRIBUTE has the form name="value". You can specify up to 100
          attributes.

       --message=MESSAGE
          Message body to test the message transforms against.

     Exactly one of these must be specified:

       --message-transforms-file=MESSAGE_TRANSFORMS_FILE
          Path to YAML or JSON file containing message transforms.

       Or at least one of these can be specified:

         Subscription resource - Name of the subscription from which the
         message transforms are taken to be applied to the message. This
         represents a Cloud resource. (NOTE) Some attributes are not given
         arguments in this group but can be set in other ways.

         To set the project attribute:
          - provide the argument --subscription on the command line with a
            fully specified name;
          - provide the argument --project on the command line;
          - set the property core/project.

         --subscription=SUBSCRIPTION
            ID of the subscription or fully qualified identifier for the
            subscription.

            To set the subscription attribute:
            - provide the argument --subscription on the command line.

       Or at least one of these can be specified:

         Topic resource - Name of the topic from which the message transforms
         are taken to be applied to the message. The arguments in this group
         can be used to specify the attributes of this resource.

         --topic=TOPIC
            ID of the topic or fully qualified identifier for the topic.

            To set the topic attribute:
            - provide the argument --topic on the command line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --topic-project=TOPIC_PROJECT
            Project ID of the Google Cloud project for the topic.

            To set the project attribute:
            - provide the argument --topic on the command line with a fully
              specified name;
            - provide the argument --topic-project on the command line;
            - provide the argument --project on the command line;
            - set the property core/project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub message-transforms test

        $ gcloud beta pubsub message-transforms test
```

### gcloud pubsub message-transforms validate

```text
NAME
    gcloud pubsub message-transforms validate - validates a message transform

SYNOPSIS
    gcloud pubsub message-transforms validate
        --message-transform-file=MESSAGE_TRANSFORM_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Validates a message transform.

REQUIRED FLAGS
     --message-transform-file=MESSAGE_TRANSFORM_FILE
        Path to YAML or JSON file containing a message transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub message-transforms validate

        $ gcloud beta pubsub message-transforms validate
```

### gcloud beta pubsub message-transforms test

```text
NAME
    gcloud beta pubsub message-transforms test - tests message transforms
        against a given message

SYNOPSIS
    gcloud beta pubsub message-transforms test
        (--attribute=[ATTRIBUTE,...] --message=MESSAGE)
        (--message-transforms-file=MESSAGE_TRANSFORMS_FILE
          | --subscription=SUBSCRIPTION
          | [--topic=TOPIC : --topic-project=TOPIC_PROJECT])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub message-transforms validate

```text
NAME
    gcloud beta pubsub message-transforms validate - validates a message
        transform

SYNOPSIS
    gcloud beta pubsub message-transforms validate
        --message-transform-file=MESSAGE_TRANSFORM_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub message-transforms test

```text
NAME
    gcloud alpha pubsub message-transforms test - tests message transforms
        against a given message

SYNOPSIS
    gcloud alpha pubsub message-transforms test
        (--attribute=[ATTRIBUTE,...] --message=MESSAGE)
        (--message-transforms-file=MESSAGE_TRANSFORMS_FILE
          | --subscription=SUBSCRIPTION
          | [--topic=TOPIC : --topic-project=TOPIC_PROJECT])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub message-transforms validate

```text
NAME
    gcloud alpha pubsub message-transforms validate - validates a message
        transform

SYNOPSIS
    gcloud alpha pubsub message-transforms validate
        --message-transform-file=MESSAGE_TRANSFORM_FILE [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/message-transforms (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
