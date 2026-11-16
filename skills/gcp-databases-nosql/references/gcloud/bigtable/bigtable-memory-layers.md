---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/bigtable/memory-layers
---

# gcloud bigtable memory-layers

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta bigtable memory-layers describe

```text
NAME
    gcloud beta bigtable memory-layers describe - describe a Bigtable memory
        layer

SYNOPSIS
    gcloud beta bigtable memory-layers describe (CLUSTER : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable memory-layers list

```text
NAME
    gcloud beta bigtable memory-layers list - list Bigtable memory layers

SYNOPSIS
    gcloud beta bigtable memory-layers list [--cluster=CLUSTER]
        [--instance=INSTANCE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable memory-layers update

```text
NAME
    gcloud beta bigtable memory-layers update - update a Bigtable memory layer

SYNOPSIS
    gcloud beta bigtable memory-layers update (CLUSTER : --instance=INSTANCE)
        (--disable | --enable) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable memory-layers describe

```text
NAME
    gcloud alpha bigtable memory-layers describe - describe a Bigtable memory
        layer

SYNOPSIS
    gcloud alpha bigtable memory-layers describe
        (CLUSTER : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable memory-layers list

```text
NAME
    gcloud alpha bigtable memory-layers list - list Bigtable memory layers

SYNOPSIS
    gcloud alpha bigtable memory-layers list [--cluster=CLUSTER]
        [--instance=INSTANCE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable memory-layers update

```text
NAME
    gcloud alpha bigtable memory-layers update - update a Bigtable memory layer

SYNOPSIS
    gcloud alpha bigtable memory-layers update (CLUSTER : --instance=INSTANCE)
        (--disable | --enable) [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/bigtable/memory-layers (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
