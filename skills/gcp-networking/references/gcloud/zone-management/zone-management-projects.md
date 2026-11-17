---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/zone-management/projects
---

# gcloud zone-management projects

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha zone-management projects describe

```text
NAME
    gcloud alpha zone-management projects describe - describe zonal project

SYNOPSIS
    gcloud alpha zone-management projects describe
        (ZONAL_PROJECT
          : --location=LOCATION --organization=ORGANIZATION --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha zone-management projects enable

```text
NAME
    gcloud alpha zone-management projects enable - enable zonal project

SYNOPSIS
    gcloud alpha zone-management projects enable ZONAL_PROJECT [--async]
        [--location=LOCATION] [--organization=ORGANIZATION] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha zone-management projects list

```text
NAME
    gcloud alpha zone-management projects list - list Zonal Projects

SYNOPSIS
    gcloud alpha zone-management projects list
        (--zone=ZONE : --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/zone-management/projects (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
