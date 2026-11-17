---
source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/autonomous-databases
---

# gcloud oracle-database autonomous-databases (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud oracle-database autonomous-databases create

```text
NAME
    gcloud oracle-database autonomous-databases create - create a new
        AutonomousDatabase

SYNOPSIS
    gcloud oracle-database autonomous-databases create AUTONOMOUS_DATABASE
        [--admin-password=ADMIN_PASSWORD] [--async] [--cidr=CIDR]
        [--database=DATABASE] [--display-name=DISPLAY_NAME]
        [--labels=[LABELS,...]] [--location=LOCATION] [--network=NETWORK]
        [--odb-network=ODB_NETWORK] [--odb-subnet=ODB_SUBNET]
        [--request-id=REQUEST_ID]
        [--admin-password-secret-version=ADMIN_PASSWORD_SECRET_VERSION
          : --secret=SECRET]
        [[--properties-db-workload=PROPERTIES_DB_WORKLOAD
          --properties-license-type=PROPERTIES_LICENSE_TYPE
          : --properties-allowlisted-ips=[PROPERTIES_ALLOWLISTED_IPS,...]
          --properties-backup-retention-period-days=PROPERTIES_BACKUP_RETENTION_PERIOD_DAYS --properties-character-set=PROPERTIES_CHARACTER_SET --properties-compute-count=PROPERTIES_COMPUTE_COUNT --properties-cpu-core-count=PROPERTIES_CPU_CORE_COUNT --properties-customer-contacts=[email=EMAIL] --properties-data-storage-size-gb=PROPERTIES_DATA_STORAGE_SIZE_GB --properties-data-storage-size-tb=PROPERTIES_DATA_STORAGE_SIZE_TB --properties-db-edition=PROPERTIES_DB_EDITION --properties-db-version=PROPERTIES_DB_VERSION --properties-is-auto-scaling-enabled --properties-is-storage-auto-scaling-enabled --properties-local-adg-auto-failover-max-data-loss-limit-duration=PROPERTIES_LOCAL_ADG_AUTO_FAILOVER_MAX_DATA_LOSS_LIMIT_DURATION --properties-local-data-guard-enabled --properties-maintenance-schedule-type=PROPERTIES_MAINTENANCE_SCHEDULE_TYPE --properties-mtls-connection-required --properties-n-character-set=PROPERTIES_N_CHARACTER_SET --properties-private-endpoint-ip=PROPERTIES_PRIVATE_ENDPOINT_IP --properties-private-endpoint-label=PROPERTIES_PRIVATE_ENDPOINT_LABEL --properties-refreshable-clone --properties-secret-id=PROPERTIES_SECRET_ID --properties-vault-id=PROPERTIES_VAULT_ID --encryption-key-provider=ENCRYPTION_KEY_PROVIDER [--encryption-key-kms=ENCRYPTION_KEY_KMS : --key-ring=KEY_RING]]]
        [--source-config-auto-refresh-frequency-seconds=SOURCE_CONFIG_AUTO_REFRESH_FREQUENCY_SECONDS --source-config-auto-refresh-point-lag-seconds=SOURCE_CONFIG_AUTO_REFRESH_POINT_LAG_SECONDS --source-config-auto-refresh-start-time=SOURCE_CONFIG_AUTO_REFRESH_START_TIME --source-config-automatic-backups-replication-enabled --source-config-autonomous-database=SOURCE_CONFIG_AUTONOMOUS_DATABASE --source-config-autonomous-database-backup=SOURCE_CONFIG_AUTONOMOUS_DATABASE_BACKUP --source-config-backup-time=SOURCE_CONFIG_BACKUP_TIME --source-config-clone-type=SOURCE_CONFIG_CLONE_TYPE --source-config-refreshable-mode=SOURCE_CONFIG_REFRESHABLE_MODE --source-config-type=SOURCE_CONFIG_TYPE --source-config-use-latest-available-backup]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new AutonomousDatabase.

EXAMPLES
    To create AutonomousDatabase with id my-instance in the location us-east4
    with display-name my instance, odb-network
    projects/network-project/locations/us-east4/odbNetworks/my-odbnetwork,
    odb-subnet
    projects/network-project/locations/us-east4/odbNetworks/my-odbnetwork/odbSubnets/my-odbsubnet,
    network projects/my-project/locations/global/networks/default, location
    us-east4, database testadb, admin-password 123Abpassdord, cidr 12.2.0.0/24,
    properties-compute-count 2, properties-db-version 19c,
    properties-license-type LICENSE_INCLUDED, properties-db-workload DW. run:
    To set the network configuration use one of the following options:

    ODBNetwork based configuration(This is the recommended way):

        $ gcloud oracle-database autonomous-databases create my-instance \
            --location=us-east4 --display-name="my instance" \
            --location=us-east4 --database=testadb \
            --admin-password=123Abpassdord --properties-compute-count=2 \
            --properties-db-version=19c \
            --properties-license-type=LICENSE_INCLUDED \
            --properties-db-workload=DW \
            --odb-network=projects/network-project/locations/us-east4/\
        odbNetworks/my-odbnetwork \
            --odb-subnet=projects/network-project/locations/us-east4/\
        odbNetworks/my-odbnetwork/odbSubnets/my-odbsubnet

    Network and CIDR based configuration:

        $ gcloud oracle-database autonomous-databases create my-instance \
            --location=us-east4 --display-name="my instance" \
            --network=projects/my-project/locations/global/networks/\
        default --cidr=12.2.0.0/24 --location=us-east4 --database=testadb \
            --admin-password=123Abpassdord --properties-compute-count=2 \
            --properties-db-version=19c \
            --properties-license-type=LICENSE_INCLUDED \
            --properties-db-workload=DW

    To create an AutonomousDatabase with the Lakehouse workload type (LH) using
    an OdbNetwork configuration in the location us-east4, run:

        $ gcloud oracle-database autonomous-databases create \
            my-lh-instance --location=us-east4 \
            --display-name="my lakehouse instance" --database=lhdb \
            --admin-password=123Abpassdord --properties-compute-count=2 \
            --properties-db-version=19c \
            --properties-license-type=LICENSE_INCLUDED \
            --properties-db-workload=LH \
            --odb-network=projects/network-project/locations/us-east4/\
        odbNetworks/my-odbnetwork \
            --odb-subnet=projects/network-project/locations/us-east4/\
        odbNetworks/my-odbnetwork/odbSubnets/my-odbsubnet

POSITIONAL ARGUMENTS
     AutonomousDatabase resource - Identifier. The name of the Autonomous
     Database resource in the following format:
     projects/{project}/locations/{region}/autonomousDatabases/{autonomous_database}
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       AUTONOMOUS_DATABASE
          ID of the autonomousDatabase or fully qualified identifier for the
          autonomousDatabase.

          To set the autonomous_database attribute:
          + provide the argument autonomous_database on the command line.

FLAGS
     --admin-password=ADMIN_PASSWORD
        The password for the default ADMIN user. Note: Only one of
        admin_password_secret_version or admin_password can be populated.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --cidr=CIDR
        The subnet CIDR range for the Autonomous Database.

     --database=DATABASE
        The name of the Autonomous Database. The database name must be unique
        in the project. The name must begin with a letter and can contain a
        maximum of 30 alphanumeric characters.

     --display-name=DISPLAY_NAME
        The display name for the Autonomous Database. The name does not have to
        be unique within your project.

     --labels=[LABELS,...]
        The labels or tags associated with the Autonomous Database.

         KEY
            Keys must start with a lowercase character and contain only hyphens
            (-), underscores (_), lowercase characters, and numbers.

         VALUE
            Values must contain only hyphens (-), underscores (_), lowercase
            characters, and numbers.

        Shorthand Example:

            --labels=string=string

        JSON Example:

            --labels='{"string": "string"}'

        File Example:

            --labels=path_to_file.(yaml|json)

     --location=LOCATION
        For resources [autonomous_database, encryption-key-kms, odb-network,
        odb-subnet, source-config-autonomous-database,
        source-config-autonomous-database-backup], provides fallback value for
        resource location attribute. When the resource's full URI path is not
        provided, location will fallback to this flag value.

     Network resource - The name of the VPC network used by the Autonomous
     Database in the following format:
     projects/{project}/global/networks/{network} This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --network=NETWORK
        ID of the network or fully qualified identifier for the network.

        To set the network attribute:
        * provide the argument --network on the command line.

     --odb-network=ODB_NETWORK
        For resources [odb-network, odb-subnet], provides fallback value for
        resource odb-network attribute. When the resource's full URI path is
        not provided, odb-network will fallback to this flag value.

     OdbSubnet resource - The name of the OdbSubnet associated with the
     Autonomous Database. Format:
     projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --odb-subnet on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --odb-subnet on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     To set the odb-network attribute:
      * provide the argument --odb-subnet on the command line with a fully
        specified name;
      * provide the argument --odb-network on the command line.

     --odb-subnet=ODB_SUBNET
        ID of the odbSubnet or fully qualified identifier for the odbSubnet.

        To set the odb-subnet attribute:
        * provide the argument --odb-subnet on the command line.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     SecretVersion resource - The resource name of a secret version in Secret
     Manager which contains the database admin user's password. Format:
     projects/{project}/secrets/{secret}/versions/{version}. Note: Only one of
     admin_password_secret_version or admin_password can be populated. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --admin-password-secret-version on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --admin-password-secret-version=ADMIN_PASSWORD_SECRET_VERSION
        ID of the secretVersion or fully qualified identifier for the
        secretVersion.

        To set the secret-version attribute:
        * provide the argument --admin-password-secret-version on the command
          line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --secret=SECRET
        The secret id of the secretVersion resource.

        To set the secret attribute:
        * provide the argument --admin-password-secret-version on the command
          line with a fully specified name;
        * provide the argument --secret on the command line.

     The properties of an Autonomous Database.

     --properties-db-workload=PROPERTIES_DB_WORKLOAD
        The workload type of the Autonomous Database. PROPERTIES_DB_WORKLOAD
        must be one of:

         ajd
            Autonomous JSON Database.
         apex
            Autonomous Database with the Oracle APEX Application Development
            workload type.
         dw
            Autonomous Data Warehouse database.
         lh
            Autonomous Database with the Lakehouse workload type.
         oltp
            Autonomous Transaction Processing database.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --properties-license-type=PROPERTIES_LICENSE_TYPE
        The license type used for the Autonomous Database.
        PROPERTIES_LICENSE_TYPE must be one of:

         bring-your-own-license
            Bring your own license
         license-included
            License included part of offer

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --properties-allowlisted-ips=[PROPERTIES_ALLOWLISTED_IPS,...]
        The list of allowlisted IP addresses for the Autonomous Database.

     --properties-backup-retention-period-days=PROPERTIES_BACKUP_RETENTION_PERIOD_DAYS
        The retention period for the Autonomous Database. This field is
        specified in days, can range from 1 day to 60 days, and has a default
        value of 60 days.

     --properties-character-set=PROPERTIES_CHARACTER_SET
        The character set for the Autonomous Database. The default is AL32UTF8.

     --properties-compute-count=PROPERTIES_COMPUTE_COUNT
        The number of compute servers for the Autonomous Database.

     --properties-cpu-core-count=PROPERTIES_CPU_CORE_COUNT
        The number of CPU cores to be made available to the database.

     --properties-customer-contacts=[email=EMAIL]
        The list of customer contacts.

         email
            The email address used by Oracle to send notifications regarding
            databases and infrastructure.

        Shorthand Example:

            --properties-customer-contacts=email=string --properties-customer-contacts=email=string

        JSON Example:

            --properties-customer-contacts='[{"email": "string"}]'

        File Example:

            --properties-customer-contacts=path_to_file.(yaml|json)

     --properties-data-storage-size-gb=PROPERTIES_DATA_STORAGE_SIZE_GB
        The size of the data stored in the database, in gigabytes.

     --properties-data-storage-size-tb=PROPERTIES_DATA_STORAGE_SIZE_TB
        The size of the data stored in the database, in terabytes.

     --properties-db-edition=PROPERTIES_DB_EDITION
        The edition of the Autonomous Databases. PROPERTIES_DB_EDITION must be
        one of:

         enterprise-edition
            Enterprise Database Edition
         standard-edition
            Standard Database Edition

     --properties-db-version=PROPERTIES_DB_VERSION
        The Oracle Database version for the Autonomous Database.

     --properties-is-auto-scaling-enabled
        This field indicates if auto scaling is enabled for the Autonomous
        Database CPU core count.

     --properties-is-storage-auto-scaling-enabled
        This field indicates if auto scaling is enabled for the Autonomous
        Database storage.

     Arguments for the local adg auto failover max data loss limit duration.

     --properties-local-adg-auto-failover-max-data-loss-limit-duration=PROPERTIES_LOCAL_ADG_AUTO_FAILOVER_MAX_DATA_LOSS_LIMIT_DURATION
        This field indicates the maximum data loss limit for an Autonomous
        Database, in seconds.

     Arguments for the local data guard enabled.

     --properties-local-data-guard-enabled
        Indicates whether the Autonomous Database has a local (in-region)
        standby database. Not applicable to cross-region Data Guard or
        dedicated Exadata infrastructure.

     --properties-maintenance-schedule-type=PROPERTIES_MAINTENANCE_SCHEDULE_TYPE
        The maintenance schedule of the Autonomous Database.
        PROPERTIES_MAINTENANCE_SCHEDULE_TYPE must be one of:

         early
            An EARLY maintenance schedule patches the database before the
            regular scheduled maintenance.
         regular
            A REGULAR maintenance schedule follows the normal maintenance
            cycle.

     --properties-mtls-connection-required
        This field specifies if the Autonomous Database requires mTLS
        connections.

     --properties-n-character-set=PROPERTIES_N_CHARACTER_SET
        The national character set for the Autonomous Database. The default is
        AL16UTF16.

     --properties-private-endpoint-ip=PROPERTIES_PRIVATE_ENDPOINT_IP
        The private endpoint IP address for the Autonomous Database.

     --properties-private-endpoint-label=PROPERTIES_PRIVATE_ENDPOINT_LABEL
        The private endpoint label for the Autonomous Database.

     Arguments for the refreshable clone.

     --properties-refreshable-clone
        Indicates if the Autonomous Database is a refreshable clone. This field
        is used in update flow to connect / disconnect a refreshable clone from
        its source database.

     --properties-secret-id=PROPERTIES_SECRET_ID
        The ID of the Oracle Cloud Infrastructure vault secret.

     --properties-vault-id=PROPERTIES_VAULT_ID
        The ID of the Oracle Cloud Infrastructure vault.

     The encryption key used to encrypt the Autonomous Database.

     --encryption-key-provider=ENCRYPTION_KEY_PROVIDER
        The provider of the encryption key. ENCRYPTION_KEY_PROVIDER must be one
        of:

         google-managed
            Google Managed KMS key, if selected, please provide the KMS key
            name.
         oracle-managed
            Oracle Managed.

     CryptoKey resource - The KMS key used to encrypt the Autonomous Database.
     This field is required if the provider is GOOGLE_MANAGED. The name of the
     KMS key resource in the following format:
     projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --encryption-key-kms on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --encryption-key-kms on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     --encryption-key-kms=ENCRYPTION_KEY_KMS
        ID of the cryptoKey or fully qualified identifier for the cryptoKey.

        To set the crypto-key attribute:
        * provide the argument --encryption-key-kms on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --key-ring=KEY_RING
        The keyRing id of the cryptoKey resource.

        To set the key-ring attribute:
        * provide the argument --encryption-key-kms on the command line with
          a fully specified name;
        * provide the argument --key-ring on the command line.

     The source configuration for the standby Autonomous Database.

     --source-config-auto-refresh-frequency-seconds=SOURCE_CONFIG_AUTO_REFRESH_FREQUENCY_SECONDS
        The frequency in seconds a refreshable clone is refreshed after
        auto-refresh is enabled.

     Arguments for the auto refresh point lag seconds.

     --source-config-auto-refresh-point-lag-seconds=SOURCE_CONFIG_AUTO_REFRESH_POINT_LAG_SECONDS
        The time, in seconds, the data of the automatic refreshable clone lags
        the primary database at the point of refresh.

     --source-config-auto-refresh-start-time=SOURCE_CONFIG_AUTO_REFRESH_START_TIME
        The date and time that auto-refreshing will begin for an Autonomous
        Database refreshable clone. This value controls only the start time for
        the first refresh operation.

     --source-config-automatic-backups-replication-enabled
        This field specifies if the replication of automatic backups is enabled
        when creating a Data Guard.

     AutonomousDatabase resource - The name of the primary Autonomous Database
     that is used to create a Peer Autonomous Database from a source. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --source-config-autonomous-database on the
        command line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --source-config-autonomous-database on the
        command line with a fully specified name;
      * provide the argument --location on the command line.

     --source-config-autonomous-database=SOURCE_CONFIG_AUTONOMOUS_DATABASE
        ID of the autonomousDatabase or fully qualified identifier for the
        autonomousDatabase.

        To set the autonomous-database attribute:
        * provide the argument --source-config-autonomous-database on the
          command line.

     AutonomousDatabaseBackup resource - The name of the Autonomous Database
     Backup resource with the format:
     projects/{project}/locations/{region}/autonomousDatabaseBackups/{autonomous_database_backup}
     Required when source_type is BACKUP_FROM_ID. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --source-config-autonomous-database-backup on
        the command line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --source-config-autonomous-database-backup on
        the command line with a fully specified name;
      * provide the argument --location on the command line.

     --source-config-autonomous-database-backup=SOURCE_CONFIG_AUTONOMOUS_DATABASE_BACKUP
        ID of the autonomousDatabaseBackup or fully qualified identifier for
        the autonomousDatabaseBackup.

        To set the autonomous-database-backup attribute:
        * provide the argument --source-config-autonomous-database-backup on
          the command line.

     --source-config-backup-time=SOURCE_CONFIG_BACKUP_TIME
        The timestamp specified for the point-in-time clone of the source
        Autonomous Database. This field is only applicable in case of
        BACKUP_FROM_TIMESTAMP source type and when use_latest_available_backup
        is false.

     --source-config-clone-type=SOURCE_CONFIG_CLONE_TYPE
        The clone type of the Autonomous Database. This field is only
        applicable in case of cloning. SOURCE_CONFIG_CLONE_TYPE must be one of:

         full
            Creates a new database with the source database's data and
            metadata.
         metadata
            Creates a new database that includes all the source database schema
            metadata, but none of the source database data.

     --source-config-refreshable-mode=SOURCE_CONFIG_REFRESHABLE_MODE
        The refresh mode of the clone. SOURCE_CONFIG_REFRESHABLE_MODE must be
        one of:

         automatic
            Automatic refresh.
         manual
            Manual refresh.

     --source-config-type=SOURCE_CONFIG_TYPE
        The source type of the Autonomous Database. SOURCE_CONFIG_TYPE must be
        one of:

         backup-from-id
            Create clone from the backup resource.
         backup-from-timestamp
            Create clone from backup specified by backup_time field, or use
            latest available backup if use_latest_available_backup is true. The
            autonomous_database field must specify the source database to clone
            from.
         clone-database
            Clone database from an existing database specified in
            autonomous_database field.
         clone-to-refreshable
            Create a refreshable clone from an existing database specified in
            autonomous_database field.
         cross-region-disaster-recovery
            Create a cross-region disaster recovery peer adb from an existing
            adb.

     --source-config-use-latest-available-backup
        Clone from latest available backup timestamp. This field is only
        applicable in case of BACKUP_FROM_TIMESTAMP source type.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud oracle-database autonomous-databases create my-instance \
    --location=us-east4 \
    --display-name="my instance" \
    --location=us-east4 \
    --database=testadb \
    --admin-password=123Abpassdord \
    --properties-compute-count=2 \
    --properties-db-version=19c \
    --properties-license-type=license-included \
    --properties-db-workload=dw \
    --odb-network=projects/network-project/locations/us-east4/odbNetworks/my-odbnetwork \
    --odb-subnet=projects/network-project/locations/us-east4/odbNetworks/my-odbnetwork/odbSubnets/my-odbsubnet

gcloud oracle-database autonomous-databases create my-instance \
    --location=us-east4 \
    --display-name="my instance" \
    --network=projects/my-project/global/networks/default \
    --cidr=12.2.0.0/24 \
    --location=us-east4 \
    --database=testadb \
    --admin-password=123Abpassdord \
    --properties-compute-count=2 \
    --properties-db-version=19c \
    --properties-license-type=license-included \
    --properties-db-workload=dw

gcloud oracle-database autonomous-databases create my-lh-instance \
    --location=us-east4 \
    --display-name="my lakehouse instance" \
    --database=lhdb \
    --admin-password=123Abpassdord \
    --properties-compute-count=2 \
    --properties-db-version=19c \
    --properties-license-type=license-included \
    --properties-db-workload=lh \
    --odb-network=projects/network-project/locations/us-east4/odbNetworks/my-odbnetwork \
    --odb-subnet=projects/network-project/locations/us-east4/odbNetworks/my-odbnetwork/odbSubnets/my-odbsubnet
```

### gcloud oracle-database autonomous-databases delete

```text
NAME
    gcloud oracle-database autonomous-databases delete - delete an
        AutonomousDatabase

SYNOPSIS
    gcloud oracle-database autonomous-databases delete
        (AUTONOMOUS_DATABASE : --location=LOCATION) [--async]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an AutonomousDatabase.

EXAMPLES
    To delete an AutonomousDatabase with id my-instance in the location
    us-east4, run:

        $ gcloud oracle-database autonomous-databases delete my-instance \
            --location=us-east4

POSITIONAL ARGUMENTS
     AutonomousDatabase resource - The name of the resource in the following
     format:
     projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTONOMOUS_DATABASE
          ID of the autonomousDatabase or fully qualified identifier for the
          autonomousDatabase.

          To set the autonomous_database attribute:
          + provide the argument autonomous_database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the autonomousDatabase resource.

          To set the location attribute:
          + provide the argument autonomous_database on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database autonomous-databases describe

```text
NAME
    gcloud oracle-database autonomous-databases describe - get details of an
        AutonomousDatabase

SYNOPSIS
    gcloud oracle-database autonomous-databases describe
        (AUTONOMOUS_DATABASE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details of an AutonomousDatabase.

EXAMPLES
    To get an AutonomousDatabase with id my-instance in the location us-east4,
    run:

        $ gcloud oracle-database autonomous-databases describe my-instance \
            --location=us-east4

POSITIONAL ARGUMENTS
     AutonomousDatabase resource - The name of the Autonomous Database in the
     following format:
     projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTONOMOUS_DATABASE
          ID of the autonomousDatabase or fully qualified identifier for the
          autonomousDatabase.

          To set the autonomous_database attribute:
          + provide the argument autonomous_database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the autonomousDatabase resource.

          To set the location attribute:
          + provide the argument autonomous_database on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database autonomous-databases failover

```text
NAME
    gcloud oracle-database autonomous-databases failover - failovers a standby
        AutonomousDatabase to a new primary

SYNOPSIS
    gcloud oracle-database autonomous-databases failover AUTONOMOUS_DATABASE
        [--async] [--location=LOCATION]
        [--peer-autonomous-database=PEER_AUTONOMOUS_DATABASE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Failovers an AutonomousDatabase from a standby database to a new primary.

EXAMPLES
    To failover an AutonomousDatabase with id my-instance in the location
    us-east4 with primary database name as
    'projects/project-id/locations/us-west3/autonomousDatabases/my-peer-instance'
    run:

        $ gcloud oracle-database autonomous-databases failover my-instance \
            --location=us-east4 \
            --peer-autonomous-database=projects/project-id/locations/\
        us-west3/autonomousDatabases/my-peer-instance

POSITIONAL ARGUMENTS
     AutonomousDatabase resource - The name of the Autonomous Database in the
     following format:
     projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       AUTONOMOUS_DATABASE
          ID of the autonomousDatabase or fully qualified identifier for the
          autonomousDatabase.

          To set the autonomous_database attribute:
          + provide the argument autonomous_database on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --location=LOCATION
        For resources [autonomous_database, peer-autonomous-database], provides
        fallback value for resource location attribute. When the resource's
        full URI path is not provided, location will fallback to this flag
        value.

     AutonomousDatabase resource - The peer database name to fail over to.
     Required for cross-region standby, and must be omitted for in-region Data
     Guard. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --peer-autonomous-database on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --peer-autonomous-database on the command line
        with a fully specified name;
      * provide the argument --location on the command line.

     --peer-autonomous-database=PEER_AUTONOMOUS_DATABASE
        ID of the autonomousDatabase or fully qualified identifier for the
        autonomousDatabase.

        To set the autonomous-database attribute:
        * provide the argument --peer-autonomous-database on the command
          line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud oracle-database autonomous-databases failover my-instance \
    --location=us-east4 \
    --peer-autonomous-database=projects/project-id/locations/us-west3/autonomousDatabases/my-peer-instance
```

### gcloud oracle-database autonomous-databases generate-wallet

```text
NAME
    gcloud oracle-database autonomous-databases generate-wallet - generate
        wallet for an AutonomousDatabase

SYNOPSIS
    gcloud oracle-database autonomous-databases generate-wallet
        (AUTONOMOUS_DATABASE : --location=LOCATION) --password=PASSWORD
        [--is-regional] [--type=TYPE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Generate wallet for an AutonomousDatabase, Content is base64 encoded zip
    archive.

EXAMPLES
    To generate wallet for an AutonomousDatabase with id my-instance with
    password 123Abpassword, to encrypt the keys inside the wallet in the
    location us-east4, run:

        $ gcloud oracle-database autonomous-databases generate-wallet \
            my-instance --location=us-east4 --password=123Abpassword

POSITIONAL ARGUMENTS
     AutonomousDatabase resource - The name of the Autonomous Database in the
     following format:
     projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTONOMOUS_DATABASE
          ID of the autonomousDatabase or fully qualified identifier for the
          autonomousDatabase.

          To set the autonomous_database attribute:
          + provide the argument autonomous_database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the autonomousDatabase resource.

          To set the location attribute:
          + provide the argument autonomous_database on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --password=PASSWORD
        The password used to encrypt the keys inside the wallet. The password
        must be a minimum of 8 characters.

OPTIONAL FLAGS
     --is-regional
        True when requesting regional connection strings in PDB connect info,
        applicable to cross-region Data Guard only.

     --type=TYPE
        The type of wallet generation for the Autonomous Database. The default
        value is SINGLE. TYPE must be one of:

         all
            Used to generate wallet for all databases in the region.
         single
            Used to generate wallet for a single database.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database autonomous-databases get-refreshable-clones

```text
NAME
    gcloud oracle-database autonomous-databases get-refreshable-clones - get
        refreshable clones for an AutonomousDatabase

SYNOPSIS
    gcloud oracle-database autonomous-databases get-refreshable-clones
        (AUTONOMOUS_DATABASE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get refreshable clones for an AutonomousDatabase.

EXAMPLES
    To get all refreshable clones for an AutonomousDatabase with id
    my-instance, run:        $ gcloud oracle-database autonomous-databases \
            get-refreshable-clones my-instance --location=us-east4

POSITIONAL ARGUMENTS
     AutonomousDatabase resource - The Autonomous Database resource whose
     refreshable clones are to be listed. Format:
     projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTONOMOUS_DATABASE
          ID of the autonomousDatabase or fully qualified identifier for the
          autonomousDatabase.

          To set the autonomous_database attribute:
          + provide the argument autonomous_database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the autonomousDatabase resource.

          To set the location attribute:
          + provide the argument autonomous_database on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database autonomous-databases list

```text
NAME
    gcloud oracle-database autonomous-databases list - list all
        AutonomousDatabases

SYNOPSIS
    gcloud oracle-database autonomous-databases list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all AutonomousDatabases.

EXAMPLES
    To list all AutonomousDatabases in the location us-east4, run:

        $ gcloud oracle-database autonomous-databases list \
            --location=us-east4

REQUIRED FLAGS
     Location resource - The parent value for the Autonomous Database in the
     following format: projects/{project}/locations/{location}. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database autonomous-databases refresh

```text
NAME
    gcloud oracle-database autonomous-databases refresh - refresh an
        AutonomousDatabase clone

SYNOPSIS
    gcloud oracle-database autonomous-databases refresh
        (AUTONOMOUS_DATABASE : --location=LOCATION)
        --refresh-cutoff-time=REFRESH_CUTOFF_TIME [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Refresh an AutonomousDatabase clone to data from a specified point-in-time.

EXAMPLES
    To refresh an AutonomousDatabase clone with id my-instance in location
    us-east4 to data from point-in-time 2026-01-24T12:00:00Z, run:

        $ gcloud oracle-database autonomous-databases refresh my-instance \
            --location=us-east4 --refresh-cutoff-time=2026-01-24T12:00:00Z

POSITIONAL ARGUMENTS
     AutonomousDatabase resource - The name of the AutonomousDatabase resource.
     Format:
     projects/{project}/location/{location}/autonomousDatabases/{autonomous_database}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTONOMOUS_DATABASE
          ID of the autonomousDatabase or fully qualified identifier for the
          autonomousDatabase.

          To set the autonomous_database attribute:
          + provide the argument autonomous_database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the autonomousDatabase resource.

          To set the location attribute:
          + provide the argument autonomous_database on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --refresh-cutoff-time=REFRESH_CUTOFF_TIME
        The timestamp to which the Autonomous Database refreshable clone will
        be refreshed. Changes made in the primary database after this timestamp
        are not part of the data refresh.

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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database autonomous-databases restart

```text
NAME
    gcloud oracle-database autonomous-databases restart - restarts an
        AutonomousDatabase

SYNOPSIS
    gcloud oracle-database autonomous-databases restart
        (AUTONOMOUS_DATABASE : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Restarts an AutonomousDatabase which is in Running state.

EXAMPLES
    To restart an AutonomousDatabase with id my-instance in the location
    us-east4, run:

        $ gcloud oracle-database autonomous-databases restart my-instance \
            --location=us-east4

POSITIONAL ARGUMENTS
     AutonomousDatabase resource - The name of the Autonomous Database in the
     following format:
     projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTONOMOUS_DATABASE
          ID of the autonomousDatabase or fully qualified identifier for the
          autonomousDatabase.

          To set the autonomous_database attribute:
          + provide the argument autonomous_database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the autonomousDatabase resource.

          To set the location attribute:
          + provide the argument autonomous_database on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

FLAGS
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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database autonomous-databases restore

```text
NAME
    gcloud oracle-database autonomous-databases restore - restore an
        AutonomousDatabase

SYNOPSIS
    gcloud oracle-database autonomous-databases restore
        (AUTONOMOUS_DATABASE : --location=LOCATION) --restore-time=RESTORE_TIME
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Restore an AutonomousDatabase to the state at specified restore-time.

EXAMPLES
    To restore an AutonomousDatabase with id my-instance at restore-time
    2024-05-01T00:00:00.000Z in the location us-east4 , The restore-time is the
    'endTime' property of a backup. run:

        $ gcloud oracle-database autonomous-databases restore my-instance \
            --location=us-east4 --restore-time=2024-05-01T00:00:00.000Z

POSITIONAL ARGUMENTS
     AutonomousDatabase resource - The name of the Autonomous Database in the
     following format:
     projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTONOMOUS_DATABASE
          ID of the autonomousDatabase or fully qualified identifier for the
          autonomousDatabase.

          To set the autonomous_database attribute:
          + provide the argument autonomous_database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the autonomousDatabase resource.

          To set the location attribute:
          + provide the argument autonomous_database on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --restore-time=RESTORE_TIME
        The time and date to restore the database to.

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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database autonomous-databases start

```text
NAME
    gcloud oracle-database autonomous-databases start - starts an
        AutonomousDatabase

SYNOPSIS
    gcloud oracle-database autonomous-databases start
        (AUTONOMOUS_DATABASE : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Starts an AutonomousDatabase which is in Stopped state.

EXAMPLES
    To start an AutonomousDatabase with id my-instance in the location
    us-east4, run:

        $ gcloud oracle-database autonomous-databases start my-instance \
            --location=us-east4

POSITIONAL ARGUMENTS
     AutonomousDatabase resource - The name of the Autonomous Database in the
     following format:
     projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTONOMOUS_DATABASE
          ID of the autonomousDatabase or fully qualified identifier for the
          autonomousDatabase.

          To set the autonomous_database attribute:
          + provide the argument autonomous_database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the autonomousDatabase resource.

          To set the location attribute:
          + provide the argument autonomous_database on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

FLAGS
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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database autonomous-databases stop

```text
NAME
    gcloud oracle-database autonomous-databases stop - stops an
        AutonomousDatabase

SYNOPSIS
    gcloud oracle-database autonomous-databases stop
        (AUTONOMOUS_DATABASE : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Stops an AutonomousDatabase which is in Running state.

EXAMPLES
    To stop an AutonomousDatabase with id my-instance in the location us-east4,
    run:

        $ gcloud oracle-database autonomous-databases stop my-instance \
            --location=us-east4

POSITIONAL ARGUMENTS
     AutonomousDatabase resource - The name of the Autonomous Database in the
     following format:
     projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTONOMOUS_DATABASE
          ID of the autonomousDatabase or fully qualified identifier for the
          autonomousDatabase.

          To set the autonomous_database attribute:
          + provide the argument autonomous_database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the autonomousDatabase resource.

          To set the location attribute:
          + provide the argument autonomous_database on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

FLAGS
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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example gives the VPC network as `projects/my-project/locations/global/networks/default`, but the `--network` resource format in the same help is `projects/{project}/global/networks/{network}`; the runnable form uses `projects/my-project/global/networks/default`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example passes the API enum name in uppercase (for example `LICENSE_INCLUDED`, `DW`, `GOOGLE_MANAGED`, `SMART_STORAGE`), while the flag description lists the choices in lowercase (`license-included`, `dw`, `google-managed`, `smart-storage`); the runnable form uses the documented lowercase choices (gcloud 593.0.0 also accepts the uppercase names).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/autonomous-databases (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
