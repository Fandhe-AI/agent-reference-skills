---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-management/vpc-flow-logs-configs
---

# gcloud network-management vpc-flow-logs-configs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-management vpc-flow-logs-configs create

```text
NAME
    gcloud network-management vpc-flow-logs-configs create - creates a new VPC
        Flow Logs configuration

SYNOPSIS
    gcloud network-management vpc-flow-logs-configs create
        (VPC_FLOW_LOGS_CONFIG
          : --location=LOCATION --organization=ORGANIZATION)
        [--aggregation-interval=AGGREGATION_INTERVAL] [--async]
        [--connection-logging=CONNECTION_LOGGING]
        [--cross-project-metadata=CROSS_PROJECT_METADATA]
        [--description=DESCRIPTION] [--filter-expr=FILTER_EXPR]
        [--flow-sampling=FLOW_SAMPLING] [--labels=[LABELS,...]]
        [--metadata=METADATA] [--metadata-fields=[METADATA_FIELDS,...]]
        [--state=STATE]
        [--interconnect-attachment=INTERCONNECT_ATTACHMENT | --network=NETWORK
          | --subnet=SUBNET | --vpn-tunnel=VPN_TUNNEL] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a new VPC Flow Logs configuration.

    Project-level configuration: Specify a target resource, either: --subnet,
    --network, --interconnect-attachment, or --vpn-tunnel

    Organization-level configuration: Specify the --organization flag without a
    target resource to apply the configuration across an entire organization.

    The --location=global flag is always required.

EXAMPLES
    To create a new VPC Flow Logs configuration my-config in organization
    my-org-number, run:

        $ gcloud network-management vpc-flow-logs-configs create my-config \
            --location=global --organization=<my-org-number>

    To create a new VPC Flow Logs configuration my-config in project my-project
    for a VLAN attachment for Cloud Interconnect, run:

        $ gcloud network-management vpc-flow-logs-configs create my-config \
            --location=global \
            --interconnect-attachment="projects/{project_id}/regions/{region\
        }/interconnectAttachments/{interconnect_attachment_id}"

    To create a new VPC Flow Logs configuration my-config in project my-project
    for a Cloud VPN tunnel, run:

        $ gcloud network-management vpc-flow-logs-configs create my-config \
            --location=global \
            --subnet="projects/{project_id}/regions/{region}/vpnTunnels/{vpn\
        _tunnel_id}"

    To create a new VPC Flow Logs configuration my-config in project my-project
    for a subnet, run:

        $ gcloud network-management vpc-flow-logs-configs create my-config \
            --location=global \
            --subnet="projects/{project_id}/regions/{region}/subnets/{subnet\
        _id}"

    To create a new VPC Flow Logs configuration my-config in project my-project
    for a VPC network, run:

        $ gcloud network-management vpc-flow-logs-configs create my-config \
            --location=global \
            --network="projects/{project_id}/global/networks/{network_id}"

POSITIONAL ARGUMENTS
     VpcFlowLogsConfig resource - Identifier. Unique name of the configuration.
     The name can have one of the following forms:

      * For project-level configurations:
        projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}

      * For organization-level configurations:
        organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}
        The arguments in this group can be used to specify the attributes of
        this resource. (NOTE) Some attributes are not given arguments in this
        group but can be set in other ways.

     To set the project attribute:
      * provide the argument vpc_flow_logs_config on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [networkmanagement.organizations.locations.vpcFlowLogsConfigs,
        networkmanagement.projects.locations.vpcFlowLogsConfigs].

     This must be specified.

       VPC_FLOW_LOGS_CONFIG
          ID of the vpcFlowLogsConfig or fully qualified identifier for the
          vpcFlowLogsConfig.

          To set the vpc_flow_logs_config attribute:
          + provide the argument vpc_flow_logs_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the vpcFlowLogsConfig resource.

          To set the location attribute:
          + provide the argument vpc_flow_logs_config on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the vpcFlowLogsConfig resource.

          To set the organization attribute:
          + provide the argument vpc_flow_logs_config on the command line
            with a fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networkmanagement.organizations.locations.vpcFlowLogsConfigs].

FLAGS
     Arguments for the aggregation interval.

     --aggregation-interval=AGGREGATION_INTERVAL
        The aggregation interval for the logs. Default value is INTERVAL_5_SEC.
        AGGREGATION_INTERVAL must be one of:

         interval-1-min
            Aggregate logs in 1m intervals.
         interval-10-min
            Aggregate logs in 10m intervals.
         interval-15-min
            Aggregate logs in 15m intervals.
         interval-30-sec
            Aggregate logs in 30s intervals.
         interval-5-min
            Aggregate logs in 5m intervals.
         interval-5-sec
            Aggregate logs in 5s intervals.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Arguments for connection logging.

     --connection-logging=CONNECTION_LOGGING
        Whether to enable connection logging. Default value is
        CONNECTION_LOGGING_DISABLED when unspecified. Not valid for VPN Tunnel
        or Interconnect Attachment targets. CONNECTION_LOGGING must be one of:

         connection-logging-disabled
            When CONNECTION_LOGGING_DISABLED, connection logging is disabled.
         connection-logging-enabled
            When CONNECTION_LOGGING_ENABLED, connection logs are generated for
            connection attempts.
         disabled
            When disabled, connection logging is disabled.
         enabled
            When enabled, connection logs are generated for connection
            attempts.

     Arguments for the cross project metadata.

     --cross-project-metadata=CROSS_PROJECT_METADATA
        Determines whether to include cross project annotations in the logs.
        This field is available only for organization configurations. If not
        specified in org configs will be set to CROSS_PROJECT_METADATA_ENABLED.
        CROSS_PROJECT_METADATA must be one of:

         cross-project-metadata-disabled
            When CROSS_PROJECT_METADATA_DISABLED, metadata from other projects
            will not be included in the logs.
         cross-project-metadata-enabled
            When CROSS_PROJECT_METADATA_ENABLED, metadata from other projects
            will be included in the logs.

     Arguments for the description.

     --description=DESCRIPTION
        The user-supplied description of the VPC Flow Logs configuration.
        Maximum of 512 characters.

     Arguments for the filter expr.

     --filter-expr=FILTER_EXPR
        Export filter used to define which VPC Flow Logs should be logged.

     Arguments for the flow sampling.

     --flow-sampling=FLOW_SAMPLING
        The value of the field must be in (0, 1]. The sampling rate of VPC Flow
        Logs where 1.0 means all collected logs are reported. Setting the
        sampling rate to 0.0 is not allowed. If you want to disable VPC Flow
        Logs, use the state field instead. Default value is 1.0.

     --labels=[LABELS,...]
        Resource labels to represent user-provided metadata.

         KEY
            Keys must start with a lowercase character and contain only hyphens
            (-), underscores (_), lowercase characters, and numbers.

         VALUE
            Values must contain only hyphens (-), underscores (_), lowercase
            characters, and numbers.

        Shorthand Example:

            --labels=string=string

        JSON Example:

            --labels='{"string": "string"}'

        File Example:

            --labels=path_to_file.(yaml|json)

     Arguments for the metadata.

     --metadata=METADATA
        Configures whether all, none or a subset of metadata fields should be
        added to the reported VPC flow logs. Default value is
        INCLUDE_ALL_METADATA. METADATA must be one of:

         custom-metadata
            Include only custom fields (specified in metadata_fields).
         exclude-all-metadata
            Exclude all metadata fields.
         include-all-metadata
            Include all metadata fields.

     --metadata-fields=[METADATA_FIELDS,...]
        Custom metadata fields to include in the reported VPC flow logs. Can
        only be specified if "metadata" was set to CUSTOM_METADATA.

     Arguments for the state.

     --state=STATE
        The state of the VPC Flow Log configuration. Default value is ENABLED.
        When creating a new configuration, it must be enabled. Setting
        state=DISABLED will pause the log generation for this config. STATE
        must be one of:

         disabled
            When DISABLED, this configuration will not generate logs.
         enabled
            When ENABLED, this configuration will generate logs.

     Arguments for the target resource.

     At most one of these can be specified:

       --interconnect-attachment=INTERCONNECT_ATTACHMENT
          Traffic will be logged from the Interconnect Attachment. Format:
          projects/{project_id}/regions/{region}/interconnectAttachments/{name}

       --network=NETWORK
          Traffic will be logged from VMs, VPN tunnels and Interconnect
          Attachments within the network. Format:
          projects/{project_id}/global/networks/{name}

       --subnet=SUBNET
          Traffic will be logged from VMs within the subnetwork. Format:
          projects/{project_id}/regions/{region}/subnetworks/{name}

       --vpn-tunnel=VPN_TUNNEL
          Traffic will be logged from the VPN Tunnel. Format:
          projects/{project_id}/regions/{region}/vpnTunnels/{name}

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

        $ gcloud beta network-management vpc-flow-logs-configs create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud network-management vpc-flow-logs-configs create my-config \
    --location=global \
    --organization=MY_ORG_NUMBER

gcloud network-management vpc-flow-logs-configs create my-config \
    --location=global \
    --interconnect-attachment="projects/{project_id}/regions/{region}/interconnectAttachments/{interconnect_attachment_id}"

gcloud network-management vpc-flow-logs-configs create my-config \
    --location=global \
    --vpn-tunnel="projects/{project_id}/regions/{region}/vpnTunnels/{vpn_tunnel_id}"

gcloud network-management vpc-flow-logs-configs create my-config \
    --location=global \
    --subnet="projects/{project_id}/regions/{region}/subnetworks/{subnet_id}"
```

### gcloud network-management vpc-flow-logs-configs delete

```text
NAME
    gcloud network-management vpc-flow-logs-configs delete - deletes the
        specified VPC Flow Logs configuration

SYNOPSIS
    gcloud network-management vpc-flow-logs-configs delete
        (VPC_FLOW_LOGS_CONFIG
          : --location=LOCATION --organization=ORGANIZATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes the specified VPC Flow Logs configuration.

EXAMPLES
    To delete a VPC Flow Logs configuration my-config within the organization
    my-org-number, run:

        $ gcloud network-management vpc-flow-logs-configs delete my-config \
            --location=global --organization=<my-org-number>

    To delete a VPC Flow Logs configuration my-config, run:

        $ gcloud network-management vpc-flow-logs-configs delete my-config \
            --location=global

POSITIONAL ARGUMENTS
     VpcFlowLogsConfig resource - The resource name of the VpcFlowLogsConfig,
     in one of the following formats:

      * For a project-level resource:
        projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}

      * For an organization-level resource:
        organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}
        The arguments in this group can be used to specify the attributes of
        this resource. (NOTE) Some attributes are not given arguments in this
        group but can be set in other ways.

     To set the project attribute:
      * provide the argument vpc_flow_logs_config on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [networkmanagement.organizations.locations.vpcFlowLogsConfigs,
        networkmanagement.projects.locations.vpcFlowLogsConfigs].

     This must be specified.

       VPC_FLOW_LOGS_CONFIG
          ID of the vpcFlowLogsConfig or fully qualified identifier for the
          vpcFlowLogsConfig.

          To set the vpc_flow_logs_config attribute:
          + provide the argument vpc_flow_logs_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the vpcFlowLogsConfig resource.

          To set the location attribute:
          + provide the argument vpc_flow_logs_config on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the vpcFlowLogsConfig resource.

          To set the organization attribute:
          + provide the argument vpc_flow_logs_config on the command line
            with a fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networkmanagement.organizations.locations.vpcFlowLogsConfigs].

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
    This command uses the networkmanagement/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta network-management vpc-flow-logs-configs delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-management vpc-flow-logs-configs delete my-config \
    --location=global \
    --organization=MY_ORG_NUMBER
```

### gcloud network-management vpc-flow-logs-configs describe

```text
NAME
    gcloud network-management vpc-flow-logs-configs describe - describe the
        details of a specific VPC Flow Logs configuration

SYNOPSIS
    gcloud network-management vpc-flow-logs-configs describe
        (VPC_FLOW_LOGS_CONFIG
          : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes the details of a specific VPC Flow Logs configuration.

EXAMPLES
    To get the details of a VPC Flow Logs configuration my-config, within the
    organization my-org-number, run:

        $ gcloud network-management vpc-flow-logs-configs describe \
            my-config --location=global --organization=<my-org-number>

    To get the details of a VPC Flow Logs configuration my-config, run:

        $ gcloud network-management vpc-flow-logs-configs describe \
            my-config --location=global

POSITIONAL ARGUMENTS
     VpcFlowLogsConfig resource - The resource name of the VpcFlowLogsConfig,
     in one of the following formats:

      * For project-level resources:
        projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}

      * For organization-level resources:
        organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}
        The arguments in this group can be used to specify the attributes of
        this resource. (NOTE) Some attributes are not given arguments in this
        group but can be set in other ways.

     To set the project attribute:
      * provide the argument vpc_flow_logs_config on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [networkmanagement.organizations.locations.vpcFlowLogsConfigs,
        networkmanagement.projects.locations.vpcFlowLogsConfigs].

     This must be specified.

       VPC_FLOW_LOGS_CONFIG
          ID of the vpcFlowLogsConfig or fully qualified identifier for the
          vpcFlowLogsConfig.

          To set the vpc_flow_logs_config attribute:
          + provide the argument vpc_flow_logs_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the vpcFlowLogsConfig resource.

          To set the location attribute:
          + provide the argument vpc_flow_logs_config on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the vpcFlowLogsConfig resource.

          To set the organization attribute:
          + provide the argument vpc_flow_logs_config on the command line
            with a fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networkmanagement.organizations.locations.vpcFlowLogsConfigs].

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

        $ gcloud beta network-management vpc-flow-logs-configs describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-management vpc-flow-logs-configs describe my-config \
    --location=global \
    --organization=MY_ORG_NUMBER
```

### gcloud network-management vpc-flow-logs-configs list

```text
NAME
    gcloud network-management vpc-flow-logs-configs list - list all VPC Flow
        Logs configurations

SYNOPSIS
    gcloud network-management vpc-flow-logs-configs list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    By default, lists all project-level VPC Flow Logs configurations. Use the
    --organization flag to list all organization-level configurations.

EXAMPLES
    To list all the VPC Flow Logs configurations within the project, run:

        $ gcloud network-management vpc-flow-logs-configs list \
            --location=global

    To list all the VPC Flow Logs configurations within the project with state
    'ENABLED', run:

        $ gcloud network-management vpc-flow-logs-configs list \
            --location=global --filter="state:ENABLED"

REQUIRED FLAGS
     Location resource - The parent resource of the VpcFlowLogsConfig, in one
     of the following formats:

      * For project-level resources: projects/{project_id}/locations/global

      * For organization-level resources:
        organizations/{organization_id}/locations/global The arguments in this
        group can be used to specify the attributes of this resource. (NOTE)
        Some attributes are not given arguments in this group but can be set in
        other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [networkmanagement.organizations.locations,
        networkmanagement.projects.locations].

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --organization=ORGANIZATION
          The organization id of the location resource.

          To set the organization attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networkmanagement.organizations.locations].

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

        $ gcloud beta network-management vpc-flow-logs-configs list
```

### gcloud network-management vpc-flow-logs-configs query-org-vpc-flow-logs-configs

```text
NAME
    gcloud network-management vpc-flow-logs-configs
        query-org-vpc-flow-logs-configs - fetch all organization-level VPC Flow
        Logs configurations associated with the project

SYNOPSIS
    gcloud network-management vpc-flow-logs-configs
        query-org-vpc-flow-logs-configs --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Fetch all organization-level VPC Flow Logs configurations that the project
    is associated with. This method allows you to retrieve which
    organization-level configurations are applied to the current project.

EXAMPLES
    To fetch all the organization-level VPC Flow Logs configurations associated
    with the project, run:

        $ gcloud network-management vpc-flow-logs-configs \
            query-org-vpc-flow-logs-configs --location=global

REQUIRED FLAGS
     Location resource - The parent resource of the VpcFlowLogsConfig,
     specified in the following format: projects/{project_id}/locations/global
     This represents a Cloud resource. (NOTE) Some attributes are not given
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

        $ gcloud beta network-management vpc-flow-logs-configs \
            query-org-vpc-flow-logs-configs
```

### gcloud network-management vpc-flow-logs-configs show-effective-flow-logs-configs

```text
NAME
    gcloud network-management vpc-flow-logs-configs
        show-effective-flow-logs-configs - show all effective VPC Flow Logs
        configurations for a resource

SYNOPSIS
    gcloud network-management vpc-flow-logs-configs
        show-effective-flow-logs-configs --location=LOCATION
        --resource=RESOURCE [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Shows all effective VPC Flow Logs configurations for a resource. The
    effective configurations include all configurations that apply to the
    resource, including inherited ones from parent resources.

EXAMPLES
    To show all effective VPC Flow Logs configurations for a network my-network
    in project my-project, run:

        $ gcloud network-management vpc-flow-logs-configs \
            show-effective-flow-logs-configs --location=global \
            --resource="projects/my-project/global/networks/my-network"

REQUIRED FLAGS
     Location resource - The parent resource of the VpcFlowLogsConfig,
     specified in the following format: projects/{project_id}/locations/global
     This represents a Cloud resource. (NOTE) Some attributes are not given
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

     --resource=RESOURCE
        The resource to get the effective VPC Flow Logs configuration for. The
        resource must belong to the same project as the parent. The resource
        must be a network, subnetwork, interconnect attachment, VPN tunnel, or
        a project.

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
    This command uses the networkmanagement/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta network-management vpc-flow-logs-configs \
            show-effective-flow-logs-configs
```

### gcloud network-management vpc-flow-logs-configs update

```text
NAME
    gcloud network-management vpc-flow-logs-configs update - updates one or
        more fields in an existing VPC Flow Logs configuration

SYNOPSIS
    gcloud network-management vpc-flow-logs-configs update
        (VPC_FLOW_LOGS_CONFIG
          : --location=LOCATION --organization=ORGANIZATION)
        [--aggregation-interval=AGGREGATION_INTERVAL] [--async]
        [--connection-logging=CONNECTION_LOGGING]
        [--cross-project-metadata=CROSS_PROJECT_METADATA]
        [--description=DESCRIPTION] [--filter-expr=FILTER_EXPR]
        [--flow-sampling=FLOW_SAMPLING] [--metadata=METADATA] [--state=STATE]
        [--interconnect-attachment=INTERCONNECT_ATTACHMENT | --network=NETWORK
          | --subnet=SUBNET | --vpn-tunnel=VPN_TUNNEL]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS]
        [--metadata-fields=[METADATA_FIELDS,...]
          | --add-metadata-fields=[ADD_METADATA_FIELDS,...]
          --clear-metadata-fields
          | --remove-metadata-fields=[REMOVE_METADATA_FIELDS,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates one or more fields in an existing VPC Flow Logs configuration.

EXAMPLES
    To update the state field to be 'DISABLED' in the VPC Flow Logs
    configuration my-config, run:

        $ gcloud network-management vpc-flow-logs-configs update my-config \
            --location=global --organization=<my-org-number> \
            --state=DISABLED

    To update the state field to be 'DISABLED' in the VPC Flow Logs
    configuration my-config, run:

        $ gcloud network-management vpc-flow-logs-configs update my-config \
            --location=global --state=DISABLED

POSITIONAL ARGUMENTS
     VpcFlowLogsConfig resource - Identifier. Unique name of the configuration.
     The name can have one of the following forms:

      * For project-level configurations:
        projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}

      * For organization-level configurations:
        organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}
        The arguments in this group can be used to specify the attributes of
        this resource. (NOTE) Some attributes are not given arguments in this
        group but can be set in other ways.

     To set the project attribute:
      * provide the argument vpc_flow_logs_config on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [networkmanagement.organizations.locations.vpcFlowLogsConfigs,
        networkmanagement.projects.locations.vpcFlowLogsConfigs].

     This must be specified.

       VPC_FLOW_LOGS_CONFIG
          ID of the vpcFlowLogsConfig or fully qualified identifier for the
          vpcFlowLogsConfig.

          To set the vpc_flow_logs_config attribute:
          + provide the argument vpc_flow_logs_config on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the vpcFlowLogsConfig resource.

          To set the location attribute:
          + provide the argument vpc_flow_logs_config on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the vpcFlowLogsConfig resource.

          To set the organization attribute:
          + provide the argument vpc_flow_logs_config on the command line
            with a fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networkmanagement.organizations.locations.vpcFlowLogsConfigs].

FLAGS
     Arguments for the aggregation interval.

     --aggregation-interval=AGGREGATION_INTERVAL
        The aggregation interval for the logs. Default value is INTERVAL_5_SEC.
        AGGREGATION_INTERVAL must be one of:

         interval-1-min
            Aggregate logs in 1m intervals.
         interval-10-min
            Aggregate logs in 10m intervals.
         interval-15-min
            Aggregate logs in 15m intervals.
         interval-30-sec
            Aggregate logs in 30s intervals.
         interval-5-min
            Aggregate logs in 5m intervals.
         interval-5-sec
            Aggregate logs in 5s intervals.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Arguments for connection logging.

     --connection-logging=CONNECTION_LOGGING
        Whether to enable connection logging. Default value is
        CONNECTION_LOGGING_DISABLED when unspecified. Not valid for VPN Tunnel
        or Interconnect Attachment targets. CONNECTION_LOGGING must be one of:

         connection-logging-disabled
            When CONNECTION_LOGGING_DISABLED, connection logging is disabled.
         connection-logging-enabled
            When CONNECTION_LOGGING_ENABLED, connection logs are generated for
            connection attempts.
         disabled
            When disabled, connection logging is disabled.
         enabled
            When enabled, connection logs are generated for connection
            attempts.

     Arguments for the cross project metadata.

     --cross-project-metadata=CROSS_PROJECT_METADATA
        Determines whether to include cross project annotations in the logs.
        This field is available only for organization configurations. If not
        specified in org configs will be set to CROSS_PROJECT_METADATA_ENABLED.
        CROSS_PROJECT_METADATA must be one of:

         cross-project-metadata-disabled
            When CROSS_PROJECT_METADATA_DISABLED, metadata from other projects
            will not be included in the logs.
         cross-project-metadata-enabled
            When CROSS_PROJECT_METADATA_ENABLED, metadata from other projects
            will be included in the logs.

     Arguments for the description.

     --description=DESCRIPTION
        The user-supplied description of the VPC Flow Logs configuration.
        Maximum of 512 characters.

     Arguments for the filter expr.

     --filter-expr=FILTER_EXPR
        Export filter used to define which VPC Flow Logs should be logged.

     Arguments for the flow sampling.

     --flow-sampling=FLOW_SAMPLING
        The value of the field must be in (0, 1]. The sampling rate of VPC Flow
        Logs where 1.0 means all collected logs are reported. Setting the
        sampling rate to 0.0 is not allowed. If you want to disable VPC Flow
        Logs, use the state field instead. Default value is 1.0.

     Arguments for the metadata.

     --metadata=METADATA
        Configures whether all, none or a subset of metadata fields should be
        added to the reported VPC flow logs. Default value is
        INCLUDE_ALL_METADATA. METADATA must be one of:

         custom-metadata
            Include only custom fields (specified in metadata_fields).
         exclude-all-metadata
            Exclude all metadata fields.
         include-all-metadata
            Include all metadata fields.

     Arguments for the state.

     --state=STATE
        The state of the VPC Flow Log configuration. Default value is ENABLED.
        When creating a new configuration, it must be enabled. Setting
        state=DISABLED will pause the log generation for this config. STATE
        must be one of:

         disabled
            When DISABLED, this configuration will not generate logs.
         enabled
            When ENABLED, this configuration will generate logs.

     Arguments for the target resource.

     At most one of these can be specified:

       --interconnect-attachment=INTERCONNECT_ATTACHMENT
          Traffic will be logged from the Interconnect Attachment. Format:
          projects/{project_id}/regions/{region}/interconnectAttachments/{name}

       --network=NETWORK
          Traffic will be logged from VMs, VPN tunnels and Interconnect
          Attachments within the network. Format:
          projects/{project_id}/global/networks/{name}

       --subnet=SUBNET
          Traffic will be logged from VMs within the subnetwork. Format:
          projects/{project_id}/regions/{region}/subnetworks/{name}

       --vpn-tunnel=VPN_TUNNEL
          Traffic will be logged from the VPN Tunnel. Format:
          projects/{project_id}/regions/{region}/vpnTunnels/{name}

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. Resource labels to represent user-provided
          metadata.

           KEY
              Keys must start with a lowercase character and contain only
              hyphens (-), underscores (_), lowercase characters, and numbers.

           VALUE
              Values must contain only hyphens (-), underscores (_), lowercase
              characters, and numbers.

          Shorthand Example:

              --labels=string=string

          JSON Example:

              --labels='{"string": "string"}'

          File Example:

              --labels=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --update-labels=[UPDATE_LABELS,...]
            Update labels value or add key value pair. Resource labels to
            represent user-provided metadata.

             KEY
                Keys must start with a lowercase character and contain only
                hyphens (-), underscores (_), lowercase characters, and
                numbers.

             VALUE
                Values must contain only hyphens (-), underscores (_),
                lowercase characters, and numbers.

            Shorthand Example:

                --update-labels=string=string

            JSON Example:

                --update-labels='{"string": "string"}'

            File Example:

                --update-labels=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-labels
              Clear labels value and set to empty map.

           --remove-labels=REMOVE_LABELS
              Remove existing value from map labels. Sets remove_labels value.

              Shorthand Example:

                  --remove-labels=string,string

              JSON Example:

                  --remove-labels=["string"]

              File Example:

                  --remove-labels=path_to_file.(yaml|json)

     Update metadata_fields.

     At most one of these can be specified:

       --metadata-fields=[METADATA_FIELDS,...]
          Set metadata_fields to new value.

       Or at least one of these can be specified:

         --add-metadata-fields=[ADD_METADATA_FIELDS,...]
            Add new value to metadata_fields list.

         At most one of these can be specified:

           --clear-metadata-fields
              Clear metadata_fields value and set to empty list.

           --remove-metadata-fields=[REMOVE_METADATA_FIELDS,...]
              Remove existing value from metadata_fields list.

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

        $ gcloud beta network-management vpc-flow-logs-configs update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-management vpc-flow-logs-configs update my-config \
    --location=global \
    --organization=MY_ORG_NUMBER \
    --state=DISABLED
```

### gcloud beta network-management vpc-flow-logs-configs create

```text
NAME
    gcloud beta network-management vpc-flow-logs-configs create - creates a new
        VPC Flow Logs configuration

SYNOPSIS
    gcloud beta network-management vpc-flow-logs-configs create
        (VPC_FLOW_LOGS_CONFIG
          : --location=LOCATION --organization=ORGANIZATION)
        [--aggregation-interval=AGGREGATION_INTERVAL] [--async]
        [--connection-logging=CONNECTION_LOGGING]
        [--cross-project-metadata=CROSS_PROJECT_METADATA]
        [--description=DESCRIPTION] [--filter-expr=FILTER_EXPR]
        [--flow-sampling=FLOW_SAMPLING] [--labels=[LABELS,...]]
        [--metadata=METADATA] [--metadata-fields=[METADATA_FIELDS,...]]
        [--state=STATE]
        [--interconnect-attachment=INTERCONNECT_ATTACHMENT | --network=NETWORK
          | --subnet=SUBNET | --vpn-tunnel=VPN_TUNNEL] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-management vpc-flow-logs-configs delete

```text
NAME
    gcloud beta network-management vpc-flow-logs-configs delete - deletes the
        specified VPC Flow Logs configuration

SYNOPSIS
    gcloud beta network-management vpc-flow-logs-configs delete
        (VPC_FLOW_LOGS_CONFIG
          : --location=LOCATION --organization=ORGANIZATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-management vpc-flow-logs-configs describe

```text
NAME
    gcloud beta network-management vpc-flow-logs-configs describe - describe
        the details of a specific VPC Flow Logs configuration

SYNOPSIS
    gcloud beta network-management vpc-flow-logs-configs describe
        (VPC_FLOW_LOGS_CONFIG
          : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-management vpc-flow-logs-configs list

```text
NAME
    gcloud beta network-management vpc-flow-logs-configs list - list all VPC
        Flow Logs configurations

SYNOPSIS
    gcloud beta network-management vpc-flow-logs-configs list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-management vpc-flow-logs-configs query-org-vpc-flow-logs-configs

```text
NAME
    gcloud beta network-management vpc-flow-logs-configs
        query-org-vpc-flow-logs-configs - fetch all organization-level VPC Flow
        Logs configurations associated with the project

SYNOPSIS
    gcloud beta network-management vpc-flow-logs-configs
        query-org-vpc-flow-logs-configs --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-management vpc-flow-logs-configs show-effective-flow-logs-configs

```text
NAME
    gcloud beta network-management vpc-flow-logs-configs
        show-effective-flow-logs-configs - show all effective VPC Flow Logs
        configurations for a resource

SYNOPSIS
    gcloud beta network-management vpc-flow-logs-configs
        show-effective-flow-logs-configs --location=LOCATION
        --resource=RESOURCE [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-management vpc-flow-logs-configs update

```text
NAME
    gcloud beta network-management vpc-flow-logs-configs update - updates one
        or more fields in an existing VPC Flow Logs configuration

SYNOPSIS
    gcloud beta network-management vpc-flow-logs-configs update
        (VPC_FLOW_LOGS_CONFIG
          : --location=LOCATION --organization=ORGANIZATION)
        [--aggregation-interval=AGGREGATION_INTERVAL] [--async]
        [--connection-logging=CONNECTION_LOGGING]
        [--cross-project-metadata=CROSS_PROJECT_METADATA]
        [--description=DESCRIPTION] [--filter-expr=FILTER_EXPR]
        [--flow-sampling=FLOW_SAMPLING] [--metadata=METADATA] [--state=STATE]
        [--interconnect-attachment=INTERCONNECT_ATTACHMENT | --network=NETWORK
          | --subnet=SUBNET | --vpn-tunnel=VPN_TUNNEL]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS]
        [--metadata-fields=[METADATA_FIELDS,...]
          | --add-metadata-fields=[ADD_METADATA_FIELDS,...]
          --clear-metadata-fields
          | --remove-metadata-fields=[REMOVE_METADATA_FIELDS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Corrected from the official docs (runnable form only; the help text above is verbatim): the Cloud VPN tunnel example passes the tunnel URI `projects/{project_id}/regions/{region}/vpnTunnels/{vpn_tunnel_id}` to `--subnet`, which the FLAGS describe as the subnetwork ("Traffic will be logged from VMs within the subnetwork"); the VPN tunnel flag is `--vpn-tunnel` ("Traffic will be logged from the VPN Tunnel. Format: projects/{project_id}/regions/{region}/vpnTunnels/{name}"), so the runnable form uses `--vpn-tunnel`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the subnet example writes `projects/{project_id}/regions/{region}/subnets/{subnet_id}`, but the `--subnet` description gives the format `projects/{project_id}/regions/{region}/subnetworks/{name}`, so the runnable form uses `subnetworks/`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-management/vpc-flow-logs-configs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
