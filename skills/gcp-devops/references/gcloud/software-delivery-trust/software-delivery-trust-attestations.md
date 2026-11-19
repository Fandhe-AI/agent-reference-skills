---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/software-delivery-trust/attestations
---

# gcloud software-delivery-trust attestations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha software-delivery-trust attestations create

```text
NAME
    gcloud alpha software-delivery-trust attestations create - create a
        Software Delivery Trust attestation

SYNOPSIS
    gcloud alpha software-delivery-trust attestations create
        [ATTESTATION : --location=LOCATION] --attestation-file=ATTESTATION_FILE
        [--async] [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust attestations describe

```text
NAME
    gcloud alpha software-delivery-trust attestations describe - get details of
        a Software Delivery Trust attestation

SYNOPSIS
    gcloud alpha software-delivery-trust attestations describe
        (ATTESTATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust attestations list

```text
NAME
    gcloud alpha software-delivery-trust attestations list - list Software
        Delivery Trust attestations

SYNOPSIS
    gcloud alpha software-delivery-trust attestations list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/software-delivery-trust/attestations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
