---
source: https://docs.cloud.google.com/sdk/gcloud/reference/developer-connect/account-connectors
---

# gcloud developer-connect account-connectors

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud developer-connect account-connectors create

```text
NAME
    gcloud developer-connect account-connectors create - create
        accountConnectors

SYNOPSIS
    gcloud developer-connect account-connectors create ACCOUNT_CONNECTOR
        [--annotations=[ANNOTATIONS,...]] [--async] [--etag=ETAG]
        [--labels=[LABELS,...]] [--location=LOCATION] [--proxy-config-enabled]
        [--request-id=REQUEST_ID] [--validate-only]
        [[--custom-oauth-config-auth-uri=CUSTOM_OAUTH_CONFIG_AUTH_URI
          --custom-oauth-config-client-id=CUSTOM_OAUTH_CONFIG_CLIENT_ID
          --custom-oauth-config-client-secret=CUSTOM_OAUTH_CONFIG_CLIENT_SECRET
          --custom-oauth-config-host-uri=CUSTOM_OAUTH_CONFIG_HOST_URI
          --custom-oauth-config-scm-provider=CUSTOM_OAUTH_CONFIG_SCM_PROVIDER
          --custom-oauth-config-scopes=[CUSTOM_OAUTH_CONFIG_SCOPES,...]
          --custom-oauth-config-token-uri=CUSTOM_OAUTH_CONFIG_TOKEN_URI
          : --custom-oauth-config-pkce-disabled
          --custom-oauth-config-ssl-ca-certificate=CUSTOM_OAUTH_CONFIG_SSL_CA_CERTIFICATE (--custom-oauth-config-service-directory=CUSTOM_OAUTH_CONFIG_SERVICE_DIRECTORY : --namespace=NAMESPACE)] | [--provider-oauth-config-scopes=[PROVIDER_OAUTH_CONFIG_SCOPES,
          ...]
          : --provider-oauth-config-system-id=PROVIDER_OAUTH_CONFIG_SYSTEM_ID]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an accountConnector

EXAMPLES
    To create the accountConnector, run:

        $ gcloud developer-connect account-connectors create

POSITIONAL ARGUMENTS
     AccountConnector resource - Identifier. The resource name of the
     accountConnector, in the format
     projects/{project}/locations/{location}/accountConnectors/{account_connector_id}.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument account_connector on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument account_connector on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       ACCOUNT_CONNECTOR
          ID of the accountConnector or fully qualified identifier for the
          accountConnector.

          To set the account_connector attribute:
          + provide the argument account_connector on the command line.

FLAGS
     --annotations=[ANNOTATIONS,...]
        Allows users to store small amounts of arbitrary data.

         KEY
            Sets KEY value.

         VALUE
            Sets VALUE value.

        Shorthand Example:

            --annotations=string=string

        JSON Example:

            --annotations='{"string": "string"}'

        File Example:

            --annotations=path_to_file.(yaml|json)

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        This checksum is computed by the server based on the value of other
        fields, and may be sent on update and delete requests to ensure the
        client has an up-to-date value before proceeding.

     --labels=[LABELS,...]
        Labels as key value pairs.

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

     --location=LOCATION
        For resources [account_connector,
        custom-oauth-config-service-directory], provides fallback value for
        resource location attribute. When the resource's full URI path is not
        provided, location will fallback to this flag value.

     Proxy configuration.

     --proxy-config-enabled
        Setting this to true allows the git and http proxies to perform actions
        on behalf of the user configured under the account connector.

     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server will
        guarantee that for at least 60 minutes since the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     --validate-only
        If set, validate the request, but do not actually post it.

     Arguments for the account connector config.

     At most one of these can be specified:

       Message for a customized OAuth config.

       --custom-oauth-config-auth-uri=CUSTOM_OAUTH_CONFIG_AUTH_URI
          The OAuth2 authrization server URL.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --custom-oauth-config-client-id=CUSTOM_OAUTH_CONFIG_CLIENT_ID
          Client ID of the OAuth application.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --custom-oauth-config-client-secret=CUSTOM_OAUTH_CONFIG_CLIENT_SECRET
          Client secret of the OAuth application. It will be provided as plain
          text, but encrypted and stored in developer connect. As INPUT_ONLY
          field, it will not be included in the output.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --custom-oauth-config-host-uri=CUSTOM_OAUTH_CONFIG_HOST_URI
          Host URI of the OAuth application.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --custom-oauth-config-scm-provider=CUSTOM_OAUTH_CONFIG_SCM_PROVIDER
          Type of the SCM provider. CUSTOM_OAUTH_CONFIG_SCM_PROVIDER must be
          one of:

           bitbucket-data-center
              BYO Account Connector is an instance of Bitbucket Data Center.
           github-enterprise
              BYO Account Connector is an instance of GitHub Enterprise.
           gitlab-enterprise
              BYO Account Connector is an instance of GitLab Enterprise.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --custom-oauth-config-scopes=[CUSTOM_OAUTH_CONFIG_SCOPES,...]
          Scopes to be requested during OAuth.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --custom-oauth-config-token-uri=CUSTOM_OAUTH_CONFIG_TOKEN_URI
          The OAuth2 token request URL.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --custom-oauth-config-pkce-disabled
          Disable PKCE for this OAuth config. PKCE is enabled by default.

       --custom-oauth-config-ssl-ca-certificate=CUSTOM_OAUTH_CONFIG_SSL_CA_CERTIFICATE
          SSL certificate to use for requests to a private service.

       ServiceDirectoryConfig represents Service Directory configuration for a
       connection.

       Service resource - The Service Directory service name. Format:
       projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.
       The arguments in this group can be used to specify the attributes of
       this resource. (NOTE) Some attributes are not given arguments in this
       group but can be set in other ways.

       To set the project attribute:
        + provide the argument --custom-oauth-config-service-directory on the
          command line with a fully specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --custom-oauth-config-service-directory on the
          command line with a fully specified name;
        + provide the argument --location on the command line.

       This must be specified.

         --custom-oauth-config-service-directory=CUSTOM_OAUTH_CONFIG_SERVICE_DIRECTORY
            ID of the service or fully qualified identifier for the service.

            To set the service attribute:
            - provide the argument --custom-oauth-config-service-directory on
              the command line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --namespace=NAMESPACE
            The namespace id of the service resource.

            To set the namespace attribute:
            - provide the argument --custom-oauth-config-service-directory on
              the command line with a fully specified name;
            - provide the argument --namespace on the command line.

       ProviderOAuthConfig is the OAuth config for a provider.

       --provider-oauth-config-scopes=[PROVIDER_OAUTH_CONFIG_SCOPES,...]
          User selected scopes to apply to the Oauth config In the event of
          changing scopes, user records under AccountConnector will be deleted
          and users will re-auth again.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       Arguments for the oauth provider id.

       --provider-oauth-config-system-id=PROVIDER_OAUTH_CONFIG_SYSTEM_ID
          Developer Connect provided OAuth. PROVIDER_OAUTH_CONFIG_SYSTEM_ID
          must be one of:

           bitbucket-cloud
              Bitbucket Cloud provider.
           datastax
              Datastax provider. No scopes are allowed.
           dynatrace
              Dynatrace provider.
           github
              GitHub provider. Scopes can be found at
              https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps#available-scopes
           gitlab
              GitLab provider. Scopes can be found at
              https://docs.gitlab.com/user/profile/personal_access_tokens/#personal-access-token-scopes
           google
              Google provider. Recommended scopes:
              "https://www.googleapis.com/auth/drive.readonly",
              "https://www.googleapis.com/auth/documents.readonly"
           new-relic
              New Relic provider. No scopes are allowed.
           rovo
              Rovo provider. Must select the "rovo" scope.
           sentry
              Sentry provider. Scopes can be found at
              https://docs.sentry.io/api/permissions/

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the developerconnect/v1 API. The full documentation for
    this API can be found at:
    http://cloud.google.com/developer-connect/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha developer-connect account-connectors create

        $ gcloud beta developer-connect account-connectors create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud developer-connect account-connectors create my-account-connector \
    --location=us-central1
```

### gcloud developer-connect account-connectors delete

```text
NAME
    gcloud developer-connect account-connectors delete - delete
        accountConnectors

SYNOPSIS
    gcloud developer-connect account-connectors delete
        (ACCOUNT_CONNECTOR : --location=LOCATION) [--async] [--etag=ETAG]
        [--force] [--request-id=REQUEST_ID] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an accountConnector

EXAMPLES
    To delete the accountConnector, run:

        $ gcloud developer-connect account-connectors delete

POSITIONAL ARGUMENTS
     AccountConnector resource - Name of the resource The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument account_connector on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACCOUNT_CONNECTOR
          ID of the accountConnector or fully qualified identifier for the
          accountConnector.

          To set the account_connector attribute:
          + provide the argument account_connector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the accountConnector resource.

          To set the location attribute:
          + provide the argument account_connector on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        The current etag of the AccountConnectorn. If an etag is provided and
        does not match the current etag of the AccountConnector, deletion will
        be blocked and an ABORTED error will be returned.

     --force
        If set to true, any Users from this AccountConnector will also be
        deleted. (Otherwise, the request will only work if the AccountConnector
        has no Users.)

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
        If set, validate the request, but do not actually post it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the developerconnect/v1 API. The full documentation for
    this API can be found at:
    http://cloud.google.com/developer-connect/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha developer-connect account-connectors delete

        $ gcloud beta developer-connect account-connectors delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud developer-connect account-connectors delete my-account-connector \
    --location=us-central1
```

### gcloud developer-connect account-connectors describe

```text
NAME
    gcloud developer-connect account-connectors describe - describe
        accountConnectors

SYNOPSIS
    gcloud developer-connect account-connectors describe
        (ACCOUNT_CONNECTOR : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an accountConnector

EXAMPLES
    To describe the accountConnector, run:

        $ gcloud developer-connect account-connectors describe

POSITIONAL ARGUMENTS
     AccountConnector resource - Name of the resource The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument account_connector on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACCOUNT_CONNECTOR
          ID of the accountConnector or fully qualified identifier for the
          accountConnector.

          To set the account_connector attribute:
          + provide the argument account_connector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the accountConnector resource.

          To set the location attribute:
          + provide the argument account_connector on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the developerconnect/v1 API. The full documentation for
    this API can be found at:
    http://cloud.google.com/developer-connect/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha developer-connect account-connectors describe

        $ gcloud beta developer-connect account-connectors describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud developer-connect account-connectors describe my-account-connector \
    --location=us-central1
```

### gcloud developer-connect account-connectors list

```text
NAME
    gcloud developer-connect account-connectors list - list accountConnectors

SYNOPSIS
    gcloud developer-connect account-connectors list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List accountConnectors

EXAMPLES
    To list all accountConnectors, run:

        $ gcloud developer-connect account-connectors list

REQUIRED FLAGS
     Location resource - Parent value for ListAccountConnectorsRequest This
     represents a Cloud resource. (NOTE) Some attributes are not given
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
    This command uses the developerconnect/v1 API. The full documentation for
    this API can be found at:
    http://cloud.google.com/developer-connect/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha developer-connect account-connectors list

        $ gcloud beta developer-connect account-connectors list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud developer-connect account-connectors list \
    --location=us-central1
```

### gcloud developer-connect account-connectors update

```text
NAME
    gcloud developer-connect account-connectors update - update
        accountConnectors

SYNOPSIS
    gcloud developer-connect account-connectors update ACCOUNT_CONNECTOR
        [--[no-]allow-missing] [--async] [--etag=ETAG] [--location=LOCATION]
        [--request-id=REQUEST_ID] [--[no-]validate-only]
        [--annotations=[ANNOTATIONS,...]
          | --update-annotations=[UPDATE_ANNOTATIONS,...] --clear-annotations
          | --remove-annotations=REMOVE_ANNOTATIONS]
        [--clear-custom-oauth-config
          --custom-oauth-config-client-id=CUSTOM_OAUTH_CONFIG_CLIENT_ID
          --custom-oauth-config-client-secret=CUSTOM_OAUTH_CONFIG_CLIENT_SECRET
          --custom-oauth-config-host-uri=CUSTOM_OAUTH_CONFIG_HOST_URI
          --[no-]custom-oauth-config-pkce-disabled
          --custom-oauth-config-scm-provider=CUSTOM_OAUTH_CONFIG_SCM_PROVIDER
          --custom-oauth-config-scopes=[CUSTOM_OAUTH_CONFIG_SCOPES,...]
          --custom-oauth-config-ssl-ca-certificate=CUSTOM_OAUTH_CONFIG_SSL_CA_CERTIFICATE [--custom-oauth-config-service-directory=CUSTOM_OAUTH_CONFIG_SERVICE_DIRECTORY : --namespace=NAMESPACE] | --clear-provider-oauth-config --provider-oauth-config-scopes=[PROVIDER_OAUTH_CONFIG_SCOPES,
          ...]] [--clear-proxy-config --[no-]proxy-config-enabled]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an accountConnector

EXAMPLES
    To update the accountConnector, run:

        $ gcloud developer-connect account-connectors update

POSITIONAL ARGUMENTS
     AccountConnector resource - Identifier. The resource name of the
     accountConnector, in the format
     projects/{project}/locations/{location}/accountConnectors/{account_connector_id}.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument account_connector on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument account_connector on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       ACCOUNT_CONNECTOR
          ID of the accountConnector or fully qualified identifier for the
          accountConnector.

          To set the account_connector attribute:
          + provide the argument account_connector on the command line.

FLAGS
     --[no-]allow-missing
        If set to true, and the accountConnector is not found a new
        accountConnector will be created. In this situation update_mask is
        ignored. The creation will succeed only if the input accountConnector
        has all the necessary. Use --allow-missing to enable and
        --no-allow-missing to disable.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        This checksum is computed by the server based on the value of other
        fields, and may be sent on update and delete requests to ensure the
        client has an up-to-date value before proceeding.

     --location=LOCATION
        For resources [account_connector,
        custom-oauth-config-service-directory], provides fallback value for
        resource location attribute. When the resource's full URI path is not
        provided, location will fallback to this flag value.

     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server will
        guarantee that for at least 60 minutes since the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     --[no-]validate-only
        If set, validate the request, but do not actually post it. Use
        --validate-only to enable and --no-validate-only to disable.

     Update annotations.

     At most one of these can be specified:

       --annotations=[ANNOTATIONS,...]
          Set annotations to new value. Allows users to store small amounts of
          arbitrary data.

           KEY
              Sets KEY value.

           VALUE
              Sets VALUE value.

          Shorthand Example:

              --annotations=string=string

          JSON Example:

              --annotations='{"string": "string"}'

          File Example:

              --annotations=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --update-annotations=[UPDATE_ANNOTATIONS,...]
            Update annotations value or add key value pair. Allows users to
            store small amounts of arbitrary data.

             KEY
                Sets KEY value.

             VALUE
                Sets VALUE value.

            Shorthand Example:

                --update-annotations=string=string

            JSON Example:

                --update-annotations='{"string": "string"}'

            File Example:

                --update-annotations=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-annotations
              Clear annotations value and set to empty map.

           --remove-annotations=REMOVE_ANNOTATIONS
              Remove existing value from map annotations. Sets
              remove_annotations value.

              Shorthand Example:

                  --remove-annotations=string,string

              JSON Example:

                  --remove-annotations=["string"]

              File Example:

                  --remove-annotations=path_to_file.(yaml|json)

     Arguments for the account connector config.

     At most one of these can be specified:

       Message for a customized OAuth config.

       --clear-custom-oauth-config
          Set accountConnector.customOauthConfig back to default value.

       --custom-oauth-config-client-id=CUSTOM_OAUTH_CONFIG_CLIENT_ID
          Client ID of the OAuth application.

       --custom-oauth-config-client-secret=CUSTOM_OAUTH_CONFIG_CLIENT_SECRET
          Client secret of the OAuth application. It will be provided as plain
          text, but encrypted and stored in developer connect. As INPUT_ONLY
          field, it will not be included in the output.

       --custom-oauth-config-host-uri=CUSTOM_OAUTH_CONFIG_HOST_URI
          Host URI of the OAuth application.

       --[no-]custom-oauth-config-pkce-disabled
          Disable PKCE for this OAuth config. PKCE is enabled by default. Use
          --custom-oauth-config-pkce-disabled to disable and
          --no-custom-oauth-config-pkce-disabled to enable.

       --custom-oauth-config-scm-provider=CUSTOM_OAUTH_CONFIG_SCM_PROVIDER
          Type of the SCM provider. CUSTOM_OAUTH_CONFIG_SCM_PROVIDER must be
          one of:

           bitbucket-data-center
              BYO Account Connector is an instance of Bitbucket Data Center.
           github-enterprise
              BYO Account Connector is an instance of GitHub Enterprise.
           gitlab-enterprise
              BYO Account Connector is an instance of GitLab Enterprise.

       --custom-oauth-config-scopes=[CUSTOM_OAUTH_CONFIG_SCOPES,...]
          Scopes to be requested during OAuth.

       --custom-oauth-config-ssl-ca-certificate=CUSTOM_OAUTH_CONFIG_SSL_CA_CERTIFICATE
          SSL certificate to use for requests to a private service.

       ServiceDirectoryConfig represents Service Directory configuration for a
       connection.

       Service resource - The Service Directory service name. Format:
       projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.
       The arguments in this group can be used to specify the attributes of
       this resource. (NOTE) Some attributes are not given arguments in this
       group but can be set in other ways.

       To set the project attribute:
        + provide the argument --custom-oauth-config-service-directory on the
          command line with a fully specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --custom-oauth-config-service-directory on the
          command line with a fully specified name;
        + provide the argument --location on the command line.

       --custom-oauth-config-service-directory=CUSTOM_OAUTH_CONFIG_SERVICE_DIRECTORY
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument --custom-oauth-config-service-directory on
            the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --namespace=NAMESPACE
          The namespace id of the service resource.

          To set the namespace attribute:
          + provide the argument --custom-oauth-config-service-directory on
            the command line with a fully specified name;
          + provide the argument --namespace on the command line.

       ProviderOAuthConfig is the OAuth config for a provider.

       --clear-provider-oauth-config
          Set accountConnector.providerOauthConfig back to default value.

       --provider-oauth-config-scopes=[PROVIDER_OAUTH_CONFIG_SCOPES,...]
          User selected scopes to apply to the Oauth config In the event of
          changing scopes, user records under AccountConnector will be deleted
          and users will re-auth again.

     Proxy configuration.

     --clear-proxy-config
        Set accountConnector.proxyConfig back to default value.

     --[no-]proxy-config-enabled
        Setting this to true allows the git and http proxies to perform actions
        on behalf of the user configured under the account connector. Use
        --proxy-config-enabled to enable and --no-proxy-config-enabled to
        disable.

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. Labels as key value pairs.

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
            Update labels value or add key value pair. Labels as key value
            pairs.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the developerconnect/v1 API. The full documentation for
    this API can be found at:
    http://cloud.google.com/developer-connect/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha developer-connect account-connectors update

        $ gcloud beta developer-connect account-connectors update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud developer-connect account-connectors update my-account-connector \
    --location=us-central1
```

### gcloud beta developer-connect account-connectors create

```text
NAME
    gcloud beta developer-connect account-connectors create - create
        accountConnectors

SYNOPSIS
    gcloud beta developer-connect account-connectors create ACCOUNT_CONNECTOR
        [--annotations=[ANNOTATIONS,...]] [--async] [--etag=ETAG]
        [--labels=[LABELS,...]] [--location=LOCATION] [--proxy-config-enabled]
        [--request-id=REQUEST_ID] [--validate-only]
        [[--custom-oauth-config-auth-uri=CUSTOM_OAUTH_CONFIG_AUTH_URI
          --custom-oauth-config-client-id=CUSTOM_OAUTH_CONFIG_CLIENT_ID
          --custom-oauth-config-client-secret=CUSTOM_OAUTH_CONFIG_CLIENT_SECRET
          --custom-oauth-config-host-uri=CUSTOM_OAUTH_CONFIG_HOST_URI
          --custom-oauth-config-scm-provider=CUSTOM_OAUTH_CONFIG_SCM_PROVIDER
          --custom-oauth-config-scopes=[CUSTOM_OAUTH_CONFIG_SCOPES,...]
          --custom-oauth-config-token-uri=CUSTOM_OAUTH_CONFIG_TOKEN_URI
          : --custom-oauth-config-pkce-disabled
          --custom-oauth-config-ssl-ca-certificate=CUSTOM_OAUTH_CONFIG_SSL_CA_CERTIFICATE [--custom-oauth-config-service-directory=CUSTOM_OAUTH_CONFIG_SERVICE_DIRECTORY : --namespace=NAMESPACE]] | [--provider-oauth-config-scopes=[PROVIDER_OAUTH_CONFIG_SCOPES,
          ...]
          : --provider-oauth-config-system-id=PROVIDER_OAUTH_CONFIG_SYSTEM_ID]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta developer-connect account-connectors delete

```text
NAME
    gcloud beta developer-connect account-connectors delete - delete
        accountConnectors

SYNOPSIS
    gcloud beta developer-connect account-connectors delete
        (ACCOUNT_CONNECTOR : --location=LOCATION) [--async] [--etag=ETAG]
        [--force] [--request-id=REQUEST_ID] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta developer-connect account-connectors describe

```text
NAME
    gcloud beta developer-connect account-connectors describe - describe
        accountConnectors

SYNOPSIS
    gcloud beta developer-connect account-connectors describe
        (ACCOUNT_CONNECTOR : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta developer-connect account-connectors list

```text
NAME
    gcloud beta developer-connect account-connectors list - list
        accountConnectors

SYNOPSIS
    gcloud beta developer-connect account-connectors list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta developer-connect account-connectors update

```text
NAME
    gcloud beta developer-connect account-connectors update - update
        accountConnectors

SYNOPSIS
    gcloud beta developer-connect account-connectors update ACCOUNT_CONNECTOR
        [--[no-]allow-missing] [--async] [--etag=ETAG] [--location=LOCATION]
        [--request-id=REQUEST_ID] [--[no-]validate-only]
        [--annotations=[ANNOTATIONS,...]
          | --update-annotations=[UPDATE_ANNOTATIONS,...] --clear-annotations
          | --remove-annotations=REMOVE_ANNOTATIONS]
        [--clear-custom-oauth-config
          --custom-oauth-config-client-id=CUSTOM_OAUTH_CONFIG_CLIENT_ID
          --custom-oauth-config-client-secret=CUSTOM_OAUTH_CONFIG_CLIENT_SECRET
          --custom-oauth-config-host-uri=CUSTOM_OAUTH_CONFIG_HOST_URI
          --[no-]custom-oauth-config-pkce-disabled
          --custom-oauth-config-scm-provider=CUSTOM_OAUTH_CONFIG_SCM_PROVIDER
          --custom-oauth-config-scopes=[CUSTOM_OAUTH_CONFIG_SCOPES,...]
          --custom-oauth-config-ssl-ca-certificate=CUSTOM_OAUTH_CONFIG_SSL_CA_CERTIFICATE [--custom-oauth-config-service-directory=CUSTOM_OAUTH_CONFIG_SERVICE_DIRECTORY : --namespace=NAMESPACE] | --clear-provider-oauth-config --provider-oauth-config-scopes=[PROVIDER_OAUTH_CONFIG_SCOPES,
          ...]] [--clear-proxy-config --[no-]proxy-config-enabled]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect account-connectors create

```text
NAME
    gcloud alpha developer-connect account-connectors create - create
        accountConnectors

SYNOPSIS
    gcloud alpha developer-connect account-connectors create ACCOUNT_CONNECTOR
        [--annotations=[ANNOTATIONS,...]] [--async] [--etag=ETAG]
        [--labels=[LABELS,...]] [--location=LOCATION] [--proxy-config-enabled]
        [--request-id=REQUEST_ID] [--validate-only]
        [[--custom-oauth-config-auth-uri=CUSTOM_OAUTH_CONFIG_AUTH_URI
          --custom-oauth-config-client-id=CUSTOM_OAUTH_CONFIG_CLIENT_ID
          --custom-oauth-config-client-secret=CUSTOM_OAUTH_CONFIG_CLIENT_SECRET
          --custom-oauth-config-host-uri=CUSTOM_OAUTH_CONFIG_HOST_URI
          --custom-oauth-config-scm-provider=CUSTOM_OAUTH_CONFIG_SCM_PROVIDER
          --custom-oauth-config-scopes=[CUSTOM_OAUTH_CONFIG_SCOPES,...]
          --custom-oauth-config-token-uri=CUSTOM_OAUTH_CONFIG_TOKEN_URI
          : --custom-oauth-config-pkce-disabled
          --custom-oauth-config-ssl-ca-certificate=CUSTOM_OAUTH_CONFIG_SSL_CA_CERTIFICATE [--custom-oauth-config-service-directory=CUSTOM_OAUTH_CONFIG_SERVICE_DIRECTORY : --namespace=NAMESPACE]] | [--provider-oauth-config-scopes=[PROVIDER_OAUTH_CONFIG_SCOPES,
          ...]
          : --provider-oauth-config-system-id=PROVIDER_OAUTH_CONFIG_SYSTEM_ID]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect account-connectors delete

```text
NAME
    gcloud alpha developer-connect account-connectors delete - delete
        accountConnectors

SYNOPSIS
    gcloud alpha developer-connect account-connectors delete
        (ACCOUNT_CONNECTOR : --location=LOCATION) [--async] [--etag=ETAG]
        [--force] [--request-id=REQUEST_ID] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect account-connectors describe

```text
NAME
    gcloud alpha developer-connect account-connectors describe - describe
        accountConnectors

SYNOPSIS
    gcloud alpha developer-connect account-connectors describe
        (ACCOUNT_CONNECTOR : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect account-connectors list

```text
NAME
    gcloud alpha developer-connect account-connectors list - list
        accountConnectors

SYNOPSIS
    gcloud alpha developer-connect account-connectors list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha developer-connect account-connectors update

```text
NAME
    gcloud alpha developer-connect account-connectors update - update
        accountConnectors

SYNOPSIS
    gcloud alpha developer-connect account-connectors update ACCOUNT_CONNECTOR
        [--[no-]allow-missing] [--async] [--etag=ETAG] [--location=LOCATION]
        [--request-id=REQUEST_ID] [--[no-]validate-only]
        [--annotations=[ANNOTATIONS,...]
          | --update-annotations=[UPDATE_ANNOTATIONS,...] --clear-annotations
          | --remove-annotations=REMOVE_ANNOTATIONS]
        [--clear-custom-oauth-config
          --custom-oauth-config-client-id=CUSTOM_OAUTH_CONFIG_CLIENT_ID
          --custom-oauth-config-client-secret=CUSTOM_OAUTH_CONFIG_CLIENT_SECRET
          --custom-oauth-config-host-uri=CUSTOM_OAUTH_CONFIG_HOST_URI
          --[no-]custom-oauth-config-pkce-disabled
          --custom-oauth-config-scm-provider=CUSTOM_OAUTH_CONFIG_SCM_PROVIDER
          --custom-oauth-config-scopes=[CUSTOM_OAUTH_CONFIG_SCOPES,...]
          --custom-oauth-config-ssl-ca-certificate=CUSTOM_OAUTH_CONFIG_SSL_CA_CERTIFICATE [--custom-oauth-config-service-directory=CUSTOM_OAUTH_CONFIG_SERVICE_DIRECTORY : --namespace=NAMESPACE] | --clear-provider-oauth-config --provider-oauth-config-scopes=[PROVIDER_OAUTH_CONFIG_SCOPES,
          ...]] [--clear-proxy-config --[no-]proxy-config-enabled]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example gives only the command, without the `--location` that the SYNOPSIS requires (gcloud 593.0.0: "argument --location: Must be specified"); the runnable form adds sample values.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example gives only the command, without the account connector name and `--location` that the SYNOPSIS requires (gcloud 593.0.0: "argument ACCOUNT_CONNECTOR: Must be specified"); the runnable form adds sample values.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/developer-connect/account-connectors (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
