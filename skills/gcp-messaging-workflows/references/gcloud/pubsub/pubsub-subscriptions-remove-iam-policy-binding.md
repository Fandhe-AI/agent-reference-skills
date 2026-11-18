---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/subscriptions/remove-iam-policy-binding
---

# gcloud pubsub subscriptions remove-iam-policy-binding

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub subscriptions remove-iam-policy-binding

```text
NAME
    gcloud pubsub subscriptions remove-iam-policy-binding - remove IAM policy
        binding of a subscription

SYNOPSIS
    gcloud pubsub subscriptions remove-iam-policy-binding SUBSCRIPTION
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding of a Cloud Pub/Sub Subscription.

EXAMPLES
    To Remove an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' with subscription 'my-subscription', run:

        $ gcloud pubsub subscriptions remove-iam-policy-binding \
            my-subscription --member='user:test-user@gmail.com' \
            --role='roles/editor'

    The following command will remove an IAM policy binding for the role of
    'roles/editor' from all authenticated users on subscription
    'my-subscription':

        $ gcloud pubsub subscriptions remove-iam-policy-binding \
            my-subscription --member='allAuthenticatedUsers' \
            --role='roles/editor'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Subscription resource - The subscription to remove the IAM policy binding
     from. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

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
     --member=PRINCIPAL
        The principal to remove the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Deleted principals have an additional deleted: prefix and a ?uid=UID
        suffix, where UID is a unique identifier for the principal. Example:
        deleted:user:test-user@gmail.com?uid=123456789012345678901.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        The role to remove the principal from.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the pubsub/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/pubsub/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub subscriptions remove-iam-policy-binding

        $ gcloud beta pubsub subscriptions remove-iam-policy-binding
```

### gcloud beta pubsub subscriptions remove-iam-policy-binding

```text
NAME
    gcloud beta pubsub subscriptions remove-iam-policy-binding - remove IAM
        policy binding of a subscription

SYNOPSIS
    gcloud beta pubsub subscriptions remove-iam-policy-binding SUBSCRIPTION
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub subscriptions remove-iam-policy-binding

```text
NAME
    gcloud alpha pubsub subscriptions remove-iam-policy-binding - remove IAM
        policy binding of a subscription

SYNOPSIS
    gcloud alpha pubsub subscriptions remove-iam-policy-binding SUBSCRIPTION
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/subscriptions/remove-iam-policy-binding (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
