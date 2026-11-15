---
source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/registrations/initiate-push-transfer
---

# gcloud domains registrations initiate-push-transfer

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud domains registrations initiate-push-transfer

```text
NAME
    gcloud domains registrations initiate-push-transfer - initiates the push
        transfer process

SYNOPSIS
    gcloud domains registrations initiate-push-transfer REGISTRATION [--async]
        [--tag=TAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Initiates the Push Transfer process to transfer the domain to another
    registrar. The process might complete instantly or might require
    confirmation or additional work. Check the emails sent to the email address
    of the registrant. The process is aborted after a timeout if it's not
    completed.

    This method is only supported for domains that have the
    REQUIRE_PUSH_TRANSFER property in the list of domain_properties. The domain
    must also be unlocked before it can be transferred to a different
    registrar.

EXAMPLES
    To initiate a push transfer for example.co.uk, run:

        $ gcloud domains registrations initiate-push-transfer \
            example.co.uk --tag=NEW_REGISTRY_TAG

POSITIONAL ARGUMENTS
     Registration resource - The domain registration to transfer. This
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

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --tag=TAG
        The Tag of the new registrar. Can be found at
        https://nominet.uk/registrar-list/

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha domains registrations initiate-push-transfer

        $ gcloud beta domains registrations initiate-push-transfer
```

### gcloud beta domains registrations initiate-push-transfer

```text
NAME
    gcloud beta domains registrations initiate-push-transfer - initiates the
        push transfer process

SYNOPSIS
    gcloud beta domains registrations initiate-push-transfer REGISTRATION
        [--async] [--tag=TAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha domains registrations initiate-push-transfer

```text
NAME
    gcloud alpha domains registrations initiate-push-transfer - initiates the
        push transfer process

SYNOPSIS
    gcloud alpha domains registrations initiate-push-transfer REGISTRATION
        [--async] [--tag=TAG] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/registrations/initiate-push-transfer (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
