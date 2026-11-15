---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/resource-manager/liens
---

# gcloud resource-manager liens

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha resource-manager liens config export

```text
NAME
    gcloud alpha resource-manager liens config export - export the
        configuration for a Cloud Resource Manager lien

SYNOPSIS
    gcloud alpha resource-manager liens config export ([LIEN]] --all)
        [--path=PATH; default="-"] [--resource-format=RESOURCE_FORMAT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager liens create

```text
NAME
    gcloud alpha resource-manager liens create - create a new lien

SYNOPSIS
    gcloud alpha resource-manager liens create --reason=REASON
        --restrictions=RESTRICTIONS [--origin=ORIGIN] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager liens delete

```text
NAME
    gcloud alpha resource-manager liens delete - delete a lien

SYNOPSIS
    gcloud alpha resource-manager liens delete LIEN_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager liens list

```text
NAME
    gcloud alpha resource-manager liens list - list liens associated with the
        specified project

SYNOPSIS
    gcloud alpha resource-manager liens list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/resource-manager/liens (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
