---
source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/migration-jobs
---

# gcloud database-migration migration-jobs (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud database-migration migration-jobs create

```text
NAME
    gcloud database-migration migration-jobs create - create a Database
        Migration Service migration job

SYNOPSIS
    gcloud database-migration migration-jobs create
        (MIGRATION_JOB : --region=REGION) --destination=DESTINATION
        --source=SOURCE --type=TYPE [--no-async] [--commit-id=COMMIT_ID]
        [--conversion-workspace=CONVERSION_WORKSPACE]
        [--display-name=DISPLAY_NAME]
        [--dump-parallel-level=DUMP_PARALLEL_LEVEL] [--dump-type=DUMP_TYPE]
        [--endpoint-mode=ENDPOINT_MODE] [--filter=FILTER]
        [--labels=[KEY=VALUE,...]] [--load-parallel-level=LOAD_PARALLEL_LEVEL]
        [--mysql-is-primary-destination]
        [--original-migration-name=ORIGINAL_MIGRATION_NAME]
        [--postgres-max-additional-subscriptions=POSTGRES_MAX_ADDITIONAL_SUBSCRIPTIONS]
        [--use-postgres-native]
        [--all-databases | --databases-filter=databaseName,[...]
          --excluded-schemas-filter=DATABASE.SCHEMA,[...]
          --excluded-tables-filter=DATABASE.SCHEMA.TABLE,[...]
          --schemas-filter=DATABASE.SCHEMA,[...]
          --tables-filter=DATABASE.SCHEMA.TABLE,[...]]
        [--cmek-key=CMEK_KEY
          : --cmek-keyring=CMEK_KEYRING --cmek-project=CMEK_PROJECT]
        [--dump-flags=[KEY=VALUE,...] | --dump-path=DUMP_PATH]
        [--max-concurrent-cdc-connections=MAX_CONCURRENT_CDC_CONNECTIONS
          --max-concurrent-full-dump-connections=MAX_CONCURRENT_FULL_DUMP_CONNECTIONS --skip-full-dump --oracle-cdc-start-position=ORACLE_CDC_START_POSITION | --sqlserver-cdc-start-position=SQLSERVER_CDC_START_POSITION --max-concurrent-destination-connections=MAX_CONCURRENT_DESTINATION_CONNECTIONS --transaction-timeout=TRANSACTION_TIMEOUT]
        [--peer-vpc=PEER_VPC | --static-ip
          | [--vm-ip=VM_IP --vm-port=VM_PORT --vpc=VPC : --vm=VM]]
        [--sqlserver-dag-linked-server=SQLSERVER_DAG_LINKED_SERVER
          --sqlserver-dag-source-ag=SQLSERVER_DAG_SOURCE_AG
          | [--sqlserver-databases=databaseName,[...] : --sqlserver-diff-backup
          --sqlserver-encrypted-databases=SQLSERVER_ENCRYPTED_DATABASES
          --sqlserver-promote-when-ready]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Database Migration Service migration job. Recommended steps before
    creating the migration job:
      o Create a source connection profile. See prerequisites here
        (https://cloud.google.com/database-migration/docs/mysql/configure-source-database).
      o Create a destination connection profile. For migrating to Cloud SQL
        for MySQL or Cloud SQL for PostgreSQL, use the cloudsql connection
        profile for DMS to create the CloudSQL replica for you.
      o Configure the connectivity method. See prerequisites here
        (https://cloud.google.com/database-migration/docs/mysql/configure-connectivity).
      o [Heterogeneous migrations only] Create a conversion workspace.

EXAMPLES
    To create a continuous migration job with IP allowlist connectivity:

        $ gcloud database-migration migration-jobs create my-migration-job \
          --region=us-central1 --type=CONTINUOUS --source=cp1 \
          --destination=cp2

    To create a continuous migration job with VPC peering connectivity:

        $ gcloud database-migration migration-jobs create my-migration-job \
          --region=us-central1 --type=CONTINUOUS --source=cp1 \
          --destination=cp2 \
          --peer-vpc=projects/my-project/global/networks/my-network

    To create a one-time migration job with reverse-SSH tunnel connectivity:

        $ gcloud database-migration migration-jobs create my-migration-job \
          --region=us-central1 --type=ONE_TIME --source=cp1 \
          --destination=cp2 --vm=vm1 --vm-ip=1.1.1.1 --vm-port=1111 \
          --vpc=projects/my-project/global/networks/my-network

    To create a heterogeneous continuous migration job:

        $ gcloud database-migration migration-jobs create my-migration-job \
          --region=us-central1 --type=CONTINUOUS --source=cp1 \
          --destination=cp2 --conversion-workspace=cw

    To create a continuous SQL Server to SQL Server homogeneous migration job
    with differential backup enabled:        $ gcloud database-migration migration-jobs create my-migration-job \
          --region=us-central1 --type=CONTINUOUS --source=cp1 \
          --destination=cp2 --sqlserver-diff-backup \
          --sqlserver-databases=db1,db2,db3

    To create a continuous SQL Server to SQL Server homogeneous migration job
    with encrypted databases:        $ gcloud database-migration migration-jobs create my-migration-job \
          --region=us-central1 --type=CONTINUOUS --source=cp1 \
          --destination=cp2 --sqlserver-databases=db1,db2,db3 \
          --sqlserver-encrypted-databases=PATH/TO/ENCRYPTION/SETTINGS

POSITIONAL ARGUMENTS
     Migration job resource - The migration job to create. The arguments in
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

REQUIRED FLAGS
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

     This must be specified.

       --destination=DESTINATION
          ID of the connection_profile or fully qualified identifier for the
          connection_profile.

          To set the connection_profile attribute:
          + provide the argument --destination on the command line.

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

     This must be specified.

       --source=SOURCE
          ID of the connection_profile or fully qualified identifier for the
          connection_profile.

          To set the connection_profile attribute:
          + provide the argument --source on the command line.

     --type=TYPE
        Type of the migration job. TYPE must be one of: ONE_TIME, CONTINUOUS.

OPTIONAL FLAGS
     --no-async
        Waits for the operation in progress to complete before returning.

     --commit-id=COMMIT_ID
        Commit id for the conversion workspace to use for creating the
        migration job. If not specified, the latest commit id will be used by
        default.

     Conversion workspace resource - Name of the conversion workspaces to be
     used for the migration job This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --conversion-workspace on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the region attribute:
      * provide the argument --conversion-workspace on the command line with
        a fully specified name;
      * provide the argument --region on the command line.

     --conversion-workspace=CONVERSION_WORKSPACE
        ID of the conversion_workspace or fully qualified identifier for the
        conversion_workspace.

        To set the conversion_workspace attribute:
        * provide the argument --conversion-workspace on the command line.

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

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --load-parallel-level=LOAD_PARALLEL_LEVEL
        Parallelization level during initial load of the migration job. If not
        specified, will be defaulted to OPTIMAL. Only applicable for MySQL to
        MySQL migrations. LOAD_PARALLEL_LEVEL must be one of: MIN, OPTIMAL,
        MAX.

     --mysql-is-primary-destination
        Whether the destination for the migration job is a primary instance.

     Migration job resource - Name of the original migration job to be used for
     the failback migration job This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --original-migration-name on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the region attribute:
      * provide the argument --original-migration-name on the command line
        with a fully specified name;
      * provide the argument --region on the command line.

     --original-migration-name=ORIGINAL_MIGRATION_NAME
        ID of the migration_job or fully qualified identifier for the
        migration_job.

        To set the migration_job attribute:
        * provide the argument --original-migration-name on the command line.

     --postgres-max-additional-subscriptions=POSTGRES_MAX_ADDITIONAL_SUBSCRIPTIONS
        Maximum number of additional subscriptions to use for the PostgreSQL
        migration job.

     --use-postgres-native
        Use native logical replication for PostgreSQL migration.

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

     Cmek key resource - Name of the CMEK (customer-managed encryption key)
     used for the migration job The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the region attribute:
      * provide the argument --cmek-key on the command line with a fully
        specified name;
      * provide the argument --region on the command line.

     --cmek-key=CMEK_KEY
        ID of the cmek-key or fully qualified identifier for the cmek-key.

        To set the cmek-key attribute:
        * provide the argument --cmek-key on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --cmek-keyring=CMEK_KEYRING
        The CMEK keyring id of the cmek-key.

        To set the cmek-keyring attribute:
        * provide the argument --cmek-key on the command line with a fully
          specified name;
        * provide the argument --cmek-keyring on the command line.

     --cmek-project=CMEK_PROJECT
        The Cloud project id for the cmek-key.

        To set the cmek-project attribute:
        * provide the argument --cmek-key on the command line with a fully
          specified name;
        * provide the argument --cmek-project on the command line.

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

     Configuration for skipping full dump.

     --skip-full-dump
        Whether to skip full dump or not.

     Configuration for CDC start position.

     At most one of these can be specified:

       --oracle-cdc-start-position=ORACLE_CDC_START_POSITION
          Oracle schema change number (SCN) to start CDC data migration from.

       --sqlserver-cdc-start-position=SQLSERVER_CDC_START_POSITION
          Sqlserver log squence number (LSN) to start CDC data migration from.

     Configuration for Postgres as a destination in a heterogeneous migration.

     --max-concurrent-destination-connections=MAX_CONCURRENT_DESTINATION_CONNECTIONS
        Maximum number of concurrent connections Database Migration Service
        will open to the destination for data migration.

     --transaction-timeout=TRANSACTION_TIMEOUT
        Timeout for data migration transactions.

     The connectivity method used by the migration job. If a connectivity
     method isn't specified, then it isn't added to the migration job.

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

         --vm-ip=VM_IP
            Bastion Virtual Machine IP.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --vm-port=VM_PORT
            Forwarding port for the SSH tunnel.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --vpc=VPC
            Name of the VPC network where the VM is hosted.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --vm=VM
            Name of VM that will host the SSH tunnel bastion.

     At most one of these can be specified:

       The SQL Server homogeneous DAG migration config. This is used only for
       SQL Server to CloudSQL SQL for SQL Server migrations.

       --sqlserver-dag-linked-server=SQLSERVER_DAG_LINKED_SERVER
          The name of the linked server that points to the source SQL Server
          instance.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --sqlserver-dag-source-ag=SQLSERVER_DAG_SOURCE_AG
          The name of the source availability group.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       The SQL Server homogeneous migration config. This is used only for SQL
       Server to CloudSQL SQL Server migrations.

       --sqlserver-databases=databaseName,[...]
          A list of databases to be migrated to the destination Cloud SQL
          instance. Provide databases as a comma separated list. This list
          should contain all encrypted and non-encrypted database names. This
          flag is used only for SQL Server to Cloud SQL migrations.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

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

        $ gcloud alpha database-migration migration-jobs create
```

### gcloud database-migration migration-jobs delete

```text
NAME
    gcloud database-migration migration-jobs delete - delete a Database
        Migration Service migration job

SYNOPSIS
    gcloud database-migration migration-jobs delete
        (MIGRATION_JOB : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [--force] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Database Migration Service migration job.

EXAMPLES
    To delete a migration job:

        $ gcloud database-migration migration-jobs delete MIGRATION_JOB \
          --region=us-central1

POSITIONAL ARGUMENTS
     Migration job resource - Migration job resource - Database Migration
     Service migration job to delete. The arguments in this group can be used
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

     --force
        The destination Cloud SQL connection profile is always deleted with the
        migration job. In case of force delete, the destination Cloud SQL
        replica database is also deleted.

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

        $ gcloud alpha database-migration migration-jobs delete
```

### gcloud database-migration migration-jobs demote-destination

```text
NAME
    gcloud database-migration migration-jobs demote-destination - demote a
        destination of a Database Migration Service migration job

SYNOPSIS
    gcloud database-migration migration-jobs demote-destination
        (MIGRATION_JOB : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Demote a destination of a Database Migration Service migration job.

EXAMPLES
    To Demote a migration job destination:

        $ gcloud database-migration migration-jobs demote-destination \
          MIGRATION_JOB --region=us-central1

POSITIONAL ARGUMENTS
     Migration job resource - Migration job resource - Cloud Database Migration
     Service migration job to demote its destination. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

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
```

### gcloud database-migration migration-jobs describe

```text
NAME
    gcloud database-migration migration-jobs describe - show details about a
        Database Migration Service migration job

SYNOPSIS
    gcloud database-migration migration-jobs describe
        (MIGRATION_JOB : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about a Database Migration Service migration job.

EXAMPLES
    To show details about a migration job, run:

        $ gcloud database-migration migration-jobs describe \
            my-migration-job --region=us-central1

POSITIONAL ARGUMENTS
     Migration job resource - The migration job you want to get the details of.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

        $ gcloud alpha database-migration migration-jobs describe
```

### gcloud database-migration migration-jobs fetch-source-objects

```text
NAME
    gcloud database-migration migration-jobs fetch-source-objects - fetch
        objects for a Database Migration Service migration job by connection to
        the source

SYNOPSIS
    gcloud database-migration migration-jobs fetch-source-objects
        (MIGRATION_JOB : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Fetch objects for a Database Migration Service migration job by connection
    to the source.

POSITIONAL ARGUMENTS
     Migration job resource - The migration job to restart. The arguments in
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

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.
```

### gcloud database-migration migration-jobs generate-ssh-script

```text
NAME
    gcloud database-migration migration-jobs generate-ssh-script - generate a
        SSH script for a Database Migration Service migration job

SYNOPSIS
    gcloud database-migration migration-jobs generate-ssh-script
        (MIGRATION_JOB : --region=REGION) --vm=VM
        (--vm-zone=VM_ZONE | [--subnet=SUBNET --vm-machine-type=VM_MACHINE_TYPE
          : --vm-zone-create=VM_ZONE_CREATE]) [--endpoint-mode=ENDPOINT_MODE]
        [--vm-port=VM_PORT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Generate a script for a Database Migration Service migration job, to
    configure Reverse SSH tunnel connectivity with a bastion host on a Compute
    Engine VM instance. You can use an existing VM instance or create a new VM
    for this purpose.

    Copy the generated script and run it in bash from a machine that has:
      o The gcloud command-line tool installed.
      o Access to your source database.
      o Access to the existing bastion VM, or permissions and access to the
        Cloud Compute API if creating a new bastion VM. Make sure this machine
        is available during the entire migration.

    Running the script will set up the SSH tunnel on the VM you selected and
    will establish connectivity between the source database and the Cloud SQL
    instance. Find additional information here
    (https://cloud.google.com/database-migration/docs/mysql/configure-connectivity-reverse-ssh-tunnel).

EXAMPLES
    To generate an SSH script with bastion VM instance creation:

        $ gcloud database-migration migration-jobs generate-ssh-script \
            my-migration-job --vm=vm1 --vm-port=1111 \
            --vm-machine-type=n1-standard-1 --vm-zone-create=us-central1-a \
            --subnet=sample-subnet --region=us-central1

    To generate an SSH script with an existing bastion VM instance:

        $ gcloud database-migration migration-jobs generate-ssh-script \
            my-migration-job --vm=vm1 --vm-port=1111 \
            --vm-zone=us-central1-a --region=us-central1

POSITIONAL ARGUMENTS
     Migration job resource - The migration job to generate the SSH script for.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

REQUIRED FLAGS
     --vm=VM
        Bastion Compute Engine VM instance name to use or to create.

     Exactly one of these must be specified:

       --vm-zone=VM_ZONE
          Zone the existing bastion VM instance is located in.

       Or at least one of these can be specified:

         --subnet=SUBNET
            Subnet to create the VM instance in.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --vm-machine-type=VM_MACHINE_TYPE
            Machine type for a new VM instance. To get a list of available
            machine types, run 'gcloud compute machine-types list'.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --vm-zone-create=VM_ZONE_CREATE
            Zone to create the VM instance in.

OPTIONAL FLAGS
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

     --vm-port=VM_PORT
        Port that will be open on the bastion host.

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

        $ gcloud alpha database-migration migration-jobs generate-ssh-script
```

### gcloud database-migration migration-jobs list

```text
NAME
    gcloud database-migration migration-jobs list - list Database Migration
        Service migration jobs

SYNOPSIS
    gcloud database-migration migration-jobs list --region=REGION
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Database Migration Service migration jobs.

EXAMPLES
    To list all migration jobs in a project and region 'us-central1', run:

        $ gcloud database-migration migration-jobs list --region=us-central1

REQUIRED FLAGS
     Region resource - The location you want to list the migration jobs for.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --region=REGION
          ID of the region or fully qualified identifier for the region.

          To set the region attribute:
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

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

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

        $ gcloud alpha database-migration migration-jobs list
```

### gcloud database-migration migration-jobs promote

```text
NAME
    gcloud database-migration migration-jobs promote - promote a Database
        Migration Service migration job

SYNOPSIS
    gcloud database-migration migration-jobs promote
        (MIGRATION_JOB : --region=REGION)
        [--databases-filter=databaseName,[...]] [--endpoint-mode=ENDPOINT_MODE]
        [--failback] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Promote a Database Migration Service migration job.

EXAMPLES
    To promote a migration job:

        $ gcloud database-migration migration-jobs promote MIGRATION_JOB \
            --region=us-central1

POSITIONAL ARGUMENTS
     Migration job resource - The migration job to promote. The arguments in
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
     The migration job objects config.

     --databases-filter=databaseName,[...]
        A list of databases to be migrated to the destination instance. Provide
        databases as a comma separated list. This flag is used only for SQL
        Server to Cloud SQL SQL Server migrations.

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

     --failback
        If set, promotes the migration job from destination back to source
        during the FAILBACK phase.

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

        $ gcloud alpha database-migration migration-jobs promote
```

### gcloud database-migration migration-jobs restart

```text
NAME
    gcloud database-migration migration-jobs restart - restart a Database
        Migration Service migration job

SYNOPSIS
    gcloud database-migration migration-jobs restart
        (MIGRATION_JOB : --region=REGION)
        [--databases-filter=databaseName,[...]] [--endpoint-mode=ENDPOINT_MODE]
        [--restart-failed-objects] [--skip-validation] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Restart a Database Migration Service migration job.

EXAMPLES
    To restart a migration job:

        $ gcloud database-migration migration-jobs restart MIGRATION_JOB \
            --region=us-central1

    To restart a migration job without running prior configuration
    verification:

        $ gcloud database-migration migration-jobs restart MIGRATION_JOB \
            --region=us-central1 --skip-validation

POSITIONAL ARGUMENTS
     Migration job resource - The migration job to restart. The arguments in
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
     The migration job objects config.

     At most one of these can be specified:

       --databases-filter=databaseName,[...]
          A list of databases to be migrated to the destination instance.
          Provide databases as a comma separated list. This flag is used only
          for SQL Server to Cloud SQL SQL Server migrations.

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

     --restart-failed-objects
        Restart the failed objects in the migration job. This flag is used only
        for Postgres to AlloyDB, and Postgres to Cloud SQL Postgres and MySQL
        to Cloud SQL MySQL migrations.

     --skip-validation
        Restart the migration job without running prior configuration
        verification.

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

        $ gcloud alpha database-migration migration-jobs restart
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/migration-jobs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
