---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/service-extensions/extension-bindings
---

# gcloud service-extensions extension-bindings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta service-extensions extension-bindings create

```text
NAME
    gcloud beta service-extensions extension-bindings create - create
        extensionBindings

SYNOPSIS
    gcloud beta service-extensions extension-bindings create
        (EXTENSION_BINDING : --location=LOCATION)
        --producer-extension=PRODUCER_EXTENSION
        (--target-resources=[TARGET_RESOURCES,...] --scope-parent=SCOPE_PARENT
          --scope-resource-types=[SCOPE_RESOURCE_TYPES,...]) [--async]
        [--description=DESCRIPTION] [--etag=ETAG] [--fail-open]
        [--labels=[LABELS,...]] [--match-conditions=[to=TO]]
        [--producer-metadata=[PRODUCER_METADATA,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-extensions extension-bindings delete

```text
NAME
    gcloud beta service-extensions extension-bindings delete - delete
        extensionBindings

SYNOPSIS
    gcloud beta service-extensions extension-bindings delete
        (EXTENSION_BINDING : --location=LOCATION) [--async] [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-extensions extension-bindings describe

```text
NAME
    gcloud beta service-extensions extension-bindings describe - describe
        extensionBindings

SYNOPSIS
    gcloud beta service-extensions extension-bindings describe
        (EXTENSION_BINDING : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-extensions extension-bindings import

```text
NAME
    gcloud beta service-extensions extension-bindings import - import
        (create or update) extensionBinding from a file

SYNOPSIS
    gcloud beta service-extensions extension-bindings import
        (EXTENSION_BINDING : --location=LOCATION) [--async]
        [--endpoint-mode=ENDPOINT_MODE] [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-extensions extension-bindings list

```text
NAME
    gcloud beta service-extensions extension-bindings list - list
        extensionBindings

SYNOPSIS
    gcloud beta service-extensions extension-bindings list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-extensions extension-bindings update

```text
NAME
    gcloud beta service-extensions extension-bindings update - update
        extensionBindings

SYNOPSIS
    gcloud beta service-extensions extension-bindings update
        (EXTENSION_BINDING : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--etag=ETAG] [--[no-]fail-open]
        [--producer-extension=PRODUCER_EXTENSION]
        [--clear-target --scope-parent=SCOPE_PARENT
          --scope-resource-types=[SCOPE_RESOURCE_TYPES,...]
          --target-resources=[TARGET_RESOURCES,...]
          | --add-target-resources=[ADD_TARGET_RESOURCES,...]
          --clear-target-resources
          | --remove-target-resources=[REMOVE_TARGET_RESOURCES,...]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS]
        [--match-conditions=[to=TO]
          | --add-match-conditions=[to=TO] --clear-match-conditions
          | --remove-match-conditions=[to=TO]]
        [--producer-metadata=[PRODUCER_METADATA,...]
          | --update-producer-metadata=[UPDATE_PRODUCER_METADATA,...]
          --clear-producer-metadata
          | --remove-producer-metadata=REMOVE_PRODUCER_METADATA]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions extension-bindings create

```text
NAME
    gcloud alpha service-extensions extension-bindings create - create
        extensionBindings

SYNOPSIS
    gcloud alpha service-extensions extension-bindings create
        (EXTENSION_BINDING : --location=LOCATION)
        --producer-extension=PRODUCER_EXTENSION
        (--target-resources=[TARGET_RESOURCES,...] --scope-parent=SCOPE_PARENT
          --scope-resource-types=[SCOPE_RESOURCE_TYPES,...]) [--async]
        [--description=DESCRIPTION] [--etag=ETAG] [--fail-open]
        [--labels=[LABELS,...]] [--match-conditions=[to=TO]]
        [--producer-metadata=[PRODUCER_METADATA,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions extension-bindings delete

```text
NAME
    gcloud alpha service-extensions extension-bindings delete - delete
        extensionBindings

SYNOPSIS
    gcloud alpha service-extensions extension-bindings delete
        (EXTENSION_BINDING : --location=LOCATION) [--async] [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions extension-bindings describe

```text
NAME
    gcloud alpha service-extensions extension-bindings describe - describe
        extensionBindings

SYNOPSIS
    gcloud alpha service-extensions extension-bindings describe
        (EXTENSION_BINDING : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions extension-bindings import

```text
NAME
    gcloud alpha service-extensions extension-bindings import - import
        (create or update) extensionBinding from a file

SYNOPSIS
    gcloud alpha service-extensions extension-bindings import
        (EXTENSION_BINDING : --location=LOCATION) [--async]
        [--endpoint-mode=ENDPOINT_MODE] [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions extension-bindings list

```text
NAME
    gcloud alpha service-extensions extension-bindings list - list
        extensionBindings

SYNOPSIS
    gcloud alpha service-extensions extension-bindings list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions extension-bindings update

```text
NAME
    gcloud alpha service-extensions extension-bindings update - update
        extensionBindings

SYNOPSIS
    gcloud alpha service-extensions extension-bindings update
        (EXTENSION_BINDING : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--etag=ETAG] [--[no-]fail-open]
        [--producer-extension=PRODUCER_EXTENSION]
        [--clear-target --scope-parent=SCOPE_PARENT
          --scope-resource-types=[SCOPE_RESOURCE_TYPES,...]
          --target-resources=[TARGET_RESOURCES,...]
          | --add-target-resources=[ADD_TARGET_RESOURCES,...]
          --clear-target-resources
          | --remove-target-resources=[REMOVE_TARGET_RESOURCES,...]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS]
        [--match-conditions=[to=TO]
          | --add-match-conditions=[to=TO] --clear-match-conditions
          | --remove-match-conditions=[to=TO]]
        [--producer-metadata=[PRODUCER_METADATA,...]
          | --update-producer-metadata=[UPDATE_PRODUCER_METADATA,...]
          --clear-producer-metadata
          | --remove-producer-metadata=REMOVE_PRODUCER_METADATA]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/service-extensions/extension-bindings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
