---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/topics/describe
---

# gcloud pubsub topics describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub topics describe

```text
NAME
    gcloud pubsub topics describe - describes a Cloud Pub/Sub topic

SYNOPSIS
    gcloud pubsub topics describe TOPIC [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes a Cloud Pub/Sub topic.

POSITIONAL ARGUMENTS
     Topic resource - Name of the topic to describe. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub topics describe

        $ gcloud beta pubsub topics describe
```

### gcloud beta pubsub topics describe

```text
NAME
    gcloud beta pubsub topics describe - describes a Cloud Pub/Sub topic

SYNOPSIS
    gcloud beta pubsub topics describe TOPIC [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub topics describe

```text
NAME
    gcloud alpha pubsub topics describe - describes a Cloud Pub/Sub topic

SYNOPSIS
    gcloud alpha pubsub topics describe TOPIC [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/topics/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
