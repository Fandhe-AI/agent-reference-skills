---
source: https://docs.cloud.google.com/sdk/gcloud/reference/developer-connect/insights-configs
---

# gcloud developer-connect insights-configs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud developer-connect insights-configs create

```text
NAME
    gcloud developer-connect insights-configs create - create an insight config

SYNOPSIS
    gcloud developer-connect insights-configs create
        (INSIGHTS_CONFIG : --location=LOCATION)
        (--app-hub-application=APP_HUB_APPLICATION
          | --target-projects=[TARGET_PROJECTS,...])
        [--artifact-config=ARTIFACT_CONFIG_ITEM] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an insights config.

EXAMPLES
    To create an insights config with an apphub application, run:

        $ gcloud developer-connect insights-configs create \
            insights-config-name \
            --app-hub-application=projects/my-project/locations/\
        us-central1/applications/my-app-hub-application

    To create an insights config with projects, run:

        $ gcloud developer-connect insights-configs create \
            insights-config-name --target-projects=project1,project2

POSITIONAL ARGUMENTS
     Insights config resource - The insights config to create. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument insights_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSIGHTS_CONFIG
          ID of the insights_config or fully qualified identifier for the
          insights_config.

          To set the insightsConfigs attribute:
          + provide the argument insights_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The region of the insight config.

          To set the location attribute:
          + provide the argument insights_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --app-hub-application=APP_HUB_APPLICATION
          The App Hub application to which the insight config is associated.

       --target-projects=[TARGET_PROJECTS,...]
          A comma-separated list of target project IDs/numbers to which the
          insight config is associated.

          Format examples: --target-projects=123567890,my-project
          --target-projects=projects/1234567890,projects/my-project

OPTIONAL FLAGS
     --artifact-config=ARTIFACT_CONFIG_ITEM
        Specifies a single artifact configuration. This flag can be repeated
        for multiple configurations.

        Each configuration can be provided in a key-value format.

        Format examples:
        --artifact-config=uri={REGION}-docker.pkg.dev/my-project/my-repo/my-image,buildProject=my-project
        --artifact-config=[uri={REGION}-docker.pkg.dev/my-project/my-repo/my-image,buildProject=my-project]

        Supported keys within a configuration:
        * buildProject: String, e.g., my-project
        * uri: String, e.g.,
          {REGION}-docker.pkg.dev/my-project/my-repo/my-image

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha developer-connect insights-configs create

        $ gcloud beta developer-connect insights-configs create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud developer-connect insights-configs create insights-config-name \
    --app-hub-application=projects/my-project/locations/us-central1/applications/my-app-hub-application
```

### gcloud developer-connect insights-configs delete

```text
NAME
    gcloud developer-connect insights-configs delete - delete insightsConfigs

SYNOPSIS
    gcloud developer-connect insights-configs delete
        (INSIGHTS_CONFIG : --location=LOCATION) [--async] [--etag=ETAG]
        [--request-id=REQUEST_ID] [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an insightsConfig

EXAMPLES
    To delete the insightsConfig, run:

        $ gcloud developer-connect insights-configs delete

POSITIONAL ARGUMENTS
     InsightsConfig resource - Value for parent. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument insights_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSIGHTS_CONFIG
          ID of the insightsConfig or fully qualified identifier for the
          insightsConfig.

          To set the insights_config attribute:
          + provide the argument insights_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the insightsConfig resource.

          To set the location attribute:
          + provide the argument insights_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        This checksum is computed by the server based on the value of other
        fields, and may be sent on update and delete requests to ensure the
        client has an up-to-date value before proceeding.

     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server will
        guarantee that for at least 60 minutes after the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     --validate-only
        If set, validate the request, but do not actually post it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the developerconnect/v1 API. The full documentation for
    this API can be found at:
    http://cloud.google.com/developer-connect/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha developer-connect insights-configs delete

        $ gcloud beta developer-connect insights-configs delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud developer-connect insights-configs delete my-insights-config \
    --location=us-central1
```

### gcloud developer-connect insights-configs deployment-events describe

```text
NAME
    gcloud developer-connect insights-configs deployment-events describe -
        describe a deploymentEvent

SYNOPSIS
    gcloud developer-connect insights-configs deployment-events describe
        (DEPLOYMENT_EVENT
          : --insights-config=INSIGHTS_CONFIG --location=LOCATION)
        [--show-details] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a deploymentEvent

EXAMPLES
    To describe a deploymentEvent, run:

        $ gcloud developer-connect insights-configs deployment-events \
          describe \
          projects/PROJECT/locations/LOCATION/insightsConfigs/\
        INSIGHTS_CONFIG/deploymentEvents/DEPLOYMENT_EVENT

POSITIONAL ARGUMENTS
     DeploymentEvent resource - The deployment event to describe. Format:
     projects/{project}/locations/{location}/insightsConfigs/{insights_config}/deploymentEvents/{deployment_event}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument deployment_event on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DEPLOYMENT_EVENT
          ID of the deploymentEvent or fully qualified identifier for the
          deploymentEvent.

          To set the deployment_event attribute:
          + provide the argument deployment_event on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --insights-config=INSIGHTS_CONFIG
          The insightsConfig id of the deploymentEvent resource.

          To set the insights-config attribute:
          + provide the argument deployment_event on the command line with a
            fully specified name;
          + provide the argument --insights-config on the command line.

       --location=LOCATION
          The location id of the deploymentEvent resource.

          To set the location attribute:
          + provide the argument deployment_event on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --show-details
        If true, enriches the deployment event with vulnerability and package
        dependency details from Container Analysis.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the developerconnect/v1 API. The full documentation for
    this API can be found at:
    http://cloud.google.com/developer-connect/docs/overview

NOTES
    This variant is also available:

        $ gcloud alpha developer-connect insights-configs \
            deployment-events describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud developer-connect insights-configs deployment-events describe projects/PROJECT/locations/LOCATION/insightsConfigs/INSIGHTS_CONFIG/deploymentEvents/DEPLOYMENT_EVENT
```

### gcloud developer-connect insights-configs deployment-events list

```text
NAME
    gcloud developer-connect insights-configs deployment-events list - list
        deploymentEvents

SYNOPSIS
    gcloud developer-connect insights-configs deployment-events list
        (--insights-config=INSIGHTS_CONFIG : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List deploymentEvents

EXAMPLES
    To list all deploymentEvents, run:

        $ gcloud developer-connect insights-configs deployment-events list

REQUIRED FLAGS
     InsightsConfig resource - The parent insights config that owns this
     collection of deployment events. Format:
     projects/{project}/locations/{location}/insightsConfigs/{insights_config}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --insights-config on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --insights-config=INSIGHTS_CONFIG
          ID of the insightsConfig or fully qualified identifier for the
          insightsConfig.

          To set the insights-config attribute:
          + provide the argument --insights-config on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location id of the insightsConfig resource.

          To set the location attribute:
          + provide the argument --insights-config on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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
    This command uses the developerconnect/v1 API. The full documentation for
    this API can be found at:
    http://cloud.google.com/developer-connect/docs/overview

NOTES
    This variant is also available:

        $ gcloud alpha developer-connect insights-configs \
            deployment-events list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud developer-connect insights-configs deployment-events list \
    --insights-config=my-insights-config \
    --location=us-central1
```

### gcloud developer-connect insights-configs describe

```text
NAME
    gcloud developer-connect insights-configs describe - describe
        insightsConfigs

SYNOPSIS
    gcloud developer-connect insights-configs describe
        (INSIGHTS_CONFIG : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an insightsConfig

EXAMPLES
    To describe the insightsConfig, run:

        $ gcloud developer-connect insights-configs describe

POSITIONAL ARGUMENTS
     InsightsConfig resource - Name of the resource. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument insights_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSIGHTS_CONFIG
          ID of the insightsConfig or fully qualified identifier for the
          insightsConfig.

          To set the insights_config attribute:
          + provide the argument insights_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the insightsConfig resource.

          To set the location attribute:
          + provide the argument insights_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the developerconnect/v1 API. The full documentation for
    this API can be found at:
    http://cloud.google.com/developer-connect/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha developer-connect insights-configs describe

        $ gcloud beta developer-connect insights-configs describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud developer-connect insights-configs describe my-insights-config \
    --location=us-central1
```

### gcloud developer-connect insights-configs list

```text
NAME
    gcloud developer-connect insights-configs list - list insightsConfigs

SYNOPSIS
    gcloud developer-connect insights-configs list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List insightsConfigs

EXAMPLES
    To list all insightsConfigs, run:

        $ gcloud developer-connect insights-configs list

REQUIRED FLAGS
     Location resource - Parent value for ListInsightsConfigsRequest. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

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
    This command uses the developerconnect/v1 API. The full documentation for
    this API can be found at:
    http://cloud.google.com/developer-connect/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha developer-connect insights-configs list

        $ gcloud beta developer-connect insights-configs list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud developer-connect insights-configs list \
    --location=us-central1
```

### gcloud developer-connect insights-configs update

```text
NAME
    gcloud developer-connect insights-configs update - update the configuration
        of an insight config

SYNOPSIS
    gcloud developer-connect insights-configs update
        (INSIGHTS_CONFIG : --location=LOCATION)
        (--run-discovery
          --artifact-uri=ARTIFACT_URI --build-project=BUILD_PROJECT)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the configuration of an insights config.

EXAMPLES
    To update the state of an insights config, run:

        $ gcloud developer-connect insights-configs update \
            insights-config-name --run-discovery

    To update the Artifact Analysis project for an artifact in an insights
    config, run:

        $ gcloud developer-connect insights-configs update \
            insights-config-name \
            --artifact-uri=us-{location}-docker.pkg.dev/my-project/\
        my-artifact-repo/my-image --build-project={build_project}

POSITIONAL ARGUMENTS
     Insights config resource - The insights config to update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument insights_config on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSIGHTS_CONFIG
          ID of the insights_config or fully qualified identifier for the
          insights_config.

          To set the insightsConfigs attribute:
          + provide the argument insights_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The region of the insight config.

          To set the location attribute:
          + provide the argument insights_config on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     Update the insight config.

     At least one of these must be specified:

       --run-discovery
          Sets the state of the insight config to PENDING and kicks off the
          discovery flow.

       --artifact-uri=ARTIFACT_URI
          Identifier for the specific artifact you want to update

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --build-project=BUILD_PROJECT
          The project ID of the project to where the artifact is built.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha developer-connect insights-configs update

        $ gcloud beta developer-connect insights-configs update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud developer-connect insights-configs update insights-config-name \
    --artifact-uri=us-{location}-docker.pkg.dev/my-project/my-artifact-repo/my-image \
    --build-project={build_project}
```

### gcloud beta developer-connect insights-configs create

```text
NAME
    gcloud beta developer-connect insights-configs create - create an insight
        config

SYNOPSIS
    gcloud beta developer-connect insights-configs create
        (INSIGHTS_CONFIG : --location=LOCATION)
        (--app-hub-application=APP_HUB_APPLICATION
          | --target-projects=[TARGET_PROJECTS,...])
        [--artifact-config=ARTIFACT_CONFIG_ITEM] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta developer-connect insights-configs delete

```text
NAME
    gcloud beta developer-connect insights-configs delete - delete
        insightsConfigs

SYNOPSIS
    gcloud beta developer-connect insights-configs delete
        (INSIGHTS_CONFIG : --location=LOCATION) [--async] [--etag=ETAG]
        [--request-id=REQUEST_ID] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta developer-connect insights-configs describe

```text
NAME
    gcloud beta developer-connect insights-configs describe - describe
        insightsConfigs

SYNOPSIS
    gcloud beta developer-connect insights-configs describe
        (INSIGHTS_CONFIG : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta developer-connect insights-configs list

```text
NAME
    gcloud beta developer-connect insights-configs list - list insightsConfigs

SYNOPSIS
    gcloud beta developer-connect insights-configs list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta developer-connect insights-configs update

```text
NAME
    gcloud beta developer-connect insights-configs update - update the
        configuration of an insight config

SYNOPSIS
    gcloud beta developer-connect insights-configs update
        (INSIGHTS_CONFIG : --location=LOCATION)
        (--run-discovery
          --artifact-uri=ARTIFACT_URI --build-project=BUILD_PROJECT)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect insights-configs create

```text
NAME
    gcloud alpha developer-connect insights-configs create - create an insight
        config

SYNOPSIS
    gcloud alpha developer-connect insights-configs create
        (INSIGHTS_CONFIG : --location=LOCATION)
        [--artifact-config=ARTIFACT_CONFIG_ITEM]
        [--app-hub-application=APP_HUB_APPLICATION
          | --target-projects=[TARGET_PROJECTS,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect insights-configs delete

```text
NAME
    gcloud alpha developer-connect insights-configs delete - delete
        insightsConfigs

SYNOPSIS
    gcloud alpha developer-connect insights-configs delete
        (INSIGHTS_CONFIG : --location=LOCATION) [--async] [--etag=ETAG]
        [--request-id=REQUEST_ID] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect insights-configs deployment-events describe

```text
NAME
    gcloud alpha developer-connect insights-configs deployment-events describe
        - describe a deploymentEvent

SYNOPSIS
    gcloud alpha developer-connect insights-configs deployment-events describe
        (DEPLOYMENT_EVENT
          : --insights-config=INSIGHTS_CONFIG --location=LOCATION)
        [--show-details] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect insights-configs deployment-events list

```text
NAME
    gcloud alpha developer-connect insights-configs deployment-events list -
        list deploymentEvents

SYNOPSIS
    gcloud alpha developer-connect insights-configs deployment-events list
        (--insights-config=INSIGHTS_CONFIG : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect insights-configs describe

```text
NAME
    gcloud alpha developer-connect insights-configs describe - describe
        insightsConfigs

SYNOPSIS
    gcloud alpha developer-connect insights-configs describe
        (INSIGHTS_CONFIG : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect insights-configs list

```text
NAME
    gcloud alpha developer-connect insights-configs list - list insightsConfigs

SYNOPSIS
    gcloud alpha developer-connect insights-configs list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect insights-configs update

```text
NAME
    gcloud alpha developer-connect insights-configs update - update command for
        insight configurations in Alpha

SYNOPSIS
    gcloud alpha developer-connect insights-configs update
        (INSIGHTS_CONFIG : --location=LOCATION)
        (--run-discovery
          --artifact-uri=ARTIFACT_URI --build-project=BUILD_PROJECT)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example gives only the command, without the `--insights-config` and `--location` that the SYNOPSIS requires (gcloud 593.0.0: "argument (--insights-config : --location): Must be specified"); the runnable form adds sample values.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example gives only the command, without the `--location` that the SYNOPSIS requires (gcloud 593.0.0: "argument --location: Must be specified"); the runnable form adds sample values.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example gives only the command, without the insights config name and `--location` that the SYNOPSIS requires (gcloud 593.0.0: "argument (INSIGHTS_CONFIG : --location=LOCATION): Must be specified"); the runnable form adds sample values.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/developer-connect/insights-configs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
