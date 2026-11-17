---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-management/network-monitoring-providers/delete
---

# gcloud network-management network-monitoring-providers delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-management network-monitoring-providers delete

```text
NAME
    gcloud network-management network-monitoring-providers delete - delete a
        Network Monitoring Provider

SYNOPSIS
    gcloud network-management network-monitoring-providers delete
        (NETWORK_MONITORING_PROVIDER : --location=LOCATION) [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a specific Network Monitoring Provider.

    Note: The only supported location for these resources is global.

EXAMPLES
    To delete the Network Monitoring Provider my-provider-id, run:

        $ gcloud network-management network-monitoring-providers delete \
            my-provider-id --location=global

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

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --force
        If set to true, any nested
        [MonitoringPoints][google.cloud.networkmanagement.v1.MonitoringPoint],
        [NetworkPaths][google.cloud.networkmanagement.v1.NetworkPath] and
        [WebPaths][google.cloud.networkmanagement.v1.WebPath] resources from
        this
        [NetworkMonitoringProvider][google.cloud.networkmanagement.v1.NetworkMonitoringProvider]
        will also be deleted. Otherwise, the request will only work if there
        are no nested resources.

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

        $ gcloud alpha network-management network-monitoring-providers delete
```

### gcloud alpha network-management network-monitoring-providers delete

```text
NAME
    gcloud alpha network-management network-monitoring-providers delete -
        delete a Network Monitoring Provider

SYNOPSIS
    gcloud alpha network-management network-monitoring-providers delete
        (NETWORK_MONITORING_PROVIDER : --location=LOCATION) [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-management/network-monitoring-providers/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
