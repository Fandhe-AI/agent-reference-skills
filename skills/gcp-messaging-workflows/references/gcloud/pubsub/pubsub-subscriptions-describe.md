---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/subscriptions/describe
---

# gcloud pubsub subscriptions describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub subscriptions describe

```text
NAME
    gcloud pubsub subscriptions describe - describes a Cloud Pub/Sub
        subscription

SYNOPSIS
    gcloud pubsub subscriptions describe SUBSCRIPTION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes a Cloud Pub/Sub subscription.

POSITIONAL ARGUMENTS
     Subscription resource - Name of the subscription to describe. This
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub subscriptions describe

        $ gcloud beta pubsub subscriptions describe
```

### gcloud beta pubsub subscriptions describe

```text
NAME
    gcloud beta pubsub subscriptions describe - describes a Cloud Pub/Sub
        subscription

SYNOPSIS
    gcloud beta pubsub subscriptions describe SUBSCRIPTION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub subscriptions describe

```text
NAME
    gcloud alpha pubsub subscriptions describe - describes a Cloud Pub/Sub
        subscription

SYNOPSIS
    gcloud alpha pubsub subscriptions describe SUBSCRIPTION
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/subscriptions/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
