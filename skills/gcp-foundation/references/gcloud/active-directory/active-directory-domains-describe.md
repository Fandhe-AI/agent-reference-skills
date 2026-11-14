---
source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/domains/describe
---

# gcloud active-directory domains describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud active-directory domains describe

```text
NAME
    gcloud active-directory domains describe - describe a Managed Microsoft AD
        domain

SYNOPSIS
    gcloud active-directory domains describe DOMAIN [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show metadata for a Managed Microsoft AD domain.

    Displays all metadata associated with a Active Directory domain given a
    valid AD domain fully-qualified domain name.

    This command can fail for the following reasons:
      o The domain specified does not exist.
      o The active account does not have permission to access the given
        domain.

EXAMPLES
    The following command prints metadata for an AD domain with the name
    my-domain.com.

        $ gcloud active-directory domains describe my-domain.com

POSITIONAL ARGUMENTS
     Domain resource - Name of the Managed Microsoft AD domain you want to
     describe. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

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

        $ gcloud alpha active-directory domains describe

        $ gcloud beta active-directory domains describe
```

### gcloud beta active-directory domains describe

```text
NAME
    gcloud beta active-directory domains describe - describe a Managed
        Microsoft AD domain

SYNOPSIS
    gcloud beta active-directory domains describe DOMAIN [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains describe

```text
NAME
    gcloud alpha active-directory domains describe - describe a Managed
        Microsoft AD domain

SYNOPSIS
    gcloud alpha active-directory domains describe DOMAIN
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/domains/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
