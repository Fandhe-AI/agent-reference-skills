---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/findings
---

# gcloud scc findings (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scc findings bulk-mute

```text
NAME
    gcloud scc findings bulk-mute - bulk mute Security Command Center findings
        based on a filter

SYNOPSIS
    gcloud scc findings bulk-mute --filter=FILTER
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--location=LOCATION; default="global"]
        [--mute-state=MUTE_STATE; default="muted"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Bulk mute Security Command Center findings based on a filter.

EXAMPLES
    To bulk mute findings given organization 123 based on a filter on category
    that equals XSS_SCRIPTING, run:

        $ gcloud scc findings bulk-mute --organization=organizations/123 \
            --filter="category=\"XSS_SCRIPTING\""

    To bulk mute findings given folder 123 based on a filter on category that
    equals XSS_SCRIPTING, run:

        $ gcloud scc findings bulk-mute --folder=folders/123 \
            --filter="category=\"XSS_SCRIPTING\""

    To bulk mute findings given project 123 based on a filter on category that
    equals XSS_SCRIPTING, run:

        $ gcloud scc findings bulk-mute --project=projects/123 \
            --filter="category=\"XSS_SCRIPTING\""

    To bulk mute findings given organization 123 based on a filter on category
    that equals XSS_SCRIPTING and location=eu run:

        $ gcloud scc findings bulk-mute --organization=organizations/123 \
            --filter="category=\"XSS_SCRIPTING\"" --location=locations/eu

REQUIRED FLAGS
     --filter=FILTER
        Expression that identifies findings that should be muted.

     Exactly one of these must be specified:

       --folder=FOLDER
          Folder where the findings reside. Formatted as folders/456 or just
          456.

       --organization=ORGANIZATION
          Organization where the findings reside. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (id or number) where the findings reside. Formatted as
          projects/789 or just 789.

OPTIONAL FLAGS
     --location=LOCATION; default="global"
        When data residency controls are enabled, this attribute specifies the
        location in which the resource is located and applicable. The location
        attribute can be provided as part of the fully specified resource name
        or with the --location argument on the command line. The default
        location is global.

        NOTE: If you override the endpoint to a regional endpoint
        (https://cloud.google.com/security-command-center/docs/reference/rest/index.html?rep_location=global#regional-service-endpoint)
        you must specify the correct data location
        (https://cloud.google.com/security-command-center/docs/data-residency-support#locations)
        using this flag. The default location on this command is unrelated to
        the default location that is specified when data residency controls are
        enabled for Security Command Center.

        NOTE: If no location is specified, the default location is global AND
        the request will be routed to the SCC V1 API. To use the SCC V2 API -
        please explicitly specify the flag.

     --mute-state=MUTE_STATE; default="muted"
        Desired mute state of the finding. MUTE_STATE must be one of: muted,
        undefined.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the Security Command Center API. For more information,
    see Security Command Center API.
    (https://cloud.google.com/security-command-center/docs/reference/rest)

NOTES
    This variant is also available:

        $ gcloud alpha scc findings bulk-mute
```

### gcloud scc findings create

```text
NAME
    gcloud scc findings create - create a Security Command Center finding

SYNOPSIS
    gcloud scc findings create
        (FINDING : --organization=ORGANIZATION --source=SOURCE)
        --category=CATEGORY --event-time=EVENT_TIME
        --resource-name=RESOURCE_NAME [--external-uri=EXTERNAL_URI]
        [--location=LOCATION; default="global"]
        [--source-properties=[KEY=VALUE,...]] [--state=STATE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Security Command Center finding.

EXAMPLES
    Create an ACTIVE finding testFinding with category: XSS_SCRIPTING attached
    to project with project number 9876 under organization 123456 and source
    5678:

        $ gcloud scc findings create `testFinding` --organization=123456 \
            --source=5678 --state=ACTIVE --category='XSS_SCRIPTING' \
            --event-time=2023-01-11T07:00:06.861Z \
            --resource-name='//cloudresourcemanager.googleapis.com/projects/\
        9876'

    Create an ACTIVE finding testFinding with category: XSS_SCRIPTING attached
    to project with project number 9876 under organization 123456 and source
    5678 using the full resource name:

        $ gcloud scc findings create \
            organizations/123456/sources/5678/findings/testFinding \
            --state=ACTIVE --category='XSS_SCRIPTING' \
            --event-time=2023-01-11T07:00:06.861Z \
            --resource-name='//cloudresourcemanager.googleapis.com/projects/\
        9876'

    Create an ACTIVE finding testFinding with category: XSS_SCRIPTING attached
    to project with project number`9876 under organization 123456, source 5678
    and location=eu:

        $ gcloud scc findings create `testFinding` --organization=123456 \
            --source=5678 --state=ACTIVE --category='XSS_SCRIPTING' \
            --event-time=2023-01-11T07:00:06.861Z \
            --resource-name='//cloudresourcemanager.googleapis.com/projects/\
        9876' --location=eu

POSITIONAL ARGUMENTS
     Finding resource - The finding to be used for the SCC (Security Command
     Center) command. The arguments in this group can be used to specify the
     attributes of this resource.

     This must be specified.

       FINDING
          ID of the finding or fully qualified identifier for the finding.

          To set the finding attribute:
          + provide the argument finding on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --organization=ORGANIZATION
          (Optional) If the full resource name isn't provided e.g.
          organizations/123, then provide the organization id which is the
          suffix of the organization. Example: organizations/123, the id is
          123.

          To set the organization attribute:
          + provide the argument finding on the command line with a fully
            specified name;
          + provide the argument --organization on the command line;
          + Set the organization property in configuration using gcloud
            config set scc/organization if it is not specified in command
            line..

       --source=SOURCE
          (Optional) If the full resource name isn't provided e.g.
          organizations/123/sources/456, then provide the source id which is
          the suffix of the source. Example: organizations/123/sources/456, the
          id is 456.

          To set the source attribute:
          + provide the argument finding on the command line with a fully
            specified name;
          + provide the argument --source on the command line.

REQUIRED FLAGS
     --category=CATEGORY
        Taxonomy group within findings from a given source. Example:
        XSS_SCRIPTING

     --event-time=EVENT_TIME
        Time at which the event took place. For example, if the finding
        represents an open firewall it would capture the time the open firewall
        was detected. If event-time is not provided, it will default to UTC
        version of NOW. See $ gcloud topic datetimes for information on
        supported time formats.

     --resource-name=RESOURCE_NAME
        Full resource name of the Google Cloud Platform resource this finding
        is for.

OPTIONAL FLAGS
     --external-uri=EXTERNAL_URI
        URI that, if available, points to a web page outside of Cloud SCC
        (Security Command Center) where additional information about the
        finding can be found. This field is guaranteed to be either empty or a
        well formed URL.

     --location=LOCATION; default="global"
        When data residency controls are enabled, this attribute specifies the
        location in which the resource is located and applicable. The location
        attribute can be provided as part of the fully specified resource name
        or with the --location argument on the command line. The default
        location is global.

        NOTE: If you override the endpoint to a regional endpoint
        (https://cloud.google.com/security-command-center/docs/reference/rest/index.html?rep_location=global#regional-service-endpoint)
        you must specify the correct data location
        (https://cloud.google.com/security-command-center/docs/data-residency-support#locations)
        using this flag. The default location on this command is unrelated to
        the default location that is specified when data residency controls are
        enabled for Security Command Center.

        NOTE: If no location is specified, the default location is global AND
        the request will be routed to the SCC V1 API. To use the SCC V2 API -
        please explicitly specify the flag.

     --source-properties=[KEY=VALUE,...]
        Source specific properties. These properties are managed by the source
        that writes the finding. The key names in the source_properties map
        must be between 1 and 255 characters, and must start with a letter and
        contain alphanumeric characters or underscores only. For example
        "key1=val1,key2=val2"

     --state=STATE
        State is one of: [ACTIVE, INACTIVE]. STATE must be one of: active,
        inactive, state-unspecified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the Security Command Center API. For more information,
    see Security Command Center API.
    (https://cloud.google.com/security-command-center/docs/reference/rest)

NOTES
    These variants are also available:

        $ gcloud alpha scc findings create

        $ gcloud beta scc findings create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud scc findings create testFinding \
    --organization=123456 \
    --source=5678 \
    --state=ACTIVE \
    --category='XSS_SCRIPTING' \
    --event-time=2023-01-11T07:00:06.861Z \
    --resource-name='//cloudresourcemanager.googleapis.com/projects/9876'

gcloud scc findings create organizations/123456/sources/5678/findings/testFinding \
    --state=ACTIVE \
    --category='XSS_SCRIPTING' \
    --event-time=2023-01-11T07:00:06.861Z \
    --resource-name='//cloudresourcemanager.googleapis.com/projects/9876'

gcloud scc findings create testFinding \
    --organization=123456 \
    --source=5678 \
    --state=ACTIVE \
    --category='XSS_SCRIPTING' \
    --event-time=2023-01-11T07:00:06.861Z \
    --resource-name='//cloudresourcemanager.googleapis.com/projects/9876' \
    --location=eu
```

### gcloud scc findings export-to-bigquery

```text
NAME
    gcloud scc findings export-to-bigquery - export Security Command Center
        findings to bigquery

SYNOPSIS
    gcloud scc findings export-to-bigquery [PARENT] --dataset=DATASET
        [--location=LOCATION; default="global"] [--source=SOURCE; default="-"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export Security Command Center findings to bigquery.

EXAMPLES
    To export findings for a given parent
    ``organizations/123/sources/456/locations/global`` and dataset
    ``projects/project_id/datasets/dataset_id`` run:

        $ gcloud scc findings export-to-bigquery organizations/123 \
            --dataset=projects/project_id/datasets/dataset_id --source=456 \
            --location=global

POSITIONAL ARGUMENTS
     Parent resource - parent organization, folder, or project in the Google
     Cloud resource hierarchy to be used for the gcloud scc command. Specify
     the argument as either [RESOURCE_TYPE/RESOURCE_ID] or [RESOURCE_ID], as
     shown in the preceding examples. This represents a Cloud resource.

     [PARENT]
        ID of the parent or fully qualified identifier for the parent.

        To set the parent attribute:
        * provide the argument parent on the command line;
        * Set the parent property in configuration using gcloud config set
          scc/parent if it is not specified in command line.

REQUIRED FLAGS
     --dataset=DATASET
        BigQuery dataset to export findings to.

OPTIONAL FLAGS
     --location=LOCATION; default="global"
        When data residency controls are enabled, this attribute specifies the
        location in which the resource is located and applicable. The location
        attribute can be provided as part of the fully specified resource name
        or with the --location argument on the command line. The default
        location is global.

        NOTE: If you override the endpoint to a regional endpoint
        (https://cloud.google.com/security-command-center/docs/reference/rest/index.html?rep_location=global#regional-service-endpoint)
        you must specify the correct data location
        (https://cloud.google.com/security-command-center/docs/data-residency-support#locations)
        using this flag. The default location on this command is unrelated to
        the default location that is specified when data residency controls are
        enabled for Security Command Center.

        NOTE: If no location is specified, the default location is global AND
        the request will be routed to the SCC V1 API. To use the SCC V2 API -
        please explicitly specify the flag.

     --source=SOURCE; default="-"
        Source id. Defaults to all sources.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the Security Command Center API. For more information,
    see Security Command Center API.
    (https://cloud.google.com/security-command-center/docs/reference/rest)

NOTES
    This variant is also available:

        $ gcloud alpha scc findings export-to-bigquery
```

### gcloud scc findings group

```text
NAME
    gcloud scc findings group - filter an organization or source's findings and
        groups them by their specified properties

SYNOPSIS
    gcloud scc findings group [PARENT] [--compare-duration=COMPARE_DURATION]
        [--filter=FILTER] [--group-by=GROUP_BY]
        [--location=LOCATION; default="global"] [--page-size=PAGE_SIZE]
        [--page-token=PAGE_TOKEN] [--read-time=READ_TIME]
        [--source=SOURCE; default="-"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    To group across all sources provide a '-' as the source id.

EXAMPLES
    Group findings under organization 123456 across all sources by their
    category:

        $ gcloud scc findings group 123456 --group-by="category"

    Group findings under project example-project across all sources by their
    category:

        $ gcloud scc findings group projects/example-project \
            --group-by="category"

    Group findings under folders 456 across all sources by their category:

        $ gcloud scc findings group folders/456 --group-by="category"

    Group findings under organization 123456 and source 5678, by their
    category:

        $ gcloud scc findings group 123456 --source=5678 \
            --group-by="category"

    Group ACTIVE findings under organization 123456 and source 5678, by their
    category:

        $ gcloud scc findings group 123456 --source=5678 \
            --group-by="category" --filter="state=\"ACTIVE\""

    Group findings under organization 123456 and location=eu across all sources
    by their category:

        $ gcloud scc findings group 123456 --group-by="category" \
            --location=eu

POSITIONAL ARGUMENTS
     Parent resource - parent organization, folder, or project in the Google
     Cloud resource hierarchy to be used for the gcloud scc command. Specify
     the argument as either [RESOURCE_TYPE/RESOURCE_ID] or [RESOURCE_ID], as
     shown in the preceding examples. This represents a Cloud resource.

     [PARENT]
        ID of the parent or fully qualified identifier for the parent.

        To set the parent attribute:
        * provide the argument parent on the command line;
        * Set the parent property in configuration using gcloud config set
          scc/parent if it is not specified in command line.

FLAGS
     --compare-duration=COMPARE_DURATION
        (DEPRECATED) When compare_duration is set, the result's "state_change"
        attribute is updated to indicate whether the finding had its state
        changed, the finding's state remained unchanged, or if the finding was
        added during the compare_duration period of time that precedes the
        read_time. This is the time between (read_time - compare_duration) and
        read_time. The state_change value is derived based on the presence and
        state of the finding at the two points in time. Intermediate state
        changes between the two times don't affect the result. For example, the
        results aren't affected if the finding is made inactive and then active
        again. Possible "state_change" values when compare_duration is
        specified:

        * 'CHANGED': indicates that the finding was present at the start of
          compare_duration, but changed its state at read_time.

        * 'UNCHANGED': indicates that the finding was present at the start of
          compare_duration and did not change state at read_time.

        * 'ADDED': indicates that the finding was not present at the start of
          compare_duration, but was present at read_time.

        * 'REMOVED': indicates that the finding was present at the start of
          compare_duration, but was not present at read_time.

            If compare_duration is not specified, then the only possible
            state_change is 'UNUSED', which will be the state_change set for all
            findings present at read_time. If this field is set then 'state_change'
            must be a specified field in 'group_by'. See $ gcloud topic datetimes
            for information on supported duration formats.

        The --compare-duration option is deprecated. For more information, see
        the deprecation notice
        (https://cloud.google.com/security-command-center/docs/release-notes#April_15_2024)
        on the SCC release notes page.

     --filter=FILTER
        Expression that defines the filter to apply across findings. The
        expression is a list of one or more restrictions combined via logical
        operators 'AND' and 'OR'. Parentheses are supported, and 'OR' has
        higher precedence than 'AND'. Restrictions have the form '<field>
        <operator> <value>' and may have a '-' character in front of them to
        indicate negation. Examples include: name,
        source_properties.a_property, security_marks.marks.marka. The supported
        operators are:
        * '=' for all value types.
        * '>', '<', '>=', '<=' for integer values.
        * ':', meaning substring matching, for strings.

        The supported value types are:string literals in quotes, integer
        literals without quotes, boolean literals 'true' and 'false' without
        quotes. Some example filters: 'source_properties.size = 100',
        'category=\"XSS\" AND event_time > 10' etc.

     --group-by=GROUP_BY
        Expression that defines what findings fields to use for grouping
        (including 'state'). String value should follow SQL syntax: comma
        separated list of fields. For example: "parent,resource_name". The
        following fields are supported:
        * resource_name
        * category
        * state
        * parent

     --location=LOCATION; default="global"
        When data residency controls are enabled, this attribute specifies the
        location in which the resource is located and applicable. The location
        attribute can be provided as part of the fully specified resource name
        or with the --location argument on the command line. The default
        location is global.

        NOTE: If you override the endpoint to a regional endpoint
        (https://cloud.google.com/security-command-center/docs/reference/rest/index.html?rep_location=global#regional-service-endpoint)
        you must specify the correct data location
        (https://cloud.google.com/security-command-center/docs/data-residency-support#locations)
        using this flag. The default location on this command is unrelated to
        the default location that is specified when data residency controls are
        enabled for Security Command Center.

        NOTE: If no location is specified, the default location is global AND
        the request will be routed to the SCC V1 API. To use the SCC V2 API -
        please explicitly specify the flag.

     --page-size=PAGE_SIZE
        Maximum number of results to return in a single response. Default is
        10, minimum is 1, maximum is 1000.

     --page-token=PAGE_TOKEN
        Response objects will return a non-null value for page-token to
        indicate that there is at least one additional page of data. User can
        either directly request that page by specifying the page-token
        explicitly or let gcloud fetch one-page-at-a-time.

     --read-time=READ_TIME
        (DEPRECATED) Time used as a reference point when filtering. Absence of
        this field will default to the API's version of NOW. See $ gcloud topic
        datetimes for information on supported time formats.

        The --read-time option is deprecated. For more information, see the
        deprecation notice
        (https://cloud.google.com/security-command-center/docs/release-notes#April_15_2024)
        on the SCC release notes page.

     --source=SOURCE; default="-"
        Source id. Defaults to all sources.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the Security Command Center API. For more information,
    see Security Command Center API.
    (https://cloud.google.com/security-command-center/docs/reference/rest)

NOTES
    These variants are also available:

        $ gcloud alpha scc findings group

        $ gcloud beta scc findings group
```

### gcloud scc findings list

```text
NAME
    gcloud scc findings list - list an organization or source's findings

SYNOPSIS
    gcloud scc findings list [PARENT] [--compare-duration=COMPARE_DURATION]
        [--field-mask=FIELD_MASK] [--location=LOCATION; default="global"]
        [--order-by=ORDER_BY] [--page-token=PAGE_TOKEN] [--read-time=READ_TIME]
        [--source=SOURCE; default="-"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List an organization or source's findings. To list across all sources
    provide a '-' as the source id.

EXAMPLES
    List all ACTIVE findings under organization 123456 across all sources:

        $ gcloud scc findings list 123456 --filter="state=\"ACTIVE\""

    List all ACTIVE findings under project abc across all sources:

        $ gcloud scc findings list projects/abc --filter="state=\"ACTIVE\""

    List all ACTIVE findings under folder 456 across all sources:

        $ gcloud scc findings list folders/456 --filter="state=\"ACTIVE\""

    List all ACTIVE findings under organization 123456 and source 5678:

        $ gcloud scc findings list 123456 --source=5678 \
            --filter="state=\"ACTIVE\""

    Only list category and resource_name of all ACTIVE findings under
    organization 123456 and source 5678:

        $ gcloud scc findings list 123456 --source=5678 \
            --filter="state=\"ACTIVE\"" \
        --field-mask="finding.category,finding.resource_name"

    List all ACTIVE findings of XSS category/type, under organization 123456
    and source 5678:

        $ gcloud scc findings list 123456 --source=5678 \
            --filter="state=\"ACTIVE\" AND category=\"XSS\""

    List all findings attached to a particular resource under organization
    123456:

        $ gcloud scc findings list 123456 \
            --filter="resource_name=\"//container.googleapis.com/projects/\
        pid/zones/zone-id/clusters/cluster-id\""

    List all ACTIVE findings that took place on 2019-01-01T01:00:00 GMT time,
    under organization 123456:

        $ gcloud scc findings list 123456 --filter="state=\"ACTIVE\" AND \
            event_time > 1546304400000""

    List all findings under organization 123456 across all sources and
    location=eu:

        $ gcloud scc findings list 123456 --location=eu

POSITIONAL ARGUMENTS
     Parent resource - parent organization, folder, or project in the Google
     Cloud resource hierarchy to be used for the gcloud scc command. Specify
     the argument as either [RESOURCE_TYPE/RESOURCE_ID] or [RESOURCE_ID], as
     shown in the preceding examples. This represents a Cloud resource.

     [PARENT]
        ID of the parent or fully qualified identifier for the parent.

        To set the parent attribute:
        * provide the argument parent on the command line;
        * Set the parent property in configuration using gcloud config set
          scc/parent if it is not specified in command line.

FLAGS
     --compare-duration=COMPARE_DURATION
        (DEPRECATED) When compare_duration is set, the result's "state_change"
        attribute is updated to indicate whether the finding had its state
        changed, the finding's state remained unchanged, or if the finding was
        added during the compare_duration period of time that precedes the
        read_time. This is the time between (read_time - compare_duration) and
        read_time. The state_change value is derived based on the presence and
        state of the finding at the two points in time. Intermediate state
        changes between the two times don't affect the result. For example, the
        results aren't affected if the finding is made inactive and then active
        again. Possible "state_change" values when compare_duration is
        specified:

        * 'CHANGED': indicates that the finding was present at the start of
          compare_duration, but changed its state at read_time.

        * 'UNCHANGED': indicates that the finding was present at the start of
          compare_duration and did not change state at read_time.

        * 'ADDED': indicates that the finding was not present at the start of
          compare_duration, but was present at read_time.

        * 'REMOVED': indicates that the finding was present at the start of
          compare_duration, but was not present at read_time.

            If compare_duration is not specified, then the only possible
            state_change is 'UNUSED', which will be the state_change set for all
            findings present at read_time. If this field is set then 'state_change'
            must be a specified field in 'group_by'. See $ gcloud topic datetimes
            for information on supported duration formats.

        The --compare-duration option is deprecated. For more information, see
        the deprecation notice
        (https://cloud.google.com/security-command-center/docs/release-notes#April_15_2024)
        on the SCC release notes page.

     --field-mask=FIELD_MASK
        Field mask to specify the finding fields listed in the response. An
        empty field mask will list all fields. For example:
        --field-mask="finding.category,finding.resource_name" will only output
        category and resource_name for the findings in addition to default
        attributes. Notice the difference between hyphens (-) used with flags
        v/s camel case used in field masks. An empty or missing field mask will
        list all fields.

     --location=LOCATION; default="global"
        When data residency controls are enabled, this attribute specifies the
        location in which the resource is located and applicable. The location
        attribute can be provided as part of the fully specified resource name
        or with the --location argument on the command line. The default
        location is global.

        NOTE: If you override the endpoint to a regional endpoint
        (https://cloud.google.com/security-command-center/docs/reference/rest/index.html?rep_location=global#regional-service-endpoint)
        you must specify the correct data location
        (https://cloud.google.com/security-command-center/docs/data-residency-support#locations)
        using this flag. The default location on this command is unrelated to
        the default location that is specified when data residency controls are
        enabled for Security Command Center.

        NOTE: If no location is specified, the default location is global AND
        the request will be routed to the SCC V1 API. To use the SCC V2 API -
        please explicitly specify the flag.

     --order-by=ORDER_BY
        Expression that defines what fields and order to use for sorting.
        String value should follow SQL syntax: comma separated list of fields.
        For example: "name,resource_properties.a_property". The default sorting
        order is ascending. To specify descending order for a field, a suffix "
        desc" should be appended to the field name. For example:
        --order-by="name desc,source_properties.a_property" will order by name
        in descending order while source_properties.a_property in ascending
        order.

     --page-token=PAGE_TOKEN
        Response objects will return a non-null value for page-token to
        indicate that there is at least one additional page of data. User can
        either directly request that page by specifying the page-token
        explicitly or let gcloud fetch one-page-at-a-time.

     --read-time=READ_TIME
        (DEPRECATED) Time used as a reference point when filtering. Absence of
        this field will default to the API's version of NOW. See $ gcloud topic
        datetimes for information on supported time formats.

        The --read-time option is deprecated. For more information, see the
        deprecation notice
        (https://cloud.google.com/security-command-center/docs/release-notes#April_15_2024)
        on the SCC release notes page.

     --source=SOURCE; default="-"
        Source id. Defaults to all sources.

     At most one of these can be specified:

       --folder=FOLDER
          The folder ID (e.g., 456) that contains the finding.

       --organization=ORGANIZATION
          The organization ID (e.g., 123) that contains the finding.

       --project=PROJECT
          The project ID (e.g., example-project) that contains the finding.

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
    This command uses the Security Command Center API. For more information,
    see Security Command Center API.
    (https://cloud.google.com/security-command-center/docs/reference/rest)

NOTES
    These variants are also available:

        $ gcloud alpha scc findings list

        $ gcloud beta scc findings list
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud scc findings list 123456 \
    --filter="resource_name=\"//container.googleapis.com/projects/pid/zones/zone-id/clusters/cluster-id\""

gcloud scc findings list 123456 \
    --filter="state=\"ACTIVE\" AND event_time > 1546304400000"

gcloud scc findings list 123456 \
    --location=eu
```

### gcloud scc findings list-marks

```text
NAME
    gcloud scc findings list-marks - list a finding's security marks

SYNOPSIS
    gcloud scc findings list-marks FINDING
        [--location=LOCATION; default="global"] [--page-token=PAGE_TOKEN]
        [--read-time=READ_TIME] [--source=SOURCE; default="-"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List a finding's security marks.

EXAMPLES
    List all security marks for testFinding under organization 123456 and
    source 5678:

        $ gcloud scc findings list-marks `testFinding` \
            --organization=123456 --source=5678

    List all security marks for testFinding under project example-project and
    source 5678:

        $ gcloud scc findings list-marks \
            projects/example-project/sources/5678/findings/testFinding

    List all security marks for testFinding under folder 456 and source 5678:

        $ gcloud scc findings list-marks \
            folders/456/sources/5678/findings/testFinding

    List all security marks for testFinding under organization 123456, source
    5678 and location=eu:

        $ gcloud scc findings list-marks `testFinding` \
            --organization=123456 --source=5678 --location=eu

POSITIONAL ARGUMENTS
     FINDING
        ID of the finding or fully qualified identifier for the finding.

FLAGS
     --location=LOCATION; default="global"
        When data residency controls are enabled, this attribute specifies the
        location in which the resource is located and applicable. The location
        attribute can be provided as part of the fully specified resource name
        or with the --location argument on the command line. The default
        location is global.

        NOTE: If you override the endpoint to a regional endpoint
        (https://cloud.google.com/security-command-center/docs/reference/rest/index.html?rep_location=global#regional-service-endpoint)
        you must specify the correct data location
        (https://cloud.google.com/security-command-center/docs/data-residency-support#locations)
        using this flag. The default location on this command is unrelated to
        the default location that is specified when data residency controls are
        enabled for Security Command Center.

        NOTE: If no location is specified, the default location is global AND
        the request will be routed to the SCC V1 API. To use the SCC V2 API -
        please explicitly specify the flag.

     --page-token=PAGE_TOKEN
        Response objects will return a non-null value for page-token to
        indicate that there is at least one additional page of data. User can
        either directly request that page by specifying the page-token
        explicitly or let gcloud fetch one-page-at-a-time.

     --read-time=READ_TIME
        (DEPRECATED) Time used as a reference point when filtering. Absence of
        this field will default to the API's version of NOW. See $ gcloud topic
        datetimes for information on supported time formats.

        The --read-time option is deprecated. For more information, see the
        deprecation notice
        (https://cloud.google.com/security-command-center/docs/release-notes#April_15_2024)
        on the SCC release notes page.

     --source=SOURCE; default="-"
        Source id. Defaults to all sources.

     At most one of these can be specified:

       --folder=FOLDER
          The folder ID (e.g., 456) that contains the finding.

       --organization=ORGANIZATION
          The organization ID (e.g., 123) that contains the finding.

       --project=PROJECT
          The project ID (e.g., example-project) that contains the finding.

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
    This command uses the Security Command Center API. For more information,
    see Security Command Center API.
    (https://cloud.google.com/security-command-center/docs/reference/rest)

NOTES
    These variants are also available:

        $ gcloud alpha scc findings list-marks

        $ gcloud beta scc findings list-marks
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud scc findings list-marks testFinding \
    --organization=123456 \
    --source=5678

gcloud scc findings list-marks testFinding \
    --organization=123456 \
    --source=5678 \
    --location=eu
```

### gcloud scc findings set-mute

```text
NAME
    gcloud scc findings set-mute - update a Security Command Center finding's
        mute state

SYNOPSIS
    gcloud scc findings set-mute FINDING --mute=MUTE
        [--location=LOCATION; default="global"] [--source=SOURCE]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Security Command Center finding's mute state.

EXAMPLES
    To update finding's mute state to MUTED, given finding
    organizations/123/sources/456/findings/789, run:

        $ gcloud scc findings set-mute 789 \
            --organization=organizations/123 --source=456 --mute=MUTED

    To update finding's mute state to UNMUTED, given finding
    organizations/123/sources/456/findings/789, run:

        $ gcloud scc findings set-mute 789 \
            --organization=organizations/123 --source=456 --mute=UNMUTED

    To update finding's mute state to MUTED, given finding
    folders/123/sources/456/findings/789, run:

        $ gcloud scc findings set-mute 789 --folder=folders/123 \
            --source=456 --mute=MUTED

    To update finding's mute state to MUTED, given finding
    projects/123/sources/456/findings/789, run:

        $ gcloud scc findings set-mute 789 --project=projects/123 \
            --source=456 --mute=MUTED

    To update finding's mute state to MUTED, given finding
    organizations/123/sources/456/findings/789 and location=eu, run:

        $ gcloud scc findings set-mute 789 \
            --organization=organizations/123 --source=456 --mute=MUTED \
            --location=locations/eu

POSITIONAL ARGUMENTS
     FINDING
        ID of the finding or the full resource name of the finding.

REQUIRED FLAGS
     --mute=MUTE
        Desired mute state of the finding. MUTE must be one of: muted, unmuted,
        undefined.

OPTIONAL FLAGS
     --location=LOCATION; default="global"
        When data residency controls are enabled, this attribute specifies the
        location in which the resource is located and applicable. The location
        attribute can be provided as part of the fully specified resource name
        or with the --location argument on the command line. The default
        location is global.

        NOTE: If you override the endpoint to a regional endpoint
        (https://cloud.google.com/security-command-center/docs/reference/rest/index.html?rep_location=global#regional-service-endpoint)
        you must specify the correct data location
        (https://cloud.google.com/security-command-center/docs/data-residency-support#locations)
        using this flag. The default location on this command is unrelated to
        the default location that is specified when data residency controls are
        enabled for Security Command Center.

        NOTE: If no location is specified, the default location is global AND
        the request will be routed to the SCC V1 API. To use the SCC V2 API -
        please explicitly specify the flag.

     --source=SOURCE
        ID of the source.

     At most one of these can be specified:

       --folder=FOLDER
          Folder where the finding resides. Formatted as folders/456 or just
          456.

       --organization=ORGANIZATION
          Organization where the finding resides. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (id or number) where the finding resides. Formatted as
          projects/789 or just 789.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the Security Command Center API. For more information,
    see Security Command Center API.
    (https://cloud.google.com/security-command-center/docs/reference/rest)

NOTES
    This variant is also available:

        $ gcloud alpha scc findings set-mute
```

### gcloud scc findings update

```text
NAME
    gcloud scc findings update - update a Security Command Center finding

SYNOPSIS
    gcloud scc findings update FINDING [--event-time=EVENT_TIME]
        [--external-uri=EXTERNAL_URI] [--location=LOCATION; default="global"]
        [--source=SOURCE; default="-"] [--source-properties=[KEY=VALUE,...]]
        [--state=STATE] [--update-mask=UPDATE_MASK]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Security Command Center finding.

EXAMPLES
    Update testFinding's state from ACTIVE to INACTIVE:

        $ gcloud scc findings update `testFinding` --organization=123456 \
            --source=5678 --state=INACTIVE

    Update testFinding's state from ACTIVE to INACTIVE using project name for
    example-project:

        $ gcloud scc findings update \
            projects/example-project/sources/5678/findings/testFinding \
            --state=INACTIVE

    Update testFinding's state from ACTIVE to INACTIVE using folder name 456:

        $ gcloud scc findings update \
            folders/456/sources/5678/findings/testFinding --state=INACTIVE

    Override all source properties on testFinding:

        $ gcloud scc findings update `testFinding` --organization=123456 \
            --source=5678 \
            --source-properties="propKey1=propVal1,propKey2=propVal2"

    Selectively update a specific source property on testFinding:

        $ gcloud scc findings update `testFinding` --organization=123456 \
            --source=5678 \
            --source-properties="propKey1=propVal1,propKey2=propVal2" \
            --update-mask="source_properties.propKey1"

    Update finding testFinding with location=eu, state from ACTIVE to INACTIVE:

        $ gcloud scc findings update `testFinding` --organization=123456 \
            --source=5678 --state=INACTIVE --location=eu

POSITIONAL ARGUMENTS
     FINDING
        ID of the finding or fully qualified identifier for the finding.

FLAGS
     --event-time=EVENT_TIME
        Time at which the event took place. For example, if the finding
        represents an open firewall it would capture the time the open firewall
        was detected. If event-time is not provided, it will default to UTC
        version of NOW. See $ gcloud topic datetimes for information on
        supported time formats.

     --external-uri=EXTERNAL_URI
        URI that, if available, points to a web page outside of Cloud SCC
        (Security Command Center) where additional information about the
        finding can be found. This field is guaranteed to be either empty or a
        well formed URL.

     --location=LOCATION; default="global"
        When data residency controls are enabled, this attribute specifies the
        location in which the resource is located and applicable. The location
        attribute can be provided as part of the fully specified resource name
        or with the --location argument on the command line. The default
        location is global.

        NOTE: If you override the endpoint to a regional endpoint
        (https://cloud.google.com/security-command-center/docs/reference/rest/index.html?rep_location=global#regional-service-endpoint)
        you must specify the correct data location
        (https://cloud.google.com/security-command-center/docs/data-residency-support#locations)
        using this flag. The default location on this command is unrelated to
        the default location that is specified when data residency controls are
        enabled for Security Command Center.

        NOTE: If no location is specified, the default location is global AND
        the request will be routed to the SCC V1 API. To use the SCC V2 API -
        please explicitly specify the flag.

     --source=SOURCE; default="-"
        Source id. Defaults to all sources.

     --source-properties=[KEY=VALUE,...]
        Source specific properties. These properties are managed by the source
        that writes the finding. The key names in the source_properties map
        must be between 1 and 255 characters, and must start with a letter and
        contain alphanumeric characters or underscores only. For example
        "key1=val1,key2=val2"

     --state=STATE
        State is one of: [ACTIVE, INACTIVE]. STATE must be one of: active,
        inactive, state-unspecified.

     --update-mask=UPDATE_MASK
        Optional: If left unspecified (default), an update-mask is
        automatically created using the flags specified in the command and only
        those values are updated. For example: --external-uri='<some-uri>'
        --event-time='<some-time>' would automatically generate
        --update-mask='external_uri,event_time'. Note that as a result, only
        external-uri and event-time are updated for the given finding and
        everything else remains untouched. If you want to delete
        attributes/properties (that are not being changed in the update
        command) use an empty update-mask (''). That will delete all the
        mutable properties/attributes that aren't specified as flags in the
        update command. In the above example it would delete source-properties.
        State can be toggled from ACTIVE to INACTIVE and vice-versa but it
        cannot be deleted.

     At most one of these can be specified:

       --folder=FOLDER
          The folder ID (e.g., 456) that contains the finding.

       --organization=ORGANIZATION
          The organization ID (e.g., 123) that contains the finding.

       --project=PROJECT
          The project ID (e.g., example-project) that contains the finding.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the Security Command Center API. For more information,
    see Security Command Center API.
    (https://cloud.google.com/security-command-center/docs/reference/rest)

NOTES
    These variants are also available:

        $ gcloud alpha scc findings update

        $ gcloud beta scc findings update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud scc findings update testFinding \
    --organization=123456 \
    --source=5678 \
    --state=INACTIVE

gcloud scc findings update testFinding \
    --organization=123456 \
    --source=5678 \
    --source-properties="propKey1=propVal1,propKey2=propVal2"

gcloud scc findings update testFinding \
    --organization=123456 \
    --source=5678 \
    --source-properties="propKey1=propVal1,propKey2=propVal2" \
    --update-mask="source_properties.propKey1"

gcloud scc findings update testFinding \
    --organization=123456 \
    --source=5678 \
    --state=INACTIVE \
    --location=eu
```

### gcloud scc findings update-marks

```text
NAME
    gcloud scc findings update-marks - update Security Command Center finding's
        security marks

SYNOPSIS
    gcloud scc findings update-marks FINDING
        [--location=LOCATION; default="global"]
        [--security-marks=[KEY=VALUE,...]] [--source=SOURCE; default="-"]
        [--start-time=START_TIME] [--update-mask=UPDATE_MASK]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update Security Command Center finding's security marks.

EXAMPLES
    Selectively update security mark Key1 with value v1 on testFinding. Note
    that other security marks on testFinding are untouched:

        $ gcloud scc findings update-marks `testFinding` \
            --organization=123456 --source=5678 --security-marks="key1=v1" \
            --update-mask="marks.markKey1"

    Update all security marks on testFinding, under project example-project and
    source 5678:

        $ gcloud scc findings update-marks \
            projects/example-project/sources/5678/findings/testFinding \
            --security-marks="key1=v1,key2=v2"

    Update all security marks on testFinding, under folder 456 and source 5678:

        $ gcloud scc findings update-marks \
            folders/456/sources/5678/findings/testFinding \
            --security-marks="key1=v1,key2=v2"

    Update all security marks on testFinding, under organization 123456 and
    source 5678:

        $ gcloud scc findings update-marks `testFinding` \
            --organization=123456 --source=5678 \
            --security-marks="key1=v1,key2=v2"

    Delete all security marks on testFinding:

        $ gcloud scc findings update-marks `testFinding` \
            --organization=123456 --source=5678 --security-marks=""

    Update all security marks on testFinding, under project example-project,
    source 5678 and location=eu:

        $ gcloud scc findings update-marks \
            projects/example-project/sources/5678/findings/testFinding \
            --security-marks="key1=v1,key2=v2" --location=eu

POSITIONAL ARGUMENTS
     FINDING
        ID of the finding or fully qualified identifier for the finding.

FLAGS
     --location=LOCATION; default="global"
        When data residency controls are enabled, this attribute specifies the
        location in which the resource is located and applicable. The location
        attribute can be provided as part of the fully specified resource name
        or with the --location argument on the command line. The default
        location is global.

        NOTE: If you override the endpoint to a regional endpoint
        (https://cloud.google.com/security-command-center/docs/reference/rest/index.html?rep_location=global#regional-service-endpoint)
        you must specify the correct data location
        (https://cloud.google.com/security-command-center/docs/data-residency-support#locations)
        using this flag. The default location on this command is unrelated to
        the default location that is specified when data residency controls are
        enabled for Security Command Center.

        NOTE: If no location is specified, the default location is global AND
        the request will be routed to the SCC V1 API. To use the SCC V2 API -
        please explicitly specify the flag.

     --security-marks=[KEY=VALUE,...]
        SecurityMarks resource to be passed as the request body. It's a
        key=value pair separated by comma (,). For example:
        --security-marks="key1=val1,key2=val2".

     --source=SOURCE; default="-"
        Source id. Defaults to all sources.

     --start-time=START_TIME
        Time at which the updated SecurityMarks take effect. See $ gcloud topic
        datetimes for information on supported time formats.

     --update-mask=UPDATE_MASK
        Use update-mask if you want to selectively update marks represented by
        --security-marks flag. For example:
        --update-mask="marks.key1,marks.key2". If you want to override all the
        marks for the given finding either skip the update-mask flag or provide
        an empty value (--update-mask '') for it.

     At most one of these can be specified:

       --folder=FOLDER
          The folder ID (e.g., 456) that contains the finding.

       --organization=ORGANIZATION
          The organization ID (e.g., 123) that contains the finding.

       --project=PROJECT
          The project ID (e.g., example-project) that contains the finding.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the Security Command Center API. For more information,
    see Security Command Center API.
    (https://cloud.google.com/security-command-center/docs/reference/rest)

NOTES
    These variants are also available:

        $ gcloud alpha scc findings update-marks

        $ gcloud beta scc findings update-marks
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud scc findings update-marks testFinding \
    --organization=123456 \
    --source=5678 \
    --security-marks="key1=v1" \
    --update-mask="marks.markKey1"

gcloud scc findings update-marks testFinding \
    --organization=123456 \
    --source=5678 \
    --security-marks="key1=v1,key2=v2"

gcloud scc findings update-marks testFinding \
    --organization=123456 \
    --source=5678 \
    --security-marks=""
```

### gcloud beta scc findings create

```text
NAME
    gcloud beta scc findings create - create a Security Command Center finding

SYNOPSIS
    gcloud beta scc findings create
        (FINDING : --organization=ORGANIZATION --source=SOURCE)
        --category=CATEGORY --event-time=EVENT_TIME
        --resource-name=RESOURCE_NAME [--external-uri=EXTERNAL_URI]
        [--location=LOCATION; default="global"]
        [--source-properties=[KEY=VALUE,...]] [--state=STATE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scc findings group

```text
NAME
    gcloud beta scc findings group - filter an organization or source's
        findings and groups them by their specified properties

SYNOPSIS
    gcloud beta scc findings group [PARENT]
        [--compare-duration=COMPARE_DURATION] [--filter=FILTER]
        [--group-by=GROUP_BY] [--location=LOCATION; default="global"]
        [--page-size=PAGE_SIZE] [--page-token=PAGE_TOKEN]
        [--read-time=READ_TIME] [--source=SOURCE; default="-"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scc findings list

```text
NAME
    gcloud beta scc findings list - list an organization or source's findings

SYNOPSIS
    gcloud beta scc findings list [PARENT]
        [--compare-duration=COMPARE_DURATION] [--field-mask=FIELD_MASK]
        [--location=LOCATION; default="global"] [--order-by=ORDER_BY]
        [--page-token=PAGE_TOKEN] [--read-time=READ_TIME]
        [--source=SOURCE; default="-"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scc findings list-marks

```text
NAME
    gcloud beta scc findings list-marks - list a finding's security marks

SYNOPSIS
    gcloud beta scc findings list-marks FINDING
        [--location=LOCATION; default="global"] [--page-token=PAGE_TOKEN]
        [--read-time=READ_TIME] [--source=SOURCE; default="-"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scc findings update

```text
NAME
    gcloud beta scc findings update - update a Security Command Center finding

SYNOPSIS
    gcloud beta scc findings update FINDING [--event-time=EVENT_TIME]
        [--external-uri=EXTERNAL_URI] [--location=LOCATION; default="global"]
        [--source=SOURCE; default="-"] [--source-properties=[KEY=VALUE,...]]
        [--state=STATE] [--update-mask=UPDATE_MASK]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scc findings update-marks

```text
NAME
    gcloud beta scc findings update-marks - update Security Command Center
        finding's security marks

SYNOPSIS
    gcloud beta scc findings update-marks FINDING
        [--location=LOCATION; default="global"]
        [--security-marks=[KEY=VALUE,...]] [--source=SOURCE; default="-"]
        [--start-time=START_TIME] [--update-mask=UPDATE_MASK]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc findings bulk-mute

```text
NAME
    gcloud alpha scc findings bulk-mute - bulk mute Security Command Center
        findings based on a filter

SYNOPSIS
    gcloud alpha scc findings bulk-mute --filter=FILTER
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--location=LOCATION; default="global"]
        [--mute-state=MUTE_STATE; default="muted"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc findings create

```text
NAME
    gcloud alpha scc findings create - create a Security Command Center finding

SYNOPSIS
    gcloud alpha scc findings create
        (FINDING : --organization=ORGANIZATION --source=SOURCE)
        --category=CATEGORY --event-time=EVENT_TIME
        --resource-name=RESOURCE_NAME [--external-uri=EXTERNAL_URI]
        [--location=LOCATION; default="global"]
        [--source-properties=[KEY=VALUE,...]] [--state=STATE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc findings export-to-bigquery

```text
NAME
    gcloud alpha scc findings export-to-bigquery - export Security Command
        Center findings to bigquery

SYNOPSIS
    gcloud alpha scc findings export-to-bigquery [PARENT] --dataset=DATASET
        [--location=LOCATION; default="global"] [--source=SOURCE; default="-"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc findings group

```text
NAME
    gcloud alpha scc findings group - filter an organization or source's
        findings and groups them by their specified properties

SYNOPSIS
    gcloud alpha scc findings group [PARENT]
        [--compare-duration=COMPARE_DURATION] [--filter=FILTER]
        [--group-by=GROUP_BY] [--location=LOCATION; default="global"]
        [--page-size=PAGE_SIZE] [--page-token=PAGE_TOKEN]
        [--read-time=READ_TIME] [--source=SOURCE; default="-"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc findings list

```text
NAME
    gcloud alpha scc findings list - list an organization or source's findings

SYNOPSIS
    gcloud alpha scc findings list [PARENT]
        [--compare-duration=COMPARE_DURATION] [--field-mask=FIELD_MASK]
        [--location=LOCATION; default="global"] [--order-by=ORDER_BY]
        [--page-token=PAGE_TOKEN] [--read-time=READ_TIME]
        [--source=SOURCE; default="-"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc findings list-marks

```text
NAME
    gcloud alpha scc findings list-marks - list a finding's security marks

SYNOPSIS
    gcloud alpha scc findings list-marks FINDING
        [--location=LOCATION; default="global"] [--page-token=PAGE_TOKEN]
        [--read-time=READ_TIME] [--source=SOURCE; default="-"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc findings set-mute

```text
NAME
    gcloud alpha scc findings set-mute - update a Security Command Center
        finding's mute state

SYNOPSIS
    gcloud alpha scc findings set-mute FINDING --mute=MUTE
        [--location=LOCATION; default="global"] [--source=SOURCE]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud scc findings group --compare-duration`: "The --compare-duration option is deprecated. For more information, see the deprecation notice (https://cloud.google.com/security-command-center/docs/release-notes#April_15_2024) on the SCC release notes page."; `gcloud scc findings group --read-time`: "The --read-time option is deprecated. For more information, see the deprecation notice (https://cloud.google.com/security-command-center/docs/release-notes#April_15_2024) on the SCC release notes page."; `gcloud scc findings list --compare-duration`: "The --compare-duration option is deprecated. For more information, see the deprecation notice (https://cloud.google.com/security-command-center/docs/release-notes#April_15_2024) on the SCC release notes page."; `gcloud scc findings list --read-time`: "The --read-time option is deprecated. For more information, see the deprecation notice (https://cloud.google.com/security-command-center/docs/release-notes#April_15_2024) on the SCC release notes page."; `gcloud scc findings list-marks --read-time`: "The --read-time option is deprecated. For more information, see the deprecation notice (https://cloud.google.com/security-command-center/docs/release-notes#April_15_2024) on the SCC release notes page.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create`, `list-marks`, `update` and `update-marks` examples wrap the finding ID in backticks (`` `testFinding` ``), which the shell runs as a command substitution; gcloud 593.0.0 then fails with "Finding must match either the full resource name or only the finding id." The runnable form passes `testFinding`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` example with `--filter` ends the value with `1546304400000""`; the second `"` opens a quotation that is never closed, so the shell keeps reading into the next example. The runnable form closes the value with a single `"`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/findings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
