---
source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/tags/bindings
---

# gcloud resource-manager tags bindings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud resource-manager tags bindings create

```text
NAME
    gcloud resource-manager tags bindings create - creates a TagBinding
        resource

SYNOPSIS
    gcloud resource-manager tags bindings create --parent=PARENT
        --tag-value=TAG_VALUE [--async] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a TagBinding given the TagValue and the parent cloud resource the
    TagValue will be attached to. The TagValue can be represented with its
    numeric id or its namespaced name of
    {parent_namespace}/{tag_key_short_name}/{tag_value_short_name}. The parent
    resource should be represented with its full resource name. See:
    https://cloud.google.com/apis/design/resource_names#full_resource_name.

EXAMPLES
    To create a TagBinding between tagValues/123 and Project with name
    //cloudresourcemanager.googleapis.com/projects/1234 run:

        $ gcloud resource-manager tags bindings create \
            --tag-value=tagValues/123 \
            --parent=//cloudresourcemanager.googleapis.com/projects/1234

    To create a TagBinding between TagValue test under TagKey env and Project
    with name //cloudresourcemanager.googleapis.com/projects/1234 run:

        $ gcloud resource-manager tags bindings create \
            --tag-value=789/env/test \
            --parent=//cloudresourcemanager.googleapis.com/projects/1234

REQUIRED FLAGS
     --parent=PARENT
        Full resource name of the resource to attach to the tagValue.

     --tag-value=TAG_VALUE
        Tag value name or namespaced name. The name should be in the form
        tagValues/{numeric_id}. The namespaced name should be in the form
        {org_id}/{tag_key_short_name}/{short_name} where short_name must be
        1-63 characters, beginning and ending with an alphanumeric character
        ([a-z0-9A-Z]) with dashes (-), underscores (), dots (.), and
        alphanumerics between.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --location=LOCATION
        Region or zone of the resource to bind to the TagValue. This field is
        not required if the resource is a global resource like projects,
        folders and organizations.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager tags bindings create

        $ gcloud beta resource-manager tags bindings create
```

### gcloud resource-manager tags bindings delete

```text
NAME
    gcloud resource-manager tags bindings delete - deletes a TagBinding

SYNOPSIS
    gcloud resource-manager tags bindings delete --parent=PARENT
        --tag-value=TAG_VALUE [--async] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a TagBinding given the TagValue and the parent resource that the
    TagValue is attached to. The parent must be given as the full resource
    name. See:
    https://cloud.google.com/apis/design/resource_names#full_resource_name. The
    TagValue can be represented with its numeric id or its namespaced name of
    {parent_namespace}/{tag_key_short_name}/{tag_value_short_name}.

EXAMPLES
    To delete a TagBinding between tagValue/111 and Project with name
    //cloudresourcemanager.googleapis.com/projects/1234 run:

        $ gcloud resource-manager tags bindings delete \
            --tag-value=tagValue/123 \
            --parent=//cloudresourcemanager.googleapis.com/projects/1234

    To delete a binding between TagValue test under TagKey env that lives under
    organizations/789 and Project with name
    //cloudresourcemanager.googleapis.com/projects/1234 run:

        $ gcloud resource-manager tags bindings delete \
            --tag-value=789/env/test \
            --parent=//cloudresourcemanager.googleapis.com/projects/1234

REQUIRED FLAGS
     --parent=PARENT
        Full resource name of the resource attached to the tagValue.

     --tag-value=TAG_VALUE
        Tag value name or namespaced name. The name should be in the form
        tagValues/{numeric_id}. The namespaced name should be in the form
        {org_id}/{tag_key_short_name}/{short_name} where short_name must be
        1-63 characters, beginning and ending with an alphanumeric character
        ([a-z0-9A-Z]) with dashes (-), underscores (), dots (.), and
        alphanumerics between.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --location=LOCATION
        Region or zone of the resource to unbind from the TagValue. This field
        is not required if the resource is a global resource like projects,
        folders and organizations.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager tags bindings delete

        $ gcloud beta resource-manager tags bindings delete
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud resource-manager tags bindings delete \
    --tag-value=tagValues/123 \
    --parent=//cloudresourcemanager.googleapis.com/projects/1234
```

### gcloud resource-manager tags bindings list

```text
NAME
    gcloud resource-manager tags bindings list - lists TagBindings bound to the
        specified resource

SYNOPSIS
    gcloud resource-manager tags bindings list --parent=PARENT [--effective]
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    When specifying a parent resource, the full name of the parent resource
    must be used. See:
    https://cloud.google.com/apis/design/resource_names#full_resource_name.

EXAMPLES
    To list TagBindings for
    '//cloudresourcemanager.googleapis.com/projects/123' run:

        $ gcloud resource-manager tags bindings list \
            --parent=//cloudresourcemanager.googleapis.com/projects/123

REQUIRED FLAGS
     --parent=PARENT
        Full resource name attached to the binding

FLAGS
     --effective
        Show all effective TagBindings on the resource. TagBindings applied at
        a higher level will be inherited to all descendants.

     --location=LOCATION
        Region or zone of the resource for listing TagBindings. This field
        should not be set if the resource is a global resource like projects,
        folders and organizations.

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

        $ gcloud alpha resource-manager tags bindings list

        $ gcloud beta resource-manager tags bindings list
```

### gcloud beta resource-manager tags bindings create

```text
NAME
    gcloud beta resource-manager tags bindings create - creates a TagBinding
        resource

SYNOPSIS
    gcloud beta resource-manager tags bindings create --parent=PARENT
        --tag-value=TAG_VALUE [--async] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags bindings delete

```text
NAME
    gcloud beta resource-manager tags bindings delete - deletes a TagBinding

SYNOPSIS
    gcloud beta resource-manager tags bindings delete --parent=PARENT
        --tag-value=TAG_VALUE [--async] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags bindings list

```text
NAME
    gcloud beta resource-manager tags bindings list - lists TagBindings bound
        to the specified resource

SYNOPSIS
    gcloud beta resource-manager tags bindings list --parent=PARENT
        [--effective] [--location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags bindings create

```text
NAME
    gcloud alpha resource-manager tags bindings create - creates a TagBinding
        resource

SYNOPSIS
    gcloud alpha resource-manager tags bindings create --parent=PARENT
        --tag-value=TAG_VALUE [--async] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags bindings delete

```text
NAME
    gcloud alpha resource-manager tags bindings delete - deletes a TagBinding

SYNOPSIS
    gcloud alpha resource-manager tags bindings delete --parent=PARENT
        --tag-value=TAG_VALUE [--async] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags bindings list

```text
NAME
    gcloud alpha resource-manager tags bindings list - lists TagBindings bound
        to the specified resource

SYNOPSIS
    gcloud alpha resource-manager tags bindings list --parent=PARENT
        [--effective] [--location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags bindings update

```text
NAME
    gcloud alpha resource-manager tags bindings update - updates TagBindings
        bound to the specified resource

SYNOPSIS
    gcloud alpha resource-manager tags bindings update
        --resource-name=RESOURCE_NAME
        (--clear-tags | --replace-tags=[REPLACE_TAGS,...]
          | --remove-tags=REMOVE_TAGS,[REMOVE_TAGS,...]
          --update-tags=[UPDATE_TAGS,...]) [--async] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): `tagValue/...` in the example is corrected to `tagValues/...`, the TagValue resource name format (`tagValues/{numeric_id}`) required by the flags.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/tags/bindings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
