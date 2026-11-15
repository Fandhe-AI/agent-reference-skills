---
source: https://docs.cloud.google.com/sdk/gcloud/reference/services/vpc-peerings
---

# gcloud services vpc-peerings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud services vpc-peerings connect

```text
NAME
    gcloud services vpc-peerings connect - connect to a service via VPC peering
        for a project network

SYNOPSIS
    gcloud services vpc-peerings connect --network=NETWORK --ranges=RANGES
        [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command connects a private service connection to a service via a VPC
    network.

EXAMPLES
    To connect a network called my-network on the current project to a service
    called your-service with IP CIDR ranges google-range-1,google-range-2 for
    the service to use, run:

        $ gcloud services vpc-peerings connect --network=my-network \
            --service=your-service --ranges=google-range-1,google-range-2

    To run the same command asynchronously (non-blocking), run:

        $ gcloud services vpc-peerings connect --network=my-network \
            --service=your-service --ranges=google-range-1,google-range-2 \
            --async

REQUIRED FLAGS
     --network=NETWORK
        The network in the current project to be peered with the service

     --ranges=RANGES
        The names of IP CIDR ranges for service to use.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --service=SERVICE; default="servicenetworking.googleapis.com"
        The service to connect to

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services vpc-peerings connect

        $ gcloud beta services vpc-peerings connect
```

### gcloud services vpc-peerings delete

```text
NAME
    gcloud services vpc-peerings delete - delete a private service connection
        to a service for a project network

SYNOPSIS
    gcloud services vpc-peerings delete --network=NETWORK [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command deletes a private service connection to a service via a VPC
    network.

EXAMPLES
    To delete an existing connection for a network called my-network on the
    current project to a service called your-service run:

        $ gcloud services vpc-peerings delete --network=my-network \
            --service=your-service

    To run the same command asynchronously (non-blocking), run:

        $ gcloud services vpc-peerings delete --network=my-network \
            --service=your-service --async

REQUIRED FLAGS
     --network=NETWORK
        The network in the current project which is peered with the service

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --service=SERVICE; default="servicenetworking.googleapis.com"
        The service to connect to

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services vpc-peerings delete

        $ gcloud beta services vpc-peerings delete
```

### gcloud services vpc-peerings disable-vpc-service-controls

```text
NAME
    gcloud services vpc-peerings disable-vpc-service-controls - disable VPC
        Service Controls for the peering connection

SYNOPSIS
    gcloud services vpc-peerings disable-vpc-service-controls --network=NETWORK
        [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command disables VPC Service Controls for the peering connection.

    The local default route (destination 0.0.0.0/0, next hop default internet
    gateway) is recreated in the service producer VPC network. After the route
    is recreated, the service producer VPC network cannot import a custom
    default route from the peering connection to the customer VPC network.

EXAMPLES
    To disable VPC Service Controls for a connection peering a network called
    my-network on the current project to a service called your-service, run:

        $ gcloud services vpc-peerings disable-vpc-service-controls \
            --network=my-network --service=your-service

    To run the same command asynchronously (non-blocking), run:

        $ gcloud services vpc-peerings disable-vpc-service-controls \
            --network=my-network --service=your-service --async

REQUIRED FLAGS
     --network=NETWORK
        The network in the current project that is peered with the service.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --service=SERVICE; default="servicenetworking.googleapis.com"
        The service to enable VPC service controls for.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services vpc-peerings disable-vpc-service-controls

        $ gcloud beta services vpc-peerings disable-vpc-service-controls
```

### gcloud services vpc-peerings enable-vpc-service-controls

```text
NAME
    gcloud services vpc-peerings enable-vpc-service-controls - enable VPC
        Service Controls for the peering connection

SYNOPSIS
    gcloud services vpc-peerings enable-vpc-service-controls --network=NETWORK
        [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command configures IPv4 routes and DNS zones applicable to a service
    producer VPC network (for example, servicenetworking). The route and DNS
    configuration match those recommended for using the
    restricted.googleapis.com VIP:

    When enabled, Google Cloud makes the following route configuration changes
    in the service producer VPC network: Google Cloud removes the IPv4 default
    route (destination 0.0.0.0/0, next hop default internet gateway). Google
    Cloud then creates an IPv4 route for destination 199.36.153.4/30 using the
    default internet gateway next hop.

    When enabled, Google Cloud also creates Cloud DNS managed private zones and
    authorizes those zones for the service producer VPC network. The zones
    include googleapis.com, pkg.dev, gcr.io, and other necessary domains or
    host names for Google APIs and services that are compatible with VPC
    Service Controls. Record data in the zones resolves all host names to
    199.36.153.4, 199.36.153.5, 199.36.153.6, and 199.36.153.7.

    When disabled, Google Cloud makes the following route configuration changes
    in the service producer VPC network: Google Cloud restores a default route
    (destination 0.0.0.0/0, next hop default internet gateway). Google Cloud
    also deletes the Cloud DNS managed private zones that provided the host
    name overrides.

    While enabled, the service producer VPC network can still import static and
    dynamic routes from the peered customer network if you enable custom route
    export. These custom routes can include a default route. For this reason,
    this command is not to be used solely as a means for preventing access to
    the internet.

EXAMPLES
    To enable VPC Service Controls for a connection peering a network called
    my-network on the current project to a service called your-service, run:

        $ gcloud services vpc-peerings enable-vpc-service-controls \
            --network=my-network --service=your-service

    To run the same command asynchronously (non-blocking), run:

        $ gcloud services vpc-peerings enable-vpc-service-controls \
            --network=my-network --service=your-service --async

REQUIRED FLAGS
     --network=NETWORK
        The network in the current project that is peered with the service.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --service=SERVICE; default="servicenetworking.googleapis.com"
        The service to enable VPC service controls for.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services vpc-peerings enable-vpc-service-controls

        $ gcloud beta services vpc-peerings enable-vpc-service-controls
```

### gcloud services vpc-peerings get-vpc-service-controls

```text
NAME
    gcloud services vpc-peerings get-vpc-service-controls - get VPC state of
        Service Controls for the peering connection

SYNOPSIS
    gcloud services vpc-peerings get-vpc-service-controls --network=NETWORK
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command provides the state of the VPC Service Controls for a
    connection. The state can be enabled or disabled.

    When enabled, Google Cloud makes the following route configuration changes
    in the service producer VPC network: Google Cloud removes the IPv4 default
    route (destination 0.0.0.0/0, next hop default internet gateway), Google
    Cloud then creates an IPv4 route for destination 199.36.153.4/30 using the
    default internet gateway next hop.

    When enabled, Google Cloud also creates Cloud DNS managed private zones and
    authorizes those zones for the service producer VPC network. The zones
    include googleapis.com, gcr.io, pkg.dev, notebooks.cloud.google.com,
    kernels.googleusercontent.com, backupdr.cloud.google.com, and
    backupdr.googleusercontent.com as necessary domains or host names for
    Google APIs and services that are compatible with VPC Service Controls.
    Record data in the zones resolves all host names to 199.36.153.4,
    199.36.153.5, 199.36.153.6, and 199.36.153.7.

    When disabled, Google Cloud makes the following route configuration changes
    in the service producer VPC network: Google Cloud restores a default route
    (destination 0.0.0.0/0, next hop default internet gateway), Google Cloud
    also deletes the Cloud DNS managed private zones that provided the host
    name overrides.

    While enabled, the service producer VPC network can still import static and
    dynamic routes from the peered customer network if you enable custom route
    export. These custom routes can include a default route. For this reason,
    this command is not to be used solely as a means for preventing access to
    the internet.

EXAMPLES
    To get the status of the VPC Service Controls for a connection peering a
    network called my-network on the current project to a service called
    your-service, run:

        $ gcloud services vpc-peerings get-vpc-service-controls \
            --network=my-network --service=your-service

REQUIRED FLAGS
     --network=NETWORK
        The network in the current project that is peered with the service.

OPTIONAL FLAGS
     --service=SERVICE; default="servicenetworking.googleapis.com"
        The service to get VPC service controls for.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services vpc-peerings get-vpc-service-controls

        $ gcloud beta services vpc-peerings get-vpc-service-controls
```

### gcloud services vpc-peerings list

```text
NAME
    gcloud services vpc-peerings list - list connections to a service via VPC
        peering for a project network

SYNOPSIS
    gcloud services vpc-peerings list --network=NETWORK [--service=SERVICE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command lists connections of a network to a service via VPC peering
    for a project.

EXAMPLES
    To list connections of a network called my-network to a service called
    your-service, run:

        $ gcloud services vpc-peerings list --network=my-network \
            --service=your-service

    To list connections of a network against all services, run:

        $ gcloud services vpc-peerings list --network=my-network

REQUIRED FLAGS
     --network=NETWORK
        The network in the current project to list connections with the service

OPTIONAL FLAGS
     --service=SERVICE
        The service to list connections

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services vpc-peerings list

        $ gcloud beta services vpc-peerings list
```

### gcloud services vpc-peerings operations describe

```text
NAME
    gcloud services vpc-peerings operations describe - describes an operation
        resource for a given operation name

SYNOPSIS
    gcloud services vpc-peerings operations describe --name=OPERATION_NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command will return information about an operation given the name of
    that operation.

EXAMPLES
    To describe an operation resource named operations/abc, run:

        $ gcloud services vpc-peerings operations describe \
            --name=operations/abc

REQUIRED FLAGS
     --name=OPERATION_NAME
        The name of operation to describe

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services vpc-peerings operations describe

        $ gcloud beta services vpc-peerings operations describe
```

### gcloud services vpc-peerings operations wait

```text
NAME
    gcloud services vpc-peerings operations wait - waits for an operation to
        complete for a given operation name

SYNOPSIS
    gcloud services vpc-peerings operations wait --name=OPERATION_NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command will block until an operation has been marked as complete.

EXAMPLES
    To wait on an operation named operations/abc to complete, run:

        $ gcloud services vpc-peerings operations wait --name=operations/abc

REQUIRED FLAGS
     --name=OPERATION_NAME
        The name of operation to wait

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services vpc-peerings operations wait

        $ gcloud beta services vpc-peerings operations wait
```

### gcloud services vpc-peerings update

```text
NAME
    gcloud services vpc-peerings update - update a private service connection
        to a service for a project network

SYNOPSIS
    gcloud services vpc-peerings update --network=NETWORK [--async] [--force]
        [--ranges=RANGES]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command updates a private service connection to a service via a VPC
    network.

EXAMPLES
    To update connection for a network called my-network on the current project
    to a service called your-service with IP CIDR ranges
    google-range-1,google-range-2 for the service to use, run:

        $ gcloud services vpc-peerings update --network=my-network \
            --service=your-service --ranges=google-range-1,google-range-2

    To run the same command asynchronously (non-blocking), run:

        $ gcloud services vpc-peerings update --network=my-network \
            --service=your-service --ranges=google-range-1,google-range-2 \
            --async

REQUIRED FLAGS
     --network=NETWORK
        The network in the current project to be peered with the service

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --force
        If specified, the update call will proceed even if the update can be
        destructive.

     --ranges=RANGES
        The names of IP CIDR ranges for service to use.

     --service=SERVICE; default="servicenetworking.googleapis.com"
        The service to connect to

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services vpc-peerings update

        $ gcloud beta services vpc-peerings update
```

### gcloud beta services vpc-peerings connect

```text
NAME
    gcloud beta services vpc-peerings connect - connect to a service via VPC
        peering for a project network

SYNOPSIS
    gcloud beta services vpc-peerings connect --network=NETWORK --ranges=RANGES
        [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services vpc-peerings delete

```text
NAME
    gcloud beta services vpc-peerings delete - delete a private service
        connection to a service for a project network

SYNOPSIS
    gcloud beta services vpc-peerings delete --network=NETWORK [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services vpc-peerings disable-vpc-service-controls

```text
NAME
    gcloud beta services vpc-peerings disable-vpc-service-controls - disable
        VPC Service Controls for the peering connection

SYNOPSIS
    gcloud beta services vpc-peerings disable-vpc-service-controls
        --network=NETWORK [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services vpc-peerings enable-vpc-service-controls

```text
NAME
    gcloud beta services vpc-peerings enable-vpc-service-controls - enable VPC
        Service Controls for the peering connection

SYNOPSIS
    gcloud beta services vpc-peerings enable-vpc-service-controls
        --network=NETWORK [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services vpc-peerings get-vpc-service-controls

```text
NAME
    gcloud beta services vpc-peerings get-vpc-service-controls - get VPC state
        of Service Controls for the peering connection

SYNOPSIS
    gcloud beta services vpc-peerings get-vpc-service-controls
        --network=NETWORK
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services vpc-peerings list

```text
NAME
    gcloud beta services vpc-peerings list - list connections to a service via
        VPC peering for a project network

SYNOPSIS
    gcloud beta services vpc-peerings list --network=NETWORK
        [--service=SERVICE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services vpc-peerings operations describe

```text
NAME
    gcloud beta services vpc-peerings operations describe - describes an
        operation resource for a given operation name

SYNOPSIS
    gcloud beta services vpc-peerings operations describe --name=OPERATION_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services vpc-peerings operations wait

```text
NAME
    gcloud beta services vpc-peerings operations wait - waits for an operation
        to complete for a given operation name

SYNOPSIS
    gcloud beta services vpc-peerings operations wait --name=OPERATION_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services vpc-peerings update

```text
NAME
    gcloud beta services vpc-peerings update - update a private service
        connection to a service for a project network

SYNOPSIS
    gcloud beta services vpc-peerings update --network=NETWORK [--async]
        [--force] [--ranges=RANGES]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services vpc-peerings connect

```text
NAME
    gcloud alpha services vpc-peerings connect - connect to a service via VPC
        peering for a project network

SYNOPSIS
    gcloud alpha services vpc-peerings connect --network=NETWORK
        --ranges=RANGES [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services vpc-peerings delete

```text
NAME
    gcloud alpha services vpc-peerings delete - delete a private service
        connection to a service for a project network

SYNOPSIS
    gcloud alpha services vpc-peerings delete --network=NETWORK [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services vpc-peerings disable-vpc-service-controls

```text
NAME
    gcloud alpha services vpc-peerings disable-vpc-service-controls - disable
        VPC Service Controls for the peering connection

SYNOPSIS
    gcloud alpha services vpc-peerings disable-vpc-service-controls
        --network=NETWORK [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services vpc-peerings enable-vpc-service-controls

```text
NAME
    gcloud alpha services vpc-peerings enable-vpc-service-controls - enable VPC
        Service Controls for the peering connection

SYNOPSIS
    gcloud alpha services vpc-peerings enable-vpc-service-controls
        --network=NETWORK [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services vpc-peerings get-vpc-service-controls

```text
NAME
    gcloud alpha services vpc-peerings get-vpc-service-controls - get VPC state
        of Service Controls for the peering connection

SYNOPSIS
    gcloud alpha services vpc-peerings get-vpc-service-controls
        --network=NETWORK
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services vpc-peerings list

```text
NAME
    gcloud alpha services vpc-peerings list - list connections to a service via
        VPC peering for a project network

SYNOPSIS
    gcloud alpha services vpc-peerings list --network=NETWORK
        [--service=SERVICE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services vpc-peerings operations describe

```text
NAME
    gcloud alpha services vpc-peerings operations describe - describes an
        operation resource for a given operation name

SYNOPSIS
    gcloud alpha services vpc-peerings operations describe
        --name=OPERATION_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services vpc-peerings operations wait

```text
NAME
    gcloud alpha services vpc-peerings operations wait - waits for an operation
        to complete for a given operation name

SYNOPSIS
    gcloud alpha services vpc-peerings operations wait --name=OPERATION_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services vpc-peerings update

```text
NAME
    gcloud alpha services vpc-peerings update - update a private service
        connection to a service for a project network

SYNOPSIS
    gcloud alpha services vpc-peerings update --network=NETWORK [--async]
        [--force] [--ranges=RANGES]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/services/vpc-peerings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
