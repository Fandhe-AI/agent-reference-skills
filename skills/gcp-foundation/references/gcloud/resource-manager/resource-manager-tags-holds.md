---
source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/tags/holds
---

# gcloud resource-manager tags holds

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud resource-manager tags holds create

```text
NAME
    gcloud resource-manager tags holds create - create a TagHold resource

SYNOPSIS
    gcloud resource-manager tags holds create PARENT --holder=HOLDER
        [--help-link=HELP_LINK] [--location=LOCATION] [--origin=ORIGIN]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a TagHold under a TagValue, indicating that the TagValue is being
    used by a holder (cloud resource) from an (optional) origin. The TagValue
    can be represented with its numeric id or its namespaced name of
    {parent_namespace}/{tag_key_short_name}/{tag_value_short_name}.

EXAMPLES
    To create a TagHold on tagValues/123, with holder cloud-resource-holder,
    origin creator-origin, in region us-central1-a, with help link
    www.example.help.link.com, run:

        $ gcloud resource-manager tags holds create tagValues/123 \
          --holder=cloud-resource-holder --origin=creator-origin \
          --help-link=www.example.help.link.com --location=us-central1-a

    To create a TagHold under TagValue test under TagKey env in organization id
    789, with holder cloud-resource-holder, run:

        $ gcloud resource-manager tags holds create 789/env/test \
          --holder=cloud-resource-holder

POSITIONAL ARGUMENTS
     PARENT
        Tag value name or namespaced name.

REQUIRED FLAGS
     --holder=HOLDER
        The name of the resource where the TagValue is being used. Must be less
        than 200 characters.

OPTIONAL FLAGS
     --help-link=HELP_LINK
        A URL where an end user can learn more about removing this hold.

     --location=LOCATION
        Region or zone where the TagHold will be stored. If not provided, the
        TagHold will be stored in a "global" region.

     --origin=ORIGIN
        An optional string representing the origin of this request. This field
        should include human-understandable information to distinguish origins
        from each other. Must be less than 200 characters.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager tags holds create

        $ gcloud beta resource-manager tags holds create
```

### gcloud resource-manager tags holds delete

```text
NAME
    gcloud resource-manager tags holds delete - delete a TagHold

SYNOPSIS
    gcloud resource-manager tags holds delete TAG_HOLD_NAME
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a TagHold given its full name, specified as
    tagValues/{tag_value_id}/tagHolds/{tag_hold_id}.

EXAMPLES
    To delete a TagHold under tagValue/111 with id abc-123-def in region
    us-central1-a, run:

        $ gcloud resource-manager tags holds delete \
            tagValue/111/tagHolds/abc-123-def --location=us-central1-a

POSITIONAL ARGUMENTS
     TAG_HOLD_NAME
        TagHold given its full name, specified as
        tagValues/{tag_value_id}/tagHolds/{tag_hold_id}

FLAGS
     --location=LOCATION
        Region where the TagHold is stored. If not provided, the API will
        attempt to find and delete the specified TagHold from the "global"
        region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager tags holds delete

        $ gcloud beta resource-manager tags holds delete
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud resource-manager tags holds delete tagValues/111/tagHolds/abc-123-def \
    --location=us-central1-a
```

### gcloud resource-manager tags holds list

```text
NAME
    gcloud resource-manager tags holds list - list TagHolds under the specified
        TagValue

SYNOPSIS
    gcloud resource-manager tags holds list PARENT [--holder=HOLDER]
        [--location=LOCATION] [--origin=ORIGIN] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List TagHolds under a TagValue. The TagValue can be represented with its
    numeric id or its namespaced name of
    {parent_namespace}/{tag_key_short_name}/{tag_value_short_name}. Limited to
    TagHolds stored in a single --location: if none is provided, the API will
    assume the "global" location. Optional filters are --holder and --origin:
    if provided, returned TagHolds' holder and origin fields must match the
    exact flag value.

EXAMPLES
    To list TagHolds for tagValues/456 in us-central1-a, run:

        $ gcloud resource-manager tags holds list tagValues/456 \
            --location=us-central1-a

    To list TagHolds for tagValues/456, with holder cloud-holder-resource and
    origin creator-origin, run:

        $ gcloud resource-manager tags holds list tagValues/456 \
            --holder=cloud-holder-resource --origin=creator-origin

POSITIONAL ARGUMENTS
     PARENT
        TagValue resource name or namespaced name to list TagHolds for. This
        field should be in the form tagValues/<id> or
        <parent_namespace>/<tagkey_short_name>/<short_name>.

FLAGS
     --holder=HOLDER
        The holder field of the TagHold to match exactly. If not provided, the
        API will return all matching TagHolds disregarding the holder field.

     --location=LOCATION
        Region where the matching TagHolds are stored. If not provided, the API
        will attempt to retrieve matching TagHolds from the "global" region.

     --origin=ORIGIN
        The origin field of the TagHold to match exactly. If not provided, the
        API will return all matching TagHolds disregarding the origin field.

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

        $ gcloud alpha resource-manager tags holds list

        $ gcloud beta resource-manager tags holds list
```

### gcloud beta resource-manager tags holds create

```text
NAME
    gcloud beta resource-manager tags holds create - create a TagHold resource

SYNOPSIS
    gcloud beta resource-manager tags holds create PARENT --holder=HOLDER
        [--help-link=HELP_LINK] [--location=LOCATION] [--origin=ORIGIN]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags holds delete

```text
NAME
    gcloud beta resource-manager tags holds delete - delete a TagHold

SYNOPSIS
    gcloud beta resource-manager tags holds delete TAG_HOLD_NAME
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager tags holds list

```text
NAME
    gcloud beta resource-manager tags holds list - list TagHolds under the
        specified TagValue

SYNOPSIS
    gcloud beta resource-manager tags holds list PARENT [--holder=HOLDER]
        [--location=LOCATION] [--origin=ORIGIN] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags holds create

```text
NAME
    gcloud alpha resource-manager tags holds create - create a TagHold resource

SYNOPSIS
    gcloud alpha resource-manager tags holds create PARENT --holder=HOLDER
        [--help-link=HELP_LINK] [--location=LOCATION] [--origin=ORIGIN]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags holds delete

```text
NAME
    gcloud alpha resource-manager tags holds delete - delete a TagHold

SYNOPSIS
    gcloud alpha resource-manager tags holds delete TAG_HOLD_NAME
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager tags holds list

```text
NAME
    gcloud alpha resource-manager tags holds list - list TagHolds under the
        specified TagValue

SYNOPSIS
    gcloud alpha resource-manager tags holds list PARENT [--holder=HOLDER]
        [--location=LOCATION] [--origin=ORIGIN] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): `tagValue/...` in the example is corrected to `tagValues/...`, the TagValue resource name format (`tagValues/{numeric_id}`) required by the flags.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/tags/holds (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
