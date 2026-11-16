---
source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/rows
---

# gcloud spanner rows

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud spanner rows delete

```text
NAME
    gcloud spanner rows delete - delete a row in a Cloud Spanner database

SYNOPSIS
    gcloud spanner rows delete --keys=[KEY,...] --table=TABLE
        (--database=DATABASE : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To delete a row with primary keys of SingerId=1,SingName=abc in table
    Singers under my-database and my-instance, run:

        $ gcloud spanner rows delete --table=Singers \
          --database=my-database --instance=my-instance --keys=1,abc

REQUIRED FLAGS
     --keys=[KEY,...]
        The primary key values of the row to delete.

     --table=TABLE
        The Cloud Spanner table name.

     Database resource - The Cloud Spanner database in which to delete a row.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --database on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --database=DATABASE
          ID of the database or fully qualified identifier for the database.

          To set the database attribute:
          + provide the argument --database on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --instance=INSTANCE
          The Cloud Spanner instance for the database.

          To set the instance attribute:
          + provide the argument --database on the command line with a fully
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

        $ gcloud alpha spanner rows delete

        $ gcloud beta spanner rows delete
```

### gcloud spanner rows insert

```text
NAME
    gcloud spanner rows insert - insert a row in a Cloud Spanner database

SYNOPSIS
    gcloud spanner rows insert --data=[COLUMN_NAME=VALUE,...] --table=TABLE
        (--database=DATABASE : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To insert a row with SingerId=1,SingName=abc in table Singers under
    my-database and my-instance, run:

        $ gcloud spanner rows insert --table=Singers \
            --database=my-database --instance=my-instance \
            --data=SingerId=1,SingerName=abc

        $ gcloud spanner rows insert --table=Singers \
            --database=my-database --instance=my-instance \
            --flags-file=path/to/file.yaml

REQUIRED FLAGS
     --data=[COLUMN_NAME=VALUE,...]
        The column names and values for the row being added. For complicated
        input values, such as arrays, use the --flags-file flag. See $ gcloud
        topic flags-file for more information.

     --table=TABLE
        The Cloud Spanner table name.

     Database resource - The Cloud Spanner database in which to insert a row.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --database on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --database=DATABASE
          ID of the database or fully qualified identifier for the database.

          To set the database attribute:
          + provide the argument --database on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --instance=INSTANCE
          The Cloud Spanner instance for the database.

          To set the instance attribute:
          + provide the argument --database on the command line with a fully
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

        $ gcloud alpha spanner rows insert

        $ gcloud beta spanner rows insert
```

### gcloud spanner rows update

```text
NAME
    gcloud spanner rows update - update a row in a Cloud Spanner database

SYNOPSIS
    gcloud spanner rows update --data=[COLUMN_NAME=VALUE,...] --table=TABLE
        (--database=DATABASE : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To update a row with SingerId=1,SingName=abc in table Singers under
    my-database and my-instance, run:

        $ gcloud spanner rows update --table=Singers \
            --database=my-database --instance=my-instance \
            --data=SingerId=1,SingerName=abc

        $ gcloud spanner rows update --table=Singers \
            --database=my-database --instance=my-instance \
            --flags-file=path/to/file.yaml

REQUIRED FLAGS
     --data=[COLUMN_NAME=VALUE,...]
        The column names and values for the row being updated. For complicated
        input values, such as arrays, use the --flags-file flag. See $ gcloud
        topic flags-file for more information.

     --table=TABLE
        The Cloud Spanner table name.

     Database resource - The Cloud Spanner database in which to update a row.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --database on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --database=DATABASE
          ID of the database or fully qualified identifier for the database.

          To set the database attribute:
          + provide the argument --database on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --instance=INSTANCE
          The Cloud Spanner instance for the database.

          To set the instance attribute:
          + provide the argument --database on the command line with a fully
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

        $ gcloud alpha spanner rows update

        $ gcloud beta spanner rows update
```

### gcloud beta spanner rows delete

```text
NAME
    gcloud beta spanner rows delete - delete a row in a Cloud Spanner database

SYNOPSIS
    gcloud beta spanner rows delete --keys=[KEY,...] --table=TABLE
        (--database=DATABASE : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner rows insert

```text
NAME
    gcloud beta spanner rows insert - insert a row in a Cloud Spanner database

SYNOPSIS
    gcloud beta spanner rows insert --data=[COLUMN_NAME=VALUE,...]
        --table=TABLE (--database=DATABASE : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner rows update

```text
NAME
    gcloud beta spanner rows update - update a row in a Cloud Spanner database

SYNOPSIS
    gcloud beta spanner rows update --data=[COLUMN_NAME=VALUE,...]
        --table=TABLE (--database=DATABASE : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner rows delete

```text
NAME
    gcloud alpha spanner rows delete - delete a row in a Cloud Spanner database

SYNOPSIS
    gcloud alpha spanner rows delete --keys=[KEY,...] --table=TABLE
        (--database=DATABASE : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner rows insert

```text
NAME
    gcloud alpha spanner rows insert - insert a row in a Cloud Spanner database

SYNOPSIS
    gcloud alpha spanner rows insert --data=[COLUMN_NAME=VALUE,...]
        --table=TABLE (--database=DATABASE : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner rows update

```text
NAME
    gcloud alpha spanner rows update - update a row in a Cloud Spanner database

SYNOPSIS
    gcloud alpha spanner rows update --data=[COLUMN_NAME=VALUE,...]
        --table=TABLE (--database=DATABASE : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/rows (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
