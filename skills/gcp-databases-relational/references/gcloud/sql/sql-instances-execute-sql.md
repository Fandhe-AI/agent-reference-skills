---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/execute-sql
---

# gcloud sql instances execute-sql

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql instances execute-sql

```text
NAME
    gcloud sql instances execute-sql - executes a statement on a Cloud SQL
        instance

SYNOPSIS
    gcloud sql instances execute-sql INSTANCE --sql=SQL
        [--database=DATABASE, -d DATABASE]
        [--partial-result-mode=PARTIAL_RESULT_MODE]
        [--password-secret-version=PASSWORD_SECRET_VERSION]
        [--row-limit=ROW_LIMIT] [--user=USER] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Executes a statement on a Cloud SQL instance. Before executing statements,
    follow Cloud SQL Data API's instructions to configure your database user
    and permissions. Note: The requests and responses might transit through
    intermediate locations between your client and the location of the target
    instance.

EXAMPLES
    To execute a statement on a Cloud SQL instance using IAM database
    authentication, run:

        $ gcloud sql instances execute-sql my-instance-name \
            --sql="ALTER TABLE employees RENAME TO personnel;" \
            --database=my-db

    To execute a statement on a Cloud SQL instance using password
    authentication, run:

        $ gcloud sql instances execute-sql my-instance-name \
            --sql="ALTER TABLE employees RENAME TO personnel;" \
            --database=my-db --user=my-user \
            --password-secret-version=projects/my-project/locations/\
        secret-location/secrets/my-secret/versions/latest

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

REQUIRED FLAGS
     --sql=SQL
        SQL statement(s) to execute. It supports multiple statements as well.
        When it starts with the character '@', the rest should be a filepath to
        read the SQL statement(s) from. For example, --sql=@my_script.sql.

OPTIONAL FLAGS
     --database=DATABASE, -d DATABASE
        Database on which the statement is executed.

     --partial-result-mode=PARTIAL_RESULT_MODE
        Controls how the API responds when the SQL execution result is
        incomplete due to size limit or other reasons. The default mode is to
        return an error instead of returning a partial result.
        PARTIAL_RESULT_MODE must be one of:

         ALLOW_PARTIAL_RESULT
            If the complete result is unavailable, returns a partial result,
            marks the field <code>partial_result</code> to <code>true</code>,
            and doesn't throw an error.
         FAIL_PARTIAL_RESULT
            If the complete result is unavailable, returns an error and doesn't
            return the partial result.
         PARTIAL_RESULT_MODE_UNSPECIFIED
            Unspecified mode, effectively the same as
            <code>FAIL_PARTIAL_RESULT</code>.

     --password-secret-version=PASSWORD_SECRET_VERSION
        The resource name of the Secret Manager secret holding the password for
        the database user. The secret should be created using the regional
        endpoint and stored in the same region as the Cloud SQL instance. The
        expected resource name format is
        <code>projects/{project}/locations/{location}/secrets/{secret}/versions/{secret_version}</code>.
        Used together with <code>--user</code>. If not specified, IAM database
        authentication is used.

     --row-limit=ROW_LIMIT
        Maximum number of rows to return. The default is unlimited.

     --user=USER
        The database user to authenticate as. Used together with
        <code>--password-secret-version</code>. If not specified, IAM database
        authentication is used.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql instances execute-sql

        $ gcloud beta sql instances execute-sql
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud sql instances execute-sql my-instance-name \
    --sql="ALTER TABLE employees RENAME TO personnel;" \
    --database=my-db \
    --user=my-user \
    --password-secret-version=projects/my-project/locations/secret-location/secrets/my-secret/versions/latest
```

### gcloud beta sql instances execute-sql

```text
NAME
    gcloud beta sql instances execute-sql - executes a statement on a Cloud SQL
        instance

SYNOPSIS
    gcloud beta sql instances execute-sql INSTANCE --sql=SQL
        [--database=DATABASE, -d DATABASE]
        [--partial-result-mode=PARTIAL_RESULT_MODE]
        [--password-secret-version=PASSWORD_SECRET_VERSION]
        [--row-limit=ROW_LIMIT] [--user=USER] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql instances execute-sql

```text
NAME
    gcloud alpha sql instances execute-sql - executes a statement on a Cloud
        SQL instance

SYNOPSIS
    gcloud alpha sql instances execute-sql INSTANCE --sql=SQL
        [--database=DATABASE, -d DATABASE]
        [--partial-result-mode=PARTIAL_RESULT_MODE]
        [--password-secret-version=PASSWORD_SECRET_VERSION]
        [--row-limit=ROW_LIMIT] [--user=USER] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/execute-sql (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
