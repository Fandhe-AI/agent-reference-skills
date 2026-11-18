---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/subscriptions/modify-push-config
---

# gcloud pubsub subscriptions modify-push-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub subscriptions modify-push-config

```text
NAME
    gcloud pubsub subscriptions modify-push-config - modifies the push
        configuration of a Cloud Pub/Sub subscription

SYNOPSIS
    gcloud pubsub subscriptions modify-push-config SUBSCRIPTION
        --push-endpoint=PUSH_ENDPOINT
        [--push-auth-service-account=SERVICE_ACCOUNT_EMAIL]
        [--push-auth-token-audience=OPTIONAL_AUDIENCE_OVERRIDE]
        [--push-no-wrapper : --push-no-wrapper-write-metadata]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Modifies the push configuration of a Cloud Pub/Sub subscription.

POSITIONAL ARGUMENTS
     Subscription resource - Name of the subscription to modify. This
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
     --push-endpoint=PUSH_ENDPOINT
        A URL to use as the endpoint for this subscription. This will also
        automatically set the subscription type to PUSH.

OPTIONAL FLAGS
     --push-auth-service-account=SERVICE_ACCOUNT_EMAIL
        Service account email used as the identity for the generated Open ID
        Connect token for authenticated push.

     --push-auth-token-audience=OPTIONAL_AUDIENCE_OVERRIDE
        Audience used in the generated Open ID Connect token for authenticated
        push. If not specified, it will be set to the push-endpoint.

     NoWrapper Config Options.

     --push-no-wrapper
        When set, the message data is delivered directly as the HTTP body. Use
        --no-push-no-wrapper to disable this flag.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --push-no-wrapper-write-metadata
        When true, writes the Pub/Sub message metadata to
        x-goog-pubsub-<KEY>:<VAL> headers of the HTTP request. Writes the
        Pub/Sub message attributes to <KEY>:<VAL> headers of the HTTP request.
        Use --no-push-no-wrapper-write-metadata to disable this flag.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub subscriptions modify-push-config

        $ gcloud beta pubsub subscriptions modify-push-config
```

### gcloud beta pubsub subscriptions modify-push-config

```text
NAME
    gcloud beta pubsub subscriptions modify-push-config - modifies the push
        configuration of a Cloud Pub/Sub subscription

SYNOPSIS
    gcloud beta pubsub subscriptions modify-push-config SUBSCRIPTION
        --push-endpoint=PUSH_ENDPOINT
        [--push-auth-service-account=SERVICE_ACCOUNT_EMAIL]
        [--push-auth-token-audience=OPTIONAL_AUDIENCE_OVERRIDE]
        [--push-no-wrapper : --push-no-wrapper-write-metadata]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub subscriptions modify-push-config

```text
NAME
    gcloud alpha pubsub subscriptions modify-push-config - modifies the push
        configuration of a Cloud Pub/Sub subscription

SYNOPSIS
    gcloud alpha pubsub subscriptions modify-push-config SUBSCRIPTION
        --push-endpoint=PUSH_ENDPOINT
        [--push-auth-service-account=SERVICE_ACCOUNT_EMAIL]
        [--push-auth-token-audience=OPTIONAL_AUDIENCE_OVERRIDE]
        [--push-no-wrapper : --push-no-wrapper-write-metadata]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/subscriptions/modify-push-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
