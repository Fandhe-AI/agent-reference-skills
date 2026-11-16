---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/import
---

# gcloud sql import

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql import bak

```text
NAME
    gcloud sql import bak - import data into a Cloud SQL instance from a BAK
        file

SYNOPSIS
    gcloud sql import bak INSTANCE [URI] --database=DATABASE, -d DATABASE
        [--async] [--bak-type=BAK_TYPE; default="FULL"] [--keep-encrypted]
        [--no-recovery] [--recovery-only] [--stop-at=STOP_AT]
        [--stop-at-mark=STOP_AT_MARK] [--[no-]striped]
        [--cert-path=CERT_PATH --pvk-path=PVK_PATH (--prompt-for-pvk-password
          | --pvk-password=PVK_PASSWORD)] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud sql import bak imports data into a Cloud SQL instance from a BAK
    backup file in Google Cloud Storage. You should use a full backup file with
    a single backup set.

    For detailed help on importing data into Cloud SQL, refer to this guide:
    https://cloud.google.com/sql/docs/sqlserver/import-export/importing

EXAMPLES
    To import data from the BAK file my-bucket/my-export.bak into the database
    my-database in the Cloud SQL instance my-instance, run:

        $ gcloud sql import bak my-instance gs://my-bucket/my-export.bak \
            --database=my-database

    To import data from the encrypted BAK file my-bucket/my-export.bak into the
    database my-database in the Cloud SQL instance my-instance, with the
    certificate gs://my-bucket/my-cert.crt, private key
    gs://my-bucket/my-key.key and prompting for the private key password, run:

        $ gcloud sql import bak my-instance gs://my-bucket/my-export.bak \
            --database=my-database --cert-path=gs://my-bucket/my-cert.crt \
            --pvk-path=gs://my-bucket/my-key.key --prompt-for-pvk-password

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

     [URI]
        Path to the BAK file file in Google Cloud Storage from which the import
        is made. The URI is in the form gs://bucketName/fileName.

REQUIRED FLAGS
     --database=DATABASE, -d DATABASE
        A new database into which the import is made.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --bak-type=BAK_TYPE; default="FULL"
        Type of bak file that will be imported. Applicable to SQL Server only.
        BAK_TYPE must be one of: FULL, DIFF, TLOG.

     --keep-encrypted
        Whether or not to decrypt the imported encrypted BAK file.

     --no-recovery
        Whether or not the SQL Server import is executed with NORECOVERY
        keyword.

     --recovery-only
        Whether or not the SQL Server import skip download and bring database
        online.

     --stop-at=STOP_AT
        Equivalent to SQL Server STOPAT keyword. Used in transaction log import
        only. Transaction log import stop at this timestamp. Format:
        YYYY-MM-DDTHH:MM:SS.

     --stop-at-mark=STOP_AT_MARK
        Equivalent to SQL Server STOPATMARK keyword. Used in transaction log
        import only. Transaction log import stop at the given mark. To stop at
        given LSN, use --stop-at-mark=lsn:xxx.

     --[no-]striped
        Whether SQL Server import should be striped. Use --striped to enable
        and --no-striped to disable.

     Encryption info to support importing an encrypted .bak file

     --cert-path=CERT_PATH
        Path to the encryption certificate file in Google Cloud Storage
        associated with the BAK file. The URI is in the form
        gs://bucketName/fileName.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --pvk-path=PVK_PATH
        Path to the encryption private key file in Google Cloud Storage
        associated with the BAK file. The URI is in the form
        gs://bucketName/fileName.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     Exactly one of these must be specified:

       --prompt-for-pvk-password
          Prompt for the private key password associated with the BAK file with
          character echo disabled. The password is all typed characters up to
          but not including the RETURN or ENTER key.

       --pvk-password=PVK_PASSWORD
          The private key password associated with the BAK file.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql import bak

        $ gcloud beta sql import bak
```

### gcloud sql import csv

```text
NAME
    gcloud sql import csv - imports data into a Cloud SQL instance from a CSV
        file

SYNOPSIS
    gcloud sql import csv INSTANCE URI --database=DATABASE, -d DATABASE
        --table=TABLE [--async] [--columns=COLUMNS,[COLUMNS,...]]
        [--escape=ESCAPE] [--fields-terminated-by=FIELDS_TERMINATED_BY]
        [--lines-terminated-by=LINES_TERMINATED_BY] [--quote=QUOTE]
        [--user=USER] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Imports data into a Cloud SQL instance from a plain text file in a Google
    Cloud Storage bucket with one line per row and comma-separated fields.

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

     URI
        Path to the CSV file in Google Cloud Storage from which the import is
        made. The URI is in the form gs://bucketName/fileName. Compressed gzip
        files (.gz) are also supported.

REQUIRED FLAGS
     --database=DATABASE, -d DATABASE
        The database (for example, guestbook) to which the import is made.

     --table=TABLE
        The database table to import csv file into.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --columns=COLUMNS,[COLUMNS,...]
        The columns to import from csv file. These correspond to actual
        database columns to import. If not set, all columns from csv file are
        imported to corresponding database columns.

     --escape=ESCAPE
        Specifies the character that should appear before a data character that
        needs to be escaped. The value of this argument has to be a character
        in Hex ASCII Code. For example, "22" represents double quotes. This
        flag is only available for MySQL and Postgres. If this flag is not
        provided, double quotes character will be used as the default value.

     --fields-terminated-by=FIELDS_TERMINATED_BY
        Specifies the character that splits column values. The value of this
        argument has to be a character in Hex ASCII Code. For example, "2C"
        represents a comma. This flag is only available for MySQL and Postgres.
        If this flag is not provided, a comma character will be used as the
        default value.

     --lines-terminated-by=LINES_TERMINATED_BY
        Specifies the character that split line records. The value of this
        argument has to be a character in Hex ASCII Code. For example, "0A"
        represents a new line. This flag is only available for MySQL. If this
        flag is not provided, a new line character will be used as the default
        value.

     --quote=QUOTE
        Specifies the character that encloses values from columns that have
        string data type. The value of this argument has to be a character in
        Hex ASCII Code. For example, "22" represents double quotes. This flag
        is only available for MySQL and Postgres. If this flag is not provided,
        double quotes character will be used as the default value.

     --user=USER
        PostgreSQL user for this import operation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql import csv

        $ gcloud beta sql import csv
```

### gcloud sql import sql

```text
NAME
    gcloud sql import sql - imports data into a Cloud SQL instance from a SQL
        dump file

SYNOPSIS
    gcloud sql import sql INSTANCE URI [--async] [--clean]
        [--database=DATABASE, -d DATABASE] [--if-exists] [--parallel]
        [--threads=THREADS] [--user=USER] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud sql import sql imports data into a Cloud SQL instance from a SQL
    dump file in Google Cloud Storage.

    NOTE: Certain roles and permissions are required to import data into Google
    Cloud SQL. For more information on importing data into Google Cloud SQL see
    Import a SQL dump file
    (https://cloud.google.com/sql/docs/mysql/import-export/import-export-sql#gcloud_1).

    For detailed help on importing data into Cloud SQL, refer to this guide:
    https://cloud.google.com/sql/docs/mysql/import-export/importing

EXAMPLES
    To import data from a SQL dump file into a database, testdb, on the
    specified Cloud SQL instance test-instance-1, run:

        $ gcloud sql import sql test-instance-1 \
            gs://test-bucket/test-file.sql.gz --database=testdb

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

     URI
        Path to the MySQL dump file in Google Cloud Storage from which the
        import is made. The URI is in the form gs://bucketName/fileName.
        Compressed gzip files (.gz) are also supported.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --clean
        Option to clean (DROP) database objects before recreating them.
        corresponds to the clean flag for pg_restore. Only applies if
        --parallel is set. PostgreSQL only.

     --database=DATABASE, -d DATABASE
        Database to which the import is made. The database needs to be created
        before importing. If not set, it is assumed that the database is
        specified in the file to be imported. If your SQL dump file includes a
        database statement, it will override the database set in this flag.

     --if-exists
        Include an SQL statement (IF EXISTS) with each DROP statement produced
        by --clean; corresponds to the if-exists flag for pg_restore. Only
        applies if --parallel is set. PostgreSQL only.

     --parallel
        Perform a parallel import. This flag is only applicable to MySQL and
        Postgres. When this flag is used, the URI specifies a folder in the
        Cloud Storage bucket where the multiple files to be imported are
        located.

     --threads=THREADS
        Specifies the number of threads to use for the parallel import. If
        --parallel is specified and this flag is not provided, Cloud SQL uses a
        default thread count to optimize performance.

     --user=USER
        PostgreSQL user for this import operation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql import sql

        $ gcloud beta sql import sql
```

### gcloud sql import tde

```text
NAME
    gcloud sql import tde - import TDE certificate into a Cloud SQL for SQL
        Server instance

SYNOPSIS
    gcloud sql import tde INSTANCE
        (--cert-path=CERT_PATH --certificate=CERTIFICATE
          --pvk-path=PVK_PATH (--prompt-for-pvk-password
          | --pvk-password=PVK_PASSWORD)) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud sql import tde imports a TDE certificate into a Cloud SQL instance
    from a certificate file in Google Cloud Storage.

    For detailed help on importing data into Cloud SQL, refer to this guide:
    https://cloud.google.com/sql/docs/sqlserver/import-export/importing

EXAMPLES
    To import a TDE certificate with the name foo and certificate path
    my-bucket/my-cert.cert and private key path my-bucket/my-key.pvk and pvk
    password my-pvk-password into the Cloud SQL instance my-instance, run:

        $ gcloud sql import tde my-instance --certificate=foo \
            --cert-path=gs://my-bucket/my-cert.cert \
            --pvk-path=gs://my-bucket/my-key.pvk \
            --pvk-password=my-pvk-password

    To import a TDE certificate with the name foo and certificate path
    my-bucket/my-cert.cert and private key path my-bucket/my-key.pvk into the
    Cloud SQL instance my-instance and prompting for the private key password,
    run:

        $ gcloud sql import tde my-instance --certificate=foo \
            --cert-path=gs://my-bucket/my-cert.cert \
            --pvk-path=gs://my-bucket/my-key.pvk --prompt-for-pvk-password

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

REQUIRED FLAGS
     Encryption info to support importing a TDE certificate file

     This must be specified.

       --cert-path=CERT_PATH
          Path to the encryption certificate file in Google Cloud Storage. The
          URI is in the form gs://bucketName/fileName.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --certificate=CERTIFICATE
          Name of the encryption certificate.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --pvk-path=PVK_PATH
          Path to the encryption private key file in Google Cloud Storage. The
          URI is in the form gs://bucketName/fileName.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       Exactly one of these must be specified:

         --prompt-for-pvk-password
            Prompt for the private key password associated with the certificate
            file with character echo disabled. The password is all typed
            characters up to but not including the RETURN or ENTER key.

         --pvk-password=PVK_PASSWORD
            The private key password associated with the certificate file.

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

NOTES
    These variants are also available:

        $ gcloud alpha sql import tde

        $ gcloud beta sql import tde
```

### gcloud beta sql import bak

```text
NAME
    gcloud beta sql import bak - import data into a Cloud SQL instance from a
        BAK file

SYNOPSIS
    gcloud beta sql import bak INSTANCE [URI] --database=DATABASE, -d DATABASE
        [--async] [--bak-type=BAK_TYPE; default="FULL"] [--keep-encrypted]
        [--no-recovery] [--recovery-only] [--stop-at=STOP_AT]
        [--stop-at-mark=STOP_AT_MARK] [--[no-]striped]
        [--cert-path=CERT_PATH --pvk-path=PVK_PATH (--prompt-for-pvk-password
          | --pvk-password=PVK_PASSWORD)] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql import csv

```text
NAME
    gcloud beta sql import csv - imports data into a Cloud SQL instance from a
        CSV file

SYNOPSIS
    gcloud beta sql import csv INSTANCE URI --database=DATABASE, -d DATABASE
        --table=TABLE [--async] [--columns=COLUMNS,[COLUMNS,...]]
        [--escape=ESCAPE] [--fields-terminated-by=FIELDS_TERMINATED_BY]
        [--lines-terminated-by=LINES_TERMINATED_BY] [--quote=QUOTE]
        [--user=USER] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql import sql

```text
NAME
    gcloud beta sql import sql - imports data into a Cloud SQL instance from a
        SQL dump file

SYNOPSIS
    gcloud beta sql import sql INSTANCE URI [--async] [--clean]
        [--database=DATABASE, -d DATABASE] [--if-exists] [--parallel]
        [--threads=THREADS] [--user=USER] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql import tde

```text
NAME
    gcloud beta sql import tde - import TDE certificate into a Cloud SQL for
        SQL Server instance

SYNOPSIS
    gcloud beta sql import tde INSTANCE
        (--cert-path=CERT_PATH --certificate=CERTIFICATE
          --pvk-path=PVK_PATH (--prompt-for-pvk-password
          | --pvk-password=PVK_PASSWORD)) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql import bak

```text
NAME
    gcloud alpha sql import bak - import data into a Cloud SQL instance from a
        BAK file

SYNOPSIS
    gcloud alpha sql import bak INSTANCE [URI] --database=DATABASE, -d DATABASE
        [--async] [--bak-type=BAK_TYPE; default="FULL"] [--keep-encrypted]
        [--no-recovery] [--recovery-only] [--stop-at=STOP_AT]
        [--stop-at-mark=STOP_AT_MARK] [--[no-]striped]
        [--cert-path=CERT_PATH --pvk-path=PVK_PATH (--prompt-for-pvk-password
          | --pvk-password=PVK_PASSWORD)] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql import csv

```text
NAME
    gcloud alpha sql import csv - imports data into a Cloud SQL instance from a
        CSV file

SYNOPSIS
    gcloud alpha sql import csv INSTANCE URI --database=DATABASE, -d DATABASE
        --table=TABLE [--async] [--columns=COLUMNS,[COLUMNS,...]]
        [--escape=ESCAPE] [--fields-terminated-by=FIELDS_TERMINATED_BY]
        [--lines-terminated-by=LINES_TERMINATED_BY] [--quote=QUOTE]
        [--user=USER] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql import sql

```text
NAME
    gcloud alpha sql import sql - imports data into a Cloud SQL instance from a
        SQL dump file

SYNOPSIS
    gcloud alpha sql import sql INSTANCE URI [--async] [--clean]
        [--database=DATABASE, -d DATABASE] [--if-exists] [--parallel]
        [--threads=THREADS] [--user=USER] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql import tde

```text
NAME
    gcloud alpha sql import tde - import TDE certificate into a Cloud SQL for
        SQL Server instance

SYNOPSIS
    gcloud alpha sql import tde INSTANCE
        (--cert-path=CERT_PATH --certificate=CERTIFICATE
          --pvk-path=PVK_PATH (--prompt-for-pvk-password
          | --pvk-password=PVK_PASSWORD)) [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/import (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
