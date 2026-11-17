---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/number-registry/org-number-registries
---

# gcloud number-registry org-number-registries

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha number-registry org-number-registries create

```text
NAME
    gcloud alpha number-registry org-number-registries create - create an org
        number registry resource

SYNOPSIS
    gcloud alpha number-registry org-number-registries create
        (ORG_NUMBER_REGISTRY : --location=LOCATION --organization=ORGANIZATION)
        --admin-project=ADMIN_PROJECT --target-scopes=[TARGET_SCOPES,...]
        [--async] [--labels=[LABELS,...]] [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry org-number-registries delete

```text
NAME
    gcloud alpha number-registry org-number-registries delete - delete a single
        org number registry resource

SYNOPSIS
    gcloud alpha number-registry org-number-registries delete
        (ORG_NUMBER_REGISTRY : --location=LOCATION --organization=ORGANIZATION)
        [--async] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry org-number-registries describe

```text
NAME
    gcloud alpha number-registry org-number-registries describe - gets details
        of a single org number registry resource

SYNOPSIS
    gcloud alpha number-registry org-number-registries describe
        (ORG_NUMBER_REGISTRY : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry org-number-registries list

```text
NAME
    gcloud alpha number-registry org-number-registries list - list org number
        registry resources

SYNOPSIS
    gcloud alpha number-registry org-number-registries list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/number-registry/org-number-registries (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
