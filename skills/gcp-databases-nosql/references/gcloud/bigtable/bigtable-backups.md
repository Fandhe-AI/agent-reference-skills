---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/backups
---

# gcloud bigtable backups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bigtable backups add-iam-policy-binding

```text
NAME
    gcloud bigtable backups add-iam-policy-binding - add an IAM policy binding
        to a Cloud Bigtable Backup

SYNOPSIS
    gcloud bigtable backups add-iam-policy-binding
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) --member=PRINCIPAL
        --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to a Cloud Bigtable Backup. One binding consists
    of a member, a role, and an optional condition.

EXAMPLES
    To add an IAM policy binding for the role of roles/editor for the user
    test-user@gmail.com with backup my-backup in instance my-instance and
    cluster my-cluster, run:

        $ gcloud bigtable backups add-iam-policy-binding my-backup \
            --instance=`my-instance` --cluster=`my-cluster` \
            --member=`user:test-user@gmail.com` --role=`roles/editor`

    To add an IAM policy binding which expires at the end of the year 2020 for
    the role of roles/bigtable.admin and the user test-user@gmail.com with
    backup my-backup in instance my-instance and cluster my-cluster, run:

        $ gcloud bigtable backups add-iam-policy-binding my-backup \
            --instance=`my-instance` --cluster=`my-cluster` \
            --member=`user:test-user@gmail.com` \
            --role=`roles/bigtable.admin` \
            --condition=`expression=request.time < \
            timestamp("2021-01-01T00:00:00Z"),title=expires_end_of_2020,\
        description=Expires at midnight on 2020-12-31`

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Backup resource - Cloud Bigtable Backup to add the IAM policy binding to.
     The arguments in this group can be used to specify the attributes of this
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

       --cluster=CLUSTER
          Name of the Bigtable cluster.

          To set the cluster attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

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
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable backups add-iam-policy-binding

        $ gcloud beta bigtable backups add-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud bigtable backups add-iam-policy-binding my-backup \
    --instance='my-instance' \
    --cluster='my-cluster' \
    --member='user:test-user@gmail.com' \
    --role='roles/editor'

gcloud bigtable backups add-iam-policy-binding my-backup \
    --instance='my-instance' \
    --cluster='my-cluster' \
    --member='user:test-user@gmail.com' \
    --role='roles/bigtable.admin' \
    --condition='expression=request.time < timestamp("2021-01-01T00:00:00Z"),title=expires_end_of_2020,description=Expires at midnight on 2020-12-31'
```

### gcloud bigtable backups copy

```text
NAME
    gcloud bigtable backups copy - copy a Cloud Bigtable backup to a new backup

SYNOPSIS
    gcloud bigtable backups copy
        (--destination-backup=DESTINATION_BACKUP
          : --destination-cluster=DESTINATION_CLUSTER
          --destination-instance=DESTINATION_INSTANCE
          --destination-project=DESTINATION_PROJECT)
        (--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD)
        (--source-backup=SOURCE_BACKUP : --source-cluster=SOURCE_CLUSTER
          --source-instance=SOURCE_INSTANCE --source-project=SOURCE_PROJECT)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a copy of a Cloud Bigtable backup.

EXAMPLES
    To copy a backup within the same project, run:

        $ gcloud bigtable backups copy --source-instance=SOURCE_INSTANCE \
            --source-cluster=SOURCE_CLUSTER --source-backup=SOURCE_BACKUP \
            --destination-instance=DESTINATION_INSTANCE \
            --destination-cluster=DESTINATION_CLUSTER \
            --destination-backup=DESTINATION_BACKUP \
            --expiration-date=2023-09-01T10:49:41Z

    To copy a backup to a different project, run:

        $ gcloud bigtable backups copy \
            --source-backup=projects/SOURCE_PROJECT/instances/\
        SOURCE_INSTANCE/clusters/SOURCE_CLUSTER/backups/SOURCE_BACKUP \
            --destination-backup=projects/DESTINATION_PROJECT/instances/\
        DESTINATION_INSTANCE/clusters/DESTINATION_CLUSTER/backups/\
        DESTINATION_BACKUP --expiration-date=2022-08-01T10:49:41Z

    To set retention period and run asyncronously, run:

        $ gcloud bigtable backups copy \
            --source-backup=projects/SOURCE_PROJECT/instances/\
        SOURCE_INSTANCE/clusters/SOURCE_CLUSTER/backups/SOURCE_BACKUP \
            --destination-backup=projects/DESTINATION_PROJECT/instances/\
        DESTINATION_INSTANCE/clusters/DESTINATION_CLUSTER/backups/\
        DESTINATION_BACKUP --retention-period=2w --async

REQUIRED FLAGS
     Backup resource - The destination backup to copy to. The arguments in this
     group can be used to specify the attributes of this resource.

     This must be specified.

       --destination-backup=DESTINATION_BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument --destination-backup on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --destination-cluster=DESTINATION_CLUSTER
          Bigtable cluster for the backup.

          To set the cluster attribute:
          + provide the argument --destination-backup on the command line
            with a fully specified name;
          + provide the argument --destination-cluster on the command line.

       --destination-instance=DESTINATION_INSTANCE
          Bigtable instance for the backup.

          To set the instance attribute:
          + provide the argument --destination-backup on the command line
            with a fully specified name;
          + provide the argument --destination-instance on the command line;
          + provide the argument --source-instance on the command line.

       --destination-project=DESTINATION_PROJECT
          Project ID of the Google Cloud project for the backup.

          To set the project attribute:
          + provide the argument --destination-backup on the command line
            with a fully specified name;
          + provide the argument --destination-project on the command line;
          + provide the argument --source-project on the command line;
          + provide the argument --project on the command line;
          + set the property core/project.

     Exactly one of these must be specified:

       --expiration-date=EXPIRATION_DATE
          Expiration time of the backup, must be at least 6 hours and at most
          30 days from the time the source backup is created. See $ gcloud
          topic datetimes for information on date/time formats.

       --retention-period=RETENTION_PERIOD
          Retention period of the backup relative from now, must be at least 6
          hours and at most 30 days from the time the source backup is created.
          See $ gcloud topic datetimes for information on duration formats.

     Backup resource - The source backup to copy from. The arguments in this
     group can be used to specify the attributes of this resource.

     This must be specified.

       --source-backup=SOURCE_BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument --source-backup on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --source-cluster=SOURCE_CLUSTER
          Bigtable cluster for the backup.

          To set the cluster attribute:
          + provide the argument --source-backup on the command line with a
            fully specified name;
          + provide the argument --source-cluster on the command line.

       --source-instance=SOURCE_INSTANCE
          Bigtable instance for the backup.

          To set the instance attribute:
          + provide the argument --source-backup on the command line with a
            fully specified name;
          + provide the argument --source-instance on the command line;
          + provide the argument --destination-instance on the command line.

       --source-project=SOURCE_PROJECT
          Project ID of the Google Cloud project for the backup.

          To set the project attribute:
          + provide the argument --source-backup on the command line with a
            fully specified name;
          + provide the argument --source-project on the command line;
          + provide the argument --destination-project on the command line;
          + provide the argument --project on the command line;
          + set the property core/project.

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

        $ gcloud alpha bigtable backups copy

        $ gcloud beta bigtable backups copy
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud bigtable backups copy \
    --source-backup=projects/SOURCE_PROJECT/instances/SOURCE_INSTANCE/clusters/SOURCE_CLUSTER/backups/SOURCE_BACKUP \
    --destination-backup=projects/DESTINATION_PROJECT/instances/DESTINATION_INSTANCE/clusters/DESTINATION_CLUSTER/backups/DESTINATION_BACKUP \
    --expiration-date=2022-08-01T10:49:41Z

gcloud bigtable backups copy \
    --source-backup=projects/SOURCE_PROJECT/instances/SOURCE_INSTANCE/clusters/SOURCE_CLUSTER/backups/SOURCE_BACKUP \
    --destination-backup=projects/DESTINATION_PROJECT/instances/DESTINATION_INSTANCE/clusters/DESTINATION_CLUSTER/backups/DESTINATION_BACKUP \
    --retention-period=2w \
    --async
```

### gcloud bigtable backups create

```text
NAME
    gcloud bigtable backups create - creates a backup of a Cloud Bigtable table

SYNOPSIS
    gcloud bigtable backups create
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) --table=TABLE
        (--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD) [--async]
        [--backup-type=BACKUP_TYPE]
        [--hot-to-standard-time=HOT_TO_STANDARD_TIME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a backup of a Cloud Bigtable table.

EXAMPLES
    To create a backup BACKUP_NAME asyncronously from table TABLE_NAME which
    expires at 2019-03-30T10:49:41Z, run:

        $ gcloud bigtable backups create BACKUP_NAME \
            --instance=INSTANCE_NAME --cluster=CLUSTER_NAME \
            --table=TABLE_NAME --expiration-date=2019-03-30T10:49:41Z \
            --async

    To create a backup BACKUP_NAME syncronously from table TABLE_NAME which
    expires in 2 weeks from now, run:

        $ gcloud bigtable backups create BACKUP_NAME \
            --instance=INSTANCE_NAME --cluster=CLUSTER_NAME \
            --table=TABLE_NAME --retention-period=2w

    To create a hot backup BACKUP_NAME from table TABLE_NAME which expires in 2
    weeks from now, run:

        $ gcloud bigtable backups create BACKUP_NAME \
            --instance=INSTANCE_NAME --cluster=CLUSTER_NAME \
            --table=TABLE_NAME --retention-period=2w --backup-type=HOT

    To create a hot backup BACKUP_NAME from table TABLE_NAME which will be
    converted to a standard backup at 2019-03-31T10:49:41Z and expires in 2
    weeks from now, run:

        $ gcloud bigtable backups create BACKUP_NAME \
            --instance=INSTANCE_NAME --cluster=CLUSTER_NAME \
            --table=TABLE_NAME --retention-period=2w --backup-type=HOT \
            --hot-to-standard-time=2019-03-31T10:49:41Z

    To create a hot backup BACKUP_NAME from table TABLE_NAME which will be
    converted to a standard backup in 1 week from now and expires in 2 weeks
    from now, run:

        $ gcloud bigtable backups create BACKUP_NAME \
            --instance=INSTANCE_NAME --cluster=CLUSTER_NAME \
            --table=TABLE_NAME --retention-period=2w --backup-type=HOT \
            --hot-to-standard-time=+P1w

POSITIONAL ARGUMENTS
     Backup resource - The Cloud Bigtable backup to create. The arguments in
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

       --cluster=CLUSTER
          Name of the Bigtable cluster.

          To set the cluster attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

REQUIRED FLAGS
     --table=TABLE
        ID of the table from which the backup will be created.

     Exactly one of these must be specified:

       --expiration-date=EXPIRATION_DATE
          Absolute expiration time of the backup. From the time the request is
          received, must be:
          + At least 6 hours in the future
          + At most 90 days in the future

          See $ gcloud topic datetimes for information on date/time formats.

       --retention-period=RETENTION_PERIOD
          Retention period of the backup relative from now; must be:
          + At least 6 hours
          + At most 90 days

          See $ gcloud topic datetimes for information on duration formats.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --backup-type=BACKUP_TYPE
        Type of the backup; whether the backup is a standard backup or a hot
        backup. BACKUP_TYPE must be one of: backup-type-unspecified, hot,
        standard.

     --hot-to-standard-time=HOT_TO_STANDARD_TIME
        Time at which a hot backup will be converted to a standard backup
        relative from now; must be:
        * At least 24 hours

        Only applies for hot backups. See $ gcloud topic datetimes for
        information on date/time formats.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable backups create

        $ gcloud beta bigtable backups create
```

### gcloud bigtable backups delete

```text
NAME
    gcloud bigtable backups delete - delete an existing backup

SYNOPSIS
    gcloud bigtable backups delete
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an existing backup.

EXAMPLES
    To delete a backup, run:

        $ gcloud bigtable backups delete BACKUP_NAME \
            --instance=INSTANCE_NAME --cluster=CLUSTER_NAME

POSITIONAL ARGUMENTS
     Backup resource - Cloud Bigtable backup to delete. The arguments in this
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

       --cluster=CLUSTER
          Name of the Bigtable cluster.

          To set the cluster attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable backups delete

        $ gcloud beta bigtable backups delete
```

### gcloud bigtable backups describe

```text
NAME
    gcloud bigtable backups describe - retrieves information about a backup

SYNOPSIS
    gcloud bigtable backups describe
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieves information about a backup.

EXAMPLES
    To describe a backup, run:

        $ gcloud bigtable backups describe BACKUP_NAME \
            --instance=INSTANCE_NAME --cluster=CLUSTER_NAME

POSITIONAL ARGUMENTS
     Backup resource - Cloud Bigtable backup to describe. The arguments in this
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

       --cluster=CLUSTER
          Name of the Bigtable cluster.

          To set the cluster attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable backups describe

        $ gcloud beta bigtable backups describe
```

### gcloud bigtable backups get-iam-policy

```text
NAME
    gcloud bigtable backups get-iam-policy - get an IAM policy on a Cloud
        Bigtable Backup

SYNOPSIS
    gcloud bigtable backups get-iam-policy
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get an IAM policy on a Cloud Bigtable Backup.

EXAMPLES
    To get the IAM policy on the backup my-backup in instance my-instance and
    cluster my-cluster, run:

        $ gcloud bigtable backups get-iam-policy my-backup \
            --instance=`my-instance` --cluster=`my-cluster`

    See https://cloud.google.com/iam/docs/managing-policies for more
    information.

POSITIONAL ARGUMENTS
     Backup resource - Cloud Bigtable Backup to get the IAM policy for. The
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

       --cluster=CLUSTER
          Name of the Bigtable cluster.

          To set the cluster attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

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
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable backups get-iam-policy

        $ gcloud beta bigtable backups get-iam-policy
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud bigtable backups get-iam-policy my-backup \
    --instance='my-instance' \
    --cluster='my-cluster'
```

### gcloud bigtable backups list

```text
NAME
    gcloud bigtable backups list - list existing Bigtable backups

SYNOPSIS
    gcloud bigtable backups list [--cluster=CLUSTER] [--instance=INSTANCE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List existing Bigtable backups.

EXAMPLES
    To list all backups in an instance, run:

        $ gcloud bigtable backups list --instance=INSTANCE_NAME

    To list all backups in a cluster, run:

        $ gcloud bigtable backups list --instance=INSTANCE_NAME \
            --cluster=CLUSTER_NAME

FLAGS
     Cluster resource - The cluster to list backups for. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the instance attribute:
      * provide the argument --cluster on the command line with a fully
        specified name.

     --cluster=CLUSTER
        ID of the cluster or fully qualified identifier for the cluster.

        To set the cluster attribute:
        * provide the argument --cluster on the command line.

     Instance resource - The instance to list backups for. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --instance=INSTANCE
        ID of the instance or fully qualified identifier for the instance.

        To set the instance attribute:
        * provide the argument --instance on the command line.

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

        $ gcloud alpha bigtable backups list

        $ gcloud beta bigtable backups list
```

### gcloud bigtable backups remove-iam-policy-binding

```text
NAME
    gcloud bigtable backups remove-iam-policy-binding - remove an IAM policy
        binding from a Cloud Bigtable Backup

SYNOPSIS
    gcloud bigtable backups remove-iam-policy-binding
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) --member=PRINCIPAL
        --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding from a Cloud Bigtable Backup. One binding
    consists of a member, a role, and an optional condition.

EXAMPLES
    To remove an IAM policy binding for the role of roles/editor for the user
    test-user@gmail.com with backup my-backup in instance my-instance and
    cluster my-cluster, run:

        $ gcloud bigtable backups remove-iam-policy-binding my-backup \
            --instance=`my-instance` --cluster=`my-cluster` \
            --member=`user:test-user@gmail.com` --role=`roles/editor`

    To remove an IAM policy binding which expires at the end of the year 2020
    for the role of roles/bigtable.admin and the user test-user@gmail.com with
    backup my-backup in instance my-instance and cluster my-cluster, run:

        $ gcloud bigtable backups remove-iam-policy-binding my-backup \
            --instance=`my-instance` --cluster=`my-cluster` \
            --member=`user:test-user@gmail.com` \
            --role=`roles/bigtable.admin` \
            --condition=`expression=request.time < \
            timestamp("2021-01-01T00:00:00Z"),title=expires_end_of_2020,\
        description=Expires at midnight on 2020-12-31`

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Backup resource - Cloud Bigtable Backup to remove the IAM policy binding
     from. The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
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

       --cluster=CLUSTER
          Name of the Bigtable cluster.

          To set the cluster attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

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
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable backups remove-iam-policy-binding

        $ gcloud beta bigtable backups remove-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud bigtable backups remove-iam-policy-binding my-backup \
    --instance='my-instance' \
    --cluster='my-cluster' \
    --member='user:test-user@gmail.com' \
    --role='roles/editor'

gcloud bigtable backups remove-iam-policy-binding my-backup \
    --instance='my-instance' \
    --cluster='my-cluster' \
    --member='user:test-user@gmail.com' \
    --role='roles/bigtable.admin' \
    --condition='expression=request.time < timestamp("2021-01-01T00:00:00Z"),title=expires_end_of_2020,description=Expires at midnight on 2020-12-31'
```

### gcloud bigtable backups set-iam-policy

```text
NAME
    gcloud bigtable backups set-iam-policy - set an IAM policy on a Cloud
        Bigtable Backup

SYNOPSIS
    gcloud bigtable backups set-iam-policy
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set an IAM policy on a Cloud Bigtable Backup.

EXAMPLES
    To set the IAM policy from file my-policy on the backup my-backup in
    instance my-instance and cluster my-cluster, run:

        $ gcloud bigtable backups set-iam-policy my-backup \
            --instance=`my-instance` --cluster=`my-cluster` my-policy

    See https://cloud.google.com/iam/docs/managing-policies for more
    information.

POSITIONAL ARGUMENTS
     Backup resource - Cloud Bigtable Backup to set the IAM policy on. The
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

       --cluster=CLUSTER
          Name of the Bigtable cluster.

          To set the cluster attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

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
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable backups set-iam-policy

        $ gcloud beta bigtable backups set-iam-policy
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud bigtable backups set-iam-policy my-backup \
    --instance='my-instance' \
    --cluster='my-cluster' my-policy
```

### gcloud bigtable backups update

```text
NAME
    gcloud bigtable backups update - update a backup, only supported for the
        following fields: --expiration-date and --retention-period

SYNOPSIS
    gcloud bigtable backups update
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE)
        [--hot-to-standard-time=HOT_TO_STANDARD_TIME]
        [--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a backup, only supported for the following fields: --expiration-date
    and --retention-period.

EXAMPLES
    To update the expire time of backup BACKUP_NAME to 7 days from now, run:

        $ gcloud bigtable backups update BACKUP_NAME \
            --instance=INSTANCE_NAME --cluster=CLUSTER_NAME \
            --retention-period=7d

    To update the hot-to-standard time of backup BACKUP_NAME to
    2019-03-31T10:49:41Z, run:

        $ gcloud bigtable backups update BACKUP_NAME \
            --instance=INSTANCE_NAME --cluster=CLUSTER_NAME \
            --hot-to-standard-time=2019-03-31T10:49:41Z

    To update the hot-to-standard time of backup BACKUP_NAME to 7 days from
    now, run:

        $ gcloud bigtable backups update BACKUP_NAME \
            --instance=INSTANCE_NAME --cluster=CLUSTER_NAME \
            --hot-to-standard-time=+P7d

    To clear the hot-to-standard time of backup BACKUP_NAME, run:

        $ gcloud bigtable backups update BACKUP_NAME \
            --instance=INSTANCE_NAME --cluster=CLUSTER_NAME \
            --hot-to-standard-time=''

POSITIONAL ARGUMENTS
     Backup resource - Cloud Bigtable backup to update. The arguments in this
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

       --cluster=CLUSTER
          Name of the Bigtable cluster.

          To set the cluster attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

FLAGS
     --hot-to-standard-time=HOT_TO_STANDARD_TIME
        Time at which a hot backup will be converted to a standard backup; must
        be at least 24 hours from backup creation time. Only applies for hot
        backups. See $ gcloud topic datetimes for information on date/time
        formats. See $ gcloud bigtable backups describe for creation time.

     At most one of these can be specified:

       --expiration-date=EXPIRATION_DATE
          Absolute expiration time of the backup; must be at least 6 hours and
          at most 90 days from backup creation time. See $ gcloud topic
          datetimes for information on date/time formats. See $ gcloud bigtable
          backups describe for creation time.

       --retention-period=RETENTION_PERIOD
          Retention period of the backup relative from now; must be at least 6
          hours and at most 90 days from backup creation time. See $ gcloud
          topic datetimes for information on duration formats. See $ gcloud
          bigtable backups describe for creation time.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable backups update

        $ gcloud beta bigtable backups update
```

### gcloud beta bigtable backups add-iam-policy-binding

```text
NAME
    gcloud beta bigtable backups add-iam-policy-binding - add an IAM policy
        binding to a Cloud Bigtable Backup

SYNOPSIS
    gcloud beta bigtable backups add-iam-policy-binding
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) --member=PRINCIPAL
        --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable backups copy

```text
NAME
    gcloud beta bigtable backups copy - copy a Cloud Bigtable backup to a new
        backup

SYNOPSIS
    gcloud beta bigtable backups copy
        (--destination-backup=DESTINATION_BACKUP
          : --destination-cluster=DESTINATION_CLUSTER
          --destination-instance=DESTINATION_INSTANCE
          --destination-project=DESTINATION_PROJECT)
        (--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD)
        (--source-backup=SOURCE_BACKUP : --source-cluster=SOURCE_CLUSTER
          --source-instance=SOURCE_INSTANCE --source-project=SOURCE_PROJECT)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable backups create

```text
NAME
    gcloud beta bigtable backups create - creates a backup of a Cloud Bigtable
        table

SYNOPSIS
    gcloud beta bigtable backups create
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) --table=TABLE
        (--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD) [--async]
        [--backup-type=BACKUP_TYPE]
        [--hot-to-standard-time=HOT_TO_STANDARD_TIME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable backups delete

```text
NAME
    gcloud beta bigtable backups delete - delete an existing backup

SYNOPSIS
    gcloud beta bigtable backups delete
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable backups describe

```text
NAME
    gcloud beta bigtable backups describe - retrieves information about a
        backup

SYNOPSIS
    gcloud beta bigtable backups describe
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable backups get-iam-policy

```text
NAME
    gcloud beta bigtable backups get-iam-policy - get an IAM policy on a Cloud
        Bigtable Backup

SYNOPSIS
    gcloud beta bigtable backups get-iam-policy
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable backups list

```text
NAME
    gcloud beta bigtable backups list - list existing Bigtable backups

SYNOPSIS
    gcloud beta bigtable backups list [--cluster=CLUSTER] [--instance=INSTANCE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable backups remove-iam-policy-binding

```text
NAME
    gcloud beta bigtable backups remove-iam-policy-binding - remove an IAM
        policy binding from a Cloud Bigtable Backup

SYNOPSIS
    gcloud beta bigtable backups remove-iam-policy-binding
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) --member=PRINCIPAL
        --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable backups set-iam-policy

```text
NAME
    gcloud beta bigtable backups set-iam-policy - set an IAM policy on a Cloud
        Bigtable Backup

SYNOPSIS
    gcloud beta bigtable backups set-iam-policy
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable backups update

```text
NAME
    gcloud beta bigtable backups update - update a backup, only supported for
        the following fields: --expiration-date and --retention-period

SYNOPSIS
    gcloud beta bigtable backups update
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE)
        [--hot-to-standard-time=HOT_TO_STANDARD_TIME]
        [--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable backups add-iam-policy-binding

```text
NAME
    gcloud alpha bigtable backups add-iam-policy-binding - add an IAM policy
        binding to a Cloud Bigtable Backup

SYNOPSIS
    gcloud alpha bigtable backups add-iam-policy-binding
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) --member=PRINCIPAL
        --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable backups copy

```text
NAME
    gcloud alpha bigtable backups copy - copy a Cloud Bigtable backup to a new
        backup

SYNOPSIS
    gcloud alpha bigtable backups copy
        (--destination-backup=DESTINATION_BACKUP
          : --destination-cluster=DESTINATION_CLUSTER
          --destination-instance=DESTINATION_INSTANCE
          --destination-project=DESTINATION_PROJECT)
        (--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD)
        (--source-backup=SOURCE_BACKUP : --source-cluster=SOURCE_CLUSTER
          --source-instance=SOURCE_INSTANCE --source-project=SOURCE_PROJECT)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable backups create

```text
NAME
    gcloud alpha bigtable backups create - creates a backup of a Cloud Bigtable
        table

SYNOPSIS
    gcloud alpha bigtable backups create
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) --table=TABLE
        (--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD) [--async]
        [--backup-type=BACKUP_TYPE]
        [--hot-to-standard-time=HOT_TO_STANDARD_TIME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable backups delete

```text
NAME
    gcloud alpha bigtable backups delete - delete an existing backup

SYNOPSIS
    gcloud alpha bigtable backups delete
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable backups describe

```text
NAME
    gcloud alpha bigtable backups describe - retrieves information about a
        backup

SYNOPSIS
    gcloud alpha bigtable backups describe
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable backups get-iam-policy

```text
NAME
    gcloud alpha bigtable backups get-iam-policy - get an IAM policy on a Cloud
        Bigtable Backup

SYNOPSIS
    gcloud alpha bigtable backups get-iam-policy
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable backups list

```text
NAME
    gcloud alpha bigtable backups list - list existing Bigtable backups

SYNOPSIS
    gcloud alpha bigtable backups list [--cluster=CLUSTER]
        [--instance=INSTANCE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable backups remove-iam-policy-binding

```text
NAME
    gcloud alpha bigtable backups remove-iam-policy-binding - remove an IAM
        policy binding from a Cloud Bigtable Backup

SYNOPSIS
    gcloud alpha bigtable backups remove-iam-policy-binding
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) --member=PRINCIPAL
        --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable backups set-iam-policy

```text
NAME
    gcloud alpha bigtable backups set-iam-policy - set an IAM policy on a Cloud
        Bigtable Backup

SYNOPSIS
    gcloud alpha bigtable backups set-iam-policy
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable backups update

```text
NAME
    gcloud alpha bigtable backups update - update a backup, only supported for
        the following fields: --expiration-date and --retention-period

SYNOPSIS
    gcloud alpha bigtable backups update
        (BACKUP : --cluster=CLUSTER --instance=INSTANCE)
        [--hot-to-standard-time=HOT_TO_STANDARD_TIME]
        [--expiration-date=EXPIRATION_DATE
          | --retention-period=RETENTION_PERIOD] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example wraps flag values in backticks (for example `` --instance=`my-instance` ``), which the shell runs as command substitutions; the runnable form passes the values in single quotes.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/backups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
