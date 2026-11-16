---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/aws/get-server-config
---

# gcloud container aws get-server-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container aws get-server-config

```text
NAME
    gcloud container aws get-server-config - get Anthos Multi-Cloud server
        configuration for AWS

SYNOPSIS
    gcloud container aws get-server-config [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Get Anthos Multi-Cloud server configuration for AWS.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To return supported AWS regions and valid versions in location us-west1,
    run:

        $ gcloud container aws get-server-config --location=us-west1

FLAGS
     Location resource - Google Cloud location to get server configuration.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property container_aws/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property container_aws/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container aws get-server-config
```

### gcloud alpha container aws get-server-config

```text
NAME
    gcloud alpha container aws get-server-config - get Anthos Multi-Cloud
        server configuration for AWS

SYNOPSIS
    gcloud alpha container aws get-server-config [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud container aws get-server-config`: "Get Anthos Multi-Cloud server configuration for AWS. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement for more details.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/aws/get-server-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
