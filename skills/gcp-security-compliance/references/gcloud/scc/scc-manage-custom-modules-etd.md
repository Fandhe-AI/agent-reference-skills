---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/custom-modules/etd
---

# gcloud scc manage custom-modules etd

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scc manage custom-modules etd create

```text
NAME
    gcloud scc manage custom-modules etd create - create an Event Threat
        Detection custom module

SYNOPSIS
    gcloud scc manage custom-modules etd create
        --custom-config-file=CUSTOM_CONFIG --display-name=DISPLAY-NAME
        --enablement-state=ENABLEMENT_STATE --module-type=MODULE_TYPE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--validate-only]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To create an Event Threat Detection custom module for organization 123,
    run:

        $ gcloud scc manage custom-modules etd create \
            --organization=organizations/123 \
            --display-name="test_display_name" \
            --module-type="CONFIGURABLE_BAD_IP" \
            --enablement-state="ENABLED" --custom-config-file=config.json

REQUIRED FLAGS
     --custom-config-file=CUSTOM_CONFIG
        Path to a JSON custom configuration file of the ETD custom module. Use
        a full or relative path to a local file containing the value of
        custom_config_file.

     --display-name=DISPLAY-NAME
        The display name of the custom module.

     --enablement-state=ENABLEMENT_STATE
        Sets the enablement state of the Event Threat Detection custom module.
        Valid options are ENABLED, DISABLED, OR INHERITED.

     --module-type=MODULE_TYPE
        Type of the custom module. For a list of valid module types please
        visit
        https://cloud.google.com/security-command-center/docs/custom-modules-etd-overview#custom_modules_and_templates.

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

        $ gcloud alpha scc manage custom-modules etd create
```

### gcloud scc manage custom-modules etd delete

```text
NAME
    gcloud scc manage custom-modules etd delete - delete an Event Threat
        Detection custom module

SYNOPSIS
    gcloud scc manage custom-modules etd delete MODULE_ID_OR_NAME
        [--validate-only]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Event Threat Detection custom module. User specifies the custom
    module as well as the parent of the module to delete. A validation_only
    flag is optional. When set to true only validations (including IAM checks)
    will done for the request (module will not be deleted).

EXAMPLES
    To delete an Event Threat Detection custom module with ID 123456 for
    organization 123, run:

        $ gcloud scc manage custom-modules etd delete 123456 \
            --organization=123

    To delete a Event Threat Detection custom module with ID 123456 for folder
    456, run:

        $ gcloud scc manage custom-modules etd delete 123456 --folder=456

    To delete a Event Threat Detection custom module with ID 123456 for project
    789, run:

        $ gcloud scc manage custom-modules etd delete 123456 --project=789

    You can also specify the parent more generally:

        $ gcloud scc manage custom-modules etd delete 123456 \
            --parent=organizations/123

    Or just specify the fully qualified module name:

        $ gcloud scc manage custom-modules etd delete \
            organizations/123/locations/global/\
        eventThreatDetectionCustomModules/123456

POSITIONAL ARGUMENTS
     MODULE_ID_OR_NAME
        The custom module ID or name. The expected format is
        {parent}/[locations/global]/eventThreatDetectionCustomModules/{module_id}
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

        $ gcloud alpha scc manage custom-modules etd delete
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud scc manage custom-modules etd delete organizations/123/locations/global/eventThreatDetectionCustomModules/123456
```

### gcloud scc manage custom-modules etd describe

```text
NAME
    gcloud scc manage custom-modules etd describe - get the details of a Event
        Threat Detection custom module

SYNOPSIS
    gcloud scc manage custom-modules etd describe MODULE_ID_OR_NAME
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the details of a Event Threat Detection custom module. It does not
    resolve INHERITED enablement states to ENABLED or DISABLED for modules
    created at ancestor levels. For example, if the module is enabled at the
    ancestor level, modules for all child resources will have the enablement
    state set to INHERITED. Use gcloud scc manage custom-modules etd
    get-effective to retrieve a custom module with its effective enablement
    state.

EXAMPLES
    To get the details of a Event Threat Detection custom module with ID 123456
    for organization 123, run:

        $ gcloud scc manage custom-modules etd describe 123456 \
            --organization=123

    To get the details of a Event Threat Detection custom module with ID 123456
    for folder 456, run:

        $ gcloud scc manage custom-modules etd describe 123456 --folder=456

    To get the details of a Event Threat Detection custom module with ID 123456
    for project 789, run:

        $ gcloud scc manage custom-modules etd describe 123456 --project=789

    You can also specify the parent more generally:

        $ gcloud scc manage custom-modules etd describe 123456 \
            --parent=organizations/123

    Or just specify the fully qualified module name:

        $ gcloud scc manage custom-modules etd describe \
            organizations/123/locations/global/\
        eventThreatDetectionCustomModules/123456

POSITIONAL ARGUMENTS
     MODULE_ID_OR_NAME
        The custom module ID or name. The expected format is
        {parent}/[locations/global]/eventThreatDetectionCustomModules/{module_id}
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

        $ gcloud alpha scc manage custom-modules etd describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud scc manage custom-modules etd describe organizations/123/locations/global/eventThreatDetectionCustomModules/123456
```

### gcloud scc manage custom-modules etd describe-effective

```text
NAME
    gcloud scc manage custom-modules etd describe-effective - get the effective
        details of a Event Threat Detection effective custom module

SYNOPSIS
    gcloud scc manage custom-modules etd describe-effective MODULE_ID_OR_NAME
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the effective details of a Event Threat Detection effective custom
    module. It retrieves a custom module with its effective enablement state.

EXAMPLES
    To get the effective details of a Event Threat Detection custom module with
    ID 123456 for organization 123, run:

        $ gcloud scc manage custom-modules etd describe-effective 123456 \
            --organization=123

    To get the effective details of a Event Threat Detection custom module with
    ID 123456 for folder 456, run:

        $ gcloud scc manage custom-modules etd describe-effective 123456 \
            --folder=456

    To get the effective details of a Event Threat Detection custom module with
    ID 123456 for project 789, run:

        $ gcloud scc manage custom-modules etd describe-effective 123456 \
            --project=789

    You can also specify the parent more generally:

        $ gcloud scc manage custom-modules etd describe-effective 123456 \
            --parent=organizations/123

    Or just specify the fully qualified module name:

        $ gcloud scc manage custom-modules etd describe-effective \
            organizations/123/locations/global/\
        effectiveEventThreatDetectionCustomModules/123456

POSITIONAL ARGUMENTS
     MODULE_ID_OR_NAME
        The custom module ID or name. The expected format is
        {parent}/[locations/global]/effectiveEventThreatDetectionCustomModules/{module_id}
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

        $ gcloud alpha scc manage custom-modules etd describe-effective
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud scc manage custom-modules etd describe-effective organizations/123/locations/global/effectiveEventThreatDetectionCustomModules/123456
```

### gcloud scc manage custom-modules etd list

```text
NAME
    gcloud scc manage custom-modules etd list - list details of resident and
        inherited Event Threat Detection Custom Modules

SYNOPSIS
    gcloud scc manage custom-modules etd list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the details of the resident and inherited Event Threat Detection
    custom modules for the specified folder or project. For an organization,
    this command lists only the custom modules that are created at the
    organization level. Custom modules created in child folders or projects are
    not included in the list. To list the resident custom modules and the
    modules that are created in child folders or projects, use gcloud scc
    manage custom-modules etd list-descendant.

EXAMPLES
    To list resident and inherited Event Threat Detection custom modules for
    organization 123, run:

        $ gcloud scc manage custom-modules etd list \
            --organization=organizations/123

    To list resident and inherited Event Threat Detection custom modules for
    folder 456, run:

        $ gcloud scc manage custom-modules etd list --folder=folders/456

    To list resident and inherited Event Threat Detection custom modules for
    project 789, run:

        $ gcloud scc manage custom-modules etd list --project=projects/789

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

        $ gcloud alpha scc manage custom-modules etd list
```

### gcloud scc manage custom-modules etd list-descendant

```text
NAME
    gcloud scc manage custom-modules etd list-descendant - list the details of
        the resident and descendant Event Threat Detection custom modules

SYNOPSIS
    gcloud scc manage custom-modules etd list-descendant
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the details of the resident and descendant Event Threat Detection
    custom modules for a specified organization or folder. For a project, this
    command lists only the custom modules that are created in the project.
    Modules created in a parent organization or folder are excluded from the
    list. To list the resident custom modules and the modules that are
    inherited from a parent organization and folder, use gcloud scc manage
    custom-modules etd list.

EXAMPLES
    To list resident and descendant Event Threat Detection custom modules for
    organization 123, run:

        $ gcloud scc manage custom-modules etd list-descendant \
            --organization=organizations/123

    To list resident and descendant Event Threat Detection custom modules for
    folder 456, run:

        $ gcloud scc manage custom-modules etd list-descendant \
            --folder=folders/456

    To list resident and descendant Event Threat Detection custom modules for
    project 789, run:

        $ gcloud scc manage custom-modules etd list-descendant \
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

        $ gcloud alpha scc manage custom-modules etd list-descendant
```

### gcloud scc manage custom-modules etd list-effective

```text
NAME
    gcloud scc manage custom-modules etd list-effective - list the details of
        an Event Threat Detection effective custom module

SYNOPSIS
    gcloud scc manage custom-modules etd list-effective
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the details of resident and inherited Event Threat Detection custom
    modules for the specified folder or project with their effective enablement
    states. For an organization, this command lists only the custom modules
    that are created at the organization level. Custom modules created in child
    folders or projects are not included in the list.

EXAMPLES
    To list resident and inherited Event Threat Detection custom modules with
    effective enablement states for organization 123, run:

        $ gcloud scc manage custom-modules etd list-effective \
            --organization=organizations/123

    To list resident and inherited effective Event Threat Detection custom
    modules with effective enablement states for folder 456, run:

        $ gcloud scc manage custom-modules etd list-effective \
            --folder=folders/456

    To list resident and inherited effective Event Threat Detection custom
    modules with effective enablement states for project 789, run:

        $ gcloud scc manage custom-modules etd list-effective \
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

        $ gcloud alpha scc manage custom-modules etd list-effective
```

### gcloud scc manage custom-modules etd update

```text
NAME
    gcloud scc manage custom-modules etd update - update an Event Threat
        Detection custom module

SYNOPSIS
    gcloud scc manage custom-modules etd update MODULE_ID_OR_NAME
        (--custom-config-file=PATH_TO_FILE --enablement-state=ENABLEMENT_STATE)
        [--validate-only]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To update an Event Threat Detection custom module with ID 123456 for
    organization 123, run:

        $ gcloud scc manage custom-modules etd update 123456 \
          --organization=organizations/123 --enablement-state="ENABLED" \
          --custom-config-file=custom_config.json

POSITIONAL ARGUMENTS
     MODULE_ID_OR_NAME
        The custom module ID or name. The expected format is
        {parent}/[locations/global]/eventThreatDetectionCustomModules/{module_id}
        or just {module_id}. Where module_id is a numeric identifier 1-20
        characters in length. Parent is of the form organizations/{id},
        projects/{id or name}, folders/{id}.

REQUIRED FLAGS
     At least one of these must be specified:

       --custom-config-file=PATH_TO_FILE
          Path to a JSON file that contains the custom config to set for the
          module. Use a full or relative path to a local file containing the
          value of custom_config_file.

       --enablement-state=ENABLEMENT_STATE
          Sets the enablement state of the Event Threat Detection custom
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

        $ gcloud alpha scc manage custom-modules etd update
```

### gcloud scc manage custom-modules etd validate

```text
NAME
    gcloud scc manage custom-modules etd validate - command to validate an ETD
        custom module

SYNOPSIS
    gcloud scc manage custom-modules etd validate
        --custom-config-file=CUSTOM_CONFIG --module-type=MODULE_TYPE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To validate an Event Threat Detection custom module 'config.json' with a
    module type 'CONFIGURABLE_BAD_IP', run:

        $ gcloud scc manage custom-modules etd validate \
            --organization=organizations/252600681248 \
            --custom-config-file=config.json \
            --module-type=CONFIGURABLE_BAD_IP

    You can also specify the parent more generally:

        $ gcloud scc manage custom-modules etd validate \
            --parent=organizations/252600681248 \
            --custom-config-file=config.json \
            --module-type=CONFIGURABLE_BAD_IP

REQUIRED FLAGS
     --custom-config-file=CUSTOM_CONFIG
        Path to a JSON custom configuration file of the ETD custom module. Use
        a full or relative path to a local file containing the value of
        custom_config_file.

     --module-type=MODULE_TYPE
        Type of the custom module. For a list of valid module types please
        visit
        https://cloud.google.com/security-command-center/docs/custom-modules-etd-overview#custom_modules_and_templates.

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

        $ gcloud alpha scc manage custom-modules etd validate
```

### gcloud alpha scc manage custom-modules etd create

```text
NAME
    gcloud alpha scc manage custom-modules etd create - create an Event Threat
        Detection custom module

SYNOPSIS
    gcloud alpha scc manage custom-modules etd create
        --custom-config-file=CUSTOM_CONFIG --display-name=DISPLAY-NAME
        --enablement-state=ENABLEMENT_STATE --module-type=MODULE_TYPE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc manage custom-modules etd delete

```text
NAME
    gcloud alpha scc manage custom-modules etd delete - delete an Event Threat
        Detection custom module

SYNOPSIS
    gcloud alpha scc manage custom-modules etd delete MODULE_ID_OR_NAME
        [--validate-only]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc manage custom-modules etd describe

```text
NAME
    gcloud alpha scc manage custom-modules etd describe - get the details of a
        Event Threat Detection custom module

SYNOPSIS
    gcloud alpha scc manage custom-modules etd describe MODULE_ID_OR_NAME
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc manage custom-modules etd describe-effective

```text
NAME
    gcloud alpha scc manage custom-modules etd describe-effective - get the
        effective details of a Event Threat Detection effective custom module

SYNOPSIS
    gcloud alpha scc manage custom-modules etd describe-effective
        MODULE_ID_OR_NAME
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc manage custom-modules etd list

```text
NAME
    gcloud alpha scc manage custom-modules etd list - list details of resident
        and inherited Event Threat Detection Custom Modules

SYNOPSIS
    gcloud alpha scc manage custom-modules etd list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc manage custom-modules etd list-descendant

```text
NAME
    gcloud alpha scc manage custom-modules etd list-descendant - list the
        details of the resident and descendant Event Threat Detection custom
        modules

SYNOPSIS
    gcloud alpha scc manage custom-modules etd list-descendant
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc manage custom-modules etd list-effective

```text
NAME
    gcloud alpha scc manage custom-modules etd list-effective - list the
        details of an Event Threat Detection effective custom module

SYNOPSIS
    gcloud alpha scc manage custom-modules etd list-effective
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc manage custom-modules etd update

```text
NAME
    gcloud alpha scc manage custom-modules etd update - update an Event Threat
        Detection custom module

SYNOPSIS
    gcloud alpha scc manage custom-modules etd update MODULE_ID_OR_NAME
        (--custom-config-file=PATH_TO_FILE --enablement-state=ENABLEMENT_STATE)
        [--validate-only]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc manage custom-modules etd validate

```text
NAME
    gcloud alpha scc manage custom-modules etd validate - command to validate
        an ETD custom module

SYNOPSIS
    gcloud alpha scc manage custom-modules etd validate
        --custom-config-file=CUSTOM_CONFIG --module-type=MODULE_TYPE
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/custom-modules/etd (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
