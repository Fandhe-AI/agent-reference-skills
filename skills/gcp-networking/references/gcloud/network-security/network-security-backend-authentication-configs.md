---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/backend-authentication-configs
---

# gcloud network-security backend-authentication-configs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security backend-authentication-configs create

```text
NAME
    gcloud network-security backend-authentication-configs create - create a
        BackendAuthenticationConfig

SYNOPSIS
    gcloud network-security backend-authentication-configs create
        (BACKEND_AUTHENTICATION_CONFIG : --location=LOCATION) [--async]
        [--client-certificate=CLIENT_CERTIFICATE] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [--trust-config=TRUST_CONFIG]
        [--well-known-roots=WELL_KNOWN_ROOTS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new BackendAuthenticationConfig.

EXAMPLES
    To create a config named backend-authentication-config, run:

        $ gcloud network-security backend-authentication-configs create \
            backend-authentication-config \
            --trust-config=projects/my-project/locations/global/\
        trustConfigs/my-trust-config --location=global

POSITIONAL ARGUMENTS
     Backend authentication config resource - Realm to be created. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument backend_authentication_config on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKEND_AUTHENTICATION_CONFIG
          ID of the backend authentication config or fully qualified identifier
          for the backend authentication config.

          To set the backend_authentication_config attribute:
          + provide the argument backend_authentication_config on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument backend_authentication_config on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --client-certificate=CLIENT_CERTIFICATE
        ID of certificate resource.

     --description=DESCRIPTION
        Description of the backend authentication config.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

     --trust-config=TRUST_CONFIG
        ID of trust config resource.

     --well-known-roots=WELL_KNOWN_ROOTS
        Indicates whether the load balancer should trust backend server
        certificates. WELL_KNOWN_ROOTS must be one of: none, public-roots.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security backend-authentication-configs create

        $ gcloud beta network-security backend-authentication-configs create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-security backend-authentication-configs create backend-authentication-config \
    --trust-config=projects/my-project/locations/global/trustConfigs/my-trust-config \
    --location=global
```

### gcloud network-security backend-authentication-configs delete

```text
NAME
    gcloud network-security backend-authentication-configs delete - delete
        BackendAuthenticationConfig

SYNOPSIS
    gcloud network-security backend-authentication-configs delete
        (BACKEND_AUTHENTICATION_CONFIG : --location=LOCATION) [--async]
        [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified BackendAuthenticationConfig.

EXAMPLES
    To delete a BackendAuthenticationConfig called
    'my-backend-authentication-config', run:

        $ gcloud network-security backend-authentication-configs delete \
            my-backend-authentication-config --location=global

POSITIONAL ARGUMENTS
     Backend authentication config resource - Name of the
     BackendAuthenticationConfig you want to delete. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument backend_authentication_config on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKEND_AUTHENTICATION_CONFIG
          ID of the backend authentication config or fully qualified identifier
          for the backend authentication config.

          To set the backend_authentication_config attribute:
          + provide the argument backend_authentication_config on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument backend_authentication_config on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        The entity-tag of the BackendAuthenticationConfig.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security backend-authentication-configs delete

        $ gcloud beta network-security backend-authentication-configs delete
```

### gcloud network-security backend-authentication-configs describe

```text
NAME
    gcloud network-security backend-authentication-configs describe - describe
        BackendAuthenticationConfig

SYNOPSIS
    gcloud network-security backend-authentication-configs describe
        (BACKEND_AUTHENTICATION_CONFIG : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe the specified BackendAuthenticationConfig.

EXAMPLES
    To describe a BackendAuthenticationConfig called
    'my-backend-authentication-config', run:

        $ gcloud network-security backend-authentication-configs describe \
            my-backend-authentication-config --location=global

POSITIONAL ARGUMENTS
     Backend authentication config resource - The BackendAuthenticationConfig
     you want to describe. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backend_authentication_config on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKEND_AUTHENTICATION_CONFIG
          ID of the backend authentication config or fully qualified identifier
          for the backend authentication config.

          To set the backend_authentication_config attribute:
          + provide the argument backend_authentication_config on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument backend_authentication_config on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security backend-authentication-configs \
            describe

        $ gcloud beta network-security backend-authentication-configs \
            describe
```

### gcloud network-security backend-authentication-configs export

```text
NAME
    gcloud network-security backend-authentication-configs export - export
        BackendAuthenticationConfig

SYNOPSIS
    gcloud network-security backend-authentication-configs export
        (BACKEND_AUTHENTICATION_CONFIG : --location=LOCATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export a BackendAuthenticationConfig.

EXAMPLES
    To export a BackendAuthenticationConfig, run:

        $ gcloud network-security backend-authentication-configs export \
            my-backend-authentication-config \
            --destination=my-backend-authentication-config.yaml \
            --location=global

POSITIONAL ARGUMENTS
     Backend authentication config resource - Name of the
     BackendAuthenticationConfig to export. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backend_authentication_config on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKEND_AUTHENTICATION_CONFIG
          ID of the backend authentication config or fully qualified identifier
          for the backend authentication config.

          To set the backend_authentication_config attribute:
          + provide the argument backend_authentication_config on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument backend_authentication_config on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --destination=DESTINATION
        Path to a YAML file where the configuration will be exported. The
        exported data will not contain any output-only fields. Alternatively,
        you may omit this flag to write to standard output. For a schema
        describing the export/import format, see
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/...

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security backend-authentication-configs export

        $ gcloud beta network-security backend-authentication-configs export
```

### gcloud network-security backend-authentication-configs import

```text
NAME
    gcloud network-security backend-authentication-configs import - import
        BackendAuthenticationConfigs

SYNOPSIS
    gcloud network-security backend-authentication-configs import
        (BACKEND_AUTHENTICATION_CONFIG : --location=LOCATION) [--async]
        [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Import a BackendAuthenticationConfigs.

EXAMPLES
    To import a BackendAuthenticationConfigs from a YAML file, run:

        $ gcloud network-security backend-authentication-configs import \
            my-backend-authentication-config \
            --source=my-backend-authentication-config.yaml --location=global

POSITIONAL ARGUMENTS
     Backend authentication config resource - Name of the
     BackendAuthenticationConfigs to import. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backend_authentication_config on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKEND_AUTHENTICATION_CONFIG
          ID of the backend authentication config or fully qualified identifier
          for the backend authentication config.

          To set the backend_authentication_config attribute:
          + provide the argument backend_authentication_config on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument backend_authentication_config on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --source=SOURCE
        Path to a YAML file containing the configuration export data. The YAML
        file must not contain any output-only fields. Alternatively, you may
        omit this flag to read from standard input. For a schema describing the
        export/import format, see: $CLOUDSDKROOT/lib/googlecloudsdk/schemas/...

        $CLOUDSDKROOT is can be obtained with the following command:

            $ gcloud info --format='value(installation.sdk_root)'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security backend-authentication-configs import

        $ gcloud beta network-security backend-authentication-configs import
```

### gcloud network-security backend-authentication-configs list

```text
NAME
    gcloud network-security backend-authentication-configs list - list
        BackendAuthenticationConfigs

SYNOPSIS
    gcloud network-security backend-authentication-configs list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all BackendAuthenticationConfigs in the current project.

EXAMPLES
    To list BackendAuthenticationConfigs in the current project, run:

        $ gcloud network-security backend-authentication-configs list

FLAGS
     Location resource - The location of the BackendAuthenticationConfigs to
     display. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * if left empty, will use the wildcard '-' to list all locations with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * if left empty, will use the wildcard '-' to list all locations.

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
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security backend-authentication-configs list

        $ gcloud beta network-security backend-authentication-configs list
```

### gcloud beta network-security backend-authentication-configs create

```text
NAME
    gcloud beta network-security backend-authentication-configs create - create
        a BackendAuthenticationConfig

SYNOPSIS
    gcloud beta network-security backend-authentication-configs create
        (BACKEND_AUTHENTICATION_CONFIG : --location=LOCATION) [--async]
        [--client-certificate=CLIENT_CERTIFICATE] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [--trust-config=TRUST_CONFIG]
        [--well-known-roots=WELL_KNOWN_ROOTS] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security backend-authentication-configs delete

```text
NAME
    gcloud beta network-security backend-authentication-configs delete - delete
        BackendAuthenticationConfig

SYNOPSIS
    gcloud beta network-security backend-authentication-configs delete
        (BACKEND_AUTHENTICATION_CONFIG : --location=LOCATION) [--async]
        [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security backend-authentication-configs describe

```text
NAME
    gcloud beta network-security backend-authentication-configs describe -
        describe BackendAuthenticationConfig

SYNOPSIS
    gcloud beta network-security backend-authentication-configs describe
        (BACKEND_AUTHENTICATION_CONFIG : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security backend-authentication-configs export

```text
NAME
    gcloud beta network-security backend-authentication-configs export - export
        BackendAuthenticationConfig

SYNOPSIS
    gcloud beta network-security backend-authentication-configs export
        (BACKEND_AUTHENTICATION_CONFIG : --location=LOCATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security backend-authentication-configs import

```text
NAME
    gcloud beta network-security backend-authentication-configs import - import
        BackendAuthenticationConfigs

SYNOPSIS
    gcloud beta network-security backend-authentication-configs import
        (BACKEND_AUTHENTICATION_CONFIG : --location=LOCATION) [--async]
        [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security backend-authentication-configs list

```text
NAME
    gcloud beta network-security backend-authentication-configs list - list
        BackendAuthenticationConfigs

SYNOPSIS
    gcloud beta network-security backend-authentication-configs list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security backend-authentication-configs create

```text
NAME
    gcloud alpha network-security backend-authentication-configs create -
        create a BackendAuthenticationConfig

SYNOPSIS
    gcloud alpha network-security backend-authentication-configs create
        (BACKEND_AUTHENTICATION_CONFIG : --location=LOCATION) [--async]
        [--client-certificate=CLIENT_CERTIFICATE] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [--trust-config=TRUST_CONFIG]
        [--well-known-roots=WELL_KNOWN_ROOTS] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security backend-authentication-configs delete

```text
NAME
    gcloud alpha network-security backend-authentication-configs delete -
        delete BackendAuthenticationConfig

SYNOPSIS
    gcloud alpha network-security backend-authentication-configs delete
        (BACKEND_AUTHENTICATION_CONFIG : --location=LOCATION) [--async]
        [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security backend-authentication-configs describe

```text
NAME
    gcloud alpha network-security backend-authentication-configs describe -
        describe BackendAuthenticationConfig

SYNOPSIS
    gcloud alpha network-security backend-authentication-configs describe
        (BACKEND_AUTHENTICATION_CONFIG : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security backend-authentication-configs export

```text
NAME
    gcloud alpha network-security backend-authentication-configs export -
        export BackendAuthenticationConfig

SYNOPSIS
    gcloud alpha network-security backend-authentication-configs export
        (BACKEND_AUTHENTICATION_CONFIG : --location=LOCATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security backend-authentication-configs import

```text
NAME
    gcloud alpha network-security backend-authentication-configs import -
        import BackendAuthenticationConfigs

SYNOPSIS
    gcloud alpha network-security backend-authentication-configs import
        (BACKEND_AUTHENTICATION_CONFIG : --location=LOCATION) [--async]
        [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security backend-authentication-configs list

```text
NAME
    gcloud alpha network-security backend-authentication-configs list - list
        BackendAuthenticationConfigs

SYNOPSIS
    gcloud alpha network-security backend-authentication-configs list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/backend-authentication-configs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
