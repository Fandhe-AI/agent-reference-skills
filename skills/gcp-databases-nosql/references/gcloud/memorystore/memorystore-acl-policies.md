---
source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/acl-policies
---

# gcloud memorystore acl-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud memorystore acl-policies create

```text
NAME
    gcloud memorystore acl-policies create - create aclPolicies

SYNOPSIS
    gcloud memorystore acl-policies create (ACL_POLICY : --location=LOCATION)
        --rules=[rule=RULE],[username=USERNAME] [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an aclPolicy

EXAMPLES
    To create the aclPolicy, run:

        $ gcloud memorystore acl-policies create

POSITIONAL ARGUMENTS
     AclPolicy resource - Identifier. Full resource path of the ACL policy. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument acl_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACL_POLICY
          ID of the aclPolicy or fully qualified identifier for the aclPolicy.

          To set the acl_policy attribute:
          + provide the argument acl_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the aclPolicy resource.

          To set the location attribute:
          + provide the argument acl_policy on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --rules=[rule=RULE],[username=USERNAME]
        Required, The ACL rules within the ACL policy.

         rule
            The rule to be applied to the username. Ex: "on >password123 ~
            +@all" The format of the rule is defined by Valkey OSS:
            https://valkey.io/topics/acl/.

         username
            Specifies the IAM user or service account to be added to the ACL
            policy. This username will be directly set on the Valkey OSS.

        Shorthand Example:

            --rules=rule=string,username=string --rules=rule=string,username=string

        JSON Example:

            --rules='[{"rule": "string", "username": "string"}]'

        File Example:

            --rules=path_to_file.(yaml|json)

OPTIONAL FLAGS
     --request-id=REQUEST_ID
        Idempotent request UUID. .

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

        $ gcloud alpha memorystore acl-policies create

        $ gcloud beta memorystore acl-policies create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore acl-policies create my-acl-policy \
    --location=us-central1 \
    --rules=rule=RULE,username=USERNAME
```

### gcloud memorystore acl-policies delete

```text
NAME
    gcloud memorystore acl-policies delete - delete aclPolicies

SYNOPSIS
    gcloud memorystore acl-policies delete (ACL_POLICY : --location=LOCATION)
        [--async] [--etag=ETAG] [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an aclPolicy

EXAMPLES
    To delete the aclPolicy, run:

        $ gcloud memorystore acl-policies delete

POSITIONAL ARGUMENTS
     AclPolicy resource - Memorystore ACL policy resource name using the form:
     projects/{project}/locations/{location}/aclPolicies/{acl_policy_id} where
     location refers to a Google Cloud region. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument acl_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACL_POLICY
          ID of the aclPolicy or fully qualified identifier for the aclPolicy.

          To set the acl_policy attribute:
          + provide the argument acl_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the aclPolicy resource.

          To set the location attribute:
          + provide the argument acl_policy on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        Etag of the ACL policy. If this is different from the server's etag,
        the request will fail with an ABORTED error.

     --request-id=REQUEST_ID
        Idempotent request UUID.

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

        $ gcloud alpha memorystore acl-policies delete

        $ gcloud beta memorystore acl-policies delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore acl-policies delete my-acl-policy \
    --location=us-central1
```

### gcloud memorystore acl-policies describe

```text
NAME
    gcloud memorystore acl-policies describe - describe aclPolicies

SYNOPSIS
    gcloud memorystore acl-policies describe (ACL_POLICY : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an aclPolicy

EXAMPLES
    To describe the aclPolicy, run:

        $ gcloud memorystore acl-policies describe

POSITIONAL ARGUMENTS
     AclPolicy resource - Memorystore ACL policy resource name using the form:
     projects/{project}/locations/{location}/aclPolicies/{acl_policy} where
     location refers to a Google Cloud region. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument acl_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACL_POLICY
          ID of the aclPolicy or fully qualified identifier for the aclPolicy.

          To set the acl_policy attribute:
          + provide the argument acl_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the aclPolicy resource.

          To set the location attribute:
          + provide the argument acl_policy on the command line with a fully
            specified name;
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

        $ gcloud alpha memorystore acl-policies describe

        $ gcloud beta memorystore acl-policies describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore acl-policies describe my-acl-policy \
    --location=us-central1
```

### gcloud memorystore acl-policies list

```text
NAME
    gcloud memorystore acl-policies list - list aclPolicies

SYNOPSIS
    gcloud memorystore acl-policies list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List aclPolicies

EXAMPLES
    To list all aclPolicies, run:

        $ gcloud memorystore acl-policies list

REQUIRED FLAGS
     Location resource - The resource name of the ACL policy location using the
     form: projects/{project}/locations/{location} where location refers to a
     Google Cloud region. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

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

        $ gcloud alpha memorystore acl-policies list

        $ gcloud beta memorystore acl-policies list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore acl-policies list \
    --location=us-central1
```

### gcloud memorystore acl-policies revisions describe

```text
NAME
    gcloud memorystore acl-policies revisions describe - describe
        aclPolicyRevisions

SYNOPSIS
    gcloud memorystore acl-policies revisions describe
        (REVISION : --acl-policy=ACL_POLICY --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an aclPolicyRevision

EXAMPLES
    To describe the aclPolicyRevision, run:

        $ gcloud memorystore acl-policies revisions describe

POSITIONAL ARGUMENTS
     Revision resource - Memorystore ACL policy revision resource name using
     the form:
     projects/{project}/locations/{location}/aclPolicies/{acl_policy}/revisions/{revision}
     where location refers to a Google Cloud region. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

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
          The aclPolicy id of the revision resource.

          To set the acl-policy attribute:
          + provide the argument revision on the command line with a fully
            specified name;
          + provide the argument --acl-policy on the command line.

       --location=LOCATION
          The location id of the revision resource.

          To set the location attribute:
          + provide the argument revision on the command line with a fully
            specified name;
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

        $ gcloud alpha memorystore acl-policies revisions describe

        $ gcloud beta memorystore acl-policies revisions describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore acl-policies revisions describe REVISION \
    --acl-policy=my-acl-policy \
    --location=us-central1
```

### gcloud memorystore acl-policies revisions list

```text
NAME
    gcloud memorystore acl-policies revisions list - list aclPolicyRevisions

SYNOPSIS
    gcloud memorystore acl-policies revisions list
        (--acl-policy=ACL_POLICY : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List aclPolicyRevisions

EXAMPLES
    To list all aclPolicyRevisions, run:

        $ gcloud memorystore acl-policies revisions list

REQUIRED FLAGS
     AclPolicy resource - The resource name of the ACL policy to list revisions
     for. Format:
     "projects/{project}/locations/{location}/aclPolicies/{acl_policy}" The
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
          ID of the aclPolicy or fully qualified identifier for the aclPolicy.

          To set the acl-policy attribute:
          + provide the argument --acl-policy on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location id of the aclPolicy resource.

          To set the location attribute:
          + provide the argument --acl-policy on the command line with a
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

        $ gcloud alpha memorystore acl-policies revisions list

        $ gcloud beta memorystore acl-policies revisions list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore acl-policies revisions list \
    --acl-policy=my-acl-policy \
    --location=us-central1
```

### gcloud memorystore acl-policies update

```text
NAME
    gcloud memorystore acl-policies update - update aclPolicies

SYNOPSIS
    gcloud memorystore acl-policies update (ACL_POLICY : --location=LOCATION)
        [--async] [--request-id=REQUEST_ID]
        [--rules=[rule=RULE],[username=USERNAME]
          | --add-rules=[rule=RULE],[username=USERNAME] --clear-rules
          | --remove-rules=[rule=RULE],[username=USERNAME]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an aclPolicy

EXAMPLES
    To update the aclPolicy, run:

        $ gcloud memorystore acl-policies update

POSITIONAL ARGUMENTS
     AclPolicy resource - Identifier. Full resource path of the ACL policy. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument acl_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACL_POLICY
          ID of the aclPolicy or fully qualified identifier for the aclPolicy.

          To set the acl_policy attribute:
          + provide the argument acl_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the aclPolicy resource.

          To set the location attribute:
          + provide the argument acl_policy on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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
              +@all" The format of the rule is defined by Valkey OSS:
              https://valkey.io/topics/acl/.

           username
              Specifies the IAM user or service account to be added to the ACL
              policy. This username will be directly set on the Valkey OSS.

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
                +@all" The format of the rule is defined by Valkey OSS:
                https://valkey.io/topics/acl/.

             username
                Specifies the IAM user or service account to be added to the
                ACL policy. This username will be directly set on the Valkey
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
                  ~ +@all" The format of the rule is defined by Valkey OSS:
                  https://valkey.io/topics/acl/.

               username
                  Specifies the IAM user or service account to be added to the
                  ACL policy. This username will be directly set on the Valkey
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
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore acl-policies update

        $ gcloud beta memorystore acl-policies update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore acl-policies update my-acl-policy \
    --location=us-central1 \
    --add-rules=rule=RULE,username=USERNAME
```

### gcloud beta memorystore acl-policies create

```text
NAME
    gcloud beta memorystore acl-policies create - create aclPolicies

SYNOPSIS
    gcloud beta memorystore acl-policies create
        (ACL_POLICY : --location=LOCATION)
        --rules=[rule=RULE],[username=USERNAME] [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore acl-policies delete

```text
NAME
    gcloud beta memorystore acl-policies delete - delete aclPolicies

SYNOPSIS
    gcloud beta memorystore acl-policies delete
        (ACL_POLICY : --location=LOCATION) [--async] [--etag=ETAG]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore acl-policies describe

```text
NAME
    gcloud beta memorystore acl-policies describe - describe aclPolicies

SYNOPSIS
    gcloud beta memorystore acl-policies describe
        (ACL_POLICY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore acl-policies list

```text
NAME
    gcloud beta memorystore acl-policies list - list aclPolicies

SYNOPSIS
    gcloud beta memorystore acl-policies list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore acl-policies revisions describe

```text
NAME
    gcloud beta memorystore acl-policies revisions describe - describe
        aclPolicyRevisions

SYNOPSIS
    gcloud beta memorystore acl-policies revisions describe
        (REVISION : --acl-policy=ACL_POLICY --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore acl-policies revisions list

```text
NAME
    gcloud beta memorystore acl-policies revisions list - list
        aclPolicyRevisions

SYNOPSIS
    gcloud beta memorystore acl-policies revisions list
        (--acl-policy=ACL_POLICY : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore acl-policies update

```text
NAME
    gcloud beta memorystore acl-policies update - update aclPolicies

SYNOPSIS
    gcloud beta memorystore acl-policies update
        (ACL_POLICY : --location=LOCATION) [--async] [--request-id=REQUEST_ID]
        [--rules=[rule=RULE],[username=USERNAME]
          | --add-rules=[rule=RULE],[username=USERNAME] --clear-rules
          | --remove-rules=[rule=RULE],[username=USERNAME]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore acl-policies create

```text
NAME
    gcloud alpha memorystore acl-policies create - create aclPolicies

SYNOPSIS
    gcloud alpha memorystore acl-policies create
        (ACL_POLICY : --location=LOCATION)
        --rules=[rule=RULE],[username=USERNAME] [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore acl-policies delete

```text
NAME
    gcloud alpha memorystore acl-policies delete - delete aclPolicies

SYNOPSIS
    gcloud alpha memorystore acl-policies delete
        (ACL_POLICY : --location=LOCATION) [--async] [--etag=ETAG]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore acl-policies describe

```text
NAME
    gcloud alpha memorystore acl-policies describe - describe aclPolicies

SYNOPSIS
    gcloud alpha memorystore acl-policies describe
        (ACL_POLICY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore acl-policies list

```text
NAME
    gcloud alpha memorystore acl-policies list - list aclPolicies

SYNOPSIS
    gcloud alpha memorystore acl-policies list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore acl-policies revisions describe

```text
NAME
    gcloud alpha memorystore acl-policies revisions describe - describe
        aclPolicyRevisions

SYNOPSIS
    gcloud alpha memorystore acl-policies revisions describe
        (REVISION : --acl-policy=ACL_POLICY --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore acl-policies revisions list

```text
NAME
    gcloud alpha memorystore acl-policies revisions list - list
        aclPolicyRevisions

SYNOPSIS
    gcloud alpha memorystore acl-policies revisions list
        (--acl-policy=ACL_POLICY : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore acl-policies update

```text
NAME
    gcloud alpha memorystore acl-policies update - update aclPolicies

SYNOPSIS
    gcloud alpha memorystore acl-policies update
        (ACL_POLICY : --location=LOCATION) [--async] [--request-id=REQUEST_ID]
        [--rules=[rule=RULE],[username=USERNAME]
          | --add-rules=[rule=RULE],[username=USERNAME] --clear-rules
          | --remove-rules=[rule=RULE],[username=USERNAME]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples give only the command, without the ACL policy and `--location` (and `--rules` for `create`) that the SYNOPSIS requires (gcloud 593.0.0: "Must be specified"); the runnable form adds sample values; `update` adds a rule with `--add-rules`, since an update without a change flag has nothing to apply. Replace `RULE` with a Valkey ACL rule (https://valkey.io/topics/acl/) and quote it when it contains spaces, and `USERNAME` with the IAM user or service account.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples give only the command, without the revision, `--acl-policy` and `--location` that the SYNOPSIS requires (gcloud 593.0.0: "Must be specified"); the runnable form adds sample values.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/acl-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
