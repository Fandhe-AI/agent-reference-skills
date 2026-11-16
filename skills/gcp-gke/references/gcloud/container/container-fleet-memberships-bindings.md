---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/memberships/bindings
---

# gcloud container fleet memberships bindings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container fleet memberships bindings create

```text
NAME
    gcloud container fleet memberships bindings create - create a Membership
        Binding

SYNOPSIS
    gcloud container fleet memberships bindings create
        (BINDING : --location=LOCATION --membership=MEMBERSHIP) --scope=SCOPE
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The Membership Binding already exists.
      o The caller does not have permission to access the given Membership.
      o The Scope or the Membership does not exist.
      o The caller did not specify the location (--location) if referring to
        location other than global.

EXAMPLES
    To create a membership binding BINDING_NAME in global membership
    MEMBERSHIP_NAME for scope SCOPE_NAME, run:

        $ gcloud container fleet memberships bindings create BINDING_NAME \
            --membership=MEMBERSHIP_NAME --scope=SCOPE_NAME

    To create a Binding BINDING_NAME associated with regional membership
    MEMBERSHIP_NAME, provide the location LOCATION_NAME for the Membership
    where the Binding belongs along with membership name and associated Scope
    SCOPE_NAME.

        $ gcloud container fleet memberships bindings create BINDING_NAME \
            --membership=MEMBERSHIP_NAME --scope=SCOPE_NAME \
            --location=LOCATION_NAME

POSITIONAL ARGUMENTS
     Binding resource - The group of arguments defining a Membership Binding.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument BINDING on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BINDING
          ID of the binding or fully qualified identifier for the binding.

          To set the binding attribute:
          + provide the argument BINDING on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location for the binding.

          To set the location attribute:
          + provide the argument BINDING on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property gkehub/location.

       --membership=MEMBERSHIP
          Name of the binding.

          To set the membership attribute:
          + provide the argument BINDING on the command line with a fully
            specified name;
          + provide the argument --membership on the command line.

REQUIRED FLAGS
     --scope=SCOPE
        ID of the scope or fully qualified identifier for the scope.

        To set the scope attribute:
        * provide the argument --scope on the command line.

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

        $ gcloud alpha container fleet memberships bindings create

        $ gcloud beta container fleet memberships bindings create
```

### gcloud container fleet memberships bindings delete

```text
NAME
    gcloud container fleet memberships bindings delete - delete a Membership
        Binding

SYNOPSIS
    gcloud container fleet memberships bindings delete
        (BINDING : --location=LOCATION --membership=MEMBERSHIP)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The Membership specified does not exist.
      o The Membership Binding specified does not exist.
      o The caller does not have permission to access the given Membership.
      o The caller did not specify the location (--location) if referring to
        location other than global.

EXAMPLES
    To delete Membership Binding BINDING_NAME in global Membership
    MEMBERSHIP_NAME for a global membership:

        $ gcloud container fleet memberships bindings delete BINDING_NAME \
            --membership=MEMBERSHIP_NAME

    To delete a Binding BINDING_NAME associated with regional membership
    MEMBERSHIP_NAME, provide the location LOCATION_NAME for the Membership
    where the Binding belongs along with the membership name.

        $ gcloud container fleet memberships bindings delete BINDING_NAME \
            --membership=MEMBERSHIP_NAME --location=LOCATION_NAME

POSITIONAL ARGUMENTS
     Binding resource - The group of arguments defining a Membership Binding.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument BINDING on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BINDING
          ID of the binding or fully qualified identifier for the binding.

          To set the binding attribute:
          + provide the argument BINDING on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location for the binding.

          To set the location attribute:
          + provide the argument BINDING on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property gkehub/location.

       --membership=MEMBERSHIP
          Name of the binding.

          To set the membership attribute:
          + provide the argument BINDING on the command line with a fully
            specified name;
          + provide the argument --membership on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet memberships bindings delete

        $ gcloud beta container fleet memberships bindings delete
```

### gcloud container fleet memberships bindings describe

```text
NAME
    gcloud container fleet memberships bindings describe - show
        Membership-Binding info

SYNOPSIS
    gcloud container fleet memberships bindings describe
        (BINDING : --location=LOCATION --membership=MEMBERSHIP)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The Membership specified does not exist.
      o The Membership Binding specified does not exist in the project.
      o The caller does not have permission to access the Membership Binding.
      o The caller did not specify the location (--location) if referring to
        location other than global.

EXAMPLES
    To print metadata for the membership Binding BINDING_NAME in a global
    membership MEMBERSHIP_NAME, run:

        $ gcloud container fleet memberships bindings describe \
            BINDING_NAME --membership=MEMBERSHIP_NAME

    To print metadata for the Binding BINDING_NAME associated with regional
    membership MEMBERSHIP_NAME, provide the location LOCATION_NAME for the
    Membership where the Binding belongs along with membership name.

        $ gcloud container fleet memberships bindings describe \
            BINDING_NAME --membership=MEMBERSHIP_NAME \
            --location=LOCATION_NAME

POSITIONAL ARGUMENTS
     Binding resource - The group of arguments defining a Membership Binding.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument BINDING on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BINDING
          ID of the binding or fully qualified identifier for the binding.

          To set the binding attribute:
          + provide the argument BINDING on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location for the binding.

          To set the location attribute:
          + provide the argument BINDING on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property gkehub/location.

       --membership=MEMBERSHIP
          Name of the binding.

          To set the membership attribute:
          + provide the argument BINDING on the command line with a fully
            specified name;
          + provide the argument --membership on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet memberships bindings describe

        $ gcloud beta container fleet memberships bindings describe
```

### gcloud container fleet memberships bindings list

```text
NAME
    gcloud container fleet memberships bindings list - list Bindings in a
        Membership

SYNOPSIS
    gcloud container fleet memberships bindings list --membership=MEMBERSHIP
        [--location=LOCATION; default="global"] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The Membership specified does not exist.
      o The user does not have access to the Membership specified.
      o The caller did not specify the location (--location) if referring to
        location other than global.

EXAMPLES
    The following command lists Bindings in global Membership MEMBERSHIP_NAME:

        $ gcloud container fleet memberships bindings list \
            --membership=MEMBERSHIP_NAME

    To list all the bindings associated with regional membership
    MEMBERSHIP_NAME, provide the location LOCATION_NAME for the Membership
    where the Binding belongs along with membership name.

        $ gcloud container fleet memberships bindings list \
            --membership=MEMBERSHIP_NAME --location=LOCATION_NAME

REQUIRED FLAGS
     --membership=MEMBERSHIP
        Name of the Membership to list Bindings from.

FLAGS
     --location=LOCATION; default="global"
        Name of the Membership location to list Bindings from.

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

        $ gcloud alpha container fleet memberships bindings list

        $ gcloud beta container fleet memberships bindings list
```

### gcloud container fleet memberships bindings update

```text
NAME
    gcloud container fleet memberships bindings update - update the Binding in
        a Membership

SYNOPSIS
    gcloud container fleet memberships bindings update
        (BINDING : --location=LOCATION --membership=MEMBERSHIP) --scope=SCOPE
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The Membership specified does not exist.
      o The Binding does not exist in the Membership.
      o The caller does not have permission to access the Membership/Binding.
      o The Scope specified does not exist.
      o The caller did not specify the location (--location) if referring to
        location other than global.

EXAMPLES
    To update the binding BINDING_NAME in global membership MEMBERSHIP_NAME in
    the active project:

        $ gcloud container fleet memberships bindings update BINDING_NAME \
            --membership=MEMBERSHIP_NAME

    To update a Binding BINDING_NAME associated with regional membership
    MEMBERSHIP_NAME, provide the location LOCATION_NAME for the Membership
    where the Binding belongs along with membership name and associated Scope
    SCOPE_NAME.

        $ gcloud container fleet memberships bindings update BINDING_NAME \
            --membership=MEMBERSHIP_NAME --scope=SCOPE_NAME \
            --location=LOCATION_NAME

POSITIONAL ARGUMENTS
     Binding resource - The group of arguments defining a Membership Binding.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument BINDING on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BINDING
          ID of the binding or fully qualified identifier for the binding.

          To set the binding attribute:
          + provide the argument BINDING on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location for the binding.

          To set the location attribute:
          + provide the argument BINDING on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property gkehub/location.

       --membership=MEMBERSHIP
          Name of the binding.

          To set the membership attribute:
          + provide the argument BINDING on the command line with a fully
            specified name;
          + provide the argument --membership on the command line.

REQUIRED FLAGS
     --scope=SCOPE
        ID of the scope or fully qualified identifier for the scope.

        To set the scope attribute:
        * provide the argument --scope on the command line.

OPTIONAL FLAGS
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

              $ gcloud container fleet memberships bindings update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud container fleet memberships bindings update \
                --clear-labels --update-labels foo=bar,baz=qux

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

NOTES
    These variants are also available:

        $ gcloud alpha container fleet memberships bindings update

        $ gcloud beta container fleet memberships bindings update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud container fleet memberships bindings update BINDING_NAME \
    --membership=MEMBERSHIP_NAME \
    --scope=SCOPE_NAME
```

### gcloud beta container fleet memberships bindings create

```text
NAME
    gcloud beta container fleet memberships bindings create - create a
        Membership Binding

SYNOPSIS
    gcloud beta container fleet memberships bindings create
        (BINDING : --location=LOCATION --membership=MEMBERSHIP) --scope=SCOPE
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container fleet memberships bindings delete

```text
NAME
    gcloud beta container fleet memberships bindings delete - delete a
        Membership Binding

SYNOPSIS
    gcloud beta container fleet memberships bindings delete
        (BINDING : --location=LOCATION --membership=MEMBERSHIP)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container fleet memberships bindings describe

```text
NAME
    gcloud beta container fleet memberships bindings describe - show
        Membership-Binding info

SYNOPSIS
    gcloud beta container fleet memberships bindings describe
        (BINDING : --location=LOCATION --membership=MEMBERSHIP)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container fleet memberships bindings list

```text
NAME
    gcloud beta container fleet memberships bindings list - list Bindings in a
        Membership

SYNOPSIS
    gcloud beta container fleet memberships bindings list
        --membership=MEMBERSHIP [--location=LOCATION; default="global"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container fleet memberships bindings update

```text
NAME
    gcloud beta container fleet memberships bindings update - update the
        Binding in a Membership

SYNOPSIS
    gcloud beta container fleet memberships bindings update
        (BINDING : --location=LOCATION --membership=MEMBERSHIP) --scope=SCOPE
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet memberships bindings create

```text
NAME
    gcloud alpha container fleet memberships bindings create - create a
        Membership Binding

SYNOPSIS
    gcloud alpha container fleet memberships bindings create
        (BINDING : --location=LOCATION --membership=MEMBERSHIP) --scope=SCOPE
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet memberships bindings delete

```text
NAME
    gcloud alpha container fleet memberships bindings delete - delete a
        Membership Binding

SYNOPSIS
    gcloud alpha container fleet memberships bindings delete
        (BINDING : --location=LOCATION --membership=MEMBERSHIP)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet memberships bindings describe

```text
NAME
    gcloud alpha container fleet memberships bindings describe - show
        Membership-Binding info

SYNOPSIS
    gcloud alpha container fleet memberships bindings describe
        (BINDING : --location=LOCATION --membership=MEMBERSHIP)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet memberships bindings list

```text
NAME
    gcloud alpha container fleet memberships bindings list - list Bindings in a
        Membership

SYNOPSIS
    gcloud alpha container fleet memberships bindings list
        --membership=MEMBERSHIP [--location=LOCATION; default="global"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet memberships bindings update

```text
NAME
    gcloud alpha container fleet memberships bindings update - update the
        Binding in a Membership

SYNOPSIS
    gcloud alpha container fleet memberships bindings update
        (BINDING : --location=LOCATION --membership=MEMBERSHIP) --scope=SCOPE
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example omits `--scope` in the first `update` example, which the SYNOPSIS requires (gcloud 593.0.0: "Must be specified"); the runnable form adds `--scope=SCOPE_NAME`, as in the regional example.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/memberships/bindings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
