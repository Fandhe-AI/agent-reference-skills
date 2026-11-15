---
source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes/replications
---

# gcloud netapp volumes replications

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud netapp volumes replications create

```text
NAME
    gcloud netapp volumes replications create - create a Cloud NetApp Volume
        Replication

SYNOPSIS
    gcloud netapp volumes replications create
        (REPLICATION : --location=LOCATION)
        --destination-volume-parameters=[description=DESCRIPTION],
          [share_name=SHARE_NAME],[storage_pool=STORAGE_POOL],
          [tiering_policy=TIERING_POLICY],[volume_id=VOLUME_ID]
        --replication-schedule=REPLICATION_SCHEDULE [--async]
        [--cluster-location=CLUSTER_LOCATION] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [--volume=VOLUME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud NetApp Volume Replication.

EXAMPLES
    The following command creates a Replication named NAME using the required
    arguments:

        $ gcloud netapp volumes replications create NAME \
          --location=us-central1 --volume=vol1 \
          --replication-schedule=EVERY_10_MINUTES \
          --destination-volume-parameters=storage_pool=sp1,\
        volume_id=vol2,share_name=share2

POSITIONAL ARGUMENTS
     Replication resource - The Replication to create. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       REPLICATION
          ID of the replication or fully qualified identifier for the
          replication.

          To set the replication attribute:
          + provide the argument replication on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the replication.

          To set the location attribute:
          + provide the argument replication on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

REQUIRED FLAGS
     --destination-volume-parameters=[description=DESCRIPTION],[share_name=SHARE_NAME],[storage_pool=STORAGE_POOL],[tiering_policy=TIERING_POLICY],[volume_id=VOLUME_ID]
        Required, sets destination_volume_parameters value.

         description
            Sets description value.

         share_name
            Sets share_name value.

         storage_pool
            Required, sets storage_pool value.

         tiering_policy
            Sets tiering_policy value.

             cooling-threshold-days
                Sets cooling-threshold-days value.

             tier-action
                Sets tier-action value.

         volume_id
            Sets volume_id value.

        Shorthand Example:

            --destination-volume-parameters='description=string,share_name=string,storage_pool=string,tiering_policy={"cooling-threshold-days": int, "tier-action": "string"},volume_id=string'

        JSON Example:

            --destination-volume-parameters='{"description": "string", "share_name": "string", "storage_pool": "string", "tiering_policy": {"cooling-threshold-days": int, "tier-action": "string"}, "volume_id": "string"}'

        File Example:

            --destination-volume-parameters=path_to_file.(yaml|json)

     --replication-schedule=REPLICATION_SCHEDULE
        The schedule for the Replication.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --cluster-location=CLUSTER_LOCATION
        Location of the user cluster.

     --description=DESCRIPTION
        A description of the Cloud NetApp Replication

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     Volume resource - The Volume that the Replication is based on This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp volumes replications create

        $ gcloud beta netapp volumes replications create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud netapp volumes replications create NAME \
    --location=us-central1 \
    --volume=vol1 \
    --replication-schedule=EVERY_10_MINUTES \
    --destination-volume-parameters=storage_pool=sp1,volume_id=vol2,share_name=share2
```

### gcloud netapp volumes replications delete

```text
NAME
    gcloud netapp volumes replications delete - delete a Cloud NetApp Volume
        Replication

SYNOPSIS
    gcloud netapp volumes replications delete
        (REPLICATION : --location=LOCATION) [--async] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Cloud NetApp Volume Replication.

EXAMPLES
    The following command deletes a Replication named NAME using the required
    arguments:

        $ gcloud netapp volumes replications delete NAME \
          --location=us-central1 --volume=vol1

    To delete a Replication named NAME asynchronously, run the following
    command:

        $ gcloud netapp volumes replications delete NAME \
          --location=us-central1 --volume=vol1 --async

POSITIONAL ARGUMENTS
     Replication resource - The Replication to delete. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       REPLICATION
          ID of the replication or fully qualified identifier for the
          replication.

          To set the replication attribute:
          + provide the argument replication on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the replication.

          To set the location attribute:
          + provide the argument replication on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Volume resource - The Volume that the Replication is based on This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp volumes replications delete

        $ gcloud beta netapp volumes replications delete
```

### gcloud netapp volumes replications describe

```text
NAME
    gcloud netapp volumes replications describe - describe a Cloud NetApp
        Volume Replication

SYNOPSIS
    gcloud netapp volumes replications describe
        (REPLICATION : --location=LOCATION) [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud NetApp Volume Replication.

EXAMPLES
    The following command describes a Replication named NAME in the given
    location and volume:

        $ gcloud netapp volumes replications describe NAME \
          --location=us-central1 --volume=vol1

POSITIONAL ARGUMENTS
     Replication resource - The Replication to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       REPLICATION
          ID of the replication or fully qualified identifier for the
          replication.

          To set the replication attribute:
          + provide the argument replication on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the replication.

          To set the location attribute:
          + provide the argument replication on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     Volume resource - The Volume that the Replication is based on This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp volumes replications describe

        $ gcloud beta netapp volumes replications describe
```

### gcloud netapp volumes replications establish-peering

```text
NAME
    gcloud netapp volumes replications establish-peering - establish peering
        for Hybrid replication

SYNOPSIS
    gcloud netapp volumes replications establish-peering
        (REPLICATION : --location=LOCATION)
        --peer-cluster-name=PEER_CLUSTER_NAME --peer-svm-name=PEER_SVM_NAME
        --peer-volume-name=PEER_VOLUME_NAME [--async]
        [--peer-ip-addresses=PEER_IP_ADDRESS,[...]] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Establish peering for Hybrid replication.

EXAMPLES
    The following command establishes peering for Hybrid replication named NAME
    using the arguments specified:

        $ gcloud netapp volumes replications establish-peering NAME \
          --volume=volume1 --peer-cluster-name=peer-cluster-name1 \
          --peer-svm-name=peer-svm-name1 \
          --peer-volume-name=peer-volume-name1 \
          --peer-ip-addresses=1.1.1.1,2.2.2.2

POSITIONAL ARGUMENTS
     Replication resource - The Hybrid replication to establish peering for.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       REPLICATION
          ID of the replication or fully qualified identifier for the
          replication.

          To set the replication attribute:
          + provide the argument replication on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the replication.

          To set the location attribute:
          + provide the argument replication on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

REQUIRED FLAGS
     --peer-cluster-name=PEER_CLUSTER_NAME
        Name of the destination cluster to be peered with the source cluster.

     --peer-svm-name=PEER_SVM_NAME
        Name of the local source vserver svm to be peered with the destination
        cluster.

     --peer-volume-name=PEER_VOLUME_NAME
        Name of the source volume to be peered with the destination volume.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --peer-ip-addresses=PEER_IP_ADDRESS,[...]
        List of ip addresses to be used for peering. This is required for
        cluster peering, not required for svm peering.

     Volume resource - The Volume that the Replication is based on This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp volumes replications establish-peering

        $ gcloud beta netapp volumes replications establish-peering
```

### gcloud netapp volumes replications list

```text
NAME
    gcloud netapp volumes replications list - list Cloud NetApp Volume
        Replications

SYNOPSIS
    gcloud netapp volumes replications list [--location=LOCATION]
        [--volume=VOLUME] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists Cloud NetApp Volume Replications.

EXAMPLES
    The following command lists all Replications in the given location and
    volume:

        $ gcloud netapp volumes replications list --location=us-central1 \
          --volume=vol1

FLAGS
     Location resource - The location in which to list Volume Replications.
     This represents a Cloud resource. (NOTE) Some attributes are not given
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

     Volume resource - The Volume that the Replication is based on This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

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

        $ gcloud alpha netapp volumes replications list

        $ gcloud beta netapp volumes replications list
```

### gcloud netapp volumes replications resume

```text
NAME
    gcloud netapp volumes replications resume - resume a Cloud NetApp Volume
        Replication

SYNOPSIS
    gcloud netapp volumes replications resume
        (REPLICATION : --location=LOCATION) [--async] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Resume a Cloud NetApp Volume Replication.

EXAMPLES
    The following command resumes a Replication named NAME using the required
    arguments:

        $ gcloud netapp volumes replications resume NAME \
          --location=us-central1 --volume=vol1

    To resume a Replication named NAME asynchronously, run the following
    command:

        $ gcloud netapp volumes replications resume NAME \
          --location=us-central1 --volume=vol1 --async

POSITIONAL ARGUMENTS
     Replication resource - The Replication to create. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       REPLICATION
          ID of the replication or fully qualified identifier for the
          replication.

          To set the replication attribute:
          + provide the argument replication on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the replication.

          To set the location attribute:
          + provide the argument replication on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Volume resource - The Volume that the Replication is based on This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp volumes replications resume

        $ gcloud beta netapp volumes replications resume
```

### gcloud netapp volumes replications reverse

```text
NAME
    gcloud netapp volumes replications reverse - reverse a Cloud NetApp Volume
        Replication's direction

SYNOPSIS
    gcloud netapp volumes replications reverse
        (REPLICATION : --location=LOCATION) [--async] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Reverse a Cloud NetApp Volume Replication.

EXAMPLES
    The following command reverses a Replication named NAME using the required
    arguments:

        $ gcloud netapp volumes replications reverse NAME \
          --location=us-central1 --volume=vol1

    To reverse a Replication named NAME asynchronously, run the following
    command:

        $ gcloud netapp volumes replications reverse NAME \
          --location=us-central1 --volume=vol1 --async

POSITIONAL ARGUMENTS
     Replication resource - The Replication to reverse direction. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       REPLICATION
          ID of the replication or fully qualified identifier for the
          replication.

          To set the replication attribute:
          + provide the argument replication on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the replication.

          To set the location attribute:
          + provide the argument replication on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Volume resource - The source Volume to reverse the Replication direction
     of This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp volumes replications reverse

        $ gcloud beta netapp volumes replications reverse
```

### gcloud netapp volumes replications stop

```text
NAME
    gcloud netapp volumes replications stop - stop a Cloud NetApp Volume
        Replication

SYNOPSIS
    gcloud netapp volumes replications stop (REPLICATION : --location=LOCATION)
        [--async] [--force] [--volume=VOLUME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Stop a Cloud NetApp Volume Replication.

EXAMPLES
    The following command stops a Replication named NAME using the required
    arguments:

        $ gcloud netapp volumes replications stop NAME \
          --location=us-central1 --volume=vol1

    To stop a Replication named NAME asynchronously, run the following command:

        $ gcloud netapp volumes replications stop NAME \
          --location=us-central1 --volume=vol1 --async

POSITIONAL ARGUMENTS
     Replication resource - The Replication to create. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       REPLICATION
          ID of the replication or fully qualified identifier for the
          replication.

          To set the replication attribute:
          + provide the argument replication on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the replication.

          To set the location attribute:
          + provide the argument replication on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --force
        Indicates whether to stop replication forcefully while data transfer is
        in progress. Warning! if force is true, this will abort any current
        transfers and can lead to data loss due to partial transfer. If force
        is false, stop replication will fail while data transfer is in progress
        and you will need to retry later.

     Volume resource - The Volume that the Replication is based on This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp volumes replications stop

        $ gcloud beta netapp volumes replications stop
```

### gcloud netapp volumes replications sync

```text
NAME
    gcloud netapp volumes replications sync - sync a Cloud NetApp Volume
        Replication

SYNOPSIS
    gcloud netapp volumes replications sync (REPLICATION : --location=LOCATION)
        [--async] [--volume=VOLUME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sync a Cloud NetApp Volume Replication.

EXAMPLES
    The following command syncs a Replication named NAME using the required
    arguments:

        $ gcloud netapp volumes replications sync NAME \
          --location=us-central1 --volume=vol1

    To sync a Replication named NAME asynchronously, run the following command:

        $ gcloud netapp volumes replications sync NAME \
          --location=us-central1 --volume=vol1 --async

POSITIONAL ARGUMENTS
     Replication resource - The Replication to sync. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       REPLICATION
          ID of the replication or fully qualified identifier for the
          replication.

          To set the replication attribute:
          + provide the argument replication on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the replication.

          To set the location attribute:
          + provide the argument replication on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Volume resource - The Volume that the Replication is based on This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp volumes replications sync

        $ gcloud beta netapp volumes replications sync
```

### gcloud netapp volumes replications update

```text
NAME
    gcloud netapp volumes replications update - update a Cloud NetApp Volume
        Replication

SYNOPSIS
    gcloud netapp volumes replications update
        (REPLICATION : --location=LOCATION) [--async]
        [--cluster-location=CLUSTER_LOCATION] [--description=DESCRIPTION]
        [--replication-schedule=REPLICATION_SCHEDULE]
        [--update-labels=[KEY=VALUE,...]] [--volume=VOLUME]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Cloud NetApp Volume Replication and its specified parameters.

EXAMPLES
    The following command updates a Replication named NAME and its specified
    parameters:

        $ gcloud netapp volumes replications update NAME \
          --location=us-central1 --volume=vol1 \
          --replication-schedule=EVERY_5_MINUTES \
          --description="new description" --cluster-location= us-central1

POSITIONAL ARGUMENTS
     Replication resource - The Replication to update. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the volume attribute:
      * provide the argument replication on the command line with a fully
        specified name;
      * provide the argument --volume on the command line.

     This must be specified.

       REPLICATION
          ID of the replication or fully qualified identifier for the
          replication.

          To set the replication attribute:
          + provide the argument replication on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the replication.

          To set the location attribute:
          + provide the argument replication on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --cluster-location=CLUSTER_LOCATION
        Location of the user cluster.

     --description=DESCRIPTION
        A description of the Cloud NetApp Replication

     --replication-schedule=REPLICATION_SCHEDULE
        The schedule for the Replication.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     Volume resource - The Volume that the Replication is based on This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --volume on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property netapp/location.

     --volume=VOLUME
        ID of the volume or fully qualified identifier for the volume.

        To set the volume attribute:
        * provide the argument --volume on the command line.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud netapp volumes replications update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud netapp volumes replications update --clear-labels \
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

        $ gcloud alpha netapp volumes replications update

        $ gcloud beta netapp volumes replications update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud netapp volumes replications update NAME \
    --location=us-central1 \
    --volume=vol1 \
    --replication-schedule=EVERY_5_MINUTES \
    --description="new description" \
    --cluster-location=us-central1
```

### gcloud beta netapp volumes replications create

```text
NAME
    gcloud beta netapp volumes replications create - create a Cloud NetApp
        Volume Replication

SYNOPSIS
    gcloud beta netapp volumes replications create
        (REPLICATION : --location=LOCATION)
        --destination-volume-parameters=[description=DESCRIPTION],
          [share_name=SHARE_NAME],[storage_pool=STORAGE_POOL],
          [tiering_policy=TIERING_POLICY],[volume_id=VOLUME_ID]
        --replication-schedule=REPLICATION_SCHEDULE [--async]
        [--cluster-location=CLUSTER_LOCATION] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [--volume=VOLUME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes replications delete

```text
NAME
    gcloud beta netapp volumes replications delete - delete a Cloud NetApp
        Volume Replication

SYNOPSIS
    gcloud beta netapp volumes replications delete
        (REPLICATION : --location=LOCATION) [--async] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes replications describe

```text
NAME
    gcloud beta netapp volumes replications describe - describe a Cloud NetApp
        Volume Replication

SYNOPSIS
    gcloud beta netapp volumes replications describe
        (REPLICATION : --location=LOCATION) [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes replications establish-peering

```text
NAME
    gcloud beta netapp volumes replications establish-peering - establish
        peering for Hybrid replication

SYNOPSIS
    gcloud beta netapp volumes replications establish-peering
        (REPLICATION : --location=LOCATION)
        --peer-cluster-name=PEER_CLUSTER_NAME --peer-svm-name=PEER_SVM_NAME
        --peer-volume-name=PEER_VOLUME_NAME [--async]
        [--peer-ip-addresses=PEER_IP_ADDRESS,[...]] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes replications list

```text
NAME
    gcloud beta netapp volumes replications list - list Cloud NetApp Volume
        Replications

SYNOPSIS
    gcloud beta netapp volumes replications list [--location=LOCATION]
        [--volume=VOLUME] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes replications resume

```text
NAME
    gcloud beta netapp volumes replications resume - resume a Cloud NetApp
        Volume Replication

SYNOPSIS
    gcloud beta netapp volumes replications resume
        (REPLICATION : --location=LOCATION) [--async] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes replications reverse

```text
NAME
    gcloud beta netapp volumes replications reverse - reverse a Cloud NetApp
        Volume Replication's direction

SYNOPSIS
    gcloud beta netapp volumes replications reverse
        (REPLICATION : --location=LOCATION) [--async] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes replications stop

```text
NAME
    gcloud beta netapp volumes replications stop - stop a Cloud NetApp Volume
        Replication

SYNOPSIS
    gcloud beta netapp volumes replications stop
        (REPLICATION : --location=LOCATION) [--async] [--force]
        [--volume=VOLUME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes replications sync

```text
NAME
    gcloud beta netapp volumes replications sync - sync a Cloud NetApp Volume
        Replication

SYNOPSIS
    gcloud beta netapp volumes replications sync
        (REPLICATION : --location=LOCATION) [--async] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp volumes replications update

```text
NAME
    gcloud beta netapp volumes replications update - update a Cloud NetApp
        Volume Replication

SYNOPSIS
    gcloud beta netapp volumes replications update
        (REPLICATION : --location=LOCATION) [--async]
        [--cluster-location=CLUSTER_LOCATION] [--description=DESCRIPTION]
        [--replication-schedule=REPLICATION_SCHEDULE]
        [--update-labels=[KEY=VALUE,...]] [--volume=VOLUME]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes replications create

```text
NAME
    gcloud alpha netapp volumes replications create - create a Cloud NetApp
        Volume Replication

SYNOPSIS
    gcloud alpha netapp volumes replications create
        (REPLICATION : --location=LOCATION)
        --destination-volume-parameters=[description=DESCRIPTION],
          [share_name=SHARE_NAME],[storage_pool=STORAGE_POOL],
          [tiering_policy=TIERING_POLICY],[volume_id=VOLUME_ID]
        --replication-schedule=REPLICATION_SCHEDULE [--async]
        [--cluster-location=CLUSTER_LOCATION] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [--volume=VOLUME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes replications delete

```text
NAME
    gcloud alpha netapp volumes replications delete - delete a Cloud NetApp
        Storage Pool

SYNOPSIS
    gcloud alpha netapp volumes replications delete
        (REPLICATION : --location=LOCATION) [--async] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes replications describe

```text
NAME
    gcloud alpha netapp volumes replications describe - describe a Cloud NetApp
        Volume Replication

SYNOPSIS
    gcloud alpha netapp volumes replications describe
        (REPLICATION : --location=LOCATION) [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes replications establish-peering

```text
NAME
    gcloud alpha netapp volumes replications establish-peering - establish
        peering for Hybrid replication

SYNOPSIS
    gcloud alpha netapp volumes replications establish-peering
        (REPLICATION : --location=LOCATION)
        --peer-cluster-name=PEER_CLUSTER_NAME --peer-svm-name=PEER_SVM_NAME
        --peer-volume-name=PEER_VOLUME_NAME [--async]
        [--peer-ip-addresses=PEER_IP_ADDRESS,[...]] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes replications list

```text
NAME
    gcloud alpha netapp volumes replications list - list Cloud NetApp Volume
        Replications

SYNOPSIS
    gcloud alpha netapp volumes replications list [--location=LOCATION]
        [--volume=VOLUME] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes replications resume

```text
NAME
    gcloud alpha netapp volumes replications resume - resume a Cloud NetApp
        Volume Replication

SYNOPSIS
    gcloud alpha netapp volumes replications resume
        (REPLICATION : --location=LOCATION) [--async] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes replications reverse

```text
NAME
    gcloud alpha netapp volumes replications reverse - reverse a Cloud NetApp
        Volume Replication's direction

SYNOPSIS
    gcloud alpha netapp volumes replications reverse
        (REPLICATION : --location=LOCATION) [--async] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes replications stop

```text
NAME
    gcloud alpha netapp volumes replications stop - stop a Cloud NetApp Volume
        Replication

SYNOPSIS
    gcloud alpha netapp volumes replications stop
        (REPLICATION : --location=LOCATION) [--async] [--force]
        [--volume=VOLUME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes replications sync

```text
NAME
    gcloud alpha netapp volumes replications sync - sync a Cloud NetApp Volume
        Replication

SYNOPSIS
    gcloud alpha netapp volumes replications sync
        (REPLICATION : --location=LOCATION) [--async] [--volume=VOLUME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes replications update

```text
NAME
    gcloud alpha netapp volumes replications update - update a Cloud NetApp
        Volume Replication

SYNOPSIS
    gcloud alpha netapp volumes replications update
        (REPLICATION : --location=LOCATION) [--async]
        [--cluster-location=CLUSTER_LOCATION] [--description=DESCRIPTION]
        [--replication-schedule=REPLICATION_SCHEDULE]
        [--update-labels=[KEY=VALUE,...]] [--volume=VOLUME]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `update` example has a space after `--cluster-location=`, so the flag gets an empty value and `us-central1` becomes an extra argument (gcloud 593.0.0: "unrecognized arguments: us-central1"); the runnable form removes the space.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes/replications (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
