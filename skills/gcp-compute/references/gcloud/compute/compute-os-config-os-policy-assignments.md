---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/os-config/os-policy-assignments
---

# gcloud compute os-config os-policy-assignments

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute os-config os-policy-assignments create

```text
NAME
    gcloud compute os-config os-policy-assignments create - create an OS policy
        assignment

SYNOPSIS
    gcloud compute os-config os-policy-assignments create
        (OS_POLICY_ASSIGNMENT : --location=LOCATION) --file=FILE [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an OS policy assignment

EXAMPLES
    To create an OS policy assignment my-assignment in my-project and location
    us-central1-a with config file /path/to/file/config.yaml, run:

        $ gcloud compute os-config os-policy-assignments create \
            my-assignment --project=my-project --location=us-central1-a \
            --file=/path/to/file/config.yaml

POSITIONAL ARGUMENTS
     OS policy assignment resource - Location to create the OS policy
     assignment in. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument os_policy_assignment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OS_POLICY_ASSIGNMENT
          ID of the OS policy assignment or fully qualified identifier for the
          OS policy assignment.

          To set the os_policy_assignment attribute:
          + provide the argument os_policy_assignment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the OS policy assignment.

          To set the location attribute:
          + provide the argument os_policy_assignment on the command line
            with a fully specified name;
          + provide the argument --location on the command line;
          + set the property compute/zone.

REQUIRED FLAGS
     --file=FILE
        Absolute path to the OS policy assignment file on your local client.
        File must be in either JSON or YAML format. This file defines the OS
        policies that you want to apply to your VMs, the target VMs that you
        want to apply the policies to, and the rollout rate at which to apply
        the OS policies. For more information about this resource and sample OS
        policy assignment files, see
        https://cloud.google.com/compute/docs/os-configuration-management/working-with-os-policies#os-policy-assignment.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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
    This command uses the osconfig/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha compute os-config os-policy-assignments create
```

### gcloud compute os-config os-policy-assignments delete

```text
NAME
    gcloud compute os-config os-policy-assignments delete - delete an OS policy
        assignment

SYNOPSIS
    gcloud compute os-config os-policy-assignments delete
        (OS_POLICY_ASSIGNMENT : --location=LOCATION) [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an OS policy assignment

EXAMPLES
    To delete an OS policy my-assignment in location us-central1-a:

        $ gcloud compute os-config os-policy-assignments delete \
            my-assignment --location=us-central1-a

POSITIONAL ARGUMENTS
     OS policy assignment resource - OS policy assignment to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument os_policy_assignment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OS_POLICY_ASSIGNMENT
          ID of the OS policy assignment or fully qualified identifier for the
          OS policy assignment.

          To set the os_policy_assignment attribute:
          + provide the argument os_policy_assignment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the OS policy assignment.

          To set the location attribute:
          + provide the argument os_policy_assignment on the command line
            with a fully specified name;
          + provide the argument --location on the command line;
          + set the property compute/zone.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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
    This command uses the osconfig/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha compute os-config os-policy-assignments delete
```

### gcloud compute os-config os-policy-assignments describe

```text
NAME
    gcloud compute os-config os-policy-assignments describe - describe an OS
        policy assignment

SYNOPSIS
    gcloud compute os-config os-policy-assignments describe
        (OS_POLICY_ASSIGNMENT : --location=LOCATION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an OS policy assignment

EXAMPLES
    To describe an OS policy my-assignment in location us-central1-a:

        $ gcloud compute os-config os-policy-assignments describe \
            my-assignment --location=us-central1-a

POSITIONAL ARGUMENTS
     OS policy assignment resource - OS policy assignment to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument os_policy_assignment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OS_POLICY_ASSIGNMENT
          ID of the OS policy assignment or fully qualified identifier for the
          OS policy assignment.

          To set the os_policy_assignment attribute:
          + provide the argument os_policy_assignment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the OS policy assignment.

          To set the location attribute:
          + provide the argument os_policy_assignment on the command line
            with a fully specified name;
          + provide the argument --location on the command line;
          + set the property compute/zone.

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
    This command uses the osconfig/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha compute os-config os-policy-assignments describe
```

### gcloud compute os-config os-policy-assignments list

```text
NAME
    gcloud compute os-config os-policy-assignments list - list OS policy
        assignments for a specified location

SYNOPSIS
    gcloud compute os-config os-policy-assignments list
        [--endpoint-mode=ENDPOINT_MODE] [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List OS policy assignments.

EXAMPLES
    To list the OS policy assignments in my-project and location us-central1-a,
    run:

        $ gcloud compute os-config os-policy-assignments list \
            --project=my-project --location=us-central1-a

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

     Location resource - Location of the OS policy assignment to query. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property compute/zone with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property compute/zone.

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
    This command uses the osconfig/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha compute os-config os-policy-assignments list
```

### gcloud compute os-config os-policy-assignments list-revisions

```text
NAME
    gcloud compute os-config os-policy-assignments list-revisions - list the
        revisions of an OS policy assignment

SYNOPSIS
    gcloud compute os-config os-policy-assignments list-revisions
        (OS_POLICY_ASSIGNMENT : --location=LOCATION)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the revisions of an OS policy assignment

EXAMPLES
    To list the revisions of an OS policy my-assignment in location
    us-central1-a:

        $ gcloud compute os-config os-policy-assignments list-revisions \
            my-assignment --location=us-central1-a

POSITIONAL ARGUMENTS
     OS policy assignment resource - OS policies assignment data to describe.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument os_policy_assignment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OS_POLICY_ASSIGNMENT
          ID of the OS policy assignment or fully qualified identifier for the
          OS policy assignment.

          To set the os_policy_assignment attribute:
          + provide the argument os_policy_assignment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the OS policy assignment.

          To set the location attribute:
          + provide the argument os_policy_assignment on the command line
            with a fully specified name;
          + provide the argument --location on the command line;
          + set the property compute/zone.

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
    This command uses the osconfig/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha compute os-config os-policy-assignments list-revisions
```

### gcloud compute os-config os-policy-assignments operations cancel

```text
NAME
    gcloud compute os-config os-policy-assignments operations cancel - cancel
        an OS policy assignment operation

SYNOPSIS
    gcloud compute os-config os-policy-assignments operations cancel
        (OPERATION
          : --location=LOCATION --os-policy-assignment=OS_POLICY_ASSIGNMENT)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel an OS policy assignment

EXAMPLES
    To cancel a long-running operation operation-id for OS policy assignment
    my-assignment in location us-central1-a:

        $ gcloud compute os-config os-policy-assignments operations cancel \
            operation-id --location=us-central1-a \
            --os-policy-assignment=my-assignment

    Or pass the full operation name:

        $ gcloud compute os-config os-policy-assignments operations cancel \
            projects/my-project/locations/us-central1-a/\
        osPolicyAssignments/my-assignment/operations/operation-id

POSITIONAL ARGUMENTS
     OS policy assignment operation resource - OS policy assignment data to
     describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OPERATION
          ID of the OS policy assignment operation or fully qualified
          identifier for the OS policy assignment operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the OS policy assignment operation.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property compute/zone.

       --os-policy-assignment=OS_POLICY_ASSIGNMENT
          OS policy assignment.

          To set the os-policy-assignment attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --os-policy-assignment on the command line.

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
    This command uses the osconfig/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha compute os-config os-policy-assignments operations \
            cancel
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute os-config os-policy-assignments operations cancel projects/my-project/locations/us-central1-a/osPolicyAssignments/my-assignment/operations/operation-id
```

### gcloud compute os-config os-policy-assignments operations describe

```text
NAME
    gcloud compute os-config os-policy-assignments operations describe -
        describe an OS policy assignment operation

SYNOPSIS
    gcloud compute os-config os-policy-assignments operations describe
        (OPERATION
          : --location=LOCATION --os-policy-assignment=OS_POLICY_ASSIGNMENT)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an OS policy assignment

EXAMPLES
    To describe an operation with`operation-id for an OS policy assignment
    my-assignment in location us-central1-a, run:

        $ gcloud compute os-config os-policy-assignments operations \
            describe operation-id --location=us-central1-a \
            --os-policy-assignment=my-assignment

    You can also describe an operation by passing the full operation name:

        $ gcloud compute os-config os-policy-assignments operations \
            describe \
            projects/my-project/locations/us-central1-a/\
        osPolicyAssignments/my-assignment/operations/operation-id

POSITIONAL ARGUMENTS
     OS policy assignment operation resource - OS policy assignment data to
     describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OPERATION
          ID of the OS policy assignment operation or fully qualified
          identifier for the OS policy assignment operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the OS policy assignment operation.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property compute/zone.

       --os-policy-assignment=OS_POLICY_ASSIGNMENT
          OS policy assignment.

          To set the os-policy-assignment attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --os-policy-assignment on the command line.

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
    This command uses the osconfig/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha compute os-config os-policy-assignments operations \
            describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute os-config os-policy-assignments operations describe projects/my-project/locations/us-central1-a/osPolicyAssignments/my-assignment/operations/operation-id
```

### gcloud compute os-config os-policy-assignments update

```text
NAME
    gcloud compute os-config os-policy-assignments update - update an OS policy
        assignment

SYNOPSIS
    gcloud compute os-config os-policy-assignments update
        (OS_POLICY_ASSIGNMENT : --location=LOCATION) --file=FILE
        [--allow-missing] [--async] [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an OS policy assignment

EXAMPLES
    To update an OS policy assignment my-assignment in location us-central1-a
    with config file /path/to/file/config.yaml, run:

        $ gcloud compute os-config os-policy-assignments update \
            my-assignment --location=us-central1-a \
            --file=/path/to/file/config.yaml

POSITIONAL ARGUMENTS
     OS policy assignment resource - OS policy assignment to update. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument os_policy_assignment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OS_POLICY_ASSIGNMENT
          ID of the OS policy assignment or fully qualified identifier for the
          OS policy assignment.

          To set the os_policy_assignment attribute:
          + provide the argument os_policy_assignment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the OS policy assignment.

          To set the location attribute:
          + provide the argument os_policy_assignment on the command line
            with a fully specified name;
          + provide the argument --location on the command line;
          + set the property compute/zone.

REQUIRED FLAGS
     --file=FILE
        Absolute path to the OS policy assignment file on your local client.
        File must be in either JSON or YAML format. This file defines the OS
        policies that you want to apply to your VMs, the target VMs that you
        want to apply the policies to, and the rollout rate at which to apply
        the OS policies. For more information about this resource and sample OS
        policy assignment files, see
        https://cloud.google.com/compute/docs/os-configuration-management/working-with-os-policies#os-policy-assignment.

OPTIONAL FLAGS
     --allow-missing
        If set to true, and the OS policy assignment is not found, the new
        policy assignment resource will be created.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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
    This command uses the osconfig/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha compute os-config os-policy-assignments update
```

### gcloud alpha compute os-config os-policy-assignments create

```text
NAME
    gcloud alpha compute os-config os-policy-assignments create - create an OS
        policy assignment

SYNOPSIS
    gcloud alpha compute os-config os-policy-assignments create
        (OS_POLICY_ASSIGNMENT : --location=LOCATION) --file=FILE [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-config os-policy-assignments delete

```text
NAME
    gcloud alpha compute os-config os-policy-assignments delete - delete an OS
        policy assignment

SYNOPSIS
    gcloud alpha compute os-config os-policy-assignments delete
        (OS_POLICY_ASSIGNMENT : --location=LOCATION) [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-config os-policy-assignments describe

```text
NAME
    gcloud alpha compute os-config os-policy-assignments describe - describe an
        OS policy assignment

SYNOPSIS
    gcloud alpha compute os-config os-policy-assignments describe
        (OS_POLICY_ASSIGNMENT : --location=LOCATION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-config os-policy-assignments list

```text
NAME
    gcloud alpha compute os-config os-policy-assignments list - list OS policy
        assignments for a specified location

SYNOPSIS
    gcloud alpha compute os-config os-policy-assignments list
        [--endpoint-mode=ENDPOINT_MODE] [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-config os-policy-assignments list-revisions

```text
NAME
    gcloud alpha compute os-config os-policy-assignments list-revisions - list
        the revisions of an OS policy assignment

SYNOPSIS
    gcloud alpha compute os-config os-policy-assignments list-revisions
        (OS_POLICY_ASSIGNMENT : --location=LOCATION)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-config os-policy-assignments operations cancel

```text
NAME
    gcloud alpha compute os-config os-policy-assignments operations cancel -
        cancel an OS policy assignment operation

SYNOPSIS
    gcloud alpha compute os-config os-policy-assignments operations cancel
        (OPERATION
          : --location=LOCATION --os-policy-assignment=OS_POLICY_ASSIGNMENT)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-config os-policy-assignments operations describe

```text
NAME
    gcloud alpha compute os-config os-policy-assignments operations describe -
        describe an OS policy assignment operation

SYNOPSIS
    gcloud alpha compute os-config os-policy-assignments operations describe
        (OPERATION
          : --location=LOCATION --os-policy-assignment=OS_POLICY_ASSIGNMENT)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-config os-policy-assignments update

```text
NAME
    gcloud alpha compute os-config os-policy-assignments update - update an OS
        policy assignment

SYNOPSIS
    gcloud alpha compute os-config os-policy-assignments update
        (OS_POLICY_ASSIGNMENT : --location=LOCATION) --file=FILE
        [--allow-missing] [--async] [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/os-config/os-policy-assignments (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
