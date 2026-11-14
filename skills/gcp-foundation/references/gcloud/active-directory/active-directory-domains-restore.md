---
source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/domains/restore
---

# gcloud active-directory domains restore

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud active-directory domains restore

```text
NAME
    gcloud active-directory domains restore - restore a domain from the
        specified backup

SYNOPSIS
    gcloud active-directory domains restore DOMAIN --backup=BACKUP [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Restore a Managed Microsoft AD domain to a previous point in time when the
    backup was taken.

    This command can fail for the following reasons:
      o The specified domain doesn't exist.
      o The specified backup doesn't exist.
      o The active account doesn't have permission to restore the specified
        domain.

EXAMPLES
    To restore the domain my-domain.com from backup my-backup, run:

        $ gcloud active-directory domains restore my-domain.com \
            --backup=my-backup --async

POSITIONAL ARGUMENTS
     Domain resource - Name of the Managed Microsoft AD domain you want to
     restore. This represents a Cloud resource. (NOTE) Some attributes are not
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

REQUIRED FLAGS
     --backup=BACKUP
        Name of the domain backup from which you want to restore the Managed
        Microsoft AD domain.

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

        $ gcloud alpha active-directory domains restore

        $ gcloud beta active-directory domains restore
```

### gcloud beta active-directory domains restore

```text
NAME
    gcloud beta active-directory domains restore - restore a domain from the
        specified backup

SYNOPSIS
    gcloud beta active-directory domains restore DOMAIN --backup=BACKUP
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains restore

```text
NAME
    gcloud alpha active-directory domains restore - restore a domain from the
        specified backup

SYNOPSIS
    gcloud alpha active-directory domains restore DOMAIN --backup=BACKUP
        [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/domains/restore (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
