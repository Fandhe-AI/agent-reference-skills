---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/datascans/update
---

# gcloud dataplex datascans update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex datascans update data-discovery

```text
NAME
    gcloud dataplex datascans update data-discovery - update a Dataplex data
        discovery scan job

SYNOPSIS
    gcloud dataplex datascans update data-discovery
        (DATASCAN : --location=LOCATION) [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [--labels=[KEY=VALUE,...]]
        [--async | --validate-only]
        [--bigquery-publishing-connection=BIGQUERY_PUBLISHING_CONNECTION
          --bigquery-publishing-dataset-location=BIGQUERY_PUBLISHING_DATASET_LOCATION --bigquery-publishing-dataset-project=BIGQUERY_PUBLISHING_DATASET_PROJECT --bigquery-publishing-table-type=BIGQUERY_PUBLISHING_TABLE_TYPE --storage-exclude-patterns=[PATTERN,
          ...] --storage-include-patterns=[PATTERN,...]
          --csv-delimiter=CSV_DELIMITER
          --csv-disable-type-inference=CSV_DISABLE_TYPE_INFERENCE
          --csv-encoding=CSV_ENCODING
          --csv-header-row-count=CSV_HEADER_ROW_COUNT
          --csv-quote-character=CSV_QUOTE_CHARACTER
          --json-disable-type-inference=JSON_DISABLE_TYPE_INFERENCE
          --json-encoding=JSON_ENCODING]
        [--on-demand=ON_DEMAND | --schedule=SCHEDULE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Allows users to auto discover BigQuery External and BigLake tables from
    underlying Cloud Storage buckets.

EXAMPLES
    To update description of a data discovery scan data-discovery-datascan in
    project test-project located in us-central1, run:

        $ gcloud dataplex datascans update data-discovery \
            data-discovery-datascan --project=test-project \
            --location=us-central1 --description="Description is updated."

POSITIONAL ARGUMENTS
     Datascan resource - Arguments and flags that define the Dataplex datascan
     you want to update a data discovery scan for. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument datascan on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATASCAN
          ID of the datascan or fully qualified identifier for the datascan.

          To set the dataScans attribute:
          + provide the argument datascan on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument datascan on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --description=DESCRIPTION
        Description of the data discovery scan

     --display-name=DISPLAY_NAME
        Display name of the data discovery scan

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of --async | --validate-only can be specified.

     At most one of these can be specified:

       --async
          Return immediately, without waiting for the operation in progress to
          complete.

       --validate-only
          Validate the update action, but don't actually perform it.

     Data spec for the data discovery scan.

     BigQuery publishing config arguments for the data discovery scan.

     --bigquery-publishing-connection=BIGQUERY_PUBLISHING_CONNECTION
        BigQuery connection to use for auto discovering cloud resource bucket
        to BigLake tables. Connection is required for BIGLAKE`BigQuery
        publishing table type.

     --bigquery-publishing-dataset-location=BIGQUERY_PUBLISHING_DATASET_LOCATION
        The location of the BigQuery dataset to publish BigLake external or
        non-BigLake external tables to. If not specified, the dataset location
        will be set to the location of the data source resource. Refer to
        https://cloud.google.com/bigquery/docs/locations#supportedLocations for
        supported locations.

     --bigquery-publishing-dataset-project=BIGQUERY_PUBLISHING_DATASET_PROJECT
        The project of the BigQuery dataset to publish BigLake external or
        non-BigLake external tables to. If not specified, the cloud resource
        bucket project will be used to create the dataset. The format is
        "projects/{project_id_or_number}.

     --bigquery-publishing-table-type=BIGQUERY_PUBLISHING_TABLE_TYPE
        BigQuery table type to discover the cloud resource bucket. Can be
        either EXTERNAL or BIGLAKE. If not specified, the table type will be
        set to EXTERNAL.

     Storage config arguments for the data discovery scan.

     --storage-exclude-patterns=[PATTERN,...]
        List of patterns that identify the data to exclude during discovery.
        These patterns are interpreted as glob patterns used to match object
        names in the Cloud Storage bucket. Exclude patterns will be applied
        before include patterns.

     --storage-include-patterns=[PATTERN,...]
        List of patterns that identify the data to include during discovery
        when only a subset of the data should be considered. These patterns are
        interpreted as glob patterns used to match object names in the Cloud
        Storage bucket.

     CSV options arguments for the data discovery scan.

     --csv-delimiter=CSV_DELIMITER
        Delimiter used to separate values in the CSV file. If not specified,
        the delimiter will be set to comma (",").

     --csv-disable-type-inference=CSV_DISABLE_TYPE_INFERENCE
        Whether to disable the inference of data types for CSV data. If true,
        all columns are registered as strings.

     --csv-encoding=CSV_ENCODING
        Character encoding of the CSV file. If not specified, the encoding will
        be set to UTF-8.

     --csv-header-row-count=CSV_HEADER_ROW_COUNT
        The number of rows to interpret as header rows that should be skipped
        when reading data rows. The default value is 1.

     --csv-quote-character=CSV_QUOTE_CHARACTER
        The character used to quote column values. Accepts " (double quotation
        mark) or ' (single quotation mark). If unspecified, defaults to "
        (double quotation mark).

     JSON options arguments for the data discovery scan.

     --json-disable-type-inference=JSON_DISABLE_TYPE_INFERENCE
        Whether to disable the inference of data types for JSON data. If true,
        all columns are registered as strings.

     --json-encoding=JSON_ENCODING
        Character encoding of the JSON file. If not specified, the encoding
        will be set to UTF-8.

     Data discovery scan execution settings.

     Data discovery scan scheduling and trigger settings

     At most one of these can be specified:

       --on-demand=ON_DEMAND
          If set, the scan runs one-time shortly after data discovery scan
          updation.

       --schedule=SCHEDULE
          Cron schedule (https://en.wikipedia.org/wiki/Cron) for running scans
          periodically. To explicitly set a timezone to the cron tab, apply a
          prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or
          "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid
          string from IANA time zone database. For example,
          CRON_TZ=America/New_York 1 * * * * or TZ=America/New_York 1 * * * *.
          This field is required for RECURRING scans.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex datascans update data-discovery
```

### gcloud dataplex datascans update data-documentation

```text
NAME
    gcloud dataplex datascans update data-documentation - update a Dataplex
        data documentation scan job

SYNOPSIS
    gcloud dataplex datascans update data-documentation
        (DATASCAN : --location=LOCATION) [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [--labels=[KEY=VALUE,...]]
        [--async | --validate-only]
        [--enable-catalog-publishing
          --sql-dialect=SQL_DIALECT --clear-custom-instructions
          | --custom-instructions=CUSTOM_INSTRUCTIONS]
        [--on-demand=ON_DEMAND | --schedule=SCHEDULE
          | --one-time --ttl-after-scan-completion=TTL_AFTER_SCAN_COMPLETION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Dataplex data documentation scan job.

EXAMPLES
    To update a data documentation scan data-documentation-datascan in project
    test-project located in us-central1 with a new description, run:

        $ gcloud dataplex datascans update data-documentation \
            data-documentation-datascan --project=test-project \
            --location=us-central1 --description="new description"

POSITIONAL ARGUMENTS
     Datascan resource - Arguments and flags that define the Dataplex datascan
     you want to update a data documentation scan for. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument datascan on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATASCAN
          ID of the datascan or fully qualified identifier for the datascan.

          To set the dataScans attribute:
          + provide the argument datascan on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument datascan on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --description=DESCRIPTION
        Description of the data documentation scan.

     --display-name=DISPLAY_NAME
        Display name of the data documentation scan.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of --async | --validate-only can be specified.

     At most one of these can be specified:

       --async
          Return immediately, without waiting for the operation in progress to
          complete.

       --validate-only
          Validate the update action, but don't actually perform it.

     Data documentation scan settings.

     --enable-catalog-publishing
        Publish data documentation results to Knowledge Catalog.

     --sql-dialect=SQL_DIALECT
        SQL dialect to use in the generated SQL queries. SQL_DIALECT must be
        one of: GOOGLE_SQL, SPARK_SQL.

     Custom instructions for generating data documentation.

     At most one of these can be specified:

       --clear-custom-instructions
          Clear any existing custom instructions from the data documentation
          scan.

       --custom-instructions=CUSTOM_INSTRUCTIONS
          Custom instructions to guide the data documentation generation.

     Data documentation scan execution settings.

     Data documentation scan trigger settings.

     At most one of these can be specified:

       --on-demand=ON_DEMAND
          If set, the scan runs one-time shortly after data documentation scan
          creation.

       --schedule=SCHEDULE
          Cron schedule (https://en.wikipedia.org/wiki/Cron) for running scans
          periodically. To explicitly set a timezone to the cron tab, apply a
          prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or
          "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid
          string from IANA time zone database. For example,
          CRON_TZ=America/New_York 1 * * * * or TZ=America/New_York 1 * * * *.
          This field is required for RECURRING scans.

       Or at least one of these can be specified:

         Data documentation scan one-time trigger settings.

         --one-time
            If set, the data documentation scan runs once, and auto deleted
            once the ttl_after_scan_completion expires.

         --ttl-after-scan-completion=TTL_AFTER_SCAN_COMPLETION
            The time to live for one-time scans. Default value is 24 hours,
            minimum value is 0 seconds, and maximum value is 365 days. The time
            is calculated from the data scan job completion time. If value is
            set as 0 seconds, the scan will be immediately deleted upon job
            completion, regardless of whether the job succeeded or failed. The
            value should be a number followed by a unit suffix "s". Example:
            "100s" for 100 seconds. The argument is only valid when --one-time
            is set.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex datascans update data-documentation
```

### gcloud dataplex datascans update data-profile

```text
NAME
    gcloud dataplex datascans update data-profile - update a Dataplex data
        profile scan job

SYNOPSIS
    gcloud dataplex datascans update data-profile
        (DATASCAN : --location=LOCATION) [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [--labels=[KEY=VALUE,...]]
        [--async | --validate-only]
        [--data-profile-spec-file=DATA_PROFILE_SPEC_FILE
          | --enable-catalog-publishing
          --exclude-field-names=EXCLUDE_FIELD_NAMES
          --include-field-names=INCLUDE_FIELD_NAMES --mode=MODE
          --row-filter=ROW_FILTER --sampling-percent=SAMPLING_PERCENT]
        [--on-demand=ON_DEMAND | --schedule=SCHEDULE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Represents a user-visible job which provides the insights for the related
    data source about the structure, content and relationships (such as null
    percent, cardinality, min/max/mean, etc).

EXAMPLES
    To update description of a data profile scan data-profile-datascan in
    project test-project located in us-central1, run:

        $ gcloud dataplex datascans update data-profile \
            data-profile-datascan --project=test-project \
            --location=us-central1 --description="Description is updated."

POSITIONAL ARGUMENTS
     Datascan resource - Arguments and flags that define the Dataplex datascan
     you want to update a data profile scan for. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument datascan on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATASCAN
          ID of the datascan or fully qualified identifier for the datascan.

          To set the dataScans attribute:
          + provide the argument datascan on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument datascan on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --description=DESCRIPTION
        Description of the data profile scan

     --display-name=DISPLAY_NAME
        Display name of the data profile scan

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of --async | --validate-only can be specified.

     At most one of these can be specified:

       --async
          Return immediately, without waiting for the operation in progress to
          complete.

       --validate-only
          Validate the update action, but don't actually perform it.

     Data spec for the data profile scan.

     At most one of these can be specified:

       --data-profile-spec-file=DATA_PROFILE_SPEC_FILE
          path to the JSON/YAML file containing the spec for the data profile
          scan. The JSON representation reference:
          https://cloud.google.com/dataplex/docs/reference/rest/v1/DataProfileSpec

       Or at least one of these can be specified:

         Command line spec arguments for the data profile scan.

         --enable-catalog-publishing
            Publish data profile results to Dataplex catalog.

         --exclude-field-names=EXCLUDE_FIELD_NAMES
            Names of the fields to exclude from data profile. If specified, the
            respective fields will be excluded from data profile, regardless of
            the fields specified in the --include-field-names flag.

         --include-field-names=INCLUDE_FIELD_NAMES
            Names of the fields to include in data profile. If not specified,
            all fields at the time of profile scan job execution are included.
            The fields listed in the --exclude-field-names flag are excluded.

         --mode=MODE
            The execution mode for the profile scan. MODE must be one of:

             LIGHTWEIGHT
                Get quick insights with a low-latency, low-fidelity scan.
             STANDARD
                Profile your data with customizable scan settings.

         --row-filter=ROW_FILTER
            A filter applied to all rows in a single data profile scan job.

         --sampling-percent=SAMPLING_PERCENT
            The percentage of the records to be selected from the dataset for
            data profile scan.

     Data profile scan execution settings.

     Data profile scan scheduling and trigger settings

     At most one of these can be specified:

       --on-demand=ON_DEMAND
          If set, the scan runs one-time shortly after data profile scan
          updation.

       --schedule=SCHEDULE
          Cron schedule (https://en.wikipedia.org/wiki/Cron) for running scans
          periodically. To explicitly set a timezone to the cron tab, apply a
          prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or
          "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid
          string from IANA time zone database. For example,
          CRON_TZ=America/New_York 1 * * * * or TZ=America/New_York 1 * * * *.
          This field is required for RECURRING scans.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex datascans update data-profile
```

### gcloud dataplex datascans update data-quality

```text
NAME
    gcloud dataplex datascans update data-quality - update a Dataplex data
        quality scan job

SYNOPSIS
    gcloud dataplex datascans update data-quality
        (DATASCAN : --location=LOCATION)
        [--data-quality-spec-file=DATA_QUALITY_SPEC_FILE]
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [--async | --validate-only]
        [--on-demand=ON_DEMAND | --schedule=SCHEDULE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Represents a user-visible job which provides the insights for the related
    data source and generates queries based on the rules and runs against the
    data to get data quality check results.

EXAMPLES
    To update description of a data quality scan data-quality-datascan in
    project test-project located in us-central1, run:

        $ gcloud dataplex datascans update data-quality \
            data-quality-datascan --project=test-project \
            --location=us-central1 --description="Description is updated."

POSITIONAL ARGUMENTS
     Datascan resource - Arguments and flags that define the Dataplex datascan
     you want to update a data quality scan for. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument datascan on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATASCAN
          ID of the datascan or fully qualified identifier for the datascan.

          To set the dataScans attribute:
          + provide the argument datascan on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument datascan on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --data-quality-spec-file=DATA_QUALITY_SPEC_FILE
        Path to the JSON/YAML file containing the spec for the data quality
        scan. The JSON representation reference:
        https://cloud.google.com/dataplex/docs/reference/rest/v1/DataQualitySpec
        The YAML representation reference:
        https://cloud.google.com/dataplex/docs/use-auto-data-quality#create-scan-using-gcloud

     --description=DESCRIPTION
        Description of the data quality scan

     --display-name=DISPLAY_NAME
        Display name of the data quality scan

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of --async | --validate-only can be specified.

     At most one of these can be specified:

       --async
          Return immediately, without waiting for the operation in progress to
          complete.

       --validate-only
          Validate the update action, but don't actually perform it.

     Data quality scan execution settings.

     Data quality scan scheduling and trigger settings

     At most one of these can be specified:

       --on-demand=ON_DEMAND
          If set, the scan runs one-time shortly after data quality scan
          updation.

       --schedule=SCHEDULE
          Cron schedule (https://en.wikipedia.org/wiki/Cron) for running scans
          periodically. To explicitly set a timezone to the cron tab, apply a
          prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or
          "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid
          string from IANA time zone database. For example,
          CRON_TZ=America/New_York 1 * * * * or TZ=America/New_York 1 * * * *.
          This field is required for RECURRING scans.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex datascans update data-quality
```

### gcloud alpha dataplex datascans update data-discovery

```text
NAME
    gcloud alpha dataplex datascans update data-discovery - update a Dataplex
        data discovery scan job

SYNOPSIS
    gcloud alpha dataplex datascans update data-discovery
        (DATASCAN : --location=LOCATION) [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [--labels=[KEY=VALUE,...]]
        [--async | --validate-only]
        [--bigquery-publishing-connection=BIGQUERY_PUBLISHING_CONNECTION
          --bigquery-publishing-dataset-location=BIGQUERY_PUBLISHING_DATASET_LOCATION --bigquery-publishing-dataset-project=BIGQUERY_PUBLISHING_DATASET_PROJECT --bigquery-publishing-table-type=BIGQUERY_PUBLISHING_TABLE_TYPE --storage-exclude-patterns=[PATTERN,
          ...] --storage-include-patterns=[PATTERN,...]
          --csv-delimiter=CSV_DELIMITER
          --csv-disable-type-inference=CSV_DISABLE_TYPE_INFERENCE
          --csv-encoding=CSV_ENCODING
          --csv-header-row-count=CSV_HEADER_ROW_COUNT
          --csv-quote-character=CSV_QUOTE_CHARACTER
          --json-disable-type-inference=JSON_DISABLE_TYPE_INFERENCE
          --json-encoding=JSON_ENCODING]
        [--on-demand=ON_DEMAND | --schedule=SCHEDULE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex datascans update data-documentation

```text
NAME
    gcloud alpha dataplex datascans update data-documentation - update a
        Dataplex data documentation scan job

SYNOPSIS
    gcloud alpha dataplex datascans update data-documentation
        (DATASCAN : --location=LOCATION) [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [--labels=[KEY=VALUE,...]]
        [--async | --validate-only]
        [--enable-catalog-publishing
          --sql-dialect=SQL_DIALECT --clear-custom-instructions
          | --custom-instructions=CUSTOM_INSTRUCTIONS]
        [--on-demand=ON_DEMAND | --schedule=SCHEDULE
          | --one-time --ttl-after-scan-completion=TTL_AFTER_SCAN_COMPLETION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex datascans update data-profile

```text
NAME
    gcloud alpha dataplex datascans update data-profile - update a Dataplex
        data profile scan job

SYNOPSIS
    gcloud alpha dataplex datascans update data-profile
        (DATASCAN : --location=LOCATION) [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [--labels=[KEY=VALUE,...]]
        [--async | --validate-only]
        [--data-profile-spec-file=DATA_PROFILE_SPEC_FILE
          | --enable-catalog-publishing
          --exclude-field-names=EXCLUDE_FIELD_NAMES
          --include-field-names=INCLUDE_FIELD_NAMES --mode=MODE
          --row-filter=ROW_FILTER --sampling-percent=SAMPLING_PERCENT]
        [--on-demand=ON_DEMAND | --schedule=SCHEDULE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex datascans update data-quality

```text
NAME
    gcloud alpha dataplex datascans update data-quality - update a Dataplex
        data quality scan job

SYNOPSIS
    gcloud alpha dataplex datascans update data-quality
        (DATASCAN : --location=LOCATION)
        [--data-quality-spec-file=DATA_QUALITY_SPEC_FILE]
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [--async | --validate-only]
        [--on-demand=ON_DEMAND | --schedule=SCHEDULE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/datascans/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
