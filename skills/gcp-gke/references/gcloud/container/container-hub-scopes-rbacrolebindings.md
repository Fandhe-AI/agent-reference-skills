---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/scopes/rbacrolebindings
---

# gcloud container hub scopes rbacrolebindings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub scopes rbacrolebindings create

```text
NAME
    gcloud container hub scopes rbacrolebindings create - create an RBAC
        RoleBinding

SYNOPSIS
    gcloud container hub scopes rbacrolebindings create
        (NAME : --location=LOCATION --scope=SCOPE)
        (--custom-role=CUSTOM_ROLE | --role=ROLE) (--group=GROUP | --user=USER)
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The RBAC RoleBinding already exists.
      o The caller does not have permission to access the given scope.

EXAMPLES
    To create an admin RBAC RoleBinding RBRB in scope SCOPE for user
    person@google.com, run:

        $ gcloud container hub scopes rbacrolebindings create RBRB \
            --scope=SCOPE --role=admin --user=person@google.com

    To create a viewer RBAC RoleBinding RBRB in scope SCOPE for group
    people@google.com, run:

        $ gcloud container hub scopes rbacrolebindings create RBRB \
            --scope=SCOPE --role=viewer --group=people@google.com

    To create an RBAC RoleBinding with a custom role custom-role in scope SCOPE
    for user person@google.com, run:

        $ gcloud container hub scopes rbacrolebindings create RBRB \
            --scope=SCOPE --role=admin --user=person@google.com \
            --custom-role=custom-role

POSITIONAL ARGUMENTS
     Rbacrolebinding resource - The group of arguments defining an
     RBACRoleBinding. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument NAME on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the rbacrolebinding or fully qualified identifier for the
          rbacrolebinding.

          To set the rbacrolebinding attribute:
          + provide the argument NAME on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location for the rbacrolebinding.

          To set the location attribute:
          + provide the argument NAME on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property gkehub/location.

       --scope=SCOPE
          Name of the rbacrolebinding.

          To set the scope attribute:
          + provide the argument NAME on the command line with a fully
            specified name;
          + provide the argument --scope on the command line.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --custom-role=CUSTOM_ROLE
          Custom role to assign to principal.

       --role=ROLE
          Predefined role to assign to principal (admin, edit, view). ROLE must
          be one of: admin, edit, view.

     Exactly one of these must be specified:

       --group=GROUP
          Group for the RoleBinding.

       --user=USER
          User for the RoleBinding.

OPTIONAL FLAGS
     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub scopes rbacrolebindings create

        $ gcloud beta container hub scopes rbacrolebindings create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud container hub scopes rbacrolebindings create RBRB \
    --scope=SCOPE \
    --role=view \
    --group=people@google.com

gcloud container hub scopes rbacrolebindings create RBRB \
    --scope=SCOPE \
    --user=person@google.com \
    --custom-role=custom-role
```

### gcloud container hub scopes rbacrolebindings delete

```text
NAME
    gcloud container hub scopes rbacrolebindings delete - delete a fleet scope
        RBAC RoleBinding

SYNOPSIS
    gcloud container hub scopes rbacrolebindings delete
        (NAME : --location=LOCATION --scope=SCOPE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The RoleBinding specified does not exist.
      o The caller does not have permission to access the given RoleBinding.

EXAMPLES
    To delete RBAC RoleBinding RBRB in scope SCOPE in the active project:

        $ gcloud container hub scopes rbacrolebindings delete RBRB \
            --scope=SCOPE

POSITIONAL ARGUMENTS
     Rbacrolebinding resource - The group of arguments defining an
     RBACRoleBinding. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument NAME on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the rbacrolebinding or fully qualified identifier for the
          rbacrolebinding.

          To set the rbacrolebinding attribute:
          + provide the argument NAME on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location for the rbacrolebinding.

          To set the location attribute:
          + provide the argument NAME on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property gkehub/location.

       --scope=SCOPE
          Name of the rbacrolebinding.

          To set the scope attribute:
          + provide the argument NAME on the command line with a fully
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

        $ gcloud alpha container hub scopes rbacrolebindings delete

        $ gcloud beta container hub scopes rbacrolebindings delete
```

### gcloud container hub scopes rbacrolebindings describe

```text
NAME
    gcloud container hub scopes rbacrolebindings describe - show fleet scope
        RBAC RoleBinding information

SYNOPSIS
    gcloud container hub scopes rbacrolebindings describe
        (NAME : --location=LOCATION --scope=SCOPE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The RoleBinding specified does not exist in the project.
      o The caller does not have permission to access the RoleBinding.

EXAMPLES
    To print metadata for RBAC RoleBinding RBRB in the scope SCOPE, run:

        $ gcloud container hub scopes rbacrolebindings describe RBRB \
            --scope=SCOPE

POSITIONAL ARGUMENTS
     Rbacrolebinding resource - The group of arguments defining an
     RBACRoleBinding. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument NAME on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the rbacrolebinding or fully qualified identifier for the
          rbacrolebinding.

          To set the rbacrolebinding attribute:
          + provide the argument NAME on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location for the rbacrolebinding.

          To set the location attribute:
          + provide the argument NAME on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property gkehub/location.

       --scope=SCOPE
          Name of the rbacrolebinding.

          To set the scope attribute:
          + provide the argument NAME on the command line with a fully
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

        $ gcloud alpha container hub scopes rbacrolebindings describe

        $ gcloud beta container hub scopes rbacrolebindings describe
```

### gcloud container hub scopes rbacrolebindings list

```text
NAME
    gcloud container hub scopes rbacrolebindings list - list RBAC RoleBindings
        in a fleet scope

SYNOPSIS
    gcloud container hub scopes rbacrolebindings list --scope=SCOPE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The scope specified does not exist.
      o The user does not have access to the specified scope.

EXAMPLES
    The following command lists RBAC RoleBindings in scope SCOPE in project
    PROJECT_ID:

        $ gcloud container hub scopes rbacrolebindings list --scope=SCOPE \
            --project=PROJECT_ID

REQUIRED FLAGS
     --scope=SCOPE
        Name of the fleet scope to list RBAC RoleBindings from.

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

        $ gcloud alpha container hub scopes rbacrolebindings list

        $ gcloud beta container hub scopes rbacrolebindings list
```

### gcloud container hub scopes rbacrolebindings update

```text
NAME
    gcloud container hub scopes rbacrolebindings update - update a fleet scope
        RBAC RoleBinding

SYNOPSIS
    gcloud container hub scopes rbacrolebindings update
        (NAME : --location=LOCATION --scope=SCOPE)
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--custom-role=CUSTOM_ROLE | --role=ROLE] [--group=GROUP | --user=USER]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The RoleBinding does not exist in the project.
      o The caller does not have permission to access the RoleBinding.

EXAMPLES
    To update the RBAC RoleBinding RBRB in scope SCOPE in the active project to
    the viewer role:

        $ gcloud container hub scopes rbacrolebindings update RBRB \
            --scope=SCOPE --role=viewer

    To update the RBAC RoleBinding RBRB in scope SCOPE in the active project to
    the custom role custom-role:

        $ gcloud container hub scopes rbacrolebindings update RBRB \
            --scope=SCOPE --custom-role=custom-role

    To update the RBAC RoleBinding RBRB in scope SCOPE in the active project to
    the user someone@google.com:

        $ gcloud container hub scopes rbacrolebindings update RBRB \
            --scope=SCOPE --user=someone@google.com

POSITIONAL ARGUMENTS
     Rbacrolebinding resource - The group of arguments defining an
     RBACRoleBinding. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument NAME on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the rbacrolebinding or fully qualified identifier for the
          rbacrolebinding.

          To set the rbacrolebinding attribute:
          + provide the argument NAME on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location for the rbacrolebinding.

          To set the location attribute:
          + provide the argument NAME on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property gkehub/location.

       --scope=SCOPE
          Name of the rbacrolebinding.

          To set the scope attribute:
          + provide the argument NAME on the command line with a fully
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

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud container hub scopes rbacrolebindings update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud container hub scopes rbacrolebindings update \
                --clear-labels --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

     At most one of these can be specified:

       --custom-role=CUSTOM_ROLE
          Custom role to assign to principal.

       --role=ROLE
          Predefined role to assign to principal (admin, edit, view). ROLE must
          be one of: admin, edit, view.

     At most one of these can be specified:

       --group=GROUP
          Group for the RBACRoleBinding to update to.

       --user=USER
          User for the RBACRoleBinding to update to.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub scopes rbacrolebindings update

        $ gcloud beta container hub scopes rbacrolebindings update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud container hub scopes rbacrolebindings update RBRB \
    --scope=SCOPE \
    --role=view
```

### gcloud beta container hub scopes rbacrolebindings create

```text
NAME
    gcloud beta container hub scopes rbacrolebindings create - create an RBAC
        RoleBinding

SYNOPSIS
    gcloud beta container hub scopes rbacrolebindings create
        (NAME : --location=LOCATION --scope=SCOPE)
        (--custom-role=CUSTOM_ROLE | --role=ROLE) (--group=GROUP | --user=USER)
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub scopes rbacrolebindings delete

```text
NAME
    gcloud beta container hub scopes rbacrolebindings delete - delete a fleet
        scope RBAC RoleBinding

SYNOPSIS
    gcloud beta container hub scopes rbacrolebindings delete
        (NAME : --location=LOCATION --scope=SCOPE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub scopes rbacrolebindings describe

```text
NAME
    gcloud beta container hub scopes rbacrolebindings describe - show fleet
        scope RBAC RoleBinding information

SYNOPSIS
    gcloud beta container hub scopes rbacrolebindings describe
        (NAME : --location=LOCATION --scope=SCOPE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub scopes rbacrolebindings list

```text
NAME
    gcloud beta container hub scopes rbacrolebindings list - list RBAC
        RoleBindings in a fleet scope

SYNOPSIS
    gcloud beta container hub scopes rbacrolebindings list --scope=SCOPE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub scopes rbacrolebindings update

```text
NAME
    gcloud beta container hub scopes rbacrolebindings update - update a fleet
        scope RBAC RoleBinding

SYNOPSIS
    gcloud beta container hub scopes rbacrolebindings update
        (NAME : --location=LOCATION --scope=SCOPE)
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--custom-role=CUSTOM_ROLE | --role=ROLE] [--group=GROUP | --user=USER]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub scopes rbacrolebindings create

```text
NAME
    gcloud alpha container hub scopes rbacrolebindings create - create an RBAC
        RoleBinding

SYNOPSIS
    gcloud alpha container hub scopes rbacrolebindings create
        (NAME : --location=LOCATION --scope=SCOPE)
        (--custom-role=CUSTOM_ROLE | --role=ROLE) (--group=GROUP | --user=USER)
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub scopes rbacrolebindings delete

```text
NAME
    gcloud alpha container hub scopes rbacrolebindings delete - delete a fleet
        scope RBAC RoleBinding

SYNOPSIS
    gcloud alpha container hub scopes rbacrolebindings delete
        (NAME : --location=LOCATION --scope=SCOPE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub scopes rbacrolebindings describe

```text
NAME
    gcloud alpha container hub scopes rbacrolebindings describe - show fleet
        scope RBAC RoleBinding information

SYNOPSIS
    gcloud alpha container hub scopes rbacrolebindings describe
        (NAME : --location=LOCATION --scope=SCOPE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub scopes rbacrolebindings list

```text
NAME
    gcloud alpha container hub scopes rbacrolebindings list - list RBAC
        RoleBindings in a fleet scope

SYNOPSIS
    gcloud alpha container hub scopes rbacrolebindings list --scope=SCOPE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub scopes rbacrolebindings update

```text
NAME
    gcloud alpha container hub scopes rbacrolebindings update - update a fleet
        scope RBAC RoleBinding

SYNOPSIS
    gcloud alpha container hub scopes rbacrolebindings update
        (NAME : --location=LOCATION --scope=SCOPE)
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--custom-role=CUSTOM_ROLE | --role=ROLE] [--group=GROUP | --user=USER]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the custom-role example passes both `--role=admin` and `--custom-role=custom-role`, but the SYNOPSIS takes exactly one of `--custom-role` and `--role` (gcloud 593.0.0: "Exactly one of (--custom-role | --role) must be specified"); the runnable form drops `--role=admin`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the viewer example passes `--role=viewer`, but `--role` must be one of `admin`, `edit` and `view` (gcloud 593.0.0: "Invalid choice: 'viewer'. Did you mean 'view'?"); the runnable form uses `--role=view`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/scopes/rbacrolebindings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
