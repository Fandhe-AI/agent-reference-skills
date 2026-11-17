---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-services/agent-connectivity-templates
---

# gcloud network-services agent-connectivity-templates

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-services agent-connectivity-templates delete

```text
NAME
    gcloud network-services agent-connectivity-templates delete - delete an
        Agent Connectivity Template

SYNOPSIS
    gcloud network-services agent-connectivity-templates delete
        (AGENT_CONNECTIVITY_TEMPLATE : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified Agent Connectivity Template.

EXAMPLES
    To delete an Agent Connectivity Template named
    'my-agent-connectivity-template', run:

        $ gcloud network-services agent-connectivity-templates delete \
            my-agent-connectivity-template --location=us-central1

POSITIONAL ARGUMENTS
     Agent connectivity template resource - Name of the agent connectivity
     template to delete. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument agent_connectivity_template on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AGENT_CONNECTIVITY_TEMPLATE
          ID of the agent connectivity template or fully qualified identifier
          for the agent connectivity template.

          To set the agent_connectivity_template attribute:
          + provide the argument agent_connectivity_template on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument agent_connectivity_template on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha network-services agent-connectivity-templates delete

        $ gcloud beta network-services agent-connectivity-templates delete
```

### gcloud network-services agent-connectivity-templates describe

```text
NAME
    gcloud network-services agent-connectivity-templates describe - describe a
        Agent Connectivity Template

SYNOPSIS
    gcloud network-services agent-connectivity-templates describe
        (AGENT_CONNECTIVITY_TEMPLATE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of an Agent Connectivity Template.

EXAMPLES
    Show details about an Agent Connectivity Template named
    'my-agent-connectivity-template'.

        $ gcloud network-services agent-connectivity-templates describe \
          my-agent-connectivity-template --location=us-central1

POSITIONAL ARGUMENTS
     Agent connectivity template resource - Name of the agent connectivity
     template to describe. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument agent_connectivity_template on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AGENT_CONNECTIVITY_TEMPLATE
          ID of the agent connectivity template or fully qualified identifier
          for the agent connectivity template.

          To set the agent_connectivity_template attribute:
          + provide the argument agent_connectivity_template on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument agent_connectivity_template on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha network-services agent-connectivity-templates describe

        $ gcloud beta network-services agent-connectivity-templates describe
```

### gcloud network-services agent-connectivity-templates export

```text
NAME
    gcloud network-services agent-connectivity-templates export - export an
        Agent Connectivity Template

SYNOPSIS
    gcloud network-services agent-connectivity-templates export
        (AGENT_CONNECTIVITY_TEMPLATE : --location=LOCATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export an Agent Connectivity Template.

EXAMPLES
    To export an Agent Connectivity Template named
    'my-agent-connectivity-template' to a YAML file, run:

        $ gcloud network-services agent-connectivity-templates export \
            my-agent-connectivity-template --location=us-central1 \
            --destination=my-agent-connectivity-template.yaml

POSITIONAL ARGUMENTS
     Agent connectivity template resource - Name of the agent connectivity
     template to export. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument agent_connectivity_template on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AGENT_CONNECTIVITY_TEMPLATE
          ID of the agent connectivity template or fully qualified identifier
          for the agent connectivity template.

          To set the agent_connectivity_template attribute:
          + provide the argument agent_connectivity_template on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument agent_connectivity_template on the command
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
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services agent-connectivity-templates export

        $ gcloud beta network-services agent-connectivity-templates export
```

### gcloud network-services agent-connectivity-templates import

```text
NAME
    gcloud network-services agent-connectivity-templates import - import an
        Agent Connectivity Template

SYNOPSIS
    gcloud network-services agent-connectivity-templates import
        (AGENT_CONNECTIVITY_TEMPLATE : --location=LOCATION) [--async]
        [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Import an agent connectivity template.

EXAMPLES
    To import an agent connectivity template named
    'my-agent-connectivity-template' from a YAML file, run:

        $ gcloud network-services agent-connectivity-templates import \
            my-agent-connectivity-template --location=us-central1 \
            --source=my-agent-connectivity-template.yaml

POSITIONAL ARGUMENTS
     Agent connectivity template resource - Name of the agent connectivity
     template to import. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument agent_connectivity_template on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AGENT_CONNECTIVITY_TEMPLATE
          ID of the agent connectivity template or fully qualified identifier
          for the agent connectivity template.

          To set the agent_connectivity_template attribute:
          + provide the argument agent_connectivity_template on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument agent_connectivity_template on the command
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
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services agent-connectivity-templates import

        $ gcloud beta network-services agent-connectivity-templates import
```

### gcloud network-services agent-connectivity-templates list

```text
NAME
    gcloud network-services agent-connectivity-templates list - list Agent
        Connectivity Templates

SYNOPSIS
    gcloud network-services agent-connectivity-templates list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all agent connectivity templates in the specified location of the
    current project.

EXAMPLES
    To list agent connectivity templates in the current project, run:

        $ gcloud network-services agent-connectivity-templates list \
            --location=us-central1

REQUIRED FLAGS
     Location resource - Location to list agent connectivity templates in. This
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
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services agent-connectivity-templates list

        $ gcloud beta network-services agent-connectivity-templates list
```

### gcloud beta network-services agent-connectivity-templates delete

```text
NAME
    gcloud beta network-services agent-connectivity-templates delete - delete
        an Agent Connectivity Template

SYNOPSIS
    gcloud beta network-services agent-connectivity-templates delete
        (AGENT_CONNECTIVITY_TEMPLATE : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services agent-connectivity-templates describe

```text
NAME
    gcloud beta network-services agent-connectivity-templates describe -
        describe a Agent Connectivity Template

SYNOPSIS
    gcloud beta network-services agent-connectivity-templates describe
        (AGENT_CONNECTIVITY_TEMPLATE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services agent-connectivity-templates export

```text
NAME
    gcloud beta network-services agent-connectivity-templates export - export
        an Agent Connectivity Template

SYNOPSIS
    gcloud beta network-services agent-connectivity-templates export
        (AGENT_CONNECTIVITY_TEMPLATE : --location=LOCATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services agent-connectivity-templates import

```text
NAME
    gcloud beta network-services agent-connectivity-templates import - import
        an Agent Connectivity Template

SYNOPSIS
    gcloud beta network-services agent-connectivity-templates import
        (AGENT_CONNECTIVITY_TEMPLATE : --location=LOCATION) [--async]
        [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services agent-connectivity-templates list

```text
NAME
    gcloud beta network-services agent-connectivity-templates list - list Agent
        Connectivity Templates

SYNOPSIS
    gcloud beta network-services agent-connectivity-templates list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services agent-connectivity-templates delete

```text
NAME
    gcloud alpha network-services agent-connectivity-templates delete - delete
        an Agent Connectivity Template

SYNOPSIS
    gcloud alpha network-services agent-connectivity-templates delete
        (AGENT_CONNECTIVITY_TEMPLATE : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services agent-connectivity-templates describe

```text
NAME
    gcloud alpha network-services agent-connectivity-templates describe -
        describe a Agent Connectivity Template

SYNOPSIS
    gcloud alpha network-services agent-connectivity-templates describe
        (AGENT_CONNECTIVITY_TEMPLATE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services agent-connectivity-templates export

```text
NAME
    gcloud alpha network-services agent-connectivity-templates export - export
        an Agent Connectivity Template

SYNOPSIS
    gcloud alpha network-services agent-connectivity-templates export
        (AGENT_CONNECTIVITY_TEMPLATE : --location=LOCATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services agent-connectivity-templates import

```text
NAME
    gcloud alpha network-services agent-connectivity-templates import - import
        an Agent Connectivity Template

SYNOPSIS
    gcloud alpha network-services agent-connectivity-templates import
        (AGENT_CONNECTIVITY_TEMPLATE : --location=LOCATION) [--async]
        [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services agent-connectivity-templates list

```text
NAME
    gcloud alpha network-services agent-connectivity-templates list - list
        Agent Connectivity Templates

SYNOPSIS
    gcloud alpha network-services agent-connectivity-templates list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-services/agent-connectivity-templates (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
