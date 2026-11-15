---
source: https://docs.cloud.google.com/sdk/gcloud/reference/config/list
---

# gcloud config list (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta config list

```text
NAME
    gcloud beta config list - list Google Cloud CLI properties for the
        currently active configuration

SYNOPSIS
    gcloud beta config list [SECTION/PROPERTY] [--all] [--filter=EXPRESSION]
        [--limit=LIMIT] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha config list

```text
NAME
    gcloud alpha config list - list Google Cloud CLI properties for the
        currently active configuration

SYNOPSIS
    gcloud alpha config list [SECTION/PROPERTY] [--all] [--filter=EXPRESSION]
        [--limit=LIMIT] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/config/list (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
