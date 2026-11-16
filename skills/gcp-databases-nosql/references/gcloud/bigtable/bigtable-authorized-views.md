---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/authorized-views
---

# gcloud bigtable authorized-views

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bigtable authorized-views add-iam-policy-binding

```text
NAME
    gcloud bigtable authorized-views add-iam-policy-binding - add an IAM policy
        binding to a Cloud Bigtable authorized view

SYNOPSIS
    gcloud bigtable authorized-views add-iam-policy-binding
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE)
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to a Cloud Bigtable authorized view. One binding
    consists of a member, a role, and an optional condition.

EXAMPLES
    To add an IAM policy binding for the role of roles/editor for the user
    test-user@gmail.com with authorized view my-authorized-view in instance
    my-instance and table my-table, run:

        $ gcloud bigtable authorized-views add-iam-policy-binding \
            my-authorized-view --instance=`my-instance` --table=`my-table` \
            --member=`user:test-user@gmail.com` --role=`roles/editor`

    To add an IAM policy binding which expires at the end of the year 2020 for
    the role of roles/bigtable.admin and the user test-user@gmail.com with
    authorized view my-authorized-view in instance my-instance and table
    my-table, run:

        $ gcloud bigtable authorized-views add-iam-policy-binding \
            my-authorized-view --instance=`my-instance` --table=`my-table` \
            --member=`user:test-user@gmail.com` \
            --role=`roles/bigtable.admin` \
            --condition=`expression=request.time < \
            timestamp("2021-01-01T00:00:00Z"),title=expires_end_of_2020,\
        description=Expires at midnight on 2020-12-31`

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Authorized view resource - Cloud Bigtable authorized view to add the IAM
     policy binding to. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument authorized_view on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTHORIZED_VIEW
          ID of the authorized-view or fully qualified identifier for the
          authorized-view.

          To set the authorized_view attribute:
          + provide the argument authorized_view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument authorized_view on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

       --table=TABLE
          Name of the Bigtable table.

          To set the table attribute:
          + provide the argument authorized_view on the command line with a
            fully specified name;
          + provide the argument --table on the command line.

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
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable authorized-views add-iam-policy-binding

        $ gcloud beta bigtable authorized-views add-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud bigtable authorized-views add-iam-policy-binding my-authorized-view \
    --instance='my-instance' \
    --table='my-table' \
    --member='user:test-user@gmail.com' \
    --role='roles/editor'

gcloud bigtable authorized-views add-iam-policy-binding my-authorized-view \
    --instance='my-instance' \
    --table='my-table' \
    --member='user:test-user@gmail.com' \
    --role='roles/bigtable.admin' \
    --condition='expression=request.time < timestamp("2021-01-01T00:00:00Z"),title=expires_end_of_2020,description=Expires at midnight on 2020-12-31'
```

### gcloud bigtable authorized-views create

```text
NAME
    gcloud bigtable authorized-views create - create a new Cloud Bigtable
        authorized view

SYNOPSIS
    gcloud bigtable authorized-views create
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE) [--async]
        [--definition-file=DEFINITION_FILE] [--pre-encoded]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Cloud Bigtable authorized view.

EXAMPLES
    To create an authorized view my-authorized-view in instance my-instance and
    table my-table, using the definition file authorized_view.json:

        $ gcloud bigtable authorized-views create my-authorized-view \
            --instance=test-instance --table=test-table \
            --definition-file=authorized_view.json

    To create an authorized view my-authorized-view in instance my-instance and
    table my-table, using the pre-encoded definition file
    authorized_view_pre_encoded.json:

        $ gcloud bigtable authorized-views create my-authorized-view \
            --instance=test-instance --table=test-table \
            --definition-file=authorized_view_pre_encoded.json --pre-encoded

POSITIONAL ARGUMENTS
     Authorized view resource - Cloud Bigtable authorized view to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument authorized_view on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTHORIZED_VIEW
          ID of the authorized-view or fully qualified identifier for the
          authorized-view.

          To set the authorized_view attribute:
          + provide the argument authorized_view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument authorized_view on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

       --table=TABLE
          Name of the Bigtable table.

          To set the table attribute:
          + provide the argument authorized_view on the command line with a
            fully specified name;
          + provide the argument --table on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --definition-file=DEFINITION_FILE
        Path to a JSON or YAML file containing a valid authorized view
        protobuf.

        The name field is ignored. The name is deduced from the other command
        line arguments.

        Example: { "subsetView": { "rowPrefixes": ["store1#"], "familySubsets":
        { "column_family_name": { "qualifiers":["address"],
        "qualifierPrefixes":["tel"] } } }, "deletionProtection": true }

     --pre-encoded
        By default, Base64 encoding is applied to all binary fields
        ("rowPrefixes", "qualifiers" and "qualifierPrefixes") in the JSON or
        YAML definition file.

        Use this to indicate that all binary fields are already Base64-encoded
        and should be used directly.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable authorized-views create

        $ gcloud beta bigtable authorized-views create
```

### gcloud bigtable authorized-views delete

```text
NAME
    gcloud bigtable authorized-views delete - delete a Cloud Bigtable
        authorized view

SYNOPSIS
    gcloud bigtable authorized-views delete
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete new Cloud Bigtable authorized view.

EXAMPLES
    To delete the authorized view my-authorized-view in instance my-instance
    and table my-table:

        $ gcloud bigtable authorized-views delete my-authorized-view \
            --instance=test-instance --table=test-table

POSITIONAL ARGUMENTS
     Authorized view resource - Cloud Bigtable authorized view to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument authorized_view on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTHORIZED_VIEW
          ID of the authorized-view or fully qualified identifier for the
          authorized-view.

          To set the authorized_view attribute:
          + provide the argument authorized_view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument authorized_view on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

       --table=TABLE
          Name of the Bigtable table.

          To set the table attribute:
          + provide the argument authorized_view on the command line with a
            fully specified name;
          + provide the argument --table on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable authorized-views delete

        $ gcloud beta bigtable authorized-views delete
```

### gcloud bigtable authorized-views describe

```text
NAME
    gcloud bigtable authorized-views describe - describe a Cloud Bigtable
        authorized view

SYNOPSIS
    gcloud bigtable authorized-views describe
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Bigtable authorized view.

EXAMPLES
    To describe the authorized view my-authorized-view in instance my-instance
    and table my-table:

        $ gcloud bigtable authorized-views describe my-authorized-view \
            --instance=test-instance --table=test-table

POSITIONAL ARGUMENTS
     Authorized view resource - Cloud Bigtable authorized view to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument authorized_view on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTHORIZED_VIEW
          ID of the authorized-view or fully qualified identifier for the
          authorized-view.

          To set the authorized_view attribute:
          + provide the argument authorized_view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument authorized_view on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

       --table=TABLE
          Name of the Bigtable table.

          To set the table attribute:
          + provide the argument authorized_view on the command line with a
            fully specified name;
          + provide the argument --table on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable authorized-views describe

        $ gcloud beta bigtable authorized-views describe
```

### gcloud bigtable authorized-views get-iam-policy

```text
NAME
    gcloud bigtable authorized-views get-iam-policy - get an IAM policy on a
        Cloud Bigtable authorized view

SYNOPSIS
    gcloud bigtable authorized-views get-iam-policy
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get an IAM policy on a Cloud Bigtable authorized view.

EXAMPLES
    To get the IAM policy on the authorized view my-authorized-view in instance
    my-instance and table my-table, run:

        $ gcloud bigtable authorized-views get-iam-policy \
            my-authorized-view --instance=`my-instance` --table=`my-table`

    See https://cloud.google.com/iam/docs/managing-policies for more
    information.

POSITIONAL ARGUMENTS
     Authorized view resource - Cloud Bigtable authorized view to get the IAM
     policy for. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument authorized_view on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTHORIZED_VIEW
          ID of the authorized-view or fully qualified identifier for the
          authorized-view.

          To set the authorized_view attribute:
          + provide the argument authorized_view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument authorized_view on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

       --table=TABLE
          Name of the Bigtable table.

          To set the table attribute:
          + provide the argument authorized_view on the command line with a
            fully specified name;
          + provide the argument --table on the command line.

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
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable authorized-views get-iam-policy

        $ gcloud beta bigtable authorized-views get-iam-policy
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud bigtable authorized-views get-iam-policy my-authorized-view \
    --instance='my-instance' \
    --table='my-table'
```

### gcloud bigtable authorized-views list

```text
NAME
    gcloud bigtable authorized-views list - list all authorized views of a
        Cloud Bigtable table

SYNOPSIS
    gcloud bigtable authorized-views list (--table=TABLE : --instance=INSTANCE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all authorized views of a Cloud Bigtable table.

EXAMPLES
    To list the authorized views in instance my-instance and table my-table:

        $ gcloud bigtable authorized-views list --instance=test-instance \
            --table=test-table

REQUIRED FLAGS
     Table resource - Cloud Bigtable table for which to list all authorized
     views. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --table on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --table=TABLE
          ID of the table or fully qualified identifier for the table.

          To set the table attribute:
          + provide the argument --table on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument --table on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

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
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable authorized-views list

        $ gcloud beta bigtable authorized-views list
```

### gcloud bigtable authorized-views remove-iam-policy-binding

```text
NAME
    gcloud bigtable authorized-views remove-iam-policy-binding - remove an IAM
        policy binding from a Cloud Bigtable authorized view

SYNOPSIS
    gcloud bigtable authorized-views remove-iam-policy-binding
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE)
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding from a Cloud Bigtable authorized view. One
    binding consists of a member, a role, and an optional condition.

EXAMPLES
    To remove an IAM policy binding for the role of roles/editor for the user
    test-user@gmail.com with authorized view my-authorized-view in instance
    my-instance and table my-table, run:

        $ gcloud bigtable authorized-views remove-iam-policy-binding \
            my-authorized-view --instance=`my-instance` --table=`my-table` \
            --member=`user:test-user@gmail.com` --role=`roles/editor`

    To remove an IAM policy binding which expires at the end of the year 2020
    for the role of roles/bigtable.admin and the user test-user@gmail.com with
    authorized view my-authorized-view in instance my-instance and cluster
    my-cluster, run:

        $ gcloud bigtable authorized-views remove-iam-policy-binding \
            my-authorized-view --instance=`my-instance` --table=`my-table` \
            --member=`user:test-user@gmail.com` \
            --role=`roles/bigtable.admin` \
            --condition=`expression=request.time < \
            timestamp("2021-01-01T00:00:00Z"),title=expires_end_of_2020,\
        description=Expires at midnight on 2020-12-31`

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Authorized view resource - Cloud Bigtable authorized view to remove the
     IAM policy binding from. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument authorized_view on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTHORIZED_VIEW
          ID of the authorized-view or fully qualified identifier for the
          authorized-view.

          To set the authorized_view attribute:
          + provide the argument authorized_view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument authorized_view on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

       --table=TABLE
          Name of the Bigtable table.

          To set the table attribute:
          + provide the argument authorized_view on the command line with a
            fully specified name;
          + provide the argument --table on the command line.

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
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable authorized-views remove-iam-policy-binding

        $ gcloud beta bigtable authorized-views remove-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud bigtable authorized-views remove-iam-policy-binding my-authorized-view \
    --instance='my-instance' \
    --table='my-table' \
    --member='user:test-user@gmail.com' \
    --role='roles/editor'

gcloud bigtable authorized-views remove-iam-policy-binding my-authorized-view \
    --instance='my-instance' \
    --table='my-table' \
    --member='user:test-user@gmail.com' \
    --role='roles/bigtable.admin' \
    --condition='expression=request.time < timestamp("2021-01-01T00:00:00Z"),title=expires_end_of_2020,description=Expires at midnight on 2020-12-31'
```

### gcloud bigtable authorized-views set-iam-policy

```text
NAME
    gcloud bigtable authorized-views set-iam-policy - set an IAM policy on a
        Cloud Bigtable authorized view

SYNOPSIS
    gcloud bigtable authorized-views set-iam-policy
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set an IAM policy on a Cloud Bigtable authorized view.

EXAMPLES
    To set the IAM policy from file my-policy on the authorized view
    my-authorized-view in instance my-instance and table my-table, run:

        $ gcloud bigtable authorized-views set-iam-policy \
            my-authorized-view --instance=`my-instance` --table=`my-table` \
            my-policy

    See https://cloud.google.com/iam/docs/managing-policies for more
    information.

POSITIONAL ARGUMENTS
     Authorized view resource - Cloud Bigtable authorized view to set the IAM
     policy on. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument authorized_view on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTHORIZED_VIEW
          ID of the authorized-view or fully qualified identifier for the
          authorized-view.

          To set the authorized_view attribute:
          + provide the argument authorized_view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument authorized_view on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

       --table=TABLE
          Name of the Bigtable table.

          To set the table attribute:
          + provide the argument authorized_view on the command line with a
            fully specified name;
          + provide the argument --table on the command line.

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
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable authorized-views set-iam-policy

        $ gcloud beta bigtable authorized-views set-iam-policy
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud bigtable authorized-views set-iam-policy my-authorized-view \
    --instance='my-instance' \
    --table='my-table' my-policy
```

### gcloud bigtable authorized-views update

```text
NAME
    gcloud bigtable authorized-views update - update an existing Cloud Bigtable
        authorized view

SYNOPSIS
    gcloud bigtable authorized-views update
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE) [--async]
        [--definition-file=DEFINITION_FILE] [--ignore-warnings]
        [--no-interactive] [--pre-encoded] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing Cloud Bigtable authorized view.

EXAMPLES
    To update the authorized view my-authorized-view in instance my-instance
    and table my-table, using the definition file authorized_view.json:

        $ gcloud bigtable authorized-views update my-authorized-view \
            --instance=test-instance --table=test-table \
            --definition-file=authorized_view.json

    To update the authorized view my-authorized-view in instance my-instance
    and table my-table, using the pre-encoded definition file
    authorized_view_pre_encoded.json:

        $ gcloud bigtable authorized-views update my-authorized-view \
            --instance=test-instance --table=test-table \
            --definition-file=authorized_view_pre_encoded.json --pre-encoded

    To update the authorized view my-authorized-view in instance my-instance
    and table my-table, using the definition file authorized_view.json and skip
    the prompt to proceed or cancel the update:

        $ gcloud bigtable authorized-views update my-authorized-view \
            --instance=test-instance --table=test-table \
            --definition-file=authorized_view.json --no-interactive

POSITIONAL ARGUMENTS
     Authorized view resource - Cloud Bigtable authorized view to update. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument authorized_view on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTHORIZED_VIEW
          ID of the authorized-view or fully qualified identifier for the
          authorized-view.

          To set the authorized_view attribute:
          + provide the argument authorized_view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument authorized_view on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

       --table=TABLE
          Name of the Bigtable table.

          To set the table attribute:
          + provide the argument authorized_view on the command line with a
            fully specified name;
          + provide the argument --table on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --definition-file=DEFINITION_FILE
        Path to a JSON or YAML file containing a valid authorized view
        protobuf.

        The name field is ignored. The name is deduced from the other command
        line arguments.

        Example: { "subsetView": { "rowPrefixes": ["store1"], "familySubsets":
        { "column_family_name": { "qualifiers":["address"],
        "qualifierPrefixes":["tel"] } } }, "deletionProtection": true }

     --ignore-warnings
        If true, changes that make the authorized view more restrictive are
        allowed.

     --interactive
        If provided, a diff is displayed with a prompt to proceed or cancel the
        update. Enabled by default, use --no-interactive to disable.

     --pre-encoded
        By default, Base64 encoding is applied to all binary fields
        ("rowPrefixes", "qualifiers" and "qualifierPrefixes") in the JSON or
        YAML definition file.

        Use this to indicate that all binary fields are already Base64-encoded
        and should be used directly.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable authorized-views update

        $ gcloud beta bigtable authorized-views update
```

### gcloud beta bigtable authorized-views add-iam-policy-binding

```text
NAME
    gcloud beta bigtable authorized-views add-iam-policy-binding - add an IAM
        policy binding to a Cloud Bigtable authorized view

SYNOPSIS
    gcloud beta bigtable authorized-views add-iam-policy-binding
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE)
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable authorized-views create

```text
NAME
    gcloud beta bigtable authorized-views create - create a new Cloud Bigtable
        authorized view

SYNOPSIS
    gcloud beta bigtable authorized-views create
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE) [--async]
        [--definition-file=DEFINITION_FILE] [--pre-encoded]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable authorized-views delete

```text
NAME
    gcloud beta bigtable authorized-views delete - delete a Cloud Bigtable
        authorized view

SYNOPSIS
    gcloud beta bigtable authorized-views delete
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable authorized-views describe

```text
NAME
    gcloud beta bigtable authorized-views describe - describe a Cloud Bigtable
        authorized view

SYNOPSIS
    gcloud beta bigtable authorized-views describe
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable authorized-views get-iam-policy

```text
NAME
    gcloud beta bigtable authorized-views get-iam-policy - get an IAM policy on
        a Cloud Bigtable authorized view

SYNOPSIS
    gcloud beta bigtable authorized-views get-iam-policy
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable authorized-views list

```text
NAME
    gcloud beta bigtable authorized-views list - list all authorized views of a
        Cloud Bigtable table

SYNOPSIS
    gcloud beta bigtable authorized-views list
        (--table=TABLE : --instance=INSTANCE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable authorized-views remove-iam-policy-binding

```text
NAME
    gcloud beta bigtable authorized-views remove-iam-policy-binding - remove an
        IAM policy binding from a Cloud Bigtable authorized view

SYNOPSIS
    gcloud beta bigtable authorized-views remove-iam-policy-binding
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE)
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable authorized-views set-iam-policy

```text
NAME
    gcloud beta bigtable authorized-views set-iam-policy - set an IAM policy on
        a Cloud Bigtable authorized view

SYNOPSIS
    gcloud beta bigtable authorized-views set-iam-policy
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable authorized-views update

```text
NAME
    gcloud beta bigtable authorized-views update - update an existing Cloud
        Bigtable authorized view

SYNOPSIS
    gcloud beta bigtable authorized-views update
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE) [--async]
        [--definition-file=DEFINITION_FILE] [--ignore-warnings]
        [--no-interactive] [--pre-encoded] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable authorized-views add-iam-policy-binding

```text
NAME
    gcloud alpha bigtable authorized-views add-iam-policy-binding - add an IAM
        policy binding to a Cloud Bigtable authorized view

SYNOPSIS
    gcloud alpha bigtable authorized-views add-iam-policy-binding
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE)
        --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable authorized-views create

```text
NAME
    gcloud alpha bigtable authorized-views create - create a new Cloud Bigtable
        authorized view

SYNOPSIS
    gcloud alpha bigtable authorized-views create
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE) [--async]
        [--definition-file=DEFINITION_FILE] [--pre-encoded]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable authorized-views delete

```text
NAME
    gcloud alpha bigtable authorized-views delete - delete a Cloud Bigtable
        authorized view

SYNOPSIS
    gcloud alpha bigtable authorized-views delete
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable authorized-views describe

```text
NAME
    gcloud alpha bigtable authorized-views describe - describe a Cloud Bigtable
        authorized view

SYNOPSIS
    gcloud alpha bigtable authorized-views describe
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable authorized-views get-iam-policy

```text
NAME
    gcloud alpha bigtable authorized-views get-iam-policy - get an IAM policy
        on a Cloud Bigtable authorized view

SYNOPSIS
    gcloud alpha bigtable authorized-views get-iam-policy
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable authorized-views list

```text
NAME
    gcloud alpha bigtable authorized-views list - list all authorized views of
        a Cloud Bigtable table

SYNOPSIS
    gcloud alpha bigtable authorized-views list
        (--table=TABLE : --instance=INSTANCE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable authorized-views remove-iam-policy-binding

```text
NAME
    gcloud alpha bigtable authorized-views remove-iam-policy-binding - remove
        an IAM policy binding from a Cloud Bigtable authorized view

SYNOPSIS
    gcloud alpha bigtable authorized-views remove-iam-policy-binding
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE)
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable authorized-views set-iam-policy

```text
NAME
    gcloud alpha bigtable authorized-views set-iam-policy - set an IAM policy
        on a Cloud Bigtable authorized view

SYNOPSIS
    gcloud alpha bigtable authorized-views set-iam-policy
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable authorized-views update

```text
NAME
    gcloud alpha bigtable authorized-views update - update an existing Cloud
        Bigtable authorized view

SYNOPSIS
    gcloud alpha bigtable authorized-views update
        (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE) [--async]
        [--definition-file=DEFINITION_FILE] [--ignore-warnings]
        [--no-interactive] [--pre-encoded] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example wraps flag values in backticks (for example `` --instance=`my-instance` ``), which the shell runs as command substitutions; the runnable form passes the values in single quotes.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/authorized-views (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
