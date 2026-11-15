---
source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/capability-configs
---

# gcloud resource-manager capability-configs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud resource-manager capability-configs create

```text
NAME
    gcloud resource-manager capability-configs create - create a
        CapabilityConfig under a parent Organization, Folder, or Project

SYNOPSIS
    gcloud resource-manager capability-configs create
        (CAPABILITY_CONFIG
          : --folder=FOLDER --organization=ORGANIZATION --project=PROJECT)
        --types=[TYPES,...] [--async] [--boundaries=[BOUNDARIES,...]]
        [--display-name=DISPLAY_NAME] [--management-project=MANAGEMENT_PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creating a CapabilityConfig triggers the creation of a Management Project
    if one is not supplied via --management-project.

EXAMPLES
    To create a CapabilityConfig my-config with type app-management under
    organization 123456789:

        $ gcloud resource-manager capability-configs create my-config \
        --organization=123456789 --types=app-management

    To create a CapabilityConfig with display name and pre-existing management
    project:

        $ gcloud resource-manager capability-configs create my-config \
        --folder=456789012 --types=app-management \
        --display-name="App Hub Config" \
        --management-project=projects/123456789012

POSITIONAL ARGUMENTS
     Capability config resource - The CapabilityConfig to create. The arguments
     in this group can be used to specify the attributes of this resource. This
     resource can be one of the following types:
     [cloudresourcemanager.organizations.capabilityConfigs,
     cloudresourcemanager.folders.capabilityConfigs,
     cloudresourcemanager.projects.capabilityConfigs].

     This must be specified.

       CAPABILITY_CONFIG
          ID of the capability_config or fully qualified identifier for the
          capability_config.

          To set the capability_config attribute:
          + provide the argument capability_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          Folder ID or full resource name of the capability_config.

          To set the folder attribute:
          + provide the argument capability_config on the command line with a
            fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.folders.capabilityConfigs].

       --organization=ORGANIZATION
          Organization ID or full resource name of the capability_config.

          To set the organization attribute:
          + provide the argument capability_config on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.organizations.capabilityConfigs].

       --project=PROJECT
          Project number or full resource name of the capability_config.

          To set the project attribute:
          + provide the argument capability_config on the command line with a
            fully specified name;
          + provide the argument --project on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.projects.capabilityConfigs].

REQUIRED FLAGS
     --types=[TYPES,...]
        Comma-separated list of CapabilityConfig types (e.g. app-management,
        agent-management). TYPES must be one of: app-management,
        agent-management.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --boundaries=[BOUNDARIES,...]
        List of Boundaries associated with this CapabilityConfig.

     --display-name=DISPLAY_NAME
        Human-readable display name of the CapabilityConfig (4 to 30
        characters).

     --management-project=MANAGEMENT_PROJECT
        Management Project associated with this CapabilityConfig (e.g.
        projects/123456789012).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager capability-configs create

        $ gcloud beta resource-manager capability-configs create
```

### gcloud resource-manager capability-configs delete

```text
NAME
    gcloud resource-manager capability-configs delete - delete a
        CapabilityConfig

SYNOPSIS
    gcloud resource-manager capability-configs delete
        (CAPABILITY_CONFIG
          : --folder=FOLDER --organization=ORGANIZATION --project=PROJECT)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes an existing CapabilityConfig given its ID and parent or its
    fully-qualified resource name.

EXAMPLES
    To delete a CapabilityConfig my-config under folder 123456789:

        $ gcloud resource-manager capability-configs delete my-config \
        --folder=123456789

    To delete a CapabilityConfig by its full resource name:

        $ gcloud resource-manager capability-configs delete \
        organizations/123456789/capabilityConfigs/my-config

POSITIONAL ARGUMENTS
     Capability config resource - The CapabilityConfig to delete. The arguments
     in this group can be used to specify the attributes of this resource. This
     resource can be one of the following types:
     [cloudresourcemanager.organizations.capabilityConfigs,
     cloudresourcemanager.folders.capabilityConfigs,
     cloudresourcemanager.projects.capabilityConfigs].

     This must be specified.

       CAPABILITY_CONFIG
          ID of the capability_config or fully qualified identifier for the
          capability_config.

          To set the capability_config attribute:
          + provide the argument capability_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          Folder ID or full resource name of the capability_config.

          To set the folder attribute:
          + provide the argument capability_config on the command line with a
            fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.folders.capabilityConfigs].

       --organization=ORGANIZATION
          Organization ID or full resource name of the capability_config.

          To set the organization attribute:
          + provide the argument capability_config on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.organizations.capabilityConfigs].

       --project=PROJECT
          Project number or full resource name of the capability_config.

          To set the project attribute:
          + provide the argument capability_config on the command line with a
            fully specified name;
          + provide the argument --project on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.projects.capabilityConfigs].

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

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager capability-configs delete

        $ gcloud beta resource-manager capability-configs delete
```

### gcloud resource-manager capability-configs describe

```text
NAME
    gcloud resource-manager capability-configs describe - describe a
        CapabilityConfig

SYNOPSIS
    gcloud resource-manager capability-configs describe
        (CAPABILITY_CONFIG
          : --folder=FOLDER --organization=ORGANIZATION --project=PROJECT)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieves metadata for a CapabilityConfig given its ID and parent or its
    fully-qualified resource name.

EXAMPLES
    To describe a CapabilityConfig my-config under folder 123456789:

        $ gcloud resource-manager capability-configs describe my-config \
        --folder=123456789

    To describe a CapabilityConfig by its full resource name:

        $ gcloud resource-manager capability-configs describe \
        organizations/123456789/capabilityConfigs/my-config

POSITIONAL ARGUMENTS
     Capability config resource - The CapabilityConfig to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. This resource can be one of the following types:
     [cloudresourcemanager.organizations.capabilityConfigs,
     cloudresourcemanager.folders.capabilityConfigs,
     cloudresourcemanager.projects.capabilityConfigs].

     This must be specified.

       CAPABILITY_CONFIG
          ID of the capability_config or fully qualified identifier for the
          capability_config.

          To set the capability_config attribute:
          + provide the argument capability_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          Folder ID or full resource name of the capability_config.

          To set the folder attribute:
          + provide the argument capability_config on the command line with a
            fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.folders.capabilityConfigs].

       --organization=ORGANIZATION
          Organization ID or full resource name of the capability_config.

          To set the organization attribute:
          + provide the argument capability_config on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.organizations.capabilityConfigs].

       --project=PROJECT
          Project number or full resource name of the capability_config.

          To set the project attribute:
          + provide the argument capability_config on the command line with a
            fully specified name;
          + provide the argument --project on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.projects.capabilityConfigs].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager capability-configs describe

        $ gcloud beta resource-manager capability-configs describe
```

### gcloud resource-manager capability-configs list

```text
NAME
    gcloud resource-manager capability-configs list - list CapabilityConfigs
        that are direct children of a parent resource

SYNOPSIS
    gcloud resource-manager capability-configs list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT; default=500] [--page-size=PAGE_SIZE; default=100]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all CapabilityConfigs under an organization, folder, or project.

EXAMPLES
    To list CapabilityConfigs under organization 123456789:

        $ gcloud resource-manager capability-configs list \
        --organization=123456789

    To list CapabilityConfigs under folder 456789012:

        $ gcloud resource-manager capability-configs list --folder=456789012

    To list CapabilityConfigs under project my-project:

        $ gcloud resource-manager capability-configs list \
        --project=my-project

REQUIRED FLAGS
     Parent resource to list capability configs for.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder ID or full resource name.

       --organization=ORGANIZATION_ID
          Organization ID or full resource name.

       --project=PROJECT_NUMBER
          Project number or full resource name.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT; default=500
        Maximum number of resources to list. The default is 500. This flag
        interacts with other flags that are applied in this order: --flatten,
        --sort-by, --filter, --limit.

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

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager capability-configs list

        $ gcloud beta resource-manager capability-configs list
```

### gcloud resource-manager capability-configs update

```text
NAME
    gcloud resource-manager capability-configs update - update a
        CapabilityConfig

SYNOPSIS
    gcloud resource-manager capability-configs update
        (CAPABILITY_CONFIG
          : --folder=FOLDER --organization=ORGANIZATION --project=PROJECT)
        [--async] [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--types=[TYPES,...]]
        [--boundaries=[BOUNDARIES,...] | --clear-boundaries]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates the display name, types, or boundaries of an existing
    CapabilityConfig.

EXAMPLES
    To update the display name of a CapabilityConfig:

        $ gcloud resource-manager capability-configs update my-config \
        --folder=123456789 --display-name="Updated Config
        Name"

    To update the associated boundaries:

        $ gcloud resource-manager capability-configs update my-config \
        --organization=123456789 \
        --boundaries=organizations/123456789/boundaries/b1,\
        organizations/123456789/boundaries/b2

    To clear all boundaries associated with a CapabilityConfig:

        $ gcloud resource-manager capability-configs update my-config \
        --organization=123456789 --clear-boundaries

POSITIONAL ARGUMENTS
     Capability config resource - The CapabilityConfig to update. The arguments
     in this group can be used to specify the attributes of this resource. This
     resource can be one of the following types:
     [cloudresourcemanager.organizations.capabilityConfigs,
     cloudresourcemanager.folders.capabilityConfigs,
     cloudresourcemanager.projects.capabilityConfigs].

     This must be specified.

       CAPABILITY_CONFIG
          ID of the capability_config or fully qualified identifier for the
          capability_config.

          To set the capability_config attribute:
          + provide the argument capability_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          Folder ID or full resource name of the capability_config.

          To set the folder attribute:
          + provide the argument capability_config on the command line with a
            fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.folders.capabilityConfigs].

       --organization=ORGANIZATION
          Organization ID or full resource name of the capability_config.

          To set the organization attribute:
          + provide the argument capability_config on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.organizations.capabilityConfigs].

       --project=PROJECT
          Project number or full resource name of the capability_config.

          To set the project attribute:
          + provide the argument capability_config on the command line with a
            fully specified name;
          + provide the argument --project on the command line. Must be
            specified for resource of type
            [cloudresourcemanager.projects.capabilityConfigs].

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        Human-readable display name of the CapabilityConfig (4 to 30
        characters).

     --etag=ETAG
        Etag string for optimistic concurrency control.

     --types=[TYPES,...]
        Comma-separated list of CapabilityConfig types (e.g. app-management,
        agent-management). TYPES must be one of: app-management,
        agent-management.

     At most one of these can be specified:

       --boundaries=[BOUNDARIES,...]
          List of Boundaries associated with this CapabilityConfig.

       --clear-boundaries
          Clear all Boundaries associated with this CapabilityConfig.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager capability-configs update

        $ gcloud beta resource-manager capability-configs update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud resource-manager capability-configs update my-config \
    --folder=123456789 \
    --display-name="Updated Config Name"

gcloud resource-manager capability-configs update my-config \
    --organization=123456789 \
    --boundaries=organizations/123456789/boundaries/b1,organizations/123456789/boundaries/b2
```

### gcloud beta resource-manager capability-configs create

```text
NAME
    gcloud beta resource-manager capability-configs create - create a
        CapabilityConfig under a parent Organization, Folder, or Project

SYNOPSIS
    gcloud beta resource-manager capability-configs create
        (CAPABILITY_CONFIG
          : --folder=FOLDER --organization=ORGANIZATION --project=PROJECT)
        --types=[TYPES,...] [--async] [--boundaries=[BOUNDARIES,...]]
        [--display-name=DISPLAY_NAME] [--management-project=MANAGEMENT_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager capability-configs delete

```text
NAME
    gcloud beta resource-manager capability-configs delete - delete a
        CapabilityConfig

SYNOPSIS
    gcloud beta resource-manager capability-configs delete
        (CAPABILITY_CONFIG
          : --folder=FOLDER --organization=ORGANIZATION --project=PROJECT)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager capability-configs describe

```text
NAME
    gcloud beta resource-manager capability-configs describe - describe a
        CapabilityConfig

SYNOPSIS
    gcloud beta resource-manager capability-configs describe
        (CAPABILITY_CONFIG
          : --folder=FOLDER --organization=ORGANIZATION --project=PROJECT)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager capability-configs list

```text
NAME
    gcloud beta resource-manager capability-configs list - list
        CapabilityConfigs that are direct children of a parent resource

SYNOPSIS
    gcloud beta resource-manager capability-configs list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT; default=500] [--page-size=PAGE_SIZE; default=100]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager capability-configs update

```text
NAME
    gcloud beta resource-manager capability-configs update - update a
        CapabilityConfig

SYNOPSIS
    gcloud beta resource-manager capability-configs update
        (CAPABILITY_CONFIG
          : --folder=FOLDER --organization=ORGANIZATION --project=PROJECT)
        [--async] [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--types=[TYPES,...]]
        [--boundaries=[BOUNDARIES,...] | --clear-boundaries]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager capability-configs create

```text
NAME
    gcloud alpha resource-manager capability-configs create - create a
        CapabilityConfig under a parent Organization, Folder, or Project

SYNOPSIS
    gcloud alpha resource-manager capability-configs create
        (CAPABILITY_CONFIG
          : --folder=FOLDER --organization=ORGANIZATION --project=PROJECT)
        --types=[TYPES,...] [--async] [--boundaries=[BOUNDARIES,...]]
        [--display-name=DISPLAY_NAME] [--management-project=MANAGEMENT_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager capability-configs delete

```text
NAME
    gcloud alpha resource-manager capability-configs delete - delete a
        CapabilityConfig

SYNOPSIS
    gcloud alpha resource-manager capability-configs delete
        (CAPABILITY_CONFIG
          : --folder=FOLDER --organization=ORGANIZATION --project=PROJECT)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager capability-configs describe

```text
NAME
    gcloud alpha resource-manager capability-configs describe - describe a
        CapabilityConfig

SYNOPSIS
    gcloud alpha resource-manager capability-configs describe
        (CAPABILITY_CONFIG
          : --folder=FOLDER --organization=ORGANIZATION --project=PROJECT)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager capability-configs list

```text
NAME
    gcloud alpha resource-manager capability-configs list - list
        CapabilityConfigs that are direct children of a parent resource

SYNOPSIS
    gcloud alpha resource-manager capability-configs list
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_NUMBER) [--filter=EXPRESSION]
        [--limit=LIMIT; default=500] [--page-size=PAGE_SIZE; default=100]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager capability-configs update

```text
NAME
    gcloud alpha resource-manager capability-configs update - update a
        CapabilityConfig

SYNOPSIS
    gcloud alpha resource-manager capability-configs update
        (CAPABILITY_CONFIG
          : --folder=FOLDER --organization=ORGANIZATION --project=PROJECT)
        [--async] [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--types=[TYPES,...]]
        [--boundaries=[BOUNDARIES,...] | --clear-boundaries]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/capability-configs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
