---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/software-delivery-trust/policies
---

# gcloud software-delivery-trust policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha software-delivery-trust policies create

```text
NAME
    gcloud alpha software-delivery-trust policies create - create a Software
        Delivery Trust policy

SYNOPSIS
    gcloud alpha software-delivery-trust policies create
        (POLICY : --location=LOCATION) [--async]
        [--cel-expression=CEL_EXPRESSION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust policies delete

```text
NAME
    gcloud alpha software-delivery-trust policies delete - delete a Software
        Delivery Trust policy

SYNOPSIS
    gcloud alpha software-delivery-trust policies delete
        (POLICY : --location=LOCATION) [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust policies describe

```text
NAME
    gcloud alpha software-delivery-trust policies describe - get details of a
        Software Delivery Trust policy

SYNOPSIS
    gcloud alpha software-delivery-trust policies describe
        (POLICY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust policies list

```text
NAME
    gcloud alpha software-delivery-trust policies list - list Software Delivery
        Trust policies

SYNOPSIS
    gcloud alpha software-delivery-trust policies list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust policies revisions describe

```text
NAME
    gcloud alpha software-delivery-trust policies revisions describe - get
        details of a specific policy revision

SYNOPSIS
    gcloud alpha software-delivery-trust policies revisions describe
        (REVISION : --location=LOCATION --policy=POLICY) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust policies revisions list

```text
NAME
    gcloud alpha software-delivery-trust policies revisions list - list
        revisions of a Software Delivery Trust policy

SYNOPSIS
    gcloud alpha software-delivery-trust policies revisions list
        (--policy=POLICY : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust policies update

```text
NAME
    gcloud alpha software-delivery-trust policies update - update a Software
        Delivery Trust policy

SYNOPSIS
    gcloud alpha software-delivery-trust policies update
        (POLICY : --location=LOCATION) [--async]
        [--cel-expression=CEL_EXPRESSION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust policies verify

```text
NAME
    gcloud alpha software-delivery-trust policies verify - verify policies
        against a target resource and software artifact

SYNOPSIS
    gcloud alpha software-delivery-trust policies verify --location=LOCATION
        --subject-digest=SUBJECT_DIGEST --subject-url=SUBJECT_URL
        --target-resource=TARGET_RESOURCE [--custom-gate=CUSTOM_GATE]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/software-delivery-trust/policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
