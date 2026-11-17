---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/org-rollout-plans
---

# gcloud compute org-rollout-plans

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta compute org-rollout-plans create

```text
NAME
    gcloud beta compute org-rollout-plans create - create an organization
        rollout plan

SYNOPSIS
    gcloud beta compute org-rollout-plans create
        (NAME : --organization=ORGANIZATION) --waves-from-file=WAVES_FROM_FILE
        [--description=DESCRIPTION]
        [--location-scope=LOCATION_SCOPE; default="ZONAL"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute org-rollout-plans delete

```text
NAME
    gcloud beta compute org-rollout-plans delete - delete an organization
        rollout plan

SYNOPSIS
    gcloud beta compute org-rollout-plans delete
        (NAME : --organization=ORGANIZATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute org-rollout-plans describe

```text
NAME
    gcloud beta compute org-rollout-plans describe - describe an organization
        rollout plan

SYNOPSIS
    gcloud beta compute org-rollout-plans describe
        (NAME : --organization=ORGANIZATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute org-rollout-plans list

```text
NAME
    gcloud beta compute org-rollout-plans list - list Google Compute Engine
        Organization Rollout Plans

SYNOPSIS
    gcloud beta compute org-rollout-plans list --organization=ORGANIZATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-rollout-plans create

```text
NAME
    gcloud alpha compute org-rollout-plans create - create an organization
        rollout plan

SYNOPSIS
    gcloud alpha compute org-rollout-plans create
        (NAME : --organization=ORGANIZATION) --waves-from-file=WAVES_FROM_FILE
        [--description=DESCRIPTION]
        [--location-scope=LOCATION_SCOPE; default="ZONAL"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-rollout-plans delete

```text
NAME
    gcloud alpha compute org-rollout-plans delete - delete an organization
        rollout plan

SYNOPSIS
    gcloud alpha compute org-rollout-plans delete
        (NAME : --organization=ORGANIZATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-rollout-plans describe

```text
NAME
    gcloud alpha compute org-rollout-plans describe - describe an organization
        rollout plan

SYNOPSIS
    gcloud alpha compute org-rollout-plans describe
        (NAME : --organization=ORGANIZATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-rollout-plans list

```text
NAME
    gcloud alpha compute org-rollout-plans list - list Google Compute Engine
        Organization Rollout Plans

SYNOPSIS
    gcloud alpha compute org-rollout-plans list --organization=ORGANIZATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/org-rollout-plans (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
