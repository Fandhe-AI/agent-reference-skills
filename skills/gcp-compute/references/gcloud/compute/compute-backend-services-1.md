---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-services
---

# gcloud compute backend-services (part 1/5)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute backend-services add-backend

```text
NAME
    gcloud compute backend-services add-backend - add a backend to a backend
        service

SYNOPSIS
    gcloud compute backend-services add-backend BACKEND_SERVICE_NAME
        ([--instance-group=INSTANCE_GROUP
          : --instance-group-region=INSTANCE_GROUP_REGION
          | --instance-group-zone=INSTANCE_GROUP_ZONE]
          | [--network-endpoint-group=NETWORK_ENDPOINT_GROUP
          : --global-network-endpoint-group
          | --network-endpoint-group-region=NETWORK_ENDPOINT_GROUP_REGION
          | --network-endpoint-group-zone=NETWORK_ENDPOINT_GROUP_ZONE])
        [--balancing-mode=BALANCING_MODE] [--capacity-scaler=CAPACITY_SCALER]
        [--description=DESCRIPTION] [--failover]
        [--max-utilization=MAX_UTILIZATION] [--preference=PREFERENCE]
        [--traffic-duration=TRAFFIC_DURATION]
        [--custom-metrics=[CUSTOM_METRICS,...]
          | --custom-metrics-file=[CUSTOM_METRICS,...]]
        [--global | --region=REGION]
        [--max-connections=MAX_CONNECTIONS
          | --max-connections-per-endpoint=MAX_CONNECTIONS_PER_ENDPOINT
          | --max-connections-per-instance=MAX_CONNECTIONS_PER_INSTANCE
          | --max-in-flight-requests=MAX_IN_FLIGHT_REQUESTS
          | --max-in-flight-requests-per-endpoint=MAX_IN_FLIGHT_REQUESTS_PER_ENDPOINT | --max-in-flight-requests-per-instance=MAX_IN_FLIGHT_REQUESTS_PER_INSTANCE | --max-rate=MAX_RATE | --max-rate-per-endpoint=MAX_RATE_PER_ENDPOINT | --max-rate-per-instance=MAX_RATE_PER_INSTANCE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute backend-services add-backend adds a backend to a Google
    Cloud load balancer or Traffic Director. Depending on the load balancing
    scheme of the backend service, backends can be instance groups (managed or
    unmanaged), zonal network endpoint groups (zonal NEGs), serverless NEGs, or
    an internet NEG. For more information, see the backend services overview
    (https://cloud.google.com/load-balancing/docs/backend-service).

    For most load balancers, you can define how Google Cloud measures capacity
    by selecting a balancing mode. For more information, see traffic
    distribution
    (https://cloud.google.com/load-balancing/docs/backend-service#traffic_distribution).

    To modify a backend, use the gcloud compute backend-services update-backend
    or gcloud compute backend-services edit command.

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to operate on.

REQUIRED FLAGS
     Exactly one of these must be specified:

       Instance Group

       --instance-group=INSTANCE_GROUP
          Name of the instance group to add to the backend service. For details
          on valid instance names, refer to the criteria documented under the
          field 'name' at:
          https://cloud.google.com/compute/docs/reference/rest/v1/instances

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       At most one of these can be specified:

         --instance-group-region=INSTANCE_GROUP_REGION
            Region of the instance group to add to the backend service. If not
            specified, you might be prompted to select a region (interactive
            mode only).

            To avoid prompting when this flag is omitted, you can set the
            compute/region property:

                $ gcloud config set compute/region REGION

            A list of regions can be fetched by running:

                $ gcloud compute regions list

            To unset the property, run:

                $ gcloud config unset compute/region

            Alternatively, the region can be stored in the environment variable
            CLOUDSDK_COMPUTE_REGION.

         --instance-group-zone=INSTANCE_GROUP_ZONE
            Zone of the instance group to add to the backend service. If not
            specified and the compute/zone property isn't set, you might be
            prompted to select a zone (interactive mode only).

            To avoid prompting when this flag is omitted, you can set the
            compute/zone property:

                $ gcloud config set compute/zone ZONE

            A list of zones can be fetched by running:

                $ gcloud compute zones list

            To unset the property, run:

                $ gcloud config unset compute/zone

            Alternatively, the zone can be stored in the environment variable
            CLOUDSDK_COMPUTE_ZONE.

       Network Endpoint Group

       --network-endpoint-group=NETWORK_ENDPOINT_GROUP
          Name of the network endpoint group to add to the backend service.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       At most one of these can be specified:

         --global-network-endpoint-group
            If set, the network endpoint group is global.

         --network-endpoint-group-region=NETWORK_ENDPOINT_GROUP_REGION
            Region of the network endpoint group to add to the backend service.
            If not specified, you might be prompted to select a region
            (interactive mode only).

            To avoid prompting when this flag is omitted, you can set the
            compute/region property:

                $ gcloud config set compute/region REGION

            A list of regions can be fetched by running:

                $ gcloud compute regions list

            To unset the property, run:

                $ gcloud config unset compute/region

            Alternatively, the region can be stored in the environment variable
            CLOUDSDK_COMPUTE_REGION.

         --network-endpoint-group-zone=NETWORK_ENDPOINT_GROUP_ZONE
            Zone of the network endpoint group to add to the backend service.
            If not specified and the compute/zone property isn't set, you might
            be prompted to select a zone (interactive mode only).

            To avoid prompting when this flag is omitted, you can set the
            compute/zone property:

                $ gcloud config set compute/zone ZONE

            A list of zones can be fetched by running:

                $ gcloud compute zones list

            To unset the property, run:

                $ gcloud config unset compute/zone

            Alternatively, the zone can be stored in the environment variable
            CLOUDSDK_COMPUTE_ZONE.

OPTIONAL FLAGS
     --balancing-mode=BALANCING_MODE
        Defines how to measure whether a backend can handle additional traffic
        or is fully loaded. For more information, see
        https://cloud.google.com/load-balancing/docs/backend-service#balancing-mode.

        This cannot be used when the endpoint type of an attached network
        endpoint group is INTERNET_IP_PORT, INTERNET_FQDN_PORT, or SERVERLESS.

        BALANCING_MODE must be one of:

         CONNECTION
            Available if the backend service's load balancing scheme is either
            INTERNAL or EXTERNAL. Available if the backend service's protocol
            is one of SSL, TCP, or UDP.

            Spreads load based on how many concurrent connections the backend
            can handle.

            For backend services with --load-balancing-scheme EXTERNAL, you
            must specify exactly one of these additional parameters:
            --max-connections, --max-connections-per-instance, or
            --max-connections-per-endpoint.

            For backend services where --load-balancing-scheme is INTERNAL, you
            must omit all of these parameters.

         CUSTOM_METRICS
            Spreads load based on custom defined and reported metrics.

         IN_FLIGHT
            Available if the backend service's load balancing scheme is
            INTERNAL_MANAGED, INTERNAL_SELF_MANAGED, or EXTERNAL_MANAGED.
            Available if the backend service's protocol is one of HTTP, HTTPS,
            or HTTP/2.

            Spreads load based on how many in-flight requests the backend can
            handle.

            You must specify exactly one of these additional parameters:
            --max-in-flight-requests, --max-in-flight-requests-per-instance, or
            --max-in-flight-requests-per-endpoint, and --traffic-duration=LONG.

         RATE
            Available if the backend service's load balancing scheme is
            INTERNAL_MANAGED, INTERNAL_SELF_MANAGED, or EXTERNAL. Available if
            the backend service's protocol is one of HTTP, HTTPS, or HTTP/2.

            Spreads load based on how many HTTP requests per second (RPS) the
            backend can handle.

            You must specify exactly one of these additional parameters:
            --max-rate, --max-rate-per-instance, or --max-rate-per-endpoint.

         UTILIZATION
            Available if the backend service's load balancing scheme is
            INTERNAL_MANAGED, INTERNAL_SELF_MANAGED, or EXTERNAL. Available
            only for managed or unmanaged instance group backends.

            Spreads load based on the backend utilization of instances in a
            backend instance group.

            The following additional parameters may be specified:
            --max-utilization, --max-rate, --max-rate-per-instance,
            --max-connections, --max-connections-per-instance. For valid
            combinations, see --max-utilization.

     --capacity-scaler=CAPACITY_SCALER
        Scales down the target capacity (max utilization, max rate, or max
        connections) without changing the target capacity. For usage guidelines
        and examples, see Capacity scaler
        (https://cloud.google.com/load-balancing/docs/backend-service#capacity_scaler).

        This cannot be used when the endpoint type of an attached network
        endpoint group is INTERNET_IP_PORT, INTERNET_FQDN_PORT, or SERVERLESS.

     --description=DESCRIPTION
        An optional, textual description for the backend.

     --failover
        Designates whether this is a failover backend. More than one failover
        backend can be configured for a given BackendService. Not compatible
        with the --global flag

     --max-utilization=MAX_UTILIZATION
        Defines the maximum target for average utilization of the backend
        instance group. Supported values are 0.0 (0%) through 1.0 (100%). This
        is an optional parameter for the UTILIZATION balancing mode.

        You can use this parameter with other parameters for defining target
        capacity. For usage guidelines, see Balancing mode combinations
        (https://cloud.google.com/load-balancing/docs/backend-service#balancing-mode-combos).

     --preference=PREFERENCE
        This parameter specifies whether a backend should be fully utilized
        before sending traffic to backends with the default preference. This
        parameter cannot be used with regional managed instance groups and when
        the endpoint type of an attached network endpoint group is
        INTERNET_IP_PORT, INTERNET_FQDN_PORT, or SERVERLESS. PREFERENCE must be
        one of:

         DEFAULT
            This is the default setting. If the designated preferred backends
            don't have enough capacity, backends in the default category are
            used. Traffic is distributed between default backends based on the
            load balancing algorithm used.

         PREFERRED
            Backends with this preference setting are used up to their capacity
            limits first, while optimizing overall network latency.

     --traffic-duration=TRAFFIC_DURATION
        The expected traffic duration for this service. TRAFFIC_DURATION must
        be one of:

         LONG
            Most of the requests are expected to take more than multiple
            seconds to finish.

         SHORT
            Most requests are expected to finish with a sub-second latency.

         TRAFFIC_DURATION_UNSPECIFIED
            Default value. Defaults to SHORT.

     At most one of these can be specified:

       --custom-metrics=[CUSTOM_METRICS,...]
          List of custom metrics that are used for CUSTOM_METRICS balancing
          mode and WEIGHTED_ROUND_ROBIN locality load balancing policy.

          Example:

              $ gcloud compute backend-services add-backend \
                  --custom-metrics='name=my-signal,maxUtilization=0.8,dryRun=true'
              $ gcloud compute backend-services add-backend \
                  --custom-metrics='name=my-signal,maxUtilization=0.8,dryRun=true'\
               --custom-metrics='name=my-signal2,maxUtilization=0.2'
              $ gcloud compute backend-services add-backend \
                  --custom-metrics='[{"name" : "my-signal", "maxUtilization" :
               0.8, "dryRun" : true}, {"name" : "my-signal2", "maxUtilization" :
               0.1}]'

          Sets custom_metrics value.

           dryRun
              Sets dryRun value.

           maxUtilization
              Sets maxUtilization value.

           name
              Required, sets name value.

          Shorthand Example:

              --custom-metrics=dryRun=boolean,maxUtilization=float,name=string --custom-metrics=dryRun=boolean,maxUtilization=float,name=string

          JSON Example:

              --custom-metrics='[{"dryRun": boolean, "maxUtilization": float, "name": "string"}]'

          File Example:

              --custom-metrics=path_to_file.(yaml|json)

       --custom-metrics-file=[CUSTOM_METRICS,...]
          File path to json file with custom metrics that are used for
          CUSTOM_METRICS balancing mode and WEIGHTED_ROUND_ROBIN locality load
          balancing policy.

          Example:

              $ gcloud compute backend-services add-backend \
                  --custom-metrics-file='customMetric.json'

          Sets custom_metrics_file value.

           dryRun
              Sets dryRun value.

           maxUtilization
              Sets maxUtilization value.

           name
              Required, sets name value.

          Shorthand Example:

              --custom-metrics-file=dryRun=boolean,maxUtilization=float,name=string --custom-metrics-file=dryRun=boolean,maxUtilization=float,name=string

          JSON Example:

              --custom-metrics-file='[{"dryRun": boolean, "maxUtilization": float, "name": "string"}]'

          File Example:

              --custom-metrics-file=path_to_file.(yaml|json)

     At most one of these can be specified:

       --global
          If set, the backend service is global.

       --region=REGION
          Region of the backend service to operate on. Overrides the default
          compute/region property value for this command invocation.

     At most one of these can be specified:

       --max-connections=MAX_CONNECTIONS
          Maximum concurrent connections that the backend can handle. Valid for
          network endpoint group and instance group backends (except for
          regional managed instance groups).

          This cannot be used when the endpoint type of an attached network
          endpoint group is INTERNET_IP_PORT, INTERNET_FQDN_PORT, or
          SERVERLESS.

       --max-connections-per-endpoint=MAX_CONNECTIONS_PER_ENDPOINT
          Only valid for network endpoint group backends. Defines a maximum
          number of connections per endpoint if all endpoints are healthy. When
          one or more endpoints are unhealthy, an effective maximum average
          number of connections per healthy endpoint is calculated by
          multiplying MAX_CONNECTIONS_PER_ENDPOINT by the number of endpoints
          in the network endpoint group, and then dividing by the number of
          healthy endpoints.

          This cannot be used when the endpoint type of an attached network
          endpoint group is INTERNET_IP_PORT, INTERNET_FQDN_PORT, or
          SERVERLESS.

       --max-connections-per-instance=MAX_CONNECTIONS_PER_INSTANCE
          Only valid for instance group backends. Defines a maximum number of
          concurrent connections per instance if all instances in the instance
          group are healthy. When one or more instances are unhealthy, an
          effective average maximum number of connections per healthy instance
          is calculated by multiplying MAX_CONNECTIONS_PER_INSTANCE by the
          number of instances in the instance group, and then dividing by the
          number of healthy instances.

       --max-in-flight-requests=MAX_IN_FLIGHT_REQUESTS
          Maximum number of in-flight requests that the backend can handle.

          This cannot be used when the endpoint type of an attached network
          endpoint group is INTERNET_IP_PORT, INTERNET_FQDN_PORT, or
          SERVERLESS.

       --max-in-flight-requests-per-endpoint=MAX_IN_FLIGHT_REQUESTS_PER_ENDPOINT
          Only valid for network endpoint group backends. Defines the maximum
          number of in-flight requests per endpoint.

          This cannot be used when the endpoint type of an attached network
          endpoint group is INTERNET_IP_PORT, INTERNET_FQDN_PORT, or
          SERVERLESS.

       --max-in-flight-requests-per-instance=MAX_IN_FLIGHT_REQUESTS_PER_INSTANCE
          Only valid for instance group backends. Defines the maximum number of
          in-flight requests per instance.

          This cannot be used when the endpoint type of an attached network
          endpoint group is INTERNET_IP_PORT, INTERNET_FQDN_PORT, or
          SERVERLESS.

       --max-rate=MAX_RATE
          Maximum number of HTTP requests per second (RPS) that the backend can
          handle. Valid for network endpoint group and instance group backends
          (except for regional managed instance groups). Must not be defined if
          the backend is a managed instance group using load balancing-based
          autoscaling.

          This cannot be used when the endpoint type of an attached network
          endpoint group is INTERNET_IP_PORT, INTERNET_FQDN_PORT, or
          SERVERLESS.

       --max-rate-per-endpoint=MAX_RATE_PER_ENDPOINT
          Only valid for network endpoint group backends. Defines a maximum
          number of HTTP requests per second (RPS) per endpoint if all
          endpoints are healthy. When one or more endpoints are unhealthy, an
          effective maximum rate per healthy endpoint is calculated by
          multiplying MAX_RATE_PER_ENDPOINT by the number of endpoints in the
          network endpoint group, and then dividing by the number of healthy
          endpoints.

          This cannot be used when the endpoint type of an attached network
          endpoint group is INTERNET_IP_PORT, INTERNET_FQDN_PORT, or
          SERVERLESS.

       --max-rate-per-instance=MAX_RATE_PER_INSTANCE
          Only valid for instance group backends. Defines a maximum number of
          HTTP requests per second (RPS) per instance if all instances in the
          instance group are healthy. When one or more instances are unhealthy,
          an effective maximum RPS per healthy instance is calculated by
          multiplying MAX_RATE_PER_INSTANCE by the number of instances in the
          instance group, and then dividing by the number of healthy instances.
          This parameter is compatible with managed instance group backends
          that use autoscaling based on load balancing.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services add-backend

        $ gcloud beta compute backend-services add-backend
```

### gcloud compute backend-services add-iam-policy-binding

```text
NAME
    gcloud compute backend-services add-iam-policy-binding - add an IAM policy
        binding to a Compute Engine backend service

SYNOPSIS
    gcloud compute backend-services add-iam-policy-binding BACKEND_SERVICE_NAME
        --member=PRINCIPAL --role=ROLE [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to a Compute Engine backend service.

EXAMPLES
    To add an IAM policy binding for the role of
    'compute.loadBalancerServiceUser' for the user 'test-user@gmail.com' with
    backend service 'my-backend-service' and region 'REGION', run:

        $ gcloud compute backend-services add-iam-policy-binding \
          my-backend-service --region=REGION \
          --member='user:test-user@gmail.com' \
          --role='roles/compute.loadBalancerServiceUser'

        $ gcloud compute backend-services add-iam-policy-binding \
          my-backend-service --global \
          --member='user:test-user@gmail.com' \
          --role='roles/compute.loadBalancerServiceUser'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to operate on.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to add the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        Role name to assign to the principal. The role name is the complete
        path of a predefined role, such as roles/logging.viewer, or the role ID
        for a custom role, such as
        organizations/{ORGANIZATION_ID}/roles/logging.viewer.

OPTIONAL FLAGS
     At most one of these can be specified:

       --global
          If set, the backend service is global.

       --region=REGION
          Region of the backend service to operate on. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services add-iam-policy-binding

        $ gcloud beta compute backend-services add-iam-policy-binding
```

### gcloud compute backend-services add-service-bindings

```text
NAME
    gcloud compute backend-services add-service-bindings - add service bindings
        to a backend service

SYNOPSIS
    gcloud compute backend-services add-service-bindings BACKEND_SERVICE_NAME
        --service-bindings=SERVICE_BINDING,[...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add service bindings to a backend service.

EXAMPLES
    To add a service binding to a backend service, run:

        $ gcloud compute backend-services add-service-bindings NAME \
            --service-bindings=SERVICE_BINDING1 --global

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to operate on.

REQUIRED FLAGS
     --service-bindings=SERVICE_BINDING,[...]
        List of service binding names to be added to the backend service.

OPTIONAL FLAGS
     At most one of these can be specified:

       --global
          If set, the backend service is global.

       --region=REGION
          Region of the backend service to operate on. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services add-service-bindings

        $ gcloud beta compute backend-services add-service-bindings
```

### gcloud compute backend-services add-signed-url-key

```text
NAME
    gcloud compute backend-services add-signed-url-key - add Cloud CDN Signed
        URL key to a backend service

SYNOPSIS
    gcloud compute backend-services add-signed-url-key BACKEND_SERVICE_NAME
        --key-file=LOCAL_FILE_PATH --key-name=KEY_NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute backend-services add-signed-url-key is used to add a new
    Cloud CDN Signed URL key to a backend service.

    Cloud CDN Signed URLs give you a way to serve responses from the globally
    distributed CDN cache, even if the request needs to be authorized.

    Signed URLs are a mechanism to temporarily give a client access to a
    private resource without requiring additional authorization. To achieve
    this, the full request URL that should be allowed is hashed and
    cryptographically signed. By using the signed URL you give it, that one
    request will be considered authorized to receive the requested content.

    Generally, a signed URL can be used by anyone who has it. However, it is
    usually only intended to be used by the client that was directly given the
    URL. To mitigate this, they expire at a time chosen by the issuer. To
    minimize the risk of a signed URL being shared, it is recommended that the
    signed URL be set to expire as soon as possible.

    A 128-bit secret key is used for signing the URLs.

POSITIONAL ARGUMENTS
     BACKEND_SERVICE_NAME
        Name of the backend service to operate on.

REQUIRED FLAGS
     --key-file=LOCAL_FILE_PATH
        The file containing the RFC 4648 Section 5 base64url encoded 128-bit
        secret key for Cloud CDN Signed URL. It is vital that the key is
        strongly random. One way to generate such a key is with the following
        command:

            head -c 16 /dev/random | base64 | tr +/ -_ > [KEY_FILE_NAME]

     --key-name=KEY_NAME
        Name of the Cloud CDN Signed URL key.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-services add-signed-url-key

        $ gcloud beta compute backend-services add-signed-url-key
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-services (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
