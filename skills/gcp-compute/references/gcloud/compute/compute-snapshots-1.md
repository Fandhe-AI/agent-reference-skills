---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/snapshots
---

# gcloud compute snapshots (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute snapshots add-iam-policy-binding

```text
NAME
    gcloud compute snapshots add-iam-policy-binding - add IAM policy binding to
        a Compute Engine snapshot

SYNOPSIS
    gcloud compute snapshots add-iam-policy-binding SNAPSHOT_NAME
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to the IAM policy of a Compute Engine snapshot.
    One binding consists of a member, a role, and an optional condition.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/compute.securityAdmin'
    for the user 'test-user@gmail.com' with snapshot 'my-snapshot', run:

        $ gcloud compute snapshots add-iam-policy-binding my-snapshot \
            --member='user:test-user@gmail.com' \
            --role='roles/compute.securityAdmin'

    To add an IAM policy binding which expires at the end of the year 2018 for
    the role of 'roles/compute.securityAdmin' and the user
    'test-user@gmail.com' with snapshot 'my-snapshot', run:

        $ gcloud compute snapshots add-iam-policy-binding my-snapshot \
            --member='user:test-user@gmail.com' \
            --role='roles/compute.securityAdmin' \
            --condition='expression=request.time <
         timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,descrip\
        tion=Expires at midnight on 2018-12-31'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Snapshot resource - The snapshot for which to add IAM policy binding to.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument snapshot_name on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SNAPSHOT_NAME
          ID of the snapshot or fully qualified identifier for the snapshot.

          To set the snapshot_name attribute:
          + provide the argument snapshot_name on the command line.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to add the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

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
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute snapshots add-iam-policy-binding

        $ gcloud beta compute snapshots add-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute snapshots add-iam-policy-binding my-snapshot \
    --member='user:test-user@gmail.com' \
    --role='roles/compute.securityAdmin' \
    --condition='expression=request.time < timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,description=Expires at midnight on 2018-12-31'
```

### gcloud compute snapshots add-labels

```text
NAME
    gcloud compute snapshots add-labels - add labels to Google Compute Engine
        snapshots

SYNOPSIS
    gcloud compute snapshots add-labels SNAPSHOT_NAME --labels=[KEY=VALUE,...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute snapshots add-labels adds labels to a Google Compute Engine
    snapshot.

EXAMPLES
    To add key-value pairs k0=v0 and k1=v1 to 'example-snapshot'

        $ gcloud compute snapshots add-labels example-snapshot \
            --labels=k0=v0,k1=v1

    Labels can be used to identify the snapshot and to filter them. To find a
    snapshot labeled with key-value pair k1, v2

        $ gcloud compute snapshots list --filter='labels.k1:v2'

    To list only the labels when describing a resource, use --format

        $ gcloud compute snapshots describe example-snapshot \
            --format='default(labels)'

POSITIONAL ARGUMENTS
     SNAPSHOT_NAME
        Name of the snapshot to operate on.

REQUIRED FLAGS
     --labels=[KEY=VALUE,...]
        A list of labels to add.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute snapshots add-labels

        $ gcloud beta compute snapshots add-labels
```

### gcloud compute snapshots create

```text
NAME
    gcloud compute snapshots create - create Compute Engine snapshots

SYNOPSIS
    gcloud compute snapshots create NAME [--async] [--chain-name=CHAIN_NAME]
        [--csek-key-file=FILE] [--description=DESCRIPTION] [--guest-flush]
        [--kms-key-service-account=KMS_KEY_SERVICE_ACCOUNT]
        [--labels=[KEY=VALUE,...]] [--resource-manager-tags=[KEY=VALUE,...]]
        [--snapshot-type=SNAPSHOT_TYPE] [--source-disk=SOURCE_DISK]
        [--source-disk-for-recovery-checkpoint=SOURCE_DISK_FOR_RECOVERY_CHECKPOINT]
        [--source-disk-for-recovery-checkpoint-region=SOURCE_DISK_FOR_RECOVERY_CHECKPOINT_REGION]
        [--source-disk-key-file=FILE]
        [--source-instant-snapshot=SOURCE_INSTANT_SNAPSHOT]
        [--source-instant-snapshot-key-file=FILE] [--storage-location=LOCATION]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [--source-disk-region=SOURCE_DISK_REGION
          | --source-disk-zone=SOURCE_DISK_ZONE]
        [--source-instant-snapshot-region=SOURCE_INSTANT_SNAPSHOT_REGION
          | --source-instant-snapshot-zone=SOURCE_INSTANT_SNAPSHOT_ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute snapshots create creates snapshot of persistent disk.
    Snapshots are useful for backing up persistent disk data and for creating
    custom images. For more information, see
    https://cloud.google.com/compute/docs/disks/create-snapshots.

EXAMPLES
    To create a snapshot 'my-snap' from a disk 'my-disk' in zone 'us-east1-a',
    run:

        $ gcloud compute snapshots create my-snap --source-disk=my-disk \
          --source-disk-zone=us-east1-a

POSITIONAL ARGUMENTS
     NAME
        The name of the snapshot.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --chain-name=CHAIN_NAME
        Create the new snapshot in the snapshot chain labeled with the
        specified name. The chain name must be 1-63 characters long and comply
        with RFC1035. Use this flag only if you are an advanced service owner
        who needs to create separate snapshot chains, for example, for
        chargeback tracking. When you describe your snapshot resource, this
        field is visible only if it has a non-empty value.

     --csek-key-file=FILE
        (DEPRECATED) Path to a Customer-Supplied Encryption Key (CSEK) key file
        that maps Compute Engine resources to user managed keys to be used when
        creating, mounting, or taking snapshots of disks.

            If you pass `-` as value of the flag, the CSEK is read from stdin.
            See https://cloud.google.com/compute/docs/disks/customer-supplied-encryption for more details.

        The --csek-key-file flag is deprecated.

     --description=DESCRIPTION
        Text to describe the new snapshot.

     --guest-flush
        Create an application-consistent snapshot. If the disk is attached to a
        Windows VM instance, this creates a Volume Shadow Copy Service (VSS) of
        the disk. For Linux instances, Compute Engine executes pre- and
        post-snapshot scripts before and after creating the snapshot of the
        disk. Before you run this command, you must have already saved the
        scripts on the instance in the directory /etc/google/snapshots/.

        To learn more about application-consistent snapshots on Windows and
        Linux, see Create a Windows application-consistent disk snapshot
        (https://docs.cloud.google.com/compute/docs/instances/windows/creating-windows-persistent-disk-snapshot)
        and Create Linux application-consistent disk snapshots
        (https://docs.cloud.google.com/compute/docs/disks/creating-linux-application-consistent-pd-snapshots)
        respectively.

     --kms-key-service-account=KMS_KEY_SERVICE_ACCOUNT
        Service account email to use when requesting encryption for the
        specified KMS key.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --resource-manager-tags=[KEY=VALUE,...]
        A comma-separated list of Resource Manager tags to apply to the
        snapshot.

     --snapshot-type=SNAPSHOT_TYPE
        Type of snapshot. If a snapshot type is not specified, a STANDARD
        snapshot will be created. SNAPSHOT_TYPE must be one of: ARCHIVE,
        STANDARD.

     --source-disk=SOURCE_DISK
        Source disk used to create the snapshot. To create a snapshot from a
        source disk in a different project, specify the full path to the source
        disk. For example:
        https://www.googleapis.com/compute/v1/projects/MY-PROJECT/zones/MY-ZONE/disks/MY-DISK

     --source-disk-for-recovery-checkpoint=SOURCE_DISK_FOR_RECOVERY_CHECKPOINT
        Source disk whose recovery checkpoint used to create the snapshot. To
        create a snapshot from the recovery checkpoint of a source disk in a
        different project, specify the full path to the source disk. For
        example: projects/MY-PROJECT/regions/MY-REGION/disks/MY-DISK

     --source-disk-for-recovery-checkpoint-region=SOURCE_DISK_FOR_RECOVERY_CHECKPOINT_REGION
        Region of the source disk for recovery checkpoint to operate on.
        Overrides the default compute/region property value for this command
        invocation.

     --source-disk-key-file=FILE
        (DEPRECATED) Path to the customer-supplied encryption key of the source
        disk. Required if the source disk is protected by a customer-supplied
        encryption key.

        The --source-disk-key-file flag is deprecated.

     --source-instant-snapshot=SOURCE_INSTANT_SNAPSHOT
        The name or URL of the source instant snapshot. If the name is
        provided, the instant snapshot's zone or region must be specified with
        --source-instant-snapshot-zone or --source-instant-snapshot-region
        accordingly. To create a snapshot from an instant snapshot in a
        different project, specify the full path to the instant snapshot. If
        the URL is provided, format should be:
        https://www.googleapis.com/compute/v1/projects/MY-PROJECT/zones/MY-ZONE/instantSnapshots/MY-INSTANT-SNAPSHOT

     --source-instant-snapshot-key-file=FILE
        (DEPRECATED) Path to the customer-supplied encryption key of the source
        instant snapshot. Required if the source instant snapshot is protected
        by a customer-supplied encryption key.

        The --source-instant-snapshot-key-file flag is deprecated.

     --storage-location=LOCATION
        Google Cloud Storage location, either regional or multi-regional, where
        snapshot content is to be stored. If absent, a nearby regional or
        multi-regional location is chosen automatically.

     Key resource - The Cloud KMS (Key Management Service) cryptokey that will
     be used to protect the snapshot. The 'Compute Engine Service Agent'
     service account must hold permission 'Cloud KMS CryptoKey
     Encrypter/Decrypter'. The arguments in this group can be used to specify
     the attributes of this resource.

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
        * provide the argument --kms-location on the command line;
        * provide the argument --region on the command line.

     --kms-project=KMS_PROJECT
        The Google Cloud project for the key.

        To set the kms-project attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-project on the command line;
        * set the property core/project.

     At most one of these can be specified:

       --source-disk-region=SOURCE_DISK_REGION
          Region of the source disk to operate on. Overrides the default
          compute/region property value for this command invocation.

       --source-disk-zone=SOURCE_DISK_ZONE
          Zone of the source disk to operate on. Overrides the default
          compute/zone property value for this command invocation.

     At most one of these can be specified:

       --source-instant-snapshot-region=SOURCE_INSTANT_SNAPSHOT_REGION
          Region of the source instant snapshot to operate on. Overrides the
          default compute/region property value for this command invocation.

       --source-instant-snapshot-zone=SOURCE_INSTANT_SNAPSHOT_ZONE
          Zone of the source instant snapshot to operate on. Overrides the
          default compute/zone property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute snapshots create

        $ gcloud beta compute snapshots create
```

### gcloud compute snapshots delete

```text
NAME
    gcloud compute snapshots delete - delete Compute Engine snapshots

SYNOPSIS
    gcloud compute snapshots delete SNAPSHOT_NAME [SNAPSHOT_NAME ...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute snapshots delete deletes one or more Compute Engine
    snapshots.

EXAMPLES
    To delete Compute Engine snapshots with the names 'snapshot-1' and
    'snapshot-2', run:

        $ gcloud compute snapshots delete snapshot-1 snapshot-2

    To list all snapshots that were created before a specific date, use the
    --filter flag with the gcloud compute snapshots list command.

        $ gcloud compute snapshots list \
            --filter="creationTimestamp<'2017-01-01'"

    For more information on how to use --filter with the list command, run $
    gcloud topic filters.

POSITIONAL ARGUMENTS
     SNAPSHOT_NAME [SNAPSHOT_NAME ...]
        Names of the snapshots to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute snapshots delete

        $ gcloud beta compute snapshots delete
```

### gcloud compute snapshots describe

```text
NAME
    gcloud compute snapshots describe - describe a Compute Engine snapshot

SYNOPSIS
    gcloud compute snapshots describe SNAPSHOT_NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute snapshots describe displays all data associated with a
    Compute Engine snapshot in a project.

    Given an existing snapshot is queried, successful output of this command
    looks like the following:

        creationTimestamp: '2018-05-07T10:45:46.988-07:00'
        diskSizeGb: '500'
        id: '1234567891234567890'
        kind: compute#snapshot
        labelFingerprint: 12345abcdWW=
        name: zs9utdhb8r1x
        selfLink: https://www.googleapis.com/compute/v1/projects/test-project-name/global/snapshots/snapshot-number
        sourceDisk: https://www.googleapis.com/compute/v1/projects/test-project-name/zones/us-central1-c/disks/test
        sourceDiskId: '1234567891234567890'
        status: READY
        storageBytes: '0'
        storageBytesStatus: UP_TO_DATE

EXAMPLES
    To run gcloud compute snapshots describe, you'll need the name of a
    snapshot. To list existing snapshots by name, run:

        $ gcloud compute snapshots list

    To display specific details of an existing Compute Engine snapshot (like
    its creation time, status, and storage details), run:

        $ gcloud compute snapshots describe SNAPSHOT_NAME \
            --format="table(creationTimestamp, status, storageBytesStatus)"

POSITIONAL ARGUMENTS
     SNAPSHOT_NAME
        Name of the snapshot to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute snapshots describe

        $ gcloud beta compute snapshots describe
```

### gcloud compute snapshots get-iam-policy

```text
NAME
    gcloud compute snapshots get-iam-policy - get the IAM policy for a Compute
        Engine snapshot

SYNOPSIS
    gcloud compute snapshots get-iam-policy SNAPSHOT_NAME [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute snapshots get-iam-policy displays the IAM policy associated
    with a snapshot. If formatted as JSON, the output can be edited and used as
    a policy file for set-iam-policy. The output includes an "etag" field
    identifying the version emitted and allowing detection of concurrent policy
    updates; see $ {parent} set-iam-policy for additional details.

EXAMPLES
    To print the IAM policy for a given snapshot, run:

        $ gcloud compute snapshots get-iam-policy my-snapshot

POSITIONAL ARGUMENTS
     Snapshot resource - The snapshot to display the IAM policy for. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument snapshot_name on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SNAPSHOT_NAME
          ID of the snapshot or fully qualified identifier for the snapshot.

          To set the snapshot_name attribute:
          + provide the argument snapshot_name on the command line.

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
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute snapshots get-iam-policy

        $ gcloud beta compute snapshots get-iam-policy
```

### gcloud compute snapshots list

```text
NAME
    gcloud compute snapshots list - list Google Compute Engine snapshots

SYNOPSIS
    gcloud compute snapshots list [NAME ...] [--regexp=REGEXP, -r REGEXP]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute snapshots list displays all Google Compute Engine snapshots
    in a project.

EXAMPLES
    To list all snapshots in a project in table form, run:

        $ gcloud compute snapshots list

    To list the URIs of all snapshots in a project, run:

        $ gcloud compute snapshots list --uri

POSITIONAL ARGUMENTS
     [NAME ...]
        (DEPRECATED) If provided, show details for the specified names and/or
        URIs of resources.

        Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )"
        instead.

FLAGS
     --regexp=REGEXP, -r REGEXP
        (DEPRECATED) Regular expression to filter the names of the results on.
        Any names that do not match the entire regular expression will be
        filtered out.

        Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.

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

        $ gcloud alpha compute snapshots list

        $ gcloud beta compute snapshots list
```

### gcloud compute snapshots remove-iam-policy-binding

```text
NAME
    gcloud compute snapshots remove-iam-policy-binding - remove IAM policy
        binding from a Compute Engine snapshot

SYNOPSIS
    gcloud compute snapshots remove-iam-policy-binding SNAPSHOT_NAME
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding from the IAM policy of a Compute Engine
    snapshot. One binding consists of a member, a role, and an optional
    condition.

EXAMPLES
    To remove an IAM policy binding for the role of
    'roles/compute.securityAdmin' for the user 'test-user@gmail.com' with
    snapshot 'my-snapshot', run:

        $ gcloud compute snapshots remove-iam-policy-binding my-snapshot \
            --member='user:test-user@gmail.com' \
            --role='roles/compute.securityAdmin'

    To remove an IAM policy binding which expires at the end of the year 2018
    for the role of 'roles/compute.securityAdmin' and the user
    'test-user@gmail.com' with snapshot 'my-snapshot', run:

        $ gcloud compute snapshots remove-iam-policy-binding my-snapshot \
            --member='user:test-user@gmail.com' \
            --role='roles/compute.securityAdmin' \
            --condition='expression=request.time <
         timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,descrip\
        tion=Expires at midnight on 2018-12-31'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Snapshot resource - The snapshot for which to remove IAM policy binding
     from. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument snapshot_name on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SNAPSHOT_NAME
          ID of the snapshot or fully qualified identifier for the snapshot.

          To set the snapshot_name attribute:
          + provide the argument snapshot_name on the command line.

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
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute snapshots remove-iam-policy-binding

        $ gcloud beta compute snapshots remove-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute snapshots remove-iam-policy-binding my-snapshot \
    --member='user:test-user@gmail.com' \
    --role='roles/compute.securityAdmin' \
    --condition='expression=request.time < timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,description=Expires at midnight on 2018-12-31'
```

### gcloud compute snapshots remove-labels

```text
NAME
    gcloud compute snapshots remove-labels - remove labels from Google Compute
        Engine snapshots

SYNOPSIS
    gcloud compute snapshots remove-labels SNAPSHOT_NAME
        (--all | --labels=KEY,[KEY,...]) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute snapshots remove-labels removes labels from a Google Compute
    Engine snapshot.

EXAMPLES
    To remove existing labels with key k0 and k1 from 'example-snapshot'

        $ gcloud compute snapshots remove-labels example-snapshot \
            --labels=k0,k1

    Labels can be used to identify the snapshot and to filter them. To find a
    snapshot labeled with key-value pair k1, v2

        $ gcloud compute snapshots list --filter='labels.k1:v2'

    To list only the labels when describing a resource, use --format

        $ gcloud compute snapshots describe example-snapshot \
            --format='default(labels)'

POSITIONAL ARGUMENTS
     SNAPSHOT_NAME
        Name of the snapshot to operate on.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --all
          Remove all labels from the resource.

       --labels=KEY,[KEY,...]
          A comma-separated list of label keys to remove from the resource.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute snapshots remove-labels

        $ gcloud beta compute snapshots remove-labels
```

### gcloud compute snapshots set-iam-policy

```text
NAME
    gcloud compute snapshots set-iam-policy - set the IAM policy for a Compute
        Engine snapshot

SYNOPSIS
    gcloud compute snapshots set-iam-policy SNAPSHOT_NAME POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given snapshot as defined in a JSON or YAML
    file.

EXAMPLES
    The following command will read am IAM policy defined in a JSON file
    'policy.json' and set it for the snapshot my-snapshot:

        $ gcloud compute snapshots set-iam-policy my-snapshot policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Snapshot resource - The snapshot to set the IAM policy for. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument snapshot_name on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SNAPSHOT_NAME
          ID of the snapshot or fully qualified identifier for the snapshot.

          To set the snapshot_name attribute:
          + provide the argument snapshot_name on the command line.

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
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute snapshots set-iam-policy

        $ gcloud beta compute snapshots set-iam-policy
```

### gcloud compute snapshots test-iam-permissions

```text
NAME
    gcloud compute snapshots test-iam-permissions - test IAM permissions for a
        Compute Engine standard or archive snapshot

SYNOPSIS
    gcloud compute snapshots test-iam-permissions SNAPSHOT_NAME
        --permissions=[PERMISSION,...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute snapshots test-iam-permissions tests the IAM permissions
    that a caller has on a Compute Engine standard or archive snapshot.

EXAMPLES
    To test if the caller has the compute.snapshots.get permission on a
    snapshot my-snapshot, run:

        $ gcloud compute snapshots test-iam-permissions my-snapshot \
            --permissions=compute.snapshots.get

POSITIONAL ARGUMENTS
     Snapshot resource - The snapshot for which to test permissions. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument snapshot_name on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SNAPSHOT_NAME
          ID of the snapshot or fully qualified identifier for the snapshot.

          To set the snapshot_name attribute:
          + provide the argument snapshot_name on the command line.

REQUIRED FLAGS
     --permissions=[PERMISSION,...]
        The permissions to test.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute snapshots test-iam-permissions

        $ gcloud beta compute snapshots test-iam-permissions
```

### gcloud compute snapshots update

```text
NAME
    gcloud compute snapshots update - update a Compute Engine snapshot

SYNOPSIS
    gcloud compute snapshots update SNAPSHOT_NAME
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute snapshots update updates labels for a Compute Engine
    snapshot.

EXAMPLES
    To update labels k0 and k1 and remove labels with key k3, run:

        $ gcloud compute snapshots update example-snapshot \
            --update-labels=k0=value1,k1=value2 --remove-labels=k3

        `_k0_` and `_k1_` will be added as new labels if not already present.

    Labels can be used to identify the snapshot and to filter them like:

        $ gcloud compute snapshots list --filter='labels.k1:value2'

    To list only the labels when describing a resource, use --format:

        $ gcloud compute snapshots describe example-snapshot \
            --format="default(labels)"

POSITIONAL ARGUMENTS
     SNAPSHOT_NAME
        Name of the snapshot to update.

FLAGS
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

              $ gcloud compute snapshots update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud compute snapshots update --clear-labels \
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

        $ gcloud alpha compute snapshots update

        $ gcloud beta compute snapshots update
```

### gcloud compute snapshots update-kms-key

```text
NAME
    gcloud compute snapshots update-kms-key - update the KMS key of a Compute
        Engine standard or archive snapshot

SYNOPSIS
    gcloud compute snapshots update-kms-key SNAPSHOT_NAME [--region=REGION]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute snapshots update-kms-key updates the KMS key of a Compute
    Engine standard or archive snapshot by rotating it to the primary version
    of the key or to the primary version of a new KMS key.

EXAMPLES
    To update the KMS key of a snapshot named example-snapshot-1, run:

        $ gcloud compute snapshots update-kms-key example-snapshot-1

    To update the KMS key of a snapshot named example-snapshot-2 to a new KMS
    key named example-key in a key ring named example-key-ring in the global
    scope, run:

        $ gcloud compute snapshots update-kms-key example-snapshot-2 \
            --kms-key=example-key --kms-keyring=example-key-ring \
            --kms-location=global

POSITIONAL ARGUMENTS
     SNAPSHOT_NAME
        Name of the snapshot to update the KMS key for.

FLAGS
     --region=REGION
        The region of the snapshot to update.

     Key resource - The Cloud KMS (Key Management Service) cryptokey that will
     be used to protect the snapshot. The 'Compute Engine Service Agent'
     service account must hold permission 'Cloud KMS CryptoKey
     Encrypter/Decrypter'. The arguments in this group can be used to specify
     the attributes of this resource.

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
        * provide the argument --kms-location on the command line;
        * provide the argument --region on the command line.

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

        $ gcloud alpha compute snapshots update-kms-key

        $ gcloud beta compute snapshots update-kms-key
```

### gcloud beta compute snapshots add-iam-policy-binding

```text
NAME
    gcloud beta compute snapshots add-iam-policy-binding - add IAM policy
        binding to a Compute Engine snapshot

SYNOPSIS
    gcloud beta compute snapshots add-iam-policy-binding SNAPSHOT_NAME
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute snapshots add-labels

```text
NAME
    gcloud beta compute snapshots add-labels - add labels to Google Compute
        Engine snapshots

SYNOPSIS
    gcloud beta compute snapshots add-labels SNAPSHOT_NAME
        --labels=[KEY=VALUE,...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute snapshots create

```text
NAME
    gcloud beta compute snapshots create - create Compute Engine snapshots

SYNOPSIS
    gcloud beta compute snapshots create NAME [--async]
        [--chain-name=CHAIN_NAME] [--csek-key-file=FILE]
        [--description=DESCRIPTION] [--guest-flush]
        [--kms-key-service-account=KMS_KEY_SERVICE_ACCOUNT]
        [--labels=[KEY=VALUE,...]] [--resource-manager-tags=[KEY=VALUE,...]]
        [--snapshot-type=SNAPSHOT_TYPE] [--source-disk=SOURCE_DISK]
        [--source-disk-for-recovery-checkpoint=SOURCE_DISK_FOR_RECOVERY_CHECKPOINT]
        [--source-disk-for-recovery-checkpoint-region=SOURCE_DISK_FOR_RECOVERY_CHECKPOINT_REGION]
        [--source-disk-key-file=FILE]
        [--source-instant-snapshot=SOURCE_INSTANT_SNAPSHOT]
        [--source-instant-snapshot-key-file=FILE] [--storage-location=LOCATION]
        [--global | --region=REGION]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [--source-disk-region=SOURCE_DISK_REGION
          | --source-disk-zone=SOURCE_DISK_ZONE]
        [--source-instant-snapshot-region=SOURCE_INSTANT_SNAPSHOT_REGION
          | --source-instant-snapshot-zone=SOURCE_INSTANT_SNAPSHOT_ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute snapshots delete

```text
NAME
    gcloud beta compute snapshots delete - delete Compute Engine snapshots

SYNOPSIS
    gcloud beta compute snapshots delete SNAPSHOT_NAME [SNAPSHOT_NAME ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute snapshots describe

```text
NAME
    gcloud beta compute snapshots describe - describe a Compute Engine snapshot

SYNOPSIS
    gcloud beta compute snapshots describe SNAPSHOT_NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute snapshots get-effective-recycle-bin-rule

```text
NAME
    gcloud beta compute snapshots get-effective-recycle-bin-rule - returns the
        effective recycle bin rule for a Compute Engine snapshot

SYNOPSIS
    gcloud beta compute snapshots get-effective-recycle-bin-rule SNAPSHOT_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute snapshots get-iam-policy

```text
NAME
    gcloud beta compute snapshots get-iam-policy - get the IAM policy for a
        Compute Engine snapshot

SYNOPSIS
    gcloud beta compute snapshots get-iam-policy SNAPSHOT_NAME
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute snapshots list

```text
NAME
    gcloud beta compute snapshots list - list Google Compute Engine snapshots

SYNOPSIS
    gcloud beta compute snapshots list [NAME ...] [--regexp=REGEXP, -r REGEXP]
        [--global | --regions=[REGION,...]] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute snapshots remove-iam-policy-binding

```text
NAME
    gcloud beta compute snapshots remove-iam-policy-binding - remove IAM policy
        binding from a Compute Engine snapshot

SYNOPSIS
    gcloud beta compute snapshots remove-iam-policy-binding SNAPSHOT_NAME
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute snapshots remove-labels

```text
NAME
    gcloud beta compute snapshots remove-labels - remove labels from Google
        Compute Engine snapshots

SYNOPSIS
    gcloud beta compute snapshots remove-labels SNAPSHOT_NAME
        (--all | --labels=KEY,[KEY,...]) [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute snapshots set-iam-policy

```text
NAME
    gcloud beta compute snapshots set-iam-policy - set the IAM policy for a
        Compute Engine snapshot

SYNOPSIS
    gcloud beta compute snapshots set-iam-policy SNAPSHOT_NAME POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute snapshots test-iam-permissions

```text
NAME
    gcloud beta compute snapshots test-iam-permissions - test IAM permissions
        for a Compute Engine standard or archive snapshot

SYNOPSIS
    gcloud beta compute snapshots test-iam-permissions SNAPSHOT_NAME
        --permissions=[PERMISSION,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute snapshots update

```text
NAME
    gcloud beta compute snapshots update - update a Compute Engine snapshot

SYNOPSIS
    gcloud beta compute snapshots update SNAPSHOT_NAME
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute snapshots update-kms-key

```text
NAME
    gcloud beta compute snapshots update-kms-key - update the KMS key of a
        Compute Engine standard or archive snapshot

SYNOPSIS
    gcloud beta compute snapshots update-kms-key SNAPSHOT_NAME
        [--region=REGION]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshots add-iam-policy-binding

```text
NAME
    gcloud alpha compute snapshots add-iam-policy-binding - add IAM policy
        binding to a Compute Engine snapshot

SYNOPSIS
    gcloud alpha compute snapshots add-iam-policy-binding SNAPSHOT_NAME
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshots add-labels

```text
NAME
    gcloud alpha compute snapshots add-labels - add labels to Google Compute
        Engine snapshots

SYNOPSIS
    gcloud alpha compute snapshots add-labels SNAPSHOT_NAME
        --labels=[KEY=VALUE,...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshots create

```text
NAME
    gcloud alpha compute snapshots create - create Compute Engine snapshots

SYNOPSIS
    gcloud alpha compute snapshots create NAME [--async]
        [--chain-name=CHAIN_NAME] [--csek-key-file=FILE]
        [--description=DESCRIPTION] [--guest-flush]
        [--kms-key-service-account=KMS_KEY_SERVICE_ACCOUNT]
        [--labels=[KEY=VALUE,...]] [--max-retention-days=MAX_RETENTION_DAYS]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--snapshot-type=SNAPSHOT_TYPE] [--source-disk=SOURCE_DISK]
        [--source-disk-for-recovery-checkpoint=SOURCE_DISK_FOR_RECOVERY_CHECKPOINT]
        [--source-disk-for-recovery-checkpoint-region=SOURCE_DISK_FOR_RECOVERY_CHECKPOINT_REGION]
        [--source-disk-key-file=FILE]
        [--source-instant-snapshot=SOURCE_INSTANT_SNAPSHOT]
        [--source-instant-snapshot-key-file=FILE] [--storage-location=LOCATION]
        [--global | --region=REGION]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [--source-disk-region=SOURCE_DISK_REGION
          | --source-disk-zone=SOURCE_DISK_ZONE]
        [--source-instant-snapshot-region=SOURCE_INSTANT_SNAPSHOT_REGION
          | --source-instant-snapshot-zone=SOURCE_INSTANT_SNAPSHOT_ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshots delete

```text
NAME
    gcloud alpha compute snapshots delete - delete Compute Engine snapshots

SYNOPSIS
    gcloud alpha compute snapshots delete SNAPSHOT_NAME [SNAPSHOT_NAME ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshots describe

```text
NAME
    gcloud alpha compute snapshots describe - describe a Compute Engine
        snapshot

SYNOPSIS
    gcloud alpha compute snapshots describe SNAPSHOT_NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshots get-effective-recycle-bin-rule

```text
NAME
    gcloud alpha compute snapshots get-effective-recycle-bin-rule - returns the
        effective recycle bin rule for a Compute Engine snapshot

SYNOPSIS
    gcloud alpha compute snapshots get-effective-recycle-bin-rule SNAPSHOT_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshots get-iam-policy

```text
NAME
    gcloud alpha compute snapshots get-iam-policy - get the IAM policy for a
        Compute Engine snapshot

SYNOPSIS
    gcloud alpha compute snapshots get-iam-policy SNAPSHOT_NAME
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshots list

```text
NAME
    gcloud alpha compute snapshots list - list Google Compute Engine snapshots

SYNOPSIS
    gcloud alpha compute snapshots list [NAME ...] [--regexp=REGEXP, -r REGEXP]
        [--global | --regions=[REGION,...]] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute snapshots create --csek-key-file`: "The --csek-key-file flag is deprecated."; `gcloud compute snapshots create --source-disk-key-file`: "The --source-disk-key-file flag is deprecated."; `gcloud compute snapshots create --source-instant-snapshot-key-file`: "The --source-instant-snapshot-key-file flag is deprecated."; `gcloud compute snapshots list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute snapshots list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (the help text above is verbatim): the `--kms-location` description of the GA `snapshots create` lists "provide the argument --region on the command line" as a way to set the kms-location attribute, but `--region` is not in the GA SYNOPSIS (gcloud 593.0.0 rejects it on the GA command); set the location with `--kms-location` or a fully specified `--kms-key`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/snapshots (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
