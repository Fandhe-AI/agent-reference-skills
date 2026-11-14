---
source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/domains/migration
---

# gcloud active-directory domains migration

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta active-directory domains migration check-permissions

```text
NAME
    gcloud beta active-directory domains migration check-permissions - check
        existing permissions on a Managed Microsoft AD domain for domain
        migration

SYNOPSIS
    gcloud beta active-directory domains migration check-permissions DOMAIN
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta active-directory domains migration disable

```text
NAME
    gcloud beta active-directory domains migration disable - disable domain
        migration permissions on a Managed Microsoft AD domain

SYNOPSIS
    gcloud beta active-directory domains migration disable DOMAIN [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta active-directory domains migration enable

```text
NAME
    gcloud beta active-directory domains migration enable - enable domain
        migration permissions on a Managed Microsoft AD domain

SYNOPSIS
    gcloud beta active-directory domains migration enable DOMAIN
        --onprem-domains=[ONPREM_DOMAINS,...] [--async]
        [--disable-sid-filtering-domains=[DISABLE_SID_FILTERING_DOMAINS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains migration check-permissions

```text
NAME
    gcloud alpha active-directory domains migration check-permissions - check
        existing permissions on a Managed Microsoft AD domain for domain
        migration

SYNOPSIS
    gcloud alpha active-directory domains migration check-permissions DOMAIN
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains migration disable

```text
NAME
    gcloud alpha active-directory domains migration disable - disable domain
        migration permissions on a Managed Microsoft AD domain

SYNOPSIS
    gcloud alpha active-directory domains migration disable DOMAIN [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains migration enable

```text
NAME
    gcloud alpha active-directory domains migration enable - enable domain
        migration permissions on a Managed Microsoft AD domain

SYNOPSIS
    gcloud alpha active-directory domains migration enable DOMAIN
        --onprem-domains=[ONPREM_DOMAINS,...] [--async]
        [--disable-sid-filtering-domains=[DISABLE_SID_FILTERING_DOMAINS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/domains/migration (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
