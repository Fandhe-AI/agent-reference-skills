---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/software-delivery-trust/policy-bindings
---

# gcloud software-delivery-trust policy-bindings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha software-delivery-trust policy-bindings create

```text
NAME
    gcloud alpha software-delivery-trust policy-bindings create - create a
        Software Delivery Trust policy binding

SYNOPSIS
    gcloud alpha software-delivery-trust policy-bindings create POLICY_BINDING
        --enforcement-mode=ENFORCEMENT_MODE
        --resource-selectors=[matchPattern=MATCHPATTERN],[path=PATH] [--async]
        [--custom-gate=CUSTOM_GATE] [--location=LOCATION] [--policy=POLICY]
        [--policy-revision=POLICY_REVISION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust policy-bindings delete

```text
NAME
    gcloud alpha software-delivery-trust policy-bindings delete - delete a
        Software Delivery Trust policy binding

SYNOPSIS
    gcloud alpha software-delivery-trust policy-bindings delete
        (POLICY_BINDING : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust policy-bindings describe

```text
NAME
    gcloud alpha software-delivery-trust policy-bindings describe - get details
        of a Software Delivery Trust policy binding

SYNOPSIS
    gcloud alpha software-delivery-trust policy-bindings describe
        (POLICY_BINDING : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust policy-bindings list

```text
NAME
    gcloud alpha software-delivery-trust policy-bindings list - list Software
        Delivery Trust policy bindings

SYNOPSIS
    gcloud alpha software-delivery-trust policy-bindings list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/software-delivery-trust/policy-bindings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
