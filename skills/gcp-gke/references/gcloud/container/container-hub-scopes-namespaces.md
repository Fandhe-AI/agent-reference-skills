---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/scopes/namespaces
---

# gcloud container hub scopes namespaces

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub scopes namespaces create

```text
NAME
    gcloud container hub scopes namespaces create - create a fleet namespace

SYNOPSIS
    gcloud container hub scopes namespaces create (NAMESPACE : --scope=SCOPE)
        [--labels=[KEY=VALUE,...]] [--namespace-labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The project specified does not exist.
      o The project has a fleet namespace with the same name.
      o The caller does not have permission to access the given project.

EXAMPLES
    To create a fleet namespace with name NAMESPACE in the active project, run:

        $ gcloud container hub scopes namespaces create NAMESPACE

    To create a fleet namespace in fleet scope SCOPE in project PROJECT_ID with
    name NAMESPACE, run:

        $ gcloud container hub scopes namespaces create NAMESPACE \
            --scope=SCOPE --project=PROJECT_ID

POSITIONAL ARGUMENTS
     Namespace resource - The group of arguments defining the Fleet Namespace.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument NAMESPACE on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument NAMESPACE on the command line with a fully
        specified name;
      * global is the only supported location.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument NAMESPACE on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --scope=SCOPE
          the

          To set the scope attribute:
          + provide the argument NAMESPACE on the command line with a fully
            specified name;
          + provide the argument --scope on the command line.

FLAGS
     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --namespace-labels=[KEY=VALUE,...]
        List of namespace-level label KEY=VALUE pairs to add.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub scopes namespaces create

        $ gcloud beta container hub scopes namespaces create
```

### gcloud container hub scopes namespaces delete

```text
NAME
    gcloud container hub scopes namespaces delete - delete a fleet namespace

SYNOPSIS
    gcloud container hub scopes namespaces delete (NAMESPACE : --scope=SCOPE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The project specified does not exist.
      o The namespace specified does not exist.
      o The caller does not have permission to access the given project or
        namespace.

EXAMPLES
    To delete fleet namespace NAMESPACE in the active project:

        $ gcloud container hub scopes namespaces delete NAMESPACE

    To delete fleet namespace NAMESPACE in project PROJECT_ID:

        $ gcloud container hub scopes namespaces delete NAMESPACE \
            --project=PROJECT_ID

POSITIONAL ARGUMENTS
     Namespace resource - The group of arguments defining the Fleet Namespace.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument NAMESPACE on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument NAMESPACE on the command line with a fully
        specified name;
      * global is the only supported location.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument NAMESPACE on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --scope=SCOPE
          the

          To set the scope attribute:
          + provide the argument NAMESPACE on the command line with a fully
            specified name;
          + provide the argument --scope on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub scopes namespaces delete

        $ gcloud beta container hub scopes namespaces delete
```

### gcloud container hub scopes namespaces describe

```text
NAME
    gcloud container hub scopes namespaces describe - show fleet namespace info

SYNOPSIS
    gcloud container hub scopes namespaces describe (NAMESPACE : --scope=SCOPE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The project specified does not exist.
      o The namespace specified does not exist in the project.
      o The caller does not have permission to access the project or
        namespace.

EXAMPLES
    To print metadata for the namespace NAMESPACE in the active project, run:

        $ gcloud container hub scopes namespaces describe NAMESPACE

    To print metadata for the namespace NAMESPACE in project PROJECT_ID, run:

        $ gcloud container hub scopes namespaces describe NAMESPACE \
            --project=PROJECT_ID

POSITIONAL ARGUMENTS
     Namespace resource - The group of arguments defining the Fleet Namespace.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument NAMESPACE on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument NAMESPACE on the command line with a fully
        specified name;
      * global is the only supported location.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument NAMESPACE on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --scope=SCOPE
          the

          To set the scope attribute:
          + provide the argument NAMESPACE on the command line with a fully
            specified name;
          + provide the argument --scope on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub scopes namespaces describe

        $ gcloud beta container hub scopes namespaces describe
```

### gcloud container hub scopes namespaces get-credentials

```text
NAME
    gcloud container hub scopes namespaces get-credentials - fetch credentials
        for a membership with a particular namespace

SYNOPSIS
    gcloud container hub scopes namespaces get-credentials NAMESPACE
        [--membership=MEMBERSHIP] [--membership-location=MEMBERSHIP_LOCATION]
        [--set-namespace-in-config=SET_NAMESPACE_IN_CONFIG]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    Get the Connect Gateway kubeconfig for global membership MEMBERSHIP, using
    namespace NAMESPACE in the config:

        $ gcloud container hub scopes namespaces get-credentials NAMESPACE \
            --membership=MEMBERSHIP --membership-location=global \
            --set-namespace-in-config=true

    Get the Connect Gateway kubeconfig for global membership MEMBERSHIP:

        $ gcloud container hub scopes namespaces get-credentials NAMESPACE \
            --membership=MEMBERSHIP --membership-location=global

POSITIONAL ARGUMENTS
     NAMESPACE
        Name of the namespace for which to get access to memberships.

FLAGS
     --membership=MEMBERSHIP
        Membership ID to get credentials from. If not provided, a prompt will
        offer a list of memberships in the fleet.

     --membership-location=MEMBERSHIP_LOCATION
        The location of the membership resource, e.g. us-central1. If not
        specified, defaults to global.

     --set-namespace-in-config=SET_NAMESPACE_IN_CONFIG
        If true, the default namespace for the context in the generated
        kubeconfig will be set to the Fleet namespace (i.e. the name given as
        the positional argument in this command).

        Otherwise, no default namespace will be set, functioning the same as
        gcloud container fleet memberships get-credentials.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub scopes namespaces get-credentials

        $ gcloud beta container hub scopes namespaces get-credentials
```

### gcloud container hub scopes namespaces list

```text
NAME
    gcloud container hub scopes namespaces list - list fleet namespaces in a
        project

SYNOPSIS
    gcloud container hub scopes namespaces list --scope=SCOPE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The project specified does not exist.
      o The user does not have access to the project specified.

EXAMPLES
    The following command lists namespaces in the active project:

        $ gcloud container hub scopes namespaces list

    The following command lists namespaces in project PROJECT_ID:

        $ gcloud container hub scopes namespaces list --project=PROJECT_ID

REQUIRED FLAGS
     Scope resource - The group of arguments defining the Fleet Scope. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --scope on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --scope on the command line with a fully
        specified name;
      * global is the only supported location.

     This must be specified.

       --scope=SCOPE
          ID of the scope or fully qualified identifier for the scope.

          To set the scope attribute:
          + provide the argument --scope on the command line.

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

        $ gcloud alpha container hub scopes namespaces list

        $ gcloud beta container hub scopes namespaces list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud container hub scopes namespaces list \
    --scope=SCOPE

gcloud container hub scopes namespaces list \
    --scope=SCOPE \
    --project=PROJECT_ID
```

### gcloud container hub scopes namespaces update

```text
NAME
    gcloud container hub scopes namespaces update - update a fleet namespace

SYNOPSIS
    gcloud container hub scopes namespaces update (NAMESPACE : --scope=SCOPE)
        [--update-labels=[KEY=VALUE,...]]
        [--update-namespace-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--clear-namespace-labels | --remove-namespace-labels=[KEY,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The project specified does not exist.
      o The fleet namespace does not exist in the project.
      o The caller does not have permission to access the project or
        namespace.

EXAMPLES
    To update the namespace NAMESPACE in the active project:

        $ gcloud container hub scopes namespaces update NAMESPACE

    To update the namespace NAMESPACE in project PROJECT_ID:

        $ gcloud container hub scopes namespaces update NAMESPACE \
            --project=PROJECT_ID

POSITIONAL ARGUMENTS
     Namespace resource - The group of arguments defining the Fleet Namespace.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument NAMESPACE on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument NAMESPACE on the command line with a fully
        specified name;
      * global is the only supported location.

     This must be specified.

       NAMESPACE
          ID of the namespace or fully qualified identifier for the namespace.

          To set the namespace attribute:
          + provide the argument NAMESPACE on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --scope=SCOPE
          the

          To set the scope attribute:
          + provide the argument NAMESPACE on the command line with a fully
            specified name;
          + provide the argument --scope on the command line.

FLAGS
     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --update-namespace-labels=[KEY=VALUE,...]
        List of namespace-level label KEY=VALUE pairs to update in the cluster
        namespace. If a label exists, its value is modified. Otherwise, a new
        label is' created.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud container hub scopes namespaces update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud container hub scopes namespaces update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

     At most one of these can be specified:

       --clear-namespace-labels
          Remove all namespace-level labels from the cluster namespace. If
          --update-namespace-labels is also specified then
          --clear-namespace-labels is applied first.

          For example, to remove all labels:

              $ gcloud container hub scopes namespaces update namespace_name \
                --clear-namespace-labels

          To remove all existing namespace-level labels and create two new
          labels, foo and baz:

              $ gcloud container hub scopes namespaces update namespace_name \
                --clear-namespace-labels \
                --update-namespace-labels foo=bar,baz=qux

       --remove-namespace-labels=[KEY,...]
          List of namespace-level label keys to remove in the cluster
          namespace. If a label does not exist it is silently ignored. If
          --update-namespace-labels is also specified then
          --update-namespace-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub scopes namespaces update

        $ gcloud beta container hub scopes namespaces update
```

### gcloud beta container hub scopes namespaces create

```text
NAME
    gcloud beta container hub scopes namespaces create - create a fleet
        namespace

SYNOPSIS
    gcloud beta container hub scopes namespaces create
        (NAMESPACE : --scope=SCOPE) [--labels=[KEY=VALUE,...]]
        [--namespace-labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub scopes namespaces delete

```text
NAME
    gcloud beta container hub scopes namespaces delete - delete a fleet
        namespace

SYNOPSIS
    gcloud beta container hub scopes namespaces delete
        (NAMESPACE : --scope=SCOPE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub scopes namespaces describe

```text
NAME
    gcloud beta container hub scopes namespaces describe - show fleet namespace
        info

SYNOPSIS
    gcloud beta container hub scopes namespaces describe
        (NAMESPACE : --scope=SCOPE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub scopes namespaces get-credentials

```text
NAME
    gcloud beta container hub scopes namespaces get-credentials - fetch
        credentials for a membership with a particular namespace

SYNOPSIS
    gcloud beta container hub scopes namespaces get-credentials NAMESPACE
        [--membership=MEMBERSHIP] [--membership-location=MEMBERSHIP_LOCATION]
        [--set-namespace-in-config=SET_NAMESPACE_IN_CONFIG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub scopes namespaces list

```text
NAME
    gcloud beta container hub scopes namespaces list - list fleet namespaces in
        a project

SYNOPSIS
    gcloud beta container hub scopes namespaces list --scope=SCOPE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub scopes namespaces update

```text
NAME
    gcloud beta container hub scopes namespaces update - update a fleet
        namespace

SYNOPSIS
    gcloud beta container hub scopes namespaces update
        (NAMESPACE : --scope=SCOPE) [--update-labels=[KEY=VALUE,...]]
        [--update-namespace-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--clear-namespace-labels | --remove-namespace-labels=[KEY,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub scopes namespaces create

```text
NAME
    gcloud alpha container hub scopes namespaces create - create a fleet
        namespace

SYNOPSIS
    gcloud alpha container hub scopes namespaces create
        (NAMESPACE : --scope=SCOPE) [--labels=[KEY=VALUE,...]]
        [--namespace-labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub scopes namespaces delete

```text
NAME
    gcloud alpha container hub scopes namespaces delete - delete a fleet
        namespace

SYNOPSIS
    gcloud alpha container hub scopes namespaces delete
        (NAMESPACE : --scope=SCOPE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub scopes namespaces describe

```text
NAME
    gcloud alpha container hub scopes namespaces describe - show fleet
        namespace info

SYNOPSIS
    gcloud alpha container hub scopes namespaces describe
        (NAMESPACE : --scope=SCOPE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub scopes namespaces get-credentials

```text
NAME
    gcloud alpha container hub scopes namespaces get-credentials - fetch
        credentials for a membership with a particular namespace

SYNOPSIS
    gcloud alpha container hub scopes namespaces get-credentials NAMESPACE
        [--membership=MEMBERSHIP] [--membership-location=MEMBERSHIP_LOCATION]
        [--set-namespace-in-config=SET_NAMESPACE_IN_CONFIG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub scopes namespaces list

```text
NAME
    gcloud alpha container hub scopes namespaces list - list fleet namespaces
        in a project

SYNOPSIS
    gcloud alpha container hub scopes namespaces list --scope=SCOPE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub scopes namespaces update

```text
NAME
    gcloud alpha container hub scopes namespaces update - update a fleet
        namespace

SYNOPSIS
    gcloud alpha container hub scopes namespaces update
        (NAMESPACE : --scope=SCOPE) [--update-labels=[KEY=VALUE,...]]
        [--update-namespace-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--clear-namespace-labels | --remove-namespace-labels=[KEY,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example omits `--scope`, which the SYNOPSIS requires (gcloud 593.0.0: "Must be specified"); the runnable form adds `--scope=SCOPE`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/scopes/namespaces (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
