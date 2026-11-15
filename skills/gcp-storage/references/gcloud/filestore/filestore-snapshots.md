---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/filestore/snapshots
---

# gcloud filestore snapshots

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha filestore snapshots create

```text
NAME
    gcloud alpha filestore snapshots create - create a Filestore snapshot

SYNOPSIS
    gcloud alpha filestore snapshots create SNAPSHOT --file-share=FILE_SHARE
        --instance=INSTANCE --instance-zone=INSTANCE_ZONE [--async]
        [--labels=[KEY=VALUE,...]] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha filestore snapshots delete

```text
NAME
    gcloud alpha filestore snapshots delete - delete a Filestore snapshot

SYNOPSIS
    gcloud alpha filestore snapshots delete SNAPSHOT
        (--region=REGION | --zone=ZONE) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha filestore snapshots describe

```text
NAME
    gcloud alpha filestore snapshots describe - describe a Filestore snapshot

SYNOPSIS
    gcloud alpha filestore snapshots describe SNAPSHOT
        (--region=REGION | --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha filestore snapshots list

```text
NAME
    gcloud alpha filestore snapshots list - list Filestore snapshots

SYNOPSIS
    gcloud alpha filestore snapshots list [--region=REGION | --zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha filestore snapshots update

```text
NAME
    gcloud alpha filestore snapshots update - update a Filestore snapshot

SYNOPSIS
    gcloud alpha filestore snapshots update SNAPSHOT
        (--region=REGION | --zone=ZONE) [--async] [--description=DESCRIPTION]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/filestore/snapshots (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
