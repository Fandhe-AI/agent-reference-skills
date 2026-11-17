---
source: https://docs.cloud.google.com/sdk/gcloud/reference/service-directory/namespaces
---

# gcloud service-directory namespaces

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud service-directory namespaces add-iam-policy-binding

```text
NAME
    gcloud service-directory namespaces add-iam-policy-binding - adds IAM
        policy binding to a namespace

SYNOPSIS
    gcloud service-directory namespaces add-iam-policy-binding
        (NAMESPACE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds IAM policy binding to a namespace.

EXAMPLES
    To add an IAM policy binding to a Service Directory namespace, run:

        $ gcloud service-directory namespaces add-iam-policy-binding \
            my-namespace --location=us-east1 --role=roles/owner \
            --member=user:foo@gmail.com

POSITIONAL ARGUMENTS
     Namespace resource - The Service Directory namespace to add IAM policy
     binding to. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument namespace on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument namespace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the namespace.

          To set the location attribute:
          + provide the argument namespace on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha service-directory namespaces add-iam-policy-binding

        $ gcloud beta service-directory namespaces add-iam-policy-binding
```

### gcloud service-directory namespaces create

```text
NAME
    gcloud service-directory namespaces create - creates a namespace

SYNOPSIS
    gcloud service-directory namespaces create
        (NAMESPACE : --location=LOCATION) [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a namespace.

EXAMPLES
    To create a Service Directory namespace, run:

        $ gcloud service-directory namespaces create my-namespace \
            --location=us-east1 --labels=a=b,c=d

POSITIONAL ARGUMENTS
     Namespace resource - The Service Directory namespace to create. The
     namespace id must be 1-63 characters long and match the regular expression
     [a-z](?:[-a-z0-9]{0,61}[a-z0-9])? which means the first character must be
     a lowercase letter, and all following characters must be a dash, lowercase
     letter, or digit, except the last character, which cannot be a dash. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument namespace on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument namespace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the namespace.

          To set the location attribute:
          + provide the argument namespace on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --labels=[KEY=VALUE,...]
        Resource labels associated with the namespace.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory namespaces create

        $ gcloud beta service-directory namespaces create
```

### gcloud service-directory namespaces delete

```text
NAME
    gcloud service-directory namespaces delete - deletes a namespace

SYNOPSIS
    gcloud service-directory namespaces delete
        (NAMESPACE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a namespace.

EXAMPLES
    To delete a Service Directory namespace, run:

        $ gcloud service-directory namespaces delete my-namespace \
            --location=us-east1

POSITIONAL ARGUMENTS
     Namespace resource - The Service Directory namespace to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument namespace on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument namespace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the namespace.

          To set the location attribute:
          + provide the argument namespace on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory namespaces delete

        $ gcloud beta service-directory namespaces delete
```

### gcloud service-directory namespaces describe

```text
NAME
    gcloud service-directory namespaces describe - describes a namespace

SYNOPSIS
    gcloud service-directory namespaces describe
        (NAMESPACE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes a namespace.

EXAMPLES
    To describe a Service Directory namespace, run:

        $ gcloud service-directory namespaces describe my-namespace \
            --location=us-east1

POSITIONAL ARGUMENTS
     Namespace resource - The Service Directory namespace to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument namespace on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument namespace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the namespace.

          To set the location attribute:
          + provide the argument namespace on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory namespaces describe

        $ gcloud beta service-directory namespaces describe
```

### gcloud service-directory namespaces get-iam-policy

```text
NAME
    gcloud service-directory namespaces get-iam-policy - gets IAM policy for a
        namespace

SYNOPSIS
    gcloud service-directory namespaces get-iam-policy
        (NAMESPACE : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets IAM policy for a namespace.

EXAMPLES
    To get an IAM policy to a Service Directory namespace, run:

        $ gcloud service-directory namespaces get-iam-policy my-namespace \
            --location=us-east1

POSITIONAL ARGUMENTS
     Namespace resource - The Service Directory namespace for which to get IAM
     policy. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument namespace on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument namespace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the namespace.

          To set the location attribute:
          + provide the argument namespace on the command line with a fully
            specified name;
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory namespaces get-iam-policy

        $ gcloud beta service-directory namespaces get-iam-policy
```

### gcloud service-directory namespaces list

```text
NAME
    gcloud service-directory namespaces list - lists namespaces

SYNOPSIS
    gcloud service-directory namespaces list --location=LOCATION
        [--filter=EXPRESSION] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists namespaces.

EXAMPLES
    To list Service Directory namespaces, run:

        $ gcloud service-directory namespaces list --location=us-east1

REQUIRED FLAGS
     Location resource - The Service Directory location to list. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
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

        $ gcloud alpha service-directory namespaces list

        $ gcloud beta service-directory namespaces list
```

### gcloud service-directory namespaces remove-iam-policy-binding

```text
NAME
    gcloud service-directory namespaces remove-iam-policy-binding - removes IAM
        policy binding from a namespace

SYNOPSIS
    gcloud service-directory namespaces remove-iam-policy-binding
        (NAMESPACE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes IAM policy binding from a namespace.

EXAMPLES
    To remove an IAM policy binding to a Service Directory namespace, run:

        $ gcloud service-directory namespaces remove-iam-policy-binding \
            my-namespace --location=us-east1 --role=roles/owner \
            --member=user:foo@gmail.com

POSITIONAL ARGUMENTS
     Namespace resource - The Service Directory namespace to remove IAM policy
     binding from. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument namespace on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument namespace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the namespace.

          To set the location attribute:
          + provide the argument namespace on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha service-directory namespaces remove-iam-policy-binding

        $ gcloud beta service-directory namespaces remove-iam-policy-binding
```

### gcloud service-directory namespaces set-iam-policy

```text
NAME
    gcloud service-directory namespaces set-iam-policy - sets IAM policy for a
        namespace

SYNOPSIS
    gcloud service-directory namespaces set-iam-policy
        (NAMESPACE : --location=LOCATION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets IAM policy for a namespace.

EXAMPLES
    To set an IAM policy to a Service Directory namespace, run:

        $ gcloud service-directory namespaces set-iam-policy my-namespace \
            --location=us-east1 policy.json

POSITIONAL ARGUMENTS
     Namespace resource - The Service Directory namespace to add IAM policy
     binding to. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument namespace on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument namespace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the namespace.

          To set the location attribute:
          + provide the argument namespace on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha service-directory namespaces set-iam-policy

        $ gcloud beta service-directory namespaces set-iam-policy
```

### gcloud service-directory namespaces update

```text
NAME
    gcloud service-directory namespaces update - updates a namespace

SYNOPSIS
    gcloud service-directory namespaces update
        (NAMESPACE : --location=LOCATION) [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates a namespace.

EXAMPLES
    To update a Service Directory namespace, run:

        $ gcloud service-directory namespaces update my-namespace \
            --location=us-east1 --labels=a=b,c=d

POSITIONAL ARGUMENTS
     Namespace resource - The Service Directory namespace to update. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument namespace on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument namespace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the namespace.

          To set the location attribute:
          + provide the argument namespace on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --labels=[KEY=VALUE,...]
        Resource labels associated with the namespace.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory namespaces update

        $ gcloud beta service-directory namespaces update
```

### gcloud beta service-directory namespaces add-iam-policy-binding

```text
NAME
    gcloud beta service-directory namespaces add-iam-policy-binding - adds IAM
        policy binding to a namespace

SYNOPSIS
    gcloud beta service-directory namespaces add-iam-policy-binding
        (NAMESPACE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory namespaces create

```text
NAME
    gcloud beta service-directory namespaces create - creates a namespace

SYNOPSIS
    gcloud beta service-directory namespaces create
        (NAMESPACE : --location=LOCATION) [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory namespaces delete

```text
NAME
    gcloud beta service-directory namespaces delete - deletes a namespace

SYNOPSIS
    gcloud beta service-directory namespaces delete
        (NAMESPACE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory namespaces describe

```text
NAME
    gcloud beta service-directory namespaces describe - describes a namespace

SYNOPSIS
    gcloud beta service-directory namespaces describe
        (NAMESPACE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory namespaces get-iam-policy

```text
NAME
    gcloud beta service-directory namespaces get-iam-policy - gets IAM policy
        for a namespace

SYNOPSIS
    gcloud beta service-directory namespaces get-iam-policy
        (NAMESPACE : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory namespaces list

```text
NAME
    gcloud beta service-directory namespaces list - lists namespaces

SYNOPSIS
    gcloud beta service-directory namespaces list --location=LOCATION
        [--filter=EXPRESSION] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory namespaces remove-iam-policy-binding

```text
NAME
    gcloud beta service-directory namespaces remove-iam-policy-binding -
        removes IAM policy binding from a namespace

SYNOPSIS
    gcloud beta service-directory namespaces remove-iam-policy-binding
        (NAMESPACE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory namespaces set-iam-policy

```text
NAME
    gcloud beta service-directory namespaces set-iam-policy - sets IAM policy
        for a namespace

SYNOPSIS
    gcloud beta service-directory namespaces set-iam-policy
        (NAMESPACE : --location=LOCATION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory namespaces update

```text
NAME
    gcloud beta service-directory namespaces update - updates a namespace

SYNOPSIS
    gcloud beta service-directory namespaces update
        (NAMESPACE : --location=LOCATION) [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory namespaces add-iam-policy-binding

```text
NAME
    gcloud alpha service-directory namespaces add-iam-policy-binding - adds IAM
        policy binding to a namespace

SYNOPSIS
    gcloud alpha service-directory namespaces add-iam-policy-binding
        (NAMESPACE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory namespaces create

```text
NAME
    gcloud alpha service-directory namespaces create - creates a namespace

SYNOPSIS
    gcloud alpha service-directory namespaces create
        (NAMESPACE : --location=LOCATION) [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory namespaces delete

```text
NAME
    gcloud alpha service-directory namespaces delete - deletes a namespace

SYNOPSIS
    gcloud alpha service-directory namespaces delete
        (NAMESPACE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory namespaces describe

```text
NAME
    gcloud alpha service-directory namespaces describe - describes a namespace

SYNOPSIS
    gcloud alpha service-directory namespaces describe
        (NAMESPACE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory namespaces get-iam-policy

```text
NAME
    gcloud alpha service-directory namespaces get-iam-policy - gets IAM policy
        for a namespace

SYNOPSIS
    gcloud alpha service-directory namespaces get-iam-policy
        (NAMESPACE : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory namespaces list

```text
NAME
    gcloud alpha service-directory namespaces list - lists namespaces

SYNOPSIS
    gcloud alpha service-directory namespaces list --location=LOCATION
        [--filter=EXPRESSION] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory namespaces remove-iam-policy-binding

```text
NAME
    gcloud alpha service-directory namespaces remove-iam-policy-binding -
        removes IAM policy binding from a namespace

SYNOPSIS
    gcloud alpha service-directory namespaces remove-iam-policy-binding
        (NAMESPACE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory namespaces set-iam-policy

```text
NAME
    gcloud alpha service-directory namespaces set-iam-policy - sets IAM policy
        for a namespace

SYNOPSIS
    gcloud alpha service-directory namespaces set-iam-policy
        (NAMESPACE : --location=LOCATION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory namespaces update

```text
NAME
    gcloud alpha service-directory namespaces update - updates a namespace

SYNOPSIS
    gcloud alpha service-directory namespaces update
        (NAMESPACE : --location=LOCATION) [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/service-directory/namespaces (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
