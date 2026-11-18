---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/set-iam-policy
---

# gcloud kms keys set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms keys set-iam-policy

```text
NAME
    gcloud kms keys set-iam-policy - set the IAM policy for a key

SYNOPSIS
    gcloud kms keys set-iam-policy
        (KEY : --keyring=KEYRING --location=LOCATION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given key as defined in a JSON or YAML file.

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    The following command will read am IAM policy defined in a JSON file
    'policy.json' and set it for the key frodo with the keyring fellowship and
    location global:

        $ gcloud kms keys set-iam-policy frodo policy.json \
            --keyring=fellowship --location=global

POSITIONAL ARGUMENTS
     Key resource - The KMS key resource. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument key on the command line with a fully specified
        name;
      * set the property core/project.

     This must be specified.

       KEY
          ID of the key or fully qualified identifier for the key.

          To set the key attribute:
          + provide the argument key on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --keyring=KEYRING
          The KMS keyring of the key.

          To set the keyring attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --keyring on the command line.

       --location=LOCATION
          The Google Cloud location for the key.

          To set the location attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha kms keys set-iam-policy

        $ gcloud beta kms keys set-iam-policy
```

### gcloud beta kms keys set-iam-policy

```text
NAME
    gcloud beta kms keys set-iam-policy - set the IAM policy for a key

SYNOPSIS
    gcloud beta kms keys set-iam-policy
        (KEY : --keyring=KEYRING --location=LOCATION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys set-iam-policy

```text
NAME
    gcloud alpha kms keys set-iam-policy - set the IAM policy for a key

SYNOPSIS
    gcloud alpha kms keys set-iam-policy
        (KEY : --keyring=KEYRING --location=LOCATION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
