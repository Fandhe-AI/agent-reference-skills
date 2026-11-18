---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/subscriptions/seek
---

# gcloud pubsub subscriptions seek

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub subscriptions seek

```text
NAME
    gcloud pubsub subscriptions seek - resets a subscription's backlog to a
        point in time or to a given snapshot

SYNOPSIS
    gcloud pubsub subscriptions seek SUBSCRIPTION
        (--snapshot=SNAPSHOT | --time=TIME)
        [--snapshot-project=SNAPSHOT_PROJECT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Resets a subscription's backlog to a point in time or to a given snapshot.

POSITIONAL ARGUMENTS
     Subscription resource - Name of the subscription to affect. This
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
     Exactly one of these must be specified:

       --snapshot=SNAPSHOT
          The name of the snapshot. The snapshot's topic must be the same as
          that of the subscription.

       --time=TIME
          The time to seek to. Messages in the subscription that were published
          before this time are marked as acknowledged, and messages retained in
          the subscription that were published after this time are marked as
          unacknowledged. See $ gcloud topic datetimes for information on time
          formats.

OPTIONAL FLAGS
     --snapshot-project=SNAPSHOT_PROJECT
        The name of the project the snapshot belongs to (if seeking to a
        snapshot). If not set, it defaults to the currently selected cloud
        project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub subscriptions seek

        $ gcloud beta pubsub subscriptions seek
```

### gcloud beta pubsub subscriptions seek

```text
NAME
    gcloud beta pubsub subscriptions seek - resets a subscription's backlog to
        a point in time or to a given snapshot

SYNOPSIS
    gcloud beta pubsub subscriptions seek SUBSCRIPTION
        (--snapshot=SNAPSHOT | --time=TIME)
        [--snapshot-project=SNAPSHOT_PROJECT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub subscriptions seek

```text
NAME
    gcloud alpha pubsub subscriptions seek - resets a subscription's backlog to
        a point in time or to a given snapshot

SYNOPSIS
    gcloud alpha pubsub subscriptions seek SUBSCRIPTION
        (--snapshot=SNAPSHOT | --time=TIME)
        [--snapshot-project=SNAPSHOT_PROJECT] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/subscriptions/seek (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
