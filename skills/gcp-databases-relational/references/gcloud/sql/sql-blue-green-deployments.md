---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/sql/blue-green-deployments
---

# gcloud sql blue-green-deployments

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta sql blue-green-deployments create

```text
NAME
    gcloud beta sql blue-green-deployments create - creates a Cloud SQL
        blue-green deployment

SYNOPSIS
    gcloud beta sql blue-green-deployments create DEPLOYMENT
        --source-instance=SOURCE_INSTANCE [--async] [--description=DESCRIPTION]
        [--region=REGION] [--target-database-version=TARGET_DATABASE_VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql blue-green-deployments delete

```text
NAME
    gcloud beta sql blue-green-deployments delete - deletes a Cloud SQL
        blue-green deployment

SYNOPSIS
    gcloud beta sql blue-green-deployments delete DEPLOYMENT [--async]
        [--delete-old-source] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql blue-green-deployments describe

```text
NAME
    gcloud beta sql blue-green-deployments describe - retrieves information
        about a Cloud SQL blue-green deployment

SYNOPSIS
    gcloud beta sql blue-green-deployments describe DEPLOYMENT
        [--region=REGION] [--show-config-diff] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql blue-green-deployments list

```text
NAME
    gcloud beta sql blue-green-deployments list - lists Cloud SQL blue-green
        deployments

SYNOPSIS
    gcloud beta sql blue-green-deployments list [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql blue-green-deployments switchover

```text
NAME
    gcloud beta sql blue-green-deployments switchover - performs switchover for
        a Cloud SQL blue-green deployment

SYNOPSIS
    gcloud beta sql blue-green-deployments switchover DEPLOYMENT [--async]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql blue-green-deployments create

```text
NAME
    gcloud alpha sql blue-green-deployments create - creates a Cloud SQL
        blue-green deployment

SYNOPSIS
    gcloud alpha sql blue-green-deployments create DEPLOYMENT
        --source-instance=SOURCE_INSTANCE [--async] [--description=DESCRIPTION]
        [--region=REGION] [--target-database-version=TARGET_DATABASE_VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql blue-green-deployments delete

```text
NAME
    gcloud alpha sql blue-green-deployments delete - deletes a Cloud SQL
        blue-green deployment

SYNOPSIS
    gcloud alpha sql blue-green-deployments delete DEPLOYMENT [--async]
        [--delete-old-source] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql blue-green-deployments describe

```text
NAME
    gcloud alpha sql blue-green-deployments describe - retrieves information
        about a Cloud SQL blue-green deployment

SYNOPSIS
    gcloud alpha sql blue-green-deployments describe DEPLOYMENT
        [--region=REGION] [--show-config-diff] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql blue-green-deployments list

```text
NAME
    gcloud alpha sql blue-green-deployments list - lists Cloud SQL blue-green
        deployments

SYNOPSIS
    gcloud alpha sql blue-green-deployments list [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql blue-green-deployments switchover

```text
NAME
    gcloud alpha sql blue-green-deployments switchover - performs switchover
        for a Cloud SQL blue-green deployment

SYNOPSIS
    gcloud alpha sql blue-green-deployments switchover DEPLOYMENT [--async]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/sql/blue-green-deployments (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
