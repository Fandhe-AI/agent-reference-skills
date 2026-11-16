---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/export
---

# gcloud sql instances export

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql instances export

```text
NAME
    gcloud sql instances export - exports data from a Cloud SQL instance

SYNOPSIS
    gcloud sql instances export INSTANCE URI [--async]
        [--database=DATABASE,[DATABASE,...], -d DATABASE,[DATABASE,...]]
        [--table=TABLE,[TABLE,...], -t TABLE,[TABLE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Exports data from a Cloud SQL instance.

    This command is deprecated and will be removed in version 205.0.0. Use
    gcloud sql export sql instead.

    Exports data from a Cloud SQL instance to a Google Cloud Storage bucket as
    a MySQL dump file.

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

     URI
        The path to the file in Google Cloud Storage where the export will be
        stored. The URI is in the form gs://bucketName/fileName. If the file
        already exists, the operation fails. If the filename ends with .gz, the
        contents are compressed.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --database=DATABASE,[DATABASE,...], -d DATABASE,[DATABASE,...]
        Database(s) from which the export is made. Information on requirements
        can be found here:
        https://cloud.google.com/sql/docs/mysql/admin-api/v1beta4/instances/export#exportContext.databases

     --table=TABLE,[TABLE,...], -t TABLE,[TABLE,...]
        Tables to export from the specified database. If you specify tables,
        specify one and only one database. For Postgres instances, only one
        table can be exported at a time.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql instances export

        $ gcloud beta sql instances export
```

### gcloud beta sql instances export

```text
NAME
    gcloud beta sql instances export - exports data from a Cloud SQL instance

SYNOPSIS
    gcloud beta sql instances export INSTANCE URI [--async]
        [--database=DATABASE,[DATABASE,...], -d DATABASE,[DATABASE,...]]
        [--table=TABLE,[TABLE,...], -t TABLE,[TABLE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql instances export

```text
NAME
    gcloud alpha sql instances export - exports data from a Cloud SQL instance

SYNOPSIS
    gcloud alpha sql instances export INSTANCE URI [--async]
        [--database=DATABASE,[DATABASE,...], -d DATABASE,[DATABASE,...]]
        [--table=TABLE,[TABLE,...], -t TABLE,[TABLE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated: the 593.0.0 help marks this command as deprecated (quoted from DESCRIPTION) — `gcloud sql instances export`: Exports data from a Cloud SQL instance.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/export (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
