---
source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/policies
---

# gcloud access-context-manager policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud access-context-manager policies add-iam-policy-binding

```text
NAME
    gcloud access-context-manager policies add-iam-policy-binding - add IAM
        policy binding for an access policy

SYNOPSIS
    gcloud access-context-manager policies add-iam-policy-binding [POLICY]
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds a policy binding to the IAM policy of an access policy. The binding
    consists of a role, identity, and access policy.

EXAMPLES
    To add an IAM policy binding for the role of roles/notebooks.admin for the
    user 'test-user@gmail.com' on the access policy 'accessPolicies/123', run:

        $ gcloud access-context-manager policies add-iam-policy-binding \
            --member='user:test-user@gmail.com' \
            --role='roles/notebooks.admin' accessPolicies/123

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Policy resource - The access policy to add the IAM binding. This
     represents a Cloud resource.

     [POLICY]
        ID of the policy or fully qualified identifier for the policy.

        To set the policy attribute:
        * provide the argument policy on the command line;
        * set the property access_context_manager/policy;
        * automatically, if the current account belongs to an organization
          with exactly one access policy..

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
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager policies add-iam-policy-binding

        $ gcloud beta access-context-manager policies add-iam-policy-binding
```

### gcloud access-context-manager policies create

```text
NAME
    gcloud access-context-manager policies create - create a new access policy

SYNOPSIS
    gcloud access-context-manager policies create --organization=ORGANIZATION
        --title=TITLE [--async] [--scopes=[SCOPES,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Access Context Manager policy. An Access Context Manager
    policy, also known as an access policy, is a container for access levels
    and VPC Service Controls service perimeters.

    You can optionally specify either a folder or a project as a scope of an
    access policy. A scoped policy only allows projects under that scope to be
    restricted by any service perimeters defined with that policy. The scope
    must be within the organization that this policy is associated with. You
    can specify only one folder or project as the scope for an access policy.
    If you don't specify a scope, then the scope extends to the entire
    organization and any projects within the organization can be added to
    service perimeters in this policy.

    This command only creates an access policy. Access levels and service
    perimeters need to be created explicitly.

EXAMPLES
    To create an access policy that applies to the entire organization, run:

        $ gcloud access-context-manager policies create \
            --organization=organizations/123 --title="My Policy"

    To create an access policy that applies to the folder with the ID 345, run:

        $ gcloud access-context-manager policies create \
            --organization=organizations/123 --scopes=folders/345 \
            --title="My Folder Policy"

    Only projects within this folder can be added to service perimeters within
    this policy.

    To create an access policy that applies only to the project with the
    project number 567, run:

        $ gcloud access-context-manager policies create \
            --organization=organizations/123 --scopes=projects/567 \
            --title="My Project Policy"

REQUIRED FLAGS
     --organization=ORGANIZATION
        Parent organization for the access policies.

     --title=TITLE
        Short human-readable title of the access policy.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --scopes=[SCOPES,...]
        Folder or project on which this policy is applicable. You can specify
        only one folder or project as the scope and the scope must exist within
        the specified organization. If you don't specify a scope, the policy
        applies to the entire organization.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager policies create

        $ gcloud beta access-context-manager policies create
```

### gcloud access-context-manager policies delete

```text
NAME
    gcloud access-context-manager policies delete - delete an access policy

SYNOPSIS
    gcloud access-context-manager policies delete [POLICY]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a given access policy.

POSITIONAL ARGUMENTS
     Policy resource - The access policy you want to delete. This represents a
     Cloud resource.

     [POLICY]
        ID of the policy or fully qualified identifier for the policy.

        To set the policy attribute:
        * provide the argument policy on the command line;
        * set the property access_context_manager/policy;
        * automatically, if the current account belongs to an organization
          with exactly one access policy..

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager policies delete

        $ gcloud beta access-context-manager policies delete
```

### gcloud access-context-manager policies describe

```text
NAME
    gcloud access-context-manager policies describe - show details about an
        access policy

SYNOPSIS
    gcloud access-context-manager policies describe [POLICY]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about a given access policy.

POSITIONAL ARGUMENTS
     Policy resource - The access level you want to show details about. This
     represents a Cloud resource.

     [POLICY]
        ID of the policy or fully qualified identifier for the policy.

        To set the policy attribute:
        * provide the argument policy on the command line;
        * set the property access_context_manager/policy;
        * automatically, if the current account belongs to an organization
          with exactly one access policy..

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager policies describe

        $ gcloud beta access-context-manager policies describe
```

### gcloud access-context-manager policies get-iam-policy

```text
NAME
    gcloud access-context-manager policies get-iam-policy - get the IAM policy
        for an access policy

SYNOPSIS
    gcloud access-context-manager policies get-iam-policy [POLICY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud access-context-manager policies get-iam-policy Displays the IAM
    policy associated with an access policy. If formatted as JSON, the output
    can be edited and used as a policy file for set-iam-policy. The output
    includes an "etag" field identifying the version emitted and allowing
    detection of concurrent policy updates; see $ {parent} set-iam-policy for
    additional details.

EXAMPLES
    To print the IAM policy for a given access policy, run:

        $ gcloud access-context-manager policies get-iam-policy \
            accessPolicies/1234

POSITIONAL ARGUMENTS
     Policy resource - The access policy for which to display the IAM policy.
     This represents a Cloud resource.

     [POLICY]
        ID of the policy or fully qualified identifier for the policy.

        To set the policy attribute:
        * provide the argument policy on the command line;
        * set the property access_context_manager/policy;
        * automatically, if the current account belongs to an organization
          with exactly one access policy..

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
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager policies get-iam-policy

        $ gcloud beta access-context-manager policies get-iam-policy
```

### gcloud access-context-manager policies list

```text
NAME
    gcloud access-context-manager policies list - list access policies

SYNOPSIS
    gcloud access-context-manager policies list --organization=ORGANIZATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List access policies.

EXAMPLES
    To list access policies, run the following command:

        $ gcloud access-context-manager policies list

    This command prints a list of Access Policies in a tabular form:

        NAME      ORGANIZATION SCOPE        TITLE      ETAG
        MY_POLICY 12345        projects/123 My Policy  123abcdef

REQUIRED FLAGS
     Organization resource - The parent organization of the policies you want
     to list. This represents a Cloud resource.

     This must be specified.

       --organization=ORGANIZATION
          ID of the organization or fully qualified identifier for the
          organization.

          To set the organization attribute:
          + provide the argument --organization on the command line.

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
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager policies list

        $ gcloud beta access-context-manager policies list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud access-context-manager policies list \
    --organization=organizations/123
```

### gcloud access-context-manager policies remove-iam-policy-binding

```text
NAME
    gcloud access-context-manager policies remove-iam-policy-binding - remove
        IAM policy binding for an access policy

SYNOPSIS
    gcloud access-context-manager policies remove-iam-policy-binding [POLICY]
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes a policy binding to the IAM policy of an access policy, given an
    access policy ID and the binding.

EXAMPLES
    To remove an IAM policy binding for the role of roles/editor for the user
    'test-user@gmail.com' on the access policy 'accessPolicies/123', run:

        $ gcloud access-context-manager policies remove-iam-policy-binding \
            accessPolicies/123 --member='user:test-user@gmail.com' \
            --role='roles/editor'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Policy resource - The access policy to remove the IAM binding. This
     represents a Cloud resource.

     [POLICY]
        ID of the policy or fully qualified identifier for the policy.

        To set the policy attribute:
        * provide the argument policy on the command line;
        * set the property access_context_manager/policy;
        * automatically, if the current account belongs to an organization
          with exactly one access policy..

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
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager policies \
            remove-iam-policy-binding

        $ gcloud beta access-context-manager policies \
            remove-iam-policy-binding
```

### gcloud access-context-manager policies set-iam-policy

```text
NAME
    gcloud access-context-manager policies set-iam-policy - set IAM policy for
        an access policy

SYNOPSIS
    gcloud access-context-manager policies set-iam-policy [POLICY] POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for a access policy, given access policy ID and a file
    encoded in JSON or YAML that contains the IAM policy.

EXAMPLES
    The following command reads an IAM policy defined in a JSON file
    policy.json and sets it for the access policy with the ID
    accessPolicies/1234:

        $ gcloud access-context-manager policies set-iam-policy \
            accessPolicies/1234 policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Policy resource - The access policy to set the IAM policy for. This
     represents a Cloud resource.

     [POLICY]
        ID of the policy or fully qualified identifier for the policy.

        To set the policy attribute:
        * provide the argument policy on the command line;
        * set the property access_context_manager/policy;
        * automatically, if the current account belongs to an organization
          with exactly one access policy..

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
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager policies set-iam-policy

        $ gcloud beta access-context-manager policies set-iam-policy
```

### gcloud access-context-manager policies update

```text
NAME
    gcloud access-context-manager policies update - update an existing access
        policy

SYNOPSIS
    gcloud access-context-manager policies update [POLICY] [--title=TITLE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing access policy.

POSITIONAL ARGUMENTS
     Policy resource - The access policy to update. This represents a Cloud
     resource.

     [POLICY]
        ID of the policy or fully qualified identifier for the policy.

        To set the policy attribute:
        * provide the argument policy on the command line;
        * set the property access_context_manager/policy.

FLAGS
     --title=TITLE
        Short human-readable title of the access policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager policies update

        $ gcloud beta access-context-manager policies update
```

### gcloud beta access-context-manager policies add-iam-policy-binding

```text
NAME
    gcloud beta access-context-manager policies add-iam-policy-binding - add
        IAM policy binding for an access policy

SYNOPSIS
    gcloud beta access-context-manager policies add-iam-policy-binding [POLICY]
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager policies create

```text
NAME
    gcloud beta access-context-manager policies create - create a new access
        policy

SYNOPSIS
    gcloud beta access-context-manager policies create
        --organization=ORGANIZATION --title=TITLE [--async]
        [--scopes=[SCOPES,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager policies delete

```text
NAME
    gcloud beta access-context-manager policies delete - delete an access
        policy

SYNOPSIS
    gcloud beta access-context-manager policies delete [POLICY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager policies describe

```text
NAME
    gcloud beta access-context-manager policies describe - show details about
        an access policy

SYNOPSIS
    gcloud beta access-context-manager policies describe [POLICY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager policies get-iam-policy

```text
NAME
    gcloud beta access-context-manager policies get-iam-policy - get the IAM
        policy for an access policy

SYNOPSIS
    gcloud beta access-context-manager policies get-iam-policy [POLICY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager policies list

```text
NAME
    gcloud beta access-context-manager policies list - list access policies

SYNOPSIS
    gcloud beta access-context-manager policies list
        --organization=ORGANIZATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager policies remove-iam-policy-binding

```text
NAME
    gcloud beta access-context-manager policies remove-iam-policy-binding -
        remove IAM policy binding for an access policy

SYNOPSIS
    gcloud beta access-context-manager policies remove-iam-policy-binding
        [POLICY] --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager policies set-iam-policy

```text
NAME
    gcloud beta access-context-manager policies set-iam-policy - set IAM policy
        for an access policy

SYNOPSIS
    gcloud beta access-context-manager policies set-iam-policy [POLICY]
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager policies update

```text
NAME
    gcloud beta access-context-manager policies update -

SYNOPSIS
    gcloud beta access-context-manager policies update [POLICY] [--title=TITLE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager policies add-iam-policy-binding

```text
NAME
    gcloud alpha access-context-manager policies add-iam-policy-binding - add
        IAM policy binding for an access policy

SYNOPSIS
    gcloud alpha access-context-manager policies add-iam-policy-binding
        [POLICY] --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager policies config export

```text
NAME
    gcloud alpha access-context-manager policies config export - export the
        configuration for a Access Context Manager access policy

SYNOPSIS
    gcloud alpha access-context-manager policies config export ([POLICY] --all)
        [--path=PATH; default="-"] [--resource-format=RESOURCE_FORMAT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager policies create

```text
NAME
    gcloud alpha access-context-manager policies create - create a new access
        policy

SYNOPSIS
    gcloud alpha access-context-manager policies create
        --organization=ORGANIZATION --title=TITLE [--async]
        [--scopes=[SCOPES,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager policies delete

```text
NAME
    gcloud alpha access-context-manager policies delete - delete an access
        policy

SYNOPSIS
    gcloud alpha access-context-manager policies delete [POLICY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager policies describe

```text
NAME
    gcloud alpha access-context-manager policies describe - show details about
        an access policy

SYNOPSIS
    gcloud alpha access-context-manager policies describe [POLICY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager policies get-iam-policy

```text
NAME
    gcloud alpha access-context-manager policies get-iam-policy - get the IAM
        policy for an access policy

SYNOPSIS
    gcloud alpha access-context-manager policies get-iam-policy [POLICY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager policies list

```text
NAME
    gcloud alpha access-context-manager policies list - list access policies

SYNOPSIS
    gcloud alpha access-context-manager policies list
        --organization=ORGANIZATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager policies remove-iam-policy-binding

```text
NAME
    gcloud alpha access-context-manager policies remove-iam-policy-binding -
        remove IAM policy binding for an access policy

SYNOPSIS
    gcloud alpha access-context-manager policies remove-iam-policy-binding
        [POLICY] --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager policies set-iam-policy

```text
NAME
    gcloud alpha access-context-manager policies set-iam-policy - set IAM
        policy for an access policy

SYNOPSIS
    gcloud alpha access-context-manager policies set-iam-policy [POLICY]
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager policies update

```text
NAME
    gcloud alpha access-context-manager policies update -

SYNOPSIS
    gcloud alpha access-context-manager policies update [POLICY]
        [--title=TITLE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` example omits `--organization`, which the SYNOPSIS requires (`gcloud access-context-manager policies list --organization=ORGANIZATION`; gcloud 593.0.0: "argument --organization: Must be specified."), so the runnable form adds `--organization=organizations/123`, the organization of the `create` examples on this page.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
