---
source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/tags/keys
---

# gcloud resource-manager tags keys

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud resource-manager tags keys add-iam-policy-binding

```text
NAME
    gcloud resource-manager tags keys add-iam-policy-binding - adds a policy
        binding to the IAM policy of a TagKey

SYNOPSIS
    gcloud resource-manager tags keys add-iam-policy-binding RESOURCE_NAME
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds the IAM policy binding for a TagKey resource given the binding and an
    identifier for the TagKey. The identifier can be the TagKey's parent/short
    name or the TagKey's ID in the form: tagKeys/{numeric_id}.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' on the Tag Key 'tagKeys/123', run:

        $ gcloud resource-manager tags keys add-iam-policy-binding \
            tagKeys/123 --member='user:test-user@gmail.com' \
            --role='roles/editor'

    To add an IAM policy binding for a Tag Key with the name 'env' under
    'organization/456' for the role of 'roles/resourcemanager.tagUser' for the
    user 'test-user@gmail.com', run:

        $ gcloud resource-manager tags keys add-iam-policy-binding 456/env \
            --member='user:test-user@gmail.com' \
            --role='roles/resourcemanager.tagUser'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     RESOURCE_NAME
        Resource name or namespaced name. The resource name should be in the
        form {resource_type}/{numeric_id}. The namespaced name should be in the
        form {org_id}/{short_name} where short_name must be 1-63 characters,
        beginning and ending with an alphanumeric character ([a-z0-9A-Z]) with
        dashes (-), underscores ( _ ), dots (.), and alphanumerics between.

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
    These variants are also available:

        $ gcloud alpha resource-manager tags keys add-iam-policy-binding

        $ gcloud beta resource-manager tags keys add-iam-policy-binding
```

### gcloud resource-manager tags keys create

```text
NAME
    gcloud resource-manager tags keys create - creates a TagKey resource under
        the specified tag parent

SYNOPSIS
    gcloud resource-manager tags keys create (SHORT_NAME --parent=PARENT)
        [--allowed-values-regex=ALLOWED_VALUES_REGEX] [--async]
        [--description=DESCRIPTION] [--purpose=PURPOSE]
        [--purpose-data=[network=NETWORK],[organization=ORGANIZATION]]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To create a TagKey with the name env under 'organizations/123' with
    description 'description', run:

        $ gcloud resource-manager tags keys create env \
        --parent=organizations/123 --description=description

POSITIONAL ARGUMENTS
     TagKey.

     This must be specified.

       SHORT_NAME
          User specified, friendly name of the TagKey or TagValue. The field
          must be 1-63 characters, beginning and ending with an alphanumeric
          character ([a-z0-9A-Z]) with dashes (-), underscores ( _ ), dots (.),
          and alphanumerics between.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --parent=PARENT
          Parent of the TagKey in the form of organizations/{org_id}.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

FLAGS
     --allowed-values-regex=ALLOWED_VALUES_REGEX
        User-assigned regex of allowed short names of TagValues under a TagKey.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        User-assigned description of the TagKey or TagValue. Must not exceed
        256 characters.

     --purpose=PURPOSE
        Purpose specifier of the TagKey that can only be set on creation.
        Specifying this field adds additional validation from the policy system
        that corresponds to the purpose. PURPOSE must be one of: GCE_FIREWALL,
        DATA_GOVERNANCE.

     --purpose-data=[network=NETWORK],[organization=ORGANIZATION]
        Purpose data of the TagKey that can only be set on creation. This data
        is validated by the policy system that corresponds to the purpose.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager tags keys create

        $ gcloud beta resource-manager tags keys create
```

### gcloud resource-manager tags keys delete

```text
NAME
    gcloud resource-manager tags keys delete - deletes the specified TagKey
        resource

SYNOPSIS
    gcloud resource-manager tags keys delete RESOURCE_NAME [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes the TagKey resource given the TagKey's parent and short name or the
    TagKey's numeric id.

EXAMPLES
    To delete a TagKey with id 123, run:

        $ gcloud resource-manager tags keys delete tagKeys/123

    To delete a TagKey named env under organization 456, run:

        $ gcloud resource-manager tags keys delete 456/env

POSITIONAL ARGUMENTS
     RESOURCE_NAME
        Resource name or namespaced name. The resource name should be in the
        form {resource_type}/{numeric_id}. The namespaced name should be in the
        form {org_id}/{short_name} where short_name must be 1-63 characters,
        beginning and ending with an alphanumeric character ([a-z0-9A-Z]) with
        dashes (-), underscores ( _ ), dots (.), and alphanumerics between.

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

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager tags keys delete

        $ gcloud beta resource-manager tags keys delete
```

### gcloud resource-manager tags keys describe

```text
NAME
    gcloud resource-manager tags keys describe - describes a TagKey resource

SYNOPSIS
    gcloud resource-manager tags keys describe RESOURCE_NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets metadata for a TagKey resource given the TagKey's resource name or
    namespaced name.

EXAMPLES
    To describe a TagKey with id '123', run:

        $ gcloud resource-manager tags keys describe tagkeys/123

    To describe a TagKey with the name 'env' under organizations '456', run:

        $ gcloud resource-manager tags keys describe 456/env

POSITIONAL ARGUMENTS
     RESOURCE_NAME
        Resource name or namespaced name. The resource name should be in the
        form {resource_type}/{numeric_id}. The namespaced name should be in the
        form {org_id}/{short_name} where short_name must be 1-63 characters,
        beginning and ending with an alphanumeric character ([a-z0-9A-Z]) with
        dashes (-), underscores ( _ ), dots (.), and alphanumerics between.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager tags keys describe

        $ gcloud beta resource-manager tags keys describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud resource-manager tags keys describe tagKeys/123
```

### gcloud resource-manager tags keys get-iam-policy

```text
NAME
    gcloud resource-manager tags keys get-iam-policy - gets the IAM policy for
        a TagKey resource

SYNOPSIS
    gcloud resource-manager tags keys get-iam-policy RESOURCE_NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns the IAM policy for a TagKey resource given the TagKey's display
    name and parent or the TagKey's numeric id.

EXAMPLES
    To get the IAM policy for a TagKey with id '123', run:

        $ gcloud resource-manager tags keys get-iam-policy tagKeys/123

    To get the IAM policy for a TagKey with the name 'env' under
    'organizations/456', run:

        $ gcloud resource-manager tags keys get-iam-policy 456/env

POSITIONAL ARGUMENTS
     RESOURCE_NAME
        Resource name or namespaced name. The resource name should be in the
        form {resource_type}/{numeric_id}. The namespaced name should be in the
        form {org_id}/{short_name} where short_name must be 1-63 characters,
        beginning and ending with an alphanumeric character ([a-z0-9A-Z]) with
        dashes (-), underscores ( _ ), dots (.), and alphanumerics between.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager tags keys get-iam-policy

        $ gcloud beta resource-manager tags keys get-iam-policy
```

### gcloud resource-manager tags keys list

```text
NAME
    gcloud resource-manager tags keys list - lists TagKeys under the specified
        parent resource

SYNOPSIS
    gcloud resource-manager tags keys list --parent=PARENT
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To list all the TagKeys under 'organizations/123', run:

        $ gcloud resource-manager tags keys list --parent='organizations/123'

REQUIRED FLAGS
     --parent=PARENT
        Parent of the TagKey in the form of organizations/{org_id}.

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

        $ gcloud alpha resource-manager tags keys list

        $ gcloud beta resource-manager tags keys list
```

### gcloud resource-manager tags keys remove-iam-policy-binding

```text
NAME
    gcloud resource-manager tags keys remove-iam-policy-binding - removes a
        policy binding from the IAM policy of a TagKey

SYNOPSIS
    gcloud resource-manager tags keys remove-iam-policy-binding RESOURCE_NAME
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes an IAM policy binding for a TagKey resource given the binding and
    an identifier for the TagKey. The identifier can be the TagKey's
    parent/short name or the TagKey's ID in the form: tagKeys/{numeric_id}.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' on the tagKey 'tagKeys/123', run:

        $ gcloud resource-manager tags keys remove-iam-policy-binding \
            tagKeys/123 --member='user:test-user@gmail.com' \
            --role='roles/editor'

    To remove an IAM policy binding for a TagKey with the name 'env' under
    'organization/456' for the role of 'roles/resourcemanager.tagUser' for the
    user 'test-user@gmail.com', run:

        $ gcloud resource-manager tags keys remove-iam-policy-binding \
            456/env --member='user:test-user@gmail.com' \
            --role='roles/resourcemanager.tagUser'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     RESOURCE_NAME
        Resource name or namespaced name. The resource name should be in the
        form {resource_type}/{numeric_id}. The namespaced name should be in the
        form {org_id}/{short_name} where short_name must be 1-63 characters,
        beginning and ending with an alphanumeric character ([a-z0-9A-Z]) with
        dashes (-), underscores ( _ ), dots (.), and alphanumerics between.

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
    These variants are also available:

        $ gcloud alpha resource-manager tags keys remove-iam-policy-binding

        $ gcloud beta resource-manager tags keys remove-iam-policy-binding
```

### gcloud resource-manager tags keys set-iam-policy

```text
NAME
    gcloud resource-manager tags keys set-iam-policy - sets IAM policy for a
        TagKey resource

SYNOPSIS
    gcloud resource-manager tags keys set-iam-policy RESOURCE_NAME POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for a TagKey resource given the TagKey's display name
    and parent or the TagKey's numeric id and a file encoded in JSON or YAML
    that contains the IAM policy.

EXAMPLES
    To set the IAM policy for a TagKey with id '123' and IAM policy defined in
    a YAML file '/path/to/my_policy.yaml', run:

        $ gcloud resource-manager tags keys set-iam-policy tagKeys/123 \
            /path/to/my_policy.yaml

    To set the IAM policy for a tagKey with the short_name 'env' under
    'organization/456' and IAM policy defined in a JSON file
    '/path/to/my_policy.json', run:

        $ gcloud resource-manager tags keys set-iam-policy 456/env \
            /path/to/my_policy.json

POSITIONAL ARGUMENTS
     RESOURCE_NAME
        Resource name or namespaced name. The resource name should be in the
        form {resource_type}/{numeric_id}. The namespaced name should be in the
        form {org_id}/{short_name} where short_name must be 1-63 characters,
        beginning and ending with an alphanumeric character ([a-z0-9A-Z]) with
        dashes (-), underscores ( _ ), dots (.), and alphanumerics between.

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

        $ gcloud alpha resource-manager tags keys set-iam-policy

        $ gcloud beta resource-manager tags keys set-iam-policy
```

### gcloud resource-manager tags keys update

```text
NAME
    gcloud resource-manager tags keys update - updates the specified TagKey
        resource's description

SYNOPSIS
    gcloud resource-manager tags keys update RESOURCE_NAME
        [--allowed-values-regex=ALLOWED_VALUES_REGEX] [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates the TagKey's description given the TagKey's parent and short name
    or the TagKey's numeric id.

EXAMPLES
    To update a TagKey with id 123, run:

        $ gcloud resource-manager tags keys update tagKeys/123 \
            --description=foobar --allowed-values-regex=.*

    To update a TagKey named env under organization 456, run:

        $ gcloud resource-manager tags keys update 456/env \
            --description=foobar --allowed-values-regex=.*

POSITIONAL ARGUMENTS
     RESOURCE_NAME
        Resource name or namespaced name. The resource name should be in the
        form {resource_type}/{numeric_id}. The namespaced name should be in the
        form {org_id}/{short_name} where short_name must be 1-63 characters,
        beginning and ending with an alphanumeric character ([a-z0-9A-Z]) with
        dashes (-), underscores ( _ ), dots (.), and alphanumerics between.

FLAGS
     --allowed-values-regex=ALLOWED_VALUES_REGEX
        User-assigned regex of allowed short names of TagValues under a TagKey.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        User-assigned description of the TagKey or TagValue. Must not exceed
        256 characters.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager tags keys update

        $ gcloud beta resource-manager tags keys update
```

### gcloud beta resource-manager tags keys add-iam-policy-binding

```text
NAME
    gcloud beta resource-manager tags keys add-iam-policy-binding - adds a
        policy binding to the IAM policy of a TagKey

SYNOPSIS
    gcloud beta resource-manager tags keys add-iam-policy-binding RESOURCE_NAME
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags keys create

```text
NAME
    gcloud beta resource-manager tags keys create - creates a TagKey resource
        under the specified tag parent

SYNOPSIS
    gcloud beta resource-manager tags keys create (SHORT_NAME --parent=PARENT)
        [--allowed-values-regex=ALLOWED_VALUES_REGEX] [--async]
        [--description=DESCRIPTION] [--purpose=PURPOSE]
        [--purpose-data=[network=NETWORK],[organization=ORGANIZATION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags keys delete

```text
NAME
    gcloud beta resource-manager tags keys delete - deletes the specified
        TagKey resource

SYNOPSIS
    gcloud beta resource-manager tags keys delete RESOURCE_NAME [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags keys describe

```text
NAME
    gcloud beta resource-manager tags keys describe - describes a TagKey
        resource

SYNOPSIS
    gcloud beta resource-manager tags keys describe RESOURCE_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags keys get-iam-policy

```text
NAME
    gcloud beta resource-manager tags keys get-iam-policy - gets the IAM policy
        for a TagKey resource

SYNOPSIS
    gcloud beta resource-manager tags keys get-iam-policy RESOURCE_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags keys list

```text
NAME
    gcloud beta resource-manager tags keys list - lists TagKeys under the
        specified parent resource

SYNOPSIS
    gcloud beta resource-manager tags keys list --parent=PARENT
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags keys remove-iam-policy-binding

```text
NAME
    gcloud beta resource-manager tags keys remove-iam-policy-binding - removes
        a policy binding from the IAM policy of a TagKey

SYNOPSIS
    gcloud beta resource-manager tags keys remove-iam-policy-binding
        RESOURCE_NAME --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags keys set-iam-policy

```text
NAME
    gcloud beta resource-manager tags keys set-iam-policy - sets IAM policy for
        a TagKey resource

SYNOPSIS
    gcloud beta resource-manager tags keys set-iam-policy RESOURCE_NAME
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags keys update

```text
NAME
    gcloud beta resource-manager tags keys update - updates the specified
        TagKey resource's description

SYNOPSIS
    gcloud beta resource-manager tags keys update RESOURCE_NAME
        [--allowed-values-regex=ALLOWED_VALUES_REGEX] [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags keys add-iam-policy-binding

```text
NAME
    gcloud alpha resource-manager tags keys add-iam-policy-binding - adds a
        policy binding to the IAM policy of a TagKey

SYNOPSIS
    gcloud alpha resource-manager tags keys add-iam-policy-binding
        RESOURCE_NAME --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags keys create

```text
NAME
    gcloud alpha resource-manager tags keys create - creates a TagKey resource
        under the specified tag parent

SYNOPSIS
    gcloud alpha resource-manager tags keys create (SHORT_NAME --parent=PARENT)
        [--allowed-values-regex=ALLOWED_VALUES_REGEX] [--async]
        [--description=DESCRIPTION] [--purpose=PURPOSE]
        [--purpose-data=[network=NETWORK],[organization=ORGANIZATION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags keys delete

```text
NAME
    gcloud alpha resource-manager tags keys delete - deletes the specified
        TagKey resource

SYNOPSIS
    gcloud alpha resource-manager tags keys delete RESOURCE_NAME [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags keys describe

```text
NAME
    gcloud alpha resource-manager tags keys describe - describes a TagKey
        resource

SYNOPSIS
    gcloud alpha resource-manager tags keys describe RESOURCE_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags keys get-iam-policy

```text
NAME
    gcloud alpha resource-manager tags keys get-iam-policy - gets the IAM
        policy for a TagKey resource

SYNOPSIS
    gcloud alpha resource-manager tags keys get-iam-policy RESOURCE_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags keys list

```text
NAME
    gcloud alpha resource-manager tags keys list - lists TagKeys under the
        specified parent resource

SYNOPSIS
    gcloud alpha resource-manager tags keys list --parent=PARENT
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags keys remove-iam-policy-binding

```text
NAME
    gcloud alpha resource-manager tags keys remove-iam-policy-binding - removes
        a policy binding from the IAM policy of a TagKey

SYNOPSIS
    gcloud alpha resource-manager tags keys remove-iam-policy-binding
        RESOURCE_NAME --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags keys set-iam-policy

```text
NAME
    gcloud alpha resource-manager tags keys set-iam-policy - sets IAM policy
        for a TagKey resource

SYNOPSIS
    gcloud alpha resource-manager tags keys set-iam-policy RESOURCE_NAME
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags keys update

```text
NAME
    gcloud alpha resource-manager tags keys update - updates the specified
        TagKey resource's description

SYNOPSIS
    gcloud alpha resource-manager tags keys update RESOURCE_NAME
        [--allowed-values-regex=ALLOWED_VALUES_REGEX] [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): `tagkeys/...` in the example is corrected to `tagKeys/...`, the TagKey resource name format (`tagKeys/{numeric_id}`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/tags/keys (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
