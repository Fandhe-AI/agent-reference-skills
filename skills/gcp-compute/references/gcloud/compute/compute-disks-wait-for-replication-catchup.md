---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/compute/disks/wait-for-replication-catchup
---

# gcloud compute disks wait-for-replication-catchup

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha compute disks wait-for-replication-catchup

```text
NAME
    gcloud alpha compute disks wait-for-replication-catchup - provides the
        operation id for the asynchronous replication of a Compute Engine
        persistent disk-pair that can be used to wait for the replication to
        catch up

SYNOPSIS
    gcloud alpha compute disks wait-for-replication-catchup DISK_NAME
        [--max-wait-duration=MAX_WAIT_DURATION] [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/compute/disks/wait-for-replication-catchup (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
