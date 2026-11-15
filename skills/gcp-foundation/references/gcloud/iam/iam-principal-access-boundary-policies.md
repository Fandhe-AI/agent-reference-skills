---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/principal-access-boundary-policies
---

# gcloud iam principal-access-boundary-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam principal-access-boundary-policies create

```text
NAME
    gcloud iam principal-access-boundary-policies create - create
        PrincipalAccessBoundaryPolicy instance

SYNOPSIS
    gcloud iam principal-access-boundary-policies create
        (PRINCIPAL_ACCESS_BOUNDARY_POLICY
          : --location=LOCATION --organization=ORGANIZATION)
        [--annotations=[ANNOTATIONS,...]] [--async]
        [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [[--details-rules=[description=DESCRIPTION],
          [effect=EFFECT],[resources=RESOURCES]
          : --details-enforcement-version=DETAILS_ENFORCEMENT_VERSION]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create PrincipalAccessBoundaryPolicy instance.

EXAMPLES
    To create a policy instance called my-policy, run:

        $ gcloud iam principal-access-boundary-policies create my-policy \
            --organization=123 --location=global

POSITIONAL ARGUMENTS
     PrincipalAccessBoundaryPolicy resource - Identifier. The resource name of
     the principal access boundary policy.

     The following format is supported:
     organizations/{organization_id}/locations/{location}/principalAccessBoundaryPolicies/{policy_id}
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       PRINCIPAL_ACCESS_BOUNDARY_POLICY
          ID of the principalAccessBoundaryPolicy or fully qualified identifier
          for the principalAccessBoundaryPolicy.

          To set the principal_access_boundary_policy attribute:
          + provide the argument principal_access_boundary_policy on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the principalAccessBoundaryPolicy resource.

          To set the location attribute:
          + provide the argument principal_access_boundary_policy on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the principalAccessBoundaryPolicy resource.

          To set the organization attribute:
          + provide the argument principal_access_boundary_policy on the
            command line with a fully specified name;
          + provide the argument --organization on the command line.

FLAGS
     --annotations=[ANNOTATIONS,...]
        User defined annotations. See https://google.aip.dev/148#annotations
        for more details such as format and size limitations.

         KEY
            Sets KEY value.

         VALUE
            Sets VALUE value.

        Shorthand Example:

            --annotations=string=string

        JSON Example:

            --annotations='{"string": "string"}'

        File Example:

            --annotations=path_to_file.(yaml|json)

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        The description of the principal access boundary policy. Must be less
        than or equal to 63 characters.

     --etag=ETAG
        The etag for the principal access boundary. If this is provided on
        update, it must match the server's etag.

     Principal access boundary policy details

     --details-rules=[description=DESCRIPTION],[effect=EFFECT],[resources=RESOURCES]
        Required, A list of principal access boundary policy rules. The number
        of rules in a policy is limited to 500.

         description
            The description of the principal access boundary policy rule. Must
            be less than or equal to 256 characters.

         effect
            The access relationship of principals to the resources in this
            rule.

         resources
            A list of Resource Manager resources. If a resource is listed in
            the rule, then the rule applies for that resource and its
            descendants. The number of resources in a policy is limited to 500
            across all rules in the policy.

            The following resource types are supported:

            + Organizations, such as
              //cloudresourcemanager.googleapis.com/organizations/123.
            + Folders, such as
              //cloudresourcemanager.googleapis.com/folders/123.
            + Projects, such as
              //cloudresourcemanager.googleapis.com/projects/123 or
              //cloudresourcemanager.googleapis.com/projects/my-project-id.

        Shorthand Example:

            --details-rules=description=string,effect=string,resources=[string] --details-rules=description=string,effect=string,resources=[string]

        JSON Example:

            --details-rules='[{"description": "string", "effect": "string", "resources": ["string"]}]'

        File Example:

            --details-rules=path_to_file.(yaml|json)

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --details-enforcement-version=DETAILS_ENFORCEMENT_VERSION
        The version number (for example, 1 or latest) that indicates which
        permissions are able to be blocked by the policy. If empty, the PAB
        policy version will be set to the most recent version number at the
        time of the policy's creation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v3 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud beta iam principal-access-boundary-policies create
```

### gcloud iam principal-access-boundary-policies delete

```text
NAME
    gcloud iam principal-access-boundary-policies delete - delete
        PrincipalAccessBoundaryPolicy instance

SYNOPSIS
    gcloud iam principal-access-boundary-policies delete
        (PRINCIPAL_ACCESS_BOUNDARY_POLICY
          : --location=LOCATION --organization=ORGANIZATION) [--async]
        [--etag=ETAG] [--force] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete PrincipalAccessBoundaryPolicy instance.

EXAMPLES
    To delete my-policy instance in organization 123, run:

        $ gcloud iam principal-access-boundary-policies delete my-policy \
            --organization=123 --location=global

POSITIONAL ARGUMENTS
     PrincipalAccessBoundaryPolicy resource - The name of the principal access
     boundary policy to delete.

     Format:
     organizations/{organization_id}/locations/{location}/principalAccessBoundaryPolicies/{principal_access_boundary_policy_id}
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       PRINCIPAL_ACCESS_BOUNDARY_POLICY
          ID of the principalAccessBoundaryPolicy or fully qualified identifier
          for the principalAccessBoundaryPolicy.

          To set the principal_access_boundary_policy attribute:
          + provide the argument principal_access_boundary_policy on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the principalAccessBoundaryPolicy resource.

          To set the location attribute:
          + provide the argument principal_access_boundary_policy on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the principalAccessBoundaryPolicy resource.

          To set the organization attribute:
          + provide the argument principal_access_boundary_policy on the
            command line with a fully specified name;
          + provide the argument --organization on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        The etag of the principal access boundary policy. If this is provided,
        it must match the server's etag.

     --force
        If set to true, the request will force the deletion of the policy even
        if the policy is referenced in policy bindings.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v3 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud beta iam principal-access-boundary-policies delete
```

### gcloud iam principal-access-boundary-policies describe

```text
NAME
    gcloud iam principal-access-boundary-policies describe - get
        PrincipalAccessBoundaryPolicy instance

SYNOPSIS
    gcloud iam principal-access-boundary-policies describe
        (PRINCIPAL_ACCESS_BOUNDARY_POLICY
          : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get PrincipalAccessBoundaryPolicy instance.

EXAMPLES
    To get the details of a single policy my-policy in organization 123, run:

        $ gcloud iam principal-access-boundary-policies describe my-policy \
            --organization=123 --location=global

POSITIONAL ARGUMENTS
     PrincipalAccessBoundaryPolicy resource - The name of the principal access
     boundary policy to retrieve.

     Format:
     organizations/{organization_id}/locations/{location}/principalAccessBoundaryPolicies/{principal_access_boundary_policy_id}
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       PRINCIPAL_ACCESS_BOUNDARY_POLICY
          ID of the principalAccessBoundaryPolicy or fully qualified identifier
          for the principalAccessBoundaryPolicy.

          To set the principal_access_boundary_policy attribute:
          + provide the argument principal_access_boundary_policy on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the principalAccessBoundaryPolicy resource.

          To set the location attribute:
          + provide the argument principal_access_boundary_policy on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the principalAccessBoundaryPolicy resource.

          To set the organization attribute:
          + provide the argument principal_access_boundary_policy on the
            command line with a fully specified name;
          + provide the argument --organization on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v3 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud beta iam principal-access-boundary-policies describe
```

### gcloud iam principal-access-boundary-policies list

```text
NAME
    gcloud iam principal-access-boundary-policies list - list
        PrincipalAccessBoundaryPolicy instances

SYNOPSIS
    gcloud iam principal-access-boundary-policies list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List PrincipalAccessBoundaryPolicy instances.

EXAMPLES
    To list all policy instances in organization 123, run:

        $ gcloud iam principal-access-boundary-policies list \
            --organization=123 --location=global

REQUIRED FLAGS
     Location resource - The parent resource, which owns the collection of
     principal access boundary policies.

     Format: organizations/{organization_id}/locations/{location} The arguments
     in this group can be used to specify the attributes of this resource.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --organization=ORGANIZATION
          The organization id of the location resource.

          To set the organization attribute:
          + provide the argument --location on the command line with a fully
            specified name;
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
    This command uses the iam/v3 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud beta iam principal-access-boundary-policies list
```

### gcloud iam principal-access-boundary-policies search-policy-bindings

```text
NAME
    gcloud iam principal-access-boundary-policies search-policy-bindings -
        search Principal Access Boundary Policy Bindings

SYNOPSIS
    gcloud iam principal-access-boundary-policies search-policy-bindings
        (PRINCIPAL_ACCESS_BOUNDARY_POLICY
          : --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Search all policy bindings that bind a specific policy if a user has
    searchPolicyBindings permission on that policy.

EXAMPLES
    To search policy bindings associated with Principal Access Boundary Policy,
    run:

    $ gcloud iam principal-access-boundary-policies \        search-policy-bindings my-policy --organization=123 \
        --location=global

POSITIONAL ARGUMENTS
     PrincipalAccessBoundaryPolicy resource - The name of the principal access
     boundary policy. Format:
     organizations/{organization_id}/locations/{location}/principalAccessBoundaryPolicies/{principal_access_boundary_policy_id}
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       PRINCIPAL_ACCESS_BOUNDARY_POLICY
          ID of the principalAccessBoundaryPolicy or fully qualified identifier
          for the principalAccessBoundaryPolicy.

          To set the principal_access_boundary_policy attribute:
          + provide the argument principal_access_boundary_policy on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the principalAccessBoundaryPolicy resource.

          To set the location attribute:
          + provide the argument principal_access_boundary_policy on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the principalAccessBoundaryPolicy resource.

          To set the organization attribute:
          + provide the argument principal_access_boundary_policy on the
            command line with a fully specified name;
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
    This command uses the iam/v3 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud beta iam principal-access-boundary-policies \
            search-policy-bindings
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud iam principal-access-boundary-policies search-policy-bindings my-policy \
    --organization=123 \
    --location=global
```

### gcloud iam principal-access-boundary-policies update

```text
NAME
    gcloud iam principal-access-boundary-policies update - update
        PrincipalAccessBoundaryPolicy instance

SYNOPSIS
    gcloud iam principal-access-boundary-policies update
        (PRINCIPAL_ACCESS_BOUNDARY_POLICY
          : --location=LOCATION --organization=ORGANIZATION) [--async]
        [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--annotations=[ANNOTATIONS,...]
          | --update-annotations=[UPDATE_ANNOTATIONS,...] --clear-annotations
          | --remove-annotations=REMOVE_ANNOTATIONS]
        [--clear-details
          --details-enforcement-version=DETAILS_ENFORCEMENT_VERSION
          --details-rules=[description=DESCRIPTION],
          [effect=EFFECT],[resources=RESOURCES]
          | --add-details-rules=[description=DESCRIPTION],
          [effect=EFFECT],[resources=RESOURCES] --clear-details-rules
          | --remove-details-rules=[description=DESCRIPTION],
          [effect=EFFECT],[resources=RESOURCES]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update PrincipalAccessBoundaryPolicy instance.

EXAMPLES
    To update display name of my-policy in organization 123, run:

        $ gcloud iam principal-access-boundary-policies update my-policy \
            --organization=123 --location=global \
            --display-name=new-display-name

POSITIONAL ARGUMENTS
     PrincipalAccessBoundaryPolicy resource - Identifier. The resource name of
     the principal access boundary policy.

     The following format is supported:
     organizations/{organization_id}/locations/{location}/principalAccessBoundaryPolicies/{policy_id}
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       PRINCIPAL_ACCESS_BOUNDARY_POLICY
          ID of the principalAccessBoundaryPolicy or fully qualified identifier
          for the principalAccessBoundaryPolicy.

          To set the principal_access_boundary_policy attribute:
          + provide the argument principal_access_boundary_policy on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the principalAccessBoundaryPolicy resource.

          To set the location attribute:
          + provide the argument principal_access_boundary_policy on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the principalAccessBoundaryPolicy resource.

          To set the organization attribute:
          + provide the argument principal_access_boundary_policy on the
            command line with a fully specified name;
          + provide the argument --organization on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        The description of the principal access boundary policy. Must be less
        than or equal to 63 characters.

     --etag=ETAG
        The etag for the principal access boundary. If this is provided on
        update, it must match the server's etag.

     Update annotations.

     At most one of these can be specified:

       --annotations=[ANNOTATIONS,...]
          Set annotations to new value. User defined annotations. See
          https://google.aip.dev/148#annotations for more details such as
          format and size limitations.

           KEY
              Sets KEY value.

           VALUE
              Sets VALUE value.

          Shorthand Example:

              --annotations=string=string

          JSON Example:

              --annotations='{"string": "string"}'

          File Example:

              --annotations=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --update-annotations=[UPDATE_ANNOTATIONS,...]
            Update annotations value or add key value pair. User defined
            annotations. See https://google.aip.dev/148#annotations for more
            details such as format and size limitations.

             KEY
                Sets KEY value.

             VALUE
                Sets VALUE value.

            Shorthand Example:

                --update-annotations=string=string

            JSON Example:

                --update-annotations='{"string": "string"}'

            File Example:

                --update-annotations=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-annotations
              Clear annotations value and set to empty map.

           --remove-annotations=REMOVE_ANNOTATIONS
              Remove existing value from map annotations. Sets
              remove_annotations value.

              Shorthand Example:

                  --remove-annotations=string,string

              JSON Example:

                  --remove-annotations=["string"]

              File Example:

                  --remove-annotations=path_to_file.(yaml|json)

     Principal access boundary policy details

     --clear-details
        Set googleIamV3PrincipalAccessBoundaryPolicy.details back to default
        value.

     --details-enforcement-version=DETAILS_ENFORCEMENT_VERSION
        The version number (for example, 1 or latest) that indicates which
        permissions are able to be blocked by the policy. If empty, the PAB
        policy version will be set to the most recent version number at the
        time of the policy's creation.

     Update details_rules.

     At most one of these can be specified:

       --details-rules=[description=DESCRIPTION],[effect=EFFECT],[resources=RESOURCES]
          Set details_rules to new value. A list of principal access boundary
          policy rules. The number of rules in a policy is limited to 500.

           description
              The description of the principal access boundary policy rule.
              Must be less than or equal to 256 characters.

           effect
              The access relationship of principals to the resources in this
              rule.

           resources
              A list of Resource Manager resources. If a resource is listed in
              the rule, then the rule applies for that resource and its
              descendants. The number of resources in a policy is limited to
              500 across all rules in the policy.

              The following resource types are supported:

              - Organizations, such as
                //cloudresourcemanager.googleapis.com/organizations/123.
              - Folders, such as
                //cloudresourcemanager.googleapis.com/folders/123.
              - Projects, such as
                //cloudresourcemanager.googleapis.com/projects/123 or
                //cloudresourcemanager.googleapis.com/projects/my-project-id.

          Shorthand Example:

              --details-rules=description=string,effect=string,resources=[string] --details-rules=description=string,effect=string,resources=[string]

          JSON Example:

              --details-rules='[{"description": "string", "effect": "string", "resources": ["string"]}]'

          File Example:

              --details-rules=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --add-details-rules=[description=DESCRIPTION],[effect=EFFECT],[resources=RESOURCES]
            Add new value to details_rules list. A list of principal access
            boundary policy rules. The number of rules in a policy is limited
            to 500.

             description
                The description of the principal access boundary policy rule.
                Must be less than or equal to 256 characters.

             effect
                The access relationship of principals to the resources in this
                rule.

             resources
                A list of Resource Manager resources. If a resource is listed
                in the rule, then the rule applies for that resource and its
                descendants. The number of resources in a policy is limited to
                500 across all rules in the policy.

                The following resource types are supported:

                o Organizations, such as
                  //cloudresourcemanager.googleapis.com/organizations/123.
                o Folders, such as
                  //cloudresourcemanager.googleapis.com/folders/123.
                o Projects, such as
                  //cloudresourcemanager.googleapis.com/projects/123 or
                  //cloudresourcemanager.googleapis.com/projects/my-project-id.

            Shorthand Example:

                --add-details-rules=description=string,effect=string,resources=[string] --add-details-rules=description=string,effect=string,resources=[string]

            JSON Example:

                --add-details-rules='[{"description": "string", "effect": "string", "resources": ["string"]}]'

            File Example:

                --add-details-rules=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-details-rules
              Clear details_rules value and set to empty list.

           --remove-details-rules=[description=DESCRIPTION],[effect=EFFECT],[resources=RESOURCES]
              Remove existing value from details_rules list. A list of
              principal access boundary policy rules. The number of rules in a
              policy is limited to 500.

               description
                  The description of the principal access boundary policy rule.
                  Must be less than or equal to 256 characters.

               effect
                  The access relationship of principals to the resources in
                  this rule.

               resources
                  A list of Resource Manager resources. If a resource is listed
                  in the rule, then the rule applies for that resource and its
                  descendants. The number of resources in a policy is limited
                  to 500 across all rules in the policy.

                  The following resource types are supported:

                  * Organizations, such as
                    //cloudresourcemanager.googleapis.com/organizations/123.
                  * Folders, such as
                    //cloudresourcemanager.googleapis.com/folders/123.
                  * Projects, such as
                    //cloudresourcemanager.googleapis.com/projects/123 or
                    //cloudresourcemanager.googleapis.com/projects/my-project-id.

              Shorthand Example:

                  --remove-details-rules=description=string,effect=string,resources=[string] --remove-details-rules=description=string,effect=string,resources=[string]

              JSON Example:

                  --remove-details-rules='[{"description": "string", "effect": "string", "resources": ["string"]}]'

              File Example:

                  --remove-details-rules=path_to_file.(yaml|json)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v3 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud beta iam principal-access-boundary-policies update
```

### gcloud beta iam principal-access-boundary-policies create

```text
NAME
    gcloud beta iam principal-access-boundary-policies create - create
        PrincipalAccessBoundaryPolicy instance

SYNOPSIS
    gcloud beta iam principal-access-boundary-policies create
        (PRINCIPAL_ACCESS_BOUNDARY_POLICY
          : --location=LOCATION --organization=ORGANIZATION)
        [--annotations=[ANNOTATIONS,...]] [--async]
        [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [[--details-rules=[description=DESCRIPTION],
          [effect=EFFECT],[resources=RESOURCES]
          : --details-enforcement-version=DETAILS_ENFORCEMENT_VERSION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam principal-access-boundary-policies delete

```text
NAME
    gcloud beta iam principal-access-boundary-policies delete - delete
        PrincipalAccessBoundaryPolicy instance

SYNOPSIS
    gcloud beta iam principal-access-boundary-policies delete
        (PRINCIPAL_ACCESS_BOUNDARY_POLICY
          : --location=LOCATION --organization=ORGANIZATION) [--async]
        [--etag=ETAG] [--force] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam principal-access-boundary-policies describe

```text
NAME
    gcloud beta iam principal-access-boundary-policies describe - get
        PrincipalAccessBoundaryPolicy instance

SYNOPSIS
    gcloud beta iam principal-access-boundary-policies describe
        (PRINCIPAL_ACCESS_BOUNDARY_POLICY
          : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam principal-access-boundary-policies list

```text
NAME
    gcloud beta iam principal-access-boundary-policies list - list
        PrincipalAccessBoundaryPolicy instances

SYNOPSIS
    gcloud beta iam principal-access-boundary-policies list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam principal-access-boundary-policies search-policy-bindings

```text
NAME
    gcloud beta iam principal-access-boundary-policies search-policy-bindings -
        search Principal Access Boundary Policy Bindings

SYNOPSIS
    gcloud beta iam principal-access-boundary-policies search-policy-bindings
        (PRINCIPAL_ACCESS_BOUNDARY_POLICY
          : --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam principal-access-boundary-policies update

```text
NAME
    gcloud beta iam principal-access-boundary-policies update - update
        PrincipalAccessBoundaryPolicy instance

SYNOPSIS
    gcloud beta iam principal-access-boundary-policies update
        (PRINCIPAL_ACCESS_BOUNDARY_POLICY
          : --location=LOCATION --organization=ORGANIZATION) [--async]
        [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--annotations=[ANNOTATIONS,...]
          | --update-annotations=[UPDATE_ANNOTATIONS,...] --clear-annotations
          | --remove-annotations=REMOVE_ANNOTATIONS]
        [--clear-details
          --details-enforcement-version=DETAILS_ENFORCEMENT_VERSION
          --details-rules=[description=DESCRIPTION],
          [effect=EFFECT],[resources=RESOURCES]
          | --add-details-rules=[description=DESCRIPTION],
          [effect=EFFECT],[resources=RESOURCES] --clear-details-rules
          | --remove-details-rules=[description=DESCRIPTION],
          [effect=EFFECT],[resources=RESOURCES]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/principal-access-boundary-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
