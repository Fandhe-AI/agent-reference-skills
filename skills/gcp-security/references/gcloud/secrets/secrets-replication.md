---
source: https://docs.cloud.google.com/sdk/gcloud/reference/secrets/replication
---

# gcloud secrets replication

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud secrets replication get

```text
NAME
    gcloud secrets replication get - describe a secret's replication

SYNOPSIS
    gcloud secrets replication get SECRET [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a secret's replication

EXAMPLES
    To describe the replication of a secret named 'my-secret', run:

        $ gcloud secrets replication get my-secret

POSITIONAL ARGUMENTS
     Secret resource - The secret to describe. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta secrets replication get
```

### gcloud secrets replication set

```text
NAME
    gcloud secrets replication set - set a secret's replication

SYNOPSIS
    gcloud secrets replication set SECRET
        --replication-policy-file=REPLICATION-POLICY-FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the replication policy for the given secret as defined in a JSON or
    YAML file. The locations that a Secret is replicated to cannot be changed.

EXAMPLES
    To set the replication of a secret named 'my-secret' to the contents of
    my-file.json, run:

        $ gcloud secrets replication set my-secret \
            --replication-policy-file=my-file.json

POSITIONAL ARGUMENTS
     Secret resource - The secret to update. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

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

REQUIRED FLAGS
     --replication-policy-file=REPLICATION-POLICY-FILE
        JSON or YAML file to use to read the replication policy. The file must
        conform to
        https://cloud.google.com/secret-manager/docs/reference/rest/v1/projects.secrets#replication.Set
        this to "-" to read from stdin.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta secrets replication set
```

### gcloud secrets replication update

```text
NAME
    gcloud secrets replication update - update a secret replica's metadata

SYNOPSIS
    gcloud secrets replication update SECRET
        [--remove-cmek | --location=REPLICA-LOCATION --set-kms-key=SET-KMS-KEY]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a secret replica's metadata (e.g. cmek policy). This command will
    return an error if given a secret that does not exist or if given a
    location that the given secret doesn't exist in.

    The --remove-kms-key flag is only valid for Secrets that have an automatic
    replication policy or exist in a single location. To remove keys from a
    Secret with multiple user managed replicas, please use the set-replication
    command.

EXAMPLES
    To remove CMEK from a secret called 'my-secret', run:

        $ gcloud secrets replication update my-secret --remove-cmek

    To set the CMEK key on an automatic secret called my-secret to a specified
    KMS key, run:

        $ gcloud secrets replication update my-secret \
            --set-kms-key=projects/my-project/locations/global/keyRings/\
        my-keyring/cryptoKeys/my-key

    To set the CMEK key on a secret called my-secret to a specified KMS key in
    a specified location in its replication, run:

        $ gcloud secrets replication update my-secret \
            --set-kms-key=projects/my-project/locations/us-central1/\
        keyRings/my-keyring/cryptoKeys/my-key --location=us-central1

POSITIONAL ARGUMENTS
     Secret resource - The secret to update. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

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

FLAGS
     Replication update.

     At most one of these can be specified:

       --remove-cmek
          Remove customer managed encryption key so that future versions will
          be encrypted by a Google managed encryption key.

       Or at least one of these can be specified:

         CMEK Update.

         --location=REPLICA-LOCATION
            Location of replica to update. For secrets with automatic
            replication policies, this can be omitted.

         --set-kms-key=SET-KMS-KEY
            New KMS key with which to encrypt and decrypt future secret
            versions.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta secrets replication update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud secrets replication update my-secret \
    --set-kms-key=projects/my-project/locations/global/keyRings/my-keyring/cryptoKeys/my-key

gcloud secrets replication update my-secret \
    --set-kms-key=projects/my-project/locations/us-central1/keyRings/my-keyring/cryptoKeys/my-key \
    --location=us-central1
```

### gcloud beta secrets replication get

```text
NAME
    gcloud beta secrets replication get - describe a secret's replication

SYNOPSIS
    gcloud beta secrets replication get SECRET [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta secrets replication set

```text
NAME
    gcloud beta secrets replication set - set a secret's replication

SYNOPSIS
    gcloud beta secrets replication set SECRET
        --replication-policy-file=REPLICATION-POLICY-FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta secrets replication update

```text
NAME
    gcloud beta secrets replication update - update a secret replica's metadata

SYNOPSIS
    gcloud beta secrets replication update SECRET
        [--remove-cmek | --location=REPLICA-LOCATION --set-kms-key=SET-KMS-KEY]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (the help text above is verbatim): the `update` description says "The --remove-kms-key flag is only valid for Secrets that have an automatic replication policy ...", but `update` has no `--remove-kms-key` flag (gcloud 593.0.0: "unrecognized arguments: --remove-kms-key (did you mean '--set-kms-key'?)"); the SYNOPSIS flag that removes the key is `--remove-cmek` ("Remove customer managed encryption key so that future versions will be encrypted by a Google managed encryption key.").
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/secrets/replication (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
