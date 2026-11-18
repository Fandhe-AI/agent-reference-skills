---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/keyrings
---

# gcloud kms keyrings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms keyrings add-iam-policy-binding

```text
NAME
    gcloud kms keyrings add-iam-policy-binding - add IAM policy binding for a
        kms keyring

SYNOPSIS
    gcloud kms keyrings add-iam-policy-binding (KEYRING : --location=LOCATION)
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds a policy binding to the IAM policy of a kms keyring. A binding
    consists of at least one member, a role, and an optional condition.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' on the keyring fellowship with location global, run:

        $ gcloud kms keyrings add-iam-policy-binding fellowship \
            --location='global' --member='user:test-user@gmail.com' \
            --role='roles/editor'

    To add an IAM policy binding which expires at the end of the year 2018 for
    the role of 'roles/cloudkms.signer' and the user 'test-user@gmail.com' on
    the keyring fellowship and location global, run:

        $ gcloud kms keyrings add-iam-policy-binding fellowship \
            --location='global' --member='user:test-user@gmail.com' \
            --role='roles/cloudkms.signer' \
            --condition='expression=request.time <
         timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,descrip\
        tion=Expires at midnight on 2018-12-31'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Keyring resource - The keyring to add the IAM policy binding. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument keyring on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEYRING
          ID of the keyring or fully qualified identifier for the keyring.

          To set the keyring attribute:
          + provide the argument keyring on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the resource.

          To set the location attribute:
          + provide the argument keyring on the command line with a fully
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

API REFERENCE
    This command uses the cloudkms/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/kms/

NOTES
    These variants are also available:

        $ gcloud alpha kms keyrings add-iam-policy-binding

        $ gcloud beta kms keyrings add-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud kms keyrings add-iam-policy-binding fellowship \
    --location='global' \
    --member='user:test-user@gmail.com' \
    --role='roles/cloudkms.signer' \
    --condition='expression=request.time < timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,description=Expires at midnight on 2018-12-31'
```

### gcloud kms keyrings create

```text
NAME
    gcloud kms keyrings create - create a new keyring

SYNOPSIS
    gcloud kms keyrings create (KEYRING : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a new keyring within the given location.

POSITIONAL ARGUMENTS
     Keyring resource - The KMS keyring resource. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument keyring on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       KEYRING
          ID of the keyring or fully qualified identifier for the keyring.

          To set the keyring attribute:
          + provide the argument keyring on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Google Cloud location for the keyring.

          To set the location attribute:
          + provide the argument keyring on the command line with a fully
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

        $ gcloud alpha kms keyrings create

        $ gcloud beta kms keyrings create
```

### gcloud kms keyrings delete

```text
NAME
    gcloud kms keyrings delete - delete a keyring

SYNOPSIS
    gcloud kms keyrings delete (KEYRING : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a keyring within the given location.

EXAMPLES
    The following command deletes the keyring fellowship within location
    us-east1:

        $ gcloud kms keyrings delete fellowship --location=us-east1

POSITIONAL ARGUMENTS
     Keyring resource - The KMS keyring resource. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument keyring on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       KEYRING
          ID of the keyring or fully qualified identifier for the keyring.

          To set the keyring attribute:
          + provide the argument keyring on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Google Cloud location for the keyring.

          To set the location attribute:
          + provide the argument keyring on the command line with a fully
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

        $ gcloud alpha kms keyrings delete

        $ gcloud beta kms keyrings delete
```

### gcloud kms keyrings describe

```text
NAME
    gcloud kms keyrings describe - get metadata for a keyring

SYNOPSIS
    gcloud kms keyrings describe (KEYRING : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns metadata for the given keyring.

EXAMPLES
    The following command returns the metadata for the keyring towers in the
    location us-east1:

        $ gcloud kms keyrings describe towers --location=us-east1

POSITIONAL ARGUMENTS
     Keyring resource - The KMS keyring resource. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument keyring on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       KEYRING
          ID of the keyring or fully qualified identifier for the keyring.

          To set the keyring attribute:
          + provide the argument keyring on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Google Cloud location for the keyring.

          To set the location attribute:
          + provide the argument keyring on the command line with a fully
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

        $ gcloud alpha kms keyrings describe

        $ gcloud beta kms keyrings describe
```

### gcloud kms keyrings get-iam-policy

```text
NAME
    gcloud kms keyrings get-iam-policy - get the IAM policy for a keyring

SYNOPSIS
    gcloud kms keyrings get-iam-policy KEYRING [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets the IAM policy for the given keyring.

    Returns an empty policy if the resource does not have a policy set.

EXAMPLES
    The following command gets the IAM policy for the keyring fellowship within
    the location us-central1:

        $ gcloud kms keyrings get-iam-policy fellowship \
            --location=us-central1

POSITIONAL ARGUMENTS
     KEYRING
        Name of the key ring whose IAM policy to fetch.

FLAGS
     --location=LOCATION
        Location of the keyring.

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

        $ gcloud alpha kms keyrings get-iam-policy

        $ gcloud beta kms keyrings get-iam-policy
```

### gcloud kms keyrings list

```text
NAME
    gcloud kms keyrings list - list keyrings within a location

SYNOPSIS
    gcloud kms keyrings list --location=LOCATION [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all keyrings within the given location.

EXAMPLES
    The following command lists a maximum of five keyrings in the location
    global:

        $ gcloud kms keyrings list --location=global --limit=5

REQUIRED FLAGS
     Location resource - The KMS location resource. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

NOTES
    These variants are also available:

        $ gcloud alpha kms keyrings list

        $ gcloud beta kms keyrings list
```

### gcloud kms keyrings remove-iam-policy-binding

```text
NAME
    gcloud kms keyrings remove-iam-policy-binding - remove IAM policy binding
        for a kms keyring

SYNOPSIS
    gcloud kms keyrings remove-iam-policy-binding
        (KEYRING : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes a policy binding from the IAM policy of a kms keyring. A binding
    consists of at least one member, a role, and an optional condition.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/cloudkms.signer' for
    the user 'test-user@gmail.com' on the keyring fellowship with location
    global, run:

        $ gcloud kms keyrings remove-iam-policy-binding fellowship \
            --location='global' --member='user:test-user@gmail.com' \
            --role='roles/cloudkms.signer'

    To remove an IAM policy binding with a condition of
    expression='request.time < timestamp("2019-01-01T00:00:00Z")',
    title='expires_end_of_2018', and description='Expires at midnight on
    2018-12-31' for the role of 'roles/cloudkms.signer' for the user
    'test-user@gmail.com' on the keyring fellowship with location global, run:

        $ gcloud kms keyrings remove-iam-policy-binding fellowship \
            --location='global' --member='user:test-user@gmail.com' \
            --role='roles/cloudkms.signer' \
            --condition='expression=request.time <
         timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,descrip\
        tion=Expires at midnight on 2018-12-31'

    To remove all IAM policy bindings regardless of the condition for the role
    of 'roles/cloudkms.signer' and for the user 'test-user@gmail.com' on the
    keyring fellowship with location global, run:

        $ gcloud kms keyrings remove-iam-policy-binding fellowship \
            --location='global' --member='user:test-user@gmail.com' \
            --role='roles/cloudkms.signer' --all

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Keyring resource - The keyring to remove the IAM policy binding. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument keyring on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEYRING
          ID of the keyring or fully qualified identifier for the keyring.

          To set the keyring attribute:
          + provide the argument keyring on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the resource.

          To set the location attribute:
          + provide the argument keyring on the command line with a fully
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

API REFERENCE
    This command uses the cloudkms/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/kms/

NOTES
    These variants are also available:

        $ gcloud alpha kms keyrings remove-iam-policy-binding

        $ gcloud beta kms keyrings remove-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud kms keyrings remove-iam-policy-binding fellowship \
    --location='global' \
    --member='user:test-user@gmail.com' \
    --role='roles/cloudkms.signer' \
    --condition='expression=request.time < timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,description=Expires at midnight on 2018-12-31'
```

### gcloud kms keyrings set-iam-policy

```text
NAME
    gcloud kms keyrings set-iam-policy - set the IAM policy for a keyring

SYNOPSIS
    gcloud kms keyrings set-iam-policy KEYRING POLICY_FILE
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given keyring as defined in a JSON or YAML
    file.

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    The following command will read am IAM policy defined in a JSON file
    'policy.json' and set it for the keyring fellowship with location global:

        $ gcloud kms keyrings set-iam-policy fellowship policy.json \
            --location=global

POSITIONAL ARGUMENTS
     KEYRING
        Name of the key ring whose IAM policy to update.

     POLICY_FILE
        JSON or YAML file with the IAM policy

FLAGS
     --location=LOCATION
        Location of the keyring.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keyrings set-iam-policy

        $ gcloud beta kms keyrings set-iam-policy
```

### gcloud beta kms keyrings add-iam-policy-binding

```text
NAME
    gcloud beta kms keyrings add-iam-policy-binding - add IAM policy binding
        for a kms keyring

SYNOPSIS
    gcloud beta kms keyrings add-iam-policy-binding
        (KEYRING : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keyrings create

```text
NAME
    gcloud beta kms keyrings create - create a new keyring

SYNOPSIS
    gcloud beta kms keyrings create (KEYRING : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keyrings delete

```text
NAME
    gcloud beta kms keyrings delete - delete a keyring

SYNOPSIS
    gcloud beta kms keyrings delete (KEYRING : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keyrings describe

```text
NAME
    gcloud beta kms keyrings describe - get metadata for a keyring

SYNOPSIS
    gcloud beta kms keyrings describe (KEYRING : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keyrings get-iam-policy

```text
NAME
    gcloud beta kms keyrings get-iam-policy - get the IAM policy for a keyring

SYNOPSIS
    gcloud beta kms keyrings get-iam-policy KEYRING [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keyrings list

```text
NAME
    gcloud beta kms keyrings list - list keyrings within a location

SYNOPSIS
    gcloud beta kms keyrings list --location=LOCATION [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keyrings remove-iam-policy-binding

```text
NAME
    gcloud beta kms keyrings remove-iam-policy-binding - remove IAM policy
        binding for a kms keyring

SYNOPSIS
    gcloud beta kms keyrings remove-iam-policy-binding
        (KEYRING : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keyrings set-iam-policy

```text
NAME
    gcloud beta kms keyrings set-iam-policy - set the IAM policy for a keyring

SYNOPSIS
    gcloud beta kms keyrings set-iam-policy KEYRING POLICY_FILE
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keyrings add-iam-policy-binding

```text
NAME
    gcloud alpha kms keyrings add-iam-policy-binding - add IAM policy binding
        for a kms keyring

SYNOPSIS
    gcloud alpha kms keyrings add-iam-policy-binding
        (KEYRING : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keyrings config export

```text
NAME
    gcloud alpha kms keyrings config export - export the configuration for a
        Cloud KMS key ring

SYNOPSIS
    gcloud alpha kms keyrings config export
        ([KEYRING : --location=LOCATION] --all) [--path=PATH; default="-"]
        [--resource-format=RESOURCE_FORMAT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keyrings create

```text
NAME
    gcloud alpha kms keyrings create - create a new keyring

SYNOPSIS
    gcloud alpha kms keyrings create (KEYRING : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keyrings delete

```text
NAME
    gcloud alpha kms keyrings delete - delete a keyring

SYNOPSIS
    gcloud alpha kms keyrings delete (KEYRING : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keyrings describe

```text
NAME
    gcloud alpha kms keyrings describe - get metadata for a keyring

SYNOPSIS
    gcloud alpha kms keyrings describe (KEYRING : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keyrings get-iam-policy

```text
NAME
    gcloud alpha kms keyrings get-iam-policy - get the IAM policy for a keyring

SYNOPSIS
    gcloud alpha kms keyrings get-iam-policy KEYRING [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keyrings list

```text
NAME
    gcloud alpha kms keyrings list - list keyrings within a location

SYNOPSIS
    gcloud alpha kms keyrings list --location=LOCATION [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keyrings remove-iam-policy-binding

```text
NAME
    gcloud alpha kms keyrings remove-iam-policy-binding - remove IAM policy
        binding for a kms keyring

SYNOPSIS
    gcloud alpha kms keyrings remove-iam-policy-binding
        (KEYRING : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keyrings set-iam-policy

```text
NAME
    gcloud alpha kms keyrings set-iam-policy - set the IAM policy for a keyring

SYNOPSIS
    gcloud alpha kms keyrings set-iam-policy KEYRING POLICY_FILE
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/keyrings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
