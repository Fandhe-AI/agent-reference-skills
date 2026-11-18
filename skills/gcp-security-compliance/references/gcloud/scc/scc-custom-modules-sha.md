---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/custom-modules/sha
---

# gcloud scc custom-modules sha

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scc custom-modules sha create

```text
NAME
    gcloud scc custom-modules sha create - create a Security Health Analytics
        custom module

SYNOPSIS
    gcloud scc custom-modules sha create --custom-config-from-file=PATH_TO_FILE
        --display-name=DISPLAY_NAME --enablement-state=ENABLEMENT_STATE
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Security Health Analytics custom module.

EXAMPLES
    To create a Security Health Analytics custom module for given organization
    123, run:

        $ gcloud scc custom-modules sha create \
            --organization=organizations/123 \
            --display-name="test_display_name" \
            --enablement-state="ENABLED" \
            --custom-config-from-file=custom_config.yaml

    To create a Security Health Analytics custom module for given folder 456,
    run:

        $ gcloud scc custom-modules sha create --folder=folders/456 \
            --display-name="test_display_name" \
            --enablement-state="ENABLED" \
            --custom-config-from-file=custom_config.yaml

    To create a Security Health Analytics custom module for given project 789,
    run:

        $ gcloud scc custom-modules sha create --project=projects/789 \
            --display-name="test_display_name" \
            --enablement-state="ENABLED" \
            --custom-config-from-file=custom_config.yaml

REQUIRED FLAGS
     --custom-config-from-file=PATH_TO_FILE
        Path to a YAML file that contains the configuration for the Security
        Health Analytics custom module. Use a full or relative path to a local
        file containing the value of custom_config.

     --display-name=DISPLAY_NAME
        Sets the display name of the Security Health Analytics custom module.
        This display name becomes the finding category for all findings that
        are returned by this custom module. The display name must be between 1
        and 128 characters, start with a lowercase letter, and contain
        alphanumeric characters or underscores only.

     --enablement-state=ENABLEMENT_STATE
        Sets the enablement state of the Security Health Analytics custom
        module. From the following list of possible enablement states, specify
        either enabled or disabled only. ENABLEMENT_STATE must be one of:
        disabled, enabled, enablement-state-unspecified, inherited.

OPTIONAL FLAGS
     At most one of these can be specified:

       --folder=FOLDER
          Folder where the Security Health Analytics custom module resides.
          Formatted as folders/456 or just 456.

       --organization=ORGANIZATION
          Organization where the Security Health Analytics custom module
          resides. Formatted as organizations/123 or just 123.

       --project=PROJECT
          ID or number of the project where the Security Health Analytics
          custom module resides. Formatted as projects/789 or just 789.

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
    This variant is also available:

        $ gcloud alpha scc custom-modules sha create
```

### gcloud scc custom-modules sha delete

```text
NAME
    gcloud scc custom-modules sha delete - delete a Security Health Analytics
        custom module

SYNOPSIS
    gcloud scc custom-modules sha delete CUSTOM_MODULE
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Security Health Analytics custom module.

EXAMPLES
    To delete a Security Health Analytics custom module with ID 123456 for
    organization 123, run:

        $ gcloud scc custom-modules sha delete 123456 \
            --organization=organizations/123

    To delete a Security Health Analytics custom module with ID 123456 for
    folder 456, run:

        $ gcloud scc custom-modules sha delete 123456 --folder=folders/456

    To delete a Security Health Analytics custom module with ID 123456 for
    project 789, run:

        $ gcloud scc custom-modules sha delete 123456 --project=projects/789

POSITIONAL ARGUMENTS
     CUSTOM_MODULE
        ID or the full resource name of the Security Health Analytics custom
        module. If you specify the full resource name, you do not need to
        specify the --organization, --folder, or --project flags.

FLAGS
     At most one of these can be specified:

       --folder=FOLDER
          Folder where the Security Health Analytics custom module resides.
          Formatted as folders/456 or just 456.

       --organization=ORGANIZATION
          Organization where the Security Health Analytics custom module
          resides. Formatted as organizations/123 or just 123.

       --project=PROJECT
          ID or number of the project where the Security Health Analytics
          custom module resides. Formatted as projects/789 or just 789.

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
    This variant is also available:

        $ gcloud alpha scc custom-modules sha delete
```

### gcloud scc custom-modules sha get

```text
NAME
    gcloud scc custom-modules sha get - get the details of a Security Health
        Analytics custom module

SYNOPSIS
    gcloud scc custom-modules sha get CUSTOM_MODULE
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the details of a Security Health Analytics custom module. It does not
    resolve INHERITED enablement states to ENABLED or DISABLED for modules
    created at ancestor levels. For example, if the module is enabled at the
    ancestor level, modules for all child resources will have the enablement
    state set to INHERITED. Use gcloud scc custom-modules sha get-effective to
    retrieve a custom module with its effective enablement state.

EXAMPLES
    To get the details of a Security Health Analytics custom module with ID
    123456 for organization 123, run:

        $ gcloud scc custom-modules sha get 123456 \
            --organization=organizations/123

    To get the details of a Security Health Analytics custom module with ID
    123456 for folder 456, run:

        $ gcloud scc custom-modules sha get 123456 --folder=folders/456

    To get the details of a Security Health Analytics custom module with ID
    123456 for project 789, run:

        $ gcloud scc custom-modules sha get 123456 --project=projects/789

POSITIONAL ARGUMENTS
     CUSTOM_MODULE
        ID or the full resource name of the Security Health Analytics custom
        module. If you specify the full resource name, you do not need to
        specify the --organization, --folder, or --project flags.

FLAGS
     At most one of these can be specified:

       --folder=FOLDER
          Folder from which to get the custom module details. Formatted as
          folders/456 or just 456.

       --organization=ORGANIZATION
          Organization from which to get the custom module details. Formatted
          as organizations/123 or just 123.

       --project=PROJECT
          ID or number of the project from which to get the custom module
          details. Formatted as projects/789 or just 789.

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
    This variant is also available:

        $ gcloud alpha scc custom-modules sha get
```

### gcloud scc custom-modules sha get-effective

```text
NAME
    gcloud scc custom-modules sha get-effective - get the details of a Security
        Health Analytics custom module with effective enablement state

SYNOPSIS
    gcloud scc custom-modules sha get-effective CUSTOM_MODULE
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the details of a Security Health Analytics custom module. For inherited
    custom modules, the get-effective command resolves INHERITED enablement
    states to ENABLED or DISABLED. For example, if an inherited custom module
    is enabled at the ancestor level, then the get-effective command displays
    the enablement state as ENABLED instead of INHERITED in a child folder or
    project.

EXAMPLES
    To get the details of a Security Health Analytics custom module 123456 with
    its effective enablement state from organization 123, run:

        $ gcloud scc custom-modules sha get-effective 123456 \
            --organization=organizations/123

    To get the details of a Security Health Analytics custom module 123456 with
    its effective enablement state from folder 456, run:

        $ gcloud scc custom-modules sha get-effective 123456 \
            --folder=folders/456

    To get the details of a Security Health Analytics custom module 123456 with
    its effective enablement state from project 789, run:

        $ gcloud scc custom-modules sha get-effective 123456 \
            --project=projects/789

POSITIONAL ARGUMENTS
     CUSTOM_MODULE
        ID or the full resource name of the effective Security Health Analytics
        custom module. If you specify the full resource name, you do not need
        to specify the --organization, --folder, or --project flags.

FLAGS
     At most one of these can be specified:

       --folder=FOLDER
          Folder from which to get the custom module details. Formatted as
          folders/456 or just 456.

       --organization=ORGANIZATION
          Organization from which to get the custom module details. Formatted
          as organizations/123 or just 123.

       --project=PROJECT
          ID or number of the project from which to get the custom module
          details. Formatted as projects/789 or just 789.

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
    This variant is also available:

        $ gcloud alpha scc custom-modules sha get-effective
```

### gcloud scc custom-modules sha list

```text
NAME
    gcloud scc custom-modules sha list - list the details of Security Health
        Analytics custom modules

SYNOPSIS
    gcloud scc custom-modules sha list
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the details of the resident and inherited Security Health Analytics
    custom modules for the specified folder or project. For an organization,
    this command lists only the custom modules that are created at the
    organization level. Custom modules created in child folders or projects are
    not included in the list. To list the resident custom modules and the
    modules that are created in child folders or projects, use gcloud scc
    custom-modules sha list-descendant.

EXAMPLES
    To list resident and inherited Security Health Analytics custom modules for
    organization 123, run:

        $ gcloud scc custom-modules sha list --organization=organizations/123

    To list resident and inherited Security Health Analytics custom modules for
    folder 456, run:

        $ gcloud scc custom-modules sha list --folder=folders/456

    To list resident and inherited Security Health Analytics custom modules for
    project 789, run:

        $ gcloud scc custom-modules sha list --project=projects/789

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER
          Folder for listing the Security Health Analytics custom modules
          created at the current folder level and inherited modules from CRM
          ancestors. Formatted as folders/456 or just 456.

       --organization=ORGANIZATION
          Organization for listing the Security Health Analytics custom modules
          created at the organization level. Formatted as organizations/123 or
          just 123.

       --project=PROJECT
          ID or number of the project for listing the Security Health Analytics
          custom modules created at current project level and inherited modules
          from CRM ancestors. Formatted as projects/789 or just 789.

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
    This variant is also available:

        $ gcloud alpha scc custom-modules sha list
```

### gcloud scc custom-modules sha list-descendant

```text
NAME
    gcloud scc custom-modules sha list-descendant - list the details of the
        resident and descendant Security Health Analytics custom modules

SYNOPSIS
    gcloud scc custom-modules sha list-descendant
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the details of the resident and descendant Security Health Analytics
    custom modules for a specified organization or folder. For a project, this
    command lists only the custom modules that are created in the project.
    Modules created in a parent organization or folder are excluded from the
    list. To list the resident custom modules and the modules that are
    inherited from a parent organization and folder, use gcloud scc
    custom-modules sha list.

EXAMPLES
    To list resident and descendant Security Health Analytics custom modules
    for organization 123, run:

        $ gcloud scc custom-modules sha list-descendant \
            --organization=organizations/123

    To list resident and descendant Security Health Analytics custom modules
    for folder 456, run:

        $ gcloud scc custom-modules sha list-descendant --folder=folders/456

    To list resident and descendant Security Health Analytics custom modules
    for project 789, run:

        $ gcloud scc custom-modules sha list-descendant \
            --project=projects/789

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER
          Folder for listing the Security Health Analytics custom modules
          created at the current folder level and its child resources.
          Formatted as folders/456 or just 456.

       --organization=ORGANIZATION
          Organization for listing the Security Health Analytics custom modules
          created at the organization level and its child resources. Formatted
          as organizations/123 or just 123.

       --project=PROJECT
          ID or number of the project for listing the Security Health Analytics
          custom modules at current project level. Formatted as projects/789 or
          just 789.

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
    This variant is also available:

        $ gcloud alpha scc custom-modules sha list-descendant
```

### gcloud scc custom-modules sha list-effective

```text
NAME
    gcloud scc custom-modules sha list-effective - list the details of Security
        Health Analytics custom modules with effective enablement states

SYNOPSIS
    gcloud scc custom-modules sha list-effective
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the details of resident and inherited Security Health Analytics custom
    modules for the specified folder or project with their effective enablement
    states. For an organization, this command lists only the custom modules
    that are created at the organization level. Custom modules created in child
    folders or projects are not included in the list.

EXAMPLES
    To list resident and inherited Security Health Analytics custom modules
    with effective enablement states for organization 123, run:

        $ gcloud scc custom-modules sha list-effective \
            --organization=organizations/123

    To list resident and inherited effective Security Health Analytics custom
    modules with effective enablement states for folder 456, run:

        $ gcloud scc custom-modules sha list-effective --folder=folders/456

    To list resident and inherited effective Security Health Analytics custom
    modules with effective enablement states for project 789, run:

        $ gcloud scc custom-modules sha list-effective --project=projects/789

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER
          Folder for listing the effective Security Health Analytics custom
          modules created at the current folder level and inherited modules
          from CRM ancestors. Formatted as folders/456 or just 456.

       --organization=ORGANIZATION
          Organization for listing the effective Security Health Analytics
          custom modules created at the organization level. Formatted as
          organizations/123 or just 123.

       --project=PROJECT
          ID or number of the project for listing the effective Security Health
          Analytics custom modules for the current project level and inherited
          modules from CRM ancestors. Formatted as projects/789 or just 789.

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
    This variant is also available:

        $ gcloud alpha scc custom-modules sha list-effective
```

### gcloud scc custom-modules sha simulate

```text
NAME
    gcloud scc custom-modules sha simulate - validates a Security Health
        Analytics custom module

SYNOPSIS
    gcloud scc custom-modules sha simulate
        --custom-config-from-file=PATH_TO_FILE
        --resource-from-file=PATH_TO_FILE
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Validates a given Security Health Analytics custom module and resource.

EXAMPLES
    To validate a Security Health Analytics custom module against a custom
    resource for organization 123, run:

        $ gcloud scc custom-modules sha simulate \
            --organization=organizations/123 \
            --custom-config-from-file=/tmp/custom_config.yaml \
            --resource-from-file=/tmp/resource.yaml

    To validate a Security Health Analytics custom module against a custom
    resource for folder 456, run:

        $ gcloud scc custom-modules sha simulate --folder=folders/456 \
            --custom-config-from-file=/tmp/custom_config.yaml \
            --resource-from-file=/tmp/resource.yaml

    To validate a Security Health Analytics custom module against a custom
    resource for project 789, run:

        $ gcloud scc custom-modules sha simulate --project=projects/789 \
            --custom-config-from-file=/tmp/custom_config.yaml \
            --resource-from-file=/tmp/resource.yaml

REQUIRED FLAGS
     --custom-config-from-file=PATH_TO_FILE
        Path to a YAML file that contains the configuration for the Security
        Health Analytics custom module. Use a full or relative path to a local
        file containing the value of custom_config.

     --resource-from-file=PATH_TO_FILE
        Path to a YAML file that contains the resource data to validate the
        Security Health Analytics custom module against. Use a full or relative
        path to a local file containing the value of resource.

     Exactly one of these must be specified:

       --folder=FOLDER
          Folder that will own the Security Health Analytics custom module.
          Formatted as folders/456 or just 456.

       --organization=ORGANIZATION
          Organization that will own the Security Health Analytics custom
          module. Formatted as organizations/123 or just 123.

       --project=PROJECT
          ID or number of the project that will own the Security Health
          Analytics custom module. Formatted as projects/789 or just 789.

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
    This variant is also available:

        $ gcloud alpha scc custom-modules sha simulate
```

### gcloud scc custom-modules sha update

```text
NAME
    gcloud scc custom-modules sha update - update a Security Health Analytics
        custom module

SYNOPSIS
    gcloud scc custom-modules sha update CUSTOM_MODULE
        [--custom-config-from-file=PATH_TO_FILE]
        [--enablement-state=ENABLEMENT_STATE] [--update-mask=UPDATE_MASK]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Security Health Analytics custom module.

EXAMPLES
    To update a Security Health Analytics custom module with ID 123456 for
    organization 123, run:

        $ gcloud scc custom-modules sha update 123456 \
            --organization=organizations/123 --enablement-state="ENABLED" \
            --custom-config-from-file=custom_config.yaml

    To update a Security Health Analytics custom module with ID 123456 for
    folder 456, run:

        $ gcloud scc custom-modules sha update 123456 --folder=folders/456 \
            --enablement-state="ENABLED" \
            --custom-config-from-file=custom_config.yaml

    To update a Security Health Analytics custom module with ID 123456 for
    project 789, run:

        $ gcloud scc custom-modules sha update 123456 \
            --project=projects/789 --enablement-state="ENABLED" \
            --custom-config-from-file=custom_config.yaml

POSITIONAL ARGUMENTS
     CUSTOM_MODULE
        ID or the full resource name of the Security Health Analytics custom
        module. If you specify the full resource name, you do not need to
        specify the --organization, --folder, or --project flags.

FLAGS
     --custom-config-from-file=PATH_TO_FILE
        Path to a YAML file that contains the configuration for the Security
        Health Analytics custom module. Use a full or relative path to a local
        file containing the value of custom_config.

     --enablement-state=ENABLEMENT_STATE
        Sets the enablement state of the Security Health Analytics custom
        module. From the following list of possible enablement states, specify
        either enabled, disabled or inherited only. ENABLEMENT_STATE must be
        one of: disabled, enabled, enablement-state-unspecified, inherited.

     --update-mask=UPDATE_MASK
        Optional: If left unspecified (default), an update-mask is
        automatically created using the flags specified in the command and only
        those values are updated.

     At most one of these can be specified:

       --folder=FOLDER
          Folder where the Security Health Analytics custom module resides.
          Formatted as folders/456 or just 456.

       --organization=ORGANIZATION
          Organization where the Security Health Analytics custom module
          resides. Formatted as organizations/123 or just 123.

       --project=PROJECT
          ID or number of the project where the Security Health Analytics
          custom module resides. Formatted as projects/789 or just 789.

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
    This variant is also available:

        $ gcloud alpha scc custom-modules sha update
```

### gcloud alpha scc custom-modules sha create

```text
NAME
    gcloud alpha scc custom-modules sha create - create a Security Health
        Analytics custom module

SYNOPSIS
    gcloud alpha scc custom-modules sha create
        --custom-config-from-file=PATH_TO_FILE --display-name=DISPLAY_NAME
        --enablement-state=ENABLEMENT_STATE
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc custom-modules sha delete

```text
NAME
    gcloud alpha scc custom-modules sha delete - delete a Security Health
        Analytics custom module

SYNOPSIS
    gcloud alpha scc custom-modules sha delete CUSTOM_MODULE
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc custom-modules sha get

```text
NAME
    gcloud alpha scc custom-modules sha get - get the details of a Security
        Health Analytics custom module

SYNOPSIS
    gcloud alpha scc custom-modules sha get CUSTOM_MODULE
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc custom-modules sha get-effective

```text
NAME
    gcloud alpha scc custom-modules sha get-effective - get the details of a
        Security Health Analytics custom module with effective enablement state

SYNOPSIS
    gcloud alpha scc custom-modules sha get-effective CUSTOM_MODULE
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc custom-modules sha list

```text
NAME
    gcloud alpha scc custom-modules sha list - list the details of Security
        Health Analytics custom modules

SYNOPSIS
    gcloud alpha scc custom-modules sha list
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc custom-modules sha list-descendant

```text
NAME
    gcloud alpha scc custom-modules sha list-descendant - list the details of
        the resident and descendant Security Health Analytics custom modules

SYNOPSIS
    gcloud alpha scc custom-modules sha list-descendant
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc custom-modules sha list-effective

```text
NAME
    gcloud alpha scc custom-modules sha list-effective - list the details of
        Security Health Analytics custom modules with effective enablement
        states

SYNOPSIS
    gcloud alpha scc custom-modules sha list-effective
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc custom-modules sha simulate

```text
NAME
    gcloud alpha scc custom-modules sha simulate - validates a Security Health
        Analytics custom module

SYNOPSIS
    gcloud alpha scc custom-modules sha simulate
        --custom-config-from-file=PATH_TO_FILE
        --resource-from-file=PATH_TO_FILE
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc custom-modules sha test

```text
NAME
    gcloud alpha scc custom-modules sha test - test a Security Health Analytics
        custom module

SYNOPSIS
    gcloud alpha scc custom-modules sha test CUSTOM_MODULE
        --test-data-from-file=PATH_TO_FILE
        [--custom-config-from-file=PATH_TO_FILE] [--display-name=DISPLAY_NAME]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc custom-modules sha update

```text
NAME
    gcloud alpha scc custom-modules sha update - update a Security Health
        Analytics custom module

SYNOPSIS
    gcloud alpha scc custom-modules sha update CUSTOM_MODULE
        [--custom-config-from-file=PATH_TO_FILE]
        [--enablement-state=ENABLEMENT_STATE] [--update-mask=UPDATE_MASK]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/custom-modules/sha (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
