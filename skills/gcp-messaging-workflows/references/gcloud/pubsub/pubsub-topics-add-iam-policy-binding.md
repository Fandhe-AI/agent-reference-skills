---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/topics/add-iam-policy-binding
---

# gcloud pubsub topics add-iam-policy-binding

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub topics add-iam-policy-binding

```text
NAME
    gcloud pubsub topics add-iam-policy-binding - add IAM policy binding to a
        topic

SYNOPSIS
    gcloud pubsub topics add-iam-policy-binding TOPIC --member=PRINCIPAL
        --role=ROLE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to a Cloud Pub/Sub Topic.

EXAMPLES
    To add an IAM policy binding with the role of 'roles/editor' for the user
    'test-user@example.com' on the topic 'my-topic', run:

        $ gcloud pubsub topics add-iam-policy-binding my-topic \
            --member='user:test-user@example.com' --role='roles/editor'

    To add an IAM policy binding with the role of 'roles/editor' for the
    service account 'my-iam-account@my-project.iam.gserviceaccount.com' on the
    topic 'my-topic', run:

        $ gcloud pubsub topics add-iam-policy-binding my-topic \
            --member='serviceAccount:my-iam-account@my-project.iam.gservicea\
        ccount.com' --role='roles/editor'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Topic resource - The topic to add the IAM policy binding. This represents
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

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to add the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        Role name to assign to the principal. The role name is the complete
        path of a predefined role, such as roles/logging.viewer, or the role ID
        for a custom role, such as
        organizations/{ORGANIZATION_ID}/roles/logging.viewer.

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

        $ gcloud alpha pubsub topics add-iam-policy-binding

        $ gcloud beta pubsub topics add-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud pubsub topics add-iam-policy-binding my-topic \
    --member='serviceAccount:my-iam-account@my-project.iam.gserviceaccount.com' \
    --role='roles/editor'
```

### gcloud beta pubsub topics add-iam-policy-binding

```text
NAME
    gcloud beta pubsub topics add-iam-policy-binding - add IAM policy binding
        to a topic

SYNOPSIS
    gcloud beta pubsub topics add-iam-policy-binding TOPIC --member=PRINCIPAL
        --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub topics add-iam-policy-binding

```text
NAME
    gcloud alpha pubsub topics add-iam-policy-binding - add IAM policy binding
        to a topic

SYNOPSIS
    gcloud alpha pubsub topics add-iam-policy-binding TOPIC --member=PRINCIPAL
        --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/topics/add-iam-policy-binding (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
