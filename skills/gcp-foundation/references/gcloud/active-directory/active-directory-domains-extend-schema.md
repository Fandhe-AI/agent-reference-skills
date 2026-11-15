---
source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/domains/extend-schema
---

# gcloud active-directory domains extend-schema

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud active-directory domains extend-schema

```text
NAME
    gcloud active-directory domains extend-schema - initiate schema extension
        for a Managed Microsoft AD domain

SYNOPSIS
    gcloud active-directory domains extend-schema DOMAIN
        --description=DESCRIPTION --ldif-file=PATH_TO_FILE [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Initiate schema extension for a Managed Microsoft AD domain.

    This command can fail for the following reasons:
      o The specified domain doesn't exist.
      o The specified domain is either being created or updated.
      o The specified domain is under maintenance.
      o The active account doesn't have permission to initiate schema
        extension on the specified domain.

EXAMPLES
    The following command initiates a schema extension for the domain
    my-domain.com in project my-project, with description Test Description,
    using the LDIF file demo.ldif

        $ gcloud active-directory domains extend-schema my-domain.com \
            --description="Test Description" --ldif-file=demo.ldf \
            --project=my-project --async

POSITIONAL ARGUMENTS
     Domain resource - Name of the Managed Microsoft AD domain for which you
     want to extend schema. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

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
     --description=DESCRIPTION
        Description of schema change.

     --ldif-file=PATH_TO_FILE
        Local LDIF file path that contains commands for schema extension. The
        file size can't be larger than 1 MB. Use a full or relative path to a
        local file containing the value of ldif_file.

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

        $ gcloud alpha active-directory domains extend-schema

        $ gcloud beta active-directory domains extend-schema
```

### gcloud beta active-directory domains extend-schema

```text
NAME
    gcloud beta active-directory domains extend-schema - initiate schema
        extension for a Managed Microsoft AD domain

SYNOPSIS
    gcloud beta active-directory domains extend-schema DOMAIN
        --description=DESCRIPTION --ldif-file=PATH_TO_FILE [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains extend-schema

```text
NAME
    gcloud alpha active-directory domains extend-schema - initiate schema
        extension for a Managed Microsoft AD domain

SYNOPSIS
    gcloud alpha active-directory domains extend-schema DOMAIN
        --description=DESCRIPTION --ldif-file=PATH_TO_FILE [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/domains/extend-schema (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
