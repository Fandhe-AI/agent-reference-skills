---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/compute/snapshot-groups
---

# gcloud compute snapshot-groups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha compute snapshot-groups create

```text
NAME
    gcloud alpha compute snapshot-groups create - create a Compute Engine
        snapshot group

SYNOPSIS
    gcloud alpha compute snapshot-groups create NAME
        --source-instant-snapshot-group=SOURCE_INSTANT_SNAPSHOT_GROUP [--async]
        [--source-instant-snapshot-group-region=SOURCE_INSTANT_SNAPSHOT_GROUP_REGION | --source-instant-snapshot-group-zone=SOURCE_INSTANT_SNAPSHOT_GROUP_ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshot-groups delete

```text
NAME
    gcloud alpha compute snapshot-groups delete - delete Compute Engine
        snapshot groups

SYNOPSIS
    gcloud alpha compute snapshot-groups delete SNAPSHOT_GROUP_NAME
        [SNAPSHOT_GROUP_NAME ...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshot-groups describe

```text
NAME
    gcloud alpha compute snapshot-groups describe - describe a Compute Engine
        snapshot group

SYNOPSIS
    gcloud alpha compute snapshot-groups describe SNAPSHOT_GROUP_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshot-groups list

```text
NAME
    gcloud alpha compute snapshot-groups list - list Google Compute Engine
        snapshot groups

SYNOPSIS
    gcloud alpha compute snapshot-groups list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshot-groups set-iam-policy

```text
NAME
    gcloud alpha compute snapshot-groups set-iam-policy - set the IAM policy
        for a Compute Engine snapshot group

SYNOPSIS
    gcloud alpha compute snapshot-groups set-iam-policy SNAPSHOT_GROUP_NAME
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshot-groups test-iam-permissions

```text
NAME
    gcloud alpha compute snapshot-groups test-iam-permissions - test IAM
        permissions for a Compute Engine snapshot group

SYNOPSIS
    gcloud alpha compute snapshot-groups test-iam-permissions
        SNAPSHOT_GROUP_NAME --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/compute/snapshot-groups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
