---
source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/views
---

# gcloud logging views

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud logging views add-iam-policy-binding

```text
NAME
    gcloud logging views add-iam-policy-binding - add IAM policy binding to a
        log view

SYNOPSIS
    gcloud logging views add-iam-policy-binding VIEW_ID --bucket=BUCKET
        --location=LOCATION --member=PRINCIPAL --role=ROLE
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add IAM policy binding to a log view.

EXAMPLES
    To add an IAM policy binding for the role 'roles/my-role' for the user
    'my-user@gmail.com' on my-view, run:

        $ gcloud logging views add-iam-policy-binding my-view \
            --member='user:my-user@gmail.com' --role='roles/my-role' \
            --bucket=my-bucket --location=global

    To add a binding with a condition, run:

        $ gcloud logging views add-iam-policy-binding my-view \
            --member='user:my-user@gmail.com' --role='roles/my-role' \
            --bucket=my-bucket --location=global \
            --condition=expression=[expression],title=[title],\
        description=[description]

    See https://cloud.google.com/iam/docs/managing-policies for details about
    IAM policies and member types.

POSITIONAL ARGUMENTS
     VIEW_ID
        ID of the view that contains the IAM policy.

REQUIRED FLAGS
     --bucket=BUCKET
        ID of the bucket that contains the view.

     --location=LOCATION
        Location of the bucket that contains the view.

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

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the view that contains the IAM policy.

       --folder=FOLDER_ID
          Folder of the view that contains the IAM policy.

       --organization=ORGANIZATION_ID
          Organization of the view that contains the IAM policy.

       --project=PROJECT_ID
          Project of the view that contains the IAM policy.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

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
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud logging views add-iam-policy-binding my-view \
    --member='user:my-user@gmail.com' \
    --role='roles/my-role' \
    --bucket=my-bucket \
    --location=global \
    --condition=expression=[expression],title=[title],description=[description]
```

### gcloud logging views create

```text
NAME
    gcloud logging views create - create a log view on a log bucket

SYNOPSIS
    gcloud logging views create VIEW_ID --bucket=BUCKET --location=LOCATION
        [--description=DESCRIPTION] [--log-filter=LOG_FILTER]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To create a view that matches all Google Compute Engine logs in a bucket,
    run:

        $ gcloud logging views create my-view --bucket=my-bucket \
            --location=global --log-filter='resource.type="gce_instance"'

POSITIONAL ARGUMENTS
     VIEW_ID
        ID of the view to create.

REQUIRED FLAGS
     --bucket=BUCKET
        ID of the bucket that will hold the view

     --location=LOCATION
        Location of the bucket that will hold the view.

OPTIONAL FLAGS
     --description=DESCRIPTION
        A textual description for the view.

     --log-filter=LOG_FILTER
        A filter for the view.

     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the view to create.

       --folder=FOLDER_ID
          Folder of the view to create.

       --organization=ORGANIZATION_ID
          Organization of the view to create.

       --project=PROJECT_ID
          Project of the view to create.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging views create

        $ gcloud beta logging views create
```

### gcloud logging views delete

```text
NAME
    gcloud logging views delete - delete a view

SYNOPSIS
    gcloud logging views delete VIEW_ID --bucket=BUCKET --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a view on a bucket.

EXAMPLES
    To delete a view on a bucket, run:

        $ gcloud logging views delete my-view --bucket=my-bucket \
           --location=global

POSITIONAL ARGUMENTS
     VIEW_ID
        ID of the view to delete.

REQUIRED FLAGS
     --bucket=BUCKET
        ID of bucket

     --location=LOCATION
        Location of the bucket.

OPTIONAL FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the view to delete.

       --folder=FOLDER_ID
          Folder of the view to delete.

       --organization=ORGANIZATION_ID
          Organization of the view to delete.

       --project=PROJECT_ID
          Project of the view to delete.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging views delete

        $ gcloud beta logging views delete
```

### gcloud logging views describe

```text
NAME
    gcloud logging views describe - display information about a view

SYNOPSIS
    gcloud logging views describe VIEW_ID --bucket=BUCKET --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays information about a log view.

EXAMPLES
    To describe a view in a project, run:

        $ gcloud logging views describe my-view --bucket=my-bucket \
           --location=global

POSITIONAL ARGUMENTS
     VIEW_ID
        Id of the view to describe.

REQUIRED FLAGS
     --bucket=BUCKET
        ID of bucket

     --location=LOCATION
        Location of the bucket.

OPTIONAL FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the view to describe.

       --folder=FOLDER_ID
          Folder of the view to describe.

       --organization=ORGANIZATION_ID
          Organization of the view to describe.

       --project=PROJECT_ID
          Project of the view to describe.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging views describe

        $ gcloud beta logging views describe
```

### gcloud logging views get-iam-policy

```text
NAME
    gcloud logging views get-iam-policy - display the IAM policy for a view

SYNOPSIS
    gcloud logging views get-iam-policy VIEW_ID --bucket=BUCKET
        --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the IAM policy for a view.

EXAMPLES
    To describe a view in a project, run:

        $ gcloud logging views get-iam-policy my-view --bucket=my-bucket \
           --location=global

POSITIONAL ARGUMENTS
     VIEW_ID
        ID of the view to fetch IAM policy

REQUIRED FLAGS
     --bucket=BUCKET
        ID of the bucket that holds the view.

     --location=LOCATION
        Location of the bucket that contains the view

OPTIONAL FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the view to fetch IAM policy.

       --folder=FOLDER_ID
          Folder of the view to fetch IAM policy.

       --organization=ORGANIZATION_ID
          Organization of the view to fetch IAM policy.

       --project=PROJECT_ID
          Project of the view to fetch IAM policy.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud logging views list

```text
NAME
    gcloud logging views list - list the defined views

SYNOPSIS
    gcloud logging views list --bucket=BUCKET --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists the views defined on a bucket.

EXAMPLES
    To list the views defined on a bucket, run:

        $ gcloud logging views list

REQUIRED FLAGS
     --bucket=BUCKET
        ID of bucket

     --location=LOCATION
        Location of the specified bucket

FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the views to list.

       --folder=FOLDER_ID
          Folder of the views to list.

       --organization=ORGANIZATION_ID
          Organization of the views to list.

       --project=PROJECT_ID
          Project of the views to list.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

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

        $ gcloud alpha logging views list

        $ gcloud beta logging views list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud logging views list \
    --bucket=my-bucket \
    --location=global
```

### gcloud logging views remove-iam-policy-binding

```text
NAME
    gcloud logging views remove-iam-policy-binding - remove IAM policy binding
        to a log view

SYNOPSIS
    gcloud logging views remove-iam-policy-binding VIEW_ID --bucket=BUCKET
        --location=LOCATION --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove IAM policy binding to a log view.

EXAMPLES
    To remove an IAM policy binding for the role 'roles/my-role' for the user
    'my-user@gmail.com' on my-view, run:

        $ gcloud logging views remove-iam-policy-binding my-view \
            --member='user:my-user@gmail.com' --role='roles/my-role' \
            --bucket=my-bucket --location=global

    To remove a binding with a condition, run:

        $ gcloud logging views remove-iam-policy-binding my-view \
            --member='user:my-user@gmail.com' --role='roles/my-role' \
            --bucket=my-bucket --location=global \
            --condition=expression=[expression],title=[title],\
        description=[description]

    See https://cloud.google.com/iam/docs/managing-policies for details about
    IAM policies and member types.

POSITIONAL ARGUMENTS
     VIEW_ID
        ID of the view that contains the IAM policy.

REQUIRED FLAGS
     --bucket=BUCKET
        ID of the bucket that contains the view.

     --location=LOCATION
        Location of the bucket that contains the view.

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

     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the view that contains the IAM policy.

       --folder=FOLDER_ID
          Folder of the view that contains the IAM policy.

       --organization=ORGANIZATION_ID
          Organization of the view that contains the IAM policy.

       --project=PROJECT_ID
          Project of the view that contains the IAM policy.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud logging views remove-iam-policy-binding my-view \
    --member='user:my-user@gmail.com' \
    --role='roles/my-role' \
    --bucket=my-bucket \
    --location=global \
    --condition=expression=[expression],title=[title],description=[description]
```

### gcloud logging views set-iam-policy

```text
NAME
    gcloud logging views set-iam-policy - set IAM policy for a view

SYNOPSIS
    gcloud logging views set-iam-policy VIEW_ID POLICY_FILE --bucket=BUCKET
        --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set an IAM policy for a view.

EXAMPLES
    To set the IAM policy using a json file 'my_policy.json' for the view
    my-view in my-bucket in the global location, run:

        $ gcloud logging views set-iam-policy my-view \
            /path/to/my_policy.json --bucket=my-bucket --location=global

POSITIONAL ARGUMENTS
     VIEW_ID
        ID of the view to set IAM policy.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

REQUIRED FLAGS
     --bucket=BUCKET
        ID of the bucket that contains the view.

     --location=LOCATION
        Location of the bucket that contains the view.

OPTIONAL FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the view to set IAM policy.

       --folder=FOLDER_ID
          Folder of the view to set IAM policy.

       --organization=ORGANIZATION_ID
          Organization of the view to set IAM policy.

       --project=PROJECT_ID
          Project of the view to set IAM policy.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud logging views update

```text
NAME
    gcloud logging views update - update a view

SYNOPSIS
    gcloud logging views update VIEW_ID --bucket=BUCKET --location=LOCATION
        [--description=DESCRIPTION] [--log-filter=LOG_FILTER]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates the properties of a view.

EXAMPLES
    To update a view in your project, run:

        $ gcloud logging views update my-view --bucket=my-bucket \
           --location=global --description=my-new-description

POSITIONAL ARGUMENTS
     VIEW_ID
        Id of the view to update.

REQUIRED FLAGS
     --bucket=BUCKET
        ID of the bucket that holds the view

     --location=LOCATION
        Location of the bucket that contains the view.

OPTIONAL FLAGS
     --description=DESCRIPTION
        New description for the view.

     --log-filter=LOG_FILTER
        New filter for the view.

     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the view to update.

       --folder=FOLDER_ID
          Folder of the view to update.

       --organization=ORGANIZATION_ID
          Organization of the view to update.

       --project=PROJECT_ID
          Project of the view to update.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging views update

        $ gcloud beta logging views update
```

### gcloud beta logging views create

```text
NAME
    gcloud beta logging views create - create a log view on a log bucket

SYNOPSIS
    gcloud beta logging views create VIEW_ID --bucket=BUCKET
        --location=LOCATION [--description=DESCRIPTION]
        [--log-filter=LOG_FILTER]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging views delete

```text
NAME
    gcloud beta logging views delete - delete a view

SYNOPSIS
    gcloud beta logging views delete VIEW_ID --bucket=BUCKET
        --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging views describe

```text
NAME
    gcloud beta logging views describe - display information about a view

SYNOPSIS
    gcloud beta logging views describe VIEW_ID --bucket=BUCKET
        --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging views list

```text
NAME
    gcloud beta logging views list - list the defined views

SYNOPSIS
    gcloud beta logging views list --bucket=BUCKET --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging views update

```text
NAME
    gcloud beta logging views update - update a view

SYNOPSIS
    gcloud beta logging views update VIEW_ID --bucket=BUCKET
        --location=LOCATION [--description=DESCRIPTION]
        [--log-filter=LOG_FILTER]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging views create

```text
NAME
    gcloud alpha logging views create - create a log view on a log bucket

SYNOPSIS
    gcloud alpha logging views create VIEW_ID --bucket=BUCKET
        --location=LOCATION [--description=DESCRIPTION]
        [--log-filter=LOG_FILTER]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging views delete

```text
NAME
    gcloud alpha logging views delete - delete a view

SYNOPSIS
    gcloud alpha logging views delete VIEW_ID --bucket=BUCKET
        --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging views describe

```text
NAME
    gcloud alpha logging views describe - display information about a view

SYNOPSIS
    gcloud alpha logging views describe VIEW_ID --bucket=BUCKET
        --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging views list

```text
NAME
    gcloud alpha logging views list - list the defined views

SYNOPSIS
    gcloud alpha logging views list --bucket=BUCKET --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging views update

```text
NAME
    gcloud alpha logging views update - update a view

SYNOPSIS
    gcloud alpha logging views update VIEW_ID --bucket=BUCKET
        --location=LOCATION [--description=DESCRIPTION]
        [--log-filter=LOG_FILTER]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` example omits `--bucket` and `--location`, which the SYNOPSIS requires (`gcloud logging views list --bucket=BUCKET --location=LOCATION`; gcloud 593.0.0: "argument --bucket --location: Must be specified"); the runnable form adds `--bucket=my-bucket --location=global`, the bucket and location of the other examples on this page.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/views (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
