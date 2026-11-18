---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/web-security-scanner/scan-configs
---

# gcloud web-security-scanner scan-configs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha web-security-scanner scan-configs create

```text
NAME
    gcloud alpha web-security-scanner scan-configs create - create a Web
        Security Scanner ScanConfig

SYNOPSIS
    gcloud alpha web-security-scanner scan-configs create
        --display-name=DISPLAY_NAME --starting-urls=[STARTING_URLS,...]
        [--blacklist-patterns=[BLACKLIST_PATTERNS,...]]
        [--no-export-to-security-center] [--max-qps=MAX_QPS]
        [--risk-level=RISK_LEVEL; default="normal"]
        [--target-platforms=[TARGET_PLATFORMS,...];
          default="app_engine,compute"] [--user-agent=USER_AGENT]
        [--auth-password=AUTH_PASSWORD
          --auth-type=AUTH_TYPE --auth-url=AUTH_URL --auth-user=AUTH_USER]
        [--schedule-interval-days=SCHEDULE_INTERVAL_DAYS
          --schedule-next-start=SCHEDULE_NEXT_START] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha web-security-scanner scan-configs delete

```text
NAME
    gcloud alpha web-security-scanner scan-configs delete - delete a scan
        config

SYNOPSIS
    gcloud alpha web-security-scanner scan-configs delete SCAN_CONFIG
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha web-security-scanner scan-configs describe

```text
NAME
    gcloud alpha web-security-scanner scan-configs describe - describe a scan
        config

SYNOPSIS
    gcloud alpha web-security-scanner scan-configs describe SCAN_CONFIG
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha web-security-scanner scan-configs list

```text
NAME
    gcloud alpha web-security-scanner scan-configs list - list all scan configs

SYNOPSIS
    gcloud alpha web-security-scanner scan-configs list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha web-security-scanner scan-configs update

```text
NAME
    gcloud alpha web-security-scanner scan-configs update - update a Web
        Security Scanner ScanConfig

SYNOPSIS
    gcloud alpha web-security-scanner scan-configs update SCAN_CONFIG
        [--blacklist-patterns=[BLACKLIST_PATTERNS,...]]
        [--display-name=DISPLAY_NAME] [--no-export-to-security-center]
        [--max-qps=MAX_QPS] [--risk-level=RISK_LEVEL; default="normal"]
        [--schedule-interval-days=SCHEDULE_INTERVAL_DAYS]
        [--schedule-next-start=SCHEDULE_NEXT_START]
        [--starting-urls=[STARTING_URLS,...]]
        [--target-platforms=[TARGET_PLATFORMS,...];
          default="app_engine,compute"] [--user-agent=USER_AGENT]
        [--auth-password=AUTH_PASSWORD
          --auth-type=AUTH_TYPE --auth-url=AUTH_URL --auth-user=AUTH_USER]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/web-security-scanner/scan-configs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
