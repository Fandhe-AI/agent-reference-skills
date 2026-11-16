---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bms/nfs-shares
---

# gcloud bms nfs-shares

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bms nfs-shares create

```text
NAME
    gcloud bms nfs-shares create - create a Bare Metal Solution NFS share

SYNOPSIS
    gcloud bms nfs-shares create (NFS_SHARE : --region=REGION)
        --allowed-client=[PROPERTY=VALUE,...] --size-gib=SIZE_GIB
        --storage-type=STORAGE_TYPE [--async] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Bare Metal Solution NFS share.

EXAMPLES
    To create an NFS share called my-share in region us-central1, with
    requested size of 256 Gib, SSD storage and 2 allowed clients, run:

        $ gcloud bms nfs-shares create my-share --region=us-central1 \
            --size-gib=256 --storage-type=SSD \
            --allowed-client=network=my-network,\
        network-project-id=some-other-project,cidr=10.130.240.24/29,\
        mount-permissions=READ_ONLY,allow-dev=yes,allow-suid=no,\
        enable-root-squash=yes \
            --allowed-client=network=my-network2,cidr=10.130.240.26/28,\
        mount-permissions=READ_WRITE,allow-dev=yes,allow-suid=yes,\
        enable-root-squash=no

POSITIONAL ARGUMENTS
     Nfs share resource - nfs_share. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument nfs_share on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NFS_SHARE
          ID of the nfs_share or fully qualified identifier for the nfs_share.

          To set the nfs_share attribute:
          + provide the argument nfs_share on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument nfs_share on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

REQUIRED FLAGS
     --allowed-client=[PROPERTY=VALUE,...]
        Adds an allowed client to the NFS share. This flag can be repeated to
        specify multiple allowed clients.

         network
            The name of the network to allow.

         network-project-id
            The project ID of the allowed client network. If not present, the
            project ID of the NFS share will be used.

         cidr
            The subnet of IP addresses permitted to access the NFS share.

         mount-permissions
            The mount permissions for the allowed client. MOUNT_PERMISSIONS
            must be one of: READ_ONLY, READ_WRITE.

         allow-dev
            If yes, allows creation of devices.

         allow-suid
            If yes, allows SUID.

         enable-root-squash
            If yes, enables root squashing which is a special mapping of the
            remote superuser (root) identity when using identity authentication
            .

     --size-gib=SIZE_GIB
        The requested size of the NFS share in GiB

     --storage-type=STORAGE_TYPE
        Specifies the storage type of the underlying volume which will be
        created for the NFS share. STORAGE_TYPE must be one of:

         HDD
            The storage type of the underlying volume will be HDD
         SSD
            The storage type of the underlying volume will be SSD

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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

        $ gcloud alpha bms nfs-shares create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud bms nfs-shares create my-share \
    --region=us-central1 \
    --size-gib=256 \
    --storage-type=SSD \
    --allowed-client=network=my-network,network-project-id=some-other-project,cidr=10.130.240.24/29,mount-permissions=READ_ONLY,allow-dev=yes,allow-suid=no,enable-root-squash=yes \
    --allowed-client=network=my-network2,cidr=10.130.240.26/28,mount-permissions=READ_WRITE,allow-dev=yes,allow-suid=yes,enable-root-squash=no
```

### gcloud bms nfs-shares delete

```text
NAME
    gcloud bms nfs-shares delete - delete a Bare Metal Solution NFS share

SYNOPSIS
    gcloud bms nfs-shares delete (NFS_SHARE : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Bare Metal Solution NFS share.

EXAMPLES
    To delete an NFS share called my-share in region us-central1, run:

        $ gcloud bms nfs-shares delete my-share --region=us-central1

POSITIONAL ARGUMENTS
     Nfs share resource - nfs_share. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument nfs_share on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NFS_SHARE
          ID of the nfs_share or fully qualified identifier for the nfs_share.

          To set the nfs_share attribute:
          + provide the argument nfs_share on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument nfs_share on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

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

        $ gcloud alpha bms nfs-shares delete
```

### gcloud bms nfs-shares describe

```text
NAME
    gcloud bms nfs-shares describe - describe a Bare Metal solution NFS share

SYNOPSIS
    gcloud bms nfs-shares describe (NFS_SHARE : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Bare Metal Solution NFS share.

EXAMPLES
    To get a description of an NFS share called my-nfs-share in project
    my-project and region us-central1, run:

        $ gcloud bms nfs-shares describe my-nfs-share --project=my-project \
            --region=us-central1

POSITIONAL ARGUMENTS
     Nfs share resource - nfs_share. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument nfs_share on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NFS_SHARE
          ID of the nfs_share or fully qualified identifier for the nfs_share.

          To set the nfs_share attribute:
          + provide the argument nfs_share on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument nfs_share on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms nfs-shares describe
```

### gcloud bms nfs-shares list

```text
NAME
    gcloud bms nfs-shares list - list Bare Metal Solution NFS shares in a
        project

SYNOPSIS
    gcloud bms nfs-shares list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Bare Metal Solution NFS shares in a project.

EXAMPLES
    To list NFS shares within the project in the region us-central1, run:

        $ gcloud bms nfs-shares list --region=us-central1

    Or:

    To list all NFS shares in the project, run:

        $ gcloud bms nfs-shares list

FLAGS
     Region resource - region. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --region=REGION
        ID of the region or fully qualified identifier for the region.

        To set the region attribute:
        * provide the argument --region on the command line.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms nfs-shares list
```

### gcloud bms nfs-shares rename

```text
NAME
    gcloud bms nfs-shares rename - rename a Bare Metal Solution nfs-share

SYNOPSIS
    gcloud bms nfs-shares rename (NFS_SHARE : --region=REGION)
        --new-name=NEW_NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Rename a Bare Metal Solution nfs-share.

EXAMPLES
    To rename a nfs-share my-nfs-share to my-new-nfs-share-name in region
    us-central1, run:

        $ gcloud bms nfs-shares rename my-nfs-share \
            --new-name=my-new-nfs-share-name --region=us-central1 \
            --project=bms-example-project

POSITIONAL ARGUMENTS
     Nfs share resource - nfs_share. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument nfs_share on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NFS_SHARE
          ID of the nfs_share or fully qualified identifier for the nfs_share.

          To set the nfs_share attribute:
          + provide the argument nfs_share on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument nfs_share on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

REQUIRED FLAGS
     --new-name=NEW_NAME
        New nfs-share name for renaming an already existing nfs-share.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms nfs-shares rename
```

### gcloud bms nfs-shares update

```text
NAME
    gcloud bms nfs-shares update - update a Bare Metal Solution NFS share

SYNOPSIS
    gcloud bms nfs-shares update (NFS_SHARE : --region=REGION) [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--add-allowed-client=[PROPERTY=VALUE,...] | --clear-allowed-clients
          | --remove-allowed-client=[PROPERTY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Bare Metal Solution NFS share.

    This call returns immediately, but the update operation may take several
    minutes to complete. To check if the operation is complete, use the
    describe command for the NFS share.

EXAMPLES
    To update an NFS share called my-share in region us-central1 with a new
    label key1=value1, run:

        $ gcloud bms nfs-shares update my-share --region=us-central1 \
            --update-labels=key1=value1

    To clear all labels, run:

        $ gcloud bms nfs-shares update my-share --region=us-central1 \
            --clear-labels

    To remove label key1, run:

        $ gcloud bms nfs-shares update my-share --region=us-central1 \
            --remove-labels=key1

POSITIONAL ARGUMENTS
     Nfs share resource - nfs_share. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument nfs_share on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NFS_SHARE
          ID of the nfs_share or fully qualified identifier for the nfs_share.

          To set the nfs_share attribute:
          + provide the argument nfs_share on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument nfs_share on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --add-allowed-client=[PROPERTY=VALUE,...]
          Adds an allowed client to the NFS share. This flag can be repeated to
          specify multiple allowed clients.

           network
              The name of the network to allow.

           network-project-id
              The project ID of the allowed client network. If not present, the
              project ID of the NFS share will be used.

           cidr
              The subnet of IP addresses permitted to access the NFS share.

           mount-permissions
              The mount permissions for the allowed client. MOUNT_PERMISSIONS
              must be one of: READ_ONLY, READ_WRITE.

           allow-dev
              If yes, allows creation of devices.

           allow-suid
              If yes, allows SUID.

           enable-root-squash
              If yes, enables root squashing which is a special mapping of the
              remote superuser (root) identity when using identity
              authentication .

       --clear-allowed-clients
          Removes all IP range reservations in the network.

       --remove-allowed-client=[PROPERTY=VALUE,...]
          Removes an allowed client for the NFS share given its network name
          and cidr. This flag can be repeated to remove multiple allowed
          clients.

           network
              The name of the network of the allowed client to remove.

           network-project-id
              The project ID of the allowed client network. If not present, the
              project ID of the NFS share will be used.

           cidr
              The subnet of permitted IP addresses of the allowed client to
              remove.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud bms nfs-shares update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud bms nfs-shares update --clear-labels \
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

        $ gcloud alpha bms nfs-shares update
```

### gcloud alpha bms nfs-shares create

```text
NAME
    gcloud alpha bms nfs-shares create - create a Bare Metal Solution NFS share

SYNOPSIS
    gcloud alpha bms nfs-shares create (NFS_SHARE : --region=REGION)
        --allowed-client=[PROPERTY=VALUE,...] --size-gib=SIZE_GIB
        --storage-type=STORAGE_TYPE [--async] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms nfs-shares delete

```text
NAME
    gcloud alpha bms nfs-shares delete - delete a Bare Metal Solution NFS share

SYNOPSIS
    gcloud alpha bms nfs-shares delete (NFS_SHARE : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms nfs-shares describe

```text
NAME
    gcloud alpha bms nfs-shares describe - describe a Bare Metal solution NFS
        share

SYNOPSIS
    gcloud alpha bms nfs-shares describe (NFS_SHARE : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms nfs-shares list

```text
NAME
    gcloud alpha bms nfs-shares list - list Bare Metal Solution NFS shares in a
        project

SYNOPSIS
    gcloud alpha bms nfs-shares list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms nfs-shares rename

```text
NAME
    gcloud alpha bms nfs-shares rename - rename a Bare Metal Solution nfs-share

SYNOPSIS
    gcloud alpha bms nfs-shares rename (NFS_SHARE : --region=REGION)
        --new-name=NEW_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms nfs-shares update

```text
NAME
    gcloud alpha bms nfs-shares update - update a Bare Metal Solution NFS share

SYNOPSIS
    gcloud alpha bms nfs-shares update (NFS_SHARE : --region=REGION) [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--add-allowed-client=[PROPERTY=VALUE,...] | --clear-allowed-clients
          | --remove-allowed-client=[PROPERTY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bms/nfs-shares (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
