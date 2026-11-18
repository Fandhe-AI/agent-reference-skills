---
source: https://docs.cloud.google.com/sdk/gcloud/reference/secrets/delete
---

# gcloud secrets delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud secrets delete

```text
NAME
    gcloud secrets delete - delete a secret

SYNOPSIS
    gcloud secrets delete SECRET [--etag=ETAG] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a secret and destroy all secret versions. This action is
    irreversible. If the given secret does not exist, this command will
    succeed, but the operation will be a no-op.

EXAMPLES
    Delete a secret my-secret:

        $ gcloud secrets delete my-secret

    Delete a secret my-secret using an etag:

        $ gcloud secrets delete my-secret --etag=123

POSITIONAL ARGUMENTS
     Secret resource - The secret to delete. This represents a Cloud resource.
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
     --etag=ETAG
        Current entity tag (ETag) of the secret. If specified, the secret is
        deleted only if the ETag provided matches the current secret's ETag.

     Location resource - The location to delete secret. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

        $ gcloud beta secrets delete
```

### gcloud beta secrets delete

```text
NAME
    gcloud beta secrets delete - delete a secret

SYNOPSIS
    gcloud beta secrets delete SECRET [--etag=ETAG] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/secrets/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
