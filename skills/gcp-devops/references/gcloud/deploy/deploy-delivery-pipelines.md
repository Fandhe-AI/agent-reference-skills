---
source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/delivery-pipelines
---

# gcloud deploy delivery-pipelines

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud deploy delivery-pipelines add-iam-policy-binding

```text
NAME
    gcloud deploy delivery-pipelines add-iam-policy-binding - add IAM policy
        binding for a Cloud Deploy delivery pipeline

SYNOPSIS
    gcloud deploy delivery-pipelines add-iam-policy-binding
        [[DELIVERY_PIPELINE] --region=REGION] --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds a policy binding to the IAM policy of a Cloud Deploy delivery
    pipeline. One binding consists of a member and a role.

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/clouddeploy.operator'
    for the user 'test-user@gmail.com' on 'my-pipeline' with the region
    'us-central1', run:

        $ gcloud deploy delivery-pipelines add-iam-policy-binding \
            my-pipeline --region='us-central1' \
            --member='user:test-user@gmail.com' \
            --role='roles/clouddeploy.operator'

POSITIONAL ARGUMENTS
     Delivery pipeline resource - The delivery pipeline for which to add the
     IAM policy binding. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument delivery_pipeline on the command line with a
        fully specified name;
      * set the property deploy/delivery_pipeline with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     [DELIVERY_PIPELINE]
        ID of the delivery_pipeline or fully qualified identifier for the
        delivery_pipeline.

        To set the delivery_pipeline attribute:
        * provide the argument delivery_pipeline on the command line;
        * set the property deploy/delivery_pipeline.

     --region=REGION
        Location of the delivery_pipeline.

        To set the region attribute:
        * provide the argument delivery_pipeline on the command line with a
          fully specified name;
        * set the property deploy/delivery_pipeline with a fully specified
          name;
        * provide the argument --region on the command line;
        * set the property deploy/region.

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

        $ gcloud alpha deploy delivery-pipelines add-iam-policy-binding

        $ gcloud beta deploy delivery-pipelines add-iam-policy-binding
```

### gcloud deploy delivery-pipelines delete

```text
NAME
    gcloud deploy delivery-pipelines delete - delete a delivery pipeline

SYNOPSIS
    gcloud deploy delivery-pipelines delete
        [[DELIVERY_PIPELINE] --region=REGION] [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a delivery pipeline.

EXAMPLES
    The following command will delete delivery pipeline 'test-pipeline', in
    region 'us-central1', but only if the delivery pipeline doesn't have any
    sub-resources (targets, releases or rollouts):

        $ gcloud deploy delivery-pipelines delete test-pipeline \
            --region=us-central1

    The following command will delete delivery pipeline 'test-pipeline', in
    region 'us-central1' and its sub-resources (targets, releases or rollouts):

        $ gcloud deploy delivery-pipelines delete test-pipeline \
            --region=us-central1 --force

POSITIONAL ARGUMENTS
     Delivery pipeline resource - The Cloud Deploy delivery pipeline to delete.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument delivery_pipeline on the command line with a
        fully specified name;
      * set the property deploy/delivery_pipeline with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     [DELIVERY_PIPELINE]
        ID of the delivery_pipeline or fully qualified identifier for the
        delivery_pipeline.

        To set the delivery_pipeline attribute:
        * provide the argument delivery_pipeline on the command line;
        * set the property deploy/delivery_pipeline.

     --region=REGION
        Location of the delivery_pipeline.

        To set the region attribute:
        * provide the argument delivery_pipeline on the command line with a
          fully specified name;
        * set the property deploy/delivery_pipeline with a fully specified
          name;
        * provide the argument --region on the command line;
        * set the property deploy/region.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --force
        If true, the delivery pipeline with sub-resources will be deleted and
        its sub-resources will also be deleted.

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

        $ gcloud alpha deploy delivery-pipelines delete

        $ gcloud beta deploy delivery-pipelines delete
```

### gcloud deploy delivery-pipelines describe

```text
NAME
    gcloud deploy delivery-pipelines describe - show details about a delivery
        pipeline

SYNOPSIS
    gcloud deploy delivery-pipelines describe
        [[DELIVERY_PIPELINE] --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The output contains the following sections:

    Delivery Pipeline:

      o detail of the delivery pipeline to be described.

    Targets:

      o target name.

      o active release in the target.

      o timestamp of the last successful deployment.

      o list of the rollouts that require approval.

EXAMPLES
    To describe a delivery pipeline called 'test-pipeline' in region
    'us-central1', run:

        $ gcloud deploy delivery-pipelines describe test-pipeline \
            --region=us-central1

POSITIONAL ARGUMENTS
     Delivery pipeline resource - The name of the Delivery Pipeline. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument delivery_pipeline on the command line with a
        fully specified name;
      * set the property deploy/delivery_pipeline with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     [DELIVERY_PIPELINE]
        ID of the delivery_pipeline or fully qualified identifier for the
        delivery_pipeline.

        To set the delivery-pipeline attribute:
        * provide the argument delivery_pipeline on the command line;
        * set the property deploy/delivery_pipeline.

     --region=REGION
        The Cloud region for the delivery_pipeline. Alternatively, set the
        property [deploy/region].

        To set the region attribute:
        * provide the argument delivery_pipeline on the command line with a
          fully specified name;
        * set the property deploy/delivery_pipeline with a fully specified
          name;
        * provide the argument --region on the command line;
        * set the property deploy/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha deploy delivery-pipelines describe

        $ gcloud beta deploy delivery-pipelines describe
```

### gcloud deploy delivery-pipelines export

```text
NAME
    gcloud deploy delivery-pipelines export - returns the .yaml definition of
        the specified delivery pipeline

SYNOPSIS
    gcloud deploy delivery-pipelines export
        [[DELIVERY_PIPELINE] --region=REGION] [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The exported yaml definition can be applied by 'deploy apply' command.

EXAMPLES
    To return the .yaml definition of the delivery pipeline 'test-pipeline', in
    region 'us-central1', run:

        $ gcloud deploy delivery-pipelines export test-pipeline \
            --region=us-central1

POSITIONAL ARGUMENTS
     Delivery pipeline resource - The name of the Delivery Pipeline. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument delivery_pipeline on the command line with a
        fully specified name;
      * set the property deploy/delivery_pipeline with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     [DELIVERY_PIPELINE]
        ID of the delivery_pipeline or fully qualified identifier for the
        delivery_pipeline.

        To set the delivery-pipeline attribute:
        * provide the argument delivery_pipeline on the command line;
        * set the property deploy/delivery_pipeline.

     --region=REGION
        The Cloud region for the delivery_pipeline. Alternatively, set the
        property [deploy/region].

        To set the region attribute:
        * provide the argument delivery_pipeline on the command line with a
          fully specified name;
        * set the property deploy/delivery_pipeline with a fully specified
          name;
        * provide the argument --region on the command line;
        * set the property deploy/region.

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

        $ gcloud alpha deploy delivery-pipelines export

        $ gcloud beta deploy delivery-pipelines export
```

### gcloud deploy delivery-pipelines get-iam-policy

```text
NAME
    gcloud deploy delivery-pipelines get-iam-policy - get the IAM policy for a
        Cloud Deploy delivery pipeline

SYNOPSIS
    gcloud deploy delivery-pipelines get-iam-policy
        [[DELIVERY_PIPELINE] --region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud deploy delivery-pipelines get-iam-policy displays the IAM policy
    associated with a Cloud Deploy delivery pipeline. If formatted as JSON, the
    output can be edited and used as a policy file for set-iam-policy. The
    output includes an "etag" field identifying the version emitted and
    allowing detection of concurrent policy updates; see $ gcloud deploy
    delivery-pipelines set-iam-policy for additional details.

EXAMPLES
    To print the IAM policy for delivery pipeline my-pipeline, run:

        $ gcloud deploy delivery-pipelines get-iam-policy my-pipeline \
            --region=us-central1

POSITIONAL ARGUMENTS
     Delivery pipeline resource - The delivery pipeline for which to display
     the IAM policy. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument delivery_pipeline on the command line with a
        fully specified name;
      * set the property deploy/delivery_pipeline with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     [DELIVERY_PIPELINE]
        ID of the delivery_pipeline or fully qualified identifier for the
        delivery_pipeline.

        To set the delivery_pipeline attribute:
        * provide the argument delivery_pipeline on the command line;
        * set the property deploy/delivery_pipeline.

     --region=REGION
        Location of the delivery_pipeline.

        To set the region attribute:
        * provide the argument delivery_pipeline on the command line with a
          fully specified name;
        * set the property deploy/delivery_pipeline with a fully specified
          name;
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

        $ gcloud alpha deploy delivery-pipelines get-iam-policy

        $ gcloud beta deploy delivery-pipelines get-iam-policy
```

### gcloud deploy delivery-pipelines list

```text
NAME
    gcloud deploy delivery-pipelines list - list Cloud Deploy delivery
        pipelines

SYNOPSIS
    gcloud deploy delivery-pipelines list [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List your Cloud Deploy delivery pipelines.

EXAMPLES
    To list the delivery pipelines in region 'us-central1', run:

        $ gcloud deploy delivery-pipelines list --region=us-central1

FLAGS
     Location resource - The location for which you want to list the delivery
     pipelines. This represents a Cloud resource. (NOTE) Some attributes are
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

        $ gcloud alpha deploy delivery-pipelines list

        $ gcloud beta deploy delivery-pipelines list
```

### gcloud deploy delivery-pipelines remove-iam-policy-binding

```text
NAME
    gcloud deploy delivery-pipelines remove-iam-policy-binding - remove an IAM
        policy binding for a Cloud Deploy delivery pipeline

SYNOPSIS
    gcloud deploy delivery-pipelines remove-iam-policy-binding
        [[DELIVERY_PIPELINE] --region=REGION] --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes a policy binding to the IAM policy of a Cloud Deploy delivery
    pipeline. One binding consists of a member and a role.

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    To remove an IAM policy binding for the role of
    'roles/clouddeploy.operator' for the user 'test-user@gmail.com' on
    'my-pipeline' with the region 'us-central1', run:

        $ gcloud deploy delivery-pipelines remove-iam-policy-binding \
            my-pipeline --region='us-central1' \
            --member='user:test-user@gmail.com' \
            --role='roles/clouddeploy.operator'

POSITIONAL ARGUMENTS
     Delivery pipeline resource - The delivery pipeline for which to remove the
     IAM policy binding. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument delivery_pipeline on the command line with a
        fully specified name;
      * set the property deploy/delivery_pipeline with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     [DELIVERY_PIPELINE]
        ID of the delivery_pipeline or fully qualified identifier for the
        delivery_pipeline.

        To set the delivery_pipeline attribute:
        * provide the argument delivery_pipeline on the command line;
        * set the property deploy/delivery_pipeline.

     --region=REGION
        Location of the delivery_pipeline.

        To set the region attribute:
        * provide the argument delivery_pipeline on the command line with a
          fully specified name;
        * set the property deploy/delivery_pipeline with a fully specified
          name;
        * provide the argument --region on the command line;
        * set the property deploy/region.

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

        $ gcloud alpha deploy delivery-pipelines remove-iam-policy-binding

        $ gcloud beta deploy delivery-pipelines remove-iam-policy-binding
```

### gcloud deploy delivery-pipelines set-iam-policy

```text
NAME
    gcloud deploy delivery-pipelines set-iam-policy - set the IAM policy for a
        Cloud Deploy delivery pipeline

SYNOPSIS
    gcloud deploy delivery-pipelines set-iam-policy
        [[DELIVERY_PIPELINE] --region=REGION] POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set the IAM policy associated with a Cloud Deploy delivery pipeline.

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    policy.json and set it for a delivery pipeline with identifier my-pipeline

        $ gcloud deploy delivery-pipelines set-iam-policy my-pipeline \
            policy.json --region=us-central1

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Delivery pipeline resource - The delivery pipeline for which to set the
     IAM policy.. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument delivery_pipeline on the command line with a
        fully specified name;
      * set the property deploy/delivery_pipeline with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     [DELIVERY_PIPELINE]
        ID of the delivery_pipeline or fully qualified identifier for the
        delivery_pipeline.

        To set the delivery_pipeline attribute:
        * provide the argument delivery_pipeline on the command line;
        * set the property deploy/delivery_pipeline.

     --region=REGION
        Location of the delivery_pipeline.

        To set the region attribute:
        * provide the argument delivery_pipeline on the command line with a
          fully specified name;
        * set the property deploy/delivery_pipeline with a fully specified
          name;
        * provide the argument --region on the command line;
        * set the property deploy/region.

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

        $ gcloud alpha deploy delivery-pipelines set-iam-policy

        $ gcloud beta deploy delivery-pipelines set-iam-policy
```

### gcloud beta deploy delivery-pipelines add-iam-policy-binding

```text
NAME
    gcloud beta deploy delivery-pipelines add-iam-policy-binding - add IAM
        policy binding for a Cloud Deploy delivery pipeline

SYNOPSIS
    gcloud beta deploy delivery-pipelines add-iam-policy-binding
        [[DELIVERY_PIPELINE] --region=REGION] --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy delivery-pipelines delete

```text
NAME
    gcloud beta deploy delivery-pipelines delete - delete a delivery pipeline

SYNOPSIS
    gcloud beta deploy delivery-pipelines delete
        [[DELIVERY_PIPELINE] --region=REGION] [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy delivery-pipelines describe

```text
NAME
    gcloud beta deploy delivery-pipelines describe - show details about a
        delivery pipeline

SYNOPSIS
    gcloud beta deploy delivery-pipelines describe
        [[DELIVERY_PIPELINE] --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy delivery-pipelines export

```text
NAME
    gcloud beta deploy delivery-pipelines export - returns the .yaml definition
        of the specified delivery pipeline

SYNOPSIS
    gcloud beta deploy delivery-pipelines export
        [[DELIVERY_PIPELINE] --region=REGION] [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy delivery-pipelines get-iam-policy

```text
NAME
    gcloud beta deploy delivery-pipelines get-iam-policy - get the IAM policy
        for a Cloud Deploy delivery pipeline

SYNOPSIS
    gcloud beta deploy delivery-pipelines get-iam-policy
        [[DELIVERY_PIPELINE] --region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy delivery-pipelines list

```text
NAME
    gcloud beta deploy delivery-pipelines list - list Cloud Deploy delivery
        pipelines

SYNOPSIS
    gcloud beta deploy delivery-pipelines list [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy delivery-pipelines remove-iam-policy-binding

```text
NAME
    gcloud beta deploy delivery-pipelines remove-iam-policy-binding - remove an
        IAM policy binding for a Cloud Deploy delivery pipeline

SYNOPSIS
    gcloud beta deploy delivery-pipelines remove-iam-policy-binding
        [[DELIVERY_PIPELINE] --region=REGION] --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy delivery-pipelines set-iam-policy

```text
NAME
    gcloud beta deploy delivery-pipelines set-iam-policy - set the IAM policy
        for a Cloud Deploy delivery pipeline

SYNOPSIS
    gcloud beta deploy delivery-pipelines set-iam-policy
        [[DELIVERY_PIPELINE] --region=REGION] POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy delivery-pipelines add-iam-policy-binding

```text
NAME
    gcloud alpha deploy delivery-pipelines add-iam-policy-binding - add IAM
        policy binding for a Cloud Deploy delivery pipeline

SYNOPSIS
    gcloud alpha deploy delivery-pipelines add-iam-policy-binding
        [[DELIVERY_PIPELINE] --region=REGION] --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy delivery-pipelines delete

```text
NAME
    gcloud alpha deploy delivery-pipelines delete - delete a delivery pipeline

SYNOPSIS
    gcloud alpha deploy delivery-pipelines delete
        [[DELIVERY_PIPELINE] --region=REGION] [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy delivery-pipelines describe

```text
NAME
    gcloud alpha deploy delivery-pipelines describe - show details about a
        delivery pipeline

SYNOPSIS
    gcloud alpha deploy delivery-pipelines describe
        [[DELIVERY_PIPELINE] --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy delivery-pipelines export

```text
NAME
    gcloud alpha deploy delivery-pipelines export - returns the .yaml
        definition of the specified delivery pipeline

SYNOPSIS
    gcloud alpha deploy delivery-pipelines export
        [[DELIVERY_PIPELINE] --region=REGION] [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy delivery-pipelines get-iam-policy

```text
NAME
    gcloud alpha deploy delivery-pipelines get-iam-policy - get the IAM policy
        for a Cloud Deploy delivery pipeline

SYNOPSIS
    gcloud alpha deploy delivery-pipelines get-iam-policy
        [[DELIVERY_PIPELINE] --region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy delivery-pipelines list

```text
NAME
    gcloud alpha deploy delivery-pipelines list - list Cloud Deploy delivery
        pipelines

SYNOPSIS
    gcloud alpha deploy delivery-pipelines list [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy delivery-pipelines remove-iam-policy-binding

```text
NAME
    gcloud alpha deploy delivery-pipelines remove-iam-policy-binding - remove
        an IAM policy binding for a Cloud Deploy delivery pipeline

SYNOPSIS
    gcloud alpha deploy delivery-pipelines remove-iam-policy-binding
        [[DELIVERY_PIPELINE] --region=REGION] --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy delivery-pipelines set-iam-policy

```text
NAME
    gcloud alpha deploy delivery-pipelines set-iam-policy - set the IAM policy
        for a Cloud Deploy delivery pipeline

SYNOPSIS
    gcloud alpha deploy delivery-pipelines set-iam-policy
        [[DELIVERY_PIPELINE] --region=REGION] POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/delivery-pipelines (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
