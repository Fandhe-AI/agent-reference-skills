---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iap/web
---

# gcloud iap web

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iap web add-iam-policy-binding

```text
NAME
    gcloud iap web add-iam-policy-binding - add IAM policy binding to an IAP
        IAM resource

SYNOPSIS
    gcloud iap web add-iam-policy-binding --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [--region=REGION --resource-type=RESOURCE_TYPE
          --service=SERVICE --version=VERSION --agent=AGENT
          | --endpoint=ENDPOINT | --mcp-server=MCP_SERVER]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds a policy binding to the IAM policy of an IAP IAM resource. One binding
    consists of a member, a role, and an optional condition. See $ gcloud iap
    web get-iam-policy for examples of how to specify an IAP IAM resource.

EXAMPLES
    See $ gcloud iap web get-iam-policy for examples of how to specify an IAP
    IAM resource.

    To add an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' on IAP IAM resource IAP_IAM_RESOURCE, run:

        $ gcloud iap web add-iam-policy-binding \
            --resource-type=IAP_IAM_RESOURCE \
            --member='user:test-user@gmail.com' --role='roles/editor'

    To add an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' on regional IAP IAM resource IAP_IAM_RESOURCE, run:

        $ gcloud iap web add-iam-policy-binding \
            --resource-type=IAP_IAM_RESOURCE \
            --member='user:test-user@gmail.com' --role='roles/editor' \
            --region=REGION

    To add an IAM policy binding for the role of 'roles/editor' for all
    authenticated users on IAP IAM resource IAP_IAM_RESOURCE, run:

        $ gcloud iap web add-iam-policy-binding \
            --resource-type=IAP_IAM_RESOURCE \
            --member='allAuthenticatedUsers' --role='roles/editor'

    To add an IAM policy binding which expires at the end of the year 2018 for
    the role of 'roles/browser' and the user 'test-user@gmail.com' on IAP IAM
    resource IAP_IAM_RESOURCE, run:

        $ gcloud iap web add-iam-policy-binding \
            --resource-type=IAP_IAM_RESOURCE \
            --member='user:test-user@gmail.com' --role='roles/browser' \
            --condition='expression=request.time <
            timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,
            description=Expires at midnight on 2018-12-31'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

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

     --region=REGION
        Region name. Not applicable for resource-type=app-engine. Required when
        resource-type=backend-services and regional scoped. Not applicable for
        global backend-services. Required when resource-type=cloud-run.

     --resource-type=RESOURCE_TYPE
        Resource type of the IAP resource. RESOURCE_TYPE must be one of:
        app-engine, backend-services, forwarding-rule, cloud-run,
        agent-registry.

     --service=SERVICE
        Service name.

     --version=VERSION
        Service version. Should only be specified with
        --resource-type=app-engine.

     At most one of these can be specified:

       --agent=AGENT
          Agent ID for the agent-registry resource type.

       --endpoint=ENDPOINT
          Endpoint ID for the agent-registry resource type.

       --mcp-server=MCP_SERVER
          MCP server ID for the agent-registry resource type.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iap web add-iam-policy-binding

        $ gcloud beta iap web add-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud iap web add-iam-policy-binding \
    --resource-type=IAP_IAM_RESOURCE \
    --member='user:test-user@gmail.com' \
    --role='roles/browser' \
    --condition='expression=request.time < timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,description=Expires at midnight on 2018-12-31'
```

### gcloud iap web disable

```text
NAME
    gcloud iap web disable - disable Cloud Identity-Aware Proxy (Cloud IAP) on
        an IAP resource

SYNOPSIS
    gcloud iap web disable
        [--resource-type=RESOURCE_TYPE : --region=REGION --service=SERVICE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command disables Cloud Identity-Aware Proxy on an IAP resource.
    Disabling IAP does not clear the OAuth 2.0 credentials.

EXAMPLES
    To disable IAP on an App Engine application, run:

        $ gcloud iap web disable --resource-type=app-engine

    To disable IAP on a global backend service, run:

        $ gcloud iap web disable --resource-type=backend-services \
            --service=SERVICE_ID

    To disable IAP on a region backend service, run:

        $ gcloud iap web disable --resource-type=backend-services \
            --service=SERVICE_ID --region=REGION

FLAGS
     --resource-type=RESOURCE_TYPE
        Resource type of the IAP resource. RESOURCE_TYPE must be one of:
        app-engine, backend-services.

     --region=REGION
        Region name. Not applicable for app-engine. Optional when resource-type
        is compute.

     --service=SERVICE
        Service name. Required with --resource-type=backend-services.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iap web disable

        $ gcloud beta iap web disable
```

### gcloud iap web enable

```text
NAME
    gcloud iap web enable - enable Cloud Identity-Aware Proxy (Cloud IAP) on an
        IAP resource

SYNOPSIS
    gcloud iap web enable
        [--oauth2-client-id=OAUTH2_CLIENT_ID
          --oauth2-client-secret=OAUTH2_CLIENT_SECRET]
        [--resource-type=RESOURCE_TYPE : --region=REGION --service=SERVICE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command enables Cloud Identity-Aware Proxy on an IAP resource. OAuth
    2.0 credentials must be set, or must have been previously set, to enable
    IAP.

EXAMPLES
    To enable IAP on an App Engine application, run:

        $ gcloud iap web enable --resource-type=app-engine \
            --oauth2-client-id=CLIENT_ID --oauth2-client-secret=SECRET

    To enable IAP on a global backend service, run:

        $ gcloud iap web enable --resource-type=backend-services \
            --oauth2-client-id=CLIENT_ID --oauth2-client-secret=SECRET \
            --service=SERVICE_ID

    To enable IAP on a region backend service, run:

        $ gcloud iap web enable --resource-type=backend-services \
            --oauth2-client-id=CLIENT_ID --oauth2-client-secret=SECRET \
            --service=SERVICE_ID --region=REGION

FLAGS
     --oauth2-client-id=OAUTH2_CLIENT_ID
        OAuth 2.0 client ID to use.

     --oauth2-client-secret=OAUTH2_CLIENT_SECRET
        OAuth 2.0 client secret to use.

     --resource-type=RESOURCE_TYPE
        Resource type of the IAP resource. RESOURCE_TYPE must be one of:
        app-engine, backend-services.

     --region=REGION
        Region name. Not applicable for app-engine. Optional when resource-type
        is compute.

     --service=SERVICE
        Service name. Required with --resource-type=backend-services.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iap web enable

        $ gcloud beta iap web enable
```

### gcloud iap web get-iam-policy

```text
NAME
    gcloud iap web get-iam-policy - get IAM policy for an IAP IAM resource

SYNOPSIS
    gcloud iap web get-iam-policy
        [--region=REGION --resource-type=RESOURCE_TYPE
          --service=SERVICE --version=VERSION --agent=AGENT
          | --endpoint=ENDPOINT | --mcp-server=MCP_SERVER]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud iap web get-iam-policy displays the IAM policy associated with an
    IAP IAM resource. If formatted as JSON, the output can be edited and used
    as a policy file for set-iam-policy. The output includes an "etag" field
    identifying the version emitted and allowing detection of concurrent policy
    updates; see $ gcloud iap web set-iam-policy for additional details.

EXAMPLES
    To get the IAM policy for the web accesses to the IAP protected resources
    within the active project, run:

        $ gcloud iap web get-iam-policy

    To get the IAM policy for the web accesses to the IAP protected resources
    within a project, run:

        $ gcloud iap web get-iam-policy --project=PROJECT_ID

    To get the IAM policy for the web accesses to the IAP protected resources
    within an App Engine application, run:

        $ gcloud iap web get-iam-policy --resource-type=app-engine

    To get the IAM policy for the web accesses to the IAP protected resources
    within an App Engine service, run:

        $ gcloud iap web get-iam-policy --resource-type=app-engine \
            --service=SERVICE_ID

    To get the IAM policy for the web accesses to the IAP protected resources
    within an App Engine service version, run:

        $ gcloud iap web get-iam-policy --resource-type=app-engine \
            --service=SERVICE_ID --version=VERSION

    To get the IAM policy for the web accesses to the IAP protected resources
    within all backend services, run:

        $ gcloud iap web get-iam-policy --resource-type=backend-services

    To get the IAM policy for the web accesses to the IAP protected resources
    within a backend service, run:

        $ gcloud iap web get-iam-policy --resource-type=backend-services \
            --service=SERVICE_ID

    To get the IAM policy for the web accesses to the IAP protected resources
    within a regional backend service, run:

        $ gcloud iap web get-iam-policy --resource-type=backend-services \
            --service=SERVICE_ID --region=REGION

    To get the IAM policy for the web accesses to the IAP protected resources
    within a Cloud Run service, run:

        $ gcloud iap web get-iam-policy --resource-type=cloud-run \
            --service=SERVICE_ID --region=REGION

FLAGS
     --region=REGION
        Region name. Not applicable for resource-type=app-engine. Required when
        resource-type=backend-services and regional scoped. Not applicable for
        global backend-services. Required when resource-type=cloud-run.

     --resource-type=RESOURCE_TYPE
        Resource type of the IAP resource. RESOURCE_TYPE must be one of:
        app-engine, backend-services, forwarding-rule, cloud-run,
        agent-registry.

     --service=SERVICE
        Service name.

     --version=VERSION
        Service version. Should only be specified with
        --resource-type=app-engine.

     At most one of these can be specified:

       --agent=AGENT
          Agent ID for the agent-registry resource type.

       --endpoint=ENDPOINT
          Endpoint ID for the agent-registry resource type.

       --mcp-server=MCP_SERVER
          MCP server ID for the agent-registry resource type.

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

        $ gcloud alpha iap web get-iam-policy

        $ gcloud beta iap web get-iam-policy
```

### gcloud iap web remove-iam-policy-binding

```text
NAME
    gcloud iap web remove-iam-policy-binding - remove IAM policy binding from
        an IAP IAM resource

SYNOPSIS
    gcloud iap web remove-iam-policy-binding --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE]
        [--region=REGION --resource-type=RESOURCE_TYPE
          --service=SERVICE --version=VERSION --agent=AGENT
          | --endpoint=ENDPOINT | --mcp-server=MCP_SERVER]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes a policy binding from the IAM policy of an IAP IAM resource. One
    binding consists of a member, a role and an optional condition. See $
    gcloud iap web get-iam-policy for examples of how to specify an IAP IAM
    resource.

EXAMPLES
    See $ gcloud iap web get-iam-policy for examples of how to specify an IAP
    IAM resource.

    To remove an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' on IAP IAM resource IAP_IAM_RESOURCE, run:

        $ gcloud iap web remove-iam-policy-binding \
            --resource-type=IAP_IAM_RESOURCE \
            --member='user:test-user@gmail.com' --role='roles/editor'

    To remove an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' on regional IAP IAM resource IAP_IAM_RESOURCE, run:

        $ gcloud iap web remove-iam-policy-binding \
            --resource-type=IAP_IAM_RESOURCE \
            --member='user:test-user@gmail.com' --role='roles/editor' \
            --region=REGION

    To remove an IAM policy binding for the role of 'roles/editor' from all
    authenticated users on IAP IAM resource IAP_IAM_RESOURCE,run:

        $ gcloud iap web remove-iam-policy-binding \
            --resource-type=IAP_IAM_RESOURCE \
            --member='allAuthenticatedUsers' --role='roles/editor'

    To remove an IAM policy binding with a condition of
    expression='request.time < timestamp("2019-01-01T00:00:00Z")',
    title='expires_end_of_2018', and description='Expires at midnight on
    2018-12-31' for the role of 'roles/browser' for the user
    'test-user@gmail.com' on IAP IAM resource IAP_IAM_RESOURCE, run:

        $ gcloud iap web remove-iam-policy-binding \
            --resource-type=IAP_IAM_RESOURCE \
            --member='user:test-user@gmail.com' --role='roles/browser' \
            --condition='expression=request.time <
            timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,
            description=Expires at midnight on 2018-12-31'

    To remove all IAM policy bindings regardless of the condition for the role
    of 'roles/browser' and for the user 'test-user@gmail.com' on IAP IAM
    resource IAP_IAM_RESOURCE, run:

        $ gcloud iap web remove-iam-policy-binding \
            --resource-type=IAP_IAM_RESOURCE \
            --member='user:test-user@gmail.com' --role='roles/browser' --all

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

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

     --region=REGION
        Region name. Not applicable for resource-type=app-engine. Required when
        resource-type=backend-services and regional scoped. Not applicable for
        global backend-services. Required when resource-type=cloud-run.

     --resource-type=RESOURCE_TYPE
        Resource type of the IAP resource. RESOURCE_TYPE must be one of:
        app-engine, backend-services, forwarding-rule, cloud-run,
        agent-registry.

     --service=SERVICE
        Service name.

     --version=VERSION
        Service version. Should only be specified with
        --resource-type=app-engine.

     At most one of these can be specified:

       --agent=AGENT
          Agent ID for the agent-registry resource type.

       --endpoint=ENDPOINT
          Endpoint ID for the agent-registry resource type.

       --mcp-server=MCP_SERVER
          MCP server ID for the agent-registry resource type.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iap web remove-iam-policy-binding

        $ gcloud beta iap web remove-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud iap web remove-iam-policy-binding \
    --resource-type=IAP_IAM_RESOURCE \
    --member='user:test-user@gmail.com' \
    --role='roles/browser' \
    --condition='expression=request.time < timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,description=Expires at midnight on 2018-12-31'
```

### gcloud iap web set-iam-policy

```text
NAME
    gcloud iap web set-iam-policy - set the IAM policy for an IAP IAM resource

SYNOPSIS
    gcloud iap web set-iam-policy POLICY_FILE
        [--region=REGION --resource-type=RESOURCE_TYPE
          --service=SERVICE --version=VERSION --agent=AGENT
          | --endpoint=ENDPOINT | --mcp-server=MCP_SERVER]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command replaces the existing IAM policy for an IAP IAM resource,
    given a file encoded in JSON or YAML that contains the IAM policy. If the
    given policy file specifies an "etag" value, then the replacement will
    succeed only if the policy already in place matches that etag. (An etag
    obtained via $ gcloud iap web get-iam-policy will prevent the replacement
    if the policy for the resource has been subsequently updated.) A policy
    file that does not contain an etag value will replace any existing policy
    for the resource.

EXAMPLES
    To set the IAM policy for the web accesses to the IAP protected resources
    within the active project, run:

        $ gcloud iap web set-iam-policy POLICY_FILE

    To set the IAM policy for the web accesses to the IAP protected resources
    within a project, run:

        $ gcloud iap web set-iam-policy POLICY_FILE --project=PROJECT_ID

    To set the IAM policy for the web accesses to the IAP protected resources
    within an App Engine application, run:

        $ gcloud iap web set-iam-policy POLICY_FILE \
            --resource-type=app-engine

    To set the IAM policy for the web accesses to the IAP protected resources
    within an App Engine service, run:

        $ gcloud iap web set-iam-policy POLICY_FILE \
            --resource-type=app-engine --service=SERVICE_ID

    To set the IAM policy for the web accesses to the IAP protected resources
    within an App Engine service version, run:

        $ gcloud iap web set-iam-policy POLICY_FILE \
            --resource-type=app-engine --service=SERVICE_ID \
            --version=VERSION

    To set the IAM policy for the web accesses to the IAP protected resources
    within all backend services, run:

        $ gcloud iap web set-iam-policy POLICY_FILE \
            --resource-type=backend-services

    To set the IAM policy for the web accesses to the IAP protected resources
    within a backend service, run:

        $ gcloud iap web set-iam-policy POLICY_FILE \
            --resource-type=backend-services --service=SERVICE_ID

    To set the IAM policy for the web accesses to the IAP protected resources
    within a regional backend service, run:

        $ gcloud iap web set-iam-policy POLICY_FILE \
            --resource-type=backend-services --service=SERVICE_ID \
            --region=REGION

    To set the IAM policy for the web accesses to the IAP protected resources
    within a Cloud Run service, run:

        $ gcloud iap web set-iam-policy POLICY_FILE \
            --resource-type=cloud-run --service=SERVICE_ID --region=REGION

POSITIONAL ARGUMENTS
     POLICY_FILE
        JSON or YAML file containing the IAM policy.

FLAGS
     --region=REGION
        Region name. Not applicable for resource-type=app-engine. Required when
        resource-type=backend-services and regional scoped. Not applicable for
        global backend-services. Required when resource-type=cloud-run.

     --resource-type=RESOURCE_TYPE
        Resource type of the IAP resource. RESOURCE_TYPE must be one of:
        app-engine, backend-services, forwarding-rule, cloud-run,
        agent-registry.

     --service=SERVICE
        Service name.

     --version=VERSION
        Service version. Should only be specified with
        --resource-type=app-engine.

     At most one of these can be specified:

       --agent=AGENT
          Agent ID for the agent-registry resource type.

       --endpoint=ENDPOINT
          Endpoint ID for the agent-registry resource type.

       --mcp-server=MCP_SERVER
          MCP server ID for the agent-registry resource type.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iap web set-iam-policy

        $ gcloud beta iap web set-iam-policy
```

### gcloud beta iap web add-iam-policy-binding

```text
NAME
    gcloud beta iap web add-iam-policy-binding - add IAM policy binding to an
        IAP IAM resource

SYNOPSIS
    gcloud beta iap web add-iam-policy-binding --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [--region=REGION --resource-type=RESOURCE_TYPE
          --service=SERVICE --version=VERSION --agent=AGENT
          | --endpoint=ENDPOINT | --mcp-server=MCP_SERVER]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iap web disable

```text
NAME
    gcloud beta iap web disable - disable Cloud Identity-Aware Proxy
        (Cloud IAP) on an IAP resource

SYNOPSIS
    gcloud beta iap web disable
        [--resource-type=RESOURCE_TYPE : --region=REGION --service=SERVICE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iap web enable

```text
NAME
    gcloud beta iap web enable - enable Cloud Identity-Aware Proxy (Cloud IAP)
        on an IAP resource

SYNOPSIS
    gcloud beta iap web enable
        [--oauth2-client-id=OAUTH2_CLIENT_ID
          --oauth2-client-secret=OAUTH2_CLIENT_SECRET]
        [--resource-type=RESOURCE_TYPE : --region=REGION --service=SERVICE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iap web get-iam-policy

```text
NAME
    gcloud beta iap web get-iam-policy - get IAM policy for an IAP IAM resource

SYNOPSIS
    gcloud beta iap web get-iam-policy
        [--region=REGION --resource-type=RESOURCE_TYPE
          --service=SERVICE --version=VERSION --agent=AGENT
          | --endpoint=ENDPOINT | --mcp-server=MCP_SERVER]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iap web remove-iam-policy-binding

```text
NAME
    gcloud beta iap web remove-iam-policy-binding - remove IAM policy binding
        from an IAP IAM resource

SYNOPSIS
    gcloud beta iap web remove-iam-policy-binding --member=PRINCIPAL
        --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE]
        [--region=REGION --resource-type=RESOURCE_TYPE
          --service=SERVICE --version=VERSION --agent=AGENT
          | --endpoint=ENDPOINT | --mcp-server=MCP_SERVER]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iap web set-iam-policy

```text
NAME
    gcloud beta iap web set-iam-policy - set the IAM policy for an IAP IAM
        resource

SYNOPSIS
    gcloud beta iap web set-iam-policy POLICY_FILE
        [--region=REGION --resource-type=RESOURCE_TYPE
          --service=SERVICE --version=VERSION --agent=AGENT
          | --endpoint=ENDPOINT | --mcp-server=MCP_SERVER]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iap web add-iam-policy-binding

```text
NAME
    gcloud alpha iap web add-iam-policy-binding - add IAM policy binding to an
        IAP IAM resource

SYNOPSIS
    gcloud alpha iap web add-iam-policy-binding --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [--instance=INSTANCE --region=REGION --resource-type=RESOURCE_TYPE
          --service=SERVICE --version=VERSION --agent=AGENT
          | --endpoint=ENDPOINT | --mcp-server=MCP_SERVER]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iap web disable

```text
NAME
    gcloud alpha iap web disable - disable Cloud Identity-Aware Proxy
        (Cloud IAP) on an IAP resource

SYNOPSIS
    gcloud alpha iap web disable
        [--resource-type=RESOURCE_TYPE : --region=REGION --service=SERVICE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iap web enable

```text
NAME
    gcloud alpha iap web enable - enable Cloud Identity-Aware Proxy (Cloud IAP)
        on an IAP resource

SYNOPSIS
    gcloud alpha iap web enable
        [--oauth2-client-id=OAUTH2_CLIENT_ID
          --oauth2-client-secret=OAUTH2_CLIENT_SECRET]
        [--resource-type=RESOURCE_TYPE : --region=REGION --service=SERVICE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iap web get-iam-policy

```text
NAME
    gcloud alpha iap web get-iam-policy - get IAM policy for an IAP IAM
        resource

SYNOPSIS
    gcloud alpha iap web get-iam-policy
        [--instance=INSTANCE --region=REGION --resource-type=RESOURCE_TYPE
          --service=SERVICE --version=VERSION --agent=AGENT
          | --endpoint=ENDPOINT | --mcp-server=MCP_SERVER]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iap web remove-iam-policy-binding

```text
NAME
    gcloud alpha iap web remove-iam-policy-binding - remove IAM policy binding
        from an IAP IAM resource

SYNOPSIS
    gcloud alpha iap web remove-iam-policy-binding --member=PRINCIPAL
        --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE]
        [--instance=INSTANCE --region=REGION --resource-type=RESOURCE_TYPE
          --service=SERVICE --version=VERSION --agent=AGENT
          | --endpoint=ENDPOINT | --mcp-server=MCP_SERVER]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iap web set-iam-policy

```text
NAME
    gcloud alpha iap web set-iam-policy - set the IAM policy for an IAP IAM
        resource

SYNOPSIS
    gcloud alpha iap web set-iam-policy POLICY_FILE
        [--instance=INSTANCE --region=REGION --resource-type=RESOURCE_TYPE
          --service=SERVICE --version=VERSION --agent=AGENT
          | --endpoint=ENDPOINT | --mcp-server=MCP_SERVER]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the help wraps the `--condition` value after `title=expires_end_of_2018,`, so the joined value has a space before `description=`; gcloud 593.0.0 rejects it ("argument --condition: valid keys are [None, description, expression, title]; received: description"). The runnable form removes the space.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iap/web (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
