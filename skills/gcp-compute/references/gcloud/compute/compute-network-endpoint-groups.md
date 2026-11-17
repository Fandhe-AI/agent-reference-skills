---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-endpoint-groups
---

# gcloud compute network-endpoint-groups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute network-endpoint-groups create

```text
NAME
    gcloud compute network-endpoint-groups create - create a Compute Engine
        network endpoint group

SYNOPSIS
    gcloud compute network-endpoint-groups create NAME
        [--default-port=DEFAULT_PORT] [--network=NETWORK]
        [--network-endpoint-type=NETWORK_ENDPOINT_TYPE;
          default="gce-vm-ip-port"] [--producer-port=PRODUCER_PORT]
        [--psc-target-service=PSC_TARGET_SERVICE] [--subnet=SUBNET]
        [--cloud-function-name=CLOUD_FUNCTION_NAME
          --cloud-function-url-mask=CLOUD_FUNCTION_URL_MASK
          | --cloud-run-service=CLOUD_RUN_SERVICE
          --cloud-run-tag=CLOUD_RUN_TAG --cloud-run-url-mask=CLOUD_RUN_URL_MASK
          | --[no-]app-engine-app --app-engine-service=APP_ENGINE_SERVICE
          --app-engine-url-mask=APP_ENGINE_URL_MASK
          --app-engine-version=APP_ENGINE_VERSION]
        [--global | --region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Compute Engine network endpoint group.

EXAMPLES
    To create a network endpoint group:

        $ gcloud compute network-endpoint-groups create my-neg \
            --zone=us-central1-a --network=my-network --subnet=my-subnetwork

POSITIONAL ARGUMENTS
     NAME
        Name of the network endpoint group to operate on.

FLAGS
     --default-port=DEFAULT_PORT
        The default port to use if the port number is not specified in the
        network endpoint.

        If this flag isn't specified for a NEG with endpoint type
        gce-vm-ip-port, gce-vm-ip-portmap or non-gcp-private-ip-port, then
        every network endpoint in the network endpoint group must have a port
        specified. For a global NEG with endpoint type internet-ip-port and
        internet-fqdn-port if the default port is not specified, the well-known
        port for your backend protocol is used (80 for HTTP, 443 for HTTPS).

        This flag is not supported for NEGs with endpoint type serverless.

        This flag is not supported for NEGs with endpoint type
        private-service-connect.

     --network=NETWORK
        Name of the network in which the NEG is created. For
        networkEndpointType GCE_VM_IP_PORT, GCE_VM_IP_PORTMAP or
        NON_GCP_PRIVATE_IP_PORT, if this field is not specified, a default
        network will be used. This field cannot be set for NEGs with
        networkEndpointType set to SERVERLESS or PRIVATE_SERVICE_CONNECT and
        for global NEGs.

            For all other network endpoint types, this field is required.

        This is only supported for NEGs with endpoint type gce-vm-ip-port,
        non-gcp-private-ip-port, gce-vm-ip, private-service-connect,
        internet-ip-port, internet-fqdn-port, or gce-vm-ip-portmap.

        For Private Service Connect NEGs, you can optionally specify --network
        and --subnet if --psc-target-service points to a published service. If
        --psc-target-service points to the regional service endpoint of a
        Google API, do not specify --network or --subnet.

     --network-endpoint-type=NETWORK_ENDPOINT_TYPE; default="gce-vm-ip-port"
        Determines the spec of endpoints attached to this group.

         gce-vm-ip-port
            Endpoint IP address must belong to a VM in Compute Engine (either
            the primary IP or as part of an aliased IP range). The
            --default-port must be specified or every network endpoint in the
            network endpoint group must have a port specified.

         internet-ip-port
            Endpoint IP address must be a publicly routable address. If
            specified, the default port is used. If unspecified, the well-known
            port for your backend protocol is used as the default port (80 for
            HTTP, 443 for HTTPS).

         internet-fqdn-port
            Endpoint FQDN must be resolvable to a public IP address via public
            DNS. The default port is used, if specified. If the default port is
            not specified, the well-known port for your backend protocol is
            used as the default port (80 for HTTP, 443 for HTTPS).

            After creating a NEG of this type, you can use the gcloud compute
            network-endpoint-groups update command with the --add-endpoint
            flag. Example: --add-endpoint="fqdn=backend.example.com,port=443"

         non-gcp-private-ip-port
            Endpoint IP address must belong to a VM not in Compute Engine and
            must be routable using a Cloud Router over VPN or an Interconnect
            connection. In this case, the NEG must be zonal. The --default-port
            must be specified or every network endpoint in the network endpoint
            group must have a port specified.

         serverless
            The network endpoint is handled by specified serverless
            infrastructure, such as Cloud Run, App Engine, or Cloud Function.
            Default port, network, and subnet are not effective for serverless
            endpoints.

         private-service-connect
            The network endpoint corresponds to a service outside the VPC,
            accessed via Private Service Connect.

         gce-vm-ip
            Endpoint must be the IP address of a VM's network interface in
            Compute Engine. Instance reference is required. The IP address is
            optional. If unspecified, the primary NIC address is used. A port
            must not be specified.

         gce-vm-ip-portmap
            Endpoint IP address must be a primary IP of a VM's network
            interface in Compute Engine. The --default-port must be specified
            or every network endpoint in the network endpoint group must have a
            port specified.

            NETWORK_ENDPOINT_TYPE must be one of: gce-vm-ip-port,
            internet-ip-port, internet-fqdn-port, non-gcp-private-ip-port,
            serverless, gce-vm-ip, private-service-connect, gce-vm-ip-portmap.

     --producer-port=PRODUCER_PORT
        The producer port to use when a consumer PSC NEG connects to a
        producer's internal network load balancer. If this flag isn't specified
        for a NEG with endpoint type private-service-connect, the PSC NEG will
        connect to port 443 or the first available port in the PSC producer
        port range, or to port 1 if the PSC producer's forwarding rule ports
        flag is set to all-ports.

        This flag is not supported for NEGs with endpoint type other than
        private-service-connect.

     --psc-target-service=PSC_TARGET_SERVICE
        PSC target service name to add to the private service connect network
        endpoint groups (NEG).

     --subnet=SUBNET
        Name of the subnet to which all network endpoints belong.

        If not specified, network endpoints may belong to any subnetwork in the
        region where the network endpoint group is created.

        This is only supported for NEGs with endpoint type gce-vm-ip-port,
        gce-vm-ip, private-service-connect, or gce-vm-ip-portmap. For Private
        Service Connect NEGs, you can optionally specify --network and --subnet
        if --psc-target-service points to a published service. If
        --psc-target-service points to the regional service endpoint of a
        Google API, do not specify --network or --subnet.

     The serverless routing configurations are only valid when endpoint type of
     the network endpoint group is serverless.

     At most one of these can be specified:

       Configuration for a Cloud Function network endpoint group. Cloud
       Function name must be provided explicitly or in the URL mask.

       --cloud-function-name=CLOUD_FUNCTION_NAME
          Cloud Function name to add to the Serverless NEG. The function must
          be in the same project and the same region as the Serverless network
          endpoint groups (NEG).

       --cloud-function-url-mask=CLOUD_FUNCTION_URL_MASK
          A template to parse function field from a request URL. URL mask
          allows for routing to multiple Cloud Functions without having to
          create multiple network endpoint groups and backend services.

       Configuration for a Cloud Run network endpoint group. Cloud Run service
       must be provided explicitly or in the URL mask. Cloud Run tag is
       optional, and may be provided explicitly or in the URL mask.

       --cloud-run-service=CLOUD_RUN_SERVICE
          Cloud Run service name to add to the Serverless network endpoint
          groups (NEG). The service must be in the same project and the same
          region as the Serverless NEG.

       --cloud-run-tag=CLOUD_RUN_TAG
          Cloud Run tag represents the "named revision" to provide additional
          fine-grained traffic routing configuration.

       --cloud-run-url-mask=CLOUD_RUN_URL_MASK
          A template to parse service and tag fields from a request URL. URL
          mask allows for routing to multiple Run services without having to
          create multiple network endpoint groups and backend services.

       Configuration for an App Engine network endpoint group. Both App Engine
       service and version are optional, and may be provided explicitly or in
       the URL mask. The app-engine-app flag is only used for default routing.
       The App Engine app must be in the same project as the Serverless network
       endpoint groups (NEG).

       --[no-]app-engine-app
          If set, the default routing is used. Use --app-engine-app to enable
          and --no-app-engine-app to disable.

       --app-engine-service=APP_ENGINE_SERVICE
          Optional serving service to add to the Serverless NEG.

       --app-engine-url-mask=APP_ENGINE_URL_MASK
          A template to parse service and version fields from a request URL.
          URL mask allows for routing to multiple App Engine services without
          having to create multiple network endpoint groups and backend
          services.

       --app-engine-version=APP_ENGINE_VERSION
          Optional serving version to add to the Serverless NEG.

     At most one of these can be specified:

       --global
          If set, the network endpoint group is global.

       --region=REGION
          Region of the network endpoint group to operate on. If not specified,
          you might be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

       --zone=ZONE
          Zone of the network endpoint group to operate on. If not specified
          and the compute/zone property isn't set, you might be prompted to
          select a zone (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/zone property:

              $ gcloud config set compute/zone ZONE

          A list of zones can be fetched by running:

              $ gcloud compute zones list

          To unset the property, run:

              $ gcloud config unset compute/zone

          Alternatively, the zone can be stored in the environment variable
          CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-endpoint-groups create

        $ gcloud beta compute network-endpoint-groups create
```

### gcloud compute network-endpoint-groups delete

```text
NAME
    gcloud compute network-endpoint-groups delete - delete a Compute Engine
        network endpoint group

SYNOPSIS
    gcloud compute network-endpoint-groups delete NAME
        [--global | --region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Compute Engine network endpoint group.

EXAMPLES
    To delete a network endpoint group named my-neg:

        $ gcloud compute network-endpoint-groups delete my-neg \
            --zone=us-central1-a

POSITIONAL ARGUMENTS
     NAME
        Name of the network endpoint group to operate on.

FLAGS
     At most one of these can be specified:

       --global
          If set, the network endpoint group is global.

       --region=REGION
          Region of the network endpoint group to operate on. If not specified,
          you might be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

       --zone=ZONE
          Zone of the network endpoint group to operate on. If not specified
          and the compute/zone property isn't set, you might be prompted to
          select a zone (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/zone property:

              $ gcloud config set compute/zone ZONE

          A list of zones can be fetched by running:

              $ gcloud compute zones list

          To unset the property, run:

              $ gcloud config unset compute/zone

          Alternatively, the zone can be stored in the environment variable
          CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-endpoint-groups delete

        $ gcloud beta compute network-endpoint-groups delete
```

### gcloud compute network-endpoint-groups describe

```text
NAME
    gcloud compute network-endpoint-groups describe - describe a Compute Engine
        network endpoint group

SYNOPSIS
    gcloud compute network-endpoint-groups describe NAME
        [--global | --region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Compute Engine network endpoint group.

EXAMPLES
    To describe a network endpoint group:

        $ gcloud compute network-endpoint-groups describe my-neg \
            --zone=us-central1-a

POSITIONAL ARGUMENTS
     NAME
        Name of the network endpoint group to operate on.

FLAGS
     At most one of these can be specified:

       --global
          If set, the network endpoint group is global.

       --region=REGION
          Region of the network endpoint group to operate on. If not specified,
          you might be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

       --zone=ZONE
          Zone of the network endpoint group to operate on. If not specified
          and the compute/zone property isn't set, you might be prompted to
          select a zone (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/zone property:

              $ gcloud config set compute/zone ZONE

          A list of zones can be fetched by running:

              $ gcloud compute zones list

          To unset the property, run:

              $ gcloud config unset compute/zone

          Alternatively, the zone can be stored in the environment variable
          CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-endpoint-groups describe

        $ gcloud beta compute network-endpoint-groups describe
```

### gcloud compute network-endpoint-groups list

```text
NAME
    gcloud compute network-endpoint-groups list - list Google Compute Engine
        network endpoint groups

SYNOPSIS
    gcloud compute network-endpoint-groups list [NAME ...]
        [--regexp=REGEXP, -r REGEXP]
        [--global | --regions=[REGION,...] | --zones=[ZONE,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-endpoint-groups list displays all Google Compute
    Engine network endpoint groups in a project.

    By default, global network endpoint groups, network endpoint groups from
    all regions and network endpoint groups from all zones are listed. The
    results can be narrowed down by providing the --global, --regions or
    --zones flag.

EXAMPLES
    To list all network endpoint groups in a project in table form, run:

        $ gcloud compute network-endpoint-groups list

    To list the URIs of all network endpoint groups in a project, run:

        $ gcloud compute network-endpoint-groups list --uri

    To list all global network endpoint groups in a project, run:

        $ gcloud compute network-endpoint-groups list --global

    To list all network endpoint groups in the us-central1 and europe-west1
    regions, given they are regional resources, run:

        $ gcloud compute network-endpoint-groups list \
            --filter="region:( europe-west1 us-central1 )"

    To list all network endpoint groups in zones us-central1-b and
    europe-west1-d, given they are zonal resources, run:

        $ gcloud compute network-endpoint-groups list \
            --filter="zone:( europe-west1-d us-central1-b )"

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

     At most one of these can be specified:

       --global
          If provided, only global resources are shown.

       --regions=[REGION,...]
          If provided, only regional resources are shown. If arguments are
          provided, only resources from the given regions are shown.

       --zones=[ZONE,...]
          If provided, only zonal resources are shown. If arguments are
          provided, only resources from the given zones are shown.

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

        $ gcloud alpha compute network-endpoint-groups list

        $ gcloud beta compute network-endpoint-groups list
```

### gcloud compute network-endpoint-groups list-network-endpoints

```text
NAME
    gcloud compute network-endpoint-groups list-network-endpoints - list
        network endpoints in a network endpoint group

SYNOPSIS
    gcloud compute network-endpoint-groups list-network-endpoints NAME
        [--global | --region=REGION | --zone=ZONE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List network endpoints in a network endpoint group.

EXAMPLES
    To list network endpoints of a network endpoint group named my-neg in zone
    us-central1-a:

        $ gcloud compute network-endpoint-groups list-network-endpoints \
            my-neg --zone=us-central1-a

POSITIONAL ARGUMENTS
     NAME
        Name of the network endpoint group to operate on.

FLAGS
     At most one of these can be specified:

       --global
          If set, the network endpoint group is global.

       --region=REGION
          Region of the network endpoint group to operate on. If not specified,
          you might be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

       --zone=ZONE
          Zone of the network endpoint group to operate on. If not specified
          and the compute/zone property isn't set, you might be prompted to
          select a zone (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/zone property:

              $ gcloud config set compute/zone ZONE

          A list of zones can be fetched by running:

              $ gcloud compute zones list

          To unset the property, run:

              $ gcloud config unset compute/zone

          Alternatively, the zone can be stored in the environment variable
          CLOUDSDK_COMPUTE_ZONE.

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

NOTES
    These variants are also available:

        $ gcloud alpha compute network-endpoint-groups list-network-endpoints

        $ gcloud beta compute network-endpoint-groups list-network-endpoints
```

### gcloud compute network-endpoint-groups update

```text
NAME
    gcloud compute network-endpoint-groups update - update a Compute Engine
        network endpoint group

SYNOPSIS
    gcloud compute network-endpoint-groups update NAME
        (--add-endpoint=[client-destination-port=CLIENT-DESTINATION-PORT],
          [fqdn=FQDN],[instance=INSTANCE],[ip=IP],[ipv6=IPV6],[port=PORT]
          | --remove-endpoint=[client-destination-port=CLIENT-DESTINATION-PORT],
          [fqdn=FQDN],[instance=INSTANCE],[ip=IP],[ipv6=IPV6],[port=PORT])
        [--global | --region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Compute Engine network endpoint group.

EXAMPLES
    To add two endpoints to a network endpoint group:

        $ gcloud compute network-endpoint-groups update my-neg \
            --zone=us-central1-a \
            --add-endpoint=instance=my-instance1,ip=127.0.0.1,port=1234 \
            --add-endpoint=instance=my-instance2

    To remove two endpoints from a network endpoint group:

        $ gcloud compute network-endpoint-groups update my-neg \
            --zone=us-central1-a \
            --remove-endpoint=instance=my-instance1,ip=127.0.0.1,port=1234 \
            --remove-endpoint=instance=my-instance2

POSITIONAL ARGUMENTS
     NAME
        Name of the network endpoint group to operate on.

REQUIRED FLAGS
     These flags can be specified multiple times to add/remove multiple
     endpoints.

     Exactly one of these must be specified:

       --add-endpoint=[client-destination-port=CLIENT-DESTINATION-PORT],[fqdn=FQDN],[instance=INSTANCE],[ip=IP],[ipv6=IPV6],[port=PORT]
          The network endpoint to add to the network endpoint group. Keys used
          depend on the endpoint type of the NEG.

          gce-vm-ip-port

              *instance* - Name of instance in same zone as the network endpoint
              group.

              The VM instance must belong to the network / subnetwork
              associated with the network endpoint group. If the VM instance
              is deleted, then any network endpoint group that has a reference
              to it is updated.

              *ip* - Optional IP address of the network endpoint. The IP address
              must belong to a VM in compute engine (either the primary IP or
              as part of an aliased IP range). If the IP address is not
              specified, then the primary IP address for the VM instance in
              the network that the network endpoint group belongs to is
              used.

              *ipv6* - Optional IPv6 address of the network endpoint. The IPv6
              address must belong to a VM in compute engine (either the internal
              or external IPv6 address).

              *port* - Required endpoint port unless NEG default port is set.

              *client-destination-port* - Required endpoint client destination port only for the port
              mapping NEG.

          internet-ip-port

              *ip* - Required IPv4 address of the endpoint to attach. Must be
              publicly routable.

              *port* - Optional port of the endpoint to attach. If unspecified,
              the NEG default port is set. If no default port is set, the
              well-known port for the backend protocol is used instead
              (80 for HTTP, 443 for HTTPS).

          internet-fqdn-port

              *fqdn* - Required fully qualified domain name to use to look up an
              external endpoint. Must be resolvable to a public IP address via
              public DNS.

              *port* - Optional port of the endpoint to attach. If unspecified,
              the NEG default port is set. If no default port is set, the
              well-known port for the backend protocol is used instead
              (80 for HTTP, 443 for HTTPS or HTTP2).

              Example: `--add-endpoint="fqdn=backend.example.com,port=443"`

          non-gcp-private-ip-port

              *ip* - Required IPv4 address of the network endpoint to attach.
              The IP address must belong to a VM not in Compute Engine and must
              be routable using a Cloud Router over VPN or an Interconnect
              connection.

              *port* - Required port of the network endpoint to attach unless
              the NEG default port is set.

          gce-vm-ip

              *instance* - Required instance name in same zone as the network
              endpoint group.

              The VM instance must belong to the network / subnetwork
              associated with the network endpoint group. If the VM instance
              is deleted, then any network endpoint group that has a reference
              to it is updated.

              *ip* - Optional IP address of the network endpoint to attach. The
              IP address must be the VM's network interface address. If not
              specified, the primary NIC address is used.

       --remove-endpoint=[client-destination-port=CLIENT-DESTINATION-PORT],[fqdn=FQDN],[instance=INSTANCE],[ip=IP],[ipv6=IPV6],[port=PORT]
          The network endpoint to detach from the network endpoint group. Keys
          used depend on the endpoint type of the NEG.

          gce-vm-ip-port

              *instance* - Required name of instance whose endpoint(s) to
              detach. If the IP address is unset, all endpoints for the
              instance in the NEG are detached.

              *ip* - Optional IPv4 address of the network endpoint to detach.
              If specified port must be provided as well.

              *ipv6* - Optional IPv6 address of the network endpoint to detach.
              If specified port must be provided as well.

              *port* - Optional port of the network endpoint to detach.

              *client-destination-port* - Optional client destination port, only for port mapping NEGs.

          internet-ip-port

              *ip* - Required IPv4 address of the network endpoint to detach.

              *port* - Optional port of the network endpoint to detach if the
              endpoint has a port specified.

          internet-fqdn-port

              *fqdn* - Required fully qualified domain name of the endpoint to
              detach.

              *port* - Optional port of the network endpoint to detach if the
              endpoint has a port specified.

          non-gcp-private-ip-port

              *ip* - Required IPv4 address of the network endpoint to detach.

              *port* - Required port of the network endpoint to detach unless
              NEG default port is set.

          gce-vm-ip

              *instance* - Required name of instance with endpoints to
              detach. If the IP address is unset, all endpoints for the
              instance in the NEG are detached.

              *ip* - Optional IP address of the network endpoint to attach. The
              IP address must be the VM's network interface's primary IP
              address. If not specified, the primary NIC address is used.

OPTIONAL FLAGS
     At most one of these can be specified:

       --global
          If set, the network endpoint group is global.

       --region=REGION
          Region of the network endpoint group to operate on. If not specified,
          you might be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

       --zone=ZONE
          Zone of the network endpoint group to operate on. If not specified
          and the compute/zone property isn't set, you might be prompted to
          select a zone (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/zone property:

              $ gcloud config set compute/zone ZONE

          A list of zones can be fetched by running:

              $ gcloud compute zones list

          To unset the property, run:

              $ gcloud config unset compute/zone

          Alternatively, the zone can be stored in the environment variable
          CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-endpoint-groups update

        $ gcloud beta compute network-endpoint-groups update
```

### gcloud beta compute network-endpoint-groups create

```text
NAME
    gcloud beta compute network-endpoint-groups create - create a Google
        Compute Engine network endpoint group

SYNOPSIS
    gcloud beta compute network-endpoint-groups create NAME
        [--default-port=DEFAULT_PORT] [--network=NETWORK]
        [--network-endpoint-type=NETWORK_ENDPOINT_TYPE;
          default="gce-vm-ip-port"] [--producer-port=PRODUCER_PORT]
        [--psc-target-service=PSC_TARGET_SERVICE] [--subnet=SUBNET]
        [--cloud-function-name=CLOUD_FUNCTION_NAME
          --cloud-function-url-mask=CLOUD_FUNCTION_URL_MASK
          | --cloud-run-service=CLOUD_RUN_SERVICE
          --cloud-run-tag=CLOUD_RUN_TAG --cloud-run-url-mask=CLOUD_RUN_URL_MASK
          | --[no-]app-engine-app --app-engine-service=APP_ENGINE_SERVICE
          --app-engine-url-mask=APP_ENGINE_URL_MASK
          --app-engine-version=APP_ENGINE_VERSION
          | --serverless-deployment-platform=SERVERLESS_DEPLOYMENT_PLATFORM
          --serverless-deployment-resource=SERVERLESS_DEPLOYMENT_RESOURCE
          --serverless-deployment-url-mask=SERVERLESS_DEPLOYMENT_URL_MASK
          --serverless-deployment-version=SERVERLESS_DEPLOYMENT_VERSION]
        [--global | --region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-endpoint-groups delete

```text
NAME
    gcloud beta compute network-endpoint-groups delete - delete a Compute
        Engine network endpoint group

SYNOPSIS
    gcloud beta compute network-endpoint-groups delete NAME
        [--global | --region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-endpoint-groups describe

```text
NAME
    gcloud beta compute network-endpoint-groups describe - describe a Compute
        Engine network endpoint group

SYNOPSIS
    gcloud beta compute network-endpoint-groups describe NAME
        [--global | --region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-endpoint-groups list

```text
NAME
    gcloud beta compute network-endpoint-groups list - list Google Compute
        Engine network endpoint groups

SYNOPSIS
    gcloud beta compute network-endpoint-groups list [NAME ...]
        [--regexp=REGEXP, -r REGEXP]
        [--global | --regions=[REGION,...] | --zones=[ZONE,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-endpoint-groups list-network-endpoints

```text
NAME
    gcloud beta compute network-endpoint-groups list-network-endpoints - list
        network endpoints in a network endpoint group

SYNOPSIS
    gcloud beta compute network-endpoint-groups list-network-endpoints NAME
        [--global | --region=REGION | --zone=ZONE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-endpoint-groups update

```text
NAME
    gcloud beta compute network-endpoint-groups update - update a Compute
        Engine network endpoint group

SYNOPSIS
    gcloud beta compute network-endpoint-groups update NAME
        (--add-endpoint=[client-destination-port=CLIENT-DESTINATION-PORT],
          [fqdn=FQDN],[instance=INSTANCE],[ip=IP],[ipv6=IPV6],[port=PORT]
          | --remove-endpoint=[client-destination-port=CLIENT-DESTINATION-PORT],
          [fqdn=FQDN],[instance=INSTANCE],[ip=IP],[ipv6=IPV6],[port=PORT])
        [--global | --region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-endpoint-groups create

```text
NAME
    gcloud alpha compute network-endpoint-groups create - create a Google
        Compute Engine network endpoint group

SYNOPSIS
    gcloud alpha compute network-endpoint-groups create NAME
        [--default-port=DEFAULT_PORT] [--network=NETWORK]
        [--network-endpoint-type=NETWORK_ENDPOINT_TYPE;
          default="gce-vm-ip-port"] [--producer-port=PRODUCER_PORT]
        [--psc-target-service=PSC_TARGET_SERVICE] [--subnet=SUBNET]
        [--cloud-function-name=CLOUD_FUNCTION_NAME
          --cloud-function-url-mask=CLOUD_FUNCTION_URL_MASK
          | --cloud-run-service=CLOUD_RUN_SERVICE
          --cloud-run-tag=CLOUD_RUN_TAG --cloud-run-url-mask=CLOUD_RUN_URL_MASK
          | --[no-]app-engine-app --app-engine-service=APP_ENGINE_SERVICE
          --app-engine-url-mask=APP_ENGINE_URL_MASK
          --app-engine-version=APP_ENGINE_VERSION
          | --serverless-deployment-platform=SERVERLESS_DEPLOYMENT_PLATFORM
          --serverless-deployment-resource=SERVERLESS_DEPLOYMENT_RESOURCE
          --serverless-deployment-url-mask=SERVERLESS_DEPLOYMENT_URL_MASK
          --serverless-deployment-version=SERVERLESS_DEPLOYMENT_VERSION]
        [--global | --region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-endpoint-groups delete

```text
NAME
    gcloud alpha compute network-endpoint-groups delete - delete a Compute
        Engine network endpoint group

SYNOPSIS
    gcloud alpha compute network-endpoint-groups delete NAME
        [--global | --region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-endpoint-groups describe

```text
NAME
    gcloud alpha compute network-endpoint-groups describe - describe a Compute
        Engine network endpoint group

SYNOPSIS
    gcloud alpha compute network-endpoint-groups describe NAME
        [--global | --region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-endpoint-groups list

```text
NAME
    gcloud alpha compute network-endpoint-groups list - list Google Compute
        Engine network endpoint groups

SYNOPSIS
    gcloud alpha compute network-endpoint-groups list [NAME ...]
        [--regexp=REGEXP, -r REGEXP]
        [--global | --regions=[REGION,...] | --zones=[ZONE,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-endpoint-groups list-network-endpoints

```text
NAME
    gcloud alpha compute network-endpoint-groups list-network-endpoints - list
        network endpoints in a network endpoint group

SYNOPSIS
    gcloud alpha compute network-endpoint-groups list-network-endpoints NAME
        [--global | --region=REGION | --zone=ZONE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-endpoint-groups update

```text
NAME
    gcloud alpha compute network-endpoint-groups update - update a Compute
        Engine network endpoint group

SYNOPSIS
    gcloud alpha compute network-endpoint-groups update NAME
        (--add-endpoint=[client-destination-port=CLIENT-DESTINATION-PORT],
          [fqdn=FQDN],[instance=INSTANCE],[ip=IP],[ipv6=IPV6],[port=PORT]
          | --remove-endpoint=[client-destination-port=CLIENT-DESTINATION-PORT],
          [fqdn=FQDN],[instance=INSTANCE],[ip=IP],[ipv6=IPV6],[port=PORT])
        [--global | --region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute network-endpoint-groups list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute network-endpoint-groups list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-endpoint-groups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
