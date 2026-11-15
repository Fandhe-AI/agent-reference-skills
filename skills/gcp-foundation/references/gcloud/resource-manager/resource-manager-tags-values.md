---
source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/tags/values
---

# gcloud resource-manager tags values

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud resource-manager tags values add-iam-policy-binding

```text
NAME
    gcloud resource-manager tags values add-iam-policy-binding - adds a policy
        binding to the IAM policy of a TagValue

SYNOPSIS
    gcloud resource-manager tags values add-iam-policy-binding RESOURCE_NAME
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds the IAM policy binding for a TagValue resource given the binding and
    an identifier for the TagValue. The identifier can be the TagValue's
    namespaced name in the form
    <parent_namespace>/<tagkey_short_name>/<tagvalue_short_name> or the
    TagValue's ID in the form: tagValues/{numeric_id}.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' on the Tag Value 'tagValues/111', run:

        $ gcloud resource-manager tags values add-iam-policy-binding \
            tagValues/111 --member='user:test-user@gmail.com' \
            --role='roles/editor'

    To add an IAM policy binding for a Tag Value with the name 'dev' under
    'organization/456/env' for the role of 'roles/resourcemanager.tagUser' for
    the user 'test-user@gmail.com', run:

        $ gcloud resource-manager tags values add-iam-policy-binding \
            456/env/dev --member='user:test-user@gmail.com' \
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

        $ gcloud alpha resource-manager tags values add-iam-policy-binding

        $ gcloud beta resource-manager tags values add-iam-policy-binding
```

### gcloud resource-manager tags values create

```text
NAME
    gcloud resource-manager tags values create - creates a TagValue resource

SYNOPSIS
    gcloud resource-manager tags values create (SHORT_NAME --parent=PARENT)
        [--async] [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a TagValue resource given the short_name and description (optional)
    as well as the parent, the of the TagValue. The parent of the TagValue can
    be a TagKey or TagValue. The parent can be specified by its numeric ID or
    its namespaced name.

EXAMPLES
    To create a TagValue with the short name test and the description
    descriptio under a TagKey with a short name env under organizations/123,
    run:

        $ gcloud resource-manager tags values create test --parent=123/env \
            --description=description

    To create a TagValue with the short name test under TagKey with id 456,
    run:

        $ gcloud resource-manager tags values create test \
            --parent=tagKeys/456 --description=description

POSITIONAL ARGUMENTS
     TagValue.

     This must be specified.

       SHORT_NAME
          User specified, friendly name of the TagKey or TagValue. The field
          must be 1-63 characters, beginning and ending with an alphanumeric
          character ([a-z0-9A-Z]) with dashes (-), underscores ( _ ), dots (.),
          and alphanumerics between.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --parent=PARENT
          Parent of the TagValue in either in the form of tagKeys/{id} or
          {org_id}/{tagkey_short_name}

          This flag argument must be specified if any of the other arguments in
          this group are specified.

FLAGS
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

        $ gcloud alpha resource-manager tags values create

        $ gcloud beta resource-manager tags values create
```

### gcloud resource-manager tags values delete

```text
NAME
    gcloud resource-manager tags values delete - deletes the specified TagValue
        resource

SYNOPSIS
    gcloud resource-manager tags values delete RESOURCE_NAME [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes the TagValue resource given the TagValue's parent and short name or
    the TagValue's numeric id.

EXAMPLES
    To delete a TagValue with id 123, run:

        $ gcloud resource-manager tags values delete tagValues/123

    To delete a TagValue named dev with tagKey env under organization 456, run:

        $ gcloud resource-manager tags values delete 456/env/dev

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

        $ gcloud alpha resource-manager tags values delete

        $ gcloud beta resource-manager tags values delete
```

### gcloud resource-manager tags values describe

```text
NAME
    gcloud resource-manager tags values describe - describes a TagValue
        resource

SYNOPSIS
    gcloud resource-manager tags values describe RESOURCE_NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets metadata for a TagValue resource given the TagValue's resource name or
    namespaced name.

EXAMPLES
    To describe a TagValue with id 123, run:

        $ gcloud resource-manager tags values describe tagValues/123

    To describe a TagValue with name dev with the tagKey env under
    organizations 456, run:

        $ gcloud resource-manager tags values describe 456/env/dev

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

        $ gcloud alpha resource-manager tags values describe

        $ gcloud beta resource-manager tags values describe
```

### gcloud resource-manager tags values get-iam-policy

```text
NAME
    gcloud resource-manager tags values get-iam-policy - gets the IAM policy
        for a TagValue resource

SYNOPSIS
    gcloud resource-manager tags values get-iam-policy RESOURCE_NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns the IAM policy for a TagValue resource given the TagValue's short
    name and parent or the TagValue's numeric id.

EXAMPLES
    To get the IAM policy for a TagValue with id '123', run:

        $ gcloud resource-manager tags values get-iam-policy tagValues/123

    To get the IAM policy for a TagValue with the name 'dev' under
    'organizations/456' and tagKey parent 'env', run:

        $ gcloud resource-manager tags values get-iam-policy 456/env/dev

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

        $ gcloud alpha resource-manager tags values get-iam-policy

        $ gcloud beta resource-manager tags values get-iam-policy
```

### gcloud resource-manager tags values list

```text
NAME
    gcloud resource-manager tags values list - lists TagValues under the
        specified parent resource

SYNOPSIS
    gcloud resource-manager tags values list --parent=PARENT
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To list all the TagValues under organizations/123/env, run:

        $ gcloud resource-manager tags values list --parent=123/env

REQUIRED FLAGS
     --parent=PARENT
        Parent of the TagValue in either in the form of tagKeys/{id} or
        {org_id}/{tagkey_short_name}

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

        $ gcloud alpha resource-manager tags values list

        $ gcloud beta resource-manager tags values list
```

### gcloud resource-manager tags values remove-iam-policy-binding

```text
NAME
    gcloud resource-manager tags values remove-iam-policy-binding - removes a
        policy binding from the IAM policy of a TagValue

SYNOPSIS
    gcloud resource-manager tags values remove-iam-policy-binding RESOURCE_NAME
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes an IAM policy binding for a TagValue resource given the binding and
    an identifier for the TagValue. The identifier can be the TagValue's
    namespaced name in the form
    <parent_namespace>/<tagkey_short_name>/<tagvalue_short_name> or the
    TagValue's ID in the form: tagValues/{numeric_id}.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' on the tagValue 'tagValues/111', run:

        $ gcloud resource-manager tags values remove-iam-policy-binding \
            tagValues/111 --member='user:test-user@gmail.com' \
            --role='roles/editor'

    To remove an IAM policy binding for a TagValue with the name 'dev' under
    'organization/456/env' for the role of 'roles/resourcemanager.tagUser' for
    the user 'test-user@gmail.com', run:

        $ gcloud resource-manager tags values remove-iam-policy-binding \
            456/env/dev --member='user:test-user@gmail.com' \
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

        $ gcloud alpha resource-manager tags values remove-iam-policy-binding

        $ gcloud beta resource-manager tags values remove-iam-policy-binding
```

### gcloud resource-manager tags values set-iam-policy

```text
NAME
    gcloud resource-manager tags values set-iam-policy - sets IAM policy for a
        TagValue resource

SYNOPSIS
    gcloud resource-manager tags values set-iam-policy RESOURCE_NAME
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for a TagValue resource given the TagValue's short name
    name and parent or the TagValue's numeric id and a file encoded in JSON or
    YAML that contains the IAM policy.

EXAMPLES
    To set the IAM policy for a TagValue with id '111' and IAM policy defined
    in a YAML file '/path/to/my_policy.yaml', run:

        $ gcloud resource-manager tags values set-iam-policy tagValues/111 \
            /path/to/my_policy.yaml

    To set the IAM policy for a tagValue with the short_name 'dev' under
    'organization/456' and tag key short name 'env' and IAM policy defined in a
    JSON file '/path/to/my_policy.json', run:

        $ gcloud resource-manager tags values set-iam-policy 456/env/dev \
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

        $ gcloud alpha resource-manager tags values set-iam-policy

        $ gcloud beta resource-manager tags values set-iam-policy
```

### gcloud resource-manager tags values update

```text
NAME
    gcloud resource-manager tags values update - updates the specified TagValue
        resource's description

SYNOPSIS
    gcloud resource-manager tags values update RESOURCE_NAME [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates the TagValue's description given the TagValue's namespaced name
    <parent_namespace>/<tagkey_short_name>/<short_name> or the TagValue's
    numeric id tagValues/<id>

EXAMPLES
    To update a TagValue with id 123, run:

        $ gcloud resource-manager tags values update tagValues/123 \
            --description="foobar"

    To update a TagValue named dev with the tagKey env under organization 456,
    run:

        $ gcloud resource-manager tags values update 465/env/dev \
            --description="foobar"

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

        $ gcloud alpha resource-manager tags values update

        $ gcloud beta resource-manager tags values update
```

### gcloud beta resource-manager tags values add-iam-policy-binding

```text
NAME
    gcloud beta resource-manager tags values add-iam-policy-binding - adds a
        policy binding to the IAM policy of a TagValue

SYNOPSIS
    gcloud beta resource-manager tags values add-iam-policy-binding
        RESOURCE_NAME --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags values create

```text
NAME
    gcloud beta resource-manager tags values create - creates a TagValue
        resource

SYNOPSIS
    gcloud beta resource-manager tags values create
        (SHORT_NAME --parent=PARENT) [--async] [--description=DESCRIPTION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags values delete

```text
NAME
    gcloud beta resource-manager tags values delete - deletes the specified
        TagValue resource

SYNOPSIS
    gcloud beta resource-manager tags values delete RESOURCE_NAME [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags values describe

```text
NAME
    gcloud beta resource-manager tags values describe - describes a TagValue
        resource

SYNOPSIS
    gcloud beta resource-manager tags values describe RESOURCE_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags values get-iam-policy

```text
NAME
    gcloud beta resource-manager tags values get-iam-policy - gets the IAM
        policy for a TagValue resource

SYNOPSIS
    gcloud beta resource-manager tags values get-iam-policy RESOURCE_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags values list

```text
NAME
    gcloud beta resource-manager tags values list - lists TagValues under the
        specified parent resource

SYNOPSIS
    gcloud beta resource-manager tags values list --parent=PARENT
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags values remove-iam-policy-binding

```text
NAME
    gcloud beta resource-manager tags values remove-iam-policy-binding -
        removes a policy binding from the IAM policy of a TagValue

SYNOPSIS
    gcloud beta resource-manager tags values remove-iam-policy-binding
        RESOURCE_NAME --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags values set-iam-policy

```text
NAME
    gcloud beta resource-manager tags values set-iam-policy - sets IAM policy
        for a TagValue resource

SYNOPSIS
    gcloud beta resource-manager tags values set-iam-policy RESOURCE_NAME
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags values update

```text
NAME
    gcloud beta resource-manager tags values update - updates the specified
        TagValue resource's description

SYNOPSIS
    gcloud beta resource-manager tags values update RESOURCE_NAME [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags values add-iam-policy-binding

```text
NAME
    gcloud alpha resource-manager tags values add-iam-policy-binding - adds a
        policy binding to the IAM policy of a TagValue

SYNOPSIS
    gcloud alpha resource-manager tags values add-iam-policy-binding
        RESOURCE_NAME --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags values create

```text
NAME
    gcloud alpha resource-manager tags values create - creates a TagValue
        resource

SYNOPSIS
    gcloud alpha resource-manager tags values create
        (SHORT_NAME --parent=PARENT) [--async] [--description=DESCRIPTION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags values delete

```text
NAME
    gcloud alpha resource-manager tags values delete - deletes the specified
        TagValue resource

SYNOPSIS
    gcloud alpha resource-manager tags values delete RESOURCE_NAME [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags values describe

```text
NAME
    gcloud alpha resource-manager tags values describe - describes a TagValue
        resource

SYNOPSIS
    gcloud alpha resource-manager tags values describe RESOURCE_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags values get-iam-policy

```text
NAME
    gcloud alpha resource-manager tags values get-iam-policy - gets the IAM
        policy for a TagValue resource

SYNOPSIS
    gcloud alpha resource-manager tags values get-iam-policy RESOURCE_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags values list

```text
NAME
    gcloud alpha resource-manager tags values list - lists TagValues under the
        specified parent resource

SYNOPSIS
    gcloud alpha resource-manager tags values list --parent=PARENT
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags values remove-iam-policy-binding

```text
NAME
    gcloud alpha resource-manager tags values remove-iam-policy-binding -
        removes a policy binding from the IAM policy of a TagValue

SYNOPSIS
    gcloud alpha resource-manager tags values remove-iam-policy-binding
        RESOURCE_NAME --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags values set-iam-policy

```text
NAME
    gcloud alpha resource-manager tags values set-iam-policy - sets IAM policy
        for a TagValue resource

SYNOPSIS
    gcloud alpha resource-manager tags values set-iam-policy RESOURCE_NAME
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags values update

```text
NAME
    gcloud alpha resource-manager tags values update - updates the specified
        TagValue resource's description

SYNOPSIS
    gcloud alpha resource-manager tags values update RESOURCE_NAME [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/tags/values (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
