---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/compute/migration/disk-migrations
---

# gcloud compute migration disk-migrations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha compute migration disk-migrations cancel

```text
NAME
    gcloud alpha compute migration disk-migrations cancel - cancel a disk
        migration resource process

SYNOPSIS
    gcloud alpha compute migration disk-migrations cancel
        (DISK_MIGRATION : --location=LOCATION --source=SOURCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute migration disk-migrations create

```text
NAME
    gcloud alpha compute migration disk-migrations create - create a disk
        migration resource to migrate a disk to Compute Engine

SYNOPSIS
    gcloud alpha compute migration disk-migrations create
        (DISK_MIGRATION : --location=LOCATION --source=SOURCE)
        --source-volume-id=SOURCE_VOLUME_ID [--disk-id=DISK_ID]
        [--disk-type=DISK_TYPE] [--kms-key=KMS_KEY] [--labels=[KEY=VALUE,...]]
        [--target-project=TARGET_PROJECT] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute migration disk-migrations delete

```text
NAME
    gcloud alpha compute migration disk-migrations delete - delete a disk
        migration resource

SYNOPSIS
    gcloud alpha compute migration disk-migrations delete
        (DISK_MIGRATION : --location=LOCATION --source=SOURCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute migration disk-migrations describe

```text
NAME
    gcloud alpha compute migration disk-migrations describe - describe a disk
        migration resource

SYNOPSIS
    gcloud alpha compute migration disk-migrations describe
        (DISK_MIGRATION : --location=LOCATION --source=SOURCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute migration disk-migrations fetch-inventory

```text
NAME
    gcloud alpha compute migration disk-migrations fetch-inventory - lists
        source environment volume inventory

SYNOPSIS
    gcloud alpha compute migration disk-migrations fetch-inventory
        (SOURCE : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute migration disk-migrations list

```text
NAME
    gcloud alpha compute migration disk-migrations list - list disk migration
        resources

SYNOPSIS
    gcloud alpha compute migration disk-migrations list
        (--source=SOURCE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute migration disk-migrations run

```text
NAME
    gcloud alpha compute migration disk-migrations run - run a disk migration
        resource process

SYNOPSIS
    gcloud alpha compute migration disk-migrations run
        (DISK_MIGRATION : --location=LOCATION --source=SOURCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute migration disk-migrations update

```text
NAME
    gcloud alpha compute migration disk-migrations update - update a disk
        migration resource target details

SYNOPSIS
    gcloud alpha compute migration disk-migrations update
        (DISK_MIGRATION : --location=LOCATION --source=SOURCE)
        [--disk-id=DISK_ID] [--disk-type=DISK_TYPE] [--kms-key=KMS_KEY]
        [--labels=[KEY=VALUE,...]] [--target-project=TARGET_PROJECT]
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/compute/migration/disk-migrations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
