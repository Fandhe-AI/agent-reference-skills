---
source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/instances/token-auth-users
---

# gcloud memorystore instances token-auth-users

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud memorystore instances token-auth-users auth-tokens delete

```text
NAME
    gcloud memorystore instances token-auth-users auth-tokens delete - delete
        authTokens

SYNOPSIS
    gcloud memorystore instances token-auth-users auth-tokens delete
        (AUTH_TOKEN : --instance=INSTANCE
          --location=LOCATION --token-auth-user=TOKEN_AUTH_USER) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an authToken

EXAMPLES
    To delete the authToken, run:

        $ gcloud memorystore instances token-auth-users auth-tokens delete

POSITIONAL ARGUMENTS
     AuthToken resource - The name of the token auth user resource that this
     token will be deleted from. Format:
     projects/{project}/locations/{location}/instances/{instance}/tokenAuthUsers/{token_auth_user}/authTokens/{name}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument auth_token on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTH_TOKEN
          ID of the authToken or fully qualified identifier for the authToken.

          To set the auth_token attribute:
          + provide the argument auth_token on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The instance id of the authToken resource.

          To set the instance attribute:
          + provide the argument auth_token on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

       --location=LOCATION
          The location id of the authToken resource.

          To set the location attribute:
          + provide the argument auth_token on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --token-auth-user=TOKEN_AUTH_USER
          The tokenAuthUser id of the authToken resource.

          To set the token-auth-user attribute:
          + provide the argument auth_token on the command line with a fully
            specified name;
          + provide the argument --token-auth-user on the command line.

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
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore instances token-auth-users auth-tokens \
            delete

        $ gcloud beta memorystore instances token-auth-users auth-tokens \
            delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore instances token-auth-users auth-tokens delete AUTH_TOKEN \
    --token-auth-user=my-user \
    --instance=my-instance \
    --location=us-central1
```

### gcloud memorystore instances token-auth-users auth-tokens describe

```text
NAME
    gcloud memorystore instances token-auth-users auth-tokens describe -
        describe authTokens

SYNOPSIS
    gcloud memorystore instances token-auth-users auth-tokens describe
        (AUTH_TOKEN : --instance=INSTANCE
          --location=LOCATION --token-auth-user=TOKEN_AUTH_USER)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an authToken

EXAMPLES
    To describe the authToken, run:

        $ gcloud memorystore instances token-auth-users auth-tokens describe

POSITIONAL ARGUMENTS
     AuthToken resource - The name of token auth user for a token auth enabled
     instance. Format:
     projects/{project}/locations/{location}/instances/{instance}/tokenAuthUsers/{token_auth_user}/authTokens/{auth_token}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument auth_token on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTH_TOKEN
          ID of the authToken or fully qualified identifier for the authToken.

          To set the auth_token attribute:
          + provide the argument auth_token on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The instance id of the authToken resource.

          To set the instance attribute:
          + provide the argument auth_token on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

       --location=LOCATION
          The location id of the authToken resource.

          To set the location attribute:
          + provide the argument auth_token on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --token-auth-user=TOKEN_AUTH_USER
          The tokenAuthUser id of the authToken resource.

          To set the token-auth-user attribute:
          + provide the argument auth_token on the command line with a fully
            specified name;
          + provide the argument --token-auth-user on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore instances token-auth-users auth-tokens \
            describe

        $ gcloud beta memorystore instances token-auth-users auth-tokens \
            describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore instances token-auth-users auth-tokens describe AUTH_TOKEN \
    --token-auth-user=my-user \
    --instance=my-instance \
    --location=us-central1
```

### gcloud memorystore instances token-auth-users auth-tokens list

```text
NAME
    gcloud memorystore instances token-auth-users auth-tokens list - list
        authTokens

SYNOPSIS
    gcloud memorystore instances token-auth-users auth-tokens list
        (--token-auth-user=TOKEN_AUTH_USER
          : --instance=INSTANCE --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List authTokens

EXAMPLES
    To list all authTokens, run:

        $ gcloud memorystore instances token-auth-users auth-tokens list

REQUIRED FLAGS
     TokenAuthUser resource - The parent to list auth tokens from. Format:
     projects/{project}/locations/{location}/instances/{instance}/tokenAuthUsers/{token_auth_user}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --token-auth-user on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --token-auth-user=TOKEN_AUTH_USER
          ID of the tokenAuthUser or fully qualified identifier for the
          tokenAuthUser.

          To set the token-auth-user attribute:
          + provide the argument --token-auth-user on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --instance=INSTANCE
          The instance id of the tokenAuthUser resource.

          To set the instance attribute:
          + provide the argument --token-auth-user on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

       --location=LOCATION
          The location id of the tokenAuthUser resource.

          To set the location attribute:
          + provide the argument --token-auth-user on the command line with a
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
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore instances token-auth-users auth-tokens \
            list

        $ gcloud beta memorystore instances token-auth-users auth-tokens list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore instances token-auth-users auth-tokens list \
    --token-auth-user=my-user \
    --instance=my-instance \
    --location=us-central1
```

### gcloud memorystore instances token-auth-users create-auth-token

```text
NAME
    gcloud memorystore instances token-auth-users create-auth-token - create an
        auth token for a token auth user

SYNOPSIS
    gcloud memorystore instances token-auth-users create-auth-token
        (TOKEN_AUTH_USER : --instance=INSTANCE --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    create an auth token for a token auth user

EXAMPLES
    To create an auth token for a token auth user, run:

        $ gcloud memorystore instances token-auth-users create-auth-token

POSITIONAL ARGUMENTS
     TokenAuthUser resource - The name of the token auth user resource that
     this token will be created for. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument token_auth_user on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TOKEN_AUTH_USER
          ID of the tokenAuthUser or fully qualified identifier for the
          tokenAuthUser.

          To set the token_auth_user attribute:
          + provide the argument token_auth_user on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The instance id of the tokenAuthUser resource.

          To set the instance attribute:
          + provide the argument token_auth_user on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

       --location=LOCATION
          The location id of the tokenAuthUser resource.

          To set the location attribute:
          + provide the argument token_auth_user on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore instances token-auth-users \
            create-auth-token

        $ gcloud beta memorystore instances token-auth-users \
            create-auth-token
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore instances token-auth-users create-auth-token my-user \
    --instance=my-instance \
    --location=us-central1
```

### gcloud memorystore instances token-auth-users delete

```text
NAME
    gcloud memorystore instances token-auth-users delete - delete
        tokenAuthUsers

SYNOPSIS
    gcloud memorystore instances token-auth-users delete
        (TOKEN_AUTH_USER : --instance=INSTANCE --location=LOCATION) [--async]
        [--force] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a tokenAuthUser

EXAMPLES
    To delete the tokenAuthUser, run:

        $ gcloud memorystore instances token-auth-users delete

POSITIONAL ARGUMENTS
     TokenAuthUser resource - The name of the token auth user to delete.
     Format:
     projects/{project}/locations/{location}/instances/{instance}/tokenAuthUsers/{token_auth_user}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument token_auth_user on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TOKEN_AUTH_USER
          ID of the tokenAuthUser or fully qualified identifier for the
          tokenAuthUser.

          To set the token_auth_user attribute:
          + provide the argument token_auth_user on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The instance id of the tokenAuthUser resource.

          To set the instance attribute:
          + provide the argument token_auth_user on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

       --location=LOCATION
          The location id of the tokenAuthUser resource.

          To set the location attribute:
          + provide the argument token_auth_user on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --force
        If set to true, any auth tokens from this user will also be deleted.

     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server will
        guarantee that for at least 60 minutes after the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore instances token-auth-users delete

        $ gcloud beta memorystore instances token-auth-users delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore instances token-auth-users delete my-user \
    --instance=my-instance \
    --location=us-central1
```

### gcloud memorystore instances token-auth-users describe

```text
NAME
    gcloud memorystore instances token-auth-users describe - describe
        tokenAuthUsers

SYNOPSIS
    gcloud memorystore instances token-auth-users describe
        (TOKEN_AUTH_USER : --instance=INSTANCE --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a tokenAuthUser

EXAMPLES
    To describe the tokenAuthUser, run:

        $ gcloud memorystore instances token-auth-users describe

POSITIONAL ARGUMENTS
     TokenAuthUser resource - The name of token auth user for a basic auth
     enabled instance. Format:
     projects/{project}/locations/{location}/instances/{instance}/tokenAuthUsers/{token_auth_user}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument token_auth_user on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TOKEN_AUTH_USER
          ID of the tokenAuthUser or fully qualified identifier for the
          tokenAuthUser.

          To set the token_auth_user attribute:
          + provide the argument token_auth_user on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The instance id of the tokenAuthUser resource.

          To set the instance attribute:
          + provide the argument token_auth_user on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

       --location=LOCATION
          The location id of the tokenAuthUser resource.

          To set the location attribute:
          + provide the argument token_auth_user on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore instances token-auth-users describe

        $ gcloud beta memorystore instances token-auth-users describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore instances token-auth-users describe my-user \
    --instance=my-instance \
    --location=us-central1
```

### gcloud memorystore instances token-auth-users list

```text
NAME
    gcloud memorystore instances token-auth-users list - list tokenAuthUsers

SYNOPSIS
    gcloud memorystore instances token-auth-users list
        (--instance=INSTANCE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List tokenAuthUsers

EXAMPLES
    To list all tokenAuthUsers, run:

        $ gcloud memorystore instances token-auth-users list

REQUIRED FLAGS
     Instance resource - The parent to list token auth users from. Format:
     projects/{project}/locations/{location}/instances/{instance} The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --instance=INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument --instance on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location id of the instance resource.

          To set the location attribute:
          + provide the argument --instance on the command line with a fully
            specified name;
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

API REFERENCE
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore instances token-auth-users list

        $ gcloud beta memorystore instances token-auth-users list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore instances token-auth-users list \
    --instance=my-instance \
    --location=us-central1
```

### gcloud beta memorystore instances token-auth-users auth-tokens delete

```text
NAME
    gcloud beta memorystore instances token-auth-users auth-tokens delete -
        delete authTokens

SYNOPSIS
    gcloud beta memorystore instances token-auth-users auth-tokens delete
        (AUTH_TOKEN : --instance=INSTANCE
          --location=LOCATION --token-auth-user=TOKEN_AUTH_USER) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore instances token-auth-users auth-tokens describe

```text
NAME
    gcloud beta memorystore instances token-auth-users auth-tokens describe -
        describe authTokens

SYNOPSIS
    gcloud beta memorystore instances token-auth-users auth-tokens describe
        (AUTH_TOKEN : --instance=INSTANCE
          --location=LOCATION --token-auth-user=TOKEN_AUTH_USER)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore instances token-auth-users auth-tokens list

```text
NAME
    gcloud beta memorystore instances token-auth-users auth-tokens list - list
        authTokens

SYNOPSIS
    gcloud beta memorystore instances token-auth-users auth-tokens list
        (--token-auth-user=TOKEN_AUTH_USER
          : --instance=INSTANCE --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore instances token-auth-users create-auth-token

```text
NAME
    gcloud beta memorystore instances token-auth-users create-auth-token -
        create an auth token for a token auth user

SYNOPSIS
    gcloud beta memorystore instances token-auth-users create-auth-token
        (TOKEN_AUTH_USER : --instance=INSTANCE --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore instances token-auth-users delete

```text
NAME
    gcloud beta memorystore instances token-auth-users delete - delete
        tokenAuthUsers

SYNOPSIS
    gcloud beta memorystore instances token-auth-users delete
        (TOKEN_AUTH_USER : --instance=INSTANCE --location=LOCATION) [--async]
        [--no-force] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore instances token-auth-users describe

```text
NAME
    gcloud beta memorystore instances token-auth-users describe - describe
        tokenAuthUsers

SYNOPSIS
    gcloud beta memorystore instances token-auth-users describe
        (TOKEN_AUTH_USER : --instance=INSTANCE --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore instances token-auth-users list

```text
NAME
    gcloud beta memorystore instances token-auth-users list - list
        tokenAuthUsers

SYNOPSIS
    gcloud beta memorystore instances token-auth-users list
        (--instance=INSTANCE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore instances token-auth-users auth-tokens delete

```text
NAME
    gcloud alpha memorystore instances token-auth-users auth-tokens delete -
        delete authTokens

SYNOPSIS
    gcloud alpha memorystore instances token-auth-users auth-tokens delete
        (AUTH_TOKEN : --instance=INSTANCE
          --location=LOCATION --token-auth-user=TOKEN_AUTH_USER) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore instances token-auth-users auth-tokens describe

```text
NAME
    gcloud alpha memorystore instances token-auth-users auth-tokens describe -
        describe authTokens

SYNOPSIS
    gcloud alpha memorystore instances token-auth-users auth-tokens describe
        (AUTH_TOKEN : --instance=INSTANCE
          --location=LOCATION --token-auth-user=TOKEN_AUTH_USER)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore instances token-auth-users auth-tokens list

```text
NAME
    gcloud alpha memorystore instances token-auth-users auth-tokens list - list
        authTokens

SYNOPSIS
    gcloud alpha memorystore instances token-auth-users auth-tokens list
        (--token-auth-user=TOKEN_AUTH_USER
          : --instance=INSTANCE --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore instances token-auth-users create-auth-token

```text
NAME
    gcloud alpha memorystore instances token-auth-users create-auth-token -
        create auth token for a token auth user

SYNOPSIS
    gcloud alpha memorystore instances token-auth-users create-auth-token
        (TOKEN_AUTH_USER : --instance=INSTANCE --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore instances token-auth-users delete

```text
NAME
    gcloud alpha memorystore instances token-auth-users delete - delete
        tokenAuthUsers

SYNOPSIS
    gcloud alpha memorystore instances token-auth-users delete
        (TOKEN_AUTH_USER : --instance=INSTANCE --location=LOCATION) [--async]
        [--no-force] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore instances token-auth-users describe

```text
NAME
    gcloud alpha memorystore instances token-auth-users describe - describe
        tokenAuthUsers

SYNOPSIS
    gcloud alpha memorystore instances token-auth-users describe
        (TOKEN_AUTH_USER : --instance=INSTANCE --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore instances token-auth-users list

```text
NAME
    gcloud alpha memorystore instances token-auth-users list - list
        tokenAuthUsers

SYNOPSIS
    gcloud alpha memorystore instances token-auth-users list
        (--instance=INSTANCE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples give only the command, without the token auth user, auth token, `--instance` and `--location` that the SYNOPSIS requires (gcloud 593.0.0: "Must be specified"); the runnable form adds sample values.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/instances/token-auth-users (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
