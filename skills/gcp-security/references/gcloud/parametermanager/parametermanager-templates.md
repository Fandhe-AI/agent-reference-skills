---
source: https://docs.cloud.google.com/sdk/gcloud/reference/parametermanager/templates
---

# gcloud parametermanager templates

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud parametermanager templates versions

```text
NAME
    gcloud parametermanager templates versions - manage Parameter Manager
        template version resources

SYNOPSIS
    gcloud parametermanager templates versions [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Manage Parameter Manager template version resources.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta parametermanager templates versions
```

### gcloud beta parametermanager templates create

```text
NAME
    gcloud beta parametermanager templates create - create a Parameter Manager
        template

SYNOPSIS
    gcloud beta parametermanager templates create
        (TEMPLATE : --location=LOCATION) [--labels=[LABELS,...]]
        [--request-id=REQUEST_ID] [--template-format=TEMPLATE_FORMAT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta parametermanager templates delete

```text
NAME
    gcloud beta parametermanager templates delete - delete a single Parameter
        Manager template resource

SYNOPSIS
    gcloud beta parametermanager templates delete
        (TEMPLATE : --location=LOCATION) [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta parametermanager templates describe

```text
NAME
    gcloud beta parametermanager templates describe - get a single Parameter
        Manager template

SYNOPSIS
    gcloud beta parametermanager templates describe
        (TEMPLATE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta parametermanager templates list

```text
NAME
    gcloud beta parametermanager templates list - list Parameter Manager
        templates

SYNOPSIS
    gcloud beta parametermanager templates list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta parametermanager templates update

```text
NAME
    gcloud beta parametermanager templates update - update the metadata of a
        Parameter Manager template resource

SYNOPSIS
    gcloud beta parametermanager templates update
        (TEMPLATE : --location=LOCATION) [--request-id=REQUEST_ID]
        [--template-format=TEMPLATE_FORMAT]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta parametermanager templates versions create

```text
NAME
    gcloud beta parametermanager templates versions create - create a Parameter
        Manager template version

SYNOPSIS
    gcloud beta parametermanager templates versions create
        (TEMPLATE_VERSION : --location=LOCATION --template=TEMPLATE)
        ((--payload-data=PAYLOAD_DATA | --payload-data-from-file=PATH_TO_FILE))
        [--disabled] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta parametermanager templates versions delete

```text
NAME
    gcloud beta parametermanager templates versions delete - delete a single
        Parameter Manager template version

SYNOPSIS
    gcloud beta parametermanager templates versions delete
        (TEMPLATE_VERSION : --location=LOCATION --template=TEMPLATE)
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta parametermanager templates versions describe

```text
NAME
    gcloud beta parametermanager templates versions describe - get a single
        Parameter Manager template version

SYNOPSIS
    gcloud beta parametermanager templates versions describe
        (TEMPLATE_VERSION : --location=LOCATION --template=TEMPLATE)
        [--view=VIEW] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta parametermanager templates versions list

```text
NAME
    gcloud beta parametermanager templates versions list - list Parameter
        Manager template versions

SYNOPSIS
    gcloud beta parametermanager templates versions list
        (--template=TEMPLATE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta parametermanager templates versions render

```text
NAME
    gcloud beta parametermanager templates versions render - render a Parameter
        Manager template version

SYNOPSIS
    gcloud beta parametermanager templates versions render
        (TEMPLATE_VERSION : --template=TEMPLATE)
        (--parameter-version=PARAMETER_VERSION : --parameter=PARAMETER)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta parametermanager templates versions update

```text
NAME
    gcloud beta parametermanager templates versions update - update the
        properties of a single Parameter Manager template version

SYNOPSIS
    gcloud beta parametermanager templates versions update
        (TEMPLATE_VERSION : --location=LOCATION --template=TEMPLATE)
        [--[no-]disabled] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/parametermanager/templates (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
