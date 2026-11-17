---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-management/network-monitoring-providers/monitoring-points
---

# gcloud network-management network-monitoring-providers monitoring-points

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-management network-monitoring-providers monitoring-points describe

```text
NAME
    gcloud network-management network-monitoring-providers monitoring-points
        describe - describe a Monitoring Point

SYNOPSIS
    gcloud network-management network-monitoring-providers monitoring-points
        describe
        (MONITORING_POINT : --location=LOCATION
          --network-monitoring-provider=NETWORK_MONITORING_PROVIDER)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details about a specific Monitoring Point.

    Note: The only supported location for these resources is global.

EXAMPLES
    To describe the Monitoring Point my-monitoring-point-id under provider
    my-provider-id, run:

        $ gcloud network-management network-monitoring-providers \
            monitoring-points describe my-monitoring-point-id \
            --network-monitoring-provider=my-provider-id --location=global

POSITIONAL ARGUMENTS
     MonitoringPoint resource - Name of the resource. Format:
     projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider}/monitoringPoints/{monitoring_point}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument monitoring_point on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MONITORING_POINT
          ID of the monitoringPoint or fully qualified identifier for the
          monitoringPoint.

          To set the monitoring_point attribute:
          + provide the argument monitoring_point on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the monitoringPoint resource.

          To set the location attribute:
          + provide the argument monitoring_point on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --network-monitoring-provider=NETWORK_MONITORING_PROVIDER
          The networkMonitoringProvider id of the monitoringPoint resource.

          To set the network-monitoring-provider attribute:
          + provide the argument monitoring_point on the command line with a
            fully specified name;
          + provide the argument --network-monitoring-provider on the command
            line.

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
            monitoring-points describe
```

### gcloud network-management network-monitoring-providers monitoring-points download-install-script

```text
NAME
    gcloud network-management network-monitoring-providers monitoring-points
        download-install-script - download an installation script for a
        Monitoring Point

SYNOPSIS
    gcloud network-management network-monitoring-providers monitoring-points
        download-install-script --hostname=HOSTNAME --location=LOCATION
        --monitoring-point-type=MONITORING_POINT_TYPE
        --network-monitoring-provider=NETWORK_MONITORING_PROVIDER
        --output-file=OUTPUT_FILE [--ntp-server-address=NTP_SERVER_ADDRESS]
        [--ntp-server-secondary-address=NTP_SERVER_SECONDARY_ADDRESS]
        [--password=PASSWORD] [--time-zone=TIME_ZONE] [--use-dhcp]
        [--dns-server-address=DNS_SERVER_ADDRESS
          --dns-server-secondary-address=DNS_SERVER_SECONDARY_ADDRESS
          --domain=DOMAIN --gateway-address=GATEWAY_ADDRESS
          --netmask=NETMASK --static-ip-address=STATIC_IP_ADDRESS]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Downloads an installation script for a Monitoring Point for a given Network
    Monitoring Provider.

    The command downloads a tarball for --monitoring-point-type=container or
    --monitoring-point-type=helm, or a zip file for
    --monitoring-point-type=aws-ec2, --monitoring-point-type=azure-vm,
    --monitoring-point-type=gce-vm, --monitoring-point-type=kvm or
    --monitoring-point-type=vmware.

    The --network-monitoring-provider, --location, --monitoring-point-type, and
    --hostname arguments are required for all Monitoring Points. Additional
    arguments depend on the value of --monitoring-point-type.

    If --monitoring-point-type=aws-ec2, --monitoring-point-type=azure-vm,
    --monitoring-point-type=container, --monitoring-point-type=gce-vm, or
    --monitoring-point-type=helm is specified, no other flags are required, and
    flags like --password, --time-zone, --use-dhcp, and --static-ip-address are
    not allowed.

    If --monitoring-point-type=kvm or --monitoring-point-type=vmware is
    specified, --password and --time-zone are also required. You must also
    specify either --use-dhcp for DHCP configurations or --static-ip-address
    for static IP configurations. If using --static-ip-address,
    --gateway-address and --dns-server-address are also required.

EXAMPLES
    To download the install script for a Monitoring Point of type container,
    run:

        $ gcloud network-management network-monitoring-providers \
            monitoring-points download-install-script \
            --network-monitoring-provider=my-provider --location=global \
            --monitoring-point-type=container \
            --hostname=container-hostname \
            --output-file=compose.container-hostname.tar.gz

    To download the install script for a Monitoring Point of type kvm using
    DHCP, run:

        $ gcloud network-management network-monitoring-providers \
            monitoring-points download-install-script \
            --network-monitoring-provider=my-provider --location=global \
            --monitoring-point-type=kvm --hostname=kvm-hostname \
            --password=my-password --time-zone=America/Los_Angeles \
            --use-dhcp --output-file=kvm.kvm-hostname.zip

    To download the install script for a Monitoring Point of type vmware using
    a static IP, run:

        $ gcloud network-management network-monitoring-providers \
            monitoring-points download-install-script \
            --network-monitoring-provider=my-provider --location=global \
            --monitoring-point-type=vmware --hostname=vmware-hostname \
            --password=my-password --time-zone=America/Los_Angeles \
            --static-ip-address=192.168.1.100 --netmask=255.255.255.0 \
            --gateway-address=192.168.1.1 --dns-server-address=8.8.8.8 \
            --output-file=vmwareApplianceConfig.zip

REQUIRED FLAGS
     --hostname=HOSTNAME
        The hostname of the Monitoring Point (example: test-vm).

     --location=LOCATION
        The location of the Network Monitoring Provider (example:, global).

     --monitoring-point-type=MONITORING_POINT_TYPE
        The type of the Monitoring Point. MONITORING_POINT_TYPE must be one of:
        aws-ec2, azure-vm, container, gce-vm, helm, kvm, vmware.

     --network-monitoring-provider=NETWORK_MONITORING_PROVIDER
        The ID of the Network Monitoring Provider.

     --output-file=OUTPUT_FILE
        The path to save the downloaded install script.

OPTIONAL FLAGS
     --ntp-server-address=NTP_SERVER_ADDRESS
        Primary NTP server address (IP address or FQDN). Allowed for types KVM
        and VMWARE only.

     --ntp-server-secondary-address=NTP_SERVER_SECONDARY_ADDRESS
        Secondary NTP server address (IP address or FQDN). Allowed for types
        KVM and VMWARE only.

     --password=PASSWORD
        Password for logging into the Monitoring Point. Required for types KVM
        and VMWARE, not allowed for CONTAINER.

     --time-zone=TIME_ZONE
        Time zone ID for the Monitoring Point (example: America/Los_Angeles).
        Required for types KVM and VMWARE, not allowed for CONTAINER.

     --use-dhcp
        Whether to use DHCP for IP address configuration. Allowed for types KVM
        and VMWARE only.

     Static IP address configuration. Allowed for types KVM and VMWARE only.

     --dns-server-address=DNS_SERVER_ADDRESS
        Primary DNS server address. Required if --static-ip-address is
        specified.

     --dns-server-secondary-address=DNS_SERVER_SECONDARY_ADDRESS
        Secondary DNS server address. Used with --static-ip-address.

     --domain=DOMAIN
        Domain name of the Monitoring Point. Used with --static-ip-address.

     --gateway-address=GATEWAY_ADDRESS
        Gateway IP address. Required if --static-ip-address is specified.

     --netmask=NETMASK
        Network mask (example: "255.255.255.0"). Used with --static-ip-address.

     --static-ip-address=STATIC_IP_ADDRESS
        Static IP address of the Monitoring Point. If specified,
        --gateway-address and --dns-server-address are required.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Download an installation script for a Monitoring Point.

NOTES
    This variant is also available:

        $ gcloud alpha network-management network-monitoring-providers \
            monitoring-points download-install-script
```

### gcloud network-management network-monitoring-providers monitoring-points download-recreate-install-script

```text
NAME
    gcloud network-management network-monitoring-providers monitoring-points
        download-recreate-install-script - download an installation script for
        recreating a Monitoring Point

SYNOPSIS
    gcloud network-management network-monitoring-providers monitoring-points
        download-recreate-install-script --location=LOCATION
        --monitoring-point=MONITORING_POINT
        --network-monitoring-provider=NETWORK_MONITORING_PROVIDER
        --output-file=OUTPUT_FILE [--hostname=HOSTNAME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Downloads an installation script for recreating a specific Container
    Monitoring Point. The response is a tarball file.

EXAMPLES
    To download the recreate install script for monitoring point my-mp, run:

        $ gcloud network-management network-monitoring-providers \
            monitoring-points download-recreate-install-script \
            --network-monitoring-provider=my-provider --location=global \
            --monitoring-point=my-mp --output-file=script.tar.gz

REQUIRED FLAGS
     --location=LOCATION
        The location of the Network Monitoring Provider (example: global).

     --monitoring-point=MONITORING_POINT
        The ID of the Monitoring Point.

     --network-monitoring-provider=NETWORK_MONITORING_PROVIDER
        The ID of the Network Monitoring Provider.

     --output-file=OUTPUT_FILE
        The path to save the downloaded install script.

OPTIONAL FLAGS
     --hostname=HOSTNAME
        The hostname of the Monitoring Point, e.g. "test-vm".

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Download an installation script for recreating a Monitoring Point.

NOTES
    This variant is also available:

        $ gcloud alpha network-management network-monitoring-providers \
            monitoring-points download-recreate-install-script
```

### gcloud network-management network-monitoring-providers monitoring-points download-server-connect-config

```text
NAME
    gcloud network-management network-monitoring-providers monitoring-points
        download-server-connect-config - download the server connect
        configuration

SYNOPSIS
    gcloud network-management network-monitoring-providers monitoring-points
        download-server-connect-config --location=LOCATION
        --network-monitoring-provider=NETWORK_MONITORING_PROVIDER
        --output-file=OUTPUT_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Downloads the server connect configuration for a given Network Monitoring
    Provider. The response is a zip file.

EXAMPLES
    To download the server connect configuration for provider my-provider, run:

        $ gcloud network-management network-monitoring-providers \
            monitoring-points download-server-connect-config \
            --network-monitoring-provider=my-provider --location=global \
            --output-file=config.zip

REQUIRED FLAGS
     --location=LOCATION
        The location of the Network Monitoring Provider (example: global).

     --network-monitoring-provider=NETWORK_MONITORING_PROVIDER
        The ID of the Network Monitoring Provider.

     --output-file=OUTPUT_FILE
        The path to save the downloaded server connect configuration.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Download the server connect configuration.

NOTES
    This variant is also available:

        $ gcloud alpha network-management network-monitoring-providers \
            monitoring-points download-server-connect-config
```

### gcloud network-management network-monitoring-providers monitoring-points list

```text
NAME
    gcloud network-management network-monitoring-providers monitoring-points
        list - list Monitoring Points

SYNOPSIS
    gcloud network-management network-monitoring-providers monitoring-points
        list
        (--network-monitoring-provider=NETWORK_MONITORING_PROVIDER
          : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Monitoring Points for a given Network Monitoring Provider.

    Note: The only supported location for these resources is global.

EXAMPLES
    To list all Monitoring Points for the provider my-provider-id, run:

        $ gcloud network-management network-monitoring-providers \
            monitoring-points list \
            --network-monitoring-provider=my-provider-id --location=global

REQUIRED FLAGS
     NetworkMonitoringProvider resource - Parent value for
     ListMonitoringPointsRequest. Format:
     projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --network-monitoring-provider on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --network-monitoring-provider=NETWORK_MONITORING_PROVIDER
          ID of the networkMonitoringProvider or fully qualified identifier for
          the networkMonitoringProvider.

          To set the network-monitoring-provider attribute:
          + provide the argument --network-monitoring-provider on the command
            line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location id of the networkMonitoringProvider resource.

          To set the location attribute:
          + provide the argument --network-monitoring-provider on the command
            line with a fully specified name;
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
    This command uses the networkmanagement/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud alpha network-management network-monitoring-providers \
            monitoring-points list
```

### gcloud alpha network-management network-monitoring-providers monitoring-points describe

```text
NAME
    gcloud alpha network-management network-monitoring-providers
        monitoring-points describe - describe a Monitoring Point

SYNOPSIS
    gcloud alpha network-management network-monitoring-providers
        monitoring-points describe
        (MONITORING_POINT : --location=LOCATION
          --network-monitoring-provider=NETWORK_MONITORING_PROVIDER)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-management network-monitoring-providers monitoring-points download-install-script

```text
NAME
    gcloud alpha network-management network-monitoring-providers
        monitoring-points download-install-script - download an installation
        script for a Monitoring Point

SYNOPSIS
    gcloud alpha network-management network-monitoring-providers
        monitoring-points download-install-script --hostname=HOSTNAME
        --location=LOCATION --monitoring-point-type=MONITORING_POINT_TYPE
        --network-monitoring-provider=NETWORK_MONITORING_PROVIDER
        --output-file=OUTPUT_FILE [--ntp-server-address=NTP_SERVER_ADDRESS]
        [--ntp-server-secondary-address=NTP_SERVER_SECONDARY_ADDRESS]
        [--password=PASSWORD] [--time-zone=TIME_ZONE] [--use-dhcp]
        [--dns-server-address=DNS_SERVER_ADDRESS
          --dns-server-secondary-address=DNS_SERVER_SECONDARY_ADDRESS
          --domain=DOMAIN --gateway-address=GATEWAY_ADDRESS
          --netmask=NETMASK --static-ip-address=STATIC_IP_ADDRESS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-management network-monitoring-providers monitoring-points download-recreate-install-script

```text
NAME
    gcloud alpha network-management network-monitoring-providers
        monitoring-points download-recreate-install-script - download an
        installation script for recreating a Monitoring Point

SYNOPSIS
    gcloud alpha network-management network-monitoring-providers
        monitoring-points download-recreate-install-script --location=LOCATION
        --monitoring-point=MONITORING_POINT
        --network-monitoring-provider=NETWORK_MONITORING_PROVIDER
        --output-file=OUTPUT_FILE [--hostname=HOSTNAME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-management network-monitoring-providers monitoring-points download-server-connect-config

```text
NAME
    gcloud alpha network-management network-monitoring-providers
        monitoring-points download-server-connect-config - download the server
        connect configuration for a Network Monitoring Provider

SYNOPSIS
    gcloud alpha network-management network-monitoring-providers
        monitoring-points download-server-connect-config --location=LOCATION
        --network-monitoring-provider=NETWORK_MONITORING_PROVIDER
        --output-file=OUTPUT_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-management network-monitoring-providers monitoring-points list

```text
NAME
    gcloud alpha network-management network-monitoring-providers
        monitoring-points list - list Monitoring Points

SYNOPSIS
    gcloud alpha network-management network-monitoring-providers
        monitoring-points list
        (--network-monitoring-provider=NETWORK_MONITORING_PROVIDER
          : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-management/network-monitoring-providers/monitoring-points (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
