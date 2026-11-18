---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/logging/tail
---

# gcloud logging tail

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta logging tail

```text
NAME
    gcloud beta logging tail - tail log entries

SYNOPSIS
    gcloud beta logging tail [LOG_FILTER] [--buffer-window=BUFFER_WINDOW]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--bucket=BUCKET --location=LOCATION --view=VIEW]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging tail

```text
NAME
    gcloud alpha logging tail - tail log entries

SYNOPSIS
    gcloud alpha logging tail [LOG_FILTER] [--buffer-window=BUFFER_WINDOW]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--bucket=BUCKET --location=LOCATION --view=VIEW]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/logging/tail (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
