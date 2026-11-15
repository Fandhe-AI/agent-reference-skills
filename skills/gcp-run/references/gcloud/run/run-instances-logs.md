---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/run/instances/logs
---

# gcloud run instances logs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta run instances logs read

```text
NAME
    gcloud beta run instances logs read - read logs for a Cloud Run instance

SYNOPSIS
    gcloud beta run instances logs read INSTANCE
        [--freshness=FRESHNESS; default="1d"] [--log-filter=LOG_FILTER]
        [--order=ORDER; default="desc"] [--region=REGION] [--limit=LIMIT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run instances logs read

```text
NAME
    gcloud alpha run instances logs read - read logs for a Cloud Run instance

SYNOPSIS
    gcloud alpha run instances logs read INSTANCE
        [--freshness=FRESHNESS; default="1d"] [--log-filter=LOG_FILTER]
        [--order=ORDER; default="desc"] [--region=REGION] [--limit=LIMIT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run instances logs tail

```text
NAME
    gcloud alpha run instances logs tail - tail logs for a Cloud Run instance

SYNOPSIS
    gcloud alpha run instances logs tail INSTANCE [--container=CONTAINER]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/run/instances/logs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
