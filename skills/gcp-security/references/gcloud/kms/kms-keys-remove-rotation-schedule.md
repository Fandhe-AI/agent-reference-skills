---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/remove-rotation-schedule
---

# gcloud kms keys remove-rotation-schedule

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms keys remove-rotation-schedule

```text
NAME
    gcloud kms keys remove-rotation-schedule - remove the rotation schedule for
        a key

SYNOPSIS
    gcloud kms keys remove-rotation-schedule
        (KEY : --keyring=KEYRING --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes the rotation schedule for the given key.

EXAMPLES
    The following command removes the rotation schedule for the key named frodo
    within the keyring fellowship and location global:

        $ gcloud kms keys remove-rotation-schedule frodo --location=global \
            --keyring=fellowship

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keys remove-rotation-schedule

        $ gcloud beta kms keys remove-rotation-schedule
```

### gcloud beta kms keys remove-rotation-schedule

```text
NAME
    gcloud beta kms keys remove-rotation-schedule - remove the rotation
        schedule for a key

SYNOPSIS
    gcloud beta kms keys remove-rotation-schedule
        (KEY : --keyring=KEYRING --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys remove-rotation-schedule

```text
NAME
    gcloud alpha kms keys remove-rotation-schedule - remove the rotation
        schedule for a key

SYNOPSIS
    gcloud alpha kms keys remove-rotation-schedule
        (KEY : --keyring=KEYRING --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/remove-rotation-schedule (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
