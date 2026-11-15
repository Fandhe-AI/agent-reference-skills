---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/tasks/lease
---

# gcloud tasks lease

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha tasks lease

```text
NAME
    gcloud alpha tasks lease - leases a list of tasks and displays them

SYNOPSIS
    gcloud alpha tasks lease --lease-duration=LEASE_DURATION --queue=QUEUE
        [--location=LOCATION] [--oldest-tag | --tag=TAG] [--filter=EXPRESSION]
        [--limit=LIMIT; default=1000] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/tasks/lease (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
