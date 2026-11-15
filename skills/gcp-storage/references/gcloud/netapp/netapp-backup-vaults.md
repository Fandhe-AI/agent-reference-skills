---
source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/backup-vaults
---

# gcloud netapp backup-vaults

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud netapp backup-vaults backups create

```text
NAME
    gcloud netapp backup-vaults backups create - create a Cloud NetApp Backup

SYNOPSIS
    gcloud netapp backup-vaults backups create (BACKUP : --location=LOCATION)
        (--ontap-source=[snapshot-uuid=SNAPSHOT-UUID],
          [storage-pool=STORAGE-POOL],[volume-uuid=VOLUME-UUID]
          | --source-snapshot=SOURCE_SNAPSHOT --source-volume=SOURCE_VOLUME)
        [--async] [--backup-vault=BACKUP_VAULT] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud NetApp Backup.

EXAMPLES
    The following command creates a Backup named BACKUP attached to a Backup
    Vault named BACKUP_VAULT, and a source volume named SOURCE_VOL
    asynchronously using the specified arguments:

        $ gcloud netapp backup-vaults backups create BACKUP \
          --location=LOCATION --async --backup-vault=BACKUP_VAULT \
          --source-volume=SOURCE_VOL

POSITIONAL ARGUMENTS
     Backup resource - The Backup to create The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the backup_vault attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --backup-vault on the command line.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the backup.

          To set the location attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --ontap-source=[snapshot-uuid=SNAPSHOT-UUID],[storage-pool=STORAGE-POOL],[volume-uuid=VOLUME-UUID]
          ONTAP source for the backup.

          It consists of the following fields:
          + storage-pool: The storage pool of the source volume.
          + volume-uuid: The UUID of the source volume.
          + snapshot-uuid: The UUID of the source snapshot (optional).

       Or at least one of these can be specified:

         Snapshot resource - The full name of the Source Snapshot that the
         Backup is based on', Format:
         projects/{project_id}/locations/{location}/volumes/{volume_id}/snapshots/{snapshot_id}
         This represents a Cloud resource. (NOTE) Some attributes are not given
         arguments in this group but can be set in other ways.

         To set the project attribute:
          - provide the argument --source-snapshot on the command line with a
            fully specified name;
          - provide the argument --project on the command line;
          - set the property core/project.

         To set the location attribute:
          - provide the argument --source-snapshot on the command line with a
            fully specified name;
          - set the property netapp/location.

         To set the volume attribute:
          - provide the argument --source-snapshot on the command line with a
            fully specified name.

         --source-snapshot=SOURCE_SNAPSHOT
            ID of the snapshot or fully qualified identifier for the snapshot.

            To set the snapshot attribute:
            - provide the argument --source-snapshot on the command line.

         Volume resource - The full name of the Source Volume that the Backup
         is based on', Format:
         projects/{projects_id}/locations/{location}/volumes/{volume_id} This
         represents a Cloud resource. (NOTE) Some attributes are not given
         arguments in this group but can be set in other ways.

         To set the project attribute:
          - provide the argument --source-volume on the command line with a
            fully specified name;
          - provide the argument --volume on the command line with a fully
            specified name;
          - provide the argument --project on the command line;
          - set the property core/project.

         To set the location attribute:
          - provide the argument --source-volume on the command line with a
            fully specified name;
          - provide the argument --volume on the command line with a fully
            specified name;
          - provide the argument --location on the command line;
          - set the property netapp/location.

         --source-volume=SOURCE_VOLUME
            ID of the volume or fully qualified identifier for the volume.

            To set the volume attribute:
            - provide the argument --source-volume on the command line;
            - provide the argument --volume on the command line.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Backup vault resource - The Backup Vault that the Backup is stored in This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --backup-vault on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --backup-vault on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --backup-vault=BACKUP_VAULT
        ID of the backup_vault or fully qualified identifier for the
        backup_vault.

        To set the backup_vault attribute:
        * provide the argument --backup-vault on the command line.

     --description=DESCRIPTION
        A description of the Cloud NetApp Backup Vault

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta netapp backup-vaults backups create
```

### gcloud netapp backup-vaults backups delete

```text
NAME
    gcloud netapp backup-vaults backups delete - delete a Cloud NetApp Backup

SYNOPSIS
    gcloud netapp backup-vaults backups delete (BACKUP : --location=LOCATION)
        [--async] [--backup-vault=BACKUP_VAULT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Cloud NetApp Backup.

EXAMPLES
    The following command deletes a Backup named BACKUP inside a backup vault
    named BACKUP_VAULT using the required arguments:

        $ gcloud netapp backup-vaults backups delete BACKUP \
          --location=us-central1 --backup-vault=BACKUP_VAULT

    To delete a Backup named BACKUP asynchronously, run the following command:

        $ gcloud netapp backup-vaults backups delete BACKUP \
          --location=us-central1 --backup-vault=BACKUP_VAULT --async

POSITIONAL ARGUMENTS
     Backup resource - The Backup to delete. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the backup_vault attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --backup-vault on the command line.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the backup.

          To set the location attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Backup vault resource - The Backup Vault that the Backup is stored in This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --backup-vault on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --backup-vault on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --backup-vault=BACKUP_VAULT
        ID of the backup_vault or fully qualified identifier for the
        backup_vault.

        To set the backup_vault attribute:
        * provide the argument --backup-vault on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta netapp backup-vaults backups delete
```

### gcloud netapp backup-vaults backups describe

```text
NAME
    gcloud netapp backup-vaults backups describe - describe a Cloud NetApp
        Backup

SYNOPSIS
    gcloud netapp backup-vaults backups describe (BACKUP : --location=LOCATION)
        [--backup-vault=BACKUP_VAULT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud NetApp Backup.

EXAMPLES
    The following command describes a Backup named BACKUP in the given location
    and backup vault:

        $ gcloud netapp backup-vaults backups describe NAME \
          --location=us-central1 --backup-vault=BACKUP_VAULT

POSITIONAL ARGUMENTS
     Backup resource - The Backup to describe. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the backup_vault attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --backup-vault on the command line.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the backup.

          To set the location attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     Backup vault resource - The Backup Vault that the Backup is stored in This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --backup-vault on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --backup-vault on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --backup-vault=BACKUP_VAULT
        ID of the backup_vault or fully qualified identifier for the
        backup_vault.

        To set the backup_vault attribute:
        * provide the argument --backup-vault on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta netapp backup-vaults backups describe
```

### gcloud netapp backup-vaults backups list

```text
NAME
    gcloud netapp backup-vaults backups list - list Cloud NetApp Backups

SYNOPSIS
    gcloud netapp backup-vaults backups list [--backup-vault=BACKUP_VAULT]
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists Cloud NetApp Backups.

EXAMPLES
    The following command lists all Backups in the given location and Backup
    Vault named BACKUP_VAULT:

        $ gcloud netapp backup-vaults backups list --location=us-central1 \
          --backup-vault=BACKUP_VAULT

FLAGS
     Backup vault resource - The Backup Vault that the Backup is stored in This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --backup-vault on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --backup-vault on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --backup-vault=BACKUP_VAULT
        ID of the backup_vault or fully qualified identifier for the
        backup_vault.

        To set the backup_vault attribute:
        * provide the argument --backup-vault on the command line.

     Location resource - The location in which to list Backups. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

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
    This variant is also available:

        $ gcloud beta netapp backup-vaults backups list
```

### gcloud netapp backup-vaults backups update

```text
NAME
    gcloud netapp backup-vaults backups update - update a Cloud NetApp Backup

SYNOPSIS
    gcloud netapp backup-vaults backups update (BACKUP : --location=LOCATION)
        [--async] [--backup-vault=BACKUP_VAULT] [--description=DESCRIPTION]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Cloud NetApp Backup and its specified parameters.

EXAMPLES
    The following command updates a Backup named BACKUP and its specified
    parameters:

        $ gcloud netapp backup-vaults backups update NAME \
          --location=us-central1 --description="new description"

POSITIONAL ARGUMENTS
     Backup resource - The Backup to update The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the backup_vault attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --backup-vault on the command line.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the backup.

          To set the location attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Backup vault resource - The Backup Vault that the Backup is stored in This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --backup-vault on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --backup-vault on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --backup-vault=BACKUP_VAULT
        ID of the backup_vault or fully qualified identifier for the
        backup_vault.

        To set the backup_vault attribute:
        * provide the argument --backup-vault on the command line.

     --description=DESCRIPTION
        A description of the Cloud NetApp Backup

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud netapp backup-vaults backups update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud netapp backup-vaults backups update --clear-labels \
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
    This variant is also available:

        $ gcloud beta netapp backup-vaults backups update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud netapp backup-vaults backups update NAME \
    --backup-vault=BACKUP_VAULT \
    --location=us-central1 \
    --description="new description"
```

### gcloud netapp backup-vaults create

```text
NAME
    gcloud netapp backup-vaults create - create a Cloud NetApp Backup Vault

SYNOPSIS
    gcloud netapp backup-vaults create (BACKUP_VAULT : --location=LOCATION)
        [--async]
        [--backup-retention-policy=[backup-minimum-enforced-retention-days=BACKUP-MINIMUM-ENFORCED-RETENTION-DAYS],
          [daily-backup-immutable=DAILY-BACKUP-IMMUTABLE],
          [manual-backup-immutable=MANUAL-BACKUP-IMMUTABLE],
          [monthly-backup-immutable=MONTHLY-BACKUP-IMMUTABLE],
          [weekly-backup-immutable=WEEKLY-BACKUP-IMMUTABLE]]
        [--description=DESCRIPTION] [--kms-config=KMS_CONFIG]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud NetApp Backup Vault.

EXAMPLES
    The following command creates a Backup Vault named BACKUP_VAULT
    asynchronously using the specified arguments:

        $ gcloud netapp backup-vaults create BACKUP_VAULT \
          --location=LOCATION --async --description="test" The following \
          command creates a Backup Vault named CMEK_BACKUP_VAULT with a \
          KMS config:

        $ gcloud netapp backup-vaults create CMEK_BACKUP_VAULT \
          --location=LOCATION \
          --kms-config=projects/PROJECT/locations/LOCATION/kmsConfigs/\
        KMS_CONFIG

POSITIONAL ARGUMENTS
     Backup vault resource - The Backup Vault to create The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument backup_vault on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_VAULT
          ID of the backup_vault or fully qualified identifier for the
          backup_vault.

          To set the backup_vault attribute:
          + provide the argument backup_vault on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the backup_vault.

          To set the location attribute:
          + provide the argument backup_vault on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --backup-retention-policy=[backup-minimum-enforced-retention-days=BACKUP-MINIMUM-ENFORCED-RETENTION-DAYS],[daily-backup-immutable=DAILY-BACKUP-IMMUTABLE],[manual-backup-immutable=MANUAL-BACKUP-IMMUTABLE],[monthly-backup-immutable=MONTHLY-BACKUP-IMMUTABLE],[weekly-backup-immutable=WEEKLY-BACKUP-IMMUTABLE]
        Backup Retention Policy of the Backup Vault.

        Backup Retention Policy allows you to configure the retention policy
        for backups created within this vault. It consists of several fields
        that govern how long backups are kept and what type of backups are
        immutable.

     --description=DESCRIPTION
        A description of the Cloud NetApp Backup Vault

     Kms config resource - The resource name of the KMS Config to use for
     encrypting backups within this backup vault. Format:
     projects/{project_id}/locations/{location}/kmsConfigs/{kms_config_id} This
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta netapp backup-vaults create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud netapp backup-vaults create BACKUP_VAULT \
    --location=LOCATION \
    --async \
    --description="test"

gcloud netapp backup-vaults create CMEK_BACKUP_VAULT \
    --location=LOCATION \
    --kms-config=projects/PROJECT/locations/LOCATION/kmsConfigs/KMS_CONFIG
```

### gcloud netapp backup-vaults delete

```text
NAME
    gcloud netapp backup-vaults delete - delete a Cloud NetApp Volumes Backup
        Vault

SYNOPSIS
    gcloud netapp backup-vaults delete (BACKUP_VAULT : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Backup Vault.

EXAMPLES
    The following command deletes a Backup Vault instance named BACKUP_VAULT in
    the default netapp/location:

        $ gcloud netapp backup-vaults delete BACKUP_VAULT

    To delete a Backup Vault named BACKUP_VAULT asynchronously, run the
    following command:

        $ gcloud netapp backup-vaults delete BACKUP_VAULT --async

POSITIONAL ARGUMENTS
     Backup vault resource - The Backup Vault to delete The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument backup_vault on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_VAULT
          ID of the backup_vault or fully qualified identifier for the
          backup_vault.

          To set the backup_vault attribute:
          + provide the argument backup_vault on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the backup_vault.

          To set the location attribute:
          + provide the argument backup_vault on the command line with a
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
    This variant is also available:

        $ gcloud beta netapp backup-vaults delete
```

### gcloud netapp backup-vaults describe

```text
NAME
    gcloud netapp backup-vaults describe - show metadata for a Cloud NetApp
        Volumes Backup Vault

SYNOPSIS
    gcloud netapp backup-vaults describe (BACKUP_VAULT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Backup Vault.

EXAMPLES
    The following command gets metadata using describe for a Backup Vault
    instance named BACKUP_VAULT in the default netapp/location:

        $ gcloud netapp backup-vaults describe BACKUP_VAULT

    To get metadata on a Backup Vault named BACKUP_VAULT in a specified
    location, run:

        $ gcloud netapp backup-vaults describe BACKUP_VAULT \
          --location=us-central1

POSITIONAL ARGUMENTS
     Backup vault resource - The Backup Vault to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument backup_vault on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_VAULT
          ID of the backup_vault or fully qualified identifier for the
          backup_vault.

          To set the backup_vault attribute:
          + provide the argument backup_vault on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the backup_vault.

          To set the location attribute:
          + provide the argument backup_vault on the command line with a
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
    This variant is also available:

        $ gcloud beta netapp backup-vaults describe
```

### gcloud netapp backup-vaults list

```text
NAME
    gcloud netapp backup-vaults list - list Cloud NetApp Volumes Backup Vaults

SYNOPSIS
    gcloud netapp backup-vaults list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists Cloud NetApp Backup Vaults to store Cloud NetApp Volumes Backups.

EXAMPLES
    The following command lists all Backup Vaults in the default
    netapp/location

        $ gcloud netapp backup-vaults list

    To list all Backup Vaults in a specified location, run:

        $ gcloud netapp backup-vaults list --location=us-central1

FLAGS
     Location resource - The location in which to list Backup Vaults. This
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
    This variant is also available:

        $ gcloud beta netapp backup-vaults list
```

### gcloud netapp backup-vaults update

```text
NAME
    gcloud netapp backup-vaults update - update a Cloud NetApp Volumes Backup
        Vault

SYNOPSIS
    gcloud netapp backup-vaults update (BACKUP_VAULT : --location=LOCATION)
        [--async]
        [--backup-retention-policy=[backup-minimum-enforced-retention-days=BACKUP-MINIMUM-ENFORCED-RETENTION-DAYS],
          [daily-backup-immutable=DAILY-BACKUP-IMMUTABLE],
          [manual-backup-immutable=MANUAL-BACKUP-IMMUTABLE],
          [monthly-backup-immutable=MONTHLY-BACKUP-IMMUTABLE],
          [weekly-backup-immutable=WEEKLY-BACKUP-IMMUTABLE]]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates a Backup Vault

EXAMPLES
    The following command updates a Backup Vault instance named BACKUP_VAULT

        $ gcloud netapp backup-vaults update BACKUP_VAULT \
          --location=us-central1 --description="new description" \
          --update-labels=newkey=newval

    To update a Backup Vault named BACKUP_VAULT asynchronously, run the
    following command:

        $ gcloud netapp backup-vaults update BACKUP_VAULT --async \
          --location=us-central1 --description="new description" \
          --update-labels=newkey=newval

POSITIONAL ARGUMENTS
     Backup vault resource - The Backup Vault to update The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument backup_vault on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_VAULT
          ID of the backup_vault or fully qualified identifier for the
          backup_vault.

          To set the backup_vault attribute:
          + provide the argument backup_vault on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the backup_vault.

          To set the location attribute:
          + provide the argument backup_vault on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --backup-retention-policy=[backup-minimum-enforced-retention-days=BACKUP-MINIMUM-ENFORCED-RETENTION-DAYS],[daily-backup-immutable=DAILY-BACKUP-IMMUTABLE],[manual-backup-immutable=MANUAL-BACKUP-IMMUTABLE],[monthly-backup-immutable=MONTHLY-BACKUP-IMMUTABLE],[weekly-backup-immutable=WEEKLY-BACKUP-IMMUTABLE]
        Backup Retention Policy of the Backup Vault.

        Backup Retention Policy allows you to configure the retention policy
        for backups created within this vault. It consists of several fields
        that govern how long backups are kept and what type of backups are
        immutable.

     --description=DESCRIPTION
        A description of the Cloud NetApp Backup Vault

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud netapp backup-vaults update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud netapp backup-vaults update --clear-labels \
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
    This variant is also available:

        $ gcloud beta netapp backup-vaults update
```

### gcloud beta netapp backup-vaults backups create

```text
NAME
    gcloud beta netapp backup-vaults backups create - create a Cloud NetApp
        Backup

SYNOPSIS
    gcloud beta netapp backup-vaults backups create
        (BACKUP : --location=LOCATION)
        (--ontap-source=[snapshot-uuid=SNAPSHOT-UUID],
          [storage-pool=STORAGE-POOL],[volume-uuid=VOLUME-UUID]
          | --source-snapshot=SOURCE_SNAPSHOT --source-volume=SOURCE_VOLUME)
        [--async] [--backup-vault=BACKUP_VAULT] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp backup-vaults backups delete

```text
NAME
    gcloud beta netapp backup-vaults backups delete - delete a Cloud NetApp
        Backup

SYNOPSIS
    gcloud beta netapp backup-vaults backups delete
        (BACKUP : --location=LOCATION) [--async] [--backup-vault=BACKUP_VAULT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp backup-vaults backups describe

```text
NAME
    gcloud beta netapp backup-vaults backups describe - describe a Cloud NetApp
        Backup

SYNOPSIS
    gcloud beta netapp backup-vaults backups describe
        (BACKUP : --location=LOCATION) [--backup-vault=BACKUP_VAULT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp backup-vaults backups list

```text
NAME
    gcloud beta netapp backup-vaults backups list - list Cloud NetApp Backups

SYNOPSIS
    gcloud beta netapp backup-vaults backups list [--backup-vault=BACKUP_VAULT]
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp backup-vaults backups update

```text
NAME
    gcloud beta netapp backup-vaults backups update - update a Cloud NetApp
        Backup

SYNOPSIS
    gcloud beta netapp backup-vaults backups update
        (BACKUP : --location=LOCATION) [--async] [--backup-vault=BACKUP_VAULT]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp backup-vaults create

```text
NAME
    gcloud beta netapp backup-vaults create - create a Cloud NetApp Backup
        Vault

SYNOPSIS
    gcloud beta netapp backup-vaults create
        (BACKUP_VAULT : --location=LOCATION) [--async]
        [--backup-region=BACKUP_REGION]
        [--backup-retention-policy=[backup-minimum-enforced-retention-days=BACKUP-MINIMUM-ENFORCED-RETENTION-DAYS],
          [daily-backup-immutable=DAILY-BACKUP-IMMUTABLE],
          [manual-backup-immutable=MANUAL-BACKUP-IMMUTABLE],
          [monthly-backup-immutable=MONTHLY-BACKUP-IMMUTABLE],
          [weekly-backup-immutable=WEEKLY-BACKUP-IMMUTABLE]]
        [--backup-vault-type=BACKUP_VAULT_TYPE] [--[no-]cross-project-vault]
        [--description=DESCRIPTION] [--kms-config=KMS_CONFIG]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp backup-vaults delete

```text
NAME
    gcloud beta netapp backup-vaults delete - delete a Cloud NetApp Volumes
        Backup Vault

SYNOPSIS
    gcloud beta netapp backup-vaults delete
        (BACKUP_VAULT : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp backup-vaults describe

```text
NAME
    gcloud beta netapp backup-vaults describe - show metadata for a Cloud
        NetApp Volumes Backup Vault

SYNOPSIS
    gcloud beta netapp backup-vaults describe
        (BACKUP_VAULT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp backup-vaults list

```text
NAME
    gcloud beta netapp backup-vaults list - list Cloud NetApp Volumes Backup
        Vaults

SYNOPSIS
    gcloud beta netapp backup-vaults list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp backup-vaults update

```text
NAME
    gcloud beta netapp backup-vaults update - update a Cloud NetApp Volumes
        Backup Vault

SYNOPSIS
    gcloud beta netapp backup-vaults update
        (BACKUP_VAULT : --location=LOCATION) [--async]
        [--backup-retention-policy=[backup-minimum-enforced-retention-days=BACKUP-MINIMUM-ENFORCED-RETENTION-DAYS],
          [daily-backup-immutable=DAILY-BACKUP-IMMUTABLE],
          [manual-backup-immutable=MANUAL-BACKUP-IMMUTABLE],
          [monthly-backup-immutable=MONTHLY-BACKUP-IMMUTABLE],
          [weekly-backup-immutable=WEEKLY-BACKUP-IMMUTABLE]]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the backups `update` example omits `--backup-vault`; the backup resource takes its backup vault from a fully specified name or `--backup-vault` (POSITIONAL ARGUMENTS), and gcloud 593.0.0 fails with "Error parsing [backup]" without it, so the runnable form adds `--backup-vault=BACKUP_VAULT` as in the other backups examples.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the first `create` example ends its last line with a backslash, so the sentence that introduces the next example ("The following command creates a Backup Vault named CMEK_BACKUP_VAULT with a KMS config:") becomes part of the command; the runnable form ends the command after `--description="test"`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/backup-vaults (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
