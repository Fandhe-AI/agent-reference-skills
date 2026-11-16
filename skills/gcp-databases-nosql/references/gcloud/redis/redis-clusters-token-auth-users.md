---
source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/token-auth-users
---

# gcloud redis clusters token-auth-users

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud redis clusters token-auth-users auth-tokens delete

```text
NAME
    gcloud redis clusters token-auth-users auth-tokens delete - delete a
        Memorystore for Redis Cluster auth token

SYNOPSIS
    gcloud redis clusters token-auth-users auth-tokens delete
        (AUTH_TOKEN : --cluster=CLUSTER
          --region=REGION --token-auth-user=TOKEN_AUTH_USER) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Memorystore for Redis Cluster auth token.

    This command can fail for the following reasons:
      o The auth token specified does not exist.
      o The active account does not have permission to access the given auth
        token.

EXAMPLES
    To delete an auth token with the name my-auth-token of token auth user
    my-token-auth-user under cluster my-cluster in us-central1 region, run:

        $ gcloud redis clusters token-auth-users auth-tokens delete \
            my-auth-token --token-auth-user=my-token-auth-user \
            --cluster=my-cluster --region=us-central1

POSITIONAL ARGUMENTS
     Auth token resource - Arguments and flags that specify the Redis auth
     token you want to delete. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument auth_token on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTH_TOKEN
          ID of the auth token or fully qualified identifier for the auth
          token.

          To set the auth_token attribute:
          + provide the argument auth_token on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The name of the Redis cluster.

          To set the cluster attribute:
          + provide the argument auth_token on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --region=REGION
          The name of the Redis region of the auth token. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument auth_token on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

       --token-auth-user=TOKEN_AUTH_USER
          The name of the Redis cluster token auth user.

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
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis clusters token-auth-users auth-tokens delete

        $ gcloud beta redis clusters token-auth-users auth-tokens delete
```

### gcloud redis clusters token-auth-users auth-tokens describe

```text
NAME
    gcloud redis clusters token-auth-users auth-tokens describe - show metadata
        for a Memorystore for Redis Cluster auth token

SYNOPSIS
    gcloud redis clusters token-auth-users auth-tokens describe
        (AUTH_TOKEN : --cluster=CLUSTER
          --region=REGION --token-auth-user=TOKEN_AUTH_USER)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show metadata for a Memorystore for Redis Cluster auth token.

    Displays all metadata associated with an auth token given a valid auth
    token name.

    This command can fail for the following reasons:
      o The auth token specified does not exist.
      o The active account does not have permission to access the given auth
        token.

EXAMPLES
    To display metadata for an auth token named my-auth-token for the user
    my-token-auth-user in the my-cluster cluster in us-central1 region, run:

        $ gcloud redis clusters token-auth-users auth-tokens describe \
            my-auth-token --cluster=my-cluster \
            --token-auth-user=my-token-auth-user --region=us-central1

POSITIONAL ARGUMENTS
     Auth token resource - The name of the Redis cluster auth token you want to
     describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument auth_token on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTH_TOKEN
          ID of the auth token or fully qualified identifier for the auth
          token.

          To set the auth_token attribute:
          + provide the argument auth_token on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The name of the Redis cluster.

          To set the cluster attribute:
          + provide the argument auth_token on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --region=REGION
          The name of the Redis region of the auth token. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument auth_token on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

       --token-auth-user=TOKEN_AUTH_USER
          The name of the Redis cluster token auth user.

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
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis clusters token-auth-users auth-tokens describe

        $ gcloud beta redis clusters token-auth-users auth-tokens describe
```

### gcloud redis clusters token-auth-users auth-tokens list

```text
NAME
    gcloud redis clusters token-auth-users auth-tokens list - list auth tokens
        for a token auth user

SYNOPSIS
    gcloud redis clusters token-auth-users auth-tokens list
        (--token-auth-user=TOKEN_AUTH_USER : --cluster=CLUSTER --region=REGION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List auth tokens for a token auth user.

EXAMPLES
    To list up to 2 auth tokens for a token auth user named
    'my-token-auth-user' on a cluster named 'my-cluster' in the us-central1
    region, run:

        $ gcloud redis clusters token-auth-users auth-tokens list \
            --cluster=my-cluster --token-auth-user=my-token-auth-user \
            --region=us-central1 --limit=2

REQUIRED FLAGS
     Token auth user resource - The token auth user to whom the auth tokens
     belong. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --token-auth-user on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --token-auth-user=TOKEN_AUTH_USER
          ID of the token auth user or fully qualified identifier for the token
          auth user.

          To set the token-auth-user attribute:
          + provide the argument --token-auth-user on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --cluster=CLUSTER
          The name of the Redis cluster.

          To set the cluster attribute:
          + provide the argument --token-auth-user on the command line with a
            fully specified name;
          + provide the argument --cluster on the command line.

       --region=REGION
          The name of the Redis region of the token auth user. Overrides the
          default redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument --token-auth-user on the command line with a
            fully specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

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
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis clusters token-auth-users auth-tokens list

        $ gcloud beta redis clusters token-auth-users auth-tokens list
```

### gcloud redis clusters token-auth-users create-auth-token

```text
NAME
    gcloud redis clusters token-auth-users create-auth-token - create an auth
        token for a token auth user of a Redis cluster

SYNOPSIS
    gcloud redis clusters token-auth-users create-auth-token
        (USER : --cluster=CLUSTER --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an auth token for a token auth user of a token auth enabled Redis
    cluster.

EXAMPLES
    To create a new auth token, run:

        $ gcloud redis clusters token-auth-users create-auth-token my-user \
            --cluster=my-cluster --region=us-central1

POSITIONAL ARGUMENTS
     Token auth user resource - Arguments and flags that specify the
     Memorystore Redis token auth user to create an auth token for. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument user on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       USER
          ID of the token auth user or fully qualified identifier for the token
          auth user.

          To set the token-auth-user attribute:
          + provide the argument user on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The name of the Redis cluster.

          To set the cluster attribute:
          + provide the argument user on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --region=REGION
          The name of the Redis region of the token auth user. Overrides the
          default redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument user on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

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
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis clusters token-auth-users create-auth-token

        $ gcloud beta redis clusters token-auth-users create-auth-token
```

### gcloud redis clusters token-auth-users delete

```text
NAME
    gcloud redis clusters token-auth-users delete - delete a Memorystore for
        Redis Cluster token auth user

SYNOPSIS
    gcloud redis clusters token-auth-users delete
        (TOKEN_AUTH_USER : --cluster=CLUSTER --region=REGION) [--async]
        [--no-force] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Memorystore for Redis Cluster token auth user.

    This command can fail for the following reasons:
      o The token auth user specified does not exist.
      o The active account does not have permission to access the given token
        auth user.

EXAMPLES
    To delete a token auth user with the name my-token-auth-user for cluster
    my-cluster in us-central1 region, run:

        $ gcloud redis clusters token-auth-users delete my-token-auth-user \
            --cluster=my-cluster --region=us-central1

POSITIONAL ARGUMENTS
     Token auth user resource - Arguments and flags that specify the Redis
     token auth user you want to delete. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument token_auth_user on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TOKEN_AUTH_USER
          ID of the token auth user or fully qualified identifier for the token
          auth user.

          To set the token_auth_user attribute:
          + provide the argument token_auth_user on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The name of the Redis cluster.

          To set the cluster attribute:
          + provide the argument token_auth_user on the command line with a
            fully specified name;
          + provide the argument --cluster on the command line.

       --region=REGION
          The name of the Redis region of the token auth user. Overrides the
          default redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument token_auth_user on the command line with a
            fully specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --force
        If set to true, the token auth user and its nested resources will be
        deleted. Enabled by default, use --no-force to disable.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis clusters token-auth-users delete

        $ gcloud beta redis clusters token-auth-users delete
```

### gcloud redis clusters token-auth-users describe

```text
NAME
    gcloud redis clusters token-auth-users describe - show metadata for a
        Memorystore for Redis Cluster token auth user

SYNOPSIS
    gcloud redis clusters token-auth-users describe
        (TOKEN_AUTH_USER : --cluster=CLUSTER --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show metadata for a Memorystore for Redis Cluster token auth user.

    Displays all metadata associated with a token auth user given a valid token
    auth user name.

    This command can fail for the following reasons:
      o The token auth user specified does not exist.
      o The active account does not have permission to access the given token
        auth user.

EXAMPLES
    To display the metadata for a token auth user named my-token-auth-user for
    cluster my-cluster in us-central1 region, run:

        $ gcloud redis clusters token-auth-users describe \
            my-token-auth-user --cluster=my-cluster --region=us-central1

POSITIONAL ARGUMENTS
     Token auth user resource - The name of the Redis cluster token auth user
     you want to describe. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument token_auth_user on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TOKEN_AUTH_USER
          ID of the token auth user or fully qualified identifier for the token
          auth user.

          To set the token_auth_user attribute:
          + provide the argument token_auth_user on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The name of the Redis cluster.

          To set the cluster attribute:
          + provide the argument token_auth_user on the command line with a
            fully specified name;
          + provide the argument --cluster on the command line.

       --region=REGION
          The name of the Redis region of the token auth user. Overrides the
          default redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument token_auth_user on the command line with a
            fully specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis clusters token-auth-users describe

        $ gcloud beta redis clusters token-auth-users describe
```

### gcloud redis clusters token-auth-users list

```text
NAME
    gcloud redis clusters token-auth-users list - list token auth users of a
        Redis cluster in a region

SYNOPSIS
    gcloud redis clusters token-auth-users list
        (--cluster=CLUSTER : --region=REGION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List token auth users of a Redis cluster in a region.

EXAMPLES
    To list up to 5 token auth users for a cluster named 'my-cluster' in the
    us-central1 region, run:

        $ gcloud redis clusters token-auth-users list --cluster=my-cluster \
            --region=us-central1 --limit=5

REQUIRED FLAGS
     Cluster resource - The cluster of the token auth users to display. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --cluster=CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument --cluster on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --region=REGION
          The name of the Redis region of the cluster. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument --cluster on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

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
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis clusters token-auth-users list

        $ gcloud beta redis clusters token-auth-users list
```

### gcloud beta redis clusters token-auth-users auth-tokens delete

```text
NAME
    gcloud beta redis clusters token-auth-users auth-tokens delete - delete a
        Memorystore for Redis Cluster auth token

SYNOPSIS
    gcloud beta redis clusters token-auth-users auth-tokens delete
        (AUTH_TOKEN : --cluster=CLUSTER
          --region=REGION --token-auth-user=TOKEN_AUTH_USER) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis clusters token-auth-users auth-tokens describe

```text
NAME
    gcloud beta redis clusters token-auth-users auth-tokens describe - show
        metadata for a Memorystore for Redis Cluster auth token

SYNOPSIS
    gcloud beta redis clusters token-auth-users auth-tokens describe
        (AUTH_TOKEN : --cluster=CLUSTER
          --region=REGION --token-auth-user=TOKEN_AUTH_USER)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis clusters token-auth-users auth-tokens list

```text
NAME
    gcloud beta redis clusters token-auth-users auth-tokens list - list auth
        tokens for a token auth user

SYNOPSIS
    gcloud beta redis clusters token-auth-users auth-tokens list
        (--token-auth-user=TOKEN_AUTH_USER : --cluster=CLUSTER --region=REGION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis clusters token-auth-users create-auth-token

```text
NAME
    gcloud beta redis clusters token-auth-users create-auth-token - create an
        auth token for a token auth user of a Redis cluster

SYNOPSIS
    gcloud beta redis clusters token-auth-users create-auth-token
        (USER : --cluster=CLUSTER --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis clusters token-auth-users delete

```text
NAME
    gcloud beta redis clusters token-auth-users delete - delete a Memorystore
        for Redis Cluster token auth user

SYNOPSIS
    gcloud beta redis clusters token-auth-users delete
        (TOKEN_AUTH_USER : --cluster=CLUSTER --region=REGION) [--async]
        [--no-force] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis clusters token-auth-users describe

```text
NAME
    gcloud beta redis clusters token-auth-users describe - show metadata for a
        Memorystore for Redis Cluster token auth user

SYNOPSIS
    gcloud beta redis clusters token-auth-users describe
        (TOKEN_AUTH_USER : --cluster=CLUSTER --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis clusters token-auth-users list

```text
NAME
    gcloud beta redis clusters token-auth-users list - list token auth users of
        a Redis cluster in a region

SYNOPSIS
    gcloud beta redis clusters token-auth-users list
        (--cluster=CLUSTER : --region=REGION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters token-auth-users auth-tokens delete

```text
NAME
    gcloud alpha redis clusters token-auth-users auth-tokens delete - delete a
        Memorystore for Redis Cluster auth token

SYNOPSIS
    gcloud alpha redis clusters token-auth-users auth-tokens delete
        (AUTH_TOKEN : --cluster=CLUSTER
          --region=REGION --token-auth-user=TOKEN_AUTH_USER) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters token-auth-users auth-tokens describe

```text
NAME
    gcloud alpha redis clusters token-auth-users auth-tokens describe - show
        metadata for a Memorystore for Redis Cluster auth token

SYNOPSIS
    gcloud alpha redis clusters token-auth-users auth-tokens describe
        (AUTH_TOKEN : --cluster=CLUSTER
          --region=REGION --token-auth-user=TOKEN_AUTH_USER)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters token-auth-users auth-tokens list

```text
NAME
    gcloud alpha redis clusters token-auth-users auth-tokens list - list auth
        tokens for a token auth user

SYNOPSIS
    gcloud alpha redis clusters token-auth-users auth-tokens list
        (--token-auth-user=TOKEN_AUTH_USER : --cluster=CLUSTER --region=REGION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters token-auth-users create-auth-token

```text
NAME
    gcloud alpha redis clusters token-auth-users create-auth-token - create an
        auth token for a token auth user of a Redis cluster

SYNOPSIS
    gcloud alpha redis clusters token-auth-users create-auth-token
        (USER : --cluster=CLUSTER --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters token-auth-users delete

```text
NAME
    gcloud alpha redis clusters token-auth-users delete - delete a Memorystore
        for Redis Cluster token auth user

SYNOPSIS
    gcloud alpha redis clusters token-auth-users delete
        (TOKEN_AUTH_USER : --cluster=CLUSTER --region=REGION) [--async]
        [--no-force] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters token-auth-users describe

```text
NAME
    gcloud alpha redis clusters token-auth-users describe - show metadata for a
        Memorystore for Redis Cluster token auth user

SYNOPSIS
    gcloud alpha redis clusters token-auth-users describe
        (TOKEN_AUTH_USER : --cluster=CLUSTER --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters token-auth-users list

```text
NAME
    gcloud alpha redis clusters token-auth-users list - list token auth users
        of a Redis cluster in a region

SYNOPSIS
    gcloud alpha redis clusters token-auth-users list
        (--cluster=CLUSTER : --region=REGION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/token-auth-users (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
