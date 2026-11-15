---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/batch-operations
---

# gcloud storage batch-operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage batch-operations bucket-operations describe

```text
NAME
    gcloud storage batch-operations bucket-operations describe - describe a
        bucket operation for a batch operation job

SYNOPSIS
    gcloud storage batch-operations bucket-operations describe
        (BUCKET_OPERATION : --job=JOB) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a single bucket operation for a batch operation job.

EXAMPLES
    The following example command describes bucket operation bo-1 for batch job
    my-job:

        $ gcloud storage batch-operations bucket-operations describe bo-1 \
          --job=my-job

    The following example command describes bucket operation bo-1 using its
    fully qualified name:

        $ gcloud storage batch-operations bucket-operations describe \
          projects/my-project/locations/global/jobs/my-job/\
        bucketOperations/bo-1

POSITIONAL ARGUMENTS
     Bucket operation resource - The bucket operation to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument bucket_operation on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument bucket_operation on the command line with a
        fully specified name;
      * The default is global.

     This must be specified.

       BUCKET_OPERATION
          ID of the bucket-operation or fully qualified identifier for the
          bucket-operation.

          To set the bucket-operation attribute:
          + provide the argument bucket_operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --job=JOB
          Batch Job ID for the bucket-operation.

          To set the job attribute:
          + provide the argument bucket_operation on the command line with a
            fully specified name;
          + provide the argument --job on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage batch-operations bucket-operations describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud storage batch-operations bucket-operations describe projects/my-project/locations/global/jobs/my-job/bucketOperations/bo-1
```

### gcloud storage batch-operations bucket-operations list

```text
NAME
    gcloud storage batch-operations bucket-operations list - list bucket
        operations for a batch operation job

SYNOPSIS
    gcloud storage batch-operations bucket-operations list --job=JOB
        [--buckets=[BUCKETS,...]] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List bucket operations for a specific batch operation job.

EXAMPLES
    The following example command lists bucket operations for batch job my-job:

        $ gcloud storage batch-operations bucket-operations list --job=my-job

    The following example command lists bucket operations for batch job my-job
    filtering by bucket name my-bucket:

        $ gcloud storage batch-operations bucket-operations list \
          --job=my-job --buckets=my-bucket

REQUIRED FLAGS
     Batch job resource - The batch job for which to list bucket operations.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --job on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --job on the command line with a fully specified
        name;
      * The default is global.

     This must be specified.

       --job=JOB
          ID of the batch-job or fully qualified identifier for the batch-job.

          To set the batch-job attribute:
          + provide the argument --job on the command line.

FLAGS
     --buckets=[BUCKETS,...]
        If provided, only show operations for buckets in the list.

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

NOTES
    This variant is also available:

        $ gcloud alpha storage batch-operations bucket-operations list
```

### gcloud storage batch-operations jobs cancel

```text
NAME
    gcloud storage batch-operations jobs cancel - cancel a batch-operations job

SYNOPSIS
    gcloud storage batch-operations jobs cancel BATCH_JOB
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel the batch operation job.

EXAMPLES
    To cancel a batch job with the name my-job in location us-central1:

        $ gcloud storage batch-operations jobs cancel my-job \
          --location=us-central1

    To cancel the same batch job with fully specified name:

        $ gcloud storage batch-operations jobs cancel \
          projects/my-project/locations/us-central1/jobs/my-job

POSITIONAL ARGUMENTS
     Batch job resource - The batch job to cancel. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument batch_job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument batch_job on the command line with a fully
        specified name;
      * The default is global.

     This must be specified.

       BATCH_JOB
          ID of the batch-job or fully qualified identifier for the batch-job.

          To set the batch-job attribute:
          + provide the argument batch_job on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage batch-operations jobs cancel
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud storage batch-operations jobs cancel projects/my-project/locations/us-central1/jobs/my-job
```

### gcloud storage batch-operations jobs create

```text
NAME
    gcloud storage batch-operations jobs create - create a new batch operation
        job

SYNOPSIS
    gcloud storage batch-operations jobs create BATCH_JOB
        ((--bucket=BUCKET | --bucket-list=[BUCKETS,...])
          (--included-object-prefixes=[PREFIXES,...]
          | --manifest-location=MANIFEST_LOCATION)
          | --dry-run-job-id=DRY_RUN_JOB_ID
          | [--insights-dataset-config=INSIGHTS_DATASET_CONFIG
          --target-project=TARGET_PROJECT : --bucket-filters=BUCKET_FILTERS
          --object-filters=OBJECT_FILTERS [--target-locations=[LOCATIONS,...]
          : --target-snapshot-time=TARGET_SNAPSHOT_TIME]])
        (--put-metadata=KEY=VALUE,[KEY=VALUE,...]
          | --rewrite-object=KEY=VALUE,[KEY=VALUE,...]
          | --set-object-acls-from-file=ACL_UPDATES_FILE
          | --clear-all-object-custom-contexts
          | --clear-object-custom-contexts=[CUSTOM_CONTEXTS_KEYS,...]
          --update-object-custom-contexts=[CUSTOM_CONTEXTS_KEYS_AND_VALUES,...]
          | --update-object-custom-contexts-file=CUSTOM_CONTEXTS_FILE
          | [--delete-object : --enable-permanent-object-deletion]
          | --[no-]put-object-event-based-hold
          --[no-]put-object-temporary-hold) [--description=DESCRIPTION]
        [--dry-run]
        [--log-actions=[LOG_ACTIONS,...]
          --log-action-states=[LOG_ACTION_STATES,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a batch operation job, allowing you to perform operations such as
    deletion, updating metadata, and more on objects in a serverless manner.

EXAMPLES
    The following example command creates a batch job, named my-dry-run, that
    performs a dry run of object deletion on bucket my-bucket for objects
    specified in the manifest file gs://my-bucket/manifest.csv:

        $ gcloud storage batch-operations jobs create my-dry-run-job \
          --bucket=my-bucket \
          --manifest-location=gs://my-bucket/manifest.csv \
          --delete-object --dry-run

    The following example command creates a batch job, named my-job, that
    performs object deletion on bucket my-bucket for objects specified in the
    manifest file gs://my-bucket/manifest.csv:

        $ gcloud storage batch-operations jobs create my-job \
          --bucket=my-bucket \
          --manifest-location=gs://my-bucket/manifest.csv --delete-object

    The following example command creates a batch job, named my-job, that
    performs object deletion on buckets my-bucket-1 and my-bucket-2 for all
    objects in them:

        $ gcloud storage batch-operations jobs create my-job \
          --bucket-list=my-bucket-1,my-bucket-2 \
          --included-object-prefixes='' --delete-object

    The following example command creates a batch job, named my-job, that
    updates object metadata Content-Disposition to inline, Content-Language to
    en, and sets object retention mode to locked on bucket my-bucket for
    objects with prefixes prefix1 or prefix2:

        $ gcloud storage batch-operations jobs create my-job \
          --bucket=my-bucket --included-object-prefixes=prefix1,prefix2 \
          --put-metadata=Content-Disposition=inline,Content-Language=en,\
        Retain-Until=2025-01-01T00:00:00Z,Retention-Mode=locked

    The following example command creates a batch job, named my-job, that
    removes the object custom context key1 and updates key2 to val2 and key3 to
    val3 on bucket my-bucket for objects with prefixes prefix1 or prefix2:

        $ gcloud storage batch-operations jobs create my-job \
          --bucket=my-bucket --included-object-prefixes=prefix1,prefix2 \
          --clear-object-custom-contexts=key1 \
          --update-object-custom-contexts=key2=val2,key3=val3

    The following example command creates a batch job, named my-job, that puts
    object event based hold on objects in bucket my-bucket with logging config
    enabled for corresponding transform action and succeeded and failed action
    states:

        $ gcloud storage batch-operations jobs create my-job \
          --bucket=my-bucket --put-object-event-based-hold \
          --put-metadata=Content-Disposition=inline,Content-Language=en \
          --log-actions=transform --log-action-states=succeeded,failed

    The following example command creates a batch job, named my-job, that uses
    a project as the source and updates object retention:

        $ gcloud storage batch-operations jobs create my-job \
          --target-project=my-project \
          --insights-dataset-config=projects/my-project/locations/\
        us-central1/datasetConfigs/my-config \
            --bucket-filters="name == 'my-bucket'" \
            --object-filters="size > 100" \
            --put-metadata=Retain-Until=2025-01-01T00:00:00Z,\
        Retention-Mode=locked

    The following example command creates a batch job, named my-job, that uses
    a project as the source with specific target locations and snapshot
    timestamp:

        $ gcloud storage batch-operations jobs create my-job \
          --target-project=my-project \
          --insights-dataset-config=projects/my-project/locations/\
        us-central1/datasetConfigs/my-config \
            --target-locations=us-central1,us-east1 \
            --target-snapshot-time=2024-01-02T03:04:05Z \
            --put-metadata=Retention-Mode=locked

POSITIONAL ARGUMENTS
     Batch job resource - The batch job to create. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument batch_job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument batch_job on the command line with a fully
        specified name;
      * The default is global.

     This must be specified.

       BATCH_JOB
          ID of the batch-job or fully qualified identifier for the batch-job.

          To set the batch-job attribute:
          + provide the argument batch_job on the command line.

REQUIRED FLAGS
     Source specifying objects to perform batch operations on. You can specify
     either a bucket-based source or a project-based source.

     Exactly one of these must be specified:

       Use bucket(s) as the source.

       Exactly one of these must be specified:

         --bucket=BUCKET
            Bucket containing the objects that the batch job will operate on.

         --bucket-list=[BUCKETS,...]
            List of buckets containing the objects that the batch job will
            operate on.

       Source specifying objects to perform batch operations on. Must be one of
       --manifest-location=``MANIFEST_LOCATION or
       --included-object-prefixes=``COMMA_SEPARATED_PREFIXES

       Exactly one of these must be specified:

         --included-object-prefixes=[PREFIXES,...]
            A comma-separated list of object prefixes to describe the objects
            being transformed. An empty string means all objects in the bucket.

         --manifest-location=MANIFEST_LOCATION
            An absolute path to the manifest source file in a Google Cloud
            Storage bucket. The file must be a CSV file where each row
            specifies the object details i.e. ProjectId, BucketId, and Name.
            Generation may optionally be specified. When generation is not
            specified, the live object is acted upon. Format:
            --manifest-location=gs://bucket_name/path/manifest_name.csv

       Use a project as the source.

       At most one of these can be specified:

         --dry-run-job-id=DRY_RUN_JOB_ID
            The unique identifier of a dry run job to use as the baseline.
            Specifying this ID ensures the job is executed against the same set
            of objects validated during the dry run.

         Or at least one of these can be specified:

           --insights-dataset-config=INSIGHTS_DATASET_CONFIG
              The resource identifier of the Storage Insights dataset
              configuration. Format:
              projects/{project}/locations/{location}/datasetConfigs/{datasetConfig}

              This flag argument must be specified if any of the other
              arguments in this group are specified.

           --target-project=TARGET_PROJECT
              Project name of the objects to be transformed. e.g. my-project or
              123456.

              This flag argument must be specified if any of the other
              arguments in this group are specified.

           --bucket-filters=BUCKET_FILTERS
              Filters expressed in Common Expression Language (CEL) to apply to
              buckets. E.g. "bucket_name == 'my-bucket'".

           --object-filters=OBJECT_FILTERS
              Filters expressed in Common Expression Language (CEL) to apply to
              objects. E.g. "size > 100".

           --target-locations=[LOCATIONS,...]
              A comma-separated list of Cloud Storage locations (e.g.,
              us-central1) to include in the job. Only buckets and objects
              within these locations will be discovered from the configured
              Storage Insights dataset.

              This flag argument must be specified if any of the other
              arguments in this group are specified.

           --target-snapshot-time=TARGET_SNAPSHOT_TIME
              The exact Storage Insights snapshot timestamp to use for the job
              compatible with the RFC 3339 format (e.g.,
              2024-01-02T03:04:00.123456Z). Can only be specified if
              --target-locations is specified. If omitted, the job
              automatically defaults to the most recent snapshot timestamp that
              is successfully populated in both object and bucket attributes
              views across all specified locations. This snapshot time is
              precise to the microsecond. Any finer precision is truncated.

     Transformation to be performed on the objects.

     Exactly one of these must be specified:

       --put-metadata=KEY=VALUE,[KEY=VALUE,...]
          Sets object metadata. To set how content should be displayed, specify
          the the key-value pair Content-Disposition={VALUE}. To set how
          content is encoded (e.g. "gzip"), specify the key-value pair
          Content-Encoding={VALUE}. To set content's language (e.g. "en"
          signifies "English"), specify the key-value pair
          Content-Language={VALUE}. To set the type of data contained in the
          object (e.g. "text/html"), specify the key-value pair
          Content-Type={VALUE}. To set how caches should handle requests and
          responses, specify the key-value pair Cache-Control={VALUE}. To set
          custom time for Cloud Storage objects in RFC 3339 format, specify the
          key-value pair Custom-Time={VALUE}. To set object retention, specify
          Retain-Until={TIMESTAMP} in RFC 3339 format and Retention-Mode={MODE}
          where mode can be Locked or Unlocked. To set custom metadata on
          objects, specify key-value pairs {CUSTOM-KEY}:{VALUE}. Note that all
          predefined keys (e.g. Content-Disposition) are case-insensitive. Any
          other key that is not specified above will be treated as a custom
          key. To clear a field, provide the key with an empty value (e.g.
          Content-Disposition=). Multiple key-value pairs can be specified by
          separating them with commas. For example,
          --put-metadata=Content-Disposition=inline,Content-Encoding=gzip

       --rewrite-object=KEY=VALUE,[KEY=VALUE,...]
          Rewrites object and the specified metadata. Currently only supports
          rewriting kms-key and storage-class. To rewrite the Cloud KMS key
          that will be used to encrypt the object, specify the key-value pair
          kms-key={KEY}. To rewrite the object storage classes, specify the
          key-value pair storage-class={STORAGE_CLASS} where storage-class can
          be one of STANDARD, NEARLINE, COLDLINE, or ARCHIVE. If an object's
          storage class is set to a different value than it currently has, a
          full byte copy of the object will be made. If Autoclass is enabled on
          the bucket, storage class changes will be ignored by Cloud Storage. A
          metadata field MUST be specified, and multiple key-value pairs can be
          specified by separating them with commas. For example:

          + --rewrite-object=kms-key=projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/CRYPTO_KEY,storage-class=STANDARD

       --set-object-acls-from-file=ACL_UPDATES_FILE
          Path to a local YAML or JSON file containing object ACL updates. The
          file must use the following format:

          grants:
          + entity: ENTITY role: ROLE remove_entities:
          + ENTITY

          For example:

          grants:
          + entity: allAuthenticatedUsers role: READER remove_entities:
          + allUsers

       Or at most one of these can be specified:

         Describes options to update object custom contexts.

         --clear-all-object-custom-contexts
            Clears all object custom contexts.

         Or at least one of these can be specified:

           Flags for updating or clearing individual custom contexts. A key
           cannot be present in both --update-object-custom-contexts and
           --clear-object-custom-contexts.

           --clear-object-custom-contexts=[CUSTOM_CONTEXTS_KEYS,...]
              Removes object custom contexts by key. If an entry is not found,
              it will be ignored. e.g. --clear-object-custom-contexts=key1,key2

           Flags for specifying custom context updates in key-value pairs or
           from a file.

           At most one of these can be specified:

             --update-object-custom-contexts=[CUSTOM_CONTEXTS_KEYS_AND_VALUES,...]
                Inserts or updates object custom contexts. If an existing entry
                is found, the value will be updated, otherwise the entry would
                be added. e.g.
                --update-object-custom-contexts=key1=val1,key2=val2

             --update-object-custom-contexts-file=CUSTOM_CONTEXTS_FILE
                Path to a local JSON or YAML file containing custom contexts
                one wants to update on an object. If an entry is found, any
                fields set in the payload will be updated, otherwise the entry
                would be added. For example:

                1. The following JSON document shows two key value pairs, i.e.
                (key1, value1) and (key2, value2):

                      {
                        "key1": {"value": "value1"},
                        "key2": {"value": "value2"}
                      }

                2. The following YAML document shows two key value pairs, i.e.
                (key1, value1) and (key2, value2):

                      key1:
                        value: value1
                      key2:
                        value: value2

                Note: Currently object contexts only supports string format for
                values.

       Or at least one of these can be specified:

         Describes options to delete objects.

         --delete-object
            If this flag is set, objects specified in source will be deleted.
            When versioning is enabled on the buckets, live objects in
            versioned buckets will become noncurrent and objects that were
            already noncurrent will be skipped.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --enable-permanent-object-deletion
            If this flag is set and versioning is enabled on the buckets, both
            live and noncurrent objects will be permanently deleted.

       Or at least one of these can be specified:

         Describes options to update object hold.

         --[no-]put-object-event-based-hold
            Sets or unsets object event based holds state. When object event
            based hold is set, object cannot be deleted or replaced. Use
            --put-object-event-based-hold to enable and
            --no-put-object-event-based-hold to disable.

         --[no-]put-object-temporary-hold
            Sets or unsets object temporary holds state. When object temporary
            hold is set, object cannot be deleted or replaced. Use
            --put-object-temporary-hold to enable and
            --no-put-object-temporary-hold to disable.

FLAGS
     --description=DESCRIPTION
        Description for the batch job.

     --dry-run
        If true, the job will run in dry run mode, returning the total object
        count and, if the object configuration is a prefix list, the bytes
        found from source. No transformations will be performed.

LOGGING_CONFIG FLAGS
     LOGGING CONFIG

     Configure which transfer actions and action states are reported when logs
     are generated for this job. Logs can be viewed by running the following
     command: gcloud logging read
     "resource.type=storagebatchoperations.googleapis.com/Job"

     --log-actions=[LOG_ACTIONS,...]
        Define the batch job actions to report in logs. (e.g.,
        --log-actions=transform). LOG_ACTIONS must be (only one value is
        supported): transform.

     --log-action-states=[LOG_ACTION_STATES,...]
        The states in which the actions specified in --log-actions are logged.
        Separate multiple states with a comma, omitting the space after the
        comma (e.g., --log-action-states=succeeded,failed). LOG_ACTION_STATES
        must be one of: failed, succeeded.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage batch-operations jobs create
```

Adapted (not in the official docs): runnable form of the example(s) above: the commands are rewritten so that they run as described (see Notes).

```bash
cat > acl-updates.yaml <<'EOF'
grants:
- entity: group-storage-readers@example.com
  role: READER
remove_entities:
- allUsers
EOF
gcloud storage batch-operations jobs create my-job \
    --bucket=my-bucket \
    --included-object-prefixes=prefix1 \
    --set-object-acls-from-file=acl-updates.yaml
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud storage batch-operations jobs create my-job \
    --bucket=my-bucket \
    --included-object-prefixes=prefix1,prefix2 \
    --put-metadata=Content-Disposition=inline,Content-Language=en,Retain-Until=2025-01-01T00:00:00Z,Retention-Mode=locked

gcloud storage batch-operations jobs create my-job \
    --bucket=my-bucket \
    --included-object-prefixes=prefix1 \
    --put-object-event-based-hold \
    --log-actions=transform \
    --log-action-states=succeeded,failed

gcloud storage batch-operations jobs create my-job \
    --target-project=my-project \
    --insights-dataset-config=projects/my-project/locations/us-central1/datasetConfigs/my-config \
    --bucket-filters="name == 'my-bucket'" \
    --object-filters="size > 100" \
    --put-metadata=Retain-Until=2025-01-01T00:00:00Z,Retention-Mode=locked

gcloud storage batch-operations jobs create my-job \
    --target-project=my-project \
    --insights-dataset-config=projects/my-project/locations/us-central1/datasetConfigs/my-config \
    --target-locations=us-central1,us-east1 \
    --target-snapshot-time=2024-01-02T03:04:05Z \
    --put-metadata=Retention-Mode=locked
```

### gcloud storage batch-operations jobs delete

```text
NAME
    gcloud storage batch-operations jobs delete - delete a batch-operations job

SYNOPSIS
    gcloud storage batch-operations jobs delete BATCH_JOB
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the batch operation job.

EXAMPLES
    To delete a batch job with the name my-job in location us-central1:

        $ gcloud storage batch-operations jobs delete my-job \
          --location=us-central1

    To delete the same batch job with fully specified name:

        $ gcloud storage batch-operations jobs delete \
          projects/my-project/locations/us-central1/jobs/my-job

POSITIONAL ARGUMENTS
     Batch job resource - The batch job to delete. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument batch_job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument batch_job on the command line with a fully
        specified name;
      * The default is global.

     This must be specified.

       BATCH_JOB
          ID of the batch-job or fully qualified identifier for the batch-job.

          To set the batch-job attribute:
          + provide the argument batch_job on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage batch-operations jobs delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud storage batch-operations jobs delete projects/my-project/locations/us-central1/jobs/my-job
```

### gcloud storage batch-operations jobs describe

```text
NAME
    gcloud storage batch-operations jobs describe - describe a batch-operations
        job

SYNOPSIS
    gcloud storage batch-operations jobs describe BATCH_JOB
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe the batch operation job.

EXAMPLES
    To describe a batch job with the name my-job:

        $ gcloud storage batch-operations jobs describe my-job

    To describe the same batch job with fully specified name:

        $ gcloud storage batch-operations jobs describe \
          projects/my-project/locations/global/jobs/my-job

POSITIONAL ARGUMENTS
     Batch job resource - The batch job to describe. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument batch_job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument batch_job on the command line with a fully
        specified name;
      * The default is global.

     This must be specified.

       BATCH_JOB
          ID of the batch-job or fully qualified identifier for the batch-job.

          To set the batch-job attribute:
          + provide the argument batch_job on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage batch-operations jobs describe
```

### gcloud storage batch-operations jobs list

```text
NAME
    gcloud storage batch-operations jobs list - list batch-operations jobs

SYNOPSIS
    gcloud storage batch-operations jobs list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List batch operation jobs.

EXAMPLES
    To list all batch jobs:

        $ gcloud storage batch-operations jobs list

    To list all batch jobs that are not dry run:

        $ gcloud storage batch-operations jobs list --filter="dry_run=false"

    To list all batch jobs with a page size of 10:

        $ gcloud storage batch-operations jobs list --page-size=10

    To list a limit of 20 batch jobs:

        $ gcloud storage batch-operations jobs list --limit=20

    To list all batch jobs in JSON format:

        $ gcloud storage batch-operations jobs list --format=json

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

NOTES
    This variant is also available:

        $ gcloud alpha storage batch-operations jobs list
```

### gcloud alpha storage batch-operations bucket-operations describe

```text
NAME
    gcloud alpha storage batch-operations bucket-operations describe - describe
        a bucket operation for a batch operation job

SYNOPSIS
    gcloud alpha storage batch-operations bucket-operations describe
        (BUCKET_OPERATION : --job=JOB) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage batch-operations bucket-operations list

```text
NAME
    gcloud alpha storage batch-operations bucket-operations list - list bucket
        operations for a batch operation job

SYNOPSIS
    gcloud alpha storage batch-operations bucket-operations list --job=JOB
        [--buckets=[BUCKETS,...]] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage batch-operations jobs cancel

```text
NAME
    gcloud alpha storage batch-operations jobs cancel - cancel a
        batch-operations job

SYNOPSIS
    gcloud alpha storage batch-operations jobs cancel BATCH_JOB
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage batch-operations jobs create

```text
NAME
    gcloud alpha storage batch-operations jobs create - create a new batch
        operation job

SYNOPSIS
    gcloud alpha storage batch-operations jobs create BATCH_JOB
        ((--bucket=BUCKET | --bucket-list=[BUCKETS,...])
          (--included-object-prefixes=[PREFIXES,...]
          | --manifest-location=MANIFEST_LOCATION)
          | --dry-run-job-id=DRY_RUN_JOB_ID
          | [--insights-dataset-config=INSIGHTS_DATASET_CONFIG
          --target-project=TARGET_PROJECT : --bucket-filters=BUCKET_FILTERS
          --object-filters=OBJECT_FILTERS [--target-locations=[LOCATIONS,...]
          : --target-snapshot-time=TARGET_SNAPSHOT_TIME]])
        (--put-metadata=KEY=VALUE,[KEY=VALUE,...]
          | --rewrite-object=KEY=VALUE,[KEY=VALUE,...]
          | --set-object-acls-from-file=ACL_UPDATES_FILE
          | --clear-all-object-custom-contexts
          | --clear-object-custom-contexts=[CUSTOM_CONTEXTS_KEYS,...]
          --update-object-custom-contexts=[CUSTOM_CONTEXTS_KEYS_AND_VALUES,...]
          | --update-object-custom-contexts-file=CUSTOM_CONTEXTS_FILE
          | [--delete-object : --enable-permanent-object-deletion]
          | --[no-]put-object-event-based-hold
          --[no-]put-object-temporary-hold) [--description=DESCRIPTION]
        [--dry-run]
        [--log-actions=[LOG_ACTIONS,...]
          --log-action-states=[LOG_ACTION_STATES,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage batch-operations jobs delete

```text
NAME
    gcloud alpha storage batch-operations jobs delete - delete a
        batch-operations job

SYNOPSIS
    gcloud alpha storage batch-operations jobs delete BATCH_JOB [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage batch-operations jobs describe

```text
NAME
    gcloud alpha storage batch-operations jobs describe - describe a
        batch-operations job

SYNOPSIS
    gcloud alpha storage batch-operations jobs describe BATCH_JOB
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage batch-operations jobs list

```text
NAME
    gcloud alpha storage batch-operations jobs list - list batch-operations
        jobs

SYNOPSIS
    gcloud alpha storage batch-operations jobs list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `--set-object-acls-from-file` format and example are flattened by `gcloud help` into lines such as `+ entity: ENTITY role: ROLE remove_entities:`, which is not valid YAML; the gcloud 593.0.0 source lists `grants` as a sequence of `entity` / `role` mappings and `remove_entities` as a sequence of entities. The runnable form writes that structure to a file and passes it to `jobs create`; it grants `READER` to an example group (`group-storage-readers@example.com`) instead of `allAuthenticatedUsers`, which would let every signed-in Google account read the objects.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `cancel` and `delete` examples pass `my-job --location=us-central1`, but these commands have no `--location` flag (gcloud 593.0.0 rejects it as an unrecognized argument; the location is taken from a fully specified name and defaults to `global`); the runnable form uses the fully specified name `projects/my-project/locations/us-central1/jobs/my-job`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the event-based-hold example passes neither `--included-object-prefixes` nor `--manifest-location`, one of which the SYNOPSIS requires with `--bucket` (gcloud 593.0.0: "argument (--included-object-prefixes | --manifest-location): Must be specified"), and combines `--put-object-event-based-hold` with `--put-metadata`, which the SYNOPSIS lists as alternative transformations (gcloud 593.0.0: "Exactly one of (--put-metadata | ... ) must be specified"); the runnable form adds `--included-object-prefixes=prefix1` (the prefix of the other examples; `--included-object-prefixes=''` selects every object) and drops `--put-metadata`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/batch-operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
