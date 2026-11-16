---
source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/backups
---

# gcloud spanner backups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud spanner backups add-iam-policy-binding

```text
NAME
    gcloud spanner backups add-iam-policy-binding - add IAM policy binding to a
        Cloud Spanner backup

SYNOPSIS
    gcloud spanner backups add-iam-policy-binding
        (BACKUP : --instance=INSTANCE) --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to a Cloud Spanner backup. One binding consists
    of a member, a role, and an optional condition.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/spanner.backupAdmin'
    for the user 'test-user@gmail.com' with backup 'example-backup' and
    instance 'example-instance', run:

        $ gcloud spanner backups add-iam-policy-binding example-backup \
            --instance='example-instance' \
            --member='user:test-user@gmail.com' \
            --role='roles/spanner.backupAdmin'

    To add an IAM policy binding which expires at the end of the year 2018 for
    the role of 'roles/spanner.backupAdmin' and the user 'test-user@gmail.com'
    with backup 'example-backup' and instance 'example-instance', run:

        $ gcloud spanner backups add-iam-policy-binding example-backup \
            --instance='example-instance' \
            --member='user:test-user@gmail.com' \
            --role='roles/spanner.backupAdmin' \
            --condition='expression=request.time <
         timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,descrip\
        tion=Expires at midnight on 2018-12-31'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Backup resource - The Cloud Spanner backup to which to add the IAM policy
     binding. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The name of the Cloud Spanner instance.

          To set the instance attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to add the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        Role name to assign to the principal. The role name is the complete
        path of a predefined role, such as roles/logging.viewer, or the role ID
        for a custom role, such as
        organizations/{ORGANIZATION_ID}/roles/logging.viewer.

OPTIONAL FLAGS
     At most one of these can be specified:

       --condition=[KEY=VALUE,...]
          A condition to include in the binding. When the condition is
          explicitly specified as None (--condition=None), a binding without a
          condition is added. When the condition is specified and is not None,
          --role cannot be a basic role. Basic roles are roles/editor,
          roles/owner, and roles/viewer. For more on conditions, refer to the
          conditions overview guide:
          https://cloud.google.com/iam/docs/conditions-overview

          When using the --condition flag, include the following key-value
          pairs:

           expression
              (Required) Condition expression that evaluates to True or False.
              This uses a subset of Common Expression Language syntax.

              If the condition expression includes a comma, use a different
              delimiter to separate the key-value pairs. Specify the delimiter
              before listing the key-value pairs. For example, to specify a
              colon (:) as the delimiter, do the following:
              --condition=^:^title=TITLE:expression=EXPRESSION. For more
              information, see
              https://cloud.google.com/sdk/gcloud/reference/topic/escaping.

           title
              (Required) A short string describing the purpose of the
              expression.

           description
              (Optional) Additional description for the expression.

       --condition-from-file=PATH_TO_FILE
          Path to a local JSON or YAML file that defines the condition. To see
          available fields, see the help for --condition. Use a full or
          relative path to a local file containing the value of condition.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the spanner/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/spanner/

NOTES
    These variants are also available:

        $ gcloud alpha spanner backups add-iam-policy-binding

        $ gcloud beta spanner backups add-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud spanner backups add-iam-policy-binding example-backup \
    --instance='example-instance' \
    --member='user:test-user@gmail.com' \
    --role='roles/spanner.backupAdmin' \
    --condition='expression=request.time < timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,description=Expires at midnight on 2018-12-31'
```

### gcloud spanner backups copy

```text
NAME
    gcloud spanner backups copy - copies a backup of a Cloud Spanner database

SYNOPSIS
    gcloud spanner backups copy
        (--destination-backup=DESTINATION_BACKUP
          : --destination-instance=DESTINATION_INSTANCE)
        (--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD)
        (--source-backup=SOURCE_BACKUP : --source-instance=SOURCE_INSTANCE)
        [--async]
        [--encryption-type=ENCRYPTION_TYPE --kms-keys=[KMS_KEYS,...]
          | [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Copies a backup of a Cloud Spanner database.

EXAMPLES
    To copy a backup within the same project, run:

        $ gcloud spanner backups copy --source-instance=SOURCE_INSTANCE_ID \
            --source-backup=SOURCE_BACKUP_ID \
            --destination-instance=DESTINATION_INSTANCE_ID \
            --destination-backup=DESTINATION_BACKUP_ID \
            --expiration-date=2020-03-29T10:49:41Z

    To copy a backup to a different project, run:

        $ gcloud spanner backups copy \
            --source-backup=projects/SOURCE_PROJECT_ID/instances/\
        SOURCE_INSTANCE_ID/backups/SOURCE_BACKUP_ID \
            --destination-backup=projects/DESTINATION_PROJECT_ID/instances/\
        DESTINATION_INSTANCE_ID/backups/DESTINATION_BACKUP_ID \
            --expiration-date=2020-03-29T10:49:41Z

REQUIRED FLAGS
     Backup resource - TEXT The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --destination-backup on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --destination-backup=DESTINATION_BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument --destination-backup on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --destination-instance=DESTINATION_INSTANCE
          The Cloud Spanner instance for the backup.

          To set the instance attribute:
          + provide the argument --destination-backup on the command line
            with a fully specified name;
          + provide the argument --destination-instance on the command line;
          + set the property spanner/instance.

     Exactly one of these must be specified:

       --expiration-date=EXPIRATION_DATE
          Expiration time of the backup, must be at least 6 hours and at most
          366 days from the time when the source backup is created. See $
          gcloud topic datetimes for information on date/time formats.

       --retention-period=RETENTION_PERIOD
          Retention period of the backup relative from now, must be at least 6
          hours and at most 366 days from the time when the source backup is
          created. See $ gcloud topic datetimes for information on duration
          formats.

     Backup resource - TEXT The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --source-backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --source-backup=SOURCE_BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument --source-backup on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --source-instance=SOURCE_INSTANCE
          The Cloud Spanner instance for the backup.

          To set the instance attribute:
          + provide the argument --source-backup on the command line with a
            fully specified name;
          + provide the argument --source-instance on the command line;
          + set the property spanner/instance.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --encryption-type=ENCRYPTION_TYPE
        The encryption type of the copied backup. ENCRYPTION_TYPE must be one
        of:

         customer-managed-encryption
            Use the provided Cloud KMS key for encryption. If this option is
            selected, kms-key must be set.
         google-default-encryption
            Use Google default encryption.
         use-config-default-or-backup-encryption
            Use the default encryption configuration if one exists. otherwise
            use the same encryption configuration as the source backup.

     KMS key name group

     At most one of these can be specified:

       Key resource - Cloud KMS key(s) to be used to copy the Cloud Spanner
       backup. This represents a Cloud resource. (NOTE) Some attributes are not
       given arguments in this group but can be set in other ways.

       To set the kms-project attribute:
        + provide the argument --kms-keys on the command line with a fully
          specified name.

       To set the kms-location attribute:
        + provide the argument --kms-keys on the command line with a fully
          specified name.

       To set the kms-keyring attribute:
        + provide the argument --kms-keys on the command line with a fully
          specified name.

       --kms-keys=[KMS_KEYS,...]
          IDs of the keys or fully qualified identifiers for the keys.

          To set the kms-key attribute:
          + provide the argument --kms-keys on the command line.

       Key resource - Cloud KMS key to be used to copy the Cloud Spanner
       backup. The arguments in this group can be used to specify the
       attributes of this resource.

       --kms-key=KMS_KEY
          ID of the key or fully qualified identifier for the key.

          To set the kms-key attribute:
          + provide the argument --kms-key on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --kms-keyring=KMS_KEYRING
          KMS keyring id of the key.

          To set the kms-keyring attribute:
          + provide the argument --kms-key on the command line with a fully
            specified name;
          + provide the argument --kms-keyring on the command line.

       --kms-location=KMS_LOCATION
          Cloud location for the key.

          To set the kms-location attribute:
          + provide the argument --kms-key on the command line with a fully
            specified name;
          + provide the argument --kms-location on the command line.

       --kms-project=KMS_PROJECT
          Cloud project id for the key.

          To set the kms-project attribute:
          + provide the argument --kms-key on the command line with a fully
            specified name;
          + provide the argument --kms-project on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner backups copy

        $ gcloud beta spanner backups copy
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud spanner backups copy \
    --source-backup=projects/SOURCE_PROJECT_ID/instances/SOURCE_INSTANCE_ID/backups/SOURCE_BACKUP_ID \
    --destination-backup=projects/DESTINATION_PROJECT_ID/instances/DESTINATION_INSTANCE_ID/backups/DESTINATION_BACKUP_ID \
    --expiration-date=2020-03-29T10:49:41Z
```

### gcloud spanner backups create

```text
NAME
    gcloud spanner backups create - creates a backup of a Cloud Spanner
        database

SYNOPSIS
    gcloud spanner backups create (BACKUP : --instance=INSTANCE)
        --database=DATABASE
        (--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD) [--async]
        [--version-time=TIMESTAMP]
        [--encryption-type=ENCRYPTION_TYPE --kms-keys=[KMS_KEYS,...]
          | [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a backup of a Cloud Spanner database.

EXAMPLES
    To create a backup asynchronously, run:

        $ gcloud spanner backups create BACKUP_ID --instance=INSTANCE_NAME \
            --database=DATABASE --expiration-date=2020-03-29T10:49:41Z \
            --async

    To create a backup synchronously, run:

        $ gcloud spanner backups create BACKUP_ID --instance=INSTANCE_NAME \
            --database=DATABASE --retention-period=2w

POSITIONAL ARGUMENTS
     Backup resource - The Cloud Spanner backup to create. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The Cloud Spanner instance for the backup.

          To set the instance attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

REQUIRED FLAGS
     --database=DATABASE
        ID of the database from which the backup will be created.

     Exactly one of these must be specified:

       --expiration-date=EXPIRATION_DATE
          Expiration time of the backup, must be at least 6 hours and at most
          30 days from the time the request is received. See $ gcloud topic
          datetimes for information on date/time formats.

       --retention-period=RETENTION_PERIOD
          Retention period of the backup relative from now, must be at least 6
          hours and at most 30 days. See $ gcloud topic datetimes for
          information on duration formats.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --version-time=TIMESTAMP
        The backup will contain an externally consistent copy of the database
        at the timestamp specified by --version-time. If --version-time is not
        specified, the system will use the creation time of the backup.

     --encryption-type=ENCRYPTION_TYPE
        The encryption type of the backup. ENCRYPTION_TYPE must be one of:

         customer-managed-encryption
            Use the provided Cloud KMS key for encryption.If this option is
            selected, kms-key must be set.
         google-default-encryption
            Use Google default encryption.
         use-database-encryption
            Use the same encryption configuration as the database.

     KMS key name group

     At most one of these can be specified:

       Key resource - Cloud KMS key(s) to be used to create the Cloud Spanner
       backup. This represents a Cloud resource. (NOTE) Some attributes are not
       given arguments in this group but can be set in other ways.

       To set the kms-project attribute:
        + provide the argument --kms-keys on the command line with a fully
          specified name.

       To set the kms-location attribute:
        + provide the argument --kms-keys on the command line with a fully
          specified name.

       To set the kms-keyring attribute:
        + provide the argument --kms-keys on the command line with a fully
          specified name.

       --kms-keys=[KMS_KEYS,...]
          IDs of the keys or fully qualified identifiers for the keys.

          To set the kms-key attribute:
          + provide the argument --kms-keys on the command line.

       Key resource - Cloud KMS key to be used to create the Cloud Spanner
       backup. The arguments in this group can be used to specify the
       attributes of this resource.

       --kms-key=KMS_KEY
          ID of the key or fully qualified identifier for the key.

          To set the kms-key attribute:
          + provide the argument --kms-key on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --kms-keyring=KMS_KEYRING
          KMS keyring id of the key.

          To set the kms-keyring attribute:
          + provide the argument --kms-key on the command line with a fully
            specified name;
          + provide the argument --kms-keyring on the command line.

       --kms-location=KMS_LOCATION
          Cloud location for the key.

          To set the kms-location attribute:
          + provide the argument --kms-key on the command line with a fully
            specified name;
          + provide the argument --kms-location on the command line.

       --kms-project=KMS_PROJECT
          Cloud project id for the key.

          To set the kms-project attribute:
          + provide the argument --kms-key on the command line with a fully
            specified name;
          + provide the argument --kms-project on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner backups create

        $ gcloud beta spanner backups create
```

### gcloud spanner backups delete

```text
NAME
    gcloud spanner backups delete - delete an existing backup

SYNOPSIS
    gcloud spanner backups delete (BACKUP : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an existing backup.

EXAMPLES
    To delete a backup, run:

        $ gcloud spanner backups delete BACKUP_NAME --instance=INSTANCE_NAME

POSITIONAL ARGUMENTS
     Backup resource - Cloud Spanner backup to delete. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The name of the Cloud Spanner instance.

          To set the instance attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the spanner/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/spanner/

NOTES
    These variants are also available:

        $ gcloud alpha spanner backups delete

        $ gcloud beta spanner backups delete
```

### gcloud spanner backups describe

```text
NAME
    gcloud spanner backups describe - retrieves information about a backup

SYNOPSIS
    gcloud spanner backups describe (BACKUP : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieves information about a backup.

EXAMPLES
    To describe a backup, run:

        $ gcloud spanner backups describe BACKUP_ID --instance=INSTANCE_NAME

POSITIONAL ARGUMENTS
     Backup resource - Cloud Spanner backup to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The name of the Cloud Spanner instance.

          To set the instance attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the spanner/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/spanner/

NOTES
    These variants are also available:

        $ gcloud alpha spanner backups describe

        $ gcloud beta spanner backups describe
```

### gcloud spanner backups get-iam-policy

```text
NAME
    gcloud spanner backups get-iam-policy - get the IAM policy for a Cloud
        Spanner backup

SYNOPSIS
    gcloud spanner backups get-iam-policy (BACKUP : --instance=INSTANCE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud spanner backups get-iam-policy displays the IAM policy associated
    with a Cloud Spanner database. If formatted as JSON, the output can be
    edited and used as a policy file for set-iam-policy. The output includes an
    "etag" field identifying the version emitted and allowing detection of
    concurrent policy updates; see $ {parent} set-iam-policy for additional
    details.

EXAMPLES
    To print the IAM policy for a given Cloud Spanner backup, run:

        $ gcloud spanner backups get-iam-policy example-backup \
            --instance=example-instance

POSITIONAL ARGUMENTS
     Backup resource - The Cloud Spanner backup for which to display the IAM
     policy. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The name of the Cloud Spanner instance.

          To set the instance attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the spanner/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/spanner/

NOTES
    These variants are also available:

        $ gcloud alpha spanner backups get-iam-policy

        $ gcloud beta spanner backups get-iam-policy
```

### gcloud spanner backups list

```text
NAME
    gcloud spanner backups list - list existing Cloud Spanner Cloud Spanner
        backups

SYNOPSIS
    gcloud spanner backups list [--database=DATABASE] [--instance=INSTANCE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List existing Cloud Spanner Cloud Spanner backups.

EXAMPLES
    To list existing backups for the instance, run:

        $ gcloud spanner backups list --instance=INSTANCE_NAME

    To list existing backups for a database, run:

        $ gcloud spanner backups list --instance=INSTANCE_NAME \
            --database=DATABASE

FLAGS
     --database=DATABASE
        ID of the source database. The database flag will take precedence over
        filters added for database.

     Instance resource - Cloud Spanner instance ID. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --instance on the command line with a fully
        specified name;
      * set the property spanner/instance with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --instance=INSTANCE
        ID of the instance or fully qualified identifier for the instance.

        To set the instance attribute:
        * provide the argument --instance on the command line;
        * set the property spanner/instance.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the spanner/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/spanner/

NOTES
    These variants are also available:

        $ gcloud alpha spanner backups list

        $ gcloud beta spanner backups list
```

### gcloud spanner backups remove-iam-policy-binding

```text
NAME
    gcloud spanner backups remove-iam-policy-binding - remove IAM policy
        binding of a Cloud Spanner backup

SYNOPSIS
    gcloud spanner backups remove-iam-policy-binding
        (BACKUP : --instance=INSTANCE) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding of a Cloud Spanner backup. One binding
    consists of a member, a role, and an optional condition.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/spanner.backupAdmin'
    for the user 'test-user@gmail.com' with backup 'example-backup' and
    instance 'example-instance', run:

        $ gcloud spanner backups remove-iam-policy-binding example-backup \
            --instance='example-instance' \
            --member='user:test-user@gmail.com' \
            --role='roles/spanner.backupAdmin'

    To remove an IAM policy binding which expires at the end of the year 2018
    for the role of 'roles/spanner.backupAdmin' and the user
    'test-user@gmail.com' with backup 'example-backup' and instance
    'example-instance', run:

        $ gcloud spanner backups remove-iam-policy-binding example-backup \
            --instance='example-instance' \
            --member='user:test-user@gmail.com' \
            --role='roles/spanner.backupAdmin' \
            --condition='expression=request.time <
         timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,descrip\
        tion=Expires at midnight on 2018-12-31'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Backup resource - The Cloud Spanner backup to remove the IAM policy
     binding from. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The name of the Cloud Spanner instance.

          To set the instance attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to remove the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Deleted principals have an additional deleted: prefix and a ?uid=UID
        suffix, where UID is a unique identifier for the principal. Example:
        deleted:user:test-user@gmail.com?uid=123456789012345678901.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        The role to remove the principal from.

OPTIONAL FLAGS
     At most one of these can be specified:

       --all
          Remove all bindings with this role and principal, irrespective of any
          conditions.

       --condition=[KEY=VALUE,...]
          The condition of the binding that you want to remove. When the
          condition is explicitly specified as None (--condition=None), a
          binding without a condition is removed. Otherwise, only a binding
          with a condition that exactly matches the specified condition
          (including the optional description) is removed. For more on
          conditions, refer to the conditions overview guide:
          https://cloud.google.com/iam/docs/conditions-overview

          When using the --condition flag, include the following key-value
          pairs:

           expression
              (Required) Condition expression that evaluates to True or False.
              This uses a subset of Common Expression Language syntax.

              If the condition expression includes a comma, use a different
              delimiter to separate the key-value pairs. Specify the delimiter
              before listing the key-value pairs. For example, to specify a
              colon (:) as the delimiter, do the following:
              --condition=^:^title=TITLE:expression=EXPRESSION. For more
              information, see
              https://cloud.google.com/sdk/gcloud/reference/topic/escaping.

           title
              (Required) A short string describing the purpose of the
              expression.

           description
              (Optional) Additional description for the expression.

       --condition-from-file=PATH_TO_FILE
          Path to a local JSON or YAML file that defines the condition. To see
          available fields, see the help for --condition. Use a full or
          relative path to a local file containing the value of condition.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the spanner/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/spanner/

NOTES
    These variants are also available:

        $ gcloud alpha spanner backups remove-iam-policy-binding

        $ gcloud beta spanner backups remove-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud spanner backups remove-iam-policy-binding example-backup \
    --instance='example-instance' \
    --member='user:test-user@gmail.com' \
    --role='roles/spanner.backupAdmin' \
    --condition='expression=request.time < timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,description=Expires at midnight on 2018-12-31'
```

### gcloud spanner backups set-iam-policy

```text
NAME
    gcloud spanner backups set-iam-policy - set the IAM policy for a Cloud
        Spanner backup

SYNOPSIS
    gcloud spanner backups set-iam-policy (BACKUP : --instance=INSTANCE)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set the IAM policy for a Cloud Spanner backup given a backup ID and a file
    encoded in JSON or YAML that contains the IAM policy.

EXAMPLES
    The following command reads an IAM policy defined in a JSON file
    policy.json and sets it for a spanner instance with the ID
    example-instance:

        $ gcloud spanner backups set-iam-policy example-backup \
            --instance=example-instance policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Backup resource - The Cloud Spanner backup to set the IAM policy for. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The name of the Cloud Spanner instance.

          To set the instance attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the spanner/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/spanner/

NOTES
    These variants are also available:

        $ gcloud alpha spanner backups set-iam-policy

        $ gcloud beta spanner backups set-iam-policy
```

### gcloud spanner backups update-metadata

```text
NAME
    gcloud spanner backups update-metadata - updates the metadata of a Cloud
        Spanner a backup

SYNOPSIS
    gcloud spanner backups update-metadata (BACKUP : --instance=INSTANCE)
        (--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates the metadata of a Cloud Spanner a backup.

EXAMPLES
    To update the backup metadata with an exact expiration date, run:

        $ gcloud spanner backups update-metadata BACKUP_ID \
            --instance=INSTANCE_NAME --expiration-date=2020-03-29T10:49:41Z

    To update the backup metadata with a retention period, run:

        $ gcloud spanner backups update-metadata BACKUP_ID \
            --instance=INSTANCE_NAME --retention-period=2w

POSITIONAL ARGUMENTS
     Backup resource - The Cloud Spanner backup to update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The name of the Cloud Spanner instance.

          To set the instance attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --expiration-date=EXPIRATION_DATE
          Expiration time of the backup, must be at least 6 hours and at most
          366 days from the time of creation. See $ gcloud topic datetimes for
          information on date/time formats.

       --retention-period=RETENTION_PERIOD
          Retention period of the backup relative from now, must be at least 6
          hours and at most a year from the time of creation. See $ gcloud
          topic datetimes for information on duration formats.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the spanner/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/spanner/

NOTES
    These variants are also available:

        $ gcloud alpha spanner backups update-metadata

        $ gcloud beta spanner backups update-metadata
```

### gcloud beta spanner backups add-iam-policy-binding

```text
NAME
    gcloud beta spanner backups add-iam-policy-binding - add IAM policy binding
        to a Cloud Spanner backup

SYNOPSIS
    gcloud beta spanner backups add-iam-policy-binding
        (BACKUP : --instance=INSTANCE) --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backups copy

```text
NAME
    gcloud beta spanner backups copy - copies a backup of a Cloud Spanner
        database

SYNOPSIS
    gcloud beta spanner backups copy
        (--destination-backup=DESTINATION_BACKUP
          : --destination-instance=DESTINATION_INSTANCE)
        (--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD)
        (--source-backup=SOURCE_BACKUP : --source-instance=SOURCE_INSTANCE)
        [--async]
        [--encryption-type=ENCRYPTION_TYPE --kms-keys=[KMS_KEYS,...]
          | [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backups create

```text
NAME
    gcloud beta spanner backups create - creates a backup of a Cloud Spanner
        database

SYNOPSIS
    gcloud beta spanner backups create (BACKUP : --instance=INSTANCE)
        --database=DATABASE
        (--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD) [--async]
        [--version-time=TIMESTAMP]
        [--encryption-type=ENCRYPTION_TYPE --kms-keys=[KMS_KEYS,...]
          | [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backups delete

```text
NAME
    gcloud beta spanner backups delete - delete an existing backup

SYNOPSIS
    gcloud beta spanner backups delete (BACKUP : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backups describe

```text
NAME
    gcloud beta spanner backups describe - retrieves information about a backup

SYNOPSIS
    gcloud beta spanner backups describe (BACKUP : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backups get-iam-policy

```text
NAME
    gcloud beta spanner backups get-iam-policy - get the IAM policy for a Cloud
        Spanner backup

SYNOPSIS
    gcloud beta spanner backups get-iam-policy (BACKUP : --instance=INSTANCE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backups list

```text
NAME
    gcloud beta spanner backups list - list existing Cloud Spanner Cloud
        Spanner backups

SYNOPSIS
    gcloud beta spanner backups list [--database=DATABASE]
        [--instance=INSTANCE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backups remove-iam-policy-binding

```text
NAME
    gcloud beta spanner backups remove-iam-policy-binding - remove IAM policy
        binding of a Cloud Spanner backup

SYNOPSIS
    gcloud beta spanner backups remove-iam-policy-binding
        (BACKUP : --instance=INSTANCE) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backups set-iam-policy

```text
NAME
    gcloud beta spanner backups set-iam-policy - set the IAM policy for a Cloud
        Spanner backup

SYNOPSIS
    gcloud beta spanner backups set-iam-policy (BACKUP : --instance=INSTANCE)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner backups update-metadata

```text
NAME
    gcloud beta spanner backups update-metadata - updates the metadata of a
        Cloud Spanner a backup

SYNOPSIS
    gcloud beta spanner backups update-metadata (BACKUP : --instance=INSTANCE)
        (--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backups add-iam-policy-binding

```text
NAME
    gcloud alpha spanner backups add-iam-policy-binding - add IAM policy
        binding to a Cloud Spanner backup

SYNOPSIS
    gcloud alpha spanner backups add-iam-policy-binding
        (BACKUP : --instance=INSTANCE) --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backups copy

```text
NAME
    gcloud alpha spanner backups copy - copies a backup of a Cloud Spanner
        database

SYNOPSIS
    gcloud alpha spanner backups copy
        (--destination-backup=DESTINATION_BACKUP
          : --destination-instance=DESTINATION_INSTANCE)
        (--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD)
        (--source-backup=SOURCE_BACKUP : --source-instance=SOURCE_INSTANCE)
        [--async]
        [--encryption-type=ENCRYPTION_TYPE --kms-keys=[KMS_KEYS,...]
          | [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backups create

```text
NAME
    gcloud alpha spanner backups create - creates a backup of a Cloud Spanner
        database

SYNOPSIS
    gcloud alpha spanner backups create (BACKUP : --instance=INSTANCE)
        --database=DATABASE
        (--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD) [--async]
        [--version-time=TIMESTAMP]
        [--encryption-type=ENCRYPTION_TYPE --kms-keys=[KMS_KEYS,...]
          | [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backups delete

```text
NAME
    gcloud alpha spanner backups delete - delete an existing backup

SYNOPSIS
    gcloud alpha spanner backups delete (BACKUP : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backups describe

```text
NAME
    gcloud alpha spanner backups describe - retrieves information about a
        backup

SYNOPSIS
    gcloud alpha spanner backups describe (BACKUP : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backups get-iam-policy

```text
NAME
    gcloud alpha spanner backups get-iam-policy - get the IAM policy for a
        Cloud Spanner backup

SYNOPSIS
    gcloud alpha spanner backups get-iam-policy (BACKUP : --instance=INSTANCE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backups list

```text
NAME
    gcloud alpha spanner backups list - list existing Cloud Spanner Cloud
        Spanner backups

SYNOPSIS
    gcloud alpha spanner backups list [--database=DATABASE]
        [--instance=INSTANCE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backups remove-iam-policy-binding

```text
NAME
    gcloud alpha spanner backups remove-iam-policy-binding - remove IAM policy
        binding of a Cloud Spanner backup

SYNOPSIS
    gcloud alpha spanner backups remove-iam-policy-binding
        (BACKUP : --instance=INSTANCE) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backups set-iam-policy

```text
NAME
    gcloud alpha spanner backups set-iam-policy - set the IAM policy for a
        Cloud Spanner backup

SYNOPSIS
    gcloud alpha spanner backups set-iam-policy (BACKUP : --instance=INSTANCE)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner backups update-metadata

```text
NAME
    gcloud alpha spanner backups update-metadata - updates the metadata of a
        Cloud Spanner a backup

SYNOPSIS
    gcloud alpha spanner backups update-metadata (BACKUP : --instance=INSTANCE)
        (--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/backups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
