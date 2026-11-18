---
source: https://docs.cloud.google.com/sdk/gcloud/reference/secrets/enable-managed-rotation
---

# gcloud secrets enable-managed-rotation

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud secrets enable-managed-rotation

```text
NAME
    gcloud secrets enable-managed-rotation - enable managed rotation for a
        secret

SYNOPSIS
    gcloud secrets enable-managed-rotation SECRET --location=LOCATION
        (--instance-id=INSTANCE_ID --username=USERNAME : --password=PASSWORD)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enable managed rotation for the specified secret. This command is used for
    the initial setup of managed rotation, currently supporting Cloud SQL
    single-user credentials.

EXAMPLES
    To enable managed rotation for a secret my-secret targeting a Cloud SQL
    instance:

        $ gcloud secrets enable-managed-rotation my-secret \
            --location=us-central1 --instance-id=my-instance \
            --username=db-user

    To enable managed rotation and set an initial password:

        $ gcloud secrets enable-managed-rotation my-secret \
            --location=us-central1 --instance-id=my-instance \
            --username=db-user --password="s3cr3tPassword"

POSITIONAL ARGUMENTS
     Secret resource - The secret to enable managed rotation for. This
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

REQUIRED FLAGS
     Location resource - The location of the secret. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

     Cloud SQL single-user credential settings.

     This must be specified.

       --instance-id=INSTANCE_ID
          The Cloud SQL instance ID.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --username=USERNAME
          The database username.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --password=PASSWORD
          The initial password to set for the database user. If not provided, a
          random password will be generated.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/secrets/enable-managed-rotation (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
