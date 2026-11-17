---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/ids/operations
---

# gcloud ids operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha ids operations cancel

```text
NAME
    gcloud alpha ids operations cancel - cancel a Cloud IDS operation

SYNOPSIS
    gcloud alpha ids operations cancel (OPERATION : --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha ids operations describe

```text
NAME
    gcloud alpha ids operations describe - describe a Cloud IDS operation

SYNOPSIS
    gcloud alpha ids operations describe (OPERATION : --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha ids operations list

```text
NAME
    gcloud alpha ids operations list - list Cloud IDS operations

SYNOPSIS
    gcloud alpha ids operations list [--project=PROJECT_ID]
        [--zone=ZONE; default="-"] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha ids operations wait

```text
NAME
    gcloud alpha ids operations wait - wait for a Cloud IDS operation to
        complete

SYNOPSIS
    gcloud alpha ids operations wait (OPERATION : --zone=ZONE)
        [--max-wait=MAX_WAIT; default="60m"] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/ids/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
