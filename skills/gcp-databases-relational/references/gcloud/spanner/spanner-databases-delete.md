---
source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/databases/delete
---

# gcloud spanner databases delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud spanner databases delete

```text
NAME
    gcloud spanner databases delete - delete a Cloud Spanner database

SYNOPSIS
    gcloud spanner databases delete (DATABASE : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Cloud Spanner database.

    Note: Cloud Spanner might continue to accept requests for a few seconds
    after the database has been deleted.

EXAMPLES
    To delete a Cloud Spanner database, run:

        $ gcloud spanner databases delete my-database-id \
            --instance=my-instance-id

POSITIONAL ARGUMENTS
     Database resource - The Cloud Spanner database to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument database on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATABASE
          ID of the database or fully qualified identifier for the database.

          To set the database attribute:
          + provide the argument database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The Cloud Spanner instance for the database.

          To set the instance attribute:
          + provide the argument database on the command line with a fully
            specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner databases delete

        $ gcloud beta spanner databases delete
```

### gcloud beta spanner databases delete

```text
NAME
    gcloud beta spanner databases delete - delete a Cloud Spanner database

SYNOPSIS
    gcloud beta spanner databases delete (DATABASE : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner databases delete

```text
NAME
    gcloud alpha spanner databases delete - delete a Cloud Spanner database

SYNOPSIS
    gcloud alpha spanner databases delete (DATABASE : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/databases/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
