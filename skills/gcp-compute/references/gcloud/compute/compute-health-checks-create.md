---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/health-checks/create
---

# gcloud compute health-checks create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute health-checks create grpc

```text
NAME
    gcloud compute health-checks create grpc - create a gRPC health check to
        monitor load balanced instances

SYNOPSIS
    gcloud compute health-checks create grpc NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--grpc-service-name=GRPC_SERVICE_NAME]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION] [--port=PORT --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute health-checks create grpc is used to create a non-legacy
    health check using the gRPC protocol. You can use this health check for
    Google Cloud load balancers or for managed instance group autohealing. For
    more information, see the health checks overview at:
    https://cloud.google.com/load-balancing/docs/health-check-concepts

POSITIONAL ARGUMENTS
     NAME
        Name of the gRPC health check to create.

FLAGS
     --check-interval=CHECK_INTERVAL; default="5s"
        How often to perform a health check for an instance. For example,
        specifying 10s will run the check every 10 seconds. The default value
        is 5s. See $ gcloud topic datetimes for information on duration
        formats.

     --description=DESCRIPTION
        An optional string description for the gRPC health check.

     --enable-logging
        Enable logging of health check probe results to Stackdriver. Logging is
        disabled by default.

        Use --no-enable-logging to disable logging.

     --grpc-service-name=GRPC_SERVICE_NAME
        An optional gRPC service name string of up to 1024 characters to
        include in the gRPC health check request. Only ASCII characters are
        allowed.

     --healthy-threshold=HEALTHY_THRESHOLD; default=2
        The number of consecutive successful health checks before an unhealthy
        instance is marked as healthy. The default is 2.

     --timeout=TIMEOUT; default="5s"
        If Google Compute Engine doesn't receive a healthy response from the
        instance by the time specified by the value of this flag, the health
        check request is considered a failure. For example, specifying 10s will
        cause the check to wait for 10 seconds before considering the request a
        failure. The default value is 5s. See $ gcloud topic datetimes for
        information on duration formats.

     --unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2
        The number of consecutive health check failures before a healthy
        instance is marked as unhealthy. The default is 2.

     At most one of these can be specified:

       --global
          If set, the gRPC health check is global.

       --region=REGION
          Region of the gRPC health check to create. If not specified, you
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

     These flags configure the port that the health check monitors.

     --port=PORT
        The TCP port number that this health check monitors.

     --use-serving-port
        If given, use the "serving port" for health checks:

        * When health checking network endpoints in a Network Endpoint Group,
          use the port specified with each endpoint. --use-serving-port must be
          used when using a Network Endpoint Group as a backend as this flag
          specifies the portSpecification option for a Health Check object.
        * When health checking other backends, use the port of the backend
          service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute health-checks create grpc

        $ gcloud beta compute health-checks create grpc
```

### gcloud compute health-checks create grpc-with-tls

```text
NAME
    gcloud compute health-checks create grpc-with-tls - create a gRPC with TLS
        health check to monitor load balanced instances

SYNOPSIS
    gcloud compute health-checks create grpc-with-tls NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--grpc-service-name=GRPC_SERVICE_NAME]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION] [--port=PORT --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute health-checks create grpc-with-tls is used to create a
    non-legacy health check using the gRPC with TLS protocol. You can use this
    health check for Google Cloud load balancers or for managed instance group
    autohealing. For more information, see the health checks overview at:
    https://cloud.google.com/load-balancing/docs/health-check-concepts

POSITIONAL ARGUMENTS
     NAME
        Name of the gRPC with TLS health check to create.

FLAGS
     --check-interval=CHECK_INTERVAL; default="5s"
        How often to perform a health check for an instance. For example,
        specifying 10s will run the check every 10 seconds. The default value
        is 5s. See $ gcloud topic datetimes for information on duration
        formats.

     --description=DESCRIPTION
        An optional string description for the gRPC with TLS health check.

     --enable-logging
        Enable logging of health check probe results to Stackdriver. Logging is
        disabled by default.

        Use --no-enable-logging to disable logging.

     --grpc-service-name=GRPC_SERVICE_NAME
        An optional gRPC service name string of up to 1024 characters to
        include in the gRPC health check request. Only ASCII characters are
        allowed.

     --healthy-threshold=HEALTHY_THRESHOLD; default=2
        The number of consecutive successful health checks before an unhealthy
        instance is marked as healthy. The default is 2.

     --timeout=TIMEOUT; default="5s"
        If Google Compute Engine doesn't receive a healthy response from the
        instance by the time specified by the value of this flag, the health
        check request is considered a failure. For example, specifying 10s will
        cause the check to wait for 10 seconds before considering the request a
        failure. The default value is 5s. See $ gcloud topic datetimes for
        information on duration formats.

     --unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2
        The number of consecutive health check failures before a healthy
        instance is marked as unhealthy. The default is 2.

     At most one of these can be specified:

       --global
          If set, the gRPC with TLS health check is global.

       --region=REGION
          Region of the gRPC with TLS health check to create. If not specified,
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

     These flags configure the port that the health check monitors.

     --port=PORT
        The TCP port number that this health check monitors.

     --use-serving-port
        If given, use the "serving port" for health checks:

        * When health checking network endpoints in a Network Endpoint Group,
          use the port specified with each endpoint. --use-serving-port must be
          used when using a Network Endpoint Group as a backend as this flag
          specifies the portSpecification option for a Health Check object.
        * When health checking other backends, use the port of the backend
          service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute health-checks create grpc-with-tls

        $ gcloud beta compute health-checks create grpc-with-tls
```

### gcloud compute health-checks create http

```text
NAME
    gcloud compute health-checks create http - create a HTTP health check to
        monitor load balanced instances

SYNOPSIS
    gcloud compute health-checks create http NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2] [--host=HOST]
        [--proxy-header=PROXY_HEADER; default="NONE"]
        [--request-path=REQUEST_PATH; default="/"] [--response=RESPONSE]
        [--source-regions=REGION,...,[...]] [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION]
        [--port=PORT; default=80 --port-name=PORT_NAME --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute health-checks create http is used to create a non-legacy
    health check using the HTTP protocol. You can use this health check for
    Google Cloud load balancers or for managed instance group autohealing. For
    more information, see the health checks overview at:
    https://cloud.google.com/load-balancing/docs/health-check-concepts

POSITIONAL ARGUMENTS
     NAME
        Name of the HTTP health check to create.

FLAGS
     --check-interval=CHECK_INTERVAL; default="5s"
        How often to perform a health check for an instance. For example,
        specifying 10s will run the check every 10 seconds. The default value
        is 5s. See $ gcloud topic datetimes for information on duration
        formats.

     --description=DESCRIPTION
        An optional string description for the HTTP health check.

     --enable-logging
        Enable logging of health check probe results to Stackdriver. Logging is
        disabled by default.

        Use --no-enable-logging to disable logging.

     --healthy-threshold=HEALTHY_THRESHOLD; default=2
        The number of consecutive successful health checks before an unhealthy
        instance is marked as healthy. The default is 2.

     --host=HOST
        The value of the host header used for the health check. If unspecified,
        Google Cloud sets the host header to the IP address of the load
        balancer's forwarding rule.

     --proxy-header=PROXY_HEADER; default="NONE"
        The type of proxy protocol header to be sent to the backend.
        PROXY_HEADER must be one of:

         NONE
            No proxy header is added.
         PROXY_V1
            Adds the header "PROXY UNKNOWN\r\n".

     --request-path=REQUEST_PATH; default="/"
        The request path that this health check monitors. For example,
        /healthcheck. The default value is ``/''.

     --response=RESPONSE
        When empty, status code of the response determines health. When not
        empty, presence of specified string in first 1024 characters of
        response body determines health. Only ASCII characters allowed.

     --source-regions=REGION,...,[...]
        Define the list of Google Cloud regions from which health checks are
        performed. This option is supported only for global health checks that
        will be referenced by DNS routing policies. If specified, the
        --check-interval field should be at least 30 seconds. The
        --proxy-header and --request fields (for TCP health checks) are not
        supported with this option.

        If --source-regions is specified for a health check, then that health
        check cannot be used by a backend service or by a managed instance
        group (for autohealing).

     --timeout=TIMEOUT; default="5s"
        If Google Compute Engine doesn't receive a healthy response from the
        instance by the time specified by the value of this flag, the health
        check request is considered a failure. For example, specifying 10s will
        cause the check to wait for 10 seconds before considering the request a
        failure. The default value is 5s. See $ gcloud topic datetimes for
        information on duration formats.

     --unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2
        The number of consecutive health check failures before a healthy
        instance is marked as unhealthy. The default is 2.

     At most one of these can be specified:

       --global
          If set, the HTTP health check is global.

       --region=REGION
          Region of the HTTP health check to create. If not specified, you
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

     These flags configure the port that the health check monitors. If none is
     specified, the default port of 80 is used. If both --port and --port-name
     are specified, --port takes precedence.

     --port=PORT; default=80
        The TCP port number that this health check monitors.

     --port-name=PORT_NAME
        The port name that this health check monitors. By default, this is
        empty.

     --use-serving-port
        If given, use the "serving port" for health checks:

        * When health checking network endpoints in a Network Endpoint Group,
          use the port specified with each endpoint. --use-serving-port must be
          used when using a Network Endpoint Group as a backend as this flag
          specifies the portSpecification option for a Health Check object.
        * When health checking other backends, use the port or named port of
          the backend service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute health-checks create http

        $ gcloud beta compute health-checks create http
```

### gcloud compute health-checks create http2

```text
NAME
    gcloud compute health-checks create http2 - create a HTTP2 health check to
        monitor load balanced instances

SYNOPSIS
    gcloud compute health-checks create http2 NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2] [--host=HOST]
        [--proxy-header=PROXY_HEADER; default="NONE"]
        [--request-path=REQUEST_PATH; default="/"] [--response=RESPONSE]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION]
        [--port=PORT; default=80 --port-name=PORT_NAME --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute health-checks create http2 is used to create a non-legacy
    health check using the HTTP/2 protocol. You can use this health check for
    Google Cloud load balancers or for managed instance group autohealing. For
    more information, see the health checks overview at:
    https://cloud.google.com/load-balancing/docs/health-check-concepts

EXAMPLES
    To create a HTTP2 health check with default options, run:

        $ gcloud compute health-checks create http2 my-health-check-name

POSITIONAL ARGUMENTS
     NAME
        Name of the HTTP2 health check to create.

FLAGS
     --check-interval=CHECK_INTERVAL; default="5s"
        How often to perform a health check for an instance. For example,
        specifying 10s will run the check every 10 seconds. The default value
        is 5s. See $ gcloud topic datetimes for information on duration
        formats.

     --description=DESCRIPTION
        An optional string description for the HTTP2 health check.

     --enable-logging
        Enable logging of health check probe results to Stackdriver. Logging is
        disabled by default.

        Use --no-enable-logging to disable logging.

     --healthy-threshold=HEALTHY_THRESHOLD; default=2
        The number of consecutive successful health checks before an unhealthy
        instance is marked as healthy. The default is 2.

     --host=HOST
        The value of the host header used for the health check. If unspecified,
        Google Cloud sets the host header to the IP address of the load
        balancer's forwarding rule.

     --proxy-header=PROXY_HEADER; default="NONE"
        The type of proxy protocol header to be sent to the backend.
        PROXY_HEADER must be one of:

         NONE
            No proxy header is added.
         PROXY_V1
            Adds the header "PROXY UNKNOWN\r\n".

     --request-path=REQUEST_PATH; default="/"
        The request path that this health check monitors. For example,
        /healthcheck. The default value is ``/''.

     --response=RESPONSE
        When empty, status code of the response determines health. When not
        empty, presence of specified string in first 1024 characters of
        response body determines health. Only ASCII characters allowed.

     --timeout=TIMEOUT; default="5s"
        If Google Compute Engine doesn't receive a healthy response from the
        instance by the time specified by the value of this flag, the health
        check request is considered a failure. For example, specifying 10s will
        cause the check to wait for 10 seconds before considering the request a
        failure. The default value is 5s. See $ gcloud topic datetimes for
        information on duration formats.

     --unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2
        The number of consecutive health check failures before a healthy
        instance is marked as unhealthy. The default is 2.

     At most one of these can be specified:

       --global
          If set, the HTTP2 health check is global.

       --region=REGION
          Region of the HTTP2 health check to create. If not specified, you
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

     These flags configure the port that the health check monitors. If none is
     specified, the default port of 80 is used. If both --port and --port-name
     are specified, --port takes precedence.

     --port=PORT; default=80
        The TCP port number that this health check monitors.

     --port-name=PORT_NAME
        The port name that this health check monitors. By default, this is
        empty.

     --use-serving-port
        If given, use the "serving port" for health checks:

        * When health checking network endpoints in a Network Endpoint Group,
          use the port specified with each endpoint. --use-serving-port must be
          used when using a Network Endpoint Group as a backend as this flag
          specifies the portSpecification option for a Health Check object.
        * When health checking other backends, use the port or named port of
          the backend service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute health-checks create http2

        $ gcloud beta compute health-checks create http2
```

### gcloud compute health-checks create https

```text
NAME
    gcloud compute health-checks create https - create a HTTPS health check to
        monitor load balanced instances

SYNOPSIS
    gcloud compute health-checks create https NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2] [--host=HOST]
        [--proxy-header=PROXY_HEADER; default="NONE"]
        [--request-path=REQUEST_PATH; default="/"] [--response=RESPONSE]
        [--source-regions=REGION,...,[...]] [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION]
        [--port=PORT; default=80 --port-name=PORT_NAME --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute health-checks create https is used to create a non-legacy
    health check using the HTTPS protocol. You can use this health check for
    Google Cloud load balancers or for managed instance group autohealing. For
    more information, see the health checks overview at:
    https://cloud.google.com/load-balancing/docs/health-check-concepts

POSITIONAL ARGUMENTS
     NAME
        Name of the HTTPS health check to create.

FLAGS
     --check-interval=CHECK_INTERVAL; default="5s"
        How often to perform a health check for an instance. For example,
        specifying 10s will run the check every 10 seconds. The default value
        is 5s. See $ gcloud topic datetimes for information on duration
        formats.

     --description=DESCRIPTION
        An optional string description for the HTTPS health check.

     --enable-logging
        Enable logging of health check probe results to Stackdriver. Logging is
        disabled by default.

        Use --no-enable-logging to disable logging.

     --healthy-threshold=HEALTHY_THRESHOLD; default=2
        The number of consecutive successful health checks before an unhealthy
        instance is marked as healthy. The default is 2.

     --host=HOST
        The value of the host header used for the health check. If unspecified,
        Google Cloud sets the host header to the IP address of the load
        balancer's forwarding rule.

     --proxy-header=PROXY_HEADER; default="NONE"
        The type of proxy protocol header to be sent to the backend.
        PROXY_HEADER must be one of:

         NONE
            No proxy header is added.
         PROXY_V1
            Adds the header "PROXY UNKNOWN\r\n".

     --request-path=REQUEST_PATH; default="/"
        The request path that this health check monitors. For example,
        /healthcheck. The default value is ``/''.

     --response=RESPONSE
        When empty, status code of the response determines health. When not
        empty, presence of specified string in first 1024 characters of
        response body determines health. Only ASCII characters allowed.

     --source-regions=REGION,...,[...]
        Define the list of Google Cloud regions from which health checks are
        performed. This option is supported only for global health checks that
        will be referenced by DNS routing policies. If specified, the
        --check-interval field should be at least 30 seconds. The
        --proxy-header and --request fields (for TCP health checks) are not
        supported with this option.

        If --source-regions is specified for a health check, then that health
        check cannot be used by a backend service or by a managed instance
        group (for autohealing).

     --timeout=TIMEOUT; default="5s"
        If Google Compute Engine doesn't receive a healthy response from the
        instance by the time specified by the value of this flag, the health
        check request is considered a failure. For example, specifying 10s will
        cause the check to wait for 10 seconds before considering the request a
        failure. The default value is 5s. See $ gcloud topic datetimes for
        information on duration formats.

     --unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2
        The number of consecutive health check failures before a healthy
        instance is marked as unhealthy. The default is 2.

     At most one of these can be specified:

       --global
          If set, the HTTPS health check is global.

       --region=REGION
          Region of the HTTPS health check to create. If not specified, you
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

     These flags configure the port that the health check monitors. If none is
     specified, the default port of 80 is used. If both --port and --port-name
     are specified, --port takes precedence.

     --port=PORT; default=80
        The TCP port number that this health check monitors.

     --port-name=PORT_NAME
        The port name that this health check monitors. By default, this is
        empty.

     --use-serving-port
        If given, use the "serving port" for health checks:

        * When health checking network endpoints in a Network Endpoint Group,
          use the port specified with each endpoint. --use-serving-port must be
          used when using a Network Endpoint Group as a backend as this flag
          specifies the portSpecification option for a Health Check object.
        * When health checking other backends, use the port or named port of
          the backend service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute health-checks create https

        $ gcloud beta compute health-checks create https
```

### gcloud compute health-checks create ssl

```text
NAME
    gcloud compute health-checks create ssl - create a SSL health check to
        monitor load balanced instances

SYNOPSIS
    gcloud compute health-checks create ssl NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2]
        [--proxy-header=PROXY_HEADER; default="NONE"] [--request=REQUEST]
        [--response=RESPONSE] [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION]
        [--port=PORT; default=80 --port-name=PORT_NAME --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute health-checks create ssl is used to create a non-legacy
    health check using the SSL protocol. You can use this health check for
    Google Cloud load balancers or for managed instance group autohealing. For
    more information, see the health checks overview at:
    https://cloud.google.com/load-balancing/docs/health-check-concepts

POSITIONAL ARGUMENTS
     NAME
        Name of the SSL health check to create.

FLAGS
     --check-interval=CHECK_INTERVAL; default="5s"
        How often to perform a health check for an instance. For example,
        specifying 10s will run the check every 10 seconds. The default value
        is 5s. See $ gcloud topic datetimes for information on duration
        formats.

     --description=DESCRIPTION
        An optional string description for the SSL health check.

     --enable-logging
        Enable logging of health check probe results to Stackdriver. Logging is
        disabled by default.

        Use --no-enable-logging to disable logging.

     --healthy-threshold=HEALTHY_THRESHOLD; default=2
        The number of consecutive successful health checks before an unhealthy
        instance is marked as healthy. The default is 2.

     --proxy-header=PROXY_HEADER; default="NONE"
        The type of proxy protocol header to be sent to the backend.
        PROXY_HEADER must be one of:

         NONE
            No proxy header is added.
         PROXY_V1
            Adds the header "PROXY UNKNOWN\r\n".

     --request=REQUEST
        An optional string of up to 1024 characters to send once the health
        check TCP connection has been established. The health checker then
        looks for a reply of the string provided in the --response field.

        If --response is not configured, the health checker does not wait for a
        response and regards the probe as successful if the TCP or SSL
        handshake was successful.

     --response=RESPONSE
        An optional string of up to 1024 characters that the health checker
        expects to receive from the instance. If the response is not received
        exactly, the health check probe fails. If --response is configured, but
        not --request, the health checker will wait for a response anyway.
        Unless your system automatically sends out a message in response to a
        successful handshake, only configure --response to match an explicit
        --request.

     --timeout=TIMEOUT; default="5s"
        If Google Compute Engine doesn't receive a healthy response from the
        instance by the time specified by the value of this flag, the health
        check request is considered a failure. For example, specifying 10s will
        cause the check to wait for 10 seconds before considering the request a
        failure. The default value is 5s. See $ gcloud topic datetimes for
        information on duration formats.

     --unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2
        The number of consecutive health check failures before a healthy
        instance is marked as unhealthy. The default is 2.

     At most one of these can be specified:

       --global
          If set, the SSL health check is global.

       --region=REGION
          Region of the SSL health check to create. If not specified, you might
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

     These flags configure the port that the health check monitors. If none is
     specified, the default port of 80 is used. If both --port and --port-name
     are specified, --port takes precedence.

     --port=PORT; default=80
        The TCP port number that this health check monitors.

     --port-name=PORT_NAME
        The port name that this health check monitors. By default, this is
        empty.

     --use-serving-port
        If given, use the "serving port" for health checks:

        * When health checking network endpoints in a Network Endpoint Group,
          use the port specified with each endpoint. --use-serving-port must be
          used when using a Network Endpoint Group as a backend as this flag
          specifies the portSpecification option for a Health Check object.
        * When health checking other backends, use the port or named port of
          the backend service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute health-checks create ssl

        $ gcloud beta compute health-checks create ssl
```

### gcloud compute health-checks create tcp

```text
NAME
    gcloud compute health-checks create tcp - create a TCP health check to
        monitor load balanced instances

SYNOPSIS
    gcloud compute health-checks create tcp NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2]
        [--proxy-header=PROXY_HEADER; default="NONE"] [--request=REQUEST]
        [--response=RESPONSE] [--source-regions=REGION,...,[...]]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION]
        [--port=PORT; default=80 --port-name=PORT_NAME --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute health-checks create tcp is used to create a non-legacy
    health check using the TCP protocol. You can use this health check for
    Google Cloud load balancers or for managed instance group autohealing. For
    more information, see the health checks overview at:
    https://cloud.google.com/load-balancing/docs/health-check-concepts

POSITIONAL ARGUMENTS
     NAME
        Name of the TCP health check to create.

FLAGS
     --check-interval=CHECK_INTERVAL; default="5s"
        How often to perform a health check for an instance. For example,
        specifying 10s will run the check every 10 seconds. The default value
        is 5s. See $ gcloud topic datetimes for information on duration
        formats.

     --description=DESCRIPTION
        An optional string description for the TCP health check.

     --enable-logging
        Enable logging of health check probe results to Stackdriver. Logging is
        disabled by default.

        Use --no-enable-logging to disable logging.

     --healthy-threshold=HEALTHY_THRESHOLD; default=2
        The number of consecutive successful health checks before an unhealthy
        instance is marked as healthy. The default is 2.

     --proxy-header=PROXY_HEADER; default="NONE"
        The type of proxy protocol header to be sent to the backend.
        PROXY_HEADER must be one of:

         NONE
            No proxy header is added.
         PROXY_V1
            Adds the header "PROXY UNKNOWN\r\n".

     --request=REQUEST
        An optional string of up to 1024 characters to send once the health
        check TCP connection has been established. The health checker then
        looks for a reply of the string provided in the --response field.

        If --response is not configured, the health checker does not wait for a
        response and regards the probe as successful if the TCP or SSL
        handshake was successful.

     --response=RESPONSE
        An optional string of up to 1024 characters that the health checker
        expects to receive from the instance. If the response is not received
        exactly, the health check probe fails. If --response is configured, but
        not --request, the health checker will wait for a response anyway.
        Unless your system automatically sends out a message in response to a
        successful handshake, only configure --response to match an explicit
        --request.

     --source-regions=REGION,...,[...]
        Define the list of Google Cloud regions from which health checks are
        performed. This option is supported only for global health checks that
        will be referenced by DNS routing policies. If specified, the
        --check-interval field should be at least 30 seconds. The
        --proxy-header and --request fields (for TCP health checks) are not
        supported with this option.

        If --source-regions is specified for a health check, then that health
        check cannot be used by a backend service or by a managed instance
        group (for autohealing).

     --timeout=TIMEOUT; default="5s"
        If Google Compute Engine doesn't receive a healthy response from the
        instance by the time specified by the value of this flag, the health
        check request is considered a failure. For example, specifying 10s will
        cause the check to wait for 10 seconds before considering the request a
        failure. The default value is 5s. See $ gcloud topic datetimes for
        information on duration formats.

     --unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2
        The number of consecutive health check failures before a healthy
        instance is marked as unhealthy. The default is 2.

     At most one of these can be specified:

       --global
          If set, the TCP health check is global.

       --region=REGION
          Region of the TCP health check to create. If not specified, you might
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

     These flags configure the port that the health check monitors. If none is
     specified, the default port of 80 is used. If both --port and --port-name
     are specified, --port takes precedence.

     --port=PORT; default=80
        The TCP port number that this health check monitors.

     --port-name=PORT_NAME
        The port name that this health check monitors. By default, this is
        empty.

     --use-serving-port
        If given, use the "serving port" for health checks:

        * When health checking network endpoints in a Network Endpoint Group,
          use the port specified with each endpoint. --use-serving-port must be
          used when using a Network Endpoint Group as a backend as this flag
          specifies the portSpecification option for a Health Check object.
        * When health checking other backends, use the port or named port of
          the backend service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute health-checks create tcp

        $ gcloud beta compute health-checks create tcp
```

### gcloud beta compute health-checks create grpc

```text
NAME
    gcloud beta compute health-checks create grpc - create a gRPC health check
        to monitor load balanced instances

SYNOPSIS
    gcloud beta compute health-checks create grpc NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--grpc-service-name=GRPC_SERVICE_NAME]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION] [--port=PORT --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute health-checks create grpc-with-tls

```text
NAME
    gcloud beta compute health-checks create grpc-with-tls - create a gRPC with
        TLS health check to monitor load balanced instances

SYNOPSIS
    gcloud beta compute health-checks create grpc-with-tls NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--grpc-service-name=GRPC_SERVICE_NAME]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION] [--port=PORT --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute health-checks create http

```text
NAME
    gcloud beta compute health-checks create http - create a HTTP health check
        to monitor load balanced instances

SYNOPSIS
    gcloud beta compute health-checks create http NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2] [--host=HOST]
        [--proxy-header=PROXY_HEADER; default="NONE"]
        [--request-path=REQUEST_PATH; default="/"] [--response=RESPONSE]
        [--source-regions=REGION,...,[...]] [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION]
        [--port=PORT; default=80 --port-name=PORT_NAME --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute health-checks create http2

```text
NAME
    gcloud beta compute health-checks create http2 - create a HTTP2 health
        check to monitor load balanced instances

SYNOPSIS
    gcloud beta compute health-checks create http2 NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2] [--host=HOST]
        [--proxy-header=PROXY_HEADER; default="NONE"]
        [--request-path=REQUEST_PATH; default="/"] [--response=RESPONSE]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION]
        [--port=PORT; default=80 --port-name=PORT_NAME --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute health-checks create https

```text
NAME
    gcloud beta compute health-checks create https - create a HTTPS health
        check to monitor load balanced instances

SYNOPSIS
    gcloud beta compute health-checks create https NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2] [--host=HOST]
        [--proxy-header=PROXY_HEADER; default="NONE"]
        [--request-path=REQUEST_PATH; default="/"] [--response=RESPONSE]
        [--source-regions=REGION,...,[...]] [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION]
        [--port=PORT; default=80 --port-name=PORT_NAME --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute health-checks create ssl

```text
NAME
    gcloud beta compute health-checks create ssl - create a SSL health check to
        monitor load balanced instances

SYNOPSIS
    gcloud beta compute health-checks create ssl NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2]
        [--proxy-header=PROXY_HEADER; default="NONE"] [--request=REQUEST]
        [--response=RESPONSE] [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION]
        [--port=PORT; default=80 --port-name=PORT_NAME --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute health-checks create tcp

```text
NAME
    gcloud beta compute health-checks create tcp - create a TCP health check to
        monitor load balanced instances

SYNOPSIS
    gcloud beta compute health-checks create tcp NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2]
        [--proxy-header=PROXY_HEADER; default="NONE"] [--request=REQUEST]
        [--response=RESPONSE] [--source-regions=REGION,...,[...]]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION]
        [--port=PORT; default=80 --port-name=PORT_NAME --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-checks create grpc

```text
NAME
    gcloud alpha compute health-checks create grpc - create a gRPC health check
        to monitor load balanced instances

SYNOPSIS
    gcloud alpha compute health-checks create grpc NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--grpc-service-name=GRPC_SERVICE_NAME]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION] [--port=PORT --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-checks create grpc-with-tls

```text
NAME
    gcloud alpha compute health-checks create grpc-with-tls - create a gRPC
        with TLS health check to monitor load balanced instances

SYNOPSIS
    gcloud alpha compute health-checks create grpc-with-tls NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--grpc-service-name=GRPC_SERVICE_NAME]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION] [--port=PORT --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-checks create http

```text
NAME
    gcloud alpha compute health-checks create http - create a HTTP health check
        to monitor load balanced instances

SYNOPSIS
    gcloud alpha compute health-checks create http NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2] [--host=HOST]
        [--proxy-header=PROXY_HEADER; default="NONE"]
        [--request-path=REQUEST_PATH; default="/"] [--response=RESPONSE]
        [--source-regions=REGION,...,[...]] [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--weight-report-mode=WEIGHT_REPORT_MODE] [--global | --region=REGION]
        [--port=PORT; default=80 --port-name=PORT_NAME --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-checks create http2

```text
NAME
    gcloud alpha compute health-checks create http2 - create a HTTP2 health
        check to monitor load balanced instances

SYNOPSIS
    gcloud alpha compute health-checks create http2 NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2] [--host=HOST]
        [--proxy-header=PROXY_HEADER; default="NONE"]
        [--request-path=REQUEST_PATH; default="/"] [--response=RESPONSE]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--weight-report-mode=WEIGHT_REPORT_MODE] [--global | --region=REGION]
        [--port=PORT; default=80 --port-name=PORT_NAME --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-checks create https

```text
NAME
    gcloud alpha compute health-checks create https - create a HTTPS health
        check to monitor load balanced instances

SYNOPSIS
    gcloud alpha compute health-checks create https NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2] [--host=HOST]
        [--proxy-header=PROXY_HEADER; default="NONE"]
        [--request-path=REQUEST_PATH; default="/"] [--response=RESPONSE]
        [--source-regions=REGION,...,[...]] [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--weight-report-mode=WEIGHT_REPORT_MODE] [--global | --region=REGION]
        [--port=PORT; default=80 --port-name=PORT_NAME --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-checks create ssl

```text
NAME
    gcloud alpha compute health-checks create ssl - create a SSL health check
        to monitor load balanced instances

SYNOPSIS
    gcloud alpha compute health-checks create ssl NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2]
        [--proxy-header=PROXY_HEADER; default="NONE"] [--request=REQUEST]
        [--response=RESPONSE] [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION]
        [--port=PORT; default=80 --port-name=PORT_NAME --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-checks create tcp

```text
NAME
    gcloud alpha compute health-checks create tcp - create a TCP health check
        to monitor load balanced instances

SYNOPSIS
    gcloud alpha compute health-checks create tcp NAME
        [--check-interval=CHECK_INTERVAL; default="5s"]
        [--description=DESCRIPTION] [--enable-logging]
        [--healthy-threshold=HEALTHY_THRESHOLD; default=2]
        [--proxy-header=PROXY_HEADER; default="NONE"] [--request=REQUEST]
        [--response=RESPONSE] [--source-regions=REGION,...,[...]]
        [--timeout=TIMEOUT; default="5s"]
        [--unhealthy-threshold=UNHEALTHY_THRESHOLD; default=2]
        [--global | --region=REGION]
        [--port=PORT; default=80 --port-name=PORT_NAME --use-serving-port]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/health-checks/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
