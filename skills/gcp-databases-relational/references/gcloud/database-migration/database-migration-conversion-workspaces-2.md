---
source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/conversion-workspaces
---

# gcloud database-migration conversion-workspaces (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud database-migration conversion-workspaces mapping-rules list

```text
NAME
    gcloud database-migration conversion-workspaces mapping-rules list - list
        Mapping Rules

SYNOPSIS
    gcloud database-migration conversion-workspaces mapping-rules list
        (--conversion-workspace=CONVERSION_WORKSPACE : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List mapping rules.

EXAMPLES
    To list all mapping rules in a project and location us-central1, run:

        $ gcloud database-migration conversion-workspaces mapping-rules \
            list --conversion-workspace=my-conversion-workspace \
            --region=us-central1

REQUIRED FLAGS
     Conversion workspace resource - The conversion workspace you want to list
     mapping rules for. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --conversion-workspace on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --conversion-workspace=CONVERSION_WORKSPACE
          ID of the conversion_workspace or fully qualified identifier for the
          conversion_workspace.

          To set the conversion_workspace attribute:
          + provide the argument --conversion-workspace on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --region=REGION
          The name of the region.

          To set the region attribute:
          + provide the argument --conversion-workspace on the command line
            with a fully specified name;
          + provide the argument --region on the command line.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

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
    This command uses the datamigration/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/database-migration/

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.
```

### gcloud database-migration conversion-workspaces rollback

```text
NAME
    gcloud database-migration conversion-workspaces rollback - rollback a
        Database Migration Service conversion workspace

SYNOPSIS
    gcloud database-migration conversion-workspaces rollback
        (CONVERSION_WORKSPACE : --region=REGION) [--no-async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Rollback a Database Migration Service conversion workspace to the last
    committed snapshot.

EXAMPLES
    To rollback a conversion workspace to the last committed snapshot:

        $ gcloud database-migration conversion-workspaces rollback \
          my-conversion-workspace --region=us-central1

POSITIONAL ARGUMENTS
     Conversion workspace resource - The conversion workspace to rollback. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument conversion_workspace on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONVERSION_WORKSPACE
          ID of the conversion_workspace or fully qualified identifier for the
          conversion_workspace.

          To set the conversion_workspace attribute:
          + provide the argument conversion_workspace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud region for the conversion_workspace.

          To set the region attribute:
          + provide the argument conversion_workspace on the command line
            with a fully specified name;
          + provide the argument --region on the command line.

FLAGS
     --no-async
        Waits for the operation in progress to complete before returning.

     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.
```

### gcloud database-migration conversion-workspaces seed

```text
NAME
    gcloud database-migration conversion-workspaces seed - seed a Database
        Migration Service conversion workspace

SYNOPSIS
    gcloud database-migration conversion-workspaces seed
        (CONVERSION_WORKSPACE : --region=REGION)
        (--destination-connection-profile=DESTINATION_CONNECTION_PROFILE
          | --gcs-path=GCS_PATH
          | --source-connection-profile=SOURCE_CONNECTION_PROFILE) [--no-async]
        [--[no-]auto-commit] [--endpoint-mode=ENDPOINT_MODE]
        [--source-database-name-override=SOURCE_DATABASE_NAME_OVERRIDE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Seed a Database Migration Service conversion workspace.

    If --source-database-name-override is specified, this command updates the
    conversion workspace's source database override before performing a seed
    operation.

EXAMPLES
    To seed and commit a conversion workspace:

        $ gcloud database-migration conversion-workspaces seed \
            my-conversion-workspace --region=us-central1 \
            --source-connection-profile=cp1

    To update the source database override before seeding:

        $ gcloud database-migration conversion-workspaces seed \
            my-conversion-workspace --region=us-central1 \
            --source-connection-profile=cp1 \
            --source-database-name-override=my-db

POSITIONAL ARGUMENTS
     Conversion workspace resource - The conversion workspace to seed. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument conversion_workspace on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONVERSION_WORKSPACE
          ID of the conversion_workspace or fully qualified identifier for the
          conversion_workspace.

          To set the conversion_workspace attribute:
          + provide the argument conversion_workspace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud region for the conversion_workspace.

          To set the region attribute:
          + provide the argument conversion_workspace on the command line
            with a fully specified name;
          + provide the argument --region on the command line.

REQUIRED FLAGS
     The source for seeding the conversion workspace.

     Exactly one of these must be specified:

         Connection profile resource - The connection profile to seed from.
         This represents a Cloud resource. (NOTE) Some attributes are not given
         arguments in this group but can be set in other ways.

         To set the project attribute:
         + provide the argument --destination-connection-profile on the
           command line with a fully specified name;
         + provide the argument --project on the command line;
         + set the property core/project.

       To set the region attribute:
        + provide the argument --destination-connection-profile on the
          command line with a fully specified name;
        + provide the argument --region on the command line.

         --destination-connection-profile=DESTINATION_CONNECTION_PROFILE
            ID of the connection_profile or fully qualified identifier for the
            connection_profile.

            To set the connection_profile attribute:
         + provide the argument --destination-connection-profile on the
           command line.

       --gcs-path=GCS_PATH
          The Cloud Storage path containing the schema report files. Must be in
          the format gs://bucket/prefix.

       Or at least one of these can be specified:

         Connection profile resource - The connection profile to seed from.
         This represents a Cloud resource. (NOTE) Some attributes are not given
         arguments in this group but can be set in other ways.

         To set the project attribute:
         + provide the argument --source-connection-profile on the command
           line with a fully specified name;
         + provide the argument --project on the command line;
         + set the property core/project.

       To set the region attribute:
        + provide the argument --source-connection-profile on the command
          line with a fully specified name;
        + provide the argument --region on the command line.

         --source-connection-profile=SOURCE_CONNECTION_PROFILE
            ID of the connection_profile or fully qualified identifier for the
            connection_profile.

            To set the connection_profile attribute:
         + provide the argument --source-connection-profile on the command
           line.

OPTIONAL FLAGS
     --no-async
        Waits for the operation in progress to complete before returning.

     --[no-]auto-commit
        Auto-commit the conversion workspace (default: True). Use --auto-commit
        to enable and --no-auto-commit to disable.

     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     --source-database-name-override=SOURCE_DATABASE_NAME_OVERRIDE
        The database name to use when seeding from a connection profile. If not
        specified, the database name from the connection profile is used.
        Currently only supported for SQL Server source seeding.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.
```

### gcloud database-migration conversion-workspaces update

```text
NAME
    gcloud database-migration conversion-workspaces update - update a Database
        Migration Service conversion workspace

SYNOPSIS
    gcloud database-migration conversion-workspaces update
        (CONVERSION_WORKSPACE : --region=REGION) [--no-async]
        [--display-name=DISPLAY_NAME] [--endpoint-mode=ENDPOINT_MODE]
        [--global-filter=GLOBAL_FILTER]
        [--source-database-name-override=SOURCE_DATABASE_NAME_OVERRIDE]
        [--[no-]auto-conversion --ai-processing-location=AI_PROCESSING_LOCATION
          --[no-]quality-assessment
          --[no-]conversion-assistance --[no-]pattern-matching]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Database Migration Service conversion workspace.

EXAMPLES
    To update a conversion workspace:

        $ gcloud database-migration conversion-workspaces update \
          my-conversion-workspace --region=us-central1 \
          --display-name=new-display-name

POSITIONAL ARGUMENTS
     Conversion workspace resource - The conversion workspace to update. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument conversion_workspace on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONVERSION_WORKSPACE
          ID of the conversion_workspace or fully qualified identifier for the
          conversion_workspace.

          To set the conversion_workspace attribute:
          + provide the argument conversion_workspace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud region for the conversion_workspace.

          To set the region attribute:
          + provide the argument conversion_workspace on the command line
            with a fully specified name;
          + provide the argument --region on the command line.

FLAGS
     --no-async
        Waits for the operation in progress to complete before returning.

     --display-name=DISPLAY_NAME
        A user-friendly name for the conversion workspace. The display name can
        include letters, numbers, spaces, and hyphens, and must start with a
        letter. The maximum length allowed is 60 characters.

     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     --global-filter=GLOBAL_FILTER
        Filter the source entities based on AIP-160
        (https://google.aip.dev/160) standard. This filter will be applied to
        all subsequent operations on the source entities, such as convert and
        describe-entities.

     --source-database-name-override=SOURCE_DATABASE_NAME_OVERRIDE
        The database name to use when seeding from a connection profile. If not
        specified, the database name from the connection profile is used.
        Currently only supported for SQL Server source seeding.

     Gemini feature settings.

     --[no-]auto-conversion
        Whether to enable Gemini auto-conversion. Use --auto-conversion to
        enable and --no-auto-conversion to disable.

     --ai-processing-location=AI_PROCESSING_LOCATION
        The location where Gemini features process the conversion workspace
        data, which can be outside of the conversion workspace region. Setting
        this flag gives explicit consent to process data in the selected
        location. Required to use Gemini features on regional endpoints.
        Supported values are:

        * global: Process Gemini requests using the global endpoint.
        * us: Process Gemini requests within the United States multi-region.
        * eu: Process Gemini requests within the European Union multi-region.

        To remove a previously set location, pass an empty value, for example
        --ai-processing-location="".

     --[no-]quality-assessment
        Whether to enable Gemini quality assessment. Use --quality-assessment
        to enable and --no-quality-assessment to disable.

     --[no-]conversion-assistance
        Whether to enable Gemini conversion assistance. Use
        --conversion-assistance to enable and --no-conversion-assistance to
        disable.

     --[no-]pattern-matching
        Whether to enable Gemini pattern matching. Use --pattern-matching to
        enable and --no-pattern-matching to disable.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/conversion-workspaces (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
