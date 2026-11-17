---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/snapshot-recycle-bin-policy
---

# gcloud compute snapshot-recycle-bin-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta compute snapshot-recycle-bin-policy describe

```text
NAME
    gcloud beta compute snapshot-recycle-bin-policy describe - describe the
        project's or organization's snapshot recycle bin policy

SYNOPSIS
    gcloud beta compute snapshot-recycle-bin-policy describe
        [--organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute snapshot-recycle-bin-policy update

```text
NAME
    gcloud beta compute snapshot-recycle-bin-policy update - update the
        project's or organization's snapshot recycle bin policy

SYNOPSIS
    gcloud beta compute snapshot-recycle-bin-policy update
        (--remove-rule=RULE_KEY
          | [--standard-snapshots-retention-duration-days=STANDARD_SNAPSHOTS_RETENTION_DURATION_DAYS : --set-rule=RULE_KEY])
        [--organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshot-recycle-bin-policy describe

```text
NAME
    gcloud alpha compute snapshot-recycle-bin-policy describe - describe the
        project's or organization's snapshot recycle bin policy

SYNOPSIS
    gcloud alpha compute snapshot-recycle-bin-policy describe
        [--organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshot-recycle-bin-policy update

```text
NAME
    gcloud alpha compute snapshot-recycle-bin-policy update - update the
        project's or organization's snapshot recycle bin policy

SYNOPSIS
    gcloud alpha compute snapshot-recycle-bin-policy update
        (--remove-rule=RULE_KEY
          | [--standard-snapshots-retention-duration-days=STANDARD_SNAPSHOTS_RETENTION_DURATION_DAYS : --set-rule=RULE_KEY])
        [--organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/snapshot-recycle-bin-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
