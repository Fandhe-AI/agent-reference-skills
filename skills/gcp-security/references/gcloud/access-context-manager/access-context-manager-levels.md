---
source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/levels
---

# gcloud access-context-manager levels

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud access-context-manager levels conditions list

```text
NAME
    gcloud access-context-manager levels conditions list - list conditions for
        an access level

SYNOPSIS
    gcloud access-context-manager levels conditions list
        (--level=LEVEL : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List conditions for a basic access level.

REQUIRED FLAGS
     Level resource - The access level you want to list the conditions for. The
     arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       --level=LEVEL
          ID of the level or fully qualified identifier for the level.

          To set the level attribute:
          + provide the argument --level on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --policy=POLICY
          The ID of the access policy.

          To set the policy attribute:
          + provide the argument --level on the command line with a fully
            specified name;
          + provide the argument --policy on the command line;
          + set the property access_context_manager/policy;
          + automatically, if the current account belongs to an organization
            with exactly one access policy..

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
    These variants are also available:

        $ gcloud alpha access-context-manager levels conditions list

        $ gcloud beta access-context-manager levels conditions list
```

### gcloud access-context-manager levels create

```text
NAME
    gcloud access-context-manager levels create - create a new access level

SYNOPSIS
    gcloud access-context-manager levels create (LEVEL : --policy=POLICY)
        --title=TITLE
        (--custom-level-spec=CUSTOM_LEVEL_SPEC
          | [--basic-level-spec=BASIC_LEVEL_SPEC
          : --combine-function=COMBINE_FUNCTION; default="and"]) [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new access level in a given access policy.

POSITIONAL ARGUMENTS
     Level resource - The access level to create. The arguments in this group
     can be used to specify the attributes of this resource.

     This must be specified.

       LEVEL
          ID of the level or fully qualified identifier for the level.

          To set the level attribute:
          + provide the argument level on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --policy=POLICY
          The ID of the access policy.

          To set the policy attribute:
          + provide the argument level on the command line with a fully
            specified name;
          + provide the argument --policy on the command line;
          + set the property access_context_manager/policy;
          + automatically, if the current account belongs to an organization
            with exactly one access policy..

REQUIRED FLAGS
     --title=TITLE
        Short human-readable title of the access level.

     Level specification.

     Exactly one of these must be specified:

       Custom level specification.

       --custom-level-spec=CUSTOM_LEVEL_SPEC
          Path to a file representing an expression that represents an access
          level.

          The expression is in the Common Expression Language (CEL) format. For
          example:

                expression: "origin.region_code in ['US', 'CA']"

       Basic level specification.

       --basic-level-spec=BASIC_LEVEL_SPEC
          Path to a file containing a list of basic access level conditions.

          An access level condition file is a YAML-formatted list of
          conditions, which are YAML objects representing a Condition as
          described in the API reference. For example:

               - ipSubnetworks:
                 - 162.222.181.197/24
                 - 2001:db8::/48
               - members:
                 - user:user@example.com

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --combine-function=COMBINE_FUNCTION; default="and"
          For a basic level, determines how conditions are combined.
          COMBINE_FUNCTION must be one of: and, or.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Long-form description of access level.

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
    These variants are also available:

        $ gcloud alpha access-context-manager levels create

        $ gcloud beta access-context-manager levels create
```

### gcloud access-context-manager levels delete

```text
NAME
    gcloud access-context-manager levels delete - delete an access level

SYNOPSIS
    gcloud access-context-manager levels delete (LEVEL : --policy=POLICY)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an access level in a given access policy.

POSITIONAL ARGUMENTS
     Level resource - The access level you want to delete. The arguments in
     this group can be used to specify the attributes of this resource.

     This must be specified.

       LEVEL
          ID of the level or fully qualified identifier for the level.

          To set the level attribute:
          + provide the argument level on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --policy=POLICY
          The ID of the access policy.

          To set the policy attribute:
          + provide the argument level on the command line with a fully
            specified name;
          + provide the argument --policy on the command line;
          + set the property access_context_manager/policy;
          + automatically, if the current account belongs to an organization
            with exactly one access policy..

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
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager levels delete

        $ gcloud beta access-context-manager levels delete
```

### gcloud access-context-manager levels describe

```text
NAME
    gcloud access-context-manager levels describe - show details about an
        access level

SYNOPSIS
    gcloud access-context-manager levels describe (LEVEL : --policy=POLICY)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about an access level in a given access policy.

EXAMPLES
    To show the details of the access policy my-policy, run:

        $ gcloud access-context-manager levels describe my-policy

POSITIONAL ARGUMENTS
     Level resource - The access level you want to show details about. The
     arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       LEVEL
          ID of the level or fully qualified identifier for the level.

          To set the level attribute:
          + provide the argument level on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --policy=POLICY
          The ID of the access policy.

          To set the policy attribute:
          + provide the argument level on the command line with a fully
            specified name;
          + provide the argument --policy on the command line;
          + set the property access_context_manager/policy;
          + automatically, if the current account belongs to an organization
            with exactly one access policy..

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
    These variants are also available:

        $ gcloud alpha access-context-manager levels describe

        $ gcloud beta access-context-manager levels describe
```

### gcloud access-context-manager levels list

```text
NAME
    gcloud access-context-manager levels list - list access levels

SYNOPSIS
    gcloud access-context-manager levels list [--policy=POLICY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List access levels.

FLAGS
     Policy resource - The access policy you want to list the access levels
     for. This represents a Cloud resource.

     --policy=POLICY
        ID of the policy or fully qualified identifier for the policy.

        To set the policy attribute:
        * provide the argument --policy on the command line;
        * set the property access_context_manager/policy;
        * automatically, if the current account belongs to an organization
          with exactly one access policy..

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
    These variants are also available:

        $ gcloud alpha access-context-manager levels list

        $ gcloud beta access-context-manager levels list
```

### gcloud access-context-manager levels replace-all

```text
NAME
    gcloud access-context-manager levels replace-all - replace all existing
        access levels

SYNOPSIS
    gcloud access-context-manager levels replace-all [POLICY]
        --source-file=SOURCE_FILE [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Replace all existing access level in specified access policy with access
    levels specified in a file.

EXAMPLES
    To replace all levels within a policy, using etag:

        $ gcloud access-context-manager levels replace-all \
            my-policy-number \
            --source-file=path-to-file-containing-all-replacement-access-lev\
        els.yaml --etag=optional-latest-etag-of-policy

    To replace all levels within a policy, without using etag:

        $ gcloud access-context-manager levels replace-all \
            my-policy-number \
            --source-file=path-to-file-containing-all-replacement-access-lev\
        els.yaml

POSITIONAL ARGUMENTS
     Policy resource - The access policy that contains the levels you want to
     replace. This represents a Cloud resource.

     [POLICY]
        ID of the policy or fully qualified identifier for the policy.

        To set the policy attribute:
        * provide the argument policy on the command line;
        * set the property access_context_manager/policy;
        * automatically, if the current account belongs to an organization
          with exactly one access policy..

REQUIRED FLAGS
     --source-file=SOURCE_FILE
        Path to a file containing a list of access levels.

        An access level file is a YAML-formatted list of access levels, which
        are YAML objects representing a Basic or Custom level as described in
        the API reference. For example:

            - name: accessPolicies/my_policy/accessLevels/my_level
              title: My Basic Level
              description: Basic level for foo.
              basic:
                combiningFunction: AND
                conditions:
                - ipSubnetworks:
                  - 192.168.100.14/24
                  - 2001:db8::/48
                - members
                  - user1:user1@example.com
            - name: accessPolicies/my_policy/accessLevels/my_other_level
              title: My Other Custom Level
              description: Custom level for bar.
              custom:
                expr:
                  expression: "origin.region_code in ['US', 'CA']"

        For more information about the alpha version, see:
        https://cloud.google.com/access-context-manager/docs/reference/rest/v1alpha/accessPolicies.accessLevels
        For other versions, see:
        https://cloud.google.com/access-context-manager/docs/reference/rest/v1/accessPolicies.accessLevels

OPTIONAL FLAGS
     --etag=ETAG
        An etag which specifies the version of the Access Policy. Only etags
        that represent the latest version of the Access Policy will be
        accepted.

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
    These variants are also available:

        $ gcloud alpha access-context-manager levels replace-all

        $ gcloud beta access-context-manager levels replace-all
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud access-context-manager levels replace-all my-policy-number \
    --source-file=path-to-file-containing-all-replacement-access-levels.yaml \
    --etag=optional-latest-etag-of-policy

gcloud access-context-manager levels replace-all my-policy-number \
    --source-file=path-to-file-containing-all-replacement-access-levels.yaml
```

### gcloud access-context-manager levels update

```text
NAME
    gcloud access-context-manager levels update - update an existing access
        level

SYNOPSIS
    gcloud access-context-manager levels update (LEVEL : --policy=POLICY)
        [--description=DESCRIPTION] [--title=TITLE]
        [--custom-level-spec=CUSTOM_LEVEL_SPEC
          | --basic-level-spec=BASIC_LEVEL_SPEC
          --combine-function=COMBINE_FUNCTION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing access level.

POSITIONAL ARGUMENTS
     Level resource - The access level to update. The arguments in this group
     can be used to specify the attributes of this resource.

     This must be specified.

       LEVEL
          ID of the level or fully qualified identifier for the level.

          To set the level attribute:
          + provide the argument level on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --policy=POLICY
          The ID of the access policy.

          To set the policy attribute:
          + provide the argument level on the command line with a fully
            specified name;
          + provide the argument --policy on the command line;
          + set the property access_context_manager/policy.

FLAGS
     --description=DESCRIPTION
        Long-form description of access level.

     --title=TITLE
        Short human-readable title of the access level.

     Level specification.

     At most one of these can be specified:

       Custom level specification.

       --custom-level-spec=CUSTOM_LEVEL_SPEC
          Path to a file representing an expression for an access level.

          The expression is in the Common Expression Langague (CEL) format.For
          example:

               expression: "origin.region_code in ['US', 'CA']"

       Basic level specification.

       --basic-level-spec=BASIC_LEVEL_SPEC
          Path to a file containing a list of basic access level conditions.

          An access level condition file is a YAML-formatted list of
          conditions,which are YAML objects representing a Condition as
          described in the API reference. For example:

               - ipSubnetworks:
                 - 162.222.181.197/24
                 - 2001:db8::/48
               - members:
                 - user:user@example.com

       --combine-function=COMBINE_FUNCTION
          For a basic level, determines how conditions are combined.
          COMBINE_FUNCTION must be one of: and, or.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager levels update

        $ gcloud beta access-context-manager levels update
```

### gcloud beta access-context-manager levels conditions list

```text
NAME
    gcloud beta access-context-manager levels conditions list - list conditions
        for an access level

SYNOPSIS
    gcloud beta access-context-manager levels conditions list
        (--level=LEVEL : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager levels create

```text
NAME
    gcloud beta access-context-manager levels create - create a new access
        level

SYNOPSIS
    gcloud beta access-context-manager levels create (LEVEL : --policy=POLICY)
        --title=TITLE
        (--custom-level-spec=CUSTOM_LEVEL_SPEC
          | [--basic-level-spec=BASIC_LEVEL_SPEC
          : --combine-function=COMBINE_FUNCTION; default="and"]) [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager levels delete

```text
NAME
    gcloud beta access-context-manager levels delete - delete an access level

SYNOPSIS
    gcloud beta access-context-manager levels delete (LEVEL : --policy=POLICY)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager levels describe

```text
NAME
    gcloud beta access-context-manager levels describe - show details about an
        access level

SYNOPSIS
    gcloud beta access-context-manager levels describe
        (LEVEL : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager levels list

```text
NAME
    gcloud beta access-context-manager levels list - list access levels

SYNOPSIS
    gcloud beta access-context-manager levels list [--policy=POLICY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager levels replace-all

```text
NAME
    gcloud beta access-context-manager levels replace-all - replace all
        existing access levels

SYNOPSIS
    gcloud beta access-context-manager levels replace-all [POLICY]
        --source-file=SOURCE_FILE [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager levels update

```text
NAME
    gcloud beta access-context-manager levels update -

SYNOPSIS
    gcloud beta access-context-manager levels update (LEVEL : --policy=POLICY)
        [--description=DESCRIPTION] [--title=TITLE]
        [--custom-level-spec=CUSTOM_LEVEL_SPEC
          | --basic-level-spec=BASIC_LEVEL_SPEC
          --combine-function=COMBINE_FUNCTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager levels conditions list

```text
NAME
    gcloud alpha access-context-manager levels conditions list - list
        conditions for an access level

SYNOPSIS
    gcloud alpha access-context-manager levels conditions list
        (--level=LEVEL : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager levels config export

```text
NAME
    gcloud alpha access-context-manager levels config export - export the
        configuration for a Access Context Manager access level

SYNOPSIS
    gcloud alpha access-context-manager levels config export
        ([LEVEL : --policy=POLICY] --all) [--path=PATH; default="-"]
        [--resource-format=RESOURCE_FORMAT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager levels create

```text
NAME
    gcloud alpha access-context-manager levels create - create a new access
        level

SYNOPSIS
    gcloud alpha access-context-manager levels create (LEVEL : --policy=POLICY)
        --title=TITLE
        (--custom-level-spec=CUSTOM_LEVEL_SPEC
          | [--basic-level-spec=BASIC_LEVEL_SPEC
          : --combine-function=COMBINE_FUNCTION; default="and"]) [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager levels delete

```text
NAME
    gcloud alpha access-context-manager levels delete - delete an access level

SYNOPSIS
    gcloud alpha access-context-manager levels delete (LEVEL : --policy=POLICY)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager levels describe

```text
NAME
    gcloud alpha access-context-manager levels describe - show details about an
        access level

SYNOPSIS
    gcloud alpha access-context-manager levels describe
        (LEVEL : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager levels list

```text
NAME
    gcloud alpha access-context-manager levels list - list access levels

SYNOPSIS
    gcloud alpha access-context-manager levels list [--policy=POLICY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager levels replace-all

```text
NAME
    gcloud alpha access-context-manager levels replace-all - replace all
        existing access levels

SYNOPSIS
    gcloud alpha access-context-manager levels replace-all [POLICY]
        --source-file=SOURCE_FILE [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager levels update

```text
NAME
    gcloud alpha access-context-manager levels update -

SYNOPSIS
    gcloud alpha access-context-manager levels update (LEVEL : --policy=POLICY)
        [--description=DESCRIPTION] [--title=TITLE]
        [--custom-level-spec=CUSTOM_LEVEL_SPEC
          | --basic-level-spec=BASIC_LEVEL_SPEC
          --combine-function=COMBINE_FUNCTION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/levels (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
