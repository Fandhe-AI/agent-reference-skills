---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/source-manager/hooks
---

# gcloud source-manager hooks

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta source-manager hooks create

```text
NAME
    gcloud beta source-manager hooks create - create a Secure Source Manager
        hook

SYNOPSIS
    gcloud beta source-manager hooks create
        (HOOK : --region=REGION --repository=REPOSITORY)
        --target-uri=TARGET_URI [--async] [--disabled]
        [--endpoint-mode=ENDPOINT_MODE] [--events=[EVENT,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager hooks delete

```text
NAME
    gcloud beta source-manager hooks delete - delete a Secure Source Manager
        hook

SYNOPSIS
    gcloud beta source-manager hooks delete
        (HOOK : --region=REGION --repository=REPOSITORY) [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager hooks describe

```text
NAME
    gcloud beta source-manager hooks describe - describe a Secure Source
        Manager hook

SYNOPSIS
    gcloud beta source-manager hooks describe
        (HOOK : --region=REGION --repository=REPOSITORY)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager hooks list

```text
NAME
    gcloud beta source-manager hooks list - list Secure Source Manager hooks
        under a repository

SYNOPSIS
    gcloud beta source-manager hooks list
        (--repository=REPOSITORY : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager hooks update

```text
NAME
    gcloud beta source-manager hooks update - update a Secure Source Manager
        hook

SYNOPSIS
    gcloud beta source-manager hooks update
        (HOOK : --region=REGION --repository=REPOSITORY) [--async]
        [--[no-]disabled] [--endpoint-mode=ENDPOINT_MODE]
        [--events=[EVENT,...]] [--target-uri=TARGET_URI] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager hooks create

```text
NAME
    gcloud alpha source-manager hooks create - create a Secure Source Manager
        hook

SYNOPSIS
    gcloud alpha source-manager hooks create
        (HOOK : --region=REGION --repository=REPOSITORY)
        --target-uri=TARGET_URI [--async] [--disabled]
        [--endpoint-mode=ENDPOINT_MODE] [--events=[EVENT,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager hooks delete

```text
NAME
    gcloud alpha source-manager hooks delete - delete a Secure Source Manager
        hook

SYNOPSIS
    gcloud alpha source-manager hooks delete
        (HOOK : --region=REGION --repository=REPOSITORY) [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager hooks describe

```text
NAME
    gcloud alpha source-manager hooks describe - describe a Secure Source
        Manager hook

SYNOPSIS
    gcloud alpha source-manager hooks describe
        (HOOK : --region=REGION --repository=REPOSITORY)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager hooks list

```text
NAME
    gcloud alpha source-manager hooks list - list Secure Source Manager hooks
        under a repository

SYNOPSIS
    gcloud alpha source-manager hooks list
        (--repository=REPOSITORY : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager hooks update

```text
NAME
    gcloud alpha source-manager hooks update - update a Secure Source Manager
        hook

SYNOPSIS
    gcloud alpha source-manager hooks update
        (HOOK : --region=REGION --repository=REPOSITORY) [--async]
        [--[no-]disabled] [--endpoint-mode=ENDPOINT_MODE]
        [--events=[EVENT,...]] [--target-uri=TARGET_URI] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/source-manager/hooks (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
