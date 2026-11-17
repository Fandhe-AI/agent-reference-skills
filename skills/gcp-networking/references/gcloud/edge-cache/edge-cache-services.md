---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cache/services
---

# gcloud edge-cache services

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cache services delete

```text
NAME
    gcloud edge-cache services delete - delete an EdgeCacheService resource

SYNOPSIS
    gcloud edge-cache services delete (SERVICE : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an EdgeCacheService resource.

EXAMPLES
    To delete an EdgeCacheService resource named 'my-service', run:

        $ gcloud edge-cache services delete my-service

POSITIONAL ARGUMENTS
     Service resource - The EdgeCacheService resource to delete. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument service on the command line with a fully
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

        $ gcloud alpha edge-cache services delete
```

### gcloud edge-cache services describe

```text
NAME
    gcloud edge-cache services describe - show details about an
        EdgeCacheService resource

SYNOPSIS
    gcloud edge-cache services describe (SERVICE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about an EdgeCacheService resource.

EXAMPLES
    To show details about an EdgeCacheService resource named 'my-service', run:

        $ gcloud edge-cache services describe my-service

POSITIONAL ARGUMENTS
     Service resource - The EdgeCacheService resource you want to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument service on the command line with a fully
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

        $ gcloud alpha edge-cache services describe
```

### gcloud edge-cache services export

```text
NAME
    gcloud edge-cache services export - export an EdgeCacheService resource

SYNOPSIS
    gcloud edge-cache services export (SERVICE : --location=LOCATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export an EdgeCacheService resource to YAML.

EXAMPLES
    To export an existing EdgeCacheService resource named 'my-service', run:

        $ gcloud edge-cache services export my-service \
            --destination=my-service.yaml

POSITIONAL ARGUMENTS
     Service resource - The EdgeCacheService resource you want to export. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument service on the command line with a fully
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

        $ gcloud alpha edge-cache services export
```

### gcloud edge-cache services import

```text
NAME
    gcloud edge-cache services import - import an EdgeCacheService resource

SYNOPSIS
    gcloud edge-cache services import (SERVICE : --location=LOCATION) [--async]
        [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Import an EdgeCacheService resource. If the named EdgeCacheService resource
    already exists, the resource will be updated to match the imported resource
    configuration.

    If the named EdgeCacheService resource does not already exist, a new
    EdgeCacheService resource will be created with that name.

EXAMPLES
    To import an EdgeCacheService resource named 'my-service' from a YAML file,
    run:

        $ gcloud edge-cache services import my-service \
            --source=my-service.yaml

POSITIONAL ARGUMENTS
     Service resource - The EdgeCacheService resource you want to import. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument service on the command line with a fully
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

        $ gcloud alpha edge-cache services import
```

### gcloud edge-cache services invalidate-cache

```text
NAME
    gcloud edge-cache services invalidate-cache - invalidate the cache for an
        EdgeCacheService resource

SYNOPSIS
    gcloud edge-cache services invalidate-cache (SERVICE : --location=LOCATION)
        (--host=HOST --path=PATH --tags=[TAGS,...]) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Invalidate the cache entries associated with an EdgeCacheService resource.

EXAMPLES
    To invalidate content via a tag, or tags for a given host for an
    EdgeCacheService named 'my-service':

        $ gcloud edge-cache services invalidate-cache my-service \
            --tags="status=404" --host="media.example.com"

    To invalidate all content under a specific path, specify an exact path, or
    a prefix. Prefixes are denoted with a trailing * character.

        $ gcloud edge-cache services invalidate-cache my-service \
            --path="/static/*"

    You can optionally combine this with a status code. For example, to
    invalidate all cached HTTP 404s:

        $ gcloud edge-cache services invalidate-cache my-service \
            --tags="status=404" --path="/static/*"

POSITIONAL ARGUMENTS
     Service resource - The EdgeCacheService resource you want to invalidate
     the cache for. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

REQUIRED FLAGS
     At least one of these must be specified:

       --host=HOST
          The hostname to invalidate against. You can specify an exact or
          wildcard host - e.g. "video.example.com" or ".example.com" - based on
          host component.

       --path=PATH
          The path to invalidate against. You can specify an exact or wildcard
          host - e.g. "/videos/hls/139123.mp4" or "/manifests/" - based on path
          component.

       --tags=[TAGS,...]
          A list of cache tags used to identify cached objects.

          + Cache tags are specified when the response is first cached, by
            setting the "Cache-Tag" response header at the origin.
          + By default, all objects have a cache tag representing the HTTP
            status code of the response, the MIME content-type, and the origin.
          + Multiple cache tags in the same revalidation request are treated
            as boolean OR - e.g. tag1 OR tag2 OR tag3.
          + If a host and/or path are also specified, these are treated as
            boolean AND with any tags.

          Up to 10 tags may be specified in a single invalidation request.

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

        $ gcloud alpha edge-cache services invalidate-cache
```

### gcloud edge-cache services list

```text
NAME
    gcloud edge-cache services list - list all EdgeCacheService resources in a
        project

SYNOPSIS
    gcloud edge-cache services list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List EdgeCacheService resources.

EXAMPLES
    To list existing EdgeCacheService resources, run:

        $ gcloud edge-cache services list

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

        $ gcloud alpha edge-cache services list
```

### gcloud edge-cache services update

```text
NAME
    gcloud edge-cache services update - update an EdgeCacheService resource

SYNOPSIS
    gcloud edge-cache services update (SERVICE : --location=LOCATION) [--async]
        [--description=DESCRIPTION]
        [--edge-security-policy=EDGE_SECURITY_POLICY]
        [--edge-ssl-certificate=[EDGE_SSL_CERTIFICATE,...]] [--enable-logging]
        [--labels=[KEY=VALUE,...]] [--logging-sample-rate=LOGGING_SAMPLE_RATE]
        [--require-tls] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing EdgeCacheService resource.

EXAMPLES
    To update an EdgeCacheService resource called 'my-service' run:

        $ gcloud edge-cache services update my-service \
            --description="new description"

POSITIONAL ARGUMENTS
     Service resource - The name of the EdgeCacheService resource to create.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + use global location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Human-readable description of the resource.

     --edge-security-policy=EDGE_SECURITY_POLICY
        Resource URL that points at the Cloud Armor edge security policy that
        is applied on each request against the EdgeCacheService.

        Security Policies should be specified as relative resource URLs - for
        example projects/my-project/locations/global/securityPolicies/my-policy

        Note that only security policies with a type of EDGE can be attached to
        an EdgeCacheService.

     --edge-ssl-certificate=[EDGE_SSL_CERTIFICATE,...]
        URLs to sslCertificate resources that are used to authenticate
        connections between users and the EdgeCacheService.

        Certificates should be specified as relative resource URLs - for
        example projects/my-project/locations/global/certificates/my-cert

        Note that only "global" certificates with a "scope" of EDGE_CACHE can
        be attached to an EdgeCacheService.

        You may specify up to 5 SSL certificates per Service.

     --enable-logging
        Specifies whether to enable logging for traffic served by this service.

        Defaults to false.

     --labels=[KEY=VALUE,...]
        List of KEY=VALUE labels to attach to this resource.

     --logging-sample-rate=LOGGING_SAMPLE_RATE
        Configures the sampling rate of requests, where 1.0 means all logged
        requests are reported and 0.0 means no logged requests are reported.
        The default value is 1.0, and the value of the field must be in [0, 1].

        This field can only be specified if logging is enabled for this
        service.

     --require-tls
        Require TLS (HTTPS) for all clients connecting to this service.

        Clients who connect over HTTP (port 80) will receive a HTTP 301 to the
        same URL over HTTPS (port 443). You must have at least one (1)
        edgeSslCertificate specified to enable this.

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

        $ gcloud alpha edge-cache services update
```

### gcloud alpha edge-cache services delete

```text
NAME
    gcloud alpha edge-cache services delete - delete an EdgeCacheService
        resource

SYNOPSIS
    gcloud alpha edge-cache services delete (SERVICE : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache services describe

```text
NAME
    gcloud alpha edge-cache services describe - show details about an
        EdgeCacheService resource

SYNOPSIS
    gcloud alpha edge-cache services describe (SERVICE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache services export

```text
NAME
    gcloud alpha edge-cache services export - export an EdgeCacheService
        resource

SYNOPSIS
    gcloud alpha edge-cache services export (SERVICE : --location=LOCATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache services import

```text
NAME
    gcloud alpha edge-cache services import - import an EdgeCacheService
        resource

SYNOPSIS
    gcloud alpha edge-cache services import (SERVICE : --location=LOCATION)
        [--async] [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache services invalidate-cache

```text
NAME
    gcloud alpha edge-cache services invalidate-cache - invalidate the cache
        for an EdgeCacheService resource

SYNOPSIS
    gcloud alpha edge-cache services invalidate-cache
        (SERVICE : --location=LOCATION)
        (--host=HOST --path=PATH --tags=[TAGS,...]) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache services list

```text
NAME
    gcloud alpha edge-cache services list - list all EdgeCacheService resources
        in a project

SYNOPSIS
    gcloud alpha edge-cache services list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cache services update

```text
NAME
    gcloud alpha edge-cache services update - update an EdgeCacheService
        resource

SYNOPSIS
    gcloud alpha edge-cache services update (SERVICE : --location=LOCATION)
        [--async] [--description=DESCRIPTION]
        [--edge-security-policy=EDGE_SECURITY_POLICY]
        [--edge-ssl-certificate=[EDGE_SSL_CERTIFICATE,...]] [--enable-logging]
        [--labels=[KEY=VALUE,...]] [--logging-sample-rate=LOGGING_SAMPLE_RATE]
        [--require-tls] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cache/services (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
