---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/network-services/express-links
---

# gcloud network-services express-links

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta network-services express-links create

```text
NAME
    gcloud beta network-services express-links create - create an express link

SYNOPSIS
    gcloud beta network-services express-links create
        (EXPRESS_LINK : --location=LOCATION) [--async]
        [--description=DESCRIPTION]
        [--destination-services=[DESTINATION_SERVICES,...]]
        [--matches-hostname=[MATCHES_HOSTNAME,...]]
        [--source-services=[SOURCE_SERVICES,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services express-links delete

```text
NAME
    gcloud beta network-services express-links delete - delete express link

SYNOPSIS
    gcloud beta network-services express-links delete
        (EXPRESS_LINK : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services express-links describe

```text
NAME
    gcloud beta network-services express-links describe - describe an express
        link

SYNOPSIS
    gcloud beta network-services express-links describe
        (EXPRESS_LINK : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services express-links export

```text
NAME
    gcloud beta network-services express-links export - export an express link

SYNOPSIS
    gcloud beta network-services express-links export
        (EXPRESS_LINK : --location=LOCATION) [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services express-links import

```text
NAME
    gcloud beta network-services express-links import - import an express link

SYNOPSIS
    gcloud beta network-services express-links import
        (EXPRESS_LINK : --location=LOCATION) [--async] [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services express-links list

```text
NAME
    gcloud beta network-services express-links list - list express links

SYNOPSIS
    gcloud beta network-services express-links list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services express-links update

```text
NAME
    gcloud beta network-services express-links update - update an express link

SYNOPSIS
    gcloud beta network-services express-links update
        (EXPRESS_LINK : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services express-links create

```text
NAME
    gcloud alpha network-services express-links create - create an express link

SYNOPSIS
    gcloud alpha network-services express-links create
        (EXPRESS_LINK : --location=LOCATION) [--async]
        [--description=DESCRIPTION]
        [--destination-services=[DESTINATION_SERVICES,...]]
        [--matches-hostname=[MATCHES_HOSTNAME,...]]
        [--source-services=[SOURCE_SERVICES,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services express-links delete

```text
NAME
    gcloud alpha network-services express-links delete - delete express link

SYNOPSIS
    gcloud alpha network-services express-links delete
        (EXPRESS_LINK : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services express-links describe

```text
NAME
    gcloud alpha network-services express-links describe - describe an express
        link

SYNOPSIS
    gcloud alpha network-services express-links describe
        (EXPRESS_LINK : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services express-links export

```text
NAME
    gcloud alpha network-services express-links export - export an express link

SYNOPSIS
    gcloud alpha network-services express-links export
        (EXPRESS_LINK : --location=LOCATION) [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services express-links import

```text
NAME
    gcloud alpha network-services express-links import - import an express link

SYNOPSIS
    gcloud alpha network-services express-links import
        (EXPRESS_LINK : --location=LOCATION) [--async] [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services express-links list

```text
NAME
    gcloud alpha network-services express-links list - list express links

SYNOPSIS
    gcloud alpha network-services express-links list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services express-links update

```text
NAME
    gcloud alpha network-services express-links update - update an express link

SYNOPSIS
    gcloud alpha network-services express-links update
        (EXPRESS_LINK : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/network-services/express-links (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
