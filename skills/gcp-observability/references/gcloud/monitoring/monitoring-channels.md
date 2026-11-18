---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/monitoring/channels
---

# gcloud monitoring channels

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta monitoring channels create

```text
NAME
    gcloud beta monitoring channels create - create a new notification channel

SYNOPSIS
    gcloud beta monitoring channels create
        [--channel-content=CHANNEL_CONTENT
          | --channel-content-from-file=PATH_TO_FILE]
        [--channel-labels=[KEY=VALUE,...] --description=DESCRIPTION
          --display-name=DISPLAY_NAME
          --no-enabled --type=TYPE --user-labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring channels delete

```text
NAME
    gcloud beta monitoring channels delete - delete a notification channel

SYNOPSIS
    gcloud beta monitoring channels delete CHANNEL [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring channels describe

```text
NAME
    gcloud beta monitoring channels describe - describe a notification channel

SYNOPSIS
    gcloud beta monitoring channels describe CHANNEL [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring channels list

```text
NAME
    gcloud beta monitoring channels list - list notification channels

SYNOPSIS
    gcloud beta monitoring channels list [--type=TYPE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring channels update

```text
NAME
    gcloud beta monitoring channels update - update a notification channel

SYNOPSIS
    gcloud beta monitoring channels update CHANNEL
        [--channel-content=CHANNEL_CONTENT
          | --channel-content-from-file=PATH_TO_FILE]
        [--fields=[field,...] | --description=DESCRIPTION
          --display-name=DISPLAY_NAME --[no-]enabled --type=TYPE
          --update-channel-labels=[KEY=VALUE,...] --clear-channel-labels
          | --remove-channel-labels=[KEY,...]
          --update-user-labels=[KEY=VALUE,...] --clear-user-labels
          | --remove-user-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring channels config export

```text
NAME
    gcloud alpha monitoring channels config export - export the configuration
        for a Monitoring notification channel

SYNOPSIS
    gcloud alpha monitoring channels config export ([CHANNEL]] --all)
        [--path=PATH; default="-"] [--resource-format=RESOURCE_FORMAT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring channels create

```text
NAME
    gcloud alpha monitoring channels create - create a new notification channel

SYNOPSIS
    gcloud alpha monitoring channels create
        [--channel-content=CHANNEL_CONTENT
          | --channel-content-from-file=PATH_TO_FILE]
        [--channel-labels=[KEY=VALUE,...] --description=DESCRIPTION
          --display-name=DISPLAY_NAME
          --no-enabled --type=TYPE --user-labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring channels delete

```text
NAME
    gcloud alpha monitoring channels delete - delete a notification channel

SYNOPSIS
    gcloud alpha monitoring channels delete CHANNEL [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring channels describe

```text
NAME
    gcloud alpha monitoring channels describe - describe a notification channel

SYNOPSIS
    gcloud alpha monitoring channels describe CHANNEL [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring channels list

```text
NAME
    gcloud alpha monitoring channels list - list notification channels

SYNOPSIS
    gcloud alpha monitoring channels list [--type=TYPE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring channels update

```text
NAME
    gcloud alpha monitoring channels update - update a notification channel

SYNOPSIS
    gcloud alpha monitoring channels update CHANNEL
        [--channel-content=CHANNEL_CONTENT
          | --channel-content-from-file=PATH_TO_FILE]
        [--fields=[field,...] | --description=DESCRIPTION
          --display-name=DISPLAY_NAME --[no-]enabled --type=TYPE
          --update-channel-labels=[KEY=VALUE,...] --clear-channel-labels
          | --remove-channel-labels=[KEY,...]
          --update-user-labels=[KEY=VALUE,...] --clear-user-labels
          | --remove-user-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/monitoring/channels (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
