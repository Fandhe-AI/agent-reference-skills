---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/topics/delete
---

# gcloud pubsub topics delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub topics delete

```text
NAME
    gcloud pubsub topics delete - deletes one or more Cloud Pub/Sub topics

SYNOPSIS
    gcloud pubsub topics delete TOPIC [TOPIC ...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes one or more Cloud Pub/Sub topics.

EXAMPLES
    To delete a Cloud Pub/Sub topic, run:

        $ gcloud pubsub topics delete mytopic

POSITIONAL ARGUMENTS
     Topic resource - One or more topics to delete. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument topic on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TOPIC [TOPIC ...]
          IDs of the topics or fully qualified identifiers for the topics.

          To set the topic attribute:
          + provide the argument topic on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub topics delete

        $ gcloud beta pubsub topics delete
```

### gcloud beta pubsub topics delete

```text
NAME
    gcloud beta pubsub topics delete - deletes one or more Cloud Pub/Sub topics

SYNOPSIS
    gcloud beta pubsub topics delete TOPIC [TOPIC ...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub topics delete

```text
NAME
    gcloud alpha pubsub topics delete - deletes one or more Cloud Pub/Sub
        topics

SYNOPSIS
    gcloud alpha pubsub topics delete TOPIC [TOPIC ...] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/topics/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
