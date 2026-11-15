---
source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/registrations/delete
---

# gcloud domains registrations delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud domains registrations delete

```text
NAME
    gcloud domains registrations delete - delete a Cloud Domains registration

SYNOPSIS
    gcloud domains registrations delete REGISTRATION [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a registration resource.

    Delete can only be called on registrations in state EXPORTED with
    expire_time in the past. It also works for registrations in state
    REGISTRATION_FAILED, TRANSFER_FAILED, and TRANSFER_PENDING.

EXAMPLES
    To delete a registration for example.com, run:

        $ gcloud domains registrations delete example.com

POSITIONAL ARGUMENTS
     Registration resource - The domain registration to delete. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument registration on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument registration on the command line with a fully
        specified name;
      * location is always global.

     This must be specified.

       REGISTRATION
          ID of the registration or fully qualified identifier for the
          registration.

          To set the registration attribute:
          + provide the argument registration on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha domains registrations delete

        $ gcloud beta domains registrations delete
```

### gcloud beta domains registrations delete

```text
NAME
    gcloud beta domains registrations delete - delete a Cloud Domains
        registration

SYNOPSIS
    gcloud beta domains registrations delete REGISTRATION [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha domains registrations delete

```text
NAME
    gcloud alpha domains registrations delete - delete a Cloud Domains
        registration

SYNOPSIS
    gcloud alpha domains registrations delete REGISTRATION [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/registrations/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
