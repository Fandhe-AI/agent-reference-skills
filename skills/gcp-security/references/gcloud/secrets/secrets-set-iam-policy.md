---
source: https://docs.cloud.google.com/sdk/gcloud/reference/secrets/set-iam-policy
---

# gcloud secrets set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud secrets set-iam-policy

```text
NAME
    gcloud secrets set-iam-policy - set the IAM policy binding for a secret

SYNOPSIS
    gcloud secrets set-iam-policy SECRET POLICY_FILE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given secret as defined in a JSON or YAML file.

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    'policy.json' and set it for the secret 'my-secret':

        $ gcloud secrets set-iam-policy my-secret policy.json

POSITIONAL ARGUMENTS
     Secret resource - Name of the secret for which to set the IAM policy. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument SECRET on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SECRET
          ID of the secret or fully qualified identifier for the secret.

          To set the secret attribute:
          + provide the argument SECRET on the command line.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

FLAGS
     Location resource - The location to set iam policy. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta secrets set-iam-policy
```

### gcloud beta secrets set-iam-policy

```text
NAME
    gcloud beta secrets set-iam-policy - set the IAM policy for a secret

SYNOPSIS
    gcloud beta secrets set-iam-policy SECRET POLICY_FILE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/secrets/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
