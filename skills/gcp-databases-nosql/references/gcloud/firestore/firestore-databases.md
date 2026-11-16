---
source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/databases
---

# gcloud firestore databases

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud firestore databases clone

```text
NAME
    gcloud firestore databases clone - clone a Google Cloud Firestore database
        from another

SYNOPSIS
    gcloud firestore databases clone
        --destination-database=DESTINATION_DATABASE
        --snapshot-time=SNAPSHOT_TIME --source-database=SOURCE_DATABASE
        [--tags=[KEY=VALUE,...]]
        [--encryption-type=ENCRYPTION_TYPE : --kms-key-name=KMS_KEY_NAME]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To clone a database from another:

        $ gcloud firestore databases clone \
          --source-database=projects/PROJECT_ID/databases/\
        SOURCE_DATABASE --snapshot-time=2025-05-26T10:20:00.00Z \
            --destination-database=DATABASE_ID

    To clone to a CMEK-enabled database:

        $ gcloud firestore databases clone \
          --source-database=projects/PROJECT_ID/databases/\
        SOURCE_DATABASE --snapshot-time=2025-05-26T10:20:00.00Z \
            --destination-database=DATABASE_ID \
            --encryption-type=customer-managed-encryption \
            --kms-key-name=projects/PROJECT_ID/locations/LOCATION_ID/\
        keyRings/KEY_RING_ID/cryptoKeys/CRYPTO_KEY_ID

REQUIRED FLAGS
     --destination-database=DESTINATION_DATABASE
        Destination database to clone to. Destination database will be created
        in the same location as the source database.

        This value should be 4-63 characters. Valid characters are
        /[a-z][0-9]-/ with first character a letter and the last a letter or a
        number. Must not be UUID-like /[0-9a-f]8(-[0-9a-f]4)3-[0-9a-f]12/.

        Using "(default)" database ID is also allowed.

        For example, to clone to database testdb:

            $ gcloud firestore databases clone --destination-database=testdb

     --snapshot-time=SNAPSHOT_TIME
        Snapshot time at which to clone. This must be a whole minute, in the
        past, and not earlier than the source database's earliest_version_time.
        Additionally, if older than one hour in the past, PITR must be enabled
        on the source database.

        For example, to restore from snapshot 2025-05-26T10:20:00.00Z of source
        database source-db:

            $ gcloud firestore databases clone \
                --source-database=projects/PROJECT_ID/databases/source-db \
                --snapshot-time=2025-05-26T10:20:00.00Z

     --source-database=SOURCE_DATABASE
        The source database to clone from.

        For example, to clone from database source-db:

            $ gcloud firestore databases clone \
                --source-database=projects/PROJECT_ID/databases/source-db

OPTIONAL FLAGS
     --tags=[KEY=VALUE,...]
        Tags to attach to the destination database. Example:
        --tags=key1=value1,key2=value2

        For example, to attach tags to a database:

        $ --tags=key1=value1,key2=value2

     The encryption configuration of the new database being created from the
     database. If not specified, the same encryption settings as the database
     will be used.

     To create a CMEK-enabled database:

         $ gcloud firestore databases clone \
             --encryption-type=customer-managed-encryption \
             --kms-key-name=projects/PROJECT_ID/locations/LOCATION_ID/\
         keyRings/KEY_RING_ID/cryptoKeys/CRYPTO_KEY_ID

     To create a Google-default-encrypted database:

         $ gcloud firestore databases clone \
             --encryption-type=google-default-encryption

     To create a database using the same encryption settings as the database:

         $ gcloud firestore databases clone \
             --encryption-type=use-source-encryption

     --encryption-type=ENCRYPTION_TYPE
        The encryption type of the destination database. ENCRYPTION_TYPE must
        be one of: use-source-encryption, customer-managed-encryption,
        google-default-encryption.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --kms-key-name=KMS_KEY_NAME
        The resource ID of a Cloud KMS key. If set, the database created will
        be a Customer-Managed Encryption Key (CMEK) database encrypted with
        this key. This feature is allowlist only in initial launch.

        Only a key in the same location as this database is allowed to be used
        for encryption. For Firestore's nam5 multi-region, this corresponds to
        Cloud KMS location us. For Firestore's eur3 multi-region, this
        corresponds to Cloud KMS location europe. See
        https://cloud.google.com/kms/docs/locations.

        This value should be the KMS key resource ID in the format of
        projects/{project_id}/locations/{kms_location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}.
        How to retrieve this resource ID is listed at
        https://cloud.google.com/kms/docs/getting-resource-ids#getting_the_id_for_a_key_and_version.

        This flag must only be specified when encryption-type is
        customer-managed-encryption.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore databases clone

        $ gcloud beta firestore databases clone
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud firestore databases clone \
    --source-database=projects/PROJECT_ID/databases/SOURCE_DATABASE \
    --snapshot-time=2025-05-26T10:20:00.00Z \
    --destination-database=DATABASE_ID

gcloud firestore databases clone \
    --source-database=projects/PROJECT_ID/databases/SOURCE_DATABASE \
    --snapshot-time=2025-05-26T10:20:00.00Z \
    --destination-database=DATABASE_ID \
    --encryption-type=customer-managed-encryption \
    --kms-key-name=projects/PROJECT_ID/locations/LOCATION_ID/keyRings/KEY_RING_ID/cryptoKeys/CRYPTO_KEY_ID
```

### gcloud firestore databases connection-string

```text
NAME
    gcloud firestore databases connection-string - prints the mongo connection
        string for the given Firestore database

SYNOPSIS
    gcloud firestore databases connection-string --database=DATABASE
        [--auth=AUTH; default="none" | --validate=VALIDATE]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To get the connection string for a Firestore database with a databaseId
    testdb without auth configuration.

        $ gcloud firestore databases connection-string --database=testdb \
          --auth=none

    To get the connection string for a Firestore database with a databaseId
    testdb with Google Compute Engine VM auth.

        $ gcloud firestore databases connection-string --database=testdb \
          --auth=gce-vm

REQUIRED FLAGS
     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore databases connection-string --database='foo'

OPTIONAL FLAGS
     At most one of these can be specified:

       --auth=AUTH; default="none"
          The auth configuration for the connection string.

          If connecting from a Google Compute Engine VM, use gce-vm. For short
          term access using the gcloud CLI's access token, use access-token.
          For password auth use scram-sha-256. Otherwise, use none and
          configure auth manually.

          AUTH must be one of: none, gce-vm, access-token, scram-sha-256.

       --validate=VALIDATE
          Validate the specified connection string for the current database.
          This command checks that the connection string is well formed,
          contains the required parameters, and specifies correct configuration
          values for the current database.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore databases connection-string

        $ gcloud beta firestore databases connection-string
```

### gcloud firestore databases create

```text
NAME
    gcloud firestore databases create - create a Google Cloud Firestore
        database via Firestore API

SYNOPSIS
    gcloud firestore databases create --location=LOCATION
        [--concurrency-mode=CONCURRENCY_MODE]
        [--database=DATABASE; default="(default)"] [--delete-protection]
        [--edition=EDITION; default="standard"]
        [--enable-firestore-data-access]
        [--enable-mongodb-compatible-data-access] [--enable-pitr]
        [--enable-realtime-updates] [--kms-key-name=KMS_KEY_NAME]
        [--tags=[KEY=VALUE,...]] [--type=TYPE; default="firestore-native"]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To create a Firestore Enterprise database named foo in nam5 for use with
    MongoDB Compatible API with Data Access Mode enabled.

        $ gcloud firestore databases create --database=foo \
          --edition=enterprise --location=nam5 \
          --enable-mongodb-compatible-data-access

    To create a Firestore Enterprise database named foo in nam5 for use with
    Firestore API Data Access Mode enabled and Realtime Updates disabled.

        $ gcloud firestore databases create --database=foo \
          --edition=enterprise --location=nam5 \
          --enable-firestore-data-access

    To create a Firestore Enterprise database named foo in nam5 for use with
    Firestore API Data Access Mode enabled and Realtime Updates enabled.

        $ gcloud firestore databases create --database=foo \
          --edition=enterprise --location=nam5 \
          --enable-firestore-data-access --enable-realtime-updates

    To create a Firestore Native database in nam5.

        $ gcloud firestore databases create --location=nam5

    To create a Firestore Native database in us-central1 with tags.

        $ gcloud firestore databases create --location=us-central1 \
          --tags=key1=value1,key2=value2

    To create a Datastore Mode database in us-east1.

        $ gcloud firestore databases create --location=us-east1 \
          --type=datastore-mode

    To create a Datastore Mode database in us-east1 with a databaseId foo.

        $ gcloud firestore databases create --database=foo \
          --location=us-east1 --type=datastore-mode

    To create a Firestore Native database in nam5 with delete protection
    enabled.

        $ gcloud firestore databases create --location=nam5 \
          --delete-protection

    To create a Firestore Native database in nam5 with Point In Time Recovery
    (PITR) enabled.

        $ gcloud firestore databases create --location=nam5 --enable-pitr

    To create a Firestore Native database in nam5 encrypted by a
    Customer-managed encryption key (CMEK).

        $ gcloud firestore databases create --location=nam5 \
          --kms-key-name=projects/PROJECT_ID/locations/us/keyRings/\
        KEY_RING_ID/cryptoKeys/CRYPTO_KEY_ID

REQUIRED FLAGS
     --location=LOCATION
        The location to operate on. Available locations are listed at
        https://cloud.google.com/firestore/docs/locations.

        For example, to operate on location us-east1:

            $ gcloud firestore databases create --location='us-east1'

OPTIONAL FLAGS
     --concurrency-mode=CONCURRENCY_MODE
        The concurrency control mode to use for this database.

        When not specified, Firestore will pick a default concurrency mode
        based on the database edition.

        CONCURRENCY_MODE must be one of: optimistic, pessimistic.

     --database=DATABASE; default="(default)"
        The ID to use for the database, which will become the final component
        of the database's resource name. If database ID is not provided,
        (default) will be used as database ID.

        This value should be 4-63 characters. Valid characters are
        /[a-z][0-9]-/ with first character a letter and the last a letter or a
        number. Must not be UUID-like
        /[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/.

        Using "(default)" database ID is also allowed.

     --delete-protection
        Whether to enable delete protection on the created database.

        If set to true, delete protection of the new database will be enabled
        and delete operations will fail unless delete protection is disabled.

        Default to false.

     --edition=EDITION; default="standard"
        The edition of the database. EDITION must be one of: standard,
        enterprise.

     --enable-firestore-data-access
        Whether to enable Firestore API Data Access on the created database.

        If set to true, Firestore API Data Access on the new database will be
        enabled. By default, this feature is disabled for Enterprise edition
        databases. To explicitly disable, use
        --no-enable-firestore-data-access.

     --enable-mongodb-compatible-data-access
        Whether to enable MongoDB Compatible API Data Access on the created
        database.

        If set to true, MongoDB Compatible API Data Access on the new database
        will be enabled. By default, this feature is enabled for Enterprise
        edition databases. To disable, use
        --no-enable-mongodb-compatible-data-access.

     --enable-pitr
        Whether to enable Point In Time Recovery (PITR) on the created
        database.

        If set to true, PITR on the new database will be enabled. By default,
        this feature is not enabled.

     --enable-realtime-updates
        Whether to enable Realtime Updates feature on the created database.

        If set to true, Realtime Updates feature on the new database will be
        enabled. By default, this feature is disabled for Enterprise edition
        databases. To explicitly disable, use --no-enable-realtime-updates.

     --kms-key-name=KMS_KEY_NAME
        The resource ID of a Cloud KMS key. If set, the database created will
        be a Customer-Managed Encryption Key (CMEK) database encrypted with
        this key. This feature is allowlist only in initial launch.

        Only a key in the same location as this database is allowed to be used
        for encryption. For Firestore's nam5 multi-region, this corresponds to
        Cloud KMS location us. For Firestore's eur3 multi-region, this
        corresponds to Cloud KMS location europe. See
        https://cloud.google.com/kms/docs/locations.

        This value should be the KMS key resource ID in the format of
        projects/{project_id}/locations/{kms_location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}.
        How to retrieve this resource ID is listed at
        https://cloud.google.com/kms/docs/getting-resource-ids#getting_the_id_for_a_key_and_version.

     --tags=[KEY=VALUE,...]
        Tags to attach to the destination database. Example:
        --tags=key1=value1,key2=value2

        For example, to attach tags to a database:

        $ --tags=key1=value1,key2=value2

     --type=TYPE; default="firestore-native"
        The type of the database. TYPE must be one of: firestore-native,
        datastore-mode.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore databases create

        $ gcloud beta firestore databases create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud firestore databases create \
    --location=nam5 \
    --kms-key-name=projects/PROJECT_ID/locations/us/keyRings/KEY_RING_ID/cryptoKeys/CRYPTO_KEY_ID
```

### gcloud firestore databases delete

```text
NAME
    gcloud firestore databases delete - delete a Google Cloud Firestore
        database

SYNOPSIS
    gcloud firestore databases delete --database=DATABASE [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To delete a Firestore database test.

        $ gcloud firestore databases delete --database=test

    To delete the Firestore (default) database.

        $ gcloud firestore databases delete --database=(default)

    To delete a Firestore database test providing etag.

        $ gcloud firestore databases delete --database=test --etag=etag

REQUIRED FLAGS
     --database=DATABASE
        The database to operate on.

OPTIONAL FLAGS
     --etag=ETAG
        The current etag of the Database. If an etag is provided and does not
        match the current etag of the database, deletion will be blocked and a
        FAILED_PRECONDITION error will be returned.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore databases delete

        $ gcloud beta firestore databases delete
```

### gcloud firestore databases describe

```text
NAME
    gcloud firestore databases describe - describes information about a Cloud
        Firestore database

SYNOPSIS
    gcloud firestore databases describe
        [--database=DATABASE; default="(default)"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The following command describes a Google Cloud Firestore database.

EXAMPLES
    To describe a Firestore database with a databaseId testdb.

        $ gcloud firestore databases describe --database=testdb

    If databaseId is not specified, the command will describe information about
    the (default) database.

        $ gcloud firestore databases describe

FLAGS
     --database=DATABASE; default="(default)"
        The database to operate on. The default value is (default).

        For example, to operate on database foo:

            $ gcloud firestore databases describe --database='foo'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore databases describe

        $ gcloud beta firestore databases describe
```

### gcloud firestore databases list

```text
NAME
    gcloud firestore databases list - lists all Firestore databases under the
        project

SYNOPSIS
    gcloud firestore databases list [--show-deleted] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To list all active Firestore databases.

        $ gcloud firestore databases list

    To list all Firestore databases including deleted databases.

        $ gcloud firestore databases list --show-deleted

FLAGS
     --show-deleted
        Show the deleted databases.

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

NOTES
    These variants are also available:

        $ gcloud alpha firestore databases list

        $ gcloud beta firestore databases list
```

### gcloud firestore databases ping

```text
NAME
    gcloud firestore databases ping - times the connection and ping time for a
        Firestore with MongoDB compatibility database

SYNOPSIS
    gcloud firestore databases ping --database=DATABASE [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To time the connection and ping times for a Firestore with MongoDB
    compatibility database testdb:

        $ gcloud firestore databases ping --database=testdb

REQUIRED FLAGS
     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore databases ping --database='foo'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore databases ping

        $ gcloud beta firestore databases ping
```

### gcloud firestore databases restore

```text
NAME
    gcloud firestore databases restore - restores a Cloud Firestore database
        from a backup

SYNOPSIS
    gcloud firestore databases restore
        --destination-database=DESTINATION_DATABASE
        --source-backup=SOURCE_BACKUP [--tags=[KEY=VALUE,...]]
        [--encryption-type=ENCRYPTION_TYPE : --kms-key-name=KMS_KEY_NAME]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To restore a database from a backup.

        $ gcloud firestore databases restore \
          --source-backup=projects/PROJECT_ID/locations/LOCATION_ID/\
        backups/BACKUP_ID --destination-database=DATABASE_ID

    To restore a database from a backup with tags.

        $ gcloud firestore databases restore \
          --source-backup=projects/PROJECT_ID/locations/LOCATION_ID/\
        backups/BACKUP_ID --destination-database=DATABASE_ID \
            --tags=key1=value1,key2=value2

    To restore to a CMEK-enabled database.

        $ gcloud firestore databases restore \
          --source-backup=projects/PROJECT_ID/locations/LOCATION_ID/\
        backups/BACKUP_ID --destination-database=DATABASE_ID \
            --encryption-type=customer-managed-encryption \
            --kms-key-name=projects/PROJECT_ID/locations/LOCATION_ID/\
        keyRings/KEY_RING_ID/cryptoKeys/CRYPTO_KEY_ID

REQUIRED FLAGS
     --destination-database=DESTINATION_DATABASE
        Destination database to restore to. Destination database will be
        created in the same location as the source backup.

        This value should be 4-63 characters. Valid characters are
        /[a-z][0-9]-/ with first character a letter and the last a letter or a
        number. Must not be UUID-like /[0-9a-f]8(-[0-9a-f]4)3-[0-9a-f]12/.

        Using "(default)" database ID is also allowed.

        For example, to restore to database testdb:

            $ gcloud firestore databases restore --destination-database=testdb

     --source-backup=SOURCE_BACKUP
        The source backup to restore from.

        For example, to restore from backup
        cf9f748a-7980-4703-b1a1-d1ffff591db0 in us-east1:

            $ gcloud firestore databases restore \
                --source-backup=projects/PROJECT_ID/locations/us-east1/backups/\
            cf9f748a-7980-4703-b1a1-d1ffff591db0

OPTIONAL FLAGS
     --tags=[KEY=VALUE,...]
        Tags to attach to the destination database. Example:
        --tags=key1=value1,key2=value2

        For example, to attach tags to a database:

        $ --tags=key1=value1,key2=value2

     The encryption configuration of the new database being created from the
     backup. If not specified, the same encryption settings as the backup will
     be used.

     To create a CMEK-enabled database:

         $ gcloud firestore databases restore \
             --encryption-type=customer-managed-encryption \
             --kms-key-name=projects/PROJECT_ID/locations/LOCATION_ID/\
         keyRings/KEY_RING_ID/cryptoKeys/CRYPTO_KEY_ID

     To create a Google-default-encrypted database:

         $ gcloud firestore databases restore \
             --encryption-type=google-default-encryption

     To create a database using the same encryption settings as the backup:

         $ gcloud firestore databases restore \
             --encryption-type=use-source-encryption

     --encryption-type=ENCRYPTION_TYPE
        The encryption type of the destination database. ENCRYPTION_TYPE must
        be one of: use-source-encryption, customer-managed-encryption,
        google-default-encryption.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --kms-key-name=KMS_KEY_NAME
        The resource ID of a Cloud KMS key. If set, the database created will
        be a Customer-Managed Encryption Key (CMEK) database encrypted with
        this key. This feature is allowlist only in initial launch.

        Only a key in the same location as this database is allowed to be used
        for encryption. For Firestore's nam5 multi-region, this corresponds to
        Cloud KMS location us. For Firestore's eur3 multi-region, this
        corresponds to Cloud KMS location europe. See
        https://cloud.google.com/kms/docs/locations.

        This value should be the KMS key resource ID in the format of
        projects/{project_id}/locations/{kms_location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}.
        How to retrieve this resource ID is listed at
        https://cloud.google.com/kms/docs/getting-resource-ids#getting_the_id_for_a_key_and_version.

        This flag must only be specified when encryption-type is
        customer-managed-encryption.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore databases restore

        $ gcloud beta firestore databases restore
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud firestore databases restore \
    --source-backup=projects/PROJECT_ID/locations/LOCATION_ID/backups/BACKUP_ID \
    --destination-database=DATABASE_ID

gcloud firestore databases restore \
    --source-backup=projects/PROJECT_ID/locations/LOCATION_ID/backups/BACKUP_ID \
    --destination-database=DATABASE_ID \
    --tags=key1=value1,key2=value2

gcloud firestore databases restore \
    --source-backup=projects/PROJECT_ID/locations/LOCATION_ID/backups/BACKUP_ID \
    --destination-database=DATABASE_ID \
    --encryption-type=customer-managed-encryption \
    --kms-key-name=projects/PROJECT_ID/locations/LOCATION_ID/keyRings/KEY_RING_ID/cryptoKeys/CRYPTO_KEY_ID
```

### gcloud firestore databases update

```text
NAME
    gcloud firestore databases update - update the database configuration of a
        Cloud Firestore database

SYNOPSIS
    gcloud firestore databases update [--async]
        [--concurrency-mode=CONCURRENCY_MODE] [--database=DATABASE]
        [--delete-protection] [--enable-pitr] [--type=TYPE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the database configuration of a Cloud Firestore database.

EXAMPLES
    The following command updates the database type of a Cloud Firestore
    database.

        $ gcloud firestore databases update --type=firestore-native

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --concurrency-mode=CONCURRENCY_MODE
        The concurrency control mode to use for this database. CONCURRENCY_MODE
        must be one of: optimistic, pessimistic.

     Database resource - Cloud Firestore database to update. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --database on the command line with a fully
        specified name;
      * the default value of argument [--database] is (default) with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --database=DATABASE
        ID of the database or fully qualified identifier for the database.

        To set the database attribute:
        * provide the argument --database on the command line;
        * the default value of argument [--database] is (default).

     --delete-protection
        If set to true, the Firestore database will be updated to have database
        delete protection enabled. A database with delete protection enabled
        cannot be deleted. You can disable the delete protection via
        --no-delete-protection.

     --enable-pitr
        If set to true, the Firestore database will be updated to enable Point
        In Time Recovery. You can disable the this feature via
        --no-enable-pitr.

     --type=TYPE
        The database type. TYPE must be one of: datastore-mode,
        firestore-native.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the firestore/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/firestore

NOTES
    These variants are also available:

        $ gcloud alpha firestore databases update

        $ gcloud beta firestore databases update
```

### gcloud beta firestore databases clone

```text
NAME
    gcloud beta firestore databases clone - clone a Google Cloud Firestore
        database from another

SYNOPSIS
    gcloud beta firestore databases clone
        --destination-database=DESTINATION_DATABASE
        --snapshot-time=SNAPSHOT_TIME --source-database=SOURCE_DATABASE
        [--tags=[KEY=VALUE,...]]
        [--encryption-type=ENCRYPTION_TYPE : --kms-key-name=KMS_KEY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore databases connection-string

```text
NAME
    gcloud beta firestore databases connection-string - prints the mongo
        connection string for the given Firestore database

SYNOPSIS
    gcloud beta firestore databases connection-string --database=DATABASE
        [--auth=AUTH; default="none" | --validate=VALIDATE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore databases create

```text
NAME
    gcloud beta firestore databases create - create a Google Cloud Firestore
        database via Firestore API

SYNOPSIS
    gcloud beta firestore databases create --location=LOCATION
        [--concurrency-mode=CONCURRENCY_MODE]
        [--database=DATABASE; default="(default)"] [--delete-protection]
        [--edition=EDITION; default="standard"]
        [--enable-firestore-data-access]
        [--enable-mongodb-compatible-data-access] [--enable-pitr]
        [--enable-realtime-updates] [--kms-key-name=KMS_KEY_NAME]
        [--tags=[KEY=VALUE,...]] [--type=TYPE; default="firestore-native"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore databases delete

```text
NAME
    gcloud beta firestore databases delete - delete a Google Cloud Firestore
        database

SYNOPSIS
    gcloud beta firestore databases delete --database=DATABASE [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore databases describe

```text
NAME
    gcloud beta firestore databases describe - describes information about a
        Cloud Firestore database

SYNOPSIS
    gcloud beta firestore databases describe
        [--database=DATABASE; default="(default)"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore databases list

```text
NAME
    gcloud beta firestore databases list - lists all Firestore databases under
        the project

SYNOPSIS
    gcloud beta firestore databases list [--show-deleted] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore databases ping

```text
NAME
    gcloud beta firestore databases ping - times the connection and ping time
        for a Firestore with MongoDB compatibility database

SYNOPSIS
    gcloud beta firestore databases ping --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore databases restore

```text
NAME
    gcloud beta firestore databases restore - restores a Cloud Firestore
        database from a backup

SYNOPSIS
    gcloud beta firestore databases restore
        --destination-database=DESTINATION_DATABASE
        --source-backup=SOURCE_BACKUP [--tags=[KEY=VALUE,...]]
        [--encryption-type=ENCRYPTION_TYPE : --kms-key-name=KMS_KEY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore databases update

```text
NAME
    gcloud beta firestore databases update - update the database configuration
        of a Cloud Firestore database

SYNOPSIS
    gcloud beta firestore databases update [--async]
        [--concurrency-mode=CONCURRENCY_MODE] [--database=DATABASE]
        [--delete-protection] [--enable-pitr] [--type=TYPE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore databases clone

```text
NAME
    gcloud alpha firestore databases clone - clone a Google Cloud Firestore
        database from another

SYNOPSIS
    gcloud alpha firestore databases clone
        --destination-database=DESTINATION_DATABASE
        --snapshot-time=SNAPSHOT_TIME --source-database=SOURCE_DATABASE
        [--tags=[KEY=VALUE,...]]
        [--encryption-type=ENCRYPTION_TYPE : --kms-key-name=KMS_KEY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore databases connection-string

```text
NAME
    gcloud alpha firestore databases connection-string - prints the mongo
        connection string for the given Firestore database

SYNOPSIS
    gcloud alpha firestore databases connection-string --database=DATABASE
        [--auth=AUTH; default="none" | --validate=VALIDATE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore databases create

```text
NAME
    gcloud alpha firestore databases create - create a Google Cloud Firestore
        database via Firestore API

SYNOPSIS
    gcloud alpha firestore databases create --location=LOCATION
        [--concurrency-mode=CONCURRENCY_MODE]
        [--database=DATABASE; default="(default)"] [--delete-protection]
        [--edition=EDITION; default="standard"]
        [--enable-firestore-data-access]
        [--enable-mongodb-compatible-data-access] [--enable-pitr]
        [--enable-realtime-updates] [--kms-key-name=KMS_KEY_NAME]
        [--storage-placement=STORAGE_PLACEMENT] [--tags=[KEY=VALUE,...]]
        [--type=TYPE; default="firestore-native"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore databases delete

```text
NAME
    gcloud alpha firestore databases delete - delete a Google Cloud Firestore
        database

SYNOPSIS
    gcloud alpha firestore databases delete --database=DATABASE [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore databases describe

```text
NAME
    gcloud alpha firestore databases describe - describes information about a
        Cloud Firestore database

SYNOPSIS
    gcloud alpha firestore databases describe
        [--database=DATABASE; default="(default)"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore databases list

```text
NAME
    gcloud alpha firestore databases list - lists all Firestore databases under
        the project

SYNOPSIS
    gcloud alpha firestore databases list [--show-deleted]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore databases ping

```text
NAME
    gcloud alpha firestore databases ping - times the connection and ping time
        for a Firestore with MongoDB compatibility database

SYNOPSIS
    gcloud alpha firestore databases ping --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore databases restore

```text
NAME
    gcloud alpha firestore databases restore - restores a Cloud Firestore
        database from a backup

SYNOPSIS
    gcloud alpha firestore databases restore
        --destination-database=DESTINATION_DATABASE
        --source-backup=SOURCE_BACKUP [--tags=[KEY=VALUE,...]]
        [--encryption-type=ENCRYPTION_TYPE : --kms-key-name=KMS_KEY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore databases update

```text
NAME
    gcloud alpha firestore databases update - update the database configuration
        of a Cloud Firestore database

SYNOPSIS
    gcloud alpha firestore databases update [--async]
        [--concurrency-mode=CONCURRENCY_MODE] [--database=DATABASE]
        [--delete-protection] [--enable-pitr] [--type=TYPE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/databases (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
