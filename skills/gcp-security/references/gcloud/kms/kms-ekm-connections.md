---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/ekm-connections
---

# gcloud kms ekm-connections

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms ekm-connections add-iam-policy-binding

```text
NAME
    gcloud kms ekm-connections add-iam-policy-binding - add IAM policy binding
        for a kms ekm connection

SYNOPSIS
    gcloud kms ekm-connections add-iam-policy-binding
        (EKM_CONNECTION : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds a policy binding to the IAM policy of a kms ekm connection. A binding
    consists of at least one member, a role, and an optional condition.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' on the ekm connection laplace with location global,
    run:

        $ gcloud kms ekm-connections add-iam-policy-binding laplace \
            --location='global' --member='user:test-user@gmail.com' \
            --role='roles/editor'

    To add an IAM policy binding which expires at the end of the year 2022 for
    the role of 'roles/editor' and the user 'test-user@gmail.com' on the
    laplace fellowship and location global, run:

        $ gcloud kms ekm-connections add-iam-policy-binding laplace \
            --location='global' --member='user:test-user@gmail.com' \
            --role='roles/editor' \
            --condition='expression=request.time <
         timestamp("2023-01-01T00:00:00Z"),title=expires_end_of_2022,descrip\
        tion=Expires at midnight on 2022-12-31'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Ekm connection resource - The ekm connection to add the IAM policy
     binding. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument ekm_connection on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EKM_CONNECTION
          ID of the ekm connection or fully qualified identifier for the ekm
          connection.

          To set the ekm_connection attribute:
          + provide the argument ekm_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the resource.

          To set the location attribute:
          + provide the argument ekm_connection on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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
    This command uses the cloudkms/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/kms/

NOTES
    These variants are also available:

        $ gcloud alpha kms ekm-connections add-iam-policy-binding

        $ gcloud beta kms ekm-connections add-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud kms ekm-connections add-iam-policy-binding laplace \
    --location='global' \
    --member='user:test-user@gmail.com' \
    --role='roles/cloudkms.ekmConnectionsAdmin' \
    --condition='expression=request.time < timestamp("2023-01-01T00:00:00Z"),title=expires_end_of_2022,description=Expires at midnight on 2022-12-31'
```

### gcloud kms ekm-connections create

```text
NAME
    gcloud kms ekm-connections create - create a new ekm connection

SYNOPSIS
    gcloud kms ekm-connections create (EKM_CONNECTION : --location=LOCATION)
        --hostname=HOSTNAME
        --server-certificates-files=[SERVER_CERTIFICATES,...]
        --service-directory-service=SERVICE_DIRECTORY_SERVICE
        [--endpoint-filter=ENDPOINT_FILTER]
        [--crypto-space-path=CRYPTO_SPACE_PATH
          --key-management-mode=KEY_MANAGEMENT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a new connection within the given location.

EXAMPLES
    The following command creates an ekm connection named laplace within the
    location us-central1:

        $ gcloud kms ekm-connections create laplace --location=us-central1 \
            --service-directory-service="foo" \
            --endpoint-filter="foo > bar" --hostname="hostname.foo" \
            --server-certificates-files=foo.pem,bar.pem

    The following command creates an ekm connection named laplace within the
    location us-central1 in cloud-kms key management mode with the required
    crypto-space-path :

        $ gcloud kms ekm-connections create laplace --location=us-central1 \
            --service-directory-service="foo" \
            --endpoint-filter="foo > bar" --hostname="hostname.foo" \
            --key-management-mode=cloud-kms --crypto-space-path="foo" \
            --server-certificates-files=foo.pem,bar.pem

POSITIONAL ARGUMENTS
     Ekmconnection resource - The KMS ekm connection resource. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument ekm_connection on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       EKM_CONNECTION
          ID of the ekmconnection or fully qualified identifier for the
          ekmconnection.

          To set the ekmconnection attribute:
          + provide the argument ekm_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Google Cloud location for the ekmconnection.

          To set the location attribute:
          + provide the argument ekm_connection on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --hostname=HOSTNAME
        The hostname of the EKM replica used at TLS and HTTP layers.

     --server-certificates-files=[SERVER_CERTIFICATES,...]
        A list of filenames of leaf server certificates used to authenticate
        HTTPS connections to the EKM replica in PEM format. If files are not in
        PEM, the assumed format will be DER.

     --service-directory-service=SERVICE_DIRECTORY_SERVICE
        The resource name of the Service Directory service pointing to an EKM
        replica.

OPTIONAL FLAGS
     --endpoint-filter=ENDPOINT_FILTER
        The filter applied to the endpoints of the resolved service. If no
        filter is specified, all endpoints will be considered.

     Specifies the key management mode for the EkmConnection and associated
     fields.

     --crypto-space-path=CRYPTO_SPACE_PATH
        Crypto space path for the EkmConnection. Required during EkmConnection
        creation if --key-management-mode=cloud-kms.

     --key-management-mode=KEY_MANAGEMENT_MODE
        Key management mode of the ekm connection. An EkmConnection in
        cloud-kms mode means Cloud KMS will attempt to create and manage the
        key material that resides on the EKM for crypto keys created with this
        EkmConnection. An EkmConnection in manual mode means the external key
        material will not be managed by Cloud KMS. Omitting the flag defaults
        to manual. KEY_MANAGEMENT_MODE must be one of: manual, cloud-kms.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms ekm-connections create

        $ gcloud beta kms ekm-connections create
```

### gcloud kms ekm-connections describe

```text
NAME
    gcloud kms ekm-connections describe - get metadata for an ekmconnection

SYNOPSIS
    gcloud kms ekm-connections describe (EKM_CONNECTION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns metadata for the given ekmconnection.

EXAMPLES
    The following command returns the metadata for the ekmconnection laplace in
    the location us-east1:

        $ gcloud kms ekm-connections describe laplace --location=us-east1

POSITIONAL ARGUMENTS
     Ekmconnection resource - The KMS ekm connection resource. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument ekm_connection on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       EKM_CONNECTION
          ID of the ekmconnection or fully qualified identifier for the
          ekmconnection.

          To set the ekmconnection attribute:
          + provide the argument ekm_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Google Cloud location for the ekmconnection.

          To set the location attribute:
          + provide the argument ekm_connection on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms ekm-connections describe

        $ gcloud beta kms ekm-connections describe
```

### gcloud kms ekm-connections get-iam-policy

```text
NAME
    gcloud kms ekm-connections get-iam-policy - get the IAM policy for an ekm
        connection

SYNOPSIS
    gcloud kms ekm-connections get-iam-policy
        (EKM_CONNECTION : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays the IAM policy associated with an ekm connection. If formatted as
    JSON, the output can be edited and used as a policy file for
    set-iam-policy. The output includes an "etag" field identifying the version
    emitted and allowing detection of concurrent policy updates; see $ gcloud
    kms ekm-connections set-iam-policy for additional details.

EXAMPLES
    To print the IAM policy for a given ekm connection, run:

        $ gcloud kms ekm-connections get-iam-policy --location=my-location \
            my-ekmconnection

POSITIONAL ARGUMENTS
     Ekm connection resource - The ekm connection for which to get the IAM
     policy binding. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument ekm_connection on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EKM_CONNECTION
          ID of the ekm connection or fully qualified identifier for the ekm
          connection.

          To set the ekm_connection attribute:
          + provide the argument ekm_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the resource.

          To set the location attribute:
          + provide the argument ekm_connection on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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
    This command uses the cloudkms/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/kms/

NOTES
    These variants are also available:

        $ gcloud alpha kms ekm-connections get-iam-policy

        $ gcloud beta kms ekm-connections get-iam-policy
```

### gcloud kms ekm-connections list

```text
NAME
    gcloud kms ekm-connections list - list ekmconnections within a location

SYNOPSIS
    gcloud kms ekm-connections list --location=LOCATION [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all ekmconnections within the given location.

EXAMPLES
    The following command lists a maximum of five ekmconnections in the
    location global:

        $ gcloud kms ekm-connections list --location=global --limit=5

REQUIRED FLAGS
     Location resource - The KMS location resource. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

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

        $ gcloud alpha kms ekm-connections list

        $ gcloud beta kms ekm-connections list
```

### gcloud kms ekm-connections remove-iam-policy-binding

```text
NAME
    gcloud kms ekm-connections remove-iam-policy-binding - remove IAM policy
        binding for a kms ekm connection

SYNOPSIS
    gcloud kms ekm-connections remove-iam-policy-binding
        (EKM_CONNECTION : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes a policy binding from the IAM policy of a kms ekm connection. A
    binding consists of at least one member, a role, and an optional condition.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' on the ekm connection laplace with location global,
    run:

        $ gcloud kms ekm-connections remove-iam-policy-binding laplace \
            --location='global' --member='user:test-user@gmail.com' \
            --role='roles/editor'

    To remove an IAM policy binding with a condition of
    expression='request.time < timestamp("2023-01-01T00:00:00Z")',
    title='expires_end_of_2022', and description='Expires at midnight on
    2022-12-31' for the role of 'roles/editor' for the user
    'test-user@gmail.com' on the ekm connection laplace with location global,
    run:

        $ gcloud kms ekm-connections remove-iam-policy-binding laplace \
            --location='global' --member='user:test-user@gmail.com' \
            --role='roles/editor' \
            --condition='expression=request.time <
         timestamp("2023-01-01T00:00:00Z"),title=expires_end_of_2022,descrip\
        tion=Expires at midnight on 2022-12-31'

    To remove all IAM policy bindings regardless of the condition for the role
    of 'roles/editor' and for the user 'test-user@gmail.com' on the ekm
    connection laplace with location global, run:

        $ gcloud kms ekm-connections remove-iam-policy-binding laplace \
            --location='global' --member='user:test-user@gmail.com' \
            --role='roles/editor' --all

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Ekm connection resource - The ekm connection to remove the IAM policy
     binding. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument ekm_connection on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EKM_CONNECTION
          ID of the ekm connection or fully qualified identifier for the ekm
          connection.

          To set the ekm_connection attribute:
          + provide the argument ekm_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the resource.

          To set the location attribute:
          + provide the argument ekm_connection on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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
    This command uses the cloudkms/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/kms/

NOTES
    These variants are also available:

        $ gcloud alpha kms ekm-connections remove-iam-policy-binding

        $ gcloud beta kms ekm-connections remove-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud kms ekm-connections remove-iam-policy-binding laplace \
    --location='global' \
    --member='user:test-user@gmail.com' \
    --role='roles/cloudkms.ekmConnectionsAdmin' \
    --condition='expression=request.time < timestamp("2023-01-01T00:00:00Z"),title=expires_end_of_2022,description=Expires at midnight on 2022-12-31'
```

### gcloud kms ekm-connections set-iam-policy

```text
NAME
    gcloud kms ekm-connections set-iam-policy - set the IAM policy binding for
        a KMS ekm connection

SYNOPSIS
    gcloud kms ekm-connections set-iam-policy
        (EKM_CONNECTION : --location=LOCATION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given ekm connection as defined in a JSON or
    YAML file.

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    'policy.json' and set it for the ekm connection 'laplace' with the location
    'global':

        $ gcloud kms ekm-connections set-iam-policy laplace policy.json \
            --location=global

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Ekm connection resource - The ekm connection for which to set the IAM
     policy binding. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument ekm_connection on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       EKM_CONNECTION
          ID of the ekm connection or fully qualified identifier for the ekm
          connection.

          To set the ekm_connection attribute:
          + provide the argument ekm_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the resource.

          To set the location attribute:
          + provide the argument ekm_connection on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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
    This command uses the cloudkms/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/kms/

NOTES
    These variants are also available:

        $ gcloud alpha kms ekm-connections set-iam-policy

        $ gcloud beta kms ekm-connections set-iam-policy
```

### gcloud kms ekm-connections update

```text
NAME
    gcloud kms ekm-connections update - update an ekmconnection

SYNOPSIS
    gcloud kms ekm-connections update (EKM_CONNECTION : --location=LOCATION)
        [--endpoint-filter=ENDPOINT_FILTER] [--hostname=HOSTNAME]
        [--server-certificates-files=[SERVER_CERTIFICATES,...]]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE]
        [--crypto-space-path=CRYPTO_SPACE_PATH
          --key-management-mode=KEY_MANAGEMENT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud kms ekm-connections update can be used to update the ekmconnection.
    Updates can be made to the ekmconnection's service resolver's fields.

EXAMPLES
    The following command updates an ekm-connection named laplace service
    resolver's hostname within location us-east1:

        $ gcloud kms ekm-connections update laplace --location=us-east1 \
            --hostname=newhostname.foo

    The following command updates an ekm-connection named laplace service
    resolver's service_directory_service, endpoint_filter, hostname, and
    server_certificates within location us-east1:

        $ gcloud kms ekm-connections update laplace --location=us-east1 \
            --service-directory-service="foo" \
            --endpoint-filter="foo > bar" --hostname="newhostname.foo" \
            --server-certificates-files=foo.pem,bar.pem

    The following command updates an ekm-connection named laplace
    key_management_mode within location us-east1:

        $ gcloud kms ekm-connections update laplace --location=us-east1 \
            --key-management-mode=manual

POSITIONAL ARGUMENTS
     Ekmconnection resource - The KMS ekm connection resource. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument ekm_connection on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       EKM_CONNECTION
          ID of the ekmconnection or fully qualified identifier for the
          ekmconnection.

          To set the ekmconnection attribute:
          + provide the argument ekm_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Google Cloud location for the ekmconnection.

          To set the location attribute:
          + provide the argument ekm_connection on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --endpoint-filter=ENDPOINT_FILTER
        The filter applied to the endpoints of the resolved service. If no
        filter is specified, all endpoints will be considered.

     --hostname=HOSTNAME
        The hostname of the EKM replica used at TLS and HTTP layers.

     --server-certificates-files=[SERVER_CERTIFICATES,...]
        A list of filenames of leaf server certificates used to authenticate
        HTTPS connections to the EKM replica in PEM format. If files are not in
        PEM, the assumed format will be DER.

     --service-directory-service=SERVICE_DIRECTORY_SERVICE
        The resource name of the Service Directory service pointing to an EKM
        replica.

     Specifies the key management mode for the EkmConnection and associated
     fields.

     --crypto-space-path=CRYPTO_SPACE_PATH
        Crypto space path for the EkmConnection. Required during EkmConnection
        creation if --key-management-mode=cloud-kms.

     --key-management-mode=KEY_MANAGEMENT_MODE
        Key management mode of the ekm connection. An EkmConnection in
        cloud-kms mode means Cloud KMS will attempt to create and manage the
        key material that resides on the EKM for crypto keys created with this
        EkmConnection. An EkmConnection in manual mode means the external key
        material will not be managed by Cloud KMS. Omitting the flag defaults
        to manual. KEY_MANAGEMENT_MODE must be one of: manual, cloud-kms.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms ekm-connections update

        $ gcloud beta kms ekm-connections update
```

### gcloud beta kms ekm-connections add-iam-policy-binding

```text
NAME
    gcloud beta kms ekm-connections add-iam-policy-binding - add IAM policy
        binding for a kms ekm connection

SYNOPSIS
    gcloud beta kms ekm-connections add-iam-policy-binding
        (EKM_CONNECTION : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms ekm-connections create

```text
NAME
    gcloud beta kms ekm-connections create - create a new ekm connection

SYNOPSIS
    gcloud beta kms ekm-connections create
        (EKM_CONNECTION : --location=LOCATION) --hostname=HOSTNAME
        --server-certificates-files=[SERVER_CERTIFICATES,...]
        --service-directory-service=SERVICE_DIRECTORY_SERVICE
        [--endpoint-filter=ENDPOINT_FILTER]
        [--crypto-space-path=CRYPTO_SPACE_PATH
          --key-management-mode=KEY_MANAGEMENT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms ekm-connections describe

```text
NAME
    gcloud beta kms ekm-connections describe - get metadata for an
        ekmconnection

SYNOPSIS
    gcloud beta kms ekm-connections describe
        (EKM_CONNECTION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms ekm-connections get-iam-policy

```text
NAME
    gcloud beta kms ekm-connections get-iam-policy - get the IAM policy for an
        ekm connection

SYNOPSIS
    gcloud beta kms ekm-connections get-iam-policy
        (EKM_CONNECTION : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms ekm-connections list

```text
NAME
    gcloud beta kms ekm-connections list - list ekmconnections within a
        location

SYNOPSIS
    gcloud beta kms ekm-connections list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms ekm-connections remove-iam-policy-binding

```text
NAME
    gcloud beta kms ekm-connections remove-iam-policy-binding - remove IAM
        policy binding for a kms ekm connection

SYNOPSIS
    gcloud beta kms ekm-connections remove-iam-policy-binding
        (EKM_CONNECTION : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms ekm-connections set-iam-policy

```text
NAME
    gcloud beta kms ekm-connections set-iam-policy - set the IAM policy binding
        for a KMS ekm connection

SYNOPSIS
    gcloud beta kms ekm-connections set-iam-policy
        (EKM_CONNECTION : --location=LOCATION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms ekm-connections update

```text
NAME
    gcloud beta kms ekm-connections update - update an ekmconnection

SYNOPSIS
    gcloud beta kms ekm-connections update
        (EKM_CONNECTION : --location=LOCATION)
        [--endpoint-filter=ENDPOINT_FILTER] [--hostname=HOSTNAME]
        [--server-certificates-files=[SERVER_CERTIFICATES,...]]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE]
        [--crypto-space-path=CRYPTO_SPACE_PATH
          --key-management-mode=KEY_MANAGEMENT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms ekm-connections add-iam-policy-binding

```text
NAME
    gcloud alpha kms ekm-connections add-iam-policy-binding - add IAM policy
        binding for a kms ekm connection

SYNOPSIS
    gcloud alpha kms ekm-connections add-iam-policy-binding
        (EKM_CONNECTION : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms ekm-connections create

```text
NAME
    gcloud alpha kms ekm-connections create - create a new ekm connection

SYNOPSIS
    gcloud alpha kms ekm-connections create
        (EKM_CONNECTION : --location=LOCATION) --hostname=HOSTNAME
        --server-certificates-files=[SERVER_CERTIFICATES,...]
        --service-directory-service=SERVICE_DIRECTORY_SERVICE
        [--endpoint-filter=ENDPOINT_FILTER]
        [--crypto-space-path=CRYPTO_SPACE_PATH
          --key-management-mode=KEY_MANAGEMENT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms ekm-connections describe

```text
NAME
    gcloud alpha kms ekm-connections describe - get metadata for an
        ekmconnection

SYNOPSIS
    gcloud alpha kms ekm-connections describe
        (EKM_CONNECTION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms ekm-connections get-iam-policy

```text
NAME
    gcloud alpha kms ekm-connections get-iam-policy - get the IAM policy for an
        ekm connection

SYNOPSIS
    gcloud alpha kms ekm-connections get-iam-policy
        (EKM_CONNECTION : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms ekm-connections list

```text
NAME
    gcloud alpha kms ekm-connections list - list ekmconnections within a
        location

SYNOPSIS
    gcloud alpha kms ekm-connections list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms ekm-connections remove-iam-policy-binding

```text
NAME
    gcloud alpha kms ekm-connections remove-iam-policy-binding - remove IAM
        policy binding for a kms ekm connection

SYNOPSIS
    gcloud alpha kms ekm-connections remove-iam-policy-binding
        (EKM_CONNECTION : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms ekm-connections set-iam-policy

```text
NAME
    gcloud alpha kms ekm-connections set-iam-policy - set the IAM policy
        binding for a KMS ekm connection

SYNOPSIS
    gcloud alpha kms ekm-connections set-iam-policy
        (EKM_CONNECTION : --location=LOCATION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms ekm-connections update

```text
NAME
    gcloud alpha kms ekm-connections update - update an ekmconnection

SYNOPSIS
    gcloud alpha kms ekm-connections update
        (EKM_CONNECTION : --location=LOCATION)
        [--endpoint-filter=ENDPOINT_FILTER] [--hostname=HOSTNAME]
        [--server-certificates-files=[SERVER_CERTIFICATES,...]]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE]
        [--crypto-space-path=CRYPTO_SPACE_PATH
          --key-management-mode=KEY_MANAGEMENT_MODE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Example error: the `add-iam-policy-binding` example with `--condition` uses `--role='roles/editor'`; gcloud 593.0.0 rejects it ("Binding with a condition and a basic role is not allowed. Basic roles are `roles/editor`, `roles/owner`, and `roles/viewer`."), and the `--condition` description says "When the condition is specified and is not None, --role cannot be a basic role". Use a role that is not a basic role.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the conditional binding examples grant `roles/editor`, but the `--condition` description on this page says that with a condition `--role cannot be a basic role` (`roles/editor`, `roles/owner`, `roles/viewer`), and gcloud 593.0.0 rejects the `add-iam-policy-binding` example ("Binding with a condition and a basic role is not allowed"); the runnable forms of `add-iam-policy-binding` and the matching `remove-iam-policy-binding` use `roles/cloudkms.ekmConnectionsAdmin` (Cloud KMS EkmConnections Admin, which includes `cloudkms.ekmConfigs.get`, `cloudkms.ekmConfigs.update` and the `cloudkms.ekmConnections.*` permissions; see `iam/cloudkms.md`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/ekm-connections (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
