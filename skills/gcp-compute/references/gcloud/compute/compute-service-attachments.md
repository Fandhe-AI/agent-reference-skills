---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/service-attachments
---

# gcloud compute service-attachments

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute service-attachments create

```text
NAME
    gcloud compute service-attachments create - create a Google Compute Engine
        service attachment

SYNOPSIS
    gcloud compute service-attachments create NAME
        --nat-subnets=NAT_SUBNETS,[NAT_SUBNETS,...]
        (--producer-forwarding-rule=PRODUCER_FORWARDING_RULE
          | --target-service=TARGET_SERVICE)
        [--connection-preference=CONNECTION_PREFERENCE;
          default="ACCEPT_AUTOMATIC"]
        [--consumer-accept-list=[PROJECT_OR_NETWORK=LIMIT,...]]
        [--consumer-reject-list=[REJECT_LIST,...]] [--description=DESCRIPTION]
        [--domain-names=[DOMAIN_NAMES,...]] [--enable-proxy-protocol]
        [--nat-ips-per-endpoint=NAT_IPS_PER_ENDPOINT]
        [--nat-subnets-region=NAT_SUBNETS_REGION]
        [--propagated-connection-limit=PROPAGATED_CONNECTION_LIMIT]
        [--reconcile-connections] [--region=REGION]
        [--global-producer-forwarding-rule
          | --producer-forwarding-rule-region=PRODUCER_FORWARDING_RULE_REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute service-attachments create is used to create service
    attachments. A service producer creates service attachments to make a
    service available to consumers. Service consumers use Private Service
    Connect endpoints to privately forward traffic to the service attachment.

EXAMPLES
    If there is an already-created internal load balancer (ILB) with the name
    MY_ILB in region us-central1 and there is an already-created Private
    Service Connect subnets MY_SUBNET1 and MY_SUBNET2, create a service
    attachment pointing to the ILB by running:

        $ gcloud compute service-attachments create \
            SERVICE_ATTACHMENT_NAME --region=us-central1 \
            --producer-forwarding-rule=MY_ILB \
            --connection-preference=ACCEPT_AUTOMATIC \
            --nat-subnets=MY_SUBNET1,MY_SUBNET2

    To create a service attachment with a textual description, run:

        $ gcloud compute service-attachments create \
            SERVICE_ATTACHMENT_NAME --region=us-central1 \
            --producer-forwarding-rule=MY_ILB \
            --connection-preference=ACCEPT_AUTOMATIC \
            --nat-subnets=MY_SUBNET1,MY_SUBNET2 \
            --description='default service attachment'

POSITIONAL ARGUMENTS
     NAME
        Name of the service attachment to create.

REQUIRED FLAGS
     --nat-subnets=NAT_SUBNETS,[NAT_SUBNETS,...]
        The subnetworks provided by service producer to use for NAT

     Exactly one of these must be specified:

       --producer-forwarding-rule=PRODUCER_FORWARDING_RULE
          Target forwarding rule that receives forwarded traffic.

       --target-service=TARGET_SERVICE
          URL of the target service that receives forwarded traffic.

OPTIONAL FLAGS
     --connection-preference=CONNECTION_PREFERENCE; default="ACCEPT_AUTOMATIC"
        This defines the service attachment's connection preference.
        CONNECTION_PREFERENCE must be one of:

         ACCEPT_AUTOMATIC
            Always accept connection requests from consumers automatically.
         ACCEPT_MANUAL
            Only accept connection requests from consumers with the approval of
            the service provider.

     --consumer-accept-list=[PROJECT_OR_NETWORK=LIMIT,...]
        Specifies which consumer projects or networks are allowed to connect to
        the service attachment. Each project or network has a connection limit.
        A given service attachment can manage connections at either the project
        or network level. Therefore, both the accept and reject lists for a
        given service attachment must contain either only projects or only
        networks.

        For example, --consumer-accept-list myProjectId1=20 accepts a consumer
        project myProjectId1 with connection limit 20; --consumer-accept-list
        projects/myProjectId1/global/networks/myNet1=20 accepts a consumer
        network myNet1 with connection limit 20

        * PROJECT_OR_NETWORK - Consumer project ID, project number or network
          URL.
        * CONNECTION_LIMIT - The maximum number of allowed connections.

     --consumer-reject-list=[REJECT_LIST,...]
        Specifies a comma-separated list of projects/networks/endpoints that
        are not allowed to connect to this service attachment. The project can
        be specified using its project ID or project number and the network or
        endpoint can be specified using its URL. For a given service
        attachment, consumer accept and reject lists must contain entries of
        the same type: all projects, all networks, or all endpoints.

     --description=DESCRIPTION
        An optional, textual description for the service attachment.

     --domain-names=[DOMAIN_NAMES,...]
        Specifies a comma separated list of DNS domain names that are used
        during DNS integration on PSC connected endpoints.

     --enable-proxy-protocol
        If True, then enable the proxy protocol which is for supplying client
        TCP/IP address data in TCP connections that traverse proxies on their
        way to destination servers.

     --nat-ips-per-endpoint=NAT_IPS_PER_ENDPOINT
        The number of NAT IP addresses to be allocated per connected endpoint.

     --nat-subnets-region=NAT_SUBNETS_REGION
        Region of the subnetworks to operate on. If not specified, it will be
        set to the region of the service attachment. Overrides the default
        compute/region property value for this command invocation.

     --propagated-connection-limit=PROPAGATED_CONNECTION_LIMIT
        The number of consumer spokes that connected Private Service Connect
        endpoints can be propagated to through Network Connectivity Center.
        This limit lets the service producer limit how many propagated Private
        Service Connect connections can be established to this service
        attachment from a single consumer.

        If the connection preference of the service attachment is
        ACCEPT_MANUAL, the limit applies to each project or network that is
        listed in the consumer accept list. If the connection preference of the
        service attachment is ACCEPT_AUTOMATIC, the limit applies to each
        project that contains a connected endpoint.

        If unspecified, the default propagated connection limit is 250.

     --reconcile-connections
        Determines whether to apply changes to consumer accept or reject lists
        to existing connections or only to new connections.

        If false, existing endpoints with a connection status of ACCEPTED or
        REJECTED are not updated.

        If true, existing endpoints with a connection status of ACCEPTED or
        REJECTED are updated based on the connection policy update. For
        example, if a project or network is removed from the
        --consumer-accept-list and added to --consumer-reject-list, all the
        endpoints in that project or network with the ACCEPTED state are set to
        REJECTED.

     --region=REGION
        Region of the service attachment to create. If not specified, you might
        be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

     At most one of these can be specified:

       --global-producer-forwarding-rule
          If set, the forwarding rule is global.

       --producer-forwarding-rule-region=PRODUCER_FORWARDING_RULE_REGION
          Region of the forwarding rule to operate on. If not specified, you
          might be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute service-attachments create

        $ gcloud beta compute service-attachments create
```

### gcloud compute service-attachments delete

```text
NAME
    gcloud compute service-attachments delete - delete one or more Google
        Compute Engine service attachments

SYNOPSIS
    gcloud compute service-attachments delete NAME [NAME ...] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete one or more Google Compute Engine service attachments.

EXAMPLES
    To delete a service attachment, run:

        $ gcloud compute service-attachments delete \
          SERVICE_ATTACHMENT_NAME --region=us-central1

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the service attachments to delete.

FLAGS
     --region=REGION
        Region of the service attachments to delete. If not specified, you
        might be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute service-attachments delete

        $ gcloud beta compute service-attachments delete
```

### gcloud compute service-attachments describe

```text
NAME
    gcloud compute service-attachments describe - display details about a
        Google Compute Engine service attachment

SYNOPSIS
    gcloud compute service-attachments describe NAME [--region=REGION]
        [--show-nat-ips] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display details about a Google Compute Engine service attachment.

EXAMPLES
    To describe a service attachment, run:

        $ gcloud compute service-attachments describe \
          SERVICE_ATTACHMENT_NAME --region=us-central1

POSITIONAL ARGUMENTS
     NAME
        Name of the service attachment to describe.

FLAGS
     --region=REGION
        Region of the service attachment to describe. If not specified, you
        might be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

     --show-nat-ips
        Determines whether to include the NAT IPs of connected endpoints in the
        service attachment output. If enabled (--show-nat-ips), the output will
        include the list of NAT IPs for each connected PSC endpoint and any
        endpoints propagated from them.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute service-attachments describe

        $ gcloud beta compute service-attachments describe
```

### gcloud compute service-attachments list

```text
NAME
    gcloud compute service-attachments list - list Google Compute Engine
        service attachments

SYNOPSIS
    gcloud compute service-attachments list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute service-attachments list displays all Google Compute Engine
    service attachments in a project.

    By default, service attachments from all regions are listed. The results
    can be narrowed down using a filter: --filter="region:( REGION ... )".

EXAMPLES
    To list all service attachments in a project in table form, run:

        $ gcloud compute service-attachments list

    To list the URIs of all service attachments in a project, run:

        $ gcloud compute service-attachments list --uri

    To list all service attachments in the us-central1 and europe-west1
    regions, run:

        $ gcloud compute service-attachments list \
            --filter="region:( us-central1 europe-west1 )"

POSITIONAL ARGUMENTS
     [NAME ...]
        (DEPRECATED) If provided, show details for the specified names and/or
        URIs of resources.

        Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )"
        instead.

FLAGS
     --regexp=REGEXP, -r REGEXP
        (DEPRECATED) Regular expression to filter the names of the results on.
        Any names that do not match the entire regular expression will be
        filtered out.

        Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.

     --regions=REGION,[REGION,...]
        If provided, only resources from the given regions are queried.

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

NOTES
    These variants are also available:

        $ gcloud alpha compute service-attachments list

        $ gcloud beta compute service-attachments list
```

### gcloud compute service-attachments set-iam-policy

```text
NAME
    gcloud compute service-attachments set-iam-policy - set the IAM policy for
        a Compute Engine service attachment

SYNOPSIS
    gcloud compute service-attachments set-iam-policy
        (SERVICE_ATTACHMENT : --region=REGION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given service attachment as defined in a JSON
    or YAML file.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    'policy.json' and set it for the service attachment my-service-attachment:

        $ gcloud compute service-attachments set-iam-policy \
            my-service-attachment --region=REGION policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Service attachment resource - The service attachment to set the IAM policy
     for. The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument service_attachment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE_ATTACHMENT
          ID of the service attachment or fully qualified identifier for the
          service attachment.

          To set the service_attachment attribute:
          + provide the argument service_attachment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument service_attachment on the command line with
            a fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute service-attachments set-iam-policy

        $ gcloud beta compute service-attachments set-iam-policy
```

### gcloud compute service-attachments update

```text
NAME
    gcloud compute service-attachments update - update a Google Compute Engine
        service attachment

SYNOPSIS
    gcloud compute service-attachments update NAME
        [--connection-preference=CONNECTION_PREFERENCE]
        [--consumer-accept-list=[PROJECT_OR_NETWORK_OR_ENDPOINT=LIMIT,...]]
        [--consumer-reject-list=[REJECT_LIST,...]] [--description=DESCRIPTION]
        [--[no-]enable-proxy-protocol]
        [--nat-ips-per-endpoint=NAT_IPS_PER_ENDPOINT]
        [--nat-subnets=NAT_SUBNETS,[NAT_SUBNETS,...]]
        [--nat-subnets-region=NAT_SUBNETS_REGION]
        [--propagated-connection-limit=PROPAGATED_CONNECTION_LIMIT]
        [--[no-]reconcile-connections] [--region=REGION]
        [--remove-obsolete-endpoint-accept-reject-entries]
        [--target-service=TARGET_SERVICE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute service-attachments update is used to update service
    attachments. A service producer creates service attachments to make a
    service available to consumers. Service consumers use Private Service
    Connect endpoints to privately forward traffic to the service attachment.

EXAMPLES
    To update the connection policy of a service attachment to be
    ACCEPT_MANUAL, run:

        $ gcloud compute service-attachments update \
            SERVICE_ATTACHMENT_NAME --region=us-central1 \
            --connection-preference=ACCEPT_MANUAL

    To update all supported fields of a service attachment, run:

        $ gcloud compute service-attachments update \
            SERVICE_ATTACHMENT_NAME --region=us-central1 \
            --connection-preference=ACCEPT_AUTOMATIC \
            --nat-subnets=MY_SUBNET1,MY_SUBNET2 --enable-proxy-protocol \
            --consumer-reject-list=PROJECT_ID1,PROJECT_ID2 \
            --consumer-accept-list=PROJECT_ID3=10,PROJECT_ID4=20

POSITIONAL ARGUMENTS
     NAME
        Name of the service attachment to update.

FLAGS
     --connection-preference=CONNECTION_PREFERENCE
        This defines the service attachment's connection preference.
        CONNECTION_PREFERENCE must be one of:

         ACCEPT_AUTOMATIC
            Always accept connection requests from consumers automatically.
         ACCEPT_MANUAL
            Only accept connection requests from consumers with the approval of
            the service provider.

     --consumer-accept-list=[PROJECT_OR_NETWORK_OR_ENDPOINT=LIMIT,...]
        Specifies which consumer projects/networks/endpoints are allowed to
        connect to the service attachment. A connection limit is required for
        each accepted project/network (optional for endpoints). For a given
        service attachment, consumer accept and reject lists must contain
        entries of the same type: all projects, all networks or all endpoints.

        For example:
        * --consumer-accept-list myProjectId1=20 - Accepts a consumer project
          myProjectId1 with connection limit 20.
        * --consumer-accept-list
          projects/myProjectId1/global/networks/myNet1=20 - Accepts a consumer
          network myNet1 with connection limit 20.
        * --consumer-accept-list
          projects/myProjectId1/regions/myRegion1/forwardingRules/8167352512 -
          Accepts a consumer endpoint with ID 8167352512.

        * PROJECT_OR_NETWORK_OR_ENDPOINT - Consumer project ID/number or
          network URL or endpoint URL.
        * CONNECTION_LIMIT - The maximum number of allowed connections. This
          field is optional for endpoints.

     --consumer-reject-list=[REJECT_LIST,...]
        Specifies a comma-separated list of projects/networks/endpoints that
        are not allowed to connect to this service attachment. The project can
        be specified using its project ID or project number and the network or
        endpoint can be specified using its URL. For a given service
        attachment, consumer accept and reject lists must contain entries of
        the same type: all projects, all networks, or all endpoints.

     --description=DESCRIPTION
        An optional, textual description for the service attachment.

     --[no-]enable-proxy-protocol
        If True, then enable the proxy protocol which is for supplying client
        TCP/IP address data in TCP connections that traverse proxies on their
        way to destination servers. Use --enable-proxy-protocol to enable and
        --no-enable-proxy-protocol to disable.

     --nat-ips-per-endpoint=NAT_IPS_PER_ENDPOINT
        The number of NAT IP addresses to be allocated per connected endpoint.

     --nat-subnets=NAT_SUBNETS,[NAT_SUBNETS,...]
        The subnetworks provided by service producer to use for NAT

     --nat-subnets-region=NAT_SUBNETS_REGION
        Region of the subnetworks to operate on. If not specified, it will be
        set to the region of the service attachment. Overrides the default
        compute/region property value for this command invocation.

     --propagated-connection-limit=PROPAGATED_CONNECTION_LIMIT
        The number of consumer spokes that connected Private Service Connect
        endpoints can be propagated to through Network Connectivity Center.
        This limit lets the service producer limit how many propagated Private
        Service Connect connections can be established to this service
        attachment from a single consumer.

        If the connection preference of the service attachment is
        ACCEPT_MANUAL, the limit applies to each project or network that is
        listed in the consumer accept list. If the connection preference of the
        service attachment is ACCEPT_AUTOMATIC, the limit applies to each
        project that contains a connected endpoint.

        If unspecified, the default propagated connection limit is 250.

     --[no-]reconcile-connections
        Determines whether to apply changes to consumer accept or reject lists
        to existing connections or only to new connections.

        If false, existing endpoints with a connection status of ACCEPTED or
        REJECTED are not updated.

        If true, existing endpoints with a connection status of ACCEPTED or
        REJECTED are updated based on the connection policy update. For
        example, if a project or network is removed from the
        --consumer-accept-list and added to --consumer-reject-list, all the
        endpoints in that project or network with the ACCEPTED state are set to
        REJECTED.

        Use --reconcile-connections to enable and --no-reconcile-connections to
        disable.

     --region=REGION
        Region of the service attachment to update. If not specified, you might
        be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

     --remove-obsolete-endpoint-accept-reject-entries
        If set to true, this flag cleans up the service attachment's consumer
        accept and reject lists by removing entries for Private Service Connect
        endpoints that are no longer connected.

        The cleanup process compares the resource ID of each endpoint in the
        lists against the currently connected endpoints. In rare cases, an
        obsolete entry will be left untouched if its resource ID collides with
        another connected endpoint from a different project.

        This flag only affects endpoint-based accept/reject entries,
        project-based and network-based entries are left unchanged.

     --target-service=TARGET_SERVICE
        URL of the target service that receives forwarded traffic.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute service-attachments update

        $ gcloud beta compute service-attachments update
```

### gcloud beta compute service-attachments create

```text
NAME
    gcloud beta compute service-attachments create - create a Google Compute
        Engine service attachment

SYNOPSIS
    gcloud beta compute service-attachments create NAME
        --nat-subnets=NAT_SUBNETS,[NAT_SUBNETS,...]
        (--producer-forwarding-rule=PRODUCER_FORWARDING_RULE
          | --target-service=TARGET_SERVICE)
        [--connection-preference=CONNECTION_PREFERENCE;
          default="ACCEPT_AUTOMATIC"]
        [--consumer-accept-list=[PROJECT_OR_NETWORK=LIMIT,...]]
        [--consumer-reject-list=[REJECT_LIST,...]] [--description=DESCRIPTION]
        [--domain-names=[DOMAIN_NAMES,...]] [--enable-proxy-protocol]
        [--nat-ips-per-endpoint=NAT_IPS_PER_ENDPOINT]
        [--nat-subnets-region=NAT_SUBNETS_REGION]
        [--propagated-connection-limit=PROPAGATED_CONNECTION_LIMIT]
        [--reconcile-connections] [--region=REGION]
        [--routing-mode=ROUTING_MODE]
        [--global-producer-forwarding-rule
          | --producer-forwarding-rule-region=PRODUCER_FORWARDING_RULE_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute service-attachments delete

```text
NAME
    gcloud beta compute service-attachments delete - delete one or more Google
        Compute Engine service attachments

SYNOPSIS
    gcloud beta compute service-attachments delete NAME [NAME ...]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute service-attachments describe

```text
NAME
    gcloud beta compute service-attachments describe - display details about a
        Google Compute Engine service attachment

SYNOPSIS
    gcloud beta compute service-attachments describe NAME [--region=REGION]
        [--show-nat-ips] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute service-attachments list

```text
NAME
    gcloud beta compute service-attachments list - list Google Compute Engine
        service attachments

SYNOPSIS
    gcloud beta compute service-attachments list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute service-attachments set-iam-policy

```text
NAME
    gcloud beta compute service-attachments set-iam-policy - set the IAM policy
        for a Compute Engine service attachment

SYNOPSIS
    gcloud beta compute service-attachments set-iam-policy
        (SERVICE_ATTACHMENT : --region=REGION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute service-attachments test-iam-permissions

```text
NAME
    gcloud beta compute service-attachments test-iam-permissions - test IAM
        permissions for a Compute Engine service attachment

SYNOPSIS
    gcloud beta compute service-attachments test-iam-permissions
        (SERVICE_ATTACHMENT : --region=REGION) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute service-attachments update

```text
NAME
    gcloud beta compute service-attachments update - update a Google Compute
        Engine service attachment

SYNOPSIS
    gcloud beta compute service-attachments update NAME
        [--connection-preference=CONNECTION_PREFERENCE]
        [--consumer-accept-list=[PROJECT_OR_NETWORK_OR_ENDPOINT=LIMIT,...]]
        [--consumer-reject-list=[REJECT_LIST,...]] [--description=DESCRIPTION]
        [--[no-]enable-proxy-protocol]
        [--nat-ips-per-endpoint=NAT_IPS_PER_ENDPOINT]
        [--nat-subnets=NAT_SUBNETS,[NAT_SUBNETS,...]]
        [--nat-subnets-region=NAT_SUBNETS_REGION]
        [--propagated-connection-limit=PROPAGATED_CONNECTION_LIMIT]
        [--[no-]reconcile-connections] [--region=REGION]
        [--remove-obsolete-endpoint-accept-reject-entries]
        [--routing-mode=ROUTING_MODE] [--target-service=TARGET_SERVICE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute service-attachments create

```text
NAME
    gcloud alpha compute service-attachments create - create a Google Compute
        Engine service attachment

SYNOPSIS
    gcloud alpha compute service-attachments create NAME
        --nat-subnets=NAT_SUBNETS,[NAT_SUBNETS,...]
        (--producer-forwarding-rule=PRODUCER_FORWARDING_RULE
          | --target-service=TARGET_SERVICE)
        [--connection-preference=CONNECTION_PREFERENCE;
          default="ACCEPT_AUTOMATIC"]
        [--consumer-accept-list=[PROJECT_OR_NETWORK=LIMIT,...]]
        [--consumer-reject-list=[REJECT_LIST,...]] [--description=DESCRIPTION]
        [--domain-names=[DOMAIN_NAMES,...]] [--enable-proxy-protocol]
        [--nat-ips-per-endpoint=NAT_IPS_PER_ENDPOINT]
        [--nat-subnets-region=NAT_SUBNETS_REGION]
        [--propagated-connection-limit=PROPAGATED_CONNECTION_LIMIT]
        [--reconcile-connections] [--region=REGION]
        [--routing-mode=ROUTING_MODE]
        [--global-producer-forwarding-rule
          | --producer-forwarding-rule-region=PRODUCER_FORWARDING_RULE_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute service-attachments delete

```text
NAME
    gcloud alpha compute service-attachments delete - delete one or more Google
        Compute Engine service attachments

SYNOPSIS
    gcloud alpha compute service-attachments delete NAME [NAME ...]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute service-attachments describe

```text
NAME
    gcloud alpha compute service-attachments describe - display details about a
        Google Compute Engine service attachment

SYNOPSIS
    gcloud alpha compute service-attachments describe NAME [--region=REGION]
        [--show-nat-ips] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute service-attachments list

```text
NAME
    gcloud alpha compute service-attachments list - list Google Compute Engine
        service attachments

SYNOPSIS
    gcloud alpha compute service-attachments list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute service-attachments set-iam-policy

```text
NAME
    gcloud alpha compute service-attachments set-iam-policy - set the IAM
        policy for a Compute Engine service attachment

SYNOPSIS
    gcloud alpha compute service-attachments set-iam-policy
        (SERVICE_ATTACHMENT : --region=REGION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute service-attachments test-iam-permissions

```text
NAME
    gcloud alpha compute service-attachments test-iam-permissions - test IAM
        permissions for a Compute Engine service attachment

SYNOPSIS
    gcloud alpha compute service-attachments test-iam-permissions
        (SERVICE_ATTACHMENT : --region=REGION) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute service-attachments update

```text
NAME
    gcloud alpha compute service-attachments update - update a Google Compute
        Engine service attachment

SYNOPSIS
    gcloud alpha compute service-attachments update NAME
        [--connection-preference=CONNECTION_PREFERENCE]
        [--consumer-accept-list=[PROJECT_OR_NETWORK_OR_ENDPOINT=LIMIT,...]]
        [--consumer-reject-list=[REJECT_LIST,...]] [--description=DESCRIPTION]
        [--[no-]enable-proxy-protocol]
        [--nat-ips-per-endpoint=NAT_IPS_PER_ENDPOINT]
        [--nat-subnets=NAT_SUBNETS,[NAT_SUBNETS,...]]
        [--nat-subnets-region=NAT_SUBNETS_REGION]
        [--propagated-connection-limit=PROPAGATED_CONNECTION_LIMIT]
        [--[no-]reconcile-connections] [--region=REGION]
        [--remove-obsolete-endpoint-accept-reject-entries]
        [--routing-mode=ROUTING_MODE] [--target-service=TARGET_SERVICE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute service-attachments list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute service-attachments list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/service-attachments (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
