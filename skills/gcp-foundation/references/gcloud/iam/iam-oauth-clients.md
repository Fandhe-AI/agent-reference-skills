---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/oauth-clients
---

# gcloud iam oauth-clients

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam oauth-clients create

```text
NAME
    gcloud iam oauth-clients create - create an OAuth client

SYNOPSIS
    gcloud iam oauth-clients create (OAUTH_CLIENT : --location=LOCATION)
        --allowed-grant-types=[ALLOWED_GRANT_TYPES,...]
        --allowed-redirect-uris=[ALLOWED_REDIRECT_URIS,...]
        --allowed-scopes=[ALLOWED_SCOPES,...] --client-type=CLIENT_TYPE
        [--description=DESCRIPTION] [--disabled] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new OAuth client.

EXAMPLES
    The following command creates a disabled OAuth client with ID
    my-oauth-client in the default project:

        $ gcloud iam oauth-clients create my-oauth-client \
            --location="global" --client-type="confidential-client" \
            --display-name="My oauth client" \
            --description="My oauth client description" --disabled \
            --allowed-grant-types="authorization-code-grant,refresh-token-gr\
        ant" \
            --allowed-scopes="https://www.googleapis.com/auth/cloud-platform\
        ,openid" --allowed-redirect-uris="https://example.com"

POSITIONAL ARGUMENTS
     Oauth client resource - The OAuth client to create. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument oauth_client on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OAUTH_CLIENT
          ID of the oauth client or fully qualified identifier for the oauth
          client.

          To set the oauth_client attribute:
          + provide the argument oauth_client on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument oauth_client on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --allowed-grant-types=[ALLOWED_GRANT_TYPES,...]
        A list of OAuth grant types that are allowed for the OAuth client.

        The following grant types are currently supported:

        * authorization-code-grant

        * refresh-token-grant

     --allowed-redirect-uris=[ALLOWED_REDIRECT_URIS,...]
        A list of redirect uris that is allowed for redirecting when the
        authorization is completed.

     --allowed-scopes=[ALLOWED_SCOPES,...]
        A list of scopes that the OAuth client is allowed to request during
        OAuth flows.

        The following scopes are currently supported:

        * https://www.googleapis.com/auth/cloud-platform: View, edit,
          configure, and delete your Google Cloud data, and view the email
          address for your Google Account.

        * openid: Associate you with your personal info on Google Cloud.

        * email: The OAuth client can read a federated identity's email
          address.

        * groups: The OAuth client can read a federated identity's groups.

     --client-type=CLIENT_TYPE
        The type of OAuth client. CLIENT_TYPE must be one of:
        confidential-client, public-client.

OPTIONAL FLAGS
     --description=DESCRIPTION
        A description of the OAuth client. Cannot exceed 256 characters.

     --disabled
        Disables the OAuth client. You cannot use a disabled OAuth client for
        login. Include --no-disabled to enable a disabled OAuth client.

     --display-name=DISPLAY_NAME
        A display name for the OAuth client. Cannot exceed 32 characters.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud alpha iam oauth-clients create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud iam oauth-clients create my-oauth-client \
    --location="global" \
    --client-type="confidential-client" \
    --display-name="My oauth client" \
    --description="My oauth client description" \
    --disabled \
    --allowed-grant-types="authorization-code-grant,refresh-token-grant" \
    --allowed-scopes="https://www.googleapis.com/auth/cloud-platform,openid" \
    --allowed-redirect-uris="https://example.com"
```

### gcloud iam oauth-clients credentials create

```text
NAME
    gcloud iam oauth-clients credentials create - create an OAuth client
        credential

SYNOPSIS
    gcloud iam oauth-clients credentials create
        (CREDENTIAL : --location=LOCATION --oauth-client=OAUTH_CLIENT)
        [--disabled] [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new OAuth client credential.

EXAMPLES
    To create a disabled OAuth client credential with ID
    my-oauth-client-credential in the default project, run:

        $ gcloud iam oauth-clients credentials create \
            my-oauth-client-credential --location="global" \
            --oauth-client="my-oauth-client" \
            --display-name="My OAuth client credential" --disabled

POSITIONAL ARGUMENTS
     Oauth client credential resource - The OAuth client credential to create.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument credential on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CREDENTIAL
          ID of the oauth client credential or fully qualified identifier for
          the oauth client credential.

          To set the credential attribute:
          + provide the argument credential on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument credential on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --oauth-client=OAUTH_CLIENT
          ID to use for the OAuth client, which becomes the final component of
          the resource name. This value should be 4-32 characters, and may
          contain the characters [a-z0-9-]. The prefix gcp- is reserved for use
          by Google, and may not be specified.

          To set the oauth-client attribute:
          + provide the argument credential on the command line with a fully
            specified name;
          + provide the argument --oauth-client on the command line.

FLAGS
     --disabled
        Disables the OAuth client credential. You cannot use a disabled OAuth
        client credential for OAuth. Include --no-disabled to enable a disabled
        OAuth client credential.

     --display-name=DISPLAY_NAME
        A display name for the OAuth client credential. Cannot exceed 32
        characters.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud alpha iam oauth-clients credentials create
```

### gcloud iam oauth-clients credentials delete

```text
NAME
    gcloud iam oauth-clients credentials delete - delete an OAuth client
        credential

SYNOPSIS
    gcloud iam oauth-clients credentials delete
        (CREDENTIAL : --location=LOCATION --oauth-client=OAUTH_CLIENT)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an OAuth client credential.

EXAMPLES
    To delete the OAuth client credential with ID my-oauth-client-credential in
    the default project, run:

        $ gcloud iam oauth-clients credentials delete \
            my-oauth-client-credential --location="global" \
            --oauth-client="my-oauth-client"

POSITIONAL ARGUMENTS
     Oauth client credential resource - The OAuth client credential to delete.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument credential on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CREDENTIAL
          ID of the oauth client credential or fully qualified identifier for
          the oauth client credential.

          To set the credential attribute:
          + provide the argument credential on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument credential on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --oauth-client=OAUTH_CLIENT
          ID to use for the OAuth client, which becomes the final component of
          the resource name. This value should be 4-32 characters, and may
          contain the characters [a-z0-9-]. The prefix gcp- is reserved for use
          by Google, and may not be specified.

          To set the oauth-client attribute:
          + provide the argument credential on the command line with a fully
            specified name;
          + provide the argument --oauth-client on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud alpha iam oauth-clients credentials delete
```

### gcloud iam oauth-clients credentials describe

```text
NAME
    gcloud iam oauth-clients credentials describe - describe an OAuth client
        credential

SYNOPSIS
    gcloud iam oauth-clients credentials describe
        (CREDENTIAL : --location=LOCATION --oauth-client=OAUTH_CLIENT)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an OAuth client credential.

EXAMPLES
    To describe the OAuth client credential with ID my-oauth-client-credential
    in the default project, run:

        $ gcloud iam oauth-clients credentials describe \
            my-oauth-client-credential --location="global" \
            --oauth-client="my-oauth-client"

POSITIONAL ARGUMENTS
     Oauth client credential resource - The OAuth client credential you want to
     describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument credential on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CREDENTIAL
          ID of the oauth client credential or fully qualified identifier for
          the oauth client credential.

          To set the credential attribute:
          + provide the argument credential on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument credential on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --oauth-client=OAUTH_CLIENT
          ID to use for the OAuth client, which becomes the final component of
          the resource name. This value should be 4-32 characters, and may
          contain the characters [a-z0-9-]. The prefix gcp- is reserved for use
          by Google, and may not be specified.

          To set the oauth-client attribute:
          + provide the argument credential on the command line with a fully
            specified name;
          + provide the argument --oauth-client on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud alpha iam oauth-clients credentials describe
```

### gcloud iam oauth-clients credentials list

```text
NAME
    gcloud iam oauth-clients credentials list - list OAuth client credentials

SYNOPSIS
    gcloud iam oauth-clients credentials list
        (--oauth-client=OAUTH_CLIENT : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List OAuth client credentials.

EXAMPLES
    To list all OAuth client credentials in the default project, run:

        $ gcloud iam oauth-clients credentials list --location="global" \
            --oauth-client="my-oauth-client"

REQUIRED FLAGS
     Oauth client resource - The OAuth client you want to list credentials for.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --oauth-client on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --oauth-client=OAUTH_CLIENT
          ID of the oauth client or fully qualified identifier for the oauth
          client.

          To set the oauth-client attribute:
          + provide the argument --oauth-client on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument --oauth-client on the command line with a
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
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud alpha iam oauth-clients credentials list
```

### gcloud iam oauth-clients credentials update

```text
NAME
    gcloud iam oauth-clients credentials update - update an OAuth client
        credential

SYNOPSIS
    gcloud iam oauth-clients credentials update
        (CREDENTIAL : --location=LOCATION --oauth-client=OAUTH_CLIENT)
        [--disabled] [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an OAuth client credential.

EXAMPLES
    To update the OAuth client credential with ID my-oauth-client-credential in
    the default project, run:

        $ gcloud iam oauth-clients credentials update \
            my-oauth-client-credential --location="global" \
            --oauth-client="my-oauth-client" \
            --display-name="My OAuth client credential" --disabled

POSITIONAL ARGUMENTS
     Oauth client credential resource - The OAuth client credential to update.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument credential on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CREDENTIAL
          ID of the oauth client credential or fully qualified identifier for
          the oauth client credential.

          To set the credential attribute:
          + provide the argument credential on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument credential on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --oauth-client=OAUTH_CLIENT
          ID to use for the OAuth client, which becomes the final component of
          the resource name. This value should be 4-32 characters, and may
          contain the characters [a-z0-9-]. The prefix gcp- is reserved for use
          by Google, and may not be specified.

          To set the oauth-client attribute:
          + provide the argument credential on the command line with a fully
            specified name;
          + provide the argument --oauth-client on the command line.

FLAGS
     --disabled
        Disables the OAuth client credential. You cannot use a disabled OAuth
        client credential for OAuth. Include --no-disabled to enable a disabled
        OAuth client credential.

     --display-name=DISPLAY_NAME
        A display name for the OAuth client credential. Cannot exceed 32
        characters.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud alpha iam oauth-clients credentials update
```

### gcloud iam oauth-clients delete

```text
NAME
    gcloud iam oauth-clients delete - delete an OAuth client

SYNOPSIS
    gcloud iam oauth-clients delete (OAUTH_CLIENT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an OAuth client.

EXAMPLES
    The following command deletes the OAuth client with the ID my-oauth-client
    in the default project:

        $ gcloud iam oauth-clients delete my-oauth-client --location="global"

POSITIONAL ARGUMENTS
     Oauth client resource - The OAuth client to delete. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument oauth_client on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OAUTH_CLIENT
          ID of the oauth client or fully qualified identifier for the oauth
          client.

          To set the oauth_client attribute:
          + provide the argument oauth_client on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument oauth_client on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud alpha iam oauth-clients delete
```

### gcloud iam oauth-clients describe

```text
NAME
    gcloud iam oauth-clients describe - describe an OAuth client

SYNOPSIS
    gcloud iam oauth-clients describe (OAUTH_CLIENT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an OAuth client.

EXAMPLES
    The following command describes the OAuth client with the ID
    my-oauth-client in the default project:

        $ gcloud iam oauth-clients describe my-oauth-client \
            --location="global"

POSITIONAL ARGUMENTS
     Oauth client resource - The OAuth client you want to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument oauth_client on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OAUTH_CLIENT
          ID of the oauth client or fully qualified identifier for the oauth
          client.

          To set the oauth_client attribute:
          + provide the argument oauth_client on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument oauth_client on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud alpha iam oauth-clients describe
```

### gcloud iam oauth-clients list

```text
NAME
    gcloud iam oauth-clients list - list OAuth clients

SYNOPSIS
    gcloud iam oauth-clients list --location=LOCATION [--show-deleted]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List OAuth clients.

EXAMPLES
    The following command lists all OAuth clients in the default project,
    including the soft-deleted ones:

        $ gcloud iam oauth-clients list --location="global" --show-deleted

REQUIRED FLAGS
     Location resource - The location you want to list OAuth clients for. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

FLAGS
     --show-deleted
        Whether to return soft-deleted OAuth clients.

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
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud alpha iam oauth-clients list
```

### gcloud iam oauth-clients undelete

```text
NAME
    gcloud iam oauth-clients undelete - undelete an OAuth client

SYNOPSIS
    gcloud iam oauth-clients undelete (OAUTH_CLIENT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Undelete an OAuth client.

EXAMPLES
    The following command undeletes the OAuth client with the ID
    my-oauth-client in the default project:

        $ gcloud iam oauth-clients undelete my-oauth-client \
            --location="global"

POSITIONAL ARGUMENTS
     Oauth client resource - The OAuth client to undelete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument oauth_client on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OAUTH_CLIENT
          ID of the oauth client or fully qualified identifier for the oauth
          client.

          To set the oauth_client attribute:
          + provide the argument oauth_client on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument oauth_client on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud alpha iam oauth-clients undelete
```

### gcloud iam oauth-clients update

```text
NAME
    gcloud iam oauth-clients update - update an OAuth client

SYNOPSIS
    gcloud iam oauth-clients update (OAUTH_CLIENT : --location=LOCATION)
        [--allowed-grant-types=[ALLOWED_GRANT_TYPES,...]]
        [--allowed-redirect-uris=[ALLOWED_REDIRECT_URIS,...]]
        [--allowed-scopes=[ALLOWED_SCOPES,...]] [--description=DESCRIPTION]
        [--disabled] [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an OAuth Client.

EXAMPLES
    The following command updates the OAuth client with ID my-oauth-client in
    the default project:

        $ gcloud iam oauth-clients update my-oauth-client \
            --location="global" --display-name="My oauth client" \
            --description="My oauth client description" --disabled \
            --allowed-grant-types="authorization-code-grant,refresh-token-gr\
        ant" \
            --allowed-scopes="https://www.googleapis.com/auth/cloud-platform\
        ,openid" --allowed-redirect-uris="http://localhost/"

POSITIONAL ARGUMENTS
     Oauth client resource - The OAuth client to update. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument oauth_client on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OAUTH_CLIENT
          ID of the oauth client or fully qualified identifier for the oauth
          client.

          To set the oauth_client attribute:
          + provide the argument oauth_client on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument oauth_client on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --allowed-grant-types=[ALLOWED_GRANT_TYPES,...]
        A list of OAuth grant types that are allowed for the OAuth client.

        The following grant types are currently supported:

        * authorization-code-grant

        * refresh-token-grant

     --allowed-redirect-uris=[ALLOWED_REDIRECT_URIS,...]
        A list of redirect uris that is allowed for redirecting when the
        authorization is completed.

     --allowed-scopes=[ALLOWED_SCOPES,...]
        A list of scopes that the OAuth client is allowed to request during
        OAuth flows.

        The following scopes are currently supported:

        * https://www.googleapis.com/auth/cloud-platform: View, edit,
          configure, and delete your Google Cloud data, and view the email
          address for your Google Account.

        * openid: Associate you with your personal info on Google Cloud.

        * email: The OAuth client can read a federated identity's email
          address.

        * groups: The OAuth client can read a federated identity's groups.

     --description=DESCRIPTION
        A description of the OAuth client. Cannot exceed 256 characters.

     --disabled
        Disables the OAuth client. You cannot use a disabled OAuth client for
        login. Include --no-disabled to enable a disabled OAuth client.

     --display-name=DISPLAY_NAME
        A display name for the OAuth client. Cannot exceed 32 characters.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    This variant is also available:

        $ gcloud alpha iam oauth-clients update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud iam oauth-clients update my-oauth-client \
    --location="global" \
    --display-name="My oauth client" \
    --description="My oauth client description" \
    --disabled \
    --allowed-grant-types="authorization-code-grant,refresh-token-grant" \
    --allowed-scopes="https://www.googleapis.com/auth/cloud-platform,openid" \
    --allowed-redirect-uris="http://localhost/"
```

### gcloud alpha iam oauth-clients create

```text
NAME
    gcloud alpha iam oauth-clients create - create an OAuth client

SYNOPSIS
    gcloud alpha iam oauth-clients create (OAUTH_CLIENT : --location=LOCATION)
        --allowed-grant-types=[ALLOWED_GRANT_TYPES,...]
        --allowed-redirect-uris=[ALLOWED_REDIRECT_URIS,...]
        --allowed-scopes=[ALLOWED_SCOPES,...] --client-type=CLIENT_TYPE
        [--description=DESCRIPTION] [--disabled] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam oauth-clients credentials create

```text
NAME
    gcloud alpha iam oauth-clients credentials create - create an OAuth client
        credential

SYNOPSIS
    gcloud alpha iam oauth-clients credentials create
        (CREDENTIAL : --location=LOCATION --oauth-client=OAUTH_CLIENT)
        [--disabled] [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam oauth-clients credentials delete

```text
NAME
    gcloud alpha iam oauth-clients credentials delete - delete an OAuth client
        credential

SYNOPSIS
    gcloud alpha iam oauth-clients credentials delete
        (CREDENTIAL : --location=LOCATION --oauth-client=OAUTH_CLIENT)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam oauth-clients credentials describe

```text
NAME
    gcloud alpha iam oauth-clients credentials describe - describe an OAuth
        client credential

SYNOPSIS
    gcloud alpha iam oauth-clients credentials describe
        (CREDENTIAL : --location=LOCATION --oauth-client=OAUTH_CLIENT)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam oauth-clients credentials list

```text
NAME
    gcloud alpha iam oauth-clients credentials list - list OAuth client
        credentials

SYNOPSIS
    gcloud alpha iam oauth-clients credentials list
        (--oauth-client=OAUTH_CLIENT : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam oauth-clients credentials update

```text
NAME
    gcloud alpha iam oauth-clients credentials update - update an OAuth client
        credential

SYNOPSIS
    gcloud alpha iam oauth-clients credentials update
        (CREDENTIAL : --location=LOCATION --oauth-client=OAUTH_CLIENT)
        [--disabled] [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam oauth-clients delete

```text
NAME
    gcloud alpha iam oauth-clients delete - delete an OAuth client

SYNOPSIS
    gcloud alpha iam oauth-clients delete (OAUTH_CLIENT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam oauth-clients describe

```text
NAME
    gcloud alpha iam oauth-clients describe - describe an OAuth client

SYNOPSIS
    gcloud alpha iam oauth-clients describe
        (OAUTH_CLIENT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam oauth-clients list

```text
NAME
    gcloud alpha iam oauth-clients list - list OAuth clients

SYNOPSIS
    gcloud alpha iam oauth-clients list --location=LOCATION [--show-deleted]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam oauth-clients undelete

```text
NAME
    gcloud alpha iam oauth-clients undelete - undelete an OAuth client

SYNOPSIS
    gcloud alpha iam oauth-clients undelete
        (OAUTH_CLIENT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam oauth-clients update

```text
NAME
    gcloud alpha iam oauth-clients update - update an OAuth client

SYNOPSIS
    gcloud alpha iam oauth-clients update (OAUTH_CLIENT : --location=LOCATION)
        [--allowed-grant-types=[ALLOWED_GRANT_TYPES,...]]
        [--allowed-redirect-uris=[ALLOWED_REDIRECT_URIS,...]]
        [--allowed-scopes=[ALLOWED_SCOPES,...]] [--description=DESCRIPTION]
        [--disabled] [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/oauth-clients (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
