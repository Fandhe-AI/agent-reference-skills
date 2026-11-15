---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/insights/inventory-reports
---

# gcloud storage insights inventory-reports

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage insights inventory-reports create

```text
NAME
    gcloud storage insights inventory-reports create - create a new inventory
        report config

SYNOPSIS
    gcloud storage insights inventory-reports create SOURCE_BUCKET_URL
        [--destination=DESTINATION_URL] [--display-name=DISPLAY_NAME]
        [--metadata-fields=[METADATA_FIELDS,...];
          default="project,bucket,name,location,size,timeCreated,timeDeleted,
          updated,storageClass,etag,retentionExpirationTime,crc32c,md5Hash,
          generation,
          metageneration,contentType,contentEncoding,timeStorageClassUpdated"]
        [--schedule-repeats=FREQUENCY; default="daily"]
        [--schedule-repeats-until=END_DATE] [--schedule-starts=START_DATE]
        [--parquet | --csv-delimiter=DELIMITER
          --[no-]csv-header --csv-separator=SEPARATOR] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an inventory report config that defines how often inventory reports
    are generated, the metadata fields you want the reports to include, and a
    bucket/prefix in which to store the reports, also known as the destination.

EXAMPLES
    To create an inventory report about "my-bucket" that will store report
    details in "report-bucket" with the prefix "save-path/".

        $ gcloud storage insights inventory-reports create gs://my-bucket \
            --destination=gs://report-bucket/save-path/

POSITIONAL ARGUMENTS
     SOURCE_BUCKET_URL
        URL of the source bucket that will contain the inventory report
        configuration.

FLAGS
     --destination=DESTINATION_URL
        Sets the URL of the destination bucket and path where generated reports
        are stored. Defaults to <SOURCE_BUCKET_URL>/inventory_reports/.

     --display-name=DISPLAY_NAME
        Sets the editable name of the report configuration.

     --metadata-fields=[METADATA_FIELDS,...]; default="project,bucket,name,location,size,timeCreated,timeDeleted,updated,storageClass,etag,retentionExpirationTime,crc32c,md5Hash,generation,metageneration,contentType,contentEncoding,timeStorageClassUpdated"
        The metadata fields to be included in the inventory report. The fields:
        "project, bucket, name" are REQUIRED. Defaults to all fields being
        included. METADATA_FIELDS must be one of: project, bucket, name,
        location, size, timeCreated, timeDeleted, updated, storageClass, etag,
        retentionExpirationTime, crc32c, md5Hash, generation, metageneration,
        contentType, contentEncoding, timeStorageClassUpdated.

     --schedule-repeats=FREQUENCY; default="daily"
        Sets how often the inventory report configuration will run. Defaults to
        DAILY. FREQUENCY must be one of: daily, weekly.

     --schedule-repeats-until=END_DATE
        Sets date after which you want to stop generating inventory reports.
        For example, 2022-03-30. Defaults to one year from --schedule-starts
        value.

     --schedule-starts=START_DATE
        Sets the date you want to start generating inventory reports. For
        example, 2022-01-30. Should be tomorrow or later based on UTC timezone.
        Defaults to tomorrow.

     Report format configuration. Any combination of CSV flags is valid as long
     as the Parquet flag is not present.

     At most one of these can be specified:

       --parquet
          Generate reports in parquet format.

       Or at least one of these can be specified:

         Flags for setting CSV format options.

         --csv-delimiter=DELIMITER
            Sets the delimiter that separates the fields in the inventory
            report CSV file. For example, ``,``

         --[no-]csv-header
            Indicates whether or not headers are included in the inventory
            report CSV file. Default is None. Use --csv-header to enable and
            --no-csv-header to disable.

         --csv-separator=SEPARATOR
            Sets the character used to separate the records in the inventory
            report CSV file. For example, ``\n``. SEPARATOR must be one of: \n,
            \r\n.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage insights inventory-reports create
```

### gcloud storage insights inventory-reports delete

```text
NAME
    gcloud storage insights inventory-reports delete - delete an inventory
        report config

SYNOPSIS
    gcloud storage insights inventory-reports delete
        (REPORT_CONFIG : --location=LOCATION) [--force] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an inventory report config.

EXAMPLES
    To delete an inventory report config with ID=1234, location=us-central1 and
    project=foo:

        $ gcloud storage insights inventory-reports delete 1234 \
            --location=us-central1 --project=foo

    To delete the same inventory report config with fully specified name:

        $ gcloud storage insights inventory-reports delete \
            /projects/foo/locations/us-central1/reportConfigs/1234

    To delete the report config with all generated report details:

        $ gcloud storage insights inventory-reports delete \
            /projects/foo/locations/us-central1/reportConfigs/1234 --force

POSITIONAL ARGUMENTS
     Report config resource - The Report config to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument report_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPORT_CONFIG
          ID of the report-config or fully qualified identifier for the
          report-config.

          To set the report-config attribute:
          + provide the argument report_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the report-config.

          To set the location attribute:
          + provide the argument report_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --force
        If set, all report details for this report config will be deleted.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage insights inventory-reports delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud storage insights inventory-reports delete projects/foo/locations/us-central1/reportConfigs/1234

gcloud storage insights inventory-reports delete projects/foo/locations/us-central1/reportConfigs/1234 \
    --force
```

### gcloud storage insights inventory-reports describe

```text
NAME
    gcloud storage insights inventory-reports describe - describe an inventory
        report config

SYNOPSIS
    gcloud storage insights inventory-reports describe
        (REPORT_CONFIG : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an inventory report config.

EXAMPLES
    To describe an inventory report config with ID=1234, location=us-central1,
    and project=foo:

        $ gcloud storage insights inventory-reports describe 1234 \
            --location=us-central1 --project=foo

    To describe the same inventory report config with fully specified name:

        $ gcloud storage insights inventory-reports describe \
            /projects/foo/locations/us-central1/reportConfigs/1234

    Describe the same inventory report config with JSON formatting, only
    returning the "displayName" field:

        $ gcloud storage insights inventory-reports describe \
            /projects/foo/locations/us-central1/reportConfigs/1234 \
            --format="json(displayName)"

POSITIONAL ARGUMENTS
     Report config resource - The Report config to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument report_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPORT_CONFIG
          ID of the report-config or fully qualified identifier for the
          report-config.

          To set the report-config attribute:
          + provide the argument report_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the report-config.

          To set the location attribute:
          + provide the argument report_config on the command line with a
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

        $ gcloud alpha storage insights inventory-reports describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud storage insights inventory-reports describe projects/foo/locations/us-central1/reportConfigs/1234

gcloud storage insights inventory-reports describe projects/foo/locations/us-central1/reportConfigs/1234 \
    --format="json(displayName)"
```

### gcloud storage insights inventory-reports details describe

```text
NAME
    gcloud storage insights inventory-reports details describe - describe
        inventory reports detail

SYNOPSIS
    gcloud storage insights inventory-reports details describe
        (REPORT_DETAIL : --location=LOCATION --report-config=REPORT_CONFIG)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe the inventory report detail.

EXAMPLES
    To describe an inventory report detail with ID=4568, location=us-central1,
    project=foo, and report config ID=1234:

        $ gcloud storage insights inventory-reports details describe 1234 \
            --location=us-central1 --project=foo --report-config=1234

    To describe the same inventory report detail with fully specified name:

        $ gcloud storage insights inventory-reports details describe \
            /projects/foo/locations/us-central1/reportConfigs/1234/\
        reportDetails/5678

    To describe the same inventory report detail with JSON formatting, only
    returning the "status" field:

        $ gcloud storage insights inventory-reports details describe \
            /projects/foo/locations/us-central1/reportConfigs/1234/\
        reportDetails/5678 --format="json(status)"

POSITIONAL ARGUMENTS
     Report detail resource - The report detail to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument report_detail on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPORT_DETAIL
          ID of the report-detail or fully qualified identifier for the
          report-detail.

          To set the report-detail attribute:
          + provide the argument report_detail on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the report-detail.

          To set the location attribute:
          + provide the argument report_detail on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --report-config=REPORT_CONFIG
          Report Config ID for the report-detail.

          To set the report-config attribute:
          + provide the argument report_detail on the command line with a
            fully specified name;
          + provide the argument --report-config on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage insights inventory-reports details describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud storage insights inventory-reports details describe projects/foo/locations/us-central1/reportConfigs/1234/reportDetails/5678

gcloud storage insights inventory-reports details describe projects/foo/locations/us-central1/reportConfigs/1234/reportDetails/5678 \
    --format="json(status)"
```

### gcloud storage insights inventory-reports details list

```text
NAME
    gcloud storage insights inventory-reports details list - list inventory
        report details

SYNOPSIS
    gcloud storage insights inventory-reports details list
        (REPORT_CONFIG : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all inventory report details generated by a given inventory report
    config.

EXAMPLES
    To list all inventory report details for report config ID=1234,
    location=us-central1, and project=foo:

        $ gcloud storage insights inventory-reports details list 1234 \
            --location=us-central1 --project=foo

    To list all the same inventory report details with fully specified name of
    the report config:

        $ gcloud storage insights inventory-reports details list \
            /projects/foo/locations/us-central1/reportConfigs/1234

    To list all inventory reports, only returning the "status" key:

        $ gcloud storage insights inventory-reports details list \
            projects/a/locations/b/reportConfigs/some-id \
            --format="json(status)"

POSITIONAL ARGUMENTS
     Report config resource - The Report config for which the report details
     should be listed. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument report_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPORT_CONFIG
          ID of the report-config or fully qualified identifier for the
          report-config.

          To set the report-config attribute:
          + provide the argument report_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the report-config.

          To set the location attribute:
          + provide the argument report_config on the command line with a
            fully specified name;
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

        $ gcloud alpha storage insights inventory-reports details list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud storage insights inventory-reports details list projects/foo/locations/us-central1/reportConfigs/1234
```

### gcloud storage insights inventory-reports list

```text
NAME
    gcloud storage insights inventory-reports list - lists all inventory report
        configs

SYNOPSIS
    gcloud storage insights inventory-reports list [--location=LOCATION]
        [--source=SOURCE_BUCKET_URL] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Cloud Storage inventory report configs.

EXAMPLES
    List all inventory report configs in the source bucket "my-bucket":

        $ gcloud storage insights inventory-reports list \
            --source=gs://my-bucket

    List buckets with JSON formatting, only returning the "displayName" field:

        $ gcloud storage insights inventory-reports list \
            --source=gs://my-bucket --format="json(displayName)"

FLAGS
     --location=LOCATION
        The location of the report configs.

     --source=SOURCE_BUCKET_URL
        Specifies URL of the source bucket that contains the inventory report
        configuration.

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

        $ gcloud alpha storage insights inventory-reports list
```

### gcloud storage insights inventory-reports update

```text
NAME
    gcloud storage insights inventory-reports update - update an inventory
        report config

SYNOPSIS
    gcloud storage insights inventory-reports update
        (REPORT_CONFIG : --location=LOCATION) [--destination=DESTINATION_URL]
        [--display-name=DISPLAY_NAME] [--schedule-repeats=FREQUENCY]
        [--schedule-repeats-until=END_DATE] [--schedule-starts=START_DATE]
        [--metadata-fields=[METADATA_FIELDS,...]
          | --add-metadata-fields=[METADATA_FIELDS,...]
          --remove-metadata-fields=[METADATA_FIELDS,...]]
        [--parquet | --csv-delimiter=DELIMITER
          --[no-]csv-header --csv-separator=SEPARATOR] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an inventory report config.

EXAMPLES
    To update the display-name of an inventory report config with ID=1234,
    location=us-central1, and project=foo:

        $ gcloud storage insights inventory-reports update 1234 \
            --location=us-central1 --project=foo --display-name=bar

    To update the same inventory report config with fully specified name:

        $ gcloud storage insights inventory-reports update \
            /projects/foo/locations/us-central1/reportConfigs/1234 \
            --display-name=bar

POSITIONAL ARGUMENTS
     Report config resource - The Report config to update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument report_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPORT_CONFIG
          ID of the report-config or fully qualified identifier for the
          report-config.

          To set the report-config attribute:
          + provide the argument report_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the report-config.

          To set the location attribute:
          + provide the argument report_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --destination=DESTINATION_URL
        Sets the URL of the destination bucket and path where generated reports
        are stored.

     --display-name=DISPLAY_NAME
        Sets the editable name of the report configuration.

     --schedule-repeats=FREQUENCY
        Sets how often the inventory report configuration will run. FREQUENCY
        must be one of: daily, weekly.

     --schedule-repeats-until=END_DATE
        Sets date after which you want to stop generating inventory reports.
        For example, 2022-03-30.

     --schedule-starts=START_DATE
        Sets the date you want to start generating inventory reports. For
        example, 2022-01-30. Should be tomorrow or later based on UTC timezone.

     At most one of these can be specified:

       --metadata-fields=[METADATA_FIELDS,...]
          The metadata fields to be included in the inventory report. The
          fields: "project, bucket, name" are REQUIRED. METADATA_FIELDS must be
          one of: project, bucket, name, location, size, timeCreated,
          timeDeleted, updated, storageClass, etag, retentionExpirationTime,
          crc32c, md5Hash, generation, metageneration, contentType,
          contentEncoding, timeStorageClassUpdated.

       Or at least one of these can be specified:

         Add and Remove flags for metadata fields

         --add-metadata-fields=[METADATA_FIELDS,...]
            Adds fields to the metadata_fields list. METADATA_FIELDS must be
            one of: location, size, timeCreated, timeDeleted, updated,
            storageClass, etag, retentionExpirationTime, crc32c, md5Hash,
            generation, metageneration, contentType, contentEncoding,
            timeStorageClassUpdated.

         --remove-metadata-fields=[METADATA_FIELDS,...]
            Removes fields from the metadata_fields list. METADATA_FIELDS must
            be one of: location, size, timeCreated, timeDeleted, updated,
            storageClass, etag, retentionExpirationTime, crc32c, md5Hash,
            generation, metageneration, contentType, contentEncoding,
            timeStorageClassUpdated.

     Report format configuration. Any combination of CSV flags is valid as long
     as the Parquet flag is not present.

     At most one of these can be specified:

       --parquet
          Generate reports in parquet format.

       Or at least one of these can be specified:

         Flags for setting CSV format options.

         --csv-delimiter=DELIMITER
            Sets the delimiter that separates the fields in the inventory
            report CSV file. For example, ``,``

         --[no-]csv-header
            Indicates whether or not headers are included in the inventory
            report CSV file. Default is None. Use --csv-header to enable and
            --no-csv-header to disable.

         --csv-separator=SEPARATOR
            Sets the character used to separate the records in the inventory
            report CSV file. For example, ``\n``. SEPARATOR must be one of: \n,
            \r\n.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage insights inventory-reports update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud storage insights inventory-reports update projects/foo/locations/us-central1/reportConfigs/1234 \
    --display-name=bar
```

### gcloud alpha storage insights inventory-reports create

```text
NAME
    gcloud alpha storage insights inventory-reports create - create a new
        inventory report config

SYNOPSIS
    gcloud alpha storage insights inventory-reports create SOURCE_BUCKET_URL
        [--destination=DESTINATION_URL] [--display-name=DISPLAY_NAME]
        [--metadata-fields=[METADATA_FIELDS,...];
          default="project,bucket,name,location,size,timeCreated,timeDeleted,
          updated,storageClass,etag,retentionExpirationTime,crc32c,md5Hash,
          generation,
          metageneration,contentType,contentEncoding,timeStorageClassUpdated"]
        [--schedule-repeats=FREQUENCY; default="daily"]
        [--schedule-repeats-until=END_DATE] [--schedule-starts=START_DATE]
        [--parquet | --csv-delimiter=DELIMITER
          --[no-]csv-header --csv-separator=SEPARATOR] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage insights inventory-reports delete

```text
NAME
    gcloud alpha storage insights inventory-reports delete - delete an
        inventory report config

SYNOPSIS
    gcloud alpha storage insights inventory-reports delete
        (REPORT_CONFIG : --location=LOCATION) [--force] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage insights inventory-reports describe

```text
NAME
    gcloud alpha storage insights inventory-reports describe - describe an
        inventory report config

SYNOPSIS
    gcloud alpha storage insights inventory-reports describe
        (REPORT_CONFIG : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage insights inventory-reports details describe

```text
NAME
    gcloud alpha storage insights inventory-reports details describe - describe
        inventory reports detail

SYNOPSIS
    gcloud alpha storage insights inventory-reports details describe
        (REPORT_DETAIL : --location=LOCATION --report-config=REPORT_CONFIG)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage insights inventory-reports details list

```text
NAME
    gcloud alpha storage insights inventory-reports details list - list
        inventory report details

SYNOPSIS
    gcloud alpha storage insights inventory-reports details list
        (REPORT_CONFIG : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage insights inventory-reports list

```text
NAME
    gcloud alpha storage insights inventory-reports list - lists all inventory
        report configs

SYNOPSIS
    gcloud alpha storage insights inventory-reports list [--location=LOCATION]
        [--source=SOURCE_BUCKET_URL] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage insights inventory-reports update

```text
NAME
    gcloud alpha storage insights inventory-reports update - update an
        inventory report config

SYNOPSIS
    gcloud alpha storage insights inventory-reports update
        (REPORT_CONFIG : --location=LOCATION) [--destination=DESTINATION_URL]
        [--display-name=DISPLAY_NAME] [--schedule-repeats=FREQUENCY]
        [--schedule-repeats-until=END_DATE] [--schedule-starts=START_DATE]
        [--metadata-fields=[METADATA_FIELDS,...]
          | --add-metadata-fields=[METADATA_FIELDS,...]
          --remove-metadata-fields=[METADATA_FIELDS,...]]
        [--parquet | --csv-delimiter=DELIMITER
          --[no-]csv-header --csv-separator=SEPARATOR] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples that pass a fully specified name write it with a leading slash (`/projects/foo/...`); a fully specified name starts with `projects/`, and gcloud 593.0.0 rejects the slashed form in `delete`, `describe` and `details` with "Error parsing [report_config]" / "Error parsing [report_detail]", so the runnable forms drop the leading slash.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/insights/inventory-reports (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
