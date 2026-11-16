---
source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/migration-jobs
---

# gcloud database-migration migration-jobs (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud database-migration migration-jobs resume

```text
NAME
    gcloud database-migration migration-jobs resume - resume a Database
        Migration Service migration job

SYNOPSIS
    gcloud database-migration migration-jobs resume
        (MIGRATION_JOB : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [--skip-validation] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Resume a Database Migration Service migration job.

EXAMPLES
    To resume a migration job:

        $ gcloud database-migration migration-jobs resume MIGRATION_JOB \
          --region=us-central1

POSITIONAL ARGUMENTS
     Migration job resource - Migration job resource - Cloud Database Migration
     Service migration job to resume. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument migration_job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MIGRATION_JOB
          ID of the migration_job or fully qualified identifier for the
          migration_job.

          To set the migration_job attribute:
          + provide the argument migration_job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the region.

          To set the region attribute:
          + provide the argument migration_job on the command line with a
            fully specified name;
          + provide the argument --region on the command line.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     --skip-validation
        Resume the migration job without running prior configuration
        verification.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datamigration/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/database-migration/

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha database-migration migration-jobs resume
```

### gcloud database-migration migration-jobs start

```text
NAME
    gcloud database-migration migration-jobs start - start a Database Migration
        Service migration job

SYNOPSIS
    gcloud database-migration migration-jobs start
        (MIGRATION_JOB : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [--skip-validation] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Start a Database Migration Service migration job.

EXAMPLES
    To start a migration job:

        $ gcloud database-migration migration-jobs start MIGRATION_JOB \
          --region=us-central1

POSITIONAL ARGUMENTS
     Migration job resource - Migration job resource - Cloud Database Migration
     Service migration job to start. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument migration_job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MIGRATION_JOB
          ID of the migration_job or fully qualified identifier for the
          migration_job.

          To set the migration_job attribute:
          + provide the argument migration_job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the region.

          To set the region attribute:
          + provide the argument migration_job on the command line with a
            fully specified name;
          + provide the argument --region on the command line.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     --skip-validation
        Start the migration job without running prior configuration
        verification.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datamigration/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/database-migration/

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha database-migration migration-jobs start
```

### gcloud database-migration migration-jobs stop

```text
NAME
    gcloud database-migration migration-jobs stop - stop a Database Migration
        Service migration job

SYNOPSIS
    gcloud database-migration migration-jobs stop
        (MIGRATION_JOB : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Stop a Database Migration Service migration job.

EXAMPLES
    To stop a migration job:

        $ gcloud database-migration migration-jobs stop MIGRATION_JOB \
          --region=us-central1

POSITIONAL ARGUMENTS
     Migration job resource - Migration job resource - Cloud Database Migration
     Service migration job to stop. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument migration_job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MIGRATION_JOB
          ID of the migration_job or fully qualified identifier for the
          migration_job.

          To set the migration_job attribute:
          + provide the argument migration_job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the region.

          To set the region attribute:
          + provide the argument migration_job on the command line with a
            fully specified name;
          + provide the argument --region on the command line.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datamigration/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/database-migration/

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha database-migration migration-jobs stop
```

### gcloud database-migration migration-jobs update

```text
NAME
    gcloud database-migration migration-jobs update - update a Database
        Migration Service migration job

SYNOPSIS
    gcloud database-migration migration-jobs update
        (MIGRATION_JOB : --region=REGION) [--no-async] [--commit-id=COMMIT_ID]
        [--destination=DESTINATION] [--display-name=DISPLAY_NAME]
        [--dump-parallel-level=DUMP_PARALLEL_LEVEL] [--dump-type=DUMP_TYPE]
        [--endpoint-mode=ENDPOINT_MODE] [--filter=FILTER]
        [--load-parallel-level=LOAD_PARALLEL_LEVEL]
        [--postgres-max-additional-subscriptions=POSTGRES_MAX_ADDITIONAL_SUBSCRIPTIONS]
        [--source=SOURCE] [--type=TYPE] [--update-labels=[KEY=VALUE,...]]
        [--all-databases | --databases-filter=databaseName,[...]
          --excluded-schemas-filter=DATABASE.SCHEMA,[...]
          --excluded-tables-filter=DATABASE.SCHEMA.TABLE,[...]
          --schemas-filter=DATABASE.SCHEMA,[...]
          --tables-filter=DATABASE.SCHEMA.TABLE,[...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--dump-flags=[KEY=VALUE,...] | --dump-path=DUMP_PATH]
        [--max-concurrent-cdc-connections=MAX_CONCURRENT_CDC_CONNECTIONS
          --max-concurrent-full-dump-connections=MAX_CONCURRENT_FULL_DUMP_CONNECTIONS --max-concurrent-destination-connections=MAX_CONCURRENT_DESTINATION_CONNECTIONS --transaction-timeout=TRANSACTION_TIMEOUT]
        [--peer-vpc=PEER_VPC | --static-ip
          | --vm=VM --vm-ip=VM_IP --vm-port=VM_PORT --vpc=VPC]
        [--sqlserver-databases=databaseName,[...] --sqlserver-diff-backup
          --sqlserver-encrypted-databases=SQLSERVER_ENCRYPTED_DATABASES
          --sqlserver-promote-when-ready
          | --sqlserver-dag-linked-server=SQLSERVER_DAG_LINKED_SERVER
          --sqlserver-dag-source-ag=SQLSERVER_DAG_SOURCE_AG]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Database Migration Service migration job.
      o Draft migration job: user can update all available flags.
      o Any other state can only update flags: --display-name, --dump-path,
        and connectivity method flags.

EXAMPLES
    To update the source and destination connection profiles of a draft
    migration job:

        $ gcloud database-migration migration-jobs update my-migration-job \
          --region=us-central1 --source=new-src --destination=new-dest

    To update the display name of a running migration job:

        $ gcloud database-migration migration-jobs update my-migration-job \
          --region=us-central1 --display-name=new-name

POSITIONAL ARGUMENTS
     Migration job resource - The migration job to update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument migration_job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MIGRATION_JOB
          ID of the migration_job or fully qualified identifier for the
          migration_job.

          To set the migration_job attribute:
          + provide the argument migration_job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud region for the migration_job.

          To set the region attribute:
          + provide the argument migration_job on the command line with a
            fully specified name;
          + provide the argument --region on the command line.

FLAGS
     --no-async
        Waits for the operation in progress to complete before returning.

     --commit-id=COMMIT_ID
        Commit id for the conversion workspace to use for creating the
        migration job. If not specified, the latest commit id will be used by
        default.

     Connection profile resource - ID of the destination connection profile,
     representing the destination database. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --destination on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the region attribute:
      * provide the argument --destination on the command line with a fully
        specified name;
      * provide the argument --region on the command line.

     --destination=DESTINATION
        ID of the connection_profile or fully qualified identifier for the
        connection_profile.

        To set the connection_profile attribute:
        * provide the argument --destination on the command line.

     --display-name=DISPLAY_NAME
        A user-friendly name for the migration job. The display name can
        include letters, numbers, spaces, and hyphens, and must start with a
        letter.

     --dump-parallel-level=DUMP_PARALLEL_LEVEL
        Parallelization level during initial dump of the migration job. If not
        specified, will be defaulted to OPTIMAL. DUMP_PARALLEL_LEVEL must be
        one of: MIN, OPTIMAL, MAX.

     --dump-type=DUMP_TYPE
        The type of the data dump. Currently applicable for MySQL to MySQL
        migrations only. DUMP_TYPE must be one of: LOGICAL, PHYSICAL.

     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     --filter=FILTER
        Filter the entities based on AIP-160 (https://google.aip.dev/160)
        standard. Example: to filter all tables whose name start with
        "Employee" and are present under schema "Company", use filter as
        "Company.Employee* AND type=TABLE"

     --load-parallel-level=LOAD_PARALLEL_LEVEL
        Parallelization level during initial load of the migration job. If not
        specified, will be defaulted to OPTIMAL. Only applicable for MySQL to
        MySQL migrations. LOAD_PARALLEL_LEVEL must be one of: MIN, OPTIMAL,
        MAX.

     --postgres-max-additional-subscriptions=POSTGRES_MAX_ADDITIONAL_SUBSCRIPTIONS
        Maximum number of additional subscriptions to use for the PostgreSQL
        migration job.

     Connection profile resource - ID of the source connection profile,
     representing the source database. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument --source on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the region attribute:
      * provide the argument --source on the command line with a fully
        specified name;
      * provide the argument --region on the command line.

     --source=SOURCE
        ID of the connection_profile or fully qualified identifier for the
        connection_profile.

        To set the connection_profile attribute:
        * provide the argument --source on the command line.

     --type=TYPE
        Type of the migration job. TYPE must be one of: ONE_TIME, CONTINUOUS.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     The migration job objects config.

     At most one of these can be specified:

       --all-databases
          Migrate all databases for the migration job. This flag is used only
          for Postgres to AlloyDB, and Postgres to Cloud SQL Postgres and MySQL
          to Cloud SQL MySQL migrations.

       Or at least one of these can be specified:

         The migration job objects filter config.

         --databases-filter=databaseName,[...]
            A list of databases to be migrated to the destination instance.
            Provide databases as a comma separated list. This flag is used only
            for Postgres to AlloyDB, and Postgres to Cloud SQL Postgres and
            MySQL to Cloud SQL MySQL migrations.

         --excluded-schemas-filter=DATABASE.SCHEMA,[...]
            A list of schemas to be excluded from migration to the destination
            instance. Provide schemas as a comma separated list in the format
            DATABASE.SCHEMA, or SCHEMA if a single database is specified in
            --databases-filter. If a database or schema name contains a dot
            (.), enclose it in double quotes (e.g. db1."my.schema") or escape
            the dot with a backslash (e.g. db1.my\.schema). This flag is used
            only for migrations from PostgreSQL to AlloyDB or Cloud SQL for
            PostgreSQL.

            Note: Omitting --databases-filter migrates only the database(s)
            referenced in this filter. On multi-database instances, specify all
            databases to be migrated in --databases-filter.

         --excluded-tables-filter=DATABASE.SCHEMA.TABLE,[...]
            A list of tables to be excluded from migration to the destination
            instance. Provide tables as a comma separated list in the format
            DATABASE.SCHEMA.TABLE, or SCHEMA.TABLE if a single database is
            specified in --databases-filter. If a database, schema, or table
            name contains a dot (.), enclose it in double quotes (e.g.
            db1."my.schema"."my.table") or escape the dot with a backslash
            (e.g. db1.my\.schema.my\.table). This flag is used only for
            migrations from PostgreSQL to AlloyDB or Cloud SQL for PostgreSQL.

            Note: Omitting --databases-filter migrates only the database(s)
            referenced in this filter. On multi-database instances, specify all
            databases to be migrated in --databases-filter.

         --schemas-filter=DATABASE.SCHEMA,[...]
            A list of schemas to be migrated to the destination instance.
            Provide schemas as a comma separated list in the format
            DATABASE.SCHEMA, or SCHEMA if a single database is specified in
            --databases-filter. If a database or schema name contains a dot
            (.), enclose it in double quotes (e.g. db1."my.schema") or escape
            the dot with a backslash (e.g. db1.my\.schema). This flag is used
            only for migrations from PostgreSQL to AlloyDB or Cloud SQL for
            PostgreSQL.

         --tables-filter=DATABASE.SCHEMA.TABLE,[...]
            A list of tables to be migrated to the destination instance.
            Provide tables as a comma separated list in the format
            DATABASE.SCHEMA.TABLE, or SCHEMA.TABLE if a single database is
            specified in --databases-filter. If a database, schema, or table
            name contains a dot (.), enclose it in double quotes (e.g.
            db1."my.schema"."my.table") or escape the dot with a backslash
            (e.g. db1.my\.schema.my\.table). This flag is used only for
            migrations from PostgreSQL to AlloyDB or Cloud SQL for PostgreSQL.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud database-migration migration-jobs update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud database-migration migration-jobs update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

     At most one of these can be specified:

       --dump-flags=[KEY=VALUE,...]
          A list of dump flags. An object containing a list of "key": "value"
          pairs.

       --dump-path=DUMP_PATH
          Path to the dump file in Google Cloud Storage, in the format:
          gs://[BUCKET_NAME]/[OBJECT_NAME].

     The heterogeneous migration config. This is used only for Oracle to Cloud
     SQL for PostgreSQL and SQL Server to Cloud SQL for PostgreSQL migrations.

     Configuration for Oracle or SQL Server as a source in a heterogeneous
     migration.

     --max-concurrent-cdc-connections=MAX_CONCURRENT_CDC_CONNECTIONS
        Maximum number of connections Database Migration Service will open to
        the source for CDC phase.

     --max-concurrent-full-dump-connections=MAX_CONCURRENT_FULL_DUMP_CONNECTIONS
        Maximum number of connections Database Migration Service will open to
        the source for full dump phase.

     Configuration for Postgres as a destination in a heterogeneous migration.

     --max-concurrent-destination-connections=MAX_CONCURRENT_DESTINATION_CONNECTIONS
        Maximum number of concurrent connections Database Migration Service
        will open to the destination for data migration.

     --transaction-timeout=TRANSACTION_TIMEOUT
        Timeout for data migration transactions.

     The connectivity method used by the migration job. If a connectivity
     method isn't specified, then it isn't updated for the migration job.

     At most one of these can be specified:

       --peer-vpc=PEER_VPC
          Name of the VPC network to peer with the Cloud SQL private network.

       --static-ip
          Use the default IP allowlist method. This method creates a public IP
          that will be used with the destination Cloud SQL database. The method
          works by configuring the source database server to accept connections
          from the outgoing IP of the Cloud SQL instance.

       Or at least one of these can be specified:

         Parameters for the reverse-SSH tunnel connectivity method.

         --vm=VM
            Name of VM that will host the SSH tunnel bastion.

         --vm-ip=VM_IP
            Bastion Virtual Machine IP.

         --vm-port=VM_PORT
            Forwarding port for the SSH tunnel.

         --vpc=VPC
            Name of the VPC network where the VM is hosted.

     At most one of these can be specified:

       The SQL Server homogeneous migration config. This is used only for SQL
       Server to CloudSQL SQL Server migrations.

       --sqlserver-databases=databaseName,[...]
          A list of databases to be migrated to the destination Cloud SQL
          instance. Provide databases as a comma separated list. This list
          should contain all encrypted and non-encrypted database names. This
          flag is used only for SQL Server to Cloud SQL migrations.

       --sqlserver-diff-backup
          Enable differential backups. If not specified, differential backups
          are disabled by default. Use --sqlserver-diff-backup to enable and
          --no-sqlserver-diff-backup to disable. This flag is used only for
          homogeneous SQL Server to Cloud SQL for SQL Server migrations.

       --sqlserver-encrypted-databases=SQLSERVER_ENCRYPTED_DATABASES
          A JSON/YAML file describing the encryption settings per database for
          all encrytped databases. Note: Path to the Certificate (.cer) and
          Private Key (.pvk) in Cloud Storage, should be in the form of
          gs://bucketName/fileName. The instance must have write permissions to
          the bucket and read access to the file. An example of a JSON request:
          [{ "database": "db1", "encryptionOptions": { "certPath": "Path to
          certificate 1", "pvkPath": "Path to certificate private key 1",
          "pvkPassword": "Private key password 1" } }, { "database": "db2",
          "encryptionOptions": { "certPath": "Path to certificate 2",
          "pvkPath": "Path to certificate private key 2", "pvkPassword":
          "Private key password 2" } }]

              This flag accepts "-" for stdin. This flag is used only for SQL Server to Cloud SQL migrations.

       --sqlserver-promote-when-ready
          Promote the database when it is ready. Use
          --sqlserver-promote-when-ready to enable and
          --no-sqlserver-promote-when-ready to disable. This flag is used only
          for homogeneous SQL Server to Cloud SQL for SQL Server migrations.

       The SQL Server homogeneous DAG migration config. This is used only for
       SQL Server to CloudSQL SQL for SQL Server migrations.

       --sqlserver-dag-linked-server=SQLSERVER_DAG_LINKED_SERVER
          The name of the linked server that points to the source SQL Server
          instance.

       --sqlserver-dag-source-ag=SQLSERVER_DAG_SOURCE_AG
          The name of the source availability group.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha database-migration migration-jobs update
```

### gcloud database-migration migration-jobs verify

```text
NAME
    gcloud database-migration migration-jobs verify - verify a Database
        Migration Service migration job

SYNOPSIS
    gcloud database-migration migration-jobs verify
        (MIGRATION_JOB : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Verify a Database Migration Service migration job.

EXAMPLES
    To verify a migration job:

        $ gcloud database-migration migration-jobs verify MIGRATION_JOB \
          --region=us-central1

POSITIONAL ARGUMENTS
     Migration job resource - Migration job resource - Cloud Database Migration
     Service migration job to verify. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument migration_job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MIGRATION_JOB
          ID of the migration_job or fully qualified identifier for the
          migration_job.

          To set the migration_job attribute:
          + provide the argument migration_job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the region.

          To set the region attribute:
          + provide the argument migration_job on the command line with a
            fully specified name;
          + provide the argument --region on the command line.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datamigration/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/database-migration/

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha database-migration migration-jobs verify
```

### gcloud alpha database-migration migration-jobs create

```text
NAME
    gcloud alpha database-migration migration-jobs create - create a Database
        Migration Service migration job

SYNOPSIS
    gcloud alpha database-migration migration-jobs create
        (MIGRATION_JOB : --region=REGION) --destination=DESTINATION
        --source=SOURCE --type=TYPE [--no-async] [--display-name=DISPLAY_NAME]
        [--endpoint-mode=ENDPOINT_MODE] [--labels=[KEY=VALUE,...]]
        [--dump-flags=[KEY=VALUE,...] | --dump-path=DUMP_PATH]
        [--peer-vpc=PEER_VPC | --static-ip
          | [--vm-ip=VM_IP --vm-port=VM_PORT --vpc=VPC : --vm=VM]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha database-migration migration-jobs delete

```text
NAME
    gcloud alpha database-migration migration-jobs delete - delete a Database
        Migration Service migration job

SYNOPSIS
    gcloud alpha database-migration migration-jobs delete
        (MIGRATION_JOB : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [--force] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha database-migration migration-jobs describe

```text
NAME
    gcloud alpha database-migration migration-jobs describe - show details
        about a Database Migration Service migration job

SYNOPSIS
    gcloud alpha database-migration migration-jobs describe
        (MIGRATION_JOB : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha database-migration migration-jobs generate-ssh-script

```text
NAME
    gcloud alpha database-migration migration-jobs generate-ssh-script -
        generate a SSH script for a Database Migration Service migration job

SYNOPSIS
    gcloud alpha database-migration migration-jobs generate-ssh-script
        (MIGRATION_JOB : --region=REGION) --vm=VM
        (--vm-zone=VM_ZONE | [--vm-machine-type=VM_MACHINE_TYPE --vpc=VPC
          : --vm-zone-create=VM_ZONE_CREATE]) [--endpoint-mode=ENDPOINT_MODE]
        [--vm-port=VM_PORT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha database-migration migration-jobs list

```text
NAME
    gcloud alpha database-migration migration-jobs list - list Database
        Migration Service migration jobs

SYNOPSIS
    gcloud alpha database-migration migration-jobs list --region=REGION
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha database-migration migration-jobs promote

```text
NAME
    gcloud alpha database-migration migration-jobs promote - promote a Database
        Migration Service migration job

SYNOPSIS
    gcloud alpha database-migration migration-jobs promote
        (MIGRATION_JOB : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha database-migration migration-jobs restart

```text
NAME
    gcloud alpha database-migration migration-jobs restart - restart a Database
        Migration Service migration job

SYNOPSIS
    gcloud alpha database-migration migration-jobs restart
        (MIGRATION_JOB : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha database-migration migration-jobs resume

```text
NAME
    gcloud alpha database-migration migration-jobs resume - resume a Database
        Migration Service migration job

SYNOPSIS
    gcloud alpha database-migration migration-jobs resume
        (MIGRATION_JOB : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha database-migration migration-jobs start

```text
NAME
    gcloud alpha database-migration migration-jobs start - start a Database
        Migration Service migration job

SYNOPSIS
    gcloud alpha database-migration migration-jobs start
        (MIGRATION_JOB : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha database-migration migration-jobs stop

```text
NAME
    gcloud alpha database-migration migration-jobs stop - stop a Database
        Migration Service migration job

SYNOPSIS
    gcloud alpha database-migration migration-jobs stop
        (MIGRATION_JOB : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha database-migration migration-jobs update

```text
NAME
    gcloud alpha database-migration migration-jobs update - update a Database
        Migration Service migration job

SYNOPSIS
    gcloud alpha database-migration migration-jobs update
        (MIGRATION_JOB : --region=REGION) [--no-async]
        [--destination=DESTINATION] [--display-name=DISPLAY_NAME]
        [--endpoint-mode=ENDPOINT_MODE] [--source=SOURCE] [--type=TYPE]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--dump-flags=[KEY=VALUE,...] | --dump-path=DUMP_PATH]
        [--peer-vpc=PEER_VPC | --static-ip
          | --vm=VM --vm-ip=VM_IP --vm-port=VM_PORT --vpc=VPC]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha database-migration migration-jobs verify

```text
NAME
    gcloud alpha database-migration migration-jobs verify - verify a Database
        Migration Service migration job

SYNOPSIS
    gcloud alpha database-migration migration-jobs verify
        (MIGRATION_JOB : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/migration-jobs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
