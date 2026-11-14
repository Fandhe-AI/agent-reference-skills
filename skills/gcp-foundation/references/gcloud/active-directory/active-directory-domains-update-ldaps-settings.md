---
source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/domains/update-ldaps-settings
---

# gcloud active-directory domains update-ldaps-settings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud active-directory domains update-ldaps-settings

```text
NAME
    gcloud active-directory domains update-ldaps-settings - update the LDAPS
        settings for a domain

SYNOPSIS
    gcloud active-directory domains update-ldaps-settings DOMAIN
        (--clear-certificates | [--certificate-pfx-file=PATH_TO_FILE
          : --certificate-password=CERTIFICATE_PASSWORD]) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Managed Microsoft AD domain's Lightweight Directory Access
    Protocol over TLS/SSL (LDAPS) settings. You must be safelisted for the
    Managed AD LDAPS Alpha in order to use this feature. Consult the API
    documentation for a list of certificate requirements.

    This command can fail for the following reasons:
      o The certificate is invalid.
      o The domain specified does not exist.
      o The active account does not have permission to view LDAPS settings
        for the domain.

EXAMPLES
    To enable LDAPS for the first time or update the certificates being used:

        $ gcloud active-directory domains update-ldaps-settings \
            my-domain.com \
            --certificate-pfx-file=certificate-chain-with-private-key.pfx \
            --certificate-password="password"

    To disable LDAPS:

        $ gcloud active-directory domains update-ldaps-settings \
            my-domain.com --clear-certificates

POSITIONAL ARGUMENTS
     Domain resource - Name of the managed Managed Microsoft AD domain you want
     to update. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument domain on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DOMAIN
          ID of the domain or fully qualified identifier for the domain.

          To set the domain attribute:
          + provide the argument domain on the command line.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --clear-certificates
          Disable LDAPS by deleting all existing certificates. Certificates
          will need to be re-uploaded if LDAPS is to be re-enabled.

       Or at least one of these can be specified:

         --certificate-pfx-file=PATH_TO_FILE
            PKCS#12-formatted pfx file that specifies the certificate chain
            used to configure LDAPS. If certificate-password is not specified,
            command will prompt user for secret. Use a full or relative path to
            a local file containing the value of certificate_pfx_file.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --certificate-password=CERTIFICATE_PASSWORD
            Password used to encrypt the PKCS#12 certificate. If not specified,
            command will prompt user for secret.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the managedidentities/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/managed-microsoft-ad/

NOTES
    These variants are also available:

        $ gcloud alpha active-directory domains update-ldaps-settings

        $ gcloud beta active-directory domains update-ldaps-settings
```

### gcloud beta active-directory domains update-ldaps-settings

```text
NAME
    gcloud beta active-directory domains update-ldaps-settings - update the
        LDAPS settings for a domain

SYNOPSIS
    gcloud beta active-directory domains update-ldaps-settings DOMAIN
        (--clear-certificates | [--certificate-pfx-file=PATH_TO_FILE
          : --certificate-password=CERTIFICATE_PASSWORD]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains update-ldaps-settings

```text
NAME
    gcloud alpha active-directory domains update-ldaps-settings - update the
        LDAPS settings for a domain

SYNOPSIS
    gcloud alpha active-directory domains update-ldaps-settings DOMAIN
        (--clear-certificates | [--certificate-pfx-file=PATH_TO_FILE
          : --certificate-password=CERTIFICATE_PASSWORD]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/domains/update-ldaps-settings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
