---
source: https://docs.cloud.google.com/sdk/gcloud/reference/managed-kafka/acls
---

# gcloud managed-kafka acls

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud managed-kafka acls add-acl-entry

```text
NAME
    gcloud managed-kafka acls add-acl-entry - add an acl entry to a Managed
        Service for Apache Kafka acl

SYNOPSIS
    gcloud managed-kafka acls add-acl-entry
        (ACL : --cluster=CLUSTER --location=LOCATION) --operation=OPERATION
        --principal=PRINCIPAL [--host=HOST; default="*"]
        [--permission-type=PERMISSION_TYPE; default="ALLOW"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an acl entry to a Managed Service for Apache Kafka acl.

EXAMPLES
    To add an acl entry for the Kafka cluster resource pattern (acl ID =
    cluster), in a cluster named mycluster located in us-central1, run the
    following:

        $ gcloud managed-kafka acls add-acl-entry cluster \
            --cluster=mycluster --location=us-central1 \
            --principal='User:admin@project.iam.gserviceaccount.com' \
            --operation=ALL --permission-type=ALLOW --host='*'

POSITIONAL ARGUMENTS
     Acl resource - Identifies the acl that this command updates.

     The structure of the acl ID defines the Resource Pattern for which the acl
     entries apply in the Kafka cluster. The acl ID must be structured like one
     of the following:

         For acls on the cluster:
           cluster

         For acls on a single resource within the cluster:
           topic/{resource_name}
           consumerGroup/{resource_name}
           transactionalId/{resource_name}

         For acls on all resources that match a prefix:
           topicPrefixed/{resource_name}
           consumerGroupPrefixed/{resource_name}
           transactionalIdPrefixed/{resource_name}

         For acls on all resources of a given type (i.e. the wildcard literal "*"):
           allTopics (represents topic/*)
           allConsumerGroups (represents consumerGroup/*)
           allTransactionalIds (represents transactionalId/*)
         The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument acl on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACL
          ID of the acl or fully qualified identifier for the acl.

          To set the acl attribute:
          + provide the argument acl on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The cluster name.

          To set the cluster attribute:
          + provide the argument acl on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument acl on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --operation=OPERATION
        The operation type. Allowed values are: ALL, READ, WRITE, CREATE,
        DELETE, ALTER, DESCRIBE, CLUSTER_ACTION, DESCRIBE_CONFIGS,
        ALTER_CONFIGS, IDEMPOTENT_WRITE.

        See
        https://kafka.apache.org/documentation/#operations_resources_and_protocols
        for the mapping of operations to Kafka protocols.

     --principal=PRINCIPAL
        The principal. Specified as Google Cloud account, with the Kafka
        StandardAuthorizer prefix "User:". For example:
        "User:admin@project.iam.gserviceaccount.com". Can be the wildcard
        "User:*" to refer to all users.

OPTIONAL FLAGS
     --host=HOST; default="*"
        The host. Must be set to "*" for Managed Service for Apache Kafka.

     --permission-type=PERMISSION_TYPE; default="ALLOW"
        The permission type. Allowed values are: ALLOW, DENY.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the managedkafka/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/managed-service-for-apache-kafka/docs

NOTES
    These variants are also available:

        $ gcloud alpha managed-kafka acls add-acl-entry

        $ gcloud beta managed-kafka acls add-acl-entry
```

### gcloud managed-kafka acls create

```text
NAME
    gcloud managed-kafka acls create - create a Managed Service for Apache
        Kafka acl

SYNOPSIS
    gcloud managed-kafka acls create
        (ACL : --cluster=CLUSTER --location=LOCATION)
        (--acl-entries-from-file=PATH_TO_FILE
          | --acl-entry=[host=HOST],[operation=OPERATION],
          [permission-type=PERMISSION-TYPE],[principal=PRINCIPAL])
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Managed Service for Apache Kafka acl.

EXAMPLES
    To create an acl for the Kafka cluster resource pattern (acl ID = cluster),
    in a cluster named mycluster located in us-central1, run the following:

        $ gcloud managed-kafka acls create cluster --cluster=mycluster \
          --location=us-central1 \
          --acl-entry=principal='User:admin@project.iam.gserviceaccount.co\
        m',operation=ALL,permission-type=ALLOW,host='*' \
            --acl-entry=principal='User:reader@project.iam.gserviceaccount.c\
        om',operation=DESCRIBE,permission-type=ALLOW,host='*' \
            --acl-entry=principal='User:reader@project.iam.gserviceaccount.c\
        om',operation=DESCRIBE_CONFIGS,permission-type=ALLOW,host='*'

    This acl grants an "admin" service account access to ALL cluster-level
    operations, and grants a "reader" service account access to cluster-level
    DESCRIBE and DESCRIBE_CONFIGS operations.

POSITIONAL ARGUMENTS
     Acl resource - Identifies the name of the acl that this command creates.

     The structure of the acl ID defines the Resource Pattern for which the acl
     entries apply in the Kafka cluster. The acl ID must be structured like one
     of the following:

         For acls on the cluster:
           cluster

         For acls on a single resource within the cluster:
           topic/{resource_name}
           consumerGroup/{resource_name}
           transactionalId/{resource_name}

         For acls on all resources that match a prefix:
           topicPrefixed/{resource_name}
           consumerGroupPrefixed/{resource_name}
           transactionalIdPrefixed/{resource_name}

         For acls on all resources of a given type (i.e. the wildcard literal "*"):
           allTopics (represents topic/*)
           allConsumerGroups (represents consumerGroup/*)
           allTransactionalIds (represents transactionalId/*)
         The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument acl on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACL
          ID of the acl or fully qualified identifier for the acl.

          To set the acl attribute:
          + provide the argument acl on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The cluster name.

          To set the cluster attribute:
          + provide the argument acl on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument acl on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --acl-entries-from-file=PATH_TO_FILE
          Path to a JSON or YAML file containing the acl entries to use in the
          acl. Use a full or relative path to a local file containing the value
          of acl_entries.

       --acl-entry=[host=HOST],[operation=OPERATION],[permission-type=PERMISSION-TYPE],[principal=PRINCIPAL]
          An acl entry that configures access for a principal, for a specific
          operation on the acl's resource pattern. This flag can be repeated.

          PRINCIPAL is the principal. Specified as Google Cloud account, with
          the Kafka StandardAuthorizer prefix "User:". For example:
          "User:admin@project.iam.gserviceaccount.com". Can be the wildcard
          "User:*" to refer to all users.

          OPERATION is the operation type. Allowed values are: ALL, READ,
          WRITE, CREATE, DELETE, ALTER, DESCRIBE, CLUSTER_ACTION,
          DESCRIBE_CONFIGS, ALTER_CONFIGS, IDEMPOTENT_WRITE.

          PERMISSION-TYPE is the permission type. Allowed values are: ALLOW,
          DENY.

          HOST is the host. Must be set to "*" for Managed Service for Apache
          Kafka.

          Example acl-entry:
          "principal=User:admin@project.iam.gserviceaccount.com,operation=ALL,permission-type=ALLOW,host=*"

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the managedkafka/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/managed-service-for-apache-kafka/docs

NOTES
    These variants are also available:

        $ gcloud alpha managed-kafka acls create

        $ gcloud beta managed-kafka acls create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud managed-kafka acls create cluster \
    --cluster=mycluster \
    --location=us-central1 \
    --acl-entry=principal='User:admin@project.iam.gserviceaccount.com',operation=ALL,permission-type=ALLOW,host='*' \
    --acl-entry=principal='User:reader@project.iam.gserviceaccount.com',operation=DESCRIBE,permission-type=ALLOW,host='*' \
    --acl-entry=principal='User:reader@project.iam.gserviceaccount.com',operation=DESCRIBE_CONFIGS,permission-type=ALLOW,host='*'
```

### gcloud managed-kafka acls delete

```text
NAME
    gcloud managed-kafka acls delete - delete a Managed Service for Apache
        Kafka ACL

SYNOPSIS
    gcloud managed-kafka acls delete
        (ACL : --cluster=CLUSTER --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Managed Service for Apache Kafka ACL.

EXAMPLES
    To delete an acl for all topics, in a cluster named mycluster located in
    us-central1, run the following:

        $ gcloud managed-kafka acls delete allTopics --cluster=mycluster \
            --location=us-central1

POSITIONAL ARGUMENTS
     Acl resource - Identifies the acl for deletion.

     The structure of the acl ID defines the Resource Pattern for which the acl
     entries apply in the Kafka cluster. The acl ID must be structured like one
     of the following:

         For acls on the cluster:
           cluster

         For acls on a single resource within the cluster:
           topic/{resource_name}
           consumerGroup/{resource_name}
           transactionalId/{resource_name}

         For acls on all resources that match a prefix:
           topicPrefixed/{resource_name}
           consumerGroupPrefixed/{resource_name}
           transactionalIdPrefixed/{resource_name}

         For acls on all resources of a given type (i.e. the wildcard literal "*"):
           allTopics (represents topic/*)
           allConsumerGroups (represents consumerGroup/*)
           allTransactionalIds (represents transactionalId/*)
         The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument acl on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACL
          ID of the acl or fully qualified identifier for the acl.

          To set the acl attribute:
          + provide the argument acl on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The cluster name.

          To set the cluster attribute:
          + provide the argument acl on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument acl on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the managedkafka/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/managed-service-for-apache-kafka/docs

NOTES
    These variants are also available:

        $ gcloud alpha managed-kafka acls delete

        $ gcloud beta managed-kafka acls delete
```

### gcloud managed-kafka acls describe

```text
NAME
    gcloud managed-kafka acls describe - describe a Managed Service for Apache
        Kafka acl

SYNOPSIS
    gcloud managed-kafka acls describe
        (ACL : --cluster=CLUSTER --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Managed Service for Apache Kafka acl.

EXAMPLES
    To describe an acl for the consumer group mygroup, in a cluster named
    mycluster located in us-central1, run the following:

        $ gcloud managed-kafka acls describe consumerGroup/mygroup \
            --cluster=mycluster --location=us-central1

POSITIONAL ARGUMENTS
     Acl resource - The describe command displays properties of the acl
     specified by this parameter. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument acl on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACL
          ID of the acl or fully qualified identifier for the acl.

          To set the acl attribute:
          + provide the argument acl on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The cluster name.

          To set the cluster attribute:
          + provide the argument acl on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument acl on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the managedkafka/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/managed-service-for-apache-kafka/docs

NOTES
    These variants are also available:

        $ gcloud alpha managed-kafka acls describe

        $ gcloud beta managed-kafka acls describe
```

### gcloud managed-kafka acls list

```text
NAME
    gcloud managed-kafka acls list - list all Managed Service for Apache Kafka
        acls in a given cluster

SYNOPSIS
    gcloud managed-kafka acls list (CLUSTER : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Managed Service for Apache Kafka acls in a given cluster. To
    specify the maximum number of acls to list, use the --limit flag.

EXAMPLES
    To list acls in a cluster named mycluster located in us-central1, run the
    following:

        $ gcloud managed-kafka acls list mycluster --location=us-central1

POSITIONAL ARGUMENTS
     Cluster resource - Identifies the cluster which contains all the acls to
     be listed. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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
    This command uses the managedkafka/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/managed-service-for-apache-kafka/docs

NOTES
    These variants are also available:

        $ gcloud alpha managed-kafka acls list

        $ gcloud beta managed-kafka acls list
```

### gcloud managed-kafka acls remove-acl-entry

```text
NAME
    gcloud managed-kafka acls remove-acl-entry - remove an acl entry from a
        Managed Service for Apache Kafka acl

SYNOPSIS
    gcloud managed-kafka acls remove-acl-entry
        (ACL : --cluster=CLUSTER --location=LOCATION) --operation=OPERATION
        --principal=PRINCIPAL [--host=HOST; default="*"]
        [--permission-type=PERMISSION_TYPE; default="ALLOW"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an acl entry from a Managed Service for Apache Kafka acl.

EXAMPLES
    To remove an acl entry for the Kafka cluster resource pattern
    (acl_id=cluster), in a cluster named mycluster located in us-central1, run
    the following:

        $ gcloud managed-kafka acls remove-acl-entry cluster \
            --cluster=mycluster --location=us-central1 \
            --principal='User:admin@project.iam.gserviceaccount.com' \
            --operation=ALL --permission-type=ALLOW --host='*'

POSITIONAL ARGUMENTS
     Acl resource - Identifies the name of the acl that this command updates.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument acl on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACL
          ID of the acl or fully qualified identifier for the acl.

          To set the acl attribute:
          + provide the argument acl on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The cluster name.

          To set the cluster attribute:
          + provide the argument acl on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument acl on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --operation=OPERATION
        The operation type. Allowed values are: ALL, READ, WRITE, CREATE,
        DELETE, ALTER, DESCRIBE, CLUSTER_ACTION, DESCRIBE_CONFIGS,
        ALTER_CONFIGS, IDEMPOTENT_WRITE.

        See
        https://kafka.apache.org/documentation/#operations_resources_and_protocols
        for the mapping of operations to Kafka protocols.

     --principal=PRINCIPAL
        The principal. Specified as Google Cloud account, with the Kafka
        StandardAuthorizer prefix "User:". For example:
        "User:admin@project.iam.gserviceaccount.com". Can be the wildcard
        "User:*" to refer to all users.

OPTIONAL FLAGS
     --host=HOST; default="*"
        The host. Must be set to "*" for Managed Service for Apache Kafka.

     --permission-type=PERMISSION_TYPE; default="ALLOW"
        The permission type. Allowed values are: ALLOW, DENY.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the managedkafka/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/managed-service-for-apache-kafka/docs

NOTES
    These variants are also available:

        $ gcloud alpha managed-kafka acls remove-acl-entry

        $ gcloud beta managed-kafka acls remove-acl-entry
```

### gcloud managed-kafka acls update

```text
NAME
    gcloud managed-kafka acls update - update a Managed Service for Apache
        Kafka acl

SYNOPSIS
    gcloud managed-kafka acls update
        (ACL : --cluster=CLUSTER --location=LOCATION) --etag=ETAG
        (--acl-entries-from-file=PATH_TO_FILE
          | --acl-entry=[host=HOST],[operation=OPERATION],
          [permission-type=PERMISSION-TYPE],[principal=PRINCIPAL])
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Managed Service for Apache Kafka acl.

    NOTE: update performs a FULL REPLACEMENT of acl entries. For incremental
    updates, use add-acl-entry and remove-acl-entry commands.

EXAMPLES
    To update an acl for the Kafka cluster resource pattern, with etag W/XYZ123
    returned from a previous create or describe command, in a cluster named
    mycluster located in us-central1, run the following:

        $ gcloud managed-kafka acls update cluster --cluster=mycluster \
            --location=us-central1 \
            --acl-entry=principal='User:admin@project.iam.gserviceaccount.co\
        m',operation=ALL,permission-type=ALLOW,host='*' --etag=W/XYZ123

POSITIONAL ARGUMENTS
     Acl resource - Identifies the name of the acl that this command updates.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument acl on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACL
          ID of the acl or fully qualified identifier for the acl.

          To set the acl attribute:
          + provide the argument acl on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The cluster name.

          To set the cluster attribute:
          + provide the argument acl on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument acl on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --etag=ETAG
        etag returned in the response to a previous create or describe command.
        The etag is used for concurrency control, to ensure that the client and
        server agree on the current set of acl entries in the Kafka cluster,
        before full replacement in the update command.

     Exactly one of these must be specified:

       --acl-entries-from-file=PATH_TO_FILE
          Path to a JSON or YAML file containing the acl entries to use in the
          acl. Use a full or relative path to a local file containing the value
          of acl_entries.

       --acl-entry=[host=HOST],[operation=OPERATION],[permission-type=PERMISSION-TYPE],[principal=PRINCIPAL]
          An acl entry that configures access for a principal, for a specific
          operation on the acl's resource pattern. This flag can be repeated.

          PRINCIPAL is the principal. Specified as Google Cloud account, with
          the Kafka StandardAuthorizer prefix "User:". For example:
          "User:admin@project.iam.gserviceaccount.com". Can be the wildcard
          "User:*" to refer to all users.

          OPERATION is the operation type. Allowed values are: ALL, READ,
          WRITE, CREATE, DELETE, ALTER, DESCRIBE, CLUSTER_ACTION,
          DESCRIBE_CONFIGS, ALTER_CONFIGS, IDEMPOTENT_WRITE.

          PERMISSION-TYPE is the permission type. Allowed values are: ALLOW,
          DENY.

          HOST is the host. Must be set to "*" for Managed Service for Apache
          Kafka.

          Example acl-entry:
          "principal=User:admin@project.iam.gserviceaccount.com,operation=ALL,permission-type=ALLOW,host=*"

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the managedkafka/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/managed-service-for-apache-kafka/docs

NOTES
    These variants are also available:

        $ gcloud alpha managed-kafka acls update

        $ gcloud beta managed-kafka acls update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud managed-kafka acls update cluster \
    --cluster=mycluster \
    --location=us-central1 \
    --acl-entry=principal='User:admin@project.iam.gserviceaccount.com',operation=ALL,permission-type=ALLOW,host='*' \
    --etag=W/XYZ123
```

### gcloud beta managed-kafka acls add-acl-entry

```text
NAME
    gcloud beta managed-kafka acls add-acl-entry - add an acl entry to a
        Managed Service for Apache Kafka acl

SYNOPSIS
    gcloud beta managed-kafka acls add-acl-entry
        (ACL : --cluster=CLUSTER --location=LOCATION) --operation=OPERATION
        --principal=PRINCIPAL [--host=HOST; default="*"]
        [--permission-type=PERMISSION_TYPE; default="ALLOW"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka acls create

```text
NAME
    gcloud beta managed-kafka acls create - create a Managed Service for Apache
        Kafka acl

SYNOPSIS
    gcloud beta managed-kafka acls create
        (ACL : --cluster=CLUSTER --location=LOCATION)
        (--acl-entries-from-file=PATH_TO_FILE
          | --acl-entry=[host=HOST],[operation=OPERATION],
          [permission-type=PERMISSION-TYPE],[principal=PRINCIPAL])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka acls delete

```text
NAME
    gcloud beta managed-kafka acls delete - delete a Managed Service for Apache
        Kafka ACL

SYNOPSIS
    gcloud beta managed-kafka acls delete
        (ACL : --cluster=CLUSTER --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka acls describe

```text
NAME
    gcloud beta managed-kafka acls describe - describe a Managed Service for
        Apache Kafka acl

SYNOPSIS
    gcloud beta managed-kafka acls describe
        (ACL : --cluster=CLUSTER --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka acls list

```text
NAME
    gcloud beta managed-kafka acls list - list all Managed Service for Apache
        Kafka acls in a given cluster

SYNOPSIS
    gcloud beta managed-kafka acls list (CLUSTER : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka acls remove-acl-entry

```text
NAME
    gcloud beta managed-kafka acls remove-acl-entry - remove an acl entry from
        a Managed Service for Apache Kafka acl

SYNOPSIS
    gcloud beta managed-kafka acls remove-acl-entry
        (ACL : --cluster=CLUSTER --location=LOCATION) --operation=OPERATION
        --principal=PRINCIPAL [--host=HOST; default="*"]
        [--permission-type=PERMISSION_TYPE; default="ALLOW"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka acls update

```text
NAME
    gcloud beta managed-kafka acls update - update a Managed Service for Apache
        Kafka acl

SYNOPSIS
    gcloud beta managed-kafka acls update
        (ACL : --cluster=CLUSTER --location=LOCATION) --etag=ETAG
        (--acl-entries-from-file=PATH_TO_FILE
          | --acl-entry=[host=HOST],[operation=OPERATION],
          [permission-type=PERMISSION-TYPE],[principal=PRINCIPAL])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka acls add-acl-entry

```text
NAME
    gcloud alpha managed-kafka acls add-acl-entry - add an acl entry to a
        Managed Service for Apache Kafka acl

SYNOPSIS
    gcloud alpha managed-kafka acls add-acl-entry
        (ACL : --cluster=CLUSTER --location=LOCATION) --operation=OPERATION
        --principal=PRINCIPAL [--host=HOST; default="*"]
        [--permission-type=PERMISSION_TYPE; default="ALLOW"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka acls create

```text
NAME
    gcloud alpha managed-kafka acls create - create a Managed Service for
        Apache Kafka acl

SYNOPSIS
    gcloud alpha managed-kafka acls create
        (ACL : --cluster=CLUSTER --location=LOCATION)
        (--acl-entries-from-file=PATH_TO_FILE
          | --acl-entry=[host=HOST],[operation=OPERATION],
          [permission-type=PERMISSION-TYPE],[principal=PRINCIPAL])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka acls delete

```text
NAME
    gcloud alpha managed-kafka acls delete - delete a Managed Service for
        Apache Kafka ACL

SYNOPSIS
    gcloud alpha managed-kafka acls delete
        (ACL : --cluster=CLUSTER --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka acls describe

```text
NAME
    gcloud alpha managed-kafka acls describe - describe a Managed Service for
        Apache Kafka acl

SYNOPSIS
    gcloud alpha managed-kafka acls describe
        (ACL : --cluster=CLUSTER --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka acls list

```text
NAME
    gcloud alpha managed-kafka acls list - list all Managed Service for Apache
        Kafka acls in a given cluster

SYNOPSIS
    gcloud alpha managed-kafka acls list (CLUSTER : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka acls remove-acl-entry

```text
NAME
    gcloud alpha managed-kafka acls remove-acl-entry - remove an acl entry from
        a Managed Service for Apache Kafka acl

SYNOPSIS
    gcloud alpha managed-kafka acls remove-acl-entry
        (ACL : --cluster=CLUSTER --location=LOCATION) --operation=OPERATION
        --principal=PRINCIPAL [--host=HOST; default="*"]
        [--permission-type=PERMISSION_TYPE; default="ALLOW"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka acls update

```text
NAME
    gcloud alpha managed-kafka acls update - update a Managed Service for
        Apache Kafka acl

SYNOPSIS
    gcloud alpha managed-kafka acls update
        (ACL : --cluster=CLUSTER --location=LOCATION) --etag=ETAG
        (--acl-entries-from-file=PATH_TO_FILE
          | --acl-entry=[host=HOST],[operation=OPERATION],
          [permission-type=PERMISSION-TYPE],[principal=PRINCIPAL])
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/managed-kafka/acls (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
