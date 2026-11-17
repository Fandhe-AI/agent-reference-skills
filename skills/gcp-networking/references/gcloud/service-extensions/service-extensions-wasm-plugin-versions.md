---
source: https://docs.cloud.google.com/sdk/gcloud/reference/service-extensions/wasm-plugin-versions
---

# gcloud service-extensions wasm-plugin-versions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud service-extensions wasm-plugin-versions create

```text
NAME
    gcloud service-extensions wasm-plugin-versions create - create a
        WasmPluginVersion resource

SYNOPSIS
    gcloud service-extensions wasm-plugin-versions create
        (WASM_PLUGIN_VERSION : --location=LOCATION --wasm-plugin=WASM_PLUGIN)
        --image=IMAGE [--async] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]]
        [--plugin-config=PLUGIN_CONFIG | --plugin-config-file=PATH_TO_FILE
          | --plugin-config-uri=PLUGIN_CONFIG_URI] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new WasmPluginVersion resource.

EXAMPLES
    To create a WasmPluginVersion called my-plugin-version, run:

        $ gcloud service-extensions wasm-plugin-versions create \
            my-plugin-version --wasm-plugin=my-plugin \
            --image=...-docker.pkg.dev/my-project/repository/container:tag

POSITIONAL ARGUMENTS
     WasmPluginVersion resource - The ID of the WasmPluginVersion resource to
     create. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument wasm_plugin_version on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WASM_PLUGIN_VERSION
          ID of the WasmPluginVersion or fully qualified identifier for the
          WasmPluginVersion.

          To set the wasm_plugin_version attribute:
          + provide the argument wasm_plugin_version on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location ID.

          To set the location attribute:
          + provide the argument wasm_plugin_version on the command line with
            a fully specified name;
          + provide the argument --location on the command line;
          + use global location.

       --wasm-plugin=WASM_PLUGIN
          The ID of the WasmPlugin.

          To set the wasm-plugin attribute:
          + provide the argument wasm_plugin_version on the command line with
            a fully specified name;
          + provide the argument --wasm-plugin on the command line.

REQUIRED FLAGS
     --image=IMAGE
        URI of the image containing the plugin's Wasm module, stored in the
        Artifact Registry.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A human-readable description of the resource.

     --labels=[KEY=VALUE,...]
        List of KEY=VALUE labels to attach to this resource.

     Configuration for the plugin, provided at runtime by the on_configure
     function (Rust Proxy-Wasm SDK) or the onConfigure method (C++ Proxy-Wasm
     SDK).

     At most one of these can be specified:

       --plugin-config=PLUGIN_CONFIG
          Plugin configuration in the textual format.

       --plugin-config-file=PATH_TO_FILE
          Path to a file containing the plugin configuration. Use a full or
          relative path to a local file containing the value of
          plugin_config_file.

       --plugin-config-uri=PLUGIN_CONFIG_URI
          URI of the image containing the plugin's configuration, stored in the
          Artifact Registry.

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

        $ gcloud alpha service-extensions wasm-plugin-versions create

        $ gcloud beta service-extensions wasm-plugin-versions create
```

### gcloud service-extensions wasm-plugin-versions delete

```text
NAME
    gcloud service-extensions wasm-plugin-versions delete - delete a
        WasmPluginVersion resource

SYNOPSIS
    gcloud service-extensions wasm-plugin-versions delete
        (WASM_PLUGIN_VERSION : --location=LOCATION --wasm-plugin=WASM_PLUGIN)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a WasmPluginVersion resource.

EXAMPLES
    To delete a WasmPluginVersion called 'my-plugin-version', run:

        $ gcloud service-extensions wasm-plugin-versions delete \
            my-plugin-version

POSITIONAL ARGUMENTS
     WasmPluginVersion resource - The WasmPluginVersion resource to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument wasm_plugin_version on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WASM_PLUGIN_VERSION
          ID of the WasmPluginVersion or fully qualified identifier for the
          WasmPluginVersion.

          To set the wasm_plugin_version attribute:
          + provide the argument wasm_plugin_version on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location ID.

          To set the location attribute:
          + provide the argument wasm_plugin_version on the command line with
            a fully specified name;
          + provide the argument --location on the command line;
          + use global location.

       --wasm-plugin=WASM_PLUGIN
          The ID of the WasmPlugin.

          To set the wasm-plugin attribute:
          + provide the argument wasm_plugin_version on the command line with
            a fully specified name;
          + provide the argument --wasm-plugin on the command line.

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

        $ gcloud alpha service-extensions wasm-plugin-versions delete

        $ gcloud beta service-extensions wasm-plugin-versions delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud service-extensions wasm-plugin-versions delete my-plugin-version \
    --wasm-plugin=my-plugin
```

### gcloud service-extensions wasm-plugin-versions describe

```text
NAME
    gcloud service-extensions wasm-plugin-versions describe - show details
        about a WasmPluginVersion resource

SYNOPSIS
    gcloud service-extensions wasm-plugin-versions describe
        (WASM_PLUGIN_VERSION : --location=LOCATION --wasm-plugin=WASM_PLUGIN)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about a WasmPluginVersion resource.

EXAMPLES
    To show details about a WasmPluginVersion, run:

        $ gcloud service-extensions wasm-plugin-versions describe \
            my-plugin-version

POSITIONAL ARGUMENTS
     WasmPluginVersion resource - The WasmPluginVersion resource that you want
     to describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument wasm_plugin_version on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WASM_PLUGIN_VERSION
          ID of the WasmPluginVersion or fully qualified identifier for the
          WasmPluginVersion.

          To set the wasm_plugin_version attribute:
          + provide the argument wasm_plugin_version on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location ID.

          To set the location attribute:
          + provide the argument wasm_plugin_version on the command line with
            a fully specified name;
          + provide the argument --location on the command line;
          + use global location.

       --wasm-plugin=WASM_PLUGIN
          The ID of the WasmPlugin.

          To set the wasm-plugin attribute:
          + provide the argument wasm_plugin_version on the command line with
            a fully specified name;
          + provide the argument --wasm-plugin on the command line.

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

        $ gcloud alpha service-extensions wasm-plugin-versions describe

        $ gcloud beta service-extensions wasm-plugin-versions describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud service-extensions wasm-plugin-versions describe my-plugin-version \
    --wasm-plugin=my-plugin
```

### gcloud service-extensions wasm-plugin-versions list

```text
NAME
    gcloud service-extensions wasm-plugin-versions list - list all
        WasmPluginVersion resources for a WasmPlugin

SYNOPSIS
    gcloud service-extensions wasm-plugin-versions list
        (--wasm-plugin=WASM_PLUGIN : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List WasmPluginVersion resources.

EXAMPLES
    To list existing WasmPluginVersion resources, run:

        $ gcloud service-extensions wasm-plugin-versions list \
            --wasm-plugin=WASM_PLUGIN

REQUIRED FLAGS
     WasmPlugin resource - The parent WasmPlugin. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --wasm-plugin on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --wasm-plugin=WASM_PLUGIN
          ID of the WasmPlugin or fully qualified identifier for the
          WasmPlugin.

          To set the wasm-plugin attribute:
          + provide the argument --wasm-plugin on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location ID.

          To set the location attribute:
          + provide the argument --wasm-plugin on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + use global location.

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

        $ gcloud alpha service-extensions wasm-plugin-versions list

        $ gcloud beta service-extensions wasm-plugin-versions list
```

### gcloud beta service-extensions wasm-plugin-versions create

```text
NAME
    gcloud beta service-extensions wasm-plugin-versions create - create a
        WasmPluginVersion resource

SYNOPSIS
    gcloud beta service-extensions wasm-plugin-versions create
        (WASM_PLUGIN_VERSION : --location=LOCATION --wasm-plugin=WASM_PLUGIN)
        --image=IMAGE [--async] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]]
        [--plugin-config=PLUGIN_CONFIG | --plugin-config-file=PATH_TO_FILE
          | --plugin-config-uri=PLUGIN_CONFIG_URI] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-extensions wasm-plugin-versions delete

```text
NAME
    gcloud beta service-extensions wasm-plugin-versions delete - delete a
        WasmPluginVersion resource

SYNOPSIS
    gcloud beta service-extensions wasm-plugin-versions delete
        (WASM_PLUGIN_VERSION : --location=LOCATION --wasm-plugin=WASM_PLUGIN)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-extensions wasm-plugin-versions describe

```text
NAME
    gcloud beta service-extensions wasm-plugin-versions describe - show details
        about a WasmPluginVersion resource

SYNOPSIS
    gcloud beta service-extensions wasm-plugin-versions describe
        (WASM_PLUGIN_VERSION : --location=LOCATION --wasm-plugin=WASM_PLUGIN)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-extensions wasm-plugin-versions list

```text
NAME
    gcloud beta service-extensions wasm-plugin-versions list - list all
        WasmPluginVersion resources for a WasmPlugin

SYNOPSIS
    gcloud beta service-extensions wasm-plugin-versions list
        (--wasm-plugin=WASM_PLUGIN : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions wasm-plugin-versions create

```text
NAME
    gcloud alpha service-extensions wasm-plugin-versions create - create a
        WasmPluginVersion resource

SYNOPSIS
    gcloud alpha service-extensions wasm-plugin-versions create
        (WASM_PLUGIN_VERSION : --location=LOCATION --wasm-plugin=WASM_PLUGIN)
        --image=IMAGE [--async] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]]
        [--plugin-config=PLUGIN_CONFIG | --plugin-config-file=PATH_TO_FILE
          | --plugin-config-uri=PLUGIN_CONFIG_URI] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions wasm-plugin-versions delete

```text
NAME
    gcloud alpha service-extensions wasm-plugin-versions delete - delete a
        WasmPluginVersion resource

SYNOPSIS
    gcloud alpha service-extensions wasm-plugin-versions delete
        (WASM_PLUGIN_VERSION : --location=LOCATION --wasm-plugin=WASM_PLUGIN)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions wasm-plugin-versions describe

```text
NAME
    gcloud alpha service-extensions wasm-plugin-versions describe - show
        details about a WasmPluginVersion resource

SYNOPSIS
    gcloud alpha service-extensions wasm-plugin-versions describe
        (WASM_PLUGIN_VERSION : --location=LOCATION --wasm-plugin=WASM_PLUGIN)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions wasm-plugin-versions list

```text
NAME
    gcloud alpha service-extensions wasm-plugin-versions list - list all
        WasmPluginVersion resources for a WasmPlugin

SYNOPSIS
    gcloud alpha service-extensions wasm-plugin-versions list
        (--wasm-plugin=WASM_PLUGIN : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `delete` and `describe` example omits `--wasm-plugin`, which the SYNOPSIS requires for the resource (no property sets it); gcloud 593.0.0 fails with "Failed to find attribute [wasm-plugin]" without it, so the runnable form adds `--wasm-plugin=my-plugin`, the plugin of the `create` example on this page (the location falls back to `global`: "use global location").
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/service-extensions/wasm-plugin-versions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
