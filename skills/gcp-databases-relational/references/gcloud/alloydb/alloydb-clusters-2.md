---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/clusters
---

# gcloud alloydb clusters (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alloydb clusters restore

```text
NAME
    gcloud alloydb clusters restore - restore an AlloyDB cluster from a given
        backup or a source cluster and a timestamp

SYNOPSIS
    gcloud alloydb clusters restore CLUSTER --region=REGION
        (--backup=BACKUP | --backupdr-backup=BACKUPDR_BACKUP
          | --point-in-time=POINT_IN_TIME
          (--backupdr-data-source=BACKUPDR_DATA_SOURCE
          | --source-cluster=SOURCE_CLUSTER))
        [--allocated-ip-range-name=ALLOCATED_IP_RANGE_NAME] [--async]
        [--[no-]enable-dataplex-integration] [--enable-private-service-connect]
        [--network=NETWORK] [--tags=[KEY=VALUE,...]]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Restore an AlloyDB cluster from a given backup or a source cluster and a
    timestamp.

EXAMPLES
    To restore a cluster from a backup, run:

        $ gcloud alloydb clusters restore my-cluster --region=us-central1 \
          --backup=my-backup

    To restore a cluster from a source cluster and a timestamp, run:

        $ gcloud alloydb clusters restore my-cluster --region=us-central1 \
          --source-cluster=old-cluster \
          --point-in-time=2012-11-15T16:19:00.094Z

POSITIONAL ARGUMENTS
     CLUSTER
        AlloyDB cluster ID

REQUIRED FLAGS
     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

     RestoreCluster source types.

     Exactly one of these must be specified:

       --backup=BACKUP
          AlloyDB backup to restore from. This must either be the full backup
          name (projects/myProject/locations/us-central1/backups/myBackup) or
          the backup ID (myBackup). In the second case, the project and
          location are assumed to be the same as the restored cluster that is
          being created.

       --backupdr-backup=BACKUPDR_BACKUP
          Backup DR backup to restore from. This is a resource path of the form
          projects/myProject/locations/us-central1/backupVaults/myBackupVault/dataSources/myDataSource/backups/myBackup.

       Or at least one of these can be specified:

         Restore a cluster from a source cluster at a given point in time.

         --point-in-time=POINT_IN_TIME
            Point in time to restore to, in RFC 3339 format. For example,
            2012-11-15T16:19:00.094Z.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         Source for a point in time restore operation.

         Exactly one of these must be specified:

           --backupdr-data-source=BACKUPDR_DATA_SOURCE
              Backup DR data source to restore from. This is a resource path of
              the form
              projects/myProject/locations/us-central1/backupVaults/myBackupVault/dataSources/myDataSource.

           --source-cluster=SOURCE_CLUSTER
              AlloyDB source cluster to restore from. This must either be the
              full cluster name
              (projects/myProject/locations/us-central1/backups/myCluster) or
              the cluster ID (myCluster). In the second case, the project and
              location are assumed to be the same as the restored cluster that
              is being created.

OPTIONAL FLAGS
     --allocated-ip-range-name=ALLOCATED_IP_RANGE_NAME
        Name of the allocated IP range for the private IP AlloyDB cluster, for
        example: "google-managed-services-default". If set, the instance IPs
        for this cluster will be created in the allocated range. The range name
        must comply with RFC 1035. Specifically, the name must be 1-63
        characters long and match the regular expression
        [a-z]([-a-z0-9]*[a-z0-9])?.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --[no-]enable-dataplex-integration
        Enable or disable Dataplex integration for this cluster (Enabled by
        default). Use --enable-dataplex-integration to enable and
        --no-enable-dataplex-integration to disable.

     --enable-private-service-connect
        Enable Private Service Connect (PSC) connectivity for the cluster.

     --network=NETWORK
        Network in the current project that the instance will be part of. To
        specify using a network with a shared VPC, use the full URL of the
        network. For an example host project, testproject, and shared network,
        testsharednetwork, this would be of the
        form:--network=projects/testproject/global/networks/testsharednetwork

     --tags=[KEY=VALUE,...]
        List of tags KEY=VALUE pairs to bind. Each item must be expressed as
        <tag-key-namespaced-name>=<tag-value-short-name>.

        Example: 123/environment=production,123/costCenter=marketing

     Key resource - The Cloud KMS (Key Management Service) cryptokey that will
     be used to protect the cluster. The 'AlloyDB Service Agent' service
     account must hold permission 'Cloud KMS CryptoKey Encrypter/Decrypter'.
     The arguments in this group can be used to specify the attributes of this
     resource.

     --kms-key=KMS_KEY
        ID of the key or fully qualified identifier for the key.

        To set the kms-key attribute:
        * provide the argument --kms-key on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --kms-keyring=KMS_KEYRING
        The KMS keyring of the key.

        To set the kms-keyring attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-keyring on the command line.

     --kms-location=KMS_LOCATION
        The Google Cloud location for the key.

        To set the kms-location attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-location on the command line.

     --kms-project=KMS_PROJECT
        The Google Cloud project for the key.

        To set the kms-project attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-project on the command line;
        * set the property core/project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb clusters restore

        $ gcloud beta alloydb clusters restore
```

### gcloud alloydb clusters switchover

```text
NAME
    gcloud alloydb clusters switchover - switchover an AlloyDB SECONDARY
        cluster in a given project and region

SYNOPSIS
    gcloud alloydb clusters switchover CLUSTER --region=REGION [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Switchover an AlloyDB SECONDARY cluster in a given project and region.

EXAMPLES
    To switchover a cluster, run:

        $ gcloud alloydb clusters switchover my-cluster --region=us-central1

POSITIONAL ARGUMENTS
     CLUSTER
        AlloyDB cluster ID

REQUIRED FLAGS
     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

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

        $ gcloud alpha alloydb clusters switchover

        $ gcloud beta alloydb clusters switchover
```

### gcloud alloydb clusters update

```text
NAME
    gcloud alloydb clusters update - update an AlloyDB cluster within a given
        project and region

SYNOPSIS
    gcloud alloydb clusters update CLUSTER --region=REGION [--async]
        [--[no-]enable-dataplex-integration]
        [--maintenance-version=MAINTENANCE_VERSION]
        [--subscription-type=SUBSCRIPTION_TYPE]
        [--clear-automated-backup | --disable-automated-backup
          | --automated-backup-days-of-week=[DAYS_OF_WEEK,...]
          --automated-backup-start-times=[START_TIMES,...]
          --automated-backup-window=TIMEOUT_PERIOD
          [--automated-backup-encryption-key=AUTOMATED_BACKUP_ENCRYPTION_KEY
          : --automated-backup-encryption-key-keyring=AUTOMATED_BACKUP_ENCRYPTION_KEY_KEYRING --automated-backup-encryption-key-location=AUTOMATED_BACKUP_ENCRYPTION_KEY_LOCATION --automated-backup-encryption-key-project=AUTOMATED_BACKUP_ENCRYPTION_KEY_PROJECT] --automated-backup-retention-count=RETENTION_COUNT | --automated-backup-retention-period=RETENTION_PERIOD]
        [--continuous-backup-recovery-window-days=RECOVERY_PERIOD
          --enable-continuous-backup --clear-continuous-backup-encryption-key
          | [--continuous-backup-encryption-key=CONTINUOUS_BACKUP_ENCRYPTION_KEY : --continuous-backup-encryption-key-keyring=CONTINUOUS_BACKUP_ENCRYPTION_KEY_KEYRING --continuous-backup-encryption-key-location=CONTINUOUS_BACKUP_ENCRYPTION_KEY_LOCATION --continuous-backup-encryption-key-project=CONTINUOUS_BACKUP_ENCRYPTION_KEY_PROJECT]]
        [--maintenance-window-any
          | --maintenance-window-day=MAINTENANCE_WINDOW_DAY
          --maintenance-window-hour=MAINTENANCE_WINDOW_HOUR]
        [--remove-deny-maintenance-period
          | --deny-maintenance-period-end-date=DENY_MAINTENANCE_PERIOD_END_DATE
          --deny-maintenance-period-start-date=DENY_MAINTENANCE_PERIOD_START_DATE --deny-maintenance-period-time=DENY_MAINTENANCE_PERIOD_TIME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an AlloyDB cluster within a given project and region.

EXAMPLES
    To update a cluster, run:

        $ gcloud alloydb clusters update my-cluster --region=us-central1 \
            --automated-backup-start-times=12:00 \
            --automated-backup-days-of-week=MONDAY \
            --automated-backup-retention-count=10

POSITIONAL ARGUMENTS
     CLUSTER
        AlloyDB cluster ID

REQUIRED FLAGS
     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --[no-]enable-dataplex-integration
        Enable or disable Dataplex integration for this cluster (Enabled by
        default). Use --enable-dataplex-integration to enable and
        --no-enable-dataplex-integration to disable.

     --maintenance-version=MAINTENANCE_VERSION
        Maintenance version to update the cluster to. Use latest to apply the
        latest available maintenance version.

     --subscription-type=SUBSCRIPTION_TYPE
        Subscription type of the cluster. SUBSCRIPTION_TYPE must be one of:
        STANDARD, TRIAL.

     Automated backup policy.

     At most one of these can be specified:

       --clear-automated-backup
          Clears the automated backup policy on the cluster. The default
          automated backup policy will be used.

       --disable-automated-backup
          Disables automated backups on the cluster.

       Or at least one of these can be specified:

         Enable automated backup policy.

         --automated-backup-days-of-week=[DAYS_OF_WEEK,...]
            Comma-separated list of days of the week to perform a backup. At
            least one day of the week must be provided. (e.g.,
            --automated-backup-days-of-week=MONDAY,WEDNESDAY,SUNDAY).
            DAYS_OF_WEEK must be one of: MONDAY, TUESDAY, WEDNESDAY, THURSDAY,
            FRIDAY, SATURDAY, SUNDAY.

         --automated-backup-start-times=[START_TIMES,...]
            Comma-separated list of times during the day to start a backup. At
            least one start time must be provided. The start times are assumed
            to be in UTC and required to be an exact hour in the format HH:00.
            (e.g., --automated-backup-start-times=01:00,13:00)

         --automated-backup-window=TIMEOUT_PERIOD
            Length of the time window beginning at start time during which a
            backup can be taken. If a backup does not succeed within this time
            window, it will be canceled and considered failed. The backup
            window must be at least 5 minutes long. There is no upper bound on
            the window. If not set, it will default to 1 hour.

         Key resource - The Cloud KMS (Key Management Service) cryptokey that
         will be used to protect the automated backups. The 'AlloyDB Service
         Agent' service account must hold permission 'Cloud KMS CryptoKey
         Encrypter/Decrypter'. The arguments in this group can be used to
         specify the attributes of this resource.

         --automated-backup-encryption-key=AUTOMATED_BACKUP_ENCRYPTION_KEY
            ID of the key or fully qualified identifier for the key.

            To set the kms-key attribute:
            - provide the argument --automated-backup-encryption-key on the
              command line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --automated-backup-encryption-key-keyring=AUTOMATED_BACKUP_ENCRYPTION_KEY_KEYRING
            The KMS keyring of the key.

            To set the kms-keyring attribute:
            - provide the argument --automated-backup-encryption-key on the
              command line with a fully specified name;
            - provide the argument --automated-backup-encryption-key-keyring
              on the command line.

         --automated-backup-encryption-key-location=AUTOMATED_BACKUP_ENCRYPTION_KEY_LOCATION
            The Google Cloud location for the key.

            To set the kms-location attribute:
            - provide the argument --automated-backup-encryption-key on the
              command line with a fully specified name;
            - provide the argument --automated-backup-encryption-key-location
              on the command line.

         --automated-backup-encryption-key-project=AUTOMATED_BACKUP_ENCRYPTION_KEY_PROJECT
            The Google Cloud project for the key.

            To set the kms-project attribute:
            - provide the argument --automated-backup-encryption-key on the
              command line with a fully specified name;
            - provide the argument --automated-backup-encryption-key-project
              on the command line;
            - set the property core/project.

         Retention policy. If no retention policy is provided, all automated
         backups will be retained.

         At most one of these can be specified:

           --automated-backup-retention-count=RETENTION_COUNT
              Number of most recent successful backups retained.

           --automated-backup-retention-period=RETENTION_PERIOD
              Retention period of the backup relative to creation time. See $
              gcloud topic datetimes for information on duration formats.

     Continuous Backup configuration.

     --continuous-backup-recovery-window-days=RECOVERY_PERIOD
        Recovery window of the log files and backups saved to support
        Continuous Backups.

     --enable-continuous-backup
        Enables Continuous Backups on the cluster.

     Encryption configuration for Continuous Backups.

     At most one of these can be specified:

       --clear-continuous-backup-encryption-key
          Clears the encryption configuration for Continuous Backups. Google
          default encryption will be used for future Continuous Backups.

       Or at least one of these can be specified:

         Key resource - The Cloud KMS (Key Management Service) cryptokey that
         will be used to protect the continuous backup. The 'AlloyDB Service
         Agent's service account must hold permission 'Cloud KMS CryptoKey
         Encrypter/Decrypter'. The arguments in this group can be used to
         specify the attributes of this resource.

         --continuous-backup-encryption-key=CONTINUOUS_BACKUP_ENCRYPTION_KEY
            ID of the key or fully qualified identifier for the key.

            To set the kms-key attribute:
            - provide the argument --continuous-backup-encryption-key on the
              command line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --continuous-backup-encryption-key-keyring=CONTINUOUS_BACKUP_ENCRYPTION_KEY_KEYRING
            The KMS keyring of the key.

            To set the kms-keyring attribute:
            - provide the argument --continuous-backup-encryption-key on the
              command line with a fully specified name;
            - provide the argument --continuous-backup-encryption-key-keyring
              on the command line.

         --continuous-backup-encryption-key-location=CONTINUOUS_BACKUP_ENCRYPTION_KEY_LOCATION
            The Google Cloud location for the key.

            To set the kms-location attribute:
            - provide the argument --continuous-backup-encryption-key on the
              command line with a fully specified name;
            - provide the argument
              --continuous-backup-encryption-key-location on the command line.

         --continuous-backup-encryption-key-project=CONTINUOUS_BACKUP_ENCRYPTION_KEY_PROJECT
            The Google Cloud project for the key.

            To set the kms-project attribute:
            - provide the argument --continuous-backup-encryption-key on the
              command line with a fully specified name;
            - provide the argument --continuous-backup-encryption-key-project
              on the command line;
            - set the property core/project.

     Configure a preferred maintenance window.

     At most one of these can be specified:

       --maintenance-window-any
          Remove the user-specified maintenance window.

       Or at least one of these can be specified:

         Specify preferred day and time for maintenance.

         --maintenance-window-day=MAINTENANCE_WINDOW_DAY
            Day of week for maintenance window, in UTC time zone.
            MAINTENANCE_WINDOW_DAY must be one of: MONDAY, TUESDAY, WEDNESDAY,
            THURSDAY, FRIDAY, SATURDAY, SUNDAY.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --maintenance-window-hour=MAINTENANCE_WINDOW_HOUR
            Hour of day for maintenance window, in UTC time zone.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

     Specify maintenance deny period.

     At most one of these can be specified:

       --remove-deny-maintenance-period
          Remove the deny maintenance period.

       Or at least one of these can be specified:

         Specify preferred day and time for maintenance deny period.

         --deny-maintenance-period-end-date=DENY_MAINTENANCE_PERIOD_END_DATE
            Date when the deny maintenance period ends, that is 2020-11-01 or
            11-01 for recurring.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --deny-maintenance-period-start-date=DENY_MAINTENANCE_PERIOD_START_DATE
            Date when the deny maintenance period begins, that is 2020-11-01 or
            11-01 for recurring.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --deny-maintenance-period-time=DENY_MAINTENANCE_PERIOD_TIME
            Time when the deny maintenance period starts and ends, for example
            05:00, in UTC time zone.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb clusters update

        $ gcloud beta alloydb clusters update
```

### gcloud alloydb clusters upgrade

```text
NAME
    gcloud alloydb clusters upgrade - upgrade an AlloyDB cluster within a given
        project and region

SYNOPSIS
    gcloud alloydb clusters upgrade CLUSTER --region=REGION --version=VERSION
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Upgrade an AlloyDB cluster within a given project and region.

EXAMPLES
    To upgrade a cluster, run:

        $ gcloud alloydb clusters upgrade my-cluster --region=us-central1 \
            --version=POSTGRES_15

POSITIONAL ARGUMENTS
     CLUSTER
        AlloyDB cluster ID

REQUIRED FLAGS
     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

     --version=VERSION
        Target database version for the upgrade. VERSION must be one of:
        POSTGRES_14, POSTGRES_15, POSTGRES_16, POSTGRES_17, POSTGRES_18.

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

        $ gcloud alpha alloydb clusters upgrade

        $ gcloud beta alloydb clusters upgrade
```

### gcloud beta alloydb clusters create

```text
NAME
    gcloud beta alloydb clusters create - create a new AlloyDB cluster within a
        given project

SYNOPSIS
    gcloud beta alloydb clusters create CLUSTER --password=PASSWORD
        --region=REGION [--allocated-ip-range-name=ALLOCATED_IP_RANGE_NAME]
        [--async] [--backupdr-backup-plan=BACKUPDR_BACKUP_PLAN]
        [--database-version=DATABASE_VERSION] [--edition=EDITION]
        [--[no-]enable-dataplex-integration] [--[no-]enable-express]
        [--enable-private-service-connect] [--network=NETWORK]
        [--subscription-type=SUBSCRIPTION_TYPE] [--tags=[KEY=VALUE,...]]
        [--continuous-backup-recovery-window-days=RECOVERY_PERIOD
          --enable-continuous-backup
          [--continuous-backup-encryption-key=CONTINUOUS_BACKUP_ENCRYPTION_KEY
          : --continuous-backup-encryption-key-keyring=CONTINUOUS_BACKUP_ENCRYPTION_KEY_KEYRING --continuous-backup-encryption-key-location=CONTINUOUS_BACKUP_ENCRYPTION_KEY_LOCATION --continuous-backup-encryption-key-project=CONTINUOUS_BACKUP_ENCRYPTION_KEY_PROJECT]]
        [--deny-maintenance-period-end-date=DENY_MAINTENANCE_PERIOD_END_DATE
          --deny-maintenance-period-start-date=DENY_MAINTENANCE_PERIOD_START_DATE --deny-maintenance-period-time=DENY_MAINTENANCE_PERIOD_TIME]
        [--disable-automated-backup
          | [--automated-backup-days-of-week=[DAYS_OF_WEEK,...]
          --automated-backup-start-times=[START_TIMES,...]
          : --automated-backup-window=TIMEOUT_PERIOD
          [--automated-backup-encryption-key=AUTOMATED_BACKUP_ENCRYPTION_KEY
          : --automated-backup-encryption-key-keyring=AUTOMATED_BACKUP_ENCRYPTION_KEY_KEYRING --automated-backup-encryption-key-location=AUTOMATED_BACKUP_ENCRYPTION_KEY_LOCATION --automated-backup-encryption-key-project=AUTOMATED_BACKUP_ENCRYPTION_KEY_PROJECT] --automated-backup-retention-count=RETENTION_COUNT | --automated-backup-retention-period=RETENTION_PERIOD]]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [--maintenance-window-day=MAINTENANCE_WINDOW_DAY
          --maintenance-window-hour=MAINTENANCE_WINDOW_HOUR]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb clusters create-secondary

```text
NAME
    gcloud beta alloydb clusters create-secondary - create a new AlloyDB
        SECONDARY cluster within a given project

SYNOPSIS
    gcloud beta alloydb clusters create-secondary CLUSTER
        --primary-cluster=PRIMARY_CLUSTER --region=REGION
        [--allocated-ip-range-name=ALLOCATED_IP_RANGE_NAME] [--async]
        [--[no-]enable-dataplex-integration] [--tags=[KEY=VALUE,...]]
        [--automated-backup-days-of-week=[DAYS_OF_WEEK,...]
          --automated-backup-start-times=[START_TIMES,...]
          --automated-backup-window=TIMEOUT_PERIOD --enable-automated-backup
          [--automated-backup-encryption-key=AUTOMATED_BACKUP_ENCRYPTION_KEY
          : --automated-backup-encryption-key-keyring=AUTOMATED_BACKUP_ENCRYPTION_KEY_KEYRING --automated-backup-encryption-key-location=AUTOMATED_BACKUP_ENCRYPTION_KEY_LOCATION --automated-backup-encryption-key-project=AUTOMATED_BACKUP_ENCRYPTION_KEY_PROJECT] --automated-backup-retention-count=RETENTION_COUNT | --automated-backup-retention-period=RETENTION_PERIOD]
        [--continuous-backup-recovery-window-days=RECOVERY_PERIOD
          --enable-continuous-backup
          [--continuous-backup-encryption-key=CONTINUOUS_BACKUP_ENCRYPTION_KEY
          : --continuous-backup-encryption-key-keyring=CONTINUOUS_BACKUP_ENCRYPTION_KEY_KEYRING --continuous-backup-encryption-key-location=CONTINUOUS_BACKUP_ENCRYPTION_KEY_LOCATION --continuous-backup-encryption-key-project=CONTINUOUS_BACKUP_ENCRYPTION_KEY_PROJECT]]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb clusters delete

```text
NAME
    gcloud beta alloydb clusters delete - delete an AlloyDB cluster in a given
        region

SYNOPSIS
    gcloud beta alloydb clusters delete CLUSTER --region=REGION [--async]
        [--force] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb clusters describe

```text
NAME
    gcloud beta alloydb clusters describe - describe an AlloyDB cluster in a
        given project and region

SYNOPSIS
    gcloud beta alloydb clusters describe CLUSTER --region=REGION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb clusters export

```text
NAME
    gcloud beta alloydb clusters export - export data from an AlloyDB cluster
        to Google Cloud Storage

SYNOPSIS
    gcloud beta alloydb clusters export CLUSTER --database=DATABASE
        --gcs-uri=GCS_URI --region=REGION
        ([--csv --select-query=SELECT_QUERY
          : --escape-character=ESCAPE_CHARACTER
          --field-delimiter=FIELD_DELIMITER --quote-character=QUOTE_CHARACTER]
          | [--sql : --schema-only --tables=TABLES [--clean-target-objects
          : --if-exist-target-objects]]) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb clusters import

```text
NAME
    gcloud beta alloydb clusters import - import data to an AlloyDB cluster
        from Google Cloud Storage

SYNOPSIS
    gcloud beta alloydb clusters import CLUSTER --gcs-uri=GCS_URI
        --region=REGION
        (--sql | [--csv --table=TABLE : --columns=COLUMNS
          --escape-character=ESCAPE_CHARACTER
          --field-delimiter=FIELD_DELIMITER --quote-character=QUOTE_CHARACTER])
        [--async] [--database=DATABASE] [--user=USER] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb clusters list

```text
NAME
    gcloud beta alloydb clusters list - list AlloyDB clusters in a given
        project and region

SYNOPSIS
    gcloud beta alloydb clusters list [--region=REGION; default="-"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb clusters migrate-cloud-sql

```text
NAME
    gcloud beta alloydb clusters migrate-cloud-sql - migrate Cloud SQL instance
        to an AlloyDB cluster

SYNOPSIS
    gcloud beta alloydb clusters migrate-cloud-sql CLUSTER
        --cloud-sql-backup-id=CLOUD_SQL_BACKUP_ID
        --cloud-sql-instance-id=CLOUD_SQL_INSTANCE_ID
        --cloud-sql-project-id=CLOUD_SQL_PROJECT_ID --password=PASSWORD
        --region=REGION [--allocated-ip-range-name=ALLOCATED_IP_RANGE_NAME]
        [--async] [--database-version=DATABASE_VERSION]
        [--[no-]enable-dataplex-integration] [--enable-private-service-connect]
        [--network=NETWORK] [--subscription-type=SUBSCRIPTION_TYPE]
        [--tags=[KEY=VALUE,...]]
        [--continuous-backup-recovery-window-days=RECOVERY_PERIOD
          --enable-continuous-backup
          [--continuous-backup-encryption-key=CONTINUOUS_BACKUP_ENCRYPTION_KEY
          : --continuous-backup-encryption-key-keyring=CONTINUOUS_BACKUP_ENCRYPTION_KEY_KEYRING --continuous-backup-encryption-key-location=CONTINUOUS_BACKUP_ENCRYPTION_KEY_LOCATION --continuous-backup-encryption-key-project=CONTINUOUS_BACKUP_ENCRYPTION_KEY_PROJECT]]
        [--deny-maintenance-period-end-date=DENY_MAINTENANCE_PERIOD_END_DATE
          --deny-maintenance-period-start-date=DENY_MAINTENANCE_PERIOD_START_DATE --deny-maintenance-period-time=DENY_MAINTENANCE_PERIOD_TIME]
        [--disable-automated-backup
          | [--automated-backup-days-of-week=[DAYS_OF_WEEK,...]
          --automated-backup-start-times=[START_TIMES,...]
          : --automated-backup-window=TIMEOUT_PERIOD
          [--automated-backup-encryption-key=AUTOMATED_BACKUP_ENCRYPTION_KEY
          : --automated-backup-encryption-key-keyring=AUTOMATED_BACKUP_ENCRYPTION_KEY_KEYRING --automated-backup-encryption-key-location=AUTOMATED_BACKUP_ENCRYPTION_KEY_LOCATION --automated-backup-encryption-key-project=AUTOMATED_BACKUP_ENCRYPTION_KEY_PROJECT] --automated-backup-retention-count=RETENTION_COUNT | --automated-backup-retention-period=RETENTION_PERIOD]]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [--maintenance-window-day=MAINTENANCE_WINDOW_DAY
          --maintenance-window-hour=MAINTENANCE_WINDOW_HOUR]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb clusters promote

```text
NAME
    gcloud beta alloydb clusters promote - promote an AlloyDB SECONDARY cluster
        in a given project and region

SYNOPSIS
    gcloud beta alloydb clusters promote CLUSTER --region=REGION [--async]
        [--failover] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb clusters restore

```text
NAME
    gcloud beta alloydb clusters restore - restore an AlloyDB cluster from a
        given backup or a source cluster and a timestamp

SYNOPSIS
    gcloud beta alloydb clusters restore CLUSTER --region=REGION
        (--backup=BACKUP | --backupdr-backup=BACKUPDR_BACKUP
          | --point-in-time=POINT_IN_TIME
          (--backupdr-data-source=BACKUPDR_DATA_SOURCE
          | --source-cluster=SOURCE_CLUSTER))
        [--allocated-ip-range-name=ALLOCATED_IP_RANGE_NAME] [--async]
        [--[no-]enable-dataplex-integration] [--enable-private-service-connect]
        [--network=NETWORK] [--tags=[KEY=VALUE,...]]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb clusters switchover

```text
NAME
    gcloud beta alloydb clusters switchover - switchover an AlloyDB SECONDARY
        cluster in a given project and region

SYNOPSIS
    gcloud beta alloydb clusters switchover CLUSTER --region=REGION [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb clusters update

```text
NAME
    gcloud beta alloydb clusters update - update an AlloyDB cluster within a
        given project and region

SYNOPSIS
    gcloud beta alloydb clusters update CLUSTER --region=REGION [--async]
        [--edition=EDITION] [--[no-]enable-dataplex-integration]
        [--[no-]enable-express] [--maintenance-version=MAINTENANCE_VERSION]
        [--subscription-type=SUBSCRIPTION_TYPE]
        [--clear-automated-backup | --disable-automated-backup
          | --automated-backup-days-of-week=[DAYS_OF_WEEK,...]
          --automated-backup-start-times=[START_TIMES,...]
          --automated-backup-window=TIMEOUT_PERIOD
          [--automated-backup-encryption-key=AUTOMATED_BACKUP_ENCRYPTION_KEY
          : --automated-backup-encryption-key-keyring=AUTOMATED_BACKUP_ENCRYPTION_KEY_KEYRING --automated-backup-encryption-key-location=AUTOMATED_BACKUP_ENCRYPTION_KEY_LOCATION --automated-backup-encryption-key-project=AUTOMATED_BACKUP_ENCRYPTION_KEY_PROJECT] --automated-backup-retention-count=RETENTION_COUNT | --automated-backup-retention-period=RETENTION_PERIOD]
        [--continuous-backup-recovery-window-days=RECOVERY_PERIOD
          --enable-continuous-backup --clear-continuous-backup-encryption-key
          | [--continuous-backup-encryption-key=CONTINUOUS_BACKUP_ENCRYPTION_KEY : --continuous-backup-encryption-key-keyring=CONTINUOUS_BACKUP_ENCRYPTION_KEY_KEYRING --continuous-backup-encryption-key-location=CONTINUOUS_BACKUP_ENCRYPTION_KEY_LOCATION --continuous-backup-encryption-key-project=CONTINUOUS_BACKUP_ENCRYPTION_KEY_PROJECT]]
        [--maintenance-window-any
          | --maintenance-window-day=MAINTENANCE_WINDOW_DAY
          --maintenance-window-hour=MAINTENANCE_WINDOW_HOUR]
        [--remove-deny-maintenance-period
          | --deny-maintenance-period-end-date=DENY_MAINTENANCE_PERIOD_END_DATE
          --deny-maintenance-period-start-date=DENY_MAINTENANCE_PERIOD_START_DATE --deny-maintenance-period-time=DENY_MAINTENANCE_PERIOD_TIME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb clusters upgrade

```text
NAME
    gcloud beta alloydb clusters upgrade - upgrade an AlloyDB cluster within a
        given project and region

SYNOPSIS
    gcloud beta alloydb clusters upgrade CLUSTER --region=REGION
        --version=VERSION [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb clusters create

```text
NAME
    gcloud alpha alloydb clusters create - create a new AlloyDB cluster within
        a given project

SYNOPSIS
    gcloud alpha alloydb clusters create CLUSTER --password=PASSWORD
        --region=REGION [--allocated-ip-range-name=ALLOCATED_IP_RANGE_NAME]
        [--async] [--backupdr-backup-plan=BACKUPDR_BACKUP_PLAN]
        [--database-version=DATABASE_VERSION] [--edition=EDITION]
        [--[no-]enable-dataplex-integration] [--[no-]enable-express]
        [--enable-private-service-connect] [--network=NETWORK]
        [--subscription-type=SUBSCRIPTION_TYPE] [--tags=[KEY=VALUE,...]]
        [--continuous-backup-recovery-window-days=RECOVERY_PERIOD
          --enable-continuous-backup
          [--continuous-backup-encryption-key=CONTINUOUS_BACKUP_ENCRYPTION_KEY
          : --continuous-backup-encryption-key-keyring=CONTINUOUS_BACKUP_ENCRYPTION_KEY_KEYRING --continuous-backup-encryption-key-location=CONTINUOUS_BACKUP_ENCRYPTION_KEY_LOCATION --continuous-backup-encryption-key-project=CONTINUOUS_BACKUP_ENCRYPTION_KEY_PROJECT]]
        [--deny-maintenance-period-end-date=DENY_MAINTENANCE_PERIOD_END_DATE
          --deny-maintenance-period-start-date=DENY_MAINTENANCE_PERIOD_START_DATE --deny-maintenance-period-time=DENY_MAINTENANCE_PERIOD_TIME]
        [--disable-automated-backup
          | [--automated-backup-days-of-week=[DAYS_OF_WEEK,...]
          --automated-backup-start-times=[START_TIMES,...]
          : --automated-backup-window=TIMEOUT_PERIOD
          [--automated-backup-encryption-key=AUTOMATED_BACKUP_ENCRYPTION_KEY
          : --automated-backup-encryption-key-keyring=AUTOMATED_BACKUP_ENCRYPTION_KEY_KEYRING --automated-backup-encryption-key-location=AUTOMATED_BACKUP_ENCRYPTION_KEY_LOCATION --automated-backup-encryption-key-project=AUTOMATED_BACKUP_ENCRYPTION_KEY_PROJECT] --automated-backup-retention-count=RETENTION_COUNT | --automated-backup-retention-period=RETENTION_PERIOD]]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [--maintenance-window-day=MAINTENANCE_WINDOW_DAY
          --maintenance-window-hour=MAINTENANCE_WINDOW_HOUR]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb clusters create-secondary

```text
NAME
    gcloud alpha alloydb clusters create-secondary - create a new AlloyDB
        SECONDARY cluster within a given project

SYNOPSIS
    gcloud alpha alloydb clusters create-secondary CLUSTER
        --primary-cluster=PRIMARY_CLUSTER --region=REGION
        [--allocated-ip-range-name=ALLOCATED_IP_RANGE_NAME] [--async]
        [--[no-]enable-dataplex-integration] [--tags=[KEY=VALUE,...]]
        [--automated-backup-days-of-week=[DAYS_OF_WEEK,...]
          --automated-backup-start-times=[START_TIMES,...]
          --automated-backup-window=TIMEOUT_PERIOD --enable-automated-backup
          [--automated-backup-encryption-key=AUTOMATED_BACKUP_ENCRYPTION_KEY
          : --automated-backup-encryption-key-keyring=AUTOMATED_BACKUP_ENCRYPTION_KEY_KEYRING --automated-backup-encryption-key-location=AUTOMATED_BACKUP_ENCRYPTION_KEY_LOCATION --automated-backup-encryption-key-project=AUTOMATED_BACKUP_ENCRYPTION_KEY_PROJECT] --automated-backup-retention-count=RETENTION_COUNT | --automated-backup-retention-period=RETENTION_PERIOD]
        [--continuous-backup-recovery-window-days=RECOVERY_PERIOD
          --enable-continuous-backup
          [--continuous-backup-encryption-key=CONTINUOUS_BACKUP_ENCRYPTION_KEY
          : --continuous-backup-encryption-key-keyring=CONTINUOUS_BACKUP_ENCRYPTION_KEY_KEYRING --continuous-backup-encryption-key-location=CONTINUOUS_BACKUP_ENCRYPTION_KEY_LOCATION --continuous-backup-encryption-key-project=CONTINUOUS_BACKUP_ENCRYPTION_KEY_PROJECT]]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb clusters delete

```text
NAME
    gcloud alpha alloydb clusters delete - delete an AlloyDB cluster in a given
        region

SYNOPSIS
    gcloud alpha alloydb clusters delete CLUSTER --region=REGION [--async]
        [--force] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb clusters describe

```text
NAME
    gcloud alpha alloydb clusters describe - describe an AlloyDB cluster in a
        given project and region

SYNOPSIS
    gcloud alpha alloydb clusters describe CLUSTER --region=REGION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb clusters export

```text
NAME
    gcloud alpha alloydb clusters export - export data from an AlloyDB cluster
        to Google Cloud Storage

SYNOPSIS
    gcloud alpha alloydb clusters export CLUSTER --database=DATABASE
        --gcs-uri=GCS_URI --region=REGION
        ([--csv --select-query=SELECT_QUERY
          : --escape-character=ESCAPE_CHARACTER
          --field-delimiter=FIELD_DELIMITER --quote-character=QUOTE_CHARACTER]
          | [--sql : --schema-only --tables=TABLES [--clean-target-objects
          : --if-exist-target-objects]]) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb clusters import

```text
NAME
    gcloud alpha alloydb clusters import - import data to an AlloyDB cluster
        from Google Cloud Storage

SYNOPSIS
    gcloud alpha alloydb clusters import CLUSTER --gcs-uri=GCS_URI
        --region=REGION
        (--sql | [--csv --table=TABLE : --columns=COLUMNS
          --escape-character=ESCAPE_CHARACTER
          --field-delimiter=FIELD_DELIMITER --quote-character=QUOTE_CHARACTER])
        [--async] [--database=DATABASE] [--user=USER] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb clusters list

```text
NAME
    gcloud alpha alloydb clusters list - list AlloyDB clusters in a given
        project and region

SYNOPSIS
    gcloud alpha alloydb clusters list [--region=REGION; default="-"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb clusters migrate-cloud-sql

```text
NAME
    gcloud alpha alloydb clusters migrate-cloud-sql - migrate Cloud SQL
        instance to an AlloyDB cluster

SYNOPSIS
    gcloud alpha alloydb clusters migrate-cloud-sql CLUSTER
        --cloud-sql-backup-id=CLOUD_SQL_BACKUP_ID
        --cloud-sql-instance-id=CLOUD_SQL_INSTANCE_ID
        --cloud-sql-project-id=CLOUD_SQL_PROJECT_ID --password=PASSWORD
        --region=REGION [--allocated-ip-range-name=ALLOCATED_IP_RANGE_NAME]
        [--async] [--database-version=DATABASE_VERSION]
        [--[no-]enable-dataplex-integration] [--enable-private-service-connect]
        [--network=NETWORK] [--subscription-type=SUBSCRIPTION_TYPE]
        [--tags=[KEY=VALUE,...]]
        [--continuous-backup-recovery-window-days=RECOVERY_PERIOD
          --enable-continuous-backup
          [--continuous-backup-encryption-key=CONTINUOUS_BACKUP_ENCRYPTION_KEY
          : --continuous-backup-encryption-key-keyring=CONTINUOUS_BACKUP_ENCRYPTION_KEY_KEYRING --continuous-backup-encryption-key-location=CONTINUOUS_BACKUP_ENCRYPTION_KEY_LOCATION --continuous-backup-encryption-key-project=CONTINUOUS_BACKUP_ENCRYPTION_KEY_PROJECT]]
        [--deny-maintenance-period-end-date=DENY_MAINTENANCE_PERIOD_END_DATE
          --deny-maintenance-period-start-date=DENY_MAINTENANCE_PERIOD_START_DATE --deny-maintenance-period-time=DENY_MAINTENANCE_PERIOD_TIME]
        [--disable-automated-backup
          | [--automated-backup-days-of-week=[DAYS_OF_WEEK,...]
          --automated-backup-start-times=[START_TIMES,...]
          : --automated-backup-window=TIMEOUT_PERIOD
          [--automated-backup-encryption-key=AUTOMATED_BACKUP_ENCRYPTION_KEY
          : --automated-backup-encryption-key-keyring=AUTOMATED_BACKUP_ENCRYPTION_KEY_KEYRING --automated-backup-encryption-key-location=AUTOMATED_BACKUP_ENCRYPTION_KEY_LOCATION --automated-backup-encryption-key-project=AUTOMATED_BACKUP_ENCRYPTION_KEY_PROJECT] --automated-backup-retention-count=RETENTION_COUNT | --automated-backup-retention-period=RETENTION_PERIOD]]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [--maintenance-window-day=MAINTENANCE_WINDOW_DAY
          --maintenance-window-hour=MAINTENANCE_WINDOW_HOUR]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb clusters promote

```text
NAME
    gcloud alpha alloydb clusters promote - promote an AlloyDB SECONDARY
        cluster in a given project and region

SYNOPSIS
    gcloud alpha alloydb clusters promote CLUSTER --region=REGION [--async]
        [--failover] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb clusters restore

```text
NAME
    gcloud alpha alloydb clusters restore - restore an AlloyDB cluster from a
        given backup or a source cluster and a timestamp

SYNOPSIS
    gcloud alpha alloydb clusters restore CLUSTER --region=REGION
        (--backup=BACKUP | --backupdr-backup=BACKUPDR_BACKUP
          | --point-in-time=POINT_IN_TIME
          (--backupdr-data-source=BACKUPDR_DATA_SOURCE
          | --source-cluster=SOURCE_CLUSTER))
        [--allocated-ip-range-name=ALLOCATED_IP_RANGE_NAME] [--async]
        [--[no-]enable-dataplex-integration] [--enable-private-service-connect]
        [--network=NETWORK] [--tags=[KEY=VALUE,...]]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb clusters switchover

```text
NAME
    gcloud alpha alloydb clusters switchover - switchover an AlloyDB SECONDARY
        cluster in a given project and region

SYNOPSIS
    gcloud alpha alloydb clusters switchover CLUSTER --region=REGION [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb clusters update

```text
NAME
    gcloud alpha alloydb clusters update - update an AlloyDB cluster within a
        given project and region

SYNOPSIS
    gcloud alpha alloydb clusters update CLUSTER --region=REGION [--async]
        [--edition=EDITION] [--[no-]enable-dataplex-integration]
        [--[no-]enable-express] [--maintenance-version=MAINTENANCE_VERSION]
        [--subscription-type=SUBSCRIPTION_TYPE]
        [--clear-automated-backup | --disable-automated-backup
          | --automated-backup-days-of-week=[DAYS_OF_WEEK,...]
          --automated-backup-start-times=[START_TIMES,...]
          --automated-backup-window=TIMEOUT_PERIOD
          [--automated-backup-encryption-key=AUTOMATED_BACKUP_ENCRYPTION_KEY
          : --automated-backup-encryption-key-keyring=AUTOMATED_BACKUP_ENCRYPTION_KEY_KEYRING --automated-backup-encryption-key-location=AUTOMATED_BACKUP_ENCRYPTION_KEY_LOCATION --automated-backup-encryption-key-project=AUTOMATED_BACKUP_ENCRYPTION_KEY_PROJECT] --automated-backup-retention-count=RETENTION_COUNT | --automated-backup-retention-period=RETENTION_PERIOD]
        [--continuous-backup-recovery-window-days=RECOVERY_PERIOD
          --enable-continuous-backup --clear-continuous-backup-encryption-key
          | [--continuous-backup-encryption-key=CONTINUOUS_BACKUP_ENCRYPTION_KEY : --continuous-backup-encryption-key-keyring=CONTINUOUS_BACKUP_ENCRYPTION_KEY_KEYRING --continuous-backup-encryption-key-location=CONTINUOUS_BACKUP_ENCRYPTION_KEY_LOCATION --continuous-backup-encryption-key-project=CONTINUOUS_BACKUP_ENCRYPTION_KEY_PROJECT]]
        [--maintenance-window-any
          | --maintenance-window-day=MAINTENANCE_WINDOW_DAY
          --maintenance-window-hour=MAINTENANCE_WINDOW_HOUR]
        [--remove-deny-maintenance-period
          | --deny-maintenance-period-end-date=DENY_MAINTENANCE_PERIOD_END_DATE
          --deny-maintenance-period-start-date=DENY_MAINTENANCE_PERIOD_START_DATE --deny-maintenance-period-time=DENY_MAINTENANCE_PERIOD_TIME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb clusters upgrade

```text
NAME
    gcloud alpha alloydb clusters upgrade - upgrade an AlloyDB cluster within a
        given project and region

SYNOPSIS
    gcloud alpha alloydb clusters upgrade CLUSTER --region=REGION
        --version=VERSION [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Corrected from the official docs (the help text above is verbatim): the `restore` help (GA and beta) describes the full `--source-cluster` name as `projects/myProject/locations/us-central1/backups/myCluster`, which is a backup path; a cluster name has the form `projects/myProject/locations/us-central1/clusters/myCluster` (the cluster ID `myCluster` alone also works when the project and location match the restored cluster).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
