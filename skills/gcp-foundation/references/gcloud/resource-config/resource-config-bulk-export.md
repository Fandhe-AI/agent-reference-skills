---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/resource-config/bulk-export
---

# gcloud resource-config bulk-export

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta resource-config bulk-export

```text
NAME
    gcloud beta resource-config bulk-export - export configurations for all
        assets within the specified project, organization, or folder

SYNOPSIS
    gcloud beta resource-config bulk-export
        [--on-error=ON_ERROR; default="ignore"] [--path=PATH; default="-"]
        [--resource-format=RESOURCE_FORMAT]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--storage-path=STORAGE_PATH | --resource-types=[RESOURCE_TYPE,...]
          | --resource-types-file=RESOURCE_TYPE_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-config bulk-export

```text
NAME
    gcloud alpha resource-config bulk-export - export configurations for all
        assets within the specified project, organization, or folder

SYNOPSIS
    gcloud alpha resource-config bulk-export
        [--on-error=ON_ERROR; default="ignore"] [--path=PATH; default="-"]
        [--resource-format=RESOURCE_FORMAT]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [--storage-path=STORAGE_PATH | --resource-types=[RESOURCE_TYPE,...]
          | --resource-types-file=RESOURCE_TYPE_FILE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/resource-config/bulk-export (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
