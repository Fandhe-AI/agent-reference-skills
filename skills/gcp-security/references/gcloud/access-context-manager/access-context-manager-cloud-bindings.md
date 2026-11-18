---
source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/cloud-bindings
---

# gcloud access-context-manager cloud-bindings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud access-context-manager cloud-bindings create

```text
NAME
    gcloud access-context-manager cloud-bindings create - create cloud access
        bindings for a specific group

SYNOPSIS
    gcloud access-context-manager cloud-bindings create
        [--binding-file=YAML_FILE] [--dry-run-level=[DRY_RUN_LEVEL,...]]
        [--federated-principal=FEDERATED_PRINCIPAL] [--group-key=GROUP_KEY]
        [--level=[LEVEL,...]] [--organization=ORGANIZATION]
        [--service-account=SERVICE_ACCOUNT]
        [--service-account-project-number=SERVICE_ACCOUNT_PROJECT_NUMBER]
        [--session-length=SESSION_LENGTH]
        [--session-reauth-method=SESSION_REAUTH_METHOD; default="login"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new cloud access binding.

    For Google Group bindings (--group-key), the access level, the session
    settings, or both can apply globally across the group or be scoped to
    specific applications using --binding-file. To apply an access level or
    session settings to a specific application, specify
    restrictedClientApplication in the --binding-file. In this case, the
    settings specified in the binding file apply to the group for those
    restricted applications.

    The access level can also be bound to a specific service account or all
    service accounts in a specified project.

    To apply session settings to all workforce pools in an organization,
    specify the restrictedProject or restrictedClientApplication scope in the
    --binding-file with --federated-principal set to
    principalSet://cloudresourcemanager.googleapis.com/organizations/{organization_id}/type/WorkforcePool.
    Bindings created for all workforce pools in an organization support only
    scopedAccessSettings with the restrictedProject or
    restrictedClientApplication client scope and active sessionSettings.
    Top-level session settings, access levels, dry run access levels, and dry
    run session settings are not allowed for this principal type.

    Binding session settings to other principal types isn't supported, and
    those requests are rejected. You can bind session settings only to the
    following principal types:

      o Google Groups: specify the group by using the --group-key flag.
      o All workforce pools in an organization: specify the organization's
        workforce pools by using the --federated-principal flag. Binding
        session settings to other federated principals isn't supported.

EXAMPLES
    To create a new cloud access binding, run the following command:

        $ gcloud access-context-manager cloud-bindings create \
            --group-key=my-group-key \
            --level=accessPolicies/123/accessLevels/abc

    To create a new cloud access binding for particular applications (with
    access levels, session settings, or both) using a YAML file, run the
    following command:

        $ gcloud access-context-manager cloud-bindings create \
            --group-key=my-group-key --organization='1234567890' \
            --binding-file='binding.yaml'

    To create a new cloud access binding with a global access level, and
    settings for particular applications using a YAML file, run the following
    command:

        $ gcloud access-context-manager cloud-bindings create \
            --group-key=my-group-key \
            --level=accessPolicies/123/accessLevels/abc \
            --organization='1234567890' --binding-file='binding.yaml'

    To create a new cloud access binding for the dry run access level, run the
    following command:

        $ gcloud access-context-manager cloud-bindings create \
            --group-key=my-group-key \
            --level=accessPolicies/123/accessLevels/abc \
            --dry-run-level=accessPolicies/123/accessLevels/def

    To create a new cloud access binding with global session settings, specify
    your session length using an ISO duration string and the session-length
    flag. For example, run the following command:

        $ gcloud access-context-manager cloud-bindings create \
            --group-key=my-group-key --organization='1234567890' \
            --session-length=2h

    To set a particular session reauth method for these session settings, run
    the following command:

        $ gcloud access-context-manager cloud-bindings create \
            --group-key=my-group-key --organization='1234567890' \
            --session-length=2h --session-reauth-method=LOGIN

    Global and per-app session settings can be set on the same group, along
    with access levels. For example, run the following command:

        $ gcloud access-context-manager cloud-bindings create \
            --group-key=my-group-key --organization='1234567890' \
            --session-length=2h --session-reauth-method=LOGIN \
            --level=accessPolicies/123/accessLevels/abc \
            --dry-run-level=accessPolicies/123/accessLevels/def \
            --binding-file='binding.yaml'

    To create a new cloud access binding for a particular service account, run
    the following command:

        $ gcloud access-context-manager cloud-bindings create \
            --service-account=service-account@project.iam.gserviceaccount.co\
        m --level=accessPolicies/123/accessLevels/abc \
            --organization='1234567890'

    To create a new cloud access binding for all service accounts in a
    particular project, run the following command:

        $ gcloud access-context-manager cloud-bindings create \
            --service-account-project-number='987654321' \
            --level=accessPolicies/123/accessLevels/abc \
            --organization='1234567890'

    To create a new cloud access binding for a specific federated principal,
    run the following command:

        $ gcloud access-context-manager cloud-bindings create \
            --federated-principal='principal://iam.googleapis.com/projects/1\
        234567890/locations/global/workloadIdentityPools/my-pool/subject/my-\
        subject' --level=accessPolicies/123/accessLevels/abc \
            --organization='1234567890'

    To create a new cloud access binding for all workforce pools in a given
    organization with project-scoped session settings:

        Create a binding.yaml file containing scopedAccessSettings with restrictedProject and
        activeSettings (session length between 1 hour and 90 days, sessionReauthMethod: LOGIN,
        and sessionLengthEnabled: true):

        scopedAccessSettings:
        - scope:
            clientScope:
              restrictedProject:
                name: projects/1234567890
          activeSettings:
            sessionSettings:
              sessionLength: 7776000s
              sessionLengthEnabled: true
              sessionReauthMethod: LOGIN

        Then run the following command:

        $ gcloud access-context-manager cloud-bindings create \
          --federated-principal='principalSet://cloudresourcemanager.googl\
        eapis.com/organizations/1234567890/type/WorkforcePool' \
            --organization='1234567890' --binding-file='binding.yaml'

    To create a new cloud access binding for all workforce pools in a given
    organization with application-scoped session settings:

        Create a binding.yaml file containing scopedAccessSettings with restrictedClientApplication
        and activeSettings (session length between 1 hour and 90 days, sessionReauthMethod: LOGIN,
        and sessionLengthEnabled: true):

        scopedAccessSettings:
        - scope:
            clientScope:
              restrictedClientApplication:
                name: "Gemini Enterprise mobile Android"
          activeSettings:
            sessionSettings:
              sessionLength: 7776000s
              sessionLengthEnabled: true
              sessionReauthMethod: LOGIN
        - scope:
            clientScope:
              restrictedClientApplication:
                name: "Gemini Enterprise mobile IOS"
          activeSettings:
            sessionSettings:
              sessionLength: 7776000s
              sessionLengthEnabled: true
              sessionReauthMethod: LOGIN

        Then run the following command:

        $ gcloud access-context-manager cloud-bindings create \
          --federated-principal='principalSet://cloudresourcemanager.googl\
        eapis.com/organizations/1234567890/type/WorkforcePool' \
            --organization='1234567890' --binding-file='binding.yaml'

FLAGS
     --binding-file=YAML_FILE
        Path to the file that contains a Google Cloud user access binding.

        This file contains a YAML-compliant object representing a
        GcpUserAccessBinding that contains scopedAccessSettings only. No other
        binding fields are allowed.

        For details about the object, see the API reference:
        https://docs.cloud.google.com/access-context-manager/docs/apply-policies-to-user-groups#define_configurations_for_specific_applications

        For Google Group bindings (--group-key), scopedAccessSettings can
        specify restrictedClientApplication (using clientId or name) with
        accessLevels, dryRunAccessLevels, and sessionSettings (session length
        up to 24 hours). The restrictedProject scope is not supported for
        Google Group bindings.

        For bindings tied to all workforce pools in an organization
        (principalSet://cloudresourcemanager.googleapis.com/organizations/{organization_id}/type/WorkforcePool),
        scopedAccessSettings can contain restrictedProject (format: name:
        projects/{project_number}) or restrictedClientApplication within
        scope.clientScope, and sessionSettings within activeSettings. For this
        configuration, the following requirements apply:
        * sessionLength must be set and must be between 1 hour and 90 days
          (for example, 7776000s).
        * sessionReauthMethod must be LOGIN or omitted (defaults to LOGIN).
        * sessionLengthEnabled must be set to true.
        * maxInactivity must be set to 0 or omitted.
        * useOidcMaxAge must be set to false or omitted.
        * For project scopes (restrictedProject), the session settings apply
          to all OAuth apps owned by the specified project.
        * For application scopes (restrictedClientApplication), only
          supported Google Cloud applications are allowed. name must be set to
          one of the following case-sensitive values: "Gemini Enterprise mobile
          Android", "Gemini Enterprise mobile IOS", or "Gemini Enterprise
          Desktop". Identifying applications by OAuth client ID (clientId) is
          not supported for workforce pools.
        * Access levels, dry run access levels, and dry run session settings
          are not allowed.

        The restrictedProject scope is usable only with bindings tied to all
        workforce pools in an organization.

     --dry-run-level=[DRY_RUN_LEVEL,...]
        The dry run access level that binds to the given group. The dry run
        access level will be evaluated but won't be enforced. Denial on dry run
        access level will be logged. The input must be the full identifier of
        an access level, such as accessPolicies/123/accessLevels/new-def.

     --federated-principal=FEDERATED_PRINCIPAL
        The IAM principal identifier of the federated workforce or workload to
        assign the policy to. Examples include the following:

        * Single principal:
          principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}
        * All workloads in a workload identity pool:
          principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*
        * All Workforce Pools in a Google Cloud organization:
          principalSet://cloudresourcemanager.googleapis.com/organizations/{organization_id}/type/WorkforcePool

        Bindings created for all Workforce Pools in an organization support
        only scopedAccessSettings with the restrictedProject or
        restrictedClientApplication client scope and active sessionSettings. No
        other configurations (such as top-level session settings, access
        levels, dry run access levels, or dry run session settings) are
        allowed.

        Session settings cannot be configured for individual federated
        principals or workload identity pools. At most one of --group-key,
        --federated-principal, --service-account, or
        --service-account-project-number can be specified.

     --group-key=GROUP_KEY
        Google Group ID whose members are subject to the restrictions of this
        binding. At most one of --group-key, --federated-principal,
        --service-account, or --service-account-project-number can be
        specified.

     --level=[LEVEL,...]
        The access level that binds to the given group. The input must be the
        full identifier of an access level, such as
        accessPolicies/123/accessLevels/abc.

     --organization=ORGANIZATION
        Parent organization for this binding.

     --service-account=SERVICE_ACCOUNT
        Service account email that this binding applies to. Used to assign
        policies to a single first-party service account. At most one of
        --group-key, --federated-principal, --service-account, or
        --service-account-project-number can be specified.

     --service-account-project-number=SERVICE_ACCOUNT_PROJECT_NUMBER
        Project number of the project that contains the service accounts that
        are subject to the restrictions of this binding. Used to assign
        policies to all service accounts in a Google Cloud project. At most one
        of --group-key, --federated-principal, --service-account, or
        --service-account-project-number can be specified.

     --session-length=SESSION_LENGTH
        The maximum lifetime of a user session provided as an ISO 8601 duration
        string. Must be at least one hour or zero seconds, and no more than
        twenty-four hours. Granularity is limited to seconds.

        When --session-length=0, users in the group attached to this binding
        have infinite session length, which effectively disables session
        settings.

        A session begins when a user signs in successfully. If a user signs out
        before the end of the session lifetime, a new login creates a new
        session with a fresh lifetime. When a session expires, the user is
        asked to re-authenticate in accordance with --session-reauth-method.

        Setting --session-reauth-method when --session-length is empty raises
        an error.

        The session length applies only to Google Group bindings (--group-key).
        It isn't supported for bindings tied to all workforce pools in an
        organization, or for any other principal type. For bindings tied to all
        workforce pools in an organization, configure session settings through
        --binding-file, under scopedAccessSettings.

     --session-reauth-method=SESSION_REAUTH_METHOD; default="login"
        Specifies the type of re-authentication challenge given to the user
        when their session expires. Defaults to --session-reauth-method=login
        if unspecified and --session-length is set. Cannot be used when
        --session-length is empty or 0. This parameter is supported only for
        Google Group bindings. It isn't supported for bindings tied to all
        workforce pools in an organization; for those bindings, configure
        session settings through --binding-file. SESSION_REAUTH_METHOD must be
        one of:

         login
            The user will be prompted to perform regular login. Users who are
            enrolled for two-step verification and haven't chosen to "Remember
            this computer" will be prompted for their second factor.

         password
            The user will only be required to enter their password.

         security-key
            The user will be prompted to authenticate using their security key.
            If no security key has been configured, authentication will fall
            back to LOGIN. For help configuring your security key, see
            https://support.google.com/a/answer/2537800?hl=en#zippy=%2Cview-add-or-remove-security-keys

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    This variant is also available:

        $ gcloud alpha access-context-manager cloud-bindings create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud access-context-manager cloud-bindings create \
    --service-account=service-account@project.iam.gserviceaccount.com \
    --level=accessPolicies/123/accessLevels/abc \
    --organization='1234567890'

gcloud access-context-manager cloud-bindings create \
    --federated-principal='principal://iam.googleapis.com/projects/1234567890/locations/global/workloadIdentityPools/my-pool/subject/my-subject' \
    --level=accessPolicies/123/accessLevels/abc \
    --organization='1234567890'

gcloud access-context-manager cloud-bindings create \
    --federated-principal='principalSet://cloudresourcemanager.googleapis.com/organizations/1234567890/type/WorkforcePool' \
    --organization='1234567890' \
    --binding-file='binding.yaml'

gcloud access-context-manager cloud-bindings create \
    --federated-principal='principalSet://cloudresourcemanager.googleapis.com/organizations/1234567890/type/WorkforcePool' \
    --organization='1234567890' \
    --binding-file='binding.yaml'
```

### gcloud access-context-manager cloud-bindings delete

```text
NAME
    gcloud access-context-manager cloud-bindings delete - delete a cloud access
        binding

SYNOPSIS
    gcloud access-context-manager cloud-bindings delete
        (--binding=BINDING : --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an existing cloud access binding.

EXAMPLES
    To delete an existing cloud access binding, run:

        $ gcloud access-context-manager cloud-bindings delete \
            --binding=binding-id

REQUIRED FLAGS
     Cloud access binding resource - The cloud access binding you want to
     delete. The arguments in this group can be used to specify the attributes
     of this resource.

     This must be specified.

       --binding=BINDING
          ID of the cloud-access-binding or fully qualified identifier for the
          cloud-access-binding.

          To set the binding attribute:
          + provide the argument --binding on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --organization=ORGANIZATION
          The ID of the organization.

          To set the organization attribute:
          + provide the argument --binding on the command line with a fully
            specified name;
          + provide the argument --organization on the command line;
          + set the property access_context_manager/organization.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    This variant is also available:

        $ gcloud alpha access-context-manager cloud-bindings delete
```

### gcloud access-context-manager cloud-bindings describe

```text
NAME
    gcloud access-context-manager cloud-bindings describe - show details about
        a cloud access binding

SYNOPSIS
    gcloud access-context-manager cloud-bindings describe
        (--binding=BINDING : --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about an existing cloud access binding.

EXAMPLES
    To get details about an existing cloud access binding, run:

        $ gcloud access-context-manager cloud-bindings describe \
            --binding=binding-id

REQUIRED FLAGS
     Cloud access binding resource - The cloud access binding you want to show
     details about The arguments in this group can be used to specify the
     attributes of this resource.

     This must be specified.

       --binding=BINDING
          ID of the cloud-access-binding or fully qualified identifier for the
          cloud-access-binding.

          To set the binding attribute:
          + provide the argument --binding on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --organization=ORGANIZATION
          The ID of the organization.

          To set the organization attribute:
          + provide the argument --binding on the command line with a fully
            specified name;
          + provide the argument --organization on the command line;
          + set the property access_context_manager/organization.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    This variant is also available:

        $ gcloud alpha access-context-manager cloud-bindings describe
```

### gcloud access-context-manager cloud-bindings list

```text
NAME
    gcloud access-context-manager cloud-bindings list - list cloud access
        bindings under an organization

SYNOPSIS
    gcloud access-context-manager cloud-bindings list
        [--organization=ORGANIZATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List cloud access bindings.

    By default, this command returns only user bindings (Google Groups).

    To return service account bindings, set --filter to
    principal:serviceAccount OR principal:serviceAccountProjectNumber.

    To return federated principal bindings (workforce or workload identities),
    set --filter to principal:federatedPrincipal.

EXAMPLES
    To list cloud access bindings, run the following command:

        $ gcloud access-context-manager cloud-bindings list

    This command prints a list of Google Cloud user access bindings,
    gcpUserAccessBindings, in YAML format. By default, the binding is printed
    in the following format:

        ---
        accessLevels:
        - accessPolicies/9522/accessLevels/device_trusted
        dryRunAccessLevels:
        - accessPolicies/9522/accessLevels/specific_location
        groupKey: a3dad
        name: organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N
        sessionSettings:
          sessionLength: 57600s
          sessionLengthEnabled: true
          sessionReauthMethod: LOGIN

    Or

        ---
        accessLevels:
        - accessPolicies/9522/accessLevels/device_trusted
        dryRunAccessLevels:
        - accessPolicies/9522/accessLevels/specific_location
        groupKey: a3dad
        name: organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N
        scopedAccessSettings:
        - activeSettings:
            accessLevels:
            - accessPolicies/9522/accessLevels/device_trusted
          dryRunSettings:
            accessLevels:
            - accessPolicies/9522/accessLevels/specific_location
          scope:
            clientScope:
              restrictedClientApplication:
                clientId: 123.apps.googleusercontent.com
        - activeSettings:
            accessLevels:
            - accessPolicies/9522/accessLevels/device_trusted
          dryRunSettings:
            accessLevels:
            - accessPolicies/9522/accessLevels/specific_location
          scope:
            clientScope:
              restrictedClientApplication:
                name: Cloud Console
        - activeSettings:
            sessionSettings:
              sessionLength: 57600s
              sessionLengthEnabled: true
              sessionReauthMethod: LOGIN
          scope:
            clientScope:
              restrictedClientApplication:
                clientId: 123.apps.googleusercontent.com
        sessionSettings:
          sessionLength: 57600s
          sessionLengthEnabled: true
          sessionReauthMethod: LOGIN

    If filter is specified as principal:serviceAccount OR
    principal:serviceAccountProjectNumber, the output is printed in the
    following format:

        ---
        accessLevels:
        - accessPolicies/9522/accessLevels/device_trusted
        dryRunAccessLevels:
        - accessPolicies/9522/accessLevels/specific_location
        principal:
        serviceAccount: service_account@project.iam.gserviceaccount.com
        name: organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N

    Or

        ---
        accessLevels:
        - accessPolicies/9522/accessLevels/device_trusted
        dryRunAccessLevels:
        - accessPolicies/9522/accessLevels/specific_location
        principal:
        serviceAccountProjectNumber: 123456789
        name: organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N

    If filter is specified as principal:federatedPrincipal, the output is
    printed in the following format for a workload identity:

        ---
        accessLevels:
        - accessPolicies/9522/accessLevels/device_trusted
        dryRunAccessLevels:
        - accessPolicies/9522/accessLevels/specific_location
        principal:
          federatedPrincipal: principal://iam.googleapis.com/projects/123/locations/global/workloadIdentityPools/pool-id/subject/subject-id
        name: organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N

    Or for all workforce pools in an organization with project-scoped session
    settings:

        ---
        name: organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N
        principal:
          federatedPrincipal: principalSet://cloudresourcemanager.googleapis.com/organizations/256/type/WorkforcePool
        scopedAccessSettings:
        - activeSettings:
            sessionSettings:
              sessionLength: 7776000s
              sessionLengthEnabled: true
              sessionReauthMethod: LOGIN
          scope:
            clientScope:
              restrictedProject:
                name: projects/1234567890

FLAGS
     Organization resource - The parent organization of the bindings you want
     to list. This represents a Cloud resource.

     --organization=ORGANIZATION
        ID of the organization or fully qualified identifier for the
        organization.

        To set the organization attribute:
        * provide the argument --organization on the command line;
        * set the property access_context_manager/organization.

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
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    This variant is also available:

        $ gcloud alpha access-context-manager cloud-bindings list
```

### gcloud access-context-manager cloud-bindings update

```text
NAME
    gcloud access-context-manager cloud-bindings update - update an existing
        cloud access binding under an organization

SYNOPSIS
    gcloud access-context-manager cloud-bindings update
        (--binding=BINDING : --organization=ORGANIZATION) [--append]
        [--binding-file=YAML_FILE] [--dry-run-level=[DRY_RUN_LEVEL,...]]
        [--level=[LEVEL,...]] [--session-length=SESSION_LENGTH]
        [--session-reauth-method=SESSION_REAUTH_METHOD; default="login"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing cloud access binding. You can update the level, dry run
    level, session settings, and scoped access settings. They cannot all be
    empty.

    For Google Group bindings (--group-key), you can update any combination of
    the access level, dry run level, top-level session settings (1 hour to 24
    hours, or 0 to disable), and scoped access settings for specific
    applications (restrictedClientApplication).

    For bindings tied to all workforce pools in an organization
    (principalSet://cloudresourcemanager.googleapis.com/organizations/{organization_id}/type/WorkforcePool),
    you can update or append scoped access settings with restrictedProject or
    restrictedClientApplication and active sessionSettings using
    --binding-file. Top-level session settings, top-level access levels, dry
    run access levels, and dry run session settings are not supported for this
    principal type.

    Session settings are supported only for Google Groups and bindings tied to
    all workforce pools in an organization. No other bindings allow session
    settings, and requests containing session settings for other principal
    types are rejected.

EXAMPLES
    To update an existing cloud access binding, run the following command:

        $ gcloud access-context-manager cloud-bindings update \
            --binding=my-binding-id \
            --level=accessPolicies/123/accessLevels/new-abc

    To remove level and add dry run level, run the following command:

        $ gcloud access-context-manager cloud-bindings update \
            --binding=my-binding-id --level= \
            --dry-run-level=accessPolicies/123/accessLevels/new-def

    To replace scoped access settings (such as for specific applications on a
    group binding, or restricted projects or applications on a workforce pool
    binding) with a new list, run the following command:

        $ gcloud access-context-manager cloud-bindings update \
            --binding=my-binding-id --binding-file='binding.yaml'

    To append scoped access settings to the existing list, run the following
    command:

        $ gcloud access-context-manager cloud-bindings update \
            --binding=my-binding-id --binding-file='binding.yaml' --append

    Note this is only possible for scoped access settings that exclusively hold
    session settings (that is, no access levels).

    To update or append project-scoped session settings on a binding tied to
    all workforce pools in an organization:

        Create a binding.yaml file containing the desired scopedAccessSettings with restrictedProject:

        scopedAccessSettings:
        - scope:
            clientScope:
              restrictedProject:
                name: projects/1234567890
          activeSettings:
            sessionSettings:
              sessionLength: 7776000s
              sessionLengthEnabled: true
              sessionReauthMethod: LOGIN

        Then run the following command:

        $ gcloud access-context-manager cloud-bindings update \
          --binding=my-binding-id --binding-file='binding.yaml' --append

    To update or append application-scoped session settings on a binding tied
    to all workforce pools in an organization:

        Create a binding.yaml file containing the desired scopedAccessSettings with restrictedClientApplication:

        scopedAccessSettings:
        - scope:
            clientScope:
              restrictedClientApplication:
                name: "Gemini Enterprise mobile Android"
          activeSettings:
            sessionSettings:
              sessionLength: 7776000s
              sessionLengthEnabled: true
              sessionReauthMethod: LOGIN
        - scope:
            clientScope:
              restrictedClientApplication:
                name: "Gemini Enterprise mobile IOS"
          activeSettings:
            sessionSettings:
              sessionLength: 7776000s
              sessionLengthEnabled: true
              sessionReauthMethod: LOGIN

        Then run the following command:

        $ gcloud access-context-manager cloud-bindings update \
          --binding=my-binding-id --binding-file='binding.yaml' --append

    To update top-level session settings on a Google Group binding, run the
    following command:

        $ gcloud access-context-manager cloud-bindings update \
            --binding=my-binding-id --session-length=2h

    To update the session reauth method on a Google Group binding, you must
    also specify --session-length (this can be the existing value if you only
    want to modify the reauth method), run the following command:

        $ gcloud access-context-manager cloud-bindings update \
            --binding=my-binding-id --session-length=2h \
            --session-reauth-method=login

    To disable session settings on a Google Group binding, set
    --session-length=0 and run the following command:

        $ gcloud access-context-manager cloud-bindings update \
            --binding=my-binding-id --session-length=0

REQUIRED FLAGS
     Cloud access binding resource - The cloud access binding you want to
     update. The arguments in this group can be used to specify the attributes
     of this resource.

     This must be specified.

       --binding=BINDING
          ID of the cloud-access-binding or fully qualified identifier for the
          cloud-access-binding.

          To set the binding attribute:
          + provide the argument --binding on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --organization=ORGANIZATION
          The ID of the organization.

          To set the organization attribute:
          + provide the argument --binding on the command line with a fully
            specified name;
          + provide the argument --organization on the command line;
          + set the property access_context_manager/organization.

OPTIONAL FLAGS
     --append
        When true, append the ScopedAccessSettings in --binding-file to the
        existing ScopedAccessSettings on the binding. When false, the existing
        binding's ScopedAccessSettings will be overwritten. Defaults to false.
        You may only append ScopedAccessSettings that exclusively hold session
        settings (that is, no access levels).

     --binding-file=YAML_FILE
        Path to the file that contains a Google Cloud user access binding.

        This file contains a YAML-compliant object representing a
        GcpUserAccessBinding that contains scopedAccessSettings only. No other
        binding fields are allowed.

        For details about the object, see the API reference:
        https://docs.cloud.google.com/access-context-manager/docs/apply-policies-to-user-groups#define_configurations_for_specific_applications

        For Google Group bindings, scopedAccessSettings can specify
        restrictedClientApplication (using clientId or name) with accessLevels,
        dryRunAccessLevels, and sessionSettings (session length up to 24
        hours). The restrictedProject scope is not supported for Google Group
        bindings.

        For bindings tied to all workforce pools in an organization
        (principalSet://cloudresourcemanager.googleapis.com/organizations/{organization_id}/type/WorkforcePool),
        scopedAccessSettings can contain restrictedProject (format: name:
        projects/{project_number}) or restrictedClientApplication within
        scope.clientScope, and sessionSettings within activeSettings. For this
        configuration, the following requirements apply:
        * sessionLength must be set and must be between 1 hour and 90 days
          (for example, 7776000s).
        * sessionReauthMethod must be LOGIN or omitted (defaults to LOGIN).
        * sessionLengthEnabled must be set to true.
        * maxInactivity must be set to 0 or omitted.
        * useOidcMaxAge must be set to false or omitted.
        * For project scopes (restrictedProject), the session settings apply
          to all OAuth apps owned by the specified project.
        * For application scopes (restrictedClientApplication), only
          supported Google Cloud applications are allowed. name must be set to
          one of the following case-sensitive values: "Gemini Enterprise mobile
          Android", "Gemini Enterprise mobile IOS", or "Gemini Enterprise
          Desktop". Identifying applications by OAuth client ID (clientId) is
          not supported for workforce pools.
        * Access levels, dry run access levels, and dry run session settings
          are not allowed.

        The restrictedProject scope is usable only with bindings tied to all
        workforce pools in an organization.

        The file content replaces the corresponding fields in the existing
        binding, unless --append is specified. See --append help text for more
        details.

     --dry-run-level=[DRY_RUN_LEVEL,...]
        The dry run access level that replaces the existing dry run level for
        the given binding. The input must be the full identifier of an access
        level, such as accessPolicies/123/accessLevels/new-def. This parameter
        is not supported for bindings tied to all workforce pools in an
        organization.

     --level=[LEVEL,...]
        The access level that replaces the existing level for the given
        binding. The input must be the full identifier of an access level, such
        as accessPolicies/123/accessLevels/new-abc. This parameter is not
        supported for bindings tied to all workforce pools in an organization.

     --session-length=SESSION_LENGTH
        The maximum lifetime of a user session provided as an ISO 8601 duration
        string. Must be at least one hour or zero seconds, and no more than
        twenty-four hours. Granularity is limited to seconds.

        When --session-length=0, users in the group attached to this binding
        have infinite session length, which effectively disables session
        settings.

        A session begins after a user signs in successfully. If a user signs
        out before the end of the session lifetime, a new login creates a new
        session with a fresh lifetime. When a session expires, the user is
        asked to re-authenticate in accordance with --session-reauth-method.

        Setting --session-reauth-method when --session-length is empty raises
        an error.

        The session length is supported only for Google Group bindings. It
        isn't supported for bindings tied to all workforce pools in an
        organization, or for any other principal type. For bindings tied to all
        workforce pools in an organization, update or append session settings
        through --binding-file.

     --session-reauth-method=SESSION_REAUTH_METHOD; default="login"
        Specifies the security check a user must undergo when their session
        expires. Defaults to --session-reauth-method=LOGIN if unspecified and
        --session-length is set. Cannot be used when --session-length is empty
        or 0. This parameter is supported only for Google Group bindings. It
        isn't supported for bindings tied to all workforce pools in an
        organization; for those bindings, configure session settings through
        --binding-file. SESSION_REAUTH_METHOD must be one of:

         login
            The user will be prompted to perform regular login. Users who are
            enrolled for two-step verification and haven't chosen to "Remember
            this computer" will be prompted for their second factor.

         password
            The user will only be required to enter their password.

         security-key
            The user will be prompted to authenticate using their security key.
            If no security key has been configured, authentication will fall
            back to LOGIN. For help configuring your security key, see
            https://support.google.com/a/answer/2537800?hl=en#zippy=%2Cview-add-or-remove-security-keys

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    This variant is also available:

        $ gcloud alpha access-context-manager cloud-bindings update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud access-context-manager cloud-bindings update \
    --binding=my-binding-id \
    --session-length=0s
```

### gcloud alpha access-context-manager cloud-bindings create

```text
NAME
    gcloud alpha access-context-manager cloud-bindings create - create cloud
        access bindings for a specific group

SYNOPSIS
    gcloud alpha access-context-manager cloud-bindings create
        [--binding-file=YAML_FILE] [--dry-run-level=[DRY_RUN_LEVEL,...]]
        [--federated-principal=FEDERATED_PRINCIPAL] [--group-key=GROUP_KEY]
        [--level=[LEVEL,...]] [--organization=ORGANIZATION]
        [--service-account=SERVICE_ACCOUNT]
        [--service-account-project-number=SERVICE_ACCOUNT_PROJECT_NUMBER]
        [--session-length=SESSION_LENGTH]
        [--session-reauth-method=SESSION_REAUTH_METHOD; default="login"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager cloud-bindings delete

```text
NAME
    gcloud alpha access-context-manager cloud-bindings delete - delete a cloud
        access binding

SYNOPSIS
    gcloud alpha access-context-manager cloud-bindings delete
        (--binding=BINDING : --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager cloud-bindings describe

```text
NAME
    gcloud alpha access-context-manager cloud-bindings describe - show details
        about a cloud access binding

SYNOPSIS
    gcloud alpha access-context-manager cloud-bindings describe
        (--binding=BINDING : --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager cloud-bindings list

```text
NAME
    gcloud alpha access-context-manager cloud-bindings list - list cloud access
        bindings under an organization

SYNOPSIS
    gcloud alpha access-context-manager cloud-bindings list
        [--organization=ORGANIZATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager cloud-bindings update

```text
NAME
    gcloud alpha access-context-manager cloud-bindings update - update an
        existing cloud access binding under an organization

SYNOPSIS
    gcloud alpha access-context-manager cloud-bindings update
        (--binding=BINDING : --organization=ORGANIZATION) [--append]
        [--binding-file=YAML_FILE] [--dry-run-level=[DRY_RUN_LEVEL,...]]
        [--level=[LEVEL,...]] [--session-length=SESSION_LENGTH]
        [--session-reauth-method=SESSION_REAUTH_METHOD; default="login"]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (the help text above is verbatim): the `update` EXAMPLES say "To disable session settings on a Google Group binding, set --session-length=0", and the `--session-length` descriptions of `create` and `update` say "When --session-length=0, ..."; gcloud 593.0.0 rejects `--session-length=0` for both commands ("Duration must end with time part character."), while `--session-length=0s` parses. The flag takes "an ISO 8601 duration string", so write zero seconds as `0s`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `update` example that disables session settings passes `--session-length=0`; gcloud 593.0.0 rejects it ("Duration must end with time part character."). The `--session-length` description asks for "an ISO 8601 duration string. Must be at least one hour or zero seconds", so the runnable form passes zero seconds as `0s`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/cloud-bindings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
