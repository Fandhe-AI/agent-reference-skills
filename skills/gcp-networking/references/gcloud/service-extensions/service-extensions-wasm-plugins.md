---
source: https://docs.cloud.google.com/sdk/gcloud/reference/service-extensions/wasm-plugins
---

# gcloud service-extensions wasm-plugins

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud service-extensions wasm-plugins create

```text
NAME
    gcloud service-extensions wasm-plugins create - create a WasmPlugin
        resource

SYNOPSIS
    gcloud service-extensions wasm-plugins create
        (WASM_PLUGIN : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--log-config=[LOG_CONFIG,...]]
        [--image=IMAGE
          --main-version=MAIN_VERSION --plugin-config=PLUGIN_CONFIG
          | --plugin-config-file=PATH_TO_FILE
          | --plugin-config-uri=PLUGIN_CONFIG_URI] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new WasmPlugin resource.

EXAMPLES
    To create a WasmPlugin called my-plugin, together with a new version called
    v1, and set it as main, run:

        $ gcloud service-extensions wasm-plugins create my-plugin \
            --main-version=v1 \
            --image=...-docker.pkg.dev/my-project/repository/container:tag

POSITIONAL ARGUMENTS
     WasmPlugin resource - The ID of the WasmPlugin resource to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument wasm_plugin on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WASM_PLUGIN
          ID of the WasmPlugin or fully qualified identifier for the
          WasmPlugin.

          To set the wasm_plugin attribute:
          + provide the argument wasm_plugin on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location ID.

          To set the location attribute:
          + provide the argument wasm_plugin on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A human-readable description of the resource.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --log-config=[LOG_CONFIG,...]
        Logging options for the activity performed by this plugin. The
        following options can be set:
        * enable: whether to enable logging. If log-config flag is set,
          enable option is required.

        * sample-rate: configures the sampling rate of activity logs, where
          1.0 means all logged activity is reported and 0.0 means no activity
          is reported. The default value is 1.0, and the value of the field
          must be in range 0 to 1 (inclusive).

        * min-log-level: specifies the lowest level of the logs that should
          be exported to Cloud Logging. The default value is INFO.

        Example usage:
        --log-config=enable=True,sample-rate=0.5,min-log-level=INFO
        --log_config=enable=False

     --image=IMAGE
        URI of the container image containing the plugin's Wasm module, stored
        in the Artifact Registry.

     --main-version=MAIN_VERSION
        ID of the WasmPluginVersion resource that will be created for that
        WasmPlugin and that will be set as the current main version.

     Configuration for the plugin, provided at runtime by the on_configure
     function (Rust Proxy-Wasm SDK) or the onConfigure method (C++ Proxy-Wasm
     SDK).

     At most one of these can be specified:

       --plugin-config=PLUGIN_CONFIG
          Plugin runtime configuration in the textual format.

       --plugin-config-file=PATH_TO_FILE
          Path to a local file containing the plugin runtime configuration.

          Use a full or relative path to a local file containing the value of
          plugin_config_file.

       --plugin-config-uri=PLUGIN_CONFIG_URI
          URI of the container image containing the plugin's runtime
          configuration, stored in the Artifact Registry.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-extensions wasm-plugins create

        $ gcloud beta service-extensions wasm-plugins create
```

### gcloud service-extensions wasm-plugins delete

```text
NAME
    gcloud service-extensions wasm-plugins delete - delete a WasmPlugin
        resource

SYNOPSIS
    gcloud service-extensions wasm-plugins delete
        (WASM_PLUGIN : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a WasmPlugin resource.

    Please note that all WasmPluginVersions associated with the WasmPlugin will
    also be deleted.

EXAMPLES
    To delete a WasmPlugin called my-plugin, run:

        $ gcloud service-extensions wasm-plugins delete my-plugin

POSITIONAL ARGUMENTS
     WasmPlugin resource - The WasmPlugin resource to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument wasm_plugin on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WASM_PLUGIN
          ID of the WasmPlugin or fully qualified identifier for the
          WasmPlugin.

          To set the wasm_plugin attribute:
          + provide the argument wasm_plugin on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location ID.

          To set the location attribute:
          + provide the argument wasm_plugin on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

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

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha service-extensions wasm-plugins delete

        $ gcloud beta service-extensions wasm-plugins delete
```

### gcloud service-extensions wasm-plugins describe

```text
NAME
    gcloud service-extensions wasm-plugins describe - show details about a
        WasmPlugin resource

SYNOPSIS
    gcloud service-extensions wasm-plugins describe
        (WASM_PLUGIN : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about a WasmPlugin resource.

EXAMPLES
    To show details about a WasmPlugin, run:

        $ gcloud service-extensions wasm-plugins describe my-plugin

POSITIONAL ARGUMENTS
     WasmPlugin resource - The WasmPlugin resource that you want to describe.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument wasm_plugin on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WASM_PLUGIN
          ID of the WasmPlugin or fully qualified identifier for the
          WasmPlugin.

          To set the wasm_plugin attribute:
          + provide the argument wasm_plugin on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location ID.

          To set the location attribute:
          + provide the argument wasm_plugin on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha service-extensions wasm-plugins describe

        $ gcloud beta service-extensions wasm-plugins describe
```

### gcloud service-extensions wasm-plugins list

```text
NAME
    gcloud service-extensions wasm-plugins list - list all WasmPlugin resources

SYNOPSIS
    gcloud service-extensions wasm-plugins list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List WasmPlugin resources.

EXAMPLES
    To list existing WasmPlugin resources, run:

        $ gcloud service-extensions wasm-plugins list

FLAGS
     Location resource - The parent location. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * use global location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * use global location.

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
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha service-extensions wasm-plugins list

        $ gcloud beta service-extensions wasm-plugins list
```

### gcloud service-extensions wasm-plugins update

```text
NAME
    gcloud service-extensions wasm-plugins update - update a WasmPlugin
        resource

SYNOPSIS
    gcloud service-extensions wasm-plugins update
        (WASM_PLUGIN : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--log-config=[LOG_CONFIG,...]]
        [--image=IMAGE
          --main-version=MAIN_VERSION --plugin-config=PLUGIN_CONFIG
          | --plugin-config-file=PATH_TO_FILE
          | --plugin-config-uri=PLUGIN_CONFIG_URI] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing WasmPlugin resource and optionally create a
    WasmPluginVersion resource and set it as the main (serving) one.

    If --image is not specified:
      o the method only updates the WasmPlugin resource without creating a
        WasmPluginVersion.
      o the --plugin-config*** flags are disallowed.
      o if --main-version is set, then the referenced WasmPluginVersion must
        already exist and it is set as the main (serving) one.

    If --image is specified:
      o the --main-version flag must also be specified.
      o the method updates the WasmPlugin resource and creates a new
        WasmPluginVersion with --main-version name and sets it as the main
        (serving) one.
      o the --plugin-config*** flags are allowed.
      o the --async flag is disallowed.

EXAMPLES
    To update a WasmPlugin called my-plugin, run:

        $ gcloud service-extensions wasm-plugins update my-plugin \
            --main-version=new-version --description="A new description." \
            --labels=label1=value1

    To update a WasmPlugin called my-plugin and also create a new version
    called v1 and set it as main:

        $ gcloud service-extensions wasm-plugins update my-plugin \
            --main-version=v1 --description="A new description." \
            --labels=label1=value1 \
            --image=...-docker.pkg.dev/my-project/repository/container:tag

POSITIONAL ARGUMENTS
     WasmPlugin resource - The ID of the WasmPlugin to update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument wasm_plugin on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WASM_PLUGIN
          ID of the WasmPlugin or fully qualified identifier for the
          WasmPlugin.

          To set the wasm_plugin attribute:
          + provide the argument wasm_plugin on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location ID.

          To set the location attribute:
          + provide the argument wasm_plugin on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A human-readable description of the resource.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --log-config=[LOG_CONFIG,...]
        Logging options for the activity performed by this plugin. The
        following options can be set:
        * enable: whether to enable logging. If log-config flag is set,
          enable option is required.

        * sample-rate: configures the sampling rate of activity logs, where
          1.0 means all logged activity is reported and 0.0 means no activity
          is reported. The default value is 1.0, and the value of the field
          must be in range 0 to 1 (inclusive).

        * min-log-level: specifies the lowest level of the logs that should
          be exported to Cloud Logging. The default value is INFO.

        Example usage:
        --log-config=enable=True,sample-rate=0.5,min-log-level=INFO
        --log_config=enable=False

     --image=IMAGE
        URI of the container image containing the plugin's Wasm module, stored
        in the Artifact Registry.

     --main-version=MAIN_VERSION
        The ID of the WasmPluginVersion that should be the currently serving
        one. The version referred to must be a child of this WasmPlugin.

        If the --image flag was also provided, the WasmPluginVersion will be
        created for that WasmPlugin and will be set as the current main
        version.

     Configuration for the plugin, provided at runtime by the on_configure
     function (Rust Proxy-Wasm SDK) or the onConfigure method (C++ Proxy-Wasm
     SDK).

     At most one of these can be specified:

       --plugin-config=PLUGIN_CONFIG
          Plugin runtime configuration in the textual format.

       --plugin-config-file=PATH_TO_FILE
          Path to a local file containing the plugin runtime configuration.

          Use a full or relative path to a local file containing the value of
          plugin_config_file.

       --plugin-config-uri=PLUGIN_CONFIG_URI
          URI of the container image containing the plugin's runtime
          configuration, stored in the Artifact Registry.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-extensions wasm-plugins update

        $ gcloud beta service-extensions wasm-plugins update
```

### gcloud beta service-extensions wasm-plugins create

```text
NAME
    gcloud beta service-extensions wasm-plugins create - create a WasmPlugin
        resource

SYNOPSIS
    gcloud beta service-extensions wasm-plugins create
        (WASM_PLUGIN : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--log-config=[LOG_CONFIG,...]]
        [--image=IMAGE
          --main-version=MAIN_VERSION --plugin-config=PLUGIN_CONFIG
          | --plugin-config-file=PATH_TO_FILE
          | --plugin-config-uri=PLUGIN_CONFIG_URI]
        [--kms-key-name=KMS_KEY_NAME : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-extensions wasm-plugins delete

```text
NAME
    gcloud beta service-extensions wasm-plugins delete - delete a WasmPlugin
        resource

SYNOPSIS
    gcloud beta service-extensions wasm-plugins delete
        (WASM_PLUGIN : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-extensions wasm-plugins describe

```text
NAME
    gcloud beta service-extensions wasm-plugins describe - show details about a
        WasmPlugin resource

SYNOPSIS
    gcloud beta service-extensions wasm-plugins describe
        (WASM_PLUGIN : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-extensions wasm-plugins list

```text
NAME
    gcloud beta service-extensions wasm-plugins list - list all WasmPlugin
        resources

SYNOPSIS
    gcloud beta service-extensions wasm-plugins list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-extensions wasm-plugins update

```text
NAME
    gcloud beta service-extensions wasm-plugins update - update a WasmPlugin
        resource

SYNOPSIS
    gcloud beta service-extensions wasm-plugins update
        (WASM_PLUGIN : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--log-config=[LOG_CONFIG,...]]
        [--image=IMAGE
          --main-version=MAIN_VERSION --plugin-config=PLUGIN_CONFIG
          | --plugin-config-file=PATH_TO_FILE
          | --plugin-config-uri=PLUGIN_CONFIG_URI]
        [--kms-key-name=KMS_KEY_NAME : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions wasm-plugins create

```text
NAME
    gcloud alpha service-extensions wasm-plugins create - create a WasmPlugin
        resource

SYNOPSIS
    gcloud alpha service-extensions wasm-plugins create
        (WASM_PLUGIN : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--log-config=[LOG_CONFIG,...]]
        [--image=IMAGE
          --main-version=MAIN_VERSION --plugin-config=PLUGIN_CONFIG
          | --plugin-config-file=PATH_TO_FILE
          | --plugin-config-uri=PLUGIN_CONFIG_URI]
        [--kms-key-name=KMS_KEY_NAME : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions wasm-plugins delete

```text
NAME
    gcloud alpha service-extensions wasm-plugins delete - delete a WasmPlugin
        resource

SYNOPSIS
    gcloud alpha service-extensions wasm-plugins delete
        (WASM_PLUGIN : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions wasm-plugins describe

```text
NAME
    gcloud alpha service-extensions wasm-plugins describe - show details about
        a WasmPlugin resource

SYNOPSIS
    gcloud alpha service-extensions wasm-plugins describe
        (WASM_PLUGIN : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions wasm-plugins list

```text
NAME
    gcloud alpha service-extensions wasm-plugins list - list all WasmPlugin
        resources

SYNOPSIS
    gcloud alpha service-extensions wasm-plugins list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions wasm-plugins update

```text
NAME
    gcloud alpha service-extensions wasm-plugins update - update a WasmPlugin
        resource

SYNOPSIS
    gcloud alpha service-extensions wasm-plugins update
        (WASM_PLUGIN : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--log-config=[LOG_CONFIG,...]]
        [--image=IMAGE
          --main-version=MAIN_VERSION --plugin-config=PLUGIN_CONFIG
          | --plugin-config-file=PATH_TO_FILE
          | --plugin-config-uri=PLUGIN_CONFIG_URI]
        [--kms-key-name=KMS_KEY_NAME : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Corrected from the official docs (the help text above is verbatim): the `--log-config` description of `create` and `update` gives "--log_config=enable=False" as example usage, but the flag is `--log-config` (gcloud 593.0.0: "unrecognized arguments: --log_config=enable=False (did you mean '--log-config'?)"); use `--log-config=enable=False`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/service-extensions/wasm-plugins (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
