---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/source-manager/branch-rules
---

# gcloud source-manager branch-rules

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta source-manager branch-rules create

```text
NAME
    gcloud beta source-manager branch-rules create - create a Secure Source
        Manager branch rule

SYNOPSIS
    gcloud beta source-manager branch-rules create
        (BRANCH_RULE : --region=REGION --repository=REPOSITORY)
        --include-pattern=INCLUDE_PATTERN [--allow-stale-reviews] [--async]
        [--disabled] [--endpoint-mode=ENDPOINT_MODE]
        [--minimum-approvals-count=MINIMUM_APPROVALS_COUNT]
        [--minimum-reviews-count=MINIMUM_REVIEWS_COUNT]
        [--require-code-owner-approval] [--require-comments-resolved]
        [--require-linear-history] [--require-pull-request]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager branch-rules delete

```text
NAME
    gcloud beta source-manager branch-rules delete - delete a Secure Source
        Manager branch rule

SYNOPSIS
    gcloud beta source-manager branch-rules delete
        (BRANCH_RULE : --region=REGION --repository=REPOSITORY) [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager branch-rules describe

```text
NAME
    gcloud beta source-manager branch-rules describe - describe a Secure Source
        Manager branch rule

SYNOPSIS
    gcloud beta source-manager branch-rules describe
        (BRANCH_RULE : --region=REGION --repository=REPOSITORY)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager branch-rules list

```text
NAME
    gcloud beta source-manager branch-rules list - list Secure Source Manager
        branch rules

SYNOPSIS
    gcloud beta source-manager branch-rules list
        (--repository=REPOSITORY : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source-manager branch-rules update

```text
NAME
    gcloud beta source-manager branch-rules update - update a Secure Source
        Manager branch rule

SYNOPSIS
    gcloud beta source-manager branch-rules update
        (BRANCH_RULE : --region=REGION --repository=REPOSITORY)
        [--[no-]allow-stale-reviews] [--async] [--[no-]disabled]
        [--endpoint-mode=ENDPOINT_MODE] [--include-pattern=INCLUDE_PATTERN]
        [--minimum-approvals-count=MINIMUM_APPROVALS_COUNT]
        [--minimum-reviews-count=MINIMUM_REVIEWS_COUNT]
        [--[no-]require-code-owner-approval] [--[no-]require-comments-resolved]
        [--[no-]require-linear-history] [--[no-]require-pull-request]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager branch-rules create

```text
NAME
    gcloud alpha source-manager branch-rules create - create a Secure Source
        Manager branch rule

SYNOPSIS
    gcloud alpha source-manager branch-rules create
        (BRANCH_RULE : --region=REGION --repository=REPOSITORY)
        --include-pattern=INCLUDE_PATTERN [--allow-stale-reviews] [--async]
        [--disabled] [--endpoint-mode=ENDPOINT_MODE]
        [--minimum-approvals-count=MINIMUM_APPROVALS_COUNT]
        [--minimum-reviews-count=MINIMUM_REVIEWS_COUNT]
        [--require-code-owner-approval] [--require-comments-resolved]
        [--require-linear-history] [--require-pull-request]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager branch-rules delete

```text
NAME
    gcloud alpha source-manager branch-rules delete - delete a Secure Source
        Manager branch rule

SYNOPSIS
    gcloud alpha source-manager branch-rules delete
        (BRANCH_RULE : --region=REGION --repository=REPOSITORY) [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager branch-rules describe

```text
NAME
    gcloud alpha source-manager branch-rules describe - describe a Secure
        Source Manager branch rule

SYNOPSIS
    gcloud alpha source-manager branch-rules describe
        (BRANCH_RULE : --region=REGION --repository=REPOSITORY)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager branch-rules list

```text
NAME
    gcloud alpha source-manager branch-rules list - list Secure Source Manager
        branch rules

SYNOPSIS
    gcloud alpha source-manager branch-rules list
        (--repository=REPOSITORY : --region=REGION)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source-manager branch-rules update

```text
NAME
    gcloud alpha source-manager branch-rules update - update a Secure Source
        Manager branch rule

SYNOPSIS
    gcloud alpha source-manager branch-rules update
        (BRANCH_RULE : --region=REGION --repository=REPOSITORY)
        [--[no-]allow-stale-reviews] [--async] [--[no-]disabled]
        [--endpoint-mode=ENDPOINT_MODE] [--include-pattern=INCLUDE_PATTERN]
        [--minimum-approvals-count=MINIMUM_APPROVALS_COUNT]
        [--minimum-reviews-count=MINIMUM_REVIEWS_COUNT]
        [--[no-]require-code-owner-approval] [--[no-]require-comments-resolved]
        [--[no-]require-linear-history] [--[no-]require-pull-request]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/source-manager/branch-rules (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
