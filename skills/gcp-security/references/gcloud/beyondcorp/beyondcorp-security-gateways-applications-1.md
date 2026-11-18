---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beyondcorp/security-gateways/applications
---

# gcloud beyondcorp security-gateways applications (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beyondcorp security-gateways applications add-iam-policy-binding

```text
NAME
    gcloud beyondcorp security-gateways applications add-iam-policy-binding -
        add an IAM policy binding to a security gateway application

SYNOPSIS
    gcloud beyondcorp security-gateways applications add-iam-policy-binding
        (APPLICATION : --location=LOCATION --security-gateway=SECURITY_GATEWAY)
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds an IAM policy binding to the given security gateway application.

        EXAMPLES
            To add an IAM policy binding for the role of
            'roles/beyondcorp.sgApplicationUser' for the user 'test-user@gmail.com'
            on a security gateway application 'my-app' under security gateway
            'my-security-gateway':

        $ gcloud beyondcorp security-gateways applications \
        add-iam-policy-binding my-app \
        --security-gateway=my-security-gateway \
        --member='user:test-user@gmail.com' \
        --role='roles/beyondcorp.sgApplicationUser' --location=global

        To add the same binding with a condition:

        $ gcloud beyondcorp security-gateways applications \
        add-iam-policy-binding my-app \
        --security-gateway=my-security-gateway \
        --member='user:test-user@gmail.com' \
        --role='roles/beyondcorp.sgApplicationUser' --location=global \
        --condition="expression=request.time < timestamp('2026-01-01T00:00:00Z'),title=expires_2026"

POSITIONAL ARGUMENTS
     Application resource - The security gateway application for which to add
     the IAM policy binding. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument application on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       APPLICATION
          ID of the application or fully qualified identifier for the
          application.

          To set the application attribute:
          + provide the argument application on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id. We support only global location.

          To set the location attribute:
          + provide the argument application on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --security-gateway=SECURITY_GATEWAY
          The security gateway ID.

          To set the security-gateway attribute:
          + provide the argument application on the command line with a fully
            specified name;
          + provide the argument --security-gateway on the command line.

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

       --condition=[KEY=VALUE,...]
          A condition to include in the binding. When the condition is
          explicitly specified as None (--condition=None), a binding without a
          condition is added. When the condition is specified and is not None,
          --role cannot be a basic role. Basic roles are roles/editor,
          roles/owner, and roles/viewer. For more on conditions, refer to the
          conditions overview guide:
          https://cloud.google.com/iam/docs/conditions-overview

          When using the --condition flag, include the following key-value
          pairs:

           expression
              (Required) Condition expression that evaluates to True or False.
              This uses a subset of Common Expression Language syntax.

              If the condition expression includes a comma, use a different
              delimiter to separate the key-value pairs. Specify the delimiter
              before listing the key-value pairs. For example, to specify a
              colon (:) as the delimiter, do the following:
              --condition=^:^title=TITLE:expression=EXPRESSION. For more
              information, see
              https://cloud.google.com/sdk/gcloud/reference/topic/escaping.

           title
              (Required) A short string describing the purpose of the
              expression.

           description
              (Optional) Additional description for the expression.

       --condition-from-file=PATH_TO_FILE
          Path to a local JSON or YAML file that defines the condition. To see
          available fields, see the help for --condition. Use a full or
          relative path to a local file containing the value of condition.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta beyondcorp security-gateways applications \
            add-iam-policy-binding
```

### gcloud beyondcorp security-gateways applications create

```text
NAME
    gcloud beyondcorp security-gateways applications create - create
        applications

SYNOPSIS
    gcloud beyondcorp security-gateways applications create
        (APPLICATION : --location=LOCATION --security-gateway=SECURITY_GATEWAY)
        [--async] [--display-name=DISPLAY_NAME]
        [--endpoint-matchers=[hostname=HOSTNAME],[ports=PORTS]]
        [--request-id=REQUEST_ID] [--schema=SCHEMA]
        [--upstreams=[egressPolicy=EGRESSPOLICY],
          [external=EXTERNAL],[network=NETWORK],[proxyProtocol=PROXYPROTOCOL]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an application

EXAMPLES
    To create the application, run:

        $ gcloud beyondcorp security-gateways applications create

POSITIONAL ARGUMENTS
     Application resource - Identifier. Name of the resource. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument application on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       APPLICATION
          ID of the application or fully qualified identifier for the
          application.

          To set the application attribute:
          + provide the argument application on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the application resource. We support only global
          location.

          To set the location attribute:
          + provide the argument application on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --security-gateway=SECURITY_GATEWAY
          The securityGateway id of the application resource.

          To set the security-gateway attribute:
          + provide the argument application on the command line with a fully
            specified name;
          + provide the argument --security-gateway on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        An arbitrary user-provided name for the application resource. Cannot
        exceed 64 characters.

     --endpoint-matchers=[hostname=HOSTNAME],[ports=PORTS]
        An array of conditions to match the application's network endpoint.
        Each element in the array is an EndpointMatcher object, which defines a
        specific combination of a hostname pattern and one or more ports. The
        application is considered matched if at least one of the
        EndpointMatcher conditions in this array is met (the conditions are
        combined using OR logic). Each EndpointMatcher must contain a hostname
        pattern, such as "example.com", and one or more port numbers specified
        as a string, such as "443".

        Hostname and port number examples: ".example.com", "443" "example.com"
        and "22" "example.com" and "22,33".

         hostname
            Hostname of the application.

         ports
            The ports of the application.

        Shorthand Example:

            --endpoint-matchers=hostname=string,ports=[int] --endpoint-matchers=hostname=string,ports=[int]

        JSON Example:

            --endpoint-matchers='[{"hostname": "string", "ports": [int]}]'

        File Example:

            --endpoint-matchers=path_to_file.(yaml|json)

     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore request if it has already been completed. The server will
        guarantee that for at least 60 minutes since the first request.

     --schema=SCHEMA
        Type of the external application. SCHEMA must be one of:

         api-gateway
            Service Discovery API endpoint when Service Discovery is enabled in
            Gateway.
         proxy-gateway
            Proxy which routes traffic to actual applications, like Netscaler
            Gateway.

     --upstreams=[egressPolicy=EGRESSPOLICY],[external=EXTERNAL],[network=NETWORK],[proxyProtocol=PROXYPROTOCOL]
        Which upstream resources to forward traffic to.

         egressPolicy
            Routing policy information.

             regions
                List of the regions where the application sends traffic.

         external
            List of the external endpoints to forward traffic to.

             endpoints
                List of the endpoints to forward traffic to.

                 hostname
                    Hostname of the endpoint.

                 port
                    Port of the endpoint.

         network
            Network to forward traffic to.

             name
                Network name is of the format:
                projects/{project}/global/networks/{network}.

         proxyProtocol
            Enables proxy protocol configuration for the upstream.

             allowedClientHeaders
                List of the allowed client header names.

             clientIp
                Client IP configuration. The client IP address is included if
                true.

             contextualHeaders
                Configuration for the contextual headers.

                 deviceInfo
                    The device information configuration.

                     outputType
                        The output type details for the delegated device.

                 dispatchInfo
                    The dispatch information configuration.

                     outputType
                        The output type details for the delegated dispatch
                        information.

                 groupInfo
                    Group details.

                     outputType
                        The output type of the delegated group information.

                 outputType
                    Default output type for all enabled headers.

                 userInfo
                    User details.

                     outputType
                        The delegated user's information.

             gatewayIdentity
                The security gateway identity configuration.

             metadataHeaders
                Custom resource specific headers along with the values. The
                names should conform to RFC 9110: >Field names can contain
                alphanumeric characters, hyphens, and periods, can contain only
                ASCII-printable characters and tabs, and must start with a
                letter.

                 KEY
                    Sets KEY value.

                 VALUE
                    Sets VALUE value.

        Shorthand Example:

            --upstreams=egressPolicy={regions=[string]},external={endpoints=[{hostname=string,port=int}]},network={name=string},proxyProtocol={allowedClientHeaders=[string],clientIp=boolean,contextualHeaders={deviceInfo={outputType=string},dispatchInfo={outputType=string},groupInfo={outputType=string},outputType=string,userInfo={outputType=string}},gatewayIdentity=string,metadataHeaders={string=string}} --upstreams=egressPolicy={regions=[string]},external={endpoints=[{hostname=string,port=int}]},network={name=string},proxyProtocol={allowedClientHeaders=[string],clientIp=boolean,contextualHeaders={deviceInfo={outputType=string},dispatchInfo={outputType=string},groupInfo={outputType=string},outputType=string,userInfo={outputType=string}},gatewayIdentity=string,metadataHeaders={string=string}}

        JSON Example:

            --upstreams='[{"egressPolicy": {"regions": ["string"]}, "external": {"endpoints": [{"hostname": "string", "port": int}]}, "network": {"name": "string"}, "proxyProtocol": {"allowedClientHeaders": ["string"], "clientIp": boolean, "contextualHeaders": {"deviceInfo": {"outputType": "string"}, "dispatchInfo": {"outputType": "string"}, "groupInfo": {"outputType": "string"}, "outputType": "string", "userInfo": {"outputType": "string"}}, "gatewayIdentity": "string", "metadataHeaders": {"string": "string"}}}]'

        File Example:

            --upstreams=path_to_file.(yaml|json)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the beyondcorp/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta beyondcorp security-gateways applications create
```

### gcloud beyondcorp security-gateways applications delete

```text
NAME
    gcloud beyondcorp security-gateways applications delete - delete
        applications

SYNOPSIS
    gcloud beyondcorp security-gateways applications delete
        (APPLICATION : --location=LOCATION --security-gateway=SECURITY_GATEWAY)
        [--async] [--request-id=REQUEST_ID] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an application

EXAMPLES
    To delete the application, run:

        $ gcloud beyondcorp security-gateways applications delete

POSITIONAL ARGUMENTS
     Application resource - Name of the resource. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument application on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       APPLICATION
          ID of the application or fully qualified identifier for the
          application.

          To set the application attribute:
          + provide the argument application on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the application resource. We support only global
          location.

          To set the location attribute:
          + provide the argument application on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --security-gateway=SECURITY_GATEWAY
          The securityGateway id of the application resource.

          To set the security-gateway attribute:
          + provide the argument application on the command line with a fully
            specified name;
          + provide the argument --security-gateway on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server will
        guarantee that for at least 60 minutes after the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     --validate-only
        If set, validates request by executing a dry-run which would not alter
        the resource in any way.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the beyondcorp/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta beyondcorp security-gateways applications delete
```

### gcloud beyondcorp security-gateways applications describe

```text
NAME
    gcloud beyondcorp security-gateways applications describe - describe
        applications

SYNOPSIS
    gcloud beyondcorp security-gateways applications describe
        (APPLICATION : --location=LOCATION --security-gateway=SECURITY_GATEWAY)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an application

EXAMPLES
    To describe the application, run:

        $ gcloud beyondcorp security-gateways applications describe

POSITIONAL ARGUMENTS
     Application resource - The resource name of the Application using the
     form:
     projects/{project_id}/locations/global/securityGateway/{security_gateway_id}/applications/{application_id}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument application on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       APPLICATION
          ID of the application or fully qualified identifier for the
          application.

          To set the application attribute:
          + provide the argument application on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the application resource. We support only global
          location.

          To set the location attribute:
          + provide the argument application on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --security-gateway=SECURITY_GATEWAY
          The securityGateway id of the application resource.

          To set the security-gateway attribute:
          + provide the argument application on the command line with a fully
            specified name;
          + provide the argument --security-gateway on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the beyondcorp/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta beyondcorp security-gateways applications describe
```

### gcloud beyondcorp security-gateways applications get-iam-policy

```text
NAME
    gcloud beyondcorp security-gateways applications get-iam-policy - get the
        IAM policy for a security gateway application

SYNOPSIS
    gcloud beyondcorp security-gateways applications get-iam-policy
        (APPLICATION : --location=LOCATION --security-gateway=SECURITY_GATEWAY)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets the IAM policy for the given security gateway application.

EXAMPLES
    To get the IAM policy for a security gateway application
    my-security-gateway-application run:

        $ gcloud beyondcorp security-gateways applications get-iam-policy \
            my-security-gateway-application --project=consumer-project-id \
            --location=global

POSITIONAL ARGUMENTS
     Application resource - The security gateway application for which to get
     the IAM policy. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument application on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       APPLICATION
          ID of the application or fully qualified identifier for the
          application.

          To set the application attribute:
          + provide the argument application on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the application resource. We support only global
          location.

          To set the location attribute:
          + provide the argument application on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --security-gateway=SECURITY_GATEWAY
          The securityGateway id of the application resource.

          To set the security-gateway attribute:
          + provide the argument application on the command line with a fully
            specified name;
          + provide the argument --security-gateway on the command line.

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
    This command uses the beyondcorp/v1alpha API. The full documentation for
    this API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta beyondcorp security-gateways applications \
            get-iam-policy
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud beyondcorp security-gateways applications get-iam-policy my-security-gateway-application \
    --project=consumer-project-id \
    --location=global \
    --security-gateway=my-security-gateway
```

### gcloud beyondcorp security-gateways applications list

```text
NAME
    gcloud beyondcorp security-gateways applications list - list applications

SYNOPSIS
    gcloud beyondcorp security-gateways applications list
        (--security-gateway=SECURITY_GATEWAY : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List applications

EXAMPLES
    To list all applications, run:

        $ gcloud beyondcorp security-gateways applications list

REQUIRED FLAGS
     SecurityGateway resource - The parent location to which the resources
     belong.
     projects/{project_id}/locations/global/securityGateways/{security_gateway_id}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --security-gateway on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --security-gateway=SECURITY_GATEWAY
          ID of the securityGateway or fully qualified identifier for the
          securityGateway.

          To set the security-gateway attribute:
          + provide the argument --security-gateway on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location id of the securityGateway resource. We support only
          global location.

          To set the location attribute:
          + provide the argument --security-gateway on the command line with
            a fully specified name;
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
    This command uses the beyondcorp/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta beyondcorp security-gateways applications list
```

### gcloud beyondcorp security-gateways applications remove-iam-policy-binding

```text
NAME
    gcloud beyondcorp security-gateways applications remove-iam-policy-binding
        - remove an IAM policy binding from a security gateway application

SYNOPSIS
    gcloud beyondcorp security-gateways applications remove-iam-policy-binding
        (APPLICATION : --location=LOCATION --security-gateway=SECURITY_GATEWAY)
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes an IAM policy binding from the given security gateway application.

        EXAMPLES
            To remove an IAM policy binding for the role of
            'roles/beyondcorp.sgApplicationUser' for the user 'test-user@gmail.com'
            on a security gateway application 'my-app' under security gateway
            'my-security-gateway':

        $ gcloud beyondcorp security-gateways applications \
        remove-iam-policy-binding my-app \
        --security-gateway=my-security-gateway \
        --member='user:test-user@gmail.com' \
        --role='roles/beyondcorp.sgApplicationUser' --location=global

        To remove a binding with a condition:

        $ gcloud beyondcorp security-gateways applications \
        remove-iam-policy-binding my-app \
        --security-gateway=my-security-gateway \
        --member='user:test-user@gmail.com' \
        --role='roles/beyondcorp.sgApplicationUser' --location=global \
        --condition="expression=request.time < timestamp('2026-01-01T00:00:00Z'),title=expires_2026"

POSITIONAL ARGUMENTS
     Application resource - The security gateway application for which to
     remove the IAM policy binding. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument application on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       APPLICATION
          ID of the application or fully qualified identifier for the
          application.

          To set the application attribute:
          + provide the argument application on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id. We support only global location.

          To set the location attribute:
          + provide the argument application on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --security-gateway=SECURITY_GATEWAY
          The security gateway ID.

          To set the security-gateway attribute:
          + provide the argument application on the command line with a fully
            specified name;
          + provide the argument --security-gateway on the command line.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to remove the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Deleted principals have an additional deleted: prefix and a ?uid=UID
        suffix, where UID is a unique identifier for the principal. Example:
        deleted:user:test-user@gmail.com?uid=123456789012345678901.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        The role to remove the principal from.

OPTIONAL FLAGS
     At most one of these can be specified:

       --all
          Remove all bindings with this role and principal, irrespective of any
          conditions.

       --condition=[KEY=VALUE,...]
          The condition of the binding that you want to remove. When the
          condition is explicitly specified as None (--condition=None), a
          binding without a condition is removed. Otherwise, only a binding
          with a condition that exactly matches the specified condition
          (including the optional description) is removed. For more on
          conditions, refer to the conditions overview guide:
          https://cloud.google.com/iam/docs/conditions-overview

          When using the --condition flag, include the following key-value
          pairs:

           expression
              (Required) Condition expression that evaluates to True or False.
              This uses a subset of Common Expression Language syntax.

              If the condition expression includes a comma, use a different
              delimiter to separate the key-value pairs. Specify the delimiter
              before listing the key-value pairs. For example, to specify a
              colon (:) as the delimiter, do the following:
              --condition=^:^title=TITLE:expression=EXPRESSION. For more
              information, see
              https://cloud.google.com/sdk/gcloud/reference/topic/escaping.

           title
              (Required) A short string describing the purpose of the
              expression.

           description
              (Optional) Additional description for the expression.

       --condition-from-file=PATH_TO_FILE
          Path to a local JSON or YAML file that defines the condition. To see
          available fields, see the help for --condition. Use a full or
          relative path to a local file containing the value of condition.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta beyondcorp security-gateways applications \
            remove-iam-policy-binding
```

### gcloud beyondcorp security-gateways applications set-iam-policy

```text
NAME
    gcloud beyondcorp security-gateways applications set-iam-policy - set the
        IAM policy for a security gateway application

SYNOPSIS
    gcloud beyondcorp security-gateways applications set-iam-policy
        (APPLICATION : --location=LOCATION --security-gateway=SECURITY_GATEWAY)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given security gateway application.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    'policy.json' and set it for the security gateway application with ID
    my-security-gateway-application:

        $ gcloud beyondcorp security-gateways applications set-iam-policy \
            my-security-gateway-application policy.json --location=global

POSITIONAL ARGUMENTS
     Application resource - The security gateway application for which to set
     the IAM policy. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument application on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       APPLICATION
          ID of the application or fully qualified identifier for the
          application.

          To set the application attribute:
          + provide the argument application on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the application resource. We support only global
          location.

          To set the location attribute:
          + provide the argument application on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --security-gateway=SECURITY_GATEWAY
          The securityGateway id of the application resource.

          To set the security-gateway attribute:
          + provide the argument application on the command line with a fully
            specified name;
          + provide the argument --security-gateway on the command line.

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
    This command uses the beyondcorp/v1alpha API. The full documentation for
    this API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta beyondcorp security-gateways applications \
            set-iam-policy
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud beyondcorp security-gateways applications set-iam-policy my-security-gateway-application policy.json \
    --location=global \
    --security-gateway=my-security-gateway
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (the help text above is verbatim): the `applications describe` positional argument gives the form `projects/{project_id}/locations/global/securityGateway/{security_gateway_id}/applications/{application_id}`; the collection is plural: `projects/{project_id}/locations/global/securityGateways/{security_gateway_id}/applications/{application_id}` (Discovery document `beyondcorp` v1: `projects/{projectsId}/locations/{locationsId}/securityGateways/{securityGatewaysId}`; the `create`, `delete` and `update` pages of this group also use `securityGateways`).
- Incomplete example: the `create`, `delete`, `describe` and `list` examples give only the command; gcloud 593.0.0 fails with "argument (APPLICATION : --location=LOCATION --security-gateway=SECURITY_GATEWAY): Must be specified." (`list`: "argument (--security-gateway : --location): Must be specified."). Add the required arguments (see SYNOPSIS and FLAGS on this page).
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `get-iam-policy` and `set-iam-policy` example omits `--security-gateway`, which the SYNOPSIS requires for the resource (no property sets it); gcloud 593.0.0 fails with "Failed to find attribute [security-gateway]" without it, so the runnable form adds `--security-gateway=my-security-gateway`, the security gateway of the `add-iam-policy-binding` and `remove-iam-policy-binding` examples on this page.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beyondcorp/security-gateways/applications (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
