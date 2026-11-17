---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/get-server-config
---

# gcloud edge-cloud container get-server-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cloud container get-server-config

```text
NAME
    gcloud edge-cloud container get-server-config - get server config

SYNOPSIS
    gcloud edge-cloud container get-server-config [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud edge-cloud container get-server-config gets the server configuration
    for an Edge Container location. This configuration includes the default
    cluster version, the supported cluster versions and version configuration
    for each release channel.

EXAMPLES
    To get server config in region us-central1, run:

        $ gcloud edge-cloud container get-server-config \
            --location=us-central1

FLAGS
     Location resource - The location of the server configuration. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property edge_container/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property edge_container/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud container get-server-config
```

### gcloud alpha edge-cloud container get-server-config

```text
NAME
    gcloud alpha edge-cloud container get-server-config - get server config

SYNOPSIS
    gcloud alpha edge-cloud container get-server-config [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/get-server-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
