---
source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/databases/execute-sql
---

# gcloud spanner databases execute-sql

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud spanner databases execute-sql

```text
NAME
    gcloud spanner databases execute-sql - executes a SQL query against a Cloud
        Spanner database

SYNOPSIS
    gcloud spanner databases execute-sql (DATABASE : --instance=INSTANCE)
        --sql=SQL [--database-role=DATABASE_ROLE] [--enable-partitioned-dml]
        [--priority=PRIORITY] [--query-mode=QUERY_MODE; default="NORMAL"]
        [--timeout=TIMEOUT; default="10m"]
        [--read-timestamp=TIMESTAMP | --strong] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Executes a SQL query against a Cloud Spanner database.

EXAMPLES
    To execute a SQL SELECT statement against example-database under
    example-instance, run:

        $ gcloud spanner databases execute-sql example-database \
            --instance=example-instance \
            --sql='SELECT * FROM MyTable WHERE MyKey = 1'

POSITIONAL ARGUMENTS
     Database resource - The Cloud Spanner database to execute the SQL query
     against. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

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

REQUIRED FLAGS
     --sql=SQL
        The SQL query to issue to the database. Cloud Spanner SQL is described
        at https://cloud.google.com/spanner/docs/query-syntax

OPTIONAL FLAGS
     --database-role=DATABASE_ROLE
        Database role user assumes while accessing the database.

     --enable-partitioned-dml
        Execute DML statement using Partitioned DML

     --priority=PRIORITY
        The priority for the execute SQL request. PRIORITY must be one of:
        high, low, medium, unspecified.

     --query-mode=QUERY_MODE; default="NORMAL"
        Mode in which the query must be processed. QUERY_MODE must be one of:

         NORMAL
            Returns only the query result, without any information about the
            query plan.
         PLAN
            Returns only the query plan, without any result rows or execution
            statistics information.
         PROFILE
            Returns the query plan, overall execution statistics,
            operator-level execution statistics, along with the result rows.
         WITH_PLAN_AND_STATS
            Returns the query plan, overall (but not operator-level) execution
            statistics, along with the results.
         WITH_STATS
            Returns the overall (but not operator-level) execution statistics
            along with the results.

     --timeout=TIMEOUT; default="10m"
        Maximum time to wait for the SQL query to complete. See $ gcloud topic
        datetimes for information on duration formats.

     Read-only query timestamp bound. The default is --strong. See
     https://cloud.google.com/spanner/docs/timestamp-bounds.

     At most one of these can be specified:

       --read-timestamp=TIMESTAMP
          Perform a query at the given timestamp.

       --strong
          Perform a strong query.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner databases execute-sql

        $ gcloud beta spanner databases execute-sql
```

### gcloud beta spanner databases execute-sql

```text
NAME
    gcloud beta spanner databases execute-sql - executes a SQL query against a
        Cloud Spanner database

SYNOPSIS
    gcloud beta spanner databases execute-sql (DATABASE : --instance=INSTANCE)
        --sql=SQL [--database-role=DATABASE_ROLE] [--enable-partitioned-dml]
        [--priority=PRIORITY] [--query-mode=QUERY_MODE; default="NORMAL"]
        [--timeout=TIMEOUT; default="10m"]
        [--read-timestamp=TIMESTAMP | --strong] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner databases execute-sql

```text
NAME
    gcloud alpha spanner databases execute-sql - executes a SQL query against a
        Cloud Spanner database

SYNOPSIS
    gcloud alpha spanner databases execute-sql (DATABASE : --instance=INSTANCE)
        --sql=SQL [--database-role=DATABASE_ROLE] [--enable-partitioned-dml]
        [--priority=PRIORITY] [--query-mode=QUERY_MODE; default="NORMAL"]
        [--timeout=TIMEOUT; default="10m"]
        [--read-timestamp=TIMESTAMP | --strong] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/databases/execute-sql (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
