---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/muteconfigs
---

# gcloud scc muteconfigs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scc muteconfigs create

```text
NAME
    gcloud scc muteconfigs create - create a Security Command Center mute
        config

SYNOPSIS
    gcloud scc muteconfigs create MUTE_CONFIG [--description=DESCRIPTION]
        [--expiry-time=EXPIRY_TIME] [--filter=FILTER]
        [--location=LOCATION; default="global"] [--type=TYPE; default="static"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Security Command Center mute config.

EXAMPLES
    To create a mute config test-mute-config given organization 123 with a
    filter on category that equals to XSS_SCRIPTING, run:

        $ gcloud scc muteconfigs create test-mute-config \
            --organization=123 --description="This is a test mute config" \
            --filter="category=\"XSS_SCRIPTING\""

    To create a mute config test-mute-config given folder 456 with a filter on
    category that equals to XSS_SCRIPTING, run:

        $ gcloud scc muteconfigs create test-mute-config --folder=456 \
            --description="This is a test mute config" \
            --filter="category=\"XSS_SCRIPTING\""

    To create a mute config test-mute-config given project 789 with a filter on
    category that equals to XSS_SCRIPTING, run:

        $ gcloud scc muteconfigs create test-mute-config --project=789 \
            --description="This is a test mute config" \
            --filter="category=\"XSS_SCRIPTING\""

    To create a mute config test-mute-config given organization 123,
    location=eu with a filter on category that equals to XSS_SCRIPTING, run:

        $ gcloud scc muteconfigs create test-mute-config \
            --organization=123 --description="This is a test mute config" \
            --filter="category=\"XSS_SCRIPTING\"" --location=eu

POSITIONAL ARGUMENTS
     MUTE_CONFIG
        ID of the mute config or the full resource name of the mute config.

FLAGS
     --description=DESCRIPTION
        The text that will be used to describe a mute configuration.

     --expiry-time=EXPIRY_TIME
        The expiry of the mute config. Only applicable for dynamic configs. If
        the expiry is set, when the config expires, it is removed from all
        findings. See $ gcloud topic datetimes for information on supported
        time formats.

     --filter=FILTER
        The filter string which will applied to findings muted by a mute
        configuration.

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

     --type=TYPE; default="static"
        The mute configuration type. Immutable after creation. TYPE must be one
        of: static, dynamic.

     At most one of these can be specified:

       --folder=FOLDER
          Folder where the mute config resides. Formatted as folders/456 or
          just 456.

       --organization=ORGANIZATION
          Organization where the mute config resides. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (id or number) where the mute config resides. Formatted as
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

        $ gcloud alpha scc muteconfigs create
```

### gcloud scc muteconfigs delete

```text
NAME
    gcloud scc muteconfigs delete - delete a Security Command Center mute
        config

SYNOPSIS
    gcloud scc muteconfigs delete MUTE_CONFIG
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Security Command Center mute config.

EXAMPLES
    To delete a mute config given organization 123 with id test-mute-config,
    run:

        $ gcloud scc muteconfigs delete test-mute-config --organization=123

    To delete a mute config given folder 456 with id test-mute-config, run:

        $ gcloud scc muteconfigs delete test-mute-config --folder=456

    To delete a mute config given project 789 with id test-mute-config, run:

        $ gcloud scc muteconfigs delete test-mute-config --project=789

    To delete a mute config given organization 123 with id test-mute-config and
    location=eu, run:

        $ gcloud scc muteconfigs delete test-mute-config \
            --organization=123 --location=eu

POSITIONAL ARGUMENTS
     MUTE_CONFIG
        ID of the mute config or the full resource name of the mute config.

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
          Folder where the mute config resides. Formatted as folders/456 or
          just 456.

       --organization=ORGANIZATION
          Organization where the mute config resides. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (id or number) where the mute config resides. Formatted as
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

        $ gcloud alpha scc muteconfigs delete
```

### gcloud scc muteconfigs get

```text
NAME
    gcloud scc muteconfigs get - get a Security Command Center mute config

SYNOPSIS
    gcloud scc muteconfigs get MUTE_CONFIG
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get a Security Command Center mute config.

EXAMPLES
    To get a mute config given organization 123 with id test-mute-config, run:

        $ gcloud scc muteconfigs get test-mute-config --organization=123

    To get a mute config given folder 456 with id test-mute-config, run:

        $ gcloud scc muteconfigs get test-mute-config --folder=456

    To get a mute config given project 789 with id test-mute-config, run:

        $ gcloud scc muteconfigs get test-mute-config --project=789

    To get a mute config given organization 123 with id test-mute-config and
    location=eu, run:

        $ gcloud scc muteconfigs get test-mute-config --organization=123 \
            --location=eu

POSITIONAL ARGUMENTS
     MUTE_CONFIG
        ID of the mute config or the full resource name of the mute config.

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
          Folder where the mute config resides. Formatted as folders/456 or
          just 456.

       --organization=ORGANIZATION
          Organization where the mute config resides. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (id or number) where the mute config resides. Formatted as
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

        $ gcloud alpha scc muteconfigs get
```

### gcloud scc muteconfigs list

```text
NAME
    gcloud scc muteconfigs list - listSecurity Command Center mute configs

SYNOPSIS
    gcloud scc muteconfigs list
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--location=LOCATION; default="global"] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Security Command Center mute configs.

EXAMPLES
    List mute configs under organization 123:

        $ gcloud scc muteconfigs list --organization=123

    List mute configs under folder 456:

        $ gcloud scc muteconfigs list --folder=456

    List mute configs under project 789:

        $ gcloud scc muteconfigs list --project=789

        List mute configs under organization `_123_` and `location=eu`:

        $ gcloud scc muteconfigs list --organization=123 --location=eu

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER
          Folder where the mute config resides. Formatted as folders/456 or
          just 456.

       --organization=ORGANIZATION
          Organization where the mute config resides. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (id or number) where the mute config resides. Formatted as
          projects/789 or just 789.

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

NOTES
    This variant is also available:

        $ gcloud alpha scc muteconfigs list
```

### gcloud scc muteconfigs update

```text
NAME
    gcloud scc muteconfigs update - update a Security Command Center mute
        config

SYNOPSIS
    gcloud scc muteconfigs update MUTE_CONFIG [--description=DESCRIPTION]
        [--expiry-time=EXPIRY_TIME] [--filter=FILTER]
        [--location=LOCATION; default="global"] [--update-mask=UPDATE_MASK]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Security Command Center mute config.

EXAMPLES
    Update a mute config with ID=test-mute-config under organization=123 with a
    filter on category that equals to XSS_SCRIPTING:

        $ gcloud scc muteconfigs update test-mute-config \
            --organization=123 --description="This is a test mute config" \
            --filter="category=\"XSS_SCRIPTING\""

    Update a mute config with ID=test-mute-config under folder=456 with a
    filter on category that equals to XSS_SCRIPTING:

        $ gcloud scc muteconfigs update test-mute-config --folder=456 \
            --description="This is a test mute config" \
            --filter="category=\"XSS_SCRIPTING\""

    Update a mute config with ID=test-mute-config under project=789 with a
    filter on category that equals to XSS_SCRIPTING:

        $ gcloud scc muteconfigs update test-mute-config --project=789 \
            --description="This is a test mute config" \
            --filter="category=\"XSS_SCRIPTING\""

    Update a mute config with ID=test-mute-config under organization=123
    location=eu with a filter on category that equals to XSS_SCRIPTING:

        $ gcloud scc muteconfigs update test-mute-config \
            --organization=123 --description="This is a test mute config" \
            --filter="category=\"XSS_SCRIPTING\"" --location=eu

POSITIONAL ARGUMENTS
     MUTE_CONFIG
        ID of the mute config or the full resource name of the mute config.

FLAGS
     --description=DESCRIPTION
        The text that will be used to describe a mute configuration.

     --expiry-time=EXPIRY_TIME
        The expiry of the mute config. Only applicable for dynamic configs. If
        the expiry is set, when the config expires, it is removed from all
        findings. See $ gcloud topic datetimes for information on supported
        time formats.

     --filter=FILTER
        The filter string which will applied to findings muted by a mute
        configuration.

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
          Folder where the mute config resides. Formatted as folders/456 or
          just 456.

       --organization=ORGANIZATION
          Organization where the mute config resides. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          Project (id or number) where the mute config resides. Formatted as
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

        $ gcloud alpha scc muteconfigs update
```

### gcloud alpha scc muteconfigs create

```text
NAME
    gcloud alpha scc muteconfigs create - create a Security Command Center mute
        config

SYNOPSIS
    gcloud alpha scc muteconfigs create MUTE_CONFIG [--description=DESCRIPTION]
        [--expiry-time=EXPIRY_TIME] [--filter=FILTER]
        [--location=LOCATION; default="global"] [--type=TYPE; default="static"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc muteconfigs delete

```text
NAME
    gcloud alpha scc muteconfigs delete - delete a Security Command Center mute
        config

SYNOPSIS
    gcloud alpha scc muteconfigs delete MUTE_CONFIG
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc muteconfigs get

```text
NAME
    gcloud alpha scc muteconfigs get - get a Security Command Center mute
        config

SYNOPSIS
    gcloud alpha scc muteconfigs get MUTE_CONFIG
        [--location=LOCATION; default="global"]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc muteconfigs list

```text
NAME
    gcloud alpha scc muteconfigs list - listSecurity Command Center mute
        configs

SYNOPSIS
    gcloud alpha scc muteconfigs list
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--location=LOCATION; default="global"] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc muteconfigs update

```text
NAME
    gcloud alpha scc muteconfigs update - update a Security Command Center mute
        config

SYNOPSIS
    gcloud alpha scc muteconfigs update MUTE_CONFIG [--description=DESCRIPTION]
        [--expiry-time=EXPIRY_TIME] [--filter=FILTER]
        [--location=LOCATION; default="global"] [--update-mask=UPDATE_MASK]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/muteconfigs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
