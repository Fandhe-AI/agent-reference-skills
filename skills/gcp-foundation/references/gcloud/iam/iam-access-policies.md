---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/access-policies
---

# gcloud iam access-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam access-policies create

```text
NAME
    gcloud iam access-policies create - create AccessPolicy instance

SYNOPSIS
    gcloud iam access-policies create
        (ACCESS_POLICY
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--annotations=[ANNOTATIONS,...]] [--async]
        [--details-rules=[conditions=CONDITIONS],[description=DESCRIPTION],
          [effect=EFFECT],[excludedPrincipals=EXCLUDEDPRINCIPALS],
          [operation=OPERATION],[principals=PRINCIPALS]]
        [--display-name=DISPLAY_NAME] [--etag=ETAG] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create AccessPolicy instance.

EXAMPLES
    To create a policy instance called my-policy, run:

        $ gcloud iam access-policies create my-policy --organization=123 \
            --location=global --details-rules=rule1.json

POSITIONAL ARGUMENTS
     AccessPolicy resource - Identifier. The resource name of the access
     policy.

     The following formats are supported:

      * projects/{project_id}/locations/{location}/accessPolicies/{policy_id}
      * projects/{project_number}/locations/{location}/accessPolicies/{policy_id}
      * folders/{folder_id}/locations/{location}/accessPolicies/{policy_id}
      * organizations/{organization_id}/locations/{location}/accessPolicies/{policy_id}
        The arguments in this group can be used to specify the attributes of
        this resource. (NOTE) Some attributes are not given arguments in this
        group but can be set in other ways.

     To set the project attribute:
      * provide the argument access_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [iam.folders.locations.accessPolicies,
        iam.organizations.locations.accessPolicies,
        iam.projects.locations.accessPolicies].

     This must be specified.

       ACCESS_POLICY
          ID of the accessPolicy or fully qualified identifier for the
          accessPolicy.

          To set the access_policy attribute:
          + provide the argument access_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The folder id of the accessPolicy resource.

          To set the folder attribute:
          + provide the argument access_policy on the command line with a
            fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [iam.folders.locations.accessPolicies].

       --location=LOCATION
          The location id of the accessPolicy resource.

          To set the location attribute:
          + provide the argument access_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the accessPolicy resource.

          To set the organization attribute:
          + provide the argument access_policy on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [iam.organizations.locations.accessPolicies].

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

     Access policy details.

     --details-rules=[conditions=CONDITIONS],[description=DESCRIPTION],[effect=EFFECT],[excludedPrincipals=EXCLUDEDPRINCIPALS],[operation=OPERATION],[principals=PRINCIPALS]
        Required, A list of access policy rules.

         conditions
            The conditions that determine whether this rule applies to a
            request. Conditions are identified by their key, which is the FQDN
            of the service that they are relevant to. For example:
            "conditions": { "iam.googleapis.com": { "expression": <cel
            expression> } }. Each rule is evaluated independently. If this rule
            does not apply to a request, other rules might still apply.
            Currently supported keys are as follows:

            + eventarc.googleapis.com: Can use CEL functions that evaluate
              resource fields.

            + iam.googleapis.com: Can use CEL functions that evaluate
              resource tags
              (https://cloud.google.com/iam/help/conditions/resource-tags) and
              combine them using boolean and logical operators. Other functions
              and operators are not supported.

             KEY
                Sets KEY value.

             VALUE
                Sets VALUE value.

                 description
                    Description of the expression. This is a longer text which
                    describes the expression, e.g. when hovered over it in a
                    UI.

                 expression
                    Textual representation of an expression in Common
                    Expression Language syntax.

                 location
                    String indicating the location of the expression for error
                    reporting, e.g. a file name and a position in the file.

                 title
                    Title for the expression, i.e. a short string describing
                    its purpose. This can be used e.g. in UIs which allow to
                    enter the expression.

         description
            Customer specified description of the rule. Must be less than or
            equal to 256 characters.

         effect
            The effect of the rule.

         excludedPrincipals
            The identities that are excluded from the access policy rule, even
            if they are listed in the principals. For example, you could add a
            Google group to the principals, then exclude specific users who
            belong to that group.

         operation
            Attributes that are used to determine whether this rule applies to
            a request.

             excludedPermissions
                Specifies the permissions that this rule excludes from the set
                of affected permissions given by permissions. If a permission
                appears in permissions and in excluded_permissions then it will
                not be subject to the policy effect.

                The excluded permissions can be specified using the same syntax
                as permissions.

             permissions
                The permissions that are explicitly affected by this rule. Each
                permission uses the format {service_fqdn}/{resource}.{verb},
                where {service_fqdn} is the fully qualified domain name for the
                service. Currently supported permissions are as follows:

                - eventarc.googleapis.com/messageBuses.publish.

         principals
            The identities for which this rule's effect governs using one or
            more permissions on Google Cloud resources. This field can contain
            the following values:

            + principal://goog/subject/{email_id}: A specific Google Account.
              Includes Gmail, Cloud Identity, and Google Workspace user
              accounts. For example,
              principal://goog/subject/alice@example.com.

            If an identifier that was previously set on a policy is soft
            deleted, then calls to read that policy will return the identifier
            with a deleted prefix. Users cannot set identifiers with this
            syntax.

            + deleted:principal://goog/subject/{email_id}?uid={uid}: A
              specific Google Account that was deleted recently. For example,
              deleted:principal://goog/subject/alice@example.com?uid=1234567890.
              If the Google Account is recovered, this identifier reverts to
              the standard identifier for a Google Account.

            + deleted:principalSet://goog/group/{group_id}?uid={uid}: A
              Google group that was deleted recently. For example,
              deleted:principalSet://goog/group/admins@example.com?uid=1234567890.
              If the Google group is restored, this identifier reverts to the
              standard identifier for a Google group.

            + deleted:principal://iam.googleapis.com/projects/-/serviceAccounts/{service_account_id}?uid={uid}:
              A Google Cloud service account that was deleted recently. For
              example,
              deleted:principal://iam.googleapis.com/projects/-/serviceAccounts/my-service-account@iam.gserviceaccount.com?uid=1234567890.
              If the service account is undeleted, this identifier reverts to
              the standard identifier for a service account.

        Shorthand Example:

            --details-rules=conditions={string={description=string,expression=string,location=string,title=string}},description=string,effect=string,excludedPrincipals=[string],operation={excludedPermissions=[string],permissions=[string]},principals=[string] --details-rules=conditions={string={description=string,expression=string,location=string,title=string}},description=string,effect=string,excludedPrincipals=[string],operation={excludedPermissions=[string],permissions=[string]},principals=[string]

        JSON Example:

            --details-rules='[{"conditions": {"string": {"description": "string", "expression": "string", "location": "string", "title": "string"}}, "description": "string", "effect": "string", "excludedPrincipals": ["string"], "operation": {"excludedPermissions": ["string"], "permissions": ["string"]}, "principals": ["string"]}]'

        File Example:

            --details-rules=path_to_file.(yaml|json)

     --display-name=DISPLAY_NAME
        The description of the access policy. Must be less than or equal to 63
        characters.

     --etag=ETAG
        The etag for the access policy. If this is provided on update, it must
        match the server's etag.

     --validate-only
        If set, validate the request and preview the creation, but do not
        actually post it.

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

        $ gcloud beta iam access-policies create
```

### gcloud iam access-policies delete

```text
NAME
    gcloud iam access-policies delete - delete AccessPolicy instance

SYNOPSIS
    gcloud iam access-policies delete
        (ACCESS_POLICY
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--async] [--etag=ETAG] [--force] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete AccessPolicy instance.

EXAMPLES
    To delete my-policy instance, run:

        $ gcloud iam access-policies delete my-policy

POSITIONAL ARGUMENTS
     AccessPolicy resource - The name of the access policy to delete.

     Format:
     projects/{project_id}/locations/{location}/accessPolicies/{access_policy_id}
     projects/{project_number}/locations/{location}/accessPolicies/{access_policy_id}
     folders/{folder_id}/locations/{location}/accessPolicies/{access_policy_id}
     organizations/{organization_id}/locations/{location}/accessPolicies/{access_policy_id}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument access_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [iam.folders.locations.accessPolicies,
        iam.organizations.locations.accessPolicies,
        iam.projects.locations.accessPolicies].

     This must be specified.

       ACCESS_POLICY
          ID of the accessPolicy or fully qualified identifier for the
          accessPolicy.

          To set the access_policy attribute:
          + provide the argument access_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The folder id of the accessPolicy resource.

          To set the folder attribute:
          + provide the argument access_policy on the command line with a
            fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [iam.folders.locations.accessPolicies].

       --location=LOCATION
          The location id of the accessPolicy resource.

          To set the location attribute:
          + provide the argument access_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the accessPolicy resource.

          To set the organization attribute:
          + provide the argument access_policy on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [iam.organizations.locations.accessPolicies].

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        The etag of the access policy. If this is provided, it must match the
        server's etag.

     --force
        If set to true, the request will force the deletion of the Policy even
        if the Policy references PolicyBindings.

     --validate-only
        If set, validate the request and preview the deletion, but do not
        actually post it.

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

        $ gcloud beta iam access-policies delete
```

### gcloud iam access-policies describe

```text
NAME
    gcloud iam access-policies describe - get AccessPolicy instance

SYNOPSIS
    gcloud iam access-policies describe
        (ACCESS_POLICY
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get AccessPolicy instance.

EXAMPLES
    To get the details of a single policy my-policy in organization 123, run:

        $ gcloud iam access-policies describe my-policy --organization=123 \
            --location=global

POSITIONAL ARGUMENTS
     AccessPolicy resource - The name of the access policy to retrieve.

     Format:
     projects/{project_id}/locations/{location}/accessPolicies/{access_policy_id}
     projects/{project_number}/locations/{location}/accessPolicies/{access_policy_id}
     folders/{folder_id}/locations/{location}/accessPolicies/{access_policy_id}
     organizations/{organization_id}/locations/{location}/accessPolicies/{access_policy_id}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument access_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [iam.folders.locations.accessPolicies,
        iam.organizations.locations.accessPolicies,
        iam.projects.locations.accessPolicies].

     This must be specified.

       ACCESS_POLICY
          ID of the accessPolicy or fully qualified identifier for the
          accessPolicy.

          To set the access_policy attribute:
          + provide the argument access_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The folder id of the accessPolicy resource.

          To set the folder attribute:
          + provide the argument access_policy on the command line with a
            fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [iam.folders.locations.accessPolicies].

       --location=LOCATION
          The location id of the accessPolicy resource.

          To set the location attribute:
          + provide the argument access_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the accessPolicy resource.

          To set the organization attribute:
          + provide the argument access_policy on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [iam.organizations.locations.accessPolicies].

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

        $ gcloud beta iam access-policies describe
```

### gcloud iam access-policies list

```text
NAME
    gcloud iam access-policies list - list AccessPolicy instances

SYNOPSIS
    gcloud iam access-policies list
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List AccessPolicy instances.

EXAMPLES
    To list all policy instances in organization 123, run:

        $ gcloud iam access-policies list --organization=123 \
            --location=global

REQUIRED FLAGS
     Location resource - The parent resource, which owns the collection of
     access policy resources.

     Format: projects/{project_id}/locations/{location}
     projects/{project_number}/locations/{location}
     folders/{folder_id}/locations/{location}
     organizations/{organization_id}/locations/{location} The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

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

        $ gcloud beta iam access-policies list
```

### gcloud iam access-policies search-policy-bindings

```text
NAME
    gcloud iam access-policies search-policy-bindings - search accessPolicies

SYNOPSIS
    gcloud iam access-policies search-policy-bindings
        (ACCESS_POLICY
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    search accessPolicies

EXAMPLES
    To search all accessPolicies, run:

        $ gcloud iam access-policies search-policy-bindings

POSITIONAL ARGUMENTS
     AccessPolicy resource - The name of the access policy. Format:
     organizations/{organization_id}/locations/{location}/accessPolicies/{access_policy_id}
     folders/{folder_id}/locations/{location}/accessPolicies/{access_policy_id}
     projects/{project_id}/locations/{location}/accessPolicies/{access_policy_id}
     projects/{project_number}/locations/{location}/accessPolicies/{access_policy_id}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument access_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [iam.folders.locations.accessPolicies,
        iam.organizations.locations.accessPolicies,
        iam.projects.locations.accessPolicies].

     This must be specified.

       ACCESS_POLICY
          ID of the accessPolicy or fully qualified identifier for the
          accessPolicy.

          To set the access_policy attribute:
          + provide the argument access_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The folder id of the accessPolicy resource.

          To set the folder attribute:
          + provide the argument access_policy on the command line with a
            fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [iam.folders.locations.accessPolicies].

       --location=LOCATION
          The location id of the accessPolicy resource.

          To set the location attribute:
          + provide the argument access_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the accessPolicy resource.

          To set the organization attribute:
          + provide the argument access_policy on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [iam.organizations.locations.accessPolicies].

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

        $ gcloud beta iam access-policies search-policy-bindings
```

### gcloud iam access-policies update

```text
NAME
    gcloud iam access-policies update - update AccessPolicy instance

SYNOPSIS
    gcloud iam access-policies update
        (ACCESS_POLICY
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--async] [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--[no-]validate-only]
        [--annotations=[ANNOTATIONS,...]
          | --update-annotations=[UPDATE_ANNOTATIONS,...] --clear-annotations
          | --remove-annotations=REMOVE_ANNOTATIONS]
        [--clear-details
          --details-rules=[conditions=CONDITIONS],[description=DESCRIPTION],
          [effect=EFFECT],[excludedPrincipals=EXCLUDEDPRINCIPALS],
          [operation=OPERATION],[principals=PRINCIPALS]
          | --add-details-rules=[conditions=CONDITIONS],
          [description=DESCRIPTION],[effect=EFFECT],
          [excludedPrincipals=EXCLUDEDPRINCIPALS],
          [operation=OPERATION],[principals=PRINCIPALS] --clear-details-rules
          | --remove-details-rules=[conditions=CONDITIONS],
          [description=DESCRIPTION],[effect=EFFECT],
          [excludedPrincipals=EXCLUDEDPRINCIPALS],
          [operation=OPERATION],[principals=PRINCIPALS]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update AccessPolicy instance.

EXAMPLES
    To update display name of my-policy in organization 123, run:

        $ gcloud iam access-policies update my-policy --organization=123 \
            --location=global --display-name=new-display-name

POSITIONAL ARGUMENTS
     AccessPolicy resource - Identifier. The resource name of the access
     policy.

     The following formats are supported:

      * projects/{project_id}/locations/{location}/accessPolicies/{policy_id}
      * projects/{project_number}/locations/{location}/accessPolicies/{policy_id}
      * folders/{folder_id}/locations/{location}/accessPolicies/{policy_id}
      * organizations/{organization_id}/locations/{location}/accessPolicies/{policy_id}
        The arguments in this group can be used to specify the attributes of
        this resource. (NOTE) Some attributes are not given arguments in this
        group but can be set in other ways.

     To set the project attribute:
      * provide the argument access_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [iam.folders.locations.accessPolicies,
        iam.organizations.locations.accessPolicies,
        iam.projects.locations.accessPolicies].

     This must be specified.

       ACCESS_POLICY
          ID of the accessPolicy or fully qualified identifier for the
          accessPolicy.

          To set the access_policy attribute:
          + provide the argument access_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The folder id of the accessPolicy resource.

          To set the folder attribute:
          + provide the argument access_policy on the command line with a
            fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [iam.folders.locations.accessPolicies].

       --location=LOCATION
          The location id of the accessPolicy resource.

          To set the location attribute:
          + provide the argument access_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the accessPolicy resource.

          To set the organization attribute:
          + provide the argument access_policy on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [iam.organizations.locations.accessPolicies].

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        The description of the access policy. Must be less than or equal to 63
        characters.

     --etag=ETAG
        The etag for the access policy. If this is provided on update, it must
        match the server's etag.

     --[no-]validate-only
        If set, validate the request and preview the update, but do not
        actually post it. Use --validate-only to enable and --no-validate-only
        to disable.

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

     Access policy details.

     --clear-details
        Set googleIamV3AccessPolicy.details back to default value.

     Update details_rules.

     At most one of these can be specified:

       --details-rules=[conditions=CONDITIONS],[description=DESCRIPTION],[effect=EFFECT],[excludedPrincipals=EXCLUDEDPRINCIPALS],[operation=OPERATION],[principals=PRINCIPALS]
          Set details_rules to new value. A list of access policy rules.

           conditions
              The conditions that determine whether this rule applies to a
              request. Conditions are identified by their key, which is the
              FQDN of the service that they are relevant to. For example:
              "conditions": { "iam.googleapis.com": { "expression": <cel
              expression> } }. Each rule is evaluated independently. If this
              rule does not apply to a request, other rules might still apply.
              Currently supported keys are as follows:

              - eventarc.googleapis.com: Can use CEL functions that evaluate
                resource fields.

              - iam.googleapis.com: Can use CEL functions that evaluate
                resource tags
                (https://cloud.google.com/iam/help/conditions/resource-tags)
                and combine them using boolean and logical operators. Other
                functions and operators are not supported.

               KEY
                  Sets KEY value.

               VALUE
                  Sets VALUE value.

                   description
                      Description of the expression. This is a longer text
                      which describes the expression, e.g. when hovered over it
                      in a UI.

                   expression
                      Textual representation of an expression in Common
                      Expression Language syntax.

                   location
                      String indicating the location of the expression for
                      error reporting, e.g. a file name and a position in the
                      file.

                   title
                      Title for the expression, i.e. a short string describing
                      its purpose. This can be used e.g. in UIs which allow to
                      enter the expression.

           description
              Customer specified description of the rule. Must be less than or
              equal to 256 characters.

           effect
              The effect of the rule.

           excludedPrincipals
              The identities that are excluded from the access policy rule,
              even if they are listed in the principals. For example, you could
              add a Google group to the principals, then exclude specific users
              who belong to that group.

           operation
              Attributes that are used to determine whether this rule applies
              to a request.

               excludedPermissions
                  Specifies the permissions that this rule excludes from the
                  set of affected permissions given by permissions. If a
                  permission appears in permissions and in excluded_permissions
                  then it will not be subject to the policy effect.

                  The excluded permissions can be specified using the same
                  syntax as permissions.

               permissions
                  The permissions that are explicitly affected by this rule.
                  Each permission uses the format
                  {service_fqdn}/{resource}.{verb}, where {service_fqdn} is the
                  fully qualified domain name for the service. Currently
                  supported permissions are as follows:

                  o eventarc.googleapis.com/messageBuses.publish.

           principals
              The identities for which this rule's effect governs using one or
              more permissions on Google Cloud resources. This field can
              contain the following values:

              - principal://goog/subject/{email_id}: A specific Google
                Account. Includes Gmail, Cloud Identity, and Google Workspace
                user accounts. For example,
                principal://goog/subject/alice@example.com.

              If an identifier that was previously set on a policy is soft
              deleted, then calls to read that policy will return the
              identifier with a deleted prefix. Users cannot set identifiers
              with this syntax.

              - deleted:principal://goog/subject/{email_id}?uid={uid}: A
                specific Google Account that was deleted recently. For example,
                deleted:principal://goog/subject/alice@example.com?uid=1234567890.
                If the Google Account is recovered, this identifier reverts to
                the standard identifier for a Google Account.

              - deleted:principalSet://goog/group/{group_id}?uid={uid}: A
                Google group that was deleted recently. For example,
                deleted:principalSet://goog/group/admins@example.com?uid=1234567890.
                If the Google group is restored, this identifier reverts to the
                standard identifier for a Google group.

              - deleted:principal://iam.googleapis.com/projects/-/serviceAccounts/{service_account_id}?uid={uid}:
                A Google Cloud service account that was deleted recently. For
                example,
                deleted:principal://iam.googleapis.com/projects/-/serviceAccounts/my-service-account@iam.gserviceaccount.com?uid=1234567890.
                If the service account is undeleted, this identifier reverts to
                the standard identifier for a service account.

          Shorthand Example:

              --details-rules=conditions={string={description=string,expression=string,location=string,title=string}},description=string,effect=string,excludedPrincipals=[string],operation={excludedPermissions=[string],permissions=[string]},principals=[string] --details-rules=conditions={string={description=string,expression=string,location=string,title=string}},description=string,effect=string,excludedPrincipals=[string],operation={excludedPermissions=[string],permissions=[string]},principals=[string]

          JSON Example:

              --details-rules='[{"conditions": {"string": {"description": "string", "expression": "string", "location": "string", "title": "string"}}, "description": "string", "effect": "string", "excludedPrincipals": ["string"], "operation": {"excludedPermissions": ["string"], "permissions": ["string"]}, "principals": ["string"]}]'

          File Example:

              --details-rules=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --add-details-rules=[conditions=CONDITIONS],[description=DESCRIPTION],[effect=EFFECT],[excludedPrincipals=EXCLUDEDPRINCIPALS],[operation=OPERATION],[principals=PRINCIPALS]
            Add new value to details_rules list. A list of access policy rules.

             conditions
                The conditions that determine whether this rule applies to a
                request. Conditions are identified by their key, which is the
                FQDN of the service that they are relevant to. For example:
                "conditions": { "iam.googleapis.com": { "expression": <cel
                expression> } }. Each rule is evaluated independently. If this
                rule does not apply to a request, other rules might still
                apply. Currently supported keys are as follows:

                o eventarc.googleapis.com: Can use CEL functions that
                  evaluate resource fields.

                o iam.googleapis.com: Can use CEL functions that evaluate
                  resource tags
                  (https://cloud.google.com/iam/help/conditions/resource-tags)
                  and combine them using boolean and logical operators. Other
                  functions and operators are not supported.

                 KEY
                    Sets KEY value.

                 VALUE
                    Sets VALUE value.

                     description
                        Description of the expression. This is a longer text
                        which describes the expression, e.g. when hovered over
                        it in a UI.

                     expression
                        Textual representation of an expression in Common
                        Expression Language syntax.

                     location
                        String indicating the location of the expression for
                        error reporting, e.g. a file name and a position in the
                        file.

                     title
                        Title for the expression, i.e. a short string
                        describing its purpose. This can be used e.g. in UIs
                        which allow to enter the expression.

             description
                Customer specified description of the rule. Must be less than
                or equal to 256 characters.

             effect
                The effect of the rule.

             excludedPrincipals
                The identities that are excluded from the access policy rule,
                even if they are listed in the principals. For example, you
                could add a Google group to the principals, then exclude
                specific users who belong to that group.

             operation
                Attributes that are used to determine whether this rule applies
                to a request.

                 excludedPermissions
                    Specifies the permissions that this rule excludes from the
                    set of affected permissions given by permissions. If a
                    permission appears in permissions and in
                    excluded_permissions then it will not be subject to the
                    policy effect.

                    The excluded permissions can be specified using the same
                    syntax as permissions.

                 permissions
                    The permissions that are explicitly affected by this rule.
                    Each permission uses the format
                    {service_fqdn}/{resource}.{verb}, where {service_fqdn} is
                    the fully qualified domain name for the service. Currently
                    supported permissions are as follows:

                    * eventarc.googleapis.com/messageBuses.publish.

             principals
                The identities for which this rule's effect governs using one
                or more permissions on Google Cloud resources. This field can
                contain the following values:

                o principal://goog/subject/{email_id}: A specific Google
                  Account. Includes Gmail, Cloud Identity, and Google Workspace
                  user accounts. For example,
                  principal://goog/subject/alice@example.com.

                If an identifier that was previously set on a policy is soft
                deleted, then calls to read that policy will return the
                identifier with a deleted prefix. Users cannot set identifiers
                with this syntax.

                o deleted:principal://goog/subject/{email_id}?uid={uid}: A
                  specific Google Account that was deleted recently. For
                  example,
                  deleted:principal://goog/subject/alice@example.com?uid=1234567890.
                  If the Google Account is recovered, this identifier reverts
                  to the standard identifier for a Google Account.

                o deleted:principalSet://goog/group/{group_id}?uid={uid}: A
                  Google group that was deleted recently. For example,
                  deleted:principalSet://goog/group/admins@example.com?uid=1234567890.
                  If the Google group is restored, this identifier reverts to
                  the standard identifier for a Google group.

                o deleted:principal://iam.googleapis.com/projects/-/serviceAccounts/{service_account_id}?uid={uid}:
                  A Google Cloud service account that was deleted recently. For
                  example,
                  deleted:principal://iam.googleapis.com/projects/-/serviceAccounts/my-service-account@iam.gserviceaccount.com?uid=1234567890.
                  If the service account is undeleted, this identifier reverts
                  to the standard identifier for a service account.

            Shorthand Example:

                --add-details-rules=conditions={string={description=string,expression=string,location=string,title=string}},description=string,effect=string,excludedPrincipals=[string],operation={excludedPermissions=[string],permissions=[string]},principals=[string] --add-details-rules=conditions={string={description=string,expression=string,location=string,title=string}},description=string,effect=string,excludedPrincipals=[string],operation={excludedPermissions=[string],permissions=[string]},principals=[string]

            JSON Example:

                --add-details-rules='[{"conditions": {"string": {"description": "string", "expression": "string", "location": "string", "title": "string"}}, "description": "string", "effect": "string", "excludedPrincipals": ["string"], "operation": {"excludedPermissions": ["string"], "permissions": ["string"]}, "principals": ["string"]}]'

            File Example:

                --add-details-rules=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-details-rules
              Clear details_rules value and set to empty list.

           --remove-details-rules=[conditions=CONDITIONS],[description=DESCRIPTION],[effect=EFFECT],[excludedPrincipals=EXCLUDEDPRINCIPALS],[operation=OPERATION],[principals=PRINCIPALS]
              Remove existing value from details_rules list. A list of access
              policy rules.

               conditions
                  The conditions that determine whether this rule applies to a
                  request. Conditions are identified by their key, which is the
                  FQDN of the service that they are relevant to. For example:
                  "conditions": { "iam.googleapis.com": { "expression": <cel
                  expression> } }. Each rule is evaluated independently. If
                  this rule does not apply to a request, other rules might
                  still apply. Currently supported keys are as follows:

                  * eventarc.googleapis.com: Can use CEL functions that
                    evaluate resource fields.

                  * iam.googleapis.com: Can use CEL functions that evaluate
                    resource tags
                    (https://cloud.google.com/iam/help/conditions/resource-tags)
                    and combine them using boolean and logical operators. Other
                    functions and operators are not supported.

                   KEY
                      Sets KEY value.

                   VALUE
                      Sets VALUE value.

                       description
                          Description of the expression. This is a longer text
                          which describes the expression, e.g. when hovered
                          over it in a UI.

                       expression
                          Textual representation of an expression in Common
                          Expression Language syntax.

                       location
                          String indicating the location of the expression for
                          error reporting, e.g. a file name and a position in
                          the file.

                       title
                          Title for the expression, i.e. a short string
                          describing its purpose. This can be used e.g. in UIs
                          which allow to enter the expression.

               description
                  Customer specified description of the rule. Must be less than
                  or equal to 256 characters.

               effect
                  The effect of the rule.

               excludedPrincipals
                  The identities that are excluded from the access policy rule,
                  even if they are listed in the principals. For example, you
                  could add a Google group to the principals, then exclude
                  specific users who belong to that group.

               operation
                  Attributes that are used to determine whether this rule
                  applies to a request.

                   excludedPermissions
                      Specifies the permissions that this rule excludes from
                      the set of affected permissions given by permissions. If
                      a permission appears in permissions and in
                      excluded_permissions then it will not be subject to the
                      policy effect.

                      The excluded permissions can be specified using the same
                      syntax as permissions.

                   permissions
                      The permissions that are explicitly affected by this
                      rule. Each permission uses the format
                      {service_fqdn}/{resource}.{verb}, where {service_fqdn} is
                      the fully qualified domain name for the service.
                      Currently supported permissions are as follows:

                      + eventarc.googleapis.com/messageBuses.publish.

               principals
                  The identities for which this rule's effect governs using one
                  or more permissions on Google Cloud resources. This field can
                  contain the following values:

                  * principal://goog/subject/{email_id}: A specific Google
                    Account. Includes Gmail, Cloud Identity, and Google
                    Workspace user accounts. For example,
                    principal://goog/subject/alice@example.com.

                  If an identifier that was previously set on a policy is soft
                  deleted, then calls to read that policy will return the
                  identifier with a deleted prefix. Users cannot set
                  identifiers with this syntax.

                  * deleted:principal://goog/subject/{email_id}?uid={uid}: A
                    specific Google Account that was deleted recently. For
                    example,
                    deleted:principal://goog/subject/alice@example.com?uid=1234567890.
                    If the Google Account is recovered, this identifier reverts
                    to the standard identifier for a Google Account.

                  * deleted:principalSet://goog/group/{group_id}?uid={uid}: A
                    Google group that was deleted recently. For example,
                    deleted:principalSet://goog/group/admins@example.com?uid=1234567890.
                    If the Google group is restored, this identifier reverts to
                    the standard identifier for a Google group.

                  * deleted:principal://iam.googleapis.com/projects/-/serviceAccounts/{service_account_id}?uid={uid}:
                    A Google Cloud service account that was deleted recently.
                    For example,
                    deleted:principal://iam.googleapis.com/projects/-/serviceAccounts/my-service-account@iam.gserviceaccount.com?uid=1234567890.
                    If the service account is undeleted, this identifier
                    reverts to the standard identifier for a service account.

              Shorthand Example:

                  --remove-details-rules=conditions={string={description=string,expression=string,location=string,title=string}},description=string,effect=string,excludedPrincipals=[string],operation={excludedPermissions=[string],permissions=[string]},principals=[string] --remove-details-rules=conditions={string={description=string,expression=string,location=string,title=string}},description=string,effect=string,excludedPrincipals=[string],operation={excludedPermissions=[string],permissions=[string]},principals=[string]

              JSON Example:

                  --remove-details-rules='[{"conditions": {"string": {"description": "string", "expression": "string", "location": "string", "title": "string"}}, "description": "string", "effect": "string", "excludedPrincipals": ["string"], "operation": {"excludedPermissions": ["string"], "permissions": ["string"]}, "principals": ["string"]}]'

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

        $ gcloud beta iam access-policies update
```

### gcloud beta iam access-policies create

```text
NAME
    gcloud beta iam access-policies create - create AccessPolicy instance

SYNOPSIS
    gcloud beta iam access-policies create
        (ACCESS_POLICY
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--annotations=[ANNOTATIONS,...]] [--async]
        [--details-rules=[conditions=CONDITIONS],[description=DESCRIPTION],
          [effect=EFFECT],[excludedPrincipals=EXCLUDEDPRINCIPALS],
          [operation=OPERATION],[principals=PRINCIPALS]]
        [--display-name=DISPLAY_NAME] [--etag=ETAG] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam access-policies delete

```text
NAME
    gcloud beta iam access-policies delete - delete AccessPolicy instance

SYNOPSIS
    gcloud beta iam access-policies delete
        (ACCESS_POLICY
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--async] [--etag=ETAG] [--force] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam access-policies describe

```text
NAME
    gcloud beta iam access-policies describe - get AccessPolicy instance

SYNOPSIS
    gcloud beta iam access-policies describe
        (ACCESS_POLICY
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam access-policies list

```text
NAME
    gcloud beta iam access-policies list - list AccessPolicy instances

SYNOPSIS
    gcloud beta iam access-policies list
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam access-policies search-policy-bindings

```text
NAME
    gcloud beta iam access-policies search-policy-bindings - search
        accessPolicies

SYNOPSIS
    gcloud beta iam access-policies search-policy-bindings
        (ACCESS_POLICY
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam access-policies update

```text
NAME
    gcloud beta iam access-policies update - update AccessPolicy instance

SYNOPSIS
    gcloud beta iam access-policies update
        (ACCESS_POLICY
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--async] [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--[no-]validate-only]
        [--annotations=[ANNOTATIONS,...]
          | --update-annotations=[UPDATE_ANNOTATIONS,...] --clear-annotations
          | --remove-annotations=REMOVE_ANNOTATIONS]
        [--clear-details
          --details-rules=[conditions=CONDITIONS],[description=DESCRIPTION],
          [effect=EFFECT],[excludedPrincipals=EXCLUDEDPRINCIPALS],
          [operation=OPERATION],[principals=PRINCIPALS]
          | --add-details-rules=[conditions=CONDITIONS],
          [description=DESCRIPTION],[effect=EFFECT],
          [excludedPrincipals=EXCLUDEDPRINCIPALS],
          [operation=OPERATION],[principals=PRINCIPALS] --clear-details-rules
          | --remove-details-rules=[conditions=CONDITIONS],
          [description=DESCRIPTION],[effect=EFFECT],
          [excludedPrincipals=EXCLUDEDPRINCIPALS],
          [operation=OPERATION],[principals=PRINCIPALS]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/access-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
