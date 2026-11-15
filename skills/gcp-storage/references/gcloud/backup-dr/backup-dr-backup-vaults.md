---
source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backup-vaults
---

# gcloud backup-dr backup-vaults

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud backup-dr backup-vaults create

```text
NAME
    gcloud backup-dr backup-vaults create - create a Backup and DR backup vault

SYNOPSIS
    gcloud backup-dr backup-vaults create (BACKUP_VAULT : --location=LOCATION)
        --backup-min-enforced-retention=BACKUP_MIN_ENFORCED_RETENTION
        [--access-restriction=ACCESS_RESTRICTION; default="within-org"]
        [--no-async]
        [--backup-retention-inheritance=BACKUP_RETENTION_INHERITANCE]
        [--description=DESCRIPTION] [--effective-time=EFFECTIVE_TIME]
        [--kms-key=KMS_KEY] [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Backup and DR backup vault.

EXAMPLES
    To create a new backup vault BACKUP_VAULT in location MY_LOCATION with
    minimum enforced-retention for backups of 1 month and 1 day, run:

        $ gcloud backup-dr backup-vaults create BACKUP_VAULT \
            --location=MY_LOCATION --backup-min-enforced-retention="p1m1d"

    To create a new backup vault BACKUP_VAULT in location MY_LOCATION with
    minimum enforced-retention for backups of 1 day and description
    DESCRIPTION, run:

        $ gcloud backup-dr backup-vaults create BACKUP_VAULT \
            --location=MY_LOCATION --backup-min-enforced-retention="1d" \
            --description=DESCRIPTION

    To create a new backup vault BACKUP_VAULT in location MY_LOCATION with
    minimum enforced-retention for backups of 1 day and label key1 with value
    value1, run:

        $ gcloud backup-dr backup-vaults create BACKUP_VAULT \
            --location=MY_LOCATION --backup-min-enforced-retention="1d" \
            --labels=key1=value1

    To create a new backup vault BACKUP_VAULT in location MY_LOCATION with
    minimum enforced-retention for backups of 1 day and effective-time
    "2024-03-22", run:

        $ gcloud backup-dr backup-vaults create BACKUP_VAULT \
            --location=MY_LOCATION --backup-min-enforced-retention="1d" \
            --effective-time="2024-03-22"

POSITIONAL ARGUMENTS
     Backup Vault resource - Name of the backup vault to create. A vault name
     cannot be changed after creation. It must be between 3-63 characters long
     and must be unique within the project and location. The arguments in this
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
          ID of the Backup Vault or fully qualified identifier for the Backup
          Vault.

          To set the name attribute:
          + provide the argument backup_vault on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Backup Vault.

          To set the location attribute:
          + provide the argument backup_vault on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --backup-min-enforced-retention=BACKUP_MIN_ENFORCED_RETENTION
        Backups will be kept for this minimum period before they can be
        deleted. Once the effective time is reached, the enforced retention
        period cannot be decreased or removed. The value must be specified in
        relative time format (e.g. p1d, p1m, p1m1d).

OPTIONAL FLAGS
     --access-restriction=ACCESS_RESTRICTION; default="within-org"
        Authorize certain sources and destinations for data being sent into, or
        restored from, the backup vault being created. This choice determines
        the type of resources that can be stored. Restricting access to within
        your project or organization limits the resources to those managed
        through the Google Cloud console (e.g., Compute Engine VMs).
        Unrestricted access is required for resources managed through the
        management console (e.g., VMware Engine VMs, databases, and file
        systems). ACCESS_RESTRICTION must be one of: within-project,
        within-org, unrestricted, within-org-but-unrestricted-for-ba.

     --no-async
        Wait for the operation in progress to complete.

     --backup-retention-inheritance=BACKUP_RETENTION_INHERITANCE
        The inheritance mode for enforced retention end time of the backup
        within this backup vault. Once set, the inheritance mode cannot be
        changed. Default is inherit-vault-retention. If set to
        inherit-vault-retention, the backup retention period will be inherited
        from the backup vault. If set to match-backup-expire-time, the backup
        retention period will be the same as the backup expiration time.
        BACKUP_RETENTION_INHERITANCE must be one of: inherit-vault-retention,
        match-backup-expire-time.

     --description=DESCRIPTION
        Optional description for the backup vault (2048 characters or less).

     --effective-time=EFFECTIVE_TIME
        The time at which the enforced retention period becomes locked. This
        flag is mutually exclusive with --unlock-backup-min-enforced-retention.

     --kms-key=KMS_KEY
        The Cloud KMS key resource name to be used for encryption. Format:
        projects/{project}/locations/{location}/keyRings/{ring}/cryptoKeys/{key}

     --labels=[KEY=VALUE,...]
        Optional resource labels to represent metadata provided by the user.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the backupdr/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/backup-disaster-recovery

BRIEF
    Creates a Backup and DR backup vault.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backup-vaults create

        $ gcloud beta backup-dr backup-vaults create
```

### gcloud backup-dr backup-vaults delete

```text
NAME
    gcloud backup-dr backup-vaults delete - delete the specified Backup Vault

SYNOPSIS
    gcloud backup-dr backup-vaults delete (BACKUP_VAULT : --location=LOCATION)
        [--allow-missing] [--no-async] [--ignore-backup-plan-references]
        [--ignore-inactive-datasources] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified Backup Vault.

EXAMPLES
    To delete a backup vault BACKUP_VAULT in location MY_LOCATION, run:

        $ gcloud backup-dr backup-vaults delete BACKUP_VAULT \
            --location=MY_LOCATION

    To override restrictions against the deletion of a backup vault
    BACKUP_VAULT containing inactive datasources in location MY_LOCATION, run:

        $ gcloud backup-dr backup-vaults delete BACKUP_VAULT \
            --location=MY_LOCATION --ignore-inactive-datasources

    To override restrictions against the deletion of a backup vault
    BACKUP_VAULT containing backup plan references in location MY_LOCATION,
    run:

        $ gcloud backup-dr backup-vaults delete BACKUP_VAULT \
            --location=MY_LOCATION --ignore-backup-plan-references

POSITIONAL ARGUMENTS
     Backup Vault resource - Name of the backup vault to delete. Before you
     delete, take a look at the prerequisites here
     (https://cloud.google.com/backup-disaster-recovery/docs/configuration/decommission).
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument backup_vault on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_VAULT
          ID of the Backup Vault or fully qualified identifier for the Backup
          Vault.

          To set the name attribute:
          + provide the argument backup_vault on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Backup Vault.

          To set the location attribute:
          + provide the argument backup_vault on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --allow-missing
        Allow idempotent deletion of backup vault. The request will still
        succeed in case the backup vault does not exist.

     --no-async
        Wait for the operation in progress to complete.

     --ignore-backup-plan-references
        If set, the following restrictions against deletion of the backup vault
        instance can be overridden: * deletion of a backup vault instance being
        actively referenced by a backup plan.

     --ignore-inactive-datasources
        If set, the following restrictions against deletion of the backup vault
        instance can be overridden: * deletion of a backup vault instance
        containing no backups,but still contains empty datasources.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the backupdr/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/backup-disaster-recovery

BRIEF
    Deletes a specific backup vault

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backup-vaults delete

        $ gcloud beta backup-dr backup-vaults delete
```

### gcloud backup-dr backup-vaults describe

```text
NAME
    gcloud backup-dr backup-vaults describe - show the metadata for a Backup
        and DR backup vault

SYNOPSIS
    gcloud backup-dr backup-vaults describe
        (BACKUP_VAULT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show the metadata for a Backup and DR backup vault.

EXAMPLES
    To view details associated with backup vault 'BACKUP_VAULT', run:

        $ gcloud backup-dr backup-vaults describe BACKUP_VAULT

POSITIONAL ARGUMENTS
     Backup Vault resource - Name of the backup vault to retreive metadata of.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument backup_vault on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_VAULT
          ID of the Backup Vault or fully qualified identifier for the Backup
          Vault.

          To set the name attribute:
          + provide the argument backup_vault on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Backup Vault.

          To set the location attribute:
          + provide the argument backup_vault on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the backupdr/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/backup-disaster-recovery

BRIEF
    Show the metadata for a Backup and DR backup vault.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backup-vaults describe

        $ gcloud beta backup-dr backup-vaults describe
```

### gcloud backup-dr backup-vaults list

```text
NAME
    gcloud backup-dr backup-vaults list - list Backup and DR backup vaults

SYNOPSIS
    gcloud backup-dr backup-vaults list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Backup and DR backup vaults.

EXAMPLES
    To list backup vaults in all location, run:

        $ gcloud backup-dr backup-vaults list

    To list backup vaults in a location ''my-location'', run:

        $ gcloud backup-dr backup-vaults list --location=my-location

FLAGS
     Location resource - Location for which backup vaults should be listed.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * Defaults to all locations with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * Defaults to all locations.

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
    This command uses the backupdr/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/backup-disaster-recovery

BRIEF
    List Backup and DR backup vaults.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backup-vaults list

        $ gcloud beta backup-dr backup-vaults list
```

### gcloud backup-dr backup-vaults update

```text
NAME
    gcloud backup-dr backup-vaults update - update a Backup and DR backup vault

SYNOPSIS
    gcloud backup-dr backup-vaults update (BACKUP_VAULT : --location=LOCATION)
        [--access-restriction=ACCESS_RESTRICTION] [--no-async]
        [--backup-min-enforced-retention=BACKUP_MIN_ENFORCED_RETENTION]
        [--description=DESCRIPTION] [--effective-time=EFFECTIVE_TIME]
        [--force-update] [--force-update-access-restriction]
        [--unlock-backup-min-enforced-retention] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Backup and DR backup vault.

EXAMPLES
    To update a backup vault BACKUP_VAULT in location MY_LOCATION with one
    update field, run:

        $ gcloud backup-dr backup-vaults update BACKUP_VAULT \
            --location=MY_LOCATION --effective-time="2024-03-22"

    To update a backup vault BACKUP_VAULT in location MY_LOCATION with multiple
    update fields, run:

        $ gcloud backup-dr backup-vaults update BACKUP_VAULT \
            --location=MY_LOCATION \
            --backup-min-enforced-retention="400000s" \
            --description="Updated backup vault"

POSITIONAL ARGUMENTS
     Backup Vault resource - Name of the existing backup vault to update. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument backup_vault on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_VAULT
          ID of the Backup Vault or fully qualified identifier for the Backup
          Vault.

          To set the name attribute:
          + provide the argument backup_vault on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Backup Vault.

          To set the location attribute:
          + provide the argument backup_vault on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --access-restriction=ACCESS_RESTRICTION
        Authorize certain sources and destinations for data being sent into, or
        restored from the current backup vault.

        Access restrictions can be modified to be more or less restrictive.

            ::: More restrictive access restriction update will fail by default if there will be non compliant Data Sources.
            To allow such updates, use the --force-update-access-restriction flag.
            :::  For Google Cloud Console resources, the following changes are allowed to make access restrictions more restrictive:
                *   `UNRESTRICTED` to `WITHIN_PROJECT` / `WITHIN_ORG_BUT_UNRESTRICTED_FOR_BA` / `WITHIN_ORGANIZATION`
                *   `WITHIN_PROJECT` to `WITHIN_ORGANIZATION` / `WITHIN_ORG_BUT_UNRESTRICTED_FOR_BA`

            ::: For Management Server resources, the following changes are allowed to make access restrictions more restrictive:
                *   `UNRESTRICTED` to `WITHIN_PROJECT` / `WITHIN_ORG_BUT_UNRESTRICTED_FOR_BA` / `WITHIN_ORGANIZATION`
                *   `WITHIN_PROJECT` to `WITHIN_ORGANIZATION` / `WITHIN_ORG_BUT_UNRESTRICTED_FOR_BA`

            :::   For both Google Cloud Console and Management Server resources, the following changes are allowed to make access restrictions more restrictive:
                *   `UNRESTRICTED` to `WITHIN_PROJECT` / `WITHIN_ORG_BUT_UNRESTRICTED_FOR_BA` / `WITHIN_ORGANIZATION`
                *   `WITHIN_PROJECT` to `WITHIN_ORGANIZATION` / `WITHIN_ORG_BUT_UNRESTRICTED_FOR_BA`

            ::: For Google Cloud Console resources,  the following changes are allowed to make access restrictions less restrictive:
                *   `WITHIN_ORGANIZATION` to `UNRESTRICTED` / `WITHIN_ORG_BUT_UNRESTRICTED_FOR_BA`
                *   `WITHIN_PROJECT` to `UNRESTRICTED`
                *   `WITHIN_ORG_BUT_UNRESTRICTED_FOR_BA` to `UNRESTRICTED`

            ::: For Management Server resources, the following changes are allowed to make access restrictions less restrictive:
                *   `WITHIN_ORG_BUT_UNRESTRICTED_FOR_BA` to `UNRESTRICTED`

        ACCESS_RESTRICTION must be one of: within-project, within-org,
        unrestricted, within-org-but-unrestricted-for-ba.

     --no-async
        Wait for the operation in progress to complete.

     --backup-min-enforced-retention=BACKUP_MIN_ENFORCED_RETENTION
        Backups will be kept for this minimum period before they can be
        deleted. Once the effective time is reached, the enforced retention
        period cannot be decreased or removed. The value must be specified in
        relative time format (e.g. p1d, p1m, p1m1d).

     --description=DESCRIPTION
        Optional description for the backup vault (2048 characters or less).

     --effective-time=EFFECTIVE_TIME
        The time at which the enforced retention period becomes locked. This
        flag is mutually exclusive with --unlock-backup-min-enforced-retention.

     --force-update
        If set, allow update to extend the minimum enforced retention for
        backup vault. This overrides the restriction against conflicting
        retention periods. This conflict may occur when the expiration schedule
        defined by the associated backup plan is shorter than the minimum
        retention set by the backup vault.

     --force-update-access-restriction
        If set, the access restriction can be updated even if there are
        non-compliant data sources. Backups for those data sources will fail
        afterward.

     --unlock-backup-min-enforced-retention
        Removes the lock on the backup minimum enforced retention period, and
        resets the effective time. When unlocked, the enforced retention period
        can be changed at any time. This flag is mutually exclusive with
        --effective-time.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the backupdr/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/backup-disaster-recovery

BRIEF
    Updates a Backup and DR backup vault.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backup-vaults update

        $ gcloud beta backup-dr backup-vaults update
```

### gcloud beta backup-dr backup-vaults create

```text
NAME
    gcloud beta backup-dr backup-vaults create - create a Backup and DR backup
        vault

SYNOPSIS
    gcloud beta backup-dr backup-vaults create
        (BACKUP_VAULT : --location=LOCATION)
        --backup-min-enforced-retention=BACKUP_MIN_ENFORCED_RETENTION
        [--access-restriction=ACCESS_RESTRICTION; default="within-org"]
        [--no-async]
        [--backup-retention-inheritance=BACKUP_RETENTION_INHERITANCE]
        [--description=DESCRIPTION] [--effective-time=EFFECTIVE_TIME]
        [--kms-key=KMS_KEY] [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr backup-vaults delete

```text
NAME
    gcloud beta backup-dr backup-vaults delete - delete the specified Backup
        Vault

SYNOPSIS
    gcloud beta backup-dr backup-vaults delete
        (BACKUP_VAULT : --location=LOCATION) [--allow-missing] [--no-async]
        [--ignore-backup-plan-references] [--ignore-inactive-datasources]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr backup-vaults describe

```text
NAME
    gcloud beta backup-dr backup-vaults describe - show the metadata for a
        Backup and DR backup vault

SYNOPSIS
    gcloud beta backup-dr backup-vaults describe
        (BACKUP_VAULT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr backup-vaults list

```text
NAME
    gcloud beta backup-dr backup-vaults list - list Backup and DR backup vaults

SYNOPSIS
    gcloud beta backup-dr backup-vaults list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr backup-vaults update

```text
NAME
    gcloud beta backup-dr backup-vaults update - update a Backup and DR backup
        vault

SYNOPSIS
    gcloud beta backup-dr backup-vaults update
        (BACKUP_VAULT : --location=LOCATION)
        [--access-restriction=ACCESS_RESTRICTION] [--no-async]
        [--backup-min-enforced-retention=BACKUP_MIN_ENFORCED_RETENTION]
        [--description=DESCRIPTION] [--effective-time=EFFECTIVE_TIME]
        [--force-update] [--force-update-access-restriction]
        [--unlock-backup-min-enforced-retention] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-vaults create

```text
NAME
    gcloud alpha backup-dr backup-vaults create - create a Backup and DR backup
        vault

SYNOPSIS
    gcloud alpha backup-dr backup-vaults create
        (BACKUP_VAULT : --location=LOCATION)
        --backup-min-enforced-retention=BACKUP_MIN_ENFORCED_RETENTION
        [--access-restriction=ACCESS_RESTRICTION; default="within-org"]
        [--no-async]
        [--backup-retention-inheritance=BACKUP_RETENTION_INHERITANCE]
        [--description=DESCRIPTION] [--effective-time=EFFECTIVE_TIME]
        [--kms-key=KMS_KEY] [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-vaults delete

```text
NAME
    gcloud alpha backup-dr backup-vaults delete - delete the specified Backup
        Vault

SYNOPSIS
    gcloud alpha backup-dr backup-vaults delete
        (BACKUP_VAULT : --location=LOCATION) [--allow-missing] [--no-async]
        [--ignore-backup-plan-references] [--ignore-inactive-datasources]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-vaults describe

```text
NAME
    gcloud alpha backup-dr backup-vaults describe - show the metadata for a
        Backup and DR backup vault

SYNOPSIS
    gcloud alpha backup-dr backup-vaults describe
        (BACKUP_VAULT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-vaults list

```text
NAME
    gcloud alpha backup-dr backup-vaults list - list Backup and DR backup
        vaults

SYNOPSIS
    gcloud alpha backup-dr backup-vaults list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-vaults update

```text
NAME
    gcloud alpha backup-dr backup-vaults update - update a Backup and DR backup
        vault

SYNOPSIS
    gcloud alpha backup-dr backup-vaults update
        (BACKUP_VAULT : --location=LOCATION)
        [--access-restriction=ACCESS_RESTRICTION] [--no-async]
        [--backup-min-enforced-retention=BACKUP_MIN_ENFORCED_RETENTION]
        [--description=DESCRIPTION] [--effective-time=EFFECTIVE_TIME]
        [--force-update] [--force-update-access-restriction]
        [--unlock-backup-min-enforced-retention] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backup-vaults (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
