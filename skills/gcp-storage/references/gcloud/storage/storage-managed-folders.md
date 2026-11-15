---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/managed-folders
---

# gcloud storage managed-folders

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage managed-folders add-iam-policy-binding

```text
NAME
    gcloud storage managed-folders add-iam-policy-binding - add an IAM policy
        binding to a managed folder

SYNOPSIS
    gcloud storage managed-folders add-iam-policy-binding URL
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to a managed folder. For more information, see
    Cloud Identity and Access Management
    (https://cloud.google.com/storage/docs/access-control/iam).

EXAMPLES
    To grant a single role to a single principal for a managed folder
    managed-folder in a bucket bucket:

        $ gcloud storage managed-folders add-iam-policy-binding \
            gs://bucket/managed-folder --member=user:john.doe@example.com \
            --role=roles/storage.objectCreator

    To make objects in gs://bucket/managed-folder publicly readable:

        $ gcloud storage managed-folders add-iam-policy-binding \
            gs://bucket/managed-folder --member=allUsers \
            --role=roles/storage.objectViewer

    To specify a custom role for a principal on gs://bucket/managed-folder:

        $ gcloud storage managed-folders add-iam-policy-binding \
            gs://bucket/managed-folder --member=user:john.doe@example.com \
            --role=roles/customRoleName

POSITIONAL ARGUMENTS
     URL
        URL of the managed folder to add IAM policy binding to.

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
    This variant is also available:

        $ gcloud alpha storage managed-folders add-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud storage managed-folders add-iam-policy-binding gs://bucket/managed-folder \
    --member=user:john.doe@example.com \
    --role=projects/my-project/roles/customRoleName
```

### gcloud storage managed-folders create

```text
NAME
    gcloud storage managed-folders create - create managed folders

SYNOPSIS
    gcloud storage managed-folders create URL [URL ...]
        [--additional-headers=HEADER=VALUE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create managed folders.

EXAMPLES
    The following command creates a managed folder called folder/ in a bucket
    named my-bucket:

        $ gcloud storage managed-folders create gs://my-bucket/folder/

POSITIONAL ARGUMENTS
     URL [URL ...]
        The URLs of the folders to create.

FLAGS
     --additional-headers=HEADER=VALUE
        Includes arbitrary headers in storage API calls. Accepts a comma
        separated list of key=value pairs, e.g. header1=value1,header2=value2.
        Overrides the default storage/additional_headers property value for
        this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage managed-folders create
```

### gcloud storage managed-folders delete

```text
NAME
    gcloud storage managed-folders delete - delete managed folders

SYNOPSIS
    gcloud storage managed-folders delete URL [URL ...]
        [--additional-headers=HEADER=VALUE] [--continue-on-error, -c]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete managed folders.

EXAMPLES
    The following command deletes a managed folder named folder in a bucket
    called my-bucket:

        $ gcloud storage managed-folders delete gs://my-bucket/folder/

POSITIONAL ARGUMENTS
     URL [URL ...]
        The URLs of the managed folders to delete.

FLAGS
     --additional-headers=HEADER=VALUE
        Includes arbitrary headers in storage API calls. Accepts a comma
        separated list of key=value pairs, e.g. header1=value1,header2=value2.
        Overrides the default storage/additional_headers property value for
        this command invocation.

     --continue-on-error, -c
        If any operations are unsuccessful, the command will exit with a
        non-zero exit status after completing the remaining operations. This
        flag takes effect only in sequential execution mode (i.e. processor and
        thread count are set to 1). Parallelism is default.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage managed-folders delete
```

### gcloud storage managed-folders describe

```text
NAME
    gcloud storage managed-folders describe - describe managed folders

SYNOPSIS
    gcloud storage managed-folders describe URL
        [--additional-headers=HEADER=VALUE] [--raw] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe managed folders.

EXAMPLES
    The following command shows information about a managed folder named folder
    in a bucket called my-bucket:

        $ gcloud storage managed-folders describe gs://my-bucket/folder/

POSITIONAL ARGUMENTS
     URL
        The URL of the managed folder to describe.

FLAGS
     --additional-headers=HEADER=VALUE
        Includes arbitrary headers in storage API calls. Accepts a comma
        separated list of key=value pairs, e.g. header1=value1,header2=value2.
        Overrides the default storage/additional_headers property value for
        this command invocation.

     --raw
        Shows metadata in the format returned by the API instead of
        standardizing it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage managed-folders describe
```

### gcloud storage managed-folders get-iam-policy

```text
NAME
    gcloud storage managed-folders get-iam-policy - get the IAM policy for a
        managed folder

SYNOPSIS
    gcloud storage managed-folders get-iam-policy URL [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the IAM policy for a managed folder. For more information, see Cloud
    Identity and Access Management
    (https://cloud.google.com/storage/docs/access-control/iam).

EXAMPLES
    To get the IAM policy for a managed folder managed-folder in a bucket
    bucket:

        $ gcloud storage managed-folders get-iam-policy \
            gs://bucket/managed-folder/

    To output the IAM policy for gs://bucket/managed-folder to a file:

        $ gcloud storage managed-folders get-iam-policy \
            gs://bucket/managed-folder/ > policy.txt

POSITIONAL ARGUMENTS
     URL
        URL of the managed folder to get the IAM policy of.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage managed-folders get-iam-policy
```

### gcloud storage managed-folders list

```text
NAME
    gcloud storage managed-folders list - list managed folders

SYNOPSIS
    gcloud storage managed-folders list URL [URL ...]
        [--additional-headers=HEADER=VALUE] [--raw] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List managed folders.

EXAMPLES
    The following command lists all managed folders in a bucket:

        $ gcloud storage managed-folders list gs://my-bucket/

POSITIONAL ARGUMENTS
     URL [URL ...]
        The URLs of the resources to list.

FLAGS
     --additional-headers=HEADER=VALUE
        Includes arbitrary headers in storage API calls. Accepts a comma
        separated list of key=value pairs, e.g. header1=value1,header2=value2.
        Overrides the default storage/additional_headers property value for
        this command invocation.

     --raw
        Shows metadata in the format returned by the API instead of
        standardizing it.

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
    This variant is also available:

        $ gcloud alpha storage managed-folders list
```

### gcloud storage managed-folders remove-iam-policy-binding

```text
NAME
    gcloud storage managed-folders remove-iam-policy-binding - remove an IAM
        policy binding from a managed folder

SYNOPSIS
    gcloud storage managed-folders remove-iam-policy-binding URL
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove a policy binding from the IAM policy of a managed folder, given a
    managed folder URL and the binding. For more information, see Cloud
    Identity and Access Management
    (https://cloud.google.com/storage/docs/access-control/iam).

EXAMPLES
    To remove an IAM policy binding from the role of
    roles/storage.objectCreator for the user john.doe@example.com on a managed
    folder managed-folder in a bucket bucket:

        $ gcloud storage managed-folders remove-iam-policy-binding \
            gs://bucket/managed-folder --member=user:john.doe@example.com \
            --role=roles/storage.objectCreator

POSITIONAL ARGUMENTS
     URL
        URL of managed folder to remove IAM policy binding from.

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
    This variant is also available:

        $ gcloud alpha storage managed-folders remove-iam-policy-binding
```

### gcloud storage managed-folders set-iam-policy

```text
NAME
    gcloud storage managed-folders set-iam-policy - set the IAM policy for a
        managed folder

SYNOPSIS
    gcloud storage managed-folders set-iam-policy URLS [URLS ...] POLICY_FILE
        [--continue-on-error, -c] [--etag=ETAG, -e ETAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set the IAM policy for a managed folder. For more information, see Cloud
    Identity and Access Management
    (https://cloud.google.com/storage/docs/access-control/iam).

EXAMPLES
    To set the IAM policy in POLICY-FILE on a managed folder managed-folder in
    a bucket bucket:

        $ gcloud storage managed-folders set-iam-policy \
            gs://bucket/managed-folder POLICY-FILE

POSITIONAL ARGUMENTS
     URLS [URLS ...]
        URLs for managed folders to apply the IAM policy to.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

FLAGS
     --continue-on-error, -c
        If any operations are unsuccessful, the command will exit with a
        non-zero exit status after completing the remaining operations. This
        flag takes effect only in sequential execution mode (i.e. processor and
        thread count are set to 1). Parallelism is default.

     --etag=ETAG, -e ETAG
        Custom etag to set on IAM policy. API will reject etags that do not
        match this value, making it useful as a precondition during concurrent
        operations.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage managed-folders set-iam-policy
```

### gcloud alpha storage managed-folders add-iam-policy-binding

```text
NAME
    gcloud alpha storage managed-folders add-iam-policy-binding - add an IAM
        policy binding to a managed folder

SYNOPSIS
    gcloud alpha storage managed-folders add-iam-policy-binding URL
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage managed-folders create

```text
NAME
    gcloud alpha storage managed-folders create - create managed folders

SYNOPSIS
    gcloud alpha storage managed-folders create URL [URL ...]
        [--additional-headers=HEADER=VALUE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage managed-folders delete

```text
NAME
    gcloud alpha storage managed-folders delete - delete managed folders

SYNOPSIS
    gcloud alpha storage managed-folders delete URL [URL ...]
        [--additional-headers=HEADER=VALUE] [--continue-on-error, -c]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage managed-folders describe

```text
NAME
    gcloud alpha storage managed-folders describe - describe managed folders

SYNOPSIS
    gcloud alpha storage managed-folders describe URL
        [--additional-headers=HEADER=VALUE] [--raw] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage managed-folders get-iam-policy

```text
NAME
    gcloud alpha storage managed-folders get-iam-policy - get the IAM policy
        for a managed folder

SYNOPSIS
    gcloud alpha storage managed-folders get-iam-policy URL
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage managed-folders list

```text
NAME
    gcloud alpha storage managed-folders list - list managed folders

SYNOPSIS
    gcloud alpha storage managed-folders list URL [URL ...]
        [--additional-headers=HEADER=VALUE] [--raw] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage managed-folders remove-iam-policy-binding

```text
NAME
    gcloud alpha storage managed-folders remove-iam-policy-binding - remove an
        IAM policy binding from a managed folder

SYNOPSIS
    gcloud alpha storage managed-folders remove-iam-policy-binding URL
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage managed-folders set-iam-policy

```text
NAME
    gcloud alpha storage managed-folders set-iam-policy - set the IAM policy
        for a managed folder

SYNOPSIS
    gcloud alpha storage managed-folders set-iam-policy URLS [URLS ...]
        POLICY_FILE [--continue-on-error, -c] [--etag=ETAG, -e ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the custom-role example passes `--role=roles/customRoleName`; the `roles/` prefix names predefined roles, and a custom role is addressed by its full name (`projects/PROJECT_ID/roles/ROLE_ID` or `organizations/ORGANIZATION_ID/roles/ROLE_ID`), so the runnable form uses `projects/my-project/roles/customRoleName`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/managed-folders (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
