---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/groups
---

# gcloud network-connectivity hubs groups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity hubs groups add-iam-policy-binding

```text
NAME
    gcloud network-connectivity hubs groups add-iam-policy-binding - add an IAM
        policy binding to the IAM policy of a group resource

SYNOPSIS
    gcloud network-connectivity hubs groups add-iam-policy-binding
        (GROUP : --hub=HUB) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to the IAM policy of a group resource. One
    binding consists of a member, a role, and an optional condition.

EXAMPLES
    To grant a user the roles/networkconnectivity.groupUser role on the group
    called my-group in the hub called my-hub', run the following command:

        $ gcloud network-connectivity hubs groups add-iam-policy-binding \
            my-group --member="user:username@gmail.com" \
            --role="roles/networkconnectivity.groupUser" --hub="my-hub"

POSITIONAL ARGUMENTS
     Group resource - The group that you want to update. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument group on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GROUP
          ID of the group or fully qualified identifier for the group.

          To set the group attribute:
          + provide the argument group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --hub=HUB
          Id of the hub.

          To set the hub attribute:
          + provide the argument group on the command line with a fully
            specified name;
          + provide the argument --hub on the command line.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity hubs groups add-iam-policy-binding
```

### gcloud network-connectivity hubs groups describe

```text
NAME
    gcloud network-connectivity hubs groups describe - describe a group

SYNOPSIS
    gcloud network-connectivity hubs groups describe (GROUP : --hub=HUB)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display details about a group.

EXAMPLES
    To display details about a group named my-group, run:

        $ gcloud network-connectivity hubs groups describe my-group

POSITIONAL ARGUMENTS
     Group resource - Name of the group to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument group on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GROUP
          ID of the group or fully qualified identifier for the group.

          To set the group attribute:
          + provide the argument group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --hub=HUB
          Id of the hub.

          To set the hub attribute:
          + provide the argument group on the command line with a fully
            specified name;
          + provide the argument --hub on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity hubs groups describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-connectivity hubs groups describe my-group \
    --hub=my-hub
```

### gcloud network-connectivity hubs groups get-iam-policy

```text
NAME
    gcloud network-connectivity hubs groups get-iam-policy - get the IAM policy
        for a group resource

SYNOPSIS
    gcloud network-connectivity hubs groups get-iam-policy (GROUP : --hub=HUB)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the IAM policy of a group. If formatted as JSON, the output can be
    edited and used as a policy file for set-iam-policy.

EXAMPLES
    To get the IAM policy for a group named my-group in the hub named my-hub,
    run:

        $ gcloud network-connectivity hubs groups get-iam-policy my-group \
            --hub="my-hub"

POSITIONAL ARGUMENTS
     Group resource - The group for which you want the IAM policy. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument group on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GROUP
          ID of the group or fully qualified identifier for the group.

          To set the group attribute:
          + provide the argument group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --hub=HUB
          Id of the hub.

          To set the hub attribute:
          + provide the argument group on the command line with a fully
            specified name;
          + provide the argument --hub on the command line.

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
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity hubs groups get-iam-policy
```

### gcloud network-connectivity hubs groups list

```text
NAME
    gcloud network-connectivity hubs groups list - list groups

SYNOPSIS
    gcloud network-connectivity hubs groups list [--hub=HUB]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display a list of all groups in the specified hub.

EXAMPLES
    To list all groups across all hubs, run:

        $ gcloud network-connectivity hubs groups list --hub=-

    To list all groups in hub my-hub, run:

        $ gcloud network-connectivity hubs groups list --hub=my-hub

FLAGS
     Hub resource - Parent hub of the groups to display. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --hub on the command line with a fully specified
        name;
      * if hub is empty, will use the wildcard '-' to indicate all hubs with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --hub=HUB
        ID of the hub or fully qualified identifier for the hub.

        To set the hub attribute:
        * provide the argument --hub on the command line;
        * if hub is empty, will use the wildcard '-' to indicate all hubs.

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
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity hubs groups list
```

### gcloud network-connectivity hubs groups remove-iam-policy-binding

```text
NAME
    gcloud network-connectivity hubs groups remove-iam-policy-binding - remove
        an IAM policy binding from the IAM policy of a group resource

SYNOPSIS
    gcloud network-connectivity hubs groups remove-iam-policy-binding
        (GROUP : --hub=HUB) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding from the IAM policy of a group resource.

EXAMPLES
    To remove the roles/networkconnectivity.groupUser role from a user of the
    group my-group in the hub my-hub, run:

        $ gcloud network-connectivity hubs groups \
            remove-iam-policy-binding my-group \
            --member="user:username@gmail.com" \
            --role="roles/networkconnectivity.groupUser" --hub="my-hub"

POSITIONAL ARGUMENTS
     Group resource - The group that you want to update. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument group on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GROUP
          ID of the group or fully qualified identifier for the group.

          To set the group attribute:
          + provide the argument group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --hub=HUB
          Id of the hub.

          To set the hub attribute:
          + provide the argument group on the command line with a fully
            specified name;
          + provide the argument --hub on the command line.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity hubs groups \
            remove-iam-policy-binding
```

### gcloud network-connectivity hubs groups set-iam-policy

```text
NAME
    gcloud network-connectivity hubs groups set-iam-policy - set the IAM policy
        of a group resource

SYNOPSIS
    gcloud network-connectivity hubs groups set-iam-policy (GROUP : --hub=HUB)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Replace the existing IAM policy of a group resource with a policy encoded
    in a JSON or YAML file.

EXAMPLES
    To replace the IAM policy of a group resource with the policy defined in a
    file called policy.json, run:

        $ gcloud network-connectivity hubs groups set-iam-policy my-group \
            policy.json --hub="my-hub"

POSITIONAL ARGUMENTS
     Group resource - The hub for which to set the IAM policy. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument group on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GROUP
          ID of the group or fully qualified identifier for the group.

          To set the group attribute:
          + provide the argument group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --hub=HUB
          Id of the hub.

          To set the hub attribute:
          + provide the argument group on the command line with a fully
            specified name;
          + provide the argument --hub on the command line.

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
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity hubs groups set-iam-policy
```

### gcloud network-connectivity hubs groups update

```text
NAME
    gcloud network-connectivity hubs groups update - update a group

SYNOPSIS
    gcloud network-connectivity hubs groups update (GROUP : --hub=HUB)
        [--async] [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--add-auto-accept-projects=[AUTO-ACCEPT-PROJECTS,...]
          | --clear-auto-accept-projects
          | --remove-auto-accept-projects=[AUTO-ACCEPT-PROJECTS,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the details of a group.

EXAMPLES
    To update the description of a group named my-group, in the hub my-hub,
    run:

        $ gcloud network-connectivity hubs groups update my-group \
            --hub=my-hub --description="new group description"

    To add the project my-project to the auto-accept list of a group named
    my-group in the hub my-hub, run:

        $ gcloud network-connectivity hubs groups update my-group \
            --hub=my-hub --add-auto-accept-projects=my-project

POSITIONAL ARGUMENTS
     Group resource - Name of the group to update. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument group on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GROUP
          ID of the group or fully qualified identifier for the group.

          To set the group attribute:
          + provide the argument group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --hub=HUB
          The hub Id.

          To set the hub attribute:
          + provide the argument group on the command line with a fully
            specified name;
          + provide the argument --hub on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        New description of the group.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     These flags modify the member auto-accept projects of this group. This
     controls the list of project ids or project numbers for which auto-accept
     is enabled for the group.

     At most one of these can be specified:

       --add-auto-accept-projects=[AUTO-ACCEPT-PROJECTS,...]
          Append the given values to the current auto-accept projects.

       --clear-auto-accept-projects
          Empty the current auto-accept projects.

       --remove-auto-accept-projects=[AUTO-ACCEPT-PROJECTS,...]
          Remove the given values from the current auto-accept projects.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud network-connectivity hubs groups update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-connectivity hubs groups update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity hubs groups update
```

### gcloud beta network-connectivity hubs groups add-iam-policy-binding

```text
NAME
    gcloud beta network-connectivity hubs groups add-iam-policy-binding - add
        an IAM policy binding to the IAM policy of a group resource

SYNOPSIS
    gcloud beta network-connectivity hubs groups add-iam-policy-binding
        (GROUP : --hub=HUB) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity hubs groups describe

```text
NAME
    gcloud beta network-connectivity hubs groups describe - describe a group

SYNOPSIS
    gcloud beta network-connectivity hubs groups describe (GROUP : --hub=HUB)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity hubs groups get-iam-policy

```text
NAME
    gcloud beta network-connectivity hubs groups get-iam-policy - get the IAM
        policy for a group resource

SYNOPSIS
    gcloud beta network-connectivity hubs groups get-iam-policy
        (GROUP : --hub=HUB) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity hubs groups list

```text
NAME
    gcloud beta network-connectivity hubs groups list - list groups

SYNOPSIS
    gcloud beta network-connectivity hubs groups list [--hub=HUB]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity hubs groups remove-iam-policy-binding

```text
NAME
    gcloud beta network-connectivity hubs groups remove-iam-policy-binding -
        remove an IAM policy binding from the IAM policy of a group resource

SYNOPSIS
    gcloud beta network-connectivity hubs groups remove-iam-policy-binding
        (GROUP : --hub=HUB) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity hubs groups set-iam-policy

```text
NAME
    gcloud beta network-connectivity hubs groups set-iam-policy - set the IAM
        policy of a group resource

SYNOPSIS
    gcloud beta network-connectivity hubs groups set-iam-policy
        (GROUP : --hub=HUB) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity hubs groups update

```text
NAME
    gcloud beta network-connectivity hubs groups update - update a group

SYNOPSIS
    gcloud beta network-connectivity hubs groups update (GROUP : --hub=HUB)
        [--async] [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--add-auto-accept-projects=[AUTO-ACCEPT-PROJECTS,...]
          | --clear-auto-accept-projects
          | --remove-auto-accept-projects=[AUTO-ACCEPT-PROJECTS,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example omits `--hub`, which the SYNOPSIS requires for the resource (no property sets it); gcloud 593.0.0 fails with "Failed to find attribute [hub]" without it, so the runnable form adds `--hub=my-hub`, the hub of the other examples on this page.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/groups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
