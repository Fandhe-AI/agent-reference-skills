---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/topics/set-iam-policy
---

# gcloud pubsub topics set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub topics set-iam-policy

```text
NAME
    gcloud pubsub topics set-iam-policy - set IAM policy for a topic

SYNOPSIS
    gcloud pubsub topics set-iam-policy TOPIC POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set the IAM policy for a Cloud Pub/Sub Topic.

EXAMPLES
    The following command will read an IAM policy from 'policy.json' and set it
    for a topic with 'my-topic' as the identifier:

        $ gcloud pubsub topics set-iam-policy my-topic policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Topic resource - Name of the topic to set an IAM policy on. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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

     POLICY_FILE
        JSON or YAML file with the IAM policy

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub topics set-iam-policy

        $ gcloud beta pubsub topics set-iam-policy
```

### gcloud beta pubsub topics set-iam-policy

```text
NAME
    gcloud beta pubsub topics set-iam-policy - set IAM policy for a topic

SYNOPSIS
    gcloud beta pubsub topics set-iam-policy TOPIC POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub topics set-iam-policy

```text
NAME
    gcloud alpha pubsub topics set-iam-policy - set the IAM policy for a Cloud
        Pub/Sub Topic

SYNOPSIS
    gcloud alpha pubsub topics set-iam-policy TOPIC POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/topics/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
