---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/bqexports
---

# gcloud scc bqexports

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scc bqexports create

```text
NAME
    gcloud scc bqexports create - create a Security Command Center BigQuery
        export

SYNOPSIS
    gcloud scc bqexports create BIG_QUERY_EXPORT --dataset=DATASET
        [--[no-]deletion-notifications-enabled] [--description=DESCRIPTION]
        [--filter=FILTER] [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Security Command Center BigQuery export.

    BigQuery exports that are created with Security Command Center API V2 and
    later include a location attribute. If a location is not specified, the
    default global location is used. For example, the following BigQuery export
    name has location=global attribute:
    organizations/123/locations/global/bigQueryExports/test-bq-export.

EXAMPLES
    To create a BigQuery export test-bq-export given organization 123 with a
    dataset abc in project 234 and filter on category that equals to
    XSS_SCRIPTING, run:

        $ gcloud scc bqexports create test-bq-export --organization=123 \
            --dataset=projects/234/datasets/abc \
            --description="This is a test BigQuery export" \
            --filter="category=\"XSS_SCRIPTING\""

    To create a BigQuery export test-bq-export given folder 456 with a dataset
    abc in project 234 and filter on category that equals to XSS_SCRIPTING,
    run:

        $ gcloud scc bqexports create test-bq-export --folder=456 \
            --dataset=projects/234/datasets/abc \
            --description="This is a test BigQuery export" \
            --filter="category=\"XSS_SCRIPTING\""

    To create a BigQuery export test-bq-export given project 789 with a dataset
    abc in project 234 and filter on category that equals to XSS_SCRIPTING,
    run:

        $ gcloud scc bqexports create test-bq-export --project=789 \
            --dataset=projects/234/datasets/abc \
            --description="This is a test BigQuery export" \
            --filter="category=\"XSS_SCRIPTING\""

    To create a BigQuery export test-bq-export given organization 123 and
    location=global to send findings with category=XSS_SCRIPTING to the
    BigQuery dataset abc in project 234, run:

        $ gcloud scc bqexports create test-bq-export --organization=123 \
            --dataset=projects/234/datasets/abc \
            --description="This is a test BigQuery export" \
            --filter="category=\"XSS_SCRIPTING\"" --location=global

POSITIONAL ARGUMENTS
     BIG_QUERY_EXPORT
        ID of the BigQuery export e.g. my-bq-export or the full resource name
        of the BigQuery export e.g.
        organizations/123/bigQueryExports/my-bq-export.

REQUIRED FLAGS
     --dataset=DATASET
        The dataset to write findings updates to.

OPTIONAL FLAGS
     --[no-]deletion-notifications-enabled
        Indicates whether the notifications will be sent for deleted findings.
        Use --deletion-notifications-enabled to enable and
        --no-deletion-notifications-enabled to disable.

     --description=DESCRIPTION
        The text that will be used to describe a BigQuery export.

     --filter=FILTER
        The filter string which will applied to findings muted by a BigQuery
        export.

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

     At most one of these can be specified:

       --folder=FOLDER
          Folder where the BigQuery export resides. Formatted as folders/456 or
          just 456.

       --organization=ORGANIZATION
          Organization where the BigQuery export resides. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (id or number) where the BigQuery export resides. Formatted
          as projects/789 or just 789.

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
```

### gcloud scc bqexports delete

```text
NAME
    gcloud scc bqexports delete - delete a Security Command Center BigQuery
        export

SYNOPSIS
    gcloud scc bqexports delete BIG_QUERY_EXPORT
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Security Command Center BigQuery export.

    BigQuery exports that are created with Security Command Center API V2 and
    later include a location attribute. If the location attribute is included
    in the resource name of a BigQuery export, you must specify it when
    referencing the export. For example, the following BigQuery export name has
    location=eu: organizations/123/locations/eu/bigQueryExports/test-bq-export.

EXAMPLES
    To delete a BigQuery export given organization 123 with id test-bq-export,
    run:

        $ gcloud scc bqexports delete test-bq-export --organization=123

    To delete a BigQuery export given folder 456 with id test-bq-export, run:

        $ gcloud scc bqexports delete test-bq-export --folder=456

    To delete a BigQuery export given project 789 with id test-bq-export, run:

        $ gcloud scc bqexports delete test-bq-export --project=789

    To delete the BigQuery export test-bq-export, with location=global, from
    organization 123, run:

        $ gcloud scc bqexports delete test-bq-export --organization=123 \
            --location=global

POSITIONAL ARGUMENTS
     BIG_QUERY_EXPORT
        ID of the BigQuery export e.g. my-bq-export or the full resource name
        of the BigQuery export e.g.
        organizations/123/bigQueryExports/my-bq-export.

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

     At most one of these can be specified:

       --folder=FOLDER
          Folder where the BigQuery export resides. Formatted as folders/456 or
          just 456.

       --organization=ORGANIZATION
          Organization where the BigQuery export resides. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (id or number) where the BigQuery export resides. Formatted
          as projects/789 or just 789.

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
```

### gcloud scc bqexports get

```text
NAME
    gcloud scc bqexports get - get a Security Command Center BigQuery export

SYNOPSIS
    gcloud scc bqexports get BIG_QUERY_EXPORT
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get a Security Command Center BigQuery export.

    BigQuery exports that are created with Security Command Center API V2 and
    later include a location attribute. If the location attribute is included
    in the resource name of a BigQuery export, you must specify it when
    referencing the export. For example, the following BigQuery export name has
    location=eu: organizations/123/locations/eu/bigQueryExports/test-bq-export.

EXAMPLES
    To get a BigQuery export under given organization 123 with id
    test-bq-export, run:

        $ gcloud scc bqexports get test-bq-export --organization=123

    To get a BigQuery export under given folder 456 with id test-bq-export,
    run:

        $ gcloud scc bqexports get test-bq-export --folder=456

    To get a BigQuery export under given project 789 with id test-bq-export,
    run:

        $ gcloud scc bqexports get test-bq-export --project=789

    To get a BigQuery export under given organization 123 with id
    test-bq-export, and location=global run:

        $ gcloud scc bqexports get test-bq-export --organization=123 \
            --location=global

POSITIONAL ARGUMENTS
     BIG_QUERY_EXPORT
        ID of the BigQuery export e.g. my-bq-export or the full resource name
        of the BigQuery export e.g.
        organizations/123/bigQueryExports/my-bq-export.

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

     At most one of these can be specified:

       --folder=FOLDER
          Folder where the BigQuery export resides. Formatted as folders/456 or
          just 456.

       --organization=ORGANIZATION
          Organization where the BigQuery export resides. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (id or number) where the BigQuery export resides. Formatted
          as projects/789 or just 789.

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
```

### gcloud scc bqexports list

```text
NAME
    gcloud scc bqexports list - list Security Command Center BigQuery exports

SYNOPSIS
    gcloud scc bqexports list
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--location=LOCATION; default="global"] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Security Command Center BigQuery exports.

        BigQuery exports that are created with Security Command Center API V2 and
        later include a `location` attribute. Include the `--location` flag to
        list BigQuery exports with `location` attribute other than `global`.

EXAMPLES
    List BigQuery exports under organization 123:

        $ gcloud scc bqexports list --organization=123

    List BigQuery exports under folder 456:

        $ gcloud scc bqexports list --folder=456

    List BigQuery exports under project 789:

        $ gcloud scc bqexports list --project=789

    List BigQuery exports under organization 123 and location global:

        $ gcloud scc bqexports list --organization=123 --location=global

    List BigQuery exports under organization 123 and location=eu:

        $ gcloud scc bqexports list --organization=123 --location=eu

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER
          Folder where the BigQuery export resides. Formatted as folders/456 or
          just 456.

       --organization=ORGANIZATION
          Organization where the BigQuery export resides. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (id or number) where the BigQuery export resides. Formatted
          as projects/789 or just 789.

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
```

### gcloud scc bqexports update

```text
NAME
    gcloud scc bqexports update - update a Security Command Center BigQuery
        export

SYNOPSIS
    gcloud scc bqexports update BIG_QUERY_EXPORT [--dataset=DATASET]
        [--[no-]deletion-notifications-enabled] [--description=DESCRIPTION]
        [--filter=FILTER] [--location=LOCATION; default="global"]
        [--update-mask=UPDATE_MASK]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Security Command Center BigQuery export.

    BigQuery exports that are created with Security Command Center API V2 and
    later include a location attribute. If the location attribute is included
    in the resource name of a BigQuery export, you must specify it when
    referencing the export. For example, the following BigQuery export name has
    location=eu: organizations/123/locations/eu/bigQueryExports/test-bq-export.

EXAMPLES
    Update a BigQuery export with id test-bq-export under organization 123 with
    a dataset abc in project 234 and a filter on category that equals to
    XSS_SCRIPTING:

        $ gcloud scc bqexports update test-bq-export --organization=123 \
            --dataset=projects/234/datasets/abc \
            --description="This is a test BigQuery export" \
            --filter="category=\"XSS_SCRIPTING\""

    Update a BigQuery export with id test-bq-export under folder 456 with a
    dataset abc in project 234 and a filter on category that equals to
    XSS_SCRIPTING:

        $ gcloud scc bqexports update test-bq-export --folder=456 \
            --dataset=projects/234/datasets/abc \
            --description="This is a test BigQuery export" \
            --filter="category=\"XSS_SCRIPTING\""

    Update a BigQuery export with id test-bq-export under project 789 with a
    dataset abc in project 234 and a filter on category that equals to
    XSS_SCRIPTING:

        $ gcloud scc bqexports update test-bq-export --project=789 \
            --dataset=projects/234/datasets/abc \
            --description="This is a test BigQuery export" \
            --filter="category=\"XSS_SCRIPTING\""

    Update a BigQuery export test-bq-export in organization 123 and
    location=global. This command updates the target dataset to
    projects/234/datasets/abc, the export description to This is a test
    BigQuery export and the export filter to XSS_SCRIPTING:

        $ gcloud scc bqexports update test-bq-export --organization=123 \
            --dataset=projects/234/datasets/abc \
            --description="This is a test BigQuery export" \
            --filter="category=\"XSS_SCRIPTING\"" --location=global

POSITIONAL ARGUMENTS
     BIG_QUERY_EXPORT
        ID of the BigQuery export e.g. my-bq-export or the full resource name
        of the BigQuery export e.g.
        organizations/123/bigQueryExports/my-bq-export.

FLAGS
     --dataset=DATASET
        The dataset to write findings updates to.

     --[no-]deletion-notifications-enabled
        Indicates whether the notifications will be sent for deleted findings.
        Use --deletion-notifications-enabled to enable and
        --no-deletion-notifications-enabled to disable.

     --description=DESCRIPTION
        The text that will be used to describe a BigQuery export.

     --filter=FILTER
        The filter string which will applied to findings muted by a BigQuery
        export.

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

     --update-mask=UPDATE_MASK
        Optional: If left unspecified (default), an update-mask is
        automatically created using the flags specified in the command and only
        those values are updated.

     At most one of these can be specified:

       --folder=FOLDER
          Folder where the BigQuery export resides. Formatted as folders/456 or
          just 456.

       --organization=ORGANIZATION
          Organization where the BigQuery export resides. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (id or number) where the BigQuery export resides. Formatted
          as projects/789 or just 789.

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
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/bqexports (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
