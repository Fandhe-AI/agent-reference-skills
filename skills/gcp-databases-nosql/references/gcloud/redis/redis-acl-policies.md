---
source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/acl-policies
---

# gcloud redis acl-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud redis acl-policies create

```text
NAME
    gcloud redis acl-policies create - create a Redis ACL Policy

SYNOPSIS
    gcloud redis acl-policies create (ACL_POLICY : --region=REGION)
        --rules=[rule=RULE],[username=USERNAME] [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Redis ACL Policy with the specified rules.

EXAMPLES
    To create an ACL Policy named my-acl-policy in region us-east1 with two
    rules, run:

        $ gcloud redis acl-policies create my-acl-policy --region=us-east1 \
            --rules="username=user1,rule='on ~keys:* +get'" \
            --rules="username=user2,rule='off ~* -@all'"

POSITIONAL ARGUMENTS
     Acl policy resource - The ACL Policy to create. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument acl_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACL_POLICY
          ID of the acl policy or fully qualified identifier for the acl
          policy.

          To set the acl_policy attribute:
          + provide the argument acl_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Redis region of the acl policy. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument acl_policy on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

REQUIRED FLAGS
     --rules=[rule=RULE],[username=USERNAME]
        Required, The ACL rules within the ACL policy. Specify this flag
        multiple times for multiple rules. Each rule consists of 'username' and
        'rule'.

         rule
            The Redis ACL rule string.

         username
            The username for the ACL rule.

        Shorthand Example:

            --rules=rule=string,username=string --rules=rule=string,username=string

        JSON Example:

            --rules='[{"rule": "string", "username": "string"}]'

        File Example:

            --rules=path_to_file.(yaml|json)

OPTIONAL FLAGS
     --request-id=REQUEST_ID
        Idempotent request UUID.

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

        $ gcloud alpha redis acl-policies create

        $ gcloud beta redis acl-policies create
```

### gcloud redis acl-policies delete

```text
NAME
    gcloud redis acl-policies delete - delete a Redis ACL Policy

SYNOPSIS
    gcloud redis acl-policies delete (ACL_POLICY : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Redis ACL Policy. This command can fail for the following reasons:
      o The ACL Policy specified does not exist.
      o The active account does not have permission to access the given ACL
        Policy.

EXAMPLES
    To delete a ACL Policy with the name my-acl-policy in us-central1 region,
    run:        $ gcloud redis acl-policies delete my-acl-policy --region=us-central1

POSITIONAL ARGUMENTS
     Acl policy resource - Arguments and flags that specify the Redis ACL
     Policy you want to delete. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument acl_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACL_POLICY
          ID of the acl policy or fully qualified identifier for the acl
          policy.

          To set the acl_policy attribute:
          + provide the argument acl_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Redis region of the acl policy. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument acl_policy on the command line with a fully
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

        $ gcloud alpha redis acl-policies delete

        $ gcloud beta redis acl-policies delete
```

### gcloud redis acl-policies describe

```text
NAME
    gcloud redis acl-policies describe - show metadata for a Memorystore for
        Redis Cluster ACL policy

SYNOPSIS
    gcloud redis acl-policies describe (ACL_POLICY : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show metadata for a Memorystore for Redis Cluster ACL policy.

    Displays all metadata associated with an ACL policy given a valid ACL
    policy name.

    This command can fail for the following reasons:
      o The ACL policy specified does not exist.
      o The active account does not have permission to access the given ACL
        policy.

EXAMPLES
    To display the metadata for a ACL policy named my-acl-policy,in us-central1
    region, run:

        $ gcloud redis acl-policies describe my-acl-policy \
            --region=us-central1

POSITIONAL ARGUMENTS
     Acl policy resource - Arguments and flags that specify the ACL policy you
     want to describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument acl_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACL_POLICY
          ID of the acl policy or fully qualified identifier for the acl
          policy.

          To set the acl_policy attribute:
          + provide the argument acl_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Redis region of the acl policy. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument acl_policy on the command line with a fully
            specified name;
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

        $ gcloud alpha redis acl-policies describe

        $ gcloud beta redis acl-policies describe
```

### gcloud redis acl-policies list

```text
NAME
    gcloud redis acl-policies list - list Redis ACL Policies

SYNOPSIS
    gcloud redis acl-policies list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Redis ACL Policies for a given project and region.

EXAMPLES
    To list all ACL Policies in region us-central1, run:

        $ gcloud alpha redis acl-policies list --region=us-central1

FLAGS
     Region resource - The region of the acl policies to display. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * set the property redis/region with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --region=REGION
        ID of the region or fully qualified identifier for the region.

        To set the region attribute:
        * provide the argument --region on the command line;
        * set the property redis/region.

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

        $ gcloud alpha redis acl-policies list

        $ gcloud beta redis acl-policies list
```

### gcloud redis acl-policies revisions describe

```text
NAME
    gcloud redis acl-policies revisions describe - show metadata for a
        Memorystore for Redis Cluster ACL policy revision

SYNOPSIS
    gcloud redis acl-policies revisions describe
        (REVISION : --acl-policy=ACL_POLICY --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show metadata for a Memorystore for Redis Cluster ACL policy revision.

    Displays all metadata associated with an ACL policy revision given a valid
    ACL policy revision name.

    This command can fail for the following reasons:
      o The ACL policy revision specified does not exist.
      o The active account does not have permission to access the given ACL
        policy revision.

EXAMPLES
    To display the metadata for an ACL policy revision named
    my-acl-policy-revision for ACL policy my-acl-policy, in us-central1 region,
    run:

        $ gcloud redis acl-policies revisions describe \
            my-acl-policy-revision --acl-policy=my-acl-policy \
            --region=us-central1

POSITIONAL ARGUMENTS
     Revision resource - Arguments and flags that specify the ACL policy
     revision you want to describe. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument revision on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REVISION
          ID of the revision or fully qualified identifier for the revision.

          To set the revision attribute:
          + provide the argument revision on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --acl-policy=ACL_POLICY
          The ID of the ACL Policy.

          To set the acl-policy attribute:
          + provide the argument revision on the command line with a fully
            specified name;
          + provide the argument --acl-policy on the command line.

       --region=REGION
          The name of the Redis region of the revision. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument revision on the command line with a fully
            specified name;
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

        $ gcloud alpha redis acl-policies revisions describe

        $ gcloud beta redis acl-policies revisions describe
```

### gcloud redis acl-policies revisions list

```text
NAME
    gcloud redis acl-policies revisions list - list Redis ACL Policy Revisions

SYNOPSIS
    gcloud redis acl-policies revisions list
        (--acl-policy=ACL_POLICY : --region=REGION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Redis ACL Policy Revisions for a given ACL policy.

EXAMPLES
    To list all ACL Policy Revisions for ACL policy my-acl-policy in region
    us-central1, run:

        $ gcloud redis acl-policies revisions list \
            --acl-policy=my-acl-policy --region=us-central1

REQUIRED FLAGS
     Acl policy resource - The ACL policy of the revisions to display. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --acl-policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --acl-policy=ACL_POLICY
          ID of the acl policy or fully qualified identifier for the acl
          policy.

          To set the acl-policy attribute:
          + provide the argument --acl-policy on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --region=REGION
          The name of the Redis region of the acl policy. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument --acl-policy on the command line with a
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

        $ gcloud alpha redis acl-policies revisions list

        $ gcloud beta redis acl-policies revisions list
```

### gcloud redis acl-policies update

```text
NAME
    gcloud redis acl-policies update - update aclPolicies

SYNOPSIS
    gcloud redis acl-policies update (ACL_POLICY : --region=REGION) [--async]
        [--request-id=REQUEST_ID]
        [--rules=[rule=RULE],[username=USERNAME]
          | --add-rules=[rule=RULE],[username=USERNAME] --clear-rules
          | --remove-rules=[rule=RULE],[username=USERNAME]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an aclPolicy

EXAMPLES
    To update the aclPolicy, run:

        $ gcloud redis acl-policies update

POSITIONAL ARGUMENTS
     Acl policy resource - Identifier. Full resource path of the ACL policy.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument acl_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACL_POLICY
          ID of the acl policy or fully qualified identifier for the acl
          policy.

          To set the acl_policy attribute:
          + provide the argument acl_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Redis region of the acl policy. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument acl_policy on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --request-id=REQUEST_ID
        Idempotent request UUID.

     Update rules.

     At most one of these can be specified:

       --rules=[rule=RULE],[username=USERNAME]
          Set rules to new value. The ACL rules within the ACL policy.

           rule
              The rule to be applied to the username. Ex: "on >password123 ~
              +@all" The format of the rule is defined by Redis OSS:
              https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/.

           username
              Specifies the IAM user or service account to be added to the ACL
              policy. This username will be directly set on the Redis OSS.

          Shorthand Example:

              --rules=rule=string,username=string --rules=rule=string,username=string

          JSON Example:

              --rules='[{"rule": "string", "username": "string"}]'

          File Example:

              --rules=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --add-rules=[rule=RULE],[username=USERNAME]
            Add new value to rules list. The ACL rules within the ACL policy.

             rule
                The rule to be applied to the username. Ex: "on >password123 ~
                +@all" The format of the rule is defined by Redis OSS:
                https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/.

             username
                Specifies the IAM user or service account to be added to the
                ACL policy. This username will be directly set on the Redis
                OSS.

            Shorthand Example:

                --add-rules=rule=string,username=string --add-rules=rule=string,username=string

            JSON Example:

                --add-rules='[{"rule": "string", "username": "string"}]'

            File Example:

                --add-rules=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-rules
              Clear rules value and set to empty list.

           --remove-rules=[rule=RULE],[username=USERNAME]
              Remove existing value from rules list. The ACL rules within the
              ACL policy.

               rule
                  The rule to be applied to the username. Ex: "on >password123
                  ~ +@all" The format of the rule is defined by Redis OSS:
                  https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/.

               username
                  Specifies the IAM user or service account to be added to the
                  ACL policy. This username will be directly set on the Redis
                  OSS.

              Shorthand Example:

                  --remove-rules=rule=string,username=string --remove-rules=rule=string,username=string

              JSON Example:

                  --remove-rules='[{"rule": "string", "username": "string"}]'

              File Example:

                  --remove-rules=path_to_file.(yaml|json)

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

        $ gcloud alpha redis acl-policies update

        $ gcloud beta redis acl-policies update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud redis acl-policies update my-acl-policy \
    --region=us-central1 \
    --add-rules=rule=RULE,username=USERNAME
```

### gcloud beta redis acl-policies create

```text
NAME
    gcloud beta redis acl-policies create - create a Redis ACL Policy

SYNOPSIS
    gcloud beta redis acl-policies create (ACL_POLICY : --region=REGION)
        --rules=[rule=RULE],[username=USERNAME] [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis acl-policies delete

```text
NAME
    gcloud beta redis acl-policies delete - delete a Redis ACL Policy

SYNOPSIS
    gcloud beta redis acl-policies delete (ACL_POLICY : --region=REGION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis acl-policies describe

```text
NAME
    gcloud beta redis acl-policies describe - show metadata for a Memorystore
        for Redis Cluster ACL policy

SYNOPSIS
    gcloud beta redis acl-policies describe (ACL_POLICY : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis acl-policies list

```text
NAME
    gcloud beta redis acl-policies list - list Redis ACL Policies

SYNOPSIS
    gcloud beta redis acl-policies list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis acl-policies revisions describe

```text
NAME
    gcloud beta redis acl-policies revisions describe - show metadata for a
        Memorystore for Redis Cluster ACL policy revision

SYNOPSIS
    gcloud beta redis acl-policies revisions describe
        (REVISION : --acl-policy=ACL_POLICY --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis acl-policies revisions list

```text
NAME
    gcloud beta redis acl-policies revisions list - list Redis ACL Policy
        Revisions

SYNOPSIS
    gcloud beta redis acl-policies revisions list
        (--acl-policy=ACL_POLICY : --region=REGION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis acl-policies update

```text
NAME
    gcloud beta redis acl-policies update - update aclPolicies

SYNOPSIS
    gcloud beta redis acl-policies update (ACL_POLICY : --region=REGION)
        [--async] [--request-id=REQUEST_ID]
        [--rules=[rule=RULE],[username=USERNAME]
          | --add-rules=[rule=RULE],[username=USERNAME] --clear-rules
          | --remove-rules=[rule=RULE],[username=USERNAME]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis acl-policies create

```text
NAME
    gcloud alpha redis acl-policies create - create a Redis ACL Policy

SYNOPSIS
    gcloud alpha redis acl-policies create (ACL_POLICY : --region=REGION)
        --rules=[rule=RULE],[username=USERNAME] [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis acl-policies delete

```text
NAME
    gcloud alpha redis acl-policies delete - delete a Redis ACL Policy

SYNOPSIS
    gcloud alpha redis acl-policies delete (ACL_POLICY : --region=REGION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis acl-policies describe

```text
NAME
    gcloud alpha redis acl-policies describe - show metadata for a Memorystore
        for Redis Cluster ACL policy

SYNOPSIS
    gcloud alpha redis acl-policies describe (ACL_POLICY : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis acl-policies list

```text
NAME
    gcloud alpha redis acl-policies list - list Redis ACL Policies

SYNOPSIS
    gcloud alpha redis acl-policies list [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis acl-policies revisions describe

```text
NAME
    gcloud alpha redis acl-policies revisions describe - show metadata for a
        Memorystore for Redis Cluster ACL policy revision

SYNOPSIS
    gcloud alpha redis acl-policies revisions describe
        (REVISION : --acl-policy=ACL_POLICY --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis acl-policies revisions list

```text
NAME
    gcloud alpha redis acl-policies revisions list - list Redis ACL Policy
        Revisions

SYNOPSIS
    gcloud alpha redis acl-policies revisions list
        (--acl-policy=ACL_POLICY : --region=REGION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis acl-policies update

```text
NAME
    gcloud alpha redis acl-policies update - update aclPolicies

SYNOPSIS
    gcloud alpha redis acl-policies update (ACL_POLICY : --region=REGION)
        [--async] [--request-id=REQUEST_ID]
        [--rules=[rule=RULE],[username=USERNAME]
          | --add-rules=[rule=RULE],[username=USERNAME] --clear-rules
          | --remove-rules=[rule=RULE],[username=USERNAME]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples give only the command, without the ACL policy and `--region` that the SYNOPSIS requires (gcloud 593.0.0: "Must be specified"); the runnable form adds sample values and adds a rule with `--add-rules`, since an update without a change flag has nothing to apply. Replace `RULE` with a Redis ACL rule and quote it when it contains spaces, and `USERNAME` with the IAM user or service account.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/acl-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
