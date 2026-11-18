---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/insights/dataset-configs
---

# gcloud storage insights dataset-configs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage insights dataset-configs create

```text
NAME
    gcloud storage insights dataset-configs create - create a new dataset
        config for Insights

SYNOPSIS
    gcloud storage insights dataset-configs create DATASET_CONFIG_NAME
        --location=LOCATION --organization=SOURCE_ORG_NUMBER
        --retention-period-days=RETENTION_DAYS
        (--enable-organization-scope
          | --source-folders=[SOURCE_FOLDER_NUMBERS,...]
          | --source-folders-file=SOURCE_FOLDER_NUMBERS_IN_FILE
          | --source-projects=[SOURCE_PROJECT_NUMBERS,...]
          | --source-projects-file=SOURCE_PROJECT_NUMBERS_IN_FILE)
        [--activity-data-retention-period-days=ACTIVITY_DATA_RETENTION_DAYS]
        [--auto-add-new-buckets] [--description=DESCRIPTION]
        [--identity=IDENTITY_TYPE; default="IDENTITY_TYPE_PER_CONFIG"]
        [--exclude-bucket-names=[BUCKETS_NAMES,...]
          --exclude-bucket-prefix-regexes=[BUCKETS_REGEXES,...]
          | --include-bucket-names=[BUCKETS_NAMES,...]
          --include-bucket-prefix-regexes=[BUCKETS_REGEXES,...]]
        [--exclude-source-locations=[LIST_OF_SOURCE_LOCATIONS,...]
          | --include-source-locations=[LIST_OF_SOURCE_LOCATIONS,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new dataset config for Insights.

EXAMPLES
    To create a dataset config with config name as "my_config" in location
    "us-central1" and project numbers "123456" and "456789" belonging to
    organization number "54321":

        $ gcloud storage insights dataset-configs create my_config \
           --location=us-central1 --source-projects=123456,456789 \
           --organization=54321 --retention-period-days=1

    To create a dataset config that automatically adds new buckets into config:

        $ gcloud storage insights dataset-configs create my_config \
           --location=us-central1 --source-projects=123456,456789 \
           --organization=54321 --auto-add-new-buckets \
           --retention-period-days=1

POSITIONAL ARGUMENTS
     DATASET_CONFIG_NAME
        Provide human readable config name.

REQUIRED FLAGS
     --location=LOCATION
        Provide location of the dataset config.

     --organization=SOURCE_ORG_NUMBER
        Provide the source organization number.

     --retention-period-days=RETENTION_DAYS
        Provide retention period for the config.

     List of source options either source projects or source folders or enable
     organization scope. Refer Dataset Configuration Properties
     (https://cloud.google.com/storage/docs/insights/datasets#dataset-config)
     for more details.

     Exactly one of these must be specified:

       --enable-organization-scope
          If passed, the dataset config will be enabled on the organization.

       Or at most one of these can be specified:

         List of source folder IDs or the file containing list of folder IDs.

         --source-folders=[SOURCE_FOLDER_NUMBERS,...]
            List of source folder IDs.

         --source-folders-file=SOURCE_FOLDER_NUMBERS_IN_FILE
            CSV formatted file containing source folder IDs, one per line.

       Or at most one of these can be specified:

         List of source project numbers or the file containing list of project
         numbers.

         --source-projects=[SOURCE_PROJECT_NUMBERS,...]
            List of source project numbers.

         --source-projects-file=SOURCE_PROJECT_NUMBERS_IN_FILE
            CSV formatted file containing source project numbers, one per line.

OPTIONAL FLAGS
     --activity-data-retention-period-days=ACTIVITY_DATA_RETENTION_DAYS
        Provide retention period for the activity data in the config. This
        overrides the retention period for activity data. Otherwise, the
        retention_period_days value is used for activity data as well.

     --auto-add-new-buckets
        Automatically include any new buckets created if they satisfy criteria
        defined in config settings.

     --description=DESCRIPTION
        Description for dataset config.

     --identity=IDENTITY_TYPE; default="IDENTITY_TYPE_PER_CONFIG"
        The type of service account used in the dataset config. IDENTITY_TYPE
        must be one of: IDENTITY_TYPE_PER_CONFIG, IDENTITY_TYPE_PER_PROJECT.

     Specify the list of buckets to be included or excluded, both a list of
     bucket names and prefix regexes can be specified for either include or
     exclude buckets.

     At most one of these can be specified:

       Specify the list of buckets to be excluded.

       --exclude-bucket-names=[BUCKETS_NAMES,...]
          List of bucket names to be excluded.

       --exclude-bucket-prefix-regexes=[BUCKETS_REGEXES,...]
          List of bucket prefix regexes to be excluded. Allowed regex patterns
          are similar to those for the --include-bucket-prefix-regexes flag.

       Specify the list of buckets to be included.

       --include-bucket-names=[BUCKETS_NAMES,...]
          List of bucket names be included.

       --include-bucket-prefix-regexes=[BUCKETS_REGEXES,...]
          List of bucket prefix regexes to be included. The dataset config will
          include all the buckets that match with the prefix regex. Examples of
          allowed prefix regex patterns can be testbucket*, testbucket.*foo,
          testb.+foo* . It should follow syntax specified in google/re2 on
          GitHub.

     Specify the list of locations for source projects to be included or
     excluded from available locations
     (https://cloud.google.com/storage/docs/locations#available-locations).

     At most one of these can be specified:

       --exclude-source-locations=[LIST_OF_SOURCE_LOCATIONS,...]
          List of locations for projects to be excluded.

       --include-source-locations=[LIST_OF_SOURCE_LOCATIONS,...]
          List of locations for projects to be included.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage insights dataset-configs create
```

### gcloud storage insights dataset-configs create-link

```text
NAME
    gcloud storage insights dataset-configs create-link - create a link to a
        BigQuery instance

SYNOPSIS
    gcloud storage insights dataset-configs create-link
        (DATASET_CONFIG : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create link to the customer BigQuery instance for Insights dataset config.

EXAMPLES
    To create a link to the customer BigQuery instance for config name:
    "my_config" in location "us-central1":

        $ gcloud storage insights dataset-configs create-link my_config \
          --location=us-central1

    To create a link for the same dataset config with fully specified name:

        $ gcloud storage insights dataset-configs create-link \
          projects/foo/locations/us-central1/datasetConfigs/my_config

POSITIONAL ARGUMENTS
     Dataset config resource - The Dataset config to create link. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument dataset_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATASET_CONFIG
          ID of the dataset-config or fully qualified identifier for the
          dataset-config.

          To set the dataset-config attribute:
          + provide the argument dataset_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Insights supported Google Cloud location for the dataset-config.

          To set the location attribute:
          + provide the argument dataset_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage insights dataset-configs create-link
```

### gcloud storage insights dataset-configs delete

```text
NAME
    gcloud storage insights dataset-configs delete - delete dataset config for
        Insights

SYNOPSIS
    gcloud storage insights dataset-configs delete
        (DATASET_CONFIG : --location=LOCATION) [--auto-delete-link] [--force]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Insights dataset config.

EXAMPLES
    To delete a dataset config with config name "my_config" in location
    "us-central1":

        $ gcloud storage insights dataset-configs delete my_config \
          --location=us-central1

    To delete the same dataset config with fully specified name:

        $gcloud storage insights dataset-configs delete projects/foo/locations/us-central1/datasetConfigs/my_config

    To delete the same dataset config and unlink it from the BigQuery instance:

        $ gcloud storage insights dataset-configs delete my_config \
          --location=us-central1 --auto-delete-link

    To delete the same dataset config without taking user consent:

        $ gcloud storage insights dataset-configs delete my_config \
          --location=us-central1 --auto-delete-link --force

POSITIONAL ARGUMENTS
     Dataset config resource - The Dataset config to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument dataset_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATASET_CONFIG
          ID of the dataset-config or fully qualified identifier for the
          dataset-config.

          To set the dataset-config attribute:
          + provide the argument dataset_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Insights supported Google Cloud location for the dataset-config.

          To set the location attribute:
          + provide the argument dataset_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --auto-delete-link
        Delete the BigQuery instance links before the config gets deleted
        explicitly.

     --force
        Force delete the config by skipping the consent.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage insights dataset-configs delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud storage insights dataset-configs delete projects/foo/locations/us-central1/datasetConfigs/my_config
```

### gcloud storage insights dataset-configs delete-link

```text
NAME
    gcloud storage insights dataset-configs delete-link - delete a link to a
        BigQuery instance

SYNOPSIS
    gcloud storage insights dataset-configs delete-link
        (DATASET_CONFIG : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a link to a BigQuery instance.

EXAMPLES
    To unlink a dataset config with config name "my_config" in location
    "us-central1":

        $ gcloud storage insights dataset-configs delete-link my_config \
          --location=us-central1

    To delete a link for the same dataset config with fully specified name:

        $ gcloud storage insights dataset-configs delete-link \
          projects/foo/locations/us-central1/datasetConfigs/my_config

POSITIONAL ARGUMENTS
     Dataset config resource - The Dataset config to delete link. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument dataset_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATASET_CONFIG
          ID of the dataset-config or fully qualified identifier for the
          dataset-config.

          To set the dataset-config attribute:
          + provide the argument dataset_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Insights supported Google Cloud location for the dataset-config.

          To set the location attribute:
          + provide the argument dataset_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage insights dataset-configs delete-link
```

### gcloud storage insights dataset-configs describe

```text
NAME
    gcloud storage insights dataset-configs describe - describe dataset config
        for Insights

SYNOPSIS
    gcloud storage insights dataset-configs describe
        (DATASET_CONFIG : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe the Insights dataset config.

EXAMPLES
    To describe a dataset config with config name "my_config" in location
    "us-central1":

        $ gcloud storage insights dataset-configs describe my_config \
          --location=us-central1

    To describe the same dataset config with fully specified name:

        $ gcloud storage insights dataset-configs describe \
          projects/foo/locations/us-central1/datasetConfigs/my_config

POSITIONAL ARGUMENTS
     Dataset config resource - The Dataset config to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument dataset_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATASET_CONFIG
          ID of the dataset-config or fully qualified identifier for the
          dataset-config.

          To set the dataset-config attribute:
          + provide the argument dataset_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Insights supported Google Cloud location for the dataset-config.

          To set the location attribute:
          + provide the argument dataset_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage insights dataset-configs describe
```

### gcloud storage insights dataset-configs list

```text
NAME
    gcloud storage insights dataset-configs list - list returns all the
        Insights dataset configs for given location

SYNOPSIS
    gcloud storage insights dataset-configs list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Cloud storage Insights dataset configs.

EXAMPLES
    List all dataset configs in all locations:

        $ gcloud storage insights dataset-configs list

    List all dataset configs for location "us-central1":

        $ gcloud storage insights dataset-configs list --location=us-central1

    List all dataset configs with a page size of "20":

        $ gcloud storage insights dataset-configs list \
          --location=us-central1 --page-size=20

    List all dataset configs with JSON formatting:

        $ gcloud storage insights dataset-configs list \
          --location=us-central1 --format=json

FLAGS
     --location=LOCATION
        Provide location of the dataset config.

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

        $ gcloud alpha storage insights dataset-configs list
```

### gcloud storage insights dataset-configs update

```text
NAME
    gcloud storage insights dataset-configs update - updates a dataset config
        for Insights

SYNOPSIS
    gcloud storage insights dataset-configs update
        (DATASET_CONFIG : --location=LOCATION)
        [--activity-data-retention-period-days=ACTIVITY_DATA_RETENTION_DAYS]
        [--auto-add-new-buckets=AUTO_ADD_NEW_BUCKETS]
        [--description=DESCRIPTION] [--retention-period-days=RETENTION_DAYS]
        [--enable-organization-scope
          | --source-folders=[SOURCE_FOLDER_NUMBERS,...]
          | --source-folders-file=SOURCE_FOLDER_NUMBERS_IN_FILE
          | --source-projects=[SOURCE_PROJECT_NUMBERS,...]
          | --source-projects-file=SOURCE_PROJECT_NUMBERS_IN_FILE]
        [--exclude-bucket-names=[BUCKETS_NAMES,...]
          --exclude-bucket-prefix-regexes=[BUCKETS_REGEXES,...]
          | --include-bucket-names=[BUCKETS_NAMES,...]
          --include-bucket-prefix-regexes=[BUCKETS_REGEXES,...]]
        [--exclude-source-locations=[LIST_OF_SOURCE_LOCATIONS,...]
          | --include-source-locations=[LIST_OF_SOURCE_LOCATIONS,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a dataset config for Insights.

EXAMPLES
    To update the description for a dataset config "my_config" in location
    "us-central1":

        $ gcloud storage insights dataset-configs update my_config \
          --location=us-central1 \
          --description="a user provided description"

    To update the same dataset config with fully specified name:

        $ gcloud storage insights dataset-configs update \
          projects/foo/locations/us-central1/datasetConfigs/my_config

    To update the retention period days for the dataset config "my_config" in
    location "us-central1":

        $ gcloud storage insights dataset-configs update my_config \
          --location=us-central1 --retention-period-days=20

POSITIONAL ARGUMENTS
     Dataset config resource - The Dataset config to update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument dataset_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATASET_CONFIG
          ID of the dataset-config or fully qualified identifier for the
          dataset-config.

          To set the dataset-config attribute:
          + provide the argument dataset_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Insights supported Google Cloud location for the dataset-config.

          To set the location attribute:
          + provide the argument dataset_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --activity-data-retention-period-days=ACTIVITY_DATA_RETENTION_DAYS
        Provide retention period for the activity data in the config. This
        overrides the retention period for activity data. Otherwise, the
        retention_period_days value is used for activity data as well.

     --auto-add-new-buckets=AUTO_ADD_NEW_BUCKETS
        Automatically include any new buckets created if they satisfy criteria
        defined in config settings. AUTO_ADD_NEW_BUCKETS must be one of: true,
        false.

     --description=DESCRIPTION
        Description for dataset config.

     --retention-period-days=RETENTION_DAYS
        Provide retention period for the config.

     List of source options either source projects or source folders or enable
     organization scope. Refer Dataset Configuration Properties
     (https://cloud.google.com/storage/docs/insights/datasets#dataset-config)
     for more details.

     At most one of these can be specified:

       --enable-organization-scope
          If passed, the dataset config will be enabled on the organization.

       Or at most one of these can be specified:

         List of source folder IDs or the file containing list of folder IDs.

         --source-folders=[SOURCE_FOLDER_NUMBERS,...]
            List of source folder IDs.

         --source-folders-file=SOURCE_FOLDER_NUMBERS_IN_FILE
            CSV formatted file containing source folder IDs, one per line.

       Or at most one of these can be specified:

         List of source project numbers or the file containing list of project
         numbers.

         --source-projects=[SOURCE_PROJECT_NUMBERS,...]
            List of source project numbers.

         --source-projects-file=SOURCE_PROJECT_NUMBERS_IN_FILE
            CSV formatted file containing source project numbers, one per line.

     Specify the list of buckets to be included or excluded, both a list of
     bucket names and prefix regexes can be specified for either include or
     exclude buckets.

     At most one of these can be specified:

       Specify the list of buckets to be excluded.

       --exclude-bucket-names=[BUCKETS_NAMES,...]
          List of bucket names to be excluded.

       --exclude-bucket-prefix-regexes=[BUCKETS_REGEXES,...]
          List of bucket prefix regexes to be excluded. Allowed regex patterns
          are similar to those for the --include-bucket-prefix-regexes flag.

       Specify the list of buckets to be included.

       --include-bucket-names=[BUCKETS_NAMES,...]
          List of bucket names be included.

       --include-bucket-prefix-regexes=[BUCKETS_REGEXES,...]
          List of bucket prefix regexes to be included. The dataset config will
          include all the buckets that match with the prefix regex. Examples of
          allowed prefix regex patterns can be testbucket*, testbucket.*foo,
          testb.+foo* . It should follow syntax specified in google/re2 on
          GitHub.

     Specify the list of locations for source projects to be included or
     excluded from available locations
     (https://cloud.google.com/storage/docs/locations#available-locations).

     At most one of these can be specified:

       --exclude-source-locations=[LIST_OF_SOURCE_LOCATIONS,...]
          List of locations for projects to be excluded.

       --include-source-locations=[LIST_OF_SOURCE_LOCATIONS,...]
          List of locations for projects to be included.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage insights dataset-configs update
```

### gcloud alpha storage insights dataset-configs create

```text
NAME
    gcloud alpha storage insights dataset-configs create - create a new dataset
        config for Insights

SYNOPSIS
    gcloud alpha storage insights dataset-configs create DATASET_CONFIG_NAME
        --location=LOCATION --organization=SOURCE_ORG_NUMBER
        --retention-period-days=RETENTION_DAYS
        (--enable-organization-scope
          | --source-folders=[SOURCE_FOLDER_NUMBERS,...]
          | --source-folders-file=SOURCE_FOLDER_NUMBERS_IN_FILE
          | --source-projects=[SOURCE_PROJECT_NUMBERS,...]
          | --source-projects-file=SOURCE_PROJECT_NUMBERS_IN_FILE)
        [--activity-data-retention-period-days=ACTIVITY_DATA_RETENTION_DAYS]
        [--auto-add-new-buckets] [--description=DESCRIPTION]
        [--identity=IDENTITY_TYPE; default="IDENTITY_TYPE_PER_CONFIG"]
        [--exclude-bucket-names=[BUCKETS_NAMES,...]
          --exclude-bucket-prefix-regexes=[BUCKETS_REGEXES,...]
          | --include-bucket-names=[BUCKETS_NAMES,...]
          --include-bucket-prefix-regexes=[BUCKETS_REGEXES,...]]
        [--exclude-source-locations=[LIST_OF_SOURCE_LOCATIONS,...]
          | --include-source-locations=[LIST_OF_SOURCE_LOCATIONS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage insights dataset-configs create-link

```text
NAME
    gcloud alpha storage insights dataset-configs create-link - create a link
        to a BigQuery instance

SYNOPSIS
    gcloud alpha storage insights dataset-configs create-link
        (DATASET_CONFIG : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage insights dataset-configs delete

```text
NAME
    gcloud alpha storage insights dataset-configs delete - delete dataset
        config for Insights

SYNOPSIS
    gcloud alpha storage insights dataset-configs delete
        (DATASET_CONFIG : --location=LOCATION) [--auto-delete-link] [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage insights dataset-configs delete-link

```text
NAME
    gcloud alpha storage insights dataset-configs delete-link - delete a link
        to a BigQuery instance

SYNOPSIS
    gcloud alpha storage insights dataset-configs delete-link
        (DATASET_CONFIG : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage insights dataset-configs describe

```text
NAME
    gcloud alpha storage insights dataset-configs describe - describe dataset
        config for Insights

SYNOPSIS
    gcloud alpha storage insights dataset-configs describe
        (DATASET_CONFIG : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage insights dataset-configs list

```text
NAME
    gcloud alpha storage insights dataset-configs list - list returns all the
        Insights dataset configs for given location

SYNOPSIS
    gcloud alpha storage insights dataset-configs list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage insights dataset-configs update

```text
NAME
    gcloud alpha storage insights dataset-configs update - updates a dataset
        config for Insights

SYNOPSIS
    gcloud alpha storage insights dataset-configs update
        (DATASET_CONFIG : --location=LOCATION)
        [--activity-data-retention-period-days=ACTIVITY_DATA_RETENTION_DAYS]
        [--auto-add-new-buckets=AUTO_ADD_NEW_BUCKETS]
        [--description=DESCRIPTION] [--retention-period-days=RETENTION_DAYS]
        [--enable-organization-scope
          | --source-folders=[SOURCE_FOLDER_NUMBERS,...]
          | --source-folders-file=SOURCE_FOLDER_NUMBERS_IN_FILE
          | --source-projects=[SOURCE_PROJECT_NUMBERS,...]
          | --source-projects-file=SOURCE_PROJECT_NUMBERS_IN_FILE]
        [--exclude-bucket-names=[BUCKETS_NAMES,...]
          --exclude-bucket-prefix-regexes=[BUCKETS_REGEXES,...]
          | --include-bucket-names=[BUCKETS_NAMES,...]
          --include-bucket-prefix-regexes=[BUCKETS_REGEXES,...]]
        [--exclude-source-locations=[LIST_OF_SOURCE_LOCATIONS,...]
          | --include-source-locations=[LIST_OF_SOURCE_LOCATIONS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `delete` example by full resource name starts with `$gcloud` (no space after the prompt), which a shell expands as the empty variable `gcloud`; the runnable form drops the prompt.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/insights/dataset-configs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
