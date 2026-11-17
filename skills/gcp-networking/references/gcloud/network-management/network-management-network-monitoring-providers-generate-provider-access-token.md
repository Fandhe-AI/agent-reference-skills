---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-management/network-monitoring-providers/generate-provider-access-token
---

# gcloud network-management network-monitoring-providers generate-provider-access-token

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-management network-monitoring-providers generate-provider-access-token

```text
NAME
    gcloud network-management network-monitoring-providers
        generate-provider-access-token - generate a provider access token

SYNOPSIS
    gcloud network-management network-monitoring-providers
        generate-provider-access-token
        (NETWORK_MONITORING_PROVIDER : --location=LOCATION)
        --gcp-access-token=GCP_ACCESS_TOKEN [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Exchanges a valid Google Cloud access token for a temporary access token
    that can be used to authenticate requests to the partner's platform API.

    The generated partner's access token's lifetime is tied to the input Google
    Cloud access token; it will expire when the Google Cloud token expires.
    This token is necessary for any direct API interactions with partner's
    resources.

    Note: The only supported location for these resources is global.

EXAMPLES
    To generate a provider access token for the Network Monitoring Provider
    my-provider-id, run:

        $ gcloud network-management network-monitoring-providers \
            generate-provider-access-token my-provider-id \
            --location=global --gcp-access-token=<GCP_ACCESS_TOKEN>

POSITIONAL ARGUMENTS
     NetworkMonitoringProvider resource - Name of the resource. Format:
     projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument network_monitoring_provider on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NETWORK_MONITORING_PROVIDER
          ID of the networkMonitoringProvider or fully qualified identifier for
          the networkMonitoringProvider.

          To set the network_monitoring_provider attribute:
          + provide the argument network_monitoring_provider on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the networkMonitoringProvider resource.

          To set the location attribute:
          + provide the argument network_monitoring_provider on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --gcp-access-token=GCP_ACCESS_TOKEN
        Google Cloud access token.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkmanagement/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud alpha network-management network-monitoring-providers \
            generate-provider-access-token
```

### gcloud alpha network-management network-monitoring-providers generate-provider-access-token

```text
NAME
    gcloud alpha network-management network-monitoring-providers
        generate-provider-access-token - generate a provider access token

SYNOPSIS
    gcloud alpha network-management network-monitoring-providers
        generate-provider-access-token
        (NETWORK_MONITORING_PROVIDER : --location=LOCATION)
        --gcp-access-token=GCP_ACCESS_TOKEN [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-management/network-monitoring-providers/generate-provider-access-token (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
