---
source: https://docs.cloud.google.com/sdk/gcloud/reference/service-directory/services
---

# gcloud service-directory services

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud service-directory services add-iam-policy-binding

```text
NAME
    gcloud service-directory services add-iam-policy-binding - adds IAM policy
        binding to a service

SYNOPSIS
    gcloud service-directory services add-iam-policy-binding
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds IAM policy binding to a service.

EXAMPLES
    To add an IAM policy binding to a Service Directory service, run:

        $ gcloud service-directory services add-iam-policy-binding \
            my-service --namespace=my-namespace --location=us-east1 \
            --role=roles/owner --member=user:foo@gmail.com

POSITIONAL ARGUMENTS
     Service resource - The Service Directory service to add IAM policy binding
     to. The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the service.

          To set the location attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --namespace=NAMESPACE
          The name of the namespace for the service.

          To set the namespace attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory services add-iam-policy-binding

        $ gcloud beta service-directory services add-iam-policy-binding
```

### gcloud service-directory services create

```text
NAME
    gcloud service-directory services create - creates a service

SYNOPSIS
    gcloud service-directory services create
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [--annotations=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a service.

EXAMPLES
    To create a Service Directory service, run:

        $ gcloud service-directory services create my-service \
            --namespace=my-namespace --location=us-east1 \
            --annotations=a=b,c=d

POSITIONAL ARGUMENTS
     Service resource - The Service Directory service to create. The service id
     must be 1-63 characters long and match the regular expression
     [a-z](?:[-a-z0-9]{0,61}[a-z0-9])? which means the first character must be
     a lowercase letter, and all following characters must be a dash, lowercase
     letter, or digit, except the last character, which cannot be a dash. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the service.

          To set the location attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --namespace=NAMESPACE
          The name of the namespace for the service.

          To set the namespace attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

FLAGS
     --annotations=[KEY=VALUE,...]
        Annotations for the service.

        Annotations take the form of key/value string pairs. Keys are composed
        of an optional prefix and a name segment, separated by a slash(/).
        Prefixes and names must be composed of alphanumeric characters, dashes,
        and dots. Names may also use underscores. There are no character
        restrictions on what may go into the value of an annotation. The entire
        dictionary is limited to 2000 characters, spread across all key-value
        pairs.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory services create

        $ gcloud beta service-directory services create
```

### gcloud service-directory services delete

```text
NAME
    gcloud service-directory services delete - deletes a service

SYNOPSIS
    gcloud service-directory services delete
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a service.

EXAMPLES
    To delete a Service Directory service, run:

        $ gcloud service-directory services delete my-service \
            --namespace=my-namespace --location=us-east1

POSITIONAL ARGUMENTS
     Service resource - The Service Directory service to delete. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the service.

          To set the location attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --namespace=NAMESPACE
          The name of the namespace for the service.

          To set the namespace attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory services delete

        $ gcloud beta service-directory services delete
```

### gcloud service-directory services describe

```text
NAME
    gcloud service-directory services describe - describes a service

SYNOPSIS
    gcloud service-directory services describe
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes a service.

EXAMPLES
    To describe a Service Directory service, run:

        $ gcloud service-directory services describe my-service \
            --namespace=my-namespace --location=us-east1

POSITIONAL ARGUMENTS
     Service resource - The Service Directory service to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the service.

          To set the location attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --namespace=NAMESPACE
          The name of the namespace for the service.

          To set the namespace attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory services describe

        $ gcloud beta service-directory services describe
```

### gcloud service-directory services get-iam-policy

```text
NAME
    gcloud service-directory services get-iam-policy - gets IAM policy for a
        service

SYNOPSIS
    gcloud service-directory services get-iam-policy
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets IAM policy for a service.

EXAMPLES
    To get an IAM policy to a Service Directory service, run:

        $ gcloud service-directory services get-iam-policy my-service \
            --namespace=my-namespace --location=us-east1

POSITIONAL ARGUMENTS
     Service resource - The Service Directory service for which to get IAM
     policy. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the service.

          To set the location attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --namespace=NAMESPACE
          The name of the namespace for the service.

          To set the namespace attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

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

NOTES
    These variants are also available:

        $ gcloud alpha service-directory services get-iam-policy

        $ gcloud beta service-directory services get-iam-policy
```

### gcloud service-directory services list

```text
NAME
    gcloud service-directory services list - lists services

SYNOPSIS
    gcloud service-directory services list
        (--namespace=NAMESPACE : --location=LOCATION) [--filter=EXPRESSION]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists services.

EXAMPLES
    To list Service Directory services, run:

        $ gcloud service-directory services list --namespace=my-namespace \
            --location=us-east1

REQUIRED FLAGS
     Namespace resource - The Service Directory namespace to list. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --namespace on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       --namespace=NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument --namespace on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The name of the region for the namespace.

          To set the location attribute:
          + provide the argument --namespace on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
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

NOTES
    These variants are also available:

        $ gcloud alpha service-directory services list

        $ gcloud beta service-directory services list
```

### gcloud service-directory services remove-iam-policy-binding

```text
NAME
    gcloud service-directory services remove-iam-policy-binding - removes IAM
        policy binding from a service

SYNOPSIS
    gcloud service-directory services remove-iam-policy-binding
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes IAM policy binding from a service.

EXAMPLES
    To remove an IAM policy binding to a Service Directory service, run:

        $ gcloud service-directory services remove-iam-policy-binding \
            my-service --namespace=my-namespace --location=us-east1 \
            --role=roles/owner --member=user:foo@gmail.com

POSITIONAL ARGUMENTS
     Service resource - The Service Directory service to remove IAM policy
     binding from. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the service.

          To set the location attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --namespace=NAMESPACE
          The name of the namespace for the service.

          To set the namespace attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory services remove-iam-policy-binding

        $ gcloud beta service-directory services remove-iam-policy-binding
```

### gcloud service-directory services resolve

```text
NAME
    gcloud service-directory services resolve - resolves a service

SYNOPSIS
    gcloud service-directory services resolve
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [--endpoint-filter=ENDPOINT_FILTER] [--max-endpoints=MAX_ENDPOINTS]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Resolves a service.

EXAMPLES
    To resolve Service Directory services, run:

        $ gcloud service-directory services resolve my-service \
            --namespace=my-namespace --location=us-east1

POSITIONAL ARGUMENTS
     Service resource - The Service Directory service to resolve. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the service.

          To set the location attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --namespace=NAMESPACE
          The name of the namespace for the service.

          To set the namespace attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

FLAGS
     --endpoint-filter=ENDPOINT_FILTER
        Apply a Boolean filter EXPRESSION to each endpoint in the service. If
        the expression evaluates True, then that endpoint is listed.

     --max-endpoints=MAX_ENDPOINTS
        Maximum number of endpoints to return.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory services resolve

        $ gcloud beta service-directory services resolve
```

### gcloud service-directory services set-iam-policy

```text
NAME
    gcloud service-directory services set-iam-policy - sets IAM policy for a
        service

SYNOPSIS
    gcloud service-directory services set-iam-policy
        (SERVICE : --location=LOCATION --namespace=NAMESPACE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets IAM policy for a service.

EXAMPLES
    To set an IAM policy to a Service Directory service, run:

        $ gcloud service-directory services set-iam-policy my-service \
            --namespace=my-namespace --location=us-east1 policy.json

POSITIONAL ARGUMENTS
     Service resource - The Service Directory service to add IAM policy binding
     to. The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the service.

          To set the location attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --namespace=NAMESPACE
          The name of the namespace for the service.

          To set the namespace attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

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

NOTES
    These variants are also available:

        $ gcloud alpha service-directory services set-iam-policy

        $ gcloud beta service-directory services set-iam-policy
```

### gcloud service-directory services update

```text
NAME
    gcloud service-directory services update - updates a service

SYNOPSIS
    gcloud service-directory services update
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [--annotations=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates a service.

EXAMPLES
    To update a Service Directory service, run:

        $ gcloud service-directory services update my-service \
            --namespace=my-namespace --location=us-east1 \
            --annotations=a=b,c=d

POSITIONAL ARGUMENTS
     Service resource - The Service Directory service to update. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the service.

          To set the location attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --namespace=NAMESPACE
          The name of the namespace for the service.

          To set the namespace attribute:
          + provide the argument service on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

FLAGS
     --annotations=[KEY=VALUE,...]
        Annotations for the service.

        Annotations take the form of key/value string pairs. Keys are composed
        of an optional prefix and a name segment, separated by a slash(/).
        Prefixes and names must be composed of alphanumeric characters, dashes,
        and dots. Names may also use underscores. There are no character
        restrictions on what may go into the value of an annotation. The entire
        dictionary is limited to 2000 characters, spread across all key-value
        pairs.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory services update

        $ gcloud beta service-directory services update
```

### gcloud beta service-directory services add-iam-policy-binding

```text
NAME
    gcloud beta service-directory services add-iam-policy-binding - adds IAM
        policy binding to a service

SYNOPSIS
    gcloud beta service-directory services add-iam-policy-binding
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory services create

```text
NAME
    gcloud beta service-directory services create - creates a service

SYNOPSIS
    gcloud beta service-directory services create
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [--metadata=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory services delete

```text
NAME
    gcloud beta service-directory services delete - deletes a service

SYNOPSIS
    gcloud beta service-directory services delete
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory services describe

```text
NAME
    gcloud beta service-directory services describe - describes a service

SYNOPSIS
    gcloud beta service-directory services describe
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory services get-iam-policy

```text
NAME
    gcloud beta service-directory services get-iam-policy - gets IAM policy for
        a service

SYNOPSIS
    gcloud beta service-directory services get-iam-policy
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory services list

```text
NAME
    gcloud beta service-directory services list - lists services

SYNOPSIS
    gcloud beta service-directory services list
        (--namespace=NAMESPACE : --location=LOCATION) [--filter=EXPRESSION]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory services remove-iam-policy-binding

```text
NAME
    gcloud beta service-directory services remove-iam-policy-binding - removes
        IAM policy binding from a service

SYNOPSIS
    gcloud beta service-directory services remove-iam-policy-binding
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory services resolve

```text
NAME
    gcloud beta service-directory services resolve - resolves a service

SYNOPSIS
    gcloud beta service-directory services resolve
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [--endpoint-filter=ENDPOINT_FILTER] [--max-endpoints=MAX_ENDPOINTS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory services set-iam-policy

```text
NAME
    gcloud beta service-directory services set-iam-policy - sets IAM policy for
        a service

SYNOPSIS
    gcloud beta service-directory services set-iam-policy
        (SERVICE : --location=LOCATION --namespace=NAMESPACE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory services update

```text
NAME
    gcloud beta service-directory services update - updates a service

SYNOPSIS
    gcloud beta service-directory services update
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [--metadata=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory services add-iam-policy-binding

```text
NAME
    gcloud alpha service-directory services add-iam-policy-binding - adds IAM
        policy binding to a service

SYNOPSIS
    gcloud alpha service-directory services add-iam-policy-binding
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory services create

```text
NAME
    gcloud alpha service-directory services create - creates a service

SYNOPSIS
    gcloud alpha service-directory services create
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [--metadata=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory services delete

```text
NAME
    gcloud alpha service-directory services delete - deletes a service

SYNOPSIS
    gcloud alpha service-directory services delete
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory services describe

```text
NAME
    gcloud alpha service-directory services describe - describes a service

SYNOPSIS
    gcloud alpha service-directory services describe
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory services get-iam-policy

```text
NAME
    gcloud alpha service-directory services get-iam-policy - gets IAM policy
        for a service

SYNOPSIS
    gcloud alpha service-directory services get-iam-policy
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory services list

```text
NAME
    gcloud alpha service-directory services list - lists services

SYNOPSIS
    gcloud alpha service-directory services list
        (--namespace=NAMESPACE : --location=LOCATION) [--filter=EXPRESSION]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory services remove-iam-policy-binding

```text
NAME
    gcloud alpha service-directory services remove-iam-policy-binding - removes
        IAM policy binding from a service

SYNOPSIS
    gcloud alpha service-directory services remove-iam-policy-binding
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory services resolve

```text
NAME
    gcloud alpha service-directory services resolve - resolves a service

SYNOPSIS
    gcloud alpha service-directory services resolve
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [--endpoint-filter=ENDPOINT_FILTER] [--max-endpoints=MAX_ENDPOINTS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory services set-iam-policy

```text
NAME
    gcloud alpha service-directory services set-iam-policy - sets IAM policy
        for a service

SYNOPSIS
    gcloud alpha service-directory services set-iam-policy
        (SERVICE : --location=LOCATION --namespace=NAMESPACE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory services update

```text
NAME
    gcloud alpha service-directory services update - updates a service

SYNOPSIS
    gcloud alpha service-directory services update
        (SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [--metadata=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/service-directory/services (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
