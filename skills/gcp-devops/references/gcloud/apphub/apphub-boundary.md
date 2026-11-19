---
source: https://docs.cloud.google.com/sdk/gcloud/reference/apphub/boundary
---

# gcloud apphub boundary

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud apphub boundary describe

```text
NAME
    gcloud apphub boundary describe - show metadata for an App Hub boundary

SYNOPSIS
    gcloud apphub boundary describe [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show metadata for an App Hub boundary.

FLAGS
     Location resource - Location of the Boundary. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * Boundaries only support global location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * Boundaries only support global location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha apphub boundary describe
```

### gcloud apphub boundary update

```text
NAME
    gcloud apphub boundary update - update an App Hub boundary

SYNOPSIS
    gcloud apphub boundary update [--async] [--crm-node=CRM_NODE]
        [--location=LOCATION] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an App Hub boundary.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Update Boundary Options

     --crm-node=CRM_NODE
        The CRM node to associate with the boundary.

     Location resource - Location of the Boundary. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * Boundaries only support global location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * Boundaries only support global location.

     --request-id=REQUEST_ID
        An optional request ID to identify requests.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha apphub boundary update
```

### gcloud alpha apphub boundary describe

```text
NAME
    gcloud alpha apphub boundary describe - show metadata for an App Hub
        boundary

SYNOPSIS
    gcloud alpha apphub boundary describe [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha apphub boundary update

```text
NAME
    gcloud alpha apphub boundary update - update an App Hub boundary

SYNOPSIS
    gcloud alpha apphub boundary update [--async] [--crm-node=CRM_NODE]
        [--location=LOCATION] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/apphub/boundary (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
