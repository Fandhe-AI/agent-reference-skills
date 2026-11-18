---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/assets
---

# gcloud scc assets

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scc assets describe

```text
NAME
    gcloud scc assets describe - describe an asset given its resource name or
        asset id

SYNOPSIS
    gcloud scc assets describe [PARENT]
        (--asset=ASSET | --resource-name=RESOURCE_NAME) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Security Command Center Asset APIs are deprecated and will be
    removed on or after June 26, 2024. Use Cloud Asset Inventory instead
    (gcloud asset) (https://cloud.google.com/sdk/gcloud/reference/asset). For
    more information, see the deprecation notice at Assets Page
    (https://cloud.google.com/security-command-center/docs/how-to-use-security-command-center#assets_page).

    Describe an asset given its resource name or asset id.

EXAMPLES
    Describe an asset under organization 123456, given its full resource name
    (https://cloud.google.com/apis/design/resource_names#full_resource_name)
    e.g. //storage.googleapis.com/my-bucket:

        $ gcloud scc assets describe 123456 \
            --resource-name="//storage.googleapis.com/my-bucket"

    Describe an asset under organization 123456, given its Cloud SCC asset id
    5678

        $ gcloud scc assets describe 123456 --asset=5678

    Describe an asset under project example-project, given its Cloud SCC asset
    id 5678

        $ gcloud scc assets describe projects/example-project/assets/5678

    Describe an asset under folder 456, given its Cloud SCC asset id 5678

        $ gcloud scc assets describe folders/456/assets/5678

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
     Exactly one of these must be specified:

       --asset=ASSET
          Cloud SCC specific asset. It's derived from the the asset's relative
          resource name. See:
          https://cloud.google.com/apis/design/resource_names#relative_resource_name.
          For Example, for the given asset name:
          "organizations/123/assets/456", 456 represents asset id.

       --resource-name=RESOURCE_NAME
          Asset's resource name. Full resource name of the Google Cloud
          Platform resource this asset represents. This field is immutable
          after create time. See:
          https://cloud.google.com/apis/design/resource_names#full_resource_name.
          For Example:
          "//cloudresourcemanager.googleapis.com/projects/1234567890123" could
          be the resource-name for a project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securitycenter/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    These variants are also available:

        $ gcloud alpha scc assets describe

        $ gcloud beta scc assets describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud scc assets describe projects/example-project \
    --asset=5678

gcloud scc assets describe folders/456 \
    --asset=5678
```

### gcloud scc assets get-parent

```text
NAME
    gcloud scc assets get-parent - get the Parent for an asset given its
        resource name or asset id

SYNOPSIS
    gcloud scc assets get-parent [ORGANIZATION]
        (--asset=ASSET | --resource-name=RESOURCE_NAME) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Security Command Center Asset APIs are deprecated and will be
    removed on or after June 26, 2024. Use Cloud Asset Inventory instead
    (gcloud asset) (https://cloud.google.com/sdk/gcloud/reference/asset). For
    more information, see the deprecation notice at Assets Page
    (https://cloud.google.com/security-command-center/docs/how-to-use-security-command-center#assets_page).

    Get the Parent for an asset given its resource name or asset id.

EXAMPLES
    Get parent's relative resource name given an asset's full resource name
    (https://cloud.google.com/apis/design/resource_names#full_resource_name)
    e.g. //storage.googleapis.com/my-bucket under organization 123456:

        $ gcloud scc assets get-parent 123456 \
            --resource-name="//storage.googleapis.com/my-bucket"

    Get parent's relative resource name given an asset's Cloud SCC id 5678
    under organization 123456.

        $ gcloud scc assets get-parent 123456 --asset=5678

POSITIONAL ARGUMENTS
     Organization resource - The organization to be used for the SCC (Security
     Command Center) command. This represents a Cloud resource.

     [ORGANIZATION]
        ID of the organization or fully qualified identifier for the
        organization.

        To set the organization attribute:
        * provide the argument organization on the command line;
        * Set the organization property in configuration using gcloud config
          set scc/organization if it is not specified in command line..

REQUIRED FLAGS
     Exactly one of these must be specified:

       --asset=ASSET
          Cloud SCC specific asset. It's derived from the the asset's relative
          resource name. See:
          https://cloud.google.com/apis/design/resource_names#relative_resource_name.
          For Example, for the given asset name:
          "organizations/123/assets/456", 456 represents asset id.

       --resource-name=RESOURCE_NAME
          Asset's resource name. Full resource name of the Google Cloud
          Platform resource this asset represents. This field is immutable
          after create time. See:
          https://cloud.google.com/apis/design/resource_names#full_resource_name.
          For Example:
          "//cloudresourcemanager.googleapis.com/projects/1234567890123" could
          be the resource-name for a project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securitycenter/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    These variants are also available:

        $ gcloud alpha scc assets get-parent

        $ gcloud beta scc assets get-parent
```

### gcloud scc assets get-project

```text
NAME
    gcloud scc assets get-project - get the Project for an asset given its
        resource name or asset id

SYNOPSIS
    gcloud scc assets get-project [ORGANIZATION]
        (--asset=ASSET | --resource-name=RESOURCE_NAME) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Security Command Center Asset APIs are deprecated and will be
    removed on or after June 26, 2024. Use Cloud Asset Inventory instead
    (gcloud asset) (https://cloud.google.com/sdk/gcloud/reference/asset). For
    more information, see the deprecation notice at Assets Page
    (https://cloud.google.com/security-command-center/docs/how-to-use-security-command-center#assets_page).

    Get the Project for an asset given its resource name or asset id.

EXAMPLES
    Get project id
    (https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects)
    given an asset's full resource name
    (https://cloud.google.com/apis/design/resource_names#full_resource_name)
    e.g. //storage.googleapis.com/my-bucket under organization 123456:

        $ gcloud scc assets get-project 123456 \
            --resource-name="//storage.googleapis.com/my-bucket"

    Get project id given an asset's Cloud SCC id 5678 under organization
    123456.

        $ gcloud scc assets get-project 123456 --asset=5678

POSITIONAL ARGUMENTS
     Organization resource - The organization to be used for the SCC (Security
     Command Center) command. This represents a Cloud resource.

     [ORGANIZATION]
        ID of the organization or fully qualified identifier for the
        organization.

        To set the organization attribute:
        * provide the argument organization on the command line;
        * Set the organization property in configuration using gcloud config
          set scc/organization if it is not specified in command line..

REQUIRED FLAGS
     Exactly one of these must be specified:

       --asset=ASSET
          Cloud SCC specific asset. It's derived from the the asset's relative
          resource name. See:
          https://cloud.google.com/apis/design/resource_names#relative_resource_name.
          For Example, for the given asset name:
          "organizations/123/assets/456", 456 represents asset id.

       --resource-name=RESOURCE_NAME
          Asset's resource name. Full resource name of the Google Cloud
          Platform resource this asset represents. This field is immutable
          after create time. See:
          https://cloud.google.com/apis/design/resource_names#full_resource_name.
          For Example:
          "//cloudresourcemanager.googleapis.com/projects/1234567890123" could
          be the resource-name for a project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securitycenter/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    These variants are also available:

        $ gcloud alpha scc assets get-project

        $ gcloud beta scc assets get-project
```

### gcloud scc assets group

```text
NAME
    gcloud scc assets group - filter an organization's assets and groups them
        by their specified properties

SYNOPSIS
    gcloud scc assets group [PARENT] [--compare-duration=COMPARE_DURATION]
        [--filter=FILTER] [--group-by=GROUP_BY] [--page-size=PAGE_SIZE]
        [--page-token=PAGE_TOKEN] [--read-time=READ_TIME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Security Command Center Asset APIs are deprecated and will be
    removed on or after June 26, 2024. Use Cloud Asset Inventory instead
    (gcloud asset) (https://cloud.google.com/sdk/gcloud/reference/asset). For
    more information, see the deprecation notice at Assets Page
    (https://cloud.google.com/security-command-center/docs/how-to-use-security-command-center#assets_page).

    Filter an organization's assets and groups them by their specified
    properties.

EXAMPLES
    Group assets under organization 123456 by their type (e.g. project, disk,
    compute instance, service etc):

        $ gcloud scc assets group 123456 \
            --group-by="security_center_properties.resource_type"

    Group assets under project example-project by their type (e.g. project,
    disk, compute instance, service etc):

        $ gcloud scc assets group projects/example-project \
            --group-by="security_center_properties.resource_type"

    Group assets under folder 456 by their type (e.g. project, disk, compute
    instance, service etc):

        $ gcloud scc assets group folders/456 \
            --group-by="security_center_properties.resource_type"

    Group compute instances (assets) under organization 123456 by their
    respective projects:

        $ gcloud scc assets group 123456 \
            --filter="security_center_properties.resource_type=\"google.comp\
        ute.Instance\"" \
        --group-by="security_center_properties.resource_project"

    Group assets that were updated on or after 2019-01-01T01:00:00 GMT by their
    types.

        $ gcloud scc assets group 123456 \
            --filter="update_time >= 1546304400000" \
            --group-by="security_center_properties.resource_type"

    Group assets into following 3 state_changes (ADDED/DELETED/ACTIVE) based on
    the activity during past 24 hours:

        $ gcloud scc assets group 123456 --compare-duration=86400s \
            --group-by="state_change"

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
        The result's "state_change" attribute is updated to indicate whether
        the asset was added, removed, or remained present during the
        compare_duration period of time that precedes the read_time. See $
        gcloud topic datetimes for information on supported duration formats.

     --filter=FILTER
        Expression is a list of one or more restrictions combined via logical
        operators 'AND' and 'OR'. Parentheses are not supported, and 'OR' has
        higher precedence than 'AND'. For example, 'update_time > 100 AND
        security_center_properties.resource_type=\"google.cloud.resourcemanager.Organization\"'
        is a valid filter string.

     --group-by=GROUP_BY
        Expression that defines what asset fields to use for grouping
        (including 'state'). String value should follow SQL syntax: comma
        separated list of fields. For example: "parent,resource_name". The
        following fields are supported:
        * security_center_properties.resource_project
        * security_center_properties.resource_type
        * security_center_properties.resource_parent
        * state_change

     --page-size=PAGE_SIZE
        The maximum number of results to return in a single response. Default
        is 10, minimum is 1, maximum is 1000.

     --page-token=PAGE_TOKEN
        Value returned by the last 'GroupAssetsResponse'; indicates that this
        is a continuation of a prior 'GroupAssets' call, and that the system
        should return the next page of data.

     --read-time=READ_TIME
        Time used as a reference point when filtering. Absence of this field
        will default to the API's version of NOW. See $ gcloud topic datetimes
        for information on supported time formats.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securitycenter/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    These variants are also available:

        $ gcloud alpha scc assets group

        $ gcloud beta scc assets group
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud scc assets group 123456 \
    --filter="security_center_properties.resource_type=\"google.compute.Instance\"" \
    --group-by="security_center_properties.resource_project"
```

### gcloud scc assets list

```text
NAME
    gcloud scc assets list - list Cloud Security Command Center assets

SYNOPSIS
    gcloud scc assets list [PARENT] [--compare-duration=COMPARE_DURATION]
        [--field-mask=FIELD_MASK] [--order-by=ORDER_BY]
        [--page-token=PAGE_TOKEN] [--read-time=READ_TIME] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Security Command Center Asset APIs are deprecated and will be
    removed on or after June 26, 2024. Use Cloud Asset Inventory instead
    (gcloud asset) (https://cloud.google.com/sdk/gcloud/reference/asset). For
    more information, see the deprecation notice at Assets Page
    (https://cloud.google.com/security-command-center/docs/how-to-use-security-command-center#assets_page).

    List Cloud Security Command Center assets.

EXAMPLES
    List all assets under organization (123456)

        $ gcloud scc assets list 123456

    List all assets under project (example-project)

        $ gcloud scc assets list projects/example-project

    List all assets under folder (456)

        $ gcloud scc assets list folders/456

    List all assets under organization (123456) that were present as of
    2019-01-01T01:00:00 GMT time.

        $ gcloud scc assets list 123456 --read-time="2019-01-01T01:00:00Z"

    Only list category and resource_name for all assets under organization
    (123456):

        $ gcloud scc assets list 123456 --field-mask="category,resource_name"

    List all compute instances under organization (123456):

        $ gcloud scc assets list 123456 \
            --filter="security_center_properties.resource_type=\"google.comp\
        ute.Instance\""

    List all firewall rules that have open HTTP Ports:

        $ gcloud scc assets list 123456 \
            --filter="security_center_properties.resource_type = \
        \"google.compute.Firewall\" AND resource_properties.name \
            =\"default-allow-http\""

    List all assets that belong to either projects: 5678 OR 78910 (project's
    numeric identifier).

        $ gcloud scc assets list 123456 \
            --filter="security_center_properties.resource_parent = \
        \"//cloudresourcemanager.googleapis.com/projects/5678\" OR \
            security_center_properties.resource_parent = "\78910\""

    List all projects that are owned by a user:someone@domain.com. Notice the
    usage of : which enforces partial matching.

        $ gcloud scc assets list 123456 \
            --filter="security_center_properties.resource_type = \
        \"google.cloud.resourcemanager.Project\" AND \
            security_center_properties.resource_owners : \
            \"user:someone@domain.com\""

    List assets and add a state_change property that indicates if the asset was
    added, removed, or remained present during the past 24 hours period:

        $ gcloud scc assets list 123456 --compare-duration=86400s

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
        The result's "state_change" attribute is updated to indicate whether
        the asset was added, removed, or remained present during the
        compare_duration period of time that precedes the read_time. See $
        gcloud topic datetimes for information on supported duration formats.

     --field-mask=FIELD_MASK
        Field mask to specify the Asset fields to be listed in the response. An
        empty field mask will list all fields. Example field mask:
        "asset.security_center_properties.resource_type,asset.security_center_properties.resource_parent"

     --order-by=ORDER_BY
        Expression that defines what fields and order to use for sorting.
        Example order by: "resource_properties.sort_prop ASC"

     --page-token=PAGE_TOKEN
        The value returned by the last 'ListAssetsResponse'; indicates that
        this is a continuation of a prior 'ListAssets' call, and that the
        system should return the next page of data.

     --read-time=READ_TIME
        Time used as a reference point when filtering. Absence of this field
        will default to the API's version of NOW. See $ gcloud topic datetimes
        for information on supported time formats.

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
    This command uses the securitycenter/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    These variants are also available:

        $ gcloud alpha scc assets list

        $ gcloud beta scc assets list
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud scc assets list 123456 \
    --filter="security_center_properties.resource_type=\"google.compute.Instance\""

gcloud scc assets list 123456 \
    --filter="security_center_properties.resource_parent = \"//cloudresourcemanager.googleapis.com/projects/5678\" OR security_center_properties.resource_parent = \"//cloudresourcemanager.googleapis.com/projects/78910\""
```

### gcloud scc assets list-marks

```text
NAME
    gcloud scc assets list-marks - list an assets's security marks

SYNOPSIS
    gcloud scc assets list-marks (ASSET : --organization=ORGANIZATION)
        [--page-token=PAGE_TOKEN] [--read-time=READ_TIME] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Security Command Center Asset APIs are deprecated and will be
    removed on or after June 26, 2024. Use Cloud Asset Inventory instead
    (gcloud asset) (https://cloud.google.com/sdk/gcloud/reference/asset). For
    more information, see the deprecation notice at Assets Page
    (https://cloud.google.com/security-command-center/docs/how-to-use-security-command-center#assets_page).

    List an assets's security marks.

EXAMPLES
    List all security marks for asset (8910) under organization (123456):

        $ gcloud scc assets list-marks 8910 --organization=123456

    List all security marks for asset (8910) under project (example-project):

        $ gcloud scc assets list-marks \
            projects/example-project/assets/8910 --organization=123456

    List all security marks for asset (8910) under folder (456):

        $ gcloud scc assets list-marks folders/456/assets/8910 \
            --organization=123456

POSITIONAL ARGUMENTS
     Asset resource - The asset to be used for the SCC (Security Command
     Center) command. The arguments in this group can be used to specify the
     attributes of this resource.

     This must be specified.

       ASSET
          ID of the asset or fully qualified identifier for the asset.

          To set the asset attribute:
          + provide the argument asset on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --organization=ORGANIZATION
          (Optional) If the full resource name isn't provided e.g.
          organizations/123, then provide the organization id which is the
          suffix of the organization. Example: organizations/123, the id is
          123.

          To set the organization attribute:
          + provide the argument asset on the command line with a fully
            specified name;
          + provide the argument --organization on the command line;
          + Set the organization property in configuration using gcloud
            config set scc/organization if it is not specified in command
            line..

FLAGS
     --page-token=PAGE_TOKEN
        Response objects will return a non-null value for page-token to
        indicate that there is at least one additional page of data. User can
        either directly request that page by specifying the page-token
        explicitly or let gcloud fetch one-page-at-a-time.

     --read-time=READ_TIME
        Time used as a reference point when filtering. Absence of this field
        will default to the API's version of NOW. See $ gcloud topic datetimes
        for information on supported time formats.

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
    This command uses the securitycenter/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    These variants are also available:

        $ gcloud alpha scc assets list-marks

        $ gcloud beta scc assets list-marks
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud scc assets list-marks projects/example-project/assets/8910

gcloud scc assets list-marks folders/456/assets/8910
```

### gcloud scc assets run-discovery

```text
NAME
    gcloud scc assets run-discovery - scan an organization for
        new/modified/deleted assets

SYNOPSIS
    gcloud scc assets run-discovery [ORGANIZATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Security Command Center Asset APIs are deprecated and will be
    removed on or after June 26, 2024. Use Cloud Asset Inventory instead
    (gcloud asset) (https://cloud.google.com/sdk/gcloud/reference/asset). For
    more information, see the deprecation notice at Assets Page
    (https://cloud.google.com/security-command-center/docs/how-to-use-security-command-center#assets_page).

    Scan an organization for new/modified/deleted assets. Note that this API
    can only be called with limited frequency for an organization. If it is
    called too frequently the caller will receive a TOO_MANY_REQUESTS error.

EXAMPLES
    Run new scan for organization (123456):

        $ gcloud scc assets run-discovery 123456

POSITIONAL ARGUMENTS
     Organization resource - The organization for which scan should be run.
     This represents a Cloud resource.

     [ORGANIZATION]
        ID of the organization or fully qualified identifier for the
        organization.

        To set the organization attribute:
        * provide the argument organization on the command line;
        * Set the organization property in configuration using gcloud config
          set scc/organization if it is not specified in command line..

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securitycenter/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    These variants are also available:

        $ gcloud alpha scc assets run-discovery

        $ gcloud beta scc assets run-discovery
```

### gcloud scc assets update-marks

```text
NAME
    gcloud scc assets update-marks - update Cloud Security Command Center
        asset's security marks

SYNOPSIS
    gcloud scc assets update-marks (ASSET : --organization=ORGANIZATION)
        [--security-marks=[KEY=VALUE,...]] [--start-time=START_TIME]
        [--update-mask=UPDATE_MASK] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update Cloud Security Command Center asset's security marks.

EXAMPLES
    Selectively update value of security mark (key1) with 'val1.1' on asset
    5678 under organization 123456. Note that other security marks on the same
    asset will not change.

        $ gcloud scc assets update-marks 5678 --organization=123456 \
            --security-marks="key1=val1.1" --update-mask="marks.key1"

    Update value of security mark (key1) and delete other marks on asset 5678
    under organization 123456:

        $ gcloud scc assets update-marks 5678 --organization=123456 \
            --security-marks="key1=updatedVal"

    Update value of security mark (key1) and delete other marks on asset 5678
    under project example-project:

        $ gcloud scc assets update-marks \
            projects/example-project/assets/5678 \
            --security-marks="key1=updatedVal"

    Update value of security mark (key1) and delete other marks on asset 5678
    under folder 456:

        $ gcloud scc assets update-marks folders/456/assets/5678 \
            --security-marks="key1=updatedVal"

    Delete all security marks on asset 5678 under organization 123456:

        $ gcloud scc assets update-marks 5678 --organization=123456 \
            --security-marks=""

POSITIONAL ARGUMENTS
     Asset resource - The asset to be used for the SCC (Security Command
     Center) command. The arguments in this group can be used to specify the
     attributes of this resource.

     This must be specified.

       ASSET
          ID of the asset or fully qualified identifier for the asset.

          To set the asset attribute:
          + provide the argument asset on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --organization=ORGANIZATION
          (Optional) If the full resource name isn't provided e.g.
          organizations/123, then provide the organization id which is the
          suffix of the organization. Example: organizations/123, the id is
          123.

          To set the organization attribute:
          + provide the argument asset on the command line with a fully
            specified name;
          + provide the argument --organization on the command line;
          + Set the organization property in configuration using gcloud
            config set scc/organization if it is not specified in command
            line..

FLAGS
     --security-marks=[KEY=VALUE,...]
        SecurityMarks resource to be passed as the request body. It's a
        key=value pair separated by comma (,). For example:
        --security-marks="key1=val1,key2=val2".

     --start-time=START_TIME
        Time at which the updated SecurityMarks take effect. See $ gcloud topic
        datetimes for information on supported time formats.

     --update-mask=UPDATE_MASK
        Use update-mask if you want to selectively update marks represented by
        --security-marks flag. For example:
        --update-mask="marks.key1,marks.key2". If you want to override all the
        marks for the given asset either skip the update-mask flag or provide
        an empty value (--update-mask '') for it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securitycenter/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    These variants are also available:

        $ gcloud alpha scc assets update-marks

        $ gcloud beta scc assets update-marks
```

### gcloud beta scc assets describe

```text
NAME
    gcloud beta scc assets describe - describe an asset given its resource name
        or asset id

SYNOPSIS
    gcloud beta scc assets describe [PARENT]
        (--asset=ASSET | --resource-name=RESOURCE_NAME) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scc assets get-parent

```text
NAME
    gcloud beta scc assets get-parent - get the Parent for an asset given its
        resource name or asset id

SYNOPSIS
    gcloud beta scc assets get-parent [ORGANIZATION]
        (--asset=ASSET | --resource-name=RESOURCE_NAME) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scc assets get-project

```text
NAME
    gcloud beta scc assets get-project - get the Project for an asset given its
        resource name or asset id

SYNOPSIS
    gcloud beta scc assets get-project [ORGANIZATION]
        (--asset=ASSET | --resource-name=RESOURCE_NAME) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scc assets group

```text
NAME
    gcloud beta scc assets group - filter an organization's assets and groups
        them by their specified properties

SYNOPSIS
    gcloud beta scc assets group [PARENT] [--compare-duration=COMPARE_DURATION]
        [--filter=FILTER] [--group-by=GROUP_BY] [--page-size=PAGE_SIZE]
        [--page-token=PAGE_TOKEN] [--read-time=READ_TIME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scc assets list

```text
NAME
    gcloud beta scc assets list - list Cloud Security Command Center assets

SYNOPSIS
    gcloud beta scc assets list [PARENT] [--compare-duration=COMPARE_DURATION]
        [--field-mask=FIELD_MASK] [--order-by=ORDER_BY]
        [--page-token=PAGE_TOKEN] [--read-time=READ_TIME] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scc assets list-marks

```text
NAME
    gcloud beta scc assets list-marks - list an assets's security marks

SYNOPSIS
    gcloud beta scc assets list-marks (ASSET : --organization=ORGANIZATION)
        [--page-token=PAGE_TOKEN] [--read-time=READ_TIME] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scc assets run-discovery

```text
NAME
    gcloud beta scc assets run-discovery - scan an organization for
        new/modified/deleted assets

SYNOPSIS
    gcloud beta scc assets run-discovery [ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scc assets update-marks

```text
NAME
    gcloud beta scc assets update-marks - update Cloud Security Command Center
        asset's security marks

SYNOPSIS
    gcloud beta scc assets update-marks (ASSET : --organization=ORGANIZATION)
        [--security-marks=[KEY=VALUE,...]] [--start-time=START_TIME]
        [--update-mask=UPDATE_MASK] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc assets describe

```text
NAME
    gcloud alpha scc assets describe - describe an asset given its resource
        name or asset id

SYNOPSIS
    gcloud alpha scc assets describe [PARENT]
        (--asset=ASSET | --resource-name=RESOURCE_NAME) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc assets get-parent

```text
NAME
    gcloud alpha scc assets get-parent - get the Parent for an asset given its
        resource name or asset id

SYNOPSIS
    gcloud alpha scc assets get-parent [ORGANIZATION]
        (--asset=ASSET | --resource-name=RESOURCE_NAME) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc assets get-project

```text
NAME
    gcloud alpha scc assets get-project - get the Project for an asset given
        its resource name or asset id

SYNOPSIS
    gcloud alpha scc assets get-project [ORGANIZATION]
        (--asset=ASSET | --resource-name=RESOURCE_NAME) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc assets group

```text
NAME
    gcloud alpha scc assets group - filter an organization's assets and groups
        them by their specified properties

SYNOPSIS
    gcloud alpha scc assets group [PARENT]
        [--compare-duration=COMPARE_DURATION] [--filter=FILTER]
        [--group-by=GROUP_BY] [--page-size=PAGE_SIZE] [--page-token=PAGE_TOKEN]
        [--read-time=READ_TIME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc assets list

```text
NAME
    gcloud alpha scc assets list - list Cloud Security Command Center assets

SYNOPSIS
    gcloud alpha scc assets list [PARENT] [--compare-duration=COMPARE_DURATION]
        [--field-mask=FIELD_MASK] [--order-by=ORDER_BY]
        [--page-token=PAGE_TOKEN] [--read-time=READ_TIME] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc assets list-marks

```text
NAME
    gcloud alpha scc assets list-marks - list an assets's security marks

SYNOPSIS
    gcloud alpha scc assets list-marks (ASSET : --organization=ORGANIZATION)
        [--page-token=PAGE_TOKEN] [--read-time=READ_TIME] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc assets run-discovery

```text
NAME
    gcloud alpha scc assets run-discovery - scan an organization for
        new/modified/deleted assets

SYNOPSIS
    gcloud alpha scc assets run-discovery [ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc assets update-marks

```text
NAME
    gcloud alpha scc assets update-marks - update Cloud Security Command Center
        asset's security marks

SYNOPSIS
    gcloud alpha scc assets update-marks (ASSET : --organization=ORGANIZATION)
        [--security-marks=[KEY=VALUE,...]] [--start-time=START_TIME]
        [--update-mask=UPDATE_MASK] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud scc assets describe`: "Security Command Center Asset APIs are deprecated and will be removed on or after June 26, 2024. Use Cloud Asset Inventory instead (gcloud asset) (https://cloud.google.com/sdk/gcloud/reference/asset). For more information, see the deprecation notice at Assets Page (https://cloud.google.com/security-command-center/docs/how-to-use-security-command-center#assets_page)."; `gcloud scc assets get-parent`: "Security Command Center Asset APIs are deprecated and will be removed on or after June 26, 2024. Use Cloud Asset Inventory instead (gcloud asset) (https://cloud.google.com/sdk/gcloud/reference/asset). For more information, see the deprecation notice at Assets Page (https://cloud.google.com/security-command-center/docs/how-to-use-security-command-center#assets_page)."; `gcloud scc assets get-project`: "Security Command Center Asset APIs are deprecated and will be removed on or after June 26, 2024. Use Cloud Asset Inventory instead (gcloud asset) (https://cloud.google.com/sdk/gcloud/reference/asset). For more information, see the deprecation notice at Assets Page (https://cloud.google.com/security-command-center/docs/how-to-use-security-command-center#assets_page)."; `gcloud scc assets group`: "Security Command Center Asset APIs are deprecated and will be removed on or after June 26, 2024. Use Cloud Asset Inventory instead (gcloud asset) (https://cloud.google.com/sdk/gcloud/reference/asset). For more information, see the deprecation notice at Assets Page (https://cloud.google.com/security-command-center/docs/how-to-use-security-command-center#assets_page)."; `gcloud scc assets list`: "Security Command Center Asset APIs are deprecated and will be removed on or after June 26, 2024. Use Cloud Asset Inventory instead (gcloud asset) (https://cloud.google.com/sdk/gcloud/reference/asset). For more information, see the deprecation notice at Assets Page (https://cloud.google.com/security-command-center/docs/how-to-use-security-command-center#assets_page)."; `gcloud scc assets list-marks`: "Security Command Center Asset APIs are deprecated and will be removed on or after June 26, 2024. Use Cloud Asset Inventory instead (gcloud asset) (https://cloud.google.com/sdk/gcloud/reference/asset). For more information, see the deprecation notice at Assets Page (https://cloud.google.com/security-command-center/docs/how-to-use-security-command-center#assets_page)."; `gcloud scc assets run-discovery`: "Security Command Center Asset APIs are deprecated and will be removed on or after June 26, 2024. Use Cloud Asset Inventory instead (gcloud asset) (https://cloud.google.com/sdk/gcloud/reference/asset). For more information, see the deprecation notice at Assets Page (https://cloud.google.com/security-command-center/docs/how-to-use-security-command-center#assets_page).".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` example for "projects: 5678 OR 78910" writes the second value as `"\78910\""`, which leaves a quotation open, so the shell keeps reading; the runnable form writes it like the first value of the same filter: `\"//cloudresourcemanager.googleapis.com/projects/78910\"`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the project and folder `describe` examples pass `projects/example-project/assets/5678` and `folders/456/assets/5678` without `--asset` or `--resource-name`; gcloud 593.0.0 fails with "Exactly one of (--asset | --resource-name) must be specified." (SYNOPSIS: `[PARENT] (--asset=ASSET | --resource-name=RESOURCE_NAME)`), so the runnable form passes the parent and the asset ID 5678 as `--asset=5678`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the project and folder `list-marks` examples pass both a full asset name and `--organization=123456`; gcloud 593.0.0 rejects the combination ("Only provide a full resouce name (organizations/123/assets/456) or an --organization flag, not both."), so the runnable form drops `--organization`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/assets (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
