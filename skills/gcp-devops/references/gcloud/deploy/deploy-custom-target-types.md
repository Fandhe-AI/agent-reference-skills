---
source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/custom-target-types
---

# gcloud deploy custom-target-types

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud deploy custom-target-types add-iam-policy-binding

```text
NAME
    gcloud deploy custom-target-types add-iam-policy-binding - add IAM policy
        binding for a Cloud Deploy Custom Target Type

SYNOPSIS
    gcloud deploy custom-target-types add-iam-policy-binding
        (CUSTOM_TARGET_TYPE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds a policy binding to the IAM policy of a Cloud Deploy Custom Target
    Type. One binding consists of a member and a role.

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    To add an IAM policy binding for the role of
    roles/clouddeploy.customTargetTypeAdmin for the user test-user@gmail.com on
    my-custom-target-type with the region us-central1, run:

        $ gcloud deploy custom-target-types add-iam-policy-binding \
            my-custom-target-type --region='us-central1' \
            --member='user:test-user@gmail.com' \
            --role='roles/clouddeploy.customTargetTypeAdmin'

POSITIONAL ARGUMENTS
     Custom target type resource - The custom target type for which to add the
     IAM policy binding. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument custom_target_type on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CUSTOM_TARGET_TYPE
          ID of the custom target type or fully qualified identifier for the
          custom target type.

          To set the custom_target_type attribute:
          + provide the argument custom_target_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Location of the custom target type.

          To set the region attribute:
          + provide the argument custom_target_type on the command line with
            a fully specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

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
    This command uses the clouddeploy/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/deploy/

NOTES
    These variants are also available:

        $ gcloud alpha deploy custom-target-types add-iam-policy-binding

        $ gcloud beta deploy custom-target-types add-iam-policy-binding
```

### gcloud deploy custom-target-types delete

```text
NAME
    gcloud deploy custom-target-types delete - delete a custom target type

SYNOPSIS
    gcloud deploy custom-target-types delete
        (CUSTOM_TARGET_TYPE : --region=REGION) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a custom target type for a specified region.

EXAMPLES
    The following command will delete custom target type
    test-custom-target-type, in region us-central1:

        $ gcloud deploy custom-target-types delete test-custom-target-type \
            --region=us-central1

POSITIONAL ARGUMENTS
     Custom target type resource - The name of the custom target type to
     delete. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument custom_target_type on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CUSTOM_TARGET_TYPE
          ID of the custom target type or fully qualified identifier for the
          custom target type.

          To set the custom_target_type attribute:
          + provide the argument custom_target_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Location of the custom target type.

          To set the region attribute:
          + provide the argument custom_target_type on the command line with
            a fully specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

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

API REFERENCE
    This command uses the clouddeploy/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/deploy/

NOTES
    These variants are also available:

        $ gcloud alpha deploy custom-target-types delete

        $ gcloud beta deploy custom-target-types delete
```

### gcloud deploy custom-target-types describe

```text
NAME
    gcloud deploy custom-target-types describe - show details for a custom
        target type

SYNOPSIS
    gcloud deploy custom-target-types describe
        (CUSTOM_TARGET_TYPE : --region=REGION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details for a specified custom target type.

EXAMPLES
    To show details about a custom target type test-custom-target-type in
    region us-central, run:

        $ gcloud deploy custom-target-types describe \
            test-custom-target-type --region=us-central1

POSITIONAL ARGUMENTS
     Custom target type resource - The name of the custom target type you want
     to describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument custom_target_type on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CUSTOM_TARGET_TYPE
          ID of the custom target type or fully qualified identifier for the
          custom target type.

          To set the custom_target_type attribute:
          + provide the argument custom_target_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Location of the custom target type.

          To set the region attribute:
          + provide the argument custom_target_type on the command line with
            a fully specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the clouddeploy/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/deploy/

NOTES
    These variants are also available:

        $ gcloud alpha deploy custom-target-types describe

        $ gcloud beta deploy custom-target-types describe
```

### gcloud deploy custom-target-types export

```text
NAME
    gcloud deploy custom-target-types export - returns the .yaml definition of
        the specified custom target type

SYNOPSIS
    gcloud deploy custom-target-types export
        (CUSTOM_TARGET_TYPE : --region=REGION) [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The exported yaml definition can be applied by deploy apply command.

EXAMPLES
    To return the .yaml definition of the custom target type
    test-custom-target-type, in region us-central1, run:

        $ gcloud deploy custom-target-types export test-custom-target-type \
            --region=us-central1

POSITIONAL ARGUMENTS
     Custom target type resource - The name of the Custom Target Type. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument custom_target_type on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CUSTOM_TARGET_TYPE
          ID of the custom_target_type or fully qualified identifier for the
          custom_target_type.

          To set the custom_target_type attribute:
          + provide the argument custom_target_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud region for the custom_target_type. Alternatively, set the
          property [deploy/region].

          To set the region attribute:
          + provide the argument custom_target_type on the command line with
            a fully specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

FLAGS
     --destination=DESTINATION
        Path to a YAML file where the configuration will be exported.
        Alternatively, you may omit this flag to write to standard output.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha deploy custom-target-types export

        $ gcloud beta deploy custom-target-types export
```

### gcloud deploy custom-target-types get-iam-policy

```text
NAME
    gcloud deploy custom-target-types get-iam-policy - get the IAM policy for a
        Cloud Deploy Custom Target Type

SYNOPSIS
    gcloud deploy custom-target-types get-iam-policy
        (CUSTOM_TARGET_TYPE : --region=REGION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud deploy custom-target-types get-iam-policy displays the IAM policy
    associated with a Cloud Deploy Custom Target Type. If formatted as JSON,
    the output can be edited and used as a policy file for set-iam-policy. The
    output includes an "etag" field identifying the version emitted and
    allowing detection of concurrent policy updates; see $ gcloud deploy
    custom-target-types set-iam-policy for additional details.

EXAMPLES
    To print the IAM policy for a custom target type my-custom-target-type in
    region us-central1, run:

        $ gcloud deploy custom-target-types get-iam-policy \
            my-custom-target-type --region=us-central1

POSITIONAL ARGUMENTS
     Custom target type resource - The custom target type for which to display
     the IAM policy. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument custom_target_type on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CUSTOM_TARGET_TYPE
          ID of the custom target type or fully qualified identifier for the
          custom target type.

          To set the custom_target_type attribute:
          + provide the argument custom_target_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Location of the custom target type.

          To set the region attribute:
          + provide the argument custom_target_type on the command line with
            a fully specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

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
    This command uses the clouddeploy/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/deploy/

NOTES
    These variants are also available:

        $ gcloud alpha deploy custom-target-types get-iam-policy

        $ gcloud beta deploy custom-target-types get-iam-policy
```

### gcloud deploy custom-target-types list

```text
NAME
    gcloud deploy custom-target-types list - list the custom target types

SYNOPSIS
    gcloud deploy custom-target-types list [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the custom target types for a specified region.

EXAMPLES
    To list the custom target types in region us-central1, run:

        $ gcloud deploy custom-target-types list --region=us-central1

FLAGS
     Location resource - The region for which you want to list the custom
     target types. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * set the property deploy/region with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --region=REGION
        ID of the location or fully qualified identifier for the location.

        To set the region attribute:
        * provide the argument --region on the command line;
        * set the property deploy/region.

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
    This command uses the clouddeploy/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/deploy/

NOTES
    These variants are also available:

        $ gcloud alpha deploy custom-target-types list

        $ gcloud beta deploy custom-target-types list
```

### gcloud deploy custom-target-types remove-iam-policy-binding

```text
NAME
    gcloud deploy custom-target-types remove-iam-policy-binding - remove an IAM
        policy binding for a Cloud Deploy Custom Target Type

SYNOPSIS
    gcloud deploy custom-target-types remove-iam-policy-binding
        (CUSTOM_TARGET_TYPE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes a policy binding to the IAM policy of a Cloud Deploy Custom Target
    Type. One binding consists of a member and a role.

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    To remove an IAM policy binding for the role of
    roles/clouddeploy.customTargetTypeAdmin for the user test-user@gmail.com on
    my-custom-target-type with the region us-central1, run:

        $ gcloud deploy custom-target-types remove-iam-policy-binding \
            my-custom-target-type --region='us-central1' \
            --member='user:test-user@gmail.com' \
            --role='roles/clouddeploy.customTargetTypeAdmin'

POSITIONAL ARGUMENTS
     Custom target type resource - The custom target type for which to remove
     the IAM policy binding. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument custom_target_type on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CUSTOM_TARGET_TYPE
          ID of the custom target type or fully qualified identifier for the
          custom target type.

          To set the custom_target_type attribute:
          + provide the argument custom_target_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Location of the custom target type.

          To set the region attribute:
          + provide the argument custom_target_type on the command line with
            a fully specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

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
    This command uses the clouddeploy/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/deploy/

NOTES
    These variants are also available:

        $ gcloud alpha deploy custom-target-types remove-iam-policy-binding

        $ gcloud beta deploy custom-target-types remove-iam-policy-binding
```

### gcloud deploy custom-target-types set-iam-policy

```text
NAME
    gcloud deploy custom-target-types set-iam-policy - set the IAM policy for a
        Cloud Deploy Custom Target Type

SYNOPSIS
    gcloud deploy custom-target-types set-iam-policy
        (CUSTOM_TARGET_TYPE : --region=REGION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set the IAM policy associated with a Cloud Deploy Custom Target Type.

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    policy.json and set it for a custom target type with identifier
    my-custom-target-type in region us-central1:

        $ gcloud deploy custom-target-types set-iam-policy \
            my-custom-target-type policy.json --region=us-central1

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Custom target type resource - The custom target type for which to set the
     IAM policy. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument custom_target_type on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CUSTOM_TARGET_TYPE
          ID of the custom target type or fully qualified identifier for the
          custom target type.

          To set the custom_target_type attribute:
          + provide the argument custom_target_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Location of the custom target type.

          To set the region attribute:
          + provide the argument custom_target_type on the command line with
            a fully specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

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
    This command uses the clouddeploy/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/deploy/

NOTES
    These variants are also available:

        $ gcloud alpha deploy custom-target-types set-iam-policy

        $ gcloud beta deploy custom-target-types set-iam-policy
```

### gcloud beta deploy custom-target-types add-iam-policy-binding

```text
NAME
    gcloud beta deploy custom-target-types add-iam-policy-binding - add IAM
        policy binding for a Cloud Deploy Custom Target Type

SYNOPSIS
    gcloud beta deploy custom-target-types add-iam-policy-binding
        (CUSTOM_TARGET_TYPE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy custom-target-types delete

```text
NAME
    gcloud beta deploy custom-target-types delete - delete a custom target type

SYNOPSIS
    gcloud beta deploy custom-target-types delete
        (CUSTOM_TARGET_TYPE : --region=REGION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy custom-target-types describe

```text
NAME
    gcloud beta deploy custom-target-types describe - show details for a custom
        target type

SYNOPSIS
    gcloud beta deploy custom-target-types describe
        (CUSTOM_TARGET_TYPE : --region=REGION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy custom-target-types export

```text
NAME
    gcloud beta deploy custom-target-types export - returns the .yaml
        definition of the specified custom target type

SYNOPSIS
    gcloud beta deploy custom-target-types export
        (CUSTOM_TARGET_TYPE : --region=REGION) [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy custom-target-types get-iam-policy

```text
NAME
    gcloud beta deploy custom-target-types get-iam-policy - get the IAM policy
        for a Cloud Deploy Custom Target Type

SYNOPSIS
    gcloud beta deploy custom-target-types get-iam-policy
        (CUSTOM_TARGET_TYPE : --region=REGION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy custom-target-types list

```text
NAME
    gcloud beta deploy custom-target-types list - list the custom target types

SYNOPSIS
    gcloud beta deploy custom-target-types list [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy custom-target-types remove-iam-policy-binding

```text
NAME
    gcloud beta deploy custom-target-types remove-iam-policy-binding - remove
        an IAM policy binding for a Cloud Deploy Custom Target Type

SYNOPSIS
    gcloud beta deploy custom-target-types remove-iam-policy-binding
        (CUSTOM_TARGET_TYPE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy custom-target-types set-iam-policy

```text
NAME
    gcloud beta deploy custom-target-types set-iam-policy - set the IAM policy
        for a Cloud Deploy Custom Target Type

SYNOPSIS
    gcloud beta deploy custom-target-types set-iam-policy
        (CUSTOM_TARGET_TYPE : --region=REGION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy custom-target-types add-iam-policy-binding

```text
NAME
    gcloud alpha deploy custom-target-types add-iam-policy-binding - add IAM
        policy binding for a Cloud Deploy Custom Target Type

SYNOPSIS
    gcloud alpha deploy custom-target-types add-iam-policy-binding
        (CUSTOM_TARGET_TYPE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy custom-target-types delete

```text
NAME
    gcloud alpha deploy custom-target-types delete - delete a custom target
        type

SYNOPSIS
    gcloud alpha deploy custom-target-types delete
        (CUSTOM_TARGET_TYPE : --region=REGION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy custom-target-types describe

```text
NAME
    gcloud alpha deploy custom-target-types describe - show details for a
        custom target type

SYNOPSIS
    gcloud alpha deploy custom-target-types describe
        (CUSTOM_TARGET_TYPE : --region=REGION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy custom-target-types export

```text
NAME
    gcloud alpha deploy custom-target-types export - returns the .yaml
        definition of the specified custom target type

SYNOPSIS
    gcloud alpha deploy custom-target-types export
        (CUSTOM_TARGET_TYPE : --region=REGION) [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy custom-target-types get-iam-policy

```text
NAME
    gcloud alpha deploy custom-target-types get-iam-policy - get the IAM policy
        for a Cloud Deploy Custom Target Type

SYNOPSIS
    gcloud alpha deploy custom-target-types get-iam-policy
        (CUSTOM_TARGET_TYPE : --region=REGION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy custom-target-types list

```text
NAME
    gcloud alpha deploy custom-target-types list - list the custom target types

SYNOPSIS
    gcloud alpha deploy custom-target-types list [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy custom-target-types remove-iam-policy-binding

```text
NAME
    gcloud alpha deploy custom-target-types remove-iam-policy-binding - remove
        an IAM policy binding for a Cloud Deploy Custom Target Type

SYNOPSIS
    gcloud alpha deploy custom-target-types remove-iam-policy-binding
        (CUSTOM_TARGET_TYPE : --region=REGION) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy custom-target-types set-iam-policy

```text
NAME
    gcloud alpha deploy custom-target-types set-iam-policy - set the IAM policy
        for a Cloud Deploy Custom Target Type

SYNOPSIS
    gcloud alpha deploy custom-target-types set-iam-policy
        (CUSTOM_TARGET_TYPE : --region=REGION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/custom-target-types (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
