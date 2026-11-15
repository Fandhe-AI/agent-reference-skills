---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/storage/ftp
---

# gcloud storage ftp

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha storage ftp servers create

```text
NAME
    gcloud alpha storage ftp servers create - create a new Cloud FTP server

SYNOPSIS
    gcloud alpha storage ftp servers create SERVER_ID --access-type=ACCESS_TYPE
        --location=LOCATION [--allowed-cidr-blocks=[CIDR_BLOCK,...]]
        [--consumer-accept-list=[PROJECT_ID=LIMIT,...]]
        [--consumer-reject-list=[PROJECT_ID,...]] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage ftp servers delete

```text
NAME
    gcloud alpha storage ftp servers delete - delete a Cloud FTP server

SYNOPSIS
    gcloud alpha storage ftp servers delete SERVER_ID --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage ftp servers describe

```text
NAME
    gcloud alpha storage ftp servers describe - describe an existing Cloud FTP
        server

SYNOPSIS
    gcloud alpha storage ftp servers describe SERVER_ID --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage ftp servers list

```text
NAME
    gcloud alpha storage ftp servers list - list Cloud FTP servers

SYNOPSIS
    gcloud alpha storage ftp servers list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage ftp servers start

```text
NAME
    gcloud alpha storage ftp servers start - start a Cloud FTP server

SYNOPSIS
    gcloud alpha storage ftp servers start SERVER_ID --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage ftp servers stop

```text
NAME
    gcloud alpha storage ftp servers stop - stop a Cloud FTP server

SYNOPSIS
    gcloud alpha storage ftp servers stop SERVER_ID --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage ftp servers update

```text
NAME
    gcloud alpha storage ftp servers update - update an existing Cloud FTP
        server

SYNOPSIS
    gcloud alpha storage ftp servers update SERVER_ID --location=LOCATION
        [--allowed-cidr-blocks=[CIDR_BLOCK,...]]
        [--consumer-accept-list=[PROJECT_ID=LIMIT,...]]
        [--consumer-reject-list=[PROJECT_ID,...]] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage ftp users create

```text
NAME
    gcloud alpha storage ftp users create - create a new Cloud FTP user

SYNOPSIS
    gcloud alpha storage ftp users create USER_ID
        --customer-service-account=CUSTOMER_SERVICE_ACCOUNT --location=LOCATION
        --server=SERVER --storage-directory-mapping=[PROPERTY=VALUE,...]
        [--user-credentials-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage ftp users delete

```text
NAME
    gcloud alpha storage ftp users delete - delete a Cloud FTP user

SYNOPSIS
    gcloud alpha storage ftp users delete USER_ID --location=LOCATION
        --server=SERVER [--force] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage ftp users describe

```text
NAME
    gcloud alpha storage ftp users describe - describe an existing Cloud FTP
        user

SYNOPSIS
    gcloud alpha storage ftp users describe USER_ID --location=LOCATION
        --server=SERVER [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage ftp users list

```text
NAME
    gcloud alpha storage ftp users list - list Cloud FTP users

SYNOPSIS
    gcloud alpha storage ftp users list --location=LOCATION --server=SERVER
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage ftp users update

```text
NAME
    gcloud alpha storage ftp users update - update an existing Cloud FTP user

SYNOPSIS
    gcloud alpha storage ftp users update USER_ID --location=LOCATION
        --server=SERVER [--customer-service-account=CUSTOMER_SERVICE_ACCOUNT]
        [--storage-directory-mapping=[PROPERTY=VALUE,...]]
        [--user-credentials-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/storage/ftp (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
