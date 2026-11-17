---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/zone-management/identity-providers
---

# gcloud zone-management identity-providers

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha zone-management identity-providers create

```text
NAME
    gcloud alpha zone-management identity-providers create - creates an
        identity provider for a Google Destributed Cloud zone

SYNOPSIS
    gcloud alpha zone-management identity-providers create
        (IDENTITY_PROVIDER : --location=LOCATION --organization=ORGANIZATION)
        --zone=ZONE (--oidc-config=OIDC_CONFIG | --saml-config=SAML_CONFIG)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha zone-management identity-providers delete

```text
NAME
    gcloud alpha zone-management identity-providers delete - delete an identity
        provider on a Google Distributed Cloud zone

SYNOPSIS
    gcloud alpha zone-management identity-providers delete
        (IDENTITY_PROVIDER : --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha zone-management identity-providers describe

```text
NAME
    gcloud alpha zone-management identity-providers describe - describes an
        identity provider on a Google Distributed Cloud zone

SYNOPSIS
    gcloud alpha zone-management identity-providers describe
        (IDENTITY_PROVIDER : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha zone-management identity-providers list

```text
NAME
    gcloud alpha zone-management identity-providers list - list identity
        providers created on Google Distributed Cloud zone

SYNOPSIS
    gcloud alpha zone-management identity-providers list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/zone-management/identity-providers (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
