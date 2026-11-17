---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/zone-management/zones
---

# gcloud zone-management zones

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha zone-management zones describe

```text
NAME
    gcloud alpha zone-management zones describe - describe zone

SYNOPSIS
    gcloud alpha zone-management zones describe
        (ZONE : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha zone-management zones get-iam-policy

```text
NAME
    gcloud alpha zone-management zones get-iam-policy - get IAM policy for a
        project on the zone

SYNOPSIS
    gcloud alpha zone-management zones get-iam-policy
        (ZONE : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha zone-management zones list

```text
NAME
    gcloud alpha zone-management zones list - list zones

SYNOPSIS
    gcloud alpha zone-management zones list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha zone-management zones set-iam-policy

```text
NAME
    gcloud alpha zone-management zones set-iam-policy - set IAM policy for a
        project on the zone

SYNOPSIS
    gcloud alpha zone-management zones set-iam-policy POLICY_FILE
        (--zone=ZONE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/zone-management/zones (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
