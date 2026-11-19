---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/software-delivery-trust/authorities
---

# gcloud software-delivery-trust authorities

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha software-delivery-trust authorities add-key

```text
NAME
    gcloud alpha software-delivery-trust authorities add-key - add a public key
        to an existing Software Delivery Trust verification authority

SYNOPSIS
    gcloud alpha software-delivery-trust authorities add-key
        (AUTHORITY : --location=LOCATION)
        (--kms-key-version=KMS_KEY_VERSION
          | --pkix-public-key-file=PKIX_PUBLIC_KEY_FILE
          --signature-algorithm=SIGNATURE_ALGORITHM)
        [--endpoint-mode=ENDPOINT_MODE] [--key-id=KEY_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust authorities create

```text
NAME
    gcloud alpha software-delivery-trust authorities create - create a Software
        Delivery Trust verification authority

SYNOPSIS
    gcloud alpha software-delivery-trust authorities create
        (AUTHORITY : --location=LOCATION) [--description=DESCRIPTION]
        [--endpoint-mode=ENDPOINT_MODE] [--key-id=KEY_ID]
        [--kms-key-version=KMS_KEY_VERSION
          | --pkix-public-key-file=PKIX_PUBLIC_KEY_FILE
          --signature-algorithm=SIGNATURE_ALGORITHM] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust authorities delete

```text
NAME
    gcloud alpha software-delivery-trust authorities delete - delete a Software
        Delivery Trust verification authority

SYNOPSIS
    gcloud alpha software-delivery-trust authorities delete
        (AUTHORITY : --location=LOCATION) [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust authorities describe

```text
NAME
    gcloud alpha software-delivery-trust authorities describe - retrieve
        details of a Software Delivery Trust verification authority

SYNOPSIS
    gcloud alpha software-delivery-trust authorities describe
        (AUTHORITY : --location=LOCATION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust authorities list

```text
NAME
    gcloud alpha software-delivery-trust authorities list - list all Software
        Delivery Trust verification authorities in a given location

SYNOPSIS
    gcloud alpha software-delivery-trust authorities list --location=LOCATION
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust authorities remove-key

```text
NAME
    gcloud alpha software-delivery-trust authorities remove-key - remove a
        public key from an existing Software Delivery Trust verification
        authority

SYNOPSIS
    gcloud alpha software-delivery-trust authorities remove-key
        (AUTHORITY : --location=LOCATION)
        (--fingerprint=FINGERPRINT | --key-id=KEY_ID)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust authorities update

```text
NAME
    gcloud alpha software-delivery-trust authorities update - update a Software
        Delivery Trust verification authority

SYNOPSIS
    gcloud alpha software-delivery-trust authorities update
        (AUTHORITY : --location=LOCATION) [--description=DESCRIPTION]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/software-delivery-trust/authorities (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
