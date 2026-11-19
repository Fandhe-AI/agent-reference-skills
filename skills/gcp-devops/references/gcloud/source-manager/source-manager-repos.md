---
source: https://docs.cloud.google.com/sdk/gcloud/reference/source-manager/repos
---

# gcloud source-manager repos

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud source-manager repos add-iam-policy-binding

```text
NAME
    gcloud source-manager repos add-iam-policy-binding - add an IAM policy
        binding to a Secure Source Manager repository

SYNOPSIS
    gcloud source-manager repos add-iam-policy-binding
        (REPOSITORY : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to a Secure Source Manager repository.

EXAMPLES
    To add an IAM policy binding for the Repository Admin role
    (roles/securesourcemanager.repoAdmin) for the user test-user@gmail.com in a
    repository named my-repo and location us-central1, run the following
    command:

        $ gcloud source-manager repos add-iam-policy-binding my-repo \
            --region=us-central1 --member=user:test-user@gmail.com \
            --role=roles/securesourcemanager.repoAdmin

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Repository resource - Secure Source Manager repository to add the IAM
     policy binding to. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument repository on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPOSITORY
          ID of the repository or fully qualified identifier for the
          repository.

          To set the repository attribute:
          + provide the argument repository on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Secure Source Manager location.

          To set the region attribute:
          + provide the argument repository on the command line with a fully
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

        $ gcloud alpha source-manager repos add-iam-policy-binding

        $ gcloud beta source-manager repos add-iam-policy-binding
```

### gcloud source-manager repos create

```text
NAME
    gcloud source-manager repos create - create a Secure Source Manager
        repository

SYNOPSIS
    gcloud source-manager repos create (REPOSITORY : --region=REGION)
        --instance=INSTANCE [--description=DESCRIPTION]
        [--[no-]enable-vulnerability-scanning] [--endpoint-mode=ENDPOINT_MODE]
        [--service-account=SERVICE_ACCOUNT]
        [--default-branch=DEFAULT_BRANCH
          --gitignores=[GITIGNORES,...] --license=LICENSE --readme=README]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Secure Source Manager repository.

EXAMPLES
    To create a repository called 'my-repo' in location 'us-central1' in
    instance 'my-instance', run the following command:

        $ gcloud source-manager repos create my-repo --region=us-central1 \
            --instance=my-instance

POSITIONAL ARGUMENTS
     Repository resource - The Secure Source Manager repository to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument repository on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPOSITORY
          ID of the repository or fully qualified identifier for the
          repository.

          To set the repository attribute:
          + provide the argument repository on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Secure Source Manager location.

          To set the region attribute:
          + provide the argument repository on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

REQUIRED FLAGS
     --instance=INSTANCE
        A Secure Source Manager instance ID.

OPTIONAL FLAGS
     --description=DESCRIPTION
        Description of the repository. Cannot exceed 500 characters.

     --[no-]enable-vulnerability-scanning
        Enable vulnerability scanning on the repository. Use
        --enable-vulnerability-scanning to enable and
        --no-enable-vulnerability-scanning to disable.

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

     --service-account=SERVICE_ACCOUNT
        The service account to attach to the repository.

     Repository initialization configuration.

     --default-branch=DEFAULT_BRANCH
        Default branch name of the repository.

     --gitignores=[GITIGNORES,...]
        List of gitignore template names user can choose from. Full list can be
        found here:
        https://cloud.google.com/secure-source-manager/docs/reference/rest/v1/projects.locations.repositories#InitialConfig

     --license=LICENSE
        License template name user can choose from. Full list can be found
        here:
        https://cloud.google.com/secure-source-manager/docs/reference/rest/v1/projects.locations.repositories#InitialConfig

     --readme=README
        README template name. Valid template name(s) are: default.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha source-manager repos create

        $ gcloud beta source-manager repos create
```

### gcloud source-manager repos delete

```text
NAME
    gcloud source-manager repos delete - delete a Secure Source Manager
        repository

SYNOPSIS
    gcloud source-manager repos delete (REPOSITORY : --region=REGION)
        [--allow-missing] [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Secure Source Manager repository.

EXAMPLES
    To delete a repository called my-repo in location us-central1, run the
    following command:

        $ gcloud source-manager repos delete my-repo --region=us-central1

POSITIONAL ARGUMENTS
     Repository resource - The Secure Source Manager repository to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument repository on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPOSITORY
          ID of the repository or fully qualified identifier for the
          repository.

          To set the repository attribute:
          + provide the argument repository on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Secure Source Manager location.

          To set the region attribute:
          + provide the argument repository on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

FLAGS
     --allow-missing
        If set to true, and the resource is not found, the request will succeed
        but no action will be taken on the server.

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

NOTES
    These variants are also available:

        $ gcloud alpha source-manager repos delete

        $ gcloud beta source-manager repos delete
```

### gcloud source-manager repos describe

```text
NAME
    gcloud source-manager repos describe - describe a Secure Source Manager
        repository

SYNOPSIS
    gcloud source-manager repos describe (REPOSITORY : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get metadata of a Secure Source Manager repository.

EXAMPLES
    To describe a repository called my-repo in location us-central1, run the
    following command:

        $ gcloud source-manager repos describe my-repo --region=us-central1

POSITIONAL ARGUMENTS
     Repository resource - The Secure Source Manager repository to describe.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument repository on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPOSITORY
          ID of the repository or fully qualified identifier for the
          repository.

          To set the repository attribute:
          + provide the argument repository on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Secure Source Manager location.

          To set the region attribute:
          + provide the argument repository on the command line with a fully
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

        $ gcloud alpha source-manager repos describe

        $ gcloud beta source-manager repos describe
```

### gcloud source-manager repos get-iam-policy

```text
NAME
    gcloud source-manager repos get-iam-policy - get the IAM policy for a
        Secure Source Manager repository

SYNOPSIS
    gcloud source-manager repos get-iam-policy (REPOSITORY : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the IAM policy for a Secure Source Manager repository.

EXAMPLES
    To get the IAM policy for an repository named my-repo in location
    us-central1, run the following command:

        $ gcloud source-manager repos get-iam-policy my-repo \
            --region=us-central1

POSITIONAL ARGUMENTS
     Repository resource - Secure Source Manager repository to get the IAM
     policy from. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument repository on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPOSITORY
          ID of the repository or fully qualified identifier for the
          repository.

          To set the repository attribute:
          + provide the argument repository on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Secure Source Manager location.

          To set the region attribute:
          + provide the argument repository on the command line with a fully
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

        $ gcloud alpha source-manager repos get-iam-policy

        $ gcloud beta source-manager repos get-iam-policy
```

### gcloud source-manager repos list

```text
NAME
    gcloud source-manager repos list - list all repositories under a Secure
        Source Manager instance

SYNOPSIS
    gcloud source-manager repos list --instance=INSTANCE --region=REGION
        [--endpoint-mode=ENDPOINT_MODE] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Secure Source Manager repositories.

EXAMPLES
    To list repositories in location us-central1 under instance my-instance,
    run the following command:

        $ gcloud source-manager repos list --region=us-central1 \
            --instance=my-instance

REQUIRED FLAGS
     --instance=INSTANCE
        A Secure Source Manager instance ID.

     Location resource - The Secure Source Manager location to list. This
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha source-manager repos list

        $ gcloud beta source-manager repos list
```

### gcloud source-manager repos remove-iam-policy-binding

```text
NAME
    gcloud source-manager repos remove-iam-policy-binding - remove an IAM
        policy binding from a Secure Source Manager repository

SYNOPSIS
    gcloud source-manager repos remove-iam-policy-binding
        (REPOSITORY : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding to a Secure Source Manager repository.

EXAMPLES
    To remove the Repository Admin IAM role
    (roles/securesourcemanager.repoAdmin) binding from the user
    test-user@gmail.com in a repository named my-repo and location us-central1,
    run the following command:

        $ gcloud source-manager repos remove-iam-policy-binding my-repo \
            --region=us-central1 --member=user:test-user@gmail.com \
            --role=roles/securesourcemanager.repoAdmin

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Repository resource - Secure Source Manager repository to remove the IAM
     policy binding from. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument repository on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPOSITORY
          ID of the repository or fully qualified identifier for the
          repository.

          To set the repository attribute:
          + provide the argument repository on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Secure Source Manager location.

          To set the region attribute:
          + provide the argument repository on the command line with a fully
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

        $ gcloud alpha source-manager repos remove-iam-policy-binding

        $ gcloud beta source-manager repos remove-iam-policy-binding
```

### gcloud source-manager repos set-iam-policy

```text
NAME
    gcloud source-manager repos set-iam-policy - set the IAM policy for a
        Secure Source Manager repository

SYNOPSIS
    gcloud source-manager repos set-iam-policy (REPOSITORY : --region=REGION)
        POLICY_FILE [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set the IAM policy for a Secure Source Manager repository.

EXAMPLES
    To set the IAM policy for a repository named my-repo in location us-central
    to the content of policy.json , run the following command:

        $ gcloud source-manager repos set-iam-policy my-repo \
            --region=us-central1 policy.json

POSITIONAL ARGUMENTS
     Repository resource - Secure Source Manager repository to set the IAM
     policy on. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument repository on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPOSITORY
          ID of the repository or fully qualified identifier for the
          repository.

          To set the repository attribute:
          + provide the argument repository on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Secure Source Manager location.

          To set the region attribute:
          + provide the argument repository on the command line with a fully
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

        $ gcloud alpha source-manager repos set-iam-policy

        $ gcloud beta source-manager repos set-iam-policy
```

### gcloud source-manager repos update

```text
NAME
    gcloud source-manager repos update - update a Secure Source Manager
        repository

SYNOPSIS
    gcloud source-manager repos update (REPOSITORY : --region=REGION)
        [--description=DESCRIPTION] [--[no-]enable-vulnerability-scanning]
        [--endpoint-mode=ENDPOINT_MODE] [--service-account=SERVICE_ACCOUNT]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Secure Source Manager repository.

EXAMPLES
    To update the description of a repository called my-repo in location
    us-central1, run the following command:

        $ gcloud source-manager repos update my-repo \
            --description="new description" --region=us-central1

POSITIONAL ARGUMENTS
     Repository resource - The Secure Source Manager repository to update. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument repository on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPOSITORY
          ID of the repository or fully qualified identifier for the
          repository.

          To set the repository attribute:
          + provide the argument repository on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Secure Source Manager location.

          To set the region attribute:
          + provide the argument repository on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

FLAGS
     --description=DESCRIPTION
        Description of the repository. Cannot exceed 500 characters.

     --[no-]enable-vulnerability-scanning
        Enable vulnerability scanning on the repository. Use
        --enable-vulnerability-scanning to enable and
        --no-enable-vulnerability-scanning to disable.

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

     --service-account=SERVICE_ACCOUNT
        The service account to attach to the repository.

     --validate-only
        If set to true, the request is validated and the user is provided with
        an expected result, but no actual change is made.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha source-manager repos update

        $ gcloud beta source-manager repos update
```

### gcloud beta source-manager repos add-iam-policy-binding

```text
NAME
    gcloud beta source-manager repos add-iam-policy-binding - add an IAM policy
        binding to a Secure Source Manager repository

SYNOPSIS
    gcloud beta source-manager repos add-iam-policy-binding
        (REPOSITORY : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager repos create

```text
NAME
    gcloud beta source-manager repos create - create a Secure Source Manager
        repository

SYNOPSIS
    gcloud beta source-manager repos create (REPOSITORY : --region=REGION)
        --instance=INSTANCE [--description=DESCRIPTION]
        [--[no-]enable-vulnerability-scanning] [--endpoint-mode=ENDPOINT_MODE]
        [--service-account=SERVICE_ACCOUNT]
        [--default-branch=DEFAULT_BRANCH
          --gitignores=[GITIGNORES,...] --license=LICENSE --readme=README]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager repos delete

```text
NAME
    gcloud beta source-manager repos delete - delete a Secure Source Manager
        repository

SYNOPSIS
    gcloud beta source-manager repos delete (REPOSITORY : --region=REGION)
        [--allow-missing] [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager repos describe

```text
NAME
    gcloud beta source-manager repos describe - describe a Secure Source
        Manager repository

SYNOPSIS
    gcloud beta source-manager repos describe (REPOSITORY : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager repos get-iam-policy

```text
NAME
    gcloud beta source-manager repos get-iam-policy - get the IAM policy for a
        Secure Source Manager repository

SYNOPSIS
    gcloud beta source-manager repos get-iam-policy
        (REPOSITORY : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager repos list

```text
NAME
    gcloud beta source-manager repos list - list all repositories under a
        Secure Source Manager instance

SYNOPSIS
    gcloud beta source-manager repos list --instance=INSTANCE --region=REGION
        [--endpoint-mode=ENDPOINT_MODE] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager repos remove-iam-policy-binding

```text
NAME
    gcloud beta source-manager repos remove-iam-policy-binding - remove an IAM
        policy binding from a Secure Source Manager repository

SYNOPSIS
    gcloud beta source-manager repos remove-iam-policy-binding
        (REPOSITORY : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager repos set-iam-policy

```text
NAME
    gcloud beta source-manager repos set-iam-policy - set the IAM policy for a
        Secure Source Manager repository

SYNOPSIS
    gcloud beta source-manager repos set-iam-policy
        (REPOSITORY : --region=REGION) POLICY_FILE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager repos update

```text
NAME
    gcloud beta source-manager repos update - update a Secure Source Manager
        repository

SYNOPSIS
    gcloud beta source-manager repos update (REPOSITORY : --region=REGION)
        [--description=DESCRIPTION] [--[no-]enable-vulnerability-scanning]
        [--endpoint-mode=ENDPOINT_MODE] [--service-account=SERVICE_ACCOUNT]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager repos add-iam-policy-binding

```text
NAME
    gcloud alpha source-manager repos add-iam-policy-binding - add an IAM
        policy binding to a Secure Source Manager repository

SYNOPSIS
    gcloud alpha source-manager repos add-iam-policy-binding
        (REPOSITORY : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager repos create

```text
NAME
    gcloud alpha source-manager repos create - create a Secure Source Manager
        repository

SYNOPSIS
    gcloud alpha source-manager repos create (REPOSITORY : --region=REGION)
        --instance=INSTANCE [--description=DESCRIPTION]
        [--[no-]enable-vulnerability-scanning] [--endpoint-mode=ENDPOINT_MODE]
        [--service-account=SERVICE_ACCOUNT]
        [--default-branch=DEFAULT_BRANCH
          --gitignores=[GITIGNORES,...] --license=LICENSE --readme=README]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager repos delete

```text
NAME
    gcloud alpha source-manager repos delete - delete a Secure Source Manager
        repository

SYNOPSIS
    gcloud alpha source-manager repos delete (REPOSITORY : --region=REGION)
        [--allow-missing] [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager repos describe

```text
NAME
    gcloud alpha source-manager repos describe - describe a Secure Source
        Manager repository

SYNOPSIS
    gcloud alpha source-manager repos describe (REPOSITORY : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager repos get-iam-policy

```text
NAME
    gcloud alpha source-manager repos get-iam-policy - get the IAM policy for a
        Secure Source Manager repository

SYNOPSIS
    gcloud alpha source-manager repos get-iam-policy
        (REPOSITORY : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager repos list

```text
NAME
    gcloud alpha source-manager repos list - list all repositories under a
        Secure Source Manager instance

SYNOPSIS
    gcloud alpha source-manager repos list --instance=INSTANCE --region=REGION
        [--endpoint-mode=ENDPOINT_MODE] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager repos remove-iam-policy-binding

```text
NAME
    gcloud alpha source-manager repos remove-iam-policy-binding - remove an IAM
        policy binding from a Secure Source Manager repository

SYNOPSIS
    gcloud alpha source-manager repos remove-iam-policy-binding
        (REPOSITORY : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager repos set-iam-policy

```text
NAME
    gcloud alpha source-manager repos set-iam-policy - set the IAM policy for a
        Secure Source Manager repository

SYNOPSIS
    gcloud alpha source-manager repos set-iam-policy
        (REPOSITORY : --region=REGION) POLICY_FILE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager repos update

```text
NAME
    gcloud alpha source-manager repos update - update a Secure Source Manager
        repository

SYNOPSIS
    gcloud alpha source-manager repos update (REPOSITORY : --region=REGION)
        [--description=DESCRIPTION] [--[no-]enable-vulnerability-scanning]
        [--endpoint-mode=ENDPOINT_MODE] [--service-account=SERVICE_ACCOUNT]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/source-manager/repos (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
