---
source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/storage-pools
---

# gcloud netapp storage-pools (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha netapp storage-pools update

```text
NAME
    gcloud alpha netapp storage-pools update - update a Cloud NetApp Storage
        Pool

SYNOPSIS
    gcloud alpha netapp storage-pools update
        (STORAGE_POOL : --location=LOCATION)
        [--active-directory=ACTIVE_DIRECTORY]
        [--allow-auto-tiering=ALLOW_AUTO_TIERING] [--async]
        [--capacity=CAPACITY] [--description=DESCRIPTION]
        [--enable-hot-tier-auto-resize=ENABLE_HOT_TIER_AUTO_RESIZE]
        [--hot-tier-size=HOT_TIER_SIZE] [--qos-type=QOS_TYPE]
        [--replica-zone=REPLICA_ZONE] [--total-iops=TOTAL_IOPS]
        [--total-throughput=TOTAL_THROUGHPUT] [--update-labels=[KEY=VALUE,...]]
        [--zone=ZONE] [--clear-labels | --remove-labels=[KEY,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp storage-pools update-backup-config

```text
NAME
    gcloud alpha netapp storage-pools update-backup-config - update backup
        config of a volume in an ONTAP-mode Storage Pool

SYNOPSIS
    gcloud alpha netapp storage-pools update-backup-config
        (STORAGE_POOL : --location=LOCATION)
        --backup-config=[backup-policies=BACKUP-POLICIES],
          [backup-vault=BACKUP-VAULT],
          [enable-scheduled-backups=ENABLE-SCHEDULED-BACKUPS]
        --volume-uuid=VOLUME_UUID [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/storage-pools (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
