---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/scc/custom-modules/etd
---

# gcloud scc custom-modules etd

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha scc custom-modules etd create

```text
NAME
    gcloud alpha scc custom-modules etd create - create an Event Threat
        Detection custom module

SYNOPSIS
    gcloud alpha scc custom-modules etd create
        --custom-config-from-file=PATH_TO_FILE --display-name=DISPLAY_NAME
        --enablement-state=ENABLEMENT_STATE --module-type=MODULE_TYPE
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc custom-modules etd delete

```text
NAME
    gcloud alpha scc custom-modules etd delete - delete an Event Threat
        Detection custom module

SYNOPSIS
    gcloud alpha scc custom-modules etd delete CUSTOM_MODULE
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc custom-modules etd get

```text
NAME
    gcloud alpha scc custom-modules etd get - get the details of an Event
        Threat Detection custom module

SYNOPSIS
    gcloud alpha scc custom-modules etd get CUSTOM_MODULE
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc custom-modules etd get-effective

```text
NAME
    gcloud alpha scc custom-modules etd get-effective - get the details of a
        Event Threat Detection custom module with effective enablement state

SYNOPSIS
    gcloud alpha scc custom-modules etd get-effective CUSTOM_MODULE
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc custom-modules etd list

```text
NAME
    gcloud alpha scc custom-modules etd list - list the details of Event Threat
        Detection custom modules

SYNOPSIS
    gcloud alpha scc custom-modules etd list
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc custom-modules etd list-descendant

```text
NAME
    gcloud alpha scc custom-modules etd list-descendant - list the details of
        resident and descendant Event Threat Detection custom modules

SYNOPSIS
    gcloud alpha scc custom-modules etd list-descendant
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc custom-modules etd list-effective

```text
NAME
    gcloud alpha scc custom-modules etd list-effective - list the details of
        Event Threat Detection custom modules with effective enablement states

SYNOPSIS
    gcloud alpha scc custom-modules etd list-effective
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc custom-modules etd update

```text
NAME
    gcloud alpha scc custom-modules etd update - update an Event Threat
        Detection custom module

SYNOPSIS
    gcloud alpha scc custom-modules etd update CUSTOM_MODULE
        [--custom-config-from-file=PATH_TO_FILE]
        [--enablement-state=ENABLEMENT_STATE] [--update-mask=UPDATE_MASK]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/scc/custom-modules/etd (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
