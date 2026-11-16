---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/compute/folder-rollout-plans
---

# gcloud compute folder-rollout-plans

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha compute folder-rollout-plans create

```text
NAME
    gcloud alpha compute folder-rollout-plans create - create a folder rollout
        plan

SYNOPSIS
    gcloud alpha compute folder-rollout-plans create (NAME : --folder=FOLDER)
        --waves-from-file=WAVES_FROM_FILE [--description=DESCRIPTION]
        [--location-scope=LOCATION_SCOPE; default="ZONAL"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute folder-rollout-plans delete

```text
NAME
    gcloud alpha compute folder-rollout-plans delete - delete a folder rollout
        plan

SYNOPSIS
    gcloud alpha compute folder-rollout-plans delete (NAME : --folder=FOLDER)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute folder-rollout-plans describe

```text
NAME
    gcloud alpha compute folder-rollout-plans describe - describe a folder
        rollout plan

SYNOPSIS
    gcloud alpha compute folder-rollout-plans describe (NAME : --folder=FOLDER)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute folder-rollout-plans list

```text
NAME
    gcloud alpha compute folder-rollout-plans list - list Google Compute Engine
        Folder Rollout Plans

SYNOPSIS
    gcloud alpha compute folder-rollout-plans list --folder=FOLDER
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/compute/folder-rollout-plans (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
