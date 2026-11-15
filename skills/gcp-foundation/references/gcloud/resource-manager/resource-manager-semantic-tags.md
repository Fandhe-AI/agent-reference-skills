---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/resource-manager/semantic-tags
---

# gcloud resource-manager semantic-tags

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha resource-manager semantic-tags bindings create

```text
NAME
    gcloud alpha resource-manager semantic-tags bindings create - create a
        Semantic Tag Binding

SYNOPSIS
    gcloud alpha resource-manager semantic-tags bindings create
        --semantic-tag-value=VALUE --target-resource=FULL_RESOURCE_URI
        [--async] [--location=LOCATION; default="global"] [--parent=PARENT]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager semantic-tags bindings delete

```text
NAME
    gcloud alpha resource-manager semantic-tags bindings delete - delete a
        Semantic Tag Binding

SYNOPSIS
    gcloud alpha resource-manager semantic-tags bindings delete BINDING_NAME
        [--async] [--location=LOCATION; default="global"] [--parent=PARENT]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager semantic-tags bindings list

```text
NAME
    gcloud alpha resource-manager semantic-tags bindings list - list Semantic
        Tag Bindings

SYNOPSIS
    gcloud alpha resource-manager semantic-tags bindings list
        --target-resource=FULL_RESOURCE_URI
        [--location=LOCATION; default="global"] [--parent=PARENT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager semantic-tags keys describe

```text
NAME
    gcloud alpha resource-manager semantic-tags keys describe - describe a
        Semantic Tag Key

SYNOPSIS
    gcloud alpha resource-manager semantic-tags keys describe KEY
        [--location=LOCATION; default="global"] [--view=VIEW; default="basic"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager semantic-tags keys list

```text
NAME
    gcloud alpha resource-manager semantic-tags keys list - list Semantic Tag
        Keys

SYNOPSIS
    gcloud alpha resource-manager semantic-tags keys list
        [--location=LOCATION; default="global"] [--parent-key=KEY]
        [--view=VIEW; default="basic"] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager semantic-tags values create

```text
NAME
    gcloud alpha resource-manager semantic-tags values create - create a
        Semantic Tag Value

SYNOPSIS
    gcloud alpha resource-manager semantic-tags values create VALUE_ID
        --key=KEY
        (--value=STRING | --value-field=FIELD=VALUE,[FIELD=VALUE,...]
          | --value-file=FILE) [--async] [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [--location=LOCATION; default="global"]
        [--parent=PARENT] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager semantic-tags values describe

```text
NAME
    gcloud alpha resource-manager semantic-tags values describe - describe a
        Semantic Tag Value

SYNOPSIS
    gcloud alpha resource-manager semantic-tags values describe VALUE_ID
        [--location=LOCATION; default="global"] [--parent=PARENT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager semantic-tags values list

```text
NAME
    gcloud alpha resource-manager semantic-tags values list - list Semantic Tag
        Values

SYNOPSIS
    gcloud alpha resource-manager semantic-tags values list [--key=KEY]
        [--location=LOCATION; default="global"] [--parent=PARENT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/resource-manager/semantic-tags (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
