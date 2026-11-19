---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/zones
---

# gcloud dataplex zones

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex zones actions list

```text
NAME
    gcloud dataplex zones actions list - list Dataplex zone actions

SYNOPSIS
    gcloud dataplex zones actions list
        (--zone=ZONE : --lake=LAKE --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Dataplex Actions under a specific zone.

EXAMPLES
    To list all actions of a Dataplex zone test-zone defined in project
    test-project in location us-central1 with lake test-lake, run:

        $ gcloud dataplex zones actions list --project=test-project \
            --location=us-central1 --lake=test-lake --zone=test-zone

REQUIRED FLAGS
     Zone resource - Arguments and flags that define the Dataplex zone Actions
     you want to list. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --zone on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --zone=ZONE
          ID of the zone or fully qualified identifier for the zone.

          To set the zone attribute:
          + provide the argument --zone on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --lake=LAKE
          Identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument --zone on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument --zone on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex zones actions list
```

### gcloud dataplex zones add-iam-policy-binding

```text
NAME
    gcloud dataplex zones add-iam-policy-binding - add IAM policy binding to a
        Dataplex zone resource

SYNOPSIS
    gcloud dataplex zones add-iam-policy-binding
        (ZONE : --lake=LAKE --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add IAM policy binding to a Dataplex zone resource.

EXAMPLES
    To add an IAM policy binding for the role of roles/dataplex.viewer for the
    user test-user@gmail.com to zone test-zone within lake test-lake in
    location us-central, run:

        $ gcloud dataplex zones add-iam-policy-binding test-zone \
            --location=us-central1 --lake=test-lake \
            --role=roles/dataplex.viewer --member=user:foo@gmail.com

    See https://cloud.google.com/dataplex/docs/iam-roles for details of policy
    role and member types.

POSITIONAL ARGUMENTS
     Zones resource - Arguments and flags that define the Dataplex zone you
     want to add IAM policy binding to. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONE
          ID of the zones or fully qualified identifier for the zones.

          To set the zone attribute:
          + provide the argument zone on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --lake=LAKE
          The identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex zones add-iam-policy-binding
```

### gcloud dataplex zones create

```text
NAME
    gcloud dataplex zones create - create a zone

SYNOPSIS
    gcloud dataplex zones create (ZONE : --lake=LAKE --location=LOCATION)
        --resource-location-type=RESOURCE_LOCATION_TYPE --type=TYPE [--async]
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [--validate-only]
        [--[no-]discovery-enabled
          --discovery-exclude-patterns=[EXCLUDE_PATTERNS,...]
          --discovery-include-patterns=[INCLUDE_PATTERNS,...]
          --discovery-schedule=DISCOVERY_SCHEDULE --csv-delimiter=CSV_DELIMITER
          --[no-]csv-disable-type-inference --csv-encoding=CSV_ENCODING
          --csv-header-rows=CSV_HEADER_ROWS
          --[no-]json-disable-type-inference --json-encoding=JSON_ENCODING]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    A zone represents a logical group of related assets within a lake. A zone
    can be used to map to organizational structure or represent stages of data
    readiness from raw to curated. It provides managing behavior that is shared
    or inherited by all contained assets.

    The Zone ID is used to generate names such as database and dataset names
    when publishing metadata to Hive Metastore and BigQuery.
      o Must contain only lowercase letters, numbers, and hyphens.
      o Must start with a letter.
      o Must end with a number or a letter.
      o Must be between 1-63 characters.
      o Must be unique across all lakes from all locations in a project.

EXAMPLES
    To create a Dataplex zone with name test-zone within lake test-lake in
    location us-central1 with type RAW, and resource location type
    SINGLE_REGION, run:

        $ gcloud dataplex zones create test-zone --location=us-central \
            --lake=test-lake --resource-location-type=SINGLE_REGION \
            --type=RAW

    To create a Dataplex zone with name test-zone within lake test-lake in
    location us-central1 with type RAW,resource location type SINGLE_REGION
    with discovery-enabled and discovery schedule 0 * * * *, run:

        $ gcloud dataplex zones create test-zone --location=us-central \
            --lake=test-lake --resource-location-type=SINGLE_REGION \
            --type=RAW --discovery-enabled --discovery-schedule="0 * * * *"

POSITIONAL ARGUMENTS
     Zones resource - Arguments and flags that define the Dataplex zone you
     want to create. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONE
          ID of the zones or fully qualified identifier for the zones.

          To set the zone attribute:
          + provide the argument zone on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --lake=LAKE
          The identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

REQUIRED FLAGS
     Settings for resources attached as assets within a zone.

     This must be specified.

       --resource-location-type=RESOURCE_LOCATION_TYPE
          Location type of the resources attached to a zone.
          RESOURCE_LOCATION_TYPE must be one of:

           MULTI_REGION
              Resources that are associated with a multi-region location.
           SINGLE_REGION
              Resources that are associated with a single region.

     --type=TYPE
        Type. TYPE must be one of:

         CURATED
            A zone that contains data that is considered to be ready for
            broader consumption and analytics workloads. Curated structured
            data stored in Cloud Storage must conform to certain file formats
            (Parquet, Avro, and Orc) and organized in a hive-compatible
            directory layout.
         RAW
            A zone that contains data that needs further processing before it
            is considered generally ready for consumption and analytics
            workloads.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the zone.

     --display-name=DISPLAY_NAME
        Display name of the zone.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --validate-only
        Validate the create action, but don't actually perform it.

     Settings to manage the metadata discovery and publishing.

     --[no-]discovery-enabled
        Whether discovery is enabled. Use --discovery-enabled to enable and
        --no-discovery-enabled to disable.

     --discovery-exclude-patterns=[EXCLUDE_PATTERNS,...]
        The list of patterns to apply for selecting data to exclude during
        discovery. For Cloud Storage bucket assets, these are interpreted as
        glob patterns used to match object names. For BigQuery dataset assets,
        these are interpreted as patterns to match table names.

     --discovery-include-patterns=[INCLUDE_PATTERNS,...]
        The list of patterns to apply for selecting data to include during
        discovery if only a subset of the data should considered. For Cloud
        Storage bucket assets, these are interpreted as glob patterns used to
        match object names. For BigQuery dataset assets, these are interpreted
        as patterns to match table names.

     Determines when discovery jobs are triggered.

     --discovery-schedule=DISCOVERY_SCHEDULE
        Cron schedule (https://en.wikipedia.org/wiki/Cron) for running
        discovery jobs periodically. Discovery jobs must be scheduled at least
        30 minutes apart.

     Describe data formats.

     Describe CSV and similar semi-structured data formats.

     --csv-delimiter=CSV_DELIMITER
        The delimiter being used to separate values. This defaults to ','.

     --[no-]csv-disable-type-inference
        Whether to disable the inference of data type for CSV data. If true,
        all columns will be registered as strings. Use
        --csv-disable-type-inference to enable and
        --no-csv-disable-type-inference to disable.

     --csv-encoding=CSV_ENCODING
        The character encoding of the data. The default is UTF-8.

     --csv-header-rows=CSV_HEADER_ROWS
        The number of rows to interpret as header rows that should be skipped
        when reading data rows.

     Describe JSON data format.

     --[no-]json-disable-type-inference
        Whether to disable the inference of data type for Json data. If true,
        all columns will be registered as their primitive types (strings,
        number or boolean). Use --json-disable-type-inference to enable and
        --no-json-disable-type-inference to disable.

     --json-encoding=JSON_ENCODING
        The character encoding of the data. The default is UTF-8.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex zones create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud dataplex zones create test-zone \
    --location=us-central1 \
    --lake=test-lake \
    --resource-location-type=SINGLE_REGION \
    --type=RAW

gcloud dataplex zones create test-zone \
    --location=us-central1 \
    --lake=test-lake \
    --resource-location-type=SINGLE_REGION \
    --type=RAW \
    --discovery-enabled \
    --discovery-schedule="0 * * * *"
```

### gcloud dataplex zones delete

```text
NAME
    gcloud dataplex zones delete - delete a Dataplex zone resource

SYNOPSIS
    gcloud dataplex zones delete (ZONE : --lake=LAKE --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Dataplex zone resource.

EXAMPLES
    To delete a Dataplex zone test-zone within lake test-lake in location
    us-central1, run:

        $ gcloud dataplex zones delete test-lake --location=us-central1 \
          --lake=test-lake

POSITIONAL ARGUMENTS
     Zone resource - Arguments and flags that define the Dataplex zone you want
     to delete. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONE
          ID of the zone or fully qualified identifier for the zone.

          To set the zone attribute:
          + provide the argument zone on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --lake=LAKE
          Identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex zones delete
```

### gcloud dataplex zones describe

```text
NAME
    gcloud dataplex zones describe - describe a Dataplex zone resource

SYNOPSIS
    gcloud dataplex zones describe (ZONE : --lake=LAKE --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays all details of a Dataplex zone resource given a valid zone ID.

EXAMPLES
    To describe a Dataplex zone test-zone within lake test-lake in location
    us-central1, run:

        $ gcloud dataplex zones describe test-zone --location=us-central1 \
          --lake=test-lake

POSITIONAL ARGUMENTS
     Zone resource - Arguments and flags that define the Dataplex zones you
     want to retrieve. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONE
          ID of the zone or fully qualified identifier for the zone.

          To set the zone attribute:
          + provide the argument zone on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --lake=LAKE
          Identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex zones describe
```

### gcloud dataplex zones get-iam-policy

```text
NAME
    gcloud dataplex zones get-iam-policy - get the IAM policy for a Dataplex
        zone resource

SYNOPSIS
    gcloud dataplex zones get-iam-policy
        (ZONE : --lake=LAKE --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays the IAM policy associated with a Dataplex zone resource. If
    formatted as JSON, the output can be edited and used as a policy file for
    set-iam-policy. The output includes an "etag" field identifying the version
    emitted and allowing detection of concurrent policy updates.

EXAMPLES
    To print the IAM policy for Dataplex zone test-zone within lake test-lake
    in location us-central1, run:

        $ gcloud dataplex zones get-iam-policy test-zone \
          --location=us-central1 --lake=test-lake

POSITIONAL ARGUMENTS
     Zone resource - Arguments and flags that define the Dataplex zone IAM
     policy you want to retrieve. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONE
          ID of the zone or fully qualified identifier for the zone.

          To set the zone attribute:
          + provide the argument zone on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --lake=LAKE
          Identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex zones get-iam-policy
```

### gcloud dataplex zones list

```text
NAME
    gcloud dataplex zones list - list Dataplex zone resources under a lake

SYNOPSIS
    gcloud dataplex zones list (--lake=LAKE : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Dataplex zone resource under a specific project. location, and lake.

EXAMPLES
    To list all Dataplex zone resources within lake test-lake in location
    us-central, run:

        $ gcloud dataplex zones list --location=us-central1 --lake=test-lake

REQUIRED FLAGS
     Lake resource - Arguments and flags that define the Dataplex zone you want
     to list. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --lake on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --lake=LAKE
          ID of the lake or fully qualified identifier for the lake.

          To set the lake attribute:
          + provide the argument --lake on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument --lake on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex zones list
```

### gcloud dataplex zones remove-iam-policy-binding

```text
NAME
    gcloud dataplex zones remove-iam-policy-binding - remove IAM policy binding
        from a Dataplex zone resource

SYNOPSIS
    gcloud dataplex zones remove-iam-policy-binding
        (ZONE : --lake=LAKE --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove IAM policy binding from a Dataplex zone resource.

EXAMPLES
    To remove an IAM policy binding for the role roles/dataplex.viewer for the
    user test-user@gmail.com from zone test-zone in lake test-lake in location
    us-central, run:

        $ gcloud dataplex zones remove-iam-policy-binding test-zone \
            --location=us-central1 --lake=test-lake \
            --role=roles/dataplex.viewer --member=user:foo@gmail.com

    See https://cloud.google.com/dataplex/docs/iam-roles for details of policy
    role and member types.

POSITIONAL ARGUMENTS
     Zones resource - Arguments and flags that define the Dataplex zone you
     want to remove IAM policy binding from. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONE
          ID of the zones or fully qualified identifier for the zones.

          To set the zone attribute:
          + provide the argument zone on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --lake=LAKE
          The identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex zones remove-iam-policy-binding
```

### gcloud dataplex zones set-iam-policy

```text
NAME
    gcloud dataplex zones set-iam-policy - set the IAM policy to a Dataplex
        zone as defined in a JSON or YAML file

SYNOPSIS
    gcloud dataplex zones set-iam-policy
        (ZONE : --lake=LAKE --location=LOCATION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    policy.son and set it for the Dataplex zone test-zone defined in lake
    test-lake in location us-central1:

        $ gcloud dataplex zones set-iam-policy test-zone \
            --location=us-central1 --lake=test-lake policy.json

POSITIONAL ARGUMENTS
     Zones resource - Arguments and flags that define the Dataplex zone you
     want to set IAM policy binding to. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONE
          ID of the zones or fully qualified identifier for the zones.

          To set the zone attribute:
          + provide the argument zone on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --lake=LAKE
          The identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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

NOTES
    This variant is also available:

        $ gcloud alpha dataplex zones set-iam-policy
```

### gcloud dataplex zones update

```text
NAME
    gcloud dataplex zones update - update a Dataplex zone resource

SYNOPSIS
    gcloud dataplex zones update (ZONE : --lake=LAKE --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [--validate-only]
        [--[no-]discovery-enabled
          --discovery-exclude-patterns=[EXCLUDE_PATTERNS,...]
          --discovery-include-patterns=[INCLUDE_PATTERNS,...]
          --discovery-schedule=DISCOVERY_SCHEDULE --csv-delimiter=CSV_DELIMITER
          --[no-]csv-disable-type-inference --csv-encoding=CSV_ENCODING
          --csv-header-rows=CSV_HEADER_ROWS
          --[no-]json-disable-type-inference --json-encoding=JSON_ENCODING]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Dataplex zone resource.

EXAMPLES
    To update a Dataplex zone test-zone in lake test-lake in location
    us-central1 to have the display name first-dataplex-zone and discovery
    include patterns abc, def, run:

        $ gcloud dataplex zones update test-zone --location=us-central1 \
            --lake=test-lake --display-name="first-dataplex-zone" \
            --discovery-include-patterns=abc,def

POSITIONAL ARGUMENTS
     Zones resource - Arguments and flags that define the Dataplex zone you
     want to update. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONE
          ID of the zones or fully qualified identifier for the zones.

          To set the zone attribute:
          + provide the argument zone on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --lake=LAKE
          The identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the zone

     --display-name=DISPLAY_NAME
        Display Name

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --validate-only
        Validate the create action, but don't actually perform it.

     Settings to manage the metadata discovery and publishing.

     --[no-]discovery-enabled
        Whether discovery is enabled. Use --discovery-enabled to enable and
        --no-discovery-enabled to disable.

     --discovery-exclude-patterns=[EXCLUDE_PATTERNS,...]
        The list of patterns to apply for selecting data to exclude during
        discovery. For Cloud Storage bucket assets, these are interpreted as
        glob patterns used to match object names. For BigQuery dataset assets,
        these are interpreted as patterns to match table names.

     --discovery-include-patterns=[INCLUDE_PATTERNS,...]
        The list of patterns to apply for selecting data to include during
        discovery if only a subset of the data should considered. For Cloud
        Storage bucket assets, these are interpreted as glob patterns used to
        match object names. For BigQuery dataset assets, these are interpreted
        as patterns to match table names.

     Determines when discovery jobs are triggered.

     --discovery-schedule=DISCOVERY_SCHEDULE
        Cron schedule (https://en.wikipedia.org/wiki/Cron) for running
        discovery jobs periodically. Discovery jobs must be scheduled at least
        30 minutes apart.

     Describe data formats.

     Describe CSV and similar semi-structured data formats.

     --csv-delimiter=CSV_DELIMITER
        The delimiter being used to separate values. This defaults to ','.

     --[no-]csv-disable-type-inference
        Whether to disable the inference of data type for CSV data. If true,
        all columns will be registered as strings. Use
        --csv-disable-type-inference to enable and
        --no-csv-disable-type-inference to disable.

     --csv-encoding=CSV_ENCODING
        The character encoding of the data. The default is UTF-8.

     --csv-header-rows=CSV_HEADER_ROWS
        The number of rows to interpret as header rows that should be skipped
        when reading data rows.

     Describe JSON data format.

     --[no-]json-disable-type-inference
        Whether to disable the inference of data type for Json data. If true,
        all columns will be registered as their primitive types (strings,
        number or boolean). Use --json-disable-type-inference to enable and
        --no-json-disable-type-inference to disable.

     --json-encoding=JSON_ENCODING
        The character encoding of the data. The default is UTF-8.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex zones update
```

### gcloud alpha dataplex zones actions list

```text
NAME
    gcloud alpha dataplex zones actions list - list Dataplex zone actions

SYNOPSIS
    gcloud alpha dataplex zones actions list
        (--zone=ZONE : --lake=LAKE --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex zones add-iam-policy-binding

```text
NAME
    gcloud alpha dataplex zones add-iam-policy-binding - add IAM policy binding
        to a Dataplex zone resource

SYNOPSIS
    gcloud alpha dataplex zones add-iam-policy-binding
        (ZONE : --lake=LAKE --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex zones create

```text
NAME
    gcloud alpha dataplex zones create - create a zone

SYNOPSIS
    gcloud alpha dataplex zones create (ZONE : --lake=LAKE --location=LOCATION)
        --resource-location-type=RESOURCE_LOCATION_TYPE --type=TYPE [--async]
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [--validate-only]
        [--[no-]discovery-enabled
          --discovery-exclude-patterns=[EXCLUDE_PATTERNS,...]
          --discovery-include-patterns=[INCLUDE_PATTERNS,...]
          --discovery-schedule=DISCOVERY_SCHEDULE --csv-delimiter=CSV_DELIMITER
          --[no-]csv-disable-type-inference --csv-encoding=CSV_ENCODING
          --csv-header-rows=CSV_HEADER_ROWS
          --[no-]json-disable-type-inference --json-encoding=JSON_ENCODING]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex zones delete

```text
NAME
    gcloud alpha dataplex zones delete - delete a Dataplex zone resource

SYNOPSIS
    gcloud alpha dataplex zones delete (ZONE : --lake=LAKE --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex zones describe

```text
NAME
    gcloud alpha dataplex zones describe - describe a Dataplex zone resource

SYNOPSIS
    gcloud alpha dataplex zones describe
        (ZONE : --lake=LAKE --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex zones get-iam-policy

```text
NAME
    gcloud alpha dataplex zones get-iam-policy - get the IAM policy for a
        Dataplex zone resource

SYNOPSIS
    gcloud alpha dataplex zones get-iam-policy
        (ZONE : --lake=LAKE --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex zones list

```text
NAME
    gcloud alpha dataplex zones list - list Dataplex zone resources under a
        lake

SYNOPSIS
    gcloud alpha dataplex zones list (--lake=LAKE : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex zones remove-iam-policy-binding

```text
NAME
    gcloud alpha dataplex zones remove-iam-policy-binding - remove IAM policy
        binding from a Dataplex zone resource

SYNOPSIS
    gcloud alpha dataplex zones remove-iam-policy-binding
        (ZONE : --lake=LAKE --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex zones set-iam-policy

```text
NAME
    gcloud alpha dataplex zones set-iam-policy - set the IAM policy to a
        Dataplex zone as defined in a JSON or YAML file

SYNOPSIS
    gcloud alpha dataplex zones set-iam-policy
        (ZONE : --lake=LAKE --location=LOCATION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex zones update

```text
NAME
    gcloud alpha dataplex zones update - update a Dataplex zone resource

SYNOPSIS
    gcloud alpha dataplex zones update (ZONE : --lake=LAKE --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [--validate-only]
        [--[no-]discovery-enabled
          --discovery-exclude-patterns=[EXCLUDE_PATTERNS,...]
          --discovery-include-patterns=[INCLUDE_PATTERNS,...]
          --discovery-schedule=DISCOVERY_SCHEDULE --csv-delimiter=CSV_DELIMITER
          --[no-]csv-disable-type-inference --csv-encoding=CSV_ENCODING
          --csv-header-rows=CSV_HEADER_ROWS
          --[no-]json-disable-type-inference --json-encoding=JSON_ENCODING]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples say "in location us-central1" but pass `--location=us-central`, which is not a region ID; the runnable form passes `--location=us-central1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/zones (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
