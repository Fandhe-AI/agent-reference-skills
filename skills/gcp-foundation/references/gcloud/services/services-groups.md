---
source: https://docs.cloud.google.com/sdk/gcloud/reference/services/groups
---

# gcloud services groups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta services groups list-expanded-members

```text
NAME
    gcloud beta services groups list-expanded-members - list expanded members
        of a specific service and group

SYNOPSIS
    gcloud beta services groups list-expanded-members SERVICE GROUP
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE; default=50] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services groups list-members

```text
NAME
    gcloud beta services groups list-members - list members of a specific
        service group

SYNOPSIS
    gcloud beta services groups list-members SERVICE GROUP
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE; default=50] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services groups list-expanded-members

```text
NAME
    gcloud alpha services groups list-expanded-members - list expanded members
        of a specific service and group

SYNOPSIS
    gcloud alpha services groups list-expanded-members SERVICE GROUP
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE; default=50] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services groups list-members

```text
NAME
    gcloud alpha services groups list-members - list members of a specific
        service group

SYNOPSIS
    gcloud alpha services groups list-members SERVICE GROUP
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE; default=50] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/services/groups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
