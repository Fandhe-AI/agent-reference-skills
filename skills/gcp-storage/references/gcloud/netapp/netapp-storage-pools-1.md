---
source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/storage-pools
---

# gcloud netapp storage-pools (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud netapp storage-pools create

```text
NAME
    gcloud netapp storage-pools create - create a Cloud NetApp Storage Pool

SYNOPSIS
    gcloud netapp storage-pools create (STORAGE_POOL : --location=LOCATION)
        --capacity=CAPACITY --network=[name=NAME],[psa-range=PSA-RANGE]
        --service-level=SERVICE_LEVEL [--active-directory=ACTIVE_DIRECTORY]
        [--allow-auto-tiering=ALLOW_AUTO_TIERING] [--async]
        [--custom-performance-enabled=CUSTOM_PERFORMANCE_ENABLED]
        [--description=DESCRIPTION] [--enable-ldap=ENABLE_LDAP]
        [--kms-config=KMS_CONFIG] [--labels=[KEY=VALUE,...]] [--mode=MODE]
        [--qos-type=QOS_TYPE] [--replica-zone=REPLICA_ZONE]
        [--scale-type=SCALE_TYPE] [--total-iops=TOTAL_IOPS]
        [--total-throughput=TOTAL_THROUGHPUT] [--type=TYPE] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a Storage Pool to contain Volumes with a specified Service Level
    and capacity.

EXAMPLES
    The following command creates a Storage Pool named NAME using all possible
    arguments with a VPC network in the same project

        $ gcloud netapp storage-pools create NAME --location=us-central1 \
          --service-level=standard --capacity=2048 \
          --network=name=default --active-directory=ad1 \
          --kms-config=kms-config1 --enable-ldap=true \
          --description="example description"

    The following command creates a Storage pool named NAME using all possible
    arguments with a shared VPC network in a separate project called
    VPC_PROJECT

        $ gcloud netapp storage-pools create NAME --location=us-central1 \
          --service-level=standard --capacity=2048 \
          --network=name=projects/VPC_PROJECT/locations/us-central1/\
        networks/default --active-directory=ad1 --kms-config=kms-config1 \
            --enable-ldap=true --description="example description"

POSITIONAL ARGUMENTS
     Storage pool resource - The Storage Pool to create. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument storage_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       STORAGE_POOL
          ID of the storage_pool or fully qualified identifier for the
          storage_pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the storage_pool.

          To set the location attribute:
          + provide the argument storage_pool on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

REQUIRED FLAGS
     --capacity=CAPACITY
        The desired capacity of the Storage Pool in GiB or TiB units.If no
        capacity unit is specified, GiB is assumed.

     --network=[name=NAME],[psa-range=PSA-RANGE]
        Network configuration for a Cloud NetApp Files Storage Pool. Specifying
        psa-range is optional.
         name
            The name of the Google Compute Engine VPC network to which the
            volume is connected. Short-form (VPC network ID) or long-form (full
            VPC network name:
            projects/PROJECT/locations/LOCATION/networks/NETWORK) are both
            accepted, but please use the long-form when attempting to create a
            Storage Pool using a shared VPC.
         psa-range
            This field is not implemented. The values provided in this field
            are ignored.

     --service-level=SERVICE_LEVEL
        The service level for the Cloud NetApp Storage Pool. For more details,
        see:
        https://cloud.google.com/netapp/volumes/docs/configure-and-use/storage-pools/overview#service_levels

        SERVICE_LEVEL must be one of:

         extreme
            Extreme Service Level for Cloud NetApp Storage Pool. The Extreme
            Service Level has a throughput per GiB of allocated volume size of
            128 KiB/s.
         flex
            Flex Service Level for Cloud NetApp Storage Pool. The Flex Service
            Level has a throughput per GiB of allocated volume size of 16
            KiB/s.
         premium
            Premium Service Level for Cloud NetApp Storage Pool. The Premium
            Service Level has a throughput per GiB of allocated volume size of
            64 KiB/s.
         standard
            Standard Service Level for Cloud NetApp Storage Pool. The Standard
            Service Level has a throughput per GiB of allocated volume size of
            16 KiB/s.

OPTIONAL FLAGS
     Active directory resource - The Active Directory to attach to the Storage
     Pool. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --active-directory on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --active-directory on the command line with a
        fully specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --active-directory=ACTIVE_DIRECTORY
        ID of the active_directory or fully qualified identifier for the
        active_directory.

        To set the active_directory attribute:
        * provide the argument --active-directory on the command line.

     --allow-auto-tiering=ALLOW_AUTO_TIERING
        Boolean flag indicating whether Storage Pool is allowed to use
        auto-tiering

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --custom-performance-enabled=CUSTOM_PERFORMANCE_ENABLED
        Boolean flag indicating whether Storage Pool is a custom performance
        Storage Pool or not

     --description=DESCRIPTION
        A description of the Cloud NetApp Storage Pool

     --enable-ldap=ENABLE_LDAP
        Boolean flag indicating whether Storage Pool is a NFS LDAP Storage Pool
        or not

     Kms config resource - The KMS config to attach to the Storage Pool. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --kms-config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --kms-config on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --kms-config=KMS_CONFIG
        ID of the kms_config or fully qualified identifier for the kms_config.

        To set the kms_config attribute:
        * provide the argument --kms-config on the command line.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --mode=MODE
        The mode of the Storage Pool. ONTAP mode is for performing ONTAP
        operations with ONTAP Mode APIs. DEFAULT mode is for performing
        operations allowed with NetApp Files APIs. MODE must be one of:
        default, ontap.

     --qos-type=QOS_TYPE
        Quality of service (QoS) type for the Storage Pool. QOS_TYPE must be
        one of: auto, manual, qos-type-unspecified.

     --replica-zone=REPLICA_ZONE
        String indicating replica zone for the Storage Pool

     --scale-type=SCALE_TYPE
        The scale type of the Storage Pool. default scale type is for standard
        capacity and performance. scaleout scale type is for higher capacity
        and performance. SCALE_TYPE must be one of: default, scaleout.

     --total-iops=TOTAL_IOPS
        Integer indicating total IOPS of the Storage Pool

     --total-throughput=TOTAL_THROUGHPUT
        The total throughput of the Storage Pool in MiB/s or GiB/s units. If no
        throughput unit is specified, MiB/s is assumed.

     --type=TYPE
        The type of the Storage Pool. FILE pools support file-based volumes
        only. UNIFIED pools support both file and block volumes. TYPE must be
        one of:

         file
            File-based volumes only (default).
         unified
            Both file and block volumes.

     --zone=ZONE
        String indicating active zone of the Storage Pool

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp storage-pools create

        $ gcloud beta netapp storage-pools create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud netapp storage-pools create NAME \
    --location=us-central1 \
    --service-level=standard \
    --capacity=2048 \
    --network=name=projects/VPC_PROJECT/global/networks/default \
    --active-directory=ad1 \
    --kms-config=kms-config1 \
    --enable-ldap=true \
    --description="example description"
```

### gcloud netapp storage-pools delete

```text
NAME
    gcloud netapp storage-pools delete - delete a Cloud NetApp Storage Pool

SYNOPSIS
    gcloud netapp storage-pools delete (STORAGE_POOL : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Storage Pool

EXAMPLES
    The following command deletes a Storage Pool named NAME in the given
    location

        $ gcloud netapp storage-pools delete NAME --location=us-central1

    To delete a Storage Pool asynchronously, run the following command:

        $ gcloud netapp storage-pools delete NAME --location=us-central1 \
          --async

POSITIONAL ARGUMENTS
     Storage pool resource - The Storage Pool to delete. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument storage_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       STORAGE_POOL
          ID of the storage_pool or fully qualified identifier for the
          storage_pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the storage_pool.

          To set the location attribute:
          + provide the argument storage_pool on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

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

NOTES
    These variants are also available:

        $ gcloud alpha netapp storage-pools delete

        $ gcloud beta netapp storage-pools delete
```

### gcloud netapp storage-pools describe

```text
NAME
    gcloud netapp storage-pools describe - show metadata for a Cloud NetApp
        Storage Pool

SYNOPSIS
    gcloud netapp storage-pools describe (STORAGE_POOL : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Storage Pool

EXAMPLES
    The following command describes a Storage Pool named NAME in the given
    location

        $ gcloud netapp storage-pools describe NAME --location=us-central1

POSITIONAL ARGUMENTS
     Storage pool resource - The Storage Pool to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument storage_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       STORAGE_POOL
          ID of the storage_pool or fully qualified identifier for the
          storage_pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the storage_pool.

          To set the location attribute:
          + provide the argument storage_pool on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp storage-pools describe

        $ gcloud beta netapp storage-pools describe
```

### gcloud netapp storage-pools execute

```text
NAME
    gcloud netapp storage-pools execute - execute an ONTAP CLI command

SYNOPSIS
    gcloud netapp storage-pools execute (STORAGE_POOL : --location=LOCATION)
        ONTAP_COMMAND [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Execute an ONTAP CLI command.

POSITIONAL ARGUMENTS
     Storage pool resource - The Storage Pool to target. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument storage_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       STORAGE_POOL
          ID of the storage_pool or fully qualified identifier for the
          storage_pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the storage_pool.

          To set the location attribute:
          + provide the argument storage_pool on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

     ONTAP_COMMAND
        The ONTAP command to execute.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp storage-pools execute

        $ gcloud beta netapp storage-pools execute
```

### gcloud netapp storage-pools list

```text
NAME
    gcloud netapp storage-pools list - list Cloud NetApp Storage Pools

SYNOPSIS
    gcloud netapp storage-pools list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists Storage Pools

EXAMPLES
    The following command lists Storage Pools in the given location

        $ gcloud netapp storage-pools list --location=us-central1

FLAGS
     Location resource - The location in which to list Storage Pools. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * uses all locations by default. with a fully specified name;
      * set the property netapp/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * uses all locations by default.;
        * set the property netapp/location.

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

        $ gcloud alpha netapp storage-pools list

        $ gcloud beta netapp storage-pools list
```

### gcloud netapp storage-pools list-backup-configs

```text
NAME
    gcloud netapp storage-pools list-backup-configs - list backup
        configurations for all volumes in an ONTAP-mode Storage Pool

SYNOPSIS
    gcloud netapp storage-pools list-backup-configs
        (STORAGE_POOL : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists backup configurations for all volumes in an ONTAP-mode Storage Pool.

EXAMPLES
    The following command lists backup configurations in Storage Pool named
    NAME in location us-central1:

        $ gcloud netapp storage-pools list-backup-configs NAME \
          --location=us-central1

POSITIONAL ARGUMENTS
     Storage pool resource - The Storage Pool to list backup configs for. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument storage_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       STORAGE_POOL
          ID of the storage_pool or fully qualified identifier for the
          storage_pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the storage_pool.

          To set the location attribute:
          + provide the argument storage_pool on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

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

        $ gcloud alpha netapp storage-pools list-backup-configs

        $ gcloud beta netapp storage-pools list-backup-configs
```

### gcloud netapp storage-pools restore-volume

```text
NAME
    gcloud netapp storage-pools restore-volume - restore a backup to a volume
        in a specified ONTAP-mode Storage Pool

SYNOPSIS
    gcloud netapp storage-pools restore-volume
        (STORAGE_POOL : --location=LOCATION) --volume-uuid=VOLUME_UUID
        (--backup=BACKUP : --backup_vault=BACKUP_VAULT) [--async]
        [--file-list=[FILE_LIST,...]]
        [--restore-destination-path=RESTORE_DESTINATION_PATH]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Restores a backup to a volume within the specified Storage Pool.

    This command supports restoring from both Cloud NetApp Volumes backups and
    GCBDR (BackupDR) backups.

    This command supports both full backup restore and selective file restore:

    Full Backup Restore: The --volume-uuid must reference a Data Protection
    (DP) volume where the backup will be restored.

    File Restore: The --volume-uuid must reference a Read-Write (RW) volume
    where the file(s) from the backup will be restored. For file restore,
    --file-list and --restore-destination-path must be included in the request
    payload.

    For the complete backup restore, users should first create a Data
    Protection volume via the ONTAP Mode APIs whereas a Read-Write volume must
    be created first for selective file restore.

EXAMPLES
    The following command restores full backup from a backup with full resource
    name
    projects/my-project/locations/us-central1/backupVaults/my-vault/backups/backup-1
    to an ONTAP-mode volume with UUID 5dc61a44-3d99-11f1-b8ff-39021cc41d7a in
    Storage Pool named NAME.

        $ gcloud netapp storage-pools restore-volume NAME \
          --location=us-central1 \
          --backup=projects/my-project/locations/us-central1/\
        backupVaults/my-vault/backups/backup-1 \
            --volume-uuid=5dc61a44-3d99-11f1-b8ff-39021cc41d7a

    The following command restores full backup from a GCBDR (BackupDR) backup
    with full resource name
    projects/my-project/locations/us-central1/backupVaults/my-vault/dataSources/my-ds/backups/backup-1
    to an ONTAP-mode volume with UUID 5dc61a44-3d99-11f1-b8ff-39021cc41d7a in
    Storage Pool named NAME.

        $ gcloud netapp storage-pools restore-volume NAME \
          --location=us-central1 \
          --backup=projects/my-project/locations/us-central1/\
        backupVaults/my-vault/dataSources/my-ds/backups/backup-1 \
            --volume-uuid=5dc61a44-3d99-11f1-b8ff-39021cc41d7a

    The following command restores file1.txt from the same backup to an
    ONTAP-mode volume with UUID 5dc61a44-3d99-11f1-b8ff-39021cc41d7a in Storage
    Pool named NAME to the directory /my_restore_destination.

        $ gcloud netapp storage-pools restore-volume NAME \
          --location=us-central1 \
          --backup=projects/my-project/locations/us-central1/\
        backupVaults/my-vault/backups/backup-1 \
            --volume-uuid=5dc61a44-3d99-11f1-b8ff-39021cc41d7a \
            --file-list=/path/to/file1.txt \
            --restore-destination-path=/my_restore_destination

POSITIONAL ARGUMENTS
     Storage pool resource - The Storage Pool to restore into. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument storage_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       STORAGE_POOL
          ID of the storage_pool or fully qualified identifier for the
          storage_pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the storage_pool.

          To set the location attribute:
          + provide the argument storage_pool on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

REQUIRED FLAGS
     --volume-uuid=VOLUME_UUID
        The UUID of the ONTAP-mode volume to restore to.

     Backup resource - The Backup from which files are restored back to the
     Volume. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --backup on the command line with a fully
        specified name;
      * set the property netapp/location.

     This must be specified.

       --backup=BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument --backup on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --backup_vault=BACKUP_VAULT
          The Backup Vault of the backup.

          To set the backup_vault attribute:
          + provide the argument --backup on the command line with a fully
            specified name;
          + provide the argument --backup_vault on the command line;
          + provide the argument --backup-vault on the command line.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --file-list=[FILE_LIST,...]
        List of files to be restored in the form of their absolute path as in
        source volume.

     --restore-destination-path=RESTORE_DESTINATION_PATH
        Name of the absolute directory path in the destination volume.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp storage-pools restore-volume

        $ gcloud beta netapp storage-pools restore-volume
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud netapp storage-pools restore-volume NAME \
    --location=us-central1 \
    --backup=projects/my-project/locations/us-central1/backupVaults/my-vault/backups/backup-1 \
    --volume-uuid=5dc61a44-3d99-11f1-b8ff-39021cc41d7a

gcloud netapp storage-pools restore-volume NAME \
    --location=us-central1 \
    --backup=projects/my-project/locations/us-central1/backupVaults/my-vault/dataSources/my-ds/backups/backup-1 \
    --volume-uuid=5dc61a44-3d99-11f1-b8ff-39021cc41d7a

gcloud netapp storage-pools restore-volume NAME \
    --location=us-central1 \
    --backup=projects/my-project/locations/us-central1/backupVaults/my-vault/backups/backup-1 \
    --volume-uuid=5dc61a44-3d99-11f1-b8ff-39021cc41d7a \
    --file-list=/path/to/file1.txt \
    --restore-destination-path=/my_restore_destination
```

### gcloud netapp storage-pools switch

```text
NAME
    gcloud netapp storage-pools switch - switch a Regional Cloud NetApp Flex
        Storage Pool zone

SYNOPSIS
    gcloud netapp storage-pools switch (STORAGE_POOL : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Switch a Regional Cloud NetApp Flex Storage Pool zone.

EXAMPLES
    The following command switches zone of a Storage Pool named NAME using the
    required arguments:

        $ gcloud netapp storage-pools switch NAME --location=us-central1

    To switch zone of a Storage Pool named NAME asynchronously, run the
    following command:

        $ gcloud netapp storage-pools switch NAME --location=us-central1 \
          --async

POSITIONAL ARGUMENTS
     Storage pool resource - The Storage Pool to switch. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument storage_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       STORAGE_POOL
          ID of the storage_pool or fully qualified identifier for the
          storage_pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the storage_pool.

          To set the location attribute:
          + provide the argument storage_pool on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

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

NOTES
    These variants are also available:

        $ gcloud alpha netapp storage-pools switch

        $ gcloud beta netapp storage-pools switch
```

### gcloud netapp storage-pools update

```text
NAME
    gcloud netapp storage-pools update - update a Cloud NetApp Storage Pool

SYNOPSIS
    gcloud netapp storage-pools update (STORAGE_POOL : --location=LOCATION)
        [--active-directory=ACTIVE_DIRECTORY]
        [--allow-auto-tiering=ALLOW_AUTO_TIERING] [--async]
        [--capacity=CAPACITY] [--description=DESCRIPTION] [--qos-type=QOS_TYPE]
        [--replica-zone=REPLICA_ZONE] [--total-iops=TOTAL_IOPS]
        [--total-throughput=TOTAL_THROUGHPUT] [--update-labels=[KEY=VALUE,...]]
        [--zone=ZONE] [--clear-labels | --remove-labels=[KEY,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates a Storage Pool with given arguments

EXAMPLES
    The following command updates a Storage Pool named NAME in the given
    location

        $ gcloud netapp storage-pools update NAME --location=us-central1 \
          --capacity=4096 --active-directory=ad-2 \
          --description="new description" --update-labels=key1=val1

POSITIONAL ARGUMENTS
     Storage pool resource - The Storage Pool to update. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument storage_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       STORAGE_POOL
          ID of the storage_pool or fully qualified identifier for the
          storage_pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the storage_pool.

          To set the location attribute:
          + provide the argument storage_pool on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     Active directory resource - The Active Directory to attach to the Storage
     Pool. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --active-directory on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --active-directory on the command line with a
        fully specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --active-directory=ACTIVE_DIRECTORY
        ID of the active_directory or fully qualified identifier for the
        active_directory.

        To set the active_directory attribute:
        * provide the argument --active-directory on the command line.

     --allow-auto-tiering=ALLOW_AUTO_TIERING
        Boolean flag indicating whether Storage Pool is allowed to use
        auto-tiering

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --capacity=CAPACITY
        The desired capacity of the Storage Pool in GiB or TiB units.If no
        capacity unit is specified, GiB is assumed.

     --description=DESCRIPTION
        A description of the Cloud NetApp Storage Pool

     --qos-type=QOS_TYPE
        Quality of service (QoS) type for the Storage Pool. QOS_TYPE must be
        one of: auto, manual, qos-type-unspecified.

     --replica-zone=REPLICA_ZONE
        String indicating replica zone for the Storage Pool

     --total-iops=TOTAL_IOPS
        Integer indicating total IOPS of the Storage Pool

     --total-throughput=TOTAL_THROUGHPUT
        The total throughput of the Storage Pool in MiB/s or GiB/s units. If no
        throughput unit is specified, MiB/s is assumed.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --zone=ZONE
        String indicating active zone of the Storage Pool

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud netapp storage-pools update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud netapp storage-pools update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp storage-pools update

        $ gcloud beta netapp storage-pools update
```

### gcloud netapp storage-pools update-backup-config

```text
NAME
    gcloud netapp storage-pools update-backup-config - update backup config of
        a volume in an ONTAP-mode Storage Pool

SYNOPSIS
    gcloud netapp storage-pools update-backup-config
        (STORAGE_POOL : --location=LOCATION)
        --backup-config=[backup-policies=BACKUP-POLICIES],
          [backup-vault=BACKUP-VAULT],
          [enable-scheduled-backups=ENABLE-SCHEDULED-BACKUPS]
        --volume-uuid=VOLUME_UUID [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates the backup configuration of a volume within the specified Storage
    Pool.

EXAMPLES
    The following command updates the backup configuration of a volume with
    UUID 5dc61a44-3d99-11f1-b8ff-39021cc41d7a in an ONTAP-mode Storage Pool
    named NAME.

        $ gcloud netapp storage-pools update-backup-config NAME \
          --location=us-central1 \
          --volume-uuid=5dc61a44-3d99-11f1-b8ff-39021cc41d7a \
          --backup-config=backup-vault=my-vault,\
        enable-scheduled-backups=true

POSITIONAL ARGUMENTS
     Storage pool resource - The Storage Pool. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument storage_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       STORAGE_POOL
          ID of the storage_pool or fully qualified identifier for the
          storage_pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the storage_pool.

          To set the location attribute:
          + provide the argument storage_pool on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

REQUIRED FLAGS
     --backup-config=[backup-policies=BACKUP-POLICIES],[backup-vault=BACKUP-VAULT],[enable-scheduled-backups=ENABLE-SCHEDULED-BACKUPS]
        Backup Config contains backup related config on a volume in ONTAP-mode
        Storage Pool.

        Backup Config will have the following format:
        --backup-config=backup-policies=BACKUP_POLICIES,backup-vault=BACKUP_VAULT_NAME,enable-scheduled-backups=ENABLE_SCHEDULED_BACKUPS

        backup-policies is a pound-separated (#) list of backup policy names,
        backup-vault can include a single backup-vault resource name, and
        enable-scheduled-backups is a Boolean value indicating whether or not
        scheduled backups are enabled on the volume in the ONTAP-mode Storage
        Pool.

     --volume-uuid=VOLUME_UUID
        The UUID of the volume to update backup config for.

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

        $ gcloud alpha netapp storage-pools update-backup-config

        $ gcloud beta netapp storage-pools update-backup-config
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud netapp storage-pools update-backup-config NAME \
    --location=us-central1 \
    --volume-uuid=5dc61a44-3d99-11f1-b8ff-39021cc41d7a \
    --backup-config=backup-vault=my-vault,enable-scheduled-backups=true
```

### gcloud netapp storage-pools validate-directory-service

```text
NAME
    gcloud netapp storage-pools validate-directory-service - validate directory
        service for a Cloud Netapp storage pool

SYNOPSIS
    gcloud netapp storage-pools validate-directory-service
        (STORAGE_POOL : --location=LOCATION) [--async]
        [--directory-service-type=DIRECTORY_SERVICE_TYPE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Validate the directory service for a Cloud Netapp storage pool.

EXAMPLES
    The following command validates the directory service of type
    ACTIVE_DIRECTORY for a storage pool named NAME:

        $ gcloud netapp storage-pools validate-directory-service NAME \
          --location=us-central1 --directory-service-type=ACTIVE_DIRECTORY

POSITIONAL ARGUMENTS
     Storage pool resource - The Storage Pool to validate. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument storage_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       STORAGE_POOL
          ID of the storage_pool or fully qualified identifier for the
          storage_pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the storage_pool.

          To set the location attribute:
          + provide the argument storage_pool on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --directory-service-type=DIRECTORY_SERVICE_TYPE
        String indicating directory service type for the Storage Pool

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta netapp storage-pools validate-directory-service
```

### gcloud beta netapp storage-pools create

```text
NAME
    gcloud beta netapp storage-pools create - create a Cloud NetApp Storage
        Pool

SYNOPSIS
    gcloud beta netapp storage-pools create
        (STORAGE_POOL : --location=LOCATION) --capacity=CAPACITY
        --network=[name=NAME],[psa-range=PSA-RANGE]
        --service-level=SERVICE_LEVEL [--active-directory=ACTIVE_DIRECTORY]
        [--allow-auto-tiering=ALLOW_AUTO_TIERING] [--async]
        [--custom-performance-enabled=CUSTOM_PERFORMANCE_ENABLED]
        [--description=DESCRIPTION]
        [--enable-hot-tier-auto-resize=ENABLE_HOT_TIER_AUTO_RESIZE]
        [--enable-ldap=ENABLE_LDAP] [--hot-tier-size=HOT_TIER_SIZE]
        [--kms-config=KMS_CONFIG] [--labels=[KEY=VALUE,...]] [--mode=MODE]
        [--qos-type=QOS_TYPE] [--replica-zone=REPLICA_ZONE]
        [--scale-tier=SCALE_TIER] [--scale-type=SCALE_TYPE]
        [--total-iops=TOTAL_IOPS] [--total-throughput=TOTAL_THROUGHPUT]
        [--type=TYPE] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp storage-pools delete

```text
NAME
    gcloud beta netapp storage-pools delete - delete a Cloud NetApp Storage
        Pool

SYNOPSIS
    gcloud beta netapp storage-pools delete
        (STORAGE_POOL : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp storage-pools describe

```text
NAME
    gcloud beta netapp storage-pools describe - show metadata for a Cloud
        NetApp Storage Pool

SYNOPSIS
    gcloud beta netapp storage-pools describe
        (STORAGE_POOL : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp storage-pools execute

```text
NAME
    gcloud beta netapp storage-pools execute - execute an ONTAP CLI command

SYNOPSIS
    gcloud beta netapp storage-pools execute
        (STORAGE_POOL : --location=LOCATION) ONTAP_COMMAND
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp storage-pools list

```text
NAME
    gcloud beta netapp storage-pools list - list Cloud NetApp Storage Pools

SYNOPSIS
    gcloud beta netapp storage-pools list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp storage-pools list-backup-configs

```text
NAME
    gcloud beta netapp storage-pools list-backup-configs - list backup
        configurations for all volumes in an ONTAP-mode Storage Pool

SYNOPSIS
    gcloud beta netapp storage-pools list-backup-configs
        (STORAGE_POOL : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp storage-pools restore-volume

```text
NAME
    gcloud beta netapp storage-pools restore-volume - restore a backup to a
        volume in a specified ONTAP-mode Storage Pool

SYNOPSIS
    gcloud beta netapp storage-pools restore-volume
        (STORAGE_POOL : --location=LOCATION) --volume-uuid=VOLUME_UUID
        (--backup=BACKUP : --backup_vault=BACKUP_VAULT) [--async]
        [--file-list=[FILE_LIST,...]]
        [--restore-destination-path=RESTORE_DESTINATION_PATH]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp storage-pools switch

```text
NAME
    gcloud beta netapp storage-pools switch - switch a Regional Cloud NetApp
        Flex Storage Pool zone

SYNOPSIS
    gcloud beta netapp storage-pools switch
        (STORAGE_POOL : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp storage-pools update

```text
NAME
    gcloud beta netapp storage-pools update - update a Cloud NetApp Storage
        Pool

SYNOPSIS
    gcloud beta netapp storage-pools update
        (STORAGE_POOL : --location=LOCATION)
        [--active-directory=ACTIVE_DIRECTORY]
        [--allow-auto-tiering=ALLOW_AUTO_TIERING] [--async]
        [--capacity=CAPACITY] [--description=DESCRIPTION]
        [--enable-hot-tier-auto-resize=ENABLE_HOT_TIER_AUTO_RESIZE]
        [--hot-tier-size=HOT_TIER_SIZE] [--qos-type=QOS_TYPE]
        [--replica-zone=REPLICA_ZONE] [--total-iops=TOTAL_IOPS]
        [--total-throughput=TOTAL_THROUGHPUT] [--update-labels=[KEY=VALUE,...]]
        [--zone=ZONE] [--clear-labels | --remove-labels=[KEY,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp storage-pools update-backup-config

```text
NAME
    gcloud beta netapp storage-pools update-backup-config - update backup
        config of a volume in an ONTAP-mode Storage Pool

SYNOPSIS
    gcloud beta netapp storage-pools update-backup-config
        (STORAGE_POOL : --location=LOCATION)
        --backup-config=[backup-policies=BACKUP-POLICIES],
          [backup-vault=BACKUP-VAULT],
          [enable-scheduled-backups=ENABLE-SCHEDULED-BACKUPS]
        --volume-uuid=VOLUME_UUID [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp storage-pools validate-directory-service

```text
NAME
    gcloud beta netapp storage-pools validate-directory-service - validate
        directory service for a Cloud Netapp storage pool

SYNOPSIS
    gcloud beta netapp storage-pools validate-directory-service
        (STORAGE_POOL : --location=LOCATION) [--async]
        [--directory-service-type=DIRECTORY_SERVICE_TYPE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp storage-pools create

```text
NAME
    gcloud alpha netapp storage-pools create - create a Cloud NetApp Storage
        Pool

SYNOPSIS
    gcloud alpha netapp storage-pools create
        (STORAGE_POOL : --location=LOCATION) --capacity=CAPACITY
        --network=[name=NAME],[psa-range=PSA-RANGE]
        --service-level=SERVICE_LEVEL [--active-directory=ACTIVE_DIRECTORY]
        [--allow-auto-tiering=ALLOW_AUTO_TIERING] [--async]
        [--custom-performance-enabled=CUSTOM_PERFORMANCE_ENABLED]
        [--description=DESCRIPTION]
        [--enable-hot-tier-auto-resize=ENABLE_HOT_TIER_AUTO_RESIZE]
        [--enable-ldap=ENABLE_LDAP] [--hot-tier-size=HOT_TIER_SIZE]
        [--kms-config=KMS_CONFIG] [--labels=[KEY=VALUE,...]] [--mode=MODE]
        [--qos-type=QOS_TYPE] [--replica-zone=REPLICA_ZONE]
        [--scale-tier=SCALE_TIER] [--scale-type=SCALE_TYPE]
        [--total-iops=TOTAL_IOPS] [--total-throughput=TOTAL_THROUGHPUT]
        [--type=TYPE] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp storage-pools delete

```text
NAME
    gcloud alpha netapp storage-pools delete - delete a Cloud NetApp Storage
        Pool

SYNOPSIS
    gcloud alpha netapp storage-pools delete
        (STORAGE_POOL : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp storage-pools describe

```text
NAME
    gcloud alpha netapp storage-pools describe - show metadata for a Cloud
        NetApp Storage Pool

SYNOPSIS
    gcloud alpha netapp storage-pools describe
        (STORAGE_POOL : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp storage-pools execute

```text
NAME
    gcloud alpha netapp storage-pools execute - execute an ONTAP CLI command

SYNOPSIS
    gcloud alpha netapp storage-pools execute
        (STORAGE_POOL : --location=LOCATION) ONTAP_COMMAND
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp storage-pools list

```text
NAME
    gcloud alpha netapp storage-pools list - list Cloud NetApp Storage Pools

SYNOPSIS
    gcloud alpha netapp storage-pools list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp storage-pools list-backup-configs

```text
NAME
    gcloud alpha netapp storage-pools list-backup-configs - list backup
        configurations for all volumes in an ONTAP-mode Storage Pool

SYNOPSIS
    gcloud alpha netapp storage-pools list-backup-configs
        (STORAGE_POOL : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp storage-pools restore-volume

```text
NAME
    gcloud alpha netapp storage-pools restore-volume - restore a backup to a
        volume in a specified ONTAP-mode Storage Pool

SYNOPSIS
    gcloud alpha netapp storage-pools restore-volume
        (STORAGE_POOL : --location=LOCATION) --volume-uuid=VOLUME_UUID
        (--backup=BACKUP : --backup_vault=BACKUP_VAULT) [--async]
        [--file-list=[FILE_LIST,...]]
        [--restore-destination-path=RESTORE_DESTINATION_PATH]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp storage-pools switch

```text
NAME
    gcloud alpha netapp storage-pools switch - switch a Regional Cloud NetApp
        Flex Storage Pool zone

SYNOPSIS
    gcloud alpha netapp storage-pools switch
        (STORAGE_POOL : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the shared VPC example (and the `--network` description) write the long-form network name as `projects/VPC_PROJECT/locations/us-central1/networks/default`; the NetApp API v1 discovery document defines `StoragePool.network` as `projects/{project}/global/networks/{network}`, so the runnable form passes `projects/VPC_PROJECT/global/networks/default` (`name=` is the dictionary key of `--network`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/storage-pools (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
