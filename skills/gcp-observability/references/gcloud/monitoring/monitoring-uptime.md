---
source: https://docs.cloud.google.com/sdk/gcloud/reference/monitoring/uptime
---

# gcloud monitoring uptime

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud monitoring uptime create

```text
NAME
    gcloud monitoring uptime create - create a new uptime check or synthetic
        monitor

SYNOPSIS
    gcloud monitoring uptime create DISPLAY_NAME
        (--synthetic-target=SYNTHETIC_TARGET
          | [--group-id=GROUP_ID : --group-type=GROUP_TYPE]
          | [--resource-labels=[KEY=VALUE,...]
          : --resource-type=RESOURCE_TYPE])
        [--body=BODY --content-type=CONTENT_TYPE
          --custom-content-type=CUSTOM_CONTENT_TYPE --headers=[KEY=VALUE,...]
          --mask-headers=MASK_HEADERS --password=PASSWORD --path=PATH
          --pings-count=PINGS_COUNT --port=PORT --protocol=PROTOCOL
          --request-method=REQUEST_METHOD
          --service-agent-auth=SERVICE_AGENT_AUTH --username=USERNAME
          --validate-ssl=VALIDATE_SSL --status-classes=[status-class,...]
          | --status-codes=[status-code,...]]
        [--matcher-content=MATCHER_CONTENT
          : --matcher-type=MATCHER_TYPE [--json-path=JSON_PATH
          : --json-path-matcher-type=JSON_PATH_MATCHER_TYPE]]
        [--period=PERIOD --regions=[field,...]
          --timeout=TIMEOUT --user-labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new uptime check or synthetic monitor.

    Flags only apply to uptime checks unless noted that they apply to synthetic
    monitors.

    For information about the JSON/YAML format of an uptime check:
    https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.uptimeCheckConfigs

EXAMPLES
    To create an uptime check against a URL, run:

        $ gcloud monitoring uptime create DISPLAY_NAME \
            --resource-type=uptime-url \
            --resource-labels=host=google.com,project_id=PROJECT_ID

    To create a synthetic monitor, run:

        $ gcloud monitoring uptime create SYNTHETIC_MONITOR_NAME \
            --synthetic-target=projects/PROJECT_ID/locations/REGION/\
        functions/FUNCTION_NAME

POSITIONAL ARGUMENTS
     DISPLAY_NAME
        Display name for the uptime check or synthetic monitor.

REQUIRED FLAGS
     Uptime check resource.

     Exactly one of these must be specified:

       --synthetic-target=SYNTHETIC_TARGET
          The target of the Synthetic Monitor. This is the fully qualified
          GCFv2 resource name.

       Or at least one of these can be specified:

         Monitored resource group

         --group-id=GROUP_ID
            The group of resources being monitored.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --group-type=GROUP_TYPE
            The resource type of the group members, defaults to gce-instance.
            GROUP_TYPE must be one of:

             aws-elb-load-balancer
                Uptime check against a group of Amazon ELB load balancers.
             gce-instance
                Uptime check against a group of instances from Google Cloud or
                Amazon Web Services.

       Or at least one of these can be specified:

         Monitored resource

         --resource-labels=[KEY=VALUE,...]
            Values for all of the labels listed in the associated monitored
            resource descriptor. See
            https://cloud.google.com/monitoring/api/resources for more
            information and allowed keys.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --resource-type=RESOURCE_TYPE
            Type of monitored resource, defaults to uptime-url. RESOURCE_TYPE
            must be one of:

             aws-ec2-instance
                Uptime check against an AWS EC2 instance.
             aws-elb-load-balancer
                Uptime check against an ElasticLoadBalancer.
             cloud-run-revision
                Uptime check against a Cloud Run revision.
             gae-app
                Uptime check against an App Engine module.
             gce-instance
                Uptime check against a Compute Engine instance.
             servicedirectory-service
                Uptime check against a Service Directory service.
             uptime-url
                Uptime check against a URL.

OPTIONAL FLAGS
     Uptime check protocol settings.

     --body=BODY
        The request body associated with the HTTP POST request. Can only be set
        if --protocol is http or https.

     --content-type=CONTENT_TYPE
        The content type header to use for the check, defaults to unspecified.
        Can only be set if --protocol is http or https.

        CONTENT_TYPE must be one of:

         unspecified
            Not specified
         url-encoded
            URL encoded
         user-provided
            User provided

     --custom-content-type=CUSTOM_CONTENT_TYPE
        A user-provided content type header to use for the check. Can only be
        set if --protocol is http or https.

     --headers=[KEY=VALUE,...]
        The list of headers to send as part of the uptime check request. Can
        only be set if --protocol is http or https.

     --mask-headers=MASK_HEADERS
        Whether to encrypt the header information, defaults to false. Can only
        be set if --protocol is http or https.

     --password=PASSWORD
        The password to use when authenticating with the HTTP server. Can only
        be set if --protocol is http or https.

     --path=PATH
        The path to the page against which to run the check, defaults to /. Can
        only be set if --protocol is http or https.

     --pings-count=PINGS_COUNT
        Number of ICMP pings to send alongside the request.

     --port=PORT
        The port on the server against which to run the check. Defaults to 80
        when --protocol is http. Defaults to 443 when --protocol is https.
        Required if --protocol is tcp.

     --protocol=PROTOCOL
        The protocol of the request, defaults to http. PROTOCOL must be one of:

         http
            An HTTP check.
         https
            An HTTPS check.
         tcp
            A TCP check.

     --request-method=REQUEST_METHOD
        The HTTP request method to use, defaults to get. Can only be set if
        --protocol is http or https.

        REQUEST_METHOD must be one of:

         get
            HTTP GET method
         post
            HTTP POST method

     Uptime check service agent authorization.

     --service-agent-auth=SERVICE_AGENT_AUTH
        The type of authentication to use for the HTTP request. Can only be set
        if --protocol is https.

        SERVICE_AGENT_AUTH must be (only one value is supported):

         oidc-token
            OIDC Token authentication

     --username=USERNAME
        The username to use when authenticating with the HTTP server. Can only
        be set if --protocol is http or https.

     --validate-ssl=VALIDATE_SSL
        Whether to include SSL certificate validation as a part of the uptime
        check, defaults to false. Can only be set if --protocol is http or
        https.

     Uptime check status.

     At most one of these can be specified:

       --status-classes=[status-class,...]
          List of HTTP status classes. The uptime check only passes when the
          response code is contained in this list. Defaults to 2xx. Can only be
          set if --protocol is http or https.

          status-class must be one of:

           1xx
              Any response code from 100-199 inclusive
           2xx
              Any response code from 200-299 inclusive
           3xx
              Any response code from 300-399 inclusive
           4xx
              Any response code from 400-499 inclusive
           5xx
              Any response code from 500-599 inclusive
           any
              Any response code

       --status-codes=[status-code,...]
          List of HTTP Status Codes. The uptime check will only pass if the
          response code is present in this list. Can only be set if --protocol
          is http or https.

     Uptime check matcher settings.

     --matcher-content=MATCHER_CONTENT
        String, regex or JSON content to match.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --matcher-type=MATCHER_TYPE
        The type of content matcher that is applied to the server output,
        defaults to contains-string.

        MATCHER_TYPE must be one of:

         contains-string
            Response contains string
         matches-json-path
            Response matches at JSONPath
         matches-regex
            Response matches regex
         not-contains-string
            Response does not contain string
         not-matches-json-path
            Response does not match at JSONPath
         not-matches-regex
            Response does not match regex

     Uptime check matcher settings for JSON responses.

     --json-path=JSON_PATH
        JSONPath within the response output pointing to the expected content to
        match. Only used if --matcher-type is matches-json-path or
        not-matches-json-path.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --json-path-matcher-type=JSON_PATH_MATCHER_TYPE
        The type of JSONPath match that is applied to the JSON output, defaults
        to exact-match. Only used if --matcher-type is matches-json-path or
        not-matches-json-path.

        JSON_PATH_MATCHER_TYPE must be one of:

         exact-match
            Response matches exact string at JSONPath
         regex-match
            Response matches regex at JSONPath

     Settings.

     --period=PERIOD
        The time between uptime check or synthetic monitor executions in
        minutes, defaults to 1. Can be set for synthetic monitors.

        PERIOD must be one of:

         1
            One minute
         10
            Ten minutes
         15
            Fifteen minutes
         5
            Five minutes

     --regions=[field,...]
        The list of regions from which the check is run. At least 3 regions
        must be selected. Defaults to all available regions.

        field must be one of:

         asia-pacific
            asia-southeast1
         europe
            europe-west1
         south-america
            southamerica-east1
         usa-iowa
            us-central1
         usa-oregon
            us-west1
         usa-virginia
            us-east4

     --timeout=TIMEOUT
        The maximum amount of time in seconds to wait for the request to
        complete, defaults to 60. Can be set for synthetic monitors.

     --user-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha monitoring uptime create

        $ gcloud beta monitoring uptime create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud monitoring uptime create SYNTHETIC_MONITOR_NAME \
    --synthetic-target=projects/PROJECT_ID/locations/REGION/functions/FUNCTION_NAME
```

### gcloud monitoring uptime delete

```text
NAME
    gcloud monitoring uptime delete - delete an uptime check or synthetic
        monitor

SYNOPSIS
    gcloud monitoring uptime delete CHECK_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an uptime check or synthetic monitor

EXAMPLES
    To delete an uptime check or synthetic monitor:

        $ gcloud monitoring uptime delete CHECK_ID

    More information can be found at
    https://cloud.google.com/monitoring/uptime-checks/manage#delete.

POSITIONAL ARGUMENTS
     Uptime check or synthetic monitor resource - The uptime check or synthetic
     monitor to delete. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument check_id on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CHECK_ID
          ID of the uptime check or synthetic monitor or fully qualified
          identifier for the uptime check or synthetic monitor.

          To set the check_id attribute:
          + provide the argument check_id on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the monitoring/v3 API. The full documentation for this
    API can be found at: https://cloud.google.com/monitoring/api/

NOTES
    These variants are also available:

        $ gcloud alpha monitoring uptime delete

        $ gcloud beta monitoring uptime delete
```

### gcloud monitoring uptime describe

```text
NAME
    gcloud monitoring uptime describe - describe an uptime check or synthetic
        monitor

SYNOPSIS
    gcloud monitoring uptime describe CHECK_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an uptime check or synthetic monitor

EXAMPLES
    To describe an uptime check or synthetic monitor:

        $ gcloud monitoring uptime describe CHECK_ID

    More information can be found at
    https://cloud.google.com/monitoring/uptime-checks/manage#get.

POSITIONAL ARGUMENTS
     Uptime check or synthetic monitor resource - The uptime check or synthetic
     monitor to describe. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument check_id on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CHECK_ID
          ID of the uptime check or synthetic monitor or fully qualified
          identifier for the uptime check or synthetic monitor.

          To set the check_id attribute:
          + provide the argument check_id on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the monitoring/v3 API. The full documentation for this
    API can be found at: https://cloud.google.com/monitoring/api/

NOTES
    These variants are also available:

        $ gcloud alpha monitoring uptime describe

        $ gcloud beta monitoring uptime describe
```

### gcloud monitoring uptime list-configs

```text
NAME
    gcloud monitoring uptime list-configs - list uptime checks and synthetic
        monitors

SYNOPSIS
    gcloud monitoring uptime list-configs [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List uptime checks and synthetic monitors.

EXAMPLES
    To see all uptime checks and synthetic monitors:

        $ gcloud monitoring uptime list-configs

    More information can be found at
    https://cloud.google.com/monitoring/uptime-checks/using-uptime-checks

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
    This command uses the monitoring/v3 API. The full documentation for this
    API can be found at: https://cloud.google.com/monitoring/api/

NOTES
    These variants are also available:

        $ gcloud alpha monitoring uptime list-configs

        $ gcloud beta monitoring uptime list-configs
```

### gcloud monitoring uptime list-ips

```text
NAME
    gcloud monitoring uptime list-ips - list uptime check server ips

SYNOPSIS
    gcloud monitoring uptime list-ips [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List uptime check egress ips.

EXAMPLES
    To see all uptime check servers ips:

        $ gcloud monitoring uptime list-ips

    More information can be found at
    https://cloud.google.com/monitoring/uptime-checks/using-uptime-checks

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
    This command uses the monitoring/v3 API. The full documentation for this
    API can be found at: https://cloud.google.com/monitoring/api/

NOTES
    These variants are also available:

        $ gcloud alpha monitoring uptime list-ips

        $ gcloud beta monitoring uptime list-ips
```

### gcloud monitoring uptime update

```text
NAME
    gcloud monitoring uptime update - update an existing uptime check or
        synthetic monitor

SYNOPSIS
    gcloud monitoring uptime update CHECK_ID
        [--body=BODY --content-type=CONTENT_TYPE
          --custom-content-type=CUSTOM_CONTENT_TYPE --mask-headers=MASK_HEADERS
          --password=PASSWORD --path=PATH --pings-count=PINGS_COUNT --port=PORT
          --request-method=REQUEST_METHOD
          --service-agent-auth=SERVICE_AGENT_AUTH --username=USERNAME
          --validate-ssl=VALIDATE_SSL --add-status-classes=[status-class,...]
          | --clear-status-classes=CLEAR_STATUS_CLASSES
          | --remove-status-classes=[status-class,...]
          | --set-status-classes=[status-class,...]
          | --add-status-codes=[status-code,...]
          | --clear-status-codes=CLEAR_STATUS_CODES
          | --remove-status-codes=[status-code,...]
          | --set-status-codes=[status-code,...]
          --update-headers=[KEY=VALUE,...] --clear-headers=CLEAR_HEADERS
          | --remove-headers=[KEY,...]]
        [--display-name=DISPLAY_NAME
          --period=PERIOD --timeout=TIMEOUT --add-regions=[region,...]
          | --clear-regions=CLEAR_REGIONS | --remove-regions=[region,...]
          | --set-regions=[region,...]
          --update-user-labels=[KEY=VALUE,...] --clear-user-labels
          | --remove-user-labels=[KEY,...]]
        [--matcher-content=MATCHER_CONTENT
          : --matcher-type=MATCHER_TYPE [--json-path=JSON_PATH
          : --json-path-matcher-type=JSON_PATH_MATCHER_TYPE]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates an existing uptime check or synthetic monitor.

    Flags only apply to uptime checks unless noted that they apply to synthetic
    monitors.

    For information about the JSON/YAML format of an uptime check:
    https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.uptimeCheckConfigs

EXAMPLES
    To update an uptime check or synthetic monitor, run:

        $ gcloud monitoring uptime update CHECK_ID --period=5 --timeout=30

POSITIONAL ARGUMENTS
     Uptime check or synthetic monitor resource - Name of the uptime check or
     synthetic monitor to be updated. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument check_id on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CHECK_ID
          ID of the uptime check or synthetic monitor or fully qualified
          identifier for the uptime check or synthetic monitor.

          To set the check_id attribute:
          + provide the argument check_id on the command line.

FLAGS
     Uptime check protocol settings.

     --body=BODY
        The request body associated with the HTTP POST request. Can only be set
        if --protocol is http or https.

     --content-type=CONTENT_TYPE
        The content type header to use for the check, defaults to unspecified.
        Can only be set if --protocol is http or https.

        CONTENT_TYPE must be one of:

         unspecified
            Not specified
         url-encoded
            URL encoded
         user-provided
            User provided

     --custom-content-type=CUSTOM_CONTENT_TYPE
        A user-provided content type header to use for the check. Can only be
        set if --protocol is http or https.

     --mask-headers=MASK_HEADERS
        Whether to encrypt the header information, defaults to false. Can only
        be set if --protocol is http or https.

     --password=PASSWORD
        The password to use when authenticating with the HTTP server. Can only
        be set if --protocol is http or https.

     --path=PATH
        The path to the page against which to run the check, defaults to /. Can
        only be set if --protocol is http or https.

     --pings-count=PINGS_COUNT
        Number of ICMP pings to send alongside the request.

     --port=PORT
        The port on the server against which to run the check. Defaults to 80
        when --protocol is http. Defaults to 443 when --protocol is https.
        Required if --protocol is tcp.

     --request-method=REQUEST_METHOD
        The HTTP request method to use, defaults to get. Can only be set if
        --protocol is http or https.

        REQUEST_METHOD must be one of:

         get
            HTTP GET method
         post
            HTTP POST method

     Uptime check service agent authorization.

     --service-agent-auth=SERVICE_AGENT_AUTH
        The type of authentication to use for the HTTP request. Can only be set
        if --protocol is https.

        SERVICE_AGENT_AUTH must be (only one value is supported):

         oidc-token
            OIDC Token authentication

     --username=USERNAME
        The username to use when authenticating with the HTTP server. Can only
        be set if --protocol is http or https.

     --validate-ssl=VALIDATE_SSL
        Whether to include SSL certificate validation as a part of the uptime
        check, defaults to false. Can only be set if --protocol is http or
        https.

     Uptime check status.

     At most one of these can be specified:

       Uptime check status classes.

       At most one of these can be specified:

         --add-status-classes=[status-class,...]
            The list of HTTP status classes to add to the uptime check.
            status-class must be one of:

             1xx
                Any response code from 100-199 inclusive
             2xx
                Any response code from 200-299 inclusive
             3xx
                Any response code from 300-399 inclusive
             4xx
                Any response code from 400-499 inclusive
             5xx
                Any response code from 500-599 inclusive
             any
                Any response code

         --clear-status-classes=CLEAR_STATUS_CLASSES
            Clear all HTTP status classes on the uptime check. Setting this
            flag is the same as selecting only the 2xx status class.

         --remove-status-classes=[status-class,...]
            The list of HTTP status classes to remove from the uptime check.
            status-class must be one of:

             1xx
                Any response code from 100-199 inclusive
             2xx
                Any response code from 200-299 inclusive
             3xx
                Any response code from 300-399 inclusive
             4xx
                Any response code from 400-499 inclusive
             5xx
                Any response code from 500-599 inclusive
             any
                Any response code

         --set-status-classes=[status-class,...]
            List of HTTP status classes. The uptime check will only pass if the
            response code is contained in this list.

            status-class must be one of:

             1xx
                Any response code from 100-199 inclusive
             2xx
                Any response code from 200-299 inclusive
             3xx
                Any response code from 300-399 inclusive
             4xx
                Any response code from 400-499 inclusive
             5xx
                Any response code from 500-599 inclusive
             any
                Any response code

       Uptime check status codes.

       At most one of these can be specified:

         --add-status-codes=[status-code,...]
            The list of HTTP status codes to add to the uptime check.

         --clear-status-codes=CLEAR_STATUS_CODES
            Clear all HTTP status codes on the uptime check. Setting this flag
            is the same as selecting only the 2xx status class.

         --remove-status-codes=[status-code,...]
            The list of HTTP status codes to remove from the uptime check.

         --set-status-codes=[status-code,...]
            List of HTTP status codes. The uptime check will only pass if the
            response code is present in this list.

     Uptime check headers.

     --update-headers=[KEY=VALUE,...]
        The list of headers to add to the uptime check. Any existing headers
        with matching "key" are overridden by the provided values.

     Uptime check remove headers.

     At most one of these can be specified:

       --clear-headers=CLEAR_HEADERS
          Clear all headers on the uptime check.

       --remove-headers=[KEY,...]
          The list of header keys to remove from the uptime check.

     Settings.

     --display-name=DISPLAY_NAME
        The display name for the uptime check or synthetic monitor.

     --period=PERIOD
        The time between uptime check or synthetic monitor executions in
        minutes, defaults to 1. Can be set for synthetic monitors.

        PERIOD must be one of:

         1
            One minute
         10
            Ten minutes
         15
            Fifteen minutes
         5
            Five minutes

     --timeout=TIMEOUT
        The maximum amount of time in seconds to wait for the request to
        complete, defaults to 60. Can be set for synthetic monitors.

     Uptime check selected regions.

     At most one of these can be specified:

       --add-regions=[region,...]
          The list of regions to add to the uptime check. region must be one
          of:

           asia-pacific
              asia-southeast1
           europe
              europe-west1
           south-america
              southamerica-east1
           usa-iowa
              us-central1
           usa-oregon
              us-west1
           usa-virginia
              us-east4

       --clear-regions=CLEAR_REGIONS
          Clear all regions on the uptime check. This setting acts the same as
          if all available regions were selected.

       --remove-regions=[region,...]
          The list of regions to remove from the uptime check. region must be
          one of:

           asia-pacific
              asia-southeast1
           europe
              europe-west1
           south-america
              southamerica-east1
           usa-iowa
              us-central1
           usa-oregon
              us-west1
           usa-virginia
              us-east4

       --set-regions=[region,...]
          The list of regions from which the check is run. At least 3 regions
          must be selected.

          region must be one of:

           asia-pacific
              asia-southeast1
           europe
              europe-west1
           south-america
              southamerica-east1
           usa-iowa
              us-central1
           usa-oregon
              us-west1
           usa-virginia
              us-east4

     User labels. Can be set for synthetic monitors.

     --update-user-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-user-labels
          Remove all labels. If --update-user-labels is also specified then
          --clear-user-labels is applied first.

          For example, to remove all labels:

              $ gcloud monitoring uptime update --clear-user-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud monitoring uptime update --clear-user-labels \
                --update-user-labels foo=bar,baz=qux

       --remove-user-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-user-labels is also specified then
          --update-user-labels is applied first.

     Uptime check matcher settings.

     --matcher-content=MATCHER_CONTENT
        String, regex or JSON content to match.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --matcher-type=MATCHER_TYPE
        The type of content matcher that is applied to the server output,
        defaults to contains-string.

        MATCHER_TYPE must be one of:

         contains-string
            Response contains string
         matches-json-path
            Response matches at JSONPath
         matches-regex
            Response matches regex
         not-contains-string
            Response does not contain string
         not-matches-json-path
            Response does not match at JSONPath
         not-matches-regex
            Response does not match regex

     Uptime check matcher settings for JSON responses.

     --json-path=JSON_PATH
        JSONPath within the response output pointing to the expected content to
        match. Only used if --matcher-type is matches-json-path or
        not-matches-json-path.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --json-path-matcher-type=JSON_PATH_MATCHER_TYPE
        The type of JSONPath match that is applied to the JSON output, defaults
        to exact-match. Only used if --matcher-type is matches-json-path or
        not-matches-json-path.

        JSON_PATH_MATCHER_TYPE must be one of:

         exact-match
            Response matches exact string at JSONPath
         regex-match
            Response matches regex at JSONPath

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha monitoring uptime update

        $ gcloud beta monitoring uptime update
```

### gcloud beta monitoring uptime create

```text
NAME
    gcloud beta monitoring uptime create - create a new uptime check or
        synthetic monitor

SYNOPSIS
    gcloud beta monitoring uptime create DISPLAY_NAME
        (--synthetic-target=SYNTHETIC_TARGET
          | [--group-id=GROUP_ID : --group-type=GROUP_TYPE]
          | [--resource-labels=[KEY=VALUE,...]
          : --resource-type=RESOURCE_TYPE])
        [--body=BODY --content-type=CONTENT_TYPE
          --custom-content-type=CUSTOM_CONTENT_TYPE --headers=[KEY=VALUE,...]
          --mask-headers=MASK_HEADERS --password=PASSWORD --path=PATH
          --pings-count=PINGS_COUNT --port=PORT --protocol=PROTOCOL
          --request-method=REQUEST_METHOD
          --service-agent-auth=SERVICE_AGENT_AUTH --username=USERNAME
          --validate-ssl=VALIDATE_SSL --status-classes=[status-class,...]
          | --status-codes=[status-code,...]]
        [--matcher-content=MATCHER_CONTENT
          : --matcher-type=MATCHER_TYPE [--json-path=JSON_PATH
          : --json-path-matcher-type=JSON_PATH_MATCHER_TYPE]]
        [--period=PERIOD --regions=[field,...]
          --timeout=TIMEOUT --user-labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring uptime delete

```text
NAME
    gcloud beta monitoring uptime delete - delete an uptime check or synthetic
        monitor

SYNOPSIS
    gcloud beta monitoring uptime delete CHECK_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring uptime describe

```text
NAME
    gcloud beta monitoring uptime describe - describe an uptime check or
        synthetic monitor

SYNOPSIS
    gcloud beta monitoring uptime describe CHECK_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring uptime list-configs

```text
NAME
    gcloud beta monitoring uptime list-configs - list uptime checks and
        synthetic monitors

SYNOPSIS
    gcloud beta monitoring uptime list-configs [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring uptime list-ips

```text
NAME
    gcloud beta monitoring uptime list-ips - list uptime check server ips

SYNOPSIS
    gcloud beta monitoring uptime list-ips [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring uptime update

```text
NAME
    gcloud beta monitoring uptime update - update an existing uptime check or
        synthetic monitor

SYNOPSIS
    gcloud beta monitoring uptime update CHECK_ID
        [--body=BODY --content-type=CONTENT_TYPE
          --custom-content-type=CUSTOM_CONTENT_TYPE --mask-headers=MASK_HEADERS
          --password=PASSWORD --path=PATH --pings-count=PINGS_COUNT --port=PORT
          --request-method=REQUEST_METHOD
          --service-agent-auth=SERVICE_AGENT_AUTH --username=USERNAME
          --validate-ssl=VALIDATE_SSL --add-status-classes=[status-class,...]
          | --clear-status-classes=CLEAR_STATUS_CLASSES
          | --remove-status-classes=[status-class,...]
          | --set-status-classes=[status-class,...]
          | --add-status-codes=[status-code,...]
          | --clear-status-codes=CLEAR_STATUS_CODES
          | --remove-status-codes=[status-code,...]
          | --set-status-codes=[status-code,...]
          --update-headers=[KEY=VALUE,...] --clear-headers=CLEAR_HEADERS
          | --remove-headers=[KEY,...]]
        [--display-name=DISPLAY_NAME
          --period=PERIOD --timeout=TIMEOUT --add-regions=[region,...]
          | --clear-regions=CLEAR_REGIONS | --remove-regions=[region,...]
          | --set-regions=[region,...]
          --update-user-labels=[KEY=VALUE,...] --clear-user-labels
          | --remove-user-labels=[KEY,...]]
        [--matcher-content=MATCHER_CONTENT
          : --matcher-type=MATCHER_TYPE [--json-path=JSON_PATH
          : --json-path-matcher-type=JSON_PATH_MATCHER_TYPE]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring uptime create

```text
NAME
    gcloud alpha monitoring uptime create - create a new uptime check or
        synthetic monitor

SYNOPSIS
    gcloud alpha monitoring uptime create DISPLAY_NAME
        (--synthetic-target=SYNTHETIC_TARGET
          | [--group-id=GROUP_ID : --group-type=GROUP_TYPE]
          | [--resource-labels=[KEY=VALUE,...]
          : --resource-type=RESOURCE_TYPE])
        [--body=BODY --content-type=CONTENT_TYPE
          --custom-content-type=CUSTOM_CONTENT_TYPE --headers=[KEY=VALUE,...]
          --mask-headers=MASK_HEADERS --password=PASSWORD --path=PATH
          --pings-count=PINGS_COUNT --port=PORT --protocol=PROTOCOL
          --request-method=REQUEST_METHOD
          --service-agent-auth=SERVICE_AGENT_AUTH --username=USERNAME
          --validate-ssl=VALIDATE_SSL --status-classes=[status-class,...]
          | --status-codes=[status-code,...]]
        [--matcher-content=MATCHER_CONTENT
          : --matcher-type=MATCHER_TYPE [--json-path=JSON_PATH
          : --json-path-matcher-type=JSON_PATH_MATCHER_TYPE]]
        [--period=PERIOD --regions=[field,...]
          --timeout=TIMEOUT --user-labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring uptime delete

```text
NAME
    gcloud alpha monitoring uptime delete - delete an uptime check or synthetic
        monitor

SYNOPSIS
    gcloud alpha monitoring uptime delete CHECK_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring uptime describe

```text
NAME
    gcloud alpha monitoring uptime describe - describe an uptime check or
        synthetic monitor

SYNOPSIS
    gcloud alpha monitoring uptime describe CHECK_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring uptime list-configs

```text
NAME
    gcloud alpha monitoring uptime list-configs - list uptime checks and
        synthetic monitors

SYNOPSIS
    gcloud alpha monitoring uptime list-configs [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring uptime list-ips

```text
NAME
    gcloud alpha monitoring uptime list-ips - list uptime check server ips

SYNOPSIS
    gcloud alpha monitoring uptime list-ips [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring uptime update

```text
NAME
    gcloud alpha monitoring uptime update - update an existing uptime check or
        synthetic monitor

SYNOPSIS
    gcloud alpha monitoring uptime update CHECK_ID
        [--body=BODY --content-type=CONTENT_TYPE
          --custom-content-type=CUSTOM_CONTENT_TYPE --mask-headers=MASK_HEADERS
          --password=PASSWORD --path=PATH --pings-count=PINGS_COUNT --port=PORT
          --request-method=REQUEST_METHOD
          --service-agent-auth=SERVICE_AGENT_AUTH --username=USERNAME
          --validate-ssl=VALIDATE_SSL --add-status-classes=[status-class,...]
          | --clear-status-classes=CLEAR_STATUS_CLASSES
          | --remove-status-classes=[status-class,...]
          | --set-status-classes=[status-class,...]
          | --add-status-codes=[status-code,...]
          | --clear-status-codes=CLEAR_STATUS_CODES
          | --remove-status-codes=[status-code,...]
          | --set-status-codes=[status-code,...]
          --update-headers=[KEY=VALUE,...] --clear-headers=CLEAR_HEADERS
          | --remove-headers=[KEY,...]]
        [--display-name=DISPLAY_NAME
          --period=PERIOD --timeout=TIMEOUT --add-regions=[region,...]
          | --clear-regions=CLEAR_REGIONS | --remove-regions=[region,...]
          | --set-regions=[region,...]
          --update-user-labels=[KEY=VALUE,...] --clear-user-labels
          | --remove-user-labels=[KEY,...]]
        [--matcher-content=MATCHER_CONTENT
          : --matcher-type=MATCHER_TYPE [--json-path=JSON_PATH
          : --json-path-matcher-type=JSON_PATH_MATCHER_TYPE]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/monitoring/uptime (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
