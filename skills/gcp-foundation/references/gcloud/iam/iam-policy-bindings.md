---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/policy-bindings
---

# gcloud iam policy-bindings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam policy-bindings create

```text
NAME
    gcloud iam policy-bindings create - create PolicyBinding instance

SYNOPSIS
    gcloud iam policy-bindings create
        (POLICY_BINDING
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        --policy=POLICY
        (--target-principal-set=TARGET_PRINCIPAL_SET
          | --target-resource=TARGET_RESOURCE)
        [--annotations=[ANNOTATIONS,...]] [--async]
        [--display-name=DISPLAY_NAME] [--etag=ETAG] [--policy-kind=POLICY_KIND]
        [--condition-description=CONDITION_DESCRIPTION
          --condition-expression=CONDITION_EXPRESSION
          --condition-location=CONDITION_LOCATION
          --condition-title=CONDITION_TITLE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create PolicyBinding instance.

EXAMPLES
    To create a policy binding instance called my-binding that references a
    principal access boundary policy run:

        $ gcloud iam policy-bindings create my-binding --organization=123 \
            --location=global \
            --policy=organizations/123/locations/global/\
        principalAccessBoundaryPolicies/my-policy \
            --target-principal-set=//cloudresourcemanager.googleapis.com/\
        organizations/123

POSITIONAL ARGUMENTS
     PolicyBinding resource - Identifier. The name of the policy binding, in
     the format
     {binding_parent/locations/{location}/policyBindings/{policy_binding_id}.
     The binding parent is the closest Resource Manager resource (project,
     folder, or organization) to the binding target.

     Format:

      * projects/{project_id}/locations/{location}/policyBindings/{policy_binding_id}
      * projects/{project_number}/locations/{location}/policyBindings/{policy_binding_id}
      * folders/{folder_id}/locations/{location}/policyBindings/{policy_binding_id}
      * organizations/{organization_id}/locations/{location}/policyBindings/{policy_binding_id}
        The arguments in this group can be used to specify the attributes of
        this resource. (NOTE) Some attributes are not given arguments in this
        group but can be set in other ways.

     To set the project attribute:
      * provide the argument policy_binding on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [iam.folders.locations.policyBindings,
        iam.organizations.locations.policyBindings,
        iam.projects.locations.policyBindings].

     This must be specified.

       POLICY_BINDING
          ID of the policyBinding or fully qualified identifier for the
          policyBinding.

          To set the policy_binding attribute:
          + provide the argument policy_binding on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The folder id of the policyBinding resource.

          To set the folder attribute:
          + provide the argument policy_binding on the command line with a
            fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [iam.folders.locations.policyBindings].

       --location=LOCATION
          The location id of the policyBinding resource.

          To set the location attribute:
          + provide the argument policy_binding on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the policyBinding resource.

          To set the organization attribute:
          + provide the argument policy_binding on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [iam.organizations.locations.policyBindings].

REQUIRED FLAGS
     --policy=POLICY
        The resource name of the policy to be bound. The binding parent and
        policy must belong to the same organization.

     The full resource name of the resource to which the policy will be bound.
     Immutable once set.

     This must be specified.

       Arguments for the target.

       At most one of these can be specified:

         --target-principal-set=TARGET_PRINCIPAL_SET
            The full resource name that's used for principal access boundary
            policy bindings. The principal set must be directly parented by the
            policy binding's parent or same as the parent if the target is a
            project, folder, or organization.

            Examples:

            - For bindings parented by an organization:
              o Organization:
                //cloudresourcemanager.googleapis.com/organizations/ORGANIZATION_ID
              o Workforce Identity:
                //iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID
              o Workspace Identity:
                //iam.googleapis.com/locations/global/workspace/WORKSPACE_ID
            - For bindings parented by a folder:
              o Folder:
                //cloudresourcemanager.googleapis.com/folders/FOLDER_ID
            - For bindings parented by a project:
              o Project:
                * //cloudresourcemanager.googleapis.com/projects/PROJECT_NUMBER
                * //cloudresourcemanager.googleapis.com/projects/PROJECT_ID
              o Workload Identity Pool:
                //iam.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION/workloadIdentityPools/WORKLOAD_POOL_ID

         --target-resource=TARGET_RESOURCE
            The full resource name that's used for access policy bindings.

            Examples:

                * Organization:
                  //cloudresourcemanager.googleapis.com/organizations/ORGANIZATION_ID
                * Folder:
                  //cloudresourcemanager.googleapis.com/folders/FOLDER_ID
                * Project:
                  + //cloudresourcemanager.googleapis.com/projects/PROJECT_NUMBER
                  + //cloudresourcemanager.googleapis.com/projects/PROJECT_ID

OPTIONAL FLAGS
     --annotations=[ANNOTATIONS,...]
        User-defined annotations. See https://google.aip.dev/148#annotations
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
        The description of the policy binding. Must be less than or equal to 63
        characters.

     --etag=ETAG
        The etag for the policy binding. If this is provided on update, it must
        match the server's etag.

     --policy-kind=POLICY_KIND
        The kind of the policy to attach in this binding. This field must be
        one of the following:

        * Left empty (will be automatically set to the policy kind)
        * The input policy kind.

        POLICY_KIND must be one of:

         access
            Access policy kind.
         principal-access-boundary
            Principal access boundary policy kind

     Represents a textual expression in the Common Expression Language (CEL)
     syntax. CEL is a C-like expression language. The syntax and semantics of
     CEL are documented at https://github.com/google/cel-spec.

     Example (Comparison):

         title: "Summary size limit"
         description: "Determines if a summary is less than 100 chars"
         expression: "document.summary.size() < 100"

     Example (Equality):

         title: "Requestor is owner"
         description: "Determines if requestor is the document owner"
         expression: "document.owner == request.auth.claims.email"

     Example (Logic):

         title: "Public documents"
         description: "Determine whether the document should be publicly visible"
         expression: "document.type != 'private' && document.type != 'internal'"

     Example (Data Manipulation):

         title: "Notification string"
         description: "Create a notification string with a timestamp."
         expression: "'New message received at ' + string(document.create_time)"

     The exact variables and functions that may be referenced within an
     expression are determined by the service that evaluates it. See the
     service documentation for additional information.

     --condition-description=CONDITION_DESCRIPTION
        Description of the expression. This is a longer text which describes
        the expression, e.g. when hovered over it in a UI.

     --condition-expression=CONDITION_EXPRESSION
        Textual representation of an expression in Common Expression Language
        syntax.

     --condition-location=CONDITION_LOCATION
        String indicating the location of the expression for error reporting,
        e.g. a file name and a position in the file.

     --condition-title=CONDITION_TITLE
        Title for the expression, i.e. a short string describing its purpose.
        This can be used e.g. in UIs which allow to enter the expression.

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

        $ gcloud beta iam policy-bindings create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud iam policy-bindings create my-binding \
    --organization=123 \
    --location=global \
    --policy=organizations/123/locations/global/principalAccessBoundaryPolicies/my-policy \
    --target-principal-set=//cloudresourcemanager.googleapis.com/organizations/123
```

### gcloud iam policy-bindings delete

```text
NAME
    gcloud iam policy-bindings delete - delete PolicyBinding instance

SYNOPSIS
    gcloud iam policy-bindings delete
        (POLICY_BINDING
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--async] [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete PolicyBinding instance.

EXAMPLES
    To delete my-binding instance in organization 123 run:

        $ gcloud iam policy-bindings delete my-binding --organization=123 \
            --location=global

POSITIONAL ARGUMENTS
     PolicyBinding resource - The name of the policy binding to delete.

     Format:

      * projects/{project_id}/locations/{location}/policyBindings/{policy_binding_id}
      * projects/{project_number}/locations/{location}/policyBindings/{policy_binding_id}
      * folders/{folder_id}/locations/{location}/policyBindings/{policy_binding_id}
      * organizations/{organization_id}/locations/{location}/policyBindings/{policy_binding_id}
        The arguments in this group can be used to specify the attributes of
        this resource. (NOTE) Some attributes are not given arguments in this
        group but can be set in other ways.

     To set the project attribute:
      * provide the argument policy_binding on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [iam.folders.locations.policyBindings,
        iam.organizations.locations.policyBindings,
        iam.projects.locations.policyBindings].

     This must be specified.

       POLICY_BINDING
          ID of the policyBinding or fully qualified identifier for the
          policyBinding.

          To set the policy_binding attribute:
          + provide the argument policy_binding on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The folder id of the policyBinding resource.

          To set the folder attribute:
          + provide the argument policy_binding on the command line with a
            fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [iam.folders.locations.policyBindings].

       --location=LOCATION
          The location id of the policyBinding resource.

          To set the location attribute:
          + provide the argument policy_binding on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the policyBinding resource.

          To set the organization attribute:
          + provide the argument policy_binding on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [iam.organizations.locations.policyBindings].

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        The etag of the policy binding. If this is provided, it must match the
        server's etag.

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

        $ gcloud beta iam policy-bindings delete
```

### gcloud iam policy-bindings describe

```text
NAME
    gcloud iam policy-bindings describe - get PolicyBinding instance

SYNOPSIS
    gcloud iam policy-bindings describe
        (POLICY_BINDING
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get PolicyBinding instance.

EXAMPLES
    To get the details of a single policy binding my-binding in organization
    123 run:

        $ gcloud iam policy-bindings describe my-binding \
            --organization=123 --location=global

POSITIONAL ARGUMENTS
     PolicyBinding resource - The name of the policy binding to retrieve.

     Format:

      * projects/{project_id}/locations/{location}/policyBindings/{policy_binding_id}
      * projects/{project_number}/locations/{location}/policyBindings/{policy_binding_id}
      * folders/{folder_id}/locations/{location}/policyBindings/{policy_binding_id}
      * organizations/{organization_id}/locations/{location}/policyBindings/{policy_binding_id}
        The arguments in this group can be used to specify the attributes of
        this resource. (NOTE) Some attributes are not given arguments in this
        group but can be set in other ways.

     To set the project attribute:
      * provide the argument policy_binding on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [iam.folders.locations.policyBindings,
        iam.organizations.locations.policyBindings,
        iam.projects.locations.policyBindings].

     This must be specified.

       POLICY_BINDING
          ID of the policyBinding or fully qualified identifier for the
          policyBinding.

          To set the policy_binding attribute:
          + provide the argument policy_binding on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The folder id of the policyBinding resource.

          To set the folder attribute:
          + provide the argument policy_binding on the command line with a
            fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [iam.folders.locations.policyBindings].

       --location=LOCATION
          The location id of the policyBinding resource.

          To set the location attribute:
          + provide the argument policy_binding on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the policyBinding resource.

          To set the organization attribute:
          + provide the argument policy_binding on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [iam.organizations.locations.policyBindings].

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

        $ gcloud beta iam policy-bindings describe
```

### gcloud iam policy-bindings list

```text
NAME
    gcloud iam policy-bindings list - list PolicyBinding instances

SYNOPSIS
    gcloud iam policy-bindings list
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List PolicyBinding instances.

EXAMPLES
    To list all policy binding instances in project my-project run:

        $ gcloud iam policy-bindings list --project=my-project \
            --location=global

REQUIRED FLAGS
     Location resource - The parent resource, which owns the collection of
     policy bindings.

     Format:

      * projects/{project_id}/locations/{location}
      * projects/{project_number}/locations/{location}
      * folders/{folder_id}/locations/{location}
      * organizations/{organization_id}/locations/{location} The arguments in
        this group can be used to specify the attributes of this resource.
        (NOTE) Some attributes are not given arguments in this group but can be
        set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [iam.folders.locations, iam.organizations.locations,
        iam.projects.locations].

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --folder=FOLDER
          The folder id of the location resource.

          To set the folder attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type [iam.folders.locations].

       --organization=ORGANIZATION
          The organization id of the location resource.

          To set the organization attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type [iam.organizations.locations].

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

        $ gcloud beta iam policy-bindings list
```

### gcloud iam policy-bindings search-target-policy-bindings

```text
NAME
    gcloud iam policy-bindings search-target-policy-bindings - search policy
        bindings by target

SYNOPSIS
    gcloud iam policy-bindings search-target-policy-bindings --target=TARGET
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Search policy bindings by target.

EXAMPLES
    To search for policy bindings with target, run:

        $ gcloud iam policy-bindings search-target-policy-bindings \
            --organization=123 --location=global \
            --target=//cloudresourcemanager.googleapis.com/organizations/123

REQUIRED FLAGS
     --target=TARGET
        The target resource, which is bound to the policy in the binding.

        Format:

        * //iam.googleapis.com/locations/global/workforcePools/POOL_ID
        * //iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID
        * //iam.googleapis.com/locations/global/workspace/WORKSPACE_ID
        * //cloudresourcemanager.googleapis.com/projects/{project_number}
        * //cloudresourcemanager.googleapis.com/folders/{folder_id}
        * //cloudresourcemanager.googleapis.com/organizations/{organization_id}

     Location resource - The parent resource where this search will be
     performed. This should be the nearest Resource Manager resource (project,
     folder, or organization) to the target.

     Format:

      * projects/{project_id}/locations/{location}
      * projects/{project_number}/locations/{location}
      * folders/{folder_id}/locations/{location}
      * organizations/{organization_id}/locations/{location} The arguments in
        this group can be used to specify the attributes of this resource.
        (NOTE) Some attributes are not given arguments in this group but can be
        set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [iam.folders.locations, iam.organizations.locations,
        iam.projects.locations].

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --folder=FOLDER
          The folder id of the location resource.

          To set the folder attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type [iam.folders.locations].

       --organization=ORGANIZATION
          The organization id of the location resource.

          To set the organization attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type [iam.organizations.locations].

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

        $ gcloud beta iam policy-bindings search-target-policy-bindings
```

### gcloud iam policy-bindings update

```text
NAME
    gcloud iam policy-bindings update - update PolicyBinding instance

SYNOPSIS
    gcloud iam policy-bindings update
        (POLICY_BINDING
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--async] [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--annotations=[ANNOTATIONS,...]
          | --update-annotations=[UPDATE_ANNOTATIONS,...] --clear-annotations
          | --remove-annotations=REMOVE_ANNOTATIONS]
        [--clear-condition --condition-description=CONDITION_DESCRIPTION
          --condition-expression=CONDITION_EXPRESSION
          --condition-location=CONDITION_LOCATION
          --condition-title=CONDITION_TITLE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update PolicyBinding instance.

EXAMPLES
    To update display name of my-binding in organization 123 run:

        $ gcloud iam policy-bindings update my-binding --organization=123 \
            --location=global --display-name=new-display-name

POSITIONAL ARGUMENTS
     PolicyBinding resource - Identifier. The name of the policy binding, in
     the format
     {binding_parent/locations/{location}/policyBindings/{policy_binding_id}.
     The binding parent is the closest Resource Manager resource (project,
     folder, or organization) to the binding target.

     Format:

      * projects/{project_id}/locations/{location}/policyBindings/{policy_binding_id}
      * projects/{project_number}/locations/{location}/policyBindings/{policy_binding_id}
      * folders/{folder_id}/locations/{location}/policyBindings/{policy_binding_id}
      * organizations/{organization_id}/locations/{location}/policyBindings/{policy_binding_id}
        The arguments in this group can be used to specify the attributes of
        this resource. (NOTE) Some attributes are not given arguments in this
        group but can be set in other ways.

     To set the project attribute:
      * provide the argument policy_binding on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [iam.folders.locations.policyBindings,
        iam.organizations.locations.policyBindings,
        iam.projects.locations.policyBindings].

     This must be specified.

       POLICY_BINDING
          ID of the policyBinding or fully qualified identifier for the
          policyBinding.

          To set the policy_binding attribute:
          + provide the argument policy_binding on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The folder id of the policyBinding resource.

          To set the folder attribute:
          + provide the argument policy_binding on the command line with a
            fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [iam.folders.locations.policyBindings].

       --location=LOCATION
          The location id of the policyBinding resource.

          To set the location attribute:
          + provide the argument policy_binding on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the policyBinding resource.

          To set the organization attribute:
          + provide the argument policy_binding on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [iam.organizations.locations.policyBindings].

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        The description of the policy binding. Must be less than or equal to 63
        characters.

     --etag=ETAG
        The etag for the policy binding. If this is provided on update, it must
        match the server's etag.

     Update annotations.

     At most one of these can be specified:

       --annotations=[ANNOTATIONS,...]
          Set annotations to new value. User-defined annotations. See
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
            Update annotations value or add key value pair. User-defined
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

     Represents a textual expression in the Common Expression Language (CEL)
     syntax. CEL is a C-like expression language. The syntax and semantics of
     CEL are documented at https://github.com/google/cel-spec.

     Example (Comparison):

         title: "Summary size limit"
         description: "Determines if a summary is less than 100 chars"
         expression: "document.summary.size() < 100"

     Example (Equality):

         title: "Requestor is owner"
         description: "Determines if requestor is the document owner"
         expression: "document.owner == request.auth.claims.email"

     Example (Logic):

         title: "Public documents"
         description: "Determine whether the document should be publicly visible"
         expression: "document.type != 'private' && document.type != 'internal'"

     Example (Data Manipulation):

         title: "Notification string"
         description: "Create a notification string with a timestamp."
         expression: "'New message received at ' + string(document.create_time)"

     The exact variables and functions that may be referenced within an
     expression are determined by the service that evaluates it. See the
     service documentation for additional information.

     --clear-condition
        Set googleIamV3PolicyBinding.condition back to default value.

     --condition-description=CONDITION_DESCRIPTION
        Description of the expression. This is a longer text which describes
        the expression, e.g. when hovered over it in a UI.

     --condition-expression=CONDITION_EXPRESSION
        Textual representation of an expression in Common Expression Language
        syntax.

     --condition-location=CONDITION_LOCATION
        String indicating the location of the expression for error reporting,
        e.g. a file name and a position in the file.

     --condition-title=CONDITION_TITLE
        Title for the expression, i.e. a short string describing its purpose.
        This can be used e.g. in UIs which allow to enter the expression.

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

        $ gcloud beta iam policy-bindings update
```

### gcloud beta iam policy-bindings create

```text
NAME
    gcloud beta iam policy-bindings create - create PolicyBinding instance

SYNOPSIS
    gcloud beta iam policy-bindings create
        (POLICY_BINDING
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        --policy=POLICY
        (--target-principal-set=TARGET_PRINCIPAL_SET
          | --target-resource=TARGET_RESOURCE)
        [--annotations=[ANNOTATIONS,...]] [--async]
        [--display-name=DISPLAY_NAME] [--etag=ETAG] [--policy-kind=POLICY_KIND]
        [--condition-description=CONDITION_DESCRIPTION
          --condition-expression=CONDITION_EXPRESSION
          --condition-location=CONDITION_LOCATION
          --condition-title=CONDITION_TITLE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam policy-bindings delete

```text
NAME
    gcloud beta iam policy-bindings delete - delete PolicyBinding instance

SYNOPSIS
    gcloud beta iam policy-bindings delete
        (POLICY_BINDING
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--async] [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam policy-bindings describe

```text
NAME
    gcloud beta iam policy-bindings describe - get PolicyBinding instance

SYNOPSIS
    gcloud beta iam policy-bindings describe
        (POLICY_BINDING
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam policy-bindings list

```text
NAME
    gcloud beta iam policy-bindings list - list PolicyBinding instances

SYNOPSIS
    gcloud beta iam policy-bindings list
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam policy-bindings search-target-policy-bindings

```text
NAME
    gcloud beta iam policy-bindings search-target-policy-bindings - search
        policy bindings by target

SYNOPSIS
    gcloud beta iam policy-bindings search-target-policy-bindings
        --target=TARGET
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam policy-bindings update

```text
NAME
    gcloud beta iam policy-bindings update - update PolicyBinding instance

SYNOPSIS
    gcloud beta iam policy-bindings update
        (POLICY_BINDING
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--async] [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--annotations=[ANNOTATIONS,...]
          | --update-annotations=[UPDATE_ANNOTATIONS,...] --clear-annotations
          | --remove-annotations=REMOVE_ANNOTATIONS]
        [--clear-condition --condition-description=CONDITION_DESCRIPTION
          --condition-expression=CONDITION_EXPRESSION
          --condition-location=CONDITION_LOCATION
          --condition-title=CONDITION_TITLE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/policy-bindings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
