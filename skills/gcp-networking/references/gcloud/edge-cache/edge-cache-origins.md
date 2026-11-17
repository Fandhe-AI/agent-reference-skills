---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cache/origins
---

# gcloud edge-cache origins

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cache origins create

```text
NAME
    gcloud edge-cache origins create - create an EdgeCacheOrigin resource

SYNOPSIS
    gcloud edge-cache origins create (ORIGIN : --location=LOCATION)
        --origin-address=ORIGIN_ADDRESS [--async] [--description=DESCRIPTION]
        [--failover-origin=FAILOVER_ORIGIN] [--flex-shielding=FLEX_SHIELDING]
        [--labels=[KEY=VALUE,...]] [--max-attempts=MAX_ATTEMPTS] [--port=PORT]
        [--protocol=PROTOCOL] [--response-timeout=RESPONSE_TIMEOUT]
        [--retry-conditions=[RETRY_CONDITIONS,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new EdgeCacheOrigin resource.

EXAMPLES
    To create a EdgeCacheOrigin resource called 'my-origin', run:

        $ gcloud edge-cache origins create my-origin \
            --origin-address="origin.example.com"

POSITIONAL ARGUMENTS
     Origin resource - The name of the EdgeCacheOrigin resource to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument origin on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ORIGIN
          ID of the origin or fully qualified identifier for the origin.

          To set the origin attribute:
          + provide the argument origin on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument origin on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

REQUIRED FLAGS
     --origin-address=ORIGIN_ADDRESS
        A fully qualified domain name (FQDN) or IP address reachable over the
        public Internet, or the address of a Google Cloud Storage bucket.

        This address will be used as the origin for cache requests - e.g.
        * FQDN: media-backend.example.com
        * IPv4: 35.218.1.1
        * IPv6: [2607:f8b0:4012:809::200e]
        * Cloud Storage: gs://bucketname

        When providing an FQDN (hostname), it must be publicly resolvable (e.g.
        via Google public DNS) and IP addresses must be publicly routable. If a
        Cloud Storage bucket is provided, it must be in the canonical
        "gs://bucketname" format. Other forms, such as
        "storage.googleapis.com", will be rejected.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Human-readable description of the resource.

     --failover-origin=FAILOVER_ORIGIN
        Origin resource to try when the current origin cannot be reached. After
        maxAttempts is reached, the configured failoverOrigin will be used to
        fulfil the request.

        For example, the following are both valid URLs to an EdgeCacheOrigin
        resource:

        * /projects/PROJECT/locations/global/edgeCacheOrigins/yourOrigin
        * yourOrigin

        The value of timeout.maxAttemptsTimeout dictates the timeout across all
        origins.

     --flex-shielding=FLEX_SHIELDING
        Whenever possible, content will be fetched from origin and cached in or
        near the specified region. Best effort.

        Defaults to default global origin shielding. You may specify at most
        one region. An empty flag turns off flex shielding.

        FLEX_SHIELDING must be one of:

         **
            Turn off flexible shielding and use the default global origin
            shielding.

         africa_south1
            Origin fetch from near africa-south1.

         europe_west3
            Origin fetch from near europe-west3.

         me_central1
            Origin fetch from near me-central1.

         us_east5
            Origin fetch from near us-east5.

     --labels=[KEY=VALUE,...]
        List of KEY=VALUE labels to attach to this resource.

     --max-attempts=MAX_ATTEMPTS
        Maximum number of attempts to cache fill from this origin. Another
        attempt is made when a cache fill fails with one of the
        retry_conditions.

        Once max_attempts to this origin have failed the failover_origin will
        be used, if one is specified. That failover_origin may specify its own
        max_attempts, retry_conditions and failover_origin to control its own
        cache fill failures.

        The total number of allowed attempts to cache fill across this and
        failover origins is limited to four. The total time allowed for cache
        fill attempts across this and failover origins can be controlled with
        max_attempts_timeout.

        The last valid response from an origin will be returned to the client.
        If no origin returns a valid response, an HTTP 503 will be returned to
        the client.

        Defaults to 1. Must be a value greater than 0 and less than 4.

     --port=PORT
        Port to connect to the origin on. Defaults to port 443 for HTTP2 and
        HTTPS protocols, and port 80 for HTTP.

     --protocol=PROTOCOL
        Protocol to use to connect to the configured origin. Defaults to HTTP2,
        and it is strongly recommended that users use HTTP2 for both security &
        performance.

        When using HTTP2 or HTTPS as the protocol, a valid, publicly-signed,
        unexpired TLS (SSL) certificate must be presented by the origin server.

        PROTOCOL must be one of:

         http
            HTTP without TLS (SSL). This is not recommended, as communication
            outside of Google's network will be unencrypted to the public
            endpoint (origin).

         http2
            HTTP/2 protocol. HTTP/2 refers to "h2", which requires TLS (HTTPS).
            Requires a valid (public, unexpired) TLS certificate to be present
            on the origin.

         https
            HTTP/1.1 with TLS (SSL). Requires a valid (public, unexpired) TLS
            certificate to be present on the origin.

     --response-timeout=RESPONSE_TIMEOUT
        Maximum duration to wait for data to arrive when reading from the HTTP
        connection/stream.

        Defaults to 5 seconds. The timeout must be a value between 1s and 30s.

     --retry-conditions=[RETRY_CONDITIONS,...]
        Specifies one or more retry conditions for the configured origin.

        If the failure mode during a connection attempt to the origin matches
        the configured retryCondition(s), the origin request will be retried up
        to maxAttempts times. The failoverOrigin, if configured, will then be
        used to satisfy the request.

        The default retryCondition is "connect-failure".

        retryConditions apply to this origin, and not subsequent
        failoverOrigin(s), which may specify their own retryConditions and
        maxAttempts.

        Valid values are:

        * connect-failure: Retry on failures connecting to origins, for
          example due to connection timeouts.
        * http-5xx: Retry if the origin responds with any 5xx response code,
          or if the origin does not respond at all, example: disconnects,
          reset, read timeout, connection failure, and refused streams.
        * gateway-error: Similar to 5xx, but only applies to response codes
          502, 503 or 504.
        * retriable-4xx: Retry for retriable 4xx response codes, which
          include HTTP 409 (Conflict) and HTTP 429 (Too Many Requests)
        * not-found: Retry if the origin returns a HTTP 404 (Not Found). This
          can be useful when generating video content, and the segment is not
          available yet.

        RETRY_CONDITIONS must be one of: connect-failure, forbidden,
        gateway-error, http-5xx, not-found, retriable-4xx,
        retry-conditions-unspecified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud alpha edge-cache origins create
```

### gcloud edge-cache origins delete

```text
NAME
    gcloud edge-cache origins delete - delete an EdgeCacheOrigin resource

SYNOPSIS
    gcloud edge-cache origins delete (ORIGIN : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a EdgeCacheOrigin resource.

EXAMPLES
    To delete a EdgeCacheOrigin resource called 'my-origin', run:

        $ gcloud edge-cache origins delete my-origin

POSITIONAL ARGUMENTS
     Origin resource - The name of the EdgeCacheOrigin resource to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument origin on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ORIGIN
          ID of the origin or fully qualified identifier for the origin.

          To set the origin attribute:
          + provide the argument origin on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument origin on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

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
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud alpha edge-cache origins delete
```

### gcloud edge-cache origins describe

```text
NAME
    gcloud edge-cache origins describe - show details about an EdgeCacheOrigin
        resource

SYNOPSIS
    gcloud edge-cache origins describe (ORIGIN : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about an EdgeCacheOrigin resource.

EXAMPLES
    To show details about an EdgeCacheOrigin resource named 'my-origin', run:

        $ gcloud edge-cache origins describe my-origin

POSITIONAL ARGUMENTS
     Origin resource - The EdgeCacheOrigin resource you want to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument origin on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ORIGIN
          ID of the origin or fully qualified identifier for the origin.

          To set the origin attribute:
          + provide the argument origin on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument origin on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud alpha edge-cache origins describe
```

### gcloud edge-cache origins export

```text
NAME
    gcloud edge-cache origins export - export an EdgeCacheOrigin resource

SYNOPSIS
    gcloud edge-cache origins export (ORIGIN : --location=LOCATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export an EdgeCacheOrigin resource to YAML.

EXAMPLES
    To export an EdgeCacheOrigin resource named 'my-origin', run:

        $ gcloud edge-cache origins export my-origin \
            --destination=my-origin.yaml

POSITIONAL ARGUMENTS
     Origin resource - The EdgeCacheOrigin resource you want to export. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument origin on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ORIGIN
          ID of the origin or fully qualified identifier for the origin.

          To set the origin attribute:
          + provide the argument origin on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument origin on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

FLAGS
     --destination=DESTINATION
        Path to a YAML file where the configuration will be exported. The
        exported data will not contain any output-only fields. Alternatively,
        you may omit this flag to write to standard output. For a schema
        describing the export/import format, see
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/...

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud alpha edge-cache origins export
```

### gcloud edge-cache origins import

```text
NAME
    gcloud edge-cache origins import - import an EdgeCacheOrigin resource

SYNOPSIS
    gcloud edge-cache origins import (ORIGIN : --location=LOCATION) [--async]
        [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Import an EdgeCacheOrigin resource. If the named EdgeCacheOrigin resource
    already exists, the resource will be updated to match the imported resource
    configuration.

    If the named EdgeCacheOrigin resource does not already exist, a new
    EdgeCacheOrigin resource will be created with that name.

EXAMPLES
    To import an EdgeCacheOrigin resource named 'my-origin' from a YAML file,
    run:

        $ gcloud edge-cache origins import my-origin --source=my-origin.yaml

POSITIONAL ARGUMENTS
     Origin resource - The EdgeCacheOrigin resource you want to import. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument origin on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ORIGIN
          ID of the origin or fully qualified identifier for the origin.

          To set the origin attribute:
          + provide the argument origin on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument origin on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --source=SOURCE
        Path to a YAML file containing the configuration export data. The YAML
        file must not contain any output-only fields. Alternatively, you may
        omit this flag to read from standard input. For a schema describing the
        export/import format, see: $CLOUDSDKROOT/lib/googlecloudsdk/schemas/...

        $CLOUDSDKROOT is can be obtained with the following command:

            $ gcloud info --format='value(installation.sdk_root)'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud alpha edge-cache origins import
```

### gcloud edge-cache origins list

```text
NAME
    gcloud edge-cache origins list - list all EdgeCacheOrigin resources in a
        project

SYNOPSIS
    gcloud edge-cache origins list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List EdgeCacheOrigin resources.

EXAMPLES
    To list existing EdgeCacheOrigin resources, run:

        $ gcloud edge-cache origins list

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
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud alpha edge-cache origins list
```

### gcloud edge-cache origins update

```text
NAME
    gcloud edge-cache origins update - update an EdgeCacheOrigin resource

SYNOPSIS
    gcloud edge-cache origins update (ORIGIN : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--failover-origin=FAILOVER_ORIGIN]
        [--flex-shielding=FLEX_SHIELDING] [--labels=[KEY=VALUE,...]]
        [--max-attempts=MAX_ATTEMPTS] [--origin-address=ORIGIN_ADDRESS]
        [--port=PORT] [--protocol=PROTOCOL]
        [--response-timeout=RESPONSE_TIMEOUT]
        [--retry-conditions=[RETRY_CONDITIONS,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing EdgeCacheOrigin resource.

EXAMPLES
    To update an EdgeCacheOrigin resource named 'my-origin', run:

        $ gcloud edge-cache origins update my-origin \
            --origin-address=new-origin.example.com

POSITIONAL ARGUMENTS
     Origin resource - The name of the EdgeCacheOrigin resource to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument origin on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ORIGIN
          ID of the origin or fully qualified identifier for the origin.

          To set the origin attribute:
          + provide the argument origin on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument origin on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Human-readable description of the resource.

     --failover-origin=FAILOVER_ORIGIN
        Origin resource to try when the current origin cannot be reached. After
        maxAttempts is reached, the configured failoverOrigin will be used to
        fulfil the request.

        For example, the following are both valid URLs to an EdgeCacheOrigin
        resource:

        * /projects/PROJECT/locations/global/edgeCacheOrigins/yourOrigin
        * yourOrigin

        The value of timeout.maxAttemptsTimeout dictates the timeout across all
        origins.

     --flex-shielding=FLEX_SHIELDING
        Whenever possible, content will be fetched from origin and cached in or
        near the specified region. Best effort.

        Defaults to default global origin shielding. You may specify at most
        one region. An empty flag turns off flex shielding.

        FLEX_SHIELDING must be one of:

         **
            Turn off flexible shielding and use the default global origin
            shielding.

         africa_south1
            Origin fetch from near africa-south1.

         europe_west3
            Origin fetch from near europe-west3.

         me_central1
            Origin fetch from near me-central1.

         us_east5
            Origin fetch from near us-east5.

     --labels=[KEY=VALUE,...]
        List of KEY=VALUE labels to attach to this resource.

     --max-attempts=MAX_ATTEMPTS
        Maximum number of attempts to cache fill from this origin. Another
        attempt is made when a cache fill fails with one of the
        retry_conditions.

        Once max_attempts to this origin have failed the failover_origin will
        be used, if one is specified. That failover_origin may specify its own
        max_attempts, retry_conditions and failover_origin to control its own
        cache fill failures.

        The total number of allowed attempts to cache fill across this and
        failover origins is limited to four. The total time allowed for cache
        fill attempts across this and failover origins can be controlled with
        max_attempts_timeout.

        The last valid response from an origin will be returned to the client.
        If no origin returns a valid response, an HTTP 503 will be returned to
        the client.

        Defaults to 1. Must be a value greater than 0 and less than 4.

     --origin-address=ORIGIN_ADDRESS
        A fully qualified domain name (FQDN) or IP address reachable over the
        public Internet, or the address of a Google Cloud Storage bucket.

        This address will be used as the origin for cache requests - e.g.
        * FQDN: media-backend.example.com
        * IPv4: 35.218.1.1
        * IPv6: [2607:f8b0:4012:809::200e]
        * Cloud Storage: gs://bucketname

        When providing an FQDN (hostname), it must be publicly resolvable (e.g.
        via Google public DNS) and IP addresses must be publicly routable. If a
        Cloud Storage bucket is provided, it must be in the canonical
        "gs://bucketname" format. Other forms, such as
        "storage.googleapis.com", will be rejected.

     --port=PORT
        Port to connect to the origin on. Defaults to port 443 for HTTP2 and
        HTTPS protocols, and port 80 for HTTP.

     --protocol=PROTOCOL
        Protocol to use to connect to the configured origin. Defaults to HTTP2,
        and it is strongly recommended that users use HTTP2 for both security &
        performance.

        When using HTTP2 or HTTPS as the protocol, a valid, publicly-signed,
        unexpired TLS (SSL) certificate must be presented by the origin server.

        PROTOCOL must be one of:

         http
            HTTP without TLS (SSL). This is not recommended, as communication
            outside of Google's network will be unencrypted to the public
            endpoint (origin).

         http2
            HTTP/2 protocol. HTTP/2 refers to "h2", which requires TLS (HTTPS).
            Requires a valid (public, unexpired) TLS certificate to be present
            on the origin.

         https
            HTTP/1.1 with TLS (SSL). Requires a valid (public, unexpired) TLS
            certificate to be present on the origin.

     --response-timeout=RESPONSE_TIMEOUT
        Maximum duration to wait for data to arrive when reading from the HTTP
        connection/stream.

        Defaults to 5 seconds. The timeout must be a value between 1s and 30s.

     --retry-conditions=[RETRY_CONDITIONS,...]
        Specifies one or more retry conditions for the configured origin.

        If the failure mode during a connection attempt to the origin matches
        the configured retryCondition(s), the origin request will be retried up
        to maxAttempts times. The failoverOrigin, if configured, will then be
        used to satisfy the request.

        The default retryCondition is "connect-failure".

        retryConditions apply to this origin, and not subsequent
        failoverOrigin(s), which may specify their own retryConditions and
        maxAttempts.

        Valid values are:

        * connect-failure: Retry on failures connecting to origins, for
          example due to connection timeouts.
        * http-5xx: Retry if the origin responds with any 5xx response code,
          or if the origin does not respond at all, example: disconnects,
          reset, read timeout, connection failure, and refused streams.
        * gateway-error: Similar to 5xx, but only applies to response codes
          502, 503 or 504.
        * retriable-4xx: Retry for retriable 4xx response codes, which
          include HTTP 409 (Conflict) and HTTP 429 (Too Many Requests)
        * not-found: Retry if the origin returns a HTTP 404 (Not Found). This
          can be useful when generating video content, and the segment is not
          available yet.

        RETRY_CONDITIONS must be one of: connect-failure, forbidden,
        gateway-error, http-5xx, not-found, retriable-4xx,
        retry-conditions-unspecified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud alpha edge-cache origins update
```

### gcloud alpha edge-cache origins create

```text
NAME
    gcloud alpha edge-cache origins create - create an EdgeCacheOrigin resource

SYNOPSIS
    gcloud alpha edge-cache origins create (ORIGIN : --location=LOCATION)
        --origin-address=ORIGIN_ADDRESS [--async] [--description=DESCRIPTION]
        [--failover-origin=FAILOVER_ORIGIN] [--flex-shielding=FLEX_SHIELDING]
        [--labels=[KEY=VALUE,...]] [--max-attempts=MAX_ATTEMPTS] [--port=PORT]
        [--protocol=PROTOCOL] [--response-timeout=RESPONSE_TIMEOUT]
        [--retry-conditions=[RETRY_CONDITIONS,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache origins delete

```text
NAME
    gcloud alpha edge-cache origins delete - delete an EdgeCacheOrigin resource

SYNOPSIS
    gcloud alpha edge-cache origins delete (ORIGIN : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache origins describe

```text
NAME
    gcloud alpha edge-cache origins describe - show details about an
        EdgeCacheOrigin resource

SYNOPSIS
    gcloud alpha edge-cache origins describe (ORIGIN : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache origins export

```text
NAME
    gcloud alpha edge-cache origins export - export an EdgeCacheOrigin resource

SYNOPSIS
    gcloud alpha edge-cache origins export (ORIGIN : --location=LOCATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache origins import

```text
NAME
    gcloud alpha edge-cache origins import - import an EdgeCacheOrigin resource

SYNOPSIS
    gcloud alpha edge-cache origins import (ORIGIN : --location=LOCATION)
        [--async] [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache origins list

```text
NAME
    gcloud alpha edge-cache origins list - list all EdgeCacheOrigin resources
        in a project

SYNOPSIS
    gcloud alpha edge-cache origins list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache origins update

```text
NAME
    gcloud alpha edge-cache origins update - update an EdgeCacheOrigin resource

SYNOPSIS
    gcloud alpha edge-cache origins update (ORIGIN : --location=LOCATION)
        [--async] [--description=DESCRIPTION]
        [--failover-origin=FAILOVER_ORIGIN] [--flex-shielding=FLEX_SHIELDING]
        [--labels=[KEY=VALUE,...]] [--max-attempts=MAX_ATTEMPTS]
        [--origin-address=ORIGIN_ADDRESS] [--port=PORT] [--protocol=PROTOCOL]
        [--response-timeout=RESPONSE_TIMEOUT]
        [--retry-conditions=[RETRY_CONDITIONS,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cache/origins (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
