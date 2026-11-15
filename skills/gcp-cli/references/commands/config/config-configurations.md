---
source: https://docs.cloud.google.com/sdk/gcloud/reference/config/configurations
---

# gcloud config configurations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud config configurations activate

```text
NAME
    gcloud config configurations activate - activates an existing named
        configuration

SYNOPSIS
    gcloud config configurations activate CONFIGURATION_NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Activates an existing named configuration.

    See gcloud topic configurations for an overview of named configurations.

EXAMPLES
    To activate an existing configuration named my-config, run:

        $ gcloud config configurations activate my-config

    To list all properties in the activated configuration, run:

        $ gcloud config list --all

POSITIONAL ARGUMENTS
     CONFIGURATION_NAME
        Name of the configuration to activate

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha config configurations activate

        $ gcloud beta config configurations activate
```

### gcloud config configurations create

```text
NAME
    gcloud config configurations create - creates a new named configuration

SYNOPSIS
    gcloud config configurations create CONFIGURATION_NAME [--no-activate]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a new named configuration.

    Except for special cases (NONE), configuration names start with a lower
    case letter and contain only lower case letters a-z, digits 0-9, and
    hyphens '-'.

    See gcloud topic configurations for an overview of named configurations.

EXAMPLES
    To create a new named configuration, run:

        $ gcloud config configurations create my-config

POSITIONAL ARGUMENTS
     CONFIGURATION_NAME
        Name of the configuration to create

FLAGS
     --activate
        If true, activate this configuration upon create. Enabled by default,
        use --no-activate to disable.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha config configurations create

        $ gcloud beta config configurations create
```

### gcloud config configurations delete

```text
NAME
    gcloud config configurations delete - deletes a named configuration

SYNOPSIS
    gcloud config configurations delete CONFIGURATION_NAMES
        [CONFIGURATION_NAMES ...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a named configuration. You cannot delete a configuration that is
    active, even when overridden with the --configuration flag. To delete the
    current active configuration, first gcloud config configurations activate
    another one.

    See gcloud topic configurations for an overview of named configurations.

EXAMPLES
    To delete an existing configuration named my-config, run:

        $ gcloud config configurations delete my-config

    To delete more than one configuration, run:

        $ gcloud config configurations delete my-config1 my-config2

    To list existing configurations, run:

        $ gcloud config configurations list

POSITIONAL ARGUMENTS
     CONFIGURATION_NAMES [CONFIGURATION_NAMES ...]
        Name of the configuration to delete. Cannot be currently active
        configuration.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha config configurations delete

        $ gcloud beta config configurations delete
```

### gcloud config configurations describe

```text
NAME
    gcloud config configurations describe - describes a named configuration by
        listing its properties

SYNOPSIS
    gcloud config configurations describe CONFIGURATION_NAME [--all]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes a named configuration by listing its properties.

    See gcloud topic configurations for an overview of named configurations.

EXAMPLES
    To describe an existing configuration named my-config, run:

        $ gcloud config configurations describe my-config

    This is similar to:

        $ gcloud config configurations activate my-config

        $ gcloud config list

POSITIONAL ARGUMENTS
     CONFIGURATION_NAME
        Name of the configuration to describe

FLAGS
     --all
        Include unset properties in output.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha config configurations describe

        $ gcloud beta config configurations describe
```

### gcloud config configurations list

```text
NAME
    gcloud config configurations list - lists existing named configurations

SYNOPSIS
    gcloud config configurations list [--filter=EXPRESSION] [--limit=LIMIT]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists existing named configurations.

    Run $ gcloud topic configurations for an overview of named configurations.

EXAMPLES
    To list all available configurations, run:

        $ gcloud config configurations list

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
    These variants are also available:

        $ gcloud alpha config configurations list

        $ gcloud beta config configurations list
```

### gcloud config configurations rename

```text
NAME
    gcloud config configurations rename - renames a named configuration

SYNOPSIS
    gcloud config configurations rename CONFIGURATION_NAME --new-name=NEW_NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Renames a named configuration.

    See gcloud topic configurations for an overview of named configurations.

EXAMPLES
    To rename an existing configuration named my-config, run:

        $ gcloud config configurations rename my-config --new-name=new-config

POSITIONAL ARGUMENTS
     CONFIGURATION_NAME
        Name of the configuration to rename

REQUIRED FLAGS
     --new-name=NEW_NAME
        Specifies the new name of the configuration.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha config configurations rename

        $ gcloud beta config configurations rename
```

### gcloud beta config configurations activate

```text
NAME
    gcloud beta config configurations activate - activates an existing named
        configuration

SYNOPSIS
    gcloud beta config configurations activate CONFIGURATION_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta config configurations create

```text
NAME
    gcloud beta config configurations create - creates a new named
        configuration

SYNOPSIS
    gcloud beta config configurations create CONFIGURATION_NAME [--no-activate]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta config configurations delete

```text
NAME
    gcloud beta config configurations delete - deletes a named configuration

SYNOPSIS
    gcloud beta config configurations delete CONFIGURATION_NAMES
        [CONFIGURATION_NAMES ...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta config configurations describe

```text
NAME
    gcloud beta config configurations describe - describes a named
        configuration by listing its properties

SYNOPSIS
    gcloud beta config configurations describe CONFIGURATION_NAME [--all]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta config configurations list

```text
NAME
    gcloud beta config configurations list - lists existing named
        configurations

SYNOPSIS
    gcloud beta config configurations list [--filter=EXPRESSION]
        [--limit=LIMIT] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta config configurations rename

```text
NAME
    gcloud beta config configurations rename - renames a named configuration

SYNOPSIS
    gcloud beta config configurations rename CONFIGURATION_NAME
        --new-name=NEW_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha config configurations activate

```text
NAME
    gcloud alpha config configurations activate - activates an existing named
        configuration

SYNOPSIS
    gcloud alpha config configurations activate CONFIGURATION_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha config configurations create

```text
NAME
    gcloud alpha config configurations create - creates a new named
        configuration

SYNOPSIS
    gcloud alpha config configurations create CONFIGURATION_NAME
        [--no-activate] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha config configurations delete

```text
NAME
    gcloud alpha config configurations delete - deletes a named configuration

SYNOPSIS
    gcloud alpha config configurations delete CONFIGURATION_NAMES
        [CONFIGURATION_NAMES ...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha config configurations describe

```text
NAME
    gcloud alpha config configurations describe - describes a named
        configuration by listing its properties

SYNOPSIS
    gcloud alpha config configurations describe CONFIGURATION_NAME [--all]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha config configurations list

```text
NAME
    gcloud alpha config configurations list - lists existing named
        configurations

SYNOPSIS
    gcloud alpha config configurations list [--filter=EXPRESSION]
        [--limit=LIMIT] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha config configurations rename

```text
NAME
    gcloud alpha config configurations rename - renames a named configuration

SYNOPSIS
    gcloud alpha config configurations rename CONFIGURATION_NAME
        --new-name=NEW_NAME [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/config/configurations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
