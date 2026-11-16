---
source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/conversion-workspaces
---

# gcloud database-migration conversion-workspaces (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud database-migration conversion-workspaces apply

```text
NAME
    gcloud database-migration conversion-workspaces apply - apply a Database
        Migration Service conversion workspace

SYNOPSIS
    gcloud database-migration conversion-workspaces apply
        (CONVERSION_WORKSPACE : --region=REGION)
        --destination-connection-profile=DESTINATION_CONNECTION_PROFILE
        [--no-async] [--dry-run] [--endpoint-mode=ENDPOINT_MODE]
        [--filter=FILTER] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Apply Database Migration Service conversion workspace onto the destination
    database.

EXAMPLES
    To apply a conversion workspace:

        $ gcloud database-migration conversion-workspaces apply \
          my-conversion-workspace --region=us-central1 \
          --destination-connection-profile=projects/1234/locations/\
        us-central1/connectionProfiles/destination-connection-profile-name

POSITIONAL ARGUMENTS
     Conversion workspace resource - The conversion workspace to apply. The
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
     Connection profile resource - The connection profile to apply to. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --destination-connection-profile on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the region attribute:
      * provide the argument --destination-connection-profile on the command
        line with a fully specified name;
      * provide the argument --region on the command line.

     This must be specified.

       --destination-connection-profile=DESTINATION_CONNECTION_PROFILE
          ID of the connection_profile or fully qualified identifier for the
          connection_profile.

          To set the connection_profile attribute:
          + provide the argument --destination-connection-profile on the
            command line.

OPTIONAL FLAGS
     --no-async
        Waits for the operation in progress to complete before returning.

     --dry-run
        Only validates the apply process, but doesn't change the destination
        database. Only works for PostgreSQL destination connection profile.

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

     --filter=FILTER
        Filter the entities based on AIP-160 (https://google.aip.dev/160)
        standard. Example: to filter all tables whose name start with
        "Employee" and are present under schema "Company", use filter as
        "Company.Employee* AND type=TABLE"

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

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud database-migration conversion-workspaces apply my-conversion-workspace \
    --region=us-central1 \
    --destination-connection-profile=projects/1234/locations/us-central1/connectionProfiles/destination-connection-profile-name
```

### gcloud database-migration conversion-workspaces commit

```text
NAME
    gcloud database-migration conversion-workspaces commit - commit a Database
        Migration Service conversion workspace

SYNOPSIS
    gcloud database-migration conversion-workspaces commit
        (CONVERSION_WORKSPACE : --region=REGION) [--no-async]
        [--commit-name=COMMIT_NAME] [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Commit a Database Migration Service conversion workspace.

EXAMPLES
    To commit a version of conversion workspace called my-conversion-workspace:

        $ gcloud database-migration conversion-workspaces commit \
          my-conversion-workspace --region=us-central1 \
          --commit-name=my-commit

POSITIONAL ARGUMENTS
     Conversion workspace resource - The conversion workspace to commit. The
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

     --commit-name=COMMIT_NAME
        A user-friendly name for the conversion workspace commit. The commit
        name can include letters, numbers, spaces, and hyphens, and must start
        with a letter.

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

### gcloud database-migration conversion-workspaces convert

```text
NAME
    gcloud database-migration conversion-workspaces convert - convert a
        Database Migration Service conversion workspace

SYNOPSIS
    gcloud database-migration conversion-workspaces convert
        (CONVERSION_WORKSPACE : --region=REGION) [--no-async]
        [--[no-]auto-commit] [--endpoint-mode=ENDPOINT_MODE] [--filter=FILTER]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Convert a Database Migration Service conversion workspace.

EXAMPLES
    To convert a conversion workspace:

        $ gcloud database-migration conversion-workspaces convert \
          my-conversion-workspace --region=us-central1

POSITIONAL ARGUMENTS
     Conversion workspace resource - The conversion workspace to convert. The
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

     --filter=FILTER
        Filter the entities based on AIP-160 (https://google.aip.dev/160)
        standard. Example: to filter all tables whose name start with
        "Employee" and are present under schema "Company", use filter as
        "Company.Employee* AND type=TABLE"

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

### gcloud database-migration conversion-workspaces create

```text
NAME
    gcloud database-migration conversion-workspaces create - create a Database
        Migration Service conversion workspace

SYNOPSIS
    gcloud database-migration conversion-workspaces create
        (CONVERSION_WORKSPACE : --region=REGION)
        --destination-database-engine=DESTINATION_DATABASE_ENGINE
        --source-database-engine=SOURCE_DATABASE_ENGINE [--no-async]
        [--destination-database-provider=DESTINATION_DATABASE_PROVIDER;
          default="CLOUDSQL"]
        [--destination-database-version=DESTINATION_DATABASE_VERSION;
          default="unspecified"] [--display-name=DISPLAY_NAME]
        [--endpoint-mode=ENDPOINT_MODE] [--global-settings=[KEY=VALUE,...]]
        [--source-database-provider=SOURCE_DATABASE_PROVIDER;
          default="UNSPECIFIED"]
        [--source-database-version=SOURCE_DATABASE_VERSION;
          default="unspecified"]
        [--[no-]auto-conversion --ai-processing-location=AI_PROCESSING_LOCATION
          --[no-]quality-assessment
          --[no-]conversion-assistance --[no-]pattern-matching]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Database Migration Service conversion workspace.

EXAMPLES
    To create a conversion workspace:

        $ gcloud database-migration conversion-workspaces create \
          my-conversion-workspace --region=us-central1 \
          --display-name=cw1 --source-database-engine=ORACLE \
          --source-database-version=11 \
          --destination-database-engine=POSTGRESQL \
          --destination-database-version=15

POSITIONAL ARGUMENTS
     Conversion workspace resource - The conversion workspace to create. The
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
     --destination-database-engine=DESTINATION_DATABASE_ENGINE
        Destination database engine type. DESTINATION_DATABASE_ENGINE must be
        (only one value is supported): POSTGRESQL.

     --source-database-engine=SOURCE_DATABASE_ENGINE
        Source database engine type. SOURCE_DATABASE_ENGINE must be one of:
        ORACLE, SQL_SERVER.

OPTIONAL FLAGS
     --no-async
        Waits for the operation in progress to complete before returning.

     --destination-database-provider=DESTINATION_DATABASE_PROVIDER; default="CLOUDSQL"
        Destination database provider. DESTINATION_DATABASE_PROVIDER must be
        one of: ALLOYDB, CLOUDSQL.

     --destination-database-version=DESTINATION_DATABASE_VERSION; default="unspecified"
        Version number for the database engine. The version number must contain
        numbers and letters only. Example for PostgreSQL 17.0, version number
        will be 17.0.

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

     --global-settings=[KEY=VALUE,...]
        A generic list of settings for the workspace. The settings are database
        pair dependant and can indicate default behavior for the mapping rules
        engine or turn on or off specific features. An object containing a list
        of "key": "value" pairs.

     --source-database-provider=SOURCE_DATABASE_PROVIDER; default="UNSPECIFIED"
        Source database provider. SOURCE_DATABASE_PROVIDER must be one of:
        AMAZON_RDS, AZURE_MANAGED_INSTANCE, AZURE_SQL_DATABASE, CLOUDSQL,
        UNSPECIFIED.

     --source-database-version=SOURCE_DATABASE_VERSION; default="unspecified"
        Version number for the database engine. The version number must contain
        numbers and letters only. Example for Oracle 21c, version number will
        be 21c.

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

### gcloud database-migration conversion-workspaces delete

```text
NAME
    gcloud database-migration conversion-workspaces delete - delete a Database
        Migration conversion workspace

SYNOPSIS
    gcloud database-migration conversion-workspaces delete
        (CONVERSION_WORKSPACE : --region=REGION) [--no-async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Database Migration conversion workspace.

EXAMPLES
    To delete a conversion workspace called 'my-conversion-workspace', run:

        $ gcloud database-migration conversion-workspaces delete \
          my-conversion-workspace --region=us-central1

POSITIONAL ARGUMENTS
     Conversion workspace resource - The conversion workspace to delete. The
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

### gcloud database-migration conversion-workspaces describe

```text
NAME
    gcloud database-migration conversion-workspaces describe - show details
        about a database migration conversion workspace

SYNOPSIS
    gcloud database-migration conversion-workspaces describe
        (CONVERSION_WORKSPACE : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about a conversion workspace.

EXAMPLES
    To show details about a conversion workspace, run:

        $ gcloud database-migration conversion-workspaces describe \
            my-conversion-workspace --region=us-central1

POSITIONAL ARGUMENTS
     Conversion workspace resource - The conversion workspace you want to get
     the details of. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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
          The name of the region.

          To set the region attribute:
          + provide the argument conversion_workspace on the command line
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

### gcloud database-migration conversion-workspaces describe-ddls

```text
NAME
    gcloud database-migration conversion-workspaces describe-ddls - describe
        DDLs in a Database Migration Service conversion workspace

SYNOPSIS
    gcloud database-migration conversion-workspaces describe-ddls
        (CONVERSION_WORKSPACE : --region=REGION) [--commit-id=COMMIT_ID]
        [--endpoint-mode=ENDPOINT_MODE]
        [--tree-type=TREE_TYPE; default="DRAFT"] [--uncommitted]
        [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE; default=100] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe DDLs in a Database Migration Service conversion workspace.

EXAMPLES
    To describe the DDLs of the draft tree in my-conversion-workspace in a
    project and location us-central1, run:

        $ gcloud database-migration conversion-workspaces describe-ddls \
          my-conversion-workspace --region=us-central1

    To describe the DDLs of the source tree in a conversion workspace in a
    project and location us-central1, run:

        $ gcloud database-migration conversion-workspaces describe-ddls \
          my-conversion-workspace --region=us-central1 --tree-type=SOURCE

POSITIONAL ARGUMENTS
     Conversion workspace resource - The conversion workspace to describe DDLs.
     The arguments in this group can be used to specify the attributes of this
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
     --commit-id=COMMIT_ID
        Request a specific commit id. If not specified, the entities from the
        latest commit are returned.

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

     --tree-type=TREE_TYPE; default="DRAFT"
        Tree type for database entities. TREE_TYPE must be one of: SOURCE,
        DRAFT.

     --uncommitted
        Whether to retrieve the latest committed version of the entities or the
        latest version. This field is ignored if a specific commit_id is
        specified.

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

     --page-size=PAGE_SIZE; default=100
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is 100.
        Paging may be applied before or after --filter and --limit depending on
        the service.

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

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.
```

### gcloud database-migration conversion-workspaces describe-entities

```text
NAME
    gcloud database-migration conversion-workspaces describe-entities -
        describe database entities in a Database Migration conversion workspace

SYNOPSIS
    gcloud database-migration conversion-workspaces describe-entities
        (CONVERSION_WORKSPACE : --region=REGION) --tree-type=TREE_TYPE
        [--commit-id=COMMIT_ID] [--endpoint-mode=ENDPOINT_MODE] [--uncommitted]
        [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE; default=100] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe database entities in a Database Migration conversion workspace.

EXAMPLES
    To describe the database entities of the source tree in a conversion
    workspace in a project and location us-central1, run:

        $ gcloud database-migration conversion-workspaces \
          describe-entities my-conversion-workspace --region=us-central1 \
          --tree-type=SOURCE

POSITIONAL ARGUMENTS
     Conversion workspace resource - The conversion workspace describe
     entities. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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
     --tree-type=TREE_TYPE
        Tree type for database entities. TREE_TYPE must be one of: SOURCE,
        DRAFT.

FLAGS
     --commit-id=COMMIT_ID
        Request a specific commit id. If not specified, the entities from the
        latest commit are returned.

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

     --uncommitted
        Whether to retrieve the latest committed version of the entities or the
        latest version. This field is ignored if a specific commit_id is
        specified.

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

     --page-size=PAGE_SIZE; default=100
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is 100.
        Paging may be applied before or after --filter and --limit depending on
        the service.

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

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.
```

### gcloud database-migration conversion-workspaces describe-issues

```text
NAME
    gcloud database-migration conversion-workspaces describe-issues - describe
        issues in a Database Migration Service conversion workspace

SYNOPSIS
    gcloud database-migration conversion-workspaces describe-issues
        (CONVERSION_WORKSPACE : --region=REGION) [--commit-id=COMMIT_ID]
        [--endpoint-mode=ENDPOINT_MODE] [--uncommitted] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE; default=100]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe database entity issues in a Database Migration Services conversion
    workspace.

EXAMPLES
    To describe the database entity issues in a conversion workspace in a
    project and location us-central1, run:

        $ gcloud database-migration conversion-workspaces describe-issues \
          my-conversion-workspace --region=us-central1

POSITIONAL ARGUMENTS
     Conversion workspace resource - The conversion workspace to describe
     issues. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

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
     --commit-id=COMMIT_ID
        Request a specific commit id. If not specified, the entities from the
        latest commit are returned.

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

     --uncommitted
        Whether to retrieve the latest committed version of the entities or the
        latest version. This field is ignored if a specific commit_id is
        specified.

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

     --page-size=PAGE_SIZE; default=100
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is 100.
        Paging may be applied before or after --filter and --limit depending on
        the service.

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

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.
```

### gcloud database-migration conversion-workspaces import-rules

```text
NAME
    gcloud database-migration conversion-workspaces import-rules - import
        mapping rules in a Database Migration Service conversion workspace

SYNOPSIS
    gcloud database-migration conversion-workspaces import-rules
        (CONVERSION_WORKSPACE : --region=REGION)
        --config-files=CONFIG_FILE,[CONFIG_FILE,...] [--[no-]auto-commit]
        [--endpoint-mode=ENDPOINT_MODE]
        [--file-format=FILE_FORMAT; default="ORA2PG"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Import mapping rules in a Database Migration Service conversion workspace
    from a configuration file. For example, for Oracle to PostgreSQL migrations
    that could be an Ora2Pg config file.

EXAMPLES
    To import rules in a conversion workspace:

        $ gcloud database-migration conversion-workspaces import-rules \
          my-conversion-workspace --region=us-central1 \
          --file-format=ORA2PG \
          --config-files=PATH1/config1.conf,PATH2/config2.conf

POSITIONAL ARGUMENTS
     Conversion workspace resource - The conversion workspace to import rules.
     The arguments in this group can be used to specify the attributes of this
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
     --config-files=CONFIG_FILE,[CONFIG_FILE,...]
        A list of files to import rules from. Either provide a single file path
        or if multiple files are to be provided, each file should correspond to
        one schema. Provide file paths as a comma separated list.

OPTIONAL FLAGS
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

     --file-format=FILE_FORMAT; default="ORA2PG"
        File format type to import rules from. FILE_FORMAT must be (only one
        value is supported): ORA2PG.

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

### gcloud database-migration conversion-workspaces list

```text
NAME
    gcloud database-migration conversion-workspaces list - list conversion
        workspaces

SYNOPSIS
    gcloud database-migration conversion-workspaces list --region=REGION
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List conversion workspaces.

EXAMPLES
    To list all conversion workspaces in a project and location us-central1,
    run:

        $ gcloud database-migration conversion-workspaces list \
            --region=us-central1

REQUIRED FLAGS
     Region resource - The region you want to list the conversion workspaces
     for. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --region=REGION
          ID of the region or fully qualified identifier for the region.

          To set the region attribute:
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

### gcloud database-migration conversion-workspaces list-background-jobs

```text
NAME
    gcloud database-migration conversion-workspaces list-background-jobs - list
        background jobs in the conversion workspaces

SYNOPSIS
    gcloud database-migration conversion-workspaces list-background-jobs
        (CONVERSION_WORKSPACE : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [--max-size=MAX_SIZE]
        [--most-recent-per-job-type] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List background jobs in the conversion workspaces.

EXAMPLES
    To list the background jobs in a conversion workspaces in a project and
    location us-central1, run:

        $ gcloud database-migration conversion-workspaces \
            list-background-jobs my-conversion-workspace \
            --region=us-central1

POSITIONAL ARGUMENTS
     Conversion workspace resource - The conversion workspace you want to get
     the details of. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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
          The name of the region.

          To set the region attribute:
          + provide the argument conversion_workspace on the command line
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

     --max-size=MAX_SIZE
        The maximum number of jobs to return. The service may return fewer than
        this value. If unspecified, at most 100 jobs will be returned. The
        maximum value is 100; values above 100 will be coerced to 100.

     --most-recent-per-job-type
        Returns only the most recent job per job type.

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

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/conversion-workspaces (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
