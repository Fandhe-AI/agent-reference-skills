---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/org-rollouts
---

# gcloud compute org-rollouts

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta compute org-rollouts cancel

```text
NAME
    gcloud beta compute org-rollouts cancel - cancel an organization rollout

SYNOPSIS
    gcloud beta compute org-rollouts cancel
        (NAME : --organization=ORGANIZATION) [--rollback]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute org-rollouts delete

```text
NAME
    gcloud beta compute org-rollouts delete - delete an organization rollout

SYNOPSIS
    gcloud beta compute org-rollouts delete
        (NAME : --organization=ORGANIZATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute org-rollouts describe

```text
NAME
    gcloud beta compute org-rollouts describe - describe an organization
        rollout

SYNOPSIS
    gcloud beta compute org-rollouts describe
        (NAME : --organization=ORGANIZATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute org-rollouts list

```text
NAME
    gcloud beta compute org-rollouts list - list Google Compute Engine
        Organization Rollouts

SYNOPSIS
    gcloud beta compute org-rollouts list --organization=ORGANIZATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-rollouts advance

```text
NAME
    gcloud alpha compute org-rollouts advance - advance an organization rollout

SYNOPSIS
    gcloud alpha compute org-rollouts advance
        (NAME : --organization=ORGANIZATION)
        --current-wave-number=CURRENT_WAVE_NUMBER [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-rollouts cancel

```text
NAME
    gcloud alpha compute org-rollouts cancel - cancel an organization rollout

SYNOPSIS
    gcloud alpha compute org-rollouts cancel
        (NAME : --organization=ORGANIZATION) [--rollback]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-rollouts delete

```text
NAME
    gcloud alpha compute org-rollouts delete - delete an organization rollout

SYNOPSIS
    gcloud alpha compute org-rollouts delete
        (NAME : --organization=ORGANIZATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-rollouts describe

```text
NAME
    gcloud alpha compute org-rollouts describe - describe an organization
        rollout

SYNOPSIS
    gcloud alpha compute org-rollouts describe
        (NAME : --organization=ORGANIZATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-rollouts list

```text
NAME
    gcloud alpha compute org-rollouts list - list Google Compute Engine
        Organization Rollouts

SYNOPSIS
    gcloud alpha compute org-rollouts list --organization=ORGANIZATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/org-rollouts (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
