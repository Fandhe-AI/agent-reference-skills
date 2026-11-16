---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/alloydb/endpoints
---

# gcloud alloydb endpoints

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta alloydb endpoints create

```text
NAME
    gcloud beta alloydb endpoints create - creates a new AlloyDB endpoint

SYNOPSIS
    gcloud beta alloydb endpoints create ENDPOINT --endpoint-type=ENDPOINT_TYPE
        --region=REGION --target-instances=[TARGET_INSTANCES,...] [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb endpoints delete

```text
NAME
    gcloud beta alloydb endpoints delete - deletes an AlloyDB endpoint

SYNOPSIS
    gcloud beta alloydb endpoints delete ENDPOINT --region=REGION [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb endpoints describe

```text
NAME
    gcloud beta alloydb endpoints describe - describe an AlloyDB endpoint in a
        given project and region

SYNOPSIS
    gcloud beta alloydb endpoints describe ENDPOINT --region=REGION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb endpoints list

```text
NAME
    gcloud beta alloydb endpoints list - list AlloyDB endpoints in a given
        project and region

SYNOPSIS
    gcloud beta alloydb endpoints list [--region=REGION; default="-"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb endpoints update

```text
NAME
    gcloud beta alloydb endpoints update - update an AlloyDB endpoint

SYNOPSIS
    gcloud beta alloydb endpoints update ENDPOINT --region=REGION
        --target-instances=[TARGET_INSTANCES,...] [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb endpoints create

```text
NAME
    gcloud alpha alloydb endpoints create - creates a new AlloyDB endpoint

SYNOPSIS
    gcloud alpha alloydb endpoints create ENDPOINT
        --endpoint-type=ENDPOINT_TYPE --region=REGION
        --target-instances=[TARGET_INSTANCES,...] [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb endpoints delete

```text
NAME
    gcloud alpha alloydb endpoints delete - deletes an AlloyDB endpoint

SYNOPSIS
    gcloud alpha alloydb endpoints delete ENDPOINT --region=REGION [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb endpoints describe

```text
NAME
    gcloud alpha alloydb endpoints describe - describe an AlloyDB endpoint in a
        given project and region

SYNOPSIS
    gcloud alpha alloydb endpoints describe ENDPOINT --region=REGION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb endpoints list

```text
NAME
    gcloud alpha alloydb endpoints list - list AlloyDB endpoints in a given
        project and region

SYNOPSIS
    gcloud alpha alloydb endpoints list [--region=REGION; default="-"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb endpoints update

```text
NAME
    gcloud alpha alloydb endpoints update - update an AlloyDB endpoint

SYNOPSIS
    gcloud alpha alloydb endpoints update ENDPOINT --region=REGION
        --target-instances=[TARGET_INSTANCES,...] [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/alloydb/endpoints (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
