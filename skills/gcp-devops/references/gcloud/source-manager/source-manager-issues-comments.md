---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/source-manager/issues/comments
---

# gcloud source-manager issues comments

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta source-manager issues comments create

```text
NAME
    gcloud beta source-manager issues comments create - create a Secure Source
        Manager issue comment

SYNOPSIS
    gcloud beta source-manager issues comments create --body=BODY
        (--issue=ISSUE : --region=REGION --repository=REPOSITORY) [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager issues comments delete

```text
NAME
    gcloud beta source-manager issues comments delete - delete a Secure Source
        Manager issue comment

SYNOPSIS
    gcloud beta source-manager issues comments delete
        (ISSUE_COMMENT : --issue=ISSUE --region=REGION --repository=REPOSITORY)
        [--async] [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager issues comments describe

```text
NAME
    gcloud beta source-manager issues comments describe - describe a Secure
        Source Manager issue comment

SYNOPSIS
    gcloud beta source-manager issues comments describe
        (ISSUE_COMMENT : --issue=ISSUE --region=REGION --repository=REPOSITORY)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager issues comments list

```text
NAME
    gcloud beta source-manager issues comments list - list Secure Source
        Manager comments under an issue

SYNOPSIS
    gcloud beta source-manager issues comments list
        (--issue=ISSUE : --region=REGION --repository=REPOSITORY)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager issues comments update

```text
NAME
    gcloud beta source-manager issues comments update - update a Secure Source
        Manager issue comment

SYNOPSIS
    gcloud beta source-manager issues comments update
        (ISSUE_COMMENT : --issue=ISSUE --region=REGION --repository=REPOSITORY)
        --body=BODY [--async] [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager issues comments create

```text
NAME
    gcloud alpha source-manager issues comments create - create a Secure Source
        Manager issue comment

SYNOPSIS
    gcloud alpha source-manager issues comments create --body=BODY
        (--issue=ISSUE : --region=REGION --repository=REPOSITORY) [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager issues comments delete

```text
NAME
    gcloud alpha source-manager issues comments delete - delete a Secure Source
        Manager issue comment

SYNOPSIS
    gcloud alpha source-manager issues comments delete
        (ISSUE_COMMENT : --issue=ISSUE --region=REGION --repository=REPOSITORY)
        [--async] [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager issues comments describe

```text
NAME
    gcloud alpha source-manager issues comments describe - describe a Secure
        Source Manager issue comment

SYNOPSIS
    gcloud alpha source-manager issues comments describe
        (ISSUE_COMMENT : --issue=ISSUE --region=REGION --repository=REPOSITORY)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager issues comments list

```text
NAME
    gcloud alpha source-manager issues comments list - list Secure Source
        Manager comments under an issue

SYNOPSIS
    gcloud alpha source-manager issues comments list
        (--issue=ISSUE : --region=REGION --repository=REPOSITORY)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager issues comments update

```text
NAME
    gcloud alpha source-manager issues comments update - update a Secure Source
        Manager issue comment

SYNOPSIS
    gcloud alpha source-manager issues comments update
        (ISSUE_COMMENT : --issue=ISSUE --region=REGION --repository=REPOSITORY)
        --body=BODY [--async] [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/source-manager/issues/comments (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
