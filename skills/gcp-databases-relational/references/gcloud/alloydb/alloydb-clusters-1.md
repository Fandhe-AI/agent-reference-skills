---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/clusters
---

# gcloud alloydb clusters (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alloydb clusters create

```text
NAME
    gcloud alloydb clusters create - create a new AlloyDB cluster within a
        given project

SYNOPSIS
    gcloud alloydb clusters create CLUSTER --password=PASSWORD --region=REGION
        [--allocated-ip-range-name=ALLOCATED_IP_RANGE_NAME] [--async]
        [--backupdr-backup-plan=BACKUPDR_BACKUP_PLAN]
        [--database-version=DATABASE_VERSION]
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

DESCRIPTION
    Create a new AlloyDB cluster within a given project.

EXAMPLES
    To create a new cluster, run:

        $ gcloud alloydb clusters create my-cluster --region=us-central1 \
            --password=postgres

POSITIONAL ARGUMENTS
     CLUSTER
        AlloyDB cluster ID

REQUIRED FLAGS
     --password=PASSWORD
        Initial postgres user password to set up during cluster creation.

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

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

     --backupdr-backup-plan=BACKUPDR_BACKUP_PLAN
        The resource name of the BackupDR backup plan to associate with the
        cluster. The format should be
        projects/{project}/locations/{location}/backupPlans/{backupPlanId}.
        This flag cannot be used with the --async flag.

     --database-version=DATABASE_VERSION
        Database version of the cluster. DATABASE_VERSION must be one of:
        POSTGRES_14, POSTGRES_15, POSTGRES_16, POSTGRES_17, POSTGRES_18.

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

     --subscription-type=SUBSCRIPTION_TYPE
        Subscription type of the cluster. SUBSCRIPTION_TYPE must be one of:
        STANDARD, TRIAL.

     --tags=[KEY=VALUE,...]
        List of tags KEY=VALUE pairs to bind. Each item must be expressed as
        <tag-key-namespaced-name>=<tag-value-short-name>.

        Example: 123/environment=production,123/costCenter=marketing

     Continuous Backup configuration. If unspecified, continuous backups are
     enabled.

     --continuous-backup-recovery-window-days=RECOVERY_PERIOD
        Recovery window of the log files and backups saved to support
        Continuous Backups.

     --enable-continuous-backup
        Enables Continuous Backups on the cluster.

     Key resource - The Cloud KMS (Key Management Service) cryptokey that will
     be used to protect the continuous backup. The 'AlloyDB Service Agent's
     service account must hold permission 'Cloud KMS CryptoKey
     Encrypter/Decrypter'. The arguments in this group can be used to specify
     the attributes of this resource.

     --continuous-backup-encryption-key=CONTINUOUS_BACKUP_ENCRYPTION_KEY
        ID of the key or fully qualified identifier for the key.

        To set the kms-key attribute:
        * provide the argument --continuous-backup-encryption-key on the
          command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --continuous-backup-encryption-key-keyring=CONTINUOUS_BACKUP_ENCRYPTION_KEY_KEYRING
        The KMS keyring of the key.

        To set the kms-keyring attribute:
        * provide the argument --continuous-backup-encryption-key on the
          command line with a fully specified name;
        * provide the argument --continuous-backup-encryption-key-keyring on
          the command line.

     --continuous-backup-encryption-key-location=CONTINUOUS_BACKUP_ENCRYPTION_KEY_LOCATION
        The Google Cloud location for the key.

        To set the kms-location attribute:
        * provide the argument --continuous-backup-encryption-key on the
          command line with a fully specified name;
        * provide the argument --continuous-backup-encryption-key-location on
          the command line.

     --continuous-backup-encryption-key-project=CONTINUOUS_BACKUP_ENCRYPTION_KEY_PROJECT
        The Google Cloud project for the key.

        To set the kms-project attribute:
        * provide the argument --continuous-backup-encryption-key on the
          command line with a fully specified name;
        * provide the argument --continuous-backup-encryption-key-project on
          the command line;
        * set the property core/project.

     Specify preferred day and time for maintenance deny period.

     --deny-maintenance-period-end-date=DENY_MAINTENANCE_PERIOD_END_DATE
        Date when the deny maintenance period ends, that is 2020-11-01 or 11-01
        for recurring.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --deny-maintenance-period-start-date=DENY_MAINTENANCE_PERIOD_START_DATE
        Date when the deny maintenance period begins, that is 2020-11-01 or
        11-01 for recurring.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --deny-maintenance-period-time=DENY_MAINTENANCE_PERIOD_TIME
        Time when the deny maintenance period starts and ends, for example
        05:00, in UTC time zone.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     Automated backup policy. If unspecified, automated backups are disabled.

     At most one of these can be specified:

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

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --automated-backup-start-times=[START_TIMES,...]
            Comma-separated list of times during the day to start a backup. At
            least one start time must be provided. The start times are assumed
            to be in UTC and required to be an exact hour in the format HH:00.
            (e.g., --automated-backup-start-times=01:00,13:00)

            This flag argument must be specified if any of the other arguments
            in this group are specified.

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

     Specify preferred day and time for maintenance.

     --maintenance-window-day=MAINTENANCE_WINDOW_DAY
        Day of week for maintenance window, in UTC time zone.
        MAINTENANCE_WINDOW_DAY must be one of: MONDAY, TUESDAY, WEDNESDAY,
        THURSDAY, FRIDAY, SATURDAY, SUNDAY.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --maintenance-window-hour=MAINTENANCE_WINDOW_HOUR
        Hour of day for maintenance window, in UTC time zone.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb clusters create

        $ gcloud beta alloydb clusters create
```

### gcloud alloydb clusters create-secondary

```text
NAME
    gcloud alloydb clusters create-secondary - create a new AlloyDB SECONDARY
        cluster within a given project

SYNOPSIS
    gcloud alloydb clusters create-secondary CLUSTER
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

DESCRIPTION
    Create a new AlloyDB SECONDARY cluster within a given project.

EXAMPLES
    To create a new cluster, run:

        $ gcloud alloydb clusters create-secondary my-cluster \
            --region=us-central1 \
            --primary-cluster=projects/12345/locations/us-central1/\
        clusters/cluster1

POSITIONAL ARGUMENTS
     CLUSTER
        AlloyDB cluster ID

REQUIRED FLAGS
     --primary-cluster=PRIMARY_CLUSTER
        AlloyDB primary cluster ID

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

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

     --tags=[KEY=VALUE,...]
        List of tags KEY=VALUE pairs to bind. Each item must be expressed as
        <tag-key-namespaced-name>=<tag-value-short-name>.

        Example: 123/environment=production,123/costCenter=marketing

     Automated backup policy. If unspecified, automated backups are copied from
     the associated primary cluster.

     --automated-backup-days-of-week=[DAYS_OF_WEEK,...]
        Comma-separated list of days of the week to perform a backup. At least
        one day of the week must be provided. (e.g.,
        --automated-backup-days-of-week=MONDAY,WEDNESDAY,SUNDAY). DAYS_OF_WEEK
        must be one of: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY,
        SUNDAY.

     --automated-backup-start-times=[START_TIMES,...]
        Comma-separated list of times during the day to start a backup. At
        least one start time must be provided. The start times are assumed to
        be in UTC and required to be an exact hour in the format HH:00. (e.g.,
        --automated-backup-start-times=01:00,13:00)

     --automated-backup-window=TIMEOUT_PERIOD
        The length of the time window beginning at start time during which a
        backup can be taken. If a backup does not succeed within this time
        window, it will be canceled and considered failed. The backup window
        must be at least 5 minutes long. There is no upper bound on the window.
        If not set, it will default to 1 hour.

     --enable-automated-backup
        Enables Automated Backups on the cluster.

     Key resource - The Cloud KMS (Key Management Service) cryptokey that will
     be used to protect the automated backups. The 'AlloyDB Service Agent'
     service account must hold permission 'Cloud KMS CryptoKey
     Encrypter/Decrypter'. The arguments in this group can be used to specify
     the attributes of this resource.

     --automated-backup-encryption-key=AUTOMATED_BACKUP_ENCRYPTION_KEY
        ID of the key or fully qualified identifier for the key.

        To set the kms-key attribute:
        * provide the argument --automated-backup-encryption-key on the
          command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --automated-backup-encryption-key-keyring=AUTOMATED_BACKUP_ENCRYPTION_KEY_KEYRING
        The KMS keyring of the key.

        To set the kms-keyring attribute:
        * provide the argument --automated-backup-encryption-key on the
          command line with a fully specified name;
        * provide the argument --automated-backup-encryption-key-keyring on
          the command line.

     --automated-backup-encryption-key-location=AUTOMATED_BACKUP_ENCRYPTION_KEY_LOCATION
        The Google Cloud location for the key.

        To set the kms-location attribute:
        * provide the argument --automated-backup-encryption-key on the
          command line with a fully specified name;
        * provide the argument --automated-backup-encryption-key-location on
          the command line.

     --automated-backup-encryption-key-project=AUTOMATED_BACKUP_ENCRYPTION_KEY_PROJECT
        The Google Cloud project for the key.

        To set the kms-project attribute:
        * provide the argument --automated-backup-encryption-key on the
          command line with a fully specified name;
        * provide the argument --automated-backup-encryption-key-project on
          the command line;
        * set the property core/project.

     Retention policy. If no retention policy is provided, all automated
     backups will be retained.

     At most one of these can be specified:

       --automated-backup-retention-count=RETENTION_COUNT
          Number of most recent successful backups retained.

       --automated-backup-retention-period=RETENTION_PERIOD
          Retention period of the backup relative to creation time. See $
          gcloud topic datetimes for information on duration formats.

     Continuous Backup configuration. If unspecified, continuous backups are
     copied from the associated primary cluster.

     --continuous-backup-recovery-window-days=RECOVERY_PERIOD
        Recovery window of the log files and backups saved to support
        Continuous Backups.

     --enable-continuous-backup
        Enables Continuous Backups on the cluster.

     Key resource - The Cloud KMS (Key Management Service) cryptokey that will
     be used to protect the continuous backup. The 'AlloyDB Service Agent's
     service account must hold permission 'Cloud KMS CryptoKey
     Encrypter/Decrypter'. The arguments in this group can be used to specify
     the attributes of this resource.

     --continuous-backup-encryption-key=CONTINUOUS_BACKUP_ENCRYPTION_KEY
        ID of the key or fully qualified identifier for the key.

        To set the kms-key attribute:
        * provide the argument --continuous-backup-encryption-key on the
          command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --continuous-backup-encryption-key-keyring=CONTINUOUS_BACKUP_ENCRYPTION_KEY_KEYRING
        The KMS keyring of the key.

        To set the kms-keyring attribute:
        * provide the argument --continuous-backup-encryption-key on the
          command line with a fully specified name;
        * provide the argument --continuous-backup-encryption-key-keyring on
          the command line.

     --continuous-backup-encryption-key-location=CONTINUOUS_BACKUP_ENCRYPTION_KEY_LOCATION
        The Google Cloud location for the key.

        To set the kms-location attribute:
        * provide the argument --continuous-backup-encryption-key on the
          command line with a fully specified name;
        * provide the argument --continuous-backup-encryption-key-location on
          the command line.

     --continuous-backup-encryption-key-project=CONTINUOUS_BACKUP_ENCRYPTION_KEY_PROJECT
        The Google Cloud project for the key.

        To set the kms-project attribute:
        * provide the argument --continuous-backup-encryption-key on the
          command line with a fully specified name;
        * provide the argument --continuous-backup-encryption-key-project on
          the command line;
        * set the property core/project.

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

        $ gcloud alpha alloydb clusters create-secondary

        $ gcloud beta alloydb clusters create-secondary
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud alloydb clusters create-secondary my-cluster \
    --region=us-central1 \
    --primary-cluster=projects/12345/locations/us-central1/clusters/cluster1
```

### gcloud alloydb clusters delete

```text
NAME
    gcloud alloydb clusters delete - delete an AlloyDB cluster in a given
        region

SYNOPSIS
    gcloud alloydb clusters delete CLUSTER --region=REGION [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an AlloyDB cluster in a given region.

EXAMPLES
    To delete a cluster, run:

        $ gcloud alloydb clusters delete my-cluster --region=us-central1

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

     --force
        Default value is false.

        If flag is specified, deletes instances (if any) within this cluster,
        before deleting the cluster.

        If flag is not specified, cluster delete will fail if there are
        instances present in the cluster.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb clusters delete

        $ gcloud beta alloydb clusters delete
```

### gcloud alloydb clusters describe

```text
NAME
    gcloud alloydb clusters describe - describe an AlloyDB cluster in a given
        project and region

SYNOPSIS
    gcloud alloydb clusters describe CLUSTER --region=REGION
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an AlloyDB cluster in a given project and region.

EXAMPLES
    To describe a cluster, run:

        $ gcloud alloydb clusters describe my-cluster --region=us-central1

POSITIONAL ARGUMENTS
     CLUSTER
        AlloyDB cluster ID

REQUIRED FLAGS
     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb clusters describe

        $ gcloud beta alloydb clusters describe
```

### gcloud alloydb clusters export

```text
NAME
    gcloud alloydb clusters export - export data from an AlloyDB cluster to
        Google Cloud Storage

SYNOPSIS
    gcloud alloydb clusters export CLUSTER --database=DATABASE
        --gcs-uri=GCS_URI --region=REGION
        ([--csv --select-query=SELECT_QUERY
          : --escape-character=ESCAPE_CHARACTER
          --field-delimiter=FIELD_DELIMITER --quote-character=QUOTE_CHARACTER]
          | [--sql : --schema-only --tables=TABLES [--clean-target-objects
          : --if-exist-target-objects]]) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export data from an AlloyDB cluster to Google Cloud Storage.

EXAMPLES
    To export a cluster, run:

        $ gcloud alloydb clusters export my-cluster --region=us-central1 \
            --database=my-database \
            --gcs-uri=gs://my-bucket/my-export-file-path --csv \
            --select-query="SELECT * FROM my-table"

POSITIONAL ARGUMENTS
     CLUSTER
        AlloyDB cluster ID

REQUIRED FLAGS
     --database=DATABASE
        Database name.

     Destination URI where the file needs to be exported.

     This must be specified.

       --gcs-uri=GCS_URI
          Path to the Google Cloud Storage file to which export has to be done.

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

     Export options for the cluster.

     Exactly one of these must be specified:

       CSV export options for the cluster.

       --csv
          Specifies destination file type.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --select-query=SELECT_QUERY
          Select query to be used for export.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --escape-character=ESCAPE_CHARACTER
          Escape character to be used for export.

       --field-delimiter=FIELD_DELIMITER
          Field delimiter to be used for export.

       --quote-character=QUOTE_CHARACTER
          Quote character to be used for export.

       SQL export options for the cluster.

       --sql
          Specifies destination file type.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --schema-only
          Export only schema of the database.

       --tables=TABLES
          Comma-separated list of table names which need to be exported.

       SQL export options to clean target objects.

       --clean-target-objects
          If true, output commands to DROP all the dumped database objects
          prior to outputting the commands for creating them.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --if-exist-target-objects
          If true, use DROP ... IF EXISTS commands to check for the object's
          existence before dropping it in clean_target_objects mode.

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

        $ gcloud alpha alloydb clusters export

        $ gcloud beta alloydb clusters export
```

### gcloud alloydb clusters import

```text
NAME
    gcloud alloydb clusters import - import data into an AlloyDB cluster from
        Google Cloud Storage

SYNOPSIS
    gcloud alloydb clusters import CLUSTER --gcs-uri=GCS_URI --region=REGION
        (--sql | [--csv --table=TABLE : --columns=COLUMNS
          --escape-character=ESCAPE_CHARACTER
          --field-delimiter=FIELD_DELIMITER --quote-character=QUOTE_CHARACTER])
        [--async] [--database=DATABASE] [--user=USER] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Import data into an AlloyDB cluster from Google Cloud Storage.

EXAMPLES
    To import data into a cluster, run:

        $ gcloud alloydb clusters import my-cluster --region=us-central1 \
            --database=my-database \
            --gcs-uri=gs://my-bucket/source-file-path --sql --user=my-user"

POSITIONAL ARGUMENTS
     CLUSTER
        AlloyDB cluster ID

REQUIRED FLAGS
     URI of the source file for import.

     This must be specified.

       --gcs-uri=GCS_URI
          Path to the Google Cloud Storage file from which import has to be
          done.

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

     Import options for the cluster.

     Exactly one of these must be specified:

       SQL import options for the cluster.

       --sql
          Specify source file type.

       CSV import options for the cluster.

       --csv
          Specify source file type.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --table=TABLE
          Table name to which the data has to be imported.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --columns=COLUMNS
          Comma-separated list of column names to be used for import.

       --escape-character=ESCAPE_CHARACTER
          Escape character in the source file.

       --field-delimiter=FIELD_DELIMITER
          Field delimiter in the source file.

       --quote-character=QUOTE_CHARACTER
          Quote character in the source file.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --database=DATABASE
        Database name.

     --user=USER
        Database user for the import.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb clusters import

        $ gcloud beta alloydb clusters import
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud alloydb clusters import my-cluster \
    --region=us-central1 \
    --database=my-database \
    --gcs-uri=gs://my-bucket/source-file-path \
    --sql \
    --user=my-user
```

### gcloud alloydb clusters list

```text
NAME
    gcloud alloydb clusters list - list AlloyDB clusters in a given project and
        region

SYNOPSIS
    gcloud alloydb clusters list [--region=REGION; default="-"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List AlloyDB clusters in a given project in alphabetical order based on the
    cluster name.

EXAMPLES
    To list clusters, run:

        $ gcloud alloydb clusters list --region=us-central1

FLAGS
     --region=REGION; default="-"
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.
        Default: list clusters in all regions.

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

        $ gcloud alpha alloydb clusters list

        $ gcloud beta alloydb clusters list
```

### gcloud alloydb clusters migrate-cloud-sql

```text
NAME
    gcloud alloydb clusters migrate-cloud-sql - migrate Cloud SQL instance to
        an AlloyDB cluster using an existing Cloud SQL backup

SYNOPSIS
    gcloud alloydb clusters migrate-cloud-sql CLUSTER
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

DESCRIPTION
    Migrate Cloud SQL instance to an AlloyDB cluster using an existing Cloud
    SQL backup.

EXAMPLES
    To migrate a Cloud SQL instance to an AlloyDB cluster from a backup, run:

        $ gcloud alloydb clusters migrate-cloud-sql my-alloydb-cluster \
          --region=us-central1 \
          --cloud-sql-project-id=my-cloud-sql-project-id \
          --cloud-sql-instance-id=my-cloud-sql-cluster-id \
          --cloud-sql-backup-id=my-cloud-sql-backup-id

POSITIONAL ARGUMENTS
     CLUSTER
        AlloyDB cluster ID

REQUIRED FLAGS
     Migrate Cloud SQL strategy.

     This must be specified.

       Migrate CloudSQL instance to an AlloyDB cluster by restoring from an
       existing backup.

       --cloud-sql-backup-id=CLOUD_SQL_BACKUP_ID
          CloudSQL backup ID to migrate from. This must be the backup ID
          (myBackup).

     --cloud-sql-instance-id=CLOUD_SQL_INSTANCE_ID
        CloudSQL instance ID to migrate from. This must be the instance ID
        (myInstance).

     --cloud-sql-project-id=CLOUD_SQL_PROJECT_ID
        CloudSQL project to migrate from. This must be the project ID
        (myProject).

     --password=PASSWORD
        Initial postgres user password to set up during cluster creation.

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

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

     --database-version=DATABASE_VERSION
        Database version of the cluster. DATABASE_VERSION must be one of:
        POSTGRES_14, POSTGRES_15, POSTGRES_16, POSTGRES_17, POSTGRES_18.

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

     --subscription-type=SUBSCRIPTION_TYPE
        Subscription type of the cluster. SUBSCRIPTION_TYPE must be one of:
        STANDARD, TRIAL.

     --tags=[KEY=VALUE,...]
        List of tags KEY=VALUE pairs to bind. Each item must be expressed as
        <tag-key-namespaced-name>=<tag-value-short-name>.

        Example: 123/environment=production,123/costCenter=marketing

     Continuous Backup configuration. If unspecified, continuous backups are
     enabled.

     --continuous-backup-recovery-window-days=RECOVERY_PERIOD
        Recovery window of the log files and backups saved to support
        Continuous Backups.

     --enable-continuous-backup
        Enables Continuous Backups on the cluster.

     Key resource - The Cloud KMS (Key Management Service) cryptokey that will
     be used to protect the continuous backup. The 'AlloyDB Service Agent's
     service account must hold permission 'Cloud KMS CryptoKey
     Encrypter/Decrypter'. The arguments in this group can be used to specify
     the attributes of this resource.

     --continuous-backup-encryption-key=CONTINUOUS_BACKUP_ENCRYPTION_KEY
        ID of the key or fully qualified identifier for the key.

        To set the kms-key attribute:
        * provide the argument --continuous-backup-encryption-key on the
          command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --continuous-backup-encryption-key-keyring=CONTINUOUS_BACKUP_ENCRYPTION_KEY_KEYRING
        The KMS keyring of the key.

        To set the kms-keyring attribute:
        * provide the argument --continuous-backup-encryption-key on the
          command line with a fully specified name;
        * provide the argument --continuous-backup-encryption-key-keyring on
          the command line.

     --continuous-backup-encryption-key-location=CONTINUOUS_BACKUP_ENCRYPTION_KEY_LOCATION
        The Google Cloud location for the key.

        To set the kms-location attribute:
        * provide the argument --continuous-backup-encryption-key on the
          command line with a fully specified name;
        * provide the argument --continuous-backup-encryption-key-location on
          the command line.

     --continuous-backup-encryption-key-project=CONTINUOUS_BACKUP_ENCRYPTION_KEY_PROJECT
        The Google Cloud project for the key.

        To set the kms-project attribute:
        * provide the argument --continuous-backup-encryption-key on the
          command line with a fully specified name;
        * provide the argument --continuous-backup-encryption-key-project on
          the command line;
        * set the property core/project.

     Specify preferred day and time for maintenance deny period.

     --deny-maintenance-period-end-date=DENY_MAINTENANCE_PERIOD_END_DATE
        Date when the deny maintenance period ends, that is 2020-11-01 or 11-01
        for recurring.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --deny-maintenance-period-start-date=DENY_MAINTENANCE_PERIOD_START_DATE
        Date when the deny maintenance period begins, that is 2020-11-01 or
        11-01 for recurring.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --deny-maintenance-period-time=DENY_MAINTENANCE_PERIOD_TIME
        Time when the deny maintenance period starts and ends, for example
        05:00, in UTC time zone.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     Automated backup policy. If unspecified, automated backups are disabled.

     At most one of these can be specified:

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

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --automated-backup-start-times=[START_TIMES,...]
            Comma-separated list of times during the day to start a backup. At
            least one start time must be provided. The start times are assumed
            to be in UTC and required to be an exact hour in the format HH:00.
            (e.g., --automated-backup-start-times=01:00,13:00)

            This flag argument must be specified if any of the other arguments
            in this group are specified.

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

     Specify preferred day and time for maintenance.

     --maintenance-window-day=MAINTENANCE_WINDOW_DAY
        Day of week for maintenance window, in UTC time zone.
        MAINTENANCE_WINDOW_DAY must be one of: MONDAY, TUESDAY, WEDNESDAY,
        THURSDAY, FRIDAY, SATURDAY, SUNDAY.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --maintenance-window-hour=MAINTENANCE_WINDOW_HOUR
        Hour of day for maintenance window, in UTC time zone.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb clusters migrate-cloud-sql

        $ gcloud beta alloydb clusters migrate-cloud-sql
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud alloydb clusters migrate-cloud-sql my-alloydb-cluster \
    --region=us-central1 \
    --cloud-sql-project-id=my-cloud-sql-project-id \
    --cloud-sql-instance-id=my-cloud-sql-cluster-id \
    --cloud-sql-backup-id=1234567890 \
    --password=PASSWORD
```

### gcloud alloydb clusters promote

```text
NAME
    gcloud alloydb clusters promote - promote an AlloyDB SECONDARY cluster in a
        given project and region

SYNOPSIS
    gcloud alloydb clusters promote CLUSTER --region=REGION [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Promote an AlloyDB SECONDARY cluster in a given project and region.

EXAMPLES
    To promote a cluster, run:

        $ gcloud alloydb clusters promote my-cluster --region=us-central1

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

        $ gcloud alpha alloydb clusters promote

        $ gcloud beta alloydb clusters promote
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `import` example ends with a stray double quote after `--user=my-user`, which opens a quoted string that is never closed (the shell waits for more input); the runnable form removes it.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `migrate-cloud-sql` example passes `--cloud-sql-backup-id=my-cloud-sql-backup-id`, but gcloud 593.0.0 parses the flag as an integer ("invalid int value"), and it omits `--password`, which the SYNOPSIS and REQUIRED FLAGS list as required ("argument --password: Must be specified"); the runnable form passes the numeric sample ID `1234567890` (use the ID of the Cloud SQL backup) and `--password=PASSWORD` (the initial `postgres` user password).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
