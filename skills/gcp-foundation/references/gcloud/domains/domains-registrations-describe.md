---
source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/registrations/describe
---

# gcloud domains registrations describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud domains registrations describe

```text
NAME
    gcloud domains registrations describe - describe an existing Cloud Domains
        registration

SYNOPSIS
    gcloud domains registrations describe REGISTRATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Print information about an existing registration.

EXAMPLES
    To describe a registration for example.com, run:

        $ gcloud domains registrations describe example.com

POSITIONAL ARGUMENTS
     Registration resource - The domain registration to describe. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha domains registrations describe

        $ gcloud beta domains registrations describe
```

### gcloud beta domains registrations describe

```text
NAME
    gcloud beta domains registrations describe - describe an existing Cloud
        Domains registration

SYNOPSIS
    gcloud beta domains registrations describe REGISTRATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha domains registrations describe

```text
NAME
    gcloud alpha domains registrations describe - describe an existing Cloud
        Domains registration

SYNOPSIS
    gcloud alpha domains registrations describe REGISTRATION
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/registrations/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
