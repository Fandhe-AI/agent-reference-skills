---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/zone-management/service-accounts
---

# gcloud zone-management service-accounts

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha zone-management service-accounts create

```text
NAME
    gcloud alpha zone-management service-accounts create - create service
        account

SYNOPSIS
    gcloud alpha zone-management service-accounts create
        (SERVICE_ACCOUNT : --location=LOCATION) --zone=ZONE [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha zone-management service-accounts delete

```text
NAME
    gcloud alpha zone-management service-accounts delete - delete service
        account

SYNOPSIS
    gcloud alpha zone-management service-accounts delete
        (SERVICE_ACCOUNT : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha zone-management service-accounts describe

```text
NAME
    gcloud alpha zone-management service-accounts describe - describe service
        account

SYNOPSIS
    gcloud alpha zone-management service-accounts describe
        (SERVICE_ACCOUNT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha zone-management service-accounts keys create

```text
NAME
    gcloud alpha zone-management service-accounts keys create - creates service
        account key

SYNOPSIS
    gcloud alpha zone-management service-accounts keys create OUTPUT_FILE
        (--service-account=SERVICE_ACCOUNT : --location=LOCATION)
        [--ca-cert-path=CA_CERT_PATH] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha zone-management service-accounts list

```text
NAME
    gcloud alpha zone-management service-accounts list - list service accounts

SYNOPSIS
    gcloud alpha zone-management service-accounts list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/zone-management/service-accounts (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
