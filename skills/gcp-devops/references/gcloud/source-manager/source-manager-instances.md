---
source: https://docs.cloud.google.com/sdk/gcloud/reference/source-manager/instances
---

# gcloud source-manager instances

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud source-manager instances add-iam-policy-binding

```text
NAME
    gcloud source-manager instances add-iam-policy-binding - add an IAM policy
        binding to a Secure Source Manager instance

SYNOPSIS
    gcloud source-manager instances add-iam-policy-binding
        (INSTANCE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to a Secure Source Manager instance.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' with instance named 'my-instance' and location
    'us-central1', run:

        $ gcloud source-manager instances add-iam-policy-binding \
            my-instance --region='us-central1' \
            --member='user:test-user@gmail.com' --role='roles/editor'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Instance resource - The instance for which to add the IAM policy binding.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Secure Source Manager location.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

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
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securesourcemanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/secure-source-manager

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha source-manager instances add-iam-policy-binding

        $ gcloud beta source-manager instances add-iam-policy-binding
```

### gcloud source-manager instances create

```text
NAME
    gcloud source-manager instances create - create a Secure Source Manager
        instance

SYNOPSIS
    gcloud source-manager instances create (INSTANCE : --region=REGION)
        [--async] [--enable-workforce-identity-federation]
        [--endpoint-mode=ENDPOINT_MODE] [--kms-key=KMS_KEY]
        [--max-wait=MAX_WAIT; default="60m"]
        [--is-private : --ca-pool=CA_POOL --psc-allowed-projects=[PROJECTS,...]
          --custom-hostname-api=CUSTOM_HOSTNAME_API
          --custom-hostname-git-http=CUSTOM_HOSTNAME_GIT_HTTP
          --custom-hostname-git-ssh=CUSTOM_HOSTNAME_GIT_SSH
          --custom-hostname-html=CUSTOM_HOSTNAME_HTML] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Secure Source Manager instance.

EXAMPLES
    To create a Secure Source Manager instance named 'my-instance' in location
    'us-central1' asynchronously, run:

        $ gcloud source-manager instances create my-instance \
            --region=us-central1

    To create a Secure Source Manager instance named 'my-instance' in location
    'us-central1' synchronously, and wait a maximum of 30 minutes for it to
    finish being created, run:

        $ gcloud source-manager instances create my-instance \
            --region=us-central1 --no-async --max-wait=30m

POSITIONAL ARGUMENTS
     Instance resource - The Secure Source Manager instance to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Secure Source Manager location.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --enable-workforce-identity-federation
        Bool indicator for workforce identity federation instance.

     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     --kms-key=KMS_KEY
        KMS key used to encrypt instance optionally.

     --max-wait=MAX_WAIT; default="60m"
        Time to synchronously wait for the operation to complete, after which
        the operation continues asynchronously. Ignored if --no-async isn't
        specified. See $ gcloud topic datetimes for information on time
        formats.

     Private instance configuration.

     --is-private
        Bool indicator for private instance.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --ca-pool=CA_POOL
        CA Pool path for private instance.

     --psc-allowed-projects=[PROJECTS,...]
        List of additional projects allowed to connect to the instance via
        private service connect.

     Custom hostname configuration.

     --custom-hostname-api=CUSTOM_HOSTNAME_API
        Custom hostname for api.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --custom-hostname-git-http=CUSTOM_HOSTNAME_GIT_HTTP
        Custom hostname for git http.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --custom-hostname-git-ssh=CUSTOM_HOSTNAME_GIT_SSH
        Custom hostname for git ssh.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --custom-hostname-html=CUSTOM_HOSTNAME_HTML
        Custom hostname for html.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha source-manager instances create

        $ gcloud beta source-manager instances create
```

### gcloud source-manager instances delete

```text
NAME
    gcloud source-manager instances delete - delete a Secure Source Manager
        instance

SYNOPSIS
    gcloud source-manager instances delete (INSTANCE : --region=REGION)
        [--async] [--endpoint-mode=ENDPOINT_MODE]
        [--max-wait=MAX_WAIT; default="60m"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Secure Source Manager instance.

EXAMPLES
    To delete a Secure Source Manager instance named 'my-instance' in location
    'us-central1' asynchronously, run:

        $ gcloud source-manager instances delete my-instance \
            --region=us-central1

    To delete a Secure Source Manager instance named 'my-instance' in location
    'us-central1' synchronously, and wait a maximum of 30 minutes for it to
    finish being deleted, run:

        $ gcloud source-manager instances delete my-instance \
            --region=us-central1 --no-async --max-wait=30m

POSITIONAL ARGUMENTS
     Instance resource - The Secure Source Manager instance to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Secure Source Manager location.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     --max-wait=MAX_WAIT; default="60m"
        Time to synchronously wait for the operation to complete, after which
        the operation continues asynchronously. Ignored if --no-async isn't
        specified. See $ gcloud topic datetimes for information on time
        formats.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha source-manager instances delete

        $ gcloud beta source-manager instances delete
```

### gcloud source-manager instances describe

```text
NAME
    gcloud source-manager instances describe - describe a Secure Source Manager
        instance

SYNOPSIS
    gcloud source-manager instances describe (INSTANCE : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details of a Secure Source Manager instance.

EXAMPLES
    To describe a Secure Source Manager instance named 'my-instance' in
    location 'us-central1' under the current project, run:

        $ gcloud source-manager instances describe my-instance \
            --region=us-central1

POSITIONAL ARGUMENTS
     Instance resource - The instance you want to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Secure Source Manager location.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securesourcemanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/secure-source-manager

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha source-manager instances describe

        $ gcloud beta source-manager instances describe
```

### gcloud source-manager instances get-iam-policy

```text
NAME
    gcloud source-manager instances get-iam-policy - get the IAM policy for a
        Secure Source Manager instance

SYNOPSIS
    gcloud source-manager instances get-iam-policy (INSTANCE : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the IAM policy for a Secure Source Manager instance.

EXAMPLES
    To get the IAM policy for an instance named 'my-instance' in location
    'us-central1', run:

        $ gcloud source-manager instances get-iam-policy my-instance \
            --region=us-central1

POSITIONAL ARGUMENTS
     Instance resource - The Secure Source Manager instance for which to get
     the IAM policy. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Secure Source Manager location.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

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
    This command uses the securesourcemanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/secure-source-manager

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha source-manager instances get-iam-policy

        $ gcloud beta source-manager instances get-iam-policy
```

### gcloud source-manager instances list

```text
NAME
    gcloud source-manager instances list - list Secure Source Manager instances

SYNOPSIS
    gcloud source-manager instances list --region=REGION
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all instances on your Secure Source Manager.

EXAMPLES
    To list all Secure Source Manager instances in location 'us-central1' under
    the current project, run:

        $ gcloud source-manager instances list --region=us-central1

REQUIRED FLAGS
     Location resource - The location you want to list the instances for. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --region=REGION
          ID of the location or fully qualified identifier for the location.

          To set the region attribute:
          + provide the argument --region on the command line.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

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
    This command uses the securesourcemanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/secure-source-manager

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha source-manager instances list

        $ gcloud beta source-manager instances list
```

### gcloud source-manager instances remove-iam-policy-binding

```text
NAME
    gcloud source-manager instances remove-iam-policy-binding - remove an IAM
        policy binding to a Secure Source Manager instance

SYNOPSIS
    gcloud source-manager instances remove-iam-policy-binding
        (INSTANCE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding to a Secure Source Manager instance.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' with instance named 'my-instance' and location
    'us-central1', run:

        $ gcloud source-manager instances remove-iam-policy-binding \
            my-instance --region='us-central1' \
            --member='user:test-user@gmail.com' --role='roles/editor'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Instance resource - The instance for which to remove the IAM policy
     binding. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Secure Source Manager location.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

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
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securesourcemanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/secure-source-manager

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha source-manager instances remove-iam-policy-binding

        $ gcloud beta source-manager instances remove-iam-policy-binding
```

### gcloud source-manager instances set-iam-policy

```text
NAME
    gcloud source-manager instances set-iam-policy - set the IAM policy for a
        Secure Source Manager instance

SYNOPSIS
    gcloud source-manager instances set-iam-policy (INSTANCE : --region=REGION)
        POLICY_FILE [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set the IAM policy for a Secure Source Manager instance.

EXAMPLES
    To set the IAM policy for an instance named 'my-instance' in location
    'us-central' to content of policy.json , run:

        $ gcloud source-manager instances set-iam-policy my-instance \
            --region=us-central1 policy.json

POSITIONAL ARGUMENTS
     Instance resource - The Secure Source Manager instance for which to set
     the IAM policy. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Secure Source Manager location.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securesourcemanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/secure-source-manager

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha source-manager instances set-iam-policy

        $ gcloud beta source-manager instances set-iam-policy
```

### gcloud beta source-manager instances add-iam-policy-binding

```text
NAME
    gcloud beta source-manager instances add-iam-policy-binding - add an IAM
        policy binding to a Secure Source Manager instance

SYNOPSIS
    gcloud beta source-manager instances add-iam-policy-binding
        (INSTANCE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager instances create

```text
NAME
    gcloud beta source-manager instances create - create a Secure Source
        Manager instance

SYNOPSIS
    gcloud beta source-manager instances create (INSTANCE : --region=REGION)
        [--async] [--enable-workforce-identity-federation]
        [--endpoint-mode=ENDPOINT_MODE] [--kms-key=KMS_KEY]
        [--max-wait=MAX_WAIT; default="60m"]
        [--is-private : --ca-pool=CA_POOL --psc-allowed-projects=[PROJECTS,...]
          --custom-hostname-api=CUSTOM_HOSTNAME_API
          --custom-hostname-git-http=CUSTOM_HOSTNAME_GIT_HTTP
          --custom-hostname-git-ssh=CUSTOM_HOSTNAME_GIT_SSH
          --custom-hostname-html=CUSTOM_HOSTNAME_HTML] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager instances delete

```text
NAME
    gcloud beta source-manager instances delete - delete a Secure Source
        Manager instance

SYNOPSIS
    gcloud beta source-manager instances delete (INSTANCE : --region=REGION)
        [--async] [--endpoint-mode=ENDPOINT_MODE]
        [--max-wait=MAX_WAIT; default="60m"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager instances describe

```text
NAME
    gcloud beta source-manager instances describe - describe a Secure Source
        Manager instance

SYNOPSIS
    gcloud beta source-manager instances describe (INSTANCE : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager instances get-iam-policy

```text
NAME
    gcloud beta source-manager instances get-iam-policy - get the IAM policy
        for a Secure Source Manager instance

SYNOPSIS
    gcloud beta source-manager instances get-iam-policy
        (INSTANCE : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager instances list

```text
NAME
    gcloud beta source-manager instances list - list Secure Source Manager
        instances

SYNOPSIS
    gcloud beta source-manager instances list --region=REGION
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager instances remove-iam-policy-binding

```text
NAME
    gcloud beta source-manager instances remove-iam-policy-binding - remove an
        IAM policy binding to a Secure Source Manager instance

SYNOPSIS
    gcloud beta source-manager instances remove-iam-policy-binding
        (INSTANCE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager instances set-iam-policy

```text
NAME
    gcloud beta source-manager instances set-iam-policy - set the IAM policy
        for a Secure Source Manager instance

SYNOPSIS
    gcloud beta source-manager instances set-iam-policy
        (INSTANCE : --region=REGION) POLICY_FILE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager instances add-iam-policy-binding

```text
NAME
    gcloud alpha source-manager instances add-iam-policy-binding - add an IAM
        policy binding to a Secure Source Manager instance

SYNOPSIS
    gcloud alpha source-manager instances add-iam-policy-binding
        (INSTANCE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager instances create

```text
NAME
    gcloud alpha source-manager instances create - create a Secure Source
        Manager instance

SYNOPSIS
    gcloud alpha source-manager instances create (INSTANCE : --region=REGION)
        [--async] [--enable-workforce-identity-federation]
        [--endpoint-mode=ENDPOINT_MODE] [--kms-key=KMS_KEY]
        [--max-wait=MAX_WAIT; default="60m"]
        [--is-private : --ca-pool=CA_POOL --psc-allowed-projects=[PROJECTS,...]
          --custom-hostname-api=CUSTOM_HOSTNAME_API
          --custom-hostname-git-http=CUSTOM_HOSTNAME_GIT_HTTP
          --custom-hostname-git-ssh=CUSTOM_HOSTNAME_GIT_SSH
          --custom-hostname-html=CUSTOM_HOSTNAME_HTML] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager instances delete

```text
NAME
    gcloud alpha source-manager instances delete - delete a Secure Source
        Manager instance

SYNOPSIS
    gcloud alpha source-manager instances delete (INSTANCE : --region=REGION)
        [--async] [--endpoint-mode=ENDPOINT_MODE]
        [--max-wait=MAX_WAIT; default="60m"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager instances describe

```text
NAME
    gcloud alpha source-manager instances describe - describe a Secure Source
        Manager instance

SYNOPSIS
    gcloud alpha source-manager instances describe (INSTANCE : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager instances get-iam-policy

```text
NAME
    gcloud alpha source-manager instances get-iam-policy - get the IAM policy
        for a Secure Source Manager instance

SYNOPSIS
    gcloud alpha source-manager instances get-iam-policy
        (INSTANCE : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager instances list

```text
NAME
    gcloud alpha source-manager instances list - list Secure Source Manager
        instances

SYNOPSIS
    gcloud alpha source-manager instances list --region=REGION
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager instances remove-iam-policy-binding

```text
NAME
    gcloud alpha source-manager instances remove-iam-policy-binding - remove an
        IAM policy binding to a Secure Source Manager instance

SYNOPSIS
    gcloud alpha source-manager instances remove-iam-policy-binding
        (INSTANCE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager instances set-iam-policy

```text
NAME
    gcloud alpha source-manager instances set-iam-policy - set the IAM policy
        for a Secure Source Manager instance

SYNOPSIS
    gcloud alpha source-manager instances set-iam-policy
        (INSTANCE : --region=REGION) POLICY_FILE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/source-manager/instances (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
