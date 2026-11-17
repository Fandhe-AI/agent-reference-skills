---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/storage-pools
---

# gcloud compute storage-pools

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute storage-pools create

```text
NAME
    gcloud compute storage-pools create - create a storage pool

SYNOPSIS
    gcloud compute storage-pools create STORAGE_POOL
        --provisioned-capacity=PROVISIONED_CAPACITY
        --storage-pool-type=STORAGE_POOL_TYPE [--async]
        [--capacity-provisioning-type=CAPACITY_PROVISIONING_TYPE]
        [--description=DESCRIPTION]
        [--performance-provisioning-type=PERFORMANCE_PROVISIONING_TYPE]
        [--provisioned-iops=PROVISIONED_IOPS]
        [--provisioned-throughput=PROVISIONED_THROUGHPUT]
        [--resource-manager-tags=[KEY=VALUE,...]] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a storage pool.

EXAMPLES
    To create a new storage pool named my-storage-pool, run the following
    command:

        $ gcloud compute storage-pools create my-storage-pool \
            --storage-pool-type=hyperdisk-throughput \
            --provisioned-capacity=10TB --provisioned-throughput=200

POSITIONAL ARGUMENTS
     Storage pool resource - The name of the storage pool you want to create.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument storage_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the zone attribute:
      * provide the argument storage_pool on the command line with a fully
        specified name;
      * provide the argument --zone on the command line;
      * set the property compute/zone.

     This must be specified.

       STORAGE_POOL
          ID of the storage pool or fully qualified identifier for the storage
          pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

REQUIRED FLAGS
     --provisioned-capacity=PROVISIONED_CAPACITY
        Provisioned capacity of the storage pool.

     Storage pool type resource - Type of the storage pool. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --storage-pool-type on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the zone attribute:
      * provide the argument --storage-pool-type on the command line with a
        fully specified name;
      * provide the argument --zone on the command line;
      * set the property compute/zone.

     This must be specified.

       --storage-pool-type=STORAGE_POOL_TYPE
          ID of the storage pool type or fully qualified identifier for the
          storage pool type.

          To set the storage-pool-type attribute:
          + provide the argument --storage-pool-type on the command line.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --capacity-provisioning-type=CAPACITY_PROVISIONING_TYPE
        Capacity provisioning type. CAPACITY_PROVISIONING_TYPE must be one of:
        advanced, standard.

     --description=DESCRIPTION
        Description of the storage pool.

     --performance-provisioning-type=PERFORMANCE_PROVISIONING_TYPE
        Performance provisioning type. PERFORMANCE_PROVISIONING_TYPE must be
        one of: advanced, standard.

     --provisioned-iops=PROVISIONED_IOPS
        IOPS with which to provision the pool.

     --provisioned-throughput=PROVISIONED_THROUGHPUT
        Throughput in MB/s with which to provision the pool.

     --resource-manager-tags=[KEY=VALUE,...]
        Resource manager tags to be bound to the storage pool.

     --zone=ZONE
        For resources [storage-pool-type, storage_pool], provides fallback
        value for resource zone attribute. When the resource's full URI path is
        not provided, zone will fallback to this flag value.

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

        $ gcloud alpha compute storage-pools create

        $ gcloud beta compute storage-pools create
```

### gcloud compute storage-pools delete

```text
NAME
    gcloud compute storage-pools delete - delete a storage pool

SYNOPSIS
    gcloud compute storage-pools delete (STORAGE_POOL : --zone=ZONE) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deleta a storage pool.

EXAMPLES
    To delete a single storage pool named my-storage-pool, run the following
    command:

        $ gcloud compute storage-pools delete my-storage-pool

POSITIONAL ARGUMENTS
     Storage pool resource - Name of the storage pool you want to delete. The
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
          ID of the storage pool or fully qualified identifier for the storage
          pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument storage_pool on the command line with a
            fully specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

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

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute storage-pools delete

        $ gcloud beta compute storage-pools delete
```

### gcloud compute storage-pools describe

```text
NAME
    gcloud compute storage-pools describe - describe a storage pool

SYNOPSIS
    gcloud compute storage-pools describe (STORAGE_POOL : --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a storage pool.

EXAMPLES
    To retrieve a single storage pool and print its properties, run the
    following command:

        $ gcloud compute storage-pools describe my-storage-pool

POSITIONAL ARGUMENTS
     Storage pool resource - Name of the storage pool you want to inspect. The
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
          ID of the storage pool or fully qualified identifier for the storage
          pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument storage_pool on the command line with a
            fully specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

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

        $ gcloud alpha compute storage-pools describe

        $ gcloud beta compute storage-pools describe
```

### gcloud compute storage-pools get-iam-policy

```text
NAME
    gcloud compute storage-pools get-iam-policy - get the IAM policy of a
        storage pool

SYNOPSIS
    gcloud compute storage-pools get-iam-policy (STORAGE_POOL : --zone=ZONE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the IAM policy of a storage pool.

EXAMPLES
    The following command retrieves the IAM configuration of the specified
    storage pool.

        $ gcloud compute storage-pools get-iam-policy my-storage-pool

POSITIONAL ARGUMENTS
     Storage pool resource - Storage pool you want to get the IAM permissions
     of. The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument storage_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       STORAGE_POOL
          ID of the storage pool or fully qualified identifier for the storage
          pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument storage_pool on the command line with a
            fully specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

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

        $ gcloud alpha compute storage-pools get-iam-policy

        $ gcloud beta compute storage-pools get-iam-policy
```

### gcloud compute storage-pools list

```text
NAME
    gcloud compute storage-pools list - view storage pools

SYNOPSIS
    gcloud compute storage-pools list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    View storage pools.

    The compact, default output format is explained below:

    The type column contains all three types -- storage pool type, capacity and
    performance. For example, the value

    > "Hdb/Adv/Std"

    means the storage pool type is "hyperdisk-balanced", its capacity type is
    "advanced", and its performance type is "standard."

    The list of storage pool abbreviations is as follows:

      o HdB: Hyperdisk Balanced
      o HdT: Hyperdisk Throughput
      o Exa-HdB: Exapool Hyperdisk Balanced
      o Exa-HdT: Exapool Hyperdisk Throughput

    The list of capacity/performance abbreviations is as follows:

      o Adv: Advanced
      o Std: Standard

    The capacity column, and standard-performance iops and throughput columns
    describe the used, provisioned, and the utilization rate. For example, the
    following value for capacity:

    40 / 50 (80%)

    means 40 TB of it is used, 50 TB provisioned, and its utilization rate is
    80%. The utilization rate is equivalent to used capacity divided by
    provisioned capacity.

    For advanced-performance storage pools, the iops and throughput columns
    will simply show the provisioned values.

EXAMPLES
    To display all storage pools in all regions and zones, run the following
    command:

        $ gcloud compute storage-pools list

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

        $ gcloud alpha compute storage-pools list

        $ gcloud beta compute storage-pools list
```

### gcloud compute storage-pools list-disks

```text
NAME
    gcloud compute storage-pools list-disks - view the disks that are in a
        storage pool

SYNOPSIS
    gcloud compute storage-pools list-disks (STORAGE_POOL : --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    View the disks that are in a given storage pool.

EXAMPLES
    The following command retrieves all disks belonging to a storage pool and
    lists them:

        $ gcloud compute storage-pools list-disks my-storage-pool

POSITIONAL ARGUMENTS
     Storage pool resource - Name of the storage pool you want to inspect. The
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
          ID of the storage pool or fully qualified identifier for the storage
          pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument storage_pool on the command line with a
            fully specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

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

        $ gcloud alpha compute storage-pools list-disks

        $ gcloud beta compute storage-pools list-disks
```

### gcloud compute storage-pools set-iam-policy

```text
NAME
    gcloud compute storage-pools set-iam-policy - set the IAM policy of the
        given storage pool

SYNOPSIS
    gcloud compute storage-pools set-iam-policy (STORAGE_POOL : --zone=ZONE)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set the IAM policy of the given storage pool.

EXAMPLES
    The following command sets the IAM configuration of the specified storage
    pool with the specified policy file.

        $ gcloud compute storage-pools set-iam-policy my-storage-pool \
            policy.json

POSITIONAL ARGUMENTS
     Storage pool resource - Storage pool you want to get the IAM permissions
     of. The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument storage_pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       STORAGE_POOL
          ID of the storage pool or fully qualified identifier for the storage
          pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument storage_pool on the command line with a
            fully specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

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

        $ gcloud alpha compute storage-pools set-iam-policy

        $ gcloud beta compute storage-pools set-iam-policy
```

### gcloud compute storage-pools update

```text
NAME
    gcloud compute storage-pools update - update a storage pool

SYNOPSIS
    gcloud compute storage-pools update (STORAGE_POOL : --zone=ZONE) [--async]
        [--description=DESCRIPTION]
        [--exapool-capacity-optimized-capacity=EXAPOOL_CAPACITY_OPTIMIZED_CAPACITY]
        [--exapool-read-optimized-capacity=EXAPOOL_READ_OPTIMIZED_CAPACITY]
        [--exapool-write-optimized-capacity=EXAPOOL_WRITE_OPTIMIZED_CAPACITY]
        [--provisioned-capacity=PROVISIONED_CAPACITY]
        [--provisioned-iops=PROVISIONED_IOPS]
        [--provisioned-throughput=PROVISIONED_THROUGHPUT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a storage pool.

EXAMPLES
    To update the size of a storage pool named 'my-storage-pool', run the
    following command:

        $ gcloud compute storage-pools update my-storage-pool \
            --provisioned-capacity=20TB

POSITIONAL ARGUMENTS
     Storage pool resource - Storage pool you want to update. The arguments in
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
          ID of the storage pool or fully qualified identifier for the storage
          pool.

          To set the storage_pool attribute:
          + provide the argument storage_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument storage_pool on the command line with a
            fully specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the storage pool.

     --exapool-capacity-optimized-capacity=EXAPOOL_CAPACITY_OPTIMIZED_CAPACITY
        Provisioned capacity-optimized capacity of the exapool. Can only be
        specified for Exapool storage pools.

     --exapool-read-optimized-capacity=EXAPOOL_READ_OPTIMIZED_CAPACITY
        Provisioned read-optimized capacity of the exapool. Can only be
        specified for Exapool storage pools.

     --exapool-write-optimized-capacity=EXAPOOL_WRITE_OPTIMIZED_CAPACITY
        Provisioned write-optimized capacity of the exapool. Can only be
        specified for Exapool storage pools.

     --provisioned-capacity=PROVISIONED_CAPACITY
        Provisioned capacity of the storage pool.

     --provisioned-iops=PROVISIONED_IOPS
        IOPS to provision the pool with.

     --provisioned-throughput=PROVISIONED_THROUGHPUT
        Throughput in MB/s provision the pool with.

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

        $ gcloud alpha compute storage-pools update

        $ gcloud beta compute storage-pools update
```

### gcloud beta compute storage-pools create

```text
NAME
    gcloud beta compute storage-pools create - create a storage pool

SYNOPSIS
    gcloud beta compute storage-pools create STORAGE_POOL
        --provisioned-capacity=PROVISIONED_CAPACITY
        --storage-pool-type=STORAGE_POOL_TYPE [--async]
        [--capacity-provisioning-type=CAPACITY_PROVISIONING_TYPE]
        [--description=DESCRIPTION]
        [--performance-provisioning-type=PERFORMANCE_PROVISIONING_TYPE]
        [--provisioned-iops=PROVISIONED_IOPS]
        [--provisioned-throughput=PROVISIONED_THROUGHPUT]
        [--resource-manager-tags=[KEY=VALUE,...]] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute storage-pools delete

```text
NAME
    gcloud beta compute storage-pools delete - delete a storage pool

SYNOPSIS
    gcloud beta compute storage-pools delete (STORAGE_POOL : --zone=ZONE)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute storage-pools describe

```text
NAME
    gcloud beta compute storage-pools describe - describe a storage pool

SYNOPSIS
    gcloud beta compute storage-pools describe (STORAGE_POOL : --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute storage-pools get-iam-policy

```text
NAME
    gcloud beta compute storage-pools get-iam-policy - get the IAM policy of a
        storage pool

SYNOPSIS
    gcloud beta compute storage-pools get-iam-policy
        (STORAGE_POOL : --zone=ZONE) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute storage-pools list

```text
NAME
    gcloud beta compute storage-pools list - view storage pools

SYNOPSIS
    gcloud beta compute storage-pools list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute storage-pools list-disks

```text
NAME
    gcloud beta compute storage-pools list-disks - view the disks that are in a
        storage pool

SYNOPSIS
    gcloud beta compute storage-pools list-disks (STORAGE_POOL : --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute storage-pools set-iam-policy

```text
NAME
    gcloud beta compute storage-pools set-iam-policy - set the IAM policy of
        the given storage pool

SYNOPSIS
    gcloud beta compute storage-pools set-iam-policy
        (STORAGE_POOL : --zone=ZONE) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute storage-pools test-iam-permissions

```text
NAME
    gcloud beta compute storage-pools test-iam-permissions - test IAM
        permissions for a storage pool

SYNOPSIS
    gcloud beta compute storage-pools test-iam-permissions
        (STORAGE_POOL : --zone=ZONE) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute storage-pools update

```text
NAME
    gcloud beta compute storage-pools update - update a storage pool

SYNOPSIS
    gcloud beta compute storage-pools update (STORAGE_POOL : --zone=ZONE)
        [--async] [--description=DESCRIPTION]
        [--exapool-capacity-optimized-capacity=EXAPOOL_CAPACITY_OPTIMIZED_CAPACITY]
        [--exapool-read-optimized-capacity=EXAPOOL_READ_OPTIMIZED_CAPACITY]
        [--exapool-write-optimized-capacity=EXAPOOL_WRITE_OPTIMIZED_CAPACITY]
        [--provisioned-capacity=PROVISIONED_CAPACITY]
        [--provisioned-iops=PROVISIONED_IOPS]
        [--provisioned-throughput=PROVISIONED_THROUGHPUT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute storage-pools create

```text
NAME
    gcloud alpha compute storage-pools create - create a storage pool

SYNOPSIS
    gcloud alpha compute storage-pools create STORAGE_POOL
        --provisioned-capacity=PROVISIONED_CAPACITY
        --storage-pool-type=STORAGE_POOL_TYPE [--async]
        [--capacity-provisioning-type=CAPACITY_PROVISIONING_TYPE]
        [--description=DESCRIPTION]
        [--performance-provisioning-type=PERFORMANCE_PROVISIONING_TYPE]
        [--provisioned-iops=PROVISIONED_IOPS]
        [--provisioned-throughput=PROVISIONED_THROUGHPUT]
        [--resource-manager-tags=[KEY=VALUE,...]] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute storage-pools delete

```text
NAME
    gcloud alpha compute storage-pools delete - delete a storage pool

SYNOPSIS
    gcloud alpha compute storage-pools delete (STORAGE_POOL : --zone=ZONE)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute storage-pools describe

```text
NAME
    gcloud alpha compute storage-pools describe - describe a storage pool

SYNOPSIS
    gcloud alpha compute storage-pools describe (STORAGE_POOL : --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute storage-pools get-iam-policy

```text
NAME
    gcloud alpha compute storage-pools get-iam-policy - get the IAM policy of a
        storage pool

SYNOPSIS
    gcloud alpha compute storage-pools get-iam-policy
        (STORAGE_POOL : --zone=ZONE) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute storage-pools list

```text
NAME
    gcloud alpha compute storage-pools list - view storage pools

SYNOPSIS
    gcloud alpha compute storage-pools list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute storage-pools list-disks

```text
NAME
    gcloud alpha compute storage-pools list-disks - view the disks that are in
        a storage pool

SYNOPSIS
    gcloud alpha compute storage-pools list-disks (STORAGE_POOL : --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute storage-pools set-iam-policy

```text
NAME
    gcloud alpha compute storage-pools set-iam-policy - set the IAM policy of
        the given storage pool

SYNOPSIS
    gcloud alpha compute storage-pools set-iam-policy
        (STORAGE_POOL : --zone=ZONE) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute storage-pools test-iam-permissions

```text
NAME
    gcloud alpha compute storage-pools test-iam-permissions - test IAM
        permissions for a storage pool

SYNOPSIS
    gcloud alpha compute storage-pools test-iam-permissions
        (STORAGE_POOL : --zone=ZONE) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute storage-pools update

```text
NAME
    gcloud alpha compute storage-pools update - update a storage pool

SYNOPSIS
    gcloud alpha compute storage-pools update (STORAGE_POOL : --zone=ZONE)
        [--async] [--description=DESCRIPTION]
        [--exapool-capacity-optimized-capacity=EXAPOOL_CAPACITY_OPTIMIZED_CAPACITY]
        [--exapool-read-optimized-capacity=EXAPOOL_READ_OPTIMIZED_CAPACITY]
        [--exapool-write-optimized-capacity=EXAPOOL_WRITE_OPTIMIZED_CAPACITY]
        [--provisioned-capacity=PROVISIONED_CAPACITY]
        [--provisioned-iops=PROVISIONED_IOPS]
        [--provisioned-throughput=PROVISIONED_THROUGHPUT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/storage-pools (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
