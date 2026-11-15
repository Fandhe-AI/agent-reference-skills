---
source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/folders
---

# gcloud resource-manager folders

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud resource-manager folders add-iam-policy-binding

```text
NAME
    gcloud resource-manager folders add-iam-policy-binding - add IAM policy
        binding for a folder

SYNOPSIS
    gcloud resource-manager folders add-iam-policy-binding FOLDER
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds a policy binding to the IAM policy of a folder, given a folder ID and
    the binding. One binding consists of a member, a role, and an optional
    condition.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' on the folder 'folder-id', run:

        $ gcloud resource-manager folders add-iam-policy-binding folder-id \
            --member='user:test-user@gmail.com' --role='roles/editor'

    To add an IAM policy binding which expires at the end of the year 2018 for
    the role of 'roles/storage.objectAdmin' and the user 'test-user@gmail.com'
    on the folder 'folder-id', run:

        $ gcloud resource-manager folders add-iam-policy-binding folder-id \
            --member='user:test-user@gmail.com' \
            --role='roles/storage.objectAdmin' \
            --condition='expression=request.time <
         timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,descrip\
        tion=Expires at midnight on 2018-12-31'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Folder resource - The ID of the folder to add the IAM binding. This
     represents a Cloud resource.

     This must be specified.

       FOLDER
          ID of the folder or fully qualified identifier for the folder.

          To set the folder attribute:
          + provide the argument folder on the command line.

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
    This command uses the cloudresourcemanager/v2 API. The full documentation
    for this API can be found at: https://cloud.google.com/resource-manager

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager folders add-iam-policy-binding

        $ gcloud beta resource-manager folders add-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud resource-manager folders add-iam-policy-binding folder-id \
    --member='user:test-user@gmail.com' \
    --role='roles/storage.objectAdmin' \
    --condition='expression=request.time < timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,description=Expires at midnight on 2018-12-31'
```

### gcloud resource-manager folders create

```text
NAME
    gcloud resource-manager folders create - create a new folder

SYNOPSIS
    gcloud resource-manager folders create --display-name=DISPLAY_NAME
        [--async] [--folder=FOLDER_ID] [--organization=ORGANIZATION_ID]
        [--tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a new folder in the given parent folder or organization.

EXAMPLES
    The following command creates a folder with the name abc into a folder with
    the ID 2345:

        $ gcloud resource-manager folders create --display-name=abc \
            --folder=2345

    The following command creates a folder with the name abc into an
    organization with ID 1234:

        $ gcloud resource-manager folders create --display-name=abc \
            --organization=1234

REQUIRED FLAGS
     --display-name=DISPLAY_NAME
        Friendly display name to use for the new folder.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --folder=FOLDER_ID
        ID for the folder to use as a parent

     --organization=ORGANIZATION_ID
        ID for the organization to use as a parent

     --tags=[KEY=VALUE,...]
        List of tags KEY=VALUE pairs to bind. Each item must be expressed as
        <tag-key-namespaced-name>=<tag-value-short-name>.

        Example: 123/environment=production,123/costCenter=marketing

        Note: Currently this field is in Preview.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager folders create

        $ gcloud beta resource-manager folders create
```

### gcloud resource-manager folders delete

```text
NAME
    gcloud resource-manager folders delete - delete a folder

SYNOPSIS
    gcloud resource-manager folders delete FOLDER_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a folder, given a valid folder ID.

    This command can fail for the following reasons:
      o There is no folder with the given ID.
      o The active account does not have permission to delete the given
        folder.
      o The folder to be deleted is not empty.

EXAMPLES
    The following command deletes a folder with the ID 123456789:

        $ gcloud resource-manager folders delete 123456789

POSITIONAL ARGUMENTS
     FOLDER_ID
        ID for the folder you want to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager folders delete

        $ gcloud beta resource-manager folders delete
```

### gcloud resource-manager folders describe

```text
NAME
    gcloud resource-manager folders describe - show metadata for a folder

SYNOPSIS
    gcloud resource-manager folders describe FOLDER_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Shows metadata for a folder, given a valid folder ID.

    This command can fail for the following reasons:
      o The folder specified does not exist.
      o The active account does not have permission to access the given
        folder.

EXAMPLES
    The following command prints metadata for a folder with the ID 3589215982:

        $ gcloud resource-manager folders describe 3589215982

POSITIONAL ARGUMENTS
     FOLDER_ID
        ID for the folder you want to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager folders describe

        $ gcloud beta resource-manager folders describe
```

### gcloud resource-manager folders get-ancestors-iam-policy

```text
NAME
    gcloud resource-manager folders get-ancestors-iam-policy - get IAM policies
        for a folder and its ancestors

SYNOPSIS
    gcloud resource-manager folders get-ancestors-iam-policy FOLDER_ID
        [--include-deny] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get IAM policies for a folder and its ancestors, given a folder ID.

EXAMPLES
    To get IAM policies for folder 3589215982 and its ancestors, run:

        $ gcloud resource-manager folders get-ancestors-iam-policy 3589215982

POSITIONAL ARGUMENTS
     Folder resource - ID for the folder you want to get IAM policy for. This
     represents a Cloud resource.

     This must be specified.

       FOLDER_ID
          ID of the folder or fully qualified identifier for the folder.

          To set the folder attribute:
          + provide the argument folder_id on the command line.

FLAGS
     --include-deny
        Include deny policies on the project and its ancestors in the result

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

        $ gcloud alpha resource-manager folders get-ancestors-iam-policy

        $ gcloud beta resource-manager folders get-ancestors-iam-policy
```

### gcloud resource-manager folders get-iam-policy

```text
NAME
    gcloud resource-manager folders get-iam-policy - get IAM policy for a
        folder

SYNOPSIS
    gcloud resource-manager folders get-iam-policy FOLDER_ID
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets the IAM policy for a folder, given a folder ID.

EXAMPLES
    The following command prints the IAM policy for a folder with the ID
    3589215982:

        $ gcloud resource-manager folders get-iam-policy 3589215982

POSITIONAL ARGUMENTS
     FOLDER_ID
        ID for the folder whose policy you want to get.

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

        $ gcloud alpha resource-manager folders get-iam-policy

        $ gcloud beta resource-manager folders get-iam-policy
```

### gcloud resource-manager folders list

```text
NAME
    gcloud resource-manager folders list - list folders accessible by the
        active account

SYNOPSIS
    gcloud resource-manager folders list [--folder=FOLDER_ID]
        [--organization=ORGANIZATION_ID] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all folders to which the user has access under the specified parent
    (either an Organization or a Folder). Exactly one of --folder or
    --organization must be provided.

EXAMPLES
    The following command lists folders under org with ID 123456789:

        $ gcloud resource-manager folders list --organization=123456789

    The following command lists folders under folder with ID 123456789:

        $ gcloud resource-manager folders list --folder=123456789

FLAGS
     --folder=FOLDER_ID
        ID for the folder to list folders under

     --organization=ORGANIZATION_ID
        ID for the organization to list folders under

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

        $ gcloud alpha resource-manager folders list

        $ gcloud beta resource-manager folders list
```

### gcloud resource-manager folders move

```text
NAME
    gcloud resource-manager folders move - move a folder to a new position
        within the same organization

SYNOPSIS
    gcloud resource-manager folders move FOLDER_ID [--async]
        [--folder=FOLDER_ID] [--organization=ORGANIZATION_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Move the given folder under a new parent folder or under the organization.
    Exactly one of --folder or --organization must be provided.

    This command can fail for the following reasons:
      o There is no folder with the given ID.
      o There is no parent with the given type and ID.
      o The new parent is not in the same organization of the given folder.
      o Permission missing for performing this move.

EXAMPLES
    The following command moves a folder with the ID 123456789 into a folder
    with the ID 2345:

        $ gcloud resource-manager folders move 123456789 --folder=2345

    The following command moves a folder with the ID 123456789 into an
    organization with ID 1234:

        $ gcloud resource-manager folders move 123456789 --organization=1234

POSITIONAL ARGUMENTS
     FOLDER_ID
        ID for the folder you want to move.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --folder=FOLDER_ID
        ID for the folder to use as a parent

     --organization=ORGANIZATION_ID
        ID for the organization to use as a parent

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager folders move

        $ gcloud beta resource-manager folders move
```

### gcloud resource-manager folders remove-iam-policy-binding

```text
NAME
    gcloud resource-manager folders remove-iam-policy-binding - remove IAM
        policy binding for a folder

SYNOPSIS
    gcloud resource-manager folders remove-iam-policy-binding FOLDER
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes a policy binding to the IAM policy of a folder, given a folder ID
    and the binding. One binding consists of a member, a role, and an optional
    condition.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' on the folder 'folder-id', run:

        $ gcloud resource-manager folders remove-iam-policy-binding \
            folder-id --member='user:test-user@gmail.com' \
            --role='roles/editor'

    To remove an IAM policy binding with a condition of
    expression='request.time < timestamp("2019-01-01T00:00:00Z")',
    title='expires_end_of_2018', and description='Expires at midnight on
    2018-12-31' for the role of 'roles/storage.objectAdmin' for the user
    'test-user@gmail.com' on the folder 'folder-id', run:

        $ gcloud resource-manager folders remove-iam-policy-binding \
            folder-id --member='user:test-user@gmail.com' \
            --role='roles/storage.objectAdmin' \
            --condition='expression=request.time <
         timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,descrip\
        tion=Expires at midnight on 2018-12-31'

    To remove all IAM policy bindings regardless of the condition for the role
    of 'roles/storage.objectAdmin' and for the user 'test-user@gmail.com' on
    the folder 'folder-id', run:

        $ gcloud resource-manager folders remove-iam-policy-binding \
            folder-id --member='user:test-user@gmail.com' \
            --role='roles/storage.objectAdmin' --all

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Folder resource - The ID of the folder to remove the IAM binding. This
     represents a Cloud resource.

     This must be specified.

       FOLDER
          ID of the folder or fully qualified identifier for the folder.

          To set the folder attribute:
          + provide the argument folder on the command line.

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
    This command uses the cloudresourcemanager/v2 API. The full documentation
    for this API can be found at: https://cloud.google.com/resource-manager

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager folders remove-iam-policy-binding

        $ gcloud beta resource-manager folders remove-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud resource-manager folders remove-iam-policy-binding folder-id \
    --member='user:test-user@gmail.com' \
    --role='roles/storage.objectAdmin' \
    --condition='expression=request.time < timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,description=Expires at midnight on 2018-12-31'
```

### gcloud resource-manager folders set-iam-policy

```text
NAME
    gcloud resource-manager folders set-iam-policy - set IAM policy for a
        folder

SYNOPSIS
    gcloud resource-manager folders set-iam-policy FOLDER_ID POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for a folder, given a folder ID and a file encoded in
    JSON or YAML that contains the IAM policy.

EXAMPLES
    The following command reads an IAM policy defined in a JSON file
    policy.json and sets it for a folder with the ID 3589215982:

        $ gcloud resource-manager folders set-iam-policy 3589215982 \
            policy.json

POSITIONAL ARGUMENTS
     FOLDER_ID
        ID for the folder whose policy you want to set.

     POLICY_FILE
        JSON or YAML file with the IAM policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager folders set-iam-policy

        $ gcloud beta resource-manager folders set-iam-policy
```

### gcloud resource-manager folders undelete

```text
NAME
    gcloud resource-manager folders undelete - undelete a folder

SYNOPSIS
    gcloud resource-manager folders undelete FOLDER_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Undeletes the folder with the given folder ID.

    This command can fail for the following reasons:
      o There is no folder with the given ID.
      o The active account does not have Owner or Editor permissions for the
        given folder.
      o When the folder to be undeleted has the same display name as an
        active folder under this folder's parent.

EXAMPLES
    The following command undeletes the folder with the ID 3589215982:

        $ gcloud resource-manager folders undelete 3589215982

POSITIONAL ARGUMENTS
     FOLDER_ID
        ID for the folder you want to undelete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager folders undelete

        $ gcloud beta resource-manager folders undelete
```

### gcloud resource-manager folders update

```text
NAME
    gcloud resource-manager folders update - update the display name of a
        folder

SYNOPSIS
    gcloud resource-manager folders update FOLDER_ID
        --display-name=DISPLAY_NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates the given folder with new folder name.

    This command can fail for the following reasons:
      o There is no folder with the given ID.
      o The active account does not have permission to update the given
        folder.
      o The new display name is taken by another folder under this folder's
        parent.

EXAMPLES
    The following command updates a folder with the ID 123456789 to have the
    name "Foo Bar and Grill":

        $ gcloud resource-manager folders update 123456789 \
            --display-name="Foo Bar and Grill"

POSITIONAL ARGUMENTS
     FOLDER_ID
        ID for the folder you want to update.

REQUIRED FLAGS
     --display-name=DISPLAY_NAME
        New display name for the folder (unique under the same parent).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager folders update

        $ gcloud beta resource-manager folders update
```

### gcloud beta resource-manager folders add-iam-policy-binding

```text
NAME
    gcloud beta resource-manager folders add-iam-policy-binding - add IAM
        policy binding for a folder

SYNOPSIS
    gcloud beta resource-manager folders add-iam-policy-binding FOLDER
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager folders create

```text
NAME
    gcloud beta resource-manager folders create - create a new folder

SYNOPSIS
    gcloud beta resource-manager folders create --display-name=DISPLAY_NAME
        [--async] [--folder=FOLDER_ID] [--organization=ORGANIZATION_ID]
        [--tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager folders delete

```text
NAME
    gcloud beta resource-manager folders delete - delete a folder

SYNOPSIS
    gcloud beta resource-manager folders delete FOLDER_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager folders describe

```text
NAME
    gcloud beta resource-manager folders describe - show metadata for a folder

SYNOPSIS
    gcloud beta resource-manager folders describe FOLDER_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager folders get-ancestors-iam-policy

```text
NAME
    gcloud beta resource-manager folders get-ancestors-iam-policy - get IAM
        policies for a folder and its ancestors

SYNOPSIS
    gcloud beta resource-manager folders get-ancestors-iam-policy FOLDER_ID
        [--include-deny] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager folders get-iam-policy

```text
NAME
    gcloud beta resource-manager folders get-iam-policy - get IAM policy for a
        folder

SYNOPSIS
    gcloud beta resource-manager folders get-iam-policy FOLDER_ID
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager folders list

```text
NAME
    gcloud beta resource-manager folders list - list folders accessible by the
        active account

SYNOPSIS
    gcloud beta resource-manager folders list [--folder=FOLDER_ID]
        [--organization=ORGANIZATION_ID] [--show-deleted] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager folders move

```text
NAME
    gcloud beta resource-manager folders move - move a folder to a new position
        within the same organization

SYNOPSIS
    gcloud beta resource-manager folders move FOLDER_ID [--async]
        [--folder=FOLDER_ID] [--organization=ORGANIZATION_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager folders remove-iam-policy-binding

```text
NAME
    gcloud beta resource-manager folders remove-iam-policy-binding - remove IAM
        policy binding for a folder

SYNOPSIS
    gcloud beta resource-manager folders remove-iam-policy-binding FOLDER
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager folders set-iam-policy

```text
NAME
    gcloud beta resource-manager folders set-iam-policy - set IAM policy for a
        folder

SYNOPSIS
    gcloud beta resource-manager folders set-iam-policy FOLDER_ID POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager folders undelete

```text
NAME
    gcloud beta resource-manager folders undelete - undelete a folder

SYNOPSIS
    gcloud beta resource-manager folders undelete FOLDER_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager folders update

```text
NAME
    gcloud beta resource-manager folders update - update the display name of a
        folder

SYNOPSIS
    gcloud beta resource-manager folders update FOLDER_ID
        --display-name=DISPLAY_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager folders add-iam-policy-binding

```text
NAME
    gcloud alpha resource-manager folders add-iam-policy-binding - add IAM
        policy binding for a folder

SYNOPSIS
    gcloud alpha resource-manager folders add-iam-policy-binding FOLDER
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager folders create

```text
NAME
    gcloud alpha resource-manager folders create - create a new folder

SYNOPSIS
    gcloud alpha resource-manager folders create --display-name=DISPLAY_NAME
        [--async] [--folder=FOLDER_ID] [--organization=ORGANIZATION_ID]
        [--tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager folders delete

```text
NAME
    gcloud alpha resource-manager folders delete - delete a folder

SYNOPSIS
    gcloud alpha resource-manager folders delete FOLDER_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager folders describe

```text
NAME
    gcloud alpha resource-manager folders describe - show metadata for a folder

SYNOPSIS
    gcloud alpha resource-manager folders describe FOLDER_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager folders get-ancestors-iam-policy

```text
NAME
    gcloud alpha resource-manager folders get-ancestors-iam-policy - get IAM
        policies for a folder and its ancestors

SYNOPSIS
    gcloud alpha resource-manager folders get-ancestors-iam-policy FOLDER_ID
        [--include-deny] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager folders get-iam-policy

```text
NAME
    gcloud alpha resource-manager folders get-iam-policy - get the IAM policy
        for a folder

SYNOPSIS
    gcloud alpha resource-manager folders get-iam-policy FOLDER
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager folders list

```text
NAME
    gcloud alpha resource-manager folders list - list folders accessible by the
        active account

SYNOPSIS
    gcloud alpha resource-manager folders list [--folder=FOLDER_ID]
        [--organization=ORGANIZATION_ID] [--show-deleted] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager folders move

```text
NAME
    gcloud alpha resource-manager folders move - move a folder to a new
        position within the same organization

SYNOPSIS
    gcloud alpha resource-manager folders move FOLDER_ID [--async]
        [--folder=FOLDER_ID] [--organization=ORGANIZATION_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager folders remove-iam-policy-binding

```text
NAME
    gcloud alpha resource-manager folders remove-iam-policy-binding - remove
        IAM policy binding for a folder

SYNOPSIS
    gcloud alpha resource-manager folders remove-iam-policy-binding FOLDER
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager folders search

```text
NAME
    gcloud alpha resource-manager folders search - search folders matching the
        specified query

SYNOPSIS
    gcloud alpha resource-manager folders search [--query=QUERY]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager folders set-iam-policy

```text
NAME
    gcloud alpha resource-manager folders set-iam-policy - set IAM policy for a
        folder

SYNOPSIS
    gcloud alpha resource-manager folders set-iam-policy FOLDER_ID POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager folders undelete

```text
NAME
    gcloud alpha resource-manager folders undelete - undelete a folder

SYNOPSIS
    gcloud alpha resource-manager folders undelete FOLDER_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager folders update

```text
NAME
    gcloud alpha resource-manager folders update - update the display name of a
        folder

SYNOPSIS
    gcloud alpha resource-manager folders update FOLDER_ID
        --display-name=DISPLAY_NAME [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/folders (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
