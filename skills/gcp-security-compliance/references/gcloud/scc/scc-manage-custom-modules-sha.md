---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/custom-modules/sha
---

# gcloud scc manage custom-modules sha

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scc manage custom-modules sha create

```text
NAME
    gcloud scc manage custom-modules sha create - create an Security Health
        Analytics custom module

SYNOPSIS
    gcloud scc manage custom-modules sha create
        --custom-config-from-file=CUSTOM_CONFIG --display-name=DISPLAY-NAME
        --enablement-state=ENABLEMENT_STATE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--validate-only]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To create a Security Health Analytics custom module for organization 123,
    run:

        $ gcloud scc manage custom-modules sha create \
            --organization=organizations/123 \
            --display-name="test_display_name" \
            --enablement-state="ENABLED" \
            --custom-config-from-file=custom_config.yaml

REQUIRED FLAGS
     --custom-config-from-file=CUSTOM_CONFIG
        Path to a YAML custom configuration file. Use a full or relative path
        to a local file containing the value of custom_config.

     --display-name=DISPLAY-NAME
        The display name of the custom module.

     --enablement-state=ENABLEMENT_STATE
        Sets the enablement state of the Security Health Analytics custom
        module. Valid options are ENABLED, DISABLED, OR INHERITED.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder associated with the custom module.

       --organization=ORGANIZATION_ID
          Organization associated with the custom module.

       --parent=PARENT
          Parent associated with the custom module. Can be one of
          organizations/<id>, projects/<id or name>, folders/<id>

       --project=PROJECT_ID_OR_NUMBER
          Project associated with the custom module.

OPTIONAL FLAGS
     --validate-only
        If present, the request is validated (including IAM checks) but no
        action is taken.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha scc manage custom-modules sha create
```

### gcloud scc manage custom-modules sha delete

```text
NAME
    gcloud scc manage custom-modules sha delete - delete a Security Health
        Analytics custom module

SYNOPSIS
    gcloud scc manage custom-modules sha delete MODULE_ID_OR_NAME
        [--validate-only]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Security Health Analytics custom module. User specifies the custom
    module as well as the parent of the module to delete. A validation_only
    flag is optional. When set to true only validations (including IAM checks)
    will done for the request (module will not be deleted).

EXAMPLES
    To delete an Security Health Analytics custom module with ID 123456 for
    organization 123, run:

        $ gcloud scc manage custom-modules sha delete 123456 \
            --organization=123

    To delete a Security Health Analytics custom module with ID 123456 for
    folder 456, run:

        $ gcloud scc manage custom-modules sha delete 123456 --folder=456

    To delete a Security Health Analytics custom module with ID 123456 for
    project 789, run:

        $ gcloud scc manage custom-modules sha delete 123456 --project=789

    You can also specify the parent more generally:

        $ gcloud scc manage custom-modules sha delete 123456 \
            --parent=organizations/123

    Or just specify the fully qualified module name:

        $ gcloud scc manage custom-modules sha delete \
            organizations/123/locations/global/\
        securityHealthAnalyticsCustomModules/123456

POSITIONAL ARGUMENTS
     MODULE_ID_OR_NAME
        The custom module ID or name. The expected format is
        {parent}/[locations/global]/securityHealthAnalyticsCustomModules/{module_id}
        or just {module_id}. Where module_id is a numeric identifier 1-20
        characters in length. Parent is of the form organizations/{id},
        projects/{id or name}, folders/{id}.

FLAGS
     --validate-only
        If present, the request is validated (including IAM checks) but no
        action is taken.

     At most one of these can be specified:

       --folder=FOLDER_ID
          Folder associated with the custom module.

       --organization=ORGANIZATION_ID
          Organization associated with the custom module.

       --parent=PARENT
          Parent associated with the custom module. Can be one of
          organizations/<id>, projects/<id or name>, folders/<id>

       --project=PROJECT_ID_OR_NUMBER
          Project associated with the custom module.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha scc manage custom-modules sha delete
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud scc manage custom-modules sha delete organizations/123/locations/global/securityHealthAnalyticsCustomModules/123456
```

### gcloud scc manage custom-modules sha describe

```text
NAME
    gcloud scc manage custom-modules sha describe - get the details of a
        Security Health Analytics custom module

SYNOPSIS
    gcloud scc manage custom-modules sha describe MODULE_ID_OR_NAME
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the details of a Security Health Analytics custom module. It does not
    resolve INHERITED enablement states to ENABLED or DISABLED for modules
    created at ancestor levels. For example, if the module is enabled at the
    ancestor level, modules for all child resources will have the enablement
    state set to INHERITED. Use gcloud scc manage custom-modules sha
    describe-effective to retrieve a custom module with its effective
    enablement state.

EXAMPLES
    To get the details of a Security Health Analytics custom module with ID
    123456 for organization 123, run:

        $ gcloud scc manage custom-modules sha describe 123456 \
            --organization=123

    To get the details of a Security Health Analytics custom module with ID
    123456 for folder 456, run:

        $ gcloud scc manage custom-modules sha describe 123456 --folder=456

    To get the details of a Security Health Analytics custom module with ID
    123456 for project 789, run:

        $ gcloud scc manage custom-modules sha describe 123456 --project=789

    You can also specify the parent more generally:

        $ gcloud scc manage custom-modules sha describe 123456 \
            --parent=organizations/123

    Or just specify the fully qualified module name:

        $ gcloud scc manage custom-modules sha describe \
            organizations/123/locations/global/\
        securityHealthAnalyticsCustomModules/123456

POSITIONAL ARGUMENTS
     MODULE_ID_OR_NAME
        The custom module ID or name. The expected format is
        {parent}/[locations/global]/securityHealthAnalyticsCustomModules/{module_id}
        or just {module_id}. Where module_id is a numeric identifier 1-20
        characters in length. Parent is of the form organizations/{id},
        projects/{id or name}, folders/{id}.

FLAGS
     At most one of these can be specified:

       --folder=FOLDER_ID
          Folder associated with the custom module.

       --organization=ORGANIZATION_ID
          Organization associated with the custom module.

       --parent=PARENT
          Parent associated with the custom module. Can be one of
          organizations/<id>, projects/<id or name>, folders/<id>

       --project=PROJECT_ID_OR_NUMBER
          Project associated with the custom module.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha scc manage custom-modules sha describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud scc manage custom-modules sha describe organizations/123/locations/global/securityHealthAnalyticsCustomModules/123456
```

### gcloud scc manage custom-modules sha describe-effective

```text
NAME
    gcloud scc manage custom-modules sha describe-effective - get effective the
        details of a Security Health Analytics effective custom module

SYNOPSIS
    gcloud scc manage custom-modules sha describe-effective MODULE_ID_OR_NAME
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the effective details of a Security Health Analytics effective custom
    module. It retrieves a custom module with its effective enablement state.

EXAMPLES
    To get the effective details of a Security Health Analytics custom module
    with ID 123456 for organization 123, run:

        $ gcloud scc manage custom-modules sha describe-effective 123456 \
            --organization=123

    To get the effective details of a Security Health Analytics custom module
    with ID 123456 for folder 456, run:

        $ gcloud scc manage custom-modules sha describe-effective 123456 \
            --folder=456

    To get the effective details of a Security Health Analytics custom module
    with ID 123456 for project 789, run:

        $ gcloud scc manage custom-modules sha describe-effective 123456 \
            --project=789

    You can also specify the parent more generally:

        $ gcloud scc manage custom-modules sha describe-effective 123456 \
            --parent=organizations/123

    Or just specify the fully qualified module name:

        $ gcloud scc manage custom-modules sha describe-effective \
            organizations/123/locations/global/\
        effectiveSecurityHealthAnalyticsCustomModules/123456

POSITIONAL ARGUMENTS
     MODULE_ID_OR_NAME
        The custom module ID or name. The expected format is
        {parent}/[locations/global]/effectiveSecurityHealthAnalyticsCustomModules/{module_id}
        or just {module_id}. Where module_id is a numeric identifier 1-20
        characters in length. Parent is of the form organizations/{id},
        projects/{id or name}, folders/{id}.

FLAGS
     At most one of these can be specified:

       --folder=FOLDER_ID
          Folder associated with the custom module.

       --organization=ORGANIZATION_ID
          Organization associated with the custom module.

       --parent=PARENT
          Parent associated with the custom module. Can be one of
          organizations/<id>, projects/<id or name>, folders/<id>

       --project=PROJECT_ID_OR_NUMBER
          Project associated with the custom module.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha scc manage custom-modules sha describe-effective
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud scc manage custom-modules sha describe-effective organizations/123/locations/global/effectiveSecurityHealthAnalyticsCustomModules/123456
```

### gcloud scc manage custom-modules sha list

```text
NAME
    gcloud scc manage custom-modules sha list - list the details of Security
        Health Analyics custom modules

SYNOPSIS
    gcloud scc manage custom-modules sha list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the details of the resident and inherited Security Health Analytics
    custom modules for the specified folder or project. For an organization,
    this command lists only the custom modules that are created at the
    organization level. Custom modules created in child folders or projects are
    not included in the list. To list the resident custom modules and the
    modules that are created in child folders or projects, use gcloud scc
    manage custom-modules sha list-descendant.

EXAMPLES
    To list resident and inherited Security Health Analytics custom modules for
    organization 123, run:

        $ gcloud scc manage custom-modules sha list \
            --organization=organizations/123

    To list resident and inherited Security Health Analytics custom modules for
    folder 456, run:

        $ gcloud scc manage custom-modules sha list --folder=folders/456

    To list resident and inherited Security Health Analytics custom modules for
    project 789, run:

        $ gcloud scc manage custom-modules sha list --project=projects/789

    You can also specify the parent more generally:

        $ gcloud scc manage custom-modules sha list 123456 \
            --parent=organizations/123

    Or just specify the fully qualified module name:

        $ gcloud scc manage custom-modules sha list \
            organizations/123/locations/global/\
        securityHealthAnalyticsCustomModules/123456

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder associated with the custom module.

       --organization=ORGANIZATION_ID
          Organization associated with the custom module.

       --parent=PARENT
          Parent associated with the custom module. Can be one of
          organizations/<id>, projects/<id or name>, folders/<id>

       --project=PROJECT_ID_OR_NUMBER
          Project associated with the custom module.

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

NOTES
    This variant is also available:

        $ gcloud alpha scc manage custom-modules sha list
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud scc manage custom-modules sha list \
    --parent=organizations/123
```

### gcloud scc manage custom-modules sha list-descendant

```text
NAME
    gcloud scc manage custom-modules sha list-descendant - list the details of
        the resident and descendant Security Health Analytics custom modules

SYNOPSIS
    gcloud scc manage custom-modules sha list-descendant
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the details of the resident and descendant Security Health Analytics
    custom modules for a specified organization or folder. For a project, this
    command lists only the custom modules that are created in the project.
    Modules created in a parent organization or folder are excluded from the
    list. To list the resident custom modules and the modules that are
    inherited from a parent organization and folder, use gcloud scc manage
    custom-modules sha list.

EXAMPLES
    To list resident and inherited Security Health Analytics custom modules for
    organization 123, run:

        $ gcloud scc manage custom-modules sha list-descendant \
            --organization=organizations/123

    To list resident and inherited Security Health Analytics custom modules for
    folder 456, run:

        $ gcloud scc manage custom-modules sha list-descendant \
            --folder=folders/456

    To list resident and inherited Security Health Analytics custom modules for
    project 789, run:

        $ gcloud scc manage custom-modules sha list-descendant \
            --project=projects/789

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder associated with the custom module.

       --organization=ORGANIZATION_ID
          Organization associated with the custom module.

       --parent=PARENT
          Parent associated with the custom module. Can be one of
          organizations/<id>, projects/<id or name>, folders/<id>

       --project=PROJECT_ID_OR_NUMBER
          Project associated with the custom module.

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

NOTES
    This variant is also available:

        $ gcloud alpha scc manage custom-modules sha list-descendant
```

### gcloud scc manage custom-modules sha list-effective

```text
NAME
    gcloud scc manage custom-modules sha list-effective - list the details of
        an Security Health Analytics effective custom module

SYNOPSIS
    gcloud scc manage custom-modules sha list-effective
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the details of resident and inherited Security Health Analytics custom
    modules for the specified folder or project with their effective enablement
    states. For an organization, this command lists only the custom modules
    that are created at the organization level. Custom modules created in child
    folders or projects are not included in the list.

EXAMPLES
    To list resident and inherited Security Health Analytics custom modules
    with effective enablement states for organization 123, run:

        $ gcloud scc manage custom-modules sha list-effective \
            --organization=organizations/123

    To list resident and inherited effective Security Health Analytics custom
    modules with effective enablement states for folder 456, run:

        $ gcloud scc manage custom-modules sha list-effective \
            --folder=folders/456

    To list resident and inherited effective Security Health Analytics custom
    modules with effective enablement states for project 789, run:

        $ gcloud scc manage custom-modules sha list-effective \
            --project=projects/789

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder associated with the custom module.

       --organization=ORGANIZATION_ID
          Organization associated with the custom module.

       --parent=PARENT
          Parent associated with the custom module. Can be one of
          organizations/<id>, projects/<id or name>, folders/<id>

       --project=PROJECT_ID_OR_NUMBER
          Project associated with the custom module.

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

NOTES
    This variant is also available:

        $ gcloud alpha scc manage custom-modules sha list-effective
```

### gcloud scc manage custom-modules sha simulate

```text
NAME
    gcloud scc manage custom-modules sha simulate - command to simulate a SHA
        custom module

SYNOPSIS
    gcloud scc manage custom-modules sha simulate
        --custom-config-from-file=CUSTOM_CONFIG --resource-from-file=TEST_DATA
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To simulate a Security Health Analytics custom module with ID 123456 for
    organization 123, run:

        $ gcloud scc manage custom-modules sha simulate 123456 \
            --organization=123 \
            --custom-config-from-file=custom_config.yaml \
            --resource-from-file=test.yaml

    To simulate a Security Health Analytics custom module with ID 123456 for
    folder 456, run:

        $ gcloud scc manage custom-modules sha simulate 123456 \
            --folder=456 --custom-config-from-file=custom_config.yaml \
            --resource-from-file=test.yaml

    To simulate a Security Health Analytics custom module with ID 123456 for
    project 789, run:

        $ gcloud scc manage custom-modules sha simulate 123456 \
            --project=789 --custom-config-from-file=custom_config.yaml \
            --resource-from-file=test.yaml

    You can also specify the parent more generally:

        $ gcloud scc manage custom-modules sha simulate 123456 \
            --parent=organizations/123 \
            --custom-config-from-file=custom_config.yaml \
            --resource-from-file=test.yaml

    Or just specify the fully qualified module name:

        $ gcloud scc manage custom-modules sha simulate \
            organizations/123/locations/global/\
        effectiveSecurityHealthAnalyticsCustomModules/123456 \
            --custom-config-from-file=custom_config.yaml \
            --resource-from-file=test.yaml

REQUIRED FLAGS
     --custom-config-from-file=CUSTOM_CONFIG
        Path to a YAML custom configuration file. Use a full or relative path
        to a local file containing the value of custom_config.

     --resource-from-file=TEST_DATA
        Path to a YAML file that contains the resource data to validate the
        Security Health Analytics custom module against. Use a full or relative
        path to a local file containing the value of resource.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder associated with the custom module.

       --organization=ORGANIZATION_ID
          Organization associated with the custom module.

       --parent=PARENT
          Parent associated with the custom module. Can be one of
          organizations/<id>, projects/<id or name>, folders/<id>

       --project=PROJECT_ID_OR_NUMBER
          Project associated with the custom module.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha scc manage custom-modules sha simulate
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud scc manage custom-modules sha simulate \
    --organization=123 \
    --custom-config-from-file=custom_config.yaml \
    --resource-from-file=test.yaml

gcloud scc manage custom-modules sha simulate \
    --folder=456 \
    --custom-config-from-file=custom_config.yaml \
    --resource-from-file=test.yaml

gcloud scc manage custom-modules sha simulate \
    --project=789 \
    --custom-config-from-file=custom_config.yaml \
    --resource-from-file=test.yaml

gcloud scc manage custom-modules sha simulate \
    --parent=organizations/123 \
    --custom-config-from-file=custom_config.yaml \
    --resource-from-file=test.yaml
```

### gcloud scc manage custom-modules sha update

```text
NAME
    gcloud scc manage custom-modules sha update - update a Security Health
        Analytics custom module

SYNOPSIS
    gcloud scc manage custom-modules sha update MODULE_ID_OR_NAME
        (--custom-config-file=PATH_TO_FILE --enablement-state=ENABLEMENT_STATE)
        [--validate-only]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To update an Security Health Analytics custom module with ID 123456 for
    organization 123, run:

        $ gcloud scc manage custom-modules sha update 123456 \
          --organization=organizations/123 --enablement-state="ENABLED" \
          --custom-config-file=custom_config.yaml

POSITIONAL ARGUMENTS
     MODULE_ID_OR_NAME
        The custom module ID or name. The expected format is
        {parent}/[locations/global]/securityHealthAnalyticsCustomModules/{module_id}
        or just {module_id}. Where module_id is a numeric identifier 1-20
        characters in length. Parent is of the form organizations/{id},
        projects/{id or name}, folders/{id}.

REQUIRED FLAGS
     At least one of these must be specified:

       --custom-config-file=PATH_TO_FILE
          Path to a YAML file that contains the custom config to set for the
          module. Use a full or relative path to a local file containing the
          value of custom_config_file.

       --enablement-state=ENABLEMENT_STATE
          Sets the enablement state of the Security Health Analytics custom
          module. Valid options are ENABLED, DISABLED, OR INHERITED.

OPTIONAL FLAGS
     --validate-only
        If present, the request is validated (including IAM checks) but no
        action is taken.

     At most one of these can be specified:

       --folder=FOLDER_ID
          Folder associated with the custom module.

       --organization=ORGANIZATION_ID
          Organization associated with the custom module.

       --parent=PARENT
          Parent associated with the custom module. Can be one of
          organizations/<id>, projects/<id or name>, folders/<id>

       --project=PROJECT_ID_OR_NUMBER
          Project associated with the custom module.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha scc manage custom-modules sha update
```

### gcloud alpha scc manage custom-modules sha create

```text
NAME
    gcloud alpha scc manage custom-modules sha create - create an Security
        Health Analytics custom module

SYNOPSIS
    gcloud alpha scc manage custom-modules sha create
        --custom-config-from-file=CUSTOM_CONFIG --display-name=DISPLAY-NAME
        --enablement-state=ENABLEMENT_STATE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc manage custom-modules sha delete

```text
NAME
    gcloud alpha scc manage custom-modules sha delete - delete a Security
        Health Analytics custom module

SYNOPSIS
    gcloud alpha scc manage custom-modules sha delete MODULE_ID_OR_NAME
        [--validate-only]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc manage custom-modules sha describe

```text
NAME
    gcloud alpha scc manage custom-modules sha describe - get the details of a
        Security Health Analytics custom module

SYNOPSIS
    gcloud alpha scc manage custom-modules sha describe MODULE_ID_OR_NAME
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc manage custom-modules sha describe-effective

```text
NAME
    gcloud alpha scc manage custom-modules sha describe-effective - get
        effective the details of a Security Health Analytics effective custom
        module

SYNOPSIS
    gcloud alpha scc manage custom-modules sha describe-effective
        MODULE_ID_OR_NAME
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc manage custom-modules sha list

```text
NAME
    gcloud alpha scc manage custom-modules sha list - list the details of
        Security Health Analyics custom modules

SYNOPSIS
    gcloud alpha scc manage custom-modules sha list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc manage custom-modules sha list-descendant

```text
NAME
    gcloud alpha scc manage custom-modules sha list-descendant - list the
        details of the resident and descendant Security Health Analytics custom
        modules

SYNOPSIS
    gcloud alpha scc manage custom-modules sha list-descendant
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc manage custom-modules sha list-effective

```text
NAME
    gcloud alpha scc manage custom-modules sha list-effective - list the
        details of an Security Health Analytics effective custom module

SYNOPSIS
    gcloud alpha scc manage custom-modules sha list-effective
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc manage custom-modules sha simulate

```text
NAME
    gcloud alpha scc manage custom-modules sha simulate - command to simulate a
        SHA custom module

SYNOPSIS
    gcloud alpha scc manage custom-modules sha simulate
        --custom-config-from-file=CUSTOM_CONFIG --resource-from-file=TEST_DATA
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc manage custom-modules sha update

```text
NAME
    gcloud alpha scc manage custom-modules sha update - update a Security
        Health Analytics custom module

SYNOPSIS
    gcloud alpha scc manage custom-modules sha update MODULE_ID_OR_NAME
        (--custom-config-file=PATH_TO_FILE --enablement-state=ENABLEMENT_STATE)
        [--validate-only]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Example error: the `list` and `simulate` examples that pass only a fully qualified module name (`organizations/123/locations/global/securityHealthAnalyticsCustomModules/123456`, `.../effectiveSecurityHealthAnalyticsCustomModules/123456`) as a positional argument fail in gcloud 593.0.0 ("unrecognized arguments: organizations/123/locations/global/..."); the `list` and `simulate` SYNOPSES take no positional arguments and require one of `--folder`, `--organization`, `--parent` or `--project`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` and `simulate` examples that pass a fully qualified module name (`organizations/123/locations/global/securityHealthAnalyticsCustomModules/123456`, `.../effectiveSecurityHealthAnalyticsCustomModules/123456`) as a positional argument fail (the SYNOPSES take no positional arguments); the parent is given with `--parent=organizations/123`, which makes them identical to the preceding `--parent` examples, so the runnable form lists those commands only once.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` example with `--parent` and the `simulate` examples pass `123456` as a positional argument, but the `list` and `simulate` SYNOPSES take no positional arguments (gcloud 593.0.0: "unrecognized arguments: 123456"); the parent is given by the flag, so the runnable form drops `123456`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/custom-modules/sha (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
